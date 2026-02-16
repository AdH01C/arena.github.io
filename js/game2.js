const game = {
    keys: {},
    player: null,
    mobs: [],
    summons: [],
    projectiles: [],
    platforms: [],

    GRAVITY: 0.05,
    WALK_SPEED: 0.2,
    JUMP_FORCE: 0.9,
    GROUND_Y: 0,

    init(classKey) {
        console.log(`Initializing Game 2 with Class: ${classKey}`);
        this.resetGame();
        this.setupLevel();
        this.setupInput();
        this.spawnPlayer(classKey);
        this.spawnMobs();
    },

    resetGame() {
        // 1. Identify Player Summons to Keep
        const keptSummons = this.summons.filter(s => s.owner === this.player && s.hp > 0);

        // Cleanup UI (Remove ALL bars, we will recreate for kept units)
        [...this.mobs, ...this.summons].forEach(e => {
            if (e.hpBar && e.hpBar.el) {
                e.hpBar.el.remove();
                e.hpBar = null; // Clear ref so new one is created
            }
        });
        if (engine.uiElements) {
            engine.uiElements.forEach(u => u.el.remove());
            engine.uiElements = [];
        }

        this.projectiles = [];
        this.summons = []; // cleared logic
        this.mobs = [];
        this.shopkeeper = null;

        // Scene Cleanup
        while (engine.scene.children.length > 5) {
            engine.scene.remove(engine.scene.children[engine.scene.children.length - 1]);
        }
        engine.generateBackground('city');

        // 2. Restore Summons
        keptSummons.forEach((s, i) => {
            this.summons.push(s);
            engine.scene.add(s.mesh);
            engine.updateEntityUI(s);

            // Reset Position (Near Player Start)
            s.x = -40 + (Math.random() * 4 - 2);
            s.y = 5;
            s.vx = 0; s.vy = 0;
            s.mesh.position.set(s.x, s.y, 0);
        });
    },

    setupLevel() {
        // Theme Rotation (City -> Wasteland -> Glacier -> Volcano -> Cyber)
        const themes = ['CITY', 'WASTELAND', 'GLACIER', 'VOLCANO', 'CYBER'];
        const themeIndex = Math.floor(this.currentLevel / 10) % themes.length;
        if (typeof engine !== 'undefined' && engine.generateBackground) {
            engine.generateBackground(themes[themeIndex]);
        }

        this.platforms = [];
        this.addPlatform(5, 3, 6);
        this.addPlatform(15, 6, 8);
        this.addPlatform(-5, 4, 5);
        this.addPlatform(25, 4, 6);
        this.addPlatform(10, 10, 4);
        this.addPlatform(20, 12, 4);
    },

    addPlatform(x, y, w) {
        this.platforms.push({ x, y, width: w });
        if (typeof engine !== 'undefined' && engine.createPlatform) {
            engine.createPlatform(x, y, w);
        }
    },

    setupInput() {
        window.onkeydown = (e) => {
            if (e.repeat) return;
            this.keys[e.code] = true;
            if (e.code === 'ArrowUp') this.handleInteraction();
            if (e.code === 'Space') this.playerJump();
            if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') this.usePotion();
            // Skills Z, X, C handled in update() for auto-fire
            if (e.code === 'KeyI' || e.code === 'KeyS') this.toggleCharacterMenu();
        };
        window.onkeyup = (e) => {
            this.keys[e.code] = false;
        };
    },

    // Helper: Save original colors of player model
    savePlayerModelColors() {
        if (!this.player || !this.player.mesh) return;

        this.player.savedColors = [];

        // Save colors of all materials in mesh hierarchy
        this.player.mesh.traverse((child) => {
            if (child.material) {
                if (Array.isArray(child.material)) {
                    child.material.forEach(mat => {
                        if (mat.color) {
                            this.player.savedColors.push({
                                material: mat,
                                color: mat.color.getHex()
                            });
                        }
                    });
                } else if (child.material.color) {
                    this.player.savedColors.push({
                        material: child.material,
                        color: child.material.color.getHex()
                    });
                }
            }
        });

        // Also save weapon colors
        if (this.player.weapon && this.player.weapon.material) {
            if (Array.isArray(this.player.weapon.material)) {
                this.player.weapon.material.forEach(mat => {
                    if (mat.color) {
                        this.player.savedColors.push({
                            material: mat,
                            color: mat.color.getHex()
                        });
                    }
                });
            } else if (this.player.weapon.material.color) {
                this.player.savedColors.push({
                    material: this.player.weapon.material,
                    color: this.player.weapon.material.color.getHex()
                });
            }
        }
    },

    // Helper: Restore original colors of player model
    restorePlayerModelColors() {
        if (!this.player || !this.player.savedColors) return;

        this.player.savedColors.forEach(({ material, color }) => {
            if (material && material.color) {
                material.color.setHex(color);
            }
        });

        this.player.savedColors = null;
    },

    // Helper: Change color of entire player model (all parts)
    setPlayerModelColor(color) {
        if (!this.player || !this.player.mesh) return;

        // Recursively change color of all materials in mesh hierarchy
        this.player.mesh.traverse((child) => {
            if (child.material) {
                if (Array.isArray(child.material)) {
                    child.material.forEach(mat => {
                        if (mat.color) mat.color.setHex(color);
                    });
                } else if (child.material.color) {
                    child.material.color.setHex(color);
                }
            }
        });

        // Also change weapon color if it exists
        if (this.player.weapon && this.player.weapon.material) {
            if (Array.isArray(this.player.weapon.material)) {
                this.player.weapon.material.forEach(mat => {
                    if (mat.color) mat.color.setHex(color);
                });
            } else if (this.player.weapon.material.color) {
                this.player.weapon.material.color.setHex(color);
            }
        }
    },

    spawnPlayer(classKey) {
        const data = CLASS_DATA[classKey] || CLASS_DATA['RONIN'];
        // Class-Specific Models
        let modelData;
        const c = data.stats.color;
        switch (classKey) {
            case 'RONIN': modelData = Models.createRonin(c, 1.2); break;
            case 'PRIEST': modelData = Models.createPriest(c, 1.2); break;
            case 'MECH': modelData = Models.createMech(c, 1.2); break;
            case 'HACKER': modelData = Models.createHacker(c, 1.2); break;
            case 'SHADOW': modelData = Models.createShadow(c, 1.2); break;
            case 'BRAWLER': modelData = Models.createBrawler(c, 1.2); break;
            case 'GUNSLINGER': modelData = Models.createGunslinger(c, 1.2); break;
            case 'SQUIRE': modelData = Models.createKnight(c, 1.2); break; // Knight model for Squire
            case 'REAPER': modelData = Models.createReaper(c, 1.2); break;
            case 'SUMMONER': modelData = Models.createSummoner(c, 1.2); break;
            default: modelData = Models.createHumanoid(c, 1.2); break;
        }

        this.player = {
            mesh: modelData.mesh, weapon: modelData.weapon, limbs: this.cacheLimbs(modelData.mesh),
            x: 0, y: 5, vx: 0, vy: 0,
            isGrounded: false, facingRight: true, classKey: classKey,
            hp: data.stats.hp, maxHp: data.stats.hp,
            atk: data.stats.atk, baseAtk: data.stats.atk,
            speed: data.stats.speed, baseSpeed: data.stats.speed,
            mp: data.stats.mp || 100, maxMp: data.stats.mp || 100, mpRegen: data.stats.mpRegen || 0.1, hpRegen: 0.05,
            xp: 0, maxXp: 100, level: 1, gold: 0,
            ap: 0, str: 10, vit: 10, int: 10, agi: 10, potions: 5,
            cooldowns: { z: 0, x: 0, c: 0 }, invulnTimer: 0, buffs: { shield: 0, rapidfire: 0 },
            animState: { current: 'idle', time: 0, duration: 0, locked: false }
        };

        // BRAWLER COMBO INIT
        if (classKey === 'BRAWLER') {
            this.combo = 0;
            // Create UI if not exists
            if (!document.getElementById('combo-counter')) {
                const div = document.createElement('div');
                div.id = 'combo-counter';
                div.style.position = 'absolute';
                div.style.top = '15%';
                div.style.left = '50%';
                div.style.transform = 'translate(-50%, -50%)';
                div.style.fontSize = '40px';
                div.style.fontWeight = 'bold';
                div.style.color = '#ffaa00';
                div.style.textShadow = '0 0 10px #ff0000';
                div.style.pointerEvents = 'none';
                div.style.display = 'none';
                document.body.appendChild(div);
                this.comboUI = div;
            } else {
                this.comboUI = document.getElementById('combo-counter');
            }
        }
        engine.scene.add(this.player.mesh);
        engine.updateEntityUI(this.player);
        this.updateHUD(); // Initial HUD update
        // engine.updateHealthBar(this.player); // Disable floating bar for player
        engine.createFloatingText(`${data.name} READY`, { x: 0, y: 7, z: 0 }, '#ffffff');

        // Update UI Text
        const setUI = (slot, skill) => {
            const nameEl = document.getElementById(`name-${slot}`);
            const descEl = document.getElementById(`desc-${slot}`);
            if (nameEl) nameEl.innerText = `${skill.name} (${skill.mpCost || 0})`;
            if (descEl) descEl.innerText = skill.desc;
        };
        setUI('z', data.skills.z);
        setUI('x', data.skills.x);
        setUI('c', data.skills.c);

        // Camera Follow
        engine.cameraTarget = this.player;

        // Spawn Effect
        engine.spawnParticles(this.player.mesh.position, 'rise', data.stats.color, 20);
    },

    updateHUD() {
        if (!this.player) return;
        const hpPct = (this.player.hp / this.player.maxHp) * 100;
        const mpPct = (this.player.mp / this.player.maxMp) * 100;
        const xpPct = (this.player.xp / this.player.maxXp) * 100;

        const hpFill = document.getElementById('hud-hp-fill');
        const mpFill = document.getElementById('hud-mp-fill');
        if (hpFill) hpFill.style.width = Math.max(0, hpPct) + '%';
        if (mpFill) mpFill.style.width = Math.max(0, mpPct) + '%';

        const hpTxt = document.getElementById('hud-hp-text');
        const mpTxt = document.getElementById('hud-mp-text');
        if (hpTxt) hpTxt.innerText = `${Math.ceil(this.player.hp)}/${this.player.maxHp}`;
        if (mpTxt) mpTxt.innerText = `${Math.ceil(this.player.mp)}/${this.player.maxMp}`;

        // XP & Level Info
        const classTxt = document.getElementById('hud-class-name');
        const lvlTxt = document.getElementById('hud-level-text');
        const xpFill = document.getElementById('hud-xp-fill');
        if (classTxt) classTxt.innerText = this.player.classKey || "HERO";
        if (lvlTxt) lvlTxt.innerText = `LVL ${this.player.level}`;
        if (lvlTxt) lvlTxt.innerText = `LVL ${this.player.level}`;
        if (xpFill) xpFill.style.width = Math.max(0, xpPct) + '%';

        // Update Combo UI (Brawler)
        if (this.player.classKey === 'BRAWLER' && this.comboUI) {
            if (this.combo > 0) {
                this.comboUI.style.display = 'block';
                this.comboUI.innerText = `${this.combo} HIT COMBO!`;
                this.comboUI.style.fontSize = `${30 + (this.combo * 5)}px`;
                this.comboUI.style.color = this.combo >= 5 ? '#ff4400' : '#ffaa00';
            } else {
                this.comboUI.style.display = 'none';
            }
        }

        // Cooldown Pie Timers
        const slots = ['z', 'x', 'c', 'v'];
        const now = Date.now();
        const cls = CLASS_DATA[this.player.classKey || 'RONIN'];

        slots.forEach(slot => {
            const cdEnd = this.player.cooldowns[slot] || 0;
            const el = document.getElementById(`cd-${slot}`);

            // Resolve Skill Data
            let skill = null;
            if (slot === 'v') skill = this.player.ult;
            else if (cls && cls.skills) skill = cls.skills[slot];

            if (el && skill) {
                if (cdEnd > now) {
                    const totalCd = skill.cd;
                    const remaining = cdEnd - now;
                    let pct = (remaining / totalCd) * 100;
                    pct = Math.max(0, Math.min(100, pct));

                    // Pie Chart Effect: Dark region is remaining time
                    el.style.background = `conic-gradient(rgba(0,0,0,0.8) ${pct}%, transparent ${pct}%)`;
                    // el.innerText = (remaining/1000).toFixed(1); // Optional Text
                } else {
                    el.style.background = 'transparent';
                    // el.innerText = "";
                }
            }
        });

        // Gold Update
        const goldEl = document.getElementById('hud-gold');
        if (goldEl) goldEl.innerText = this.player.gold || 0;

        // Potion Update
        const potEl = document.getElementById('potion-count');
        if (potEl) potEl.innerText = this.player.potions || 0;

        // HP Bar / Shield Bar Swap
        const hpText = document.getElementById('hud-hp-text');

        if (hpFill) {
            if (this.player.buffs && this.player.buffs.shield > 0) {
                // Shield Mode
                const sPct = Math.min(100, (this.player.buffs.shield / this.player.maxHp) * 100);
                hpFill.style.width = sPct + '%';
                hpFill.style.backgroundColor = '#00ffff'; // Blue for Shield
                if (hpText) hpText.innerText = Math.ceil(this.player.buffs.shield);
            } else {
                // HP Mode
                const hpPct = (this.player.hp / this.player.maxHp) * 100;
                hpFill.style.width = hpPct + '%';
                hpFill.style.backgroundColor = '#ff0044'; // Red for HP
                if (hpText) hpText.innerText = Math.ceil(this.player.hp);
            }
        }

        // Hide old separate shield bar if it exists
        const elShield = document.getElementById('hud-shield-fill');
        if (elShield) elShield.style.width = '0%';
    },

    spawnMobs() {
        // BOSS Check (Every 10 Levels)
        if (this.currentLevel % 10 === 0) {
            this.spawnBoss();
            return;
        }

        // Shop Floor check (Level 5 OR Level 9)
        // User requested: Floor 9 (with mobs) and Floor 5 (with mobs)
        if (this.currentLevel === 5 || this.currentLevel === 9 || (this.currentLevel % 5 === 0 && this.currentLevel % 10 !== 0)) {
            this.spawnShopkeeper();
            // Do NOT return, allowing mobs to spawn
        }

        // STANDARD MOB SPAWNING
        const mobTypes = ['TROOPER', 'SKELETON', 'DRONE', 'WASP', 'GOLEM'];
        const levelMult = Math.max(1, this.currentLevel || 1);
        // SCALING LOGIC (Exponential + Density Capping)
        const rawCount = 5 + Math.floor(levelMult * 1.5);
        const maxMobs = 25; // Hard cap to prevent lag
        const actualCount = Math.min(rawCount, maxMobs);
        const densityMult = rawCount / actualCount; // Buff remaining mobs if we capped them

        // Exponential Difficulty: 1.1^Level (approx 2.5x at Lv10, 6.7x at Lv20)
        const difficultyMult = Math.pow(1.1, this.currentLevel - 1);

        // Mob Variety Logic
        let pool = [];
        if (this.currentLevel < 3) pool = ['TROOPER'];
        else if (this.currentLevel < 6) pool = ['TROOPER', 'DRONE'];
        else if (this.currentLevel < 10) pool = ['TROOPER', 'DRONE', 'SKELETON'];
        else pool = mobTypes;

        for (let i = 0; i < actualCount; i++) {
            const type = pool[Math.floor(Math.random() * pool.length)];
            let startX = 10 + Math.random() * 30; // Spawn mostly on right side initially
            let startY = 5;
            if (this.platforms.length > 0 && Math.random() > 0.5) {
                const p = this.platforms[Math.floor(Math.random() * this.platforms.length)];
                startX = p.x; startY = p.y + 2;
            }

            const modelData = Models.createMinion(0xff0000, 1 + (densityMult * 0.1), Math.random() * 100, type); // Slightly larger if dense

            // Stats Calculation
            const baseHp = 100 * difficultyMult;
            const finalHp = baseHp * densityMult;

            const baseAtk = 10 * difficultyMult;
            const finalAtk = baseAtk * densityMult;

            const baseXp = (20 * (1 + (this.currentLevel - 1) * 0.2));
            const finalXp = baseXp * densityMult;

            const baseGold = 10 + (levelMult * 5);
            const finalGold = baseGold * densityMult;

            const mob = {
                mesh: modelData.mesh, limbs: this.cacheLimbs(modelData.mesh),
                x: startX, y: startY, vx: 0, vy: 0,
                isGrounded: false, type: type,
                hp: finalHp, maxHp: finalHp,
                atk: finalAtk,
                status: { dot: 0, slow: 0 }, buffs: { shield: 0 },
                animState: { current: 'idle', time: 0, duration: 0 },
                speedMult: 1 + (this.currentLevel * 0.05), // +5% Speed/Rate per level
                goldValue: Math.floor(finalGold),
                xpValue: Math.floor(finalXp) // Custom XP value support needed in gainXp
            };
            this.mobs.push(mob);
            engine.scene.add(mob.mesh);
            engine.updateEntityUI(mob);
        }
    },

    spawnBoss() {
        engine.createFloatingText("⚠️ BOSS DETECTED ⚠️", { x: 0, y: 5, z: 0 }, '#ff0000');
        engine.shake(1.0);

        const tier = Math.floor(this.currentLevel / 10);
        let modelData;
        let type = 'BOSS';
        let scale = 2.0;
        let hpMult = 1.0;

        if (tier === 1) {
            type = 'WARDEN';
            modelData = Models.createMidBoss(0xff0000, scale, 0); // Tanky
        } else if (tier === 2) {
            type = 'EXECUTIONER';
            modelData = Models.createMidBoss(0xff0000, scale, 1); // Axe
            hpMult = 1.5;
        } else if (tier === 3) {
            type = 'OVERLORD';
            modelData = Models.createMidBoss(0xaa00ff, scale, 2); // Mage
            hpMult = 2.0;
        } else if (tier === 4) {
            type = 'IGRIS';
            modelData = Models.createIgris(scale);
            hpMult = 3.0;
        } else {
            type = 'THE ARCHITECT';
            modelData = Models.createArchitect(scale);
            hpMult = 5.0;
        }

        const maxHp = 800 * (1 + (this.currentLevel * 0.5)) * hpMult;

        const boss = {
            mesh: modelData.mesh, limbs: this.cacheLimbs(modelData.mesh),
            x: 15, y: 5, vx: 0, vy: 0,
            isGrounded: false, type: type,
            hp: maxHp, maxHp: maxHp,
            atk: 30 * (1 + (this.currentLevel * 0.2)),
            status: { dot: 0, slow: 0 }, buffs: { shield: 0 },
            animState: { current: 'idle', time: 0, duration: 0 },
            speedMult: 1 + (this.currentLevel * 0.08), // +8% Speed per level for Boss
            goldValue: 1000 + (this.currentLevel * 100),
            isBoss: true,
            // AI State Machine
            aiState: {
                mode: 'idle',           // idle, chase, attack, special, summon
                timer: 0,               // General purpose timer
                attackCooldown: 0,      // Time until next attack
                nextAttack: null,       // Queued attack type
                phase: 1,               // Boss phase (changes at HP thresholds)
                lastAttackTime: 0,      // Track last attack for cooldowns
                summonCount: 0          // Number of minions summoned
            }
        };
        this.boss = boss; // Track current boss
        this.mobs.push(boss);
        engine.scene.add(boss.mesh);

        // Show Boss HUD
        const bossHud = document.getElementById('boss-hud');
        if (bossHud) {
            bossHud.style.display = 'block';
            document.getElementById('boss-name').innerText = type;
            this.updateBossUI();
        }
    },

    updateBossUI() {
        if (!this.boss || this.boss.hp <= 0) return;
        const fill = document.getElementById('boss-hp-fill');
        const txt = document.getElementById('boss-hp-text');
        const sFill = document.getElementById('boss-shield-fill');

        if (this.boss.buffs && this.boss.buffs.shield > 0) {
            // Shield Mode
            const sPct = Math.min(100, (this.boss.buffs.shield / this.boss.maxHp) * 100);
            if (fill) {
                fill.style.width = sPct + '%';
                fill.style.backgroundColor = '#00ffff';
            }
            if (txt) txt.innerText = `SHIELD: ${Math.ceil(this.boss.buffs.shield)}`;
            if (sFill) sFill.style.width = '0%'; // Hide overlay
        } else {
            // HP Mode
            const pct = Math.max(0, (this.boss.hp / this.boss.maxHp) * 100);
            if (fill) {
                fill.style.width = pct + '%';
                fill.style.backgroundColor = '#ff0000';
            }
            if (txt) txt.innerText = `${Math.ceil(this.boss.hp)} / ${Math.ceil(this.boss.maxHp)}`;
        }
    },

    spawnShopkeeper() {
        engine.createFloatingText("SUPPLY STATION", { x: 0, y: 5, z: 0 }, '#ffd700');
        const modelData = Models.createHumanoid(0xffd700, 1.0);
        const shopkeeper = {
            mesh: modelData.mesh, limbs: this.cacheLimbs(modelData.mesh),
            x: 5, y: 5, vx: 0, vy: 0, isGrounded: true,
            isShopkeeper: true,
            animState: { current: 'idle', time: 0, duration: 0 }
        };
        shopkeeper.mesh.position.set(5, 5, 0);
        engine.scene.add(shopkeeper.mesh);

        // Interaction Hint
        engine.createFloatingText("PRESS [UP] TO SHOP", { x: 5, y: 7, z: 0 }, '#ffffff');
        this.shopkeeper = shopkeeper;
    },

    openShop() {
        const el = document.getElementById('shop-screen');
        if (el) {
            el.style.display = 'flex';
            this.generateShopItems();
        }
    },

    closeShop() {
        const el = document.getElementById('shop-screen');
        if (el) el.style.display = 'none';
    },

    generateShopItems() {
        const container = document.getElementById('shop-items');
        if (!container) return;
        container.innerHTML = '';

        // Potion
        this.createShopItem(container, "HEAL POTION", "Adds 1 Potion", 50, () => {
            if (this.player.gold >= 50) {
                this.player.gold -= 50;
                this.player.potions = (this.player.potions || 0) + 1;
                return true;
            }
            return false;
        });

        // Power Up
        const atkCost = 100 * this.player.level;
        this.createShopItem(container, "WEAPON UPGRADE", `+5 ATK`, atkCost, () => {
            if (this.player.gold >= atkCost) {
                this.player.gold -= atkCost;
                this.player.baseAtk += 5;
                this.player.atk += 5;
                return true;
            }
            return false;
        });

        // HP Up
        const hpCost = 80 * this.player.level;
        this.createShopItem(container, "ARMOR UPGRADE", `+20 MAX HP`, hpCost, () => {
            if (this.player.gold >= hpCost) {
                this.player.gold -= hpCost;
                this.player.maxHp += 20;
                this.player.hp += 20;
                return true;
            }
            return false;
        });
    },

    createShopItem(container, name, desc, cost, effectCb) {
        const card = document.createElement('div');
        card.style.border = "1px solid #ffd700";
        card.style.padding = "15px";
        card.style.background = "rgba(0,0,0,0.8)";
        card.style.width = "150px";
        card.style.textAlign = "center";
        card.style.cursor = "pointer";

        card.innerHTML = `
            <h3 style="color:#fff; margin:0 0 5px 0; font-size:14px;">${name}</h3>
            <p style="color:#ccc; font-size:10px; margin:0 0 10px 0;">${desc}</p>
            <div style="color:#ffd700; font-weight:bold;">${cost} G</div>
        `;

        card.onclick = () => {
            if (effectCb()) {
                this.updateHUD();
                engine.createFloatingText("PURCHASED", this.player.mesh.position, '#ffd700');
                // Success Flash
                card.style.background = "rgba(0,255,0,0.3)";
                card.style.borderColor = "#00ff00";
                card.style.transform = "scale(1.05)";
                setTimeout(() => {
                    card.style.background = "rgba(0,0,0,0.8)";
                    card.style.borderColor = "#ffd700";
                    card.style.transform = "scale(1.0)";
                }, 150);
            } else {
                engine.createFloatingText("NO FUNDS", this.player.mesh.position, '#ff0000');
                // Fail Flash
                card.style.background = "rgba(255,0,0,0.3)";
                card.style.borderColor = "#ff0000";
                setTimeout(() => {
                    card.style.background = "rgba(0,0,0,0.8)";
                    card.style.borderColor = "#ffd700";
                }, 150);
            }
        };
        container.appendChild(card);
    },

    handleChargeBeam(data) {
        // 1. LOCK MOVEMENT
        this.player.isDashing = true;
        this.player.vx = 0; // Stop
        const chargeTime = data.charge || 1000;
        const dir = this.player.facingRight ? 1 : -1;

        // 2. CHARGE VISUALS
        engine.createFloatingText("CHARGING...", { x: this.player.x, y: this.player.y + 3, z: 0 }, '#00ffff');
        const chargePart = setInterval(() => {
            engine.spawnParticles({
                x: this.player.x + (Math.random() - 0.5),
                y: this.player.y + (Math.random() - 0.5) + 1,
                z: 0
            }, 'spark', 0x00ffff, 1);
        }, 50);

        // 3. FIRE (After Delay)
        setTimeout(() => {
            clearInterval(chargePart);
            if (!this.player || this.player.hp <= 0) return;

            // BEAM VISUAL
            const range = data.range[0];
            const geometry = new THREE.CylinderGeometry(0.5, 0.5, range, 8);
            const material = new THREE.MeshBasicMaterial({ color: 0x00ffff });
            const beam = new THREE.Mesh(geometry, material);

            // Orient and Position Beam
            beam.rotation.z = Math.PI / 2;
            beam.position.set(this.player.x + (dir * (range / 2)), this.player.y + 1, 0);
            engine.scene.add(beam);

            // IMPACT
            engine.shake(0.5);
            engine.spawnParticles(this.player.mesh.position, 'explode', 0x00ffff, 30);

            // Damage Logic
            this.mobs.forEach(m => {
                const dx = m.x - this.player.x;
                const dy = Math.abs(m.y - this.player.y);
                // Check Direction
                const inFront = this.player.facingRight ? dx > 0 : dx < 0;
                // Check Range (Rectangle)
                if (inFront && Math.abs(dx) < range && dy < 3) {
                    this.takeDamage(m, this.player.atk * data.mult, this.player);
                    engine.spawnParticles(m.mesh.position, 'explode', 0x00ffff, 10);
                }
            });

            // Cleanup Beam
            setTimeout(() => {
                engine.scene.remove(beam);
                this.player.isDashing = false; // UNLOCK
            }, 300); // 0.3s Beam Duration

        }, chargeTime);
    },

    cacheLimbs(mesh) {
        const limbs = {};
        mesh.traverse(child => {
            if (child.name === 'LegL') limbs.legL = child;
            if (child.name === 'LegR') limbs.legR = child;
            if (child.name === 'ArmL') limbs.armL = child;
            if (child.name === 'ArmR') limbs.armR = child;
        });
        return limbs;
    },

    playAnim(entity, animName, duration = 300) {
        if (!entity.animState) return;
        entity.animState.current = animName; entity.animState.time = 0; entity.animState.duration = duration; entity.animState.locked = true;
    },

    updateAnim(entity) {
        if (!entity.limbs) return;
        const s = entity.animState; s.time += 16;
        if (s.locked) { if (s.time >= s.duration) { s.current = 'idle'; s.locked = false; } } else { if (Math.abs(entity.vx) > 0.01) s.current = 'run'; else s.current = 'idle'; }

        const resetLimbs = () => {
            // Remove temp VFX if any
            if (entity.vfxMesh) { engine.scene.remove(entity.vfxMesh); entity.vfxMesh = null; }
            ['legL', 'legR', 'armL', 'armR'].forEach(k => { if (entity.limbs[k]) { entity.limbs[k].rotation.x *= 0.8; entity.limbs[k].rotation.z *= 0.8; } }); entity.mesh.rotation.x *= 0.8;
        };

        // SHIELD VISUALS
        if (entity.buffs && entity.buffs.shield > 0) {
            if (!entity.shieldMesh) {
                const geo = new THREE.SphereGeometry(1.2, 16, 16);
                const mat = new THREE.MeshBasicMaterial({ color: 0x00ffff, wireframe: true, transparent: true, opacity: 0.3 });
                entity.shieldMesh = new THREE.Mesh(geo, mat);
                engine.scene.add(entity.shieldMesh);
            }
            entity.shieldMesh.position.copy(entity.mesh.position);
            entity.shieldMesh.position.y += 0.5; // Center on body
            entity.shieldMesh.rotation.y += 0.02;
            entity.shieldMesh.scale.setScalar(1 + Math.sin(Date.now() * 0.005) * 0.05);
        } else {
            if (entity.shieldMesh) {
                engine.scene.remove(entity.shieldMesh);
                entity.shieldMesh = null;
            }
        }

        if (s.current === 'idle') {
            resetLimbs();
            const t = Date.now() * 0.002;
            if (entity.limbs.armL) entity.limbs.armL.rotation.z = Math.sin(t) * 0.1 + 0.1;
            if (entity.limbs.armR) entity.limbs.armR.rotation.z = -Math.sin(t) * 0.1 - 0.1;
        }
        else if (s.current === 'run') {
            const mag = Math.sin(Date.now() * 0.015);
            if (entity.limbs.legL) entity.limbs.legL.rotation.x = mag;
            if (entity.limbs.legR) entity.limbs.legR.rotation.x = -mag;
            if (entity.limbs.armL) entity.limbs.armL.rotation.x = -mag;
            if (entity.limbs.armR) entity.limbs.armR.rotation.x = mag;
            if (Math.random() < 0.1 && entity.isGrounded) engine.spawnParticles(entity.mesh.position, 'smoke', 0x888888, 1);
        }
        else if (s.current === 'slash') {
            const p = s.time / s.duration; // 0 to 1

            // DASH EFFECT: Propel forward
            if (p < 0.3) {
                const dir = entity.facingRight ? 1 : -1;
                entity.vx = dir * 0.4; // Dash
                if (Math.random() < 0.5) engine.spawnParticles(entity.mesh.position, 'smoke', 0xffffff, 1);
            }

            let armRot = 0; if (p < 0.3) armRot = -Math.PI / 2 * (p / 0.3); else armRot = Math.PI / 2 * ((p - 0.3) / 0.7);
            if (entity.limbs.armR) entity.limbs.armR.rotation.x = armRot;
            if (entity.limbs.armL) entity.limbs.armL.rotation.x = -Math.PI / 4;
            entity.mesh.rotation.x = (p < 0.3 ? -0.2 : 0.2) * (1 - p);

            // FLASHY TRAIL
            if (p > 0.3 && p < 0.8) {
                const trailColor = entity.classKey ? (CLASS_DATA[entity.classKey].stats.color) : 0xffffff;
                for (let k = 0; k < 2; k++) {
                    engine.spawnParticles({
                        x: entity.x + (entity.facingRight ? 1 : -1) * (1 + Math.random()),
                        y: entity.y + 1 + (Math.random() - 0.5) * 2,
                        z: (Math.random() - 0.5)
                    }, 'spark', trailColor, 1);
                }
            }
        }
        else if (s.current === 'punch') {
            // MULTI HIT FLURRY
            const p = s.time / s.duration;
            const subPhase = Math.floor(p * 5); // 5 punches
            if (entity.limbs.armR) entity.limbs.armR.rotation.x = (subPhase % 2 === 0) ? -Math.PI / 2 : 0;
            if (entity.limbs.armL) entity.limbs.armL.rotation.x = (subPhase % 2 !== 0) ? -Math.PI / 2 : 0;

            // Impact effects
            if (Math.random() < 0.3) {
                engine.spawnParticles({
                    x: entity.x + (entity.facingRight ? 1.5 : -1.5),
                    y: entity.y + 1, z: 0
                }, 'explode', 0xffaa00, 1);
                engine.shake(0.2);
            }
        }
        else if (s.current === 'shoot') {
            // RAPID FIRE RECOIL
            const p = s.time / s.duration;
            if (p < 0.2) {
                if (entity.limbs.armR) entity.limbs.armR.rotation.x = -Math.PI / 2 - 0.5;
                entity.x -= (entity.facingRight ? 1 : -1) * 0.05; // Knockback self
            } else {
                if (entity.limbs.armR) entity.limbs.armR.rotation.x = -Math.PI / 2;
            }

            // Shell Casings
            if (p < 0.1) {
                engine.spawnParticles({ x: entity.x, y: entity.y + 1, z: 0.2 }, 'spark', 0xffff00, 1);
            }
        }
        else if (s.current === 'cast') {
            const t = Date.now() * 0.02; const mag = Math.sin(t) * 0.2;
            if (entity.limbs.armL) entity.limbs.armL.rotation.z = 2.5 + mag;
            if (entity.limbs.armR) entity.limbs.armR.rotation.z = -2.5 - mag;

            // LIGHTNING CHARGE
            if (Math.random() < 0.2) {
                const angle = Math.random() * Math.PI * 2;
                const r = 2;
                const start = new THREE.Vector3(entity.x, entity.y + 1, 0);
                const end = new THREE.Vector3(entity.x + Math.cos(angle) * r, entity.y + 1 + Math.sin(angle) * r, 0);
                engine.createLightning(start, end, 0x00ffff);
            }
        }
        else if (s.current === 'spin') {
            entity.mesh.rotation.y += 1.5; // Faster spin
            if (entity.limbs.armL) entity.limbs.armL.rotation.z = 1.5;
            if (entity.limbs.armR) entity.limbs.armR.rotation.z = -1.5;
            engine.spawnParticles({ x: entity.x, y: entity.y, z: 0 }, 'spark', 0x00ffff, 4);

            // TORNADO
            if (!entity.vfxMesh) {
                const geo = new THREE.ConeGeometry(2, 4, 8, 1, true);
                const mat = new THREE.MeshBasicMaterial({ color: 0xaa00ff, wireframe: true, transparent: true, opacity: 0.3 });
                entity.vfxMesh = new THREE.Mesh(geo, mat);
                engine.scene.add(entity.vfxMesh);
            }
            if (entity.vfxMesh) {
                entity.vfxMesh.position.copy(entity.mesh.position);
                entity.vfxMesh.rotation.y -= 0.5;
                entity.vfxMesh.scale.setScalar(1 + Math.sin(Date.now() * 0.01) * 0.2);
            }
        }
        else if (s.current === 'slam') {
            const p = s.time / s.duration;
            if (p < 0.5) {
                entity.mesh.position.y += 0.3; // Jump higher
                if (entity.limbs.armL) entity.limbs.armL.rotation.x = -2.5;
                if (entity.limbs.armR) entity.limbs.armR.rotation.x = -2.5;
            } else {
                if (entity.limbs.armL) entity.limbs.armL.rotation.x = 1.5;
                if (entity.limbs.armR) entity.limbs.armR.rotation.x = 1.5;
                // IMPACT
                if (p > 0.5 && p < 0.6) {
                    engine.shake(1.0);
                    engine.spawnParticles(entity.mesh.position, 'explode', 0xff0000, 10);
                }
            }
        }
    },

    // XP SYSTEM
    gainXp(amount) {
        if (!this.player) return;
        this.player.xp += amount;
        if (this.player.xp >= this.player.maxXp) this.levelUp();
    },

    // --- MENU & STATS ---
    toggleCharacterMenu() {
        const el = document.getElementById('character-menu');
        const isActive = el.style.display === 'flex';
        el.style.display = isActive ? 'none' : 'flex';
        this.updateMenuUI();
    },

    updateMenuUI() {
        if (!this.player) return;
        const setVal = (id, val) => { const e = document.getElementById(id); if (e) e.innerText = val; };

        setVal('menu-ap', this.player.ap);
        setVal('val-str', this.player.str);
        setVal('val-vit', this.player.vit);
        setVal('val-int', this.player.int);
        setVal('val-agi', this.player.agi);

        setVal('deriv-atk', Math.floor(this.player.atk));
        setVal('deriv-hp', Math.floor(this.player.maxHp));
        setVal('deriv-mp', Math.floor(this.player.maxMp));
        setVal('deriv-spd', this.player.speed.toFixed(2));
        setVal('deriv-crit', ((this.player.agi - 10) * 0.5).toFixed(1) + '%');
    },

    spendPoint(stat) {
        if (!this.player || this.player.ap <= 0) return;
        this.player.ap--;
        this.player[stat]++;

        // Recalculate Derived Stats
        // Base stats are from class (this.player.baseAtk etc). 
        // We add bonuses. Simplified:
        // STR: +1 ATK
        // VIT: +10 HP
        // INT: +5 MP
        // AGI: +0.005 SPD

        if (stat === 'str') this.player.atk += 1;
        if (stat === 'vit') { this.player.maxHp += 10; this.player.hp += 10; }
        if (stat === 'int') { this.player.maxMp += 5; this.player.mp += 5; }
        if (stat === 'agi') this.player.speed += 0.005;

        this.updateMenuUI();
    },

    levelUp() {
        this.player.level++;
        this.player.xp -= this.player.maxXp;
        this.player.maxXp = Math.floor(this.player.maxXp * 1.5);
        this.player.ap += 5; // Grant 5 AP

        // Stat Boost (Base level up boost + Attributes remain)
        this.player.maxHp += 20;
        this.player.hp = this.player.maxHp;
        this.player.maxMp += 10;
        this.player.mp = this.player.maxMp;
        // this.player.atk += 2; // Let stats handle ATK mainly? Or keep base growth. keeping base growth.
        this.player.atk += 1;

        engine.createFloatingText(`LEVEL UP! (${this.player.level})`, { x: this.player.x, y: this.player.y + 3, z: 0 }, '#ffff00');
        engine.spawnParticles(this.player.mesh.position, 'rise', 0xffff00, 30);
        engine.shake(0.5);

        // Job Advancement (Every 10 levels)
        if (this.player.level % 10 === 0) {
            this.openJobMenu();
        }
    },

    openJobMenu() {
        const el = document.getElementById('job-screen');
        const cardContainer = document.getElementById('job-cards');
        if (!el || !cardContainer) return;

        // Calculate Tier (0-9 = Base. 10-19 = Tier 1 Upgrade, etc)
        // Level 10 -> Index 0. Level 20 -> Index 1.
        const nextTierIdx = Math.floor(this.player.level / 10) - 1;

        // Safety Check
        if (typeof CLASS_TREES === 'undefined' || !CLASS_TREES[this.player.classKey]) {
            console.warn("No Class Tree found for", this.player.classKey);
            el.style.display = 'none';
            return;
        }

        const tierData = CLASS_TREES[this.player.classKey][nextTierIdx];

        // DEBUG LOGGING
        console.log("=== JOB ADVANCEMENT DEBUG ===");
        console.log("Player Level:", this.player.level);
        console.log("Player ClassKey:", this.player.classKey);
        console.log("Tier Index:", nextTierIdx);
        console.log("Tier Data:", tierData);
        console.log("Ultimate:", tierData?.ultimate);
        console.log("============================");

        if (!tierData) {
            console.log("Max Tier Reached or No Data");
            // el.style.display = 'none'; // Don't hide if we want to show 'Max Level'?
            return;
        }

        el.style.display = 'flex';
        cardContainer.innerHTML = '';

        // Create the Advancement Card
        const card = document.createElement('div');
        card.style.border = "2px solid #00f2ff";
        card.style.background = "linear-gradient(135deg, #001122, #003344)";
        card.style.padding = "20px";
        card.style.width = "300px";
        card.style.textAlign = "center";
        card.style.cursor = "pointer";
        card.style.boxShadow = "0 0 20px #00f2ff";

        // Show Ultimate Info
        const ult = tierData.ultimate || { name: "Locked", desc: "Unlock at higher tier", cd: 0 };
        const skillsHtml = `
            <div style="text-align:left; margin-top:10px; color:#ff00ff; border:1px solid #ff00ff; padding:5px;">
                <div style="font-weight:bold; font-size:14px;">UNLOCK FINAL SKILL (V)</div>
                <div style="color:#fff; font-size:16px; margin:5px 0;">${ult.name}</div>
                <div style="color:#aaa; font-size:12px;">${ult.desc}</div>
                <div style="color:#888; font-size:10px; margin-top:2px;">COOLDOWN: ${Math.floor((ult.cd || 0) / 1000)}s</div>
            </div>`;

        card.innerHTML = `
            <h2 style="color:#fff; margin:0;">${tierData.name}</h2>
            <div style="color:#00f2ff; margin-bottom:10px;">TIER ${nextTierIdx + 1} CLASS</div>
            <p style="color:#ccc; font-style:italic;">"${tierData.desc}"</p>
            <div style="background:rgba(0,0,0,0.5); padding:10px; border-radius:5px;">
                ${skillsHtml}
            </div>
            <div style="margin-top:15px; color:#ffff00; font-weight:bold;">CLICK TO EVOLVE</div>
        `;

        card.onclick = () => {
            this.applyJob(tierData);
            el.style.display = 'none';
        };
        cardContainer.appendChild(card);
    },

    applyJob(tierData) {
        engine.createFloatingText("CLASS EVOLVED!", this.player.mesh.position, '#00f2ff');
        engine.spawnParticles(this.player.mesh.position, 'explode', 0x00f2ff, 50);
        engine.shake(1.0);

        // 1. Update Title
        const hudClass = document.getElementById('hud-class-name');
        if (hudClass) hudClass.innerText = tierData.name;
        this.player.classTitle = tierData.name;

        // 2. Update Stats
        this.player.maxHp += 50;
        this.player.hp = this.player.maxHp;
        this.player.atk += 5;

        // 3. Unlock Ultimate (V)
        if (tierData.ultimate) {
            this.player.ult = tierData.ultimate;
            this.player.unlockedV = true;
            const slotV = document.getElementById('slot-v');
            if (slotV) slotV.style.display = 'flex'; // Show the V slot

            // Update HUD with Ultimate skill info
            const nameV = document.getElementById('name-v');
            const descV = document.getElementById('desc-v');
            if (nameV) nameV.innerText = tierData.ultimate.name || 'ULTIMATE';
            if (descV) descV.innerText = tierData.ultimate.desc || 'Final Skill';

            engine.createFloatingText("ULTIMATE UNLOCKED (V)!", this.player.mesh.position, '#ff00ff');
        }

    },

    mapLegacySkill(old) {
        // Default Template
        let type = 'melee';
        let anim = 'slash';
        let range = [4, 2];
        let proj = null;

        // Heuristics
        if (old.isBuff) {
            type = 'buff';
            anim = 'cast';
        } else if (old.isSummon) {
            type = 'summon';
            anim = 'cast';
        } else {
            // Attack Type Inference
            const vfx = old.vfx || '';
            if (vfx.includes('beam') || vfx.includes('bullet') || vfx.includes('zap')) {
                type = 'shoot';
                anim = 'shoot';
                proj = vfx.includes('beam') ? 'beam' : 'bullet';
            } else if (vfx.includes('nova') || vfx.includes('nuke') || vfx.includes('omni')) {
                type = 'aoe';
                anim = 'cast'; // or slam
            } else {
                type = 'melee';
                anim = 'slash';
            }
        }

        return {
            name: old.name,
            cd: 1000 + (old.cost * 50), // Rough CD mapping: 20MP -> 2000ms
            mpCost: old.cost,
            anim: anim,
            type: type,
            desc: old.desc,
            data: {
                mult: old.mult || 0,
                color: old.color || 0xffffff,
                vfx: old.vfx || 'slash',
                // Buffs
                type: old.buffType || 'atk',
                val: old.buffVal || 0,
                dur: (old.duration || 5) * 1000,
                // Summons
                hp: (old.summonStats && old.summonStats.hpMult * 100) || 50, // rough
                atk: (old.summonStats && old.summonStats.atkMult * 10) || 5,
                // Shoot
                proj: proj || 'bullet',
                speed: 1.0,
                // AOE
                radius: 6
            }
        };
    },

    useSkill(slot) {
        if (!this.player || this.player.hp <= 0) return;
        const now = Date.now();
        if (this.player.cooldowns[slot] > now) return;

        // Special handling for Ultimate (V)
        let skill;
        if (slot === 'v') {
            if (!this.player.ult) return; // Ultimate not unlocked
            skill = this.player.ult;
        } else {
            const cls = CLASS_DATA[this.player.classKey];
            skill = cls.skills[slot];
            if (!skill) return;
        }

        // MP CHECK
        const cost = skill.mpCost || 0;
        if (this.player.mp < cost) {
            // Prevent Spam: Check timestamp
            if (!this.player.noManaUntil || now > this.player.noManaUntil) {
                engine.createFloatingText("NO MANA", { x: this.player.x, y: this.player.y + 2, z: 0 }, '#5555ff');
                this.player.noManaUntil = now + 1000; // 1s cooldown for message
            }
            return;
        }

        this.player.mp -= cost;

        // COOLDOWN REDUCTION (Based on Speed or Buffs)
        const baseSpeed = 0.2;
        const speedFactor = Math.max(0.2, baseSpeed / (this.player.speed || baseSpeed));
        let finalCD = skill.cd * speedFactor;

        // Rapid Fire Override (Hacker)
        if (this.player.buffs.rapidfire > 0) finalCD = 0;

        this.player.cooldowns[slot] = now + finalCD;
        this.playAnim(this.player, skill.anim || 'cast', 400);

        switch (skill.type) {
            case 'melee': this.handleMelee(skill.data); break;
            case 'shoot': this.handleShoot(skill.data); break;
            case 'aoe': this.handleAoE(skill.data); break;
            case 'buff': this.handleBuff(skill.data); break;
            case 'dash': this.handleDash(skill.data); break;
            case 'charge_beam': this.handleChargeBeam(skill.data); break;
            case 'summon': this.handleSummon(skill.data); break;
        }
    },

    handleInteraction() {
        // Check Shopkeeper
        if (this.shopkeeper) {
            const dist = Math.abs(this.player.x - this.shopkeeper.x);
            if (dist < 2) this.openShop();
        }
    },
    playerJump() {
        if (this.player.isGrounded) {
            this.player.vy = this.JUMP_FORCE;
            this.player.isGrounded = false;
            engine.spawnParticles({ x: this.player.x, y: this.player.y - 0.5, z: 0 }, 'smoke', 0x888888, 5);
        }
    },
    usePotion() {
        if (!this.player || this.player.hp <= 0) return;
        if ((this.player.potions || 0) <= 0) {
            engine.createFloatingText("NO POTIONS", this.player.mesh.position, '#ff0000');
            return;
        }
        if (this.player.hp >= this.player.maxHp) {
            engine.createFloatingText("HP FULL", this.player.mesh.position, '#ffffff');
            return;
        }

        // Consume
        this.player.potions--;
        const heal = Math.floor(this.player.maxHp * 0.5);
        this.healPlayer(heal);
        engine.createFloatingText("POTION!", this.player.mesh.position, '#ff00aa');
        engine.spawnParticles(this.player.mesh.position, 'rise', 0xff00aa, 20); // Pink hearts?
        this.updateHUD();
    },

    handleMelee(data) {
        setTimeout(() => {
            const rangeW = data.range[0];
            const rangeH = data.range[1];
            const dmg = this.player.atk * data.mult;
            const color = data.color || 0xffffff;

            // BRAWLER COMBO HIT CHECK (Pre-calc)
            if (this.player.classKey === 'BRAWLER' && data.name === 'Punch') {
                // We do this check inside the collision loop typically, but to count "attacks" checking here
                // Actually, needs to be on HIT.
            }
            // VFX SELECTOR
            const dir = this.player.facingRight ? 1 : -1;

            if (data.vfx === 'whip') {
                // PROCEDURAL WHIP LASH
                const segs = 10;
                for (let i = 0; i < segs; i++) {
                    const t = i / segs;
                    const x = this.player.x + (dir * t * rangeW);
                    const y = this.player.y + Math.sin(t * Math.PI * 3) * 0.5; // Sine wave shape

                    // Segment
                    const geo = new THREE.BoxGeometry(0.4, 0.1, 0.1);
                    const mat = new THREE.MeshBasicMaterial({ color: color });
                    const mesh = new THREE.Mesh(geo, mat);
                    mesh.position.set(x, y, 0);
                    mesh.rotation.z = Math.cos(t * Math.PI * 3) * (dir * 0.5); // Rotate with wave

                    engine.scene.add(mesh);

                    // Animate Fade/Expand
                    setTimeout(() => {
                        mesh.scale.multiplyScalar(1.5);
                        mesh.material.transparent = true;
                        mesh.material.opacity = 0;
                    }, 50 + (i * 10));
                    setTimeout(() => engine.scene.remove(mesh), 200);
                }
                // Whip Impact Particles (at end of range)
                const impactX = this.player.x + (dir * rangeW);
                engine.spawnParticles({ x: impactX, y: this.player.y, z: 0 }, 'explode', color, 10);

            } else if (data.vfx === 'slash' || data.vfx === 'slash_h') {
                // PROCEDURAL SLASH ARC
                const curve = new THREE.EllipseCurve(
                    0, 0,            // ax, aY
                    rangeW, rangeH,  // xRadius, yRadius
                    -0.2, Math.PI / 1.5,  // aStartAngle, aEndAngle
                    false,            // aClockwise
                    0                 // aRotation
                );

                const points = curve.getPoints(10);
                const geometry = new THREE.BufferGeometry().setFromPoints(points);
                const material = new THREE.LineBasicMaterial({ color: color, linewidth: 2 });

                // Create Mesh Line (simple approximation with thin boxes or just Line)
                // Better: Create a thin curved mesh shape
                const shape = new THREE.Shape();
                shape.moveTo(0, 0);
                points.forEach(p => shape.lineTo(p.x, p.y));
                const slashGeo = new THREE.ShapeGeometry(shape);
                const slashMat = new THREE.MeshBasicMaterial({ color: color, side: THREE.DoubleSide, transparent: true, opacity: 0.8 });
                const slash = new THREE.Mesh(slashGeo, slashMat);

                slash.position.copy(this.player.mesh.position);
                slash.rotation.y = this.player.facingRight ? 0 : Math.PI;
                slash.position.x += this.player.facingRight ? 0.5 : -0.5;

                engine.scene.add(slash);

                // Animate
                let frame = 0;
                const anim = () => {
                    frame++;
                    slash.scale.multiplyScalar(1.1);
                    slash.material.opacity -= 0.1;
                    if (frame < 10) requestAnimationFrame(anim);
                    else engine.scene.remove(slash);
                };
                anim();

            } else if (data.vfx === 'punch' || data.vfx === 'nuke') {
                // SHOCKWAVE IMPACT
                const r = data.vfx === 'nuke' ? data.radius : 1.5;
                const ring = new THREE.Mesh(new THREE.RingGeometry(0.5, r, 32), new THREE.MeshBasicMaterial({ color: color, side: THREE.DoubleSide, transparent: true }));
                ring.position.set(this.player.x + (dir * 1.5), this.player.y, 0);
                engine.scene.add(ring);

                let s = 1;
                const anim = () => {
                    s += 0.2;
                    ring.scale.setScalar(s);
                    ring.material.opacity -= 0.1;
                    if (ring.material.opacity > 0) requestAnimationFrame(anim);
                    else engine.scene.remove(ring);
                };
                anim();

            } else if (data.vfx === 'glitch') {
                // DIGITAL SPIKES
                for (let i = 0; i < 5; i++) {
                    const spike = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.8 + Math.random(), 0.2), new THREE.MeshBasicMaterial({ color: color, wireframe: true }));
                    spike.position.set(this.player.x + (dir * (1 + i * 0.5)), this.player.y + (Math.random() - 0.5), 0);
                    engine.scene.add(spike);
                    setTimeout(() => engine.scene.remove(spike), 100 + i * 20);
                }
            } else {
                // Fallback (Generic Burst)
                engine.spawnParticles({ x: this.player.x + (dir * 2), y: this.player.y, z: 0 }, 'explode', color, 10);
            }

            let hitAny = false;
            this.mobs.forEach(m => {
                const dx = m.x - this.player.x;
                const dy = Math.abs(m.y - this.player.y);
                const inFront = this.player.facingRight ? dx > -1.0 : dx < 1.0; // Allow 1.0 unit behind
                // Range check: 
                // Forward: must be less than rangeW
                // Backward: already handled by inFront check (>-1.0 or <1.0)
                // We need to check if the distance *in the facing direction* is within range

                let hit = false;
                if (Math.abs(dy) < rangeH) {
                    if (this.player.facingRight) {
                        // Facing Right: dx should be > -1.0 and < rangeW
                        if (dx > -1.0 && dx < rangeW) hit = true;
                    } else {
                        // Facing Left: dx should be < 1.0 and > -rangeW
                        if (dx < 1.0 && dx > -rangeW) hit = true;
                    }
                }

                if (hit) {
                    // BRAWLER COMBO INCREMENT
                    if (this.player.classKey === 'BRAWLER' && data.name === 'Punch') {
                        if (typeof this.combo === 'undefined') this.combo = 0;
                        if (this.combo < 5) this.combo++;
                        this.updateHUD();
                        // Attack Speed Buff: Reduce Z cooldown?
                        // Simple: Just flat -100ms next punch time?
                        // Or just stats.speed?
                        // Let's just keep it simple: Damage Bonus is the main payoff.
                        // But plan said Attack Speed.
                        // We'll reduce current cooldown of Punch by 50ms * combo
                        if (this.player.cooldowns.z > Date.now()) {
                            this.player.cooldowns.z -= (50 * this.combo);
                        }
                    }

                    this.takeDamage(m, dmg, this.player);
                    // Use skill knockback or default
                    const kb = (data.knockback || 0.3);
                    m.vx = this.player.facingRight ? kb : -kb; m.vy = 0.2;
                    hitAny = true;

                    // Extra purple particles during Ultimate Mode
                    if (this.player.ultimateModeActive) {
                        engine.spawnParticles(m.mesh.position, 'explode', 0xff00ff, 15);
                    }
                }
            });
            if (hitAny && data.vfx !== 'glitch') engine.shake(0.2);

        }, 150);
    },
    handleShoot(data) {
        const count = data.count || 1;
        const spread = data.spread || 0;

        // Muzzle Flash
        engine.spawnParticles({ x: this.player.x + (this.player.facingRight ? 1 : -1), y: this.player.y + 1, z: 0 }, 'explode', 0xffff00, 5);

        // LIGHT BOW ANIMATION
        if (data.vfx === 'bow') {
            const dirX = this.player.facingRight ? 1 : -1;
            const bowGroup = new THREE.Group();

            // Refined Bow Shape (Curved Line)
            const curve = new THREE.QuadraticBezierCurve3(
                new THREE.Vector3(0, 1.5, 0),
                new THREE.Vector3(0.5, 0, 0),
                new THREE.Vector3(0, -1.5, 0)
            );
            const points = curve.getPoints(10);
            const geometry = new THREE.BufferGeometry().setFromPoints(points);
            const material = new THREE.LineBasicMaterial({ color: 0xffff00, linewidth: 2 });
            const bow = new THREE.Line(geometry, material);

            // Bowstring
            const stringGeo = new THREE.BufferGeometry().setFromPoints([
                new THREE.Vector3(0, 1.5, 0),
                new THREE.Vector3(0, -1.5, 0)
            ]);
            const string = new THREE.Line(stringGeo, new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.5 }));

            bowGroup.add(bow);
            bowGroup.add(string);

            // Position: In front of player
            bowGroup.position.set(this.player.x + (dirX * 0.8), this.player.y + 1, 0);
            if (!this.player.facingRight) bowGroup.rotation.y = Math.PI; // Flip for left

            engine.scene.add(bowGroup);

            // Animate: Scale up -> Release -> Fade
            let frame = 0;
            const animBow = () => {
                frame++;
                if (frame < 5) {
                    bowGroup.scale.multiplyScalar(1.1); // Expand
                    string.position.x = -0.2 * frame; // Pull back string check? No, manual offset better
                } else if (frame === 5) {
                    string.position.x = 0; // Release
                } else {
                    bow.material.opacity = 1 - (frame - 5) / 10;
                    string.material.opacity = 0.5 - (frame - 5) / 20;
                    if (frame > 15) {
                        engine.scene.remove(bowGroup);
                        return;
                    }
                }
                requestAnimationFrame(animBow);
            };
            animBow();
        }

        for (let i = 0; i < count; i++) {
            let vx, vy, startX;

            if (data.homing) {
                // Fire Spirits: Burst out in random directions first
                const angle = (Math.random() * Math.PI * 2);
                vx = Math.cos(angle) * data.speed;
                vy = Math.sin(angle) * data.speed;
                startX = this.player.x + vx * 2; // Start slightly away so they don't clip instantly? No, center is fine.
                // Let's spawn them at player center but moving out
                startX = this.player.x;
            } else {
                const vyOffset = (Math.random() - 0.5) * spread;
                const dirX = this.player.facingRight ? 1 : -1;
                vx = dirX * data.speed;
                vy = vyOffset;
                startX = this.player.x + dirX;
            }

            this.spawnProjectile({
                x: startX, y: this.player.y + 1,
                vx: vx, vy: vy,
                dmg: this.player.atk * data.mult, color: data.color,
                life: data.life || (data.homing ? 300 : 100),
                owner: this.player,
                projType: data.proj, // 'missile', 'bullet', 'fireball'
                homing: data.homing,
                vfx: data.vfx,
                piercing: data.piercing,
                scale: data.scale
            });
        }
    },

    // CLASS-SPECIFIC ULTIMATE VISUAL EFFECTS
    applyClassUltimateEffects(playerClass, data) {
        switch (playerClass) {
            case 'PRIEST':
                // DIVINITY: Golden pillar from heaven
                engine.screenFlash('#ffff00', 500);
                const pillar = new THREE.Mesh(
                    new THREE.CylinderGeometry(data.radius, data.radius * 0.5, 30, 32),
                    new THREE.MeshBasicMaterial({ color: 0xffff00, transparent: true, opacity: 0.6, wireframe: true })
                );
                pillar.position.set(this.player.x, 15, 0);
                engine.scene.add(pillar);
                let pf = 0;
                const animPillar = () => {
                    pf++;
                    pillar.position.y -= 0.5;
                    pillar.material.opacity = 0.6 - pf / 40;
                    if (pf < 40) requestAnimationFrame(animPillar);
                    else engine.scene.remove(pillar);
                };
                animPillar();
                engine.spawnParticles(this.player.mesh.position, 'rise', 0xffff00, 150);
                break;

            case 'MECH':
                // ORBITAL STRIKE: Red targeting laser
                engine.screenFlash('#ff0000', 300);
                engine.shake(5.0);
                const laser = new THREE.Mesh(
                    new THREE.CylinderGeometry(0.3, 0.3, 50, 8),
                    new THREE.MeshBasicMaterial({ color: 0xff0000, transparent: true, opacity: 0.8 })
                );
                laser.position.set(this.player.x, 25, 0);
                engine.scene.add(laser);
                setTimeout(() => engine.scene.remove(laser), 500);
                engine.spawnParticles(this.player.mesh.position, 'explode', 0xff4400, 250);
                break;

            case 'HACKER':
                // RED SCREEN: System crash
                engine.screenFlash('#ff0000', 400);
                engine.screenTint('#ff0000', 0.4, 3000);
                for (let i = 0; i < 20; i++) {
                    setTimeout(() => {
                        const spike = new THREE.Mesh(
                            new THREE.BoxGeometry(0.3, 2 + Math.random() * 3, 0.3),
                            new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true })
                        );
                        spike.position.set(
                            this.player.x + (Math.random() - 0.5) * data.radius * 2,
                            Math.random() * 5,
                            0
                        );
                        engine.scene.add(spike);
                        setTimeout(() => engine.scene.remove(spike), 200);
                    }, i * 50);
                }
                break;

            case 'SHADOW':
                // VOID STRIKE: Black void
                engine.screenFlash('#000000', 600);
                engine.spawnParticles(this.player.mesh.position, 'explode', 0x440088, 200);
                break;

            case 'BRAWLER':
                // METEOR STRIKE: Ground impact
                engine.screenFlash('#ff4400', 400);
                engine.shake(4.0);
                engine.spawnParticles(this.player.mesh.position, 'explode', 0xff4400, 180);
                break;

            case 'GUNSLINGER':
                // HIGH NOON: Sepia tint + time slow
                engine.screenTint('#ff8800', 0.4, 2500);
                this.mobs.forEach(m => {
                    m.baseVx = m.vx;
                    m.baseVy = m.vy;
                    m.vx *= 0.1;
                    m.vy *= 0.1;
                });
                setTimeout(() => {
                    this.mobs.forEach(m => {
                        if (m.baseVx !== undefined) {
                            m.vx = m.baseVx;
                            m.vy = m.baseVy;
                        }
                    });
                }, 2000);
                break;

            case 'SQUIRE':
                // HOLY GROUND: White barrier dome
                engine.screenFlash('#ffffff', 500);
                const dome = new THREE.Mesh(
                    new THREE.SphereGeometry(data.radius, 16, 16),
                    new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.3, wireframe: true })
                );
                dome.position.copy(this.player.mesh.position);
                engine.scene.add(dome);
                setTimeout(() => engine.scene.remove(dome), 2000);
                break;

            case 'REAPER':
                // SOUL STORM: Purple soul harvest
                engine.screenFlash('#aa00aa', 500);
                for (let i = 0; i < 30; i++) {
                    setTimeout(() => {
                        const soul = new THREE.Mesh(
                            new THREE.SphereGeometry(0.3, 8, 8),
                            new THREE.MeshBasicMaterial({ color: 0xaa00aa, transparent: true, opacity: 0.8 })
                        );
                        const angle = (i / 30) * Math.PI * 2;
                        soul.position.set(
                            this.player.x + Math.cos(angle) * data.radius,
                            this.player.y + Math.random() * 3,
                            0
                        );
                        engine.scene.add(soul);

                        let sf = 0;
                        const animSoul = () => {
                            sf++;
                            soul.position.x += (this.player.x - soul.position.x) * 0.1;
                            soul.position.y += (this.player.y - soul.position.y) * 0.1;
                            soul.material.opacity = 0.8 - sf / 30;
                            if (sf < 30) requestAnimationFrame(animSoul);
                            else engine.scene.remove(soul);
                        };
                        animSoul();
                    }, i * 30);
                }
                break;

            case 'SUMMONER':
                // STAMPEDE: Green nature fury
                engine.screenFlash('#00ff00', 400);
                engine.spawnParticles(this.player.mesh.position, 'explode', 0x00ff00, 150);
                break;

            case 'FLAME WIZARD':
                // SUPERNOVA: Massive heatwave
                engine.screenFlash('#ff4400', 600);
                engine.screenTint('#ff2200', 0.5, 4000);
                // Excessive particles
                engine.spawnParticles(this.player.mesh.position, 'explode', 0xff4400, 300);
                // Ground fissures (using slash lines logic but random)
                for (let i = 0; i < 10; i++) {
                    setTimeout(() => {
                        engine.spawnParticles({
                            x: this.player.x + (Math.random() - 0.5) * 15,
                            y: this.player.y,
                            z: 0
                        }, 'rise', 0xffff00, 5);
                    }, i * 200);
                }
                break;

            default: // RONIN
                // DIMENSION CUT: White flash
                engine.screenFlash('#ffffff', 400);
                break;
        }
    },

    handleAoE(data) {
        // ULTIMATE DETECTION: Check if this is a massive ultimate (explicit flag)
        const isUltimate = !!data.isUltimate;
        const playerClass = this.player.classKey || 'RONIN'; // Define here for both blocks

        if (isUltimate) {
            // === ULTIMATE MODE: CLASS-SPECIFIC EFFECTS ===

            // 1. CLASS-SPECIFIC VISUAL EFFECTS
            this.applyClassUltimateEffects(playerClass, data);

            // 2. EXTREME SHAKE
            engine.shake(3.0);

            // 3. FREEZE FRAME EFFECT (Brief Pause)
            const originalSpeed = this.mobs.map(m => ({ mob: m, vx: m.vx, vy: m.vy }));
            this.mobs.forEach(m => { m.vx = 0; m.vy = 0; });
            setTimeout(() => {
                originalSpeed.forEach(({ mob, vx, vy }) => {
                    if (mob.hp > 0) { mob.vx = vx; mob.vy = vy; }
                });
            }, 200);

            // 4. MASSIVE SLASH LINES (Cross Pattern)
            const createSlashLine = (angle) => {
                const line = new THREE.Mesh(
                    new THREE.PlaneGeometry(data.radius * 2, 0.5),
                    new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 1 })
                );
                line.position.copy(this.player.mesh.position);
                line.rotation.z = angle;
                engine.scene.add(line);

                let frame = 0;
                const animLine = () => {
                    frame++;
                    line.material.opacity = 1 - frame / 30;
                    line.scale.x = 1 + frame * 0.1;
                    if (frame < 30) requestAnimationFrame(animLine);
                    else engine.scene.remove(line);
                };
                animLine();
            };

            // Create 4 slash lines (cross pattern)
            createSlashLine(0);
            createSlashLine(Math.PI / 2);
            createSlashLine(Math.PI / 4);
            createSlashLine(-Math.PI / 4);

            // 5. EXPANDING SHOCKWAVE RINGS
            for (let i = 0; i < 3; i++) {
                setTimeout(() => {
                    const ring = new THREE.Mesh(
                        new THREE.RingGeometry(data.radius * 0.5, data.radius * 0.6, 32),
                        new THREE.MeshBasicMaterial({ color: 0x00ffff, transparent: true, opacity: 0.8, side: THREE.DoubleSide })
                    );
                    ring.position.copy(this.player.mesh.position);
                    ring.rotation.x = Math.PI / 2;
                    engine.scene.add(ring);

                    let f = 0;
                    const animRing = () => {
                        f++;
                        ring.scale.setScalar(1 + f * 0.2);
                        ring.material.opacity = 0.8 - f / 20;
                        if (f < 20) requestAnimationFrame(animRing);
                        else engine.scene.remove(ring);
                    };
                    animRing();
                }, i * 100);
            }

            // 6. PARTICLE EXPLOSION (200+ particles)
            engine.spawnParticles(this.player.mesh.position, 'explode', 0xffffff, 200);
            setTimeout(() => engine.spawnParticles(this.player.mesh.position, 'rise', 0x00ffff, 100), 100);

        } else if (data.vfx === 'holy_nova') {
            // === HOLY NOVA REFAB ===
            // 1. Expanding Sphere
            const sphere = new THREE.Mesh(
                new THREE.SphereGeometry(1, 32, 32),
                new THREE.MeshBasicMaterial({ color: 0xffff00, transparent: true, opacity: 0.5, wireframe: true })
            );
            sphere.position.copy(this.player.mesh.position);
            engine.scene.add(sphere);

            // Animate Sphere Expansion
            let sf = 0;
            const animSphere = () => {
                sf++;
                const scale = 1 + (sf / 20) * data.radius; // Expand to radius
                sphere.scale.setScalar(scale);
                sphere.material.opacity = 0.5 - sf / 40;
                if (sf < 20) requestAnimationFrame(animSphere);
                else engine.scene.remove(sphere);
            };
            animSphere();

            // 2. Light Avatar (Light form above player)
            const avatar = this.player.mesh.clone();
            avatar.position.set(this.player.x, this.player.y + 0.5, 0);
            avatar.scale.setScalar(1.2);
            avatar.traverse(c => {
                if (c.isMesh) {
                    c.material = new THREE.MeshBasicMaterial({ color: 0xffffaa, transparent: true, opacity: 0 });
                }
            });
            engine.scene.add(avatar);

            // Animate Avatar (Fade In -> Fade Out)
            let af = 0;
            const animAvatar = () => {
                af++;
                if (af < 20) avatar.traverse(c => { if (c.isMesh) c.material.opacity = af / 20; }); // Fade In (20 frames)
                else avatar.traverse(c => { if (c.isMesh) c.material.opacity = 0.8 - (af - 20) / 100; }); // Slow Fade Out

                avatar.position.y += 0.02; // Float up slowly

                if (af < 120) requestAnimationFrame(animAvatar); // 2 seconds (60fps)
                else engine.scene.remove(avatar);
            };
            animAvatar();

            // 3. Divine Lasers (Hit enemies from top)
            this.mobs.forEach(m => {
                const dist = new THREE.Vector3(m.x, m.y, 0).distanceTo(this.player.mesh.position);
                if (dist < data.radius) {
                    // Spawn Laser
                    const laser = new THREE.Mesh(
                        new THREE.CylinderGeometry(0.2, 0.2, 20, 8),
                        new THREE.MeshBasicMaterial({ color: 0xffff00, transparent: true, opacity: 0.8 })
                    );
                    laser.position.set(m.x, m.y + 10, 0); // Start high
                    engine.scene.add(laser);

                    // Animate Laser Strike
                    let lf = 0;
                    const animLaser = () => {
                        lf++;
                        laser.position.y -= 1.0; // Fall down
                        laser.material.opacity = 0.8 - lf / 15;
                        if (lf < 15) requestAnimationFrame(animLaser);
                        else engine.scene.remove(laser);
                    };
                    animLaser();

                    // Spark at impact
                    setTimeout(() => {
                        engine.spawnParticles(m.mesh.position, 'explode', 0xffff00, 10);
                    }, 100);
                }
            });

            engine.shake(0.5);

        } else if (data.vfx === 'brawler_slam') {
            // === BRAWLER SLAM VFX ===
            // CHECK COMBO BONUS
            let slamMult = data.mult;
            if (this.player.classKey === 'BRAWLER' && this.combo > 0) {
                const bonus = 0.5 * this.combo;
                slamMult += bonus;
                data.mult = slamMult; // Update for damage loop
                engine.createFloatingText(`FINISHER! x${slamMult.toFixed(1)}`, { x: this.player.x, y: this.player.y + 3, z: 0 }, '#ff4400', 2);
                this.combo = 0; // Consume Stacks
                this.updateHUD();
            }

            // 1. Fighting Spirit (Red Avatar)
            const spirit = this.player.mesh.clone();
            spirit.position.set(this.player.x, this.player.y, 0); // Overlap
            spirit.scale.setScalar(1.4); // Bigger
            spirit.traverse(c => {
                if (c.isMesh) {
                    c.material = new THREE.MeshBasicMaterial({ color: 0xff4400, transparent: true, opacity: 0.6, wireframe: true });
                }
            });
            engine.scene.add(spirit);

            // Animate Spirit (Vibrate & Fade)
            let sf = 0;
            const animSpirit = () => {
                sf++;
                spirit.position.x = this.player.x + (Math.random() - 0.5) * 0.2;
                spirit.position.y = this.player.y + (Math.random() - 0.5) * 0.2;
                spirit.scale.multiplyScalar(1.01); // Grow slightly
                spirit.traverse(c => { if (c.isMesh) c.material.opacity = 0.6 - sf / 20; });

                if (sf < 20) requestAnimationFrame(animSpirit);
                else engine.scene.remove(spirit);
            };
            animSpirit();

            // 2. Massive Ground Impact (Crater Ring)
            const ring = new THREE.Mesh(
                new THREE.RingGeometry(1, data.radius, 32),
                new THREE.MeshBasicMaterial({ color: 0xff8800, transparent: true, opacity: 0.8, side: THREE.DoubleSide })
            );
            ring.position.set(this.player.x, this.player.y + 0.5, 0);
            engine.scene.add(ring);

            let rf = 0;
            const animRing = () => {
                rf++;
                ring.scale.setScalar(1 + rf * 0.1);
                ring.material.opacity = 0.8 - rf / 15;
                if (rf < 15) requestAnimationFrame(animRing);
                else engine.scene.remove(ring);
            };
            animRing();

            // 3. Debris (Rocks flying up)
            for (let i = 0; i < 8; i++) {
                const rock = new THREE.Mesh(
                    new THREE.BoxGeometry(0.3, 0.3, 0.3),
                    new THREE.MeshBasicMaterial({ color: 0x553300 })
                );
                // Random position within radius
                const angle = Math.random() * Math.PI * 2;
                const r = Math.random() * (data.radius * 0.8);
                rock.position.set(this.player.x + Math.cos(angle) * r, this.player.y, 0);

                engine.scene.add(rock);

                const vx = (Math.random() - 0.5) * 0.5;
                const vy = 0.5 + Math.random();

                // Closure for animation
                let rockFrame = 0;
                const animRock = () => {
                    rockFrame++;
                    rock.position.x += vx;
                    rock.position.y += vy - (rockFrame * 0.05); // Gravity
                    rock.rotation.z += 0.2;

                    // Remove when below ground or too long
                    if (rock.position.y < this.player.y - 2 || rockFrame > 60) {
                        engine.scene.remove(rock);
                    } else {
                        requestAnimationFrame(animRock);
                    }
                };
                animRock();
            }

            engine.shake(1.5); // Heavy shake

        } else if (data.vfx === 'ring_fire' || data.vfx === 'ring_fire_heavy') {
            // === INFERNO / HELLFIRE ===
            const isHeavy = data.vfx === 'ring_fire_heavy';
            const color = isHeavy ? 0xff0000 : 0xff4400;

            // Expanding Fire Ring
            const ring = new THREE.Mesh(
                new THREE.RingGeometry(0.5, data.radius, 32),
                new THREE.MeshBasicMaterial({ color: color, side: THREE.DoubleSide, transparent: true, opacity: 0.8 })
            );
            ring.position.set(this.player.x, this.player.y + 0.1, 0);
            ring.rotation.x = -Math.PI / 2;
            engine.scene.add(ring);

            // Expansion Animation
            let rf = 0;
            const animFire = () => {
                rf++;
                const scale = 1 + (rf / 20) * 0.5;
                ring.scale.setScalar(scale);
                ring.material.opacity = 0.8 - rf / 30;

                // Spawn fire particles along the ring edge
                if (rf % 2 === 0) {
                    const angle = Math.random() * Math.PI * 2;
                    const r = data.radius * scale;
                    // We need world coords for particles
                    // ring.position is center.
                    const px = this.player.x + Math.cos(angle) * r;
                    const py = this.player.y;
                    const pz = Math.sin(angle) * r; // Z in 3D is Y in 2D plane? No, Z is depth.
                    // Wait, game is 2D side scroller visually but used 3D coords?
                    // Player is at z=0. Ring is rotated X -90. So Ring Z is Player Z (depth).
                    // Actually, let's stick to spawnParticles standard 2D logic: x, y, z=0
                    // But for a ring on the ground...
                    // The game seems to be 2.5D. 
                    // Let's spawn particles moving UP from the ground.

                    // Simple: particles at random pos in radius
                    engine.spawnParticles({
                        x: this.player.x + (Math.random() - 0.5) * data.radius * 2,
                        y: this.player.y + Math.random() * 2,
                        z: (Math.random() - 0.5) * 2
                    }, 'rise', color, 2);
                }

                if (rf < 30) requestAnimationFrame(animFire);
                else engine.scene.remove(ring);
            };
            animFire();
            engine.shake(0.5);

        } else if (data.vfx === 'meteor_strike') {
            // === METEOR STRIKE (Ultimate or Heavy Skill) ===
            // 1. Warning Marker
            engine.screenFlash('#ff8800', 200);
            const marker = new THREE.Mesh(
                new THREE.RingGeometry(0.5, data.radius, 32),
                new THREE.MeshBasicMaterial({ color: 0xff0000, side: THREE.DoubleSide, transparent: true, opacity: 0.5 })
            );
            marker.position.set(this.player.x + (this.player.facingRight ? 5 : -5), this.player.y + 0.1, 0); // Aimed ahead? Or self?
            // Let's make it self-centered for now or screen centered? 
            // Logic says AoE usually self-centered in this codebase unless projectile. 
            // Let's put it on player.
            marker.position.set(this.player.x, this.player.y + 0.1, 0);
            marker.rotation.x = -Math.PI / 2;
            engine.scene.add(marker);

            // 2. Meteor Fall (Delayed)
            setTimeout(() => {
                engine.scene.remove(marker);

                // Giant Sphere
                const meteor = new THREE.Mesh(
                    new THREE.SphereGeometry(4, 16, 16),
                    new THREE.MeshBasicMaterial({ color: 0xff4400, wireframe: true })
                );
                meteor.position.set(this.player.x, this.player.y + 20, 0);
                engine.scene.add(meteor);

                // Fall Animation
                let mf = 0;
                const animMeteor = () => {
                    mf++;
                    meteor.position.y -= 1.0; // Fast fall
                    meteor.rotation.x += 0.1;
                    meteor.rotation.z += 0.1;

                    if (meteor.position.y <= this.player.y) {
                        // IMPACT
                        engine.scene.remove(meteor);
                        engine.shake(4.0);
                        engine.screenFlash('#ffffff', 500);
                        engine.spawnParticles(this.player.mesh.position, 'explode', 0xff4400, 100);
                        engine.spawnParticles(this.player.mesh.position, 'spark', 0xffff00, 50);

                        // Damage is handled by the main loop below (radius check)
                        // But we delayed the impact visual... damage should technically coincide.
                        // The takeDamage call below happens IMMEDIATELY when function is called.
                        // This visual is "late". 
                        // For 'cast' type skills, ideally we await impact.
                        // But 'handleAoE' is called in 'useSkill'.
                        // If we want delayed damage, we should move the damage loop into the timeout.
                        // For now, I'll sync visual to be fast enough or accept the disconnect (Explosion magic).
                        // Actually, let's keep it simple. Instant damage (the heatwave), then meteor finishes them off visually.
                    } else {
                        requestAnimationFrame(animMeteor);
                    }
                };
                animMeteor();
            }, 100);

        } else {
            // === NORMAL AOE MODE ===
            const vfx = new THREE.Mesh(
                new THREE.SphereGeometry(data.radius, 16, 16),
                new THREE.MeshBasicMaterial({ color: data.color, wireframe: true })
            );
            vfx.position.copy(this.player.mesh.position);
            engine.scene.add(vfx);
            let f = 0;
            const anim = () => {
                f++;
                vfx.scale.setScalar(1 + f * 0.1);
                vfx.material.opacity = 1 - f / 20;
                if (f < 20) requestAnimationFrame(anim);
                else engine.scene.remove(vfx);
            };
            anim();

            engine.spawnParticles(this.player.mesh.position, 'explode', data.color, 30);
            engine.shake(0.3);
        }

        // DAMAGE APPLICATION (Both modes)
        let totalDamage = 0;
        let hitCount = 0;
        this.mobs.forEach(m => {
            const dist = new THREE.Vector3(m.x, m.y, 0).distanceTo(this.player.mesh.position);
            if (dist < data.radius) {
                const dmg = this.player.atk * data.mult;
                if (data.mult > 0) {
                    this.takeDamage(m, dmg, this.player);
                    totalDamage += dmg;
                    hitCount++;
                }
                if (data.dot) m.status.dot += data.dot;
                if (data.slow) m.status.slow += data.slow;
                if (data.lifesteal) this.healPlayer(dmg * data.lifesteal);
                const dir = m.x > this.player.x ? 1 : -1; m.vx = dir * 0.4; m.vy = 0.4;
            }
        });

        // ULTIMATE MODE: Activate 30s Power-Up
        if (isUltimate) {
            // Clear any existing ultimate mode
            if (this.player.ultimateModeTimer) clearTimeout(this.player.ultimateModeTimer);
            if (this.player.ultimateModeInterval) clearInterval(this.player.ultimateModeInterval);

            // Store original stats
            if (!this.player.ultimateModeActive) {
                this.player.baseAtk = this.player.atk;
                this.player.baseSpeed = this.player.speed;
            }

            // Apply Buffs (Class-Specific)
            this.player.atk = this.player.baseAtk * 2.0; // 2x ATK (default)
            this.player.speed = this.player.baseSpeed * 1.5; // 1.5x Speed (default)
            this.player.ultimateModeActive = true;
            this.player.ultimateModeClass = playerClass; // Store for later reference

            // Class-Specific Power-Up Colors & Buffs
            let powerColor = 0xff00ff; // Default purple
            let particleColor = 0xff00ff;
            let modeText = "ULTIMATE MODE!";

            switch (playerClass) {
                case 'PRIEST':
                    powerColor = 0xffff00; // Golden
                    particleColor = 0xffff00;
                    modeText = "DIVINE MODE!";
                    // Healing aura (regen)
                    this.player.ultimateModeHealInterval = setInterval(() => {
                        if (this.player && this.player.hp < this.player.maxHp) {
                            this.healPlayer(5); // 5 HP/s
                        }
                    }, 1000);
                    break;
                case 'MECH':
                    powerColor = 0xff4400; // Red-hot
                    particleColor = 0xff4400;
                    modeText = "OVERHEATED!";
                    this.player.explosiveProjectiles = true;
                    break;
                case 'HACKER':
                    powerColor = 0x00ff00; // Green
                    particleColor = 0x00ff00;
                    modeText = "SYSTEM OVERRIDE!";
                    this.player.rapidFire = true; // Infinite cooldowns handled elsewhere
                    break;
                case 'SHADOW':
                    powerColor = 0x440088; // Dark purple
                    particleColor = 0xaa00ff;
                    modeText = "VOID MODE!";
                    this.player.criticalMode = true; // 100% crit
                    break;
                case 'BRAWLER':
                    powerColor = 0xff5500; // Orange
                    particleColor = 0xff8800;
                    modeText = "TITAN MODE!";
                    this.player.mesh.scale.setScalar(1.2); // Grow 20%
                    break;
                case 'GUNSLINGER':
                    powerColor = 0xffaa00; // Golden
                    particleColor = 0xffdd00;
                    modeText = "DEADEYE MODE!";
                    this.player.dualWield = true; // Fire 2 projectiles
                    break;
                case 'SQUIRE':
                    powerColor = 0xffffff; // White
                    particleColor = 0xffffff;
                    modeText = "HOLY MODE!";
                    this.player.damageShield = 500; // Absorb 500 damage
                    break;
                case 'REAPER':
                    powerColor = 0xaa00aa; // Purple
                    particleColor = 0xaa00aa;
                    modeText = "VAMPIRE MODE!";
                    this.player.vampireMode = true; // 100% lifesteal
                    break;
                case 'SUMMONER':
                    powerColor = 0x00aa88; // Green
                    particleColor = 0x00ffaa;
                    modeText = "BEAST MODE!";
                    this.player.summonBoost = 2.0; // 2x summon damage

                    // Summon Mini-Igris!
                    engine.createFloatingText("ARISE!", { x: this.player.x, y: this.player.y + 3, z: 0 }, '#440088');
                    engine.spawnParticles({ x: this.player.x + 2, y: this.player.y, z: 0 }, 'explode', 0x440088, 30);

                    const miniIgrisModel = Models.createIgris(0.6); // 60% size
                    const miniIgris = {
                        mesh: miniIgrisModel.mesh,
                        limbs: this.cacheLimbs(miniIgrisModel.mesh),
                        x: this.player.x + 2, y: this.player.y + 1,
                        vx: 0, vy: 0, hp: 500, maxHp: 500, atk: 50,
                        isGrounded: false, type: 'MINI_IGRIS', owner: this.player,
                        animState: { current: 'idle', time: 0, duration: 0 },
                        life: 600, // 10 seconds
                        isBoss: false, // Not a real boss, but uses boss-like AI
                        aiTimer: 0
                    };
                    this.summons.push(miniIgris);
                    engine.scene.add(miniIgris.mesh);
                    engine.updateEntityUI(miniIgris);
                    break;
                default: // RONIN
                    powerColor = 0xff00ff; // Purple
                    particleColor = 0xff00ff;
                    modeText = "BLADE MODE!";
                    break;
            }

            // Save original colors, then change to power color
            this.savePlayerModelColors();
            this.setPlayerModelColor(powerColor);

            // Continuous Aura Particles
            this.player.ultimateModeInterval = setInterval(() => {
                if (this.player && this.player.mesh) {
                    engine.spawnParticles(this.player.mesh.position, 'rise', particleColor, 5);
                }
            }, 100);

            // Floating Text
            engine.createFloatingText(modeText, { x: this.player.x, y: this.player.y + 3, z: 0 }, `#${powerColor.toString(16).padStart(6, '0')}`, 2000);

            // Expire after 30s
            this.player.ultimateModeTimer = setTimeout(() => {
                if (this.player) {
                    // Restore stats
                    this.player.atk = this.player.baseAtk;
                    this.player.speed = this.player.baseSpeed;
                    this.player.ultimateModeActive = false;

                    // Restore original colors (entire model including weapon)
                    this.restorePlayerModelColors();

                    // Stop particles
                    if (this.player.ultimateModeInterval) {
                        clearInterval(this.player.ultimateModeInterval);
                        this.player.ultimateModeInterval = null;
                    }

                    // Clear class-specific buffs
                    if (this.player.ultimateModeHealInterval) {
                        clearInterval(this.player.ultimateModeHealInterval);
                        this.player.ultimateModeHealInterval = null;
                    }
                    this.player.explosiveProjectiles = false;
                    this.player.rapidFire = false;
                    this.player.criticalMode = false;
                    this.player.dualWield = false;
                    this.player.damageShield = 0;
                    this.player.vampireMode = false;
                    this.player.summonBoost = 1.0;

                    // Reset size for Brawler
                    if (this.player.ultimateModeClass === 'BRAWLER' && this.player.mesh) {
                        this.player.mesh.scale.setScalar(1.0);
                    }

                    engine.createFloatingText("Ultimate Mode Ended", { x: this.player.x, y: this.player.y + 2, z: 0 }, '#888888');
                }
            }, 30000); // 30 seconds
        }

        if (data.heal) this.healPlayer(data.heal);
    },
    handleBuff(data) {
        if (data.type === 'shield') { this.player.buffs.shield += data.val; engine.createFloatingText(`SHIELD`, this.player.mesh.position, '#0000ff'); }
        else if (data.type === 'heal') { this.healPlayer(this.player.maxHp * data.val); }
        else if (data.type === 'atk') { this.player.atk *= data.val; setTimeout(() => this.player.atk /= data.val, data.dur); engine.createFloatingText(`PWR UP`, this.player.mesh.position, '#ff0000'); }
        else if (data.type === 'invuln') { this.player.invulnTimer = (data.dur / 1000) * 60; engine.createFloatingText(`INVULN`, this.player.mesh.position, '#ffffff'); }
        else if (data.type === 'rapidfire') { this.player.buffs.rapidfire = data.dur; engine.createFloatingText(`OVERCLOCK`, this.player.mesh.position, '#00ff00'); }
        else if (data.type === 'iron_will') {
            this.player.buffs.shield += data.shieldVal;
            const originalAtk = this.player.atk;
            this.player.atk *= data.atkVal;
            setTimeout(() => this.player.atk = Math.max(originalAtk, this.player.atk / data.atkVal), data.dur);
            engine.createFloatingText(`IRON WILL`, this.player.mesh.position, '#ff5500');
        }
        else if (data.type === 'phoenix') {
            // PHOENIX FORM: Speed + Burn Aura
            this.player.speed *= data.val;
            engine.createFloatingText("PHOENIX FORM", this.player.mesh.position, '#ff4400');

            const interval = setInterval(() => {
                // Aura Visuals
                engine.spawnParticles({
                    x: this.player.x + (Math.random() - 0.5),
                    y: this.player.y + 1 + (Math.random() - 0.5),
                    z: 0
                }, 'rise', 0xffaa00, 2);

                // Aura Damage (Burn nearby)
                this.mobs.forEach(m => {
                    const d = Math.abs(m.x - this.player.x);
                    if (d < 3) {
                        this.takeDamage(m, this.player.atk * 0.2, this.player);
                    }
                });
            }, 500);

            setTimeout(() => {
                this.player.speed /= data.val;
                clearInterval(interval);
                engine.createFloatingText("Phoenix Ended", this.player.mesh.position, '#888888');
            }, data.dur);
        }

        engine.spawnParticles(this.player.mesh.position, 'rise', 0xffffff, 15);
    },
    createGhost(entity) {
        if (!entity.mesh) return;
        const ghost = entity.mesh.clone();
        ghost.position.copy(entity.mesh.position);
        ghost.rotation.copy(entity.mesh.rotation);
        ghost.traverse(c => {
            if (c.isMesh) {
                c.material = c.material.clone();
                c.material.transparent = true;
                c.material.opacity = 0.5;
                c.material.color.setHex(0x00ffff); // Cyan Ghost
            }
        });
        engine.scene.add(ghost);

        // Animate Fade
        let op = 0.5;
        const anim = () => {
            op -= 0.05;
            ghost.traverse(c => { if (c.isMesh) c.material.opacity = op; });
            if (op <= 0) engine.scene.remove(ghost);
            else requestAnimationFrame(anim);
        };
        anim();
    },

    handleDash(data) {
        const dir = this.player.facingRight ? 1 : -1;
        const speed = data.speed || 2.0;
        this.player.vx = dir * speed;
        this.player.isDashing = true;
        setTimeout(() => this.player.isDashing = false, 300);

        if (data.invuln) this.player.invulnTimer = (data.invuln / 1000) * 60;

        // Visuals
        const color = data.color || 0x00ffff;
        engine.spawnParticles(this.player.mesh.position, 'smoke', color, 10);

        // Trail VFX
        const trailVfx = data.vfx === 'fire_dash' || data.vfx === 'fire_dash_heavy' ? 'rise' : 'slash_h';
        const trailColor = (data.vfx === 'fire_dash' || data.vfx === 'fire_dash_heavy') ? 0xff4400 : color;

        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                engine.spawnParticles({
                    x: this.player.x + (dir * i * 2),
                    y: this.player.y,
                    z: 0
                }, trailVfx, trailColor, 5);

                if (data.vfx === 'fire_dash_heavy') {
                    engine.spawnParticles({
                        x: this.player.x + (dir * i * 2),
                        y: this.player.y,
                        z: 0
                    }, 'spark', 0xffff00, 3);
                }
            }, i * 50);
        }

        // Spawn Ghosts
        for (let i = 0; i < 5; i++) {
            setTimeout(() => this.createGhost(this.player, color), i * 50);
        }

        // DAMAGE: Cut through enemies
        const rangeW = 8; // Dash distance approx
        const rangeH = 2;

        // Damage Multiplier (Default 2.0x if not specified)
        const mult = data.mult !== undefined ? data.mult : 2.0;

        this.mobs.forEach(m => {
            const dx = m.x - this.player.x;
            const dy = Math.abs(m.y - this.player.y);
            const inFront = this.player.facingRight ? dx > 0 : dx < 0;
            if (inFront && Math.abs(dx) < rangeW && dy < rangeH) {
                this.takeDamage(m, this.player.atk * mult, this.player);
                m.vx = dir * 1.0; // Knockback with dash

                if (data.vfx === 'fire_dash' || data.vfx === 'fire_dash_heavy') {
                    engine.spawnParticles(m.mesh.position, 'explode', 0xff4400, 10);
                } else {
                    engine.spawnParticles(m.mesh.position, 'slash', color, 10);
                }
            }
        });
    },
    handleSummon(data) {
        // Smoke Poof
        engine.spawnParticles({ x: this.player.x + (Math.random() - 0.5) * 2, y: this.player.y + 2, z: 0 }, 'explode', 0xffffff, 15);

        const minion = {
            mesh: Models.createMinion(data.color, 0.8, 0, 'MINION').mesh,
            x: this.player.x + (Math.random() - 0.5) * 2, y: this.player.y + 2,
            vx: 0, vy: 0, hp: data.hp, maxHp: data.hp, atk: data.atk,
            isGrounded: false, type: data.type, owner: this.player, aiTimer: 0,
            vx: 0, vy: 0, hp: data.hp, maxHp: data.hp, atk: data.atk,
            isGrounded: false, type: data.type, owner: this.player, aiTimer: 0,
            animState: { current: 'idle', time: 0, duration: 0 },
            life: (data.duration || 60) * 60 // Seconds to frames
        };
        minion.limbs = this.cacheLimbs(minion.mesh);
        this.summons.push(minion);
        engine.scene.add(minion.mesh);
        engine.updateEntityUI(minion);
    },
    spawnProjectile(opts) {
        const geo = opts.projType === 'beam' ? new THREE.BoxGeometry(0.8, 0.2, 0.2) : new THREE.SphereGeometry(0.3, 4, 4);
        const mesh = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ color: opts.color || 0xffff00 }));
        mesh.position.set(opts.x, opts.y, 0);
        engine.scene.add(mesh);
        this.projectiles.push({ mesh, ...opts });
    },
    healPlayer(amount) {
        this.player.hp = Math.min(this.player.maxHp, this.player.hp + amount);
        engine.createFloatingText(`+${Math.floor(amount)}`, this.player.mesh.position, '#00ff00');
        engine.updateEntityUI(this.player);
        engine.spawnParticles(this.player.mesh.position, 'rise', 0x00ff00, 10);
    },
    takeDamage(entity, amount, source) {
        if (!entity || entity.hp <= 0) return;
        if (entity.buffs && entity.buffs.shield > 0) {
            const block = Math.min(entity.buffs.shield, amount);
            entity.buffs.shield -= block; amount -= block;
            if (amount <= 0) { engine.createFloatingText("BLOCK", entity.mesh.position, '#0000ff'); return; }
        }
        entity.hp -= amount;
        engine.createFloatingText(`-${Math.floor(amount)}`, entity.mesh.position, '#ff0000');
        engine.updateEntityUI(entity);
        entity.mesh.traverse(c => {
            if (c.isMesh && c.material) {
                // Shared Material Check: Only flash if not already flashing
                if (!c.material.userData.flashActive) {
                    c.material.userData.flashActive = true;
                    c.material.userData.origColor = c.material.color.getHex();
                    c.material.color.setHex(0xffffff);

                    setTimeout(() => {
                        if (c.material) {
                            c.material.color.setHex(c.material.userData.origColor);
                            c.material.userData.flashActive = false;
                        }
                    }, 50);
                }
            }
        });

        if (entity === this.boss) this.updateBossUI();

        // Knockback Logic
        if (source) {
            const dir = entity.x > source.x ? 1 : -1;
            const force = ((source.knockback || 0.5) * 0.8); // when enemies are hit by long range attack
            entity.vx = dir * force;
            entity.vy = 0.25 * force; // Slight pop up

            // STUN to prevent immediate overwrite of velocity
            entity.stunned = true;
            entity.stunTimer = 15; // Frames (approx 0.25s)
        }

        // Blood/Sparks
        engine.spawnParticles(entity.mesh.position, 'explode', 0xff0000, 5);

        if (entity.hp <= 0) this.killEntity(entity);
    },
    killEntity(entity) {
        engine.scene.remove(entity.mesh);
        if (entity.hpBar && entity.hpBar.el) entity.hpBar.el.remove();
        engine.spawnParticles(entity.mesh.position, 'explode', 0xff0000, 20); // Big death explosion

        if (entity === this.boss) {
            document.getElementById('boss-hud').style.display = 'none';
            this.boss = null;
        }

        if (entity === this.player) {
            engine.createFloatingText("DIED", { x: 0, y: 0, z: 0 }, '#ff0000');
            setTimeout(() => this.respawnPlayer(), 2000);
        } else {
            // Is Mob? Grant XP & Gold
            const isMob = this.mobs.includes(entity);
            if (isMob) {
                // TESTING: 100x XP
                const xpGain = entity.xpValue || (20 * (1 + (this.currentLevel - 1) * 0.2));
                this.gainXp(Math.floor(xpGain));

                // Gold Drop
                const gold = entity.goldValue || 10;
                this.player.gold = (this.player.gold || 0) + gold;
                engine.createFloatingText(`+${gold} G`, entity.mesh.position, '#ffd700');
            }

            let idx = this.mobs.indexOf(entity); if (idx > -1) this.mobs.splice(idx, 1);
            idx = this.summons.indexOf(entity); if (idx > -1) this.summons.splice(idx, 1);

            // Check Level Clear (If no shop)
            if (this.mobs.length === 0 && this.summons.filter(s => s.owner !== this.player).length === 0 && !this.shopkeeper) {
                if (!this.portal) this.spawnPortal();
            }
        }
    },
    checkPlatformCollisions(entity) {
        if (entity.vy > 0) return;
        if (entity.ignorePlatforms) return; // Drop down mechanic
        if (entity.y <= this.GROUND_Y) { entity.y = this.GROUND_Y; entity.vy = 0; entity.isGrounded = true; return; }
        for (let p of this.platforms) {
            if (entity.x >= p.x - p.width / 2 && entity.x <= p.x + p.width / 2) {
                if (Math.abs(entity.y - (p.y + 0.25)) < 0.5) { entity.y = p.y + 0.25; entity.vy = 0; entity.isGrounded = true; return; }
            }
        }
        entity.isGrounded = false;
    },
    checkEntityCollisions() {
        // COLLISIONS DISABLED AS REQUESTED
        return;
    },

    // --- LEVEL PROGRESSION ---
    currentLevel: 1,
    portal: null,

    spawnPortal() {
        if (this.portal) return;

        // Group for the portal
        const group = new THREE.Group();
        group.position.set(40, 3, 0);

        // 1. Outer Ring (The Gate)
        const ringGeo = new THREE.TorusGeometry(3, 0.3, 16, 32);
        const ringMat = new THREE.MeshBasicMaterial({ color: 0x00ffff }); // Cyan
        const ring = new THREE.Mesh(ringGeo, ringMat);
        group.add(ring);

        // 2. Inner Event Horizon (The Swirl)
        const coreGeo = new THREE.IcosahedronGeometry(2.5, 1);
        const coreMat = new THREE.MeshBasicMaterial({
            color: 0x0000ff,
            wireframe: true,
            transparent: true,
            opacity: 0.5
        });
        const core = new THREE.Mesh(coreGeo, coreMat);
        group.add(core);

        engine.scene.add(group);

        // Portal Particles
        engine.spawnParticles(group.position, 'rise', 0x00ffff, 40);
        engine.createFloatingText("PORTAL OPEN", { x: 0, y: 3, z: 0 }, '#00ffff');

        this.portal = { mesh: group, ring: ring, core: core, x: 40, y: 3 };
    },

    nextLevel() {
        this.currentLevel++;
        engine.createFloatingText(`FLOOR ${this.currentLevel}`, { x: 0, y: 0, z: 0 }, '#ffffff');

        const hudFloor = document.getElementById('hud-floor');
        if (hudFloor) hudFloor.innerText = `FLOOR ${this.currentLevel}`;
        const hudDepth = document.getElementById('hud-depth');
        if (hudDepth) hudDepth.innerText = `${this.currentLevel * 10}`;

        // Reset Position
        this.player.x = -40;
        this.player.y = 5;
        this.player.vx = 0;

        this.portal = null; // Cleared in resetGame often, but just in case
        this.resetGame();
        this.setupLevel();
        // Re-add player to scene (resetGame clears scene)
        engine.scene.add(this.player.mesh);

        this.spawnMobs();
    },

    respawnPlayer() {
        // Go back 1 floor (min 1)
        this.currentLevel = Math.max(1, this.currentLevel - 1);

        this.mobs = [];
        this.summons = [];
        this.projectiles = [];
        this.boss = null;
        document.getElementById('boss-hud').style.display = 'none';

        engine.createFloatingText(`RESPAWNED - FLOOR ${this.currentLevel}`, { x: 0, y: 0, z: 0 }, '#ffff00');

        // Reset Stats
        this.player.hp = this.player.maxHp;
        this.player.mp = this.player.maxMp;
        this.player.xp = 0; // Lost XP
        // Keep Level, Gold, Items (if any)

        // UI Updates
        const hudFloor = document.getElementById('hud-floor');
        if (hudFloor) hudFloor.innerText = `FLOOR ${this.currentLevel}`;
        const hudDepth = document.getElementById('hud-depth');
        if (hudDepth) hudDepth.innerText = `${this.currentLevel * 10}`;
        this.updateHUD(); // Clears XP bar visual

        // Reset Position & Game
        this.player.x = -40;
        this.player.y = 5;
        this.player.vx = 0;
        this.player.invulnTimer = 180; // 3s invuln on respawn

        this.portal = null;
        this.resetGame();
        this.setupLevel();
        engine.scene.add(this.player.mesh);
        this.spawnMobs();
    },

    update() {
        if (!this.player || this.player.hp <= 0) return;

        const spd = this.player.speed;
        if (!this.player.isDashing && !this.player.stunned) {
            if (this.keys['ArrowLeft']) { this.player.vx = -spd; this.player.facingRight = false; }
            else if (this.keys['ArrowRight']) { this.player.vx = spd; this.player.facingRight = true; }
            else this.player.vx *= 0.8;
        } else if (this.player.stunned) {
            this.player.vx *= 0.5; // Slow down when stunned
        }

        this.player.vy -= this.GRAVITY; this.player.x += this.player.vx; this.player.y += this.player.vy;

        // Borders
        if (this.mobs.length === 0 && this.summons.filter(s => s.owner !== this.player).length === 0 && !this.shopkeeper) {
            if (!this.portal) this.spawnPortal();
        }

        this.checkPlatformCollisions(this.player);
        this.checkEntityCollisions(); // Collision Step

        this.player.mesh.position.set(this.player.x, this.player.y, 0);
        const rotY = this.player.facingRight ? Math.PI / 2 : -Math.PI / 2;
        this.player.mesh.rotation.y += (rotY - this.player.mesh.rotation.y) * 0.2;
        this.updateAnim(this.player);
        if (this.player.invulnTimer > 0) this.player.invulnTimer--;

        // Handle Stun Timer
        if (this.player.stunned) {
            if (this.player.stunTimer > 0) this.player.stunTimer--;
            else this.player.stunned = false;
        }
        // Rapid Fire Buff
        if (this.player.buffs.rapidfire > 0) {
            this.player.buffs.rapidfire -= 16; // ms per frame approx
            if (Math.random() < 0.2) engine.spawnParticles(this.player.mesh.position, 'spark', 0xffff00, 2);
        }

        // Skill Auto-Fire Logic
        if (this.keys['KeyZ']) this.useSkill('z');
        if (this.keys['KeyX']) this.useSkill('x');
        if (this.keys['KeyC']) this.useSkill('c');
        if (this.keys['KeyV']) this.useSkill('v');

        // Update UI for Player
        // engine.updateEntityUI(this.player); // Floating UI not needed for player
        this.updateHUD();
        // MP Regen
        if (this.player.mp < this.player.maxMp) this.player.mp += this.player.mpRegen;
        // HP Regen
        if (this.player.hp < this.player.maxHp) this.player.hp += this.player.hpRegen;

        // Level Logic
        if (this.mobs.length === 0 && this.summons.filter(s => s.owner !== this.player).length === 0) {
            if (!this.portal) this.spawnPortal();
        }

        // Portal Collision
        if (this.portal) {
            const dist = Math.abs(this.player.x - this.portal.x);
            if (dist < 2 && Math.abs(this.player.y - this.portal.y) < 3) {
                this.nextLevel();
                return; // Skip rest of frame
            }
            // Portal Spin Effect
            if (this.portal.ring) this.portal.ring.rotation.z -= 0.02;
            if (this.portal.core) {
                this.portal.core.rotation.x += 0.05;
                this.portal.core.rotation.y += 0.05;
            }

            if (Math.random() < 0.2) {
                // Suction particles
                const angle = Math.random() * Math.PI * 2;
                const r = 3;
                engine.spawnParticles({
                    x: this.portal.x + Math.cos(angle) * r,
                    y: this.portal.y + Math.sin(angle) * r,
                    z: 0
                }, 'spark', 0x00ffff, 1);
            }
        }

        // Projectiles
        for (let i = this.projectiles.length - 1; i >= 0; i--) {
            const p = this.projectiles[i];
            p.x += p.vx; p.y += p.vy;
            p.mesh.position.set(p.x, p.y, 0);

            // Rotate projectile to match velocity
            if (p.vx !== 0 || p.vy !== 0) {
                const angle = Math.atan2(p.vy, p.vx);
                p.mesh.rotation.z = angle;
            }

            // HOMING LOGIC
            if (p.homing) {
                // Find closest target
                let target = null;
                let minDist = 1000; // Map wide
                const targets = p.owner === this.player ? this.mobs : [this.player, ...this.summons];

                targets.forEach(t => {
                    const d = Math.abs(t.x - p.x) + Math.abs(t.y - p.y); // Manhattan dist ok for quick check
                    if (d < minDist && t.hp > 0) {
                        minDist = d;
                        target = t;
                    }
                });

                if (target) {
                    const dx = target.x - p.x;
                    const dy = (target.y + 1) - p.y; // Aim for center
                    // Steer towards target
                    // Simple steering: adjust VX/VY
                    const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
                    // Desired Dir
                    const angleTo = Math.atan2(dy, dx);
                    const currentAngle = Math.atan2(p.vy, p.vx);

                    // Turn rate
                    let diff = angleTo - currentAngle;
                    // Normalize -PI to PI
                    while (diff < -Math.PI) diff += Math.PI * 2;
                    while (diff > Math.PI) diff -= Math.PI * 2;

                    const maxTurn = 0.1; // Turn speed
                    const turn = Math.max(-maxTurn, Math.min(maxTurn, diff));

                    const newAngle = currentAngle + turn;
                    p.vx = Math.cos(newAngle) * speed;
                    p.vy = Math.sin(newAngle) * speed;
                }
            }

            p.life--;

            // Trails
            if (p.projType === 'missile') engine.spawnParticles(p.mesh.position, 'smoke', 0x555555, 1);
            else if (p.projType === 'fireball' || p.projType === 'fireball_large') {
                engine.spawnParticles(p.mesh.position, 'smoke', 0x555555, 1);
                engine.spawnParticles(p.mesh.position, 'spark', 0xff4400, 2);

                // Specific VFX for Homing
                if (p.vfx === 'homing_fire') {
                    engine.spawnParticles(p.mesh.position, 'spark', 0xffff00, 1);
                } else if (p.vfx === 'homing_fire_heavy') {
                    engine.spawnParticles(p.mesh.position, 'spark', 0xff0000, 2);
                    engine.spawnParticles(p.mesh.position, 'smoke', 0x220000, 1);
                }
            }
            else engine.spawnParticles(p.mesh.position, 'spark', p.color, 1);

            let hit = false;
            if (!p.hitList) p.hitList = [];

            // Vs Mobs
            if (p.owner === this.player) {
                this.mobs.forEach(m => {
                    // Check if already hit this mob (for piercing)
                    if (p.piercing && p.hitList.includes(m)) return;

                    if (!hit && Math.abs(m.x - p.x) < (1 * (p.scale || 1)) && Math.abs(m.y - p.y) < (2 * (p.scale || 1))) {
                        this.takeDamage(m, p.dmg, this.player);
                        hit = true;
                        if (p.piercing) p.hitList.push(m);

                        if (p.projType === 'missile') { // AoE Explosion
                            engine.spawnParticles(p.mesh.position, 'explode', 0xff0000, 20);
                            engine.shake(0.5);
                        }
                    }
                });
            }

            // Handle Removal
            if (p.life <= 0 || (hit && !p.piercing)) {
                engine.scene.remove(p.mesh);
                this.projectiles.splice(i, 1);
                continue;
            }

            // Vs Player & Summons (Enemy Projectiles)
            if (p.owner !== this.player) {
                // Player
                if (Math.abs(this.player.x - p.x) < 1 && Math.abs(this.player.y - p.y) < 2) {
                    if (!p.piercing || !p.hitList.includes(this.player)) {
                        this.takeDamage(this.player, p.dmg, p.owner);
                        hit = true;
                        if (p.piercing) p.hitList.push(this.player);
                    }
                }
                // Summons
                this.summons.forEach(s => {
                    if (p.piercing && p.hitList.includes(s)) return;
                    if (!hit && Math.abs(s.x - p.x) < 1 && Math.abs(s.y - p.y) < 2) {
                        this.takeDamage(s, p.dmg, p.owner);
                        hit = true;
                        if (p.piercing) p.hitList.push(s);
                    }
                });
            }
            if (hit && !p.piercing) { engine.scene.remove(p.mesh); this.projectiles.splice(i, 1); }
        }

        // Sim updates
        [...this.summons, ...this.mobs].forEach(e => {
            // Update UI
            engine.updateEntityUI(e);

            e.vy -= this.GRAVITY; e.y += e.vy;
            this.checkPlatformCollisions(e);

            // Handle Stun
            if (e.stunned) {
                if (e.stunTimer > 0) e.stunTimer--;
                else e.stunned = false;
            }

            // Skip AI if stunned (Preserve Knockback Momentum)
            if (e.stunned) {
                // Drag
                e.vx *= 0.9;
            } else if (e.owner) {
                e.life--;
                if (e.life <= 0) {
                    this.killEntity(e);
                    return;
                }

                // AI: Find closest Mob
                let target = null;
                let minDist = 30; // Vision Range
                this.mobs.forEach(m => {
                    const d = Math.abs(m.x - e.x);
                    if (d < minDist) { minDist = d; target = m; }
                });

                if (target) {
                    const dir = target.x > e.x ? 1 : -1;

                    // Mini-Igris: Aggressive AI
                    if (e.type === 'MINI_IGRIS') {
                        e.vx = dir * 0.2; // Faster movement
                        e.facingRight = dir > 0;

                        // Dash attack
                        if (minDist < 5 && minDist > 2 && Math.random() < 0.03) {
                            e.x = target.x - dir * 1.5; // Teleport near target
                            engine.spawnParticles(e.mesh.position, 'slash', 0x440088, 20);
                        }

                        // Rapid slash combo
                        if (minDist < 2 && Math.random() < 0.08) {
                            this.playAnim(e, 'slash', 300);
                            for (let i = 0; i < 3; i++) {
                                setTimeout(() => {
                                    if (target && target.hp > 0) {
                                        this.takeDamage(target, e.atk * this.player.summonBoost, e);
                                        engine.spawnParticles(target.mesh.position, 'slash', 0x440088, 10);
                                    }
                                }, i * 100);
                            }
                            e.vy = 0.4; // Jump
                        }
                    } else {
                        // Normal summon AI
                        e.vx = dir * 0.12; // Chase Speed
                        e.facingRight = dir > 0;

                        // Attack
                        if (minDist < 1.5 && Math.random() < 0.05) {
                            this.playAnim(e, 'slash', 400);
                            this.takeDamage(target, e.atk, e);
                            e.vy = 0.3; // Jump attack
                        }
                    }
                }
                else {
                    // Follow Player if no enemies
                    const d = this.player.x - e.x;
                    if (Math.abs(d) > 3) {
                        e.vx = (d > 0 ? 1 : -1) * 0.15;
                        e.facingRight = e.vx > 0;
                    }
                    else e.vx = 0;
                }
            } else { // Mob
                this.updateMobAI(e);
            }

            e.x += e.vx; e.mesh.position.set(e.x, e.y, 0);
            e.mesh.rotation.y = e.vx > 0 ? Math.PI / 2 : -Math.PI / 2;
            this.updateAnim(e);
        });
    }
};

