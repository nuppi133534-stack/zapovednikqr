// Check if device is mobile to adjust animations
function isMobileDevice() {
    return window.innerWidth <= 768 || navigator.userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i);
}

// Check if user prefers reduced motion
function prefersReducedMotion() {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// 3D Rotation Effect for QR Code Container
const neonRotator = document.getElementById('neon-rotator');

if (neonRotator) {
    neonRotator.addEventListener('mousemove', (e) => {
        if (prefersReducedMotion()) return;
        
        const rect = neonRotator.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateY = (x - centerX) / centerX * 10; // Max 10 degrees
        const rotateX = (centerY - y) / centerY * 10; // Max 10 degrees
        
        neonRotator.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    neonRotator.addEventListener('mouseleave', () => {
        if (prefersReducedMotion()) return;
        
        neonRotator.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
}

// Parallax effect for decorative elements and headers
document.addEventListener('DOMContentLoaded', function() {
    const decorations = document.querySelectorAll('.neon-decoration');
    const headers = document.querySelectorAll('.logo, .neon-container h2, .info-card h3, .about-section h2');
    
    // Disable parallax on mobile devices and for users who prefer reduced motion
    if (isMobileDevice() || prefersReducedMotion()) {
        decorations.forEach(el => el.style.display = 'none');
        return;
    }
    
    // Mouse move parallax effect
    document.addEventListener('mousemove', throttle((e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        // Parallax for decorations
        decorations.forEach((el, i) => {
            const speed = (i + 1) * 0.5;
            const xPos = (x - 0.5) * speed * 20;
            const yPos = (y - 0.5) * speed * 20;
            
            el.style.transform = `translate(${xPos}px, ${yPos}px)`;
        });
        
        // Parallax for headers
        headers.forEach((el, i) => {
            const speed = 0.02;
            const xPos = (x - 0.5) * speed * (i + 1) * 10;
            const yPos = (y - 0.5) * speed * (i + 1) * 10;
            
            el.style.transform = `translate(${xPos}px, ${yPos}px)`;
        });
    }, 16));
    
    // Listen for theme changes and update accordingly
    if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
            // Could add theme-specific adjustments here if needed
        });
    }
});

// Scroll animations using Intersection Observer API
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
            }
        });
    }, observerOptions);
    
    // Observe all elements that should animate on scroll
    document.querySelectorAll('.neon-card, .neon-header, .neon-footer, .neon-container, .slide-up, .blur-in').forEach(el => {
        if (!el.classList.contains('appear')) {
            observer.observe(el);
        }
    });
});

// Button hover effects enhancement
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.neon-button');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
        
        button.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = 'scale(1.05)';
        });
    });
});

// QR Code click handler
document.addEventListener('DOMContentLoaded', function() {
    const qrPlaceholder = document.querySelector('.qr-placeholder');
    const donateButton = document.querySelector('.neon-button');
    
    // In a real implementation, this would redirect to the payment form
    donateButton.addEventListener('click', function(e) {
        e.preventDefault();
        alert('В реальном приложении этот QR-код вел бы к форме платежа СБП Сбербанка');
    });
    
    qrPlaceholder.addEventListener('click', function(e) {
        e.preventDefault();
        alert('В реальном приложении этот QR-код вел бы к форме платежа СБП Сбербанка');
    });
});

// Neon network background animation
document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('neon-network');
    const ctx = canvas.getContext('2d');
    
    // Disable network animation on mobile devices for performance
    if (isMobileDevice() || prefersReducedMotion()) {
        canvas.style.display = 'none';
        return;
    }
    
    // Set canvas size to window size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Points for the neon network
    const points = [];
    const numPoints = 80;
    const maxDistance = 150;
    
    // Initialize points
    function initPoints() {
        points.length = 0;
        for (let i = 0; i < numPoints; i++) {
            points.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 1.5 + 0.5
            });
        }
    }
    
    // Draw the neon network
    function drawNetwork() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw connections with neon glow effect
        for (let i = 0; i < points.length; i++) {
            for (let j = i + 1; j < points.length; j++) {
                const dx = points[i].x - points[j].x;
                const dy = points[i].y - points[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < maxDistance) {
                    const opacity = 1 - distance / maxDistance;
                    
                    // Create gradient for neon effect
                    const gradient = ctx.createLinearGradient(
                        points[i].x, points[i].y, 
                        points[j].x, points[j].y
                    );
                    
                    // Randomly choose neon color
                    const colors = [
                        [0, 243, 255], // Electric blue
                        [255, 0, 200],  // Pink
                        [185, 103, 255] // Purple
                    ];
                    
                    const color = colors[Math.floor(Math.random() * colors.length)];
                    
                    gradient.addColorStop(0, `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${opacity * 0.7})`);
                    gradient.addColorStop(1, `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${opacity * 0.3})`);
                    
                    ctx.beginPath();
                    ctx.strokeStyle = gradient;
                    ctx.lineWidth = 1.5;
                    ctx.shadowBlur = 15;
                    ctx.shadowColor = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
                    ctx.moveTo(points[i].x, points[i].y);
                    ctx.lineTo(points[j].x, points[j].y);
                    ctx.stroke();
                    
                    // Reset shadow
                    ctx.shadowBlur = 0;
                }
            }
        }
        
        // Draw points with neon glow
        for (let i = 0; i < points.length; i++) {
            const point = points[i];
            
            // Create radial gradient for glow effect
            const gradient = ctx.createRadialGradient(
                point.x, point.y, 0,
                point.x, point.y, point.radius * 3
            );
            
            // Randomly choose neon color
            const colors = [
                [0, 243, 255], // Electric blue
                [255, 0, 200],  // Pink
                [185, 103, 255] // Purple
            ];
            
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            gradient.addColorStop(0, `rgba(${color[0]}, ${color[1]}, ${color[2]}, 0.8)`);
            gradient.addColorStop(1, `rgba(${color[0]}, ${color[1]}, ${color[2]}, 0)`);
            
            ctx.beginPath();
            ctx.fillStyle = gradient;
            ctx.arc(point.x, point.y, point.radius * 3, 0, Math.PI * 2);
            ctx.fill();
            
            // Draw inner circle
            ctx.beginPath();
            ctx.fillStyle = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
            ctx.arc(point.x, point.y, point.radius, 0, Math.PI * 2);
            ctx.fill();
            
            // Move points
            point.x += point.vx;
            point.y += point.vy;
            
            // Bounce off edges
            if (point.x < 0 || point.x > canvas.width) point.vx *= -1;
            if (point.y < 0 || point.y > canvas.height) point.vy *= -1;
        }
        
        requestAnimationFrame(drawNetwork);
    }
    
    initPoints();
    drawNetwork();
    
    // Listen for theme changes
    if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
            // Restart the animation to update colors
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            initPoints();
        });
    }
});

// Performance optimization: Throttle scroll and mousemove events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to performance-intensive events
window.addEventListener('scroll', throttle(function() {
    // Scroll handling code here
}, 100));

// Mouse move handling with throttling
document.addEventListener('mousemove', throttle(function(e) {
    // Mouse move handling is done in the parallax effect
}, 16)); // ~60fps