---
name: startup-launcher
description: "End-to-end startup idea validation: market research, landing page generation, and marketing strategy. Use this skill whenever someone mentions a startup idea, wants to validate a business concept, needs a landing page for a new product, asks for go-to-market strategy, wants to test demand for an idea, mentions 'waitlist', 'validate my idea', 'startup research', 'landing page for my startup', 'go-to-market', or anything related to launching, validating, or marketing a new product or startup. Also trigger when someone says they want to 'build in public', 'test an idea', 'find product-market fit', or asks about competitors for a product concept they're considering building."
---

# Startup Launcher

Take a startup idea from concept to launch-ready in one shot: deep market research, a high-converting landing page with waitlist capture, and a concrete marketing strategy.

## Workflow Overview

This skill runs in 3 sequential phases. Complete each phase fully before moving to the next, because later phases depend on insights from earlier ones.

1. **Market Research** → Markdown report
2. **Landing Page** → React (.jsx) artifact with waitlist signup
3. **Marketing Strategy** → Markdown report

### Output Organization

Each idea gets its own folder for research documents. Landing pages live as routes in a **shared hub project** (see Hub Project Architecture below).

Use a short, kebab-case slug derived from the idea (e.g., `edge-ml-deploy`, `lab-equipment-marketplace`, `synthetic-robotics-data`).

```
ideas/
├── hub/                              ← Single TanStack Start project (all landing pages live here)
│   ├── package.json
│   ├── src/
│   │   ├── routes/
│   │   │   ├── index.tsx             ← Hub home: links to all ideas
│   │   │   ├── [slug].tsx            ← Per-idea hub page (links to pivots for that idea)
│   │   │   └── [slug]/
│   │   │       ├── pivot-a.tsx       ← Individual landing page routes
│   │   │       └── pivot-b.tsx
│   │   └── styles/
│   │       ├── pivot-a.css
│   │       └── pivot-b.css
├── edge-ml-deploy/
│   ├── market-research.md
│   └── marketing-strategy.md
├── synthetic-robotics-data/
│   ├── market-research.md
│   └── marketing-strategy.md
└── ...
```

**Path resolution:**
- In **Claude.ai**: save markdown files to `/mnt/user-data/outputs/ideas/[slug]/`, present landing page code as an artifact
- In **Claude Code**: markdown goes to `ideas/[slug]/`, landing pages go into `ideas/hub/src/routes/[slug]/`

Pick the slug early (during or right after Round 0) and use it consistently across all files for that idea.

### Hub Project Architecture

The hub is a single long-running TanStack Start project at `ideas/hub/`. All landing pages for all ideas are routes in this one project. This means:
- **One `npm run dev` command** serves everything
- Adding a new idea = adding new route files, no new project setup
- Navigate between ideas in the browser like a portfolio

**First-time setup (only needed once):**
```bash
cd ideas
npx create-tsrouter-app@latest hub --framework=react --add-ons tailwind
cd hub && npm install
```

**To run the hub:**
```bash
cd ideas/hub && npm run dev
# Open http://localhost:3000
```

**Adding landing pages for a new idea** (what Phase 2 does):
1. Create `ideas/hub/src/routes/[slug]/` directory
2. Add one `.tsx` + `.css` file pair per pivot/landing-page
3. Update `ideas/hub/src/routes/index.tsx` hub home to link to the new idea
4. The route auto-registers (TanStack Router Vite plugin picks it up)

**If the hub project doesn't exist yet,** create it during Phase 2 before adding routes. Check with `ls ideas/hub/package.json` first.

**Note on CSS isolation:** Since Vite injects all imported CSS globally in SPA mode, scope all CSS rules under a page-specific wrapper class (e.g., `.my-pivot-page { ... }`). Never use bare `body {}` or `:root {}` in landing page CSS files — they'll collide across pages.

## Phase 1: Market Research

This is the most critical phase. The user is running many ideas through this skill as a filter — the goal is to ruthlessly separate high-quality opportunities from mediocre ones. This is NOT a cheerleading exercise. Think of yourself as a harsh but fair VC analyst whose job is to kill bad ideas fast and surface genuinely promising ones.

### Round 0 — Idea Clarification

Before burning search calls on research, make sure the idea is specific enough to research. If the user says something vague like "something in AI for healthcare" or "a tool for developers," you don't have enough to work with. Ask clarifying questions first:

