---
description: "Use when writing, editing, or reviewing blog post content. Covers voice, avoiding AI-sounding prose, accuracy, structure, formatting, admonitions, code blocks, and curriculum linking for SteamOS Unlocked posts."
applyTo: "src/posts/*.md"
---

# Content Writing — SteamOS Unlocked

## Who We're Writing For

Steam Deck owners with no Linux experience who want to understand how their Deck actually works, not just copy commands. Assume zero Linux knowledge, but respect the reader's intelligence: explain, don't dumb down, and don't oversell.

## Voice

Write like a knowledgeable friend sitting next to the reader at their Deck: calm, specific and honest. The warmth comes from patience and clarity, not from excitement.

- Address the reader as **"you"**. Use **"we"** for walkthroughs you do together ("We need to enable the service"). Never "I".
- **Be specific instead of enthusiastic.** "Starts in under a second" beats "blazing fast". "Moves a game to the SD card without re-downloading it" beats "magic".
- **Say what a thing does, then why it matters.** Plain words first; the technical term second, defined inline.
- **Be honest about trade-offs and limits.** Say when something is unofficial, can break, or has a cost. Say what was verified and on which version.
- **Personality in small doses.** A well-placed analogy or a dry aside, like "(specifically Arch Linux, btw)", is welcome. One per section at most, and never at the expense of clarity.
- **Reassure with facts, not slogans.** "SteamOS keeps the previous version on the drive, so you can roll back" reassures. "You genuinely can't break it!" overpromises.

### Before and After

These are real lines from earlier drafts of this blog.

