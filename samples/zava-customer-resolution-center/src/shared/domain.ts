export type ServiceRegion = 'AMER' | 'EMEA' | 'APAC' | 'LATAM';
export type EvidenceKind = 'verified' | 'calculation' | 'inference' | 'contrary' | 'gap';
export type CaseStatus = 'new' | 'diagnosing' | 'waiting' | 'resolved';

export interface ICustomerRecord {
  readonly id: string;
  readonly name: string;
  readonly region: ServiceRegion;
  readonly tier: 'Enterprise' | 'Business' | 'Standard';
  readonly language: string;
  readonly health: number;
  readonly renewalRisk: number;
}
export interface IServiceCaseRecord {
  readonly id: string;
  readonly customerId: string;
  readonly product: string;
  readonly version: string;
  readonly symptom: string;
  readonly severity: 1 | 2 | 3 | 4;
  readonly status: CaseStatus;
  readonly sentiment: number;
  readonly affectedSites: number;
  readonly openedOffsetMinutes: number;
  readonly owner: string;
  readonly channel: 'Email' | 'Chat' | 'Phone' | 'Portal';
}
export interface IEvidenceRecord {
  readonly id: string;
  readonly caseId: string;
  readonly kind: EvidenceKind;
  readonly label: string;
  readonly source: string;
  readonly freshnessMinutes: number;
  readonly confidence: number;
}
export interface ICommitmentRecord {
  readonly id: string;
  readonly customerId: string;
  readonly label: string;
  readonly owner: string;
  readonly dueOffsetMinutes: number;
  readonly status: 'on-track' | 'at-risk' | 'complete';
  readonly party: 'Zava' | 'Customer';
}
export interface IExpertRecord { readonly id:string; readonly name:string; readonly role:string; readonly skills:readonly string[]; readonly availableInMinutes:number; }
export interface IRegionSignal { readonly id:ServiceRegion; readonly label:string; readonly longitude:number; readonly latitude:number; readonly cases:number; readonly slaRisk:number; readonly recoveryCost:number; readonly csat:number; }
export interface IPriorityResult { readonly caseId:string; readonly score:number; readonly reasons:readonly string[]; readonly remainingMinutes:number; }
export interface IRecoveryScenario { readonly id:string; readonly label:string; readonly amount:number; readonly authority:string; readonly precedent:number; readonly trustOutcome:number; }
export interface IIncidentSignal { readonly caseId:string; readonly similarity:number; readonly related:boolean; readonly longitude:number; readonly latitude:number; }
export interface IServiceAggregate {
  readonly customers:readonly ICustomerRecord[];
  readonly cases:readonly IServiceCaseRecord[];
  readonly evidence:readonly IEvidenceRecord[];
  readonly commitments:readonly ICommitmentRecord[];
  readonly experts:readonly IExpertRecord[];
  readonly regions:readonly IRegionSignal[];
}
export interface ICustomerServiceDataService { getAggregate(): IServiceAggregate; getCase(caseId:string): IServiceCaseRecord | undefined; }

const REGIONS: readonly ServiceRegion[]=['AMER','EMEA','APAC','LATAM'];
const PRODUCTS=['Zava Handheld','Zava Commerce','Zava Pay','Zava Connect','Zava Inventory','Zava Insights'];
const OWNERS=['Amina Yusuf','Diego Siciliani','Pradeep Gupta','Megan Bowen','Nestor Wilke'];
const CUSTOMER_NAMES=['Alpine House','Northwind Traders','Contoso Retail','Fabrikam Stores','Adventure Works','Litware','Tailspin Toys','Blue Yonder'];
const bounded=(value:number,min:number,max:number):number=>Math.max(min,Math.min(max,value));
const customerId=(index:number):string=>`customer-${(`00${index}`).slice(-3)}`;
const caseId=(index:number):string=>`ZCR-${1000+index}`;

