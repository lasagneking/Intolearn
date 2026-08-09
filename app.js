
const STORAGE_KEY = "intolearn_personal_v1";
const APP_VERSION = "3.5";
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
    .filter(a=>a.terms.some(term=>termPresent(hay,term)))
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
let photoData = "";
let toastTimer = null;
let cropper = null;
let pendingPhotoFile = null;

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
        ${items.map((it,i)=>`
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
          </div>`).join("")}
      </div>`;
    wrap.appendChild(card);
  });

  document.querySelectorAll(".add-btn").forEach(btn=>btn.onclick=()=>openMeal(btn.dataset.meal));
  document.querySelectorAll(".view-entry").forEach(btn=>btn.onclick=()=>openMeal(btn.dataset.meal, Number(btn.dataset.index)));
  document.querySelectorAll(".delete-entry").forEach(btn=>btn.onclick=()=>deleteMeal(btn.dataset.meal, Number(btn.dataset.index), false));
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
}

function openMeal(meal, index=null){
  activeMeal=meal;
  editingIndex=index;
  const meta=mealTypes.find(x=>x.key===meal);
  resetMealForm();

  document.getElementById("mealDialogTitle").textContent=meta.label;
  document.getElementById("mealDialogEyebrow").textContent=index===null ? "ADD ENTRY" : "VIEW / EDIT ENTRY";
  document.getElementById("saveMealBtn").textContent=index===null ? "Save entry" : "Save changes";
  document.getElementById("deleteMealBtn").classList.toggle("hidden", index===null);

  if(index!==null){
    const item=currentDay().meals[meal][index];
    if(!item) return;
    document.getElementById("foodName").value=item.name||"";
    document.getElementById("foodTime").value=item.time||"";
    document.getElementById("ingredients").value=(item.ingredients||[]).join("\n");
    document.getElementById("foodNotes").value=item.notes||"";
    photoData=item.photo||"";
    if(photoData) document.getElementById("photoPreview").innerHTML=`<img src="${photoData}" alt="Ingredient photo preview">`;
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
    allergens:detectUKAllergens(document.getElementById("ingredients").value),
    notes:document.getElementById("foodNotes").value.trim(),
    photo:photoData,
    createdAt: editingIndex===null ? new Date().toISOString() : (currentDay().meals[activeMeal][editingIndex]?.createdAt || new Date().toISOString()),
    updatedAt:new Date().toISOString()
  };

  const isNew = editingIndex===null;

  if(isNew){
    currentDay().meals[activeMeal].push(entry);
  }else{
    currentDay().meals[activeMeal][editingIndex]=entry;
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

function deleteMeal(meal, index, fromDialog=true){
  const item=currentDay().meals[meal]?.[index];
  if(!item) return;
  if(!confirm(`Delete "${item.name}"?`)) return;
  currentDay().meals[meal].splice(index,1);
  saveState();
  renderAll();
  if(fromDialog && document.getElementById("mealDialog").open) closeMealDialog();
  showToast("Entry deleted");
}

document.getElementById("saveMealBtn").addEventListener("click", saveMeal);
document.getElementById("cancelMealBtn").addEventListener("click", closeMealDialog);
document.getElementById("closeMealDialog").addEventListener("click", closeMealDialog);
document.getElementById("deleteMealBtn").addEventListener("click", ()=>deleteMeal(activeMeal, editingIndex, true));

document.getElementById("mealForm").addEventListener("submit", e=>e.preventDefault());
document.getElementById("mealDialog").addEventListener("cancel", e=>{
  e.preventDefault();
  closeMealDialog();
});

function handleIngredientPhoto(file){
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
  photoData=previewData;
  document.getElementById("photoPreview").innerHTML=`<img src="${previewData}" alt="Ingredient photo preview">`;
  closeCropDialog();
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

document.getElementById("ingredientCamera").addEventListener("change",e=>{
  handleIngredientPhoto(e.target.files?.[0]);
});
document.getElementById("ingredientLibrary").addEventListener("change",e=>{
  handleIngredientPhoto(e.target.files?.[0]);
});
document.getElementById("ingredients").addEventListener("input",e=>renderFamilies(e.target.value));

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
  document.getElementById("monthCalendar").innerHTML=monthDates().map(d=>{
    if(!d) return `<div></div>`;
    const day=state.days[dateKey(d)];
    return `<div class="cal-day ${dayTone(day)}"><strong>${d.getDate()}</strong><span>${day? "•":""}</span></div>`;
  }).join("");
  renderMonthResults();
}
function renderMonthResults(){
  const q=document.getElementById("monthFilter").value.trim().toLowerCase();
  const now=new Date(), prefix=`${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,"0")}`;
  const results=[];
  Object.entries(state.days).filter(([k])=>k.startsWith(prefix)).forEach(([k,day])=>{
    mealTypes.forEach(m=>(day.meals?.[m.key]||[]).forEach(x=>{
      const hay=[x.name,...(x.ingredients||[]),x.notes||"",...(day.exit?.symptoms||[])].join(" ").toLowerCase();
      if(!q || hay.includes(q)) results.push({k,m,x});
    }));
  });
  results.sort((a,b)=>b.k.localeCompare(a.k));
  document.getElementById("monthResults").innerHTML=results.length?results.map(o=>`
    <div class="timeline-item"><strong>${escapeHtml(o.x.name)}</strong><small>${new Date(o.k+"T12:00:00").toLocaleDateString("en-GB",{day:"numeric",month:"short"})} · ${mealTypes.find(m=>m.key===o.m).label}</small></div>
  `).join(""):`<p class="muted">No matching entries.</p>`;
}
document.getElementById("monthFilter").addEventListener("input",renderMonthResults);

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

function renderAll(){ renderMeals(); renderExit(); renderWeek(); renderMonth(); renderTrends(); }
ensureDay(); renderAll();
