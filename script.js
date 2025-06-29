// Main script file - Additional functionality can be added here
// Most functionality is now handled by the component loader

// Add any additional custom functionality here
console.log('Website loaded successfully!');


/**
 *   ------------------------------------------------------------ GAME LOGIC ------------------------------------------------------------ 
 */

console.log('Game logic loaded');


let gameInitialized = false;
let gameRunning = false;

// Add click event listener to start the game
document.addEventListener('DOMContentLoaded', function() {
    const gameContainer = document.getElementById('gameContainer');
    const clickToStart = document.getElementById('clickToStart');
    
    if (gameContainer && clickToStart) {
        gameContainer.addEventListener('click', function() {
            if (!gameInitialized) {
                startGame();
            }
        });
    }
});

function startGame() {
    const clickToStart = document.getElementById('clickToStart');
    if (clickToStart) {
        clickToStart.style.display = 'none';
    }
    
    gameInitialized = true;
    gameRunning = true;
    initSpaceInvadersGame();
}

function initSpaceInvadersGame() {
    const canvas = document.getElementById('gameCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const scoreElement = document.getElementById('score');
    const livesElement = document.getElementById('lives');
    const gameOverElement = document.getElementById('gameOver');
    const finalScoreElement = document.getElementById('finalScore');

    // Game state
    let score = 0;
    let lives = 3;

    // Player
    const player = {
        x: canvas.width / 2,
        y: canvas.height - 50,
        width: 50,
        height: 30,
        speed: 5,
        color: '#00ff88'
    };

    // Bullets
    let bullets = [];
    const bulletSpeed = 7;
    const bulletSize = 3;

    // Aliens
    let aliens = [];
    const alienRows = 5;
    const alienCols = 10;
    const alienWidth = 40;
    const alienHeight = 30;
    const alienSpeed = 0.5;
    let alienDirection = 1;
    let alienDropDistance = 20;

    // Alien bullets
    let alienBullets = [];
    const alienBulletSpeed = 3;

    // Explosions
    let explosions = [];

    // Input handling
    const keys = {};
    document.addEventListener('keydown', (e) => {
        keys[e.key] = true;
        if (e.key === 'f' && gameRunning) {
            shoot();
        }
    });
    document.addEventListener('keyup', (e) => {
        keys[e.key] = false;
    });

    // Create stars
    function createStars() {
        const starsContainer = document.getElementById('stars');
        if (!starsContainer) return;
        
        for (let i = 0; i < 100; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            star.style.left = Math.random() * 100 + '%';
            star.style.top = Math.random() * 100 + '%';
            star.style.animationDelay = Math.random() * 2 + 's';
            starsContainer.appendChild(star);
        }
    }

    // Initialize aliens
    function initAliens() {
        aliens = [];
        for (let row = 0; row < alienRows; row++) {
            for (let col = 0; col < alienCols; col++) {
                aliens.push({
                    x: col * (alienWidth + 10) + 50,
                    y: row * (alienHeight + 10) + 50,
                    width: alienWidth,
                    height: alienHeight,
                    color: row === 0 ? '#ff4444' : row === 1 ? '#ff8844' : '#ffff44',
                    alive: true
                });
            }
        }
    }

    // Shoot function
    function shoot() {
        bullets.push({
            x: player.x + player.width / 2 - bulletSize / 2,
            y: player.y,
            width: bulletSize,
            height: bulletSize * 2,
            color: '#00ff88'
        });
    }

    // Alien shoot function
    function alienShoot() {
        if (aliens.length > 0 && Math.random() < 0.02) {
            const randomAlien = aliens[Math.floor(Math.random() * aliens.length)];
            alienBullets.push({
                x: randomAlien.x + randomAlien.width / 2 - bulletSize / 2,
                y: randomAlien.y + randomAlien.height,
                width: bulletSize,
                height: bulletSize * 2,
                color: '#ff4444'
            });
        }
    }

    // Create explosion
    function createExplosion(x, y) {
        explosions.push({
            x: x,
            y: y,
            radius: 1,
            maxRadius: 20,
            color: '#ffff44',
            life: 30
        });
    }

    // Update game state
    function update() {
        if (!gameRunning) return;

        // Player movement
        if (keys['ArrowLeft'] && player.x > 0) {
            player.x -= player.speed;
        }
        if (keys['ArrowRight'] && player.x < canvas.width - player.width) {
            player.x += player.speed;
        }

        // Update bullets
        bullets = bullets.filter(bullet => {
            bullet.y -= bulletSpeed;
            return bullet.y > 0;
        });

        // Update alien bullets
        alienBullets = alienBullets.filter(bullet => {
            bullet.y += alienBulletSpeed;
            return bullet.y < canvas.height;
        });

        // Update explosions
        explosions = explosions.filter(explosion => {
            explosion.radius += 0.5;
            explosion.life--;
            return explosion.life > 0;
        });

        // Alien movement
        let shouldDrop = false;
        aliens.forEach(alien => {
            alien.x += alienSpeed * alienDirection;
            if (alien.x <= 0 || alien.x + alien.width >= canvas.width) {
                shouldDrop = true;
            }
        });

        if (shouldDrop) {
            alienDirection *= -1;
            aliens.forEach(alien => {
                alien.y += alienDropDistance;
            });
        }

        // Collision detection
        bullets.forEach((bullet, bulletIndex) => {
            aliens.forEach((alien, alienIndex) => {
                if (alien.alive && 
                    bullet.x < alien.x + alien.width &&
                    bullet.x + bullet.width > alien.x &&
                    bullet.y < alien.y + alien.height &&
                    bullet.y + bullet.height > alien.y) {
                    
                    alien.alive = false;
                    bullets.splice(bulletIndex, 1);
                    createExplosion(alien.x + alien.width / 2, alien.y + alien.height / 2);
                    score += 10;
                    scoreElement.textContent = score;
                }
            });
        });

        // Remove dead aliens
        aliens = aliens.filter(alien => alien.alive);

        // Check alien bullet collision with player
        alienBullets.forEach((bullet, bulletIndex) => {
            if (bullet.x < player.x + player.width &&
                bullet.x + bullet.width > player.x &&
                bullet.y < player.y + player.height &&
                bullet.y + bullet.height > player.y) {
                
                alienBullets.splice(bulletIndex, 1);
                lives--;
                livesElement.textContent = lives;
                createExplosion(player.x + player.width / 2, player.y + player.height / 2);
                
                if (lives <= 0) {
                    gameOver();
                }
            }
        });

        // Check if aliens reached the bottom
        aliens.forEach(alien => {
            if (alien.y + alien.height >= player.y) {
                gameOver();
            }
        });

        // Check win condition
        if (aliens.length === 0) {
            score += 100;
            scoreElement.textContent = score;
            initAliens();
        }

        // Alien shooting
        alienShoot();
    }

    // Draw functions
    function drawPlayer() {
        ctx.fillStyle = player.color;
        ctx.fillRect(player.x, player.y, player.width, player.height);
        
        // Draw player details
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(player.x + 10, player.y + 5, 5, 5);
        ctx.fillRect(player.x + 35, player.y + 5, 5, 5);
        ctx.fillRect(player.x + 20, player.y + 15, 10, 10);
    }

    function drawAliens() {
        aliens.forEach(alien => {
            ctx.fillStyle = alien.color;
            ctx.fillRect(alien.x, alien.y, alien.width, alien.height);
            
            // Draw alien details
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(alien.x + 5, alien.y + 5, 5, 5);
            ctx.fillRect(alien.x + 30, alien.y + 5, 5, 5);
            ctx.fillRect(alien.x + 15, alien.y + 20, 10, 5);
        });
    }

    function drawBullets() {
        bullets.forEach(bullet => {
            ctx.fillStyle = bullet.color;
            ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
        });
    }

    function drawAlienBullets() {
        alienBullets.forEach(bullet => {
            ctx.fillStyle = bullet.color;
            ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
        });
    }

    function drawExplosions() {
        explosions.forEach(explosion => {
            ctx.beginPath();
            ctx.arc(explosion.x, explosion.y, explosion.radius, 0, Math.PI * 2);
            ctx.fillStyle = explosion.color;
            ctx.fill();
        });
    }

    // Game over function
    function gameOver() {
        gameRunning = false;
        finalScoreElement.textContent = score;
        gameOverElement.style.display = 'block';
    }

    // Restart game function
    window.restartGame = function() {
        gameRunning = true;
        score = 0;
        lives = 3;
        bullets = [];
        alienBullets = [];
        explosions = [];
        player.x = canvas.width / 2;
        scoreElement.textContent = score;
        livesElement.textContent = lives;
        gameOverElement.style.display = 'none';
        initAliens();
    };

    // Main game loop
    function gameLoop() {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Update game state
        update();
        
        // Draw everything
        drawPlayer();
        drawAliens();
        drawBullets();
        drawAlienBullets();
        drawExplosions();
        
        // Continue loop
        requestAnimationFrame(gameLoop);
    }

    // Initialize and start game
    createStars();
    initAliens();
    gameLoop();
} 
/**
 *   ------------------------------------------------------------ END GAME LOGIC ------------------------------------------------------------ 
 */

// Example: Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Example: Add typing effect for hero title (if needed)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Wait for DOM to be fully loaded before running DOM-dependent code
document.addEventListener('DOMContentLoaded', () => {
    // Example: Initialize typing effect when page loads (optional)
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle && !sessionStorage.getItem('visited')) {
        const originalText = heroTitle.innerHTML;
        typeWriter(heroTitle, originalText, 50);
        sessionStorage.setItem('visited', 'true');
    }

    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        if (hamburger && navMenu) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }));

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

    // Contact form handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Basic validation
            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            // Simulate form submission (replace with actual form handling)
            showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
            this.reset();
        });
    }

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
    const animatedElements = document.querySelectorAll('.skill-category, .project-card, .stat');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

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

    // Add hover effect to scroll to top button
    scrollToTopBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) scale(1.1)';
        this.style.boxShadow = '0 6px 20px rgba(37, 99, 235, 0.4)';
    });

    scrollToTopBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = '0 4px 12px rgba(37, 99, 235, 0.3)';
    });

    // Add CSS for active navigation link
    const navStyle = document.createElement('style');
    navStyle.textContent = `
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
    document.head.appendChild(navStyle);

    // Navbar background change on scroll
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (navbar && window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else if (navbar) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }

        // Active navigation link highlighting
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
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

        // Scroll to top button visibility
        const scrollToTopBtn = document.querySelector('.scroll-to-top');
        if (scrollToTopBtn) {
            if (window.scrollY > 500) {
                scrollToTopBtn.style.opacity = '1';
                scrollToTopBtn.style.visibility = 'visible';
            } else {
                scrollToTopBtn.style.opacity = '0';
                scrollToTopBtn.style.visibility = 'hidden';
            }
        }
    });
}); 