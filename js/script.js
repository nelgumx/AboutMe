document.getElementById('year').textContent = new Date().getFullYear();

/* ---------- Live Abu Dhabi clock (SCADA-style readout) ---------- */
const clockEl = document.getElementById('clock');
function updateClock(){
  const now = new Date();
  const formatted = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Dubai',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
    hour12: false
  }).format(now);
  if(clockEl) clockEl.textContent = formatted;
}
updateClock();
setInterval(updateClock, 1000);

/* ---------- Mobile nav toggle ---------- */
const navToggle = document.getElementById('navToggle');
const nav = document.getElementById('nav');
navToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});
nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

/* ---------- Scroll reveal ---------- */
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const revealTargets = document.querySelectorAll(
  '.section-head, .about__body, .log-entry, .project-card, .skill-group, .contact-card, .stat-panel, .education__inner'
);
revealTargets.forEach(el => el.classList.add('reveal'));

if (prefersReducedMotion) {
  revealTargets.forEach(el => el.classList.add('is-visible'));
} else {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealTargets.forEach(el => observer.observe(el));
}

/* ---------- Animated stat counters ---------- */
const statEls = document.querySelectorAll('.stat__value');

function animateCount(el){
  const target = parseInt(el.dataset.count, 10);
  const suffix = el.dataset.suffix || '';
  if (prefersReducedMotion) {
    el.textContent = target + suffix;
    return;
  }
  const duration = 900;
  const start = performance.now();

  function tick(now){
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.round(target * eased);
    el.textContent = value + suffix;
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCount(entry.target);
      statObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

statEls.forEach(el => statObserver.observe(el));


const hoverVideos = document.querySelectorAll('.hover-video');

hoverVideos.forEach(video => {
    video.addEventListener('mouseenter', () => {
        video.play();
    });

    video.addEventListener('mouseleave', () => {
        video.pause();
        video.currentTime = 0; // reset to start
    });
});
