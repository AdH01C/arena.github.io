const engine = {
    // ... (Keep existing scene, camera, renderer, particles logic) ... 
    scene: null, camera: null, renderer: null, particles: [], shakeIntensity: 0,

    init() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(50, window.innerWidth/window.innerHeight, 0.1, 100);
        this.renderer = new THREE.WebGLRenderer({antialias:true});
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
    createDrone(c, s=1) {
        const g = new THREE.Group();
        const mB = new THREE.MeshStandardMaterial({color:0x444}); const mG = new THREE.MeshBasicMaterial({color:c});
        const core = this.box(0.4,0.4,0.4,mB,0,1.2,0,g); this.box(0.2,0.2,0.2,mG,0,0,0.15,core);
        this.box(0.6,0.05,0.1,mB,0,0.3,0,core); g.userData.rotatorY=0.05;
        g.scale.set(s,s,s); return {mesh:g, weapon:core};
    },
    createBoss(c, s=1) {
        const g = new THREE.Group();
        const mB = new THREE.MeshStandardMaterial({color:0x111, metalness:1}); const mG = new THREE.MeshBasicMaterial({color:0xff0000});
        const t = this.box(0.8,0.8,0.6,mB,0,1.0,0,g); this.box(0.4,0.4,0.1,mG,0,0,0.31,t);
        this.box(0.5,0.5,0.5,mB,-0.7,0.2,0,t); this.box(0.5,0.5,0.5,mB,0.7,0.2,0,t);
        g.scale.set(s,s,s); return {mesh:g, weapon:t};
    },
    // NEW: THE ARCHITECT (Floor 100)
    createArchitect(s=1) {
        const g = new THREE.Group();
        const mGold = new THREE.MeshStandardMaterial({color:0xffd700, metalness:1.0, roughness:0.1, emissive:0x332200});
        const mVoid = new THREE.MeshBasicMaterial({color:0x000000});
        const mLight = new THREE.MeshBasicMaterial({color:0xffffff});

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