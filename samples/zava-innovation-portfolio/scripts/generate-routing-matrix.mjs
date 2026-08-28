import fs from 'node:fs';
import path from 'node:path';

const root=path.resolve(import.meta.dirname,'..');
const output=path.join(root,'Zava-Innovation-Routing-Matrix.md');
const config=JSON.parse(fs.readFileSync(path.join(root,'config','config.json'),'utf8'));
const starters=JSON.parse(fs.readFileSync(path.join(root,'config','conversation-starters.json'),'utf8')).starters;
const components=Object.values(config.bundles||{}).flatMap(bundle=>bundle.components||[]);
const tools=components.map(component=>{
  const manifest=JSON.parse(fs.readFileSync(path.join(root,component.manifest.replace(/^\.\//,'')),'utf8'));
  const tool=manifest.tools?.[0];
  if(!tool?.name||!tool.description?.default)throw new Error(`Manifest tool metadata is incomplete: ${component.manifest}`);
  const [positive,negative]=tool.description.default.split(' Do not use');
  if(!negative)throw new Error(`Tool description lacks a nearest exclusion: ${tool.name}`);
  return {name:tool.name,positive,negative:`Do not use${negative}`};
});
const lines=['# Zava Innovation Hub routing matrix','','Generated from configured component manifests and the canonical starter configuration.','', '| Tool | Positive use boundary | Nearest exclusion |','| --- | --- | --- |',...tools.map(tool=>`| \`${tool.name}\` | ${tool.positive} | ${tool.negative} |`),'','## Conversation starters','', '| # | Title | Prompt | Expected inline component |','| ---: | --- | --- | --- |',...starters.map((starter,index)=>`| ${index+1} | ${starter.title} | ${starter.text} | \`${starter.targetName}\` |`),''];
const expected=lines.join('\n');
if(process.argv.includes('--check')){
  if(!fs.existsSync(output)||fs.readFileSync(output,'utf8')!==expected)throw new Error('Routing matrix is stale. Run npm run generate:routing-matrix.');
  console.log(`Verified routing matrix for ${tools.length} tools and ${starters.length} starters.`);
}else{
  fs.writeFileSync(output,expected,'utf8');
  console.log(`Generated routing matrix for ${tools.length} tools and ${starters.length} starters.`);
}
