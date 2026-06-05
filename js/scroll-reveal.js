(function () {
  'use strict';

  let observer = null;

  function initScrollReveal() {
    if (observer) observer.disconnect();

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            if (!entry.target.classList.contains('timeline')) {
              observer.unobserve(entry.target);
            }
          }
        });
      },
      { threshold: reduced ? 0.05 : 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    document.querySelectorAll('.reveal').forEach((el) => {
      el.classList.remove('is-visible');
      observer.observe(el);

      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.classList.add('is-visible');
      }
    });

    const timeline = document.querySelector('.timeline');
    if (timeline) {
      timeline.classList.add('reveal');
      observer.observe(timeline);
    }
  }

  function initNavScroll() {
    const header = document.querySelector('.site-header');
    if (!header) return;

    const onScroll = () => {
      header.classList.toggle('is-scrolled', window.scrollY > 80);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  document.addEventListener('DOMContentLoaded', () => {
    initScrollReveal();
    initNavScroll();
  });

  window.initScrollReveal = initScrollReveal;
})();
