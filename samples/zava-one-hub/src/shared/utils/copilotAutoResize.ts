interface IAutoResizeBridge {
  _setupAutoResize?: () => (() => void) | undefined;
  _internal?: {
    sendSizeChangedAsync: (size: { width: number; height: number }) => Promise<void>;
  };
}

export type ControlledSizeSender = (width: number, height: number) => Promise<void>;

export function disableCopilotAutoResize(bridge: unknown): boolean {
  const controlledBridge = bridge as IAutoResizeBridge;
  if (typeof controlledBridge._setupAutoResize !== 'function') return false;

  controlledBridge._setupAutoResize()?.();
  controlledBridge._setupAutoResize = () => undefined;
  return true;
}

export function takeCopilotSizeControl(bridge: unknown): ControlledSizeSender | undefined {
  const controlledBridge = bridge as IAutoResizeBridge;
  const internalBridge = controlledBridge._internal;
  if (!internalBridge || typeof internalBridge.sendSizeChangedAsync !== 'function') return undefined;

  const sendSizeChangedAsync = internalBridge.sendSizeChangedAsync.bind(internalBridge);
  internalBridge.sendSizeChangedAsync = async () => undefined;
  disableCopilotAutoResize(controlledBridge);

  return async (width: number, height: number) => sendSizeChangedAsync({ width, height });
}