const BOOT_LINES = [
  "> powering up Didi OS...",
  "> loading memory database...",
  "> checking sister status... <b>LEGENDARY</b>",
  "> loading love module... <b>∞%</b>",
  "> birthday detected: <b>GUNJAN DI</b>",
  "> security check... <b>PASSED ✓</b>",
  "> birthday protocol ready."
];

const terminal = document.getElementById("terminal");
const progressBar = document.getElementById("progressBar");
const bootStatus = document.getElementById("bootStatus");

let lineIndex = 0;
const lineTimer = setInterval(() => {
  if (lineIndex < BOOT_LINES.length) {
    const line = document.createElement("div");
    line.innerHTML = BOOT_LINES[lineIndex++];
    terminal.appendChild(line);
  } else {
    clearInterval(lineTimer);
  }
}, 260);

let progress = 0;
const progressTimer = setInterval(() => {
  progress += Math.random() * 7 + 3;
  if (progress >= 100) {
    progress = 100;
    clearInterval(progressTimer);
    bootStatus.textContent = "ACCESS GATE READY...";
    setTimeout(() => showScreen("login"), 700);
  }
  progressBar.style.width = `${progress}%`;
}, 120);

function showScreen(id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

const password = document.getElementById("password");
const loginError = document.getElementById("loginError");

function unlock() {
  // CHANGE THIS PASSWORD before sharing the website.
  const correctPassword = "gunjan";

  if (password.value.trim().toLowerCase() === correctPassword) {
    loginError.textContent = "";
    showScreen("home");
    startConfetti(55);
  } else {
    loginError.textContent = "ACCESS DENIED — Hint: her first name 😉";
    password.animate([
      {transform:"translateX(0)"},{transform:"translateX(-7px)"},
      {transform:"translateX(7px)"},{transform:"translateX(0)"}
    ], {duration:240});
  }
}

document.getElementById("unlock").addEventListener("click", unlock);
password.addEventListener("keydown", e => { if (e.key === "Enter") unlock(); });

document.getElementById("togglePassword").addEventListener("click", () => {
  password.type = password.type === "password" ? "text" : "password";
});

const modal = document.getElementById("modal");
document.getElementById("surpriseBtn").addEventListener("click", () => {
  modal.classList.add("show");
  startConfetti(90);
});
document.getElementById("closeModal").addEventListener("click", () => modal.classList.remove("show"));
modal.addEventListener("click", e => { if (e.target === modal) modal.classList.remove("show"); });
document.getElementById("confettiBtn").addEventListener("click", () => startConfetti(140));

function startConfetti(amount = 80) {
  const chars = ["🎉","✨","❤️","💖","🎂","🥳"];
  for (let i=0; i<amount; i++) {
    const el = document.createElement("div");
    el.textContent = chars[Math.floor(Math.random()*chars.length)];
    el.style.position = "fixed";
    el.style.left = `${Math.random()*100}vw`;
    el.style.top = "-30px";
    el.style.zIndex = "20";
    el.style.fontSize = `${16 + Math.random()*20}px`;
    el.style.pointerEvents = "none";
    document.body.appendChild(el);

    const duration = 1800 + Math.random()*2200;
    el.animate([
      {transform:`translateY(0) rotate(0deg)`, opacity:1},
      {transform:`translate(${(Math.random()-.5)*180}px, 110vh) rotate(${Math.random()*900-450}deg)`, opacity:0.2}
    ], {duration, easing:"cubic-bezier(.2,.7,.3,1)"});
    setTimeout(()=>el.remove(), duration);
  }
}

// Keyboard shortcut: Escape closes the final surprise.
document.addEventListener("keydown", e => {
  if (e.key === "Escape") modal.classList.remove("show");
});
