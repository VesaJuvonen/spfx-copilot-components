import * as React from 'react';

import { dateLabel, holidayForDate, isoToday, isValidIsoDate, scopedHolidays } from '../../shared/domain/holidayFormat/holidayFormat';
import type { IHolidaySurfaceProps } from '../../shared/components/holidayPlannerComponentBase/HolidayPlannerComponentBase';
import type { IHoliday } from '../../shared/domain/holidayTypes';
import type { IHolidayDetailsProperties } from '../HolidayDetailsCopilotComponentProperties';
import type { IHolidayDetailsState, IHolidayDetailsViewModel } from './HolidayDetailsApp.types';
import { findNamedHoliday, getHolidayRegions, getSurroundingDates } from './HolidayDetailsApp.utils';

type HolidayDetailsStateAction =
  | { type: 'propertiesChanged'; properties: IHolidayDetailsProperties }
  | { type: 'dateChanged'; value: string }
  | { type: 'holidayNameChanged'; value: string }
  | { type: 'countryChanged'; value: string }
  | { type: 'regionChanged'; value: string };

function holidayDetailsStateReducer(
  state: IHolidayDetailsState,
  action: HolidayDetailsStateAction
): IHolidayDetailsState {
  switch (action.type) {
    case 'propertiesChanged':
      return {
        date: action.properties.date || state.date,
        holidayName: action.properties.holidayName || state.holidayName,
        country: action.properties.country || state.country,
        region: action.properties.region || state.region
      };
    case 'dateChanged':
      return { ...state, date: action.value, holidayName: '' };
    case 'holidayNameChanged':
      return { ...state, holidayName: action.value };
    case 'countryChanged':
      return { ...state, country: action.value, region: '' };
    case 'regionChanged':
      return { ...state, region: action.value };
  }
}

export function useHolidayDetailsState(
  props: IHolidaySurfaceProps<IHolidayDetailsProperties>
): IHolidayDetailsViewModel {
  const data = props.dataService.getData();
  const [state, dispatch] = React.useReducer(holidayDetailsStateReducer, {
    date: props.properties.date || isoToday(),
    holidayName: props.properties.holidayName || '',
    country: props.properties.country || data.defaultCountry || 'Global',
    region: props.properties.region || ''
  });

  React.useEffect(() => {
    dispatch({ type: 'propertiesChanged', properties: props.properties });
  }, [props.properties.date, props.properties.holidayName, props.properties.country, props.properties.region]);

  const namedMatch = findNamedHoliday(data.holidays, state.holidayName, state.country, state.region);
  const targetDate = props.properties.date || namedMatch?.date || state.date;
  const holiday: IHoliday | undefined = namedMatch || holidayForDate(data.holidays, targetDate, state.country, state.region || undefined);
  const validDate = isValidIsoDate(targetDate);
  const detailDateLabel = holiday ? dateLabel(holiday.date, { month: 'short' }) : validDate ? dateLabel(targetDate, { month: 'short' }) : 'Date unavailable';
  const compactSubtitle = [detailDateLabel, state.country, state.region].filter(Boolean).join(' · ');
  const weekday = validDate ? new Date(`${targetDate}T00:00:00.000Z`).getUTCDay() : -1;

  return {
    data,
    state,
    regions: getHolidayRegions(data.holidays, state.country),
    targetDate,
    holiday,
    validDate,
    compactSubtitle,
    weekday,
    calendarAvailable: scopedHolidays(data.holidays, `${state.country}|${state.region}`).length > 0,
    surrounding: validDate ? getSurroundingDates(targetDate, data.holidays, state.country, state.region) : [],
    onDateChange: (value) => dispatch({ type: 'dateChanged', value }),
    onHolidayNameChange: (value) => dispatch({ type: 'holidayNameChanged', value }),
    onCountryChange: (value) => dispatch({ type: 'countryChanged', value }),
    onRegionChange: (value) => dispatch({ type: 'regionChanged', value })
  };
}