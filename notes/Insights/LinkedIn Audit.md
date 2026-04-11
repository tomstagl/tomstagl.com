---
type: insight
agent: LinkedIn Audit
date: 2026-04-11
status: draft
---

# LinkedIn Audit — Thomas Stagl

## Scope and Access

LinkedIn restricts public profile visibility aggressively. Without a logged-in session, the public view shows only partial data (name, follower count, a truncated quote, and a position count). This audit combines:

- **Directly observed:** content visible on the public-facing LinkedIn page and Google search snippets
- **Third-party aggregators:** RocketReach and Wiza (scraped older data, reliability varies)
- **Site comparison:** tomstagl.com source code and rendered about page

Anything marked **[VERIFY]** requires Tom to check directly on his logged-in profile.

---

## 1. What Was Observed

### Profile URL
`linkedin.com/in/thomas-stagl/` (redirects to `at.linkedin.com/in/thomas-stagl`)

### Visible without login
- Name: Thomas Stagl
- Location: Kottingbrunn, Niederösterreich, Österreich
- Followers: 2,015
- Connections: 500+
- Total positions listed: 13
- Personal site linked: tomstagl.com *(good — this is correct)*
- Recommendations received: 7+ (directly observed from public snippets)
- About section begins with: *"It is not the strongest of the species that survives, nor the most intelligent. It is…"* — a Darwin quote, truncated

### Headline (as indexed by search engines)
All web sources (Google snippets, Wiza, RocketReach) consistently return:

> **"Director Software Development at Dynatrace"**

This is stale. The site timeline shows Tom was promoted to **Senior Director Software Engineering** in 2024. The LinkedIn headline appears not to have been updated to reflect that promotion.

**Gap: The headline is at least one level behind. This is the most visible field on LinkedIn — recruiters, collaborators, and anyone who searches the name sees this first.**

### About / Summary Section
Partially visible: begins with the Darwin quote. The full text is not accessible without login. 

**[VERIFY]** What is the full About section text? Does it match the site's positioning: "engineering leadership at scale," "engineer turned engineering leader," building tooling/infrastructure for 2,000+ engineers?

### Work History (via RocketReach aggregator — treat as indicative, not authoritative)

| LinkedIn (aggregated) | Site Timeline | Match? |
|---|---|---|
| Director Software Development, Dynatrace (2021–present) | Dir SE (2021), Dir of Engineering (2023), Sr Dir SE (2024) | Partial — promotions within Dynatrace likely collapsed into one entry |
| Business Agility Coach, Tom Stagl (2020–2021) | Freelance Business Agility Coach (2020) | Consistent |
| CTO, durchblicker (2018–2020) | CTO, durchblicker.at (2018–2020) | Consistent |
| Director Engineering, Digital River (2011–2018) | Director Engineering, fatfoogoo / Digital River (2009–2018) | Date discrepancy — LinkedIn shows 2011, site shows 2009 |
| Director Program Management, fatfoogoo (2009–2011) | Site has a single "Director Engineering — fatfoogoo / Digital River" entry from 2009 | Structural difference; not a factual gap |
| Self-employed (2007–2009) | Freelance Software Engineer (2007) | Consistent |
| Program Manager, Qpass (2003–2007) | SCRUM / Program Manager at QPass (2003–2007) | Consistent |
| Project Manager, Three UK | Not on site timeline | **[VERIFY]** Is this still accurate? Site doesn't include it. |

**[VERIFY]** The Dynatrace tenure almost certainly needs to be broken into three separate entries on LinkedIn to reflect the progression: Director SE → Director of Engineering → Senior Director SE. LinkedIn allows multiple roles at the same company. If it's showing as one entry, the promotions are invisible.

---

## 2. Gaps and Inconsistencies

### Critical

**A. Headline is stale**
The headline indexed across all search engines reads "Director Software Development." Tom's actual current title is Senior Director Software Engineering (confirmed in site code). The LinkedIn headline is the single most-seen piece of personal brand copy — it appears in search results, email previews, recruiter searches, and connection requests. This needs updating immediately.

**B. Job title naming inconsistency**
LinkedIn says "Director Software Development" throughout. The site uses "Software Engineering" (Director Software Engineering, Senior Director Software Engineering). These are different things to technical audiences. "Software Engineering" signals hands-on, build-oriented leadership. "Software Development" is more generic and slightly dated. **[VERIFY]** What does the actual Dynatrace HR title say? The site version should be treated as the brand-canonical name. If HR title allows flexibility, align LinkedIn to "Software Engineering."

**C. Dynatrace promotions likely invisible**
If the entire Dynatrace tenure is one entry ("2021–present"), the Dir → Dir II → Sr Dir progression is hidden. This progression is meaningful signal: it shows growth within a major public company over four years. That's worth surfacing explicitly.

### Moderate

**D. About section opens with a quote, not a positioning statement**
The Darwin quote is fine as a stylistic flourish but it consumes the visible snippet in search results and on the public profile. Anyone who lands on Thomas Stagl's LinkedIn without knowing him reads a nature quote rather than a positioning statement. The about section should lead with 2–3 sentences of who-you-are copy before any quote.

