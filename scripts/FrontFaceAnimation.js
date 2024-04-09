export class FrontFaceAnimation {
    constructor(canvasId, options = {}) {
      this.canvasId = canvasId;
      this.options = options;
      this.canvas = document.getElementById(this.canvasId);
      this.ctx = this.canvas.getContext('2d');
      this.particleCount = this.options.particleCount || 500; // Adjust according to your preference
      // Initialize other necessary properties
      this.particles = [];
      this.animationFrameId = null;
    }
  
    init() {
      if (!this.canvas) {
        console.error("Canvas element not found");
        return;
      }
      this.canvas.width = window.innerWidth * 0.98;
      this.canvas.height = window.innerHeight * 0.45;
      // Additional initialization logic
      this.createParticles();
    }
  
    createParticles() {
      for (let i = 0; i < this.particleCount; i++) {
        const x = Math.random() * this.canvas.width;
        const y = Math.random() * this.canvas.height;
        const particle = {
          x,
          y,
          radius: Math.random() * 2 + 1,
          color: `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.random().toFixed(2)})`
        };
        this.particles.push(particle);
      }
    }
  
    drawParticle(particle) {
      this.ctx.fillStyle = particle.color;
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      this.ctx.fill();
    }
  
    updateParticles() {
      this.particles.forEach(particle => {
        particle.x += Math.random() * 5 - 2.5; // Random movement
        particle.y += Math.random() * 5 - 2.5; // Random movement
        // Bounce particles off the walls
        if (particle.x <= 0 || particle.x >= this.canvas.width) particle.x *= -1;
        if (particle.y <= 0 || particle.y >= this.canvas.height) particle.y *= -1;
      });
    }
  
    start() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.updateParticles();
      this.particles.forEach(particle => this.drawParticle(particle));
      this.animationFrameId = requestAnimationFrame(this.start.bind(this)); // Keep animating
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
  
  // Example usage:
  let frontFaceAnimation = new FrontFaceAnimation('frontFaceCanvas', { particleCount: 100 });
  frontFaceAnimation.init();
  frontFaceAnimation.start();
  
  // To stop the animation:
  // frontFaceAnimation.stop();
  
  // To reset the animation:
  // frontFaceAnimation.reset();
  