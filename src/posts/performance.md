---
layout: base.njk
title: "⚡ Performance Settings"
excerpt: "What the Quick Access performance settings do, and how to trade frame rate for battery life."
tags:
  - posts
  - gaming
  - intermediate
---

# Performance Settings

Every game on the Deck is a trade-off between how smooth it looks, how long the battery lasts and how loud the fan gets. SteamOS gives you a handful of settings to choose that trade-off yourself, per game. This chapter explains what each one does.

## Where the Settings Are

Press the **"..."** button, below the right trackpad, to open the **Quick Access menu**. The performance settings are under the battery icon.

> [!TIP]
> At the top of the performance menu, switch on **Use per-game profile** first. Then every setting below is saved for the game you're playing, so a demanding game and a light indie game can each keep their own limits.

### Frame Rate Limit

Capping the frame rate saves battery and makes motion more even, because the Deck stops chasing frames it can't hold steadily.

- **30 FPS**: the biggest battery saving, a good fit for demanding games.
- **40 FPS at 40 Hz**: popular on the original LCD Deck. Lower the **Refresh Rate** slider to 40 Hz and set the limit to 40 FPS. Every frame lines up exactly with the screen, so it feels much smoother than 30 for only a little more battery.
- **45 FPS at 90 Hz**: the same idea on the Steam Deck OLED, whose screen goes up to 90 Hz.
- **60 FPS**: for fast-paced games, or older games the Deck runs easily.

### TDP Limit

*TDP* (thermal design power) is how much power, in watts, the Deck's chip is allowed to draw.

- **A low limit (around 5 to 8 W)** suits lighter games like *Stardew Valley* or *Hollow Knight*. The fan stays quiet and the battery lasts longer.
- **No limit** (the setting switched off) gives demanding games like *Elden Ring* everything the chip has.

### Upscaling

If a game struggles at the Deck's full resolution, lower its resolution in the game's own settings (for example, to 960×600), then set **Scaling Filter** to **Sharp**. The game renders fewer pixels, which runs faster, and the Sharp filter (Steam calls it a "super-resolution sharpening filter") scales the picture back up to fill the screen with less blur.

Older guides call this setting **FSR**, after **[AMD FSR](https://www.amd.com/en/technologies/fidelityfx-super-resolution)**, the upscaler that earlier versions of SteamOS named here.

### The Performance Overlay

To see whether a change helped, move the **Performance Overlay Level** slider up. A small readout appears on top of your game: at the first level just the frame rate, and at higher levels battery drain in watts, CPU and GPU load, and temperatures. Watch the numbers while you adjust the other settings, then slide it back to off.

## Deck Verified Ratings

Every game in your Steam library carries one of Valve's **[Deck Verified](https://www.steamdeck.com/en/verified)** ratings:

| Rating | Valve's definition |
| :--- | :--- |
| **Verified** (green check) | "The game works great on Steam Deck, right out of the box." |
| **Playable** (yellow) | "The game may require some manual tweaking by the user to play." |
| **Unsupported** (grey) | "The game is currently not functional on Steam Deck." |
| **Unknown** | "We haven't checked this game for compatibility yet." |

For Unsupported and Unknown games, the community site **[ProtonDB](https://www.protondb.com/)** often has reports from people who got them running.

Some games still won't start, or crash, no matter how you set the sliders. The next chapter is a step-by-step toolkit for those.
