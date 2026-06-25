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
}());
