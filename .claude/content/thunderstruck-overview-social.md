# Social variants — thunderstruck: what it does (evergreen overview)

Post: no blog post behind this one. Link the repo, https://github.com/tomstagl/thunderstruck, and for depth the 0.21 post, https://tomstagl.com/blog/thunderstruck-fracture-planes/ (DatoCMS `fVLIGJ0vQsefz8BYulDzRQ`, published 2026-11-27).
Release: thunderstruck v0.21.0 (published 2026-11-27).
Video: `thunderstruck-overview.mp4` (1280×720, H.264 30 fps, 43.4 s, 1.2 MB; poster `thunderstruck-overview.poster.png`). Rebuild with `thunderstruck-overview-build_video.py`, setting `GUARD_JSON` to the guardrail output (see the script's docstring).
- Scenes: hook → 1 Rank → 2 Investigate → 3 Validate → 4 Refute → 5 Verify → 6 Guard → install.
- The ranking, finding FR-001, its evidence, its check and its Verify line are quoted from `examples/sample-report.md`. That is the real pipeline over thunderstruck's test fixture. The fixture's findings are written for it and pass the real validator, and the sample's checks are canned (no model ran). The video labels those scenes "from thunderstruck's sample report".
- The edit warning is `scripts/guardrail.py`'s real output on the same fixture scan.

Facts used (README unless noted):
- Hotspot analysis says where risk concentrates; thunderstruck says why the code is fragile: trigger, amplifier, sustaining effect
- Ranking: churn × complexity × missing stability patterns, by script; 23 patterns (5 named + 18 more)
- The investigator is a read-only agent reading the code and its history and forming a falsifiable hypothesis; the sustaining effect is the one reviews miss (README, "The metastability lens")
- Every file:line and commit SHA is resolved by a script; a finding resting only on a detector ref is rejected (CLAUDE.md, validate.py's rule)
- A skeptic tries to refute each finding; only `upheld` can be `high` (CLAUDE.md, "Confidence is capped by check status")
- `/thunderstruck-verify` turns a finding into a failing test or reproduction script
- The guardrail warns before an edit and never blocks
- Runs locally; no API key, no telemetry; no scan stage builds or runs the scanned project; bundles are in `.thunderstruck/bundles/`
- "What it is not": not a fixer, not a linter, not an oracle

---

## X / Twitter — single post with video (post this first)

Hotspot tools show where code is risky. thunderstruck says why it will fail in production: the trigger, the amplifier, and what keeps it failing once the trigger is gone.

Every claim cites real file:line and commits, checked by a script. Then a skeptic agent tries to refute it.

[attach: thunderstruck-overview.mp4]

> 279 characters. Rationale: the video walks the six steps, so the text only has to make the promise: *why*, not *where*, with evidence and a skeptic. Signal: video completion rate past step 3, and profile clicks to the repo. No link in the post; it goes in the reply.

**Reply 1 (links):**
A Claude Code plugin. Runs locally, no API key, no telemetry, MIT.
https://github.com/tomstagl/thunderstruck

What's new in 0.21, and why a model doesn't get to decide what counts as protection: https://tomstagl.com/blog/thunderstruck-fracture-planes/

---

## X / Twitter — thread (the full picture as text, video on the first tweet)

Hotspot tools show where code is risky. thunderstruck says why it will fail in production.

It's a Claude Code plugin, and it works in six steps. 🧵

[attach: thunderstruck-overview.mp4]

1/ Rank. A script scores every file on churn × complexity × missing stability patterns: timeouts, jittered backoff, Retry-After, one retry layer, bounded result sets and 18 more.

No model involved. Same repo, same ranking.

2/ Investigate. A read-only Claude agent reads each flagged file and its git history, and writes a falsifiable hypothesis: the trigger, the amplifier, and the sustaining effect.

The third one is what reviews miss, and why incidents outlive their causes.

3/ Validate. Every file:line and commit SHA a finding cites is resolved by a script. A finding that rests only on a pattern match is rejected.

4/ Refute. A second agent tries to disprove each finding. Only an upheld one can be reported high confidence.

5/ Verify. Every finding says how to prove it, and /thunderstruck-verify turns that into a failing test.

6/ Guard. Edit a file with an open finding and Claude hears about it before the edit lands. It warns. It never blocks.

Runs locally. No API key, no telemetry, and a scan never builds or runs your code. What reached the model sits in .thunderstruck/bundles/ for you to read.

Not a fixer, not a linter, not an oracle: hypotheses with evidence.

https://github.com/tomstagl/thunderstruck

> Every tweet is under 280 characters. Rationale: for people who want to know how it works before they install it. Tweet 2 (the sustaining effect) is the idea SREs will quote. Signal: bookmarks, and quote-posts that argue with a step.
