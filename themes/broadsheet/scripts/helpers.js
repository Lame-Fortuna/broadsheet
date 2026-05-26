'use strict';

const DEFAULT_SUMMARY = 'New writing is on the way.';
const PATTERN_LABELS = {
  article: 'Article',
  listicle: 'Listicle',
  roundup: 'Roundup',
  simple: 'Simple Blog',
  freeform: 'Freeform',
};

function stripMarkup(input = '') {
  return String(input)
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function hashSeed(input = '') {
  return String(input)
    .split('')
    .reduce((total, char) => total + char.charCodeAt(0), 0);
}

function wrapEditorialSections(input = '') {
  const html = String(input).trim();

  if (!html) return '';

  const firstHeadingIndex = html.search(/<h[2-4][^>]*>/i);

  if (firstHeadingIndex === -1) {
    return `<section class="article-section-block article-section-intro">${html}</section>`;
  }

  const sections = [];
  const intro = html.slice(0, firstHeadingIndex).trim();

  if (intro) {
    sections.push(`<section class="article-section-block article-section-intro">${intro}</section>`);
  }

  const remaining = html.slice(firstHeadingIndex);
  const chunks = remaining
    .split(/(?=<h[2-4][^>]*>)/i)
    .map(chunk => chunk.trim())
    .filter(Boolean);

  chunks.forEach(chunk => {
    sections.push(`<section class="article-section-block">${wrapSectionLead(chunk)}</section>`);
  });

  return sections.join('\n');
}

function wrapSectionLead(input = '') {
  return String(input).replace(
    /^(\s*<h[2-4][^>]*>[\s\S]*?<\/h[2-4]>\s*)(<p[\s\S]*?<\/p>)/i,
    '<div class="article-section-lead">$1$2</div>'
  );
}

hexo.extend.helper.register('editorial_summary', function (post, length = 180) {
  const source = post.description || post.excerpt || post.content || '';
  const text = stripMarkup(source);

  if (!text) return DEFAULT_SUMMARY;
  if (text.length <= length) return text;

  return `${text.slice(0, length).replace(/\s+\S*$/, '')}...`;
});

hexo.extend.helper.register('editorial_cover', function (post) {
  const explicit =
    post.hero_image ||
    post.cover ||
    post.thumbnail ||
    post.banner ||
    (Array.isArray(post.photos) && post.photos.length ? post.photos[0] : '');

  if (explicit) return explicit;

  const contentMatch = String(post.content || '').match(/<img[^>]+src=["']([^"']+)["']/i);
  if (contentMatch) return contentMatch[1];

  const theme = this.theme || {};
  const fallbacks = theme.fallback_images || [];

  if (!fallbacks.length) return '';

  const seed = hashSeed(post.slug || post.title || post.path || post._id || '');
  return fallbacks[seed % fallbacks.length];
});

hexo.extend.helper.register('editorial_pattern', function (page) {
  return page.pattern || page.article_pattern || 'freeform';
});

hexo.extend.helper.register('editorial_pattern_label', function (page) {
  const pattern = page.pattern || page.article_pattern || 'freeform';
  return PATTERN_LABELS[pattern] || PATTERN_LABELS.freeform;
});

hexo.extend.helper.register('editorial_render_body', function (page) {
  const pattern = page.pattern || page.article_pattern || 'freeform';

  if (pattern === 'article') {
    return wrapEditorialSections(page.content || '');
  }

  return String(page.content || '');
});

hexo.extend.helper.register('editorial_body_class', function (page) {
  const pattern = page.pattern || page.article_pattern || 'freeform';

  switch (pattern) {
    case 'article':
      return 'article-body pattern-article article-columns';
    case 'listicle':
      return 'article-body pattern-listicle';
    case 'roundup':
      return 'article-body pattern-roundup';
    case 'simple':
      return 'article-body pattern-simple';
    default:
      return 'article-body pattern-freeform';
  }
});
