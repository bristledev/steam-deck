---
layout: base.njk
title: "🔑 WireGuard VPN"
excerpt: "Connect your Deck to your home network or a VPN provider with WireGuard, which SteamOS already includes."
tags:
  - posts
  - networking
  - intermediate
---

# WireGuard VPN

{{ collections.posts | chapterLink('tailscale') | safe }} connects your devices through Tailscale's own service. Sometimes the other end is already decided for you, though: your router has a VPN server built in, or your VPN provider hands you a config file. Most of these use **[WireGuard](https://www.wireguard.com/)**, and SteamOS can connect to it without installing anything.

> [!NOTE]
> Everything in this chapter was checked on a Steam Deck running **SteamOS 3.9.2** (Preview update channel).

## What Is WireGuard?

WireGuard is a VPN protocol: a way for two devices to build an encrypted tunnel across the internet. Once the tunnel is up, your Deck can reach the network at the other end as if it were plugged in there.

Each device in a WireGuard tunnel has a pair of keys. The *private key* stays on the device and proves who it is. The *public key* is shared with the other end, which only accepts devices whose public keys it knows.

Tailscale uses WireGuard underneath. The difference is who does the setup: Tailscale creates the keys, finds a route between your devices and runs the account system for you. With plain WireGuard, the other end is a server you or your provider runs, and it must be reachable from the internet.

## What SteamOS Already Includes

SteamOS ships every piece WireGuard needs. You can check each one in Konsole:

```bash
pacman -Q wireguard-tools
```

That's the package with the `wg` and `wg-quick` commands. The WireGuard driver itself is part of Valve's Linux kernel, and NetworkManager, the service that manages your Wi-Fi, can run WireGuard tunnels as well.

SteamOS also keeps WireGuard settings across updates. Look for them in Valve's keep-list from {{ collections.posts | chapterLink('steamos-updates') | safe }} (later in this series):

```bash
grep -A1 WireGuard /usr/lib/rauc/atomic-update-keep.conf
```

**What did that just do?** It printed Valve's comment, `## WireGuard configs, including private keys`, and the line under it, `/etc/wireguard/*.conf`. Config files in that folder survive every SteamOS update.

## Getting a Config File

You need a config file from whoever runs the other end of the tunnel:

- **Your router or firewall.** Some, such as FRITZ!Box, GL.iNet and OPNsense, have a WireGuard server built in. Its settings page lets you add a "peer" or "client" and download a `.conf` file for it.
- **A VPN provider.** Providers such as Mullvad and Proton VPN offer WireGuard config downloads in their account pages.
- **Your own server**, such as a home server or a cheap cloud machine.

A WireGuard config is a short text file. It looks something like this:

```ini
[Interface]
PrivateKey = <your Deck's private key>
Address = 10.8.0.2/32
DNS = 10.8.0.1

[Peer]
PublicKey = <the server's public key>
Endpoint = vpn.example.com:51820
AllowedIPs = 10.8.0.0/24, 192.168.1.0/24
PersistentKeepalive = 25
```

**What these lines mean:**

- `[Interface]` describes your Deck: its private key, its address inside the tunnel and, optionally, the DNS server to use while connected.
- `[Peer]` describes the other end: its public key and its address on the internet (`Endpoint`).
- `AllowedIPs` decides which traffic goes through the tunnel. Listing your home network's addresses, like `192.168.1.0/24`, sends only that traffic through it (a *split tunnel*). `0.0.0.0/0, ::/0` sends *everything* through it (a *full tunnel*).
- `PersistentKeepalive = 25` sends a small message every 25 seconds, so routers along the way don't close the connection while it's idle.

A full tunnel sends your games through the VPN too: every download, voice chat and online match takes the longer path through the server, which adds latency. If you only want to reach your home network, ask for a split tunnel.

> [!CAUTION]
> **The `PrivateKey` line is a password.** Anyone with this file can join the tunnel as your Deck. Don't paste it into forums or chats, and delete the downloaded copy once it's imported.

