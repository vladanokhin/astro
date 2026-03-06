# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

UINUX Blog — a static, writing-first blog built with Astro 5. Markdown/MDX content, file-based routing, minimal client-side JS (search only). Site URL: `https://uinuxblog.getuinux.com`.

## Commands

- `pnpm dev` — Start dev server at `http://localhost:4321`
- `pnpm build` — Production build to `dist/`
- `pnpm preview` — Preview production build locally

## Architecture

**Astro 5** with MDX integration. TypeScript strict mode (`astro/tsconfigs/strict`).

**Content system:** Astro Content Collections with glob loader. Posts live in `src/content/posts/` as `.md` or `.mdx` files. Schema defined in `src/content.config.ts` — three required frontmatter fields: `title` (string), `description` (string), `date` (date).

**Pages:**
- `src/pages/posts/[...slug].astro` — Dynamic post routes using `getStaticPaths()` with `post.id` as slug
- `src/pages/rss.xml.ts` — RSS feed endpoint
- `src/pages/search-index.json.ts` — Static JSON search index built at build time (strips markdown, used by client-side search)
- `src/pages/search.astro` — Client-side search page (the only page with JS)
- `src/pages/about.astro` — Static about page

**Components (6 total, intentionally minimal):**
- `Layout.astro` — Page shell with SEO meta (canonical URLs, Open Graph, Twitter Cards, JSON-LD), Google Fonts (Inter, Newsreader, JetBrains Mono), RSS link. Accepts `title`, `description`, `ogType`, `ogImage` props. Has a `head` slot for page-specific JSON-LD.
- `Article.astro` — Post wrapper with metadata display
- `Prose.astro` — Markdown content styling
- `Heading.astro`, `Nav.astro`, `Footer.astro`

**Styling:** Single `src/styles/global.css` with CSS custom properties (design tokens). 640px content width. Serif body (Newsreader), sans-serif headings (Inter), monospace code (JetBrains Mono).

**Environment variables:** Optional `PUBLIC_GOOGLE_SITE_VERIFICATION` for Google Search Console (see `.env.example`).

## Design Constraints

- No dark mode, no component library beyond the 6 components, no third-party SEO libraries
- No client-side JS except for the search page
- No tags, categories, or author fields in content model
