/* =========================
   INTRO VHS – MOBILE + PC
========================= */
let started = false;

function startRPG(){
  if(started) return;
  started = true;

  const vhs = document.getElementById("vhs-screen");
  const ficha = document.getElementById("ficha");

  if(vhs) vhs.remove();
  if(ficha) ficha.classList.remove("hidden");
}

document.addEventListener("keydown", e => {
  if(e.key === "Enter") startRPG();
});

document.addEventListener("click", startRPG);
document.addEventListener("touchstart", startRPG);


/* =========================
   RAÇAS
========================= */
function updateSubrace(){
  const race = document.getElementById("race").value;
  const box = document.getElementById("subrace-box");

  if(race === "Furry"){
    box.classList.remove("hidden");
  } else {
    box.classList.add("hidden");
  }
}


/* =========================
   ATRIBUTOS
========================= */
const attributes = [
  "Força",
  "Agilidade",
  "Intelecto",
  "Percepção",
  "Presença",
  "Vontade"
];

let points = 15;

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
  let current = parseInt(span.innerText);

  if(val > 0 && points <= 0) return;
  if(val < 0 && current <= 0) return;

  span.innerText = current + val;
  points -= val;
  pointsEl.innerText = points;

  updateBars();
}


/* =========================
   BARRAS
========================= */
function updateBars(){
  const spans = document.querySelectorAll(".stat span");
  let total = 0;
  spans.forEach(s => total += parseInt(s.innerText));

  hp.style.width = Math.min(100, total * 2) + "%";
  sanity.style.width = Math.max(10, 100 - total * 2) + "%";
  effort.style.width = Math.min(100, total * 1.5) + "%";
}


/* =========================
   UI
========================= */
function toggleSection(el){
  el.nextElementSibling.classList.toggle("open");
}


/* =========================
   PDF
========================= */
function savePDF(){
  html2pdf()
    .from(document.getElementById("ficha"))
    .set({
      filename:"A_RUPTURA_FICHA.pdf",
      html2canvas:{scale:2}
    })
    .save();
}
