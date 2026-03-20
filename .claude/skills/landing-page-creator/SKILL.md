---
name: landing-page-creator
description: "Create high-converting landing pages with beautiful design and anime.js animations. Use this skill when someone wants a landing page, signup page, waitlist page, launch page, or any single-page site designed to capture emails or signups. Triggers: 'landing page', 'waitlist page', 'signup page', 'launch page', 'coming soon page', 'build me a page for', 'create a page for', 'I need a landing page', 'capture signups', 'collect emails', or any request to build a web page for a product, idea, or service that needs to convert visitors into signups."
---

# Landing Page Creator

Build stunning, high-converting landing pages with research-backed copy, distinctive design, and orchestrated anime.js animations. Every page is optimized for one goal: turning visitors into signups.

---

## Workflow Overview

```
1. UNDERSTAND  → Clarify the idea, audience, and value prop (1 message max)
2. RESEARCH    → Quick web research to inform copy angles (3-5 searches)
3. DESIGN      → Pick bold aesthetic direction, fonts, palette, motion plan
4. BUILD       → Write the landing page (.tsx + .css) with anime.js animations
5. DELIVER     → Drop into the hub, tell the user how to run it
```

Every phase feeds the next. Don't skip research — it's what separates generic copy from copy that converts.

---

## Phase 1: Understand the Idea

Before writing anything, make sure you know:

- **What is it?** One sentence: what does the product/service do?
- **Who is it for?** Specific persona (not "everyone" — who feels the pain most acutely?)
- **What's the core pain?** The problem it solves, in the user's own language
- **What's the desired outcome?** What does the user's life look like AFTER using this?

If the user gave a vague idea (e.g., "a tool for developers"), ask **one** clarifying message with 2-3 questions max. If the idea is specific enough, skip straight to research.

---

## Phase 2: Research for Copy Fuel

**This is not optional.** The difference between a 2% and 8% conversion rate is copy that speaks the audience's language. Run **3-5 web searches** to gather:

1. **Pain language** — How does the target audience describe this problem? Search Reddit, HN, Twitter, forums for complaints, frustrations, workarounds. Capture exact phrases — these become headlines.
2. **Competitor positioning** — How do 2-3 closest competitors describe themselves? What words do they use? You'll deliberately diverge from their framing.
3. **Objections** — What makes people hesitate? Search for "[competitor] reviews", "[space] complaints", "why I didn't buy [X]". These become FAQ answers.
4. **Social proof signals** — Any stats, quotes, or credibility markers you can reference? Market size, industry pain stats, expert quotes.
5. **Urgency drivers** — Is there a trend, regulation, or shift making this timely NOW?

**Save research notes mentally** — you'll weave them directly into the copy. Don't write a separate research doc; the landing page IS the deliverable.

### Copy Research Shortcuts

When searching, use these patterns:
- `"[problem] site:reddit.com"` — raw user language
- `"[competitor] alternative"` — positioning gaps
- `"[space] frustrating"` or `"[space] painful"` — pain intensity
- `"[competitor] pricing"` — anchor your perceived value

---

## Phase 3: Design Direction

### Invoke the frontend-design Skill (Required)

**Always invoke the `frontend-design` skill before writing any landing page code.** Use the `Skill` tool with `skill: "frontend-design"` to load it. That skill defines how to pick an aesthetic direction, choose non-generic fonts, add motion, and avoid "AI slop" aesthetics.

### Aesthetic Commitment

Before writing a single line of code, commit to ONE aesthetic direction. Examples:

| Direction | Vibe | Good For |
|---|---|---|
| **Brutally Minimal** | Lots of whitespace, giant type, one accent color | Dev tools, APIs, B2B SaaS |
| **Dark Terminal** | Dark bg, monospace, amber/green accents, grid overlays | Infrastructure, data, ML tools |
| **Luxury Editorial** | Serif headings, cream/charcoal, elegant spacing | Premium services, consulting, fintech |
| **Neo-Brutalist** | Raw borders, clashing colors, visible grid, bold shapes | Creative tools, communities, marketplaces |
| **Warm Organic** | Earthy tones, rounded shapes, hand-drawn elements | Consumer products, health, sustainability |
| **Retro-Futuristic** | Neon on dark, scanlines, CRT glow effects | Gaming, crypto, frontier tech |
| **Clean Corporate** | Navy + white, sharp cards, professional photography feel | Enterprise, healthcare, insurance |

