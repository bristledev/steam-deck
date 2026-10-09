# SteamOS Unlocked — Copilot Instructions

An Eleventy 3 blog (curriculum-driven, not date-driven) teaching Linux/SteamOS to beginners.

## Quick Reference

| Task | Command |
|------|---------|
| Dev server | `npm run dev` |
| Production build | `npm run build` |
| Search index only | `npm run build:search` |

Build output: `_site/`. Path prefix: `/steam-deck/`.

## Architecture

```
src/
  _data/
    curriculum.json   ← Phase ordering (determines post sort, NOT date)
    metadata.cjs      ← Global site metadata
  _includes/
    base.njk          ← Single layout for all pages
  posts/*.md          ← Blog content (35 posts)
  assets/             ← Images referenced from posts, and the favicon
  style.css           ← All styling (CSS custom properties, no framework)
  index.njk           ← Home page
  about.njk           ← About page
  posts.njk           ← Archive listing
  search-json.njk     ← Generates /search.json for pagefind
eleventy.config.js    ← Plugins, collections, filters, shortcodes
```

## Content Model

### Post frontmatter

```yaml
---
layout: base.njk
title: "Post Title"
excerpt: "Short description for search and previews"
tags: posts
---
```

- **`tags: posts`** is required — it adds the post to the `posts` collection.
- Posts are sorted by their order in `curriculum.json`, **not** by date.
- There is a single layout (`base.njk`) — no layout hierarchy.

### Curriculum structure (`src/_data/curriculum.json`)

Phases 1–10 + Appendices. Each phase has an ordered list of post slugs. Adding a new post requires:
1. Create `src/posts/<slug>.md` with the frontmatter above.
2. Add the slug to the appropriate phase in `curriculum.json`.

## Key Conventions

- **Template engine**: Nunjucks (`.njk`) for layouts/pages, Nunjucks-in-Markdown for posts.
- **Markdown**: markdown-it with `markdown-it-github-alerts` (GitHub-style admonitions via `> [!NOTE]`, `> [!TIP]`, etc.) and `markdown-it-anchor` (heading permalinks).
- **Syntax highlighting**: Prism.js via `@11ty/eleventy-plugin-syntaxhighlight`. Includes custom Fish shell language support.
- **Styling**: Pure CSS with custom properties. Four themes (dark/light/sepia/matrix) toggled at runtime, persisted in localStorage. Fonts: Space Grotesk (headings), JetBrains Mono (code).
- **Search**: Pagefind runs post-build (`pagefind --site _site`), indexing all HTML. Themed via CSS variables.
- **Navigation**: Sidebar built from `curriculum.json` phases. Previous/Next links via Eleventy's `getPreviousCollectionItem`/`getNextCollectionItem`.

## Custom Filters & Shortcodes

| Name | Type | Purpose |
|------|------|---------|
| `readableDate` | Filter | Format dates via Luxon |
| `readingTime` | Filter | Word count ÷ 200 wpm |
| `chapterLink` | Filter | Create link to post by slug (throws on missing) |
| `findBySlug` | Filter | Look up post object by slug |

## Writing Style

Content targets absolute Linux beginners on the Steam Deck. Use clear, jargon-free language when possible. When technical terms are unavoidable, define them inline.

The full rules live in `.github/instructions/content-writing.instructions.md`: a calm, specific voice; no AI-sounding prose (hype words, formulaic constructions, invented numbers); verified, sourced claims about SteamOS; and the formatting conventions.
