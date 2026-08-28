import InnovationCopilotComponentBase from '../../shared/InnovationCopilotComponentBase';
import type { IInnovationProperties, InnovationIntentKey } from '../../shared/catalog';

export default class TrackInnovationValueCopilotComponent extends InnovationCopilotComponentBase<IInnovationProperties> {
  protected intentKey: InnovationIntentKey = 'TrackInnovationValue';
}
