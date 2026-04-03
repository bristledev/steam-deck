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

If you've been following along, you've started to explore the Steam Deck's terminal. But you might have noticed a problem: SteamOS is "read-only." This means you can't just install any Linux app you want using the standard `pacman` command. 

That’s where **Homebrew** comes in.

## What is Homebrew?
Originally created for Mac users, **[Homebrew](https://brew.sh/)** (or "Linuxbrew" on Linux) is a package manager that lets you install thousands of useful tools and apps *without* needing to mess with the core SteamOS files. 

Think of it like a second App Store, but for the terminal.

## Why use it on a Steam Deck?
The Steam Deck is designed to be safe and stable. If you try to install software the 'traditional' Linux way, Valve might overwrite it during the next SteamOS update. 

**Homebrew is different:**
- **No Sudo Needed**: It installs everything inside your own home folder.
- **Safe**: It never touches the read-only part of the OS.
- **Persistent**: Your apps will survive SteamOS updates.

## How to Install Homebrew
To install Homebrew, you just need to run one command in your terminal. Open **Konsole** (from {{ collections.posts | chapterLink('bash') | safe }}) and paste this:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

### The "Path" Step (Important!)
After the installation finishes, you'll see a message at the bottom of the terminal telling you to run a few more commands. These commands tell SteamOS where to find the "brew" command. 

**Pro-tip:** If you followed {{ collections.posts | chapterLink('fish') | safe }} and are using **Fish Shell**, you’ll want to make sure you add Homebrew to your Fish path as well.

## Basic Homebrew Commands
Once installed, using Homebrew is incredibly easy. Here are the only three commands you really need to know:

1. **To install an app:** `brew install [app-name]`
   - *Example:* `brew install htop` (a better activity monitor)
2. **To update your apps:** `brew update` followed by `brew upgrade`
3. **To see what you've installed:** `brew list`

### Why this is a Game Changer
With Homebrew, you can install specialized developer tools, better terminal utilities, or even simple games, all while keeping your Steam Deck's operating system pristine and safe.

---

Ready for a more powerful alternative? Next we'll look at **Nix (Determinate Nix)** – the powerhouse package manager!
