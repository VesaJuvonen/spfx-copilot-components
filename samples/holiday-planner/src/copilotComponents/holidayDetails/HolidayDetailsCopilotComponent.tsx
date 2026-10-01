import * as React from 'react';

import { HolidayPlannerComponentBase } from '../shared/components/holidayPlannerComponentBase/HolidayPlannerComponentBase';
import type { IHolidaySurfaceProps } from '../shared/components/holidayPlannerComponentBase/HolidayPlannerComponentBase';
import { HolidayPlannerDashboard } from '../shared/components/holidayPlannerDashboard/HolidayPlannerDashboard';
import { HolidayDetailsApp } from './ui/HolidayDetailsApp';
import type { IHolidayDetailsProperties } from './HolidayDetailsCopilotComponentProperties';

export default class HolidayDetailsCopilotComponent extends HolidayPlannerComponentBase<IHolidayDetailsProperties> {
  protected renderSurface(props: IHolidaySurfaceProps<IHolidayDetailsProperties>): React.ReactElement {
    if (props.hostContext.displayMode === 'fullscreen') {
      return <HolidayPlannerDashboard
        dataService={props.dataService}
        initialSection="calendar"
        country={props.properties.country}
        region={props.properties.region}
        date={props.properties.date}
        holidayName={props.properties.holidayName}
      />;
    }
    return <HolidayDetailsApp {...props} />;
  }
}