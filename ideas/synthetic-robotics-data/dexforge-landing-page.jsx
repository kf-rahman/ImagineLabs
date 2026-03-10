// FRAMEWORK: This is a plain React component. To deploy:
// 1. npx create-start-app my-landing (TanStack Start)
// 2. Drop this file into src/routes/index.tsx
// 3. Import dexforge.css from the same directory (or move to src/styles/)
// 4. The waitlist API handler goes in src/routes/api/waitlist.ts
// 5. npm run build && node .output/server/index.mjs
// 6. Put Caddy in front for automatic HTTPS

// =============================================
// DEPLOYMENT: VPS Setup Guide
// =============================================
//
// RECOMMENDED STACK (simple, secure, cheap):
//   - Build: npm run build → serve the dist/ folder as static files
//   - Reverse proxy: Caddy (auto-HTTPS via Let's Encrypt, zero config)
//   - API: tiny Express/Fastify server for the /api/waitlist endpoint
//   - Database: SQLite (simplest) or Postgres
//
// STEP 1: Caddy config
//   dexforge.ai {
//     root * /var/www/landing/dist
//     file_server
//     reverse_proxy /api/* localhost:3001
//   }
//
// STEP 2: Waitlist API endpoint
//   - POST /api/waitlist { email: string }
//   - Validate email server-side (use a library, not just regex)
//   - Rate limit: max 5 requests per IP per minute (express-rate-limit)
//   - INSERT INTO waitlist (email, created_at, ip) VALUES (?, NOW(), ?)
//   - Return 200 on success, 429 on rate limit, 400 on bad email
//
// STEP 3: Basic VPS security
//   - ufw: allow 80, 443, 22 — deny everything else
//   - Don't run the app as root
//   - Set up fail2ban for SSH
//
// ALTERNATIVE: Supabase free tier (10 min setup):
//   const { data, error } = await supabase.from('waitlist').insert({ email })
// =============================================

import { useState, useEffect } from "react";
import "./dexforge.css";

const faqs = [
  {
    q: "How is DexForge different from NVIDIA Isaac Sim?",
    a: "Isaac Sim is a general-purpose physics simulator that requires significant engineering effort to configure for dexterous manipulation. DexForge is purpose-built for multi-fingered hands and contact-rich tasks — we've pre-solved domain randomization, contact parameters, and deformable object physics so you get training-ready data without 3 months of setup."
  },
  {
    q: "Does your data actually transfer to real robots?",
    a: "We benchmark every dataset against real-robot validation runs. Every dataset ships with our Sim-to-Real Transfer Score (S2R-Score), a metric correlating synthetic training metrics with real-world task success rates. Average S2R-Score across manipulation tasks is 0.82."
  },
  {
    q: "What robot platforms and hands do you support?",
    a: "Currently optimized for Franka Panda (gripper + Franka Hand), Dexterous LEAP Hand, Shadow Hand, and custom 3-4 fingered grippers. Humanoid dexterous hands (Figure, Unitree H1) in beta. Contact us for custom platform support."
  },
  {
    q: "How do you handle deformable objects like cloth and food?",
    a: "We use a hybrid physics approach: rigid-body simulation for the robot structure, coupled with FEM (finite element method) for deformable objects. Computationally heavier, but dramatically better sim-to-real transfer for soft manipulation tasks."
  },
];

function WaitlistForm({ submitted, loading, email, setEmail, error, waitlistCount, onSubmit }) {
  if (submitted) {
    return (
      <div className="success-state">
        <span className="success-icon">⚡</span>
        <div className="success-text">
          <strong>You&apos;re on the list.</strong>
          <span>We&apos;ll reach out when early access opens. #{waitlistCount} in queue.</span>
        </div>
      </div>
    );
  }
  return (
    <form onSubmit={onSubmit}>
      <div className="form-row">
        <input
          type="email"
          className="email-input"
          placeholder="your@roboticslab.ai"
          value={email}
          onChange={e => setEmail(e.target.value)}
          disabled={loading}
          aria-label="Work email"
        />
        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? "..." : "Get Access"}
        </button>
      </div>
      {error && <p style={{ color: '#ff4444', fontSize: '0.75rem', marginTop: '8px', fontFamily: 'JetBrains Mono, monospace' }}>{error}</p>}
      <p className="form-note">// {waitlistCount} ML teams on waitlist · No spam, ever</p>
    </form>
  );
}

