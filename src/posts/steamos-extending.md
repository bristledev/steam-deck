---
layout: base.njk
title: "🧩 Extending SteamOS the Right Way"
excerpt: "Every way to add software and settings to SteamOS that survives updates, and the one way that always gets wiped."
tags:
  - posts
  - steamos
  - internals
  - intermediate
---

# Extending SteamOS the Right Way

You now know the map ({{ collections.posts | chapterLink('steamos-anatomy') | safe }}) and the rules of updates ({{ collections.posts | chapterLink('steamos-updates') | safe }}). Put them together and you can answer the question every Deck tinkerer eventually asks: *"If I add this, will it still be here after the next update?"*

This chapter lays out every sanctioned way to extend SteamOS, takes apart a real example, and explains why the obvious approach, `sudo pacman -S`, is the one to avoid.

> [!NOTE]
> Everything here was checked on a Steam Deck running **SteamOS 3.9.2** (Preview update channel).

---

## 🏗️ What Does "Extending" Mean?

Think of SteamOS like a rented apartment. You can't knock down walls (the read-only image), but you can bring in furniture, hang pictures and add shelves. The trick is putting things where the landlord's renovations won't sweep them away.

SteamOS gives you five such places. Each one maps to a row of the "Whole Picture" table from the Anatomy chapter.

---

## ✅ The Five Safe Places

| Method | Where it lives | Survives updates? | Good for |
| :--- | :--- | :--- | :--- |
| **Flatpak** | `/var/lib/flatpak` (offloaded) or `~/.local/share/flatpak` | Yes | Desktop apps |
| **Your home folder** | `/home/deck` (AppImages, `~/.local/bin`) | Yes | Portable apps and single-file tools |
| **Home-based package managers** | `/home/linuxbrew`, `/nix` (offloaded) | Yes | Terminal tools |
| **Containers** | Inside your home folder | Yes | Whole Linux distros, compilers, development |
| **`/opt` + kept `/etc` settings** | `/opt` (offloaded) and `/etc` keep-list | Yes | System services that need root |

The first four don't need anything beyond what this series has already shown you. The fifth is how system-level tools hook in, and it's worth a closer look.

---

## 🔬 Case Study: How Tailscale Survives Updates

In {{ collections.posts | chapterLink('tailscale') | safe }}, a community script installed a VPN service that keeps working through every SteamOS update. It isn't magic. It uses exactly the pieces you've learned about, one for each job. Let's take it apart. (If you skipped the Tailscale chapter, these files won't exist on your Deck, so just read along.)

**1. The programs live in `/opt`, which is offloaded to the home partition:**

```bash
ls /opt/tailscale
```

You'll see `tailscale` and `tailscaled`. Because `/opt` is really a folder on the home partition, updates never touch these files.

**2. The service is defined in `/etc/systemd/system`, which is on Valve's keep-list:**

```bash
systemctl cat tailscaled | grep -E '^# /|^ExecStart='
```

**What did that just do?** `systemctl cat` prints a service's definition, and `grep` keeps only the file paths (lines starting with `# /`) and the commands it runs. You'll see the service file and an *override* in `/etc/systemd/system/tailscaled.service.d/` that points it at `/opt/tailscale/tailscaled`. Custom services and overrides in that folder are on the keep-list, so they survive.

**3. The extra settings are added to the keep-list:**

```bash
cat /etc/atomic-update.conf.d/tailscale.conf
```

It lists `/etc/default/tailscaled` and `/etc/profile.d/tailscale.sh`, two files that aren't on Valve's default list. This drop-in tells SteamOS to keep them too.

**4. The command is added to your PATH:**

```bash
cat /etc/profile.d/tailscale.sh
```

It's a single line: `PATH="$PATH:/opt/tailscale"`. Every new login shell reads it, which is why you had to open a new terminal before `tailscale` worked.

That's the full recipe for a system service that survives updates: **programs in an offloaded folder, settings in kept `/etc` files**. The Nix installer follows the same pattern; check `/etc/atomic-update.conf.d/nix-installer.conf`.

---

## 🧱 The Advanced Option: System Extensions

There's one more official mechanism, built into systemd itself: **system extensions** (*sysext*). A system extension is a sealed image that gets layered over `/usr` or `/opt`, a bit like the `/etc` tracing paper from the Anatomy chapter but for programs.

Check whether any are loaded:

```bash
systemd-sysext status
```

On most Decks, including our test Deck, it shows `none` for both `/usr` and `/opt`. Extensions are mainly used by developers and specialized tools, and an extension built for one SteamOS version may refuse to load after an update. For everyday use, the five safe places above are simpler.

---

## ❌ The One Way That Always Gets Wiped

You'll find guides online that start like this:

```bash
sudo steamos-readonly disable
sudo pacman -S some-package
```

It works... until the next update. Remember the update steps: the new image is written into the *other* slot from Valve's servers. Anything you installed into the old image doesn't exist in the new one. Your program disappears, and any config files it scattered around `/etc` are dropped too.

Valve says the same thing. SteamOS includes a `steamos-devmode` command that unlocks the system for developers, and its own warning reads:

> "Changes to the root filesystem will be overwritten by the next SteamOS update."

The same message then recommends packaging apps with Flatpak and building software in containers with Distrobox, which are two of the safe places above.

> [!CAUTION]
> **There's a second trap.** SteamOS's package sources are pinned to Valve's own snapshots: run `grep '^\[' /etc/pacman.conf` and you'll see repositories like `[jupiter-3.9]` and `[holo-3.9]`. Following a guide that points `pacman` at regular Arch Linux repositories mixes incompatible versions into your system, and that's a reliable way to break it.

---

## 🧭 Which Method Should You Use?

| You want… | Use |
| :--- | :--- |
| A desktop app (browser, Discord, emulator) | **Flatpak** from Discover |
| A single downloaded app | **AppImage** in your home folder |
| A terminal tool that isn't preinstalled | **Homebrew** or **Nix** |
| A compiler, a whole distro, or `apt install` | **Distrobox** |
| Your own background script | A **user service** in `~/.config/systemd/user` |
| A system service that needs root | **`/opt`** plus kept **`/etc`** settings, like Tailscale |

And before any of that, check {{ collections.posts | chapterLink('preinstalled') | safe }}: the tool may already be on your Deck.

---

That wraps up the internals. You know where everything lives, how updates treat it and how to add your own pieces safely. Time to use that knowledge, starting with the most popular way to add terminal tools.
