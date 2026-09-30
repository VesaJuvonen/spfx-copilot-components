import type { calculateWorkingDays } from '../../shared/domain/workingDayMath/workingDayMath';
import type { IHolidayData } from '../../shared/domain/holidayTypes';

export interface IWorkingDayCalculatorState {
  startDate: string;
  endDate: string;
  country: string;
  region: string;
  includeOptional: boolean;
}

export interface IWorkingDayCalculatorViewModel {
  data: IHolidayData;
  state: IWorkingDayCalculatorState;
  regions: string[];
  validDates: boolean;
  calculation?: ReturnType<typeof calculateWorkingDays>;
  rangeDescription: string;
  locationDescription: string;
  onStartDateChange(value: string): void;
  onEndDateChange(value: string): void;
  onCountryChange(value: string): void;
  onRegionChange(value: string): void;
  onIncludeOptionalChange(value: boolean): void;
}