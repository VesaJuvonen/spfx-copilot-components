import type { IHoliday } from '../holidayTypes';
import { holidayMatchesCountry } from '../holidayFormat/holidayFormat';
import type { ILongWeekend } from './longWeekendMath.types';

export type { ILongWeekend } from './longWeekendMath.types';

function parseDate(value: string): Date {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return new Date(Number.NaN);
  }
  const date = new Date(`${value}T00:00:00.000Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value
    ? date
    : new Date(Number.NaN);
}

function isWeekend(value: Date): boolean {
  return value.getUTCDay() === 0 || value.getUTCDay() === 6;
}

export function findLongWeekends(
  startDate: string,
  endDate: string,
  holidays: IHoliday[],
  country?: string,
  region?: string
): ILongWeekend[] {
  const start = parseDate(startDate);
  const end = parseDate(endDate);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
    throw new TypeError('Start and end dates must be valid ISO dates (yyyy-mm-dd).');
  }

  const low = start.getTime() <= end.getTime() ? start : end;
  const high = start.getTime() <= end.getTime() ? end : start;
  const relevant = holidays.filter(
    (holiday) =>
      holidayMatchesCountry(holiday, country) &&
      (!region || !holiday.region || holiday.region === region)
  );
  const holidayDates = new Map(relevant.map((holiday) => [holiday.date, holiday]));
  const isDayOff = (value: Date): boolean => isWeekend(value) || holidayDates.has(value.toISOString().slice(0, 10));
  const candidates = new Map<string, ILongWeekend>();

  // Consider windows of 3+ days around every weekend. Both ends of a window
  // must already be days off (weekend or holiday), so a bridge day is only
  // suggested when it sits between two days off rather than extending an edge.
  for (let saturday = new Date(low); saturday.getTime() <= high.getTime(); saturday.setUTCDate(saturday.getUTCDate() + 1)) {
    if (saturday.getUTCDay() !== 6) {
      continue;
    }
    for (let startOffset = -3; startOffset <= 0; startOffset += 1) {
      for (let endOffset = 1; endOffset <= 4; endOffset += 1) {
        if (endOffset - startOffset + 1 < 3) {
          continue;
        }
        const candidateStart = new Date(saturday);
        candidateStart.setUTCDate(candidateStart.getUTCDate() + startOffset);
        const candidateEnd = new Date(saturday);
        candidateEnd.setUTCDate(candidateEnd.getUTCDate() + endOffset);
        if (candidateStart.getTime() < low.getTime() || candidateEnd.getTime() > high.getTime()) {
          continue;
        }
        if (!isDayOff(candidateStart) || !isDayOff(candidateEnd)) {
          continue;
        }

        const dates: string[] = [];
        const bridgeDays: string[] = [];
        const includedHolidays: IHoliday[] = [];
        let weekendDays = 0;
        for (let cursor = new Date(candidateStart); cursor.getTime() <= candidateEnd.getTime(); cursor.setUTCDate(cursor.getUTCDate() + 1)) {
          const isoDate = cursor.toISOString().slice(0, 10);
          dates.push(isoDate);
          if (isWeekend(cursor)) {
            weekendDays += 1;
          } else if (holidayDates.has(isoDate)) {
            includedHolidays.push(holidayDates.get(isoDate)!);
          } else {
            bridgeDays.push(isoDate);
          }
        }

        if (weekendDays < 2 || bridgeDays.length > 1 || includedHolidays.length === 0) {
          continue;
        }

        const candidateStartDate = dates[0];
        const candidateEndDate = dates[dates.length - 1];
        candidates.set(`${candidateStartDate}:${candidateEndDate}`, {
          startDate: candidateStartDate,
          endDate: candidateEndDate,
          totalDays: dates.length,
          bridgeDays,
          holidays: includedHolidays
        });
      }
    }
  }

  // Drop a window when a longer window contains it without needing more bridge days.
  const all = Array.from(candidates.values());
  const results = all.filter((candidate) => !all.some((other) =>
    other !== candidate &&
    other.startDate <= candidate.startDate &&
    other.endDate >= candidate.endDate &&
    other.totalDays > candidate.totalDays &&
    other.bridgeDays.length <= candidate.bridgeDays.length
  ));

  return results.sort(
    (left, right) => left.startDate.localeCompare(right.startDate) ||
      left.bridgeDays.length - right.bridgeDays.length ||
      right.totalDays - left.totalDays
  );
}