import {
  createDefaultPersonalPortalLayout,
  movePersonalPortalPanel,
  normalizePersonalPortalLayout
} from './personalPortalLayout';

const panels = ['agenda', 'mail', 'tasks', 'approvals', 'learning', 'expenses'];

describe('Personal portal layout', () => {
  test('distributes panels across three stable columns', () => {
    expect(createDefaultPersonalPortalLayout(panels)).toEqual({
      'personal-column-1': ['agenda', 'approvals'],
      'personal-column-2': ['mail', 'learning'],
      'personal-column-3': ['tasks', 'expenses']
    });
  });

  test('moves a panel across columns', () => {
    const layout = createDefaultPersonalPortalLayout(panels);
    expect(movePersonalPortalPanel(layout, 'approvals', 'mail')).toEqual({
      'personal-column-1': ['agenda'],
      'personal-column-2': ['approvals', 'mail', 'learning'],
      'personal-column-3': ['tasks', 'expenses']
    });
  });

  test('reorders a panel within one column', () => {
    const layout = createDefaultPersonalPortalLayout(panels);
    expect(movePersonalPortalPanel(layout, 'approvals', 'agenda')['personal-column-1']).toEqual(['approvals', 'agenda']);
  });

  test('repairs invalid persisted layouts and appends new panels', () => {
    expect(normalizePersonalPortalLayout({
      'personal-column-1': ['mail', 'unknown', 'mail'],
      'personal-column-2': ['agenda'],
      'personal-column-3': 'invalid'
    }, panels)).toEqual({
      'personal-column-1': ['mail', 'tasks', 'expenses'],
      'personal-column-2': ['agenda', 'approvals'],
      'personal-column-3': ['learning']
    });
  });
});