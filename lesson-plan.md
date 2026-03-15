# Lesson Plan: Diffusion Models & World Models
**Goal:** Learn deeply enough to teach this as a YouTube series or structured course.
**Timeline:** ~10 weeks (can compress to 6 if moving fast)

---

## How to use this plan

Each module has:
- **Concepts** — what to understand
- **Resources** — what to read/watch
- **Build** — something you implement to validate understanding
- **Teach** — the lecture/video you produce to prove mastery

The rule: you don't move to the next module until you can explain the current one out loud without notes.

---

## Module 1 — Mathematical Foundations
**Duration:** 1 week
**The goal:** Understand the probability and calculus that diffusion is built on. Skip this and everything else is magic you can't reason about.

### Concepts
- Probability distributions, KL divergence, likelihood
- Bayes' theorem and conditional probability
- Gaussian distributions and why they're special
- Markov chains — what they are, why diffusion uses them
- The reparameterization trick (critical — used everywhere)
- What "score" means: ∇ log p(x)

### Resources
- **Book:** *Deep Learning* by Goodfellow, Bengio, Courville — Ch. 3 (Probability) and Ch. 16 (Structured Probabilistic Models) — free online
- **Book:** *Pattern Recognition and Machine Learning* by Bishop — Ch. 1–2 for probability grounding
- **Blog:** Lilian Weng — "From Autoencoder to Beta-VAE" (builds intuition for latent spaces before diffusion)
- **Video:** 3Blue1Brown — Bayes' theorem and probability series

### Build
- [ ] Implement a 1D Gaussian and visualize sampling from it
- [ ] Implement KL divergence between two Gaussians from scratch (no library)
- [ ] Implement a simple Markov chain that converges to a known distribution

### Teach checkpoint
Record a 5-minute explanation: *"What is a score function and why does it matter for generative models?"*

---

## Module 2 — Score-Based Generative Models
**Duration:** 1 week
**The goal:** Understand the theoretical root that diffusion grew from. This is the "why" before the "how."

### Concepts
- What generative models are trying to do: learn p(x) from data
- Why likelihood-based models are hard (intractable normalizing constants)
- Score matching: instead of learning p(x), learn ∇ log p(x)
- Langevin dynamics: how you sample using the score
- Noise-conditioned score networks (NCSN)

### Resources
- **Paper:** *Estimation of Non-Normalized Statistical Models by Score Matching* — Hyvärinen 2005 (the original score matching paper — read for intuition, not implementation)
- **Paper:** *Generative Modeling by Estimating Gradients of the Data Distribution* — Song & Ermon, NeurIPS 2019 ⭐ (foundational — read this carefully)
- **Blog:** Yang Song's own blog post "Generative Modeling by Estimating Gradients of the Data Distribution" — cleaner than the paper
- **Blog:** Lilian Weng — "What are Diffusion Models?" — read the first half

### Build
- [ ] Implement NCSN on a 2D toy dataset (e.g. two moons or swiss roll)
- [ ] Visualize the score field — plot arrows showing the gradient of log p(x)
- [ ] Implement Langevin sampling and watch it converge

### Teach checkpoint
Record: *"What is score matching and why is it a better way to train generative models than maximizing likelihood?"*

---

## Module 3 — DDPM: Denoising Diffusion Probabilistic Models
**Duration:** 1.5 weeks
**The goal:** Understand the paper that started the modern diffusion era. This is the core.

### Concepts
- The forward process: gradually adding Gaussian noise over T steps
- The closed-form forward process (why you can jump to any noise level directly)
- The reverse process: learning to denoise step by step
- The ELBO loss and why it simplifies to a noise prediction objective
- The U-Net architecture used as the denoiser
- Variance schedules: linear, cosine

