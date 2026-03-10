import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import '../styles/transfercheck.css'

export const Route = createFileRoute('/transfercheck')({
  component: TransferCheckPage,
})

const scoreData = [
  { label: 'Cloth folding',    val: 0.87, pct: 87, variant: '' },
  { label: 'Precision insert', val: 0.81, pct: 81, variant: '' },
  { label: 'Fruit grasping',   val: 0.74, pct: 74, variant: 'warn' },
  { label: 'Bin picking',      val: 0.41, pct: 41, variant: 'fail' },
]

const faqs = [
  { q: "What's an S2R-Score and how do you calculate it?", a: "The Sim-to-Real Transfer Score (S2R-Score) measures the Pearson correlation between per-episode training performance in simulation and real-world task success rate on a standardized test set. We've built this benchmark by running >4,000 paired sim+real evaluations across 40 manipulation task types on 6 robot platforms." },
  { q: 'Does TransferCheck work with any simulator?', a: 'Yes. We support NVIDIA Isaac Sim, Genesis, MuJoCo, PyBullet, and custom environments via our Python SDK and dataset format spec. As long as your data is in HDF5, RLDS, or LEROBOT format, we can evaluate it.' },
  { q: 'Do I need to ship you real robot hardware?', a: 'No. Our real-robot evaluation runs on our hardware fleet (Franka Panda, Unitree H1, custom grippers). You submit a task spec and your synthetic dataset; we run the real-robot evaluation and return your S2R-Score within 48–72 hours.' },
  { q: 'How is this different from just training and testing my model?', a: "Training and testing catches model quality, not data quality. A low S2R-Score indicates your synthetic data has distribution shift — lighting, contact dynamics, object geometry — that will cause your model to fail in deployment even if validation accuracy looks good." },
]

function Form({ submitted, loading, email, setEmail, error, count, onSubmit }: {
  submitted: boolean; loading: boolean; email: string; setEmail: (v: string) => void
  error: string; count: number; onSubmit: (e: React.FormEvent) => void
}) {
  if (submitted) {
    return (
      <div className="success-panel">
        <span className="success-check">✓</span>
        <div className="success-msg">
          <strong>Access request received.</strong>
          <span>#{count} in queue · We&apos;ll follow up within 48h</span>
        </div>
      </div>
    )
  }
  return (
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <input type="email" className="tc-email-input" placeholder="ml-lead@yourrobotics.ai" value={email} onChange={e => setEmail(e.target.value)} disabled={loading} aria-label="Work email" />
        <button type="submit" className="tc-submit" disabled={loading}>{loading ? '···' : 'Request Access'}</button>
      </div>
      {error && <p style={{ color: '#ff4444', fontSize: '0.72rem', marginTop: '8px', fontFamily: 'IBM Plex Mono, monospace' }}>{error}</p>}
      <p className="form-micro">// {count} teams on waitlist · No spam · No credit card</p>
    </form>
  )
}