- **Who is the customer?** (company size, role, industry)
- **What's the specific problem?** (not just the space — the pain point)
- **What's the proposed solution?** (product form: SaaS, API, marketplace, hardware, etc.)
- **Any initial thoughts on how they'd make money?** (pricing model)

If the idea is already specific (e.g., "an AI tool that helps small landlords manage rental properties"), skip this and go straight to research.

Keep Round 0 fast — one message with 2-3 questions max. Don't turn this into a 10-question interview. The goal is just enough specificity to make the searches useful.

### Research Process

Use `web_search` extensively — aim for **15-20+ searches** across different angles. Shallow research leads to shallow conclusions, and the whole point is to avoid that. The depth of research is what makes this skill valuable.

**Tool budget note:** If you're hitting tool call limits, prioritize Round 2 (competitor research) over everything else. You can estimate market size from training data, but you cannot fake competitor intel — that requires live search data. Competitor depth is what makes this skill valuable vs. just asking an LLM to brainstorm.

**Search strategy (follow this sequence):**

**Round 1 — Problem validation (3-4 searches):**
- Search for the core problem being solved (not the proposed solution)
- Search for how people currently complain about this problem (Reddit, HN, Twitter, forums)
- Search for existing workarounds and hacks people use
- Goal: confirm the problem is real, painful, and frequent — not imagined

**Round 2 — Deep competitor research (6-10 searches):**
This is the most important round. Spend the majority of your search budget here.
- Search for direct competitors (products that solve the same problem)
- Search for indirect competitors (different approach to the same pain)
- Search for each major competitor individually — use `web_fetch` on the **top 5 most threatening competitors** to get exact pricing, positioning, features, and team size. For the remaining competitors, search results and Crunchbase/Tracxn summaries are sufficient.
- Search for competitor reviews, complaints, and churned user feedback (e.g., "why I left [competitor]", "[competitor] alternatives", "[competitor] review")
- Search for competitor funding rounds, acquisitions, or shutdowns
- Search Crunchbase/PitchBook data for the space
- Search for YC companies in the space (ycombinator.com/companies)
- Search for open-source alternatives on GitHub (these are competitors too)
- Search for "[space] alternatives" and "[top competitor] vs" to find players you missed
- Goal: build a complete competitive map with 10-15 players — who's funded, who's winning, who's dying, and why

**Round 3 — Market sizing and trends (2-3 searches):**
- Search for market size reports and estimates
- Search for industry growth rates and projections
- Search for recent funding activity in the space (which VCs are investing here?)
- Goal: quantify the opportunity with real numbers, not vibes

**Round 4 — Graveyard research (1-2 searches):**
- Search for startups that tried this and failed
- Search for post-mortems and "lessons learned" from the space
- Goal: understand what kills companies in this market — if 5 well-funded startups already died doing this exact thing, that's critical intel

### Competitor Deep Dives

For each major competitor found, use `web_fetch` on their website to extract:
- Exact pricing tiers and feature breakdown
- How they position themselves (what words do they use?)
- Who their testimonials/case studies feature (reveals target customer)
- Their team size and background (LinkedIn, about page)
- Tech stack signals (job postings reveal a lot)
- Recent blog posts or changelog (are they actively building or stagnant?)

This level of detail matters because it reveals where competitors are weak, where they're doubling down, and what gaps exist. Surface-level "they exist and do X" isn't useful.

### Market Research Report Structure

Write the report as a markdown file saved to the idea's folder as `market-research.md` (see Output Organization above for path resolution). Use this structure:

