---
layout: base.njk
title: "🐳 Podman"
excerpt: "The hidden container engine for safe tinkering."
tags:
  - posts
  - containers
  - terminal
  - advanced
---

#  Podman – Containers Without the Complexity

If you’ve made it this far, you’ve seen how **Flatpaks**, **Homebrew**, and **Nix** allow you to install apps without touching the core SteamOS files. But there’s one more powerful tool that comes pre-installed on every Steam Deck: **Podman**.

## What is Podman?
**[Podman](https://podman.io/)** is a tool for running "containers." If you've ever heard of **[Docker](https://www.docker.com/)**, Podman is essentially a drop-in replacement that is designed to be more secure and, crucially for the Steam Deck, **[rootless](https://github.com/containers/podman/blob/main/docs/tutorials/rootless_tutorial.md)** by default.

A container is like a tiny, isolated computer running inside your Steam Deck. You can run a whole different version of Linux (like Ubuntu or Fedora) inside a container without it ever knowing it's on a Steam Deck!

## Why is Podman on my Steam Deck?
Valve includes Podman because it’s the perfect way to run complex server applications or development environments. Because containers are isolated, you can experiment as much as you want without any risk of breaking SteamOS.

## Your First Container
You don't need to install anything. Open your terminal (**Konsole**) and try running this command to start a tiny "Hello World" container:

```bash
podman run hello-world
```

Podman will download a tiny image, run it, and print a message. All without needing `sudo`!

## 🎥 See it in Action
Check out how fast Podman starts up and runs a container!

[![asciicast](https://asciinema.org/a/6QpATU4wRtFkFPW0.svg)](https://asciinema.org/a/6QpATU4wRtFkFPW0)

## Cool Things to do with Podman
While most gamers won't need Podman daily, it opens up some amazing possibilities. The best example? **Hosting your own game servers directly on your Deck.**

### Example: Running a Minecraft Server in 1 Command
Instead of downloading Java, configuring paths, and messing with system files, you can use a pre-built container like the legendary **[itzg/minecraft-server](https://github.com/itzg/docker-minecraft-server)**. 

Just run this single command to create a folder for your world and launch a fully functional Minecraft server:

```bash
mkdir -p ~/minecraft-data
podman run -d -it -p 25565:25565 -e EULA=TRUE -v ~/minecraft-data:/data --name mc-server docker.io/itzg/minecraft-server
```

**What did that just do?**
- `-d`: Runs the server "detached" (in the background) so you can keep using your terminal.
- `-p 25565:25565`: Opens the default Minecraft port so your friends can connect.
- `-e EULA=TRUE`: Automatically accepts the Minecraft EULA.
- `-v ~/minecraft-data:/data`: Saves your world data to a specific folder on your Deck, so it isn't lost when the container stops!

To stop the server later, just type `podman stop mc-server`. To start it again, `podman start mc-server`. It’s that easy!

[![asciicast](https://asciinema.org/a/qo924SpN5D5TBh68.svg)](https://asciinema.org/a/qo924SpN5D5TBh68)

### More Awesome Game Servers for Podman

Minecraft isn't the only game you can host! The container community has packaged almost every popular dedicated server into easy-to-run images. Here are a few you can try out:

*   **[Valheim](https://github.com/lloesche/valheim-server-docker):** Host a dedicated Viking world for you and your friends.
    ```bash
    mkdir -p ~/valheim-data
    podman run -d --name valheim-server -p 2456-2457:2456-2457/udp -v ~/valheim-data:/config -e SERVER_NAME="Deck Server" -e SERVER_PASS="secret" lloesche/valheim-server
    ```
*   **[Terraria](https://github.com/ryansch/docker-terraria):** Dig, fight, and build together with zero configuration.
    ```bash
    mkdir -p ~/terraria-data
    podman run -d --name terraria-server -p 7777:7777 -v ~/terraria-data:/world rysh/terraria
    ```
*   **[Factorio](https://github.com/factoriotools/factorio-docker):** Keep the factory growing 24/7 without melting your PC.
    ```bash
    mkdir -p ~/factorio-data
    podman run -d --name factorio-server -p 34197:34197/udp -v ~/factorio-data:/factorio factoriotools/factorio
    ```
*   **[Palworld](https://github.com/thijsvanloef/palworld-server-docker):** Yes, you can even host Palworld using containers!
    ```bash
    mkdir -p ~/palworld-data
    podman run -d --name palworld-server -p 8211:8211/udp -v ~/palworld-data:/palworld thijsvanloef/palworld-server-docker
    ```

> [!TIP]
> **Connecting to your servers:** If your friends want to connect to these servers, they'll need your Steam Deck's local IP address (or you can use **[Tailscale](/posts/tailscale/)** for remote friends outside your network!).

---

{% next_chapter %}
