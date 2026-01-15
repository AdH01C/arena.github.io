Object.assign(window.Models, {
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
    }
});
