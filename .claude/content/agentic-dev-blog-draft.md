---
title: "The boring plumbing of an agent fleet"
subtitle: "Where I went after the agentic workspace post — a self-hosted runtime, a 12-agent fleet, and GitHub as the loop-back."
slug: "the-boring-plumbing-of-an-agent-fleet"
abstract: "I wrote about an agentic workspace earlier this year. It only ran when I was sat in front of it. So I started another side project to learn what AI-native engineering looks like when the agents have their own clock. Here is the wiring, end to end."
seo_title: "The boring plumbing of an agent fleet — Tom Stagl"
seo_description: "A 12-agent fleet on a self-hosted runtime, Claude Code at the desk, GitHub as the loop-back. The weekend side project after the agentic workspace post."
status: draft
prior_post: https://tomstagl.com/blog/agentic-workspace-claude-code/
diagrams_needed:
  - D1 — "The masterminds talk to the fleet"
  - D2 — "The fleet talks back"
  - D3 — "The data plane"
---

Earlier this year I wrote about turning my personal site into an agentic workspace. Claude Code, an Obsidian vault for the parts of my thinking I do not want to lose, a small set of subagents I invoke when I need them. That post ended on a working setup. The catch was: it only ran when I was sat in front of it. Saturday afternoon, two hours of weekend, then everything goes quiet again until next weekend.

I wanted to know what happens when the agents do not go quiet. So a few weekends ago I started another side project. This one specifically to learn what AI-native engineering looks like when the agents have their own clock — a twelve-agent design (three live so far, the rest landing one weekend at a time) running on a self-hosted runtime, in a Linux VM on my Synology NAS, talking to my repos through GitHub. None of this is for the day job. It is the boring plumbing of a hobby that has already taught me more than I expected.

This post is the wiring.

## The cast

Three players, two-and-a-half if you count me as half a player.

**Me, on weekends.** That is my honest title here. I am the only person allowed to merge anything to `main` on these repos. I decide what should exist. I decide what is not worth existing. The day job runs Monday to Friday; this is what I do for a few hours when time allows.

**Claude Code, the implementation lead.** This is the AI tool that lives in my terminal. When I open it, it has access to both project repos, my shell, the GitHub CLI, an SSH key, my browser via Playwright, and a memory store at `~/.claude/projects/<project>/memory/` where it persists what it has learned about how I like to work. When I say "ask the test-coverage agent why it skipped `src/ai/model-router.ts` last run" or "stand up a new cron job for X," Claude is the one that actually does the typing. I think of it as a senior engineer who joined the team yesterday — strong, hardcore-technical, but with no tribal knowledge until the conversation builds it up.

**Openclaw, the agent substrate.** A self-hosted runtime that lives in a Linux VM on my Synology NAS. It runs background agents on cron. It exposes an OpenAI-compatible HTTP API on port 18789, plus its own CLI for ops. Each agent has a workspace, a slug, a model, a tool allow-list, and a prompt. Crucially: openclaw does not need to know anything about my project. It is a generic agent runtime; the specifics live in each agent's spec.

**The fleet, twelve specialised agents.** Each does one job, on a cron, with a tightly-scoped tool list, in an isolated session. They do not talk to each other. They do not share state outside of GitHub. Their lifecycle is: cron fires → fresh session boots → agent reads task → agent acts → agent opens a GitHub issue or PR and exits. We will meet them later.

## Build status

I want to be honest about what is real and what is on the slate. The *design* is twelve agents in three tiers (dev velocity, quality, ops). The *population*, a few weekends in, is more modest:

| Tier | Agent | Status |
|---|---|---|
| 1 | Dead Code & Flag Sweep | ✓ Running |
| 1 | Test Coverage Filler | ✓ Running |
| 1 | Scaffolding Finisher | ◯ Planned |
| 1 | AI Flow Consolidation Scan | ◯ Planned |
| 2 | Prompt Regression Sentinel | ✓ Running (currently erroring — debug on next weekend) |
| 2 | Fallback Chain Probe | ◯ Planned |
| 2 | Eval Baseline Curator | ◯ Planned |
| 3 | SQS Queue Health | ◯ Planned |
| 3 | Per-Flow Cost & Token Trend | ◯ Planned |
| 3 | Cache Freshness & Warmup Trigger | ◯ Planned |
| 3 | Batch Job State Tracker | ◯ Planned |
| 3 | Discogs Token Health | ◯ Planned |

