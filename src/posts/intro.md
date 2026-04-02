---
layout: base.njk
title: " The Basics"
excerpt: "What is SteamOS and why should noobs care?"
tags:
  - posts
  - steamos
  - beginner
---

#  SteamOS & The Steam Deck 101

Welcome to the family! SteamOS is the brains behind your Steam Deck, but it's not what most people are used to. 

## What IS SteamOS?
SteamOS is an operating system built by Valve, specifically designed to run on the Steam Deck and other handhelds. Unlike Windows, which is built for desktops, SteamOS is built on **Linux** (specifically Arch Linux, btw).

### Why use Linux?
Windows is heavy, and it's not great for compact devices. Linux allows Valve to strip away the fluff (like those annoying Windows updates) and focus purely on gaming.

## Game Mode vs. Desktop Mode
SteamOS has two split personalities:
1. **Game Mode**: This is the console-like interface you see when you turn on your Deck. It's built for navigation with buttons and joysticks.
2. **Desktop Mode**: Pressing a few buttons lets you switch into a full-blown desktop environment, similar to Windows. We'll be using **[KDE Plasma](https://kde.org/plasma-desktop/)**, the desktop environment that powers SteamOS.

## Is it 'noob' friendly?
Absolutely. SteamOS is designed to work right out of the box. Most games will 'just work' without you ever needing to touch a line of code.

### The 'Proton' Magic Layer
You might have heard that most games are made for Windows. How do they run on Linux? That's thanks to **[Proton](https://github.com/ValveSoftware/Proton)**, a layer developed by Valve that translates Windows code into something Linux can understand.

Stay tuned for {{ collections.posts | chapterLink('desktop') | safe }}, where we unlock the desktop and show you how to treat your Deck like a real PC!
