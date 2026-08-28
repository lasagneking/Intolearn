
const STORAGE_KEY = "intolearn_personal_v1";
const PRODUCT_CACHE_KEY = "intolearn_product_cache_v1";
const PRODUCT_CACHE_SCHEMA = 2;
const APP_VERSION = "8.2";

// Hand-sketched, single-stroke "field notebook" icon set — every icon uses
// currentColor so it inherits ink/amber automatically on selected/active
// states. Icons sitting in a fixed-background tile also carry a small amber
// dot, like a specimen tag, as the set's one recurring flourish.
const SVG_BASE='fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"';
const ICONS={
  breakfast:`<svg viewBox="0 0 24 24" ${SVG_BASE}><path d="M3.5 17.5h17"/><path d="M7.5 17.5a4.5 4.5 0 0 1 9 0"/><path d="M12 12.5V8.5M8.3 10.2 7 9M15.7 10.2 17 9"/><circle cx="18.5" cy="5.3" r="1.3" fill="var(--trace)" stroke="none"/></svg>`,
  lunch:`<svg viewBox="0 0 24 24" ${SVG_BASE}><circle cx="11.5" cy="12.5" r="4"/><path d="M11.5 5v-1M11.5 20v-1M4.5 12.5h-1M19.5 12.5h-1M6.7 7.7l-.7-.7M17 17.9l-.7-.7M16.3 7.7l.7-.7M6 17.9l.7-.7"/><circle cx="19" cy="5" r="1.3" fill="var(--trace)" stroke="none"/></svg>`,
  dinner:`<svg viewBox="0 0 24 24" ${SVG_BASE}><path d="M15.8 4.6A7.4 7.4 0 1 0 19.3 17a6 6 0 0 1-3.5-12.4Z"/><path d="M19 4.3v2.4M17.8 5.5h2.4" stroke-width="1.3"/><circle cx="6" cy="18.5" r="1.1" fill="var(--trace)" stroke="none"/></svg>`,
  snacks:`<svg viewBox="0 0 24 24" ${SVG_BASE}><path d="M12 9c-2-2.6-5.6-2-6.6.6-1.2 3 .7 8.4 4 9.7 1 .4 1.7.4 2.6 0 .9.4 1.6.4 2.6 0 3.3-1.3 5.2-6.7 4-9.7-1-2.6-4.6-3.2-6.6-.6Z"/><path d="M12 9c0-1.6.6-2.8 1.8-3.6"/><path d="M14.2 4.4c1 0 1.9.5 2.3 1.4-1 .4-2 0-2.3-1.4Z"/><circle cx="19" cy="4" r="1.2" fill="var(--trace)" stroke="none"/></svg>`,
  door:`<svg viewBox="0 0 24 24" ${SVG_BASE}><rect x="6" y="3" width="12" height="18" rx="0.5"/><circle cx="14.3" cy="12.2" r="0.9" fill="currentColor" stroke="none"/><circle cx="19" cy="4.5" r="1.2" fill="var(--trace)" stroke="none"/></svg>`,
  pill:`<svg viewBox="0 0 24 24" ${SVG_BASE}><rect x="3.5" y="9.8" width="17" height="7.4" rx="3.7" transform="rotate(-35 12 12)"/><path d="M12 12 8.8 15.2" stroke-width="1.6"/><circle cx="19" cy="4.5" r="1.2" fill="var(--trace)" stroke="none"/></svg>`,
  search:`<svg viewBox="0 0 24 24" ${SVG_BASE}><circle cx="10.5" cy="10.5" r="6"/><path d="M15 15l5.5 5.5"/><path d="M7.8 10.5c0-1.6 1.2-2.7 2.7-2.7" stroke-width="1.3"/><circle cx="19" cy="4.5" r="1.1" fill="var(--trace)" stroke="none"/></svg>`,
  // Feeling / mood: a small "vitals monitor" waveform, escalating from a
  // falling line (poor) to a calm blip (fine) to a rising line (great) —
  // fits a symptom diary better than generic faces.
  great:`<svg viewBox="0 0 24 24" ${SVG_BASE}><path d="M4 16 9.5 9l3.5 4 7-8"/><path d="M16.5 5h3.5v3.5"/></svg>`,
  fine:`<svg viewBox="0 0 24 24" ${SVG_BASE}><path d="M4 12h4l2-3 3 6 2-3h5"/></svg>`,
  meh:`<svg viewBox="0 0 24 24" ${SVG_BASE}><path d="M3.5 13c2-3 4-3 6 0s4 3 6 0 4-3 6 0"/></svg>`,
  poor:`<svg viewBox="0 0 24 24" ${SVG_BASE}><path d="M4 8 9.5 15l3.5-4 7 8"/><path d="M16.5 19h3.5v-3.5"/></svg>`,
  checkClear:`<svg viewBox="0 0 24 24" ${SVG_BASE}><path d="M4.5 12.5 9 17l10.5-11"/></svg>`,
  checkAlert:`<svg viewBox="0 0 24 24" ${SVG_BASE}><path d="M12 4 21 19H3Z"/><path d="M12 10v3.4"/><circle cx="12" cy="16.2" r="0.35" fill="currentColor" stroke="currentColor" stroke-width="1.6"/></svg>`,
  noData:`<svg viewBox="0 0 24 24" ${SVG_BASE}><path d="M5 12h14" stroke-dasharray="2.2 3.4" opacity="0.55"/></svg>`,
  calendarDot:`<svg viewBox="0 0 24 24" ${SVG_BASE}><rect x="3.5" y="5" width="17" height="15" rx="0.5"/><path d="M3.5 9.5h17M8 3v3.5M16 3v3.5"/><circle cx="12" cy="14.5" r="1.3" fill="currentColor" stroke="none"/></svg>`,
  plate:`<svg viewBox="0 0 24 24" ${SVG_BASE}><circle cx="11" cy="12" r="7.5"/><circle cx="11" cy="12" r="3.6"/><path d="M18.5 6v12"/></svg>`,
  camera:`<svg viewBox="0 0 24 24" ${SVG_BASE}><path d="M4 8.5h3l1.4-2h5.2l1.4 2H20V19H4Z"/><circle cx="12" cy="13.2" r="3.3"/></svg>`,
  clipboard:`<svg viewBox="0 0 24 24" ${SVG_BASE}><rect x="5.5" y="4.5" width="13" height="16" rx="0.5"/><rect x="9" y="3" width="6" height="3" rx="0.5"/><path d="M8.5 11h7M8.5 14.5h7M8.5 18h4.5"/></svg>`,
  tally:`<svg viewBox="0 0 24 24" ${SVG_BASE}><path d="M5 6.5h11M5 12h14M5 17.5h8"/></svg>`,
  gear:`<svg viewBox="0 0 24 24" ${SVG_BASE}><circle cx="12" cy="12" r="3.2"/><path d="M12 3.5v2.3M12 18.2v2.3M20.5 12h-2.3M5.8 12H3.5M17.7 6.3l-1.6 1.6M7.9 16.1l-1.6 1.6M17.7 17.7l-1.6-1.6M7.9 7.9 6.3 6.3"/></svg>`,
  trial:`<svg viewBox="0 0 24 24" ${SVG_BASE}><circle cx="11" cy="12" r="7.5"/><path d="M6 6.5l10 11"/><circle cx="19" cy="4.5" r="1.1" fill="var(--trace)" stroke="none"/></svg>`
};

// Icons for the 22-item allergen/trigger grid shared by Ingredient Checker
// and onboarding. Keyed by the exact data-trigger value so one map covers
// both instances of the grid without duplicating 22 SVGs twice in the HTML.
const ALLERGEN_ICONS={
  "Cereals containing gluten":`<svg viewBox="0 0 24 24" ${SVG_BASE}><path d="M12 20V4"/><path d="M12 6l-2.4-1.4M12 6l2.4-1.4M12 9.2l-2.4-1.4M12 9.2l2.4-1.4M12 12.4l-2.4-1.4M12 12.4l2.4-1.4M12 15.6l-2.4-1.4M12 15.6l2.4-1.4"/></svg>`,
  "Wheat":`<svg viewBox="0 0 24 24" ${SVG_BASE}><path d="M12 20V4"/><path d="M12 6l-2.4-1.4M12 6l2.4-1.4M12 9.2l-2.4-1.4M12 9.2l2.4-1.4M12 12.4l-2.4-1.4M12 12.4l2.4-1.4M12 15.6l-2.4-1.4M12 15.6l2.4-1.4"/></svg>`,
  "Milk / dairy":`<svg viewBox="0 0 24 24" ${SVG_BASE}><path d="M9 4h6l-1 3v12a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V7Z"/><path d="M8.5 10.5h7"/></svg>`,
  "Lactose":`<svg viewBox="0 0 24 24" ${SVG_BASE}><path d="M9 4h6l-1 3v12a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V7Z"/><path d="M8.5 10.5h7"/></svg>`,
  "Egg":`<svg viewBox="0 0 24 24" ${SVG_BASE}><path d="M12 3.8c-3.2 3.2-5.3 8-5.3 11.3a5.3 5.3 0 1 0 10.6 0c0-3.3-2.1-8.1-5.3-11.3Z"/></svg>`,
  "Soya":`<svg viewBox="0 0 24 24" ${SVG_BASE}><path d="M7.5 14.5c0-5 2-9 6-10.5"/><path d="M16.5 9c0 5-2 9-6 10.5"/><circle cx="10.3" cy="9.3" r=".9" fill="currentColor" stroke="none"/><circle cx="12" cy="13" r=".9" fill="currentColor" stroke="none"/><circle cx="13.7" cy="16.7" r=".9" fill="currentColor" stroke="none"/></svg>`,
  "Peanuts":`<svg viewBox="0 0 24 24" ${SVG_BASE}><path d="M9.3 4.8a2.8 2.8 0 0 0-2.8 2.8c0 .9.4 1.5.9 2-1 .7-1.5 1.7-1.5 3.1a3.1 3.1 0 0 0 3.1 3.1c.9 0 1.6-.3 2.1-.8.5.5 1.2.8 2.1.8a3.1 3.1 0 0 0 3.1-3.1c0-1.4-.5-2.4-1.5-3.1.5-.5.9-1.1.9-2a2.8 2.8 0 0 0-2.8-2.8c-.9 0-1.6.4-2.1.9-.5-.5-1.2-.9-2.1-.9Z"/></svg>`,
  "Tree nuts":`<svg viewBox="0 0 24 24" ${SVG_BASE}><path d="M8.3 11.2a3.7 3.7 0 0 1 7.4 0c0 3.2-1.6 7.4-3.7 9.5-2.1-2.1-3.7-6.3-3.7-9.5Z"/><path d="M8.1 10.6c0-2.1 1.7-3.2 3.9-3.2s3.9 1.1 3.9 3.2"/></svg>`,
  "Sesame":`<svg viewBox="0 0 24 24" ${SVG_BASE}><ellipse cx="12" cy="13.5" rx="2.8" ry="4.6" transform="rotate(12 12 13.5)"/><path d="M12 8.2V4M12 4l-1.6 1.6M12 4l1.6 1.6"/></svg>`,
  "Fish":`<svg viewBox="0 0 24 24" ${SVG_BASE}><path d="M3 12c2-2.3 5-3.7 8.3-3.7 2 0 3.9.6 5.3 1.7L20.5 8v8l-3.9-2c-1.4 1.1-3.3 1.7-5.3 1.7C8 15.7 5 14.3 3 12Z"/><circle cx="8" cy="11" r=".6" fill="currentColor" stroke="none"/></svg>`,
  "Crustaceans":`<svg viewBox="0 0 24 24" ${SVG_BASE}><path d="M5 15.3c0-4.8 3-8.8 7.8-8.8 2.9 0 4.7 1.9 4.7 4.3 0 1.9-1.4 3.4-3.3 3.4-1 1.9-2.9 3.3-5.3 3.3-1.4 0-2.9-.7-3.9-2.2Z"/><path d="M8.4 5.8l-1.5-1.4M10.4 4.9l-1-1.9"/></svg>`,
  "Molluscs":`<svg viewBox="0 0 24 24" ${SVG_BASE}><path d="M4 14.8c1.8-5.6 5.6-9.3 8-9.3s6.2 3.7 8 9.3c-2.4 1.9-5.3 2.9-8 2.9s-5.6-1-8-2.9Z"/><path d="M12 5.5v9.6M9.2 6.9c0 2.8.9 6 2.8 7.8M14.8 6.9c0 2.8-.9 6-2.8 7.8"/></svg>`,
  "Celery":`<svg viewBox="0 0 24 24" ${SVG_BASE}><path d="M12 20V9"/><path d="M12 9c0-2.8 1.4-4.6 3.7-5.5M12 9c0-2.3-.9-4-2.7-4.9"/><path d="M9.2 20h5.6"/></svg>`,
  "Mustard":`<svg viewBox="0 0 24 24" ${SVG_BASE}><circle cx="12" cy="13" r="3"/><path d="M12 10V6.3M10.3 6.3h3.4"/></svg>`,
  "Sulphites":`<svg viewBox="0 0 24 24" ${SVG_BASE}><path d="M10 3.3h4M10.4 3.3v5l-4.4 7.8a2 2 0 0 0 1.7 3h8.6a2 2 0 0 0 1.7-3l-4.4-7.8v-5"/><path d="M8.3 14.8h7.4"/></svg>`,
  "Lupin":`<svg viewBox="0 0 24 24" ${SVG_BASE}><circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none"/><path d="M12 10.5c0-2 1-3.3 2.6-3.3M12 10.5c0-2-1-3.3-2.6-3.3M13.5 12c2 0 3.3 1 3.3 2.6M10.5 12c-2 0-3.3 1-3.3 2.6M12 13.5c0 2-1 3.3-2.6 3.3M12 13.5c0 2 1 3.3 2.6 3.3"/></svg>`,
  "Onion":`<svg viewBox="0 0 24 24" ${SVG_BASE}><path d="M12 5.2c2.8 2.1 4.3 5.2 4.3 8.5A4.3 4.3 0 0 1 12 18a4.3 4.3 0 0 1-4.3-4.3c0-3.3 1.5-6.4 4.3-8.5Z"/><path d="M12 5.2V2.8"/></svg>`,
  "Garlic":`<svg viewBox="0 0 24 24" ${SVG_BASE}><path d="M12 4.2c2.4 2 3.8 4.9 3.8 8.1A3.8 3.8 0 0 1 12 16.1a3.8 3.8 0 0 1-3.8-3.8c0-3.2 1.4-6.1 3.8-8.1Z"/><path d="M12 4.2v11.9M9.9 7.4c.6.6.9 1.4.9 2.5M14.1 7.4c-.6.6-.9 1.4-.9 2.5"/><path d="M9.7 17.3h4.6"/></svg>`,
  "Chilli":`<svg viewBox="0 0 24 24" ${SVG_BASE}><path d="M9 5.3c.9 0 1.7.4 2 1.2M9.2 6.7c-2.4 1-3.9 3.8-3.9 6.6a4.7 4.7 0 0 0 4.7 4.7c3.7 0 7.5-3.8 7.5-8.5 0-1.9-.9-3.3-2.3-3.8"/></svg>`,
  "Tomato":`<svg viewBox="0 0 24 24" ${SVG_BASE}><circle cx="12" cy="13.5" r="5.7"/><path d="M12 7.8c-.9-1.2-.9-2.1 0-3.1M12 7.8c.9-1.2.9-2.1 0-3.1M9.7 6.7c.9.3 1.6.8 2.3 1.5M14.3 6.7c-.9.3-1.6.8-2.3 1.5"/></svg>`,
  "Legumes / pulses":`<svg viewBox="0 0 24 24" ${SVG_BASE}><path d="M7.5 14.5c0-5 2-9 6-10.5"/><path d="M16.5 9c0 5-2 9-6 10.5"/><circle cx="10.3" cy="9.3" r=".9" fill="currentColor" stroke="none"/><circle cx="12" cy="13" r=".9" fill="currentColor" stroke="none"/><circle cx="13.7" cy="16.7" r=".9" fill="currentColor" stroke="none"/></svg>`,
  "Sweeteners":`<svg viewBox="0 0 24 24" ${SVG_BASE}><circle cx="7.4" cy="15.3" r="1.9"/><circle cx="16.6" cy="15.3" r="1.9"/><circle cx="12" cy="7.4" r="1.9"/><path d="M9.1 13.7 10.4 9.3M14.9 13.7 13.6 9.3M9.3 15.3h5.4"/></svg>`
};
function renderAllergenGridIcons(){
  document.querySelectorAll(".checker-trigger-grid button[data-trigger]").forEach(btn=>{
    const icon=ALLERGEN_ICONS[btn.dataset.trigger];
    if(!icon || btn.dataset.iconApplied) return;
    const label=btn.textContent.trim().replace(/^\S+\s*/,"");
    btn.innerHTML=`${icon}<span>${escapeHtml(label)}</span>`;
    btn.dataset.iconApplied="1";
  });
}
function moodIcon(feeling){
  return ICONS[({Great:"great",Fine:"fine",Meh:"meh",Poor:"poor"})[feeling]||"fine"];
}

const mealTypes = [
  {key:"breakfast", label:"Breakfast", icon:ICONS.breakfast},
  {key:"lunch", label:"Lunch", icon:ICONS.lunch},
  {key:"dinner", label:"Dinner", icon:ICONS.dinner},
  {key:"snacks", label:"Snacks & Drinks", icon:ICONS.snacks}
];


const ukAllergens = [
  {name:"Cereals containing gluten", terms:["wheat","spelt","khorasan","rye","barley","oats","oat","malt"]},
  {name:"Crustaceans", terms:["crustacean","prawn","prawns","shrimp","shrimps","crab","lobster","crayfish"]},
  {name:"Egg", terms:["egg","eggs","albumen","egg white","egg yolk"]},
  {name:"Fish", terms:["fish","salmon","tuna","cod","haddock","anchovy","anchovies"]},
  {name:"Peanuts", terms:["peanut","peanuts","groundnut","groundnuts"]},
  {name:"Soya", terms:["soya","soy","soybean","soybeans","soy lecithin","soya lecithin"]},
  {name:"Milk", terms:["milk","cream","whey","casein","caseinate","butter","cheese","yoghurt","yogurt","lactose","milk powder","skimmed milk"]},
  {name:"Tree nuts", terms:["almond","almonds","hazelnut","hazelnuts","walnut","walnuts","cashew","cashews","cashew nut","cashew nuts","pecan","pecans","pistachio","pistachios","macadamia","macadamias","brazil nut","brazil nuts"]},
  {name:"Celery", terms:["celery","celeriac"]},
  {name:"Mustard", terms:["mustard"]},
  {name:"Sesame", terms:["sesame","tahini"]},
  {name:"Sulphites", terms:["sulphite","sulphites","sulfite","sulfites","sulphur dioxide","sulfur dioxide"]},
  {name:"Lupin", terms:["lupin"]},
  {name:"Molluscs", terms:["mollusc","molluscs","mussel","mussels","oyster","oysters","scallop","scallops","squid","octopus"]}
];

const ingredientFamilies = [
  {name:"Onion", terms:["onion","onions","onion powder"]},
  {name:"Garlic", terms:["garlic","garlic purée","garlic puree","garlic powder"]},
  {name:"Legumes / pulses", terms:["pea","peas","chickpea","chickpeas","lentil","lentils","bean","beans"]},
  {name:"Tomato", terms:["tomato","tomatoes","tomato paste","tomato purée","tomato puree"]},
  {name:"Chilli", terms:["chilli","chilis","chilli powder","chili","cayenne"]},
  {name:"Sweeteners", terms:["sorbitol","mannitol","xylitol","maltitol","erythritol","isomalt"]}
];


const checkerTriggerTerms = {
  "Cereals containing gluten":["wheat","spelt","khorasan","rye","barley","oat","oats","malt","gluten"],
  "Wheat":["wheat","wheat flour","spelt","khorasan"],
  "Milk / dairy":["milk","cream","whey","casein","caseinate","butter","cheese","yoghurt","yogurt","milk powder","skimmed milk"],
  "Lactose":["lactose","milk","milk powder","whey","cream"],
  "Egg":["egg","eggs","albumen","egg white","egg yolk"],
  "Soya":["soya","soy","soybean","soybeans","soy lecithin","soya lecithin"],
  "Peanuts":["peanut","peanuts","groundnut","groundnuts"],
  "Tree nuts":["almond","almonds","hazelnut","hazelnuts","walnut","walnuts","cashew","cashews","cashew nut","cashew nuts","pecan","pecans","pistachio","pistachios","macadamia","macadamias","brazil nut","brazil nuts"],
  "Sesame":["sesame","tahini"],
  "Fish":["fish","salmon","tuna","cod","haddock","anchovy","anchovies"],
  "Crustaceans":["crustacean","prawn","prawns","shrimp","shrimps","crab","lobster","crayfish"],
  "Molluscs":["mollusc","molluscs","mussel","mussels","oyster","oysters","scallop","scallops","squid","octopus"],
  "Celery":["celery","celeriac"],
  "Mustard":["mustard"],
  "Sulphites":["sulphite","sulphites","sulfite","sulfites","sulphur dioxide","sulfur dioxide"],
  "Lupin":["lupin"],
  "Onion":["onion","onions","onion powder"],
  "Garlic":["garlic","garlic puree","garlic purée","garlic powder"],
  "Chilli":["chilli","chili","cayenne","chilli powder"],
  "Tomato":["tomato","tomatoes","tomato paste","tomato puree","tomato purée"],
  "Legumes / pulses":["pea","peas","chickpea","chickpeas","lentil","lentils","bean","beans"],
  "Sweeteners":["sorbitol","mannitol","xylitol","maltitol","erythritol","isomalt"]
};

