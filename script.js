// Language Toggle
const langToggle = document.getElementById('langToggle');
const htmlEl = document.documentElement;

// Load saved language or default to English
const savedLang = localStorage.getItem('lang') || 'en';
htmlEl.className = savedLang;
htmlEl.lang = savedLang === 'ko' ? 'ko' : 'en';

// Update translatable option texts based on current language
function updateOptionLangs(lang) {
    document.querySelectorAll('option[data-ko][data-en]').forEach(opt => {
        opt.textContent = opt.getAttribute('data-' + lang);
    });
}

// Apply on initial load
updateOptionLangs(savedLang);

if (langToggle) {
    langToggle.addEventListener('click', () => {
        const currentLang = htmlEl.classList.contains('ko') ? 'ko' : 'en';
        const newLang = currentLang === 'ko' ? 'en' : 'ko';
        htmlEl.className = newLang;
        htmlEl.lang = newLang === 'ko' ? 'ko' : 'en';
        localStorage.setItem('lang', newLang);
        updateOptionLangs(newLang);
    });
}

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');

        // Animate hamburger
        hamburger.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 90;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Header Scroll Effect
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        header.style.background = 'rgba(68, 96, 132, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = 'var(--header-bg)';
        header.style.backdropFilter = 'none';
    }

    lastScroll = currentScroll;
});

// Contact form is now handled by MS Forms embed + Power Automate

// Service Card Expand/Collapse
document.querySelectorAll('.service-card[data-expandable]').forEach(card => {
    card.addEventListener('click', () => {
        // Close all other cards
        document.querySelectorAll('.service-card.expanded').forEach(openCard => {
            if (openCard !== card) {
                openCard.classList.remove('expanded');
            }
        });
        card.classList.toggle('expanded');
    });
});

// Scroll Animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
const animateElements = document.querySelectorAll('.service-card, .industry-card, .pricing-card');
animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Counter Animation for Trust Banner
const counters = document.querySelectorAll('.trust-item h3');
const counterSpeed = 200;

const animateCounter = (counter) => {
    // Skip elements with language spans to preserve toggle
    if (counter.querySelector('.ko, .en')) return;

    const target = counter.textContent;
    const isNumber = !isNaN(parseInt(target));

    if (isNumber) {
        const updateCount = () => {
            const count = +counter.getAttribute('data-count') || 0;
            const targetNum = parseInt(target);
            const increment = targetNum / counterSpeed;

            if (count < targetNum) {
                counter.setAttribute('data-count', Math.ceil(count + increment));
                counter.textContent = Math.ceil(count + increment) + '+';
                setTimeout(updateCount, 1);
            } else {
                counter.textContent = target;
            }
        };

        updateCount();
    }
};

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            animateCounter(entry.target);
            entry.target.classList.add('counted');
        }
    });
}, { threshold: 0.5 });

counters.forEach(counter => counterObserver.observe(counter));