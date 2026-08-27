# Zava Innovation Hub - implementation plan

This is the build source of truth for the product scope in [README.md](README.md). Engineering, UX,
validation, packaging, and safety requirements come from
[agentic-creation-rules.md](agentic-creation-rules.md). Do not begin implementation until Phase 0 and
the open decisions are approved.

**Status legend:** `- [ ]` open | `- [x]` validated | add **IN PROGRESS** or **BLOCKED: reason** to an
open item when appropriate.

> **Progress (latest):** In development - planning only as of 2026-08-27. The README now targets 16
> operational inline components, one capability explorer, five shared full-screen lenses, and one
> isolated education gallery. No scaffold, dependency, source, mock-data, configuration, or package
> implementation work from this plan has started. Product-owner approval of final names, routing
> boundaries, navigation, visual direction, identity, and placeholder cleanup is the next gate.

## Approach and sequencing

1. Freeze the brief, immutable names, routing ownership, visual grammar, full-screen topology, package
   identity, and demo narrative.
2. Establish catalog automation, supported scaffolds, dependencies, shared host boundaries, and a green
   baseline before route scale-out.
3. Build one coherent deterministic data graph and prove calculations, relationships, workflows, and
   session-only actions independently of React.
4. Prove one complete information, review, and submit inline slice before implementing siblings.
5. Build the shared full-screen shell and exact continuation adapters before scaling five lenses.
6. Add signature polish and evidence while preserving accessibility, responsiveness, and bundle discipline.
7. Package and publish only from executable local and tenant evidence.

## Phase 0 - Scope and brief approval

### Product and catalog

- [ ] Approve **Zava Innovation Hub** as the product/agent name and approve its short description.
- [ ] Approve 17 independently routed tools: 16 operational components plus
  `ExploreAgentCapabilities`.
- [ ] Approve the operation mix: eight information/analysis, three review/decision, five submit/create,
  and one education/discovery component.
- [ ] Approve folding duplicate detection, scoring summary, lifecycle progress, voting, ROI/NPV,
  sponsor/team detail, portfolio balance checks, and supporting charts into their owning components.
- [ ] Approve the five demo lenses/personas: My Innovation / Megan Bowen; Programs & Pilots /
  Johanna Lorenz; Reviews & Gates / Diego Siciliani; Investment / Miriam Graham; Enterprise Insights /
  Joni Sherman.
- [ ] Approve independent tools for innovation growth, global participation, budget stewardship, and
  leadership health because they serve different roles and decision questions.
- [ ] Approve `LaunchInnovationChallenge` to connect strategy and measurable outcomes to the top of the
  funnel before idea intake begins.
- [ ] Approve `ManageInnovationExperiment` to connect funding assumptions to evidence-based pilot
  learning before value realization is claimed.
- [ ] Approve the Smart Onboarding Journey keynote story and evidence-grounded recognition closing beat.
- [ ] Approve exactly six conversation starters, with five distinct operational targets and capability
  exploration last.

### Immutable component names and routes

- [ ] Approve `SubmitInnovationIdea` -> `my-innovation/new-idea`.
- [ ] Approve `GetMyInnovation` -> `my-innovation/overview`.
- [ ] Approve `BuildIdeaBusinessCase` -> `my-innovation/business-case`.
- [ ] Approve `CelebrateInnovationImpact` -> `my-innovation/recognition`.
- [ ] Approve `GetInnovationReviewQueue` -> `reviews-gates/review-queue`.
- [ ] Approve `ReviewIdeaGate` -> `reviews-gates/gate-review`.
- [ ] Approve `ReviewInnovationFunding` -> `investment/funding-committee`.
- [ ] Approve `ExploreInnovationPortfolio` -> `enterprise-insights/command-center`.
- [ ] Approve `TrackInnovationValue` -> `enterprise-insights/value-realization`.
- [ ] Approve `GenerateInnovationBrief` -> `enterprise-insights/executive-brief`.
- [ ] Approve `GetInnovationGrowth` -> `programs-pilots/growth`.
- [ ] Approve `ExploreGlobalInnovation` -> `programs-pilots/geography`.
- [ ] Approve `TrackInnovationBudget` -> `investment/budget`.
- [ ] Approve `GetInnovationPortfolioHealth` -> `enterprise-insights/leadership-health`.
- [ ] Approve `LaunchInnovationChallenge` -> `programs-pilots/challenge-studio`.
- [ ] Approve `ManageInnovationExperiment` -> `programs-pilots/experiment-studio`.
- [ ] Approve `ExploreAgentCapabilities` -> isolated `education/capabilities`.
- [ ] Confirm every tool has one positive use boundary, nearest negative collision boundary, useful
  optional properties, and useful empty-input default.

