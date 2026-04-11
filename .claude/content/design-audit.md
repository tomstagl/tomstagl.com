# Design Audit & Proposal for tomstagl.com

**Date:** 2026-04-11
**Current state:** Post-content refresh, pre-visual refresh
**Target:** Senior platform engineering leader brand site

---

## 1. Current State Audit

### Overall Architecture
- **Framework:** Gatsby 5.14 (latest stable is Gatsby 5.14 -- effectively current for Gatsby 5.x, but Gatsby is in maintenance mode. No urgent upgrade needed.)
- **CSS:** TailwindCSS 3.4.15 (TailwindCSS 4.x is now stable -- significant upgrade opportunity)
- **Typography plugin:** @tailwindcss/typography 0.5.15
- **UI Library:** Ant Design 5.22 (imported but unclear how much is used -- potential dead weight)
- **Layout:** Max-width container (`lg:max-w-4xl`), centered, white background
- **Content source:** DatoCMS for blog posts

### Tailwind Config Issues
The `tailwind.config.js` is using the old Tailwind v2 color palette format, manually defining every color. This is a holdover from an early setup:
- Uses `purge` key (deprecated in v3, should be `content`)
- Full manual color definitions instead of using Tailwind's built-in palette
- No custom font families defined
- No custom spacing or breakpoints
- No `extend` pattern -- colors completely override defaults

### Color Palette: Teal (#38b2ac)
**Current usage of teal across the codebase:**
- Header background: `bg-teal-500`
- Footer background: `bg-teal-500`
- Cover hero background: `bg-teal-500`
- Timeline line/circles: `bg-teal-300`, `border-teal-300`
- Navigation pills: white text on teal background
- Link underlines: `border-teal-400` / `border-teal-200` on hover
- "Read more" links: `text-teal-600`
- Blockquote borders: `border-teal-500`
- Social icons: `text-teal-500`
- Avatar border: `border-teal-400`
- About page accent text: `text-teal-700`, `text-teal-400`

**Verdict:** Teal is the only brand color and it's applied uniformly everywhere. This creates a flat, one-note visual identity. Teal reads as "wellness brand" or "lifestyle blog" -- not "senior engineering leader." It's also the exact default teal from Tailwind v2, which makes the site look like an unmodified template.

### Typography
**Current state:**
- No custom fonts -- relies on Tailwind's default system font stack
- Cover hero: `font-serif` (system serif -- Georgia on most systems)
- Headings: uppercase, `text-3xl`, no font-weight differentiation between H1/H2/H3
- Body text: `text-gray-700`, `leading-relaxed`
- Blog posts use `prose` / `prose-xl` from @tailwindcss/typography

**Verdict:** System fonts are fine for performance, but the lack of typographic hierarchy is a real problem. H1, H2, and H3 all look nearly identical (all uppercase, all text-3xl or text-2xl). The uppercase headings read as "template" rather than "considered design." For a senior leader's site, the typography should convey confidence through restraint, not through shouting (ALL CAPS).

### Header / Navigation
**Current:**
- Full-width teal bar with "Tom Stagl" left, nav links right
- Nav links: white text, rounded pill buttons (`nav-tab` class)
- Only two links: "Start" and "Blog"
- "About" page exists but is not in the navigation

**Issues:**
- "Start" is an unusual label -- "Home" is expected, or just show the name as the home link
- About page missing from nav is a major gap for the brand
- The teal pill nav style is visually heavy for only 2-3 links
- No mobile hamburger/responsive nav pattern visible

### Homepage (Cover Component)
**Current:**
- Possum balloon image (regex.png), right-aligned with grayscale filter, negative margin hack
- Full-width teal block with "Googling for the regex" in serif font, "Every. Damn. Time." below
- That's it. No positioning statement, no links, no context about who Tom is

**What works:** The regex joke is distinctive and memorable. Keep it.
**What doesn't work:** A visitor from LinkedIn has zero context. They see a possum and a regex joke. No title, no role, no "what I do." The page doesn't convert curiosity into engagement. There's no path to the about page or blog.

### About Page
**Current:**
- Strong updated copy (already refreshed by Brand Architect)
- Intro paragraphs with one teal accent span
- Timeline component in a gray section
- "Some of My Principles" section with bullet list
- Old `AboutMe` component still exists with "Business Agility Coach" text (appears unused now)

