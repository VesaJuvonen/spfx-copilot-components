import * as React from 'react';
import {
  Title2,
  Title3,
  Subtitle1,
  Body1,
  Caption1,
  Input,
  Select,
  Divider
} from '@fluentui/react-components';
import { CalendarCheckmarkRegular, CalendarCancelRegular } from '@fluentui/react-icons';

import { holidayCountryOptions, dateLabel, holidayCountryLabel, holidayTypeLabel } from '../../shared/domain/holidayFormat/holidayFormat';
import { CompactPlannerHeader } from '../../shared/components/compactPlannerHeader/CompactPlannerHeader';
import { HolidaySourceNotice } from '../../shared/components/holidaySourceNotice/HolidaySourceNotice';
import { HolidayCoverageNotice } from '../../shared/components/holidayCoverageNotice/HolidayCoverageNotice';
import type { IHolidaySurfaceProps } from '../../shared/components/holidayPlannerComponentBase/HolidayPlannerComponentBase';
import type { IHolidayDetailsProperties } from '../HolidayDetailsCopilotComponentProperties';
import { useHolidayDetailsAppStyles } from './HolidayDetailsApp.styles';
import { useHolidayDetailsState } from './useHolidayDetailsState';

export function HolidayDetailsApp(props: IHolidaySurfaceProps<IHolidayDetailsProperties>): React.ReactElement {
  const styles = useHolidayDetailsAppStyles();
  const {
    data,
    state,
    regions,
    targetDate,
    holiday,
    validDate,
    compactSubtitle,
    weekday,
    calendarAvailable,
    surrounding,
    onDateChange,
    onHolidayNameChange,
    onCountryChange,
    onRegionChange
  } = useHolidayDetailsState(props);
  const fullscreen = props.hostContext.displayMode === 'fullscreen';

  return (
    <main className={styles.root}>
      {fullscreen ? <header className={styles.header}>
        <Caption1 className={styles.eyebrow}>HOLIDAY PLANNER / DETAILS</Caption1>
        <Title2>Holiday details</Title2>
      </header> : <CompactPlannerHeader
        eyebrow="HOLIDAY PLANNER / DETAILS"
        title={holiday ? holiday.title : 'Date check'}
        subtitle={compactSubtitle}
        onExpand={props.onExpand}
      />}
      <HolidayCoverageNotice holidays={data.holidays} country={state.country} region={state.region || undefined} defaultCountry={data.defaultCountry} onSwitchCountry={onCountryChange} />
      {!validDate ? <Body1 role="alert">Choose a valid date to check its holiday status.</Body1> : holiday ? <section className={styles.answer}>
        <CalendarCancelRegular className={styles.answerIcon} aria-hidden="true" />
        <div className={styles.details}>
          <Subtitle1>{holidayTypeLabel(holiday.isOptional)} holiday</Subtitle1>
          <Body1>{holiday.title} · {dateLabel(holiday.date)}</Body1>
          <Caption1>{holidayCountryLabel(holiday)}{holiday.region ? ` · ${holiday.region}` : ''}</Caption1>
        </div>
      </section> : calendarAvailable ? <section className={styles.answer}>
        <CalendarCheckmarkRegular className={styles.answerIcon} aria-hidden="true" />
        <div className={styles.details}>
          <Subtitle1>{weekday === 0 || weekday === 6 ? 'Weekend' : 'No listed holiday'}</Subtitle1>
          <Body1>{dateLabel(targetDate)} is {weekday === 0 || weekday === 6 ? 'a weekend day' : 'not listed as a holiday and is a working day'}.</Body1>
        </div>
      </section> : <Body1 role="status">The working-day status of {dateLabel(targetDate)} cannot be confirmed without a holiday calendar.</Body1>}

      {fullscreen && <>
        <section className={styles.filters} aria-label="Holiday lookup">
          <label className={styles.field}>Date<Input className={styles.control} type="date" value={state.date} onChange={(_, value) => onDateChange(value.value)} /></label>
          <label className={styles.field}>Holiday name<Input className={styles.control} value={state.holidayName} onChange={(_, value) => onHolidayNameChange(value.value)} placeholder="For example, Diwali" /></label>
          <label className={styles.field}>Country<Select className={styles.control} value={state.country} onChange={(_, value) => onCountryChange(value.value)}>
            {holidayCountryOptions(data.holidays, state.country).map((item) => <option key={item} value={item}>{item}</option>)}
          </Select></label>
          <label className={styles.field}>Region<Select className={styles.control} value={state.region} onChange={(_, value) => onRegionChange(value.value)}><option value="">All regions</option>{regions.map((item) => <option key={item} value={item}>{item}</option>)}</Select></label>
        </section>
        {holiday && <>
          <Divider />
          <section className={styles.details}>
            <Title3>About this holiday</Title3>
            <Body1>{holiday.description || 'No additional description is available.'}</Body1>
            <Caption1>Applies to {holiday.region || holidayCountryLabel(holiday)}; type: {holidayTypeLabel(holiday.isOptional)}.</Caption1>
          </section>
          <Divider />
          <section className={styles.neighbors} aria-label="Surrounding dates">
            <Title3>Surrounding dates</Title3>
            {surrounding.map((item) => <div className={styles.neighbor} key={item.date}>
              <Body1>{dateLabel(item.date, { weekday: 'short' })}</Body1>
              <Caption1>{item.holiday?.title || (item.weekday === 0 || item.weekday === 6 ? 'Weekend' : 'Working day')}</Caption1>
            </div>)}
          </section>
        </>}
      </>}
      <HolidaySourceNotice data={data} />
    </main>
  );
}