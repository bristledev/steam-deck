---
layout: base.njk
title: "💾 Storage & SD Cards"
excerpt: "Where your space goes, how to set up an SD card and how to get space back safely."
tags:
  - posts
  - steamos
  - gaming
  - beginner
---

# Storage & SD Cards

After a few weeks with your Steam Deck, the storage bar starts filling up faster than your game list suggests. Game installs are only part of it: shader caches and Proton's fake Windows drives take space too. This chapter shows you where the space goes and how to get it back without losing anything important.

## Steam's Storage Manager

Steam's own tool is the easiest place to start:

1. Press the **Steam** button, then go to **Settings → Storage**.
2. A bar chart shows how your space is used: games, DLC, updates, shaders and non-Steam content.
3. Select one or more games, then choose **Uninstall**, or **Move** to send them between your internal drive and SD card.

> [!TIP]
> **Moving is better than reinstalling.** **Move** transfers a game to the other drive as it is, so you don't have to download it again.

## Setting Up an SD Card

A microSD card is the easiest way to add space to a Deck: no tools, no reinstalling.

### Formatting

A brand-new SD card has to be formatted before Steam can use it. Steam's **Storage** settings show the card with a prompt to format it, or you can go to **Settings → System → Format SD Card**.

SteamOS formats the card as *ext4*, a Linux file system. Unlike the FAT32 or exFAT format the card probably came with, ext4 supports everything Linux and Proton expect, like file permissions and links between files.

The catch: Windows can't read ext4 without extra software. If you put the card into a Windows PC, Windows will offer to format it. Say no, or you'll erase your games.

> [!CAUTION]
> **Formatting erases everything on the card.** If you're reusing a card from a camera or phone, copy those files somewhere else first.

### Finding the Card

As you saw in {{ collections.posts | chapterLink('filesystem') | safe }}, the card appears at `/run/media/deck/<card name>`, and under **Removable Devices** in Dolphin's sidebar.

### Installing Games to the Card

Once it's formatted, Steam treats the card as a second library. When you install a game, the install dialog's **Install to:** option lets you pick the drive. To change where games go by default, select the drive in **Settings → Storage** and choose **Make Default**.

## Where the Hidden Space Goes

If your storage bar looks fuller than your game list explains, these are the usual causes.

### Shader Cache

Steam pre-downloads compiled shaders so games don't stutter the first time they draw something. Each game's cache is usually small, but they add up across dozens of games.

**Where it lives:** `~/.local/share/Steam/steamapps/shadercache/`

**How to clean it up:** The folders inside `shadercache` are named by AppID, a number you'll learn to look up in the next chapter. You can delete a game's folder by hand, and Steam rebuilds it the next time you play. You can also switch pre-caching off entirely in **Settings → Downloads → Shader Pre-Caching**, but expect more stutter in return.

### Proton Prefixes (compatdata)

As you'll see in {{ collections.posts | chapterLink('proton') | safe }}, every Windows game gets its own fake `C:` drive, called a *prefix*. Most are a few hundred megabytes, but big games can grow to 2 GB or more.

**Where they live:** `~/.local/share/Steam/steamapps/compatdata/`

**How to clean them up:** Sort the folder by size in Dolphin to find the biggest ones. A prefix for a game that's no longer installed anywhere is safe to delete, once you've copied out any save files you want to keep.

> [!CAUTION]
> **A prefix can hold your only copy of a game's saves.** If a game doesn't use Steam Cloud, back up its saves *before* you uninstall it: Steam may delete the prefix along with the game. And before deleting a prefix by hand, check the game isn't installed on your SD card. Prefixes for SD card games can still live here, on the internal drive.

### Flatpak App Data

Apps from Discover keep their settings and data separately from the apps themselves. When you remove an app, its data stays behind in case you reinstall it, so old app data can pile up.

**Where it lives:** `~/.var/app/`

**How to clean it up:** Open the removed app's page in Discover. It shows a message that the app still has data, with a **Delete settings and user data** button.

## Measuring Folders From the Terminal

You'll learn the terminal properly later in this series, but these commands are worth bookmarking now. To see the total size of your shader cache and Proton prefixes:

```bash
du -sh ~/.local/share/Steam/steamapps/shadercache
du -sh ~/.local/share/Steam/steamapps/compatdata
```

**What did that just do?** `du` measures disk usage. `-s` gives one total per folder instead of listing every file inside, and `-h` shows sizes in human-readable units like `12G`.

For an interactive view, SteamOS includes `ncdu`:

```bash
ncdu /home/deck
```

It lists every folder in your home folder, biggest first. Use the arrow keys to open folders, and press `q` to quit.

Those prefixes deserve a closer look, because they're where your Windows games keep their saves.