**What works:** The content is strong. The timeline is a good concept.
**What doesn't work:**
- The timeline is a two-column layout that completely breaks on mobile (40% / 20% / 40% split at all screen sizes). On a phone, the text in 40%-width columns is unreadable
- Timeline cards are white boxes with `shadow-lg` that look like a dashboard UI component, not a career story
- No visual hierarchy between the intro and the timeline -- they run together
- The "Become a part of this story" CTA at the bottom of the timeline is vague

### Blog Listing
**Current:**
- Simple list: date, linked title (h4, bold), abstract paragraph
- No images, no tags, no categorization
- SEO title/description still says "agility and DevOps"

**What works:** Simplicity is fine for a personal blog. Not every blog needs cards.
**What doesn't work:**
- The list items have no visual separation -- they run together
- Date formatting is inconsistent with the positioning (fine technically, but could be more prominent)
- No visual affordance that items are clickable beyond the link styling
- The "about agility and DevOps" subtitle is outdated

### Blog Post Template
**Current:**
- Uses `prose` / `prose-xl` from typography plugin -- good foundation
- Back link, metadata, hero image, content blocks
- Social sharing buttons at the bottom (Twitter, LinkedIn, Facebook)

**What works:** The prose classes handle blog content well.
**What doesn't work:** The share buttons use react-share with Twitter branding (now X). Minor but dated.

### Footer
**Current:**
- Teal background, three-column layout
- Left column: empty. Center: "Imprint" link. Right: social icons
- Social icons are teal on teal background (hard to see)

**Verdict:** The footer is broken -- icons are invisible against the background. The empty column wastes space. For a personal brand site, the footer should be minimal but functional.

---

## 2. Design Direction Proposal

### Design Philosophy
**"Engineering craft, not corporate polish."**

The site should feel like it was built by someone who cares about good systems -- clean, fast, well-structured, with just enough personality to be memorable. Think: a well-maintained README that also has a sense of humor.

### Color Palette

Drop teal. Move to a **slate + blue-accent** palette that reads as technical, modern, and senior.

| Role | Color | Hex | Tailwind Token |
|------|-------|-----|----------------|
| **Primary** (text, headings) | Slate 900 | `#0f172a` | `slate-900` |
| **Secondary** (body text) | Slate 600 | `#475569` | `slate-600` |
| **Muted** (metadata, dates) | Slate 400 | `#94a3b8` | `slate-400` |
| **Accent** (links, highlights) | Blue 600 | `#2563eb` | `blue-600` |
| **Accent hover** | Blue 500 | `#3b82f6` | `blue-500` |
| **Accent subtle** (borders, tags) | Blue 100 | `#dbeafe` | `blue-100` |
| **Background** | White | `#ffffff` | `white` |
| **Surface** (cards, sections) | Slate 50 | `#f8fafc` | `slate-50` |
| **Border** | Slate 200 | `#e2e8f0` | `slate-200` |
| **Hero/Cover background** | Slate 900 | `#0f172a` | `slate-900` |

**Rationale:** Slate is Tailwind's modern neutral -- warmer than gray, more sophisticated. Blue-600 is the universal "engineering" accent (GitHub, VS Code, TypeScript docs all live in this space). It says "technical" without needing to try.

**Tailwind config changes:**
```js
// tailwind.config.js -- switch to extending default palette
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
```

This approach uses Tailwind's built-in `slate`, `blue`, `gray` palettes (which become available when we stop overriding the entire color config) plus adds a `brand` alias pointing to blue for easy future palette swaps.

### Typography

**Keep system fonts** but add `Inter` as a loaded web font for headings only. Inter is the engineering world's font -- used by GitHub, Vercel, Linear, Raycast. It's the "I know what good design looks like" signal.

Alternatively, if we want to keep it purely system fonts (zero network requests), use the Tailwind default stack which already prioritizes Inter on systems that have it installed.

**Recommendation: system fonts with explicit stack, no web font loading.** This is faster, and most of the target audience (engineers, tech leaders) will have Inter or SF Pro installed.

