---
title: Broadsheet Setup Guide
date: 2026-05-25 12:00:00
description: A complete guide to setting up and using the Broadsheet Hexo blog theme, from installation to deployment.
tags:
  - setup
  - hexo
  - tutorial
categories:
  - guides
pattern: freeform
featured: false
---

Welcome to Broadsheet, a custom Hexo theme designed for thoughtful blogging. This guide will walk you through everything you need to get started, from initial setup to publishing your first posts.

## Prerequisites

Before diving in, make sure you have the right tools:

- **Node.js 20+**: Broadsheet requires a modern Node.js version. You can download it from [nodejs.org](https://nodejs.org/).
- **npm**: This comes bundled with Node.js, so you're all set.
- **Git**: Optional but recommended for version control and deployment.

## Installation

Start by cloning or downloading the Broadsheet project. If you're reading this, you probably already have it set up, but here's the process:

```bash
# Clone the repository (if available)
git clone <repository-url> my-blog
cd my-blog

# Or download and extract the zip file
# Then navigate to the project directory

# Install dependencies
npm install
```

This will install Hexo and all the necessary packages defined in `package.json`.

## Project Structure

Once installed, your project should look like this:

```
.
├── _config.yml              # Site configuration
├── package.json             # Node.js dependencies
├── source/
│   └── _posts/              # Your blog posts go here
└── themes/
    └── Broadsheet/             # The custom theme
        ├── _config.yml      # Theme configuration
        ├── layout/          # EJS templates
        ├── scripts/         # Helper functions
        └── source/          # CSS, JS, images
```

## Configuration

### Site Configuration

Edit `_config.yml` in the root directory to set up your basic site information:

```yaml
# Site
title: Your Blog Title
subtitle: Your tagline here
description: A brief description of your blog
author: Your Name
language: en
timezone: America/New_York

# URL
url: https://yourblog.com
root: /
permalink: :year/:month/:day/:title/
```

### Theme Configuration

Customize the theme by editing `themes/Broadsheet/_config.yml`:

```yaml
# Theme settings
seo:
  title: Your Blog Title
  description: Your blog description
  keywords: blog, writing, thoughts

# Navigation
nav:
  - name: Home
    url: /
  - name: About
    url: /about

# Social links, fallback images, etc.
```

## Creating Content

### New Posts

Create a new post with Hexo's built-in command:

```bash
npx hexo new "My First Post"
```

This generates a new Markdown file in `source/_posts/` with basic front matter.

### Front Matter

Every post needs front matter at the top:

```yaml
---
title: My First Post
date: 2026-05-01 12:00:00
description: A short summary for SEO and listings
categories:
  - personal
tags:
  - thoughts
  - first-post
pattern: article  # Choose from: article, listicle, roundup, simple, freeform
featured: false
hero_image: /images/my-post.jpg
---
```

### Writing Patterns

Broadsheet supports five content patterns:

- **article**: Multi-column layout for long-form content, with each section heading kept beside its first paragraph
- **listicle**: Vertical repeated sections for rankings, checklists, guides, and itemized posts
- **roundup**: Card-based collections
- **simple**: Standard blog posts with layout helpers
- **freeform**: Plain Markdown (default)

Choose the pattern that best fits your content structure.

A listicle entry is just a vertical section. You can number the heading or leave it unnumbered, and the content stays in the order you write it:

```html
<section class="listicle-entry">
  <div>
    <h2>1. Item Title</h2>
    <div class="listicle-meta">
      <span>Optional detail</span>
    </div>
    <p>Entry text.</p>
    <figure class="listicle-poster">
      <img src="/images/example.jpg" alt="Example image">
    </figure>
  </div>
</section>
```

## Development Workflow

### Local Development

Start the development server:

```bash
npm run server
```

This builds the CSS and starts Hexo locally. Visit `http://localhost:4000` to see your site.

### CSS Development

Broadsheet uses Tailwind CSS. For live reloading during style development:

```bash
npm run watch:css
```

This watches `themes/Broadsheet/source/css/app.css` and rebuilds `generated.css` automatically.

### Building for Production

Generate the static site:

```bash
npm run build
```

Output goes to the `public/` directory, ready for deployment.

### Cleaning Cache

Clear Hexo's cache and generated files:

```bash
npm run clean
```

## Deployment

### Manual Deployment

After building, upload the contents of `public/` to your web server.

### Automated Deployment

For platforms like Netlify, Vercel, or GitHub Pages, you can set up automatic builds. Most services can run `npm run build` as the build command.

### GitHub Pages Example

1. Push your source code to GitHub
2. Enable GitHub Pages in repository settings
3. Set the source to "GitHub Actions"
4. Create a workflow file `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./public
```

## Advanced Usage

### Custom Helpers

Broadsheet provides several helper functions in `themes/Broadsheet/scripts/helpers.js`:

- `editorial_summary(post, length)`: Generate summaries
- `editorial_cover(post)`: Resolve post images
- `editorial_pattern(page)`: Get pattern type
- `editorial_body_class(page)`: Get CSS classes

### Theme Customization

Modify templates in `themes/Broadsheet/layout/` (EJS files), styles in `themes/Broadsheet/source/css/app.css`, or add custom scripts in `themes/Broadsheet/source/js/`.

### SEO and Metadata

Broadsheet automatically generates:

- Meta descriptions and keywords
- Open Graph and Twitter card tags
- Structured data (JSON-LD)
- Canonical URLs

Configure SEO settings in the theme config.

## Troubleshooting

### Common Issues

**CSS not updating**: Run `npm run watch:css` in a separate terminal during development.

**Posts not appearing**: Check front matter dates and run `npm run clean` then rebuild.

**Images not loading**: Ensure paths are correct and files exist in `themes/Broadsheet/source/images/`.

**Build failing**: Check for syntax errors in Markdown or template files.

### Getting Help

If you run into issues:

1. Check the Hexo documentation: https://hexo.io/docs/
2. Review the Broadsheet README for theme-specific details
3. Search existing issues or create a new one in the project repository

## Next Steps

Now that you're set up:

1. Create your first post
2. Customize the theme configuration
3. Set up deployment
4. Start writing!

Broadsheet is designed to be flexible yet opinionated, giving you powerful tools while keeping the focus on your content. Happy blogging!
