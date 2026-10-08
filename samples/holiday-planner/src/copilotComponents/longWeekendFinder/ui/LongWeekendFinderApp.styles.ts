import { makeStyles, tokens } from '@fluentui/react-components';

export const useLongWeekendFinderAppStyles = makeStyles({
  root: { boxSizing: 'border-box', width: 'calc(100% - 12px)', minWidth: 0, margin: '6px', padding: tokens.spacingHorizontalL, display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalM, backgroundColor: tokens.colorNeutralBackground1, border: `1px solid ${tokens.colorNeutralStroke2}`, borderRadius: tokens.borderRadiusLarge, boxShadow: tokens.shadow2 },
  header: { display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalXS, paddingBottom: tokens.spacingVerticalM, borderBottom: `1px solid ${tokens.colorNeutralStroke2}` },
  eyebrow: { color: tokens.colorNeutralForeground3, fontWeight: tokens.fontWeightSemibold },
  hero: { borderTop: `3px solid ${tokens.colorBrandStroke1}`, padding: tokens.spacingVerticalL, display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalXS, borderRadius: tokens.borderRadiusMedium, backgroundColor: tokens.colorNeutralBackground2 },
  dates: { fontSize: '24px', lineHeight: '1.2', fontWeight: 600, color: tokens.colorBrandForeground1 },
  form: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(165px, 1fr))', gap: tokens.spacingHorizontalM },
  field: { display: 'flex', minWidth: 0, flexDirection: 'column', gap: tokens.spacingVerticalXS, color: tokens.colorNeutralForeground2, fontSize: tokens.fontSizeBase200, fontWeight: tokens.fontWeightSemibold },
  control: { width: '100%', minWidth: 0 },
  list: { display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalM },
  row: { display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalXS, padding: tokens.spacingVerticalM, borderLeft: `2px solid ${tokens.colorNeutralStroke2}`, backgroundColor: tokens.colorNeutralBackground2 },
  muted: { color: tokens.colorNeutralForeground3 }
});