```
# Market Research: [Startup Name/Concept]

## Executive Summary
2-3 sentences. Cut straight to it — is this worth pursuing or not? If the answer is "probably not," say that clearly.

## Idea Quality Score: [X/10]
A single number with a one-line justification. This exists so the user can quickly compare scores across many ideas they're evaluating. Be harsh — a 7+ should mean "this has genuine potential and I'd put money behind it." Most ideas should land at 4-6.

Scoring rubric:
- 1-3: Fundamental problems (no real pain, saturated market, impossible unit economics)
- 4-5: Interesting but significant concerns (crowded space, unclear differentiation, hard GTM)
- 6-7: Promising with caveats (real pain, some competition but clear angle, viable path)
- 8-9: Strong opportunity (acute pain, underserved market, clear wedge, good timing)
- 10: Rare — obvious massive opportunity with favorable conditions

## The Problem
- What specific pain point does this solve?
- How are people currently dealing with it? (existing solutions, workarounds, hacks)
- How acute is the pain? (hair-on-fire vs. nice-to-have vs. "I didn't know I had this problem")
- How frequently does the user encounter this pain?
- What's the cost of NOT solving it? (time, money, frustration)

## Market Size
- **TAM** (Total Addressable Market): The entire market, with source
- **SAM** (Serviceable Addressable Market): The segment realistically reachable
- **SOM** (Serviceable Obtainable Market): What's capturable in 1-2 years
- Include sources, methodology, and assumptions
- If hard data isn't available, build a bottoms-up estimate (# of potential users × willingness to pay)

## Competitive Landscape

Cast a wide net here. The goal is to map the entire competitive terrain so the founder knows exactly who they're up against — direct competitors, indirect competitors, adjacent players, and the big tech platforms that could squash them.

### Search Strategy for Competitors
Don't stop at the obvious. Search for:
- Direct competitors (same problem, same solution)
- Indirect competitors (same problem, different approach — e.g., open-source tools, consulting firms, in-house teams)
- Adjacent players who could expand into this space (platform companies, tool vendors)
- Cloud/big tech offerings that overlap (AWS, GCP, Azure, NVIDIA, etc.)
- YC/funded startups in the space (check ycombinator.com/companies)
- Open-source projects that serve as free alternatives

### Competitor Matrix
A summary table with **10-15 competitors** (yes, really — surface the full picture):
| Competitor | Type (Direct/Indirect/Adjacent/BigTech) | Founded | Funding | Pricing | Users/Revenue (est.) | Key Strength | Key Weakness |
|---|---|---|---|---|---|---|---|

### Deep Dives
For each major competitor (aim for **10-15**, including at least 2-3 open-source/free alternatives):
- **Name, URL, founding year**
- **Funding**: How much raised, from whom, latest round
- **Product**: What they actually do (be specific, not just their tagline)
- **Pricing**: Exact tiers and what's included
- **Target customer**: Who they sell to (SMB, enterprise, consumer, etc.)
- **Strengths**: What they genuinely do well
- **Weaknesses**: Where users complain, features missing, poor UX, pricing complaints
- **Momentum**: Are they growing, stagnant, or declining? (check recent news, hiring, product updates)
- **Threat level**: How hard would it be for them to build what you're proposing?

### Failed Competitors / Post-Mortems
Startups that tried something similar and failed. What killed them? This section is mandatory — if you can't find any, that itself is a data point (either the space is too new or too niche). Search for "[space] startup shutdown", "[space] post-mortem", "why [competitor] failed".

### White Space Analysis
Where exactly is the gap? Be specific — "better UX" is not a defensible position. Articulate what the proposed product would do differently and why competitors can't easily copy it.

### Differentiation & Defensibility Strategy
This section is critical — it tells the founder not just WHERE the gap is, but HOW to exploit it and DEFEND it. Structure it as:

**1. Proposed Positioning Statement**
One sentence: "We are the [X] for [Y] that [Z]." Make it specific enough that no existing competitor could truthfully claim it.

**2. Differentiation Axes**
Identify 3-5 specific ways the proposed product would differ from the top 3 competitors. For each axis:
- What exactly would you do differently?
- Why does this matter to the target customer?
- Why can't competitor X just copy this?

**3. Moat Analysis**
Which defensibility mechanisms could apply here?
- **Network effects**: Does the product get better with more users? How?
- **Switching costs**: Once a customer adopts, how painful is it to leave?
- **Data moat**: Does usage generate proprietary data that improves the product?
- **Community/ecosystem**: Can you build an open-source community or plugin ecosystem?
- **Specialization**: Are you building deep domain expertise that generalists can't match?
- **Speed**: Can you iterate faster than incumbents who have larger product surface areas?

Be honest — if none of these moats are strong, say so. Some ideas are genuinely hard to defend.

**4. Wedge Strategy**
How do you get the first 10 customers? Identify the specific sub-segment of the market where your differentiation matters most and where incumbents are weakest. This is your beachhead — the narrowest possible positioning that lets you win deals against larger competitors.

**5. Expansion Path**
Once you own the wedge, where do you expand? Map out the sequence: wedge → adjacent segment → broader market. Each step should leverage what you built in the previous one.

## Target Customer
- **Primary persona**: Job title, company size, specific pain trigger
- **Segment size**: How many of these people/companies exist?
- **Where they hang out**: Specific communities, forums, events, publications
- **Current spend**: What they pay for alternatives today
- **Switching cost**: How painful is it to switch from their current solution?
- **Decision maker vs. user**: Are they the same person? If not, who has budget authority?

## Trends & Tailwinds
What macro forces make this idea timely NOW? (regulatory changes, tech shifts like AI/LLMs, cultural movements, platform shifts, cost changes). If there are no tailwinds, that's a yellow flag — great ideas usually ride a wave.

## Risks & Challenges
Rank these by severity:
- **Market risks**: Is the market real? Is it growing or shrinking?
- **Competition risks**: Could an incumbent crush you by adding a feature?
- **Execution risks**: Does this require hard technology, regulatory approval, network effects?
- **Timing risks**: Is this too early? Too late?
- **Unit economics risks**: Can you actually make money at this?
- **Distribution risks**: Can you reach the customer affordably?

## Verdict
A direct, honest assessment structured as:
1. **The bull case**: The best argument for why this works
2. **The bear case**: The strongest argument against
3. **Differentiation summary**: In 2-3 sentences, what's your sharpest angle against the competitive field? Pull from the Differentiation & Defensibility section above.
4. **What would need to be true**: The key assumptions that must hold for this to succeed
5. **Recommendation**: Pursue / Explore further / Pass — with clear reasoning
6. **If pursuing — concrete next steps**: 3-5 specific validation actions (customer interviews, competitor analysis, prototype scope, etc.)
7. **Pivot suggestions** (if score ≤ 6): If the research revealed adjacent opportunities, related niches, or sharper angles that might work better than the original idea, list 1-3 specific pivots with a one-line explanation of why each might score higher. These often emerge naturally from the white space analysis, failed competitor post-mortems, or underserved sub-segments discovered during research. Don't force pivots if nothing came up — but often the research reveals that a VARIANT of the idea is stronger than the original.
```

