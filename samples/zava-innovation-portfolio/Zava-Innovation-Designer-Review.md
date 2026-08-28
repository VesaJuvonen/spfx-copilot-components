# Zava Innovation Hub - designer review guide

Review the implemented React experience, not the four historical design references. The current evidence index is `assets/visual-evidence.json`.

## Review goals

1. Does each inline component communicate its business job before interaction?
2. Does the hierarchy remain clear at 760 px and 390 px?
3. Does full screen feel like one premium product across five role-based work areas?
4. Does Enterprise Insights deliver a keynote-level portfolio overview without becoming an equal-card grid?
5. Do consequential actions clearly separate evidence, decision, confirmation, and receipt?
6. Does recognition reward verified impact rather than popularity?

## Primary screens

| Experience | Evidence |
| --- | --- |
| Enterprise Insights keynote | `assets/ux-fullscreen-enterprise.png` |
| Enterprise recognition applied | `assets/ux-fullscreen-enterprise-recognition.png` |
| My Innovation | `assets/ux-fullscreen-my.png` |
| Programs & Pilots | `assets/ux-fullscreen-programs.png` |
| Reviews & Gates | `assets/ux-fullscreen-reviews.png` |
| Investment | `assets/ux-fullscreen-investment.png` |
| Incoming review queue | `assets/ux-inline-review-queue.png` |
| Review detail | `assets/ux-inline-review-detail.png` |
| Send-back confirmation | `assets/ux-inline-review-send-back-confirm.png` |
| Decline receipt | `assets/ux-inline-review-decline-receipt.png` |
| Recognition composer | `assets/ux-inline-CelebrateInnovationImpact.png` |

Every catalog intent also has `assets/ux-inline-<IntentName>.png`.

## Visual language

- Deep grape anchors governance and navigation.
- Marigold signals creative energy, selection, and stage progression.
- Semantic green, amber, and red are reserved for outcomes and risk.
- Operational surfaces use 4-8 px radii and restrained elevation.
- Analytical regions remain unframed or singly bounded; there are no nested card stacks.
- Named people appear where ownership, review, funding, experiments, or recognition matter.

## Interaction review

- Use Up/Down arrow keys in the full-screen icon tabs.
- Toggle Compact and confirm density changes without losing context.
- In Program growth, switch submissions, conversion, and value.
- In Reviews & Gates, select each phase and status bucket.
- Complete Approve, Send back, and Decline; Send back/Decline must require rationale.
- In Enterprise Insights, acknowledge one top-performing idea and verify the recognition banner.
- Use Reset demo data before another review session.

## Accessibility states

Local evidence covers narrow/standard/keynote, representative dark, reduced motion, forced colors, keyboard focus, and 200% page scale. Confirm in design review:

- Focus remains visible against grape, marigold, and neutral surfaces.
- No meaning depends only on color.
- Chart labels remain useful without hover.
- Reduced motion reveals final states immediately.
- Forced colors preserve selected navigation and decision boundaries.

Authenticated Copilot Workbench testing remains a separate gate for iframe focus, host display mode, CSP, screen-reader output, and model routing.

## Feedback format

Record findings with: screenshot, viewport, theme, intent/lens, expected hierarchy, observed issue, severity, and proposed change. Distinguish product-scope requests from polish defects so the approved 16+1 scenario catalog does not drift accidentally.
