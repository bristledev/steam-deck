---
layout: base.njk
title: "🎯 AppImages"
excerpt: "How to run apps that come as a single downloadable file, and the trade-offs compared to Flatpaks."
tags:
  - posts
  - apps
  - package-management
  - intermediate
---

# AppImages

On Windows, you download a `.exe` and double-click it. Linux has something similar: the **[AppImage](https://appimage.org/)**. Some apps that aren't in Discover, or whose newest version isn't there yet, are offered this way on their own websites.

## What Is an AppImage?

An AppImage is a single file that contains an app and everything it needs to run, much like a portable app on Windows.

- There's nothing to install. The file *is* the app.
- You can keep it anywhere, such as your `Downloads` folder or your SD card.
- Deleting the file removes the app.

## Running an AppImage

Linux won't run a downloaded file until you mark it as a program. That's a safety measure, and it's the step that trips up most people.

1. **Download** the `.AppImage` file from the app's official site. **[Kdenlive](https://kdenlive.org/)**, **[Krita](https://krita.org/)** and **[balenaEtcher](https://etcher.balena.io/)** all offer one.
2. In Dolphin, **right-click** the file and select **Properties**.
3. Open the **Permissions** tab.
4. Tick **Allow executing file as program**, then click **OK**.
5. **Double-click** the file to start the app.

## Pros and Cons

AppImages have real advantages:

- **They don't touch the system.** Like Flatpaks, they live in your home folder and survive SteamOS updates.
- **They're easy to organize.** Many people keep them all in one folder, such as `~/Applications`.
- **They're portable.** The same file runs on most other Linux PCs.

They also have two important downsides.

> [!WARNING]
> **AppImages are not sandboxed.** A Flatpak runs inside a container with limited permissions, but an AppImage runs with full access to everything your `deck` user can touch, including all your files. Only run AppImages from the app's official website or GitHub page.

AppImages also don't update through Discover. Some include their own updater; for the rest, download the new version and replace the old file.

## Adding an AppImage to Steam

To launch an AppImage from Game Mode, add it to your Steam library:

1. Open Steam in **Desktop Mode**.
2. Go to **Games → Add a Non-Steam Game to My Library...**
3. Click **Browse** and find your AppImage.
4. Select it, then click **Add Selected Programs**.

That covers the main ways to get apps onto your Deck. Next, we'll look at the settings that control how well your games run, and how long your battery lasts.
