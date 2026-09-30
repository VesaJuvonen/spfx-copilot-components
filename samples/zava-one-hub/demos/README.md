# Zava One demos

These scripts demonstrate the fixture-first sample without implying live business writes or production
readiness. Use the same checked-in package, prompts, routes, and reset procedure for every rehearsal.

## Demo set

| Script | Duration | Purpose |
| --- | --- | --- |
| [90-second keynote](./keynote-90-seconds.md) | 60-90 seconds | Company update, manager decision, map, and breadth |
| [Business journey](./business-journey.md) | 8-12 minutes | Company, Personal, forms, charts, and cross-surface state |
| [Technical walkthrough](./technical-walkthrough.md) | 10-15 minutes | Architecture, host isolation, routing, state, and evidence |
| [Demo operations](./demo-operations.md) | Reference | Preflight, reset, offline fallback, and recovery |

## Required preflight

1. Follow [Demo operations](./demo-operations.md).
2. Confirm `npm run build` passes before starting a watch server.
3. Reset the C35 vacation queue and any session personalization.
4. Keep the visible **Demo data / No business submission** labels in frame.
5. Use the exact prompts in the scripts so routing remains deterministic.

The current publication screenshots and their state coverage are recorded in
[`assets/publication-screenshots.md`](../assets/publication-screenshots.md).