function getSelectedCheckerTriggers(){
  return [...document.querySelectorAll("#checkerTriggers button.selected")].map(b=>b.dataset.trigger);
}
function findCheckerMatches(text){
  const hay=normaliseScanText(text);
  return getSelectedCheckerTriggers().filter(name=>
    (checkerTriggerTerms[name]||[]).some(term=>termPresent(hay,term))
  );
}
function resetCheckerResult(){
  document.getElementById("checkerStatus").className="scan-status hidden";
  document.getElementById("checkerStatus").textContent="";
  document.getElementById("checkerPreview").innerHTML="";
  document.getElementById("checkerResult").className="checker-result hidden";
  document.getElementById("checkerMatches").innerHTML="";
  document.getElementById("checkerExtractedWrap").classList.add("hidden");
  document.getElementById("checkerExtracted").classList.add("hidden");
  document.getElementById("checkerExtracted").textContent="";
}
async function scanCheckerImage(file){
  const status=document.getElementById("checkerStatus");
  if(!getSelectedCheckerTriggers().length){
    status.textContent="Select at least one ingredient to check first.";
    status.className="scan-status error";
    return;
  }
  if(!window.Tesseract){
    status.textContent="Ingredient reader could not load. Check your connection and try again.";
    status.className="scan-status error";
    return;
  }
  status.textContent="Reading ingredient label…";
  status.className="scan-status working";
  try{
    const result=await Tesseract.recognize(file,"eng",{
      logger:m=>{
        if(m.status==="recognizing text" && typeof m.progress==="number"){
          status.textContent=`Reading ingredient label… ${Math.round(m.progress*100)}%`;
        }
      }
    });
    const cleaned=cleanOCRText(result.data.text||"");
    if(!cleaned) throw new Error("No text detected");

    const matches=findCheckerMatches(cleaned);
    const resultBox=document.getElementById("checkerResult");
    const icon=document.getElementById("checkerResultIcon");
    const title=document.getElementById("checkerResultTitle");
    const text=document.getElementById("checkerResultText");
    const tags=document.getElementById("checkerMatches");

    if(matches.length){
      resultBox.className="checker-result match";
      icon.innerHTML=ICONS.checkAlert;
      title.textContent="Selected ingredient detected";
      text.textContent="Intolearn found one or more of the ingredients you selected in the scanned text.";
      tags.innerHTML=matches.map(x=>`<span class="checker-match-tag">${escapeHtml(x)}</span>`).join("");
    }else{
      resultBox.className="checker-result clear";
      icon.innerHTML=ICONS.checkClear;
      title.textContent="No selected trigger detected";
      text.textContent="Intolearn did not find your selected ingredients in the text it managed to read. This is not a safety guarantee.";
      tags.innerHTML="";
    }

    document.getElementById("checkerExtracted").textContent=cleaned;
    document.getElementById("checkerExtractedWrap").classList.remove("hidden");
    status.textContent="Scan complete — review the result and the original packaging.";
    status.className="scan-status success";
  }catch(err){
    console.error(err);
    status.textContent="I couldn't read that label clearly. Try a closer crop with good light.";
    status.className="scan-status error";
  }
}


const offAllergenMap = {
  "en:gluten":"Cereals containing gluten",
  "en:milk":"Milk",
  "en:eggs":"Egg",
  "en:egg":"Egg",
  "en:soybeans":"Soya",
  "en:soya":"Soya",
  "en:peanuts":"Peanuts",
  "en:nuts":"Tree nuts",
  "en:tree-nuts":"Tree nuts",
  "en:celery":"Celery",
  "en:mustard":"Mustard",
  "en:sesame-seeds":"Sesame",
  "en:sesame":"Sesame",
  "en:crustaceans":"Crustaceans",
  "en:fish":"Fish",
  "en:lupin":"Lupin",
  "en:molluscs":"Molluscs",
  "en:sulphur-dioxide-and-sulphites":"Sulphites"
};
const offSpecificNutTags = new Set([
  "en:almonds","en:hazelnuts","en:walnuts","en:cashew-nuts","en:cashews",
  "en:pecan-nuts","en:pistachio-nuts","en:macadamia-nuts","en:brazil-nuts"
]);

function loadProductCache(){
  try{return JSON.parse(localStorage.getItem(PRODUCT_CACHE_KEY)||"{}")||{};}
  catch(e){return {};}
}
function saveProductCache(cache){
  try{localStorage.setItem(PRODUCT_CACHE_KEY,JSON.stringify(cache));}
  catch(e){console.warn("Product cache save failed",e);}
}
function normaliseOFFAllergens(tags=[]){
  const out=[];
  (tags||[]).forEach(raw=>{
    const tag=String(raw).toLowerCase();
    let name=offAllergenMap[tag];
    if(!name && offSpecificNutTags.has(tag)) name="Tree nuts";
    if(name && !out.includes(name)) out.push(name);
  });
  return out;
}
function offImageUrl(product){
  return product?.image_front_url || product?.image_front_small_url || "";
}
function textList(value){
  if(Array.isArray(value)) return value.map(String).filter(Boolean);
  if(typeof value==="string"){
    return value.split(/[,;]/).map(x=>x.trim()).filter(Boolean);
  }
  return [];
}
function stripOFFMarkup(text){
  return String(text||"")
    .replace(/<[^>]+>/g," ")
    .replace(/&nbsp;/gi," ")
    .replace(/&amp;/gi,"&")
    .replace(/\s+/g," ")
    .trim();
}
function resolveOFFAllergens(product, ingredientsText){
  const structured=normaliseOFFAllergens(product.allergens_tags||[]);
  if(structured.length){
    return {
      allergens:structured,
      source:"Open Food Facts structured allergen data",
      confidence:"structured"
    };
  }

  const derivedRaw=[
    ...textList(product.allergens_from_ingredients),
    ...textList(product.allergens_from_ingredients_tags)
  ];
  const derivedTags=normaliseOFFAllergens(derivedRaw);
  if(derivedTags.length){
    return {
      allergens:derivedTags,
      source:"Open Food Facts ingredient-derived allergen data",
      confidence:"ingredient-derived"
    };
  }

  if(ingredientsText){
    const local=detectUKAllergens(ingredientsText);
    if(local.length){
      return {
        allergens:local,
        source:"Intolearn analysis of Open Food Facts ingredient text",
        confidence:"intolearn-derived"
      };
    }
  }

  return {
    allergens:[],
    source:ingredientsText
      ? "No recognised allergens detected from available ingredient data"
      : "Allergen information unavailable",
    confidence:ingredientsText ? "none-detected" : "missing"
  };
}
function compactOFFProduct(barcode, product){
  const ingredientsText=stripOFFMarkup(
    product.ingredients_text ||
    product.ingredients_text_en ||
    product.ingredients_text_with_allergens ||
    product.ingredients_text_with_allergens_en ||
    ""
  );

  const resolved=resolveOFFAllergens(product,ingredientsText);

  return {
    cacheSchema:PRODUCT_CACHE_SCHEMA,
    barcode:String(barcode),
    name:product.product_name || product.product_name_en || "Unknown product",
    brand:product.brands || "",
    ingredientsText,
    allergens:resolved.allergens,
    allergenSource:resolved.source,
    allergenConfidence:resolved.confidence,
    traces:(product.traces_tags||[]).map(x=>String(x).replace(/^en:/,"").replaceAll("-"," ")),
    labels:product.labels_tags || [],
    image:offImageUrl(product),
    fetchedAt:new Date().toISOString(),
    source:"Open Food Facts"
  };
}
async function fetchOFFProduct(barcode){
  const code=String(barcode||"").replace(/\D/g,"");
  if(!code) throw new Error("Enter or scan a barcode.");

  const cache=loadProductCache();
  if(cache[code] && cache[code].cacheSchema===PRODUCT_CACHE_SCHEMA){
    return {...cache[code], fromCache:true};
  }

  const fields=[
    "code","product_name","product_name_en","brands",
    "ingredients_text","ingredients_text_en",
    "ingredients_text_with_allergens","ingredients_text_with_allergens_en",
    "allergens_tags","allergens_from_ingredients","allergens_from_ingredients_tags",
    "traces_tags","labels_tags","tags_sources",
    "image_front_url","image_front_small_url"
  ].join(",");
  const url=`https://world.openfoodfacts.org/api/v3.6/product/${encodeURIComponent(code)}.json?fields=${encodeURIComponent(fields)}`;
  const response=await fetch(url,{headers:{"Accept":"application/json"}});
  if(!response.ok) throw new Error(`Open Food Facts returned ${response.status}.`);
  const data=await response.json();

  const p=data?.product;
  if(!p || data?.status===0) return null;

  const compact=compactOFFProduct(code,p);
  cache[code]=compact;
  saveProductCache(cache);
  return compact;
}
function renderBarcodeProduct(product){
  barcodeProduct=product;
  const card=document.getElementById("barcodeProductCard");
  const imgWrap=document.getElementById("barcodeProductImageWrap");
  const tags=document.getElementById("barcodeAllergenTags");

  document.getElementById("barcodeProductName").textContent=product.name||"Unknown product";
  document.getElementById("barcodeProductBrand").textContent=product.brand || `Barcode ${product.barcode}`;

  imgWrap.innerHTML=product.image
    ? `<img src="${escapeHtml(product.image)}" alt="${escapeHtml(product.name||"Product")}">`
    : `<div class="barcode-product-image-placeholder">▥</div>`;

  if(product.allergens.length){
    tags.innerHTML=product.allergens.map(x=>`<span class="allergen-tag">${escapeHtml(x)}</span>`).join("");
  }else if(product.allergenConfidence==="missing"){
    tags.innerHTML=`<span class="allergen-unavailable">Allergen information unavailable</span>`;
  }else{
    tags.innerHTML=`<span class="allergen-none-detected">No recognised allergen detected from the available data</span>`;
  }

  const pieces=[];
  pieces.push(product.fromCache
    ? "Loaded from your local Intolearn product cache."
    : "Loaded from Open Food Facts.");

  if(product.allergenSource) pieces.push(`Allergen source: ${product.allergenSource}.`);

  if(!product.ingredientsText){
    pieces.push("Ingredient text is missing — use the ingredient-photo fallback and verify the pack.");
  }else if(product.allergenConfidence==="intolearn-derived"){
    pieces.push("The allergen list above was inferred by Intolearn from Open Food Facts ingredient text rather than a populated structured allergen field.");
  }else if(product.allergenConfidence==="none-detected"){
    pieces.push("No recognised allergen was found in the available ingredient data; this is not a guarantee that the product is allergen-free.");
  }

  document.getElementById("barcodeProductCompleteness").textContent=pieces.join(" ");
  card.classList.remove("hidden");
  document.getElementById("barcodeNotFound").classList.add("hidden");
}
async function lookupBarcode(barcode){
  const status=document.getElementById("barcodeStatus");
  document.getElementById("barcodeProductCard").classList.add("hidden");
  document.getElementById("barcodeNotFound").classList.add("hidden");
  status.textContent="Looking up product…";
  status.className="scan-status working";
  try{
    const product=await fetchOFFProduct(barcode);
    if(!product){
      status.textContent="Barcode scanned, but this product is not currently in Open Food Facts.";
      status.className="scan-status error";
      document.getElementById("barcodeNotFound").classList.remove("hidden");
      return;
    }
    renderBarcodeProduct(product);
    status.textContent=product.fromCache ? "Product found instantly in your Intolearn cache." : "Product found.";
    status.className="scan-status success";
  }catch(err){
    console.error(err);
    status.textContent=`Could not look up product. ${err.message||""}`;
    status.className="scan-status error";
  }
}
async function stopBarcodeScanner(){
  if(window.Quagga && barcodeScannerRunning){
    try{ Quagga.stop(); }catch(e){}
  }
  barcodeScannerRunning=false;
  const reader=document.getElementById("barcodeReader");
  if(reader) reader.innerHTML="";
}

async function startBarcodeScanner(){
  const status=document.getElementById("barcodeStatus");
  const reader=document.getElementById("barcodeReader");

  if(!window.Quagga){
    status.textContent="Live barcode reader could not load. Use Take barcode photo or enter the number manually.";
    status.className="scan-status error";
    return;
  }

  await stopBarcodeScanner();
  reader.innerHTML="";

  const config={
    inputStream:{
      name:"Live",
      type:"LiveStream",
      target:reader,
      constraints:{
        facingMode:"environment",
        width:{ideal:1280},
        height:{ideal:720},
        aspectRatio:{ideal:1.7777778}
      },
      area:{
        top:"20%",
        right:"5%",
        left:"5%",
        bottom:"20%"
      }
    },
    locator:{
      patchSize:"medium",
      halfSample:true
    },
    numOfWorkers:navigator.hardwareConcurrency ? Math.min(4,navigator.hardwareConcurrency) : 2,
    frequency:10,
    decoder:{
      readers:[
        "ean_reader",
        "ean_8_reader",
        "upc_reader",
        "upc_e_reader",
        "code_128_reader"
      ]
    },
    locate:true
  };

  try{
    await new Promise((resolve,reject)=>{
      Quagga.init(config,err=>{
        if(err){ reject(err); return; }
        resolve();
      });
    });

    let handled=false;

    Quagga.offDetected();
    Quagga.onDetected(async result=>{
      const code=result?.codeResult?.code;
      if(!code || handled) return;

      // Retail EAN/UPC barcodes should be numeric. Ignore obvious false positives.
      if(!/^\d{8,14}$/.test(code)) return;

      handled=true;
      document.getElementById("manualBarcode").value=code;
      status.textContent="Barcode found — looking up product…";
      status.className="scan-status working";
      await stopBarcodeScanner();
      await lookupBarcode(code);
    });

    Quagga.start();
    barcodeScannerRunning=true;
    status.textContent="Camera ready — hold the barcode steady inside the frame.";
    status.className="scan-status working";
  }catch(err){
    console.warn("Quagga live scanner failed",err);
    barcodeScannerRunning=false;
    status.textContent="Live camera scanning is unavailable here. Use Take barcode photo below.";
    status.className="scan-status error";
  }
}

async function decodeBarcodePhoto(file){
  const status=document.getElementById("barcodeStatus");
  if(!file) return;

  if(!window.Quagga){
    status.textContent="Barcode reader could not load. Enter the barcode number manually.";
    status.className="scan-status error";
    return;
  }

  await stopBarcodeScanner();
  status.textContent="Reading barcode photo…";
  status.className="scan-status working";

  const objectUrl=URL.createObjectURL(file);

  try{
    const result=await new Promise((resolve,reject)=>{
      Quagga.decodeSingle({
        src:objectUrl,
        numOfWorkers:0,
        locate:true,
        locator:{
          patchSize:"medium",
          halfSample:false
        },
        decoder:{
          readers:[
            "ean_reader",
            "ean_8_reader",
            "upc_reader",
            "upc_e_reader",
            "code_128_reader"
          ]
        }
      },res=>resolve(res));
    });

    const code=result?.codeResult?.code;
    if(!code || !/^\d{8,14}$/.test(code)){
      status.textContent="I couldn't read that barcode. Try again closer, with the full barcode in view.";
      status.className="scan-status error";
      return;
    }

    document.getElementById("manualBarcode").value=code;
    status.textContent="Barcode found — looking up product…";
    status.className="scan-status working";
    await lookupBarcode(code);
  }catch(err){
    console.error(err);
    status.textContent="I couldn't read that barcode photo. Try again or enter the number manually.";
    status.className="scan-status error";
  }finally{
    URL.revokeObjectURL(objectUrl);
    document.getElementById("barcodePhoto").value="";
  }
}

function resetBarcodeDialog(){
  barcodeProduct=null;
  document.getElementById("manualBarcode").value="";
  document.getElementById("barcodePhoto").value="";
  document.getElementById("barcodeProductCard").classList.add("hidden");
  document.getElementById("barcodeNotFound").classList.add("hidden");
  const status=document.getElementById("barcodeStatus");
  status.textContent="";
  status.className="scan-status hidden";
}
async function openBarcodeDialog(destination){
  barcodeDestination=destination;
  if(destination==="checker" && !getSelectedCheckerTriggers().length){
    const s=document.getElementById("checkerStatus");
    s.textContent="Select at least one ingredient to check first.";
    s.className="scan-status error";
    return;
  }
  resetBarcodeDialog();
  const d=document.getElementById("barcodeDialog");
  d.showModal();
  setTimeout(startBarcodeScanner,120);
}
async function closeBarcodeDialog(){
  await stopBarcodeScanner();
  const d=document.getElementById("barcodeDialog");
  try{if(d.open)d.close();}catch(e){}
  if(d.hasAttribute("open")) d.removeAttribute("open");
}
function applyBarcodeProductToMeal(product){
  mealBarcodeData=product;
  document.getElementById("foodName").value=product.name||"";
  document.getElementById("ingredients").value=product.ingredientsText||"";
  photoData=product.image||"";
  document.getElementById("photoPreview").innerHTML=photoData
    ? `<img src="${escapeHtml(photoData)}" alt="${escapeHtml(product.name||"Product")}">`
    : "";
  const note=document.getElementById("mealBarcodeSource");
  note.textContent=`▥ Barcode ${product.barcode} · ${product.fromCache?"Intolearn cache":"Open Food Facts"} · ${product.allergens.length?product.allergens.join(", "):"no structured allergens listed"}`;
  note.classList.remove("hidden");
  renderFamilies(product.ingredientsText||"");
}
function checkerMatchesFromBarcodeProduct(product){
  const selected=getSelectedCheckerTriggers();
  const structured=new Set(product.allergens||[]);
  const text=normaliseScanText(product.ingredientsText||"");
  const mapping={
    "Cereals containing gluten":"Cereals containing gluten",
    "Milk / dairy":"Milk","Egg":"Egg","Soya":"Soya","Peanuts":"Peanuts",
    "Tree nuts":"Tree nuts","Sesame":"Sesame","Fish":"Fish","Crustaceans":"Crustaceans",
    "Molluscs":"Molluscs","Celery":"Celery","Mustard":"Mustard","Sulphites":"Sulphites","Lupin":"Lupin"
  };
  return selected.filter(trigger=>{
    if(mapping[trigger]) return structured.has(mapping[trigger]);
    return (checkerTriggerTerms[trigger]||[]).some(term=>termPresent(text,term));
  });
}
function applyBarcodeProductToChecker(product){
  const matches=checkerMatchesFromBarcodeProduct(product);
  const resultBox=document.getElementById("checkerResult");
  const icon=document.getElementById("checkerResultIcon");
  const title=document.getElementById("checkerResultTitle");
  const text=document.getElementById("checkerResultText");
  const tags=document.getElementById("checkerMatches");
  document.getElementById("checkerPreview").innerHTML=product.image
    ? `<img src="${escapeHtml(product.image)}" alt="${escapeHtml(product.name||"Product")}">` : "";
  if(matches.length){
    resultBox.className="checker-result match";
    icon.innerHTML=ICONS.checkAlert;
    title.textContent="Selected trigger detected";
    text.textContent=`One or more selected triggers were found. Source: ${product.allergenSource||"available product data"}.`;
    tags.innerHTML=matches.map(x=>`<span class="checker-match-tag">${escapeHtml(x)}</span>`).join("");
  }else{
    resultBox.className="checker-result clear";
    icon.innerHTML=ICONS.checkClear;
    title.textContent="No selected trigger listed";
    text.textContent=product.allergenConfidence==="missing"
      ? "Open Food Facts does not currently provide enough allergen or ingredient information for a reliable check. Use the ingredient-photo fallback and verify the packaging."
      : "No selected trigger was found in the available structured/ingredient data. This is not a safety guarantee — always verify the original packaging.";
    tags.innerHTML="";
  }
  document.getElementById("checkerExtracted").textContent=product.ingredientsText||"No ingredient text supplied by Open Food Facts.";
  document.getElementById("checkerExtractedWrap").classList.remove("hidden");
  const status=document.getElementById("checkerStatus");
  status.textContent=`Barcode checked: ${product.name}.`;
  status.className="scan-status success";
}

function normaliseScanText(text){
  return (" " + String(text).toLowerCase() + " ")
    .replace(/[()[\]{}:;,./\\\-_%]+/g," ")
    .replace(/\s+/g," ")
    .trim();
}

function termPresent(hay, term){
  const normalTerm = normaliseScanText(term);
  return (" " + hay + " ").includes(" " + normalTerm + " ");
}

