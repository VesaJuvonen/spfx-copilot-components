import * as React from 'react';
import {
  FluentProvider,
  RendererProvider,
  createDOMRenderer,
  webDarkTheme,
  webLightTheme
} from '@fluentui/react-components';
import type { IPlannerShellProps } from './PlannerShell.types';
import { usePlannerShellStyles } from './PlannerShell.styles';

export type { IPlannerShellProps } from './PlannerShell.types';

export function PlannerShell({ hostContext, targetDocument, children }: Readonly<IPlannerShellProps>): React.ReactElement {
  const styles = usePlannerShellStyles();
  const baseTheme = hostContext.theme === 'dark' ? webDarkTheme : webLightTheme;
  const theme = React.useMemo(() => ({
    ...baseTheme,
    fontFamilyBase: '"Segoe UI", Tahoma, sans-serif',
    fontFamilyNumeric: '"Segoe UI", Tahoma, sans-serif'
  }), [baseTheme]);
  const renderer = React.useMemo(() => createDOMRenderer(targetDocument), [targetDocument]);
  const [mountGeneration, setMountGeneration] = React.useState(0);

  React.useEffect(() => {
    setMountGeneration(1);
  }, []);

  return (
    <RendererProvider renderer={renderer} targetDocument={targetDocument}>
      <FluentProvider className={styles.provider} key={mountGeneration} theme={theme} targetDocument={targetDocument}>
        {children}
      </FluentProvider>
    </RendererProvider>
  );
}