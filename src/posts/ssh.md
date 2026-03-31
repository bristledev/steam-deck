---
layout: base.njk
title: " Wireless File Transfers (SSH)"
excerpt: "Move files directly to your Deck over Wi-Fi."
tags: posts
---

#  Wireless File Transfers (SSH) 📡

Every Steam Deck owner has felt the struggle: you have a massive folder of ROMs, mods, or videos on your main PC, and you want to get them onto your Steam Deck.

Do you plug in a USB-C drive? Do you mess with cloud storage like Google Drive? Do you email them to yourself?

There's a better way. The "Linux" way. 

By turning on **SSH** (Secure Shell), you can wirelessly drag and drop files from your Windows, Mac, or Linux computer directly onto the Steam Deck using your home Wi-Fi network.

## Step 1: Tell Your Deck to Listen

By default, the Steam Deck ignores connections from other computers. We need to turn on the `sshd` background service so it starts listening.

*(A **service** is a background process that starts automatically — we'll explore services in depth in a later chapter!)*

1. Open **Konsole**.
2. Run this command to enable the SSH service permanently:
```bash
sudo systemctl enable sshd
```
3. Run this command to start the service right now (no reboot required!):
```bash
sudo systemctl start sshd
```

> [!CAUTION]
> **Important Security Warning!**
> Enabling SSH means anyone on your Wi-Fi network can try to log into your Steam Deck. This is perfectly safe as long as your `deck` user password is strong! Never use "1234" or "password".

## Step 2: Grab Your Deck's IP Address

Your computer needs to know where the Steam Deck is on the network. This is its **IP Address**.

To find it, open **Konsole** and type:
```bash
ip addr
```
Look for a line that starts with `inet 192.168...` or `10.0...`. This is your Deck's local IP address. 

*(Alternatively, you can go into Game Mode -> Settings -> Internet and click on your Wi-Fi connection to view it.)*

## Step 3: Connect!

There are two main ways to connect. If you just want to run terminal commands remotely, you can open Command Prompt/Terminal on your main PC and run `ssh deck@192.168.x.x`.

But if you want to **drag and drop files visually**, you need an SFTP Client.

### For Windows Users: [WinSCP](https://winscp.net/)
WinSCP is a free, legendary piece of software for transferring files.
1. Download, install, and open WinSCP.
2. In the "Login" screen, set the **File Protocol** to **SFTP**.
3. In **Host name**, type your Deck's IP Address (e.g. `192.168.1.50`).
4. Set **User name** to `deck`.
5. Enter the `sudo` password you created when setting up the terminal.
6. Click **Login**!

### For Mac / Linux Users: [FileZilla](https://filezilla-project.org/) or [Cyberduck](https://cyberduck.io/)
1. Open the app and create a new connection.
2. Choose **SFTP** as the protocol.
3. Enter the IP Address, username (`deck`), and password.
4. Click **Connect**!

## Welcome to the Grid

The first time you connect, your computer will ask you if you trust the device's "security key". Click Yes or Accept.

Suddenly, a split-screen window will appear. 
- On the left is your main PC. 
- On the right is your Steam Deck's `/home/deck` folder!

You can now drag and drop huge gigabytes of games, mods, and ROMs across the network as if the Steam Deck was just a regular folder on your computer. Modding your games just became infinitely easier!

But what if you want to access your Deck from *outside* your house? 

{% next_chapter %}
