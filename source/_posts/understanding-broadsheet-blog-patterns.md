---
title: "Broadsheet Pattern Guide"
date: 2026-05-24 12:00:00
tags:
  - patterns
  - theme
  - how-to
categories:
  - guides
pattern: listicle
description: A practical listicle guide to the post layout patterns included with the Broadsheet Hexo theme, with usage notes, starter snippets, and switching advice.
---

<section class="pattern-guide-intro">
<h2>Making a Post</h2>
<p>Posts live in <code>source/_posts/</code> as Markdown files. Each post starts with front matter, then the body can be normal Markdown, raw HTML, or a mix of both. Use Markdown for prose and quick posts; use HTML blocks when a pattern needs exact wrappers such as cards, split sections, or list entries.</p>
<p class="pattern-guide-subhead">Create, build, and run</p>
{% codeblock lang:bash %}
npx hexo new "My New Post"
npm run build
npm run server
{% endcodeblock %}
<p>The new file appears in <code>source/_posts/</code>. Add <code>pattern: article</code>, <code>pattern: listicle</code>, <code>pattern: roundup</code>, <code>pattern: simple</code>, or <code>pattern: freeform</code> in front matter to choose the layout.</p>
</section>

<div class="pattern-guide">
<section class="listicle-entry">
<div>
<h2 class="pattern-guide-title"><span>1.</span> Article</h2>
<div class="listicle-meta">
<span>Front matter: pattern: article</span>
<span>Body class: pattern-article article-columns</span>
</div>
<p>The article pattern is for posts where the main experience is reading. It is the right choice for essays, reviews, reported features, criticism, and long-form commentary.</p>
<p>On wider screens, the article body flows into two columns. Headings become natural section breaks, and the renderer keeps each heading with its first paragraph so a subheading is not stranded at the bottom of a column.</p>
<p class="pattern-guide-subhead">Use it when</p>
<ul class="pattern-guide-list">
<li>The post is mostly prose.</li>
<li>The article needs a serious editorial rhythm.</li>
<li>You want headings to divide a long piece into readable sections.</li>
<li>Images should sit inside the reading flow rather than become separate cards.</li>
</ul>
<p class="pattern-guide-subhead">Minimal front matter</p>
{% codeblock lang:yaml %}
---
title: "A Long Review"
date: 2026-05-01 10:00:00
pattern: article
categories:
  - reviews
tags:
  - film
  - review
---
{% endcodeblock %}
<p class="pattern-guide-subhead">Body shape</p>
{% codeblock lang:markdown %}
Opening paragraph for the article.

## First Section

Several paragraphs of prose.

## Second Section

More prose, with optional images or blockquotes.
{% endcodeblock %}
<p>Move from <code>freeform</code> to <code>article</code> when the post gets long enough that headings and column flow would help. Move from <code>article</code> to <code>simple</code> when the post needs more manual layout control than continuous prose.</p>
<p><a href="/2026/05/23/two-wheels-over-four/">View example: Article on Two Wheels Over Four</a></p>
</div>
</section>
<section class="listicle-entry">
<div>

<h2 class="pattern-guide-title"><span>2.</span> Listicle</h2>
<div class="listicle-meta">
<span>Front matter: pattern: listicle</span>
<span>Body class: pattern-listicle</span>
</div>
<p>The listicle pattern is for posts built from repeated vertical entries. Each entry is a separated section, and the content inside it stays in the order you write it.</p>
<p>Use it like a list of freeform blocks: an entry can have a numbered title, an unnumbered title, metadata, images, code snippets, lists, or just paragraphs. The theme keeps each entry linear and does not force a special desktop layout.</p>
<p class="pattern-guide-subhead">Use it when</p>
<ul class="pattern-guide-list">
<li>The article is naturally divided into items.</li>
<li>Each item needs its own heading and explanation.</li>
<li>You want a ranking, guide, checklist, comparison, or ordered collection.</li>
<li>You want each item to have freedom without becoming a masonry card layout.</li>
</ul>
<p class="pattern-guide-subhead">Flexible entries</p>
{% codeblock lang:html %}
<div class="pattern-guide">
  <section class="listicle-entry">
    <div>
      <h2>1. Numbered Entry</h2>
      <div class="listicle-meta">
        <span>Optional detail</span>
      </div>
      <p>Entry description goes here.</p>
      <figure class="listicle-poster">
        <img src="/images/example.jpg" alt="Example image">
      </figure>
      <p>More notes can follow the image.</p>
    </div>
  </section>

  <section class="listicle-entry">
    <div>
      <h2>Unnumbered Entry</h2>
      <p>This entry has no rank and no image.</p>
    </div>
  </section>
</div>
{% endcodeblock %}
<p>Move from <code>article</code> to <code>listicle</code> when headings have become independent entries. Move from <code>listicle</code> to <code>roundup</code> when the entries are short cards rather than full sections.</p>
<p><a href="/2026/05/24/understanding-broadsheet-blog-patterns/">View example: Broadsheet Pattern Guide</a></p>
</div>
</section>
<section class="listicle-entry">
<div>

