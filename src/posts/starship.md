---
layout: base.njk
title: "⭐ A Better Prompt (Starship)"
excerpt: "Replace the plain terminal prompt with one that shows your Git branch, Python version and more, in Bash or Fish."
tags:
  - posts
  - customization
  - terminal
  - intermediate
---

# A Better Prompt (Starship)

Your *prompt* is the text to the left of your cursor in the terminal. On SteamOS, it's `(deck@steamdeck ~)$` by default: your username, your Deck's name and the current folder. **[Starship](https://starship.rs/)** replaces it with a prompt that also shows useful context when it's relevant, like the Git branch of the project you're in, the Python version it uses or a warning when your battery drops below 10%.

Starship is a single program, configured with one text file, and it works in Bash, Fish and many other shells.

## Step 1: Install Starship

Pick whichever option matches the tools you already use.

### Option 1: Homebrew (Recommended)

If you've set up {{ collections.posts | chapterLink('homebrew') | safe }}, this is the simplest option, and `brew upgrade` keeps it up to date:

```bash
brew install starship
```

### Option 2: Nix

If you use {{ collections.posts | chapterLink('nix') | safe }}:

```bash
nix profile add nixpkgs#starship
```

### Option 3: The Install Script

This works without Homebrew or Nix. It downloads Starship into `~/.local/bin`, inside your home folder, so it survives SteamOS updates.

> [!WARNING]
> **This pipes a script from the internet straight into your shell.** Starship is a well-known project, but you're still running code you haven't read. {{ collections.posts | chapterLink('github') | safe }} shows how to download and read a script first, or you can use Option 1 instead.

1. Open **Konsole**.
2. Run:
   ```bash
   curl -sS https://starship.rs/install.sh | sh -s -- --bin-dir ~/.local/bin
   ```
3. Check that it worked with `starship --version`.

> [!TIP]
> If you see `command not found`, `~/.local/bin` isn't on your PATH yet. SteamOS doesn't include it by default; installing `uv` in {{ collections.posts | chapterLink('python') | safe }} adds it for you. Otherwise, add it yourself and open a new terminal:
> ```bash
> echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.bashrc
> ```
> If you use Fish, run `fish_add_path ~/.local/bin` instead.

## Step 2: Turn It On

Your shell needs one line in its startup file to use Starship.

### Fish

Open Fish's startup file:

```bash
nano ~/.config/fish/config.fish
```

Add this line at the very bottom:

```fish
starship init fish | source
```

Save with **Ctrl+O**, then **Enter**, and exit with **Ctrl+X**. Open a new terminal, and the new prompt appears.

### Bash

Open Bash's startup file:

```bash
nano ~/.bashrc
```

Add this line at the very bottom:

```bash
eval "$(starship init bash)"
```

Save with **Ctrl+O**, then **Enter**, and exit with **Ctrl+X**. Open a new terminal, and the new prompt appears.

## Step 3: Pick a Style

Starship's look is set in `~/.config/starship.toml`. The easiest way to change it is with a *preset*, a ready-made style:

1. Browse the **[Starship Presets Gallery](https://starship.rs/presets/)**.
2. Find a design you like, such as "Pastel Powerline" or "Nerd Font Symbols".
3. Each preset page shows a one-line command that writes it to `~/.config/starship.toml`. For Pastel Powerline, it's:
   ```bash
   starship preset pastel-powerline -o ~/.config/starship.toml
   ```

> [!TIP]
> **Seeing squares instead of icons?** Many presets use icons from a *Nerd Font*, a font with extra symbols added. To install one:
> 1. Download a font such as **[JetBrainsMono Nerd Font](https://www.nerdfonts.com/font-downloads)**.
> 2. Extract the `.zip` file.
> 3. Copy the `.ttf` files into `~/.local/share/fonts/` (create the folder if needed).
> 4. Rebuild the font cache with `fc-cache -fv`.
> 5. In Konsole, right-click inside the window and choose **Edit Current Profile...**. On the **Appearance** page, click **Choose...** next to **Font** and pick the new font.

The prompt is one part of the terminal's look. The next chapter covers tools that make the rest of it, from file listings to system monitors, easier to read.
