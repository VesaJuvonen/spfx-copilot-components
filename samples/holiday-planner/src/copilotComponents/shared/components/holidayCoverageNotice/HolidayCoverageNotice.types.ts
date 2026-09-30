import type { IHoliday } from '../../domain/holidayTypes';

export interface IHolidayCoverageNoticeProps {
  readonly holidays: IHoliday[];
  readonly country: string;
  readonly region?: string;
  readonly defaultCountry?: string;
  readonly onSwitchCountry?: (country: string) => void;
  readonly className?: string;
}
