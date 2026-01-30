class Unit {
    constructor(isPlayer, hp, maxHp, atk, color, type = 'walker', variant = 0) {
        this.isPlayer = isPlayer;
        this.type = type;

        // Base values (before multipliers)
        this.baseMaxHp = maxHp;
        this.baseAtk = atk;
        this.baseMaxMana = isPlayer ? 50 : 100;
        this.baseArmor = 0;
        this.baseManaRegen = 5;

        // Multipliers (0.2 = +20%)
        this.hpMult = 0;
        this.atkMult = 0;
        this.manaMult = 0;
        this.armorMult = 0;
        this.manaRegenMult = 0;

        // Final calculated values
        this.maxHp = maxHp;
        this.hp = hp;
        this.atk = atk;
        this.maxMana = this.baseMaxMana;
        this.mana = this.maxMana;
        this.manaRegen = this.baseManaRegen;
        this.armor = 0;
        this.mitigation = 0; // % Damage Reduction (0.0 - 1.0)
        this.tenacity = 0;   // Max Damage Cap (% of Max HP, e.g. 0.35)

        this.critChance = 0.05; this.critDamage = 1.5; this.lifesteal = 0; this.jobType = null; this.jobTier = 0;
        this.dodge = 0; this.thorns = 0; this.doubleStrike = 0; this.manaCostReduction = 0;
        this.executeThreshold = 0; this.overkillBonus = 0; this.shield = 0; this.maxShield = 0; this.bonusCredits = 0;
        this.activeBuffs = []; this.invincible = false;
        this.manaCostMult = 1.0; // Added for corrupted penalties

        // Phase/Boss Mechanics
        this.phase = 1;
        this.maxPhase = 2;
        this.isRaging = false;
        this.reflectShield = 0; // % DMG reflected
        this.shadowCharges = 0; // Executioner charges
        this.turnCount = 0;

        // --- NEW: SKILL SYSTEM ---
        this.unlockedSkills = []; // Stores all known skills
        this.pinnedSkills = [null, null, null, null, null, null]; // Stores the 6 active skills in slots
        this.minions = []; // Summoned units act as shields and attackers
        this.maxMinions = 1; // Default max is 1 (User Request)
        this.isMinion = false;
        // -------------------------

        // --- NEW: GEAR SYSTEM ---
        // --- NEW: GEAR SYSTEM ---
        this.gear = { weapon: null, accessory: null };
        this.inventory = [];
        // ------------------------
        // ------------------------

        // Late-game scaling stats
        this.comboMult = 0.01; // Damage increase per combo hit (1% base)
        this.breachDamage = 0; // % of enemy max HP dealt as bonus damage
        this.awakened = false; // Unlocked at floor 50

        // Create model based on type
        this.visualSeed = Math.random() * 1000;
        if (type === 'minion') this.model = Models.createMinion(color, 1.2, this.visualSeed, variant);
        else if (isPlayer) this.model = Models.createHumanoid(color, 1.5);
        else if (type === 'architect') this.model = Models.createArchitect(2.5);
        else if (type === 'midboss') this.model = Models.createMidBoss(color, 2.2, variant);
        else if (type === 'boss') this.model = Models.createBoss(color, 2.0);
        else if (type === 'neonHydra') this.model = Models.createNeonHydra(color, 2.5);
        else if (type === 'ironColossus') this.model = Models.createIronColossus(color, 2.8);
        else if (type === 'voidMother') this.model = Models.createVoidMother(color, 2.5);
        else if (type === 'corruptedCore') this.model = Models.createCorruptedCore(color, 2.5);
        else if (type === 'igris') this.model = Models.createIgris(2.5);

        // --- MINI-BOSSES ---
        else if (type === 'rat') this.model = Models.createRat(color, 1.0);
        else if (type === 'bioSoldier') this.model = Models.createBioSoldier(color, 1.4);
        else if (type === 'cyborg') this.model = Models.createCyborg(color, 1.5);
        else if (type === 'gatlingBot') this.model = Models.createGatlingBot(color, 1.6);
        else if (type === 'missileWalker') this.model = Models.createMissileWalker(color, 1.8);
        else if (type === 'dreadnought') this.model = Models.createDreadnought(color, 2.0);
        else if (type === 'nullSphere') this.model = Models.createNullSphere(color, 1.5);
        else if (type === 'doppelganger') this.model = Models.createDoppelganger(color, 1.5);
        else if (type === 'nightmare') this.model = Models.createNightmare(color, 1.8);
        else if (type === 'glitchWarrior') this.model = Models.createGlitchWarrior(color, 1.5);
        else if (type === 'logicVirus') this.model = Models.createLogicVirus(color, 1.5);
        else if (type === 'fatalException') this.model = Models.createFatalException(color, 1.8);

        else if (type === 'drone') this.model = Models.createDrone(color, 1.3);
        else if (type === 'sentinel') this.model = Models.createSentinel(color, 1.4);
        else if (type === 'tank') this.model = Models.createTank(color, 1.5);
        else if (type === 'spider') this.model = Models.createSpider(color, 1.4);
        else if (type === 'floater') this.model = Models.createFloater(color, 1.3);
        else if (type === 'mutant') this.model = Models.createMutant(color, 1.5);
        else if (type === 'mech') this.model = Models.createMech(color, 1.5);
        else if (type === 'voidEntity') this.model = Models.createVoidEntity(color, 1.5);
        else if (type === 'glitchEntity') this.model = Models.createGlitchEntity(color, 1.5);

        // Celestial Variants
        else if (type === 'celestial_knight') this.model = Models.createCelestialVariant(color, 'knight', 1.8);
        else if (type === 'celestial_ronin') this.model = Models.createCelestialVariant(color, 'ronin', 1.8);
        else if (type === 'celestial_priest') this.model = Models.createCelestialVariant(color, 'priest', 1.8);
        else if (type === 'celestial_summoner') this.model = Models.createCelestialVariant(color, 'summoner', 1.8);
        else if (type === 'celestial') this.model = Models.createCelestial(color, 2.0); // Keep base just in case

        // Sanctum Bosses
        else if (type === 'luminousPaladin') this.model = Models.createLuminousPaladin(color, 2.5);
        else if (type === 'divinitySeeker') this.model = Models.createDivinitySeeker(color, 2.2);
        else if (type === 'seraphimCommander') this.model = Models.createSeraphimCommander(color, 2.5);

        else this.model = Models.createHumanoid(color, 1.5);

        this.mesh = this.model.mesh;
        this.mesh.position.set(isPlayer ? -2.5 : 2.5, 0, 0);
        this.mesh.rotation.y = isPlayer ? Math.PI / 2 : -Math.PI / 2;

        // Set base Y (floating enemies)
        const floatingTypes = ['drone', 'boss', 'architect', 'floater', 'midboss'];
        this.mesh.userData.idle = true;
        this.mesh.userData.baseY = floatingTypes.includes(type) ? 1.5 : (type === 'spider' ? 0.3 : 0);
        this.mesh.userData.idleSpeed = 0.002;
        this.mesh.userData.idleAmp = floatingTypes.includes(type) ? 0.15 : 0.1;
        this.mesh.position.y = this.mesh.userData.baseY;
        engine.scene.add(this.mesh);

        // Persistent Shield Effect (Visual only)
        const sSize = (isPlayer ? 1.5 : (['architect', 'midboss', 'boss'].includes(type) ? 3.5 : 1.8));
        const sGeo = new THREE.SphereGeometry(sSize, 24, 24);
        const sMat = new THREE.MeshBasicMaterial({
            color: 0x00f2ff,
            transparent: true,
            opacity: 0,
            wireframe: true,
            side: THREE.DoubleSide
        });
        this.shieldOrb = new THREE.Mesh(sGeo, sMat);
        this.mesh.add(this.shieldOrb);
    }
    attackAnim(cb, isStationary = false) {
        const weapon = this.model.weapon; const pivot = this.mesh;

        if (isStationary) {
            // Just animate weapon or tiny recoil
            if (weapon) {
                engine.tween(weapon.rotation, 'x', -0.2, 50, () => {
                    setTimeout(() => { engine.tween(weapon.rotation, 'x', 0, 100, cb); }, 50);
                });
            } else {
                setTimeout(cb, 100);
            }
            return;
        }

        const startX = pivot.position.x; const targetX = this.isPlayer ? 0.5 : -0.5;
        engine.tween(pivot.position, 'x', targetX, 100, () => {
            if (weapon) weapon.rotation.x = -0.5;
            setTimeout(() => { if (weapon) weapon.rotation.x = 0; engine.tween(pivot.position, 'x', startX, 150, cb); }, 80);
        });
    }
    takeDmg(amount) {
        // --- SUMMONER MECHANIC: MINION SHIELD ---
        // If player has minions, they take the hit instead.
        if (this.isPlayer && this.minions && this.minions.length > 0) {
            const shieldMinion = this.minions[0]; // First in line acts as shield
            const residual = shieldMinion.takeDmg(amount);

            if (shieldMinion.updateHealthBar) shieldMinion.updateHealthBar(); // UPDATE BAR

            // If minion died (hp <= 0), remove it
            if (shieldMinion.hp <= 0) {
                game.showText("MINION DESTROYED", shieldMinion.mesh.position, '#ff0000');
                if (shieldMinion.mesh) engine.scene.remove(shieldMinion.mesh);
                if (shieldMinion.removeHealthBar) shieldMinion.removeHealthBar(); // REMOVE BAR
                this.minions.shift(); // Remove from array

                // If no minions left, Player returns to front
                if (this.minions.length === 0) {
                    engine.tween(this.mesh.position, 'x', -2.5, 400);
                    game.showText("ENGAGING...", this.mesh.position, '#ffffff');
                }
            }
            // Player takes 0 damage if minion tanked it
            return 0;
        }

        // Invincible check
        if (this.isPlayer && this.invincible) {
            game.showText("IMMUNE!", this.mesh.position, '#ffd700');
            return 0;
        }
        // Dodge check
        if (Math.random() < this.dodge) {
            game.showText("DODGE!", this.mesh.position, '#00ff00');

            // Executioner (Floor 50): Gain Shadow Charge on dodge
            if (this.type === 'midboss' && game.floor >= 50 && game.floor < 65) {
                this.shadowCharges = (this.shadowCharges || 0) + 1;
                game.showText(`SHADOW CHARGE (+${this.shadowCharges})`, this.mesh.position, '#8800ff');
                game.runVFX('puff', this.mesh.position, 0x8800ff, 0, 1.2);
            }
            return 0;
        }
        // Armor reduces damage
        // PENETRATION UPDATE: Always deal at least 15% of raw damage to prevent "1 damage" situations
        let reduced = amount - this.armor;

        // Apply Percentage Mitigation (Tanks)
        if (this.mitigation > 0) {
            reduced = Math.floor(reduced * (1 - this.mitigation));
        }

        let minDmg = Math.floor(amount * 0.15);
        let finalDmg = Math.max(1, Math.max(reduced, minDmg));

        // --- BOSS MECHANIC: REACTIVE ARMOR [DISABLED] ---
        // if (!this.isPlayer && ['boss', 'midboss', 'architect'].includes(this.type)) {
        //     const reactiveShield = Math.floor(this.maxHp * 0.0005);
        //     this.shield += reactiveShield;
        //     this.maxShield = Math.max(this.maxShield, this.shield);
        //     game.runVFX('shieldBurst', this.mesh.position, 0x00f2ff, 0, 0.5);
        // }

        // --- MUTATION: OVERCLOCKED ---
        if (game.currentMutation === 'overclocked') {
            finalDmg = Math.floor(finalDmg * 1.5);
        }

        // --- TENACITY (Damage Cap) ---
        // Prevents one-shots at high floors
        if (this.tenacity > 0) {
            const cap = Math.floor(this.maxHp * this.tenacity);
            if (finalDmg > cap) {
                finalDmg = cap;
                // Optional: Show visual indicator for resisted damage?
                // game.showText("RESIST", this.mesh.position, "#ffffff");
            }
        }

        if (this.isPlayer && game.enemy && game.enemy.reflectShield > 0) {
            const reflect = Math.floor(amount * game.enemy.reflectShield);
            game.enemy.hp = Math.max(0, game.enemy.hp - reflect);
            game.showText(`${reflect} REFLECT`, game.enemy.mesh.position, '#ff00ff');
        }

        // Shield absorbs damage first
        if (this.shield > 0) {
            const absorbed = Math.min(this.shield, finalDmg);
            this.shield -= absorbed;
            finalDmg -= absorbed;
            if (absorbed > 0) game.showText(`-${absorbed} SHIELD`, this.mesh.position, '#00f2ff');
        }
        this.hp = Math.max(0, this.hp - finalDmg);

        // --- MUTATION: FEEDBACK LOOP ---
        if (game.currentMutation === 'feedback' && this.isPlayer && finalDmg > 0) {
            this.mana = Math.min(this.maxMana, this.mana + Math.floor(this.maxMana * 0.1));
            game.showText("+10% MANA", this.mesh.position, '#00f2ff');
        }

        // --- BOSS PHASE INTERCEPTOR ---
        // If enemy hits 0 HP, is the Boss, and hasn't finished all phases:
        // GATED: Don't trigger if already in a cutscene or a phase is pending
        if (!this.isPlayer && this.hp <= 0 && game.floor === 100 &&
            game.state !== 'CUTSCENE' && !game.pendingBossTransformation && !game.pendingBossDefeat) {
            // If we are in Phase 1, Trigger Phase 2
            if (game.bossPhase === 1) {
                this.hp = 1; // Keep alive for the cutscene
                game.triggerBossPhase2();
                return;
            }
            // If we are in Phase 2, Trigger Finale
            if (game.bossPhase === 2) {
                this.hp = 0; // Actually die now
                game.triggerBossEnding();
                return;
            }
        }

        if (!this.isPlayer && this.hp < (this.maxHp * 0.2) && !this.isDesperate &&
            ['midboss', 'boss', 'architect'].includes(this.type)) {
            this.triggerDesperation();
        } else if (!this.isPlayer && !this.isRaging && this.hp < (this.maxHp * 0.5) &&
            ['midboss', 'boss', 'architect'].includes(this.type)) {
            this.triggerRage();
        }
        // -----------------------------
        // Thorns damage (reflect)
        if (this.isPlayer && this.thorns > 0 && game.enemy) {
            const thornsDmg = Math.floor(amount * this.thorns);
            if (thornsDmg > 0) {
                game.enemy.hp = Math.max(0, game.enemy.hp - thornsDmg);
                game.showText(`${thornsDmg} THORNS`, game.enemy.mesh.position, '#ff00ff');
            }
        }
        if (this.isPlayer) {
            const base = this.mesh.position.x;
            this.mesh.position.x -= 0.2;
            setTimeout(() => this.mesh.position.x = base, 50);
        }
        // Return actual damage dealt for UI display
        return finalDmg;
    }
    unequip(slot) {
        const old = this.gear[slot];
        if (!old) return;

        // Remove flat bonuses (Update base stats)
        if (old.atk) this.baseAtk -= old.atk;
        if (old.hp) this.baseMaxHp -= old.hp;
        if (old.mana) this.baseMaxMana -= old.mana;
        if (old.crit) this.critChance -= old.crit;
        if (old.dodge) this.dodge -= old.dodge;

        // Remove multipliers
        if (old.atkMult) this.atkMult -= old.atkMult;
        if (old.hpMult) this.hpMult -= old.hpMult;
        if (old.manaMult) this.manaMult -= old.manaMult;
        if (old.critChance) this.critChance -= old.critChance;
        if (old.critDamage) this.critDamage -= old.critDamage;
        if (old.lifesteal) this.lifesteal -= old.lifesteal;
        if (old.armor) this.baseArmor = (this.baseArmor || 0) - old.armor;
        if (old.regen) this.baseManaRegen = (this.baseManaRegen || 5) - old.regen;
        if (old.thorns) this.thorns -= old.thorns;

        this.gear[slot] = null;
        this.recalculateStats();
        game.updateGearUI();
        game.showText(`UNEQUIPPED ${old.name}`, this.mesh.position, '#aaa');
    }

    equip(item) {
        const slot = item.type; // 'weapon' or 'accessory'

        // 1. Unequip existing if any
        if (this.gear[slot]) {
            // Stats are reversed inside unequip()
            this.unequip(slot);
        }

        // 2. Equip new (add stats)
        this.gear[slot] = item;

        // Add flat bonuses (Update base stats)
        if (item.atk) this.baseAtk += item.atk;
        if (item.hp) this.baseMaxHp += item.hp;
        if (item.mana) this.baseMaxMana += item.mana;
        if (item.crit) this.critChance += item.crit;
        if (item.dodge) this.dodge += item.dodge;

        // Add multipliers
        if (item.atkMult) this.atkMult = (this.atkMult || 0) + item.atkMult;
        if (item.hpMult) this.hpMult = (this.hpMult || 0) + item.hpMult;
        if (item.manaMult) this.manaMult = (this.manaMult || 0) + item.manaMult;
        if (item.critChance) this.critChance += item.critChance;
        if (item.critDamage) this.critDamage += item.critDamage;
        if (item.lifesteal) this.lifesteal += item.lifesteal;
        if (item.armor) this.baseArmor = (this.baseArmor || 0) + item.armor;
        if (item.regen) this.baseManaRegen = (this.baseManaRegen || 5) + item.regen;
        if (item.thorns) this.thorns = (this.thorns || 0) + item.thorns;

        // 3. Final Recalculation
        this.recalculateStats();

        // 4. UI Update
        game.updateGearUI();
        game.showText(`EQUIPPED ${item.name}`, this.mesh.position, '#00ff00');
    }

    getStatCaps() {
        // DEFAULT CAPS
        let caps = {
            dodge: 0.60,      // Standard Dodge Cap
            crit: 1.00,       // Standard Crit Cap
            armor: 999999,    // Uncapped
            lifesteal: 0.25,  // Standard Lifesteal Cap (25%)
            mitigation: 0.80  // Max 80% Mitigation (Prevent immunity)
        };

        // If no job type (e.g. enemy or starter), return defaults
        if (!this.jobType) return caps;

        const type = this.jobType;

        // --- ROGUE TYPES (High Dodge, Low Mitigation) ---
        if (['SHADOW', 'RONIN', 'GUNSLINGER', 'HACKER'].includes(type)) {
            caps.dodge = 0.85;
            caps.mitigation = 0.50; // Squishy
        }

        // --- TANK TYPES (Low Dodge, Low Lifesteal, High Tenacity) ---
        if (['MECH', 'SQUIRE', 'KNIGHT', 'BRAWLER'].includes(type)) {
            caps.dodge = 0.35;
            caps.lifesteal = 0.05; // Tanks cannot lifesteal tank (Max 5%)
        }

        // --- REAPER (The Potato/Vampire Class) ---
        if (type === 'REAPER') {
            caps.lifesteal = 1.00; // Uncapped Lifesteal (Identity)
        }

        return caps;
    }

    recalculateStats() {
        const oldMaxHp = this.maxHp;
        const oldMaxMana = this.maxMana;

        // Apply multipliers: Final = Base * (1 + Mult)
        this.maxHp = Math.floor(this.baseMaxHp * (1 + (this.hpMult || 0)));
        this.atk = Math.floor(this.baseAtk * (1 + (this.atkMult || 0)));
        this.maxMana = Math.floor(this.baseMaxMana * (1 + (this.manaMult || 0)));

        // --- ARMOR UPDATE (User Req: "Bring up armour") ---
        // OLD: scale only with multiplier.
        // NEW: Base armor + 20% of ATK is converted to Armor (Natural Toughness).
        // Then apply multiplier to the whole sum.
        const naturalArmor = Math.floor(this.atk * 0.20);
        this.armor = Math.floor((this.baseArmor + naturalArmor) * (1 + (this.armorMult || 0)));

        this.manaRegen = Math.floor(this.baseManaRegen * (1 + (this.manaRegenMult || 0)));

        // --- APPLY HARD CAPS ---
        const caps = this.getStatCaps();
        if (this.dodge > caps.dodge) this.dodge = caps.dodge;
        if (this.critChance > caps.crit) this.critChance = caps.crit;
        if (this.lifesteal > caps.lifesteal) this.lifesteal = caps.lifesteal;
        if (this.mitigation > caps.mitigation) this.mitigation = caps.mitigation;

        // Maintain HP/Mana ratio when max changes
        if (oldMaxHp > 0) {
            const hpRatio = this.hp / oldMaxHp;
            this.hp = Math.floor(this.maxHp * hpRatio);
        } else {
            this.hp = this.maxHp;
        }

        if (oldMaxMana > 0) {
            const manaRatio = this.mana / oldMaxMana;
            this.mana = Math.floor(this.maxMana * manaRatio);
        } else {
            this.mana = this.maxMana;
        }
    }

    triggerRage() {
        if (this.isRaging) return;
        this.isRaging = true;
        this.phase = 2;
        this.atk = Math.floor(this.atk * 1.5);
        if (this.mesh) this.mesh.scale.multiplyScalar(1.2);

        game.showText("URGE OVERDRIVE: ATK+50%", this.mesh.position, '#ff0000');

        // Visual Flare
        engine.addShake(0.8);
        engine.hitStop(50);
        game.runVFX('nuke', this.mesh.position, '#ff0000', 0, 1.5);

        // Zoom Camera briefly
        const oldPos = engine.camera.position.clone();
        const oldTarget = { ...engine.cameraTarget };
        engine.focusCamera(this.mesh.position, { x: 0, y: 1, z: 4 }, 300);
        setTimeout(() => {
            if (engine.camera && oldPos) {
                engine.camera.position.copy(oldPos);
                engine.cameraTarget = oldTarget;
            }
        }, 1000);
    }

    triggerDesperation() {
        if (this.isDesperate) return;
        this.isDesperate = true;

        // Desperation Effects
        this.atk = Math.floor(this.atk * 1.3); // Further Attack Boost
        this.reflectShield = 0.2; // 20% Reflection constant

        game.showText("⚠ CRITICAL ERROR: LIMIT REMOVED ⚠", this.mesh.position, '#ff0000');

        // VFX
        engine.addShake(1.0);
        engine.hitStop(50);
        game.runVFX('shockwave', this.mesh.position, '#ff0000', 0, 2.0);
    }

    // --- MINION HEALTH BAR ---
    createHealthBar() {
        const div = document.createElement('div');
        div.className = 'minion-hp-bar';
        div.innerHTML = `
            <div class="minion-name">${this.name}</div>
            <div class="minion-hp-fill"></div>
        `;
        document.getElementById('minion-ui-container').appendChild(div);
        this.hpBar = div;
        this.updateHealthBar();
    }

    updateHealthBar() {
        if (!this.hpBar) return;
        const pct = Math.max(0, this.hp / this.maxHp) * 100;
        const fill = this.hpBar.querySelector('.minion-hp-fill');
        if (fill) fill.style.width = pct + '%';

        // Color Change based on HP
        if (pct < 30) fill.style.background = '#ff0000';
        else if (pct < 60) fill.style.background = '#ffe600';
        else fill.style.background = '#00ffaa';
    }

    updateHealthBarPosition() {
        if (!this.hpBar || !this.mesh) return;

        // Project 3D position to 2D screen
        // Minions are typically at y=0 or 1.5. HP bar should be above them.
        const pos = this.mesh.position.clone();
        pos.y += 2.2; // Float above head

        pos.project(engine.camera);

        const x = (pos.x * 0.5 + 0.5) * window.innerWidth;
        const y = (-(pos.y * 0.5) + 0.5) * window.innerHeight;

        // Hide if behind camera
        if (pos.z > 1) {
            this.hpBar.style.display = 'none';
        } else {
            this.hpBar.style.display = 'block';
            this.hpBar.style.left = x + 'px';
            this.hpBar.style.top = y + 'px';
        }
    }

    removeHealthBar() {
        if (this.hpBar) {
            this.hpBar.remove();
            this.hpBar = null;
        }
    }
}
