// ===================================
// SMOOTH SCROLLING FOR NAVIGATION LINKS
// ===================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - navHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            if (window.innerWidth <= 768) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        }
    });
});

// ===================================
// NAVBAR SCROLL EFFECT
// ===================================

const navbar = document.getElementById('navbar');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Add scrolled class when page is scrolled
    if (scrollTop > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScrollTop = scrollTop;
});

// ===================================
// MOBILE NAVIGATION TOGGLE
// ===================================

const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
});

// ===================================
// SCROLL ANIMATIONS
// ===================================

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all elements with animate-on-scroll class
document.querySelectorAll('.animate-on-scroll').forEach(element => {
    observer.observe(element);
});

// ===================================
// WHATSAPP BUTTON INTERACTIONS
// ===================================

const whatsappButtons = document.querySelectorAll('.btn-whatsapp');

whatsappButtons.forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) scale(1.02)';
    });

    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ===================================
// PARALLAX EFFECT FOR HERO & CTA
// ===================================

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const cta = document.querySelector('.cta');

    if (hero) {
        hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
    }

    if (cta) {
        const ctaOffset = cta.offsetTop;
        if (scrolled > ctaOffset - window.innerHeight) {
            cta.style.backgroundPositionY = (scrolled - ctaOffset) * 0.3 + 'px';
        }
    }
});

// ===================================
// ACTIVE NAVIGATION LINK HIGHLIGHTING
// ===================================

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.pageYOffset + 200;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ===================================
// COUNTER ANIMATION FOR STATS
// ===================================

const animateCounter = (element, target, duration) => {
    let start = 0;
    const increment = target / (duration / 16); // 60 FPS

    const updateCounter = () => {
        start += increment;
        if (start < target) {
            element.textContent = '+' + Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = '+' + target;
        }
    };

    updateCounter();
};

// Observe stats section for counter animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const target = parseInt(stat.textContent.replace('+', ''));
                animateCounter(stat, target, 2000);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats-grid');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// ===================================
// HOVER EFFECTS FOR SERVICE CARDS
// ===================================

const serviceCards = document.querySelectorAll('.service-card');

serviceCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.zIndex = '10';
    });

    card.addEventListener('mouseleave', function() {
        this.style.zIndex = '1';
    });
});

// ===================================
// PRICING CARD INTERACTIONS
// ===================================

const pricingCards = document.querySelectorAll('.pricing-card');

pricingCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        // Slightly scale down other cards
        pricingCards.forEach(otherCard => {
            if (otherCard !== this && !otherCard.classList.contains('featured')) {
                otherCard.style.opacity = '0.7';
                otherCard.style.transform = 'scale(0.95)';
            }
        });
    });

    card.addEventListener('mouseleave', function() {
        // Reset all cards
        pricingCards.forEach(otherCard => {
            if (!otherCard.classList.contains('featured')) {
                otherCard.style.opacity = '1';
                otherCard.style.transform = 'scale(1)';
            }
        });
    });
});

// ===================================
// RESULT CARDS HOVER ANIMATION
// ===================================

const resultCards = document.querySelectorAll('.result-card');

resultCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        const images = this.querySelectorAll('.result-image');
        images.forEach((img, index) => {
            setTimeout(() => {
                img.style.transform = 'scale(1.05)';
                img.style.transition = 'transform 0.3s ease';
            }, index * 100);
        });
    });

    card.addEventListener('mouseleave', function() {
        const images = this.querySelectorAll('.result-image');
        images.forEach(img => {
            img.style.transform = 'scale(1)';
        });
    });
});

// ===================================
// TESTIMONIAL CARDS ANIMATION
// ===================================

const testimonialCards = document.querySelectorAll('.testimonial-card');

testimonialCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
});

// ===================================
// SCROLL TO TOP FUNCTIONALITY
// ===================================

// Create scroll to top button
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '↑';
scrollTopBtn.className = 'scroll-top-btn';
scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background-color: #E10600;
    color: #F5F5F5;
    border: none;
    border-radius: 50%;
    font-size: 1.5rem;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 999;
    box-shadow: 0 5px 20px rgba(225, 6, 0, 0.3);
`;

document.body.appendChild(scrollTopBtn);

// Show/hide scroll to top button
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
        scrollTopBtn.style.opacity = '1';
        scrollTopBtn.style.visibility = 'visible';
    } else {
        scrollTopBtn.style.opacity = '0';
        scrollTopBtn.style.visibility = 'hidden';
    }
});

// Scroll to top on click
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Hover effect for scroll to top button
scrollTopBtn.addEventListener('mouseenter', function() {
    this.style.backgroundColor = '#8B0000';
    this.style.transform = 'translateY(-5px)';
});

scrollTopBtn.addEventListener('mouseleave', function() {
    this.style.backgroundColor = '#E10600';
    this.style.transform = 'translateY(0)';
});

// ===================================
// LOADING ANIMATION
// ===================================

window.addEventListener('load', () => {
    // Remove any loading screen if it exists
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }

    // Trigger initial animations
    document.body.style.opacity = '1';
});

// ===================================
// PERFORMANCE OPTIMIZATION
// ===================================

// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll-heavy operations
const debouncedScroll = debounce(() => {
    // Heavy scroll operations here
}, 100);

window.addEventListener('scroll', debouncedScroll);

// ===================================
// CONSOLE MESSAGE
// ===================================

console.log('%c🔥 LUCIANO CORREIA - PERSONAL TRAINER 🔥', 'color: #E10600; font-size: 20px; font-weight: bold;');
console.log('%cTransforme seu corpo. Maximize sua performance.', 'color: #F5F5F5; font-size: 14px;');