// ... Override spawnProjectile for Lasers ...
game.spawnProjectile = function (opts) {
    // LAYZER BEAM GEOMETRY
    let geo, mat;
    const scale = opts.scale || 1.0;

    if (opts.projType === 'missile') {
        geo = new THREE.BoxGeometry(0.8 * scale, 0.4 * scale, 0.4 * scale);
        mat = new THREE.MeshBasicMaterial({ color: opts.color || 0xff0000 });
    } else if (opts.projType === 'fireball' || opts.projType === 'fireball_large') {
        // Sphere for Fireballs
        geo = new THREE.SphereGeometry(0.4 * scale, 16, 16);
        mat = new THREE.MeshBasicMaterial({ color: opts.color || 0xff4400 });
    } else {
        // Laser Beam
        geo = new THREE.BoxGeometry(1.5 * scale, 0.15 * scale, 0.15 * scale);
        mat = new THREE.MeshBasicMaterial({
            color: opts.color || 0xffff00,
            blending: THREE.AdditiveBlending, // Glow effect
            opacity: 0.8,
            transparent: true
        });

        // Add Core
        const coreGeo = new THREE.BoxGeometry(1.5 * scale, 0.05 * scale, 0.05 * scale);
        const coreMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    }

    // Group for complex meshes (if we wanted), but simple mesh for now with glow
    const mesh = new THREE.Mesh(geo, mat);

    // Add Glow Mesh (Standard trick: bigger mesh, lower opacity)
    if (opts.projType !== 'missile') {
        let glowGeo;
        if (opts.projType.includes('fireball')) {
            glowGeo = new THREE.SphereGeometry(0.6 * scale, 16, 16);
        } else {
            glowGeo = new THREE.BoxGeometry(2.0 * scale, 0.4 * scale, 0.4 * scale);
        }
        const glow = new THREE.Mesh(glowGeo, new THREE.MeshBasicMaterial({ color: opts.color, transparent: true, opacity: 0.3 }));
        mesh.add(glow);
    }

    mesh.position.set(opts.x, opts.y, 0);
    engine.scene.add(mesh);

    // Initialize HitList for piercing
    const projData = { mesh, ...opts };
    if (opts.piercing) projData.hitList = [];

    this.projectiles.push(projData);
};

