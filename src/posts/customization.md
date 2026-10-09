---
layout: base.njk
title: "🔌 Customization with Decky Loader"
excerpt: "Add plugins to Game Mode with Decky Loader, and understand exactly what it changes on your Deck."
tags:
  - posts
  - gaming
  - customization
  - intermediate
---

# Customization with Decky Loader

Game Mode isn't built to be modded: you can't add your own buttons, themes or tools to it. The community's answer is **[Decky Loader](https://decky.xyz/)**, a plugin system for Game Mode. It's widely used; its top plugins each have over a million downloads.

It's also unofficial, and it works by reaching deep into Steam itself. This chapter covers both sides: how to install and use it, and exactly what it changes, so you can decide whether it's right for you.

> [!NOTE]
> The technical details here were checked against the source code of **Decky Loader v3.2.10** and its official installer, as of October 2026.

---

## What Is Decky Loader?

Decky works like a **browser extension**. A website is built by its owner, but an extension can add buttons and features to it on your computer.

Steam's Game Mode interface is built the same way as a website. Steam draws it with a built-in web browser engine, the `steamwebhelper` process. Decky Loader is an extension for *that*: it adds its own code to Steam's interface, which gives you a new **plugin menu** inside the Quick Access (**...**) menu.

Plugins can then add almost anything: custom artwork, themes, game-length estimates, quick toggles and more.

---

## Before You Install: The Trade-Offs

Decky works by doing things SteamOS's read-only design normally prevents. That doesn't make it dangerous by default, but you should know what you're agreeing to:

- **It's unofficial.** Valve doesn't make or support it. If something breaks, Decky's community is who you ask.
- **Updates can break it.** Decky's own README admits that "Sometimes Decky will disappear on SteamOS updates." Steam updates can break individual plugins too, because they hook into Steam's interface, which Valve changes freely. The fix is usually to re-run the installer, or wait for the plugin's author to catch up.
- **It runs with full admin rights.** Decky's background service runs as `root`, the all-powerful system account. It needs that to do things like attach a debugger to Steam's interface process when Steam's debugging connection gets stuck.
- **It turns on a developer feature.** Decky connects to Steam's interface through Steam's built-in debugger, which is normally switched off.
- **Plugins are other people's code.** Most plugins run as your normal `deck` user, but a plugin can ask to run as `root`. Installing one means trusting its author.

> [!TIP]
> If you only want one feature, look through Steam's own Quick Access menu and Settings first; it may already be built in. A built-in option is updated together with Steam, so it can't fall out of step with Steam the way a plugin can.

---

## Installing Decky Loader

You'll need to set this up in Desktop Mode. A mouse and keyboard make it easier, but the trackpad and **Steam** + **X** for the on-screen keyboard work fine.

1. Switch to **Desktop Mode** (from {{ collections.posts | chapterLink('desktop') | safe }}).
2. Open **[decky.xyz](https://decky.xyz/)** in a web browser and download the installer file, `decky_installer.desktop`.
   - If Firefox saves it as `decky_installer.desktop.download`, rename it to remove the `.download` ending.
3. Drag the file onto your desktop and **double-click** it.
4. When asked, type your admin password. If you haven't set one yet, the installer offers to set a temporary password (`Decky!`) and remove it again when it finishes.
5. Choose **Latest Release**. (If you're on SteamOS's Beta or Preview update channel, the installer suggests the pre-release instead.)
6. Double-click **Return to Gaming Mode** on your desktop.

Back in Game Mode, press the **"..."** button. You'll see a new **plug** icon: that's Decky's menu.

---

## Plugins Worth Trying

Open Decky's menu and select the **store** icon to browse plugins. These are some of the most popular, and several pair with earlier chapters:

| Plugin | What it does |
| :--- | :--- |
| **SteamGridDB** | Replace game artwork with community-made images, including for non-Steam games |
| **ProtonDB Badges** | Shows each game's ProtonDB rating on its page (see {{ collections.posts | chapterLink('troubleshooting') | safe }}) |
| **Storage Cleaner** | Finds and clears shader cache and Proton data (see {{ collections.posts | chapterLink('storage') | safe }}) |
| **HLTB for Deck** | Shows how long a game takes to beat, from How Long To Beat |
| **CSS Loader** | Applies community themes from **[DeckThemes](https://deckthemes.com/)** to Steam's interface |
| **Bluetooth** | Quickly connect to Bluetooth devices you've already paired |

> [!CAUTION]
> **Pay attention to plugins that need root.** The store marks many of them with a `root` tag. They aren't bad, but they can change anything on your system, so install them only from authors you trust.

---

## Under the Hood

You don't need any of this to *use* Decky. But if you're curious, or once you've learned the terminal later in this series, here's exactly what the installer changes:

| What | Where |
| :--- | :--- |
| The Decky program | `~/homebrew/services/PluginLoader` |
| Your plugins | `~/homebrew/plugins/` |
| The background service | `/etc/systemd/system/plugin_loader.service` (runs as `root`) |
| The switch that turns on Steam's debugger | `~/.steam/steam/.cef-enable-remote-debugging` |

> [!NOTE]
> Decky's `~/homebrew` folder has **nothing to do** with the Homebrew package manager you'll meet later. It's just an unlucky name clash, and the two don't conflict: Homebrew installs into a different folder, `/home/linuxbrew/.linuxbrew`, so you can use both on the same Deck.

Once you know the terminal, these commands check on Decky:

```bash
systemctl status plugin_loader
```

This shows whether Decky's service is running. To see its recent log messages, run `journalctl -u plugin_loader -n 50`.

And this lists which installed plugins ask to run as root:

```bash
jq -r 'select((.flags // []) | index("root")) | .name' ~/homebrew/plugins/*/plugin.json
```

**What did that just do?** Every plugin includes a `plugin.json` file describing itself. `jq` (a JSON reader that comes with SteamOS) reads each one and prints the names of plugins whose `flags` include `root`. These flags, not the store's tags, are what Decky actually checks.

Why does Decky usually survive SteamOS updates? Its files live in your home folder, and its service file sits in `/etc/systemd/system`, which SteamOS deliberately keeps across updates. You'll see exactly how that works in {{ collections.posts | chapterLink('steamos-extending') | safe }}.

> [!TIP]
> Decky talks to Steam's debugger on port **8080**. If you ever run your own server software on your Deck, keep it off port 8080, or Steam's debugger can't use it and Decky won't load.

---

## Uninstalling

To remove Decky:

1. Switch to **Desktop Mode**.
2. Run the same `decky_installer.desktop` file again.
3. Choose one of the two removal options:
   - **uninstall decky loader** removes Decky but keeps your plugins and settings, in case you reinstall later.
   - **wipe decky loader** removes Decky *and* deletes the whole `~/homebrew` folder.

Either way, the installer stops the service, deletes it, and turns Steam's debugger back off.

---

This chapter mentioned the terminal a few times. The next phase teaches it from scratch, starting with where to find one.
