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
    createMinion(c, s = 1, seed = 0, arch = 'TROOPER') {
        const g = new THREE.Group();
        const rand = (offset) => this.rand(seed + offset);

        // --- MASSIVE BOSS SCALING ---
        if (['DEMON', 'AVATAR', 'PIT LORD'].includes(arch)) {
            s *= 2.5; // Make them HUGE
        }

        // --- HELPER WRAPPERS ---
        const box = (w, h, d, m, x, y, z, p) => this.box(w, h, d, m, x, y, z, p);

        // --- MATERIALS ---
        const colorVar = (rand(1) - 0.5) * 0.1;
        const baseC = new THREE.Color(c).offsetHSL(0, 0, colorVar);

        const mArmor = new THREE.MeshStandardMaterial({ color: baseC, metalness: 0.5, roughness: 0.5 });
        const mDark = new THREE.MeshStandardMaterial({ color: 0x222222, metalness: 0.2, roughness: 0.8 });
        const mGlow = new THREE.MeshBasicMaterial({ color: 0x00ffcc });

        if (['BERSERKER', 'DEMON', 'IFRIT'].includes(arch)) mGlow.color.setHex(0xff3300);
        if (['GUARDIAN', 'GOLEM', 'ANGEL', 'AVATAR'].includes(arch)) mGlow.color.setHex(0x00aaff);
        if (arch === 'SKELETON') { mArmor.color.setHex(0xdddddd); mGlow.color.setHex(0x33ff00); }
        if (arch === 'SHADOW') { mArmor.color.setHex(0x111111); mGlow.color.setHex(0x9900ff); mArmor.transparent = true; mArmor.opacity = 0.8; }

        // --- DISPATCHER ---

        if (arch === 'TURRET') {
            const base = new THREE.Group(); box(0.4, 0.2, 0.4, mDark, 0, 0.1, 0, g);
            box(0.1, 0.6, 0.1, mDark, 0.2, -0.2, 0.2, g).rotation.set(0.5, 0, -0.5);
            box(0.1, 0.6, 0.1, mDark, -0.2, -0.2, 0.2, g).rotation.set(0.5, 0, 0.5);
            box(0.1, 0.6, 0.1, mDark, 0, -0.2, -0.25, g).rotation.set(-0.5, 0, 0);

            const head = box(0.3, 0.3, 0.4, mArmor, 0, 0.5, 0, g);
            box(0.05, 0.05, 0.8, mDark, 0.08, 0, 0.4, head);
            box(0.05, 0.05, 0.8, mDark, -0.08, 0, 0.4, head);
            box(0.1, 0.1, 0.15, mGlow, 0, 0.15, 0.1, head);
            head.userData.idle = true;
            head.userData.swing = { axis: 'y', speed: 1, amp: 0.3, base: 0 };
        }
        else if (arch === 'DRONE') {
            const body = box(0.3, 0.3, 0.3, mArmor, 0, 1.5, 0, g);
            box(0.2, 0.2, 0.35, mDark, 0, 0, 0, body);
            box(0.15, 0.15, 0.4, mGlow, 0, 0, 0.05, body);
            const rotor = (x, z) => {
                const r = box(0.25, 0.02, 0.02, mDark, x, 0.2, z, body);
                const blade = box(0.6, 0.01, 0.05, mGlow, 0, 0.05, 0, r);
                blade.userData.idle = true; blade.userData.spin = { axis: 'y', speed: 15 };
            }
            rotor(0.25, 0.25); rotor(-0.25, -0.25); rotor(0.25, -0.25); rotor(-0.25, 0.25);
            body.userData.idle = true; body.userData.float = { speed: 2, amp: 0.2, base: 1.5 };
        }
        else if (arch === 'WOLF') {
            const bodyY = 0.6;
            const body = box(0.3, 0.35, 0.6, mArmor, 0, bodyY, 0, g);
            const head = box(0.25, 0.25, 0.3, mArmor, 0, 0.1, 0.4, body);
            box(0.15, 0.1, 0.2, mDark, 0, -0.05, 0.2, head);
            box(0.05, 0.05, 0.05, mGlow, -0.08, 0.05, 0.1, head);
            box(0.05, 0.05, 0.05, mGlow, 0.08, 0.05, 0.1, head);
            const leg = (x, z) => {
                const l = new THREE.Group(); l.position.set(x, bodyY - 0.1, z); g.add(l);
                box(0.1, 0.4, 0.1, mDark, 0, -0.2, 0, l);
                box(0.12, 0.05, 0.12, mArmor, 0, -0.4, 0.05, l);
                return l;
            }
            leg(0.15, 0.25); leg(-0.15, 0.25); leg(0.15, -0.25); leg(-0.15, -0.25);
            const tail = box(0.08, 0.08, 0.4, mArmor, 0, 0.1, -0.4, body);
            tail.rotation.x = -0.5;
        }
        else if (arch === 'WASP') {
            // INSECTOID (Floating)
            // Increased scale slightly (0.2 -> 0.3)
            const body = box(0.3, 0.3, 0.6, mArmor, 0, 1.5, 0, g);
            box(0.25, 0.25, 0.5, mDark, 0, 0, -0.2, body); // Abdomen

            // Stinger
            box(0.08, 0.08, 0.3, mGlow, 0, -0.05, -0.5, body);

            // Wings
            const wL = box(0.6, 0.02, 0.3, mGlow, -0.3, 0.1, 0.1, body);
            const wR = box(0.6, 0.02, 0.3, mGlow, 0.3, 0.1, 0.1, body);
            wL.userData.idle = true; wL.userData.swing = { axis: 'z', speed: 20, amp: 0.5, base: 0 };
            wR.userData.idle = true; wR.userData.swing = { axis: 'z', speed: 20, amp: 0.5, base: 0, offset: Math.PI };

            // Float
            body.userData.idle = true; body.userData.float = { speed: 4, amp: 0.3, base: 1.5 };
        }
        else if (['GOLEM', 'GATE GUARDIAN'].includes(arch)) {
            const bulk = arch === 'GATE GUARDIAN' ? 2.0 : 1.5;
            const h = 1.0 * bulk;
            const lLeg = box(0.4 * bulk, 0.5 * h, 0.4 * bulk, mArmor, -0.25 * bulk, 0.25 * h, 0, g);
            const rLeg = box(0.4 * bulk, 0.5 * h, 0.4 * bulk, mArmor, 0.25 * bulk, 0.25 * h, 0, g);
            const torso = box(0.7 * bulk, 0.6 * h, 0.5 * bulk, mDark, 0, 0.75 * h, 0, g);
            box(0.3 * bulk, 0.2 * bulk, 0.3 * bulk, mArmor, 0, 0.4 * h, 0.1 * bulk, torso);
            box(0.2 * bulk, 0.05 * bulk, 0.05, mGlow, 0, 0.4 * h, 0.26 * bulk, torso);
            const mArm = (side) => {
                const arm = new THREE.Group(); arm.position.set(side * 0.4 * bulk, 0, 0); torso.add(arm);
                box(0.3 * bulk, 0.8 * h, 0.3 * bulk, mArmor, side * 0.2, -0.4 * h, 0, arm);
                return arm;
            }
            mArm(1); mArm(-1);
        }
        else {
            // --- STANDARD HUMANOID FALLBACK ---
            const isSkeleton = arch === 'SKELETON';
            const isAngel = ['ANGEL', 'AVATAR', 'IFRIT'].includes(arch);
            const isDemon = ['DEMON', 'PIT LORD', 'DRAKE'].includes(arch);

            const height = 1.0 + (rand(2) - 0.5) * 0.2 + (arch === 'AVATAR' || arch === 'PIT LORD' ? 0.8 : 0);
            const bulk = (isSkeleton ? 0.6 : 1.0) * (arch === 'PIT LORD' || arch === 'GOLEM' ? 1.5 : 1.0);

            const torsoMat = isSkeleton ? mArmor : mArmor;
            const chest = box(0.3 * bulk, 0.4 * height, 0.25 * bulk, torsoMat, 0, 0.7 * height, 0, g);
            const head = box(0.2, 0.22, 0.22, mArmor, 0, 0.35 * height, 0, chest);
            if (!isSkeleton) {
                box(0.18, 0.05, 0.15, mGlow, 0, 0.02, 0.06, head);
            } else {
                box(0.05, 0.05, 0.05, mGlow, -0.05, 0, 0.11, head);
                box(0.05, 0.05, 0.05, mGlow, 0.05, 0, 0.11, head);
            }

            const ag = new THREE.Group(); ag.position.y = 0.2; chest.add(ag);
            const limbThick = isSkeleton ? 0.06 : 0.1;
            const mkArm = (side) => {
                const arm = new THREE.Group(); arm.position.set(side * 0.3 * bulk, 0.2, 0); chest.add(arm);
                box(limbThick, 0.35 * height, limbThick, mDark, 0, -0.17, 0, arm);
                const fore = new THREE.Group(); fore.position.y = -0.35 * height; arm.add(fore);
                box(limbThick * 1.2, 0.35 * height, limbThick * 1.2, mArmor, 0, -0.17, 0, fore);
                return { root: arm, hand: fore };
            }
            const lArm = mkArm(-1); const rArm = mkArm(1);
            const mkLeg = (side) => {
                const leg = new THREE.Group(); leg.position.set(side * 0.15 * bulk, 0.45 * height, 0); g.add(leg);
                box(limbThick * 1.5, 0.5 * height, limbThick * 1.5, mArmor, 0, -0.25 * height, 0, leg);
                return leg;
            }
            const lLeg = mkLeg(-1); const rLeg = mkLeg(1);

            if (isAngel || arch === 'DRAKE') {
                const wing = (side) => {
                    const w = new THREE.Group(); w.position.set(side * 0.1, 0.1, -0.15); chest.add(w);
                    const col = arch === 'IFRIT' ? 0xff4400 : (arch === 'DRAKE' ? 0xffaa00 : 0xffffff);
                    const mat = new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: 0.7 });
                    const s1 = box(0.6, 0.1, 0.05, mat, side * 0.3, 0.2, 0, w);
                    s1.rotation.z = side * 0.5;
                    const s2 = box(0.4, 0.8, 0.05, mat, side * 0.5, 0.2, 0, w);
                    w.userData.idle = true;
                    w.userData.swing = { axis: 'y', speed: 3, amp: 0.3, base: side * 0.2 };
                }
                wing(1); wing(-1);
            }
            if (isDemon) {
                box(0.04, 0.15, 0.04, mGlow, -0.08, 0.15, 0, head).rotation.z = 0.2;
                box(0.04, 0.15, 0.04, mGlow, 0.08, 0.15, 0, head).rotation.z = -0.2;
            }
            if (arch === 'AVATAR' || arch === 'ANGEL') {
                const halo = new THREE.Mesh(new THREE.TorusGeometry(0.15, 0.02, 8, 16), mGlow);
                halo.rotation.x = Math.PI / 2; halo.position.y = 0.25; head.add(halo);
            }

            if (arch === 'TROOPER' || arch === 'SKELETON' || arch === 'WALKER' || arch === 'DRAKE') {
                const gun = box(0.1, 0.1, 0.5, mDark, 0, -0.1, 0.2, rArm.hand);
                box(0.05, 0.05, 0.2, mGlow, 0, 0.05, 0.3, gun);
                rArm.root.rotation.x = -0.8; lArm.root.rotation.x = -0.8;
            } else if (['GUARDIAN', 'ANGEL', 'AVATAR'].includes(arch)) {
                box(0.35, 0.5, 0.05, mArmor, 0.1, 0, 0.1, lArm.hand);
                box(0.05, 0.4, 0.05, mDark, 0, -0.1, 0, rArm.hand);
                box(0.1, 0.1, 0.1, mGlow, 0, 0.1, 0, rArm.hand);
            } else {
                const blade = (p) => { box(0.05, 0.5, 0.1, mGlow, 0, 0.1, 0, p); }
                blade(rArm.hand); blade(lArm.hand);
                rArm.root.rotation.x = -0.5; lArm.root.rotation.x = -0.5;
            }

            g.userData.idle = true;
            lArm.root.userData.idle = true; lArm.root.userData.swing = { axis: 'x', speed: 2, amp: 0.1, base: lArm.root.rotation.x };
            rArm.root.userData.idle = true; rArm.root.userData.swing = { axis: 'x', speed: 2, amp: 0.1, base: rArm.root.rotation.x, offset: 1.5 };
        }

        g.scale.set(s, s, s);
        if (arch === 'TURRET' || arch === 'DRONE' || arch === 'WASP') return { mesh: g, weapon: g };
        return { mesh: g, weapon: g };
    }

};
