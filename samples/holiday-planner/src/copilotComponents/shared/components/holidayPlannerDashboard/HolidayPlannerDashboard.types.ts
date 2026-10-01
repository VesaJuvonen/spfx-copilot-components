import type { IHolidayDataService } from '../../data/holidayDataService/holidayDataService.types';
import type { HolidayType, IHoliday } from '../../domain/holidayTypes';

export type DashboardSection = 'overview' | 'calendar' | 'weekends';
export type DashboardCalendarView = 'upcoming' | 'month' | 'year' | 'range';

export interface IDashboardCalendarState {
  calendarView: DashboardCalendarView;
  rangeStart: string;
  rangeEnd: string;
  year: number;
  month: number;
}

export interface IHolidayPlannerDashboardProps {
  readonly dataService: IHolidayDataService;
  readonly country?: string;
  readonly region?: string;
  readonly startDate?: string;
  readonly endDate?: string;
  readonly view?: 'upcoming' | 'year';
  readonly holidayType?: HolidayType;
  readonly date?: string;
  readonly holidayName?: string;
  readonly year?: number;
  readonly month?: number;
  readonly initialSection?: DashboardSection;
}

export interface IHolidayPlannerDashboardState extends IDashboardCalendarState {
  country: string;
  region: string;
  holidayType: string;
  selectedHolidayId?: number;
}

export interface IHolidayPlannerDashboardStat {
  icon: React.ReactNode;
  label: string;
  value: string;
  detail: string;
}

export interface IHolidayPlannerDashboardViewModel {
  data: ReturnType<IHolidayDataService['getData']>;
  dashboardRef: React.RefCallback<HTMLElement>;
  state: IHolidayPlannerDashboardState;
  countryOptions: string[];
  regionOptions: string[];
  visibleHolidays: IHoliday[];
  upcomingHolidays: IHoliday[];
  nextHoliday?: IHoliday;
  selectedHoliday?: IHoliday;
  selectedHolidayIsPast: boolean;
  selectedHolidayOnWeekend: boolean;
  selectedHolidayBreak?: ReturnType<typeof import('../../domain/longWeekendMath/longWeekendMath').findLongWeekends>[number];
  longWeekends: ReturnType<typeof import('../../domain/longWeekendMath/longWeekendMath').findLongWeekends>;
  recommendedLongWeekend?: ReturnType<typeof import('../../domain/longWeekendMath/longWeekendMath').findLongWeekends>[number];
  longWeekendWorkingDaysUntil: number;
  vacationPlans: ReturnType<typeof import('./HolidayPlannerDashboard.utils').createVacationPlans>;
  recommendedVacationPlan?: ReturnType<typeof import('./HolidayPlannerDashboard.utils').createVacationPlans>[number];
  workingDays: number;
  periodEnd: string;
  yearOptions: number[];
  stats: IHolidayPlannerDashboardStat[];
  calendarStart: string;
  calendarEnd: string;
  calendarValid: boolean;
  savedCountry?: string;
  savingCountry: boolean;
  countrySaveMessage: string;
  countrySaveFailed: boolean;
  saveCountry(): Promise<void>;
  onCalendarViewChange(value: DashboardCalendarView): void;
  onRangeStartChange(value: string): void;
  onRangeEndChange(value: string): void;
  onHolidayTypeChange(value: string): void;
  moveCalendar(amount: number): void;
  moveMonth(amount: number): void;
  onCountryChange(value: string): void;
  onRegionChange(value: string): void;
  onYearChange(value: number): void;
  onHolidaySelect(id: number): void;
}