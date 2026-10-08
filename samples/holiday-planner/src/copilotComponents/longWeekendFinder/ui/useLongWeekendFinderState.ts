import * as React from 'react';

import { findLongWeekends } from '../../shared/domain/longWeekendMath/longWeekendMath';
import { calculateWorkingDays } from '../../shared/domain/workingDayMath/workingDayMath';
import { addDays, dateLabel, isoToday, isValidIsoDate } from '../../shared/domain/holidayFormat/holidayFormat';
import type { IHolidaySurfaceProps } from '../../shared/components/holidayPlannerComponentBase/HolidayPlannerComponentBase';
import type { ILongWeekendFinderProperties } from '../LongWeekendFinderCopilotComponentProperties';
import type { ILongWeekendFinderState, ILongWeekendFinderViewModel, LongWeekendSort } from './LongWeekendFinderApp.types';
import { getLongWeekendRegions, orderLongWeekends } from './LongWeekendFinderApp.utils';

export type LongWeekendFinderStateAction =
  | { type: 'propertiesChanged'; properties: ILongWeekendFinderProperties }
  | { type: 'startDateChanged'; value: string }
  | { type: 'endDateChanged'; value: string }
  | { type: 'countryChanged'; value: string }
  | { type: 'regionChanged'; value: string }
  | { type: 'sortChanged'; value: LongWeekendSort };

export function longWeekendFinderReducer(state: ILongWeekendFinderState, action: LongWeekendFinderStateAction): ILongWeekendFinderState {
  switch (action.type) {
    case 'propertiesChanged':
      return {
        ...state,
        startDate: action.properties.startDate || state.startDate,
        endDate: action.properties.endDate || state.endDate,
        country: action.properties.country || state.country,
        region: action.properties.region || state.region
      };
    case 'startDateChanged': return { ...state, startDate: action.value };
    case 'endDateChanged': return { ...state, endDate: action.value };
    case 'countryChanged': return { ...state, country: action.value, region: '' };
    case 'regionChanged': return { ...state, region: action.value };
    case 'sortChanged': return { ...state, sortBy: action.value };
  }
}

export function useLongWeekendFinderState(
  props: IHolidaySurfaceProps<ILongWeekendFinderProperties>
): ILongWeekendFinderViewModel {
  const data = props.dataService.getData();
  const today = isoToday();
  const [state, dispatch] = React.useReducer(longWeekendFinderReducer, {
    startDate: props.properties.startDate || today,
    endDate: props.properties.endDate || addDays(today, 120),
    country: props.properties.country || data.defaultCountry || 'Global',
    region: props.properties.region || '',
    sortBy: 'nearby'
  });

  React.useEffect(() => {
    dispatch({ type: 'propertiesChanged', properties: props.properties });
  }, [props.properties.startDate, props.properties.endDate, props.properties.country, props.properties.region]);

  const validDates = isValidIsoDate(state.startDate) && isValidIsoDate(state.endDate);
  const weekends = validDates
    ? findLongWeekends(state.startDate, state.endDate, data.holidays, state.country, state.region || undefined)
    : [];
  const ordered = orderLongWeekends(weekends, state.sortBy);
  const next = ordered[0];
  const nextRange = next ? `${dateLabel(next.startDate, { month: 'short' })} – ${dateLabel(next.endDate, { month: 'short' })}` : '';
  const workingDaysUntil = next && next.startDate > today
    ? calculateWorkingDays(today, addDays(next.startDate, -1), data.holidays, { country: state.country, region: state.region || undefined }).workingDays
    : 0;

  return {
    data,
    state,
    regions: getLongWeekendRegions(data.holidays, state.country),
    validDates,
    ordered,
    next,
    workingDaysUntil,
    compactSubtitle: [state.country, state.region, nextRange].filter(Boolean).join(' · '),
    onStartDateChange: (value) => dispatch({ type: 'startDateChanged', value }),
    onEndDateChange: (value) => dispatch({ type: 'endDateChanged', value }),
    onCountryChange: (value) => dispatch({ type: 'countryChanged', value }),
    onRegionChange: (value) => dispatch({ type: 'regionChanged', value }),
    onSortChange: (value) => dispatch({ type: 'sortChanged', value })
  };
}