**Each page must be visually distinct.** If you built a dark terminal page last time, pick something completely different now.

### Typography Rules

- **NEVER use**: Inter, Roboto, Arial, Helvetica, Open Sans, Lato, Montserrat. These are AI slop fonts.
- **Pick from distinctive Google Fonts.** Every page needs a characterful display font + a refined body font.
- Good display fonts: Bebas Neue, Archivo Black, Playfair Display, Syne, Space Grotesk, DM Serif Display, Outfit, Instrument Serif, Bricolage Grotesque, Darker Grotesque, Schibsted Grotesk
- Good body fonts: IBM Plex Sans, IBM Plex Mono, DM Sans, Source Serif 4, Libre Baskerville, Instrument Sans, Plus Jakarta Sans
- Import via `@import url('https://fonts.googleapis.com/css2?family=...')` at the top of the CSS file.

### Color Strategy

- Pick a dominant background + one sharp accent color
- Define ALL colors as CSS custom properties on the wrapper class
- A bold accent on a muted background beats a rainbow palette
- **Ban list**: purple-on-white (AI default), blue-on-white (generic SaaS), teal gradients

### Motion Plan (anime.js)

Before coding, plan the animation choreography:

1. **Page entrance** — What animates in first? Hero headline should be the star.
2. **Scroll reveals** — Which sections animate on scroll entry?
3. **Micro-interactions** — What happens on hover, focus, or form submit?
4. **Signature moment** — One memorable animation that makes the page stick (floating particles, morphing shapes, counter animations, text scramble, etc.)

---

## Phase 4: Build the Landing Page

### Technical Stack

- **Framework**: React + TanStack Router (route file)
- **Styling**: Scoped CSS file (all rules under a wrapper class)
- **Animation**: anime.js (loaded via dynamic import or CDN script tag)
- **Icons**: Lucide React (already in the hub)
- **No other dependencies** — keep it lean

### File Structure

```
ideas/hub/src/routes/[slug-or-name].tsx    ← Route component
ideas/hub/src/styles/[slug-or-name].css    ← Scoped CSS
```

If the idea is part of an existing slug with pivots:
```
ideas/hub/src/routes/[slug]/[pivot].tsx
ideas/hub/src/styles/[pivot].css
```

### anime.js Integration Pattern

anime.js must be loaded in the component. Use this pattern:

```tsx
import { useEffect, useRef } from 'react'

function LandingPage() {
  const pageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Dynamic import so it doesn't break SSR
    import('animejs').then((animeModule) => {
      const anime = animeModule.default

      // ── PAGE ENTRANCE TIMELINE ──
      const tl = anime.timeline({
        easing: 'easeOutExpo',
        duration: 800,
      })

      tl.add({
        targets: '.lp-hero-headline',
        translateY: [60, 0],
        opacity: [0, 1],
        duration: 1000,
      })
      .add({
        targets: '.lp-hero-sub',
        translateY: [40, 0],
        opacity: [0, 1],
      }, '-=600')  // overlap with previous
      .add({
        targets: '.lp-hero-form',
        translateY: [30, 0],
        opacity: [0, 1],
      }, '-=500')
      .add({
        targets: '.lp-hero-stats .stat',
        translateY: [20, 0],
        opacity: [0, 1],
        delay: anime.stagger(100),
      }, '-=400')

      // ── SCROLL-TRIGGERED REVEALS ──
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const el = entry.target

            // Animate based on data attribute
            const anim = el.getAttribute('data-anim')
            if (anim === 'fade-up') {
              anime({
                targets: el,
                translateY: [40, 0],
                opacity: [0, 1],
                duration: 800,
                easing: 'easeOutExpo',
              })
            } else if (anim === 'stagger-children') {
              anime({
                targets: el.children,
                translateY: [30, 0],
                opacity: [0, 1],
                delay: anime.stagger(80),
                duration: 700,
                easing: 'easeOutExpo',
              })
            } else if (anim === 'scale-in') {
              anime({
                targets: el,
                scale: [0.9, 1],
                opacity: [0, 1],
                duration: 600,
                easing: 'easeOutBack',
              })
            }

            observer.unobserve(el)
          }
        })
      }, { threshold: 0.15 })

      // Observe all animated elements
      pageRef.current?.querySelectorAll('[data-anim]').forEach(el => {
        // Set initial state
        ;(el as HTMLElement).style.opacity = '0'
        observer.observe(el)
      })

      // ── SIGNATURE ANIMATIONS ──
      // Example: floating particles
      anime({
        targets: '.lp-particle',
        translateY: () => anime.random(-20, 20),
        translateX: () => anime.random(-20, 20),
        opacity: [0.2, 0.8],
        duration: () => anime.random(2000, 4000),
        delay: () => anime.random(0, 2000),
        direction: 'alternate',
        loop: true,
        easing: 'easeInOutSine',
      })

      // Example: counter animation
      const counterEls = pageRef.current?.querySelectorAll('[data-count]')
      counterEls?.forEach(el => {
        const target = parseInt(el.getAttribute('data-count') || '0')
        const obj = { val: 0 }
        anime({
          targets: obj,
          val: target,
          round: 1,
          duration: 2000,
          easing: 'easeOutExpo',
          update: () => { el.textContent = obj.val.toLocaleString() }
        })
      })

      // Cleanup
      return () => {
        observer.disconnect()
      }
    })
  }, [])

  return <div ref={pageRef} className="lp-page">...</div>
}
```