// --- Supplements & medications: GI side-effect lookups ---
// Two tiers, since there's no single free "supplement side effects" API:
// 1. Vitamins/supplements: a small curated reference list (not FDA-regulated,
//    so no authoritative structured database exists for these).
// 2. Prescription/OTC drugs: a live lookup against openFDA's public drug
//    label API, scanning the label's adverse-reactions/warnings text for
//    GI-symptom keywords. Runs in the background after saving so it never
//    blocks the save on a slow or failed network request.
const GI_KEYWORDS=["diarrhea","diarrhoea","constipation","nausea","vomiting","bloating","flatulence","abdominal pain","stomach pain","stomach upset","stomach cramp","cramping","indigestion","dyspepsia","reflux","heartburn","loose stool","gastrointestinal"];
const SUPPLEMENT_GI_NOTES={
  "magnesium":["diarrhoea","stomach cramps"],
  "vitamin c":["diarrhoea","stomach upset at high doses"],
  "fish oil":["burping","indigestion","loose stools"],
  "omega-3":["burping","indigestion","loose stools"],
  "probiotic":["bloating","gas (often settles after a week or two)"],
  "creatine":["stomach cramps","bloating"],
  "whey protein":["bloating","gas","loose stools if lactose-sensitive"],
  "collagen":["bloating","fullness"],
  "iron":["constipation","nausea","stomach pain"],
  "zinc":["nausea","stomach upset"],
  "vitamin d":["nausea","constipation at high doses"],
  "ashwagandha":["stomach upset","diarrhoea"],
  "berberine":["diarrhoea","stomach cramps","constipation"],
  "inulin":["gas","bloating"],
  "prebiotic":["gas","bloating"],
  "psyllium":["bloating","gas"],
  "fibre supplement":["bloating","gas"],
  "fiber supplement":["bloating","gas"],
  "turmeric":["diarrhoea","stomach upset at high doses"],
  "curcumin":["diarrhoea","stomach upset at high doses"],
  "5-htp":["nausea"],
  "green tea extract":["stomach upset","nausea"],
  "apple cider vinegar":["nausea","throat or stomach irritation"]
};
function lookupSupplementGI(name){
  const hay=name.toLowerCase();
  const match=Object.entries(SUPPLEMENT_GI_NOTES).find(([key])=>hay.includes(key));
  if(!match) return null;
  return {source:"Common supplement reference (general information, not FDA-regulated)", terms:match[1]};
}
async function lookupPrescriptionGI(name){
  if(!name.trim()) return null;
  const q=encodeURIComponent(name.trim());
  const url=`https://api.fda.gov/drug/label.json?search=openfda.brand_name:"${q}"+openfda.generic_name:"${q}"&limit=1`;
  try{
    const res=await fetch(url);
    if(!res.ok) return null;
    const data=await res.json();
    const r=data?.results?.[0];
    if(!r) return null;
    const text=[...(r.adverse_reactions||[]),...(r.warnings||[]),...(r.warnings_and_cautions||[])].join(" ").toLowerCase();
    if(!text) return null;
    const matched=GI_KEYWORDS.filter(term=>text.includes(term));
    if(!matched.length) return null;
    return {source:"FDA drug label (openFDA)", terms:[...new Set(matched)]};
  }catch(err){
    console.warn("openFDA lookup failed (offline, blocked, or no match)",err);
    return null;
  }
}

function detectUKAllergens(text){
  const hay=normaliseScanText(text);
  return ukAllergens
    .filter(a=>{
      if(a.name==="Cereals containing gluten"){
        // Avoid the false positive that triggered this v4.4 change:
        // "gluten free oats" must not be treated as "cereals containing gluten".
        const contextSafe=hay
          .replace(/gluten free oats?/g," ")
          .replace(/gluten free/g," ")
          .replace(/certified gluten free oats?/g," ");
        return a.terms.some(term=>termPresent(contextSafe,term));
      }
      return a.terms.some(term=>termPresent(hay,term));
    })
    .map(a=>a.name);
}

function detectFamilies(text){
  const hay=normaliseScanText(text);
  return ingredientFamilies
    .filter(f=>f.terms.some(term=>termPresent(hay,term)))
    .map(f=>f.name);
}
function renderFamilies(text){
  const allergens=detectUKAllergens(text);
  const families=detectFamilies(text);

  const box=document.getElementById("detectedFamilies");
  const allergenSection=document.getElementById("allergenSection");
  const allergenTags=document.getElementById("allergenTags");
  const otherSection=document.getElementById("otherTrackingSection");
  const familyTags=document.getElementById("familyTags");

  allergenTags.innerHTML=allergens.map(x=>`<span class="allergen-tag">${escapeHtml(x)}</span>`).join("");
  familyTags.innerHTML=families.map(x=>`<span class="family-tag">${escapeHtml(x)}</span>`).join("");

  allergenSection.classList.toggle("hidden", allergens.length===0);
  otherSection.classList.toggle("hidden", families.length===0);

  if(!allergens.length && !families.length){
    box.classList.add("hidden");
  }else{
    box.classList.remove("hidden");
  }
  return {allergens,families};
}
function cleanOCRText(text){
  return text
    .replace(/\r/g,"")
    .replace(/[|]/g,"I")
    .replace(/\n{2,}/g,"\n")
    .replace(/^\s*(ingredients?|ingredlents?)\s*[:\-]?\s*/i,"")
    .trim();
}
async function scanIngredientImage(file){
  const status=document.getElementById("scanStatus");
  if(!window.Tesseract){
    status.textContent="Ingredient reader could not load. Check your internet connection and try again.";
    status.className="scan-status error";
    return;
  }
  status.textContent="Reading ingredient label… first scan can take a little longer.";
  status.className="scan-status working";
  try{
    const result=await Tesseract.recognize(file,"eng",{
      logger:m=>{
        if(m.status==="recognizing text" && typeof m.progress==="number"){
          status.textContent=`Reading ingredient label… ${Math.round(m.progress*100)}%`;
        }
      }
    });
    const cleaned=cleanOCRText(result.data.text||"");
    if(!cleaned){
      throw new Error("No text detected");
    }
    document.getElementById("ingredients").value=cleaned;
    const detected=renderFamilies(cleaned);
    const totalDetected=detected.allergens.length + detected.families.length;
    status.textContent=totalDetected
      ? `Ingredients read. ${detected.allergens.length} UK allergen ${detected.allergens.length===1?"group":"groups"} and ${detected.families.length} other tracking ${detected.families.length===1?"group":"groups"} detected — please review before saving.`
      : "Ingredients read — please review the text before saving.";
    status.className="scan-status success";
  }catch(err){
    console.error(err);
    status.textContent="I couldn't read that label clearly. Try a closer, straighter photo with good light.";
    status.className="scan-status error";
  }
}

let state = loadState();
let activeMeal = "breakfast";
let editingIndex = null;
let editingDateKey = null;
let photoData = "";
let barcodeDestination = "meal";
let barcodeScannerRunning = false;
let barcodeProduct = null;
let mealBarcodeData = null;
let toastTimer = null;
let cropper = null;
let pendingPhotoFile = null;
let cropDestination = "meal";

function blankState(){ return { days:{}, profile:{name:"", photo:"", allergies:[], onboarded:false}, courses:[], trials:[] }; }
function loadState(){
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY)) || blankState();
    parsed.days ||= {};
    parsed.profile ||= {name:"", photo:"", allergies:[], onboarded:false};
    parsed.courses ||= [];
    parsed.trials ||= [];
    return parsed;
  }
  catch { return blankState(); }
}
function isQuotaError(err){
  return err && (
    err.name === "QuotaExceededError" ||
    err.name === "NS_ERROR_DOM_QUOTA_REACHED" ||
    err.code === 22 || err.code === 1014
  );
}
function saveState(){
  try{
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    return true;
  }catch(err){
    console.error("saveState failed",err);
    if(isQuotaError(err)){
      showToast("Storage full — this entry was NOT saved. Free up space in Settings.");
    }else{
      showToast("Not saved — please try again.");
    }
    return false;
  }
}
function dateKey(d=new Date()){ return d.toISOString().slice(0,10); }
function dateKeyPlusDays(key,n){
  const d=new Date(key+"T12:00:00");
  d.setDate(d.getDate()+n);
  return dateKey(d);
}
function courseEndKey(course){
  if(course.durationDays==null) return null;
  return dateKeyPlusDays(course.startDate, course.durationDays-1);
}
function isCourseActiveOn(course,key){
  if(course.active===false) return false;
  if(key < course.startDate) return false;
  const end=courseEndKey(course);
  if(end && key > end) return false;
  return true;
}
// Fills a day's supplement list from any recurring course that covers that
// date, unless the user explicitly skipped that course for that specific
// day. Only runs the (cheap) idempotency checks unless something actually
// needs adding, so this is safe to call on every ensureDay().
function applyCoursesToDay(key){
  const day=state.days[key];
  if(!day) return;
  day.courseSkips ||= [];
  let changed=false;
  (state.courses||[]).forEach(course=>{
    if(!isCourseActiveOn(course,key)) return;
    if(day.courseSkips.includes(course.id)) return;
    if(day.supplements.some(s=>s.courseId===course.id)) return;
    day.supplements.push({
      id:makeId(), courseId:course.id, name:course.name, kind:course.kind,
      dose:course.dose, time:course.time, notes:course.notes, flag:course.flag,
      createdAt:new Date().toISOString(), updatedAt:new Date().toISOString()
    });
    changed=true;
  });
  if(changed) saveState();
}

// --- Elimination/reintroduction trials ---
// A trial is deliberate, structured evidence — you personally remove a
// suspect for a set period, then reintroduce it and watch closely. That's
// a stronger signal than the passive correlation engine can ever produce,
// since you already know exactly when the exposure changed.
function trialEliminationEndKey(trial){
  return dateKeyPlusDays(trial.startDate, trial.eliminationDays-1);
}
function trialReintroStartKey(trial){
  return dateKeyPlusDays(trialEliminationEndKey(trial), 1);
}
function trialReintroEndKey(trial){
  return dateKeyPlusDays(trialEliminationEndKey(trial), trial.reintroDays);
}
function trialPhaseOn(trial,key){
  if(trial.stoppedAt && key>=trial.stoppedAt) return "stopped";
  if(key<trial.startDate) return null;
  if(key<=trialEliminationEndKey(trial)) return "eliminating";
  if(key<=trialReintroEndKey(trial)) return "reintroducing";
  return "completed";
}
function activeTrialToday(){
  const today=dateKey();
  return (state.trials||[]).find(t=>["eliminating","reintroducing"].includes(trialPhaseOn(t,today))) || null;
}
function trialDayProgress(trial){
  const today=dateKey();
  const phase=trialPhaseOn(trial,today);
  if(phase==="eliminating"){
    const dayNum=Math.round((new Date(today)-new Date(trial.startDate))/86400000)+1;
    return {phase, dayNum, totalDays:trial.eliminationDays};
  }
  if(phase==="reintroducing"){
    const reintroStart=trialReintroStartKey(trial);
    const dayNum=Math.round((new Date(today)-new Date(reintroStart))/86400000)+1;
    return {phase, dayNum, totalDays:trial.reintroDays};
  }
  return {phase, dayNum:null, totalDays:null};
}
function checkTrialContamination(entry){
  const today=dateKey();
  const activeElim=(state.trials||[]).filter(t=>trialPhaseOn(t,today)==="eliminating");
  if(!activeElim.length) return null;
  const hay=[entry.name, ...(entry.ingredients||[])].join(" ").toLowerCase();
  const hit=activeElim.find(t=>hay.includes(t.ingredient.trim().toLowerCase()));
  return hit ? hit.ingredient : null;
}
function computeTrialResults(trial){
  const beforeStart=dateKeyPlusDays(trial.startDate,-7);
  const beforeEnd=dateKeyPlusDays(trial.startDate,-1);
  const elimEnd=trialEliminationEndKey(trial);
  const reintroStart=trialReintroStartKey(trial);
  const reintroEnd=trialReintroEndKey(trial);
  const today=dateKey();
  const cap=trial.stoppedAt||today;

  function rateFor(startKey,endKey){
    let days=0, symptomatic=0, cursor=startKey;
    while(cursor<=endKey && cursor<=cap && cursor<=today){
      const day=state.days[cursor];
      if(day && Object.keys(day.exit||{}).length){
        days++;
        if(dayIsSymptomatic(day)) symptomatic++;
      }
      cursor=dateKeyPlusDays(cursor,1);
    }
    return {days, symptomatic, rate: days ? symptomatic/days : null};
  }

  return {
    before: rateFor(beforeStart,beforeEnd),
    eliminating: rateFor(trial.startDate,elimEnd),
    reintroducing: rateFor(reintroStart,reintroEnd)
  };
}

function ensureDay(key=dateKey()){
  if(!state.days[key]) state.days[key]={ meals:{breakfast:[],lunch:[],dinner:[],snacks:[]}, exit:{}, supplements:[], courseSkips:[] };
  state.days[key].meals ||= {};
  mealTypes.forEach(m => state.days[key].meals[m.key] ||= []);
  state.days[key].exit ||= {};
  state.days[key].supplements ||= [];
  state.days[key].courseSkips ||= [];
  applyCoursesToDay(key);
  return state.days[key];
}
function fmtDate(d){ return d.toLocaleDateString("en-GB",{weekday:"long",day:"numeric",month:"long"}); }
function parseIngredients(raw){ return raw.split(/[\n,;]+/).map(x=>x.trim()).filter(Boolean); }
function currentDay(){ return ensureDay(); }
function getDay(key){ return ensureDay(key || dateKey()); }
function escapeHtml(s=""){
  return String(s).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#039;"}[m]));
}
function titleCase(s){return s.replace(/\b\w/g,c=>c.toUpperCase())}
function showToast(message){
  const toast=document.getElementById("toast");
  toast.textContent=message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer=setTimeout(()=>toast.classList.remove("show"),1800);
}

document.body.dataset.intolearnVersion = APP_VERSION;
document.getElementById("todayDate").textContent = fmtDate(new Date());

function renderMeals(){
  const wrap=document.getElementById("mealSections");
  const day=currentDay();
  wrap.innerHTML="";
  mealTypes.forEach(m=>{
    const card=document.createElement("section");
    card.className="meal-card";
    card.dataset.collapseKey=m.key;
    const items=day.meals[m.key]||[];
    card.innerHTML=`
      <div class="meal-head collapse-toggle">
        <div><span class="icon-tile">${m.icon}</span><div><h3>${m.label}</h3><p>${items.length ? items.length+" entr"+(items.length===1?"y":"ies") : "Nothing logged yet"}</p></div></div>
        <div class="meal-head-right">
          <span class="collapse-chevron"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg></span>
          <button class="add-btn" data-meal="${m.key}" type="button">+ Add</button>
        </div>
      </div>
      <div class="entry-list collapsible-content">
        ${items.map((it,i)=>{
          if(it.barcode){
            return `
              <button class="barcode-diary-entry view-entry" type="button" data-meal="${m.key}" data-index="${i}" aria-label="Open ${escapeHtml(it.name)}">
                <div class="barcode-diary-image">
                  ${it.photo
                    ? `<img src="${escapeHtml(it.photo)}" alt="${escapeHtml(it.name)}">`
                    : `<div class="barcode-diary-placeholder">▥</div>`}
                </div>
                <div class="barcode-diary-copy">
                  <strong>${escapeHtml(it.name)}</strong>
                  <small>${it.time || ""}</small>
                </div>
                <span class="barcode-diary-chevron">›</span>
              </button>`;
          }
          return `
            <div class="food-entry">
              <div class="food-entry-main">
                <strong>${escapeHtml(it.name)}</strong>
                <small>${[it.time, it.portionSize?it.portionSize+" portion":null, it.quantity||null, it.cookingMethod||null].filter(Boolean).join(" · ")}${it.notes ? " · "+escapeHtml(it.notes):""}</small>
                <div class="ingredient-tags">${(it.ingredients||[]).slice(0,8).map(x=>`<span class="ingredient-tag">${escapeHtml(x)}</span>`).join("")}</div>
              </div>
              <div class="entry-actions">
                <button class="entry-action view-entry" type="button" data-meal="${m.key}" data-index="${i}">View / Edit</button>
                <button class="entry-action delete delete-entry" type="button" data-meal="${m.key}" data-index="${i}">Delete</button>
              </div>
            </div>`;
        }).join("")}
      </div>`;
    wrap.appendChild(card);
  });

  document.querySelectorAll(".add-btn").forEach(btn=>btn.onclick=()=>openMeal(btn.dataset.meal));
  document.querySelectorAll(".view-entry").forEach(btn=>btn.onclick=()=>openMeal(btn.dataset.meal, Number(btn.dataset.index), dateKey()));
  document.querySelectorAll(".delete-entry").forEach(btn=>btn.onclick=()=>deleteMeal(btn.dataset.meal, Number(btn.dataset.index), false, dateKey()));
  wireCollapseToggles();
}

// --- Quick add: surfaces your own past entries so common meals don't
// need retyping, plus feeds the food-name autocomplete list. ---
function buildFoodHistory(){
  const byMeal={};
  mealTypes.forEach(m=>byMeal[m.key]=new Map());
  const allNames=new Map();

  Object.entries(state.days||{}).forEach(([dayKey,day])=>{
    mealTypes.forEach(m=>{
      (day.meals?.[m.key]||[]).forEach(item=>{
        const rawName=(item?.name||"").trim();
        if(!rawName) return;
        const key=rawName.toLowerCase();
        const at=item.updatedAt || item.createdAt || dayKey;

        const map=byMeal[m.key];
        const existing=map.get(key);
        if(existing){
          existing.count++;
          if(!existing.lastAt || at>existing.lastAt){ existing.lastAt=at; existing.template=item; }
        }else{
          map.set(key,{count:1,lastAt:at,template:item});
        }

        const allExisting=allNames.get(key);
        if(!allExisting || at>allExisting.lastAt){
          allNames.set(key,{name:rawName,lastAt:at});
        }
      });
    });
  });
  return {byMeal,allNames};
}

function applyHistoryTemplate(item){
  document.getElementById("foodName").value=item.name||"";
  document.getElementById("foodName").classList.remove("field-error");
  document.getElementById("ingredients").value=(item.ingredients||[]).join("\n");
  document.getElementById("foodQuantity").value=item.quantity||"";
  document.getElementById("foodCookingMethod").value=item.cookingMethod||"";
  document.querySelectorAll('[data-choice="foodPortion"] button').forEach(b=>b.classList.toggle("selected", b.dataset.value===(item.portionSize||"Medium")));

  photoData=item.photo||"";
  document.getElementById("photoPreview").innerHTML=photoData
    ? `<img src="${photoData}" alt="${escapeHtml(item.name||"Product")}">`
    : "";

  const bn=document.getElementById("mealBarcodeSource");
  if(item.barcode){
    mealBarcodeData={
      barcode:item.barcode,
      name:item.name||"",
      brand:item.brand||"",
      ingredientsText:(item.ingredients||[]).join(", "),
      allergens:item.allergens||[],
      image:item.photo||"",
      source:item.source||"Open Food Facts",
      allergenSource:item.allergenSource||"",
      allergenConfidence:"structured",
      fromCache:true
    };
    if(bn){
      bn.textContent=`▥ Barcode ${item.barcode} · ${item.source||"Open Food Facts"}`;
      bn.classList.remove("hidden");
    }
  }else{
    mealBarcodeData=null;
    if(bn){ bn.textContent=""; bn.classList.add("hidden"); }
  }

  renderFamilies((item.ingredients||[]).join(" "));
  showToast(`Filled in from "${item.name}" — review and save`);
}

function renderQuickAdd(meal){
  const wrap=document.getElementById("quickAddWrap");
  const chipsBox=document.getElementById("quickAddChips");
  if(!wrap || !chipsBox) return;

  const {byMeal}=buildFoodHistory();
  const entries=[...byMeal[meal].values()]
    .sort((a,b)=> b.count-a.count || (b.lastAt>a.lastAt?1:-1))
    .slice(0,6);

  if(!entries.length){
    wrap.classList.add("hidden");
    chipsBox.innerHTML="";
    return;
  }

  wrap.classList.remove("hidden");
  chipsBox.innerHTML=entries.map((e,i)=>
    `<button type="button" class="quick-add-chip" data-quick-index="${i}">${escapeHtml(e.template.name)} <small>×${e.count}</small></button>`
  ).join("");

  chipsBox.querySelectorAll(".quick-add-chip").forEach(btn=>{
    btn.addEventListener("click",()=>{
      applyHistoryTemplate(entries[Number(btn.dataset.quickIndex)].template);
    });
  });
}

function populateFoodNameDatalist(){
  const list=document.getElementById("foodNameList");
  if(!list) return;
  const {allNames}=buildFoodHistory();
  list.innerHTML=[...allNames.values()]
    .sort((a,b)=> (b.lastAt>a.lastAt?1:-1))
    .slice(0,50)
    .map(x=>`<option value="${escapeHtml(x.name)}"></option>`)
    .join("");
}

function resetMealForm(){
  document.getElementById("quickAddWrap").classList.add("hidden");
  document.getElementById("quickAddChips").innerHTML="";
  document.getElementById("foodName").classList.remove("field-error");
  document.getElementById("foodName").value="";
  document.getElementById("ingredients").value="";
  document.getElementById("foodNotes").value="";
  document.getElementById("foodTime").value=new Date().toTimeString().slice(0,5);
  document.getElementById("foodQuantity").value="";
  document.getElementById("foodCookingMethod").value="";
  document.querySelectorAll('[data-choice="foodPortion"] button').forEach(b=>b.classList.remove("selected"));
  document.querySelector('[data-choice="foodPortion"] button[data-value="Medium"]').classList.add("selected");
  const camInput=document.getElementById("ingredientCamera");
  const libInput=document.getElementById("ingredientLibrary");
  if(camInput) camInput.value="";
  if(libInput) libInput.value="";
  document.getElementById("photoPreview").innerHTML="";
  const scanStatus=document.getElementById("scanStatus");
  scanStatus.textContent="";
  scanStatus.className="scan-status hidden";
  document.getElementById("detectedFamilies").classList.add("hidden");
  document.getElementById("familyTags").innerHTML="";
  document.getElementById("allergenTags").innerHTML="";
  document.getElementById("allergenSection").classList.add("hidden");
  document.getElementById("otherTrackingSection").classList.add("hidden");
  photoData="";
  mealBarcodeData=null;
  const barcodeNote=document.getElementById("mealBarcodeSource");
  if(barcodeNote){ barcodeNote.textContent=""; barcodeNote.classList.add("hidden"); }
}

