// Portfolio Website - Pure Vanilla JavaScript (No Dependencies)
console.log("Portfolio website loaded - Pure Vanilla JS Version");

document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM fully loaded");
    
    // Initialize all functions
    initNavigation();
    initTypewriter();
    initScrollAnimations();
    initSkillBars();
    initContactForm();
    initTiltEffect();
    initScrollProgress();
    initHeroAnimations();
});

// ============================================
// NAVIGATION
// ============================================

function initNavigation() {
    console.log("Initializing navigation...");
    
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (!hamburger || !navMenu) {
        console.warn("Navigation elements not found, skipping navigation setup");
        return;
    }
    
    console.log("Navigation elements found:", hamburger, navMenu);
    
    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        console.log("Hamburger clicked");
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            console.log("Navigating to:", targetId);
            
            if (targetId === '#home') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            } else {
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    const navbarHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = targetSection.offsetTop - navbarHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
            
            // Update active link
            navLinks.forEach(item => item.classList.remove('active'));
            this.classList.add('active');
            
            // Close mobile menu
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Update active link on scroll
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const scrollPosition = window.scrollY + 100;
        
        let currentSectionId = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
        
        // If at top, set home as active
        if (window.scrollY < 100) {
            const homeLink = document.querySelector('.nav-link[href="#home"]');
            if (homeLink) {
                navLinks.forEach(item => item.classList.remove('active'));
                homeLink.classList.add('active');
            }
        }
    });
}

// ============================================
// TYPEWRITER EFFECT
// ============================================

function initTypewriter() {
    const typewriterText = document.getElementById('typewriter');
    const taglineElement = document.querySelector('.typewriter-tagline');
    
    if (!typewriterText || !taglineElement) return;
    
    const name = "MUHAMMAD LABIB";
    let nameIndex = 0;
    
    function typeName() {
        if (nameIndex < name.length) {
            typewriterText.textContent += name.charAt(nameIndex);
            nameIndex++;
            setTimeout(typeName, 100);
        } else {
            setTimeout(typeTagline, 500);
        }
    }
    
    function typeTagline() {
        const taglines = ["Zenith Code", "Web Developer"];
        let taglineIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        
        function type() {
            const currentTagline = taglines[taglineIndex];
            
            if (isDeleting) {
                taglineElement.textContent = currentTagline.substring(0, charIndex - 1);
                charIndex--;
                
                if (charIndex === 0) {
                    isDeleting = false;
                    taglineIndex = (taglineIndex + 1) % taglines.length;
                    setTimeout(type, 500);
                } else {
                    setTimeout(type, 50);
                }
            } else {
                taglineElement.textContent = currentTagline.substring(0, charIndex + 1);
                charIndex++;
                
                if (charIndex === currentTagline.length) {
                    isDeleting = true;
                    setTimeout(type, 1500);
                } else {
                    setTimeout(type, 100);
                }
            }
        }
        
        type();
    }
    
    setTimeout(typeName, 500);
}

// ============================================
// SMOOTH SCROLL ANIMATIONS - PURE VANILLA JS
// ============================================

function initScrollAnimations() {
    console.log("Initializing scroll animations...");
    
    // Set initial state for sections
    document.querySelectorAll('section:not(#home)').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(100px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    });
    
    // Create Intersection Observer for animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                console.log("Section entering viewport:", entry.target.id);
                
                // Animate the section itself
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Animate elements within the section with delays
                animateSectionElements(entry.target);
                
                // Stop observing after animation
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all sections except home
    document.querySelectorAll('section:not(#home)').forEach(section => {
        observer.observe(section);
    });
}

function animateSectionElements(section) {
    const sectionId = section.id;
    
    switch(sectionId) {
        case 'about':
            animateAboutSection();
            break;
        case 'skills':
            animateSkillsSection();
            break;
        case 'projects':
            animateProjectsSection();
            break;
        case 'contact':
            animateContactSection();
            break;
    }
}

function animateAboutSection() {
    const aboutImage = document.querySelector('.about-image');
    const aboutText = document.querySelector('.about-text');
    
    if (aboutImage) {
        setTimeout(() => {
            aboutImage.style.opacity = '1';
            aboutImage.style.transform = 'translateX(0)';
            aboutImage.style.transition = 'opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s';
        }, 300);
    }
    
    if (aboutText) {
        setTimeout(() => {
            aboutText.style.opacity = '1';
            aboutText.style.transform = 'translateX(0)';
            aboutText.style.transition = 'opacity 0.8s ease 0.6s, transform 0.8s ease 0.6s';
        }, 600);
    }
}

