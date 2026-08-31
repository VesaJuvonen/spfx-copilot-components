import { INTENTS, LENS_LABELS } from './catalog';

describe('customer resolution catalog', () => {
  it('owns 21 unique immutable tools and routes', () => {
    expect(INTENTS).toHaveLength(21);
    expect(new Set(INTENTS.map((item) => item.key)).size).toBe(21);
    expect(new Set(INTENTS.map((item) => item.route)).size).toBe(21);
  });
  it('has four operational lenses and one isolated education lens', () => {
    expect(Object.keys(LENS_LABELS)).toEqual(['my-queue','customer-360','resolution-room','service-operations','education']);
    expect(INTENTS.filter((item) => item.operation === 'education')).toHaveLength(1);
  });
  it('gives every tool routing guidance and a realistic prompt', () => {
    for (const item of INTENTS) {
      expect(item.excludes.length).toBeGreaterThan(20);
      expect(item.prompt.length).toBeGreaterThan(20);
      expect(item.decisionQuestion.endsWith('?')).toBe(true);
    }
  });
});
