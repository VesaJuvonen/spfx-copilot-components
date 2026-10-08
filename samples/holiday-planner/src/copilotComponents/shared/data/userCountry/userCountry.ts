import type { CopilotComponentContext } from '@microsoft/sp-copilot-component';

const TIME_ZONE_COUNTRIES: Record<string, string> = {
  'Asia/Kolkata': 'IN', 'Asia/Calcutta': 'IN', 'Europe/London': 'GB',
  'America/New_York': 'US', 'America/Chicago': 'US', 'America/Denver': 'US',
  'America/Los_Angeles': 'US', 'America/Phoenix': 'US', 'America/Anchorage': 'US', 'Pacific/Honolulu': 'US',
  'America/Toronto': 'CA', 'America/Vancouver': 'CA', 'Europe/Paris': 'FR', 'Europe/Berlin': 'DE',
  'Europe/Dublin': 'IE', 'Europe/Madrid': 'ES', 'Europe/Rome': 'IT', 'Europe/Amsterdam': 'NL',
  'Asia/Tokyo': 'JP', 'Asia/Shanghai': 'CN', 'Asia/Singapore': 'SG', 'Asia/Dubai': 'AE',
  'Australia/Sydney': 'AU', 'Australia/Melbourne': 'AU', 'Australia/Perth': 'AU', 'Pacific/Auckland': 'NZ'
};

export function normalizeCountry(value: string): string {
  const country = value.trim();
  const aliases: Record<string, string> = {
    uk: 'GB', gb: 'GB', usa: 'US', us: 'US', ind: 'IN',
    'united states of america': 'US', 'great britain': 'GB'
  };
  const code = aliases[country.toLowerCase()] || (/^[a-z]{2}$/i.test(country) ? country.toUpperCase() : undefined);
  if (!code) return country;
  const displayNames = (Intl as typeof Intl & {
    DisplayNames?: new (locales: string[], options: { type: 'region' }) => { of(region: string): string | undefined };
  }).DisplayNames;
  return displayNames ? new displayNames(['en'], { type: 'region' }).of(code) || country
    : ({ IN: 'India', GB: 'United Kingdom', US: 'United States' } as Record<string, string>)[code] || country;
}

export function resolveCountry(profileCountry?: string, languages: readonly string[] = [], timeZone?: string): string {
  if (profileCountry?.trim()) return normalizeCountry(profileCountry);
  const Locale = (Intl as typeof Intl & { Locale?: new (language: string) => { region?: string } }).Locale;
  for (const language of languages) {
    try {
      const region = Locale ? new Locale(language).region : undefined;
      if (region && /^[a-z]{2}$/i.test(region)) return normalizeCountry(region);
    } catch {
      continue;
    }
  }
  return timeZone && TIME_ZONE_COUNTRIES[timeZone] ? normalizeCountry(TIME_ZONE_COUNTRIES[timeZone]) : 'Global';
}

export async function getUserCountry(context: Pick<CopilotComponentContext, 'msGraphClientFactory'>): Promise<string> {
  let profileCountry: string | undefined;
  try {
    const client = await context.msGraphClientFactory.getClient('3');
    const profile: { country?: unknown } = await client.api('/me').version('v1.0').select('country').get();
    if (typeof profile.country === 'string') profileCountry = profile.country;
  } catch {
    profileCountry = undefined;
  }
  const languages = typeof navigator === 'undefined' ? [] : Array.from(navigator.languages || [navigator.language]);
  let timeZone: string | undefined;
  try {
    timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch {
    timeZone = undefined;
  }
  return resolveCountry(profileCountry, languages, timeZone);
}