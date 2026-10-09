---
layout: base.njk
title: "🧰 What's Already Installed"
excerpt: "The tools that already ship with SteamOS, and how to check for a tool before you install it."
tags:
  - posts
  - steamos
  - terminal
  - intermediate
---

# What's Already Installed

Before you install anything with Homebrew or Nix, it's worth knowing what Valve already put on your Deck. SteamOS ships with more than a thousand packages, and plenty of them are useful on their own: system monitors, a battery health checker, a fast file finder, even a full video converter.

This chapter is a guided tour of the best ones, grouped by job. It also shows you how to check for a tool yourself, which matters because the list shifts a little with every SteamOS update.

> [!NOTE]
> Everything in this chapter was checked on a Steam Deck running **SteamOS 3.9.2** (Preview update channel). Version numbers on your Deck may differ. If a command is missing, use the checks in the next section to confirm.

## Where Do These Tools Come From?

SteamOS is built on Arch Linux, and Arch installs software with a package manager called **pacman**. Valve builds each SteamOS release from a fixed list of pacman packages, then seals the result into the read-only system image you met in {{ collections.posts | chapterLink('recovery') | safe }}.

Think of it like a game console's system software: every Deck on the same version gets exactly the same tools, and an update swaps the whole set at once. That's also why you can't add to the list with `pacman` yourself. The next update replaces the image, and your additions go with it.

You can't *change* the package list, but you can *read* it.

## Check Before You Install

Three commands answer almost every "do I already have this?" question. None of them need `sudo`, and none of them change anything.

### Is a Command Installed?

Ask your shell where a command lives:

```bash
command -v htop
```

If the tool exists, this prints its location (`/usr/bin/htop`). If it prints nothing, the tool isn't installed.

### Which Package Does It Come From?

Ask pacman who owns that file:

```bash
pacman -Qo /usr/bin/htop
```

You'll see something like `/usr/bin/htop is owned by htop 3.5.2-1`. The `-Q` means "query what's installed" and the `o` means "owner". A result here tells you the tool is part of SteamOS itself, not something you added later.

### What Does a Package Do?

Ask pacman for the package's details:

```bash
pacman -Qi ncdu
```

**What did that just do?** It printed the package's name, version, a one-line description ("Disk usage analyzer with an ncurses interface") and the project's website.

> [!TIP]
> **Want the whole list?** `pacman -Qe` prints every package SteamOS installs on purpose (238 on our test Deck), and `pacman -Q` adds all of their dependencies (1,206). Pipe either one into `less` to scroll through it: `pacman -Qe | less`.

## Watching Your System

| Command | What it does | Example |
| :--- | :--- | :--- |
| **`htop`** | Live list of running programs with CPU and RAM use | `htop` |
| **`btop`** | A prettier dashboard with graphs for CPU, memory, disk and network | `btop` |
| **`sensors`** | Temperatures and power draw | `sensors` |
| **`upower`** | Battery charge, charging speed and health | See below |
| **`powertop`** | Which programs drain the battery (needs `sudo`) | `sudo powertop` |
| **`iotop`** | Which programs hit the drive hardest (needs `sudo`) | `sudo iotop` |
| **`lsusb`** | Everything plugged in over USB, including docks and hubs | `lsusb` |

Press `q` to quit `htop`, `btop` and `powertop`.

### Check Your Battery's Health

Run this in Konsole:

```bash
upower -i $(upower -e | grep BAT)
```

**What did that just do?** The part in `$( )` runs first and finds your battery's name, then `upower -i` prints its details. Look for these lines:

- `percentage`: the current charge.
- `energy-rate`: how many watts are flowing in (charging) or out (in use) right now.
- `capacity`: battery health. `91%` means the battery holds 91% of the charge it did when new.

### Check Temperatures

Run `sensors` and you'll get a block for each part of the Deck. The lines worth knowing:

- `edge` under `amdgpu`: the GPU temperature.
- `Tctl` under `k10temp`: the CPU temperature.
- `Composite` under `nvme`: the SSD temperature.
- `slowPPT`: how many watts the chip is drawing, next to its current limit (`cap`). This is the number the **TDP Limit** slider from {{ collections.posts | chapterLink('performance') | safe }} controls.

## Disks and Storage

