# Copilot Components in agents: 3-minute human-in-the-loop UX demo

## The story

**What if an agent could respond with the exact experience a task needs, not just more generated text?**

Copilot Components combine three complementary strengths:

1. **Non-deterministic AI** interprets natural language, selects a purpose-built component, and extracts the stated context.
2. **Deterministic UX** turns that interpretation into visible controls, repeatable calculations, evidence, and safeguards.
3. **Human-in-the-loop policy** deliberately keeps consequential actions behind explicit review and confirmation in this scenario.

> **AI interprets. Deterministic UX constrains. Governance defines when people decide.**

Zava Project Tracker is one example business scenario. The reusable value is an agent that can assemble trustworthy, task-specific UX inside the conversation, then continue into a larger workspace when the human needs more context to act.

## Before presenting

- Deploy `sharepoint/solution/zava-project-tracker.sppkg` and use the Zava AI Project Portfolio Agent.
- Use the Megan Bowen demo persona so personal, project, and manager paths are available.
- Start a new Copilot conversation. Do not reuse a conversation from rehearsal.
- Keep the host at desktop width for the final Decisions workspace.
- Keep these three prompts ready to paste exactly.
- If prior mocked decisions exist, open Decisions and select **Reset demo decisions** before starting.
- Describe all confirmations as session-only sample actions. No external project system is updated.
- Present Zava as the example; keep the narrative focused on the reusable Copilot Component interaction model.

## Timed presenter script

### 0:00-0:20 - Frame the idea

**Say:**

> "AI resolves the user's intent and selects the right Copilot Component. The component then renders a purpose-built UX. From that point, user actions drive predictable updates. The component applies fixed calculations and safeguards. Zava Project Tracker is our example. Watch the same agent move through project health, an editable form, and an approval workflow."

### 0:20-0:50 - Turn 1: understand project health

**Paste:**

> **Show the overall project health for Customer Service Copilot.**

**Expected tool:** `GetProjectHealth`

**Expected properties:**

```text
projectId: Customer Service Copilot
```

**Expected UX:** Project health ring with schedule, budget, scope, value, and risk evidence.

**Do:**

1. Pause on the amber health score and eight-day schedule variance.
2. Select **financials** in the dimension controls.

**Say:**

> "The AI resolves my intent as project health and passes the project context to the component. The component makes that interpretation visible. When I select Financials, the UX updates in a predictable way based on my action. I can explore the evidence without writing another prompt."

### 0:50-1:20 - Turn 2: shape a status update

**Paste:**

> **Submit a project status report for Customer Service Copilot for 2026-08-21.**

**Expected tool:** `SubmitProjectStatus`

**Expected properties:**

```text
projectId: Customer Service Copilot
reportingDate: 2026-08-21
```

**Expected UX:** Editable project status form with five RAG dimensions, grounded narrative fields, and a separate review stage.

**Do:**

1. Point to the five status dimensions and prefilled evidence-based narrative.
2. Change **Risk** from red to amber, then select **Review submission**.
3. Stop on the review screen; do not select **Submit status report**.

**Say:**

> "The AI resolves this as a project status update and extracts the project and date. The component renders an editable form with those values. When I change Risk to amber, the form updates immediately and the review screen carries my change forward. In this workflow, final submission remains an explicit human step."

### 1:20-2:05 - Turn 3: prioritize approvals

**Paste:**

> **What project and portfolio approvals need me this week?**

**Expected tool:** `GetApprovalInbox`

**Expected properties:**

```text
due: week
```

**Expected UX:** Prioritized mixed queue of resource, budget, stage-gate, and project-request approvals.

**Do:**

1. Point to the four approval types in one queue.
2. Highlight **Customer Service Copilot / AI review** at the top, due tomorrow with complete evidence.

**Say:**

> "The AI resolves this intent as an approval inbox. The component renders the matching queue inside the conversation. The evidence, status, and available actions are structured and predictable. I decide which request to review next."

### 2:05-3:00 - Move from inline to full context

**Say:**

> "And it does not end there. Inline components provide actionable UX directly in the chat. When I need the full context, I can move to full-screen mode for more detailed information and precise actions."

**Do:**

1. Select **View in full screen**.
2. Confirm that **Decisions** is active with no item selected automatically.
3. Select **Review** on **Customer Service Copilot / AI review**.
4. Point to the unsafe 118% resulting load and disabled **Approve** action at the requested 40% allocation.
5. Move **Proposed allocation** to 20%; point to the safe 98% resulting load, 96% skill fit, and two affected milestones.
6. Select **Approve**, review the consequence, then select **Confirm decision**.
7. Pause on the session-only receipt.

**Then say:**

> "The approval context continues into the full-screen experience. My actions now drive the UX. At 40%, a deterministic rule blocks approval. When I change the allocation to 20%, the component recalculates the load to 98% and enables approval. I then review and confirm. AI resolves the intent; user actions drive the deterministic UX."

## What this demo proves

- One agent can render different purpose-built experiences as user intent changes.
- AI is used where flexibility helps: interpreting language, selecting UX, and extracting context.
- Components make the AI's interpretation visible, inspectable, and correctable.
- User interactions, calculations, constraints, and safeguards remain deterministic and testable.
- This scenario deliberately requires explicit human review and confirmation for consequential actions.
- Inline UX can continue into a full-screen workspace without losing the task context.
- The same interaction model can be applied beyond the Zava project-management scenario.

## Presenter guardrails

- Do not present this as a Zava product tour; use Zava to demonstrate the broader component model.
- Do not say that Copilot calculated project metrics; deterministic sample calculations do that.
- Do not imply that the agent recommends, approves, or confirms the resource decision.
- Do not imply the 20% assignment was applied to a live resource system.
- The 20% value is set visibly in Decisions. Do not imply that the agent selected it or that arbitrary inline slider edits transfer to full screen.
- Do not turn the final minute into a tab tour. Decisions is enough for the three-minute cut.
- If time is short, stop on the confirmation screen and explain the receipt rather than rushing it.

## Fallback cut

If host full-screen transition is unavailable, complete the three inline turns and finish on the prioritized approval queue. Emphasize that the component has already turned probabilistic intent recognition into deterministic, human-controlled interaction. Tenant-host display-mode behavior is a separate validation prerequisite.

## Rehearsal checklist

- [ ] Each prompt selects the expected tool on the first attempt.
- [ ] Project-health **financials** updates; project status **Risk** changes to amber and carries into review.
- [ ] The status report remains unsubmitted when the demo leaves its review screen.
- [ ] Approval inbox shows the mixed queue with the resource request first.
- [ ] Full screen opens Decisions with no automatic item selection.
- [ ] Review shows approval blocked at 118%; setting 20% enables Approve and produces a receipt at 98% load after confirmation.
- [ ] Each transition explains the reusable AI + deterministic UX + deliberate human-in-the-loop pattern.
- [ ] Reset demo decisions clears the processed state.
- [ ] The path completes within three minutes without describing mock data as live.