**Type scale:**
```
H1: text-4xl md:text-5xl font-bold tracking-tight text-slate-900
H2: text-2xl md:text-3xl font-semibold tracking-tight text-slate-900
H3: text-xl md:text-2xl font-semibold text-slate-800
Body: text-base text-slate-600 leading-relaxed
Small/meta: text-sm text-slate-400
```

**Key changes:**
- Drop `uppercase` from all headings -- it reads as a template, not a brand
- Add `tracking-tight` to headings for that polished, confident feel
- Clear size differentiation between heading levels
- Body text in slate-600, not gray-700 (slightly softer, easier to read)

### Homepage Redesign

**Structure (top to bottom):**

1. **Hero section** -- the regex joke (kept, reskinned)
2. **Positioning statement** -- one-liner about who Tom is (new)
3. **Recent posts** -- last 3 blog posts (new, optional)

#### Hero Section (reskinned Cover component)

```jsx
<div className="leading-relaxed content">
  <div className="pr-32 text-right md:pr-56 mb--4">
    <StaticImage
      src="../../../static/regex.png"
      alt="The James Williamson Possum Balloon"
      className="inline-block filter-bw-800"
      loading="eager"
      layout="constrained"
      placeholder="blurred"
      height={600}
    />
  </div>
  <div className="px-6 py-8 md:py-12 bg-slate-900 text-white">
    <h1 className="pb-4 font-serif text-5xl md:text-6xl leading-none tracking-tight border-b border-slate-700">
      Googling for the regex
    </h1>
    <p className="mt-3 text-xl leading-tight text-slate-300">Every. Damn. Time.</p>
  </div>
</div>
```

**Key changes:**
- `bg-teal-500` -> `bg-slate-900` (dark, authoritative hero)
- `border-white` -> `border-slate-700` (subtle divider)
- Subtitle in `text-slate-300` (softer than pure white)
- Added `tracking-tight` and slightly more padding

#### Positioning Statement (new section below hero)

```jsx
<section className="px-4 py-12 md:py-16">
  <div className="max-w-2xl mx-auto">
    <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
      <span className="font-semibold text-slate-900">Senior Director Software Engineering at Dynatrace.</span>
      {' '}Building the tooling, platforms, and infrastructure for 2,000+ engineers.
      Leading the shift to AI-first developer tooling.
    </p>
    <div className="mt-6 flex flex-wrap gap-3">
      <Link to="/about/" className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors border-0">
        About me &rarr;
      </Link>
      <Link to="/blog/" className="inline-flex items-center px-4 py-2 text-sm font-medium text-slate-600 bg-slate-100 rounded-md hover:bg-slate-200 transition-colors border-0">
        Blog &rarr;
      </Link>
    </div>
  </div>
</section>
```

This gives visitors immediate context after the personality hook. Mobile users (LinkedIn clicks) will see: joke -> who this person is -> where to go next. All above the fold.

### Header Redesign

```jsx
<header className="flex items-center justify-between px-4 py-3 md:py-4 border-b border-slate-200">
  <Link to="/" className="text-xl md:text-2xl font-semibold text-slate-900 border-0 hover:text-blue-600 transition-colors">
    Tom Stagl
  </Link>
  <nav>
    <ul className="flex items-center gap-1 md:gap-2">
      <li>
        <Link to="/about/" className="px-3 py-1.5 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors border-0">
          About
        </Link>
      </li>
      <li>
        <Link to="/blog/" className="px-3 py-1.5 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors border-0">
          Blog
        </Link>
      </li>
    </ul>
  </nav>
</header>
```

**Key changes:**
- White background with subtle bottom border (not a colored bar)
- Nav links: slate text with hover highlight, not white-on-teal pills
- Name links home (standard pattern)
- "Start" renamed, "About" added to navigation
- Clean, confident, minimal -- like a well-designed SaaS header but for a person

### About Page

#### Intro Section
```jsx
<section className="px-4 py-12 md:py-16">
  <div className="max-w-2xl mx-auto">
    <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-8">
      About
    </h1>
    <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
      <p>I build the machine that builds the software. ...</p>
      <p>My path here wasn't a straight line. ...</p>
      <p>The through-line across 20+ years:
        <span className="font-medium text-slate-900">
          build the systems and teams that let engineers do their best work
        </span>. ...
      </p>
      <p className="text-center text-xl font-medium text-slate-800 py-4 border-y border-slate-200">
        Still Googles for the regex. Still trusts the team.
      </p>
    </div>
  </div>
</section>
```