function openMeal(meal, index=null, entryDateKey=null){
  activeMeal=meal;
  editingIndex=index;
  editingDateKey=entryDateKey || dateKey();
  const meta=mealTypes.find(x=>x.key===meal);
  resetMealForm();

  document.getElementById("mealDialogTitle").textContent=meta.label;
  document.getElementById("mealDialogEyebrow").textContent=index===null ? "ADD ENTRY" : "PRODUCT DETAILS";
  document.getElementById("saveMealBtn").textContent=index===null ? "Save entry" : "Save changes";
  document.getElementById("deleteMealBtn").classList.toggle("hidden", index===null);

  populateFoodNameDatalist();
  if(index===null) renderQuickAdd(meal);

  if(index!==null){
    const item=getDay(editingDateKey).meals[meal][index];
    if(!item) return;
    document.getElementById("foodName").value=item.name||"";
    document.getElementById("foodTime").value=item.time||"";
    document.getElementById("ingredients").value=(item.ingredients||[]).join("\n");
    document.getElementById("foodNotes").value=item.notes||"";
    document.getElementById("foodQuantity").value=item.quantity||"";
    document.getElementById("foodCookingMethod").value=item.cookingMethod||"";
    document.querySelectorAll('[data-choice="foodPortion"] button').forEach(b=>b.classList.toggle("selected", b.dataset.value===(item.portionSize||"Medium")));
    photoData=item.photo||"";
    if(photoData) document.getElementById("photoPreview").innerHTML=`<img src="${photoData}" alt="${escapeHtml(item.name||"Product")}">`;
    if(item.barcode){
      mealBarcodeData={
        barcode:item.barcode,
        name:item.name||"",
        brand:item.brand||"",
        ingredientsText:(item.ingredients||[]).join(", "),
        allergens:item.allergens||[],
        image:item.photo||"",
        source:item.source||"Open Food Facts",
        allergenSource:item.allergenSource||"",
        allergenConfidence:"structured",
        fromCache:true
      };
      const bn=document.getElementById("mealBarcodeSource");
      bn.textContent=`▥ Barcode ${item.barcode} · ${item.source||"Open Food Facts"}`;
      bn.classList.remove("hidden");
    }
    renderFamilies((item.ingredients||[]).join(" "));
  }
  document.getElementById("mealDialog").showModal();
}

function closeMealDialog(){
  const nameEl = document.getElementById("foodName");
  if(nameEl) nameEl.classList.remove("field-error");

  const dialog = document.getElementById("mealDialog");
  if(!dialog) return;

  try {
    if(typeof dialog.close === "function" && dialog.open){
      dialog.close();
    }
  } catch(err) {
    console.warn("Native dialog close failed", err);
  }

  // iOS/Safari fallback: make absolutely sure the modal disappears.
  if(dialog.hasAttribute("open")){
    dialog.removeAttribute("open");
  }
}

function saveMeal(){
  const nameEl=document.getElementById("foodName");
  const name=nameEl.value.trim();
  if(!name){
    nameEl.classList.add("field-error");
    nameEl.focus();
    showToast("Please enter a food or product name.");
    return;
  }
  nameEl.classList.remove("field-error");

  const entry={
    name,
    time:document.getElementById("foodTime").value,
    ingredients:parseIngredients(document.getElementById("ingredients").value),
    families:detectFamilies(document.getElementById("ingredients").value),
    allergens:mealBarcodeData ? (mealBarcodeData.allergens||[]) : detectUKAllergens(document.getElementById("ingredients").value),
    portionSize:document.querySelector('[data-choice="foodPortion"] button.selected')?.dataset.value || "Medium",
    quantity:document.getElementById("foodQuantity").value.trim(),
    cookingMethod:document.getElementById("foodCookingMethod").value,
    notes:document.getElementById("foodNotes").value.trim(),
    photo:photoData,
    barcode:mealBarcodeData?.barcode||"",
    brand:mealBarcodeData?.brand||"",
    source:mealBarcodeData ? "Open Food Facts" : "Manual/OCR",
    allergenSource:mealBarcodeData?.allergenSource||"",
    createdAt: editingIndex===null ? new Date().toISOString() : (getDay(editingDateKey).meals[activeMeal][editingIndex]?.createdAt || new Date().toISOString()),
    updatedAt:new Date().toISOString()
  };

  const isNew = editingIndex===null;

  const targetList=isNew ? currentDay().meals[activeMeal] : getDay(editingDateKey).meals[activeMeal];
  const previousEntry = isNew ? undefined : targetList[editingIndex];

  if(isNew){
    targetList.push(entry);
  }else{
    targetList[editingIndex]=entry;
  }

  const saved = saveState();

  if(!saved){
    // Roll back the in-memory change so state and storage don't diverge,
    // and keep the dialog open so nothing is silently lost.
    if(isNew){
      targetList.pop();
    }else{
      targetList[editingIndex]=previousEntry;
    }
    return;
  }

  const contamination=checkTrialContamination(entry);

  // Close first on iPhone/Safari so the user gets immediate visual confirmation
  // that the action completed, even if a later render step is delayed.
  closeMealDialog();

  // Refresh after the modal is gone.
  try {
    renderAll();
  } finally {
    showToast(contamination
      ? `Heads up — this contains "${contamination}", which you're currently eliminating.`
      : (isNew ? "Entry saved" : "Changes saved"));
  }
}

function deleteMeal(meal, index, fromDialog=true, entryDateKey=null){
  const targetDay=getDay(entryDateKey || editingDateKey || dateKey());
  const item=targetDay.meals[meal]?.[index];
  if(!item) return;
  if(!confirm(`Delete "${item.name}"?`)) return;
  targetDay.meals[meal].splice(index,1);
  saveState();
  renderAll();
  if(fromDialog && document.getElementById("mealDialog").open) closeMealDialog();
  showToast("Entry deleted");
}

document.getElementById("saveMealBtn").addEventListener("click", saveMeal);
document.getElementById("cancelMealBtn").addEventListener("click", closeMealDialog);
document.getElementById("closeMealDialog").addEventListener("click", closeMealDialog);
document.getElementById("deleteMealBtn").addEventListener("click", ()=>deleteMeal(activeMeal, editingIndex, true, editingDateKey));

document.getElementById("mealForm").addEventListener("submit", e=>e.preventDefault());
document.getElementById("mealDialog").addEventListener("cancel", e=>{
  e.preventDefault();
  closeMealDialog();
});

// --- Supplements & medications dialog ---
let supplementEditingIndex=null;
let supplementEditingDateKey=null;

function makeId(){
  return (crypto?.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`);
}

function buildSupplementHistory(){
  const map=new Map();
  Object.values(state.days||{}).forEach(day=>{
    (day.supplements||[]).forEach(item=>{
      const name=(item.name||"").trim();
      if(!name) return;
      map.set(name.toLowerCase(), name);
    });
  });
  return map;
}
function populateSupplementNameDatalist(){
  const list=document.getElementById("supplementNameList");
  if(!list) return;
  list.innerHTML=[...buildSupplementHistory().values()]
    .map(name=>`<option value="${escapeHtml(name)}"></option>`).join("");
}

function resetSupplementForm(){
  document.getElementById("supplementName").value="";
  document.getElementById("supplementName").classList.remove("field-error");
  document.getElementById("supplementDose").value="";
  document.getElementById("supplementTime").value=new Date().toTimeString().slice(0,5);
  document.getElementById("supplementNotes").value="";
  document.querySelectorAll('[data-choice="supplementKind"] button').forEach(b=>b.classList.remove("selected"));
  document.querySelector('[data-choice="supplementKind"] button[data-value="supplement"]').classList.add("selected");
  document.querySelectorAll('[data-choice="supplementFrequency"] button').forEach(b=>b.classList.remove("selected"));
  document.querySelector('[data-choice="supplementFrequency"] button[data-value="once"]').classList.add("selected");
  document.getElementById("supplementCourseDays").value="";
  document.getElementById("supplementCourseDays").classList.remove("field-error");
  document.getElementById("supplementCourseDaysWrap").classList.add("hidden");
  document.getElementById("supplementFlagBox").classList.add("hidden");
}

function openSupplement(index=null, entryDateKey=null){
  supplementEditingIndex=index;
  supplementEditingDateKey=entryDateKey || dateKey();
  resetSupplementForm();
  populateSupplementNameDatalist();

  document.getElementById("supplementDialogEyebrow").textContent=index===null ? "ADD ENTRY" : "EDIT ENTRY";
  document.getElementById("supplementDialogTitle").textContent=index===null ? "Supplement or medication" : "Edit entry";
  document.getElementById("saveSupplementBtn").textContent=index===null ? "Save entry" : "Save changes";
  document.getElementById("deleteSupplementBtn").classList.toggle("hidden", index===null);
  // Recurrence only makes sense when creating a new entry — editing one
  // day's occurrence shouldn't spin up a second course.
  document.getElementById("supplementFrequencyBlock").classList.toggle("hidden", index!==null);

  if(index!==null){
    const item=getDay(supplementEditingDateKey).supplements[index];
    if(!item) return;
    document.getElementById("supplementName").value=item.name||"";
    document.getElementById("supplementDose").value=item.dose||"";
    document.getElementById("supplementTime").value=item.time||"";
    document.getElementById("supplementNotes").value=item.notes||"";
    document.querySelectorAll('[data-choice="supplementKind"] button').forEach(b=>b.classList.toggle("selected", b.dataset.value===(item.kind||"supplement")));
    if(item.flag) showSupplementFlag(item.flag);
  }
  document.getElementById("supplementDialog").showModal();
}

function closeSupplementDialog(){
  const dialog=document.getElementById("supplementDialog");
  if(!dialog) return;
  try{ if(dialog.open) dialog.close(); }catch(err){ console.warn("Dialog close failed",err); }
  if(dialog.hasAttribute("open")) dialog.removeAttribute("open");
}

function showSupplementFlag(flag){
  const box=document.getElementById("supplementFlagBox");
  document.getElementById("supplementFlagText").textContent=
    `${titleCase(flag.terms.join(", "))}. Source: ${flag.source}. This is general reference information, not a warning specific to you — always check the patient leaflet or ask a pharmacist.`;
  box.classList.remove("hidden");
}

// --- Collapsible Today sections (Breakfast/Lunch/Dinner/Snacks/Supplements) ---
// Preference only, stored separately from diary data so it doesn't clutter
// JSON exports or the correlation engine.
const COLLAPSE_KEY="intolearn_collapse_v1";
function loadCollapseState(){
  try{ return JSON.parse(localStorage.getItem(COLLAPSE_KEY)) || {}; }
  catch{ return {}; }
}
let collapseState=loadCollapseState();
function saveCollapseState(){
  try{ localStorage.setItem(COLLAPSE_KEY, JSON.stringify(collapseState)); }
  catch(err){ console.warn("Could not save collapse state",err); }
}
function applyCollapseState(){
  document.querySelectorAll("[data-collapse-key]").forEach(card=>{
    card.classList.toggle("collapsed", !!collapseState[card.dataset.collapseKey]);
  });
}
function toggleCollapse(key){
  collapseState[key]=!collapseState[key];
  saveCollapseState();
  applyCollapseState();
}
function wireCollapseToggles(){
  document.querySelectorAll(".collapse-toggle").forEach(head=>{
    head.onclick=e=>{
      if(e.target.closest(".add-btn")) return;
      const card=head.closest("[data-collapse-key]");
      if(card) toggleCollapse(card.dataset.collapseKey);
    };
  });
}

function renderActiveFlagBanner(){
  const box=document.getElementById("activeFlagBanner");
  const body=document.getElementById("activeFlagBody");
  if(!box || !body) return;
  const flagged=(currentDay().supplements||[]).filter(s=>s.flag);
  if(!flagged.length){
    box.classList.add("hidden");
    body.innerHTML="";
    return;
  }
  box.classList.remove("hidden");
  body.innerHTML=flagged.map(s=>
    `<p><strong>${escapeHtml(s.name)}</strong> has been flagged for side effects that can look like a food reaction: ${escapeHtml(titleCase(s.flag.terms.join(", ")))}. Worth weighing in alongside anything you've eaten today.</p>`
  ).join("");
}

function renderTrialStatus(){
  const launchCard=document.getElementById("trialLaunchCard");
  const banner=document.getElementById("activeTrialBanner");
  if(!launchCard || !banner) return;

  const trial=activeTrialToday();
  if(!trial){
    launchCard.classList.remove("hidden");
    banner.classList.add("hidden");
    return;
  }
  launchCard.classList.add("hidden");
  banner.classList.remove("hidden");

  const progress=trialDayProgress(trial);
  if(progress.phase==="eliminating"){
    document.getElementById("activeTrialTitle").textContent=`Day ${progress.dayNum} of ${progress.totalDays} — eliminating ${trial.ingredient}`;
    document.getElementById("activeTrialText").textContent=`Avoid ${trial.ingredient} completely. Intolearn will flag it if it shows up in something you log.`;
  }else if(progress.phase==="reintroducing"){
    document.getElementById("activeTrialTitle").textContent=`Day ${progress.dayNum} of ${progress.totalDays} — reintroducing ${trial.ingredient}`;
    document.getElementById("activeTrialText").textContent=`Deliberately eat ${trial.ingredient} again and watch closely for symptoms over the next few days.`;
  }
}

function renderTrialResults(){
  const panel=document.getElementById("trialResultsPanel");
  const box=document.getElementById("trialResults");
  if(!panel || !box) return;
  const trials=state.trials||[];
  if(!trials.length){
    panel.classList.add("hidden");
    box.innerHTML="";
    return;
  }
  panel.classList.remove("hidden");

  const fmt=r => r.days ? `${Math.round(r.rate*100)}% (${r.symptomatic}/${r.days} days)` : "not enough data yet";
  box.innerHTML=trials.slice().reverse().map(t=>{
    const r=computeTrialResults(t);
    const phase=trialPhaseOn(t,dateKey());
    const phaseLabel = phase==="eliminating" ? "In progress — eliminating"
      : phase==="reintroducing" ? "In progress — reintroducing"
      : phase==="stopped" ? "Stopped early"
      : "Completed";
    return `
      <div class="connection-card">
        <div class="connection-title"><strong>${escapeHtml(t.ingredient)}</strong><span class="connection-score">${escapeHtml(phaseLabel)}</span></div>
        <p>Before: ${fmt(r.before)} symptomatic · Eliminating: ${fmt(r.eliminating)} · Reintroducing: ${fmt(r.reintroducing)}</p>
      </div>`;
  }).join("");
}

function renderSupplements(){
  const day=currentDay();
  const items=day.supplements||[];
  document.getElementById("supplementSummary").textContent=
    items.length ? `${items.length} entr${items.length===1?"y":"ies"}` : "Nothing logged yet";

  document.getElementById("supplementList").innerHTML=items.map((it,i)=>`
    <div class="food-entry">
      <div class="food-entry-main">
        <strong>${escapeHtml(it.name)}</strong>
        <small>${[it.kind==="prescription"?"Prescription/OTC":"Supplement", it.dose, it.time, it.courseId?"auto-logged":null].filter(Boolean).join(" · ")}</small>
        ${it.flag ? `<div class="ingredient-tags"><span class="side-effect-flag">${escapeHtml(titleCase(it.flag.terms.join(", ")))}</span></div>` : ""}
      </div>
      <div class="entry-actions">
        <button type="button" class="entry-action edit-supplement" data-index="${i}">View / Edit</button>
        <button type="button" class="entry-action delete delete-supplement" data-index="${i}">Delete</button>
      </div>
    </div>
  `).join("");

  document.querySelectorAll(".edit-supplement").forEach(btn=>{
    btn.addEventListener("click", ()=>openSupplement(Number(btn.dataset.index), dateKey()));
  });
  document.querySelectorAll(".delete-supplement").forEach(btn=>{
    btn.addEventListener("click", ()=>deleteSupplement(Number(btn.dataset.index), dateKey()));
  });
}

function renderCourses(){
  const box=document.getElementById("courseList");
  if(!box) return;
  const today=dateKey();
  const active=(state.courses||[]).filter(c=>isCourseActiveOn(c,today));

  box.innerHTML=active.map(c=>{
    const badge = c.durationDays==null
      ? "Daily"
      : `Day ${Math.min(c.durationDays, Math.round((new Date(today)-new Date(c.startDate))/86400000)+1)} of ${c.durationDays}`;
    return `
    <div class="course-row">
      <div class="course-row-main">
        <strong>${escapeHtml(c.name)}</strong>
        <span class="course-badge">${badge} · logged automatically</span>
      </div>
      <button type="button" class="course-stop-btn stop-course" data-id="${c.id}">Stop</button>
    </div>`;
  }).join("");

  box.querySelectorAll(".stop-course").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      const course=(state.courses||[]).find(c=>c.id===btn.dataset.id);
      if(!course) return;
      if(!confirm(`Stop "${course.name}"? Past logged entries are kept — this only stops future auto-logging.`)) return;
      course.active=false;
      saveState();
      renderCourses();
      showToast("Course stopped");
    });
  });
}

function attachSupplementFlag(dateKeyForEntry, id, flag){
  const day=getDay(dateKeyForEntry);
  const entry=(day.supplements||[]).find(x=>x.id===id);
  if(!entry) return;
  entry.flag=flag;
  if(entry.courseId){
    const course=(state.courses||[]).find(c=>c.id===entry.courseId);
    if(course) course.flag=flag;
  }
  saveState();
  if(dateKeyForEntry===dateKey()) renderSupplements();
}

