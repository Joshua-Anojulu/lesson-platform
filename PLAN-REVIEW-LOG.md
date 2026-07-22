# Plan Review Log: School-band lesson platform
Act 1 (grill) complete — plan locked with the user. MAX_ROUNDS=5.
Reviewer: Codex CLI 0.144.6, model gpt-5.6-sol (xhigh), thread 019f8702-2beb-79c3-9468-327177c01d45.

## Round 1 — Codex

The plan is not sound enough to implement. Its distribution thesis may be interesting, but novelty, institutional authority, privacy, and payment mechanics remain unproven or contradictory.

### Blockers

1. **The "novel" product is mostly an existing-feature splice.** PLAN.md overlooks vertical competitors: CutTime already offers fine-arts rosters, QR self-registration, approvals, guardian access, and Stripe payments; My Music Staff and Opus1 already cover multi-teacher registration, scheduling, and billing; Lesson Console already combines profiles, local SEO, and studio administration. Fix: Define one measurable workflow unavailable in these products and require customer evidence that the cross-product combination—not merely director distribution—changes adoption.

2. **The plan commits to a full SaaS before validating the only novel hypothesis.** Profiles, scheduling, Connect, storage, and multi-role administration are unnecessary to learn whether directors will distribute the service. Fix: First run a concierge pilot using static profiles, a form, a coordinator spreadsheet, and teacher-owned Stripe Payment Links; build only after an authorized director repeats the workflow.

3. **"Individual directors, never procurement" is incompatible with official school use.** Federal guidance tells teachers to verify district approval before using applications that handle student PII. Fix: Choose either an approved district-vendor path or a wholly independent parent-teacher product with no school branding, school-supplied data, or official director dashboard.

4. **Directors commonly cannot "approve" instructors.** Plano ISD routes contractors through central Fine Arts, the principal, HR, insurance, background checks, badges, building fees, and district-set rates; Frisco ISD similarly requires annual clearance and insurance. Fix: Separate identity verification, district clearance with expiry, campus roster membership, and platform moderation; never label a teacher "vetted" based only on director approval.

5. **The school-program and commercial-marketplace models contaminate each other.** Direct signup, public SEO, referrals, and commercial profiles could reuse school-derived affiliations or demand, creating endorsement and unauthorized-purpose problems. Fix: Isolate school-roster and public-marketplace data, branding, consent, and authorization boundaries, and prohibit school-derived data from powering SEO or referrals.

6. **"COPPA/FERPA-adjacent" is not a privacy design.** Parent-owned accounts do not address student names, school/instrument, schedules, payment status, public child videos, analytics identifiers, retention, deletion, custody disputes, or director access. Fix: Before implementation, select a launch jurisdiction and document every child-data field, legal basis, accessor, retention period, deletion/export path, subprocessor, consent record, and breach procedure.

### High-severity design failures

7. **Director payment visibility violates least privilege** (Plano ISD makes contractors responsible for billing). Fix: Remove individual payment visibility from MVP; expose only consented aggregate operational counts with audited access.

8. **"Stripe Connect Express" does not specify a viable funds flow.** Direct vs destination charges differ in merchant of record, fee payer, refunds, disputes, negative balances, 1099s. Fix: Write a tested payments decision record naming charge type, MoR, fee/loss payer, surcharge policy, refunds/disputes owner, statement descriptor, payout timing, tax filer.

9. **`Payment` is not an adequate financial schema.** Fix: Model immutable invoices/line items, payment attempts, refunds, disputes, credits, transfers and payouts, with effective-dated rate/policy snapshots plus unique Stripe identifiers.

10. **The role model is structurally wrong.** A person can be director+teacher+parent; teachers serve multiple campuses; students have multiple guardians, sometimes restricted custody. Fix: Canonical users plus scoped program memberships, affiliations, households, guardian-student relationships, consent scopes, resource-level authorization — not one role enum.

11. **The scheduling model does not match school-band lessons** (rotating class periods, bell schedules, holidays, makeups, campus travel). Fix: Keep scheduling out of MVP or model effective-dated recurring patterns with exceptions.

