---
layout: base.njk
title: " File System"
excerpt: "Where are my games and my SD card?"
tags:
  - posts
  - steamos
  - beginner
---

#  SteamOS File System (Where is my stuff?) 

If you're from Windows, Linux's file system looks like a puzzle. Let's break it down into things you actually need to know.

> [!NOTE]
> **Slashes go the other way!** On Windows, file paths use backslashes (`C:\Users\Name`). On Linux, file paths use forward slashes (`/home/deck`).

## The 'Home' (Your Sanctuary)
Everything you do is in `/home/deck`.
- It contains your usual 'Documents', 'Downloads', and 'Desktop' folders, just like a Windows user profile.
- Unlike Windows (`C:\Users\Name`), everything for the user lives here.
- Steam games are hidden here: `.local/share/Steam/steamapps/common`.

## Where is my SD Card?
This is the \#1 question for noobs. It's not `D:\`.
In SteamOS, your SD card is 'mounted' in:
`/run/media/deck/*` (it will be named the block device).

### Pro-Tip: Shortcuts
In the file manager (**Dolphin**), your SD card usually shows up on the left sidebar under 'Removable Devices'. You can drag it to 'Places' to make it a permanent shortcut!

## The 'Hidden' Space-Eaters
Ever wonder why your 'Other' storage is full? 
- **Shader Cache**: These are pre-rendered graphics that Steam downloads to make games run smoother.
- **Compatdata**: Since Steam uses 'Proton' to run Windows games, it creates a 'Fake Windows C: Drive' for *every single game*. 
They live in: `/home/deck/.local/share/Steam/steamapps/shadercache` and `compatdata`.

## 3 Critical Linux Rules to Remember
Moving from Windows to Linux means rewiring your brain slightly. Keep these three rules in mind:

### 1. The "Dot" Means Hidden
You might notice the folder above is named `.local`. In Linux, simply adding a dot `.` to the beginning of a file or folder name makes it invisible! 
- **How to see them:** In the Dolphin file manager, click the menu in the top right and select "Show Hidden Files" (or press `Ctrl+H` on a keyboard). 

### 2. Case Matters. A Lot. 
On Windows, a folder named `Mods` and a folder named `mods` are treated exactly the same. 
**On Linux, they are two completely different folders.** If a game guide tells you to put files in the `mods` folder, but you name it `Mods`, the game will completely ignore it. Pay close attention to capital letters!

### 3. 'Look, But Don't Touch' (The Immutable OS)
Unlike a normal Windows PC, the Steam Deck's core system files (outside of your `/home/deck` folder) are "locked" down. This is called an **Immutable Filesystem**. Valve does this so a bad system update or a rogue program doesn't officially "brick" your Deck. You can explore those folders, but you can't write to them. Stick to `/home/deck`!

## Dolphin Tips
- **Splitting the view**: Press `F3` to see two folders side-by-side. Great for moving files!
- **Opening terminal here**: Press `F4` if you ever need to type a command in a specific folder. (Don't be scared!)

Understanding your files is the key to becoming a Steam Deck master. Now that you're an explorer, let's talk about managing your storage and getting the most out of your SD card.

{% next_chapter %}
