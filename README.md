# Intolearn — by Lee Thumwood

Personal-use prototype. Current build: **v5.1**.

## Run it

Open `index.html` in a modern browser, or serve the folder locally:

```bash
python -m http.server 8000
```

Then open http://localhost:8000

Install it as a PWA (Add to Home Screen on iOS/Android) for an app-like experience with an offline-capable app shell.

## What it does

- **Food diary**: Breakfast, Lunch, Dinner, Snacks & Drinks, with time, ingredients and notes per entry. Entries can be added, edited and deleted.
- **Barcode lookup**: scan a product barcode (live camera via Quagga2, or photograph/manually enter the number) to pull product name, brand, image, ingredients and allergen data from Open Food Facts. Looked-up products are cached locally so repeat scans of the same barcode are instant and work offline.
- **Ingredient photo fallback**: when a barcode isn't available, photograph and crop the ingredient label. Browser-based OCR (Tesseract.js) reads the text and inserts it into the Ingredients field for review/editing.
- **Ingredient Checker**: pick specific ingredients/allergens you want to avoid, then scan a barcode or photo to check for them before eating.
- **Automatic tagging**: detects the 14 UK/EU legally-defined allergens (cereals containing gluten, milk, egg, soya, nuts, sesame, fish, crustaceans, molluscs, celery, mustard, sulphites, lupin) plus other commonly-relevant ingredients (onion, garlic, tomato, chilli, legumes, polyol sweeteners).
- **Exit Interview**: a quick daily check-in — bathroom frequency, consistency, urgency, general feeling, symptoms and notes.
- **Week / Month views**: recent entries at a glance, plus a filterable calendar for the month.
- **Report**: a shareable-style summary (7/30/90-day ranges) covering days recorded, meals, scans, Exit Interviews, "possible connections" between logged ingredients and symptom days, most frequent exposures, and a day-by-day timeline.
- **Trends**: the same association logic surfaced as standalone cards, using raw ingredient names rather than allergen/family groupings.
- **Backup/Restore**: export the whole diary as JSON from Settings.

## How the pattern/association logic works

Both the Report's "Possible connections" and the Trends tab compare ingredients against symptom days, with two deliberate design choices:

1. **A one-day lag window.** A day counts as a "reaction" if symptoms were logged either that same day or the day after, since GI symptoms often don't show up immediately.
2. **A personal baseline, not a raw rate.** Ingredients you eat almost every day are excluded (they can't tell you anything — everything correlates with them). Of what's left, only ingredients whose symptom rate is meaningfully above your own overall baseline rate are shown, rather than anything that's ever co-occurred with a symptom twice.

This still isn't a diagnosis — it's association within your own logged data, and confounding (multiple ingredients eaten the same day) isn't controlled for. The more consistently you log, the more the numbers mean.

## Data & privacy

Your diary, product cache and settings are stored only in `localStorage` in this browser, on this device — nothing is sent to a server except the barcode lookups to Open Food Facts and the OCR/scanning libraries, which run client-side. There is no account, sync, or automatic backup: use **Settings → Export diary as JSON** periodically if you don't want to risk losing data to a cleared browser, reinstalled PWA, or new device.

Ingredient photos are compressed before being stored (resized and re-compressed to keep `localStorage` usage low over months of logging); the original high-resolution photo is only used transiently for OCR and isn't kept.

## Offline behaviour

A service worker (`sw.js`) precaches the app shell (HTML/CSS/JS, icons), the Google Fonts stylesheet, and the third-party libraries (Quagga2, Tesseract.js, CropperJS) on first successful load, so the app continues to open and basic scanning/cropping keeps working without a connection afterwards. Barcode lookups against Open Food Facts still require a connection; cached products (already looked up once) work offline.

**If you edit `app.js`, `styles.css`, `index.html`, or the icons: bump `CACHE_VERSION` in `sw.js`.** Otherwise installed devices may keep serving the old cached versions of those files.

## Visual identity

v5.0 moved off the original light green theme to a dark, editorial "field notebook" look: near-black warm charcoal background, parchment-toned text, Fraunces for headlines, Archivo for body/UI, IBM Plex Mono for labels and data. Three accent colours carry meaning rather than decoration: amber (`--trace`) for active/tracking states, teal (`--safe`) for comfortable/clear results, rust (`--flag`) for symptom/allergen flags. All colours and fonts are CSS custom properties in `styles.css` (`:root`) — change them there rather than hunting through individual rules.

## Supplements & medications

A separate "Supplements & meds" section on the Today screen logs vitamins, supplements, and prescription/OTC drugs alongside food — because these can cause GI symptoms indistinguishable from a food intolerance, and were previously invisible to the diary entirely.

Each entry gets a **silent side-effect check**, tiered by what data actually exists:

- **Vitamins/supplements**: checked against a small curated reference list of common GI-related side effects (magnesium, iron, fish oil, probiotics, high-dose vitamin C, etc.). There's no free, authoritative structured database for supplement side effects (they aren't FDA-regulated the way drugs are), so this list is a practical starting point, not a comprehensive one — treat it as a nudge to Google the specific product, not a verdict.
- **Prescription/OTC drugs**: checked against [openFDA's public drug label API](https://open.fda.gov/apis/drug/label/) (free, no key required) by brand or generic name, scanning the label's adverse-reactions/warnings text for GI-symptom keywords (diarrhoea, nausea, bloating, cramping, etc.).

The lookup runs **after** the entry is saved and the dialog is closed — it never blocks on a slow or missing network connection, and if it finds nothing (or the request fails), nothing is shown. If it does find a match, a tag appears on the entry, e.g. "Diarrhoea, Bloating" with its source.

Separately from that flag, supplement and medication names are also fed into the same pattern-matching engine used for food ingredients (Report → Possible connections, Trends), so if your own data shows a personal correlation the database wouldn't know about — say, your specific fish oil brand — that still surfaces on its own.

**Known limitation**: the openFDA lookup depends on that API allowing cross-origin requests directly from a browser. It's a public API intended for this kind of use and has worked in testing, but if you ever see prescription lookups silently doing nothing where you'd expect a match, that's the first thing to check (openFDA's status, or whether a lightweight proxy is needed).

## Known limitations


- OCR quality depends on photo quality/lighting; always cross-check the original packaging for anything allergy-relevant — this is stated in-app too.
- Open Food Facts is community-maintained; product data can be missing or incomplete.
- Association/trend results are statistical patterns in your own diary, not a medical assessment, and don't control for multiple foods eaten the same day.
- Single-device only — see Data & privacy above.
