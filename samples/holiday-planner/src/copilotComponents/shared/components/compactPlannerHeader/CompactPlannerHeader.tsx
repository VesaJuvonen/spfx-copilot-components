import * as React from 'react';
import { Button, Caption1, Title2, Tooltip } from '@fluentui/react-components';
import { ArrowExpandRegular } from '@fluentui/react-icons';
import type { ICompactPlannerHeaderProps } from './CompactPlannerHeader.types';
import { useCompactPlannerHeaderStyles } from './CompactPlannerHeader.styles';

export { HOLIDAY_PLANNER_HEADER_GRADIENT } from './CompactPlannerHeader.styles';

export function CompactPlannerHeader(props: ICompactPlannerHeaderProps): React.ReactElement {
  const styles = useCompactPlannerHeaderStyles();

  return (
    <header className={styles.root}>
      <div className={styles.copy}>
        <Caption1 className={styles.eyebrow}>{props.eyebrow}</Caption1>
        <Title2 className={styles.title}>{props.title}</Title2>
        {props.subtitle && <Caption1 className={styles.subtitle}>{props.subtitle}</Caption1>}
      </div>
      <Tooltip content="Expand dashboard" relationship="label">
        <Button
          appearance="subtle"
          className={styles.expandButton}
          icon={<ArrowExpandRegular />}
          aria-label="Expand dashboard"
          onClick={() => void props.onExpand()}
        />
      </Tooltip>
    </header>
  );
}