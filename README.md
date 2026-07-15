# Arnel Gumban — Portfolio

A single-page portfolio site styled around a control-room / SCADA aesthetic —
your experience section reads as a "shift log," and the header carries a live
Abu Dhabi clock, like an instrument readout.

## Files

```
portfolio/
├── index.html
├── css/style.css
├── js/script.js
└── README.md
```

No build step, no dependencies — just static HTML/CSS/JS.

## Before you publish

1. **Add your real LinkedIn URL.** Open `index.html`, search for
   `href="#"` near the bottom (Contact section), and replace it with your
   LinkedIn profile link.
2. Double-check the email/phone in the Contact section match what you want
   public.
3. Optional: swap the `AG` monogram in the header for a different mark if
   you'd like, or add a real headshot/photo somewhere in the About section.

## Publish with GitHub Pages (free)

1. Create a new repository on GitHub — name it anything, e.g. `portfolio`
   (or `<your-username>.github.io` if you want it at the root of your GitHub
   domain).
2. Upload these files (`index.html`, `css/`, `js/`) to the repository —
   either drag-and-drop in the GitHub web UI, or via git:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio site"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
3. In the repository, go to **Settings → Pages**.
4. Under "Build and deployment," set **Source** to `Deploy from a branch`,
   branch `main`, folder `/ (root)`. Save.
5. Wait a minute, then your site will be live at:
   - `https://<your-username>.github.io/<repo-name>/` (normal repo), or
   - `https://<your-username>.github.io/` (if the repo is named
     `<your-username>.github.io`)

## Customizing later

- **Colors** live as CSS variables at the top of `css/style.css` (`:root`) —
  change `--amber` or `--blue` there to retheme the whole site.
- **Stats** in the hero use `data-count` attributes in `index.html` — edit
  the numbers directly and the counter animation picks them up automatically.
- **Shift log entries** are repeated `.log-entry` blocks — copy one to add
  a new role, or trim one to remove.
