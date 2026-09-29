---
brand: Tom Stagl (tomstagl.com)
site: https://tomstagl.com
routing: >-
  Tom's own voice: engineering leadership, engineering at scale, developer
  experience, and things Tom built (cctop, clawctl, the agent fleet). If
  Recordsv.lt is only the example, the post belongs here. If Recordsv.lt is the
  subject, it goes to studio-master (recordsv-workspace WORKSPACE.md §2).
voice:
  - .claude/agents/content-engine.md#Voice Guidelines
  - notes/Strategy/Content Strategy.md#What to Avoid
  - notes/Strategy/Content Strategy.md#Channels and Format
samples:
  - ../recordsv-workspace/voice/*.md (fallback: tomstagl/recordsv-workspace:voice/ via GitHub MCP)
  - .claude/content/cctop-blog-draft.md
  - https://tomstagl.com/blog (newest 2 posts)
never_use:
  - studio-master/.claude/agents/growth-strategist.md (the Recordsv.lt brand voice, a different person)
audience: notes/Insights/Audience Map.md
blog:
  adapter: datocms
  cms_skill: datocms
  draft_path: .claude/content/{slug}-blog-draft.md
  brief_path: .claude/content/{slug}-brief.md
  format_example: .claude/content/cctop-blog-draft.md
  length: 800-2000 words
  publish: >-
    Hand the approved draft to the datocms skill (BlogPost model, fields and
    upload quirks in .claude/commands/datocms.md). Create, then confirm again
    before the publish call.
social:
  path: .claude/content/{slug}-social.md
  channels:
    - name: LinkedIn
      rules: notes/Strategy/Content Strategy.md#Channels and Format
    - name: X / Twitter
approval: required
---

Keep-warm mode (`notes/Strategy/Project Overview.md`): 4–6 posts a year, published
when there is something worth saying. No newsletter, no signup CTA, no content
calendar. Positioning is engineering leadership broadly, not "platform engineering" or
"agentic engineering" as a category. No SEO keyword targeting: the brief skips the
keyword fields.

After publishing, update `notes/Implementation/Site Progress.md` with the post.
