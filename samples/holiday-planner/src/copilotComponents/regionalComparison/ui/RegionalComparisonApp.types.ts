import type { IHoliday } from '../../shared/domain/holidayTypes';
import type { IHolidayData } from '../../shared/domain/holidayTypes';

export interface IRegionalComparisonState {
  startDate: string;
  endDate: string;
  selectedScopes: string[];
  scopeToAdd: string;
}

export interface IRegionalComparisonScope {
  scope: string;
  holidays: IHoliday[];
}

export interface IRegionalComparisonViewModel {
  data: IHolidayData;
  today: string;
  state: IRegionalComparisonState;
  allScopes: string[];
  allByScope: IRegionalComparisonScope[];
  sharedCount: number;
  uniqueCount: number;
  comparisonDates: string[];
  onStartDateChange(value: string): void;
  onEndDateChange(value: string): void;
  onScopeToAddChange(value: string): void;
  onAddScope(): void;
  onRemoveScope(scope: string): void;
}