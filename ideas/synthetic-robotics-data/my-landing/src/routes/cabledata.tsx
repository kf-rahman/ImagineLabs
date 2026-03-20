import { createFileRoute, Link } from '@tanstack/react-router'
import { useState, useEffect, useRef } from 'react'
import '../styles/cabledata.css'

export const Route = createFileRoute('/cabledata')({
  component: CableDataPage,
})

const problems = [
  {
    num: '01',
    title: 'Infinite degrees of freedom',
    text: "Unlike rigid objects, cables deform continuously. Each point has independent position, orientation, curvature, and twist. Standard physics engines approximate this crudely — or don't attempt it at all.",
  },
  {
    num: '02',
    title: 'No standard dataset exists',
    text: 'CIFAR-10 for vision. ImageNet for recognition. For cable manipulation? Nothing. Every lab builds from scratch, burning months of grad student time on 200 teleoperated episodes.',
  },
  {
    num: '03',
    title: 'Sim-to-real gap is catastrophic',
    text: "Cable friction, stiffness, and elasticity are notoriously hard to simulate. Policies trained in MuJoCo fail the moment they touch a real cable. The DLO sim-to-real gap is an order of magnitude worse than rigid objects.",
  },
  {
    num: '04',
    title: "Real-world collection doesn't scale",
    text: 'A cable routing task takes 30–90 seconds per episode with teleoperation. At that rate, a million trajectories would take 2.85 years of non-stop human operation.',
  },
]

const features = [
  {
    tag: 'physics',
    title: 'Contact-rich cable physics',
    text: 'FEM simulation for deformable linear objects. Friction, stiffness, and elasticity calibrated against real material measurements.',
  },
  {
    tag: 'tasks',
    title: 'Pre-built task library',
    text: 'Cable routing, insertion, sorting, harness assembly, plug connection. Ready-to-use manipulation scenarios out of the box.',
  },
  {
    tag: 'transfer',
    title: 'Sim-to-real validated',
    text: 'Every dataset ships with transfer benchmarks. Know if your data works before you burn a single hour of robot time.',
  },
  {
    tag: 'randomize',
    title: 'Domain randomization',
    text: 'Cable diameter, stiffness, friction, color, lighting, background — randomized to cover the long tail of real-world variation.',
  },
  {
    tag: 'scale',
    title: 'Scale on demand',
    text: 'GPU-parallel simulation. Generate a million trajectories overnight. Not 200 episodes over a semester.',
  },
  {
    tag: 'formats',
    title: 'Standard formats',
    text: 'HDF5, LeRobot, RLDS. Drop-in replacement for your existing data loading pipeline.',
  },
]

const steps = [
  {
    n: '01',
    title: 'Describe your cable task',
    body: 'Tell us the cable type (flexible, braided, sheathed), the manipulation task (routing, insertion, sorting), and your robot platform.',
    detail: 'Supported: routing, insertion, sorting, harness assembly, plug connection',
  },
  {
    n: '02',
    title: 'We configure the physics',
    body: 'Our team sets up calibrated FEM parameters for your specific cable-robot combination. Contact stiffness, friction coefficients, domain randomization ranges — all validated.',
    detail: 'Turnaround: 48h initial setup, instant regeneration after',
  },
  {
    n: '03',
    title: 'Generate at scale',
    body: 'Run millions of trajectories in parallel GPU simulation. Every trajectory is labeled and transfer-validated with our S2R-Score.',
    detail: 'Output: HDF5, LeRobot, RLDS, or custom format',
  },
]

