import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BaseCopilotComponent } from '@microsoft/sp-copilot-component';
import InnovationApp from './PremiumInnovationApp';
import InnovationThemeProvider from './InnovationThemeProvider';
import { getIntent, type IInnovationProperties, type InnovationIntentKey } from './catalog';

abstract class InnovationCopilotComponentBase<TProperties extends IInnovationProperties> extends BaseCopilotComponent<TProperties> {
  protected abstract intentKey:InnovationIntentKey;
  protected render():void {
    const definition=getIntent(this.intentKey);
    const canExpand=this.hostContext.displayMode!=='fullscreen'&&(this.hostContext.availableDisplayModes||[]).indexOf('fullscreen')>=0;
    ReactDOM.render(React.createElement(InnovationThemeProvider,{theme:this.hostContext.theme,targetDocument:this.context.domElement.ownerDocument},
      React.createElement(InnovationApp,{definition,properties:this.properties,currentUserName:this.context.pageContext.user.displayName||definition.role,displayMode:this.hostContext.displayMode,onRequestFullscreen:canExpand?this._expand:undefined})),this.context.domElement);
  }
  protected onTeardown(reason:string|undefined):Promise<void>{ReactDOM.unmountComponentAtNode(this.context.domElement);return super.onTeardown(reason);}
  private _expand=():void=>{this.requestDisplayModeAsync('fullscreen').catch(()=>undefined);};
}
export default InnovationCopilotComponentBase;