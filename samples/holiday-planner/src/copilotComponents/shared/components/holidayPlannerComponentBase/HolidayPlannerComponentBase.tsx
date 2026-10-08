import * as React from 'react';
import { createRoot, type Root } from 'react-dom/client';
import {
  BaseCopilotComponent,
  type ICopilotComponentHostContext
} from '@microsoft/sp-copilot-component';

import { createHolidayDataService } from '../../data/holidayDataService/holidayDataService';
import { PlannerShell } from '../plannerShell/PlannerShell';
import type { IHolidaySurfaceProps } from './HolidayPlannerComponentBase.types';
import type { IHolidayDataService } from '../../data/holidayDataService/holidayDataService.types';

export type { IHolidaySurfaceProps } from './HolidayPlannerComponentBase.types';

export abstract class HolidayPlannerComponentBase<TProperties> extends BaseCopilotComponent<TProperties> {
  private _dataService!: IHolidayDataService;
  private _root?: Root;
  private _propertiesVersion: number = 0;

  protected async onInit(): Promise<void> {
    this._dataService = await createHolidayDataService(this.context);
  }

  protected render(): void {
    if (!this.context?.domElement || !this._dataService) {
      return;
    }
    this._propertiesVersion += 1;
    const targetDocument = this.context.domElement.ownerDocument || undefined;
    const surface = this.renderSurface({
      dataService: this._dataService,
      hostContext: this.hostContext,
      properties: this.properties as TProperties,
      propertiesVersion: this._propertiesVersion,
      targetDocument,
      onExpand: async () => {
        await this.requestDisplayModeAsync('fullscreen');
      }
    });

    if (!this._root) {
      this._root = createRoot(this.context.domElement);
    }

    this._root.render(
      <PlannerShell hostContext={this.hostContext} targetDocument={targetDocument}>
        {surface}
      </PlannerShell>
    );
  }

  protected abstract renderSurface(props: IHolidaySurfaceProps<TProperties>): React.ReactElement;

  protected onHostContextChanged(_diff: Partial<ICopilotComponentHostContext>): void {
    // The base class re-renders when the host theme or display mode changes.
  }

  protected onDispose(): void {
    this._root?.unmount();
    this._root = undefined;
  }
}