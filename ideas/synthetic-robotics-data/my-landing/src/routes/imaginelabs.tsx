import { createFileRoute, Link } from '@tanstack/react-router'
import { useState, useEffect, useRef, useCallback } from 'react'
import '../styles/imaginelabs.css'

export const Route = createFileRoute('/imaginelabs')({
  component: ImagineLabsPage,
})

/* ── Data ── */

const pipelineSteps = [
  { id: 0, label: 'Upload', detail: 'Ingesting 2 teleoperation demos...' },
  { id: 1, label: '3DGS Reconstruct', detail: 'Geometry + joint trajectory extraction' },
  { id: 2, label: 'World Model', detail: 'Generating novel scenarios...' },
  { id: 3, label: 'Augment & Deliver', detail: 'Domain rand + trajectory aug · 10,847 trajectories' },
]
const stepDurations = [1800, 2200, 2400, 2000]

const problems = [
  { num: '01', tag: 'VOLUME', title: 'Real-world demos are expensive to collect at scale', text: "Recording enough teleoperation demos to train on is slow, ties up hardware, and still won't cover the variation your policy needs to generalize." },
  { num: '02', tag: 'COVERAGE', title: 'Edge cases stay invisible until deployment', text: "The edge cases that break your robot in production are exactly the ones you can't safely collect in the real world." },
  { num: '03', tag: 'TRANSFER', title: 'Building a simulator is a project in itself', text: "Getting a simulator that matches your hardware takes weeks of engineering — and the sim-to-real gap often kills performance anyway." },
]

const objections = [
  'Our world model learns physics from your footage — every scenario stays grounded in what your robot actually does.',
  '3D Gaussian Splatting anchors generation to your real scene, not a generic environment.',
  'The output is diverse variations of real motions — close to your demonstration distribution, not invented movements.',
  'No simulator setup. No URDF files. Upload footage, receive trajectories.',
]

const jsonLines = [
  '{',
  '  "episode_id": "ep_0847_pick_offset",',
  '  "task": "pick_and_place",',
  '  "format": "lerobot_v3",',
  '  "robot": {',
  '    "model": "ur5e_custom",',
  '    "dof": 6,',
  '    "calibrated_from": ["demo_01.mp4", "demo_02.mp4"]',
  '  },',
  '  "domain_randomizations": 847,',
  '  "physics_valid": true,',
  '  "vla_compatible": true',
  '}',
]

/* ── Pipeline Widget ── */

function PipelineWidget({ activeStep, complete }: { activeStep: number; complete: boolean }) {
  return (
    <div className="il-pipeline">
      <div className="il-pipeline-header">
        <span className="il-pipeline-title">Pipeline · run_039</span>
        <span className="il-pipeline-live">
          <span className="il-pulse-dot" />LIVE
        </span>
      </div>
      <div className="il-pipeline-file">
        <span>▶</span> demo_01.mp4 · 3 min + demo_02.mp4 · 4 min
      </div>
      <div className="il-pipeline-steps">
        {pipelineSteps.map((s, i) => {
          const isDone = i < activeStep || complete
          const isActive = i === activeStep && !complete
          return (
            <div key={s.id} className={`il-pipe-step ${isDone ? 'done' : ''} ${isActive ? 'active' : ''}`}>
              <div className="il-pipe-icon">
                {isDone ? '✓' : isActive ? <span className="il-spinner">◌</span> : `0${i + 1}`}
              </div>
              <div className="il-pipe-info">
                <div className="il-pipe-name">{s.label}</div>
                <div className="il-pipe-detail">{s.detail}</div>
              </div>
            </div>
          )
        })}
      </div>
      <div className={`il-pipeline-output ${complete ? 'visible' : ''}`}>
        <div className="il-output-label">OUTPUT</div>
        ✓ 10,847 trajectories · LeRobot format · 7h 23m
      </div>
    </div>
  )
}

/* ── Waitlist Form ── */

