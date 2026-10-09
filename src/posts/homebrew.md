---
layout: base.njk
title: "🍺 Homebrew"
excerpt: "Installing apps without touching the core OS."
tags:
  - posts
  - package-management
  - terminal
  - intermediate
---

#  Homebrew (Linuxbrew) – The Power User's Secret Weapon

In {{ collections.posts | chapterLink('steamos-extending') | safe }}, you saw why installing terminal tools with `pacman` doesn't last: the next update replaces the system image, and your tools vanish with it. You also saw the fix: a package manager that lives on the home partition.

That’s where **Homebrew** comes in.

## What is Homebrew?
Originally created for Mac users, **[Homebrew](https://brew.sh/)** (or "Linuxbrew" on Linux) is a package manager that lets you install thousands of useful tools and apps *without* needing to mess with the core SteamOS files. 

Think of it like a second App Store, but for the terminal.

## Why use it on a Steam Deck?
The Steam Deck is designed to be safe and stable. If you try to install software the 'traditional' Linux way, Valve might overwrite it during the next SteamOS update. 

**Homebrew is different:**
- **Sudo Only Once**: It installs everything into `/home/linuxbrew`, on the same drive as your home folder. The installer asks for your admin password once to create that folder; after that, `brew` commands never need `sudo`.
- **Safe**: It never touches the read-only part of the OS.
- **Persistent**: Your apps will survive SteamOS updates.

## How to Install Homebrew
To install Homebrew, you just need to run one command in your terminal. Open **Konsole** (from {{ collections.posts | chapterLink('bash') | safe }}) and paste this:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

**What did that just do?** `curl` downloaded Homebrew's official install script, and `/bin/bash -c` ran it. It asks for your admin password once, creates `/home/linuxbrew/.linuxbrew`, and downloads Homebrew into it.

### The "Path" Step (Important!)
After the installation finishes, look for the **Next steps** section at the bottom of the terminal. It lists three commands that tell your shell where to find `brew`. For Bash, they look like this:

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

## Basic Homebrew Commands
Once installed, using Homebrew is incredibly easy. Here are the only three commands you really need to know:

1. **To install an app:** `brew install [app-name]`
   - *Example:* `brew install fastfetch` (shows your Deck's specs in style)
2. **To update your apps:** `brew update` followed by `brew upgrade`
3. **To see what you've installed:** `brew list`

> [!TIP]
> **Check before you brew.** Many popular tools, like `htop`, `ncdu` and `ripgrep`, already ship with SteamOS. Run `command -v <tool>` first; if it prints a path, you already have it. See {{ collections.posts | chapterLink('preinstalled') | safe }} for the full tour.

### Why this is a Game Changer
With Homebrew, you can install specialized developer tools, better terminal utilities, or even simple games, all while keeping your Steam Deck's operating system pristine and safe.

---

Ready for a more powerful alternative? There's a package manager built around instant rollbacks and reproducible setups.
