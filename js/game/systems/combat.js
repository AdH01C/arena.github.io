Object.assign(game, {
    spawnEnemy() {
        if (this.enemy) engine.scene.remove(this.enemy.mesh);
        this.battleCombo = 0;
        this.clearAllBuffs(); // FRESH START
        this.bossStarted = false; // Reset boss AI gate

        const isFinalBoss = (this.floor >= 100);
        const isMidBoss = (this.floor === 25 || this.floor === 50 || this.floor === 75);
        const isFloorBoss = (this.floor % 5 === 0 && !isFinalBoss && !isMidBoss);

        let hp, atk;

        // --- THE "GOLDEN RATIO" SCALING (1.13) ---
        // Floor 1:   200 HP
        // Floor 50:  90,000 HP
        // Floor 75:  3,800,000 HP  <-- Perfect for your 2M hits (2 hits to kill)
        // Floor 99:  70,000,000 HP <-- Tough, but not a chore
        const difficultyScale = this.floor + (this.rebirth * 50);

        if (this.floor <= 50) {
            hp = Math.floor(200 * Math.pow(1.13, difficultyScale));
            atk = Math.floor(10 * Math.pow(1.085, difficultyScale));
        } else {
            // STEAPER POST-50 SCALING
            // Calculate Floor 50 base for continuity
            const scaleAt50 = 50 + (this.rebirth * 50);
            const hpAt50 = 200 * Math.pow(1.13, scaleAt50);
            const atkAt50 = 10 * Math.pow(1.085, scaleAt50);

            const extraFloors = this.floor - 50;
            hp = Math.floor(hpAt50 * Math.pow(1.18, extraFloors));
            atk = Math.floor(atkAt50 * Math.pow(1.12, extraFloors));
        }

        // Rebirth Multiplier (Stacked on top of base scale)
        if (this.rebirth > 0) {
            hp = Math.floor(hp * Math.pow(2.8, this.rebirth));
            atk = Math.floor(atk * Math.pow(1.6, this.rebirth));
        }

        if (isFinalBoss) {
            this.bossPhase = 1; // <--- NEW TRACKER

            // Phase 1: The "Avatar" (Weaker version)
            // MASSIVE BUFF: 2.5B Base HP / 8x Multiplier per rebirth
            hp = 2500000000 * Math.pow(8, this.rebirth);
            atk = 450000 * Math.pow(2.5, this.rebirth);

            document.getElementById('enemy-name').innerText = `THE ARCHITECT (AVATAR)`;
            document.getElementById('enemy-name').style.color = '#ffd700';
            this.enemy = new Unit(false, hp, hp, atk, 0xffd700, 'architect');
            this.enemy.mitigation = 0.4;
        }
        else if (isMidBoss) {
            hp *= 18; // Tanky mid-bosses (was 10x)
            atk *= 3.5; // (was 2.5x)
            const names = { 25: "WARDEN", 50: "EXECUTIONER", 75: "OVERLORD" };
            const variants = { 25: 0, 50: 1, 75: 2 };
            document.getElementById('enemy-name').innerText = `${names[this.floor]}`;
            document.getElementById('enemy-name').style.color = '#ff5500';
            this.enemy = new Unit(false, hp, hp, atk, '#ff5500', 'midboss', variants[this.floor]);
        }
        else if (isFloorBoss) {
            hp *= 8.0; // (was 5.0x)
            atk *= 2.5; // (was 2.0x)
            document.getElementById('enemy-name').innerText = `SECTOR BOSS - ${this.floor}`;
            document.getElementById('enemy-name').style.color = '#ff0000';
            this.enemy = new Unit(false, hp, hp, atk, '#ff0000', 'boss');
        }
        else {
            // Apply Mutation Scaling
            if (this.currentMutation === 'encryption') {
                hp = Math.floor(hp * 0.6);
            }
            const enemyTypes = ['drone', 'sentinel', 'construct', 'tank', 'spider', 'wraith', 'floater'];
            const type = enemyTypes[this.floor % enemyTypes.length];
            document.getElementById('enemy-name').innerText = `${type.toUpperCase()} - F${this.floor}`;
            document.getElementById('enemy-name').style.color = '#aaa';
            const color = new THREE.Color().setHSL(Math.random(), 0.8, 0.5);
            this.enemy = new Unit(false, hp, hp, atk, color, type);
        }

        // Apply Mutation Instance Effects
        if (this.currentMutation === 'encryption' && this.enemy) {
            this.enemy.baseArmor += 100;
            this.enemy.recalculateStats();
        }

        // --- STATS ---
        this.enemy.baseArmor = this.floor * 5; // Armor helps trash mobs survive rapid weak hits
        this.enemy.armor = this.enemy.baseArmor;
        this.enemy.critChance = Math.min(0.20, this.floor * 0.002);
        if (this.floor > 10) this.enemy.dodge = Math.min(0.15, (this.floor - 10) * 0.002);

        const targetY = this.enemy.mesh.userData.baseY;
        this.enemy.mesh.position.y = 10;
        engine.tween(this.enemy.mesh.position, 'y', targetY, 800);
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
    },

    enemyTurn() {
        if (this.floor >= 100) this.bossStarted = true;

        this.enemy.attackAnim(() => {
            let dmg = Math.floor(this.enemy.atk * (0.8 + Math.random() * 0.4));
            let isSpecial = false;

            // --- BOSS SPECIAL ATTACK (Every 3 turns) ---
            if (['boss', 'midboss', 'architect'].includes(this.enemy.type)) {
                this.enemy.turnCount = (this.enemy.turnCount || 0) + 1;
                if (this.enemy.turnCount % 3 === 0) {
                    dmg *= 2;
                    isSpecial = true;
                    engine.addShake(0.6);
                    this.showText("CRITICAL ERROR!", this.player.mesh.position, "#ff0000");
                }
            }

            this.player.takeDmg(dmg);
            this.showText(dmg, this.player.mesh.position, isSpecial ? '#ff0000' : '#ff0055');
            engine.addShake(isSpecial ? 0.3 : 0.1);

            if (this.enemy.type === 'architect') {
                const attacks = ['god_beam', 'blackhole', 'matrix', 'nuke'];
                const vfx = attacks[Math.floor(Math.random() * attacks.length)];
                this.runVFX(vfx, this.player.mesh.position, 0xff0000, 0, isSpecial ? 1.5 : 1);
            } else if (this.enemy.type === 'boss' || this.enemy.type === 'midboss') {
                this.runVFX(isSpecial ? 'nuke' : 'heavy', this.player.mesh.position, 0xff5500, 0, isSpecial ? 1.2 : 1);
            } else {
                engine.spawnParticles(this.player.mesh.position, 0xffaa00, 5);
            }

            // --- NEW: BOSS MECHANICS ---
            if (this.enemy.isRaging || this.enemy.type === 'midboss') {
                this.enemy.turnCount = (this.enemy.turnCount || 0) + 1;

                // Warden (Floor 25): Reactive Shield every 3 turns
                if (this.floor >= 25 && this.floor < 40 && this.enemy.turnCount % 3 === 0) {
                    this.enemy.reflectShield = 0.5; // Reflect 50%
                    this.showText("REACTIVE SHIELD ACTIVE", this.enemy.mesh.position, '#00f2ff');
                    this.runVFX('shield', this.enemy.mesh.position, 0x00f2ff, 0, 1.5);
                } else {
                    this.enemy.reflectShield = 0;
                }

                // Overlord (Floor 75): Mana Drain
                if (this.floor >= 75 && this.floor < 90) {
                    const drain = 15;
                    this.player.mana = Math.max(0, this.player.mana - drain);
                    this.showText(`-${drain} MP (DRAIN)`, this.player.mesh.position, '#ff00ff');
                }
            }

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
});
