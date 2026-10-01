import type { IHoliday, IHolidayData } from '../../shared/domain/holidayTypes';

export interface IUpcomingHolidaysState {
  view: 'upcoming' | 'year' | 'range';
  country: string;
  region: string;
  type: string;
  rangeStart: string;
  rangeEnd: string;
  month: number;
  year: number;
  selectedHoliday?: IHoliday;
}

export interface IUpcomingHolidaysViewModel {
  data: IHolidayData;
  state: IUpcomingHolidaysState;
  today: string;
  regions: string[];
  upcoming: IHoliday[];
  next?: IHoliday;
  workingDaysUntil: number;
  monthHolidays: IHoliday[];
  cells: Array<number | undefined>;
  onViewChange(value: IUpcomingHolidaysState['view']): void;
  onYearChange(value: number): void;
  onRangeStartChange(value: string): void;
  onRangeEndChange(value: string): void;
  onCountryChange(value: string): void;
  onRegionChange(value: string): void;
  onTypeChange(value: string): void;
  onSelectHoliday(value?: IHoliday): void;
  onMoveMonth(amount: number): void;
}