function saveSupplement(){
  const nameEl=document.getElementById("supplementName");
  const name=nameEl.value.trim();
  if(!name){
    nameEl.classList.add("field-error");
    nameEl.focus();
    showToast("Please enter a supplement or medication name.");
    return;
  }
  nameEl.classList.remove("field-error");

  const kind=document.querySelector('[data-choice="supplementKind"] button.selected')?.dataset.value || "supplement";
  const isNew=supplementEditingIndex===null;
  const frequency=isNew ? (document.querySelector('[data-choice="supplementFrequency"] button.selected')?.dataset.value || "once") : "once";
  const targetDay=getDay(supplementEditingDateKey);
  const previous=isNew ? undefined : targetDay.supplements[supplementEditingIndex];

  let courseDays=null;
  if(frequency==="course"){
    courseDays=parseInt(document.getElementById("supplementCourseDays").value, 10);
    if(!courseDays || courseDays<1){
      document.getElementById("supplementCourseDays").classList.add("field-error");
      showToast("Please enter how many days this course runs for.");
      return;
    }
  }

  const flag = kind==="supplement" ? lookupSupplementGI(name) : (previous?.flag||null);
  const dose=document.getElementById("supplementDose").value.trim();
  const time=document.getElementById("supplementTime").value;
  const notes=document.getElementById("supplementNotes").value.trim();

  let course=null;
  if(isNew && frequency!=="once"){
    course={
      id: makeId(), name, kind, dose, time, notes, flag,
      startDate: supplementEditingDateKey,
      durationDays: frequency==="course" ? courseDays : null,
      active: true,
      createdAt: new Date().toISOString()
    };
  }

  const entry={
    id: previous?.id || makeId(),
    courseId: previous?.courseId || course?.id || null,
    name, kind, dose, time, notes, flag,
    createdAt: previous?.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  if(isNew){
    targetDay.supplements.push(entry);
  }else{
    targetDay.supplements[supplementEditingIndex]=entry;
  }
  if(course) state.courses.push(course);

  const saved=saveState();
  if(!saved){
    if(isNew){ targetDay.supplements.pop(); }
    else{ targetDay.supplements[supplementEditingIndex]=previous; }
    if(course) state.courses.pop();
    return;
  }

  closeSupplementDialog();
  renderAll();
  showToast(course
    ? `Entry saved — ${course.durationDays ? course.durationDays+"-day course" : "daily"} logging started`
    : (isNew ? "Entry saved" : "Changes saved"));

  // Prescription/OTC lookups hit the network, so they run silently in the
  // background after the save/close — never blocking the dialog on a slow
  // or failed request.
  if(kind==="prescription"){
    lookupPrescriptionGI(name).then(flag=>{
      if(flag) attachSupplementFlag(supplementEditingDateKey, entry.id, flag);
    });
  }
}

function deleteSupplement(index, entryDateKey){
  const targetDay=getDay(entryDateKey);
  const item=targetDay.supplements?.[index];
  if(!item) return;
  const isRecurring=!!item.courseId;
  const label=isRecurring ? `Remove "${item.name}" for today only? (The course keeps running.)` : `Delete "${item.name}"?`;
  if(!confirm(label)) return;
  targetDay.supplements.splice(index,1);
  if(isRecurring){
    targetDay.courseSkips ||= [];
    if(!targetDay.courseSkips.includes(item.courseId)) targetDay.courseSkips.push(item.courseId);
  }
  saveState();
  renderAll();
  if(document.getElementById("supplementDialog").open) closeSupplementDialog();
  showToast(isRecurring ? "Removed for today" : "Entry deleted");
}

document.getElementById("addSupplementBtn").addEventListener("click", ()=>openSupplement(null, dateKey()));
document.getElementById("saveSupplementBtn").addEventListener("click", saveSupplement);
document.getElementById("cancelSupplementBtn").addEventListener("click", closeSupplementDialog);
document.getElementById("closeSupplementDialog").addEventListener("click", closeSupplementDialog);
document.getElementById("deleteSupplementBtn").addEventListener("click", ()=>deleteSupplement(supplementEditingIndex, supplementEditingDateKey));
document.querySelectorAll('[data-choice="supplementFrequency"] button').forEach(btn=>{
  btn.addEventListener("click", ()=>{
    document.querySelectorAll('[data-choice="supplementFrequency"] button').forEach(b=>b.classList.remove("selected"));
    btn.classList.add("selected");
    document.getElementById("supplementCourseDaysWrap").classList.toggle("hidden", btn.dataset.value!=="course");
  });
});
document.querySelectorAll('[data-choice="supplementKind"] button').forEach(btn=>{
  btn.addEventListener("click", ()=>{
    document.querySelectorAll('[data-choice="supplementKind"] button').forEach(b=>b.classList.remove("selected"));
    btn.classList.add("selected");
  });
});
document.querySelectorAll('[data-choice="foodPortion"] button').forEach(btn=>{
  btn.addEventListener("click", ()=>{
    document.querySelectorAll('[data-choice="foodPortion"] button').forEach(b=>b.classList.remove("selected"));
    btn.classList.add("selected");
  });
});
document.getElementById("supplementDialog").addEventListener("cancel", e=>{
  e.preventDefault();
  closeSupplementDialog();
});

function handleIngredientPhoto(file, destination="meal"){
  cropDestination=destination;
  if(!file) return;
  pendingPhotoFile=file;

  const reader=new FileReader();
  reader.onload=()=>{
    const cropImg=document.getElementById("cropImage");
    const dialog=document.getElementById("cropDialog");

    // iOS Safari can miss the image if Cropper starts before the selected
    // photo has actually decoded. Initialise only after load/decode.
    cropImg.onload=async ()=>{
      try{
        if(cropImg.decode) await cropImg.decode().catch(()=>{});
      }catch(e){}

      if(!dialog.open) dialog.showModal();

      requestAnimationFrame(()=>{
        requestAnimationFrame(()=>{
          if(cropper) cropper.destroy();
          cropper=new Cropper(cropImg,{
            viewMode:1,
            dragMode:"move",
            autoCropArea:0.82,
            responsive:true,
            background:false,
            movable:true,
            zoomable:true,
            rotatable:false,
            scalable:false,
            checkOrientation:true
          });
        });
      });
    };

    cropImg.onerror=()=>{
      if(!dialog.open) dialog.showModal();
      document.querySelector(".crop-stage").innerHTML=
        '<div class="crop-error">Photo could not be displayed. Close this window and try again.</div>';
    };

    cropImg.src=reader.result;

    // If Safari already has the image cached and complete, manually trigger setup.
    if(cropImg.complete && cropImg.naturalWidth>0){
      cropImg.onload();
    }
  };
  reader.readAsDataURL(file);
}

function closeCropDialog(){
  const d=document.getElementById("cropDialog");
  try { if(d.open) d.close(); } catch(e) {}
  if(d.hasAttribute("open")) d.removeAttribute("open");
  if(cropper){ cropper.destroy(); cropper=null; }
}
function blobToFile(blob,name="ingredient-crop.jpg"){
  return new File([blob],name,{type:blob.type||"image/jpeg"});
}

// OCR gets the full-resolution crop (accuracy matters there). What we
// persist to localStorage is a much smaller, more compressed copy, so a
// diary full of photos doesn't blow the browser storage quota.
const STORAGE_PHOTO_MAX_DIM = 640;
const STORAGE_PHOTO_QUALITY = 0.55;
function resizeSourceForStorage(source, sw, sh){
  let w=sw, h=sh;
  if(w>h && w>STORAGE_PHOTO_MAX_DIM){ h=Math.round(h*STORAGE_PHOTO_MAX_DIM/w); w=STORAGE_PHOTO_MAX_DIM; }
  else if(h>=w && h>STORAGE_PHOTO_MAX_DIM){ w=Math.round(w*STORAGE_PHOTO_MAX_DIM/h); h=STORAGE_PHOTO_MAX_DIM; }
  const canvas=document.createElement("canvas");
  canvas.width=w; canvas.height=h;
  const ctx=canvas.getContext("2d");
  ctx.imageSmoothingEnabled=true;
  ctx.imageSmoothingQuality="high";
  ctx.drawImage(source,0,0,w,h);
  return canvas.toDataURL("image/jpeg",STORAGE_PHOTO_QUALITY);
}
function resizeCanvasForStorage(sourceCanvas){
  return resizeSourceForStorage(sourceCanvas, sourceCanvas.width, sourceCanvas.height);
}
function resizeDataURLForStorage(dataURL){
  return new Promise(resolve=>{
    const img=new Image();
    img.onload=()=>{
      try{ resolve(resizeSourceForStorage(img, img.naturalWidth||img.width, img.naturalHeight||img.height)); }
      catch(e){ console.warn("Storage resize failed, keeping original",e); resolve(dataURL); }
    };
    img.onerror=()=>resolve(dataURL);
    img.src=dataURL;
  });
}
function processChosenImage(file, previewData, storageData){
  closeCropDialog();
  // Checker photos are never persisted to state, so no storage-sized copy is needed there.
  const stored = storageData || previewData;

  if(cropDestination==="checker"){
    document.getElementById("checkerPreview").innerHTML=`<img src="${previewData}" alt="Ingredient label preview">`;
    scanCheckerImage(file);
    return;
  }

  photoData=stored;
  document.getElementById("photoPreview").innerHTML=`<img src="${stored}" alt="Ingredient photo preview">`;
  scanIngredientImage(file);
}
document.getElementById("confirmCropBtn").addEventListener("click",()=>{
  if(!cropper) return;
  const canvas=cropper.getCroppedCanvas({
    maxWidth:1800,
    maxHeight:1800,
    imageSmoothingEnabled:true,
    imageSmoothingQuality:"high"
  });
  canvas.toBlob(blob=>{
    if(!blob) return;
    // Keep the full-resolution blob for OCR accuracy...
    const file=blobToFile(blob);
    const previewData=canvas.toDataURL("image/jpeg",0.92);
    // ...but only store a much smaller, more compressed copy.
    const storageData=resizeCanvasForStorage(canvas);
    processChosenImage(file,previewData,storageData);
  },"image/jpeg",0.92);
});
document.getElementById("useFullPhotoBtn").addEventListener("click",async ()=>{
  if(!pendingPhotoFile) return;
  const reader=new FileReader();
  reader.onload=async ()=>{
    const previewData=reader.result;
    const storageData = cropDestination==="checker"
      ? previewData
      : await resizeDataURLForStorage(previewData);
    processChosenImage(pendingPhotoFile,previewData,storageData);
  };
  reader.readAsDataURL(pendingPhotoFile);
});
document.getElementById("cancelCropBtn").addEventListener("click",()=>{
  closeCropDialog();
});
document.getElementById("cropDialog").addEventListener("cancel",e=>{
  e.preventDefault();
  closeCropDialog();
});


document.getElementById("scanMealBarcodeBtn").addEventListener("click",()=>openBarcodeDialog("meal"));
document.getElementById("scanCheckerBarcodeBtn").addEventListener("click",()=>openBarcodeDialog("checker"));
document.getElementById("closeBarcodeBtn").addEventListener("click",closeBarcodeDialog);
document.getElementById("barcodeDialog").addEventListener("cancel",e=>{e.preventDefault();closeBarcodeDialog();});
document.getElementById("barcodePhoto").addEventListener("change",e=>{
  decodeBarcodePhoto(e.target.files?.[0]);
});
document.getElementById("lookupBarcodeBtn").addEventListener("click",()=>{
  const code=document.getElementById("manualBarcode").value.trim();
  if(code) lookupBarcode(code);
});
document.getElementById("manualBarcode").addEventListener("keydown",e=>{
  if(e.key==="Enter"){e.preventDefault();document.getElementById("lookupBarcodeBtn").click();}
});
document.getElementById("useBarcodeProductBtn").addEventListener("click",async()=>{
  if(!barcodeProduct) return;
  const product=barcodeProduct;
  await closeBarcodeDialog();
  if(barcodeDestination==="checker") applyBarcodeProductToChecker(product);
  else applyBarcodeProductToMeal(product);
});

document.getElementById("ingredientCamera").addEventListener("change",e=>{
  handleIngredientPhoto(e.target.files?.[0],"meal");
});
document.getElementById("ingredientLibrary").addEventListener("change",e=>{
  handleIngredientPhoto(e.target.files?.[0],"meal");
});
document.getElementById("ingredients").addEventListener("input",e=>renderFamilies(e.target.value));


function applyDefaultCheckerTriggers(){
  const defaults=new Set(state.profile?.allergies || []);
  document.querySelectorAll("#checkerTriggers button").forEach(btn=>{
    btn.classList.toggle("selected", defaults.has(btn.dataset.trigger));
  });
}
document.getElementById("openCheckerBtn").addEventListener("click",()=>{
  resetCheckerResult();
  document.getElementById("checkerCamera").value="";
  document.getElementById("checkerLibrary").value="";
  applyDefaultCheckerTriggers();
  document.getElementById("checkerDialog").showModal();
});
function closeCheckerDialog(){
  const d=document.getElementById("checkerDialog");
  try{ if(d.open) d.close(); }catch(e){}
  if(d.hasAttribute("open")) d.removeAttribute("open");
}

// --- Elimination trial dialog ---
function closeTrialDialog(){
  const dialog=document.getElementById("trialDialog");
  if(!dialog) return;
  try{ if(dialog.open) dialog.close(); }catch(err){ console.warn("Dialog close failed",err); }
  if(dialog.hasAttribute("open")) dialog.removeAttribute("open");
}
document.getElementById("openTrialDialogBtn").addEventListener("click", ()=>{
  document.getElementById("trialIngredient").value="";
  document.getElementById("trialIngredient").classList.remove("field-error");
  document.getElementById("trialEliminationDays").value="14";
  document.getElementById("trialReintroDays").value="3";
  document.getElementById("trialDialog").showModal();
});
document.getElementById("cancelTrialDialog").addEventListener("click", closeTrialDialog);
document.getElementById("closeTrialDialog").addEventListener("click", closeTrialDialog);
document.getElementById("trialDialog").addEventListener("cancel", e=>{
  e.preventDefault();
  closeTrialDialog();
});
document.getElementById("startTrialBtn").addEventListener("click", ()=>{
  const ingredientEl=document.getElementById("trialIngredient");
  const ingredient=ingredientEl.value.trim();
  if(!ingredient){
    ingredientEl.classList.add("field-error");
    ingredientEl.focus();
    showToast("Please enter what you're eliminating.");
    return;
  }
  ingredientEl.classList.remove("field-error");
  const eliminationDays=Math.max(1, Number(document.getElementById("trialEliminationDays").value)||14);
  const reintroDays=Math.max(1, Number(document.getElementById("trialReintroDays").value)||3);

  state.trials.push({
    id:makeId(), ingredient, startDate:dateKey(),
    eliminationDays, reintroDays, stoppedAt:null,
    createdAt:new Date().toISOString()
  });

  if(saveState()){
    closeTrialDialog();
    renderAll();
    showToast(`Trial started — eliminating ${ingredient} for ${eliminationDays} days`);
  }else{
    state.trials.pop();
  }
});
document.getElementById("stopTrialBtn").addEventListener("click", ()=>{
  const trial=activeTrialToday();
  if(!trial) return;
  if(!confirm(`Stop the ${trial.ingredient} trial now? Everything logged so far stays — this just ends automatic phase tracking.`)) return;
  trial.stoppedAt=dateKey();
  saveState();
  renderAll();
  showToast("Trial stopped");
});
document.getElementById("closeCheckerBtn").addEventListener("click",closeCheckerDialog);
document.getElementById("checkerDialog").addEventListener("cancel",e=>{e.preventDefault();closeCheckerDialog();});
document.querySelectorAll("#checkerTriggers button").forEach(btn=>{
  btn.addEventListener("click",()=>btn.classList.toggle("selected"));
});
document.getElementById("checkerCamera").addEventListener("change",e=>{
  if(!getSelectedCheckerTriggers().length){
    document.getElementById("checkerStatus").textContent="Select at least one ingredient to check first.";
    document.getElementById("checkerStatus").className="scan-status error";
    e.target.value="";
    return;
  }
  handleIngredientPhoto(e.target.files?.[0],"checker");
});
document.getElementById("checkerLibrary").addEventListener("change",e=>{
  if(!getSelectedCheckerTriggers().length){
    document.getElementById("checkerStatus").textContent="Select at least one ingredient to check first.";
    document.getElementById("checkerStatus").className="scan-status error";
    e.target.value="";
    return;
  }
  handleIngredientPhoto(e.target.files?.[0],"checker");
});
document.getElementById("checkerTextToggle").addEventListener("click",()=>{
  const box=document.getElementById("checkerExtracted");
  box.classList.toggle("hidden");
  document.getElementById("checkerTextToggle").textContent=
    box.classList.contains("hidden")?"Show scanned ingredient text":"Hide scanned ingredient text";
});

document.querySelectorAll("[data-choice]").forEach(group=>{
  group.querySelectorAll("button").forEach(btn=>{
    btn.addEventListener("click",()=>{
      group.querySelectorAll("button").forEach(b=>b.classList.remove("selected"));
      btn.classList.add("selected");
    });
  });
});
document.querySelectorAll("#symptomChips .chip").forEach(btn=>{
  btn.addEventListener("click",()=>btn.classList.toggle("selected"));
});

document.getElementById("saveExitBtn").onclick=()=>{
  const getSel = name => document.querySelector(`[data-choice="${name}"] .selected`);
  currentDay().exit={
    frequency:getSel("frequency")?.dataset.value || getSel("frequency")?.textContent.trim() || "",
    consistency:getSel("consistency")?.dataset.value || "",
    urgency:getSel("urgency")?.dataset.value || "",
    feeling:getSel("feeling")?.dataset.value || "",
    symptoms:[...document.querySelectorAll("#symptomChips .selected")].map(x=>x.textContent.trim()),
    notes:document.getElementById("exitNotes").value.trim(),
    updatedAt:new Date().toISOString()
  };
  if(saveState()){
    renderAll();
    showToast("Exit Interview saved");
  }
};

function renderExit(){
  const ex=currentDay().exit||{};
  const complete=Object.keys(ex).length>0;
  document.getElementById("exitStatus").textContent=complete?"Saved":"Not completed";
  document.getElementById("summaryMood").innerHTML=moodIcon(ex.feeling);
}

// --- Knowledge: reference cards for each allergen/intolerance category.
// Content is supplied by Lee, not generated here — this file only wires
// it to the same icon system as the rest of the app. SYMPTOM_ICONS covers
// the concepts common across cards (bloating, fatigue, etc.); add to this
// set as new symptoms show up in future cards rather than one-off icons
// per card, so the same "Fatigue" icon always means the same thing.
const SYMPTOM_ICONS={
  bloating:`<svg viewBox="0 0 24 24" ${SVG_BASE}><path d="M8 10c-.6 3 .3 7 4 7s4.6-4 4-7"/><path d="M8 10c0-2.2 1.8-4 4-4s4 1.8 4 4"/><path d="M6.5 8.3 5.3 7M17.5 8.3l1.2-1.3M9 6l-.5-1.6M15 6l.5-1.6"/></svg>`,
  abdominalPain:`<svg viewBox="0 0 24 24" ${SVG_BASE}><path d="M5 6c1.5 0 1.5 2 3 2s1.5-2 3-2 1.5 2 3 2 1.5-2 3-2"/><path d="M5 12c1.5 0 1.5 2 3 2s1.5-2 3-2 1.5 2 3 2 1.5-2 3-2"/><path d="M5 18c1.5 0 1.5 2 3 2s1.5-2 3-2 1.5 2 3 2 1.5-2 3-2"/></svg>`,
  diarrhoea:`<svg viewBox="0 0 24 24" ${SVG_BASE}><path d="M7 11h10l-1.2 7.2a2 2 0 0 1-2 1.8h-3.6a2 2 0 0 1-2-1.8Z"/><path d="M8 11c0-3 1.5-5 4-5s4 2 4 5"/></svg>`,
  fatigue:`<svg viewBox="0 0 24 24" ${SVG_BASE}><rect x="7" y="4" width="10" height="17" rx="1.5"/><path d="M9.5 4V2.5h5V4"/><path d="M9.5 16h5"/></svg>`,
  headache:`<svg viewBox="0 0 24 24" ${SVG_BASE}><path d="M8.5 15.5C6.5 14 6 11.8 7 9.8 8 7.7 10.2 6.5 12.5 7c2.4.5 4 2.6 3.7 5-.2 1.6-1.2 2.5-1.2 4v1.5h-6.5Z"/><path d="M10 21h4"/><path d="M5 8l-1.3-.6M6.5 5.3 5.6 4M9 4l-.4-1.5"/></svg>`,
  brainFog:`<svg viewBox="0 0 24 24" ${SVG_BASE}><path d="M9 15.5a3.5 3.5 0 0 1-1-6.9A4 4 0 0 1 15.8 7 3.5 3.5 0 0 1 15 13.9"/><path d="M12 8v8"/><path d="M3.5 12h2M18.5 10.5h2M4 16h1.8"/></svg>`,
  nausea:`<svg viewBox="0 0 24 24" ${SVG_BASE}><circle cx="12" cy="12" r="7.5"/><path d="M8.5 10.5c.6-.8 1.4-.8 2 0M13.5 10.5c.6-.8 1.4-.8 2 0"/><path d="M8 15.5c1.2-1 2.7-1 4 0 1.3-1 2.8-1 4 0"/></svg>`,
  skin:`<svg viewBox="0 0 24 24" ${SVG_BASE}><path d="M6 13c0-4 2.5-8 6-9 3.5 1 6 5 6 9a6 6 0 0 1-12 0Z"/><circle cx="10" cy="13" r=".4" fill="currentColor"/><circle cx="14" cy="11" r=".4" fill="currentColor"/><circle cx="12" cy="15.5" r=".4" fill="currentColor"/></svg>`,
  joint:`<svg viewBox="0 0 24 24" ${SVG_BASE}><path d="M6 18 11 8"/><path d="M13 8 18 18"/><circle cx="12" cy="8" r="2.2"/></svg>`,
  breathing:`<svg viewBox="0 0 24 24" ${SVG_BASE}><path d="M8 20c-2.5 0-4-1.8-4-4s1.8-4 4-3.4"/><path d="M16 20c2.5 0 4-1.8 4-4s-1.8-4-4-3.4"/><path d="M12 4v13"/></svg>`,
  vomiting:`<svg viewBox="0 0 24 24" ${SVG_BASE}><circle cx="12" cy="10" r="6.5"/><path d="M9 8.5c.5-.7 1.3-.7 1.8 0M13.2 8.5c.5-.7 1.3-.7 1.8 0"/><path d="M9 12c1-.8 2.3-.8 3 0 .7-.8 2-.8 3 0"/><path d="M12 17v4M9.5 21h5"/></svg>`,
  swelling:`<svg viewBox="0 0 24 24" ${SVG_BASE}><circle cx="12" cy="12" r="5"/><path d="M12 4v2M12 18v2M4 12h2M18 12h2M6.3 6.3l1.4 1.4M16.3 6.3l-1.4 1.4M6.3 17.7l1.4-1.4M16.3 17.7l-1.4-1.4"/></svg>`,
  dizziness:`<svg viewBox="0 0 24 24" ${SVG_BASE}><circle cx="12" cy="12" r="1.3" fill="currentColor" stroke="none"/><ellipse cx="12" cy="12" rx="8" ry="3.2" transform="rotate(-20 12 12)"/><ellipse cx="12" cy="12" rx="8" ry="3.2" transform="rotate(40 12 12)"/></svg>`,
  wind:`<svg viewBox="0 0 24 24" ${SVG_BASE}><path d="M4 9c3 0 3-3 6-3s2 3 5 3 3-2 5-1"/><path d="M4 15c3 0 3-3 6-3s2 3 5 3 3-2 5-1"/></svg>`,
  gurgling:`<svg viewBox="0 0 24 24" ${SVG_BASE}><path d="M6 11c-.4 3 .4 6.5 4 6.5s4.4-3.5 4-6.5"/><path d="M6 11c0-2.2 1.8-4 4-4s4 1.8 4 4"/><path d="M16 8c1 .8 1 2 0 3M18 6.5c1.8 1.6 1.8 4.4 0 6"/></svg>`,
  mouth:`<svg viewBox="0 0 24 24" ${SVG_BASE}><path d="M5 12c2-2 5-3 7-3s5 1 7 3c-2 2-5 3-7 3s-5-1-7-3Z"/><path d="M9 12h6"/><path d="M17.5 6.7l.8-.8M19.5 9.2l1-.4"/></svg>`,
  constipation:`<svg viewBox="0 0 24 24" ${SVG_BASE}><path d="M7 4h10M7 20h10M8 4c0 4 3 6 4 6s4-2 4-6M8 20c0-4 3-6 4-6s4 2 4 6"/></svg>`,
  heartburn:`<svg viewBox="0 0 24 24" ${SVG_BASE}><path d="M12 3c1 3-2 4-2 7a3 3 0 0 0 6 0c0-1.5-1-2-1-3.5 2 1 3 3.5 3 5.5a5 5 0 0 1-10 0C8 8 10 6 12 3Z"/></svg>`
};

let knowledgeCards={};
function registerKnowledgeCards(cards){ Object.assign(knowledgeCards, cards||{}); renderKnowledgeGrid(); }

function renderKnowledgeGrid(){
  const grid=document.getElementById("knowledgeGrid");
  if(!grid) return;
  const entries=Object.keys(ALLERGEN_ICONS);
  grid.innerHTML=entries.map(name=>{
    const has=!!knowledgeCards[name];
    return `<button type="button" class="knowledge-tile${has?"":" knowledge-tile-empty"}" data-name="${escapeHtml(name)}">
      <span class="icon-tile">${ALLERGEN_ICONS[name]}</span>
      <strong>${escapeHtml(name)}</strong>
      ${has?"":"<small>Coming soon</small>"}
    </button>`;
  }).join("");
  grid.querySelectorAll(".knowledge-tile").forEach(btn=>{
    btn.addEventListener("click", ()=>openKnowledgeCard(btn.dataset.name));
  });
}

function openKnowledgeCard(name){
  const card=knowledgeCards[name];
  if(!card) return;
  document.getElementById("knowledgeCardIcon").innerHTML=ALLERGEN_ICONS[name]||"";
  document.getElementById("knowledgeCardTitle").textContent=name;

  const paragraphs=(card.description||[]).map(p=>`<p>${escapeHtml(p)}</p>`).join("");
  const symptoms=(card.symptoms||[]).map(s=>`
    <div class="symptom-tile">
      <span class="icon-tile symptom-icon">${SYMPTOM_ICONS[s.icon]||SYMPTOM_ICONS.abdominalPain}</span>
      <div><strong>${escapeHtml(s.title)}</strong><small>${escapeHtml(s.text)}</small></div>
    </div>`).join("");

  document.getElementById("knowledgeCardBody").innerHTML=`
    ${paragraphs}
    ${symptoms ? `<div class="knowledge-divider"></div><div class="eyebrow">KEY SYMPTOMS</div><div class="symptom-grid">${symptoms}</div>` : ""}
    ${card.goodToKnow ? `<div class="checker-warning" style="margin-top:20px"><strong>Good to know</strong><p>${escapeHtml(card.goodToKnow)}</p></div>` : ""}
  `;
  const dialog=document.getElementById("knowledgeDialog");
  dialog.showModal();
  // Double rAF so the browser paints the dialog in its starting state
  // before the "show" class is added — otherwise the transition has
  // nothing to transition from and just snaps straight to the end state.
  requestAnimationFrame(()=>{
    requestAnimationFrame(()=>dialog.classList.add("show"));
  });
}
function closeKnowledgeDialog(){
  const d=document.getElementById("knowledgeDialog");
  if(!d || !d.open) return;
  d.classList.remove("show");
  let done=false;
  const finish=()=>{
    if(done) return;
    done=true;
    clearTimeout(timer);
    try{ if(d.open) d.close(); }catch(err){ console.warn("Dialog close failed",err); }
    if(d.hasAttribute("open")) d.removeAttribute("open");
  };
  d.addEventListener("transitionend", finish, {once:true});
  const timer=setTimeout(finish, 260); // safety net if transitionend doesn't fire
}
document.getElementById("closeKnowledgeDialog").addEventListener("click", closeKnowledgeDialog);
document.getElementById("knowledgeDialog").addEventListener("cancel", e=>{
  e.preventDefault();
  closeKnowledgeDialog();
});

// Working example, using the exact content already shared, so the system
// is provable before the remaining 21 cards arrive.
registerKnowledgeCards({
  "Cereals containing gluten": {
    description:[
      "Gluten cereals intolerance (also known as coeliac disease) is an immune reaction to gluten, a protein found in wheat, barley, rye and their derivatives. When gluten is consumed, it can damage the lining of the small intestine, leading to poor nutrient absorption and a range of uncomfortable symptoms.",
      "It is a chronic condition and symptoms can occur even with small amounts of gluten. Strict, lifelong avoidance of gluten is currently the only treatment."
    ],
    symptoms:[
      {icon:"bloating", title:"Bloating & wind", text:"Feeling bloated or gassy after eating."},
      {icon:"abdominalPain", title:"Abdominal pain", text:"Stomach cramps or pain, often after meals."},
      {icon:"diarrhoea", title:"Diarrhoea", text:"Frequent, loose or watery stools."},
      {icon:"fatigue", title:"Fatigue", text:"Tiredness, low energy or weakness."},
      {icon:"headache", title:"Headaches", text:"Recurring headaches or migraines."},
      {icon:"brainFog", title:"Brain fog", text:"Difficulty concentrating, forgetfulness."}
    ],
    goodToKnow:"Gluten can be hidden in many foods including sauces, soups, processed meats, confectionery and some drinks. Always check labels and look for hidden sources."
  }
});

registerKnowledgeCards({
  "Wheat": {
    description:[
      "Wheat is a cereal grain found in a wide range of everyday foods, including bread, pasta, cereals, biscuits, cakes and many processed foods. Wheat can cause symptoms in people with wheat allergy, coeliac disease or wheat intolerance, although these are different conditions.",
      "Symptoms can vary considerably between people and may affect the digestive system, skin, breathing or general wellbeing. Wheat can also appear in foods under less obvious names, making ingredient-label checking particularly important."
    ],
    symptoms:[
      {icon:"bloating", title:"Bloating", text:"Feeling swollen, full or uncomfortable after eating."},
      {icon:"abdominalPain", title:"Abdominal pain", text:"Stomach cramps, discomfort or pain."},
      {icon:"diarrhoea", title:"Diarrhoea", text:"Loose or watery stools following exposure."},
      {icon:"fatigue", title:"Fatigue", text:"Tiredness or reduced energy after eating."},
      {icon:"headache", title:"Headaches", text:"Headaches that may occur alongside other symptoms."},
      {icon:"skin", title:"Skin reactions", text:"Rashes, itching or hives can occur with wheat allergy."}
    ],
    goodToKnow:"Wheat can be found in bread, pasta, cereals, cakes, biscuits, sauces and processed foods. Check ingredient labels carefully, particularly on packaged foods."
  },
  "Milk / dairy": {
    description:[
      "Milk and dairy products contain several components that can cause problems for some people. Milk allergy involves an immune reaction to milk proteins, while lactose intolerance involves difficulty digesting the naturally occurring sugar lactose.",
      "Symptoms can range from digestive discomfort to skin or respiratory symptoms in people with a true milk allergy. Dairy products include milk, cream, butter, cheese, yoghurt and many foods made using these ingredients."
    ],
    symptoms:[
      {icon:"bloating", title:"Bloating", text:"Abdominal swelling or fullness after consuming dairy."},
      {icon:"abdominalPain", title:"Abdominal pain", text:"Cramps or stomach discomfort."},
      {icon:"diarrhoea", title:"Diarrhoea", text:"Loose or watery stools after dairy consumption."},
      {icon:"nausea", title:"Nausea", text:"Feeling sick or unsettled after eating dairy."},
      {icon:"skin", title:"Skin reactions", text:"Rashes, itching or hives may occur with milk allergy."},
      {icon:"fatigue", title:"Fatigue", text:"Tiredness or reduced energy may accompany digestive symptoms."}
    ],
    goodToKnow:"Milk ingredients can appear in unexpected foods including sauces, chocolate, baked goods and processed meals. Milk, whey, casein and milk powder are common ingredients to look for."
  },
  "Lactose": {
    description:[
      "Lactose is the naturally occurring sugar found in milk and many dairy products. Lactose intolerance occurs when the body does not produce enough lactase, the enzyme needed to digest lactose effectively.",
      "Undigested lactose reaches the large intestine, where it can cause digestive symptoms. The amount that causes symptoms varies between people, and some people can tolerate small quantities."
    ],
    symptoms:[
      {icon:"bloating", title:"Bloating", text:"Abdominal swelling or a feeling of fullness."},
      {icon:"wind", title:"Wind", text:"Increased gas or flatulence after consuming lactose."},
      {icon:"abdominalPain", title:"Abdominal pain", text:"Cramping or discomfort after eating dairy."},
      {icon:"diarrhoea", title:"Diarrhoea", text:"Loose or watery stools following lactose consumption."},
      {icon:"nausea", title:"Nausea", text:"Feeling sick or unsettled after eating lactose."},
      {icon:"gurgling", title:"Stomach rumbling", text:"Increased intestinal sounds or movement."}
    ],
    goodToKnow:"Lactose is found mainly in milk and dairy products. Lactose-free milk and dairy alternatives may be suitable for some people, but always check the ingredients of processed foods."
  },
  "Egg": {
    description:[
      "Egg allergy is an immune response to proteins found primarily in egg white, although egg yolk can also cause reactions. Eggs are used in many foods beyond obvious dishes such as omelettes and scrambled eggs.",
      "Some people experience digestive symptoms, while an egg allergy can also cause skin or respiratory reactions. The severity and symptoms can vary considerably between individuals."
    ],
    symptoms:[
      {icon:"abdominalPain", title:"Abdominal pain", text:"Stomach cramps or discomfort."},
      {icon:"nausea", title:"Nausea", text:"Feeling sick after eating egg."},
      {icon:"diarrhoea", title:"Diarrhoea", text:"Loose stools following exposure."},
      {icon:"skin", title:"Skin reactions", text:"Itching, hives or a rash may occur."},
      {icon:"swelling", title:"Swelling", text:"Swelling can occur with an allergic reaction."},
      {icon:"fatigue", title:"Fatigue", text:"Tiredness or feeling unwell following exposure."}
    ],
    goodToKnow:"Egg can be hidden in cakes, biscuits, mayonnaise, pasta, sauces and baked goods. Ingredient labels may list egg, albumen, ovalbumin or other egg-derived ingredients."
  },
  "Soya": {
    description:[
      "Soya is a legume used extensively in food manufacturing. It can be eaten directly as foods such as tofu and edamame, but soya-derived ingredients are also commonly used in processed foods.",
      "Soya allergy is an immune reaction to soya proteins. Symptoms may affect the digestive system, skin or respiratory system and can vary from mild to more significant reactions."
    ],
    symptoms:[
      {icon:"bloating", title:"Bloating", text:"Feeling bloated or uncomfortable."},
      {icon:"abdominalPain", title:"Abdominal pain", text:"Stomach cramps or discomfort."},
      {icon:"nausea", title:"Nausea", text:"Feeling sick after consuming soya."},
      {icon:"skin", title:"Skin reactions", text:"Rashes, itching or hives may occur."},
      {icon:"headache", title:"Headaches", text:"Headaches may occur alongside other symptoms."},
      {icon:"fatigue", title:"Fatigue", text:"Tiredness or feeling generally unwell."}
    ],
    goodToKnow:"Soya can appear as tofu, soya milk, soya protein, textured vegetable protein and soya flour. It is also commonly used in processed foods and some sauces."
  },
  "Peanuts": {
    description:[
      "Peanuts are legumes and are a recognised food allergen. Peanut allergy occurs when the immune system reacts to peanut proteins and can cause symptoms after very small amounts in some people.",
      "Peanuts and peanut ingredients can occur in both obvious foods and manufactured products. Anyone with a diagnosed peanut allergy should follow the advice provided by their healthcare professional."
    ],
    symptoms:[
      {icon:"skin", title:"Skin reactions", text:"Itching, hives or a rash may develop."},
      {icon:"swelling", title:"Swelling", text:"Swelling can occur during an allergic reaction."},
      {icon:"abdominalPain", title:"Abdominal pain", text:"Stomach pain or cramping."},
      {icon:"nausea", title:"Nausea", text:"Feeling sick after exposure."},
      {icon:"breathing", title:"Breathing symptoms", text:"Wheezing, coughing or difficulty breathing can occur with allergy."},
      {icon:"dizziness", title:"Feeling faint", text:"Feeling dizzy or faint can occur during a significant allergic reaction."}
    ],
    goodToKnow:"Peanuts may be present in sauces, desserts, chocolate, cereals and processed foods. Always check allergen information and cross-contamination warnings where relevant."
  },
  "Tree nuts": {
    description:[
      "Tree nuts include foods such as almonds, hazelnuts, walnuts, cashews, pecans, pistachios and Brazil nuts. Nut allergy is an immune reaction to proteins found in one or more types of tree nut.",
      "People can react to a single type of nut or several different nuts. Nuts can also be present in foods where they are not immediately obvious."
    ],
    symptoms:[
      {icon:"skin", title:"Skin reactions", text:"Itching, hives or a rash may occur."},
      {icon:"swelling", title:"Swelling", text:"Swelling can affect the lips, face or other areas."},
      {icon:"abdominalPain", title:"Abdominal pain", text:"Stomach pain or cramping."},
      {icon:"nausea", title:"Nausea", text:"Feeling sick following exposure."},
      {icon:"breathing", title:"Breathing symptoms", text:"Coughing, wheezing or breathing difficulty can occur."},
      {icon:"dizziness", title:"Feeling faint", text:"Dizziness or faintness may occur during a significant reaction."}
    ],
    goodToKnow:"Tree nuts can be found in cereals, chocolate, desserts, pesto, sauces and plant-based products. Check the specific nut listed rather than assuming all nuts are equivalent."
  },
  "Sesame": {
    description:[
      "Sesame seeds and sesame-derived ingredients are used in breads, crackers, hummus, tahini, sauces and many other foods. Sesame allergy is an immune reaction to sesame proteins.",
      "Sesame can sometimes be present in foods where it is not obvious from the product name, making careful ingredient checking important for people with a known allergy."
    ],
    symptoms:[
      {icon:"skin", title:"Skin reactions", text:"Itching, hives or a rash may develop."},
      {icon:"swelling", title:"Swelling", text:"Swelling may occur during an allergic reaction."},
      {icon:"abdominalPain", title:"Abdominal pain", text:"Stomach discomfort or cramping."},
      {icon:"nausea", title:"Nausea", text:"Feeling sick after exposure."},
      {icon:"breathing", title:"Breathing symptoms", text:"Coughing, wheezing or breathing difficulty can occur."},
      {icon:"dizziness", title:"Feeling faint", text:"Dizziness or faintness can occur with a significant reaction."}
    ],
    goodToKnow:"Look for sesame, sesame seeds, tahini and sesame oil on ingredient labels. Sesame is particularly common in bread, hummus, Middle Eastern foods and Asian-style sauces."
  },
  "Fish": {
    description:[
      "Fish allergy is an immune reaction to proteins found in fish. A person may react to one species of fish while tolerating another, although medical advice should be followed before testing tolerance.",
      "Fish can be present in obvious dishes as well as sauces, stocks and processed foods. Fish products may also be encountered in restaurants and takeaway meals."
    ],
    symptoms:[
      {icon:"skin", title:"Skin reactions", text:"Itching, hives or a rash may occur."},
      {icon:"swelling", title:"Swelling", text:"Swelling can occur during an allergic reaction."},
      {icon:"abdominalPain", title:"Abdominal pain", text:"Stomach pain or cramping."},
      {icon:"nausea", title:"Nausea", text:"Feeling sick following exposure."},
      {icon:"breathing", title:"Breathing symptoms", text:"Coughing, wheezing or breathing difficulty can occur."},
      {icon:"dizziness", title:"Feeling faint", text:"Dizziness or faintness may accompany a significant reaction."}
    ],
    goodToKnow:"Fish can be hidden in sauces, stocks, dressings and processed foods. Check labels carefully and ask about ingredients when eating food prepared outside the home."
  },
  "Crustaceans": {
    description:[
      "Crustaceans are shellfish such as prawns, crabs and lobsters. Crustacean allergy is an immune reaction to proteins in these animals and is one of the recognised food allergens.",
      "Some people react to one type of crustacean while others react to several. Cross-contact can also be important when food is prepared alongside other shellfish."
    ],
    symptoms:[
      {icon:"skin", title:"Skin reactions", text:"Itching, hives or a rash may develop."},
      {icon:"swelling", title:"Swelling", text:"Swelling may occur during an allergic reaction."},
      {icon:"abdominalPain", title:"Abdominal pain", text:"Stomach cramps or discomfort."},
      {icon:"nausea", title:"Nausea", text:"Feeling sick after exposure."},
      {icon:"breathing", title:"Breathing symptoms", text:"Wheezing, coughing or breathing difficulty can occur."},
      {icon:"dizziness", title:"Feeling faint", text:"Dizziness or faintness can occur during a significant reaction."}
    ],
    goodToKnow:"Prawns, crab, lobster and similar shellfish are crustaceans. Check sauces, seafood dishes and restaurant meals carefully, as cross-contact can occur during preparation."
  },
  "Molluscs": {
    description:[
      "Molluscs include foods such as mussels, oysters, clams, squid, octopus and snails. Mollusc allergy is an immune reaction to proteins found in these foods.",
      "Reactions can vary between individuals, and some people may react to several different mollusc species. Molluscs can also be used in mixed seafood dishes and sauces."
    ],
    symptoms:[
      {icon:"skin", title:"Skin reactions", text:"Itching, hives or a rash may occur."},
      {icon:"swelling", title:"Swelling", text:"Swelling can occur during an allergic reaction."},
      {icon:"abdominalPain", title:"Abdominal pain", text:"Stomach cramps or discomfort."},
      {icon:"nausea", title:"Nausea", text:"Feeling sick following exposure."},
      {icon:"breathing", title:"Breathing symptoms", text:"Coughing, wheezing or breathing difficulty can occur."},
      {icon:"dizziness", title:"Feeling faint", text:"Dizziness or faintness may occur during a significant reaction."}
    ],
    goodToKnow:"Molluscs include mussels, oysters, squid, octopus, clams and snails. Take particular care with mixed seafood dishes and sauces when eating out."
  },
  "Celery": {
    description:[
      "Celery is a recognised food allergen and can cause an immune reaction in susceptible people. It can be found as fresh celery, seeds, salt, juice or as an ingredient in stocks and seasoning mixes.",
      "Celery is particularly easy to overlook because it is often used as a background ingredient rather than being the main component of a dish."
    ],
    symptoms:[
      {icon:"skin", title:"Skin reactions", text:"Itching, hives or a rash may occur."},
      {icon:"swelling", title:"Swelling", text:"Swelling may occur during an allergic reaction."},
      {icon:"abdominalPain", title:"Abdominal pain", text:"Stomach cramps or discomfort."},
      {icon:"nausea", title:"Nausea", text:"Feeling sick following exposure."},
      {icon:"mouth", title:"Mouth tingling", text:"Tingling or itching in the mouth may occur."},
      {icon:"breathing", title:"Breathing symptoms", text:"Breathing difficulty can occur with allergy."}
    ],
    goodToKnow:"Celery may be found in soups, stocks, sauces, seasoning mixes, salads and processed foods. Check labels for celery, celery seed and celery-derived ingredients."
  },
  "Mustard": {
    description:[
      "Mustard is a recognised food allergen made from the seeds of mustard plants. It is commonly used in condiments, dressings, sauces, marinades and prepared foods.",
      "Mustard can be present in relatively small quantities and may not always be obvious from the name of a prepared dish."
    ],
    symptoms:[
      {icon:"skin", title:"Skin reactions", text:"Itching, hives or a rash may occur."},
      {icon:"swelling", title:"Swelling", text:"Swelling can occur during an allergic reaction."},
      {icon:"abdominalPain", title:"Abdominal pain", text:"Stomach pain or cramping."},
      {icon:"nausea", title:"Nausea", text:"Feeling sick following exposure."},
      {icon:"mouth", title:"Mouth irritation", text:"Tingling, itching or irritation in the mouth."},
      {icon:"breathing", title:"Breathing symptoms", text:"Coughing, wheezing or breathing difficulty can occur."}
    ],
    goodToKnow:"Mustard can be found in sauces, mayonnaise, salad dressings, marinades, pickles and processed meats. Check ingredients for mustard and mustard-derived products."
  },
  "Sulphites": {
    description:[
      "Sulphites are preservatives used to help maintain the colour, freshness and shelf life of certain foods and drinks. They can occur naturally in some foods but are also added during processing.",
      "Some people, particularly those with asthma, can experience adverse reactions to sulphites. Symptoms are not necessarily the same as those caused by a conventional food allergy."
    ],
    symptoms:[
      {icon:"headache", title:"Headaches", text:"Headaches may occur following exposure."},
      {icon:"abdominalPain", title:"Abdominal pain", text:"Stomach discomfort or cramping."},
      {icon:"nausea", title:"Nausea", text:"Feeling sick or unsettled."},
      {icon:"skin", title:"Skin reactions", text:"Flushing, itching or hives may occur."},
      {icon:"breathing", title:"Breathing symptoms", text:"Coughing, wheezing or breathing difficulty may occur."},
      {icon:"fatigue", title:"Fatigue", text:"Feeling tired or generally unwell."}
    ],
    goodToKnow:"Sulphites may be used in dried fruit, wine, some processed foods and other preserved products. In the UK, added sulphites must be declared when present above the relevant threshold."
  },
  "Lupin": {
    description:[
      "Lupin is a legume that is increasingly used in foods such as flour, breads, pastries and plant-based products. Lupin allergy is an immune reaction to proteins found in the lupin plant.",
      "People with peanut allergy may also need to discuss lupin with a healthcare professional because cross-reactivity can occur between peanut and lupin proteins."
    ],
    symptoms:[
      {icon:"skin", title:"Skin reactions", text:"Itching, hives or a rash may occur."},
      {icon:"swelling", title:"Swelling", text:"Swelling may occur during an allergic reaction."},
      {icon:"abdominalPain", title:"Abdominal pain", text:"Stomach cramps or discomfort."},
      {icon:"nausea", title:"Nausea", text:"Feeling sick following exposure."},
      {icon:"breathing", title:"Breathing symptoms", text:"Coughing, wheezing or breathing difficulty can occur."},
      {icon:"dizziness", title:"Feeling faint", text:"Dizziness or faintness can occur during a significant reaction."}
    ],
    goodToKnow:"Lupin may be used as flour or protein in bread, pasta, pastries and plant-based foods. Check labels carefully, especially on products marketed as high-protein or gluten-free."
  },
  "Onion": {
    description:[
      "Onion is a member of the allium family and is widely used in cooking, sauces, soups, stocks and processed foods. Problems with onion are more commonly associated with intolerance or sensitivity than a true food allergy.",
      "Onions contain fermentable carbohydrates called fructans. In susceptible people these can be difficult to digest and may contribute to digestive symptoms."
    ],
    symptoms:[
      {icon:"bloating", title:"Bloating", text:"Abdominal swelling or fullness after eating."},
      {icon:"wind", title:"Wind", text:"Increased gas or flatulence."},
      {icon:"abdominalPain", title:"Abdominal pain", text:"Cramping or stomach discomfort."},
      {icon:"diarrhoea", title:"Diarrhoea", text:"Loose stools may occur in some people."},
      {icon:"constipation", title:"Constipation", text:"Changes in bowel habits can occur."},
      {icon:"gurgling", title:"Stomach rumbling", text:"Increased intestinal movement or noises."}
    ],
    goodToKnow:"Onion is particularly high in fructans. It can be present in soups, sauces, stocks, ready meals and seasoning mixes, even when fresh onion is not visible."
  },
  "Garlic": {
    description:[
      "Garlic is another member of the allium family and is widely used as a seasoning. Reactions to garlic are generally considered an intolerance or sensitivity rather than a recognised food allergy.",
      "Garlic contains fructans, which can ferment in the digestive system and cause symptoms in people who are sensitive to them."
    ],
    symptoms:[
      {icon:"bloating", title:"Bloating", text:"Feeling swollen or uncomfortably full."},
      {icon:"wind", title:"Wind", text:"Increased gas or flatulence."},
      {icon:"abdominalPain", title:"Abdominal pain", text:"Stomach cramps or discomfort."},
      {icon:"diarrhoea", title:"Diarrhoea", text:"Loose stools following consumption."},
      {icon:"constipation", title:"Constipation", text:"Changes in bowel habits may occur."},
      {icon:"gurgling", title:"Stomach rumbling", text:"Increased intestinal noises or movement."}
    ],
    goodToKnow:"Garlic is commonly hidden in sauces, marinades, stocks, seasoning blends and ready meals. Garlic powder can also contain concentrated amounts of fructans."
  },
  "Chilli": {
    description:[
      "Chilli peppers contain naturally occurring compounds that produce their characteristic heat. Some people experience digestive symptoms after eating chilli without having a true chilli allergy.",
      "The amount tolerated can vary considerably between individuals. Chilli is also frequently combined with other ingredients such as garlic, onion and spices, which can make identifying the trigger more difficult."
    ],
    symptoms:[
      {icon:"abdominalPain", title:"Abdominal pain", text:"Stomach discomfort or cramping."},
      {icon:"heartburn", title:"Heartburn", text:"A burning sensation in the chest or upper stomach."},
      {icon:"diarrhoea", title:"Diarrhoea", text:"Loose stools after eating spicy foods."},
      {icon:"nausea", title:"Nausea", text:"Feeling sick or unsettled."},
      {icon:"bloating", title:"Bloating", text:"Feeling swollen or uncomfortable."},
      {icon:"mouth", title:"Mouth irritation", text:"Burning or irritation in the mouth."}
    ],
    goodToKnow:"Chilli can appear fresh, dried, powdered or in sauces and seasoning blends. When tracking symptoms, note the amount eaten because tolerance may vary with portion size."
  },
  "Tomato": {
    description:[
      "Tomatoes are widely used in fresh foods, sauces, soups, pasta dishes and processed meals. Problems with tomato are more commonly reported as intolerance or sensitivity than as a true food allergy.",
      "Tomatoes are naturally acidic and also contain several compounds that may cause symptoms in susceptible individuals. Keeping a diary can help identify whether symptoms consistently follow tomato consumption."
    ],
    symptoms:[
      {icon:"heartburn", title:"Heartburn", text:"Burning or reflux symptoms after eating."},
      {icon:"abdominalPain", title:"Abdominal pain", text:"Stomach discomfort or cramping."},
      {icon:"bloating", title:"Bloating", text:"Feeling swollen or uncomfortably full."},
      {icon:"diarrhoea", title:"Diarrhoea", text:"Loose stools may occur in some people."},
      {icon:"nausea", title:"Nausea", text:"Feeling sick or unsettled."},
      {icon:"skin", title:"Skin reactions", text:"Itching or skin irritation may occur in some people."}
    ],
    goodToKnow:"Tomato is found in ketchup, pasta sauces, soups, salsa, pizzas and many ready meals. Processed tomato products can be more concentrated than fresh tomato."
  },
  "Legumes / pulses": {
    description:[
      "Legumes and pulses include foods such as lentils, chickpeas, beans and peas. They are an important source of protein and fibre but can cause digestive symptoms in some people.",
      "Some legumes contain fermentable carbohydrates that can be difficult to digest, while others can cause genuine allergic reactions. Symptoms and tolerance can vary significantly between different types and portion sizes."
    ],
    symptoms:[
      {icon:"bloating", title:"Bloating", text:"Abdominal swelling or fullness."},
      {icon:"wind", title:"Wind", text:"Increased gas following consumption."},
      {icon:"abdominalPain", title:"Abdominal pain", text:"Cramps or digestive discomfort."},
      {icon:"diarrhoea", title:"Diarrhoea", text:"Loose stools may occur."},
      {icon:"constipation", title:"Constipation", text:"Changes in bowel habits can occur."},
      {icon:"nausea", title:"Nausea", text:"Feeling sick after eating certain pulses."}
    ],
    goodToKnow:"Beans, lentils and chickpeas can contain fermentable carbohydrates that produce gas during digestion. Rinsing canned pulses and starting with smaller portions may improve tolerance for some people."
  },
  "Sweeteners": {
    description:[
      "Sweeteners are used to provide sweetness while reducing or replacing sugar. Some, particularly sugar alcohols such as sorbitol, mannitol and xylitol, can cause digestive symptoms when consumed in larger amounts.",
      "Sensitivity varies considerably between people. Sweeteners can also appear in many foods marketed as sugar-free, reduced-sugar or low-calorie, so checking the ingredient list can help identify potential triggers."
    ],
    symptoms:[
      {icon:"bloating", title:"Bloating", text:"Abdominal swelling or uncomfortable fullness."},
      {icon:"wind", title:"Wind", text:"Increased gas or flatulence."},
      {icon:"abdominalPain", title:"Abdominal pain", text:"Stomach cramps or discomfort."},
      {icon:"diarrhoea", title:"Diarrhoea", text:"Loose or watery stools, particularly after larger amounts."},
      {icon:"gurgling", title:"Stomach rumbling", text:"Increased intestinal movement or noises."},
      {icon:"nausea", title:"Nausea", text:"Feeling sick or unsettled in some people."}
    ],
    goodToKnow:"Sorbitol, mannitol, xylitol and other polyols can have a laxative effect when consumed in larger quantities. Check labels on sugar-free sweets, chewing gum, drinks and some 'light' products."
  }
});

function monthDates(){
  const now=new Date(); const y=now.getFullYear(), m=now.getMonth();
  const first=new Date(y,m,1), last=new Date(y,m+1,0);
  const out=[];
  const mondayFirstOffset=(first.getDay()+6)%7; // Sun=0..Sat=6 -> Mon=0..Sun=6
  for(let i=0;i<mondayFirstOffset;i++) out.push(null);
  for(let d=1;d<=last.getDate();d++) out.push(new Date(y,m,d));
  return out;
}
function dayTone(day){
  const ex=day?.exit||{};
  if(ex.feeling==="Poor" || (ex.symptoms||[]).length>=3) return "rough";
  if(ex.feeling==="Meh" || (ex.symptoms||[]).length) return "warn";
  if(ex.feeling==="Great" || ex.feeling==="Fine") return "good";
  return "";
}
function renderMonth(){
  const calendar=document.getElementById("monthCalendar");
  if(calendar){
    try{
      const dates=monthDates();
      calendar.innerHTML=dates.map(d=>{
        if(!d) return `<div></div>`;
        const key=dateKey(d);
        const day=state.days?.[key];
        return `<button type="button" class="cal-day ${dayTone(day)}" data-key="${key}"><strong>${d.getDate()}</strong><span>${day? "•":""}</span></button>`;
      }).join("");
      calendar.querySelectorAll(".cal-day[data-key]").forEach(btn=>{
        btn.addEventListener("click", ()=>openDayDetail(btn.dataset.key));
      });
    }catch(err){
      console.error("Month calendar render failed",err);
      calendar.innerHTML=`<div class="muted" style="grid-column:1/-1;padding:12px">Calendar could not be rendered.</div>`;
    }
  }
  renderMonthResults();
}

function closeDayDetailDialog(){
  const dialog=document.getElementById("dayDetailDialog");
  if(!dialog) return;
  try{ if(dialog.open) dialog.close(); }catch(err){ console.warn("Dialog close failed",err); }
  if(dialog.hasAttribute("open")) dialog.removeAttribute("open");
}

function openDayDetail(key){
  const day=state.days?.[key];
  const dateObj=new Date(key+"T12:00:00");
  document.getElementById("dayDetailTitle").textContent=
    dateObj.toLocaleDateString("en-GB",{weekday:"long",day:"numeric",month:"long"});

  const body=document.getElementById("dayDetailBody");
  const sections=[];

  if(day){
    const ex=day.exit||{};
    if(Object.keys(ex).length){
      sections.push(`
        <div class="day-detail-section">
          <div class="eyebrow">EXIT INTERVIEW</div>
          <p>${[ex.feeling, ex.consistency, ex.urgency, ex.frequency?ex.frequency+" visit"+(ex.frequency==="1"?"":"s"):null].filter(Boolean).join(" · ") || "Logged, no details set"}</p>
          ${(ex.symptoms||[]).length ? `<div class="ingredient-tags">${ex.symptoms.map(s=>`<span class="allergen-tag">${escapeHtml(s)}</span>`).join("")}</div>` : ""}
          ${ex.notes ? `<p class="muted">${escapeHtml(ex.notes)}</p>` : ""}
        </div>`);
    }

    mealTypes.forEach(m=>{
      const items=day.meals?.[m.key]||[];
      if(!items.length) return;
      sections.push(`
        <div class="day-detail-section">
          <div class="eyebrow">${m.label.toUpperCase()}</div>
          ${items.map((it,i)=>`
            <button type="button" class="day-detail-entry" data-meal="${m.key}" data-index="${i}">
              <strong>${escapeHtml(it.name)}</strong>
              <small>${[it.time, it.portionSize?it.portionSize+" portion":null, it.quantity||null, it.cookingMethod||null].filter(Boolean).join(" · ")}</small>
            </button>`).join("")}
        </div>`);
    });

    const sups=day.supplements||[];
    if(sups.length){
      sections.push(`
        <div class="day-detail-section">
          <div class="eyebrow">SUPPLEMENTS & MEDS</div>
          ${sups.map((s,i)=>`
            <button type="button" class="day-detail-entry" data-supp-index="${i}">
              <strong>${escapeHtml(s.name)}</strong>
              <small>${[s.kind==="prescription"?"Prescription/OTC":"Supplement", s.dose||null, s.time||null].filter(Boolean).join(" · ")}</small>
            </button>`).join("")}
        </div>`);
    }
  }

  body.innerHTML = sections.length ? sections.join("") : `<p class="muted">Nothing logged this day.</p>`;

  body.querySelectorAll(".day-detail-entry[data-meal]").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      closeDayDetailDialog();
      openMeal(btn.dataset.meal, Number(btn.dataset.index), key);
    });
  });
  body.querySelectorAll(".day-detail-entry[data-supp-index]").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      closeDayDetailDialog();
      openSupplement(Number(btn.dataset.suppIndex), key);
    });
  });

  document.getElementById("dayDetailDialog").showModal();
}
document.getElementById("closeDayDetailBtn").addEventListener("click", closeDayDetailDialog);
document.getElementById("dayDetailDialog").addEventListener("cancel", e=>{
  e.preventDefault();
  closeDayDetailDialog();
});

