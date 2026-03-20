# Market Research: Robot Dexterity Startup Landscape
*Competitive intelligence report — who's funded, who's YC, who's dead*
*March 2026*

---

## Executive Summary

Robot dexterity is one of the hottest corners of the AI/robotics wave. Over $5B has flowed into the space in 2024-2025 alone. But the funding is not evenly distributed: the majority is concentrated in **foundation model plays** (Physical Intelligence, Skild AI) and **humanoid integrators** (Figure AI, Apptronik), not in pure dexterous hand hardware companies. The clearest gap is **task-specific dexterity tooling** — the infrastructure layer between "we have a robot arm" and "the robot can actually do this task reliably." YC's W2026 batch shows the ecosystem catching on: multiple companies are directly targeting data, simulation, and hardware for dexterous manipulation.

---

## The Landscape in Three Layers

The "robot dexterity" space is really three overlapping markets:

| Layer | What They Build | Who | Money Raised |
|---|---|---|---|
| **Foundation Models** | Brain for any robot — learns manipulation policies | Physical Intelligence, Skild AI | $2.5B+ |
| **Dexterous Hardware** | The hand itself — high-DOF, tactile sensors | Shadow Robot, Linkerbot, Mimic, Origami, Proception | $5M–$150M |
| **Data & Tooling** | Training data, sim environments, deployment infra | Human Archive, One Robot, Sensei, DexForge | $0–$20M |

The foundation model layer is effectively closed to new entrants (pi and Skild have locked up $5B+ in capital and the top robotics researchers in the world). The hardware layer has active investment. The tooling/data layer is still early and fragmented.

---

## YC Companies — Robot Dexterity Focus

### Origami Robotics (W2026) ⭐
**What they do:** High-DOF robotic hand with co-designed data-collection glove — the glove matches the hand exactly, eliminating the "embodiment gap" that plagues most teleoperation-based data collection. Founded by Daniel (CMU Robotics Institute) and Ryan.
**Traction:** Already sold hands to Physical AI Labs including Amazon.
**Insight:** The smartest hardware play in the YC batch. They figured out that the data problem and hardware problem are the same problem — building the collection device and deployment device as one system is genuinely differentiated.

### Proception Inc (W2025) ⭐
**What they do:** Advanced humanoid dexterous hand — ProHand — capable of tasks like threading needles. Proprioceptive sensing + AI-guided fine motor control.
**Founding:** 2024, Jay Li + Jack Xu, Palo Alto.
**Funding:** $500K YC
**Team:** ~10 people
**Approach:** Collects data via human interaction (not robot teleoperation).

### Human Archive (W2026)
**What they do:** Collects and labels aligned multimodal real-world data for robotics foundation models. Thesis: to build dexterous robots that generalize, you need massive real-world data across modalities and environments.

### Asimov (W2026)
**What they do:** Collects real-world human movement data across diverse environments to train humanoid robots.

### One Robot (W2026)
**What they do:** Task-specific simulation environments for hard manipulation tasks (textiles, box folding). Uses world model-based simulation to reduce dependence on real-world data collection.

### Remy AI (W2026)
**What they do:** Flexible warehouse automation robots with proprietary learning models for dexterous tasks.

### Sensei (S2024)
**What they do:** Hardware and software platform for scalable robot training data collection.

### Mbodi AI (P2025)
**What they do:** Natural language skill training for industrial robots — describe a task in English, robot learns to do it.

### Pivot Robotics (W2024)
**What they do:** AI software for robotic arms automating dangerous manufacturing tasks.

### K-Scale Labs (W2024)
**What they do:** Open-source humanoid robot design for autonomous task completion.

---

## Well-Funded US Non-YC Players

### Physical Intelligence — pi (2024) ⭐⭐⭐
**URL:** pi.website
**Total raised:** $1.1B ($70M seed Mar 2024, $400M Series A Nov 2024, $600M Series B Nov 2025)
**Valuation:** $5.6B
**Investors:** Jeff Bezos, Thrive, Lux, CapitalG, Sequoia, NVIDIA, T. Rowe Price
**Founders:** Karol Hausman (Google DeepMind), Sergey Levine (UC Berkeley), Chelsea Finn (Stanford)
**What they do:** Foundation model (pi0) for dexterous manipulation. Trained on 10,000+ hours of real robot data across 7 robot embodiments and 68 tasks. Uses flow matching to generate smooth action trajectories.
**Threat level to new entrants:** EXTREMELY HIGH for foundation model plays. Not a threat if building hardware or tooling.

