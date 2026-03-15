# GTM & Validation Plan: Imagine Labs

*Date: March 15, 2026*
*Thesis: World model-based synthetic data for manipulation robotics teams.*
*Mode: Fast-pace validation — weeks, not months.*

---

## Strategy Overview

The core GTM insight from this research: **Asimov signed $86M in binding contracts from robotics labs before they had a product at scale.** That's the playbook. Don't market — prospect. Don't build a brand — lock in a design partner. Every action in the next 60 days should be oriented toward a single outcome: a signed pilot agreement (paid or letter of intent) with a named humanoid robotics company.

The customer is: ML Research Lead or Director of Robotics at a Series B+ manipulation-focused startup. They are technical, data-driven, and deeply skeptical. They've been burned by sim-to-real failures. They need benchmarks, not marketing copy. Reach them with results, not messages.

**Core message**: "We built a world model fine-tuning pipeline on top of DreamGen/Cosmos. We can generate training-ready dexterous manipulation data for your robot and your task in 2 weeks — and we'll show you the sim-to-real transfer metrics before you pay."

---

## The Validation Sprint (Days 1–60)

This is not a marketing plan. This is a validation plan designed to answer one question in 60 days: **Will robotics labs pay Imagine Labs to generate synthetic training data for them?**

### Week 1–2: The "Free Pilot" Outreach

**Goal**: 5 warm conversations with ML leads at humanoid companies; 1 agrees to a free pilot.

**Who to target** (prioritized):
1. Apptronik — $935M Series A, building Apollo for manufacturing, explicit data needs
2. 1X Technologies — 10,000-unit deployment agreement, needs edge-case data at scale
3. Agility Robotics (Amazon partnership) — production deployment, diverse environment data needs
4. Unitree Robotics — aggressive on capability development, price-sensitive
5. Fourier Robotics (GR1 humanoid) — specifically validated in DreamGen paper — tell them

**The outreach message** (direct LinkedIn DM or email):

> "Hey [name] — we're building a world model-based synthetic data pipeline specifically for dexterous manipulation. We ran DreamGen-style fine-tuning on [task] and got X% improvement in sim-to-real transfer vs. Isaac Sim baseline. Would love to offer you a free 2-week pilot — you name the task, we generate the dataset and show you the transfer metrics before you commit to anything. No strings. Interested?"

This works because:
- It leads with a result, not a pitch
- It removes all friction (free, 2-week, their task)
- ML engineers respond to benchmarks, not marketing

**How to find them**:
- LinkedIn (search: "robotics ML" OR "robot learning" at [target company])
- Twitter/X: they post about papers and training runs; reply to their tweets
- arXiv author profiles: if they've published on manipulation, they care about data
- CVPR 2026 Embodied AI Workshop (Denver) — attendee list when available

**Target**: 5 conversations → 1 free pilot agreement in 14 days.

---

### Week 3–4: Run the Pilot

- **Task**: Run DreamGen-style world model fine-tuning on the agreed task
- **Deliverable to customer**: (1) synthetic dataset, (2) sim-to-real transfer metrics on their eval protocol
- **Internal deliverable**: Know whether your pipeline works and at what quality

**Concurrently — publish your benchmark**:
- Write a 500-word "Show HN" style post: "We tested world model-generated synthetic data against Isaac Sim baseline on [task]. Here's what we found." Post to Hacker News, arXiv (as a technical note), and Twitter/X.
- Tag the DreamGen paper authors (NVIDIA GEAR Lab) — they'll retweet if your results are interesting
- This drives inbound from other robotics teams who see the results

---

### Week 5–6: Close the Pilot → LOI

**Goal**: At least 1 signed pilot agreement or LOI by day 42.

**Pricing for first paid pilot**: $10K–$50K flat fee for one task (includes dataset + validation report). This is intentionally below market to get your first reference customer. The goal is not revenue — it's a signed name.

If the free pilot customer is happy: ask for the LOI. Frame it as "we're raising a seed round and want to list you as a design partner."

If the free pilot customer declines: use the results to approach the next 5 targets. Now you have a real case study.

**Red flag signal**: If 15 conversations produce zero interest in a free pilot, the GTM motion isn't working. This means either (a) the wrong target companies, (b) the outreach isn't landing, or (c) teams are handling this with internal engineers. Run a quick audit: ask directly "what's stopping you from just doing this with Isaac Sim internally?"

---

### Week 7–8: Seed Raise Narrative

By day 60, you need to be able to say:
- "[Company name] is our design partner"
- "We generated synthetic [task] data that showed [X]% better sim-to-real transfer than Isaac Sim baseline"
- "We have [N] more companies in pilot discussions"
- "Raising $[X] to productize the pipeline and close 5 more design partners in Q2"