function getMealSearchText(x,day){
  const rawIngredients=(x?.ingredients||[]).join(" ");
  // Recalculate these from saved text so meals logged before the structured
  // allergen fields existed are still searchable.
  const detectedAllergens=detectUKAllergens(rawIngredients);
  const detectedFamilies=detectFamilies(rawIngredients);

  return [
    x?.name||"",
    ...(x?.ingredients||[]),
    ...(x?.allergens||[]),
    ...(x?.families||[]),
    ...detectedAllergens,
    ...detectedFamilies,
    x?.notes||"",
    ...(day?.exit?.symptoms||[])
  ].join(" ").toLowerCase();
}

function renderMonthResults(){
  const filter=document.getElementById("monthFilter");
  const resultsBox=document.getElementById("monthResults");
  const card=document.getElementById("monthResultsCard");
  if(!filter || !resultsBox) return;

  const q=filter.value.trim().toLowerCase();
  if(!q){
    if(card) card.classList.add("hidden");
    resultsBox.innerHTML="";
    return;
  }
  if(card) card.classList.remove("hidden");

  const aliases={
    "dairy":["milk","milk dairy"],
    "gluten":["cereals containing gluten","wheat"],
    "nuts":["tree nuts","cashew","almond","hazelnut","walnut","pecan","pistachio","macadamia","brazil nut"],
    "nut":["tree nuts","cashew","almond","hazelnut","walnut","pecan","pistachio","macadamia","brazil nut"],
    "soy":["soya"]
  };
  const terms=[q,...(aliases[q]||[])].filter(Boolean);

  const now=new Date();
  const prefix=`${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,"0")}`;
  const results=[];

  try{
    Object.entries(state.days||{})
      .filter(([k])=>k.startsWith(prefix))
      .forEach(([k,day])=>{
        mealTypes.forEach(m=>{
          const entries=day?.meals?.[m.key]||[];
          entries.forEach((x,index)=>{
            const hay=getMealSearchText(x,day);
            const matches=terms.some(term=>hay.includes(term));
            if(matches) results.push({k,m:m.key,x,index});
          });
        });
      });

    results.sort((a,b)=>b.k.localeCompare(a.k));

    resultsBox.innerHTML=results.length
      ? results.map(o=>`
        <button type="button" class="timeline-item month-result-link"
          data-date="${o.k}" data-meal="${o.m}" data-index="${o.index}">
          <strong>${escapeHtml(o.x?.name||"Untitled entry")}</strong>
          <small>${new Date(o.k+"T12:00:00").toLocaleDateString("en-GB",{day:"numeric",month:"short"})} · ${mealTypes.find(m=>m.key===o.m)?.label||""}</small>
          <span class="result-chevron">›</span>
        </button>`).join("")
      : `<p class="muted">No matching entries.</p>`;

    resultsBox.querySelectorAll(".month-result-link").forEach(btn=>{
      btn.addEventListener("click",()=>{
        openMeal(btn.dataset.meal, Number(btn.dataset.index), btn.dataset.date);
      });
    });
  }catch(err){
    console.error("Month search failed",err);
    resultsBox.innerHTML=`<p class="muted">Month search could not be loaded.</p>`;
  }
}
document.getElementById("monthFilter").addEventListener("input",renderMonthResults);


