---
layout: base.njk
title: "🐳 Podman"
excerpt: "The container engine that comes with SteamOS, and how to host game servers with it."
tags:
  - posts
  - containers
  - terminal
  - advanced
---

#  Podman – Containers Without the Complexity

If you’ve made it this far, you’ve seen how **Flatpaks**, **Homebrew**, and **Nix** let you install apps without touching the core SteamOS files. But there’s one more powerful tool that comes pre-installed on every Steam Deck: **Podman**.

> [!NOTE]
> Everything in this chapter was checked on a Steam Deck running **SteamOS 3.9.2** with **Podman 6.0.2**.

## What is Podman?
**[Podman](https://podman.io/)** is a tool for running *containers*. If you've ever heard of **[Docker](https://www.docker.com/)**, Podman uses almost exactly the same commands. The big difference is that Podman is **[rootless](https://github.com/containers/podman/blob/main/docs/tutorials/rootless_tutorial.md)** by default: containers run as your `deck` user, with no `sudo` and no access to the read-only system.

Think of a container as a **shipping container for software**. Everything a program needs (its files, libraries and settings) is packed inside, sealed off from the rest of your Deck. You can even run the tools of a whole different Linux distribution, like Ubuntu or Fedora, inside one.

Unlike a full virtual machine, a container doesn't boot its own operating system. It shares your Deck's Linux kernel, which is why containers start in seconds.

## Why is Podman on my Steam Deck?
Podman is the engine behind **Distrobox**, which you'll meet in the next chapter. Valve itself recommends that route: SteamOS's `steamos-devmode` command tells developers to build software in containers with Distrobox instead of modifying the system.

Your containers and their images are stored in `~/.local/share/containers/storage`, inside your home folder. Like Flatpaks, they survive every SteamOS update (see {{ collections.posts | chapterLink('steamos-anatomy') | safe }} for why).

## Your First Container
You don't need to install anything. Open **Konsole** and run:

```bash
podman run hello-world
```

Podman downloads a tiny test image, runs it, and prints a short greeting. All without needing `sudo`!

## 🎥 See it in Action
Check out how fast Podman starts up and runs a container!

[![asciicast](https://asciinema.org/a/6QpATU4wRtFkFPW0.svg)](https://asciinema.org/a/6QpATU4wRtFkFPW0)

## 🏷️ Always Use Full Image Names
Container images are downloaded from online libraries called *registries*. The two you'll see most are Docker Hub (`docker.io`) and GitHub's registry (`ghcr.io`).

Most guides online use short names like `itzg/minecraft-server`. On SteamOS, that fails:

```
Error: short-name "itzg/minecraft-server" did not resolve to an alias and no containers-registries.conf(5) was found
```

SteamOS doesn't set a default registry, so Podman doesn't know where to look. (`hello-world` only worked above because it's on Podman's small built-in list of shortcuts.) The fix is simple: always use the **full name**, including the registry.

> [!TIP]
> **Copying a command from a Docker guide?** Change `docker` to `podman`, and if the image name has no registry in front, add `docker.io/`. For example, `itzg/minecraft-server` becomes `docker.io/itzg/minecraft-server`.

## 🎮 Hosting Game Servers
While most gamers won't need Podman daily, it opens up some amazing possibilities. The best example? **Hosting your own game servers directly on your Deck.**

### Example: Running a Minecraft Server in 1 Command
Instead of downloading Java, configuring paths, and messing with system files, you can use a pre-built container like the popular **[itzg/minecraft-server](https://github.com/itzg/docker-minecraft-server)**.

Create a folder for your world, then launch a fully functional Minecraft (Java Edition) server:

```bash
mkdir -p ~/minecraft-data
podman run -d -it -p 25565:25565 -e EULA=TRUE -v ~/minecraft-data:/data --name mc-server docker.io/itzg/minecraft-server
```

**What did that just do?**
- `-d`: Runs the server "detached" (in the background) so you can keep using your terminal.
- `-it`: Keeps the server's console available, so you can attach to it later.
- `-p 25565:25565`: Opens the default Minecraft port so your friends can connect.
- `-e EULA=TRUE`: Accepts the Minecraft EULA, which the server requires before it will start.
- `-v ~/minecraft-data:/data`: Saves your world to a folder on your Deck, so it isn't lost when the container stops.
- `--name mc-server`: Gives the container a name you can use in later commands.

To stop the server later, just type `podman stop mc-server`. To start it again, `podman start mc-server`. It’s that easy!

[![asciicast](https://asciinema.org/a/qo924SpN5D5TBh68.svg)](https://asciinema.org/a/qo924SpN5D5TBh68)

> [!NOTE]
> **Your friends can reach the server out of the box.** SteamOS's built-in firewall already lets in connections on ports 1024 to 65535, which covers every game server here. Rootless containers can't use ports below 1024, but game servers don't need them.

### Two More Servers to Try

*   **[Valheim](https://github.com/community-valheim-tools/valheim-server-docker):** Host a dedicated Viking world for you and your friends. The password must be at least 5 characters, or the server won't start.
    ```bash
    mkdir -p ~/valheim-server/config ~/valheim-server/data
    podman run -d --name valheim-server --cap-add=sys_nice --stop-timeout 120 -p 2456-2457:2456-2457/udp -v ~/valheim-server/config:/config -v ~/valheim-server/data:/opt/valheim -e SERVER_NAME="Deck Server" -e WORLD_NAME="DeckWorld" -e SERVER_PASS="secret" ghcr.io/community-valheim-tools/valheim-server
    ```
*   **[Factorio](https://github.com/factoriotools/factorio-docker):** Keep the factory growing 24/7 without melting your PC. The server runs as a special user inside the container, so the folder needs a quick ownership change first (`podman unshare` is explained below).
    ```bash
    mkdir -p ~/factorio-data
    podman unshare chown 845:845 ~/factorio-data
    podman run -d --name factorio-server -p 34197:34197/udp -v ~/factorio-data:/factorio docker.io/factoriotools/factorio
    ```

> [!TIP]
> Check each server's own page before you host anything big. Some servers are too demanding for a handheld: Palworld's server, for example, lists 16 GB of RAM as its *minimum*, which is your Deck's entire memory.

## 🧰 Managing Your Containers
These commands cover everyday container housekeeping:

| Command | What it does |
| :--- | :--- |
| **`podman ps -a`** | Lists all your containers, running or stopped |
| **`podman logs -f mc-server`** | Follows a server's output live (press `Ctrl+C` to stop watching) |
| **`podman stop mc-server`** / **`podman start mc-server`** | Stops or starts a container |
| **`podman rm mc-server`** | Deletes a stopped container (your `-v` folder stays) |
| **`podman images`** | Lists the images you've downloaded |
| **`podman rmi <image>`** | Deletes an image you no longer need |
| **`podman system df`** | Shows how much space your images and containers use |

### The File Ownership Gotcha
Look at the files in your Minecraft folder:

```bash
ls -ln ~/minecraft-data
```

They're owned by a strange number, like `100999`, instead of your own user. You may not be able to edit or delete them directly.

**Why?** Rootless Podman gives your containers their own private range of user IDs, so a program inside a container can't pretend to be you. Your Deck sees those IDs as plain numbers. To work with the files as the container sees them, put `podman unshare` in front of the command. For example, to delete a world you no longer want:

```bash
podman unshare rm -rf ~/minecraft-data
```

### Keeping a Server Running
- **After a reboot**, containers don't start on their own. Run `podman start mc-server` again.
- **If a server stops when you switch** between Game Mode and Desktop Mode, enable lingering from {{ collections.posts | chapterLink('systemd') | safe }}. It keeps your user's background programs alive no matter which mode is open.

## 🤝 Letting Friends Connect
- **On your home network**, friends connect to your Deck's IP address. You learned how to find it in {{ collections.posts | chapterLink('ssh') | safe }}.
- **From outside your home**, avoid opening ports on your router. Instead, use {{ collections.posts | chapterLink('tailscale') | safe }}'s **[device sharing](https://tailscale.com/kb/1084/sharing)**: share your Deck from the **Machines** page of Tailscale's admin console. Your friend needs a free Tailscale account and the Tailscale app, and then connects to your Deck's Tailscale address.

---

Typing out long `podman` commands for every tool gets tedious, though. Next, let's meet the tool that turns Podman into a full Linux playground with a single command.
