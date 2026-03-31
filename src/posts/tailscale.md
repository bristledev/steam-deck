---
layout: base.njk
title: " Tailscale"
excerpt: "Access your Deck from anywhere and transfer files."
tags: posts
---

#  Tailscale – Access Your Deck from Anywhere

In the {{ collections.posts | chapterLink('ssh') | safe }} chapter, you learned how to connect to your Steam Deck over your home Wi-Fi. That’s perfect for home use, but it gets complicated—and potentially dangerous—if you want to reach your Deck from outside your house. You’d have to mess with router port forwarding and firewall rules.

That’s where remote access tools come in.

## The Magic Way: Tailscale
If you want the ultimate, painless remote experience, **[Tailscale](https://tailscale.com/)** is the answer. It’s a "Zero Config" VPN that creates a secure, private hallway between your devices—your phone, your laptop, and your Steam Deck—no matter where they are in the world. 

Normally, remote connections require setting up scary network rules. **Tailscale does all of that for you.**

- **Tailscale SSH**: The gold standard for remote access. No passwords, no keys, just pure secure magic from your PC to your Deck.
- **Easy File Transfers**: Drag and drop files directly between your devices (more on this below).

## How to Install Tailscale
Because SteamOS is a unique, "read-only" system, we shouldn't just install Tailscale from a standard app store. Instead, we’ll use a special community-made script called **[deck-tailscale](https://github.com/tailscale-dev/deck-tailscale)** that makes Tailscale "survive" even when Valve updates your Steam Deck.

1. Open **Konsole** (from {{ collections.posts | chapterLink('bash') | safe }}).
2. Type this command to download the installer:
   ```bash
   git clone https://github.com/tailscale-dev/deck-tailscale.git ~/deck-tailscale
   ```
3. Now, enter the folder and run the installer:
   ```bash
   cd ~/deck-tailscale
   sudo bash tailscale.sh
   ```
   *(You'll need your admin password from {{ collections.posts | chapterLink('bash') | safe }}!)*

4. Finally, start Tailscale and log in:
   ```bash
   tailscale up --qr --operator=deck --ssh
   ```
   A **QR Code** will appear in your terminal. Scan it with your phone, log in, and your Steam Deck is officially on your private network!

*(Note: You will need the admin password you set back in {{ collections.posts | chapterLink('bash') | safe }}!)*

## Optional: The "KTailctl" GUI
If you prefer a visual interface over the terminal, you can install **[KTailctl](https://flathub.org/en/apps/org.fkoehler.KTailctl)**. This is a community-made app that lets you see your other devices and manage your connection right from the desktop.

1. Open **Discover**.
2. Search for **KTailctl** and click **Install**.
3. Now you have a Tailscale icon in your system tray that you can use to toggle the connection on and off!

## 🪄 Superpowered Remote Commands
Now that you have an SSH connection to your Deck (either via Tailscale or OpenSSH), you can perform "magic tricks" from your laptop while the Deck stays exactly where it is:

- **Switch to Desktop Mode Remotely**: Type `steamos-session-select plasma` and hit Enter. The Deck will instantly reboot directly into Desktop mode. (To force it back to Game Mode, use `steamos-session-select gamescope`).
- **Install Apps Invisibly**: Browsing Flathub on your phone? Type `flatpak install flathub com.discordapp.Discord` to quietly install an app directly to your Deck. It will be ready and waiting in your library.
- **The Ultimate PC Benchmark**: Type `btop` and hit Enter. You now have a live, real-time dashboard of exactly what your Deck's CPU and RAM are doing. Run a game, look at your laptop screen, and see what's eating your memory!
- **Reboot & Shutdown**: Need a quick restart from the couch? `sudo steamos-reboot` (or `sudo steamos-poweroff` to shut down) works instantly.

## Remote File Transfers (Taildrop)
Once Tailscale is on your phone and your Deck, you can use "Taildrop" to send files. 
- **On your phone/laptop**: Right-click a file, select 'Send with Tailscale', and pick your **Steam Deck**.
- **On your Deck**: The file will appear instantly in your `Downloads` folder. 

No more USB drives or cloud uploads!

---

Tailscale is the ultimate bridge between your main computer and your Deck. Now that we can control the Deck remotely, let's look at how to expand its capabilities with **Homebrew**!
