import type { HolidayType, IHoliday } from '../holidayTypes';

export const HOLIDAY_COUNTRIES = ['India', 'United Kingdom'];

export function holidayTypeLabel(isOptional: boolean): HolidayType {
  return isOptional ? 'Optional' : 'Fixed';
}

export function holidayCountryOptions(holidays: IHoliday[], selectedCountry?: string): string[] {
  return Array.from(new Set(holidays.reduce<string[]>((countries, holiday) => countries.concat(holidayCountryValues(holiday)), [])
    .concat(selectedCountry || [], 'Global'))).filter(Boolean).sort((left, right) => left.localeCompare(right));
}

export function holidayCountryValues(holiday: IHoliday): string[] {
  return holiday.countries?.length ? holiday.countries : [holiday.country].filter(Boolean);
}

export function holidayMatchesCountry(holiday: IHoliday, country?: string): boolean {
  if (!country) return true;
  const countries = holidayCountryValues(holiday);
  return countries.some((item) => item === 'Global' || item === country);
}

export function holidayCountryLabel(holiday: IHoliday): string {
  const countries = holidayCountryValues(holiday);
  return countries.some((item) => item === 'Global') ? 'Global' : countries.join(', ');
}

export function isoToday(): string {
  const date = new Date();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${date.getFullYear()}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
}

export function isValidIsoDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }
  const date = new Date(`${value}T00:00:00.000Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

export function dateLabel(value: string, options: Intl.DateTimeFormatOptions = {}): string {
  const date = new Date(`${value}T12:00:00`);
  return new Intl.DateTimeFormat(undefined, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    ...options
  }).format(date);
}

export function monthLabel(year: number, month: number): string {
  return new Intl.DateTimeFormat(undefined, {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC'
  }).format(new Date(Date.UTC(year, month, 1)));
}

export function addDays(value: string, amount: number): string {
  const date = new Date(`${value}T00:00:00.000Z`);
  date.setUTCDate(date.getUTCDate() + amount);
  return date.toISOString().slice(0, 10);
}

export function addMonths(year: number, month: number, amount: number): { year: number; month: number } {
  const date = new Date(Date.UTC(year, month + amount, 1));
  return { year: date.getUTCFullYear(), month: date.getUTCMonth() };
}

export function scopedHolidays(holidays: IHoliday[], scope: string): IHoliday[] {
  const [country, region] = scope.split('|');
  return holidays.filter(
    (holiday) =>
      holidayMatchesCountry(holiday, country) &&
      (region ? !holiday.region || holiday.region === region : !holiday.region)
  );
}

export function holidayForDate(holidays: IHoliday[], date: string, country?: string, region?: string): IHoliday | undefined {
  return holidays.find(
    (holiday) =>
      holiday.date === date &&
      holidayMatchesCountry(holiday, country) &&
      (region ? !holiday.region || holiday.region === region : !holiday.region)
  );
}