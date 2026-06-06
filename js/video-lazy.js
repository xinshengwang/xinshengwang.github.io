(function () {
  'use strict';

  function videoLabels() {
    const video = typeof SITE !== 'undefined' && SITE.video ? SITE.video : {};
    return {
      play: video.play || 'Play demo',
      loading: video.loading || 'Loading video…',
      error: video.error || 'Failed to load video',
    };
  }

  function initVideoLazy() {
    const labels = videoLabels();

    document.querySelectorAll('video[data-src]').forEach((video) => {
      if (video.dataset.bound) return;
      video.dataset.bound = 'true';

      const card = video.closest('.video-card');
      if (!card) return;

      const src = video.dataset.src;
      const poster = video.getAttribute('poster') || '';

      const placeholder = document.createElement('button');
      placeholder.type = 'button';
      placeholder.className = 'video-placeholder';
      placeholder.setAttribute('aria-label', labels.play);
      placeholder.innerHTML = `
        ${poster ? `<img src="${poster}" alt="" loading="lazy" />` : ''}
        <span class="video-play" aria-hidden="true">
          <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
        </span>
        <span class="video-label">${labels.play}</span>
      `;

      const loading = document.createElement('div');
      loading.className = 'video-loading';
      loading.hidden = true;
      loading.setAttribute('role', 'status');
      loading.setAttribute('aria-live', 'polite');
      loading.innerHTML = `
        <span class="video-loading-spinner" aria-hidden="true"></span>
        <span class="video-loading-text">${labels.loading}</span>
      `;

      video.hidden = true;
      card.append(placeholder, loading);

      const showLoading = (text) => {
        loading.querySelector('.video-loading-text').textContent = text || labels.loading;
        loading.hidden = false;
      };

      const hideLoading = () => {
        loading.hidden = true;
      };

      const revealVideo = () => {
        placeholder.remove();
        hideLoading();
        video.hidden = false;
      };

      const loadAndPlay = () => {
        if (video.dataset.loaded === 'ready') {
          video.play().catch(() => {});
          return;
        }
        if (video.dataset.loaded === 'loading') return;

        showLoading();
        video.dataset.loaded = 'loading';

        video.querySelectorAll('source').forEach((node) => node.remove());

        const source = document.createElement('source');
        source.src = src;
        source.type = 'video/mp4';
        video.appendChild(source);
        video.load();

        const onReady = () => {
          video.dataset.loaded = 'ready';
          revealVideo();
          video.play().catch(() => {});
        };

        const onError = () => {
          video.dataset.loaded = '';
          showLoading(labels.error);
          loading.querySelector('.video-loading-spinner')?.remove();
          loading.style.cursor = 'pointer';
          loading.onclick = () => {
            loading.style.cursor = '';
            loading.onclick = null;
            if (!loading.querySelector('.video-loading-spinner')) {
              const spinner = document.createElement('span');
              spinner.className = 'video-loading-spinner';
              spinner.setAttribute('aria-hidden', 'true');
              loading.insertBefore(spinner, loading.firstChild);
            }
            loadAndPlay();
          };
        };

        video.addEventListener('canplay', onReady, { once: true });
        video.addEventListener('error', onError, { once: true });
      };

      placeholder.addEventListener('click', loadAndPlay);

      video.addEventListener('waiting', () => {
        if (!video.hidden && !video.paused && !video.ended) {
          showLoading();
        }
      });

      video.addEventListener('playing', hideLoading);
      video.addEventListener('canplay', hideLoading);
    });
  }

  function initYouTube() {
    document.querySelectorAll('[data-youtube]').forEach((card) => {
      const btn = card.querySelector('.youtube-placeholder');
      if (!btn || btn.dataset.bound) return;
      btn.dataset.bound = 'true';

      btn.addEventListener('click', () => {
        const id = card.dataset.youtube;
        const iframe = document.createElement('iframe');
        iframe.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`;
        iframe.title = 'Spark-TTS Demo';
        iframe.allow =
          'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
        iframe.allowFullscreen = true;
        card.innerHTML = '';
        card.appendChild(iframe);
      });
    });
  }

  window.initVideoLazy = initVideoLazy;
  window.initYouTube = initYouTube;

  document.addEventListener('DOMContentLoaded', () => {
    initVideoLazy();
    initYouTube();
  });
})();