// --- Association engine shared by the Report and Trends tabs ---
// Two changes from the original same-day-only, any-repeat-counts version:
//  1. A day "reacts" if symptoms were logged either that day OR the next
//     day, since GI symptoms often show up with a lag rather than same-day.
//  2. Ingredients/groups that show up on almost every logged day (e.g.
//     "milk" if you have it daily) are excluded — they can't discriminate
//     anything, and only things whose rate is noticeably above your own
//     personal baseline symptom rate are surfaced, rather than everything
//     that's ever co-occurred twice.
function dayIsSymptomatic(day){
  return !!(day && ((day.exit?.symptoms||[]).length>0 || ["Poor","Meh"].includes(day.exit?.feeling)));
}
// --- Reaction window: how many days after exposure a symptom still
// counts as connected. Configurable rather than fixed, since delayed
// food reactions vary a lot person to person and there's no single
// "correct" default we could validate against any one person's body. ---
const REACTION_WINDOW_KEY="intolearn_reaction_window_v1";
function loadReactionWindow(){
  try{ const v=JSON.parse(localStorage.getItem(REACTION_WINDOW_KEY)); return [0,1,3].includes(v) ? v : 1; }
  catch{ return 1; }
}
let reactionWindowDays=loadReactionWindow();
function saveReactionWindow(){
  try{ localStorage.setItem(REACTION_WINDOW_KEY, JSON.stringify(reactionWindowDays)); }
  catch(err){ console.warn("Could not save reaction window",err); }
}
function reactionWindowLabel(days){
  return days===0 ? "the same day" : days===1 ? "the same day or the day after" : `the same day or within ${days} days after`;
}
function dayReactionWindow(k, windowDays=reactionWindowDays){
  for(let i=0;i<=windowDays;i++){
    const d=new Date(k+"T12:00:00"); d.setDate(d.getDate()+i);
    if(dayIsSymptomatic(state.days[dateKey(d)])) return true;
  }
  return false;
}
function buildAssociationStats(dateKeys, getTags, {minDays=3, minLiftPts=15, maxPresenceRatio=0.85}={}){
  const statsRaw={};
  let consideredDays=0, consideredReacted=0;
  dateKeys.forEach(k=>{
    const day=state.days[k];
    if(!day) return;
    consideredDays++;
    const reacted=dayReactionWindow(k);
    if(reacted) consideredReacted++;
    new Set(getTags(day)).forEach(tag=>{
      statsRaw[tag] ||= {days:0,symptomDays:0};
      statsRaw[tag].days++;
      if(reacted) statsRaw[tag].symptomDays++;
    });
  });
  const baseline = consideredDays ? consideredReacted/consideredDays : 0;
  const ranked = Object.entries(statsRaw)
    .map(([name,v])=>({name,...v,rate:v.days?v.symptomDays/v.days:0}))
    .filter(x=>x.days>=minDays)
    .filter(x=>!consideredDays || (x.days/consideredDays)<maxPresenceRatio)
    .filter(x=>(x.rate-baseline)*100>=minLiftPts)
    .sort((a,b)=>(b.rate-baseline)-(a.rate-baseline) || b.days-a.days);
  return {statsRaw, ranked, baseline, consideredDays, consideredReacted};
}

let reportDays=30;
function reportDateKeys(days){
  const end=new Date(); end.setHours(12,0,0,0);
  const start=new Date(end); start.setDate(end.getDate()-days+1);
  return Object.keys(state.days||{}).filter(k=>{
    const d=new Date(k+"T12:00:00"); return d>=start && d<=end;
  }).sort();
}
function reportMealIngredients(x){
  const raw=(x?.ingredients||[]).join(" ");
  return [...new Set([
    ...(x?.allergens||[]),...(x?.families||[]),
    ...detectUKAllergens(raw),...detectFamilies(raw)
  ].filter(Boolean).map(v=>String(v).trim()))];
}
function buildKnownSuspects(keys){
  const keySet=new Set(keys);
  const stats={};
  keys.forEach(k=>{
    const day=state.days[k];
    if(!day) return;
    const reacted=dayReactionWindow(k);
    (day.supplements||[]).forEach(s=>{
      if(!s.flag) return;
      const key=s.name.trim().toLowerCase();
      stats[key] ||= {name:s.name, flag:s.flag, days:0, symptomDays:0};
      stats[key].days++;
      if(reacted) stats[key].symptomDays++;
    });
  });
  return Object.values(stats)
    .map(x=>({...x, rate:x.days?x.symptomDays/x.days:0}))
    .sort((a,b)=> b.rate-a.rate || b.days-a.days);
}

function renderReport(){
  const keys=reportDateKeys(reportDays);
  let meals=0, scans=0, exits=0, symptomDays=0, comfortable=0;

  keys.forEach(k=>{
    const day=state.days[k]||{};
    const symptomatic=dayIsSymptomatic(day);
    if(symptomatic) symptomDays++;
    if(["Good","Great"].includes(day.exit?.feeling) && !symptomatic) comfortable++;
    if(day.exit && Object.keys(day.exit).length) exits++;
    mealTypes.forEach(m=>(day.meals?.[m.key]||[]).forEach(x=>{
      meals++; if(x.photo) scans++;
    }));
  });

  const {statsRaw, ranked, baseline, consideredDays}=buildAssociationStats(keys, day=>{
    const tags=new Set();
    mealTypes.forEach(m=>(day.meals?.[m.key]||[]).forEach(x=>{
      reportMealIngredients(x).forEach(t=>tags.add(t));
      if(x.portionSize==="Large") tags.add("large portion");
      if(x.cookingMethod) tags.add("cooking: "+x.cookingMethod.toLowerCase());
    }));
    (day.supplements||[]).forEach(s=>{ if(s.name) tags.add(s.name.trim().toLowerCase()); });
    return tags;
  });

  const start=new Date(); start.setDate(start.getDate()-reportDays+1);
  document.getElementById("reportPeriod").textContent=
    `${start.toLocaleDateString("en-GB",{day:"numeric",month:"short"})} – ${new Date().toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"})}`;

  document.getElementById("reportSummary").innerHTML=[
    [ICONS.calendarDot,keys.length,"Days recorded"],[ICONS.plate,meals,"Meals recorded"],
    [ICONS.camera,scans,"Ingredient scans"],[ICONS.clipboard,exits,"Exit Interviews"]
  ].map(s=>`<div class="report-stat"><span>${s[0]}</span><strong>${s[1]}</strong><small>${s[2]}</small></div>`).join("");

  const suspects=buildKnownSuspects(keys);
  const suspectsPanel=document.getElementById("knownSuspectsPanel");
  if(suspects.length){
    suspectsPanel.classList.remove("hidden");
    document.getElementById("knownSuspects").innerHTML=suspects.map(x=>`
      <div class="connection-card">
        <div class="connection-title"><strong>${escapeHtml(x.name)}</strong><span class="connection-score">${x.symptomDays}/${x.days} days</span></div>
        <p>Flagged for: ${escapeHtml(titleCase(x.flag.terms.join(", ")))}. Source: ${escapeHtml(x.flag.source)}. In this period, ${x.symptomDays} of ${x.days} day${x.days===1?"":"s"} you took it were followed by symptoms within ${reactionWindowLabel(reactionWindowDays)}.</p>
      </div>`).join("");
  }else{
    suspectsPanel.classList.add("hidden");
    document.getElementById("knownSuspects").innerHTML="";
  }

  renderTrialResults();

  const connections=ranked.slice(0,5);
  document.getElementById("reportConnections").innerHTML=connections.length?connections.map(x=>`
    <div class="connection-card">
      <div class="connection-title"><strong>${escapeHtml(titleCase(x.name))}</strong><span class="connection-score">${Math.round(x.rate*100)}%</span></div>
      <div class="connection-bar"><span style="width:${Math.round(x.rate*100)}%"></span></div>
      <p>${x.symptomDays} of ${x.days} exposure day${x.days===1?"":"s"} were followed by symptoms within ${reactionWindowLabel(reactionWindowDays)} — vs ${Math.round(baseline*100)}% of all recorded days.</p>
    </div>`).join(""):`<p class="muted">${consideredDays<3?"Not enough recorded days yet.":"No ingredient stands out clearly from your usual baseline yet."} Keep logging and this section will build automatically.</p>`;

  const exposures=Object.entries(statsRaw).map(([name,v])=>({name,...v})).sort((a,b)=>b.days-a.days).slice(0,8);
  document.getElementById("reportExposures").innerHTML=exposures.length?exposures.map(x=>`
    <div class="exposure-row"><strong>${escapeHtml(titleCase(x.name))}</strong><span>${x.days} day${x.days===1?"":"s"}</span></div>`).join(""):`<p class="muted">No ingredient groups recorded in this period yet.</p>`;

  document.getElementById("reportExit").innerHTML=`
    <div class="exit-grid">
      <div class="exit-mini"><strong>${exits}</strong><small>Exit Interviews</small></div>
      <div class="exit-mini"><strong>${symptomDays}</strong><small>Symptom days</small></div>
      <div class="exit-mini"><strong>${comfortable}</strong><small>Comfortable days</small></div>
      <div class="exit-mini"><strong>${keys.length?Math.round(symptomDays/keys.length*100):0}%</strong><small>Recorded days with symptoms</small></div>
    </div>`;

  const days=[];
  for(let i=reportDays-1;i>=0;i--){
    const d=new Date(); d.setDate(d.getDate()-i);
    const k=dateKey(d), day=state.days?.[k];
    const symptomatic=day && ((day.exit?.symptoms||[]).length>0 || ["Poor","Meh"].includes(day.exit?.feeling));
    days.push(`<div class="report-day ${symptomatic?"symptom":day?"logged":""}" title="${k}">${d.getDate()}</div>`);
  }
  document.getElementById("reportTimeline").innerHTML=days.join("");
}
document.querySelectorAll(".range-btn").forEach(btn=>btn.addEventListener("click",()=>{
  document.querySelectorAll(".range-btn").forEach(b=>b.classList.remove("active"));
  btn.classList.add("active"); reportDays=Number(btn.dataset.days); renderReport();
}));

