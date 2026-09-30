import * as React from 'react';
import { createRoot, type Root } from 'react-dom/client';
import {
  BaseCopilotComponent,
  createCopilotTextContent
} from '@microsoft/sp-copilot-component';
import { ZavaOneApp } from '../components/ZavaOneApp';
import type { IZavaModelContextSnapshot, ZavaIntentKey } from '../models/zavaOne';
import { takeCopilotSizeControl, type ControlledSizeSender } from '../utils/copilotAutoResize';

export abstract class ZavaOneCopilotComponentBase<TProperties> extends BaseCopilotComponent<TProperties> {
  protected abstract readonly intent: ZavaIntentKey;
  private _root: Root | undefined;
  private _lastRequestedSize: { width: number; height: number } | undefined;
  private _sendControlledSizeAsync: ControlledSizeSender | undefined;

  protected async onInit(): Promise<void> {
    this._sendControlledSizeAsync = takeCopilotSizeControl(this.context.copilotBridge);
  }

  private async _requestCurrentSizeAsync(): Promise<void> {
    if (this.hostContext.displayMode === 'fullscreen') return;
    const root = this.context.domElement;
    const view = root.ownerDocument.defaultView;
    if (!view) return;
    await new Promise<void>((resolve) => view.requestAnimationFrame(() => resolve()));
    const hostDimensions = this.hostContext.containerDimensions;
    const content = root.querySelector<HTMLElement>('[data-layout]');
    const contentRect = content?.getBoundingClientRect();
    const rootRect = root.getBoundingClientRect();
    const width = Math.ceil(hostDimensions?.width || hostDimensions?.maxWidth || root.clientWidth || contentRect?.width || view.innerWidth || 0);
    const height = Math.ceil(Math.max(content?.scrollHeight || 0, contentRect ? contentRect.bottom - rootRect.top : 0) + 2);
    if (width <= 0 || height <= 0) return;
    const matchesLastRequest = !!this._lastRequestedSize
      && Math.abs(this._lastRequestedSize.width - width) <= 1
      && Math.abs(this._lastRequestedSize.height - height) <= 1;
    if (matchesLastRequest) return;
    try {
      if (this._sendControlledSizeAsync) {
        await this._sendControlledSizeAsync(width, height);
      } else if (!await this.requestSizeChangeAsync(width, height)) {
        return;
      }
      this._lastRequestedSize = { width, height };
    } catch {
      return;
    }
  }

  private async _requestFullscreenSizeAsync(height: number): Promise<void> {
    const root = this.context.domElement;
    const view = root.ownerDocument.defaultView;
    if (!view || height <= 0) return;
    await new Promise<void>((resolve) => view.requestAnimationFrame(() => resolve()));
    const hostDimensions = this.hostContext.containerDimensions;
    const width = Math.ceil(hostDimensions?.width || hostDimensions?.maxWidth || root.clientWidth || view.innerWidth || 0);
    if (width <= 0) return;
    if (this._lastRequestedSize
      && Math.abs(this._lastRequestedSize.width - width) <= 1
      && Math.abs(this._lastRequestedSize.height - height) <= 1) return;
    try {
      if (this._sendControlledSizeAsync) {
        await this._sendControlledSizeAsync(width, height);
      } else if (!await this.requestSizeChangeAsync(width, height)) {
        return;
      }
      this._lastRequestedSize = { width, height };
    } catch {
      return;
    }
  }

  protected render(): void {
    if (!this._root) {
      this._root = createRoot(this.context.domElement);
    }

    this._root.render(React.createElement(ZavaOneApp, {
      intent: this.intent,
      surface: 'copilotInline',
      displayMode: this.hostContext.displayMode,
      workspaceMode: 'combined',
      targetDocument: this.context.domElement.ownerDocument,
      theme: this.hostContext.theme === 'dark' ? 'dark' : 'light',
      currentUserName: this.context.pageContext.user.displayName || 'Megan Bowen',
      toolProperties: this.properties as unknown as Readonly<Record<string, unknown>>,
      requestFullscreen: async (): Promise<void> => {
        if ((this.hostContext.availableDisplayModes || []).indexOf('fullscreen') >= 0) {
          const result = await this.requestDisplayModeAsync('fullscreen');
          if (result.mode !== 'fullscreen') return;
        }
      },
      requestResize: async (height?: number): Promise<void> => {
        if (this.hostContext.displayMode === 'fullscreen') {
          if (height !== undefined) await this._requestFullscreenSizeAsync(height);
          return;
        }
        await this._requestCurrentSizeAsync();
      },
      publishContext: async (snapshot: IZavaModelContextSnapshot): Promise<void> => {
        await this.context.copilotBridge.updateModelContextAsync({
          content: [createCopilotTextContent(snapshot.summary)],
          structuredContent: snapshot as unknown as Record<string, unknown>
        });
      },
      sendFollowUp: async (message: string): Promise<void> => {
        const result = await this.context.copilotBridge.sendFollowUpMessageAsync([
          createCopilotTextContent(message)
        ]);
        if (result.isError) {
          throw new Error('Copilot did not accept the follow-up message.');
        }
      }
    }));
  }

  protected async onTeardown(): Promise<void> {
    this._root?.unmount();
    this._root = undefined;
    this._lastRequestedSize = undefined;
    this._sendControlledSizeAsync = undefined;
  }
}