What is finished is the *plumbing*. What is being filled in is the *population*. The design choices in this post — gateway, tokens, loop-back through GitHub, label conventions, the human gate — apply to the running three and the planned nine identically. Adding the next agent is a thirty-line cron spec; the structural work is done.

The rest of this post describes the design and the typical-Saturday workflow as if all twelve were live, because the operating shape does not change as I add them. The roster table later in the post is the design, not the population.

## Architecture: us → fleet

[D1: "The masterminds talk to the fleet"]

Two interaction surfaces:

1. **HTTP chat API for live conversation.** Openclaw exposes `/v1/chat/completions` and friends, OpenAI-compatible. I can hold a real-time conversation with any agent in my fleet — including the default agent that has no specific job and acts as a generic shell into the runtime.
2. **CLI over SSH for operations.** Anything I would want to administrate — registering new agents, scheduling cron, listing runs, installing skills — runs through `openclaw <subcommand>` on the host itself. I do not try to admin the runtime over the HTTP API; the CLI is the supported surface.

To keep these surfaces ergonomic from my Mac, I have a tiny shell wrapper called `oc`. It does three boring things: pulls the auth token from macOS Keychain, calls the HTTP API for chat, and SSHes for CLI ops with `PATH` set up correctly. The whole wrapper is about 50 lines of bash and zero of those lines hold a secret.

```bash
# Health check
$ oc health
{"ok":true,"status":"live"}

# List the agent inventory live (no caching)
$ oc models | jq '.data[].id'
"openclaw"
"openclaw/default"
"openclaw/main"
"openclaw/dead-code-sweep"
"openclaw/test-coverage-filler"
…

# Talk to a specific agent
$ oc msg dead-code-sweep "Why did you skip src/ai/model-router.ts in last run?"
The file has no unused exports flagged by knip and ts-prune, and the
single .skip marker has been there for 8 days — under the 21-day
threshold I use for the TODO sweep. I will re-check on the next
Tuesday tick. If you want me to lower the threshold, change the agent
prompt's "older than 21 days" line.

# Schedule a one-shot run two weeks out
$ oc cli cron add --name skill-revisit --at 2026-05-15T09:00:00Z \
                  --session isolated --tools exec,read,write \
                  --delete-after-run \
                  --message "$(cat /tmp/prompt.txt)"
```

The token is in Keychain because I want zero ways for it to end up in a screenshot, a screen-share, an `.env.local` checked in by accident, or a backup. The retrieval cost is one `security find-generic-password` invocation per call. The wrapper hides that detail.

The gateway itself binds to `lan` rather than loopback. This is a deliberate trade-off: my phone needs to reach openclaw too, and the LAN is the trust boundary I have already drawn for everything else here. If I were running this on a hostile network or in a co-working space, I would flip to loopback-only and use Tailscale.

## Loop-back: fleet → us

[D2: "The fleet talks back"]

This is the bit that taught me the most, and it is the bit that most agentic dev demos hand-wave past.

The question is: when an agent finishes a task at 04:17 UTC, where does its output go? Demos usually answer "to a Slack channel" or "to a webhook" or "to the next step in a chain." None of those satisfied me. I wanted:

- **Auditability.** I want to read what the agent did six months from now without spinning up infra to render the log.
- **Reversibility.** If an agent decided wrong, I want to undo it the same way I undo any other change: revert a commit, close an issue.
- **A surface I already use.** I do not want a fourteenth dashboard. I do read GitHub issues every weekend anyway.
- **No bridge to maintain.** A custom webhook receiver is code I would have to write, deploy, and patch. Not interested.

GitHub satisfies all four. So the loop-back design is: every scheduled agent ends its run by invoking `gh` directly from its workspace, with a tightly-scoped tool list (`exec`, `read`, `write`, no network access beyond what `gh` itself needs). It opens an issue or a PR, applies the conventional labels, and exits. That is it. No central output collector. No pub-sub. The agent posts to GitHub the same way I would.

The labels are dead simple:

- `openclaw` — applied to every agent-generated issue or PR. Catch-all. Lets me say `gh issue list -l openclaw` and see all the week's autonomous work in one shot.
- `openclaw:<slug>` — one per agent, e.g. `openclaw:dead-code-sweep`. There are about twelve of these total. I do not use per-run-id labels — that would create thousands and is forbidden by the rule I checked into the repo.

The agent's run-id lives in the issue body as parseable frontmatter:

