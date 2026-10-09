---
layout: base.njk
title: "🏁 What Is SteamOS?"
excerpt: "What SteamOS is, how its two modes work, and how Windows games run on it."
tags:
  - posts
  - steamos
  - beginner
---

# What Is SteamOS?

Welcome! SteamOS is the operating system on your Steam Deck, and it works differently from what most people are used to. This chapter gives you the big picture. The rest of the series fills in the details, all the way down to how the system updates itself.

## A Linux System Built for Games

SteamOS is made by Valve. It runs on the Steam Deck and a few other devices, and it's built on **Linux** (specifically Arch Linux, btw).

### Why Linux?

Linux is open source, so Valve can change any part of it. That lets Valve build a system around what a handheld needs: boot straight into your games, update itself in the background, and keep the desktop out of your way until you ask for it.

## Game Mode and Desktop Mode

SteamOS has two modes:

1. **Game Mode** is the console-style interface you see when you turn on your Deck. It's built for buttons and joysticks.
2. **Desktop Mode** is a full desktop, a lot like Windows, called **[KDE Plasma](https://kde.org/plasma-desktop/)**. You switch to it from the **Power** menu.

## Do You Need to Know Linux?

No. SteamOS is designed to work out of the box, and most games run without you ever opening a terminal. This series is for when you want to understand what's going on underneath, or do more than the defaults allow.

### How Windows Games Run: Proton

Most PC games are made for Windows. They run on SteamOS thanks to **[Proton](https://github.com/ValveSoftware/Proton)**, a compatibility layer from Valve that translates what a Windows game asks for into something Linux understands. Later in this phase, you'll see where Proton keeps each game's files.

First, let's switch to Desktop Mode and see what your Deck looks like as a PC.
