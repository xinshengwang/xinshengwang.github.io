(function () {
  'use strict';

  function initSite() {
    document.title = SITE.meta.title;

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.content = SITE.meta.description;

    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.dataset.i18n;
      const value = key.split('.').reduce((obj, k) => obj?.[k], SITE);
      if (value !== undefined) el.textContent = value;
    });

    const aboutEl = document.getElementById('about-content');
    if (aboutEl && !aboutEl.innerHTML.trim()) aboutEl.innerHTML = SITE.about.html;

    renderTimeline();
    renderNews();
    renderProjects();
  }

  function renderTimeline() {
    const container = document.getElementById('timeline');
    if (!container || container.children.length) return;

    container.innerHTML = SITE.experience.items
      .map(
        (item) => `
      <li class="timeline-item reveal${item.current ? ' is-current' : ''}">
        <span class="timeline-dot" aria-hidden="true"></span>
        <div class="timeline-date">${item.date}</div>
        <div class="timeline-role">${item.role}</div>
        <div class="timeline-org">${
          item.url
            ? `<a href="${item.url}" target="_blank" rel="noopener">${item.org}</a>`
            : item.org
        }</div>
      </li>`
      )
      .join('');
  }

  function renderNews() {
    const container = document.getElementById('news-list');
    if (!container || container.children.length) return;

    container.innerHTML = SITE.news.items
      .map(
        (item, i) => `
      <li class="news-item reveal" style="animation-delay: ${i * 0.08}s">
        <time class="news-date">${item.date}</time>
        <div class="news-text">${item.html}</div>
      </li>`
      )
      .join('');
  }

  function renderProjects() {
    const container = document.getElementById('project-list');
    if (!container || container.children.length) return;

    container.innerHTML = SITE.projects.items
      .map((item) => {
        const reverseClass = item.reverse ? ' project--reverse' : '';
        const revealClass = item.reverse ? ' reveal-right' : ' reveal-left';
        const badges = item.badges
          .map((b) => `<span class="badge">${SITE.projects.badges[b]}</span>`)
          .join('');

        const links = [
          `<a class="project-link" href="${item.demo}" target="_blank" rel="noopener">${SITE.projects.links.demo}</a>`,
          `<a class="project-link" href="${item.paper}" target="_blank" rel="noopener">${SITE.projects.links.paper}</a>`,
          `<a class="project-link" href="${item.code}" target="_blank" rel="noopener">${SITE.projects.links.code}</a>`,
          `<a class="project-link" href="${item.hf}" target="_blank" rel="noopener">${SITE.projects.links.hf}</a>`,
        ].join('');

        let videoHtml;
        if (item.youtube) {
          videoHtml = `
            <div class="video-card" data-youtube="${item.youtube}">
              <button class="youtube-placeholder" type="button" aria-label="${SITE.video.play}">
                <img src="https://img.youtube.com/vi/${item.youtube}/maxresdefault.jpg" alt="" loading="lazy" onerror="this.src='https://img.youtube.com/vi/${item.youtube}/hqdefault.jpg'">
                <span class="youtube-play" aria-hidden="true">
                  <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                </span>
                <span class="youtube-label">${SITE.video.play}</span>
              </button>
            </div>`;
        } else {
          videoHtml = `
            <div class="video-card">
              <video
                controls
                preload="none"
                poster="${item.poster}"
                data-src="${item.video}"
                playsinline
              >
                <p>Your browser does not support HTML5 video.</p>
              </video>
            </div>`;
        }

        return `
        <article class="project reveal${reverseClass}${revealClass}" id="project-${item.id}">
          <div class="project-content">
            <h3 class="project-title">${item.title}</h3>
            <p class="project-subtitle">${item.subtitle}</p>
            <div class="project-badges">${badges}</div>
            <p class="project-about">${item.about}</p>
            <div class="project-links">${links}</div>
          </div>
          <div class="project-video-wrap">${videoHtml}</div>
        </article>`;
      })
      .join('');

    if (window.initVideoLazy) window.initVideoLazy();
    if (window.initYouTube) window.initYouTube();
    if (window.initScrollReveal) window.initScrollReveal();
  }

  function initNavToggle() {
    const toggle = document.getElementById('nav-toggle');
    const menu = document.getElementById('nav-menu');
    if (!toggle || !menu) return;

    const closeMenu = () => {
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open menu');
      menu.classList.remove('is-open');
    };

    toggle.addEventListener('click', () => {
      const isOpen = menu.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
      toggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    });

    menu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMenu();
    });
  }

  function initThemeToggle() {
    const btn = document.getElementById('theme-toggle');
    if (!btn) return;

    btn.addEventListener('click', () => {
      const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
      document.documentElement.dataset.theme = next;
      localStorage.setItem('theme', next);
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initSite();
    initNavToggle();
    initThemeToggle();
  });
})();
