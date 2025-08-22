// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initTypewriter();
    initScrollAnimations();
    initCounters();
    initSkillBars();
    initContactForm();
    initMobileMenu();
    initParticles();

    // Add initial animations
    setTimeout(() => {
        const elementsToAnimate = document.querySelectorAll('.stat-card, .skill-category, .experience-card, .project-card');
        elementsToAnimate.forEach((element, index) => {
            element.classList.add('fade-in');
            setTimeout(() => {
                element.classList.add('visible');
            }, index * 200);
        });
    }, 1000);
});

// Navigation functionality - Fixed
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');

    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);

                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });

                    // Close mobile menu if open
                    const navMenu = document.getElementById('nav-menu');
                    const hamburger = document.getElementById('hamburger');
                    if (navMenu && hamburger) {
                        navMenu.classList.remove('active');
                        hamburger.classList.remove('active');
                    }
                }
            }
        });
    });

    // Update active nav link on scroll
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        let currentSection = '';
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            const linkSection = link.getAttribute('data-section') || link.getAttribute('href') ? .substring(1);
            if (linkSection === currentSection) {
                link.classList.add('active');
            }
        });

        // Add background to navbar on scroll
        const navbar = document.getElementById('navbar');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            } else {
                navbar.style.background = 'rgba(10, 10, 10, 0.9)';
            }
        }
    });
}

// Typewriter effect for hero section
function initTypewriter() {
    const typewriterElement = document.getElementById('typewriter');
    if (!typewriterElement) return;

    const texts = [
        'Java Backend Developer',
        'Spring Boot Specialist',
        'Microservices Developer',
    ];

    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        const currentText = texts[textIndex];

        if (isDeleting) {
            typewriterElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            typewriterElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }

        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500; // Pause before next text
        }

        setTimeout(type, typeSpeed);
    }

    // Start typewriter effect
    setTimeout(type, 1000);
}

// Scroll-based animations - Fixed
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // Trigger skill bars animation when skills section is visible
                if (entry.target.classList.contains('skills-section')) {
                    setTimeout(() => animateSkillBars(), 500);
                }

                // Trigger counters animation when about section is visible
                if (entry.target.classList.contains('about-section')) {
                    setTimeout(() => animateCounters(), 500);
                }
            }
        });
    }, observerOptions);

    // Observe sections for animation
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });

    // Observe individual elements
    const animatedElements = document.querySelectorAll('.stat-card, .skill-category, .experience-card, .project-card');
    animatedElements.forEach((element, index) => {
        element.classList.add('fade-in');
        element.style.animationDelay = `${index * 0.1}s`;
        observer.observe(element);
    });
}

// Animated counters for statistics - Fixed
function initCounters() {
    // Animation will be triggered by scroll observer
}

function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');

    counters.forEach(counter => {
        if (counter.classList.contains('animated')) return; // Prevent re-animation
        counter.classList.add('animated');

        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;

        const updateCounter = () => {
            current += increment;

            if (current < target) {
                if (target === 500) {
                    counter.textContent = Math.floor(current) + 'M+';
                } else if (target === 99) {
                    counter.textContent = Math.floor(current) + '.9%';
                } else {
                    counter.textContent = Math.floor(current) + '+';
                }
                requestAnimationFrame(updateCounter);
            } else {
                // Final values
                if (target === 500) {
                    counter.textContent = '500M+';
                } else if (target === 99) {
                    counter.textContent = '99.9%';
                } else {
                    counter.textContent = target + '+';
                }
            }
        };

        updateCounter();
    });
}

// Animated skill bars - Fixed
function initSkillBars() {
    // Animation will be triggered by scroll observer
}

function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');

    skillBars.forEach((bar, index) => {
        if (bar.classList.contains('animated')) return; // Prevent re-animation
        bar.classList.add('animated');

        setTimeout(() => {
            const width = bar.getAttribute('data-width');
            bar.style.width = width + '%';
        }, index * 100);
    });
}

