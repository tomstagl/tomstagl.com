# Social variants — Agent Fleet: Autonomous 3 Days, Active 3 Hours

Post: https://tomstagl.com/blog/agentic-workspace-fleet/ (DatoCMS draft
`B5DZCpgWQQ-uz11zD7b63Q` — unpublished at time of writing)
Source thread: `recordsv-workspace/threads/2026-08-23-agentic-workspace-fleet.md`

All figures measured 2026-09-05 and reproducible via `gh pr list --state merged`
on an absolute date window. The 20-customer figure is Tom-verified but is NOT
attributed to the fleet in any variant — do not add a causal claim when editing.

---

## LinkedIn

Thirteen days of running an agent fleet across five repos. 188 merged pull
requests, 134 in the last week alone.

The number I would have quoted you from memory was "nearly a hundred." I was
off by half — about my own work, over a fortnight, while running the system
whose whole job is to track it. That's the most useful thing in this post: the
count you carry in your head is not a measurement.

Twenty new customers signed up in the same period. I'm not going to tell you
the fleet caused that. No cohort, no counterfactual, and two weeks in which
fifteen other things also changed. Adjacency is not causation, and adjacency is
what most posts in this genre are quietly selling.

What did surprise me is where the ceiling actually was. Not model capability,
not the concurrency cap, not my review time — bookkeeping. Of 33 open items, 15
are blocked, and six of those wait on conditions that are not tickets and never
will be: an environment injecting credentials it can't use, an API key with no
billing behind it, a check with no data to run against yet. One item had its
blocker written down correctly, in a comment one line above the field the
scheduler actually reads — so the scheduler kept dispatching it, and it kept
failing identically, at full cost, for days.

Make the blocking condition a parsed field, let it name a state of the world
rather than a ticket, and re-check it on a schedule. A rule in a document gets
worked around at 2am. A rule that fails a test doesn't.

The original design target was 30x the agent-hours applied. The hours were
never the constraint. Legibility was.

Full post: https://tomstagl.com/blog/agentic-workspace-fleet/

---

## X / Twitter — thread

1/ Thirteen days running an agent fleet across five repos.

188 merged PRs. 134 in the last week.

The number I'd have told you from memory: "nearly a hundred."

Off by half. About my own work. While running the system built to track it.

2/ The count you carry in your head is not a measurement.

Every figure in the post came from a command I can re-run. The one time I
trusted memory instead, memory was wrong by 88 pull requests.

3/ 20 new customers signed up in the same fortnight.

I'm not going to tell you the fleet caused that. No cohort, no counterfactual,
two weeks in which fifteen other things changed.

Adjacency is not causation. It's just what this genre of post usually sells.

4/ The thing that actually capped output wasn't model capability, or the
concurrency limit, or my review time.

It was whether the system could read its own reasons for being stuck.

5/ Of 33 open items, 15 blocked. Six wait on conditions that are not tickets
and never will be — an environment injecting credentials it can't use, an API
key with no billing behind it, a check with no data yet.

The agents had to invent names for them.

6/ One item had its blocker recorded correctly — in a comment, one line above
the field the scheduler actually reads.

So the scheduler kept dispatching it. It kept failing identically. At full
session rates. For days.

7/ Fix: make the blocking condition a parsed field, let it name a state of the
world rather than a ticket, re-check it on a schedule.

A rule in a document gets worked around at 2am. A rule that fails a test doesn't.

8/ The design target was 30x the agent-hours applied.

The hours were never the constraint. Legibility was.

Full post: https://tomstagl.com/blog/agentic-workspace-fleet/

---

## Single-tweet variant

188 merged PRs in 13 days across 5 repos with an agent fleet.

What capped throughput wasn't model capability. It was whether the system could
parse its own blockers — one item had its blocker written in a comment one line
above the field the scheduler reads, so it kept getting dispatched and failing
identically, at full cost, for days.

https://tomstagl.com/blog/agentic-workspace-fleet/