**Key changes:**
- Drop uppercase from heading
- Use `space-y-6` for consistent paragraph spacing
- Accent span: `text-slate-900 font-medium` instead of `text-teal-700` (emphasis through weight, not color)
- Tagline gets its own visual moment with border-y treatment

#### Timeline Redesign

The current timeline is a 3-column desktop layout (40/20/40) that doesn't collapse on mobile. It needs to become a single-column mobile-first design.

**Mobile-first timeline:**
```jsx
{/* Timeline container */}
<div className="relative">
  {/* Vertical line */}
  <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-slate-200" />

  {/* Timeline entry */}
  <div className="relative pl-12 md:pl-0 md:grid md:grid-cols-2 md:gap-8 mb-12">
    {/* Year marker */}
    <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full bg-white border-2 border-blue-600 text-xs md:text-sm font-semibold text-blue-600 z-10">
      2024
    </div>

    {/* Content card */}
    <div className="md:text-right md:pr-12"> {/* or md:pl-12 md:col-start-2 for right-side */}
      <h3 className="text-base font-semibold text-slate-900">
        Senior Director Software Engineering - Dynatrace
      </h3>
      <p className="mt-2 text-sm text-slate-600">
        Leading a 350-person unit building tooling...
      </p>
    </div>
  </div>
</div>
```

**Key changes:**
- Mobile: single column with line on the left, content to the right
- Desktop: alternating left/right with centered line (preserved from current, but with grid instead of fixed widths)
- Year markers: small circles with blue border (not giant 96px circles)
- Cards: no shadow, no white background -- just text directly on the page. Cleaner, more editorial
- Removes the dashboard-widget feel

### Blog Listing

```jsx
<section className="px-4 py-12">
  <div className="max-w-2xl mx-auto">
    <h1 className="text-4xl font-bold tracking-tight text-slate-900 mb-2">Blog</h1>
    <p className="text-slate-500 mb-8">Writing about platform engineering, leadership, and building at scale.</p>

    <div className="divide-y divide-slate-200">
      {blogData.map((post) => (
        <article key={post.node.slug} className="py-6 group">
          <time className="text-sm text-slate-400 tabular-nums">
            {post.node.meta.firstPublishedAt}
          </time>
          <Link to={`/blog/${post.node.slug}`} className="block border-0">
            <h2 className="text-lg font-semibold text-slate-900 group-hover:text-blue-600 transition-colors mt-1">
              {post.node.title}
            </h2>
          </Link>
          <p className="mt-2 text-slate-600 line-clamp-2">
            {post.node.abstract}
          </p>
        </article>
      ))}
    </div>
  </div>
</section>
```

**Key changes:**
- Clear dividers between posts (`divide-y`)
- Title hover turns blue (interactive affordance)
- `group` hover pattern for entire card feel without a card component
- `line-clamp-2` on abstracts for consistent visual rhythm
- Updated subtitle text to match new positioning
- Date in `tabular-nums` for aligned numbers

### Footer

```jsx
<footer className="border-t border-slate-200 mt-16">
  <div className="max-w-2xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
    <div className="flex items-center gap-4 text-slate-400">
      <a href="https://at.linkedin.com/in/herrstagl" target="_blank" rel="noopener noreferrer"
         className="hover:text-slate-600 transition-colors border-0" aria-label="LinkedIn">
        <FaLinkedin className="w-5 h-5" />
      </a>
      <a href="https://twitter.com/herrstagl" target="_blank" rel="noopener noreferrer"
         className="hover:text-slate-600 transition-colors border-0" aria-label="Twitter">
        <FaTwitter className="w-5 h-5" />
      </a>
    </div>
    <Link to="/impressum/" className="text-sm text-slate-400 hover:text-slate-600 border-0">
      Imprint
    </Link>
  </div>
</footer>
```

**Key changes:**
- White background, top border only (no colored bar)
- Social icons in muted slate, darken on hover
- Two-element layout: socials left, imprint right
- Fixes the invisible-icons-on-teal-background bug

### Global CSS Updates (layout.css)

