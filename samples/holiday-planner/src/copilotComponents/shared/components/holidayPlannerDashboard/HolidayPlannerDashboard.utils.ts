import { addMonths, holidayMatchesCountry, isValidIsoDate } from '../../domain/holidayFormat/holidayFormat';
import type { IDashboardCalendarState, IHolidayPlannerDashboardProps } from './HolidayPlannerDashboard.types';
import type { IHoliday } from '../../domain/holidayTypes';
import type { ILongWeekend } from '../../domain/longWeekendMath/longWeekendMath.types';

export const SECTION_IDS: Record<'overview' | 'calendar' | 'weekends', string> = {
  overview: 'holiday-planner-overview',
  calendar: 'holiday-planner-calendar',
  weekends: 'holiday-planner-weekends'
};

export function createDashboardCalendar(props: Pick<IHolidayPlannerDashboardProps, 'view' | 'year' | 'month' | 'date' | 'startDate' | 'endDate'>, today: string): IDashboardCalendarState {
  const requestedDate = props.date || props.startDate || today;
  const reference = new Date(`${isValidIsoDate(requestedDate) ? requestedDate : today}T00:00:00.000Z`);
  const year = props.year && Number.isInteger(props.year) && props.year >= 1000 && props.year <= 9999 ? props.year : reference.getUTCFullYear();
  const requestedMonth = props.month && Number.isInteger(props.month) && props.month >= 1 && props.month <= 12 ? props.month : undefined;
  const rangeStart = props.startDate && isValidIsoDate(props.startDate) ? props.startDate : '';
  const rangeEnd = props.endDate && isValidIsoDate(props.endDate) ? props.endDate : '';
  const calendarView = rangeStart || rangeEnd ? 'range' : requestedMonth ? 'month'
    : props.view === 'year' || (props.year && props.view !== 'upcoming' && !props.date) ? 'year' : 'upcoming';
  return { calendarView, year, month: requestedMonth ? requestedMonth - 1 : reference.getUTCMonth(), rangeStart, rangeEnd };
}

export function dashboardCalendarRange(state: IDashboardCalendarState): { start: string; end: string } {
  switch (state.calendarView) {
    case 'year': return { start: `${state.year}-01-01`, end: `${state.year}-12-31` };
    case 'month': return { start: formatIsoDate(state.year, state.month, 1), end: getMonthEnd(state.year, state.month) };
    case 'range': return { start: state.rangeStart, end: state.rangeEnd };
    case 'upcoming': return { start: formatIsoDate(state.year, state.month, 1), end: nextPeriodEnd(state.year, state.month) };
  }
}

export function formatIsoDate(year: number, month: number, day: number): string {
  return `${year}-${month < 9 ? '0' : ''}${month + 1}-${day < 10 ? '0' : ''}${day}`;
}

export function getMonthEnd(year: number, month: number): string {
  return new Date(Date.UTC(year, month + 1, 0)).toISOString().slice(0, 10);
}

export function matchesScope(holiday: IHoliday, country: string, region: string): boolean {
  return holidayMatchesCountry(holiday, country) && (!region || !holiday.region || holiday.region === region);
}

export interface IVacationPlan {
  tier: 'Quick escape' | 'Balanced plan' | 'Best value';
  startDate: string;
  endDate: string;
  totalDays: number;
  leaveDays: number;
  holidays: IHoliday[];
}

const PLAN_TIERS: ReadonlyArray<{ tier: IVacationPlan['tier']; leaveDays: number }> = [
  { tier: 'Quick escape', leaveDays: 1 },
  { tier: 'Balanced plan', leaveDays: 3 },
  { tier: 'Best value', leaveDays: 4 }
];

const HOLIDAY_ACCENTS = ['#6D3BE7', '#D946EF', '#F59E0B', '#0284C7', '#10B981'];

export function holidayAccentColor(holiday: IHoliday): string {
  return HOLIDAY_ACCENTS[Math.abs(holiday.id) % HOLIDAY_ACCENTS.length];
}

function dateFromIso(value: string): Date {
  return new Date(`${value}T00:00:00.000Z`);
}

function dateToIso(value: Date): string {
  return value.toISOString().slice(0, 10);
}

