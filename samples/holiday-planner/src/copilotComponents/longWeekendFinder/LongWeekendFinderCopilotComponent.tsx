import * as React from 'react';

import { HolidayPlannerComponentBase } from '../shared/components/holidayPlannerComponentBase/HolidayPlannerComponentBase';
import type { IHolidaySurfaceProps } from '../shared/components/holidayPlannerComponentBase/HolidayPlannerComponentBase';
import { HolidayPlannerDashboard } from '../shared/components/holidayPlannerDashboard/HolidayPlannerDashboard';
import { LongWeekendFinderApp } from './ui/LongWeekendFinderApp';
import type { ILongWeekendFinderProperties } from './LongWeekendFinderCopilotComponentProperties';

export default class LongWeekendFinderCopilotComponent extends HolidayPlannerComponentBase<ILongWeekendFinderProperties> {
  protected renderSurface(props: IHolidaySurfaceProps<ILongWeekendFinderProperties>): React.ReactElement {
    if (props.hostContext.displayMode === 'fullscreen') {
      return <HolidayPlannerDashboard
        dataService={props.dataService}
        initialSection="weekends"
        country={props.properties.country}
        region={props.properties.region}
        startDate={props.properties.startDate}
      />;
    }
    return <LongWeekendFinderApp {...props} />;
  }
}