import * as React from 'react';
import {
  Title2,
  Title3,
  Body1,
  Caption1,
  Button,
  Input,
  Select,
  Divider
} from '@fluentui/react-components';
import { AddRegular, DismissRegular } from '@fluentui/react-icons';

import { dateLabel } from '../../shared/domain/holidayFormat/holidayFormat';
import { CompactPlannerHeader } from '../../shared/components/compactPlannerHeader/CompactPlannerHeader';
import { HolidaySourceNotice } from '../../shared/components/holidaySourceNotice/HolidaySourceNotice';
import type { IHolidaySurfaceProps } from '../../shared/components/holidayPlannerComponentBase/HolidayPlannerComponentBase';
import type { IRegionalComparisonProperties } from '../RegionalComparisonCopilotComponentProperties';
import { useRegionalComparisonAppStyles } from './RegionalComparisonApp.styles';
import { hasScope, holidayOn, scopeLabel } from './RegionalComparisonApp.utils';
import { useRegionalComparisonState } from './useRegionalComparisonState';

export function RegionalComparisonApp(props: IHolidaySurfaceProps<IRegionalComparisonProperties>): React.ReactElement {
  const styles = useRegionalComparisonAppStyles();
  const { data, today, state, allScopes, allByScope, sharedCount, uniqueCount, comparisonDates, onStartDateChange, onEndDateChange, onScopeToAddChange, onAddScope, onRemoveScope } = useRegionalComparisonState(props);
  const fullscreen = props.hostContext.displayMode === 'fullscreen';

  return (
    <main className={styles.root}>
      {fullscreen ? <header className={styles.header}>
        <Caption1 className={styles.eyebrow}>HOLIDAY PLANNER / REGIONAL COMPARISON</Caption1>
        <Title2>Compare locations</Title2>
      </header> : <CompactPlannerHeader
        eyebrow="HOLIDAY PLANNER / REGIONAL COMPARISON"
        title="Upcoming holidays across offices"
        subtitle={`${dateLabel(state.startDate, { month: 'short' })} – ${dateLabel(state.endDate, { month: 'short' })} · ${state.selectedScopes.map(scopeLabel).join(', ')}`}
        onExpand={props.onExpand}
      />}
      <div className={styles.totals} aria-label="Shared and unique holiday counts">
        <div className={styles.total}><Caption1>Shared dates</Caption1><span className={`${styles.totalValue} ${styles.shared}`}>{sharedCount}</span></div>
        <div className={styles.total}><Caption1>Location-specific dates</Caption1><span className={styles.totalValue}>{uniqueCount}</span></div>
      </div>

      {!fullscreen && <section className={styles.columns} aria-label="Upcoming holiday comparison">
        {allByScope.map(({ scope, holidays }) => <div className={styles.column} key={scope}>
          <Title3>{scopeLabel(scope)}</Title3>
          {holidays.filter((holiday) => holiday.date >= today).slice(0, 4).map((holiday) => <div className={styles.row} key={holiday.id}>
            <Body1>{holiday.title}</Body1><Caption1>{dateLabel(holiday.date, { month: 'short' })}</Caption1>
          </div>)}
        </div>)}
      </section>}
      {fullscreen && <>
        <section className={styles.form} aria-label="Comparison settings">
          <label className={styles.field}>From<Input className={styles.control} type="date" value={state.startDate} onChange={(_, value) => onStartDateChange(value.value)} /></label>
          <label className={styles.field}>Through<Input className={styles.control} type="date" value={state.endDate} onChange={(_, value) => onEndDateChange(value.value)} /></label>
          <label className={styles.field}>Add country or region<Select className={styles.control} value={state.scopeToAdd} onChange={(_, value) => onScopeToAddChange(value.value)}>{allScopes.map((scope) => <option key={scope} value={scope}>{scopeLabel(scope)}</option>)}</Select></label>
          <Button appearance="secondary" icon={<AddRegular />} onClick={onAddScope} disabled={!state.scopeToAdd || hasScope(state.selectedScopes, state.scopeToAdd)}>Add location</Button>
        </section>
        <div className={styles.scopes} aria-label="Selected locations">
          {state.selectedScopes.map((scope) => <Button key={scope} appearance="subtle" icon={<DismissRegular />} onClick={() => onRemoveScope(scope)} aria-label={`Remove ${scopeLabel(scope)}`}>{scopeLabel(scope)}</Button>)}
        </div>
        <Divider />
        {state.selectedScopes.length < 2 ? <Body1>Select at least two locations to compare.</Body1> : <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead><tr><th className={styles.cell}>Date</th>{state.selectedScopes.map((scope) => <th className={styles.cell} key={scope}>{scopeLabel(scope)}</th>)}</tr></thead>
            <tbody>{comparisonDates.map((date) => {
              const holidays = state.selectedScopes.map((scope) => holidayOn(data.holidays, scope, date));
              const isMismatch = holidays.some(Boolean) && holidays.some((holiday) => !holiday);
              return <tr key={date} className={isMismatch ? styles.mismatch : undefined}>
                <th className={styles.cell} scope="row">{dateLabel(date, { weekday: 'short' })}</th>
                {holidays.map((holiday, index) => <td className={styles.cell} key={state.selectedScopes[index]}>{holiday ? holiday.title : 'Working day'}</td>)}
              </tr>;
            })}</tbody>
          </table>
          <Caption1 className={styles.muted}>Highlighted rows are dates when some locations close while others remain open.</Caption1>
        </div>}
      </>}
      <HolidaySourceNotice data={data} />
    </main>
  );
}