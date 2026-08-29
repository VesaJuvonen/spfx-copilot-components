# Copilot Components GA sample plan

> **Decision date:** 2026-08-28<br>
> **Decision:** Build, in order, a **Customer Resolution Center**, a **Revenue Deal Room**, and a
> **Procurement and Supplier Command Center**.<br>
> **Reference bar:** [`samples/zava-innovation-portfolio`](samples/zava-innovation-portfolio/README.md)
> (Zava Innovation Hub).

## Executive recommendation

The next three samples should be systems of action, not more dashboards and not chat answers wrapped
in cards. Together they should prove that Copilot can understand natural-language intent, select a
bounded business experience, assemble evidence, let a person inspect or change the outcome, and carry
context into a full-screen workspace without losing the conversation.

| Priority | Sample | Primary BDM outcome | Signature agent UX proof |
| ---: | --- | --- | --- |
| 1 | **Customer Resolution Center** | Protect retention while lowering cost-to-serve | An agent turns a fragmented customer issue into a governed resolution plan, with evidence, sentiment, SLA consequence, collaboration, compensation control, and customer communication in one flow. |
| 2 | **Revenue Deal Room** | Increase win rate, forecast confidence, and seller capacity | An agent builds a living deal strategy from meetings, mail, CRM-shaped records, competitors, stakeholders, and commercial constraints; humans test and approve the close plan and quote. |
| 3 | **Procurement and Supplier Command Center** | Reduce spend and supplier risk while shortening cycle time | An agent converts business intent into compliant buying options, compares suppliers and scenarios, checks policy and risk, and routes an explainable award or purchase decision for approval. |

This portfolio deliberately covers the three outcomes most legible to business decision makers in
every region: **retain customers, grow revenue, and control cost/risk**. It also adds three enterprise
application categories that are materially absent from the current gallery.

## Why this is the right GA bet

The market signal is no longer simply “add generative AI.” Stanford HAI reports that 78% of
organizations used AI in 2024, up from 55% in 2023. Microsoft's 2025 Work Trend Index, based on 31,000
workers in 31 markets, found that 81% of leaders expected agents to be moderately or extensively
integrated into AI strategy within 12–18 months. It also found that leaders ranked customer service,
marketing, and product development as the top three areas for accelerated AI investment.

The design implication is more important than the adoption number. Microsoft's report describes the
destination as AI-operated but human-led: agents run tasks or workflows while people set direction,
inspect exceptions, and own consequential decisions. The report also found that 80% of the global
workforce lacked enough time or energy for its work, while 53% of leaders said productivity needed to
increase. A winning sample must therefore remove process navigation and evidence assembly, not merely
generate another summary.

These three scenarios are strong because each has:

- a globally recognizable business outcome and a clear executive buyer;
- high-volume evidence spread across messages, meetings, documents, records, and policies;
- a mix of routine work for agents and high-consequence exceptions for people;
- calculations, comparisons, simulations, and state transitions that demand trusted interactive UX;
- an end-to-end story across individual contributor, manager, specialist, and executive roles;
- credible Microsoft 365 handoffs, with swappable CRM, ERP, procurement, and service connectors;
- value that can be measured in money, cycle time, quality, risk, and user effort.

## Repository coverage scan

The scan reviewed all 20 sample READMEs present on 2026-08-28 and inspected the Innovation Hub's
operating model and component catalog. The root [`samples/README.md`](samples/README.md) currently lists
18 samples and should be refreshed separately because it omits the Innovation Hub and IT Concierge.

### Current scenario map