**Suggested opening (draft):**
> "Engineer turned engineering leader. I run a 350-person software engineering unit at Dynatrace, building the tooling and infrastructure that 2,000+ engineers depend on. My path here ran through SCRUM in 2003, in-game commerce at scale (Riot Games, Rockstar, Pokémon), a CTO role at an Austrian startup, and freelance coaching before landing in enterprise engineering leadership."

**E. "Director Software Development" vs site positioning**
The site's positioning is "engineering leadership at scale." The LinkedIn headline "Director Software Development" sounds like a hands-on line manager, not a unit leader. Even if the title is correct per HR, the headline field on LinkedIn can include a tagline or secondary descriptor.

**F. Digital River / fatfoogoo start date**
RocketReach shows 2011; the site shows 2009. **[VERIFY]** which is correct. The fatfoogoo → Digital River acquisition/rename may explain this — LinkedIn might have two entries while the site deliberately combines them.

### Minor

**G. Three UK / Project Manager not on site**
LinkedIn has an early role at Three UK as Project Manager that doesn't appear in the site timeline. This isn't necessarily a problem — the site timeline starts at 2003 (SCRUM adoption) as the narrative anchor, not as a complete CV. But it's worth knowing the discrepancy exists.

**H. Skills/endorsements not auditable without login**
The displayed skills in the 2022 Puckmayr TechLead article describe him as expert in "Project Management, Mobile Devices, Strategic Partnerships, Telecommunications, Scrum, E-commerce." These are the public endorsements from several years ago. **[VERIFY]** Current pinned skills should reflect engineering leadership, not early-career project management. Top 3 pinned skills should be something like: Engineering Leadership, Software Engineering, Organizational Design (or similar).

---

## 3. Recommendations

Ranked by impact on the "keep warm" goal.

### Do now (visible to everyone without login)

1. **Update the headline.** Change from "Director Software Development at Dynatrace" to something like:
   > `Senior Director Software Engineering @ Dynatrace | Engineering Leadership at Scale`
   
   Or simply the accurate title: `Senior Director, Software Engineering at Dynatrace` — then the "engineering leadership" framing lives in the About section.

2. **Rewrite the About section opening.** Lead with the positioning statement, not the Darwin quote. Move the quote further down or cut it. The first 2–3 sentences should be scannable identity copy (who, current role, what makes the career arc interesting).

3. **Break the Dynatrace entry into three roles** (same company, different titles):
   - Senior Director Software Engineering — Dynatrace (2024–present)
   - Director of Engineering — Dynatrace (2023–2024)
   - Director Software Engineering — Dynatrace (2021–2023)
   
   This surfaces the promotion trajectory and avoids the "one long tenure" read.

### Do soon (profile completeness)

4. **Audit and update pinned skills.** Remove or deprioritise skills that reflect 2010-era work. Surface: engineering leadership, software engineering, platform engineering, team building, organisational design.

5. **Verify and reconcile date discrepancies** — particularly the Digital River / fatfoogoo start date (2009 vs 2011). Align LinkedIn to match the site once verified.

6. **Add featured section content** (if empty). A link to tomstagl.com or a strong post about engineering leadership philosophy would serve as a landing strip for anyone who visits the profile.

### Consider (positioning depth)

7. **Align the "current role" description text.** The site About page has sharp language: *"My team builds the tooling and infrastructure for 2,000+ engineers. The job is mostly about people and structure. The engineering background is why it works."* This is much stronger than a typical LinkedIn role description. Adapt it for the Dynatrace entry's description field.

8. **Post occasionally.** The public profile shows 114 posts but the most recent visible activity is from 2022–2023. Even one post per quarter on a topic like engineering culture, AI in developer tooling, or team structure would keep the profile warm and signal current thinking. The site's blog and LinkedIn can share content.

---

## 4. Summary Assessment

| Area | Status |
|---|---|
| Headline | Stale — one title behind, wrong discipline name |
| About section | Unknown (login required) — opening is a quote, not a positioning statement |
| Work history completeness | Broadly consistent but Dynatrace promotions likely collapsed |
| Positioning alignment with site | Weak — LinkedIn reads "mid-level director" not "senior engineering leader at scale" |
| Site linked | Yes — tomstagl.com is linked |
| Content activity | Thin — most visible posts are 2022–2023 |

The most important fix is the headline. It's the only thing recruiters, collaborators, and a casual Google search shows without clicking through. Everything else can follow.

---

## Sources and Access Notes

- Public LinkedIn profile: `https://www.linkedin.com/in/thomas-stagl/`
- RocketReach aggregated data (scraped, may be months/years stale): work history used as indicative only
- Wiza: returned 403, not used
- Brutkasten article (2022): direct observations about leadership philosophy and dual-lead role with Elke Oberhuber
- tomstagl.com source code: confirmed current title, timeline, and positioning as of 2026-04-11
- LinkedIn search snippets: confirmed headline text as indexed

**Nothing in this audit should be treated as authoritative for the About section text, skills, featured section, or recommendations — all require logged-in access to verify.**
