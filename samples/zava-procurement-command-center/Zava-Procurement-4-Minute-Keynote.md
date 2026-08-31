# Zava Procurement Command Center - 4-minute keynote

## Audience and promise

For Microsoft customers, partners, procurement leaders, and product teams. The promise: Copilot can
turn an outcome into inspectable procurement software while people retain accountability for policy,
supplier, award, invoice, and value decisions.

## Setup and reset

- Deploy the committed `.sppkg`, add **Zava Procurement Command Center**, and start a fresh conversation.
- State once that all records and confirmed actions are deterministic, offline, and session-only.
- Keep `assets/ux-inline-CreatePurchaseIntent.png`, `assets/ux-sourcing-workbench.png`,
  `assets/ux-inline-ReviewSupplierAward.png`, and `assets/ux-spend-command.png` ready as fallback.

## 0:00-0:40 - Ask for an outcome

Prompt: **Find the fastest compliant path for 600 rugged devices within EUR 1.2 million.**

Expected tool: `CreatePurchaseIntent`. Show outcome, volume, geography, budget, and a governed route.
The user did not choose a requisition form; Copilot selected bounded UX and the component owns the math.

## 0:40-1:20 - Shape demand

Prompt: **Can we combine similar demand without missing the store launch?**

Expected tool: `AggregateDemand`. Show 420 related units and the trade between savings, timing, and
launch risk. Continue into Sourcing Workbench rather than enlarging the inline view.

## 1:20-2:20 - Award for total value

Prompt: **Compare the final bids for ZPC-RFP-31 and show how risk changes the recommendation.**

Expected tool: `CompareSupplierBids`. Change risk weight. Point to the D3 geometry, confidence, exact
table, and the Baltic corridor warning. Lowest price is not silently equated with best value.

## 2:20-3:10 - Preserve human accountability

Prompt: **Review the proposed 65/35 split award.**

Expected tool: `ReviewSupplierAward`. Move the split and show cost, concentration, risk, delivery, and
policy update together. Stop at confirmation and say explicitly that the agent cannot award a supplier.

## 3:10-4:00 - Prove value honestly

Prompt: **Resolve invoice ZPC-8831 and show whether the sourcing value was realized.**

Expected tools: `ResolveInvoiceException`, then `ExploreSpendPerformance`. Show the EUR 15,000 freight
variance excluded from realized value until correction.

Closing line: **The art of possible is not more procurement chat. It is visual, evidence-aware software
inside the conversation, with policy visible early and people still accountable for every commitment.**

## Rehearsal checklist

- Verify prompt routing and extracted IDs in the authenticated target tenant.
- Verify Expand reaches the expected workspace with current context.
- Verify gradients, chart labels, keyboard marks, mobile layout, and dark mode.
- Reset before each run and keep the screenshot sequence available.