// === BOSS AI SYSTEM ===
// This function handles unique AI behaviors for all 5 boss types
game.updateBossAI = function (boss) {
    const dist = Math.abs(this.player.x - boss.x);
    const distY = Math.abs(this.player.y - boss.y);
    const dir = (this.player.x > boss.x) ? 1 : -1;
    const now = Date.now();

    // Update AI timers
    boss.aiState.timer++;
    if (boss.aiState.attackCooldown > 0) boss.aiState.attackCooldown--;

    // Check phase transitions (HP thresholds)
    const hpPercent = boss.hp / boss.maxHp;
    if (hpPercent <= 0.5 && boss.aiState.phase === 1) {
        boss.aiState.phase = 2;
        engine.createFloatingText("PHASE 2!", { x: boss.x, y: boss.y + 3, z: 0 }, '#ff0000');
        engine.screenFlash('#ff0000', 300);
        engine.shake(2.0);
    }

    // Contact damage
    if (dist < 1.5 && distY < 2 && this.player.invulnTimer <= 0) {
        this.takeDamage(this.player, boss.atk, boss);
        this.player.invulnTimer = 60;
    }

    // Boss-specific AI
    switch (boss.type) {
        case 'WARDEN':
            this.updateWardenAI(boss, dist, dir);
            break;
        case 'EXECUTIONER':
            this.updateExecutionerAI(boss, dist, dir);
            break;
        case 'OVERLORD':
            this.updateOverlordAI(boss, dist, dir);
            break;
        case 'IGRIS':
            this.updateIgrisAI(boss, dist, dir);
            break;
        case 'THE ARCHITECT':
            this.updateArchitectAI(boss, dist, dir);
            break;
        default:
            // Fallback: basic chase
            boss.vx = dir * 0.1;
            break;
    }
};

