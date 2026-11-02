# Kopper Kettle Restaurant — website

A four-page site for **Kopper Kettle Restaurant**, the family diner at
11000 Nations Ford Rd, Pineville, NC 28134 (Charlotte metro).

Built as plain HTML/CSS/JS — no build step, no dependencies.

## Run it

```bash
node tools/serve.mjs
# http://127.0.0.1:4322
```

Any static host works too — upload all four `.html` files, `styles.css`, `pages.css`,
`script.js` and `assets/`.

## Pages

| Page | File | What's on it |
|---|---|---|
| Home | `index.html` | Hero, hours/address ticket, four counter favorites, reviews, story teaser, photo strip |
| Menu | `menu.html` | Full board: breakfast plates, biscuits & gravy, griddle, lunch, sides, drinks |
| Story | `story.html` | George & Penny, the 2024 fire and 2026 reopening, six-stop timeline, diner-words glossary, 10-photo gallery, regulars' reviews |
| Visit | `visit.html` | Address, phone, hours, live status card, directions, FAQ, call-ahead info |

The header, footer and mobile call bar appear on every page; the current page is marked
with `aria-current="page"`. Interior pages load `pages.css` on top of `styles.css`.

## Behaviour

- **Open/closed status** is computed live in Pineville (America/New_York) time:
  Mon–Fri 5:00 am–2:30 pm, Sat 5:00–11:30 am, Sunday closed. Edit the `SCHEDULE` object
  in `script.js` if hours change.
- Mobile nav, scroll reveals and jump-nav anchors are in `script.js` / `pages.css`.
- Content is visible without JS (`html.js` gates the reveal animation only).

## Business details used

| | |
|---|---|
| Address | 11000 Nations Ford Rd, Pineville, NC 28134 |
| Phone | (704) 588-1164 |
| Hours | Mon–Fri 5:00 am–2:30 pm · Sat 5:00–11:30 am · Sun closed |
| Ratings | 4.4 Yelp (113 reviews) · 4.0 Tripadvisor · 98% recommend on Facebook |
| Recognition | CharlotteFive Readers' Choice — Best Classic Restaurant |
| Price | $ |

Story details (George & Penny Karnezis, Sara Karnezis Morris, the October 2024 fire and
2026 reopening) come from local press coverage and the restaurant's own announcements.
Menu prices are illustrative — call to confirm before publishing.

## Photos

Photos in `assets/img/` are from **Unsplash** (free to use, no attribution required) and
are stand-ins for the restaurant's own photography. `tools/download-images.mjs` lists the
photo IDs used.

To swap in real photos, replace files with the same names:

| File | Where it appears |
|---|---|
| `diner-booths.jpg` | home hero |
| `booth-detail.jpg` | visit hero, home strip, story gallery |
| `diner-counter.jpg` | home story teaser, story hero |
| `counter-stools.jpg`, `booth-row.jpg`, `diner-exterior.jpg` | story gallery |
| `biscuits-skillet.jpg` | menu hero |
| `coffee-plate.jpg`, `meatloaf.jpg`, `pancakes.jpg`, `eggs-bacon.jpg` | home favorites + menu |
| `biscuits-tray.jpg`, `diner-neon.jpg`, `pecan-pie.jpg`, `breakfast-plate.jpg`, `cheesesteak.jpg` | strips and gallery |

## Structure

```
index.html  menu.html  story.html  visit.html
styles.css        base design system (diner tokens at the top)
pages.css         interior pages: page hero, jump nav, board, glossary, FAQ, gallery
script.js         nav, scroll reveals, live hours
assets/favicon.svg
assets/img/       photography
tools/serve.mjs   tiny local static server
tools/download-images.mjs  image provenance / re-download helper
```