export function createVacationPlans(startDate: string, endDate: string, holidays: IHoliday[]): IVacationPlan[] {
  const periodStart = dateFromIso(startDate);
  const periodEnd = dateFromIso(endDate);
  if (Number.isNaN(periodStart.getTime()) || Number.isNaN(periodEnd.getTime())) return [];

  const first = periodStart.getTime() <= periodEnd.getTime() ? periodStart : periodEnd;
  const last = periodStart.getTime() <= periodEnd.getTime() ? periodEnd : periodStart;
  const holidayByDate = new Map(holidays
    .filter((holiday) => holiday.date >= dateToIso(first) && holiday.date <= dateToIso(last))
    .map((holiday) => [holiday.date, holiday]));
  const bestByLeaveDays = new Map<number, IVacationPlan>();
  const isLeaveDay = (date: string): boolean => {
    const weekday = dateFromIso(date).getUTCDay();
    return weekday !== 0 && weekday !== 6 && !holidayByDate.has(date);
  };
  // Leave days on the edge of a plan only lengthen it; prefer plans whose leave days bridge days off.
  const edgeLeaveDays = (plan: IVacationPlan): number => Number(isLeaveDay(plan.startDate)) + Number(isLeaveDay(plan.endDate));

  for (let start = new Date(first); start.getTime() <= last.getTime(); start.setUTCDate(start.getUTCDate() + 1)) {
    let leaveDays = 0;
    let weekendDays = 0;
    const includedHolidays: IHoliday[] = [];

    for (let end = new Date(start); end.getTime() <= last.getTime(); end.setUTCDate(end.getUTCDate() + 1)) {
      const date = dateToIso(end);
      const weekday = end.getUTCDay();
      const holiday = holidayByDate.get(date);
      if (holiday) includedHolidays.push(holiday);
      if (weekday === 0 || weekday === 6) weekendDays += 1;
      else if (!holiday) leaveDays += 1;

      if (leaveDays > 4 || leaveDays === 0 || weekendDays < 2 || includedHolidays.length === 0) continue;

      const plan: IVacationPlan = {
        tier: 'Quick escape',
        startDate: dateToIso(start),
        endDate: date,
        totalDays: Math.round((end.getTime() - start.getTime()) / 86400000) + 1,
        leaveDays,
        holidays: [...includedHolidays]
      };
      const existing = bestByLeaveDays.get(leaveDays);
      if (!existing || plan.totalDays > existing.totalDays ||
        (plan.totalDays === existing.totalDays && (edgeLeaveDays(plan) < edgeLeaveDays(existing) ||
          (edgeLeaveDays(plan) === edgeLeaveDays(existing) && plan.startDate < existing.startDate)))) {
        bestByLeaveDays.set(leaveDays, plan);
      }
    }
  }

  return PLAN_TIERS.reduce<IVacationPlan[]>((plans, { tier, leaveDays }) => {
    const plan = bestByLeaveDays.get(leaveDays);
    if (plan) plans.push({ ...plan, tier });
    return plans;
  }, []);
}

export function recommendVacationPlan(plans: IVacationPlan[]): IVacationPlan | undefined {
  return [...plans].sort((left, right) =>
    right.totalDays / right.leaveDays - left.totalDays / left.leaveDays ||
    right.totalDays - left.totalDays ||
    left.startDate.localeCompare(right.startDate)
  )[0];
}

export function datePart(value: string, part: 'month' | 'day'): string {
  const date = new Date(`${value}T00:00:00.000Z`);
  return part === 'month'
    ? new Intl.DateTimeFormat(undefined, { month: 'short', timeZone: 'UTC' }).format(date)
    : new Intl.DateTimeFormat(undefined, { day: '2-digit', timeZone: 'UTC' }).format(date);
}

export function rangeLabel(startDate: string, endDate: string): string {
  const start = new Date(`${startDate}T12:00:00.000Z`);
  const end = new Date(`${endDate}T12:00:00.000Z`);
  const sameYear = start.getUTCFullYear() === end.getUTCFullYear();
  const startLabel = new Intl.DateTimeFormat(undefined, { day: 'numeric', month: 'short', year: sameYear ? undefined : 'numeric', timeZone: 'UTC' }).format(start);
  const endLabel = new Intl.DateTimeFormat(undefined, { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' }).format(end);
  return `${startLabel} – ${endLabel}`;
}

export function nextPeriodEnd(year: number, month: number): string {
  const endMonth = addMonths(year, month, 2);
  return getMonthEnd(endMonth.year, endMonth.month);
}

export function recommendLongWeekend(weekends: ILongWeekend[]): ILongWeekend | undefined {
  return [...weekends].sort((left, right) => {
    return left.bridgeDays.length - right.bridgeDays.length ||
      right.totalDays - left.totalDays ||
      left.holidays.length - right.holidays.length ||
      left.startDate.localeCompare(right.startDate);
  })[0];
}