function TransferCheckPage() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [count] = useState(183)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError('Valid email required.'); return }
    setError(''); setLoading(true)
    await new Promise(r => setTimeout(r, 800))
    setSubmitted(true); setLoading(false)
  }

  const formProps = { submitted, loading, email, setEmail, error, count, onSubmit: handleSubmit }

  return (
    <div className="tc-page">
      <nav>
        <div className="container">
          <div className="nav-inner">
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <Link to="/" style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.7rem', color: '#3a5a7a', textDecoration: 'none', letterSpacing: '0.08em' }}>← Hub</Link>
              <span className="logo">Transfer<span className="logo-accent">Check</span></span>
            </div>
            <div className="status-badge"><span className="status-dot" />Early Access Open</div>
          </div>
        </div>
      </nav>

      <section className="hero">
        <div className="container">
          <div className="hero-journal-tag">Journal of Robotics ML Infrastructure · Vol. 1, 2026 · Early Access</div>
          <h1>Know if your synthetic data<br />will <span className="accent">actually work</span> on<br />real hardware.</h1>
          <p className="hero-abstract">TransferCheck is the CI/CD pipeline for robotics training data quality. Submit your synthetic dataset, get a validated Sim-to-Real Score before you burn a single hour of robot time.</p>
          <div className="hero-cta-row">
            <button className="btn-primary" onClick={() => document.getElementById('cta-section')?.scrollIntoView({ behavior: 'smooth' })}>Request Early Access</button>
            <button className="btn-secondary">View sample report →</button>
          </div>
          <div className="metrics-panel">
            {[
              { label: 'Avg S2R-Score', val: '0.82', unit: 'across 40 task types' },
              { label: 'Robot platforms', val: '6', unit: 'Franka, Unitree, custom...' },
              { label: 'Turnaround', val: '48h', unit: 'from submission to report' },
              { label: 'Robot hours saved', val: '$40K+', unit: 'per evaluation cycle' },
            ].map(m => (
              <div key={m.label} className="metric-cell">
                <div className="metric-label">{m.label}</div>
                <div className="metric-val">{m.val}</div>
                <div className="metric-unit">{m.unit}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="section-divider" />

      <section className="section">
        <div className="container">
          <div className="section-eyebrow">// the problem</div>
          <h2 className="section-title">You don&apos;t know your synthetic data is broken until the robot fails.</h2>
          <p className="section-body">Robotics teams generate synthetic training data, train their models, watch validation accuracy climb — then deploy and discover the policy barely works. The dataset looked fine. The model looked fine. The sim-to-real gap was invisible until it was expensive.</p>
          <div className="problem-row">
            {[
              { id: 'ERR_01', title: 'Silent distribution shift', text: "Your simulation's lighting, friction, and geometry are subtly wrong. Models overfit to these artifacts and fail to generalize. Standard metrics (loss, accuracy) don't capture this." },
              { id: 'ERR_02', title: 'No feedback loop before deployment', text: 'The only way to know if your synthetic data transfers is to run real-robot experiments. Each evaluation costs $5K–$50K in engineering time, compute, and hardware wear.' },
              { id: 'ERR_03', title: 'Domain randomization guesswork', text: "Teams randomize everything hoping it helps. But randomizing the wrong parameters actually hurts performance. Without transfer scores, you're flying blind." },
              { id: 'ERR_04', title: "NVIDIA/Genesis don't validate for you", text: "Isaac Sim and Genesis generate data, they don't tell you whether it will transfer. Validation is entirely your problem." },
            ].map(c => (
              <div key={c.id} className="problem-cell">
                <div className="problem-cell-id">// {c.id}</div>
                <h3>{c.title}</h3><p>{c.text}</p>
              </div>
            ))}
          </div>
          <div className="score-demo">
            <div className="score-demo-header">
              <span className="score-demo-title">Figure 1. S2R-Score Report</span>
              <span className="score-demo-subtitle">dataset_v3.hdf5 · 4 task types evaluated</span>
            </div>
            <div className="score-demo-body">
              <div className="score-bars">
                {scoreData.map(s => (
                  <div key={s.label} className="score-bar-row">
                    <span className="score-bar-label">{s.label}</span>
                    <div className="score-bar-track"><div className={`score-bar-fill ${s.variant}`} style={{ width: `${s.pct}%` }} /></div>
                    <span className="score-bar-val">{s.val}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="score-fig-caption"><strong>Fig. 1</strong> — Sample S2R-Score output for a manipulation dataset. Scores below 0.6 indicate significant distribution shift requiring dataset correction before deployment.</div>
          </div>
        </div>
      </section>

      <hr className="section-divider" />

      <section className="section">
        <div className="container">
          <div className="section-eyebrow">// solution</div>
          <h2 className="section-title">CI/CD for your training data pipeline.</h2>
          <p className="section-body">TransferCheck runs your synthetic dataset through a standardized benchmark suite — paired simulation + real robot — and returns an S2R-Score that tells you exactly where your data fails and why.</p>
          <div className="features-grid">
            {[
              { num: 'F01', title: 'S2R-Score Benchmark', text: 'A rigorous, reproducible metric for sim-to-real transfer quality. Built on 4,000+ paired sim/real evaluations across 40 task types. Correlates at r=0.89 with real-world task success rate.' },
              { num: 'F02', title: 'Failure Mode Analysis', text: 'Not just a score — a root cause report. We identify whether failure comes from visual domain shift, physics artifacts, contact modeling errors, or sensor noise mismatch.' },
              { num: 'F03', title: 'Domain Randomization Advisor', text: "Based on your failure modes, we recommend specific domain randomization parameters to fix your dataset's distribution shift — without randomizing things that don't matter." },
              { num: 'F04', title: 'Simulator-Agnostic SDK', text: 'Works with Isaac Sim, Genesis, MuJoCo, PyBullet, and custom environments. Submit data in HDF5, RLDS, or LEROBOT format. No vendor lock-in.' },
              { num: 'F05', title: 'Real-Robot Evaluation Fleet', text: 'We run evals on our hardware fleet (Franka, Unitree H1, custom grippers). No hardware required from your team. Results in 48–72 hours.' },
              { num: 'F06', title: 'Git Integration', text: 'Webhook triggers on dataset commits. Automated score tracking over time. See if your dataset quality is improving or regressing with each iteration.' },
            ].map(f => (
              <div key={f.num} className="feature-cell">
                <div className="feature-num">// {f.num}</div>
                <h3>{f.title}</h3><p>{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="section-divider" />

      <section className="section">
        <div className="container">
          <div className="section-eyebrow">// workflow</div>
          <h2 className="section-title">Three steps from dataset to S2R-Score.</h2>
          <div className="steps-track">
            {[
              { id: 'STEP 01', title: 'Submit your dataset', body: 'Upload via our Python SDK or web dashboard. Specify robot platform, task description, and success criteria. No configuration overhead.', output: '→ Output: dataset receipt + task spec confirmation' },
              { id: 'STEP 02', title: 'We run paired evaluation', body: 'TransferCheck runs your dataset through simulation benchmarks and executes the same tasks on our real robot hardware fleet. We correlate sim performance with real success rates across 50+ test scenarios.', output: '→ Duration: 48-72 hours · Turnaround SLA available' },
              { id: 'STEP 03', title: 'Receive your S2R report', body: 'Overall S2R-Score, per-task breakdown, failure mode analysis (visual shift vs. physics vs. contact), domain randomization recommendations, and comparison against baseline datasets.', output: '→ Output: PDF report + JSON metrics + SDK integration' },
            ].map(s => (
              <div key={s.id} className="step-item">
                <span className="step-id">{s.id}</span>
                <div><h3>{s.title}</h3><p>{s.body}</p><p className="step-output">{s.output}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="section-divider" />

      <section className="section">
        <div className="container">
          <div className="section-eyebrow">// faq</div>
          <h2 className="section-title">Common questions.</h2>
          <div className="faq-section">
            {faqs.map((f, i) => (
              <div key={i} className="faq-entry">
                <div className="faq-q">{f.q}</div>
                <p className="faq-a">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="container">
        <div className="cta-section" id="cta-section">
          <h2>Stop flying blind on your training data quality.</h2>
          <p>Join the waitlist. Early access includes two free evaluations and a 30-minute dataset review with our robotics team.</p>
          <div className="cta-form-wrap"><Form {...formProps} /></div>
        </div>
      </div>

      <div className="container">
        <footer>
          <span className="footer-brand">TransferCheck</span>
          <span className="footer-note">// The S2R benchmark for robotics training data · 2026</span>
        </footer>
      </div>
    </div>
  )
}
