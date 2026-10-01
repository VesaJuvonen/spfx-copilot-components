import { makeStyles, tokens } from '@fluentui/react-components';

export const HOLIDAY_PLANNER_HEADER_GRADIENT = 'linear-gradient(112deg, #6d3be7 0%, #6543e8 58%, #3d55d9 100%)';

export const useCompactPlannerHeaderStyles = makeStyles({
  root: { boxSizing: 'border-box', display: 'flex', minWidth: 0, alignItems: 'center', justifyContent: 'space-between', gap: tokens.spacingHorizontalM, padding: tokens.spacingHorizontalL, color: tokens.colorNeutralForegroundOnBrand, backgroundImage: HOLIDAY_PLANNER_HEADER_GRADIENT, border: '1px solid rgba(255, 255, 255, 0.18)', borderRadius: tokens.borderRadiusLarge, boxShadow: tokens.shadow4 },
  copy: { display: 'flex', minWidth: 0, flexDirection: 'column', gap: tokens.spacingVerticalXXS },
  eyebrow: { color: 'rgba(255, 255, 255, 0.88)', fontSize: '11px', lineHeight: '16px', fontWeight: tokens.fontWeightSemibold },
  title: { color: tokens.colorNeutralForegroundOnBrand, fontSize: '22px', lineHeight: '28px', fontWeight: tokens.fontWeightSemibold, overflowWrap: 'anywhere' },
  subtitle: { color: 'rgba(255, 255, 255, 0.9)', fontSize: '13px', lineHeight: '18px', overflowWrap: 'anywhere' },
  expandButton: { flex: '0 0 auto', color: tokens.colorNeutralForegroundOnBrand, backgroundColor: 'rgba(40, 20, 12, 0.22)', border: '1px solid rgba(255, 255, 255, 0.4)', borderRadius: tokens.borderRadiusMedium, ':hover': { color: tokens.colorNeutralForegroundOnBrand, backgroundColor: 'rgba(40, 20, 12, 0.38)' }, ':focus-visible': { outlineColor: tokens.colorNeutralForegroundOnBrand, outlineStyle: 'solid', outlineWidth: '2px' } }
});