### Full-screen and visual direction

- [ ] Approve one shared shell with a desktop/keynote vertical rail and responsive narrow selector for
  My Innovation, Programs & Pilots, Reviews & Gates, Investment, and Enterprise Insights.
- [ ] Approve Funding Committee as an immersive Investment route and the capability gallery as an
  isolated route, not separate primary applications.
- [ ] Approve Portfolio command center as the keynote visual centerpiece.
- [ ] Approve grape + marigold as the primary accent pair, with Fluent semantic colors reserved for state.
- [ ] Approve the living funnel, funding consequence, impact constellation, and recognition artifact as
  the four signature visuals.
- [ ] Approve the 11 copied reference portraits and exact filename/person mapping in README; use Megan,
  Johanna, Diego, Miriam, and Joni as primary profiles and the remaining six as supporting specialists.
- [ ] Approve original theme/badge/empty-state art and geometric agent mark; Fluent initials remain the
  loading/missing-media fallback.
- [ ] Approve React SVG and Fluent DOM as default renderers; Babylon remains excluded unless a measured
  spike proves decision value.
- [ ] Label the four current PNGs under `assets/` as design references, not implementation evidence.

### Market and lifecycle coverage

- [ ] Approve the directional market benchmark against Brightidea, HYPE, Planview IdeaPlace, Wazoku,
  and Qmarkets; retain retrieval date and public source links without claiming feature parity.
- [ ] Approve the 10-phase operating model: direction, signals/opportunity, ideation, triage/shaping,
  investment, experiment/learn, scale/execute, realize value, learn/recognize, govern/improve.
- [ ] Map every current tool to one lifecycle phase, role, trigger, intent, decision/job, outcome,
  inline contract, and exact full-screen continuation.
- [ ] Validate the sample covers challenge-to-impact continuity without becoming a portal clone or
  implying that model inference performs governed actions.
- [ ] Keep technology/startup scouting, external crowds, patents, methodology administration, and
  durable project execution as explicit extension points with stable service/view-model boundaries.
- [ ] Approve the agentic differentiation matrix: natural-language entry, bounded dynamic inline UX,
  deterministic safeguards, exact full-screen continuation, and integration-ready services.

### Identity and cleanup

- [ ] Approve retirement of the generated `Innovation` placeholder; do not rename, repurpose, or
  transfer its GUID to a final intent.
- [ ] Approve final package/solution titles, IDs, publisher strategy, manifest `accentColor`, and a
  plugin-facing human name of at most 20 characters.
- [ ] Approve Contoso as the fictional organization while Zava Innovation Hub is the sample/agent
  identity, or select one consistent alternative before content is authored.
- [ ] **APPROVAL GATE:** Confirm Phase 0 before scaffold, dependency, source, configuration, or asset work.

## Phase 1 - Foundation and supported scaffolding

### Baseline and immutable identities

- [ ] Record the untouched scaffold build, lint, package, Node, SPFx, and dependency baseline.
- [ ] Remove the approved placeholder only after Phase 0 confirmation.
- [ ] Generate all 17 final-named Copilot Components through the supported Yeoman command when this
  phase starts; never manually create, copy, or rename component scaffolds.
- [ ] Verify 17 unique immutable GUIDs, folders/classes, resources, tools, and registrations.

### Canonical intent catalog

- [ ] Create one typed catalog owning names, GUIDs, operations, lenses, descriptions, optional schemas,
  previews, education metadata, starter targets, and full-screen destinations.
- [ ] Generate manifests, adapters, schemas, bundles, localization, agent registration, and starters
  from that catalog.
- [ ] Add fail-fast validation for identity, counts, schemas, registration, routes, previews, starters,
  and bundle drift.
- [ ] Generate a prompt/property/collision/routing matrix with a non-writing check mode.
- [ ] Validate one request -> one primary tool across intake/business case, queue/gate/funding,
  personal/portfolio, growth/geography, budget/funding, health/landscape/value, and analysis/brief boundaries.

### Shared stack and host