| Enterprise domain | Existing samples | Coverage assessment |
| --- | --- | --- |
| Strategy, innovation, and portfolio delivery | Zava Innovation Hub; Zava Project Tracker; Release Readiness Board | **Deep.** Connected lifecycle, stage gates, investment, experiments, project risk, capacity, and executive portfolio views are already represented. |
| Employee and HR services | Zava Employee Agent; My Time Off; People Directory; Kudos; My Day | **Deep.** Employee self-service, manager approvals, recognition, benefits, learning, and personal planning are heavily represented. |
| IT operations and governance | Zava IT Concierge; M365 Service Health; SP Permissions Explorer; Copilot Readiness Action Centre | **Deep.** Support, device operations, service health, permissions, and readiness remediation are represented. |
| Sales and retail insight | Executive Sales Dashboard; Zava Retail Store | **Visible but shallow.** Both emphasize KPIs, filters, and charts. Neither demonstrates account-to-close execution, mutual commitments, pricing decisions, or forecast inspection. |
| Approvals | MyApprovals; approval modules in HR, IT, project, time-off, and innovation samples | **Pattern covered.** A new sample should embed approval in a richer business decision, not build another generic queue. |
| Knowledge and discovery | Work IQ Answers; Apps Directory; Events; Photos | **Covered.** Search, citations, people, events, media, and application discovery are represented. |
| External customer service and success | None | **Critical gap.** No case-to-resolution, customer health, service recovery, escalation, or voice-of-customer workflow. |
| B2B revenue execution | Executive sales reporting only | **Critical gap.** No qualification, account planning, stakeholder map, deal coaching, proposal/quote review, or close plan. |
| Procurement and supplier management | Small supporting references inside other samples | **Critical gap.** No intake-to-buy, sourcing, supplier risk, contract, policy, or spend-control experience. |
| Finance operations | Budget views in innovation/project samples; payroll explanation in employee sample | **Material gap.** No close, receivables, expenses, planning, or procure-to-pay lifecycle. Procurement is the better first finance-adjacent sample because it is cross-functional and visually richer. |
| Legal, risk, and compliance | Permissions/readiness controls and governed decisions in several samples | **Material gap.** No dedicated control testing, audit evidence, policy obligation, or regulatory case workflow. This remains the strongest fourth candidate. |
| Supply chain and field operations | Retail store and IT asset views only | **Material gap.** No demand, inventory, logistics, maintenance, quality, or disruption workflow. Strong vertical follow-on, but less universal than the selected three. |

### What the Innovation Hub establishes as the quality bar

The reference sample succeeds because it is one connected product rather than a pile of tools:

1. It tells a complete business story from strategic demand through submission, review, investment,
   experimentation, value realization, and recognition.
2. It uses multiple role-specific lenses over one deterministic data graph.
3. Each inline component owns a distinct business job and visibly changes with prompt parameters.
4. Information, review, and submission components have different interaction contracts.
5. Full screen is an exact continuation of entity, filter, scenario, draft, and workflow state.
6. Calculations, validation, decisions, confirmations, and receipts are deterministic and inspectable.
7. Consequential actions stop for visible human review; prompt-derived values never auto-submit.
8. Signature visuals communicate the domain rather than decorating a generic dashboard.
9. Accessibility, responsive behavior, theming, deterministic demos, tests, and release evidence are
   treated as product requirements.

The next samples must preserve these principles but should not clone the five-lens shell or chase the
same component count. Every component must earn its place through distinct intent, interaction, or
decision value.

## Selection method

Candidates were scored from 1 (weak) to 5 (exceptional). The weighted score is out of 100.

| Criterion | Weight | Question |
| --- | ---: | --- |
| Global enterprise prevalence | 20 | Is the workflow common across regions, industries, and organization sizes? |
| BDM outcome and economic clarity | 20 | Can a leader immediately connect it to growth, retention, cost, cash, or risk? |
| Agent and UX differentiation | 20 | Does the scenario require dynamic UI, evidence, simulation, human judgment, and action rather than a prose response? |
| Repository whitespace | 15 | Does it add a business category and interaction pattern that the gallery lacks? |
| End-to-end story strength | 10 | Can one connected record support memorable cross-role handoffs? |
| Microsoft 365 and integration fit | 10 | Do collaboration and work artifacts naturally meet systems of record through stable connectors? |
| Demo feasibility for GA | 5 | Can deterministic mock data make it credible without a complex tenant dependency? |

| Candidate | Prevalence | Outcome | Agent UX | Whitespace | Story | M365 fit | Feasibility | Score / 100 |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Customer resolution and success | 5 | 5 | 5 | 5 | 5 | 5 | 4 | **99** |
| B2B deal execution | 5 | 5 | 5 | 4 | 5 | 5 | 4 | **96** |
| Procurement and supplier management | 5 | 5 | 5 | 5 | 5 | 4 | 4 | **97** |
| Finance close and cash | 5 | 5 | 4 | 5 | 4 | 4 | 3 | 89 |
| Compliance control tower | 4 | 5 | 5 | 4 | 4 | 4 | 3 | 85 |
| Supply-chain resilience | 4 | 5 | 5 | 5 | 5 | 3 | 2 | 85 |
| Change and adoption management | 4 | 4 | 4 | 5 | 4 | 5 | 4 | 84 |
| Workforce capacity and skills | 5 | 4 | 4 | 2 | 4 | 5 | 4 | 78 |

Procurement scores slightly above sales on whitespace, but the Revenue Deal Room should ship second:
it directly upgrades an already familiar gallery scenario from passive reporting to active execution,
making the Copilot Components evolution easy to explain at GA.

## Sample 1: Customer Resolution Center

### Product thesis

**A customer reports a problem once. The agent assembles the whole situation; people resolve the
exception with empathy and control; the organization learns before the next customer is affected.**

