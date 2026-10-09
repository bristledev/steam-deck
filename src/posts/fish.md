---
layout: base.njk
title: "🐟 The Fish Shell"
excerpt: "A friendlier shell that comes with SteamOS: suggestions as you type, typo highlighting, and how to make it your default."
tags:
  - posts
  - terminal
  - shell
  - productivity
  - intermediate
---

# The Fish Shell

In {{ collections.posts | chapterLink('bash') | safe }}, you typed commands into Bash, the shell SteamOS uses by default. Bash works, but it only helps when you ask: you press **Up Arrow** to find an old command, and you find out about a typo only after you press **Enter**. **[Fish](https://fishshell.com/)** (the Friendly Interactive Shell) suggests commands as you type and highlights typos before you run them.

## Trying Fish

Fish comes with SteamOS. To try it, open Konsole and type:

```bash
fish
```

Your prompt changes, and you're now talking to Fish instead of Bash. Type `exit` to go back. Nothing is permanent until you choose to make it so, at the end of this chapter.

## Suggestions as You Type

As you type, Fish looks through your command history and suggests the rest of a command you've run before, in faint grey text. Press **Right Arrow** to accept the suggestion. Long commands you've typed once become a few keystrokes the next time.

## Typos Show Up Before You Press Enter

Fish colors your command as you type it. If you type a command that doesn't exist, like `lss` instead of `ls`, Fish turns it red straight away, before you run it.

## Settings in Your Browser

Type `fish_config`, and Fish opens a settings page in your web browser. There you can pick a color theme, choose a prompt style, and browse your saved functions and shortcuts.

## Shortcuts With Aliases

An *alias* is a short name for a longer command. For example, `ls -lh` lists files with readable sizes. To create a shortcut called `list` for it:

```fish
alias --save list "ls -lh"
```

Now typing `list` runs `ls -lh`. The `--save` part makes Fish remember the shortcut in every future terminal; without it, the alias disappears when you close the window.

## Making Fish Your Default Shell

To have Fish start every time you open Konsole, change your *login shell* with `chsh` ("change shell"):

1. Open Konsole.
2. Run `chsh -s /usr/bin/fish`.
3. Enter your password when asked.
4. Start a new session: switch to Game Mode and back to Desktop Mode, or restart the Deck. Konsole starts whichever shell you logged in with, so a new Konsole window alone isn't enough.

**What did that just do?** `chsh` changed the login shell for your `deck` user only, not for the whole system. It's saved in `/etc/passwd`, which SteamOS keeps across updates, so you only do this once.

> [!NOTE]
> **Is this safe on a Steam Deck?** Yes. Game Mode and Desktop Mode both start through SDDM, the login manager, and its startup script has a section written specifically for Fish users. Two small things do change. Fish doesn't read Bash's startup file, `~/.bashrc`, so anything you added there needs adding to `~/.config/fish/config.fish` too. And over SSH, Fish skips SteamOS's default editor setting (see {{ collections.posts | chapterLink('preinstalled') | safe }} for the one-line fix).
>
> Prefer to leave your login shell alone? Set just **Konsole** to use Fish instead: open **Settings → Edit Current Profile** and change **Command** to `/usr/bin/fish`. To switch back to Bash later, run `chsh -s /bin/bash`.

## Further Reading

The **[Fish Cookbook](https://github.com/jorgebucaran/cookbook.fish)** collects tips and examples for everyday Fish use.

Whichever shell you choose, the same core commands work in both. The next chapter covers the ones you'll use most.
