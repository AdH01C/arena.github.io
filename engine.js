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
    // --- VFX SYSTEMS ---
    addShake(intensity) { this.shakeIntensity = Math.max(this.shakeIntensity, intensity); },

    spawnParticles(pos, color, count = 15, speed = 0.3) {
        const geo = new THREE.BoxGeometry(0.15, 0.15, 0.15);
        const mat = new THREE.MeshBasicMaterial({ color: color });
        for (let i = 0; i < count; i++) {
            const mesh = new THREE.Mesh(geo, mat);
            mesh.position.copy(pos);
            mesh.position.x += (Math.random() - 0.5); mesh.position.y += (Math.random() - 0.5);
            mesh.userData.vel = new THREE.Vector3((Math.random() - 0.5), (Math.random() - 0.5) + 0.5, (Math.random() - 0.5)).multiplyScalar(speed);
            this.scene.add(mesh); this.particles.push(mesh);
        }
    },

    spawnSlash(pos, color, scale = 1, rotation = 0) {
        // Create a crescent shape using a RingGeometry with thetaLength
        const geo = new THREE.RingGeometry(0.8 * scale, 1.2 * scale, 32, 1, 0, Math.PI);
        const mat = new THREE.MeshBasicMaterial({ color: color, side: THREE.DoubleSide, transparent: true, opacity: 0.9 });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.copy(pos);
        mesh.position.y += 1.0; // Raise slightly

        // Randomize slash angle slightly or use provided
        mesh.rotation.z = rotation + (Math.random() - 0.5);
        mesh.rotation.x = (Math.random() - 0.5) * 0.5;
        mesh.rotation.y = (Math.random() - 0.5) * 0.5;

        mesh.lookAt(this.camera.position); // Generally face camera but maintain z-rotation for slash angle
        mesh.userData.type = 'slash';
        mesh.userData.life = 1.0;

        this.scene.add(mesh); this.particles.push(mesh);
    },

    spawnLightning(startPos, endPos, color) {
        const points = [];
        const segments = 5;
        const dist = startPos.distanceTo(endPos);
        const dir = new THREE.Vector3().subVectors(endPos, startPos).normalize();

        points.push(startPos.clone());
        for (let i = 1; i < segments; i++) {
            const p = new THREE.Vector3().copy(startPos).add(dir.clone().multiplyScalar(dist * (i / segments)));
            p.add(new THREE.Vector3((Math.random() - 0.5), (Math.random() - 0.5), (Math.random() - 0.5)).multiplyScalar(0.5));
            points.push(p);
        }
        points.push(endPos.clone());

        const geo = new THREE.BufferGeometry().setFromPoints(points);
        const mat = new THREE.LineBasicMaterial({ color: color });
        const mesh = new THREE.Line(geo, mat);

        mesh.userData.type = 'lightning';
        mesh.userData.life = 0.4;
        this.scene.add(mesh); this.particles.push(mesh);

        // Flash light
        if (!this.flashLight) {
            this.flashLight = new THREE.PointLight(color, 2, 5);
            this.flashLight.position.copy(startPos);
            this.scene.add(this.flashLight);
            setTimeout(() => {
                if (this.flashLight) { this.scene.remove(this.flashLight); this.flashLight = null; }
            }, 100);
        }
    },

    spawnShockwave(pos, color, scale = 1) {
        const geo = new THREE.RingGeometry(0.1, 0.5, 32);
        const mat = new THREE.MeshBasicMaterial({ color: color, side: THREE.DoubleSide, transparent: true, opacity: 0.8 });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.copy(pos); mesh.lookAt(this.camera.position);
        mesh.userData.type = 'shockwave'; mesh.userData.grow = 0.5 * scale;
        this.scene.add(mesh); this.particles.push(mesh);

        // Inner ring for double burst
        setTimeout(() => {
            if (this.scene) {
                const mesh2 = new THREE.Mesh(geo, mat.clone());
                mesh2.position.copy(pos); mesh2.lookAt(this.camera.position);
                mesh2.userData.type = 'shockwave'; mesh2.userData.grow = 0.8 * scale;
                this.scene.add(mesh2); this.particles.push(mesh2);
            }
        }, 100);
    },

    spawnExplosion(pos, color, scale = 1) {
        this.spawnShockwave(pos, color, scale * 2);
        this.spawnParticles(pos, color, 30, 0.5 * scale);
        this.addShake(0.8 * scale);

        // Secondary burst
        setTimeout(() => {
            this.runVFX('nova', pos, color, 0, scale);
        }, 200);
    },

    spawnBeam(pos, color, height = 5, width = 0.5) {
        const geo = new THREE.CylinderGeometry(width, width, height, 16);
        const mat = new THREE.MeshBasicMaterial({ color: color, transparent: true, opacity: 0.9 });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.copy(pos); mesh.position.y += height / 2;
        mesh.userData.type = 'beam';
        this.scene.add(mesh); this.particles.push(mesh);

        // Add core for glow
        const geo2 = new THREE.CylinderGeometry(width * 0.5, width * 0.5, height, 16);
        const mat2 = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.95 });
        const core = new THREE.Mesh(geo2, mat2);
        mesh.add(core);
    },

    spawnImplosion(pos, color) {
        const geo = new THREE.SphereGeometry(0.1, 8, 8);
        const mat = new THREE.MeshBasicMaterial({ color: color });
        for (let i = 0; i < 30; i++) {
            const mesh = new THREE.Mesh(geo, mat);
            mesh.position.set(pos.x + (Math.random() - 0.5) * 8, pos.y + (Math.random() - 0.5) * 8, pos.z + (Math.random() - 0.5) * 8);
            mesh.userData.type = 'implode'; mesh.userData.target = pos.clone();
            this.scene.add(mesh); this.particles.push(mesh);
        }
    },

    spawnMatrix(pos, color) {
        const geo = new THREE.BoxGeometry(0.05, 0.5, 0.05);
        const mat = new THREE.MeshBasicMaterial({ color: color });
        for (let i = 0; i < 20; i++) {
            const mesh = new THREE.Mesh(geo, mat);
            mesh.position.set(pos.x + (Math.random() - 0.5) * 3, pos.y + 5 + Math.random() * 5, pos.z + (Math.random() - 0.5) * 3);
            mesh.userData.type = 'rain'; mesh.userData.vel = new THREE.Vector3(0, -0.5, 0);
            this.scene.add(mesh); this.particles.push(mesh);
        }
    },

    updateParticles() {
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];

            if (p.userData.type === 'shockwave') {
                p.scale.multiplyScalar(1.1); p.material.opacity -= 0.05;
                if (p.material.opacity <= 0) { this.scene.remove(p); this.particles.splice(i, 1); }
            }
            else if (p.userData.type === 'slash') {
                p.userData.life -= 0.1;
                p.scale.multiplyScalar(1.1); // Expand outwards
                p.material.opacity = p.userData.life;
                if (p.userData.life <= 0) { this.scene.remove(p); this.particles.splice(i, 1); }
            }
            else if (p.userData.type === 'lightning') {
                p.userData.life -= 0.1;
                p.material.opacity = p.userData.life;
                if (p.userData.life <= 0) { this.scene.remove(p); this.particles.splice(i, 1); }
            }
            else if (p.userData.type === 'beam') {
                p.scale.x *= 0.9; p.scale.z *= 0.9; p.material.opacity -= 0.05;
                if (p.material.opacity <= 0) { this.scene.remove(p); this.particles.splice(i, 1); }
            }
            else if (p.userData.type === 'implode') {
                p.position.lerp(p.userData.target, 0.2);
                if (p.position.distanceTo(p.userData.target) < 0.2) { this.scene.remove(p); this.particles.splice(i, 1); }
            }
            else if (p.userData.type === 'rain') {
                p.position.add(p.userData.vel);
                if (p.position.y < 0) { this.scene.remove(p); this.particles.splice(i, 1); }
            }
            else {
                // Standard particles
                p.position.add(p.userData.vel); p.scale.multiplyScalar(0.92);
                if (p.scale.x < 0.01) { this.scene.remove(p); this.particles.splice(i, 1); }
            }
        }
    }
};