**IMPORTANT**: Make sure `animejs` is installed in the hub project. Before writing the route file, check with `ls ideas/hub/node_modules/animejs` — if missing, add to the instructions or run `npm install animejs` in the hub directory.

### anime.js Animation Recipes

Use these as building blocks. Mix and match per page:

**1. Text Scramble Reveal (great for headlines)**
```tsx
// Reveal text character by character
anime({
  targets: '.scramble-text .char',
  opacity: [0, 1],
  translateY: [20, 0],
  rotateX: [90, 0],
  delay: anime.stagger(30),
  easing: 'easeOutExpo',
})
```
Requires splitting text into `<span class="char">` per character.

**2. Staggered Card Entrance**
```tsx
anime({
  targets: '.feature-card',
  translateY: [50, 0],
  opacity: [0, 1],
  delay: anime.stagger(100, { start: 200 }),
  duration: 800,
  easing: 'easeOutExpo',
})
```

**3. Morphing Background Blob**
```tsx
anime({
  targets: '.blob path',
  d: [
    { value: 'M240,200 C280,100 380,120 400,200 C420,280 360,380 280,360 C200,340 200,300 240,200Z' },
    { value: 'M260,180 C320,90 400,140 380,220 C360,300 320,380 260,340 C200,300 200,270 260,180Z' },
  ],
  duration: 4000,
  direction: 'alternate',
  loop: true,
  easing: 'easeInOutSine',
})
```

**4. Number Counter (for stats)**
```tsx
function animateCounter(el: Element, target: number, suffix = '') {
  const obj = { val: 0 }
  anime({
    targets: obj,
    val: target,
    round: 1,
    duration: 2200,
    easing: 'easeOutExpo',
    update: () => {
      el.textContent = obj.val.toLocaleString() + suffix
    },
  })
}
```

**5. Floating Particles / Dots**
```tsx
anime({
  targets: '.particle',
  translateX: () => anime.random(-30, 30),
  translateY: () => anime.random(-30, 30),
  scale: () => anime.random(0.5, 1.5),
  opacity: () => [anime.random(0.1, 0.3), anime.random(0.5, 0.9)],
  duration: () => anime.random(3000, 6000),
  delay: () => anime.random(0, 3000),
  direction: 'alternate',
  loop: true,
  easing: 'easeInOutSine',
})
```

**6. SVG Path Draw**
```tsx
const path = document.querySelector('.draw-path') as SVGPathElement
const pathLength = path?.getTotalLength() || 0
anime({
  targets: path,
  strokeDashoffset: [pathLength, 0],
  duration: 2000,
  easing: 'easeInOutCubic',
})
// CSS: .draw-path { stroke-dasharray: var(--path-length); stroke-dashoffset: var(--path-length); }
```

