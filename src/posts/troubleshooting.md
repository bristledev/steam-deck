---
layout: base.njk
title: "🩺 Fixing Games That Won't Run"
excerpt: "A step-by-step toolkit for Windows games that won't launch, crash or run badly under Proton."
tags:
  - posts
  - gaming
  - troubleshooting
  - intermediate
---

# Fixing Games That Won't Run

You install a game, press **Play** and nothing happens. Or it crashes, or runs at 5 FPS. The five steps below cover the usual fixes. Work through them in order: each one takes a little more effort than the last.

## Step 1: Check ProtonDB

Before changing anything, find out whether someone has already solved the problem.

**[ProtonDB](https://www.protondb.com/)** is a community website where Linux players report how well each Windows game runs under Proton. Search for your game and you'll find:

- A **rating**: Platinum, Gold, Silver, Bronze or Borked.
- **Reports** describing the settings and fixes that worked for other players.
- **Launch options** you can copy and paste (see Step 4).

> [!TIP]
> **Look for Steam Deck reports.** ProtonDB covers all Linux PCs, but reports from other Deck owners were made on the same hardware as yours, so they're the most useful.

## Step 2: Try a Different Proton Version

Steam picks a version of Proton for each game, but a newer or older one sometimes works better.

1. In your **Library**, select the game.
2. Select the **gear icon**, then **Properties**.
3. Open the **Compatibility** page.
4. Under **Select compatibility tool**, choose a different Proton version.

Which version to try:

- **Proton Experimental** is Valve's newest, least-tested build. Try it first for recently released games.
- **Numbered releases**, like Proton 10.0, are stable versions. If Experimental doesn't help, try the newest numbered release, then step back one version at a time.

## Step 3: Install GE-Proton

If none of Valve's versions work, try **[GE-Proton](https://github.com/GloriousEggroll/proton-ge-custom)**, a community-maintained version of Proton. (GE stands for GloriousEggroll, its developer's username.) It adds patches that Valve's Proton doesn't have, including:

- extra media patches, which can fix cutscenes and videos that don't play
- automatic per-game fixes, including workarounds for some anti-cheat problems

### Installing GE-Proton with ProtonUp-Qt

1. In Desktop Mode, open **Discover**, search for **[ProtonUp-Qt](https://davidotek.github.io/protonup-qt/)** and install it.
2. Open ProtonUp-Qt and click **Add version**.
3. Select **GE-Proton**, pick the latest version and install it.
4. Restart Steam.
5. Back in the game's **Properties → Compatibility**, the new GE-Proton version now appears in the list.

> [!NOTE]
> **You can install several Proton versions side by side.** Each game uses whichever version you pick for it.

## Step 4: Add Launch Options

*Launch options* are extra settings Steam passes to a game when it starts. ProtonDB reports often include them.

To set them, select the game, then the **gear icon → Properties** and paste them into **Launch Options** on the **General** page.

These are some common ones:

| Launch option | What it does |
| :--- | :--- |
| `PROTON_USE_WINED3D=1 %command%` | Translates DirectX to OpenGL (WineD3D) instead of Vulkan (DXVK). Fixes some older games that crash with DXVK. |
| `PULSE_LATENCY_MSEC=60 %command%` | Can fix crackling or distorted audio. |
| `SteamDeck=0 %command%` | Tells the game it's *not* on a Steam Deck, for games whose Deck-specific settings cause problems. |

`%command%` stands for the game itself. To combine options, put them all before it:

```
PULSE_LATENCY_MSEC=60 SteamDeck=0 %command%
```

> [!NOTE]
> **Two options from older guides don't help on the Deck.** `DXVK_ASYNC=1` does nothing on Valve's Proton, because async shader compilation was never part of official DXVK. `gamescope -f -- %command%` is meant for desktop Linux; in Game Mode your game already runs inside Gamescope, so this just nests a second copy.

## Step 5: Use Protontricks

Some games need Windows components that Proton doesn't include, like Visual C++ runtimes, .NET or extra DirectX libraries. **[Protontricks](https://github.com/Matoking/protontricks)** installs these into a single game's prefix. Install it from Discover, then run it from Konsole:

```bash
# Install a Visual C++ runtime into Elden Ring's prefix
flatpak run com.github.Matoking.protontricks 1245620 vcrun2019
```

The number is the game's AppID, and {{ collections.posts | chapterLink('proton') | safe }} shows how to find yours. The last word is the component to install: `vcrun2019` here, or `d3dx9` for the DirectX 9 libraries that some older games need.

> [!WARNING]
> **Only use Protontricks when a ProtonDB report tells you to.** Installing the wrong components can make a game worse. Switching Proton versions is simpler, so try that first.

## The Short Version

| Step | What to do |
| :--- | :--- |
| 1 | Check **ProtonDB** for reports and fixes |
| 2 | Try **Proton Experimental**, then numbered versions |
| 3 | Install **GE-Proton** with ProtonUp-Qt |
| 4 | Copy **launch options** from ProtonDB |
| 5 | Use **Protontricks**, only if a report says to |

If a game still won't run after all five, it may not work on Linux yet; games with kernel-level anti-cheat are the most common example. The game's ProtonDB page will usually confirm it.

Once your games are running, you might want to add features to Game Mode itself. That's what Decky Loader does, and it's the subject of the next chapter.
