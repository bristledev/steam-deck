---
layout: base.njk
title: "🔍 Faster Navigation (zoxide & fzf)"
excerpt: "Jump to folders you use often with a few letters, and search your command history and files as you type."
tags:
  - posts
  - terminal
  - productivity
  - advanced
---

# Faster Navigation (zoxide & fzf)

Steam Deck paths are long. Typing `cd /home/deck/.local/share/Steam/steamapps/compatdata/` more than once is enough to want a shortcut. This chapter adds two small tools: **zoxide**, which remembers the folders you visit, and **fzf**, which lets you search lists (your command history, your files) by typing a few letters.

## zoxide: A cd That Remembers

**[zoxide](https://github.com/ajeetdsouza/zoxide)** adds a command called `z`. Instead of typing a full path, you type part of a folder's name:

```bash
z compat
```

That jumps straight to `~/.local/share/Steam/steamapps/compatdata`, as long as you've been there before.

### How It Works

Every time you change folders, with `cd` or `z`, zoxide records it in a small database, along with how often and how recently you went there. When you type `z` and a word, it picks the best match from the folders it remembers:

- `z down` goes to `/home/deck/Downloads`.
- `z compat` goes to `~/.local/share/Steam/steamapps/compatdata`.
- `z mine` goes to `~/minecraft-data`, the server folder from {{ collections.posts | chapterLink('podman') | safe }}.

zoxide only knows folders you've already visited. The first time, use `cd` with the full path; after that, a few letters are enough.

### Installing zoxide

**Via Homebrew** (from {{ collections.posts | chapterLink('homebrew') | safe }}):

```bash
brew install zoxide
```

**Via Nix** (from {{ collections.posts | chapterLink('nix') | safe }}):

```bash
nix profile add nixpkgs#zoxide
```

### Turning It On

Your shell needs one line in its startup file.

**For Bash**, add to `~/.bashrc`:

```bash
eval "$(zoxide init bash)"
```

**For Fish**, add to `~/.config/fish/config.fish`:

```fish
zoxide init fish | source
```

Open a new terminal, and `z` is ready to use. zoxide also adds `zi`, a searchable menu of every folder it remembers. That one needs fzf, which comes next.

## fzf: Search as You Type

**[fzf](https://github.com/junegunn/fzf)** is a *fuzzy finder*: give it a list, start typing and it narrows the list to the entries that match, even if you only type a few letters from the middle of a word.

### Searching Your Command History

Your shell's own **Ctrl+R**, from {{ collections.posts | chapterLink('readline') | safe }}, already searches your history, but Bash shows only one match at a time. With fzf set up, **Ctrl+R** opens a list of every command you've run instead. Type `podman`, and the list shrinks to your Podman commands. Select one and press **Enter** to put it back on your command line, ready to run or edit.

### Installing fzf

**Via Homebrew:**

```bash
brew install fzf
```

**Via Nix:**

```bash
nix profile add nixpkgs#fzf
```

### Turning It On

Like zoxide, fzf's shortcuts only work once your shell loads them.

**For Bash**, add to `~/.bashrc`:

```bash
eval "$(fzf --bash)"
```

**For Fish**, add to `~/.config/fish/config.fish`:

```fish
fzf --fish | source
```

Open a new terminal, and you have fzf's version of **Ctrl+R** plus two new shortcuts:

| Shortcut | What it does |
| :--- | :--- |
| **Ctrl+R** | Search your command history in a full list |
| **Ctrl+T** | Search for a file below the current folder and paste its path |
| **Alt+C** | Search for a folder below the current one and `cd` into it |

### Example: Finding a Mod File

You downloaded a mod somewhere in your home folder but can't remember where. With `fd` (the file finder from {{ collections.posts | chapterLink('preinstalled') | safe }}) and fzf together:

```bash
fd -e pak . ~ | fzf
```

**What did that just do?** `fd -e pak . ~` listed every `.pak` file in your home folder, and the `|` sent that list to fzf. Type part of the mod's name to narrow it down, and press **Enter** to print the file's full path.

## Using Them Together

With both installed, `zi` opens zoxide's list of remembered folders in fzf, so you can pick a folder by typing a few letters of its name.

Both tools are small (zoxide is written in Rust, fzf in Go) and work the same way in Bash and Fish.

That's the end of the main series. The appendix collects official documentation, communities and channels for when you want to go further.
