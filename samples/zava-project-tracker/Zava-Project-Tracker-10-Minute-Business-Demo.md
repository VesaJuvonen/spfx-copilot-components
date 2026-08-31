# Copilot Components for agents: 10-minute business value demo

## Purpose

Use this version when the audience needs more than the three-minute keynote. Zava Project Tracker provides the example scenario; the demo proves how Copilot Components let an agent move beyond generated text into dynamic inline UX, deterministic interaction, progressive full-screen context, and human-governed action.

> **AI interprets. Deterministic UX makes the interpretation actionable. Governance defines when people decide.**

## Audience

- Business and process owners
- Decision makers in governance, finance, risk, and operations
- Microsoft 365 and Copilot adoption leaders
- Product and technology leaders evaluating agentic UX patterns

## Before presenting

- Deploy `sharepoint/solution/zava-project-tracker.sppkg` to the demo tenant.
- Use the Megan Bowen persona.
- Open a fresh conversation with the Zava AI Project Portfolio Agent.
- Keep [Zava-Project-Tracker-Demo-Prompts.md](Zava-Project-Tracker-Demo-Prompts.md) available for exact prompts.
- Open Decisions once and select **Reset demo decisions**.
- Keep the host at desktop width for the full-screen section.
- Describe every person, project, value, and receipt as deterministic sample data.
- Present project tracking as the example domain; keep the narrative on the reusable Copilot Component model.

## Demo arc

```text
Discover -> Interpret -> Render -> Interact -> Expand -> Govern -> Confirm
```

The first half stays inline so the audience sees the agent render several task-specific UX shapes. Full screen appears only when the human asks for more context to make a consequential decision.

## Timed script

### 0:00-0:40 - Set the component opportunity

**Say:**

> "Generated prose is not the right experience for every task. AI is excellent at interpreting intent and context, while important work often benefits from visible evidence, predictable controls, and accountable decisions. Copilot Components bridge those strengths. Zava Project Tracker is our example, with human control deliberately designed into the governed steps."

### 0:40-1:15 - Optional discovery for a first-time user

**Paste:**

> **Show me the project and portfolio scenarios you can help with.**

**Expected tool:** `ExploreAgentCapabilities`

**Do:**

1. Point to the four business categories and scenario counts.
2. Search for **capacity**.
3. Select the resource-assignment scenario and inspect its safe preview.

**Say:**

> "Components can make the agent itself discoverable. Instead of asking users to memorize tools or read a generated feature list, this experience organizes outcomes, offers realistic prompts, and previews governed actions without applying them."

If the audience already knows the agent, skip this section and use the time for Q&A.

### 1:15-2:05 - Make AI interpretation inspectable

**Paste:**

> **Show the overall project health for Customer Service Copilot.**

**Expected tool:** `GetProjectHealth`

**Do:** Select **financials**.

**Business points:**

- Health is reconciled across delivery, budget, scope, value, and risk.
- The project is amber, but the evidence says evaluation readiness, not cost, controls launch.
- Prompt scope appears as deterministic controls instead of hidden interpretation.

**Say:**

> "The AI interpreted a broad health question, but the result is not hidden in prose. The component exposes the selected project, the dimensions, and the evidence. I can inspect and correct that interpretation through deterministic controls without asking the model to try again."

### 2:05-3:00 - Turn generated context into an editable form

**Paste:**

> **Submit a project status report for Customer Service Copilot for 2026-08-21.**

**Expected tool:** `SubmitProjectStatus`

**Do:** Change **Risk** from red to amber, select **Review submission**, and stop before **Submit status report**.

**Business points:**

- Five RAG dimensions turn a broad status statement into structured, inspectable data.
- Prompt context prefills the project and reporting date without locking the human into the draft.
- Editing, review, and final submission are distinct deterministic stages.

**Say:**

> "I explicitly asked to submit, but this workflow is designed to stop at a draft. The AI selects and prefills a structured status form; I correct Risk to amber and review the exact report. For this scenario, publishing is deliberately configured as a separate human decision that I am not taking."

### 3:00-4:10 - Bring governed action inline

**Paste:**

> **Can Pradeep join Customer Service Copilot at 20% from 2026-09-01 through 2026-10-31 as AI platform reviewer?**

**Expected tool:** `ReviewResourceAssignment`

**Do:**

1. Select **Review** on **Customer Service Copilot / AI review**.
2. Show approved load 78%, proposed load 98%, skill fit 96%, and affected milestones.
3. Stop before confirmation.

**Say:**

> "The non-deterministic model extracts the scenario, and the component applies deterministic capacity rules and safeguards. We have designed this governed workflow so the prompt prepares visible context and a person reviews the assignment before it is applied."

### 4:10-5:15 - Expand into governed Decisions

**Do:**

1. Select **View in full screen**.
2. Confirm **Decisions** is active and filtered to resource requests.
3. Note that no item is auto-selected and no decision controls are visible.
4. Select **Review** on the Customer Service Copilot request.

**Business points:**

