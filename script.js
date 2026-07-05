/* ============================================
   Khushbu Patidar — Portfolio interactions
   ============================================ */

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// ---- Decorative gutter line numbers ----
function buildGutter() {
  const gutter = document.getElementById("gutter");
  const lineHeight = 26;
  const total = Math.ceil(document.body.scrollHeight / lineHeight) + 20;
  let html = "";
  for (let i = 1; i <= total; i++) html += i + "\n";
  gutter.textContent = html;
}
buildGutter();
window.addEventListener("resize", debounce(buildGutter, 300));

function debounce(fn, wait) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), wait);
  };
}

// ---- Typing effect (hero) ----
function typeInto(el, text, speed, onDone) {
  if (reducedMotion) {
    el.textContent = text;
    if (onDone) onDone();
    return;
  }
  let i = 0;
  el.textContent = "";
  const timer = setInterval(() => {
    el.textContent += text.charAt(i);
    i++;
    if (i >= text.length) {
      clearInterval(timer);
      if (onDone) onDone();
    }
  }, speed);
}

window.addEventListener("DOMContentLoaded", () => {
  const nameEl = document.getElementById("typedName");
  const roleEl = document.getElementById("typedRole");
  const cursor = nameEl.querySelector(".cursor");

  const nameSpan = document.createElement("span");
  nameEl.insertBefore(nameSpan, cursor);

  setTimeout(() => {
    typeInto(nameSpan, "Khushbu Patidar", 55, () => {
      setTimeout(() => {
        typeInto(roleEl, "Frontend Developer, always learning full-stack", 28);
      }, 250);
    });
  }, 350);
});

// ---- Scroll reveal ----
const sections = document.querySelectorAll(".section");
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
      }
    });
  },
  { threshold: 0.12 }
);
sections.forEach((s) => revealObserver.observe(s));

// ---- Active tab highlighting on scroll ----
const tabs = document.querySelectorAll(".tab");
const tabMap = {};
tabs.forEach((t) => (tabMap[t.dataset.target] = t));

const tabObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const id = entry.target.id;
      if (entry.isIntersecting) {
        tabs.forEach((t) => t.classList.remove("active"));
        if (tabMap[id]) tabMap[id].classList.add("active");
      }
    });
  },
  { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
);
sections.forEach((s) => tabObserver.observe(s));

// ---- Copy email ----
const copyBtn = document.getElementById("copyEmail");
const copyHint = document.getElementById("copyHint");
const toast = createToast();

copyBtn.addEventListener("click", async () => {
  const email = "khushboopatidar888@gmail.com";
  try {
    await navigator.clipboard.writeText(email);
    showToast("Email copied to clipboard");
    copyHint.textContent = "copied!";
    setTimeout(() => (copyHint.textContent = "click to copy"), 1800);
  } catch (err) {
    showToast("Copy failed — email: " + email);
  }
});

function createToast() {
  const el = document.createElement("div");
  el.className = "toast";
  document.body.appendChild(el);
  return el;
}
let toastTimer = null;
function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
}

// ---- Footer year ----
document.getElementById("year").textContent = new Date().getFullYear();
