# Zava Innovation Hub routing matrix

Generated from configured component manifests and the canonical starter configuration.

| Tool | Positive use boundary | Nearest exclusion |
| --- | --- | --- |
| `SubmitInnovationIdea` | Use for creating one new innovation idea. | Do not use for existing idea status or business cases. |
| `GetMyInnovation` | Use for the signed-in person’s ideas and next actions. | Do not use for enterprise portfolio analysis. |
| `BuildIdeaBusinessCase` | Use for modeling one idea’s financial case. | Do not use for approving funding. |
| `CelebrateInnovationImpact` | Use for recognizing people behind measured innovation impact. | Do not use for general announcements. |
| `GetInnovationReviewQueue` | Use for prioritizing pending innovation reviews. | Do not use to decide a selected gate. |
| `ReviewIdeaGate` | Use for deciding one idea gate with evidence. | Do not use for funding decisions. |
| `ReviewInnovationFunding` | Use for deciding one funding request and its consequences. | Do not use for budget overview. |
| `ExploreInnovationPortfolio` | Use for multi-dimensional portfolio funnel and balance analysis. | Do not use for personal idea status. |
| `TrackInnovationValue` | Use for projected-versus-realized value and pilot accountability. | Do not use for future business cases. |
| `GenerateInnovationBrief` | Use for an evidence-grounded executive innovation brief. | Do not use for raw analysis. |
| `GetInnovationGrowth` | Use for participation, throughput, and conversion trends. | Do not use for budget health. |
| `ExploreGlobalInnovation` | Use for regional participation and conversion gaps. | Do not use for individual ideas. |
| `TrackInnovationBudget` | Use for allocated, committed, spent, forecast, and available funding. | Do not use for one funding decision. |
| `GetInnovationPortfolioHealth` | Use for leadership portfolio health and exceptions. | Do not use for one metric only. |
| `LaunchInnovationChallenge` | Use for framing and launching a measurable strategic challenge. | Do not use for idea submission. |
| `ManageInnovationExperiment` | Use for pilot hypotheses, evidence, and learning recommendations. | Do not use for funding approval. |
| `ExploreAgentCapabilities` | Use for discovering available innovation scenarios. | Do not use for a specific operational request. |

## Conversation starters

| # | Title | Prompt | Expected inline component |
| ---: | --- | --- | --- |
| 1 | Submit an idea | Submit an idea to reduce new-hire onboarding time by half. | `SubmitInnovationIdea` |
| 2 | My ideas | Show the ideas that need my attention. | `GetMyInnovation` |
| 3 | Portfolio funnel | Show stage conversion in our innovation portfolio funnel. | `ExploreInnovationPortfolio` |
| 4 | Review queue | Show my innovation gate review queue. | `GetInnovationReviewQueue` |
| 5 | Funding decision | Review the funding request for Smart Onboarding Journey. | `ReviewInnovationFunding` |
| 6 | Explore capabilities | Explore what this agent can do. | `ExploreAgentCapabilities` |