### Resources
- **Paper:** *Denoising Diffusion Probabilistic Models* — Ho et al., NeurIPS 2020 ⭐⭐ (read this 3 times — each time you'll understand something new)
- **Blog:** Lilian Weng — "What are Diffusion Models?" — full post
- **Blog:** "The Annotated Diffusion Model" — Hugging Face (walks through the paper line by line with code)
- **Video:** Yannic Kilcher's DDPM paper walkthrough on YouTube ⭐
- **Video:** Andrej Karpathy — any lecture on generative models for intuition building

### Build
- [ ] Implement DDPM from scratch on MNIST — no diffusers library, just PyTorch
- [ ] Implement the forward noising process and visualize an image at each noise level
- [ ] Train the denoiser and generate samples
- [ ] Plot the loss curve and generated samples over training

### Teach checkpoint
Record: *"DDPM explained — the forward process, the reverse process, and why the loss simplifies."* (This is your first real lecture — aim for 15–20 min)

---

## Module 4 — DDIM and Faster Sampling
**Duration:** 0.5 weeks
**The goal:** Understand the sampling efficiency problem and how it was solved.

### Concepts
- Why DDPM is slow at inference (1000 steps)
- Non-Markovian processes — breaking the Markov assumption during sampling
- DDIM: deterministic vs stochastic sampling
- The trade-off between speed and sample diversity

### Resources
- **Paper:** *Denoising Diffusion Implicit Models* — Song et al., ICLR 2021 ⭐
- **Blog:** "DDIM — Denoising Diffusion Implicit Models" — annotated walkthrough by Hugging Face

### Build
- [ ] Add DDIM sampling to your DDPM implementation
- [ ] Generate samples with 10, 50, 100, 1000 steps — compare quality
- [ ] Plot quality vs. number of sampling steps

### Teach checkpoint
Record: *"Why DDPM is slow and how DDIM fixes it."* (5–8 min)

---

## Module 5 — Classifier-Free Guidance & Conditional Generation
**Duration:** 1 week
**The goal:** Understand how you control what gets generated. This is critical — conditioning is how world models steer generation.

### Concepts
- Classifier guidance: using a separate classifier to steer sampling
- Classifier-free guidance (CFG): conditioning built into the model itself
- How you condition on text, images, class labels, or any signal
- Guidance scale — the dial between diversity and fidelity
- Cross-attention as the conditioning mechanism in U-Nets

### Resources
- **Paper:** *Diffusion Models Beat GANs on Image Synthesis* — Dhariwal & Nichol, NeurIPS 2021 (classifier guidance)
- **Paper:** *Classifier-Free Diffusion Guidance* — Ho & Salimans, 2022 ⭐⭐ (short paper, read carefully)
- **Blog:** "Classifier-Free Guidance" — Lilian Weng's diffusion series

### Build
- [ ] Add class conditioning to your DDPM implementation (condition on MNIST digit label)
- [ ] Implement CFG: train with random label dropout
- [ ] Generate specific digits by varying the guidance scale
- [ ] Visualize how guidance scale affects outputs

### Teach checkpoint
Record: *"How to control what a diffusion model generates — classifier-free guidance explained."* (10–15 min)

---

## Module 6 — Latent Diffusion Models & Stable Diffusion
**Duration:** 1 week
**The goal:** Understand why modern diffusion models run in latent space, not pixel space. This is how you scale to high-resolution images and video.

### Concepts
- The computational problem with pixel-space diffusion
- Variational autoencoders (VAE) as the compression layer
- Latent diffusion: run diffusion in the compressed latent space
- The encoder-decoder structure of the VAE
- How Stable Diffusion assembles these pieces
- CLIP and text embeddings as conditioning signals

### Resources
- **Paper:** *High-Resolution Image Synthesis with Latent Diffusion Models* — Rombach et al., CVPR 2022 ⭐⭐ (the Stable Diffusion paper)
- **Blog:** "Stable Diffusion Clearly Explained" — Medium/Towards Data Science (several good ones)
- **Video:** Yannic Kilcher's LDM paper walkthrough

### Build
- [ ] Train a small VAE on MNIST — compress images to 4x4 latents
- [ ] Run your DDPM in latent space instead of pixel space
- [ ] Compare training speed and sample quality vs pixel-space DDPM
- [ ] Load Stable Diffusion via diffusers and run inference — look at every component

### Teach checkpoint
Record: *"Why Stable Diffusion runs in latent space and what the VAE actually does."* (15 min)

---

## Module 7 — Flow Matching (Bonus — important for robotics)
**Duration:** 0.5 weeks
**The goal:** Understand the cleaner alternative to diffusion that robotics policies (pi0, SmolVLA) use for action generation.

### Concepts
- Flow matching vs diffusion — straighter paths, simpler training
- Continuous normalizing flows
- Why flow matching is faster and more stable for low-dimensional action spaces
- How pi0 uses flow matching for robot action generation

### Resources
- **Paper:** *Flow Matching for Generative Modeling* — Lipman et al., ICLR 2023 ⭐
- **Blog:** "Flow Matching Guide" — Meta AI blog (accessible)

### Build
- [ ] Implement a simple 2D flow matching model — map Gaussian noise to a target distribution
- [ ] Compare training curves and sample quality with DDPM on the same task

### Teach checkpoint
Record: *"Flow matching — the alternative to diffusion that robotics is moving to."* (8 min)

---

## Module 8 — World Models: Theory & History
**Duration:** 1 week
**The goal:** Understand what a world model is conceptually, where the idea came from, and how it connects to diffusion.

### Concepts
- What is a world model? A model that predicts what happens next given current state + action
- World models in RL: Dreamer, PlaNet
- The difference between a simulator and a learned world model
- Latent world models — predicting in compressed space
- Why world models matter for robotics data generation

### Resources
- **Paper:** *World Models* — Ha & Schmidhuber, 2018 ⭐ (the original, very readable)
- **Paper:** *Dream to Control: Learning Behaviors by Latent Imagination* — Hafner et al., ICLR 2020 (DreamerV1)
- **Paper:** *Mastering Atari with Discrete World Models* — Hafner et al., ICLR 2021 (DreamerV2)
- **Blog:** David Ha's "World Models" blog post — beautiful visual explainer at worldmodels.github.io

### Build
- [ ] Implement a simple world model on CartPole: train an RNN to predict next state given state + action
- [ ] Generate "imagined" rollouts from the world model
- [ ] Compare imagined vs real trajectories

### Teach checkpoint
Record: *"What is a world model and why does it matter for robotics?"* (10–12 min)

---

## Module 9 — Video Diffusion Models
**Duration:** 1.5 weeks
**The goal:** Understand how diffusion extends to video — this is the core of modern world models including Cosmos.

### Concepts
- The temporal dimension: extending U-Net to 3D (spatial + time)
- Temporal attention vs spatial attention
- Factorized space-time attention
- Video as a sequence of frames vs as a 3D volume
- Conditioning on first frames, action signals, text
- Key architectures: Video Diffusion Models, Imagen Video, Make-A-Video

### Resources
- **Paper:** *Video Diffusion Models* — Ho et al., NeurIPS 2022 ⭐⭐ (foundational for video diffusion)
- **Paper:** *Align your Latents: High-Resolution Video Synthesis with Latent Diffusion Models* — Blattmann et al., CVPR 2023
- **Technical report:** *Sora* — OpenAI 2024 (high-level but important framing)
- **Blog:** Lilian Weng — "Video Generation Models as World Simulators"

### Build
- [ ] Extend your DDPM to generate short 4-frame video sequences on a simple dataset (Moving MNIST)
- [ ] Add temporal attention layers alongside the spatial ones
- [ ] Condition generation on the first frame (image-to-video)

### Teach checkpoint
Record: *"How video diffusion models work — extending image diffusion to time."* (15–20 min)

---

## Module 10 — World Models for Robotics
**Duration:** 1 week
**The goal:** Connect everything to your actual product. Understand how NVIDIA Cosmos and similar systems generate robot training data.

### Concepts
- World foundation models (WFMs) — trained on diverse video, then steered for robotics
- Cosmos Predict vs Cosmos Transfer — generation vs photorealistic retexturing
- Conditioning on robot trajectories, depth maps, segmentation masks
- Real-to-sim-to-real via world models
- How 3DGS provides the geometric anchor that keeps world model generation grounded
- Data validation — filtering generated trajectories for physical plausibility

### Resources
- **Paper:** *NVIDIA Cosmos World Foundation Model Technical Report* — 2025 ⭐⭐ (this is directly relevant to your product)
- **Paper:** *UniSim: Learning Interactive Real-World Simulators* — Yang et al., ICLR 2024
- **Paper:** *IRASim: Learning Interactive Real-Robot Action Simulators* — 2024
- **Paper:** *RoboGen: Towards Unleashing Infinite Data for Automated Robot Learning* — 2023

### Build
- [ ] Load the open-source Cosmos weights and run inference conditioned on a video clip
- [ ] Generate variations of a simple scene — different object positions, lighting
- [ ] Evaluate: do the generated variations look physically plausible?

### Teach checkpoint
Record: *"How NVIDIA Cosmos generates robot training data — and how we do it at Imagine Labs."* (15–20 min)

---

## Validation Framework

### For each module, you pass when you can:
1. **Explain it to a 12-year-old** — intuitive analogy, no jargon
2. **Explain it to an ML engineer** — precise, technically correct
3. **Implement the core idea** — working code, not copied
4. **Answer unexpected questions** — record yourself and have someone ask follow-ups

### Milestone projects (these are your course demos)
| Milestone | What you build |
|---|---|
| M1 (after Module 3) | DDPM from scratch on MNIST — fully working |
| M2 (after Module 6) | Latent diffusion model — text-conditioned image generation |
| M3 (after Module 9) | Video diffusion — image-to-video on Moving MNIST |
| M4 (after Module 10) | World model for robotics — generate variations from a demo clip |

---

## Course/YouTube structure (when you're ready to teach)

```
Unit 1: Foundations (Modules 1–2)
  └── "What diffusion models are actually trying to do"

Unit 2: Core Diffusion (Modules 3–4–5)
  └── "DDPM, DDIM, and how to control generation"

Unit 3: Scaling Up (Module 6–7)
  └── "Latent diffusion and why Stable Diffusion works"

Unit 4: World Models (Modules 8–9–10)
  └── "From image generation to generating reality"

Capstone
  └── "Building a robotics data generator with world models"
```

---

## Books to keep on your desk (reference, not read cover to cover)
- *Deep Learning* — Goodfellow, Bengio, Courville (free at deeplearningbook.org)
- *Probabilistic Machine Learning: An Introduction* — Kevin Murphy (free PDF)
- *Understanding Deep Learning* — Simon Prince (free at udlbook.github.io) ⭐ — best modern DL textbook

---

## Weekly time commitment
- **Minimum:** 10 hrs/week → 14 weeks
- **Recommended:** 15 hrs/week → 10 weeks
- **Intensive:** 25 hrs/week → 6 weeks

Split roughly: 40% reading papers, 30% implementing, 30% writing/recording explanations.
