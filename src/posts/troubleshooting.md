---
layout: base.njk
title: " Fixing Games (Proton Troubleshooting)"
excerpt: "What to do when a game won't launch or runs badly."
tags:
  - posts
  - gaming
  - troubleshooting
  - intermediate
---

#  Fixing Games (Proton Troubleshooting) 🔧

You found a game you're excited about, you hit **Install**, you click **Play**... and nothing happens. Or it crashes. Or it runs at 5 FPS.

Don't panic — this is fixable 90% of the time. Let's walk through the troubleshooting toolkit that every Steam Deck owner should know.

---

## 🟢 Step 1: Check ProtonDB

Before you start tinkering, check if someone else has already solved your problem.

**[ProtonDB](https://www.protondb.com/)** is a community-run website where thousands of Linux gamers report how well each game works under Proton. Search for your game and you'll find:
- A **rating** (Platinum, Gold, Silver, Bronze, Borked)
- **User reports** with exact settings and fixes that worked for them
- Specific **launch options** to copy and paste

> [!TIP]
> **Filter by "Steam Deck" reports.** ProtonDB covers all Linux devices, but you can filter reports to see only Steam Deck results. These are the most relevant to you since the hardware and OS are identical.

---

## 🔀 Step 2: Switch Your Proton Version

SteamOS ships with Valve's official Proton, but it's not always the best version for every game. Sometimes a newer (or older) version does the trick.

### How to Change the Proton Version
1. In your **Library**, select the game.
2. Tap the **gear icon** → **Properties**.
3. Go to the **Compatibility** tab.
4. Check **"Force the use of a specific Steam Play compatibility tool."**
5. Select a different Proton version from the dropdown.

**Which version to try?**
- **Proton Experimental** — Valve's bleeding-edge version. Try this first for newer games.
- **Proton 9.x / 8.x** — Stable releases. If Experimental is crashing, try stepping back to a numbered version.

---

## ⚡ Step 3: Install GE-Proton (The Community Fix)

If none of Valve's official Proton versions work, there's a community-maintained fork called **[GE-Proton](https://github.com/GloriousEggroll/proton-ge-custom)** (short for Glorious Eggroll — yes, really). It includes extra patches, codec support, and fixes that Valve hasn't merged yet.

GE-Proton is often the magic bullet for games that have:
- Missing cutscenes or videos (codec issues)
- Launcher/installer windows that freeze
- Anti-cheat errors on single-player games

### Installing GE-Proton with ProtonUp-Qt
1. Open **Discover** in Desktop Mode.
2. Search for **[ProtonUp-Qt](https://davidotek.github.io/protonup-qt/)** and install it.
3. Open ProtonUp-Qt and click **Add version**.
4. Select **GE-Proton** from the dropdown, pick the latest version, and install it.
5. Restart Steam.
6. Now go back to your game's **Properties → Compatibility** and you'll see the new GE-Proton version in the dropdown!

> [!NOTE]
> **You can have multiple Proton versions installed at the same time.** Different games can use different versions. There's no conflict.

---

## 🎮 Step 4: Launch Options (The Secret Weapons)

Steam lets you add special flags that run *before* your game launches. These can fix all sorts of weird issues.

### How to Set Launch Options
1. Select the game → **gear icon** → **Properties**.
2. In the **General** tab, find the **Launch Options** text box.
3. Paste in your command.

### Common Launch Options

| Launch Option | What It Fixes |
| :--- | :--- |
| `PROTON_USE_WINED3D=1 %command%` | Forces OpenGL instead of DirectX. Fixes some older games that crash on Vulkan. |
| `gamescope -f -- %command%` | Forces the game through Gamescope (SteamOS's display compositor). Can fix resolution issues. |
| `DXVK_ASYNC=1 %command%` | Enables async shader compilation. Reduces stuttering in some games. |
| `PULSE_LATENCY_MSEC=60 %command%` | Fixes crackling or distorted audio. |
| `SteamDeck=0 %command%` | Tells the game you're NOT on a Steam Deck. Some games apply unwanted "Deck optimizations" that hurt more than they help. |

> [!TIP]
> **You can combine launch options!** Just put them all before `%command%`:
> ```
> DXVK_ASYNC=1 PULSE_LATENCY_MSEC=60 %command%
> ```

---

## 🛠️ Step 5: Protontricks (The Advanced Fix)

Some games need specific Windows components (like .NET runtimes, Visual C++ redistributables, or DirectX libraries) that don't come with Proton by default.

**[Protontricks](https://github.com/Matoking/protontricks)** is a tool that lets you install these Windows components into a game's individual Proton prefix.

### Installing Protontricks
Search for **Protontricks** in the Discover store and install it.

### Common Uses
```bash
# Install a Visual C++ runtime for a specific game
flatpak run com.github.Matoking.protontricks 1245620 vcrun2019

# Install DirectX 9 for an older game
flatpak run com.github.Matoking.protontricks 1245620 d3dx9
```
*(Replace `1245620` with your game's AppID — check {{ collections.posts | chapterLink('proton') | safe }} for how to find it!)*

> [!WARNING]
> **Protontricks is a power tool.** You generally don't need it unless a ProtonDB report specifically tells you to. If in doubt, try switching Proton versions first — it's simpler and solves most problems.

---

## 🗺️ The Troubleshooting Flowchart

When a game doesn't work, follow this order:

1. **Check ProtonDB** — someone probably already solved it.
2. **Switch Proton version** — try Experimental, then a stable numbered version.
3. **Install GE-Proton** — the community fork with extra fixes.
4. **Add launch options** — copy the exact flags from ProtonDB reports.
5. **Use Protontricks** — only if ProtonDB specifically recommends it.

Most games are fixed by step 2 or 3. If a game still doesn't work after all five steps, it's likely a genuine compatibility issue (like kernel-level anti-cheat) — check the game's ProtonDB page for confirmation.

---

Now that you know how to get even the stubbornest games running, let's make your Deck *look* as good as it plays.

{% next_chapter %}
