---
layout: base.njk
title: " Distrobox"
excerpt: "Run any Linux distribution inside SteamOS."
tags:
  - posts
  - containers
  - terminal
  - advanced
---

#  Distrobox – Any Linux, Any Time

In {{ collections.posts | chapterLink('podman') | safe }}, we looked at **Podman**, the engine that lets you run isolated "containers." But typing raw Podman commands can be a bit much for a beginner. 

Enter **[Distrobox](https://github.com/89luca89/distrobox)**: a magic tool that uses Podman to let you run *any* Linux distribution (like **[Ubuntu](https://ubuntu.com/)**, **[Fedora](https://getfedora.org/)**, or even **[Arch](https://archlinux.org/)**) right inside your Steam Deck terminal as if it were natively installed.

## Why Distrobox?
SteamOS is amazing, but because it's "read-only," you can't always install the specific tools or libraries you might need for a project. 
- **Fearless Exploration**: Want to try out Ubuntu without reformatting your Deck? Do it in a Distrobox.
- **Perfect Isolation**: If you break anything inside a Distrobox, you just delete it. Your Steam Deck stays 100% safe.
- **Unlimited Software**: If a tool only exists for a specific version of Linux, you can just create a "box" for that version and run it.

> [!TIP]
> > Wondering exactly *which* Linux distributions you can run? Check out the **[Official Distrobox Compatibility List](https://distrobox.it/compatibility/#containers-distros)** for a massive, constantly updated list of supported operating systems!

## Setting Up Your First "Box"
Distrobox is also pre-installed on the Steam Deck! To create an **Ubuntu** environment, just run:

```bash
distrobox create -i ubuntu:latest -n my-ubuntu
```

Once it's done downloading, you can "enter" your new Linux world:

```bash
distrobox enter my-ubuntu
```

Notice your terminal prompt changes? You're now inside a full Ubuntu system! You can use `apt install` to get any software you want, and it will stay safely contained inside that "box."

### Bonus: Unleash Your Inner Hacker (Kali Linux)
Gamers love a good hacking minigame, but what about the real thing? **[Kali Linux](https://www.kali.org/)** is the world's most famous "penetration testing" (ethical hacking) distribution, packed with real cybersecurity tools. 

You can run it right on your Deck without compromising SteamOS! Just spin up a new box:

```bash
distrobox create -i docker.io/kalilinux/kali-rolling -n hacker-box
distrobox enter hacker-box
```

Inside this box, you can install iconic networking and security tools safely using `apt install kali-linux-default` (be warned, it's a huge download!). When you're done pretending to be in *The Matrix*, just type `exit` and you're right back on your standard Steam Deck.

## The "Magic" of Integration
The best part about Distrobox? It shares your home folder. This means if you download a file in your Ubuntu "box," it's already there in your regular Steam Deck folders. 

You can even "export" apps from your box so they show up in your regular Steam Deck applications menu!

```bash
distrobox-export --app [app-name]
```

## Summary: A World of Linux at Your Fingertips
Distrobox isn't just for developers; it's for anyone who wants to learn Linux without the fear of "bricking" their device. It's the ultimate playground for the curious gamer.

---

{% next_chapter %}
