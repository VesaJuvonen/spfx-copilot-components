import { z } from 'zod';
import { normalizeCountry } from '../userCountry/userCountry';
import type { CountryPreferenceContext, ICountryPreferenceResult } from './countryPreference.types';

const PREFERENCE_FILE = 'holiday-planner-preferences.json';
const preferenceSchema = z.object({ version: z.literal(1), country: z.string().trim().min(1).max(100) });

export async function loadCountryPreference(context: CountryPreferenceContext): Promise<ICountryPreferenceResult> {
  try {
    const client = await context.msGraphClientFactory.getClient('3');
    const item: { '@microsoft.graph.downloadUrl'?: string } = await client.api(`/me/drive/special/approot:/${PREFERENCE_FILE}`).version('v1.0').get();
    const downloadUrl = item['@microsoft.graph.downloadUrl'];
    if (!downloadUrl || new URL(downloadUrl).protocol !== 'https:') throw new Error('Preference content is unavailable.');
    const response = await fetch(downloadUrl, { credentials: 'omit', cache: 'no-store' });
    if (!response.ok) throw new Error('Preference download failed.');
    const preference = preferenceSchema.parse(await response.json());
    return { country: normalizeCountry(preference.country), unavailable: false };
  } catch (error) {
    const status = (error as { statusCode?: number; status?: number } | undefined)?.statusCode || (error as { status?: number } | undefined)?.status;
    return { unavailable: status !== 404 };
  }
}

export async function saveCountryPreference(context: CountryPreferenceContext, country: string): Promise<void> {
  const preference = preferenceSchema.parse({ version: 1, country: normalizeCountry(country) });
  const client = await context.msGraphClientFactory.getClient('3');
  const folder: { id?: string } = await client.api('/me/drive/special/approot').version('v1.0').get();
  if (!folder.id) throw new Error('OneDrive app folder is unavailable.');
  await client.api(`/me/drive/items/${encodeURIComponent(folder.id)}:/${PREFERENCE_FILE}:/content`)
    .version('v1.0').header('Content-Type', 'application/json').put(JSON.stringify(preference));
}