---

## Pre-Launch: Community Presence (Runs in parallel, weeks 1–8)

These are lightweight touches to build awareness while the validation sprint runs. Don't let them distract from direct sales.

### Where Your Customers Actually Are

| Community | What to Do | Time/Week |
|---|---|---|
| Twitter/X (robotics ML cluster) | Follow and reply to: @SebastienRacaniere, @leog0827, @hershel_tishby, robotics researchers at PI, Figure, Skild. Reply to their data/sim-to-real tweets with your benchmark results. | 2 hrs |
| Hacker News | Post "Show HN: We tested world model synthetic data against Isaac Sim baseline on [task]" — aim for the front page. Robotics data posts historically do well. | 1 post |
| arXiv/papers | Comment on DreamGen, One Robot, and Asimov papers via OpenReview. The researchers who read these papers are your customers. | 1 hr |
| ICRA 2026 (May, Atlanta) | Submit a workshop paper or demo. Attend. Every robotics ML lead in the world will be there. | Plan now |
| Embodied AI Discord / Hugging Face robotics channel | Post your benchmark results. Answer questions about synthetic data pipelines. | 2 hrs/wk |
| CoRL 2026 | Submit by July deadline. Conference paper on your sim-to-real transfer methodology = credibility + customer conversations. | Long-term |

### Content Strategy (Low Effort, High Signal)

3 pieces of content in 60 days, all technical, all benchmark-driven:
1. **"We ran DreamGen on [task]. Here's what we found."** — benchmarks post. Hacker News + Twitter.
2. **"Why NVIDIA's synthetic data pipeline still fails at X"** — specific gap article. Medium / Substack.
3. **"How we validated sim-to-real transfer for [task] without burning robot time"** — methodology post. Technical blog.

These are not marketing. They are the artifacts that MLresearchers forward to their manager saying "this is why we should talk to Imagine Labs."

---

## Launch Strategy (Day 60+, after design partner confirmed)

### Product Hunt Launch

**When**: After your first paid customer or LOI is signed. Launching before you have a customer is premature.

**How**:
- Name: "Imagine Labs — Synthetic manipulation data that actually transfers"
- Tagline: "Give us 5 robot demos. Get a training-ready dataset in 2 weeks."
- Show the sim-to-real numbers front and center
- Feature the named design partner in the comments (with their permission)
- Hunter: ask someone with PH clout in robotics (Hud Hudson at Hugging Face, or a YC partner)

**Expected result**: #1-3 Product of the Day in AI/Dev Tools; 200–500 signups; 20–30 qualified inbound conversations.

### Hacker News Show HN

**When**: Same day as Product Hunt, or 1 week before.

**Title**: "Show HN: We built a managed synthetic data pipeline for robot manipulation (and measured the sim-to-real gap)"

**What makes this work on HN**: Lead with the technical result, not the business. "We generated 10,000 synthetic trajectories from 5 real demos and tested sim-to-real transfer on a Franka picking task. Here's what we found and why we built this." The HN robotics/ML community is your best inbound funnel — they'll evangelize internally.

### Press/Media Targets

Do NOT pitch general tech press before you have a customer. It wastes time and creates premature expectations. Instead:

- **The Robot Report** — the trade press for robotics professionals; a featured article reaches the exact decision-makers
- **IEEE Spectrum** (robotics section) — engineers trust this; a case study here is worth more than TechCrunch
- **Crunchbase News** — after your seed raise announcement

---

## Post-Launch Growth

### Paid Acquisition

Don't do paid ads. Your buyers don't click ads — they read papers and follow researchers on Twitter. Every marketing dollar should go to conferences, compute for benchmarks, and technical content.

**Exception**: LinkedIn sponsored posts targeting "Director of Robotics" and "ML Research Lead" at funded robotics companies are defensible at $500–1,500/month once you have the right case study to share.

### SEO Strategy

Target: people who Google when they hit a specific problem.

| Target Keyword | Search Intent | Content to Create |
|---|---|---|
| "isaac sim sim-to-real gap" | Someone frustrated with NVIDIA tools | "Why Isaac Sim fails at contact-rich manipulation and what we did about it" |
| "DreamGen tutorial" | Developer trying to use the pipeline | "DreamGen walkthrough for manipulation tasks" |
| "synthetic robot training data" | Buyer exploring options | "How to choose a synthetic data approach for your robotics stack" |
| "GR00T Dreams alternative" | Competitor search | Comparison post |

These are low-volume, high-intent keywords. One good post ranking for "isaac sim sim-to-real" is worth more than 10 broad SEO pieces.

### Referral / Word of Mouth

