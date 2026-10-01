import type { IHolidayData } from '../../domain/holidayTypes';

export interface IHolidayDataService {
  getData(): IHolidayData;
  saveDefaultCountry?(country: string): Promise<void>;
}