// --- MODELS ---
const Models = {
    box(w, h, d, mat, x, y, z, p) {
        const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
        m.position.set(x, y, z); if (p) p.add(m); return m;
    },
    createHumanoid(c, s = 1) {
        const g = new THREE.Group();
        const mB = new THREE.MeshStandardMaterial({ color: 0x333, metalness: 0.8, roughness: 0.2 });
        const mG = new THREE.MeshBasicMaterial({ color: c });
        this.box(0.15, 0.6, 0.2, mB, -0.2, 0.3, 0, g); this.box(0.15, 0.6, 0.2, mB, 0.2, 0.3, 0, g);
        const t = this.box(0.5, 0.5, 0.4, mB, 0, 0.7, 0, g); this.box(0.2, 0.2, 0.1, mG, 0, 0.1, 0.21, t);
        const h = this.box(0.3, 0.3, 0.3, mB, 0, 0.5, 0, t); this.box(0.25, 0.05, 0.05, mG, 0, 0, 0.16, h);
        const ag = new THREE.Group(); ag.position.y = 0.3; t.add(ag);
        const mkArm = (x) => {
            const s = new THREE.Group(); s.position.set(x, 0, 0); ag.add(s);
            this.box(0.15, 0.5, 0.15, mB, 0, -0.3, 0, s); this.box(0.1, 0.6, 0.05, mG, 0, 0, 0.1, s); return s;
        }
        g.scale.set(s, s, s); return { mesh: g, weapon: mkArm(0.35) };
    },

    // === CLASS-SPECIFIC PLAYER MODELS ===
    // === CLASS-SPECIFIC PLAYER MODELS ===
    createRonin(c, s = 1, tier = 0) {
        const g = new THREE.Group();
        const mB = new THREE.MeshStandardMaterial({ color: 0x222, metalness: 0.9, roughness: 0.1 });
        const mG = new THREE.MeshBasicMaterial({ color: c });
        const mBlade = new THREE.MeshStandardMaterial({ color: 0xaaaaff, metalness: 1, roughness: 0.1, emissive: c, emissiveIntensity: 2 });

        // Animated Torso
        const t = this.box(0.4, 0.45, 0.3, mB, 0, 0.65, 0, g);
        this.box(0.15, 0.15, 0.1, mG, 0, 0, 0.16, t); // Core
        t.userData.idle = true; t.userData.pulse = { speed: 2, amp: 0.02, base: 1 }; // Breathing

        // Legs
        this.box(0.12, 0.5, 0.15, mB, -0.15, 0.25, 0, g);
        this.box(0.12, 0.5, 0.15, mB, 0.15, 0.25, 0, g);

        // Head
        const h = this.box(0.25, 0.25, 0.25, mB, 0, 0.45, 0, t);
        this.box(0.22, 0.06, 0.05, mG, 0, 0.02, 0.13, h); // Visor

        // Scarf (Tier 2+) - Now longer and more active
        if (tier >= 2) {
            const scarf = this.box(0.3, 0.7, 0.03, mG, 0, -0.1, -0.2, t);
            scarf.rotation.x = 0.5;
            scarf.userData.idle = true; scarf.userData.swing = { axis: 'x', speed: 4, amp: 0.3, base: 0.5 };
        }

        // Shoulder Pads (Tier 4+)
        if (tier >= 4) {
            this.box(0.25, 0.12, 0.25, mB, -0.35, 0.3, 0, t); // L Shoulder
            this.box(0.2, 0.05, 0.2, mG, -0.35, 0.38, 0, t); // L Accent
            this.box(0.25, 0.12, 0.25, mB, 0.35, 0.3, 0, t); // R Shoulder
            this.box(0.2, 0.05, 0.2, mG, 0.35, 0.38, 0, t); // R Accent
        }

        // Back Thrusters (Tier 7+)
        if (tier >= 7) {
            const thrusterL = this.box(0.15, 0.4, 0.15, mB, -0.2, 0.1, -0.25, t);
            thrusterL.rotation.x = -0.3;
            this.box(0.1, 0.1, 0.05, mG, 0, -0.15, -0.05, thrusterL); // Glow

            const thrusterR = this.box(0.15, 0.4, 0.15, mB, 0.2, 0.1, -0.25, t);
            thrusterR.rotation.x = -0.3;
            this.box(0.1, 0.1, 0.05, mG, 0, -0.15, -0.05, thrusterR); // Glow
        }

        // Arms
        const ag = new THREE.Group(); ag.position.y = 0.25; t.add(ag);

        const leftArm = new THREE.Group(); leftArm.position.set(-0.35, 0, 0); ag.add(leftArm);
        this.box(0.1, 0.5, 0.1, mB, 0, -0.25, 0, leftArm);
        leftArm.userData.idle = true; leftArm.userData.swing = { axis: 'x', speed: 2, amp: 0.15, base: 0 };

        const rightArm = new THREE.Group(); rightArm.position.set(0.35, 0, 0); ag.add(rightArm);
        this.box(0.1, 0.5, 0.1, mB, 0, -0.25, 0, rightArm);
        rightArm.userData.idle = true; rightArm.userData.swing = { axis: 'x', speed: 2, amp: 0.15, base: 0, offset: Math.PI };

        // Katana - Improved Emissive
        const katana = new THREE.Group(); katana.position.set(0, -0.35, 0.2); rightArm.add(katana);
        this.box(0.03, 1.2, 0.02, mBlade, 0, 0.5, 0, katana); // Blade
        this.box(0.08, 0.1, 0.08, mB, 0, 0, 0, katana); // Hilt
        katana.userData.idle = true; katana.userData.pulse = { speed: 6, amp: 0.2, base: 1 }; // High Frequency Pulse

        g.scale.set(s, s, s); return { mesh: g, weapon: rightArm };
    },

    createPriest(c, s = 1, tier = 0) {
        const g = new THREE.Group();
        const mB = new THREE.MeshStandardMaterial({ color: 0x444, metalness: 0.6, roughness: 0.3 });
        const mG = new THREE.MeshBasicMaterial({ color: c });
        const mGold = new THREE.MeshStandardMaterial({ color: 0xffd700, metalness: 1, roughness: 0.2, emissive: 0x332200 });

        // Floating/Bobbing Body
        g.userData.idle = true; g.userData.float = true; g.userData.baseY = 0; g.userData.idleSpeed = 1.5; g.userData.idleAmp = 0.05;

        // Robes
        this.box(0.35, 0.6, 0.3, mB, 0, 0.3, 0, g); // Skirt
        const t = this.box(0.45, 0.5, 0.35, mB, 0, 0.7, 0, g); // Torso
        this.box(0.1, 0.4, 0.05, mG, 0, 0, 0.18, t); // Scarf down middle

        // Head
        const h = this.box(0.22, 0.25, 0.22, mB, 0, 0.48, 0, t);
        this.box(0.18, 0.08, 0.05, mG, 0, 0.02, 0.12, h); // Eyes

        // Halo (Tier 3+)
        if (tier >= 3) {
            const halo = new THREE.Mesh(new THREE.TorusGeometry(0.25, 0.03, 8, 16), mGold);
            halo.position.set(0, 0.3, 0); halo.rotation.x = Math.PI / 2; h.add(halo);
            halo.userData.idle = true; halo.userData.rotatorY = 0.05;
        }

        // Arms
        const ag = new THREE.Group(); ag.position.y = 0.3; t.add(ag);
        const leftArm = new THREE.Group(); leftArm.position.set(-0.32, 0, 0); ag.add(leftArm);
        this.box(0.12, 0.45, 0.12, mB, 0, -0.25, 0, leftArm);

        const rightArm = new THREE.Group(); rightArm.position.set(0.32, 0, 0); ag.add(rightArm);
        this.box(0.12, 0.45, 0.12, mB, 0, -0.25, 0, rightArm);
        // Raised staff arm
        rightArm.rotation.x = -0.5;

        // Staff
        const staff = new THREE.Group(); staff.position.set(0, -0.3, 0.1); rightArm.add(staff);
        this.box(0.04, 1.4, 0.04, mGold, 0, 0.4, 0, staff);

        const orb = new THREE.Mesh(new THREE.SphereGeometry(0.12, 8, 8), mG);
        orb.position.y = 1.1; staff.add(orb);
        orb.userData.idle = true; orb.userData.pulse = { speed: 2, amp: 0.05, base: 1 };

        // Wings/Drones (Tier 6+)
        if (tier >= 6) {
            for (let i = 0; i < 2; i++) {
                const w = this.box(0.05, 0.4, 0.05, mG, (i === 0 ? -0.6 : 0.6), 0.5, -0.2, t);
                w.userData.idle = true; w.userData.float = true; w.userData.baseY = 0.5; w.userData.idleSpeed = 3; w.userData.idleAmp = 0.1;
            }
        }

        g.scale.set(s, s, s); return { mesh: g, weapon: rightArm };
    },

    createMech(c, s = 1, tier = 0) {
        const g = new THREE.Group();
        const mB = new THREE.MeshStandardMaterial({ color: 0x555, metalness: 0.95, roughness: 0.1 });
        const mG = new THREE.MeshBasicMaterial({ color: c });
        const mDark = new THREE.MeshStandardMaterial({ color: 0x222, metalness: 0.9, roughness: 0.2 });

        // Massive Legs
        this.box(0.25, 0.6, 0.3, mB, -0.25, 0.3, 0, g);
        this.box(0.25, 0.6, 0.3, mB, 0.25, 0.3, 0, g);

        // Heavy Torso
        const t = this.box(0.8, 0.6, 0.5, mB, 0, 0.8, 0, g);
        this.box(0.3, 0.2, 0.1, mG, 0, 0, 0.26, t); // Reactor core
        // Vents on back
        const vent = this.box(0.6, 0.4, 0.1, mDark, 0, 0.1, -0.26, t);

        // Shoulders
        this.box(0.25, 0.25, 0.3, mDark, -0.5, 0.2, 0, t);
        this.box(0.25, 0.25, 0.3, mDark, 0.5, 0.2, 0, t);

        // Head
        const h = this.box(0.35, 0.25, 0.3, mDark, 0, 0.45, 0, t);
        this.box(0.25, 0.08, 0.05, mG, 0, 0, 0.16, h); // Visor

        // Arms
        const ag = new THREE.Group(); ag.position.y = 0.2; t.add(ag);

        const leftArm = new THREE.Group(); leftArm.position.set(-0.6, 0, 0); ag.add(leftArm);
        this.box(0.2, 0.5, 0.2, mB, 0, -0.2, 0, leftArm);

        const rightArm = new THREE.Group(); rightArm.position.set(0.6, 0, 0); ag.add(rightArm);
        this.box(0.2, 0.5, 0.2, mB, 0, -0.2, 0, rightArm);

        // Gatling gun
        const gun = new THREE.Group(); gun.position.set(0, -0.4, 0.2); rightArm.add(gun);
        this.box(0.15, 0.15, 0.5, mDark, 0, 0, 0, gun);
        const barrel = new THREE.Group(); barrel.position.z = 0.25; gun.add(barrel);
        for (let i = 0; i < 4; i++) {
            this.box(0.04, 0.04, 0.4, mB, Math.cos(i * 1.57) * 0.06, Math.sin(i * 1.57) * 0.06, 0.2, barrel);
        }
        // Spin barrels
        barrel.userData.idle = true; barrel.userData.rotatorZ = 0.2;

        // Shoulder Cannons (Tier 2+)
        if (tier >= 2) {
            const cannon = this.box(0.15, 0.15, 0.4, mDark, 0.5, 0.4, 0, t);
            cannon.userData.idle = true; cannon.userData.swing = { axis: 'x', speed: 0.5, amp: 0.2, base: 0 };
        }
        // Wings (Jetpack)
        if (tier >= 5) {
            const jp = this.box(0.6, 0.5, 0.2, mDark, 0, 0, -0.4, t);
            const flame = this.box(0.1, 0.1, 0.1, mG, -0.2, -0.3, 0, jp);
            const flame2 = this.box(0.1, 0.1, 0.1, mG, 0.2, -0.3, 0, jp);
            // Flickering engines
            flame.userData.idle = true; flame.userData.pulse = { speed: 10, amp: 0.2, base: 1 };
            flame2.userData.idle = true; flame2.userData.pulse = { speed: 11, amp: 0.2, base: 1 };
        }

        g.scale.set(s, s, s); return { mesh: g, weapon: rightArm };
    },

    createShadow(c, s = 1, tier = 0) {
        const g = new THREE.Group();
        const mB = new THREE.MeshStandardMaterial({ color: 0x111, metalness: 0.3, roughness: 0.8 });
        const mG = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const mD = new THREE.MeshStandardMaterial({ color: 0x000, metalness: 0.5, roughness: 0.5 });
        const mVoid = new THREE.MeshBasicMaterial({ color: 0xaa00ff, transparent: true, opacity: 0.7 });

        // Legs
        this.box(0.1, 0.5, 0.1, mB, -0.12, 0.25, 0, g);
        this.box(0.1, 0.5, 0.1, mB, 0.12, 0.25, 0, g);

        // Torso
        const t = this.box(0.35, 0.4, 0.2, mB, 0, 0.7, 0, g);
        this.box(0.1, 0.1, 0.05, mG, 0, 0, 0.11, t); // Symbol

        // Hood
        const hood = this.box(0.3, 0.25, 0.28, mD, 0, 0.45, 0, t);
        this.box(0.25, 0.15, 0.05, mG, 0, -0.02, 0.14, hood); // Eyes

        // Cloak (Tier 1+)
        if (tier >= 1) {
            const cloak = this.box(0.45, 0.6, 0.05, mD, 0, -0.2, -0.14, t);
            cloak.userData.idle = true; cloak.userData.swing = { axis: 'x', speed: 1.5, amp: 0.15, base: 0.1 };
        }

        // Arms
        const ag = new THREE.Group(); ag.position.y = 0.25; t.add(ag);

        const leftArm = new THREE.Group(); leftArm.position.set(-0.25, 0, 0); ag.add(leftArm);
        this.box(0.08, 0.35, 0.08, mB, 0, -0.18, 0, leftArm);

        const rightArm = new THREE.Group(); rightArm.position.set(0.25, 0, 0); ag.add(rightArm);
        this.box(0.08, 0.35, 0.08, mB, 0, -0.18, 0, rightArm);

        // Daggers
        const dagger1 = new THREE.Group(); dagger1.position.set(0, -0.3, 0.05); rightArm.add(dagger1);
        this.box(0.02, 0.02, 0.3, mD, 0, 0, 0.1, dagger1); // Handle
        this.box(0.01, 0.01, 0.25, mG, 0, 0, 0.15, dagger1); // Edge

        const dagger2 = dagger1.clone(); leftArm.add(dagger2);

        // Void Particles (Tier 4+)
        if (tier >= 4) {
            for (let i = 0; i < 3; i++) {
                const smoke = new THREE.Mesh(new THREE.SphereGeometry(0.06, 6, 6), mVoid);
                smoke.position.set((Math.random() - 0.5), (Math.random()), -0.2);
                t.add(smoke);
                smoke.userData.idle = true; smoke.userData.float = true; smoke.userData.baseY = smoke.position.y; smoke.userData.idleSpeed = 1; smoke.userData.idleAmp = 0.2;
            }
        }

        g.scale.set(s, s, s); return { mesh: g, weapon: rightArm };
    },

    createBrawler(c, s = 1, tier = 0) {
        const g = new THREE.Group();
        const mB = new THREE.MeshStandardMaterial({ color: c || 0xff4400, metalness: 0.4, roughness: 0.6 });
        const mG = new THREE.MeshBasicMaterial({ color: 0xff6600 });
        const mD = new THREE.MeshStandardMaterial({ color: 0x333333, metalness: 0.7, roughness: 0.3 });
        const mW = new THREE.MeshBasicMaterial({ color: 0xffcc00 });

        // Bouncing Idle
        g.userData.idle = true; g.userData.pulse = { speed: 3, amp: 0.03, base: 1 };

        // Legs
        this.box(0.14, 0.5, 0.14, mB, -0.15, 0.25, 0, g);
        this.box(0.14, 0.5, 0.14, mB, 0.15, 0.25, 0, g);

        // Torso
        const t = this.box(0.45, 0.45, 0.25, mB, 0, 0.72, 0, g);
        this.box(0.15, 0.08, 0.05, mG, 0, 0.1, 0.13, t); // Belt buckle

        // Head
        const h = this.box(0.2, 0.22, 0.2, mB, 0, 0.38, 0, t);
        this.box(0.22, 0.06, 0.05, mG, 0, 0, 0.1, h); // Headband

        // Pads
        if (tier >= 2) {
            this.box(0.15, 0.15, 0.15, mD, -0.32, 0.25, 0, t);
            this.box(0.15, 0.15, 0.15, mD, 0.32, 0.25, 0, t);
        }

        // Arms
        const ag = new THREE.Group(); ag.position.y = 0.25; t.add(ag);

        const leftArm = new THREE.Group(); leftArm.position.set(-0.35, 0, 0); ag.add(leftArm);
        this.box(0.12, 0.4, 0.12, mB, 0, -0.2, 0, leftArm);

        const rightArm = new THREE.Group(); rightArm.position.set(0.35, 0, 0); ag.add(rightArm);
        this.box(0.12, 0.4, 0.12, mB, 0, -0.2, 0, rightArm);

        // Boxer Guard stance
        leftArm.rotation.x = -0.5; leftArm.rotation.z = -0.5;
        rightArm.rotation.x = -0.5; rightArm.rotation.z = 0.5;

        // Gloves
        const g1 = this.box(0.16, 0.16, 0.16, mG, 0, -0.35, 0.05, leftArm);
        const g2 = this.box(0.16, 0.16, 0.16, mG, 0, -0.35, 0.05, rightArm);

        // Pulsing fists
        g1.userData.idle = true; g1.userData.pulse = { speed: 4, amp: 0.1, base: 1 };
        g2.userData.idle = true; g2.userData.pulse = { speed: 4, amp: 0.1, base: 1 };

        // Aura (Tier 6+)
        if (tier >= 6) {
            for (let i = 0; i < 5; i++) {
                const flame = new THREE.Mesh(new THREE.ConeGeometry(0.05, 0.15, 4), mG);
                flame.position.set((Math.random() - 0.5) * 0.4, 0.5 + Math.random() * 0.2, -0.15);
                t.add(flame);
                flame.userData.idle = true; flame.userData.float = true; flame.userData.baseY = 0.5; flame.userData.idleSpeed = 5; flame.userData.idleAmp = 0.1;
            }
        }

        g.scale.set(s, s, s); return { mesh: g, weapon: rightArm };
    },

    createGunslinger(c, s = 1, tier = 0) {
        const g = new THREE.Group();
        const mB = new THREE.MeshStandardMaterial({ color: 0x332211, metalness: 0.3, roughness: 0.8 });
        const mG = new THREE.MeshBasicMaterial({ color: c || 0xffaa00 });
        const mS = new THREE.MeshStandardMaterial({ color: 0x222, metalness: 0.2, roughness: 0.9 });
        const mGun = new THREE.MeshStandardMaterial({ color: 0x888888, metalness: 0.9, roughness: 0.2 });

        // Legs
        this.box(0.12, 0.5, 0.14, mS, -0.15, 0.25, 0, g);
        this.box(0.12, 0.5, 0.14, mS, 0.15, 0.25, 0, g);
        this.box(0.05, 0.15, 0.1, mB, -0.23, 0.35, 0, g); // Holster
        this.box(0.05, 0.15, 0.1, mB, 0.23, 0.35, 0, g); // Holster

        // Torso
        const t = this.box(0.4, 0.45, 0.25, mS, 0, 0.65, 0, g);
        this.box(0.42, 0.5, 0.1, mB, 0, 0.3, -0.15, t); // Coat back

        // Head
        const h = this.box(0.2, 0.22, 0.2, mS, 0, 0.35, 0, t);
        this.box(0.5, 0.02, 0.5, mB, 0, 0.1, 0, h); // Hat Brim
        this.box(0.25, 0.15, 0.25, mB, 0, 0.18, 0, h); // Hat Top
        this.box(0.08, 0.05, 0.02, mG, 0.05, 0.05, 0.11, h); // Cigar/Light

        if (tier >= 2) {
            const poncho = this.box(0.45, 0.2, 0.3, mB, 0, 0.15, 0, t);
            poncho.rotation.z = -0.1;
            // Poncho sway
            poncho.userData.idle = true; poncho.userData.swing = { axis: 'z', speed: 1, amp: 0.05, base: -0.1 };
        }

        // Arms
        const ag = new THREE.Group(); ag.position.y = 0.25; t.add(ag);

        const leftArm = new THREE.Group(); leftArm.position.set(-0.3, 0, 0); ag.add(leftArm);
        this.box(0.1, 0.4, 0.1, mB, 0, -0.2, 0, leftArm);

        const rightArm = new THREE.Group(); rightArm.position.set(0.3, 0, 0); ag.add(rightArm);
        this.box(0.1, 0.4, 0.1, mB, 0, -0.2, 0, rightArm);

        // Aiming stance
        rightArm.rotation.x = -1.0; leftArm.rotation.x = -0.5;

        // Gun
        const gun = new THREE.Group(); gun.position.set(0, -0.35, 0.1); rightArm.add(gun);
        this.box(0.04, 0.1, 0.03, mB, 0, -0.05, 0, gun); // Handle
        this.box(0.05, 0.05, 0.25, mGun, 0, 0, 0.1, gun); // Barrel
        const chamber = this.box(0.06, 0.06, 0.08, mS, 0, 0, 0, gun); // Chamber

        // Spin chamber idle
        chamber.userData.idle = true; chamber.userData.rotatorz = 0.5;

        // Dual Wield (Tier 4+)
        if (tier >= 4) {
            const gun2 = gun.clone();
            leftArm.add(gun2);
            leftArm.rotation.x = -1.0; // Raise left arm too
        }

        // Drone (Tier 8+)
        if (tier >= 8) {
            const drone = new THREE.Mesh(new THREE.SphereGeometry(0.1, 8, 8), mG);
            drone.position.set(0.5, 0.5, -0.3); t.add(drone);
            drone.userData.idle = true; drone.userData.float = true; drone.userData.baseY = 0.5; drone.userData.idleSpeed = 3; drone.userData.idleAmp = 0.1;
        }

        g.scale.set(s, s, s); return { mesh: g, weapon: rightArm };
    },

    createKnight(c, s = 1, tier = 0) {
        const g = new THREE.Group();
        const mArmor = new THREE.MeshStandardMaterial({ color: 0x888888, metalness: 0.8, roughness: 0.2 });
        const mGold = new THREE.MeshStandardMaterial({ color: 0xffd700, metalness: 1.0, roughness: 0.3 });
        const mG = new THREE.MeshBasicMaterial({ color: c || 0x00aaff });
        const mDark = new THREE.MeshStandardMaterial({ color: 0x222, metalness: 0.5, roughness: 0.5 });

        // Body
        this.box(0.18, 0.5, 0.18, mArmor, -0.2, 0.25, 0, g);
        this.box(0.18, 0.5, 0.18, mArmor, 0.2, 0.25, 0, g);
        const t = this.box(0.6, 0.5, 0.35, mArmor, 0, 0.7, 0, g);
        this.box(0.2, 0.2, 0.1, mG, 0, 0.05, 0.18, t); // Glowing crest

        // Head
        const h = this.box(0.25, 0.3, 0.25, mArmor, 0, 0.45, 0, t);
        this.box(0.26, 0.04, 0.1, mG, 0, 0, 0.1, h); // Visor

        // Pauldrons
        const pSize = 0.2 + (tier * 0.02);
        const pL = this.box(pSize, pSize, pSize, mArmor, -0.45, 0.25, 0, t);
        const pR = this.box(pSize, pSize, pSize, mArmor, 0.45, 0.25, 0, t);

        // Cape (Tier 4+)
        if (tier >= 4) {
            const cape = this.box(0.5, 0.7, 0.05, mG, 0, -0.1, -0.2, t);
            cape.rotation.x = 0.2;
            cape.userData.idle = true; cape.userData.swing = { axis: 'x', speed: 1.5, amp: 0.1, base: 0.2 };
        }

        // Arms
        const ag = new THREE.Group(); ag.position.y = 0.25; t.add(ag);
        const leftArm = new THREE.Group(); leftArm.position.set(-0.4, 0, 0); ag.add(leftArm);
        this.box(0.15, 0.4, 0.15, mDark, 0, -0.2, 0, leftArm);

        const rightArm = new THREE.Group(); rightArm.position.set(0.4, 0, 0); ag.add(rightArm);
        this.box(0.15, 0.4, 0.15, mDark, 0, -0.2, 0, rightArm);

        // Sword
        const sword = new THREE.Group(); sword.position.set(0, -0.3, 0.1); rightArm.add(sword);
        this.box(0.04, 0.15, 0.04, mDark, 0, -0.07, 0, sword);
        this.box(0.15, 0.02, 0.08, mGold, 0, 0, 0, sword);
        const bladeLen = 0.8 + (tier * 0.05);
        const blade = this.box(0.08, bladeLen, 0.02, mArmor, 0, bladeLen / 2, 0, sword);

        if (tier >= 6) {
            blade.material = mG; // Energy sword
            blade.userData.idle = true; blade.userData.pulse = { speed: 5, amp: 0.1, base: 1 };
        }

        // Shield
        const shieldGroup = new THREE.Group(); shieldGroup.position.set(0, -0.2, 0.2); leftArm.add(shieldGroup);
        const sW = 0.4 + (tier * 0.03), sH = 0.5 + (tier * 0.03);
        const shield = this.box(sW, sH, 0.05, mArmor, 0, 0, 0, shieldGroup);

        if (tier >= 3) this.box(sW * 0.8, sH * 0.8, 0.06, mG, 0, 0, 0.02, shieldGroup);

        // Breathing
        shieldGroup.userData.idle = true; shieldGroup.userData.pulse = { speed: 1, amp: 0.05, base: 1 };

        g.scale.set(s, s, s); return { mesh: g, weapon: rightArm };
    },

    createHacker(c, s = 1, tier = 0) {
        const g = new THREE.Group();
        const mDark = new THREE.MeshStandardMaterial({ color: 0x111111, metalness: 0.8, roughness: 0.2 });
        const mCode = new THREE.MeshBasicMaterial({ color: c || 0x00ff00 });
        const mScreen = new THREE.MeshBasicMaterial({ color: 0x000000 });

        // Glitchy Legs
        if (tier < 7) {
            this.box(0.12, 0.5, 0.12, mDark, -0.15, 0.25, 0, g);
            this.box(0.12, 0.5, 0.12, mDark, 0.15, 0.25, 0, g);
        } else {
            // Data Stream Legs
            for (let i = 0; i < 5; i++) {
                const bit = this.box(0.15 - (i * 0.03), 0.15, 0.15 - (i * 0.03), mCode, 0, 0.4 - (i * 0.15), 0, g);
                bit.rotation.y = i * 0.5;
                bit.userData.idle = true; bit.userData.rotatorY = 0.2 * (i % 2 == 0 ? 1 : -1);
            }
        }

        // Torso
        const t = this.box(0.4, 0.45, 0.25, mDark, 0, 0.65, 0, g);
        this.box(0.02, 0.3, 0.02, mCode, -0.1, 0, 0.13, t);
        this.box(0.02, 0.3, 0.02, mCode, 0.1, 0, 0.13, t);

        // Monitor Head
        const h = new THREE.Group(); h.position.set(0, 0.4, 0); t.add(h);
        this.box(0.35, 0.25, 0.2, mDark, 0, 0, 0, h);
        const screen = this.box(0.3, 0.2, 0.05, mCode, 0, 0, 0.08, h); // Screen Glow
        screen.userData.idle = true; screen.userData.pulse = { speed: 8, amp: 0.05, base: 1 }; // Fast flickering

        // Arms & Rig
        const ag = new THREE.Group(); ag.position.y = 0.25; t.add(ag);

        const leftArm = new THREE.Group(); leftArm.position.set(-0.3, 0, 0); ag.add(leftArm);
        this.box(0.1, 0.4, 0.1, mDark, 0, -0.2, 0, leftArm);

        const rightArm = new THREE.Group(); rightArm.position.set(0.3, 0, 0); ag.add(rightArm);
        this.box(0.1, 0.4, 0.1, mDark, 0, -0.2, 0, rightArm);

        // Typing Pose
        leftArm.rotation.x = -0.5; leftArm.rotation.z = -0.2;
        rightArm.rotation.x = -0.5; rightArm.rotation.z = 0.2;

        const rig = new THREE.Group(); rig.position.set(0, -0.3, 0.4); t.add(rig);

        if (tier < 5) {
            this.box(0.5, 0.02, 0.3, mDark, 0, 0, 0, rig); // Keyboard
            const keys = this.box(0.45, 0.02, 0.25, mCode, 0, 0.01, 0, rig); // Hologram keys
            keys.material.transparent = true; keys.material.opacity = 0.5;
        } else {
            // Floating Cube Rig
            const cube = this.box(0.25, 0.25, 0.25, mCode, 0, 0, 0, rig);
            cube.rotation.y = 0.7; cube.rotation.x = 0.5;
            this.box(0.2, 0.2, 0.2, mScreen, 0, 0, 0, rig);
            cube.userData.idle = true; cube.userData.rotatorX = 0.1; cube.userData.rotatorY = 0.1;
        }

        g.scale.set(s, s, s); return { mesh: g, weapon: rightArm };
    },

    // === ENEMY MODELS ===
    createDrone(c, s = 1) {
        const g = new THREE.Group();
        const mB = new THREE.MeshStandardMaterial({ color: 0x444 });
        const mG = new THREE.MeshBasicMaterial({ color: c });
        const mScan = new THREE.MeshBasicMaterial({ color: 0xff0000, transparent: true, opacity: 0.5, side: THREE.DoubleSide });

        // Main Core
        const core = this.box(0.4, 0.4, 0.4, mB, 0, 1.2, 0, g);
        this.box(0.2, 0.2, 0.2, mG, 0, 0, 0.15, core); // Eye

        // Rotating Ring
        const ring = this.box(0.7, 0.05, 0.7, mB, 0, 0, 0, core);
        ring.userData.idle = true; ring.userData.rotatorY = 0.1;

        // Spinning Blades/Rotors
        const rotor = this.box(1.0, 0.02, 0.1, mB, 0, 0.3, 0, core);
        rotor.userData.idle = true; rotor.userData.rotatorY = 0.3;

        // Scanner Light
        const scanner = new THREE.Mesh(new THREE.ConeGeometry(0.5, 1.0, 4, 1, true), mScan);
        scanner.rotation.x = -Math.PI / 2; scanner.position.z = 0.2; scanner.position.y = -0.5;
        core.add(scanner);

        // Floating Animation
        g.userData.idle = true;
        g.userData.float = true; g.userData.baseY = 0; g.userData.idleSpeed = 2; g.userData.idleAmp = 0.2;

        g.scale.set(s, s, s); return { mesh: g, weapon: core };
    },

    createSentinel(c, s = 1) { // Tall bipedal enemy
        const g = new THREE.Group();
        const mB = new THREE.MeshStandardMaterial({ color: 0x333, metalness: 0.8, roughness: 0.2 });
        const mG = new THREE.MeshBasicMaterial({ color: c });

        // Legs
        this.box(0.12, 0.9, 0.15, mB, -0.2, 0.45, 0, g);
        this.box(0.12, 0.9, 0.15, mB, 0.2, 0.45, 0, g);

        // Torso
        const t = this.box(0.5, 0.6, 0.35, mB, 0, 1.2, 0, g);
        this.box(0.3, 0.3, 0.1, mG, 0, 0.1, 0.15, t); // Glowing Chest

        // Shoulders
        this.box(0.2, 0.2, 0.25, mB, -0.4, 0.2, 0, t);
        this.box(0.2, 0.2, 0.25, mB, 0.4, 0.2, 0, t);

        // Head
        const h = this.box(0.25, 0.35, 0.3, mB, 0, 0.5, 0, t);
        this.box(0.25, 0.05, 0.05, mG, 0, 0.05, 0.15, h); // Visor

        // Arms (Swaying)
        const leftArm = new THREE.Group(); leftArm.position.set(-0.35, 0.2, 0); t.add(leftArm);
        this.box(0.1, 0.7, 0.1, mB, 0, -0.35, 0, leftArm);
        this.box(0.12, 0.3, 0.12, mG, 0, -0.6, 0, leftArm); // Glow fist

        const rightArm = new THREE.Group(); rightArm.position.set(0.35, 0.2, 0); t.add(rightArm);
        this.box(0.1, 0.7, 0.1, mB, 0, -0.35, 0, rightArm);
        this.box(0.05, 0.6, 0.2, mG, 0.05, -0.4, 0, rightArm); // Blade Arm

        // Animations
        leftArm.userData.idle = true; leftArm.userData.swing = { axis: 'x', speed: 2, amp: 0.2, base: 0 };
        rightArm.userData.idle = true; rightArm.userData.swing = { axis: 'x', speed: 2, amp: 0.2, base: 0, offset: Math.PI }; // Opposite swing

        // Breathing
        t.userData.idle = true; t.userData.pulse = { speed: 1.5, amp: 0.02, base: 1 };

        g.scale.set(s, s, s); return { mesh: g, weapon: t };
    },

    createTank(c, s = 1) { // Heavy armored enemy
        const g = new THREE.Group();
        const mB = new THREE.MeshStandardMaterial({ color: 0x444, metalness: 0.9, roughness: 0.1 });
        const mG = new THREE.MeshBasicMaterial({ color: c });

        // Treads
        this.box(0.25, 0.35, 0.7, mB, -0.4, 0.17, 0, g);
        this.box(0.25, 0.35, 0.7, mB, 0.4, 0.17, 0, g);

        // Hull
        const t = this.box(0.7, 0.3, 0.6, mB, 0, 0.4, 0, g);
        this.box(0.4, 0.15, 0.1, mG, 0, 0.1, 0.31, t); // Front sensor

        // Turret (Rotating)
        const turret = new THREE.Group(); turret.position.set(0, 0.3, 0); t.add(turret);
        this.box(0.45, 0.25, 0.5, mB, 0, 0.12, 0, turret);

        // Dual Barrels
        const b1 = this.box(0.1, 0.1, 0.6, mB, -0.15, 0.1, 0.4, turret);
        this.box(0.05, 0.05, 0.1, mG, 0, 0, 0.3, b1); // Glowing tip

        const b2 = this.box(0.1, 0.1, 0.6, mB, 0.15, 0.1, 0.4, turret);
        this.box(0.05, 0.05, 0.1, mG, 0, 0, 0.3, b2); // Glowing tip

        // Antenna
        const ant = this.box(0.02, 0.5, 0.02, mB, -0.2, 0.4, -0.2, turret);

        // Animation: Scan
        turret.userData.idle = true;
        turret.userData.swing = { axis: 'y', speed: 0.5, amp: 0.5, base: 0 };

        g.scale.set(s, s, s); return { mesh: g, weapon: turret };
    },

    createSpider(c, s = 1) { // Multi-legged enemy
        const g = new THREE.Group();
        const mB = new THREE.MeshStandardMaterial({ color: 0x222, metalness: 0.7, roughness: 0.3 });
        const mG = new THREE.MeshBasicMaterial({ color: c });

        // Body
        const body = this.box(0.4, 0.3, 0.5, mB, 0, 0.4, 0, g);

        // Multiple Eyes
        this.box(0.08, 0.08, 0.05, mG, -0.1, 0, 0.26, body);
        this.box(0.08, 0.08, 0.05, mG, 0.1, 0, 0.26, body);
        this.box(0.05, 0.05, 0.05, mG, 0, 0.1, 0.26, body);

        // Legs (Propelled, Twitching)
        for (let i = 0; i < 4; i++) {
            const zOff = -0.2 + i * 0.15;

            const legL = new THREE.Group(); legL.position.set(-0.25, 0, zOff); body.add(legL);
            const l1 = this.box(0.05, 0.4, 0.05, mB, -0.15, -0.1, 0, legL); l1.rotation.z = 0.5;
            // Twitch animation
            legL.userData.idle = true;
            legL.userData.swing = { axis: 'z', speed: 4 + Math.random(), amp: 0.1, base: 0, offset: i };

            const legR = new THREE.Group(); legR.position.set(0.25, 0, zOff); body.add(legR);
            const r1 = this.box(0.05, 0.4, 0.05, mB, 0.15, -0.1, 0, legR); r1.rotation.z = -0.5;
            // Twitch animation
            legR.userData.idle = true;
            legR.userData.swing = { axis: 'z', speed: 4 + Math.random(), amp: 0.1, base: 0, offset: i + Math.PI };
        }

        g.scale.set(s, s, s); return { mesh: g, weapon: body };
    },

    createFloater(c, s = 1) { // Floating orb with tentacles
        const g = new THREE.Group();
        const mB = new THREE.MeshStandardMaterial({ color: 0x222, metalness: 0.8, roughness: 0.2 });
        const mG = new THREE.MeshBasicMaterial({ color: c });

        // Main orb
        const orb = new THREE.Mesh(new THREE.SphereGeometry(0.35, 12, 12), mB);
        orb.position.y = 1.2; g.add(orb);

        // Large Center Eye
        const eye = new THREE.Mesh(new THREE.SphereGeometry(0.18, 16, 16), mG);
        eye.position.z = 0.2; orb.add(eye);
        eye.userData.idle = true; eye.userData.pulse = { speed: 3, amp: 0.1, base: 1 };

        // Tentacles
        for (let i = 0; i < 6; i++) {
            const tGroup = new THREE.Group();
            tGroup.rotation.y = (i / 6) * Math.PI * 2;
            orb.add(tGroup);

            const tent = this.box(0.05, 0.6, 0.05, mB, 0, -0.4, 0.25, tGroup);
            tent.rotation.x = 0.3;

            // Wiggle
            tGroup.userData.idle = true;
            tGroup.userData.swing = { axis: 'x', speed: 2, amp: 0.2, base: 0, offset: i };
        }

        // Float
        g.userData.idle = true;
        g.userData.float = true; g.userData.baseY = 0; g.userData.idleSpeed = 1.5; g.userData.idleAmp = 0.3;

        g.scale.set(s, s, s); return { mesh: g, weapon: orb };
    },

    // NEW ENEMIES
    createConstruct(c, s = 1) { // Heavy Golem
        const g = new THREE.Group();
        const mRock = new THREE.MeshStandardMaterial({ color: 0x443333, roughness: 0.9, metalness: 0.2 });
        const mG = new THREE.MeshBasicMaterial({ color: c });

        // Heavy Steps
        g.userData.idle = true; g.userData.pulse = { speed: 1, amp: 0.01, base: 1 };

        // Legs
        this.box(0.3, 0.6, 0.3, mRock, -0.3, 0.3, 0, g);
        this.box(0.3, 0.6, 0.3, mRock, 0.3, 0.3, 0, g);

        // Body
        const t = this.box(0.9, 0.7, 0.6, mRock, 0, 0.9, 0, g);

        // Glowing Cracks
        this.box(0.05, 0.5, 0.62, mG, -0.2, 0, 0, t);
        this.box(0.05, 0.5, 0.62, mG, 0.2, 0, 0, t);
        this.box(0.92, 0.1, 0.1, mG, 0, 0.2, 0.3, t);

        // Head (Small, low)
        this.box(0.3, 0.2, 0.3, mRock, 0, 0.45, 0, t);

        // Arms (Massive)
        const ag = new THREE.Group(); ag.position.y = 0.2; t.add(ag);

        const leftArm = new THREE.Group(); leftArm.position.set(-0.6, 0, 0); ag.add(leftArm);
        this.box(0.25, 0.9, 0.25, mRock, 0, -0.3, 0, leftArm);

        const rightArm = new THREE.Group(); rightArm.position.set(0.6, 0, 0); ag.add(rightArm);
        this.box(0.25, 0.9, 0.25, mRock, 0, -0.3, 0, rightArm);

        // Slow heavy swing
        leftArm.userData.idle = true; leftArm.userData.swing = { axis: 'x', speed: 0.5, amp: 0.3, base: 0 };
        rightArm.userData.idle = true; rightArm.userData.swing = { axis: 'x', speed: 0.5, amp: 0.3, base: 0, offset: Math.PI };

        g.scale.set(s, s, s); return { mesh: g, weapon: t };
    },

    createWraith(c, s = 1) { // Floating Ghost
        const g = new THREE.Group();
        const mVoid = new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.8 });
        const mG = new THREE.MeshBasicMaterial({ color: c || 0xaa00ff });

        // Float
        g.userData.idle = true;
        g.userData.float = true; g.userData.baseY = 0.5; g.userData.idleSpeed = 2; g.userData.idleAmp = 0.2;

        // Torn Robes (Particles essentially)
        for (let i = 0; i < 8; i++) {
            const shard = this.box(0.1 + Math.random() * 0.2, 0.5 + Math.random() * 0.5, 0.05, mVoid,
                (Math.random() - 0.5) * 0.5, 0.5 + Math.random() * 0.5, (Math.random() - 0.5) * 0.3, g);
            shard.rotation.z = (Math.random() - 0.5);
            shard.userData.idle = true; shard.userData.pulse = { speed: 2 + Math.random(), amp: 0.1, base: 1 };
        }

        // Core
        const core = new THREE.Mesh(new THREE.DodecahedronGeometry(0.2, 0), mG);
        core.position.y = 1.2;
        g.add(core);
        core.userData.idle = true; core.userData.rotatorX = 0.1; core.userData.rotatorY = 0.2;

        // Scythe
        const hand = new THREE.Group(); hand.position.set(0.4, 1.0, 0.2); g.add(hand);
        this.box(0.02, 1.2, 0.02, mVoid, 0, 0, 0, hand); // Handle
        const blade = this.box(0.4, 0.05, 0.02, mG, 0.2, 0.5, 0, hand); // Blade
        blade.rotation.z = -0.5;

        hand.userData.idle = true; hand.userData.swing = { axis: 'x', speed: 1, amp: 0.2, base: 0.2 };

        g.scale.set(s, s, s); return { mesh: g, weapon: core };
    },

    createBoss(c, s = 1) { // Placeholder for old bosses
        return this.createMidBoss(c, s, 2);
    },

    createMidBoss(c, s = 1, variant = 0) { // Enhanced mid-bosses
        const g = new THREE.Group();
        const mB = new THREE.MeshStandardMaterial({ color: 0x222, metalness: 0.95, roughness: 0.1 });
        const mG = new THREE.MeshBasicMaterial({ color: c });
        const mGold = new THREE.MeshStandardMaterial({ color: 0xffd700, metalness: 1, roughness: 0.1, emissive: 0x332200 });
        if (variant === 0) { // WARDEN (Floor 25) - Standard Tanky
            this.box(0.25, 0.7, 0.25, mB, -0.3, 0.35, 0, g); this.box(0.25, 0.7, 0.25, mB, 0.3, 0.35, 0, g);
            const t = this.box(0.9, 0.7, 0.5, mB, 0, 1.0, 0, g); this.box(0.35, 0.3, 0.1, mG, 0, 0, 0.26, t);
            const h = this.box(0.4, 0.35, 0.35, mB, 0, 0.55, 0, t); this.box(0.35, 0.1, 0.05, mG, 0, 0.05, 0.18, h);
            this.box(0.15, 0.2, 0.6, mB, -0.55, 0.3, 0, t); this.box(0.15, 0.2, 0.6, mB, 0.55, 0.3, 0, t);
            this.box(0.05, 0.8, 0.5, mGold, -0.7, 0, 0.1, t); // Shield
        } else if (variant === 1) { // EXECUTIONER (Floor 50)
            this.box(0.2, 0.6, 0.2, mB, -0.25, 0.3, 0, g); this.box(0.2, 0.6, 0.2, mB, 0.25, 0.3, 0, g);
            const t = this.box(0.7, 0.6, 0.4, mB, 0, 0.9, 0, g); this.box(0.25, 0.25, 0.1, mG, 0, 0, 0.21, t);
            const h = this.box(0.3, 0.4, 0.3, mB, 0, 0.5, 0, t); this.box(0.28, 0.08, 0.05, mG, 0, 0.1, 0.16, h);
            // Giant axe
            const arm = new THREE.Group(); arm.position.set(0.6, 0.8, 0); g.add(arm);
            this.box(0.15, 0.5, 0.15, mB, 0, -0.2, 0, arm);
            const axe = new THREE.Group(); axe.position.y = -0.5; arm.add(axe);
            this.box(0.08, 1.5, 0.08, mB, 0, 0, 0, axe);
            this.box(0.6, 0.1, 0.4, mGold, 0, 0.6, 0, axe); // Blade
            arm.userData.idle = true; arm.userData.swing = { axis: 'x', speed: 1, amp: 0.3, base: 0.5 };
        } else { // OVERLORD (Floor 75)
            const t = this.box(1.0, 0.8, 0.6, mB, 0, 1.2, 0, g); this.box(0.4, 0.4, 0.1, mG, 0, 0, 0.31, t);
            const ring = new THREE.Mesh(new THREE.TorusGeometry(0.8, 0.05, 8, 24), mGold);
            ring.position.y = 0.5; ring.userData.idle = true; ring.userData.rotatorY = 0.03; t.add(ring);

            // Floating hands
            const h1 = this.box(0.3, 0.6, 0.3, mG, -1.2, 0, 0.5, t);
            h1.userData.idle = true; h1.userData.float = true; h1.userData.baseY = 0; h1.userData.idleSpeed = 2; h1.userData.idleAmp = 0.2;
            const h2 = this.box(0.3, 0.6, 0.3, mG, 1.2, 0, 0.5, t);
            h2.userData.idle = true; h2.userData.float = true; h2.userData.baseY = 0; h2.userData.idleSpeed = 2.2; h2.userData.idleAmp = 0.2;
        }
        g.scale.set(s, s, s); return { mesh: g, weapon: g };
    },

    createReaper(c, s = 1, tier = 0) {
        const g = new THREE.Group();
        const mB = new THREE.MeshStandardMaterial({ color: 0x111, metalness: 0.9, roughness: 0.1 });
        const mG = new THREE.MeshBasicMaterial({ color: c });
        const mScythe = new THREE.MeshStandardMaterial({ color: 0x5500aa, metalness: 1, roughness: 0.1, emissive: 0x220044 });

        // Floating/Bobbing spectral body
        g.userData.idle = true; g.userData.float = true; g.userData.baseY = 0.2; g.userData.idleSpeed = 2; g.userData.idleAmp = 0.1;

        // Torso (Tattered cloak look)
        const t = this.box(0.4, 0.6, 0.3, mB, 0, 0.7, 0, g);
        this.box(0.1, 0.1, 0.1, mG, 0, 0.1, 0.16, t); // Soul heart
        t.userData.idle = true; t.userData.pulse = { speed: 3, amp: 0.05, base: 1 };

        // Head (Hooded)
        const h = this.box(0.3, 0.35, 0.35, mB, 0, 0.55, -0.05, t);
        this.box(0.15, 0.04, 0.05, mG, 0, 0, 0.16, h); // Spectral eyes

        // Cape/Rags
        const cape = this.box(0.5, 0.8, 0.05, mB, 0, -0.2, -0.2, t);
        cape.rotation.x = 0.2;
        cape.userData.idle = true; cape.userData.swing = { axis: 'x', speed: 2, amp: 0.15, base: 0.2 };

        // Arms
        const ag = new THREE.Group(); ag.position.y = 0.2; t.add(ag);
        const leftArm = new THREE.Group(); leftArm.position.set(-0.35, 0, 0.1); ag.add(leftArm);
        this.box(0.1, 0.45, 0.1, mB, 0, -0.2, 0, leftArm);

        const rightArm = new THREE.Group(); rightArm.position.set(0.35, 0, 0.1); ag.add(rightArm);
        this.box(0.1, 0.45, 0.1, mB, 0, -0.2, 0, rightArm);
        rightArm.rotation.x = -0.8; // Holding scythe forward

        // SCYTHE
        const scythe = new THREE.Group(); scythe.position.set(0, -0.4, 0.1); rightArm.add(scythe);
        this.box(0.05, 1.8, 0.05, mB, 0, 0.4, 0, scythe); // Staff
        const blade = new THREE.Group(); blade.position.y = 1.2; scythe.add(blade);
        this.box(0.8, 0.15, 0.03, mScythe, 0.3, 0, 0, blade); // Main blade
        blade.rotation.z = -0.4;

        // Tier effects
        if (tier >= 4) {
            const crown = new THREE.Mesh(new THREE.TorusGeometry(0.15, 0.02, 8, 16), mG);
            crown.position.set(0, 0.3, 0); crown.rotation.x = Math.PI / 2; h.add(crown);
        }
        if (tier >= 7) {
            // Spectral "Wings" (Wisps)
            for (let i = 0; i < 2; i++) {
                const wisp = this.box(0.1, 0.8, 0.1, mG, i === 0 ? -0.4 : 0.4, 0, -0.3, t);
                wisp.userData.idle = true; wisp.userData.swing = { axis: 'y', speed: 4, amp: 0.5, base: 0 };
            }
        }

        g.scale.set(s, s, s); return { mesh: g, weapon: rightArm };
    },

    // NEW: THE ARCHITECT (Floor 100)
    createArchitect(s = 1) {
        const g = new THREE.Group();
        const mGold = new THREE.MeshStandardMaterial({ color: 0xffd700, metalness: 1.0, roughness: 0.1, emissive: 0x332200 });
        const mVoid = new THREE.MeshBasicMaterial({ color: 0x000000 });
        const mGlitch = new THREE.MeshBasicMaterial({ color: 0xff00ff, wireframe: true });

        // The Core (Stable)
        const core = new THREE.Mesh(new THREE.OctahedronGeometry(0.6, 0), mVoid);
        core.position.y = 2.5;
        core.userData.idle = true; core.userData.rotatorY = 0.05; core.userData.pulse = { speed: 5, amp: 0.1, base: 1 };
        g.add(core);

        // Glitch Rings (Will be manipulated by updateGlitch)
        const rings = new THREE.Group(); rings.position.y = 2.5; g.add(rings);

        const r1 = new THREE.Mesh(new THREE.TorusGeometry(1.0, 0.05, 4, 32), mGold);
        r1.userData.isGlitchPart = true;
        rings.add(r1);

        const r2 = new THREE.Mesh(new THREE.TorusGeometry(1.5, 0.08, 4, 4), mGlitch);
        r2.rotation.x = Math.PI / 2;
        r2.userData.isGlitchPart = true;
        rings.add(r2);

        const r3 = new THREE.Mesh(new THREE.BoxGeometry(3, 0.1, 0.1), mGold);
        r3.userData.isGlitchPart = true;
        rings.add(r3);

        // Wings (Floating Cubes)
        for (let i = 0; i < 8; i++) {
            const cube = this.box(0.3, 0.3, 0.3, mGold, 0, 0, 0, null);
            cube.position.set(Math.cos(i * 0.785) * 2, 2.5 + Math.sin(i * 0.785) * 2, 0);
            cube.userData.isGlitchPart = true; // Mark for glitch effect
            g.add(cube);
        }

        g.userData.idle = true; g.userData.float = true; g.userData.baseY = 0; g.userData.idleSpeed = 0.5; g.userData.idleAmp = 0.1;
        g.scale.set(s, s, s);
        return { mesh: g, weapon: core };
    }
};

engine.init();