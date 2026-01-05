/* =========================================
   Michael Kariuki Portfolio - JavaScript
   ========================================= */

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    initMobileNav();
    
    // Header Scroll Effect
    initHeaderScroll();
    
    // Scroll Animations
    initScrollAnimations();
    
    // Contact Form
    initContactForm();
    
    // Smooth Scroll for Anchor Links
    initSmoothScroll();
});

/* =========================================
   Mobile Navigation
   ========================================= */
function initMobileNav() {
    const navToggle = document.getElementById('navToggle');
    const nav = document.getElementById('nav');
    
    if (!navToggle || !nav) return;
    
    navToggle.addEventListener('click', function() {
        nav.classList.toggle('active');
        this.classList.toggle('active');
        
        // Animate hamburger to X
        const hamburger = this.querySelector('.hamburger');
        if (nav.classList.contains('active')) {
            hamburger.style.background = 'transparent';
            hamburger.style.transform = 'rotate(45deg)';
        } else {
            hamburger.style.background = '';
            hamburger.style.transform = '';
        }
    });
    
    // Close nav when clicking a link
    const navLinks = nav.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
    
    // Close nav when clicking outside
    document.addEventListener('click', function(e) {
        if (!nav.contains(e.target) && !navToggle.contains(e.target)) {
            nav.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
}

/* =========================================
   Header Scroll Effect
   ========================================= */
function initHeaderScroll() {
    const header = document.querySelector('.header');
    if (!header) return;
    
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // Add shadow on scroll
        if (currentScroll > 50) {
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = '';
        }
        
        lastScroll = currentScroll;
    });
}

/* =========================================
   Scroll Animations
   ========================================= */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-fade-up');
    
    if (!animatedElements.length) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(el => {
        el.style.animationPlayState = 'paused';
        observer.observe(el);
    });
}

/* =========================================
   Contact Form
   ========================================= */
function initContactForm() {
    const form = document.getElementById('contactForm');
    const whatsappBtn = document.getElementById('whatsappBtn');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(form);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Validate form
            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            // Simulate form submission
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
                form.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
    
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', function() {
            const name = document.getElementById('name').value || '';
            const subject = document.getElementById('subject').value || 'General Inquiry';
            const message = document.getElementById('message').value || '';
            
            const whatsappMessage = `Hello Michael! My name is ${name}.\n\nSubject: ${subject}\n\n${message}`;
            const encodedMessage = encodeURIComponent(whatsappMessage);
            const phoneNumber = '254700000000'; // Replace with actual number
            
            window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
        });
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type) {
    // Remove existing notifications
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 16px 24px;
        background: ${type === 'success' ? '#14b8a6' : '#ef4444'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        display: flex;
        align-items: center;
        gap: 12px;
        z-index: 9999;
        animation: slideIn 0.3s ease;
    `;
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // Close button
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

/* =========================================
   Smooth Scroll
   ========================================= */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* =========================================
   Utility Functions
   ========================================= */

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

// Throttle function for frequent events
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}
