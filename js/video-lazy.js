(function () {
  'use strict';

  function initVideoLazy() {
    const videos = document.querySelectorAll('video[data-src]');

    const loadVideo = (video) => {
      if (video.dataset.loaded) return;
      const src = video.dataset.src;
      if (!src) return;

      const source = document.createElement('source');
      source.src = src;
      source.type = 'video/mp4';
      video.appendChild(source);
      video.dataset.loaded = 'true';
      video.load();
    };

    if (!('IntersectionObserver' in window)) {
      videos.forEach(loadVideo);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            loadVideo(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '200px' }
    );

    videos.forEach((video) => observer.observe(video));
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
