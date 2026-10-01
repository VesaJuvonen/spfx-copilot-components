import type { IHoliday } from '../../shared/domain/holidayTypes';
import { dateLabel, holidayMatchesCountry, holidayTypeLabel, isoToday, isValidIsoDate } from '../../shared/domain/holidayFormat/holidayFormat';
import type { IUpcomingHolidaysProperties } from '../UpcomingHolidaysCopilotComponentProperties';
import type { IUpcomingHolidaysState } from './UpcomingHolidaysApp.types';

export function createUpcomingHolidaysState(properties: IUpcomingHolidaysProperties, today: string = isoToday()): IUpcomingHolidaysState {
  const startDate = properties.startDate && isValidIsoDate(properties.startDate) ? properties.startDate : undefined;
  const endDate = properties.endDate && isValidIsoDate(properties.endDate) ? properties.endDate : undefined;
  const referenceDate = new Date(`${startDate || today}T00:00:00.000Z`);
  const year = properties.year && Number.isInteger(properties.year) && properties.year >= 1000 && properties.year <= 9999
    ? properties.year : referenceDate.getUTCFullYear();
  const requestedMonth = properties.month && Number.isInteger(properties.month) && properties.month >= 1 && properties.month <= 12
    ? properties.month : undefined;
  const view = startDate || endDate || requestedMonth ? 'range'
    : properties.view === 'year' || (properties.year && properties.view !== 'upcoming') ? 'year' : 'upcoming';
  const month = requestedMonth ? requestedMonth - 1 : view === 'year' ? 0 : referenceDate.getUTCMonth();
  const monthStart = `${year}-${month + 1 < 10 ? '0' : ''}${month + 1}-01`;
  const monthEnd = new Date(Date.UTC(year, month + 1, 0)).toISOString().slice(0, 10);
  const explicitRange = !!(startDate || endDate);
  return {
    view,
    country: properties.country || 'Global',
    region: properties.region || '',
    type: properties.holidayType || '',
    rangeStart: startDate || (!explicitRange && view === 'year' ? `${year}-01-01` : !explicitRange && requestedMonth ? monthStart : today),
    rangeEnd: endDate || (!explicitRange && view === 'year' ? `${year}-12-31` : !explicitRange && requestedMonth ? monthEnd : ''),
    year,
    month,
    selectedHoliday: undefined
  };
}

export function holidayMatches(holiday: IHoliday, country: string, region: string, type: string): boolean {
  return holidayMatchesCountry(holiday, country) &&
    (!region || !holiday.region || holiday.region === region) &&
    (!type || holidayTypeLabel(holiday.isOptional) === type);
}

export function createCalendarCells(year: number, month: number): Array<number | undefined> {
  const leading = (new Date(Date.UTC(year, month, 1)).getUTCDay() + 6) % 7;
  const dayCount = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
  const cells: Array<number | undefined> = [...new Array(leading).fill(undefined), ...Array.from({ length: dayCount }, (_, index) => index + 1)];
  while (cells.length % 7) cells.push(undefined);
  return cells;
}

export function calendarDayLabel(date: string, holiday: IHoliday | undefined, weekend: boolean, today: boolean): string {
  return [dateLabel(date), holiday?.title, weekend ? 'weekend' : '', today ? 'today' : '']
    .filter(Boolean)
    .join(', ');
}