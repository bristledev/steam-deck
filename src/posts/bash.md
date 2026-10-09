---
layout: base.njk
title: "🐧 Your First Terminal Commands"
excerpt: "Set your admin password, learn five everyday commands, and find out what a command does before you run it."
tags:
  - posts
  - terminal
  - shell
  - intermediate
---

# Your First Terminal Commands

The terminal can look intimidating, especially if you've only seen it in videos where someone types very fast. It's another way to give your Deck instructions: you type a command, press **Enter**, and the Deck does it. For some jobs, that's much faster than clicking.

## Konsole and Bash

Open **[Konsole](https://apps.kde.org/konsole/)** from the Application Launcher in Desktop Mode. Konsole is the window; inside it, a program called **[Bash](https://www.gnu.org/software/bash/)** reads what you type and carries it out. A program like Bash is called a *shell*.

Before your cursor, you'll see the *prompt*:

```
(deck@steamdeck ~)$
```

It tells you who you are (`deck`), which computer you're on (`steamdeck`), and which folder you're in (`~`, your home folder). The `$` means Bash is ready for a command.

## Set Your Admin Password First

The Deck's `deck` user has no password out of the box. You need one before you can use `sudo` (below) or log in from another computer.

1. Open **Konsole**.
2. Type `passwd` and press **Enter**.
3. Type your new password and press **Enter**. Nothing appears on screen as you type, not even dots. That's normal: it hides how long your password is.
4. Type it again to confirm, and press **Enter**.

Choose something you'll remember. Several later chapters ask for it.

## Five Everyday Commands

| Command | What it does | Example |
| :--- | :--- | :--- |
| **`pwd`** | Shows which folder you're in ("print working directory") | `pwd` |
| **`ls`** | Lists what's in the current folder | `ls -lh` |
| **`cd`** | Moves into another folder ("change directory") | `cd Downloads` |
| **`mkdir`** | Creates a new folder ("make directory") | `mkdir scripts` |
| **`sudo`** | Runs a command as an administrator, after asking for your password | `sudo <command>` |

Try the first three together:

```bash
pwd
ls
cd Downloads
pwd
```

**What did that just do?** `pwd` printed `/home/deck`, your home folder. `ls` listed what's in it. `cd Downloads` moved you into `Downloads`, and the second `pwd` confirmed it by printing `/home/deck/Downloads`. To go back home from anywhere, type `cd` on its own.

### Three Keys That Save Typing

- **Tab** finishes names for you. Type `cd Dow` and press **Tab**, and Bash completes `Downloads`.
- **Up Arrow** brings back the previous command, so you can run it again or edit it.
- **Ctrl+C** cancels whatever is running and gives you a fresh prompt.

## Understanding a Command Before You Run It

Don't run a command you don't understand, especially one that starts with `sudo`. These tools help.

### Explainshell

Paste a command into **[Explainshell](https://explainshell.com/)**, and it explains each part of it: the program, and each *argument* (the words that follow the program's name).

### cheat.sh

For quick examples of how to use a command, ask cheat.sh from the terminal:

```bash
curl cht.sh/ls
```

Replace `ls` with any command you're curious about.

### `--help`

Most commands describe their own options if you add `--help`, like `ls --help`.

> [!NOTE]
> **Why doesn't `man` work?** On most Linux systems, `man ls` opens the full manual for a command. SteamOS includes the `man` program but leaves out the manuals themselves, so you'll just see `No entry for ls in the manual`. Use `--help` or cheat.sh instead.

Bash isn't the only shell on your Deck. The next chapter introduces Fish, which comes preinstalled and is friendlier to beginners.
