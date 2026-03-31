---
layout: base.njk
title: " GitHub & Community Mods"
excerpt: "Learn how to safely find, download, and execute community scripts and mods from GitHub."
tags: posts
---

The Steam Deck has an incredible community of hackers, modders, and developers building custom scripts to improve your experience. Whether it's a script to fix a specific game, a tool to manage shaders, or the legendary **Decky Loader** for plugins, most of these live on a site called GitHub.

In this chapter, we're going to learn how to confidently navigate GitHub, download what you need, and run it safely in Desktop Mode.

## What is GitHub?

GitHub is Microsoft's platform for storing, sharing, and collaborating on code. Think of it as Google Drive, but specifically designed for programmers. Because the Steam Deck is an open PC, developers use GitHub to share their SteamOS projects with the world.

When you land on a GitHub page for a Steam Deck mod, it might look confusing—there are files, weird graphs, and lots of text. But as a user, you really only care about two things: the **README** and the **Releases**.

### The README

Scroll down past the files, and you'll almost always see a `README.md` document displayed on the page. This is the instruction manual. **Always read this first.** It will tell you:
1. What the mod/script actually does.
2. If it's compatible with the latest SteamOS version.
3. The exact steps to install it.

## Method 1: The "Curl" Script

The most common way developers distribute mods for the Steam Deck is via a "curl" script. This is the method used by Decky Loader.

> [!CAUTION]
> Always verify you are on the legitimate GitHub page before copying a curl script. A malicious script can do serious harm to your system.

A curl command usually looks like this:
```bash
curl -L https://github.com/DeveloperName/CoolDeckMod/raw/main/install.sh | sh
```

### What is this command doing?
Let's break it down so it's not just black magic:
* `curl -L URL`: This tells your Deck to visit the URL and download (`curl`) the raw text of the script file. The `-L` tells it to follow any redirects.
* `|`: This is the **pipe** symbol. It takes the output of the first command (the raw script text) and feeds it into the second command.
* `sh`: This tells the `sh` (shell) program to execute the text it just received.

### How to use it:
1. Open **Konsole** (your terminal).
2. Paste the command and hit `Enter`.
3. If you haven't set a `sudo` password yet, the script might ask you to set one (refer back to {{ collections.posts | chapterLink('bash') | safe }}).

## Method 2: GitHub Releases

Sometimes, a mod is a compiled application or a ZIP file containing assets. You won't use a curl command for this; you need to download it from the **Releases** page.

1. On the right-hand side of the GitHub repository page, look for the **Releases** section.
2. Click on the version that says **Latest**.
3. Scroll down to the **Assets** dropdown.
4. You will see several files. Look for the file meant for Linux. It will usually end in `.AppImage`, `.tar.gz`, or simply have "linux" in the name.
5. Download it, open your Dolphin File Manager in your `Downloads` folder, and extract it or make it executable!

> [!TIP]
> **Understanding file extensions:**
> - `.zip` and `.tar.gz` are compressed folders. Right-click and Extract them.
> - `.AppImage` is a portable app. Right-click it, go to Properties -> Permissions, and check "Is executable" before running it.
> - `.sh` is a shell script. Double-click it or run it from Konsole using `./scriptname.sh`.

## Method 3: Git Clone

Very rarely, a project might not have a release or a curl script. Instead, they tell you to "clone the repo". To do this, you need the `git` tool. 

Thankfully, the Steam Deck has `git` pre-installed!

1. Open **Konsole**.
2. Navigate to where you want the folder to live, like your Documents:
   ```bash
   cd ~/Documents
   ```
3. Run the clone command:
   ```bash
   git clone https://github.com/DeveloperName/CoolDeckMod.git
   ```
4. This will create a new folder called `CoolDeckMod`. You can then `cd` into it and follow the developer's instructions!

With these three methods under your belt, the entire world of Steam Deck community mods is now at your fingertips!

---

{% next_chapter %}
