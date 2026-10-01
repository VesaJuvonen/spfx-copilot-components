import * as React from 'react';

import { calculateWorkingDays } from '../../shared/domain/workingDayMath/workingDayMath';
import { dateLabel, holidayMatchesCountry, isoToday, isValidIsoDate } from '../../shared/domain/holidayFormat/holidayFormat';
import type { IHolidaySurfaceProps } from '../../shared/components/holidayPlannerComponentBase/HolidayPlannerComponentBase';
import type { IWorkingDayCalculatorProperties } from '../WorkingDayCalculatorCopilotComponentProperties';
import type { IWorkingDayCalculatorState, IWorkingDayCalculatorViewModel } from './WorkingDayCalculatorApp.types';
import { monthEnd } from './WorkingDayCalculatorApp.utils';

type StateAction =
  | { type: 'propertiesChanged'; properties: IWorkingDayCalculatorProperties }
  | { type: 'startDateChanged'; value: string }
  | { type: 'endDateChanged'; value: string }
  | { type: 'countryChanged'; value: string }
  | { type: 'regionChanged'; value: string }
  | { type: 'includeOptionalChanged'; value: boolean };

function reducer(state: IWorkingDayCalculatorState, action: StateAction): IWorkingDayCalculatorState {
  switch (action.type) {
    case 'propertiesChanged':
      return {
        startDate: action.properties.startDate || state.startDate,
        endDate: action.properties.endDate || state.endDate,
        country: action.properties.country || state.country,
        region: action.properties.region || state.region,
        includeOptional: typeof action.properties.includeOptional === 'boolean' ? action.properties.includeOptional : state.includeOptional
      };
    case 'startDateChanged': return { ...state, startDate: action.value };
    case 'endDateChanged': return { ...state, endDate: action.value };
    case 'countryChanged': return { ...state, country: action.value, region: '' };
    case 'regionChanged': return { ...state, region: action.value };
    case 'includeOptionalChanged': return { ...state, includeOptional: action.value };
  }
}

export function useWorkingDayCalculatorState(
  props: IHolidaySurfaceProps<IWorkingDayCalculatorProperties>
): IWorkingDayCalculatorViewModel {
  const data = props.dataService.getData();
  const today = isoToday();
  const [state, dispatch] = React.useReducer(reducer, {
    startDate: props.properties.startDate || today,
    endDate: props.properties.endDate || monthEnd(today),
    country: props.properties.country || data.defaultCountry || 'Global',
    region: props.properties.region || '',
    includeOptional: props.properties.includeOptional || false
  });

  React.useEffect(() => {
    dispatch({ type: 'propertiesChanged', properties: props.properties });
  }, [props.properties.startDate, props.properties.endDate, props.properties.country, props.properties.region, props.properties.includeOptional]);

  const validDates = isValidIsoDate(state.startDate) && isValidIsoDate(state.endDate);
  const calculation = React.useMemo(
    () => validDates ? calculateWorkingDays(state.startDate, state.endDate, data.holidays, {
      country: state.country,
      region: state.region || undefined,
      includeOptional: state.includeOptional
    }) : undefined,
    [validDates, state.startDate, state.endDate, data.holidays, state.country, state.region, state.includeOptional]
  );
  const displayedStart = calculation?.startDate || (isValidIsoDate(state.startDate) ? state.startDate : today);
  const displayedEnd = calculation?.endDate || (isValidIsoDate(state.endDate) ? state.endDate : today);

  return {
    data,
    state,
    regions: Array.from(new Set(data.holidays.filter((holiday) => holidayMatchesCountry(holiday, state.country) && holiday.region).map((holiday) => holiday.region as string))),
    validDates,
    calculation,
    rangeDescription: `${dateLabel(displayedStart, { month: 'short' })} to ${dateLabel(displayedEnd, { month: 'short' })}`,
    locationDescription: [state.country, state.region].filter(Boolean).join(', '),
    onStartDateChange: (value) => dispatch({ type: 'startDateChanged', value }),
    onEndDateChange: (value) => dispatch({ type: 'endDateChanged', value }),
    onCountryChange: (value) => dispatch({ type: 'countryChanged', value }),
    onRegionChange: (value) => dispatch({ type: 'regionChanged', value }),
    onIncludeOptionalChange: (value) => dispatch({ type: 'includeOptionalChanged', value })
  };
}