<h2 class="pattern-guide-title"><span>3.</span> Roundup</h2>
<div class="listicle-meta">
<span>Front matter: pattern: roundup</span>
<span>Body class: pattern-roundup</span>
</div>
<p>The roundup pattern is for collections where every item is compact and independent. It is less like an essay and more like a page of clipped notes, plates, recommendations, or short observations.</p>
<p>The main wrapper is <code>roundup-grid</code>, and each item uses <code>roundup-card</code>. The grid uses CSS columns, so cards stack in a masonry-like flow instead of lining up in strict rows.</p>
<p class="pattern-guide-subhead">Use it when</p>
<ul class="pattern-guide-list">
<li>Each item is short.</li>
<li>Items may have uneven heights.</li>
<li>The post is a gallery, archive, recommendation set, or collection.</li>
<li>You do not need a long explanation for every item.</li>
</ul>
<p class="pattern-guide-subhead">Minimal markup</p>
{% codeblock lang:html %}
<div class="roundup-grid">
  <section class="roundup-card">
    <h2>Card Title</h2>
    <p>Short card text.</p>
  </section>

  <section class="roundup-card">
    <img src="/images/example.jpg" alt="Example image">
    <h2>Image Card</h2>
  </section>
</div>
{% endcodeblock %}
<p class="pattern-guide-subhead">How it differs from listicle</p>
<p>A listicle entry is a complete section. A roundup card is a compact item. If each item needs several paragraphs, use <code>listicle</code>. If each item only needs a title, image, and short note, use <code>roundup</code>.</p>
<p>Move from <code>simple</code> to <code>roundup</code> when the post becomes a group of cards. Move from <code>roundup</code> to <code>listicle</code> when each card starts needing a full explanation.</p>
<p><a href="/2026/05/21/emile-allain-seguy-insectes-plates/">View example: Insectes by Emile-Allain Seguy</a></p>
</div>
</section>
<section class="listicle-entry">
<div>

<h2 class="pattern-guide-title"><span>4.</span> Simple</h2>
<div class="listicle-meta">
<span>Front matter: pattern: simple</span>
<span>Body class: pattern-simple</span>
</div>
<p>The simple pattern is the middle ground. It keeps normal post flow, but gives you helper classes for side-by-side sections, reversed splits, wide blocks, and image placement.</p>
<p>Use it when a post is not long enough for the article pattern, but still needs more control than plain Markdown.</p>
<p class="pattern-guide-subhead">Use it when</p>
<ul class="pattern-guide-list">
<li>The post has mixed text and images.</li>
<li>You want one or two side-by-side sections.</li>
<li>The writing should stay simple and direct.</li>
<li>You need layout helpers without committing to a full listicle or roundup.</li>
</ul>
<p class="pattern-guide-subhead">Split section</p>
{% codeblock lang:html %}
<section class="simple-split">
  <div>
    <h2>Text Section</h2>
    <p>Paragraph content goes here.</p>
  </div>
  <figure>
    <img src="/images/example.jpg" alt="Example image">
  </figure>
</section>
{% endcodeblock %}
<p class="pattern-guide-subhead">Reverse split</p>
{% codeblock lang:html %}
<section class="simple-split reverse">
  <figure>
    <img src="/images/example.jpg" alt="Example image">
  </figure>
  <div>
    <h2>Second Section</h2>
    <p>More text.</p>
  </div>
</section>
{% endcodeblock %}
<p>Move from <code>freeform</code> to <code>simple</code> when plain Markdown starts needing layout helpers. Move from <code>simple</code> to <code>article</code> when the post becomes mainly long-form prose.</p>
<p><a href="/2026/05/26/a-new-era-of-music-is-here/">View example: Blog on New Music Movement</a></p>
</div>
</section>
<section class="listicle-entry">
<div>

<h2 class="pattern-guide-title"><span>5.</span> Freeform</h2>
<div class="listicle-meta">
<span>Front matter: pattern: freeform</span>
<span>Body class: pattern-freeform</span>
</div>
<p>The freeform pattern is the least opinionated option. It keeps the Broadsheet post frame, metadata, sidebar, and typography, but does not apply a specialized content structure.</p>
<p>It is also the fallback when no pattern is provided, which makes it the safest starting point for new posts.</p>
<p class="pattern-guide-subhead">Use it when</p>
<ul class="pattern-guide-list">
<li>The post is short.</li>
<li>You want normal Markdown behavior.</li>
<li>The post is documentation, a note, a changelog, or a placeholder.</li>
<li>You are not sure yet which pattern the content needs.</li>
</ul>
<p class="pattern-guide-subhead">Minimal post</p>
{% codeblock lang:yaml %}
---
title: "Weekend Notes"
date: 2026-05-01 10:00:00
pattern: freeform
tags:
  - notes
---

This is a normal Markdown post.

## A Section

More text here.
{% endcodeblock %}
<p class="pattern-guide-subhead">When to change it</p>
<p>Change <code>freeform</code> to <code>simple</code> if you need split sections. Change it to <code>article</code> if it becomes a long essay. Change it to <code>listicle</code> or <code>roundup</code> if the content becomes a collection of repeated items.</p>
<p><a href="/2026/05/25/getting-started-with-broadsheet/">View example: Broadsheet Setup Guide</a></p>
</div>
</section>
</div>

<section class="pattern-guide-summary">
<h2>Choosing quickly</h2>
<p>Start with <code>freeform</code>. If the post stays simple, leave it there.</p>
<p>Choose <code>simple</code> when you need a few layout helpers.</p>
<p>Choose <code>article</code> when the writing becomes a long-form reading piece.</p>
<p>Choose <code>listicle</code> when the article is a sequence of substantial repeated entries.</p>
<p>Choose <code>roundup</code> when the post is a collection of compact cards.</p>
</section>
