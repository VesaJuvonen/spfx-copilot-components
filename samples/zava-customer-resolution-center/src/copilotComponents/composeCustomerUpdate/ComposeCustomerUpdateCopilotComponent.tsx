import ServiceCopilotComponentBase from '../../shared/ServiceCopilotComponentBase';
import type { IServiceProperties, ServiceIntentKey } from '../../shared/catalog';

export default class ComposeCustomerUpdateCopilotComponent extends ServiceCopilotComponentBase<IServiceProperties> {
  protected intentKey: ServiceIntentKey = 'ComposeCustomerUpdate';
}
