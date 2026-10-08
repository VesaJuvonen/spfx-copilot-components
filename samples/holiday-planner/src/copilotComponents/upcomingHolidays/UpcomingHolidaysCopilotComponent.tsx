import * as React from 'react';

import { HolidayPlannerComponentBase } from '../shared/components/holidayPlannerComponentBase/HolidayPlannerComponentBase';
import type { IHolidaySurfaceProps } from '../shared/components/holidayPlannerComponentBase/HolidayPlannerComponentBase';
import { UpcomingHolidaysApp } from './ui/UpcomingHolidaysApp';
import { HolidayPlannerDashboard } from '../shared/components/holidayPlannerDashboard/HolidayPlannerDashboard';
import type { IUpcomingHolidaysProperties } from './UpcomingHolidaysCopilotComponentProperties';

export default class UpcomingHolidaysCopilotComponent extends HolidayPlannerComponentBase<IUpcomingHolidaysProperties> {
  protected renderSurface(props: IHolidaySurfaceProps<IUpcomingHolidaysProperties>): React.ReactElement {
    const requestedMonth = props.properties.month;
    const month = typeof requestedMonth === 'number' && Number.isInteger(requestedMonth) && requestedMonth >= 1 && requestedMonth <= 12
      ? requestedMonth
      : undefined;
    const properties = { ...props.properties, month };
    if (props.hostContext.displayMode === 'fullscreen') {
      return <HolidayPlannerDashboard dataService={props.dataService} initialSection="calendar" {...properties} />;
    }
    return <UpcomingHolidaysApp {...props} properties={properties} />;
  }
}