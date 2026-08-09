# Intolearn — by Lee Thumwood

Personal-use prototype.

## Run it

Open `index.html` in a modern browser.

For best results, serve the folder with a tiny local server:

```bash
python -m http.server 8000
```

Then open:

http://localhost:8000

## Included in this first version

- Mobile-first Today screen
- Breakfast, Lunch, Dinner, Snacks & Drinks
- Ingredient list entry
- Ingredient photo capture/attachment
- Exit Interview with visual choices
- Symptoms and daily notes
- Weekly summary
- Monthly calendar and filtering
- Simple local trend analysis
- Local browser storage
- JSON export
- Intolearn / by Lee Thumwood branding

## Important prototype note

Ingredient photos are captured and stored locally, but OCR is not yet connected. The ingredients can be entered/edited manually after taking the photo. Real OCR can be added in the next stage using a browser OCR library or a hosted vision service.

The trend screen reports associations in diary data only and does not diagnose food intolerance.


## v2 interaction fixes

- Save now closes the meal entry dialog and shows a confirmation toast.
- X and Cancel always close without triggering required-field validation.
- Existing meal entries can now be opened and edited.
- Meal entries can be deleted, with confirmation.
- Existing local diary data remains compatible.

## v3 ingredient scanning

- Browser-based OCR reads photographed ingredient labels automatically.
- OCR text is inserted into the Ingredients field for review/editing.
- Ingredient-family tagging detects dairy, wheat/gluten, egg, soya, onion, garlic, legumes, nuts, sesame, fish, shellfish, mustard, celery, sulphites, tomato, chilli and common polyol sweeteners.
- Tracking groups are saved with meal entries for future trend analysis.
- OCR runs in the browser. The first scan may take longer while the recognition engine loads.
