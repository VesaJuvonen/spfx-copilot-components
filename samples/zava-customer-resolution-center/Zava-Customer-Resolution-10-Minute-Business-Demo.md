# Zava Customer Resolution - 10-Minute Business Demo

## Goal

Show how Alpine House / `ZCR-1048` moves across representative, specialist, customer success, and operations work without losing evidence, authority, or customer promises.

## Journey

1. **Listen and triage (1 minute).** Invoke `TriageCustomerIssue`. Review resolved customer, product, impact, language, entitlement, and severity before creating a session case.
2. **Prioritize (45 seconds).** Invoke `GetPriorityServiceQueue`. Explain the rank through entitlement, affected sites, sentiment, and SLA reasons.
3. **Diagnose (1 minute).** Invoke `DiagnoseCaseEvidence`. Compare firmware, network, and entitlement hypotheses. Reject unsupported inference.
4. **Plan (1 minute).** Invoke `BuildResolutionPlan`. Connect every plan step to verified, contrary, or missing evidence and name owners.
5. **Collaborate (45 seconds).** Invoke `StartExpertSwarm`. Review the bounded decision question, specialist skills, availability, and evidence package.
6. **Detect and govern (1 minute).** Invoke `DetectServiceIncident`, change threshold, then open `ReviewIncidentResponse`. Declaration remains an explicit human decision.
7. **Coordinate field work (45 seconds).** Invoke `CoordinateFieldService` for the three stores that failed rollback. Review sites, parts, technician, and customer windows.
8. **Recover and communicate (1 minute).** Invoke `ReviewServiceRecovery`, then `ComposeCustomerUpdate`. Keep internal diagnostics separate from customer-safe facts and commitments.
9. **Verify and learn (45 seconds).** Invoke `TrackResolutionOutcome`, then `CreateKnowledgeFromResolution`. Knowledge remains a draft until reviewed.
10. **Lead the system (1 minute).** Expand into Customer 360 and Service Operations. Connect promise health, demand, geography, recurring drivers, and recovery economics to named intervention.

## Guardrails

- Prompt values prefill; they never submit.
- Incident, recovery, escalation, dispatch, communication, and knowledge actions require review and confirmation.
- Receipts are session-only and never claim production authorization.
- Sentiment is context, not an automatic denial, escalation, or compensation rule.

## Rehearsal checklist

- Reset session data before each run.
- Verify `ZCR-1048`, 42 stores, firmware 8.4.12, and the six-hour SLA are visible.
- Verify all portraits load and the world map is nonblank.
- Keep the full-screen navigation order: My Queue, Customer 360, Resolution Room, Service Operations.
- Use the matching publication screenshots if tenant routing is unavailable.
