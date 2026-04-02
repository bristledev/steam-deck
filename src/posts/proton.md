---
layout: base.njk
title: " The Proton Filesystem Maze"
excerpt: "How to find where Steam hides your Windows game saves."
tags:
  - posts
  - steamos
  - gaming
  - intermediate
---

#  The Proton Filesystem Maze 🕵️‍♂️

In {{ collections.posts | chapterLink('filesystem') | safe }}, we learned that games are primarily stored in `.local/share/Steam/steamapps/common`. But what if you want to back up a save file for a game that doesn't have Steam Cloud? What if you want to drop a mod into a game's `Documents` folder?

If you navigate to `/home/deck/Documents`, it's empty. Where is the game putting those files?

Welcome to the **Proton Maze**.

## Understanding the "Prefix"

When you launch a Windows game on the Steam Deck, Valve's **Proton** translation layer steps in. Proton doesn't just translate code; it creates a microscopic, fake Windows operating system for *every single game*. 

This fake OS environment is called a **Wine Prefix** (or just "Prefix"). 

To a game like *Skyrim* or *Cyberpunk 2077*, it thinks it literally lives on a `C:\` drive. But that `C:\` drive is actually just a folder hidden deep inside SteamOS!

## Where are the Prefixes?

Every Steam game installed on your system has a dedicated prefix folder inside your `compatdata` directory.

The master path is:
`/home/deck/.local/share/Steam/steamapps/compatdata/`

> [!NOTE]
> Remember, the `.local` folder is hidden! You must press `Ctrl+H` (or toggle "Show Hidden Files" in Dolphin's menu) to see it.

When you open the `compatdata` folder, you won't see game names. You will see a giant list of numbers.

### The "AppID"

Steam identifies every game by a unique number called an **AppID**.
For example:
- *Elden Ring* is **1245620**
- *Cyberpunk 2077* is **1091500**

To find the AppID for the game you are looking for:
1. Open the Steam store page for the game in a web browser.
2. Look at the URL at the top. It will look like: `store.steampowered.com/app/1245620/...`
3. That number is the folder name inside your `compatdata`!

## Inside the Prefix's "Fake C: Drive"

Let's say you want to find your *Elden Ring* save files.
Navigate to `/home/deck/.local/share/Steam/steamapps/compatdata/1245620/pfx/drive_c/`

You are now looking at the fake Windows `C:\` drive for *Elden Ring*. From here, the path is exactly identical to a real Windows PC!

To find your user documents:
Go to `users` -> `steamuser`

Inside `steamuser`, you will see your familiar Windows folders:
- `AppData/` (where 90% of save files live)
- `Documents/` (where most config/ini files and some saves live)
- `Saved Games/`

For our *Elden Ring* example, the saves are tucked away in `AppData/Roaming/EldenRing/`.

> [!TIP]
> **Protips for Modding:**
> If a mod guide for Windows tells you to place a file in `%APPDATA%\GameName`, this `pfx/drive_c/users/steamuser/AppData/Roaming/GameName` directory is *exactly* where you should put it on the Steam Deck!

## Non-Steam Games

If you add a Non-Steam Game to your library (like an Epic Games installer or a romhack), Steam generates a completely random, massive AppID for it (like `3856193745`). 

Because there's no storefront URL to check, finding these prefixes is harder. The best way is to sort the `compatdata` folder by **"Modified"** date in Dolphin immediately after playing the game. The folder that jumped to the top of the list is your game!

## Making Shortcuts

Navigating to `.local/share/Steam/steamapps/compatdata` is tedious. 
**Do yourself a favor:** Drag the `compatdata` folder over to the left sidebar in Dolphin ("Places") to pin it permanently. Your future modding self will thank you!

---

Now that you can navigate the hardest part of the Linux filesystem, let's talk about what happens when things go wrong — and why you shouldn't worry about it.

{% next_chapter %}
