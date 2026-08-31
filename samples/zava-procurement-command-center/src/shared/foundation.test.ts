import { INTENTS, OPERATIONAL_LENSES } from './catalog';
import { DEFAULT_WEIGHTS, EVENTS, HERO_BIDS, REQUESTERS, REQUESTS, SUPPLIERS, VALUE_STAGES, normalizeScore, splitAward } from './domain';
import { buildLandscape, buildValueRiver } from './geometry';

describe('procurement foundation',()=>{
  it('owns 21 operational tools and one isolated explorer',()=>{expect(INTENTS).toHaveLength(22);expect(INTENTS.filter(i=>i.operation==='education')).toHaveLength(1);expect(OPERATIONAL_LENSES).toHaveLength(4);expect(new Set(INTENTS.map(i=>i.route)).size).toBe(22);});
  it('seeds the committed deterministic scale',()=>{expect(REQUESTERS).toHaveLength(220);expect(REQUESTS).toHaveLength(600);expect(SUPPLIERS).toHaveLength(90);expect(EVENTS).toHaveLength(18);expect(EVENTS[0].id).toBe('ZPC-RFP-31');});
  it('changes ranking when criteria change',()=>{const value=normalizeScore(HERO_BIDS[0],DEFAULT_WEIGHTS);const risk=normalizeScore(HERO_BIDS[0],{price:5,delivery:5,quality:10,risk:70,sustainability:10});expect(value).not.toBe(risk);});
  it('calculates an internally consistent split award',()=>{const result=splitAward(65);expect(result.primaryPercent+result.secondaryPercent).toBe(100);expect(result.cost).toBeLessThan(1200000);});
  it('changes landscape geometry with weights',()=>{const first=buildLandscape(HERO_BIDS,DEFAULT_WEIGHTS);const second=buildLandscape(HERO_BIDS,{price:5,delivery:5,quality:10,risk:70,sustainability:10});expect(first[0].y).not.toBe(second[0].y);});
  it('builds a non-empty spend river with exact points',()=>{const river=buildValueRiver(VALUE_STAGES);expect(river.areaPath.length).toBeGreaterThan(20);expect(river.points[3].value).toBe(186000);});
});