import type { IHoliday } from '../holidayTypes';
import { holidayMatchesCountry } from '../holidayFormat/holidayFormat';
import type { IWorkingDayCalculation, IWorkingDayCalculationOptions } from './workingDayMath.types';

export type { IWorkingDayCalculation, IWorkingDayCalculationOptions } from './workingDayMath.types';

function toUtcDate(value: string): Date | undefined {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) {
    return undefined;
  }
  const date = new Date(Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3])));
  return date.toISOString().slice(0, 10) === value ? date : undefined;
}

function matchesLocation(holiday: IHoliday, country?: string, region?: string): boolean {
  return (
    holidayMatchesCountry(holiday, country) &&
    (!region || !holiday.region || holiday.region === region)
  );
}

export function calculateWorkingDays(
  startDate: string,
  endDate: string,
  holidays: IHoliday[],
  options: IWorkingDayCalculationOptions = {}
): IWorkingDayCalculation {
  const first = toUtcDate(startDate);
  const last = toUtcDate(endDate);
  if (!first || !last) {
    throw new Error('Start and end dates must be valid ISO dates (yyyy-mm-dd).');
  }

  const invertedRange = first.getTime() > last.getTime();
  const start = invertedRange ? last : first;
  const end = invertedRange ? first : last;
  const matchingHolidays = holidays.filter(
    (holiday) =>
      matchesLocation(holiday, options.country, options.region) &&
      (!holiday.isOptional || options.includeOptional === true)
  );
  const holidayByDate = new Map<string, IHoliday>();
  matchingHolidays.forEach((holiday) => {
    holidayByDate.set(holiday.date, holiday);
  });

  let totalDays = 0;
  let weekendsExcluded = 0;
  let workingDays = 0;
  const holidaysExcluded = new Map<string, IHoliday>();

  for (let cursor = new Date(start); cursor.getTime() <= end.getTime(); cursor.setUTCDate(cursor.getUTCDate() + 1)) {
    totalDays += 1;
    const weekday = cursor.getUTCDay();
    const isoDate = cursor.toISOString().slice(0, 10);
    if (weekday === 0 || weekday === 6) {
      weekendsExcluded += 1;
      continue;
    }
    const holiday = holidayByDate.get(isoDate);
    if (holiday) {
      holidaysExcluded.set(isoDate, holiday);
    } else {
      workingDays += 1;
    }
  }

  return {
    startDate: start.toISOString().slice(0, 10),
    endDate: end.toISOString().slice(0, 10),
    invertedRange,
    totalDays,
    weekendsExcluded,
    holidaysExcluded: Array.from(holidaysExcluded.values()),
    workingDays,
    hasHolidayData: holidays.some((holiday) => matchesLocation(holiday, options.country, options.region))
  };
}