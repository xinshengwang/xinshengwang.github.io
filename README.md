# Xinsheng Wang — Personal Homepage

Static English personal homepage for speech research portfolio.

## Editing content

All content lives in a single source of truth: `js/content.js`.

After editing it, regenerate the static HTML so the page works without
JavaScript (better SEO and resilience):

```bash
npm run build   # or: node build.js
```

The build does two things:

1. Renders the About / Experience / News / Projects blocks into `index.html`
   between the `<!-- AUTO:<key>:start -->` markers. Do not edit those regions
   by hand — they are overwritten on each build.
2. Syncs the static fallback text of every `data-i18n` element (hero, nav,
   footer, section titles…) plus the `<title>` and meta description with the
   matching values in `js/content.js`.

`js/main.js` applies the same content at runtime, so the static HTML and the
client-rendered page stay in sync.

## Local preview

```bash
npm run serve   # or: python3 -m http.server 8080
# Open the printed URL
```

## Deploy to GitHub Pages

1. Push this repository to GitHub.
2. Go to **Settings → Pages**.
3. Set **Source** to **Deploy from a branch**.
4. Choose branch `main` (or `master`) and folder **`/ (root)`**.
5. Save. The site will be available at `https://<username>.github.io/<repo>/`.

The `.nojekyll` file ensures GitHub Pages serves static assets correctly.

## Demo videos

Place project demo MP4 files in `assets/videos/`:

| File | Source (from docs) |
|------|---------------------|
| `soulx-transcriber-demo.mp4` | `docs/soulx-transcriber/demo/soulx-transcriber-demo.mp4` |
| `soulx-duplug-demo.mp4` | `docs/soulx-duplug/demo/soulx-duplug-demo.mp4` |
| `soulx-singer-demo.mp4` | `docs/soulx-singer/demo/八小时时差-24fps.mp4` |
| `soulx-podcast-demo.mp4` | `docs/soulx-podcast/demo/podcast-demo-24fps.mp4` |

Spark-TTS uses a click-to-load YouTube embed. Large videos may be hosted on CDN or Git LFS instead.

## Structure

```
index.html          # Single-page layout
css/                # base, layout, components, animations
js/                 # content, main, scroll reveal, video lazy load
assets/images/      # Posters, favicon
assets/videos/      # Local demo MP4s
docs/               # Source content (markdown)
```
