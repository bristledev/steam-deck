---
layout: base.njk
title: "Terminal Superpowers (zoxide & fzf)"
excerpt: "Navigate like a pro and fuzzy-find anything in seconds."
tags:
  - posts
  - terminal
  - productivity
  - advanced
---

# Terminal Superpowers (zoxide & fzf) ⚡

You've made your terminal beautiful with {{ collections.posts | chapterLink('starship') | safe }}. Now let's make it *smart*. These two tools will fundamentally change how you interact with the command line — and they're especially powerful on the Steam Deck, where navigating deep, hidden paths is a daily struggle.

## 🚀 zoxide — "Your Terminal Remembers"

Ever get tired of typing out full paths to get where you want to go?
```bash
cd /home/deck/.local/share/Steam/steamapps/compatdata/
```

What if you could just type:
```bash
z compat
```

That's **[zoxide](https://github.com/ajeetdsouza/zoxide)**. It's a smarter replacement for `cd` that *learns* which directories you visit most often. The more you use it, the smarter it gets.

### How it Works
Every time you navigate to a folder (using `cd` or `z`), zoxide silently records it in a tiny database. When you type `z` followed by *any part* of a directory name you've visited before, it fuzzy-matches against your history and jumps to the best result.

- `z down` → jumps to `/home/deck/Downloads`
- `z compat` → jumps to `.local/share/Steam/steamapps/compatdata`
- `z my-ubuntu` → jumps to wherever your Distrobox home lives

The key thing to understand: **zoxide only knows about directories you've already visited.** The first time you navigate somewhere, use `cd` or `z` with the full path. After that, zoxide remembers it and you can use a short keyword forever.

### Installing zoxide

#### Via Homebrew (from {{ collections.posts | chapterLink('homebrew') | safe }}):
```bash
brew install zoxide
```

#### Via Nix (from {{ collections.posts | chapterLink('nix') | safe }}):
```bash
nix profile install nixpkgs#zoxide
```

### Setting it Up
After installing, you need to tell your shell to use it.

**For Bash** — add to `~/.bashrc`:
```bash
eval "$(zoxide init bash)"
```

**For Fish** — add to `~/.config/fish/config.fish`:
```bash
zoxide init fish | source
```

> [!TIP]
> Once zoxide is set up, you can also use `zi` (zoxide interactive) to get a full menu of your most-visited directories. This is incredible for exploring your Steam library's messy folder structure!

---

## 🔍 fzf — "Fuzzy-Find Everything"

**[fzf](https://github.com/junegunn/fzf)** is a general-purpose fuzzy finder. It lets you interactively search through *anything* — files, folders, command history, running processes — by just typing a few characters.

### The Killer Feature: History Search
By default, pressing `Up Arrow` in your terminal scrolls through commands one at a time. With fzf installed, you can press **`Ctrl+R`** and get an instant, searchable list of every command you've ever typed.

Start typing `podman` and it will instantly filter down to every Podman command you've ever run. Select one and hit `Enter` to run it again. No more scrolling through hundreds of commands!

### Installing fzf

#### Via Homebrew:
```bash
brew install fzf
```

#### Via Nix:
```bash
nix profile install nixpkgs#fzf
```

### More fzf Tricks

Once installed, fzf supercharges your terminal in several ways:

- **`Ctrl+R`**: Fuzzy search your command history.
- **`Ctrl+T`**: Fuzzy search for a file in the current directory and paste its path.
- **`Alt+C`**: Fuzzy search for a directory and `cd` into it.

### Example: Finding a Mod File Instantly
Imagine you downloaded a mod somewhere in your home folder but can't remember where. Instead of clicking through folders in Dolphin, just type:

```bash
find ~ -name "*.pak" | fzf
```

This searches your entire home directory for `.pak` files and lets you interactively filter the results. Select the file you want and its full path is printed — ready to copy!

---

## 🤝 Better Together

The real magic happens when zoxide and fzf are both installed. zoxide can use fzf as its interactive picker, which means `zi` (zoxide interactive) gives you a beautiful fuzzy-searchable list of all your frequently visited directories.

Both tools are lightweight (they're built in Rust 🦀), install in seconds, and work with both Bash and Fish. Once you've used them for a day, plain `cd` will feel like going back to dial-up.

---

Now that your terminal is beautiful, smart, *and* fast, you've truly completed the power user journey!

{% next_chapter %}
