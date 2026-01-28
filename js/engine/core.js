const engine = {
    scene: null, camera: null, renderer: null, particles: [], shakeIntensity: 0,
    grid: null, ambientLight: null, dirLight: null, // Store references for theme changes

    environment: [], // Store env objects

    // FLOOR THEMES - Increasingly scary every 5 floors
    // FLOOR THEMES - ENHANCED
    floorThemes: [
        { floor: 1, type: 'dungeon', bg: 0x020202, fog: 0x110500, grid1: 0x552211, grid2: 0x221111, ambient: 1.2, name: 'CASTLE DUNGEON' },
        { floor: 20, type: 'cave', bg: 0x050510, fog: 0x050515, grid1: 0x004444, grid2: 0x002222, ambient: 0.7, name: 'DEEP CAVERNS' },
        { floor: 40, type: 'foundry', bg: 0x100500, fog: 0x150500, grid1: 0xff4400, grid2: 0x551100, ambient: 0.8, name: 'MAGMA CORE' },
        { floor: 60, type: 'void', bg: 0x000000, fog: 0x050010, grid1: 0x8800ff, grid2: 0x220055, ambient: 0.6, name: 'DIGITAL VOID' },
        { floor: 80, type: 'sanctum', bg: 0x110022, fog: 0x220033, grid1: 0xffd700, grid2: 0x664400, ambient: 0.8, name: 'CELESTIAL PALACE' },
        { floor: 100, type: 'sanctum', bg: 0xffffff, fog: 0xffd700, grid1: 0xffaa00, grid2: 0xffffff, ambient: 1.0, name: 'THE ARCHITECT' },
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
        this.ambientLight.intensity = theme.ambient;

        // Update CSS body background to match
        document.body.style.background = '#' + theme.bg.toString(16).padStart(6, '0');

        // --- NEW GENERATION SYSTEM ---
        const type = theme.type || 'city';

        // 1. FLOOR
        this.generateFloor(type, theme);

        // 2. PROPS (Mid-range)
        if (this.generateEnvironment) this.generateEnvironment(type);

        // 3. WALLS (Far background)
        this.generateWalls(type, theme);

        // 4. SKY (Dome/Clouds)
        this.generateSky(type, theme);

        // 5. LIFE (Ambient)
        this.generateLife(type);

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
        const matHolo = new THREE.MeshBasicMaterial({ color: 0x00ffaa, transparent: true, opacity: 0.3, wireframe: true });

        if (type === 'dungeon') {
            // --- DUNGEON: Cages, Chains, Rubble ---
            const matIron = new THREE.MeshStandardMaterial({ color: 0x332211, metalness: 0.6, roughness: 0.7 });
            const matWood = new THREE.MeshStandardMaterial({ color: 0x443322, roughness: 0.9 });

            // Hanging Cages
            for (let i = 0; i < 8; i++) {
                const chainLen = 10 + Math.random() * 15;
                const chain = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, chainLen), matIron);
                chain.position.set((Math.random() - 0.5) * 50, 30 - chainLen / 2, -10 - Math.random() * 30);
                this.scene.add(chain); this.environment.push(chain);

                // Cage
                const cage = new THREE.Mesh(new THREE.BoxGeometry(2, 3, 2), matIron);
                cage.material.wireframe = true;
                cage.position.set(0, -chainLen / 2 - 1.5, 0);
                chain.add(cage);

                chain.userData.idle = true;
                chain.userData.swing = { axis: 'z', speed: 1 + Math.random(), amp: 0.05, base: 0 };
            }

            // Rubble / Crates
            for (let i = 0; i < 15; i++) {
                const s = 1 + Math.random();
                const crate = new THREE.Mesh(new THREE.BoxGeometry(s, s, s), matWood);
                crate.position.set((Math.random() - 0.5) * 60, s / 2, -5 - Math.random() * 40);
                crate.rotation.y = Math.random();
                this.scene.add(crate); this.environment.push(crate);
            }
        }
        else if (type === 'city') {
            // --- CITY: Skylines & Holograms ---
            for (let i = 0; i < 30; i++) {
                const h = 5 + Math.random() * 15;
                const w = 1 + Math.random() * 2;
                const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, w), matWall);
                mesh.position.set((Math.random() - 0.5) * 60, h / 2 - 2, -10 - Math.random() * 30);
                this.scene.add(mesh); this.environment.push(mesh);

                // Windows/Neon strips
                if (Math.random() > 0.4) {
                    const neon = new THREE.Mesh(new THREE.BoxGeometry(0.1, h * 0.9, 0.1), matNeon);
                    neon.position.copy(mesh.position);
                    neon.position.z += w / 2 + 0.1;
                    this.scene.add(neon); this.environment.push(neon);
                }

                // Holograms
                if (Math.random() > 0.8) {
                    const holo = new THREE.Mesh(new THREE.PlaneGeometry(3, 4), matHolo);
                    holo.position.set(mesh.position.x, h + 2, mesh.position.z);
                    holo.userData.idle = true;
                    holo.userData.rotatorY = 0.01;
                    this.scene.add(holo); this.environment.push(holo);
                }
            }
            // Traffic (Distant particles)
            for (let i = 0; i < 20; i++) {
                const p = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.2, 0.5), matGlow);
                p.position.set((Math.random() - 0.5) * 80, Math.random() * 10, -30 - Math.random() * 20);
                p.userData.idle = true;
                p.userData.float = true; p.userData.baseY = p.position.y; p.userData.idleSpeed = 2 + Math.random();
                this.scene.add(p); this.environment.push(p);
            }
        }
        else if (type === 'cave') {
            // --- CAVE: Stalactites & Crystals ---
            const matRock = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 1.0 });
            // Ceiling Stalactites
            for (let i = 0; i < 40; i++) {
                const h = 2 + Math.random() * 8;
                const mesh = new THREE.Mesh(new THREE.ConeGeometry(1 + Math.random(), h, 5), matRock);
                mesh.position.set((Math.random() - 0.5) * 60, 20, -5 - Math.random() * 30);
                mesh.rotation.x = Math.PI; // Point down
                this.scene.add(mesh); this.environment.push(mesh);
            }
            // Floor Mites
            for (let i = 0; i < 20; i++) {
                const h = 1 + Math.random() * 5;
                const mesh = new THREE.Mesh(new THREE.ConeGeometry(0.8 + Math.random(), h, 4), matRock);
                mesh.position.set((Math.random() - 0.5) * 50, 0, -5 - Math.random() * 30);
                this.scene.add(mesh); this.environment.push(mesh);
            }
            // Crystals
            const matCrystal = new THREE.MeshBasicMaterial({ color: 0xaa00ff, transparent: true, opacity: 0.8 });
            for (let i = 0; i < 15; i++) {
                const crystal = new THREE.Mesh(new THREE.OctahedronGeometry(0.8), matCrystal);
                crystal.position.set((Math.random() - 0.5) * 50, Math.random() * 8, -5 - Math.random() * 25);
                crystal.userData.idle = true; crystal.userData.pulse = { speed: 1 + Math.random(), amp: 0.2, base: 1 };
                this.scene.add(crystal); this.environment.push(crystal);

                // Glow particle
                if (Math.random() > 0.5) {
                    const glow = new THREE.PointLight(0xaa00ff, 0.5, 5);
                    glow.position.copy(crystal.position);
                    this.scene.add(glow); this.environment.push(glow);
                }
            }
        }
        else if (type === 'foundry') {
            // --- FOUNDRY: Pipes, Gears, Lava ---
            const matMetal = new THREE.MeshStandardMaterial({ color: 0x443322, metalness: 0.7, roughness: 0.4 });
            const matRust = new THREE.MeshStandardMaterial({ color: 0x331100, metalness: 0.4, roughness: 0.9 });

            // Pipes
            for (let i = 0; i < 10; i++) {
                const pipe = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 0.8, 40, 8), matMetal);
                pipe.rotation.z = Math.PI / 2;
                pipe.position.set(0, 8 + Math.random() * 10, -10 - Math.random() * 20);
                this.scene.add(pipe); this.environment.push(pipe);
            }
            // Gears
            const gearGeo = new THREE.CylinderGeometry(3, 3, 0.5, 12);
            for (let i = 0; i < 5; i++) {
                const gear = new THREE.Mesh(gearGeo, matRust);
                gear.position.set((Math.random() - 0.5) * 40, Math.random() * 15, -20);
                gear.rotation.x = Math.PI / 2;
                gear.userData.idle = true; gear.userData.rotatorZ = 0.01 + Math.random() * 0.02;
                this.scene.add(gear); this.environment.push(gear);
            }
            // Vents
            for (let i = 0; i < 8; i++) {
                const vent = new THREE.Mesh(new THREE.BoxGeometry(2, 2, 2), matMetal);
                vent.position.set((Math.random() - 0.5) * 40, 0, -10 - Math.random() * 15);
                this.scene.add(vent); this.environment.push(vent);
                vent.userData.idle = true;
                vent.userData.emitParticles = { color: 0xaaaaaa, size: 0.4, speed: 2.0, spread: 0.5 };
            }
        }
        else if (type === 'sanctum') {
            // --- SANCTUM: Floating Islands & Runes ---
            const matMarble = new THREE.MeshStandardMaterial({ color: 0xeeeeee, roughness: 0.1 });
            const matGold = new THREE.MeshStandardMaterial({ color: 0xffd700, metalness: 0.8, roughness: 0.2 });

            for (let i = 0; i < 12; i++) {
                // Island
                const r = 2 + Math.random() * 3;
                const island = new THREE.Mesh(new THREE.CylinderGeometry(r, 0, 3, 6), matMarble);
                island.position.set((Math.random() - 0.5) * 50, 5 + Math.random() * 10, -10 - Math.random() * 30);
                island.userData.idle = true;
                island.userData.float = true;
                island.userData.baseY = island.position.y; island.userData.idleSpeed = 0.5 + Math.random();
                this.scene.add(island); this.environment.push(island);

                // Pillar/Rune on top
                const pillar = new THREE.Mesh(new THREE.BoxGeometry(0.5, 2, 0.5), matGold);
                pillar.position.copy(island.position); pillar.position.y += 2;
                this.scene.add(pillar); this.environment.push(pillar);
            }
            // Light Shafts
            const matShaft = new THREE.MeshBasicMaterial({ color: 0xffddaa, transparent: true, opacity: 0.1, side: THREE.DoubleSide });
            for (let i = 0; i < 5; i++) {
                const shaft = new THREE.Mesh(new THREE.CylinderGeometry(2, 2, 50, 16, 1, true), matShaft);
                shaft.position.set((Math.random() - 0.5) * 40, 0, -10 - Math.random() * 20);
                this.scene.add(shaft); this.environment.push(shaft);
            }
        }
        else if (type === 'void') {
            // --- VOID: Abstract Geometry ---
            const matWire = new THREE.MeshBasicMaterial({ color: 0x8800ff, wireframe: true });
            const matVoid = new THREE.MeshBasicMaterial({ color: 0x000000 });

            // Floating Cubes
            for (let i = 0; i < 40; i++) {
                const s = 0.5 + Math.random() * 2;
                const mesh = new THREE.Mesh(new THREE.BoxGeometry(s, s, s), Math.random() > 0.5 ? matWire : matVoid);
                mesh.position.set((Math.random() - 0.5) * 60, Math.random() * 20, -5 - Math.random() * 30);

                mesh.userData.idle = true;
                mesh.userData.rotatorX = Math.random() * 0.02;
                mesh.userData.rotatorY = Math.random() * 0.02;

                this.scene.add(mesh); this.environment.push(mesh);
            }
            // Fractals / Rings
            const ringGeo = new THREE.TorusGeometry(5, 0.1, 8, 50);
            for (let i = 0; i < 5; i++) {
                const ring = new THREE.Mesh(ringGeo, matWire);
                ring.position.set(0, 10, -15 - i * 5);
                ring.scale.setScalar(1 + i * 0.5);
                ring.userData.idle = true; ring.userData.rotatorZ = 0.01 * (i % 2 === 0 ? 1 : -1);
                this.scene.add(ring); this.environment.push(ring);
            }
        }
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

                // NEW: Continuous Particle Emitter
                if (obj.userData.emitParticles && Math.random() < (obj.userData.emitChance || 0.1)) {
                    // emit: { color: 0xffffff, size: 0.1, speed: 0.5, spread: 0.2 }
                    const e = obj.userData.emitParticles;
                    const pos = new THREE.Vector3(); obj.getWorldPosition(pos);
                    // Slight offset
                    pos.x += (Math.random() - 0.5) * (e.spread || 0.2);
                    pos.y += (Math.random() - 0.5) * (e.spread || 0.2);
                    pos.z += (Math.random() - 0.5) * (e.spread || 0.2);

                    // Use existing spawnParticles but make it single
                    const pGeo = new THREE.BoxGeometry(e.size || 0.1, e.size || 0.1, e.size || 0.1);
                    const pMat = new THREE.MeshBasicMaterial({ color: e.color || 0xffffff, transparent: true, opacity: 0.8 });
                    const pMesh = new THREE.Mesh(pGeo, pMat);
                    pMesh.position.copy(pos);
                    pMesh.userData.vel = new THREE.Vector3(
                        (Math.random() - 0.5) * 0.2,
                        (Math.random() * (e.speed || 0.5)),
                        (Math.random() - 0.5) * 0.2
                    );
                    this.scene.add(pMesh);
                    this.particles.push(pMesh);
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
        this.updateAmbient(); // NEW: Create life movement

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

    // --- NEW GENERATION FUNCTIONS ---
    generateFloor(type, theme) {
        if (this.floorMesh) { this.scene.remove(this.floorMesh); this.floorMesh = null; }
        if (this.grid) { this.scene.remove(this.grid); this.grid = null; }

        let floorGeo, floorMat;

        if (type === 'dungeon') {
            // Stone Flagstones
            floorGeo = new THREE.PlaneGeometry(200, 200, 40, 40);
            const pos = floorGeo.attributes.position;
            // Uneven stones
            for (let i = 0; i < pos.count; i++) {
                pos.setZ(i, (Math.random() - 0.5) * 0.2);
            }
            floorGeo.computeVertexNormals();
            floorMat = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.9, metalness: 0.2 });

            // Overlay Grid (cracks between stones)
            this.grid = new THREE.GridHelper(200, 40, 0x111111, 0x050505);
            this.grid.position.y = 0.02;
            this.scene.add(this.grid);
        }
        else if (type === 'sewers') {
            // Wet Concrete with Sludge Channels
            floorGeo = new THREE.PlaneGeometry(200, 200, 50, 50);
            const pos = floorGeo.attributes.position;
            for (let i = 0; i < pos.count; i++) {
                // Create a central channel or random unevenness
                const x = pos.getX(i);
                if (Math.abs(x) < 5) pos.setY(i, -2); // Sludge channel
            }
            floorGeo.computeVertexNormals();
            floorMat = new THREE.MeshStandardMaterial({ color: 0x222222, roughness: 0.4, metalness: 0.1 });

            // Sludge Liquid
            const sludgeGeo = new THREE.PlaneGeometry(200, 20, 10, 1);
            const sludge = new THREE.Mesh(sludgeGeo, new THREE.MeshBasicMaterial({ color: 0x00ff22, opacity: 0.6, transparent: true }));
            sludge.rotation.x = -Math.PI / 2;
            sludge.position.y = -1.5;
            this.scene.add(sludge); this.environment.push(sludge);
        }
        else if (type === 'cave') {
            // Displaced Rock
            floorGeo = new THREE.PlaneGeometry(200, 200, 60, 60);
            const pos = floorGeo.attributes.position;
            for (let i = 0; i < pos.count; i++) {
                pos.setZ(i, (Math.random() - 0.5) * 2.0); // Bumpiness
            }
            floorGeo.computeVertexNormals();
            floorMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 1.0 });
        }
        else if (type === 'foundry') {
            // Metal Plating
            floorGeo = new THREE.PlaneGeometry(200, 200, 100, 100);
            floorMat = new THREE.MeshStandardMaterial({ color: 0x221111, metalness: 0.6, roughness: 0.7 });
            this.grid = new THREE.GridHelper(200, 20, 0xff4400, 0x441100); // Glowy lava lines
            this.grid.position.y = 0.05;
            this.scene.add(this.grid);
        }
        else if (type === 'sanctum') {
            // Marble
            floorGeo = new THREE.PlaneGeometry(200, 200, 10, 10);
            floorMat = new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.1, roughness: 0.1 });
            this.grid = new THREE.GridHelper(200, 10, 0xffd700, 0xccccaa);
            this.grid.position.y = 0.05;
            this.scene.add(this.grid);
        }
        else {
            // Void
            floorGeo = new THREE.PlaneGeometry(200, 200, 20, 20);
            floorMat = new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.8 });
            this.grid = new THREE.GridHelper(200, 50, theme.grid1, theme.grid2);
            this.scene.add(this.grid);
        }

        this.floorMesh = new THREE.Mesh(floorGeo, floorMat);
        this.floorMesh.rotation.x = -Math.PI / 2;
        this.floorMesh.position.y = 0;
        this.floorMesh.receiveShadow = true;
        this.scene.add(this.floorMesh);
    },

    generateSky(type, theme) {
        if (this.skyDome) { this.scene.remove(this.skyDome); this.skyDome = null; }

        let colorTop = new THREE.Color(theme.fog).multiplyScalar(0.5);
        let colorBot = new THREE.Color(theme.bg);

        if (type === 'sanctum') { colorTop = new THREE.Color(0x00aaff); colorBot = new THREE.Color(0xffffff); }
        if (type === 'city') { colorTop = new THREE.Color(0x050510); colorBot = new THREE.Color(0x222244); }
        if (type === 'dungeon') { colorTop = new THREE.Color(0x000000); colorBot = new THREE.Color(0x110500); }

        // Simple dome gradient approximated by Vertex Colors? 
        // Or simpler: Huge sphere with BasicMaterial inside out
        const geo = new THREE.SphereGeometry(80, 32, 32);
        geo.scale(-1, 1, 1);
        const mat = new THREE.MeshBasicMaterial({ color: colorBot }); // Gradient hard without shader, stick to fog color

        // For Void, add stars
        if (type === 'void' || type === 'space') {
            // Points
            const starGeo = new THREE.BufferGeometry();
            const starCount = 1000;
            const pos = [];
            for (let i = 0; i < starCount; i++) {
                const r = 60 + Math.random() * 20;
                const theta = Math.random() * Math.PI * 2;
                const phi = Math.acos((Math.random() * 2) - 1);
                pos.push(r * Math.sin(phi) * Math.cos(theta), r * Math.sin(phi) * Math.sin(theta), r * Math.cos(phi));
            }
            starGeo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
            const starMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.3 });
            this.skyDome = new THREE.Points(starGeo, starMat);
        } else {
            this.skyDome = new THREE.Mesh(geo, mat);
        }

        this.scene.add(this.skyDome);
    },

    generateWalls(type, theme) {
        if (this.walls && this.walls.length) { this.walls.forEach(w => this.scene.remove(w)); }
        this.walls = [];

        if (type === 'void') return; // Void has no walls

        const mat = new THREE.MeshStandardMaterial({ color: theme.fog, roughness: 1.0 });

        if (type === 'dungeon') {
            // --- CASTLE WALLS & ARCHES ---
            const matStone = new THREE.MeshStandardMaterial({ color: 0x222222, roughness: 0.9 });
            const matTorch = new THREE.MeshBasicMaterial({ color: 0xffaa00 });

            // Distant Pillars/Arches
            for (let i = 0; i < 16; i++) {
                const angle = (i / 16) * Math.PI * 2;
                const r = 40;
                const x = Math.cos(angle) * r;
                const z = Math.sin(angle) * r;

                // Pillar
                const pillar = new THREE.Mesh(new THREE.BoxGeometry(4, 30, 4), matStone);
                pillar.position.set(x, 15, z);
                pillar.lookAt(0, 0, 0); // Face center
                this.scene.add(pillar); this.walls.push(pillar);

                // Arch top
                if (i % 2 === 0) {
                    const arch = new THREE.Mesh(new THREE.BoxGeometry(10, 2, 4), matStone);
                    arch.position.set(x, 28, z);
                    arch.lookAt(0, 0, 0);
                    // Offset slightly to bridge gap? Simplified for now.
                }

                // Torch on Pillar
                if (i % 2 !== 0) {
                    const torch = new THREE.Mesh(new THREE.BoxGeometry(0.5, 2, 0.5), new THREE.MeshStandardMaterial({ color: 0x553311 }));
                    torch.position.set(x * 0.9, 10, z * 0.9);
                    this.scene.add(torch); this.walls.push(torch);

                    const flame = new THREE.PointLight(0xff6600, 1, 20);
                    flame.position.set(0, 1.2, 0);
                    torch.add(flame);

                    // Flame particle visuals
                    const fMesh = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.3, 0.3), matTorch);
                    fMesh.position.y = 1.2;
                    torch.add(fMesh);
                    fMesh.userData.idle = true; fMesh.userData.pulse = { speed: 10, amp: 0.2, base: 1 };
                }
            }
            return;
        }

        // Distant Cubes
        const count = (type === 'city') ? 20 : 10;
        const dist = 60;

        for (let i = 0; i < count; i++) {
            const h = 20 + Math.random() * 40;
            const w = 10 + Math.random() * 20;
            const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, w), mat);

            const angle = (i / count) * Math.PI * 2;
            const x = Math.cos(angle) * dist + (Math.random() - 0.5) * 10;
            const z = Math.sin(angle) * dist + (Math.random() - 0.5) * 10;

            mesh.position.set(x, h / 2 - 10, z);
            mesh.lookAt(0, 0, 0);
            this.scene.add(mesh);
            this.walls.push(mesh);
        }
    },

    generateLife(type) {
        if (this.ambientLife && this.ambientLife.length) { this.ambientLife.forEach(l => this.scene.remove(l)); }
        this.ambientLife = [];

        let count = 0;
        let geo, mat;
        let behavior = 'fly'; // fly, float

        if (type === 'city' || type === 'foundry') {
            count = 15; // Drones
            geo = new THREE.ConeGeometry(0.2, 0.5, 4);
            geo.rotateX(Math.PI / 2);
            mat = new THREE.MeshBasicMaterial({ color: 0xff0000 });
        } else if (type === 'cave') {
            count = 20; // Bats
            geo = new THREE.BoxGeometry(0.3, 0.05, 0.1); // Wings
            mat = new THREE.MeshBasicMaterial({ color: 0x111111 });
        } else if (type === 'sanctum') {
            count = 10; // Birds
            geo = new THREE.ConeGeometry(0.2, 0.4, 3);
            geo.rotateX(Math.PI / 2);
            mat = new THREE.MeshBasicMaterial({ color: 0xffffff });
        }

        for (let i = 0; i < count; i++) {
            const mesh = new THREE.Mesh(geo, mat);
            mesh.position.set((Math.random() - 0.5) * 80, 10 + Math.random() * 10, (Math.random() - 0.5) * 80);
            mesh.userData.life = {
                velocity: new THREE.Vector3((Math.random() - 0.5) * 0.5, 0, (Math.random() - 0.5) * 0.5),
                type: behavior
            };
            this.scene.add(mesh);
            this.ambientLife.push(mesh);
        }
    },

    updateAmbient() {
        if (!this.ambientLife) return;
        this.ambientLife.forEach(mesh => {
            const v = mesh.userData.life.velocity;
            mesh.position.add(v);
            mesh.lookAt(mesh.position.clone().add(v));

            // Wrap around
            if (mesh.position.x > 50) mesh.position.x = -50;
            if (mesh.position.x < -50) mesh.position.x = 50;
            if (mesh.position.z > 50) mesh.position.z = -50;
            if (mesh.position.z < -50) mesh.position.z = 50;

            // Perlin-ish noise
            v.x += (Math.random() - 0.5) * 0.02;
            v.z += (Math.random() - 0.5) * 0.02;
            v.clampLength(0, 0.3);
        });
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

    // --- VFX SYSTEMS ---
    createVFX(type, pos, options = {}) {
        const pCount = options.count || 20;
        const color = options.color || 0xffffff;
        const speed = options.speed || 1.0;
        const size = options.size || 0.2;

        if (type === 'BURST') {
            // Omnidirectional Explosion
            for (let i = 0; i < pCount; i++) {
                const mesh = new THREE.Mesh(
                    new THREE.BoxGeometry(size, size, size),
                    new THREE.MeshBasicMaterial({ color: color, transparent: true })
                );
                mesh.position.copy(pos);
                // Random spherical velocity
                const theta = Math.random() * Math.PI * 2;
                const phi = Math.acos((Math.random() * 2) - 1);
                const r = 0.1 + Math.random() * speed;

                mesh.userData.vel = new THREE.Vector3(
                    r * Math.sin(phi) * Math.cos(theta),
                    r * Math.sin(phi) * Math.sin(theta),
                    r * Math.cos(phi)
                );
                mesh.userData.rotVel = new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5);
                mesh.userData.decay = 0.02 + Math.random() * 0.03;

                this.scene.add(mesh);
                this.particles.push(mesh);
            }
        }
        else if (type === 'SLASH') {
            // Directional Arc
            const axis = options.axis || new THREE.Vector3(1, 0, 0); // Slash direction
            for (let i = 0; i < pCount; i++) {
                const mesh = new THREE.Mesh(
                    new THREE.BoxGeometry(size * 0.5, size * 2, size * 0.1),
                    new THREE.MeshBasicMaterial({ color: color, transparent: true })
                );
                mesh.position.copy(pos);
                // Offset along slash line
                const offset = (Math.random() - 0.5) * 2;
                mesh.position.addScaledVector(axis, offset);

                // Move outward perpendicular to slash? Or just forward?
                // Visualizing a "wave"
                mesh.userData.vel = new THREE.Vector3(0, 0, speed * (0.5 + Math.random()));
                // Rotate to match direction roughly
                mesh.rotation.z = (Math.random() - 0.5);
                mesh.userData.decay = 0.05 + Math.random() * 0.05; // Fast fade

                this.scene.add(mesh);
                this.particles.push(mesh);
            }
        }
        else if (type === 'BEAM') {
            // Sustained Ray Particles
            // Create a core cylinder
            const beamGeo = new THREE.CylinderGeometry(size, size, speed * 5, 8);
            const beam = new THREE.Mesh(beamGeo, new THREE.MeshBasicMaterial({ color: color, transparent: true, opacity: 0.8 }));
            beam.position.copy(pos);
            beam.rotation.x = Math.PI / 2; // Face forward
            beam.userData.decay = 0.1; // Instant fade (recreated every frame if needed, or singular burst)
            beam.userData.isVFX = true;
            this.scene.add(beam);
            // We handle beam fading manually or via particle system if we push it
            beam.userData.vel = new THREE.Vector3(0, 0, 0);
            this.particles.push(beam);

            // Particles around beam
            for (let i = 0; i < 10; i++) {
                const p = new THREE.Mesh(new THREE.BoxGeometry(size, size, size), new THREE.MeshBasicMaterial({ color: color }));
                p.position.copy(pos);
                p.position.x += (Math.random() - 0.5);
                p.position.y += (Math.random() - 0.5);
                p.position.z += (Math.random() * 5);
                p.userData.decay = 0.05;
                p.userData.vel = new THREE.Vector3(0, 0, 0.5);
                this.scene.add(p);
                this.particles.push(p);
            }
        }
        else if (type === 'VOID') {
            // Implosion
            for (let i = 0; i < pCount; i++) {
                const mesh = new THREE.Mesh(
                    new THREE.OctahedronGeometry(size),
                    new THREE.MeshBasicMaterial({ color: 0x000000, wireframe: true })
                );
                // Start far out
                const r = 2 + Math.random();
                const theta = Math.random() * Math.PI * 2;
                const phi = Math.acos((Math.random() * 2) - 1);

                mesh.position.set(
                    pos.x + r * Math.sin(phi) * Math.cos(theta),
                    pos.y + r * Math.sin(phi) * Math.sin(theta),
                    pos.z + r * Math.cos(phi)
                );

                // Velocity TOWARDS center
                const dir = new THREE.Vector3().subVectors(pos, mesh.position).normalize().multiplyScalar(speed * 0.2);
                mesh.userData.vel = dir;
                mesh.userData.decay = 0.01; // Slow fade

                this.scene.add(mesh);
                this.particles.push(mesh);
            }
        }
        else if (type === 'GLITCH') {
            // Wireframe Cubes & Color Shift
            for (let i = 0; i < pCount; i++) {
                const mesh = new THREE.Mesh(
                    new THREE.BoxGeometry(size, size, size),
                    new THREE.MeshBasicMaterial({ color: (Math.random() > 0.5 ? color : 0x00ff00), wireframe: true })
                );
                mesh.position.copy(pos);
                mesh.position.addScalar((Math.random() - 0.5));

                mesh.userData.vel = new THREE.Vector3((Math.random() - 0.5) * speed, (Math.random() - 0.5) * speed, (Math.random() - 0.5) * speed);
                mesh.userData.decay = 0.1; // Fast flicker

                this.scene.add(mesh);
                this.particles.push(mesh);
            }
            // Screen shake
            this.addShake(0.5);
        }
    },

    spawnParticles(pos, color, count = 10) {
        this.createVFX('BURST', pos, { color: color, count: count, speed: 0.5 });
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
