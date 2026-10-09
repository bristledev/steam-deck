---
layout: base.njk
title: "⚙️ Auto-Starting Scripts"
excerpt: "How to run background services automatically on boot."
tags:
  - posts
  - scripting
  - terminal
  - advanced
---

#  Auto-Starting Scripts

You've learned how to run community scripts and Python tools. But running a script manually in Konsole every time you turn on your Steam Deck is tedious, especially if you want a mod or a syncing tool to run silently in the background while you game. 

To run something automatically when your Deck boots, we don't put it in a Startup folder like Windows. Instead, we use Linux's master service manager: **systemd**.

> [!NOTE]
> If you installed a tool through {{ collections.posts | chapterLink('homebrew') | safe }}, check whether `brew services start <name>` supports it first; Homebrew can create and manage the service for you. This chapter covers the manual `systemd` route for scripts and tools that aren't managed that way.

## What is systemd?

`systemd` is the central nervous system of SteamOS (and almost all modern Linux systems). It controls what starts up, what shuts down, and what runs in the background.

Every background program you've met so far is a systemd *service*: SSH (`sshd`), Tailscale (`tailscaled`), Decky Loader (`plugin_loader`), and even Game Mode itself, as you saw in {{ collections.posts | chapterLink('steamos-sessions') | safe }}. Each one has a tiny instruction file, called a *unit file*, that tells `systemd`:
1. What program to run.
2. When it should start.
3. What happens if it crashes.

You can read any of them with `systemctl cat`, for example `systemctl cat sshd`.

## Creating Your First Service

Let's use a real example: running **Copyparty** as a personal file server in the background, so your Deck is always ready to receive or share files on your local network.

> [!WARNING]
> You should never run custom scripts as the `root` user unless absolutely necessary. We will use `systemctl --user`, which safely limits your background script to only control things *your* user profile can touch.

### 1. Create the Service File

`systemd` looks for your custom background services in a specific hidden folder:
`~/.config/systemd/user/`

Create it now, along with a `Sync` folder for Copyparty to share:
```bash
mkdir -p ~/.config/systemd/user ~/Sync
nano ~/.config/systemd/user/copyparty.service
```

### 2. Write the Unit File

Because Copyparty is a Python package, we can use `uvx` — which you already have from the Python chapter — to run it directly without a separate install step. This keeps the unit file short and means `systemd` doesn't need to know anything about Python paths or virtual environments.

Paste this into nano:

```ini
[Unit]
Description=Copyparty File Server

[Service]
WorkingDirectory=/home/deck/Sync
ExecStart=/home/deck/.local/bin/uvx copyparty -a deck:CHANGE-ME -v .::rw,deck
Restart=always
RestartSec=10

[Install]
WantedBy=default.target
```

> [!NOTE]
> If you'd rather use Nix, install Copyparty with `nix profile add nixpkgs#copyparty` and swap the `ExecStart` line for:
> ```ini
> ExecStart=/home/deck/.nix-profile/bin/copyparty -a deck:CHANGE-ME -v .::rw,deck
> ```
> The **[upstream unit file](https://raw.githubusercontent.com/9001/copyparty/refs/heads/hovudstraum/contrib/systemd/copyparty.service)** is available as a reference, but it targets a system-wide install and needs significant adaptation for a user service — the version above is all you need.

**What these lines mean:**
- `WorkingDirectory` — the folder Copyparty runs in. The `.` in the `-v` option below means "this folder", so Copyparty shares your `Sync` folder.
- `ExecStart` — `uvx` fetches and runs Copyparty from PyPI in an isolated environment. The web UI is available at `http://<your-deck-ip>:3923` from any device on your network.
  - `-a deck:CHANGE-ME` creates a Copyparty account named `deck`. **Replace `CHANGE-ME` with your own password**, one you don't use anywhere else, because it's stored as plain text in this file.
  - `-v .::rw,deck` shares the folder so that only the `deck` account can read (`r`) and write (`w`) files. Anyone else gets a "403 forbidden" page and a login box.
- `Restart=always` — if Copyparty crashes, wait 10 seconds and restart it automatically.
- `WantedBy=default.target` — the correct target for user services (not the system-wide `multi-user.target`).

> [!CAUTION]
> **Don't leave out the account.** Started with no options, Copyparty gives *everyone* on the network read and write access to the folder, as its **[README](https://github.com/9001/copyparty#quickstart)** warns. SteamOS's firewall lets in connections on ports above 1024, including Copyparty's 3923. At home that might be fine, but on a café or hotel network, strangers could browse, change or delete your files.

> [!NOTE]
> Other guides often add `After=network-online.target` to wait for the network. That line does nothing in a `--user` service. Your user's service manager is separate from the system one and can't see system targets like `network-online.target`. Copyparty doesn't need it anyway; it starts listening right away and answers once the Wi-Fi is up.

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
This shows the complete log for Copyparty. When it starts successfully, you'll see lines like `available @ http://192.168.1.50:3923/`, one for each address your Deck can be reached at. If it fails, the error message here will be your best clue to what went wrong.

> [!TIP]
> Add `-f` to follow the log live: `journalctl --user -u copyparty.service -f`. Press `Ctrl+C` to stop following.

## Surviving Game Mode: Enable Lingering

There's one gotcha you should know about. By default, Linux only runs your `--user` services while the `deck` user is logged in. As you saw in {{ collections.posts | chapterLink('steamos-sessions') | safe }}, Game Mode and Desktop Mode are *both* login sessions: the Deck logs you in automatically either way. But switching modes ends one session and starts another, and if there's a moment with no session at all, systemd may stop your background services along with it.

The fix is a one-time command called `loginctl enable-linger`:

```bash
loginctl enable-linger deck
```

This tells `systemd`: "Start this user's services at boot and keep them running, even when no session is open." After running this once, your services will stay alive in the background through mode switches, whether you're in Desktop Mode or Game Mode.

> [!TIP]
> You only need to run `loginctl enable-linger` once — it's permanent. You can verify it's active with `loginctl show-user deck | grep Linger`, which should print `Linger=yes`.  Run `loginctl disable-linger deck` to revert if you change your mind.

> [!WARNING]
> Background services consume CPU and battery even while you're gaming. If you notice shorter battery life, a runaway service may be the culprit — check with `systemctl --user status copyparty.service`. Also keep in mind that when your Deck goes to **sleep**, all services are suspended until it wakes back up. If your service needs to do work on a strict schedule, those intervals will slip during sleep.

## The Power of Auto-Start

You just leveled up. Turning scripts into resilient, auto-starting `systemd` services is a core Linux skill for unmanaged, one-off scripts. With lingering enabled, your customizations survive reboots *and* mode switches, seamlessly running in the background whether you're gaming or tinkering.

---

Services are great for a single program. But what if you want to run a whole server, with everything it needs packed inside? Next, let's meet the container engine that comes with SteamOS.
