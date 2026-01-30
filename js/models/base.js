window.Models = {
    box(w, h, d, mat, x, y, z, p) {
        const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
        m.position.set(x, y, z); if (p) p.add(m); return m;
    },
    // Helper for seeded random
    rand(seed) {
        const x = Math.sin(seed++) * 10000;
        return x - Math.floor(x);
    },

    createHumanoid(c, s = 1) {
        // Handle input: s can be scale number OR config object
        let seed = Math.floor(Math.random() * 9999);
        let scale = 1;

        if (typeof s === 'object') {
            scale = s.scale || 1;
            seed = s.seed || seed;
        } else {
            scale = s;
        }

        // Local Random Wrapper
        const R = () => {
            const val = this.rand(seed++);
            return val;
        };
        const range = (min, max) => min + R() * (max - min);

        const g = new THREE.Group();

        // --- PROPORTIONS ---
        // Varied height, width, bulk
        const heightMult = range(0.9, 1.15);
        const widthMult = range(0.85, 1.2);
        const limbThick = range(0.8, 1.2);

        // --- PALETTE & STYLE ---
        const theme = R() > 0.6 ? 'PLATE' : (R() > 0.5 ? 'CYBER' : 'SCOUT');

        // Colors
        const baseColor = c;
        const colorVar = range(-0.1, 0.1);
        // Note: For actual color manipulation we'd need more complex logic, 
        // here we'll just stick to provided color + armor variants.

        const mBody = new THREE.MeshStandardMaterial({ color: 0x333333, metalness: 0.5, roughness: 0.5 });
        const mArmor = new THREE.MeshStandardMaterial({
            color: theme === 'PLATE' ? 0xdddddd : (theme === 'CYBER' ? 0x444444 : 0x667788),
            metalness: theme === 'CYBER' ? 0.8 : 0.4,
            roughness: theme === 'PLATE' ? 0.3 : 0.7
        });
        const mGlow = new THREE.MeshBasicMaterial({ color: c });
        const mDetail = new THREE.MeshStandardMaterial({ color: 0x222222 });

        // --- BODY PARTS ---

        // Torso
        const torsoW = 0.4 * widthMult;
        const torsoH = 0.5 * heightMult;
        const torsoD = 0.25 * widthMult;

        // Hips (Root)
        const hips = this.box(torsoW * 0.9, 0.2, torsoD, mDetail, 0, 0.9 * heightMult, 0, g);

        // Chest
        const chestY = 0.35 * heightMult;
        const chest = this.box(torsoW, torsoH, torsoD * 1.2, mArmor, 0, chestY, 0, hips);

        // Breathing Animation
        chest.userData.idle = true;
        chest.userData.pulse = { speed: range(1.5, 3), amp: 0.01, base: 1 };

        // Head
        const headSz = 0.22 * range(0.9, 1.1);
        const head = this.box(headSz, headSz, headSz, mArmor, 0, torsoH * 0.6 + headSz / 2, 0, chest);

        // Visor / Face
        const visorType = Math.floor(range(0, 3));
        if (visorType === 0) { // Slit
            this.box(headSz * 0.9, headSz * 0.2, headSz * 0.1, mGlow, 0, 0.05, headSz * 0.5, head);
        } else if (visorType === 1) { // Mono-eye
            this.box(headSz * 0.4, headSz * 0.4, headSz * 0.1, mGlow, 0, 0, headSz * 0.5, head);
        } else { // Dual eyes
            this.box(headSz * 0.3, headSz * 0.15, 0.05, mGlow, -headSz * 0.25, 0.05, headSz * 0.5, head);
            this.box(headSz * 0.3, headSz * 0.15, 0.05, mGlow, headSz * 0.25, 0.05, headSz * 0.5, head);
        }

        // --- LIMBS ---
        const mkLimb = (isLeg, isRight) => {
            const grp = new THREE.Group();
            const side = isRight ? 1 : -1;

            // Lengths
            const upperLen = isLeg ? 0.5 * heightMult : 0.4;
            const lowerLen = isLeg ? 0.5 * heightMult : 0.4;
            const thick = (isLeg ? 0.14 : 0.11) * limbThick;

            // Positions
            if (isLeg) {
                grp.position.set(side * torsoW * 0.4, 0, 0); // Attached to hips
            } else {
                grp.position.set(side * (torsoW * 0.6 + 0.05), torsoH * 0.35, 0); // Attached to chest
            }

            (!isLeg ? chest : hips).add(grp);

            // Upper Seg
            this.box(thick, upperLen, thick, mBody, 0, -upperLen / 2, 0, grp);
            // Armor plate
            if (theme !== 'SCOUT' || (theme === 'SCOUT' && R() > 0.5)) {
                this.box(thick * 1.2, upperLen * 0.6, thick * 1.2, mArmor, 0, -upperLen / 2, 0, grp);
            }

            // Joint
            const elbow = new THREE.Group();
            elbow.position.y = -upperLen;
            grp.add(elbow);
            this.box(thick * 0.8, thick * 0.8, thick * 0.8, mDetail, 0, 0, 0, elbow);

            // Lower Seg
            const low = this.box(thick * 0.9, lowerLen, thick * 0.9, mBody, 0, -lowerLen / 2, 0, elbow);
            // Bracer/Greave
            this.box(thick * 1.1, lowerLen * 0.7, thick * 1.1, mArmor, 0, -lowerLen / 2, 0, elbow);

            // Hand/Foot
            const extSz = thick * 1.2;
            if (isLeg) {
                this.box(extSz, extSz * 0.5, extSz * 2, mDetail, 0, -lowerLen, extSz * 0.5, elbow); // Foot
            } else {
                this.box(extSz, extSz, extSz, mArmor, 0, -lowerLen, 0, elbow); // Hand
            }

            return { top: grp, mid: elbow, bottom: low };
        };

        const legL = mkLimb(true, false);
        const legR = mkLimb(true, true);
        const armL = mkLimb(false, false);
        const armR = mkLimb(false, true);

        // --- IDLE POSE & ANIM ---
        // Random Stance
        const stanceW = range(0, 0.2);
        legL.top.rotation.z = stanceW;
        legR.top.rotation.z = -stanceW;

        armL.top.rotation.z = range(0.1, 0.4);
        armR.top.rotation.z = range(-0.4, -0.1);

        // Idle Sway
        g.userData.idle = true;
        armL.top.userData.idle = true;
        armL.top.userData.swing = { axis: 'x', speed: range(1, 2), amp: 0.1, base: 0 };
        armR.top.userData.idle = true;
        armR.top.userData.swing = { axis: 'x', speed: range(1, 2), amp: 0.1, base: 0, offset: Math.PI };

        // --- ACCESSORIES ---
        // Backpack
        if (theme === 'SCOUT' || (theme === 'CYBER' && R() > 0.4)) {
            const bp = this.box(torsoW * 0.8, torsoH * 0.6, 0.15, mDetail, 0, 0, -torsoD / 2 - 0.08, chest);
            if (theme === 'CYBER') {
                // Antenna
                const ant = this.box(0.02, 0.4, 0.02, mDetail, -0.1, 0.3, 0, bp);
                const light = this.box(0.04, 0.04, 0.04, mGlow, 0, 0.2, 0, ant);
                light.userData.idle = true;
                light.userData.pulse = { speed: 4, amp: 1, base: 1 }; // Blink
            }
        }

        // Shoulder Pads (random)
        if (theme === 'PLATE') {
            const pSz = 0.15 * widthMult;
            this.box(pSz, pSz, pSz, mArmor, 0, 0, 0, armL.top);
            this.box(pSz, pSz, pSz, mArmor, 0, 0, 0, armR.top);
        }

        g.scale.set(scale, scale, scale);
        return { mesh: g, weapon: armR.mid }; // Return right elbow/forearm as weapon mount
    },
    createMinion(c, s = 1, seed = 0) {
        const g = new THREE.Group();
        const rand = (offset) => this.rand(seed + offset);

        // --- ARCHETYPE ---
        // 0: Trooper (Rifle), 1: Guardian (Shield + Baton), 2: Berserker (Dual Blades)
        const typeRaw = rand(0);
        let arch = 'TROOPER';
        if (typeRaw > 0.4) arch = 'GUARDIAN';
        if (typeRaw > 0.75) arch = 'BERSERKER';

        // Materials
        const colorVar = (rand(1) - 0.5) * 0.1;
        const baseC = new THREE.Color(c).offsetHSL(0, 0, colorVar);

        const mArmor = new THREE.MeshStandardMaterial({ color: baseC, metalness: 0.5, roughness: 0.5 });
        const mDark = new THREE.MeshStandardMaterial({ color: 0x222222, metalness: 0.2, roughness: 0.8 });
        const mGlow = new THREE.MeshBasicMaterial({ color: 0x00ffcc }); // Default Energy
        if (arch === 'GUARDIAN') mGlow.color.setHex(0x00aaff);
        if (arch === 'BERSERKER') mGlow.color.setHex(0xff3300);

        // --- BODY ---
        const height = 1.0 + (rand(2) - 0.5) * 0.2;
        const bulk = 1.0 + (rand(3) - 0.5) * 0.2;

        // Torso
        const chest = this.box(0.3 * bulk, 0.4 * height, 0.25 * bulk, mArmor, 0, 0.7 * height, 0, g);
        this.box(0.2 * bulk, 0.35 * height, 0.2 * bulk, mDark, 0, -0.1, 0, chest); // Core

        // Chest Plate Procedural
        if (rand(4) > 0.5) {
            this.box(0.25 * bulk, 0.2 * height, 0.3 * bulk, mArmor, 0, 0.05, 0.05, chest); // Heavy Plate
        } else {
            this.box(0.1, 0.1, 0.26 * bulk, mGlow, 0, 0.1, 0.02, chest); // Arc Reactor
        }

        chest.userData.idle = true; chest.userData.pulse = { speed: 2, amp: 0.02, base: 1 };

        // Head
        const h = this.box(0.2, 0.22, 0.22, mArmor, 0, 0.35 * height, 0, chest);
        const visorStyle = Math.floor(rand(5) * 3);

        if (visorStyle === 0) { // Mono Eye
            this.box(0.15, 0.15, 0.1, mDark, 0, 0, 0.08, h);
            this.box(0.08, 0.08, 0.12, mGlow, 0, 0, 0.08, h);
        } else if (visorStyle === 1) { // Slit
            this.box(0.18, 0.05, 0.15, mGlow, 0, 0.02, 0.06, h);
        } else { // Faceless/Dome
            this.box(0.18, 0.18, 0.05, mGlow, 0, 0.02, 0.1, h);
        }

        // Antenna
        if (rand(6) > 0.5) {
            const ant = this.box(0.02, 0.3, 0.02, mDark, 0.08, 0.2, 0, h);
            this.box(0.02, 0.02, 0.02, mGlow, 0, 0.15, 0, ant);
        }

        // --- ARMS ---
        const ag = new THREE.Group(); ag.position.y = 0.2; chest.add(ag);

        const createArm = (side) => {
            const arm = new THREE.Group(); arm.position.set(side * 0.3 * bulk, 0, 0); ag.add(arm);
            // Shoulder
            const pType = Math.floor(rand(side + 10) * 3);
            if (pType === 0) this.box(0.2, 0.2, 0.2, mArmor, 0, 0, 0, arm); // Cube
            else if (pType === 1) this.box(0.25, 0.1, 0.25, mArmor, 0, 0.05, 0, arm); // Flat
            else { // Spiked
                this.box(0.2, 0.2, 0.2, mDark, 0, 0, 0, arm);
                this.box(0.05, 0.15, 0.05, mArmor, 0, 0.15, 0, arm);
            }

            // Limb
            this.box(0.1, 0.35 * height, 0.1, mDark, 0, -0.2, 0, arm); // Upper
            const fore = new THREE.Group(); fore.position.y = -0.35 * height; arm.add(fore);
            this.box(0.12, 0.35 * height, 0.12, mArmor, 0, -0.15, 0, fore); // Forearm
            return { root: arm, hand: fore };
        };

        const lArm = createArm(-1);
        const rArm = createArm(1);

        // --- LEGS ---
        const createLeg = (side) => {
            const leg = new THREE.Group(); leg.position.set(side * 0.15 * bulk, 0, 0); g.add(leg);
            this.box(0.15, 0.5 * height, 0.15, mArmor, 0, 0.25 * height, 0, leg); // Full leg blocky
            this.box(0.16, 0.1, 0.18, mDark, 0, 0.05, 0.05, leg); // Boot
            return leg;
        };
        const lLeg = createLeg(-1);
        const rLeg = createLeg(1);


        // --- WEAPONS based on Archetype ---
        let mainWeapon;

        if (arch === 'TROOPER') {
            // RIFLE
            mainWeapon = new THREE.Group(); mainWeapon.position.set(0, -0.2, 0.2); rArm.hand.add(mainWeapon);
            this.box(0.1, 0.15, 0.6, mDark, 0, 0, 0, mainWeapon);
            this.box(0.05, 0.05, 0.8, mArmor, 0, 0.05, 0.1, mainWeapon); // Long Barrel
            this.box(0.02, 0.06, 0.1, mGlow, 0, 0.1, 0, mainWeapon); // Scope

            // Pose
            rArm.root.rotation.x = -0.5; rArm.root.rotation.y = -0.2;
            lArm.root.rotation.x = -0.5; lArm.root.rotation.y = 0.5;
        }
        else if (arch === 'GUARDIAN') {
            // SHIELD (Left)
            const shield = new THREE.Group(); shield.position.set(0.1, -0.2, 0.2); lArm.hand.add(shield);
            const sType = Math.floor(rand(20) * 2);
            if (sType === 0) { // Tower
                this.box(0.4, 0.6, 0.05, mArmor, 0, 0, 0, shield);
                this.box(0.2, 0.4, 0.06, mGlow, 0, 0, 0, shield);
            } else { // Round
                const sMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.05, 12), mArmor);
                sMesh.rotation.x = Math.PI / 2; shield.add(sMesh);
            }

            // BATON (Right)
            const baton = new THREE.Group(); baton.position.set(0, -0.3, 0); rArm.hand.add(baton);
            this.box(0.05, 0.6, 0.05, mDark, 0, 0.1, 0, baton);
            this.box(0.08, 0.2, 0.08, mGlow, 0, 0.3, 0, baton); // Energy Tip

            mainWeapon = baton;
            // Pose
            lArm.root.rotation.y = 0.5; lArm.root.rotation.x = 0;
            rArm.root.rotation.x = -0.2; rArm.root.rotation.z = 0.2;
        }
        else { // BERSERKER
            // DUAL BLADES
            const blade = (parent) => {
                const b = new THREE.Group(); b.position.set(0, -0.3, 0.1); parent.add(b);
                this.box(0.05, 0.1, 0.05, mDark, 0, -0.05, 0, b); // Hits
                this.box(0.02, 0.6, 0.08, mGlow, 0, 0.3, 0, b); // Energy Blade
                return b;
            };
            mainWeapon = blade(rArm.hand);
            blade(lArm.hand);

            // Pose (Attack ready)
            rArm.root.rotation.x = -0.4; rArm.root.rotation.z = 0.4;
            lArm.root.rotation.x = -0.4; lArm.root.rotation.z = -0.4;
        }

        // --- BACKPACK ---
        if (rand(30) > 0.4) {
            const bp = this.box(0.25, 0.3, 0.15, mDark, 0, 0, -0.15, chest);
            if (rand(31) > 0.6) {
                // Vents
                this.box(0.05, 0.4, 0.05, mArmor, -0.1, 0.1, 0, bp);
                this.box(0.05, 0.4, 0.05, mArmor, 0.1, 0.1, 0, bp);
            }
        }

        // Animations
        g.userData.idle = true;
        lArm.root.userData.idle = true;
        lArm.root.userData.swing = { axis: 'x', speed: 2, amp: 0.05, base: lArm.root.rotation.x };

        rArm.root.userData.idle = true;
        rArm.root.userData.swing = { axis: 'x', speed: 2, amp: 0.05, base: rArm.root.rotation.x, offset: 1.5 };

        g.scale.set(s, s, s);
        return { mesh: g, weapon: rArm.hand };
    }
};