12. **Teacher confirmation has an overbooking race.** Fix: request/hold/confirmed/expired state machine with transactional capacity checks and DB uniqueness constraints.

13. **Stripe synchronization has no correctness or recovery design.** Fix: Signed, idempotent webhook inbox keyed by account+event ID, state reconciliation, retry/dead-letter, daily financial reconciliation, alerts.

14. **Direct unprocessed video upload is unsafe and unreliable** (codecs, malware, copyright, minors' metadata, egress abuse). Fix: MVP accepts moderated hosted-video links, or enforce full signed-upload pipeline.

15. **Public affiliations and manually seeded testimonials invite deception.** Fix: Verifiable identity, time-bounded affiliation approval, endorsement disclaimers, testimonial provenance/consent; no public student identities or placeholders.

16. **Program creation and invitation security are missing** (director impersonation, school-slug squatting, QR abuse, cross-tenant IDs). Fix: Verify institutional ownership, reserve namespaces, expiring single-purpose invitations, read-only QR links, rate limits, tenant authorization on every query.

17. **Commercialization is deferred past the point where it can invalidate the product** (0% revenue vs real Express/video/support costs; later take-rate may cause displacement). Fix: Instrument per-hub contribution margin and test future pricing willingness during the pilot.

18. **The validation bar proves activity, not novelty or viability** (one friendly director = insider goodwill). Fix: Require a second unaffiliated approved program, repeat billing cycles, measured director time savings, retention, support burden, stated price acceptance.

19. **"Gift a lesson" quietly introduces stored-value risk** (expiration, escheatment, fraud). Fix: Limit to immediate purchase of a named teacher's defined lesson, or defer pending stored-value review.

VERDICT: REVISE

### Claude's response (Round 1)

**Accepted in full:** #4 (drop "vetted" label; roster membership ≠ clearance; separate status fields), #6 (privacy design doc is now a numbered pre-launch step; minimal child-data schema), #7 (director sees aggregate enrollment counts only; per-family payment status removed from MVP), #8 (payments decision record added: DIRECT charges on connected accounts — teacher is merchant of record, teacher pays Stripe fees, platform fee $0; teacher owns refunds/disputes; Stripe files 1099-K for connected accounts), #9 (ledger-style immutable payment schema), #10 (canonical User + scoped memberships, no role enum), #13 (idempotent webhook inbox + reconciliation), #14 (v1 uses moderated hosted-video links — YouTube/Vimeo unlisted embeds — no upload pipeline; simpler AND safer), #15 (seeded testimonials cut from v1 entirely; affiliations shown as self-reported claims with disclaimer until director confirms roster membership), #16 (invite-only director onboarding at beachhead — founder manually verifies; expiring invite links; tenant-scoped authz on every query), #17 (per-hub cost instrumentation + pricing-willingness question added to pilot), #19 (gift-a-lesson rescoped to immediate named-teacher purchase, stays in v1.1).

**Accepted with modification:**
- #1 (novelty): CutTime is the real competitor and the plan now names it. Differentiation restated: CutTime is director-side admin software (inventory, forms, finances) that schools buy; it does not give teachers a public growth surface, media showcase, or any life outside the school. Our teacher profile is the core object and survives the teacher's school relationships; the hub is distribution, not the product. Added validation requirement: pilot interviews must confirm directors/teachers experience this as different from CutTime/MyMusicStaff, else the novelty claim fails.
- #2 (concierge first): Accepted as Phase 0, but not as a build-blocker. Phase 0 concierge pilot (static page + form + teacher Stripe Payment Links) runs FIRST and gates the full build of payments/hub features; the thin profile+registration skeleton may be built in parallel since it is needed in every branch of the decision tree. Rationale: pure-concierge-then-build serializes ~6 weeks for information the first two weeks of concierge will mostly deliver.
- #3 (district policy): Chose the independent-product path for v1: the hub is the DIRECTOR'S personal recommendation roster ("Mr. Smith's lesson teacher list"), no school branding, no school-supplied rosters, no student data from school systems, explicit non-affiliation disclaimer. District-approved vendor path deferred until a district asks.
- #5 (contamination): Accepted as a data-boundary rule: school-context enrollment data never powers public SEO pages or referral targeting; public marketplace surfaces only what the teacher self-publishes.
- #11/#12 (scheduling/race): Took the "keep scheduling out of MVP" branch. v1 stores enrollment + teacher-managed capacity per instrument (integer), no slot engine. The race collapses to a transactional capacity decrement with a DB constraint; full scheduling deferred post-v1.2.

**Rejected (with reason):**
- #18 (validation bar): Partially rejected. The 8-week n=1 full-loop bar stays as the V1 GATE — its explicit purpose is cheap falsification, not proof of viability, and demanding a second unaffiliated network inside 8 weeks would just measure sales latency. Codex's stronger bar is adopted as the EXPANSION GATE (before scaling beyond the beachhead): second unaffiliated program, ≥2 repeat billing cycles, measured director time savings, stated price acceptance. Two gates, not one.

## Round 2 — Codex

The revision materially improves the plan, but it still has implementation-blocking contradictions. Round-one findings #4, #5, #7, #10, #11, #13–15, #17, and the two-gate treatment of #18 are adequately addressed. The following remain unresolved or are newly introduced.

1. **The Stripe decision record contains a factual error and omits ultimate liability.** Legacy Express accounts use `application_express`; Stripe does not issue their 1099-Ks, the platform is ultimately liable for uncovered disputes/negative balances, and Express account types are deprecated. Fix: Replace "Express" with an explicit Accounts v2/controller configuration naming fee and loss collectors, dashboard access, Connect fees, tax filer, reserves, payout policy, and dispute escalation, verified in a Stripe sandbox.

2. **The "independent product" boundary is internally contradictory.** No-school-branding claim vs reserved school-name namespaces, director-confirmed affiliations, distribution through the director's student channel, and a director dashboard. Fix: documented district/campus policy check before Phase 0, or strip school identifiers/affiliation confirmation/director reporting.

3. **The privacy gate is sequenced after a real minors-data pilot.** Phase 0 collects family data but the data-protection record is numbered under v1. Fix: move the full privacy checklist to Phase 0 item zero.

4. **No implementable billing workflow.** Topology and ledger tables but no invoice creator, cadence, due dates, or states for cancellation/no-show/partial refund/withdrawal. Fix: one v1 billing primitive with a complete state machine.

5. **The novelty test does not test the claimed novelty.** Claim is teacher growth beyond the school relationship; Phase 0 measures only director-distributed registrations and perception. Fix: add attributed teacher reuse / off-hub lead generation, or narrow the claim to director-assisted roster conversion.

6. **The Phase 0 build gate is contradictory.** Steps 2–4 in parallel includes auth, data model, and hub — then 5–6 mislabeled "payments/hub build". Fix: enumerate exact pre-validation code (public profiles + minimal form); prohibit memberships, dashboards, Connect, ledger until gate passes.

7. **Capacity decrement is not a complete enrollment invariant.** Missing duplicate acceptance, cancellation, teacher withdrawal, capacity restore. Fix: request state machine, idempotent transitions, uniqueness constraints.

8. **Invitation and abuse controls incomplete.** Public QR endpoint lacks parent email verification, throttling, bot protection, duplicate-request controls; Google + magic-link account merging unspecified. Fix: verified-contact gating, throttles, idempotency, abuse reporting, short-lived single-use magic links, explicit provider linking.

9. **Hosted embeds introduce tracking risk.** Third-party embeds can set identifiers on public pages minors visit; "unlisted" ≠ privacy or moderation. Fix: click-to-load privacy-enhanced embeds, no third-party request before consent, moderation checklist.

10. **Post-v1 sequencing gaps.** No lesson-occurrence tracking → can't trigger genuine post-lesson reviews; named-teacher gifts can still be deferred value. Fix: reviews only after adult-confirmed completion; gifts = purchase for named recipient + scheduled lesson, or defer.

VERDICT: REVISE

### Claude's response (Round 2)

**Accepted in full:**
- #1: Decision record rewritten — no "Express". Connect controller configuration: Stripe collects requirements (`controller.requirement_collection = stripe`), connected account pays processing fees (`controller.fees.payer = account`), connected account bears payment losses with Stripe as collector (`controller.losses.payments = stripe`), express-style dashboard access; direct charges; under this config Stripe is the tax filer (1099-K) — TO BE VERIFIED IN STRIPE SANDBOX as an explicit Phase 0 task; platform residual liability for unrecoverable negative balances acknowledged as a monitored risk with per-teacher exposure caps (payout schedule + volume limits at launch).
- #3: Privacy checklist moved to Phase 0, item 0 — blocking, before any family/student data collection (spreadsheet included).
- #4: v1 billing primitive chosen: **teacher-issued monthly invoice** (mirrors the ecosystem's existing monthly-Venmo habit). Full state machine specified in plan: draft → sent → paid/void; cancellation, partial refund (teacher-initiated), dispute (Stripe flow, teacher-owned, platform monitors), enrollment termination stops future invoices. No per-lesson charging, no auto-recurring in v1.
- #5: Novelty metrics split by gate. V1 gate = director-assisted roster conversion (claim narrowed for v1) PLUS instrumented off-hub tracking: each profile gets distinguishable share links (hub vs teacher-shared); expansion gate requires evidence of teacher-driven off-hub leads — the "profile survives the school relationship" claim is tested there, where it can actually occur.
- #6: Pre-validation build enumerated exactly: public teacher profile pages (static-data driven) + minimal registration form writing to a private store. Prohibited until Phase 0 gate passes: auth/accounts, memberships, director dashboard, Stripe Connect, ledger.
- #7: Request state machine added: requested → accepted/declined/expired; accepted → cancelled_by_parent/withdrawn_by_teacher/completed_term. Uniqueness constraint on active (student, teacher, instrument); capacity released idempotently on any terminal transition.
- #8: Added parent email verification before request submission, per-IP and per-contact throttles, duplicate-request idempotency keys, abuse-report link on public pages, single-use ≤15-min magic links, Google sign-in links only to a verified-email match (no silent merge).
- #9: Click-to-load embed facade (thumbnail + consent click before any third-party request), youtube-nocookie/Vimeo DNT variants, moderation checklist (minors visible, copyright, identifying backgrounds) before a clip goes live.
- #10: Reviews trigger only on adult-confirmed lesson completion (lightweight teacher confirmation, no scheduling engine needed). Gifts moved from v1.1 to deferred-indefinitely (jurisdiction review required first).

**Accepted with modification:**
- #2 (independence boundary): Adopted the policy-check path, not the full-strip path. Phase 0 now requires a documented campus/district policy check (the beachhead director is a warm contact; asking is cheap) BEFORE distribution. Hub namespaces renamed director-based ("mr-smith-lessons"), school-name namespaces dropped. Aggregate-counts dashboard retained: it reflects information directors already hold informally (which of their students take lessons with whom), and the policy check is the gate that decides if even that is acceptable per campus. Full stripping rejected because it deletes the wedge being tested — if the policy check fails at the beachhead, that IS a Phase 0 negative result and we re-wedge.

## Round 3 — Codex

Round 3 resolves findings #3 and #6–10. Finding #5 is substantially improved. Findings #1, #2, and #4 remain material, with two new inconsistencies.

1. **The Connect controller tuple is unsupported.** Account-paid fees + Stripe loss liability + express-style dashboard is not a valid combination; Stripe requires Express dashboard for platform-paid fees/losses, and Stripe-paid fees/losses require the full Dashboard. Fix: choose a supported tuple — most simply full Dashboard with Stripe collecting fees and losses — with that API version's exact property names.

2. **Sandbox testing cannot establish the tax conclusion.** Sandbox verifies account properties/payment behavior, not year-end 1099 filing; Stripe docs currently say it issues 1099-Ks when `controller.fees.payer=account`. Fix: sandbox = technical verification only; separately record a source-backed tax determination plus professional review before live payments.

3. **The invoice state machine does not match Stripe.** "Sent" is an event, not a state; Stripe uses draft → open → paid | void | uncollectible; failed payment leaves the invoice open; refunds/credit notes don't reverse an invoice to unpaid. Fix: mirror Stripe's states, add due/overdue and failed-attempt behavior, derive refunded status from refunds/credit notes.

4. **The success metric conflicts with monthly invoicing.** "Ten paid lessons" is unmeasurable when one monthly invoice covers several future lessons and no completion record exists until v1.1. Fix: measure paid invoices / paying households separately from confirmed completed lessons, each with its own threshold.

5. **The policy check is still self-attestation.** A director's informal email doesn't prove campus authorization; "hub-confirmed affiliation" can imply endorsement after the disclaimer disappears. Fix: require a published policy or confirmation from an authorized principal/fine-arts administrator; retain the non-affiliation disclaimer permanently.

6. **The wider novelty gate remains non-falsifiable.** "Attributed off-hub teacher leads" has no minimum count, conversion rate, teacher proportion, or window. Fix: precommit a quantitative off-hub threshold and failure rule before Phase 0.

VERDICT: REVISE

### Claude's response (Round 3)

All six accepted; #5 with one scope note.

- #1: Adopted the simplest supported tuple: **full-Dashboard connected accounts** (Standard-equivalent controller config: `controller.stripe_dashboard.type = "full"`, `controller.fees.payer = "account"`, `controller.losses.payments = "stripe"`, `controller.requirement_collection = "stripe"`) with **direct charges**. Teacher is MoR, manages refunds/disputes in their own full Stripe dashboard, and receives 1099s from Stripe as an ordinary Stripe merchant. Platform loss exposure is minimized by design rather than mitigated by caps. Tradeoff logged: heavier onboarding (full Stripe account) vs Express-style — acceptable for ~5-15 beachhead teachers, revisit at scale.
- #2: Payments verification split in the plan: (a) sandbox technical verification of account config + charge flow; (b) source-backed tax determination (Stripe docs citations recorded in the decision record); (c) professional tax/legal review before first live payment.
- #3: Invoice states now mirror Stripe exactly: draft → open → paid | void | uncollectible, with due/overdue as derived flags, failed attempts leaving the invoice open, and refunded/partially-refunded derived from Refund/CreditNote objects — never a mutated invoice state.
- #4: V1 gate metric replaced: "≥10 paid lessons" → "**≥10 paying households** (≥1 paid invoice each) and **≥15 teacher-reported completed lessons** (pilot self-report — systematic completion confirmation ships in v1.1)."
- #5: Accepted: policy check now requires either an applicable published district/campus policy (cited) or written confirmation from an authorized administrator (principal or fine-arts director), not just the band director's own attestation. Non-affiliation disclaimer is permanent on all surfaces regardless of affiliation state. Scope note: at beachhead this is one email to one administrator — cheap; if unanswerable, that itself is Phase 0 signal.
- #6: Expansion-gate novelty threshold precommitted: within 16 weeks after the v1 gate, ≥30% of active teachers have ≥1 attributed off-hub lead, ≥10 total attributed off-hub leads, and ≥3 off-hub leads converted to paid enrollment. Below all three → the wider novelty claim (profile survives the school relationship) is judged false; the product may continue as a roster-conversion tool, but the growth-platform thesis is dropped.

## Round 4 — Codex

All six round-3 findings are addressed. Three new cross-section problems remain material.

1. **The direct-invoice ownership path is underspecified.** Direct-charge invoices need a Customer on the connected account and account-scoped API requests; teachers creating invoices in their own Stripe Dashboard can't be bound to households/enrollments or guarantee a future application fee. Fix: teachers initiate invoices in the platform UI; platform creates account-scoped Customer + invoice via `Stripe-Account`, attaches enrollment metadata, stores `(connected_account_id, stripe_object_id)`, explicitly sets launch application fee to zero.

2. **The policy approval covers Phase 0 but not the materially different v1** (accounts, enrollment reporting, aggregate director analytics, Connect payments arrive without a second check). Fix: concise Phase 0/v1 data-flow disclosure to the administrator, or a second documented approval before enabling the v1 dashboard and payments.

3. **The novelty threshold and failure rule contradict each other.** Requirements joined by "and" but failure declared only when ALL are missed; a roster-only product continuing unproven also conflicts with the novelty priority. Fix: wider thesis passes only if all three thresholds are met; otherwise stop or re-wedge unless a separately precommitted roster-only novelty test passes.

VERDICT: REVISE

### Claude's response (Round 4)

All three accepted.

- #1: Plan now specifies: all invoices are initiated in the platform UI (teachers never hand-create them in their Stripe Dashboard for platform enrollments); the platform creates the Customer and Invoice on the connected account via the `Stripe-Account` header, attaches enrollment/household metadata, persists `(connected_account_id, stripe_object_id)` pairs, and sets `application_fee_amount = 0` explicitly at launch (the field exists from day one so a future take-rate is a config change, not a migration). Off-platform invoices teachers create themselves are out of scope and simply invisible to the platform — counted as measured leakage, consistent with the existing displacement stance.
- #2: Administrator disclosure upgraded: the Phase 0 policy check presents a one-page disclosure covering BOTH Phase 0 and planned v1 data flows (accounts, aggregate director analytics, payments). A second documented approval is required before the v1 director dashboard and payments go live for that campus's families. Two approvals, both cheap, both logged.
- #3: Gate logic fixed: the wider growth-platform thesis PASSES only if all three off-hub thresholds are met. If any is missed, the thesis fails. Continuation as a roster-conversion tool is permitted only if the precommitted roster-only novelty test passes: at the expansion gate, (a) pilot interviews confirm directors/teachers experience the product as materially different from CutTime/MyMusicStaff AND (b) measured director time savings ≥50% vs their prior paper/email process. If both the growth thesis and the roster-only test fail → stop; no unproven continuation.

## Round 5 — Codex (FINAL)

All three round-4 findings are fully addressed. The plan now has enforceable validation gates, supported payment mechanics, scoped privacy and policy prerequisites, explicit concurrency controls, and falsifiable novelty criteria.

No new implementation-blocking issues found. No files were modified.

VERDICT: APPROVED

_(Process note: the first round-5 attempt used a mangled thread ID; the resume failed silently and a stale round-4 verdict file was initially re-read. Detected via identical output, re-run correctly with the true thread ID. Only this corrected run counts as Round 5.)_

---
**Act 2 complete: APPROVED after 5 rounds (4 REVISE → 1 APPROVED). Awaiting user sign-off for Act 3 (build).**

## Act 3 — Build

### Round 1 — Codex build (2026-07-21/22)
Josh launched write-mode build via .handoff/run-codex-build.sh (Claude classifier-blocked from --yolo). Codex implemented Phase 0 per the frozen spec: hub roster page, 3 SSG teacher profiles, click-to-load video facades, registration form + server action, JSONL/Postgres store with idempotency, migration, docs templates (DATA-PROTECTION-RECORD, ADMIN-DISCLOSURE), plus self-added vitest (15 pass) and Playwright (27 pass) suites. Reported deviations: none.

### Claude's verdict — PASSED
Independently verified: (1) proof command `npm run build && npm run lint` run by Claude — build clean (7 static pages: /, 3 profiles, /register dynamic), eslint zero warnings; (2) scope grep for stripe/auth/session/dashboard/cookies — no prohibited features present; (3) code review of the security-critical surface — strict allowlisted zod schema with consent literal(true) and teacher-slug validation, serialized JSONL writes + Postgres expression-index ON CONFLICT idempotency (migration matches store columns), in-memory per-IP rate limiter, video facades make zero third-party requests pre-click (youtube-nocookie / vimeo dnt=1), permanent non-affiliation disclaimer in content. Not verified visually: house-style design compliance (deferred — review in browser before deploy). Awaiting commit sign-off.
