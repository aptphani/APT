export class BottomFaceAnimation {
    constructor(canvasId, options = {}) {
        this.canvasId = canvasId;
        this.options = options;
        this.canvas = document.getElementById(this.canvasId);
        if (!this.canvas) {
            console.error("Canvas element not found");
            return;
        }
        this.engine = new BABYLON.Engine(this.canvas, true);
        this.scene = new BABYLON.Scene(this.engine);
        this.camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2, 10, new BABYLON.Vector3(0, 0, 0), this.scene);
        this.light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), this.scene);
    }

    init() {
        this.camera.attachControl(this.canvas, true);
        this.light.intensity = 0.7;
        this.createParticles();
        window.addEventListener('resize', () => {
            this.engine.resize();
        });
    }

    createParticles() {
        const particleSystem = new BABYLON.ParticleSystem("particles", 2000, this.scene);
        particleSystem.particleTexture = new BABYLON.Texture("textures/particle.png", this.scene);
        particleSystem.emitter = new BABYLON.Vector3(0, 0, 0); // the starting location
        particleSystem.minEmitBox = new BABYLON.Vector3(-1, 0, -1); // Starting all from
        particleSystem.maxEmitBox = new BABYLON.Vector3(1, 0, 1); // To...

        // Colors of all particles
        particleSystem.color1 = new BABYLON.Color4(0.7, 0.8, 1.0, 1.0);
        particleSystem.color2 = new BABYLON.Color4(0.2, 0.5, 1.0, 1.0);
        particleSystem.colorDead = new BABYLON.Color4(0, 0, 0.2, 0.0);

        // Size of each particle (random between...
        particleSystem.minSize = 0.1;
        particleSystem.maxSize = 0.5;

        // Life time of each particle (random between...
        particleSystem.minLifeTime = 2;
        particleSystem.maxLifeTime = 3.5;

        // Emission rate
        particleSystem.emitRate = 1000;

        // Blend mode : BLENDMODE_ONEONE, BLENDMODE_STANDARD
        particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;

        // Set the gravity of all particles
        particleSystem.gravity = new BABYLON.Vector3(0, -9.81, 0);

        // Direction of each particle after it has been emitted
        particleSystem.direction1 = new BABYLON.Vector3(-7, 8, 3);
        particleSystem.direction2 = new BABYLON.Vector3(7, 8, -3);

        // Angular speed, in radians
        particleSystem.minAngularSpeed = 0;
        particleSystem.maxAngularSpeed = Math.PI;

        // Speed
        particleSystem.minEmitPower = 1;
        particleSystem.maxEmitPower = 3;
        particleSystem.updateSpeed = 0.005;

        particleSystem.start();
    }

    start() {
        this.engine.runRenderLoop(() => {
            this.scene.render();
        });
    }

    stop() {
        this.engine.stopRenderLoop();
    }

    reset() {
        this.scene.dispose();
        this.init();
    }
}
