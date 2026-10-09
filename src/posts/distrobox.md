---
layout: base.njk
title: "🎁 Distrobox"
excerpt: "Run Ubuntu, Fedora, Arch and other Linux distributions inside SteamOS, with their own package managers."
tags:
  - posts
  - containers
  - terminal
  - advanced
---

# Distrobox

In {{ collections.posts | chapterLink('podman') | safe }}, you ran containers with Podman directly. That takes long commands, and each container is cut off from the rest of your Deck. **[Distrobox](https://github.com/89luca89/distrobox)** is a tool that uses Podman to let you run almost any Linux distribution (like **[Ubuntu](https://ubuntu.com/)**, **[Fedora](https://fedoraproject.org/)**, or **[Arch](https://archlinux.org/)**) right inside your Steam Deck terminal, as if it were natively installed.

> [!NOTE]
> Everything in this chapter was checked on a Steam Deck running **SteamOS 3.9.2** with **Distrobox 1.8.2.5**.

## What Is Distrobox?
Distrobox creates a Podman container with a whole Linux distribution inside, then wires it into your Deck: it shares your home folder, your network and your screen, so programs inside feel like they're running on SteamOS itself.

Each *box* is like a **guest room in your house**. It has its own furniture (its own system files and package manager), but it shares your front door and hallway (your home folder). Redecorate the guest room however you like, and the rest of the house stays the same.

## Why Distrobox?
Because SteamOS's system is read-only, you can't install everything you might need for a project.
- **Get software SteamOS doesn't ship**: SteamOS has no compilers like `gcc` (see {{ collections.posts | chapterLink('preinstalled') | safe }}). A box can have them in one command.
- **Use any package manager**: `apt` in Ubuntu, `dnf` in Fedora, even `pacman` in Arch, all without touching SteamOS.
- **Try another distro**: Curious about Ubuntu? Try it without reformatting your Deck.
- **Throw it away**: Mess up a box? Delete it and make a fresh one in minutes.

> [!TIP]
> Wondering exactly *which* Linux distributions you can run? Check out the **[Official Distrobox Compatibility List](https://distrobox.it/compatibility/#containers-distros)**.

## A Box Is Not a Sandbox
This is the most important thing to understand about Distrobox. Its own documentation says it plainly: "Isolation and sandboxing are **not** the main aims of the project."

- **Your home folder is shared.** Anything a program inside a box does to your files, it does to your *real* files.
- **`sudo` inside a box needs no password.** That's convenient, but it means a mistyped `sudo rm` inside a box can still delete your real files in `/home/deck`.
- **What a box *can't* touch is SteamOS itself.** On the Deck, boxes run *rootless*: the box's "root" user is really just your `deck` user, so the read-only system stays out of reach.

> [!CAUTION]
> **Don't use Distrobox to run software you don't trust.** For that, a Flatpak from Discover is the better choice: Flatpaks *are* sandboxed. Also avoid creating boxes with the `--root` option, which runs them with full admin rights over your Deck.

## Setting Up Your First Box
Distrobox comes preinstalled on the Steam Deck. To create an **Ubuntu** box, run:

```bash
distrobox create -i ubuntu:latest -n my-ubuntu
```

**What did that just do?** `-i ubuntu:latest` picks the image (the latest Ubuntu release), and `-n my-ubuntu` names your box. The first time, it downloads Ubuntu (around 110 MB).

The short name `ubuntu` works even though {{ collections.posts | chapterLink('podman') | safe }} said to use full names: like `hello-world`, it's on Podman's built-in list of shortcuts, and so are `debian` and `archlinux` (used below). Images that aren't on the list, like `itzg/minecraft-server`, still need the full name.

Now "enter" your new Linux world:

```bash
distrobox enter my-ubuntu
```

The first time you enter, Distrobox spends a minute or two setting the box up, then prints **Container Setup Complete!** You're now inside Ubuntu.

### How Do I Know I'm Inside?
Your prompt might look almost the same as before, because the box shares your Deck's name. To check where you are, run:

```bash
echo $CONTAINER_ID
```

Inside a box, it prints the box's name (`my-ubuntu`). On plain SteamOS, it prints nothing. Type `exit` to leave the box and return to SteamOS.

### Installing Software Inside the Box
Inside your Ubuntu box, use Ubuntu's package manager. For example, this installs a C compiler and the usual build tools:

```bash
sudo apt update
sudo apt install build-essential
```

Everything you install lands in the box's own system files, not in SteamOS, and stays there until you delete the box.

> [!NOTE]
> **Your settings files are shared too.** Because the box uses your real home folder, your `~/.bashrc` (and anything you've added to it, like Homebrew or Starship) also runs inside the box. If something behaves oddly inside a box, check those files first.

### Bonus: The Safe Way to Use `pacman`
In {{ collections.posts | chapterLink('steamos-extending') | safe }}, you learned that installing with `pacman` on SteamOS itself gets wiped by the next update. An **Arch Linux** box gives you a real `pacman` with none of that risk:

```bash
distrobox create -i archlinux -n arch
distrobox enter arch
sudo pacman -Syu fastfetch
```

**What did that just do?** It created an Arch box, entered it, then updated the box's packages and installed `fastfetch` from Arch's own repositories. Your box lives in your home folder, so it survives every SteamOS update.

## Sharing Files and Apps With SteamOS
Because a box shares your home folder, a file you download inside your Ubuntu box is already in your regular Steam Deck folders.

You can also **export** apps from a box so they appear on SteamOS itself. Run these *inside* the box:

```bash
distrobox-export --app gimp
```

This adds the app (here, GIMP, if you've installed it in the box) to your Desktop Mode application menu. To use a terminal tool from SteamOS without entering the box, export the program instead:

```bash
distrobox-export --bin /usr/bin/fastfetch --export-path ~/.local/bin
```

> [!NOTE]
> SteamOS doesn't look for programs in `~/.local/bin` out of the box. Add it once, from SteamOS (outside the box), then open a new terminal:
> ```bash
> echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.bashrc
> ```
> If you use Fish, run `fish_add_path ~/.local/bin` instead.

To undo an export, run the same command with `--delete` added. And it works in the other direction too: inside a box, put `distrobox-host-exec` in front of a command to run it on SteamOS instead.

## Managing Your Boxes
Run these from SteamOS, outside any box:

| Command | What it does |
| :--- | :--- |
| **`distrobox list`** | Shows all your boxes and whether they're running |
| **`distrobox stop my-ubuntu`** | Stops a box that's still running in the background |
| **`distrobox rm my-ubuntu`** | Deletes a box, its system files, and any apps you exported from it |
| **`distrobox upgrade --all`** | Updates the software inside every box |

Deleting a box never touches your home folder, so your own files stay put. To see how much space your boxes take up, use `podman system df` from the previous chapter.

With Distrobox, almost any Linux software can run on your Deck without touching SteamOS. The last phase is about the terminal itself, starting with a more informative prompt.
