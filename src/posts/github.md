---
layout: base.njk
title: "🐙 GitHub & Community Mods"
excerpt: "How to find community tools on GitHub, read them before running them, and install them three common ways."
tags:
  - posts
  - scripting
  - terminal
  - intermediate
---

# GitHub & Community Mods

Many Steam Deck tools are made by the community rather than Valve: scripts that fix specific games, tools that manage shader caches, and Decky Loader itself. Most of them are published on GitHub. This chapter shows how to find what you need on a GitHub page, check it, and install it in Desktop Mode.

## What Is GitHub?

**[GitHub](https://github.com/)** is a website, owned by Microsoft, where developers publish and work on code. Each project lives in a *repository* (or *repo*): a folder of files with its history.

A project page shows a lot at once: files, commit counts, contributor lists. As someone installing a tool, you only need two parts: the **README** and the **Releases**.

### The README

Scroll down past the list of files, and you'll almost always see a document called `README.md`. It's the project's instructions. **Read it first.** It usually tells you:

1. What the tool does.
2. Whether it works on current versions of SteamOS.
3. Exactly how to install it.

## Method 1: Install Scripts With curl

Many Deck tools are installed by pasting a single `curl` command into Konsole. Decky Loader's README, for example, offers one as a faster alternative to the installer file you used in {{ collections.posts | chapterLink('customization') | safe }}.

> [!CAUTION]
> **Check that you're on the project's real GitHub page before copying a script.** An install script can do anything you can do, including deleting your files, and with your admin password it can change anything on the system.

A typical install command looks like this:

```bash
curl -L https://github.com/DeveloperName/CoolDeckMod/raw/main/install.sh | sh
```

**What does it do?**

- `curl -L <address>` downloads the script's text. `-L` tells `curl` to follow redirects, since GitHub often forwards download links to another server.
- `|` is the *pipe*. It sends the output of the command on its left into the command on its right.
- `sh` runs the text it receives as a script.

To use it, open **Konsole**, paste the command and press **Enter**. If the script needs your admin password and you haven't set one yet, see {{ collections.posts | chapterLink('bash') | safe }}.

### The Safer Way: Read It First

Piping straight into `sh` runs the script before you've seen a single line of it. For anything that asks for your admin password, split it into three steps instead:

```bash
curl -L https://github.com/DeveloperName/CoolDeckMod/raw/main/install.sh -o install.sh
less install.sh
bash install.sh
```

**What did that just do?** `-o install.sh` saves the script to a file instead of running it. `less` lets you scroll through it (press `q` to quit). You don't need to understand every line, but watch for anything that touches files outside the mod's own folder, or runs `steamos-readonly disable`. Only then does `bash` run it.

## Method 2: GitHub Releases

Some projects publish ready-to-use downloads instead of a script, such as an app or a ZIP file.

1. On the project page, find the **Releases** section on the right-hand side.
2. Open the release marked **Latest**.
3. Scroll down to **Assets**, the list of downloadable files.
4. Pick the file meant for Linux. It usually ends in `.AppImage` or `.tar.gz`, or has "linux" in its name.
5. Download it and open your `Downloads` folder in Dolphin.

What to do next depends on the file type:

| File | What to do |
| :--- | :--- |
| `.zip`, `.tar.gz` | Compressed folders. Right-click and choose **Extract**. |
| `.AppImage` | A portable app. Right-click it, go to **Properties → Permissions**, and tick **Allow executing file as program** before running it. |
| `.sh` | A shell script. Read it first (see above), then run it from Konsole with `bash scriptname.sh`. |

## Method 3: Git Clone

Some projects don't have a release or a script. Instead, they tell you to "clone the repo", which downloads the project's whole folder. You already did this for the Tailscale installer in {{ collections.posts | chapterLink('tailscale') | safe }}, and many Python tools work the same way. Cloning uses `git`, which comes with SteamOS.

1. Open **Konsole**.
2. Move to the folder where you want the project, such as `Documents`:
   ```bash
   cd ~/Documents
   ```
3. Clone the project:
   ```bash
   git clone https://github.com/DeveloperName/CoolDeckMod.git
   ```
4. This creates a folder called `CoolDeckMod`. Move into it with `cd CoolDeckMod` and follow the README's instructions.

To get the author's latest changes later, open the folder in Konsole and run `git pull`.

Many of the tools you'll find this way are written in Python, and your Deck already has it installed. The next chapter covers how to run them without breaking anything.
