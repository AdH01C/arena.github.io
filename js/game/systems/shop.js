Object.assign(game, {
    generateShop() {
        const container = document.getElementById('shop-container');
        if (!container) return;
        container.innerHTML = '';

        // Update Gold Display in Shop
        const goldEl = document.getElementById('shop-gold');
        if (goldEl) goldEl.innerText = this.formatNum(this.gold);

        // Header Stats (Dynamic Tier)
        const tier = Math.floor(this.floor / 10) + 1;
        const breachPct = ((this.player.breachDamage || 0) * 100).toFixed(1);
        const comboPct = ((this.player.comboMult || 0.01) * 100).toFixed(1);
        let statsHtml = `ATK: <span style="color:#ff0055">${this.formatNum(this.player.atk)}</span> | HP: <span style="color:#00f2ff">${this.formatNum(this.player.maxHp)}</span>`;
        if (this.floor >= 50) statsHtml += ` | BREACH: <span style="color:#ff00ff">${breachPct}%</span> | COMBO: <span style="color:#ffaa00">${comboPct}%</span>`;

        const tierLabel = document.getElementById('shop-tier-label');
        if (tierLabel) tierLabel.innerText = `TIER ${tier}`;

        const statsEl = document.getElementById('shop-player-stats');
        if (statsEl) statsEl.innerHTML = statsHtml;

        // 1. SYSTEM UPGRADES
        this.appendShopHeader(container, "SYSTEM UPGRADES", "PERMANENT STAT BOOSTS");
        const statKeys = ['heal', 'atk', 'hp', 'mana'];
        if (this.floor >= 50) { statKeys.push('breach', 'combo', 'crit'); }

        statKeys.forEach(id => {
            const data = this.shopData[id];
            if (!data) return;
            const cost = this.getItemCost(id);
            const val = this.getItemValue(id);
            const defs = {
                heal: { name: "NANO REPAIR", desc: `Repair +${val} HP` },
                atk: { name: "WEAPON OC", desc: `Upgrade +${val} ATK` },
                hp: { name: "TITANIUM HULL", desc: `Upgrade +${val} Max HP` },
                mana: { name: "ARC BATTERY", desc: `Upgrade +${val} Max Mana` },
                breach: { name: "QUANTUM CORE", desc: `+${(val * 100).toFixed(1)}% Max HP DMG`, tier: 'epic' },
                combo: { name: "WAR PROTOCOL", desc: `+${(val * 100).toFixed(1)}% Combo Mult`, tier: 'epic' },
                crit: { name: "FATAL CHIP", desc: `+${(val * 100).toFixed(0)}% Crit DMG`, tier: 'rare' }
            };
            const def = defs[id];

            const el = this.createShopItem(def.name, def.desc, cost, data.level, def.tier);
            el.onclick = () => this.buyItem(id);
            container.appendChild(el);
        });

        // 2. DIRECT EQUIPMENT
        if (this.shopItems.length > 0) {
            this.appendShopHeader(container, "DIRECT EQUIPMENT", "SAVES TO INVENTORY");
            this.shopItems.forEach(item => {
                if (item.sold) return;
                const rarityCols = { common: '#888', rare: '#00aaff', epic: '#aa00ff', legendary: '#ffd700' };
                const el = this.createShopItem(item.name, item.desc, item.price, null, item.rarity);
                el.onclick = () => this.buyShopEquipment(item);
                container.appendChild(el);
            });
        }

        // 3. SUPPLY CRATES
        this.appendShopHeader(container, "SUPPLY CRATES", "RANDOM GEAR BOXES");
        const standardCost = 1000 + (this.floor * 50);
        const eliteCost = 6000 + (this.floor * 300);

        const crates = [
            { id: 'standard', name: "STANDARD SUPPLY", cost: standardCost, color: '#00f2ff', desc: 'Random Common/Rare' },
            { id: 'elite', name: "ELITE SUPPLY", cost: eliteCost, color: '#bf00ff', desc: 'Guaranteed Rare+' }
        ];

        crates.forEach(c => {
            const el = this.createShopItem(c.name, c.desc, c.cost, null, null, c.color);
            el.onclick = () => (c.id === 'standard' ? this.buyStandardCrate(c.cost) : this.buyEliteCrate(c.cost));
            container.appendChild(el);
        });
    },

    appendShopHeader(container, title, subtitle) {
        const h = document.createElement('div');
        h.className = 'shop-header';
        h.innerHTML = `${title} <span style="font-size:14px; color:#888; font-weight:normal; margin-left:15px; letter-spacing:0;">${subtitle}</span>`;
        h.style.gridColumn = '1 / -1'; // Span ALL columns
        h.style.marginTop = '20px';
        container.appendChild(h);
    },

    createShopItem(name, desc, cost, level, rarityTier, customColor) {
        const el = document.createElement('div');
        el.className = 'shop-item';

        const rarityCols = { common: '#777', rare: '#00aaff', epic: '#aa00ff', legendary: '#ffd700' };
        const borderColor = customColor || (rarityTier ? rarityCols[rarityTier] : '#555');
        el.style.borderColor = borderColor;

        const canAfford = this.gold >= cost;
        const op = canAfford ? 1 : 0.5;

        // If affordable and using default grey borders, highlight title in white
        // If it has a rarity color, keep that color (or brighten it?) -> Keep it.
        let titleColor = borderColor;
        if (canAfford && (borderColor === '#555' || borderColor === '#777')) {
            titleColor = '#fff';
        }

        el.innerHTML = `
            <div style="flex:1; text-align:left; opacity:${op}; overflow:hidden;">
                <div class="shop-name" style="color:${titleColor};">
                    ${name} ${level ? `<span class="shop-level">LVL ${level}</span>` : ''}
                </div>
                <div class="shop-desc">${desc}</div>
            </div>
            <div class="shop-cost" style="color:${canAfford ? '#ffe600' : '#ff4444'}; opacity:${op};">
                ${this.formatNum(cost)}
            </div>
        `;
        return el;
    },

    buyItem(id) {
        const cost = this.getItemCost(id);

        if (this.gold >= cost) {
            this.gold -= cost;
            const val = this.getItemValue(id);

            // Apply Stats
            if (id === 'heal') this.player.hp = Math.min(this.player.maxHp, this.player.hp + val);
            else if (id === 'atk') {
                this.player.baseAtk += val;
                this.player.recalculateStats();
            }
            else if (id === 'hp') {
                this.player.baseMaxHp += val;
                this.player.recalculateStats();
            }
            else if (id === 'mana') {
                this.player.baseMaxMana += val;
                this.player.recalculateStats();
            }
            // Late-game stats
            else if (id === 'breach') this.player.breachDamage = (this.player.breachDamage || 0) + val;
            else if (id === 'combo') this.player.comboMult = (this.player.comboMult || 0.01) + val;
            else if (id === 'crit') this.player.critDamage += val;

            // LEVEL UP THE ITEM
            this.shopData[id].level++;
            console.log(`Bought ${id}. New Level: ${this.shopData[id].level}. New Price: ${this.getItemCost(id)}`);

            this.updateUI();
            this.generateShop(); // Completely Re-Render the shop to show new Price/Level
        }
    },

    buyShopEquipment(item) {
        if (this.gold < item.price) {
            this.showText("INSUFFICIENT FUNDS", this.player.mesh.position, '#ff0000');
            return;
        }

        this.gold -= item.price;
        item.sold = true; // Mark as sold so it disappears from list

        const newItem = { ...item, id: Date.now() + Math.random() };
        delete newItem.price;
        delete newItem.shopId;
        delete newItem.sold;

        this.player.inventory.push(newItem);
        this.showCrateAnimation(newItem); // Reuse the animation for "Gained Item"

        this.updateUI();
        this.generateShop();
    },

    // --- CRATE LOGIC ---
    buyEliteCrate(cost) {
        if (this.gold < cost) {
            this.showText("INSUFFICIENT FUNDS", this.player.mesh.position, '#ff0000');
            return;
        }

        this.gold -= cost;
        this.updateUI();

        // Determine Rarity (Rare 60%, Epic 35%, Legendary 5%)
        let rarity = 'rare';
        const rnd = Math.random();
        if (rnd > 0.95) rarity = 'legendary';
        else if (rnd > 0.60) rarity = 'epic';
        else rarity = 'rare';

        this.giveRandomItemFromPool(rarity);
    },

    buyStandardCrate(cost) {
        if (this.gold < cost) {
            this.showText("INSUFFICIENT FUNDS", this.player.mesh.position, '#ff0000');
            return;
        }

        this.gold -= cost;
        this.updateUI();

        // Determine Rarity (Common 60%, Rare 35%, Epic 5%)
        let rarity = 'common';
        const rnd = Math.random();
        if (rnd > 0.95) rarity = 'epic';
        else if (rnd > 0.60) rarity = 'rare';
        else rarity = 'common';

        this.giveRandomItemFromPool(rarity);
    },

    giveRandomItemFromPool(rarity) {
        const types = ['WEAPONS', 'ACCESSORIES'];
        const type = types[Math.floor(Math.random() * types.length)];
        if (typeof ITEMS === 'undefined') return;

        const pool = ITEMS[type].filter(i => i.rarity === rarity);
        if (pool.length === 0) {
            console.error("No items found for rarity:", rarity);
            return;
        }

        const itemTemplate = pool[Math.floor(Math.random() * pool.length)];
        const newItem = { ...itemTemplate, id: Date.now() + Math.random() };
        this.player.inventory.push(newItem);
        this.showCrateAnimation(newItem);
    },
});
