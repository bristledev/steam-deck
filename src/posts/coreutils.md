---
layout: base.njk
title: "📦 The Linux Command Toolbox (GNU Coreutils)"
excerpt: "Learn the essential tools that power every Linux terminal."
tags:
  - posts
  - terminal
  - intermediate
---

# The Linux Command Toolbox (GNU Coreutils)

In the {{ collections.posts | chapterLink('bash') | safe }} chapter, we learned that the **Terminal** is just a way to talk to your computer. But if the terminal is a conversation, the **GNU Coreutils** are the vocabulary.

Most of the simple commands you'll use on your Steam Deck (like `ls`, `cp`, and `mv`) actually belong to a massive collection of tools called the **[GNU Core Utilities](https://www.gnu.org/software/coreutils/manual/coreutils.html)**. These tools have been standard on Linux for decades.

## 🛠️ The Essential Tools

Here are the most common tools you'll find yourself using while modding or managing your Deck:

### 1. File & Directory Management
*   **`cp` (Copy)**: Copies files or folders.
    - `cp source.txt destination.txt`
*   **`mv` (Move/Rename)**: Moves a file or renames it.
    - `mv old_name.txt new_name.txt`
*   **`rm` (Remove)**: Deletes a file.
    - `rm file.txt`
    - > [!CAUTION]
      > **There is no Recycle Bin in the terminal.** When you use `rm`, the file is gone. Always double-check your command!
*   **`mkdir`**: Creates a new folder.
*   **`rmdir`**: Deletes an *empty* folder.

### 2. Viewing & Inspecting
*   **`cat`**: Slaps the entire contents of a file onto your screen. Great for quick reads.
*   **`head` / `tail`**: Shows only the first or last few lines of a file. (Perfect for checking large log files!)
*   **`less`**: Lets you scroll through a large file one page at a time. (Press `q` to quit!)

### 3. Permissions
*   **`chmod`**: Changes who can read, write, or "execute" (run) a file.
*   **`chown`**: Changes who "owns" the file. You'll usually use this with `sudo`.

---

## 🔗 Deep Diving and Documentation

The world of Coreutils is deep. If you want to see every single tool available and exactly how it works, check out the official manual:

👉 **[The GNU Coreutils Manual (Official Documentation)](https://www.gnu.org/software/coreutils/manual/coreutils.html)**

---

## 🧭 Don't Forget Your Cheat Sheet!

As we mentioned before, you don't have to memorize every single flag and option. If you're ever stuck on how to use a specific tool like `tar` or `grep`, just use the **Cheat.sh** trick we learned:

```bash
curl cht.sh/cp
```

*(Swap `cp` for any command you're curious about!)*

---

Now that you've got the vocabulary, it's time to make the conversation look a lot better. 

{% next_chapter %}
