import { disableCopilotAutoResize, takeCopilotSizeControl } from './copilotAutoResize';

describe('Copilot bridge auto-resize control', () => {
  test('disconnects deferred auto-resize and prevents it from being reinstalled', () => {
    const teardown = jest.fn();
    const setup = jest.fn(() => teardown);
    const bridge = { _setupAutoResize: setup };

    expect(disableCopilotAutoResize(bridge)).toBe(true);
    expect(setup).toHaveBeenCalledTimes(1);
    expect(teardown).toHaveBeenCalledTimes(1);

    expect(bridge._setupAutoResize()).toBeUndefined();
    expect(setup).toHaveBeenCalledTimes(1);
  });

  test('does nothing when the bridge does not expose deferred auto-resize', () => {
    expect(disableCopilotAutoResize({})).toBe(false);
  });

  test('suppresses observer messages while preserving a controlled sender', async () => {
    const sendSizeChangedAsync = jest.fn(async (_size: { width: number; height: number }) => undefined);
    const internal = { sendSizeChangedAsync };
    const controlledSender = takeCopilotSizeControl({ _internal: internal });

    await internal.sendSizeChangedAsync({ width: 800, height: 600 });
    expect(sendSizeChangedAsync).not.toHaveBeenCalled();

    await controlledSender?.(720, 450);
    expect(sendSizeChangedAsync).toHaveBeenCalledWith({ width: 720, height: 450 });
  });
});