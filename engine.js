const engine = {
    // ... (Keep existing scene, camera, renderer, particles logic) ...
    scene: null, camera: null, renderer: null, particles: [], shakeIntensity: 0,
    grid: null, ambientLight: null, dirLight: null, // Store references for theme changes

    // FLOOR THEMES - Increasingly scary every 5 floors
    floorThemes: [
        { floor: 1,  bg: 0x15151a, fog: 0x15151a, grid1: 0x444444, grid2: 0x222222, ambient: 0.8, name: 'NEON DISTRICT' },
        { floor: 5,  bg: 0x0a0a12, fog: 0x0a0a15, grid1: 0x003366, grid2: 0x001133, ambient: 0.7, name: 'DEEP NETWORK' },
        { floor: 10, bg: 0x0d0008, fog: 0x150010, grid1: 0x440022, grid2: 0x220011, ambient: 0.6, name: 'BLOODCORE' },
        { floor: 15, bg: 0x080808, fog: 0x0a0a0a, grid1: 0x333333, grid2: 0x111111, ambient: 0.5, name: 'THE VOID' },
        { floor: 20, bg: 0x0a0005, fog: 0x150008, grid1: 0x550033, grid2: 0x330011, ambient: 0.5, name: 'CRIMSON HELL' },
        { floor: 25, bg: 0x000a08, fog: 0x001510, grid1: 0x003322, grid2: 0x001a11, ambient: 0.4, name: 'TOXIC ABYSS' },
        { floor: 30, bg: 0x050008, fog: 0x080010, grid1: 0x220044, grid2: 0x110022, ambient: 0.4, name: 'NIGHTMARE REALM' },
        { floor: 35, bg: 0x080500, fog: 0x100800, grid1: 0x442200, grid2: 0x221100, ambient: 0.4, name: 'INFERNO CORE' },
        { floor: 40, bg: 0x030303, fog: 0x050505, grid1: 0x220000, grid2: 0x110000, ambient: 0.3, name: 'DEATH\'S DOMAIN' },
        { floor: 45, bg: 0x020002, fog: 0x030003, grid1: 0x330033, grid2: 0x110011, ambient: 0.3, name: 'THE SINGULARITY' },
        { floor: 50, bg: 0x000000, fog: 0x000000, grid1: 0xff0055, grid2: 0x550022, ambient: 0.3, name: '⚡ AWAKENING ⚡' },
        { floor: 55, bg: 0x050000, fog: 0x080000, grid1: 0x880000, grid2: 0x440000, ambient: 0.25, name: 'BLOOD SANCTUM' },
        { floor: 60, bg: 0x000005, fog: 0x000008, grid1: 0x000088, grid2: 0x000044, ambient: 0.25, name: 'FROZEN ABYSS' },
        { floor: 65, bg: 0x020000, fog: 0x030000, grid1: 0x660022, grid2: 0x330011, ambient: 0.2, name: 'DEMON\'S MAW' },
        { floor: 70, bg: 0x010101, fog: 0x020202, grid1: 0x444400, grid2: 0x222200, ambient: 0.2, name: 'PURGATORY' },
        { floor: 75, bg: 0x000102, fog: 0x000204, grid1: 0x004466, grid2: 0x002233, ambient: 0.2, name: 'DEAD SEA' },
        { floor: 80, bg: 0x020001, fog: 0x030002, grid1: 0x550055, grid2: 0x220022, ambient: 0.15, name: 'ELDRITCH VOID' },
        { floor: 85, bg: 0x010000, fog: 0x020000, grid1: 0x660000, grid2: 0x330000, ambient: 0.15, name: 'HELL\'S HEART' },
        { floor: 90, bg: 0x000001, fog: 0x000002, grid1: 0x003355, grid2: 0x001122, ambient: 0.1, name: 'OBLIVION' },
        { floor: 95, bg: 0x000000, fog: 0x010001, grid1: 0x440044, grid2: 0x110011, ambient: 0.1, name: 'THE END' },
        { floor: 100, bg: 0x000000, fog: 0x000000, grid1: 0xff0000, grid2: 0x880000, ambient: 0.2, name: '💀 FINAL BOSS 💀' },
    ],

    init() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(50, window.innerWidth/window.innerHeight, 0.1, 100);
        this.renderer = new THREE.WebGLRenderer({antialias:true});
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);

        // Initial background
        this.scene.background = new THREE.Color(0x15151a);
        this.scene.fog = new THREE.Fog(0x15151a, 10, 50);

        // Store light references for theme changes
        this.ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
        this.dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
        this.dirLight.position.set(5, 15, 5);
        this.scene.add(this.ambientLight, this.dirLight);

        this.grid = new THREE.GridHelper(100, 100, 0x444444, 0x222222);
        this.scene.add(this.grid);

        this.camera.position.set(0, 5, 13);
        // Inside animate(), replace the static lookAt
        const target = this.cameraTarget || {x:0, y:2, z:0};
        this.camera.lookAt(target.x, target.y, target.z);

        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth/window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });
        this.animate();
    },

    // Add this inside the engine object
    focusCamera(targetPos, offset = {x:0, y:2, z:6}, duration = 800) {
        // If targetPos is null, reset to default view
        const tPos = targetPos ? targetPos : {x:0, y:2, z:0};
        const endPos = { 
            x: tPos.x + offset.x, 
            y: tPos.y + offset.y, 
            z: tPos.z + offset.z 
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
        for(let i = this.floorThemes.length - 1; i >= 0; i--) {
            if(floor >= this.floorThemes[i].floor) {
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

        return theme.name;
    },

    animate() {
        requestAnimationFrame(()=>this.animate());
        
        // Idle Animation (Updated for Architect)
        this.scene.traverse((obj) => {
            if(obj.userData.idle) {
                obj.position.y = obj.userData.baseY + Math.sin(Date.now() * obj.userData.idleSpeed) * obj.userData.idleAmp;
                // Complex rotation for Architect components
                if(obj.userData.rotatorX) obj.rotation.x += obj.userData.rotatorX;
                if(obj.userData.rotatorY) obj.rotation.y += obj.userData.rotatorY;
                if(obj.userData.rotatorZ) obj.rotation.z += obj.userData.rotatorZ;
            }
        });

        // Camera Shake
        if(this.shakeIntensity > 0) {
            const s = this.shakeIntensity;
            this.camera.position.set(
                (Math.random()-0.5)*s, 
                5 + (Math.random()-0.5)*s, 
                13 + (Math.random()-0.5)*s
            );
            this.shakeIntensity *= 0.9;
            if(this.shakeIntensity < 0.05) {
                this.shakeIntensity = 0;
                this.camera.position.set(0, 5, 13);
            }
        }
        this.updateParticles();

        if(typeof game !== 'undefined' && game.enemy && game.floor >= 100) {
            game.bossAiLoop();
        }

        this.renderer.render(this.scene, this.camera);
    },

    tween(obj, prop, target, time, cb) {
        const start = obj[prop];
        const startTime = Date.now();
        function loop() {
            const now = Date.now();
            const p = Math.min((now - startTime)/time, 1);
            const ease = 1 - Math.pow(1 - p, 3);
            obj[prop] = start + (target - start) * ease;
            if(p < 1) requestAnimationFrame(loop);
            else if(cb) cb();
        }
        loop();
    },

    // --- VFX SYSTEMS (Reused from previous step) ---
    addShake(intensity) { this.shakeIntensity = intensity; },
    
    spawnParticles(pos, color, count=15, speed=0.3) {
        const geo = new THREE.BoxGeometry(0.15, 0.15, 0.15);
        const mat = new THREE.MeshBasicMaterial({ color: color });
        for(let i=0; i<count; i++) {
            const mesh = new THREE.Mesh(geo, mat);
            mesh.position.copy(pos);
            mesh.position.x += (Math.random()-0.5); mesh.position.y += (Math.random()-0.5);
            mesh.userData.vel = new THREE.Vector3((Math.random()-0.5), (Math.random()-0.5)+0.5, (Math.random()-0.5)).multiplyScalar(speed);
            this.scene.add(mesh); this.particles.push(mesh);
        }
    },
    spawnShockwave(pos, color, scale=1) {
        const geo = new THREE.RingGeometry(0.1, 0.5, 32);
        const mat = new THREE.MeshBasicMaterial({ color: color, side: THREE.DoubleSide, transparent: true, opacity: 0.8 });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.copy(pos); mesh.lookAt(this.camera.position);
        mesh.userData.type = 'shockwave'; mesh.userData.grow = 0.5 * scale;
        this.scene.add(mesh); this.particles.push(mesh);
    },
    spawnBeam(pos, color, height=5, width=0.5) {
        const geo = new THREE.CylinderGeometry(width, width, height, 16);
        const mat = new THREE.MeshBasicMaterial({ color: color, transparent: true, opacity: 0.9 });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.copy(pos); mesh.position.y += height/2;
        mesh.userData.type = 'beam';
        this.scene.add(mesh); this.particles.push(mesh);
    },
    spawnImplosion(pos, color) {
        const geo = new THREE.SphereGeometry(0.1, 8, 8);
        const mat = new THREE.MeshBasicMaterial({ color: color });
        for(let i=0; i<30; i++) {
            const mesh = new THREE.Mesh(geo, mat);
            mesh.position.set(pos.x + (Math.random()-0.5)*6, pos.y + (Math.random()-0.5)*6, pos.z + (Math.random()-0.5)*6);
            mesh.userData.type = 'implode'; mesh.userData.target = pos.clone();
            this.scene.add(mesh); this.particles.push(mesh);
        }
    },
    spawnMatrix(pos, color) {
        const geo = new THREE.BoxGeometry(0.05, 0.5, 0.05);
        const mat = new THREE.MeshBasicMaterial({ color: color });
        for(let i=0; i<20; i++) {
            const mesh = new THREE.Mesh(geo, mat);
            mesh.position.set(pos.x + (Math.random()-0.5)*3, pos.y + 5 + Math.random()*5, pos.z + (Math.random()-0.5)*3);
            mesh.userData.type = 'rain'; mesh.userData.vel = new THREE.Vector3(0, -0.5, 0);
            this.scene.add(mesh); this.particles.push(mesh);
        }
    },
    updateParticles() {
        for(let i=this.particles.length-1; i>=0; i--) {
            const p = this.particles[i];
            if(p.userData.type === 'shockwave') {
                p.scale.multiplyScalar(1.1); p.material.opacity -= 0.05;
                if(p.material.opacity <= 0) { this.scene.remove(p); this.particles.splice(i, 1); }
            } else if (p.userData.type === 'beam') {
                p.scale.x *= 0.9; p.scale.z *= 0.9; p.material.opacity -= 0.05;
                if(p.material.opacity <= 0) { this.scene.remove(p); this.particles.splice(i, 1); }
            } else if (p.userData.type === 'implode') {
                p.position.lerp(p.userData.target, 0.2);
                if(p.position.distanceTo(p.userData.target) < 0.2) { this.scene.remove(p); this.particles.splice(i, 1); }
            } else if (p.userData.type === 'rain') {
                p.position.add(p.userData.vel);
                if(p.position.y < 0) { this.scene.remove(p); this.particles.splice(i, 1); }
            } else {
                p.position.add(p.userData.vel); p.scale.multiplyScalar(0.92);
                if(p.scale.x < 0.01) { this.scene.remove(p); this.particles.splice(i, 1); }
            }
        }
    }
};

// --- MODELS ---
const Models = {
    box(w, h, d, mat, x, y, z, p) {
        const m = new THREE.Mesh(new THREE.BoxGeometry(w,h,d), mat);
        m.position.set(x,y,z); if(p) p.add(m); return m;
    },
    createHumanoid(c, s=1) {
        const g = new THREE.Group();
        const mB = new THREE.MeshStandardMaterial({color:0x333, metalness:0.8, roughness:0.2});
        const mG = new THREE.MeshBasicMaterial({color:c});
        this.box(0.15,0.6,0.2,mB,-0.2,0.3,0,g); this.box(0.15,0.6,0.2,mB,0.2,0.3,0,g);
        const t = this.box(0.5,0.5,0.4,mB,0,0.7,0,g); this.box(0.2,0.2,0.1,mG,0,0.1,0.21,t);
        const h = this.box(0.3,0.3,0.3,mB,0,0.5,0,t); this.box(0.25,0.05,0.05,mG,0,0,0.16,h);
        const ag = new THREE.Group(); ag.position.y=0.3; t.add(ag);
        const mkArm = (x)=>{const s=new THREE.Group(); s.position.set(x,0,0); ag.add(s);
            this.box(0.15,0.5,0.15,mB,0,-0.3,0,s); this.box(0.1,0.6,0.05,mG,0,0,0.1,s); return s;}
        g.scale.set(s,s,s); return {mesh:g, weapon:mkArm(0.35)};
    },

    // === CLASS-SPECIFIC PLAYER MODELS ===
    createRonin(c, s=1, tier=0) {
        const g = new THREE.Group();
        const mB = new THREE.MeshStandardMaterial({color:0x222, metalness:0.9, roughness:0.1});
        const mG = new THREE.MeshBasicMaterial({color:c});
        const mBlade = new THREE.MeshStandardMaterial({color:0xaaaaff, metalness:1, roughness:0.1, emissive:0x4444aa});
        // Legs
        this.box(0.12,0.5,0.15,mB,-0.15,0.25,0,g); this.box(0.12,0.5,0.15,mB,0.15,0.25,0,g);
        // Torso with glowing core
        const t = this.box(0.4,0.45,0.3,mB,0,0.65,0,g); this.box(0.15,0.15,0.1,mG,0,0,0.16,t);
        // Head with visor
        const h = this.box(0.25,0.25,0.25,mB,0,0.45,0,t); this.box(0.22,0.06,0.05,mG,0,0.02,0.13,h);
        // Scarf/cape (tier dependent)
        if(tier >= 2) { const cape = this.box(0.3,0.5,0.05,mG,0,-0.1,-0.2,t); cape.rotation.x = 0.3; }
        // Arms
        const ag = new THREE.Group(); ag.position.y=0.25; t.add(ag);
        const mkArm = (x)=>{const arm=new THREE.Group(); arm.position.set(x,0,0); ag.add(arm);
            this.box(0.1,0.4,0.1,mB,0,-0.2,0,arm); return arm;}
        mkArm(-0.3);
        const rightArm = mkArm(0.3);
        // Katana
        const katana = new THREE.Group(); katana.position.set(0,-0.3,0.15); rightArm.add(katana);
        this.box(0.03,0.8,0.02,mBlade,0,0.4,0,katana); this.box(0.08,0.08,0.03,mB,0,0,0,katana);
        // Tier effects: shoulder pads, energy wings
        if(tier >= 4) { this.box(0.18,0.08,0.15,mG,-0.3,0.35,0,t); this.box(0.18,0.08,0.15,mG,0.3,0.35,0,t); }
        if(tier >= 7) {
            const wing1 = this.box(0.02,0.4,0.3,mG,-0.35,0.3,-0.15,t); wing1.rotation.z = 0.3;
            const wing2 = this.box(0.02,0.4,0.3,mG,0.35,0.3,-0.15,t); wing2.rotation.z = -0.3;
        }
        g.scale.set(s,s,s); return {mesh:g, weapon:rightArm};
    },

    createPriest(c, s=1, tier=0) {
        const g = new THREE.Group();
        const mB = new THREE.MeshStandardMaterial({color:0x444, metalness:0.6, roughness:0.3});
        const mG = new THREE.MeshBasicMaterial({color:c});
        const mGold = new THREE.MeshStandardMaterial({color:0xffd700, metalness:1, roughness:0.2, emissive:0x332200});
        // Legs (robed)
        this.box(0.3,0.5,0.25,mB,0,0.25,0,g);
        // Torso - robed with glowing runes
        const t = this.box(0.45,0.5,0.35,mB,0,0.7,0,g);
        this.box(0.1,0.1,0.1,mG,0.12,0.1,0.18,t); this.box(0.1,0.1,0.1,mG,-0.12,0.1,0.18,t);
        // Head with halo
        const h = this.box(0.22,0.25,0.22,mB,0,0.48,0,t); this.box(0.18,0.08,0.05,mG,0,0.02,0.12,h);
        // Halo (tier dependent)
        if(tier >= 3) {
            const halo = new THREE.Mesh(new THREE.TorusGeometry(0.2,0.02,8,16), mGold);
            halo.position.set(0,0.2,0); halo.rotation.x = Math.PI/2; h.add(halo);
        }
        // Arms
        const ag = new THREE.Group(); ag.position.y=0.3; t.add(ag);
        const mkArm = (x)=>{const arm=new THREE.Group(); arm.position.set(x,0,0); ag.add(arm);
            this.box(0.12,0.45,0.12,mB,0,-0.25,0,arm); return arm;}
        mkArm(-0.32);
        const rightArm = mkArm(0.32);
        // Staff
        const staff = new THREE.Group(); staff.position.set(0,-0.3,0.1); rightArm.add(staff);
        this.box(0.04,1.0,0.04,mGold,0,0.5,0,staff);
        const orb = new THREE.Mesh(new THREE.SphereGeometry(0.1,8,8), mG); orb.position.y=1.05; staff.add(orb);
        // Wings at higher tiers
        if(tier >= 6) {
            for(let i=0;i<2;i++) {
                const w = this.box(0.02,0.5,0.4,mG,(i===0?-1:1)*0.35,0.2,-0.2,t);
                w.rotation.z = (i===0?1:-1)*0.4; w.rotation.y = (i===0?1:-1)*0.2;
            }
        }
        g.scale.set(s,s,s); return {mesh:g, weapon:rightArm};
    },

    createMech(c, s=1, tier=0) {
        const g = new THREE.Group();
        const mB = new THREE.MeshStandardMaterial({color:0x555, metalness:0.95, roughness:0.1});
        const mG = new THREE.MeshBasicMaterial({color:c});
        const mDark = new THREE.MeshStandardMaterial({color:0x222, metalness:0.9, roughness:0.2});
        // Heavy legs
        this.box(0.2,0.5,0.2,mB,-0.22,0.25,0,g); this.box(0.2,0.5,0.2,mB,0.22,0.25,0,g);
        this.box(0.25,0.15,0.3,mDark,-0.22,0.08,0,g); this.box(0.25,0.15,0.3,mDark,0.22,0.08,0,g);
        // Heavy torso
        const t = this.box(0.7,0.55,0.45,mB,0,0.75,0,g);
        this.box(0.25,0.2,0.1,mG,0,0,0.23,t); 
        // Head - visor style
        const h = this.box(0.28,0.22,0.25,mDark,0,0.45,0,t); this.box(0.24,0.08,0.05,mG,0,0,0.13,h);
        // Shoulder cannons (tier dependent)
        if(tier >= 2) { this.box(0.15,0.15,0.3,mDark,-0.5,0.35,0,t); this.box(0.15,0.15,0.3,mDark,0.5,0.35,0,t); }
        if(tier >= 5) { this.box(0.08,0.08,0.2,mG,-0.5,0.35,0.2,t); this.box(0.08,0.08,0.2,mG,0.5,0.35,0.2,t); }
        // Arms
        const ag = new THREE.Group(); ag.position.y=0.3; t.add(ag);
        const mkArm = (x)=>{const arm=new THREE.Group(); arm.position.set(x,0,0); ag.add(arm);
            this.box(0.18,0.45,0.18,mB,0,-0.25,0,arm); return arm;}
        mkArm(-0.5);
        const rightArm = mkArm(0.5);
        // Gatling gun
        const gun = new THREE.Group(); gun.position.set(0,-0.35,0.15); rightArm.add(gun);
        this.box(0.12,0.12,0.4,mDark,0,0,0.15,gun);
        for(let i=0;i<4;i++) { this.box(0.03,0.03,0.3,mB,Math.cos(i*1.57)*0.05,Math.sin(i*1.57)*0.05,0.25,gun); }
        // Backpack at higher tiers
        if(tier >= 4) { this.box(0.5,0.4,0.2,mDark,0,0.1,-0.35,t); }
        if(tier >= 7) {
            this.box(0.1,0.6,0.1,mG,-0.2,0.4,-0.45,t); this.box(0.1,0.6,0.1,mG,0.2,0.4,-0.45,t);
        }
        g.scale.set(s,s,s); return {mesh:g, weapon:rightArm};
    },

    createShadow(c, s=1, tier=0) {
        const g = new THREE.Group();
        const mB = new THREE.MeshStandardMaterial({color:c || 0x110011, metalness:0.3, roughness:0.8});
        const mG = new THREE.MeshBasicMaterial({color:0x00ff00}); 
        const mD = new THREE.MeshStandardMaterial({color:0x000000, metalness:0.5, roughness:0.5});
        const mP = new THREE.MeshBasicMaterial({color:0xaa00ff}); 
        // Slim legs
        this.box(0.1,0.5,0.1,mB,-0.12,0.25,0,g); this.box(0.1,0.5,0.1,mB,0.12,0.25,0,g);
        // Torso
        const t = this.box(0.35,0.4,0.2,mB,0,0.7,0,g);
        this.box(0.1,0.1,0.05,mG,0,0,0.11,t);
        // Hood
        const hood = this.box(0.3,0.25,0.28,mD,0,0.45,0,t);
        this.box(0.25,0.15,0.05,mG,0,-0.02,0.14,hood);
        // Cloak
        if(tier >= 1) { this.box(0.4,0.5,0.05,mD,0,-0.15,-0.12,t); }
        if(tier >= 3) { this.box(0.45,0.6,0.05,mD,0,-0.2,-0.14,t); }
        // Arms
        const ag = new THREE.Group(); ag.position.y=0.25; t.add(ag);
        const mkArm = (x)=>{const arm=new THREE.Group(); arm.position.set(x,0,0); ag.add(arm);
            this.box(0.08,0.35,0.08,mB,0,-0.18,0,arm); return arm;}
        mkArm(-0.25);
        const rightArm = mkArm(0.25);
        // Daggers
        const dagger1 = new THREE.Group(); dagger1.position.set(0,-0.3,0.1); rightArm.add(dagger1);
        this.box(0.02,0.02,0.25,mD,0,0,0.1,dagger1); this.box(0.01,0.01,0.2,mG,0,0,0.15,dagger1);
        // Smoke
        if(tier >= 4) {
            for(let i=0;i<3;i++) {
                const smoke = new THREE.Mesh(new THREE.SphereGeometry(0.08,6,6), mP);
                smoke.position.set((Math.random()-0.5)*0.4, -0.1 + i*0.15, -0.2); t.add(smoke);
            }
        }
        if(tier >= 6) {
            const wing1 = this.box(0.02,0.4,0.3,mP,-0.25,0.3,-0.2,t); wing1.rotation.z = -0.3;
            const wing2 = this.box(0.02,0.4,0.3,mP,0.25,0.3,-0.2,t); wing2.rotation.z = 0.3;
        }
        if(tier >= 8) {
            const aura = new THREE.Mesh(new THREE.TorusGeometry(0.4,0.03,8,16), mG);
            aura.rotation.x = Math.PI/2; aura.position.y = 0; g.add(aura);
        }
        g.scale.set(s,s,s); return {mesh:g, weapon:rightArm};
    },

    createBrawler(c, s=1, tier=0) {
        const g = new THREE.Group();
        const mB = new THREE.MeshStandardMaterial({color:c || 0xff4400, metalness:0.4, roughness:0.6});
        const mG = new THREE.MeshBasicMaterial({color:0xff6600}); 
        const mD = new THREE.MeshStandardMaterial({color:0x333333, metalness:0.7, roughness:0.3});
        const mW = new THREE.MeshBasicMaterial({color:0xffcc00}); 
        // Legs
        this.box(0.14,0.5,0.14,mB,-0.15,0.25,0,g); this.box(0.14,0.5,0.14,mB,0.15,0.25,0,g);
        // Torso
        const t = this.box(0.45,0.45,0.25,mB,0,0.72,0,g); this.box(0.15,0.08,0.05,mG,0,0.1,0.13,t);
        // Head
        const h = this.box(0.2,0.22,0.2,mB,0,0.38,0,t); this.box(0.22,0.06,0.05,mG,0,0,0.1,h);
        // Pads
        if(tier >= 2) { this.box(0.12,0.1,0.12,mD,-0.32,0.25,0,t); this.box(0.12,0.1,0.12,mD,0.32,0.25,0,t); }
        // Belt
        if(tier >= 4) { this.box(0.5,0.08,0.28,mW,0,-0.15,0,t); }
        // Arms
        const ag = new THREE.Group(); ag.position.y=0.25; t.add(ag);
        const mkArm = (x)=>{const arm=new THREE.Group(); arm.position.set(x,0,0); ag.add(arm);
            this.box(0.12,0.4,0.12,mB,0,-0.2,0,arm); return arm;}
        const leftArm = mkArm(-0.32); const rightArm = mkArm(0.32);
        // Gloves
        this.box(0.14,0.12,0.14,mG,0,-0.35,0.05,leftArm); this.box(0.14,0.12,0.14,mG,0,-0.35,0.05,rightArm);
        // Aura
        if(tier >= 6) {
            for(let i=0;i<5;i++) {
                const flame = new THREE.Mesh(new THREE.ConeGeometry(0.05,0.15,4), mG);
                flame.position.set((Math.random()-0.5)*0.4, 0.5 + Math.random()*0.2, -0.15); t.add(flame);
            }
        }
        if(tier >= 8) {
            const aura = new THREE.Mesh(new THREE.TorusGeometry(0.5,0.04,8,16), mW);
            aura.rotation.x = Math.PI/2; aura.position.y = 0; g.add(aura);
        }
        g.scale.set(s,s,s); return {mesh:g, weapon:rightArm};
    },

    createGunslinger(c, s=1, tier=0) {
        const g = new THREE.Group();
        const mB = new THREE.MeshStandardMaterial({color:0x332211, metalness:0.3, roughness:0.8});
        const mG = new THREE.MeshBasicMaterial({color:c || 0xffaa00});
        const mS = new THREE.MeshStandardMaterial({color:0x222222, metalness:0.2, roughness:0.9});
        const mGun = new THREE.MeshStandardMaterial({color:0x888888, metalness:0.9, roughness:0.2});
        // Legs
        this.box(0.12,0.5,0.14,mS,-0.15,0.25,0,g); this.box(0.12,0.5,0.14,mS,0.15,0.25,0,g);
        this.box(0.05,0.15,0.1,mB,-0.23,0.35,0,g); this.box(0.05,0.15,0.1,mB,0.23,0.35,0,g);
        // Torso
        const t = this.box(0.4,0.45,0.25,mS,0,0.65,0,g); this.box(0.42,0.5,0.1,mB,0,0.3,-0.15,t);
        // Head
        const h = this.box(0.2,0.22,0.2,mS,0,0.35,0,t);
        this.box(0.5,0.02,0.5,mB,0,0.1,0,h); this.box(0.25,0.15,0.25,mB,0,0.18,0,h);
        this.box(0.08,0.05,0.02,mG,0.05,0.05,0.11,h);
        if(tier >= 2) { const poncho = this.box(0.45,0.2,0.3,mB,0,0.15,0,t); poncho.rotation.z = -0.1; }
        // Arms
        const ag = new THREE.Group(); ag.position.y=0.25; t.add(ag);
        const mkArm = (x)=>{const arm=new THREE.Group(); arm.position.set(x,0,0); ag.add(arm);
            this.box(0.1,0.4,0.1,mB,0,-0.2,0,arm); return arm;}
        const leftArm = mkArm(-0.3); const rightArm = mkArm(0.3);
        // Gun
        const gun = new THREE.Group(); gun.position.set(0,-0.35,0.1); rightArm.add(gun);
        this.box(0.04,0.1,0.03,mB,0,-0.05,0,gun); this.box(0.05,0.05,0.25,mGun,0,0,0.1,gun); this.box(0.06,0.06,0.08,mS,0,0,0,gun);
        if(tier >= 4) { const gun2 = gun.clone(); leftArm.add(gun2); }
        if(tier >= 6) { rightArm.children[0].material = mGun; this.box(0.11,0.3,0.02,mG,0,-0.2,0.05,rightArm); }
        if(tier >= 8) { const drone = new THREE.Mesh(new THREE.SphereGeometry(0.1,8,8), mG); drone.position.set(0.5, 0.5, -0.3); t.add(drone); }
        g.scale.set(s,s,s); return {mesh:g, weapon:rightArm};
    },

    createKnight(c, s=1, tier=0) {
        const g = new THREE.Group();
        const mArmor = new THREE.MeshStandardMaterial({color:0x888888, metalness:0.8, roughness:0.2});
        const mGold = new THREE.MeshStandardMaterial({color:0xffd700, metalness:1.0, roughness:0.3});
        const mG = new THREE.MeshBasicMaterial({color:c || 0x00aaff});
        const mDark = new THREE.MeshStandardMaterial({color:0x222222, metalness:0.5, roughness:0.5});
        // Body
        this.box(0.18,0.5,0.18,mArmor,-0.2,0.25,0,g); this.box(0.18,0.5,0.18,mArmor,0.2,0.25,0,g);
        const t = this.box(0.6,0.5,0.35,mArmor,0,0.7,0,g); this.box(0.2,0.2,0.1,mG,0,0.05,0.18,t);
        const h = this.box(0.25,0.3,0.25,mArmor,0,0.45,0,t); this.box(0.26,0.04,0.1,mG,0,0,0.1,h);
        if(tier >= 2) { this.box(0.02,0.15,0.2,mG,0,0.22,0,h); }
        const pSize = 0.2 + (tier * 0.02);
        this.box(pSize,pSize,pSize,mArmor,-0.45,0.25,0,t); this.box(pSize,pSize,pSize,mArmor,0.45,0.25,0,t);
        if(tier >= 4) { const cape = this.box(0.5,0.7,0.05,mG,0,-0.1,-0.2,t); cape.rotation.x = 0.2; }
        // Arms
        const ag = new THREE.Group(); ag.position.y=0.25; t.add(ag);
        const mkArm = (x)=>{const arm=new THREE.Group(); arm.position.set(x,0,0); ag.add(arm);
            this.box(0.15,0.4,0.15,mDark,0,-0.2,0,arm); return arm;}
        const leftArm = mkArm(-0.4); const rightArm = mkArm(0.4);
        // Sword
        const sword = new THREE.Group(); sword.position.set(0,-0.3,0.1); rightArm.add(sword);
        this.box(0.04,0.15,0.04,mDark,0,-0.07,0,sword); this.box(0.15,0.02,0.08,mGold,0,0,0,sword);
        const bladeLen = 0.8 + (tier * 0.05); this.box(0.08,bladeLen,0.02,mArmor,0,bladeLen/2,0,sword);
        if(tier >= 6) this.box(0.02,bladeLen,0.03,mG,0,bladeLen/2,0,sword);
        // Shield
        const shieldGroup = new THREE.Group(); shieldGroup.position.set(0,-0.2,0.2); leftArm.add(shieldGroup);
        const sW = 0.4+(tier*0.03), sH=0.5+(tier*0.03);
        this.box(sW,sH,0.05,mArmor,0,0,0,shieldGroup);
        if(tier >= 3) this.box(sW*0.8,sH*0.8,0.06,mG,0,0,0.02,shieldGroup);
        if(tier >= 8) { const holo = this.box(0.8,1.0,0.02,mG,0,0,0.2,shieldGroup); holo.material.transparent = true; holo.material.opacity = 0.5; }
        g.scale.set(s,s,s); return {mesh:g, weapon:rightArm};
    },

    createHacker(c, s=1, tier=0) {
        const g = new THREE.Group();
        const mDark = new THREE.MeshStandardMaterial({color:0x111111, metalness:0.8, roughness:0.2});
        const mCode = new THREE.MeshBasicMaterial({color:c || 0x00ff00});
        const mScreen = new THREE.MeshBasicMaterial({color:0x000000});
        // Legs
        if(tier < 7) { this.box(0.12,0.5,0.12,mDark,-0.15,0.25,0,g); this.box(0.12,0.5,0.12,mDark,0.15,0.25,0,g); }
        else { for(let i=0; i<5; i++) { const bit = this.box(0.15-(i*0.03), 0.15, 0.15-(i*0.03), mCode, 0, 0.4-(i*0.15), 0, g); bit.rotation.y = i * 0.5; } }
        // Torso
        const t = this.box(0.4,0.45,0.25,mDark,0,0.65,0,g);
        this.box(0.02,0.3,0.02,mCode,-0.1,0,0.13,t); this.box(0.02,0.3,0.02,mCode,0.1,0,0.13,t); this.box(0.02,0.3,0.02,mCode,0,0,0.13,t);
        // Head
        const h = new THREE.Group(); h.position.set(0,0.4,0); t.add(h);
        this.box(0.35,0.25,0.2,mDark,0,0,0,h); this.box(0.3,0.2,0.05,mScreen,0,0,0.08,h);
        if(tier >= 9) this.box(0.1,0.1,0.06,mCode,0,0,0.08,h); else { this.box(0.05,0.05,0.06,mCode,-0.08,0,0.08,h); this.box(0.05,0.05,0.06,mCode,0.08,0,0.08,h); }
        if(tier < 7) this.box(0.4,0.3,0.25,mDark,0,0.05,-0.05,h);
        // Extras
        if(tier >= 4) { const cable = this.box(0.02,0.6,0.02,mCode,0,-0.3,-0.2,t); cable.rotation.x = 0.5; }
        if(tier >= 6) { this.box(0.1,0.5,0.4,mDark,-0.4,0.2,-0.2,t); this.box(0.1,0.5,0.4,mDark,0.4,0.2,-0.2,t); }
        // Arms & Rig
        const ag = new THREE.Group(); ag.position.y=0.25; t.add(ag);
        const mkArm = (x)=>{const arm=new THREE.Group(); arm.position.set(x,0,0); ag.add(arm); this.box(0.1,0.4,0.1,mDark,0,-0.2,0,arm); return arm;}
        const leftArm = mkArm(-0.3); const rightArm = mkArm(0.3);
        leftArm.rotation.x = -0.5; leftArm.rotation.z = -0.2; rightArm.rotation.x = -0.5; rightArm.rotation.z = 0.2;
        const rig = new THREE.Group(); rig.position.set(0,-0.3,0.4); t.add(rig);
        if(tier < 5) { this.box(0.5,0.02,0.3,mDark,0,0,0,rig); const keys=this.box(0.45,0.02,0.25,mCode,0,0.01,0,rig); keys.material.transparent=true; keys.material.opacity=0.5; }
        else { const cube=this.box(0.25,0.25,0.25,mCode,0,0,0,rig); cube.rotation.y=0.7; cube.rotation.x=0.5; this.box(0.2,0.2,0.2,mScreen,0,0,0,rig); }
        g.scale.set(s,s,s); return {mesh:g, weapon:rightArm};
    },
    
    // === ENEMY MODELS ===
    createDrone(c, s=1) {
        const g = new THREE.Group();
        const mB = new THREE.MeshStandardMaterial({color:0x444}); const mG = new THREE.MeshBasicMaterial({color:c});
        const core = this.box(0.4,0.4,0.4,mB,0,1.2,0,g); this.box(0.2,0.2,0.2,mG,0,0,0.15,core);
        this.box(0.6,0.05,0.1,mB,0,0.3,0,core); g.userData.rotatorY=0.05;
        g.scale.set(s,s,s); return {mesh:g, weapon:core};
    },

    createSentinel(c, s=1) { // Tall bipedal enemy
        const g = new THREE.Group();
        const mB = new THREE.MeshStandardMaterial({color:0x333, metalness:0.8, roughness:0.2});
        const mG = new THREE.MeshBasicMaterial({color:c});
        // Long legs
        this.box(0.1,0.8,0.1,mB,-0.15,0.4,0,g); this.box(0.1,0.8,0.1,mB,0.15,0.4,0,g);
        // Slim torso
        const t = this.box(0.35,0.4,0.25,mB,0,1.0,0,g); this.box(0.15,0.15,0.1,mG,0,0,0.13,t);
        // Angular head
        const h = this.box(0.2,0.3,0.2,mB,0,0.35,0,t); this.box(0.18,0.05,0.05,mG,0,0.05,0.11,h);
        // Blade arms
        this.box(0.05,0.5,0.1,mG,-0.25,-0.1,0,t); this.box(0.05,0.5,0.1,mG,0.25,-0.1,0,t);
        g.scale.set(s,s,s); return {mesh:g, weapon:t};
    },

    createTank(c, s=1) { // Heavy armored enemy
        const g = new THREE.Group();
        const mB = new THREE.MeshStandardMaterial({color:0x444, metalness:0.9, roughness:0.1});
        const mG = new THREE.MeshBasicMaterial({color:c});
        // Treads
        this.box(0.2,0.3,0.6,mB,-0.35,0.15,0,g); this.box(0.2,0.3,0.6,mB,0.35,0.15,0,g);
        // Hull
        const t = this.box(0.6,0.4,0.5,mB,0,0.5,0,g); this.box(0.3,0.2,0.1,mG,0,0.05,0.26,t);
        // Turret
        const turret = this.box(0.35,0.25,0.35,mB,0,0.35,0,t);
        this.box(0.08,0.08,0.4,mG,0,0,0.3,turret);
        g.scale.set(s,s,s); return {mesh:g, weapon:turret};
    },

    createSpider(c, s=1) { // Multi-legged enemy
        const g = new THREE.Group();
        const mB = new THREE.MeshStandardMaterial({color:0x333, metalness:0.7, roughness:0.3});
        const mG = new THREE.MeshBasicMaterial({color:c});
        // Body
        const body = this.box(0.5,0.25,0.4,mB,0,0.5,0,g);
        this.box(0.2,0.15,0.1,mG,0,0.05,0.21,body);
        // Legs (4 pairs)
        for(let i=0;i<4;i++) {
            const xOff = (i-1.5)*0.15;
            const leg1 = this.box(0.04,0.4,0.04,mB,-0.3+xOff,0,-0.1+i*0.08,body); leg1.rotation.z = 0.8;
            const leg2 = this.box(0.04,0.4,0.04,mB,0.3-xOff,0,-0.1+i*0.08,body); leg2.rotation.z = -0.8;
        }
        // Eyes
        this.box(0.08,0.08,0.05,mG,-0.1,0.1,0.21,body); this.box(0.08,0.08,0.05,mG,0.1,0.1,0.21,body);
        g.scale.set(s,s,s); return {mesh:g, weapon:body};
    },

    createFloater(c, s=1) { // Floating orb with tentacles
        const g = new THREE.Group();
        const mB = new THREE.MeshStandardMaterial({color:0x222, metalness:0.8, roughness:0.2});
        const mG = new THREE.MeshBasicMaterial({color:c});
        // Main orb
        const orb = new THREE.Mesh(new THREE.SphereGeometry(0.35,12,12), mB);
        orb.position.y = 1.2; g.add(orb);
        // Eye
        const eye = new THREE.Mesh(new THREE.SphereGeometry(0.15,8,8), mG);
        eye.position.z = 0.25; orb.add(eye);
        // Tentacles
        for(let i=0;i<5;i++) {
            const tent = this.box(0.04,0.5,0.04,mB,Math.cos(i*1.26)*0.2,-0.4,Math.sin(i*1.26)*0.2,orb);
            tent.rotation.x = 0.3; tent.rotation.z = Math.cos(i*1.26)*0.3;
        }
        g.userData.rotatorY = 0.02;
        g.scale.set(s,s,s); return {mesh:g, weapon:orb};
    },

    createBoss(c, s=1) {
        const g = new THREE.Group();
        const mB = new THREE.MeshStandardMaterial({color:0x111, metalness:1}); const mG = new THREE.MeshBasicMaterial({color:c || 0xff0000});
        const t = this.box(0.8,0.8,0.6,mB,0,1.0,0,g); this.box(0.4,0.4,0.1,mG,0,0,0.31,t);
        this.box(0.5,0.5,0.5,mB,-0.7,0.2,0,t); this.box(0.5,0.5,0.5,mB,0.7,0.2,0,t);
        g.scale.set(s,s,s); return {mesh:g, weapon:t};
    },

    createMidBoss(c, s=1, variant=0) { // Enhanced mid-bosses
        const g = new THREE.Group();
        const mB = new THREE.MeshStandardMaterial({color:0x222, metalness:0.95, roughness:0.1});
        const mG = new THREE.MeshBasicMaterial({color:c});
        const mGold = new THREE.MeshStandardMaterial({color:0xffd700, metalness:1, roughness:0.1, emissive:0x332200});
        if(variant === 0) { // WARDEN (Floor 25)
            this.box(0.25,0.7,0.25,mB,-0.3,0.35,0,g); this.box(0.25,0.7,0.25,mB,0.3,0.35,0,g);
            const t = this.box(0.9,0.7,0.5,mB,0,1.0,0,g); this.box(0.35,0.3,0.1,mG,0,0,0.26,t);
            const h = this.box(0.4,0.35,0.35,mB,0,0.55,0,t); this.box(0.35,0.1,0.05,mG,0,0.05,0.18,h);
            this.box(0.15,0.2,0.6,mB,-0.55,0.3,0,t); this.box(0.15,0.2,0.6,mB,0.55,0.3,0,t);
            this.box(0.05,0.8,0.5,mGold,-0.7,0,0.1,t);
        } else if(variant === 1) { // EXECUTIONER (Floor 50)
            this.box(0.2,0.6,0.2,mB,-0.25,0.3,0,g); this.box(0.2,0.6,0.2,mB,0.25,0.3,0,g);
            const t = this.box(0.7,0.6,0.4,mB,0,0.9,0,g); this.box(0.25,0.25,0.1,mG,0,0,0.21,t);
            const h = this.box(0.3,0.4,0.3,mB,0,0.5,0,t); this.box(0.28,0.08,0.05,mG,0,0.1,0.16,h);
            // Giant axe
            this.box(0.6,0.1,0.4,mGold,0.6,0.1,0,t); this.box(0.08,1.2,0.08,mB,0.6,-0.5,0,t);
        } else { // OVERLORD (Floor 75)
            const t = this.box(1.0,0.8,0.6,mB,0,1.2,0,g); this.box(0.4,0.4,0.1,mG,0,0,0.31,t);
            const ring = new THREE.Mesh(new THREE.TorusGeometry(0.8,0.05,8,24), mGold);
            ring.position.y = 0.5; ring.userData.rotatorY = 0.03; t.add(ring);
            this.box(0.3,1.0,0.15,mG,-0.7,0,0,t); this.box(0.3,1.0,0.15,mG,0.7,0,0,t);
        }
        g.scale.set(s,s,s); return {mesh:g, weapon:g};
    },

    // NEW: THE ARCHITECT (Floor 100)
    createArchitect(s=1) {
        const g = new THREE.Group();
        const mGold = new THREE.MeshStandardMaterial({color:0xffd700, metalness:1.0, roughness:0.1, emissive:0x332200});
        const mVoid = new THREE.MeshBasicMaterial({color:0x000000});

        // Floating Rings
        const r1 = new THREE.Mesh(new THREE.TorusGeometry(0.8, 0.05, 8, 32), mGold);
        r1.position.y = 2; r1.userData.rotatorX = 0.02; r1.userData.rotatorY = 0.02; g.add(r1);

        const r2 = new THREE.Mesh(new THREE.TorusGeometry(1.2, 0.05, 8, 32), mGold);
        r2.position.y = 2; r2.userData.rotatorZ = 0.01; r2.userData.rotatorY = -0.02; g.add(r2);

        // Core
        const core = new THREE.Mesh(new THREE.OctahedronGeometry(0.6, 0), mVoid);
        core.position.y = 2; core.userData.rotatorY = 0.05; g.add(core);

        // Wings
        for(let i=0; i<4; i++) {
            const w = this.box(0.2, 1.5, 0.1, mGold, 0,0,0, null);
            w.position.set(Math.cos(i*1.57)*1.5, 2, Math.sin(i*1.57)*1.5);
            w.lookAt(0,2,0);
            g.add(w);
        }

        g.scale.set(s,s,s);
        return {mesh:g, weapon:core};
    }
};

engine.init();