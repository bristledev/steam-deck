---
layout: base.njk
title: "🔄 How Updates Really Work"
excerpt: "What actually happens between 'Update available' and the reboot, which settings survive and how to roll back."
tags:
  - posts
  - steamos
  - internals
  - intermediate
---

# How Updates Really Work

In {{ collections.posts | chapterLink('recovery') | safe }}, you learned the short version: SteamOS installs updates into a spare copy and switches over on reboot. With the A/B partitions from {{ collections.posts | chapterLink('steamos-anatomy') | safe }} in mind, this chapter follows an update from start to finish, and shows where you can take control of it.

> [!NOTE]
> Everything here was checked on a Steam Deck running **SteamOS 3.9.2** (Preview update channel).

## What Is an Atomic Update?

Imagine a game that autosaves by overwriting your only save file. If the power cuts out halfway through, the save is corrupted and your progress is gone. Smart games write the new save into a **separate slot** first, check it and only then mark it as the one to load.

SteamOS updates the same way. It never edits the system you're running. It writes a complete new copy into the spare slot, and switching to it is a single, instant flip. That's what *atomic* means here: the update either happens completely or not at all. There's no half-updated state to get stuck in.

## Update Channels

Valve publishes SteamOS on several *channels*, also called *branches*:

| Channel | Who it's for |
| :--- | :--- |
| **Stable** | Everyone. Fully tested releases. |
| **Beta** | People who want new features early and don't mind the odd bug. |
| **Preview** | Even earlier builds, used to test changes before they reach Beta. |

Change channels in **Settings → System → System Update Channel**. To see which one you're on from the terminal:

```bash
steamos-select-branch -c
```

Your choice is saved in `/etc/steamos-atomupd/preferences.conf`, and Valve's server addresses live next to it in `client.conf`. The version you're running right now is in the manifest:

```bash
cat /etc/steamos-atomupd/manifest.json
```

**What did that just do?** It printed the details of your installed image: the product (`steamos`), the version (like `3.9.2`), the exact build ID and your device variant (`steamdeck`).

## An Update, Step by Step

When you press **Apply** on an update, here's what happens behind the progress bar:

1. **Check.** The update client, `steamos-atomupd`, asks Valve's server whether there's a newer image for your device and channel.
2. **Download only what changed.** Your Deck keeps an index of the chunks that make up the current image. It downloads only the chunks that differ, then reuses everything else from the copy it already has. That's why a 5 GB system usually updates with a much smaller download.
3. **Write into the spare slot.** A tool called **RAUC** writes the new image into the *other* `rootfs` partition. Your running system is never touched.
4. **Carry your data across.** SteamOS copies your `/var` to the other slot's `var` partition, along with the settings in `/etc` that are allowed to survive (more on that below).
5. **Flip the switch.** The bootloader is told to start the other slot next time.
6. **Reboot and confirm.** On restart, your Deck boots the new version. If it fails to boot, the bootloader falls back to the previous slot automatically.

You can see RAUC's view of the two slots in its config file:

```bash
grep -A2 '^\[slot.rootfs' /etc/rauc/system.conf
```

**What did that just do?** It showed the `[slot.rootfs.0]` and `[slot.rootfs.1]` sections, named `A` and `B`, each pointing at one of the `rootfs` partitions from the last chapter. You'll also see a third slot named `dev`. That one is for developer builds, and it doesn't exist on a normal Deck's drive.

## Which Settings Survive?

Most people assume all of `/etc` is kept. It isn't: Valve's own config file opens with this rule:

> "When an atomic update is applied, all changes made in /etc will be lost."

The only exceptions are the files on Valve's **keep-list**. You can read it yourself:

```bash
grep -vE '^\s*(#|$)' /usr/lib/rauc/atomic-update-keep.conf
```

**What did that just do?** `grep -v` hides the comments (lines starting with `#`) and blank lines, leaving just the list. In plain English, it keeps:

- **Your user account and password** (`passwd`, `shadow`, `group`)
- **Saved Wi-Fi networks** (`NetworkManager/system-connections`)
- **SSH keys** (so other computers still recognize your Deck)
- **Enabled, disabled and custom background services** (`systemd/system`)
- **Your hostname, timezone and DNS settings**
- **Your update channel** (`steamos-atomupd/preferences.conf`)
- **WireGuard VPN configs** (`wireguard`, from {{ collections.posts | chapterLink('wireguard') | safe }})
- **Your login screen and input method settings** (`sddm.conf.d` and `dconf`)

That's why `sudo systemctl enable sshd` from {{ collections.posts | chapterLink('ssh') | safe }} keeps working after updates: enabled services are on the list. A hand-edited config file elsewhere in `/etc` isn't, and it quietly reverts to Valve's version.

### Where Discarded Settings Go

Before discarding anything, SteamOS saves two safety copies:

- **`/etc/previous`** holds every `/etc` change you had *before* the last update, so you can compare or copy things back.
- **`/var/lib/steamos-atomupd/etc_backup`** keeps compressed backups from your last five updates, or fewer if the small `var` partition runs short of space.

```bash
ls /etc/previous
ls /var/lib/steamos-atomupd/etc_backup
```

### Keep Extra Files

You can add your own entries to the keep-list. Create a file ending in `.conf` inside `/etc/atomic-update.conf.d/` and list the paths you want kept, one per line. Some installers already do this for you:

```bash
ls /etc/atomic-update.conf.d
```

If you followed {{ collections.posts | chapterLink('tailscale') | safe }}, you'll see `tailscale.conf` here. The Nix installer in {{ collections.posts | chapterLink('nix') | safe }}, later in the series, adds `nix-installer.conf` the same way. That's how those tools survive updates.

> [!WARNING]
> **Keep the list short.** Valve's example file warns against keeping everything with `/etc/**`. A file you keep will shadow every future fix Valve ships for it, which can cause confusing problems months later.

## Rolling Back to the Previous Version

The automatic rollback only covers updates that fail to boot. If an update boots fine but breaks something you care about, you can pick the previous version yourself. Valve's official steps for the Steam Deck are:

1. Fully power off by holding the **power button** for 10 seconds. Plug in your charger.
2. Hold the **"..."** button, then press the **power button**.
3. Keep holding **"..."** until a menu labeled **SteamOS** appears.
4. Choose the **Previous** entry (the second option).

Your games, saves and files all stay put, because they live on the home partition. Only the system image changes. See **[Valve's SteamOS Recovery and Troubleshooting guide](https://help.steampowered.com/en/faqs/view/1B71-EDF2-EB6D-2BB3)** for the full instructions.

> [!TIP]
> A rollback is a stopgap, not a permanent downgrade. SteamOS will offer the newer version again, and Valve's fix usually arrives in a later update. Check **Settings → System** after a restart to see which version you're on.

Updates swap the system out from under you, but your Deck still somehow boots straight into Game Mode and can flip to a full desktop in seconds. Next, let's see how those two modes really work.