The tone should be like a sharp analyst at a top VC fund writing an investment memo — data-driven, specific, opinionated. The user is filtering through many ideas, so clarity and honesty are more valuable than encouragement. A well-reasoned "pass" saves more time than a lukewarm "maybe."

### Quality Gate

After completing the market research report, present the Idea Quality Score and Verdict to the user BEFORE proceeding to Phase 2.

- **Score ≤ 5:** Recommend skipping Phase 2 and 3. If the research surfaced pivot suggestions, present those and ask: "Want me to research one of these pivots instead, or move to your next idea?"
- **Score 6+:** Proceed to Phase 2 automatically.
- **Score ≤ 5 but strong pivot found:** If a pivot suggestion from the verdict looks significantly more promising than the original, call it out explicitly: "The original idea scores X, but [pivot] could score higher because [reason]. Want me to run a quick research pass on that instead?"

This gate exists because the user is running many ideas through this process. Spending 20 minutes generating a landing page and marketing strategy for a 3/10 idea is wasted effort. But a pass shouldn't be a dead end — it should redirect toward something better when possible.

## Phase 2: Landing Page

Now build a landing page that would actually convert. This is the most important deliverable — it needs to look professional enough that real users would sign up.

### Design — Use the frontend-design Skill (Required)

**Always invoke the `frontend-design` skill before writing any landing page code.** Use the `Skill` tool with `skill: "frontend-design"` to load it. The skill defines how to pick an aesthetic direction, choose non-generic fonts, add motion, and avoid "AI slop" aesthetics.

Key rules from that skill (summary — always read the full skill):
- **Commit to a bold aesthetic direction** before writing a line of code. Pick a tone: brutally minimal, retro-futuristic, luxury/refined, editorial/magazine, industrial/utilitarian, etc.
- **Typography**: Distinctive Google Fonts only. Never Inter, Roboto, Arial, Space Grotesk. Pair a characterful display font with a refined body font.
- **Color**: CSS variables for consistency. A dominant color + sharp accent beats a timid even palette.
- **Motion**: Staggered entrance animations with `animation-delay`, hover states that surprise. One orchestrated page-load beats scattered micro-interactions.
- **No purple-on-white** (the default AI aesthetic). Every page must look different from the last.

Each pivot for an idea should have its own distinct aesthetic direction — if you're building 3 pivots, they should look like 3 different products.

### Landing Page as TanStack Routes

Do NOT create a standalone `.jsx` file. Instead, create a **TanStack route file** (`.tsx`) + a **scoped CSS file** that go directly into the hub project:

- Route: `ideas/hub/src/routes/[slug]/[pivot-name].tsx`
- CSS: `ideas/hub/src/styles/[pivot-name].css`

The route file must export a `Route` using `createFileRoute`:
```tsx
import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import '../../styles/[pivot-name].css'

export const Route = createFileRoute('/[slug]/[pivot-name]')({
  component: PivotPage,
})

function PivotPage() { ... }
```

**CSS isolation is critical.** Wrap ALL CSS rules in a page-specific class (e.g., `.df-page`, `.tc-page`). Never use bare `body {}` or `:root {}` in the CSS file — Vite injects all CSS globally and rules will collide between pages. Instead:
```css
/* ✓ Correct — scoped to wrapper class */
.my-pivot-page { --accent: #e8a020; background: #0c1b33; }
.my-pivot-page h1 { font-family: 'Bebas Neue'; }

/* ✗ Wrong — will bleed into all other pages */
body { background: #0c1b33; }
:root { --accent: #e8a020; }
```

CSS custom properties defined on a wrapper class cascade to all descendants identically to `:root`, so the design token system works exactly the same way.

Also update `ideas/hub/src/routes/index.tsx` to add a card linking to each new landing page.

The landing page must include:

**Above the fold:**
- A compelling headline that communicates the core value prop in <10 words
- A subheadline that expands on the benefit (not the feature)
- A clear waitlist signup form (email input + CTA button)
- Social proof or credibility indicator if possible

**Below the fold:**
- Problem/solution section: agitate the pain, then present the solution
- 3-4 key features/benefits with icons or visual elements
- How it works section (3 steps, keep it simple)
- FAQ section addressing likely objections
- Second CTA / waitlist signup at the bottom

**Copy principles:**
- Lead with benefits, not features
- Use specific, concrete language (not "revolutionary" or "cutting-edge")
- Address the reader directly ("you" language)
- Create urgency without being sleazy
- The copy should feel like it was written by a human who deeply understands the problem, not by a marketing bot

**Design principles:**
- Bold, distinctive design — not generic SaaS template vibes
- Choose an aesthetic direction that matches the product's personality
- The waitlist form should be impossible to miss
- Mobile-responsive
- Professional enough that someone would actually enter their email

**Waitlist form behavior (artifact mode):**
In the artifact preview, the email form should show a success state on submission (a thank you message, confetti animation, whatever fits the vibe). Store emails in React component state for the demo.

**Deployment-ready code comments:**
Include clear comments in the code showing exactly how to wire up a real backend. Structure the form submission handler so it's easy to swap in a real API call. Include this block as a comment near the form handler:

```
// =============================================
// DEPLOYMENT: VPS Setup Guide
// =============================================
//
// RECOMMENDED STACK (simple, secure, cheap):
//   - Build: npm run build → serve the dist/ folder as static files
//   - Reverse proxy: Caddy (auto-HTTPS via Let's Encrypt, zero config)
//   - API: tiny Express/Fastify server (or Go binary) for the /api/waitlist endpoint
//   - Database: SQLite (simplest) or Postgres
//
// STEP 1: Caddy config (automatic HTTPS, no cert management)
//   yourdomain.com {
//     root * /var/www/landing/dist
//     file_server
//     reverse_proxy /api/* localhost:3001
//   }
//
// STEP 2: Waitlist API endpoint
//   - POST /api/waitlist { email: string }
//   - Validate email format server-side (regex is not enough — use a library)
//   - Rate limit: max 5 requests per IP per minute (use express-rate-limit or equivalent)
//   - Insert into DB: INSERT INTO waitlist (email, created_at, ip) VALUES (?, NOW(), ?)
//   - Return 200 on success, 429 on rate limit, 400 on bad email
//
// STEP 3: Basic VPS security
//   - ufw: allow 80, 443, 22 — deny everything else
//   - Don't run the app as root (use a dedicated user)
//   - Set up fail2ban for SSH
//   - Keep the OS updated (unattended-upgrades)
//
// ALTERNATIVE: If you don't want to run your own API,
//   use Supabase (free tier, hosted Postgres, takes 10 min):
//   - Create a 'waitlist' table: email (text), created_at (timestamptz)
//   - npm install @supabase/supabase-js
//   - const { data, error } = await supabase.from('waitlist').insert({ email })
//   - Use Supabase Row Level Security to lock down the table
// =============================================
```

