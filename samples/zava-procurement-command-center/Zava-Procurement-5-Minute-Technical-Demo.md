# Zava Procurement Command Center - 5-minute technical demo

## 0:00-1:00 - Catalog-owned routing

Open `src/shared/catalog.ts` and `Zava-Procurement-Routing-Matrix.md`. Show 22 immutable tool identities,
operation class, role, route, prompt, and exclusion. Explain that every scaffold came from the pinned
SharePoint Yeoman generator and all entries share one measured SPFx bundle.

## 1:00-2:00 - Host and theme boundary

Open `ProcurementCopilotComponentBase.tsx` and `ProcurementThemeProvider.tsx`. Show the persistent React
18 root, owner-document Griffel renderer, host display mode, explicit model context, and no runtime data
fetch. Passive host rerenders do not create a new root.

## 2:00-3:10 - Deterministic domain and D3

Open `domain.ts`, `geometry.ts`, and `ProcurementCharts.tsx`. Show the 220/14/600/90/18 graph scale,
frozen hero records, weighted scoring, split-award calculation, D3 scales/shapes, keyboard-selectable
marks, chart descriptions, and exact table equivalents.

## 3:10-4:10 - Visual evidence

Run `npm run capture:visual` and `npm run check:gallery`. Explain that 28 captures cover all 22 inline
tools, four workspace defaults, mobile, and dark mode. Evidence records hashes, layout identities,
runtime errors, overflow, labels, focus, and chart presence.

## 4:10-5:00 - Shipped artifact

Run `npm run build`. Show generated API plugin validation and `.sppkg` audit: 22 unique functions, one
shared JavaScript asset, one current agent ZIP, package hash, and current capture count. Close with the
mock/live service boundary and authenticated tenant checks that remain external.