const engine = {
    scene: null, camera: null, renderer: null, particles: [], shakeIntensity: 0,
    grid: null, ambientLight: null, dirLight: null, // Store references for theme changes

    environment: [], // Store env objects

    // FLOOR THEMES - Increasingly scary every 5 floors
    // FLOOR THEMES - ENHANCED
    floorThemes: [
        { floor: 1, type: 'city', bg: 0x15152a, fog: 0x15152a, grid1: 0x4444ff, grid2: 0x222288, ambient: 0.9, name: 'NEON DISTRICT' },
        { floor: 20, type: 'cave', bg: 0x050510, fog: 0x050515, grid1: 0x004444, grid2: 0x002222, ambient: 0.7, name: 'DEEP CAVERNS' },
        { floor: 40, type: 'foundry', bg: 0x100500, fog: 0x150500, grid1: 0xff4400, grid2: 0x551100, ambient: 0.8, name: 'MAGMA CORE' },
        { floor: 60, type: 'void', bg: 0x000000, fog: 0x050010, grid1: 0x8800ff, grid2: 0x220055, ambient: 0.6, name: 'DIGITAL VOID' },
        { floor: 80, type: 'sanctum', bg: 0x110022, fog: 0x220033, grid1: 0xffd700, grid2: 0x664400, ambient: 0.8, name: 'CELESTIAL PALACE' },
        { floor: 100, type: 'void', bg: 0x000000, fog: 0x000000, grid1: 0xff0000, grid2: 0x550000, ambient: 0.5, name: 'SYSTEM CORE' },
    ],

    init() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);

        // Initial background
        this.scene.background = new THREE.Color(0x15151a);
        this.scene.fog = new THREE.Fog(0x15151a, 10, 50);

        // Store light references for theme changes
        this.ambientLight = new THREE.AmbientLight(0xffffff, 0.9); // Brighter ambient
        this.dirLight = new THREE.DirectionalLight(0xffffff, 1.0);
        this.dirLight.position.set(5, 20, 10);
        this.dirLight.castShadow = true;
        this.scene.add(this.ambientLight, this.dirLight);

        // Add point light for better close-up illumination
        const pointLight = new THREE.PointLight(0xffaa00, 0.5, 20);
        pointLight.position.set(2, 5, 2);
        this.scene.add(pointLight);

        this.grid = new THREE.GridHelper(100, 100, 0x444444, 0x222222);
        this.scene.add(this.grid);

        this.camera.position.set(0, 5, 13);
        // Inside animate(), replace the static lookAt
        const target = this.cameraTarget || { x: 0, y: 2, z: 0 };
        this.camera.lookAt(target.x, target.y, target.z);

        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });
        this.animate();
    },

    // Add this inside the engine object
    focusCamera(targetPos, offset, duration = 800) {
        // If targetPos is null, reset to the game's default wide view
        if (!targetPos) {
            this.cameraTarget = { x: 0, y: 1, z: 0 };
            this.tween(this.camera.position, 'x', 0, duration);
            this.tween(this.camera.position, 'y', 5, duration);
            this.tween(this.camera.position, 'z', 13, duration);
            return;
        }

        const tPos = targetPos;
        const off = offset || { x: 0, y: 2, z: 6 };
        const endPos = {
            x: tPos.x + off.x,
            y: tPos.y + off.y,
            z: tPos.z + off.z
        };

        this.tween(this.camera.position, 'x', endPos.x, duration);
        this.tween(this.camera.position, 'y', endPos.y, duration);
        this.tween(this.camera.position, 'z', endPos.z, duration);

        // Slight rotation tween for dramatic effect
        const startRot = this.camera.rotation.clone();
        this.camera.lookAt(tPos.x, tPos.y, tPos.z);
        const endRot = this.camera.rotation.clone();
        this.camera.rotation.copy(startRot); // Reset to tween it

        // Simple lookAt interpolation helper could go here, 
        // but for now the position tween + standard lookAt in animate loop is sufficient
        // if we update the lookAt target.
        if (targetPos) {
            this.cameraTarget = { x: targetPos.x, y: targetPos.y + 1.2, z: targetPos.z };
        } else {
            this.cameraTarget = { x: 0, y: 1, z: 0 };
        }
    },

    // Update background/theme based on floor
    setFloorTheme(floor) {
        // Find the appropriate theme (highest floor threshold <= current floor)
        let theme = this.floorThemes[0];
        for (let i = this.floorThemes.length - 1; i >= 0; i--) {
            if (floor >= this.floorThemes[i].floor) {
                theme = this.floorThemes[i];
                break;
            }
        }

        // Animate background color transition
        const targetBg = new THREE.Color(theme.bg);
        const targetFog = new THREE.Color(theme.fog);

        this.scene.background = targetBg;
        this.scene.fog.color = targetFog;

        // Update ambient light intensity
        this.ambientLight.intensity = theme.ambient;

        // Update grid colors
        this.scene.remove(this.grid);
        this.grid = new THREE.GridHelper(100, 100, theme.grid1, theme.grid2);
        this.scene.add(this.grid);

        // Update CSS body background to match
        document.body.style.background = '#' + theme.bg.toString(16).padStart(6, '0');

        // Generate props for this theme
        if (this.generateEnvironment) this.generateEnvironment(theme.type || 'city');

        return theme.name;
    },

    clearEnvironment() {
        this.environment.forEach(obj => this.scene.remove(obj));
        this.environment = [];
    },

    generateEnvironment(type) {
        this.clearEnvironment();

        const matWall = new THREE.MeshStandardMaterial({ color: 0x222222, metalness: 0.5, roughness: 0.8 });
        const matNeon = new THREE.MeshBasicMaterial({ color: 0x00f2ff });
        const matGlow = new THREE.MeshBasicMaterial({ color: 0xff0055 });

        if (type === 'city') {
            // Cityscape: Tall Pillars/Buildings
            for (let i = 0; i < 20; i++) {
                const h = 5 + Math.random() * 10;
                const mesh = new THREE.Mesh(new THREE.BoxGeometry(2, h, 2), matWall);
                mesh.position.set((Math.random() - 0.5) * 40, h / 2, -10 - Math.random() * 20);
                this.scene.add(mesh); this.environment.push(mesh);

                // Windows/Neon
                if (Math.random() > 0.5) {
                    const neon = new THREE.Mesh(new THREE.BoxGeometry(0.2, h * 0.8, 0.2), matNeon);
                    neon.position.copy(mesh.position);
                    neon.position.z += 1.1; // Stick out front
                    this.scene.add(neon); this.environment.push(neon);
                }
            }
        }
        else if (type === 'cave') {
            // Caves: Jagged Rocks
            const geo = new THREE.DodecahedronGeometry(2, 0);
            const matRock = new THREE.MeshStandardMaterial({ color: 0x333333, roughness: 1.0 });
            for (let i = 0; i < 30; i++) {
                const mesh = new THREE.Mesh(geo, matRock);
                const s = 1 + Math.random() * 3;
                mesh.scale.set(s, s, s);
                mesh.position.set((Math.random() - 0.5) * 50, Math.random() * 5, -5 - Math.random() * 30);
                mesh.rotation.set(Math.random(), Math.random(), Math.random());
                this.scene.add(mesh); this.environment.push(mesh);
            }
            // Crystals
            for (let i = 0; i < 10; i++) {
                const crystal = new THREE.Mesh(new THREE.ConeGeometry(0.5, 3, 4), matNeon);
                crystal.position.set((Math.random() - 0.5) * 40, 0, -5 - Math.random() * 20);
                this.scene.add(crystal); this.environment.push(crystal);
            }
        }
        else if (type === 'foundry') {
            // Pipes and Vents
            const matPipe = new THREE.MeshStandardMaterial({ color: 0x553322, metalness: 0.8 });
            for (let i = 0; i < 15; i++) {
                const pipe = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 20, 8), matPipe);
                pipe.rotation.z = Math.PI / 2;
                pipe.position.set(0, 5 + Math.random() * 10, -10 - Math.random() * 15);
                this.scene.add(pipe); this.environment.push(pipe);
            }
            // Lava pools
            const lava = new THREE.Mesh(new THREE.CircleGeometry(5, 16), matGlow);
            lava.rotation.x = -Math.PI / 2;
            lava.position.set(-10, 0.1, -10);
            this.scene.add(lava); this.environment.push(lava);

            const lava2 = lava.clone(); lava2.position.set(10, 0.1, -15);
            this.scene.add(lava2); this.environment.push(lava2);
        }
        else if (type === 'sanctum') {
            // Floating Islands
            const matGold = new THREE.MeshStandardMaterial({ color: 0xffd700, metalness: 1.0, roughness: 0.2 });
            for (let i = 0; i < 10; i++) {
                const island = new THREE.Mesh(new THREE.CylinderGeometry(2, 0.5, 2, 6), new THREE.MeshStandardMaterial({ color: 0xffffff }));
                island.position.set((Math.random() - 0.5) * 40, 5 + Math.random() * 10, -10 - Math.random() * 20);
                this.scene.add(island); this.environment.push(island);

                const pillar = new THREE.Mesh(new THREE.BoxGeometry(0.5, 4, 0.5), matGold);
                pillar.position.copy(island.position); pillar.position.y += 2;
                this.scene.add(pillar); this.environment.push(pillar);
            }
        }
        // Void/Default is empty
    },

    animate() {
        if (this.isHitStopped) {
            requestAnimationFrame(() => this.animate());
            return;
        }
        requestAnimationFrame(() => this.animate());

        // Idle Animation System
        const time = Date.now() * 0.001; // Current time in seconds
        this.scene.traverse((obj) => {
            if (obj.userData.idle) {
                // Floating (Vertical Sine)
                if (obj.userData.float) {
                    obj.position.y = obj.userData.baseY + Math.sin(time * obj.userData.idleSpeed) * obj.userData.idleAmp;
                }

                // Rotation (Continuous)
                if (obj.userData.rotatorX) obj.rotation.x += obj.userData.rotatorX;
                if (obj.userData.rotatorY) obj.rotation.y += obj.userData.rotatorY;
                if (obj.userData.rotatorZ) obj.rotation.z += obj.userData.rotatorZ;

                // Swing (Sine Rotation) - Great for arms/legs
                if (obj.userData.swing) {
                    const s = obj.userData.swing; // { axis: 'x', speed: 1, amp: 0.5, base: 0 }
                    obj.rotation[s.axis] = s.base + Math.sin(time * s.speed + (s.offset || 0)) * s.amp;
                }

                // Pulse (Scale Sine) - Great for glowing cores/breathing
                if (obj.userData.pulse) {
                    const p = obj.userData.pulse; // { speed: 2, amp: 0.1, base: 1 }
                    const val = p.base + Math.sin(time * p.speed) * p.amp;
                    obj.scale.set(val, val, val);
                }
            }
        });

        // Camera Shake
        if (this.shakeIntensity > 0) {
            const s = this.shakeIntensity;
            this.camera.position.set(
                (Math.random() - 0.5) * s,
                5 + (Math.random() - 0.5) * s,
                13 + (Math.random() - 0.5) * s
            );
            this.shakeIntensity *= 0.9;
            if (this.shakeIntensity < 0.05) {
                this.shakeIntensity = 0;
                this.camera.position.set(0, 5, 13);
            }
        }

        // --- CAMERA LOOKAT ---
        const camTarget = this.cameraTarget || { x: 0, y: 1, z: 0 };
        this.camera.lookAt(camTarget.x, camTarget.y, camTarget.z);

        this.updateParticles();

        if (typeof game !== 'undefined' && game.enemy && game.floor >= 100) {
            game.bossAiLoop();
            this.updateGlitch(game.enemy.mesh);
        }

        // Igris VFX Hook
        if (typeof game !== 'undefined' && game.enemy && game.enemy.type === 'igris') {
            this.updateIgris(game.enemy.mesh);
        }

        if (typeof game !== 'undefined' && game.updateMinionBars) {
            game.updateMinionBars();
        }

        this.renderer.render(this.scene, this.camera);
    },

    hitStop(ms) {
        this.isHitStopped = true;
        setTimeout(() => {
            this.isHitStopped = false;
        }, ms);
    },

    updateGlitch(bossMesh) {
        // Randomly offset "glitch parts"
        if (Math.random() < 0.1) {
            bossMesh.traverse(child => {
                if (child.userData.isGlitchPart) {
                    // Teleport scale or rotation
                    if (Math.random() < 0.5) child.scale.setScalar(0.5 + Math.random());
                    if (Math.random() < 0.2) child.rotation.z += Math.PI / 4;

                    // Spawn corruption particle
                    if (Math.random() < 0.1) {
                        const p = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.2, 0.2), new THREE.MeshBasicMaterial({ color: 0x000000 }));
                        const pos = new THREE.Vector3(); child.getWorldPosition(pos);
                        p.position.copy(pos);
                        p.position.x += (Math.random() - 0.5); p.position.y += (Math.random() - 0.5);
                        this.scene.add(p);
                        setTimeout(() => this.scene.remove(p), 100);
                    }
                }
            });
            // Screen shake spike
            if (Math.random() < 0.05) this.addShake(0.3);
        }
    },

    tween(obj, prop, target, time, cb) {
        const start = obj[prop];
        const startTime = Date.now();
        function loop() {
            const now = Date.now();
            const p = Math.min((now - startTime) / time, 1);
            const ease = 1 - Math.pow(1 - p, 3);
            obj[prop] = start + (target - start) * ease;
            if (p < 1) requestAnimationFrame(loop);
            else if (cb) cb();
        }
        loop();
    },

    // --- VFX SYSTEMS (Reused from previous step) ---
    // --- INVENTORY RENDERER ---
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
        this.invCamera.position.set(0, 0.8, 3.5);
        this.invCamera.lookAt(0, 0.8, 0);

        // Lighting
        const ambient = new THREE.AmbientLight(0xffffff, 1.2);
        const dir = new THREE.DirectionalLight(0xffffff, 1.5);
        dir.position.set(2, 5, 5);
        this.invScene.add(ambient, dir);
    },

    updateInventoryModel(sourceMesh) {
        if (!this.invScene) return;

        // clear old mesh
        if (this.invMesh) {
            this.invScene.remove(this.invMesh);
            this.invMesh = null;
        }

        if (sourceMesh) {
            this.invMesh = sourceMesh.clone();

            // Reset transforms for the Inventory View
            this.invMesh.position.set(0, -1.0, 0); // Center in view
            this.invMesh.rotation.set(0, -0.3, 0); // Default angle
            this.invMesh.scale.set(1.3, 1.3, 1.3); // Good size for panel

            // Ensure visible (just in case parent was hidden)
            this.invMesh.visible = true;

            this.invScene.add(this.invMesh);
        }
    },

    renderInventoryFrame(mouseX, mouseY) {
        if (!this.invRenderer || !this.invScene || !this.invCamera) return;

        if (this.invMesh) {
            let targetRot = -0.3; // Default slightly right
            if (mouseX !== null && mouseX !== 0) { // Check for 0 too if mouse hasn't moved?
                // mouseX is -1 (left) to 1 (right)
                // PREVIOUS: targetRot = -mouseX * 1.0;
                // USER REPORT: "looking at opposite direction"
                // NEW: Invert logic.
                // If Mouse is Left (-1), we want model to look Left?
                // If model faces Z+, Left is +Y rotation.
                // So -1 input -> +1 output. 
                // Wait, previous was: -(-1) = +1. So previous was: Mouse Left -> Rot Left.
                // If user says "opposite", maybe they want Mouse Left -> Rot Right (Mirror)?
                // OR my coordinate system assumption is wrong.
                // Let's try flipping the sign to positive.
                targetRot = mouseX * 0.8;

                this.invMesh.rotation.y += (targetRot - this.invMesh.rotation.y) * 0.1;
            } else {
                // Default look to the right (negative rotation)
                this.invMesh.rotation.y += (-0.5 - this.invMesh.rotation.y) * 0.05;
            }
        }
        this.invRenderer.render(this.invScene, this.invCamera);
    }
};