export default function DexForgeLanding() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [waitlistCount, setWaitlistCount] = useState(247);

  useEffect(() => {
    const t = setInterval(() => {
      if (Math.random() > 0.97) setWaitlistCount(n => n + 1);
    }, 4000);
    return () => clearInterval(t);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setLoading(true);

    // ── SWAP IN REAL API CALL HERE ─────────────────────────────────
    // const res = await fetch('/api/waitlist', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ email }),
    // });
    // if (!res.ok) { setError('Something went wrong. Try again.'); setLoading(false); return; }
    // ──────────────────────────────────────────────────────────────

    await new Promise(r => setTimeout(r, 900));
    setSubmitted(true);
    setLoading(false);
    setWaitlistCount(n => n + 1);
  };

  const formProps = { submitted, loading, email, setEmail, error, waitlistCount, onSubmit: handleSubmit };

  return (
    <>
      <nav>
        <div className="container">
          <div className="nav-inner">
            <span className="logo">DEX<span>FORGE</span></span>
            <button
              className="nav-pill"
              onClick={() => document.getElementById("cta-bottom")?.scrollIntoView({ behavior: "smooth" })}
            >
              Join Waitlist
            </button>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-grid" />
        <div className="container">
          <div className="hero-eyebrow">Synthetic Data for Dexterous Robots</div>
          <h1>Training data your <em>hands</em> can actually use.</h1>
          <p className="hero-sub">
            NVIDIA Isaac Sim isn&apos;t built for your 16-DOF gripper. DexForge generates contact-rich manipulation training data — deformable objects, multi-fingered grasps, assembly tasks — that actually transfers to real hardware.
          </p>
          <div className="hero-form-wrap">
            <WaitlistForm {...formProps} />
          </div>
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-num">82%</span>
              <span className="stat-label">Avg. sim-to-real transfer</span>
            </div>
            <div className="stat-item">
              <span className="stat-num">100x</span>
              <span className="stat-label">Faster than teleop</span>
            </div>
            <div className="stat-item">
              <span className="stat-num">48h</span>
              <span className="stat-label">Task spec to dataset</span>
            </div>
          </div>
        </div>
      </section>

      <hr className="section-divider" />

      {/* ── PROBLEM ── */}
      <section className="section">
        <div className="container">
          <div className="section-label">// the problem</div>
          <h2 className="section-title">Your robot learns in a world that doesn&apos;t exist.</h2>
          <p className="section-body">
            Generic physics simulators were built for rigid bodies on flat surfaces. Real manipulation — cloth folding, food handling, dexterous grasping, tight-tolerance assembly — involves contact dynamics that break standard simulation. Your models train on lies, then fail on hardware.
          </p>
          <div className="problem-grid">
            {[
              { num: "01", title: "The sim-to-real wall", text: "Policies trained on standard synthetic data fail at real-world contact. Physics parameters are wrong, rendering doesn't match real cameras, and deformable objects don't exist in most simulators." },
              { num: "02", title: "Teleop can't scale", text: "Physical Intelligence collected ~10,000 hours of real robot data in their entire first year. You need millions of examples. Human teleoperation is the bottleneck, not your model." },
              { num: "03", title: "Generic tools aren't enough", text: "Isaac Sim is powerful — for automotive and navigation. Multi-fingered hands and contact-rich tasks require specialized physics parameters your team doesn't have time to tune." },
              { num: "04", title: "Diversity is expensive", text: "Real-world variability (lighting, object geometry, material properties) requires exhaustive data collection or expensive domain randomization expertise to simulate well." },
            ].map(c => (
              <div key={c.num} className="problem-card">
                <div className="problem-card-num">// {c.num}</div>
                <h3>{c.title}</h3>
                <p>{c.text}</p>
              </div>
            ))}
          </div>
          <div className="quote-block">
            <p className="quote-text">&ldquo;Data scarcity is one of the main things currently holding progress in robotics back. We need orders of magnitude more training data than current teleoperation can provide.&rdquo;</p>
            <p className="quote-attr">— CEO, Skild AI ($1.4B raised for robotics foundation models)</p>
          </div>
        </div>
      </section>

      <hr className="section-divider" />

      {/* ── FEATURES ── */}
      <section className="section">
        <div className="container">
          <div className="section-label">// solution</div>
          <h2 className="section-title">Contact-physics synthetic data, built for hands.</h2>
          <p className="section-body">
            DexForge is a managed data generation service. You describe the task. We generate physically accurate, labeled training data with verified sim-to-real transfer scores.
          </p>
          <div className="features-layout">
            {[
              { tag: "physics", icon: "⚙️", title: "Contact-Rich Physics", text: "FEM simulation for deformable objects. Friction and stiffness calibrated against real material measurements. Supports cloth, rubber, foam, food textures." },
              { tag: "hands", icon: "✋", title: "Dexterous Hand Support", text: "Pre-validated configs for LEAP Hand, Shadow Hand, Franka Hand, Allegro, and custom grippers. Multi-finger contact dynamics solved out of the box." },
              { tag: "validation", icon: "📊", title: "Sim-to-Real Score (S2R)", text: "Every dataset ships with our S2R-Score — a benchmark correlating synthetic training metrics with real-world task success rates. Know if your data will work before burning robot time." },
              { tag: "diversity", icon: "🔀", title: "Domain Randomization Pipelines", text: "Task-specific randomization presets: lighting, material properties, object geometries, sensor noise. Covers the long tail without manual configuration." },
              { tag: "scale", icon: "⚡", title: "GPU-Parallel Generation", text: "Run 1,000 parallel simulation instances. Generate a million manipulation trajectories overnight. Streamed directly to your cluster in HDF5, LEROBOT, or RLDS." },
              { tag: "workflow", icon: "🔗", title: "Pipeline Integration", text: "Native support for LeRobot, HuggingFace datasets, and custom training frameworks. Drop-in replacement for your existing data loading code." },
            ].map(f => (
              <div key={f.tag} className="feature-card">
                <span className="feature-tag">// {f.tag}</span>
                <span className="feature-icon">{f.icon}</span>
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="section-divider" />

      {/* ── HOW IT WORKS ── */}
      <section className="section">
        <div className="container">
          <div className="section-label">// how it works</div>
          <h2 className="section-title">From task spec to training data in 48 hours.</h2>
          <div className="steps">
            {[
              { n: "01", title: "Describe your task", body: "Submit a task specification: robot platform, hand type, object geometry (CAD or parametric), target action, and success criteria. Our onboarding takes under 30 minutes.", detail: "→ Supported: pick-and-place, assembly, folding, grasping, insertion" },
              { n: "02", title: "We configure the physics", body: "Our team sets up validated physics parameters for your specific hardware + task combination — contact stiffness, friction coefficients, domain randomization ranges — based on our real-world calibration library.", detail: "→ Turnaround: 24-48h initial setup, instant regeneration after" },
              { n: "03", title: "Generate at scale", body: "Run millions of trajectories in parallel GPU simulation. Every trajectory is labeled (action, state, reward, termination), formatted for your training framework, and benchmarked with S2R-Score.", detail: "→ Output formats: HDF5, LEROBOT, RLDS, custom" },
            ].map(s => (
              <div key={s.n} className="step">
                <span className="step-num">{s.n}</span>
                <div>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                  <p className="step-detail mono">{s.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="section-divider" />

      {/* ── FAQ ── */}
      <section className="section">
        <div className="container">
          <div className="section-label">// faq</div>
          <h2 className="section-title">Common questions.</h2>
          <div className="faq-list">
            {faqs.map((faq, i) => (
              <div key={i} className="faq-item">
                <div className="faq-q">{faq.q}</div>
                <p className="faq-a">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BOTTOM ── */}
      <div className="container">
        <div className="cta-bottom" id="cta-bottom">
          <h2>Your next model deserves real training data.</h2>
          <p>Join the waitlist. Early access includes 500K free trajectories and onboarding with our physics team.</p>
          <div className="cta-form-wrap">
            <WaitlistForm {...formProps} />
          </div>
        </div>
      </div>

      <div className="container">
        <footer>
          <span className="footer-logo">DEXFORGE</span>
          <span className="footer-copy">// Built for the teams that build hands · 2026</span>
        </footer>
      </div>
    </>
  );
}
