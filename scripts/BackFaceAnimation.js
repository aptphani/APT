export class BackFaceAnimation {
    constructor(canvasId, options = {}) {
      this.canvasId = canvasId;
      this.options = options;
      this.canvas = document.getElementById(this.canvasId);
      this.ctx = this.canvas.getContext('2d');
      this.particleCount = this.options.particleCount || 500; // Adjust based on the scaled down version
      this.particles = [];
      this.animationFrameId = null;
      // Additional properties specific to BackFaceAnimation
      this.colors = [
        "#FF4500", "#00CED1", "#FF00FF", "#FFFF00", "#7FFFD4",
        "#FF1493", "#00FF00", "#8A2BE2", "#FF6347", "#00FFFF",
        "#FF8C00", "#9400D3",
      ];
    }
  
    init() {
      if (!this.canvas) {
        console.error("Canvas element not found");
        return;
      }
      this.canvas.width = window.innerWidth * 0.98;
      this.canvas.height = window.innerHeight * 0.45;
      this.createParticles();
    }
  
    createParticles() {
      for (let i = 0; i < this.particleCount; i++) {
        const particle = {
          x: Math.random() * this.canvas.width,
          y: Math.random() * this.canvas.height,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          radius: Math.random() * 2 + 1,
          color: this.colors[Math.floor(Math.random() * this.colors.length)]
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
        particle.x += particle.vx;
        particle.y += particle.vy;
        // Reverse velocity if the particle hits canvas boundary
        if (particle.x <= 0 || particle.x >= this.canvas.width) particle.vx *= -1;
        if (particle.y <= 0 || particle.y >= this.canvas.height) particle.vy *= -1;
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
  
  // Example usage:
  let backFaceAnimation = new BackFaceAnimation('backFaceCanvas', { particleCount: 100 });
  backFaceAnimation.init();
  backFaceAnimation.start();
  
  // To stop the animation:
  // backFaceAnimation.stop();
  
  // To reset the animation:
  // backFaceAnimation.reset();
  