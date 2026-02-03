# Smart Tab Manager – Chrome Extension

A lightweight Chrome extension to manage, clean, and organize browser tabs efficiently.

## 🚀 Features

- 📋 List all open tabs
- 🔁 Close duplicate tabs (same URL)
- 🧩 Group tabs by domain
- 🔓 Ungroup all tabs
- 🎯 Activate tabs directly from popup
- 🧷 Pinned tabs are never touched

## 🛠 Tech Stack

- Chrome Extension (Manifest V3)
- Vanilla JavaScript
- HTML + CSS
- Chrome APIs:
  - `chrome.tabs`
  - `chrome.tabGroups`

## 📦 Installation (Local)

1. Clone this repository
2. Open Chrome → `chrome://extensions`
3. Enable **Developer Mode**
4. Click **Load unpacked**
5. Select the project folder

## 🧠 Design Decisions

- No background service worker (popup-only for simplicity)
- Minimal permissions for security
- User-triggered actions only (no automation)
- Defensive handling of URLs and pinned tabs

## 📸 Screenshots

_Add screenshots of:_
- Tab list
- Grouped tabs
- Duplicate cleanup

## 💡 Future Improvements

- Remember user preferences
- Auto-group on tab open
- Domain-based rules
- Dark mode