import type { ISeedHoliday } from './holidaySeedData.types';

export function createRecurringSeed(year: number): ISeedHoliday[] {
  return [
    { title: 'Republic Day', date: `${year}-01-26`, country: 'India', isOptional: false, description: 'National holiday in India.' },
    { title: 'Good Friday', date: `${year}-04-03`, country: 'India', isOptional: false, description: 'Public holiday observed by many Indian offices.' },
    { title: 'Early May bank holiday', date: `${year}-05-04`, country: 'United Kingdom', isOptional: false, description: 'UK bank holiday.' },
    { title: 'Summer bank holiday', date: `${year}-08-31`, country: 'United Kingdom', isOptional: false, description: 'UK bank holiday.' },
    { title: 'Independence Day', date: `${year}-08-15`, country: 'India', isOptional: false, description: 'National holiday in India.' },
    { title: 'Gandhi Jayanti', date: `${year}-10-02`, country: 'India', isOptional: false, description: 'National holiday in India.' },
    { title: 'Christmas Day', date: `${year}-12-25`, country: 'India', isOptional: false, description: 'National holiday in India.' },
    { title: 'Maharashtra Foundation Day', date: `${year}-05-01`, country: 'India', region: 'Maharashtra', isOptional: false, description: 'Region-specific public holiday in Maharashtra.' },
    { title: 'Ganesh Chaturthi', date: year === 2026 ? '2026-09-14' : `${year}-09-04`, country: 'India', region: 'Maharashtra', isOptional: true, description: 'Optional regional holiday; date varies by year.' },
    { title: 'Christmas Day', date: `${year}-12-25`, country: 'United Kingdom', isOptional: false, description: 'UK bank holiday.' },
    { title: 'Boxing Day (substitute day)', date: `${year}-12-28`, country: 'United Kingdom', isOptional: false, description: 'Substitute UK bank holiday.' }
  ];
}

export const DIWALI_DATES: Record<number, string> = {
  2026: '2026-11-08',
  2027: '2027-10-29',
  2028: '2028-10-17',
  2029: '2029-11-05'
};