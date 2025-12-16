(() => {
  const INTRO_KEY = "vwa_intro_seen_v1";
  const intro = document.getElementById("intro");
  const canvas = document.getElementById("introParticles");
  const logo = document.getElementById("introLogo");

  // If missing intro elements, fail gracefully
  if (!intro || !canvas || !logo) return;

  const prefersReduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Show intro only if not seen AND not reduced motion
  const hasSeen = localStorage.getItem(INTRO_KEY) === "1";
  if (hasSeen || prefersReduced) {
    intro.classList.add("is-hidden");
    intro.style.display = "none";
    return;
  }

  // Canvas sizing
  const ctx = canvas.getContext("2d");
  const DPR = Math.min(2, window.devicePixelRatio || 1);

  let W = 0, H = 0;
  function resize() {
    const rect = intro.getBoundingClientRect();
    W = Math.floor(rect.width);
    H = Math.floor(rect.height);
    canvas.width = Math.floor(W * DPR);
    canvas.height = Math.floor(H * DPR);
    canvas.style.width = W + "px";
    canvas.style.height = H + "px";
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  }
  resize();
  window.addEventListener("resize", resize, { passive: true });

  // Particles
  const GOLD = "rgba(255, 213, 106, 0.75)";
  const GOLD2 = "rgba(247, 185, 11, 0.55)";
  const particles = [];
  const MAX = 160;

  function spawnBurst() {
    const cx = W / 2;
    const cy = H / 2;
    for (let i = 0; i < MAX; i++) {
      const a = Math.random() * Math.PI * 2;
      const sp = 0.3 + Math.random() * 2.1;
      particles.push({
        x: cx + (Math.random() * 10 - 5),
        y: cy + (Math.random() * 10 - 5),
        vx: Math.cos(a) * sp,
        vy: Math.sin(a) * sp,
        r: 0.8 + Math.random() * 1.8,
        life: 0,
        ttl: 80 + Math.floor(Math.random() * 40),
        c: Math.random() > 0.5 ? GOLD : GOLD2
      });
    }
  }

  function tick() {
    ctx.clearRect(0, 0, W, H);
    // draw
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.life++;
      p.x += p.vx;
      p.y += p.vy;
      p.vx *= 0.985;
      p.vy *= 0.985;
      p.vy += 0.01; // gentle gravity
      const t = p.life / p.ttl;
      const alpha = Math.max(0, 1 - t);
      ctx.beginPath();
      ctx.fillStyle = p.c.replace(/\d?\.\d+\)$/, `${0.65 * alpha})`).replace(/0\)$/, `${0.65 * alpha})`);
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();

      if (p.life >= p.ttl) particles.splice(i, 1);
    }
    if (particles.length > 0) requestAnimationFrame(tick);
  }

  // Sequence
  function startSequence() {
    // stage 1: draw + scan
    intro.classList.add("stage-1");

    // stage 2: glow pulse
    setTimeout(() => intro.classList.add("stage-2"), 1250);

    // stage 3: particles burst + fade out
    setTimeout(() => {
      spawnBurst();
      requestAnimationFrame(tick);
    }, 1700);

    setTimeout(() => {
      intro.classList.add("is-hidden");
      localStorage.setItem(INTRO_KEY, "1");
      // remove after fade
      setTimeout(() => {
        intro.style.display = "none";
      }, 900);
    }, 2500);
  }

  // Wait for logo to load (avoid flash)
  if (logo.complete) startSequence();
  else logo.addEventListener("load", startSequence, { once: true });
})();