import fs from 'node:fs';
import path from 'node:path';
import unzipper from 'unzipper';

const root=path.resolve(import.meta.dirname,'..');
const agentPath=path.join(root,'teams','zava-innovation-hub.zip');
const manifests=[];
for(const folder of fs.readdirSync(path.join(root,'src','copilotComponents'))){
  const directory=path.join(root,'src','copilotComponents',folder);
  if(!fs.statSync(directory).isDirectory())continue;
  const file=fs.readdirSync(directory).find(name=>name.endsWith('.manifest.json'));
  if(file)manifests.push(JSON.parse(fs.readFileSync(path.join(directory,file),'utf8')));
}
const expectedNames=manifests.map(manifest=>manifest.tools?.[0]?.name).sort();
const assert=(condition,message)=>{if(!condition)throw new Error(message);};
const assertText=(value,label,maximum)=>{
  assert(typeof value==='string'&&value.trim(),`${label} must be a nonempty string.`);
  assert([...value].length<=maximum,`${label} exceeds ${maximum} characters.`);
};

assert(fs.existsSync(agentPath),`Generated agent package is missing: ${agentPath}`);
const archive=await unzipper.Open.file(agentPath);
const entry=archive.files.find(file=>file.path==='ai-plugin.json');
assert(entry,'Generated agent package does not contain ai-plugin.json.');
const plugin=JSON.parse((await entry.buffer()).toString('utf8'));
assert(plugin.$schema==='https://developer.microsoft.com/json-schemas/copilot/plugin/v2.4/schema.json','Generated plugin must use the v2.4 schema.');
assert(plugin.schema_version==='v2.4','Generated plugin schema_version must be v2.4.');
assertText(plugin.name_for_human,'name_for_human',20);
assertText(plugin.description_for_human,'description_for_human',100);
assertText(plugin.description_for_model,'description_for_model',2048);
assert(Array.isArray(plugin.functions), 'Generated plugin functions are missing.');
const actualNames=plugin.functions.map(fn=>fn.name).sort();
assert(JSON.stringify(actualNames)===JSON.stringify(expectedNames),`Generated functions do not match manifests. Expected ${expectedNames.join(', ')}; found ${actualNames.join(', ')}.`);
for(const fn of plugin.functions){
  assertText(fn.description,`${fn.name}.description`,4000);
  assert(fn.parameters?.type==='object'&&fn.parameters.properties&&typeof fn.parameters.properties==='object',`${fn.name}.parameters must be an object schema.`);
}
const runtimes=(plugin.runtimes||[]).filter(runtime=>runtime.type==='RemoteMCPServer');
assert(runtimes.length===1,`Expected one RemoteMCPServer runtime, found ${runtimes.length}.`);
const runtime=runtimes[0];
const tools=runtime.spec?.mcp_tool_description?.tools;
assert(Array.isArray(tools), 'Generated MCP tool mirror is missing.');
assert(JSON.stringify(tools.map(tool=>tool.name).sort())===JSON.stringify(expectedNames),'MCP tool names do not match manifest tools.');
assert(JSON.stringify([...(runtime.run_for_functions||[])].sort())===JSON.stringify(expectedNames),'run_for_functions does not match manifest tools.');
for(const tool of tools){
  const fn=plugin.functions.find(candidate=>candidate.name===tool.name);
  assert(tool.description===fn.description,`${tool.name} MCP description drifted from its function.`);
  assert(JSON.stringify(tool.inputSchema)===JSON.stringify(fn.parameters),`${tool.name} MCP input schema drifted from its function.`);
  assert(tool.annotations?.readOnlyHint===true&&tool.annotations?.destructiveHint===false,`${tool.name} must retain safe mock annotations.`);
  assert(tool._meta?.['openai/outputTemplate']==='ui://spfx/component.html',`${tool.name} output template is invalid.`);
  assert(tool._meta?.['ui/csp']?.frameDomains?.[0]==='{{TENANT_ORIGIN}}',`${tool.name} frame domain must use the tenant placeholder.`);
  assert(tool._meta?.['ui/csp']?.resourceDomains?.[0]==='{{TENANT_ORIGIN}}',`${tool.name} resource domain must use the tenant placeholder.`);
}
console.log(`Verified generated API plugin v2.4: ${expectedNames.length} functions and mirrored MCP tools.`);
