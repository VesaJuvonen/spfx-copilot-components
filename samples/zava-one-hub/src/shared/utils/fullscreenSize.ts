export const MIN_FULLSCREEN_HEIGHT = 720;

export function getAdvertisedFullscreenHeight(height?: number, maxHeight?: number): number | undefined {
  if (maxHeight && maxHeight >= MIN_FULLSCREEN_HEIGHT) return maxHeight;
  if (height && height >= MIN_FULLSCREEN_HEIGHT) return height;
  return undefined;
}

export function resolveFullscreenRequestHeight(height: number | undefined, maxHeight: number | undefined, currentViewportHeight: number): number {
  return getAdvertisedFullscreenHeight(height, maxHeight)
    || (currentViewportHeight >= MIN_FULLSCREEN_HEIGHT ? currentViewportHeight : MIN_FULLSCREEN_HEIGHT);
}