The robotics ML community is small and tight. A single ML lead at Figure AI or Physical Intelligence mentioning "we used Imagine Labs" to 3 colleagues at ICRA produces warmer inbound than any campaign. Prioritize:
- Making your design partner's team successful (they become your best salespeople)
- Publishing your results publicly (researchers share things that help them think)
- Being helpful in communities before you need anything from them

---

## Budget Scenarios

### $0/month (Sweat equity only)
- Outbound DMs + emails to target companies
- Twitter/X presence and content
- Hacker News post
- Free pilot for 1–2 customers
- Submit to ICRA / CoRL workshop

**Expected**: 1 design partner conversation, enough for a seed pitch

### $2,000/month
- Above, plus:
  - Compute credits for running pilot datasets faster (AWS/GCP for GPU inference)
  - LinkedIn InMail credits ($200–400/month) to reach ML leads at non-networked companies
  - $500/month LinkedIn sponsored posts (technical case study content)

**Expected**: 2–3 pilot conversations per month, 1 LOI within 60 days

### $10,000+/month (post-seed)
- ICRA 2026 sponsorship/booth (May, Atlanta) — $5,000–$15,000, direct access to every robotics ML lead
- Conference paper submission support (compute, research time)
- Technical content writer to accelerate benchmark post output
- LinkedIn ads at scale targeting robotics ML directors

---

## Metrics to Track

### Validation Phase (Day 1–60)

| Metric | Target | Red Flag |
|---|---|---|
| Outreach messages sent | 50+ | <20 |
| Response rate | >20% | <5% |
| Pilot conversations | 5+ | <2 |
| Free pilots agreed | 1+ | 0 |
| Paid pilots / LOIs | 1+ | 0 |

### Post-Launch

| Metric | 30-day target | 90-day target |
|---|---|---|
| Design partner contracts | 1 signed | 3 signed |
| Inbound pilot requests | 5 | 20 |
| ARR | $50K | $200K |
| Pipeline (qualified) | $300K | $1M |

---

## 90-Day Action Plan

### Days 1–7
- [ ] Finalize the benchmark task you'll use for pilots (pick one: cloth manipulation, box folding, or dexterous grasping with Franka)
- [ ] Run DreamGen pipeline on that task internally, measure sim-to-real against Isaac Sim baseline
- [ ] Write the 5 target company names on a whiteboard — these are your only focus
- [ ] Send first 10 outreach messages (LinkedIn + email)

### Days 8–14
- [ ] Follow up on outreach; adjust message if response rate <10%
- [ ] Identify and connect with ML leads at all 5 target companies
- [ ] First pilot conversation → schedule demo call
- [ ] Set up basic web presence (don't overthink this — a simple landing page with email capture and your benchmark results is enough)

### Days 15–28
- [ ] Run free pilot for first willing customer
- [ ] Deliver dataset + sim-to-real metrics within 2 weeks
- [ ] Continue outreach (10 new contacts/week)
- [ ] Write "Show HN" benchmark post (draft, don't publish yet — wait for pilot results)

### Days 29–42
- [ ] Customer pilot debrief: what worked, what didn't, did the data transfer?
- [ ] Ask for LOI or paid pilot agreement
- [ ] Publish the benchmark post (Hacker News + Twitter/X)
- [ ] Start getting invited to conversations based on inbound from post

### Days 43–56
- [ ] 2nd and 3rd pilot conversations → LOIs
- [ ] Begin drafting seed raise narrative (you need: 1 named partner, results, market data)
- [ ] ICRA 2026 planning (May, Atlanta) — confirm attendance, book flights/hotel
- [ ] Identify 3 seed investors to target (Lux Capital, Khosla, a16z bio/robotics partners)

### Days 57–90
- [ ] Close first paid pilot ($10K–$50K)
- [ ] Seed raise conversations begin
- [ ] Product Hunt launch (coordinate with HN post)
- [ ] ICRA 2026 (May) — be present, run customer conversations on the floor

---

## The One Thing

If you do nothing else in this plan, do this:

**In the next 7 days, send 10 direct messages to ML leads at humanoid robotics companies offering a free 2-week pilot with benchmark results.** That's it. Everything else in this document is secondary. The signal you get from those 10 messages — who responds, what they say, what they're worried about — is worth more than 3 months of brand building.

Asimov didn't build awareness first. They signed contracts. Do that.

---

*Sources used in this strategy: Crunchbase (Asimov contracts, robotics funding), YC company listings (One Robot, Asimov, Sensei), CVPR 2026 Embodied AI Workshop, ICRA 2026, The Robot Report, IEEE Spectrum, Hacker News robotics ML discussions, Pebblous Physical AI blog, Labellerr blog, DreamGen paper (NVIDIA GEAR Lab)*
