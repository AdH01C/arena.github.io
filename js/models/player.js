Object.assign(window.Models, {
    // Helper: Deterministic Random used for Procedural Generation
    rng(seed) {
        // Simple fast PRNG
        const x = Math.sin(seed++) * 10000;
        return x - Math.floor(x);
    },

    // === CLASS-SPECIFIC PLAYER MODELS ===
    createRonin(c, s = 1, tier = 0, seed = 0) {
        const g = new THREE.Group();
        const rnd = (offset) => this.rng(seed + offset);

        const mB = new THREE.MeshStandardMaterial({ color: 0x222, metalness: 0.9, roughness: 0.1 });
        const mG = new THREE.MeshBasicMaterial({ color: c });
        const mBlade = new THREE.MeshStandardMaterial({ color: 0xaaaaff, metalness: 1, roughness: 0.1, emissive: c, emissiveIntensity: 2 });

        // --- VARIANTS ---
        // 0: Classic, 1: Armored, 2: Cyber-Robes
        const style = Math.floor(rnd(1) * 3);
        const hasHat = rnd(2) > 0.5;
        const maskType = Math.floor(rnd(3) * 3); // 0: Visor, 1: Oni, 2: Bandage

        // Animated Torso
        const t = this.box(0.4, 0.45, 0.3, mB, 0, 0.65, 0, g);
        this.box(0.15, 0.15, 0.1, mG, 0, 0, 0.16, t); // Core
        t.userData.idle = true; t.userData.pulse = { speed: 2, amp: 0.02, base: 1 };

        // Legs
        if (style === 2) {
            // Robes
            this.box(0.35, 0.5, 0.3, mB, 0, 0.25, 0, g);
        } else {
            this.box(0.12, 0.5, 0.15, mB, -0.15, 0.25, 0, g);
            this.box(0.12, 0.5, 0.15, mB, 0.15, 0.25, 0, g);
        }

        // Head
        const h = this.box(0.25, 0.25, 0.25, mB, 0, 0.45, 0, t);

        // Headgear Procedural
        if (maskType === 0) {
            this.box(0.22, 0.06, 0.05, mG, 0, 0.02, 0.13, h); // Cyber Visor
        } else if (maskType === 1) {
            // Oni Horns
            const hornL = this.box(0.04, 0.15, 0.04, mG, -0.08, 0.15, 0.1, h); hornL.rotation.z = 0.3;
            const hornR = this.box(0.04, 0.15, 0.04, mG, 0.08, 0.15, 0.1, h); hornR.rotation.z = -0.3;
        } else {
            // Bandage/Half-mask
            this.box(0.26, 0.1, 0.26, new THREE.MeshStandardMaterial({ color: 0x555 }), 0, -0.05, 0, h);
        }

        // Hat
        if (hasHat) {
            const hatRef = this.box(0.6, 0.05, 0.6, new THREE.MeshStandardMaterial({ color: 0x111 }), 0, 0.15, 0, h);
            this.box(0.3, 0.15, 0.3, new THREE.MeshStandardMaterial({ color: 0x111 }), 0, 0.1, 0, hatRef);
        }

        // Scarf (Random Style)
        if (tier >= 2 || rnd(4) > 0.6) {
            const scarfLen = 0.5 + rnd(5) * 0.8;
            const scarf = this.box(0.3, scarfLen, 0.03, mG, 0, -0.1, -0.15, t);
            scarf.rotation.x = 0.3 + (rnd(6) * 0.4);
            scarf.userData.idle = true; scarf.userData.swing = { axis: 'x', speed: 4, amp: 0.3, base: scarf.rotation.x };
        }

        // Arms
        const ag = new THREE.Group(); ag.position.y = 0.25; t.add(ag);
        const leftArm = new THREE.Group(); leftArm.position.set(-0.35, 0, 0); ag.add(leftArm);
        this.box(0.1, 0.5, 0.1, mB, 0, -0.25, 0, leftArm);

        const rightArm = new THREE.Group(); rightArm.position.set(0.35, 0, 0); ag.add(rightArm);
        this.box(0.1, 0.5, 0.1, mB, 0, -0.25, 0, rightArm);

        // Katana
        const katana = new THREE.Group(); katana.position.set(0, -0.35, 0.2); rightArm.add(katana);
        const bladeLen = 1.2 + (rnd(7) * 0.8);
        const bladeCurve = (rnd(8) - 0.5) * 0.2;

        const bladeMesh = this.box(0.03, bladeLen, 0.04, mBlade, 0, bladeLen / 2 - 0.1, 0, katana);
        bladeMesh.rotation.x = bladeCurve;

        this.box(0.08, 0.1, 0.08, mB, 0, 0, 0, katana); // Hilt

        katana.userData.idle = true; katana.userData.pulse = { speed: 6, amp: 0.1, base: 1 };

        // Idle Animations
        leftArm.userData.idle = true; leftArm.userData.swing = { axis: 'x', speed: 2, amp: 0.1, base: 0 };
        rightArm.userData.idle = true; rightArm.userData.swing = { axis: 'x', speed: 2, amp: 0.1, base: 0, offset: Math.PI };

        g.scale.set(s, s, s); return { mesh: g, weapon: rightArm };
    },

    createPriest(c, s = 1, tier = 0, seed = 0) {
        const g = new THREE.Group();
        const rnd = (offset) => this.rng(seed + offset + 200);

        const mB = new THREE.MeshStandardMaterial({ color: 0x444, metalness: 0.6, roughness: 0.3 });
        const mG = new THREE.MeshBasicMaterial({ color: c });
        const mGold = new THREE.MeshStandardMaterial({ color: 0xffd700, metalness: 1, roughness: 0.2, emissive: 0x332200 });

        // Floating/Bobbing Body
        g.userData.idle = true; g.userData.float = true; g.userData.baseY = 0; g.userData.idleSpeed = 1.5; g.userData.idleAmp = 0.05;

        // Robes
        this.box(0.35, 0.6, 0.3, mB, 0, 0.3, 0, g); // Skirt
        const t = this.box(0.45, 0.5, 0.35, mB, 0, 0.7, 0, g); // Torso
        this.box(0.1, 0.4, 0.05, mG, 0, 0, 0.18, t); // Scarf down middle

        // Procedural Head
        const hatType = Math.floor(rnd(1) * 3); // 0: None/Hood, 1: Mitre, 2: Halo Ring
        const h = this.box(0.22, 0.25, 0.22, mB, 0, 0.48, 0, t);
        this.box(0.18, 0.08, 0.05, mG, 0, 0.02, 0.12, h); // Eyes

        if (hatType === 1) {
            const mitre = this.box(0.2, 0.4, 0.1, mGold, 0, 0.3, 0, h);
            mitre.scale.set(1, 1, 1.5); // Pointy
        } else if (hatType === 2 || tier >= 3) {
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
        rightArm.rotation.x = -0.5;

        // Staff Procedural
        const staffHead = Math.floor(rnd(2) * 3); // 0: Orb, 1: Cross, 2: Crescent
        const staff = new THREE.Group(); staff.position.set(0, -0.3, 0.1); rightArm.add(staff);
        this.box(0.04, 1.4, 0.04, mGold, 0, 0.4, 0, staff);

        if (staffHead === 0) {
            const orb = new THREE.Mesh(new THREE.SphereGeometry(0.12, 8, 8), mG);
            orb.position.y = 1.1; staff.add(orb);
            orb.userData.idle = true; orb.userData.pulse = { speed: 2, amp: 0.05, base: 1 };
        } else if (staffHead === 1) {
            this.box(0.4, 0.05, 0.05, mGold, 0, 1.1, 0, staff);
            this.box(0.05, 0.4, 0.05, mGold, 0, 1.1, 0, staff);
        } else {
            const moon = new THREE.Mesh(new THREE.TorusGeometry(0.15, 0.03, 8, 16, Math.PI), mGold);
            moon.position.y = 1.1; moon.rotation.z = Math.PI / 2; staff.add(moon);
        }

        g.scale.set(s, s, s); return { mesh: g, weapon: rightArm };
    },

    createMech(c, s = 1, tier = 0, seed = 0) {
        const g = new THREE.Group();
        const rnd = (offset) => this.rng(seed + offset + 300);

        const mB = new THREE.MeshStandardMaterial({ color: 0x555, metalness: 0.95, roughness: 0.1 });
        const mG = new THREE.MeshBasicMaterial({ color: c });
        const mDark = new THREE.MeshStandardMaterial({ color: 0x222, metalness: 0.9, roughness: 0.2 });

        const bodyType = Math.floor(rnd(1) * 2); // 0: Bulky, 1: Walker

        // Heavy Torso
        const t = this.box(0.8, 0.6, 0.5, mB, 0, 0.8, 0, g);
        this.box(0.3, 0.2, 0.1, mG, 0, 0, 0.26, t); // Reactor core

        // Procedural Vents
        const ventCount = 2 + Math.floor(rnd(2) * 4);
        for (let i = 0; i < ventCount; i++) {
            const v = this.box(0.1, 0.3, 0.1, mDark, (rnd(3 + i) - 0.5) * 0.6, 0.3, -0.25, t);
            v.userData.idle = true; v.userData.pulse = { speed: 5 + i, amp: 0.05, base: 1 };
        }

        // Legs
        if (bodyType === 0) {
            this.box(0.25, 0.6, 0.3, mB, -0.25, 0.3, 0, g);
            this.box(0.25, 0.6, 0.3, mB, 0.25, 0.3, 0, g);
        } else {
            // Reverse Joint
            this.box(0.15, 0.4, 0.2, mDark, -0.3, 0.4, 0.1, g);
            this.box(0.2, 0.5, 0.2, mB, -0.3, 0.1, -0.1, g);

            this.box(0.15, 0.4, 0.2, mDark, 0.3, 0.4, 0.1, g);
            this.box(0.2, 0.5, 0.2, mB, 0.3, 0.1, -0.1, g);
        }

        // Head
        const h = this.box(0.35, 0.25, 0.3, mDark, 0, 0.45, 0, t);
        this.box(0.25, 0.08, 0.05, mG, 0, 0, 0.16, h); // Visor

        // Arms
        const ag = new THREE.Group(); ag.position.y = 0.2; t.add(ag);
        const leftArm = new THREE.Group(); leftArm.position.set(-0.6, 0, 0); ag.add(leftArm);
        this.box(0.2, 0.5, 0.2, mB, 0, -0.2, 0, leftArm);

        const rightArm = new THREE.Group(); rightArm.position.set(0.6, 0, 0); ag.add(rightArm);
        this.box(0.2, 0.5, 0.2, mB, 0, -0.2, 0, rightArm);

        // Gun Arm Procedural
        const gunType = Math.floor(rnd(5) * 3); // 0: Gatling, 1: Cannon, 2: Rail
        const gun = new THREE.Group(); gun.position.set(0, -0.4, 0.2); rightArm.add(gun);

        if (gunType === 0) {
            // Gatling
            this.box(0.15, 0.15, 0.5, mDark, 0, 0, 0, gun);
            // Barrels
            const bGroup = new THREE.Group(); bGroup.position.z = 0.25; gun.add(bGroup);
            for (let i = 0; i < 4; i++) {
                this.box(0.04, 0.04, 0.4, mB, Math.cos(i * 1.57) * 0.06, Math.sin(i * 1.57) * 0.06, 0.2, bGroup);
            }
            bGroup.userData.idle = true; bGroup.userData.rotatorZ = 0.2;
        } else if (gunType === 1) {
            // Cannon
            this.box(0.2, 0.2, 0.8, mDark, 0, 0, 0.2, gun);
            this.box(0.22, 0.22, 0.1, mB, 0, 0, 0.6, gun);
        } else {
            // Rail
            this.box(0.1, 0.3, 0.8, mB, 0, 0, 0.2, gun); // Vertical split
            this.box(0.05, 0.05, 0.8, mG, 0, 0, 0.2, gun); // Energy core
        }

        g.scale.set(s, s, s); return { mesh: g, weapon: rightArm };
    },

    createShadow(c, s = 1, tier = 0, seed = 0) {
        const g = new THREE.Group();
        const rnd = (offset) => this.rng(seed + offset + 400);

        const mB = new THREE.MeshStandardMaterial({ color: 0x111, metalness: 0.3, roughness: 0.8 });
        const mG = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const mD = new THREE.MeshStandardMaterial({ color: 0x000, metalness: 0.5, roughness: 0.5 });
        const mVoid = new THREE.MeshBasicMaterial({ color: 0xaa00ff, transparent: true, opacity: 0.7 });

        // Legs
        this.box(0.1, 0.5, 0.1, mB, -0.12, 0.25, 0, g);
        this.box(0.1, 0.5, 0.1, mB, 0.12, 0.25, 0, g);

        // Torso
        const t = this.box(0.35, 0.4, 0.2, mB, 0, 0.7, 0, g);

        // Procedural Hood
        const hoodType = Math.floor(rnd(1) * 3); // 0: Cowl, 1: Deep Hood, 2: Tattered
        const hood = this.box(0.3, 0.25, 0.28, mD, 0, 0.45, 0, t);
        if (hoodType === 1) {
            // Deep
            this.box(0.32, 0.1, 0.3, mD, 0, 0.1, 0.05, hood);
        } else if (hoodType === 2) {
            // Scarf
            this.box(0.35, 0.15, 0.3, new THREE.MeshStandardMaterial({ color: 0x330033 }), 0, -0.2, 0, hood);
        }

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

        // Procedural Daggers
        const wType = Math.floor(rnd(2) * 3); // 0: Straight, 1: Curved, 2: Katar
        const dMat = tier >= 4 ? mVoid : mD;

        if (wType === 0) {
            const dagger1 = new THREE.Group(); dagger1.position.set(0, -0.3, 0.05); rightArm.add(dagger1);
            this.box(0.02, 0.02, 0.3, mD, 0, 0, 0.1, dagger1); // Handle
            this.box(0.01, 0.01, 0.25, mG, 0, 0, 0.15, dagger1); // Edge
            const dagger2 = dagger1.clone(); leftArm.add(dagger2);
        } else if (wType === 1) {
            // Curved
            const dagger1 = new THREE.Group(); dagger1.position.set(0, -0.3, 0.05); rightArm.add(dagger1);
            const blade = this.box(0.04, 0.25, 0.02, dMat, 0, 0.1, 0.1, dagger1);
            blade.rotation.x = -0.5;
            const dagger2 = dagger1.clone(); leftArm.add(dagger2);
        } else {
            // Katar
            const katar = new THREE.Group(); katar.position.set(0, -0.3, 0); rightArm.add(katar);
            this.box(0.1, 0.2, 0.02, dMat, 0, 0, 0.1, katar);
            this.box(0.02, 0.3, 0.02, mG, 0, 0.1, 0.15, katar);
            const k2 = katar.clone(); leftArm.add(k2);
        }

        g.scale.set(s, s, s); return { mesh: g, weapon: rightArm };
    },

    createBrawler(c, s = 1, tier = 0, seed = 0) {
        const g = new THREE.Group();
        const rnd = (offset) => this.rng(seed + offset + 600);

        const mB = new THREE.MeshStandardMaterial({ color: c || 0xff4400, metalness: 0.4, roughness: 0.6 });
        const mG = new THREE.MeshBasicMaterial({ color: 0xff6600 });
        const mD = new THREE.MeshStandardMaterial({ color: 0x333333, metalness: 0.7, roughness: 0.3 });
        const mMetal = new THREE.MeshStandardMaterial({ color: 0x888888, metalness: 0.9, roughness: 0.2 });

        // Bouncing Idle
        g.userData.idle = true; g.userData.pulse = { speed: 3, amp: 0.03, base: 1 };

        // Legs
        this.box(0.14, 0.5, 0.14, mB, -0.15, 0.25, 0, g);
        this.box(0.14, 0.5, 0.14, mB, 0.15, 0.25, 0, g);

        // Torso
        const t = this.box(0.45, 0.45, 0.25, mB, 0, 0.72, 0, g);
        this.box(0.15, 0.08, 0.05, mG, 0, 0.1, 0.13, t); // Belt buckle

        // Procedural Head Gear
        const headType = Math.floor(rnd(1) * 3); // 0: Headband, 1: Helmet, 2: Mask
        const h = this.box(0.2, 0.22, 0.2, mB, 0, 0.38, 0, t);

        if (headType === 0) {
            this.box(0.22, 0.06, 0.05, mG, 0, 0, 0.1, h); // Headband
            // Tail
            const tail = this.box(0.05, 0.3, 0.02, mG, 0, 0, -0.12, h);
            tail.rotation.x = 0.5;
            tail.userData.idle = true; tail.userData.swing = { axis: 'x', speed: 4, amp: 0.5, base: 0.5 };
        } else if (headType === 1) {
            this.box(0.22, 0.24, 0.22, mD, 0, 0, 0, h); // Helmet
            this.box(0.2, 0.05, 0.05, mG, 0, 0, 0.12, h); // Visor
        } else {
            // Mask
            this.box(0.21, 0.15, 0.05, mD, 0, -0.02, 0.11, h);
            this.box(0.05, 0.05, 0.06, mG, -0.05, -0.02, 0.11, h); // Eye
            this.box(0.05, 0.05, 0.06, mG, 0.05, -0.02, 0.11, h); // Eye
        }

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

        // Procedural Gauntlets
        const gloveType = Math.floor(rnd(2) * 3); // 0: Standard, 1: Piston, 2: Spiked
        const gMat = gloveType === 1 ? mMetal : mG;

        const createGlove = (parent) => {
            const gMesh = this.box(0.16, 0.16, 0.16, gMat, 0, -0.35, 0.05, parent);
            if (gloveType === 1) {
                // Piston
                this.box(0.1, 0.2, 0.1, mD, 0, 0.15, 0, gMesh);
            } else if (gloveType === 2) {
                // Spikes
                const s1 = this.box(0.02, 0.02, 0.1, mMetal, 0, 0, 0.1, gMesh);
                const s2 = this.box(0.02, 0.02, 0.1, mMetal, 0.05, 0, 0.1, gMesh);
                const s3 = this.box(0.02, 0.02, 0.1, mMetal, -0.05, 0, 0.1, gMesh);
            }
            return gMesh;
        };

        const g1 = createGlove(leftArm);
        const g2 = createGlove(rightArm);

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
            // Heat Haze / Sweat
            t.userData.emitParticles = { color: 0xffaa00, size: 0.05, speed: 0.6, spread: 0.2 };
            t.userData.emitChance = 0.15;
            // Fist Trails
            g1.userData.emitParticles = { color: 0xff6600, size: 0.03, speed: 0.2, spread: 0.1 };
            g1.userData.emitChance = 0.1;
            g2.userData.emitParticles = { color: 0xff6600, size: 0.03, speed: 0.2, spread: 0.1 };
            g2.userData.emitChance = 0.1;
        }

        g.scale.set(s, s, s); return { mesh: g, weapon: rightArm };
    },

    createGunslinger(c, s = 1, tier = 0, seed = 0) {
        const g = new THREE.Group();
        const rnd = (offset) => this.rng(seed + offset + 700);

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

        // Procedural Hat
        const hatType = Math.floor(rnd(1) * 3); // 0: Cowboy, 1: Fedora, 2: Cyber-Cap
        const h = this.box(0.2, 0.22, 0.2, mS, 0, 0.35, 0, t);

        if (hatType === 0) {
            this.box(0.5, 0.02, 0.5, mB, 0, 0.1, 0, h); // Brim
            this.box(0.25, 0.15, 0.25, mB, 0, 0.18, 0, h); // Top
        } else if (hatType === 1) {
            this.box(0.4, 0.02, 0.4, mS, 0, 0.1, 0, h); // Smaller Brim
            this.box(0.22, 0.12, 0.22, mS, 0, 0.16, 0, h); // Top
        } else {
            // Cyber Cap
            this.box(0.22, 0.05, 0.3, mB, 0, 0.12, 0.05, h);
            this.box(0.22, 0.02, 0.1, mG, 0, 0.12, 0.2, h); // Visor rim
        }

        this.box(0.08, 0.05, 0.02, mG, 0.05, 0.05, 0.11, h); // Cigar/Light

        // Poncho Variants
        if (tier >= 2 || rnd(2) > 0.5) {
            const ponchoColor = rnd(3) > 0.5 ? mB : new THREE.MeshStandardMaterial({ color: 0x553311 });
            const poncho = this.box(0.45, 0.2, 0.3, ponchoColor, 0, 0.15, 0, t);
            poncho.rotation.z = -0.1;
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

        // Procedural Gun
        const gunType = Math.floor(rnd(4) * 3); // 0: Revolver, 1: Pistol, 2: Blaster

        const createGun = () => {
            const gun = new THREE.Group();
            this.box(0.04, 0.1, 0.03, mB, 0, -0.05, 0, gun); // Handle

            if (gunType === 0) {
                this.box(0.05, 0.05, 0.25, mGun, 0, 0, 0.1, gun); // Barrel
                const chamber = this.box(0.06, 0.06, 0.08, mS, 0, 0, 0, gun); // Chamber
                chamber.userData.idle = true; chamber.userData.rotatorZ = 0.5;
            } else if (gunType === 1) {
                this.box(0.05, 0.08, 0.2, mS, 0, 0.02, 0.05, gun); // Slide
                this.box(0.04, 0.04, 0.21, mGun, 0, 0.02, 0.05, gun); // Barrel inside
            } else {
                // Blaster
                this.box(0.06, 0.1, 0.2, mB, 0, 0, 0.05, gun); // Body
                this.box(0.04, 0.04, 0.1, mG, 0, 0, 0.15, gun); // Emitter
                this.box(0.08, 0.08, 0.02, mG, 0, 0, -0.05, gun); // Coil
            }

            // Smoke
            if (tier >= 3) {
                const tip = new THREE.Object3D(); tip.position.z = 0.25; gun.add(tip);
                tip.userData.idle = true;
                tip.userData.emitParticles = { color: 0x555555, size: 0.02, speed: 0.3, spread: 0.05 };
                tip.userData.emitChance = 0.05;
            }
            return gun;
        };

        const gun = createGun();
        gun.position.set(0, -0.35, 0.1);
        rightArm.add(gun);

        // Dual Wield (Tier 4+)
        if (tier >= 4) {
            const gun2 = createGun();
            gun2.position.set(0, -0.35, 0.1);
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

    createKnight(c, s = 1, tier = 0, seed = 0) {
        const g = new THREE.Group();
        const rnd = (offset) => this.rng(seed + offset + 100);

        // --- MATERIALS ---
        let mainColor = tier < 3 ? 0x888888 : (tier < 6 ? 0xffeeaa : 0x220044);
        if (tier >= 9) mainColor = 0x00f2ff;

        const mArmor = new THREE.MeshStandardMaterial({ color: mainColor, metalness: 0.7, roughness: 0.3 });
        const mDark = new THREE.MeshStandardMaterial({ color: 0x2a2a2a, metalness: 0.5, roughness: 0.7 });
        const mGold = new THREE.MeshStandardMaterial({ color: 0xffd700, metalness: 1.0, roughness: 0.2 });
        const mEnergy = new THREE.MeshBasicMaterial({ color: c || 0x00aaff, transparent: true, opacity: 0.85 });

        const bScale = 1.0 + (tier * 0.04);

        // --- Procedural Choices ---
        const pauldronType = Math.floor(rnd(1) * 3); // 0: Square, 1: Round, 2: Spiked
        const shieldType = Math.floor(rnd(2) * 3); // 0: Kite, 1: Tower, 2: Round
        const helmetType = Math.floor(rnd(3) * 3); // 0: Greathelm, 1: Visor, 2: Open

        // --- HEAD ---
        const headGroup = new THREE.Group(); headGroup.position.y = 1.65 * bScale; g.add(headGroup);
        if (helmetType === 0) {
            this.box(0.25, 0.3, 0.25, mArmor, 0, 0, 0, headGroup); // Bucket
            this.box(0.26, 0.05, 0.26, mDark, 0, 0, 0, headGroup); // Slit
        } else if (helmetType === 1) {
            this.box(0.22, 0.28, 0.26, mArmor, 0, 0, 0, headGroup);
            this.box(0.23, 0.1, 0.2, mGold, 0, 0.05, 0.05, headGroup); // Gold Visor
        } else {
            this.box(0.22, 0.28, 0.24, mArmor, 0, 0, 0, headGroup);
            const wings = new THREE.Group();
            this.box(0.05, 0.2, 0.2, mGold, -0.15, 0.1, 0, wings);
            this.box(0.05, 0.2, 0.2, mGold, 0.15, 0.1, 0, wings);
            headGroup.add(wings);
        }

        // --- TORSO ---
        const torsoGroup = new THREE.Group(); torsoGroup.position.y = 1.0 * bScale; g.add(torsoGroup);
        this.box(0.45 * bScale, 0.5 * bScale, 0.3 * bScale, mArmor, 0, 0.25, 0, torsoGroup);
        // Chest Emblem
        if (rnd(4) > 0.5) {
            this.box(0.2, 0.2, 0.05, mGold, 0, 0.3, 0.16, torsoGroup);
        }

        // Arms (Pauldrons)
        const createShoulder = (side) => {
            const p = new THREE.Group(); p.position.set(side * 0.3, 0.5, 0); torsoGroup.add(p);
            if (pauldronType === 0) {
                this.box(0.25, 0.25, 0.25, mArmor, 0, 0, 0, p);
            } else if (pauldronType === 1) {
                const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.15), mArmor);
                p.add(sphere);
            } else {
                this.box(0.2, 0.2, 0.2, mArmor, 0, 0, 0, p);
                this.box(0.05, 0.3, 0.05, mGold, 0, 0.2, 0, p); // Spike
            }
        };
        createShoulder(-1); createShoulder(1);

        // Arms visual
        const ag = new THREE.Group(); ag.position.y = 1.35 * bScale; g.add(ag);
        const lArm = new THREE.Group(); lArm.position.set(-0.35, 0, 0); ag.add(lArm);
        this.box(0.12, 0.6, 0.12, mArmor, 0, -0.3, 0, lArm);
        const rArm = new THREE.Group(); rArm.position.set(0.35, 0, 0); ag.add(rArm);
        this.box(0.12, 0.6, 0.12, mArmor, 0, -0.3, 0, rArm);

        // SHIELD (Left)
        const shield = new THREE.Group(); shield.position.set(0.1, -0.35, 0.2); lArm.add(shield);
        shield.rotation.y = 1.57;
        if (shieldType === 0) {
            // Kite
            this.box(0.5, 0.7, 0.05, mArmor, 0, 0, 0, shield);
            this.box(0.3, 0.5, 0.06, mGold, 0, 0.1, 0, shield);
        } else if (shieldType === 1) {
            // Tower
            this.box(0.6, 0.9, 0.08, mArmor, 0, 0, 0, shield);
        } else {
            // Round
            const sMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.05, 16), mArmor);
            sMesh.rotation.x = Math.PI / 2;
            shield.add(sMesh);
        }

        // SWORD (Right)
        const sword = new THREE.Group(); sword.position.set(0, -0.35, 0); rArm.add(sword);
        sword.rotation.x = -1.0;
        let bLen = 1.2 + rnd(5) * 0.5;
        this.box(0.1, 0.1, bLen, mArmor, 0, 0, bLen / 2, sword); // Blade
        this.box(0.3, 0.05, 0.1, mGold, 0, 0, 0, sword); // Guard

        // Idle
        torsoGroup.userData.idle = true; torsoGroup.userData.pulse = { speed: 1.5, amp: 0.01, base: 1 };
        rArm.userData.idle = true; rArm.userData.swing = { axis: 'x', speed: 1.0, amp: 0.1, base: 0, offset: Math.PI };
        lArm.userData.idle = true; lArm.userData.swing = { axis: 'x', speed: 1.0, amp: 0.05, base: 0 };

        g.scale.set(s, s, s); return { mesh: g, weapon: rArm };
    },

    createHacker(c, s = 1, tier = 0, seed = 0) {
        const g = new THREE.Group();
        const rnd = (offset) => this.rng(seed + offset + 500);

        const mDark = new THREE.MeshStandardMaterial({ color: 0x111111, metalness: 0.8, roughness: 0.2 });
        const mCode = new THREE.MeshBasicMaterial({ color: c || 0x00ff00 });
        const mScreen = new THREE.MeshBasicMaterial({ color: 0x000000 });

        const glitchLegs = rnd(1) > 0.5;

        // Glitchy Legs
        if (tier < 7 && !glitchLegs) {
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

        // Monitor Head Prodedural
        const faceType = Math.floor(rnd(2) * 3); // 0: CRT, 1: Flat, 2: Hologram
        const h = new THREE.Group(); h.position.set(0, 0.4, 0); t.add(h);

        if (faceType === 0) {
            this.box(0.35, 0.25, 0.3, mDark, 0, 0, 0, h);
            const screen = this.box(0.3, 0.2, 0.05, mCode, 0, 0, 0.14, h);
            screen.userData.idle = true; screen.userData.pulse = { speed: 8, amp: 0.05, base: 1 };
        } else if (faceType === 1) {
            this.box(0.35, 0.05, 0.2, mDark, 0, -0.1, 0, h);
            const screen = this.box(0.35, 0.3, 0.02, mCode, 0, 0.05, 0.05, h);
            screen.material.transparent = true; screen.material.opacity = 0.8;
            screen.userData.idle = true; screen.userData.pulse = { speed: 10, amp: 0.02, base: 1 };
        } else {
            // Hologram Head
            const core = this.box(0.15, 0.15, 0.15, mDark, 0, 0, 0, h);
            const orb = new THREE.Mesh(new THREE.IcosahedronGeometry(0.2, 0), mCode);
            orb.material.wireframe = true;
            h.add(orb);
            orb.userData.idle = true; orb.userData.rotatorY = 1.0; orb.userData.rotatorX = 0.5;
        }

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

    createReaper(c, s = 1, tier = 0, seed = 0) {
        const g = new THREE.Group();
        const rnd = (offset) => this.rng(seed + offset + 800);

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

        // Cape/Rags Procedural
        const ragCount = 3 + Math.floor(rnd(1) * 4);
        for (let i = 0; i < ragCount; i++) {
            const rag = this.box(0.1, 0.6 + rnd(2 + i) * 0.4, 0.02, mB, (rnd(3 + i) - 0.5) * 0.5, -0.2, -0.2, t);
            rag.rotation.x = 0.2 + rnd(4 + i) * 0.2;
            rag.rotation.z = (rnd(5 + i) - 0.5) * 0.5;
            rag.userData.idle = true; rag.userData.swing = { axis: 'x', speed: 2 + rnd(6 + i), amp: 0.15, base: rag.rotation.x };
        }

        // Arms
        const ag = new THREE.Group(); ag.position.y = 0.2; t.add(ag);
        const leftArm = new THREE.Group(); leftArm.position.set(-0.35, 0, 0.1); ag.add(leftArm);
        this.box(0.1, 0.45, 0.1, mB, 0, -0.2, 0, leftArm);

        const rightArm = new THREE.Group(); rightArm.position.set(0.35, 0, 0.1); ag.add(rightArm);
        this.box(0.1, 0.45, 0.1, mB, 0, -0.2, 0, rightArm);
        rightArm.rotation.x = -0.8; // Holding scythe forward

        // SCYTHE Procedural blade
        const scythe = new THREE.Group(); scythe.position.set(0, -0.4, 0.1); rightArm.add(scythe);
        this.box(0.05, 1.8, 0.05, mB, 0, 0.4, 0, scythe); // Staff

        const blade = new THREE.Group(); blade.position.y = 1.2; scythe.add(blade);
        const bladeType = Math.floor(rnd(7) * 3); // 0: Classic, 1: Energy Double, 2: Serrated

        if (bladeType === 0) {
            this.box(0.8, 0.15, 0.03, mScythe, 0.3, 0, 0, blade); // Main blade
        } else if (bladeType === 1) {
            this.box(0.8, 0.1, 0.03, mScythe, 0.3, 0.1, 0, blade);
            this.box(0.6, 0.1, 0.03, mScythe, 0.2, -0.1, 0, blade);
        } else {
            // Serrated
            for (let k = 0; k < 5; k++) {
                this.box(0.15, 0.1 - k * 0.01, 0.03, mScythe, 0.1 + k * 0.15, k * 0.05, 0, blade);
            }
        }
        blade.rotation.z = -0.4;

        // Spectral Trail
        if (tier >= 3) {
            blade.userData.emitParticles = { color: 0xaa00ff, size: 0.06, speed: 0.1, spread: 0.2 };
            blade.userData.emitChance = 0.2;
        }

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

    createSummoner(c, s = 1, tier = 0, seed = 0) {
        const g = new THREE.Group();
        const rnd = (offset) => this.rng(seed + offset + 900);

        const mRobe = new THREE.MeshStandardMaterial({ color: c || 0x00aaff, metalness: 0.1, roughness: 0.9 });
        const mTrim = new THREE.MeshStandardMaterial({ color: 0xffd700, metalness: 0.8, roughness: 0.2 });
        const mSkin = new THREE.MeshStandardMaterial({ color: 0x333333, metalness: 0.3, roughness: 0.8 });
        const mMagic = new THREE.MeshBasicMaterial({ color: c || 0x00aaff, transparent: true, opacity: 0.8 });

        // Hover
        g.userData.idle = true; g.userData.float = true; g.userData.baseY = 0.3; g.userData.idleSpeed = 1.0; g.userData.idleAmp = 0.08;

        // Robes
        const t = this.box(0.4, 0.6, 0.35, mRobe, 0, 0.65, 0, g);
        this.box(0.45, 0.1, 0.4, mTrim, 0, 0.3, 0, t); // Belt

        // Mantle
        this.box(0.5, 0.2, 0.4, mTrim, 0, 0.3, 0, t);

        // Head
        const h = this.box(0.25, 0.3, 0.25, mSkin, 0, 0.5, 0, t);
        this.box(0.2, 0.05, 0.1, mMagic, 0, 0.05, 0.13, h); // Eyes

        // Procedural Hood/Hat
        const hatType = Math.floor(rnd(1) * 3);
        if (hatType === 0) {
            // Hood
            const hood = this.box(0.35, 0.35, 0.35, mRobe, 0, 0.1, -0.05, h);
            hood.rotation.x = -0.1;
        } else if (hatType === 1) {
            // Crown
            const crown = new THREE.Group(); h.add(crown);
            for (let k = 0; k < 5; k++) {
                const spike = this.box(0.02, 0.1, 0.02, mMagic, 0, 0.2, 0, crown);
                spike.position.x = Math.cos(k * 1.2) * 0.15;
                spike.position.z = Math.sin(k * 1.2) * 0.15;
            }
        } else {
            // Floating Ring
            const ring = new THREE.Mesh(new THREE.TorusGeometry(0.2, 0.01, 4, 16), mMagic);
            ring.rotation.x = Math.PI / 2; ring.position.y = 0.3; h.add(ring);
        }

        // Arms
        const ag = new THREE.Group(); ag.position.y = 0.25; t.add(ag);
        const leftArm = new THREE.Group(); leftArm.position.set(-0.35, 0, 0); ag.add(leftArm);
        this.box(0.12, 0.45, 0.12, mRobe, 0, -0.2, 0, leftArm);

        const rightArm = new THREE.Group(); rightArm.position.set(0.35, 0, 0); ag.add(rightArm);
        this.box(0.12, 0.45, 0.12, mRobe, 0, -0.2, 0, rightArm);
        rightArm.rotation.x = -0.5; // Holding staff

        // BOOK (Floating near left hand)
        const book = new THREE.Group();
        book.position.set(-0.5, 0.5, 0.4);
        t.add(book);
        this.box(0.3, 0.4, 0.05, mRobe, 0, 0, 0, book); // Cover
        this.box(0.25, 0.35, 0.1, new THREE.MeshBasicMaterial({ color: 0xffffff }), 0, 0, 0.02, book); // Pages

        book.userData.idle = true;
        book.userData.float = { speed: 2, amp: 0.1, baseY: 0.5 };
        book.userData.spin = { axis: 'y', speed: 0.5 };

        // STAFF Procedural
        const staffHead = Math.floor(rnd(2) * 3);
        const staff = new THREE.Group(); staff.position.set(0, -0.4, 0); rightArm.add(staff);
        this.box(0.04, 1.6, 0.04, mTrim, 0, 0.5, 0, staff);

        const crystal = new THREE.Mesh(new THREE.DodecahedronGeometry(0.15), mMagic);
        crystal.position.set(0, 1.4, 0);
        staff.add(crystal);

        if (staffHead === 1) {
            const ring = new THREE.Mesh(new THREE.TorusGeometry(0.2, 0.02, 8, 16), mTrim);
            ring.position.y = 1.4; staff.add(ring);
            ring.userData.idle = true; ring.userData.rotatorY = 1.0;
        }

        crystal.userData.idle = true;
        crystal.userData.pulse = { speed: 3, amp: 0.1, base: 1 };

        // Particles
        if (tier >= 5) {
            crystal.userData.emitParticles = {
                color: c || 0x00aaff,
                size: 0.05,
                speed: 0.5,
                spread: 0.1
            };
            crystal.userData.emitChance = 0.1;
        }

        // Summoning Circle on ground
        if (tier >= 8) {
            const circle = new THREE.Mesh(new THREE.RingGeometry(0.8, 1.0, 32), mMagic);
            circle.rotation.x = -Math.PI / 2;
            circle.position.y = 0.05;
            g.add(circle);
            circle.userData.idle = true;
            circle.userData.rotatorY = 0.5;
        }

        g.scale.set(s, s, s); return { mesh: g, weapon: rightArm };
    }
});