- [ ] Pin React 17.0.1, React DOM 17.0.1, matching types, Fluent UI v9, Fluent icons, and Griffel at
  approved reference versions before React implementation.
- [ ] Establish one measured shared-bundle strategy for all component entries.
- [ ] Build one owner-document Fluent/Griffel host with theme, brand/action header, host-authoritative
  full-screen control, and accessible error boundary.
- [ ] Normalize prompt properties into deterministic signatures and separate fresh invocation, passive
  rerender, transient interaction, settings, and confirmed session state.
- [ ] Add catalog-owned display-mode routing and lazy-load substantial full-screen code.
- [ ] Validate owner-document styles, current-user fallback, passive preservation, fresh reset,
  unsupported display mode, and teardown.
- [ ] Run the first clean zero-warning compile before feature implementation.

### Required automation

- [ ] Add intent configure/validate, routing matrix, agent icon, asset, gallery, visual capture,
  generated-plugin, and package-output scripts with check modes where required.
- [ ] Add canonical `validate` and production `build` commands in the rules-mandated order.
- [ ] Pin Playwright and Chromium for the tenant-free visual harness.
- [ ] Keep generated output ignored while exposing only the final `.sppkg` release artifact.

## Phase 2 - Domain model and mock services

### Deterministic connected data

- [ ] Define objectives, challenges, people, locations, business units, themes, ideas, scores, similarity, business cases,
  reviews, budget ledgers, funding, milestones, value, feedback, votes, recognition, portfolio history,
  program growth, and receipt models.
- [ ] Generate at least 100 employees, 120 ideas across all stages, six uneven themes, 15 funded pilots,
  24 months of submission/contributor/gate history, and six quarters of budget/value history from
  deterministic relative-time seeds.
- [ ] Seed at least eight active/completed challenges with outcomes, audiences, sponsors, criteria,
  constraints, timelines, participation plans, linked ideas, and measurable results.
- [ ] Seed pilot experiments with hypotheses, assumptions, methods, thresholds, milestones,
  observations, evidence, learning, confidence, and go/pivot/stop recommendations.
- [ ] Attribute ideas and people across countries, four reporting regions, and at least five business
  units with deliberately uneven participation and conversion for meaningful geographic analysis.
- [ ] Keep Smart Onboarding Journey coherent across owner, collaborators, score, reviews, business case,
  funding, milestones, value, feedback, and recognition.
- [ ] Include similar/no-similar ideas, evidence gaps, conflicts, overdue reviews, partial/deferred
  funding, at-risk milestones, under-realized value, and no-match filters.
- [ ] Validate all IDs/relationships, deterministic dates, distributions, and edge-state reachability.

### Services, calculations, and workflows

- [ ] Define `IInnovationDataService`, `MockInnovationDataService`, mappers, and a mock-default factory.
- [ ] Implement/test similarity, five-axis score, readiness, ROI, NPV, payback, sensitivity, funnel
  conversion/velocity, growth cohorts, regional participation/conversion, horizon mix, budget bridge,
  burn/forecast, concentration, portfolio health, and value variance calculations.
- [ ] Implement pure challenge, idea, gate, funding, experiment, pilot/value, and recognition workflow transitions.
- [ ] Implement an in-memory-first session action store with guarded `sessionStorage`, confirmed receipt
  overlays, subscriptions, remount restoration, and Reset.
- [ ] Prove actions update related views without mutating immutable seeds.

### Chart and media models

- [ ] Define renderer-neutral models with stable IDs, exact/formatted values, relationships, colors,
  geometry inputs, selection, legends, and fallback rows.
- [ ] Build pure funnel, radar, cash-flow, bubble, balance, treemap, waterfall, growth/cohort,
  geographic, budget forecast, leadership health, timeline/value, and recognition models.
- [ ] Run a measured D3 spike for `d3-array`, `d3-scale`, `d3-shape`, `d3-geo`, `d3-hierarchy`, and
  `topojson-client`; retain only modules that replace substantial tested calculation/layout logic.
- [ ] Package simplified world boundaries locally, document their source/license/provenance, and prove
  no runtime map tiles, geography, or media are fetched.
- [ ] Reject full `d3` plus selection, axis, transition, timer, interpolation, brush, drag, zoom, fetch,
  and formatting modules; React owns SVG, state, events, and motion.
