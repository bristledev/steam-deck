# GEMINI.md - SteamOS Unlocked Project Context

## Project Overview
**SteamOS Unlocked** is a multi-part blog and guide series for Steam Deck users, focusing on making the SteamOS environment accessible to beginners. It is built as a static site using the **Eleventy (11ty)** static site generator.

### Core Technologies
- **Framework:** [Eleventy (11ty)](https://www.11ty.dev/) (v3.1.5+)
- **Templating Engine:** [Nunjucks](https://mozilla.github.io/nunjucks/) (`.njk`)
- **Content Format:** [Markdown](https://daringfireball.net/projects/markdown/) (`.md`)
- **Styling:** Vanilla CSS
- **Build System:** Node.js / npm

## Project Structure
- `src/`: The main source directory for all site content.
  - `_data/`: Contains global data files like `metadata.cjs` for site-wide configuration.
  - `_includes/`: Holds layout templates (e.g., `base.njk`) and reusable components.
  - `posts/`: Contains the Markdown files for each part of the guide series.
  - `assets/`: Static assets such as images and SVGs.
  - `style.css`: The primary stylesheet for the project.
- `eleventy.config.js`: The central configuration file for 11ty, defining plugins, collections, and passthrough copies.
- `package.json`: Manages dependencies and defines build/development scripts.
- `_site/`: The output directory where the generated static site is stored (auto-generated).

## Building and Running
The following commands are defined in `package.json`:

- **Start Development Server:**
  ```bash
  npm run dev
  ```
  Runs `eleventy --serve` to start a local development server with live-reloading at `http://localhost:8080`.

- **Build for Production:**
  ```bash
  npm run build
  ```
  Generates the complete static site into the `_site/` directory.

- **Preview Site:**
  ```bash
  npm run preview
  ```
  Alias for the development server.

## Development Conventions

### Content Creation (Posts)
- All guide parts should be placed in `src/posts/`.
- Filenames follow the pattern `partN-topic.md` (e.g., `part1-intro.md`).
- Each post **must** include the following front matter:
  ```yaml
  ---
  layout: base.njk
  title: "Part X: Your Title Here"
  excerpt: "A short summary for the archive and home page."
  tags: posts
  ---
  ```
- The `eleventy.config.js` file includes a custom collection that automatically sorts posts numerically based on the `partN` prefix in their filename.

### Templating and Styling
- The main layout is `src/_includes/base.njk`. It includes a sidebar for chapter navigation and a pagination footer for posts.
- CSS is managed in `src/style.css` and is passed through directly to the output.
- The project uses 11ty plugins for RSS, navigation, syntax highlighting (via PrismJS), and asset bundling.

### Navigation
- The sidebar navigation is automatically populated from the `posts` collection.
- Active page highlighting is handled within the Nunjucks templates using the `page.url` variable.
