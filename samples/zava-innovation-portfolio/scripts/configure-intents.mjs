import fs from 'node:fs';
import path from 'node:path';

const root=path.resolve(import.meta.dirname,'..');
const componentsRoot=path.join(root,'src','copilotComponents');
const starterConfiguration=JSON.parse(fs.readFileSync(path.join(root,'config','conversation-starters.json'),'utf8'));
const definitions=[
['SubmitInnovationIdea','submitInnovationIdea',['message','ideaId','theme','focus']],['GetMyInnovation','getMyInnovation',['ideaId','theme','focus','period']],['BuildIdeaBusinessCase','buildIdeaBusinessCase',['ideaId','amount','focus']],['CelebrateInnovationImpact','celebrateInnovationImpact',['ideaId','message']],
['GetInnovationReviewQueue','getInnovationReviewQueue',['theme','focus','period']],['ReviewIdeaGate','reviewIdeaGate',['ideaId','focus','message']],['ReviewInnovationFunding','reviewInnovationFunding',['ideaId','amount','message']],['ExploreInnovationPortfolio','exploreInnovationPortfolio',['period','theme','focus','region']],
['TrackInnovationValue','trackInnovationValue',['ideaId','period','theme']],['GenerateInnovationBrief','generateInnovationBrief',['ideaId','period','focus']],['GetInnovationGrowth','getInnovationGrowth',['period','region','theme']],['ExploreGlobalInnovation','exploreGlobalInnovation',['region','theme','focus']],
['TrackInnovationBudget','trackInnovationBudget',['period','theme','amount']],['GetInnovationPortfolioHealth','getInnovationPortfolioHealth',['period','focus','theme']],['LaunchInnovationChallenge','launchInnovationChallenge',['message','theme','region']],['ManageInnovationExperiment','manageInnovationExperiment',['ideaId','message','focus']],['ExploreAgentCapabilities','exploreAgentCapabilities',['query','focus']]
];
const descriptions=new Map([
['SubmitInnovationIdea','Use for creating one new innovation idea. Do not use for existing idea status or business cases.'],['GetMyInnovation','Use for the signed-in person’s ideas and next actions. Do not use for enterprise portfolio analysis.'],['BuildIdeaBusinessCase','Use for modeling one idea’s financial case. Do not use for approving funding.'],['CelebrateInnovationImpact','Use for recognizing people behind measured innovation impact. Do not use for general announcements.'],
['GetInnovationReviewQueue','Use for prioritizing pending innovation reviews. Do not use to decide a selected gate.'],['ReviewIdeaGate','Use for deciding one idea gate with evidence. Do not use for funding decisions.'],['ReviewInnovationFunding','Use for deciding one funding request and its consequences. Do not use for budget overview.'],['ExploreInnovationPortfolio','Use for multi-dimensional portfolio funnel and balance analysis. Do not use for personal idea status.'],
['TrackInnovationValue','Use for projected-versus-realized value and pilot accountability. Do not use for future business cases.'],['GenerateInnovationBrief','Use for an evidence-grounded executive innovation brief. Do not use for raw analysis.'],['GetInnovationGrowth','Use for participation, throughput, and conversion trends. Do not use for budget health.'],['ExploreGlobalInnovation','Use for regional participation and conversion gaps. Do not use for individual ideas.'],
['TrackInnovationBudget','Use for allocated, committed, spent, forecast, and available funding. Do not use for one funding decision.'],['GetInnovationPortfolioHealth','Use for leadership portfolio health and exceptions. Do not use for one metric only.'],['LaunchInnovationChallenge','Use for framing and launching a measurable strategic challenge. Do not use for idea submission.'],['ManageInnovationExperiment','Use for pilot hypotheses, evidence, and learning recommendations. Do not use for funding approval.'],['ExploreAgentCapabilities','Use for discovering available innovation scenarios. Do not use for a specific operational request.']
]);
const numeric=new Set(['amount']);
const guids=[];
for(const [key,folder,fields] of definitions){
 const componentPath=path.join(componentsRoot,folder,`${key}CopilotComponent.ts`);
 const propsPath=path.join(componentsRoot,folder,`${key}CopilotComponentProperties.ts`);
 const manifestPath=path.join(componentsRoot,folder,`${key}CopilotComponent.manifest.json`);
 if(!fs.existsSync(manifestPath))throw new Error(`Missing Yeoman manifest: ${key}`);
 const manifest=JSON.parse(fs.readFileSync(manifestPath,'utf8')); guids.push(manifest.id);
 fs.writeFileSync(componentPath,`import InnovationCopilotComponentBase from '../../shared/InnovationCopilotComponentBase';\nimport type { IInnovationProperties, InnovationIntentKey } from '../../shared/catalog';\n\nexport default class ${key}CopilotComponent extends InnovationCopilotComponentBase<IInnovationProperties> {\n  protected intentKey: InnovationIntentKey = '${key}';\n}\n`);
 const lines=fields.map(field=>`  ${field}: z.${numeric.has(field)?'number':'string'}().optional().describe('${field} extracted from the user request when provided.')`);
 fs.writeFileSync(propsPath,`import { z } from 'zod';\nimport zodToJsonSchema from 'zod-to-json-schema';\n\nconst schema=z.object({\n${lines.join(',\n')}\n});\nexport type I${key}CopilotComponentProperties=z.infer<typeof schema>;\nexport default zodToJsonSchema(schema);\n`);
 manifest.tools[0].name=key;manifest.tools[0].description.default=descriptions.get(key);fs.writeFileSync(manifestPath,`${JSON.stringify(manifest,null,2)}\n`);
}
const components=definitions.map(([key,folder])=>({entrypoint:`./lib/copilotComponents/${folder}/${key}CopilotComponent.js`,manifest:`./src/copilotComponents/${folder}/${key}CopilotComponent.manifest.json`}));
const config=JSON.parse(fs.readFileSync(path.join(root,'config','config.json'),'utf8'));config.bundles={'zava-innovation-components':{components}};config.localizedResources={};fs.writeFileSync(path.join(root,'config','config.json'),`${JSON.stringify(config,null,2)}\n`);
const agent=JSON.parse(fs.readFileSync(path.join(root,'config','copilot-agent.json'),'utf8'));agent.agents[0].name.default='Zava Innovation Hub';agent.agents[0].description.default='Turn challenges into governed innovation outcomes.';agent.agents[0].components=guids;fs.writeFileSync(path.join(root,'config','copilot-agent.json'),`${JSON.stringify(agent,null,2)}\n`);
const declarativeAgentPath=path.join(root,'copilot','declarativeAgent.json');
const declarativeAgent=JSON.parse(fs.readFileSync(declarativeAgentPath,'utf8'));
declarativeAgent.conversation_starters=starterConfiguration.starters.map(({title,text})=>({title,text}));
fs.writeFileSync(declarativeAgentPath,`${JSON.stringify(declarativeAgent,null,2)}\n`);
const routing=['# Zava Innovation Hub routing matrix','','Generated from the approved intent catalog and starter configuration.','', '| Tool | Positive use boundary | Nearest exclusion |','| --- | --- | --- |',...definitions.map(([key])=>`| \`${key}\` | ${descriptions.get(key).split(' Do not use')[0]} | Do not use${descriptions.get(key).split(' Do not use')[1]} |`),'','## Conversation starters','', '| # | Title | Prompt | Expected inline component |','| ---: | --- | --- | --- |',...starterConfiguration.starters.map((starter,index)=>`| ${index+1} | ${starter.title} | ${starter.text} | \`${starter.targetName}\` |`)];fs.writeFileSync(path.join(root,'Zava-Innovation-Routing-Matrix.md'),`${routing.join('\n')}\n`);
console.log(`Configured ${definitions.length} immutable intent components in one shared bundle.`);