const faqs = [
  {
    q: 'What cable types do you support?',
    a: 'Flexible single-core, braided, sheathed, flat ribbon cables, and USB/ethernet-style connectors. Custom cable profiles on request — send us a sample or a datasheet and we\'ll calibrate the physics.',
  },
  {
    q: 'How is this different from using Isaac Sim?',
    a: "Isaac Sim's soft-body physics are general-purpose and require extensive tuning for cables. We've pre-solved the hard parts: DLO-specific contact parameters, validated domain randomization ranges, and transfer benchmarks. You get training-ready data, not a toolkit to build your own pipeline.",
  },
  {
    q: 'Does the data actually transfer to real robots?',
    a: 'Yes. Every dataset includes our S2R-Score — a correlation metric between synthetic training and real-world task success. Average transfer score across cable routing tasks: 0.79. We publish methodology and benchmarks openly.',
  },
  {
    q: 'What robot platforms are supported?',
    a: 'Currently optimized for Franka Panda, UR5/UR10 with Robotiq grippers, and custom parallel-jaw grippers. Dual-arm setups in beta. Contact us for custom platform support.',
  },
  {
    q: 'What does early access include?',
    a: "500K free cable manipulation trajectories, custom physics tuning for your cable type, and direct access to our sim-to-real engineering team. No credit card required.",
  },
]

function WaitlistForm({
  submitted, loading, email, setEmail, error, waitlistCount, onSubmit,
}: {
  submitted: boolean; loading: boolean; email: string; setEmail: (v: string) => void
  error: string; waitlistCount: number; onSubmit: (e: React.FormEvent) => void
}) {
  const formRef = useRef<HTMLDivElement>(null)

  if (submitted) {
    return (
      <div className="cd-success-state" ref={formRef}>
        <div className="cd-success-ring">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="3,9 7,13 15,5" stroke="currentColor" />
          </svg>
        </div>
        <div className="cd-success-text">
          <strong>You&apos;re on the list.</strong>
          <span>We&apos;ll reach out when early access opens. #{waitlistCount} in queue.</span>
        </div>
      </div>
    )
  }
  return (
    <form onSubmit={onSubmit}>
      <div className="cd-form-row">
        <input
          type="email"
          className="cd-email-input"
          placeholder="you@roboticslab.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
          disabled={loading}
          aria-label="Work email"
        />
        <button type="submit" className="cd-submit-btn" disabled={loading}>
          {loading ? '...' : 'Request Early Access'}
        </button>
      </div>
      {error && <p className="cd-form-error">{error}</p>}
      <p className="cd-form-note">{waitlistCount} labs on waitlist · No spam, ever</p>
    </form>
  )
}

