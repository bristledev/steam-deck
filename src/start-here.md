---
layout: base.njk
title: "Start Here"
excerpt: "The reading order for the whole series, and what each chapter covers."
eleventyNavigation:
  key: Start Here
  order: 0
---

# Start Here

This page lists every chapter in reading order. You don't need any Linux or programming experience to follow them.

For everyday Steam Deck use, **Phases 1 to 3** cover what most people need.

## Recommended Starter Path

Work through these phases in order. By the end, you'll know your way around SteamOS, be able to install software and know how to recover from the most common problems.

### Phase 1: Get Comfortable
| # | Chapter | What You'll Learn |
|---|---------|-------------------|
| 1 | {{ collections.posts | chapterLink('intro') | safe }} | What makes the Steam Deck special |
| 2 | {{ collections.posts | chapterLink('desktop') | safe }} | Navigating Desktop Mode like a PC |
| 3 | {{ collections.posts | chapterLink('filesystem') | safe }} | Where your files, saves and hidden folders live |
| 4 | {{ collections.posts | chapterLink('storage') | safe }} | Managing internal storage, shader cache and SD cards |
| 5 | {{ collections.posts | chapterLink('proton') | safe }} | How Windows games work on SteamOS and where their data lives |
| 6 | {{ collections.posts | chapterLink('recovery') | safe }} | Updates, rollback options and what to do when something breaks |

### Phase 2: Install Apps
| # | Chapter | What You'll Learn |
|---|---------|-------------------|
| 7 | {{ collections.posts | chapterLink('flatpak') | safe }} | Installing apps from the Discover store |
| 8 | {{ collections.posts | chapterLink('advanced') | safe }} | Games from Epic, GOG and Amazon, emulators and adding any app to Steam |
| 9 | {{ collections.posts | chapterLink('appimage') | safe }} | Portable apps that run without a full install |

### Phase 3: Performance & Customization
| # | Chapter | What You'll Learn |
|---|---------|-------------------|
| 10 | {{ collections.posts | chapterLink('performance') | safe }} | Trading frame rate for battery life with the Quick Access settings |
| 11 | {{ collections.posts | chapterLink('troubleshooting') | safe }} | Fixing games that won't launch or run well under Proton |
| 12 | {{ collections.posts | chapterLink('customization') | safe }} | Adding plugins to Game Mode with Decky Loader, and what it changes on your Deck |

## Going Deeper

Once the basics feel comfortable, these phases cover the Linux side of the Steam Deck: the terminal, remote access, how SteamOS works underneath and the tools for extending it. They're optional, and they build on each other, so read them in order.

### Phase 4: Learn the Terminal
| # | Chapter | What You'll Learn |
|---|---------|-------------------|
| 13 | {{ collections.posts | chapterLink('terminals') | safe }} | Every way to open a terminal on your Deck and when to use each one |
| 14 | {{ collections.posts | chapterLink('bash') | safe }} | Your first terminal commands |
| 15 | {{ collections.posts | chapterLink('fish') | safe }} | A friendlier, smarter shell |
| 16 | {{ collections.posts | chapterLink('coreutils') | safe }} | The everyday Linux commands you will see everywhere |
| 17 | {{ collections.posts | chapterLink('preinstalled') | safe }} | The useful tools SteamOS already ships with, and how to check before you install |

### Phase 5: Remote & Network
| # | Chapter | What You'll Learn |
|---|---------|-------------------|
| 18 | {{ collections.posts | chapterLink('ssh') | safe }} | Remote terminal access and file transfers over Wi-Fi |
| 19 | {{ collections.posts | chapterLink('tailscale') | safe }} | Secure access to your Deck from anywhere |

### Phase 6: How SteamOS Works
| # | Chapter | What You'll Learn |
|---|---------|-------------------|
| 20 | {{ collections.posts | chapterLink('steamos-anatomy') | safe }} | The partitions, read-only image and writable layers that make up SteamOS |
| 21 | {{ collections.posts | chapterLink('steamos-updates') | safe }} | What really happens during an update, which settings survive and how to roll back |
| 22 | {{ collections.posts | chapterLink('steamos-sessions') | safe }} | How Game Mode boots, what Gamescope does and what switching modes really does |
| 23 | {{ collections.posts | chapterLink('steamos-extending') | safe }} | Every way to add software that survives updates, and the one that always gets wiped |

### Phase 7: Package Managers
| # | Chapter | What You'll Learn |
|---|---------|-------------------|
| 24 | {{ collections.posts | chapterLink('homebrew') | safe }} | Installing terminal tools that SteamOS doesn't include |
| 25 | {{ collections.posts | chapterLink('nix') | safe }} | A reproducible package manager with stronger rollback habits |

### Phase 8: Scripting & Services
| # | Chapter | What You'll Learn |
|---|---------|-------------------|
| 26 | {{ collections.posts | chapterLink('github') | safe }} | Fetching scripts from the internet without being reckless |
| 27 | {{ collections.posts | chapterLink('python') | safe }} | Running and understanding Python scripts on your Deck |
| 28 | {{ collections.posts | chapterLink('systemd') | safe }} | Automating tasks as background services |

### Phase 9: Containers & Sandboxing
| # | Chapter | What You'll Learn |
|---|---------|-------------------|
| 29 | {{ collections.posts | chapterLink('podman') | safe }} | Running isolated app containers |
| 30 | {{ collections.posts | chapterLink('distrobox') | safe }} | Using a full Linux distro inside your Deck |

### Phase 10: Terminal Extras
| # | Chapter | What You'll Learn |
|---|---------|-------------------|
| 31 | {{ collections.posts | chapterLink('starship') | safe }} | A more informative terminal prompt |
| 32 | {{ collections.posts | chapterLink('ricing') | safe }} | Tools that make the terminal nicer to look at and easier to read |
| 33 | {{ collections.posts | chapterLink('readline') | safe }} | Keyboard shortcuts for editing commands quickly |
| 34 | {{ collections.posts | chapterLink('zoxide-fzf') | safe }} | Jumping to folders and searching your command history in a few keystrokes |

## Appendix

Documentation, communities and channels for going further.

| # | Chapter | What You'll Learn |
|---|---------|-------------------|
| — | {{ collections.posts | chapterLink('resources') | safe }} | Communities, tools and further reading |

Start with {{ collections.posts | chapterLink('intro') | safe }}, then follow the phases in order.
