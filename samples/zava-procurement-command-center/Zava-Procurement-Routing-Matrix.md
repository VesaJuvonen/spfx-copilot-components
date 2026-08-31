# Zava Procurement Command Center - Routing Matrix

Generated from `src/shared/catalog.ts`. Edit the catalog, not this table.

| Tool | Operation | Lens and route | Role | Route when | Exclude when | Canonical prompt |
| --- | --- | --- | --- | --- | --- | --- |
| `CreatePurchaseIntent` | submit | my-requests / `my-requests/new` | Business requester | What is the fastest compliant path for this outcome? | Not request status or approval. | Find the fastest compliant path for 600 rugged devices within EUR 1.2 million. |
| `CompareBuyingOptions` | information | my-requests / `my-requests/options` | Business requester | Which route balances speed, value, and policy? | Not supplier bids or award. | Compare buying options for the rugged-device request. |
| `CheckPurchasePolicy` | information | my-requests / `my-requests/policy` | Business requester | Why is this purchase allowed, warned, or blocked? | Never overrides policy. | Check policy for the rugged-device request. |
| `ReviewPurchaseRequest` | review | my-requests / `my-requests/review` | Budget owner | Does the need justify budget and downstream commitment? | Not route selection. | Review purchase request ZPC-REQ-1001. |
| `AggregateDemand` | information | sourcing / `sourcing/demand` | Category manager | Which needs should move together? | Not event creation. | Combine similar rugged-device demand. |
| `BuildSourcingEvent` | submit | sourcing / `sourcing/event-studio` | Category manager | How do we run a fair, controlled event? | Not bid evaluation. | Build a fair event for cohort ZPC-COHORT-07. |
| `CompareSupplierBids` | information | sourcing / `sourcing/evaluation` | Category manager | Which supplier creates the strongest total value? | Cannot award a supplier. | Compare final bids for ZPC-RFP-31. |
| `ReviewSupplierAward` | review | sourcing / `sourcing/award` | Procurement approver | Which award mix is defensible? | Not bid analysis. | Review the 65/35 split award for ZPC-RFP-31. |
| `ExploreSupplier360` | information | supplier-360 / `supplier-360/overview` | Supplier lead | What relationship evidence changes the next decision? | Not a vendor master. | Explore Fabrikam Devices. |
| `ReviewContractRenewal` | review | supplier-360 / `supplier-360/renewal` | Contract lead | Should we renew, renegotiate, consolidate, or exit? | Not negotiation planning. | Review the Fabrikam device contract renewal. |
| `DetectSpendLeakage` | information | spend-command / `spend-command/leakage` | Procurement finance | Where is spend addressable now? | Not recovery execution. | Show the largest addressable leakage this quarter. |
| `TrackSupplierRisk` | information | supplier-360 / `supplier-360/risk` | Supplier risk lead | Where can disruption propagate? | Not mitigation approval. | Show continuity exposure for Fabrikam Devices. |
| `ResolveInvoiceException` | review | spend-command / `spend-command/invoice-exception` | Accounts payable | Why does this invoice not match? | Not generic approval. | Resolve invoice ZPC-8831. |
| `ExploreSpendPerformance` | information | spend-command / `spend-command/performance` | Procurement finance | Did identified opportunity become verified value? | Not a KPI dashboard. | Show whether rugged-device value was realized. |
| `OnboardSupplier` | submit | supplier-360 / `supplier-360/onboarding` | Supplier governance | What evidence does this candidate need? | Does not approve a vendor. | Onboard a rugged-device supplier. |
| `ReviewSupplierQualification` | review | supplier-360 / `supplier-360/qualification` | Supplier governance | Is this supplier qualified for this scope? | Not onboarding capture. | Review qualification for Northwind Rugged. |
| `PlanSupplierRiskMitigation` | submit | supplier-360 / `supplier-360/mitigation` | Supplier risk lead | Which actions reduce residual exposure? | Not risk scoring. | Plan mitigation for the Baltic corridor risk. |
| `NegotiateContractTerms` | submit | supplier-360 / `supplier-360/negotiation` | Contract lead | What should we give, get, and protect? | Not contract renewal decision. | Prepare Fabrikam contract negotiation. |
| `ManagePurchaseOrderChange` | review | my-requests / `my-requests/po-change` | Budget owner | What does this PO change commit us to? | Not new demand. | Review change to PO ZPC-PO-4108. |
| `TrackLeakageRecovery` | review | spend-command / `spend-command/recovery` | Procurement finance | Is the intervention creating verified value? | Not leakage detection. | Track recovery for off-contract device spend. |
| `ExploreSupplierPortfolioBalance` | information | spend-command / `spend-command/portfolio-balance` | CPO | Where are category portfolios too concentrated? | Not one supplier analysis. | Show where supplier concentration is too high. |
| `ExploreAgentCapabilities` | education | education / `education/capabilities` | All roles | What can Zava Procurement do safely? | Never confirms an action. | Explore what the Procurement agent can do. |

## Collision rehearsal

- Purchase intent captures an outcome; buying options compares fulfillment routes; policy explains rules; purchase review owns approval.
- Bid comparison owns normalized analysis and sensitivity; supplier award owns the consequential decision.
- Supplier 360 owns relationship context; supplier risk owns exposure; mitigation owns the reviewed action plan.
- Spend leakage detects opportunity; leakage recovery governs intervention; spend performance verifies realized value.
- Capability exploration is educational and must never route for a specific operational request.

