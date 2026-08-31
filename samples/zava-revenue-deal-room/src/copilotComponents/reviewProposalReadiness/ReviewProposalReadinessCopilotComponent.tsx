import RevenueCopilotComponentBase from '../../shared/RevenueCopilotComponentBase';
import type { IRevenueProperties, RevenueIntentKey } from '../../shared/catalog';

export default class ReviewProposalReadinessCopilotComponent extends RevenueCopilotComponentBase<IRevenueProperties> {
  protected intentKey: RevenueIntentKey = 'ReviewProposalReadiness';
}