```css
/* Link styles */
a {
  @apply border-b border-blue-200;
}
a:hover,
a:focus {
  @apply border-b border-blue-400;
}
a:link,
a:visited {
  @apply border-0;
}

/* Blockquotes */
blockquote {
  @apply border-l-4 border-blue-200;
}

/* Headings -- remove uppercase default */
h1.heading {
  @apply text-4xl text-slate-900 mb-4 font-bold tracking-tight;
}
```

---

## 3. Quick Wins vs. Bigger Redesign

### Quick Wins (1-3 hours each, Tailwind class swaps)

1. **Fix tailwind.config.js** -- Switch from overriding all colors to using `extend`. This unlocks the full Tailwind v3 palette including `slate`:
   ```js
   module.exports = {
     content: ['./src/**/*.{js,jsx,ts,tsx}'],
     theme: {
       extend: {
         colors: {
           brand: {
             // alias for blue if we want a single swap point
             DEFAULT: '#2563eb',
             light: '#dbeafe',
             dark: '#1e40af',
           },
         },
       },
     },
     plugins: [require('@tailwindcss/typography')],
   };
   ```

2. **Recolor the header** -- `bg-teal-500` -> white background + `border-b border-slate-200`. Update text colors. ~10 lines changed.

3. **Recolor the footer** -- Same pattern. Fix invisible social icons.

4. **Recolor the cover/hero** -- `bg-teal-500` -> `bg-slate-900`. Update text/border colors.

5. **Drop uppercase headings** -- In `Headers.tsx`, remove `uppercase` from H1/H2/H3, add `font-bold tracking-tight`.

6. **Add "About" to navigation** -- One line in `navigation.js` links array.

7. **Update link accent colors** -- In `layout.css`, swap `border-teal-*` to `border-blue-*`.

8. **Update blog listing subtitle** -- Change "about agility and DevOps" to match new positioning.

9. **Fix the AboutMe component** -- It still says "Business Agility Coach." Either update or confirm it's unused and remove it.

10. **Update gatsby-config manifest colors** -- `background_color` and `theme_color` from `#38b2ac` to `#0f172a`.

### Medium Effort (half day to 1 day each)

1. **Homepage positioning section** -- New component below the cover with the one-liner and CTA links. ~50 lines of JSX.

2. **Blog listing redesign** -- Restructure the BlogPost component with dividers, hover states, and updated typography. ~30 lines changed.

3. **Footer redesign** -- Restructure from 3-column to simple 2-element layout. ~20 lines.

4. **Timeline mobile responsiveness** -- The current timeline is a 3-column layout with fixed 40/20/40 widths that doesn't work on mobile. This needs a responsive rewrite with `md:grid` and mobile fallback. ~100 lines across 4 timeline components.

5. **Update blog post template** -- Adjust share buttons, back link styling, metadata display to match new palette.

6. **Clean up unused components** -- `AboutMe.tsx` still references "Business Agility Coach." Card and SmallCard components may be unused. Audit and remove dead code.

### Bigger Redesign (multi-day)

1. **TailwindCSS v3 -> v4 upgrade** -- TailwindCSS 4.x is a major rewrite (CSS-first config, no more JS config file, new engine). This would future-proof the design system but requires touching every file. **Recommendation:** Do the visual refresh on v3 first, then upgrade to v4 as a separate effort.

2. **Gatsby evaluation** -- Gatsby is in maintenance mode (Netlify acquired it, development has slowed significantly). The site works fine on Gatsby 5, but for a future-proof personal site, consider migrating to Astro or Next.js. This is a separate project, not part of the visual refresh.

3. **Dark mode** -- A dark mode toggle would be very on-brand for a technical audience. TailwindCSS makes this straightforward with the `dark:` variant. But it doubles every color decision, so do it after the base palette is settled.

4. **Homepage "What I'm Working On" section** -- A dynamic section showing current focus areas (AI-first tooling, platform engineering at scale). This needs content strategy before design.

5. **Blog tagging/categorization** -- If Tom plans to write about both leadership and technical topics, a tag system would help visitors find what's relevant. Requires DatoCMS schema changes.

---

## 4. Upgrade Path Assessment

