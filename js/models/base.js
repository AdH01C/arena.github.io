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
    createMinion(c, s = 1) {
        const g = new THREE.Group();
        // Materials
        const mArmor = new THREE.MeshStandardMaterial({ color: 0xeeeeee, metalness: 0.4, roughness: 0.6 });
        const mJoint = new THREE.MeshStandardMaterial({ color: 0x333333 });
        const mGlow = new THREE.MeshBasicMaterial({ color: c });

        // --- LEGS ---
        const mkLeg = (x) => {
            const l = new THREE.Group(); l.position.set(x, 0.45, 0); g.add(l);
            this.box(0.14, 0.45, 0.2, mArmor, 0, 0, 0, l); // Thigh
            this.box(0.12, 0.5, 0.18, mArmor, 0, -0.45, 0, l); // Shin
            this.box(0.14, 0.1, 0.22, mGlow, 0, -0.65, 0.05, l); // Boot
            return l;
        };
        mkLeg(-0.2); mkLeg(0.2);

        // --- TORSO ---
        const torso = this.box(0.4, 0.5, 0.25, mArmor, 0, 1.15, 0, g);
        this.box(0.28, 0.35, 0.26, mJoint, 0, -0.1, 0, torso); // Undersuit
        this.box(0.2, 0.15, 0.1, mGlow, 0, 0.1, 0.15, torso); // Core

        // --- HEAD ---
        const head = this.box(0.22, 0.25, 0.25, mArmor, 0, 0.45, 0, torso);
        this.box(0.18, 0.06, 0.2, mGlow, 0, 0.05, 0.14, head); // Visor

        // --- ARMS ---
        const ag = new THREE.Group(); ag.position.y = 0.2; torso.add(ag);
        const mkArm = (x, isRight) => {
            const s = new THREE.Group(); s.position.set(x, 0, 0); ag.add(s);
            this.box(0.2, 0.2, 0.2, mArmor, 0, 0, 0, s); // Shoulder
            this.box(0.11, 0.35, 0.11, mJoint, 0, -0.3, 0, s); // Upper
            const low = this.box(0.12, 0.4, 0.12, mArmor, 0, -0.7, 0, s); // Forearm
            return { grp: s, end: low };
        };

        const lArm = mkArm(-0.35, false);
        const rArm = mkArm(0.35, true);

        // --- RIFLE ---
        const rifle = new THREE.Group();
        rifle.position.set(0, -0.2, 0.3); // In hand
        rArm.end.add(rifle);

        this.box(0.08, 0.12, 0.6, mArmor, 0, 0, 0, rifle); // Body
        this.box(0.04, 0.04, 0.3, mJoint, 0, 0, 0.45, rifle); // Barrel
        this.box(0.02, 0.02, 0.1, mGlow, 0, 0.08, -0.1, rifle); // Scope

        // --- ANIMATION DATA ---
        g.userData.idle = true;

        // 1. Breathing (Torso Pulse)
        torso.userData.idle = true;
        torso.userData.pulse = { speed: 2, amp: 0.02, base: 1 };

        // 2. Aiming Sway (Arms)
        lArm.grp.userData.idle = true;
        lArm.grp.userData.swing = { axis: 'x', speed: 1.5, amp: 0.05, base: -1.0, offset: 0 };

        rArm.grp.userData.idle = true;
        rArm.grp.userData.swing = { axis: 'x', speed: 1.5, amp: 0.05, base: -1.2, offset: 0 };

        // 3. Rifle Venting (Particles) - Smoke from barrel? Or cooling vent?
        // Let's add a small vent on the side
        const vent = new THREE.Object3D();
        vent.position.set(0.05, 0, 0);
        rifle.add(vent);

        vent.userData.idle = true;
        vent.userData.emitParticles = {
            color: 0x888888,
            size: 0.03,
            speed: 0.3,
            spread: 0.05
        };
        vent.userData.emitChance = 0.05; // Occasional puffs

        // Pose
        // (Rotation handled by Swing now)
        lArm.grp.rotation.y = 0.5;
        rArm.grp.rotation.z = -0.1;

        g.scale.set(s, s, s);
        return { mesh: g, weapon: rifle };
    }
};