| Before | After |
| :--- | :--- |
| One of the best things about SteamOS? You can squeeze *every bit* of performance out of your Steam Deck with some easy settings. | The Quick Access menu has a handful of settings that trade frame rate for battery life. Here's what each one does. |
| Don't panic — this is fixable 90% of the time. | Most games start working after one of the five steps below. |
| Starship is a minimal, blazing-fast, and infinitely customizable prompt that works with *any* shell. | Starship is a prompt that works in both Bash and Fish. It's one small program, configured with one text file. |
| You just leveled up. Turning scripts into resilient, auto-starting services is a core Linux skill. | *(Cut it. Don't recap; end on the teaser.)* |
| The terminal isn't a "hacker tool" — it's just a faster way to talk to your computer. | The terminal lets you give your Deck instructions by typing them. For some jobs, that's much faster than clicking. |

## Avoid the AI Voice

Readers recognize machine-written prose quickly, and once they do, they stop trusting the facts too. These patterns are the giveaways. Treat them as errors, whether a person or a tool wrote the draft.

### Hype vocabulary

Don't use these words. Say the specific thing instead.

| Avoid | Instead |
| :--- | :--- |
| magic, magical, black magic | Explain the mechanism. The point of this blog is that nothing is magic. |
| ultimate, absolute(ly), legendary, incredible, amazing, insane | Cut it, or give the concrete reason it's good. |
| blazing fast, lightning speed, instantly | A real number or comparison: "in under a second". |
| seamless(ly), effortless(ly), flawless(ly), perfect(ly), robust | Say what actually happens, including any rough edges. |
| superpower, wizard, ninja, pro, power user (as praise) | Describe what the reader can now do. |
| game-changer, next level, level up, supercharge, unlock (as hype) | Cut it. ("Unlock" is fine for something literally locked, like the read-only image.) |
| dive into, delve, journey, explore the world of | "Let's look at", or just start. |
| at your fingertips, endless possibilities | Cut it. |
| simply, just, easy (for steps that aren't) | Cut it. If a step has a catch, say so. |
| noob(s) | "beginner", or just "you". |

### Formulaic constructions

- **"It isn't X — it's Y" reframes.** State what the thing is.
- **Setup-then-reveal.** "Here's the thing:", "Want to know a secret?", "The best part?", "Surprise:", "Here's where it gets interesting". Just say the point.
- **Stock openers and entrances.** "Ever wonder why…?", "Have you ever…?", "Ready to…?", "In this chapter, we're going to…", "Enter **X**.", "Meet **X**.", "That's where X comes in.", "There's a better way." Open with the reader's actual situation instead.
- **Reflexive groups of three.** "fast, simple, and powerful". Use as many items as there really are.
- **Dramatic one-line paragraphs** used for effect ("It isn't.", "Boom."). A short paragraph is fine for a key fact, not for suspense.
- **Pep-talk endings.** "You just leveled up", "Happy gaming!", "You'll never want to go back", "You'll wonder how you ever lived without it", "It's that easy!", "No more X!".
- **Recap paragraphs** that restate the chapter at the end. The reader just read it.
- **Filler transitions.** "Additionally", "Furthermore", "Moreover", "It's worth noting that", "Overall", "In conclusion".
- **Stacked hedges.** "may potentially", "can often just", "might possibly". Pick one, or state the fact.
- **Formulaic teasers.** Don't end every chapter with "Now that you know X, let's Y." Vary the shape (see Post Structure).
- **An analogy in every section.** Use one when it genuinely explains something, not "Think of it as…" by reflex.

### Punctuation and emphasis

- **Exclamation marks:** at most one or two per chapter, and never in headings or alerts.
- **Em dashes:** rare. Prefer a period, comma, colon or parentheses. Never more than one per paragraph.
- **Bold:** for UI labels, the lead sentence of an alert, and a term's first definition. Not for general emphasis, and never more than one bolded phrase per sentence.
- **Emoji:** only as each chapter's icon in its frontmatter `title`. None in headings, body text, lists or alerts.

### Invented facts and vague claims

- **No made-up numbers.** "90% of the time", "99% of the time" and "9 times out of 10" are guesses dressed up as data. Use a number only if you measured it or a source states it, and say which.
- **No anonymous authority.** "Some users say…", "many guides recommend…", "it can occasionally interfere with…". Name the source and link it, or cut the claim.
- **No absolute promises.** "can't break", "100% safe", "always works", "won't leave anything behind". Describe the actual safety net and its limits.

## Accuracy and Sources

This blog explains how SteamOS works, so every claim about SteamOS has to be true on a real Deck.

- **Verify before you write.** Check any claim about SteamOS behavior on a Steam Deck, or against an official or upstream source: a Valve support page, the project's README, or its source code. This covers button combos, menu paths, command output, file locations, what survives an update and what ships preinstalled.
- **Link the source in the post**, inline and bold-wrapped (see Links).
- **Name the version.** When a chapter depends on specific behavior, add a NOTE near the top: "Everything in this chapter was checked on a Steam Deck running **SteamOS 3.9.2**."
- **Quote UI labels exactly** as they appear on screen.
- **Show real output.** When you show what a command prints, use output you actually saw, trimmed if needed.

## Post Structure

1. **Frontmatter**: required fields, no date:
   ```yaml
   ---
   layout: base.njk
   title: "🐧 Post Title"
   excerpt: "One plain sentence saying what the reader will learn or be able to do."
   tags:
     - posts
   ---
   ```
   - The title starts with one emoji, which is the chapter's icon in the sidebar and chapter cards. Each chapter gets a **different** emoji.
   - Keep titles short. The sidebar lists every title.
2. **H1**: exactly one, matching the title text without the emoji, so the page heading matches the sidebar and the Previous/Next cards. No emoji, no taglines, no trailing spaces.
3. **Opening**: the reader's real situation in two to four sentences, and a link to the chapter this one builds on.
4. **"What is X?"**: define the concept early, with an analogy only if it helps.
5. **Sections**: digestible chunks, three to seven sentences each.
6. **Walkthrough**: numbered steps with working, verified commands.
7. **Teaser**: one sentence saying what the next chapter covers and why it follows from this one. No link: the layout renders the Previous/Next cards. Vary the phrasing. A question, a problem this chapter leaves open, or a plain statement all work.

### Headings

- `##` for major sections, `###` for subsections. Never `#` (except the H1) or `####`.
- Headings say what the section covers: "Installing Homebrew", not "Choose Your Weapon" or "The Homebrew Magic".
- Title Case. No trailing colons, no emoji, no exclamation marks.
- Don't use headings as labels for single commands; every `##` and `###` lands in the "On This Page" sidebar. Use a bold lead-in sentence or a table instead.
- A tool's name in parentheses is fine when it helps: "Keyboard Shortcuts (Readline)".

### Paragraphs and lists

- Two to four sentences per paragraph.
- Bullet lists (`-`) for parallel items; numbered lists (`1.`) for steps the reader must follow in order.
- Tables for command cheat sheets (Command | What it does | Example).

## Formatting Conventions

- **UI paths** are bold, with `→` between steps: **Settings → System → Format SD Card**. Never `->`.
- **Buttons and keys** are bold, written as they appear: **Steam** button, **"..."** button, **Volume Up**, **Ctrl+Alt+F4**. In tables of shortcuts, backticks are fine.
- **Commands, file paths, package names and settings values** go in backticks: `ls -lh`, `/etc/hosts`, `fastfetch`.
- **New terms** are in *italics* on first use, then defined in the same sentence.
- **Quotation marks** are straight double quotes, used only for quoting text or messages. No single-quote 'scare quotes'.
- **Straight apostrophes** ('), never curly ones (’).
- **American English** spelling: color, favorite, customize.
- **Numbers and units** have a space between them: 5 GB, 15 W, 40 Hz.
- **Tips** go in a TIP alert, not as an inline "Pro-tip:".
- **No serial comma:** "games, saves and settings", not "games, saves, and settings".
- **No `---` dividers** between sections. Headings already separate them.

### Terminology

- **Steam Deck** on first mention, then **Deck** is fine. **SteamOS**, **Linux**, **Game Mode**, **Desktop Mode**, **Quick Access menu**, **Konsole**, **Dolphin**.
- **Flatpak** is capitalized as a noun; the command is `flatpak`.
- Define every technical term inline on first use. No separate glossary.

## Analogies

Ground new concepts in real-world comparisons, but only when the comparison maps cleanly. If an analogy needs caveats, drop it and explain directly. Use one analogy per concept, and don't stack them.

| Concept | Example analogy |
|---------|-----------------|
| Read-only system image | A game cartridge you can play but not write to; your saves go on a separate memory card |
| Flatpak | A self-contained shipping container for an app |
| `/etc` overlay | Tracing paper laid over a printed page |
| Polkit | A bouncer with a guest list |

## Admonitions

Use GitHub-style alerts, and only these four types. Place them where the reader needs the information, not at the start of a section.

| Type | When to use |
|------|-------------|
| `> [!TIP]` | Shortcuts, better ways to do something, alternative approaches |
| `> [!NOTE]` | Background, clarifications, which version was tested |
| `> [!WARNING]` | Things that can break or be undone by updates, or cost battery or performance |
| `> [!CAUTION]` | Risks to security, data or accounts |

- No `[!IMPORTANT]` or other types, and no headings inside an alert.
- Start with a bold one-sentence summary, then explain. Keep it conversational: "This is safe as long as…" rather than "DANGER:".
- Don't stack alerts back to back, and keep them to a few per chapter. When everything is a warning, nothing is.

## Code Blocks

- **Introduce every block** with a sentence: "Open Konsole and run:".
- **Tag the language** for commands: ` ```bash `, ` ```fish `, ` ```ini `. Put example output in an untagged block.
- **Show complete, copy-paste-ready commands.** No partial snippets or placeholders without explanation.
- **Explain afterwards** with "**What did that just do?**" or a short bullet breakdown, for anything that isn't self-explanatory.
- Give Fish users the equivalent command when Bash syntax differs.

## Links

- **Bold-wrap external links**: `**[Fish](https://fishshell.com/)**`, not `[Fish](https://fishshell.com/)`.
- Prefer official sources: Valve's support pages, the project's site, README or documentation.

## Internal Links

Link to other posts using the `chapterLink` filter:

```nunjucks
{{ collections.posts | chapterLink('slug-name') | safe }}
```

- Link a chapter on the first mention that helps the reader, not every mention.
- Don't add an end-of-post "next chapter" link; the layout's Previous/Next cards handle it. Make sure the teaser sentence matches the next slug in `curriculum.json`.

## Adding a New Post

1. Create `src/posts/<slug>.md` with the frontmatter above, using an emoji no other chapter uses.
2. Add the slug to the correct phase in `src/_data/curriculum.json`.
3. Add it to the matching phase table in `src/start-here.md` and renumber the rows that follow.
