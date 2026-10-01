import type { IHoliday } from '../holidayTypes';

export interface IWorkingDayCalculationOptions {
  country?: string;
  region?: string;
  includeOptional?: boolean;
}

export interface IWorkingDayCalculation {
  startDate: string;
  endDate: string;
  invertedRange: boolean;
  totalDays: number;
  weekendsExcluded: number;
  holidaysExcluded: IHoliday[];
  workingDays: number;
  hasHolidayData: boolean;
}