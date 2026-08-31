# Zava Revenue Deal Room - 5-minute technical demo

## 0:00-0:40 - Immutable component catalog

Show `src/shared/catalog.ts`, `scripts/configure-intent-components.mjs`, and `scripts/validate-intent-components.mjs`.

Explain 21 final Yeoman-generated component identities, unique GUIDs, one bounded business scenario per tool, positive/negative routing boundaries, one shared bundle, and optional prompt properties that scope or prefill but never confirm an action.

## 0:40-1:20 - React 18 host and Copilot bridge

Show `src/shared/RevenueCopilotComponentBase.tsx` and `src/shared/RevenueThemeProvider.tsx`.

Explain one persistent React 18 root per entrypoint, teardown, Griffel targeting `ownerDocument`, host-authoritative `requestDisplayModeAsync('fullscreen')`, bounded model-context snapshots, and explicit user-triggered follow-ups.

Call out the remaining test work honestly: complete fresh-signature/transient continuation and fake-bridge lifecycle matrices remain open in `todo.md`.

## 1:20-2:20 - D3 visualization-first UX

Show `src/shared/visualizations/revenueGeometry.ts`, `RevenueCharts.tsx`, and `RevenueApp.tsx`.

Highlight:

- D3 scales, monotone line/area geometry, and selected scenario coordinates for the commercial contour
- D3 band/linear scales for the evidence-weighted pipeline
- D3 signed forecast-waterfall geometry
- D3 Natural Earth projection and TopoJSON paths for the offline regional opportunity map
- React-owned SVG marks, state, keyboard actions, accessible names, exact labels, and adjacent tables
- Coordinated full-screen analytical regions across My Deals, Deal Room, Commercial Desk, and Revenue Command

Run the six geometry/domain tests and show that changed inputs produce different paths and coordinates.

## 2:20-3:05 - Deterministic domain and people

Show `src/shared/domain.ts`, `src/shared/media.ts`, `assets/asset-provenance.json`, and `scripts/validate-persona-media.mjs`.

Report 80 accounts, 260 contacts, 120 opportunities, the connected `ZDR-2042` evidence graph, seven package-hosted persona portraits, source/runtime SHA-256 parity, initials fallback, and the explicit pending public media-rights review.

## 3:05-3:45 - Reproducible publication evidence

Show `scripts/visual-harness`, `scripts/capture-gallery-assets.mjs`, `assets/gallery-evidence.json`, `assets/sample.json`, and `Zava-Revenue-Deal-Room-Routing-Matrix.md`.

Report 13 current captures with zero runtime errors, broken images, or horizontal overflow. Show the projected map, pipeline, commercial contour, forecast bridge, mobile Deal Room, dark theme, and full-screen analytical dashboards.

## 3:45-4:35 - Production package gates

Run `npm run build` and explain the ordered gates: catalog, routing matrix, persona provenance, gallery evidence, clean production tests, package generation, generated plugin validation, final package audit, and release-evidence freshness.

Show `assets/release-evidence.json` and the committed `.sppkg`.

## 4:35-5:00 - Production boundary

Close with the service boundary: the sample is offline and deterministic. Live CRM, Graph, CPQ, pricing policy, workflow, and e-signature integrations are deferred. Tenant Workbench validation remains required for actual model routing, CSP, iframe focus, forced colors, and screen-reader host behavior.

## Presenter checklist

- Run `npm run build` before presenting and verify release evidence is current.
- Do not claim all 20 operational bodies have complete purpose-specific lifecycle depth.
- Do not claim authenticated host checks from the tenant-free harness.
- Keep map, pipeline, forecast, commercial, mobile, and dark screenshots open as the fallback path.
