import { createDemoHolidays } from '../holidaySeedData/holidaySeedData';
import type { IHolidayDataService } from './holidayDataService.types';
import type { IHolidayHttpResponse } from '../holidayPlannerSite/holidayPlannerSite.types';
import type { IHoliday, IHolidayData } from '../../domain/holidayTypes';

export function parseHolidayRows(body: Record<string, unknown>): Record<string, unknown>[] {
  const data = body.value || body.d;
  if (Array.isArray(data)) return data as Record<string, unknown>[];
  if (data && typeof data === 'object') {
    const results = (data as Record<string, unknown>).results;
    return Array.isArray(results) ? results as Record<string, unknown>[] : [];
  }
  return [];
}

export function mapHolidayRow(row: Record<string, unknown>): IHoliday {
  const dateValue = String(row.HolidayDate || '');
  const countries = parseCountryValues(row.Country);
  const isOptional = Boolean(row.IsOptional);
  return {
    id: Number(row.Id),
    sharePointId: Number(row.Id),
    title: String(row.Title || 'Untitled holiday'),
    date: dateValue.slice(0, 10),
    country: countries[0] || '',
    countries: countries.length > 1 || countries[0] === 'Global' ? countries : undefined,
    region: row.Region ? String(row.Region) : undefined,
    isOptional,
    description: row.Description ? String(row.Description) : undefined
  };
}

function parseCountryValues(value: unknown): string[] {
  if (typeof value === 'string') return value.trim() ? [value.trim()] : [];
  if (Array.isArray(value)) return value.reduce<string[]>((countries, item) => countries.concat(parseCountryValues(item)), []);
  if (value && typeof value === 'object') {
    const record = value as Record<string, unknown>;
    return parseCountryValues(record.results ?? record.value);
  }
  return [];
}

export function makeDemoHolidayDataService(reason?: string): IHolidayDataService {
  const data: IHolidayData = { holidays: createDemoHolidays(), isDemo: true, unavailableReason: reason };
  return { getData: () => data };
}

export async function readHolidayJson(response: IHolidayHttpResponse): Promise<Record<string, unknown>> {
  if (!response.ok) throw new Error(`SharePoint request failed (${response.status}).`);
  return response.json();
}