### Skild AI (2023) ⭐⭐⭐
**URL:** skild.ai
**Total raised:** $1.7B+ ($300M Series A Jul 2024, $1.4B Jan 2026)
**Valuation:** $14B+
**Investors:** Lightspeed, Coatue, SoftBank, Jeff Bezos, Sequoia, Carnegie Mellon, Amazon Industrial Innovation Fund
**What they do:** "Omni-bodied" robot brain — model-agnostic foundation model controlling any robot (quadrupeds, humanoids, tabletop arms, mobile manipulators) without prior knowledge of body form.
**Revenue:** ~$30M in 2025 — early but real commercial traction.

### Dexterity Inc. (2017) ⭐⭐
**URL:** dexterity.ai
**Total raised:** ~$200M+, latest $95M Mar 2025
**Valuation:** $1.65B
**Investors:** Lightspeed Venture Partners, Sumitomo Corp
**What they do:** AI-powered warehouse robots. DexR loads/unloads trailers; Mech is dual-arm mobile robot (132lb lift). Customers: FedEx, UPS, GXO, Sumitomo (1,500 robots to Japan by 2026).
**Weakness:** Focused on structured warehouse tasks — not general dexterity.

### Mind Robotics (2025, Rivian spinout) ⭐⭐
**Total raised:** $500M Series A (Mar 2026)
**Investors:** Accel, Andreessen Horowitz
**What they do:** Industrial AI-powered robots trained on Rivian EV factory data. Dexterous manipulation for automotive manufacturing.
**Insight:** Proprietary factory data from Rivian as training advantage. a16z + Accel backing.

### Figure AI (2022)
**URL:** figure.ai
**Total raised:** $745M+
**Valuation:** $39B (Sep 2025)
**Investors:** NVIDIA, OpenAI, Microsoft, Intel Capital
**What they do:** Humanoid robot (Figure 02) with dexterous hands. Partnered with BMW for factory deployment.

### Apptronik (2016, UT Austin spinout)
**URL:** apptronik.com
**Total raised:** $403M Series A
**Investors:** Google, Mercedes-Benz, Japan Post Capital, ARK Invest, Korea Investment Partners
**What they do:** Apollo humanoid robot for logistics/manufacturing. Partnered with PSYONIC's Ability Hand.

### Shadow Robot (UK, 1987)
**URL:** shadowrobot.com
**Funding:** £11M from ARIA (UK gov, 2025)
**What they do:** DEX-EE dexterous hand (co-developed with Google DeepMind, debuted ICRA May 2024). Original research-grade dexterous hand — classic Shadow Hand used in 150-200 labs.
**Reality check:** ~20 units of DEX-EE made, 20 employees. Research institution more than product company.

### Mimic Robotics (2024, ETH Zurich spinout) ⭐⭐
**URL:** mimicrobotics.com
**Total raised:** $20M+ ($16M seed Nov 2025)
**Investors:** Elaia, Speedinvest, Sequoia Scout, Founderful
**Founders:** Stefan Weirich (CEO), Stephan-Daniel Gravert (CPO), Elvis Nava (CTO)
**Team:** 25 people
**What they do:** Dexterous AI hands + conventional industrial robot arms. Foundation physical AI models trained on human demo data via proprietary worn data-capture gloves on factory floors.
**Traction:** Piloting with Fortune 500 and global automotive brands.
**Insight:** Closest competitor to "dexterity as a service." ETH pedigree + enterprise pilots.

---

## Chinese Players (Significant, Often Overlooked)

### Linkerbot ⭐⭐
**Total raised:** $150M (latest round, Ant Group + CICC Guanbo)
**Claims:** 80% global market share in high-freedom dexterous hands, 1,000+ units/month.
**Insight:** If the 80% share claim is accurate, most US research labs are already running Linkerbot hands. Volume player.

### Galbot
**Total raised:** $800M total
**Valuation:** $3B
**What they do:** Mobile manipulator humanoid + dexterous hand manipulation. Focus on multi-task generalization.

