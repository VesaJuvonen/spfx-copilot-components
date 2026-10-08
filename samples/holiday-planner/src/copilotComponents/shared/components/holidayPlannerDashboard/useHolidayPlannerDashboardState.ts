import * as React from 'react';
import { CalendarLtrRegular, ClockRegular, WeatherSunnyRegular } from '@fluentui/react-icons';

import { addDays, addMonths, dateLabel, holidayCountryOptions, holidayTypeLabel, isoToday, isValidIsoDate, monthLabel } from '../../domain/holidayFormat/holidayFormat';
import { calculateWorkingDays } from '../../domain/workingDayMath/workingDayMath';
import { findLongWeekends } from '../../domain/longWeekendMath/longWeekendMath';
import type { DashboardCalendarView, DashboardSection, IHolidayPlannerDashboardProps, IHolidayPlannerDashboardState, IHolidayPlannerDashboardViewModel, IHolidayPlannerDashboardStat } from './HolidayPlannerDashboard.types';
import { SECTION_IDS, createDashboardCalendar, dashboardCalendarRange, createVacationPlans, formatIsoDate, matchesScope, nextPeriodEnd, rangeLabel, recommendLongWeekend, recommendVacationPlan } from './HolidayPlannerDashboard.utils';

export type DashboardStateAction =
  | { type: 'queryChanged'; value: IHolidayPlannerDashboardState }
  | { type: 'calendarViewChanged'; value: DashboardCalendarView }
  | { type: 'rangeStartChanged' | 'rangeEndChanged' | 'holidayTypeChanged'; value: string }
  | { type: 'countryChanged'; value: string }
  | { type: 'regionChanged'; value: string }
  | { type: 'yearChanged'; value: number }
  | { type: 'monthMoved'; amount: number }
  | { type: 'holidaySelected'; id: number };

export function dashboardReducer(state: IHolidayPlannerDashboardState, action: DashboardStateAction): IHolidayPlannerDashboardState {
  switch (action.type) {
    case 'queryChanged': return action.value;
    case 'calendarViewChanged': {
      const range = dashboardCalendarRange(state);
      return { ...state, calendarView: action.value, rangeStart: range.start, rangeEnd: range.end, selectedHolidayId: undefined };
    }
    case 'rangeStartChanged': return { ...state, rangeStart: action.value, selectedHolidayId: undefined };
    case 'rangeEndChanged': return { ...state, rangeEnd: action.value, selectedHolidayId: undefined };
    case 'holidayTypeChanged': return { ...state, holidayType: action.value, selectedHolidayId: undefined };
    case 'countryChanged': return { ...state, country: action.value, region: '', selectedHolidayId: undefined };
    case 'regionChanged': return { ...state, region: action.value, selectedHolidayId: undefined };
    case 'yearChanged': return state.year === action.value ? state : { ...state, year: action.value, selectedHolidayId: undefined };
    case 'monthMoved': {
      const nextMonth = addMonths(state.year, state.month, action.amount);
      return { ...state, year: nextMonth.year, month: nextMonth.month, selectedHolidayId: undefined };
    }
    case 'holidaySelected': return { ...state, selectedHolidayId: action.id };
  }
}

