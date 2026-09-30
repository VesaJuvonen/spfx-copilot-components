import {
  getAdvertisedFullscreenHeight,
  isFullscreenViewportSettled,
  resolveFullscreenRequestHeight,
  resolveFullscreenSettlementHeight,
  resolveVisibleFullscreenHeight,
  shouldSettleFullscreenFrame
} from './fullscreenSize';

describe('full-screen MCP sizing', () => {
  test('treats a 500px advertised iframe as transitional and requests the available screen height', () => {
    expect(getAdvertisedFullscreenHeight(500, undefined)).toBeUndefined();
    expect(resolveFullscreenRequestHeight(500, undefined, 500, 1801)).toBe(1801);
  });

  test('requests beyond stale advertised dimensions so the host can clamp to its panel', () => {
    expect(getAdvertisedFullscreenHeight(500, 940)).toBe(940);
    expect(resolveFullscreenRequestHeight(500, 940, 500, 1801)).toBe(1801);
  });

  test('preserves adequate fixed and current viewport heights', () => {
    expect(resolveFullscreenRequestHeight(820, undefined, 500)).toBe(820);
    expect(resolveFullscreenRequestHeight(undefined, undefined, 1041)).toBe(1041);
  });

  test('holds the visible layout height through small scrollbar deltas', () => {
    expect(resolveVisibleFullscreenHeight(1170, 1161)).toBe(1170);
    expect(resolveVisibleFullscreenHeight(1170, 1130)).toBe(1130);
  });

  test('settles only material iframe overflow', () => {
    expect(shouldSettleFullscreenFrame(1392, 1170)).toBe(true);
    expect(shouldSettleFullscreenFrame(1190, 1170)).toBe(false);
  });

  test('does not treat a taller rejected viewport as settled', () => {
    expect(isFullscreenViewportSettled(1801, 1579)).toBe(false);
    expect(isFullscreenViewportSettled(1585, 1579)).toBe(true);
  });

  test('settles below the host edge and never grows a shorter frame', () => {
    expect(resolveFullscreenSettlementHeight(1801, 1170)).toBe(1138);
    expect(resolveFullscreenSettlementHeight(1138, 1138)).toBeUndefined();
    expect(resolveFullscreenSettlementHeight(900, 930)).toBeUndefined();
  });
});