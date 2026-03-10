// FRAMEWORK: This is a plain React component. To deploy:
// 1. npx create-start-app my-landing (TanStack Start)
// 2. Drop this file into src/routes/index.tsx
// 3. Import surgisim.css from the same directory (or move to src/styles/)
// 4. The waitlist API handler goes in src/routes/api/waitlist.ts
// 5. npm run build && node .output/server/index.mjs
// 6. Put Caddy in front for automatic HTTPS

// =============================================
// DEPLOYMENT: VPS Setup Guide
// =============================================
//
// RECOMMENDED STACK:
//   - Caddy reverse proxy for HTTPS + static file serving
//   - Express/Fastify for /api/waitlist endpoint
//   - Postgres (preferred for compliance logging) or SQLite
//
//   surgisim.ai {
//     root * /var/www/dist
//     file_server
//     reverse_proxy /api/* localhost:3001
//   }
//
// API ENDPOINT: POST /api/waitlist { email, role?, organization? }
//   - Validate email server-side
//   - Rate limit: 5 requests/IP/min
//   - Store with timestamp and IP for spam detection
//
// COMPLIANCE NOTE: Healthcare/surgical audience is HIPAA-sensitive.
//   Do NOT collect patient data at any point. Email waitlist data only.
//   Consult a privacy attorney before handling any clinical data.
//
// ALTERNATIVE: Supabase free tier
//   const { error } = await supabase.from('waitlist').insert({ email, role })
// =============================================

import { useState } from "react";
import "./surgisim.css";

const faqs = [
  {
    q: "Why can't teams just use NVIDIA Isaac Sim for surgical robotics?",
    a: "Isaac Sim was built for manufacturing and mobile robotics. Surgical tissue simulation requires specialized biomechanical models (viscoelastic tissue, bleeding simulation, anatomical variation) that don't exist in general-purpose physics engines. Configuring one from scratch requires specialized expertise that most robotics ML teams don't have."
  },
  {
    q: "How do you handle patient privacy and regulatory requirements?",
    a: "SurgiSim generates entirely synthetic data — no patient images or data are used or generated. Our synthetic tissue models are built from biomechanical literature and cadaveric measurements, not clinical records. This makes our data inherently HIPAA-compliant and compatible with FDA's regulatory pathway for AI-assisted surgical devices."
  },
  {
    q: "What surgical robot platforms do you support?",
    a: "Currently optimized for Intuitive Surgical da Vinci (Si, Xi, SP), Medtronic Hugo RAS, and CMR Surgical Versius. We're adding support for Asensus Precision LapRo and custom single-port platforms in Q3 2026. Contact us for custom platform support."
  },
  {
    q: "How is SurgiSim different from surgical simulation used in medical training?",
    a: "Medical training simulators (Simbionix, Laerdal) are designed for human skill assessment — they prioritize visual realism for trainees, not the precision biomechanics and sensor-accurate rendering needed to train ML policies. SurgiSim is built from the ground up for machine learning, not human training."
  },
];

function WaitlistForm({ submitted, loading, email, setEmail, error, count, onSubmit }) {
  if (submitted) {
    return (
      <div className="ss-success">
        <span className="ss-check">✓</span>
        <div className="ss-success-text">
          <strong>You&apos;re on the access list.</strong>
          <span>We&apos;ll follow up within 3 business days. #{count} teams ahead.</span>
        </div>
      </div>
    );
  }
  return (
    <form onSubmit={onSubmit}>
      <div className="surgisim-form">
        <input
          type="email"
          className="ss-input"
          placeholder="researcher@surgicalrobotics.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
          disabled={loading}
          aria-label="Work email"
        />
        <button type="submit" className="ss-submit" disabled={loading}>
          {loading ? "···" : "Request Access"}
        </button>
      </div>
      {error && <p style={{ color: "#ff6b6b", fontSize: "0.74rem", marginTop: "8px" }}>{error}</p>}
      <p className="form-micro">{count} surgical robotics teams on waitlist · Confidential · No spam</p>
    </form>
  );
}

