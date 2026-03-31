---
layout: base.njk
title: "The Ultimate Terminal Prompt (Starship)"
excerpt: "Make your terminal beautiful and informative across any shell."
tags: posts
---

# The Ultimate Terminal Prompt (Starship) 🚀

If you’ve followed the **Fish Shell** chapter, you know that the terminal doesn't have to be a boring black-and-white box. But what if you want that same beautiful, informative experience no matter which shell you're using?

Meet **[Starship](https://starship.rs/)**. 

Starship is a "minimal, blazing-fast, and infinitely customizable prompt" for any shell. It adds useful information to your command line—like your current Git branch, the version of Python you're using, or even your battery level—all wrapped in a sleek, modern design.

## 🛠️ Step 1: Installation (Choose Your Weapon)

There are three main ways to install Starship on your Steam Deck. Choose the one that fits your current setup!

### Option 1: The Direct Way (Recommended for Beginners)
This method works for everyone and doesn't require any extra tools. We'll download the Starship binary directly to your home folder's `bin` directory to avoid the "read-only" filesystem.

1. Open **Konsole**.
2. Run this command:
   ```bash
   curl -sS https://starship.rs/install.sh | sh -s -- --bin-dir ~/.local/bin
   ```
3. If it asks for your password, enter the one you set in the Terminal chapter.

### Option 2: The Homebrew Way
If you've already set up **{{ collections.posts | chapterLink('homebrew') | safe }}**, this is the cleanest way to keep Starship updated.

```bash
brew install starship
```

### Option 3: The Nix Way
If you're using the **{{ collections.posts | chapterLink('nix') | safe }}** package manager, just run:

```bash
nix profile add nixpkgs#starship
```

---

## ⚙️ Step 2: Configuration

Now that Starship is installed, we need to tell your shells to use it.

### For Bash Users
Open your `~/.bashrc` file:
```bash
nano ~/.bashrc
```
Add this line at the very bottom:
```bash
eval "$(starship init bash)"
```

### For Fish Users
Open your Fish configuration file:
```bash
nano ~/.config/fish/config.fish
```
Add this line at the very bottom:
```bash
starship init fish | source
```

---

## 🎨 Step 3: Making it Yours

By default, Starship looks great, but the real magic is in the **Presets**. 

1. Visit the **[Starship Presets Gallery](https://starship.rs/presets/)**.
2. Find a design you like (like "Pastel Powerline" or "Nerdfont Symbols").
3. Follow the simple instructions to copy the configuration into your `~/.config/starship.toml` file.

> [!TIP]
> **Need Icons?**
> Many Starship presets use special icons. If you see weird squares instead of icons, you might need to install a **Nerd Font**. Check out the **{{ collections.posts | chapterLink('customization') | safe }}** chapter for more on fonts!

---

Now that your terminal looks like it belongs in the future, let's make it *work* like it belongs there too.

{% next_chapter %}