// WARDEN AI: Tank boss with shield and ground slam
game.updateWardenAI = function (boss, dist, dir) {
    // Slow movement
    if (dist > 2) {
        boss.vx = dir * 0.06;
        boss.aiState.mode = 'chase';
    } else {
        boss.vx *= 0.5;
    }

    // Attack patterns
    if (boss.aiState.attackCooldown <= 0 && dist < 4) {
        const attack = Math.random();

        if (attack < 0.4 && dist < 2) {
            // Shield Bash
            this.bossShieldBash(boss, dir);
            boss.aiState.attackCooldown = 120;
        } else if (attack < 0.7) {
            // Ground Slam
            this.bossGroundSlam(boss);
            boss.aiState.attackCooldown = 180;
        } else if (boss.aiState.phase === 2 && attack < 0.9) {
            // Defensive Stance (Phase 2)
            this.bossDefensiveStance(boss);
            boss.aiState.attackCooldown = 300;
        }
    }
};

// EXECUTIONER AI: Berserker with axe attacks
game.updateExecutionerAI = function (boss, dist, dir) {
    // Rage mode in Phase 2
    const speed = boss.aiState.phase === 2 ? 0.12 : 0.08;

    // Circle player
    if (dist > 3) {
        boss.vx = dir * speed;
    } else if (dist < 2) {
        boss.vx = -dir * speed * 0.5; // Back away slightly
    } else {
        boss.vx *= 0.7;
    }

    // Attack patterns
    if (boss.aiState.attackCooldown <= 0 && dist < 5) {
        const attack = Math.random();

        if (attack < 0.3 && dist < 3) {
            // Axe Swing
            this.bossAxeSwing(boss, dir);
            boss.aiState.attackCooldown = 90;
        } else if (attack < 0.6) {
            // Overhead Slam
            this.bossOverheadSlam(boss, dir);
            boss.aiState.attackCooldown = 150;
        } else if (attack < 0.8) {
            // Spin Attack
            this.bossSpinAttack(boss);
            boss.aiState.attackCooldown = 180;
        }
    }
};

