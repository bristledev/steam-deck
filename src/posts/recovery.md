---
layout: base.njk
title: "🛟 Updates & Recovery"
excerpt: "How SteamOS protects itself from bad updates and mistakes, and how to recover when something does go wrong."
tags:
  - posts
  - steamos
  - troubleshooting
  - intermediate
---

# Updates & Recovery

Most new Steam Deck owners worry about breaking something. SteamOS is designed so that's hard to do: it keeps a spare copy of itself, it locks its own system files and Valve provides several ways to recover if things still go wrong. This chapter explains each safety net and when to use it.

## How SteamOS Updates

SteamOS checks for updates by itself. When one is available, you'll see it under **Settings → System**, with an **Apply** button.

### Two Copies of the System

SteamOS keeps **two copies** of the operating system on your drive, called the **A** and **B** slots. You only ever run one of them.

When you apply an update:

1. SteamOS writes the new version into the slot you're *not* using, while you keep playing.
2. Once the new copy is complete and checked, your Deck is set to start from it on the next reboot.
3. If the new version fails to boot, SteamOS automatically goes back to the previous one.

Because the update is prepared in the spare slot, the reboot itself is quick: there's nothing left to install.

The automatic rollback only covers updates that fail to boot. An update that boots fine but has a bug stays installed until Valve ships a fix, unless you roll back yourself: hold the **"..."** button while powering on and choose the **Previous** version. We'll walk through that, and what happens behind the scenes, in {{ collections.posts | chapterLink('steamos-updates') | safe }}.

### Checking for Updates Yourself

- **Game Mode:** press the **Steam** button, go to **Settings → System** and select **Check For Updates**.
- **Desktop Mode:** open Konsole and run:

```bash
steamos-update check
```

## The Read-Only System

In {{ collections.posts | chapterLink('filesystem') | safe }}, you saw that the Deck's system files are locked. The technical term is *immutable*: the core operating system (everything under `/usr`, including `/bin`) is read-only. Programs can't overwrite it, and neither can a typo.

There's one important exception: `/etc`, where system settings live. It's a writable layer on top of the read-only system, and SteamOS carries the important settings over when it updates: your account, Wi-Fi networks, SSH keys and which services start at boot. That's why settings like `sudo systemctl enable sshd` or `chsh` (both covered later) survive updates, while programs installed into `/usr` don't. We'll look at exactly what's kept in {{ collections.posts | chapterLink('steamos-updates') | safe }}.

### What You Can Change

- **Your home folder** (`/home/deck`), including your scripts, settings, game files and mods.
- **Apps from Discover**, which install outside the locked system.

### What You Can't Change Without Unlocking

- System programs, core libraries and the kernel.

You *can* unlock the system with `sudo steamos-readonly disable`, but anything you change will be wiped by the next SteamOS update.

> [!WARNING]
> **Leave `steamos-readonly disable` alone unless you know exactly why you need it.** The tools covered later in this series ({{ collections.posts | chapterLink('homebrew') | safe }}, {{ collections.posts | chapterLink('nix') | safe }}, {{ collections.posts | chapterLink('distrobox') | safe }}) exist so you can install software *without* touching the locked system.

## Recovery Options, From Gentle to Drastic

If something does go wrong, Valve gives you several ways back. Start with the gentlest one that fits your problem. Valve's **[SteamOS Recovery and Troubleshooting](https://help.steampowered.com/en/faqs/view/1B71-EDF2-EB6D-2BB3)** guide has the full details.

### Without a USB Drive

- **Roll back to the previous version.** Keeps all your games and files. Covered in {{ collections.posts | chapterLink('steamos-updates') | safe }}.
- **Factory Reset** (if your Deck still reaches Game Mode). In **Settings → System**, scroll down to **Factory Reset**. It clears all local data, games included, and reinstalls Steam.
- **Erase user data** (if your Deck can't reach Game Mode). Hold **"..."** while powering on, just like for a rollback, and choose the option to erase user data from the menu that appears.

### The Recovery Image (USB)

If your Deck won't boot at all, or the options above didn't help, Valve provides an official *recovery image* you can start from a USB drive.

**What you need:**

- A **USB drive** (8 GB minimum).
- A **PC** (Windows, Mac or Linux) to create the recovery drive.
- A **USB-C hub or adapter** to plug the USB drive into your Steam Deck.

**How to create the recovery drive:**

1. On your PC, download the SteamOS image from Valve's **[SteamOS Installation and Repair](https://help.steampowered.com/en/faqs/view/65B4-2AA3-5F37-4227)** page.
2. Write it to your USB drive. Valve recommends **[Rufus](https://rufus.ie/)** on Windows and **[Balena Etcher](https://etcher.balena.io/)** on Mac or Linux. This erases whatever was on the USB drive.

**How to boot into recovery:**

1. **Power off** your Steam Deck completely, and plug in the USB drive.
2. Hold **Volume Up** and press **Power**. When you hear the chime, let go of Volume Up.
3. In the boot menu, use the D-pad and **A** to choose **Boot Manager**, then **EFI USB Device** (your USB drive).
4. The screen goes dark for a minute, then a small desktop loads. Use the right trackpad and trigger as your mouse.

### Recovery Image Options

| Option | What it does |
| :--- | :--- |
| **Repair SteamOS** | Reinstalls SteamOS while trying to keep your games and personal files. Try this first. |
| **Re-image Device** | A full factory reset: wipes everything and installs a fresh SteamOS. |
| **Recovery tools** | Opens a command prompt for fixing the boot partition. Only for advanced repairs. |

> [!CAUTION]
> **"Re-image Device" deletes everything:** games, saves and settings. Anything not backed up to Steam Cloud or another drive is gone, so try **Repair SteamOS** first.

## Quick Reference

| Problem | What to do |
| :--- | :--- |
| An update won't boot | Nothing: SteamOS falls back to the previous version automatically |
| An update boots but breaks something | Hold **"..."** while powering on and choose **Previous** |
| You want a clean slate and Game Mode still works | **Settings → System → Factory Reset** |
| The Deck won't boot at all | Recovery image → **Repair SteamOS**, then **Re-image Device** if needed |

With the safety nets covered, it's time to install some software, starting with the Discover store.
