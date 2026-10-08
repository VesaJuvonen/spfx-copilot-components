import { makeStyles, tokens } from '@fluentui/react-components';

export const useHolidayDetailsAppStyles = makeStyles({
  root: { boxSizing: 'border-box', width: 'calc(100% - 12px)', minWidth: 0, margin: '6px', padding: tokens.spacingHorizontalL, display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalM, backgroundColor: tokens.colorNeutralBackground1, border: `1px solid ${tokens.colorNeutralStroke2}`, borderRadius: tokens.borderRadiusLarge, boxShadow: tokens.shadow2 },
  header: { display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalXS, paddingBottom: tokens.spacingVerticalM, borderBottom: `1px solid ${tokens.colorNeutralStroke2}` },
  eyebrow: { color: tokens.colorNeutralForeground3, fontWeight: tokens.fontWeightSemibold },
  answer: { display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalM, padding: tokens.spacingVerticalL, borderLeft: `3px solid ${tokens.colorBrandStroke1}`, borderRadius: tokens.borderRadiusMedium, backgroundColor: tokens.colorNeutralBackground2 },
  answerIcon: { fontSize: '30px', color: tokens.colorBrandForeground1 },
  details: { display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalXS },
  filters: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(165px, 1fr))', gap: tokens.spacingHorizontalM },
  field: { display: 'flex', minWidth: 0, flexDirection: 'column', gap: tokens.spacingVerticalXS, color: tokens.colorNeutralForeground2, fontSize: tokens.fontSizeBase200, fontWeight: tokens.fontWeightSemibold },
  control: { width: '100%', minWidth: 0 },
  neighbors: { display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalXS },
  neighbor: { display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) auto', gap: tokens.spacingHorizontalM, paddingBlock: tokens.spacingVerticalXS }
});