- [ ] Create one typed local media catalog and provenance contract for personas, themes, badges, empty
  states, and agent icons.
- [ ] Validate calculations, chart model variance, fallback rows, media keys, and reset behavior before React.

## Phase 3 - Representative inline slices

### Shared operation mechanics

- [ ] Implement separate information, review, submit, and education dispatchers; unknown intents fail
  visibly in development.
- [ ] Give every intent/stage a stable unique `data-layout` identity.
- [ ] Share filter, validation, confirmation, receipt, reset, and announcement mechanics without
  sharing generic domain bodies.
- [ ] Inventory/test every visible control and remove any without a material effect.

### Submit - `SubmitInnovationIdea`

- [ ] Implement the prompt-backed editable idea canvas and visible field guidance.
- [ ] Update duplicate matches, radar score, readiness, and next steps from the live draft.
- [ ] Implement validation, Edit, exact review, explicit mock confirmation, receipt, and prompt reset.
- [ ] Preserve draft, step, similarity, and score on Expand.
- [ ] Validate defaults, prefill, edits, invalid/no-similar/high-similarity states, workflow, narrow and
  standard widths, dark mode, reduced motion, and 200% zoom.

### Review - `ReviewInnovationFunding`

- [ ] Implement economics, proposed amount, before/after horizon mix, budget/value consequences, and
  milestone-scope impact.
- [ ] Implement Fund, Partial fund, Defer, and Reject drafts with rationale safeguards and confirmation.
- [ ] Produce a semantic receipt and update canonical queue/portfolio overlays.
- [ ] Preserve request, amount scenario, rationale, and decision draft on Expand.
- [ ] Validate all decisions, amount bounds, exact review values, remount/reset, responsive/theme,
  reduced-motion, and zoom states.

### Information - `ExploreInnovationPortfolio`

- [ ] Implement funnel, impact/effort, balance, theme, and funding-bridge modes selected by prompt or control.
- [ ] Make period, horizon, theme, region, stage, and selection materially rebuild compatible models.
- [ ] Coordinate mark, legend, exact-value rail, and View as table without generic insight chrome.
- [ ] Preserve mode, filters, and selected mark on Expand.
- [ ] Validate defaults by focus, filter variance, detail, no-match/error, keyboard selection,
  responsive/theme, reduced-motion, and zoom states.

### First tenant gate

- [ ] **BLOCKED: tenant domain/authentication required.** Prove the three representative prompts select
  one tool, render owner-document styles, support interaction, and preserve context through Expand/return.
- [ ] Save dated Workbench evidence and distinguish natural-language routing from direct tool selection.

## Phase 4 - Remaining inline catalog and explorer

### My Innovation

- [ ] Implement `GetMyInnovation`: selected idea, living funnel, next action, feedback/supporters,
  milestones, recognition progress, and material filters.
- [ ] Implement `BuildIdeaBusinessCase`: assumptions, cash-flow/payback, ROI/NPV, uncertainty, scenario
  comparison, guarded review, and receipt where an action is confirmed.
- [ ] Implement `CelebrateInnovationImpact`: evidence, recipients, badge, praise composition, audience,
  review, mock share receipt, and reset.

### Decisions

- [ ] Implement `GetInnovationReviewQueue`: pending default, counted filters, compact ranked rows,
  selected evidence, completed read-only states, and preserved filter.
- [ ] Implement `ReviewIdeaGate`: cohort, rubric weights, evidence, blockers, sponsor/owner,
  Advance/Request changes/Park/Reject, confirmation, and receipt.

### Portfolio

- [ ] Implement `TrackInnovationValue`: milestones, projected/actual value, variance, at-risk evidence,
  owner, filters, selection, and exact table.
- [ ] Implement `GenerateInnovationBrief`: audience/scope/emphasis, grounded evidence, editable mock
  narrative, review, copy/export/mock send, and receipt.

### Growth, geography, budget, and leadership

- [ ] Implement `GetInnovationGrowth`: submissions, active contributors, gate throughput, conversion,
  and realized ideas with metric/period/cohort controls, layered trend, selected point, and exact table.
- [ ] Implement `ExploreGlobalInnovation`: locally packaged world map, proportional submissions,
  regional conversion bars, theme mix, inclusion gaps, metric/region/theme selection, and exact table.
- [ ] Implement `TrackInnovationBudget`: baseline, allocation, committed, approved/unspent, actual,
  forecast, and remaining with bridge, burn/forecast line, horizon mix, variance selection, and scenario.
