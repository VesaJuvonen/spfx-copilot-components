import { holidayCountryOptions, holidayMatchesCountry } from '../../domain/holidayFormat/holidayFormat';
import type { IHoliday } from '../../domain/holidayTypes';

export function hasHolidayCoverage(holidays: IHoliday[], country: string, region?: string): boolean {
  return holidays.some((holiday) => holidayMatchesCountry(holiday, country) && (!region || !holiday.region || holiday.region === region));
}

export function suggestCoveredCountry(holidays: IHoliday[], country: string, defaultCountry?: string): string | undefined {
  const covered = new Set(holidayCountryOptions(holidays).filter((item) => item !== 'Global' && item !== country && hasHolidayCoverage(holidays, item)));
  if (defaultCountry && covered.has(defaultCountry)) return defaultCountry;
  return Array.from(covered)[0];
}
