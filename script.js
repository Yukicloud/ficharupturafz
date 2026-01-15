/* ===== INTRO ===== */
let started = false;

function startRPG(){
  if(started) return;
  started = true;

  document.getElementById("vhs-screen")?.remove();
  document.getElementById("ficha")?.classList.remove("hidden");
}

document.addEventListener("keydown", e => {
  if(e.key === "Enter") startRPG();
});
document.addEventListener("click", startRPG);
document.addEventListener("touchstart", startRPG);


/* ===== RAÇAS ===== */
const raceSelect = document.getElementById("race");
const subraceBox = document.getElementById("subrace-box");

raceSelect.addEventListener("change", () => {
  subraceBox.classList.toggle("hidden", raceSelect.value !== "Furry");
});


/* ===== ATRIBUTOS ===== */
const attributes = [
  "Força",
  "Agilidade",
  "Intelecto",
  "Percepção",
  "Presença",
  "Vontade",
  "Sorte",
  "Conhecimento"
];

let points = 20;
const stats = document.getElementById("stats");
const pointsEl = document.getElementById("points");

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

  updateBars();
}


/* ===== STATUS ===== */
function updateBars(){
  const values = [...document.querySelectorAll(".stat span")]
    .map(s => +s.innerText);

  const total = values.reduce((a,b)=>a+b,0);
  const presenca = values[4];
  const vontade = values[5];

  hp.style.width = Math.min(100, total * 1.5) + "%";
  effort.style.width = Math.min(100, total) + "%";
  resist.style.width = Math.min(100, (values[0]+values[1]) * 2) + "%";

  const sanityBase = 50 + presenca * 5 + vontade * 5;
  sanity.style.width = Math.min(100, sanityBase) + "%";
}


/* ===== UI ===== */
function toggleSection(el){
  el.nextElementSibling.classList.toggle("open");
}


/* ===== SALVAR ===== */
function saveImage(type){
  html2canvas(document.getElementById("ficha"), {scale:2})
    .then(canvas => {
      const link = document.createElement("a");
      link.download = `A_RUPTURA_FICHA.${type}`;
      link.href = canvas.toDataURL(`image/${type}`);
      link.click();

      document.getElementById("final-screen")
        .classList.remove("hidden");
    });
}