- Full screen is continuation, not an unrelated application landing page.
- The same twelve review records back inline queues and the unified manager inbox.
- Selection-first design prevents accidental decisions.

**Say:**

> "Full screen is progressive disclosure, not a handoff to an unrelated application. The component carries the task into a workspace with more context, but still selects nothing and exposes no decision controls until I choose Review."

### 5:15-6:15 - Widen to project delivery

**Do:** Select the **Project** tab and choose **Customer Service Copilot**.

**Point out:**

- ownership and sponsor
- schedule variance and next gate
- approved versus forecast budget
- AI consumption
- current work, risk, milestones, and expected benefit

**Say:**

> "Components are not limited to isolated cards. In full screen, the same interaction model can coordinate a richer workspace and show the surrounding evidence that makes one action consequential. The domain happens to be project delivery; the pattern applies anywhere a decision needs connected context."

**Presenter guardrail:** Current full-screen dashboards preserve invoked workspace/scope and session receipts. Do not claim that every inline slider/filter is already mapped into every route-specific dashboard module.

### 6:15-7:15 - Widen to portfolio trade-offs

**Do:** Select **Portfolio**.

**Point out:**

- all eight transformations in one investment landscape
- twelve-month run-rate crossing baseline
- expected benefits and AI consumption
- the three executive exceptions
- complete financial ledger

**Say:**

> "The UX can also change its visual structure as the decision scale changes. Here it moves from one record to an investment landscape so the user can evaluate a company trade-off. Purpose-built does not mean one dashboard resized for every intent."

### 7:15-8:10 - Bring the consequence back to My Work

**Do:** Select **My Work**.

**Point out:**

- Megan's ranked priorities
- capacity horizon
- upcoming milestones
- contribution to outcomes
- six governed personal actions

**Optional action:** Open **Weekly update**, edit one accomplishment, select **Review submission**, then close without confirming.

**Say:**

> "The same component architecture can personalize the experience and reuse governed actions across entry points. Context changes from portfolio to individual work, while review and confirmation stay consistent and predictable."

### 8:10-9:20 - Complete the decision with a receipt

**Do:**

1. Return to **Decisions**.
2. Select **Review** on **Customer Service Copilot / AI review**.
3. Select **Approve** for the 20% scenario.
4. Inspect the consequence.
5. Select **Confirm decision**.
6. Show the updated row and session-only receipt.

**Say:**

> "This is the action boundary we chose for this workflow. The AI prepared the context; by design, recording the decision requires my explicit Review, Approve, and Confirm actions. The component creates a browser-session receipt and performs no external write. A production service can replace the mock store later without changing that governance contract."

### 9:20-10:00 - Close on business value

**Say:**

> "Project tracking is only the example. The larger opportunity is to combine non-deterministic AI for understanding with deterministic UX for interaction and safeguards. Copilot Components make interpretations visible, adapt the experience to the task, and let each solution place human checkpoints wherever its governance requires them."

## Copilot Component value summary

- **Adaptive experiences:** one agent can render the visualization, workflow, or controls each intent needs.
- **Inspectable AI:** extracted context becomes visible and correctable instead of remaining hidden in generated prose.
- **Predictable interaction:** controls, calculations, constraints, and state transitions remain deterministic and testable.
- **Configurable governance:** this solution uses human review and confirmation for consequential actions; other scenarios can choose different levels of automation.
- **Progressive context:** users begin inline and expand into a workspace only when the task requires it.
- **Reusable governance:** the same review contract can sit over sample data today and production services later.

## Optional extension prompts

Use these only when the audience asks for more depth:

- **Where will the portfolio exceed forecast? Group the current scenario by project and show variances only.**
- **Which projects support the responsible AI objective, including unaligned investment?**
- **Record 2.4 million input and 620 thousand output GPT-5 evaluation tokens for Customer Service Copilot.**
- **Start a project request for a Supply Chain Exception Agent sponsored by Joni Sherman.**
- **Review whether Customer Service Copilot is ready to exit the pilot gate.**

## Fallback path

If full-screen mode is unavailable, complete the three inline turns and end on the resource confirmation screen without confirming. This still proves AI-driven component selection, deterministic interaction, and human-governed action.

## Rehearsal checklist

- [ ] Reset demo decisions and start a fresh conversation.
- [ ] Each prompt selects the expected tool without manual correction.
- [ ] Project health changes focus; project status changes Risk to amber and carries it into review.
- [ ] The status report remains unsubmitted after review.
- [ ] Resource scenario shows 20% and 98% load.
- [ ] Full screen opens Decisions without automatic item selection.
- [ ] Project selector coordinates all cockpit regions.
- [ ] Portfolio shows eight projects and a twelve-month run-rate.
- [ ] My Work action opens and closes without losing the dashboard.
- [ ] Confirmed decision survives navigation and Reset clears it.
- [ ] Each transition explains a reusable Copilot Component capability rather than only a Zava feature.
- [ ] The story completes in ten minutes with inline UX receiving at least half the time.