- [ ] Implement `GetInnovationPortfolioHealth`: funnel velocity, balance, alignment, concentration,
  expected/realized value, selectable dimensions, trend, accountable exceptions, and executive summary.
- [ ] Validate that growth is not a submission-count vanity chart, geography does not equate volume with
  quality, budget values reconcile exactly, and leadership health exposes calculation basis and exceptions.

### Challenge and experiment

- [ ] Implement `LaunchInnovationChallenge`: strategic outcome, problem framing, target audience,
  constraints, source evidence, criteria/weights, sponsor, timeline, expected participation, review,
  explicit mock launch receipt, and reset.
- [ ] Show challenge portfolio fit, similar active challenges, target audience reach, and measurable
  success definition without allowing AI to launch or publish automatically.
- [ ] Implement `ManageInnovationExperiment`: selected funded idea, hypothesis, assumptions, method,
  threshold, milestones, observations, evidence strength, learning, and go/pivot/stop recommendation.
- [ ] Keep experiment recommendation visibly distinct from a confirmed gate/scale decision; require
  review and receipt for saved mock plans or recommendations.
- [ ] Validate prompt prefill, edits, visible safeguards, exact review values, confirmation, receipt,
  reset, no-evidence/contradictory-evidence states, and inline-to-full-screen continuation for both tools.

### Capability education

- [ ] Implement `ExploreAgentCapabilities` from catalog metadata; exclude itself and advertise all 16 tools.
- [ ] Add category, search, audience, operation, scenario detail, prompt copy, and deterministic safe preview.
- [ ] Stop review/submit previews before confirmation and label them `Demo preview - no action applied`.
- [ ] Validate six starters, completeness, counts, clipboard fallback, reset, every preview, no nested
  header, and no side effects.

### Inline scale-out gate

- [ ] Render all 17 defaults at narrow/standard widths and light/dark themes with zero errors, overflow,
  blank charts, broken images, or unlabeled controls.
- [ ] Validate every information default/filter/detail/no-match/error state.
- [ ] Validate every review queue/evidence/safeguard/rationale/confirm/receipt/update state.
- [ ] Validate every submit prefill/validation/Edit/review/confirm/receipt/reset state.
- [ ] Run the complete clean zero-warning local gate and record measured totals.

## Phase 5 - Full-screen shell and continuation

### Shared shell

- [ ] Build product bar with identity, scope, search, notifications, settings, persona, and Back to conversation.
- [ ] Build accessible five-lens desktop/keynote vertical navigation and equivalent narrow selector/drawer.
- [ ] Implement useful default dashboards, route focus, focus restoration, and typed internal destinations.
- [ ] Resolve the host user into one demo profile whose default lens, scope, metrics, queue/action
  visibility, accountable-person context, and suggested operations change materially.
- [ ] Keep cross-lens navigation available for the demo while role-sensitive mock actions become
  read-only or require an explicit persona switch; label this as demo behavior, not authorization.
- [ ] Synchronize session receipts across profiles so Megan -> Diego -> Miriam -> Johanna -> Joni handoffs
  appear from one canonical record graph without a tenant write.
- [ ] Implement session settings that materially affect locale/currency, table default, density, and
  visible panels while retaining at least one panel.
- [ ] Validate mobile, tablet, desktop, keynote, light/dark, long labels, keyboard, zoom, and reduced motion.

### Lens dashboards

- [ ] Build My Innovation around persona, personal funnels, priority action, feedback, milestones,
  business-case readiness, recognition, and focused inline routes.
- [ ] Build Programs & Pilots around active challenges, participation, growth, geography, experiments
  needing evidence, learning recommendations, and focused Challenge/Experiment Studio routes.
- [ ] Build Reviews & Gates around one canonical queue, pressure/load/gaps, cohort funnel, and gate review
  without nested queue ownership.
- [ ] Build Investment around reconciled budget position, bridge, burn/forecast, horizon allocation,
  variance evidence, and immersive funding committee mode; confirmed funding hands the pilot envelope
  to Programs & Pilots rather than turning Investment into project management.
- [ ] Build Enterprise Insights around the dominant funnel plus coordinated landscape, growth, global
  participation, leadership health, value, outcomes, shared filters, and selected evidence. Growth and
  geography are read-only leadership rollups; detailed analysis plus challenge or experiment actions
  deep-link to Programs & Pilots with source context preserved.
