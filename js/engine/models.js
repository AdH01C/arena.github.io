const Models = {
    box(w, h, d, mat, x, y, z, p) {
        const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
        m.position.set(x, y, z); if (p) p.add(m); return m;
    },
    createHumanoid(c, s = 1) {
        const g = new THREE.Group();
        const mB = new THREE.MeshStandardMaterial({ color: 0x333, metalness: 0.8, roughness: 0.2 });
        const mG = new THREE.MeshBasicMaterial({ color: c });
        this.box(0.15, 0.6, 0.2, mB, -0.2, 0.3, 0, g); this.box(0.15, 0.6, 0.2, mB, 0.2, 0.3, 0, g);
        const t = this.box(0.5, 0.5, 0.4, mB, 0, 0.7, 0, g); this.box(0.2, 0.2, 0.1, mG, 0, 0.1, 0.21, t);
        const h = this.box(0.3, 0.3, 0.3, mB, 0, 0.5, 0, t); this.box(0.25, 0.05, 0.05, mG, 0, 0, 0.16, h);
        const ag = new THREE.Group(); ag.position.y = 0.3; t.add(ag);
        const mkArm = (x) => {
            const s = new THREE.Group(); s.position.set(x, 0, 0); ag.add(s);
            this.box(0.15, 0.5, 0.15, mB, 0, -0.3, 0, s); this.box(0.1, 0.6, 0.05, mG, 0, 0, 0.1, s); return s;
        }
        g.scale.set(s, s, s); return { mesh: g, weapon: mkArm(0.35) };
    },

    // === CLASS-SPECIFIC PLAYER MODELS ===
    // === CLASS-SPECIFIC PLAYER MODELS ===
    createRonin(c, s = 1, tier = 0) {
        const g = new THREE.Group();
        const mB = new THREE.MeshStandardMaterial({ color: 0x222, metalness: 0.9, roughness: 0.1 });
        const mG = new THREE.MeshBasicMaterial({ color: c });
        const mBlade = new THREE.MeshStandardMaterial({ color: 0xaaaaff, metalness: 1, roughness: 0.1, emissive: c, emissiveIntensity: 2 });

        // Animated Torso
        const t = this.box(0.4, 0.45, 0.3, mB, 0, 0.65, 0, g);
        this.box(0.15, 0.15, 0.1, mG, 0, 0, 0.16, t); // Core
        t.userData.idle = true; t.userData.pulse = { speed: 2, amp: 0.02, base: 1 }; // Breathing

        // Legs
        this.box(0.12, 0.5, 0.15, mB, -0.15, 0.25, 0, g);
        this.box(0.12, 0.5, 0.15, mB, 0.15, 0.25, 0, g);

        // Head
        const h = this.box(0.25, 0.25, 0.25, mB, 0, 0.45, 0, t);
        this.box(0.22, 0.06, 0.05, mG, 0, 0.02, 0.13, h); // Visor

        // Scarf (Tier 2+) - Now longer and more active
        if (tier >= 2) {
            const scarf = this.box(0.3, 0.7, 0.03, mG, 0, -0.1, -0.2, t);
            scarf.rotation.x = 0.5;
            scarf.userData.idle = true; scarf.userData.swing = { axis: 'x', speed: 4, amp: 0.3, base: 0.5 };
        }

        // Shoulder Pads (Tier 4+)
        if (tier >= 4) {
            this.box(0.25, 0.12, 0.25, mB, -0.35, 0.3, 0, t); // L Shoulder
            this.box(0.2, 0.05, 0.2, mG, -0.35, 0.38, 0, t); // L Accent
            this.box(0.25, 0.12, 0.25, mB, 0.35, 0.3, 0, t); // R Shoulder
            this.box(0.2, 0.05, 0.2, mG, 0.35, 0.38, 0, t); // R Accent
        }

        // Back Thrusters (Tier 7+)
        if (tier >= 7) {
            const thrusterL = this.box(0.15, 0.4, 0.15, mB, -0.2, 0.1, -0.25, t);
            thrusterL.rotation.x = -0.3;
            this.box(0.1, 0.1, 0.05, mG, 0, -0.15, -0.05, thrusterL); // Glow

            const thrusterR = this.box(0.15, 0.4, 0.15, mB, 0.2, 0.1, -0.25, t);
            thrusterR.rotation.x = -0.3;
            this.box(0.1, 0.1, 0.05, mG, 0, -0.15, -0.05, thrusterR); // Glow
        }

        // Arms
        const ag = new THREE.Group(); ag.position.y = 0.25; t.add(ag);

        const leftArm = new THREE.Group(); leftArm.position.set(-0.35, 0, 0); ag.add(leftArm);
        this.box(0.1, 0.5, 0.1, mB, 0, -0.25, 0, leftArm);
        leftArm.userData.idle = true; leftArm.userData.swing = { axis: 'x', speed: 2, amp: 0.15, base: 0 };

        const rightArm = new THREE.Group(); rightArm.position.set(0.35, 0, 0); ag.add(rightArm);
        this.box(0.1, 0.5, 0.1, mB, 0, -0.25, 0, rightArm);
        rightArm.userData.idle = true; rightArm.userData.swing = { axis: 'x', speed: 2, amp: 0.15, base: 0, offset: Math.PI };

        // Katana - Improved Emissive
        const katana = new THREE.Group(); katana.position.set(0, -0.35, 0.2); rightArm.add(katana);
        this.box(0.03, 1.2, 0.02, mBlade, 0, 0.5, 0, katana); // Blade
        this.box(0.08, 0.1, 0.08, mB, 0, 0, 0, katana); // Hilt
        katana.userData.idle = true; katana.userData.pulse = { speed: 6, amp: 0.2, base: 1 }; // High Frequency Pulse

        g.scale.set(s, s, s); return { mesh: g, weapon: rightArm };
    },

    createPriest(c, s = 1, tier = 0) {
        const g = new THREE.Group();
        const mB = new THREE.MeshStandardMaterial({ color: 0x444, metalness: 0.6, roughness: 0.3 });
        const mG = new THREE.MeshBasicMaterial({ color: c });
        const mGold = new THREE.MeshStandardMaterial({ color: 0xffd700, metalness: 1, roughness: 0.2, emissive: 0x332200 });

        // Floating/Bobbing Body
        g.userData.idle = true; g.userData.float = true; g.userData.baseY = 0; g.userData.idleSpeed = 1.5; g.userData.idleAmp = 0.05;

        // Robes
        this.box(0.35, 0.6, 0.3, mB, 0, 0.3, 0, g); // Skirt
        const t = this.box(0.45, 0.5, 0.35, mB, 0, 0.7, 0, g); // Torso
        this.box(0.1, 0.4, 0.05, mG, 0, 0, 0.18, t); // Scarf down middle

        // Head
        const h = this.box(0.22, 0.25, 0.22, mB, 0, 0.48, 0, t);
        this.box(0.18, 0.08, 0.05, mG, 0, 0.02, 0.12, h); // Eyes

        // Halo (Tier 3+)
        if (tier >= 3) {
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
        // Raised staff arm
        rightArm.rotation.x = -0.5;

        // Staff
        const staff = new THREE.Group(); staff.position.set(0, -0.3, 0.1); rightArm.add(staff);
        this.box(0.04, 1.4, 0.04, mGold, 0, 0.4, 0, staff);

        const orb = new THREE.Mesh(new THREE.SphereGeometry(0.12, 8, 8), mG);
        orb.position.y = 1.1; staff.add(orb);
        orb.userData.idle = true; orb.userData.pulse = { speed: 2, amp: 0.05, base: 1 };

        // Wings/Drones (Tier 6+)
        if (tier >= 6) {
            for (let i = 0; i < 2; i++) {
                const w = this.box(0.05, 0.4, 0.05, mG, (i === 0 ? -0.6 : 0.6), 0.5, -0.2, t);
                w.userData.idle = true; w.userData.float = true; w.userData.baseY = 0.5; w.userData.idleSpeed = 3; w.userData.idleAmp = 0.1;
            }
        }

        g.scale.set(s, s, s); return { mesh: g, weapon: rightArm };
    },

    createMech(c, s = 1, tier = 0) {
        const g = new THREE.Group();
        const mB = new THREE.MeshStandardMaterial({ color: 0x555, metalness: 0.95, roughness: 0.1 });
        const mG = new THREE.MeshBasicMaterial({ color: c });
        const mDark = new THREE.MeshStandardMaterial({ color: 0x222, metalness: 0.9, roughness: 0.2 });

        // Massive Legs
        this.box(0.25, 0.6, 0.3, mB, -0.25, 0.3, 0, g);
        this.box(0.25, 0.6, 0.3, mB, 0.25, 0.3, 0, g);

        // Heavy Torso
        const t = this.box(0.8, 0.6, 0.5, mB, 0, 0.8, 0, g);
        this.box(0.3, 0.2, 0.1, mG, 0, 0, 0.26, t); // Reactor core
        // Vents on back
        const vent = this.box(0.6, 0.4, 0.1, mDark, 0, 0.1, -0.26, t);

        // Shoulders
        this.box(0.25, 0.25, 0.3, mDark, -0.5, 0.2, 0, t);
        this.box(0.25, 0.25, 0.3, mDark, 0.5, 0.2, 0, t);

        // Head
        const h = this.box(0.35, 0.25, 0.3, mDark, 0, 0.45, 0, t);
        this.box(0.25, 0.08, 0.05, mG, 0, 0, 0.16, h); // Visor

        // Arms
        const ag = new THREE.Group(); ag.position.y = 0.2; t.add(ag);

        const leftArm = new THREE.Group(); leftArm.position.set(-0.6, 0, 0); ag.add(leftArm);
        this.box(0.2, 0.5, 0.2, mB, 0, -0.2, 0, leftArm);

        const rightArm = new THREE.Group(); rightArm.position.set(0.6, 0, 0); ag.add(rightArm);
        this.box(0.2, 0.5, 0.2, mB, 0, -0.2, 0, rightArm);

        // Gatling gun
        const gun = new THREE.Group(); gun.position.set(0, -0.4, 0.2); rightArm.add(gun);
        this.box(0.15, 0.15, 0.5, mDark, 0, 0, 0, gun);
        const barrel = new THREE.Group(); barrel.position.z = 0.25; gun.add(barrel);
        for (let i = 0; i < 4; i++) {
            this.box(0.04, 0.04, 0.4, mB, Math.cos(i * 1.57) * 0.06, Math.sin(i * 1.57) * 0.06, 0.2, barrel);
        }
        // Spin barrels
        barrel.userData.idle = true; barrel.userData.rotatorZ = 0.2;

        // Shoulder Cannons (Tier 2+)
        if (tier >= 2) {
            const cannon = this.box(0.15, 0.15, 0.4, mDark, 0.5, 0.4, 0, t);
            cannon.userData.idle = true; cannon.userData.swing = { axis: 'x', speed: 0.5, amp: 0.2, base: 0 };
        }
        // Wings (Jetpack)
        if (tier >= 5) {
            const jp = this.box(0.6, 0.5, 0.2, mDark, 0, 0, -0.4, t);
            const flame = this.box(0.1, 0.1, 0.1, mG, -0.2, -0.3, 0, jp);
            const flame2 = this.box(0.1, 0.1, 0.1, mG, 0.2, -0.3, 0, jp);
            // Flickering engines
            flame.userData.idle = true; flame.userData.pulse = { speed: 10, amp: 0.2, base: 1 };
            flame2.userData.idle = true; flame2.userData.pulse = { speed: 11, amp: 0.2, base: 1 };
        }

        g.scale.set(s, s, s); return { mesh: g, weapon: rightArm };
    },

    createShadow(c, s = 1, tier = 0) {
        const g = new THREE.Group();
        const mB = new THREE.MeshStandardMaterial({ color: 0x111, metalness: 0.3, roughness: 0.8 });
        const mG = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const mD = new THREE.MeshStandardMaterial({ color: 0x000, metalness: 0.5, roughness: 0.5 });
        const mVoid = new THREE.MeshBasicMaterial({ color: 0xaa00ff, transparent: true, opacity: 0.7 });

        // Legs
        this.box(0.1, 0.5, 0.1, mB, -0.12, 0.25, 0, g);
        this.box(0.1, 0.5, 0.1, mB, 0.12, 0.25, 0, g);

        // Torso
        const t = this.box(0.35, 0.4, 0.2, mB, 0, 0.7, 0, g);
        this.box(0.1, 0.1, 0.05, mG, 0, 0, 0.11, t); // Symbol

        // Hood
        const hood = this.box(0.3, 0.25, 0.28, mD, 0, 0.45, 0, t);
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

        // Daggers
        const dagger1 = new THREE.Group(); dagger1.position.set(0, -0.3, 0.05); rightArm.add(dagger1);
        this.box(0.02, 0.02, 0.3, mD, 0, 0, 0.1, dagger1); // Handle
        this.box(0.01, 0.01, 0.25, mG, 0, 0, 0.15, dagger1); // Edge

        const dagger2 = dagger1.clone(); leftArm.add(dagger2);

        // Void Particles (Tier 4+)
        if (tier >= 4) {
            for (let i = 0; i < 3; i++) {
                const smoke = new THREE.Mesh(new THREE.SphereGeometry(0.06, 6, 6), mVoid);
                smoke.position.set((Math.random() - 0.5), (Math.random()), -0.2);
                t.add(smoke);
                smoke.userData.idle = true; smoke.userData.float = true; smoke.userData.baseY = smoke.position.y; smoke.userData.idleSpeed = 1; smoke.userData.idleAmp = 0.2;
            }
        }

        g.scale.set(s, s, s); return { mesh: g, weapon: rightArm };
    },

    createBrawler(c, s = 1, tier = 0) {
        const g = new THREE.Group();
        const mB = new THREE.MeshStandardMaterial({ color: c || 0xff4400, metalness: 0.4, roughness: 0.6 });
        const mG = new THREE.MeshBasicMaterial({ color: 0xff6600 });
        const mD = new THREE.MeshStandardMaterial({ color: 0x333333, metalness: 0.7, roughness: 0.3 });
        const mW = new THREE.MeshBasicMaterial({ color: 0xffcc00 });

        // Bouncing Idle
        g.userData.idle = true; g.userData.pulse = { speed: 3, amp: 0.03, base: 1 };

        // Legs
        this.box(0.14, 0.5, 0.14, mB, -0.15, 0.25, 0, g);
        this.box(0.14, 0.5, 0.14, mB, 0.15, 0.25, 0, g);

        // Torso
        const t = this.box(0.45, 0.45, 0.25, mB, 0, 0.72, 0, g);
        this.box(0.15, 0.08, 0.05, mG, 0, 0.1, 0.13, t); // Belt buckle

        // Head
        const h = this.box(0.2, 0.22, 0.2, mB, 0, 0.38, 0, t);
        this.box(0.22, 0.06, 0.05, mG, 0, 0, 0.1, h); // Headband

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

        // Gloves
        const g1 = this.box(0.16, 0.16, 0.16, mG, 0, -0.35, 0.05, leftArm);
        const g2 = this.box(0.16, 0.16, 0.16, mG, 0, -0.35, 0.05, rightArm);

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
        }

        g.scale.set(s, s, s); return { mesh: g, weapon: rightArm };
    },

    createGunslinger(c, s = 1, tier = 0) {
        const g = new THREE.Group();
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

        // Head
        const h = this.box(0.2, 0.22, 0.2, mS, 0, 0.35, 0, t);
        this.box(0.5, 0.02, 0.5, mB, 0, 0.1, 0, h); // Hat Brim
        this.box(0.25, 0.15, 0.25, mB, 0, 0.18, 0, h); // Hat Top
        this.box(0.08, 0.05, 0.02, mG, 0.05, 0.05, 0.11, h); // Cigar/Light

        if (tier >= 2) {
            const poncho = this.box(0.45, 0.2, 0.3, mB, 0, 0.15, 0, t);
            poncho.rotation.z = -0.1;
            // Poncho sway
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

        // Gun
        const gun = new THREE.Group(); gun.position.set(0, -0.35, 0.1); rightArm.add(gun);
        this.box(0.04, 0.1, 0.03, mB, 0, -0.05, 0, gun); // Handle
        this.box(0.05, 0.05, 0.25, mGun, 0, 0, 0.1, gun); // Barrel
        const chamber = this.box(0.06, 0.06, 0.08, mS, 0, 0, 0, gun); // Chamber

        // Spin chamber idle
        chamber.userData.idle = true; chamber.userData.rotatorz = 0.5;

        // Dual Wield (Tier 4+)
        if (tier >= 4) {
            const gun2 = gun.clone();
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

    createKnight(c, s = 1, tier = 0) {
        const g = new THREE.Group();

        // --- MATERIALS ---
        // Tier-based colors
        let mainColor = tier < 3 ? 0x888888 : (tier < 6 ? 0xffeeaa : 0x220044); // Iron -> Gold -> Cosmic
        if (tier >= 9) mainColor = 0x00f2ff;

        const mArmor = new THREE.MeshStandardMaterial({ color: mainColor, metalness: 0.7, roughness: 0.3 });
        const mDark = new THREE.MeshStandardMaterial({ color: 0x2a2a2a, metalness: 0.5, roughness: 0.7 }); // Undertunics / joints
        const mGold = new THREE.MeshStandardMaterial({ color: 0xffd700, metalness: 1.0, roughness: 0.2 });
        const mG = new THREE.MeshBasicMaterial({ color: c || 0x00aaff }); // Energy Glow
        const mEnergy = new THREE.MeshBasicMaterial({ color: c || 0x00aaff, transparent: true, opacity: 0.85 });

        // overall scale factor for tier growth
        const bScale = 1.0 + (tier * 0.04);

        // --- TORSO ---
        const torsoGroup = new THREE.Group();
        torsoGroup.position.y = 0.95 * bScale; // Hip height
        g.add(torsoGroup);

        // Abdomen (Flexible midsection)
        this.box(0.28 * bScale, 0.25 * bScale, 0.2 * bScale, mDark, 0, 0, 0, torsoGroup);
        // Chest Plate (Bulky, tapered)
        const chest = this.box(0.42 * bScale, 0.45 * bScale, 0.3 * bScale, mArmor, 0, 0.35 * bScale, 0.05 * bScale, torsoGroup);
        // Chest Detail (Reactor/Crest)
        this.box(0.15 * bScale, 0.15 * bScale, 0.05, mG, 0, 0.05 * bScale, 0.16 * bScale, chest);

        // Neck Guard
        this.box(0.3 * bScale, 0.1 * bScale, 0.25 * bScale, mArmor, 0, 0.6 * bScale, 0, torsoGroup);

        // --- HEAD ---
        const headGroup = new THREE.Group();
        headGroup.position.y = 0.7 * bScale;
        torsoGroup.add(headGroup);

        // Helmet Main
        const helmet = this.box(0.22 * bScale, 0.28 * bScale, 0.26 * bScale, mArmor, 0, 0.14 * bScale, 0, headGroup);
        // Visor (Glowing slit)
        this.box(0.2 * bScale, 0.04 * bScale, 0.15, mG, 0, 0.02 * bScale, 0.1 * bScale, sensor => helmet.add(sensor));
        // Crest/Plume (Tier 4+)
        if (tier >= 4) {
            const plume = this.box(0.04 * bScale, 0.25 * bScale, 0.3 * bScale, mG, 0, 0.25 * bScale, -0.05 * bScale, helmet);
            plume.rotation.x = -0.2;
        }
        // Halo (Tier 8+)
        if (tier >= 8) {
            const halo = this.box(0.6 * bScale, 0.02, 0.6 * bScale, mEnergy, 0, 0.4 * bScale, 0, helmet);
            halo.userData.idle = true; halo.userData.spin = { axis: 'y', speed: 2 };
        }

        // --- ARMS (Articulated) ---
        const createArm = (isRight) => {
            const armGroup = new THREE.Group();
            const side = isRight ? 1 : -1;

            // Shoulder Joint / Pauldron
            armGroup.position.set(side * 0.28 * bScale, 0.5 * bScale, 0);
            torsoGroup.add(armGroup);

            // Pauldron (Shoulder Armor)
            const pSize = (0.22 + (tier * 0.02)) * bScale;
            this.box(pSize, pSize, pSize, mArmor, side * 0.15 * bScale, 0.15 * bScale, 0, armGroup);

            // Spike (Tier 5+)
            if (tier >= 5) {
                this.box(0.05 * bScale, 0.25 * bScale, 0.05 * bScale, mGold, side * 0.15 * bScale, 0.3 * bScale, 0, armGroup);
            }

            // Upper Arm
            const upperArm = this.box(0.14 * bScale, 0.35 * bScale, 0.14 * bScale, mDark, side * 0.12 * bScale, -0.15 * bScale, 0, armGroup);

            // Elbow / Forearm
            const forearmGroup = new THREE.Group();
            forearmGroup.position.set(0, -0.32 * bScale, 0); // Elbow pivot
            upperArm.add(forearmGroup);

            // Gauntlet (Thicker armor)
            this.box(0.16 * bScale, 0.35 * bScale, 0.16 * bScale, mArmor, 0, -0.15 * bScale, 0, forearmGroup);

            // Hand
            this.box(0.13 * bScale, 0.13 * bScale, 0.13 * bScale, mDark, 0, -0.4 * bScale, 0, forearmGroup);

            return forearmGroup; // Return forearm to attach weapons
        };

        const leftForearm = createArm(false);
        const rightForearm = createArm(true);

        // Pose Arms (Idle Stance)
        leftForearm.parent.rotation.z = 0.2; // Flare elbows slightly
        leftForearm.rotation.x = 0.4; // Bend arm forward
        rightForearm.parent.rotation.z = -0.2;
        rightForearm.rotation.x = 0.5;

        // --- LEGS (Articulated) ---
        const createLeg = (isRight) => {
            const legGroup = new THREE.Group();
            const side = isRight ? 1 : -1;

            // Hip Joint
            legGroup.position.set(side * 0.12 * bScale, 0, 0);
            torsoGroup.add(legGroup);

            // Thigh (Cuisses)
            this.box(0.18 * bScale, 0.45 * bScale, 0.18 * bScale, mArmor, 0, -0.2 * bScale, 0, legGroup);

            // Knee / Shin
            const shinGroup = new THREE.Group();
            shinGroup.position.set(0, -0.45 * bScale, 0);
            legGroup.add(shinGroup);

            // Knee Pad
            this.box(0.14 * bScale, 0.14 * bScale, 0.05 * bScale, mGold, 0, 0, 0.1 * bScale, shinGroup);

            // Greaves (Lower Leg) - Flared at bottom
            this.box(0.16 * bScale, 0.45 * bScale, 0.16 * bScale, mArmor, 0, -0.2 * bScale, 0, shinGroup);
            // Boot
            this.box(0.18 * bScale, 0.12 * bScale, 0.22 * bScale, mDark, 0, -0.5 * bScale, 0.05 * bScale, shinGroup);
        };

        createLeg(false);
        createLeg(true);

        // --- WEAPONS ---

        // SWORD (Right Hand)
        const swordGroup = new THREE.Group();
        swordGroup.position.set(0, -0.4 * bScale, 0);
        // Angle sword slightly
        swordGroup.rotation.x = -0.8;
        rightForearm.add(swordGroup);

        // Hilt
        this.box(0.04 * bScale, 0.15 * bScale, 0.04 * bScale, mDark, 0, -0.1 * bScale, 0, swordGroup); // Grip
        this.box(0.06 * bScale, 0.06 * bScale, 0.06 * bScale, mGold, 0, -0.2 * bScale, 0, swordGroup); // Pommel
        this.box(0.25 * bScale, 0.03 * bScale, 0.08 * bScale, mGold, 0, 0, 0, swordGroup); // Crossguard

        // Blade
        let bladeLen = (1.0 + (tier * 0.12)) * bScale;
        let bladeMat = mArmor;
        if (tier >= 6) bladeMat = mG; // Energy Blade
        if (tier >= 9) bladeLen *= 1.4; // Manga sized

        const blade = this.box(0.1 * bScale, bladeLen, 0.02 * bScale, bladeMat, 0, bladeLen / 2, 0, swordGroup);
        // Fuller (Blood groove) - visual detail? (Actually just 2 thinner strips if we wanted, but low poly is fine)

        if (tier >= 6) {
            blade.userData.idle = true; blade.userData.pulse = { speed: 8, amp: 0.1, base: 1 };
        }

        // SHIELD (Left Hand)
        const shieldGroup = new THREE.Group();
        shieldGroup.position.set(0.1 * bScale, -0.2 * bScale, 0.2 * bScale); // Side mount
        shieldGroup.rotation.y = 1.57; // Face forward
        leftForearm.add(shieldGroup);

        let sW = (0.5 + (tier * 0.06)) * bScale;
        let sH = (0.7 + (tier * 0.06)) * bScale;
        let sMat = mArmor;

        if (tier >= 6) { sW *= 1.2; sH *= 1.2; sMat = mEnergy; } // Energy Tower Shield

        // Shield Base
        const shield = this.box(sW, sH, 0.06 * bScale, sMat, 0, 0, 0, shieldGroup);
        // Shield Rim
        if (tier < 6) {
            this.box(sW * 1.1, sH * 1.1, 0.04 * bScale, mDark, 0, 0, -0.02 * bScale, shieldGroup);
        }
        // Shield Core
        if (tier >= 2) {
            this.box(sW * 0.6, sH * 0.6, 0.08 * bScale, mGold, 0, 0, 0.02 * bScale, shieldGroup);
            this.box(0.15 * bScale, 0.15 * bScale, 0.1 * bScale, mG, 0, 0, 0.05 * bScale, shieldGroup); // Glowing center
        }

        // --- EXTRAS ---
        // Cape (Tier 3+)
        if (tier >= 3) {
            const capeL = 1.0 + (tier * 0.08);
            const cape = this.box(0.7 * bScale, capeL * bScale, 0.05, mG, 0, -0.2 * bScale, -0.25 * bScale, torsoGroup);
            cape.rotation.x = 0.2;
            cape.userData.idle = true; cape.userData.swing = { axis: 'x', speed: 1.0, amp: 0.15, base: 0.2 };
        }

        // Orbitals (Tier 7+)
        if (tier >= 7) {
            const orbitalGroup = new THREE.Group();
            g.add(orbitalGroup);
            // 2 Floating Shields
            for (let i = 0; i < 2; i++) {
                const orb = this.box(0.3 * bScale, 0.4 * bScale, 0.05, mEnergy, i === 0 ? 1 : -1, 1.5 * bScale, 0, orbitalGroup);
                orb.userData.idle = true; orb.userData.float = { speed: 2, amp: 0.2, offset: i * 3 };
            }
            orbitalGroup.userData.idle = true; orbitalGroup.userData.spin = { axis: 'y', speed: 0.5 };
        }

        // Animation Props
        torsoGroup.userData.idle = true;
        torsoGroup.userData.float = { speed: 1, amp: 0.02, baseY: 0.95 * bScale }; // Breathing heave

        g.scale.set(s, s, s);
        return { mesh: g, weapon: rightForearm }; // Return right forearm as weapon parent for attack animations
    },

    createHacker(c, s = 1, tier = 0) {
        const g = new THREE.Group();
        const mDark = new THREE.MeshStandardMaterial({ color: 0x111111, metalness: 0.8, roughness: 0.2 });
        const mCode = new THREE.MeshBasicMaterial({ color: c || 0x00ff00 });
        const mScreen = new THREE.MeshBasicMaterial({ color: 0x000000 });

        // Glitchy Legs
        if (tier < 7) {
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

        // Monitor Head
        const h = new THREE.Group(); h.position.set(0, 0.4, 0); t.add(h);
        this.box(0.35, 0.25, 0.2, mDark, 0, 0, 0, h);
        const screen = this.box(0.3, 0.2, 0.05, mCode, 0, 0, 0.08, h); // Screen Glow
        screen.userData.idle = true; screen.userData.pulse = { speed: 8, amp: 0.05, base: 1 }; // Fast flickering

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
    },

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

    createReaper(c, s = 1, tier = 0) {
        const g = new THREE.Group();
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

        // Cape/Rags
        const cape = this.box(0.5, 0.8, 0.05, mB, 0, -0.2, -0.2, t);
        cape.rotation.x = 0.2;
        cape.userData.idle = true; cape.userData.swing = { axis: 'x', speed: 2, amp: 0.15, base: 0.2 };

        // Arms
        const ag = new THREE.Group(); ag.position.y = 0.2; t.add(ag);
        const leftArm = new THREE.Group(); leftArm.position.set(-0.35, 0, 0.1); ag.add(leftArm);
        this.box(0.1, 0.45, 0.1, mB, 0, -0.2, 0, leftArm);

        const rightArm = new THREE.Group(); rightArm.position.set(0.35, 0, 0.1); ag.add(rightArm);
        this.box(0.1, 0.45, 0.1, mB, 0, -0.2, 0, rightArm);
        rightArm.rotation.x = -0.8; // Holding scythe forward

        // SCYTHE
        const scythe = new THREE.Group(); scythe.position.set(0, -0.4, 0.1); rightArm.add(scythe);
        this.box(0.05, 1.8, 0.05, mB, 0, 0.4, 0, scythe); // Staff
        const blade = new THREE.Group(); blade.position.y = 1.2; scythe.add(blade);
        this.box(0.8, 0.15, 0.03, mScythe, 0.3, 0, 0, blade); // Main blade
        blade.rotation.z = -0.4;

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
    }
};
