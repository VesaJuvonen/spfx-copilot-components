import { makeStyles, tokens } from '@fluentui/react-components';

export const useRegionalComparisonAppStyles = makeStyles({
  root: { boxSizing: 'border-box', width: 'calc(100% - 12px)', minWidth: 0, margin: '6px', padding: tokens.spacingHorizontalL, display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalM, backgroundColor: tokens.colorNeutralBackground1, border: `1px solid ${tokens.colorNeutralStroke2}`, borderRadius: tokens.borderRadiusLarge, boxShadow: tokens.shadow2 },
  header: { display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalXS, paddingBottom: tokens.spacingVerticalM, borderBottom: `1px solid ${tokens.colorNeutralStroke2}` },
  eyebrow: { color: tokens.colorNeutralForeground3, fontWeight: tokens.fontWeightSemibold },
  columns: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: tokens.spacingHorizontalL },
  column: { minWidth: 0, display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalXS, padding: tokens.spacingVerticalM, borderTop: `2px solid ${tokens.colorNeutralStroke2}`, backgroundColor: tokens.colorNeutralBackground2 },
  row: { display: 'flex', justifyContent: 'space-between', gap: tokens.spacingHorizontalM, paddingBlock: tokens.spacingVerticalXS, borderBottom: `1px solid ${tokens.colorNeutralStroke2}` },
  totals: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: tokens.spacingHorizontalM },
  total: { display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalXS, padding: tokens.spacingVerticalM, borderLeft: `3px solid ${tokens.colorBrandStroke1}`, backgroundColor: tokens.colorNeutralBackground2 },
  totalValue: { fontSize: '22px', lineHeight: '1.2', fontWeight: tokens.fontWeightSemibold },
  form: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: tokens.spacingHorizontalS },
  field: { display: 'flex', minWidth: 0, flexDirection: 'column', gap: tokens.spacingVerticalXS, color: tokens.colorNeutralForeground2, fontSize: tokens.fontSizeBase200, fontWeight: tokens.fontWeightSemibold },
  control: { width: '100%', minWidth: 0 },
  scopes: { display: 'flex', flexWrap: 'wrap', gap: tokens.spacingHorizontalXS },
  tableWrap: { width: '100%', overflowX: 'auto' },
  table: { width: '100%', minWidth: '540px', borderCollapse: 'collapse' },
  cell: { padding: tokens.spacingVerticalS, textAlign: 'left', verticalAlign: 'top', borderBottom: `1px solid ${tokens.colorNeutralStroke2}` },
  mismatch: { backgroundColor: tokens.colorPaletteYellowBackground2 },
  shared: { color: tokens.colorPaletteGreenForeground1 },
  muted: { color: tokens.colorNeutralForeground3 }
});