- [ ] Add one visibly non-applied portfolio scenario studio that enters governance before confirmation.
- [ ] Build the isolated capability gallery with search/filter/detail, Previous/Next, featured tour,
  safe preview, and purpose-gated lazy loading.

### Exact continuation gate

- [ ] Test every destination with lens, route, entity, filters, comparison, selection, draft, review,
  and safe scenario state where applicable.
- [ ] Test fresh invocation vs passive rerender and one transient interaction per operation model.
- [ ] Test each profile's default lens and first useful state: Megan/My Innovation, Johanna/Programs &
  Pilots, Diego/Reviews & Gates, Miriam/Investment, and Joni/Enterprise Insights.
- [ ] Test handoff continuity for challenge -> idea, idea -> gate queue, gate -> funding queue, funding ->
  experiment, and experiment/value -> leadership health/recognition.
- [ ] Test that changing profile alters meaningful data/action context rather than only avatar/name, and
  that unauthorized-looking mock actions do not imply production role enforcement.
- [ ] Capture every dashboard/gallery default at mobile, standard, desktop, keynote, and representative
  light/dark states with no inline-width layout stranded on large canvas.
- [ ] Run the complete clean zero-warning local gate and record measured totals.

## Phase 6 - Brand, signature visuals, and demo polish

### Original assets

- [ ] Design one geometric lightbulb + funnel mark and deterministic generator for
  `copilot/color.png` and `copilot/outline.png`.
- [ ] Validate dimensions, transparency/color rules, small-size legibility, manifest mapping, hashes,
  packaged bytes, provenance, and check-mode freshness.
- [ ] Generate one typed media catalog for all 11 copied JPEG portraits using exact person and filename
  keys; validate every file, hash, accessible name, intended role, and initials fallback.
- [ ] Record source/reference path, retrieval date, intended use, SHA-256, and redistribution status for
  all portraits; public release remains blocked until rights evidence is approved.
- [ ] Create six original theme marks, recognition badges, and no-ideas/no-reviews empty states.
- [ ] Validate meaningful alt text/decorative treatment, local provenance, and zero runtime media fetches.

### Visual and motion refinement

- [ ] Refine one living-funnel model across personal, queue, inline portfolio, and command-center scales.
- [ ] Refine funding amount consequences across mix, budget, value, and milestone scope without layout shift.
- [ ] Refine impact constellation for pointer, keyboard, selection, and exact evidence.
- [ ] Refine growth layers/cohorts so values, conversion, and period comparisons remain legible inline.
- [ ] Refine the world map with deliberate projection, thresholds, collision-safe labels, regional bars,
  keyboard location selection, and an equivalent exact table.
- [ ] Refine the budget bridge/forecast so every amount reconciles and scenario remains visibly not applied.
- [ ] Refine leadership health so it reads in ten seconds without hiding calculation basis or exceptions.
- [ ] Refine recognition as a polished responsive artifact grounded in contribution and outcome.
- [ ] Complete light/dark/high-contrast tokens and projector/stage-lighting review.
- [ ] Add bounded gate, chart, selection, funding, route, and receipt motion with interruption,
  teardown, and reduced-motion behavior.
- [ ] Remove scaffold chrome, generic AI gradients, decorative controls, nested cards, placeholders,
  unsupported actions, and unlabeled chart evidence.

### Demo enablement

- [ ] Author/rehearse a four-minute challenge -> idea -> gate -> funding -> experiment -> impact/praise keynote.
- [ ] Author a 10-minute business walkthrough adding business case, value, brief, and discovery.
- [ ] Author a five-minute technical walkthrough of catalog, data, chart models, workflows, host state,
  continuation, accessibility, evidence, and package audits.
- [ ] Make reset deterministic and document one-command demo preparation.

## Phase 7 - Evidence, packaging, and release

### Automated UX evidence

- [ ] Complete harness coverage for every intent, workflow stage, lens, route, viewport, theme,
  reduced motion, zoom, keyboard path, no-match/error state, and safe preview.
- [ ] Capture real implementation PNGs and machine-readable evidence with source fingerprint, hashes,
  dimensions, runtime errors, overflow, media, chart, focus, and teardown results.