function CableDataPage() {
  const pageRef = useRef<HTMLDivElement>(null)
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [waitlistCount, setWaitlistCount] = useState(184)

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
      pageRef.current?.querySelectorAll('[data-anim]').forEach(el => {
        ;(el as HTMLElement).style.opacity = '1'
      })
      const cableLine = pageRef.current?.querySelector('.cd-cable-line') as SVGPathElement
      if (cableLine) cableLine.style.strokeDashoffset = '0'
      pageRef.current?.querySelectorAll('.cd-node').forEach(el => {
        ;(el as HTMLElement).style.opacity = '1'
      })
      return
    }

    let observer: IntersectionObserver | null = null
    let counterObserver: IntersectionObserver | null = null

    import('animejs').then((mod: any) => {
      const { animate, createTimeline, utils } = mod
      const { stagger, random } = utils

      // ── HERO ENTRANCE TIMELINE (cinematic) ──
      const tl = createTimeline({
        defaults: { duration: 900, ease: 'outExpo' },
      })

      tl.add('.cd-hero-eyebrow', {
        translateY: [30, 0],
        opacity: [0, 1],
        duration: 600,
      }, 100)
      .add('.cd-hero-headline', {
        translateY: [70, 0],
        opacity: [0, 1],
        duration: 1200,
        ease: 'outCubic',
      }, 250)
      .add('.cd-hero-sub', {
        translateY: [40, 0],
        opacity: [0, 1],
        duration: 900,
      }, 550)
      .add('.cd-hero-form', {
        translateY: [30, 0],
        opacity: [0, 1],
        duration: 800,
      }, 750)
      .add('.cd-stat', {
        translateY: [25, 0],
        opacity: [0, 1],
        delay: stagger(140),
        duration: 700,
      }, 950)

      // ── SVG CABLE DRAW ──
      const cableLine = pageRef.current?.querySelector('.cd-cable-line') as SVGPathElement
      if (cableLine) {
        const len = cableLine.getTotalLength()
        cableLine.style.strokeDasharray = String(len)
        cableLine.style.strokeDashoffset = String(len)

        animate(cableLine, {
          strokeDashoffset: [len, 0],
          duration: 2200,
          ease: 'inOutCubic',
          delay: 400,
        })
      }

      // Cable droop
      const cableDroop = pageRef.current?.querySelector('.cd-cable-droop') as SVGPathElement
      if (cableDroop) {
        const len2 = cableDroop.getTotalLength()
        cableDroop.style.strokeDasharray = String(len2)
        cableDroop.style.strokeDashoffset = String(len2)

        animate(cableDroop, {
          strokeDashoffset: [len2, 0],
          duration: 1400,
          ease: 'inOutCubic',
          delay: 1800,
        })
      }

      // Data nodes along cable — pop in then pulse
      animate('.cd-node', {
        scale: [0, 1],
        opacity: [0, 0.9],
        delay: stagger(100, { start: 1200 }),
        duration: 500,
        ease: 'out(3)',
        onComplete: () => {
          // Gentle pulsing after nodes appear
          animate('.cd-node', {
            scale: [1, 1.25, 1],
            opacity: [0.9, 1, 0.9],
            delay: stagger(200),
            duration: 2400,
            loop: true,
            ease: 'inOutSine',
          })
        },
      })

      // ── FLOATING PARTICLES (very subtle) ──
      animate('.cd-particle', {
        translateX: () => random(-12, 12),
        translateY: () => random(-12, 12),
        opacity: () => [random(3, 8) / 100, random(10, 18) / 100],
        duration: () => random(4000, 7000),
        delay: () => random(0, 3000),
        alternate: true,
        loop: true,
        ease: 'inOutSine',
      })

      // ── SCROLL-TRIGGERED REVEALS ──
      observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement
            const anim = el.getAttribute('data-anim')

            if (anim === 'fade-up') {
              animate(el, {
                translateY: [35, 0],
                opacity: [0, 1],
                duration: 800,
                ease: 'outExpo',
              })
            } else if (anim === 'stagger-children') {
              // HTMLCollection → Array for anime.js v4
              const kids = Array.from(el.children) as HTMLElement[]
              kids.forEach(k => { k.style.opacity = '0' })
              el.style.opacity = '1'
              animate(kids, {
                translateY: [30, 0],
                opacity: [0, 1],
                delay: stagger(90),
                duration: 700,
                ease: 'outExpo',
              })
            } else if (anim === 'scale-in') {
              animate(el, {
                scale: [0.95, 1],
                opacity: [0, 1],
                duration: 700,
                ease: 'outCubic',
              })
            }

            observer!.unobserve(el)
          }
        })
      }, { threshold: 0.05, rootMargin: '0px 0px -30px 0px' })

      pageRef.current?.querySelectorAll('[data-anim]').forEach(el => {
        ;(el as HTMLElement).style.opacity = '0'
        observer!.observe(el)
      })

      // ── COUNTER ANIMATION ──
      counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement
            const target = parseFloat(el.getAttribute('data-count') || '0')
            const suffix = el.getAttribute('data-suffix') || ''
            const prefix = el.getAttribute('data-prefix') || ''
            const isDecimal = !!el.getAttribute('data-decimal')
            const obj = { val: 0 }

            animate(obj, {
              val: target,
              duration: 2200,
              ease: 'outExpo',
              onUpdate: () => {
                const display = isDecimal
                  ? obj.val.toFixed(2)
                  : Math.round(obj.val).toLocaleString()
                el.textContent = prefix + display + suffix
              },
            })
            counterObserver!.unobserve(el)
          }
        })
      }, { threshold: 0.3 })

      pageRef.current?.querySelectorAll('[data-count]').forEach(el => {
        counterObserver!.observe(el)
      })
      // ── HERO VISUAL TILT on hover ──
      const heroVisual = pageRef.current?.querySelector('.cd-hero-visual') as HTMLElement
      if (heroVisual) {
        const svg = heroVisual.querySelector('.cd-hero-svg') as SVGElement
        heroVisual.addEventListener('mousemove', (e: MouseEvent) => {
          const rect = heroVisual.getBoundingClientRect()
          const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
          const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2
          if (svg) {
            animate(svg, {
              rotateY: x * 6,
              rotateX: y * -4,
              duration: 400,
              ease: 'outExpo',
            })
          }
        })
        heroVisual.addEventListener('mouseleave', () => {
          if (svg) {
            animate(svg, { rotateY: 0, rotateX: 0, duration: 800, ease: 'outExpo' })
          }
        })
      }

      // ── MAGNETIC HOVER on CTA buttons ──
      pageRef.current?.querySelectorAll('.cd-submit-btn, .cd-nav-cta').forEach(btn => {
        const el = btn as HTMLElement
        el.addEventListener('mousemove', (e: MouseEvent) => {
          const rect = el.getBoundingClientRect()
          const x = (e.clientX - rect.left - rect.width / 2) * 0.1
          const y = (e.clientY - rect.top - rect.height / 2) * 0.1
          animate(el, { translateX: x, translateY: y, duration: 300, ease: 'outExpo' })
        })
        el.addEventListener('mouseleave', () => {
          animate(el, { translateX: 0, translateY: 0, duration: 500, ease: 'outExpo' })
        })
      })

    }).catch(() => {
      // If anime.js fails, show everything
      pageRef.current?.querySelectorAll('[data-anim]').forEach(el => {
        ;(el as HTMLElement).style.opacity = '1'
      })
    })

    // Safety: if anything is still invisible after 3s, reveal it
    const safetyTimer = setTimeout(() => {
      pageRef.current?.querySelectorAll('[data-anim]').forEach(el => {
        const htmlEl = el as HTMLElement
        if (htmlEl.style.opacity === '0') {
          htmlEl.style.opacity = '1'
          htmlEl.style.transition = 'opacity 0.5s ease'
        }
      })
    }, 3000)

    return () => {
      observer?.disconnect()
      counterObserver?.disconnect()
      clearTimeout(safetyTimer)
    }
  }, [])

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
  //   - INSERT INTO waitlist (email, created_at, ip) VALUES (?, NOW(), ?)
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email.')
      return
    }
    setError('')
    setLoading(true)
    await new Promise(r => setTimeout(r, 900))
    setSubmitted(true)
    setLoading(false)
    setWaitlistCount(n => n + 1)
  }

  const formProps = { submitted, loading, email, setEmail, error, waitlistCount, onSubmit: handleSubmit }

  return (
    <div ref={pageRef} className="cd-page">
      {/* Particles (subtle ambient dots) */}
      {Array.from({ length: 8 }, (_, i) => (
        <div
          key={i}
          className="cd-particle"
          style={{
            left: `${12 + ((i * 41 + 17) % 76)}%`,
            top: `${8 + ((i * 29 + 11) % 44)}%`,
            width: `${2 + (i % 2)}px`,
            height: `${2 + (i % 2)}px`,
          }}
        />
      ))}

      {/* Nav */}
      <nav className="cd-nav">
        <div className="cd-container">
          <div className="cd-nav-inner">
            <div className="cd-nav-left">
              <Link to="/" className="cd-nav-hub">Hub</Link>
              <span className="cd-nav-logo">cabledata</span>
            </div>
            <button
              className="cd-nav-cta"
              onClick={() => document.getElementById('cd-bottom-cta')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Join Waitlist
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="cd-hero">
        <div className="cd-container">
          <div className="cd-hero-layout">
            <div className="cd-hero-text">
              <div className="cd-hero-eyebrow">Deformable Linear Object Data</div>
              <h1 className="cd-hero-headline">
                The missing dataset<br />for cable manipulation.
              </h1>
              <p className="cd-hero-sub">
                Robots fold laundry and flip burgers. But routing a cable through a harness?
                Still unsolved. We&apos;re building the sim-to-real training data that makes cable
                manipulation work.
              </p>
              <div className="cd-hero-form">
                <WaitlistForm {...formProps} />
              </div>
            </div>
            <div className="cd-hero-visual">
              <svg className="cd-hero-svg" viewBox="0 0 420 380" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <filter id="cd-glow">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                </defs>
                {/* Gripper body */}
                <rect className="cd-gripper-part" x="270" y="134" width="140" height="22" rx="4" fill="var(--charcoal)" opacity="0.08" />
                <rect className="cd-gripper-part" x="270" y="137" width="140" height="16" rx="3" fill="var(--charcoal)" opacity="0.05" />
                {/* Upper finger */}
                <path className="cd-gripper-part" d="M230,110 L270,114 L270,134 L245,134 L230,128 Z" fill="var(--charcoal)" opacity="0.1" />
                <path className="cd-gripper-part" d="M232,112 L268,116 L268,132 L246,132 L232,126 Z" fill="var(--charcoal)" opacity="0.06" stroke="var(--charcoal)" strokeWidth="0.5" strokeOpacity="0.15" />
                {/* Lower finger */}
                <path className="cd-gripper-part" d="M230,180 L270,176 L270,156 L245,156 L230,162 Z" fill="var(--charcoal)" opacity="0.1" />
                <path className="cd-gripper-part" d="M232,178 L268,174 L268,158 L246,158 L232,164 Z" fill="var(--charcoal)" opacity="0.06" stroke="var(--charcoal)" strokeWidth="0.5" strokeOpacity="0.15" />
                {/* Pinch point indicator */}
                <circle cx="235" cy="145" r="3" fill="var(--copper)" opacity="0.2" />
                {/* Cable path — enters from left, through gripper */}
                <path
                  className="cd-cable-line"
                  d="M-10,145 C50,145 100,98 160,145 S220,145 248,145"
                  stroke="var(--copper)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
                {/* Cable droop — exits gripper, droops down naturally */}
                <path
                  className="cd-cable-droop"
                  d="M248,145 C248,168 240,215 225,260 S200,325 185,370"
                  stroke="var(--copper)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
                {/* Cable shadow for depth */}
                <path
                  d="M-10,148 C50,148 100,101 160,148 S220,148 248,148"
                  stroke="var(--charcoal)"
                  strokeWidth="5"
                  strokeLinecap="round"
                  opacity="0.04"
                />
                {/* Data nodes along the cable with glow */}
                <circle className="cd-node" cx="30" cy="145" r="4.5" fill="var(--copper)" filter="url(#cd-glow)" />
                <circle className="cd-node" cx="85" cy="114" r="3.5" fill="var(--copper)" filter="url(#cd-glow)" />
                <circle className="cd-node" cx="135" cy="139" r="4.5" fill="var(--copper)" filter="url(#cd-glow)" />
                <circle className="cd-node" cx="195" cy="145" r="3.5" fill="var(--copper)" filter="url(#cd-glow)" />
                <circle className="cd-node" cx="240" cy="172" r="4" fill="var(--copper)" filter="url(#cd-glow)" />
                <circle className="cd-node" cx="235" cy="228" r="3.5" fill="var(--copper)" filter="url(#cd-glow)" />
                <circle className="cd-node" cx="218" cy="285" r="3" fill="var(--copper)" filter="url(#cd-glow)" />
              </svg>
            </div>
          </div>
          <div className="cd-hero-stats">
            <div className="cd-stat">
              <span className="cd-stat-num" data-prefix="$" data-count="103" data-suffix="B">$0B</span>
              <span className="cd-stat-label">Wire harness market</span>
            </div>
            <div className="cd-stat">
              <span className="cd-stat-num" data-count="1200000" data-suffix="+">0+</span>
              <span className="cd-stat-label">Synthetic trajectories</span>
            </div>
            <div className="cd-stat">
              <span className="cd-stat-num" data-count="0.79" data-decimal="true" data-suffix="">0.00</span>
              <span className="cd-stat-label">Avg. sim-to-real score</span>
            </div>
          </div>
        </div>
      </section>

      <div className="cd-container"><hr className="cd-divider" /></div>

      {/* Problem */}
      <section className="cd-section">
        <div className="cd-container">
          <span className="cd-section-label" data-anim="fade-up">The Problem</span>
          <h2 className="cd-section-title" data-anim="fade-up">
            Cable physics break<br />every simulator.
          </h2>
          <p className="cd-section-body" data-anim="fade-up">
            Deformable linear objects are the hardest manipulation problem in robotics.
            Your rigid-body simulator wasn&apos;t built for this.
          </p>
          <div className="cd-problem-grid" data-anim="stagger-children">
            {problems.map(p => (
              <div key={p.num} className="cd-problem-card">
                <span className="cd-problem-num">{p.num}</span>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </div>
            ))}
          </div>
          <blockquote className="cd-quote" data-anim="fade-up">
            <p>&ldquo;Data scarcity is one of the main things currently holding progress in robotics back. We need orders of magnitude more training data than current methods can provide.&rdquo;</p>
            <cite>Research lead, DLO manipulation lab</cite>
          </blockquote>
        </div>
      </section>

      <div className="cd-container"><hr className="cd-divider" /></div>

      {/* Solution */}
      <section className="cd-section">
        <div className="cd-container">
          <span className="cd-section-label" data-anim="fade-up">The Solution</span>
          <h2 className="cd-section-title" data-anim="fade-up">
            Synthetic cable data<br />that actually transfers.
          </h2>
          <p className="cd-section-body" data-anim="fade-up">
            CableData is purpose-built for deformable linear objects. We generate physically accurate,
            labeled training data with verified sim-to-real transfer scores.
          </p>
          <div className="cd-feature-grid" data-anim="stagger-children">
            {features.map(f => (
              <div key={f.tag} className="cd-feature-card">
                <span className="cd-feature-tag">{f.tag}</span>
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="cd-container"><hr className="cd-divider" /></div>

      {/* How It Works */}
      <section className="cd-section">
        <div className="cd-container">
          <span className="cd-section-label" data-anim="fade-up">How It Works</span>
          <h2 className="cd-section-title" data-anim="fade-up">
            From cable spec to<br />training data in 48 hours.
          </h2>
          <div className="cd-steps" data-anim="stagger-children">
            {steps.map(s => (
              <div key={s.n} className="cd-step">
                <span className="cd-step-num">{s.n}</span>
                <div>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                  <span className="cd-step-detail">{s.detail}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="cd-container"><hr className="cd-divider" /></div>

      {/* FAQ */}
      <section className="cd-section">
        <div className="cd-container">
          <span className="cd-section-label" data-anim="fade-up">FAQ</span>
          <h2 className="cd-section-title" data-anim="fade-up">Common questions.</h2>
          <div className="cd-faq-list" data-anim="stagger-children">
            {faqs.map((faq, i) => (
              <div key={i} className="cd-faq-item">
                <div className="cd-faq-q">{faq.q}</div>
                <p className="cd-faq-a">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <div className="cd-container">
        <div className="cd-cta-bottom" id="cd-bottom-cta" data-anim="scale-in">
          <h2>Your robot can&apos;t learn<br />what it can&apos;t practice.</h2>
          <p>Join the waitlist. Early access includes 500K free cable trajectories and dedicated onboarding with our physics team.</p>
          <div className="cd-cta-form-wrap">
            <WaitlistForm {...formProps} />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="cd-container">
        <footer className="cd-footer">
          <span className="cd-footer-logo">cabledata</span>
          <span className="cd-footer-copy">Training data for the cables your robots can&apos;t yet touch · 2026</span>
        </footer>
      </div>
    </div>
  )
}
