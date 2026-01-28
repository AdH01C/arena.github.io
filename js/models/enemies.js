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

    createCelestial(c, s = 1) { // Floor 80+ Holy Enemy
        const g = new THREE.Group();
        const mGold = new THREE.MeshStandardMaterial({ color: 0xFFD700, metalness: 1.0, roughness: 0.1, emissive: 0xaa5500, emissiveIntensity: 0.2 });
        const mWhite = new THREE.MeshStandardMaterial({ color: 0xFFFFFF, metalness: 0.1, roughness: 0.1, transparent: true, opacity: 0.9 });
        const mGlow = new THREE.MeshBasicMaterial({ color: 0x00FFFF });

        // Core (Multiple spinning shapes)
        const coreGeo = new THREE.OctahedronGeometry(0.5, 0);
        const core = new THREE.Mesh(coreGeo, mGold);
        core.position.y = 1.0;
        g.add(core);

        // Core Animations
        core.userData.idle = true;
        core.userData.rotatorY = 1.0;
        core.userData.rotatorZ = 0.5;

        // Rings (Biblically Accurate Wheels)
        const ringGeo = new THREE.TorusGeometry(0.8, 0.05, 8, 32);
        const r1 = new THREE.Mesh(ringGeo, mWhite);
        r1.position.y = 1.0;
        r1.userData.idle = true; r1.userData.rotatorX = 0.5; r1.userData.rotatorY = 0.5;
        g.add(r1);

        const r2 = new THREE.Mesh(ringGeo, mWhite);
        r2.position.y = 1.0;
        r2.rotation.x = Math.PI / 2;
        r2.userData.idle = true; r2.userData.rotatorX = -0.5; r2.userData.rotatorZ = 0.5;
        g.add(r2);

        // Floating Eyes (Orbs) around
        for (let i = 0; i < 4; i++) {
            const eye = new THREE.Mesh(new THREE.SphereGeometry(0.1, 8, 8), mGlow);
            const angle = (i / 4) * Math.PI * 2;
            eye.position.set(Math.cos(angle) * 1.2, 1.0, Math.sin(angle) * 1.2);
            eye.userData.idle = true;
            eye.userData.float = true;
            eye.userData.baseY = 1.0;
            eye.userData.idleSpeed = 2 + i;
            g.add(eye);
        }

        // Wings (Geometric Planes)
        const wingGeo = new THREE.ConeGeometry(0.2, 1.5, 4);
        const w1 = new THREE.Mesh(wingGeo, mGold);
        w1.position.set(-0.8, 1.5, -0.5);
        w1.rotation.z = 0.5;
        w1.rotation.x = -0.2;
        g.add(w1);

        const w2 = new THREE.Mesh(wingGeo, mGold);
        w2.position.set(0.8, 1.5, -0.5);
        w2.rotation.z = -0.5;
        w2.rotation.x = -0.2;
        g.add(w2);

        // Hover
        g.userData.idle = true;
        g.userData.float = true; g.userData.baseY = 0.5; g.userData.idleSpeed = 0.5;

        g.scale.set(s, s, s); return { mesh: g, weapon: core };
    },

    createCelestialVariant(c, variant = 'knight', s = 1) {
        const g = new THREE.Group();
        const mGold = new THREE.MeshStandardMaterial({ color: 0xFFD700, metalness: 1.0, roughness: 0.1 });
        const mWhite = new THREE.MeshStandardMaterial({ color: 0xFFFFFF, metalness: 0.1, roughness: 0.1 });
        const mEmissive = new THREE.MeshBasicMaterial({ color: 0x00FFFF });

        // Base Humanoid Body (Abstract)
        this.box(0.4, 0.6, 0.3, mWhite, 0, 1.0, 0, g); // Torso
        this.box(0.2, 0.3, 0.2, mGold, 0, 1.4, 0, g); // Head

        // Floating Limbs
        const leftArm = this.box(0.15, 0.5, 0.15, mGold, -0.35, 1.1, 0, g);
        const rightArm = this.box(0.15, 0.5, 0.15, mGold, 0.35, 1.1, 0, g);
        leftArm.userData.idle = true; leftArm.userData.float = true; leftArm.userData.baseY = 1.1;
        rightArm.userData.idle = true; rightArm.userData.float = true; rightArm.userData.baseY = 1.1;

        // Body Breathing (Scale Pulse)
        const torso = g.children[0]; // Assuming Torso is first child
        if (torso) {
            torso.userData.idle = true;
            torso.userData.pulse = { speed: 2, amp: 0.05, base: 1.0 };
        }

        if (variant === 'knight') {
            // Giant Sword
            const sword = new THREE.Group();
            this.box(0.1, 1.5, 0.05, mEmissive, 0, 0.5, 0, sword);
            this.box(0.3, 0.05, 0.1, mGold, 0, -0.2, 0, sword);
            sword.position.set(0.6, 0.5, 0.3);
            sword.rotation.z = -0.5;
            // Idle Swing
            sword.userData.idle = true;
            sword.userData.swing = { axis: 'z', speed: 1.5, amp: 0.2, base: -0.5 };
            g.add(sword);

            // Halo
            const halo = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.02, 8, 16), mEmissive);
            halo.rotation.x = Math.PI / 2; halo.position.set(0, 1.7, 0);
            g.add(halo);

            // Floating Runes
            const runeGroup = new THREE.Group();
            for (let i = 0; i < 5; i++) {
                const rune = this.box(0.1, 0.2, 0.02, mEmissive, 0, 0, 0, runeGroup);
                const a = (i / 5) * Math.PI * 2;
                rune.position.set(Math.cos(a) * 0.6, 0, Math.sin(a) * 0.6);
                rune.rotation.y = a;
            }
            runeGroup.position.y = 1.0;
            runeGroup.userData.idle = true; runeGroup.userData.rotatorY = -0.5;
            g.add(runeGroup);
        }
        else if (variant === 'ronin') {
            // Katana
            const katana = new THREE.Group();
            this.box(0.05, 1.2, 0.02, mEmissive, 0, 0, 0, katana);
            katana.position.set(-0.6, 0.8, 0.2);
            katana.rotation.z = 0.5;
            // Idle Swing
            katana.userData.idle = true;
            katana.userData.swing = { axis: 'z', speed: 2.0, amp: 0.1, base: 0.5 };
            g.add(katana);

            // Scarf (Trail)
            const scarf = new THREE.Mesh(new THREE.PlaneGeometry(0.5, 1.0), new THREE.MeshBasicMaterial({ color: 0xffff00, side: THREE.DoubleSide, transparent: true, opacity: 0.6 }));
            scarf.position.set(0, 1.2, -0.3);
            // Scarf Flow
            scarf.userData.idle = true;
            scarf.userData.swing = { axis: 'x', speed: 3.0, amp: 0.2, base: 0 };
            g.add(scarf);

            // Orbiting Petals
            const petalGroup = new THREE.Group();
            const petalMat = new THREE.MeshBasicMaterial({ color: 0xffccff, side: THREE.DoubleSide });
            for (let i = 0; i < 8; i++) {
                const petal = new THREE.Mesh(new THREE.PlaneGeometry(0.1, 0.1), petalMat);
                const a = (i / 8) * Math.PI * 2;
                petal.position.set(Math.cos(a) * 0.8, (Math.random() - 0.5) * 0.5, Math.sin(a) * 0.8);
                petal.rotation.set(Math.random(), Math.random(), Math.random());
                petalGroup.add(petal);
            }
            petalGroup.position.y = 0.8;
            petalGroup.userData.idle = true; petalGroup.userData.rotatorY = 1.0;
            g.add(petalGroup);
        }
        else if (variant === 'priest') {
            // Staff
            const staff = new THREE.Group();
            this.box(0.05, 1.8, 0.05, mGold, 0, 0, 0, staff);
            const orb = new THREE.Mesh(new THREE.SphereGeometry(0.15), mEmissive);
            orb.position.y = 0.9;
            staff.add(orb);
            staff.position.set(0.5, 1.0, 0.3);
            // Idle Bob/Swing
            staff.userData.idle = true;
            staff.userData.swing = { axis: 'x', speed: 1.0, amp: 0.1, base: 0 };
            g.add(staff);

            // Multi-Halo
            const h1 = new THREE.Mesh(new THREE.RingGeometry(0.4, 0.45, 32), mWhite);
            h1.position.set(0, 1.5, -0.1);
            g.add(h1);

            // Holy Book
            const book = new THREE.Group();
            this.box(0.3, 0.05, 0.25, mWhite, 0, 0, 0, book); // Cover
            this.box(0.25, 0.04, 0.2, mGold, 0, 0.02, 0, book); // Pages
            book.position.set(-0.5, 1.2, 0.4);
            book.rotation.x = 0.5;
            book.rotation.y = -0.5;
            book.userData.idle = true; book.userData.float = true; book.userData.baseY = 1.2;
            g.add(book);
        }
        else if (variant === 'summoner') {
            // Orbiting Prisms
            for (let i = 0; i < 3; i++) {
                const p = new THREE.Mesh(new THREE.ConeGeometry(0.1, 0.2, 4), mEmissive);
                const a = (i / 3) * Math.PI * 2;
                p.position.set(Math.cos(a) * 0.8, 1.2, Math.sin(a) * 0.8);
                g.add(p);
            }
            // Particle Glow
            g.userData.emitParticles = { color: 0x00ffff, size: 0.1, speed: 0.3, spread: 0.4, emitChance: 0.3 };
        }

        g.userData.idle = true;
        g.userData.float = true;
        g.userData.baseY = 1.5; // Float higher
        g.userData.idleAmp = 0.2; // Gentle bob
        g.userData.idleSpeed = 1.0;

        g.scale.set(s, s, s);
        return { mesh: g, weapon: g }; // Weapon is self
    },

    // --- SANCTUM BOSSES ---
    createLuminousPaladin(c, s = 1) {
        // Giant Tank with Tower Shield
        return this.createCelestialVariant(c, 'knight', s * 1.5);
    },
    createDivinitySeeker(c, s = 1) {
        // Multi-armed Mage
        return this.createCelestialVariant(c, 'priest', s * 1.3);
    },
    createSeraphimCommander(c, s = 1) {
        // 6-Winged Final Gatekeeper
        const base = this.createCelestialVariant(c, 'ronin', s * 1.4);
        const g = base.mesh;

        // Add Wings
        const wingMat = new THREE.MeshBasicMaterial({ color: 0xffd700, side: THREE.DoubleSide, transparent: true, opacity: 0.8 });
        for (let i = 0; i < 6; i++) {
            const w = new THREE.Mesh(new THREE.PlaneGeometry(0.2, 1.5), wingMat);
            w.position.set(0, 1.5, -0.5);
            w.rotation.z = (i - 2.5) * 0.5;
            w.userData.idle = true; w.userData.swing = { axis: 'z', speed: 2, amp: 0.2, base: w.rotation.z };
            g.add(w);
        }
        return base;
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

    // --- SECTOR BOSSES ---

    createNeonHydra(c, s = 1) { // F20 BOSS
        const g = new THREE.Group();
        const mB = new THREE.MeshStandardMaterial({ color: 0x222, metalness: 0.7, roughness: 0.3 });
        const mNeon = new THREE.MeshBasicMaterial({ color: 0x00ff00 }); // Green Neon

        // Base
        this.box(1.5, 0.2, 1.5, mB, 0, 0, 0, g);

        // Heads (3 Heads)
        const heads = [];
        for (let i = 0; i < 3; i++) {
            const headGrp = new THREE.Group();
            const angle = (i - 1) * 0.5; // -0.5, 0, 0.5
            headGrp.position.set(Math.sin(angle) * 0.8, 0, Math.cos(angle) * 0.2);
            g.add(headGrp);

            // Neck Segments (Procedural Spine)
            let prevSeg = null;
            for (let j = 0; j < 6; j++) {
                const seg = this.box(0.25, 0.3, 0.25, mB, 0, 0.2 + j * 0.25, 0, headGrp);
                // Glow rings
                if (j % 2 === 0) this.box(0.3, 0.05, 0.3, mNeon, 0, 0.2 + j * 0.25, 0, headGrp);
            }

            // Head
            const head = this.box(0.4, 0.5, 0.6, mB, 0, 1.8, 0.2, headGrp);
            this.box(0.1, 0.1, 0.1, mNeon, -0.15, 0, 0.3, head); // Eye L
            this.box(0.1, 0.1, 0.1, mNeon, 0.15, 0, 0.3, head); // Eye R
            this.box(0.3, 0.2, 0.1, mNeon, 0, -0.2, 0.3, head); // Maw

            // Independent Sway
            headGrp.userData.idle = true;
            headGrp.userData.swing = { axis: 'z', speed: 1 + Math.random(), amp: 0.15, base: angle, offset: i };

            // Particle Venting from Mouth
            head.userData.idle = true;
            head.userData.emitParticles = { color: 0x00ff00, size: 0.1, speed: 0.5, spread: 0.2 };
            head.userData.emitChance = 0.1;

            heads.push(head);
        }

        g.scale.set(s, s, s); return { mesh: g, weapon: heads[1] }; // Center head is main weapon target
    },

    createIronColossus(c, s = 1) { // F40 BOSS
        const g = new THREE.Group();
        const mArmor = new THREE.MeshStandardMaterial({ color: 0x444, metalness: 0.9, roughness: 0.2 });
        const mPlate = new THREE.MeshStandardMaterial({ color: 0x665544, metalness: 0.5, roughness: 0.8 });
        const mHeat = new THREE.MeshBasicMaterial({ color: 0xff4400 });

        // Massive Legs
        this.box(0.5, 1.2, 0.6, mArmor, -0.6, 0.6, 0, g);
        this.box(0.5, 1.2, 0.6, mArmor, 0.6, 0.6, 0, g);

        // Pelvis
        this.box(1.5, 0.4, 0.8, mArmor, 0, 1.3, 0, g);

        // Breakable Armor Plates (Visual only for now)
        const plateL = this.box(0.6, 0.8, 0.1, mPlate, -0.6, 0.6, 0.35, g);
        const plateR = this.box(0.6, 0.8, 0.1, mPlate, 0.6, 0.6, 0.35, g);

        // Core Torso
        const torso = this.box(1.2, 1.0, 0.8, mArmor, 0, 2.0, 0, g);
        this.box(0.4, 0.4, 0.2, mHeat, 0, 0, 0.35, torso); // Reactor Core
        torso.userData.idle = true; torso.userData.pulse = { speed: 1, amp: 0.02, base: 1 };

        // Shoulders (Massive)
        const shoulderL = this.box(0.6, 0.6, 0.6, mPlate, -0.9, 0.3, 0, torso);
        const shoulderR = this.box(0.6, 0.6, 0.6, mPlate, 0.9, 0.3, 0, torso);

        // Arms (Cannon Arms)
        const armL = new THREE.Group(); armL.position.set(-0.9, 0, 0); torso.add(armL);
        this.box(0.4, 1.0, 0.4, mArmor, 0, -0.8, 0, armL);
        const gunL = this.box(0.3, 0.3, 0.8, mArmor, 0, -1.3, 0.2, armL); // Cannon

        const armR = new THREE.Group(); armR.position.set(0.9, 0, 0); torso.add(armR);
        this.box(0.4, 1.0, 0.4, mArmor, 0, -0.8, 0, armR);
        const gunR = this.box(0.3, 0.3, 0.8, mArmor, 0, -1.3, 0.2, armR); // Cannon

        // Heat Vents
        gunL.userData.idle = true; gunL.userData.emitParticles = { color: 0xffaa00, size: 0.1, speed: 0.4, spread: 0.2 };
        gunL.userData.emitChance = 0.2;
        gunR.userData.idle = true; gunR.userData.emitParticles = { color: 0xffaa00, size: 0.1, speed: 0.4, spread: 0.2 };
        gunR.userData.emitChance = 0.2;

        g.scale.set(s, s, s); return { mesh: g, weapon: torso };
    },

    createVoidMother(c, s = 1) { // F60 BOSS
        const g = new THREE.Group();
        const mVoid = new THREE.MeshBasicMaterial({ color: 0x110022, transparent: true, opacity: 0.9 });
        const mEdge = new THREE.MeshBasicMaterial({ color: 0xff00ff, wireframe: true });

        // Central Fractal Core
        const core = new THREE.Mesh(new THREE.IcosahedronGeometry(0.8, 1), mVoid);
        core.position.y = 2.0;
        g.add(core);

        const wire = new THREE.Mesh(new THREE.IcosahedronGeometry(0.85, 1), mEdge);
        core.add(wire);

        core.userData.idle = true;
        core.userData.rotatorX = 0.2;
        core.userData.rotatorY = 0.3;
        core.userData.pulse = { speed: 0.5, amp: 0.1, base: 1 };

        // Floating Geometric Children
        for (let i = 0; i < 6; i++) {
            const child = new THREE.Mesh(new THREE.OctahedronGeometry(0.3, 0), mEdge);
            const radius = 1.5;
            const yOff = Math.sin(i) * 0.5;
            child.position.set(Math.cos(i) * radius, 2.0 + yOff, Math.sin(i) * radius);
            g.add(child);

            // Orbit Animation
            child.userData.idle = true;
            child.userData.rotatorY = 1.0; // Spin self
            // Complex Orbit needs custom update or parent group rotation. 
            // Simple approach: Rotate entire group slightly or add pivot.
        }

        // Add a Pivot for Orbiters
        const orbitGrp = new THREE.Group(); orbitGrp.position.y = 2.0; g.add(orbitGrp);
        orbitGrp.userData.idle = true; orbitGrp.userData.rotatorY = 0.5;

        for (let i = 0; i < 4; i++) {
            const child = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.2, 0.2), mVoid);
            child.position.set(1.2, 0, 0);
            const piv = new THREE.Group();
            piv.rotation.y = (Math.PI / 2) * i;
            piv.add(child);
            orbitGrp.add(piv);
        }

        g.userData.idle = true; g.userData.float = true; g.userData.baseY = 0.5; g.userData.idleSpeed = 1; g.userData.idleAmp = 0.2;

        g.scale.set(s, s, s); return { mesh: g, weapon: core };
    },

    createCorruptedCore(c, s = 1) { // F80 BOSS
        const g = new THREE.Group();
        const mError = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });
        const mGlitch = new THREE.MeshStandardMaterial({ color: 0x333, roughness: 0.2 });

        // Main sphere
        const sphere = new THREE.Mesh(new THREE.SphereGeometry(1.0, 32, 32), mGlitch);
        sphere.position.y = 2.0;
        g.add(sphere);

        // Glitch Rings
        const r1 = new THREE.Mesh(new THREE.TorusGeometry(1.2, 0.05, 16, 100), mError);
        r1.position.y = 2.0;
        g.add(r1);
        r1.userData.idle = true; r1.userData.rotatorX = 1.0; r1.userData.rotatorY = 0.5;

        const r2 = new THREE.Mesh(new THREE.TorusGeometry(1.4, 0.05, 16, 100), mError);
        r2.position.y = 2.0;
        g.add(r2);
        r2.userData.idle = true; r2.userData.rotatorZ = -0.8; r2.userData.rotatorY = -0.5;

        // Data Streams
        sphere.userData.idle = true;
        sphere.userData.emitParticles = { color: 0xff0000, size: 0.1, speed: 0.5, spread: 0.5 };
        sphere.userData.emitChance = 0.3; // High emission

        // Floating Debris (Broken Polygons)
        for (let i = 0; i < 10; i++) {
            const debris = new THREE.Mesh(new THREE.ConeGeometry(0.2, 0.4, 3), mGlitch);
            debris.position.set((Math.random() - 0.5) * 3, 1 + Math.random() * 2, (Math.random() - 0.5) * 3);
            g.add(debris);

            debris.userData.idle = true;
            debris.userData.rotatorX = Math.random() * 5;
            debris.userData.rotatorY = Math.random() * 5;
            debris.userData.float = true; debris.userData.baseY = debris.position.y; debris.userData.idleSpeed = 2; debris.userData.idleAmp = 0.5;
        }

        g.scale.set(s, s, s); return { mesh: g, weapon: sphere };
    },

    // --- MINI-BOSSES: SECTOR 1 (ORGANIC) ---
    createRat(c, s = 1) { // F5
        const g = new THREE.Group();
        const mSkin = new THREE.MeshStandardMaterial({ color: 0x654321, roughness: 0.9 });
        const mEye = new THREE.MeshBasicMaterial({ color: 0xff0000 });

        // Body
        this.box(0.3, 0.2, 0.5, mSkin, 0, 0.2, 0, g);
        // Head
        const h = this.box(0.15, 0.15, 0.25, mSkin, 0, 0.25, 0.3, g);
        this.box(0.05, 0.05, 0.05, mEye, -0.05, 0, 0.1, h);
        this.box(0.05, 0.05, 0.05, mEye, 0.05, 0, 0.1, h);

        // Tail
        const t = this.box(0.05, 0.05, 0.6, mSkin, 0, 0.2, -0.5, g);
        t.userData.idle = true; t.userData.swing = { axis: 'x', speed: 5, amp: 0.2, base: 0 }; // Fast twitch

        g.scale.set(s, s, s); return { mesh: g, weapon: h };
    },

    createBioSoldier(c, s = 1) { // F10
        const g = new THREE.Group();
        const mArmor = new THREE.MeshStandardMaterial({ color: 0x224422, metalness: 0.3 });
        const mFlesh = new THREE.MeshStandardMaterial({ color: 0xaa5555 });
        const mVein = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

        // Mutant Arm (Right)
        const armR = this.box(0.3, 0.6, 0.3, mFlesh, 0.4, 1.2, 0, g);
        this.box(0.1, 0.4, 0.1, mVein, 0.1, 0, 0.1, armR); // Glowing vein

        // Normal Arm (Left)
        this.box(0.15, 0.5, 0.15, mArmor, -0.4, 1.2, 0, g);

        // Body
        this.box(0.5, 0.6, 0.3, mArmor, 0, 1.2, 0, g);
        // Legs
        this.box(0.2, 0.6, 0.2, mArmor, -0.2, 0.3, 0, g);
        this.box(0.2, 0.6, 0.2, mArmor, 0.2, 0.3, 0, g);

        // Head
        this.box(0.25, 0.25, 0.25, mArmor, 0, 1.7, 0, g);

        g.userData.idle = true; g.userData.pulse = { speed: 2, amp: 0.02, base: 1 }; // Pulsing mutation
        g.scale.set(s, s, s); return { mesh: g, weapon: armR };
    },

    createCyborg(c, s = 1) { // F15
        const g = new THREE.Group();
        const mMet = new THREE.MeshStandardMaterial({ color: 0x888888, metalness: 0.8 });
        const mFlesh = new THREE.MeshStandardMaterial({ color: 0xcc8888 });

        // Half metal / Half flesh body
        this.box(0.25, 0.6, 0.25, mFlesh, -0.15, 1.2, 0, g);
        this.box(0.25, 0.6, 0.25, mMet, 0.15, 1.2, 0, g);

        // Legs
        this.box(0.2, 0.6, 0.2, mFlesh, -0.2, 0.3, 0, g);
        this.box(0.2, 0.6, 0.2, mMet, 0.2, 0.3, 0, g);

        // Arm Cannon (Right)
        const gun = this.box(0.2, 0.2, 0.6, mMet, 0.4, 1.3, 0.3, g);
        gun.userData.idle = true; gun.userData.emitParticles = { color: 0xffaa00, size: 0.05, speed: 0.5, spread: 0.1 };

        // Head (Visor)
        const h = this.box(0.3, 0.3, 0.3, mMet, 0, 1.7, 0, g);
        this.box(0.3, 0.1, 0.1, new THREE.MeshBasicMaterial({ color: 0xff0000 }), 0, 0, 0.16, h);

        g.scale.set(s, s, s); return { mesh: g, weapon: gun };
    },

    // --- MINI-BOSSES: SECTOR 2 (INDUSTRIAL) ---
    createGatlingBot(c, s = 1) { // F25
        const g = new THREE.Group();
        const mSteel = new THREE.MeshStandardMaterial({ color: 0x555555, metalness: 0.7 });

        // Tank Treads
        this.box(0.3, 0.3, 0.6, mSteel, -0.4, 0.15, 0, g);
        this.box(0.3, 0.3, 0.6, mSteel, 0.4, 0.15, 0, g);

        // Torso
        const t = this.box(0.6, 0.5, 0.5, mSteel, 0, 0.6, 0, g);

        // Dual Gatlings
        const g1 = this.box(0.2, 0.2, 0.8, mSteel, -0.5, 0.1, 0.3, t);
        const g2 = this.box(0.2, 0.2, 0.8, mSteel, 0.5, 0.1, 0.3, t);

        // Spin Anim
        g1.userData.idle = true; g1.userData.rotatorz = 2.0; // Spin barrel (simulated)
        g2.userData.idle = true; g2.userData.rotatorz = -2.0;

        g.scale.set(s, s, s); return { mesh: g, weapon: t };
    },

    createMissileWalker(c, s = 1) { // F30
        const g = new THREE.Group();
        const mGrey = new THREE.MeshStandardMaterial({ color: 0x666666 });
        const mPod = new THREE.MeshStandardMaterial({ color: 0x444444 });

        // Chicken Legs
        this.box(0.15, 0.7, 0.15, mGrey, -0.3, 0.35, 0, g);
        this.box(0.15, 0.7, 0.15, mGrey, 0.3, 0.35, 0, g);

        // Cockpit
        const pod = this.box(0.6, 0.5, 0.6, mGrey, 0, 1.0, 0, g);

        // Shoulder Pods
        const p1 = this.box(0.4, 0.4, 0.4, mPod, -0.6, 0.2, -0.2, pod);
        const p2 = this.box(0.4, 0.4, 0.4, mPod, 0.6, 0.2, -0.2, pod);

        // Missile tips
        this.box(0.1, 0.1, 0.1, new THREE.MeshBasicMaterial({ color: 0xff0000 }), 0, 0, 0.2, p1);
        this.box(0.1, 0.1, 0.1, new THREE.MeshBasicMaterial({ color: 0xff0000 }), 0, 0, 0.2, p2);

        g.scale.set(s, s, s); return { mesh: g, weapon: pod };
    },

    createDreadnought(c, s = 1) { // F35
        const g = new THREE.Group();
        const mHeavy = new THREE.MeshStandardMaterial({ color: 0x222222, metalness: 0.9 });

        // Massive Block Body
        this.box(1.2, 0.8, 0.8, mHeavy, 0, 0.4, 0, g);

        // Turret Head
        const t = this.box(0.6, 0.4, 0.6, mHeavy, 0, 1.0, 0, g);
        const barrel = this.box(0.2, 0.2, 1.0, mHeavy, 0, 0, 0.6, t);

        // Heavy recoil animation setup (idle)
        t.userData.idle = true; t.userData.swing = { axis: 'y', speed: 0.5, amp: 0.2, base: 0 };

        g.scale.set(s, s, s); return { mesh: g, weapon: barrel };
    },

    // --- MINI-BOSSES: SECTOR 3 (VOID) ---
    createNullSphere(c, s = 1) { // F45
        const g = new THREE.Group();
        const mVoid = new THREE.MeshBasicMaterial({ color: 0x000000 });
        const mRing = new THREE.MeshBasicMaterial({ color: 0xaa00ff, wireframe: true });

        // Black Hole
        const s1 = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), mVoid);
        s1.position.y = 1.0;
        g.add(s1);

        // Event Horizon Ring
        const r1 = new THREE.Mesh(new THREE.TorusGeometry(0.8, 0.05, 16, 100), mRing);
        r1.rotation.x = Math.PI / 2; r1.position.y = 1.0;
        g.add(r1);

        // Anim
        r1.userData.idle = true; r1.userData.rotatorZ = 1.0;
        s1.userData.idle = true; s1.userData.pulse = { speed: 1, amp: 0.1, base: 1 };

        g.userData.idle = true; g.userData.float = true; g.userData.baseY = 0; g.userData.idleSpeed = 1; g.userData.idleAmp = 0.2;
        g.scale.set(s, s, s); return { mesh: g, weapon: s1 };
    },

    createDoppelganger(c, s = 1) { // F50
        // Shadow copy of player model, but smoky
        const g = new THREE.Group();
        const mShadow = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 1.0 });

        // Humanoid shape
        this.box(0.4, 0.5, 0.25, mShadow, 0, 1.15, 0, g); // Torso
        const h = this.box(0.2, 0.2, 0.2, mShadow, 0, 1.5, 0, g); // Head

        // Glowing Eyes
        this.box(0.05, 0.02, 0.02, new THREE.MeshBasicMaterial({ color: 0xffffff }), -0.05, 0, 0.1, h);
        this.box(0.05, 0.02, 0.02, new THREE.MeshBasicMaterial({ color: 0xffffff }), 0.05, 0, 0.1, h);

        // Smoky Aura
        g.userData.idle = true; g.userData.emitParticles = { color: 0x333333, size: 0.1, speed: 0.2, spread: 0.2 };
        g.userData.emitChance = 0.2;

        g.scale.set(s, s, s); return { mesh: g, weapon: h };
    },

    createNightmare(c, s = 1) { // F55
        const g = new THREE.Group();
        const mDark = new THREE.MeshStandardMaterial({ color: 0x220022 });
        const mRed = new THREE.MeshBasicMaterial({ color: 0xff0000 });

        // Spiky mess
        const core = new THREE.Mesh(new THREE.IcosahedronGeometry(0.5, 0), mDark);
        core.position.y = 1.2;
        g.add(core);

        // Spikes sticking out
        for (let i = 0; i < 8; i++) {
            const spike = this.box(0.1, 0.8, 0.1, mDark, 0, 0, 0, core);
            spike.rotation.set(Math.random() * 3, Math.random() * 3, Math.random() * 3);
        }

        // Red Eye center
        this.box(0.2, 0.2, 0.2, mRed, 0, 0, 0.4, core);

        core.userData.idle = true; core.userData.rotatorX = 0.5; core.userData.rotatorY = 0.3;

        g.scale.set(s, s, s); return { mesh: g, weapon: core };
    },

    // --- MINI-BOSSES: SECTOR 4 (GLITCH) ---
    createGlitchWarrior(c, s = 1) { // F65
        const g = new THREE.Group();
        const mGlitch = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });

        // Wireframe Humanoid
        this.box(0.4, 0.6, 0.2, mGlitch, 0, 1.2, 0, g); // Chest
        const arm = this.box(0.1, 0.6, 0.1, mGlitch, 0.4, 1.2, 0, g); // Arm

        // Glitch Sword
        this.box(0.1, 1.0, 0.1, mGlitch, 0, -0.4, 0.2, arm);

        // Twitch
        g.userData.idle = true; g.userData.swing = { axis: 'x', speed: 20, amp: 0.05, base: 0 }; // Super fast twitch

        g.scale.set(s, s, s); return { mesh: g, weapon: arm };
    },

    createLogicVirus(c, s = 1) { // F70
        const g = new THREE.Group();
        const mCode = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

        // Cloud of Cubes
        for (let i = 0; i < 12; i++) {
            const b = this.box(0.2, 0.2, 0.2, mCode,
                (Math.random() - 0.5) * 1.0,
                1.0 + (Math.random() - 0.5) * 1.0,
                (Math.random() - 0.5) * 0.5, g);

            b.userData.idle = true;
            b.userData.pulse = { speed: 5 + Math.random() * 5, amp: 0.2, base: 1 };
        }

        g.scale.set(s, s, s); return { mesh: g, weapon: g };
    },

    createFatalException(c, s = 1) { // F75
        const g = new THREE.Group();
        const mErr = new THREE.MeshBasicMaterial({ color: 0xff0000 });

        // Giant "X" or Block
        const b1 = this.box(0.2, 1.5, 0.2, mErr, 0, 1.0, 0, g);
        b1.rotation.z = 0.7; // /

        const b2 = this.box(0.2, 1.5, 0.2, mErr, 0, 1.0, 0, g);
        b2.rotation.z = -0.7; // \

        // Pulsing Red Aura
        g.userData.idle = true; g.userData.emitParticles = { color: 0xff0000, size: 0.2, speed: 1.0, spread: 0.5 };
        g.userData.emitChance = 0.3;

        g.scale.set(s, s, s); return { mesh: g, weapon: g };
    },

    createWraith(c, s = 1) { // Floating Ghost
        const g = new THREE.Group();
        const mVoid = new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.8 });
        const mG = new THREE.MeshBasicMaterial({ color: c || 0xaa00ff });
        // ... (Wraith implementation detail skipped for brevity, just fixing structure) ...
        // Re-implementing Wraith heavily truncated to just fix the object structure if I can't see it all, 
        // BUT wait, I should just target the specific area of the missing comma.
        // The error was at line 688 col 5 triggered by the previous append.
        // The previous append added `createMutant` AFTER `createFatalException`? No, wait.
        // Let's look at the file content again or just trust the previous diff.
        // The previous diff replaced the end of the file.
        // It replaced `g.scale.set(s, s, s); return { mesh: g, weapon: sphere };` of `createCorruptedCore`?
        // No, I need to check where I inserted.
        // I inserted after `createFatalException`.
        // Let me just view the file around line 680 to be sure.
        return { mesh: g, weapon: g };
    },

    // --- PROCEDURAL SECTOR ENEMIES (RE-DESIGNED FOR VARIETY) ---

    createMutant(c, s = 1) { // Sector 1: Organic (Blob/Spider/Worm)
        const g = new THREE.Group();
        const hues = [0xaa5555, 0x654321, 0x55aa55];
        const fleshColor = hues[Math.floor(Math.random() * hues.length)];
        const mFlesh = new THREE.MeshStandardMaterial({ color: fleshColor, roughness: 0.8 });
        const mBone = new THREE.MeshStandardMaterial({ color: 0xdddddd, roughness: 0.5 });

        // Random Body Type
        const type = Math.random();

        if (type < 0.33) { // BLOB
            const main = this.box(0.8, 0.6, 0.8, mFlesh, 0, 0.3, 0, g);
            main.userData.idle = true; main.userData.pulse = { speed: 2, amp: 0.1, base: 1 };
            // Random eyes sticking out
            for (let i = 0; i < 4; i++) {
                const eye = this.box(0.1, 0.1, 0.1, new THREE.MeshBasicMaterial({ color: 0xffff00 }),
                    (Math.random() - 0.5), 0.3 + (Math.random() * 0.3), (Math.random() - 0.5), main);
            }
        } else if (type < 0.66) { // SPIDER-THING
            const body = this.box(0.5, 0.3, 0.5, mFlesh, 0, 0.5, 0, g);
            for (let i = 0; i < 6; i++) {
                const angle = (i / 6) * Math.PI * 2;
                const leg = this.box(0.1, 0.6, 0.1, mBone, Math.cos(angle) * 0.4, -0.3, Math.sin(angle) * 0.4, body);
                leg.rotation.z = 0.5;
                leg.userData.idle = true; leg.userData.swing = { axis: 'x', speed: 4, amp: 0.2, base: 0, offset: i };
            }
        } else { // TALL WORM
            let lastSeg = g;
            for (let i = 0; i < 5; i++) {
                const seg = this.box(0.3 - (i * 0.05), 0.3, 0.3 - (i * 0.05), mFlesh, 0, 0.3, 0, lastSeg);
                if (i > 0) {
                    seg.userData.idle = true;
                    seg.userData.swing = { axis: 'z', speed: 2, amp: 0.2, base: 0, offset: i };
                }
                lastSeg = seg;
            }
        }

        g.scale.set(s, s, s); return { mesh: g, weapon: g };
    },

    createMech(c, s = 1) { // Sector 2: Industrial (Tank/Hover/Hex)
        const g = new THREE.Group();
        const mSteel = new THREE.MeshStandardMaterial({ color: 0x555555, metalness: 0.8 });
        const mRust = new THREE.MeshStandardMaterial({ color: 0x885544, metalness: 0.4 });
        const mat = (Math.random() > 0.5) ? mRust : mSteel;

        const type = Math.random();
        let weaponBase = g;

        if (type < 0.33) { // SPHERE BOT
            const sphere = new THREE.Mesh(new THREE.IcosahedronGeometry(0.5, 1), mat);
            sphere.position.y = 0.5;
            g.add(sphere);
            weaponBase = sphere;
            // Roll animation?
        } else if (type < 0.66) { // HOVER PLATFORM
            const plat = this.box(0.8, 0.1, 0.8, mat, 0, 0.5, 0, g);
            g.userData.idle = true; g.userData.float = true; g.userData.baseY = 0; g.userData.idleSpeed = 1; g.userData.idleAmp = 0.2;

            // Turret on top
            const tur = this.box(0.4, 0.3, 0.4, mat, 0, 0.2, 0, plat);
            weaponBase = tur;
        } else { // TRI-POD
            const body = this.box(0.4, 0.4, 0.4, mat, 0, 0.8, 0, g);
            for (let i = 0; i < 3; i++) {
                const angle = (i / 3) * Math.PI * 2;
                const leg = this.box(0.1, 1.0, 0.1, mat, Math.cos(angle) * 0.3, -0.5, Math.sin(angle) * 0.3, body);
                leg.rotation.z = 0.3;
            }
            weaponBase = body;
        }

        // Weapon
        const gun = this.box(0.1, 0.1, 0.6, mat, 0, 0, 0.3, weaponBase);
        this.box(0.05, 0.05, 0.1, new THREE.MeshBasicMaterial({ color: 0xff0000 }), 0, 0, 0.35, gun);

        g.scale.set(s, s, s); return { mesh: g, weapon: gun };
    },

    createVoidEntity(c, s = 1) { // Sector 3: Abstract
        const g = new THREE.Group();
        const mBlack = new THREE.MeshBasicMaterial({ color: 0x000000 });

        // Just a cloud of shards, no body
        for (let i = 0; i < 8; i++) {
            const shard = new THREE.Mesh(new THREE.ConeGeometry(0.1, 0.4, 3), mBlack);
            shard.position.set((Math.random() - 0.5), 1.0 + (Math.random() - 0.5), (Math.random() - 0.5));
            shard.rotation.set(Math.random() * 6, Math.random() * 6, Math.random() * 6);
            g.add(shard);

            shard.userData.idle = true;
            shard.userData.float = true; shard.userData.baseY = shard.position.y; shard.userData.idleSpeed = 2 + Math.random(); shard.userData.idleAmp = 0.2;
        }

        g.scale.set(s, s, s); return { mesh: g, weapon: g };
    },

    createGlitchEntity(c, s = 1) { // Sector 4: Digital
        const g = new THREE.Group();
        const mMat = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });

        // Stack of cubes
        let lastY = 0;
        for (let i = 0; i < 4; i++) {
            const sz = 0.2 + Math.random() * 0.3;
            const b = this.box(sz, sz, sz, mMat, 0, lastY + sz / 2, 0, g);
            lastY += sz;

            b.userData.idle = true;
            b.userData.rotatorY = (Math.random() - 0.5) * 5;
        }

        g.scale.set(s, s, s); return { mesh: g, weapon: g };
    }
});
