/* ===== TELA INICIAL ===== */
const intro = document.getElementById("intro");
const ficha = document.getElementById("ficha");

function start(){
  intro.style.opacity = "0";
  setTimeout(() => {
    intro.remove();
    ficha.classList.remove("hidden");
  }, 500);
}

document.addEventListener("click", start);
document.addEventListener("keydown", e => {
  if(e.key === "Enter" || e.key === " ") start();
});

/* ===== RAÇAS ===== */
const race = document.getElementById("race");
const subraceBox = document.getElementById("subrace-box");

race.addEventListener("change", () => {
  subraceBox.classList.toggle("hidden", race.value !== "Furry");
});

/* ===== ATRIBUTOS ===== */
const attributes = [
  "Força",
  "Enganação",
  "Inteligência",
  "Agilidade",
  "Percepção",
  "Sanidade"
];

let points = 20;
let sanity = 100;
let effort = 100;

const stats = document.getElementById("stats");
const pointsEl = document.getElementById("points");
const sanityBar = document.getElementById("sanityBar");
const effortBar = document.getElementById("effortBar");
const traumaBox = document.getElementById("traumaBox");

attributes.forEach(attr => {
  const div = document.createElement("div");
  div.className = "stat";
  div.innerHTML = `
    <strong>${attr}</strong><br><br>
    <button onclick="changeStat(this,1)">+</button>
    <span>0</span>
    <button onclick="changeStat(this,-1)">-</button>
  `;
  stats.appendChild(div);
});

function changeStat(btn,val){
  const span = btn.parentElement.querySelector("span");
  let cur = +span.innerText;

  if(val>0 && points<=0) return;
  if(val<0 && cur<=0) return;

  span.innerText = cur+val;
  points -= val;
  pointsEl.innerText = points;

  recalcSanity();
}

function recalcSanity(){
  const sanAttr = [...document.querySelectorAll(".stat")]
    .find(s => s.innerText.includes("Sanidade"))
    .querySelector("span").innerText;

  sanity = Math.min(100, 50 + sanAttr * 10);
  updateBars();
  checkTrauma();
}

/* ===== ESFORÇO → SANIDADE ===== */
function useEffort(){
  if(effort<=0 || sanity<=0) return;
  effort -= 10;
  sanity -= 5;
  updateBars();
  checkTrauma();
}

function updateBars(){
  sanityBar.style.width = Math.max(0,sanity)+"%";
  effortBar.style.width = Math.max(0,effort)+"%";
}

/* ===== TRAUMAS ===== */
function checkTrauma(){
  traumaBox.classList.remove("hidden");

  if(sanity <= 20){
    traumaBox.innerText = "TRAUMA GRAVE: Alucinações constantes.";
  }else if(sanity <= 40){
    traumaBox.innerText = "TRAUMA MODERADO: Paranoia intensa.";
  }else if(sanity <= 70){
    traumaBox.innerText = "TRAUMA LEVE: Ansiedade e tensão.";
  }else{
    traumaBox.classList.add("hidden");
  }
}

/* ===== SALVAR IMAGEM NÍTIDA ===== */
function saveImage(type){
  html2canvas(ficha,{
    scale:4,
    backgroundColor:"#000"
  }).then(canvas=>{
    const link=document.createElement("a");
    link.download=`Ficha_A_Ruptura.${type}`;
    link.href=canvas.toDataURL(`image/${type}`,1.0);
    link.click();
  });
}
