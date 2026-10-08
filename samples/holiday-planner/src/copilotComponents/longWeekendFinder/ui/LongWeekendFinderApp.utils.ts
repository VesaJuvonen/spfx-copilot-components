import type { IHoliday } from '../../shared/domain/holidayTypes';
import { holidayMatchesCountry } from '../../shared/domain/holidayFormat/holidayFormat';
import { findLongWeekends } from '../../shared/domain/longWeekendMath/longWeekendMath';
import type { LongWeekendSort } from './LongWeekendFinderApp.types';

export function getLongWeekendRegions(holidays: IHoliday[], country: string): string[] {
  return Array.from(new Set(holidays
    .filter((holiday) => holidayMatchesCountry(holiday, country) && holiday.region)
    .map((holiday) => holiday.region as string)));
}

export function orderLongWeekends<T extends ReturnType<typeof findLongWeekends>[number]>(
  weekends: T[],
  sortBy: LongWeekendSort
): T[] {
  return [...weekends].sort((left, right) => sortBy === 'days'
    ? right.totalDays - left.totalDays || left.bridgeDays.length - right.bridgeDays.length || left.startDate.localeCompare(right.startDate)
    : left.startDate.localeCompare(right.startDate) || left.bridgeDays.length - right.bridgeDays.length || right.totalDays - left.totalDays);
}