function animateSkillsSection() {
    const skillCategories = document.querySelectorAll('.skill-category');
    
    skillCategories.forEach((category, index) => {
        setTimeout(() => {
            category.style.opacity = '1';
            category.style.transform = 'translateY(0)';
            category.style.transition = `opacity 0.8s ease ${0.3 + index * 0.2}s, transform 0.8s ease ${0.3 + index * 0.2}s`;
        }, 300 + index * 200);
    });
}

function animateProjectsSection() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
            card.style.transition = `opacity 0.8s ease ${0.2 + index * 0.15}s, transform 0.8s ease ${0.2 + index * 0.15}s`;
        }, 200 + index * 150);
    });
}

function animateContactSection() {
    const contactInfo = document.querySelector('.contact-info');
    const contactForm = document.querySelector('.contact-form');
    
    if (contactInfo) {
        setTimeout(() => {
            contactInfo.style.opacity = '1';
            contactInfo.style.transform = 'translateX(0)';
            contactInfo.style.transition = 'opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s';
        }, 300);
    }
    
    if (contactForm) {
        setTimeout(() => {
            contactForm.style.opacity = '1';
            contactForm.style.transform = 'translateX(0)';
            contactForm.style.transition = 'opacity 0.8s ease 0.6s, transform 0.8s ease 0.6s';
        }, 600);
    }
}

// ============================================
// HERO ANIMATIONS
// ============================================

function initHeroAnimations() {
    const heroElements = [
        '.hero-subtitle',
        '.hero-title',
        '.hero-tagline', 
        '.hero-description',
        '.hero-buttons',
        '.hero-visual'
    ];
    
    heroElements.forEach((selector, index) => {
        const element = document.querySelector(selector);
        if (element) {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = `opacity 0.8s ease ${0.5 + index * 0.3}s, transform 0.8s ease ${0.5 + index * 0.3}s`;
            
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, 500 + index * 300);
        }
    });
}

// ============================================
// SKILL BARS ANIMATION
// ============================================

function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    const skillObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const width = skillBar.getAttribute('data-width') || '100';
                
                skillBar.style.transition = 'width 1.5s ease';
                skillBar.style.width = `${width}%`;
                
                skillObserver.unobserve(skillBar);
            }
        });
    }, {
        threshold: 0.5
    });
    
    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });
}

// ============================================
// TILT EFFECT - VANILLA JS IMPLEMENTATION
// ============================================

function initTiltEffect() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        // Add event listeners for tilt effect
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateY = ((x - centerX) / centerX) * 5; // Max 5 degrees
            const rotateX = ((centerY - y) / centerY) * 5; // Max 5 degrees
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
            this.style.boxShadow = '0 20px 40px rgba(0, 217, 255, 0.3)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
            this.style.boxShadow = '';
            this.style.transition = 'transform 0.5s ease, box-shadow 0.5s ease';
            
            // Reset transition after animation
            setTimeout(() => {
                this.style.transition = '';
            }, 500);
        });
    });
}

// ============================================
// SCROLL PROGRESS INDICATOR
// ============================================

function initScrollProgress() {
    const progressBar = document.querySelector('.scroll-progress');
    if (!progressBar) return;
    
    window.addEventListener('scroll', function() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        
        progressBar.style.width = scrolled + "%";
    });
}

// ============================================
// CONTACT FORM
// ============================================

function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name')?.value || '',
            email: document.getElementById('email')?.value || '',
            subject: document.getElementById('subject')?.value || '',
            message: document.getElementById('message')?.value || ''
        };
        
        // Simple validation
        if (!formData.name || !formData.email || !formData.message) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // Show success message
        alert('Thank you for your message! I will get back to you soon.');
        
        // Reset form
        contactForm.reset();
        
        // Reset form lines
        document.querySelectorAll('.form-line').forEach(line => {
            line.style.width = '0';
        });
    });
    
    // Add focus effects to form inputs
    const formInputs = contactForm.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            const line = this.parentElement.querySelector('.form-line');
            if (line) {
                line.style.width = '100%';
                line.style.transition = 'width 0.3s ease';
            }
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                const line = this.parentElement.querySelector('.form-line');
                if (line) {
                    line.style.width = '0';
                }
            }
        });
    });
}

// ============================================
// WINDOW RESIZE HANDLER
// ============================================

window.addEventListener('resize', function() {
    // Refresh animations on resize if needed
    console.log("Window resized");
});

// Debug info
console.log("All functions initialized successfully!");