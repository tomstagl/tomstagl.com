---
type: implementation
updated: 2026-04-11
---

# Site Progress — tomstagl.com

Tracks what's been done on the site and what's queued, in relation to the brand strategy.

## Done

- [x] Upgraded Gatsby to 5.16
- [x] Repositioned from "platform engineering" to engineering leadership broadly
- [x] Toned down and simplified Dynatrace timeline entries
- [x] Homepage copy: "Engineer turned engineering leader. Senior Director Software Engineering at Dynatrace."
- [x] About page: full Dynatrace career arc (Dir SE → Dir of Engineering → Sr Dir, 2021–2024)
- [x] Removed headcount reference from homepage
- [x] Dropped dead/unused components
- [x] About page SEO description: replaced AI-first framing with "20+ years building and leading engineering teams at scale." (2026-04-11)
- [x] Principles section: tightened "Ask the team" bullet, improved metrics framing, rewrote feedback principle (removed "it's your fault" framing and gendered language) (2026-04-11)
- [x] Cover component: reviewed — "Googling for the regex / Every. Damn. Time." is clean and on-brand, no changes needed (2026-04-11)

## Known Issues / Flagged

- [ ] Blog content: thin, needs a content strategy before adding more

## Queued (awaiting strategy)

- LinkedIn / social metadata improvements
- Potential: newsletter sign-up, contact form, or CTA section
- Potential: speaking/talks page if speaking becomes a channel

## In Review

- [ ] Blog post: "I Turned My Personal Site Into an Agentic Workspace" (2026-04-12)
  - DatoCMS draft ID: `CU4YoQcGR_2sZQAlr9fiow`
  - Slug: `agentic-workspace-claude-code`
  - Review URL: https://tomstagl.admin.datocms.com/editor/item_types/233068/items/CU4YoQcGR_2sZQAlr9fiow/edit
  - 11 content blocks, 3 screenshots (hero + vault structure + parallel run)
  - Awaiting Tom's review before publishing
- [ ] Blog post: "cctop: htop for a Claude Code session" (2026-09-26)
  - Draft: `.claude/content/cctop-blog-draft.md`, hero `.claude/content/cctop-hero.png` (2400×960, terminal-mock style matching the clawctl hero)
  - Slug: `cctop-htop-for-claude-code` · Pillar 2 angle: measure the guidance, not just the developer (coach control arm)
  - One `[TOM: …]` placeholder for a first-hand observation
  - DatoCMS draft ID: `U6EeZdBpS3mX78ahGceVyw` (6 text blocks, hero upload `NSl76Z8HTqqYXpuUDn1hgg`)
  - Review URL: https://tomstagl.admin.datocms.com/editor/item_types/233068/items/U6EeZdBpS3mX78ahGceVyw/edit
  - Writes use `DATO_CMS_FULL_ACCESSAPI_TOKEN` from `.env`; `DATO_CMS_API_TOKEN` is read-only
- [x] Blog post: "cctop: reading a Claude Code Workflow run" (published 2026-09-29), cctop v0.9.0
  - Live: https://tomstagl.com/blog/cctop-workflow-runs/ · DatoCMS `dPO4s_V8Tp2IyJ7_ghiShA` (11 blocks)
  - Draft: `.claude/content/cctop-workflow-runs-blog-draft.md`, written with `/marketing:blog-draft` (the plugin's first real run)
  - Angle: the same measurement point as the first post. Failures counted in dollars looked healthy (234 of 300 failed, 198 on the first call); count and cost are shown side by side
  - Media: hero + 2 in-body stills, and a 34 s mp4 embedded as a `<video>` in a text block (the `video` block model is external-provider only and has no component in `blog-post.js`)
  - Social: `.claude/content/cctop-workflow-runs-social.md` (X post with video, X thread, LinkedIn), not posted yet

## Notes

Site is intentionally minimal for now. No changes beyond cleanup until Phase 2 strategy is defined.