Traditional service consoles make representatives reconstruct context across channels, entitlements,
orders, products, knowledge, prior cases, and internal experts. The agent should do that assembly and
propose bounded next actions. The component should own exact facts, policy, timers, financial limits,
editing, validation, confirmation, and the resolution record.

This is not an IT help desk reskin. The customer, commercial relationship, service promise, sentiment,
retention risk, and service recovery decision must be first-class.

### Audiences and full-screen lenses

| Lens | Persona | Core question |
| --- | --- | --- |
| My Queue | Service representative | What needs my judgment now, and what can the agent prepare or complete? |
| Customer 360 | Customer success/account owner | What happened across the relationship, and what protects the outcome? |
| Resolution Room | Specialist, operations, or product owner | What evidence explains this issue, who should collaborate, and what fixes it? |
| Service Operations | Service leader | Where are SLA, quality, cost, and systemic issue risks emerging? |

### Target operational components

| Component | Type | Distinct inline job and dynamic behavior |
| --- | --- | --- |
| `TriageCustomerIssue` | Submit/create | Turns a natural description into a structured case; product, severity, entitlement, duplicates, language, sentiment, and SLA recalculate as evidence changes. |
| `GetPriorityServiceQueue` | Information/analysis | Ranks work by impact, SLA risk, sentiment, customer value, and agent confidence; filters and selection change the queue and evidence rail. |
| `BuildResolutionPlan` | Submit/create | Creates an editable step plan grounded in knowledge, diagnostics, policy, prior cases, and accountable owners; gaps and confidence update live. |
| `ReviewServiceRecovery` | Review/decision | Simulates credit, replacement, refund, or concession options against policy, authority, margin, and retention risk before explicit approval. |
| `ComposeCustomerUpdate` | Submit/create | Produces a localized, channel-aware update with facts, commitments, tone controls, review, and send receipt; unsupported promises are blocked. |
| `StartExpertSwarm` | Submit/create | Recommends experts from skills, product ownership, location, and availability; lets the rep inspect context and launch a Teams-shaped collaboration handoff. |
| `ExploreCustomerHealth` | Information/analysis | Coordinates timeline, products, cases, sentiment, adoption, commercial value, and open commitments for one account. |
| `DetectServiceIncident` | Information/analysis | Clusters related cases by product, geography, version, and symptom; a visual impact map changes as the threshold and cohort change. |
| `ReviewIncidentResponse` | Review/decision | Shows blast radius, workaround evidence, communication audiences, and operational consequences before declaring, escalating, or closing an incident. |
| `TrackResolutionOutcome` | Information/analysis | Verifies SLA, first-contact resolution, reopen risk, customer confirmation, service recovery cost, and knowledge reuse. |
| `CreateKnowledgeFromResolution` | Submit/create | Converts a verified resolution into a reviewed article with applicability, exclusions, evidence, owner, review date, and provenance. |
| `ExploreServicePerformance` | Information/analysis | Lets leaders inspect demand, backlog, SLA, quality, cost, sentiment, channel, geography, and recurring issue drivers. |

### Signature UX moments

- **Case constellation:** a customer timeline connects messages, orders, products, prior cases,
  commitments, sentiment shifts, and the current issue without becoming a flat activity feed.
- **SLA consequence clock:** editing severity, entitlement, owner, or next action visibly changes the
  response and resolution risk windows.
- **Resolution evidence canvas:** recommended steps show supporting and conflicting evidence, source
  freshness, applicability, and confidence beside editable actions.
- **Service recovery simulator:** credits or replacements change authority, margin, precedent, and
  predicted retention outcomes before a person confirms.
- **Incident emergence map:** related cases assemble into a product/version/geography pattern and can
  be inspected as exact records and an accessible table.

### Connected keynote journey

1. A customer message arrives: “Our stores cannot activate the new handhelds before tomorrow's launch.”
2. `TriageCustomerIssue` identifies an enterprise entitlement, negative sentiment, a launch deadline,
   and similar cases on one firmware version.
3. The representative opens `BuildResolutionPlan`; the agent prepares diagnostics and a workaround,
   while the representative corrects one unsupported assumption.
4. `StartExpertSwarm` brings in the product owner and regional operations specialist with the exact
   evidence package, not a generic chat invite.
5. Related cases cross the threshold in `DetectServiceIncident`; the operations lead reviews impact
   and explicitly declares an incident.
6. The representative uses `ReviewServiceRecovery` to choose a governed credit and sends a localized
   update after reviewing the commitments.
7. Service Operations shows contained SLA risk, customer confirmation, avoided churn exposure, and a
   reviewed knowledge article created from the fix.

