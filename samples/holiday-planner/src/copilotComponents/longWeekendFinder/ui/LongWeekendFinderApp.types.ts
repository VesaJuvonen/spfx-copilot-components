import type { IHolidayData } from '../../shared/domain/holidayTypes';
import type { findLongWeekends } from '../../shared/domain/longWeekendMath/longWeekendMath';

export type LongWeekendSort = 'nearby' | 'days';

export interface ILongWeekendFinderState {
  startDate: string;
  endDate: string;
  country: string;
  region: string;
  sortBy: LongWeekendSort;
}

export type LongWeekendResult = ReturnType<typeof findLongWeekends>[number];

export interface ILongWeekendFinderViewModel {
  data: IHolidayData;
  state: ILongWeekendFinderState;
  regions: string[];
  validDates: boolean;
  ordered: LongWeekendResult[];
  next?: LongWeekendResult;
  workingDaysUntil: number;
  compactSubtitle: string;
  onStartDateChange(value: string): void;
  onEndDateChange(value: string): void;
  onCountryChange(value: string): void;
  onRegionChange(value: string): void;
  onSortChange(value: LongWeekendSort): void;
}