export function useHolidayPlannerDashboardState(
  props: Readonly<IHolidayPlannerDashboardProps>
): IHolidayPlannerDashboardViewModel {
  const data = props.dataService.getData();
  const [savedCountry, setSavedCountry] = React.useState(data.savedCountry);
  const [savingCountry, setSavingCountry] = React.useState(false);
  const [countrySaveMessage, setCountrySaveMessage] = React.useState('');
  const [countrySaveFailed, setCountrySaveFailed] = React.useState(false);
  const dashboardElementRef = React.useRef<HTMLElement | null>(null);
  const dashboardRef: React.RefCallback<HTMLElement> = (element) => { dashboardElementRef.current = element; };
  const today = isoToday();
  const initialCalendar = createDashboardCalendar(props, today);
  const initialYear = initialCalendar.year;
  const [state, dispatch] = React.useReducer(dashboardReducer, {
    ...initialCalendar,
    country: props.country || data.defaultCountry || 'Global',
    region: props.region || '',
    holidayType: props.holidayType || '',
    selectedHolidayId: undefined
  });
  React.useEffect(() => {
    dispatch({ type: 'queryChanged', value: {
      ...createDashboardCalendar(props, isoToday()), country: props.country || props.dataService.getData().defaultCountry || 'Global',
      region: props.region || '', holidayType: props.holidayType || ''
    } });
  }, [props.view, props.year, props.month, props.date, props.startDate, props.endDate, props.country, props.region, props.holidayType, props.dataService]);
  const countryOptions = holidayCountryOptions(data.holidays, state.country);
  const regionOptions = Array.from(new Set(data.holidays.filter((holiday) => matchesScope(holiday, state.country, '') && holiday.region).map((holiday) => holiday.region as string).concat(state.region).filter(Boolean)));
  const visibleHolidays = data.holidays.filter((holiday) => matchesScope(holiday, state.country, state.region)).sort((left, right) => left.date.localeCompare(right.date));
  const periodStart = formatIsoDate(state.year, state.month, 1);
  const periodEnd = nextPeriodEnd(state.year, state.month);
  const calendarRange = dashboardCalendarRange(state);
  const calendarValid = (!calendarRange.start || isValidIsoDate(calendarRange.start)) && (!calendarRange.end || isValidIsoDate(calendarRange.end)) &&
    (!calendarRange.start || !calendarRange.end || calendarRange.start <= calendarRange.end);
  const upcomingHolidays = calendarValid ? visibleHolidays.filter((holiday) =>
    (!calendarRange.start || holiday.date >= calendarRange.start) && (!calendarRange.end || holiday.date <= calendarRange.end) &&
    (!state.holidayType || holidayTypeLabel(holiday.isOptional) === state.holidayType)) : [];
  const nextHoliday = visibleHolidays.find((holiday) => holiday.date >= today);
  const selectedHoliday = upcomingHolidays.find((holiday) => holiday.id === state.selectedHolidayId) ||
    upcomingHolidays.find((holiday) => holiday.date === props.date) ||
    upcomingHolidays.find((holiday) => props.holidayName && holiday.title.toLowerCase().includes(props.holidayName.toLowerCase())) ||
    upcomingHolidays[0];
  const monthStart = formatIsoDate(state.year, state.month, 1);
  const monthEnd = new Date(Date.UTC(state.year, state.month + 1, 0)).toISOString().slice(0, 10);
  const workingDays = calculateWorkingDays(monthStart, monthEnd, data.holidays, {
    country: state.country,
    region: state.region || undefined,
    includeOptional: true
  }).workingDays;
  const longWeekendStart = periodStart < today ? today : periodStart;
  const longWeekendCandidates = periodEnd >= today
    ? findLongWeekends(longWeekendStart, periodEnd, data.holidays, state.country, state.region || undefined)
    : [];
  const longWeekends = longWeekendCandidates;
  const recommendedLongWeekend = recommendLongWeekend(longWeekendCandidates);
  const selectedHolidayIsPast = !!selectedHoliday && selectedHoliday.date < today;
  const selectedHolidayOnWeekend = !!selectedHoliday && [0, 6].some((day) => day === new Date(`${selectedHoliday.date}T00:00:00.000Z`).getUTCDay());
  // Search a week around the selected date so holidays outside the planning period still get a break suggestion.
  const selectedHolidayBreak = selectedHoliday && !selectedHolidayIsPast
    ? findLongWeekends(addDays(selectedHoliday.date, -4) < today ? today : addDays(selectedHoliday.date, -4), addDays(selectedHoliday.date, 4), data.holidays, state.country, state.region || undefined)
      .filter((weekend) => weekend.holidays.some((holiday) => holiday.id === selectedHoliday.id))
      .sort((left, right) => left.bridgeDays.length - right.bridgeDays.length || right.totalDays - left.totalDays)[0]
    : undefined;
  const nextLongWeekend = longWeekends[0];
  const longWeekendWorkingDaysUntil = nextLongWeekend && nextLongWeekend.startDate > today
    ? calculateWorkingDays(today, addDays(nextLongWeekend.startDate, -1), data.holidays, { country: state.country, region: state.region || undefined }).workingDays
    : 0;
  const longWeekendCountdown = longWeekendWorkingDaysUntil > 0
    ? ` · in ${longWeekendWorkingDaysUntil} working ${longWeekendWorkingDaysUntil === 1 ? 'day' : 'days'}` : '';
  const vacationPlans = periodEnd >= today ? createVacationPlans(longWeekendStart, periodEnd, visibleHolidays) : [];
  const recommendedVacationPlan = recommendVacationPlan(vacationPlans);
  const yearOptions = Array.from(new Set([initialYear - 1, initialYear, initialYear + 1, initialYear + 2, state.year])).sort((left, right) => left - right);

  React.useEffect(() => {
    if (!props.initialSection) return;
    const frame = window.requestAnimationFrame(() => {
      dashboardElementRef.current?.querySelector<HTMLElement>(`#${SECTION_IDS[props.initialSection as DashboardSection]}`)
        ?.scrollIntoView({ block: 'start' });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [props.initialSection]);

  const stats: IHolidayPlannerDashboardStat[] = [
    { icon: React.createElement(CalendarLtrRegular), label: 'Next holiday', value: nextHoliday?.title || 'No upcoming holidays', detail: nextHoliday ? dateLabel(nextHoliday.date, { weekday: 'short', month: 'short' }) : 'No matching dates' },
    { icon: React.createElement(WeatherSunnyRegular), label: 'Next long weekend', value: nextLongWeekend ? `${nextLongWeekend.totalDays} days` : 'None found', detail: nextLongWeekend ? rangeLabel(nextLongWeekend.startDate, nextLongWeekend.endDate) + longWeekendCountdown : 'Try another date range' },
    { icon: React.createElement(ClockRegular), label: 'Working days', value: `${workingDays} days`, detail: monthLabel(state.year, state.month) }
  ];

  const saveCountry = async (): Promise<void> => {
    if (savingCountry || !props.dataService.saveDefaultCountry) return;
    const country = state.country;
    setSavingCountry(true);
    setCountrySaveFailed(false);
    setCountrySaveMessage('Saving default country...');
    try {
      await props.dataService.saveDefaultCountry(country);
      setSavedCountry(country);
      setCountrySaveMessage(`${country} saved as your default country.`);
    } catch {
      setCountrySaveFailed(true);
      setCountrySaveMessage('Could not save your default country. Check OneDrive access and try again.');
    } finally {
      setSavingCountry(false);
    }
  };

  return {
    data,
    dashboardRef,
    state,
    countryOptions,
    regionOptions,
    visibleHolidays,
    upcomingHolidays,
    nextHoliday,
    selectedHoliday,
    selectedHolidayIsPast,
    selectedHolidayOnWeekend,
    selectedHolidayBreak,
    longWeekends,
    recommendedLongWeekend,
    longWeekendWorkingDaysUntil,
    vacationPlans,
    recommendedVacationPlan,
    workingDays,
    periodEnd,
    yearOptions,
    stats,
    calendarStart: calendarRange.start,
    calendarEnd: calendarRange.end,
    calendarValid,
    savedCountry,
    savingCountry,
    countrySaveMessage,
    countrySaveFailed,
    saveCountry,
    onCalendarViewChange: (value) => dispatch({ type: 'calendarViewChanged', value }),
    onRangeStartChange: (value) => dispatch({ type: 'rangeStartChanged', value }),
    onRangeEndChange: (value) => dispatch({ type: 'rangeEndChanged', value }),
    onHolidayTypeChange: (value) => dispatch({ type: 'holidayTypeChanged', value }),
    moveCalendar: (amount) => dispatch(state.calendarView === 'year' ? { type: 'yearChanged', value: state.year + amount } : { type: 'monthMoved', amount }),
    moveMonth: (amount) => dispatch({ type: 'monthMoved', amount }),
    onCountryChange: (value) => {
      setCountrySaveMessage('');
      setCountrySaveFailed(false);
      dispatch({ type: 'countryChanged', value });
    },
    onRegionChange: (value) => dispatch({ type: 'regionChanged', value }),
    onYearChange: (value) => dispatch({ type: 'yearChanged', value }),
    onHolidaySelect: (id) => dispatch({ type: 'holidaySelected', id })
  };
}