function WaitlistForm({ submitted, loading, email, setEmail, error, waitlistCount, onSubmit }: {
  submitted: boolean; loading: boolean; email: string; setEmail: (v: string) => void
  error: string; waitlistCount: number; onSubmit: (e: React.FormEvent) => void
}) {
  if (submitted) {
    return (
      <div className="il-success">
        <span className="il-success-icon">✓</span>
        <div>
          <strong>You&apos;re in.</strong>
          <span> Expect a message within 48 hours.</span>
        </div>
      </div>
    )
  }
  return (
    <div>
      <form onSubmit={onSubmit} className="il-form">
        <input
          type="email"
          className="il-email"
          placeholder="you@roboticsco.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
          disabled={loading}
          aria-label="Work email"
        />
        <button type="submit" className="il-submit" disabled={loading}>
          {loading ? '...' : <>Apply for Free Pilot &rarr;</>}
        </button>
      </form>
      {error && <p className="il-form-error">{error}</p>}
      <p className="il-waitlist-count"><span>{waitlistCount}</span> engineers on the waitlist</p>
    </div>
  )
}

/* ── Helpers ── */

function splitTextToChars(el: HTMLElement) {
  const text = el.textContent || ''
  el.textContent = ''
  el.style.display = 'flex'
  el.style.flexWrap = 'wrap'
  return text.split('').map(char => {
    const span = document.createElement('span')
    span.textContent = char === ' ' ? '\u00a0' : char
    span.className = 'il-char'
    span.style.display = 'inline-block'
    span.style.opacity = '0'
    el.appendChild(span)
    return span
  })
}

/* ── Main Page ── */

