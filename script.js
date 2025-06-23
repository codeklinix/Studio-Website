// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(0, 0, 0, 0.98)';
        } else {
            navbar.style.background = 'rgba(0, 0, 0, 0.95)';
        }
    });
    
    // Form submission
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.innerHTML = '<span class="loading"></span> Sending...';
            submitBtn.disabled = true;
            
            // GitHub Pages form handling - collect form data and show message
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const service = formData.get('service');
            
            setTimeout(() => {
                alert(`Thank you ${name}! Your ${service} booking inquiry has been received. Please call (615) 555-0123 or email info@soundwavestudios.com to confirm your session.`);
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Add fade-in class to elements and observe them
    const elementsToAnimate = document.querySelectorAll('.service-card, .portfolio-item, .contact-item, .about-text, .about-image');
    elementsToAnimate.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
    
    // Counter animation for stats
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        function updateCounter() {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start) + '+';
                requestAnimationFrame(updateCounter);
            } else {
                if (target === 3) {
                    element.textContent = target; // No + for Grammy nominations
                } else {
                    element.textContent = target + '+';
                }
            }
        }
        
        updateCounter();
    }
    
    // Animate stats when they come into view
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statElements = entry.target.querySelectorAll('.stat h3');
                statElements.forEach((stat, index) => {
                    const targets = [500, 15, 3]; // Albums, Years, Grammy nominations
                    setTimeout(() => {
                        animateCounter(stat, targets[index]);
                    }, index * 300);
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
    
    // Audio player controls
    const audioElements = document.querySelectorAll('audio');
    audioElements.forEach(audio => {
        audio.addEventListener('play', function() {
            // Pause other audio elements when one starts playing
            audioElements.forEach(otherAudio => {
                if (otherAudio !== this) {
                    otherAudio.pause();
                }
            });
        });
    });
    
    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroContent = document.querySelector('.hero-content');
        const heroImage = document.querySelector('.hero-image');
        
        if (heroContent && heroImage) {
            const speed = scrolled * 0.5;
            heroContent.style.transform = `translateY(${speed}px)`;
            heroImage.style.transform = `translateY(${speed * 0.3}px)`;
        }
    });
    
    // Service card hover effects
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Portfolio item click to play audio
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach(item => {
        item.addEventListener('click', function() {
            const audio = this.querySelector('audio');
            if (audio) {
                if (audio.paused) {
                    audio.play();
                } else {
                    audio.pause();
                }
            }
        });
    });
    
    // Form validation
    const inputs = document.querySelectorAll('input[required], select[required]');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (!this.value.trim()) {
                this.style.borderLeft = '4px solid #e74c3c';
            } else {
                this.style.borderLeft = '4px solid #2ecc71';
            }
        });
        
        input.addEventListener('input', function() {
            if (this.value.trim()) {
                this.style.borderLeft = '4px solid #2ecc71';
            }
        });
    });
    
    // Email validation
    const emailInput = document.getElementById('email');
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (this.value && !emailRegex.test(this.value)) {
                this.style.borderLeft = '4px solid #e74c3c';
                this.setCustomValidity('Please enter a valid email address');
            } else if (this.value) {
                this.style.borderLeft = '4px solid #2ecc71';
                this.setCustomValidity('');
            }
        });
    }
    
    // Smooth reveal of elements on scroll
    function revealOnScroll() {
        const reveals = document.querySelectorAll('.fade-in:not(.visible)');
        
        for (let i = 0; i < reveals.length; i++) {
            const windowHeight = window.innerHeight;
            const elementTop = reveals[i].getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < windowHeight - elementVisible) {
                reveals[i].classList.add('visible');
            }
        }
    }
    
    window.addEventListener('scroll', revealOnScroll);
    
    // Initialize page
    revealOnScroll();
    
    // Preload critical images
    const criticalImages = [
        'assets/studio-photo.svg',
        'assets/album1.svg',
        'assets/album2.svg',
        'assets/album3.svg'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
    
    // Service price calculator (example functionality)
    function calculatePrice() {
        const service = document.getElementById('service').value;
        const prices = {
            'recording': 75,
            'mixing': 200,
            'mastering': 100,
            'production': 'custom',
            'videography': 500,
            'photoshoot': 200
        };
        
        // This could be expanded to show estimated pricing
        if (service && prices[service] !== 'custom') {
            console.log(`Estimated price: $${prices[service]} per hour/song`);
        }
    }
    
    const serviceSelect = document.getElementById('service');
    if (serviceSelect) {
        serviceSelect.addEventListener('change', calculatePrice);
    }
    
    // Add loading states for better UX
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Initialize any third-party plugins here
        console.log('SoundWave Studios website loaded successfully!');
    });
});

// Utility functions
function formatPhoneNumber(phoneNumber) {
    const cleaned = phoneNumber.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
    return phoneNumber;
}

// Phone number formatting
const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('input', function() {
        this.value = formatPhoneNumber(this.value);
    });
}

// Add to calendar functionality (placeholder)
function addToCalendar(date, service) {
    // This would integrate with calendar APIs
    console.log(`Adding ${service} session on ${date} to calendar`);
}

// Social media sharing (placeholder)
function shareOnSocial(platform, url, text) {
    const shareUrls = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
        twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
    };
    
    if (shareUrls[platform]) {
        window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
}

// Dark mode toggle (optional feature)
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

// Load dark mode preference
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}
