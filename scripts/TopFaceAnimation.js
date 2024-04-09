export class TopFaceAnimation {
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
        this.createRipples();
        window.addEventListener('resize', () => {
            this.engine.resize();
        });
    }

    createRipples() {
        const waterMesh = BABYLON.MeshBuilder.CreateGround("waterMesh", {width: 10, height: 10}, this.scene);
        const waterMaterial = new BABYLON.WaterMaterial("waterMaterial", this.scene, new BABYLON.Vector2(512, 512));
        waterMaterial.backFaceCulling = true;
        waterMesh.material = waterMaterial;

        // Adding some waves
        waterMaterial.waveHeight = 0.2;
        waterMaterial.bumpHeight = 0.1;
        waterMaterial.waveLength = 0.1;
        waterMaterial.waveSpeed = 0.05;

        // Add skybox and light for better visual effects (Optional)
        // This is a simplification; customization can enhance the appearance significantly.
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
