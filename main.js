/* ============================================
   STERLING GYM — JavaScript (Fixed)
   ============================================ */

// FIX 1 — Lightbox functions in GLOBAL scope (moved out of window.onload)
function openLightbox(src) {
  const lb = document.getElementById('lightbox');
  document.getElementById('lightbox-img').src = src;
  lb.style.display = 'flex';
}
function closeLightbox() {
  document.getElementById('lightbox').style.display = 'none';
}

// FIX 7 — Hide cursor on touch devices
if ('ontouchstart' in window) {
  document.body.style.cursor = 'auto';
  const cursorEl = document.getElementById('cursor');
  const followerEl = document.getElementById('cursorFollower');
  if (cursorEl) cursorEl.style.display = 'none';
  if (followerEl) followerEl.style.display = 'none';
}

// ——— CUSTOM CURSOR ———
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursorFollower');
let mouseX = 0, mouseY = 0, followerX = 0, followerY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  if (cursor) {
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
  }
});

// Smooth follower
function animateFollower() {
  followerX += (mouseX - followerX) * 0.12;
  followerY += (mouseY - followerY) * 0.12;
  if (follower) {
    follower.style.left = followerX + 'px';
    follower.style.top = followerY + 'px';
  }
  requestAnimationFrame(animateFollower);
}
animateFollower();

// Cursor hover effect
document.querySelectorAll('a, button, .equip-card, .service-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    if (cursor) cursor.style.transform = 'translate(-50%, -50%) scale(2)';
    if (follower) {
      follower.style.width = '60px';
      follower.style.height = '60px';
      follower.style.borderColor = 'rgba(212,175,55,0.6)';
    }
  });
  el.addEventListener('mouseleave', () => {
    if (cursor) cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    if (follower) {
      follower.style.width = '36px';
      follower.style.height = '36px';
      follower.style.borderColor = 'rgba(212,175,55,0.4)';
    }
  });
});

// ——— NAVBAR SCROLL ———
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// ——— HAMBURGER MENU ———
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  if (navLinks.classList.contains('open')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  }
});

navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  });
});

// ——— HERO PARTICLES ———
const particlesContainer = document.getElementById('particles');
function createParticle() {
  const p = document.createElement('div');
  p.className = 'particle';
  p.style.left = Math.random() * 100 + 'vw';
  p.style.animationDuration = (Math.random() * 8 + 6) + 's';
  p.style.animationDelay = (Math.random() * 4) + 's';
  p.style.width = (Math.random() * 3 + 1) + 'px';
  p.style.height = p.style.width;
  particlesContainer.appendChild(p);
  setTimeout(() => p.remove(), 15000);
}
setInterval(createParticle, 400);
for (let i = 0; i < 15; i++) createParticle();

// ——— COUNTER ANIMATION ———
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      el.textContent = target;
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(current);
    }
  }, 16);
}

// ——— SCROLL REVEAL ———
function revealOnScroll() {
  const elements = document.querySelectorAll(
    '.equip-card, .service-card, .feature-item, .contact-item, .about-text, .about-visual, .section-tag, .section-title'
  );
  elements.forEach(el => {
    el.classList.add('reveal');
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  elements.forEach(el => observer.observe(el));

  // Counter observer
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        document.querySelectorAll('.stat-num').forEach(animateCounter);
        counterObserver.disconnect();
      }
    });
  }, { threshold: 0.5 });

  const statsEl = document.querySelector('.hero-stats');
  if (statsEl) counterObserver.observe(statsEl);

  // Stagger equip cards
  document.querySelectorAll('.equip-card').forEach((card, i) => {
    card.style.transitionDelay = (i * 0.08) + 's';
  });
}

// ——— SMOOTH SCROLL ———
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const navH = navbar.offsetHeight;
      const top = target.getBoundingClientRect().top + window.pageYOffset - navH;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ——— ACTIVE NAV ON SCROLL ———
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    const sTop = s.offsetTop - navbar.offsetHeight - 100;
    if (window.scrollY >= sTop) current = s.id;
  });
  navItems.forEach(a => {
    a.style.color = '';
    if (a.getAttribute('href') === '#' + current) {
      a.style.color = '#D4AF37';
    }
  });
});

// ——— GALLERY HOVER ———
document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('mouseenter', () => {
    document.querySelectorAll('.gallery-item').forEach(other => {
      if (other !== item) other.style.opacity = '0.5';
    });
  });
  item.addEventListener('mouseleave', () => {
    document.querySelectorAll('.gallery-item').forEach(other => {
      other.style.opacity = '1';
    });
  });
});

// ——— EQUIPMENT CARD TILT ———
document.querySelectorAll('.equip-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -10;
    card.style.transform = `translateY(-4px) perspective(500px) rotateX(${y}deg) rotateY(${x}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ——— INIT ———
document.addEventListener('DOMContentLoaded', () => {
  revealOnScroll();
  for (let i = 0; i < 20; i++) setTimeout(createParticle, i * 100);
});

// ——— PAGE LOAD ANIMATION ———
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  requestAnimationFrame(() => {
    document.body.style.opacity = '1';
  });

  // FIX 2 — Only ONE form submit listener (WhatsApp version), duplicate removed
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const name = document.getElementById('name').value;
      const phone = document.getElementById('phone').value;
      const interest = document.getElementById('interest').value;
      const message = document.getElementById('message').value;

      const text = `*New Enquiry – Sterling Gym*%0AName: ${name}%0APhone: ${phone}%0AInterest: ${interest}%0AMessage: ${message}`;

      window.open(`https://wa.me/919136125454?text=${text}`, '_blank');

      formSuccess.classList.add('show');
      contactForm.reset();
      setTimeout(() => formSuccess.classList.remove('show'), 5000);
    });
  }
});
