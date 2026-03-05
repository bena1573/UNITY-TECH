document.addEventListener('DOMContentLoaded', function() {
    // Preloader - Updated for faster loading (only change is here)
    const preloader = document.querySelector('.preloader');
    
    window.addEventListener('load', function() {
        setTimeout(function() {
            preloader.style.opacity = '0';
            setTimeout(function() {
                preloader.style.display = 'none';
            }, 500);
        }, 500); // 👈 Changed from 1000ms to 500ms
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Back to top button
    const backToTopBtn = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    });

    // Animate stats in about section
    const statNumbers = document.querySelectorAll('.stat-number');
    
    function animateStats() {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            const duration = 2000;
            const start = 0;
            const increment = target / (duration / 16);
            let current = start;
            
            const timer = setInterval(() => {
                current += increment;
                stat.textContent = Math.floor(current);
                
                if (current >= target) {
                    stat.textContent = target;
                    clearInterval(timer);
                }
            }, 16);
        });
    }
    
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('timeline-item')) {
                    entry.target.classList.add('visible');
                }
                
                if (entry.target.id === 'about') {
                    animateStats();
                }
                
                // Add more animation triggers as needed
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.timeline-item').forEach(item => {
        observer.observe(item);
    });
    
    observer.observe(document.getElementById('about'));

    // Work filter
    const filterBtns = document.querySelectorAll('.filter-btn');
    const workItems = document.querySelectorAll('.work-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            workItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Form validation
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            
            if (name === '' || email === '' || subject === '' || message === '') {
                alert('Please fill in all fields');
                return;
            }
            
            if (!validateEmail(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            // Here you would typically send the form data to a server
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }
    
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Add smooth transition to all elements
    document.querySelectorAll('a, button, .service-card, .work-item, .tech-icon').forEach(element => {
        element.style.transition = 'all 0.5s cubic-bezier(0.65, 0, 0.35, 1)';
    });
});

// Infinite horizontal scroll for services
document.addEventListener('DOMContentLoaded', function() {
    const servicesTrack = document.querySelector('.services-track');
    if (servicesTrack) {
        // Duplicate the items for seamless looping
        const items = servicesTrack.querySelectorAll('.service-icon');
        items.forEach(item => {
            const clone = item.cloneNode(true);
            servicesTrack.appendChild(clone);
        });
    }
});

// Pricing card hover effects
document.querySelectorAll('.pricing-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        if (this.classList.contains('featured')) {
            this.style.transform = 'translateY(-15px)';
        } else {
            this.style.transform = 'translateY(-10px)';
        }
    });
    
    card.addEventListener('mouseleave', function() {
        if (this.classList.contains('featured')) {
            this.style.transform = 'translateY(-10px)';
        } else {
            this.style.transform = 'translateY(0)';
        }
    });
});

document.querySelectorAll('.pricing-button').forEach(button => {
    button.addEventListener('click', function() {
      // Handle button click (redirect or show form)
      window.location.href = '/signup?plan=' + this.dataset.plan;
    });
});
