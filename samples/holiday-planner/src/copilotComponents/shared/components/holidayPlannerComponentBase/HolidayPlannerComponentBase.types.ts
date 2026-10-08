import type { ICopilotComponentHostContext } from '@microsoft/sp-copilot-component';
import type { IHolidayDataService } from '../../data/holidayDataService/holidayDataService.types';

export interface IHolidaySurfaceProps<TProperties> {
  readonly dataService: IHolidayDataService;
  readonly hostContext: ICopilotComponentHostContext;
  readonly properties: TProperties;
  readonly propertiesVersion: number;
  readonly targetDocument?: Document;
  readonly onExpand: () => Promise<void>;
}