# firefox-copy-rich-link

Places a button directly inside the Firefox address bar (right next to Reader Mode and Bookmark Star) that copies the current page's URL and title simultaneously as:
1. **Rich Text Link (`HTML`)**: When pasted into Microsoft Teams, Outlook, Word, Slack, or Google Docs, it pastes as the clickable page title.
2. **Markdown Format (`[Page Title](URL)`)**: When pasted into Markdown editors (Discord, Obsidian, GitHub, VS Code, Reddit, Notepad), it automatically pastes as formatted Markdown.

---

## Features

- **Address Bar Integration**: Lives directly inside the URL bar next to the native Reader View and Bookmark star.
- **Dual Clipboard Format**: Copies both `text/html` and `text/plain` simultaneously in one click.
- **Alt Text / Tooltip**: `Copy Rich Link (Alt+C)`.
- **Visual Feedback**:
  - The address bar icon temporarily turns into a green checkmark (`✓ Copied Rich Link!`).
  - An elegant floating dark toast confirms the copied title and URL.
- **Keyboard Shortcut**: Press `Alt + C` anywhere to copy immediately.

---

## How to Install / Load in Firefox

### Quick Load (Temporary Add-on)
1. In Firefox, open:
   ```text
   about:debugging#/runtime/this-firefox
   ```
2. Click **Load Temporary Add-on...**
3. Select [manifest.json](file:///C:/Users/andre/Andreusd/Projetos/firefox-copy-rich-link/manifest.json) in:
   ```text
   C:\Users\andre\Andreusd\Projetos\firefox-copy-rich-link\manifest.json
   ```
4. The button appears immediately in your address bar!