function ImagineLabsPage() {
  const pageRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [waitlistCount, setWaitlistCount] = useState(142)

  // Pipeline animation state
  const [pipeStep, setPipeStep] = useState(-1)
  const [pipeComplete, setPipeComplete] = useState(false)

  // Waitlist counter
  useEffect(() => {
    const t = setInterval(() => {
      if (Math.random() > 0.97) setWaitlistCount(n => n + 1)
    }, 4000)
    return () => clearInterval(t)
  }, [])

  // Pipeline loop
  useEffect(() => {
    let cancelled = false
    const timers: ReturnType<typeof setTimeout>[] = []

    function run() {
      if (cancelled) return
      setPipeStep(-1)
      setPipeComplete(false)

      let delay = 600
      for (let i = 0; i < 4; i++) {
        const step = i
        timers.push(setTimeout(() => {
          if (!cancelled) setPipeStep(step)
        }, delay))
        delay += stepDurations[i]
      }

      timers.push(setTimeout(() => {
        if (!cancelled) {
          setPipeComplete(true)
          setPipeStep(4)
        }
      }, delay))

      timers.push(setTimeout(() => {
        if (!cancelled) run()
      }, delay + 4000))
    }

    timers.push(setTimeout(run, 1200))
    return () => {
      cancelled = true
      timers.forEach(clearTimeout)
    }
  }, [])

  // ─── ANIME.JS — THE REAL SHOW ───
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      pageRef.current?.querySelectorAll('.il-line').forEach(el => {
        ;(el as HTMLElement).style.transform = 'none'
        ;(el as HTMLElement).style.opacity = '1'
      })
      pageRef.current?.querySelectorAll('[data-anim]').forEach(el => {
        ;(el as HTMLElement).style.opacity = '1'
      })
      return
    }

    let scrollCleanup: (() => void) | null = null
    let rafId = 0
    const cleanups: (() => void)[] = []

    import('animejs').then((mod: any) => {
      const { animate, createTimeline, utils } = mod
      const { stagger, random } = utils

      // ══════════════════════════════════════════════
      // 1. CHARACTER CASCADE HEADLINE
      // Each line's text splits into individual characters
      // that cascade in with 3D rotation + vertical motion
      // ══════════════════════════════════════════════
      const lines = pageRef.current?.querySelectorAll('.il-line') as NodeListOf<HTMLElement>
      const allChars: HTMLElement[] = []

      lines?.forEach(line => {
        line.style.transform = 'none' // override the CSS translateY(110%)
        line.style.overflow = 'visible'
        const chars = splitTextToChars(line)
        allChars.push(...chars)
      })

      // Also make the masks visible
      pageRef.current?.querySelectorAll('.il-line-mask').forEach(el => {
        ;(el as HTMLElement).style.overflow = 'visible'
      })

      const heroTl = createTimeline({ defaults: { ease: 'outExpo' } })

      // Eyebrow slides down + fades
      heroTl.add('.il-eyebrow', {
        translateY: [-20, 0],
        opacity: [0, 1],
        duration: 600,
      }, 200)

      // Characters cascade in: 3D rotation + vertical slide + opacity
      // Line 1
      const line1Start = 400
      const line1Chars = pageRef.current?.querySelector('.il-line:nth-child(1)')?.querySelectorAll('.il-char')
      if (line1Chars) {
        heroTl.add(Array.from(line1Chars), {
          translateY: [80, 0],
          rotateX: [-90, 0],
          opacity: [0, 1],
          delay: stagger(25),
          duration: 900,
        }, line1Start)
      }

      // Line 2 (green)
      const line2Start = line1Start + 300
      const line2Chars = pageRef.current?.querySelector('.il-line-green')?.querySelectorAll('.il-char')
      if (line2Chars) {
        heroTl.add(Array.from(line2Chars), {
          translateY: [80, 0],
          rotateX: [-90, 0],
          opacity: [0, 1],
          delay: stagger(20),
          duration: 900,
        }, line2Start)
      }

      // Line 3 (muted)
      const line3Start = line2Start + 400
      const line3Chars = pageRef.current?.querySelector('.il-line-muted')?.querySelectorAll('.il-char')
      if (line3Chars) {
        heroTl.add(Array.from(line3Chars), {
          translateY: [80, 0],
          rotateX: [-90, 0],
          opacity: [0, 1],
          delay: stagger(30),
          duration: 900,
        }, line3Start)
      }

      // Sub text
      heroTl.add('.il-hero-sub', {
        translateY: [30, 0],
        opacity: [0, 1],
        duration: 800,
      }, line3Start + 200)

      // Form
      heroTl.add('.il-hero-form-wrap', {
        translateY: [25, 0],
        opacity: [0, 1],
        duration: 700,
      }, line3Start + 400)

      // Pipeline widget — slides in from right with elastic overshoot
      heroTl.add('.il-pipeline', {
        translateX: [120, 0],
        rotateY: [-12, 0],
        opacity: [0, 1],
        duration: 1400,
        ease: 'outElastic(1, 0.6)',
      }, 700)

      // ══════════════════════════════════════════════
      // 2. DATA STREAM PARTICLES
      // Continuous flow of tiny glowing dots across the hero
      // representing data flowing from demos → training data
      // ══════════════════════════════════════════════
      const streamContainer = pageRef.current?.querySelector('.il-data-stream') as HTMLElement
      if (streamContainer) {
        const particleCount = 24
        for (let i = 0; i < particleCount; i++) {
          const dot = document.createElement('div')
          dot.className = 'il-stream-dot'
          const size = random(3, 7)
          dot.style.width = `${size}px`
          dot.style.height = `${size}px`
          streamContainer.appendChild(dot)

          // Each particle travels from left to right with sine wave vertical movement
          const baseY = random(10, 90)
          const amplitude = random(15, 50)
          const duration = random(4000, 8000)
          const startDelay = random(0, 6000)

          const animateParticle = () => {
            dot.style.opacity = '0'
            const obj = { progress: 0 }

            animate(obj, {
              progress: [0, 1],
              duration: duration,
              ease: 'linear',
              onUpdate: () => {
                const p = obj.progress
                const x = -20 + p * 120  // -20px to ~100% of container width
                const wave = Math.sin(p * Math.PI * 2.5) * amplitude
                dot.style.left = `${x}%`
                dot.style.top = `${baseY + wave}%`
                // Fade in at start, fade out at end
                const opacity = p < 0.1 ? p * 8 : p > 0.85 ? (1 - p) * 6.6 : 0.8
                dot.style.opacity = String(Math.max(0, Math.min(0.8, opacity)))
              },
              onComplete: () => {
                dot.style.opacity = '0'
                setTimeout(animateParticle, random(500, 3000))
              },
            })
          }

          setTimeout(animateParticle, startDelay)
        }
      }

      // ══════════════════════════════════════════════
      // 3. MOUSE PARALLAX (multi-layer depth)
      // ══════════════════════════════════════════════
      const heroEl = heroRef.current
      if (heroEl) {
        let mx = 0, my = 0, cx = 0, cy = 0

        const onMove = (e: MouseEvent) => {
          const rect = heroEl.getBoundingClientRect()
          mx = ((e.clientX - rect.left) / rect.width - 0.5) * 2
          my = ((e.clientY - rect.top) / rect.height - 0.5) * 2
        }
        heroEl.addEventListener('mousemove', onMove)

        const tick = () => {
          cx += (mx - cx) * 0.05
          cy += (my - cy) * 0.05

          const textEl = heroEl.querySelector('.il-hero-text') as HTMLElement
          const pipeEl = heroEl.querySelector('.il-pipeline') as HTMLElement
          const blobEls = pageRef.current?.querySelectorAll('.il-blob') as NodeListOf<HTMLElement>

          if (textEl) textEl.style.transform = `translate(${cx * -10}px, ${cy * -6}px)`
          if (pipeEl) pipeEl.style.transform = `translate(${cx * 14}px, ${cy * 10}px) perspective(800px) rotateY(${cx * -2}deg)`
          blobEls?.forEach((b, i) => {
            const factor = (i + 1) * 8
            b.style.transform = `translate(${cx * factor}px, ${cy * factor}px)`
          })

          rafId = requestAnimationFrame(tick)
        }
        rafId = requestAnimationFrame(tick)

        scrollCleanup = () => {
          heroEl.removeEventListener('mousemove', onMove)
          cancelAnimationFrame(rafId)
        }
      }

      // ══════════════════════════════════════════════
      // 4. ANIMATED GRADIENT BLOBS (morph movement)
      // ══════════════════════════════════════════════
      animate('.il-blob-1', {
        translateX: [0, 60, -30, 0],
        translateY: [0, -40, 30, 0],
        scale: [1, 1.2, 0.9, 1],
        rotate: [0, 8, -5, 0],
        duration: 14000,
        loop: true,
        ease: 'inOutSine',
      })
      animate('.il-blob-2', {
        translateX: [0, -45, 35, 0],
        translateY: [0, 30, -45, 0],
        scale: [1, 0.85, 1.15, 1],
        rotate: [0, -6, 10, 0],
        duration: 18000,
        loop: true,
        ease: 'inOutSine',
      })
      animate('.il-blob-3', {
        translateX: [0, 25, -50, 0],
        translateY: [0, -25, 40, 0],
        scale: [1, 1.1, 0.88, 1],
        duration: 20000,
        loop: true,
        ease: 'inOutSine',
      })

      // ══════════════════════════════════════════════
      // 5. SCROLL-TRIGGERED REVEALS (3D + elastic)
      // ══════════════════════════════════════════════
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return
          const el = entry.target as HTMLElement
          const anim = el.getAttribute('data-anim')

          if (anim === 'fade-up') {
            animate(el, {
              translateY: [50, 0],
              opacity: [0, 1],
              duration: 1000,
              ease: 'outCubic',
            })
          } else if (anim === 'stagger-cards') {
            const kids = Array.from(el.children) as HTMLElement[]
            kids.forEach(k => { k.style.opacity = '0' })
            el.style.opacity = '1'
            animate(kids, {
              translateY: [60, 0],
              rotateX: [-15, 0],
              opacity: [0, 1],
              delay: stagger(140),
              duration: 1000,
              ease: 'outCubic',
            })
          } else if (anim === 'flip-cards') {
            // 3D CARD FLIP — problem cards rotate in from below
            const kids = Array.from(el.children) as HTMLElement[]
            kids.forEach(k => { k.style.opacity = '0' })
            el.style.opacity = '1'
            animate(kids, {
              rotateX: [-60, 0],
              translateY: [80, 0],
              translateZ: [-100, 0],
              opacity: [0, 1],
              delay: stagger(180),
              duration: 1200,
              ease: 'outCubic',
            })
          } else if (anim === 'slide-left') {
            animate(el, {
              translateX: [-80, 0],
              opacity: [0, 1],
              duration: 1000,
              ease: 'outCubic',
            })
          } else if (anim === 'slide-right') {
            animate(el, {
              translateX: [80, 0],
              opacity: [0, 1],
              duration: 1000,
              ease: 'outCubic',
            })
          } else if (anim === 'split-enter') {
            // Objection card — two halves enter from opposite sides
            const sides = Array.from(el.children) as HTMLElement[]
            if (sides[0]) {
              animate(sides[0], {
                translateX: [-100, 0],
                opacity: [0, 1],
                duration: 1000,
                ease: 'outCubic',
              })
            }
            if (sides[1]) {
              animate(sides[1], {
                translateX: [100, 0],
                opacity: [0, 1],
                duration: 1000,
                ease: 'outCubic',
              })
            }
          } else if (anim === 'typewriter') {
            // TYPEWRITER JSON — lines appear one by one
            el.style.opacity = '1'
            const lineEls = el.querySelectorAll('.il-json-line') as NodeListOf<HTMLElement>
            lineEls.forEach(l => {
              l.style.opacity = '0'
              l.style.transform = 'translateX(-8px)'
            })
            animate(Array.from(lineEls), {
              opacity: [0, 1],
              translateX: [-8, 0],
              delay: stagger(80),
              duration: 400,
              ease: 'outCubic',
            })
            // Blinking cursor on last line
            const cursor = el.querySelector('.il-json-cursor') as HTMLElement
            if (cursor) {
              cursor.style.opacity = '0'
              setTimeout(() => {
                cursor.style.opacity = '1'
              }, lineEls.length * 80 + 400)
            }
          } else if (anim === 'scale-up') {
            animate(el, {
              scale: [0.88, 1],
              opacity: [0, 1],
              duration: 1000,
              ease: 'outCubic',
            })
          }

          observer.unobserve(el)
        })
      }, { threshold: 0.08, rootMargin: '0px 0px -20px 0px' })

      pageRef.current?.querySelectorAll('[data-anim]').forEach(el => {
        ;(el as HTMLElement).style.opacity = '0'
        observer.observe(el)
      })

      // ══════════════════════════════════════════════
      // 6. COUNTER ANIMATIONS (elastic overshoot)
      // ══════════════════════════════════════════════
      const counterObs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return
          const el = entry.target as HTMLElement
          const end = el.getAttribute('data-count-end') || ''
          const numMatch = end.match(/[\d.]+/)
          if (!numMatch) { el.textContent = end; counterObs.unobserve(el); return }
          const target = parseFloat(numMatch[0])
          const prefix = end.slice(0, end.indexOf(numMatch[0]))
          const suffix = end.slice(end.indexOf(numMatch[0]) + numMatch[0].length)
          const obj = { v: 0 }

          // Overshoot by 15% then settle back
          const overshoot = target * 1.15
          animate(obj, {
            v: [0, overshoot],
            duration: 1600,
            ease: 'outExpo',
            onUpdate: () => {
              const val = target >= 10 ? Math.round(obj.v) : obj.v.toFixed(0)
              el.textContent = prefix + val + suffix
            },
            onComplete: () => {
              // Settle back from overshoot
              animate(obj, {
                v: target,
                duration: 600,
                ease: 'outElastic(1, 0.5)',
                onUpdate: () => {
                  const val = target >= 10 ? Math.round(obj.v) : obj.v.toFixed(0)
                  el.textContent = prefix + val + suffix
                },
                onComplete: () => { el.textContent = end },
              })
            },
          })
          counterObs.unobserve(el)
        })
      }, { threshold: 0.3 })

      pageRef.current?.querySelectorAll('[data-count-end]').forEach(el => counterObs.observe(el))

      // ══════════════════════════════════════════════
      // 7. 3D CARD TILT ON HOVER
      // Cards follow mouse position for perspective tilt
      // ══════════════════════════════════════════════
      const tiltCards = pageRef.current?.querySelectorAll('.il-problem-card, .il-step-item') as NodeListOf<HTMLElement>
      tiltCards?.forEach(card => {
        card.addEventListener('mousemove', (e: MouseEvent) => {
          const rect = card.getBoundingClientRect()
          const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
          const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2
          animate(card, {
            rotateY: x * 5,
            rotateX: y * -5,
            translateZ: 10,
            duration: 300,
            ease: 'outExpo',
          })
        })
        card.addEventListener('mouseleave', () => {
          animate(card, {
            rotateY: 0,
            rotateX: 0,
            translateZ: 0,
            duration: 600,
            ease: 'outElastic(1, 0.5)',
          })
        })
      })

      // ══════════════════════════════════════════════
      // 8. MAGNETIC CTA BUTTONS
      // ══════════════════════════════════════════════
      pageRef.current?.querySelectorAll('.il-submit, .il-nav-cta').forEach(btn => {
        const el = btn as HTMLElement
        el.addEventListener('mousemove', (e: MouseEvent) => {
          const rect = el.getBoundingClientRect()
          const x = (e.clientX - rect.left - rect.width / 2) * 0.18
          const y = (e.clientY - rect.top - rect.height / 2) * 0.18
          animate(el, { translateX: x, translateY: y, scale: 1.05, duration: 300, ease: 'outExpo' })
        })
        el.addEventListener('mouseleave', () => {
          animate(el, { translateX: 0, translateY: 0, scale: 1, duration: 500, ease: 'outElastic(1, 0.5)' })
        })
      })

      // ══════════════════════════════════════════════
      // 9. SVG CONNECTING LINE (how it works steps)
      // ══════════════════════════════════════════════
      const connectLine = pageRef.current?.querySelector('.il-connect-line') as SVGPathElement
      if (connectLine) {
        const len = connectLine.getTotalLength()
        connectLine.style.strokeDasharray = String(len)
        connectLine.style.strokeDashoffset = String(len)

        const lineObs = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              animate(connectLine, {
                strokeDashoffset: [len, 0],
                duration: 2500,
                ease: 'inOutCubic',
              })
              lineObs.unobserve(entry.target)
            }
          })
        }, { threshold: 0.2 })
        lineObs.observe(connectLine.closest('svg')!)
      }

      // ══════════════════════════════════════════════
      // 10. NAV SCROLL — parallax shrink on scroll
      // ══════════════════════════════════════════════
      let lastScroll = 0
      const navEl = pageRef.current?.querySelector('.il-nav') as HTMLElement
      const onScroll = () => {
        const y = window.scrollY
        if (navEl) {
          navEl.classList.toggle('scrolled', y > 60)
        }
        lastScroll = y
      }
      window.addEventListener('scroll', onScroll, { passive: true })
      cleanups.push(() => window.removeEventListener('scroll', onScroll))

    }).catch(() => {
      // Fallback — show everything
      pageRef.current?.querySelectorAll('.il-line').forEach(el => {
        ;(el as HTMLElement).style.transform = 'none'
        ;(el as HTMLElement).style.opacity = '1'
      })
      pageRef.current?.querySelectorAll('[data-anim]').forEach(el => {
        ;(el as HTMLElement).style.opacity = '1'
      })
    })

    // Safety: never leave content invisible
    const safetyTimer = setTimeout(() => {
      pageRef.current?.querySelectorAll('[data-anim]').forEach(el => {
        const htmlEl = el as HTMLElement
        if (htmlEl.style.opacity === '0') {
          htmlEl.style.opacity = '1'
          htmlEl.style.transition = 'opacity 0.5s ease'
        }
      })
      pageRef.current?.querySelectorAll('.il-char').forEach(el => {
        ;(el as HTMLElement).style.opacity = '1'
      })
    }, 4000)

    return () => {
      scrollCleanup?.()
      cancelAnimationFrame(rafId)
      clearTimeout(safetyTimer)
      cleanups.forEach(fn => fn())
    }
  }, [])

  // =============================================
  // DEPLOYMENT: VPS Setup Guide
  // =============================================
  //
  // RECOMMENDED STACK:
  //   - Build: npm run build → serve dist/ as static
  //   - Reverse proxy: Caddy (auto-HTTPS)
  //   - API: Express/Fastify for POST /api/waitlist
  //   - Database: SQLite or Postgres
  //
  // Caddy config:
  //   yourdomain.com {
  //     root * /var/www/landing/dist
  //     file_server
  //     reverse_proxy /api/* localhost:3001
  //   }
  //
  // ALTERNATIVE: Supabase (free tier):
  //   npm install @supabase/supabase-js
  //   await supabase.from('waitlist').insert({ email })
  // =============================================

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
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
  }, [email])

  const formProps = { submitted, loading, email, setEmail, error, waitlistCount, onSubmit: handleSubmit }

  return (
    <div ref={pageRef} className="il-page">
      {/* Animated gradient blobs */}
      <div className="il-blob il-blob-1" aria-hidden="true" />
      <div className="il-blob il-blob-2" aria-hidden="true" />
      <div className="il-blob il-blob-3" aria-hidden="true" />

      {/* Nav */}
      <nav className="il-nav">
        <div className="il-nav-inner">
          <div className="il-nav-left">
            <Link to="/" className="il-nav-hub-link">Hub</Link>
            <span className="il-nav-logo"><span className="il-spark">✦</span> Imagine Labs</span>
          </div>
          <button
            className="il-nav-cta"
            onClick={() => document.getElementById('il-final-cta')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Apply for Free Pilot
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="il-hero" ref={heroRef}>
        {/* Data stream particles */}
        <div className="il-data-stream" aria-hidden="true" />

        <div className="il-hero-inner">
          <div className="il-hero-text">
            <div className="il-eyebrow">
              <span className="il-pulse-dot" />
              Now accepting pilot applications
            </div>

            <h1 className="il-h1">
              <span className="il-line-mask"><span className="il-line">A few demo videos.</span></span>
              <span className="il-line-mask"><span className="il-line il-line-green">10,000 training scenarios.</span></span>
              <span className="il-line-mask"><span className="il-line il-line-muted">We multiply the rest.</span></span>
            </h1>

            <p className="il-hero-sub">
              Two demo videos in, thousands of training trajectories out.
              Our world model learns from your footage and generates the rest —
              no simulator setup, no URDF files, VLA-ready overnight.
            </p>

            <div className="il-hero-form-wrap">
              <WaitlistForm {...formProps} />
            </div>
          </div>

          <div className="il-hero-right">
            <PipelineWidget activeStep={pipeStep} complete={pipeComplete} />
          </div>
        </div>
      </section>

      {/* Metrics */}
      <div className="il-metrics" data-anim="stagger-cards">
        <div className="il-metric">
          <div className="il-metric-val" data-count-end="100×">0×</div>
          <div className="il-metric-label">More training data<br />from your footage</div>
        </div>
        <div className="il-metric">
          <div className="il-metric-val" data-count-end="<8h">&lt;8h</div>
          <div className="il-metric-label">Pipeline runtime<br />start to finish</div>
        </div>
        <div className="il-metric">
          <div className="il-metric-val" data-count-end="46%">0%</div>
          <div className="il-metric-label">Engineer time<br />saved on data prep</div>
        </div>
        <div className="il-metric">
          <div className="il-metric-val" data-count-end="2">0</div>
          <div className="il-metric-label">Demo videos is all<br />you need to start</div>
        </div>
      </div>

      {/* Problem */}
      <section className="il-section" id="il-problem">
        <div className="il-container">
          <p className="il-section-eyebrow" data-anim="fade-up">The problem</p>
          <h2 className="il-section-title" data-anim="fade-up">
            A few demos isn&apos;t enough to train on.<br />But it&apos;s enough to start.
          </h2>
          <div className="il-problem-grid" data-anim="flip-cards">
            {problems.map(p => (
              <div key={p.num} className="il-problem-card">
                <span className="il-problem-num">{p.num} — {p.tag}</span>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="il-section il-section-warm" id="il-how">
        <div className="il-container">
          <p className="il-section-eyebrow" data-anim="fade-up">How it works</p>
          <h2 className="il-section-title" data-anim="fade-up">Four steps. Overnight.</h2>
          <div className="il-how-grid">
            <div className="il-steps-list" data-anim="slide-left">
              {/* SVG connecting line between steps */}
              <svg className="il-connect-svg" viewBox="0 0 4 320" preserveAspectRatio="none" aria-hidden="true">
                <path
                  className="il-connect-line"
                  d="M2,0 L2,320"
                  stroke="var(--green)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  fill="none"
                  opacity="0.3"
                />
              </svg>
              {['Upload', 'Reconstruct', 'Generate', 'Receive'].map((title, i) => {
                const descs = [
                  'Drop in two or three videos of your robot doing the task. Any camera, any setup.',
                  'We build a precise 3D model of your scene — robot, objects, environment — straight from your footage.',
                  'Our world model synthesizes thousands of new scenarios from your scene — new positions, angles, and edge cases your demos never covered.',
                  'Thousands of training trajectories, overnight, in the format your pipeline already reads.',
                ]
                return (
                  <div key={i} className="il-step-item">
                    <span className="il-step-num">0{i + 1}</span>
                    <div>
                      <div className="il-step-title">{title}</div>
                      <div className="il-step-desc">{descs[i]}</div>
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="il-json-panel" data-anim="typewriter">
              <div className="il-json-header">
                <span className="il-json-title">Output · trajectory.json</span>
                <span className="il-json-badge">✓ LeRobot v3</span>
              </div>
              <pre className="il-json-body">
                {jsonLines.map((line, i) => (
                  <span key={i} className="il-json-line">{line}{'\n'}</span>
                ))}
                <span className="il-json-cursor">▌</span>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Why it works */}
      <section className="il-section" id="il-why">
        <div className="il-container">
          <p className="il-section-eyebrow" data-anim="fade-up">Why it works</p>
          <h2 className="il-section-title" data-anim="fade-up">Why generated data actually transfers.</h2>
          <div className="il-objection" data-anim="split-enter">
            <div className="il-objection-side il-objection-concern">
              <span className="il-objection-label concern">The concern</span>
              <p className="il-objection-claim">
                &ldquo;AI-generated data won&apos;t match the physics of our real robot. We&apos;ve been burned by sim-to-real gaps before.&rdquo;
              </p>
            </div>
            <div className="il-objection-side il-objection-answer">
              <span className="il-objection-label answer">What we do differently</span>
              <ul className="il-objection-list">
                {objections.map((o, i) => <li key={i}>{o}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="il-final-cta" id="il-final-cta">
        <div className="il-container" style={{ textAlign: 'center' }}>
          <h2 className="il-section-title" data-anim="fade-up" style={{ margin: '0 auto 12px', textAlign: 'center' }}>
            Have a few demos?<br />Let&apos;s turn them into thousands.
          </h2>
          <p className="il-final-sub" data-anim="fade-up">
            Drop in your teleoperation demos. Get thousands of VLA-ready trajectories overnight.
          </p>
          <div className="il-final-form" data-anim="scale-up">
            <WaitlistForm {...formProps} />
          </div>
          <p className="il-reassurance" data-anim="fade-up">No contracts · We reach out within 48h</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="il-footer">
        <div className="il-footer-inner">
          <span className="il-footer-logo"><span className="il-spark">✦</span> Imagine Labs</span>
          <span className="il-footer-copy">© 2026 Imagine Labs. All rights reserved.</span>
        </div>
      </footer>
    </div>
  )
}
