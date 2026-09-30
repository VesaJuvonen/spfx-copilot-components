import type { IHolidayHttpClient } from './holidayPlannerSite.types';

export const HOLIDAY_PLANNER_SITE_PROPERTY = 'HolidayPlannerSite';
export type { IHolidayHttpClient, IHolidayHttpResponse } from './holidayPlannerSite.types';

const resolvedSites = new Map<string, Promise<string>>();

export function resolveHolidayPlannerSite(
  http: IHolidayHttpClient,
  currentSiteUrl: string
): Promise<string> {
  let origin: string;
  try {
    origin = new URL(currentSiteUrl).origin;
  } catch {
    return Promise.resolve(currentSiteUrl);
  }

  const existing = resolvedSites.get(origin);
  if (existing) {
    return existing;
  }

  const resolution = (async (): Promise<string> => {
    try {
      const response = await http.get(
        `${origin}/_api/web/GetStorageEntity('${HOLIDAY_PLANNER_SITE_PROPERTY}')`,
        { Accept: 'application/json;odata=nometadata' }
      );
      if (response.ok) {
        const body = await response.json();
        const value = body.Value;
        if (typeof value === 'string' && value.trim()) {
          const siteUrl = new URL(value.trim(), origin);
          if (siteUrl.origin === origin) {
            return siteUrl.href.replace(/\/$/, '');
          }
        }
      }
    } catch (error) {
      console.warn('[Holiday Planner] Could not read the tenant site property.', error);
    }
    return currentSiteUrl.replace(/\/$/, '');
  })();

  resolvedSites.set(origin, resolution);
  return resolution;
}