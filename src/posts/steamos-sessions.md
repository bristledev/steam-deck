---
layout: base.njk
title: "🎛️ Game Mode vs Desktop Mode, Under the Hood"
excerpt: "How your Deck boots straight into Game Mode, what Gamescope does, and what really happens when you switch modes."
tags:
  - posts
  - steamos
  - internals
  - intermediate
---

# Game Mode vs Desktop Mode, Under the Hood

Every time you power on your Deck, you land in Game Mode without ever seeing a login screen. Press **Switch to Desktop**, and a few seconds later you're on a full Linux desktop. It feels like flipping between two apps, but a lot more happens underneath.

This chapter follows your Deck from the power button to Game Mode, looks at **Gamescope** (the piece that makes Game Mode feel like a console), and shows what actually happens when you switch modes.

> [!NOTE]
> Everything here was checked on a Steam Deck running **SteamOS 3.9.2** (Preview update channel), in Game Mode.

## What Is a Session?

When you log in to a computer, Linux starts a **session**: your desktop, your apps, and the background services that go with them. Log out, and the session ends.

Game Mode and Desktop Mode are two *different sessions* for the same `deck` user. They're like two consoles plugged into the same TV, sharing one memory card. Switching modes means logging out of one and logging straight into the other. That's why the screen goes dark for a moment and why apps you left open in Desktop Mode are gone when you come back.

## From Power Button to Game Mode

Here's the chain of events every time your Deck starts:

1. **systemd**, Linux's service manager, starts the system's background services. (You'll write your own services for it later in this series.)
2. **SDDM**, the *display manager*, starts. On a normal PC, this is the login screen. On the Deck, you never see it.
3. SDDM **logs you in automatically** as `deck`, using the session named in its autologin setting.
4. That session runs **`start-gamescope-session`**, which starts a group of background services called `gamescope-session.target`.
5. Those services start **Gamescope**, the **Steam** client, the performance overlay and a few helpers. You're in Game Mode.

You can see step 3 yourself:

```bash
cat /etc/sddm.conf.d/zz-holo-autologin.conf
```

It's just two lines: `[Autologin]` and `Session=gamescope-wayland.desktop`. That's the whole reason your Deck skips the login screen and lands in Game Mode.

And here are the services from step 5, running under your user:

```bash
systemctl --user list-units --type=service | grep -E 'gamescope|steam'
```

**What did that just do?** It listed your user's running services and filtered for the Game Mode ones. You'll see entries like these:

| Service | What it does |
| :--- | :--- |
| **`gamescope-session.service`** | Runs Gamescope, the compositor that draws Game Mode |
| **`steam-launcher.service`** | Runs the Steam client in its controller-friendly interface |
| **`gamescope-mangoapp.service`** | Draws the performance overlay (MangoHud's `mangoapp`) |
| **`steamos-manager.service`** | Applies hardware settings like the TDP limit |
| **`steamos-powerbuttond.service`** | Handles the power button while you're in Game Mode |

## Gamescope, Game Mode's Compositor

A **compositor** is the program that takes every window and draws them all onto your screen. Every desktop has one. In Game Mode, that job belongs to **Gamescope**, Valve's compositor built specifically for games.

Gamescope sits between your game and the screen, which lets it do things the game never has to know about:

- **Frame rate limits**: it holds back frames so a game runs at a steady 40 or 30 FPS.
- **Upscaling**: it renders the game at a lower resolution and scales it up to fit the screen.
- **Overlays**: the Steam menu, the Quick Access menu and the performance overlay are drawn on top of your game without the game being involved.

Those are the controls you used in {{ collections.posts | chapterLink('performance') | safe }}. They work on every game for exactly this reason. Peek at how Gamescope was started:

```bash
pgrep -a gamescope
```

You'll see a long command line. Two parts are easy to read: `-w 1280 -h 800` is the resolution games see (the Deck's screen), and `-e` turns on Steam integration so the Steam client can control Gamescope.

The Steam client has its own telling flags too:

```bash
pgrep -a -x steam
```

Look for `-gamepadui` (the controller-friendly interface) and `-steamos3` (tells Steam it's running on SteamOS).

## SteamOS Manager: The Settings Engine

When you drag the **TDP Limit** slider in the Quick Access menu, Steam doesn't touch the hardware itself. It asks a background service, **SteamOS Manager**, to do it. You can talk to the same service from the terminal with `steamosctl`:

```bash
steamosctl get-tdp-limit
```

It prints something like `TDP limit: 15`, the current power limit in watts. Try `steamosctl --help` to see everything it controls: fan behavior, GPU clocks, charge limits and more.

> [!WARNING]
> **Stick to the `get-` commands.** The `set-` commands change real hardware settings. Use the Quick Access menu for those; it knows the safe ranges for your model.

## What Happens When You Switch Modes

When you choose **Switch to Desktop**, the switch is handled by SteamOS Manager. You can ask it to do the same thing yourself:

```bash
steamosctl switch-to-desktop-mode
```

Here's what that does:

1. Your Game Mode session ends: Gamescope, Steam and their helpers all shut down.
2. SDDM logs you straight back in, this time with the **Plasma** desktop session.
3. **Return to Gaming Mode** on the desktop does the reverse with `steamosctl switch-to-game-mode`.

You may also see the older `steamos-session-select` command in guides online. It still works, but look inside it with `cat /usr/bin/holo-session-select` and you'll find it's now just a thin wrapper around these `steamosctl` commands.

### Booting Straight Into Desktop Mode

By default, every boot lands in Game Mode. Check the current default:

```bash
steamosctl get-default-login-mode
```

It prints `game`. If you'd rather boot straight to the desktop, perhaps for a Deck that lives docked under a monitor, `steamosctl set-default-login-mode desktop` changes it, and `steamosctl set-default-login-mode game` changes it back.

## Who Gets to Do Admin Things?

Out of the box, your `deck` user has no password. Yet Discover installs apps, you can save Wi-Fi networks, and Steam can eject your SD card, all without asking. Type `sudo` in Konsole, though, and it demands a password. The difference comes down to two separate systems.

SteamOS has two gatekeepers:

- **`sudo`** runs a whole command as `root`, the all-powerful system account. It needs your password, which is why you set one in {{ collections.posts | chapterLink('bash') | safe }}.
- **polkit** handles requests from apps (like Discover, the Wi-Fi settings or Steam) to do one *specific* admin task. Instead of always asking, it follows a set of rules.

Think of polkit as a bouncer with a guest list. For each kind of request, it checks who's asking and where they are, then either lets them in, asks for ID (your password), or turns them away.

### SteamOS's Guest List

The rules that ship with SteamOS live in one folder:

```bash
ls /usr/share/polkit-1/rules.d/
```

Most follow the same pattern. Here's the one that decides whether Discover can install apps:

```bash
cat /usr/share/polkit-1/rules.d/org.freedesktop.Flatpak.rules
```

In plain English, its first rule says: allow installing and removing apps without a password **if** the person is in the `wheel` group, **and** their session is active, **and** it's local.

- **`wheel`** is Linux's traditional admin group. Run `id` and you'll see `deck` is a member.
- **Local** means a session on the Deck's own screen, like Game Mode or Desktop Mode. An SSH session is *remote*.
- **Active** means it's the session currently in use on that screen.

Other rules give `wheel` members the same easy pass for saving Wi-Fi networks, firmware updates and firewall settings. Valve's own rule, `org.valve.holo.rules`, lets them eject and unmount drives, with a comment noting it's "Used by Steam".

### Local vs. Remote, Side by Side

`pkcheck` asks polkit whether a program is allowed to do something, without actually doing it. In Konsole in Desktop Mode, run:

```bash
pkcheck --action-id org.freedesktop.Flatpak.app-install --process $$
```

**What did that just do?** It asked whether your current shell (`$$` means "this shell") may install Flatpak apps. Locally, the answer is `polkit\56result=yes` (the `\56` is just an encoded dot). Run the same command over SSH, and you get `polkit\56result=auth_admin` instead: a password is required. That's why installing a Flatpak remotely in {{ collections.posts | chapterLink('tailscale') | safe }} needs `sudo`.

*(If you use Fish, replace `$$` with `$fish_pid`.)*

> [!WARNING]
> **Don't add your own polkit rules.** Custom rules go in `/etc/polkit-1/rules.d/`, which isn't on SteamOS's keep-list, so the next update deletes them (see {{ collections.posts | chapterLink('steamos-updates') | safe }}). More importantly, a loose rule can let any app do admin tasks without asking. Valve's built-in rules are deliberately narrow.

## Why This Matters for Background Services

Because Game Mode and Desktop Mode are separate sessions, the apps you opened close when you switch modes, along with anything running inside them. Your *user services* keep running, though. systemd only stops a user's services 10 seconds after their last session ends (the `UserStopDelaySec` setting), and a mode switch starts the next session within a second of ending the last one.

SteamOS adds one stricter rule. Valve's `jupiter-legacy-support` package sets `KillUserProcesses=True`, so when a session ends, systemd kills every process still running inside it. An SSH connection is a session too, which is why a plain `tmux` started over SSH dies when you disconnect. {{ collections.posts | chapterLink('preinstalled') | safe }} shows the fix.

The last chapter of this phase puts the map, the update rules and the session model together: the right ways to add your own software to SteamOS, and the one way that always gets wiped.
