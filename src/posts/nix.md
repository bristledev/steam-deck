---
layout: base.njk
title: " Nix"
excerpt: "The powerhouse immutable package manager."
tags:
  - posts
  - package-management
  - terminal
  - advanced
---

#  Nix (Determinate Nix) – The Immutable Powerhouse

Previously, we looked at Homebrew, an easy way to install apps in your home folder. But there's another, even more powerful option for those who want to take their Steam Deck to the next level: **Nix**. 

Specifically, we're talking about the **[Determinate Nix Installer](https://determinate.systems/nix-installer/)**, which makes installing Nix on your Steam Deck as easy as running a single command.

## What is Nix?
**[Nix](https://nixos.org/)** is more than just a package manager; it's an entire philosophy of how to manage software. When you install an app with Nix, it doesn't just put files in a folder; it creates a perfectly isolated 'package' that never conflicts with other apps.

On the Steam Deck, Nix is particularly amazing because it's designed from the ground up to work on systems that are 'read-only' or immutable.

> [!IMPORTANT]
> ### 🛠️ The SteamOS 3.5 Advantage: /nix is Here!
> For a long time, installing Nix on the Steam Deck was a bit of a "pro-only" move because you had to "unlock" your read-only file system just to create the necessary `/nix` folder. 
> 
> Starting with **SteamOS 3.5**, Valve officially included a `/nix` directory (or the symlink required to create it) in the system's root. This means you can now install Nix **without ever touching your file system's write lock**, keeping your Deck's OS official and secure while enjoying the power of the Nix ecosystem.

## Why Choose Nix over Homebrew?
While **Homebrew** is simpler to understand, **Nix** offers some unique benefits:
- **Rock-Solid Stability**: If an update breaks something, you can often just 'roll back' to the previous version instantly.
- **Reproducibility**: You can take your Nix configuration to *any* other PC and get the exact same environment in seconds.
- **Huge Repository**: Nix has one of the largest collections of software in the world (even bigger than Homebrew!).

## How to Install (Determinate Nix)
The folks at **Determinate Systems** have created a special installer that works perfectly on the Steam Deck's unique setup. 

To install it, open your terminal (**Konsole**) and run:

```bash
curl --proto '=https' --tlsv1.2 -sSf -L https://install.determinate.systems/nix | sh -s -- install
```

### The "Nix Magic"
Unlike Homebrew, which requires you to manually manage your 'path', the Nix installer handles most of the plumbing for you. Once you restart your terminal, you'll have access to the powerful `nix` command.

## Basic Nix Commands
Nix works a bit differently than other package managers. The easiest way to use it is with `nix-shell` or the new `nix profile` commands.

| Action | Command |
|---|---|
| **Install permanently** | `nix profile install nixpkgs#app-name` |
| **Try without installing** | `nix shell nixpkgs#app-name` |
| **Update everything** | `nix profile upgrade --all` |

## 🎥 See it in Action
Want to see Nix magic in real-time? Check out this demo of running an app without installing it:

<script src="https://asciinema.org/a/zu1z4m8iLeSZiaRv.js" id="asciicast-zu1z4m8iLeSZiaRv" async="true"></script>

### Which one should you pick?
- **Choose Homebrew** if you want something familiar and easy that 'just works' like a regular app store.
- **Choose Nix** if you love the idea of a 'bulletproof' system and want to explore the cutting edge of Linux software management.

---

{% next_chapter %}
