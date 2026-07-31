# CONTEXT — lesson-platform (handoff)
_Last updated: 2026-07-31 (market check: Harmoniva added to competitive set; social-listening validation constraint recorded). Phase 0 implementation and verification complete; grill chain closed APPROVED at round 5/5._

## What this project is
SaaS for private music lesson teachers in the school band/orchestra ecosystem. Wedge: band directors distribute a free "personal recommendation roster" hub; teachers get media-rich public growth profiles (the actual product); parents register + pay through the platform (Stripe Connect direct charges, $0 platform fee at launch). Beachhead: Josh's own high-school band network. Priority: NOVELTY — differentiation vs CutTime (closest competitor, director-side school admin), MyMusicStaff/Opus1, Superprof/Wyzant.

## Competitive set
_Last surveyed 2026-07-31._
- **CutTime** — director-side school admin, sold into districts. Different buyer, different job.
- **MyMusicStaff / Opus1** — studio admin for an already-full studio. Serves retention, not acquisition.
- **Superprof / Wyzant** — horizontal marketplaces; music is one vertical among many.
- **Harmoniva (harmoniva.app)** — added 2026-07-31. Launched, working product. AI ear training PLUS real studio management: student/class management, lesson scheduling, built-in messaging, centralised billing, school-wide analytics, separate teacher and school portals. Genuine feature-surface overlap with our v1.
  - **Positioning difference (the thing to hold onto):** Harmoniva is **practice-tool-first with management bolted on** — the ear-training product is the wedge and the admin suite is the expansion. We are **distribution-first**: the band director's roster is the wedge and the teacher's public growth profile is the product. Neither one is trying to win the other's entry point.
  - **Traction as measured 2026-07-31** (record so a future reader can tell whether they have grown): ~3 weeks old; TikTok 3 followers, 8 videos, 32 total hearts on the account; zero search-index presence — does not surface in web search at all (queries return an unrelated product called "Harmonia").
  - **Strategic read:** they already built roughly what would take us months, and nobody came. That is direct evidence for our core thesis — in this market **the software is not the moat, distribution is**. Their existence supports the roster premise rather than threatening it. **No scope change, no feature response.** Re-check their traction before the expansion gate; growth on their side would be the signal that changes this reading, not their feature list.

## Market-validation constraint (2026-07-31)
Two full multi-source social sweeps (Reddit incl. r/musicteachers, r/musiced, r/piano, r/WeAreTheMusicMakers, plus X, TikTok, Instagram, Hacker News, YouTube) returned almost nothing on-topic. The one relevant hit across both runs was a user asking "Where do I find nearby music teachers?" — the discovery problem this product solves.

**Consequence:** these customers are not reachable or verifiable through social channels. The band-director beachhead is likely the ONLY viable channel, and the **Phase 0 concierge pilot is now the sole validation instrument** — it is load-bearing in a way it was not when the plan was approved. Weight the validation gates in PLAN.md accordingly: there is no second source of evidence to fall back on if Phase 0 is run loosely. This does not change the plan; it raises the cost of running Phase 0 badly.

## State of the grill chain (grill-me-codex skill)
- **Act 1 (grill): COMPLETE.** All decisions locked with Josh — see PLAN.md "Key decisions". Summary: music vertical; both front doors (director hub + teacher self-serve) as one core object; payments in MVP, commercialization deferred; beachhead = Josh's old band network; v1 = core + video showcase (hosted links) + director roster tools, v1.1 = review/referral, v1.2 = local SEO pages; stack = Next.js + Neon + Stripe Connect + Vercel; validation = full-loop-one-network bar (details in PLAN.md).
- **Act 2 (Codex review): COMPLETE — VERDICT: APPROVED, round 5 of 5 (2026-07-21).** PLAN.md revised through 4 REVISE rounds; full argument in PLAN-REVIEW-LOG.md. Historical notes below:
- ~~Act 2 round-by-round (historical):~~
  - Round 1 verdict: REVISE, 19 findings (full text + Claude's accept/reject reasoning in PLAN-REVIEW-LOG.md).
  - PLAN.md has been REVISED in response (Phase 0 concierge pilot added; payments decision record; no scheduling engine in v1; hosted-video links not uploads; privacy design step; two validation gates; "vetted" language banned; independent-product framing vs districts).
  - ~~**Next action: run Round 2**~~ — **EXPIRED, DO NOT RUN.** Round 2 executed on 2026-07-21 (verdict REVISE) and rounds 3–5 followed to APPROVED; all five are recorded in `PLAN-REVIEW-LOG.md`. This bullet is preserved only as a record of what the instruction was at the time. Command kept verbatim below for archival reference — resuming Codex thread `019f8702-2beb-79c3-9468-327177c01d45` now would re-litigate a closed review:
    `codex exec resume "019f8702-2beb-79c3-9468-327177c01d45" -c sandbox_mode="read-only" --json -o /tmp/codex-verdict.txt "I revised the plan. Re-review PLAN.md — check whether your prior findings are addressed and flag anything new. Claude's accept/reject reasoning is in PLAN-REVIEW-LOG.md. End with VERDICT: APPROVED or VERDICT: REVISE." < /dev/null 2>/dev/null >/dev/null`
    (run from this project dir; 10-min timeout; MAX_ROUNDS=5, currently entering round 2. NOTE: if the resumed thread is stale after the move/restart, start a fresh round-1-style session instead — prompt template in the grill-me-codex skill.)
  - Reviewer: codex-cli 0.144.6, model gpt-5.6-sol xhigh (config default, unpinned). Codex requires the dir to be a git repo (already `git init`-ed; nothing committed yet).
- **Act 3 (build): PHASE 0 COMPLETE (2026-07-21).** The approved public roster, static teacher profiles, privacy-first video facades, minimal registration flow, single registration store, and Phase 0 document templates are implemented. Future v1 phases remain intentionally unstarted.

## Files
- `PLAN.md` — the locked+revised plan (rev after round 1).
- `PLAN-REVIEW-LOG.md` — round 1 critique verbatim + Claude's response. Append-only; this is the deliverable artifact.
- `CONTEXT.md` — this file.

## Key context not in the plan
- Josh's insight driving the whole wedge: he was in HS band; lesson teachers there were partnered through schools — platform expands their reach beyond the school cap.
- TakeLessons (Microsoft) shut down late 2024 → vacated the consumer music-lessons space.
- Josh chose "both front doors from day one" against recommendation; reconciled as one core object, two entrances.
- Commercialization deliberately deferred; payments-in-MVP was accepted specifically to keep take-rate viable later.
- Project was moved from C:\Users\josha\Projects\lesson-platform to OneDrive\Documents\lesson-platform at pause time (2026-07-21).
