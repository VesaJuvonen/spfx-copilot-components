import * as React from 'react';
import {
  Title2,
  Subtitle1,
  Body1,
  Caption1,
  Input,
  Select,
  Divider
} from '@fluentui/react-components';
import { CompactPlannerHeader } from '../../shared/components/compactPlannerHeader/CompactPlannerHeader';
import { holidayCountryOptions, dateLabel } from '../../shared/domain/holidayFormat/holidayFormat';
import { HolidaySourceNotice } from '../../shared/components/holidaySourceNotice/HolidaySourceNotice';
import { HolidayCoverageNotice } from '../../shared/components/holidayCoverageNotice/HolidayCoverageNotice';
import type { IHolidaySurfaceProps } from '../../shared/components/holidayPlannerComponentBase/HolidayPlannerComponentBase';
import type { ILongWeekendFinderProperties } from '../LongWeekendFinderCopilotComponentProperties';
import { useLongWeekendFinderAppStyles } from './LongWeekendFinderApp.styles';
import { useLongWeekendFinderState } from './useLongWeekendFinderState';

export function LongWeekendFinderApp(props: IHolidaySurfaceProps<ILongWeekendFinderProperties>): React.ReactElement {
  const styles = useLongWeekendFinderAppStyles();
  const { data, state, regions, validDates, ordered, next, workingDaysUntil, compactSubtitle, onStartDateChange, onEndDateChange, onCountryChange, onRegionChange, onSortChange } = useLongWeekendFinderState(props);
  const fullscreen = props.hostContext.displayMode === 'fullscreen';
  const optionalNote = (holidays: { isOptional: boolean }[]): string => holidays.some((holiday) => holiday.isOptional) ? ' Includes an optional holiday; confirm it applies to you.' : '';

  return (
    <main className={styles.root}>
      {fullscreen ? <header className={styles.header}>
        <Caption1 className={styles.eyebrow}>HOLIDAY PLANNER / LONG WEEKENDS</Caption1>
        <Title2>Long weekend finder</Title2>
      </header> : <CompactPlannerHeader
        eyebrow="HOLIDAY PLANNER / LONG WEEKENDS"
        title="Next long weekend"
        subtitle={compactSubtitle}
        onExpand={props.onExpand}
      />}
      <HolidayCoverageNotice holidays={data.holidays} country={state.country} region={state.region || undefined} defaultCountry={data.defaultCountry} onSwitchCountry={onCountryChange} />
      {next ? <section className={styles.hero}>
        {workingDaysUntil > 0 && <Caption1 className={styles.muted}>{workingDaysUntil} working {workingDaysUntil === 1 ? 'day' : 'days'} until this break</Caption1>}
        <Subtitle1>{dateLabel(next.startDate, { month: 'short' })} – {dateLabel(next.endDate, { month: 'short' })}</Subtitle1>
        <div className={styles.dates}>{next.totalDays} days off</div>
        <Body1>{next.holidays.length ? next.holidays.map((holiday) => holiday.title).join(', ') : 'Weekend break'}{optionalNote(next.holidays)}</Body1>
        {next.bridgeDays.length ? <Body1>Bridge day suggestion: {next.bridgeDays.map((day) => dateLabel(day)).join(', ')}. Suggestions only; no leave has been booked.</Body1> : <Caption1 className={styles.muted}>No bridge day needed.</Caption1>}
      </section> : <Body1 role={validDates ? undefined : 'alert'}>{validDates ? 'No long-weekend windows match this range.' : 'Enter valid start and end dates.'}</Body1>}

      {fullscreen && <>
        <section className={styles.form} aria-label="Search options">
          <label className={styles.field}>From<Input className={styles.control} type="date" value={state.startDate} onChange={(_, value) => onStartDateChange(value.value)} /></label>
          <label className={styles.field}>Through<Input className={styles.control} type="date" value={state.endDate} onChange={(_, value) => onEndDateChange(value.value)} /></label>
          <label className={styles.field}>Country<Select className={styles.control} value={state.country} onChange={(_, value) => onCountryChange(value.value)}>
            {holidayCountryOptions(data.holidays, state.country).map((item) => <option key={item} value={item}>{item}</option>)}
          </Select></label>
          <label className={styles.field}>Region<Select className={styles.control} value={state.region} onChange={(_, value) => onRegionChange(value.value)}><option value="">All regions</option>{regions.map((item) => <option key={item} value={item}>{item}</option>)}</Select></label>
          <label className={styles.field}>Sort<Select className={styles.control} value={state.sortBy} onChange={(_, value) => onSortChange(value.value as 'nearby' | 'days')}><option value="nearby">By proximity</option><option value="days">Most days off</option></Select></label>
        </section>
        <Divider />
        <section className={styles.list} aria-label="Long weekend options">
          {ordered.map((weekend) => <article className={styles.row} key={`${weekend.startDate}-${weekend.endDate}`}>
            <Subtitle1>{dateLabel(weekend.startDate, { month: 'short' })} – {dateLabel(weekend.endDate, { month: 'short' })} · {weekend.totalDays} days</Subtitle1>
            <Body1>{weekend.holidays.length ? `Holiday: ${weekend.holidays.map((holiday) => holiday.title).join(', ')}` : 'Weekend plus a suggested bridge day'}{optionalNote(weekend.holidays)}</Body1>
            <Caption1 className={styles.muted}>{weekend.bridgeDays.length ? `Bridge suggestion: ${weekend.bridgeDays.map((day) => dateLabel(day)).join(', ')}. Not a booking.` : 'No bridge day needed.'}</Caption1>
          </article>)}
        </section>
      </>}
      <HolidaySourceNotice data={data} />
    </main>
  );
}