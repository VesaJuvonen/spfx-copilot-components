import * as React from 'react';
import { Caption1 } from '@fluentui/react-components';
import type { IHolidaySourceNoticeProps } from './HolidaySourceNotice.types';
import { useHolidaySourceNoticeStyles } from './HolidaySourceNotice.styles';

export function HolidaySourceNotice(props: Readonly<IHolidaySourceNoticeProps>): React.ReactElement | null {
  const styles = useHolidaySourceNoticeStyles();
  if (!props.data.isDemo) {
    return null;
  }
  return (
    <Caption1 className={styles.notice} role="status">
      Demo data is shown. Connect the SharePoint holiday lists for live data.
    </Caption1>
  );
}