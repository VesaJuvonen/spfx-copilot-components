import { makeStyles, tokens } from '@fluentui/react-components';

export const useWorkingDayCalculatorAppStyles = makeStyles({
  root: { boxSizing: 'border-box', width: 'calc(100% - 12px)', minWidth: 0, margin: '6px', padding: tokens.spacingHorizontalL, display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalM, color: tokens.colorNeutralForeground1, backgroundColor: tokens.colorNeutralBackground1, border: `1px solid ${tokens.colorNeutralStroke2}`, borderRadius: tokens.borderRadiusLarge, boxShadow: tokens.shadow2 },
  header: { display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalXS, paddingBottom: tokens.spacingVerticalM, borderBottom: `1px solid ${tokens.colorNeutralStroke2}` },
  eyebrow: { color: tokens.colorNeutralForeground3, fontWeight: tokens.fontWeightSemibold },
  headline: { display: 'flex', alignItems: 'baseline', gap: tokens.spacingHorizontalS, flexWrap: 'wrap' },
  number: { fontSize: '36px', lineHeight: '1', fontWeight: 700, color: tokens.colorBrandForeground1 },
  breakdown: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: tokens.spacingHorizontalS },
  metric: { display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalXXS, padding: tokens.spacingVerticalM, borderLeft: `2px solid ${tokens.colorNeutralStroke2}`, backgroundColor: tokens.colorNeutralBackground2 },
  metricValue: { fontSize: '20px', fontWeight: 600, color: tokens.colorNeutralForeground1 },
  filters: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: tokens.spacingHorizontalM },
  field: { display: 'flex', minWidth: 0, flexDirection: 'column', gap: tokens.spacingVerticalXS, color: tokens.colorNeutralForeground2, fontSize: tokens.fontSizeBase200, fontWeight: tokens.fontWeightSemibold },
  control: { width: '100%', minWidth: 0 },
  holidays: { display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalS },
  holiday: { display: 'flex', justifyContent: 'space-between', gap: tokens.spacingHorizontalM, flexWrap: 'wrap', paddingBlock: tokens.spacingVerticalS, borderBottom: `1px solid ${tokens.colorNeutralStroke2}` },
  muted: { color: tokens.colorNeutralForeground3 }
});