## Importing the Config in Desktop Mode

NetworkManager can import a WireGuard config directly, and the connection then behaves like any other network on your Deck.

1. **Rename the file** to a short name with no spaces, ending in `.conf`, such as `wg-home.conf`. NetworkManager uses the name for the connection and its network interface, so it must be 15 characters or fewer before the `.conf`.
2. Open **System Settings → Wi-Fi & Networking**.
3. Click the **+** button below the list of connections.
4. Choose **Import VPN connection...** and select your `wg-home.conf`.
5. The new connection appears in the list, named `wg-home`. Select it to see its settings: your keys and addresses are on the **WireGuard Interface** tab, and **Peers** opens the other end's settings.

**What did that just do?** NetworkManager read the file and created its own connection from it, stored in `/etc/NetworkManager/system-connections/` along with your Wi-Fi networks. That folder is on Valve's keep-list too, so the connection survives updates. Only `root` can read the files there, which is why Plasma describes the private key as stored "for all users (not encrypted)".

By default, an imported WireGuard connection connects automatically, now and at every startup. If you only want the tunnel some of the time, open its **General** tab and switch off **Connect automatically with priority**. You can then turn it on and off from the network icon in the system tray.

> [!TIP]
> **Prefer the terminal?** This command does the same import:
> ```bash
> nmcli connection import type wireguard file ~/Downloads/wg-home.conf
> ```

## Checking the Tunnel

These commands show whether the tunnel is up. Only the last one needs your admin password:

```bash
nmcli connection show --active
ip -brief addr show wg-home
sudo wg show
```

**What did that just do?** `nmcli` listed your active connections, which should include `wg-home`. `ip` showed the tunnel's network interface and your Deck's address inside it. `wg show` printed the WireGuard details: look for `latest handshake`. While the tunnel is in use, WireGuard repeats the handshake every two minutes, so a recent one means the two ends are talking. If there's no handshake line at all, the server isn't answering, so check its address and port.

## WireGuard in Game Mode

Game Mode's settings have no VPN section, but they don't need one. NetworkManager runs underneath both modes, so a tunnel that's connected keeps running when you switch to Game Mode, and one set to connect automatically comes up there after a restart.

To switch it on or off without Desktop Mode, use SSH from {{ collections.posts | chapterLink('ssh') | safe }}:

```bash
sudo nmcli connection up wg-home
sudo nmcli connection down wg-home
```

Over SSH, NetworkManager asks for your admin password, which is why these need `sudo`. {{ collections.posts | chapterLink('steamos-sessions') | safe }} explains the rule behind that.

## The Terminal Way: wg-quick

`wg-quick` is WireGuard's own command-line tool. It reads configs from `/etc/wireguard` and doesn't involve NetworkManager. Use it *instead of* the import above, not alongside it: both try to create an interface with the same name.

> [!WARNING]
> **Remove the `DNS` line first.** `wg-quick` hands DNS settings to a program called `resolvconf`, which SteamOS doesn't include. With a `DNS` line in the file, `wg-quick up` stops with an error. If you need the tunnel's DNS server, use the NetworkManager import instead.

Copy the config into place, then bring the tunnel up:

```bash
sudo cp ~/Downloads/wg-home.conf /etc/wireguard/
sudo chmod 600 /etc/wireguard/wg-home.conf
sudo wg-quick up wg-home
```

**What did that just do?** `cp` copied your config into `/etc/wireguard`, the folder on Valve's keep-list. `chmod 600` made it readable only by `root`, since it holds your private key. `wg-quick up` created the `wg-home` interface and connected. `sudo wg-quick down wg-home` disconnects.

To connect at every startup, enable `wg-quick`'s service for your config:

```bash
sudo systemctl enable --now wg-quick@wg-home
```

The config is on the keep-list and enabled services are too, so the tunnel comes back after every SteamOS update. `sudo systemctl disable --now wg-quick@wg-home` turns it off again.

The next phase leaves the network behind and looks at how SteamOS works underneath, starting with a map of everything on your drive.
