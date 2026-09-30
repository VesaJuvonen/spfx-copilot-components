import { scopedHolidays } from '../../shared/domain/holidayFormat/holidayFormat';
import type { IHoliday } from '../../shared/domain/holidayTypes';

export function scopeLabel(scope: string): string {
  const [country, region] = scope.split('|');
  return region ? `${region} · ${country}` : country;
}

export function holidayOn(holidays: IHoliday[], scope: string, date: string): IHoliday | undefined {
  return scopedHolidays(holidays, scope).find((holiday) => holiday.date === date);
}

export function hasScope(scopes: string[], scope: string): boolean {
  return new Set(scopes).has(scope);
}

export function countDatesByScope(scopes: ReadonlyArray<{ holidays: IHoliday[] }>): Map<string, number> {
  const counts = new Map<string, number>();
  scopes.forEach(({ holidays }) => {
    new Set(holidays.map((holiday) => holiday.date)).forEach((date) => counts.set(date, (counts.get(date) || 0) + 1));
  });
  return counts;
}