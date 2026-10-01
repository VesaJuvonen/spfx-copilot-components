import type { IHoliday } from '../../domain/holidayTypes';
import { createRecurringSeed, DIWALI_DATES } from './holidaySeedData.utils';

export function createDemoHolidays(currentYear: number = new Date().getFullYear()): IHoliday[] {
  const rows: IHoliday[] = [];
  for (let year = currentYear - 1; year <= currentYear + 3; year += 1) {
    const items = createRecurringSeed(year);
    if (year === 2026) {
      items.push({
        title: 'Maharashtra Company Planning Day',
        date: '2026-10-01',
        country: 'India',
        region: 'Maharashtra',
        isOptional: false,
        description: 'Sample company holiday. Friday is a suggested bridge day before the weekend.'
      });
    }
    const diwaliDate = DIWALI_DATES[year];
    if (diwaliDate) {
      items.push({
        title: 'Diwali',
        date: diwaliDate,
        country: 'India',
        isOptional: false,
        description: 'Festival of lights; observed as a public holiday by many organizations.'
      });
    }
    items.forEach((item, index) => {
      rows.push({
        id: year * 100 + index + 1,
        ...item,
        isOptional: item.isOptional
      });
    });
  }
  return rows.sort((left, right) => left.date.localeCompare(right.date));
}