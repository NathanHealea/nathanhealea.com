/**
 * Interactive particle-network hero background.
 *
 * Nodes drift on deterministic starting positions, link to nearby neighbours
 * with a cyan→indigo gradient line, and react to the cursor (attraction +
 * emerald glow). Reduced-motion draws a single static frame.
 */
export function initHeroNetwork() {
  const canvas = document.querySelector("[data-hero-canvas]");
  if (!canvas) return;

  const hero = canvas.closest(".hero") || canvas.parentElement;
  const ctx = canvas.getContext("2d");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let W, H, dpr, particles = [], raf;
  const mouse = { x: -999, y: -999 };

  const LINK = 130;
  const colA = [56, 189, 248]; // primary  (cyan)
  const colB = [129, 140, 248]; // secondary (indigo)

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    const r = canvas.getBoundingClientRect();
    W = r.width;
    H = r.height;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const target = Math.min(90, Math.floor((W * H) / 14000));
    particles = [];
    for (let i = 0; i < target; i++) {
      particles.push({
        x: (i * 97.13) % W,
        y: (i * 53.71) % H,
        vx: (((i * 31) % 100) / 100 - 0.5) * 0.4,
        vy: (((i * 17) % 100) / 100 - 0.5) * 0.4,
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;

      const mdx = mouse.x - p.x;
      const mdy = mouse.y - p.y;
      const md2 = mdx * mdx + mdy * mdy;
      if (md2 < 22000 && md2 > 1) {
        const f = 0.9 / Math.sqrt(md2);
        p.vx += mdx * f * 0.02;
        p.vy += mdy * f * 0.02;
      }
      p.vx = Math.max(-1.2, Math.min(1.2, p.vx));
      p.vy = Math.max(-1.2, Math.min(1.2, p.vy));
    }

    for (let i = 0; i < particles.length; i++) {
      const a = particles[i];
      for (let j = i + 1; j < particles.length; j++) {
        const b = particles[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < LINK) {
          const t = 1 - d / LINK;
          const r = Math.round(colA[0] + (colB[0] - colA[0]) * t);
          const g = Math.round(colA[1] + (colB[1] - colA[1]) * t);
          const bl = Math.round(colA[2] + (colB[2] - colA[2]) * t);
          ctx.strokeStyle = `rgba(${r},${g},${bl},${t * 0.5})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
      const dm = Math.hypot(a.x - mouse.x, a.y - mouse.y);
      const glow = dm < 150;
      ctx.fillStyle = glow ? "rgba(52,211,153,0.9)" : "rgba(148,163,210,0.55)";
      ctx.beginPath();
      ctx.arc(a.x, a.y, glow ? 2.6 : 1.6, 0, Math.PI * 2);
      ctx.fill();
    }

    raf = requestAnimationFrame(draw);
  }

  hero.addEventListener("pointermove", (e) => {
    const r = canvas.getBoundingClientRect();
    mouse.x = e.clientX - r.left;
    mouse.y = e.clientY - r.top;
  });
  hero.addEventListener("pointerleave", () => {
    mouse.x = -999;
    mouse.y = -999;
  });
  window.addEventListener("resize", () => {
    cancelAnimationFrame(raf);
    resize();
    if (!reduce) draw();
  });

  resize();
  if (reduce) {
    draw();
    cancelAnimationFrame(raf);
  } else {
    draw();
  }
}
