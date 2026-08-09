
const STORAGE_KEY = "intolearn_personal_v1";
const mealTypes = [
  {key:"breakfast", label:"Breakfast", icon:"☀️"},
  {key:"lunch", label:"Lunch", icon:"🌤️"},
  {key:"dinner", label:"Dinner", icon:"🌙"},
  {key:"snacks", label:"Snacks & Drinks", icon:"🍎"}
];

let state = loadState();
let activeMeal = "breakfast";
let photoData = "";

function blankState(){
  return { days:{} };
}
function loadState(){
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || blankState(); }
  catch { return blankState(); }
}
function saveState(){
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}
function dateKey(d=new Date()){
  return d.toISOString().slice(0,10);
}
function ensureDay(key=dateKey()){
  if(!state.days[key]){
    state.days[key]={ meals:{breakfast:[],lunch:[],dinner:[],snacks:[]}, exit:{} };
  }
  mealTypes.forEach(m => state.days[key].meals[m.key] ||= []);
  return state.days[key];
}
function fmtDate(d){
  return d.toLocaleDateString("en-GB",{weekday:"long",day:"numeric",month:"long"});
}
function parseIngredients(raw){
  return raw.split(/[\n,;]+/).map(x=>x.trim()).filter(Boolean);
}
function currentDay(){ return ensureDay(); }

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
        <button class="add-btn" data-meal="${m.key}">+ Add</button>
      </div>
      <div class="entry-list">
        ${items.map((it,i)=>`
          <div class="food-entry">
            <strong>${escapeHtml(it.name)}</strong>
            <small>${it.time || ""}${it.notes ? " · "+escapeHtml(it.notes):""}</small>
            <div class="ingredient-tags">${(it.ingredients||[]).slice(0,8).map(x=>`<span class="ingredient-tag">${escapeHtml(x)}</span>`).join("")}</div>
          </div>`).join("")}
      </div>`;
    wrap.appendChild(card);
  });
  document.querySelectorAll(".add-btn").forEach(btn=>btn.onclick=()=>openMeal(btn.dataset.meal));
}
function openMeal(meal){
  activeMeal=meal;
  const meta=mealTypes.find(x=>x.key===meal);
  document.getElementById("mealDialogTitle").textContent=meta.label;
  document.getElementById("foodName").value="";
  document.getElementById("ingredients").value="";
  document.getElementById("foodNotes").value="";
  document.getElementById("foodTime").value=new Date().toTimeString().slice(0,5);
  document.getElementById("ingredientPhoto").value="";
  document.getElementById("photoPreview").innerHTML="";
  photoData="";
  document.getElementById("mealDialog").showModal();
}
function escapeHtml(s=""){
  return s.replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#039;"}[m]));
}

document.getElementById("mealForm").addEventListener("submit",e=>{
  if(e.submitter && e.submitter.value==="cancel") return;
  e.preventDefault();
  const name=document.getElementById("foodName").value.trim();
  if(!name) return;
  const day=currentDay();
  day.meals[activeMeal].push({
    name,
    time:document.getElementById("foodTime").value,
    ingredients:parseIngredients(document.getElementById("ingredients").value),
    notes:document.getElementById("foodNotes").value.trim(),
    photo:photoData,
    createdAt:new Date().toISOString()
  });
  saveState(); renderAll();
  document.getElementById("mealDialog").close();
});

document.getElementById("ingredientPhoto").addEventListener("change",e=>{
  const file=e.target.files?.[0];
  if(!file) return;
  const reader=new FileReader();
  reader.onload=()=>{
    photoData=reader.result;
    document.getElementById("photoPreview").innerHTML=`<img src="${photoData}" alt="Ingredient photo preview">`;
  };
  reader.readAsDataURL(file);
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
  saveState(); renderAll();
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
function titleCase(s){return s.replace(/\b\w/g,c=>c.toUpperCase())}

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
    localStorage.removeItem(STORAGE_KEY); state=blankState(); renderAll();
  }
};

function renderAll(){
  renderMeals(); renderExit(); renderWeek(); renderMonth(); renderTrends();
}
ensureDay(); renderAll();
