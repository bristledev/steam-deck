---
layout: base.njk
title: "🍺 Homebrew"
excerpt: "Install terminal tools that SteamOS doesn't include, in a place SteamOS updates never touch."
tags:
  - posts
  - package-management
  - terminal
  - intermediate
---

# Homebrew

In {{ collections.posts | chapterLink('steamos-extending') | safe }}, you saw why installing terminal tools with `pacman` doesn't last: the next update replaces the system image, and your tools vanish with it. The fix is a package manager that lives on the home partition instead. Homebrew is the most popular one.

## What Is Homebrew?

**[Homebrew](https://brew.sh/)** is a *package manager*: a tool that downloads, installs and updates other programs for you. It started on the Mac and now runs on Linux too (where it's sometimes called Linuxbrew). It offers thousands of command-line tools, and it installs all of them outside SteamOS's read-only system.

On the Deck, that means:

- **`sudo` only once.** Homebrew lives in `/home/linuxbrew`, on the same partition as your home folder. The installer asks for your admin password once to create that folder; after that, `brew` commands never need `sudo`.
- **It never touches the read-only system.**
- **Everything survives SteamOS updates**, because the home partition is never replaced.

## Installing Homebrew

Open **Konsole** and run:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

**What did that just do?** `curl` downloaded Homebrew's official install script, and `/bin/bash -c` ran it. It asks for your admin password once, creates `/home/linuxbrew/.linuxbrew` and downloads Homebrew into it.

### Adding Homebrew to Your Path

Your shell finds programs by looking through a list of folders called the *PATH*, and Homebrew's folder isn't on it yet. When the installer finishes, look for the **Next steps** section at the bottom of the terminal. It lists three commands that fix this. For Bash, they look like this:

```bash
echo >> /home/deck/.bashrc
echo 'eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv bash)"' >> /home/deck/.bashrc
eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv bash)"
```

Copy them from your own terminal and run them. The first two add a line to `~/.bashrc` so every new terminal can find `brew`, and the third sets it up in the terminal you already have open.

If you use {{ collections.posts | chapterLink('fish') | safe }}, Fish doesn't read `~/.bashrc`, so add Homebrew to Fish's startup file as well:

```fish
mkdir -p ~/.config/fish
echo '/home/linuxbrew/.linuxbrew/bin/brew shellenv fish | source' >> ~/.config/fish/config.fish
```

> [!WARNING]
> **Skip the "Install Homebrew's dependencies" step.** The installer also suggests running `sudo pacman -S base-devel`. That advice is for regular Arch Linux. On SteamOS, `pacman` can't install into the read-only system, and anything you force in gets wiped by the next update. Homebrew downloads ready-built packages, so most tools work fine without it.

## Everyday Commands

| Command | What it does |
| :--- | :--- |
| `brew install fastfetch` | Installs a tool (here, `fastfetch`, which shows your Deck's specs) |
| `brew uninstall fastfetch` | Removes it again |
| `brew search fetch` | Finds tools whose names match a word |
| `brew update` then `brew upgrade` | Refreshes Homebrew's list of tools, then updates everything you've installed |
| `brew list` | Shows what you've installed |

> [!TIP]
> **Check before you brew.** Many popular tools, like `htop`, `ncdu` and `ripgrep`, already ship with SteamOS. Run `command -v <tool>` first; if it prints a path, you already have it. See {{ collections.posts | chapterLink('preinstalled') | safe }} for the full tour.

Homebrew is the simpler of the two home-partition package managers. The other, Nix, asks a bit more of you, and in return can undo any change with a single command.
