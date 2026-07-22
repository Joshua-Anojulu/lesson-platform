# CONTEXT — lesson-platform (handoff)
_Last updated: 2026-07-21. Session paused mid-grill-chain (usage limit)._

## What this project is
SaaS for private music lesson teachers in the school band/orchestra ecosystem. Wedge: band directors distribute a free "personal recommendation roster" hub; teachers get media-rich public growth profiles (the actual product); parents register + pay through the platform (Stripe Connect direct charges, $0 platform fee at launch). Beachhead: Josh's own high-school band network. Priority: NOVELTY — differentiation vs CutTime (closest competitor, director-side school admin), MyMusicStaff/Opus1, Superprof/Wyzant.

## State of the grill chain (grill-me-codex skill)
- **Act 1 (grill): COMPLETE.** All decisions locked with Josh — see PLAN.md "Key decisions". Summary: music vertical; both front doors (director hub + teacher self-serve) as one core object; payments in MVP, commercialization deferred; beachhead = Josh's old band network; v1 = core + video showcase (hosted links) + director roster tools, v1.1 = review/referral, v1.2 = local SEO pages; stack = Next.js + Neon + Stripe Connect + Vercel; validation = full-loop-one-network bar (details in PLAN.md).
- **Act 2 (Codex review): COMPLETE — VERDICT: APPROVED, round 5 of 5 (2026-07-21).** PLAN.md revised through 4 REVISE rounds; full argument in PLAN-REVIEW-LOG.md. **Next action: Josh's sign-off, then Act 3 — ask once whether Codex builds (codex-build skill, SPEC_FILE=PLAN.md, same LOG_FILE) or Claude builds.** Historical notes below:
- ~~Act 2 round-by-round (historical):~~
  - Round 1 verdict: REVISE, 19 findings (full text + Claude's accept/reject reasoning in PLAN-REVIEW-LOG.md).
  - PLAN.md has been REVISED in response (Phase 0 concierge pilot added; payments decision record; no scheduling engine in v1; hosted-video links not uploads; privacy design step; two validation gates; "vetted" language banned; independent-product framing vs districts).
  - **Next action: run Round 2** — resume Codex thread `019f8702-2beb-79c3-9468-327177c01d45` with:
    `codex exec resume "019f8702-2beb-79c3-9468-327177c01d45" -c sandbox_mode="read-only" --json -o /tmp/codex-verdict.txt "I revised the plan. Re-review PLAN.md — check whether your prior findings are addressed and flag anything new. Claude's accept/reject reasoning is in PLAN-REVIEW-LOG.md. End with VERDICT: APPROVED or VERDICT: REVISE." < /dev/null 2>/dev/null >/dev/null`
    (run from this project dir; 10-min timeout; MAX_ROUNDS=5, currently entering round 2. NOTE: if the resumed thread is stale after the move/restart, start a fresh round-1-style session instead — prompt template in the grill-me-codex skill.)
  - Reviewer: codex-cli 0.144.6, model gpt-5.6-sol xhigh (config default, unpinned). Codex requires the dir to be a git repo (already `git init`-ed; nothing committed yet).
- **Act 3 (build): NOT STARTED. No code exists.** After APPROVED + Josh's sign-off, ask once: Codex builds (`codex-build` skill, SPEC_FILE=PLAN.md, same log) or Claude builds.

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
