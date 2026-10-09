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

Good news — SteamOS is **incredibly hard to permanently break**. Valve designed the system with multiple safety nets, so even the worst case is a reinstall from a USB drive. Let's understand how it all works.

---

## 🔄 How SteamOS Updates Work

SteamOS updates itself automatically. You'll occasionally see a notification in Game Mode telling you an update is ready. But what's happening under the hood is surprisingly clever.

### The A/B Partition System
Unlike Windows (which overwrites itself in place and hopes for the best), SteamOS keeps **two copies** of the operating system on your drive — called the **A** and **B** partitions.

When an update arrives:
1. SteamOS downloads the update to the **inactive** partition (the one you're not booting from).
2. Once the download is complete and verified, it switches your boot to the newly updated partition.
3. If the new update fails to boot? SteamOS **automatically rolls back** to the previous working partition.

This means an update that fails to boot won't strand you. Your Deck just quietly goes back to the version that worked. The rollback only kicks in when booting fails, though. An update that boots fine but has a bug stays installed until Valve ships a fix, unless you roll back yourself: hold the **"..."** button while powering on and choose the **Previous** version. We'll walk through that, and what happens behind the scenes, in {{ collections.posts | chapterLink('steamos-updates') | safe }}.

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

SteamOS is an **immutable** operating system. That means the core operating system (everything under `/usr`, including `/bin`) is **read-only**. You physically cannot accidentally delete something critical or install a rogue program that corrupts your OS.

There's one important exception: `/etc`, where system settings live. It's a writable layer on top of the read-only image, and SteamOS carries the important settings over when it updates: your account, Wi-Fi networks, SSH keys and which services start at boot. That's why settings like `sudo systemctl enable sshd` or `chsh` (both covered later) survive updates, while programs installed into `/usr` don't. We'll look at exactly what's kept in {{ collections.posts | chapterLink('steamos-updates') | safe }}.

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

## 🆘 Recovery Options, From Gentle to Nuclear

If something truly goes sideways, Valve gives you several ways back. Start with the gentlest one that fits your problem. Valve's **[SteamOS Recovery and Troubleshooting](https://help.steampowered.com/en/faqs/view/1B71-EDF2-EB6D-2BB3)** guide has the full details.

### Without a USB Drive

- **Roll back to the previous version.** Keeps all your games and files. Covered in {{ collections.posts | chapterLink('steamos-updates') | safe }}.
- **Factory Reset** (if your Deck still reaches Game Mode). In **Settings → System**, scroll down to **Factory Reset**. It clears all local data, games included, and reinstalls Steam.
- **Erase user data** (if your Deck can't reach Game Mode). Hold **"..."** while powering on, just like for a rollback, and choose the option to erase user data from the menu that appears.

### The Recovery Image (USB)

If your Deck won't boot at all, or the options above didn't help, Valve provides an official **recovery image** you can boot from a USB drive.

**What you need:**
- A **USB drive** (8 GB minimum).
- A **PC** (Windows, Mac, or Linux) to create the recovery drive.
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

| Option | What It Does |
| :--- | :--- |
| **Repair SteamOS** | Reinstalls SteamOS while trying to keep your games and personal files. Try this first! |
| **Re-image Device** | A full factory reset: wipes everything and installs a fresh SteamOS. This is the "nuclear option." |
| **Recovery tools** | Opens a command prompt for fixing the boot partition. Only for advanced repairs. |

> [!TIP]
> **Always try "Repair SteamOS" before "Re-image."** Repair resets the operating system files but tries to keep your home folder, game installs and settings.

> [!CAUTION]
> **"Re-image" deletes everything** — games, saves, settings, all of it. If you go this route, anything not backed up to Steam Cloud or an external drive is gone.

---

## 🧘 The Bottom Line

The Steam Deck is designed to be resilient:
- **Update won't boot?** The A/B system rolls back automatically.
- **Update boots but breaks something?** Pick the **Previous** version from the boot menu.
- **Weird software glitch?** The immutable filesystem means the core OS is untouchable.
- **Something truly broken?** The recovery image can repair SteamOS, or get you back to factory fresh.

You genuinely cannot "brick" this device through normal use. So experiment freely — that's the whole point!

---

Now that you know your safety net is rock solid, let's learn how to install apps on your Deck.
