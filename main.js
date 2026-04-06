let currentTheme = "pro";
const proTyping = [
  "Full Stack Developer",
  "Django & Laravel Expert",
  "React & Vue.js Builder",
  "REST API Architect",
  "Clean Code Enthusiast",
];
const sillyTyping = [
  "Professional Bug Creator 🐛",
  "Definitely Not a Stack Overflow Account",
  "Ctrl+Z Enthusiast",
  "99 Problems, CSS is 98 of Them",
  'git commit -m "it works"',
];

function spawnConfetti(x, y) {
  const colors = ["#ff6b35", "#7c4dff", "#00d166", "#ffd166", "#ef476f"];
  const burst = document.createElement("div");
  burst.className = "confetti-burst";
  burst.style.left = x + "px";
  burst.style.top = y + "px";
  for (let i = 0; i < 16; i++) {
    const p = document.createElement("div");
    p.className = "confetti-piece";
    p.style.background = colors[i % colors.length];
    p.style.left = Math.random() * 80 - 40 + "px";
    p.style.animationDelay = Math.random() * 0.3 + "s";
    p.style.transform = `rotate(${Math.random() * 360}deg)`;
    p.style.borderRadius = Math.random() > 0.5 ? "50%" : "2px";
    burst.appendChild(p);
  }
  document.body.appendChild(burst);
  setTimeout(() => burst.remove(), 1500);
}

function updateContent(theme) {
  // Update all data-pro / data-silly elements
  document.querySelectorAll("[data-pro]").forEach((el) => {
    const val = theme === "silly" ? el.getAttribute("data-silly") : el.getAttribute("data-pro");
    if (val) el.textContent = val;
  });

  // Update placeholders
  document.querySelectorAll("[data-pro-placeholder]").forEach((el) => {
    el.placeholder =
      theme === "silly" ? el.getAttribute("data-silly-placeholder") : el.getAttribute("data-pro-placeholder");
  });

  // Update marquee
  const sillyMarquee = [
    "🚀 Ship It",
    "☕ Coffee++",
    "🐛 Found a Bug",
    "💡 Eureka!",
    "😤 It Works",
    "🤯 Mind Blown",
    "🎉 Deployed!",
    "🔥 On Fire",
    "🤷 sudo fix",
    "🌙 Late Night",
  ];
  const proMarquee = [
    "Django",
    "Laravel",
    "React",
    "Vue.js",
    "REST APIs",
    "React Native",
    "CI/CD",
    "GitHub Actions",
    "PostgreSQL",
    "Full Stack Developer",
  ];
  const track = document.getElementById("marqueeTrack");
  const items = theme === "silly" ? [...sillyMarquee, ...sillyMarquee] : [...proMarquee, ...proMarquee];
  track.innerHTML = items
    .map((item, i) => `<div class="marquee-item"><span>${theme === "silly" ? "🎪" : "✦"}</span>${item}</div>`)
    .join("");

  // Update toggle button
  const icon = document.getElementById("toggleIcon");
  const text = document.getElementById("toggleText");
  if (theme === "silly") {
    icon.textContent = "🎩";
    text.textContent = "Pro Mode";
  } else {
    icon.textContent = "🎪";
    text.textContent = "Silly Mode";
  }
}

function toggleTheme() {
  const btn = document.getElementById("themeToggle");
  const rect = btn.getBoundingClientRect();
  currentTheme = currentTheme === "pro" ? "silly" : "pro";
  document.documentElement.setAttribute("data-theme", currentTheme);

  if (currentTheme === "silly") {
    spawnConfetti(rect.left + rect.width / 2, rect.top);
    setTimeout(() => spawnConfetti(rect.left + rect.width / 2, rect.top), 200);
  }

  updateContent(currentTheme);

  // Reset typewriter for new theme
  pi = 0;
  ci = 0;
  deleting = false;
  document.getElementById("typewriter").textContent = "";
}

/* ===========================
           CURSOR
        =========================== */
const cursor = document.getElementById("cursor");
const follower = document.getElementById("cursorFollower");
let mx = 0,
  my = 0,
  fx = 0,
  fy = 0;
document.addEventListener("mousemove", (e) => {
  mx = e.clientX;
  my = e.clientY;
  cursor.style.left = mx + "px";
  cursor.style.top = my + "px";
});
function animateFollower() {
  fx += (mx - fx) * 0.12;
  fy += (my - fy) * 0.12;
  follower.style.left = fx + "px";
  follower.style.top = fy + "px";
  requestAnimationFrame(animateFollower);
}
animateFollower();
document.querySelectorAll("a, button, input, textarea").forEach((el) => {
  el.addEventListener("mouseenter", () => {
    cursor.style.transform = "translate(-50%,-50%) scale(1.8)";
    follower.style.width = "50px";
    follower.style.height = "50px";
    follower.style.opacity = "0.3";
  });
  el.addEventListener("mouseleave", () => {
    cursor.style.transform = "translate(-50%,-50%) scale(1)";
    follower.style.width = "36px";
    follower.style.height = "36px";
    follower.style.opacity = "0.5";
  });
});

/* ===========================
           NAV SCROLL
        =========================== */
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 50);
});

/* ===========================
           TYPEWRITER
        =========================== */
let pi = 0,
  ci = 0,
  deleting = false;
const tw = document.getElementById("typewriter");
function getPhrase() {
  return currentTheme === "silly" ? sillyTyping[pi % sillyTyping.length] : proTyping[pi % proTyping.length];
}
function typeLoop() {
  const word = getPhrase();
  if (!deleting) {
    tw.textContent = word.substring(0, ci + 1);
    ci++;
    if (ci === word.length) {
      deleting = true;
      setTimeout(typeLoop, 1800);
      return;
    }
  } else {
    tw.textContent = word.substring(0, ci - 1);
    ci--;
    if (ci === 0) {
      deleting = false;
      pi = pi + 1;
    }
  }
  setTimeout(typeLoop, deleting ? 45 : 85);
}
setTimeout(typeLoop, 600);

/* ===========================
           SCROLL ANIMATIONS
        =========================== */
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.style.transitionDelay =
          Array.from(e.target.parentElement?.children || []).indexOf(e.target) * 0.08 + "s";
        e.target.classList.add("visible");
        observer.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12 },
);
document.querySelectorAll(".fade-up").forEach((el) => observer.observe(el));

/* ===========================
           SKILL BARS
        =========================== */
const barObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.querySelectorAll(".skill-bar-fill").forEach((bar) => {
          bar.style.width = bar.dataset.width + "%";
        });
        barObserver.unobserve(e.target);
      }
    });
  },
  { threshold: 0.3 },
);
document.querySelectorAll(".skills-category").forEach((el) => barObserver.observe(el));
