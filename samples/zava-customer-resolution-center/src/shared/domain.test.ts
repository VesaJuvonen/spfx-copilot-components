import { HERO_CASE, incidentSignals, rankPriority, recoveryScenarios, serviceData, topPriorityCases } from './domain';

describe('customer resolution domain',()=>{
  it('seeds the promised deterministic service graph',()=>{const data=serviceData.getAggregate();expect(data.customers).toHaveLength(60);expect(data.cases).toHaveLength(500);expect(data.evidence.filter(item=>item.caseId==='ZCR-1048')).toHaveLength(5);});
  it('keeps every case customer reference valid',()=>{const data=serviceData.getAggregate();const ids=new Set(data.customers.map(item=>item.id));expect(data.cases.every(item=>ids.has(item.customerId))).toBe(true);});
  it('ranks urgent enterprise impact with inspectable reasons',()=>{const result=rankPriority(HERO_CASE);expect(result.score).toBeGreaterThan(70);expect(result.reasons).toContain('Enterprise entitlement');expect(result.reasons).toContain('42 affected sites');});
  it('returns a descending priority queue',()=>{const queue=topPriorityCases();expect(queue).toHaveLength(6);expect(queue.every((item,index)=>index===0||queue[index-1].score>=item.score)).toBe(true);});
  it('changes incident membership when threshold changes',()=>{const loose=incidentSignals(72).filter(item=>item.related);const strict=incidentSignals(90).filter(item=>item.related);expect(loose.length).toBeGreaterThan(strict.length);});
  it('changes recovery authority and outcome with amount',()=>{const low=recoveryScenarios(3200)[0];const high=recoveryScenarios(7600)[0];expect(low.authority).not.toBe(high.authority);expect(high.trustOutcome).toBeGreaterThan(low.trustOutcome);});
});
