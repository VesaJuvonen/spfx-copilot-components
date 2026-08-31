import RevenueCopilotComponentBase from '../../shared/RevenueCopilotComponentBase';
import type { IRevenueProperties, RevenueIntentKey } from '../../shared/catalog';

export default class ReviewDealExceptionCopilotComponent extends RevenueCopilotComponentBase<IRevenueProperties> {
  protected intentKey: RevenueIntentKey = 'ReviewDealException';
}
