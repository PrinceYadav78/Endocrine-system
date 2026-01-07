document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section-slide');
    const viewport = document.getElementById('viewport');
    const progressBar = document.getElementById('progress-bar');
    let currentIndex = 0;

    function updateView() {
        viewport.style.transform = `translateY(-${currentIndex * 100}vh)`;
        progressBar.style.width = `${((currentIndex + 1) / sections.length) * 100}%`;
        
        // Trigger animations
        sections[currentIndex].querySelectorAll('.animate').forEach(el => el.classList.add('show'));
    }

    // Initial trigger for first slide
    updateView();

    // Next Button Click
    document.querySelectorAll('.next-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            if (currentIndex < sections.length - 1) {
                currentIndex++;
                updateView();
            }
        });
    });

    // Keyboard Navigation (Arrow Keys)
    document.addEventListener('keydown', (e) => {
        if (e.key === "ArrowDown" && currentIndex < sections.length - 1) {
            currentIndex++;
            updateView();
        } else if (e.key === "ArrowUp" && currentIndex > 0) {
            currentIndex--;
            updateView();
        }
    });
});

const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');

let particles = [];
const particleCount = 40; // Number of "molecules"

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resize);
resize();

class Molecule {
    constructor() {
        this.init();
    }

    init() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.5 + 0.1;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(100, 255, 218, ${this.opacity})`; // Neon green molecules
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#64ffda';
        ctx.fill();
    }
}

for (let i = 0; i < particleCount; i++) {
    particles.push(new Molecule());
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animateParticles);
}

animateParticles();