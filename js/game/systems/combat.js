Object.assign(game, {
    spawnEnemy() {
        if (this.enemy) engine.scene.remove(this.enemy.mesh);
        this.battleCombo = 0;
        this.clearAllBuffs(); // FRESH START
        this.bossStarted = false; // Reset boss AI gate

        const isFinalBoss = (this.floor >= 100);
        const isMidBoss = (this.floor === 20 || this.floor === 40 || this.floor === 60 || this.floor === 80);
        const isFloorBoss = (this.floor % 5 === 0 && !isFinalBoss && !isMidBoss);

        let hp, atk;

        // --- THE "GOLDEN RATIO" SCALING (1.13) ---
        // Floor 1:   200 HP
        // Floor 50:  90,000 HP
        // Floor 75:  3,800,000 HP
        const difficultyScale = this.floor + (this.rebirth * 50);

        // ... (HP Calc omitted for brevity, logic remains same)
        // Recalculating HP/ATK just in case to be safe within this function block context if needed,
        // but assuming the original scaling code is below or we just inject above checks.

        // Standard Scaling Logic (Re-pasted Ensure Safety)
        if (this.floor <= 50) {
            hp = Math.floor(200 * Math.pow(1.13, difficultyScale));
            atk = Math.floor(10 * Math.pow(1.085, difficultyScale));
        } else {
            const scaleAt50 = 50 + (this.rebirth * 50);
            const hpAt50 = 200 * Math.pow(1.13, scaleAt50);
            const atkAt50 = 10 * Math.pow(1.085, scaleAt50);
            const extraFloors = this.floor - 50;
            hp = Math.floor(hpAt50 * Math.pow(1.18, extraFloors));
            atk = Math.floor(atkAt50 * Math.pow(1.12, extraFloors));
        }

        // Rebirth Multiplier
        if (this.rebirth > 0) {
            hp = Math.floor(hp * Math.pow(2.8, this.rebirth));
            atk = Math.floor(atk * Math.pow(1.6, this.rebirth));
        }

        if (isFinalBoss) {
            this.bossPhase = 1;
            hp = 2500000000 * Math.pow(8, this.rebirth);
            atk = 450000 * Math.pow(2.5, this.rebirth);
            document.getElementById('enemy-name').innerText = `THE ARCHITECT (AVATAR)`;
            document.getElementById('enemy-name').style.color = '#ffd700';
            this.enemy = new Unit(false, hp, hp, atk, 0xffd700, 'architect');
            this.enemy.mitigation = 0.4;
        }
        else if (isMidBoss) {
            hp *= 25; // Massive Boss HP (was 18x)
            atk *= 4.0; // Hard Hitter

            let name = "BOSS";
            let type = "boss";
            let color = "#ff0000";

            if (this.floor === 20) { name = "NEON HYDRA"; type = "neonHydra"; color = "#00ff00"; }
            if (this.floor === 40) { name = "IRON COLOSSUS"; type = "ironColossus"; color = "#ffaa00"; }
            if (this.floor === 60) { name = "VOID MOTHER"; type = "voidMother"; color = "#aa00ff"; }
            if (this.floor === 80) { name = "CORRUPTED CORE"; type = "corruptedCore"; color = "#ff0000"; }

            document.getElementById('enemy-name').innerText = `${name}`;
            document.getElementById('enemy-name').style.color = color;
            this.enemy = new Unit(false, hp, hp, atk, color, type);

            // Initial Mechanic Setup
            if (this.floor === 40) { this.enemy.mitigation = 0.8; this.showText("ARMOR PLATING ACTIVE", this.enemy.mesh.position, "#aaaaaa"); }
        }
        else if (isFloorBoss) { // Multiples of 5 (5, 10, 15, 25, 30, 35, 45...)
            hp *= 8.0;
            atk *= 2.5;

            let name = `SECTOR BOSS - ${this.floor}`;
            let type = "boss";

            // --- MINI-BOSS MAPPING ---
            if (this.floor === 5) { name = "MUTATED RAT"; type = "rat"; }
            else if (this.floor === 10) { name = "BIO-SOLDIER"; type = "bioSoldier"; }
            else if (this.floor === 15) { name = "CYBORG PROTOTYPE"; type = "cyborg"; }

            else if (this.floor === 25) { name = "GATLING BOT"; type = "gatlingBot"; }
            else if (this.floor === 30) { name = "MISSILE WALKER"; type = "missileWalker"; }
            else if (this.floor === 35) { name = "DREADNOUGHT"; type = "dreadnought"; }

            else if (this.floor === 45) { name = "NULL SPHERE"; type = "nullSphere"; }
            else if (this.floor === 50) { name = "DOPPELGANGER"; type = "doppelganger"; }
            else if (this.floor === 55) { name = "NIGHTMARE SHAPE"; type = "nightmare"; }

            else if (this.floor === 65) { name = "GLITCH WARRIOR"; type = "glitchWarrior"; }
            else if (this.floor === 70) { name = "LOGIC VIRUS"; type = "logicVirus"; }
            else if (this.floor === 75) { name = "FATAL EXCEPTION"; type = "fatalException"; }

            // --- SANCTUM BOSSES ---
            else if (this.floor === 85) { name = "LUMINOUS PALADIN"; type = "luminousPaladin"; }
            else if (this.floor === 90) { name = "DIVINITY SEEKER"; type = "divinitySeeker"; }
            else if (this.floor === 95) { name = "SERAPHIM COMMANDER"; type = "seraphimCommander"; }

            document.getElementById('enemy-name').innerText = name;
            document.getElementById('enemy-name').style.color = '#ff5500';
            this.enemy = new Unit(false, hp, hp, atk, '#ff5500', type);
        }
        else {
            // Apply Mutation Scaling
            if (this.currentMutation === 'encryption') {
                hp = Math.floor(hp * 0.6);
            }

            // --- SECTOR THEMED SPAWNING ---
            let type = 'mutant';
            let colorHex = 0xffffff;

            if (this.floor < 20) {
                type = 'mutant';
                colorHex = 0xaa5555; // Reddish flesh
            } else if (this.floor < 40) {
                type = 'mech';
                colorHex = 0x5555aa; // Blueish steel
            } else if (this.floor < 60) {
                type = 'voidEntity';
                colorHex = 0xaa00ff; // Purple void
            } else if (this.floor < 80) {
                type = 'glitchEntity';
                colorHex = 0x00ff00; // Matrix green
            } else {
                // Celestial Variants
                const variants = ['celestial_knight', 'celestial_ronin', 'celestial_priest', 'celestial_summoner'];
                type = variants[Math.floor(Math.random() * variants.length)];
                colorHex = 0xffd700; // Holy Gold
            }

            document.getElementById('enemy-name').innerText = `${type.toUpperCase()} - F${this.floor}`;
            document.getElementById('enemy-name').style.color = '#aaa';
            const color = new THREE.Color(colorHex); // Pass base color for glows
            this.enemy = new Unit(false, hp, hp, atk, color, type);
        }

        // Apply Mutation Instance Effects

        // Apply Mutation Instance Effects

        // --- DEBUG: FORCE IGRIS ---
        if (window.forceIgris) {
            if (this.enemy) engine.scene.remove(this.enemy.mesh);
            this.enemy = new Unit(false, hp * 5, hp * 5, atk * 2, '#aa00ff', 'igris');
            document.getElementById('enemy-name').innerText = "IGRIS THE VOID COMMANDER";
            document.getElementById('enemy-name').style.color = "#aa00ff";
        }
        // -------------------------

        if (this.currentMutation === 'encryption' && this.enemy) {
            this.enemy.baseArmor += 100;
            this.enemy.recalculateStats();
        }

        // --- STATS ---
        this.enemy.baseArmor = Math.floor(this.floor * 1.5); // Armor helps trash mobs survive rapid weak hits
        this.enemy.armor = this.enemy.baseArmor;
        this.enemy.critChance = Math.min(0.20, this.floor * 0.002);
        if (this.floor > 10) this.enemy.dodge = Math.min(0.15, (this.floor - 10) * 0.002);

        const targetY = this.enemy.mesh.userData.baseY;
        this.enemy.mesh.position.y = 10;
        engine.tween(this.enemy.mesh.position, 'y', targetY, 800, () => {
            // Trigger Boss Intro after spawn animation
            if (this.enemy && ['midboss', 'boss', 'architect', 'igris'].includes(this.enemy.type)) {
                // Determine name based on what was set in UI
                const name = document.getElementById('enemy-name').innerText;
                console.log(`[BOSS_INTRO] Triggering for Type: ${this.enemy.type}, Name: ${name}`);
                this.triggerBossIntro(this.enemy.type, name);
            } else {
                console.log(`[BOSS_INTRO] No intro for Type: ${this.enemy ? this.enemy.type : 'null'}`);
            }
        });
    },

    executePhase2Transform() {
        console.log("EXECUTING TRANSFORMATION");
        this.bossPhase = 2;

        // 1. Visual Effects
        engine.addShake(1.0);
        if (this.enemy && this.enemy.mesh) {
            engine.spawnParticles(this.enemy.mesh.position, 0xff0000, 50);

            // Color the model red safely
            this.enemy.mesh.traverse((child) => {
                if (child.isMesh) {
                    child.material = child.material.clone();
                    child.material.color.setHex(0xff0000);
                    if (child.material.emissive) child.material.emissive.setHex(0xaa0000);
                }
            });

            // Make it bigger
            this.enemy.mesh.scale.set(3, 3, 3);
        }

        // 2. Buff Stats
        const newMaxHp = Math.floor(this.enemy.maxHp * 1.5);
        this.enemy.maxHp = newMaxHp;
        this.enemy.hp = newMaxHp;
        this.enemy.atk = Math.floor(this.enemy.atk * 2);
        this.enemy.mitigation = 0.6;

        // 3. UI Text Updates
        document.getElementById('enemy-name').innerText = "THE ARCHITECT (TRUE FORM)";
        document.getElementById('enemy-name').style.color = "#ff0000";
        this.showText("<< LIMITERS REMOVED >>", this.enemy.mesh.position, '#ff0000');

        // --- FIX: RESTORE CONTROLS ---
        this.state = 'IDLE';

        // Bring back HUD opacity
        document.getElementById('hud').style.opacity = '1';

        // Make buttons interactive again
        const controls = document.getElementById('battle-controls');
        controls.classList.add('active');

        this.updateButtons();
        this.updateUI();
    },

    triggerBossPhase2() {
        if (this.pendingBossTransformation) return; // Prevent double trigger
        // 1. Set Flag FIRST
        this.pendingBossTransformation = true;
        this.state = 'CUTSCENE';

        // 2. Play Dialogue (Using s/t format directly now to be 100% safe)
        const lines = [
            { s: "ARCHITECT", t: "...Interesting." },
            { s: "ARCHITECT", t: "You have exceeded the calculated parameters." },
            { s: "ARCHITECT", t: "But this vessel was merely a constraint." },
            { s: "ARCHITECT", t: "Now... witness the source code of reality." }
        ];

        if (typeof this.startCutscene === 'function') {
            this.startCutscene(lines);
        } else {
            console.error("Cutscene system missing, skipping to phase 2");
            this.endCutscene();
        }
    },

    triggerBossEnding() {
        if (this.pendingBossDefeat) return; // Prevent double trigger
        this.state = 'CUTSCENE';

        this.startCutscene([
            "ARCHITECT: Impossible...",
            "ARCHITECT: Value... null...",
            "ARCHITECT: System... shutting... down...",
            "SYSTEM: ADMIN ACCESS GRANTED."
        ]);

        // Triggers the actual win/rebirth after dialogue
        this.pendingBossDefeat = true;
    },

    // --- BOSS AI SYSTEM ---
    bossAiLoop() {
        if (!this.enemy || this.floor < 100 || this.state === 'GAMEOVER' || this.state === 'CUTSCENE') return;
        if (!this.bossStarted) return; // Wait for first regular turn

        const now = performance.now();
        if (now - this.lastBossAiTick < 2000) return; // 2s Cooldown
        this.lastBossAiTick = now;

        // Boss spells are now guaranteed to check every 2s
        const spell = Math.random();

        if (spell < 0.4) {
            // SPELL: REALITY BREAK (Reduced from 2.5x to 1.5x damage)
            this.showText("<< REALITY BREAK >>", this.enemy.mesh.position, '#ff0000');
            engine.spawnParticles(this.player.mesh.position, 0xff0000, 20);
            this.player.takeDmg(this.enemy.atk * 1.5);
        }
        else if (spell < 0.7) {
            // SPELL: SYSTEM PURGE (Removes your buffs)
            this.showText("<< SYSTEM PURGE >>", this.enemy.mesh.position, '#00f2ff');
            this.player.activeBuffs = []; // Clear buffs
            this.updateBuffs();
            this.player.takeDmg(this.enemy.atk * 0.5);
        }
        else {
            // SPELL: RECOMPILE (Heal Boss)
            const heal = Math.floor(this.enemy.maxHp * 0.05);
            this.enemy.hp = Math.min(this.enemy.maxHp, this.enemy.hp + heal);
            this.showText(`+${this.formatNum(heal)} RECOVER`, this.enemy.mesh.position, '#00ff00');
        }

        // --- SECTOR BOSS PASSIVES ---
        if (this.enemy.type === 'neonHydra') {
            const regen = Math.floor(this.enemy.maxHp * 0.02);
            this.enemy.hp = Math.min(this.enemy.maxHp, this.enemy.hp + regen);
            this.showText(`+${this.formatNum(regen)} REGEN`, this.enemy.mesh.position, '#00ff00');
        }
    },

    endEnemyTurn() {
        const regen = this.player.manaRegen;
        this.player.mana = Math.min(this.player.maxMana, this.player.mana + regen);
        this.showText(`+${regen} MP`, this.player.mesh.position, '#00f2ff');

        // Tick down buff durations at start of new player turn
        this.tickBuffs();

        this.updateUI();

        if (this.player.hp <= 0) {
            // Check for revive token
            if (this.iapBoosts.reviveTokens > 0) {
                this.iapBoosts.reviveTokens--;
                this.player.hp = Math.floor(this.player.maxHp * 0.5); // Revive at 50% HP
                this.player.mana = this.player.maxMana;
                this.showText('💀 REVIVED!', this.player.mesh.position, '#ff00ff');
                this.updateUI();
                this.state = 'IDLE';
            } else {
                this.handleDefeat();
            }
        } else {
            this.state = 'IDLE';
        }
    },

    enemyTurn() {
        if (this.floor >= 100) this.bossStarted = true;

        this.enemy.attackAnim(() => {
            let dmg = Math.floor(this.enemy.atk * (0.8 + Math.random() * 0.4));
            let isSpecial = false;

            // --- BOSS SPECIAL ATTACK (Every 3 turns) ---
            if (['boss', 'midboss', 'architect', 'igris'].includes(this.enemy.type)) {
                this.enemy.turnCount = (this.enemy.turnCount || 0) + 1;

                // Igris Specific Mechanics
                if (this.enemy.type === 'igris') {
                    if (this.enemy.turnCount % 4 === 0) {
                        // VOID SLICE (Multi-Hit)
                        isSpecial = true;
                        dmg = Math.floor(dmg * 0.7); // Per hit
                        engine.createVFX('SLASH', this.player.mesh.position, { color: 0xaa00ff, count: 15, axis: new THREE.Vector3(1, 0.2, 0) });
                        setTimeout(() => {
                            const ad = this.player.takeDmg(dmg);
                            if (ad > 0) this.showText(ad, this.player.mesh.position, '#aa00ff');
                            engine.createVFX('SLASH', this.player.mesh.position, { color: 0xaa00ff, count: 15, axis: new THREE.Vector3(-1, 0.2, 0) });
                        }, 150);
                        setTimeout(() => {
                            const ad = this.player.takeDmg(dmg);
                            if (ad > 0) this.showText(ad, this.player.mesh.position, '#aa00ff');
                            engine.createVFX('SLASH', this.player.mesh.position, { color: 0xaa00ff, count: 15, axis: new THREE.Vector3(0, 1, 0) });
                        }, 350);
                        setTimeout(() => {
                            const ad = this.player.takeDmg(dmg);
                            if (ad > 0) this.showText(ad, this.player.mesh.position, '#aa00ff');
                            // Resume turn logic
                            this.endEnemyTurn();
                        }, 550);
                        this.showText("<< VOID SLICE >>", this.enemy.mesh.position, '#aa00ff');
                        return; // Async completion triggers endEnemyTurn

                    } else if (Math.random() < 0.15) {
                        // VOID TRAP (Stun)
                        isSpecial = true;
                        this.showText("<< VOID TRAP >>", this.player.mesh.position, '#220033');
                        engine.createVFX('VOID', this.player.mesh.position, { size: 0.5, count: 50, speed: 2.0 });
                        engine.triggerVoidConsume();
                        engine.addShake(1.0);
                        // Skip player turn simulation (or just huge damage if no skip logic)
                        // For now, deal massive damage as "Stun Punishment"
                        dmg *= 2.5;
                    }
                }
                // Standard Boss Critical
                else if (this.enemy.turnCount % 3 === 0) {
                    dmg *= 2;
                    isSpecial = true;
                    engine.addShake(0.6);
                    this.showText("CRITICAL ERROR!", this.player.mesh.position, "#ff0000");
                }
            }

            // --- AOE DAMAGE HELPER ---
            const dealAOE = (dmgVal, color = '#ff0000') => {
                // 1. Hit Player
                const pDmg = this.player.takeDmg(dmgVal);
                if (pDmg > 0) this.showText(pDmg, this.player.mesh.position, color);

                // 2. Hit All Minions
                if (this.player.minions && this.player.minions.length > 0) {
                    this.player.minions.forEach(minion => {
                        const mDmg = minion.takeDmg(dmgVal); // Minions have own armor/stats logic
                        if (mDmg > 0) this.showText(mDmg, minion.mesh.position, color);
                        if (minion.updateHealthBar) minion.updateHealthBar();
                    });
                    // Cleanup dead minions immediately for visual clarity
                    this.player.minions = this.player.minions.filter(m => {
                        if (m.hp <= 0) {
                            if (m.mesh) engine.scene.remove(m.mesh);
                            if (m.removeHealthBar) m.removeHealthBar();
                            return false;
                        }
                        return true;
                    });
                    this.updateMinionBars();
                    if (this.player.minions.length === 0) this.resetPlayerPosition();
                }
            };

            // Hardcore Hit Impact (Only specific bosses)
            if (['igris', 'ronin', 'samurai'].includes(this.enemy.type) || (this.enemy.name && (this.enemy.name.includes('RONIN') || this.enemy.name.includes('SAMURAI')))) {
                engine.triggerImpactLine();
            }

            // --- STANDARD ATTACK (Single Target) OR SPECIAL AOE ---
            if (!isSpecial) {
                // Normal hit: Targets player (or shield minion handles it via takeDmg logic)
                const actualDmg = this.player.takeDmg(dmg);
                if (actualDmg > 0) this.showText(actualDmg, this.player.mesh.position, '#ff0055');
                engine.addShake(0.1);
            }

            if (this.enemy.type === 'architect') {
                const attacks = ['god_beam', 'blackhole', 'matrix', 'nuke'];
                const vfx = attacks[Math.floor(Math.random() * attacks.length)];

                // Architect always feels like AOE visually, but let's make the Nuke actually AOE
                if (vfx === 'nuke') {
                    dealAOE(Math.floor(dmg * 0.8), '#ff0000'); // AOE Hit
                    engine.createVFX('BURST', this.player.mesh.position, { color: 0xff0000, count: 50, size: 0.3 });
                } else {
                    if (vfx === 'god_beam') engine.createVFX('BEAM', this.player.mesh.position, { color: 0xffd700, size: 0.5, speed: 5 });
                    else if (vfx === 'matrix') engine.createVFX('GLITCH', this.player.mesh.position, { color: 0x00ff00, count: 30, speed: 2 });
                    else engine.createVFX('BURST', this.player.mesh.position, { color: 0xff0000, count: 50, size: 0.3 });
                }
                this.runVFX(vfx, this.player.mesh.position, 0xff0000, 0, isSpecial ? 1.5 : 1);

            } else if (this.enemy.type === 'boss' || this.enemy.type === 'midboss') {
                engine.createVFX('BURST', this.player.mesh.position, { color: 0xff5500, count: 40, size: 0.25 });
                this.runVFX(isSpecial ? 'nuke' : 'heavy', this.player.mesh.position, 0xff5500, 0, isSpecial ? 1.2 : 1);
            } else {
                engine.spawnParticles(this.player.mesh.position, 0xffaa00, 5);
            }

            // --- NEW: BOSS MECHANICS ---
            if (this.enemy.isRaging || this.enemy.type === 'midboss' || ['neonHydra', 'ironColossus', 'voidMother', 'corruptedCore'].includes(this.enemy.type)) {
                this.enemy.turnCount = (this.enemy.turnCount || 0) + 1;

                // --- NEON HYDRA (F20) ---
                if (this.enemy.type === 'neonHydra') {
                    // Acid Spray (Every 3 turns) - TARGETS ALL (AOE)
                    if (this.enemy.turnCount % 3 === 0) {
                        this.showText("<< ACID SPRAY >>", this.player.mesh.position, '#00ff00');
                        this.player.armor = Math.floor(this.player.armor * 0.8); // 20% Armor Shred (Player only)

                        // AOE DAMAGE
                        dealAOE(Math.floor(dmg * 0.5), '#00ff00');
                        engine.createVFX('BURST', this.player.mesh.position, { color: 0x00ff00, count: 40, speed: 0.8, size: 0.3 });
                    }
                }

                // --- IRON COLOSSUS (F40) ---
                if (this.enemy.type === 'ironColossus') {
                    // Armor Shatter Mechanic
                    if (this.enemy.hp < this.enemy.maxHp * 0.5 && this.enemy.mitigation > 0) {
                        this.enemy.mitigation = 0; // SHATTERED!
                        this.showText("<< ARMOR SHATTERED >>", this.enemy.mesh.position, '#ffaa00');
                        engine.addShake(1.5);
                        engine.createVFX('BURST', this.enemy.mesh.position, { color: 0xaaaaaa, count: 60, speed: 2.0, size: 0.4 });
                    }
                    // Seismic Slam (Every 4 turns) - AOE
                    if (this.enemy.turnCount % 4 === 0) {
                        this.showText("<< SEISMIC SLAM >>", this.player.mesh.position, '#ff4400');
                        engine.addShake(2.0);

                        // MASSIVE AOE
                        dealAOE(Math.floor(dmg * 1.5), '#ff4400');
                        engine.createVFX('BURST', this.player.mesh.position, { color: 0xff4400, count: 50, speed: 1.5, size: 0.4 });
                    }
                }

                // --- VOID MOTHER (F60) ---
                if (this.enemy.type === 'voidMother') {
                    // Reality Shift: Hide UI randomly
                    if (Math.random() < 0.2) {
                        this.showText("<< REALITY SHIFT >>", this.player.mesh.position, '#aa00ff');
                        document.getElementById('hud').style.opacity = '0.2';
                        setTimeout(() => { document.getElementById('hud').style.opacity = '1'; }, 2000);
                    }
                }

                // --- CORRUPTED CORE (F80) ---
                if (this.enemy.type === 'corruptedCore') {
                    // Data Glitch: Randomize Mana
                    if (this.enemy.turnCount % 3 === 0) {
                        this.showText("<< DATA GLITCH >>", this.player.mesh.position, '#ff0000');
                        this.player.mana = Math.floor(Math.random() * this.player.maxMana);
                        // Glitch hits everyone lightly
                        dealAOE(Math.floor(dmg * 0.3), '#ff0000');
                    }
                }

                // --- SANCTUM BOSSES (Floor 85-95) ---
                if (this.enemy.type === 'luminousPaladin') {
                    // Sun Strike (Heavy Hit)
                    if (this.enemy.turnCount % 3 === 0) {
                        isSpecial = true;
                        dmg = Math.floor(dmg * 1.5);
                        this.showText("<< SUN STRIKE >>", this.player.mesh.position, '#ffd700');
                        engine.createVFX('BEAM', this.player.mesh.position, { color: 0xffd700, size: 0.4, speed: 4 });
                    }
                }
                if (this.enemy.type === 'divinitySeeker') {
                    // Holy Nova (AoE + Self Heal)
                    if (this.enemy.turnCount % 3 === 0) {
                        this.showText("<< HOLY NOVA >>", this.player.mesh.position, '#00ffff');
                        const heal = Math.floor(this.enemy.maxHp * 0.03);
                        this.enemy.hp = Math.min(this.enemy.maxHp, this.enemy.hp + heal);
                        engine.spawnParticles(this.enemy.mesh.position, 0x00ffff, 30);

                        // AOE HIT
                        dealAOE(Math.floor(dmg * 0.8), '#00ffff');
                    }
                }
                if (this.enemy.type === 'seraphimCommander') {
                    // Judgment (Execute if < 40%)
                    if (this.enemy.turnCount % 4 === 0) {
                        if ((this.player.hp / this.player.maxHp) < 0.4) {
                            dmg *= 2.0;
                            this.showText("<< JUDGMENT >>", this.player.mesh.position, '#ff0000');
                        } else {
                            this.showText("<< HOLY FIRE >>", this.player.mesh.position, '#ffaa00');
                            dmg *= 1.2;
                        }
                        engine.createVFX('BURST', this.player.mesh.position, { color: 0xffaa00, count: 60, speed: 1.5 });
                    }
                }

                // Warden (Floor 25 - Legacy): Reactive Shield every 3 turns
                if (this.floor >= 25 && this.floor < 40 && this.enemy.turnCount % 3 === 0 && this.enemy.type === 'midboss') {
                    this.enemy.reflectShield = 0.5; // Reflect 50%
                    this.showText("REACTIVE SHIELD ACTIVE", this.enemy.mesh.position, '#00f2ff');
                    this.runVFX('shield', this.enemy.mesh.position, 0x00f2ff, 0, 1.5);
                } else {
                    this.enemy.reflectShield = 0;
                }

                // Overlord (Floor 75 - Legacy): Mana Drain
                if (this.floor >= 75 && this.floor < 90 && this.enemy.type === 'midboss') {
                    const drain = 15;
                    this.player.mana = Math.max(0, this.player.mana - drain);
                    this.showText(`-${drain} MP (DRAIN)`, this.player.mesh.position, '#ff00ff');
                }
            }

            this.endEnemyTurn();
        });
    },

    winBattle() {
        this.state = 'REWARD';

        // SEASONAL BOSS VICTORY
        if (this.savedState) {
            this.showModal("ANOMALY NEUTRALIZED", "System stability restored. \n\nREWARD: LEGENDARY CACHE", () => {
                this.giveRandomItemFromPool('legendary');
                this.restoreGameState();
            }, false);
            return;
        }

        // Floor 100 victory - trigger REBIRTH instead of ending
        if (this.floor >= 100) {
            this.triggerRebirth();
            return;
        }

        let loot = 100 + (this.floor * 50);

        // REBIRTH BONUS: Massive gold multiplier
        if (this.rebirth > 0) {
            loot = Math.floor(loot * Math.pow(3, this.rebirth)); // 3x per rebirth level
        }

        // Bonus credits perk
        if (this.player.bonusCredits > 0) {
            loot = Math.floor(loot * (1 + this.player.bonusCredits));
        }
        this.gold += loot;

        // Overkill bonus: extra credits for overkilling enemies
        if (this.player.overkillBonus > 0 && this.enemy.hp < 0) {
            const overkillCredits = Math.floor(Math.abs(this.enemy.hp) * this.player.overkillBonus * 0.1);
            if (overkillCredits > 0) {
                this.gold += overkillCredits;
                this.showText(`+${overkillCredits} OVERKILL`, this.enemy.mesh.position, '#ffe600');
            }
        }
        const enemyMesh = this.enemy.mesh;
        engine.tween(enemyMesh.scale, 'y', 0, 300, () => {
            if (enemyMesh.parent) engine.scene.remove(enemyMesh);
        });

        // Reset player position after battle
        this.resetPlayerPosition();

        // --- RANDOM ITEM DROP ---
        let dropChance = 0.05; // 5% base chance (was 12%)
        const isBoss = ['boss', 'midboss', 'architect'].includes(this.enemy.type);
        if (isBoss) dropChance = 0.25; // 25% for bosses (was 50%)

        if (Math.random() < dropChance) {
            const rnd = Math.random();
            let rarity = 'common';

            if (isBoss) {
                // Bosses drop better loot: 60% Rare, 30% Epic, 10% Legendary (ONLY on Floor 25/50/75/100)
                if (rnd > 0.90 && (this.floor % 25 === 0)) rarity = 'legendary';
                else if (rnd > 0.60) rarity = 'epic';
                else rarity = 'rare';
            } else {
                // Regular mobs: 70% Common, 22% Rare, 8% Epic, 0% Legendary
                if (rnd > 0.92) rarity = 'epic';
                else if (rnd > 0.70) rarity = 'rare';
                else rarity = 'common';
            }

            // Slight delay so the crate animation feels like a reward after the screen transition
            setTimeout(() => {
                this.giveRandomItemFromPool(rarity);
            }, 800);
        }

        this.updateUI();
        this.generatePerks();
        this.setScreen('reward-screen');
        document.getElementById('battle-controls').classList.remove('active');

        // Tutorial: After first battle, show perk selection step
        if (this.tutorialState === 'ACTIVE' && this.tutorialStep === 2) {
            this.nextTutorialStep(); // Advance to step 3 (floor progression)
        }
    },

    // --- BOSS INTRO SYSTEM ---
    triggerBossIntro(bossType, bossName) {
        const BOSS_INFO = {
            'NEON HYDRA': {
                title: "NEON HYDRA",
                desc: "A cybernetic serpent capable of rapid self-repair.",
                abilities: [
                    { name: "REGENERATION", desc: "Regains HP every turn. Burst damage is required to overwhelm its repair protocols." },
                    { name: "ACID SPRAY", desc: "Coats the player in corrosive nanites, reducing armor efficiency." }
                ]
            },
            'IRON COLOSSUS': {
                title: "IRON COLOSSUS",
                desc: "A walking fortress with impenetrable plating.",
                abilities: [
                    { name: "ARMOR PLATING", desc: "Takes 80% reduced damage until its plating is shattered. Persist until the armor breaks." },
                    { name: "SEISMIC SLAM", desc: "Deals massive damage and shakes the ground, potentially stunning stability systems." }
                ]
            },
            'VOID MOTHER': {
                title: "VOID MOTHER",
                desc: "A geometric anomaly from beyond the boundary.",
                abilities: [
                    { name: "REALITY SHIFT", desc: "Inverts the simulation's rules, causing UI distortions and input lag." },
                    { name: "FRACTAL BEAM", desc: "A beam that splits on impact, hitting multiple times." }
                ]
            },
            'CORRUPTED CORE': {
                title: "CORRUPTED CORE",
                desc: "The malfunctioning heart of Sector 4.",
                abilities: [
                    { name: "DATA GLITCH", desc: "Randomizes the mana cost of your skills. Adaptation is key." },
                    { name: "ERROR 404", desc: "Deletion beam. If your HP drops too low, execution is instant." }
                ]
            },
            'LUMINOUS PALADIN': {
                title: "LUMINOUS PALADIN",
                desc: "An ancient guardian clad in unbreaking golden plate.",
                abilities: [
                    { name: "TOWER SHIELD", desc: "Massive mitigation against physical attacks." },
                    { name: "SUN STRIKE", desc: "Channeled solar energy that bypasses armor." }
                ]
            },
            'DIVINITY SEEKER': {
                title: "DIVINITY SEEKER",
                desc: "A floating construct searching for the ultimate truth.",
                abilities: [
                    { name: "HOLY NOVA", desc: "Explosion of light that heals the caster while damaging enemies." },
                    { name: "TRUTH", desc: "A piercing gaze that reveals vulnerabilities." }
                ]
            },
            'SERAPHIM COMMANDER': {
                title: "SERAPHIM COMMANDER",
                desc: "The highest ranking angel of the Sanctum.",
                abilities: [
                    { name: "JUDGMENT", desc: "Executes targets below 40% Health instantly." },
                    { name: "SIX WINGS", desc: "Hyper-mobility allows it to dodge frequent attacks." }
                ]
            },
            'WARDEN': {
                title: "THE WARDEN",
                desc: "A heavily armored construct designed to detain intruders.",
                abilities: [
                    { name: "REACTIVE SHIELD", desc: "Projects a barrier that reflects 50% of incoming damage back to the attacker every 3rd turn. Timing your attacks is crucial." },
                    { name: "IRON CLAD", desc: "Reinforced plating grants extremely high base Armor. Heavy attacks or armor-piercing abilities are recommended." }
                ]
            },
            'EXECUTIONER': {
                title: "THE EXECUTIONER",
                desc: "A dual-axe wielding unit that grows stronger as the fight prolongs.",
                abilities: [
                    { name: "SHADOW CHARGE", desc: "Accumulates Dark Momentum whenever the player dodges an attack. At max stacks, the next hit is unblockable." },
                    { name: "GUILLOTINE", desc: "A devastating overhead swing that deals bonus execution damage if the target's HP is below 30%." }
                ]
            },
            'OVERLORD': {
                title: "THE OVERLORD",
                desc: "A psychic entity that manipulates mana and reality.",
                abilities: [
                    { name: "MANA DRAIN", desc: "Siphons MP directly from your Energy Cell each turn to fuel its own powers. Keep your mana reserves high." },
                    { name: "VOID TRAP", desc: "Manipulates space to immobilize you, skipping your turn and exposing you to a guaranteed critical hit." }
                ]
            },
            'IGRIS': {
                title: "IGRIS THE VOID COMMANDER",
                desc: "The Red Knight. An anomaly distinct from the system's logic.",
                abilities: [
                    { name: "VOID SLICE", desc: "Unleashes a flurry of dimension-cutting slashes that bypasses all Energy Shields and direct mitigation." },
                    { name: "VOID TRAP", desc: "15% chance to manifest a gravitational singularity that stuns you and deals massive trauma damage." },
                    { name: "SCREEN SLASH", desc: "A reality-distorting impact that cracks the visual feed. The interface itself becomes unstable under his blows." }
                ]
            },
            'ARCHITECT': {
                title: "THE ARCHITECT",
                desc: "The source code of the simulation.",
                abilities: [
                    { name: "REALITY BREAK", desc: "Tears the simulation fabric, dealing massive True Damage that ignores Armor and Mitigation completely." },
                    { name: "SYSTEM PURGE", desc: "Initiates a code-cleansing sequence that instantly wipes all active Buffs from the player." },
                    { name: "RECOMPILE", desc: "The Architect rewrites its own code to repair damage, regenerating a large portion of HP over time." }
                ]
            }
        };

        // Match based on Name or Type
        let info = null;
        if (bossName.includes('NEON HYDRA')) info = BOSS_INFO['NEON HYDRA'];
        else if (bossName.includes('IRON COLOSSUS')) info = BOSS_INFO['IRON COLOSSUS'];
        else if (bossName.includes('VOID MOTHER')) info = BOSS_INFO['VOID MOTHER'];
        else if (bossName.includes('CORRUPTED CORE')) info = BOSS_INFO['CORRUPTED CORE'];
        else if (bossName.includes('LUMINOUS PALADIN')) info = BOSS_INFO['LUMINOUS PALADIN'];
        else if (bossName.includes('DIVINITY SEEKER')) info = BOSS_INFO['DIVINITY SEEKER'];
        else if (bossName.includes('SERAPHIM COMMANDER')) info = BOSS_INFO['SERAPHIM COMMANDER'];
        else if (bossName.includes('WARDEN')) info = BOSS_INFO['WARDEN'];
        else if (bossName.includes('EXECUTIONER')) info = BOSS_INFO['EXECUTIONER'];
        else if (bossName.includes('OVERLORD')) info = BOSS_INFO['OVERLORD'];
        else if (bossName.includes('IGRIS')) info = BOSS_INFO['IGRIS'];
        else if (bossName.includes('ARCHITECT')) info = BOSS_INFO['ARCHITECT'];

        if (info) {
            const content = `
                <div style="text-align:center; padding:5px;">
                    <div style="font-style:italic; color:#aaa; font-size:13px; margin-bottom:10px;">"${info.desc}"</div>
                    <div style="text-align:left; border:1px solid #333; padding:8px; background:rgba(0,0,0,0.5); border-radius:4px;">
                        <div style="color:#ffaa00; font-size:11px; margin-bottom:6px; border-bottom:1px solid #444; padding-bottom:2px; font-weight:bold; letter-spacing:1px;">TACTICAL DATA</div>
                        <div style="display:grid; grid-template-columns: 1fr 1fr; gap:8px;">
                            ${info.abilities.map(a => `
                                <div style="background:rgba(255,255,255,0.05); padding:6px; border-radius:4px; border:1px solid #333;">
                                    <div style="color:#fff; font-weight:bold; font-size:13px; margin-bottom:2px; color:#00f2ff;">${a.name}</div>
                                    <div style="color:#aaa; font-size:11px; line-height:1.2;">${a.desc}</div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            `;

            // FORCE UI NAME UPDATE (Sync with Boss Info)
            document.getElementById('enemy-name').innerText = info.title;
            document.getElementById('enemy-name').style.color = "#ff0000";

            // Re-use Tutorial UI for Boss Intro
            const overlay = document.getElementById('tutorial-overlay');
            const panel = document.getElementById('tutorial-panel');

            overlay.style.display = 'block';
            panel.style.display = 'block';
            panel.style.top = '50%';
            panel.style.left = '50%';
            panel.style.transform = 'translate(-50%, -50%)';

            panel.innerHTML = `
                <div class="tutorial-title" style="color:#ffaa00; border-bottom-color:#ffaa00;">⚠ ${info.title} DETECTED</div>
                <div class="tutorial-content" style="font-style:italic; color:#ccc; font-size:16px;">"${info.desc}"</div>
                
                <div style="margin-top:15px; border-top:1px solid #333; padding-top:10px;">
                    <div style="font-size:14px; color:#ffaa00; letter-spacing:1px; margin-bottom:8px; font-weight:bold;">TACTICAL DATA</div>
                    <div style="display:grid; grid-template-columns: 1fr 1fr; gap:10px;">
                        ${info.abilities.map(a => `
                            <div style="background:rgba(255,255,255,0.05); padding:10px; border-radius:4px; border:1px solid #444;">
                                <div style="color:#00f2ff; font-weight:bold; font-size:15px; margin-bottom:4px;">${a.name}</div>
                                <div style="color:#bbb; font-size:13px; line-height:1.3;">${a.desc}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div class="tutorial-actions" style="margin-top:20px;">
                    <button class="tutorial-btn" onclick="
                        document.getElementById('tutorial-overlay').style.display='none';
                        document.getElementById('tutorial-panel').style.display='none';
                    ">ENGAGE</button>
                </div>
            `;
        }
    },
});
