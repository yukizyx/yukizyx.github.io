// Timeline Animation
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.15 }
);

document
  .querySelectorAll(".timeline-item")
  .forEach((el) => observer.observe(el));

// Research Filter
function filterProjects(type) {
  const cards = document.querySelectorAll(".project-card");
  const buttons = document.querySelectorAll(".tab-btn");

  buttons.forEach((btn) => btn.classList.remove("active"));
  event.target.classList.add("active");

  cards.forEach((card) => {
    if (type === "all" || card.getAttribute("data-type") === type) {
      card.style.display = "block";
      setTimeout(() => (card.style.opacity = 1), 50);
    } else {
      card.style.display = "none";
      card.style.opacity = 0;
    }
  });
}

// Background Particles (Subtle Neural/Quantum Network)
const canvas = document.getElementById("quantum-canvas");
const ctx = canvas.getContext("2d");
let w,
  h,
  particles = [];

function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}

class Particle {
  constructor() {
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.vx = (Math.random() - 0.5) * 0.3;
    this.vy = (Math.random() - 0.5) * 0.3;
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0 || this.x > w) this.vx *= -1;
    if (this.y < 0 || this.y > h) this.vy *= -1;
  }
}

function init() {
  particles = new Array(40).fill().map(() => new Particle());
}

function animate() {
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = "#4285F4";
  ctx.strokeStyle = "rgba(66, 133, 244, 0.15)";

  particles.forEach((p, i) => {
    p.update();
    ctx.beginPath();
    ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
    ctx.fill();

    // Connect particles
    for (let j = i + 1; j < particles.length; j++) {
      const p2 = particles[j];
      const d = Math.hypot(p.x - p2.x, p.y - p2.y);
      if (d < 150) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      }
    }
  });
  requestAnimationFrame(animate);
}

window.addEventListener("resize", resize);
resize();
init();
animate();
