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
    },

    createIgris(s = 1) {
        const g = new THREE.Group();
        // Materials
        const mArmor = new THREE.MeshStandardMaterial({ color: 0x1a0522, metalness: 0.9, roughness: 0.2 }); // Dark Purple-Black
        const mVoid = new THREE.MeshBasicMaterial({ color: 0x000000 }); // Pure Void
        const mGold = new THREE.MeshStandardMaterial({ color: 0xaa00ff, metalness: 1, roughness: 0, emissive: 0x440088 }); // Accents (Purple Gold)
        const mGlow = new THREE.MeshBasicMaterial({ color: 0xaa00ff });
        const mSpike = new THREE.MeshStandardMaterial({ color: 0x330044, metalness: 0.5, roughness: 0.1 });

        // --- ANIMATED TORSO (Ronin Style) ---
        // Main body group for breathing animation
        const body = new THREE.Group();
        body.position.y = 0.8;
        g.add(body);

        // Torso Core
        const chest = this.box(0.5, 0.6, 0.35, mArmor, 0, 0.2, 0, body);
        this.box(0.2, 0.4, 0.1, mVoid, 0, 0, 0.18, chest); // Void Channel

        // Ribcage / Armor plates (Cylinders for complexity)
        const ribGeo = new THREE.CylinderGeometry(0.3, 0.2, 0.5, 6);
        const rib = new THREE.Mesh(ribGeo, mArmor);
        rib.rotation.y = Math.PI / 2;
        rib.position.set(0, 0, 0);
        chest.add(rib);

        // --- HEAD (Complex Helm) ---
        const head = new THREE.Group();
        head.position.set(0, 0.6, 0);
        body.add(head); // Attached to body so it moves with breath

        // Helm Base
        const helmGeo = new THREE.DodecahedronGeometry(0.25, 0);
        const helm = new THREE.Mesh(helmGeo, mArmor);
        head.add(helm);

        // Face Plate (Void Visor)
        this.box(0.18, 0.05, 0.1, mGlow, 0, 0, 0.2, head); // Glowing Visor

        // Horns/Plume (Complex Spikes)
        const hornGeo = new THREE.ConeGeometry(0.05, 0.6, 4);
        const hornL = new THREE.Mesh(hornGeo, mGold);
        hornL.position.set(-0.15, 0.3, -0.1); hornL.rotation.z = 0.3; hornL.rotation.x = -0.2;
        head.add(hornL);
        const hornR = new THREE.Mesh(hornGeo, mGold);
        hornR.position.set(0.15, 0.3, -0.1); hornR.rotation.z = -0.3; hornR.rotation.x = -0.2;
        head.add(hornR);

        // --- SHOULDERS (Spiked Pauldrons) ---
        const pauldronGeo = new THREE.OctahedronGeometry(0.25, 0);

        const pL = new THREE.Mesh(pauldronGeo, mGold);
        pL.position.set(-0.45, 0.4, 0);
        body.add(pL);

        const pR = new THREE.Mesh(pauldronGeo, mGold);
        pR.position.set(0.45, 0.4, 0);
        body.add(pR);

        // --- ARMS (Ronin Swing Animation) ---
        const armGeo = new THREE.BoxGeometry(0.12, 0.5, 0.12);

        // LEFT ARM (Swing A)
        const lArmGrp = new THREE.Group();
        lArmGrp.position.set(-0.5, 0.3, 0);
        body.add(lArmGrp);
        const lArm = new THREE.Mesh(armGeo, mArmor);
        lArm.position.y = -0.25;
        lArmGrp.add(lArm);

        // RIGHT ARM (Swing B - Opposing)
        const rArmGrp = new THREE.Group();
        rArmGrp.position.set(0.5, 0.3, 0);
        body.add(rArmGrp);
        const rArm = new THREE.Mesh(armGeo, mArmor);
        rArm.position.y = -0.25;
        rArmGrp.add(rArm);

        // --- LEGS ---
        // Legs are static relative to root, or can slightly sway
        const legGeo = new THREE.CylinderGeometry(0.12, 0.08, 0.7, 8);

        const lLeg = new THREE.Mesh(legGeo, mArmor);
        lLeg.position.set(-0.2, 0.35, 0);
        g.add(lLeg);

        const rLeg = new THREE.Mesh(legGeo, mArmor);
        rLeg.position.set(0.2, 0.35, 0);
        g.add(rLeg);

        // --- WEAPON: VOID SLAYER (More Complex) ---
        const weaponGroup = new THREE.Group();
        weaponGroup.position.set(0, -0.4, 0.3);
        rArmGrp.add(weaponGroup); // Attached to right arm

        // Hilt
        const hiltGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.4, 8);
        const hilt = new THREE.Mesh(hiltGeo, mGold);
        hilt.rotation.x = Math.PI / 2;
        weaponGroup.add(hilt);

        // Crossguard (Spiked)
        const guardGeo = new THREE.OctahedronGeometry(0.15, 0);
        const guard = new THREE.Mesh(guardGeo, mGold);
        guard.scale.set(2, 0.5, 0.5);
        weaponGroup.add(guard);

        // Blade (Jagged)
        const bladeGeo = new THREE.BoxGeometry(0.1, 1.8, 0.02);
        const blade = new THREE.Mesh(bladeGeo, mArmor);
        blade.position.y = 1.0;
        weaponGroup.add(blade);

        // Energy Edge
        const edge = new THREE.Mesh(new THREE.BoxGeometry(0.12, 1.7, 0.03), mGlow);
        edge.position.y = 1.0;
        weaponGroup.add(edge);

        // --- CAPE (Flowing) ---
        const cape = new THREE.Group();
        cape.position.set(0, 0.5, -0.2);
        body.add(cape);

        // Cape segments
        for (let i = 0; i < 3; i++) {
            const seg = this.box(0.5 - (i * 0.1), 0.4, 0.02, mVoid, 0, -0.2 - (i * 0.35), 0, cape);
            seg.rotation.x = 0.1 + (i * 0.1);
        }

        // --- ANIMATION DATA (RONIN STYLE) ---
        // 1. Torso Pulse (Breathing) - INCREASED INTENSITY
        body.userData.idle = true;
        body.userData.pulse = { speed: 2.5, amp: 0.08, base: 1 }; // Was 0.02, now 0.08 (Visible breathing)

        // 2. Arm Swings (Opposing, Dynamic)
        lArmGrp.userData.idle = true;
        lArmGrp.userData.swing = { axis: 'x', speed: 2, amp: 0.2, base: 0 };

        rArmGrp.userData.idle = true;
        rArmGrp.userData.swing = { axis: 'x', speed: 2, amp: 0.2, base: 0, offset: Math.PI }; // Opposing phase

        // 3. Cape Flow
        cape.userData.idle = true;
        cape.userData.swing = { axis: 'x', speed: 3, amp: 0.3, base: 0.3 };

        // 4. Floating (Godlike)
        g.userData.idle = true;
        g.userData.float = true;
        g.userData.baseY = 0;
        g.userData.idleSpeed = 1.5;
        g.userData.idleAmp = 0.2; // Was 0.1

        // Mark parts for VFX
        g.userData.isIgris = true;
        weaponGroup.userData.isVoidBlade = true;

        g.scale.set(s, s, s);
        return { mesh: g, weapon: rArmGrp };
    }
});
