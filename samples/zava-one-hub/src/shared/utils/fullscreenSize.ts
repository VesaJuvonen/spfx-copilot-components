export const MIN_FULLSCREEN_HEIGHT = 720;
export const FULLSCREEN_LAYOUT_HYSTERESIS = 16;
export const FULLSCREEN_FRAME_HYSTERESIS = 48;

export function getAdvertisedFullscreenHeight(height?: number, maxHeight?: number): number | undefined {
  if (maxHeight && maxHeight >= MIN_FULLSCREEN_HEIGHT) return maxHeight;
  if (height && height >= MIN_FULLSCREEN_HEIGHT) return height;
  return undefined;
}

export function resolveFullscreenRequestHeight(
  height: number | undefined,
  maxHeight: number | undefined,
  currentViewportHeight: number,
  availableScreenHeight = 0
): number {
  return Math.max(
    getAdvertisedFullscreenHeight(height, maxHeight) || 0,
    currentViewportHeight,
    availableScreenHeight,
    MIN_FULLSCREEN_HEIGHT
  );
}

export function resolveVisibleFullscreenHeight(currentHeight: number | undefined, visibleHeight: number): number | undefined {
  if (visibleHeight <= 0) return currentHeight;
  if (currentHeight !== undefined && Math.abs(currentHeight - visibleHeight) < FULLSCREEN_LAYOUT_HYSTERESIS) return currentHeight;
  return visibleHeight;
}

export function shouldSettleFullscreenFrame(currentViewportHeight: number, visibleHeight: number, lastSettledHeight?: number): boolean {
  if (currentViewportHeight - visibleHeight < FULLSCREEN_FRAME_HYSTERESIS) return false;
  return lastSettledHeight === undefined || Math.abs(lastSettledHeight - visibleHeight) >= FULLSCREEN_FRAME_HYSTERESIS;
}