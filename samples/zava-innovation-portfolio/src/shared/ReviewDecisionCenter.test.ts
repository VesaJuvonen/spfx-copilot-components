import { REVIEW_SUBMISSIONS } from './ReviewDecisionCenter';

describe('review decision catalog',()=>{
  it('provides actionable submissions across every review phase',()=>{
    const pending=REVIEW_SUBMISSIONS.filter(item=>item.status==='pending');
    expect(pending).toHaveLength(4);
    expect(new Set(pending.map(item=>item.phase))).toEqual(new Set(['Screening','Business case','Pilot']));
    expect(REVIEW_SUBMISSIONS.filter(item=>item.phase==='Screening'&&item.status==='pending')).toHaveLength(2);
  });

  it('includes inspectable approved, declined, and sent-back outcomes',()=>{
    expect(REVIEW_SUBMISSIONS.some(item=>item.status==='approved'&&item.storedRationale)).toBe(true);
    expect(REVIEW_SUBMISSIONS.some(item=>item.status==='declined'&&item.storedRationale)).toBe(true);
    expect(REVIEW_SUBMISSIONS.some(item=>item.status==='sentBack'&&item.storedRationale)).toBe(true);
  });
});