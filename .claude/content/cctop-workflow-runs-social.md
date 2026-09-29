# Social variants — cctop: workflow runs (follow-up to "htop for a Claude Code session")

Post: https://tomstagl.com/blog/cctop-workflow-runs/ (DatoCMS `dPO4s_V8Tp2IyJ7_ghiShA`, published 2026-09-29) — the workflow-runs post; link this one, not the first post
First post: https://tomstagl.com/blog/cctop-htop-for-claude-code/ (DatoCMS `U6EeZdBpS3mX78ahGceVyw`, published 2026-09-26)
Feature: shipped in **cctop v0.9.0** (tag `2f9974f`, PR #19 feature, PR #20 release, 2026-09-29; plugin 0.10.0, tested with Claude Code 2.1.284). Check the release workflow finished and `brew upgrade cctop` gives 0.9.0 before posting the install line.
Video: `cctop-workflow-runs.mp4` (1280×720, H.264 30 fps, 34 s, 0.4 MB; poster `cctop-workflow-runs.poster.png`). Rebuild: `cctop-workflow-runs-build_video.py` (kept in `.claude/content/`; it expects a scratch copy of `fixtures/session-w-live*` plus `journal.full` next to it) against a cctop v0.9.0 build. Every terminal frame is real `cctop run --once` output from the v0.9.0 tag, on fixture W and its live cut, which are anonymised compositions of the real run. The live strip is animated by replaying the fixture's own journal.

Facts used, from `cctop/tasks/prd-cctop-workflows.md` §1, §3.2 and §4:
- Real run `wf_0aa065ff`: 300 agent starts over 172 distinct keys, 234 failures, 198 of them on the first call; across it and a second, killed run, **every one** of 254 failures was `rate_limit` / HTTP 429 (PRD §1 table)
- The first-call failures died on a 10-line transcript (a 10-line transcript), so their priced cost is near zero: "A verdict that shows only failed $ would call that run healthy"
- Failures concentrated in one phase (Verify, 201 of 234 in that run). In script v2 that phase was an unbatched `pipeline(…)`; by v4 it had been rewritten as a batched `parallel(…)`, and the pointer is marked "script changed since"
- Features: a live strip under the header (phase, results/started, failed and cause, spend, overhead × main thread); a per-phase verdict (started, results, failed count and $, waste %, cold-start share); one cause per failed agent; one fixed fix line per cause, pointing at the `parallel()` / `pipeline()` call as `file:line`
- Read-only; no prompt, label, result or log text is kept (PRD §4.6)
- Video figures are the fixture's (a capped sample of the same run): its fix line's 198 first-call failures match the real run; Verify shows 173 failed for ≈$1.97; run ≈$48.59, 16 % wasted

---

## X / Twitter — single post with video (post this first)

My Claude Code Workflow started 300 agents. 234 failed, every one on a 429. 198 died on their first call, so they cost almost nothing.

Judged on cost alone, that run looked healthy.

New in cctop v0.9.0: a live strip while a Workflow runs, then a verdict per phase with a fix that points at the line in the script.

[attach: cctop-workflow-runs.mp4]

> Rationale: the video carries the "how", so the text only needs the surprise (failures that cost nothing). Signal: video completion rate and replies asking about Workflows. No link in the post; put the repo in a reply (next section).

**Reply 1 (link):**
The first cctop post, on context, cache, spend and the coach: https://tomstagl.com/blog/cctop-htop-for-claude-code/
Repo (v0.9.0, `brew upgrade cctop`): https://github.com/tomstagl/cctop

---

## X / Twitter — thread (alternative, with the video on 1/)

1/ My Claude Code Workflow started 300 agents. 234 failed, all on rate limits.

cctop could count them. It couldn't say which phase was failing, or why. v0.9.0 can.

[attach: cctop-workflow-runs.mp4]

2/ While a run is live, a strip sits under the dashboard's header: phase, results/started, failures with their cause, spend, and cost relative to the main thread.

It's there from every view, so you see a phase start burning 429s without going looking.

3/ When the run ends: a verdict per phase. Started, returned, failed (count *and* dollars), waste, cold starts.

Count and dollars both, because of the next tweet.

4/ 198 of those agents died on their very first call. A 10-line transcript each, costing close to $0.

A dollars-only verdict calls that run healthy. The damage was wall-clock time and resumes, not money.

5/ Every failed agent gets one cause, and every cause one fix line. It points at the `parallel()` or `pipeline()` call in the workflow script, as file:line.

If you've edited the script since the failures, it says so. The line it points at may not be the code that failed.

6/ Read-only, like the rest of cctop. It keeps counts and error codes. No prompts, no results, no logs.

Out now in v0.9.0: brew upgrade cctop

https://github.com/tomstagl/cctop · first post: https://tomstagl.com/blog/cctop-htop-for-claude-code/

> Rationale: for people who want the mechanism. Tweet 4 carries the argument, tweet 5 the payoff. Signal: bookmarks and quote-posts.

---

## LinkedIn

A metric picks what you call healthy.

I've been adding Workflow support to cctop, the terminal dashboard I built for Claude Code sessions. A Workflow run fans a task out to many agents from a script. One of my runs started 300 agents. 234 of them failed, every one on a rate limit.

198 of those died on their very first call. Each one is a 10-line transcript that cost next to nothing. So if you judge that run the obvious way, by what the failures cost, it looks fine. It wasn't. The damage was wall-clock time and resumes, not money, and a dollar figure can't show that.

So the verdict cctop gives per phase shows failures as a count *and* as dollars, side by side, and it doesn't pick one for you. Each failed agent gets one structural cause, and each cause gets one fix line pointing at the `parallel()` or `pipeline()` call in the script. Here it read: "batch this phase's items, or lower its effort/model". If the script has changed since, it says so rather than pointing at code that is no longer the one that failed.

I've run into this long before agents. A team measured on one number learns to make that number look good. Here the "team" is a script, and the lesson is the same: when you can't tell whether a failure is expensive or merely slow, show both, and let the person who owns the trade-off decide.

It shipped today in cctop v0.9.0 (https://github.com/tomstagl/cctop). The first post on cctop, covering context, cache, spend and the coach, is here: https://tomstagl.com/blog/cctop-htop-for-claude-code/

[attach: cctop-workflow-runs.mp4, or the poster frame `cctop-workflow-runs.poster.png`]

> Rationale: LinkedIn readers are engineering leaders, so the hook is the measurement point and the tool is the example. That fits the positioning of engineering leadership broadly. Signal: comments from people who run teams, not only people who use Claude Code.
