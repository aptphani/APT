export class RightFaceAnimation {
    constructor(canvasId, options = {}) {
        this.canvasId = canvasId;
        this.options = options;
        this.canvas = document.getElementById(this.canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.particleCount = this.options.particleCount || 100; // Adjust based on preference
        this.animationFrameId = null;
        // Additional properties for RightFaceAnimation
        this.particles = [];
        this.center = { x: this.canvas.width / 2, y: this.canvas.height / 2 };
        this.radius = 150; // Radius of the particle orbit
    }

    init() {
        if (!this.canvas) {
            console.error("Canvas element not found");
            return;
        }
        this.canvas.width = window.innerWidth * 0.98;
        this.canvas.height = window.innerHeight * 0.45;
        this.center = { x: this.canvas.width / 2, y: this.canvas.height / 2 };
        this.createParticles();
    }

    createParticles() {
        for (let i = 0; i < this.particleCount; i++) {
            const angle = Math.random() * Math.PI * 2;
            const particle = {
                x: this.center.x + this.radius * Math.cos(angle),
                y: this.center.y + this.radius * Math.sin(angle),
                vx: Math.random() * 2 - 1,
                vy: Math.random() * 2 - 1,
                radius: Math.random() * 2 + 1,
                angle: angle,
                speed: Math.random() * 0.02 + 0.01, // Rotation speed
            };
            this.particles.push(particle);
        }
    }

    drawParticle(particle) {
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        this.ctx.beginPath();
        this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        this.ctx.fill();
    }

    updateParticles() {
        this.particles.forEach(particle => {
            particle.angle += particle.speed;
            particle.x = this.center.x + this.radius * Math.cos(particle.angle);
            particle.y = this.center.y + this.radius * Math.sin(particle.angle);
        });
    }

    start() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.updateParticles();
        this.particles.forEach(particle => this.drawParticle(particle));
        this.animationFrameId = requestAnimationFrame(this.start.bind(this));
    }

    stop() {
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
        }
    }

    reset() {
        this.stop();
        this.particles = [];
        this.init();
        this.start();
    }
}