### Outcome measures

Time to first meaningful action, mean time to resolution, first-contact resolution, SLA breach rate,
reopen rate, escalation rate, service recovery cost, customer sentiment movement, CSAT, retention risk,
knowledge reuse, and minutes of evidence assembly avoided.

## Sample 2: Revenue Deal Room

### Product thesis

**A seller names the account and desired outcome. The agent turns scattered relationship evidence into
an inspectable deal strategy; the revenue team commits to actions, tests commercial choices, and closes
with a forecast it can defend.**

The existing Executive Sales Dashboard answers “how are we performing?” The new sample must answer
“what should this team do to win this deal, what evidence supports the forecast, and what requires
human approval?” It should complement, not replace, a CRM. CRM-shaped records remain the source of
truth; Copilot becomes the intent-led workspace across records and Microsoft 365 collaboration.

### Audiences and full-screen lenses

| Lens | Persona | Core question |
| --- | --- | --- |
| My Deals | Account executive | Which commitment or relationship move advances my deals today? |
| Deal Room | Cross-functional pursuit team | What is the win strategy, evidence, risk, and mutual action plan for this opportunity? |
| Commercial Desk | Sales manager, finance, and legal | Which pricing, terms, or exceptions produce an acceptable outcome? |
| Revenue Command | Sales leader | Is the forecast evidence-based, and where should leadership intervene? |

### Target operational components

| Component | Type | Distinct inline job and dynamic behavior |
| --- | --- | --- |
| `QualifyOpportunity` | Review/decision | Compares need, authority, urgency, value, competition, solution fit, and evidence completeness; stage and recommendation remain human decisions. |
| `BuildAccountBrief` | Information/analysis | Assembles relationship history, priorities, organization changes, open work, risks, and whitespace with citations and freshness. |
| `MapBuyingCommittee` | Information/analysis | Creates an interactive stakeholder graph of role, influence, stance, relationship strength, missing access, and owner; edits redraw influence paths. |
| `GetDealRisk` | Information/analysis | Ranks evidence-based risks such as inactivity, single-threading, missing decision criteria, competitor momentum, legal delay, and weak next steps. |
| `BuildMutualActionPlan` | Submit/create | Converts the target close date into buyer and seller commitments, dependencies, owners, evidence, and dates; changing one milestone recalculates critical path. |
| `PrepareCustomerMeeting` | Information/analysis | Produces a role-aware briefing, objectives, open commitments, likely objections, evidence, and questions from the selected meeting and attendees. |
| `ReviewMeetingCommitments` | Review/decision | Turns meeting notes into proposed CRM updates and mutual actions; users accept, edit, assign, or reject each change before confirmation. |
| `ShapeSolutionProposal` | Submit/create | Builds an outcome-led proposal outline from requirements, approved proof points, architecture, adoption plan, and exclusions. |
| `SimulateCommercialOffer` | Information/analysis | Changes quantity, term, discount, ramp, services, currency, and probability to show revenue, margin, approval level, and forecast consequences. |
| `ReviewDealException` | Review/decision | Gives finance/legal/sales one evidence view for discount, nonstandard term, security, or delivery exceptions and records the governed decision. |
| `InspectForecastCommit` | Review/decision | Shows opportunity evidence, historical movement, risk, critical path, and scenario range before a manager accepts or changes forecast category. |
| `ExplorePipelineQuality` | Information/analysis | Goes beyond totals to inspect coverage, aging, conversion, evidence quality, concentration, slip risk, and intervention impact. |

### Signature UX moments

- **Buying-committee influence graph:** relationship paths, stance, authority, and missing coverage move
  as contacts and evidence are changed.
- **Mutual-action critical path:** customer and seller commitments form one visual plan; slips redraw
  dependencies and the credible close range.
- **Deal evidence meter:** forecast confidence separates verified buyer evidence from seller opinion,
  stale activity, and agent inference.
- **Commercial scenario table:** offer changes redraw revenue, margin, approval path, close probability,
  and customer outcome without pretending that the model can approve itself.
- **Forecast bridge:** leadership can trace movement from prior forecast to current commit through
  named deals and evidence, with an exact-value table alternative.

### Connected keynote journey

1. The seller asks, “Help me get Contoso's expansion deal to signature this quarter.”
2. `GetDealRisk` identifies a supportive champion but no economic-buyer access, a security exception,
   and an unowned customer milestone.
3. `MapBuyingCommittee` reveals the influence gap; the seller assigns an executive sponsor and opens a
   prepared introduction path.
4. `BuildMutualActionPlan` works backward from launch, exposing that security review makes the requested
   signature date impossible unless evidence is delivered this week.