### Robot Era
**Total raised:** $42M (Alibaba, Crystal Stream, Vision Plus Capital)
**What they do:** Five-fingered dexterous hand with tactile sensors and temperature detection.

### MagicLab
**Total raised:** ~$20M (150M yuan angel, Zhuichuang Ventures)
**What they do:** MagicHand S01 — dexterous hand for humanoid robot ecosystem.

---

## Smaller Hardware Players

| Company | Founded | Raised | Focus |
|---|---|---|---|
| PSYONIC | 2015 | <$5M | Ability Hand — prosthetic/research, integrated with Apptronik Apollo |
| Tesollo | 2019 | $4.2M | 20-joint hand, Korean market, Samsung Ventures + Posco |
| DexRobot | 2021 | Undisclosed | Five-finger hand, 1kg lift |
| Prensilia | 2009 | $1.35M | Dual-use prosthetic + industrial (oldest, smallest) |
| Inkbit | 2017 | $63.8M | 3D printing for soft robotic hand manufacturing |

---

## Graveyard

### Dextrous Robotics (2019–Dec 2023) DEAD
**What happened:** Chopstick-style trailer unloading robot, dissolved after failing to close Series B for production scale.
**Why:** Crowded field (Boston Dynamics, Dexterity, Pickle Robot, Rightbot, Mujin all attacking same problem). Couldn't differentiate enough for enterprise deals.
**Lesson:** Warehouse unloading is not a wedge — it's a war zone. Need strong differentiation or die.

### Rethink Robotics (2008–2018, restarted, dead again)
**What happened:** Baxter/Sawyer collaborative robots for factory dexterity. Shut 2018, IP sold to HAHN Group, restarted in Germany, shut again.
**Lesson:** Collaborative robots took longer than expected. Burn rate killed the company before the market arrived.

### Bossa Nova Robotics (retail shelf scanning)
**What happened:** Walmart cancelled contract 2020 — cheaper to use humans for inventory.
**Lesson:** Even when technology works, ROI calculus can flip. Stress-test the economics.

---

## VC Thesis Map (2025)

| Investor | Bet | Portfolio |
|---|---|---|
| Lux Capital, Sequoia, SoftBank | Foundation model — universal robot brain | Physical Intelligence, Skild AI |
| NVIDIA, GV, a16z, Accel | Humanoid form factor wins | Figure AI, Apptronik, Mind Robotics |
| Elaia, Speedinvest, Sequoia Scout | Dexterous hardware problem unsolved | Mimic Robotics |
| Lightspeed, Sumitomo | Industrial verticals with clear ROI | Dexterity Inc. |
| Amazon Industrial Innovation Fund, YC | Data is the bottleneck | Sensei, Human Archive, Asimov |

---

## Key Patterns

1. **Foundation model layer is closed.** PI and Skild have $2.5B+ and the top 20 researchers. Don't compete here.

2. **Linkerbot dominates volume hardware; Shadow dominates research quality.** Gap in the middle: production-grade, AI-trainable hands at $2-5K for industrial deployment.

3. **YC W2026 is basically an embodied AI infrastructure batch** — five companies attacking different pieces of the manipulation data/hardware/software stack in the same cohort.

4. **Data collection is the real constraint.** Every manipulation AI company eventually hits the wall. Companies that solve collection elegantly (Origami's co-designed glove, Mimic's worn capture device) will have durable moats.

5. **Industrial verticals beat general dexterity as GTM.** Dexterity Inc → warehouse; Mind Robotics → automotive; Mimic → Fortune 500 manufacturing. Companies chasing "general manipulation" without a vertical focus burn cash faster.

---

## White Space

| Gap | Why It Exists | Risk |
|---|---|---|
| Task-specific manipulation data as a service | Data collection too expensive in-house | pi/Skild may build this as a feature |
| Mid-tier dexterous hand ($2-5K, AI-trainable) | Linkerbot cheap but not AI-optimized; Shadow is research-grade | Linkerbot could move up-market |
| Sim-to-real validation tooling | No standard benchmark for synthetic data transfer | Open-source could commoditize |
| Surgical/medical dexterity | FDA pathway scares off general robotics investors | Long regulatory timeline but defensible |
| Manipulation quality testing / CI | No unit tests equivalent for robot manipulation policies | Low hardware capex SaaS opportunity |