```
---
run-id: 2a3aacf2-c1d5-4937-9a1f-a651d27be15f
agent: dead-code-sweep
ran-at: 2026-05-04T06:00:14Z
---
…the actual report…
```

That is enough for me to grep by run-id when triaging, and enough for any future agent to find related runs without me building a database for it.

I considered openclaw's native webhook delivery (`openclaw cron add --deliver webhook --webhook-url …`) and the hooks plugin. Both work. Both would have meant standing up an HTTP receiver, parsing structured payloads, and routing them somewhere. By having the agent speak `gh` directly, I skipped all of that. The only thing I had to do was `gh auth login` once on the openclaw box, with `repo` and `workflow` scopes.

This is the design call I would most want a hands-on engineer to copy. The temptation to build a "control plane" for your agents is enormous. Resist it. GitHub is your control plane.

### The human gate

The reason this loop-back is safe is that **every artifact an agent produces still passes through me before anything changes in the codebase**. An agent does not merge its own PR. An agent does not close its own issue. The fleet proposes; I dispose. That is not a feature I bolted on top — it is the consequence of the loop-back going through GitHub, where my account is the only one with merge rights on `main`.

Concretely, the human gate works like this:

- An agent opens an issue or PR with the conventional labels.
- On Saturday I run `gh issue list -l openclaw` and read everything new.
- For each item I do exactly one of: **approve** (Claude types the merge), **refine** (I leave a comment, or edit the agent's prompt for next run), or **reject** (I close it).
- Nothing else happens automatically. There is no `merge_after_review_window` flag. There is no "auto-merge if Tier 1 and tests pass." Auto-merge is a feature for code formatters; it is not a feature for agents that re-architect systems.

That gate is the difference between "background fleet that compounds my time" and "Roomba that occasionally eats the dog." I would rather review for ten minutes on a Saturday than spend two hours reverting a wrong call.

## The data plane

[D3: "The data plane"]

Where does state live in this setup? Three places, and the boundaries between them matter:

| Where | What | Lifecycle |
|---|---|---|
| macOS Keychain | API token for the gateway | One value, rotated by hand. Never on disk. |
| `~/.openclaw/` on the Synology VM | Gateway config (`openclaw.json`), cron specs (`cron/jobs.json`), agent workspaces | Authoritative for the runtime. |
| GitHub repos | Project rule files, agent specs (when I formalise them), every agent's output | Source of truth for what is running and what it did. |

The interesting boundary is between the openclaw host's local state and GitHub. The gateway config and cron specs are *runtime state* — authoritative for what is actually scheduled. But I want them version-controlled: if I lose the VM, I want the fleet rebuildable from a clean install. So a copy of `cron/jobs.json` lands in the repo periodically, and any change to a cron spec goes through a PR. The state file is the truth; the repo is the spec.

The split between local and committed extends to my Mac too. I keep a personal Claude Code memory store at `~/.claude/projects/<hash>/memory/` with environment-specific bits — Keychain service name, SSH host, the path to the `oc` wrapper. None of that is committed. Anyone else cloning my repo would not (and should not) get my Keychain command.

The project-wide conventions — label scheme, gh scope requirements, the new-agent checklist — *are* committed, in `.claude/rules/openclaw-integration.md`. Future me, future contributors, and future Claude Code sessions inherit them on clone.

This split was learned the hard way, by which I mean I once put an SSH host into a checked-in `CLAUDE.md` and it took me a week to notice nobody else's clone could resolve it. Personal lives in personal. Project lives in project. Fight to keep that boundary.

## Touring the fleet

The roster, anonymised to the abstractions I planned them under (the actual cron-job names map to internals I would rather not enumerate). You will recognise the *shape*; the names are tier-spec abstractions.

### Tier 1 — Dev velocity

| Agent | Cadence | What it does | Output |
|---|---|---|---|
| **Dead Code & Flag Sweep** | Tuesdays 06:00 UTC | Runs `ts-prune`/`knip`, finds one-sided feature flags older than 30 days, scans for `.skip` markers older than 21 days, locates orphan scripts | Up to 4 PRs/week, one per category |
| **Test Coverage Filler** | Wednesdays 06:00 UTC | Picks the single highest-impact under-tested file in `src/ai/`, `src/lib/model-router*`, or AI-API routes (lowest coverage × most call sites). Authors Jest tests | One PR/week with coverage delta |
| **Scaffolding Finisher** | Bi-weekly Thursdays 06:00 UTC | Converts known half-built things into "finished" or "removed" — DLQ inspect endpoints, Prisma migrations for state files, eval runner wiring | GitHub issue with plan first, 24h thumbs-up window, then PR |
| **AI Flow Consolidation Scan** | Monthly | Diffs prompt strings + schemas + ModelRouter configs across 22 AI flows; clusters those with >70% prompt overlap | One issue per month with consolidation map and projected token savings — no code, I decide |

### Tier 2 — Quality

| Agent | Cadence | What it does | Output |
|---|---|---|---|
| **Prompt Regression Sentinel** | Daily 04:00 UTC | Runs all 9 eval prompts × 5 sample records, compares token counts and schema validity to a baseline | Discord summary; auto-PR baseline if drift within ±15%, manual review otherwise |
| **Fallback Chain Probe** | Saturdays 05:00 UTC | Force-fails Sonnet on 5 fixed records, LLM-judges Haiku output on a rubric | Alert if mean rubric score under 7 |
| **Eval Baseline Curator** | Monthly | Samples 5 fresh records spanning genres, validates metadata, PRs them into the eval corpus | One PR with rationale per record |

### Tier 3 — Ops

| Agent | Cadence | What it does | Output |
|---|---|---|---|
| **SQS Queue Health** | Every 30 min | Checks queue depth, oldest message age, Lambda invocation/error rate via Dynatrace + AWS API | Auto-redrive on retriable DLQ messages older than 24h; Discord alert on backlog |
| **Per-Flow Cost & Token Trend** | Daily 21:00 UTC | Pulls token-per-flow breakdown via OpenLLMetry attributes; computes $/record-analysed and trend vs 7-day rolling average | Auto-PR weekly into a markdown trend file; alert on >25% above trend |
| **Cache Freshness & Warmup Trigger** | Sundays 02:00 UTC | Top-500 records last 7d via RUM, cross-references cache coverage, appends missing IDs to warmup queue | Triggers a GitHub Actions workflow with a cap of 200 new records per run |
| **Batch Job State Tracker** | Hourly | Polls Anthropic Batches API for pending batch_ids from the warmup workflow artifact | Cancels in-progress batches over 24h, re-enqueues affected records with cooldown |
| **Discogs Token Health** | Daily 06:00 UTC | Queries enrichment Lambda logs for "token decryption failed" or 401 over 24h | Alert if >2% of token operations fail |

A snippet of `oc cli cron list`, lightly redacted:

```
ID    Name                                 Schedule                     Next   Last     Status
…f23  Dead Code & Flag Sweep               cron 0 6 * * 2 (Vienna)      in 13h 1h ago   error
…fef  Test Coverage Filler                 cron 0 6 * * 3 (Vienna)      in 21h 3h ago   ok
…532  Prompt Regression Sentinel           cron 0 4 * * * (UTC)         in 13h 11h ago  ok
…7be  Per-Flow Cost & Token Trend          cron 0 13 * * * (Vienna)     in 20h 4h ago   ok
…106  Cache Freshness & Warmup Trigger     cron 0 19 * * 0 (Vienna)     in 2d  5d ago   ok
…7c0  AI Flow Consolidation Scan           cron 0 8 * * 1,3 (UTC)       in 3d  2d ago   ok
…f15  skill-revisit (one-shot)             at 2026-05-15 09:00Z         in 14d -        idle
```

Notice the `error` status on the first row. Not every cron run is green. The system is not magic. The same weekend I drafted this post, that agent had failed twice, and I had not yet investigated why. That is fine. The signal that something is wrong is visible at a glance, and I can dig in when I have a moment. The fleet does not demand attention; it just makes attention efficient when I give it.

## A typical Saturday

Concretely, here is what working with this looks like once the fleet is filled in. The three live agents already produce a smaller version of this; the other nine will join over the next month.

I sit down at my desk on Saturday afternoon, coffee in hand. I open Claude Code. The first thing I usually ask is some flavour of:

> What did the openclaw fleet do this past week?

Claude runs `gh issue list -l openclaw --state all --limit 30 --search "created:>2026-04-26"`. It reports back — say, twelve new issues across the week, four of which need real attention. One from Dead Code & Flag Sweep proposing to drop two unused exports. One from Test Coverage Filler with a PR adding tests for `src/ai/model-router.ts` (with a coverage delta of +6.3%). One from Per-Flow Cost & Token Trend, an alert that the previous weekend's cost on a specific AI flow was 38% above trend. One from SQS Queue Health, a logged auto-redrive that needs no action.

I triage. The two PRs I read first; I merge the test-coverage one because its delta is good, and I leave a comment on the dead-code one asking it to also delete a stale entry under `__tests__/` that referenced one of the exports. Claude opens that PR comment for me. Done in under five minutes.

The cost alert is more interesting. I ask Claude to read the flow and compare token usage between the suspicious weekend and a healthy weekday. It does. It tells me the difference is one prompt-template branch that gets triggered on a specific record genre. We talk for a few turns. I decide to add a length cap to the prompt. Claude opens a PR. I review. Merge. Cost normalises by next run.

By the time my coffee is finished, the week's autonomous work is integrated and I have made one structural improvement. The fleet does not replace my work; it offloads the polling, sweeping, and noticing parts so that my couple of hours go to deciding.

## What I learned

A few honest observations from running this for a while. Not five tips.

**Two loops, not one.** There is a fast loop (me + Claude Code, in real time, in the terminal) and a slow loop (the fleet, on cron, in the background). They share no infrastructure beyond GitHub. They do not need to. Trying to merge them — one big "agentic IDE" that does both — would couple two things that should stay decoupled. Real-time conversation has very different latency, cost, and trust requirements than a cron job at 4 AM.

**Audit-by-git beats audit-by-dashboard.** Every consequential change in this system is either a git commit, a GitHub issue, or a PR. There is no "agent activity log" to inspect. The agent's diary is the issue list. This is also why I rejected the webhook-bridge design: a bridge is a place where data goes that is not tracked by the same tools that track everything else.

**Secrets in Keychain over `.env`.** I keep one secret out of `.env` and in macOS Keychain — the gateway token. The reason is not cryptographic; the reason is screenshots. I screen-share fairly often. `.env` files end up on screen by accident. Keychain does not. The price is one wrapper script. The benefit is one fewer thing to worry about.

**Tightly-scoped tool lists.** Every agent in the fleet runs with `--tools` set to the minimum it needs. Most are `exec`, `read`, `write`. None has unrestricted shell. The blast radius of an agent doing the wrong thing is bounded by the fact that it cannot, for example, send email, post to Slack, or curl a random URL. This is the same instinct that wrote the first IAM policy: capabilities, not roles.

**One cron job, one job.** None of the twelve agents does more than one thing. Dead Code & Flag Sweep does dead code and flag sweeping. It does not also fix lint warnings. If I want a lint-warning sweep, I add a thirteenth agent. The cost of agents is low. The cost of an agent that does too much is high — its prompt becomes a kitchen-sink, its output becomes ambiguous, its retries become opaque.

**The mastermind is still in the loop.** I do not ship without reading. The agents propose; I dispose. The day I let a Tier-1 agent merge to `main` without me reading the PR is the day this stops being engineering and starts being roulette. Auto-merge is a feature for code formatters, not for agents that re-architect systems. I would rather review for ten minutes on a Saturday than watch for an outage for two hours.

## What I would build next

Three things on the list, in order:

1. **A `/openclaw` Claude Code skill.** Not yet — I want two or three more agents producing GitHub activity before I codify the patterns. Premature abstraction is more expensive than re-typing a `gh` query. (I have a one-shot agent scheduled for two weeks from now to revisit this question. Yes, the skill-revisit logic is itself an openclaw cron job. Yes, it is a bit much. I find it amusing.)
2. **Cross-cutting agents that observe the fleet itself.** A coordinator that notices when two agents are stepping on each other — e.g. Dead Code & Flag Sweep removes an export that Test Coverage Filler is about to test. Not urgent — twelve agents doing twelve different jobs do not conflict often — but the moment I add three more, I will want it.
3. **Per-agent telemetry on economic behaviour.** I have per-flow cost tracked already. I do not yet have per-agent. The Per-Flow Cost & Token Trend agent should be able to spawn a sibling that focuses on per-agent cost. That sibling might author its own dashboard, in markdown, in the repo.

If you have read this far, the meta-point is: nothing in this setup is a research project. The most exotic component is the OpenAI-compatible HTTP API on a self-hosted runtime, and that has been a stable shape for two years. Everything else is conventions, labels, a wrapper script, and the patience to write down what I have learned about how I like to work.

Two posts in: the agentic workspace handles my thinking on weekends, and the fleet handles the polling and sweeping while I am elsewhere. AI-native engineering, at least the version I am learning at home, looks a lot less like science fiction than the demos suggest. It is plumbing. The boring part is what makes it work.