// OVERLORD AI: Mage with magic and summons
game.updateOverlordAI = function (boss, dist, dir) {
    // Keep distance (hover/float)
    if (dist < 5) {
        boss.vx = -dir * 0.1; // Move away
    } else if (dist > 10) {
        boss.vx = dir * 0.08; // Move closer
    } else {
        boss.vx *= 0.9;
    }

    // Attack patterns
    if (boss.aiState.attackCooldown <= 0) {
        const attack = Math.random();

        if (attack < 0.4) {
            // Magic Missiles
            this.bossMagicMissiles(boss, dir);
            boss.aiState.attackCooldown = 120;
        } else if (attack < 0.6 && dist < 3) {
            // Teleport away
            this.bossTeleport(boss);
            boss.aiState.attackCooldown = 180;
        } else if (attack < 0.8) {
            // Flying Hand Attack
            this.bossFlyingHands(boss);
            boss.aiState.attackCooldown = 150;
        }
    }

    // Summon minions at HP thresholds
    if ((boss.hp / boss.maxHp <= 0.7 && boss.aiState.summonCount === 0) ||
        (boss.hp / boss.maxHp <= 0.4 && boss.aiState.summonCount === 1)) {
        this.bossSummonMinions(boss, 3);
        boss.aiState.summonCount++;
    }
};

