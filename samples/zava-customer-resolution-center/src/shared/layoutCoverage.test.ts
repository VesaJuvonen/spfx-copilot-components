/// <reference types="node" />
import fs from 'fs';import path from 'path';
import { INTENTS } from './catalog';

describe('purpose-specific visual coverage',()=>{
  const sharedRoot=path.resolve(__dirname,'..','..','src','shared');
  const inlineSource=fs.readFileSync(path.join(sharedRoot,'ServiceInlineExperiences.tsx'),'utf8');
  const dashboardSource=fs.readFileSync(path.join(sharedRoot,'ServiceDashboards.tsx'),'utf8');
  it('routes every catalog intent through an explicit inline case',()=>{for(const intent of INTENTS)expect(inlineSource).toContain(`case'${intent.key}'`);});
  it('keeps every inline default layout identity unique',()=>{const layouts=Array.from(inlineSource.matchAll(/data-layout="([^"]+)"/g),match=>match[1]);expect(new Set(layouts).size).toBe(layouts.length);expect(layouts.length).toBeGreaterThanOrEqual(21);});
  it('keeps four dashboard identities and compositions distinct',()=>{const layouts=['my-queue-judgment-cockpit','customer-360-promise-constellation','resolution-room-evidence-command','service-operations-intervention-command'];for(const layout of layouts)expect(dashboardSource).toContain(`data-layout="${layout}"`);expect(new Set(layouts).size).toBe(4);});
});
