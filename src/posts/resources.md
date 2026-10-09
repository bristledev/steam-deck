---
layout: base.njk
title: "📚 External Resources"
excerpt: "Official documentation, communities and channels for going further, grouped by the topics in this series."
tags:
  - posts
  - reference
  - beginner
---

# External Resources

These are the places worth bookmarking once you've finished the series, grouped by the topics it covers. In each group, official documentation comes first.

## Steam Deck & SteamOS

### From Valve

- **[Steam Deck Official Site](https://www.steamdeck.com/)**: Valve's page for the Deck, with specs, features and announcements.
- **[SteamOS Recovery and Troubleshooting](https://help.steampowered.com/en/faqs/view/1B71-EDF2-EB6D-2BB3)**: Valve's official guide to Factory Reset, rolling back to the previous version and erasing user data.
- **[SteamOS Installation and Repair](https://help.steampowered.com/en/faqs/view/65B4-2AA3-5F37-4227)**: Valve's recovery image download, with instructions for repairing or re-imaging your Deck from a USB drive.
- **[Steam Deck FAQ](https://www.steamdeck.com/en/faq)**: Valve's answers to common questions.
- **[Deck Verified](https://www.steamdeck.com/en/verified)**: How Valve's compatibility ratings work.

### Under the Hood

The projects behind the "How SteamOS Works" chapters (starting with {{ collections.posts | chapterLink('steamos-anatomy') | safe }}), for when you want to go deeper:

- **[Gamescope (GitHub)](https://github.com/ValveSoftware/gamescope)**: Valve's compositor that runs Game Mode, with its full list of options.
- **[RAUC Documentation](https://rauc.readthedocs.io/)**: The update framework SteamOS uses to install new images into the A/B slots.
- **[systemd-sysext](https://www.freedesktop.org/software/systemd/man/latest/systemd-sysext.html)**: The reference for system extensions.
- **[Arch Wiki: Polkit](https://wiki.archlinux.org/title/Polkit)**: How polkit rules work, and how to read the ones SteamOS ships.
- **[Decky Loader (GitHub)](https://github.com/SteamDeckHomebrew/decky-loader)**: The source code behind everything in {{ collections.posts | chapterLink('customization') | safe }}'s "Under the Hood" section.

### Community

- **[r/SteamDeck (Reddit)](https://www.reddit.com/r/SteamDeck/)**: A large community of Deck owners, for news, setups and troubleshooting help.
- **[Steam Deck Discord](https://discord.gg/steamdeck)**: Real-time chat, handy for specific technical questions.
- **[Steam Deck HQ](https://steamdeckhq.com/)**: Game tests and recommended settings for the Deck.

## Linux & the Terminal

### Shells

- **[GNU Bash Manual](https://www.gnu.org/software/bash/manual/)**: The official reference for Bash, SteamOS's default shell.
- **[Fish Shell Documentation](https://fishshell.com/docs/current/)**: The official Fish documentation, including a tutorial for beginners.
- **[GNU Readline Documentation](https://tiswww.case.edu/php/chet/readline/rltop.html)**: The full reference for the keyboard shortcuts in {{ collections.posts | chapterLink('readline') | safe }}.

### Core Tools

- **[GNU Coreutils Manual](https://www.gnu.org/software/coreutils/manual/coreutils.html)**: The complete guide to `ls`, `cp`, `mv`, `chmod` and the other core commands.
- **[Explainshell](https://explainshell.com/)**: Paste a command and get a plain-English breakdown of each part.
- **[cheat.sh](https://cheat.sh/)**: Community-written cheat sheets for most commands, from your terminal (`curl cht.sh/tar`).
- **[tldr pages](https://tldr.sh/)**: Short, practical examples for common commands. Handy on SteamOS, which ships without `man` pages.

### Learning Linux

- **[Learn Linux TV](https://www.learnlinux.tv/)**: Jay LaCroix's YouTube channel and website, from beginner basics to server administration. He's also the author of *Mastering Ubuntu Server*.
- **[Linux Journey](https://linuxjourney.com/)**: A free, step-by-step course that takes you from zero to comfortable with Linux, now hosted by LabEx.
- **[The Linux Command Line](https://www.linuxcommand.org/tlcl.php)**: William Shotts' free book, a thorough introduction to the terminal.
- **[Arch Wiki](https://wiki.archlinux.org/)**: SteamOS is built on Arch Linux, so this detailed wiki is often directly relevant. Just remember that its `pacman` instructions don't apply on SteamOS (see {{ collections.posts | chapterLink('steamos-extending') | safe }}).

## Package Management & App Installation

- **[Flatpak Documentation](https://docs.flatpak.org/)**: How Flatpak apps, permissions and sandboxing work.
- **[Flathub](https://flathub.org/)**: The main Flatpak app store; you can browse it from any web browser.
- **[Homebrew Documentation](https://docs.brew.sh/)**: The official guide to Homebrew.
- **[nix.dev](https://nix.dev/)**: The official tutorials and guides, and the most approachable place to start learning Nix.
- **[NixOS Wiki](https://wiki.nixos.org/)**: The community-maintained wiki for Nix.
- **[AppImageHub](https://www.appimagehub.com/)**: A directory of apps distributed as AppImages.

## Gaming & Proton

- **[ProtonDB](https://www.protondb.com/)**: Community reports on how Windows games run on Linux. Look for Steam Deck reports for the most relevant results.
- **[Proton (GitHub)](https://github.com/ValveSoftware/Proton)**: Valve's Proton repository, with its issue tracker, release notes and changelogs.
- **[GE-Proton](https://github.com/GloriousEggroll/proton-ge-custom)**: The community version of Proton with extra patches.
- **[ProtonUp-Qt](https://davidotek.github.io/protonup-qt/)**: A desktop app for installing and managing Proton versions.
- **[Protontricks](https://github.com/Matoking/protontricks)**: Installs Windows components into individual game prefixes.
- **[Heroic Games Launcher](https://heroicgameslauncher.com/)**: Plays your Epic, GOG and Amazon games on Linux.
- **[EmuDeck Wiki](https://emudeck.github.io/)**: EmuDeck's official setup guides.
- **[Decky Loader](https://decky.xyz/)**: The plugin system for Game Mode.
- **[SteamGridDB](https://www.steamgriddb.com/)**: Community-made artwork for your game library.

## Networking & Remote Access

- **[OpenSSH Manuals](https://www.openssh.com/manual.html)**: The manuals for OpenSSH, the SSH software on your Deck.
- **[WinSCP Documentation](https://winscp.net/eng/docs/start)**: Guides for the Windows file transfer app from {{ collections.posts | chapterLink('ssh') | safe }}.
- **[Tailscale Documentation](https://tailscale.com/kb/)**: Guides for setting up and using Tailscale.
- **[deck-tailscale (GitHub)](https://github.com/tailscale-dev/deck-tailscale)**: The install script for Tailscale on the Steam Deck, from Tailscale's `tailscale-dev` GitHub organization.
- **[Syncthing](https://syncthing.net/)**: Keeps folders in sync between your Deck and other devices directly, without a cloud service.

## Containers

- **[Podman Documentation](https://docs.podman.io/)**: The official Podman documentation.
- **[Podman Desktop](https://podman-desktop.io/)**: A graphical app for managing containers.
- **[Distrobox (GitHub)](https://github.com/89luca89/distrobox)**: The Distrobox project, with its guides.
- **[Distrobox Documentation](https://distrobox.it/)**: The project's documentation site, including its compatibility list.

## Scripting & Development

- **[Python Tutorial](https://docs.python.org/3/tutorial/)**: The official Python tutorial, a good place to start.
- **[Real Python](https://realpython.com/)**: Practical Python guides for all skill levels.
- **[GitHub Docs](https://docs.github.com/)**: Official documentation for Git and GitHub.
- **[git - the simple guide](https://rogerdudler.github.io/git-guide/)**: A one-page introduction to Git.
- **[systemd Documentation](https://www.freedesktop.org/software/systemd/man/latest/)**: The official reference for services, timers and other units.
- **[Arch Wiki: systemd](https://wiki.archlinux.org/title/Systemd)**: A more approachable guide to systemd, relevant to SteamOS.

## Terminal Tools

- **[Starship](https://starship.rs/)**: Installation, configuration and preset guides.
- **[zoxide (GitHub)](https://github.com/ajeetdsouza/zoxide)**: Documentation and examples for zoxide.
- **[fzf (GitHub)](https://github.com/junegunn/fzf)**: Documentation and shell setup guides for fzf.
- **[Fisher](https://github.com/jorgebucaran/fisher)**: A plugin manager for Fish.

## YouTube Channels

For when it's easier to watch someone do it:

- **[The Phawx](https://www.youtube.com/@ThePhawx)**: In-depth looks at handheld performance and hardware.
- **[Retro Game Corps](https://www.youtube.com/@RetroGameCorps)**: Emulation guides and handheld reviews.
- **[GamingOnLinux](https://www.youtube.com/@GamingOnLinux)**: SteamOS updates and Linux gaming news.
- **[Gardiner Bryant](https://www.youtube.com/@gardiner_bryant)**: Approachable Linux videos for people switching from Windows.

## Before You Experiment

SteamOS is built to survive experiments: the read-only system, the spare A/B copy and the recovery image are all there if something goes wrong (see {{ collections.posts | chapterLink('recovery') | safe }}). Two habits keep the rest of your data safe too: back up anything you can't download again, like saves that aren't in Steam Cloud, and check what a command does before you run it.
