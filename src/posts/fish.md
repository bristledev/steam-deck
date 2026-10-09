---
layout: base.njk
title: "🐟 Fish – The Smart Shell"
excerpt: "Auto-suggestions and the best shell for noobs."
tags:
  - posts
  - terminal
  - shell
  - productivity
  - intermediate
---

#  Fish – The Smart Shell Upgrade 

If {{ collections.posts | chapterLink('bash') | safe }} terminal commands felt like homework, **Fish Shell** is the 'cheat mode' that makes it feel like a modern app. In this chapter, we're going to talk about why Fish is the single best upgrade you can give your Steam Deck terminal.

## What is Fish?
**[Fish](https://fishshell.com/)** (Friendly Interactive Shell) is a shell, like Bash, that behaves more like a smart assistant than a piece of 1970s software. It's designed to be 'noob' friendly by default.

Better yet, it already comes with SteamOS. To try it, open Konsole and type:

```bash
fish
```

Your prompt changes, and you're now talking to Fish instead of Bash. Type `exit` to go back. Nothing is permanent until you choose to make it so, at the end of this chapter.

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

```fish
alias --save list "ls -lh"
```

Now, you just type `list` and you're done! The `--save` part makes Fish remember the shortcut in every future terminal. Without it, the alias disappears when you close the window.

## 🔄 Making it Permanent (The 'Pro' Way)
Once you've tried Fish, you'll probably never want to go back to the plain Bash terminal. To make Fish your **default** shell (so it opens automatically every time you launch Konsole), you use the `chsh` command.

### What is `chsh`?
`chsh` stands for **CH**ange **SH**ell. It's the standard Linux way to tell your system which "language" you want to speak in the terminal.

1.  Open your terminal.
2.  Type: `chsh -s /usr/bin/fish`
3.  Enter your password when prompted.
4.  **Restart Konsole.**

**What did that just do?** `chsh` changed the *login shell* for your `deck` user only, not for the whole system. It's saved in `/etc/passwd`, which SteamOS keeps across updates, so you only do this once.

> [!NOTE]
> **Is this safe on a Steam Deck?** Yes. Game Mode and Desktop Mode both start through SDDM, the login manager, and its startup script has a section written specifically for Fish users. Two small things do change. Fish doesn't read Bash's startup file, `~/.bashrc`, so anything you added there needs adding to `~/.config/fish/config.fish` too. And over SSH, Fish skips SteamOS's default editor setting (see {{ collections.posts | chapterLink('preinstalled') | safe }} for the one-line fix).
>
> Prefer to leave your login shell alone? Set just **Konsole** to use Fish instead: open **Settings → Edit Current Profile** and change **Command** to `/usr/bin/fish`. To switch back to Bash later, run `chsh -s /bin/bash`.

---

### 📚 Further Reading
Want to dive deeper into what Fish can do? Check out the **[Fish Cookbook](https://github.com/jorgebucaran/cookbook.fish)** for a collection of tips, tricks, and useful snippets to level up your shell game.

---

Fish makes the terminal friendlier, but you still need words to say. Next, let's learn the core commands that every Linux shell understands.