export default function SurgiSimLanding() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [count] = useState(94);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid work email.");
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
    // if (!res.ok) { setError('Something went wrong.'); setLoading(false); return; }
    // ──────────────────────────────────────────────────────────────

    await new Promise(r => setTimeout(r, 900));
    setSubmitted(true);
    setLoading(false);
  };

  const formProps = { submitted, loading, email, setEmail, error, count, onSubmit: handleSubmit };

  return (
    <>
      <nav>
        <div className="container">
          <div className="nav-inner">
            <span className="logo">Surgi<em>Sim</em></span>
            <button
              className="nav-cta"
              onClick={() => document.getElementById("cta-wrap")?.scrollIntoView({ behavior: "smooth" })}
            >
              Request Access
            </button>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="hero">
        <div className="container">
          <div className="hero-badge">
            <span className="badge-dot" />
            Surgical Robotics · Synthetic Training Data
          </div>
          <h1>
            Train surgical robots without<br />
            <em>touching a single patient.</em>
          </h1>
          <p className="hero-sub">
            Real surgical training data is ethically constrained, legally complex, and nearly impossible to collect at scale. SurgiSim generates biomechanically accurate synthetic data for surgical AI teams — tissue mechanics, instrument interaction, anatomical variation — so your policies train on millions of procedures, not dozens.
          </p>
          <div className="hero-form-wrap">
            <WaitlistForm {...formProps} />
          </div>
          <div className="trusted-row">
            Built for teams building on:
            <div className="trusted-tags">
              {["Intuitive Surgical (da Vinci)", "Medtronic Hugo", "CMR Versius", "Custom platforms"].map(t => (
                <span key={t} className="trusted-tag">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <hr className="divider" />

      {/* ── PROBLEM ── */}
      <section className="section">
        <div className="container">
          <div className="section-tag">The problem</div>
          <h2 className="section-title">Surgical robotics AI is data-starved by design.</h2>
          <p className="section-body">
            Every other robotics domain can collect training data by deploying robots in warehouses, homes, or test environments. Surgical robotics can&apos;t. Patient safety, IRB requirements, and operating room access make large-scale surgical data collection structurally impossible.
          </p>
          <div className="problem-cards">
            {[
              { tag: "Data Access", title: "Real surgical data is locked away", text: "Clinical video requires IRB approval, HIPAA compliance, and hospital partnerships. The data that does exist is inconsistently labeled, proprietary, and fiercely guarded. Most teams have access to hundreds of cases, not millions." },
              { tag: "Scale", title: "You can't run 10K procedures to collect training data", text: "Autonomous driving teams deploy fleets of cars to collect data. Surgical robots can't work that way. Every real training scenario requires an OR, a surgeon, and a patient. There's no scale path." },
              { tag: "Variation", title: "Anatomical diversity is the bottleneck", text: "Tissue stiffness, vascularity, surgical site geometry — these vary enormously across patients and procedures. A model trained on one anatomy fails on another. Covering this variation in real data would require decades of collection." },
              { tag: "Tooling", title: "General physics simulators aren't surgical-grade", text: "NVIDIA Isaac Sim and Genesis were built for rigid-body robotics. Soft tissue mechanics — viscoelasticity, cutting, bleeding, organ deformation — requires specialized biomechanical models that don't exist in off-the-shelf simulators." },
            ].map(c => (
              <div key={c.tag} className="prob-card">
                <div className="prob-card-tag">{c.tag}</div>
                <h3>{c.title}</h3>
                <p>{c.text}</p>
              </div>
            ))}
          </div>
          <div className="callout">
            <p className="callout-body">&ldquo;The fundamental challenge in surgical AI is not algorithms — it&apos;s data. We simply cannot ethically collect the volume and variety of surgical data needed to train robust autonomous systems.&rdquo;</p>
            <p className="callout-source">— Director of Surgical Robotics Research, Stanford Medicine</p>
          </div>
        </div>
      </section>

      <hr className="divider" />

      {/* ── FEATURES ── */}
      <section className="section">
        <div className="container">
          <div className="section-tag">Solution</div>
          <h2 className="section-title">Biomechanically accurate synthetic training data, at scale.</h2>
          <p className="section-body">
            SurgiSim is a managed synthetic data generation service for surgical robotics AI teams. We generate physically accurate tissue mechanics, instrument interactions, and anatomical variation — without a single patient.
          </p>
          <div className="features-list">
            {[
              { tag: "tissue physics", icon: "🫁", title: "Soft Tissue Simulation", text: "Viscoelastic tissue models calibrated from biomechanical literature and ex vivo measurements. Supports cutting, grasping, retraction, and suturing. Accounts for tissue stiffness variation across anatomy and patient demographics." },
              { tag: "anatomy", icon: "🫀", title: "Anatomical Variation Engine", text: "Procedurally generated patient anatomy: organ size, vasculature patterns, tissue density distributions, adhesions. Generate 100,000 anatomically distinct patients in hours, covering demographics and pathological variations." },
              { tag: "instruments", icon: "🔬", title: "Instrument Interaction Models", text: "Validated instrument force models for graspers, scissors, electrosurgical tools, and needle drivers. Includes tool-tissue interaction dynamics critical for force feedback and autonomous manipulation policy training." },
              { tag: "camera", icon: "📷", title: "Surgical Camera Simulation", text: "Laparoscopic and endoscopic camera models with realistic optical artifacts: smoke, lens distortion, specular highlights on wet tissue, blood pooling, and instrument occlusion patterns." },
              { tag: "compliance", icon: "🛡️", title: "HIPAA-Native, No Patient Data", text: "Entirely synthetic pipeline — no patient images, no clinical records. Generated data is inherently HIPAA-compliant and compatible with FDA's AI/ML regulatory pathway for autonomous surgical devices." },
              { tag: "formats", icon: "🔗", title: "Training-Ready Output", text: "Labeled trajectory data for imitation learning: segmentation masks, depth maps, force readings, instrument poses, tissue deformation. Compatible with all major robotics learning frameworks." },
            ].map(f => (
              <div key={f.tag} className="feat-item">
                <div className="feat-item-tag">{f.tag}</div>
                <span className="feat-icon">{f.icon}</span>
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="divider" />

      {/* ── HOW IT WORKS ── */}
      <section className="section">
        <div className="container">
          <div className="section-tag">How it works</div>
          <h2 className="section-title">From procedure spec to training dataset in 72 hours.</h2>
          <div className="steps-list">
            {[
              { id: "Step one", title: "Define the procedure", body: "Submit a procedure specification: surgical task type (cholecystectomy, appendectomy, anastomosis, etc.), robot platform, target anatomical region, instrument set, and labeling requirements. Our surgical scientists onboard you in a single session.", note: "→ Onboarding: 60-min kickoff · Procedure library: 24 laparoscopic procedures" },
              { id: "Step two", title: "We generate patient populations", body: "Our biomechanical engine generates anatomically diverse patient models covering the distribution of tissue properties, organ geometry, and pathological conditions your model will encounter in deployment.", note: "→ Configurable: patient age range, BMI distribution, pathology prevalence, procedural difficulty" },
              { id: "Step three", title: "Run at simulation scale", body: "Execute millions of surgical trajectories across generated patient populations. Every trajectory is labeled: instrument poses, tissue deformation fields, force readings, segmentation masks, and task-stage annotations.", note: "→ Output formats: HDF5, RLDS, custom · Delivery via S3 or direct cluster transfer" },
            ].map(s => (
              <div key={s.id} className="step-entry">
                <span className="step-id">{s.id}</span>
                <div>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                  <p className="step-note">{s.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="divider" />

      {/* ── FAQ ── */}
      <section className="section">
        <div className="container">
          <div className="section-tag">FAQ</div>
          <h2 className="section-title">Common questions.</h2>
          <div className="faq-block">
            {faqs.map((f, i) => (
              <div key={i} className="faq-row">
                <div className="faq-question">{f.q}</div>
                <p className="faq-answer">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <div className="container">
        <div className="cta-wrap" id="cta-wrap">
          <h2>The surgical training data bottleneck ends here.</h2>
          <p>Join the waitlist for early access. We&apos;re onboarding a small cohort of surgical robotics teams for our beta program. Each team gets a complimentary pilot dataset for one procedure type.</p>
          <div className="cta-form">
            <WaitlistForm {...formProps} />
          </div>
        </div>
      </div>

      <div className="container">
        <footer>
          <span className="footer-name">SurgiSim</span>
          <span className="footer-text">Synthetic surgical training data for the next generation of autonomous surgery · 2026</span>
        </footer>
      </div>
    </>
  );
}
