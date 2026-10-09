---
layout: base.njk
title: "📁 Where Your Files Live"
excerpt: "Where SteamOS keeps your files, your games and your SD card, and three rules that differ from Windows."
tags:
  - posts
  - steamos
  - beginner
---

# Where Your Files Live

If you're coming from Windows, Linux organizes files differently. There are no drive letters, and your games aren't in `Program Files`. This chapter covers the handful of locations you'll actually use.

> [!NOTE]
> **Slashes go the other way.** Windows paths use backslashes (`C:\Users\Name`). Linux paths use forward slashes (`/home/deck`).

## Your Home Folder

Almost everything that belongs to you lives in `/home/deck`, your *home folder*. It's the Linux equivalent of `C:\Users\Name` on Windows:

- It contains the usual **Documents**, **Downloads** and **Desktop** folders.
- Your app settings and game data live here too, in hidden folders (more on those below).
- Your Steam games are installed in `/home/deck/.local/share/Steam/steamapps/common`.

You'll often see the home folder written as `~` for short, so `~/Downloads` means `/home/deck/Downloads`.

## Where Is My SD Card?

There's no `D:\` drive. SteamOS *mounts* your SD card (connects it to the folder tree) at `/run/media/deck/<card name>`, where the folder is named after the card's label. For example, a card labeled `SN512` appears at `/run/media/deck/SN512`.

In **Dolphin**, the file manager, your SD card shows up in the left sidebar under **Removable Devices**. Drag it up to **Places** to keep a permanent shortcut.

## Two Folders That Eat Space

Two hidden folders tend to take up more space than you'd expect:

- **Shader cache**: *shaders* are small programs that tell your GPU how to draw each effect. Steam downloads them already compiled, so games stutter less. They're stored in `~/.local/share/Steam/steamapps/shadercache`.
- **Compatdata**: to run a Windows game, Steam's Proton layer creates a fake Windows `C:` drive for each game. These live in `~/.local/share/Steam/steamapps/compatdata`.

You'll learn how to check and clean up both in the next chapter.

## Three Rules That Differ From Windows

### 1. A Leading Dot Means Hidden

The folder above is named `.local`. On Linux, any file or folder whose name starts with a dot is hidden. To see hidden files in Dolphin, open the menu in the top-right corner and select **Show Hidden Files**, or press **Ctrl+H** on a keyboard.

### 2. Capital Letters Matter

On Windows, `Mods` and `mods` are the same folder. On Linux, they're two different folders. If a mod guide tells you to put files in `mods` and you create `Mods`, the game won't find them, so copy names exactly.

### 3. The System Is Read-Only

Outside your home folder, the Steam Deck's core system files are locked. This design is called an *immutable* system, and it means a misbehaving program or a typo can't damage the operating system. You can look around those folders, but you can't change them, so keep your own files in `/home/deck`.

Protection against a bad *update* is a separate safety net, which we'll cover in {{ collections.posts | chapterLink('recovery') | safe }}. Later in this series, {{ collections.posts | chapterLink('steamos-anatomy') | safe }} shows exactly how the lock works, and the few system folders that *are* writable.

## Dolphin Shortcuts

| Key | What it does |
| :--- | :--- |
| **F3** | Splits the window to show two folders side by side, handy for moving files |
| **F4** | Opens a terminal panel inside the current folder (covered in the terminal chapters) |
| **Ctrl+H** | Shows or hides hidden files |

Your games, saves and app data all take up space somewhere in these folders. Next, let's see how much, and how to get some of it back.
