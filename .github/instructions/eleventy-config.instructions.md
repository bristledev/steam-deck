---
description: "Use when modifying Eleventy configuration: plugins, collections, filters, shortcodes, markdown setup, or build settings. Covers curriculum sort, custom Prism Fish language, chapterLink error behavior, and path prefix."
applyTo: "eleventy.config.js"
---

# Eleventy Configuration — SteamOS Unlocked

## Curriculum-Based Sort (not date)

The `posts` collection sorts by slug order in `src/_data/curriculum.json`, **not** by date. The flat slug list is built at config load time:

```js
const flatSlugs = curriculum.flatMap(m => m.slugs);
```

Posts whose slug is missing from `curriculum.json` sort to the end (index 999). If you add a new post, you **must** also add its slug to the correct phase in `curriculum.json` or it will appear last.

## chapterLink Filter — Throws on Missing

`chapterLink(posts, slug)` intentionally **throws** if the slug doesn't exist in the collection. This is a build-time safety net — never swallow this error or make it return a fallback. A broken link should break the build.

## Previous/Next Navigation

Chapter-to-chapter links come only from the layout: `base.njk` renders Previous/Next cards with `getPreviousCollectionItem` / `getNextCollectionItem` over `collections.posts`, so they follow the curriculum order automatically. There is no shortcode for this; don't add an inline "next chapter" link to posts.

## Custom Prism Fish Language

The syntax highlighter registers a custom `fish` language extending `bash` via `Prism.languages.extend`. If adding new Fish builtins or keywords:

- **Keywords** go in the `keyword` pattern (control flow: `if`, `for`, `function`, etc.)
- **Builtins** go in the `builtin` pattern (commands: `cd`, `echo`, `fish_add_path`, etc.)
- **Variables** match `$` prefix: `$variable`, `$?`, `$#`
- Prism's `bash` must load first (`require('prismjs/components/prism-bash')`) before extending.

## Path Prefix

The site deploys under `/steam-deck/`. This is set via `pathPrefix: "/steam-deck/"` and handled by `HtmlBasePlugin`. All internal URLs in templates are relative — the plugin rewrites them at build time. Do not hardcode `/steam-deck/` in templates or content.

## Markdown Configuration

- `html: true` — raw HTML allowed in markdown files.
- `linkify: true` — bare URLs auto-link.
- `markdown-it-github-alerts` — enables `> [!NOTE]`, `> [!TIP]`, etc.
- `markdown-it-anchor` — auto-generates heading permalink anchors.
- Tables render inside `<div class="table-wrap">` (custom `table_open`/`table_close` rules) so wide tables scroll sideways on small screens. Keep the wrapper if you change the renderer.

## Pass-Through Copies

Only two directories are passed through: `src/style.css` and `src/assets`. Add new pass-through entries here if static files need to appear in `_site/` unchanged.