// IGRIS AI: Fast shadow knight
game.updateIgrisAI = function (boss, dist, dir) {
    // Very fast movement
    const speed = 0.15;

    if (dist > 2) {
        boss.vx = dir * speed;
    } else {
        boss.vx *= 0.8;
    }

    // Attack patterns
    if (boss.aiState.attackCooldown <= 0 && dist < 6) {
        const attack = Math.random();

        if (attack < 0.3) {
            // Dash Slash
            this.bossDashSlash(boss, dir);
            boss.aiState.attackCooldown = 100;
        } else if (attack < 0.6 && dist < 2.5) {
            // Sword Combo
            this.bossSwordCombo(boss, dir);
            boss.aiState.attackCooldown = 120;
        } else if (attack < 0.8 && boss.aiState.phase === 2) {
            // Shadow Clones
            this.bossShadowClones(boss);
            boss.aiState.attackCooldown = 240;
        }
    }
};

// ARCHITECT AI: Stationary final boss
game.updateArchitectAI = function (boss, dist, dir) {
    // Stationary - float in center
    boss.vx *= 0.95;

    // Attack patterns (more aggressive in Phase 2)
    const cooldownMult = boss.aiState.phase === 2 ? 0.7 : 1.0;

    if (boss.aiState.attackCooldown <= 0) {
        const attack = Math.random();

        if (attack < 0.25) {
            // Laser Grid
            this.bossLaserGrid(boss);
            boss.aiState.attackCooldown = 150 * cooldownMult;
        } else if (attack < 0.5) {
            // Data Spike Rain
            this.bossDataSpikeRain(boss);
            boss.aiState.attackCooldown = 120 * cooldownMult;
        } else if (attack < 0.75) {
            // Orbital Strike
            this.bossOrbitalStrike(boss);
            boss.aiState.attackCooldown = 180 * cooldownMult;
        } else {
            // System Crash
            this.bossSystemCrash(boss);
            boss.aiState.attackCooldown = 200 * cooldownMult;
        }
    }

    // Summon constructs in Phase 2
    if (boss.aiState.phase === 2 && boss.aiState.summonCount === 0) {
        this.bossSummonMinions(boss, 4);
        boss.aiState.summonCount++;
    }
};

