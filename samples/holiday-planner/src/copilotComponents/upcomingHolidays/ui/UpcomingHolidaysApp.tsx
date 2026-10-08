import * as React from 'react';
import {
  Title2,
  Title3,
  Body1,
  Caption1,
  Badge,
  Button,
  Input,
  Select,
  Divider
} from '@fluentui/react-components';
import { ChevronDownRegular, ChevronLeftRegular, ChevronRightRegular } from '@fluentui/react-icons';

import { CompactPlannerHeader } from '../../shared/components/compactPlannerHeader/CompactPlannerHeader';
import { dateLabel, holidayCountryLabel, holidayCountryOptions, holidayTypeLabel, monthLabel } from '../../shared/domain/holidayFormat/holidayFormat';
import type { IHoliday } from '../../shared/domain/holidayTypes';
import { HolidaySourceNotice } from '../../shared/components/holidaySourceNotice/HolidaySourceNotice';
import { HolidayCoverageNotice } from '../../shared/components/holidayCoverageNotice/HolidayCoverageNotice';
import type { IHolidaySurfaceProps } from '../../shared/components/holidayPlannerComponentBase/HolidayPlannerComponentBase';
import type { IUpcomingHolidaysProperties } from '../UpcomingHolidaysCopilotComponentProperties';
import { useUpcomingHolidaysAppStyles } from './UpcomingHolidaysApp.styles';
import { calendarDayLabel } from './UpcomingHolidaysApp.utils';
import { useUpcomingHolidaysState } from './useUpcomingHolidaysState';
import { datePart, holidayAccentColor } from '../../shared/components/holidayPlannerDashboard/HolidayPlannerDashboard.utils';