const customers:readonly ICustomerRecord[]=Array.from({length:60},(_,index)=>({
  id:index===0?'alpine-house':customerId(index),
  name:index===0?'Alpine House':`${CUSTOMER_NAMES[index%CUSTOMER_NAMES.length]} ${Math.floor(index/CUSTOMER_NAMES.length)+1}`,
  region:REGIONS[index%REGIONS.length], tier:index%5===0?'Enterprise':index%3===0?'Business':'Standard',
  language:index%9===0?'fr-FR':index%7===0?'ja-JP':index%11===0?'ar-SA':'en-US',
  health:bounded(91-(index*7)%48,35,96), renewalRisk:bounded(8+(index*11)%63,5,82)
}));
const cases:readonly IServiceCaseRecord[]=Array.from({length:500},(_,index)=>({
  id:index===48?'ZCR-1048':caseId(index), customerId:index===48?'alpine-house':customers[index%customers.length].id,
  product:index===48?'Zava Handheld':PRODUCTS[index%PRODUCTS.length], version:index===48?'8.4.12':`${7+index%3}.${index%8}.${index%15}`,
  symptom:index===48?'Activation handshake rejected':['Activation failure','Delivery sync delay','Payment mismatch','Access denied','Inventory drift'][index%5],
  severity:(1+(index%4)) as 1|2|3|4, status:index%9===0?'resolved':index%4===0?'waiting':index%3===0?'new':'diagnosing',
  sentiment:bounded(24+(index*13)%70,20,95), affectedSites:index===48?42:1+(index*7)%28,
  openedOffsetMinutes:-(35+(index*43)%25000), owner:OWNERS[index%OWNERS.length], channel:(['Email','Chat','Phone','Portal'] as const)[index%4]
}));
const evidence:readonly IEvidenceRecord[]=[
  {id:'ev-firmware',caseId:'ZCR-1048',kind:'verified',label:'Firmware 8.4.12 rejects the activation handshake',source:'Activation telemetry',freshnessMinutes:8,confidence:96},
  {id:'ev-network',caseId:'ZCR-1048',kind:'contrary',label:'Network health is normal at 39 of 42 stores',source:'Site diagnostics',freshnessMinutes:13,confidence:94},
  {id:'ev-rollback',caseId:'ZCR-1048',kind:'verified',label:'Rollback restored six pilot devices',source:'Specialist test',freshnessMinutes:18,confidence:99},
  {id:'ev-missing',caseId:'ZCR-1048',kind:'gap',label:'Three stores have not uploaded telemetry',source:'Evidence completeness',freshnessMinutes:4,confidence:100},
  {id:'ev-similar',caseId:'ZCR-1048',kind:'inference',label:'Seven cases share version, symptom, and onset',source:'Similarity model',freshnessMinutes:6,confidence:84}
];
const commitments:readonly ICommitmentRecord[]=[
  {id:'com-update',customerId:'alpine-house',label:'Bilingual customer update',owner:'Amina Yusuf',dueOffsetMinutes:45,status:'at-risk',party:'Zava'},
  {id:'com-launch',customerId:'alpine-house',label:'Launch readiness decision',owner:'Megan Bowen',dueOffsetMinutes:180,status:'at-risk',party:'Zava'},
  {id:'com-telemetry',customerId:'alpine-house',label:'Upload diagnostics from three stores',owner:'Luc Dubois',dueOffsetMinutes:70,status:'on-track',party:'Customer'},
  {id:'com-review',customerId:'alpine-house',label:'Executive recovery review',owner:'Diego Siciliani',dueOffsetMinutes:240,status:'on-track',party:'Zava'}
];
const experts:readonly IExpertRecord[]=[
  {id:'expert-pradeep',name:'Pradeep Gupta',role:'Product specialist',skills:['Firmware','Activation'],availableInMinutes:8},
  {id:'expert-lee',name:'Lee Gu',role:'Reliability engineer',skills:['Telemetry','Incident response'],availableInMinutes:14},
  {id:'expert-nestor',name:'Nestor Wilke',role:'Field coordinator',skills:['Retail sites','Dispatch'],availableInMinutes:32}
];
export const REGION_SIGNALS:readonly IRegionSignal[]=[
  {id:'AMER',label:'Americas',longitude:-100,latitude:39,cases:138,slaRisk:19,recoveryCost:184000,csat:84},
  {id:'EMEA',label:'Europe, Middle East and Africa',longitude:14,latitude:49,cases:164,slaRisk:31,recoveryCost:242000,csat:78},
  {id:'APAC',label:'Asia Pacific',longitude:116,latitude:19,cases:121,slaRisk:38,recoveryCost:169000,csat:75},
  {id:'LATAM',label:'Latin America',longitude:-61,latitude:-15,cases:77,slaRisk:27,recoveryCost:96000,csat:81}
];
const aggregate:IServiceAggregate={customers,cases,evidence,commitments,experts,regions:REGION_SIGNALS};
export class MockCustomerServiceDataService implements ICustomerServiceDataService {
  public getAggregate():IServiceAggregate{return aggregate;}
  public getCase(id:string):IServiceCaseRecord|undefined{return aggregate.cases.find(item=>item.id===id);}
}
export const serviceData=new MockCustomerServiceDataService();

