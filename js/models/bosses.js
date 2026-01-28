Object.assign(window.Models, {
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

    // NEW: THE ARCHITECT (Floor 100)
    // NEW: THE ARCHITECT (Floor 100) - "Digital God" Overhaul
    createArchitect(s = 1) {
        const g = new THREE.Group();

        // Materials
        const mCore = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            emissive: 0xffffff,
            emissiveIntensity: 0.8,
            roughness: 0,
            metalness: 1
        });
        const mGold = new THREE.MeshStandardMaterial({
            color: 0xffd700,
            metalness: 1.0,
            roughness: 0.1,
            emissive: 0x332200
        });
        const mData = new THREE.MeshBasicMaterial({
            color: 0x00ffff,
            wireframe: true,
            transparent: true,
            opacity: 0.6
        });
        const mVoid = new THREE.MeshBasicMaterial({ color: 0x000000 });

        // --- THE CORE ---
        // Massive, blinding central processor
        const core = new THREE.Mesh(new THREE.OctahedronGeometry(0.8, 1), mCore);
        core.position.y = 3.0;
        g.add(core);

        // Core Animation: Violent Pulse
        core.userData.idle = true;
        core.userData.pulse = { speed: 4, amp: 0.15, base: 1 };
        core.userData.rotatorY = 0.5;
        core.userData.rotatorX = 0.3;

        // --- ORBITAL RINGS ---
        // Multiple concentric rings rotating on different axes
        const ringGroup = new THREE.Group();
        ringGroup.position.copy(core.position);
        g.add(ringGroup);

        const mkRing = (rad, tube, color, speedX, speedY) => {
            const r = new THREE.Mesh(new THREE.TorusGeometry(rad, tube, 6, 64), color);
            const rG = new THREE.Group();
            rG.add(r);
            ringGroup.add(rG);
            rG.userData.idle = true;
            if (speedX) rG.userData.rotatorX = speedX;
            if (speedY) rG.userData.rotatorY = speedY;
            return r;
        };

        mkRing(1.4, 0.05, mGold, 0.2, 0);   // Inner Gold
        mkRing(1.8, 0.03, mData, 0, 0.3);   // Mid Data
        mkRing(2.2, 0.08, mGold, 0.1, 0.1); // Outer Gold
        mkRing(2.5, 0.02, mData, -0.2, 0);  // Outer Data field

        // --- FLOATING DATA SHARDS (WINGS) ---
        // Procedural cloud of cubes that form "wings"
        const wingGroup = new THREE.Group();
        wingGroup.position.copy(core.position);
        g.add(wingGroup);

        for (let i = 0; i < 20; i++) {
            const size = 0.2 + Math.random() * 0.3;
            // Spread out in wing shape
            const x = (Math.random() > 0.5 ? 1 : -1) * (1.5 + Math.random() * 2);
            const y = (Math.random() - 0.5) * 3;
            const z = (Math.random() - 0.5) * 1;

            const shard = this.box(size, size, size, (Math.random() > 0.5 ? mGold : mData), x, y, z, wingGroup);

            // Random rotations
            shard.rotation.set(Math.random() * 6, Math.random() * 6, Math.random() * 6);

            // Independent float
            shard.userData.idle = true;
            shard.userData.float = true;
            shard.userData.baseY = y;
            shard.userData.idleSpeed = 1 + Math.random();
            shard.userData.idleAmp = 0.2;

            // Random glitch twitches
            if (Math.random() > 0.7) {
                shard.userData.swing = { axis: 'z', speed: 10 + Math.random() * 10, amp: 0.1, base: 0 };
            }
        }

        // --- PARTICLE AURA ---
        g.userData.idle = true;
        g.userData.float = true;
        g.userData.baseY = 0;
        g.userData.idleSpeed = 0.5;
        g.userData.idleAmp = 0.1;

        g.userData.emitParticles = {
            color: 0x00ffff, // Cyan data bleed
            size: 0.15,
            speed: 0.5,
            spread: 1.0
        };
        g.userData.emitChance = 0.8; // High emission

        g.scale.set(s, s, s);
        return { mesh: g, weapon: core };
    },

    // HIDDEN BOSS: IGRIS (The Blood Commander)
    createIgris(s = 1) {
        const g = new THREE.Group();
        // Materials
        const mArmor = new THREE.MeshStandardMaterial({ color: 0x1a0522, metalness: 0.9, roughness: 0.2 }); // Dark Purple-Black
        const mVoid = new THREE.MeshBasicMaterial({ color: 0x000000 }); // Pure Void
        const mGold = new THREE.MeshStandardMaterial({ color: 0xaa00ff, metalness: 1, roughness: 0, emissive: 0x440088 }); // Accents (Purple Gold)
        const mGlow = new THREE.MeshBasicMaterial({ color: 0xaa00ff });

        // --- ANIMATED TORSO ---
        const body = new THREE.Group();
        body.position.y = 1.0;
        g.add(body);

        // Torso Core
        const chest = this.box(0.5, 0.7, 0.4, mArmor, 0, 0.2, 0, body);
        this.box(0.25, 0.5, 0.15, mVoid, 0, 0, 0.2, chest); // Void Core

        // --- HEAD (Commander Helm) ---
        const head = new THREE.Group();
        head.position.set(0, 0.7, 0);
        body.add(head);

        // Helm Base
        const helmGeo = new THREE.DodecahedronGeometry(0.28, 0);
        const helm = new THREE.Mesh(helmGeo, mArmor);
        head.add(helm);

        // Void Visor (Glowing Slit)
        this.box(0.22, 0.05, 0.1, mGlow, 0, 0, 0.22, head);

        // High Plume (Hair)
        const plumeVar = 0.6;
        const plume = this.box(0.1, plumeVar, 0.1, mGold, 0, 0.4, -0.15, head);
        plume.rotation.x = -0.5;
        // Plume animation?

        // --- SHOULDERS (Floating Pauldrons) ---
        const pauldronGeo = new THREE.OctahedronGeometry(0.3, 0);

        const pL = new THREE.Mesh(pauldronGeo, mGold);
        const pLGrp = new THREE.Group(); pLGrp.position.set(-0.55, 0.5, 0); pLGrp.add(pL);
        body.add(pLGrp);
        pL.userData.idle = true; pL.userData.float = true; pL.userData.baseY = 0; pL.userData.idleSpeed = 2; pL.userData.idleAmp = 0.05;

        const pR = new THREE.Mesh(pauldronGeo, mGold);
        const pRGrp = new THREE.Group(); pRGrp.position.set(0.55, 0.5, 0); pRGrp.add(pR);
        body.add(pRGrp);
        pR.userData.idle = true; pR.userData.float = true; pR.userData.baseY = 0; pR.userData.idleSpeed = 2; pR.userData.idleAmp = 0.05;

        // --- ARMS ---
        const mkArm = (x, isRight) => {
            const grp = new THREE.Group(); grp.position.set(x, 0.4, 0); body.add(grp);
            this.box(0.15, 0.6, 0.15, mArmor, 0, -0.3, 0, grp); // Upper
            const low = new THREE.Group(); low.position.set(0, -0.6, 0); grp.add(low);
            this.box(0.14, 0.6, 0.14, mArmor, 0, -0.3, 0, low); // Forearm
            this.box(0.16, 0.4, 0.16, mGold, 0, -0.3, 0, low); // Gauntlet
            return { top: grp, low: low };
        };

        const lArm = mkArm(-0.6, false);
        const rArm = mkArm(0.6, true);

        // --- LEGS ---
        const mkLeg = (x) => {
            const leg = new THREE.Group(); leg.position.set(x, 0, 0); g.add(leg);
            this.box(0.18, 0.5, 0.18, mArmor, 0, 0.7, 0, leg); // Thigh
            this.box(0.16, 0.6, 0.16, mArmor, 0, 0.2, 0, leg); // Shin
            this.box(0.2, 0.2, 0.22, mGold, 0, 0, 0.05, leg); // Boot
        };
        mkLeg(-0.25); mkLeg(0.25);

        // --- WEAPON: VOID GREATSWORD ---
        const weaponGroup = new THREE.Group();
        weaponGroup.position.set(0, -0.5, 0);
        rArm.low.add(weaponGroup);

        // Hilt
        this.box(0.05, 0.6, 0.05, mArmor, 0, 0, 0, weaponGroup);
        // Guard
        const guard = new THREE.Mesh(new THREE.OctahedronGeometry(0.25, 0), mGold);
        guard.scale.set(1.5, 0.5, 0.5); guard.position.y = 0.3;
        weaponGroup.add(guard);
        // Blade
        const blade = this.box(0.25, 2.5, 0.05, mVoid, 0, 1.6, 0, weaponGroup);
        // Energy Edge
        const edge = this.box(0.27, 2.4, 0.02, mGlow, 0, 1.6, 0, weaponGroup); // Laser edge

        // --- VOID CAPE (Multi-Segment) ---
        const capeGrp = new THREE.Group(); capeGrp.position.set(0, 0.6, -0.25); body.add(capeGrp);
        for (let i = 0; i < 5; i++) {
            // Tattered strips
            const strip = this.box(0.15, 1.2, 0.02, mVoid, (i - 2) * 0.16, -0.6, 0, capeGrp);
            strip.userData.idle = true;
            strip.userData.swing = { axis: 'x', speed: 2 + Math.random(), amp: 0.3, base: 0.2, offset: i };
        }

        // --- ANIMATIONS ---
        body.userData.idle = true; body.userData.pulse = { speed: 2, amp: 0.05, base: 1 };

        // Combat Stance
        lArm.top.rotation.z = 0.2; lArm.top.rotation.x = 0.2;
        rArm.top.rotation.z = -0.2; rArm.top.rotation.x = -0.4; // Arm forward

        // Swing Animations
        lArm.top.userData.idle = true; lArm.top.userData.swing = { axis: 'x', speed: 1.5, amp: 0.1, base: 0.2 };
        rArm.top.userData.idle = true; rArm.top.userData.swing = { axis: 'x', speed: 1.5, amp: 0.1, base: -0.4 };

        // Float
        g.userData.idle = true;
        g.userData.float = true; g.userData.baseY = 0; g.userData.idleSpeed = 1.0; g.userData.idleAmp = 0.15;

        // Aura
        g.userData.emitParticles = { color: 0xaa00ff, size: 0.1, speed: 0.4, spread: 0.6 };
        g.userData.emitChance = 0.6;

        g.scale.set(s, s, s);
        return { mesh: g, weapon: rArm.low };
    }
});
