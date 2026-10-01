import * as React from 'react';

import { HolidayPlannerComponentBase } from '../shared/components/holidayPlannerComponentBase/HolidayPlannerComponentBase';
import type { IHolidaySurfaceProps } from '../shared/components/holidayPlannerComponentBase/HolidayPlannerComponentBase';
import { HolidayPlannerDashboard } from '../shared/components/holidayPlannerDashboard/HolidayPlannerDashboard';
import { WorkingDayCalculatorApp } from './ui/WorkingDayCalculatorApp';
import type { IWorkingDayCalculatorProperties } from './WorkingDayCalculatorCopilotComponentProperties';

export default class WorkingDayCalculatorCopilotComponent extends HolidayPlannerComponentBase<IWorkingDayCalculatorProperties> {
  protected renderSurface(props: IHolidaySurfaceProps<IWorkingDayCalculatorProperties>): React.ReactElement {
    if (props.hostContext.displayMode === 'fullscreen') {
      return <HolidayPlannerDashboard
        dataService={props.dataService}
        initialSection="overview"
        country={props.properties.country}
        region={props.properties.region}
        startDate={props.properties.startDate}
      />;
    }
    return <WorkingDayCalculatorApp {...props} />;
  }
}