---
layout: base.njk
title: " Fish – The Smart Shell"
excerpt: "Auto-suggestions and the best shell for noobs."
tags: posts
---

#  Fish – The Smart Shell Upgrade 

If {{ collections.posts | chapterLink('bash') | safe }} terminal commands felt like homework, **Fish Shell** is the 'cheat mode' that makes it feel like a modern app. In this chapter, we're going to talk about why Fish is the single best upgrade you can give your Steam Deck terminal.

## What is Fish?
**[Fish](https://fishshell.com/)** (Friendly Interactive Shell) is a terminal that behaves more like a smart assistant than a piece of 1970s software. It's designed to be 'noob' friendly by default.

## Feature 1: The 'Smart' Auto-Suggestions
This is the \#1 reason to use Fish. As you type a command, Fish will look at your history and suggest the rest of the command in a faint grey colour.
- **How to use it**: Just hit the **Right Arrow** key to accept the suggestion. 
- **The Benefit**: You'll never have to remember a complex command twice.

## Feature 2: Syntax Highlighting (No More Typos!)
In regular Bash, you don't know if you've made a typo until you hit Enter and get an error.
- In Fish, if you type a command correctly (like `ls`), it turns **blue**.
- If you have a typo (like `lss`), it turns **red**.
You'll know *immediately* if something is wrong before you even run it.

## Feature 3: The 'Web' Dashboard (`fish_config`)
Fish is one of the only shells that lets you configure it using a web browser instead of a scary text file.
1. Just type `fish_config` in the terminal.
2. A webpage will open!
3. You can pick your favourite colors, change how the 'prompt' (the text before your cursor) looks, and even manage your shortcuts (aliases).

## Feature 4: Easy Shortcuts (Aliases)
Want a 'noob' version of `ls` that shows file sizes in human-readable format? Normally, that's `ls -lh`. 
In Fish, you can create a shortcut called `list` that does it for you:
`alias list "ls -lh"`
Now, you just type `list` and you're done!

## 🔄 Making it Permanent (The 'Pro' Way)
Once you've tried Fish, you'll probably never want to go back to the plain Bash terminal. To make Fish your **default** shell (so it opens automatically every time you launch Konsole), you use the `chsh` command.

### What is `chsh`?
`chsh` stands for **CH**ange **SH**ell. It's the standard Linux way to tell your system which "language" you want to speak in the terminal.

1.  Open your terminal.
2.  Type: `chsh -s /usr/bin/fish`
3.  Enter your password when prompted.
4.  **Restart Konsole.**

> [!WARNING]
> ### 🚨 A Note for Steam Deck Users
> While `chsh` is the proper Linux way, some users prefer *not* to change the system-wide default because it can occasionally interfere with some very specific background system scripts during SteamOS updates. 
> 
> If you're nervous about changing system settings, you can also just set **Konsole** (the app) to launch Fish by default in its profile settings without teaching the whole OS to use it!

---

---

### 📚 Further Reading
Want to dive deeper into what Fish can do? Check out the **[Fish Cookbook](https://github.com/jorgebucaran/cookbook.fish)** for a collection of tips, tricks, and useful snippets to level up your shell game.

{% next_chapter %}
