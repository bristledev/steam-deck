---
layout: base.njk
title: " AppImages"
excerpt: "Portable apps that just work."
tags: posts
---

#  AppImages – The "Portable" Apps of Linux

If you’re coming from Windows or macOS, you’re used to downloading a `.exe` or `.dmg` file and just double-clicking it. On Linux, we have something very similar called an **[AppImage](https://appimage.org/)**.

## What is an AppImage?
An **AppImage** is a single file that contains everything an app needs to run. 
- It’s like a "portable" app on Windows. 
- It doesn't need to be "installed" into your system.
- You can keep it anywhere (like on your SD card or in your Downloads folder).

## How to use an AppImage
This is the part that trips up most beginners. Because Linux is secure, you can't just run any file you download. You have to tell the computer that it’s "allowed" to run.

1. **Download**: Download your `.AppImage` file (like **[Discord](https://discord.com/)**, **[OBS](https://obsproject.com/)**, or **[Prism Launcher](https://prismlauncher.org/)**).
2. **Right-Click**: Right-click the file and select **Properties**.
3. **Permissions**: Go to the **Permissions** tab.
4. **Make Executable**: Check the box that says **"Is executable"**.
5. **Run**: Now you can just double-click the file to start the app!

## Why use them on a Steam Deck?
AppImages are fantastic because they:
- **Don't touch the core OS**: Just like Flatpaks, they keep your system clean.
- **Can be grouped**: You can make a folder called `Applications` in your home directory and keep all your AppImages there.
- **Work anywhere**: You can even put them on a USB drive and run them on another Linux PC!

## Pro-Tip: Adding to Steam
Just like with Flatpaks, you can add an AppImage to your Steam library so you can launch it in **Game Mode**. 

1. Go to Steam in **Desktop Mode**.
2. Click **Games** -> **Add a Non-Steam Game...**
3. Click **Browse** and navigate to where you saved your AppImage.
4. Select it and click **Add Selected Programs**.

---

AppImages bring that familiar "download and run" feeling to Linux. Now that you know the three main ways to get apps, let's optimize how your Deck performs in {{ collections.posts | chapterLink('performance') | safe }}!
