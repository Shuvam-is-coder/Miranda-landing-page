const scroll = new LocomotiveScroll({
  el: document.querySelector(".main"),
  smooth: true,
});

var tl = gsap.timeline();

tl.to(".view1", {
  y: "100vh",
  scale: 0.6,
  duration: 0,
});

tl.to(".view1", {
  y: "0vh",
  duration: 1,
  delay: 1,
});

tl.to(".view1", {
  rotate: 360,
  scale: 1,
  duration: 0.8,
  delay: 0.1,
});

// ===== Retro Marquee System =====

const marquee = document.querySelector(".marquee");
const view8 = document.querySelector(".view8");

let speed = 70; // px per second
let px = 0;
let last = null;
let paused = false;

// 1) Duplicate the <h1> enough times to fill 2x width
function fillMarquee() {
  const item = marquee.children[0];
  marquee.innerHTML = "";

  marquee.appendChild(item.cloneNode(true));
  marquee.appendChild(item.cloneNode(true));

  while (marquee.offsetWidth < view8.offsetWidth * 2.2) {
    marquee.appendChild(item.cloneNode(true));
  }
}

fillMarquee();

// 2) Animation loop
function move(ts) {
  if (!last) last = ts;

  const dt = (ts - last) / 1000;
  last = ts;

  if (!paused) {
    px -= speed * dt;

    const first = marquee.children[0];
    if (Math.abs(px) > first.offsetWidth) {
      px += first.offsetWidth;
      marquee.appendChild(first);
    }

    marquee.style.transform = `translateX(${px}px)`;
  }

  requestAnimationFrame(move);
}

requestAnimationFrame(move);

// 3) Pause on hover
view8.addEventListener("mouseenter", () => (paused = true));
view8.addEventListener("mouseleave", () => (paused = false));

// 4) Retro CRT glitch effect (random momentary jitter)
function retroGlitch() {
  if (!paused) {
    marquee.style.transform += " translateY(0.3px) skewX(0.3deg)";
    setTimeout(() => (marquee.style.transform = `translateX(${px}px)`), 50);
  }
  setTimeout(retroGlitch, 1200 + Math.random() * 2000);
}

retroGlitch();

// 5) Keypress effect — makes text flicker like a CRT monitor
document.addEventListener("keydown", () => {
  marquee.style.filter = "contrast(200%) brightness(140%)";
  setTimeout(() => (marquee.style.filter = "none"), 120);
});