| Command | What it does | Example |
| :--- | :--- | :--- |
| **`ncdu`** | Interactive "what's using my space?" browser | `ncdu ~` |
| **`df -h`** | Free space on each drive | `df -h / /home` |
| **`lsblk`** | Every drive and partition | `lsblk` |
| **`findmnt`** | Where each drive is mounted | `findmnt /` |
| **`smartctl`** | SSD health report (needs `sudo`) | `sudo smartctl -a /dev/nvme0` |

The `df` example reveals something interesting about how SteamOS works:

```bash
df -h / /home
```

You'll see something like this:

```
Filesystem      Size  Used Avail Use% Mounted on
/dev/nvme0n1p5  5.0G  3.6G  838M  82% /
/dev/nvme0n1p8  941G  844G   97G  90% /home
```

**What did that just do?** It showed the two halves of your Deck's drive. `/` is the read-only SteamOS image: only about 5 GB, nearly full, and that's normal. You never write to it. `/home` is everything else, and it's where your games, apps, Flatpaks and Homebrew installs all live. When people say their Deck is "full", it's this one.

## Network

| Command | What it does | Example |
| :--- | :--- | :--- |
| **`ip -brief addr`** | Your IP addresses at a glance (`wlan0` is Wi-Fi) | `ip -brief addr` |
| **`nmcli`** | Nearby Wi-Fi networks and their signal strength | `nmcli device wifi list` |
| **`ss -tln`** | Which programs are waiting for incoming connections | `ss -tln` |
| **`ping`** | Is a website reachable? | `ping -c 4 steampowered.com` |
| **`curl`** / **`wget`** | Download a file from the terminal | `wget https://example.com/file.zip` |
| **`rsync`** | Copy big folders, and resume if interrupted | See below |

`rsync` is the best way to copy a large folder, like a ROM collection, to your SD card:

```bash
rsync -avP ~/ROMs/ /run/media/deck/<card-name>/ROMs/
```

**What did that just do?** `-a` keeps everything (subfolders, timestamps, permissions), `-v` lists each file as it goes, and `-P` shows progress and lets you rerun the same command to pick up where it stopped. Replace `<card-name>` with your SD card's folder name from {{ collections.posts | chapterLink('filesystem') | safe }}.

## Finding and Handling Files

| Command | What it does | Example |
| :--- | :--- | :--- |
| **`fd`** | Fast, friendly file finder | `fd -e sav` |
| **`rg`** (ripgrep) | Searches *inside* files | `rg -i "resolution" ~/.config` |
| **`tree`** | Shows a folder as a tree | `tree -L 1 ~/Documents` |
| **`file`** | Tells you what kind of file something really is | `file mystery.bin` |
| **`jq`** | Reads and filters JSON files | `jq . settings.json` |
| **`7z`** / **`unzip`** / **`unrar`** | Extract archives | `7z x archive.7z` |

`fd` is especially handy for the Proton prefixes from {{ collections.posts | chapterLink('proton') | safe }}. This finds every `.sav` file across all of your games' fake `C:` drives at once:

```bash
fd -e sav . ~/.local/share/Steam/steamapps/compatdata
```

**What did that just do?** `-e sav` means "files ending in `.sav`", the `.` means "any name", and the last part is where to search. Swap `sav` for any extension a game uses for its saves.

## Editors and Long-Running Sessions

- **`nano`**: the beginner-friendly terminal editor used throughout this series. The shortcuts are listed along the bottom of the screen.
- **`vim`**: a powerful editor with a steep learning curve. You'll meet it sooner than you think (see below).
- **`kate`**: KDE's graphical text editor, for when you'd rather use a mouse.
- **`tmux`**: keeps terminal sessions running after you close the window. This is especially useful once you connect over SSH in the next chapter.

To try `tmux`, start a named session, run something long inside it, then detach:

```bash
tmux new -s download
```

Press `Ctrl+B`, then `D`, to detach. The session keeps running in the background. Get back to it any time with `tmux attach -t download`.

### Vim Is Your Default Editor

Here's a SteamOS quirk worth knowing: when a program opens an editor *for* you, it opens **vim**, not nano. Valve's own setup file, `/etc/profile.d/holo.sh`, makes vim the default whenever you haven't picked one yourself. You'll run into it when:

