Object.assign(game, {
    triggerRebirth() {
        this.rebirth++;
        this.floor = 1;

        // Reset all boss flags to prevent premature triggers on next run
        this.pendingBossDefeat = false;
        this.pendingBossTransformation = false;
        this.bossPhase = 0;
        this.bossStarted = false;

        // Reset floor theme
        if (engine.setFloorTheme) engine.setFloorTheme(1);

        // Boost Player Stats (REMOVED: Only full heal & flag)
        if (this.player) {
            this.player.hp = this.player.maxHp; // Full Heal
            this.player.mana = this.player.maxMana;
            this.player.awakened = true;
        }

        // Bonus Gold
        const rebirthBonus = 10000 * this.rebirth;
        this.gold += rebirthBonus;

        // Show Screen
        this.setScreen('rebirth-screen');

        // Update Rebirth Screen Text
        const levelEl = document.getElementById('rebirth-level');
        const bonusEl = document.getElementById('rebirth-bonus');
        if (levelEl) levelEl.innerText = this.rebirth;
        if (bonusEl) bonusEl.innerText = this.formatNum(rebirthBonus);
    },

    completeRebirth() {
        this.showText(`REBIRTH ${this.rebirth}!`, this.player.mesh.position, '#ff00ff');
        engine.spawnShockwave(this.player.mesh.position, 0xff00ff, 6);
        engine.addShake(0.6);

        this.state = 'IDLE';
        this.bossPhase = 0;
        this.pendingBossDefeat = false;
        this.pendingBossTransformation = false;
        this.bossStarted = false;

        const hud = document.getElementById('hud');
        hud.style.opacity = '1';
        hud.style.display = 'block';
        this.setScreen('hud');

        const controls = document.getElementById('battle-controls');
        controls.classList.add('active');

        // --- FIX: FORCE CENTER ALIGNMENT ---
        controls.style.display = 'flex';
        controls.style.justifyContent = 'center'; // <--- ADD THIS LINE

        if (this.enemy && this.enemy.mesh) {
            engine.scene.remove(this.enemy.mesh);
            this.enemy = null;
        }

        this.spawnEnemy();
        engine.focusCamera(null);
        this.updateButtons();
        this.updateUI();
    },

    resetPlayerPosition() {
        if (this.player && this.player.mesh) {
            // FIX: If minions exist, player starts in backline to avoid overlap
            const targetX = (this.player.minions && this.player.minions.length > 0) ? -4.5 : -2.5;

            // Use tween for smoother transition if visible, but set is fine for resets
            // Since this is often called on floor load (instant), let's just set it.
            // But if called after battle, tween might be nicer? 
            // The original was .set(), let's stick to .set() for now to avoid async issues on floor gen.
            this.player.mesh.position.set(targetX, this.player.mesh.userData.baseY || 0, 0);
            this.player.mesh.rotation.y = Math.PI / 2;
        }
    },

    generatePerks() {
        const container = document.getElementById('perk-container');
        container.innerHTML = '';
        const RARITY = {
            COMMON: { id: 'common', name: 'COMMON', mult: 1, prob: 1.0 },
            RARE: { id: 'rare', name: 'RARE', mult: 1.5, prob: 0.36 },
            EPIC: { id: 'epic', name: 'EPIC', mult: 2.5, prob: 0.06 },
            LEGENDARY: { id: 'legendary', name: 'LEGENDARY', mult: 5.0, prob: 0.01 }
        };

        const scaling = 1 + (this.rebirth * 0.5);

        for (let i = 0; i < 3; i++) {
            let tier;
            const rand = Math.random();

            // Check for IAP guaranteed legendary
            if (this.iapBoosts.guaranteedLegendary) {
                tier = RARITY.LEGENDARY;
                this.iapBoosts.guaranteedLegendary = false;
            } else {
                const legendaryChance = RARITY.LEGENDARY.prob + this.iapBoosts.legendaryBonus;
                const epicChance = RARITY.EPIC.prob + this.iapBoosts.epicBonus;
                const rareChance = RARITY.RARE.prob + this.iapBoosts.rareBonus;

                tier = RARITY.COMMON;
                if (rand < legendaryChance) tier = RARITY.LEGENDARY;
                else if (rand < epicChance) tier = RARITY.EPIC;
                else if (rand < rareChance) tier = RARITY.RARE;
            }

            let template;
            let valid = false;
            let attempts = 0;

            // Rarity Restriction Logic
            while (!valid && attempts < 10) {
                template = PERK_POOL[Math.floor(Math.random() * PERK_POOL.length)];

                // RESTRICTION: OVERLORD is Legendary Only
                if (template.name === 'OVERLORD') {
                    if (tier.id === 'legendary') valid = true;
                    else valid = false; // Reroll if we got Overlord on non-legendary
                } else {
                    valid = true;
                }
                attempts++;
            }
            // Fallback if loop creates issues (unlikely)
            if (!valid) template = PERK_POOL[0];
            let finalVal = Math.floor(template.baseVal * tier.mult * scaling);

            // Corrupted Logic (25% chance in rebirth OR Floor 50+)
            let isCorrupted = ((this.rebirth > 0 || this.floor >= 50) && Math.random() < 0.25);
            let penaltyDesc = "";
            let penaltyFunc = null;

            if (isCorrupted) {
                finalVal *= 3;
                const penalties = [
                    { name: "RECOIL", desc: "-20% Max HP", func: (p) => { p.baseMaxHp = Math.floor(p.baseMaxHp * 0.8); p.recalculateStats(); } },
                    { name: "BLOAT", desc: "+50% Mana Cost", func: (p) => { p.manaCostMult *= 1.5; } },
                    { name: "EXPOSED", desc: "-50% Armor", func: (p) => { p.baseArmor = Math.floor(p.baseArmor * 0.5); p.recalculateStats(); } },
                    { name: "STATIC", desc: "-10% Dodge", func: (p) => { p.dodge = Math.max(0, p.dodge - 0.1); } }
                ];
                const penalty = penalties[Math.floor(Math.random() * penalties.length)];
                penaltyDesc = `<div style="color:#ff0000; font-size:12px; margin-top:5px; font-weight:bold;">[CORRUPTED: ${penalty.desc}]</div>`;
                penaltyFunc = penalty.func;
            }

            const desc = template.desc.replace('{val}', finalVal);
            const card = document.createElement('div');
            card.className = `perk-card ${tier.id}`;

            if (isCorrupted) {
                card.style.background = 'linear-gradient(135deg, #200, #000)';
                card.style.border = '2px solid #f00';
                card.style.boxShadow = '0 0 15px #f00';
            }

            card.innerHTML = `
                <div class="perk-title" style="${isCorrupted ? 'color:#ff4444' : ''}">${isCorrupted ? '[CORRUPTED] ' : ''}${template.name}</div>
                <div class="perk-desc">${desc}${penaltyDesc}</div>
                <div class="rarity-tag">${tier.name}</div>
            `;

            card.onclick = () => {
                template.func(this.player, finalVal);
                if (penaltyFunc) penaltyFunc(this.player);
                this.trackBuff(template, finalVal);

                // Tutorial: After selecting first perk, advance to step 4 (floor progression)
                if (this.tutorialState === 'ACTIVE' && this.tutorialStep === 3) {
                    this.nextTutorialStep();
                }

                this.goToShop();
            };
            container.appendChild(card);
        }
    },

    trackBuff(template, value) {
        // Don't track one-time effects (heals, mana restore) unless they provide permanent bonuses
        if (template.noStack) return;

        const key = template.name;
        if (!this.buffs[key]) {
            this.buffs[key] = { count: 0, totalValue: 0, icon: template.icon, name: template.name, statDesc: template.statDesc };
        }
        this.buffs[key].count++;
        this.buffs[key].totalValue += value;
        this.renderBuffs();
    },

    renderBuffs() {
        const container = document.getElementById('buff-container');
        container.innerHTML = '';

        for (const key in this.buffs) {
            const buff = this.buffs[key];
            const el = document.createElement('div');
            el.className = 'buff-icon';
            el.innerHTML = `
                <span class="buff-emoji">${buff.icon}</span>
                ${buff.count > 1 ? `<span class="buff-stack">${buff.count}</span>` : ''}
                <div class="buff-tooltip">
                    <div class="buff-name">${buff.name}</div>
                    <div class="buff-value">+${buff.totalValue} ${buff.statDesc}</div>
                </div>
            `;
            container.appendChild(el);
        }
    },

    // --- MUTATION SYSTEM ---
    rollMutation() {
        if (this.rebirth === 0) {
            this.clearMutation();
            return;
        }

        const keys = Object.keys(this.mutations);
        const randomKey = keys[Math.floor(Math.random() * keys.length)];
        this.applyMutation(randomKey);
    },

    applyMutation(id) {
        this.clearMutation();
        this.currentMutation = id;
        const mut = this.mutations[id];
        if (!mut) return;

        // Visual notification
        this.showText(`MUTATION: ${mut.name}`, new THREE.Vector3(0, 4, 0), '#ff0000');

        // Instant stat modifications (recalculated stats handles others)
        if (id === 'glitch' && this.player) {
            this.player.critChance += 0.2;
            this.player.dodge -= 0.1;
        }

        this.updateMutationUI();
    },

    clearMutation() {
        if (!this.currentMutation) return;

        // Reverse instant effects
        if (this.currentMutation === 'glitch' && this.player) {
            this.player.critChance -= 0.2;
            this.player.dodge += 0.1;
        }

        this.currentMutation = null;
        this.updateMutationUI();
    },

    updateMutationUI() {
        const display = document.getElementById('mutation-display');
        const nameEl = document.getElementById('mutation-name');
        const descEl = document.getElementById('mutation-desc');

        if (!this.currentMutation) {
            if (display) display.style.display = 'none';
            return;
        }

        // Hide if any screen overlay (except HUD) is active or in dialogue
        const activeScreen = document.querySelector('.screen.active');
        const isDialogueActive = this.state === 'CUTSCENE';
        const isShopOrPerk = activeScreen && (activeScreen.id === 'shop-screen' || activeScreen.id === 'reward-screen' || activeScreen.id === 'class-screen' || activeScreen.id === 'iap-screen' || activeScreen.id === 'inventory-screen');

        if (activeScreen || isDialogueActive) {
            if (display) {
                display.style.display = 'none';
                display.classList.remove('mutation-active');
            }
            return;
        }

        const mut = this.mutations[this.currentMutation];
        if (display) {
            display.style.display = 'block';
            display.classList.add('mutation-active');
        }
        if (nameEl) nameEl.innerText = mut.name;
        if (descEl) descEl.innerText = mut.desc;
    },
});
