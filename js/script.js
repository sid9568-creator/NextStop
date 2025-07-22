// Custom JavaScript for NextStop Travel Agency Website

// Initialize AOS (Animate On Scroll) when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS animations
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });

    // Initialize all JavaScript functionality
    initializeNavigation();
    initializeBackToTop();
    initializePackageCards();
    initializeReviewsCarousel();
    initializeWhatsAppLinks();
    initializeSmoothScrolling();
});

// Navigation functionality
function initializeNavigation() {
    const navbar = document.querySelector('.custom-navbar');
    
    // Change navbar appearance on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 25px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
    });

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                bsCollapse.hide();
            }
        });
    });
}

// Back to top button functionality
function initializeBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    // Show/hide back to top button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    // Scroll to top when button is clicked
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Package cards hover effects and interactions
function initializePackageCards() {
    const packageCards = document.querySelectorAll('.package-card');
    
    packageCards.forEach(card => {
        // Add hover effect for better interactivity
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)';
        });
    });
    
    // Handle PDF download links with analytics tracking (if needed)
    const downloadLinks = document.querySelectorAll('a[href$=".pdf"]');
    downloadLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const packageName = this.getAttribute('href').split('/').pop().replace('.pdf', '');
            console.log(`Itinerary downloaded: ${packageName}`);
            
            // You can add analytics tracking here
            // gtag('event', 'download', { 'package': packageName });
        });
    });
}

// Reviews carousel enhancements
function initializeReviewsCarousel() {
    const reviewsCarousel = document.getElementById('reviewsCarousel');
    
    if (reviewsCarousel) {
        // Add pause on hover
        reviewsCarousel.addEventListener('mouseenter', function() {
            const carousel = bootstrap.Carousel.getInstance(this);
            if (carousel) {
                carousel.pause();
            }
        });
        
        reviewsCarousel.addEventListener('mouseleave', function() {
            const carousel = bootstrap.Carousel.getInstance(this);
            if (carousel) {
                carousel.cycle();
            }
        });
    }
}

// WhatsApp integration enhancements
function initializeWhatsAppLinks() {
    const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');
    
    whatsappLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Track WhatsApp clicks for analytics
            const packageName = this.textContent.includes('Book Now') ? 
                this.closest('.package-card').querySelector('.package-title').textContent : 
                'General Inquiry';
            
            console.log(`WhatsApp inquiry: ${packageName}`);
            
            // Add a small delay to ensure tracking
            setTimeout(() => {
                // Link will naturally open due to default behavior
            }, 100);
        });
    });
}

// Smooth scrolling for navigation links
function initializeSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                e.preventDefault();
                
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Hero carousel enhancements
function enhanceHeroCarousel() {
    const heroCarousel = document.getElementById('heroCarousel');
    
    if (heroCarousel) {
        const carousel = new bootstrap.Carousel(heroCarousel, {
            interval: 4000,
            wrap: true,
            touch: true
        });
        
        // Add keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowLeft') {
                carousel.prev();
            } else if (e.key === 'ArrowRight') {
                carousel.next();
            }
        });
    }
}

// Form validation (if contact forms are added in future)
function validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.classList.add('is-invalid');
            isValid = false;
        } else {
            field.classList.remove('is-invalid');
            field.classList.add('is-valid');
        }
    });
    
    return isValid;
}

// Lazy loading for images (performance optimization)
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Performance optimization: Debounce function for scroll events
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

// Loading animation (can be used when adding dynamic content)
function showLoading(element) {
    element.innerHTML = `
        <div class="text-center p-4">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            <p class="mt-2 text-muted">Loading content...</p>
        </div>
    `;
}

// Success/Error message display
function showMessage(message, type = 'success') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    alertDiv.style.cssText = 'top: 100px; right: 20px; z-index: 9999; min-width: 300px;';
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(alertDiv);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.remove();
        }
    }, 5000);
}

// Device detection for responsive enhancements
function getDeviceType() {
    const userAgent = navigator.userAgent.toLowerCase();
    const isMobile = /iphone|ipod|android|blackberry|windows phone|webos/i.test(userAgent);
    const isTablet = /ipad|android/i.test(userAgent) && !/mobile/i.test(userAgent);
    
    if (isMobile) return 'mobile';
    if (isTablet) return 'tablet';
    return 'desktop';
}

// Initialize device-specific enhancements
document.addEventListener('DOMContentLoaded', function() {
    const deviceType = getDeviceType();
    document.body.classList.add(`device-${deviceType}`);
    
    if (deviceType === 'mobile') {
        // Mobile-specific enhancements
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            heroSection.style.height = '100vh'; // Ensure full viewport height on mobile
        }
    }
});

// Social media sharing functions (for future use)
function shareOnSocialMedia(platform, url, text) {
    const shareUrls = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
        twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
        whatsapp: `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`
    };
    
    if (shareUrls[platform]) {
        window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
}

// Local storage utilities for user preferences
function saveUserPreference(key, value) {
    try {
        localStorage.setItem(`nextstop_${key}`, JSON.stringify(value));
    } catch (e) {
        console.log('LocalStorage not available:', e);
    }
}

function getUserPreference(key, defaultValue = null) {
    try {
        const value = localStorage.getItem(`nextstop_${key}`);
        return value ? JSON.parse(value) : defaultValue;
    } catch (e) {
        console.log('LocalStorage not available:', e);
        return defaultValue;
    }
}

// Cookie consent (GDPR compliance for future use)
function initializeCookieConsent() {
    const cookieConsent = getUserPreference('cookie_consent', false);
    
    if (!cookieConsent) {
        const consentBanner = document.createElement('div');
        consentBanner.className = 'cookie-consent-banner position-fixed bottom-0 start-0 end-0 bg-dark text-white p-3 z-index-high';
        consentBanner.innerHTML = `
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-md-8">
                        <p class="mb-0">We use cookies to enhance your browsing experience. By continuing to use our site, you agree to our use of cookies.</p>
                    </div>
                    <div class="col-md-4 text-end">
                        <button class="btn btn-primary btn-sm" onclick="acceptCookies()">Accept</button>
                        <button class="btn btn-outline-light btn-sm ms-2" onclick="declineCookies()">Decline</button>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(consentBanner);
    }
}

function acceptCookies() {
    saveUserPreference('cookie_consent', true);
    document.querySelector('.cookie-consent-banner').remove();
}

function declineCookies() {
    saveUserPreference('cookie_consent', false);
    document.querySelector('.cookie-consent-banner').remove();
}

// Error handling for external resources
window.addEventListener('error', function(e) {
    if (e.target.tagName === 'IMG') {
        console.log('Image failed to load:', e.target.src);
        // Replace with placeholder or handle gracefully
        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiNGM0Y0RjYiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzlDQTNBRiI+SW1hZ2UgTm90IEF2YWlsYWJsZTwvdGV4dD48L3N2Zz4=';
    }
});

// Console welcome message
console.log(`
🏔️  NextStop Travel Agency
🙏 Your Journey Begins Here
📱 WhatsApp: +91 98765 43210
🌐 Built with ❤️ in Rishikesh
`);
