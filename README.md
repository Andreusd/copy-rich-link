# copy-rich-link

[![Firefox Add-ons](https://img.shields.io/badge/Firefox_Add--ons-Install-FF7139?logo=firefox-browser&logoColor=white)](https://addons.mozilla.org/pt-BR/firefox/addon/copy-rich-link/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

Places a button directly inside the address bar (right next to Reader Mode and Bookmark Star) that copies the current page's URL and title simultaneously as:
1. **Rich Text Link (`HTML`)**: When pasted into Microsoft Teams, Outlook, Word, Slack, or Google Docs, it pastes as the clickable page title.
2. **Markdown Format (`[Page Title](URL)`)**: When pasted into Markdown editors (Discord, Obsidian, GitHub, VS Code, Reddit, Notepad), it automatically pastes as formatted Markdown.

---

## Installation

### Official Store (Recommended)
Install directly from the official Mozilla Add-ons store:
👉 **[Get copy-rich-link on Firefox Add-ons](https://addons.mozilla.org/pt-BR/firefox/addon/copy-rich-link/)**

### Developer / Local Loading
1. Open a tab in Firefox: `about:debugging#/runtime/this-firefox`
2. Click **Load Temporary Add-on...**
3. Select [manifest.json](file:///C:/Users/andre/Andreusd/Projetos/copy-rich-link/manifest.json) in this directory.

---

## Features

- **Address Bar Integration**: Lives directly inside the URL bar next to the native Reader View and Bookmark star.
- **Dual Clipboard Format**: Copies both `text/html` and `text/plain` simultaneously in one click.
- **Alt Text / Tooltip**: `Copy Rich Link (Alt+Shift+C)`.
- **Visual Feedback**:
  - The address bar icon temporarily turns into a green checkmark (`✓ Copied Rich Link!`).
  - An elegant floating dark toast confirms the copied title and URL.
- **Keyboard Shortcut**: Press `Alt + Shift + C` anywhere to copy immediately (customizable via `about:addons` ➔ ⚙️ ➔ *Manage Extension Shortcuts*).
