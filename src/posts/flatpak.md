---
layout: base.njk
title: " Flatpaks & Discover"
excerpt: "The App Store of the Steam Deck desktop."
tags: posts
---

#  Flatpaks & The Discover Store

If you’ve explored **Desktop Mode** (from {{ collections.posts | chapterLink('desktop') | safe }}), you might have noticed an app called **Discover**. This is your gateway to thousands of apps, and on SteamOS, almost everything you install through it is a **[Flatpak](https://flatpak.org/)**.

## What is a Flatpak?
Think of a **Flatpak** as a self-contained "shipping container" for an app. 
- It includes everything the app needs to run.
- It doesn't mess with the rest of your SteamOS files.
- It stays strictly inside its own container for security and stability.

This is exactly why Flatpaks are the preferred way to install software on the Steam Deck!

## Using the Discover Store
The **Discover Store** is like an App Store for your Steam Deck. You can find it in the bottom taskbar or the applications menu.

1. **Search**: Use the search bar in the top-left to find apps like **Discord**, **Spotify**, or even **Office** tools.
2. **Install**: Just click the big **Install** button. 
3. **Updates**: In the bottom-left of Discover, you'll see an "Update" section. Check this regularly to keep your apps fresh!

## Why some apps ask for "Permissions"
Since Flatpaks are in a container, they sometimes can't "see" your SD card or other parts of your system by default. 

**Pro-tip:** If you install an app (like a video player) and it can't find your files, you might need a tool called **Flatseal** (also available in Discover). Flatseal lets you check boxes to give specific apps permission to see your SD card or specific folders.

## My Favorite Flatpaks for the Steam Deck
If you aren't sure where to start in the Discover store, here are a few absolute essentials I highly recommend:

1. **[Yakuake](https://apps.kde.org/yakuake/)**: If you've ever played *Quake* or classic PC games, you know the iconic drop-down developer console. Yakuake brings exactly that to your Steam Deck desktop! Press `F12` (or bind it to a Deck button), and a terminal sleekly drops down from the top of your screen, no matter what app you're in. Press it again, and it instantly hides. It is the ultimate tool for feeling like a true Linux wizard.
2. **[Flatseal](https://github.com/tchx84/Flatseal)**: As mentioned above, this is the master control panel for fixing app permission issues when a Flatpak can't find your files.
3. **[ProtonUp-Qt](https://davidotek.github.io/protonup-qt/)**: An absolute must-have for gamers. It's the easiest way to install custom versions of Proton (like GE-Proton), which can magically fix stubborn Windows games that won't run on standard SteamOS.
4. **[Prism Launcher](https://prismlauncher.org/)**: The absolute best way to play *Minecraft: Java Edition* on the Steam Deck. It lets you easily manage multiple accounts, automatically download and manage game-changing mods right from the app, and significantly boosts performance.

## Managing Your Apps
To uninstall an app, just head back to Discover, find the app, and click **Remove**. It’s clean, simple, and won’t leave "junk" behind on your system.

---

Now that you know how to install apps from the Discover store, let's look at one of the best ways to play games from other stores and even older consoles.

{% next_chapter %}
