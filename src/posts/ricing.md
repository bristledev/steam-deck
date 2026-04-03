---
layout: base.njk
title: " Terminal Eye Candy"
excerpt: "The tools that make your terminal look like a sci-fi cockpit."
tags:
  - posts
  - customization
  - terminal
  - intermediate
---

# Terminal Eye Candy 🍬

You've got Starship making your prompt gorgeous. Now let's make *everything else* in the terminal look just as good.

Welcome to the world of **terminal ricing** — the art of customizing your command line until it looks so good you start opening the terminal just to admire it.

> [!NOTE]
> Every tool in this chapter can be installed via {{ collections.posts | chapterLink('homebrew') | safe }}. We'll show the `brew install` command for each one, but they're also available through {{ collections.posts | chapterLink('nix') | safe }} if that's your setup.

---

## 🖥️ fastfetch — The Specs Flex

**[fastfetch](https://github.com/fastfetch-cli/fastfetch)** is the first thing every Linux ricer installs. It displays your system information — OS, kernel, CPU, GPU, RAM, shell, terminal — alongside a stylish ASCII art logo. It's the PC Master Race specs screenshot, but for your terminal.

```bash
brew install fastfetch
```

Run it with:
```bash
fastfetch
```

You'll see something like:
```
               .,,,,.                   deck@antlerdeck
        .,'onNMMMMMNNnn',.             ---------------
     .'oNMANKMMMMMMMMMMMNNn'.          OS: SteamOS x86_64
   .'ANMMMMMMMXKNNWWWPFFWNNMNn.        Host: Jupiter (1)
  ;NNMMMMMMMMMMNWW'' ,.., 'WMMM,       Kernel: Linux 6.16.12-valve14-1-neptune-616-g32b0d37b9c50
 ;NMMMMV+##+VNWWW' .+;'':+, 'WMW,      Uptime: 1 day, 6 hours, 49 mins
,VNNWP+######+WW,  +:    :+, +MMM,     Packages: 1154 (pacman), 138 (nix-user), 59 (nix-default), 65 (flatpak-system), 20 (flatpak-user), 82 (brew), 2 (brew-cask)
  '*#########*'     '*,,*' .+NMMMM.    Shell: fish 4.0.2
     `'*###*'          ,.,;###+WNM,    Display (ANX7530 U): 800x1280 in 7", 60 Hz [Built-in]
         .,;;,      .;##########+W     Terminal: tailscaled
,',.         ';  ,+##############'     CPU: AMD Custom 0405 (8) @ 3.50 GHz
 '###+. :,. .,; ,###############'      GPU: AMD Custom GPU 0405 [Integrated]
  '####.. `'' .,###############'       Memory: 3.41 GiB / 14.46 GiB (24%)
    '#####+++################'         Swap: 0 B / 7.23 GiB (0%)
      '*##################*'           Disk (/): 3.43 GiB / 5.00 GiB (69%) - btrfs
         ''*##########*''              Disk (/home): 637.51 GiB / 940.05 GiB (68%) - ext4
              ''''''                   Disk (/run/media/deck/SN512): 128.87 GiB / 468.16 GiB (28%) - ext4
                                       Disk (/var): 186.74 MiB / 229.91 MiB (81%) - ext4
                                       Local IP (wlan0): 10.0.0.54/24
                                       Battery (GETAC): 99% [AC Connected]
                                       Locale: en_US.UTF-8
```

### Make it Run on Every New Terminal
Want to see your specs every time you open Konsole? Add `fastfetch` to the end of your shell's config file:

**Bash** (`~/.bashrc`):
```bash
fastfetch
```

**Fish** (`~/.config/fish/config.fish`):
```fish
fastfetch
```

> [!TIP]
> **Customization runs deep.** Run `fastfetch --gen-config` to create a config file at `~/.config/fastfetch/config.jsonc`, where you can choose exactly which info modules to show, change the logo, and tweak colors. Check out the [wiki](https://github.com/fastfetch-cli/fastfetch/wiki) for examples.

---

## 📊 btop — The Sci-Fi Dashboard

**[btop](https://github.com/aristocratos/btop)** is a system monitor that looks like it belongs on the bridge of a starship. It shows CPU, memory, disk, network, and running processes — all in real time with beautiful graphs and color themes.

[![asciicast](https://asciinema.org/a/SigmzvU4M4mT4nYl.svg)](https://asciinema.org/a/SigmzvU4M4mT4nYl)

Good news — **btop is already installed on SteamOS!** Just open Konsole and run:
```bash
btop
```

You'll get a full-screen dashboard with animated graphs, per-core CPU usage, memory bars, network throughput, and a process list. Use your arrow keys to navigate and `q` to quit.

### Why Gamers Love It
- **Monitor thermals while gaming** — SSH into your Deck from another device and run `btop` to watch temps and CPU usage in real time.
- **Find runaway processes** — if a game crashes but something is still eating CPU, `btop` will show you exactly what it is.
- **It just looks incredible** — multiple built-in themes, and it auto-detects your terminal colors.

> [!TIP]
> Press `Esc` inside btop to open the options menu, where you can switch between themes. "TTY" is minimal, "Default" is colorful, and "Dracula" / "Gruvbox" are popular community favorites.

---

## 🦇 bat — cat, But Beautiful

**[bat](https://github.com/sharkdp/bat)** is a drop-in replacement for `cat` that adds syntax highlighting, line numbers, and Git change markers. Every file you view becomes instantly readable.

```bash
brew install bat
```

Instead of:
```bash
cat ~/.config/starship.toml
```

Use:
```bash
bat ~/.config/starship.toml
```

The difference is night and day — config files get color-coded, scripts get proper syntax highlighting, and you can actually *read* what you're looking at.

### Make it the Default
You can alias `cat` to `bat` so you get the pretty version every time:

**Bash** (`~/.bashrc`):
```bash
alias cat="bat"
```

**Fish** (`~/.config/fish/config.fish`):
```fish
alias cat="bat"
```

> [!NOTE]
> `bat` automatically pages long files (like `less` does). If you prefer the old `cat` behavior of dumping everything at once, use `bat --paging=never` or the alias `alias cat="bat --paging=never"`.

---

## 📁 eza — ls, But Gorgeous

**[eza](https://github.com/eza-community/eza)** is a modern replacement for `ls` that adds colors, file type icons, Git status, and tree views. Directory listings go from a wall of white text to something you'd actually want to look at.

```bash
brew install eza
```

Try it out:
```bash
eza -la --icons --git
```

You'll see colored file types, permission columns, file sizes in human-readable format, Git status indicators, and icons for every file type (if you have a Nerd Font installed).

### The Tree View
One of eza's best features is its built-in tree view:
```bash
eza --tree --level=2 --icons
```
This shows your directory structure as a visual tree — no more piping through `find` or installing `tree` separately.

### Suggested Aliases
Add these to your shell config to make eza your default:

**Bash** (`~/.bashrc`):
```bash
alias ls="eza --icons"
alias ll="eza -la --icons --git"
alias tree="eza --tree --icons"
```

**Fish** (`~/.config/fish/config.fish`):
```fish
alias ls="eza --icons"
alias ll="eza -la --icons --git"
alias tree="eza --tree --icons"
```

> [!TIP]
> **Icons showing as boxes?** You need a **[Nerd Font](https://www.nerdfonts.com/)** installed for the icons to render. Download one (like "JetBrainsMono Nerd Font"), extract it to `~/.local/share/fonts/`, and set it as your Konsole font under **Settings → Edit Current Profile → Appearance**.

---

## 🎭 Pure Vibes (The Fun Stuff)

These tools serve absolutely no practical purpose. They exist purely to make your terminal feel alive. And that's exactly why you need them.

### cmatrix — The Matrix Rain
```bash
brew install cmatrix
```
```bash
cmatrix
```
Digital rain cascades down your screen exactly like the opening sequence of *The Matrix*. Press `q` to exit (or don't — just leave it running to impress anyone walking by). Try `cmatrix -B` for bold characters or `cmatrix -C red` for a different color.

### cbonsai — Grow a Bonsai Tree
```bash
brew install cbonsai
```
```bash
cbonsai -l
```
A randomized bonsai tree grows in your terminal, branch by branch. Run it again and you get a completely different tree. Use `-l` for a live-growing animation or `-p` to just print the final result. It's oddly zen.

### pipes.sh — Animated Pipes
```bash
brew install pipes-sh
```
```bash
pipes.sh
```
Colorful pipes snake across your screen, turning and branching like a screensaver from the '90s. Completely mesmerizing. Press `q` when you finally snap out of it.

### lolcat — Rainbow Everything
```bash
brew install lolcat
```
Pipe *any* command through `lolcat` to make its output rainbow:
```bash
fastfetch | lolcat
fortune | lolcat
echo "I use SteamOS btw" | lolcat
```
Combine it with fastfetch for the ultimate flex screenshot.

---

## 📸 The r/unixporn Starter Pack

Want to know a secret? With just the tools from this chapter and the {{ collections.posts | chapterLink('starship') | safe }} chapter, you already have everything you need to post to **[r/unixporn](https://www.reddit.com/r/unixporn/)** — the subreddit where people share their beautiful Linux setups.

The classic screenshot formula:
1. Set up **Starship** with a Nerd Font and a nice preset
2. Run **fastfetch** (piped through `lolcat` if you're feeling bold)
3. Open **btop** in a split pane
4. Have an **eza --tree** visible somewhere
5. Screenshot → post → collect karma

---

Your terminal now looks better than most people's entire desktops. But let's make sure it also *works* faster — next up, keyboard shortcuts that'll make you a terminal speed demon.

{% next_chapter %}
