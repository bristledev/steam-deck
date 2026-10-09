---
layout: base.njk
title: "🧬 Anatomy of SteamOS"
excerpt: "The partitions, the read-only image and the writable layers that make up your Deck's operating system."
tags:
  - posts
  - steamos
  - internals
  - intermediate
---

# Anatomy of SteamOS

By now you've installed apps, opened a terminal and even connected to your Deck from another computer. You've also read "SteamOS is read-only" many times. This phase looks at *how* it all fits together.

This chapter is the map. Once you know where everything lives, a lot of earlier rules make sense: why `pacman` installs vanish, why Flatpaks don't and why your Deck can survive a broken update.

> [!NOTE]
> Everything here was checked on a Steam Deck running **SteamOS 3.9.2** (Preview update channel). Every Steam Deck uses the same layout; only the size of the biggest partition changes with your storage.

## What Is SteamOS Made Of?

Think of an old game console. The **cartridge** holds the game: you can play it, but you can't write to it. Your progress goes on a separate **memory card**. Swap in a new cartridge, and your memory card still works.

SteamOS works the same way:

- **The cartridge** is a sealed *system image*: the whole operating system, about 5 GB, locked read-only.
- **The memory card** is everything that's yours: your games, apps, settings and files.

There's one twist that a cartridge can't do. SteamOS keeps **two** system images on your drive, so it can install the next version into the spare while you keep playing on the current one. More on that in the next chapter.

## The Partition Map

A *partition* is a section of a drive that the computer treats as its own separate disk. Let's list them. Open Konsole and run:

```bash
lsblk -o NAME,PARTLABEL,FSTYPE,SIZE,MOUNTPOINTS /dev/nvme0n1
```

You'll see something like this (trimmed):

