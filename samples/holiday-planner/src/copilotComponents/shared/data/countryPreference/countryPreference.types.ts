import type { CopilotComponentContext } from '@microsoft/sp-copilot-component';

export type CountryPreferenceContext = Pick<CopilotComponentContext, 'msGraphClientFactory'>;

export interface ICountryPreferenceResult {
  country?: string;
  unavailable: boolean;
}