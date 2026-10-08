import { SPHttpClient } from '@microsoft/sp-http';
import type { CopilotComponentContext } from '@microsoft/sp-copilot-component';

import { resolveHolidayPlannerSite } from '../holidayPlannerSite/holidayPlannerSite';
import { getUserCountry, normalizeCountry } from '../userCountry/userCountry';
import { loadCountryPreference, saveCountryPreference } from '../countryPreference/countryPreference';
import type { IHolidayHttpClient } from '../holidayPlannerSite/holidayPlannerSite.types';
import { makeDemoHolidayDataService, mapHolidayRow, parseHolidayRows, readHolidayJson } from './holidayDataService.utils';
import type { IHolidayDataService } from './holidayDataService.types';
import type { IHolidayData } from '../../domain/holidayTypes';

export type { IHolidayDataService } from './holidayDataService.types';

export async function createHolidayDataService(
  context: CopilotComponentContext
): Promise<IHolidayDataService> {
  const [service, preference] = await Promise.all([loadHolidayData(context), loadCountryPreference(context)]);
  const defaultCountry = preference.country || await getUserCountry(context);
  const data: IHolidayData = { ...service.getData(), defaultCountry, savedCountry: preference.country, countryPreferenceUnavailable: preference.unavailable };
  return {
    getData: () => data,
    saveDefaultCountry: async (country) => {
      await saveCountryPreference(context, country);
      data.savedCountry = normalizeCountry(country);
      data.defaultCountry = data.savedCountry;
      data.countryPreferenceUnavailable = false;
    }
  };
}

async function loadHolidayData(context: CopilotComponentContext): Promise<IHolidayDataService> {
  try {
    const spHttpClient = context.spHttpClient;
    const http: IHolidayHttpClient = {
      get: (url, headers) =>
        spHttpClient.get(url, SPHttpClient.configurations.v1, { headers })
    };
    const currentSite = context.pageContext.web.absoluteUrl;
    const siteUrl = await resolveHolidayPlannerSite(http, currentSite);
    const listBase = `${siteUrl}/_api/web/lists/getbytitle`;
    const holidayBody = await http.get(
      `${listBase}('OrganizationHolidays')/items?$select=Id,Title,HolidayDate,Country,Region,IsOptional,Description&$top=5000`,
      { Accept: 'application/json;odata=nometadata' }
    ).then(readHolidayJson);

    const data: IHolidayData = {
      holidays: parseHolidayRows(holidayBody).map(mapHolidayRow),
      isDemo: false
    };
    return { getData: () => data };
  } catch (error) {
    console.warn('[Holiday Planner] SharePoint data unavailable; using demo holidays.', error);
    return makeDemoHolidayDataService(error instanceof Error ? error.message : 'SharePoint data unavailable.');
  }
}