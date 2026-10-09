---
layout: base.njk
title: "🐍 Python on SteamOS"
excerpt: "The programming language SteamOS itself runs on, and how to use it without breaking anything."
tags:
  - posts
  - scripting
  - terminal
  - intermediate
---

# Python on SteamOS

In {{ collections.posts | chapterLink('github') | safe }}, you learned how to grab community tools from GitHub. Many of them are written in **[Python](https://www.python.org/)**, one of the world's most popular programming languages. Good news: your Steam Deck already has it.

> [!NOTE]
> Everything in this chapter was checked on a Steam Deck running **SteamOS 3.9.2**, which includes **Python 3.14.6**.

## Why Is Python on My Steam Deck?
Python isn't just there for you. Parts of SteamOS itself are written in it, including your Deck's **fan controller** and the **update client** from {{ collections.posts | chapterLink('steamos-updates') | safe }}. You can see it for yourself:

```bash
systemctl cat jupiter-fan-control | grep ExecStart
```

**What did that just do?** It showed the command the fan-control service runs: `/usr/share/jupiter-fan-control/fancontrol.py`. The `.py` ending means it's a Python script. Every time your Deck's fan speeds up, Python is behind it.

The update client is Python too. Look at the first line of its program:

```bash
head -1 /usr/bin/steamos-atomupd-client
```

It prints `#!/usr/bin/python3`. That first line (called a *shebang*) tells Linux which program should run the script.

So Python is always there, because SteamOS needs it. That's also exactly why you shouldn't change it, as you'll see below.

## Checking Your Version
Open **Konsole** and run:

```bash
python --version
```

You'll see something like `Python 3.14.6`. Typing `python` on its own opens an interactive prompt (`>>>`) where you can try out Python code, or just use it as a calculator. Type `exit()` to leave.

## Running Community Scripts
Most community Python tools follow the same pattern:

1. Download the project with `git clone`, as in the GitHub chapter.
2. Read its `README` for anything it needs installed first.
3. Run it with `python`, for example `python some_tool.py`.

To update a project later, open its folder in Konsole and run `git pull`, which downloads the author's latest changes.

Step 2 is where many scripts hit a snag: they need extra Python *libraries* (add-on code packages), and SteamOS won't let you install those the usual way.

## Why There's No `pip`
On most computers, Python libraries are installed with a tool called `pip`. On SteamOS, try it:

```bash
python -m pip --version
```

You'll get `No module named pip`. SteamOS deliberately leaves `pip` out, and it marks its Python as *externally managed*, meaning only the operating system is allowed to change it. You can read the notice yourself:

```bash
cat /usr/lib/python3*/EXTERNALLY-MANAGED
```

Why the lock? The fan controller and update client depend on the exact libraries SteamOS ships. If you swapped one out for a different version, they could break.

> [!WARNING]
> The notice suggests installing packages with `pacman -S`. That advice comes from Arch Linux, which SteamOS is built on, but on SteamOS anything installed with `pacman` is wiped by the next update (see {{ collections.posts | chapterLink('steamos-extending') | safe }}). Follow its *other* suggestion instead: a virtual environment.

## Virtual Environments

### Option 1: `venv`
Imagine you're running two community scripts: one needs version 1 of a library, the other needs version 2. They can't both be installed at the same time, because they'd conflict. A **virtual environment** solves this by giving each project its own private set of libraries, on top of the system's Python. SteamOS's Python stays untouched, and each script gets the versions it needs.

```bash
# Go to the folder of your Python project
cd ~/MyPythonProject
# Create a new virtual environment in the current folder
python -m venv .venv
# Switch to it
source .venv/bin/activate
```

Once activated, you have a working `pip` again, and anything you install goes into that project's environment, not the system. Many projects list everything they need in a `requirements.txt` file, which you can install in one go:

```bash
pip install -r requirements.txt
```

When you're done, just type `deactivate`.

*(If you use Fish, activate with `source .venv/bin/activate.fish` instead.)*

### Option 2: uv
**[uv](https://github.com/astral-sh/uv)** is a very fast Python tool that creates and manages environments for you. Install it with one command:

```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

The installer puts `uv` in `~/.local/bin` and adds that folder to your PATH, so **open a new terminal** afterwards. Then:

- `uv run some_tool.py` runs a script, creating an environment and installing what it needs automatically.
- `uvx some-tool` runs a Python tool without installing it permanently. You'll use this in the next chapter to run a file server.

Everything uv installs lives in your home folder, so it survives SteamOS updates.

Running a script by hand is fine once. For tools you want running all the time, like a file server, the next chapter shows how to start them automatically in the background.
