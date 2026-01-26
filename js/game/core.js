const game = {
    floor: 1, gold: 0, player: null, enemy: null, state: 'IDLE',
    lastBossAiTick: 0, bossStarted: false,

    // Mouse Input
    mouseX: 0, mouseY: 0,

    // --- REBIRTH SYSTEM ---
    rebirth: 0, // Rebirth level (0 = first playthrough)
    currentMutation: null,

    // --- BUFF TRACKING ---
    buffs: {}, // { perkName: { count: N, totalValue: V, icon: '🔧', desc: 'description' } }

    // --- MUTATION POOL ---
    mutations: {
        'overclocked': { name: 'OVERCLOCKED', desc: 'All units deal +50% DMG', icon: '⚡' },
        'data_leak': { name: 'DATA LEAK', desc: 'Skills cost -50% Mana, but skills deal 5% Max HP self-dmg', icon: '💧' },
        'encryption': { name: 'ENCRYPTION', desc: 'Enemies have +100 Armor but -40% Health', icon: '🔐' },
        'feedback': { name: 'FEEDBACK LOOP', desc: 'Taking damage restores 10% Mana', icon: '🔄' },
        'glitch': { name: 'GLITCHED REALITY', desc: 'Crit Chance +20%, but Dodge -10%', icon: '👾' }
    },

    // --- BRAWLER FRENZY MASH SYSTEM ---
    frenzySkill: null, // Current frenzy skill being mashed
    frenzyMashHits: 0, // Bonus hits from mashing

    // --- IAP PREMIUM SHOP ---
    iapBoosts: {
        rareBonus: 0,      // Extra rare chance
        epicBonus: 0,      // Extra epic chance
        legendaryBonus: 0, // Extra legendary chance
        guaranteedLegendary: false, // Next perk is legendary
        boostFloors: 0,    // Floors remaining for luck boost
        reviveTokens: 0    // Number of revives available
    },

    // Add to game object properties
    dialogueQueue: [],
    isDialogueTyping: false,

    // --- STORY SYSTEM ---
    checkStoryTrigger(floor) {
        // Handle Rebirth Intro (Floor 0, Rebirth > 0)
        if (floor === 0 && this.rebirth > 0) {
            this.startCutscene([
                { s: 'SYSTEM', t: `SYSTEM REBOOTED. CYCLE COUNT: ${this.rebirth}` },
                { s: 'PLAYER', t: 'I remember... I remember everything.' },
                { s: 'ARCHITECT', t: 'You think restarting will save you? It only makes the prison stronger.' },
                { s: 'PLAYER', t: 'And it makes me stronger, too.' }
            ]);
            return true;
        }

        // Standard Story
        const key = floor;
        if (STORY_SCRIPT[key] && !this.iapBoosts.skipStory) {
            this.startCutscene(STORY_SCRIPT[key]);
            return true;
        }
        return false;
    },

    startCutscene(lines) {
        this.state = 'CUTSCENE';

        // --- FIX: NORMALIZE DIALOGUE DATA ---
        // Ensure input is always an array
        if (!Array.isArray(lines)) lines = [lines];

        this.dialogueQueue = lines.map(line => {
            // Case 1: Existing Story Format {s, t} -> Keep as is
            if (line.s && line.t) return line;

            // Case 2: Boss/New Format {name, text} -> Convert to {s, t}
            if (line.name && line.text) return { s: line.name, t: line.text };

            // Case 3: String Format "SPEAKER: Message"
            if (typeof line === 'string') {
                if (line.includes(':')) {
                    const parts = line.split(':');
                    return { s: parts[0].trim(), t: parts.slice(1).join(':').trim() };
                }
                return { s: 'SYSTEM', t: line };
            }

            // Fallback
            return { s: 'SYSTEM', t: '...' };
        });

        // --- FIX: FORCE CLOSE INTERFACES ---
        this.closeClassesViewer();
        this.closeIAPShop();

        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));

        // Hide Global Buttons
        const iapBtn = document.getElementById('iap-btn'); if (iapBtn) iapBtn.style.display = 'none';

        // --- SHOW CUTSCENE UI ---
        const overlay = document.getElementById('dialogue-overlay');
        overlay.classList.add('active');

        // Hide Combat HUD
        document.getElementById('battle-controls').classList.remove('active');
        document.getElementById('hud').style.opacity = '0';

        this.updateMutationUI(); // Hide mutation display
        this.advanceDialogue();
    },
};
Object.assign(game, {
    previousState: 'IDLE', // Store state before opening IAP shop

    // --- PROGRESSIVE SHOP DATA (Persistent) ---
    shopData: {
        heal: { level: 1, baseCost: 50, costMult: 1.5, baseVal: 50, valInc: 25 },
        atk: { level: 1, baseCost: 100, costMult: 1.4, baseVal: 5, valInc: 5 },
        hp: { level: 1, baseCost: 100, costMult: 1.4, baseVal: 30, valInc: 20 },
        mana: { level: 1, baseCost: 75, costMult: 1.3, baseVal: 20, valInc: 10 },
        // Late-game items (unlock at floor 50)
        breach: { level: 1, baseCost: 2000, costMult: 2.0, baseVal: 0.002, valInc: 0.001 }, // % max HP damage
        combo: { level: 1, baseCost: 1500, costMult: 1.8, baseVal: 0.01, valInc: 0.005 }, // Combo damage multiplier
        crit: { level: 1, baseCost: 1000, costMult: 1.6, baseVal: 0.25, valInc: 0.15 } // Crit damage
    },
    shopItems: [],

    // Combo counter for battle
    battleCombo: 0,

    // --- HELPERS (Calculates Price based on Level) ---
    getItemCost(id) {
        const item = this.shopData[id];
        // Cost = Base * (Multiplier ^ (Level - 1))
        return Math.floor(item.baseCost * Math.pow(item.costMult, item.level - 1));
    },

    getItemValue(id) {
        const item = this.shopData[id];
        if (!item) return 0;
        return item.baseVal + (item.level - 1) * item.valInc;
    },



    startSeasonalBoss() {
        if (this.state === 'SEASONAL' || this.state === 'CUTSCENE') return;

        // Save State
        this.savedState = {
            floor: this.floor,
            rebirth: this.rebirth,
            gold: this.gold,
            bg: document.body.style.background,
            playerHp: this.player.hp,
            playerMana: this.player.mana
        };

        this.state = 'SEASONAL';
        this.floor = 666; // Visual only
        engine.setFloorTheme(666); // Glitch theme?

        // Ensure UI is clear
        document.getElementById('iap-screen').classList.remove('active');
        document.getElementById('battle-controls').classList.add('active');

        // Custom Boss Spawn
        // Remove current enemy
        if (this.enemy && this.enemy.mesh) engine.scene.remove(this.enemy.mesh);

        // Spawn IGRIS THE DESTROYER
        // Unit(isPlayer, hp, maxHp, atk, color, type/name)
        this.enemy.isPlayer = false;
        const pStats = this.player;
        const eHp = 5000000000000; // 5 Trillion HP (Harder than Anomaly)
        const eAtk = pStats.maxHp * 0.5;

        this.enemy = new Unit(false, eHp, eHp, eAtk, 0xaa00ff, 'igris');
        this.enemy.name = "IGRIS THE DESTROYER";
        this.enemy.isPlayer = false;

        this.enemy.model.mesh.scale.set(3.5, 3.5, 3.5); // Giant Knight
        this.enemy.mesh.userData.baseY = 0; // Grounded

        // Special Visuals
        game.showText("⚠ VOID DETECTED ⚠", this.player.mesh.position, "#aa00ff");
        engine.addShake(1.0);
        this.updateUI();

        // Trigger Boss Intro Manual
        setTimeout(() => {
            this.triggerBossIntro('IGRIS', "IGRIS THE DESTROYER");
        }, 1000);
    },

    restoreGameState() {
        if (!this.savedState) return;

        this.floor = this.savedState.floor;
        this.rebirth = this.savedState.rebirth;
        // Keep gold earned? Yes.

        // Restore Player Health/Mana from before the fight
        if (this.savedState.playerHp !== undefined) {
            this.player.hp = Math.min(this.player.maxHp, this.savedState.playerHp);
            this.player.mana = Math.min(this.player.maxMana, this.savedState.playerMana);
        }

        this.state = 'IDLE';
        this.savedState = null;

        // Restore Theme and Enemy
        engine.setFloorTheme(this.floor);
        this.spawnEnemy(); // back to normal flow

        // Restore IAP Button
        const iapBtn = document.getElementById('iap-btn');
        if (iapBtn) iapBtn.style.display = 'flex';

        this.updateUI();
        this.spawnEnemy(); // back to normal flow
        this.updateUI();
    },

    startRun() {
        this.floor = 1; this.gold = 0;
        this.rebirth = 0; // Reset rebirth on new run
        this.buffs = {}; // Reset buffs
        this.battleCombo = 0;
        // Reset IAP boosts
        this.iapBoosts = { rareBonus: 0, epicBonus: 0, legendaryBonus: 0, guaranteedLegendary: false, boostFloors: 0, reviveTokens: 0 };
        this.resetShop();
        this.renderBuffs(); // Clear buff display
        // Reset to initial floor theme
        engine.setFloorTheme(1);
        if (this.player) engine.scene.remove(this.player.mesh);
        if (this.enemy) engine.scene.remove(this.enemy.mesh);
        this.enemy = null; // Fix: Prevent ghost enemy persisting
        this.player = new Unit(true, 200, 200, 100, 0x00f2ff);
        this.gameStarted = null;
        this.offerJobSelection(0);
        this.initTutorial();

    },

    handleDefeat() {
        // SEASONAL BOSS LOSS
        if (this.savedState) {
            this.showModal("ANOMALY PERSISTS", "The system instability remains unchecked...\n\nReturning to stable coordinates.", () => {
                this.restoreGameState();
            }, false);
            return;
        }

        this.state = 'GAMEOVER';
        const rollbackFloor = Math.max(1, this.floor - 5);

        const finalFloorEl = document.getElementById('final-floor');
        if (finalFloorEl) finalFloorEl.innerText = this.floor;

        this.setScreen('gameover-screen');
        const battleControls = document.getElementById('battle-controls');
        if (battleControls) battleControls.classList.remove('active');
    },

    retryFloor() {
        // Clear GAMEOVER state immediately
        this.state = 'IDLE';

        // Rollback current floor
        this.floor = Math.max(1, this.floor - 5);

        // Fully restore player
        this.player.hp = this.player.maxHp;
        this.player.mana = this.player.maxMana;

        // Clear all active buffs (to prevent stacking exploits)
        this.player.activeBuffs = [];
        this.buffs = {};

        // Decelerate floor so nextFloor() lands precisely on the rollback target
        this.floor--;
        this.nextFloor();

        // NO LONGER setScreen('hud') here, let processFloorEvent handle it
    },

    // Tutorial System
    tutorialStep: 0,
    tutorialState: 'INACTIVE',
    resetShop() {
        this.shopData.heal.level = 1;
        this.shopData.atk.level = 1;
        this.shopData.hp.level = 1;
        this.shopData.mana.level = 1;
        this.shopData.breach.level = 1;
        this.shopData.combo.level = 1;
        this.shopData.crit.level = 1;
    },


    useSkill(slot) {
        // BRAWLER FRENZY: Allow mashing during frenzy attacks
        if (this.state === 'FRENZY_MASH' && this.frenzySkill) {
            this.frenzyMashHits++;
            this.triggerHit(this.frenzySkill, this.frenzyMashHits, 99, 0.5);
            this.showText(`+${this.frenzyMashHits}!`, this.player.mesh.position.clone().add(new THREE.Vector3(0, 1.2, 0)), '#ff4400');
            return;
        }

        if (this.state !== 'IDLE' && this.state !== 'SEASONAL') return;

        // Resolve skill: if slot is number, get from pinnedSkills. If object, use directly.
        let skill = null;
        if (typeof slot === 'number') {
            skill = this.player.pinnedSkills[slot];
        } else {
            skill = slot;
        }

        if (!skill) return;
        const actualCost = Math.max(0, Math.floor(skill.cost * this.player.manaCostMult * (1 - this.player.manaCostReduction)));
        if (this.player.mana < actualCost) { this.showText("NO MANA", this.player.mesh.position, '#00f2ff'); return; }

        this.state = 'ANIMATING';
        this.player.mana -= actualCost;

        // --- MUTATION: DATA LEAK ---
        if (this.currentMutation === 'data_leak') {
            const selfDmg = Math.floor(this.player.maxHp * 0.05);
            this.player.hp = Math.max(1, this.player.hp - selfDmg);
            this.showText(`-${selfDmg} DATA LEAK`, this.player.mesh.position, '#ff0000');
        }

        // Handle summon skills
        if (skill.isSummon) {
            this.summonMinion(skill.summonStats);
            this.state = 'IDLE';
            this.minionTurn(); // Minions attack after player summon
            return;
        }

        // Handle buff skills
        if (skill.isBuff) {
            this.applyBuff(skill);
            engine.spawnParticles(this.player.mesh.position, skill.color, 15);
            this.showText(skill.name, this.player.mesh.position, '#ffe600');
            setTimeout(() => {
                this.state = 'IDLE';
                this.minionTurn(); // Minions attack after player buff
            }, 500);
            this.updateUI();
            this.updateButtons();
            return;
        }

        let hits = skill.hits || 1;

        // BRAWLER: Double Attack skill hits twice
        if (skill.doubleAttack) {
            hits *= 2;
        }

        let delay = 150;
        if (skill.vfx === 'gatling' || skill.vfx === 'punch') delay = 50;
        else if (hits > 40) delay = 15;
        else if (hits > 15) delay = 30;
        else if (hits > 3) delay = 80;

        // BRAWLER FRENZY: Open mash window for frenzy skills
        if (skill.isFrenzy) {
            this.state = 'FRENZY_MASH';
            this.frenzySkill = skill;
            this.frenzyMashHits = 0;
            const mashDuration = 1500; // 1.5 seconds to mash

            this.showText("MASH NOW!", this.player.mesh.position.clone().add(new THREE.Vector3(0, 1.8, 0)), '#ff4400');

            this.player.attackAnim(() => {
                // Base hits happen automatically
                for (let i = 0; i < hits; i++) {
                    setTimeout(() => { this.triggerHit(skill, i, hits, 0); }, i * delay);
                }

                // End mash window after duration
                setTimeout(() => {
                    this.state = 'ANIMATING';
                    this.frenzySkill = null;
                    const bonusHits = this.frenzyMashHits;
                    if (bonusHits > 0) {
                        this.showText(`+${bonusHits} BONUS HITS!`, this.player.mesh.position, '#ffaa00');
                    }
                    setTimeout(() => {
                        if (this.enemy.hp <= 0) this.winBattle();
                        else this.minionTurn(); // Minions attack after player attack
                    }, 300);
                }, mashDuration);
            });
        } else {
            this.player.attackAnim(() => {
                for (let i = 0; i < hits; i++) {
                    setTimeout(() => { this.triggerHit(skill, i, hits, 0); }, i * delay);
                }
                setTimeout(() => {
                    if (this.enemy.hp <= 0) this.winBattle();
                    else this.minionTurn(); // Minions attack after player attack
                }, 500 + (hits * delay));
            }, skill.stationary);
        }
        this.updateUI();
    },

    summonMinion(stats) {
        // Default max is 3, but can be increased by Perks/Skills
        const maxSummons = this.player.maxMinions || 3;

        if (this.player.minions.length >= maxSummons) {
            this.showText("MAX MINIONS", this.player.mesh.position, '#ff0000');
            return;
        }

        if (this.player.minions.length === 0) {
            // First Summon: RETREAT Player
            // Standard Pos: -2.5. Retreat Pos: -4.5
            engine.tween(this.player.mesh.position, 'x', -4.5, 300);
            this.showText("TACTICAL RETREAT", this.player.mesh.position, '#00ffaa');
        }

        // --- CALCULATE STATS ---
        let finalHp = stats.hp || 50;
        let finalAtk = stats.atk || 10;

        // Apply Multipliers if present (Scaling Logic)
        if (stats.hpMult) finalHp = Math.floor(this.player.maxHp * stats.hpMult);
        if (stats.atkMult) finalAtk = Math.floor(this.player.atk * stats.atkMult);

        // Sanity check
        finalHp = Math.max(1, finalHp);
        finalAtk = Math.max(1, finalAtk);

        // Create Minion Unit
        const minion = new Unit(true, finalHp, finalHp, finalAtk, stats.color, 'humanoid');
        minion.name = stats.name;
        minion.isMinion = true;
        minion.baseAtk = finalAtk;

        // Store Scaling Multipliers for Dynamic Updates
        if (stats.atkMult) minion.scalingAtkMult = stats.atkMult;

        // Position Logic: DYNAMIC ARMY FORMATION
        // Slot 0-2: Vanguard Triangle
        // Slot 3-4: Flankers
        // Slot 5+: The Legion (Grid Formation behind)

        // Find first available slot
        const takenSlots = this.player.minions.map(m => m.slotIndex);
        let slotIndex = 0;
        let found = false;
        while (!found) {
            if (!takenSlots.includes(slotIndex)) found = true;
            else slotIndex++;
        }

        minion.slotIndex = slotIndex;

        let xPos = -2.0;
        let zPos = 0;

        if (slotIndex === 0) { xPos = -2.0; zPos = 0; } // Front Point
        else if (slotIndex === 1) { xPos = -3.0; zPos = -1.5; } // Top Flank
        else if (slotIndex === 2) { xPos = -3.0; zPos = 1.5; } // Bot Flank
        else if (slotIndex === 3) { xPos = -4.0; zPos = -0.8; } // Rear Top
        else if (slotIndex === 4) { xPos = -4.0; zPos = 0.8; } // Rear Bot
        else {
            // ARMY GRID (Slot 5+)
            // Start further back (Player is at -4.5 usually)
            // Rows of 3, starting at x = -5.5
            const armyIndex = slotIndex - 5;
            const row = Math.floor(armyIndex / 3);
            const col = armyIndex % 3;

            xPos = -5.5 - (row * 1.0); // Move back 1 unit per row

            // Spread columns centered around 0
            // 0 -> Top, 1 -> Center, 2 -> Bottom? Or:
            // Let's do: -1.5, 0, 1.5
            if (col === 0) zPos = -1.5;
            if (col === 1) zPos = 0;
            if (col === 2) zPos = 1.5;
        }

        // Animate Spawn: Fall from sky or pop in
        minion.mesh.position.set(xPos, 5, zPos); // Start high
        engine.tween(minion.mesh.position, 'y', 0, 400); // Drop down

        minion.mesh.scale.set(0.9, 0.9, 0.9); // Slightly smaller

        // Visual Spawn
        engine.spawnParticles(minion.mesh.position, stats.color, 20);
        this.showText("SUMMON!", minion.mesh.position, stats.color);

        this.player.minions.push(minion);
        minion.createHealthBar();
    },

    resetPlayerPosition() {
        if (!this.player || !this.player.mesh) return;

        // If minions exist, player stays in backline!
        const targetX = (this.player.minions && this.player.minions.length > 0) ? -4.5 : -2.5;

        if (this.player.minions && this.player.minions.length > 0) {
            // FIX: If minions exist, player starts in backline
            // If Army is large (5+), Player might need to be even further back?
            // Or Player stands in the middle of them?
            // Let's keep Player at -4.5 (Commander Position)
            // The Army starts at -5.5, so they are behind the player. Good.
            this.player.mesh.position.set(-4.5, this.player.mesh.userData.baseY || 0, 0);

            // RESET MINION POSITIONS
            this.repositionMinions();
        } else {
            this.player.mesh.position.set(-2.5, this.player.mesh.userData.baseY || 0, 0);
        }
        this.player.mesh.rotation.y = Math.PI / 2;
    },

    repositionMinions() {
        if (!this.player || !this.player.minions) return;

        this.player.minions.forEach(minion => {
            const slotIndex = minion.slotIndex;
            let xPos = -2.0;
            let zPos = 0;

            if (slotIndex === 0) { xPos = -2.0; zPos = 0; } // Front Point
            else if (slotIndex === 1) { xPos = -3.0; zPos = -1.5; } // Top Flank
            else if (slotIndex === 2) { xPos = -3.0; zPos = 1.5; } // Bot Flank
            else if (slotIndex === 3) { xPos = -4.0; zPos = -0.8; } // Rear Top
            else if (slotIndex === 4) { xPos = -4.0; zPos = 0.8; } // Rear Bot
            else {
                // ARMY GRID (Slot 5+)
                const armyIndex = slotIndex - 5;
                const row = Math.floor(armyIndex / 3);
                const col = armyIndex % 3;

                xPos = -5.5 - (row * 1.0); // Move back 1 unit per row
                // Spread columns centered around 0
                if (col === 0) zPos = -1.5;
                if (col === 1) zPos = 0;
                if (col === 2) zPos = 1.5;
            }

            // Snap to position
            if (minion.mesh) {
                minion.mesh.position.set(xPos, 0, zPos);
            }
        });
    },

    // CHEAT / IAP
    unlockMaxSummons() {
        this.player.maxMinions = 99;
        this.showText("ARMY UNLOCKED!", this.player.mesh.position, '#ffd700');
        this.showModal("DEV MODE", "MAX SUMMONS SET TO 99. GO NUTS.");
    },

    updateMinionBars() {
        if (!this.player || !this.player.minions) return;
        this.player.minions.forEach(minion => {
            if (minion.updateHealthBarPosition) minion.updateHealthBarPosition();
        });
    },

    minionTurn() {
        if (!this.player.minions || this.player.minions.length === 0) {
            this.enemyTurn();
            return;
        }

        let delayTotal = 0;
        // SPEED UPDATE: Fire almost simultaneously (Machine Gun style)
        const stagger = 100; // 100ms instead of 400ms

        this.player.minions.forEach((minion, i) => {
            setTimeout(() => {
                if (minion.hp > 0 && this.enemy && this.enemy.hp > 0) {
                    minion.attackAnim(() => {
                        // Dynamic Damage Update (Buff Sharing)
                        if (minion.scalingAtkMult) {
                            minion.atk = Math.floor(this.player.atk * minion.scalingAtkMult);
                        }

                        // Prevent 0 damage
                        minion.atk = Math.max(1, minion.atk);

                        const rawDmg = minion.atk;
                        const actualDmg = this.enemy.takeDmg(rawDmg);

                        // CRITICAL FIX: Update UI immediately so HB drops
                        this.updateUI();

                        // Visual Fix: Offset Text
                        const offset = { x: (Math.random() - 0.5) * 1.5, y: (Math.random() * 1.0) };
                        const tPos = new THREE.Vector3(
                            this.enemy.mesh.position.x + offset.x,
                            this.enemy.mesh.position.y + offset.y,
                            this.enemy.mesh.position.z
                        );

                        // Show ACTUAL damage (post-mitigation)
                        if (actualDmg > 0) this.showText(actualDmg, tPos, '#ffffff');
                        engine.spawnParticles(this.enemy.mesh.position, 0xffffff, 3);
                    });
                }
            }, i * stagger);
            delayTotal = i * stagger;
        });

        // Pass turn to enemy after minions are done (plus a small buffer)
        setTimeout(() => {
            if (this.enemy.hp <= 0) this.winBattle();
            else this.enemyTurn();
        }, delayTotal + 800);
    },

    applyBuff(skill) {
        const p = this.player;
        const type = skill.buffType;
        const val = skill.buffVal; // Now treats this as decimal (e.g. 0.20 for 20%)
        const dur = skill.duration;

        // Initialize active buffs array if needed
        if (!p.activeBuffs) p.activeBuffs = [];

        // Store original values for reverting
        const buff = { type, val, duration: dur, name: skill.name, color: skill.color };

        // Apply the buff based on type
        if (type === 'crit') { p.critChance += val; buff.revert = () => p.critChance -= val; }
        else if (type === 'dodge') { p.dodge += val; buff.revert = () => p.dodge -= val; }
        else if (type === 'doubleStrike') { p.doubleStrike += val; buff.revert = () => p.doubleStrike -= val; }
        else if (type === 'lifesteal') { p.lifesteal += val; buff.revert = () => p.lifesteal -= val; }
        else if (type === 'atk') {
            p.atkMult += val;
            p.recalculateStats();
            buff.revert = () => { p.atkMult -= val; p.recalculateStats(); };
        }
        else if (type === 'armor') {
            p.armorMult += val;
            p.recalculateStats();
            buff.revert = () => { p.armorMult -= val; p.recalculateStats(); };
        }
        else if (type === 'manaRegen') {
            p.manaRegenMult += val;
            p.recalculateStats();
            buff.revert = () => { p.manaRegenMult -= val; p.recalculateStats(); };
        }
        else if (type === 'critDamage') { p.critDamage += val; buff.revert = () => p.critDamage -= val; }
        else if (type === 'thorns') { p.thorns += val; buff.revert = () => p.thorns -= val; }
        else if (type === 'shield') {
            // Shield is % of Max HP
            const shieldVal = Math.floor(p.maxHp * val);
            p.shield += shieldVal;
            p.maxShield = Math.max(p.maxShield, p.shield);
            buff.revert = () => { };
        }
        else if (type === 'regen') {
            // Regen is % of Max HP per turn
            buff.healPerTurn = Math.floor(p.maxHp * val);
            buff.revert = () => { };
        }
        else if (type === 'invincible') { p.invincible = true; buff.revert = () => p.invincible = false; }
        else if (type === 'all_offense') {
            p.critChance += val; p.critDamage += val; p.atkMult += val;
            p.recalculateStats();
            buff.revert = () => { p.critChance -= val; p.critDamage -= val; p.atkMult -= val; p.recalculateStats(); };
        }
        else if (type === 'all_defense') {
            p.armorMult += val; p.dodge += val;
            p.recalculateStats();
            buff.revert = () => { p.armorMult -= val; p.dodge -= val; p.recalculateStats(); };
        }

        p.activeBuffs.push(buff);
    },

    tickBuffs() {
        if (!this.player.activeBuffs) return;

        // Process heal-over-time buffs
        this.player.activeBuffs.forEach(buff => {
            if (buff.healPerTurn) {
                this.player.hp = Math.min(this.player.maxHp, this.player.hp + buff.healPerTurn);
                this.showText(`+${buff.healPerTurn} HP`, this.player.mesh.position, '#00ff00');
            }
        });

        // Decrement durations and remove expired buffs
        this.player.activeBuffs = this.player.activeBuffs.filter(buff => {
            buff.duration--;
            if (buff.duration <= 0) {
                buff.revert();
                this.showText(`${buff.name} ENDED`, this.player.mesh.position, '#888');
                return false;
            }
            return true;
        });

        this.updateUI();
    },

    clearAllBuffs() {
        if (!this.player || !this.player.activeBuffs) return;
        this.player.activeBuffs.forEach(buff => {
            if (buff.revert) buff.revert();
        });
        this.player.activeBuffs = [];
        this.player.shield = 0;
        this.updateUI();
    },

    triggerHit(skill, index, totalHits, frenzyBonus = 0) {
        let isCrit = Math.random() < this.player.critChance;
        const critMult = this.player.critDamage;
        let raw = Math.floor(this.player.atk * skill.mult * (isCrit ? critMult : 1));

        // BRAWLER: Apply frenzy bonus (click speed)
        raw = Math.floor(raw * (1 + frenzyBonus));

        // --- NEW: BOSS/PLAYER MECHANICS (Executioner charges) ---
        if (this.shadowCharges > 0) {
            const chargeBonus = this.shadowCharges * 0.5; // 50% per charge
            raw = Math.floor(raw * (1 + chargeBonus));
            game.showText(`SHADOW STRIKE!`, this.mesh.position, '#8800ff');
            this.shadowCharges = 0; // Consume all
        }

        // Show frenzy bonus text on first hit
        if (frenzyBonus > 0 && index === 0) {
            const frenzyPct = Math.floor(frenzyBonus * 100);
            this.showText(`FRENZY +${frenzyPct}%!`, this.player.mesh.position.clone().add(new THREE.Vector3(0, 1.5, 0)), '#ff4400');
        }

        // COMBO SYSTEM: Each hit in battle increases damage
        this.battleCombo = (this.battleCombo || 0) + 1;
        const comboBonus = 1 + (this.battleCombo * (this.player.comboMult || 0.01));
        raw = Math.floor(raw * comboBonus);

        // Show combo milestones
        if (this.battleCombo === 10) this.showText("10 COMBO!", this.player.mesh.position, '#ffaa00');
        else if (this.battleCombo === 25) this.showText("25 COMBO!", this.player.mesh.position, '#ff5500');
        else if (this.battleCombo === 50) this.showText("50 COMBO!", this.player.mesh.position, '#ff0000');
        else if (this.battleCombo === 100) this.showText("100 COMBO!!", this.player.mesh.position, '#ff00ff');

        // --- NEW: BOSS/COMBAT POLISH (Crits) ---
        if (isCrit) {
            engine.hitStop(50); // Small pause for impact
            engine.addShake(0.2);
        }

        // % MAX HP DAMAGE (Breach) - helps against tanky enemies
        if (this.player.breachDamage > 0) {
            const breachDmg = Math.floor(this.enemy.maxHp * this.player.breachDamage);
            raw += breachDmg;
        }

        // Execute bonus: deal extra damage to low HP enemies
        if (this.player.executeThreshold > 0 && (this.enemy.hp / this.enemy.maxHp) <= this.player.executeThreshold) {
            raw = Math.floor(raw * 1.5);
            this.showText("EXECUTE!", this.enemy.mesh.position.clone().add(new THREE.Vector3(0, 1.2, 0)), '#ff0000');
        }

        if (skill.heal) this.player.hp = Math.min(this.player.maxHp, this.player.hp + (skill.heal / totalHits));
        if (skill.healPercent) this.player.hp = Math.min(this.player.maxHp, this.player.hp + (this.player.maxHp * skill.healPercent / totalHits));
        if (skill.manaGain) this.player.mana = Math.min(this.player.maxMana, this.player.mana + (skill.manaGain / totalHits));
        if (skill.manaGainPercent) this.player.mana = Math.min(this.player.maxMana, this.player.mana + (this.player.maxMana * skill.manaGainPercent / totalHits));
        if (this.player.lifesteal > 0) {
            const ls = Math.floor(raw * this.player.lifesteal);
            if (ls > 0) this.player.hp = Math.min(this.player.maxHp, this.player.hp + ls);
        }

        const actualDmg = this.enemy.takeDmg(raw);
        if (actualDmg > 0) this.showText(actualDmg, this.enemy.mesh.position, '#ffffff');

        // Screen Slash Removed for Player Hits
        // User requested: "igris getting hit no need slash"
        // This keeps the Igris fight clean from constant screen slashes.

        // --- WEAPON EFFECTS ---
        if (this.player.gear.weapon && this.player.gear.weapon.onHit) {
            this.player.gear.weapon.onHit(this.player, this.enemy);
        }

        // Double Strike chance
        if (this.player.doubleStrike > 0 && Math.random() < this.player.doubleStrike) {
            const bonusDmg = Math.floor(raw * 0.5);
            setTimeout(() => {
                this.enemy.takeDmg(bonusDmg);
                this.showText(`${bonusDmg} x2`, this.enemy.mesh.position, '#00ffaa');
                engine.spawnParticles(this.enemy.mesh.position, 0x00ffaa, 3);
            }, 100);
        }

        if (isCrit) {
            const critPos = this.enemy.mesh.position.clone();
            critPos.y += 0.8; critPos.x += (Math.random() - 0.5) * 0.5;
            this.showText("CRIT!", critPos, '#ffaa00');
        }

        this.updateUI();
        const pos = this.enemy.mesh.position.clone();
        pos.y += 1.0; // Aim at center/chest, not feet
        this.runVFX(skill.vfx, pos, skill.color, index, totalHits);
    },

    updateGearUI() {
        const slots = ['weapon', 'accessory'];
        slots.forEach(type => {
            const item = this.player.gear[type];
            const el = document.getElementById(`slot-${type}`);

            if (item) {
                el.className = `gear-slot equipped ${item.rarity}`;
                el.innerHTML = `<div class="gear-icon">${type === 'weapon' ? '⚔️' : '💍'}</div><div class="gear-name">${item.name}</div>`;
            } else {
                el.className = 'gear-slot';
                el.innerHTML = `<div class="gear-icon">${type === 'weapon' ? '⚔️' : '💍'}</div><div class="gear-empty">EMPTY</div>`;
            }
        });
    },

    // Optional: Just a text popup for now
    showGearTooltip(type) {
        // Instead of a weak tooltip, let's open the full inventory!
        this.openInventory();
    },

    // Debug helper to give yourself items
    testEquip() {
        // Give a random weapon
        const w = ITEMS.WEAPONS[Math.floor(Math.random() * ITEMS.WEAPONS.length)];
        this.player.equip(w);

        // Give a random accessory
        const a = ITEMS.ACCESSORIES[Math.floor(Math.random() * ITEMS.ACCESSORIES.length)];
        this.player.equip(a);
    },
    nextFloor() {
        if (this.floor > 100) return;
        this.floor++;

        // Ensure IAP button is visible
        const iapBtn = document.getElementById('iap-btn');
        if (iapBtn) iapBtn.style.display = 'flex';

        // Update floor theme every 5 floors
        if (this.floor % 5 === 0 || this.floor === 1) {
            const themeName = engine.setFloorTheme(this.floor);
            this.showText(themeName, new THREE.Vector3(0, 3, 0), '#ff0055');

            // Rebirth: Roll Mutation every 5 floors
            if (this.rebirth > 0 && this.floor % 5 === 0) {
                this.rollMutation();
            }
        }

        // Decrement IAP luck boost floors
        if (this.iapBoosts && this.iapBoosts.boostFloors > 0) {
            this.iapBoosts.boostFloors--;
            if (this.iapBoosts.boostFloors === 0) {
                this.iapBoosts.rareBonus = 0;
                this.iapBoosts.epicBonus = 0;
                this.iapBoosts.legendaryBonus = 0;
            }
        }

        // Awakening Event (Floor 50)
        if (this.floor === 50 && !this.player.awakened) {
            this.triggerAwakening();
            return;
        }

        // DELEGATE TO MANAGER
        this.processFloorEvent(false);
    },
    // --- NEW EVENT MANAGER ---
    processFloorEvent(ignoreStory = false, ignoreSpawn = false) {
        // 1. SPAWN ENEMY FIRST (So they are visible during story/selection)
        if (!ignoreSpawn) {
            this.spawnEnemy();
        }

        // 2. CHECK STORY (High Priority)
        if (!ignoreStory && this.checkStoryTrigger(this.floor)) {
            return; // Stop here, let the cutscene play.
        }

        // 3. CHECK JOB SELECTION (Medium Priority)
        if (this.floor % 10 === 0 && this.floor <= 90) {
            const nextTier = this.floor / 10;
            // Only offer if it's an upgrade
            if (this.player.jobTier < nextTier) {
                this.offerJobSelection(nextTier);
                return;
            }
        }

        // 3. SPAWN ENEMY (Default)
        // FIX: Force state to IDLE so buttons work!
        this.state = 'IDLE';

        this.setScreen('hud');
        document.getElementById('battle-controls').classList.add('active');
        engine.focusCamera(null);
        this.updateButtons();
        this.updateUI();

    },

    // --- AWAKENING SYSTEM (Floor 50) ---
    triggerAwakening() {
        this.player.awakened = true;

        // Resource refill
        this.player.hp = this.player.maxHp;
        this.player.mana = this.player.maxMana;

        // Show awakening screen
        this.setScreen('awakening-screen');
    },

    completeAwakening() {
        this.showText("AWAKENED!", this.player.mesh.position, '#ffd700');
        engine.spawnShockwave(this.player.mesh.position, 0xffd700, 5);
        engine.addShake(0.5);

        // Continue to floor 50
        this.state = 'IDLE';
        this.setScreen('hud');
        document.getElementById('battle-controls').classList.add('active');
        this.spawnEnemy();
        this.updateButtons();
        this.updateUI();
    },

    // --- NAVIGATION TO SHOP ---
    goToShop() {
        // Tutorial: Advance to step 5 (rebirth mechanic) when going to shop
        if (this.tutorialState === 'ACTIVE' && this.tutorialStep === 4) {
            this.nextTutorialStep();
        }

        const iapBtn = document.getElementById('iap-btn');
        if (iapBtn) iapBtn.style.display = 'none';

        this.setScreen('shop-screen');
        this.prepShopItems();
        this.generateShop();
        this.updateUI();
    },

    prepShopItems() {
        this.shopItems = [];
        const pool = ['common', 'rare', 'epic', 'legendary'];
        // Rarity chances (Total = 1.0)
        let weights = [0.85, 0.15, 0, 0];
        if (this.floor > 15) weights = [0.4, 0.5, 0.1, 0];
        if (this.floor > 50) weights = [0, 0.4, 0.5, 0.1];
        if (this.floor > 100) weights = [0, 0, 0.6, 0.4];

        const getRandomRarity = () => {
            const r = Math.random();
            let acc = 0;
            for (let i = 0; i < pool.length; i++) {
                acc += weights[i];
                if (r < acc) return pool[i];
            }
            return 'common';
        };

        const getItemPrice = (rarity) => {
            const basePrices = { common: 800, rare: 3000, epic: 12000, legendary: 50000 };
            const scale = 1 + (this.floor * 0.05);
            return Math.floor((basePrices[rarity] || 1000) * scale);
        };

        // Pick 4 items for a full shelf
        for (let i = 0; i < 4; i++) {
            const rarity = getRandomRarity();
            const types = ['WEAPONS', 'ACCESSORIES'];
            const type = (i < 2) ? 'WEAPONS' : ((i === 2) ? 'ACCESSORIES' : types[Math.floor(Math.random() * 2)]);

            const itemPool = ITEMS[type].filter(it => it.rarity === rarity);
            if (itemPool.length > 0) {
                const template = itemPool[Math.floor(Math.random() * itemPool.length)];
                this.shopItems.push({
                    ...template,
                    price: getItemPrice(rarity),
                    source: type,
                    sold: false
                });
            }
        }
    },

});

// --- GLOBAL INPUT TRACKING ---
document.addEventListener('mousemove', (e) => {
    if (typeof game !== 'undefined') {
        game.mouseX = (e.clientX / window.innerWidth) * 2 - 1;
        game.mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    }
});
