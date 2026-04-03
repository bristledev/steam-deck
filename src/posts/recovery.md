---
layout: base.njk
title: "🔧 Updates & Recovery"
excerpt: "What happens when things go wrong — and why you shouldn't panic."
tags:
  - posts
  - steamos
  - troubleshooting
  - intermediate
---

#  Updates & Recovery 🛟

Here's a fear every new Steam Deck owner shares: *"What if I break it?"*

Good news — SteamOS is **incredibly hard to permanently break**. Valve designed the system with multiple safety nets so that even the worst-case scenario is just a 20-minute recovery process. Let's understand how it all works.

---

## 🔄 How SteamOS Updates Work

SteamOS updates itself automatically. You'll occasionally see a notification in Game Mode telling you an update is ready. But what's happening under the hood is surprisingly clever.

### The A/B Partition System
Unlike Windows (which overwrites itself in place and hopes for the best), SteamOS keeps **two copies** of the operating system on your drive — called the **A** and **B** partitions.

When an update arrives:
1. SteamOS downloads the update to the **inactive** partition (the one you're not booting from).
2. Once the download is complete and verified, it switches your boot to the newly updated partition.
3. If the new update fails to boot? SteamOS **automatically rolls back** to the previous working partition.

This means a bad update can never strand you on an unbootable system. Your Deck just quietly goes back to the version that worked.

> [!NOTE]
> This is why SteamOS updates feel so fast — it's not installing "live." It prepared everything in the background and just flips a switch on reboot.

### Checking for Updates Manually
If you don't want to wait for the notification:
- **Game Mode**: Steam Button → Settings → System → Check for Updates
- **Desktop Mode**: Open Konsole and run:
```bash
steamos-update check
```

---

## 🔒 The Immutable Filesystem (Your Safety Net)

In {{ collections.posts | chapterLink('filesystem') | safe }}, we briefly mentioned that the Steam Deck's system files are "locked." Let's explain what that means and why it's actually a *good* thing.

SteamOS is an **immutable** operating system. That means the core system files (`/usr`, `/etc`, `/bin`, etc.) are **read-only**. You physically cannot accidentally delete something critical or install a rogue program that corrupts your OS.

### What You *Can* Change
- **Your home folder** (`/home/deck`) — completely yours, read/write, no restrictions.
- **Flatpaks and apps** — installed in their own sandboxed containers.
- **Anything in `/home`** — scripts, configs, game files, mods.

### What You *Can't* Change (Without Effort)
- System packages, core libraries, kernel modules.
- You *can* temporarily unlock the filesystem with `sudo steamos-readonly disable`, but this is **not recommended** — any changes you make will be wiped by the next SteamOS update anyway.

> [!WARNING]
> **Avoid `steamos-readonly disable` unless you really know what you're doing.** The package managers covered later in this series ({{ collections.posts | chapterLink('homebrew') | safe }}, {{ collections.posts | chapterLink('nix') | safe }}, {{ collections.posts | chapterLink('distrobox') | safe }}) exist specifically to let you install software *without* touching the immutable system.

---

## 🆘 The Recovery Image (Your "Factory Reset" Button)

If something truly goes sideways — your Deck won't boot, the screen is stuck, or you just want a completely fresh start — Valve provides an official **Recovery Image**.

### What You Need
- A **USB drive** (8 GB minimum).
- A **PC** (Windows, Mac, or Linux) to create the recovery drive.
- A **USB-C hub or adapter** to plug the USB drive into your Steam Deck.

### How to Create the Recovery Drive

1. On your PC, go to Valve's official recovery page:
   👉 **[Steam Deck Recovery Instructions](https://help.steampowered.com/en/faqs/view/1B71-EDF2-EB6D-2BB3)**
2. Download the recovery image.
3. Flash it to your USB drive using **[Balena Etcher](https://etcher.balena.io/)** (free, works on all platforms) or **[Rufus](https://rufus.ie/)** (Windows only).

### How to Boot Into Recovery

1. **Power off** your Steam Deck completely (hold the power button → Shut Down).
2. Hold **Volume Down** and press **Power** until you hear a chime.
3. You'll see a boot menu — select your USB drive.
4. The recovery environment will load with several options.

### Recovery Options

| Option | What It Does |
| :--- | :--- |
| **Re-image Steam Deck** | Wipes everything and installs a fresh SteamOS. This is the "nuclear option." |
| **Clear local user data** | Removes your personal files but keeps SteamOS intact. |
| **Reinstall SteamOS** | Reinstalls the OS while trying to keep your personal files. Try this first! |

> [!TIP]
> **Always try "Reinstall SteamOS" before "Re-image."** The reinstall option keeps your home folder, game installs, and settings intact. It just resets the operating system files. 9 times out of 10, this is all you need.

> [!CAUTION]
> **"Re-image" deletes everything** — games, saves, settings, all of it. If you go this route, anything not backed up to Steam Cloud or an external drive is gone.

---

## 🧘 The Bottom Line

The Steam Deck is designed to be resilient:
- **Bad update?** The A/B system rolls back automatically.
- **Weird software glitch?** The immutable filesystem means the core OS is untouchable.
- **Something truly broken?** The recovery image gets you back to factory fresh in 20 minutes.

You genuinely cannot "brick" this device through normal use. So experiment freely — that's the whole point!

---

Now that you know your safety net is rock solid, let's learn how to install apps on your Deck.

{% next_chapter %}
