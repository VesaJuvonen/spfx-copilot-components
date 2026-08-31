import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const componentsRoot = path.join(root, 'src', 'copilotComponents');
const definitions = [
  ['TriageCustomerIssue',['customerHint','productHint','channel','language']],
  ['GetPriorityServiceQueue',['region','product','period','focus']],
  ['ExploreCustomerHealth',['customerId','period','product','selectedId']],
  ['BuildResolutionPlan',['caseId','focus','selectedId']],
  ['StartExpertSwarm',['caseId','region','focus','selectedId']],
  ['DetectServiceIncident',['caseId','product','region','period','similarityThreshold']],
  ['ReviewIncidentResponse',['caseId','focus','selectedId']],
  ['ReviewServiceRecovery',['caseId','amount','focus','selectedId']],
  ['ComposeCustomerUpdate',['caseId','channel','language','focus']],
  ['TrackResolutionOutcome',['caseId','customerId','period','selectedId']],
  ['CreateKnowledgeFromResolution',['caseId','product','language','focus']],
  ['ExploreServicePerformance',['period','region','product','focus','selectedId']],
  ['DiagnoseCaseEvidence',['caseId','product','period','selectedId']],
  ['ReviewEntitlementCoverage',['caseId','customerId','product','region']],
  ['ManageCaseEscalation',['caseId','region','focus','selectedId']],
  ['BalanceServiceWorkload',['period','region','focus','selectedId']],
  ['CoordinateFieldService',['caseId','region','period','selectedId']],
  ['ManageCustomerCommitments',['caseId','customerId','period','selectedId']],
  ['RunServiceQualityReview',['caseId','focus','selectedId']],
  ['PlanCustomerWinBack',['customerId','focus','amount','period']],
  ['ExploreAgentCapabilities',['query','focus']]
];
const descriptions = new Map([
  ['TriageCustomerIssue','Create a reviewed customer case from issue language. Do not use after a resolution goal exists.'],
  ['GetPriorityServiceQueue','Rank cases needing judgment. Do not use for detailed diagnosis of one case.'],
  ['ExploreCustomerHealth','Explain relationship health. Do not use for aggregate service operations.'],
  ['BuildResolutionPlan','Build an evidence-linked resolution plan. Do not declare incidents or approve recovery.'],
  ['StartExpertSwarm','Create a bounded expert handoff. Do not use for queue reassignment.'],
  ['DetectServiceIncident','Analyze similar-case patterns. Do not declare or close an incident.'],
  ['ReviewIncidentResponse','Review a consequential incident decision. Do not use for exploratory clustering.'],
  ['ReviewServiceRecovery','Review fair authorized recovery. Do not compose customer communication.'],
  ['ComposeCustomerUpdate','Draft a customer-safe localized update. Do not expose internal evidence.'],
  ['TrackResolutionOutcome','Verify one customer outcome. Do not use for aggregate performance.'],
  ['CreateKnowledgeFromResolution','Create knowledge from verified resolution evidence. Do not publish directly.'],
  ['ExploreServicePerformance','Analyze systemic service performance. Do not use for one representative queue.'],
  ['DiagnoseCaseEvidence','Compare diagnostic hypotheses and signals. Do not confirm unsupported causes.'],
  ['ReviewEntitlementCoverage','Explain entitlement and SLA coverage. Do not approve compensation.'],
  ['ManageCaseEscalation','Review a queue escalation and evidence package. Do not recruit an expert swarm.'],
  ['BalanceServiceWorkload','Simulate skill-aware workload changes. Do not silently reassign cases.'],
  ['CoordinateFieldService','Plan reviewed site visits, parts, people, and windows.'],
  ['ManageCustomerCommitments','Review bilateral promises and evidence. Do not infer completion.'],
  ['RunServiceQualityReview','Review transparent service quality findings. Do not use opaque AI scores.'],
  ['PlanCustomerWinBack','Build a guarded trust-recovery plan. Do not initiate outreach automatically.'],
  ['ExploreAgentCapabilities','Discover customer-resolution scenarios. Do not use for a specific request.']
]);
const numeric = new Set(['amount','similarityThreshold']);
const componentEntries = [];
const componentIds = [];

for (const [key, fields] of definitions) {
  const folder = `${key[0].toLowerCase()}${key.slice(1)}`;
  const folderPath = path.join(componentsRoot, folder);
  const manifestPath = path.join(folderPath, `${key}CopilotComponent.manifest.json`);
  if (!fs.existsSync(manifestPath)) throw new Error(`Missing Yeoman manifest for ${key}`);
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  componentIds.push(manifest.id);
  fs.writeFileSync(path.join(folderPath, `${key}CopilotComponent.tsx`), `import ServiceCopilotComponentBase from '../../shared/ServiceCopilotComponentBase';\nimport type { IServiceProperties, ServiceIntentKey } from '../../shared/catalog';\n\nexport default class ${key}CopilotComponent extends ServiceCopilotComponentBase<IServiceProperties> {\n  protected intentKey: ServiceIntentKey = '${key}';\n}\n`);
  const schemaFields = fields.map((field) => `  ${field}: z.${numeric.has(field) ? 'number' : 'string'}().optional().describe('${field} extracted from the user request when provided.')`);
  fs.writeFileSync(path.join(folderPath, `${key}CopilotComponentProperties.ts`), `import { z } from 'zod';\nimport zodToJsonSchema from 'zod-to-json-schema';\n\nconst schema = z.object({\n${schemaFields.join(',\n')}\n});\nexport type I${key}CopilotComponentProperties = z.infer<typeof schema>;\nexport default zodToJsonSchema(schema);\n`);
  fs.rmSync(path.join(folderPath, 'components'), { recursive: true, force: true });
  fs.rmSync(path.join(folderPath, 'loc'), { recursive: true, force: true });
  manifest.alias = `${key}CopilotComponent`;
  manifest.tools[0].name = key;
  manifest.tools[0].description.default = descriptions.get(key);
  fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
  componentEntries.push({ entrypoint: `./lib/copilotComponents/${folder}/${key}CopilotComponent.js`, manifest: `./src/copilotComponents/${folder}/${key}CopilotComponent.manifest.json` });
}

const configPath = path.join(root, 'config', 'config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
config.bundles = { 'zava-customer-resolution-components': { components: componentEntries } };
config.localizedResources = {};
fs.writeFileSync(configPath, `${JSON.stringify(config, null, 2)}\n`);

const agentPath = path.join(root, 'config', 'copilot-agent.json');
const agent = JSON.parse(fs.readFileSync(agentPath, 'utf8'));
agent.agents[0].name.default = 'Zava Customer Resolution';
agent.agents[0].description.default = 'Turn fragmented customer evidence into safe, accountable resolution action.';
agent.agents[0].components = componentIds;
fs.writeFileSync(agentPath, `${JSON.stringify(agent, null, 2)}\n`);
const starters = JSON.parse(fs.readFileSync(path.join(root, 'config', 'conversation-starters.json'), 'utf8')).starters;
const declarativePath = path.join(root, 'copilot', 'declarativeAgent.json');
const declarative = JSON.parse(fs.readFileSync(declarativePath, 'utf8'));
declarative.conversation_starters = starters.map(({ title, text }) => ({ title, text }));
fs.writeFileSync(declarativePath, `${JSON.stringify(declarative, null, 2)}\n`);
console.log(`Configured ${definitions.length} immutable service components in one shared bundle.`);
