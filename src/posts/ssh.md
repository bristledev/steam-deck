---
layout: base.njk
title: "🔐 Wireless File Transfers (SSH)"
excerpt: "Move files directly to your Deck over Wi-Fi."
tags:
  - posts
  - networking
  - terminal
  - intermediate
---

#  Wireless File Transfers (SSH) 📡

Every Steam Deck owner has felt the struggle: you have a massive folder of ROMs, mods, or videos on your main PC, and you want to get them onto your Steam Deck.

Do you plug in a USB-C drive? Do you mess with cloud storage like Google Drive? Do you email them to yourself?

There's a better way.

By turning on **SSH** (Secure Shell), you can wirelessly drag and drop files from your Windows, Mac, or Linux computer directly onto the Steam Deck using your home Wi-Fi network. SSH gives you a secure connection to your Deck, and file transfer apps use a part of it called **SFTP** (SSH File Transfer Protocol) to move files over that connection.

## Step 1: Tell Your Deck to Listen

By default, the Steam Deck ignores connections from other computers. We need to turn on the `sshd` background service so it starts listening.

*(A **service** is a background process that starts automatically — we'll explore services in depth in a later chapter!)*

> [!NOTE]
> You need an admin password for this step. If you haven't set one yet, do that first in {{ collections.posts | chapterLink('bash') | safe }}.

1. Open **Konsole**.
2. Run this command:
   ```bash
   sudo systemctl enable --now sshd
   ```
3. Type your admin password when asked.

**What did that just do?** `enable` tells the SSH service to start every time your Deck boots, and `--now` starts it right away too, so there's no need to reboot. The setting even survives SteamOS updates; you'll see why in {{ collections.posts | chapterLink('steamos-updates') | safe }}.

> [!CAUTION]
> **Enabling SSH means any device on the same network can try to log in to your Deck.** Use a strong admin password, never "1234" or "password". If you take your Deck to a café, hotel, or other network you don't trust, switch SSH off first with `sudo systemctl disable --now sshd`, then turn it back on at home.

## Step 2: Grab Your Deck's IP Address

Your computer needs to know where the Steam Deck is on the network. This is its **IP Address**.

To find it, open **Konsole** and run:
```bash
ip -brief addr
```

**What did that just do?** It listed your Deck's network connections, one per line. Find the line that starts with `wlan0` (your Wi-Fi). The address is the number before the `/`, like `192.168.1.50` in `192.168.1.50/24`.

*(Alternatively, you can go into Game Mode -> Settings -> Internet and select your Wi-Fi connection to view it.)*

> [!TIP]
> **Skip the IP address entirely.** Your router can hand your Deck a different IP address after a restart, but SteamOS also announces your Deck on your home network by name. Run `hostnamectl hostname` to see its name (for example, `steamdeck`), then connect to that name plus `.local`, like `ssh deck@steamdeck.local`. This works out of the box on Mac and most Linux computers, and usually on Windows 10 and 11. If it doesn't, fall back to the IP address.

## Step 3: Connect!

There are two main ways to connect. If you just want to run terminal commands remotely, open a terminal on your main PC (on Windows, Command Prompt or PowerShell) and run `ssh deck@192.168.x.x`, using your Deck's address.

But if you want to **drag and drop files visually**, you need an SFTP app.

### For Windows Users: [WinSCP](https://winscp.net/)
WinSCP is a free, long-standing favorite for transferring files.
1. Download, install, and open WinSCP.
2. In the "Login" screen, set the **File Protocol** to **SFTP**.
3. In **Host name**, type your Deck's IP Address (e.g. `192.168.1.50`).
4. Set **User name** to `deck`.
5. Enter the admin password you set in {{ collections.posts | chapterLink('bash') | safe }}.
6. Click **Login**!

### For Mac / Linux Users: [FileZilla](https://filezilla-project.org/) or [Cyberduck](https://cyberduck.io/)
1. Open the app and create a new connection.
2. Choose **SFTP** as the protocol.
3. Enter the IP Address, username (`deck`), and password.
4. Click **Connect**!

> [!TIP]
> **On Linux, you may not need an app at all.** Most file managers, including Dolphin, can open your Deck directly: type `sftp://deck@192.168.x.x` into the address bar.

## Welcome to the Grid

The first time you connect, your computer will ask whether you trust the Deck's "security key". This key is like an ID card that proves you're talking to *your* Deck. Click **Yes** or **Accept**.

> [!NOTE]
> SteamOS keeps your Deck's security key across updates, so you'll only see this question again if you reinstall SteamOS or connect from a new computer.

In WinSCP and FileZilla, a split-screen window appears:
- On the left is your main PC.
- On the right is your Steam Deck's `/home/deck` folder!

You can now drag and drop gigabytes of games, mods, and ROMs across the network as if the Steam Deck was just a regular folder on your computer. Modding your games just got a lot easier!

> [!TIP]
> **Want files to sync automatically?** SSH is great for one-time transfers, but if you want a folder (like your ROM library) to stay in sync across your Deck and PC continuously, check out **[Syncthing](https://syncthing.net/)**. There's no official Syncthing app in Discover, but community apps like **SyncThingy** bundle it with a tray icon, or you can install it with {{ collections.posts | chapterLink('homebrew') | safe }} later in this series. Syncthing even works outside your home network on its own: when two devices can't connect directly, it automatically passes the traffic through a relay server.

But what if you want to access your Deck from *outside* your house?
