---
layout: base.njk
title: "🍬 Terminal Eye Candy"
excerpt: "Tools that make the terminal nicer to look at and easier to read, plus a few that are just for fun."
tags:
  - posts
  - customization
  - terminal
  - intermediate
---

# Terminal Eye Candy

With {{ collections.posts | chapterLink('starship') | safe }}, your prompt shows more than a folder name. This chapter covers tools that do the same for the rest of the terminal: system information at a glance, color-coded files, readable folder listings, and a few things that are just for fun. Customizing your setup like this is known as *ricing* in Linux circles.

> [!NOTE]
> Every tool in this chapter can be installed with {{ collections.posts | chapterLink('homebrew') | safe }}, so we show the `brew install` command for each one. They're also available through {{ collections.posts | chapterLink('nix') | safe }}.

## fastfetch: Your System at a Glance

**[fastfetch](https://github.com/fastfetch-cli/fastfetch)** prints your system information (operating system, kernel, CPU, GPU, memory, disks, battery) next to an ASCII-art logo. It's the screenshot people post when they show off a Linux setup.

```bash
brew install fastfetch
```

Run it with:

```bash
fastfetch
```

On our test Deck, the output looked like this (trimmed to the most useful lines):

```
              .,,,,.                   deck@antlerdeck
        .,'onNMMMMMNNnn',.             ---------------
     .'oNMANKMMMMMMMMMMMNNn'.          OS: SteamOS x86_64
   .'ANMMMMMMMXKNNWWWPFFWNNMNn.        Host: Jupiter (1)
  ;NNMMMMMMMMMMNWW'' ,.., 'WMMM,       Kernel: Linux 7.2.7-valve1-1-neptune-72-gc8730d37f9c6
 ;NMMMMV+##+VNWWW' .+;'':+, 'WMW,      Shell: bash 5.3.15
,VNNWP+######+WW,  +:    :+, +MMM,     Display (ANX7530 U): 800x1280 in 7", 60 Hz [Built-in]
'+#############,   +.    ,+' +NMMM     CPU: AMD Custom 0405 (8) @ 3.50 GHz
  '*#########*'     '*,,*' .+NMMMM.    GPU: AMD Custom GPU 0405 [Integrated]
     `'*###*'          ,.,;###+WNM,    Memory: 4.03 GiB / 14.45 GiB (28%)
         .,;;,      .;##########+W     Disk (/): 3.51 GiB / 5.00 GiB (70%) - btrfs
,',.         ';  ,+##############'     Disk (/home): 843.57 GiB / 940.05 GiB (90%) - ext4
 '###+. :,. .,; ,###############'      Disk (/run/media/deck/SN512): 131.27 GiB / 468.16 GiB (28%) - ext4
  '####.. `'' .,###############'       Disk (/var): 194.47 MiB / 229.91 MiB (85%) - ext4
    '#####+++################'         Battery (GETAC): 99% [AC Connected]
      '*##################*'
         ''*##########*''
              ''''''
```

### Showing It in Every New Terminal

To see this whenever you open Konsole, add `fastfetch` to your shell's startup file.

**Bash:** add this line to the end of `~/.bashrc`:

```bash
fastfetch
```

SteamOS's default `~/.bashrc` stops early for non-interactive shells, so this won't interfere with file transfers over SSH.

**Fish:** Fish runs `config.fish` for every session, including the one an SFTP app like WinSCP opens behind the scenes. Extra output there breaks file transfers, so put `fastfetch` inside an interactive check in `~/.config/fish/config.fish`:

```fish
if status is-interactive
    fastfetch
end
```

> [!TIP]
> **Choosing what it shows:** run `fastfetch --gen-config` to create `~/.config/fastfetch/config.jsonc`. In that file you can choose which details to show, change the logo and adjust the colors. The **[fastfetch wiki](https://github.com/fastfetch-cli/fastfetch/wiki)** has examples.

## btop: A Live System Monitor

**[btop](https://github.com/aristocratos/btop)** shows CPU, memory, disk, network and running programs in real time, with graphs. It comes with SteamOS, so there's nothing to install:

```bash
btop
```

Use the arrow keys to move around, and press `q` to quit.

[![asciicast](https://asciinema.org/a/SigmzvU4M4mT4nYl.svg)](https://asciinema.org/a/SigmzvU4M4mT4nYl)

It's useful for more than looks:

- **Watching temperatures while you play:** SSH into your Deck from another computer and run `btop` there while a game runs.
- **Finding runaway programs:** if a game has crashed but something is still using the CPU, btop shows you what it is.

> [!TIP]
> Press **Esc** inside btop to open its menu, then **Options** to switch color themes. "TTY" is plain, "Default" is colorful, and "dracula" and "gruvbox" are popular choices.

## bat: cat With Colors

**[bat](https://github.com/sharkdp/bat)** works like `cat`, but adds syntax highlighting, line numbers and markers for lines changed in Git.

```bash
brew install bat
```

Compare the two on the same file:

```bash
cat ~/.config/starship.toml
bat ~/.config/starship.toml
```

With `bat`, settings names, values and comments each get their own color, which makes long config files much easier to scan.

### Using bat Instead of cat

To use bat whenever you type `cat`, add an alias.

**Bash** (`~/.bashrc`):

```bash
alias cat="bat"
```

**Fish** (`~/.config/fish/config.fish`):

```fish
alias cat="bat"
```

> [!NOTE]
> `bat` scrolls long files one page at a time, like `less`. If you'd rather have the whole file printed at once, like `cat`, use `alias cat="bat --paging=never"` instead.

## eza: ls With Colors and Icons

**[eza](https://github.com/eza-community/eza)** works like `ls`, but adds colors, file-type icons, Git status and a tree view.

```bash
brew install eza
```

Try it:

```bash
eza -la --icons --git
```

You'll see file types in different colors, permissions, readable file sizes, Git status markers, and an icon for each file type (if you have a Nerd Font installed; see the Starship chapter).

### Tree View

eza can also show a folder as a tree:

```bash
eza --tree --level=2 --icons
```

It's like the `tree` command that comes with SteamOS, with colors, icons and Git status added. `--level=2` limits how many folders deep it goes.

### Suggested Aliases

To use eza by default, add these to your shell's startup file.

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

## Just for Fun

These tools have no practical use. They're here because they're fun to watch.

### cmatrix

```bash
brew install cmatrix
cmatrix
```

Green characters rain down the screen, like the opening of *The Matrix*. Press `q` to quit. Try `cmatrix -B` for bold characters, or `cmatrix -C red` for another color.

### cbonsai

```bash
brew install cbonsai
cbonsai -l
```

A bonsai tree grows in your terminal, branch by branch, and it's different every time. `-l` shows it growing; `-p` prints the finished tree straight away.

### pipes.sh

```bash
brew install pipes-sh
pipes.sh
```

Colored pipes wind across the screen like an old screensaver. Press any key to stop.

### lolcat

```bash
brew install lolcat fortune
```

`lolcat` colors any text that's piped into it in a rainbow. (`fortune` prints a random quote, which makes a good test.)

```bash
fastfetch | lolcat
fortune | lolcat
echo "I use SteamOS btw" | lolcat
```

## Sharing Your Setup

If you want to share the result, **[r/unixporn](https://www.reddit.com/r/unixporn/)** is the Reddit community where people post their Linux desktop and terminal setups. A typical terminal screenshot combines:

1. A Starship preset with a Nerd Font.
2. `fastfetch`, optionally piped through `lolcat`.
3. `btop` in a Konsole split view.
4. An `eza --tree` listing.

Looks are half of it. The next chapter is about speed: keyboard shortcuts that let you edit commands without reaching for the arrow keys.
