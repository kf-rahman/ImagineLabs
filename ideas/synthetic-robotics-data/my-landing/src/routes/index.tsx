import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Hub,
})

const ideas = [
  {
    path: '/dexforge' as const,
    name: 'DexForge',
    score: '7–8',
    tag: 'Manipulation Data',
    tagline: 'Contact-rich synthetic training data for dexterous robot hands.',
    accent: '#ff6b2b',
    desc: "NVIDIA Isaac Sim isn't built for multi-fingered grippers. DexForge fills the gap for deformable objects, dexterous grasps, and assembly tasks.",
    bullets: ['FEM deformable object physics', 'Pre-validated hand configs (LEAP, Shadow, Allegro)', 'Sim-to-Real Score on every dataset'],
  },
  {
    path: '/transfercheck' as const,
    name: 'TransferCheck',
    score: '7',
    tag: 'Validation Platform',
    tagline: 'CI/CD for robotics training data quality.',
    accent: '#00d4ff',
    desc: 'Know whether your synthetic dataset will actually transfer to real hardware — before burning $40K in robot time. Tool-agnostic, works with any simulator.',
    bullets: ['S2R-Score benchmark (r=0.89 with real success)', 'Root cause failure analysis', 'Git webhook integration'],
  },
  {
    path: '/surgisim' as const,
    name: 'SurgiSim',
    score: '8',
    tag: 'Surgical Robotics',
    tagline: 'Train surgical robots without touching a single patient.',
    accent: '#00a896',
    desc: 'Surgical training data is structurally impossible to collect at scale. SurgiSim generates biomechanically accurate synthetic data — tissue, anatomy, instruments.',
    bullets: ['Viscoelastic tissue + organ deformation models', '100K+ procedurally generated patient anatomies', 'Inherently HIPAA-compliant pipeline'],
  },
]

function Hub() {
  return (
    <div style={s.page}>
      <div style={s.header}>
        <div style={s.headerInner}>
          <span style={s.headerLogo}>Idea Hub</span>
          <span style={s.headerSub}>Synthetic Robotics Data · Market Research 2026</span>
        </div>
      </div>

      <main style={s.main}>
        <div style={s.intro}>
          <div style={s.introScore}>Original idea: 5/10 · Generic platform → pass</div>
          <h1 style={s.introTitle}>3 pivot ideas worth building.</h1>
          <p style={s.introBody}>
            A generic synthetic robotics data platform has no moat — NVIDIA gives Isaac Sim away for free, and Datagen raised $70M and still shut down. These three niches are where incumbents are weakest and customers are desperate.
          </p>
        </div>

        <div style={s.grid}>
          {ideas.map((idea) => (
            <Link key={idea.path} to={idea.path} style={{ textDecoration: 'none' }}>
              <div
                style={s.card}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = idea.accent + '55'
                  ;(e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.07)'
                  ;(e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'
                }}
              >
                <div style={s.cardTop}>
                  <span style={{ ...s.cardTag, color: idea.accent, borderColor: idea.accent + '44' }}>
                    {idea.tag}
                  </span>
                  <span style={{ ...s.scoreChip, background: idea.accent + '22', color: idea.accent }}>
                    {idea.score}/10
                  </span>
                </div>
                <h2 style={s.cardName}>{idea.name}</h2>
                <p style={s.cardTagline}>{idea.tagline}</p>
                <p style={s.cardDesc}>{idea.desc}</p>
                <ul style={s.bullets}>
                  {idea.bullets.map(b => (
                    <li key={b} style={s.bullet}>
                      <span style={{ color: idea.accent, flexShrink: 0 }}>→</span> {b}
                    </li>
                  ))}
                </ul>
                <div style={{ ...s.cardCta, color: idea.accent }}>
                  View landing page →
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div style={s.footer}>
          <span style={s.footerText}>Generated from market research · ideas/synthetic-robotics-data/market-research.md</span>
        </div>
      </main>
    </div>
  )
}

const s: Record<string, React.CSSProperties> = {
  page: {
    background: '#080c12',
    minHeight: '100vh',
    color: '#c8d6e8',
    fontFamily: "'Inter', 'SF Pro Display', system-ui, sans-serif",
  },
  header: {
    borderBottom: '1px solid rgba(255,255,255,0.06)',
    padding: '20px 0',
    background: 'rgba(8,12,18,0.95)',
    position: 'sticky',
    top: 0,
    backdropFilter: 'blur(12px)',
    zIndex: 10,
  },
  headerInner: {
    maxWidth: '1100px',
    margin: '0 auto',
    padding: '0 32px',
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  headerLogo: { fontSize: '0.95rem', fontWeight: 700, color: '#fff', letterSpacing: '-0.01em' },
  headerSub: { fontSize: '0.75rem', color: '#4a6080', borderLeft: '1px solid rgba(255,255,255,0.1)', paddingLeft: '16px' },
  main: { maxWidth: '1100px', margin: '0 auto', padding: '64px 32px 80px' },
  intro: { marginBottom: '56px' },
  introScore: { fontSize: '0.72rem', fontFamily: 'monospace', color: '#4a6080', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '12px' },
  introTitle: { fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, letterSpacing: '-0.025em', color: '#fff', marginBottom: '14px', lineHeight: 1.1 },
  introBody: { fontSize: '1rem', color: '#4a6080', lineHeight: 1.75, maxWidth: '560px' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' },
  card: {
    background: '#0e1520',
    border: '1px solid rgba(255,255,255,0.07)',
    padding: '32px',
    cursor: 'pointer',
    transition: 'border-color 0.2s, transform 0.2s',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    height: '100%',
    borderRadius: '2px',
  },
  cardTop: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' },
  cardTag: { fontSize: '0.65rem', fontFamily: 'monospace', letterSpacing: '0.14em', textTransform: 'uppercase', border: '1px solid', padding: '3px 10px', fontWeight: 600 },
  scoreChip: { fontSize: '0.72rem', fontFamily: 'monospace', fontWeight: 700, padding: '3px 10px', letterSpacing: '0.05em' },
  cardName: { fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-0.02em', color: '#fff' },
  cardTagline: { fontSize: '0.9rem', color: '#8aa0bc', lineHeight: 1.5, fontStyle: 'italic' },
  cardDesc: { fontSize: '0.85rem', color: '#4a6080', lineHeight: 1.7 },
  bullets: { listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '4px', flexGrow: 1 },
  bullet: { fontSize: '0.82rem', color: '#6a8090', display: 'flex', gap: '8px' },
  cardCta: { fontSize: '0.82rem', fontFamily: 'monospace', fontWeight: 600, letterSpacing: '0.03em', marginTop: '8px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.06)' },
  footer: { marginTop: '64px', paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.05)' },
  footerText: { fontSize: '0.72rem', fontFamily: 'monospace', color: '#2a3a4a' },
}
