/**
 * Site entry point. Bundled by Hugo Pipes (js.Build / esbuild).
 */
import { initNav } from "./modules/nav.js";
import { initReveal } from "./modules/reveal.js";
import { initHeroNetwork } from "./modules/hero-network.js";

function init() {
  initNav();
  initReveal();
  initHeroNetwork();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
