/* === jase.me — script.js === */

// Nav: add 'scrolled' class on scroll
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// Mobile hamburger menu
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// Animated counter — counts up to data-target value
function animateCounter(el) {
    const target    = parseInt(el.dataset.target, 10);
    const duration  = 1400;
    const frameRate = 16;
    const steps     = duration / frameRate;
    const increment = target / steps;
    let current     = 0;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            el.textContent = target.toLocaleString();
            clearInterval(timer);
        } else {
            el.textContent = Math.floor(current).toLocaleString();
        }
    }, frameRate);
}

// Trigger counters when hero stats strip scrolls into view
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelectorAll('.count').forEach(animateCounter);
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.4 });

document.querySelectorAll('.hero-lower').forEach(el => counterObserver.observe(el));

// Fade-in on scroll
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const delay = parseInt(entry.target.dataset.delay || 0, 10);
            setTimeout(() => entry.target.classList.add('visible'), delay);
            fadeObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

// Correct class names matching Design 3 HTML
const fadeTargets = [
    '.service-card',      // services grid
    '.work-item',         // case study rows
    '.cred',              // about credentials
    '.contact-method',    // contact tiles
    '.article-card',      // thought leadership
    '.about-right',       // about text column
    '.about-left',        // about photo column
];

fadeTargets.forEach(selector => {
    document.querySelectorAll(selector).forEach((el, i) => {
        el.classList.add('fade-in');
        el.dataset.delay = i * 75;
        fadeObserver.observe(el);
    });
});