- [ ] Keep historical design references separate from implementation evidence/gallery ordering.
- [ ] Validate nonblank visuals, exact-value alternatives, semantic names, contrast, focus, and no active
  render loops/timers after teardown.

### Tenant Workbench evidence

- [ ] **BLOCKED: tenant domain/authentication required.** Rehearse all routing prompts and six starters
  in fresh conversations; require exactly one expected tool and useful properties.
- [ ] Validate all 17 inline tools, destinations, return, iframe focus, owner-document styles, passive
  continuity, current user, CSP, and diagnostics.
- [ ] Complete tenant keyboard, screen-reader, forced-colors, dark/light, mobile-width, and 200% zoom
  checks for representative information, review, submit, and explorer states.
- [ ] Save dated evidence naming host, method, package/hash or debug manifest, routing, destinations,
  preservation, diagnostics, and unresolved findings.

### Canonical release gate

- [ ] Finalize provenance, `assets/sample.json`, screenshot metadata, routing matrix, instructions,
  manifests, publisher metadata, and dependency security disposition.
- [ ] Run catalog, icon, asset, routing, gallery, clean production tests, package, generated-plugin,
  package-output, diagnostics, and `git diff --check` through one canonical command.
- [ ] Require zero warnings/errors, failures, stale output, duplicate media, repeated image catalogs,
  unsupported plugin schema, and unhashed development bundles.
- [ ] Record test/capture counts, package/JavaScript sizes, hashes, bundle/chunk counts, duplicate media,
  diagnostics, and stopped-server state from machine evidence.
- [ ] Commit the validated `sharepoint/solution/zava-innovation-portfolio.sppkg` while keeping debug output ignored.
- [ ] Reproduce `npm ci`, visual capture, and canonical build from a clean checkout before publication.

## Deferred - Dynamic data / API integration

- [ ] Implement authorized Dataverse/SharePoint ideas, Graph people, Teams/community praise,
  Power BI/Fabric, finance, and workflow adapters while preserving UI view models.
- [ ] Replace session receipts with authenticated durable APIs, authorization, audit, idempotency,
  retry, conflict handling, notifications, and rollback policy.
- [ ] Provision resources, consent, environments, classification, retention, localization, monitoring,
  and support ownership.
- [ ] Revalidate privacy, accessibility, performance, calculations, failure states, and visualization
  density against production volumes.

## Docs and cleanup

- [ ] Preserve this approved brief before converting the public README to PnP sample format.
- [ ] Keep one current `todo.md`; do not create competing status trackers.
- [ ] Document setup, supported Yeoman extension, architecture, data mapping, reset, harness, Workbench,
  validation, packaging, and limitations.
- [ ] Publish three demo scripts, generated prompt matrix, evidence index, and extensibility guide.
- [ ] Remove servers, debug artifacts, superseded packages, unused dependencies, dead routes,
  placeholders, and unsupported controls before release.
- [ ] Reconcile this tracker after every validated phase and update counts only from complete commands
  or machine-readable evidence.

## Reusable playbook

- [ ] Apply [agentic-creation-rules.md](agentic-creation-rules.md) throughout implementation, including
  scaffold restrictions, host-document theming, operation contracts, state separation, visualization,
  accessibility, evidence, bundle, and packaging requirements.
- [ ] Record an approved exception here before implementation and add a focused check preventing drift.

## Open decisions

1. Approve the 16+1 catalog and exact immutable names, including challenge framing, experiment
  management, and the four analytical tools.
2. Approve Zava Innovation Hub as agent identity and Contoso as fictional organization, or choose one
   naming system before content and icons are produced.
3. Approve the five-lens vertical shell: My Innovation, Programs & Pilots, Reviews & Gates, Investment,
  and Enterprise Insights, plus the isolated education gallery.
4. Decide whether `CelebrateInnovationImpact` mock-shares to Teams/community, creates a draft only, or
   offers both after explicit review; no live write is included.
5. Decide whether `GenerateInnovationBrief` remains routed or becomes an internal Enterprise Insights
  route, reducing the operational catalog from 16 to 15.
6. Approve locally packaged simplified world boundaries and the proposed D3 module spike for growth,
  geography, budget, treemap, and other analytical model calculations.
7. Approve plugin-facing `name_for_human`, accent color, package identity, and publisher strategy.
8. Provide a tenant domain and authenticated Workbench access for runtime gates.

No implementation work should start until these decisions and the Phase 0 approval gate are resolved.