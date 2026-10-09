---
layout: base.njk
title: "⭐ The Ultimate Terminal Prompt (Starship)"
excerpt: "Make your terminal beautiful and informative across any shell."
tags:
  - posts
  - customization
  - terminal
  - intermediate
---

# The Ultimate Terminal Prompt (Starship)

Back in {{ collections.posts | chapterLink('fish') | safe }}, you gave yourself a smarter shell. But your **prompt** — the text that appears to the left of your cursor every time you type a command (by default on SteamOS, something forgettable like `(deck@steamdeck ~)$`) — is still pretty plain. What if that little line could show you your current Git branch, your Python version, your battery level, and more, all in a sleek modern design?

Meet **[Starship](https://starship.rs/)**.

Starship is a minimal, blazing-fast, and infinitely customizable prompt that works with *any* shell — Bash, Fish, or anything else.

## 🛠️ Step 1: Installation (Choose Your Weapon)

Choose the option that matches where you are in the curriculum.

### Option 1: The Homebrew Way (Recommended)
If you've already set up **{{ collections.posts | chapterLink('homebrew') | safe }}**, this is the cleanest option — one command, easy updates, and no scripts to worry about.

```bash
brew install starship
```

### Option 2: The Nix Way
If you're using the **{{ collections.posts | chapterLink('nix') | safe }}** package manager, just run:

```bash
nix profile add nixpkgs#starship
```

### Option 3: The Direct Way (Haven't done Homebrew or Nix yet?)
This method works without any extra tools. It downloads Starship directly into your home folder's `bin` directory, which stays safe across SteamOS updates.

> [!WARNING]
> This command pipes a script from the internet directly into your shell, which means you're trusting it to run unseen code. It's a common pattern and Starship is a reputable project, but it's worth knowing what you're doing. If you'd rather not, come back after setting up Homebrew (Option 1).

1. Open **Konsole**.
2. Run this command:
   ```bash
   curl -sS https://starship.rs/install.sh | sh -s -- --bin-dir ~/.local/bin
   ```
3. After it finishes, verify the install worked: `starship --version`

> [!TIP]
> If you see `command not found`, `~/.local/bin` isn't on your PATH yet. SteamOS doesn't include it by default; installing `uv` in {{ collections.posts | chapterLink('python') | safe }} adds it for you. Otherwise, add it yourself and open a new terminal:
> ```bash
> echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.bashrc
> ```
> If you use Fish, run `fish_add_path ~/.local/bin` instead.

---

## ⚙️ Step 2: Configuration

Now that Starship is installed, we need to tell your shells to use it.

### For Fish Users
Open your Fish configuration file:
```bash
nano ~/.config/fish/config.fish
```
Add this line at the very bottom:
```fish
starship init fish | source
```
Save with `Ctrl+O` → **Enter** → `Ctrl+X`. Restart your terminal (or run `source ~/.config/fish/config.fish`) and your new prompt appears immediately.

### For Bash Users
Open your `~/.bashrc` file:
```bash
nano ~/.bashrc
```
Add this line at the very bottom:
```bash
eval "$(starship init bash)"
```
Save with `Ctrl+O` → **Enter** → `Ctrl+X`. Restart your terminal (or run `source ~/.bashrc`) and your new prompt appears immediately.

---

## 🎨 Step 3: Making it Yours

By default, Starship looks great, but the real magic is in the presets. 

1. Visit the **[Starship Presets Gallery](https://starship.rs/presets/)**.
2. Find a design you like (like "Pastel Powerline" or "Nerd Font Symbols").
3. Each preset page shows a one-line command that writes it to `~/.config/starship.toml`. For Pastel Powerline, it's:
   ```bash
   starship preset pastel-powerline -o ~/.config/starship.toml
   ```

> [!TIP]
> **Need Icons?**
> Many Starship presets use special icons. If you see weird squares instead of icons, install a Nerd Font:
> 1. Download a font like **[JetBrainsMono Nerd Font](https://www.nerdfonts.com/font-downloads)**.
> 2. Extract the `.zip` file.
> 3. Copy the `.ttf` files into `~/.local/share/fonts/` (create the folder if needed).
> 4. Rebuild the font cache with `fc-cache -fv`.
> 5. In Konsole, go to **Settings -> Edit Current Profile -> Appearance**, then pick your new Nerd Font.

---

Now that your terminal prompt looks like it belongs in the future, let's make the *rest* of the terminal match.
