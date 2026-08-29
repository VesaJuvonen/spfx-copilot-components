# Zava Revenue Deal Room

> [!IMPORTANT]
> **Status: TO BE DONE - PRODUCT AND UX PLAN ONLY.** This folder is a pre-implementation specification
> for review. Do not scaffold components, install dependencies, generate GUIDs, create sample metadata,
> or add design/runtime assets until this plan is approved and synchronized to GitHub.

> **Planned sample type:** self-contained, offline-first SPFx Copilot Components showcase<br>
> **Planned catalog:** 20 operational inline components + 1 capability explorer<br>
> **Planned full-screen model:** 4 role-aware lenses in one shared revenue application<br>
> **Reference quality bar:** [Zava Innovation Hub](../zava-innovation-portfolio/README.md) and its
> [agentic creation rules](../zava-innovation-portfolio/agentic-creation-rules.md)

## Business story

**A seller names the account and desired outcome. The agent turns scattered relationship evidence into
an inspectable deal strategy; the revenue team commits to actions, tests commercial choices, and closes
with a forecast it can defend.**

The current repository already demonstrates sales KPIs and filters. This sample must move from passive
reporting to active opportunity execution:

1. A seller names an account, opportunity, meeting, or desired outcome in Copilot.
2. Copilot selects one bounded experience and initializes trusted CRM-shaped and Microsoft 365 context.
3. The component assembles buyer evidence, relationship signals, commitments, commercial constraints,
   and risks for the exact job.
4. The seller or specialist edits assumptions, accepts or rejects proposed changes, and tests scenarios.
5. Stage, quote exception, contractual exception, and forecast decisions remain visible human decisions.
6. Full screen preserves the same account, deal, stakeholders, scenario, plan, and review step.
7. Confirmed session receipts update the deal team, manager forecast, commercial desk, and revenue view.

The sample complements CRM rather than claiming to replace it. CRM-shaped records remain the system of
record; Copilot becomes the intent-led workspace across CRM facts, meetings, mail, files, and people.

## Market-informed product position

