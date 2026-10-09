---
layout: base.njk
title: "🌐 Remote Access with Tailscale"
excerpt: "Reach your Deck securely from anywhere, run commands on it remotely and send files to it with Taildrop."
tags:
  - posts
  - networking
  - apps
  - intermediate
---

# Remote Access with Tailscale

In {{ collections.posts | chapterLink('ssh') | safe }}, you connected to your Steam Deck over your home Wi-Fi. Reaching it from outside your home is harder: the usual way means opening ports on your router, which exposes your Deck to the whole internet. Tailscale avoids that.

## What Is Tailscale?
**[Tailscale](https://tailscale.com/)** is a VPN that links your devices into one private network, no matter where they are in the world. It works like a private hallway between your phone, your laptop and your Steam Deck that nobody else can walk down. There's no port forwarding to set up and no router settings to touch.

Once your Deck is connected, you get two extras:

- **Tailscale SSH**: Log in to your Deck from your other devices using your Tailscale account instead of an SSH password. By default, Tailscale occasionally asks you to confirm it's you in a web browser, and that confirmation lasts 12 hours (see **[Tailscale's SSH guide](https://tailscale.com/kb/1193/tailscale-ssh)**).
- **Taildrop**: Send files between your own devices (more on this below).

## How to Install Tailscale
Tailscale needs a background service with admin rights, which an app from Discover can't provide. Instead, we'll use **[deck-tailscale](https://github.com/tailscale-dev/deck-tailscale)**, an install script from the `tailscale-dev` project on GitHub, based on **[Tailscale's own Steam Deck guide](https://tailscale.com/blog/steam-deck)**. It puts Tailscale in places that SteamOS updates leave alone, so it keeps working after every update. (You'll see exactly how in {{ collections.posts | chapterLink('steamos-extending') | safe }}.)

1. Open **Konsole**. You'll need your admin password from {{ collections.posts | chapterLink('bash') | safe }}.
2. Download the installer:
   ```bash
   git clone https://github.com/tailscale-dev/deck-tailscale.git ~/deck-tailscale
   ```
3. Enter the folder and run the installer:
   ```bash
   cd ~/deck-tailscale
   sudo bash tailscale.sh
   ```
4. Start Tailscale and log in:
   ```bash
   sudo /opt/tailscale/tailscale up --qr --operator=deck --ssh
   ```
   A **QR Code** will appear in your terminal. Scan it with your phone and sign in to Tailscale (or create a free account). Your Steam Deck is now on your private network.
5. **Log out and back in.** The installer adds Tailscale to your PATH with a file in `/etc/profile.d`, which is only read when you log in, so a new Konsole window isn't enough. Switch to Game Mode and back to Desktop Mode, or restart the Deck. To use it in the terminal you already have open, run `. /etc/profile.d/tailscale.sh` (in Fish, `set -gx PATH $PATH /opt/tailscale`). After that, plain `tailscale` commands work without `sudo`.
6. **Install Tailscale on your other devices** from **[tailscale.com/download](https://tailscale.com/download)**, and sign in with the same account.

**What did that just do?** In step 4, `up` connects your Deck to your Tailscale network. `--qr` shows the login link as a QR code, `--operator=deck` lets your `deck` user control Tailscale without `sudo` afterwards and `--ssh` turns on Tailscale SSH.

> [!NOTE]
> **Why the long `/opt/tailscale/tailscale` path?** For safety, `sudo` only looks for programs in a short, fixed list of folders, and `/opt/tailscale` isn't one of them. Plain `sudo tailscale` would fail with "command not found". The **[deck-tailscale instructions](https://github.com/tailscale-dev/deck-tailscale#readme)** use the full path for the same reason.

## Connecting to Your Deck from Anywhere
On your Deck, list the devices on your Tailscale network:

```bash
tailscale status
```

**What did that just do?** It showed every device signed in to your account, each with a private address starting with `100.` and a device name. Your Deck's name is usually the same as its hostname.

Now, from your PC, wherever you are, connect with the Deck's Tailscale name (or its `100.` address):

```bash
ssh deck@steamdeck
```

Replace `steamdeck` with your Deck's name from `tailscale status`. The first time, Tailscale may print a link to confirm it's you in a web browser. After that, you're in.

## Optional: The KTailctl App
If you prefer a visual interface over the terminal, you can install **[KTailctl](https://flathub.org/en/apps/org.fkoehler.KTailctl)**. This is a community-made app that lets you see your other devices and manage your connection right from the desktop.

1. Open **Discover**.
2. Search for **KTailctl** and click **Install**.
3. Now you have a Tailscale icon in your system tray that you can use to turn the connection on and off.

According to **[KTailctl's README](https://github.com/f-koehler/KTailctl)**, it needs Tailscale's "operator" permission to change settings, and the `--operator=deck` flag from step 4 already took care of that.

## Useful Remote Commands
Once you can connect to your Deck over SSH, either through Tailscale or on your home network, you can do a lot from your laptop while the Deck stays where it is:

- **Switch to Desktop Mode**: Run `steamosctl switch-to-desktop-mode`. The Deck restarts its session (no full reboot) and comes back up in Desktop Mode. To return to Game Mode, run `steamosctl switch-to-game-mode`. You'll learn what's happening behind the scenes in {{ collections.posts | chapterLink('steamos-sessions') | safe }}. *(Older guides use `steamos-session-select plasma`, which still works too.)*
- **Install apps**: To install an app from Flathub, run `sudo flatpak install flathub com.discordapp.Discord` to install it straight onto your Deck. Because you're not sitting at the Deck, SteamOS asks for your admin password, hence the `sudo`. The app will be waiting in Desktop Mode's application menu.
- **Watch the system**: Run `btop` (it comes with SteamOS) for a live view of your Deck's CPU, memory and running programs. Start a game on the Deck and watch the numbers from your laptop.
- **Restart or shut down**: `sudo steamos-reboot` restarts the Deck, and `sudo steamos-poweroff` shuts it down.

## Remote File Transfers (Taildrop)
Once Tailscale is on your phone or laptop and your Deck, you can use **Taildrop** to send files between them.

> [!NOTE]
> Taildrop is still an early (alpha) feature, and it only sends files between your *own* devices. Before using it, turn on **Send Files** in Tailscale's online admin console. See **[Tailscale's Taildrop guide](https://tailscale.com/kb/1106/taildrop)** for details.

- **To send a file**: On Windows, right-click the file and choose **Send with Tailscale**. On a Mac, iPhone or Android phone, use the **Share** menu and choose **Tailscale**. Then pick your **Steam Deck**.
- **To receive it on your Deck**: Received files wait in Tailscale's inbox until you collect them. Run `tailscale file get ~/Downloads` to move them into your `Downloads` folder.

## Keeping Tailscale Updated
Tailscale doesn't come from Discover, so Discover won't update it. Update it from Konsole instead:

```bash
sudo /opt/tailscale/tailscale update
```

To have it update itself automatically from now on, run `tailscale set --auto-update`.

> [!WARNING]
> **Run updates from your Deck's own Konsole, or over regular SSH.** The **[deck-tailscale README](https://github.com/tailscale-dev/deck-tailscale#readme)** warns that updating over a Tailscale SSH connection will most likely fail.

It's also worth refreshing the install script now and then, since it gets fixes too:

```bash
cd ~/deck-tailscale
git pull
sudo bash tailscale.sh
```

To remove Tailscale completely, run `sudo bash uninstall.sh` from the same folder.

You've now used SteamOS from the couch, the desk and the other side of the world. The next phase looks at how it works underneath, starting with a map of everything on your drive.