// Contact form functionality - Fixed
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const formStatus = document.getElementById('formStatus');

    // Form validation
    function validateField(field, errorId, validationFn, errorMessage) {
        const errorElement = document.getElementById(errorId);
        if (!errorElement) return true;

        if (!validationFn(field.value)) {
            errorElement.textContent = errorMessage;
            field.classList.add('error');
            return false;
        } else {
            errorElement.textContent = '';
            field.classList.remove('error');
            return true;
        }
    }

    function validateForm() {
        let isValid = true;

        // Validate name
        isValid &= validateField(nameInput, 'nameError',
            (value) => value.trim().length >= 2,
            'Name must be at least 2 characters long');

        // Validate email
        isValid &= validateField(emailInput, 'emailError',
            (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
            'Please enter a valid email address');

        // Validate message
        isValid &= validateField(messageInput, 'messageError',
            (value) => value.trim().length >= 10,
            'Message must be at least 10 characters long');

        return Boolean(isValid);
    }

    // Real-time validation
    [nameInput, emailInput, messageInput].forEach(input => {
        if (!input) return;

        input.addEventListener('input', function() {
            const errorId = this.id + 'Error';
            const errorElement = document.getElementById(errorId);
            if (errorElement && errorElement.textContent) {
                // Re-validate if there was an error
                validateForm();
            }
        });

        input.addEventListener('blur', validateForm);
    });

    // Handle form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        if (validateForm()) {
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;

            // Show loading state
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            // Simulate form submission
            setTimeout(() => {
                if (formStatus) {
                    formStatus.className = 'form-status success';
                    formStatus.textContent = 'Thank you! Your message has been sent successfully.';
                    formStatus.style.display = 'block';
                }

                // Reset form
                form.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;

                // Hide status after 5 seconds
                setTimeout(() => {
                    if (formStatus) {
                        formStatus.style.display = 'none';
                    }
                }, 5000);
            }, 2000);
        } else {
            if (formStatus) {
                formStatus.className = 'form-status error';
                formStatus.textContent = 'Please correct the errors above and try again.';
                formStatus.style.display = 'block';

                setTimeout(() => {
                    formStatus.style.display = 'none';
                }, 5000);
            }
        }
    });
}

// Mobile menu functionality - Fixed
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    if (!hamburger || !navMenu) return;

    hamburger.addEventListener('click', function(e) {
        e.stopPropagation();
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');

        // Animate hamburger bars
        const spans = hamburger.querySelectorAll('span');
        if (hamburger.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');

            // Reset hamburger animation
            const spans = hamburger.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');

            // Reset hamburger animation
            const spans = hamburger.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
}

// Initialize particles animation
function initParticles() {
    const particlesContainer = document.querySelector('.hero-particles');
    if (!particlesContainer) return;

    // Create floating particles
    for (let i = 0; i < 30; i++) {
        setTimeout(() => createParticle(particlesContainer), i * 200);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';

    // Particle styles
    const size = Math.random() * 3 + 1;
    particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: ${Math.random() > 0.5 ? '#00ff88' : '#0ea5e9'};
        border-radius: 50%;
        opacity: ${Math.random() * 0.5 + 0.1};
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        pointer-events: none;
        animation: particleFloat ${Math.random() * 20 + 10}s linear infinite;
        animation-delay: ${Math.random() * 5}s;
    `;

    container.appendChild(particle);

    // Remove particle after animation
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
            // Create a new one to maintain count
            setTimeout(() => createParticle(container), Math.random() * 5000);
        }
    }, 25000);
}

// Utility functions
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
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

// Apply throttling to scroll events for performance
const throttledScrollHandler = throttle(function() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-particles');

    parallaxElements.forEach(element => {
        const speed = 0.1;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
}, 16);

window.addEventListener('scroll', throttledScrollHandler);

// Loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');

    // Trigger initial animations
    setTimeout(() => {
        const heroElements = document.querySelectorAll('.hero-text > *');
        heroElements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'all 0.6s ease-out';

            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }, 500);
});

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const navMenu = document.getElementById('nav-menu');
        const hamburger = document.getElementById('hamburger');

        if (navMenu && hamburger) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');

            const spans = hamburger.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    }
});

// Handle window resize for responsive adjustments
let resizeTimeout;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function() {
        const navMenu = document.getElementById('nav-menu');
        const hamburger = document.getElementById('hamburger');

        if (window.innerWidth > 768 && navMenu && hamburger) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');

            const spans = hamburger.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    }, 250);
});

// Add particle animation keyframes via JavaScript
const style = document.createElement('style');
style.textContent = `
    @keyframes particleFloat {
        0% {
            transform: translateY(100vh) rotateX(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100px) rotateX(360deg);
            opacity: 0;
        }
    }
    
    .form-control.error {
        border-color: #ff6b6b;
        box-shadow: 0 0 0 3px rgba(255, 107, 107, 0.1);
    }
`;
document.head.appendChild(style);

// Export functions for potential external use
window.portfolioApp = {
    scrollToSection,
    initTypewriter,
    animateCounters,
    animateSkillBars
};