**7. Magnetic Hover Effect (on buttons/cards)**
```tsx
el.addEventListener('mousemove', (e) => {
  const rect = el.getBoundingClientRect()
  const x = (e.clientX - rect.left - rect.width / 2) * 0.15
  const y = (e.clientY - rect.top - rect.height / 2) * 0.15
  anime({
    targets: el,
    translateX: x,
    translateY: y,
    duration: 400,
    easing: 'easeOutExpo',
  })
})
el.addEventListener('mouseleave', () => {
  anime({
    targets: el,
    translateX: 0,
    translateY: 0,
    duration: 600,
    easing: 'easeOutElastic(1, 0.5)',
  })
})
```

**8. Success State Celebration (on form submit)**
```tsx
function celebrateSignup(containerEl: HTMLElement) {
  // Create confetti particles
  for (let i = 0; i < 30; i++) {
    const particle = document.createElement('div')
    particle.className = 'confetti'
    particle.style.cssText = `
      position: absolute; width: 8px; height: 8px;
      background: hsl(${Math.random() * 360}, 80%, 60%);
      border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
      left: 50%; top: 50%;
    `
    containerEl.appendChild(particle)
  }

  anime({
    targets: containerEl.querySelectorAll('.confetti'),
    translateX: () => anime.random(-150, 150),
    translateY: () => anime.random(-150, 50),
    rotate: () => anime.random(-180, 180),
    scale: [1, 0],
    opacity: [1, 0],
    duration: () => anime.random(800, 1400),
    delay: () => anime.random(0, 200),
    easing: 'easeOutExpo',
    complete: () => {
      containerEl.querySelectorAll('.confetti').forEach(p => p.remove())
    },
  })
}
```

**9. Smooth Section Divider Line Draw**
```tsx
anime({
  targets: '.section-line',
  scaleX: [0, 1],
  duration: 800,
  easing: 'easeInOutExpo',
})
// CSS: .section-line { transform-origin: left center; }
```

**10. Parallax Scroll Effect**
```tsx
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY
  anime.set('.parallax-slow', { translateY: scrollY * 0.3 })
  anime.set('.parallax-fast', { translateY: scrollY * -0.15 })
})
```

### Animation Choreography Rules

1. **Hero is the star.** The page-load animation timeline should make the hero section feel cinematic. Everything else is supporting.
2. **Stagger, don't simultaneous.** Elements should enter in sequence with 60-120ms gaps, not all at once.
3. **easeOutExpo for entrances.** Fast start, gentle landing. This is the default for 90% of entrance animations.
4. **easeInOutSine for loops.** Floating, breathing, and ambient animations should feel organic.
5. **easeOutElastic for delight.** Use sparingly — on button hovers, success states, or signature moments.
6. **One signature animation per page.** This is the "wow" moment. Could be: morphing SVG blobs, particle field, text scramble, path drawing, 3D card tilt, or a custom interactive element.
7. **Scroll animations fire once.** Use IntersectionObserver, unobserve after triggering. Don't re-animate on scroll back up.
8. **Set initial states in CSS or JS.** Elements that animate in should start invisible (`opacity: 0`) — set this in the JS right after observing, not in CSS (so content shows if JS fails).
9. **Performance**: Never animate `width`, `height`, `top`, `left`, or `margin`. Only animate `transform` and `opacity`. Use `will-change: transform` on animated elements.
10. **Respect reduced motion.** Wrap all animations in: `if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) { ... }`

---

## Copy Framework: The Conversion Architecture

This is the most critical part. Bad design with great copy converts. Great design with bad copy doesn't.

### The Page Structure (Scroll Sequence)

Follow this exact scroll sequence. It's based on the AIDA framework (Attention → Interest → Desire → Action) mapped to landing page sections:

