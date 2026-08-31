import type { ServiceIntentKey } from './catalog';

export interface IServiceReceipt { readonly id: string; readonly intent: ServiceIntentKey; readonly detail: string; readonly actor: string; readonly createdAt: string; }
const storageKey = 'zava-customer-resolution-receipts-v1';
let memory: readonly IServiceReceipt[] = [];
let sequence = 0;
const listeners = new Set<() => void>();

const readStorage = (): readonly IServiceReceipt[] => {
  try { const value = globalThis.sessionStorage?.getItem(storageKey); return value ? JSON.parse(value) as readonly IServiceReceipt[] : memory; }
  catch { return memory; }
};
export const getReceipts = (): readonly IServiceReceipt[] => readStorage();
export const subscribeReceipts = (listener: () => void): (() => void) => { listeners.add(listener); return () => listeners.delete(listener); };
export const addReceipt = (intent: ServiceIntentKey, actor: string, detail: string): IServiceReceipt => {
  sequence += 1;
  const receipt: IServiceReceipt = { id:`ZCR-R${(`00${sequence}`).slice(-3)}`, intent, actor, detail, createdAt:new Date(Date.UTC(2026,7,31,14,sequence)).toISOString() };
  memory = [...readStorage(), receipt];
  try { globalThis.sessionStorage?.setItem(storageKey, JSON.stringify(memory)); } catch { /* sandbox fallback */ }
  listeners.forEach((listener) => listener());
  return receipt;
};
export const resetReceipts = (): void => { memory=[]; sequence=0; try { globalThis.sessionStorage?.removeItem(storageKey); } catch { /* sandbox fallback */ } listeners.forEach((listener)=>listener()); };
