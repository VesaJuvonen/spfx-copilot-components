import RevenueCopilotComponentBase from '../../shared/RevenueCopilotComponentBase';
import type { IRevenueProperties, RevenueIntentKey } from '../../shared/catalog';

export default class InspectForecastCommitCopilotComponent extends RevenueCopilotComponentBase<IRevenueProperties> {
  protected intentKey: RevenueIntentKey = 'InspectForecastCommit';
}
