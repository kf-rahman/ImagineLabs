import { createFileRoute, Link } from '@tanstack/react-router'
import { useState, useEffect, type FormEvent } from 'react'
import '../styles/clusterops.css'

export const Route = createFileRoute('/clusterops')({
  component: ClusterOpsPage,
})

// ── Cluster visualization ──────────────────────────────────────────────────

const COLS = 24
const ROWS = 15
const TOTAL = COLS * ROWS

type NodeState = 'ok' | 'fail' | 'recovering'

function ClusterGrid() {
  const [nodes, setNodes] = useState<NodeState[]>(() =>
    Array<NodeState>(TOTAL).fill('ok'),
  )

  // Randomly fail an ok node every 2.2 s
  useEffect(() => {
    const t = setInterval(() => {
      const idx = Math.floor(Math.random() * TOTAL)
      setNodes(prev => {
        if (prev[idx] !== 'ok') return prev
        const next = [...prev]
        next[idx] = 'fail'
        return next
      })
    }, 2200)
    return () => clearInterval(t)
  }, [])

  // Recover: first fail → recovering → ok every 1.2 s
  useEffect(() => {
    const t = setInterval(() => {
      setNodes(prev => {
        const next = [...prev]
        for (let i = 0; i < TOTAL; i++) {
          if (next[i] === 'recovering') { next[i] = 'ok'; break }
        }
        const fi = next.indexOf('fail')
        if (fi !== -1) next[fi] = 'recovering'
        return next
      })
    }, 1200)
    return () => clearInterval(t)
  }, [])

  const okCount   = nodes.filter(n => n === 'ok').length
  const recCount  = nodes.filter(n => n === 'recovering').length
  const failCount = nodes.filter(n => n === 'fail').length

  return (
    <div className="co-cluster-wrap">
      <div className="co-cluster-header">
        <span className="co-cluster-id">CLUSTER-GPU-ALPHA-01 // H100 × {TOTAL}</span>
        <div className="co-cluster-stats">
          <span className="co-ns ok">{okCount} OK</span>
          <span className="co-ns recovering">{recCount} REC</span>
          <span className="co-ns fail">{failCount} FAIL</span>
        </div>
      </div>
      <div
        className="co-cluster-grid"
        style={{ gridTemplateColumns: `repeat(${COLS}, 1fr)` }}
      >
        {nodes.map((state, i) => (
          <div key={i} className={`co-node ${state}`} />
        ))}
      </div>
      <div className="co-cluster-caption">
        LIVE SIM · CLUSTEROPS AUTO-RECOVERY · FAILURES RESOLVED IN &lt;4 MIN AVG
      </div>
    </div>
  )
}

// ── Waitlist form ──────────────────────────────────────────────────────────

function WaitlistForm() {
  const [email, setEmail]         = useState('')
  const [error, setError]         = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading]     = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('// invalid email address')
      return
    }
    setError('')
    setLoading(true)

    // =============================================
    // DEPLOYMENT: VPS Setup Guide
    // =============================================
    //
    // RECOMMENDED STACK (simple, secure, cheap):
    //   - Build: npm run build → serve dist/ as static files
    //   - Reverse proxy: Caddy (auto-HTTPS via Let's Encrypt, zero config)
    //   - API: Express/Fastify for POST /api/waitlist
    //   - Database: SQLite (simplest) or Postgres
    //
    // STEP 1 — Caddy config (automatic HTTPS):
    //   yourdomain.com {
    //     root * /var/www/landing/dist
    //     file_server
    //     reverse_proxy /api/* localhost:3001
    //   }
    //
    // STEP 2 — Waitlist endpoint:
    //   POST /api/waitlist { email: string }
    //   - Validate server-side (use email-validator package, not just regex)
    //   - Rate limit: 5 req/IP/min (express-rate-limit)
    //   - INSERT INTO waitlist (email, ip, created_at) VALUES (?, ?, NOW())
    //   - Return 200 OK | 400 bad email | 429 rate limited
    //
    // STEP 3 — Basic VPS security:
    //   - ufw: allow 80, 443, 22 — deny everything else
    //   - Don't run as root; use a dedicated user
    //   - fail2ban for SSH, unattended-upgrades for OS patches
    //
    // ALTERNATIVE: Supabase free tier (10-min setup):
    //   import { createClient } from '@supabase/supabase-js'
    //   await supabase.from('waitlist').insert({ email })
    //   Use Row Level Security to lock the table.
    // =============================================

    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 800)
  }

  if (submitted) {
    return (
      <div className="co-success">
        <div className="co-success-icon">●</div>
        <div>
          <strong>You&apos;re in the queue.</strong>
          <span>We&apos;ll reach out when early access opens for GPU cluster operators.</span>
        </div>
      </div>
    )
  }

  return (
    <form className="co-form" onSubmit={handleSubmit}>
      <div className="co-form-row">
        <input
          className="co-input"
          type="email"
          placeholder="ops-team@yourcompany.com"
          value={email}
          onChange={e => { setEmail(e.target.value); setError('') }}
          autoComplete="email"
        />
        <button className="co-btn" type="submit" disabled={loading}>
          {loading ? 'QUEUING...' : 'GET EARLY ACCESS'}
        </button>
      </div>
      {error && <div className="co-error">{error}</div>}
      <div className="co-form-note">// no spam · building for hyperscale &amp; colo operators</div>
    </form>
  )
}

