# Andrew Sasamori's portfolio

A small Jekyll site made from HTML, CSS, vanilla JavaScript, and Markdown. GitHub Pages
builds the Markdown posts into static HTML. The previous Next.js implementation remains
preserved in `app/` and the other original project files.

## Preview locally

Jekyll is already available on this machine:

```sh
jekyll serve
```

Open <http://127.0.0.1:4000>. The generated site is written to `_site/`.

Edit the root `index.html` for the homepage. The older `site/` directory is a preserved
draft and is excluded from Jekyll. Shared page chrome lives in `_layouts/default.html`.

## Add a blog post

Create `_posts/YYYY-MM-DD-post-title.md`:

```md
---
layout: post
title: Post title
date: 2026-07-13
description: A short description for search engines.
---

Post content goes here.
```

Jekyll's GitHub-flavored Markdown supports headings, tables, fenced code blocks, links,
images, GIFs, lists, blockquotes, and inline HTML. Put local media in `public/`.

## Refocus a gallery image

Start a plain local server from the repository root:

```sh
python3 -m http.server 8000
```

Open <http://localhost:8000/tools/image-focus.html>, choose a photo, and drag it inside
the circular preview. Copy the resulting `focus` value into the matching entry in
`gallery.js`. The `tools/` folder is excluded from the deployed site, so visitors cannot
change the crop.
