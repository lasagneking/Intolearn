
const STORAGE_KEY = "intolearn_personal_v1";
const PRODUCT_CACHE_KEY = "intolearn_product_cache_v1";
const APP_VERSION = "4.6";
const mealTypes = [
  {key:"breakfast", label:"Breakfast", icon:"☀️"},
  {key:"lunch", label:"Lunch", icon:"🌤️"},
  {key:"dinner", label:"Dinner", icon:"🌙"},
  {key:"snacks", label:"Snacks & Drinks", icon:"🍎"}
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
      icon.textContent="!";
      title.textContent="Selected ingredient detected";
      text.textContent="Intolearn found one or more of the ingredients you selected in the scanned text.";
      tags.innerHTML=matches.map(x=>`<span class="checker-match-tag">${escapeHtml(x)}</span>`).join("");
    }else{
      resultBox.className="checker-result clear";
      icon.textContent="✓";
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
function compactOFFProduct(barcode, product){
  return {
    barcode:String(barcode),
    name:product.product_name || product.product_name_en || "Unknown product",
    brand:product.brands || "",
    ingredientsText:product.ingredients_text || product.ingredients_text_en || "",
    allergens:normaliseOFFAllergens(product.allergens_tags || []),
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
  if(cache[code]){
    return {...cache[code], fromCache:true};
  }

  const fields=[
    "code","product_name","product_name_en","brands",
    "ingredients_text","ingredients_text_en","allergens_tags","traces_tags",
    "labels_tags","image_front_url","image_front_small_url"
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
  tags.innerHTML=product.allergens.length
    ? product.allergens.map(x=>`<span class="allergen-tag">${escapeHtml(x)}</span>`).join("")
    : `<span class="muted">No structured allergens listed</span>`;
  const pieces=[];
  pieces.push(product.fromCache ? "Loaded from your local Intolearn product cache." : "Loaded from Open Food Facts.");
  if(!product.ingredientsText) pieces.push("Ingredient text is missing.");
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
    icon.textContent="!";
    title.textContent="Selected trigger detected";
    text.textContent="Open Food Facts lists one or more of your selected triggers for this product.";
    tags.innerHTML=matches.map(x=>`<span class="checker-match-tag">${escapeHtml(x)}</span>`).join("");
  }else{
    resultBox.className="checker-result clear";
    icon.textContent="✓";
    title.textContent="No selected trigger listed";
    text.textContent="No selected trigger was found in the structured allergen data/available ingredient data. Always verify the original packaging.";
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
function saveState(){ localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
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

function resetMealForm(){
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
    createdAt: editingIndex===null ? new Date().toISOString() : (getDay(editingDateKey).meals[activeMeal][editingIndex]?.createdAt || new Date().toISOString()),
    updatedAt:new Date().toISOString()
  };

  const isNew = editingIndex===null;

  if(isNew){
    currentDay().meals[activeMeal].push(entry);
  }else{
    getDay(editingDateKey).meals[activeMeal][editingIndex]=entry;
  }

  saveState();

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
function processChosenImage(file, previewData){
  closeCropDialog();

  if(cropDestination==="checker"){
    document.getElementById("checkerPreview").innerHTML=`<img src="${previewData}" alt="Ingredient label preview">`;
    scanCheckerImage(file);
    return;
  }

  photoData=previewData;
  document.getElementById("photoPreview").innerHTML=`<img src="${previewData}" alt="Ingredient photo preview">`;
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
    const file=blobToFile(blob);
    const data=canvas.toDataURL("image/jpeg",0.92);
    processChosenImage(file,data);
  },"image/jpeg",0.92);
});
document.getElementById("useFullPhotoBtn").addEventListener("click",()=>{
  if(!pendingPhotoFile) return;
  const reader=new FileReader();
  reader.onload=()=>processChosenImage(pendingPhotoFile,reader.result);
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
  saveState(); renderAll(); showToast("Exit Interview saved");
};

function renderExit(){
  const ex=currentDay().exit||{};
  const complete=Object.keys(ex).length>0;
  document.getElementById("exitStatus").textContent=complete?"Saved":"Not completed";
  document.getElementById("summaryMood").textContent=({Great:"😄",Fine:"🙂",Meh:"😐",Poor:"😣"})[ex.feeling]||"🙂";
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
    const face=({Great:"😄",Fine:"🙂",Meh:"😐",Poor:"😣"})[ex.feeling]||"·";
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
  const keySet=new Set(keys);
  let meals=0, scans=0, exits=0, symptomDays=0, comfortable=0;
  const stats={};

  keys.forEach(k=>{
    const day=state.days[k]||{};
    const symptomatic=(day.exit?.symptoms||[]).length>0 || ["Poor","Meh"].includes(day.exit?.feeling);
    if(symptomatic) symptomDays++;
    if(["Good","Great"].includes(day.exit?.feeling) && !symptomatic) comfortable++;
    if(day.exit && Object.keys(day.exit).length) exits++;

    const dayTags=new Set();
    mealTypes.forEach(m=>(day.meals?.[m.key]||[]).forEach(x=>{
      meals++; if(x.photoData) scans++;
      reportMealIngredients(x).forEach(t=>dayTags.add(t));
    }));
    dayTags.forEach(tag=>{
      stats[tag] ||= {days:0,symptomDays:0};
      stats[tag].days++;
      if(symptomatic) stats[tag].symptomDays++;
    });
  });

  const start=new Date(); start.setDate(start.getDate()-reportDays+1);
  document.getElementById("reportPeriod").textContent=
    `${start.toLocaleDateString("en-GB",{day:"numeric",month:"short"})} – ${new Date().toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"})}`;

  document.getElementById("reportSummary").innerHTML=[
    ["📅",keys.length,"Days recorded"],["🍽️",meals,"Meals recorded"],
    ["📷",scans,"Ingredient scans"],["📋",exits,"Exit Interviews"]
  ].map(s=>`<div class="report-stat"><span>${s[0]}</span><strong>${s[1]}</strong><small>${s[2]}</small></div>`).join("");

  const ranked=Object.entries(stats).map(([name,v])=>({...v,name,rate:v.days?v.symptomDays/v.days:0}))
    .sort((a,b)=>b.rate-a.rate||b.days-a.days);

  const connections=ranked.filter(x=>x.days>=2).slice(0,5);
  document.getElementById("reportConnections").innerHTML=connections.length?connections.map(x=>`
    <div class="connection-card">
      <div class="connection-title"><strong>${escapeHtml(titleCase(x.name))}</strong><span class="connection-score">${Math.round(x.rate*100)}%</span></div>
      <div class="connection-bar"><span style="width:${Math.round(x.rate*100)}%"></span></div>
      <p>${x.symptomDays} of ${x.days} recorded exposure day${x.days===1?"":"s"} also had symptoms recorded.</p>
    </div>`).join(""):`<p class="muted">Not enough repeated exposure data yet. Keep logging and this section will build automatically.</p>`;

  const exposures=Object.entries(stats).map(([name,v])=>({name,...v})).sort((a,b)=>b.days-a.days).slice(0,8);
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
  const ingredientStats={};
  Object.entries(state.days).forEach(([k,day])=>{
    const symptomatic=(day.exit?.symptoms||[]).length>0 || ["Poor","Meh"].includes(day.exit?.feeling);
    const ingredients=new Set();
    mealTypes.forEach(m=>(day.meals?.[m.key]||[]).forEach(x=>(x.ingredients||[]).forEach(i=>ingredients.add(i.toLowerCase()))));
    ingredients.forEach(i=>{
      ingredientStats[i] ||= {days:0,symptomDays:0};
      ingredientStats[i].days++;
      if(symptomatic) ingredientStats[i].symptomDays++;
    });
  });
  const trends=Object.entries(ingredientStats)
    .filter(([,v])=>v.days>=2)
    .map(([name,v])=>({name,...v,rate:v.symptomDays/v.days}))
    .sort((a,b)=>b.rate-a.rate || b.days-a.days)
    .slice(0,6);
  document.getElementById("trendCards").innerHTML=trends.length?trends.map(t=>`
    <div class="trend-card">
      <h3>${escapeHtml(titleCase(t.name))}</h3>
      <p class="muted">${t.symptomDays} of ${t.days} logged day${t.days===1?"":"s"} containing this ingredient also had symptoms.</p>
      <div class="trend-bar"><span style="width:${Math.round(t.rate*100)}%"></span></div>
      <div class="trend-meta"><span>Association in your diary</span><strong>${Math.round(t.rate*100)}%</strong></div>
    </div>
  `).join(""):`<div class="card"><h3>Not enough data yet</h3><p class="muted">Log ingredients and symptoms over several days and Intolearn will start surfacing repeated associations here.</p></div>`;
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

function renderAll(){
  const jobs=[renderMeals,renderExit,renderWeek,renderMonth,renderTrends,renderReport];
  jobs.forEach(fn=>{
    try{ fn(); }
    catch(err){ console.error(fn.name+" failed",err); }
  });
}
ensureDay(); renderAll();
