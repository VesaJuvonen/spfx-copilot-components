export type HolidayType = 'Fixed' | 'Optional';

export interface IHoliday {
  id: number;
  sharePointId?: number;
  title: string;
  date: string;
  country: string;
  countries?: string[];
  region?: string;
  isOptional: boolean;
  description?: string;
}

export interface IHolidayData {
  defaultCountry?: string;
  savedCountry?: string;
  countryPreferenceUnavailable?: boolean;
  holidays: IHoliday[];
  isDemo: boolean;
  unavailableReason?: string;
}