```
┌─────────────────────────────────────────┐
│  NAV  (sticky, minimal, one CTA button) │
├─────────────────────────────────────────┤
│                                         │
│  HERO                                   │
│  ├─ Eyebrow text (category/context)     │
│  ├─ Headline (core value prop, <10 wds) │
│  ├─ Subheadline (expand the benefit)    │
│  ├─ Email form + CTA button             │
│  ├─ Social proof line (optional)        │
│  └─ Stats row (2-3 key numbers)         │
│                                         │
├─────────────────────────────────────────┤
│  PROBLEM SECTION (agitate the pain)     │
│  ├─ Section label                       │
│  ├─ Pain headline                       │
│  ├─ 3-4 problem cards with specifics    │
│  └─ Quote or stat that validates pain   │
├─────────────────────────────────────────┤
│  SOLUTION SECTION (present the relief)  │
│  ├─ Section label                       │
│  ├─ Solution headline                   │
│  └─ 3-6 feature/benefit cards           │
├─────────────────────────────────────────┤
│  HOW IT WORKS (reduce uncertainty)      │
│  ├─ 3 simple steps                      │
│  └─ Emphasize ease ("takes 5 min")      │
├─────────────────────────────────────────┤
│  SOCIAL PROOF (build trust)             │
│  ├─ Testimonials, logos, or stats       │
│  └─ Specific numbers > vague claims     │
├─────────────────────────────────────────┤
│  FAQ (handle objections)                │
│  ├─ 4-6 questions                       │
│  └─ Address: price, trust, effort,      │
│     "is this for me?", competition      │
├─────────────────────────────────────────┤
│  FINAL CTA (close the loop)            │
│  ├─ Recap headline (different from hero)│
│  ├─ One-line value reminder             │
│  └─ Email form (same as hero)           │
├─────────────────────────────────────────┤
│  FOOTER (minimal)                       │
└─────────────────────────────────────────┘
```

### Headline Formula

The headline is 80% of your conversion. Use one of these proven patterns:

**Pattern 1: Outcome + Specificity**
> "Ship 10x faster without breaking prod"
> "Generate training data your hands can actually use"
> "Turn 3 hours of bookkeeping into 3 minutes"

**Pattern 2: [Do X] without [pain Y]**
> "Scale your ML pipeline without managing infrastructure"
> "Hire senior devs without the 6-month search"

**Pattern 3: The [noun] for [audience]**
> "The Figma for hardware engineers"
> "The Bloomberg terminal for indie traders"

**Pattern 4: Challenge the status quo**
> "Your CI/CD pipeline is lying to you"
> "You don't have a data problem. You have a data quality problem."

**Pattern 5: Impossibly specific claim**
> "82% sim-to-real transfer. Out of the box."
> "From idea to deployed API in 47 seconds"

**Rules for headlines:**
- **Max 10 words.** Shorter is almost always better.
- **No buzzwords.** Ban: revolutionary, cutting-edge, next-gen, innovative, seamless, robust, leverage, synergy, empower, transform, unlock, supercharge.
- **Lead with the outcome, not the mechanism.** "Close deals 3x faster" beats "AI-powered sales acceleration platform."
- **Use the audience's exact language** (from your research). If they say "it's a pain in the ass to deploy," your headline should echo that frustration level.
- **One idea per headline.** If you need an "and," split it or pick the stronger half.

### Subheadline Formula

