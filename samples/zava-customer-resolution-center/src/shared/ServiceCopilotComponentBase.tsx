import * as React from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { BaseCopilotComponent, createCopilotTextContent } from '@microsoft/sp-copilot-component';
import ServiceApp, { type IServiceModelContext } from './ServiceApp';
import ServiceThemeProvider from './ServiceThemeProvider';
import { getIntent, type IServiceProperties, type ServiceIntentKey } from './catalog';

abstract class ServiceCopilotComponentBase<TProperties extends IServiceProperties> extends BaseCopilotComponent<TProperties> {
  protected abstract intentKey: ServiceIntentKey;
  private _root: Root | undefined;

  protected render(): void {
    const definition = getIntent(this.intentKey);
    const availableModes = this.hostContext.availableDisplayModes || [];
    const canExpand = this.hostContext.displayMode !== 'fullscreen' && availableModes.indexOf('fullscreen') >= 0;
    const currentUserName = this.context.pageContext.user.displayName || definition.role;
    const element = <ServiceThemeProvider theme={this.hostContext.theme} targetDocument={this.context.domElement.ownerDocument}>
      <ServiceApp definition={definition} properties={this.properties} currentUserName={currentUserName}
        displayMode={this.hostContext.displayMode} onRequestFullscreen={canExpand ? this._requestFullscreen : undefined}
        onUpdateModelContext={this._updateModelContext} onSendFollowUp={this._sendFollowUp}/>
    </ServiceThemeProvider>;
    if (!this._root) this._root = createRoot(this.context.domElement);
    this._root.render(element);
  }
  protected async onTeardown(reason?: string): Promise<void> { this._root?.unmount(); this._root=undefined; await super.onTeardown(reason); }
  private _requestFullscreen = async (): Promise<void> => { await this.requestDisplayModeAsync('fullscreen'); };
  private _updateModelContext = async (snapshot: IServiceModelContext): Promise<void> => {
    await this.context.copilotBridge.updateModelContextAsync({ content:[createCopilotTextContent(snapshot.summary)], structuredContent:snapshot });
  };
  private _sendFollowUp = async (message: string): Promise<boolean> => {
    const result = await this.context.copilotBridge.sendFollowUpMessageAsync([createCopilotTextContent(message)]);
    return !result.isError;
  };
}
export default ServiceCopilotComponentBase;
