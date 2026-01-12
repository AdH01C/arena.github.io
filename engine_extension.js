
// --- INVENTORY MODEL RENDERER ---
// Add these methods to the engine object in engine.js

/* 
   We will append these to the end of engine.js or inside the object. 
   Since we can't easily "append" inside an object literal with replace, 
   we will assume the user wants me to edit engine.js to add these.
*/

initInventoryRenderer(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    // cleanup old if exists
    if (this.invRenderer) {
        const oldCanvas = this.invRenderer.domElement;
        if (oldCanvas.parentNode) oldCanvas.parentNode.removeChild(oldCanvas);
        this.invRenderer.dispose();
    }

    this.invScene = new THREE.Scene();

    // Transparent background
    this.invRenderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    this.invRenderer.setPixelRatio(window.devicePixelRatio);
    this.invRenderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(this.invRenderer.domElement);

    this.invCamera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
    this.invCamera.position.set(0, 1, 4);
    this.invCamera.lookAt(0, 1, 0);

    // Lighting
    const ambient = new THREE.AmbientLight(0xffffff, 1.2);
    const dir = new THREE.DirectionalLight(0xffffff, 1.5);
    dir.position.set(2, 5, 5);
    this.invScene.add(ambient, dir);

    // Watch for resize of container? 
    // For now, assume fixed or simple resize
},

updateInventoryModel(job, tier, color) {
    if (!this.invScene) return;

    // clear old mesh
    if (this.invMesh) {
        this.invScene.remove(this.invMesh);
        this.invMesh = null;
    }

    let modelData = null;
    const s = 1.3; // Scale up slightly for portrait
    // Map job string to Model function
    // Assuming Models object is globally available as per engine.js structure
    const c = color || 0xff0000;

    if (job === 'RONIN') modelData = Models.createRonin(c, s, tier);
    else if (job === 'PRIEST') modelData = Models.createPriest(c, s, tier);
    else if (job === 'MECH') modelData = Models.createMech(c, s, tier);
    else if (job === 'SHADOW') modelData = Models.createShadow(c, s, tier);
    else if (job === 'BRAWLER') modelData = Models.createBrawler(c, s, tier);
    else if (job === 'REAPER') modelData = Models.createReaper ? Models.createReaper(c, s, tier) : Models.createHumanoid(c, s);
    else modelData = Models.createHumanoid(c, s);

    if (modelData && modelData.mesh) {
        this.invMesh = modelData.mesh;
        this.invScene.add(this.invMesh);
        // Reset rotation
        this.invMesh.rotation.y = 0;
    }
},

renderInventoryFrame(mouseX, mouseY) {
    if (!this.invRenderer || !this.invScene || !this.invCamera) return;

    // Dynamic Rotation based on mouse
    // mouseX, mouseY are normalized -1 to 1 (from game.js logic typically)
    // or we calculate them here if passed absolute

    if (this.invMesh) {
        // Default look right (approx -45 deg or -90 deg?)
        // User said: "default look to the right" -> rotation.y = -Math.PI / 4 ??
        // "look at cursor" -> if cursor is present.

        let targetRot = -0.5; // Default right-ish

        if (mouseX !== undefined && mouseY !== undefined) {
            // Map mouseX (-1 to 1) to rotation (-1 to 1 radians?)
            // If mouse is left (-1), look left (rotation +)
            // If mouse is right (1), look right (rotation -)
            targetRot = -mouseX * 0.8;

            // Also discrete head tracking? For now just body rotation is smoother.
            // Lerp logic
            this.invMesh.rotation.y += (targetRot - this.invMesh.rotation.y) * 0.1;
        } else {
            // Return to default
            this.invMesh.rotation.y += (-0.5 - this.invMesh.rotation.y) * 0.05;
        }
    }

    this.invRenderer.render(this.invScene, this.invCamera);
}