export function UpcomingHolidaysApp(props: IHolidaySurfaceProps<IUpcomingHolidaysProperties>): React.ReactElement {
  const styles = useUpcomingHolidaysAppStyles();
  const { data, state, today, regions, upcoming, next, workingDaysUntil, monthHolidays, cells, onViewChange, onYearChange, onRangeStartChange, onRangeEndChange, onCountryChange, onRegionChange, onTypeChange, onSelectHoliday, onMoveMonth } = useUpcomingHolidaysState(props);
  const fullscreen = props.hostContext.displayMode === 'fullscreen';
  const title = state.view === 'year' ? `Holidays in ${state.year}` : state.view === 'range' ? 'Holidays in your date range' : 'Upcoming holidays';
  const renderHolidayRow = (holiday: IHoliday): React.ReactElement => {
    const selected = state.selectedHoliday?.id === holiday.id;
    return <Button
      key={holiday.id}
      appearance="subtle"
      className={styles.holidayButton}
      aria-pressed={selected}
      aria-expanded={selected}
      onClick={() => onSelectHoliday(selected ? undefined : holiday)}
    >
      <span className={styles.dateBlock}>
        <Caption1 className={styles.dateMonth}>{datePart(holiday.date, 'month')}</Caption1>
        <span className={styles.dateNumber}>{datePart(holiday.date, 'day')}</span>
      </span>
      <span className={styles.holidayMarker} style={{ backgroundColor: holidayAccentColor(holiday) }} />
      <span className={styles.holidayInfo}>
        <span className={styles.holidayMeta}>
          <strong className={styles.holidayTitle}>{holiday.title}</strong>
          <Badge appearance="outline">{holidayTypeLabel(holiday.isOptional)} holiday</Badge>
        </span>
        <Caption1>{dateLabel(holiday.date, { weekday: 'long' })} · {holidayCountryLabel(holiday)}</Caption1>
      </span>
      {selected ? <ChevronDownRegular fontSize={18} aria-hidden="true" /> : <ChevronRightRegular fontSize={18} aria-hidden="true" />}
    </Button>;
  };
  const selectedDetail = state.selectedHoliday && !fullscreen && <section className={styles.compactDetail} aria-live="polite">
    <Title3>{state.selectedHoliday.title}</Title3>
    <Body1>{dateLabel(state.selectedHoliday.date)} · {holidayTypeLabel(state.selectedHoliday.isOptional)} holiday</Body1>
    <Caption1>Applies to {state.selectedHoliday.region || holidayCountryLabel(state.selectedHoliday)}</Caption1>
    <Body1>{state.selectedHoliday.description || 'No additional description is available.'}</Body1>
  </section>;
  return (
    <main className={styles.root}>
      {fullscreen ? <header className={styles.header}>
        <Caption1 className={styles.eyebrow}>HOLIDAY PLANNER / CALENDAR</Caption1>
        <Title2>{title}</Title2>
      </header> : <CompactPlannerHeader
        eyebrow="HOLIDAY PLANNER / CALENDAR"
        title={title}
        subtitle={[state.country, state.region].filter(Boolean).join(' · ')}
        onExpand={props.onExpand}
      />}
      <HolidayCoverageNotice holidays={data.holidays} country={state.country} region={state.region || undefined} defaultCountry={data.defaultCountry} onSwitchCountry={onCountryChange} />
      <section className={styles.controls} aria-label="Calendar scope">
        <label className={styles.field}>View<Select className={styles.control} value={state.view} onChange={(_, value) => onViewChange(value.value as typeof state.view)}>
          <option value="upcoming">Upcoming</option><option value="year">Full year</option><option value="range">Date range</option>
        </Select></label>
        {state.view === 'year' && <label className={styles.field}>Year<Input className={styles.control} type="number" min={1000} max={9999} value={String(state.year)} onChange={(_, value) => onYearChange(Number(value.value))} /></label>}
        <label className={styles.field}>Country<Select className={styles.control} value={state.country} onChange={(_, value) => onCountryChange(value.value)}>
          {holidayCountryOptions(data.holidays, state.country).map((item) => <option key={item} value={item}>{item}</option>)}
        </Select></label>
        <label className={styles.field}>Region<Select className={styles.control} value={state.region} onChange={(_, value) => onRegionChange(value.value)}><option value="">All regions</option>{Array.from(new Set(regions.concat(state.region).filter(Boolean))).map((item) => <option key={item} value={item}>{item}</option>)}</Select></label>
      </section>
      {state.view === 'range' && <section className={styles.controls} aria-label="Date range">
        <label className={styles.field}>From<Input className={styles.control} type="date" value={state.rangeStart} onChange={(_, value) => onRangeStartChange(value.value)} /></label>
        <label className={styles.field}>Through<Input className={styles.control} type="date" value={state.rangeEnd} onChange={(_, value) => onRangeEndChange(value.value)} /></label>
      </section>}
      {state.rangeEnd && state.rangeStart > state.rangeEnd && <Body1 role="alert">The end date must be on or after the start date.</Body1>}
      {!fullscreen && state.view === 'upcoming' && <>
        {next && <div className={styles.nextCount}><Caption1>{workingDaysUntil} working days until the next holiday</Caption1></div>}
        <section className={styles.list} aria-label="Upcoming holidays">
          {upcoming.slice(0, 3).map(renderHolidayRow)}
          {!next && upcoming.length === 0 && <Body1>No upcoming holidays match these filters.</Body1>}
        </section>
        {selectedDetail}
      </>}

      {(fullscreen || state.view !== 'upcoming') && <section className={styles.list} aria-label={title}>
        <Caption1>{upcoming.length} holidays · {state.rangeStart || 'Any date'}{state.rangeEnd ? ` to ${state.rangeEnd}` : ' onwards'}</Caption1>
        {upcoming.map(renderHolidayRow)}
        {upcoming.length === 0 && <Body1>No holidays match this period and location in the available data.</Body1>}
      </section>}
      {state.view !== 'upcoming' && selectedDetail}

      {fullscreen && <>
        <section className={styles.controls} aria-label="Holiday filters">
          <label className={styles.field}>Holiday type<Select className={styles.control} value={state.type} onChange={(_, value) => onTypeChange(value.value)}><option value="">All types</option><option value="Fixed">Fixed</option><option value="Optional">Optional</option></Select></label>
        </section>
        <Divider />
        <div className={styles.monthHeader}>
          <Button appearance="subtle" icon={<ChevronLeftRegular />} aria-label="Previous month" onClick={() => onMoveMonth(-1)} />
          <Title3>{monthLabel(state.year, state.month)}</Title3>
          <Button appearance="subtle" icon={<ChevronRightRegular />} aria-label="Next month" onClick={() => onMoveMonth(1)} />
        </div>
        <div className={styles.calendar} role="grid" aria-label={`${monthLabel(state.year, state.month)} holidays`}>
          <div className={styles.weekdayRow} role="row">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => <Caption1 className={styles.weekday} role="columnheader" key={day}>{day}</Caption1>)}
          </div>
          {Array.from({ length: cells.length / 7 }, (_, weekIndex) => (
            <div className={styles.weekRow} role="row" key={`week-${weekIndex}`}>
              {cells.slice(weekIndex * 7, weekIndex * 7 + 7).map((day, dayIndex) => {
                if (!day) return <div className={styles.outsideDay} role="gridcell" aria-hidden="true" key={`blank-${weekIndex}-${dayIndex}`} />;
                const isoDate = `${state.year}-${state.month + 1 < 10 ? '0' : ''}${state.month + 1}-${day < 10 ? '0' : ''}${day}`;
                const holiday = monthHolidays.find((item) => item.date === isoDate);
                const weekday = new Date(`${isoDate}T00:00:00.000Z`).getUTCDay();
                const weekend = weekday === 0 || weekday === 6;
                const inRange = isoDate >= state.rangeStart && (!state.rangeEnd || isoDate <= state.rangeEnd);
                const isToday = isoDate === today;
                const isSelected = state.selectedHoliday?.date === isoDate;
                const className = [styles.day, weekend ? styles.weekend : '', holiday ? styles.holidayDay : '', isToday ? styles.todayDay : '', isSelected ? styles.selectedDay : '', inRange ? '' : styles.inactiveDay].filter(Boolean).join(' ');
                return <div role="gridcell" aria-selected={isSelected} key={isoDate}>
                  <button type="button" className={className} disabled={!inRange} aria-pressed={isSelected} aria-label={calendarDayLabel(isoDate, holiday, weekend, isToday)} title={holiday?.title} onClick={() => onSelectHoliday(holiday)}>
                    <span className={styles.dayNumber}>{day}</span>{holiday && <span className={styles.dayTitle}>{holiday.title}</span>}
                  </button>
                </div>;
              })}
            </div>
          ))}
        </div>
        <div className={styles.legend} aria-label="Calendar legend">
          <span className={styles.legendItem}><span className={styles.legendSwatch} aria-hidden="true" /><Caption1>Holiday</Caption1></span>
          <span className={styles.legendItem}><span className={`${styles.legendSwatch} ${styles.todaySwatch}`} aria-hidden="true" /><Caption1>Today</Caption1></span>
        </div>
        {state.selectedHoliday && <section className={styles.detail} aria-live="polite">
          <Title3>{state.selectedHoliday.title}</Title3><Body1>{dateLabel(state.selectedHoliday.date)} · {holidayTypeLabel(state.selectedHoliday.isOptional)}</Body1>
          <Caption1>{state.selectedHoliday.description || holidayCountryLabel(state.selectedHoliday)}{state.selectedHoliday.region ? ` · ${state.selectedHoliday.region}` : ''}</Caption1>
        </section>}
      </>}
      <HolidaySourceNotice data={data} />
    </main>
  );
}