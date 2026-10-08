import * as React from 'react';
import { Button, Caption1 } from '@fluentui/react-components';
import { WarningRegular } from '@fluentui/react-icons';

import type { IHolidayCoverageNoticeProps } from './HolidayCoverageNotice.types';
import { useHolidayCoverageNoticeStyles } from './HolidayCoverageNotice.styles';
import { hasHolidayCoverage, suggestCoveredCountry } from './HolidayCoverageNotice.utils';

export function HolidayCoverageNotice(props: Readonly<IHolidayCoverageNoticeProps>): React.ReactElement | null {
  const styles = useHolidayCoverageNoticeStyles();
  if (hasHolidayCoverage(props.holidays, props.country, props.region)) {
    return null;
  }
  const location = props.region ? `${props.country}, ${props.region}` : props.country;
  const suggestion = props.onSwitchCountry ? suggestCoveredCountry(props.holidays, props.country, props.defaultCountry) : undefined;
  return (
    <div className={`${styles.notice}${props.className ? ` ${props.className}` : ''}`} role="status">
      <WarningRegular className={styles.icon} fontSize={18} aria-hidden="true" />
      <Caption1 className={styles.text}>
        No holiday calendar is loaded for {location}. Only weekends are counted until a calendar is available.
      </Caption1>
      {suggestion && <Button size="small" appearance="secondary" onClick={() => props.onSwitchCountry?.(suggestion)}>Use {suggestion}</Button>}
    </div>
  );
}
