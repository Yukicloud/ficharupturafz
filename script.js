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

let points = 15;
let sanity = 100;
let effort = 100;

const stats = document.getElementById("stats");
const pointsEl = document.getElementById("points");
const sanityBar = document.getElementById("sanityBar");
const effortBar = document.getElementById("effortBar");

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

function changeStat(btn, val){
  const span = btn.parentElement.querySelector("span");
  let current = +span.innerText;

  if(val > 0 && points <= 0) return;
  if(val < 0 && current <= 0) return;

  span.innerText = current + val;
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
}

/* ===== ESFORÇO → SANIDADE ===== */
function useEffort(){
  if(effort <= 0 || sanity <= 0) return;

  effort -= 10;
  sanity -= 5;

  updateBars();
}

function updateBars(){
  sanityBar.style.width = Math.max(0, sanity) + "%";
  effortBar.style.width = Math.max(0, effort) + "%";
}

/* ===== SALVAR ===== */
function saveImage(type){
  html2canvas(document.getElementById("ficha"), {scale:2})
    .then(canvas => {
      const link = document.createElement("a");
      link.download = `Ficha_RPG.${type}`;
      link.href = canvas.toDataURL(`image/${type}`);
      link.click();
    });
}