function applyReactionWindowUI(){
  document.querySelectorAll('[data-choice="reactionWindow"] button').forEach(b=>{
    b.classList.toggle("selected", Number(b.dataset.value)===reactionWindowDays);
  });
  const howItWorks=document.getElementById("trendsHowItWorks");
  if(howItWorks){
    howItWorks.textContent=`Ingredients are compared with symptom days in your local diary, counting a symptom logged within ${reactionWindowLabel(reactionWindowDays)}. Ingredients logged on almost every day, or without enough repeats, are left out — only ones noticeably above your own baseline symptom rate are shown. The more consistently you log, the more useful this becomes.`;
  }
}
document.querySelectorAll('[data-choice="reactionWindow"] button').forEach(btn=>{
  btn.addEventListener("click", ()=>{
    reactionWindowDays=Number(btn.dataset.value);
    saveReactionWindow();
    applyReactionWindowUI();
    renderAll();
  });
});

function renderTrends(){
  const allKeys=Object.keys(state.days||{});
  const {ranked, baseline, consideredDays}=buildAssociationStats(allKeys, day=>{
    const ingredients=new Set();
    mealTypes.forEach(m=>(day.meals?.[m.key]||[]).forEach(x=>{
      (x.ingredients||[]).forEach(i=>ingredients.add(i.toLowerCase()));
      if(x.portionSize==="Large") ingredients.add("large portion");
      if(x.cookingMethod) ingredients.add("cooking: "+x.cookingMethod.toLowerCase());
    }));
    (day.supplements||[]).forEach(s=>{ if(s.name) ingredients.add(s.name.trim().toLowerCase()); });
    return ingredients;
  });
  const trends=ranked.slice(0,6);
  const trendsEyebrow=document.getElementById("trendsEyebrow");
  if(trendsEyebrow) trendsEyebrow.textContent=`TRENDS / ${trends.length} FOUND`;
  document.getElementById("trendCards").innerHTML=trends.length?trends.map(t=>`
    <div class="trend-card">
      <h3>${escapeHtml(titleCase(t.name))}</h3>
      <p class="muted">${t.symptomDays} of ${t.days} logged day${t.days===1?"":"s"} with this ingredient were followed by symptoms within ${reactionWindowLabel(reactionWindowDays)} — vs ${Math.round(baseline*100)}% of all your recorded days.</p>
      <div class="trend-bar"><span style="width:${Math.round(t.rate*100)}%"></span></div>
      <div class="trend-meta"><span>Rate above your baseline</span><strong>+${Math.round((t.rate-baseline)*100)}pt</strong></div>
    </div>
  `).join(""):`<div class="card"><h3>Not enough data yet</h3><p class="muted">${consideredDays<3?"Log a few more days and Intolearn will start surfacing associations here.":"Nothing stands out clearly from your usual baseline yet — that's a good sign, or you just need more repeated exposures logged."}</p></div>`;
}

// --- Profile & onboarding ---
let onboardPhotoData = "";

function renderAvatar(){
  const btn=document.getElementById("settingsBtn");
  if(!btn) return;
  if(state.profile?.photo){
    btn.innerHTML=`<img src="${state.profile.photo}" alt="Your photo">`;
  }else if(state.profile?.name){
    btn.innerHTML=escapeHtml(state.profile.name.trim().charAt(0).toUpperCase());
  }else{
    btn.innerHTML=ICONS.gear;
  }
}

function renderGreeting(){
  const el=document.getElementById("greetingLine");
  if(!el) return;
  const name=state.profile?.name?.trim();
  if(!name){ el.textContent="Field notes for what you eat"; return; }
  const hour=new Date().getHours();
  const part = hour<12 ? "Good morning" : hour<18 ? "Good afternoon" : "Good evening";
  el.textContent=`${part}, ${name}`;
}

function renderSettingsProfile(){
  const box=document.getElementById("settingsProfileSummary");
  if(!box) return;
  const name=state.profile?.name?.trim() || "Add your name";
  const avatar=state.profile?.photo
    ? `<img src="${state.profile.photo}" alt="Your photo">`
    : escapeHtml((state.profile?.name||"?").trim().charAt(0).toUpperCase()||"?");
  const allergyCount=(state.profile?.allergies||[]).length;
  box.innerHTML=`
    <div class="profile-avatar">${avatar}</div>
    <div>
      <strong>${escapeHtml(name)}</strong>
      <small>${allergyCount ? allergyCount+" default ingredient"+(allergyCount===1?"":"s")+" set" : "No default ingredients set"}</small>
    </div>`;
}

function getSelectedOnboardingTriggers(){
  return [...document.querySelectorAll("#onboardingTriggers button.selected")].map(b=>b.dataset.trigger);
}

function openOnboarding(isEdit=false){
  const nameEl=document.getElementById("onboardName");
  nameEl.value=isEdit ? (state.profile?.name||"") : "";
  nameEl.classList.remove("field-error");

  onboardPhotoData=isEdit ? (state.profile?.photo||"") : "";
  document.getElementById("onboardPhotoPreview").innerHTML=onboardPhotoData
    ? `<img src="${onboardPhotoData}" alt="Profile photo preview" style="width:64px;height:64px;object-fit:cover;border:1px solid var(--line);margin-top:10px;display:block">`
    : "";

  const defaults=new Set(isEdit ? (state.profile?.allergies||[]) : []);
  document.querySelectorAll("#onboardingTriggers button").forEach(btn=>{
    btn.classList.toggle("selected", defaults.has(btn.dataset.trigger));
  });

  document.getElementById("onboardingEyebrow").textContent=isEdit ? "PROFILE" : "WELCOME";
  document.getElementById("onboardingTitle").textContent=isEdit ? "Edit your profile" : "Let's set up Intolearn";
  document.getElementById("onboardingSaveBtn").textContent=isEdit ? "Save profile" : "Get started";
  document.getElementById("closeOnboardingBtn").classList.toggle("hidden", !isEdit);

  document.getElementById("onboardingDialog").showModal();
}
function closeOnboardingDialog(){
  const dialog=document.getElementById("onboardingDialog");
  if(!dialog) return;
  try{ if(dialog.open) dialog.close(); }catch(err){ console.warn("Dialog close failed",err); }
  if(dialog.hasAttribute("open")) dialog.removeAttribute("open");
}

async function handleOnboardPhoto(file){
  if(!file) return;
  const reader=new FileReader();
  reader.onload=async ()=>{
    const resized=await resizeDataURLForStorage(reader.result);
    onboardPhotoData=resized;
    document.getElementById("onboardPhotoPreview").innerHTML=
      `<img src="${resized}" alt="Profile photo preview" style="width:64px;height:64px;object-fit:cover;border:1px solid var(--line);margin-top:10px;display:block">`;
  };
  reader.readAsDataURL(file);
}
document.getElementById("onboardCameraInput").addEventListener("change", e=>handleOnboardPhoto(e.target.files?.[0]));
document.getElementById("onboardLibraryInput").addEventListener("change", e=>handleOnboardPhoto(e.target.files?.[0]));

document.querySelectorAll("#onboardingTriggers button").forEach(btn=>{
  btn.addEventListener("click", ()=>btn.classList.toggle("selected"));
});

document.getElementById("onboardingSaveBtn").addEventListener("click", ()=>{
  const nameEl=document.getElementById("onboardName");
  const name=nameEl.value.trim();
  if(!name){
    nameEl.classList.add("field-error");
    nameEl.focus();
    showToast("Please enter your name.");
    return;
  }
  nameEl.classList.remove("field-error");

  state.profile={
    name,
    photo: onboardPhotoData || "",
    allergies: getSelectedOnboardingTriggers(),
    onboarded: true
  };
  saveState();
  renderAvatar();
  renderGreeting();
  closeOnboardingDialog();
  showToast("Profile saved");
});
document.getElementById("closeOnboardingBtn").addEventListener("click", closeOnboardingDialog);
document.getElementById("onboardingDialog").addEventListener("cancel", e=>{
  if(!state.profile?.onboarded){ e.preventDefault(); return; }
  closeOnboardingDialog();
});

document.querySelectorAll(".nav-item").forEach(btn=>{
  btn.onclick=()=>{
    document.querySelectorAll(".nav-item").forEach(b=>b.classList.remove("active"));
    btn.classList.add("active");
    document.querySelectorAll(".view").forEach(v=>v.classList.remove("active"));
    document.getElementById(btn.dataset.view).classList.add("active");
    renderAll();
  };
});

document.getElementById("settingsBtn").onclick=()=>{
  renderSettingsProfile();
  renderLastBackupText();
  document.getElementById("settingsDialog").showModal();
};
document.getElementById("editProfileBtn").onclick=()=>{
  document.getElementById("settingsDialog").close();
  openOnboarding(true);
};

// --- Backup: real restore, native share-to-Files/iCloud where supported,
// and a quiet reminder when it's been a while. An export nobody can ever
// restore from isn't really a backup, so this covers both directions. ---
const BACKUP_KEY="intolearn_last_backup_v1";
function getLastBackupAt(){
  try{ return localStorage.getItem(BACKUP_KEY); }catch{ return null; }
}
function setLastBackupAt(){
  try{ localStorage.setItem(BACKUP_KEY, new Date().toISOString()); }catch(err){ console.warn("Could not record backup time",err); }
}
function daysSinceBackup(){
  const last=getLastBackupAt();
  if(!last) return Infinity;
  return Math.floor((Date.now()-new Date(last).getTime())/86400000);
}
function renderLastBackupText(){
  const el=document.getElementById("lastBackupText");
  if(!el) return;
  const days=daysSinceBackup();
  el.textContent = days===Infinity ? "Never backed up."
    : days===0 ? "Last backed up today."
    : days===1 ? "Last backed up yesterday."
    : `Last backed up ${days} days ago.`;
}
function renderBackupReminder(){
  const box=document.getElementById("backupReminderBanner");
  const text=document.getElementById("backupReminderText");
  if(!box || !text) return;
  const loggedDays=Object.keys(state.days||{}).length;
  const days=daysSinceBackup();
  if(loggedDays<5 || days<21){
    box.classList.add("hidden");
    return;
  }
  box.classList.remove("hidden");
  text.textContent = getLastBackupAt()
    ? `It's been ${days} days since your last backup, and everything here lives only in this browser — nothing is synced anywhere else.`
    : `You've logged ${loggedDays} days and never backed up. Everything here lives only in this browser — clearing your cache or switching devices would lose it all.`;
}

async function backupDiary(){
  const json=JSON.stringify(state,null,2);
  const filename=`intolearn-backup-${dateKey()}.json`;
  const blob=new Blob([json],{type:"application/json"});

  let file=null;
  try{ file=new File([blob],filename,{type:"application/json"}); }catch(err){ file=null; }

  if(file && navigator.canShare && navigator.canShare({files:[file]})){
    try{
      await navigator.share({files:[file], title:"Intolearn backup"});
      setLastBackupAt();
      renderLastBackupText();
      renderBackupReminder();
      showToast("Backup shared");
      return;
    }catch(err){
      if(err?.name==="AbortError") return; // user cancelled the share sheet — don't fall through
      console.warn("Share failed, falling back to direct download",err);
    }
  }

  const a=document.createElement("a");
  a.href=URL.createObjectURL(blob);
  a.download=filename;
  a.click();
  setTimeout(()=>URL.revokeObjectURL(a.href),1000);
  setLastBackupAt();
  renderLastBackupText();
  renderBackupReminder();
  showToast("Backup downloaded");
}
document.getElementById("exportDataBtn").onclick=backupDiary;
document.getElementById("backupReminderBtn").onclick=backupDiary;

document.getElementById("restoreDataBtn").addEventListener("click", ()=>{
  document.getElementById("restoreFileInput").click();
});
document.getElementById("restoreFileInput").addEventListener("change", e=>{
  const file=e.target.files?.[0];
  e.target.value="";
  if(!file) return;
  const reader=new FileReader();
  reader.onload=()=>{
    let parsed;
    try{ parsed=JSON.parse(reader.result); }
    catch(err){ showToast("That file doesn't look like a valid backup."); return; }
    if(!parsed || typeof parsed!=="object" || typeof parsed.days!=="object" || parsed.days===null){
      showToast("That file doesn't look like an Intolearn backup.");
      return;
    }
    const incomingDays=Object.keys(parsed.days).length;
    const currentDays=Object.keys(state.days||{}).length;
    if(!confirm(`This backup contains ${incomingDays} logged day${incomingDays===1?"":"s"}. Restoring will REPLACE everything currently in this browser (${currentDays} day${currentDays===1?"":"s"}) and can't be undone. Continue?`)) return;

    parsed.profile ||= {name:"",photo:"",allergies:[],onboarded:false};
    parsed.courses ||= [];
    parsed.trials ||= [];
    state=parsed;
    if(saveState()){
      ensureDay();
      renderAll();
      renderAvatar();
      renderGreeting();
      renderLastBackupText();
      showToast("Backup restored");
      document.getElementById("settingsDialog").close();
    }else{
      showToast("Could not restore — storage write failed.");
    }
  };
  reader.readAsText(file);
});

document.getElementById("clearDataBtn").onclick=()=>{
  if(confirm("Clear all Intolearn data stored in this browser?")){
    localStorage.removeItem(STORAGE_KEY); state=blankState(); ensureDay(); renderAll();
    renderAvatar(); renderGreeting();
    showToast("Local data cleared");
    openOnboarding(false);
  }
};

// --- Printable food diary for a doctor/dietitian appointment ---
function generatePrintDiary(days){
  const today=dateKey();
  const keys=[];
  for(let i=days-1;i>=0;i--) keys.push(dateKeyPlusDays(today,-i));

  const profileName=state.profile?.name?.trim() || "";
  const fmtDateLong=k=>new Date(k+"T12:00:00").toLocaleDateString("en-GB",{day:"numeric",month:"long",year:"numeric"});
  const rangeLabel = keys.length ? `${fmtDateLong(keys[0])} – ${fmtDateLong(keys[keys.length-1])}` : "";

  let html=`
    <div class="pd-header">
      <h1>Food &amp; Symptom Diary</h1>
      ${profileName ? `<p><strong>${escapeHtml(profileName)}</strong></p>` : ""}
      <p>${escapeHtml(rangeLabel)}</p>
      <p>Generated by Intolearn on ${fmtDateLong(today)}</p>
    </div>`;

  keys.forEach(k=>{
    const day=state.days[k];
    const dateLabel=new Date(k+"T12:00:00").toLocaleDateString("en-GB",{weekday:"long",day:"numeric",month:"long"});
    html+=`<div class="pd-day"><h2>${escapeHtml(dateLabel)}</h2>`;

    const rows=[];
    if(day){
      mealTypes.forEach(m=>{
        (day.meals?.[m.key]||[]).forEach(it=>{
          rows.push({
            time: it.time||"",
            meal: m.label,
            name: it.name||"",
            quantity: it.quantity || (it.portionSize ? it.portionSize+" portion" : ""),
            cooking: it.cookingMethod||"",
            notes: it.notes||""
          });
        });
      });
    }
    rows.sort((a,b)=> (a.time||"99:99").localeCompare(b.time||"99:99"));

    if(rows.length){
      html+=`
        <table class="pd-table">
          <thead><tr><th>Time</th><th>Meal</th><th>Food &amp; drink</th><th>Quantity</th><th>How prepared</th><th>Notes</th></tr></thead>
          <tbody>
            ${rows.map(r=>`<tr>
              <td>${escapeHtml(r.time)}</td>
              <td>${escapeHtml(r.meal)}</td>
              <td>${escapeHtml(r.name)}</td>
              <td>${escapeHtml(r.quantity)}</td>
              <td>${escapeHtml(r.cooking)}</td>
              <td>${escapeHtml(r.notes)}</td>
            </tr>`).join("")}
          </tbody>
        </table>`;
    }else{
      html+=`<p class="pd-meta">Nothing logged this day.</p>`;
    }

    const sups=day?.supplements||[];
    if(sups.length){
      html+=`<p class="pd-meta"><strong>Supplements/meds:</strong> ${sups.map(s=>escapeHtml(s.name)+(s.dose?` (${escapeHtml(s.dose)})`:"")).join(", ")}</p>`;
    }

    const ex=day?.exit||{};
    if(Object.keys(ex).length){
      const parts=[ex.feeling, ex.consistency, ex.urgency, ex.frequency?ex.frequency+" bathroom visits":null].filter(Boolean).join(" · ");
      html+=`<p class="pd-meta"><strong>Symptoms/how the day felt:</strong> ${escapeHtml(parts)}${(ex.symptoms||[]).length? " — "+escapeHtml(ex.symptoms.join(", ")):""}${ex.notes?" — "+escapeHtml(ex.notes):""}</p>`;
    }

    html+=`</div>`;
  });

  document.getElementById("printDiaryContainer").innerHTML=html;
}

document.getElementById("openPrintDiaryBtn").addEventListener("click", ()=>{
  document.getElementById("settingsDialog").close();
  document.querySelectorAll('[data-choice="printDiaryDays"] button').forEach(b=>b.classList.toggle("selected", b.dataset.value==="7"));
  document.getElementById("printDiaryDialog").showModal();
});
function closePrintDiaryDialog(){
  const d=document.getElementById("printDiaryDialog");
  if(!d) return;
  try{ if(d.open) d.close(); }catch(err){ console.warn("Dialog close failed",err); }
  if(d.hasAttribute("open")) d.removeAttribute("open");
}
document.getElementById("cancelPrintDiaryDialog").addEventListener("click", closePrintDiaryDialog);
document.getElementById("closePrintDiaryDialog").addEventListener("click", closePrintDiaryDialog);
document.getElementById("printDiaryDialog").addEventListener("cancel", e=>{
  e.preventDefault();
  closePrintDiaryDialog();
});
document.querySelectorAll('[data-choice="printDiaryDays"] button').forEach(btn=>{
  btn.addEventListener("click", ()=>{
    document.querySelectorAll('[data-choice="printDiaryDays"] button').forEach(b=>b.classList.remove("selected"));
    btn.classList.add("selected");
  });
});
document.getElementById("generatePrintDiaryBtn").addEventListener("click", ()=>{
  const days=Number(document.querySelector('[data-choice="printDiaryDays"] button.selected')?.dataset.value || 7);
  generatePrintDiary(days);
  closePrintDiaryDialog();
  setTimeout(()=>window.print(), 150);
});

function renderTodayEyebrow(){
  const el=document.getElementById("todayEyebrow");
  if(!el) return;
  const n=Object.keys(state.days||{}).length || 1;
  el.textContent=`TODAY / DAY ${String(n).padStart(2,"0")}`;
}

function renderAll(){
  const jobs=[renderMeals,renderExit,renderMonth,renderTrends,renderReport,renderTodayEyebrow,renderSupplements,renderCourses,applyCollapseState,renderActiveFlagBanner,renderTrialStatus,renderBackupReminder];
  jobs.forEach(fn=>{
    try{ fn(); }
    catch(err){ console.error(fn.name+" failed",err); }
  });
}
ensureDay(); renderAll();
renderAvatar();
renderGreeting();
renderAllergenGridIcons();
applyReactionWindowUI();
if(!state.profile?.onboarded){ openOnboarding(false); }
