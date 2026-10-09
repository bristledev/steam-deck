---
layout: base.njk
title: "💾 Storage & SD Cards"
excerpt: "Where your space goes and how to get it back."
tags:
  - posts
  - steamos
  - gaming
  - beginner
---

#  Storage & SD Cards

After a few weeks with your Steam Deck, you'll inevitably open **Settings → Storage** and ask: *"Where did all my space go?"*

Between game installs, shader caches, and Proton's fake Windows drives, storage fills up fast. Let's take control of it.

## 📦 Steam's Built-In Storage Manager

The easiest way to manage your game installs is the tool Steam gives you for free:

1. Press the **Steam Button** → **Settings** → **Storage**.
2. You'll see a bar chart showing how your space is used: games, DLC, updates, shaders and non-Steam content.
3. Select one or more games, then choose **Uninstall**, or **Move** to relocate them between your internal drive and SD card.

> [!TIP]
> **The "Move" feature is magic.** You don't need to uninstall and re-download a game to switch it between your internal SSD and SD card. Just highlight it, tap **Move**, and pick the destination. Steam handles everything.

---

## 🗂️ Setting Up an SD Card

Popping in a microSD card is the single best upgrade for your Steam Deck. Here's what you need to know:

### Formatting
A brand-new SD card needs to be formatted before Steam can use it: Steam's **Storage** settings will show the card with a prompt to format it, or you can go to **Settings → System → Format SD Card**. **Go ahead.** SteamOS formats the card as **ext4**, a Linux file system. Unlike the FAT32 or exFAT format the card probably came with, ext4 supports everything Linux and Proton expect, like file permissions and links between files.

The catch: Windows can't read ext4 without extra software. If you pop the card into a Windows PC, it will offer to format it. Don't!

> [!CAUTION]
> **Formatting erases everything on the card.** If you're reusing a card from a camera or phone, back up those files first!

### Where Does It Show Up?
As we learned in {{ collections.posts | chapterLink('filesystem') | safe }}, your SD card is mounted at:
```
/run/media/deck/[card-name]
```
In **Dolphin** (the file manager), it appears in the left sidebar under **Removable Devices** for easy access.

### Installing Games to the SD Card
Once formatted, Steam treats the SD card as a second library folder. When you download a new game, Steam will ask you which drive to install it on. You can also change the default in **Settings → Storage**.

---

## 🐷 The Hidden Space Hogs

Even if you only have a few games installed, you might notice your storage bar is suspiciously full. Here are the usual culprits:

### 1. Shader Cache
Steam pre-downloads compiled shaders so games don't stutter on first launch. These are generally small per game, but they add up across dozens of titles.

**Where they live:** `~/.local/share/Steam/steamapps/shadercache/`

**How to clear them:** The folders inside `shadercache` are named by AppID (more on those in the next chapter). You can delete a game's folder by hand, and Steam rebuilds it the next time you play. You can also switch pre-caching off entirely in **Settings → Downloads → Shader Pre-Caching**, but expect more stutter in return.

### 2. Compatdata (Proton Prefixes)
As we'll cover in {{ collections.posts | chapterLink('proton') | safe }}, every Windows game creates a fake `C:\` drive, called a *prefix*. Most are a few hundred megabytes, but big games can grow to 2 GB or more.

**Where they live:** `~/.local/share/Steam/steamapps/compatdata/`

**How to clean up:** Sort the folder by **size** in Dolphin to find the biggest ones. A prefix for a game that's no longer installed anywhere is safe to delete, once you've copied out any save files you want to keep.

> [!CAUTION]
> **A prefix can hold your only copy of a game's saves.** If a game doesn't use Steam Cloud, back up its saves *before* you uninstall it: Steam may delete the prefix along with the game. And before deleting a prefix by hand, check the game isn't installed on your SD card. Prefixes for SD card games can still live here, on the internal drive.

### 3. Flatpak Data
Flatpak apps (from the Discover store) store their settings and data separately from the apps themselves. When you remove an app, its data stays behind in case you reinstall, so old app data can pile up.

**Where it lives:** `~/.var/app/`

**How to clean up:** Open the removed app's page in Discover. It shows a message that the app still has data, with a **Delete settings and user data** button.

---

## 🔍 Finding What's Eating Your Space

If you're comfortable in the terminal, two commands are your best friends:

### The Quick Check
```bash
du -sh ~/.local/share/Steam/steamapps/shadercache
du -sh ~/.local/share/Steam/steamapps/compatdata
```
This shows the total size of your shader cache and Proton prefixes in a human-readable format (like `12G`).

### The Deep Dive
For a more interactive experience, use `ncdu` (a visual disk usage analyzer). It comes preinstalled on SteamOS, so there's nothing to install:
```bash
ncdu /home/deck
```
It gives you a navigable, sorted view of every folder on your system — biggest first. It's the fastest way to find surprise space hogs.

---

Now that you know where your space goes and how to manage it, let's dive into the fascinating world of how Windows games actually run on your Linux-powered Deck.
