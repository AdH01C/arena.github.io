const engine = {
    // ... (Keep existing scene, camera, renderer, particles logic) ... 
    scene: null, camera: null, renderer: null, particles: [], shakeIntensity: 0,

    init() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(50, window.innerWidth/window.innerHeight, 0.1, 100);
        this.renderer = new THREE.WebGLRenderer({antialias:true});
        this.renderer.setPixelRatio(window.devicePixelRatio); // ADD THIS LINE
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);
        
        // --- FIX: RESTORE LIGHTER BACKGROUND ---
        // Was 0x050508 (Black), changing back to 0x15151a (Dark Slate Blue)
        this.scene.background = new THREE.Color(0x15151a); 
        this.scene.fog = new THREE.Fog(0x15151a, 10, 50);
        
        // Increase Ambient Light slightly to ensure models pop against the background
        const ambient = new THREE.AmbientLight(0xffffff, 0.8);
        const dir = new THREE.DirectionalLight(0xffffff, 1.2);
        dir.position.set(5, 15, 5);
        this.scene.add(ambient, dir);
        
        const grid = new THREE.GridHelper(100, 100, 0x444444, 0x222222);
        this.scene.add(grid);
        
        this.camera.position.set(0, 5, 13);
        this.camera.lookAt(0, 2, 0);
        
        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth/window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });
        this.animate();
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
        this.box(0.25,0.2,0.1,mG,0,0,0.23,t); // Chest reactor
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
        const mG = new THREE.MeshBasicMaterial({color:0x00ff00}); // Poison green glow
        const mD = new THREE.MeshStandardMaterial({color:0x000000, metalness:0.5, roughness:0.5});
        const mP = new THREE.MeshBasicMaterial({color:0xaa00ff}); // Purple accents

        // Slim legs
        this.box(0.1,0.5,0.1,mB,-0.12,0.25,0,g); this.box(0.1,0.5,0.1,mB,0.12,0.25,0,g);

        // Torso - slim and hooded
        const t = this.box(0.35,0.4,0.2,mB,0,0.7,0,g);
        this.box(0.1,0.1,0.05,mG,0,0,0.11,t); // Small chest glow

        // Hood
        const hood = this.box(0.3,0.25,0.28,mD,0,0.45,0,t);
        this.box(0.25,0.15,0.05,mG,0,-0.02,0.14,hood); // Glowing eyes in hood

        // Tattered cloak (tier dependent)
        if(tier >= 1) {
            this.box(0.4,0.5,0.05,mD,0,-0.15,-0.12,t); // Back cloak
        }
        if(tier >= 3) {
            this.box(0.45,0.6,0.05,mD,0,-0.2,-0.14,t); // Longer cloak
        }

        // Arms
        const ag = new THREE.Group(); ag.position.y=0.25; t.add(ag);
        const mkArm = (x)=>{const arm=new THREE.Group(); arm.position.set(x,0,0); ag.add(arm);
            this.box(0.08,0.35,0.08,mB,0,-0.18,0,arm); return arm;}
        mkArm(-0.25);
        const rightArm = mkArm(0.25);

        // Dual daggers
        const dagger1 = new THREE.Group(); dagger1.position.set(0,-0.3,0.1); rightArm.add(dagger1);
        this.box(0.02,0.02,0.25,mD,0,0,0.1,dagger1);
        this.box(0.01,0.01,0.2,mG,0,0,0.15,dagger1); // Poison edge

        // Smoke/shadow particles at higher tiers
        if(tier >= 4) {
            for(let i=0;i<3;i++) {
                const smoke = new THREE.Mesh(new THREE.SphereGeometry(0.08,6,6), mP);
                smoke.position.set((Math.random()-0.5)*0.4, -0.1 + i*0.15, -0.2);
                t.add(smoke);
            }
        }

        // Spectral wings at high tier
        if(tier >= 6) {
            const wing1 = this.box(0.02,0.4,0.3,mP,-0.25,0.3,-0.2,t);
            wing1.rotation.z = -0.3;
            const wing2 = this.box(0.02,0.4,0.3,mP,0.25,0.3,-0.2,t);
            wing2.rotation.z = 0.3;
        }

        // Death aura at max tier
        if(tier >= 8) {
            const aura = new THREE.Mesh(new THREE.TorusGeometry(0.4,0.03,8,16), mG);
            aura.rotation.x = Math.PI/2;
            aura.position.y = 0;
            g.add(aura);
        }

        g.scale.set(s,s,s); return {mesh:g, weapon:rightArm};
    },

    createBrawler(c, s=1, tier=0) {
        const g = new THREE.Group();
        const mB = new THREE.MeshStandardMaterial({color:c || 0xff4400, metalness:0.4, roughness:0.6});
        const mG = new THREE.MeshBasicMaterial({color:0xff6600}); // Orange glow
        const mD = new THREE.MeshStandardMaterial({color:0x333333, metalness:0.7, roughness:0.3});
        const mW = new THREE.MeshBasicMaterial({color:0xffcc00}); // Golden highlights

        // Strong legs
        this.box(0.14,0.5,0.14,mB,-0.15,0.25,0,g); this.box(0.14,0.5,0.14,mB,0.15,0.25,0,g);

        // Muscular torso
        const t = this.box(0.45,0.45,0.25,mB,0,0.72,0,g);
        this.box(0.15,0.08,0.05,mG,0,0.1,0.13,t); // Chest emblem

        // Head - fighter style
        const h = this.box(0.2,0.22,0.2,mB,0,0.38,0,t);
        this.box(0.22,0.06,0.05,mG,0,0,0.1,h); // Eye visor

        // Shoulder pads (tier dependent)
        if(tier >= 2) {
            this.box(0.12,0.1,0.12,mD,-0.32,0.25,0,t);
            this.box(0.12,0.1,0.12,mD,0.32,0.25,0,t);
        }

        // Championship belt at mid tier
        if(tier >= 4) {
            this.box(0.5,0.08,0.28,mW,0,-0.15,0,t);
        }

        // Arms - muscular
        const ag = new THREE.Group(); ag.position.y=0.25; t.add(ag);
        const mkArm = (x)=>{const arm=new THREE.Group(); arm.position.set(x,0,0); ag.add(arm);
            this.box(0.12,0.4,0.12,mB,0,-0.2,0,arm); return arm;}
        const leftArm = mkArm(-0.32);
        const rightArm = mkArm(0.32);

        // Boxing gloves / fighting fists
        this.box(0.14,0.12,0.14,mG,0,-0.35,0.05,leftArm);
        this.box(0.14,0.12,0.14,mG,0,-0.35,0.05,rightArm);

        // Flame aura at high tier
        if(tier >= 6) {
            for(let i=0;i<5;i++) {
                const flame = new THREE.Mesh(new THREE.ConeGeometry(0.05,0.15,4), mG);
                flame.position.set((Math.random()-0.5)*0.4, 0.5 + Math.random()*0.2, -0.15);
                t.add(flame);
            }
        }

        // Golden aura ring at max tier
        if(tier >= 8) {
            const aura = new THREE.Mesh(new THREE.TorusGeometry(0.5,0.04,8,16), mW);
            aura.rotation.x = Math.PI/2;
            aura.position.y = 0;
            g.add(aura);
        }

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