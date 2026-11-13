# HaulMind India — Marketing Website

Static multi-page marketing website for **HaulMind India** (multi-branch LR / bilty transport management software by Wayne E Solutions). Colours and logo follow the HaulMind brand: deep green `#064E3B` and emerald `#059669`.

## Pages
| Page | File |
|---|---|
| Home (hero video, overview, workflow, modules, roles, FAQ) | `index.html` |
| Platform — how it works | `platform.html` |
| Modules — all 8 modules with anchors (`#booking`, `#billing` …) | `modules.html` |
| Solutions — by business type and role | `solutions.html` |
| About | `about.html` |
| FAQ | `faq.html` |
| Contact / book a demo (form) | `contact.html` |
| Track LR | `track.html` |
| Not found | `404.html` |

Shared files: `styles.css` (theme + responsive layout), `script.js` (mobile menu, hero video play/pause, scroll animations, demo form, LR tracking), `assets/` (logo, white logo, logo mark, favicons).

## How the buttons work
- **Book a demo** → `contact.html`. The form checks required fields, then opens an email to `hello@wayneesolutions.com` with all details filled in. Module pages pre-select the topic (`contact.html?topic=billing`).
- **Login** → `https://haulmindin.wayneesolutions.com/login`
- **Track LR** → opens `https://haulmindin.wayneesolutions.com/track?lr=<LR number>` in a new tab.
- Change the email or app URL at the top of `script.js` (`SALES_EMAIL`, `APP_URL`) and in the HTML if needed.

## Preview / deploy
No build step. Open `index.html` in a browser, or upload the folder as-is to any static host (Nginx on EC2, S3, Vercel, GitHub Pages). Set `404.html` as the error page on the host.

## Before launch
The hero video (Pexels) and photos (Unsplash) load from their sites. For production, download licensed copies into `assets/` and update the URLs.
