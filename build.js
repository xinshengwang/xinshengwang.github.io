#!/usr/bin/env node
'use strict';

/**
 * Minimal static-site build step.
 *
 * Reads the single source of truth (`js/content.js`) and renders the
 * About / Experience / News / Projects blocks into `index.html`, between
 * the `<!-- AUTO:<key>:start -->` / `<!-- AUTO:<key>:end -->` markers.
 *
 * The same markup is produced at runtime by `js/main.js` as a fallback,
 * so the static and client-rendered output stay in sync.
 *
 * Usage: `node build.js`  (or `npm run build`)
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = __dirname;
const CONTENT_PATH = path.join(ROOT, 'js', 'content.js');
const HTML_PATH = path.join(ROOT, 'index.html');

function loadSite() {
  const code = fs.readFileSync(CONTENT_PATH, 'utf8');
  // content.js is a browser script that declares `const SITE = {...}`.
  // Evaluate it in a throwaway context and return the SITE object.
  return vm.runInNewContext(`${code}\nSITE;`, {});
}

function renderAbout(site) {
  return site.about.html.split('\n');
}

function renderExperience(site) {
  const lines = [];
  site.experience.items.forEach((item) => {
    const org = item.url
      ? `<a href="${item.url}" target="_blank" rel="noopener">${item.org}</a>`
      : item.org;
    lines.push(`<li class="timeline-item reveal${item.current ? ' is-current' : ''}">`);
    lines.push('  <span class="timeline-dot" aria-hidden="true"></span>');
    lines.push(`  <div class="timeline-date">${item.date}</div>`);
    lines.push(`  <div class="timeline-role">${item.role}</div>`);
    lines.push(`  <div class="timeline-org">${org}</div>`);
    lines.push('</li>');
  });
  return lines;
}

function renderNews(site) {
  const lines = [];
  site.news.items.forEach((item) => {
    const datetime = item.date.replace(/\./g, '-');
    lines.push('<li class="news-item reveal">');
    lines.push(`  <time class="news-date" datetime="${datetime}">${item.date}</time>`);
    lines.push(`  <div class="news-text">${item.html}</div>`);
    lines.push('</li>');
  });
  return lines;
}

function renderProjects(site) {
  const { badges: badgeLabels, links: linkLabels, items } = site.projects;
  const lines = [];

  items.forEach((item) => {
    const revealClass = item.reverse ? 'reveal-right' : 'reveal-left';
    const reverseClass = item.reverse ? ' project--reverse' : '';

    lines.push(`<article class="project reveal ${revealClass}${reverseClass}" id="project-${item.id}">`);
    lines.push('  <div class="project-content">');
    lines.push(`    <h3 class="project-title">${item.title}</h3>`);
    lines.push(`    <p class="project-subtitle">${item.subtitle}</p>`);
    lines.push('    <div class="project-badges">');
    item.badges.forEach((b) => {
      lines.push(`      <span class="badge">${badgeLabels[b]}</span>`);
    });
    lines.push('    </div>');
    lines.push(`    <p class="project-about">${item.about}</p>`);
    lines.push('    <div class="project-links">');
    [
      ['demo', item.demo],
      ['paper', item.paper],
      ['code', item.code],
      ['hf', item.hf],
    ]
      .filter(([, href]) => Boolean(href))
      .forEach(([key, href]) => {
        lines.push(
          `      <a class="project-link" href="${href}" target="_blank" rel="noopener">${linkLabels[key]}</a>`
        );
      });
    lines.push('    </div>');
    lines.push('  </div>');
    lines.push('  <div class="project-video-wrap">');
    if (item.youtube) {
      lines.push(`    <div class="video-card" data-youtube="${item.youtube}">`);
      lines.push(`      <button class="youtube-placeholder" type="button" aria-label="${site.video.play}">`);
      lines.push(
        `        <img src="https://img.youtube.com/vi/${item.youtube}/maxresdefault.jpg" alt="" loading="lazy" onerror="this.src='https://img.youtube.com/vi/${item.youtube}/hqdefault.jpg'" />`
      );
      lines.push('        <span class="youtube-play" aria-hidden="true">');
      lines.push('          <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>');
      lines.push('        </span>');
      lines.push(`        <span class="youtube-label">${site.video.play}</span>`);
      lines.push('      </button>');
      lines.push('    </div>');
    } else {
      lines.push('    <div class="video-card">');
      lines.push(
        `      <video controls preload="none" poster="${item.poster}" data-src="${item.video}" playsinline>`
      );
      lines.push('        <p>Your browser does not support HTML5 video.</p>');
      lines.push('      </video>');
      lines.push('    </div>');
    }
    lines.push('  </div>');
    lines.push('</article>');
  });

  return lines;
}

function fillRegion(html, key, innerLines) {
  const re = new RegExp(`([ \\t]*)<!-- AUTO:${key}:start -->[\\s\\S]*?<!-- AUTO:${key}:end -->`);
  if (!re.test(html)) {
    throw new Error(`Markers for "${key}" not found in index.html`);
  }
  return html.replace(re, (match, indent) => {
    const body = innerLines.map((line) => (line === '' ? '' : indent + line)).join('\n');
    return `${indent}<!-- AUTO:${key}:start -->\n${body}\n${indent}<!-- AUTO:${key}:end -->`;
  });
}

function escapeHtml(str) {
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function get(site, dottedKey) {
  return dottedKey.split('.').reduce((obj, k) => (obj == null ? obj : obj[k]), site);
}

// Sync the text of every `data-i18n` element with its value in content.js, so
// the static fallback text (hero, nav, footer, section titles…) matches the
// runtime output produced by js/main.js. All data-i18n values are plain text.
function syncI18n(html, site) {
  const re = /(<([a-zA-Z][\w-]*)\b[^>]*\sdata-i18n="([^"]+)"[^>]*>)(\s*)[\s\S]*?(\s*)(<\/\2>)/g;
  return html.replace(re, (match, open, tag, key, lead, trail, close) => {
    const value = get(site, key);
    if (value === undefined) return match;
    return `${open}${lead}${escapeHtml(value)}${trail}${close}`;
  });
}

function syncMeta(html, site) {
  if (site.meta && site.meta.title) {
    html = html.replace(/(<title>)[\s\S]*?(<\/title>)/, `$1${escapeHtml(site.meta.title)}$2`);
  }
  if (site.meta && site.meta.description) {
    html = html.replace(
      /(<meta\s+name="description"\s+content=")[^"]*(")/,
      `$1${escapeHtml(site.meta.description)}$2`
    );
  }
  return html;
}

function main() {
  const site = loadSite();
  let html = fs.readFileSync(HTML_PATH, 'utf8');

  html = fillRegion(html, 'about', renderAbout(site));
  html = fillRegion(html, 'experience', renderExperience(site));
  html = fillRegion(html, 'news', renderNews(site));
  html = fillRegion(html, 'projects', renderProjects(site));
  html = syncI18n(html, site);
  html = syncMeta(html, site);

  fs.writeFileSync(HTML_PATH, html);
  console.log('✓ Built index.html from js/content.js');
}

main();
