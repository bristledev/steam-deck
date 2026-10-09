---
layout: base.njk
title: "📦 Flatpaks & Discover"
excerpt: "How to install, update and remove apps with Discover, and what a Flatpak actually is."
tags:
  - posts
  - apps
  - package-management
  - beginner
---

# Flatpaks & Discover

In {{ collections.posts | chapterLink('desktop') | safe }}, you met **Discover**, SteamOS's app store. Almost everything you install through it on SteamOS is a **[Flatpak](https://flatpak.org/)**, and knowing what that means explains why some apps behave the way they do.

## What Is a Flatpak?

A Flatpak is an app packaged together with everything it needs to run, like a shipping container for software.

- It brings its own libraries, so it doesn't depend on what SteamOS has installed.
- It installs outside the read-only system, so it can't change SteamOS.
- It runs in a *sandbox*: by default, it can only reach the files and devices it has been given permission to use.

That combination is why Flatpaks are the recommended way to install desktop apps on the Deck.

## Using Discover

You'll find Discover in the taskbar and in the Application Launcher.

1. **Search** with the search bar in the top-left, for apps like **Discord**, **Spotify** or **LibreOffice**.
2. **Install** with the **Install** button on the app's page.
3. **Update** from the **Updates** section in the bottom-left. Discover doesn't update apps on its own, so check it now and then.

Most of Discover's apps come from **[Flathub](https://flathub.org/)**, the main Flatpak app store. You can browse it in a web browser too, and you'll see its name again later in this series.

## Why Some Apps Can't See Your Files

Because Flatpaks are sandboxed, some can't see your SD card or other folders by default. If an app, like a video player, can't find your files, install **Flatseal** from Discover. It lists each app's permissions, and you can switch on access to your SD card or a specific folder with a checkbox.

## Apps Worth Installing

If you aren't sure where to start, these are popular with Deck owners:

1. **[Flatseal](https://github.com/tchx84/Flatseal)**: manages app permissions, as described above.
2. **[ProtonUp-Qt](https://davidotek.github.io/protonup-qt/)**: installs community versions of Proton, like GE-Proton, which can get some stubborn Windows games running. You'll use it in {{ collections.posts | chapterLink('troubleshooting') | safe }}.
3. **[Prism Launcher](https://prismlauncher.org/)**: a launcher for *Minecraft: Java Edition* that manages multiple accounts and installs mods for you, including performance mods like Sodium.

## Removing Apps

To uninstall an app, open its page in Discover and click **Remove**. The app is gone, and SteamOS itself was never touched.

Discover does keep the app's settings and saved data (in `~/.var/app`), in case you reinstall it later. To delete those too, open the app's page in Discover again and click **Delete settings and user data**.

Discover covers most apps, but not every game store or emulator. Next, we'll look at the tools for playing games from Epic, GOG and older consoles.
