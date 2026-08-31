import RevenueCopilotComponentBase from '../../shared/RevenueCopilotComponentBase';
import type { IRevenueProperties, RevenueIntentKey } from '../../shared/catalog';

export default class QualifyOpportunityCopilotComponent extends RevenueCopilotComponentBase<IRevenueProperties> {
  protected intentKey: RevenueIntentKey = 'QualifyOpportunity';
}
