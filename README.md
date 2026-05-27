# Broadsheet Hexo Theme Demo ([Demo](https://broadsheet-blog.netlify.app/))

This project is a demo Hexo site for the local custom theme named `broadsheet`.

The posts, author names, URLs, images, and sample copy are intentionally demo material. They exist to show how the theme handles different article patterns, metadata, images, and homepage sections before the theme is used for a real publication.

## Stack

- `Hexo 8`
- `EJS` templates
- `Tailwind CSS 4`
- `Flowbite` for the homepage carousel behavior

## Requirements

- `Node.js` 20+
- `npm`

## Theme Installation

To use `broadsheet` in another Hexo site:

1. Copy or clone the theme into the target site's theme directory:

```text
themes/broadsheet/
```

2. Set the theme in the target site's root `_config.yml`:

```yaml
theme: broadsheet
```

3. Install the Hexo packages used by the theme:

```bash
npm install hexo-renderer-ejs hexo-renderer-marked hexo-generator-index hexo-generator-archive hexo-generator-category hexo-generator-tag
```

The theme ships with compiled CSS and the vendored carousel script:

```text
themes/broadsheet/source/css/generated.css
themes/broadsheet/source/js/flowbite.min.js
```

If you want to edit `themes/broadsheet/source/css/app.css`, install the CSS tooling and rebuild the generated file:

```bash
npm install -D tailwindcss @tailwindcss/cli flowbite
npm run build:css
```

## Demo Site Install

```bash
npm install
```

## Run

Start the local Hexo server:

```bash
npm run server
```

Default local URL:

```text
http://localhost:4000
```

If you want Tailwind to rebuild while you edit templates or styles, use a second terminal:

```bash
npm run watch:css
```

## Build

Generate the production site:

```bash
npm run build
```

Clear Hexo cache and generated output:

```bash
npm run clean
```

Output is written to:

```text
./public/
```

## Theme Release Notes

This repository commits the runtime assets needed by the demo theme:

- `./themes/broadsheet/source/css/generated.css`: compiled Tailwind CSS
- `./themes/broadsheet/source/js/flowbite.min.js`: vendored carousel runtime used by the homepage

Edit `./themes/broadsheet/source/css/app.css`, then run:

```bash
npm run build:css
```

Do not edit `generated.css` directly unless you are intentionally replacing the compiled output.

## Project Structure

```text
.
|- _config.yml
|- package.json
|- source/
|  `- _posts/
`- themes/
   `- broadsheet/
      |- _config.yml
      |- layout/
      |- scripts/
      `- source/
         |- css/
         |- images/
         `- js/
```

## Main Files

- `./_config.yml`: site-level Hexo config
- `./themes/broadsheet/_config.yml`: theme copy, labels, nav, fallback images, and theme SEO defaults
- `./themes/broadsheet/layout/`: page templates
- `./themes/broadsheet/layout/_partial/`: reusable template partials
- `./themes/broadsheet/scripts/helpers.js`: theme helper functions for summaries, cover images, and pattern handling
- `./themes/broadsheet/source/css/app.css`: Tailwind source and custom component styles
- `./themes/broadsheet/source/css/generated.css`: compiled CSS output

## Commands

- `npm run server`: build CSS, then start Hexo locally
- `npm run watch:css`: watch and rebuild CSS
- `npm run build`: build CSS and generate the static site
- `npm run clean`: clear Hexo cache and generated files

## Content Authoring

Posts live in:

```text
./source/_posts/
```

Create a new post:

```bash
npx hexo new "Post Title"
```

Recommended front matter:

```yaml
---
title: Example Post
date: 2026-04-29 12:00:00
description: Short summary for listings and metadata.
categories:
  - essays
tags:
  - notes
pattern: article
featured: false
hero_image: /images/example.jpg
---
```

Useful fields:

- `description`: used for summaries and SEO description when present
- `featured: true`: allows a post to be selected for the homepage lead slot
- `hero_image`: used for metadata and listing images
- `pattern`: selects the rendering structure for the article body

If no explicit image is set, the theme tries this order:

1. `hero_image`
2. `cover`
3. `thumbnail`
4. `banner`
5. first image found in the post body
6. fallback image from theme config

## Body Patterns

The theme supports five body patterns:

- `article`
- `listicle`
- `roundup`
- `simple`
- `freeform`

### `article`

Use for longer reviews, essays, and reported pieces.

Behavior:

- one column on smaller screens
- two columns on wider screens
- each heading is kept with its first paragraph in column flow
- paragraphs, figures, lists, and blockquotes avoid splitting mid-item
- sections are detected from `##`, `###`, and `####` headings

Author normally in Markdown:

```md
Opening paragraphs.

## First Section

Text for the first section.

## Second Section

More text.
```

### `listicle`

Use for rankings, checklists, guides, or long item-by-item features.

Behavior:

