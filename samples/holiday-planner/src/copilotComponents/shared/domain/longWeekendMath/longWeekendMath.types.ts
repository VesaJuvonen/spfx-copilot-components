import type { IHoliday } from '../holidayTypes';

export interface ILongWeekend {
  startDate: string;
  endDate: string;
  totalDays: number;
  bridgeDays: string[];
  holidays: IHoliday[];
}