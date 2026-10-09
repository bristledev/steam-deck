---
layout: base.njk
title: "⚙️ Background Services (systemd)"
excerpt: "Turn a script or tool into a background service that starts by itself and keeps running across mode switches."
tags:
  - posts
  - scripting
  - terminal
  - advanced
---

# Background Services (systemd)

Some tools are meant to run all the time, like a file server or a sync tool. Starting them by hand in Konsole after every reboot gets old quickly, and they stop when you close the window. Linux doesn't use a Startup folder like Windows; instead, background programs are run by a *service manager* called **systemd**.

> [!NOTE]
> If you installed a tool through {{ collections.posts | chapterLink('homebrew') | safe }}, check whether `brew services start <name>` supports it first; Homebrew can create and manage the service for you. This chapter covers the manual `systemd` route for scripts and tools that aren't managed that way.

## What Is systemd?

`systemd` starts, stops and watches over the background programs on SteamOS and on most modern Linux systems. A program it manages is called a *service*.

Every background program you've met so far is a systemd service: SSH (`sshd`), Tailscale (`tailscaled`), Decky Loader (`plugin_loader`), and even Game Mode itself, as you saw in {{ collections.posts | chapterLink('steamos-sessions') | safe }}. Each one has a short text file, called a *unit file*, that tells `systemd`:

1. What program to run.
2. When it should start.
3. What to do if it crashes.

You can read any of them with `systemctl cat`, for example `systemctl cat sshd`.

## Creating Your First Service

This example runs **[Copyparty](https://github.com/9001/copyparty)**, a small file server, in the background, so you can upload and download files to your Deck from any device on your network through a web browser.

> [!WARNING]
> **Don't run your own services as `root` unless you have to.** This chapter uses `systemctl --user`, which runs the service as your `deck` user, so it can only touch what you can touch.

### 1. Create the Unit File

`systemd` looks for your own services in the hidden folder `~/.config/systemd/user/`. Create it, along with a `Sync` folder for Copyparty to share, and open a new unit file in nano:

```bash
mkdir -p ~/.config/systemd/user ~/Sync
nano ~/.config/systemd/user/copyparty.service
```

### 2. Write the Unit File

Copyparty is a Python package, so you can run it with `uvx`, which you installed in {{ collections.posts | chapterLink('python') | safe }}. `uvx` downloads and runs it without a separate install step, so `systemd` doesn't need to know anything about Python environments.

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
> The **[upstream unit file](https://raw.githubusercontent.com/9001/copyparty/refs/heads/hovudstraum/contrib/systemd/copyparty.service)** is available as a reference, but it targets a system-wide install and needs significant changes for a user service; the version above is all you need.

**What these lines mean:**

- `WorkingDirectory`: the folder Copyparty runs in. The `.` in the `-v` option below means "this folder", so Copyparty shares your `Sync` folder.
- `ExecStart`: the command to run. `uvx` fetches Copyparty from PyPI, the Python package index, and runs it in an isolated environment. The web page is then available at `http://<your-deck-ip>:3923` from any device on your network.
  - `-a deck:CHANGE-ME` creates a Copyparty account named `deck`. **Replace `CHANGE-ME` with your own password**, one you don't use anywhere else, because it's stored as plain text in this file.
  - `-v .::rw,deck` shares the folder so that only the `deck` account can read (`r`) and write (`w`) files. Anyone else gets a "403 forbidden" page and a login box.
- `Restart=always` and `RestartSec=10`: if Copyparty crashes, wait 10 seconds and start it again.
- `WantedBy=default.target`: start it whenever your user's service manager starts. This is the right target for user services (not the system-wide `multi-user.target`).

> [!CAUTION]
> **Don't leave out the account.** Started with no options, Copyparty gives *everyone* on the network read and write access to the folder, as its **[README](https://github.com/9001/copyparty#quickstart)** warns. SteamOS's firewall lets in connections on ports above 1024, including Copyparty's 3923. At home that might be fine, but on a café or hotel network, strangers could browse, change or delete your files.

> [!NOTE]
> Other guides often add `After=network-online.target` to wait for the network. That line does nothing in a `--user` service. Your user's service manager is separate from the system one and can't see system targets like `network-online.target`. Copyparty doesn't need it anyway; it starts listening right away and answers once the Wi-Fi is up.

Press **Ctrl+O**, then **Enter** to save, and **Ctrl+X** to exit nano. Then tell systemd to read the new file:

```bash
systemctl --user daemon-reload
```

## Controlling Your Service

You control services with `systemctl`. Because this is a user service, every command needs `--user`:

| Command | What it does |
| :--- | :--- |
| `systemctl --user start copyparty` | Starts it now |
| `systemctl --user enable copyparty` | Starts it automatically from now on |
| `systemctl --user stop copyparty` | Stops it |
| `systemctl --user disable copyparty` | Stops it starting automatically |
| `systemctl --user status copyparty` | Shows whether it's running, plus its last few log lines |
| `journalctl --user -u copyparty` | Shows its full log |

Start it and enable it now:

```bash
systemctl --user enable --now copyparty
```

**What did that just do?** `enable` set Copyparty to start automatically, and `--now` started it straight away, the same pattern you used for SSH in {{ collections.posts | chapterLink('ssh') | safe }}.

If the server isn't reachable, `systemctl --user status copyparty` is the first thing to check. For more detail, read the log with `journalctl`. When Copyparty starts successfully, you'll see lines like `available @ http://192.168.1.50:3923/`, one for each address your Deck can be reached at. If it fails, the error message is your best clue.

> [!TIP]
> Add `-f` to follow the log live: `journalctl --user -u copyparty -f`. Press **Ctrl+C** to stop following.

## Mode Switches and Lingering

Your service keeps running when you switch between Game Mode and Desktop Mode. As {{ collections.posts | chapterLink('steamos-sessions') | safe }} explains, systemd waits 10 seconds after your last session ends before it stops your user services, and a mode switch starts the next session within a second.

What would stop it is having no session at all for longer than that. A one-time setting called *lingering* covers that case. SteamOS ships with it switched off:

```bash
loginctl enable-linger deck
```

**What did that just do?** It told systemd to start the `deck` user's services at boot, before the Deck logs you in, and to keep them running even when no session is open. On a Deck that logs you in automatically, that rarely matters, so lingering is optional insurance rather than a requirement.

> [!TIP]
> The setting is permanent. To check it, run `loginctl show-user deck | grep Linger`, which should print `Linger=yes`. To undo it, run `loginctl disable-linger deck`.

> [!WARNING]
> **Background services use CPU and battery, even while you play.** If your battery life drops, check your services with `systemctl --user status`. Also note that when the Deck goes to **sleep**, services pause until it wakes, so anything that runs on a schedule will run late.

Services work well for a single program. For a whole server with everything it needs packed inside, SteamOS includes a container engine, which the next chapter introduces.
