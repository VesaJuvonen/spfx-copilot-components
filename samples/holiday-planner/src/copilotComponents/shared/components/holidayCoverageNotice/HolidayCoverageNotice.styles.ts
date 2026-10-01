import { makeStyles, tokens } from '@fluentui/react-components';

export const useHolidayCoverageNoticeStyles = makeStyles({
  notice: { display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: tokens.spacingHorizontalS, padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalM}`, borderRadius: tokens.borderRadiusMedium, border: `1px solid ${tokens.colorPaletteMarigoldBorder1}`, backgroundColor: tokens.colorPaletteMarigoldBackground1, color: tokens.colorNeutralForeground1 },
  icon: { color: tokens.colorPaletteMarigoldForeground1, flexShrink: 0 },
  text: { flex: '1 1 200px', minWidth: 0 }
});
