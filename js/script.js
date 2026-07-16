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





/* ---------- Project modal ---------- */

const projectInfo = {
  project1: {
    title: 'Plant Performance Dashboard',
    subtitle: 'Power BI · Thermal Power Plant',
    video: 'videos/vid001.mp4',
    description: `
      <h3>Overview</h3>
      <p>
        Developed to monitor thermal power plant performance, including
        generation output, heat rate, fuel consumption, auxiliary power,
        and operating efficiency.
      </p>

      <h3>Key features</h3>
      <ul>
        <li>Interactive KPI cards</li>
        <li>Plant performance trends</li>
        <li>Heat-rate analysis</li>
        <li>Fuel-consumption monitoring</li>
        <li>Daily operating reports</li>
      </ul>
    `
  },

  project2: {
    title: 'Fuel Inventory Dashboard',
    subtitle: 'Power BI · Fuel and Logistics Monitoring',
    video: 'videos/vid002.mp4',
    description: `
      <h3>Overview</h3>
      <p>
        Provides visibility into fuel inventory, vessel unloading,
        coal-yard allocation, delivery records, and available stock levels.
      </p>

      <h3>Key features</h3>
      <ul>
        <li>Inventory tracking</li>
        <li>Coal-yard monitoring</li>
        <li>Shipment status</li>
        <li>Stock-level reporting</li>
        <li>Fuel-consumption forecasting</li>
      </ul>
    `
  },

  project3: {
    title: 'Garage Turnaround Time Dashboard',
    subtitle: 'Power BI · Fleet Maintenance',
    video: 'videos/vid003.mp4',
    description: `
      <h3>Overview</h3>
      <p>
        Designed for fleet-maintenance operations to monitor vehicle status,
        repair progress, maintenance schedules, and workshop turnaround time.
      </p>

      <h3>Key features</h3>
      <ul>
        <li>Vehicle repair status</li>
        <li>Workshop-performance KPIs</li>
        <li>Maintenance scheduling</li>
        <li>Turnaround-time analysis</li>
        <li>Downtime trend monitoring</li>
      </ul>
    `
  }
};

const projectModal = document.getElementById('projectModal');
const modalVideo = document.getElementById('modalVideo');
const modalTitle = document.getElementById('modalTitle');
const modalSubtitle = document.getElementById('modalSubtitle');
const modalDescription = document.getElementById('modalDescription');
const modalClose = document.querySelector('.modal-close');

function openProjectModal(projectName) {
  const project = projectInfo[projectName];

  if (!project || !projectModal) {
    return;
  }

  modalTitle.textContent = project.title;
  modalSubtitle.textContent = project.subtitle;
  modalDescription.innerHTML = project.description;

  modalVideo.src = project.video;
  modalVideo.load();

  projectModal.classList.add('show');
  projectModal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');

  modalVideo.play().catch(() => {
    // Some browsers require the user to press Play manually.
  });
}

function closeProjectModal() {
  if (!projectModal) {
    return;
  }

  projectModal.classList.remove('show');
  projectModal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');

  modalVideo.pause();
  modalVideo.currentTime = 0;
  modalVideo.removeAttribute('src');
  modalVideo.load();
}

document.querySelectorAll('.project-card[data-project]').forEach(card => {
  card.addEventListener('click', event => {
    /*
      Do not open the modal when the visitor is directly using
      a button, link, or the small preview-video controls.
    */
    if (event.target.closest('a, button')) {
      return;
    }

    openProjectModal(card.dataset.project);
  });
});

if (modalClose) {
  modalClose.addEventListener('click', closeProjectModal);
}

if (projectModal) {
  projectModal.addEventListener('click', event => {
    if (event.target === projectModal) {
      closeProjectModal();
    }
  });
}

document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && projectModal?.classList.contains('show')) {
    closeProjectModal();
  }
});

