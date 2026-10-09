---
layout: base.njk
title: "❄️ Nix"
excerpt: "A package manager with the largest software collection around, and a one-command undo for every change."
tags:
  - posts
  - package-management
  - terminal
  - advanced
---

# Nix

{{ collections.posts | chapterLink('homebrew') | safe }} is the easy way to add terminal tools to your Deck. **[Nix](https://nixos.org/)** is the other option. It takes a little more getting used to, and in return it keeps every version of your setup, so you can undo an upgrade with one command.

This chapter uses the **[Determinate Nix Installer](https://determinate.systems/nix-installer/)**, which supports the Steam Deck directly.

## What Is Nix?

Nix is a package manager that installs every program into its own separate folder, together with the exact libraries it was built with. Two programs that need different versions of the same library can't conflict, because each one points at its own copy.

Your installed apps are recorded in a *profile*, and every change to it (installing, removing, upgrading) creates a new numbered version. That's what makes undoing a change possible.

> [!NOTE]
> **Valve made room for Nix.** Nix needs a folder called `/nix` at the very top of the system, which used to mean unlocking the read-only image just to create it. Since SteamOS 3.5 (2023), Valve ships `/nix` as one of the *offloaded* folders you met in {{ collections.posts | chapterLink('steamos-anatomy') | safe }}: it's really a folder on your home partition. The installer detects this and uses it, so you can install Nix **without ever touching the read-only lock**, and everything you install survives updates.

## Nix or Homebrew?

Nix's advantages over Homebrew:

- **Rollbacks.** If an upgrade breaks something, one command puts your apps back the way they were.
- **Reproducibility.** The same package from Nix is built the same way on every computer, so a setup that works on one PC works on the next.
- **A huge collection.** Its package collection, nixpkgs, is the largest that **[Repology](https://repology.org/repositories/statistics/total)** tracks.

The cost is a less familiar way of working, shown below. Both live on the home partition, and you can use both on the same Deck.

## Installing Nix

Open **Konsole** and run:

```bash
curl --proto '=https' --tlsv1.2 -sSf -L https://install.determinate.systems/nix | sh -s -- install
```

**What did that just do?** `curl` downloaded the Determinate installer over a secure connection, and `sh -s -- install` ran it. The installer asks for your admin password, sets up Nix in `/nix`, and adds two small setup files that put the `nix` command on your PATH: `/etc/profile.d/nix.sh` for Bash and `/etc/fish/conf.d/nix.fish` for Fish. It also lists them in `/etc/atomic-update.conf.d/nix-installer.conf`, so SteamOS keeps them across updates (see {{ collections.posts | chapterLink('steamos-updates') | safe }}).

Unlike Homebrew, there's no PATH step to do yourself, but when the change takes effect depends on your shell:

- **Fish** reads its file every time it starts, so open a new Konsole window and `nix` is ready.
- **Bash** only reads `/etc/profile.d` when you log in. Start a new session (switch to Game Mode and back to Desktop Mode) or restart the Deck. To use `nix` in your current terminal straight away, run `. /etc/profile.d/nix.sh`.

## Everyday Commands

| Action | Command |
|---|---|
| **Install permanently** | `nix profile add nixpkgs#app-name` |
| **Try without installing** | `nix shell nixpkgs#app-name` |
| **See what you've installed** | `nix profile list` |
| **Remove an app** | `nix profile remove app-name` |
| **Update everything** | `nix profile upgrade --all` |
| **Undo the last change** | `nix profile rollback` |

`nix shell` is worth a try: it downloads a program and opens a temporary shell where you can use it. When you type `exit`, it's gone from your PATH again.

> [!NOTE]
> Older guides use `nix profile install`. Newer versions of Nix renamed it to `nix profile add`; the old name still works but prints a deprecation warning.

### See It in Action

This recording shows Nix running an app without installing it:

[![asciicast](https://asciinema.org/a/zu1z4m8iLeSZiaRv.svg)](https://asciinema.org/a/zu1z4m8iLeSZiaRv)

## Optional Fix: Perl Apps and glibcLocales

Most people can skip this. You only need it if you run Perl software through Nix (like `cowsay`) and see errors about locales.

First, install the locale package:

```bash
nix profile add nixpkgs#glibcLocales
```

Then point your shell to the locale archive:

```bash
export LOCALE_ARCHIVE=/home/deck/.nix-profile/lib/locale/locale-archive
```

If this fixes the errors, make it permanent by adding that `export` line to your `~/.bashrc`.

In Fish, use this instead:

```fish
set -Ux LOCALE_ARCHIVE /home/deck/.nix-profile/lib/locale/locale-archive
```

> [!TIP]
> `set -Ux` sets a *universal* variable in Fish: it applies to every Fish session and survives restarts, so you only run it once. There's no need to add it to your config file.

## Optional Fix: Unfree Packages

Some packages in nixpkgs are marked *unfree*, meaning their licenses aren't fully open source. Nix refuses to install them until you allow it.

In Bash, set this variable:

```bash
export NIXPKGS_ALLOW_UNFREE=1
```

This lasts until you close the terminal. To make it permanent, add the same line to your `~/.bashrc`.

In Fish, use this instead:

```fish
set -Ux NIXPKGS_ALLOW_UNFREE 1
```

Then add `--impure` to your install or shell command, so Nix can read that variable:

```bash
nix profile add --impure nixpkgs#app-name
```

```bash
nix shell --impure nixpkgs#app-name
```

To allow unfree packages for a single command only, put both on one line:

```bash
NIXPKGS_ALLOW_UNFREE=1 nix shell --impure nixpkgs#app-name
```

## Which One Should You Pick?

- **Homebrew** if you want something familiar that works like an app store.
- **Nix** if you want rollbacks and a reproducible setup, and don't mind a new way of working.

Package managers cover the well-known tools. Many of the Steam Deck's best community tools aren't in any package manager, though; they're on GitHub, and the next chapter shows how to get them safely.
