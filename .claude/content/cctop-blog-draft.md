---
title: "cctop: htop for a Claude Code session"
subtitle: "Claude Code shows you a context percentage and a spinner. Everything else it knows is sitting in files on your disk. So I put it in a pane."
slug: "cctop-htop-for-claude-code"
abstract: "I built cctop, a read-only btop-style dashboard that sits in a pane beside a running Claude Code session: context, cache, spend, rate limits, tools, subagents. The more interesting part is the coach, which gives one nudge at a time and measures whether its own advice is worth anything."
seo_title: "cctop: a live htop-style dashboard for Claude Code — Tom Stagl"
seo_description: "cctop is an open-source, read-only terminal dashboard for a running Claude Code session: context fill, cache countdown, cost, rate limits, tools and subagents, plus a rule-based coach that measures its own advice against a control arm."
blogimage: "cctop-hero.png (1200×480) — alt: A terminal split in two: a Claude Code session on the left, the cctop dashboard with context, cache, spend and limits cells on the right."
status: draft
---

# Sections

## (no title)

The first number I computed for cctop was wrong by a factor of 2.7.

The plan was simple. Claude Code writes every session to a transcript under `~/.claude/projects/`, one JSON line at a time, with token usage on every assistant line. Add up the usage and you have the session's tokens. On a real session that gave 386 assistant lines. It also gave a total that was nowhere near what Claude Code's own cost figure said.

The reason is that one API response is written as several lines, one per content block, and every one of them carries the full usage of the whole response. Sum the lines and you count the same response up to thirteen times. The fix is one rule (deduplicate by `message.id`), and it is the first test in the repo. 386 lines turned out to be 143 API calls.

That is the whole project in miniature. The data about what your agent is doing already exists. It is just not where you would look, and not shaped the way you would assume.

## What it is

cctop is an `htop`/`btop`-style dashboard for one running Claude Code session. You type `/cctop` and it opens in a pane beside the session. If your Claude Code build supports function hooks it docks inside Claude Code, and if not it opens as a split of your tmux, zellij, WezTerm, Kitty or iTerm2 window. You keep working on the left and read the right.

What it shows is what I kept wanting to know mid-session and could not see:

- **Context:** how full the window is, what it is made of (the fixed prefix, file reads, bash output, agent returns, thinking), and how many turns until autocompact at the current rate.
- **Cache:** whether the prompt cache is still warm, the countdown until it goes cold, and how many tokens the next call re-writes if it does.
- **Spend:** cost with its provenance (Claude Code's own ledger, or priced by cctop, or both), the burn rate, and what the next thirty calls will cost at the current context.
- **Limits:** 5-hour and 7-day usage, plus a straight-line forecast of when you hit the ceiling.
- **Tools and agents:** calls, errors, p50 latency and how much context each tool pushed; one row per subagent with what it cost and whether its work came back.

It is read-only. It never writes to Claude Code, never drives the session and never sends anything anywhere. Everything comes from files and processes Claude Code already produces: the session registry, the transcript, subagent transcripts, the status-line JSON, optional hooks and the process tree. If you install nothing but the binary, every panel still renders. The optional pieces add precision and never add error messages.

## The coach, and why it has a control arm

A dashboard answers "what is happening". I wanted something that answers "what should I change", without turning into a second chatbot that nags.

So cctop has a coach. It is rule-based, with 36 rules and no model call. Every trigger is structural: a tool result, a denial, an interrupt, an API error, a git operation. None of them match keywords in your prompt. A few examples:

- Your cache is about to go cold while Claude is waiting on your answer. Replying now saves a re-write of the whole context.
- You committed without running a check since your last edit.
- One tool result pushed 40k tokens into context, and every call since has paid to re-read it.
- A subagent finished and returned nothing, and here is what it cost.

It shows one nudge at a time, in one slot, ranked NOW › NEXT › LATER, with cooldowns, expiry and snooze. If it tells you everything, you learn to ignore all of it.

Then comes the part I care about most, and it is not really a Claude Code point. Advice has a cost too. A nudge that fires when nothing is wrong teaches you to dismiss the next one. So the coach measures itself. Every fire is recorded: the rule, whether you acted, whether you snoozed, whether you dismissed it within two seconds. With `--coach auto`, sessions alternate between an exposed arm, where you see the nudges, and a control arm, where the rules still fire and are recorded but nothing is shown. `cctop coach-stats` then reports, per rule, the false-positive rate and the lift over the control arm. A rule past 20 % false positives after ten fires gets demoted automatically. A rule whose precision collapses on a new Claude Code version drops to the bottom of the queue.

I have spent a lot of my career on developer-productivity metrics, and this is the thing I would do differently at scale if I could start over. We are good at measuring the developer. We are bad at measuring the guidance we give them. A lint rule, a dashboard alert or a bot comment on a PR is an intervention, and interventions can be net negative. If you cannot say which of your nudges people act on, and whether they would have done it anyway, you do not have a feedback loop. You have noise with a logo.

## Building on someone else's internals

The honest caveat: cctop reads undocumented files. Claude Code's transcript format is not a public API, and it changes between releases. Compactions are written as explicit `compact_boundary` records only since 2.1.263; on older builds cctop has to infer them from a drop in context size. Counting turns correctly meant switching to the `promptId` field, which only exists from 2.1.220. And one re-verification against a new release found three of my hard-coded constants were wrong.

I did not pretend that away. I made it a first-class part of the project:

- Every number on screen is defined once, in a metrics registry that says how it is computed, which source it comes from and whether it is exact or an estimate (`≈`). The docs and the README reference are generated from that registry, and CI fails if they drift.
- Harness facts, meaning the constants cctop assumes about Claude Code, are re-read from the installed Claude Code by a script, not from memory.
- A daily CI job runs the real `claude` binary against the plugin contract. When Claude Code changes shape, I find out from a red build, not from a user.

If you build tooling on top of an agent harness, and more of us will, assume the ground moves. Put the assumptions in one place, label your estimates, and test the contract instead of trusting it.

## How it was built

cctop went from PRD to v0.1 in a day and to v0.8 in ten, across 211 commits of Rust (ratatui) plus a small TypeScript module for the in-Claude-Code panel. Almost every commit is co-authored by Claude. The first phase ran as a Ralph loop: a PRD, 43 dependency-ordered user stories, and an agent that takes the next story, implements it, runs the checks and commits. Later features each got their own PRD and a hand-off prompt. My part was the PRDs, the review pass against real transcripts before any code existed (that is where the 2.7× bug was caught, along with nine other wrong assumptions), and saying no.

Which is a little recursive: the tool for seeing what Claude Code is doing was written mostly by Claude Code.

## Install

```
brew install tomstagl/tap/cctop
claude plugin marketplace add tomstagl/cctop
claude plugin install cctop
```

Then type `/cctop` in a session. If something is missing (a multiplexer, the status-line shim, function hooks), it tells you exactly what and how to fix it instead of failing quietly.

The plugin also ships a `cctop-insights` skill. Ask the session "why is my cache hit ratio low?" and it queries cctop and answers with the numbers and one thing to change.

The repo is [github.com/tomstagl/cctop](https://github.com/tomstagl/cctop). MIT licensed, macOS and Linux. Issues and PRs welcome. If you think a coach rule is wrong, `coach-stats` output is the best bug report you can send.