5. After the meeting, `ReviewMeetingCommitments` proposes updates. The seller rejects one inferred
   commitment and confirms the rest.
6. `SimulateCommercialOffer` finds a ramped structure that protects margin; finance and legal inspect
   the exception in `ReviewDealException` and approve with a condition.
7. The manager uses `InspectForecastCommit` to accept the deal into commit based on buyer evidence and
   the now-credible critical path. Revenue Command shows the resulting forecast bridge.

### Outcome measures

Seller preparation time, administrative time, opportunity data freshness, stakeholder coverage,
next-step quality, stage aging, sales-cycle length, forecast error, slip rate, win rate, discount and
margin, approval cycle time, and commitments completed on time.

## Sample 3: Procurement and Supplier Command Center

### Product thesis

**An employee describes the business outcome, not a purchasing form. The agent assembles compliant
options and supplier evidence; procurement and budget owners compare consequences, govern exceptions,
and turn intent into an auditable commitment.**

Procurement is ideal for agent UX because it combines fragmented demand, catalogs, policies, budgets,
contracts, suppliers, risk, sustainability, approvals, and invoices. SAP's current spend-management
baseline spans strategy, sourcing, contracts, buying, supplier management, and invoicing, with explicit
policy checks, audit rules, approvals, and human oversight. The sample should modernize that operating
model without claiming to replace source-to-pay suites.

### Audiences and full-screen lenses

| Lens | Persona | Core question |
| --- | --- | --- |
| My Requests | Employee or budget requester | What is the fastest compliant path to the outcome I need? |
| Sourcing Workbench | Buyer or category manager | Which demand can be combined, and which supplier creates the best total value? |
| Supplier 360 | Supplier/risk/contract owner | Where are performance, obligation, concentration, or continuity risks changing? |
| Spend Command | Procurement and finance leader | Where are savings, leakage, cycle-time, and risk interventions most valuable? |

### Target operational components

| Component | Type | Distinct inline job and dynamic behavior |
| --- | --- | --- |
| `CreatePurchaseIntent` | Submit/create | Converts desired outcome, timing, quantity, location, budget, and constraints into a structured request and suggests catalog, contract, sourcing, or exception paths. |
| `CompareBuyingOptions` | Information/analysis | Compares approved catalog, existing contracts, reuse, suppliers, lead time, total cost, policy, and sustainability; priorities change the ranking transparently. |
| `CheckPurchasePolicy` | Information/analysis | Shows applicable thresholds, required evidence, preferred channels, conflicts, approvals, and explainable pass/warn/block results. |
| `ReviewPurchaseRequest` | Review/decision | Presents need, alternatives, budget consequence, policy, risk, and downstream commitments before approve, return, or decline. |
| `AggregateDemand` | Information/analysis | Finds similar requests across teams and regions; users inspect the cohort and model consolidation savings against timing impact. |
| `BuildSourcingEvent` | Submit/create | Creates requirements, weighted criteria, invited suppliers, timetable, safeguards, and review package from approved demand. |
| `CompareSupplierBids` | Information/analysis | Normalizes bids across price, total cost, lead time, quality, risk, sustainability, and exceptions; weight changes redraw the result and sensitivity. |
| `ReviewSupplierAward` | Review/decision | Shows bid evidence, scoring provenance, conflicts, risk, budget, and award consequences before an explicit, auditable decision. |
| `ExploreSupplier360` | Information/analysis | Coordinates contracts, spend, performance, incidents, obligations, geography, dependencies, financial risk, and relationship owners. |
| `ReviewContractRenewal` | Review/decision | Compares use, value, benchmark, obligations, risk, alternatives, notice date, and negotiation scenarios before renew, renegotiate, consolidate, or exit. |
| `DetectSpendLeakage` | Information/analysis | Finds off-contract, duplicate, fragmented, price-variance, and maverick-spend patterns and ties each opportunity to accountable action. |
| `TrackSupplierRisk` | Information/analysis | Maps concentration, location, sub-tier dependency, delivery, quality, cyber, financial, and compliance signals with scenario filters. |
| `ResolveInvoiceException` | Review/decision | Reconciles purchase order, receipt, invoice, tax, quantity, and price evidence; proposes bounded actions and records human resolution. |
| `ExploreSpendPerformance` | Information/analysis | Connects savings, realized value, cycle time, compliance, risk, supplier performance, and cash impact for leadership. |

### Signature UX moments

- **Intent-to-path navigator:** one request visibly branches to catalog buy, existing contract, sourcing,
  reuse, or policy exception as the facts change.