```
NAME        PARTLABEL FSTYPE   SIZE MOUNTPOINTS
nvme0n1                      953.9G
|-nvme0n1p1 esp       vfat     256M
|-nvme0n1p2 efi-A     vfat      64M
|-nvme0n1p3 efi-B     vfat      64M
|-nvme0n1p4 rootfs-A  btrfs      5G
|-nvme0n1p5 rootfs-B  btrfs      5G /
|-nvme0n1p6 var-A     ext4     256M
|-nvme0n1p7 var-B     ext4     256M /var
`-nvme0n1p8 home      ext4     943G /home
```

**What did that just do?** It listed every partition on your internal SSD (`nvme0n1`) with its label, filesystem type, size and where it's mounted. Here's what each one is for:

| Partition | Size | What it holds |
| :--- | :--- | :--- |
| **`esp`** | 256 MB | The first thing your Deck's firmware reads when it powers on |
| **`efi-A`** / **`efi-B`** | 64 MB each | Boot files for each copy of SteamOS |
| **`rootfs-A`** / **`rootfs-B`** | 5 GB each | The two sealed system images |
| **`var-A`** / **`var-B`** | 256 MB each | Changing system data (logs, caches, settings) for each copy |
| **`home`** | Everything else | Your stuff: games, apps, saves, files |

Notice the pattern: almost everything comes in an **A** and a **B**. Only one set is in use at a time. In the output above, `rootfs-B` is mounted at `/`, so this Deck is currently running from **slot B**. Your Deck might be on A.

## The Read-Only Root (`/`)

The root partition (`/`) holds the operating system itself: every program in `/usr/bin`, every library, the kernel. Check how full it is:

```bash
df -h /
```

It'll show about 5 GB, mostly full. That's by design. Valve builds this image, and nobody else ever writes to it.

So how is it locked? Try this:

```bash
findmnt -no OPTIONS /
```

The options start with `rw` (read-write), so the lock isn't in the mount options. It's a *property* set on the btrfs filesystem itself. Ask for it directly:

```bash
btrfs property get / ro
```

It prints `ro=true`. That single flag is what `steamos-readonly` flips on and off. You can confirm with:

```bash
steamos-readonly status
```

`enabled` means the image is locked. Leave it that way. We'll cover why (and what to do instead) at the end of this phase.

## `/etc`: A Writable Layer on Top

`/etc` is where Linux keeps system settings: user accounts, Wi-Fi networks, which background services start at boot. If the image is read-only, how can you change any of that? Take a look:

```bash
findmnt -no FSTYPE,OPTIONS /etc
```

The type is `overlay`, and the options include two important folders:

- `lowerdir=…/etc`: the original settings inside the read-only image.
- `upperdir=…/var/lib/overlays/etc/upper`: a writable folder on the `var` partition.

Think of it like a sheet of tracing paper laid over a printed page. You see both at once, but anything you write goes on the tracing paper. When you change a setting, the new version lands in the *upper* folder and covers the original. The image underneath never changes.

You can see every setting you've ever changed by listing the tracing paper:

```bash
ls /var/lib/overlays/etc/upper
```

You'll find things like `hostname`, `passwd`, `NetworkManager` (your Wi-Fi) and `ssh` (from {{ collections.posts | chapterLink('ssh') | safe }}).

> [!NOTE]
> Not everything on the tracing paper survives a SteamOS update. Valve keeps a specific list of settings and sets the rest aside. The next chapter explains exactly which ones.

## `/var`: The Per-Slot Workspace

`/var` holds system data that changes all the time: logs, caches, databases and the `/etc` tracing paper you just saw. Each slot has its own small `var` partition (256 MB), mounted at `/var`.

Because it's per-slot, the `var` that goes with slot A is separate from the one that goes with slot B. When SteamOS updates, it copies your current `var` across to the other slot, so your logs and system data carry over. The one thing filtered on the way is the `/etc` tracing paper, as the note above says.

## `/home`, and the Offload Trick

The `home` partition takes up nearly the whole drive. It holds `/home/deck` (everything you've learned about in {{ collections.posts | chapterLink('filesystem') | safe }}), and it's never touched by updates.

But some *system* folders are also too big, or too important, for a 256 MB `var` partition. Flatpak apps alone can take gigabytes. Valve's solution is the **offload** folder:

```bash
ls /home/.steamos/offload
```

Each folder in there gets *bind-mounted* back into its usual system location. A bind mount makes one folder appear in two places at once. See it for yourself with Nix's folder:

```bash
findmnt -no SOURCE /nix
```

The output, `/dev/nvme0n1p8[/.steamos/offload/nix]`, means "`/nix` is really this folder on the home partition". Here's the full list on our test Deck:

| System folder | Why it's offloaded |
| :--- | :--- |
| **`/var/lib/flatpak`** | System-wide Flatpak apps are far too big for `var` |
| **`/nix`** | The Nix store from {{ collections.posts | chapterLink('nix') | safe }} |
| **`/opt`** | Optional add-on software, like the Tailscale install from {{ collections.posts | chapterLink('tailscale') | safe }} |
| **`/var/log`** | System logs, kept across updates |
| **`/var/cache/pacman`** | Downloaded package files |
| **`/var/lib/docker`** | Container storage |
| **`/var/lib/systemd/coredump`**, **`/var/lib/steamos-log-submitter`** | Crash dumps and the reports SteamOS's log submitter collects |
| **`/root`**, **`/srv`**, **`/var/tmp`** | Admin files, server data and long-lived temp files |

That's why your Flatpaks and Nix packages survive every SteamOS update: they physically live on the home partition, the memory card that updates never touch.

## Bonus: Where Swap Lives

*Swap* is space the system uses when RAM fills up. Check yours:

```bash
swapon --show
```

You'll see two entries:

- **`/dev/zram0`**: compressed swap that lives *in RAM*. Squeezing rarely used memory is much faster than writing it to the SSD.
- **`/home/swapfile`**: a 1 GB file on the home partition, used as a last resort.

## The Whole Picture

| Location | Partition | Writable? | What happens during an update |
| :--- | :--- | :--- | :--- |
| `/` (including `/usr`) | `rootfs-A`/`B` | No | Replaced by the new image |
| `/etc` | Overlay on `var` | Yes | Only Valve's keep-list carries over |
| `/var` | `var-A`/`B` | Yes | Copied to the new slot |
| `/home` and offloaded folders | `home` | Yes | Never touched |

Keep this table in mind for the rest of the series. Whenever you install something, ask: *which row does it land in?*

So SteamOS keeps two of almost everything, and only uses one at a time. Next, let's watch what happens to the spare when an update arrives.
