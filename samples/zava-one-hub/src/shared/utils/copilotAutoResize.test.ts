import { disableCopilotAutoResize } from './copilotAutoResize';

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
});