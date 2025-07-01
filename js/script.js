// JavaScript for Dahal Brothers Mechanical LLC - Mobile Optimized

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu functionality with enhanced UX
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            mobileMenu.classList.toggle('show');
            
            // Animate hamburger icon
            const icon = this.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });

        // Close mobile menu when clicking on a link
        const mobileMenuLinks = mobileMenu.querySelectorAll('a');
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('show');
                
                // Reset hamburger icon
                const icon = mobileMenuButton.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-times');
                }
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!mobileMenuButton.contains(event.target) && !mobileMenu.contains(event.target)) {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('show');
                
                // Reset hamburger icon
                const icon = mobileMenuButton.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-times');
                }
            }
        });
    }

    // Smooth scrolling for navigation links with mobile optimization
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                // Smooth scroll with mobile-friendly behavior
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                    mobileMenu.classList.remove('show');
                    
                    // Reset hamburger icon
                    const icon = mobileMenuButton.querySelector('i');
                    if (icon) {
                        icon.classList.add('fa-bars');
                        icon.classList.remove('fa-times');
                    }
                }
            }
        });
    });

    // Add active class to navigation links on scroll with mobile optimization
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('nav a[href^="#"]');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('text-yellow-400');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('text-yellow-400');
            }
        });
    });

    // Enhanced service card hover effects with mobile touch support
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        // Desktop hover effects
        card.addEventListener('mouseenter', function() {
            if (window.innerWidth > 768) {
                this.style.transform = 'translateY(-5px)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (window.innerWidth > 768) {
                this.style.transform = 'translateY(0)';
            }
        });

        // Mobile touch effects
        card.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
        });

        card.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Enhanced counter animation for statistics
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        function updateCounter() {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        }
        
        updateCounter();
    }

    // Trigger counter animation when statistics section is visible
    const statsSection = document.querySelector('#about');
    if (statsSection) {
        const statsObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counters = entry.target.querySelectorAll('.stat-number');
                    counters.forEach(counter => {
                        const target = parseInt(counter.textContent);
                        animateCounter(counter, target);
                    });
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        statsObserver.observe(statsSection);
    }

    // Enhanced scroll to top functionality with mobile optimization
    const scrollToTopButton = document.createElement('button');
    scrollToTopButton.innerHTML = '<i class="fas fa-chevron-up"></i>';
    scrollToTopButton.className = 'fixed bottom-6 right-6 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 opacity-0 pointer-events-none z-40';
    scrollToTopButton.setAttribute('aria-label', 'Scroll to top');
    document.body.appendChild(scrollToTopButton);

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopButton.classList.remove('opacity-0', 'pointer-events-none');
        } else {
            scrollToTopButton.classList.add('opacity-0', 'pointer-events-none');
        }
    });

    scrollToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Mobile-specific enhancements
    function handleMobileOptimizations() {
        // Add touch-friendly classes for mobile
        if (window.innerWidth <= 768) {
            document.body.classList.add('mobile-device');
        } else {
            document.body.classList.remove('mobile-device');
        }
    }

    // Call on load and resize
    handleMobileOptimizations();
    window.addEventListener('resize', handleMobileOptimizations);

    // Enhanced loading state
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Remove loading spinner if exists
        const loader = document.querySelector('.loader');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.remove();
            }, 300);
        }
    });

    // Prevent zoom on double tap for mobile
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function(event) {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);

    // Add smooth transitions for better mobile experience
    const style = document.createElement('style');
    style.textContent = `
        .mobile-device * {
            -webkit-tap-highlight-color: transparent;
        }
        
        @media (max-width: 768px) {
            .notification {
                right: 1rem;
                left: 1rem;
                max-width: none;
            }
        }
    `;
    document.head.appendChild(style);
}); 