import * as React from 'react';

import { calculateWorkingDays } from '../../shared/domain/workingDayMath/workingDayMath';
import { addDays, addMonths, holidayMatchesCountry, isoToday } from '../../shared/domain/holidayFormat/holidayFormat';
import type { IHolidaySurfaceProps } from '../../shared/components/holidayPlannerComponentBase/HolidayPlannerComponentBase';
import type { IHoliday } from '../../shared/domain/holidayTypes';
import type { IUpcomingHolidaysProperties } from '../UpcomingHolidaysCopilotComponentProperties';
import type { IUpcomingHolidaysState, IUpcomingHolidaysViewModel } from './UpcomingHolidaysApp.types';
import { createCalendarCells, createUpcomingHolidaysState, holidayMatches } from './UpcomingHolidaysApp.utils';

type StateAction =
  | { type: 'viewChanged'; value: IUpcomingHolidaysState['view'] }
  | { type: 'yearChanged'; value: number }
  | { type: 'propertiesChanged'; properties: IUpcomingHolidaysProperties }
  | { type: 'rangeStartChanged'; value: string }
  | { type: 'rangeEndChanged'; value: string }
  | { type: 'countryChanged'; value: string }
  | { type: 'regionChanged'; value: string }
  | { type: 'typeChanged'; value: string }
  | { type: 'holidaySelected'; value?: IHoliday }
  | { type: 'monthMoved'; amount: number };

function reducer(state: IUpcomingHolidaysState, action: StateAction): IUpcomingHolidaysState {
  switch (action.type) {
    case 'propertiesChanged': return createUpcomingHolidaysState(action.properties);
    case 'viewChanged': return {
      ...state, view: action.value, selectedHoliday: undefined,
      ...(action.value === 'year' ? { rangeStart: `${state.year}-01-01`, rangeEnd: `${state.year}-12-31`, month: 0 }
        : action.value === 'upcoming' ? { rangeStart: isoToday(), rangeEnd: '', year: new Date().getFullYear(), month: new Date().getMonth() } : {})
    };
    case 'yearChanged': return Number.isInteger(action.value) && action.value >= 1000 && action.value <= 9999
      ? { ...state, view: 'year', year: action.value, month: 0, rangeStart: `${action.value}-01-01`, rangeEnd: `${action.value}-12-31`, selectedHoliday: undefined } : state;
    case 'rangeStartChanged': return { ...state, view: 'range', rangeStart: action.value, selectedHoliday: undefined };
    case 'rangeEndChanged': return { ...state, view: 'range', rangeEnd: action.value, selectedHoliday: undefined };
    case 'countryChanged': return { ...state, country: action.value, region: '', selectedHoliday: undefined };
    case 'regionChanged': return { ...state, region: action.value, selectedHoliday: undefined };
    case 'typeChanged': return { ...state, type: action.value, selectedHoliday: undefined };
    case 'holidaySelected': return { ...state, selectedHoliday: action.value };
    case 'monthMoved': {
      const next = addMonths(state.year, state.month, action.amount);
      return { ...state, year: next.year, month: next.month, selectedHoliday: undefined,
        ...(state.view === 'year' ? { rangeStart: `${next.year}-01-01`, rangeEnd: `${next.year}-12-31` } : {}) };
    }
  }
}

export function useUpcomingHolidaysState(
  props: IHolidaySurfaceProps<IUpcomingHolidaysProperties>
): IUpcomingHolidaysViewModel {
  const data = props.dataService.getData();
  const today = isoToday();
  const [state, dispatch] = React.useReducer(reducer, {
    ...props.properties, country: props.properties.country || data.defaultCountry || 'Global'
  }, createUpcomingHolidaysState);

  React.useEffect(() => {
    dispatch({ type: 'propertiesChanged', properties: { ...props.properties, country: props.properties.country || data.defaultCountry || 'Global' } });
  }, [props.properties.view, props.properties.startDate, props.properties.endDate, props.properties.country, props.properties.region, props.properties.holidayType, props.properties.month, props.properties.year, data.defaultCountry]);

  const visible = data.holidays.filter((holiday) => holidayMatches(holiday, state.country, state.region, state.type));
  const upcoming = visible.filter((holiday) => holiday.date >= state.rangeStart && (!state.rangeEnd || holiday.date <= state.rangeEnd)).sort((left, right) => left.date.localeCompare(right.date));
  const next = upcoming.find((holiday) => holiday.date >= today);
  const monthPrefix = `${state.year}-${state.month + 1 < 10 ? '0' : ''}${state.month + 1}-`;
  const monthHolidays = visible.filter((holiday) => holiday.date.startsWith(monthPrefix) && holiday.date >= state.rangeStart && (!state.rangeEnd || holiday.date <= state.rangeEnd));

  return {
    data,
    state,
    today,
    regions: Array.from(new Set(data.holidays.filter((holiday) => holidayMatchesCountry(holiday, state.country) && holiday.region).map((holiday) => holiday.region as string))),
    upcoming,
    next,
    workingDaysUntil: next && next.date > today ? calculateWorkingDays(today, addDays(next.date, -1), data.holidays, { country: state.country, region: state.region || undefined }).workingDays : 0,
    monthHolidays,
    cells: createCalendarCells(state.year, state.month),
    onViewChange: (value) => dispatch({ type: 'viewChanged', value }),
    onYearChange: (value) => dispatch({ type: 'yearChanged', value }),
    onRangeStartChange: (value) => dispatch({ type: 'rangeStartChanged', value }),
    onRangeEndChange: (value) => dispatch({ type: 'rangeEndChanged', value }),
    onCountryChange: (value) => dispatch({ type: 'countryChanged', value }),
    onRegionChange: (value) => dispatch({ type: 'regionChanged', value }),
    onTypeChange: (value) => dispatch({ type: 'typeChanged', value }),
    onSelectHoliday: (value) => dispatch({ type: 'holidaySelected', value }),
    onMoveMonth: (amount) => dispatch({ type: 'monthMoved', amount })
  };
}