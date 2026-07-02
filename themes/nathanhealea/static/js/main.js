(function () {
  'use strict';

  var header = document.getElementById('site-header');
  var navToggle = document.getElementById('nav-toggle');
  var navList = document.getElementById('nav-list');

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

  // Theme toggle — persist an explicit light/dark choice
  var themeToggle = document.getElementById('theme-toggle');

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      var root = document.documentElement;
      var explicit = root.getAttribute('data-theme');
      var systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      var isDark = explicit ? explicit === 'dark' : systemDark;
      var next = isDark ? 'light' : 'dark';

      root.setAttribute('data-theme', next);
      try {
        localStorage.setItem('theme', next);
      } catch (e) {}
    });
  }

  // Experience — expand/collapse all
  var experienceTimeline = document.getElementById('experience-timeline');
  var experienceToggleAll = document.getElementById('experience-toggle-all');

  if (experienceTimeline && experienceToggleAll) {
    var experienceItems = Array.prototype.slice.call(
      experienceTimeline.querySelectorAll('details.timeline-item')
    );

    experienceToggleAll.addEventListener('click', function () {
      var allOpen = experienceItems.every(function (item) { return item.open; });
      var expand = !allOpen;
      experienceItems.forEach(function (item) { item.open = expand; });
      experienceToggleAll.setAttribute('aria-expanded', String(expand));
      experienceToggleAll.classList.toggle('experience-toggle-all--expanded', expand);
    });
  }
}());