### Current Versions
| Package | Current | Latest Stable | Action |
|---------|---------|---------------|--------|
| Gatsby | 5.14.0 | 5.14.x | Current. Gatsby is in maintenance mode. No upgrade needed. |
| TailwindCSS | 3.4.15 | 4.1.x | Major upgrade available. v4 is a full rewrite. |
| @tailwindcss/typography | 0.5.15 | 0.5.x | Current for v3. Would change with v4 upgrade. |
| React | 18.3.1 | 19.x | React 19 is out but Gatsby 5 doesn't support it. Stay on 18. |
| PostCSS | 8.4.49 | 8.5.x | Minor. Safe to upgrade. |

### TailwindCSS v4 Upgrade Notes

TailwindCSS v4 (released early 2025) is a ground-up rewrite:
- **CSS-first configuration** -- no more `tailwind.config.js`. Config lives in CSS with `@theme` directive
- **New engine** -- significantly faster builds
- **Automatic content detection** -- no more `content` array in config
- **New color palette** -- updated default colors
- **Breaking changes** -- many utility names changed, arbitrary value syntax changed

**Recommendation:** Do NOT upgrade to TailwindCSS v4 as part of this visual refresh. The migration is non-trivial and would distract from the design work. Instead:
1. First: Fix the v3 config (switch from `purge` to `content`, use `extend` pattern)
2. Second: Implement the visual refresh on v3
3. Third: Upgrade to v4 as a dedicated effort using the official migration tool (`npx @tailwindcss/upgrade`)

### Ant Design Dependency

`antd` 5.22 is in the dependencies but I found no evidence of it being imported in any component. If it's truly unused, removing it would significantly reduce bundle size. Verify with a build and remove if safe.

---

## 5. Implementation Priority

Recommended order of operations:

**Phase 1: Foundation (can be done in one sitting)**
1. Fix tailwind.config.js (unlock full palette)
2. Recolor header (white + border)
3. Recolor footer (white + border, fix icons)
4. Recolor hero/cover (slate-900)
5. Add "About" to navigation
6. Drop uppercase headings
7. Update link colors in layout.css
8. Update manifest colors

**Phase 2: Content & Layout (one day)**
1. Add homepage positioning section
2. Redesign blog listing
3. Update blog post template styles
4. Update blog page SEO text

**Phase 3: Timeline (one day)**
1. Mobile-responsive timeline rewrite
2. Visual style update for timeline entries

**Phase 4: Cleanup & Polish (half day)**
1. Remove or update `AboutMe` component
2. Audit unused components (Card, SmallCard, antd)
3. Test mobile layouts across all pages
4. Verify all teal references are eliminated

---

## 6. Mobile-First Considerations

Most traffic will come from LinkedIn clicks on phones. Key priorities:

- **Homepage:** Hero + positioning statement must both be visible without scrolling on a standard phone (375px width). The current possum image with `pr-32` creates a lot of wasted space on mobile.
- **Navigation:** Current nav works at 2-3 items on mobile. No hamburger needed.
- **Timeline:** Currently broken on mobile. The 40/20/40 split means ~150px for text on a phone screen. Must be single-column on mobile.
- **Blog listing:** Current list format actually works well on mobile. The proposed divider pattern improves it further.
- **Footer:** Current 3-column footer collapses poorly. Proposed 2-element layout with flex-col on mobile works cleanly.
- **Touch targets:** Nav links and CTAs need at least 44px tap targets. Current `px-4 py-2` on nav items is fine. New CTA buttons should maintain this.

---

## Summary

The current design is a Tailwind v2 template with a teal color scheme that says "lifestyle blog" or "agile coach." The new positioning demands a design that says "senior engineering leader who cares about craft." The path there is:

1. **Palette shift:** Teal -> Slate + Blue (immediate authority upgrade)
2. **Typography cleanup:** Drop uppercase, add tracking-tight, clear hierarchy
3. **Homepage context:** Add a positioning statement below the regex hero
4. **Navigation:** Add About, clean up styling
5. **Timeline mobile fix:** The centerpiece of the about page is broken on phones
6. **Footer fix:** Invisible icons, wasted space

The majority of this work is Tailwind class swaps -- the component structure is solid. The biggest structural change is the timeline mobile responsiveness, which needs a component rewrite.
