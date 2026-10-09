---
layout: base.njk
title: "🗂️ Core Commands (GNU Coreutils)"
excerpt: "The everyday commands for copying, moving, deleting and reading files, with a hands-on practice run."
tags:
  - posts
  - terminal
  - intermediate
---

# Core Commands (GNU Coreutils)

Most of the basic commands you'll type, like `ls`, `cp` and `mv`, come from one collection called the **[GNU Core Utilities](https://www.gnu.org/software/coreutils/manual/coreutils.html)**, or *Coreutils* for short. Nearly every Linux system includes them, so what you learn here works far beyond the Deck. They behave the same in Bash and in Fish.

## Working With Files and Folders

| Command | What it does | Example |
| :--- | :--- | :--- |
| **`cp`** | Copies a file. Add `-r` ("recursive") to copy a folder and everything in it. | `cp -r MyMods ~/Backups/` |
| **`mv`** | Moves a file or folder, or renames it | `mv old_name.txt new_name.txt` |
| **`rm`** | Deletes a file. Add `-r` to delete a folder and its contents. | `rm -r OldMods` |
| **`mkdir`** | Creates a folder | `mkdir Backups` |
| **`rmdir`** | Deletes a folder, but only if it's empty | `rmdir Backups` |

> [!CAUTION]
> **The terminal has no Recycle Bin.** Files you delete with `rm` are gone immediately. Check the command, especially with `-r`, before you press **Enter**.

## Reading Files

| Command | What it does | Example |
| :--- | :--- | :--- |
| **`cat`** | Prints a whole file to the screen | `cat notes.txt` |
| **`head`** / **`tail`** | Prints the first or last 10 lines; handy for long log files | `tail notes.txt` |
| **`less`** | Opens a file you can scroll through; press `q` to quit | `less notes.txt` |

Strictly speaking, `less` is its own project rather than part of Coreutils, but SteamOS includes it too.

## Permissions

| Command | What it does | Example |
| :--- | :--- | :--- |
| **`chmod`** | Changes who can read, write or run a file | `chmod +x tool.AppImage` |
| **`chown`** | Changes who owns a file; usually needs `sudo` | `sudo chown deck file.txt` |

`chmod +x` is the terminal version of ticking **Allow executing file as program** in Dolphin, which you did in {{ collections.posts | chapterLink('appimage') | safe }}.

## A Practice Run

This creates a practice folder, works with a file inside it, then cleans up after itself:

```bash
mkdir ~/practice
cd ~/practice
echo "hello" > note.txt
cp note.txt copy.txt
mv copy.txt renamed.txt
ls
cat renamed.txt
cd ~
rm -r ~/practice
```

**What did that just do?** It created a folder called `practice` and moved into it. `echo "hello" > note.txt` wrote the word "hello" into a new file. `cp` made a copy, `mv` renamed the copy, `ls` listed both files, and `cat` printed the copy's contents. Finally, `cd ~` went back home and `rm -r` deleted the whole practice folder.

## Getting Help

The **[GNU Coreutils manual](https://www.gnu.org/software/coreutils/manual/coreutils.html)** documents every tool in detail. For quick examples, the cheat.sh trick from {{ collections.posts | chapterLink('bash') | safe }} works for all of them:

```bash
curl cht.sh/cp
```

Coreutils are only part of what SteamOS ships. The next chapter tours the rest of the toolbox that's already on your Deck.
