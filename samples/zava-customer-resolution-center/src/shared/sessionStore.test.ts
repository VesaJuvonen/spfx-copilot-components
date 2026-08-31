import { addReceipt, getReceipts, resetReceipts, subscribeReceipts } from './sessionStore';

describe('session-only resolution receipts',()=>{
  beforeEach(()=>resetReceipts());
  it('appends immutable deterministic receipts',()=>{const first=addReceipt('BuildResolutionPlan','Amina Yusuf','Verified rollback');const second=addReceipt('ReviewServiceRecovery','Megan Bowen','Approved extension');expect(first.id).toBe('ZCR-R001');expect(second.id).toBe('ZCR-R002');expect(getReceipts()).toHaveLength(2);});
  it('notifies subscribers and stops after unsubscribe',()=>{let calls=0;const unsubscribe=subscribeReceipts(()=>{calls+=1});addReceipt('BuildResolutionPlan','Amina Yusuf','Plan');unsubscribe();addReceipt('BuildResolutionPlan','Amina Yusuf','Plan 2');expect(calls).toBe(1);});
  it('reset restores an empty deterministic baseline',()=>{addReceipt('BuildResolutionPlan','Amina Yusuf','Plan');resetReceipts();expect(getReceipts()).toHaveLength(0);expect(addReceipt('BuildResolutionPlan','Amina Yusuf','New plan').id).toBe('ZCR-R001');});
});
