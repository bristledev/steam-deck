---
layout: base.njk
title: " Storage & SD Cards"
excerpt: "Where your space goes and how to get it back."
tags: posts
---

#  Storage & SD Cards 💾

After a few weeks with your Steam Deck, you'll inevitably open **Settings → Storage** and ask: *"Where did all my space go?"*

Between game installs, shader caches, and Proton's fake Windows drives, storage fills up fast. Let's take control of it.

## 📦 Steam's Built-In Storage Manager

The easiest way to manage your game installs is the tool Steam gives you for free:

1. Press the **Steam Button** → **Settings** → **Storage**.
2. You'll see a bar chart showing how your space is used — games, updates, shader cache, and "other."
3. Select any game and hit **X** to uninstall, or choose **Move** to relocate it between your internal drive and SD card.

> [!TIP]
> **The "Move" feature is magic.** You don't need to uninstall and re-download a game to switch it between your internal SSD and SD card. Just highlight it, tap **Move**, and pick the destination. Steam handles everything.

---

## 🗂️ Setting Up an SD Card

Popping in a microSD card is the single best upgrade for your Steam Deck. Here's what you need to know:

### Formatting
When you insert a new SD card, SteamOS will prompt you to format it. **Say yes.** SteamOS formats the card as **ext4** (a Linux file system), which gives you better performance and compatibility than the FAT32 or exFAT format it probably came with.

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

**How to clear them:** In **Settings → Shader Pre-Caching**, you can toggle this off, or delete individual game caches from the storage manager. They'll re-download next time you play.

### 2. Compatdata (Proton Prefixes)
As we'll cover in {{ collections.posts | chapterLink('proton') | safe }}, every Windows game creates a fake `C:\` drive. Some of these prefixes can be **2-5 GB each** — and they **don't get deleted when you uninstall the game**.

**Where they live:** `~/.local/share/Steam/steamapps/compatdata/`

**How to clean up:** After uninstalling a game, you can safely delete its folder from `compatdata`. Sort by **size** in Dolphin to find the biggest offenders. Just make sure you back up any save files first if the game doesn't use Steam Cloud!

### 3. Flatpak Data
Flatpak apps (from the Discover store) store their data separately from the apps themselves. Over time, old app data can pile up.

**Where it lives:** `~/.var/app/`

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
For a more interactive experience, install `ncdu` (a visual disk usage analyzer) via {{ collections.posts | chapterLink('homebrew') | safe }} or {{ collections.posts | chapterLink('nix') | safe }}:
```bash
ncdu /home/deck
```
It gives you a navigable, sorted view of every folder on your system — biggest first. It's the fastest way to find surprise space hogs.

> [!TIP]
> **Quick rule of thumb:** If you've uninstalled a game but its AppID folder still lives in `compatdata`, it's safe to delete — just grab any save files you want to keep first!

---

Now that you know where your space goes and how to manage it, let's dive into the fascinating world of how Windows games actually run on your Linux-powered Deck.

{% next_chapter %}
