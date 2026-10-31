# Progressive Web App ("PWA") Installation
Give users a native app-like install experience for adding a website to their device's home screen.


## The Process
User visits `welcome.html` (the PWA's `start_url`):
- If already installed (i.e. browser is in "standalone mode") >> show the app
- If not installed >> redirect to `install.html`


While on `install.html`:
- Show landing page with app icon, name, and Install button
  - User taps Install >> bottom sheet slides up (similar to a modal) with OS-specific instructions:
    - iOS >> instructions using the Share icon
    - Android, Samsung Browser >> instructions using the hamburger menu
    - Android, other (e.g. Chrome) >> instructions using the three-dot menu
    - Other (desktop) >> message to visit on a phone or tablet


## Required Updates
- `assets/js/pwa-config.js` — app name, app URL, icon path
- `manifest.json` — name, short_name, theme_color, background_color
- `welcome.html` — theme-color meta tag (match `manifest.json` theme_color)
- `assets/icons/icon-192x192.png` and `assets/icons/icon-512x512.png`



## Optional Updates
- `assets/css/pwa-installation.css` — change `--brand-color` in `:root` (line 6) to match your brand color (applies to all buttons)
- `service-worker.js` — add your app's pages and assets to the `SHELL` array

## Subsequent Updates
- `service-worker.js` — increment `CACHE_NAME` (e.g. `pwa-v2`) each time you deploy changes to force users to get a fresh cache