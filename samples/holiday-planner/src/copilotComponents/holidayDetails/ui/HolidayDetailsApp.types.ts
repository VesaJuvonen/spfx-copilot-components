import type { IHoliday } from '../../shared/domain/holidayTypes';

export interface IHolidayDetailsState {
  date: string;
  holidayName: string;
  country: string;
  region: string;
}

export interface IHolidayDetailsSurroundingDate {
  date: string;
  holiday?: IHoliday;
  weekday: number;
}

export interface IHolidayDetailsViewModel {
  data: import('../../shared/domain/holidayTypes').IHolidayData;
  state: IHolidayDetailsState;
  regions: string[];
  targetDate: string;
  holiday?: IHoliday;
  validDate: boolean;
  compactSubtitle: string;
  weekday: number;
  calendarAvailable: boolean;
  surrounding: IHolidayDetailsSurroundingDate[];
  onDateChange(value: string): void;
  onHolidayNameChange(value: string): void;
  onCountryChange(value: string): void;
  onRegionChange(value: string): void;
}