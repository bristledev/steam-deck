---
layout: base.njk
title: "⌨️ Keyboard Shortcuts (Readline)"
excerpt: "The keyboard shortcuts for editing commands in Bash, so you can fix and reuse them without the arrow keys."
tags:
  - posts
  - terminal
  - productivity
  - advanced
---

# Keyboard Shortcuts (Readline)

Fixing a typo at the start of a long command by holding the left arrow key gets tedious fast. Bash has keyboard shortcuts for jumping around a command, deleting whole words, and reusing parts of earlier commands. They come from a library called Readline.

## What Is Readline?

**[GNU Readline](https://tiswww.case.edu/php/chet/readline/rltop.html)** is the part of Bash that handles what you type on the command line. It's why **Up Arrow** recalls your last command and **Tab** completes file names. Many other terminal programs copy its shortcuts, including Python's interactive prompt (`>>>`), so they often work there too.

> [!NOTE]
> **Fish users:** Fish doesn't use Readline; it has its own line editor. It supports most of the shortcuts below by default, though a few behave slightly differently. For example, **Ctrl+W** in Fish deletes one part of a file path at a time rather than the whole path.

## The Essential Shortcuts

### Moving the Cursor

| Shortcut | What it does |
| :--- | :--- |
| **`Ctrl+A`** | Jump to the **start** of the line |
| **`Ctrl+E`** | Jump to the **end** of the line |
| **`Alt+F`** | Jump forward one **word** |
| **`Alt+B`** | Jump back one **word** |

> [!TIP]
> **A** is the start of the alphabet, **E** is for end, **F** for forward and **B** for back.

### Deleting Text

| Shortcut | What it does |
| :--- | :--- |
| **`Ctrl+W`** | Delete the **word** before the cursor |
| **`Ctrl+K`** | Delete everything **after** the cursor |
| **`Ctrl+U`** | Delete everything **before** the cursor |
| **`Alt+D`** | Delete the word **after** the cursor |

### Pasting Back and Undoing

Text you delete with **Ctrl+W**, **Ctrl+K** or **Ctrl+U** isn't thrown away. Readline keeps it in its own clipboard, called the *kill ring*.

| Shortcut | What it does |
| :--- | :--- |
| **`Ctrl+Y`** | Paste ("yank") the text you deleted last |
| **`Ctrl+_`** | Undo your last edit |

## Examples

### Adding sudo to the Start of a Command

You've typed a long command and realize it needs `sudo`:

```bash
systemctl enable --now sshd
```

Press **Ctrl+A** to jump to the start of the line, type `sudo `, and press **Enter**.

### Fixing the End of Your Last Command

You copied a file to the wrong folder:

```bash
cp ~/Downloads/wallpaper.png ~/Pictures/screenshots/
```

To fix it without retyping everything:

1. Press **Up Arrow** to bring the command back.
2. Press **Ctrl+W** to delete the last word, `~/Pictures/screenshots/`.
3. Type the right folder, `~/Pictures/wallpapers/`, and press **Enter**.

### Reusing the Last Argument With Alt+.

**Alt+.** inserts the last *argument* (the last word) of your previous command. It saves retyping long paths.

You've just looked at a settings file:

```bash
cat ~/.config/starship.toml
```

To edit it, type `nano `, then press **Alt+.**:

```bash
nano ~/.config/starship.toml
```

It works for folders too. After `mkdir -p ~/Games/emulation/roms/gba`, type `cd ` and press **Alt+.** to move into the folder you just created.

### Abandoning a Command

If you've typed half a command and changed your mind:

- **Ctrl+C** cancels it and gives you a fresh prompt.
- **Ctrl+U** clears the line, but keeps the text in the kill ring, so **Ctrl+Y** can bring it back.

## Cheat Sheet

| Category | Shortcut | Action |
| :--- | :--- | :--- |
| **Move** | `Ctrl+A` / `Ctrl+E` | Start / end of line |
| **Move** | `Alt+F` / `Alt+B` | Forward / back one word |
| **Delete** | `Ctrl+W` | Word before the cursor |
| **Delete** | `Ctrl+U` / `Ctrl+K` | Everything before / after the cursor |
| **Delete** | `Alt+D` | Word after the cursor |
| **Paste** | `Ctrl+Y` | Paste the last deleted text |
| **Undo** | `Ctrl+_` | Undo the last edit |
| **History** | `Up` / `Down` | Previous / next command |
| **History** | `Ctrl+R` | Search your command history |
| **Reuse** | `Alt+.` | Insert the last argument of the previous command |
| **Cancel** | `Ctrl+C` | Abandon the current line |
| **Clear** | `Ctrl+L` | Clear the screen |

These shortcuts speed up typing commands. The last chapter speeds up two other everyday jobs: getting to folders you use often, and finding commands you ran before.
