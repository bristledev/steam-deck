import pluginRss from "@11ty/eleventy-plugin-rss";
import pluginNavigation from "@11ty/eleventy-navigation";
import { HtmlBasePlugin } from "@11ty/eleventy";
import pluginBundle from "@11ty/eleventy-plugin-bundle";
import pluginSyntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import markdownIt from "markdown-it";
import markdownItGithubAlerts from "markdown-it-github-alerts";
import markdownItAnchor from "markdown-it-anchor";
import pluginToc from "eleventy-plugin-toc";
import { DateTime } from "luxon";
import fs from "fs";
import path from "path";
import { createRequire } from "module";
const require = createRequire(import.meta.url);

const curriculumPath = path.join(process.cwd(), "src", "_data", "curriculum.json");
const curriculum = JSON.parse(fs.readFileSync(curriculumPath, "utf-8"));
const flatSlugs = curriculum.flatMap(m => m.slugs);

export default function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/style.css");
  eleventyConfig.addPassthroughCopy("src/assets");
  
  // Plugins
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(pluginNavigation);
  eleventyConfig.addPlugin(HtmlBasePlugin);
  eleventyConfig.addPlugin(pluginBundle);
  eleventyConfig.addPlugin(pluginToc, {
    tags: ['h2', 'h3'],
    wrapper: 'div'
  });
  eleventyConfig.addPlugin(pluginSyntaxHighlight, {
    preAttributes: { tabindex: 0 },
    init: function({ Prism }) {
      // Load bash first, then register Fish shell as a custom language
      require('prismjs/components/prism-bash');
      Prism.languages.fish = Prism.languages.extend('bash', {
        'keyword': /\b(?:if|else|switch|case|while|for|in|function|end|begin|return|break|continue|set|set_color|emit|source|status|test|not|and|or|builtin|command|exec|true|false|argparse|string|math|read|count|contains|type|abbr)\b/,
        'builtin': /\b(?:cd|echo|printf|pwd|exit|eval|bind|complete|funced|funcsave|functions|history|isatty|jobs|disown|fg|bg|wait|ulimit|umask|random|time|fish_add_path|fish_config|fish_greeting|fish_prompt|fish_right_prompt|fish_indent|fish_key_reader|fish_opt|fish_update_completions)\b/,
        'variable': /\$[\w?#]+/,
      });
    }
  });

  // Filters
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("LLLL d, yyyy");
  });
  eleventyConfig.addFilter("readingTime", (text) => {
    const words = text ? text.split(/\s+/).length : 0;
    const minutes = Math.ceil(words / 200);
    return `${minutes} Min Read`;
  });

  // Markdown Library
  const mdOptions = {
    html: true,
    breaks: true,
    linkify: true
  };
  const mdLib = markdownIt(mdOptions)
    .use(markdownItGithubAlerts)
    .use(markdownItAnchor, {
      permalink: markdownItAnchor.permalink.headerLink({ safariReaderFix: true })
    });
  eleventyConfig.setLibrary("md", mdLib);

  // Tag all posts with "posts" automatically
  eleventyConfig.addCollection("posts", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/posts/*.md").sort((a, b) => {
      const idxA = flatSlugs.indexOf(a.fileSlug);
      const idxB = flatSlugs.indexOf(b.fileSlug);
      return (idxA !== -1 ? idxA : 999) - (idxB !== -1 ? idxB : 999);
    });
  });

  eleventyConfig.addFilter("chapterLink", (posts, slug) => {
    const post = (posts || []).find(p => p.fileSlug === slug);
    if (post) {
      return `<a href="${post.url}"><strong>${post.data.title}</strong></a>`;
    }
    throw new Error(`[chapterLink filter] Broken Link: Could not find post with slug '${slug}'`);
  });

  eleventyConfig.addFilter("findBySlug", (posts, slug) => {
    return (posts || []).find(p => p.fileSlug === slug);
  });

  eleventyConfig.addShortcode("next_chapter", function() {
    // Determine current post slug
    const currentSlug = this.page.fileSlug;
    const currentIndex = flatSlugs.indexOf(currentSlug);
    if (currentIndex !== -1 && currentIndex < flatSlugs.length - 1) {
       const nextSlug = flatSlugs[currentIndex + 1];
       // We can't access `collections.posts` easily in a shortcode without passing arguments,
       // but we know the title if we look it up, OR we can just use the shortcode to generate a markdown string.
       // However, to get the actual post title, shortcodes do not have access to collections natively unless bound.
       // Wait, a Nunjucks specific shortcode might have context, but an easier way is a Nunjucks global or filter. 
       // Wait, we can pass `collections.posts` to the shortcode, but that means doing `{% next_chapter collections.posts %}`.
       // It's cleaner to provide the title. Let's read the markdown file for the nextSlug.
       const nextPath = path.join(process.cwd(), "src", "posts", `${nextSlug}.md`);
       if (fs.existsSync(nextPath)) {
          const content = fs.readFileSync(nextPath, "utf-8");
          const titleMatch = content.match(/title:\s*"?([^"\n]+)"?/);
          const nextTitle = titleMatch ? titleMatch[1].trim() : nextSlug;
          return `Next we'll look at **[${nextTitle}](/posts/${nextSlug}/)**!`;
       }
    }
    return "";
  });

  return {
    pathPrefix: "/steam-deck/",
    markdownTemplateEngine: "njk",
    dir: {
      input: "src",
      output: "_site",
      data: "_data"
    }
  };
};
