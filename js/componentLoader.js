// Component Loader
class ComponentLoader {
    constructor() {
        this.components = {
            'navigation': 'components/navigation.html',
            'hero': 'components/hero.html',
            'about': 'components/about.html',
            'skills': 'components/skills.html',
            'projects': 'components/projects.html',
            'contact': 'components/contact.html',
            'footer': 'components/footer.html'
        };
        this.loadedComponents = 0;
        this.totalComponents = Object.keys(this.components).length;
    }

    async loadComponent(componentName, targetElement) {
        try {
            const response = await fetch(this.components[componentName]);
            if (!response.ok) {
                throw new Error(`Failed to load ${componentName}: ${response.status}`);
            }
            const html = await response.text();
            targetElement.innerHTML = html;
            this.loadedComponents++;
            
            // Check if all components are loaded
            if (this.loadedComponents === this.totalComponents) {
                this.initializeScripts();
            }
        } catch (error) {
            console.error(`Error loading component ${componentName}:`, error);
            targetElement.innerHTML = `<p>Error loading ${componentName} component</p>`;
            this.loadedComponents++;
        }
    }

    async loadAllComponents() {
        const componentElements = document.querySelectorAll('[data-component]');
        
        const loadPromises = Array.from(componentElements).map(element => {
            const componentName = element.getAttribute('data-component');
            return this.loadComponent(componentName, element);
        });
        
        await Promise.all(loadPromises);
    }

    initializeScripts() {
        // Initialize all the interactive features after components are loaded
        this.initializeNavigation();
        this.initializeScrollEffects();
        this.initializeAnimations();
        this.initializeHoverEffects();
        this.initializeScrollToTop();
    }

    initializeNavigation() {
        // Mobile Navigation Toggle
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');

        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
            });

            // Close mobile menu when clicking on a link
            document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }));
        }

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    initializeScrollEffects() {
        // Navbar background change on scroll
        window.addEventListener('scroll', () => {
            const navbar = document.querySelector('.navbar');
            if (navbar) {
                if (window.scrollY > 100) {
                    navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                    navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
                } else {
                    navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                    navbar.style.boxShadow = 'none';
                }
            }
        });

        // Active navigation link highlighting
        window.addEventListener('scroll', () => {
            const sections = document.querySelectorAll('section[id]');
            const navLinks = document.querySelectorAll('.nav-link');
            
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (window.scrollY >= (sectionTop - 200)) {
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
    }

    initializeAnimations() {
        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
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
        const animatedElements = document.querySelectorAll('.skill-category, .project-card, .stat, .social-card');
        
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }

    initializeHoverEffects() {
        // Project card hover effects
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Skill item hover effects
        document.querySelectorAll('.skill-item').forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.style.transform = 'translateX(10px)';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.transform = 'translateX(0)';
            });
        });

        // Social links hover effects
        document.querySelectorAll('.social-link').forEach(link => {
            link.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-3px) scale(1.1)';
            });
            
            link.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    initializeScrollToTop() {
        // Scroll to top functionality
        const scrollToTopBtn = document.createElement('button');
        scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        scrollToTopBtn.className = 'scroll-to-top';
        scrollToTopBtn.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background: #2563eb;
            color: white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 1000;
            box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
        `;

        document.body.appendChild(scrollToTopBtn);

        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                scrollToTopBtn.style.opacity = '1';
                scrollToTopBtn.style.visibility = 'visible';
            } else {
                scrollToTopBtn.style.opacity = '0';
                scrollToTopBtn.style.visibility = 'hidden';
            }
        });

        // Add hover effect to scroll to top button
        scrollToTopBtn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.1)';
            this.style.boxShadow = '0 6px 20px rgba(37, 99, 235, 0.4)';
        });

        scrollToTopBtn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 4px 12px rgba(37, 99, 235, 0.3)';
        });
    }
}

// Initialize component loader when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const loader = new ComponentLoader();
    loader.loadAllComponents();
});

// Add CSS for active navigation link
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: #2563eb !important;
    }
    
    .nav-link.active::after {
        width: 100% !important;
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        line-height: 1;
    }
    
    .notification-close:hover {
        opacity: 0.8;
    }
`;
document.head.appendChild(style); 