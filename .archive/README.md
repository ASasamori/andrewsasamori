# Legacy Next.js portfolio

This directory contains the complete portfolio that previously ran at
`andrewsasamori.org`. It was moved here without changing its application structure.

## Run the archived site

From the repository root:

```sh
cd .archive
corepack pnpm install
corepack pnpm dev
```

Open <http://localhost:3000>.

On the original development machine, the existing `node_modules/` directory was moved
here too, so `npm run dev` also works without reinstalling. Dependencies are intentionally
not committed to Git; a fresh clone must run the install step above first.

To verify its production build:

```sh
cd .archive
corepack pnpm build
```

## Restore this version as the primary site

1. Make a backup branch before moving files.
2. Move the current Jekyll files into another archive directory.
3. Move everything in this directory except this README and ignored build artifacts back
   to the repository root.
4. Move `.archive/node_modules`, `.archive/.next`, and `.archive/.pnpm-store` only if you
   want to preserve the local caches; otherwise reinstall dependencies.
5. Run `corepack pnpm build` from the repository root.
6. Commit and push. The connected Vercel project will detect Next.js again and deploy it.

The old content is organized as it was originally:

- `app/`: Next.js pages, layouts, and components
- `data/`: project and Digital Garden Markdown
- `public/`: images, icons, transcripts, and PDFs
- `package.json` and `pnpm-lock.yaml`: dependencies and commands
- `middleware.ts`: locale routing

The `previous-static-draft/` subdirectory contains an abandoned intermediate static-site
experiment. It is not needed to run the archived Next.js portfolio.
