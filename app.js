
const STORAGE_KEY = "intolearn_personal_v1";
const PRODUCT_CACHE_KEY = "intolearn_product_cache_v1";
const PRODUCT_CACHE_SCHEMA = 2;
const APP_VERSION = "5.0";

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
  tally:`<svg viewBox="0 0 24 24" ${SVG_BASE}><path d="M5 6.5h11M5 12h14M5 17.5h8"/></svg>`
};
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

function blankState(){ return { days:{} }; }
function loadState(){
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || blankState(); }
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
function ensureDay(key=dateKey()){
  if(!state.days[key]) state.days[key]={ meals:{breakfast:[],lunch:[],dinner:[],snacks:[]}, exit:{} };
  state.days[key].meals ||= {};
  mealTypes.forEach(m => state.days[key].meals[m.key] ||= []);
  state.days[key].exit ||= {};
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
    const items=day.meals[m.key]||[];
    card.innerHTML=`
      <div class="meal-head">
        <div><span class="icon-tile">${m.icon}</span><div><h3>${m.label}</h3><p>${items.length ? items.length+" entr"+(items.length===1?"y":"ies") : "Nothing logged yet"}</p></div></div>
        <button class="add-btn" data-meal="${m.key}" type="button">+ Add</button>
      </div>
      <div class="entry-list">
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
                <small>${it.time || ""}${it.notes ? " · "+escapeHtml(it.notes):""}</small>
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

  // Close first on iPhone/Safari so the user gets immediate visual confirmation
  // that the action completed, even if a later render step is delayed.
  closeMealDialog();

  // Refresh after the modal is gone.
  try {
    renderAll();
  } finally {
    showToast(isNew ? "Entry saved" : "Changes saved");
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


document.getElementById("openCheckerBtn").addEventListener("click",()=>{
  resetCheckerResult();
  document.getElementById("checkerCamera").value="";
  document.getElementById("checkerLibrary").value="";
  document.getElementById("checkerDialog").showModal();
});
function closeCheckerDialog(){
  const d=document.getElementById("checkerDialog");
  try{ if(d.open) d.close(); }catch(e){}
  if(d.hasAttribute("open")) d.removeAttribute("open");
}
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
function lastNDays(n){
  const arr=[]; const d=new Date();
  for(let i=n-1;i>=0;i--){ const x=new Date(d); x.setDate(d.getDate()-i); arr.push(x); }
  return arr;
}
function renderWeek(){
  const days=lastNDays(7);
  document.getElementById("weekStrip").innerHTML=days.map(d=>{
    const k=dateKey(d), ex=state.days[k]?.exit||{};
    const face=ex.feeling ? moodIcon(ex.feeling) : ICONS.noData;
    return `<div class="day-pill"><div class="day">${d.toLocaleDateString("en-GB",{weekday:"short"})}</div><div class="num">${d.getDate()}</div><div class="face">${face}</div></div>`;
  }).join("");
  let meals=0,symptoms=0,logged=0;
  days.forEach(d=>{
    const day=state.days[dateKey(d)];
    if(!day) return;
    logged++;
    mealTypes.forEach(m=>meals+=(day.meals?.[m.key]||[]).length);
    symptoms+=(day.exit?.symptoms||[]).length;
  });
  document.getElementById("weeklyStats").innerHTML=`
    <div class="stat"><strong>${meals}</strong><span>food entries</span></div>
    <div class="stat"><strong>${symptoms}</strong><span>symptoms</span></div>
    <div class="stat"><strong>${logged}</strong><span>days logged</span></div>`;
  const items=[];
  days.slice().reverse().forEach(d=>{
    const day=state.days[dateKey(d)];
    if(!day) return;
    mealTypes.forEach(m=>(day.meals?.[m.key]||[]).forEach(x=>items.push({d,m,x})));
  });
  document.getElementById("weekEntries").innerHTML=items.length?items.map(o=>`
    <div class="timeline-item"><strong>${escapeHtml(o.x.name)}</strong><small>${o.d.toLocaleDateString("en-GB",{weekday:"short",day:"numeric",month:"short"})} · ${mealTypes.find(m=>m.key===o.m).label}${o.x.time?" · "+o.x.time:""}</small></div>
  `).join(""):`<p class="muted">No entries yet.</p>`;
}
function monthDates(){
  const now=new Date(); const y=now.getFullYear(), m=now.getMonth();
  const first=new Date(y,m,1), last=new Date(y,m+1,0);
  const out=[];
  for(let i=0;i<first.getDay();i++) out.push(null);
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
        const day=state.days?.[dateKey(d)];
        return `<div class="cal-day ${dayTone(day)}"><strong>${d.getDate()}</strong><span>${day? "•":""}</span></div>`;
      }).join("");
    }catch(err){
      console.error("Month calendar render failed",err);
      calendar.innerHTML=`<div class="muted" style="grid-column:1/-1;padding:12px">Calendar could not be rendered.</div>`;
    }
  }
  renderMonthResults();
}

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
  if(!filter || !resultsBox) return;

  const q=filter.value.trim().toLowerCase();
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
            const matches=!q || terms.some(term=>hay.includes(term));
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
function dayReactionWindow(k){
  const d=new Date(k+"T12:00:00"); d.setDate(d.getDate()+1);
  return dayIsSymptomatic(state.days[k]) || dayIsSymptomatic(state.days[dateKey(d)]);
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
    mealTypes.forEach(m=>(day.meals?.[m.key]||[]).forEach(x=>reportMealIngredients(x).forEach(t=>tags.add(t))));
    return tags;
  });

  const start=new Date(); start.setDate(start.getDate()-reportDays+1);
  document.getElementById("reportPeriod").textContent=
    `${start.toLocaleDateString("en-GB",{day:"numeric",month:"short"})} – ${new Date().toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"})}`;

  document.getElementById("reportSummary").innerHTML=[
    [ICONS.calendarDot,keys.length,"Days recorded"],[ICONS.plate,meals,"Meals recorded"],
    [ICONS.camera,scans,"Ingredient scans"],[ICONS.clipboard,exits,"Exit Interviews"]
  ].map(s=>`<div class="report-stat"><span>${s[0]}</span><strong>${s[1]}</strong><small>${s[2]}</small></div>`).join("");

  const connections=ranked.slice(0,5);
  document.getElementById("reportConnections").innerHTML=connections.length?connections.map(x=>`
    <div class="connection-card">
      <div class="connection-title"><strong>${escapeHtml(titleCase(x.name))}</strong><span class="connection-score">${Math.round(x.rate*100)}%</span></div>
      <div class="connection-bar"><span style="width:${Math.round(x.rate*100)}%"></span></div>
      <p>${x.symptomDays} of ${x.days} exposure day${x.days===1?"":"s"} were followed by symptoms that day or the next — vs ${Math.round(baseline*100)}% of all recorded days.</p>
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

function renderTrends(){
  const allKeys=Object.keys(state.days||{});
  const {ranked, baseline, consideredDays}=buildAssociationStats(allKeys, day=>{
    const ingredients=new Set();
    mealTypes.forEach(m=>(day.meals?.[m.key]||[]).forEach(x=>(x.ingredients||[]).forEach(i=>ingredients.add(i.toLowerCase()))));
    return ingredients;
  });
  const trends=ranked.slice(0,6);
  const trendsEyebrow=document.getElementById("trendsEyebrow");
  if(trendsEyebrow) trendsEyebrow.textContent=`TRENDS / ${trends.length} FOUND`;
  document.getElementById("trendCards").innerHTML=trends.length?trends.map(t=>`
    <div class="trend-card">
      <h3>${escapeHtml(titleCase(t.name))}</h3>
      <p class="muted">${t.symptomDays} of ${t.days} logged day${t.days===1?"":"s"} with this ingredient were followed by symptoms that day or the next — vs ${Math.round(baseline*100)}% of all your recorded days.</p>
      <div class="trend-bar"><span style="width:${Math.round(t.rate*100)}%"></span></div>
      <div class="trend-meta"><span>Rate above your baseline</span><strong>+${Math.round((t.rate-baseline)*100)}pt</strong></div>
    </div>
  `).join(""):`<div class="card"><h3>Not enough data yet</h3><p class="muted">${consideredDays<3?"Log a few more days and Intolearn will start surfacing associations here.":"Nothing stands out clearly from your usual baseline yet — that's a good sign, or you just need more repeated exposures logged."}</p></div>`;
}

document.querySelectorAll(".nav-item").forEach(btn=>{
  btn.onclick=()=>{
    document.querySelectorAll(".nav-item").forEach(b=>b.classList.remove("active"));
    btn.classList.add("active");
    document.querySelectorAll(".view").forEach(v=>v.classList.remove("active"));
    document.getElementById(btn.dataset.view).classList.add("active");
    renderAll();
  };
});

document.getElementById("settingsBtn").onclick=()=>document.getElementById("settingsDialog").showModal();
document.getElementById("exportDataBtn").onclick=()=>{
  const blob=new Blob([JSON.stringify(state,null,2)],{type:"application/json"});
  const a=document.createElement("a"); a.href=URL.createObjectURL(blob); a.download="intolearn-diary.json"; a.click();
  setTimeout(()=>URL.revokeObjectURL(a.href),1000);
};
document.getElementById("clearDataBtn").onclick=()=>{
  if(confirm("Clear all Intolearn data stored in this browser?")){
    localStorage.removeItem(STORAGE_KEY); state=blankState(); ensureDay(); renderAll(); showToast("Local data cleared");
  }
};

function renderTodayEyebrow(){
  const el=document.getElementById("todayEyebrow");
  if(!el) return;
  const n=Object.keys(state.days||{}).length || 1;
  el.textContent=`TODAY / DAY ${String(n).padStart(2,"0")}`;
}

function renderAll(){
  const jobs=[renderMeals,renderExit,renderWeek,renderMonth,renderTrends,renderReport,renderTodayEyebrow];
  jobs.forEach(fn=>{
    try{ fn(); }
    catch(err){ console.error(fn.name+" failed",err); }
  });
}
ensureDay(); renderAll();
