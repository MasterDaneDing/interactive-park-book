# My Adventure in the Park - Interactive HTML5 Storybook

## How to Host on GitHub Pages (Takes 60 Seconds)
1. This repository is already created.
2. Upload `index.html` to the root of this repository (and optionally upload your `Interactive Book` subfolders `Kids-play-together-21 (1)/`, `Kids-say-sorry-21/`, `kids arguing/`, and `Friends Song (1).mp3` through `Friends Song (5).mp3` alongside `index.html`).
3. In your GitHub repository, go to **Settings** -> **Pages**.
4. Under **Build and deployment** -> **Branch**, select `main` (or `master`) and `/ (root)`, then click **Save**.
5. Your interactive book will be live at `https://MasterDaneDing.github.io/interactive-park-book/`!

**Note:** The full set of image assets (play scenes, sorry scenes, arguing, backgrounds, body templates, lookafter, fisticuffs) and Friends Song MP3s are in your Google Drive "Interactive Book" folder. Due to the large number and size of binary files, please upload those subfolders and MP3s directly via the GitHub web interface or git for the complete external asset experience. The provided index.html embeds many core character and background assets as base64 already.
## PDF quality & Google Drive auto-upload

- Student **Save Story PDF** renders each page on a canvas at **3× scale** (960×680 logical → 2880×2040) with JPEG quality **0.92** (previously 1× / 0.86), then embeds into a landscape A4 jsPDF. Local download always remains the fallback.
- Classroom Drive upload uses the existing **GitHub / Drive Setup** Apps Script Web App webhook (no OAuth tokens in the repo).
- Target folder: **Grok / Playing in the Park**
  - Grok folder id: `1teESTgKWcyRkpdihn3KQRFwZd7YYI1bq`
  - Playing in the Park folder id: `1hKJXNAaMB9BjpHD-Kg4bPDIxDUuPQ168`
- One-time teacher steps: open Setup → copy Apps Script → deploy as Web app (Execute as Me, Anyone) → paste URL → Save Drive URL. Optionally paste the same URL into `TEACHER_DRIVE_CONFIG.webhookUrl` in `index.html` so every device picks it up without localStorage.
