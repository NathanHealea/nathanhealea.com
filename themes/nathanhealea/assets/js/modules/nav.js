/**
 * Sticky navbar: adds a blurred background once scrolled, and highlights the
 * nav link whose section is currently in view (scrollspy).
 */
export function initNav() {
  const navbar = document.querySelector("[data-navbar]");
  if (!navbar) return;

  const onScroll = () => {
    navbar.classList.toggle("navbar-scrolled", window.scrollY > 20);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Scrollspy — map each nav link to its target section.
  const links = Array.from(navbar.querySelectorAll(".nav-link[href^='#']"));
  const sections = links
    .map((link) => {
      const id = link.getAttribute("href").slice(1);
      const section = id ? document.getElementById(id) : null;
      return section ? { link, section } : null;
    })
    .filter(Boolean);

  if (!sections.length || !("IntersectionObserver" in window)) return;

  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const match = sections.find((s) => s.section === entry.target);
        if (!match) return;
        links.forEach((l) => l.classList.remove("nav-link-active"));
        match.link.classList.add("nav-link-active");
      });
    },
    { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
  );

  sections.forEach(({ section }) => spy.observe(section));
}
