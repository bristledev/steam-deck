---
layout: base.njk
title: "🎮 Proton Prefixes and Saves"
excerpt: "Where Proton keeps each Windows game's fake C: drive, and how to find your saves and mod folders in it."
tags:
  - posts
  - steamos
  - gaming
  - intermediate
---

# Proton Prefixes and Saves

In {{ collections.posts | chapterLink('filesystem') | safe }}, you saw that games are installed in `~/.local/share/Steam/steamapps/common`. But say you want to back up the saves of a game that doesn't use Steam Cloud, or a mod guide tells you to put a file in the game's `Documents` folder. Your own `~/Documents` is empty, so where does the game put those files?

The answer is the game's *prefix*.

## What Is a Prefix?

When you launch a Windows game, Valve's **Proton** translation layer creates a small fake Windows installation just for that game, with its own `C:` drive, user folders and settings. This is called a *Wine prefix*, or just a *prefix*. (Wine is the open-source project Proton is built on.)

As far as a game like *Cyberpunk 2077* can tell, it's running on a Windows PC with a `C:` drive. That `C:` drive is really a folder on your Deck.

## Finding a Game's Prefix

Each Windows game you've played gets its own prefix folder inside:

`/home/deck/.local/share/Steam/steamapps/compatdata/`

> [!NOTE]
> The `.local` folder is hidden. Press **Ctrl+H** in Dolphin, or select **Show Hidden Files** from its menu, to see it.

Inside `compatdata`, there are no game names, only folders named with numbers.

### Looking Up a Game's AppID

Steam identifies every game by a number called its *AppID*, and each prefix folder is named after one. For example:

- *Elden Ring* is **1245620**
- *Cyberpunk 2077* is **1091500**

To find a game's AppID:

1. Open the game's Steam store page in a web browser.
2. Look at the address. It looks like `store.steampowered.com/app/1245620/...`
3. That number is the name of the game's folder in `compatdata`.

## Inside the Fake C: Drive

To find *Elden Ring*'s saves, open:

`/home/deck/.local/share/Steam/steamapps/compatdata/1245620/pfx/drive_c/`

This is *Elden Ring*'s `C:` drive. From here, the folders match a real Windows PC. Your Windows user folder is in `users/steamuser`, and inside it you'll find:

- `AppData/`, where most games keep their saves
- `Documents/`, where many games keep config files and some saves
- `Saved Games/`, used by a smaller number of games

*Elden Ring*'s saves, for example, are in `AppData/Roaming/EldenRing/`.

> [!TIP]
> **Translating mod guides:** when a Windows guide says to put a file in `%APPDATA%\GameName`, use `pfx/drive_c/users/steamuser/AppData/Roaming/GameName` inside that game's prefix.

## Non-Steam Games

When you add a non-Steam game to your library, like an Epic Games installer, Steam makes up a long AppID for it (like `3856193745`).

There's no store page to look that number up, so use timestamps instead: play the game, then sort the `compatdata` folder by **Modified** in Dolphin. The folder at the top is your game.

> [!CAUTION]
> **Removing a non-Steam game from your library deletes its prefix, saves included.** Since mid-2023, Steam cleans up a non-Steam game's prefix and shader cache when you remove it (see **[GamingOnLinux's report](https://www.gamingonlinux.com/2023/06/removing-non-steam-apps-now-cleans-up-on-steam-deck-and-linux-desktop)**). Copy your saves somewhere safe first.

## A Shortcut Worth Making

Typing `.local/share/Steam/steamapps/compatdata` gets old quickly. Drag the `compatdata` folder into the **Places** section of Dolphin's sidebar, and it's always one click away.

You now know where your games keep their most important files. Next: what happens when something on the Deck goes wrong, and the safety nets Valve built in.