- **Total-value supplier landscape:** bid bubbles combine total cost, risk, quality, lead time, and
  sustainability; changing criteria exposes sensitivity rather than hiding it behind a score.
- **Policy explainability rail:** every pass, warning, block, and approval requirement cites the rule,
  evidence, threshold, owner, and remediation.
- **Supply-risk map and dependency graph:** geography and sub-tier relationships reveal concentration
  and disruption impact, paired with exact data and accessible alternatives.
- **Spend leakage river:** addressable spend flows from fragmented or off-contract behavior into named
  interventions and verified realized value.

### Connected keynote journey

1. A regional operations lead asks for 600 rugged devices before a new-store launch.
2. `CreatePurchaseIntent` recognizes an existing contract but also finds similar requests in three
   regions through `AggregateDemand`.
3. The buyer compares buying now against a consolidated sourcing event; the savings, timing, emissions,
   and launch-risk consequences remain visible.
4. `BuildSourcingEvent` creates the reviewed requirements and safeguards. `CompareSupplierBids` reveals
   that the lowest unit price has the highest logistics and concentration risk.
5. The category manager changes decision weights and inspects sensitivity rather than accepting a
   black-box ranking.
6. `ReviewSupplierAward` records an auditable split award after finance and risk review the evidence.
7. A later invoice mismatch is reconciled in `ResolveInvoiceException`; Spend Command shows cycle time,
   avoided cost, compliance, and reduced concentration exposure.

### Outcome measures

Request-to-order and source-to-award cycle time, user effort, compliant-channel adoption, contract
coverage, maverick spend, competed spend, negotiated and realized savings, approval time, supplier
concentration, on-time delivery, defect rate, invoice exception rate, and exception-resolution time.

## Shared product architecture

### One connected graph per sample

Each sample needs a coherent deterministic domain graph, not isolated fixtures:

- Customer: accounts, contacts, products, entitlements, interactions, cases, incidents, knowledge,
  service commitments, concessions, and outcomes.
- Revenue: accounts, contacts, opportunities, activities, meetings, requirements, competitors,
  commitments, proposals, commercial scenarios, approvals, forecasts, and outcomes.
- Procurement: requests, budgets, policies, catalogs, contracts, suppliers, bids, purchase orders,
  receipts, invoices, risks, obligations, and realized value.

Confirmed session receipts must update downstream personas and views. The keynote should be repeatable
from a fixed seed and relative dates, with a reset control for presenters.

### Component contract

- Copilot resolves intent and provides bounded parameters; the component resolves trusted records.
- Prompt context may preselect or prefill but must never silently perform consequential actions.
- Calculations, permissions, policy checks, validation, and workflow transitions are deterministic.
- Agent recommendations show source, freshness, assumptions, confidence, and contrary evidence where
  those affect a decision.
- Submit and review flows use draft -> validation -> review -> explicit confirmation -> semantic receipt.
- Users can edit or reject individual proposed actions rather than accept a monolithic agent plan.
- Every chart has exact values and an accessible table; status never relies on color alone.
- Inline remains complete for one bounded job at narrow width. Full screen preserves exact state and
  adds comparison, coordination, and broader workflow context.
- Real integrations sit behind typed service interfaces. A mock/live switch must not require UI forks.

### Responsible agent UX

Global adoption requires calibrated trust, not theatrical autonomy. The samples must visibly distinguish:

| State | UX treatment |
| --- | --- |
| Verified source fact | Source, timestamp, system, and direct inspection path |
| Deterministic calculation | Inputs, formula/logic summary, and reproducible output |
| Agent inference | “Inferred” label, confidence, evidence for/against, and edit/reject control |
| Recommendation | Alternatives and consequences; never styled as a completed decision |
| Human decision | Named actor, rationale, timestamp, authority, and confirmation receipt |
| Automated action | Preview, scope, policy/permission check, execution status, and recovery path |

Do not use autonomous language when the mock only changes session state. Do not imply that a front-end
control enforces production authorization. Document where a real CRM, ERP, identity, policy, or records
system must enforce the operation.

### Global-by-design requirements

- Externalize all strings; validate expansion and right-to-left layouts before release.
- Use locale-aware date, time, number, currency, tax, and address formatting.
- Avoid US-specific job titles, credit conventions, tax assumptions, currencies, and legal rules in
  the core data model. Put jurisdiction-specific behavior behind policy packs.
- Include names, locations, languages, currencies, and business structures from multiple regions
  without stereotyping. Localization must affect sample data and workflows, not only labels.
- Make time-zone handoffs, regional ownership, data residency indicators, and language-aware customer
  or supplier communications visible where relevant.
- Test keyboard-only use, screen readers, reduced motion, forced colors, 200% zoom, narrow inline,
  mobile full screen, light/dark themes, and long translated strings.

