import ServiceCopilotComponentBase from '../../shared/ServiceCopilotComponentBase';
import type { IServiceProperties, ServiceIntentKey } from '../../shared/catalog';

export default class DetectServiceIncidentCopilotComponent extends ServiceCopilotComponentBase<IServiceProperties> {
  protected intentKey: ServiceIntentKey = 'DetectServiceIncident';
}
