interface IAutoResizeBridge {
  _setupAutoResize?: () => (() => void) | undefined;
}

export function disableCopilotAutoResize(bridge: unknown): boolean {
  const controlledBridge = bridge as IAutoResizeBridge;
  if (typeof controlledBridge._setupAutoResize !== 'function') return false;

  controlledBridge._setupAutoResize()?.();
  controlledBridge._setupAutoResize = () => undefined;
  return true;
}