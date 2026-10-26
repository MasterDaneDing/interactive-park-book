# My Adventure in the Park - Interactive HTML5 Storybook

## How to Host on GitHub Pages (Takes 60 Seconds)
1. This repository is already created.
2. Upload `index.html` to the root of this repository (and optionally upload your `Interactive Book` subfolders `Kids-play-together-21 (1)/`, `Kids-say-sorry-21/`, `kids arguing/`, and `Friends Song (1).mp3` through `Friends Song (5).mp3` alongside `index.html`).
3. In your GitHub repository, go to **Settings** -> **Pages**.
4. Under **Build and deployment** -> **Branch**, select `main` (or `master`) and `/ (root)`, then click **Save**.
5. Your interactive book will be live at `https://MasterDaneDing.github.io/interactive-park-book/`!

**Note:** The full set of image assets (play scenes, sorry scenes, arguing, backgrounds, body templates, lookafter, fisticuffs) and Friends Song MP3s are in your Google Drive "Interactive Book" folder. Due to the large number and size of binary files, please upload those subfolders and MP3s directly via the GitHub web interface or git for the complete external asset experience. The provided index.html embeds many core character and background assets as base64 already.

## PDF quality & Google Drive auto-upload

- Student **Save Story PDF** renders **12 story pages** plus a final **QR / more stories** page on a canvas at **3× scale** (960×680 logical → 2880×2040) with JPEG quality **0.92**, then embeds into a landscape A4 jsPDF. Local download always remains the fallback.
- Story body text uses the **Stay With Me** font (`fonts/StayWithMe.otf`, free for personal use from [dafont](https://www.dafont.com/stay-with-me.font)) with yellow name highlights matching the on-screen book. Caption text dynamically fits ~28–40px so wrapped lines fill the white caption box.
- Final PDF page shows CTA copy plus the centered QR at `assets/my-park-adventure-qr.png`.
- Scene art mirrors the interactive story: **play**, **argue**, **fight**, **look-after / parent**, **sorry**, and **friendship dance** finale (plus hero pages). Local folder assets are preferred over Drive URLs so the canvas stays untainted for PDF export.
- Bugfix (blank text boxes): after `ctx.scale(PDF_SCALE)`, drawing used physical `c.width/2` as if it were logical — text was painted off-canvas. Export now uses logical `LW`/`LH` (960×680) for all coordinates.
- Drive upload uses a Google **Apps Script Web App** webhook (no OAuth tokens / API keys in the browser). There is **no** browser Google Drive API key — that cannot write to personal Drive from a static page.
- Target folder: **Grok / Playing in the Park**
  - Grok folder id: `1teESTgKWcyRkpdihn3KQRFwZd7YYI1bq`
  - Playing in the Park folder id: `1hKJXNAaMB9BjpHD-Kg4bPDIxDUuPQ168`
- Canonical script: [`drive-upload.gs`](./drive-upload.gs) (same code is shown under **GitHub / Drive Setup** in the app for one-click copy).

### One-time deploy (Charlie, as himself)

1. Open [script.google.com](https://script.google.com) → **New project**.
2. Paste the contents of `drive-upload.gs` → **Save**.
3. **Deploy** → **New deployment** → type **Web app**.
4. Execute as: **Me**; Who has access: **Anyone** → **Deploy**.
5. Copy the Web App URL (ends with `/exec`).
6. Optional smoke test: open that URL in a browser — expect `{"status":"ok","service":"park-book-drive",...}`.
7. In the live book: **Setup** → paste URL → **Save Drive URL** (stores in this browser's localStorage).
8. To bake it for every device: set `TEACHER_DRIVE_CONFIG.webhookUrl` in `index.html` to that same URL, commit, and push. Leave it empty until a real `/exec` URL exists — do not invent one.

Until `webhookUrl` (or Setup localStorage) is set, Save still downloads the PDF locally and shows a short Setup hint.