Public enterprise sales-platform baselines consistently cover account and contact management, activity
capture, lead/opportunity qualification, pipeline, forecasting, relationship intelligence, engagement,
quotes, contracts, approvals, workflow, and analytics. References include
[Salesforce Sales Cloud](https://www.salesforce.com/sales/cloud/),
[Microsoft Dynamics 365 Sales](https://www.microsoft.com/en-us/dynamics-365/products/sales), and the
[Salesforce State of Sales](https://www.salesforce.com/resources/research-reports/state-of-sales/).
The latter is vendor research and is used directionally, not as an independent benchmark.

This sample modernizes that baseline through bounded, inspectable agent UX:

| Traditional sales pattern | Copilot Components modernization |
| --- | --- |
| Sellers navigate account, opportunity, activity, contact, quote, and forecast screens. | The seller states the outcome; one purpose-built component assembles the needed records and action. |
| AI creates a deal summary or score with little provenance. | Buyer evidence, seller opinion, stale activity, agent inference, and missing proof are visibly separated. |
| Stakeholders are a contact list. | An interactive buying-committee map reveals authority, stance, influence paths, relationship strength, and missing access. |
| Close plans are static task lists. | A mutual action plan joins buyer and seller commitments; dependencies redraw the credible close range. |
| Discount approval is detached from deal strategy. | Commercial scenarios show revenue, margin, customer outcome, approval path, and forecast consequence before review. |
| Forecast categories depend on seller confidence. | Managers inspect evidence, movement, critical path, risk, and scenario range before accepting commit. |

Do not use Gartner branding, proprietary quadrant language, or market-leadership claims. Industry
expectations define workflow completeness; the sample demonstrates a differentiated interaction model.

## Showcase objectives

| Objective | GA proof |
| --- | --- |
| Upgrade sales from dashboard to system of action | Qualification, stakeholder mapping, meeting preparation, commitments, proposal shaping, commercial simulation, exception review, and forecast inspection are actionable inline. |
| Make buyer evidence visible | Every forecast and recommendation distinguishes verified buyer evidence from seller opinion, stale activity, and inference. |
| Connect collaboration to revenue | Meeting and mail-shaped context becomes reviewed CRM updates and mutual commitments, never silent writes. |
| Put commercial judgment in context | Discount, term, ramp, services, and probability changes recalculate margin, authority, approval, and forecast consequences. |
| Preserve exact continuation | Expand retains account, opportunity, selected stakeholder, risk, plan, scenario, and decision draft. |
| Tell one cross-role story | A global expansion opportunity moves from risk and relationship gap to mutual plan, offer, exception approval, and defensible commit. |
| Deliver a distinct visual identity | Influence orbit, commitment runway, evidence ledger, commercial contour, and forecast bridge become signature visuals. |

## End-to-end operating model

| Phase | Business job | Agentic experience | Owner |
| --- | --- | --- | --- |
| 1. Understand | Assemble account priorities and relationship history. | Grounded brief with sources, freshness, open commitments, whitespace, and risks. | `BuildAccountBrief` |
| 2. Qualify | Decide whether and how to pursue. | Need, authority, urgency, value, competition, fit, and evidence gaps precede human stage decision. | `QualifyOpportunity` |
| 3. Mobilize | Build access to the buying group. | Influence graph shows roles, stance, authority, relationship strength, missing contacts, and internal owners. | `MapBuyingCommittee` |
| 4. Diagnose | Identify what can derail the outcome. | Evidence-ranked risk combines inactivity, single-threading, criteria, competition, legal, delivery, and next steps. | `GetDealRisk` |
| 5. Engage | Prepare the next customer interaction. | Briefing ties attendees, goals, commitments, objections, proof, and questions to one meeting. | `PrepareCustomerMeeting` |
| 6. Commit | Convert intent into a shared path. | Buyer/seller milestones, dependencies, owners, evidence, and critical path form a mutual action plan. | `BuildMutualActionPlan` |
| 7. Capture | Turn a meeting into reviewed business updates. | Each proposed CRM field and commitment can be accepted, edited, assigned, or rejected. | `ReviewMeetingCommitments` |
| 8. Propose | Shape an outcome-led solution. | Requirements, proof, architecture, adoption, value, exclusions, and owners form a reviewed proposal. | `ShapeSolutionProposal` |
| 9. Model | Test the commercial structure. | Quantity, term, ramp, discount, services, currency, and probability recalculate value and consequences. | `SimulateCommercialOffer` |
| 10. Govern | Review a nonstandard commercial or contractual request. | Finance, legal, security, and sales inspect one evidence package and record conditions. | `ReviewDealException` |
| 11. Forecast | Commit only what evidence supports. | Opportunity movement, buyer proof, critical path, risk, and range precede forecast decision. | `InspectForecastCommit` |
| 12. Lead | Improve pipeline quality and intervention. | Leaders inspect coverage, aging, evidence quality, concentration, slip risk, and intervention impact. | `ExplorePipelineQuality` |

## Audiences and full-screen information architecture

| Lens | Primary persona | First useful state | Work and decisions |
| --- | --- | --- | --- |
| **My Deals** | Megan Bowen, account executive | Prioritized deals, relationship gaps, commitments due, meeting preparation, and next best owned action. | Prepare, qualify, update, plan, propose, and request exceptions. |
| **Deal Room** | Megan plus cross-functional pursuit team | One opportunity with win strategy, buying committee, risk, mutual action plan, evidence, and team ownership. | Coordinate access, proof, commitments, solution, and close path. |
| **Commercial Desk** | Miriam Graham, finance partner, with legal/security reviewers | Exception queue, scenario comparison, margin/value, policy, terms, conditions, and authority. | Review discount, ramp, terms, security, delivery, and quote exceptions. |
| **Revenue Command** | Joni Sherman, chief revenue officer | Evidence-weighted forecast, pipeline quality, movement bridge, concentration, interventions, and accountability. | Inspect commit, challenge risk, assign intervention, and verify outcome. |

**My Deals** starts with owned actions, not a wall of KPIs. **Deal Room** is the keynote workspace and
coordinates one selected stakeholder/risk/commitment across every region. **Commercial Desk** uses a
queue plus one immersive scenario review; it must not become a generic approvals page. **Revenue
Command** emphasizes forecast evidence and intervention, not duplicate regional sales charts.

## Inline component portfolio

Target: **20 operational components plus one safe capability explorer**. The expanded catalog covers
account executive, sales development, deal strategy, solution engineering, value engineering,
executive sponsorship, finance, legal/security, sales management, revenue operations, and customer
success handoff.

| Model | Count | Contract |
| --- | ---: | --- |
| Information / interactive analysis | 10 | Immediate answer plus material selection, filtering, comparison, or chart changes. |
| Submit / create | 6 | Prompt-prefilled draft -> validation -> review -> explicit confirmation -> session receipt. |
| Review / decision | 4 | Record/queue -> evidence and consequence -> decision draft -> confirmation -> receipt. |
| Education / discovery | 1 | Search/filter all operations, copy prompts, and safely preview without action confirmation. |

| # | Component | Model | Prompt properties | First useful inline state | Material interaction and action | Full-screen continuation |
| ---: | --- | --- | --- | --- | --- | --- |
| 1 | `BuildAccountBrief` | Information | `accountId`, `period`, `priority`, `sourceTypes`, `selectedEventId` | Account goals, relationship pulse, products, opportunities, recent moments, open commitments, whitespace, and sourced risks. | Period/priority/source filters rebuild evidence; selection opens source freshness and owner. | `deal-room/account-brief`; preserves account, filters, event, and evidence. |
| 2 | `QualifyOpportunity` | Review | `opportunityId`, `proposedStage`, `qualificationFramework`, `selectedCriterion` | Need, authority, urgency, value, competition, fit, evidence completeness, gaps, and stage consequence. | Edit criterion confidence and evidence; advance/hold/disqualify requires rationale, review, confirmation, and receipt. | `my-deals/qualification`; preserves opportunity, criterion, evidence, and decision draft. |
| 3 | `MapBuyingCommittee` | Information | `opportunityId`, `contactIds`, `roleFilter`, `stanceFilter`, `selectedContactId` | Influence graph with buying role, stance, authority, relationship strength, last evidence, missing access, and internal owner. | Add/resolve role, filter, select, assign relationship owner, and test introduction path; graph redraws. | `deal-room/stakeholders`; preserves graph filters, selection, and proposed ownership. |
| 4 | `GetDealRisk` | Information | `opportunityId`, `riskCategory`, `severity`, `period`, `selectedRiskId` | Ranked risks with evidence for/against, age, consequence, owner, and recommended bounded action. | Filters rerank; selection coordinates timeline and source; assigning mitigation requires reviewed session action. | `deal-room/risks`; preserves filters, selected risk, and mitigation draft. |
| 5 | `PrepareCustomerMeeting` | Information | `meetingId`, `opportunityId`, `attendeeIds`, `objective`, `duration`, `selectedTopicId` | Attendee roles/stance, meeting objective, open commitments, likely objections, approved proof, questions, and agenda. | Reorder agenda, select proof, add question, change objective; export/copy remains reviewed. | `my-deals/meeting-prep`; preserves meeting, attendees, objective, agenda, and topic. |
| 6 | `BuildMutualActionPlan` | Submit | `opportunityId`, `targetCloseDate`, `customerLaunchDate`, `milestones`, `ownerScope` | Buyer and seller commitments on a dependency runway with owner, due date, evidence, status, and credible close range. | Add/edit/reorder dependencies and dates; changes recalculate critical path and slip risk. Confirm creates session plan receipt. | `deal-room/mutual-plan`; preserves plan draft, selected milestone, date scenario, and step. |
| 7 | `ReviewMeetingCommitments` | Review | `meetingId`, `opportunityId`, `proposedChanges`, `selectedChangeId` | Side-by-side meeting evidence and proposed CRM fields/commitments, each labeled fact or inference. | Accept/edit/reject/assign each change; bulk confirm prohibited until every inference is reviewed. Receipt updates mock graph. | `my-deals/meeting-review`; preserves evidence, decisions per change, and review step. |
| 8 | `ShapeSolutionProposal` | Submit | `opportunityId`, `audience`, `outcomes`, `requirements`, `proofIds`, `currency` | Editable proposal architecture: outcomes, requirements, solution, proof, value, adoption, risks, exclusions, and owners. | Reorder sections, resolve unsupported claims, choose proof, change assumptions; review precedes draft receipt. | `deal-room/proposal`; preserves proposal draft, evidence, validation, and step. |
| 9 | `SimulateCommercialOffer` | Information | `opportunityId`, `quantity`, `termMonths`, `discount`, `ramp`, `services`, `currency`, `probability` | Editable scenario beside revenue, ARR, margin, customer value, approval level, close probability, and forecast impact. | Inputs recalculate contour and compare up to three named scenarios. “Request review” creates a draft, never approval. | `commercial-desk/scenario`; preserves inputs, comparisons, selected metric, and scenario name. |
| 10 | `ReviewDealException` | Review | `exceptionId`, `opportunityId`, `exceptionType`, `proposedDecision`, `conditionText` | Customer need, requested exception, commercial impact, policy, precedent, risks, approvers, and alternatives. | Approve with conditions/return/decline requires authority, rationale, review, confirmation, and receipt. | `commercial-desk/exception`; preserves exception, scenario, evidence, conditions, and decision step. |
| 11 | `InspectForecastCommit` | Review | `opportunityId`, `forecastPeriod`, `proposedCategory`, `selectedEvidenceId` | Deal movement, verified buyer evidence, seller judgment, critical path, risk, range, and forecast-category consequence. | Select evidence, change scenario/category, request clarification, accept/change commit through confirmed manager decision. | `revenue-command/forecast-review`; preserves period, opportunity, evidence, category, and draft. |
| 12 | `ExplorePipelineQuality` | Information | `period`, `region`, `segment`, `owner`, `stage`, `metric`, `selectedOpportunityId` | Coverage, conversion, aging, evidence quality, concentration, slip risk, and forecast bridge with named interventions. | Filters rebuild models; chart/table mode and selection coordinate exact values and opportunity detail. | `revenue-command/pipeline`; preserves filters, metric, visual mode, and selection. |
| 13 | `DiscoverAccountOpportunity` | Information | `accountId`, `period`, `productFamily`, `region`, `signalType`, `selectedSignalId` | Opportunity canvas combining account priorities, product/adoption whitespace, service signals, organizational change, intent evidence, and potential outcome. | Filters and selected signals reshape opportunity themes, evidence strength, likely stakeholders, and suggested discovery question; no lead is created automatically. | `my-deals/opportunity-discovery`; preserves account, signals, theme, filters, and selection. |
| 14 | `ResearchCompetitivePosition` | Information | `opportunityId`, `competitorIds`, `dimension`, `period`, `selectedClaimId` | Competitive battleboard separating verified customer evidence, public facts, seller observations, strengths, gaps, landmines, and approved proof. | Selecting competitor/dimension changes comparison and countermove options; unsupported claims are excluded from customer-facing reuse. | `deal-room/competition`; preserves opportunity, competitor, dimension, claim, and evidence. |
| 15 | `CoachDealStrategy` | Information | `opportunityId`, `coachingFocus`, `sellerId`, `period`, `selectedActionId` | Coaching workspace with deal pattern, evidence gaps, questions, risks, prior movement, seller choices, and a small set of explainable strategy plays. | Seller tests a play and sees stakeholder, critical-path, evidence, and forecast consequence; assigning a coaching action is reviewed. | `my-deals/coaching`; preserves deal, focus, selected play, evidence, and action draft. |
| 16 | `CreateExecutiveEngagementPlan` | Submit | `opportunityId`, `executiveIds`, `customerContactIds`, `objective`, `timing`, `talkingPoints` | Sponsor plan mapping executive-to-executive relationships, objective, value message, proof, sensitivities, meeting path, owner, and follow-up. | Change sponsor/contact/objective to update fit, conflict, relationship coverage, and preparation needs. Confirm creates a reviewed engagement plan. | `deal-room/executive-engagement`; preserves relationships, plan draft, selected sponsor, and step. |
| 17 | `TrackMeetingFollowUp` | Information | `opportunityId`, `meetingId`, `status`, `owner`, `selectedCommitmentId` | Buyer/seller commitment runway with source, owner, due date, evidence, dependency, at-risk/overdue state, and forecast consequence. | Filters change the runway; mark received/at risk/complete requires evidence and reviewed action. Overdue commitments can be escalated with context. | `deal-room/commitments`; preserves deal, meeting, filters, selected commitment, and action draft. |
| 18 | `BuildValueCase` | Submit | `opportunityId`, `outcomes`, `baseline`, `benefitDrivers`, `costs`, `currency`, `timeHorizon` | Joint value model with baseline, outcome tree, benefit drivers, costs, assumptions, cash flow, payback, sensitivity, evidence, and owner. | Editing assumptions recalculates value range, payback, confidence, and evidence gaps. Review creates a value-case draft receipt. | `deal-room/value-case`; preserves assumptions, scenario, selected driver, evidence, and step. |
| 19 | `ReviewProposalReadiness` | Review | `opportunityId`, `proposalId`, `reviewScope`, `selectedFindingId`, `proposedOutcome` | Readiness gate covering customer outcomes, requirements traceability, approved proof, commercial alignment, legal/security dependencies, delivery capacity, and unresolved claims. | Reviewers accept/edit findings and choose ready/ready with conditions/return, with owners, due dates, rationale, confirmation, and receipt. | `commercial-desk/proposal-readiness`; preserves proposal, findings, conditions, and decision draft. |
| 20 | `PlanCustomerSuccessHandoff` | Submit | `opportunityId`, `successOwnerId`, `outcomes`, `milestones`, `risks`, `handoffDate` | Post-sale success canvas connecting sold outcomes, contract commitments, stakeholders, adoption milestones, unresolved risks, measures, and ownership. | Editing milestones/owners changes readiness, dependency, and first-value date. Confirm creates a reviewed handoff plan without closing the opportunity. | `deal-room/success-handoff`; preserves outcomes, owners, milestones, risks, and step. |
| 21 | `ExploreAgentCapabilities` | Education | `query`, `audience`, `operation`, `featuredIntent` | Searchable catalog with realistic prompts and safe previews for all 20 operations. | Search, filter, copy, and preview; review/submit previews stop before confirmation. | Isolated `education/capabilities`; preserves query, filters, and featured intent. |

### Ownership boundaries

- Account brief assembles relationship context; meeting preparation owns one upcoming interaction.
- Qualification owns pursue/stage judgment; forecast review owns period commit judgment.
- Buying committee owns people/influence; deal risk owns evidence-ranked threats and mitigations.
- Mutual action plan owns customer/seller commitments; meeting review proposes updates into that plan.
- Proposal owns outcome narrative and proof; commercial simulation owns price/term economics.
- Commercial simulation never approves; exception review owns authority, conditions, and decision.
- Pipeline Quality owns aggregate leadership analysis and deep-links to selected operational work.

## Role and operation coverage

| Role | Moment in the revenue process | Primary inline components | UX forms that earn separate routing |
| --- | --- | --- | --- |
| Sales development / account executive | Discover, understand, qualify, prepare, follow up | `DiscoverAccountOpportunity`, `BuildAccountBrief`, `QualifyOpportunity`, `PrepareCustomerMeeting`, `ReviewMeetingCommitments`, `TrackMeetingFollowUp` | Signal canvas, sourced brief, qualification gate, meeting brief, evidence reconciliation, commitment runway. |
| Deal strategist / manager | Diagnose, coach, mobilize influence, govern close | `GetDealRisk`, `CoachDealStrategy`, `MapBuyingCommittee`, `CreateExecutiveEngagementPlan`, `InspectForecastCommit` | Risk stack, strategy play simulator, influence graph, sponsor plan, forecast evidence review. |
| Solution and value engineering | Prove the outcome and solution | `BuildValueCase`, `ShapeSolutionProposal`, `ReviewProposalReadiness` | Editable value model, evidence-led proposal studio, cross-functional readiness gate. |
| Finance / legal / security | Shape economics and govern exceptions | `SimulateCommercialOffer`, `ReviewDealException`, `ReviewProposalReadiness` | Commercial contour, authority-aware exception review, readiness findings and conditions. |
| Revenue operations / executive | Inspect pipeline quality and intervention | `ExplorePipelineQuality`, `InspectForecastCommit`, `CoachDealStrategy` | Forecast bridge, evidence distribution, named intervention and coaching action. |
| Customer success | Preserve sold outcomes through handoff | `PlanCustomerSuccessHandoff`, `BuildMutualActionPlan`, `TrackMeetingFollowUp` | Outcome handoff canvas, shared critical path, evidence-backed commitment tracker. |

## Adaptive UX demo choreography

| Beat | Prompt and role | Component shape | Adaptation that the audience can see |
| ---: | --- | --- | --- |
| 1 | Seller: “Where is the next growth opportunity in Contoso?” | Account signal canvas | Product/adoption/service signals become an opportunity theme; selecting evidence changes likely outcomes and discovery questions. |
| 2 | Seller: “Should we pursue this expansion?” | Qualification review | The exploratory canvas becomes a criteria/evidence gate with advance, hold, or disqualify consequences. |
| 3 | Deal lead: “Who can move the decision?” | Buying-committee graph | Contacts become influence, stance, authority, access gaps, and owned introduction paths. |
| 4 | Manager: “What strategy improves our position?” | Coaching play simulator | Choosing executive access, technical proof, or timeline reset changes risks, stakeholders, critical path, and forecast evidence. |
| 5 | Value engineer: “Prove the customer's outcome.” | Financial value model | Conversation facts become editable baselines, benefit drivers, sensitivity, payback, confidence, and missing evidence. |
| 6 | Solution architect: “Shape the proposal.” | Proposal studio | The value model becomes requirements, solution, proof, adoption, exclusions, and owners; readiness review later changes it into findings and conditions. |
| 7 | Finance: “Protect margin while improving adoption.” | Commercial scenario contour | Quantity, ramp, term, services, and discount reshape revenue, margin, customer outcome, authority, and approval path. |
| 8 | Seller: “What did the customer actually commit to?” | Evidence reconciliation into runway | Meeting notes become item-by-item proposed changes, then verified buyer/seller commitments with due dates and forecast consequence. |
| 9 | Manager: “Can this remain in commit?” | Forecast review | All prior evidence collapses into a governed category decision with range, conditions, checkpoint, and receipt. |
| 10 | Customer success: “Carry the sold outcome into delivery.” | Success handoff canvas | Deal artifacts become adoption outcomes, risks, owners, first-value milestones, and a reviewed cross-team handoff. |

### Showcase story - from signal to realized customer outcome

The hero demo starts before an opportunity exists and ends after signature planning. Contoso moves from
an account signal through qualification, stakeholder access, coaching, value proof, proposal readiness,
commercial review, customer commitments, forecast decision, and success handoff. The component changes
shape at every role boundary while the same account, opportunity, evidence, assumptions, and receipts
remain connected.

## Dynamic inline UX contract

- Header: **Zava Revenue Deal Room** + literal action + responsive **Expand** control.
- The first viewport answers or advances one sales job; never show prompt echo, generic chat, or a
  decorative “AI score.”
- Every risk, recommendation, and forecast displays buyer evidence, contrary evidence, source freshness,
  owner, and whether the value is fact, seller judgment, deterministic output, or inference.
- Forms and plans include validation, review, explicit confirmation, and a session receipt.
- Review components permit item-by-item correction before confirmation; no inferred meeting change is
  bulk-written silently.
- Commercial inputs visibly change revenue, margin, customer outcome, authority, approval path, and
  forecast. Formulas and assumptions are inspectable.
- Charts provide exact values and table alternatives and remain useful at 340 px.
- Design loading, stale CRM, missing account match, partial M365 evidence, permission, offline mock,
  conflict, and failed action states explicitly.

## Signature visual and brand system

The Deal Room should feel like a precise editorial workspace for a high-performing pursuit team, not a
blue CRM dashboard and not the Innovation Hub recolored.

- **Brand:** “Zava Revenue Deal Room”; planned mark combines an open doorway and forward revenue line.
- **Palette:** midnight `#13263D`, paper `#F7F4EE`, electric azure `#146EF5`, verdant `#1A8F5A`, and
  vermilion `#E5563F`; use semantic colors consistently.
- **Typography:** confident condensed display treatment for deal/value moments; highly legible
  operational sans and tabular numbers for controls and evidence.
- **Composition:** asymmetric editorial grid, strong vertical “close runway,” relationship orbit, and
  evidence ledger. Cards only for deals, people, scenarios, decisions, and bounded forms.
- **Motion:** stakeholder links settle, critical path reflows, and commercial contour interpolates once
  in 180-300 ms. Reduced motion renders final geometry immediately.

| Question | Signature visual | Planned implementation |
| --- | --- | --- |
| Who actually influences the decision? | Buying-committee influence orbit | Deterministic React SVG graph plus DOM people/evidence list. |
| Can both parties reach the target date? | Mutual-action commitment runway | DOM milestones with SVG dependency/critical-path overlay. |
| What supports the forecast? | Deal evidence ledger | Layered verified/judgment/inferred/stale bands with exact records. |
| Which offer balances customer outcome and economics? | Commercial contour and scenario table | DOM inputs plus SVG scenario geometry and exact comparison table. |
| Why did the forecast move? | Forecast bridge | React SVG waterfall with named deals and table alternative. |

## Hero scenarios

### Hero 1 - Rescue the Contoso expansion deal

**Prompt:** “Help me get Contoso's global expansion deal to signature this quarter.”

`GetDealRisk` identifies strong champion support but no economic-buyer access, an unowned security
milestone, and a stale launch assumption. `MapBuyingCommittee` reveals the influence gap and assigns an
executive relationship owner. `BuildMutualActionPlan` works backward from launch and recalculates a
credible close range. After the next meeting, `ReviewMeetingCommitments` rejects one inferred customer
promise and confirms the verified actions.

**Proof:** evidence-grounded risk, interactive people graph, plan creation, date calculation, inference
correction, cross-role handoff, exact continuation, and session updates.

### Hero 2 - Shape an offer without giving away the deal

**Prompt:** “Model a three-year ramped offer for Contoso that protects 68% gross margin.”

`SimulateCommercialOffer` opens inline with quantity, ramp, services, discount, term, currency, and
probability. The seller compares base, accelerated, and protected-margin scenarios. The chosen ramp
improves customer adoption economics but triggers one nonstandard payment-term review.
`ReviewDealException` gives finance and legal the same evidence and records approval with a condition.

**Proof:** rich inline form, live KPIs and chart, deterministic calculations, comparison, policy,
approval chain, conditions, confirmation, and receipt.

### Hero 3 - Defend the forecast commit

**Prompt:** “Should Contoso remain in commit for Q4?”

`InspectForecastCommit` separates buyer-confirmed milestones from seller judgment and agent inference.
The critical path now supports the period, but security acceptance remains a named condition. The
manager accepts commit with a checkpoint; Revenue Command updates the movement bridge and confidence
distribution.

**Proof:** review UX, evidence provenance, scenario range, human judgment, forecast consequence, and
leadership rollup without a generic dashboard.

## Conversation starters

| # | Title | Starter | Expected component |
| ---: | --- | --- | --- |
| 1 | Advance a deal | Help me get Contoso's global expansion deal to signature this quarter. | `GetDealRisk` |
| 2 | Buying committee | Map the buying committee for the Contoso expansion. | `MapBuyingCommittee` |
| 3 | Commercial scenario | Model a three-year ramped offer that protects 68% margin. | `SimulateCommercialOffer` |
| 4 | Meeting preparation | Prepare me for tomorrow's Contoso steering meeting. | `PrepareCustomerMeeting` |
| 5 | Forecast decision | Should Contoso remain in commit for Q4? | `InspectForecastCommit` |
| 6 | Explore capabilities | Explore what the Revenue Deal Room agent can do. | `ExploreAgentCapabilities` |

## Coherent mock data and integrations

The deterministic graph must include at least 80 accounts across regions and segments; 260 contacts;
120 opportunities over 8 quarters; activities, meetings, mail-shaped evidence, documents, requirements,
competitors, products, price books, currencies, stakeholder roles, relationship signals, mutual plans,
proposals, scenarios, policies, exceptions, approvals, forecast snapshots, wins/losses, and outcome data.
The hero record is **Contoso Global Expansion / ZDR-2042** across all components.

Dates use one invocation clock; currency and numbers use `Intl`. Confirmed actions enter a session-only
overlay; Reset restores seeds. Mock services map to typed future adapters:

| Contract | Potential live systems |
| --- | --- |
| `IRevenueDataService` | Dynamics 365 Sales, Salesforce, custom CRM/CPQ |
| `IWorkContextService` | Microsoft Graph, Work IQ, Teams, SharePoint |
| `IPricingAndPolicyService` | Dynamics 365, ERP/CPQ, finance rules, contract policy |
| `IWorkflowService` | Power Automate, CRM workflow, approvals, e-signature handoff |

Production authorization, territory access, price controls, revenue recognition, legal approval,
records retention, data residency, and audit remain system-of-record responsibilities.

## Agentic, global, and responsible requirements

- One typed catalog owns identities, schemas, prompts, negative routing boundaries, previews, and routes.
- Generate each approved component through Yeoman after plan lock; never copy or rename scaffolds.
- Copilot provides bounded intent; components own records, math, validation, review, state, and receipts.
- Never treat sentiment, inferred authority, relationship strength, or close probability as fact.
- Do not autonomously send customer communication, change CRM, set stage/forecast, approve discount,
  accept terms, or create a quote/contract.
- Externalize strings; validate English, German expansion, Japanese, Arabic RTL, multiple currencies,
  fiscal calendars, time zones, name/address structures, and regional commercial policy packs.
- Test keyboard, screen reader, forced colors, reduced motion, 200% zoom, narrow inline, mobile full
  screen, long localization, and chart/table equivalence.
- The shipped showcase must be offline, deterministic, and explicit that actions are session-only mocks.

## Planned delivery gates

- [ ] **Gate 0 - Plan lock:** approve README, 21-component catalog, routes, hero scenarios,
  identity, market baseline, and non-goals; synchronize to GitHub.
- [ ] **Gate 1 - Creation plan:** copy approved creation rules and write `todo.md`, routing matrix,
  metadata/GUID plan, demos, and evidence plan before code.
- [ ] **Gate 2 - Domain graph:** approve typed graph, commercial math, forecast logic, policies,
  transitions, session overlay, reset, and unit tests.
- [ ] **Gate 3 - UX proof:** implement `MapBuyingCommittee`, `BuildMutualActionPlan`,
  `SimulateCommercialOffer`, `ReviewDealException`, and exact Deal Room continuation first.
- [ ] **Gate 4 - Connected hero:** run Contoso from risk through access, plan, meeting updates, offer,
  exception, and forecast receipt across personas.
- [ ] **Gate 5 - Catalog:** generate and implement only 21 approved immutable identities; validate prompt
  routing collisions and capability preview safety.
- [ ] **Gate 6 - Quality:** accessibility, global formats/RTL, themes, responsive captures, tests,
  provenance, generated plugin, package audit, and clean offline rehearsal pass.
- [ ] **Gate 7 - GA release:** package, screenshots, five-minute keynote, business and technical demos,
  telemetry/outcome plan, limitations, support owner, and release evidence approved.

## Explicit non-goals

- Replacing CRM, CPQ, contract lifecycle management, forecasting, e-signature, or revenue recognition.
- Autonomous prospecting, customer contact, CRM writes, stage changes, pricing, terms, or forecast commit.
- A regional sales KPI dashboard, generic account summary, contact list, or generated proposal document.
- Unsupported claims of buyer intent, close probability, legal approval, or financial accuracy.

## Definition of done

The future implementation is complete only when all 20 operational inline components are independently
valuable; the capability explorer safely previews them; every full-screen lens has a useful default;
the three hero scenarios run on one coherent graph; buyer evidence and inference are distinguishable;
commercial and forecast math is inspectable; consequential actions use human review, confirmation, and
receipt; exact continuation preserves context; accessible/global evidence passes; and an audited offline
package deploys without runtime data dependencies.

Until then, this sample remains **TO BE DONE**.