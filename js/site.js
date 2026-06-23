/* ============================================================
   PyHo 2026 — site.js
   Shared across every page. Keep it lean.
   ============================================================ */

(function () {
  'use strict';

  /* ── 1. DROPDOWN NAV ── */
  const navItems = document.querySelectorAll('.nav-item[data-dropdown]');

  navItems.forEach(function (item) {
    const trigger = item.querySelector('button');
    if (!trigger) return;

    trigger.addEventListener('click', function (e) {
      e.stopPropagation();
      const isOpen = item.classList.contains('open');

      // Close all
      navItems.forEach(function (i) { i.classList.remove('open'); });

      // Toggle this one
      if (!isOpen) item.classList.add('open');
    });
  });

  // Close dropdowns on outside click
  document.addEventListener('click', function () {
    navItems.forEach(function (i) { i.classList.remove('open'); });
  });

  // Close on Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      navItems.forEach(function (i) { i.classList.remove('open'); });
      closeMobileMenu();
    }
  });


  /* ── 2. MOBILE HAMBURGER ── */
  const hamburger = document.getElementById('navHamburger');
  const navLinks  = document.getElementById('navLinks');

  function openMobileMenu() {
    navLinks.classList.add('mobile-open');
    hamburger.setAttribute('aria-expanded', 'true');
    hamburger.querySelector('.icon-open').style.display  = 'none';
    hamburger.querySelector('.icon-close').style.display = 'block';
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    if (!navLinks) return;
    navLinks.classList.remove('mobile-open');
    if (hamburger) {
      hamburger.setAttribute('aria-expanded', 'false');
      hamburger.querySelector('.icon-open').style.display  = 'block';
      hamburger.querySelector('.icon-close').style.display = 'none';
    }
    document.body.style.overflow = '';
  }

  if (hamburger) {
    hamburger.addEventListener('click', function (e) {
      e.stopPropagation();
      if (navLinks.classList.contains('mobile-open')) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
  }

  // Close mobile menu when a nav link is clicked
  if (navLinks) {
    navLinks.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        closeMobileMenu();
      });
    });
  }


  /* ── 3. ACTIVE NAV LINK ── */
  // Highlight the nav item whose href matches current page
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';

  document.querySelectorAll('.nav-item > a').forEach(function (a) {
    const href = a.getAttribute('href');
    if (href && (href === currentPath || href === './' + currentPath)) {
      a.closest('.nav-item').classList.add('current');
      a.style.color = 'var(--yellow)';
    }
  });


  /* ── 4. SMOOTH SCROLL for in-page anchors ── */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 68;
        const top  = target.getBoundingClientRect().top + window.scrollY - navH - 16;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

})();
