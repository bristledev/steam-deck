---
layout: base.njk
title: " Auto-Starting Scripts"
excerpt: "How to run background services automatically on boot."
tags: posts
---

#  Auto-Starting Scripts ⚙️

You've learned how to write Bash scripts and run Python code. But running a script manually in Konsole every time you turn on your Steam Deck is tedious, especially if you want a mod or a syncing tool to run silently in the background while you game. 

To run something automatically when your Deck boots, we don't put it in a Startup folder like Windows. Instead, we use Linux's master service manager: **systemd**.

## What is systemd?

`systemd` is the central nervous system of SteamOS (and almost all modern Linux systems). It controls what starts up, what shuts down, and what runs in the background.

When you install an app that runs in the background (like *EmuDeck's* background sync, or *Syncthing*), they create a tiny instruction file for `systemd` that tells it:
1. What the script is.
2. When it should start.
3. What happens if it crashes.

## Creating Your First Service

Let's imagine you wrote a Python script called `my-cool-script.py` and saved it in your `Documents` folder. You want it to run quietly in the background as soon as you turn on your Deck.

> [!WARNING]
> You should never run custom scripts as the `root` user unless absolutely necessary. We will use `systemctl --user`, which safely limits your background script to only control things *your* user profile can touch.

### 1. Make the Service File

`systemd` looks for your custom background services in a specific hidden folder:
`/home/deck/.config/systemd/user/`

Open Konsole and create your new service file, which must end in `.service`.
```bash
nano ~/.config/systemd/user/my-cool-script.service
```

### 2. Write the Instructions

Every service file needs three basic sections: `[Unit]`, `[Service]`, and `[Install]`.

Copy this template into your file:
```ini
[Unit]
Description=My Cool Background Service
After=network.target

[Service]
ExecStart=/usr/bin/python3 /home/deck/Documents/my-cool-script.py
Restart=always
RestartSec=10

[Install]
WantedBy=default.target
```

**Let's break this down:**
- `After=network.target` means the script will wait until your Deck connects to Wi-Fi before it runs.
- `ExecStart` is the exact command you would normally type in the terminal. **Important:** You must use full paths in `systemd` files (e.g., `/usr/bin/python3` instead of just `python3`).
- `Restart=always` tells the system: "If this script crashes, wait 10 seconds and start it again automatically."
- `WantedBy=default.target` makes sure it actually starts when you log in.

Press `Ctrl+O` then `Enter` to save, and `Ctrl+X` to exit out of `nano`.

## How to Control Your Service

Now that you've built the engine, you need the keys. All interaction with `systemd` is done using the `systemctl` command. 

Because we put our service in the `user/` folder, we must add the `--user` flag to every command!

### Start the script right now:
```bash
systemctl --user start my-cool-script.service
```

### Enable it to start automatically on every boot:
```bash
systemctl --user enable my-cool-script.service
```

### Stop the script:
```bash
systemctl --user stop my-cool-script.service
```

### Check if it's running (The ultimate troubleshooting tool):
```bash
systemctl --user status my-cool-script.service
```
The `status` command will even print out the last few lines of `print()` statements or errors your script spit out. If your background app isn't working, this is the very first command you should run!

## The Power of Auto-Start

You just leveled up. Turning scripts into resilient, auto-starting `systemd` services is a core Linux skill. This ensures that your customizations survive reboots, seamlessly blending into the console-like experience of Game Mode.

{% next_chapter %}