## Build sequence and scope control

### Recommended order

1. **Customer Resolution Center:** establishes the strongest missing business category and the clearest
   human-agent partnership under time and empathy pressure.
2. **Revenue Deal Room:** reuses proven people, timeline, evidence, scenario, and approval primitives
   while demonstrating top-line growth and evolving the existing sales story.
3. **Procurement and Supplier Command Center:** reuses decision and scenario foundations, then adds the
   deepest policy, audit, supplier-network, and financial-control story.

### Delivery gates for each sample

| Gate | Required evidence |
| --- | --- |
| 0. Product contract | One-sentence business story, named BDM outcome, personas, lifecycle, component ownership, explicit non-goals, and competitor baseline approved. |
| 1. Connected domain | Typed graph, deterministic seed, relative dates, state transitions, calculations, policy boundaries, and keynote record approved before component multiplication. |
| 2. UX proof | Three signature inline experiences and one exact full-screen continuation validated at narrow and wide sizes before building the catalog. |
| 3. End-to-end workflow | One cross-role journey runs through submission/analysis, human review, confirmation, receipt, and downstream state change. |
| 4. Catalog completion | Only distinct tools are added; capability explorer, conversation starters, safe previews, loading/empty/error states, and mock reset are complete. |
| 5. Quality | Unit/integration tests, generated plugin validation, accessibility, responsive screenshots, theming, console, audit, and package checks pass. |
| 6. Global and integration readiness | Localization/RTL, multi-currency/time-zone data, permission documentation, typed connector seams, privacy boundaries, and no-live-data demo path pass. |
| 7. GA proof | Five-minute keynote, ten-minute technical demo, deployment package, telemetry plan, measured outcome story, screenshots, README, provenance, and support owner approved. |

### Scope guardrails

- Target the smallest role-complete catalog rather than an arbitrary count. The reviewed plans currently
  require **20 operational components for Customer Resolution, 20 for Revenue Deal Room, and 21 for
  Procurement**, plus one capability explorer per sample. A component earns independent routing only
  when its role, trigger, decision/job, adaptive composition, or guarded outcome is materially distinct;
  calculations, lookups, charts, and supporting detail remain modules inside the owning experience.
- Build the connected keynote path and three signature visuals first. Do not begin with all manifests.
- Do not reproduce every feature in Salesforce, Dynamics 365, ServiceNow, SAP, Coupa, or another suite.
- Do not build generic home dashboards, generic chat wrappers, or separate cards for calculations that
  belong inside an owning workflow.
- Do not repeat employee IT support, personal productivity, basic approvals, or passive KPI filtering.
- Use mock-first, integration-ready services. One later live vertical slice is more credible than many
  partially implemented connectors.

## Portfolio-level GA success criteria

The three samples collectively pass only when they demonstrate all of the following:

1. **Outcome coverage:** one retention, one revenue, and one cost/risk story, each with baseline and
   post-action measures.
2. **Interaction range:** information analysis, editable creation, consequential review, simulation,
   cross-role handoff, and confirmed action are all represented.
3. **Intent variation:** at least five prompts per operational component materially change entity,
   scope, evidence, calculation, geometry, draft, or workflow state.
4. **Context continuity:** every expandable component preserves selected record, filters, scenario,
   draft, and current step.
5. **Human control:** no consequential demo action can occur without visible evidence, validation,
   authority context, and explicit confirmation.
6. **Trust:** facts, calculations, inferences, recommendations, human decisions, and automated actions
   are distinguishable at a glance.
7. **Global readiness:** the same demo works credibly in at least three locales, including one RTL
   locale, without layout breakage or US-only process assumptions.
8. **Technical reuse:** shared primitives are limited to genuinely common host, accessibility, state,
   evidence, confirmation, and test contracts; each product retains a distinct domain visual language.
9. **Demo reliability:** offline packages reset deterministically and complete the keynote with no
   network dependency, console errors, clipped content, or inaccessible controls.
10. **Integration credibility:** each README maps mock services to likely systems of record and states
    where production authorization, audit, retention, privacy, and data residency must be enforced.

## Candidates deliberately deferred

