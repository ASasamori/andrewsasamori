# Andrew Sasamori's portfolio

The primary site is a small Jekyll portfolio made from HTML, CSS, vanilla JavaScript, and
Markdown. Vercel builds it into static HTML and serves it at
<https://andrewsasamori.org>. The previous Next.js portfolio is preserved in `.archive/`.

## Files you normally edit

- `index.html`: homepage copy and its markup
- `_layouts/default.html`: shared header and outer page structure
- `styles.css`: all visual styling
- `_posts/`: blog posts named `YYYY-MM-DD-post-title.md`

Less frequent changes:

- `gallery.js`: gallery images, captions, and focal points
- `_config.yml`: site title, domain, Markdown, permalink, and build settings
- `_layouts/post.html`: shared blog article structure
- `blogs.html`: blog index structure
- `assets/`: gallery and post media

Do not edit `_site/`; Jekyll regenerates it.

## Preview the minimalist site

```sh
bundle install
bundle exec jekyll serve
```

Open <http://127.0.0.1:4000>. Changes to normal pages, layouts, CSS, and posts are watched
automatically. Restart the command after changing `_config.yml`.

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
images, GIFs, lists, blockquotes, and inline HTML. Put local media in `assets/`.

## Refocus a gallery image

From the repository root, run:

```sh
python3 -m http.server 8000
```

Open <http://localhost:8000/tools/image-focus.html>, choose a photo, and drag it inside
the circular preview. Copy the resulting `focus` value into the matching `gallery.js`
entry. The `tools/` directory is excluded from the deployed site.

## Deploy or redo the cutover

The GitHub repository's `main` branch is connected to the existing Vercel project that
owns `andrewsasamori.org`. Vercel detects the root `Gemfile` as Jekyll, builds `_site/`,
and keeps the already-attached domain. No DNS change is required for this in-place cutover.

For a future deployment:

1. Run `bundle exec jekyll build` and inspect `_site/` locally.
2. Run `bundle exec jekyll serve` and check the homepage, `/blogs/`, and a post.
3. Commit the source files; `_site/` remains ignored.
4. Push `main` to GitHub.
5. In Vercel, open the project and confirm the newest production deployment succeeds.
6. Visit `https://andrewsasamori.org` in a private window to avoid an old browser cache.

If the domain is ever detached or moved to a new Vercel project:

1. Open the new project in Vercel and select **Settings → Domains**.
2. Add `andrewsasamori.org` and `www.andrewsasamori.org`.
3. At the DNS provider, point the apex domain to Vercel's displayed A record and `www` to
   Vercel's displayed CNAME. Use the values shown by Vercel rather than copying old ones.
4. Wait for Vercel to show **Valid Configuration** and provision HTTPS.
5. Choose the preferred domain and redirect the other hostname to it in Vercel.

The current DNS already points to Vercel, so those DNS steps are documentation for a
future migration rather than part of this deployment.

## Run or restore the archived site

See [`.archive/README.md`](.archive/README.md). In short:

```sh
cd .archive
corepack pnpm install
corepack pnpm dev
```
