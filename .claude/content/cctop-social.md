# Social variants — cctop: htop for a Claude Code session

Post: https://tomstagl.com/blog/cctop-htop-for-claude-code/ (DatoCMS `U6EeZdBpS3mX78ahGceVyw`, published 2026-09-26)
Repo: https://github.com/tomstagl/cctop

All figures from the repo and PRD §14: 386 lines / 143 API calls / up to 13 lines per response,
36 coach rules, 20 % false-positive demotion after ten fires, 211 commits, v0.1 → v0.8 in ten days.

---

## X / Twitter — single tweet

Claude Code shows you a context % and a spinner. Not what the session costs, when the cache goes cold, how close the 5h limit is, or what the turn is stuck on.

cctop shows all of it, live, in a pane beside the session. Read-only.

https://tomstagl.com/blog/cctop-htop-for-claude-code/

---

## X / Twitter — thread

1/ Claude Code shows you a context percentage and a spinner.

Not what the session costs. Not when the cache goes cold. Not how close the 5h limit is. Not what the turn has been waiting on for 90 seconds.

2/ cctop is htop for a Claude Code session.

Context, cache countdown, spend, rate limits, tools, subagents. Live, in a pane beside the session.

Read-only. Everything comes from files Claude Code already writes to disk.

3/ The data was never the problem. Its shape was.

The first number I computed was wrong by 2.7×. One API response is written as up to 13 transcript lines, each with the full usage. 386 lines were 143 calls.

4/ Seeing it isn't enough, so there's a coach. 36 rules, no model call, one nudge at a time: reply now before the cache goes cold, you committed without a check.

It measures itself against a control arm. Rules past 20% false positives get demoted.

5/ brew install tomstagl/tap/cctop

then /cctop in any session.

https://tomstagl.com/blog/cctop-htop-for-claude-code/
