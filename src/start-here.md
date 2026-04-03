---
layout: base.njk
title: "Start Here"
excerpt: "Your beginner-friendly roadmap to mastering the Steam Deck."
eleventyNavigation:
  key: Start Here
  order: 0
---

# Start Here 🎮

Welcome! This guide is the beginner-friendly roadmap for the whole site. You do not need any Linux or programming experience to follow it.

If you want the practical everyday Steam Deck path, start with **Phases 1–3**. Those chapters cover the basics most people actually need.

## Recommended Starter Path

Work through these phases in order. By the end, you will know your way around SteamOS, install software confidently, and recover from the most common problems without panicking.

### Phase 1: Get Comfortable
| # | Chapter | What You'll Learn |
|---|---------|-------------------|
| 1 | {{ collections.posts | chapterLink('intro') | safe }} | What makes the Steam Deck special |
| 2 | {{ collections.posts | chapterLink('desktop') | safe }} | Navigating Desktop Mode like a PC |
| 3 | {{ collections.posts | chapterLink('filesystem') | safe }} | Where your files, saves, and hidden folders live |
| 4 | {{ collections.posts | chapterLink('storage') | safe }} | Managing internal storage, shader cache, and SD cards |
| 5 | {{ collections.posts | chapterLink('proton') | safe }} | How Windows games work on SteamOS and where their data lives |
| 6 | {{ collections.posts | chapterLink('recovery') | safe }} | Updates, rollback options, and what to do when something breaks |

### Phase 2: Install Apps
| # | Chapter | What You'll Learn |
|---|---------|-------------------|
| 7 | {{ collections.posts | chapterLink('flatpak') | safe }} | Installing apps from the Discover store |
| 8 | {{ collections.posts | chapterLink('advanced') | safe }} | Installing apps that are not in the store |
| 9 | {{ collections.posts | chapterLink('appimage') | safe }} | Portable apps that run without a full install |

### Phase 3: Performance & Customization
| # | Chapter | What You'll Learn |
|---|---------|-------------------|
| 10 | {{ collections.posts | chapterLink('performance') | safe }} | Squeezing more battery life, smoother frame rates, and better thermals from your Deck |
| 11 | {{ collections.posts | chapterLink('troubleshooting') | safe }} | Fixing games that will not launch or run well under Proton |
| 12 | {{ collections.posts | chapterLink('customization') | safe }} | Making your Deck feel personal without getting lost in the weeds |

## Optional Power User Path

Once the basics feel comfortable, these phases unlock the deeper Linux side of the Steam Deck. They are optional, but they are where the platform starts to feel ridiculously capable.

### Phase 4: Learn the Terminal
| # | Chapter | What You'll Learn |
|---|---------|-------------------|
| 13 | {{ collections.posts | chapterLink('terminals') | safe }} | Every way to open a terminal on your Deck and when to use each one |
| 14 | {{ collections.posts | chapterLink('bash') | safe }} | Your first terminal commands |
| 15 | {{ collections.posts | chapterLink('fish') | safe }} | A friendlier, smarter shell |
| 16 | {{ collections.posts | chapterLink('coreutils') | safe }} | The everyday Linux commands you will see everywhere |

### Phase 5: Remote & Network
| # | Chapter | What You'll Learn |
|---|---------|-------------------|
| 17 | {{ collections.posts | chapterLink('ssh') | safe }} | Remote terminal access and file transfers over Wi-Fi |
| 18 | {{ collections.posts | chapterLink('tailscale') | safe }} | Secure access to your Deck from anywhere |

### Phase 6: Package Managers
| # | Chapter | What You'll Learn |
|---|---------|-------------------|
| 19 | {{ collections.posts | chapterLink('homebrew') | safe }} | Installing extra developer and terminal tools easily |
| 20 | {{ collections.posts | chapterLink('nix') | safe }} | A reproducible package manager with stronger rollback habits |

### Phase 7: Scripting & Services
| # | Chapter | What You'll Learn |
|---|---------|-------------------|
| 21 | {{ collections.posts | chapterLink('github') | safe }} | Fetching scripts from the internet without being reckless |
| 22 | {{ collections.posts | chapterLink('python') | safe }} | Running and understanding Python scripts on your Deck |
| 23 | {{ collections.posts | chapterLink('systemd') | safe }} | Automating tasks as background services |

### Phase 8: Containers & Sandboxing
| # | Chapter | What You'll Learn |
|---|---------|-------------------|
| 24 | {{ collections.posts | chapterLink('podman') | safe }} | Running isolated app containers |
| 25 | {{ collections.posts | chapterLink('distrobox') | safe }} | Using a full Linux distro inside your Deck |

### Phase 9: Power User Extras
| # | Chapter | What You'll Learn |
|---|---------|-------------------|
| 26 | {{ collections.posts | chapterLink('starship') | safe }} | Building a beautiful, smart terminal prompt |
| 27 | {{ collections.posts | chapterLink('ricing') | safe }} | Adding terminal eye candy without losing usability |
| 28 | {{ collections.posts | chapterLink('readline') | safe }} | Keyboard shortcuts that make the terminal feel dramatically faster |
| 29 | {{ collections.posts | chapterLink('zoxide-fzf') | safe }} | Fuzzy finding and instant directory jumping like a power user |

## Appendix

When you want extra tools, communities, and references, keep this one bookmarked.

| # | Chapter | What You'll Learn |
|---|---------|-------------------|
| — | {{ collections.posts | chapterLink('resources') | safe }} | Communities, tools, and further reading |

---

Ready? Start with {{ collections.posts | chapterLink('intro') | safe }}, then follow the phases in order.
