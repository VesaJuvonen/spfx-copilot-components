import { getAdvertisedFullscreenHeight, resolveFullscreenRequestHeight } from './fullscreenSize';

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
});