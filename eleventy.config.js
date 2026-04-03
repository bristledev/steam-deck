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

function injectAsciinemaEmbeds(content) {
  const asciicastLinkPattern = /<a\s+([^>]*?)href="https:\/\/asciinema\.org\/a\/([A-Za-z0-9_-]+)"([^>]*)>\s*<img\s+([^>]*?)alt="asciicast"([^>]*?)>\s*<\/a>/gi;

  return content.replace(asciicastLinkPattern, (match, _preHrefAttrs, castId) => {
    const scriptPattern = new RegExp(
      `<script\\s+src="https:\\/\\/asciinema\\.org\\/a\\/${castId}\\.js"\\s+id="asciicast-${castId}"[\\s\\S]*?<\\/script>`,
      "i"
    );

    if (scriptPattern.test(content)) {
      return "";
    }

    return `<script src="https://asciinema.org/a/${castId}.js" id="asciicast-${castId}" async="true"></script>`;
  });
}

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
    const posts = this?.ctx?.collections?.posts || [];
    const currentUrl = this?.page?.url;
    const currentSlug = this?.page?.fileSlug;
    const isDev = process.env.ELEVENTY_RUN_MODE === "serve" || process.env.NODE_ENV === "development";

    const currentIndex = posts.findIndex((post) => {
      return post.url === currentUrl || post.fileSlug === currentSlug;
    });

    if (currentIndex === -1) {
      if (isDev) {
        throw new Error(`[next_chapter shortcode] Could not resolve current post in collections.posts (url: '${currentUrl}', slug: '${currentSlug}')`);
      }
      return "";
    }

    if (currentIndex >= posts.length - 1) {
      return "";
    }

    const nextPost = posts[currentIndex + 1];
    const nextTitle = (nextPost?.data?.title || nextPost?.fileSlug || "").trim();
    const nextUrl = nextPost?.url || "";

    if (!nextTitle || !nextUrl) {
      return "";
    }

    return `Next we'll look at **[${nextTitle}](${nextUrl})**!`;
  });

  eleventyConfig.addTransform("asciinemaEmbeds", (content, outputPath) => {
    if (!outputPath || !outputPath.endsWith(".html")) {
      return content;
    }

    return injectAsciinemaEmbeds(content);
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
