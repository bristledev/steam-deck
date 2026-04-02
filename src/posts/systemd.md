---
layout: base.njk
title: " Auto-Starting Scripts"
excerpt: "How to run background services automatically on boot."
tags:
  - posts
  - scripting
  - terminal
  - advanced
---

#  Auto-Starting Scripts ⚙️

You've learned how to write Bash scripts and run Python code. But running a script manually in Konsole every time you turn on your Steam Deck is tedious, especially if you want a mod or a syncing tool to run silently in the background while you game. 

To run something automatically when your Deck boots, we don't put it in a Startup folder like Windows. Instead, we use Linux's master service manager: **systemd**.

> [!NOTE]
> If you installed a tool through Home Manager or Linuxbrew, prefer their built-in service workflows first. Those approaches are more reproducible and easier to maintain. This chapter covers the manual `systemd` route for one-off scripts that are *not* managed by those tools.

## What is systemd?

`systemd` is the central nervous system of SteamOS (and almost all modern Linux systems). It controls what starts up, what shuts down, and what runs in the background.

When you install an app that runs in the background (like *EmuDeck's* background sync, or *Syncthing*), they create a tiny instruction file for `systemd` that tells it:
1. What the script is.
2. When it should start.
3. What happens if it crashes.

## Creating Your First Service

Let's use a real example: running **Copyparty** as a personal file server in the background, so your Deck is always ready to receive or share files on your local network.

If Copyparty came from Home Manager or Linuxbrew, configure the service there instead of creating a manual unit. The manual unit below is for the unmanaged case where you installed it yourself and want a straightforward autostart.

> [!WARNING]
> You should never run custom scripts as the `root` user unless absolutely necessary. We will use `systemctl --user`, which safely limits your background script to only control things *your* user profile can touch.

### 1. Create the Service File

`systemd` looks for your custom background services in a specific hidden folder:
`~/.config/systemd/user/`

Create it now:
```bash
mkdir -p ~/.config/systemd/user
nano ~/.config/systemd/user/copyparty.service
```

### 2. Write the Unit File

Because Copyparty is a Python package, we can use `uvx` — which you already have from the Python chapter — to run it directly without a separate install step. This keeps the unit file short and means `systemd` doesn't need to know anything about Python paths or virtual environments.

Paste this into nano:

```ini
[Unit]
Description=Copyparty File Server
After=network-online.target

[Service]
WorkingDirectory=/home/deck/Sync
ExecStart=/home/deck/.local/bin/uvx copyparty
Restart=always
RestartSec=10

[Install]
WantedBy=default.target
```

> [!NOTE]
> If you installed Copyparty through Nix instead of `uvx`, swap the `ExecStart` line for:
> ```
> ExecStart=/nix/var/nix/profiles/default/bin/nix run nixpkgs#copyparty
> ```
> The [upstream unit file](https://raw.githubusercontent.com/9001/copyparty/refs/heads/hovudstraum/contrib/systemd/copyparty.service) is available as a reference, but it targets a system-wide install and needs significant adaptation for a user service — the version above is all you need.

**What these lines mean:**
- `After=network-online.target` — wait for the network to be ready before starting. For a user service, the system will already have brought the network up by the time this runs, but the `After=` line adds an explicit ordering guarantee.
- `WorkingDirectory` — Copyparty serves the current working directory by default, so setting this to your `Sync` folder is all you need. No volume flags required.
- `ExecStart` — `uvx` fetches and runs Copyparty from PyPI in an isolated environment. The web UI is available at `http://<your-deck-ip>:3923` from any device on your network.
- `Restart=always` — if Copyparty crashes, wait 10 seconds and restart it automatically.
- `WantedBy=default.target` — the correct target for user services (not the system-wide `multi-user.target`).

Press `Ctrl+O` then `Enter` to save, then `Ctrl+X` to exit.

Then tell systemd about the new file:
```bash
systemctl --user daemon-reload
```

## How to Control Your Service

Now that you've built the engine, you need the keys. All interaction with `systemd` is done using the `systemctl` command. 

Because we put our service in the `user/` folder, we must add the `--user` flag to every command!

### Start the script right now:
```bash
systemctl --user start copyparty.service
```

### Enable it to start automatically on every boot:
```bash
systemctl --user enable copyparty.service
```

### Stop the script:
```bash
systemctl --user stop copyparty.service
```

### Check if it's running (The ultimate troubleshooting tool):
```bash
systemctl --user status copyparty.service
```
The `status` command shows whether Copyparty is running and prints the last few lines of its output. If your file server is not reachable, this is the very first command you should run.

### See the full log output:
```bash
journalctl --user -u copyparty.service
```
This streams the complete journal for Copyparty. When it starts successfully, you should see a QR code and URL appear in the logs. If it fails, the error message here will be your best clue to what went wrong.

> [!TIP]
> Add `-f` to follow the log live: `journalctl --user -u copyparty.service -f`. Press `Ctrl+C` to stop following.

## Surviving Game Mode: Enable Lingering

There's one gotcha you should know about. By default, Linux only runs your `--user` services while you have an active login session (like Desktop Mode). When you switch back to Game Mode, the system may consider your desktop session "closed" and quietly kill all your background scripts.

The fix is a one-time command called `loginctl enable-linger`:

```bash
loginctl enable-linger deck
```

This tells `systemd`: "Keep this user's services running even when they don't have a desktop session open." After running this once, your services will stay alive in the background whether you're in Desktop Mode, Game Mode, or even if you never open the desktop at all.

> [!TIP]
> You only need to run `loginctl enable-linger` once — it's permanent. You can verify it's active with `loginctl show-user deck | grep Linger`, which should print `Linger=yes`.  Run `loginctl disable-linger deck` to revert if you change your mind.

> [!CAUTION]
> Background services consume CPU and battery even while you're gaming. If you notice shorter battery life, a runaway service may be the culprit — check with `systemctl --user status copyparty.service`. Also keep in mind that when your Deck goes to **sleep**, all services are suspended until it wakes back up. If your service needs to do work on a strict schedule, those intervals will slip during sleep.

## The Power of Auto-Start

You just leveled up. Turning scripts into resilient, auto-starting `systemd` services is a core Linux skill for unmanaged, one-off scripts. With lingering enabled, your customizations survive reboots *and* mode switches, seamlessly running in the background whether you're gaming or tinkering.

{% next_chapter %}