- `git commit` runs without a `-m "message"`.
- `sudoedit` or `systemctl --user edit` opens a file.

If you land in vim, these are the only keys you need:

| Keys | What it does |
| :--- | :--- |
| **`i`** | Start typing |
| **`Esc`** | Stop typing |
| **`:wq`** then `Enter` | Save and quit |
| **`:q!`** then `Enter` | Quit without saving |

### Make nano the Default Instead

If you'd rather never see vim again, tell your shell which editor you prefer. For Bash, add the setting to your startup file:

```bash
echo 'export EDITOR=nano' >> ~/.bashrc
```

**What did that just do?** It added one line to `~/.bashrc`, the file Bash reads every time it starts. Your choice overrides Valve's default from then on. Open a new terminal for it to take effect.

If you use Fish, add the same setting to Fish's startup file:

```fish
mkdir -p ~/.config/fish
echo 'set -gx EDITOR nano' >> ~/.config/fish/config.fish
```

In Desktop Mode, Fish inherits vim from the session just like Bash does. But Fish never reads `holo.sh` itself, so if you made Fish your login shell and connect over SSH (next chapter), it starts with no default editor at all. Then `git` looks for `vi`, which SteamOS doesn't include, and stops with an error. This line fixes both cases.

## Gaming and Graphics

- **`mangohud`**: the performance overlay you switch on from the Quick Access menu is drawn by MangoHud. In Desktop Mode you can add it to any game with the launch option `mangohud %command%`.
- **`gamescope`**: the compositor that runs Game Mode. The frame rate limit and upscaling from {{ collections.posts | chapterLink('performance') | safe }} are Gamescope features.
- **`vulkaninfo`**: reports your GPU and driver. Run `vulkaninfo --summary` and look for `deviceName`; on an LCD Deck it shows `AMD Custom GPU 0405 (RADV VANGOGH)`.
- **`ffmpeg`**: a full video and audio converter. For example, `ffmpeg -i clip.mkv clip.mp4` converts a recording into a format your phone can play.

## SteamOS's Own Commands

Valve includes a set of commands that only exist on SteamOS:

| Command | What it does |
| :--- | :--- |
| **`steamos-update check`** | Checks whether a SteamOS update is available |
| **`steamos-select-branch -c`** | Shows which update channel you're on (Stable, Beta or Preview) |
| **`steamosctl switch-to-desktop-mode`** | Switches to Desktop Mode; handy over SSH |
| **`steamos-readonly status`** | Shows whether the system image is locked (`enabled`) |
| **`steamos-systemreport`** | Prints a detailed system report for bug reports |
| **`steamos-add-to-steam <file>`** | Adds a program to your Steam library as a non-Steam game |

> [!NOTE]
> Peek behind the curtain with `ls -l /usr/bin/steamos-update`. It's a shortcut (a *symlink*) pointing to `/usr/bin/holo-update`. "Holo" is the name of the Valve-built base that SteamOS sits on, and most `steamos-*` commands are aliases for a `holo-*` tool. Run `ls -l /usr/bin/steamos-*` to see which.

> [!WARNING]
> **Change update channels from Settings → System, not the terminal.** `steamos-select-branch` can also switch you to `main`, Valve's internal testing branch, which is not meant for everyday use.

## What's Not Included

Knowing what's missing saves you from hunting for it:

- **No compilers** (`gcc`, `make`). You can't build software from source on the base system. Use a {{ collections.posts | chapterLink('distrobox') | safe }} container for a full development setup.
- **No `pip`.** The system Python is deliberately off-limits for installing packages. Create a virtual environment instead (`python -m venv` works out of the box), as shown in {{ collections.posts | chapterLink('python') | safe }}.
- **No `node`, `traceroute` or `dig`.** These are one command away with {{ collections.posts | chapterLink('homebrew') | safe }} or {{ collections.posts | chapterLink('nix') | safe }}.
- **None of the terminal eye candy** (`fastfetch`, `starship`, `zoxide`, `fzf`). The later chapters show you how to install each one.

That's the pattern for the rest of this series: check what SteamOS already gives you, and only reach for a package manager to fill the gaps.

You now know what's in the toolbox. But typing on the Deck's screen is nobody's idea of fun, so let's control your Deck from a real keyboard on another computer.
