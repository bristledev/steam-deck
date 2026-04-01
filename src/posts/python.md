---
layout: base.njk
title: " Python"
excerpt: "The secret programming language already on your Deck."
tags: posts
---

#  Python – The Hidden Scripting Engine

If you’ve been following our path from the **Terminal** to **Homebrew** and **Nix**, you’re already a power user. But did you know that your Steam Deck comes pre-installed with one of the world's most popular programming languages?

That’s right: **[Python](https://www.python.org/)** is already there, waiting for you.

## Why is Python on my Steam Deck?
Most modern Linux systems (including SteamOS) use Python for a variety of background tasks. Because it’s so versatile, Valve includes it by default so that different parts of the operating system can talk to each other and run scripts.

## How to find Python
You don't need to install anything. Just open your terminal (**Konsole**) and type:

```bash
python --version
```

You’ll likely see something like `Python 3.x.x`. This is the "standard" version used by developers all over the world.

## Using Python as a Super-Calculator
The easiest way for a 'noob' to use Python is as an interactive calculator. Just type `python` in your terminal and hit Enter. You’ll see a `>>>` prompt. Now try these:

- `2 + 2`
- `10 * 5`
- `import math; math.sqrt(25)`

To exit this mode, just type `exit()` or press **Ctrl+D**.

## Why does this matter for a Gamer?
While you might not be writing the next big indie hit in the terminal, having Python means you can run **community-made scripts**. 

Many tools for the Steam Deck (like advanced save-game managers or specialized performance scripts) are written in Python. Since it's already installed, you can run them directly without needing a fancy installer.

## 🐙 Downloading Community Scripts
If you want to use community-made Python scripts, you'll often find them on GitHub. We covered exactly how to download and update projects using `git clone` and `git pull` in the {{ collections.posts | chapterLink('github') | safe }} chapter — those same techniques are how you'll grab Python scripts too!

## 🐍 Don't Break Your System: Use Environments!
Python is great, but installing packages directly into the system's Python is usually a bad idea. On the Steam Deck, it might even fail because the core system is "read-only." 

### 1. The Standard Way: `venv`
Imagine you're running two community scripts: one needs version 1 of a library, the other needs version 2. They can't both be installed at the same time — they'd conflict. A **Virtual Environment** solves this by giving each project its own private sandbox, completely isolated from everything else. The system Python stays untouched, your scripts stay happy.
```bash
# Make sure you're in the folder of your Python project
cd ~/MyPythonProject
# Create a new virtual environment in the current folder
python -m venv .venv
source .venv/bin/activate
```
Once activated, any packages you install with `pip` go into that sandbox, not the system. When you're done, just type `deactivate`.

### 2. The Modern Choice: uv ⚡
If you want the fastest and easiest experience, check out **[uv](https://github.com/astral-sh/uv)**. It's a "blazingly fast" Python package manager that manages your environments and packages automatically. You can install it with just one command:
```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```
Once installed, you can use `uv run [script.py]` and it will handle everything—from creating the environment to installing the right versions—automatically. It's widely considered the "best-in-class" tool for Python right now!

## 🎓 Honorable Mentions: Perl & Ruby
While Python is the king of community scripts, your Deck has other secret languages too:
- **[Perl](https://www.perl.org/)**: Pre-installed on every Steam Deck. It's a "classic" used for heavy text processing and system automation. You probably won't use it for gaming, but it's there if you need a "swiss army knife"!
- **[Ruby](https://www.ruby-lang.org/)**: Highly popular with developers and available via **Homebrew**. It powers many web tools and is known for being elegant and easy to read.

## 🦀 The Performance King: Rust
If you want to write the fastest software possible, you need **[Rust](https://www.rust-lang.org/)**. Many of the modern terminal tools we've mentioned (like `uv`) are built with Rust. 

To install **Cargo** (Rust's package manager) and the Rust compiler:
```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

**Try your first Rust project:**
1. Type `cargo new hello_deck`
2. `cd hello_deck`
3. `cargo run`
You've just compiled and run a high-performance program on your handheld!

---

Now that we've unlocked the power of the terminal and its secret languages, let's learn how to make your scripts run automatically in the background.

{% next_chapter %}