export const calculateSlaRemaining=(record:IServiceCaseRecord):number=>{
  const entitlement=record.customerId==='alpine-house'?360:record.severity===1?240:record.severity===2?480:960;
  return Math.max(0,entitlement-Math.abs(record.openedOffsetMinutes));
};
export const rankPriority=(record:IServiceCaseRecord):IPriorityResult=>{
  const customer=customers.find(item=>item.id===record.customerId);
  const remaining=calculateSlaRemaining(record);
  const reasons:string[]=[];
  let score=(5-record.severity)*14+record.affectedSites*.7+(100-record.sentiment)*.22;
  if(customer?.tier==='Enterprise'){score+=15;reasons.push('Enterprise entitlement');}
  if(remaining<120){score+=22;reasons.push('SLA inside two hours');}
  if(record.affectedSites>20)reasons.push(`${record.affectedSites} affected sites`);
  if(record.sentiment<45)reasons.push('Customer concern rising');
  return {caseId:record.id,score:Math.round(score),reasons,remainingMinutes:remaining};
};
export const topPriorityCases=(limit=6):readonly IPriorityResult[]=>cases.filter(item=>item.status!=='resolved').map(rankPriority).sort((a,b)=>b.score-a.score).slice(0,limit);
export const recoveryScenarios=(amount:number):readonly IRecoveryScenario[]=>[
  {id:'credit',label:'Service credit',amount,authority:amount>5000?'VP Customer Operations':'Service manager',precedent:bounded(Math.round(amount/100),18,82),trustOutcome:bounded(52+Math.round(amount/250),52,89)},
  {id:'extension',label:'Support extension',amount:Math.round(amount*.58),authority:'Service manager',precedent:31,trustOutcome:76},
  {id:'replacement',label:'Priority replacement',amount:Math.round(amount*1.34),authority:'VP Customer Operations',precedent:67,trustOutcome:86},
  {id:'none',label:'No concession',amount:0,authority:'Representative',precedent:4,trustOutcome:38}
];
export const incidentSignals=(threshold:number):readonly IIncidentSignal[]=>[
  {caseId:'ZCR-1048',similarity:100,related:true,longitude:2.35,latitude:48.86},
  {caseId:'ZCR-1052',similarity:91,related:91>=threshold,longitude:-.13,latitude:51.51},
  {caseId:'ZCR-1061',similarity:88,related:88>=threshold,longitude:4.9,latitude:52.37},
  {caseId:'ZCR-1074',similarity:83,related:83>=threshold,longitude:13.4,latitude:52.52},
  {caseId:'ZCR-1088',similarity:79,related:79>=threshold,longitude:9.19,latitude:45.46},
  {caseId:'ZCR-1093',similarity:74,related:74>=threshold,longitude:2.17,latitude:41.38},
  {caseId:'ZCR-1099',similarity:43,related:false,longitude:18.07,latitude:59.33}
];
export const HERO_CASE=cases.find(item=>item.id==='ZCR-1048') as IServiceCaseRecord;
