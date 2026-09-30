import * as React from 'react';

import { HolidayPlannerComponentBase } from '../shared/components/holidayPlannerComponentBase/HolidayPlannerComponentBase';
import type { IHolidaySurfaceProps } from '../shared/components/holidayPlannerComponentBase/HolidayPlannerComponentBase';
import { RegionalComparisonApp } from './ui/RegionalComparisonApp';
import type { IRegionalComparisonProperties } from './RegionalComparisonCopilotComponentProperties';

export default class RegionalComparisonCopilotComponent extends HolidayPlannerComponentBase<IRegionalComparisonProperties> {
  protected renderSurface(props: IHolidaySurfaceProps<IRegionalComparisonProperties>): React.ReactElement {
    // Expanding must keep the side-by-side comparison; the single-country dashboard would lose it.
    return <RegionalComparisonApp {...props} />;
  }
}