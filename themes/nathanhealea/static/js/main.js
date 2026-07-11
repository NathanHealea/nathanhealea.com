(function () {
  'use strict';

  var header = document.getElementById('site-header');
  var navToggle = document.getElementById('nav-toggle');
  var navList = document.getElementById('nav-list');
  var themeToggle = document.getElementById('theme-toggle');

  // Theme toggle — the inline head script has already set data-theme before paint.
  var root = document.documentElement;

  function currentTheme() {
    return root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    if (themeToggle) {
      themeToggle.setAttribute(
        'aria-label',
        theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'
      );
    }
  }

  applyTheme(currentTheme());

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      var next = currentTheme() === 'dark' ? 'light' : 'dark';
      try {
        localStorage.setItem('theme', next);
      } catch (e) {}
      applyTheme(next);
    });
  }

  // Follow OS changes only while the user hasn't made an explicit choice.
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
      var stored;
      try {
        stored = localStorage.getItem('theme');
      } catch (err) {}
      if (stored !== 'dark' && stored !== 'light') {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    });
  }

  // Shadow header on scroll
  function onScroll() {
    header.classList.toggle('site-header--scrolled', window.scrollY > 10);
    activateNavLink();
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  // Mobile nav toggle
  if (navToggle && navList) {
    navToggle.addEventListener('click', function () {
      var expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      navList.classList.toggle('nav-list--open');
    });

    // Close mobile nav when a link is clicked
    navList.querySelectorAll('.nav-link').forEach(function (link) {
      link.addEventListener('click', function () {
        navList.classList.remove('nav-list--open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close mobile nav on outside click
    document.addEventListener('click', function (e) {
      if (!header.contains(e.target)) {
        navList.classList.remove('nav-list--open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Scroll spy — highlight active section link
  var sections = Array.from(document.querySelectorAll('section[id]'));
  var navLinks = Array.from(document.querySelectorAll('.nav-link[href^="#"]'));

  function activateNavLink() {
    var current = '';
    sections.forEach(function (section) {
      if (window.scrollY >= section.offsetTop - 100) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach(function (link) {
      var href = link.getAttribute('href');
      link.classList.toggle('nav-link--active', href === '#' + current);
    });
  }

  activateNavLink();
}());
