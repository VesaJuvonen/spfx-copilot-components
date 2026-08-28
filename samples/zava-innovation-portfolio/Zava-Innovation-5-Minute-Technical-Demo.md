# Zava Innovation Hub - 5-minute technical demo

## 0:00-0:45 - Immutable component catalog

Show `src/shared/catalog.ts`, `scripts/configure-intents.mjs`, and `scripts/validate-intents.mjs`. Explain 17 Yeoman-generated identities, unique GUIDs, one business scenario per tool, positive/negative routing boundaries, and one shared SPFx bundle.

## 0:45-1:30 - Shared host and theming

Show `InnovationCopilotComponentBase.tsx` and `InnovationThemeProvider.tsx`. Explain React 17, Fluent UI v9, Griffel targeting `ownerDocument`, host-authoritative full-screen mode, and component teardown.

## 1:30-2:20 - Purpose-built React UX

Show `PremiumInnovationApp.tsx` and its CSS Module. Highlight 17 intent-specific layouts, the five-lens icon-tab shell, responsive icon rail, React SVG analytical graphics, reduced-motion guards, forced-color treatment, and exact-value labels.

## 2:20-3:10 - Deterministic decisions

Show `ReviewDecisionCenter.tsx`. Walk through queue -> detail -> Approve/Send back/Decline -> confirmation -> receipt -> updated queue. Explain rationale safeguards and why model inference cannot commit the decision.

## 3:10-3:45 - Mock graph and session actions

Show `domain.ts`, `media.ts`, and `sessionStore.ts`. Explain deterministic 120-idea data, packaged portraits, guarded session storage, immutable baseline, acknowledgement receipts, and Reset demo data.

## 3:45-4:25 - Visual evidence

Show `scripts/visual-harness`, `assets/visual-evidence.json`, and `Zava-Innovation-Designer-Review.md`. Report all inline defaults, five full-screen lenses, review variants, recognition state, dark/reduced-motion/forced-colors/200%-scale evidence, and zero-overflow/runtime checks.

## 4:25-5:00 - Build and production boundary

Run `npm run build`. Explain catalog, icon, and provenance checks; clean TypeScript/lint/Jest; agent ZIP generation; SPFx packaging; and deferred tenant Workbench validation for model routing, CSP, iframe focus, and screen-reader behavior.
