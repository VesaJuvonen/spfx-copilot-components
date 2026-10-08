import * as React from 'react';
import {
  Badge,
  Body1,
  Button,
  Caption1,
  Divider,
  Input,
  Label,
  Select,
  Tab,
  TabList,
  Title1,
  Title2,
  Title3,
  Tooltip
} from '@fluentui/react-components';
import {
  CalendarLtrRegular,
  ChevronLeftRegular,
  ChevronRightRegular,
  ClockRegular,
  GlobeRegular,
  SaveRegular,
  StarRegular,
  WeatherSunnyRegular
} from '@fluentui/react-icons';

import { HolidaySourceNotice } from '../holidaySourceNotice/HolidaySourceNotice';
import { HolidayCoverageNotice } from '../holidayCoverageNotice/HolidayCoverageNotice';
import { addMonths, dateLabel, holidayCountryLabel, holidayTypeLabel, monthLabel } from '../../domain/holidayFormat/holidayFormat';
import { DashboardReveal, useHolidayPlannerDashboardStyles } from './HolidayPlannerDashboard.styles';
import type { DashboardCalendarView, IHolidayPlannerDashboardProps } from './HolidayPlannerDashboard.types';
import { datePart, holidayAccentColor, rangeLabel } from './HolidayPlannerDashboard.utils';
import { useHolidayPlannerDashboardState } from './useHolidayPlannerDashboardState';

export type { DashboardSection } from './HolidayPlannerDashboard.types';