| Candidate | Why not in the first three | Revisit when |
| --- | --- | --- |
| Compliance Control Tower | Important and globally relevant, but regulation varies heavily and a weak mock can overclaim assurance. Procurement first proves explainable policy, evidence, and audit UX in a more universal workflow. | Policy packs, evidence provenance, records retention, and regional legal review can be modeled credibly. |
| Finance Close and Cash Command | Hard-dollar value and broad prevalence, but close/treasury controls require deeper accounting accuracy and segregation-of-duties design. | A finance subject-matter owner and realistic ledger/subledger graph are available. |
| Supply Chain Resilience Center | Visually powerful and strategically important, but integration and vertical assumptions make it harder to ship as a globally portable GA sample. | Procurement's supplier graph and risk primitives are proven. |
| Change and Adoption Orchestrator | Strong Microsoft 365 fit and real global need, but the immediate economic story is less vivid than retention, revenue, and spend. | GA needs a companion implementation/adoption scenario or product telemetry APIs are ready. |
| Workforce Capacity and Skills Marketplace | Common need, but the gallery is already HR-heavy and the Project Tracker covers capacity. | The sample can focus on internal mobility and skills evidence rather than another employee dashboard. |

## Research basis

Research was reviewed on 2026-08-28. Statistics below are evidence for prioritization, not promises of
sample outcomes. Vendor pages establish common product/workflow baselines; vendor performance claims
must not be repeated as neutral benchmarks without independent validation.

### Independent and broad research

- [Microsoft 2025 Work Trend Index](https://www.microsoft.com/en-us/worklab/work-trend-index/2025-the-year-the-frontier-firm-is-born)
  (published 2025-04-23): survey of 31,000 knowledge workers across 31 markets, plus Microsoft 365
  telemetry and qualitative research. Relevant findings include 81% of leaders expecting moderate or
  extensive agent integration in 12–18 months; 82% expecting digital labor to expand capacity; 80% of
  respondents lacking time or energy; and customer service among the top three accelerated-investment
  functions. It explicitly frames the future as AI-operated but human-led.
- [Stanford HAI 2025 AI Index](https://hai.stanford.edu/ai-index/2025-ai-index-report): reports that 78%
  of organizations used AI in 2024, up from 55% in 2023; also notes uneven responsible-AI practice and
  persistent complex-reasoning limits, supporting deterministic controls and human review.
- [World Economic Forum Future of Jobs Report 2025](https://www.weforum.org/publications/the-future-of-jobs-report-2025/)
  (published 2025-01-07): represents more than 1,000 employers, 14 million workers, 22 industry
  clusters, and 55 economies. It supports the need for workflows and skills that remain portable
  across industries and regions.

### Current workflow and market baselines

- [Salesforce State of Service](https://www.salesforce.com/resources/research-reports/state-of-service/):
  the current report landing page states that 79% of service professionals are investing in agentic
  AI. Treat this as vendor research; use it directionally alongside the cross-market Microsoft data.
- [Salesforce Service Cloud](https://www.salesforce.com/service/cloud/) and
  [ServiceNow Customer Service Management](https://www.servicenow.com/products/customer-service-management.html):
  establish common service baselines including case management, unified customer context, knowledge,
  omni-channel work, guided resolution, incidents, collaboration, automation, and analytics.
- [Salesforce State of Sales](https://www.salesforce.com/resources/research-reports/state-of-sales/):
  the 2026 landing page says nine in ten sales teams use agents or expect to within two years. Treat
  this as vendor research. Its stronger design signal is agent use across the cycle from planning to
  quoting.
- [Salesforce Sales Cloud](https://www.salesforce.com/sales/cloud/): establishes the sales-platform
  baseline of activity, lead, account, opportunity, pipeline, forecast, workflow, quote, contract
  approval, analytics, and collaboration.
- [SAP Spend Management](https://www.sap.com/products/spend-management.html): establishes the current
  source-to-pay baseline across strategy, sourcing, contracts, buying, invoicing, supplier management,
  risk, compliance, spend visibility, policy checks, audit rules, approvals, and human oversight.

### Repository evidence

- [`samples/zava-innovation-portfolio/README.md`](samples/zava-innovation-portfolio/README.md): reference
  business story, operating model, audiences, component catalog, dynamic inline contract, and exact
  full-screen continuation.
- [`samples/executive-sales-dashboard/README.md`](samples/executive-sales-dashboard/README.md): confirms
  that current sales coverage is an offline KPI and chart dashboard, leaving deal execution open.
- [`samples/copilot-my-approvals/README.md`](samples/copilot-my-approvals/README.md): confirms that live
  generic approval read/write is already demonstrated and should be embedded, not repeated.
- [`samples/README.md`](samples/README.md) and the 20 sample-level READMEs: repository scenario inventory.

## Final decision

Build **Customer Resolution Center**, **Revenue Deal Room**, and **Procurement and Supplier Command
Center**, in that order. These are not three variations of a dashboard. They are three high-value
enterprise systems of action that let Copilot bring the right application UX to the current intent,
while deterministic components keep evidence, simulation, judgment, approval, and accountability in
human hands.