// ── Page ───────────────────────────────────────────────────────────────────

function ClusterOpsPage() {
  return (
    <div className="co-page">

      {/* NAV */}
      <nav className="co-nav">
        <div className="container">
          <div className="co-nav-inner">
            <div className="co-nav-left">
              <Link to="/" className="co-back">← hub</Link>
              <span className="co-logo">CLUSTER<em>OPS</em></span>
            </div>
            <div className="co-nav-right">
              <div className="co-status-badge">
                <div className="co-pulse" />
                SYSTEMS NOMINAL
              </div>
              <button
                className="co-nav-btn"
                onClick={() =>
                  document.getElementById('cta-bottom')?.scrollIntoView({ behavior: 'smooth' })
                }
              >
                JOIN WAITLIST
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="co-hero">
        <div className="container">
          <div className="co-hero-inner">
            <div className="co-hero-text">
              <div className="co-eyebrow">Autonomous GPU Cluster Recovery</div>
              <h1 className="co-h1">
                YOUR CLUSTER
                <em>NEVER STOPS.</em>
              </h1>
              <p className="co-sub">
                ClusterOps detects hardware failures in your AI training cluster, dispatches
                a robot to the rack, and restores the failed node — without a human in the loop.
                Average recovery time: under 4 minutes.
              </p>
              <WaitlistForm />
              <div className="co-hero-metrics">
                <div className="co-hm">
                  <span className="co-hm-val">&lt;4<em>MIN</em></span>
                  <span className="co-hm-label">avg recovery time</span>
                </div>
                <div className="co-hm">
                  <span className="co-hm-val">$30K<em>/HR</em></span>
                  <span className="co-hm-label">compute cost saved</span>
                </div>
                <div className="co-hm">
                  <span className="co-hm-val">24/7</span>
                  <span className="co-hm-label">autonomous ops</span>
                </div>
              </div>
            </div>
            <div className="co-hero-viz">
              <ClusterGrid />
            </div>
          </div>
        </div>
      </section>

      {/* IMPACT BAR */}
      <div className="co-impact-bar">
        <div className="container">
          <div className="co-impact-inner">
            <div className="co-impact-item">
              <span className="co-impact-before">4–8 hr response</span>
              <span className="co-impact-arrow">→</span>
              <span className="co-impact-after">&lt;4 MIN</span>
              <span className="co-impact-label">mean time to recovery</span>
            </div>
            <div className="co-impact-divider" />
            <div className="co-impact-item">
              <span className="co-impact-before">$8K–24K per incident</span>
              <span className="co-impact-arrow">→</span>
              <span className="co-impact-after">$0</span>
              <span className="co-impact-label">downtime cost per failure</span>
            </div>
            <div className="co-impact-divider" />
            <div className="co-impact-item">
              <span className="co-impact-before">1 tech per site</span>
              <span className="co-impact-arrow">→</span>
              <span className="co-impact-after">1 / 50</span>
              <span className="co-impact-label">technician-to-site ratio</span>
            </div>
            <div className="co-impact-divider" />
            <div className="co-impact-item">
              <span className="co-impact-before">manual triage required</span>
              <span className="co-impact-arrow">→</span>
              <span className="co-impact-after">AUTO</span>
              <span className="co-impact-label">failure resolution mode</span>
            </div>
          </div>
        </div>
      </div>

      {/* PROBLEM */}
      <section className="co-section">
        <div className="container">
          <div className="co-section-eyebrow">The Problem</div>
          <h2 className="co-section-title">
            At 50K GPUs, failure is constant. Recovery is broken.
          </h2>
          <p className="co-section-body">
            A frontier model training run on 50,000 H100s encounters 3–5 hardware failures per week.
            Each failure pauses the entire job. Every hour of idle compute costs $30,000+. The current
            solution: page a human.
          </p>
          <div className="co-problem-grid">
            <div className="co-problem-card">
              <span className="co-problem-code">ERROR-01</span>
              <h3>Failures don&apos;t wait for business hours</h3>
              <p>
                GPU nodes, NICs, and cables fail around the clock. Your training run halts at 3 AM
                on a Sunday. A human technician is 4–8 hours away. Your $50M training job waits.
              </p>
            </div>
            <div className="co-problem-card">
              <span className="co-problem-code">ERROR-02</span>
              <h3>Remote hands cost time you can&apos;t spare</h3>
              <p>
                $75–150/hour for a technician, plus travel time to wherever you built near cheap power.
                Rural Texas. Rural Wyoming. The skilled workers your facility needs simply don&apos;t exist nearby.
              </p>
            </div>
            <div className="co-problem-card">
              <span className="co-problem-code">ERROR-03</span>
              <h3>Cable density defeats manual intervention</h3>
              <p>
                Dense cable looms make it nearly impossible to reach a single component without disturbing
                surrounding infrastructure. SoftBank spent R&amp;D budget redesigning racks from scratch
                because cables are the largest obstacle to physical automation.
              </p>
            </div>
            <div className="co-problem-card">
              <span className="co-problem-code">ERROR-04</span>
              <h3>Your scheduler and ops team don&apos;t connect</h3>
              <p>
                SLURM detects the failure. An alert fires. A human gets paged. They open a ticket. Forty
                minutes pass. Nothing in the loop is automated. ClusterOps closes the gap between cluster
                scheduler and physical recovery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="co-section co-section--alt">
        <div className="container">
          <div className="co-section-eyebrow">How It Works</div>
          <h2 className="co-section-title">Detect. Dispatch. Restore.</h2>
          <p className="co-section-body">
            Three automated steps replace the 4–8 hour human response cycle. No ticket, no pager,
            no travel time.
          </p>
          <div className="co-steps-grid">

            <div className="co-terminal">
              <div className="co-terminal-bar">
                <div className="co-dot red" />
                <div className="co-dot amber" />
                <div className="co-dot green" />
                <span className="co-terminal-title">01_detect.rs</span>
              </div>
              <pre className="co-terminal-body"><span className="co-kw">on</span> <span className="co-str">cluster.node.fault</span> {'{'}
  <span className="co-comment">{'// SLURM / k8s / IPMI event'}</span>
  <span className="co-kw">parse</span>  failure_signature
  <span className="co-kw">locate</span> rack_position
  <span className="co-kw">score</span>  recovery_priority
  <span className="co-kw">emit</span>   <span className="co-str">dispatch_event</span>
{'}'}</pre>
              <div className="co-terminal-label">
                Native integrations with SLURM, Kubernetes, and IPMI. Failure signature parsed
                in under 10 seconds.
              </div>
            </div>

            <div className="co-terminal">
              <div className="co-terminal-bar">
                <div className="co-dot red" />
                <div className="co-dot amber" />
                <div className="co-dot green" />
                <span className="co-terminal-title">02_dispatch.py</span>
              </div>
              <pre className="co-terminal-body"><span className="co-kw">robot</span>.navigate_to({'{'}
  rack=<span className="co-str">&quot;ROW-12.UNIT-04&quot;</span>,
  path=cable_map
{')'})
<span className="co-kw">robot</span>.identify(node_id)
<span className="co-comment">{'# sub-4-min arrival'}</span>
<span className="co-kw">robot</span>.confirm_target()
<span className="co-str">→ ready_for_swap</span></pre>
              <div className="co-terminal-label">
                Robot navigates via a live cable-aware facility map. Computer vision confirms the
                target node before any physical contact.
              </div>
            </div>

            <div className="co-terminal">
              <div className="co-terminal-bar">
                <div className="co-dot red" />
                <div className="co-dot amber" />
                <div className="co-dot green" />
                <span className="co-terminal-title">03_restore.sh</span>
              </div>
              <pre className="co-terminal-body">$ clusterops restore NODE-2847
<span className="co-str">→ performing hardware swap</span>
<span className="co-str">→ running diagnostics</span>
<span className="co-str">→ signaling scheduler</span>

<span className="co-comment">✓ NODE-2847 restored</span>
<span className="co-comment">  3m 41s elapsed</span>
<span className="co-str">✓ training run resumed</span></pre>
              <div className="co-terminal-label">
                Full hardware swap, post-swap diagnostics, and cluster reintegration. Every
                incident logged with video and telemetry.
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="co-section">
        <div className="container">
          <div className="co-section-eyebrow">Capabilities</div>
          <h2 className="co-section-title">Built for hyperscale operations from day one.</h2>
          <div className="co-features-grid">
            <div className="co-feat">
              <span className="co-feat-tag">INTEGRATION</span>
              <span className="co-feat-icon">⚡</span>
              <h3>SLURM / K8S / IPMI NATIVE</h3>
              <p>
                Direct integration with SLURM, Kubernetes, and IPMI. No middleware, no custom
                webhooks, no ticket queue between detection and dispatch.
              </p>
            </div>
            <div className="co-feat">
              <span className="co-feat-tag">DISPATCH</span>
              <span className="co-feat-icon">🤖</span>
              <h3>SUB-4-MINUTE ROBOT DISPATCH</h3>
              <p>
                Robot fleet on standby 24/7. From failure detection to robot on-site in under
                4 minutes — any time of day, any day of the year.
              </p>
            </div>
            <div className="co-feat">
              <span className="co-feat-tag">NAVIGATION</span>
              <span className="co-feat-icon">🧭</span>
              <h3>CABLE-AWARE PATHFINDING</h3>
              <p>
                Live 3D facility map updated continuously. The robot navigates cable-dense
                environments without disturbing adjacent infrastructure.
              </p>
            </div>
            <div className="co-feat">
              <span className="co-feat-tag">RECOVERY</span>
              <span className="co-feat-icon">🔧</span>
              <h3>AUTONOMOUS HARDWARE SWAP</h3>
              <p>
                GPU cards, NIC replacements, cable reseating, and server resets — executed
                autonomously with computer-vision confirmation at each step.
              </p>
            </div>
            <div className="co-feat">
              <span className="co-feat-tag">AUDIT</span>
              <span className="co-feat-icon">📋</span>
              <h3>FULL INCIDENT TELEMETRY</h3>
              <p>
                Every recovery logged: video, sensor data, swap telemetry, and scheduler signals.
                Complete audit trail for compliance and post-mortems.
              </p>
            </div>
            <div className="co-feat">
              <span className="co-feat-tag">FLEET</span>
              <span className="co-feat-icon">🏭</span>
              <h3>MULTI-SITE FLEET MANAGEMENT</h3>
              <p>
                One operator manages 50 sites. Deploy robot fleets across facilities and manage
                them all from a single operations dashboard.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="co-section co-section--alt">
        <div className="container">
          <div className="co-section-eyebrow">FAQ</div>
          <h2 className="co-section-title">Common questions.</h2>
          <div className="co-faq">
            <div className="co-faq-item">
              <div className="co-faq-q">Which hardware failures can ClusterOps handle?</div>
              <div className="co-faq-a">
                GPU node failures, NIC card failures, cable disconnects, server resets, and drive
                replacements in standard rack configurations. Support for optical transceiver swaps
                is on the roadmap for Q3 2026. For facilities using SoftBank-style cable-less
                connectors, the robot can handle a full server swap autonomously.
              </div>
            </div>
            <div className="co-faq-item">
              <div className="co-faq-q">How does the robot navigate cable-dense environments?</div>
              <div className="co-faq-a">
                ClusterOps maintains a live 3D map of each facility, updated continuously via the
                robot&apos;s sensor suite. Before any physical action, the system identifies a safe
                approach path that avoids disturbing adjacent cables. Computer vision confirms the
                target component at each step before the manipulator makes contact.
              </div>
            </div>
            <div className="co-faq-item">
              <div className="co-faq-q">What cluster schedulers do you support?</div>
              <div className="co-faq-a">
                SLURM and Kubernetes are fully supported at launch. IPMI is supported for
                hardware-level detection. Native integrations with RunAI, Determined AI, and Ray
                are on the roadmap. An open API is available for custom schedulers and DCIM platforms.
              </div>
            </div>
            <div className="co-faq-item">
              <div className="co-faq-q">How is pricing structured?</div>
              <div className="co-faq-a">
                We&apos;re working with early design partners to define the right model. Current
                thinking: a monthly platform fee per facility plus a per-recovery charge — so you
                only pay when ClusterOps actually resolves something. Pricing will be substantially
                below your current remote-hands cost at your failure rate. Exact numbers shared
                with waitlist members first.
              </div>
            </div>
            <div className="co-faq-item">
              <div className="co-faq-q">How does security vetting work for hyperscaler facilities?</div>
              <div className="co-faq-a">
                We&apos;re starting with mid-tier colocation operators and independent cloud
                providers (CoreWeave, Lambda Labs) where procurement cycles are shorter. For
                hyperscalers, we&apos;re building SOC 2 and facility access compliance documentation
                in parallel. If you&apos;re at a hyperscaler and want to pilot, reach out —
                we&apos;ll work through the security process together.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="co-cta" id="cta-bottom">
        <div className="container">
          <div className="co-cta-inner">
            <div className="co-cta-label">// early access open</div>
            <h2>STOP PAYING FOR DOWNTIME.</h2>
            <p>
              Join the waitlist. We&apos;re onboarding the first cohort of GPU cluster operators
              for a paid pilot in Q3 2026. You&apos;ll get direct access to the founding team and
              input on the product roadmap.
            </p>
            <WaitlistForm />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="container">
          <div className="co-footer">
            <span className="co-footer-logo">CLUSTEROPS</span>
            <span className="co-footer-note">
              // autonomous physical recovery for AI GPU clusters · 2026
            </span>
          </div>
        </div>
      </footer>

    </div>
  )
}
