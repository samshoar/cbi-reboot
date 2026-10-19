# Coinbase Institute website

Static website for GitHub Pages. No build step, npm install, or server-side code is required.

## Layout

```text
index.html                           Homepage and research catalogue
machine-to-machine-payments.html     Interactive machine-payments research
stablecoins-emerging-markets.html     Interactive emerging-markets research
assets/
  css/
    mobile.css                       Homepage responsive styles
    research.css                     Research-page styles and shared header
  js/
    research-archive.js               Historical catalogue entries
    research.js                       Research interactions and mobile menu
fonts/                               Existing Coinbase fonts
images/                              Existing article images and charts
```

Page filenames are deliberately unchanged so existing bookmarks keep working. All local paths are relative, including fonts in stylesheets, so the site can live at either a GitHub Pages project URL or a custom domain.

## Publish on GitHub Pages

1. Open the branch and folder configured under **Settings → Pages** (for example, `main` at `/` or `/docs`).
2. Upload the **contents** of this folder into that publishing folder, preserving `assets/`, `fonts/`, and `images/`. Do not upload the enclosing `website_2.0` folder unless that is intentionally part of the URL.
3. Replace the three HTML pages and upload every asset folder. Commit the changes, wait for the Pages deployment under **Actions**, then refresh the live site.

The old root-level `mobile.css`, `research.css`, `research.js`, and `research-archive.js` are no longer referenced. If those already exist on GitHub, they can be removed after the new deployment is verified. Do not remove unrelated repository files, GitHub workflows, or a custom-domain `CNAME`.

Open `index.html` directly for a local preview, or run `python3 -m http.server 8000` from this folder and visit `http://localhost:8000`.

## Editing

- Latest entries and featured research are in `index.html`.
- Historical entries and their tags are in `assets/js/research-archive.js`.
- Research-page text is in the two research HTML files; calculators and explorers are in `assets/js/research.js`.
- Original papers remain externally hosted; their PDF links are embedded in each research page.
- Keep original executive summaries intact. Clearly label illustrative calculations and their assumptions.

## Before publishing

Check the homepage, both research pages, mobile navigation, search and filters, interactive controls, and PDF links. Retain all fonts and images. `.DS_Store` and other operating-system metadata should not be committed.

The newsletter subscription is a front-end demonstration (an alert), not a live mailing-list integration. This site remains a conceptual template; review publication approvals and font licensing before public distribution.
