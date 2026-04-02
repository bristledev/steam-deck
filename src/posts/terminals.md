---
layout: base.njk
title: " Finding the Terminal"
excerpt: "Every way to open a terminal on your Steam Deck — and when to use each one."
tags:
  - posts
  - terminal
  - beginner
---

# Finding the Terminal 🖥️

Before we learn *what* to type, let's talk about *where* to type it. SteamOS has several ways to access a terminal, each suited for different situations. You don't need to memorize all of them — just knowing they exist will save you when you need one.

---

## 🎯 Konsole (The Main Terminal)

**[Konsole](https://apps.kde.org/konsole/)** is SteamOS's default terminal app. It's the one you'll use 99% of the time.

**How to open it:**
1. Switch to **Desktop Mode**.
2. Click the **Application Launcher** (bottom-left corner).
3. Search for **Konsole**, or find it under **System**.

Konsole is a full-featured terminal with tabs, split views, profiles, and customizable fonts and colors. When guides tell you to "open a terminal," this is what they mean.

> [!TIP]
> **Pin it to your taskbar!** Right-click Konsole in the app menu and choose **Add to Panel** or **Add to Favorites**. You'll be opening it constantly.

---

## 📂 Dolphin's Built-In Terminal (F4)

The Dolphin file manager has a hidden terminal panel built right into it.

**How to open it:**
Press **F4** while inside Dolphin.

A terminal slides in at the bottom of the window, and it automatically follows whatever folder you're browsing. Navigate to `Downloads` in Dolphin, and the terminal's working directory changes to `Downloads` too.

This is incredibly useful for quick file operations — you can visually browse to a folder and then run a command right there, without needing to `cd` to the right path first.

Press **F4** again to hide it.

---

## 📝 Kate's Built-In Terminal

**[Kate](https://apps.kde.org/kate/)** is KDE's text editor, and it comes pre-installed on SteamOS. It also has an embedded terminal panel.

**How to open it:**
Open Kate, then press **F4** (or go to **View → Terminal**).

This is handy when you're editing a config file and need to test a command without switching windows. Edit your `~/.bashrc` in the top half, run `source ~/.bashrc` in the terminal at the bottom — all in one place.

---

## ⬇️ Yakuake (The Drop-Down Terminal)

**[Yakuake](https://apps.kde.org/yakuake/)** is a Quake-style drop-down terminal that slides in from the top of your screen with a single keypress. If you've ever played *Quake* or classic Source engine games, you know the developer console that drops down when you hit tilde (`~`). Yakuake is exactly that, but for your entire desktop.

**How to install it:**
Open **Discover** and search for **Yakuake**.

**How to use it:**
Press **F12** from anywhere in Desktop Mode. The terminal drops down from the top of the screen. Press **F12** again and it vanishes. No window management, no alt-tabbing — it's just *there* whenever you need it.

> [!TIP]
> Yakuake runs in the background after launch. To make it start automatically every time you boot into Desktop Mode, open Yakuake's settings and check **Open on login**, or add it to KDE's autostart via **System Settings → Autostart**.

---

## 🚨 The TTY (Emergency Terminal)

This is the one most people don't know about, and the one that saves you when everything else breaks.

A **TTY** (TeleTYpewriter) is a text-only terminal that runs *outside* of Desktop Mode entirely. It doesn't need KDE Plasma, Dolphin, or any graphical interface to work. If Desktop Mode freezes, crashes, or won't load — the TTY still works.

**How to access it:**
Press **Ctrl+Alt+F2**.

You'll see a plain black screen with a login prompt. Type `deck` as the username, then enter your password. You're now in a raw terminal session on tty2 with full access to your system.

**To get back to Desktop Mode:**
Press **Ctrl+Alt+F1** (SteamOS typically runs the graphical session on tty1).

### When You'd Use This
- Desktop Mode froze and won't respond to anything
- You need to kill a stuck process (`sudo kill -9 [PID]`)
- You accidentally broke your display settings and can't see anything
- SSH isn't set up yet and you have no other way in

> [!IMPORTANT]
> **Remember your password!** The TTY requires your `deck` user password. If you haven't set one yet (we'll do that in the next chapter), do it soon — it's your lifeline when things go sideways.

---

## ⚡ KRunner (The Quick Launcher)

**KRunner** isn't a full terminal, but it's worth knowing about. It's KDE's universal search and command bar.

**How to open it:**
Press **Alt+F2** (or **Alt+Space**) anywhere in Desktop Mode.

A slim search bar appears at the top of your screen. You can:
- Launch apps by name (type `Konsole` and hit Enter)
- Do quick math (`= 1920/16` returns `120`)
- Open files and folders
- Run simple shell commands

It's not a replacement for Konsole, but it's the fastest way to launch something without reaching for the app menu.

---

## 🗺️ Quick Reference

| Terminal | Shortcut | Best for |
| :--- | :--- | :--- |
| **Konsole** | App menu | Everyday terminal use |
| **Dolphin panel** | `F4` in Dolphin | Quick commands in a specific folder |
| **Kate panel** | `F4` in Kate | Testing while editing config files |
| **Yakuake** | `F12` (after install) | Fast access without window switching |
| **TTY** | `Ctrl+Alt+F2` | Emergency access when Desktop Mode is broken |
| **KRunner** | `Alt+F2` | Quick app launches and simple commands |

---

Now that you know where to find a terminal, let's learn what to type into it.

{% next_chapter %}