// === BOSS ATTACK FUNCTIONS ===

// WARDEN ATTACKS
game.bossShieldBash = function (boss, dir) {
    engine.createFloatingText("SHIELD BASH!", { x: boss.x, y: boss.y + 2, z: 0 }, '#ffaa00');
    engine.shake(1.2);

    // Limb animation: Shield arm extends
    if (boss.limbs && boss.limbs.leftArm) {
        const arm = boss.limbs.leftArm;
        const origX = arm.position.x;
        arm.position.x -= dir * 0.5;
        setTimeout(() => { arm.position.x = origX; }, 300);
    }

    // LONG RANGE knockback and STUN
    if (Math.abs(this.player.x - boss.x) < 8 && Math.abs(this.player.y - boss.y) < 3) {
        const inFront = dir > 0 ? this.player.x > boss.x : this.player.x < boss.x;
        if (inFront) {
            this.takeDamage(this.player, boss.atk * 2.0, boss);
            this.player.vx = dir * 1.5; // Massive knockback
            this.player.vy = 0.8;
            // STUN
            this.player.stunned = true;
            setTimeout(() => { this.player.stunned = false; }, 1000);
        }
    }

    // Visual: Massive shield wave
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            engine.spawnParticles({ x: boss.x + dir * (i + 1) * 2, y: boss.y + 1, z: 0 }, 'explode', 0xffaa00, 15);
        }, i * 50);
    }
};

game.bossGroundSlam = function (boss) {
    engine.createFloatingText("EARTHQUAKE!", { x: boss.x, y: boss.y + 2, z: 0 }, '#ff4400');
    engine.shake(2.5);
    boss.vy = 0.5; // Jump up

    setTimeout(() => {
        // MAP-WIDE SHOCKWAVE - NO ESCAPE!
        this.takeDamage(this.player, boss.atk * 1.8, boss);
        this.player.vy = 0.6;
        this.player.vx *= 0.3; // Slow player

        // Multiple expanding shockwaves
        for (let wave = 0; wave < 4; wave++) {
            setTimeout(() => {
                const ring = new THREE.Mesh(
                    new THREE.RingGeometry(0.5, 30, 32),
                    new THREE.MeshBasicMaterial({ color: 0xff4400, transparent: true, opacity: 0.7, side: THREE.DoubleSide })
                );
                ring.position.set(boss.x, boss.y - 0.5, 0);
                ring.rotation.x = Math.PI / 2;
                engine.scene.add(ring);

                let f = 0;
                const anim = () => {
                    f++;
                    ring.scale.setScalar(1 + f * 0.2);
                    ring.material.opacity = 0.7 - f / 15;
                    if (f < 15) requestAnimationFrame(anim);
                    else engine.scene.remove(ring);
                };
                anim();

                engine.shake(1.0);
            }, wave * 200);
        }

        // Ground fissures
        for (let i = 0; i < 10; i++) {
            setTimeout(() => {
                engine.spawnParticles({ x: boss.x + (Math.random() - 0.5) * 20, y: 0.5, z: 0 }, 'explode', 0xff4400, 10);
            }, i * 100);
        }
    }, 400);
};

game.bossDefensiveStance = function (boss) {
    engine.createFloatingText("IRON FORTRESS!", { x: boss.x, y: boss.y + 2, z: 0 }, '#00aaff');
    boss.defensiveMode = true;
    boss.damageReduction = 0.7; // 70% damage reduction
    boss.thornsDamage = boss.atk * 0.5; // Reflects damage

    // Visual: Massive shield barrier
    const barrier = new THREE.Mesh(
        new THREE.SphereGeometry(3, 16, 16),
        new THREE.MeshBasicMaterial({ color: 0x00aaff, transparent: true, opacity: 0.4, wireframe: true })
    );
    barrier.position.copy(boss.mesh.position);
    engine.scene.add(barrier);

    let rot = 0;
    const barrierAnim = setInterval(() => {
        rot += 0.05;
        barrier.rotation.y = rot;
        barrier.position.copy(boss.mesh.position);
    }, 16);

    setTimeout(() => {
        boss.defensiveMode = false;
        boss.damageReduction = 0;
        boss.thornsDamage = 0;
        clearInterval(barrierAnim);
        engine.scene.remove(barrier);
    }, 5000);
};

// EXECUTIONER ATTACKS
game.bossAxeSwing = function (boss, dir) {
    engine.createFloatingText("CLEAVE!", { x: boss.x, y: boss.y + 2, z: 0 }, '#ff0000');
    engine.shake(1.5);

    // Limb animation: Axe swings
    if (boss.limbs && boss.limbs.rightArm) {
        const arm = boss.limbs.rightArm;
        const origRot = arm.rotation.z;
        arm.rotation.z = -Math.PI / 2;
        setTimeout(() => { arm.rotation.z = origRot; }, 400);
    }

    // LONG RANGE arc - 10 units!
    const range = 10;
    if (Math.abs(this.player.x - boss.x) < range && Math.abs(this.player.y - boss.y) < 3) {
        const inFront = dir > 0 ? this.player.x > boss.x : this.player.x < boss.x;
        if (inFront) {
            this.takeDamage(this.player, boss.atk * 2.5, boss);
            this.player.vx = dir * 1.2;
            this.player.vy = 0.4;
        }
    }

    // Visual: Massive slash wave
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            engine.spawnParticles({ x: boss.x + dir * (i + 1) * 1.5, y: boss.y + 1, z: 0 }, 'slash', 0xff0000, 20);
        }, i * 30);
    }
};

game.bossOverheadSlam = function (boss, dir) {
    engine.createFloatingText("ANNIHILATION!", { x: boss.x, y: boss.y + 3, z: 0 }, '#ff4400');

    // INSTANT - No telegraph, just SLAM
    setTimeout(() => {
        engine.shake(2.5);

        // MAP-WIDE fissures - NO ESCAPE
        this.takeDamage(this.player, boss.atk * 2.5, boss);
        this.player.vy = 0.8;
        this.player.stunned = true;
        setTimeout(() => { this.player.stunned = false; }, 800);

        // Create fissures across entire map
        for (let i = 0; i < 15; i++) {
            setTimeout(() => {
                const x = -15 + i * 2;
                engine.spawnParticles({ x: x, y: 0.5, z: 0 }, 'explode', 0xff4400, 25);

                // Damage zones
                if (Math.abs(this.player.x - x) < 1.5) {
                    this.takeDamage(this.player, boss.atk * 0.5, boss);
                }
            }, i * 50);
        }
    }, 200);
};

game.bossSpinAttack = function (boss) {
    engine.createFloatingText("CYCLONE!", { x: boss.x, y: boss.y + 2, z: 0 }, '#ff00ff');
    engine.shake(1.5);

    // PULL PLAYER IN - vortex effect
    const pullDir = boss.x > this.player.x ? 1 : -1;
    this.player.vx = pullDir * 0.8;

    // Massive 360° damage - 8 unit radius
    const radius = 8;
    if (Math.abs(this.player.x - boss.x) < radius && Math.abs(this.player.y - boss.y) < 3) {
        // Multi-hit
        for (let hit = 0; hit < 3; hit++) {
            setTimeout(() => {
                if (Math.abs(this.player.x - boss.x) < radius) {
                    this.takeDamage(this.player, boss.atk * 0.8, boss);
                }
            }, hit * 150);
        }
    }

    // Visual: Massive spinning vortex
    for (let i = 0; i < 16; i++) {
        setTimeout(() => {
            const angle = (i / 16) * Math.PI * 2;
            const dist = 2 + (i % 4);
            engine.spawnParticles({
                x: boss.x + Math.cos(angle) * dist,
                y: boss.y + 1,
                z: 0
            }, 'slash', 0xff00ff, 10);
        }, i * 30);
    }
};

// OVERLORD ATTACKS
game.bossMagicMissiles = function (boss, dir) {
    engine.createFloatingText("ARCANE BARRAGE!", { x: boss.x, y: boss.y + 2, z: 0 }, '#aa00ff');

    // Limb animation: Hands glow and extend
    if (boss.limbs) {
        ['leftArm', 'rightArm'].forEach(limb => {
            if (boss.limbs[limb]) {
                const arm = boss.limbs[limb];
                const origY = arm.position.y;
                arm.position.y += 0.3;
                setTimeout(() => { arm.position.y = origY; }, 500);
            }
        });
    }

    // Fire 8 HOMING missiles
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            const missile = {
                x: boss.x, y: boss.y + 1,
                vx: dir * 0.4, vy: (i - 4) * 0.05,
                dmg: boss.atk * 0.9, color: 0xaa00ff, life: 180, owner: boss,
                projType: 'missile',
                homing: true // Track player
            };
            this.spawnProjectile(missile);
        }, i * 80);
    }
};

