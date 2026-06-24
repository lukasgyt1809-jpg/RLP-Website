// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    });
}

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu after click
            if (navLinks) {
                navLinks.style.display = 'none';
            }
        }
    });
});

// Add scroll animation for elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all feature cards and job cards
document.querySelectorAll('.feature-card, .job-card, .contact-card').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// Add scroll event for navbar
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > lastScroll) {
        // Scrolling down
        navbar.style.boxShadow = '0 4px 20px rgba(0, 212, 255, 0.2)';
    } else {
        // Scrolling up
        navbar.style.boxShadow = '0 2px 10px rgba(0, 212, 255, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
}

// Observe stat elements
const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const h4 = entry.target.querySelector('h4');
            if (h4 && !h4.dataset.animated) {
                h4.dataset.animated = true;
                const text = h4.textContent;
                
                // Only animate numbers
                if (!isNaN(text) && text !== '∞') {
                    animateCounter(h4, parseInt(text));
                }
            }
            statObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat').forEach(stat => {
    statObserver.observe(stat);
});

// Add parallax effect to hero section
const hero = document.querySelector('.hero');
if (hero) {
    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        hero.style.backgroundPosition = `0 ${scrollPosition * 0.5}px`;
    });
}

// Prevent body scroll when mobile menu is open
function toggleBodyScroll(disabled) {
    if (disabled) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
}

if (hamburger) {
    hamburger.addEventListener('click', () => {
        const isOpen = navLinks.style.display === 'flex';
        toggleBodyScroll(isOpen);
    });
}

// Loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Interactive button effects
document.querySelectorAll('.btn, .job-card a, .contact-card a').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// Console Easter Egg
console.log('%cWelcome to Real Life Project!', 'font-size: 20px; color: #00d4ff; font-weight: bold; text-shadow: 0 0 10px #00d4ff;');
console.log('%cJoin unseren Discord: https://discord.gg/pxBqrynn52', 'font-size: 14px; color: #00d4ff;');
console.log('%cHave fun on the server!', 'font-size: 12px; color: #00d4ff; font-style: italic;');