/**
 * Reveals elements marked with `.reveal` as they scroll into view.
 * Respects reduced-motion: everything is shown immediately.
 */
export function initReveal() {
  const targets = document.querySelectorAll(".reveal");
  if (!targets.length) return;

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || !("IntersectionObserver" in window)) {
    targets.forEach((el) => el.classList.add("reveal-visible"));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("reveal-visible");
        io.unobserve(entry.target);
      });
    },
    { threshold: 0.08 }
  );

  targets.forEach((el) => io.observe(el));
}
