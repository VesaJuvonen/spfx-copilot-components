import fs from 'node:fs';
import path from 'node:path';

const root=path.resolve(import.meta.dirname,'..');
const intents=[
  ['CreatePurchaseIntent','Create a governed purchase intent from an outcome and constraints.'],
  ['CompareBuyingOptions','Compare catalog, contract, reuse, and sourcing routes.'],
  ['CheckPurchasePolicy','Explain applicable purchase rules, evidence, and remediation.'],
  ['ReviewPurchaseRequest','Review need, budget, policy, and downstream commitment.'],
  ['AggregateDemand','Find and simulate consolidatable purchase demand.'],
  ['BuildSourcingEvent','Build a fair, validated supplier sourcing event draft.'],
  ['CompareSupplierBids','Compare normalized supplier bids and total-value sensitivity.'],
  ['ReviewSupplierAward','Review supplier award evidence, alternatives, and consequences.'],
  ['ExploreSupplier360','Explore supplier obligations, performance, risk, and owners.'],
  ['ReviewContractRenewal','Review renewal, renegotiation, consolidation, or exit scenarios.'],
  ['DetectSpendLeakage','Detect addressable off-contract and price leakage patterns.'],
  ['TrackSupplierRisk','Explore geographic and sub-tier supplier exposure.'],
  ['ResolveInvoiceException','Reconcile PO, receipt, invoice, tolerance, and disposition.'],
  ['ExploreSpendPerformance','Trace identified procurement opportunity to realized value.'],
  ['OnboardSupplier','Create an evidence-aware supplier candidate draft.'],
  ['ReviewSupplierQualification','Review scoped supplier qualification and conditions.'],
  ['PlanSupplierRiskMitigation','Plan owned mitigations and residual supplier exposure.'],
  ['NegotiateContractTerms','Build a reviewed give-get contract negotiation plan.'],
  ['ManagePurchaseOrderChange','Review before-and-after purchase order consequences.'],
  ['TrackLeakageRecovery','Review intervention progress and verified recovered value.'],
  ['ExploreSupplierPortfolioBalance','Explore category concentration versus supplier risk.'],
  ['ExploreAgentCapabilities','Search and safely preview Procurement agent operations.']
];
const folder=(name)=>name[0].toLowerCase()+name.slice(1);
const schema=`import { z } from 'zod';
import zodToJsonSchema from 'zod-to-json-schema';
const propertiesSchema=z.object({
  outcome:z.string().max(500).optional(),requestId:z.string().max(80).optional(),category:z.string().max(100).optional(),categoryHint:z.string().max(100).optional(),quantity:z.number().nonnegative().optional(),neededBy:z.string().max(40).optional(),locations:z.array(z.string().max(100)).max(20).optional(),budget:z.number().nonnegative().optional(),currency:z.string().max(8).optional(),constraints:z.array(z.string().max(300)).max(20).optional(),cohortId:z.string().max(80).optional(),eventId:z.string().max(80).optional(),supplierId:z.string().max(80).optional(),contractId:z.string().max(80).optional(),invoiceId:z.string().max(80).optional(),opportunityId:z.string().max(80).optional(),period:z.string().max(80).optional(),region:z.string().max(80).optional(),scenario:z.string().max(120).optional(),selectedId:z.string().max(80).optional(),proposedDecision:z.string().max(120).optional(),conditionText:z.string().max(1000).optional(),query:z.string().max(300).optional()
});
export type I__NAME__CopilotComponentProperties=z.infer<typeof propertiesSchema>;
export default zodToJsonSchema(propertiesSchema);\n`;
const bundles=[];const resources={};const ids=[];
for(const [name,description] of intents){
  const dir=folder(name),base=path.join(root,'src','copilotComponents',dir),manifestPath=path.join(base,`${name}CopilotComponent.manifest.json`);
  if(!fs.existsSync(manifestPath))throw new Error(`Missing Yeoman scaffold: ${name}`);
  const manifest=JSON.parse(fs.readFileSync(manifestPath,'utf8'));
  manifest.tools[0].name=`${name}Tool`;manifest.tools[0].description.default=description;
  fs.writeFileSync(manifestPath,`${JSON.stringify(manifest,null,2)}\n`);
  fs.writeFileSync(path.join(base,`${name}CopilotComponent.tsx`),`import ProcurementCopilotComponentBase from '../../shared/ProcurementCopilotComponentBase';\nimport type { I${name}CopilotComponentProperties } from './${name}CopilotComponentProperties';\nexport default class ${name}CopilotComponent extends ProcurementCopilotComponentBase<I${name}CopilotComponentProperties>{protected intentKey='${name}' as const;}\n`);
  fs.writeFileSync(path.join(base,`${name}CopilotComponentProperties.ts`),schema.replaceAll('__NAME__',name));
  bundles.push({entrypoint:`./lib/copilotComponents/${dir}/${name}CopilotComponent.js`,manifest:`./src/copilotComponents/${dir}/${name}CopilotComponent.manifest.json`});
  resources[`${name}CopilotComponentStrings`]=`lib/copilotComponents/${dir}/loc/{locale}.js`;ids.push(manifest.id);
}
const config=JSON.parse(fs.readFileSync(path.join(root,'config','config.json'),'utf8'));
config.bundles={'zava-procurement-components':{components:bundles}};config.localizedResources=resources;
fs.writeFileSync(path.join(root,'config','config.json'),`${JSON.stringify(config,null,2)}\n`);
const agentPath=path.join(root,'config','copilot-agent.json'),agent=JSON.parse(fs.readFileSync(agentPath,'utf8'));
agent.agents[0].name.default='Zava Procurement Command Center';agent.agents[0].description.default='Govern buying, sourcing, suppliers, spend, and value with evidence-backed agent experiences.';agent.agents[0].components=ids;
fs.writeFileSync(agentPath,`${JSON.stringify(agent,null,2)}\n`);
console.log(`Configured ${intents.length} immutable Copilot Components in one shared bundle.`);