**Security considerations:**
- Always validate email format client-side AND server-side
- Never embed API keys, database credentials, or secrets in client-side code
- Rate limit the waitlist endpoint to prevent spam/abuse (5 req/IP/min is a sane default)
- Caddy handles HTTPS automatically — never serve forms over plain HTTP
- Sanitize all user input before storage (parameterized queries, not string concatenation)
- Do NOT include any third-party tracking scripts, analytics pixels, or external JS that the user didn't explicitly ask for
- Store IP addresses with signups so you can detect and purge bot spam later

Use insights from the market research to write the copy — reference the pain points, competitive gaps, and target customer language discovered in Phase 1.

## Phase 3: Marketing Strategy

Write a concrete, actionable marketing strategy saved to the idea's folder as `marketing-strategy.md`.

### Marketing Research Process

Don't just write a generic strategy from your training data. Use **3-5 web searches** to find real, current information specific to this market:

- Search for the specific communities where the target customer (from Phase 1) hangs out: "[industry] subreddit", "[industry] Discord", "[industry] Slack community", "[industry] newsletter"
- Search for how competitors in this space acquired their first users: "[competitor] growth story", "[competitor] how they got first customers", "how [space] startups grow"
- Search for recent successful Product Hunt or HN launches in adjacent spaces to understand what worked
- Search for influencers/creators in this niche who might amplify the launch
- Pull actual data from Phase 1's Target Customer section — use the communities, forums, and events already identified there

The strategy must reference specific, named communities, publications, and channels — not generic "post on social media" advice.

### Marketing Strategy Report Structure

```
# Marketing Strategy: [Startup Name/Concept]

## Strategy Overview
The core thesis: who are we reaching, where are they, and what message will resonate?

## Pre-Launch (Waitlist Building)
Specific, actionable tactics to get the first 100-1000 signups:
- Which communities to post in (with specific subreddits, HN, Discord servers, Slack groups, forums)
- Content marketing angles (what to write about, where to publish)
- Social media strategy (which platforms, what content format, posting cadence)
- Cold outreach approach if relevant (who to DM, what to say)
- Partnership/cross-promotion opportunities

For each tactic, include:
- Estimated effort (hours/week)
- Expected reach
- Cost (free vs. paid)

## Launch Strategy
How to create a launch moment:
- Product Hunt launch playbook
- Hacker News Show HN strategy
- Press/media outreach targets
- Influencer/creator partnerships
- Launch day timeline

## Post-Launch Growth
- Paid acquisition channels and estimated CAC
- SEO strategy (target keywords, content plan)
- Referral/viral mechanics
- Community building approach
- Email nurture sequence outline

## Budget Scenarios
- **$0/month (bootstrapped)**: What you can do with sweat equity only
- **$500/month**: Best bang for limited budget
- **$2000+/month**: Scaling what works

## Metrics to Track
Key metrics for each phase (pre-launch, launch, post-launch) with target numbers.

## 90-Day Action Plan
Week-by-week breakdown of what to do for the first 3 months.
```

The strategy should be specific to THIS startup — not generic "post on social media" advice. Reference the target customer profile and competitive landscape from Phase 1. Recommend channels where the target audience actually spends time.

## Running the Hub

After Phase 2, the user can run all landing pages with:

```bash
cd ideas/hub
npm run dev
# → http://localhost:3000 (hub home with all ideas)
# → http://localhost:3000/[slug]/[pivot] (individual landing pages)
```

**Tell the user this** at the end of Phase 2 — they may not know how to start the dev server.

If there's a port conflict (3000/3001 in use), Vite auto-selects the next available port — the terminal output will show the actual URL.

## General Guidelines

- Search the web extensively. This skill relies on live data. Run many searches across all phases — competitor info goes stale fast, and community recommendations change.
- Be direct and honest. If the idea has problems, say so in the market research. If a marketing channel won't work for this specific product, explain why instead of listing it anyway.
- **The landing page must use the frontend-design skill.** Invoke it with the `Skill` tool before writing any landing page code. The page must look professional and distinctive — not like a generic template. Each pivot should have a visually different aesthetic.
- Save markdown files to `ideas/[slug]/`. Landing pages go into `ideas/hub/src/routes/[slug]/` as TanStack route files.
- For a new idea, **always add to the existing hub project** (`ideas/hub/`) rather than creating a new TanStack app. Check if it exists first: `ls ideas/hub/package.json`. If not, set up the hub once (see Hub Project Architecture).
- At the end of Phase 2, always remind the user how to run: `cd ideas/hub && npm run dev`.
