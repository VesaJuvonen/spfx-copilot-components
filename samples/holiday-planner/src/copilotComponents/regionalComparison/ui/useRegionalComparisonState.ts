import * as React from 'react';

import { holidayCountryOptions, addDays, holidayCountryValues, isoToday, scopedHolidays } from '../../shared/domain/holidayFormat/holidayFormat';
import type { IHolidaySurfaceProps } from '../../shared/components/holidayPlannerComponentBase/HolidayPlannerComponentBase';
import type { IRegionalComparisonProperties } from '../RegionalComparisonCopilotComponentProperties';
import type { IRegionalComparisonState, IRegionalComparisonViewModel } from './RegionalComparisonApp.types';
import { countDatesByScope, hasScope } from './RegionalComparisonApp.utils';

type StateAction =
  | { type: 'propertiesChanged'; properties: IRegionalComparisonProperties }
  | { type: 'startDateChanged'; value: string }
  | { type: 'endDateChanged'; value: string }
  | { type: 'scopeToAddChanged'; value: string }
  | { type: 'scopeAdded' }
  | { type: 'scopeRemoved'; value: string };

function reducer(state: IRegionalComparisonState, action: StateAction): IRegionalComparisonState {
  switch (action.type) {
    case 'propertiesChanged':
      return {
        ...state,
        startDate: action.properties.startDate || state.startDate,
        endDate: action.properties.endDate || state.endDate,
        selectedScopes: action.properties.regions?.length ? action.properties.regions.slice(0, 3) : state.selectedScopes
      };
    case 'startDateChanged': return { ...state, startDate: action.value };
    case 'endDateChanged': return { ...state, endDate: action.value };
    case 'scopeToAddChanged': return { ...state, scopeToAdd: action.value };
    case 'scopeAdded':
      return state.scopeToAdd && !hasScope(state.selectedScopes, state.scopeToAdd)
        ? { ...state, selectedScopes: [...state.selectedScopes, state.scopeToAdd] }
        : state;
    case 'scopeRemoved': return { ...state, selectedScopes: state.selectedScopes.filter((scope) => scope !== action.value) };
  }
}

export function useRegionalComparisonState(
  props: IHolidaySurfaceProps<IRegionalComparisonProperties>
): IRegionalComparisonViewModel {
  const data = props.dataService.getData();
  const today = isoToday();
  const regionalScopes = data.holidays.reduce<string[]>((scopes, holiday) => {
    if (!holiday.region) return scopes;
    const countries = holidayCountryValues(holiday).filter((country) => country !== 'Global');
    return scopes.concat(countries.map((country) => `${country}|${holiday.region}`));
  }, []);
  const countries = holidayCountryOptions(data.holidays, data.defaultCountry);
  const allScopes = Array.from(new Set(countries.concat(regionalScopes, props.properties.regions || [])));
  const defaultCountry = data.defaultCountry || 'Global';
  const initialRegions = props.properties.regions?.length ? props.properties.regions.slice(0, 3)
    : [defaultCountry].concat(countries.filter((country) => country !== defaultCountry && country !== 'Global').slice(0, 1));
  const [state, dispatch] = React.useReducer(reducer, {
    startDate: props.properties.startDate || today,
    endDate: props.properties.endDate || addDays(today, 120),
    selectedScopes: initialRegions,
    scopeToAdd: allScopes.find((scope) => !hasScope(initialRegions, scope)) || allScopes[0]
  });

  React.useEffect(() => {
    dispatch({ type: 'propertiesChanged', properties: props.properties });
  }, [props.properties.startDate, props.properties.endDate, props.properties.regions]);

  const allByScope = state.selectedScopes.map((scope) => ({
    scope,
    holidays: scopedHolidays(data.holidays, scope)
      .filter((holiday) => holiday.date >= state.startDate && holiday.date <= state.endDate)
      .sort((left, right) => left.date.localeCompare(right.date))
  }));
  const dateCounts = countDatesByScope(allByScope);

  return {
    data,
    today,
    state,
    allScopes,
    allByScope,
    sharedCount: Array.from(dateCounts.values()).filter((count) => count > 1).length,
    uniqueCount: Array.from(dateCounts.values()).filter((count) => count === 1).length,
    comparisonDates: Array.from(dateCounts.keys()).sort((left, right) => left.localeCompare(right)).slice(0, props.hostContext.displayMode === 'fullscreen' ? 90 : 6),
    onStartDateChange: (value) => dispatch({ type: 'startDateChanged', value }),
    onEndDateChange: (value) => dispatch({ type: 'endDateChanged', value }),
    onScopeToAddChange: (value) => dispatch({ type: 'scopeToAddChanged', value }),
    onAddScope: () => dispatch({ type: 'scopeAdded' }),
    onRemoveScope: (scope) => dispatch({ type: 'scopeRemoved', value: scope })
  };
}