- each entry is a vertical section separated from the next
- entries can include numbered or unnumbered headings
- entries can include images, metadata rows, code snippets, lists, and paragraphs
- content stays in the order you write it

Recommended structure:

```html
<section class="listicle-entry">
  <div>
    <h2>1. Item Title</h2>
    <div class="listicle-meta">
      <span>Optional detail</span>
    </div>
    <p>First paragraph.</p>
    <figure class="listicle-poster">
      <img src="/images/example.jpg" alt="Example image">
    </figure>
    <p>Second paragraph.</p>
  </div>
</section>
```

### `roundup`

Use for grouped short features or collections of compact sections.

Behavior:

- blocks stack vertically in column flow
- each block can contain its own image
- blocks do not require equal row heights

Recommended structure:

```html
<div class="roundup-grid">
  <section class="roundup-card">
    <h2>Topic Title</h2>
    <p>Paragraph one.</p>
    <p>Paragraph two.</p>
  </section>

  <section class="roundup-card">
    <img src="/images/example.jpg" alt="Inset image">
    <h2>Another Topic</h2>
    <p>Short write-up.</p>
  </section>
</div>
```

Compatibility aliases still exist in CSS:

- `.topic-grid`
- `.topic-card`

Use `roundup-grid` and `roundup-card` for new content.

### `simple`

Use for standard posts with a little structure control.

Available helper classes:

- `.simple-wide`
- `.simple-split`
- `.simple-split reverse`
- `.simple-image-side`
- `.simple-image-side-left`
- `.simple-image-side-right`

For a reversed split, put the media first and the text second:

```html
<section class="simple-split reverse">
  <figure>
    <img src="/images/example.jpg" alt="Example image">
  </figure>
  <div>
    <h2>Text Section</h2>
    <p>Paragraph content goes here.</p>
  </div>
</section>
```

### `freeform`

Use when you mostly want ordinary Markdown with the shared page framing and metadata handling.

## How The Theme Works

`./themes/broadsheet/scripts/helpers.js` provides the main theme helpers:

- `editorial_summary(post, length)`: builds trimmed summaries for listings and metadata
- `editorial_cover(post)`: resolves the best image for a post
- `editorial_pattern(page)`: gets the pattern for the page
- `editorial_pattern_label(page)`: returns the label used in the page metadata panel
- `editorial_render_body(page)`: wraps `article` sections and keeps each heading with its first paragraph
- `editorial_body_class(page)`: maps a post pattern to the correct body class string

## CSS Build

Source CSS:

```text
./themes/broadsheet/source/css/app.css
```

Compiled CSS:

```text
./themes/broadsheet/source/css/generated.css
```

Build command:

```bash
tailwindcss -i ./themes/broadsheet/source/css/app.css -o ./themes/broadsheet/source/css/generated.css --minify
```

## SEO

SEO output is generated in:

- `./themes/broadsheet/layout/_partial/head.ejs`
- `./themes/broadsheet/layout/_partial/seo-json-ld.ejs`

Included metadata:

- page title
- canonical URL
- meta description
- keywords
- author
- robots
- Open Graph tags
- Twitter card tags

Structured data:

- `Blog` on the homepage
- `CollectionPage` on archive-like pages
- `BlogPosting` on post pages

Description priority:

1. `page.description`
2. generated summary from content
3. `config.description`
4. `theme.seo.description`

Image priority:

1. `hero_image`
2. `cover`
3. `thumbnail`
4. `banner`
5. first image in the post body
6. theme fallback image

Canonical URLs are built from:

- `config.url`
- the current page path

Before deployment, update at minimum:

- `title`
- `description`
- `keywords`
- `author`
- `url`
- `timezone`

## Sample Posts

Current examples in `./source/_posts/`:

- `Broadsheet Pattern Guide`: `listicle`
- `Broadsheet Setup Guide`: `freeform`
- `Three Buildings`: `simple`
- `A New Era of Music Is Here`: `simple`
- `Two Wheels Over Four`: `article`
- `Insectes by Emile-Allain Seguy`: `roundup`

## Deployment Checklist

Before publishing:

1. Update `./_config.yml` with the real site URL and metadata.
2. Update `./themes/broadsheet/_config.yml` with final copy and theme-level defaults.
3. Replace sample posts and placeholder images as needed.
4. Run `npm run clean`.
5. Run `npm run build`.

## Screenshots

![Broadsheet homepage](./screenshots/broadsheet-blog.netlify.app.jpg)

![Music article](./screenshots/broadsheet-blog.netlify.app_a-new-era-of-music-is-here_.jpg)

![Insectes article](./screenshots/broadsheet-blog.netlify.app_emile-allain-seguy-insectes-plates_.jpg)

![Two Wheels Over Four article](./screenshots/broadsheet-blog.netlify.app_two-wheels-over-four_.jpg)
