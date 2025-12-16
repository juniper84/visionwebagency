(() => {
  // Footer year
  const y = document.getElementById("year");
  if (y) y.textContent = String(new Date().getFullYear());

  // WhatsApp links
  const WA_NUMBER = "255788533632"; // primary
  const DEFAULT_MSG = "Hi Vision Web Agency! I want a Business-in-a-Box™ for my business. Please share the next steps.";
  const waBase = (msg) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;

  const setHref = (id, msg) => {
    const el = document.getElementById(id);
    if (el) el.href = waBase(msg || DEFAULT_MSG);
  };

  setHref("heroWhatsApp");
  setHref("headerWhatsApp");
  setHref("mobileWhatsApp");
  setHref("stickyWhatsApp");
  setHref("ctaWhatsApp");

  // Package buttons
  document.querySelectorAll("[data-wa]").forEach(btn => {
    btn.setAttribute("href", waBase(`Hi Vision Web Agency! I'm interested in the ${btn.getAttribute("data-wa")}. Can you share details and pricing?`));
    btn.setAttribute("target", "_blank");
    btn.setAttribute("rel", "noopener");
  });

  // Mobile menu
  const menuBtn = document.getElementById("menuBtn");
  const mobileNav = document.getElementById("mobileNav");
  if (menuBtn && mobileNav) {
    const close = () => {
      menuBtn.setAttribute("aria-expanded", "false");
      mobileNav.setAttribute("aria-hidden", "true");
    };

    menuBtn.addEventListener("click", () => {
      const open = menuBtn.getAttribute("aria-expanded") === "true";
      menuBtn.setAttribute("aria-expanded", String(!open));
      mobileNav.setAttribute("aria-hidden", String(open));
    });

    mobileNav.querySelectorAll("a").forEach(a => a.addEventListener("click", close));
    window.addEventListener("resize", () => {
      if (window.innerWidth > 980) close();
    }, { passive: true });
  }

  // Top progress line
  const topline = document.querySelector(".topline");
  const onScroll = () => {
    if (!topline) return;
    const doc = document.documentElement;
    const scrollTop = doc.scrollTop || document.body.scrollTop;
    const scrollHeight = doc.scrollHeight - doc.clientHeight;
    const p = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    topline.style.width = `${p}%`;
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Count-up stats when visible
  const stats = Array.from(document.querySelectorAll("[data-count]"));
  if (stats.length) {
    const prefersReduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const animateCount = (el) => {
      const target = Number(el.getAttribute("data-count") || "0");
      const start = 0;
      const dur = 900;
      const t0 = performance.now();
      const step = (t) => {
        const k = Math.min(1, (t - t0) / dur);
        const eased = 1 - Math.pow(1 - k, 3);
        const val = Math.round(start + (target - start) * eased);
        el.textContent = String(val);
        if (k < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    if (prefersReduced) {
      stats.forEach(el => el.textContent = el.getAttribute("data-count"));
    } else {
      const io = new IntersectionObserver((entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            animateCount(e.target);
            io.unobserve(e.target);
          }
        }
      }, { threshold: 0.4 });
      stats.forEach(el => io.observe(el));
    }
  }
})();