---
layout: base.njk
title: "Keyboard Shortcuts (Readline)"
excerpt: "The hidden shortcuts that make terminal pros look like wizards."
tags: posts
---

# Keyboard Shortcuts (Readline) ⌨️

Have you ever watched someone blast through the terminal, editing commands at lightning speed without reaching for the mouse? They aren't typing faster — they're using **Readline shortcuts**.

## What is Readline?

**[GNU Readline](https://tiswww.case.edu/php/chet/readline/rltop.html)** is a tiny, invisible library built into **Bash** (and many other terminal programs) that handles everything you type at the command line. It's the reason you can press `Up Arrow` to recall your last command or hit `Tab` to auto-complete a file name.

But `Up Arrow` and `Tab` are just the tip of the iceberg. Readline has dozens of keyboard shortcuts that most people never discover — and they work **everywhere**, not just in your shell. They work in `python`, `node`, `mysql`, and almost any interactive command-line tool.

> [!NOTE]
> **Fish Shell Users**: Fish doesn't use GNU Readline internally — it has its own editor. However, Fish supports most of the same shortcuts listed here by default, so these habits will serve you well in either shell!

---

## ✂️ The Essential Shortcuts

These are the shortcuts you'll use every single day. They all work without a mouse and are dramatically faster than using the arrow keys.

### Moving the Cursor

| Shortcut | What it does |
| :--- | :--- |
| **`Ctrl+A`** | Jump to the **beginning** of the line |
| **`Ctrl+E`** | Jump to the **end** of the line |
| **`Alt+F`** | Jump forward one **word** |
| **`Alt+B`** | Jump backward one **word** |

> [!TIP]
> **Think of it this way:** `A` = stArt, `E` = End, `F` = Forward, `B` = Backward.

### Deleting Text

| Shortcut | What it does |
| :--- | :--- |
| **`Ctrl+W`** | Delete the **word** before the cursor |
| **`Ctrl+K`** | Delete everything **after** the cursor (to end of line) |
| **`Ctrl+U`** | Delete everything **before** the cursor (to start of line) |
| **`Alt+D`** | Delete the word **after** the cursor |

### The "Undo" and "Paste"

Here's the secret most people don't know: when you delete text with `Ctrl+W`, `Ctrl+K`, or `Ctrl+U`, the deleted text isn't gone — it's saved in a clipboard called the **kill ring**.

| Shortcut | What it does |
| :--- | :--- |
| **`Ctrl+Y`** | **Paste** (\"yank\") the last deleted text back |
| **`Ctrl+_`** | **Undo** the last edit |

---

## 🎯 Real-World Examples

### Fixing a Typo at the Start of a Long Command
You just typed a monster command and realized you forgot `sudo`:
```
systemctl enable --now sshd
```
Instead of pressing `Home`, then typing `sudo `:
- **`Ctrl+A`** → jump to the start
- Type `sudo ` → done!

### Editing Your Last Command Instead of Retyping It
You just copied a file to the wrong place:
```bash
cp ~/Downloads/wallpaper.png ~/Pictures/screenshots/
```
You actually meant to put it in `~/Pictures/wallpapers/`. Instead of retyping the whole thing:
- Press **`Up Arrow`** to recall the command
- Press **`Ctrl+W`** to delete the last word (`~/Pictures/screenshots/`)
- Type the correct destination: `~/Pictures/wallpapers/`

### Grabbing the Last Argument with `Alt+.`
**`Alt+.`** pastes the **last argument** of the previous command. This is a huge time-saver whenever you're working with the same file or directory across multiple commands.

You just checked a config file:
```bash
cat /etc/NetworkManager/conf.d/wifi_backend.conf
```
Now you want to edit it. Type `nano`, then hit **`Alt+.`**:
```bash
nano /etc/NetworkManager/conf.d/wifi_backend.conf
```
No retyping that long path! This works just as well for directories — after running `mkdir -p ~/Games/emulation/roms/gba`, you can type `cd` and hit **`Alt+.`** to jump straight into the new directory.

### Wiping a Command You Changed Your Mind About
You're halfway through a command and decide you don't want to run it:
- **`Ctrl+C`** cancels and gives you a fresh prompt
- Or **`Ctrl+U`** clears the line but keeps it in the kill ring in case you want it back with **`Ctrl+Y`**

---

## 🧠 The Cheat Sheet

Here's everything in one place for quick reference:

| Category | Shortcut | Action |
| :--- | :--- | :--- |
| **Move** | `Ctrl+A` / `Ctrl+E` | Start / End of line |
| **Move** | `Alt+F` / `Alt+B` | Forward / Back one word |
| **Delete** | `Ctrl+W` | Delete word before cursor |
| **Delete** | `Ctrl+U` / `Ctrl+K` | Delete to start / end of line |
| **Delete** | `Alt+D` | Delete word after cursor |
| **Paste** | `Ctrl+Y` | Yank (paste) last deleted text |
| **Undo** | `Ctrl+_` | Undo last edit |
| **History** | `Up` / `Down` | Previous / next command |
| **History** | `Ctrl+R` | Reverse search through history |
| **Magic** | `Alt+.` | Insert last argument of previous command |
| **Cancel** | `Ctrl+C` | Abort current command |
| **Clear** | `Ctrl+L` | Clear the screen (same as `clear`) |

---

These shortcuts take about a day to become muscle memory, and once they click, you'll wonder how you ever lived without them. The terminal stops feeling like a text box and starts feeling like an instrument.

{% next_chapter %}
