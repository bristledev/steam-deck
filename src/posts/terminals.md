---
layout: base.njk
title: "💻 Finding the Terminal"
excerpt: "Every way to open a terminal on your Steam Deck, and when to use each one."
tags:
  - posts
  - terminal
  - beginner
---

# Finding the Terminal

Before learning *what* to type, it helps to know *where* to type it. SteamOS has several ways to open a terminal, each suited to a different situation. You don't need to memorize them; knowing they exist is enough for when you need one.

## Konsole, the Main Terminal

**[Konsole](https://apps.kde.org/konsole/)** is SteamOS's terminal app, and it's the one you'll use most. When a guide tells you to "open a terminal", this is what it means.

To open it:

1. Switch to **Desktop Mode**.
2. Click the **Application Launcher** in the bottom-left corner.
3. Search for **Konsole**, or find it under **System**.

Konsole has tabs, split views and settings for fonts and colors.

> [!TIP]
> **Pin it to your taskbar.** Right-click Konsole in the Application Launcher and choose **Pin to Task Manager**, so it's always one click away.

## Dolphin's Terminal Panel

The Dolphin file manager has a terminal built in. Press **F4** inside Dolphin, and a terminal opens at the bottom of the window.

The panel follows whatever folder you're browsing: open `Downloads` in Dolphin, and the terminal moves to `Downloads` too. That makes it handy for running a command on files you've just found, without typing the path. Press **F4** again to hide it.

## Kate's Terminal Panel

**[Kate](https://apps.kde.org/kate/)** is KDE's text editor, and it comes with SteamOS. Press **F4** in Kate (**Show Terminal Panel**) to open a terminal below the file you're editing.

This is useful when you're changing a settings file and want to test it straight away. For example, you can edit your `~/.bashrc` at the top and run `source ~/.bashrc` in the terminal below.

## Yakuake, the Drop-Down Terminal

**[Yakuake](https://apps.kde.org/yakuake/)** is a terminal that slides down from the top of the screen when you press a key, like the developer console in *Quake* and many PC games.

Install it from **Discover**. Once it's running, press **F12** in Desktop Mode to show it, and **F12** again to hide it.

> [!TIP]
> Yakuake runs in the background after launch, so **F12** only works once you've opened it. To have it ready every time you enter Desktop Mode, add it in **System Settings → Autostart**.

## The TTY, for Emergencies

A *TTY* (short for teletypewriter) is a text-only terminal that runs outside the graphical desktop entirely. If Desktop Mode freezes, crashes or won't load, the TTY still works.

To open it, press **Ctrl+Alt+F4** on a physical keyboard (USB or Bluetooth). The on-screen keyboard can't help you here, so it's worth keeping a cheap keyboard around.

You'll see a black screen with a login prompt. Type `deck` as the username, then your password. You're now in a text-only session on tty4.

To get back, press **Ctrl+Alt+F1**. SteamOS runs its graphical session, Game Mode or Desktop Mode, on tty1.

> [!NOTE]
> **Why F4, when most Linux guides say F2?** SteamOS starts the kernel with the setting `fbcon=vc:4-6` (you can see it with `cat /proc/cmdline`), so text terminals only appear on screen on tty4, tty5 and tty6. **Ctrl+Alt+F2** does switch to tty2, but nothing is drawn there: the screen keeps showing the last picture, and the Deck looks frozen. If that happens, press **Ctrl+Alt+F1** to get back.

The TTY is useful when:

- Desktop Mode has frozen and won't respond.
- A program is stuck and you need to stop it.
- You changed a display setting and can't see the screen properly.
- SSH isn't set up yet and there's no other way in.

> [!WARNING]
> **You need a password to log in.** The TTY asks for your `deck` user's password, and the Deck doesn't have one until you set it. You'll do that in the next chapter.

## KRunner, the Quick Launcher

**KRunner** isn't a terminal, but it's a fast way to run things. Press **Alt+Space** or **Alt+F2** anywhere in Desktop Mode, and a search bar appears at the top of the screen. You can:

- launch an app by typing its name, such as `Konsole`, and pressing **Enter**
- do quick math, such as `=1920/16`
- open files and folders
- run a single command

## Quick Reference

| Terminal | Shortcut | Best for |
| :--- | :--- | :--- |
| **Konsole** | Application Launcher | Everyday terminal use |
| **Dolphin panel** | **F4** in Dolphin | Commands in the folder you're browsing |
| **Kate panel** | **F4** in Kate | Testing while editing settings files |
| **Yakuake** | **F12** (after installing) | A terminal that's always one key away |
| **TTY** | **Ctrl+Alt+F4** | Emergencies when the desktop is broken |
| **KRunner** | **Alt+Space** | Launching apps and quick commands |

You know where to type. The next chapter covers what to type, starting with the first command every Deck owner should run.