export function HolidayPlannerDashboard(props: Readonly<IHolidayPlannerDashboardProps>): React.ReactElement {
  const styles = useHolidayPlannerDashboardStyles();
  const [selectedPlanTier, setSelectedPlanTier] = React.useState<'Quick escape' | 'Balanced plan' | 'Best value'>('Quick escape');
  const {
    data, dashboardRef, state, countryOptions, regionOptions, upcomingHolidays, nextHoliday,
    selectedHoliday, selectedHolidayIsPast, selectedHolidayOnWeekend, selectedHolidayBreak, longWeekends, recommendedLongWeekend, longWeekendWorkingDaysUntil, vacationPlans, recommendedVacationPlan, yearOptions, stats, moveMonth,
    onCountryChange, onRegionChange, onYearChange, onHolidaySelect,
    calendarStart, calendarEnd, calendarValid, moveCalendar, onCalendarViewChange,
    onRangeStartChange, onRangeEndChange, onHolidayTypeChange,
    savedCountry, savingCountry, countrySaveMessage, countrySaveFailed, saveCountry
  } = useHolidayPlannerDashboardState(props);
  const { country, region, year, month } = state;
  const calendarTitle = state.calendarView === 'year' ? `Holidays in ${year}` : state.calendarView === 'month' ? monthLabel(year, month)
    : state.calendarView === 'range' ? 'Holidays by date' : 'Upcoming holidays';
  const calendarPeriod = calendarValid && calendarStart && calendarEnd ? rangeLabel(calendarStart, calendarEnd)
    : calendarStart ? `From ${calendarStart}` : calendarEnd ? `Through ${calendarEnd}` : 'All dates';
  const nextLongWeekend = longWeekends[0];
  const longWeekendCountdown = nextLongWeekend && longWeekendWorkingDaysUntil > 0
    ? ` · in ${longWeekendWorkingDaysUntil} working ${longWeekendWorkingDaysUntil === 1 ? 'day' : 'days'}` : '';

  return (
    <div className={styles.root}>
      <header className={styles.topbar}>
        <div className={styles.brand}>
          <span className={styles.brandMark}><CalendarLtrRegular fontSize={24} /></span>
          <span className={styles.brandName}><Caption1>Company calendar</Caption1></span>
        </div>
        <div className={styles.topActions}>
          <Label htmlFor="holiday-planner-country" className={styles.srOnly}>Country</Label>
          <Select id="holiday-planner-country" className={styles.countrySelect} value={country} onChange={(_, option) => onCountryChange(option.value)}>
            {countryOptions.map((item) => <option key={item} value={item}>{item}</option>)}
          </Select>
          <Tooltip content="Save default country to OneDrive" relationship="label">
            <Button appearance="subtle" icon={<SaveRegular />} aria-label="Save default country to OneDrive" disabled={savingCountry || country === savedCountry || !props.dataService.saveDefaultCountry} onClick={() => { void saveCountry(); }} />
          </Tooltip>
          <Label htmlFor="holiday-planner-year" className={styles.srOnly}>Year</Label>
          <Select id="holiday-planner-year" value={String(year)} onChange={(_, option) => onYearChange(Number(option.value))}>
            {yearOptions.map((item) => <option key={item} value={String(item)}>{item}</option>)}
          </Select>
        </div>
        <div className={styles.preferenceStatus}>
          {countrySaveMessage ? <Caption1 role={countrySaveFailed ? 'alert' : 'status'}>{countrySaveMessage}</Caption1>
            : savedCountry ? <Caption1>Default country: {savedCountry}</Caption1>
              : data.countryPreferenceUnavailable ? <Caption1 role="status">Saved country unavailable. Using your detected default.</Caption1> : null}
        </div>
      </header>

      <div className={styles.layout}>
        <div className={styles.contentColumn}>
        <main className={styles.content} ref={dashboardRef}>
        <DashboardReveal>
          <div>
          <HolidayCoverageNotice className={styles.coverageNotice} holidays={data.holidays} country={country} region={region || undefined} defaultCountry={data.defaultCountry} onSwitchCountry={onCountryChange} />
          <section className={styles.hero} id="holiday-planner-overview">
            <div className={styles.heroCopy}>
              <Title1 className={styles.heroTitle}>Make every leave day count.</Title1>
              <Title3 className={styles.heroText}>Find fixed and optional holidays, then plan a better break around your work calendar.</Title3>
            </div>
            <div className={styles.heroVisual} aria-label={nextHoliday ? `Next holiday: ${nextHoliday.title}` : 'No upcoming holiday'}>
              <div className={styles.holidayTicket}>
                <Caption1 className={styles.ticketLabel}>Next holiday</Caption1>
                <div className={styles.ticketDay}>{nextHoliday ? datePart(nextHoliday.date, 'day') : '--'}</div>
                <Caption1>{nextHoliday ? dateLabel(nextHoliday.date, { month: 'long', weekday: 'long' }) : 'No upcoming dates'}</Caption1>
                <div className={styles.ticketLine} />
              </div>
              <div className={styles.opportunity}>
                <div className={styles.opportunityHeader}>
                  <WeatherSunnyRegular fontSize={22} />
                  <Caption1 className={styles.opportunityLabel}>Next long weekend</Caption1>
                </div>
                <Title3 className={styles.opportunityTitle}>{nextLongWeekend ? `${nextLongWeekend.totalDays}-day break` : 'Explore your calendar'}</Title3>
                <Caption1 className={styles.opportunityRange}>{nextLongWeekend ? `${rangeLabel(nextLongWeekend.startDate, nextLongWeekend.endDate)}${longWeekendCountdown}` : 'No upcoming break found'}</Caption1>
              </div>
            </div>
          </section>

          <section className={styles.stats} aria-label="Holiday planning summary">
            {stats.map((stat) => <article className={styles.stat} key={stat.label}>
              <div className={styles.statCopy}>
                <Caption1>{stat.label}</Caption1>
                <Title3 className={styles.statValue}>{stat.value}</Title3>
                <Caption1>{stat.detail}</Caption1>
              </div>
              <span className={styles.statIcon} aria-hidden="true">{stat.icon}</span>
            </article>)}
          </section>

          <section className={styles.mainGrid} id="holiday-planner-calendar" aria-label="Holiday calendar">
            <div className={styles.panel}>
              <div className={`${styles.panelHeader} ${styles.calendarHeader}`}>
                <div className={styles.panelHeading}>
                  <Caption1 className={styles.calendarEyebrow}>YOUR CALENDAR</Caption1>
                  <Title2 className={styles.calendarTitle}>{calendarTitle}</Title2>
                  <Caption1 className={styles.calendarRange}>{calendarPeriod}</Caption1>
                </div>
                {state.calendarView !== 'range' && <div className={styles.panelHeader}>
                  <Button className={styles.calendarNavButton} appearance="subtle" icon={<ChevronLeftRegular fontSize={20} />} aria-label={state.calendarView === 'year' ? 'Previous year' : 'Previous month'} title={state.calendarView === 'year' ? 'Previous year' : 'Previous month'} onClick={() => moveCalendar(-1)} />
                  <Button className={styles.calendarNavButton} appearance="subtle" icon={<ChevronRightRegular fontSize={20} />} aria-label={state.calendarView === 'year' ? 'Next year' : 'Next month'} title={state.calendarView === 'year' ? 'Next year' : 'Next month'} onClick={() => moveCalendar(1)} />
                </div>}
              </div>
              <TabList className={styles.calendarTabs} size="small" aria-label="Calendar view" selectedValue={state.calendarView} onTabSelect={(_, option) => onCalendarViewChange(option.value as DashboardCalendarView)}>
                <Tab value="upcoming">Upcoming</Tab><Tab value="month">Month</Tab><Tab value="year">Full year</Tab><Tab value="range">Date range</Tab>
              </TabList>
              <div className={styles.calendarFilters}>
                <label className={styles.calendarField}>Region
                  <Select id="holiday-planner-region" value={region} onChange={(_, option) => onRegionChange(option.value)}>
                    <option value="">All regions</option>
                    {regionOptions.map((item) => <option key={item} value={item}>{item}</option>)}
                  </Select>
                </label>
                <label className={styles.calendarField}>Holiday type
                  <Select value={state.holidayType} onChange={(_, option) => onHolidayTypeChange(option.value)}>
                    <option value="">All types</option><option value="Fixed">Fixed</option><option value="Optional">Optional</option>
                  </Select>
                </label>
                {state.calendarView === 'range' && <>
                  <label className={styles.calendarField}>From<Input type="date" value={state.rangeStart} onChange={(_, option) => onRangeStartChange(option.value)} /></label>
                  <label className={styles.calendarField}>Through<Input type="date" value={state.rangeEnd} onChange={(_, option) => onRangeEndChange(option.value)} /></label>
                </>}
              </div>
              {!calendarValid && <Body1 role="alert">Enter a valid date range with the end on or after the start.</Body1>}
              <Divider />
              <div className={styles.holidayList}>
                {upcomingHolidays.map((holiday) => {
                  const selected = selectedHoliday?.id === holiday.id;
                  return <Button
                    key={holiday.id}
                    appearance="subtle"
                    className={`${styles.holidayButton} ${selected ? styles.selectedHoliday : ''}`}
                    aria-pressed={selected}
                    onClick={() => onHolidaySelect(holiday.id)}
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
                      <Caption1>{dateLabel(holiday.date, { weekday: 'long' })} · {holiday.region || holidayCountryLabel(holiday)}</Caption1>
                    </span>
                    <ChevronRightRegular fontSize={18} aria-hidden="true" />
                  </Button>;
                })}
                {upcomingHolidays.length === 0 && <div className={styles.empty}>No holidays in this period for the selected location.</div>}
              </div>
            </div>

            <aside className={styles.detailsPanel} aria-label="Selected holiday" aria-live="polite">
              {selectedHoliday ? <>
                <div className={styles.detailHero}>
                  <div className={styles.panelHeader}>
                    <Badge appearance="tint" color="informative">Holiday details</Badge>
                    <GlobeRegular fontSize={20} />
                  </div>
                  <Caption1>{dateLabel(selectedHoliday.date)}</Caption1>
                  <Title2>{selectedHoliday.title}</Title2>
                  <Caption1>{dateLabel(selectedHoliday.date, { weekday: 'long' })} · {selectedHoliday.region || holidayCountryLabel(selectedHoliday)}</Caption1>
                </div>
                <div className={styles.detailContent}>
                  <div className={styles.detailFacts}>
                    <div className={styles.detailFact}><Caption1>Holiday type</Caption1><strong>{holidayTypeLabel(selectedHoliday.isOptional)} holiday</strong></div>
                    <div className={styles.detailFact}><Caption1>Applies to</Caption1><strong>{selectedHoliday.region || holidayCountryLabel(selectedHoliday)}</strong></div>
                  </div>
                  <Body1>{selectedHoliday.description || 'No additional description is available for this holiday.'}</Body1>
                  {selectedHolidayIsPast ? <div className={styles.pastNotice}>
                    <ClockRegular fontSize={20} />
                    <div className={styles.opportunityCopy}><strong>Past holiday</strong><Body1>This date has passed. Long-weekend suggestions cover upcoming dates only.</Body1></div>
                  </div> : selectedHolidayBreak ? <div className={styles.opportunityNotice}>
                    <WeatherSunnyRegular fontSize={20} />
                    <div className={styles.opportunityCopy}>
                      <strong>{selectedHolidayBreak.totalDays}-day break opportunity</strong>
                      <Body1>{rangeLabel(selectedHolidayBreak.startDate, selectedHolidayBreak.endDate)}{selectedHolidayBreak.bridgeDays.length ? ` · bridge day ${selectedHolidayBreak.bridgeDays.map((day) => dateLabel(day, { weekday: 'short', month: 'short', year: undefined })).join(', ')} (suggestion only)` : ' · no leave needed'}</Body1>
                    </div>
                  </div> : selectedHolidayOnWeekend ? <div className={styles.pastNotice}>
                    <WeatherSunnyRegular fontSize={20} />
                    <div className={styles.opportunityCopy}><strong>Falls on a weekend</strong><Body1>This holiday does not add a day off, so no long weekend forms around it.</Body1></div>
                  </div> : <div className={styles.pastNotice}>
                    <WeatherSunnyRegular fontSize={20} />
                    <div className={styles.opportunityCopy}><strong>Midweek holiday</strong><Body1>No long weekend forms around this date without extra leave. See the Vacation Optimizer for multi-day plans.</Body1></div>
                  </div>}
                </div>
              </> : <div className={styles.empty}>Select a holiday to see its details.</div>}
            </aside>
          </section>

          <section className={styles.section} id="holiday-planner-weekends">
            <div className={styles.sectionHeader}>
              <div className={styles.panelHeading}>
                <Caption1 className={styles.sectionEyebrow}>VACATION OPTIMIZER</Caption1>
                <Title2 className={styles.sectionTitle}>Get more break from fewer leave days</Title2>
                <Caption1 className={styles.sectionDescription}>Sample plans based on holidays and weekends in the selected period.</Caption1>
              </div>
              <div className={styles.panelHeader}>
                <Button className={styles.calendarNavButton} appearance="subtle" icon={<ChevronLeftRegular fontSize={20} />} aria-label="Previous long-weekend period" onClick={() => moveMonth(-1)} />
                <Body1 className={styles.sectionDescription}>{monthLabel(year, month)} – {monthLabel(addMonths(year, month, 2).year, addMonths(year, month, 2).month)}</Body1>
                <Button className={styles.calendarNavButton} appearance="subtle" icon={<ChevronRightRegular fontSize={20} />} aria-label="Next long-weekend period" onClick={() => moveMonth(1)} />
              </div>
            </div>
            <div className={styles.panel}>
              <div className={styles.optimizerGrid}>
                {(['Quick escape', 'Balanced plan', 'Best value'] as const).map((tier, index) => {
                  const plan = vacationPlans.find((item) => item.tier === tier);
                  const PlanIcon = index === 0 ? ClockRegular : index === 1 ? CalendarLtrRegular : StarRegular;
                  return <button type="button" className={`${styles.optimizerCard} ${selectedPlanTier === tier ? styles.optimizerSelected : ''}`} key={tier} aria-pressed={selectedPlanTier === tier} disabled={!plan} onClick={() => setSelectedPlanTier(tier)}>
                    {plan && recommendedVacationPlan === plan && <Badge className={styles.optimizerRecommended} appearance="tint" color="brand">Recommended</Badge>}
                    <Caption1 className={styles.optimizerLabel}>{tier}</Caption1>
                    <Title3 className={styles.optimizerTitle}>{plan ? `${plan.totalDays}-day break` : 'No plan found'}</Title3>
                    <Caption1 className={styles.optimizerLeave}>{plan ? `${plan.leaveDays} leave ${plan.leaveDays === 1 ? 'day' : 'days'}${plan.holidays.some((holiday) => holiday.isOptional) ? ' · includes optional holiday' : ''}` : 'Try another period'}</Caption1>
                    <Caption1 className={styles.optimizerRange}><PlanIcon fontSize={18} aria-hidden="true" />{plan ? rangeLabel(plan.startDate, plan.endDate) : `${tier} unavailable for these dates`}</Caption1>
                  </button>;
                })}
              </div>
              <Title3 className={styles.longWeekendHeading}>Long-weekend opportunities</Title3>
              {longWeekends.length ? <div className={styles.optionalGrid}>
                {longWeekends.map((weekend) => <article className={styles.optionalRow} key={`${weekend.startDate}-${weekend.endDate}`}>
                  <div className={styles.optionalCopy}>
                    <strong>{weekend.totalDays}-day break</strong>
                    <Caption1>{rangeLabel(weekend.startDate, weekend.endDate)}</Caption1>
                    <div className={styles.weekendHolidayList}>
                      {weekend.holidays.map((holiday) => <Caption1 key={`${holiday.id}-${holiday.date}`}>
                        {dateLabel(holiday.date, { weekday: 'long' })}: {holiday.title}
                      </Caption1>)}
                      {weekend.bridgeDays.map((day) => <Caption1 key={`bridge-${day}`}>
                        {dateLabel(day, { weekday: 'long' })}: Bridge day suggestion (not a booking)
                      </Caption1>)}
                    </div>
                  </div>
                  {weekend.startDate === recommendedLongWeekend?.startDate && weekend.endDate === recommendedLongWeekend.endDate && <Badge className={styles.optionalBadge} appearance="tint" color="success">Best value</Badge>}
                  {weekend.bridgeDays.length > 0 && <Badge className={styles.optionalBadge} appearance="outline">{weekend.bridgeDays.length} bridge {weekend.bridgeDays.length === 1 ? 'day' : 'days'}</Badge>}
                  {weekend.holidays.some((holiday) => holiday.isOptional) && <Badge className={styles.optionalBadge} appearance="outline" color="warning">Includes optional holiday</Badge>}
                </article>)}
              </div> : <div className={styles.empty}>No upcoming long-weekend opportunities were found for {country} this year.</div>}
            </div>
          </section>

          <footer className={styles.footer}>
            <HolidaySourceNotice data={data} />
            <Caption1>Showing {country}{region ? ` · ${region}` : ''} · {year}</Caption1>
          </footer>
          </div>
        </DashboardReveal>
      </main>
        </div>
      </div>

    </div>
  );
}