game.bossTeleport = function (boss) {
    engine.createFloatingText("VOID SHIFT!", { x: boss.x, y: boss.y + 2, z: 0 }, '#00ffff');
    engine.spawnParticles(boss.mesh.position, 'explode', 0x00ffff, 30);

    const oldX = boss.x;

    // Teleport away from player
    const dir = this.player.x > boss.x ? -1 : 1;
    boss.x += dir * 10;
    boss.mesh.position.x = boss.x;

    // Leave DAMAGING VOID at old position
    const voidZone = new THREE.Mesh(
        new THREE.CircleGeometry(2, 32),
        new THREE.MeshBasicMaterial({ color: 0x440088, transparent: true, opacity: 0.6 })
    );
    voidZone.position.set(oldX, boss.y, -0.1);
    voidZone.rotation.x = Math.PI / 2;
    engine.scene.add(voidZone);

    // Void damages player over time
    const voidDamage = setInterval(() => {
        if (Math.abs(this.player.x - oldX) < 2 && Math.abs(this.player.y - boss.y) < 2) {
            this.takeDamage(this.player, boss.atk * 0.3, boss);
        }
    }, 200);

    setTimeout(() => {
        clearInterval(voidDamage);
        engine.scene.remove(voidZone);
    }, 3000);

    engine.spawnParticles(boss.mesh.position, 'explode', 0x00ffff, 30);
};

game.bossFlyingHands = function (boss) {
    engine.createFloatingText("SPECTRAL HANDS!", { x: boss.x, y: boss.y + 2, z: 0 }, '#ff00aa');

    // Hands chase player relentlessly
    for (let i = 0; i < 4; i++) {
        setTimeout(() => {
            const dir = this.player.x > boss.x ? 1 : -1;
            const angleToPlayer = Math.atan2(this.player.y - boss.y, this.player.x - boss.x);

            this.spawnProjectile({
                x: boss.x + (i - 2) * 0.5, y: boss.y + 1,
                vx: Math.cos(angleToPlayer) * 0.35,
                vy: Math.sin(angleToPlayer) * 0.35,
                dmg: boss.atk * 1.2, color: 0xff00aa, life: 200, owner: boss,
                projType: 'missile',
                homing: true
            });
        }, i * 200);
    }
};

// IGRIS ATTACKS
game.bossDashSlash = function (boss, dir) {
    engine.createFloatingText("PHANTOM STRIKE!", { x: boss.x, y: boss.y + 2, z: 0 }, '#440088');

    // Create afterimages
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const clone = boss.mesh.clone();
            clone.position.copy(boss.mesh.position);
            clone.material = boss.mesh.material.clone();
            clone.material.opacity = 0.3;
            clone.material.transparent = true;
            engine.scene.add(clone);
            setTimeout(() => engine.scene.remove(clone), 300);
        }, i * 50);
    }

    // INSTANT teleport behind player - MULTI-HIT
    const targetX = this.player.x + dir * 1.5;
    boss.x = targetX;
    boss.mesh.position.x = boss.x;

    // 3-hit slash combo
    for (let hit = 0; hit < 3; hit++) {
        setTimeout(() => {
            if (Math.abs(this.player.x - boss.x) < 4) {
                this.takeDamage(this.player, boss.atk * 1.0, boss);
                this.player.vx = -dir * 0.3;
            }
            engine.spawnParticles({ x: boss.x, y: boss.y + 1, z: 0 }, 'slash', 0x440088, 15);
        }, hit * 100);
    }

    engine.shake(1.0);
};

game.bossSwordCombo = function (boss, dir) {
    engine.createFloatingText("BLADE STORM!", { x: boss.x, y: boss.y + 2, z: 0 }, '#8800ff');

    // RAPID 5-hit combo with STUN
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            if (Math.abs(this.player.x - boss.x) < 3 && Math.abs(this.player.y - boss.y) < 2.5) {
                this.takeDamage(this.player, boss.atk * 0.7, boss);
                this.player.vx = dir * 0.15;
            }
            engine.spawnParticles({ x: boss.x + dir, y: boss.y + 1, z: 0 }, 'slash', 0x8800ff, 12);
            engine.shake(0.3);
        }, i * 120);
    }

    // Final hit STUNS
    setTimeout(() => {
        if (Math.abs(this.player.x - boss.x) < 3) {
            this.player.stunned = true;
            setTimeout(() => { this.player.stunned = false; }, 1000);
        }
    }, 600);
};

game.bossShadowClones = function (boss) {
    engine.createFloatingText("SHADOW ARMY!", { x: boss.x, y: boss.y + 2, z: 0 }, '#000000');

    // Create 3 attacking clones
    for (let i = 0; i < 3; i++) {
        const clone = boss.mesh.clone();
        const offsetX = (i - 1) * 5;
        clone.position.set(boss.x + offsetX, boss.y, 0);
        clone.material = boss.mesh.material.clone();
        clone.material.opacity = 0.6;
        clone.material.transparent = true;
        engine.scene.add(clone);

        // Clones attack player
        for (let attack = 0; attack < 3; attack++) {
            setTimeout(() => {
                if (Math.abs(this.player.x - (boss.x + offsetX)) < 3) {
                    this.takeDamage(this.player, boss.atk * 0.4, boss);
                    engine.spawnParticles({ x: boss.x + offsetX, y: boss.y + 1, z: 0 }, 'slash', 0x000000, 10);
                }
            }, attack * 400 + i * 200);
        }

        setTimeout(() => engine.scene.remove(clone), 3000);
    }
};

// ARCHITECT ATTACKS
game.bossLaserGrid = function (boss) {
    engine.createFloatingText("ANNIHILATION GRID!", { x: boss.x, y: boss.y + 3, z: 0 }, '#00ffff');
    engine.screenFlash('#00ffff', 200);

    // ROTATING LASER SWEEP - UNAVOIDABLE
    const lasers = [];
    for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        const laser = new THREE.Mesh(
            new THREE.PlaneGeometry(40, 0.5),
            new THREE.MeshBasicMaterial({ color: 0x00ffff, transparent: true, opacity: 0.8 })
        );
        laser.position.set(boss.x, boss.y, 0);
        laser.rotation.z = angle;
        engine.scene.add(laser);
        lasers.push(laser);
    }

    // Rotate and damage
    let rot = 0;
    const rotateInterval = setInterval(() => {
        rot += 0.1;
        lasers.forEach((laser, i) => {
            laser.rotation.z = (i / 8) * Math.PI * 2 + rot;
        });

        // Continuous damage
        this.takeDamage(this.player, boss.atk * 0.3, boss);
        engine.shake(0.5);
    }, 100);

    setTimeout(() => {
        clearInterval(rotateInterval);
        lasers.forEach(l => engine.scene.remove(l));
    }, 2000);
};

game.bossDataSpikeRain = function (boss) {
    engine.createFloatingText("DATA DELUGE!", { x: boss.x, y: boss.y + 3, z: 0 }, '#00ff00');

    // DENSE barrage - 20 spikes!
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const targetX = this.player.x + (Math.random() - 0.5) * 8;
            this.spawnProjectile({
                x: targetX, y: 10,
                vx: 0, vy: -0.6, // FASTER
                dmg: boss.atk * 0.8, color: 0x00ff00, life: 80, owner: boss,
                projType: 'missile'
            });
        }, i * 60); // Rapid fire
    }
};

game.bossOrbitalStrike = function (boss) {
    engine.createFloatingText("APOCALYPSE!", { x: boss.x, y: boss.y + 3, z: 0 }, '#ff0000');
    engine.screenFlash('#ff0000', 300);

    // SCREEN-WIDE strike - NO ESCAPE!
    setTimeout(() => {
        engine.shake(3.0);

        // Unavoidable damage
        this.takeDamage(this.player, boss.atk * 2.5, boss);
        this.player.vy = 0.8;
        this.player.stunned = true;
        setTimeout(() => { this.player.stunned = false; }, 1200);

        // Multiple explosions across screen
        for (let i = 0; i < 12; i++) {
            setTimeout(() => {
                const x = -15 + Math.random() * 30;
                const y = Math.random() * 8;
                engine.spawnParticles({ x, y, z: 0 }, 'explode', 0xff4400, 40);
            }, i * 80);
        }
    }, 800);
};

game.bossSystemCrash = function (boss) {
    engine.createFloatingText("SYSTEM CRASH!", { x: boss.x, y: boss.y + 3, z: 0 }, '#ff0000');
    engine.screenFlash('#ff0000', 400);
    engine.shake(3.0);

    // FREEZE PLAYER - 2 seconds!
    this.player.stunned = true;
    this.player.vx = 0;
    this.player.vy = 0;

    setTimeout(() => {
        this.player.stunned = false;
    }, 2000);

    // MAP-WIDE damage
    this.takeDamage(this.player, boss.atk * 2.0, boss);

    // Visual: Screen glitch + massive spike field
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const spike = new THREE.Mesh(
                new THREE.BoxGeometry(0.4, 3 + Math.random() * 3, 0.4),
                new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true })
            );
            spike.position.set(
                (Math.random() - 0.5) * 30,
                Math.random() * 6,
                0
            );
            engine.scene.add(spike);
            setTimeout(() => engine.scene.remove(spike), 400);
        }, i * 30);
    }
};

// SUMMON MINIONS (OVERLORD & ARCHITECT)
game.bossSummonMinions = function (boss, count) {
    engine.createFloatingText(`SUMMON ${count} MINIONS!`, { x: boss.x, y: boss.y + 3, z: 0 }, '#ff00ff');
    engine.shake(0.8);

    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            const spawnX = boss.x + (Math.random() - 0.5) * 6;
            const spawnY = boss.y + 2;

            // Spawn effect
            engine.spawnParticles({ x: spawnX, y: spawnY, z: 0 }, 'explode', 0xff00ff, 15);

            // Create minion
            const minionColor = boss.type === 'THE ARCHITECT' ? 0x00ffff : 0xaa00ff;
            const modelData = Models.createMinion(minionColor, 1.0, 0, 'MINION');

            const minion = {
                mesh: modelData.mesh,
                limbs: this.cacheLimbs(modelData.mesh),
                x: spawnX, y: spawnY, vx: 0, vy: 0,
                isGrounded: false, type: 'MINION',
                hp: 100, maxHp: 100,
                atk: boss.atk * 0.4,
                status: { dot: 0, slow: 0 }, buffs: { shield: 0 },
                animState: { current: 'idle', time: 0, duration: 0 }
            };

            this.mobs.push(minion);
            engine.scene.add(minion.mesh);
        }, i * 300);
    }
};

// --- MOB AI ---
game.updateMobAI = function (e) {
    // Boss AI uses separate system
    if (e.isBoss) {
        this.updateBossAI(e);
        return;
    }

    if (!e.state) e.state = 'CHASE';
    if (!e.timer) e.timer = 0;

    const dist = Math.abs(this.player.x - e.x);
    const dir = (this.player.x > e.x) ? 1 : -1;

    // Contact Damage (Skip if friendly summon)
    const isFriendly = e.owner === this.player;
    if (!isFriendly && dist < 1 && Math.abs(this.player.y - e.y) < 2 && this.player.invulnTimer <= 0) {
        this.takeDamage(this.player, e.atk, e);
        this.player.invulnTimer = 30; // 0.5s invuln (More frequent hits)
    }

    // STATE MACHINE
    if (e.state === 'CHASE') {
        const speed = e.isBoss ? 0.1 : 0.08;
        e.vx = dir * speed;

        // CLIFF DETECTION (Don't fall off)
        if (e.isGrounded && !e.isBoss && !e.fly && !e.ignorePlatforms) {
            const lookAheadX = e.x + (dir * 2.0);
            let hasGround = false;

            // Check Floor
            if (e.y <= this.GROUND_Y + 0.5) hasGround = true;

            // Check Platforms
            if (!hasGround) {
                for (let p of this.platforms) {
                    if (lookAheadX >= p.x - p.width / 2 && lookAheadX <= p.x + p.width / 2) {
                        if (Math.abs(e.y - (p.y + 1)) < 2.0) { // Approx height check
                            hasGround = true;
                            break;
                        }
                    }
                }
            }

            if (!hasGround) {
                e.vx = 0; // Stop at edge
            }
        }

        // Skill Trigger
        const attackInterval = (e.isBoss ? 150 : 200) / (e.speedMult || 1); // More frequent attacks
        if (e.timer++ > attackInterval && dist < 10) {
            e.state = 'CHARGE';
            e.timer = 0;
            // e.vx = 0; // DON'T STOP COMPLETELY
            e.vx = dir * 0.02; // Slow down but keep moving
            const chargeTime = 600 / (e.speedMult || 1);
            this.playAnim(e, 'cast', chargeTime);
            engine.createFloatingText("!", { x: e.x, y: e.y + 2, z: 0 }, '#ff0000');
        }
    }
    else if (e.state === 'CHARGE') {
        const dir = (this.player.x > e.x) ? 1 : -1;
        e.vx = dir * 0.02; // Keep moving slowly
        // Flashing Warning
        if (e.timer++ % 10 === 0) {
            e.mesh.traverse(c => {
                if (c.isMesh && c.material && c.material.emissive) c.material.emissive.setHex(0xff0000);
            });
            setTimeout(() => {
                if (e.mesh) e.mesh.traverse(c => {
                    if (c.isMesh && c.material && c.material.emissive) c.material.emissive.setHex(0x000000);
                });
            }, 100);
        }

        const chargeDur = 40 / (e.speedMult || 1); // Reduced from 60
        if (e.timer > chargeDur) {
            e.state = 'ATTACK';
            e.timer = 0;
        }
    }

    else if (e.state === 'ATTACK') {
        // Boss Skills
        if (e.isBoss) {
            const rng = Math.random();
            if (rng < 0.33) {
                // 1. SHOCKWAVE (Ground Sweep)
                this.playAnim(e, 'slam', 500);
                engine.shake(0.5);
                [-1, 1].forEach(d => {
                    this.spawnProjectile({
                        x: e.x, y: e.y,
                        vx: d * 0.5, vy: 0,
                        life: 60, dmg: e.atk * 1.2,
                        color: 0xff4400, projType: 'missile'
                    });
                });

            } else if (rng < 0.66) {
                // 2. ORBITAL BEAM
                this.playAnim(e, 'cast', 500);
                // Need target ref, but scope is issue. Find closest again or just player?
                // Simple: Target Player for orbital mostly
                const targetX = this.player.x;
                engine.createFloatingText("DANGER", { x: targetX, y: this.player.y + 5, z: 0 }, '#ff00ff');
                setTimeout(() => {
                    // Beam
                    const beam = new THREE.Mesh(new THREE.BoxGeometry(2, 20, 2), new THREE.MeshBasicMaterial({ color: 0xff00ff, transparent: true, opacity: 0.8 }));
                    beam.position.set(targetX, 10, 0);
                    engine.scene.add(beam);
                    engine.shake(0.5);
                    engine.spawnParticles({ x: targetX, y: this.GROUND_Y, z: 0 }, 'explode', 0xff00ff, 20);

                    // Damage Check
                    [this.player, ...this.summons].forEach(ent => {
                        if (Math.abs(ent.x - targetX) < 1.5) { this.takeDamage(ent, e.atk * 2.0, e); }
                    });

                    setTimeout(() => engine.scene.remove(beam), 300);
                }, 600);

            } else {
                // 3. DIMENSION SLASH (Wide Horizontal)
                const dir = (this.player.x > e.x) ? 1 : -1;
                this.playAnim(e, 'slash', 500);
                e.vx = dir * 1.5; // Dash through

                // Visual Slash
                const slash = new THREE.Mesh(new THREE.PlaneGeometry(20, 1), new THREE.MeshBasicMaterial({ color: 0x00ffff, side: THREE.DoubleSide }));
                slash.position.set(e.x + (dir * 10), e.y + 1, 0);
                engine.scene.add(slash);
                setTimeout(() => engine.scene.remove(slash), 200);

                // Hitbox
                [this.player, ...this.summons].forEach(ent => {
                    if (Math.abs(ent.y - e.y) < 2 && Math.sign(ent.x - e.x) === dir && Math.abs(ent.x - e.x) < 20) {
                        this.takeDamage(ent, e.atk * 1.5, e);
                    }
                });
            }
        }
        else {
            // Normal Mob
            const dir = (this.player.x > e.x) ? 1 : -1; // Recalc dir for safety
            if (e.type === 'SHOOTER') {
                this.spawnProjectile({ x: e.x, y: e.y + 1, vx: dir * 0.4, vy: 0, life: 100, dmg: e.atk, color: 0xff00ff, projType: 'bullet', owner: e });
            } else {
                e.vx = dir * 0.4; // Dash
                this.playAnim(e, 'slam', 500);

                // --- MELEE DAMAGE LOGIC ---
                // Add explicit hitbox check for "hard hit"
                // Delay slightly to match 'slam' impact
                setTimeout(() => {
                    const hitRangeX = 3.5;
                    const hitRangeY = 3.0;

                    // Visual Swipe
                    const swipe = new THREE.Mesh(new THREE.PlaneGeometry(3, 3), new THREE.MeshBasicMaterial({ color: 0xff0000, transparent: true, opacity: 0.8, side: THREE.DoubleSide }));
                    swipe.position.set(e.x + (dir * 1.5), e.y + 1, 0);
                    swipe.rotation.z = dir * -0.5;
                    engine.scene.add(swipe);
                    setTimeout(() => engine.scene.remove(swipe), 150);

                    // Check Hits
                    [this.player, ...this.summons].forEach(ent => {
                        const dx = ent.x - e.x;
                        const dy = Math.abs(ent.y - e.y);
                        // Accessing 'dir' from closure
                        const inFront = dir > 0 ? (dx > -1 && dx < hitRangeX) : (dx < 1 && dx > -hitRangeX);

                        if (inFront && dy < hitRangeY && ent.hp > 0) {
                            // 2.5x HARD HIT
                            this.takeDamage(ent, e.atk * 2.5, e);
                            engine.shake(0.2);
                            engine.spawnParticles(ent.mesh.position, 'explode', 0xff0000, 10);
                        }
                    });

                }, 200); // 200ms delay for impact point
            }
        }

        e.state = 'COOLDOWN';
    }
    else if (e.state === 'COOLDOWN') {
        e.vx *= 0.9;
        const cooldownDur = 60 / (e.speedMult || 1);
        if (e.timer++ > cooldownDur) {
            e.state = 'CHASE';
            e.timer = 0;
        }
    }

    // Borders
    if (e.x < -45) e.x = -45;
    if (e.x > 45) e.x = 45;
};
