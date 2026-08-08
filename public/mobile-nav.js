/* ==========================================================================
   BAYC — mobile navigation behaviour
   Progressive enhancement. Injects the toggle button, so your BaseLayout
   markup does not change at all. With JS off, the nav renders as it does
   today and every link still works.
   Load with <script src="/mobile-nav.js" defer></script>
   ========================================================================== */
(function () {
  'use strict';

  var BREAKPOINT = 980; // keep in sync with mobile-nav.css

  function init() {
    var header = document.querySelector('.site-header') || document.querySelector('header');
    if (!header) return;

    var nav = header.querySelector('nav');
    if (!nav) return;

    // The brand/logo link, so we can wrap it and the button in one flex row.
    var brand = header.querySelector('.brand') || header.querySelector('a, .site-brand');
    if (!brand) return;

    // Build the row wrapper only if the brand and nav share a parent.
    var row = brand.parentElement;
    if (row && row.contains(nav)) {
      row.classList.add('bayc-nav-row');
    }

    // Build the button.
    var toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'bayc-nav-toggle';
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Menu');
    toggle.innerHTML = '<span class="bar"></span><span class="bar"></span><span class="bar"></span>';

    // Give the nav an id so aria-controls points somewhere real.
    if (!nav.id) nav.id = 'bayc-site-nav';
    toggle.setAttribute('aria-controls', nav.id);

    nav.parentNode.insertBefore(toggle, nav);

    function setOpen(open) {
      header.classList.toggle('bayc-nav-open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    }

    toggle.addEventListener('click', function () {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });

    // Escape closes and returns focus to the button.
    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      if (header.classList.contains('bayc-nav-open')) {
        setOpen(false);
        toggle.focus();
      }
    });

    // Tapping outside the header closes it.
    document.addEventListener('click', function (e) {
      if (!header.classList.contains('bayc-nav-open')) return;
      if (header.contains(e.target)) return;
      setOpen(false);
    });

    // Rotating to landscape or resizing past the breakpoint closes it,
    // so the panel never lingers as a stray block on desktop.
    window.addEventListener('resize', function () {
      if (window.innerWidth > BREAKPOINT) setOpen(false);
    });

    // Astro view transitions, if you enable them later, keep the DOM alive
    // across navigations. This makes sure the panel closes on route change.
    document.addEventListener('astro:after-swap', function () { setOpen(false); });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
