import * as React from 'react';
import {
  Title2,
  Title3,
  Body1,
  Caption1,
  Input,
  Select,
  Checkbox,
  Divider
} from '@fluentui/react-components';

import { CompactPlannerHeader } from '../../shared/components/compactPlannerHeader/CompactPlannerHeader';
import { holidayCountryOptions, dateLabel } from '../../shared/domain/holidayFormat/holidayFormat';
import { HolidaySourceNotice } from '../../shared/components/holidaySourceNotice/HolidaySourceNotice';
import { HolidayCoverageNotice } from '../../shared/components/holidayCoverageNotice/HolidayCoverageNotice';
import type { IHolidaySurfaceProps } from '../../shared/components/holidayPlannerComponentBase/HolidayPlannerComponentBase';
import type { IWorkingDayCalculatorProperties } from '../WorkingDayCalculatorCopilotComponentProperties';
import { useWorkingDayCalculatorAppStyles } from './WorkingDayCalculatorApp.styles';
import { useWorkingDayCalculatorState } from './useWorkingDayCalculatorState';

export function WorkingDayCalculatorApp(
  props: IHolidaySurfaceProps<IWorkingDayCalculatorProperties>
): React.ReactElement {
  const styles = useWorkingDayCalculatorAppStyles();
  const { data, state, regions, validDates, calculation, rangeDescription, locationDescription, onStartDateChange, onEndDateChange, onCountryChange, onRegionChange, onIncludeOptionalChange } = useWorkingDayCalculatorState(props);
  const fullscreen = props.hostContext.displayMode === 'fullscreen';

  return (
    <main className={styles.root}>
      {fullscreen ? <header className={styles.header}>
        <Caption1 className={styles.eyebrow}>HOLIDAY PLANNER / WORKING DAYS</Caption1>
        <div className={styles.headline}>
          {calculation?.hasHolidayData ? <span className={styles.number}>{calculation.workingDays}</span> : <Title2>Calendar needed</Title2>}
          <Title2>working days</Title2>
        </div>
        <Body1 className={styles.muted}>{rangeDescription} · {locationDescription}</Body1>
        {!validDates && <Body1 role="alert">Enter valid start and end dates.</Body1>}
        {calculation?.invertedRange && <Caption1 role="status">The dates were reversed, so the range has been reordered.</Caption1>}
      </header> : <>
        <CompactPlannerHeader
          eyebrow="HOLIDAY PLANNER / WORKING DAYS"
          title={calculation?.hasHolidayData ? `${calculation.workingDays} working days` : 'Calendar needed'}
          subtitle={`${rangeDescription} · ${locationDescription}`}
          onExpand={props.onExpand}
        />
        {!validDates && <Body1 role="alert">Enter valid start and end dates.</Body1>}
        {calculation?.invertedRange && <Caption1 role="status">The dates were reversed, so the range has been reordered.</Caption1>}
      </>}
      <HolidayCoverageNotice holidays={data.holidays} country={state.country} region={state.region || undefined} defaultCountry={data.defaultCountry} onSwitchCountry={onCountryChange} />

      {calculation && <div className={styles.breakdown} aria-label="Working day breakdown">
        <div className={styles.metric}><Caption1>Total days</Caption1><span className={styles.metricValue}>{calculation.totalDays}</span></div>
        <div className={styles.metric}><Caption1>Weekends excluded</Caption1><span className={styles.metricValue}>{calculation.weekendsExcluded}</span></div>
        <div className={styles.metric}><Caption1>Holidays excluded</Caption1><span className={styles.metricValue}>{calculation.holidaysExcluded.length}</span></div>
        <div className={styles.metric}><Caption1>Working days</Caption1><span className={styles.metricValue}>{calculation.workingDays}</span></div>
      </div>}

      {fullscreen && <>
        <section aria-label="Calculation options" className={styles.filters}>
          <label className={styles.field}>Start date<Input className={styles.control} type="date" value={state.startDate} onChange={(_, value) => onStartDateChange(value.value)} /></label>
          <label className={styles.field}>End date<Input className={styles.control} type="date" value={state.endDate} onChange={(_, value) => onEndDateChange(value.value)} /></label>
          <label className={styles.field}>Country<Select className={styles.control} value={state.country} onChange={(_, value) => onCountryChange(value.value)}>
            {holidayCountryOptions(data.holidays, state.country).map((item) => <option key={item} value={item}>{item}</option>)}
          </Select></label>
          <label className={styles.field}>Region<Select className={styles.control} value={state.region} onChange={(_, value) => onRegionChange(value.value)}>
            <option value="">All regions</option>
            {regions.map((item) => <option key={item} value={item}>{item}</option>)}
          </Select></label>
        </section>
        <Checkbox checked={state.includeOptional} onChange={(_, value) => onIncludeOptionalChange(value.checked === true)} label="Include optional holidays" />
        <Divider />
        <section className={styles.holidays} aria-label="Excluded holidays">
          <Title3>Holidays excluded</Title3>
          {calculation?.holidaysExcluded.length ? calculation.holidaysExcluded.map((holiday) => (
            <div key={holiday.id} className={styles.holiday}>
              <Body1>{holiday.title}</Body1><Caption1>{dateLabel(holiday.date)}{holiday.region ? ` · ${holiday.region}` : ''}</Caption1>
            </div>
          )) : <Caption1 className={styles.muted}>No holidays fall within this range.</Caption1>}
        </section>
      </>}
      <HolidaySourceNotice data={data} />
    </main>
  );
}