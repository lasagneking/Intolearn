# Intolearn

Personal-use prototype. Current build: **v7.6**.

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

1. **A configurable reaction window** (Trends → "Reaction window"): Same day / Next day (default) / Up to 3 days. A day counts as a "reaction" if symptoms were logged anywhere within that window, since delayed food reactions vary a lot person to person — there's no single correct default, so rather than guess at a fixed lag or a clever decay-weighted scheme neither of us could validate against your actual body, it's just an explicit, transparent setting you control. Widening it catches more genuinely delayed reactions, but also more coincidences — the tradeoff is real either way, so this is deliberately visible rather than hidden behind one hardcoded assumption. It affects both Trends and Report (Possible Connections, Known Suspects) — one setting, not two to keep in sync — and persists in its own `localStorage` key (`intolearn_reaction_window_v1`), separate from your diary.
2. **A personal baseline, not a raw rate.** Ingredients you eat almost every day are excluded (they can't tell you anything — everything correlates with them). Of what's left, only ingredients whose symptom rate is meaningfully above your own overall baseline rate are shown, rather than anything that's ever co-occurred with a symptom twice.

This still isn't a diagnosis — it's association within your own logged data, and confounding (multiple ingredients eaten the same day) isn't controlled for. The more consistently you log, the more the numbers mean.

## Portion size & cooking method

Every food entry now also captures a rough **portion size** (Small/Medium/Large, defaulting to Medium), an optional free-text **quantity** (e.g. "2 slices", "1 bowl" — for when a count matters more than relative size), and an optional **cooking method** (raw, boiled, roasted, fried, air-fried, etc.).

These aren't just descriptive — they're clinically relevant and worth a medical professional's attention:
- Most food *intolerances* (as opposed to true allergies) are dose-dependent — a splash of milk versus a bowl of cereal can be the difference between fine and symptomatic. Without portion context, "had milk, had symptoms" and "had milk, no symptoms" look identical in the data.
- Cooking method matters for conditions like Oral Allergy Syndrome (pollen-food cross-reactivity), where many people tolerate a cooked version of a fruit/vegetable that raw would trigger symptoms — an apparent inconsistency in a diary ("apple was fine Tuesday, wasn't Thursday") can turn out to be fully explained by raw vs. cooked.

"Large portion" and each cooking method also feed into the same correlation engine used for ingredients (Report → Possible Connections, Trends) — so "large portions" or "fried food" specifically can surface as their own pattern, separate from the ingredient itself.

## Month view

The calendar week now starts Monday (UK convention) with day-of-week headers above the grid. Good/rough/mixed days carry a soft glow matching their colour, on top of the existing background tint and border — a deliberate exception to the flat/no-glow system, same reasoning as the pulsing side-effect flags: these are the two places in the app meant to catch your eye at a glance rather than blend in.

Tapping any day opens a read-only breakdown (Exit Interview summary, each meal, supplements/meds logged that day) — and tapping any entry within that breakdown jumps straight into its full edit dialog, the same one used from Today.

## Backup & restore (Settings)

There's no cloud sync — everything lives in this browser's `localStorage` on this one device, so a backup is the only real protection against a cleared cache, a browser update gone wrong, or switching phones.

- **Back up**: on iOS/Safari this uses the native Share Sheet (`navigator.share` with a file), so "Back up now" lets you save straight to Files/iCloud Drive, AirDrop it, or send it to yourself — not just a browser download, which behaves inconsistently for an installed home-screen PWA anyway. Falls back to a plain download on browsers that don't support file sharing.
- **Restore**: pick a previously-saved backup file and it replaces everything currently in this browser, after a confirmation showing how many days are in each side of the swap. This didn't exist before v7.6 — there was an export button but no way back in, which meant it wasn't really a backup, just a one-way dump.
- **The reminder**: a quiet "Back up your diary" notice appears at the bottom of Today, but only once there's at least 5 days of real data logged *and* it's been 21+ days since the last backup (or you've never done one). No badge, no red dot, no daily nagging — it disappears the moment you back up, and stays invisible entirely until there's something worth losing.
- **Known limitation**: restoring is a full replace, not a merge — if you've logged new entries on this device since your last backup, restoring an older file loses them. Worth exporting immediately before restoring if that matters to you.

## Data & privacy

Whether each Today section (Breakfast, Lunch, Dinner, Snacks & Drinks, Supplements & meds) is collapsed or expanded is a display preference, stored under its own `localStorage` key (`intolearn_collapse_v1`) separate from your diary — so it doesn't clutter JSON exports or feed into the correlation engine.

Your diary, product cache and settings are stored only in `localStorage` in this browser, on this device — nothing is sent to a server except the barcode lookups to Open Food Facts and the OCR/scanning libraries, which run client-side. There is no account, sync, or automatic backup: use **Settings → Export diary as JSON** periodically if you don't want to risk losing data to a cleared browser, reinstalled PWA, or new device.

Ingredient photos are compressed before being stored (resized and re-compressed to keep `localStorage` usage low over months of logging); the original high-resolution photo is only used transiently for OCR and isn't kept.

## Offline behaviour

A service worker (`sw.js`) precaches the app shell (HTML/CSS/JS, icons), the Google Fonts stylesheet, and the third-party libraries (Quagga2, Tesseract.js, CropperJS) on first successful load, so the app continues to open and basic scanning/cropping keeps working without a connection afterwards. Barcode lookups against Open Food Facts still require a connection; cached products (already looked up once) work offline.

**If you edit `app.js`, `styles.css`, `index.html`, or the icons: bump `CACHE_VERSION` in `sw.js`, AND bump the `?v=NN` query string on both the `app.js` and `styles.css` `<link>`/`<script>` tags in `index.html` (keep them in sync — a mismatch was the cause of a real bug in v5.4, where a stale cached stylesheet had no rule for a new element the JS had started injecting, and it rendered fully unstyled).** Otherwise installed devices, and even a plain browser HTTP cache with no service worker involved, may keep serving an old file indefinitely.

## Onboarding & profile

On first launch, Intolearn asks for a name (used for the "Good morning/afternoon/evening" greeting), an optional photo (replaces the settings gear in the top bar with your photo, or your initial if no photo is set), and any known allergies/intolerances — picked from the same 22-item list used in Ingredient Checker. Whatever's selected there becomes the **default pre-selected set** every time you open Ingredient Checker afterward; you can still add or remove ingredients per-check without changing your saved defaults.

Tap your avatar (top right) → **Edit profile** to change any of this later. "Clear all local data" in Settings also resets the profile and re-triggers onboarding, since it's a fresh start.

## Visual identity

v5.0 moved off the original light green theme to a dark, editorial "field notebook" look: near-black warm charcoal background, parchment-toned text, Fraunces for headlines, Archivo for body/UI, IBM Plex Mono for labels and data. Three accent colours carry meaning rather than decoration: amber (`--trace`) for active/tracking states, teal (`--safe`) for comfortable/clear results, rust (`--flag`) for symptom/allergen flags. All colours and fonts are CSS custom properties in `styles.css` (`:root`) — change them there rather than hunting through individual rules.

All icons are hand-drawn single-stroke line SVGs using `currentColor` (so they inherit ink/amber automatically on selected/active states) — this includes the 22-item allergen/trigger grid shared by Ingredient Checker and onboarding (v6.2), which was the last remaining spot still using native emoji. The icon set lives in the `ICONS` and `ALLERGEN_ICONS` objects near the top of `app.js`; `renderAllergenGridIcons()` applies the allergen set to both grid instances from one shared map, rather than duplicating 22 SVGs twice in the HTML.

The top bar (v6.7, expanded v7.5) has five of those same icons (wheat, milk, egg, peanut, chilli) drifting very faintly behind the wordmark — `opacity:.05`, independent CSS keyframe loops, 33-48s per cycle (sped up in v7.5 from an original 50-74s, and given two more icons once the safe-area-inset fix opened up extra vertical room in the header). It's `aria-hidden` and wrapped in `@media (prefers-reduced-motion: no-preference)`, so it's silent to screen readers and simply doesn't animate for anyone with that OS setting on. Since this sits on every screen (unlike the calendar glow or side-effect pulse, which only appear when relevant), it's deliberately the most restrained of the "exception to flat design" moments — meant to be felt more than seen.

**App icon (v7.3)**: redesigned again after the magnifying-glass version turned out too muddy at real icon size — replaced with a bold italic "I" (echoing the wordmark's first letter) with a two-leaf sprout growing out of the top, plus the same small amber accent dot used on tile icons throughout the app. Simpler than the magnifying-glass version, reads clearly even at 192px, and ties directly to the wordmark rather than being a separate illustration. Built as one SVG (`icon-192.png`, `icon-512.png`, `apple-touch-icon.png` all rasterized from it) rather than three hand-edited files.

**Important iOS limitation**: the home-screen icon is captured once when you "Add to Home Screen" and does not refresh automatically afterward — this isn't a caching issue cache-busting can fix, it's just how iOS handles PWA icons. To see the new icon, delete the existing Intolearn icon from the home screen and re-add it via Safari's "Add to Home Screen" again.

## Printable food diary for a doctor (Settings → "Print food diary for a doctor")

Generates a clean, light-background printable page covering the last 3/7/14 days: for each day, a table of everything eaten and drunk (time, meal, food, quantity, cooking method, notes), plus supplements/meds taken and an Exit Interview summary. Structured to match what a typical NHS dietetic food-diary request form asks for — time-stamped entries, household-measure quantities, and how food was prepared, though of course actual requirements vary by service, so it's always worth checking what your specific appointment letter asks for.

It uses the browser's native print (Share → Print → Save to PDF on iOS), not a generated PDF file — no extra library needed, and it works offline. This is the one screen in the app that deliberately breaks from the dark theme: black text on white, since that's what actually prints and photocopies well.

**Gaps worth knowing about**: some food-diary request forms (particularly for weight-management services) also ask for hunger/fullness ratings, why you were eating, mood, and physical activity/exercise — Intolearn doesn't have dedicated fields for any of those. Mood is partially covered by Exit Interview's "how do you feel," but hunger/fullness and exercise aren't tracked at all currently. If your own appointment specifically asks for those, the per-meal Notes field is a reasonable place to jot them freehand — they'll show up in the "Notes" column of the printout.

## Elimination trials

Everything else in Intolearn watches passively and reports patterns after the fact. This is the one feature that lets you actually *test* a suspect deliberately — the same elimination/reintroduction method a dietitian would run.

**Starting one** (Today → "Start a trial"): name what you're removing, how many days to eliminate it, how many days to reintroduce it afterward (defaults: 14 and 3). From that point on, Today shows a running "Day X of Y — eliminating/reintroducing [ingredient]" status instead of the launch card, computed purely from dates — no daily check-in required.

**Contamination watch**: while a trial is in its eliminating phase, saving a food entry checks the name and ingredients against what you're eliminating. A match doesn't block the save — it just swaps the usual "Entry saved" toast for a heads-up, so an accidental slip doesn't quietly go unnoticed and doesn't need to be treated as a hard rule you might resent.

**Results** (Report → "Elimination Trials", above Possible Connections): for each trial, past or in-progress, a symptomatic-day rate for the week *before* the trial started, during elimination, and during reintroduction. This is placed above the passive Possible Connections panel deliberately — a trial you ran and controlled yourself is stronger evidence than a correlation the app inferred, and the ordering reflects that.

**Honest limits**: one trial's "before" baseline is only 7 days and isn't itself immune to coincidence — a single trial suggests, it doesn't prove. Multiple foods eaten during the same window still aren't disentangled from each other. And like everything else here, this isn't a diagnosis; it's a more structured way of gathering your own evidence, which a clinician can act on more easily than the same evidence would be without something like this to keep it consistent.

## Supplements & medications

A separate "Supplements & meds" section on the Today screen logs vitamins, supplements, and prescription/OTC drugs alongside food — because these can cause GI symptoms indistinguishable from a food intolerance, and were previously invisible to the diary entirely.

Each entry gets a **silent side-effect check**, tiered by what data actually exists:

- **Vitamins/supplements**: checked against a small curated reference list of common GI-related side effects (magnesium, iron, fish oil, probiotics, high-dose vitamin C, etc.). There's no free, authoritative structured database for supplement side effects (they aren't FDA-regulated the way drugs are), so this list is a practical starting point, not a comprehensive one — treat it as a nudge to Google the specific product, not a verdict.
- **Prescription/OTC drugs**: checked against [openFDA's public drug label API](https://open.fda.gov/apis/drug/label/) (free, no key required) by brand or generic name, scanning the label's adverse-reactions/warnings text for GI-symptom keywords (diarrhoea, nausea, bloating, cramping, etc.).

The lookup runs **after** the entry is saved and the dialog is closed — it never blocks on a slow or missing network connection, and if it finds nothing (or the request fails), nothing is shown. If it does find a match, a tag appears on the entry, e.g. "Diarrhoea, Bloating" with its source.

Separately from that flag, supplement and medication names are also fed into the same pattern-matching engine used for food ingredients (Report → Possible connections, Trends), so if your own data shows a personal correlation the database wouldn't know about — say, your specific fish oil brand — that still surfaces on its own.

### Known suspects vs. Possible connections

These are two deliberately different systems, and it matters which one you're reading:

- **Possible connections** (Report, Trends) finds patterns in *your* data only — it has no idea what a drug label says. It also excludes anything you have on more than ~85% of your logged days, because there's no symptom-free contrast day to compare against, so it can't tell you anything about something you take constantly.
- **Known suspects** (Report, above Possible connections) shows every currently-flagged supplement/medication regardless of how often you take it, because a database flag is independent evidence that doesn't need a statistical contrast day to be worth acting on. A daily antibiotic that's *already* known to cause diarrhoea would be invisible to Possible connections but still shows here.

The Today screen also shows a quiet "Worth keeping in mind today" notice whenever something logged for today has a side-effect flag — it only appears when relevant, so it doesn't compete with the main food-logging flow on ordinary days.

### Recurring courses

When adding a new supplement or medication, "How often?" offers three options:
- **Just today** — a one-off entry, the original behaviour.
- **Every day** — logs itself automatically every day from now on, with no need to re-enter it, until you tap **Stop** on it (shown in a small "active courses" list on the Today screen).
- **Fixed course** (e.g. a 10-day antibiotic) — logs itself automatically for exactly that many days, then stops on its own.

Each day's entry is a normal, independent diary entry once created (editing one day doesn't change other days), so the correlation engine and Report see them exactly like any other entry. Deleting a single day's auto-logged entry only skips that one day — the course keeps running; use **Stop** on the course itself to end it early. Recurrence can only be set when creating a new entry, not when editing an existing one, to avoid accidentally spinning up a second course.

**Known limitation**: the openFDA lookup depends on that API allowing cross-origin requests directly from a browser. It's a public API intended for this kind of use and has worked in testing, but if you ever see prescription lookups silently doing nothing where you'd expect a match, that's the first thing to check (openFDA's status, or whether a lightweight proxy is needed).

## Known limitations


- OCR quality depends on photo quality/lighting; always cross-check the original packaging for anything allergy-relevant — this is stated in-app too.
- Open Food Facts is community-maintained; product data can be missing or incomplete.
- Association/trend results are statistical patterns in your own diary, not a medical assessment, and don't control for multiple foods eaten the same day.
- Single-device only — see Data & privacy above.
