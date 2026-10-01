import { addDays, holidayForDate, holidayMatchesCountry } from '../../shared/domain/holidayFormat/holidayFormat';
import type { IHoliday } from '../../shared/domain/holidayTypes';
import type { IHolidayDetailsSurroundingDate } from './HolidayDetailsApp.types';

export function getHolidayRegions(holidays: IHoliday[], country: string): string[] {
  return Array.from(new Set(holidays
    .filter((holiday) => holidayMatchesCountry(holiday, country) && holiday.region)
    .map((holiday) => holiday.region as string)));
}

export function findNamedHoliday(
  holidays: IHoliday[],
  name: string,
  country: string,
  region: string
): IHoliday | undefined {
  if (!name) return undefined;
  return holidays.find((holiday) =>
    holiday.title.toLowerCase().includes(name.toLowerCase()) &&
    holidayMatchesCountry(holiday, country) &&
    (region ? !holiday.region || holiday.region === region : !holiday.region)
  );
}

export function getSurroundingDates(
  date: string,
  holidays: IHoliday[],
  country: string,
  region: string
): IHolidayDetailsSurroundingDate[] {
  return [-3, -2, -1, 0, 1, 2, 3].map((offset) => {
    const day = addDays(date, offset);
    return {
      date: day,
      holiday: holidayForDate(holidays, day, country, region || undefined),
      weekday: new Date(`${day}T00:00:00.000Z`).getUTCDay()
    };
  });
}