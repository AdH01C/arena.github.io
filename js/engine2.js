const engine = {
    scene: null,
    camera: null,
    renderer: null,
    uiElements: [],
    environment: [],

    // VFX
    particles: [],
    shakeIntensity: 0,

    init() {
        // Setup Three.js
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);

        // Lights
        const ambient = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(ambient);
        const dirLight = new THREE.DirectionalLight(0xffffff, 1);
        dirLight.position.set(10, 20, 10);
        this.scene.add(dirLight);

        // Background
        this.generateBackground('CITY', 1);

        // Camera Pos
        this.camera.position.set(0, 2, 9); // Lower, tighter
        this.camera.lookAt(0, 1, 0);

        this.animate();

        // Window Resize
        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });
    },

    // --- EFFECT: SCREEN FLASH ---
    screenFlash(color = '#ffffff', duration = 300) {
        const flash = document.createElement('div');
        flash.style.position = 'fixed';
        flash.style.top = '0';
        flash.style.left = '0';
        flash.style.width = '100vw';
        flash.style.height = '100vh';
        flash.style.backgroundColor = color;
        flash.style.opacity = '1';
        flash.style.pointerEvents = 'none';
        flash.style.zIndex = '9999';
        flash.style.transition = `opacity ${duration}ms ease-out`;
        document.body.appendChild(flash);

        // Fade out
        setTimeout(() => {
            flash.style.opacity = '0';
            setTimeout(() => flash.remove(), duration);
        }, 50);
    },

    // --- EFFECT: SCREEN TINT (Color Overlay) ---
    screenTint(color = '#ff0000', opacity = 0.3, duration = 2000) {
        const tint = document.createElement('div');
        tint.style.position = 'fixed';
        tint.style.top = '0';
        tint.style.left = '0';
        tint.style.width = '100vw';
        tint.style.height = '100vh';
        tint.style.backgroundColor = color;
        tint.style.opacity = opacity.toString();
        tint.style.pointerEvents = 'none';
        tint.style.zIndex = '9998';
        tint.style.transition = `opacity ${duration}ms ease-out`;
        document.body.appendChild(tint);

        // Fade out
        setTimeout(() => {
            tint.style.opacity = '0';
            setTimeout(() => tint.remove(), duration);
        }, duration / 2);
    },

    // --- EFFECT: SCREEN SHAKE ---
    shake(amount) {
        this.shakeIntensity = Math.min(this.shakeIntensity + amount, 2.0);
    },

    updateShake() {
        if (this.shakeIntensity > 0) {
            const rx = (Math.random() - 0.5) * this.shakeIntensity;
            const ry = (Math.random() - 0.5) * this.shakeIntensity;
            this.camera.position.x += rx;
            this.camera.position.y += ry;

            this.shakeIntensity *= 0.9; // Decay
            if (this.shakeIntensity < 0.05) this.shakeIntensity = 0;
        } else {
            // Lerp back to center-ish (simplified, assumes generic follow logic usually overrides)
        }
    },

    // --- EFFECT: PARTICLES ---
    spawnParticles(pos, type, color, count) {
        const geo = new THREE.BoxGeometry(0.3, 0.3, 0.3);
        const mat = new THREE.MeshBasicMaterial({ color: color });

        for (let i = 0; i < count; i++) {
            const mesh = new THREE.Mesh(geo, mat);
            // Handle both Vector3 and plain {x,y,z}
            const px = pos.x || 0;
            const py = pos.y || 0;
            const pz = pos.z || 0;

            mesh.position.set(px, py, pz);

            // Velocity based on type
            const v = new THREE.Vector3();
            if (type === 'explode') {
                v.set((Math.random() - 0.5) * 1, (Math.random() - 0.5) * 1, (Math.random() - 0.5) * 1);
            } else if (type === 'smoke') {
                v.set((Math.random() - 0.5) * 0.2, Math.random() * 0.5, 0);
            } else if (type === 'spark') {
                v.set((Math.random() - 0.5) * 0.8, Math.random() * 0.8, 0);
            } else if (type === 'rise') {
                v.set((Math.random() - 0.5) * 0.2, 0.2 + Math.random() * 0.3, 0);
            }

            this.scene.add(mesh);
            this.particles.push({
                mesh,
                v,
                life: 1.0,
                decay: 0.02 + Math.random() * 0.03,
                type
            });
        }
    },

    updateParticles() {
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            p.life -= p.decay;

            p.mesh.position.add(p.v);
            p.mesh.rotation.x += p.v.y;
            p.mesh.rotation.y += p.v.x;
            p.mesh.scale.setScalar(p.life);

            if (p.type === 'smoke') p.v.y *= 0.98; // Drag
            else p.v.y -= 0.02; // Gravity

            if (p.life <= 0) {
                this.scene.remove(p.mesh);
                this.particles.splice(i, 1);
            }
        }
    },

    // --- ENVIRONMENT ---
    generateBackground(theme, levelSeed = 1) {
        // Seeded random helper
        let currentSeed = levelSeed * 9999;
        const random = () => {
            currentSeed = (currentSeed * 9301 + 49297) % 233280;
            return currentSeed / 233280;
        };

        // Clear old
        this.environment.forEach(obj => this.scene.remove(obj));
        this.environment = [];

        // Common Setup
        const X_RANGE = 100;
        const DEPTH_START = -10;
        let floorColor = 0x111111;
        let fogColor = 0xffffff;
        let fogDensity = 0.02;

        if (theme === 'WASTELAND') {
            floorColor = 0x332211; fogColor = 0xffffff; fogDensity = 0.03;
        } else if (theme === 'GLACIER') {
            floorColor = 0x88aabb; fogColor = 0xffffff; fogDensity = 0.015;
        } else if (theme === 'VOLCANO') {
            floorColor = 0x220000; fogColor = 0xffffff; fogDensity = 0.04;
        } else if (theme === 'CYBER') {
            floorColor = 0x001122; fogColor = 0xffffff; fogDensity = 0.02;
        }

        // Apply Fog
        this.scene.fog = new THREE.FogExp2(fogColor, fogDensity);
        this.renderer.setClearColor(fogColor);

        // Floor
        const floorGeo = new THREE.PlaneGeometry(200, 50);
        const floorMat = new THREE.MeshBasicMaterial({ color: floorColor, side: THREE.DoubleSide });
        const floor = new THREE.Mesh(floorGeo, floorMat);
        floor.rotation.x = -Math.PI / 2;
        floor.position.y = 0;
        this.scene.add(floor);
        this.environment.push(floor);

        // THEME GENERATION
        if (theme === 'CITY') {
            const mat = new THREE.MeshBasicMaterial({ color: 0x050510 });
            const matGlow = new THREE.MeshBasicMaterial({ color: 0x00ffff });
            for (let i = 0; i < 40; i++) {
                const w = 2 + random() * 5;
                const h = 10 + random() * 30;
                const d = 2 + random() * 5;
                const x = (random() - 0.5) * X_RANGE;
                const z = DEPTH_START - random() * 40;
                const b = this.createEnvProp(new THREE.BoxGeometry(w, h, d), mat, x, h / 2, z);
                // Neon
                if (random() > 0.5) {
                    this.createEnvProp(new THREE.BoxGeometry(w * 0.8, 0.2, d + 0.1), matGlow, x, b.position.y + (random() - 0.5) * h * 0.8, z);
                }
            }
        } else if (theme === 'WASTELAND') {
            const matRock = new THREE.MeshStandardMaterial({ color: 0x554433, roughness: 0.9 });
            const dirLight = new THREE.DirectionalLight(0xffaa00, 0.5); // Sun styling
            dirLight.position.set(-10, 10, -10); this.scene.add(dirLight); this.environment.push(dirLight);

            for (let i = 0; i < 30; i++) {
                const s = 1 + random() * 6;
                const x = (random() - 0.5) * X_RANGE;
                const z = DEPTH_START - random() * 30;
                const rock = this.createEnvProp(new THREE.DodecahedronGeometry(s, 0), matRock, x, s / 2, z);
                rock.rotation.set(random() * 3, random() * 3, random() * 3);
            }
        } else if (theme === 'GLACIER') {
            const matIce = new THREE.MeshStandardMaterial({ color: 0xaaddff, roughness: 0.1, metalness: 0.8 });
            for (let i = 0; i < 40; i++) {
                const h = 5 + random() * 15;
                const w = 1 + random() * 2;
                const x = (random() - 0.5) * X_RANGE;
                const z = DEPTH_START - random() * 40;
                const spike = this.createEnvProp(new THREE.ConeGeometry(w, h, 4), matIce, x, h / 2 - 2, z);
            }
        } else if (theme === 'VOLCANO') {
            const matRock = new THREE.MeshStandardMaterial({ color: 0x220000, roughness: 1.0 });
            const matLava = new THREE.MeshBasicMaterial({ color: 0xff4400 });
            for (let i = 0; i < 30; i++) {
                const s = 2 + random() * 8;
                const x = (random() - 0.5) * X_RANGE;
                const z = DEPTH_START - random() * 40;
                this.createEnvProp(new THREE.TetrahedronGeometry(s, 0), matRock, x, 0, z);
            }
            // Lava rivers (Strips)
            this.createEnvProp(new THREE.PlaneGeometry(200, 5), matLava, 0, 0.1, -15).rotation.x = -Math.PI / 2;

            // Ash Particles setup (handled by engine update if we wanted, for now just static visuals)
        } else if (theme === 'CYBER') {
            const matGrid = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
            floor.material = matGrid; // Grid floor

            for (let i = 0; i < 50; i++) {
                const s = 1 + random();
                const x = (random() - 0.5) * X_RANGE;
                const y = random() * 20;
                const z = -5 - random() * 40;
                const cube = this.createEnvProp(new THREE.BoxGeometry(s, s, s), matGrid, x, y, z);
                cube.rotation.set(random(), random(), random());
            }
        }
    },

    generateImageBackground(path) {
        // Clear old
        this.environment.forEach(m => this.scene.remove(m));
        this.environment = [];

        const loader = new THREE.TextureLoader();
        loader.load(path, (texture) => {
            // Plane
            const aspect = window.innerWidth / window.innerHeight;
            const geo = new THREE.PlaneGeometry(300 * aspect, 300);
            const mat = new THREE.MeshBasicMaterial({ map: texture, depthWrite: false });
            const mesh = new THREE.Mesh(geo, mat);
            mesh.position.set(20, 20, -50); // Centered roughly
            this.scene.add(mesh);
            this.environment.push(mesh);
        });
    },

    createEnvProp(geo, mat, x, y, z) {
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.set(x, y, z);
        this.scene.add(mesh);
        this.environment.push(mesh);
        return mesh;
    },

    // --- UI HELPERS ---
    createFloatingText(text, pos, color) {
        const div = document.createElement('div');
        div.innerText = text;
        div.style.position = 'absolute';
        div.style.color = color;
        div.style.fontWeight = 'bold';
        div.style.fontSize = '20px';
        div.style.pointerEvents = 'none';
        div.style.textShadow = '0 0 5px #000';
        div.style.transform = 'translate(-50%, -50%)';
        div.style.transition = 'opacity 0.5s';

        document.body.appendChild(div);

        const uiObj = {
            el: div,
            // Convert plain object to Vector3 if needed, or clone if existing
            worldPos: (pos.clone ? pos.clone() : new THREE.Vector3(pos.x, pos.y, pos.z)),
            life: 1.0,
            vy: 2.0 // Float up speed
        };
        this.uiElements.push(uiObj);
    },

    updateEntityUI(entity) {
        if (!entity.hpBar) {
            const div = document.createElement('div');
            div.className = 'hp-bar-container';
            div.style.position = 'absolute';
            div.style.width = '60px';
            div.style.height = '6px';
            div.style.backgroundColor = '#330000';
            div.style.border = '1px solid #000';

            const fill = document.createElement('div');
            fill.className = 'hp-fill';
            fill.style.width = '100%';
            fill.style.height = '100%';
            fill.style.backgroundColor = '#ff0000';
            div.appendChild(fill);

            // Shield Bar Overlay
            const shield = document.createElement('div');
            shield.className = 'shield-fill';
            shield.style.position = 'absolute';
            shield.style.top = '0';
            shield.style.left = '0';
            shield.style.width = '0%';
            shield.style.height = '100%';
            shield.style.backgroundColor = '#00ffff';
            shield.style.opacity = '0.7';
            div.appendChild(shield);

            document.body.appendChild(div);
            entity.hpBar = { el: div, fill: fill, shield: shield };
        }

        if (entity.hpBar && entity.mesh) { // Added entity.mesh check for safety
            const screenPos = this.toScreenPosition(entity.mesh.position); // Assuming toScreenPosition exists or is projectToScreen
            // Hide if off screen
            if (screenPos.z < 0 || screenPos.x < 0 || screenPos.x > window.innerWidth || screenPos.y < 0 || screenPos.y > window.innerHeight) {
                entity.hpBar.el.style.display = 'none';
            } else {
                entity.hpBar.el.style.display = 'block';
                entity.hpBar.el.style.left = (screenPos.x - 30) + 'px'; // Adjust for bar width
                entity.hpBar.el.style.top = (screenPos.y - 40) + 'px'; // Adjust to be above entity

                const pct = Math.max(0, (entity.hp / entity.maxHp) * 100);
                entity.hpBar.fill.style.width = pct + '%';

                // Shield Update
                if (entity.buffs && entity.buffs.shield > 0) {
                    // Shield relative to Max HP visually, or just its own %?
                    // Common: Shield overlays HP. If Shield = 50 and MaxHP = 100, it's 50% width.
                    const sPct = Math.min(100, (entity.buffs.shield / entity.maxHp) * 100);
                    entity.hpBar.shield.style.width = sPct + '%';
                } else {
                    entity.hpBar.shield.style.width = '0%';
                }
            }
        }
    },

    updateUI() {
        // Floating Text
        for (let i = this.uiElements.length - 1; i >= 0; i--) {
            const ui = this.uiElements[i];
            ui.life -= 0.02;
            ui.worldPos.y += 0.05;

            if (ui.life <= 0) {
                ui.el.remove();
                this.uiElements.splice(i, 1);
            } else {
                ui.el.style.opacity = ui.life;
                this.projectToScreen(ui.worldPos, ui.el);
            }
        }
    },

    updateEntityUI(entity) {
        if (entity.hpBar && entity.mesh) {
            const pos = entity.mesh.position.clone();
            pos.y += 1.5; // Above head
            this.projectToScreen(pos, entity.hpBar.el);
        }
    },

    projectToScreen(pos, el) {
        const vector = pos.clone().project(this.camera);
        const x = (vector.x * 0.5 + 0.5) * window.innerWidth;
        const y = (-(vector.y * 0.5) + 0.5) * window.innerHeight;

        el.style.left = x + 'px';
        el.style.top = y + 'px';
    },

    // --- VFX: LIGHTNING ---
    createLightning(start, end, color) {
        const dist = start.distanceTo(end);
        const steps = Math.max(5, Math.floor(dist * 5));
        const points = [];
        const current = start.clone();
        const dir = end.clone().sub(start).normalize();

        for (let i = 0; i <= steps; i++) {
            points.push(current.clone());
            if (i < steps) {
                current.add(dir.clone().multiplyScalar(dist / steps));
                // Jitter
                current.x += (Math.random() - 0.5) * 0.5;
                current.y += (Math.random() - 0.5) * 0.5;
            }
        }
        points.push(end); // Ensure connection

        const geo = new THREE.BufferGeometry().setFromPoints(points);
        const mat = new THREE.LineBasicMaterial({ color: color });
        const line = new THREE.Line(geo, mat);
        this.scene.add(line);

        // Remove after short burst
        setTimeout(() => this.scene.remove(line), 100);
    },

    createPlatform(x, y, w) {
        const geo = new THREE.BoxGeometry(w, 0.5, 4);
        const mat = new THREE.MeshBasicMaterial({ color: 0x444444 });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.set(x, y, 0);
        this.scene.add(mesh);
        this.environment.push(mesh); // Track for cleanup if needed

        // Edges
        const edges = new THREE.EdgesGeometry(geo);
        const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0x00ffff }));
        mesh.add(line);
    },

    animate() {
        requestAnimationFrame(() => this.animate());

        this.updateShake();
        this.updateParticles();
        this.updateUI();

        // GAME LOOP HOOK
        if (typeof game !== 'undefined' && game.update) {
            game.update();
        }

        if (this.camera.position.z > 0 && this.cameraTarget) {
            // Clean follow
            this.camera.position.x += (this.cameraTarget.x - this.camera.position.x) * 0.1;
            this.camera.position.y += (this.cameraTarget.y + 1.0 - this.camera.position.y) * 0.1; // Low view
        }

        this.renderer.render(this.scene, this.camera);
    }
};
