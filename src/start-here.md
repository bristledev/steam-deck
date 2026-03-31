---
layout: base.njk
title: "Start Here"
excerpt: "Your beginner-friendly roadmap to mastering the Steam Deck."
eleventyNavigation:
  key: Start Here
  order: 0
---

# Start Here 🎮

Welcome! This guide is designed as a **beginner-first path** — you don't need any Linux or programming experience to follow along.

## Your Beginner Path (First 9 Chapters)

These chapters cover practical, everyday Steam Deck usage. Work through them in order and you'll be comfortable with everything your Deck has to offer.

| # | Chapter | What You'll Learn |
|---|---------|-------------------|
| 1 | {{ collections.posts | chapterLink('intro') | safe }} | What makes the Steam Deck special |
| 2 | {{ collections.posts | chapterLink('desktop') | safe }} | Navigating Desktop Mode like a PC |
| 3 | {{ collections.posts | chapterLink('filesystem') | safe }} | Where your files and saves live |
| 4 | {{ collections.posts | chapterLink('proton') | safe }} | Backing up saves and installing mods |
| 5 | {{ collections.posts | chapterLink('flatpak') | safe }} | Installing apps from the Discover store |
| 6 | {{ collections.posts | chapterLink('advanced') | safe }} | Installing apps not in the store |
| 7 | {{ collections.posts | chapterLink('appimage') | safe }} | Portable apps that just work |
| 8 | {{ collections.posts | chapterLink('performance') | safe }} | Squeezing every drop of performance |
| 9 | {{ collections.posts | chapterLink('customization') | safe }} | Making your Deck look amazing |

## Optional: Power User Path

Once you're comfortable with the basics, these chapters unlock the full Linux power under the hood. They're completely optional — come back whenever you're ready.

### Learn the Terminal
| # | Chapter | What You'll Learn |
|---|---------|-------------------|
| 10 | {{ collections.posts | chapterLink('bash') | safe }} | Your first terminal commands |
| 11 | {{ collections.posts | chapterLink('fish') | safe }} | A friendlier, smarter shell |
| 12 | {{ collections.posts | chapterLink('coreutils') | safe }} | Essential Linux vocabulary |

### Remote Access
| # | Chapter | What You'll Learn |
|---|---------|-------------------|
| 13 | {{ collections.posts | chapterLink('ssh') | safe }} | Remote terminal access and file transfers over Wi-Fi |
| 14 | {{ collections.posts | chapterLink('tailscale') | safe }} | Access your Deck from anywhere |

### Package Managers & Scripting
| # | Chapter | What You'll Learn |
|---|---------|-------------------|
| 15 | {{ collections.posts | chapterLink('homebrew') | safe }} | Install developer tools easily |
| 16 | {{ collections.posts | chapterLink('nix') | safe }} | A reproducible package manager |
| 17 | {{ collections.posts | chapterLink('github') | safe }} | Fetch scripts from the internet |
| 18 | {{ collections.posts | chapterLink('python') | safe }} | Run Python scripts on your Deck |
| 19 | {{ collections.posts | chapterLink('systemd') | safe }} | Automate tasks as background services |

### Containers & Extras
| # | Chapter | What You'll Learn |
|---|---------|-------------------|
| 20 | {{ collections.posts | chapterLink('podman') | safe }} | Run isolated app containers |
| 21 | {{ collections.posts | chapterLink('distrobox') | safe }} | A full Linux distro inside your Deck |
| 22 | {{ collections.posts | chapterLink('starship') | safe }} | A beautiful, smart terminal prompt |

### Appendices
| # | Chapter | What You'll Learn |
|---|---------|-------------------|
| — | {{ collections.posts | chapterLink('resources') | safe }} | Communities, tools, and further reading |

---

Ready? Jump into the first chapter: {{ collections.posts | chapterLink('intro') | safe }}!
