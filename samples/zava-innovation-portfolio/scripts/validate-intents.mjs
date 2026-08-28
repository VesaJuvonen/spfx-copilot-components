import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');
const manifests=[];
const walk=(dir)=>{for(const item of fs.readdirSync(dir,{withFileTypes:true})){const full=path.join(dir,item.name);if(item.isDirectory())walk(full);else if(item.name.endsWith('CopilotComponent.manifest.json'))manifests.push(full);}};
walk(path.join(root,'src','copilotComponents'));
if(manifests.length!==17)throw new Error(`Expected 17 manifests, found ${manifests.length}`);
const parsed=manifests.map(file=>JSON.parse(fs.readFileSync(file,'utf8')));
const unique=(values,label)=>{if(new Set(values).size!==values.length)throw new Error(`Duplicate ${label}`);};
unique(parsed.map(m=>m.id),'GUID');unique(parsed.map(m=>m.tools[0].name),'tool');unique(parsed.map(m=>m.tools[0].description.default),'description');
for(const manifest of parsed){const description=manifest.tools[0].description.default;if(!description.startsWith('Use for')||!description.includes('Do not use'))throw new Error(`Routing boundary missing: ${manifest.alias}`);}
const config=JSON.parse(fs.readFileSync(path.join(root,'config','config.json'),'utf8'));const bundles=Object.values(config.bundles);if(bundles.length!==1||bundles[0].components.length!==17)throw new Error('Expected one shared bundle with 17 entries');
const agent=JSON.parse(fs.readFileSync(path.join(root,'config','copilot-agent.json'),'utf8'));if(agent.agents[0].components.length!==17)throw new Error('Agent registration count mismatch');
if(fs.existsSync(path.join(root,'src','copilotComponents','innovation')))throw new Error('Placeholder component remains');
const catalog=fs.readFileSync(path.join(root,'src','shared','catalog.ts'),'utf8');for(const manifest of parsed){if(!catalog.includes(`'${manifest.tools[0].name}'`))throw new Error(`Tool absent from catalog: ${manifest.tools[0].name}`);}
const starterConfiguration=JSON.parse(fs.readFileSync(path.join(root,'config','conversation-starters.json'),'utf8')).starters;
if(starterConfiguration.length!==6)throw new Error(`Expected 6 conversation starters, found ${starterConfiguration.length}`);
const expectedTargets=['SubmitInnovationIdea','GetMyInnovation','ExploreInnovationPortfolio','GetInnovationReviewQueue','ReviewInnovationFunding','ExploreAgentCapabilities'];
const actualTargets=starterConfiguration.map(starter=>starter.targetName);
if(JSON.stringify(actualTargets)!==JSON.stringify(expectedTargets))throw new Error(`Starter targets or order changed: ${actualTargets.join(', ')}`);
if(new Set(actualTargets.slice(0,5)).size!==5)throw new Error('Starters 1-5 must target five distinct operational tools');
if(actualTargets[5]!=='ExploreAgentCapabilities')throw new Error('Starter 6 must target ExploreAgentCapabilities');
for(const starter of starterConfiguration){
	const manifest=parsed.find(item=>item.tools[0].name===starter.targetName);
	if(!manifest)throw new Error(`Starter target does not exist: ${starter.targetName}`);
	if(!manifest.capabilities.availableDisplayModes.includes('inline'))throw new Error(`Starter target is not inline-capable: ${starter.targetName}`);
	if(!starter.title||!starter.text||/[\/] |\bthen\b|[.!?]\s+\S/.test(starter.text))throw new Error(`Starter must contain one natural-language task: ${starter.title}`);
}
const declarativeAgent=JSON.parse(fs.readFileSync(path.join(root,'copilot','declarativeAgent.json'),'utf8'));
const visibleStarters=starterConfiguration.map(({title,text})=>({title,text}));
if(JSON.stringify(declarativeAgent.conversation_starters)!==JSON.stringify(visibleStarters))throw new Error('declarativeAgent.json starters are stale; run npm run configure:intents');
const routingMatrix=fs.readFileSync(path.join(root,'Zava-Innovation-Routing-Matrix.md'),'utf8');
for(const [index,starter] of starterConfiguration.entries()){
	const row=`| ${index+1} | ${starter.title} | ${starter.text} | \`${starter.targetName}\` |`;
	if(!routingMatrix.includes(row))throw new Error(`Routing matrix starter row is stale: ${starter.title}`);
}
console.log('Validated 17 tools/GUIDs, one shared bundle, routing boundaries, and 6 uniquely targeted inline starters.');