The subheadline EXPANDS the headline — it doesn't repeat it. It should:
- Explain HOW the headline's promise is delivered
- Add specificity (who it's for, what it does, how fast)
- Be 15-25 words
- Use natural, conversational language

Bad: "Our innovative platform leverages AI to transform your workflow"
Good: "Drop in two demos of your robot arm. We generate the training data to teach it any manipulation task in 48 hours."

### CTA Button Copy

**Never use "Submit" or "Sign Up".**

Good CTA text patterns:
- `Get Early Access` — creates exclusivity
- `Join the Waitlist` — implies demand
- `Start Free` — removes friction
- `Get [Specific Outcome]` — e.g., "Get Your Report"
- `Try It Free` — low commitment
- `Request Access` — implies selectivity
- `See It in Action` — curiosity

The CTA should complete the sentence: "I want to ___."

### Problem Section Copy

This is where you AGITATE the pain. The reader should feel "yes, that's exactly my problem" at least twice.

**Structure each problem card as:**
1. **Problem name** (short, punchy — 3-5 words)
2. **Problem description** (2-3 sentences, specific, using research language)
3. **Hidden cost** (what does NOT solving this actually cost them?)

**Tone:** Empathetic frustration, not condescending. You've felt this pain too.

**Use specific numbers and examples:**
- Bad: "Manual processes waste time"
- Good: "Your team spends 14 hours/week copy-pasting between Salesforce and Sheets. That's 728 hours a year — almost a full headcount — doing robot work."

### Feature/Benefit Cards

**ALWAYS lead with the benefit, then explain the feature.**

Structure:
```
[Icon or emoji]
[Benefit headline — what it does FOR THEM]
[1-2 sentences explaining how, with specifics]
```

Bad: "AI-Powered Analysis — Uses machine learning to analyze your data"
Good: "Know what's working in seconds — See which campaigns drive revenue, not just clicks. No SQL required."

### FAQ Section

The FAQ isn't for information — it's for **objection handling**. Every question should address a reason someone might NOT sign up.

**Must-have questions:**
1. **"Is this for me?"** → Describe the ideal user so clearly that the right person thinks "that's me" and the wrong person self-selects out.
2. **"How is this different from [competitor]?"** → Direct, honest comparison. Don't trash competitors — explain your unique angle.
3. **"What does it cost?"** → If free/waitlist: "Free during early access." If paid: be upfront. Ambiguity kills conversions.
4. **"How much effort does this take?"** → Reduce perceived effort. "You'll be set up in under 5 minutes."
5. **"Can I trust this?"** → Address the trust gap: team background, security, data handling, refund policy.

### Second CTA Section

The bottom CTA should:
- Use a **different headline** than the hero (people who scroll this far need a different angle)
- Be shorter and more direct — they're already interested
- Recap the single strongest benefit
- Include the same email form

Good bottom CTA headlines:
- "Ready to stop [painful thing]?"
- "[Outcome] starts here."
- "Your next [thing] deserves [benefit]."
- "Join [X] teams who already [outcome]."

---

## Technical Implementation Details

### Route File Template

```tsx
import { createFileRoute, Link } from '@tanstack/react-router'
import { useState, useEffect, useRef } from 'react'
import '../styles/[name].css'  // or '../../styles/[name].css' if nested

export const Route = createFileRoute('/[route-path]')({
  component: PageName,
})

function PageName() {
  const pageRef = useRef<HTMLDivElement>(null)
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [waitlistCount, setWaitlistCount] = useState(/* realistic starting number */)

  // Simulated waitlist counter
  useEffect(() => {
    const t = setInterval(() => {
      if (Math.random() > 0.97) setWaitlistCount(n => n + 1)
    }, 4000)
    return () => clearInterval(t)
  }, [])

  // anime.js initialization
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      // Show everything immediately
      pageRef.current?.querySelectorAll('[data-anim]').forEach(el => {
        ;(el as HTMLElement).style.opacity = '1'
      })
      return
    }

    import('animejs').then((mod) => {
      const anime = mod.default
      // ... animation code here (see anime.js recipes above)
    })
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Enter a valid email.')
      return
    }
    setError('')
    setLoading(true)

    // =============================================
    // DEPLOYMENT: Replace this block with real API call
    // POST /api/waitlist { email }
    // See deployment guide in comments below
    // =============================================
    await new Promise(r => setTimeout(r, 900))

    setSubmitted(true)
    setLoading(false)
    setWaitlistCount(n => n + 1)

    // Trigger celebration animation
    // celebrateSignup(...)
  }

  return (
    <div ref={pageRef} className="xx-page">
      {/* ... page content ... */}
    </div>
  )
}
```

### CSS Scoping (Critical)

**ALL CSS must be scoped to a wrapper class.** Never use bare `body {}`, `:root {}`, `html {}`, or `*`.

```css
/* ✓ Correct */
.xx-page { --accent: #ff6b2b; background: #0a0a0a; }
.xx-page h1 { font-family: 'Bebas Neue', sans-serif; }
.xx-page *, .xx-page *::before, .xx-page *::after {
  box-sizing: border-box; margin: 0; padding: 0;
}

/* ✗ WRONG — will bleed into every other page */
body { background: #0a0a0a; }
:root { --accent: #ff6b2b; }
* { box-sizing: border-box; }
```

### Mobile Responsiveness

Every page MUST include responsive styles at the bottom of the CSS file:

```css
@media (max-width: 768px) {
  .xx-page .feature-grid { grid-template-columns: 1fr; }
  .xx-page .form-row { flex-direction: column; }
  .xx-page .stats-row { flex-direction: column; }
  .xx-page .hero h1 { font-size: clamp(2.2rem, 8vw, 3.5rem); }
  .xx-page .cta-section { padding: 48px 20px; }
}
```

### Deployment Guide Comment

Include this comment block near the form handler in every landing page:

```tsx
// =============================================
// DEPLOYMENT: VPS Setup Guide
// =============================================
//
// RECOMMENDED STACK (simple, secure, cheap):
//   - Build: npm run build → serve the dist/ folder as static files
//   - Reverse proxy: Caddy (auto-HTTPS via Let's Encrypt, zero config)
//   - API: tiny Express/Fastify server for /api/waitlist endpoint
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
//   - Validate email server-side
//   - Rate limit: max 5 requests per IP per minute
//   - Insert into DB: INSERT INTO waitlist (email, created_at, ip) VALUES (?, NOW(), ?)
//   - Return 200 on success, 429 on rate limit, 400 on bad email
//
// STEP 3: Basic security
//   - ufw: allow 80, 443, 22 — deny everything else
//   - Don't run the app as root
//   - Set up fail2ban for SSH
//
// ALTERNATIVE: Use Supabase (free tier, 10 min setup):
//   - npm install @supabase/supabase-js
//   - Create 'waitlist' table: email (text), created_at (timestamptz)
//   - const { data, error } = await supabase.from('waitlist').insert({ email })
// =============================================
```

### Hub Updates

After creating the landing page files, update `ideas/hub/src/routes/index.tsx` to include a card linking to the new page. Follow the existing card pattern in that file.

### anime.js Package

Before creating the landing page, ensure `animejs` is installed:

```bash
cd ideas/hub && npm list animejs 2>/dev/null || npm install animejs
```

If the hub doesn't exist yet, set it up first:
```bash
cd ideas
npx create-tsrouter-app@latest hub --framework=react --add-ons tailwind
cd hub && npm install animejs
```

---

## Security Checklist

- [ ] Email validation client-side AND mention server-side in deployment comments
- [ ] No API keys or secrets in client code
- [ ] Rate limiting mentioned in deployment guide
- [ ] No third-party tracking scripts unless user explicitly asked
- [ ] Sanitized input in deployment comments (parameterized queries)
- [ ] HTTPS enforcement via Caddy in deployment guide

---

## Quality Checklist

Before delivering, verify:

- [ ] **Headline is ≤10 words** and communicates the core value prop
- [ ] **Copy uses research language** — pain points from actual user complaints, not generic marketing speak
- [ ] **No buzzwords** — none of the banned words appear
- [ ] **anime.js loads and runs** — page has a cinematic entrance + scroll reveals + one signature animation
- [ ] **Reduced motion respected** — `prefers-reduced-motion` check wraps all animations
- [ ] **Form works** — email validation, loading state, success state with animation
- [ ] **CSS is fully scoped** — no bare `body {}` or `:root {}` or `* {}`
- [ ] **Mobile responsive** — tested at 375px width mentally
- [ ] **Two CTAs** — one above the fold, one at the bottom
- [ ] **FAQ has 4-6 questions** — each addresses a real objection
- [ ] **Fonts are distinctive** — no Inter, Roboto, or AI-default fonts
- [ ] **Colors use CSS variables** — all defined on the wrapper class
- [ ] **Stats/numbers are specific** — not vague ("thousands of users"), but specific ("2,847 teams")
- [ ] **Hub index updated** — new card links to the new page
- [ ] **User told how to run** — `cd ideas/hub && npm run dev`

---

## Delivery

After building the page, tell the user:

1. What files were created (route + CSS)
2. The aesthetic direction chosen and why
3. Key copy decisions (what research informed the headlines)
4. How to run it: `cd ideas/hub && npm run dev` → `http://localhost:3000/[route]`
5. What to customize (swap placeholder stats, add real testimonials, connect real API)

---

## Example Prompt → Output Mapping

**User says:** "Create a landing page for an AI code review tool"

**You do:**
1. Quick research: search for "code review frustrating reddit", "code review tool alternatives", "AI code review pricing"
2. Invoke `frontend-design` skill
3. Pick aesthetic: Dark Terminal (fits dev tools audience)
4. Write headline from research: "Catch the bugs your team misses. Before they ship." (based on finding that devs complain reviews miss logic errors)
5. Build page with anime.js: timeline entrance for hero, staggered card reveals on scroll, counter animation for stats, confetti on signup
6. Deliver files + run instructions
