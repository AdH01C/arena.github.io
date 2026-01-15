Object.assign(game, {
    openInventory() {
        if (!this.player) return; // safety

        // Populate Hero Panel
        const classTitle = document.getElementById('inv-class-title');
        const levelDisplay = document.getElementById('inv-level-display');
        // Fallback to player.type if job is undefined (e.g. initial state)
        // Also ensure level is defined (default to 1 if missing)
        const jobName = this.player.job || this.player.type || 'UNKNOWN';
        const level = this.player.level !== undefined ? this.player.level : 1;

        if (classTitle) classTitle.innerText = jobName.toUpperCase();
        if (levelDisplay) levelDisplay.innerText = `LVL ${level}`;

        document.getElementById('inventory-screen').classList.add('active');
        const iapBtn = document.getElementById('iap-btn'); if (iapBtn) iapBtn.style.display = 'none';
        if (document.getElementById('battle-controls')) document.getElementById('battle-controls').classList.remove('active');
        this.selectedInvIndex = -1; // Reset selection
        this.renderInventory();
        // this.updateDetailsPanel(); // Obsolete, using overlay
        this.updateMutationUI();
        // Initialize 3D Model
        setTimeout(() => {
            engine.initInventoryRenderer('paperdoll-model-container');

            // Use ACTUAL player mesh (cloned) to reflect exact look
            if (this.player && this.player.mesh) {
                engine.updateInventoryModel(this.player.mesh);
            }

            // Start Animation Loop
            const invLoop = () => {
                if (!document.getElementById('inventory-screen').classList.contains('active')) return;
                engine.renderInventoryFrame(this.mouseX, this.mouseY);
                requestAnimationFrame(invLoop);
            };
            invLoop();
        }, 100); // Slight delay for DOM to be ready/visible
    },

    closeInventory() {

        document.getElementById('inventory-screen').classList.remove('active');
        const iapBtn = document.getElementById('iap-btn'); if (iapBtn) iapBtn.style.display = 'flex';

        // Restore controls if valid
        if (this.state === 'IDLE' && this.enemy && this.enemy.hp > 0) {
            document.getElementById('battle-controls').classList.add('active');
        }
        this.updateMutationUI();
    },

    renderInventory() {
        const grid = document.getElementById('inventory-grid');
        if (!grid) return;

        grid.innerHTML = '';

        // Render Equipped
        const eqWep = document.getElementById('equip-weapon');
        const eqAcc = document.getElementById('equip-accessory');
        const w = this.player.gear.weapon;
        const a = this.player.gear.accessory;

        const getRarityColor = (rarity) => {
            if (rarity === 'rare') return '#00f2ff';
            if (rarity === 'epic') return '#bf00ff';
            if (rarity === 'legendary') return '#ffe600';
            return '#fff';
        };

        // Make equipped slots selectable
        if (eqWep) {
            eqWep.onclick = (e) => {
                e.stopPropagation(); // Prevent bubbling issues
                w ? this.selectEquippedItem('weapon') : null;
            };
            eqWep.innerHTML = w ? `<span style="color:${getRarityColor(w.rarity)}">${w.name}</span>` : 'EMPTY WEAPON';
            eqWep.className = w ? 'equip-slot big-slot weapon-slot filled' : 'equip-slot big-slot weapon-slot';
            // Note: kept 'big-slot' classes for CSS styling

            if (this.selectedEquippedSlot === 'weapon') eqWep.style.border = '1px solid #fff';
            else eqWep.style.border = '';
        }

        if (eqAcc) {
            eqAcc.onclick = (e) => {
                e.stopPropagation();
                a ? this.selectEquippedItem('accessory') : null;
            };
            eqAcc.innerHTML = a ? `<span style="color:${getRarityColor(a.rarity)}">${a.name}</span>` : 'EMPTY ACCESSORY';
            eqAcc.className = a ? 'equip-slot big-slot accessory-slot filled' : 'equip-slot big-slot accessory-slot';

            if (this.selectedEquippedSlot === 'accessory') eqAcc.style.border = '1px solid #fff';
            else eqAcc.style.border = '';
        }

        // Sort inventory properly
        const sorted = [...this.player.inventory].sort((a, b) => {
            const order = { legendary: 4, epic: 3, rare: 2, common: 1 };
            if (order[b.rarity] !== order[a.rarity]) return order[b.rarity] - order[a.rarity];
            // Sub-sort by stats (simple atk check)
            return (b.atkMult || 0) - (a.atkMult || 0);
        });

        // Render Bag
        sorted.forEach((item) => {
            // Find original index for actions
            const actualIdx = this.player.inventory.indexOf(item);

            const el = document.createElement('div');
            el.className = `inventory-item inv-rarity-${item.rarity}`;

            // Visual check for selection
            if (this.selectedInvIndex === actualIdx) {
                el.style.borderColor = "#fff";
                el.style.boxShadow = "0 0 10px #ffffff50";
            }

            const mainStat = this.getItemMainStat(item);
            const typeIcon = item.type === 'weapon' ? '⚔️' : '💍';

            // Rarity Colors
            let rarColor = '#fff';
            if (item.rarity === 'rare') rarColor = '#00f2ff';
            if (item.rarity === 'epic') rarColor = '#bf00ff';
            if (item.rarity === 'legendary') rarColor = '#ffe600';

            el.innerHTML = `
                <div class="inv-item-name" style="color:${rarColor}; font-weight:bold; font-size:14px;">${item.name}</div>
                <div class="inv-item-sub" style="font-size:10px; color:#888; text-transform:uppercase;">${item.rarity} ${item.type}</div>
                <div class="inv-item-stat" style="margin-top:4px; font-size:12px; color:#ddd;">
                    ${typeIcon} ${mainStat.val} <span style="font-size:10px; color:#aaa;">${mainStat.label}</span>
                </div>
            `;

            el.onclick = (e) => {
                e.stopPropagation();
                // Select and Show
                this.selectedInvIndex = actualIdx;
                this.selectedEquippedSlot = null; // Clear equipped selection
                this.renderInventory(); // Re-render to highlight this item
                this.showItemOverlay(item, actualIdx, false);
            };
            grid.appendChild(el);
        });

        // Update Stats Panel (if it exists)
        this.updateStatsPanel();
    },

    updateStatsPanel() {
        const statsDiv = document.getElementById('equip-stats');
        if (!statsDiv) return;

        const p = this.player;
        const fmtPct = (val) => (val * 100).toFixed(0) + '%';
        const styleStat = (label, val, color = '#fff') => `
            <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
                <span style="color:#aaa">${label}:</span>
                <span style="color:${color}">${val}</span>
            </div>`;

        statsDiv.innerHTML = `
            <div style="display:grid; grid-template-columns: 1fr 1fr; gap: 10px; font-family:'Courier New', monospace; font-size:13px;">
                <div>
                    ${styleStat('ATK', Math.floor(p.atk), '#ff0055')}
                    ${styleStat('HP', `${Math.floor(p.hp)}/${Math.floor(p.maxHp)}`, '#00f2ff')}
                    ${styleStat('MANA', `${Math.floor(p.mana)}/${Math.floor(p.maxMana)}`, '#0088ff')}
                    ${styleStat('ARMOR', p.armor, '#888')}
                </div>
                <div>
                    ${styleStat('CRIT', fmtPct(p.critChance), '#ffff00')}
                    ${styleStat('DMG', fmtPct(p.critDamage), '#ffaa00')}
                    ${styleStat('DODGE', fmtPct(p.dodge), '#00ff00')}
                    ${styleStat('VAMP', fmtPct(p.lifesteal), '#ff0000')}
                </div>
            </div>`;
    },

    // --- ITEM OVERLAY (New Premium UI) ---
    showItemOverlay(item, index, isEquipped = false) {
        const overlay = document.getElementById('inv-details-overlay');
        const content = document.getElementById('inv-details-content');
        const btnEquip = document.getElementById('btn-equip');
        const btnSell = document.getElementById('btn-sell');

        if (!overlay || !content) return;

        // Rarity Colors
        const rarColors = {
            common: '#fff', rare: '#00f2ff', epic: '#bf00ff', legendary: '#ffe600'
        };
        const rarColor = rarColors[item.rarity] || '#fff';
        const mainStat = this.getItemMainStat(item);

        content.innerHTML = `
            <div style="text-align:center; margin-bottom:20px;">
                <div style="font-size:24px; color:${rarColor}; font-weight:bold; margin-bottom:5px; text-shadow:0 0 10px ${rarColor}40;">${item.name}</div>
                <div style="font-size:14px; color:#aaa; letter-spacing:2px; text-transform:uppercase;">${item.rarity} ${item.type}</div>
            </div>
            
            <div style="background:rgba(255,255,255,0.05); padding:15px; border-radius:8px; width:100%; box-sizing:border-box; margin-bottom:20px;">
                <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid rgba(255,255,255,0.1); padding-bottom:10px; margin-bottom:10px;">
                    <span style="color:#aaa;">MAIN STAT</span>
                    <span style="font-size:18px; color:#fff; font-weight:bold;">${mainStat.val} ${mainStat.label}</span>
                </div>
                ${item.atkMult ? `<div style="display:flex; justify-content:space-between; color:#ddd; margin-bottom:5px;"><span>ATK Bonus:</span> <span style="color:#ff0055">+${(item.atkMult * 100).toFixed(0)}%</span></div>` : ''}
                ${item.hpMult ? `<div style="display:flex; justify-content:space-between; color:#ddd; margin-bottom:5px;"><span>HP Bonus:</span> <span style="color:#00f2ff">+${(item.hpMult * 100).toFixed(0)}%</span></div>` : ''}
                ${item.manaMult ? `<div style="display:flex; justify-content:space-between; color:#ddd; margin-bottom:5px;"><span>Mana Bonus:</span> <span style="color:#0088ff">+${(item.manaMult * 100).toFixed(0)}%</span></div>` : ''}
                ${item.critChance ? `<div style="display:flex; justify-content:space-between; color:#ddd; margin-bottom:5px;"><span>Crit Chance:</span> <span style="color:#ffff00">+${(item.critChance * 100).toFixed(0)}%</span></div>` : ''}
                ${item.critDamage ? `<div style="display:flex; justify-content:space-between; color:#ddd; margin-bottom:5px;"><span>Crit DMG:</span> <span style="color:#ffaa00">+${(item.critDamage * 100).toFixed(0)}%</span></div>` : ''}
                ${item.dodge ? `<div style="display:flex; justify-content:space-between; color:#ddd; margin-bottom:5px;"><span>Dodge:</span> <span style="color:#00ff00">+${(item.dodge * 100).toFixed(0)}%</span></div>` : ''}
                ${item.lifesteal ? `<div style="display:flex; justify-content:space-between; color:#ddd; margin-bottom:5px;"><span>Lifesteal:</span> <span style="color:#ff0000">+${(item.lifesteal * 100).toFixed(0)}%</span></div>` : ''}
                ${item.desc ? `<div style="margin-top:10px; font-style:italic; color:#888; font-size:12px; border-top:1px solid rgba(255,255,255,0.1); padding-top:10px;">"${item.desc}"</div>` : ''}
            </div>
            
            <div style="color:#666; font-size:12px; text-align:center; margin-bottom:5px;">
                ${isEquipped ? 'Action Preview' : 'Select action below'}
            </div>
        `;

        // Update Buttons if they exist
        if (btnEquip && btnSell) {
            if (isEquipped) {
                btnEquip.innerText = "UNEQUIP";
                btnEquip.onclick = () => {
                    this.unequip(item.type);
                    overlay.style.display = 'none';
                    this.renderInventory();
                };
                btnSell.style.display = 'none';
            } else {
                btnEquip.innerText = "EQUIP";
                btnEquip.onclick = () => {
                    this.selectedInvIndex = index; // Ensure selection matches
                    this.equipSelected(item.type);
                    overlay.style.display = 'none';
                    this.renderInventory();
                    // Play sound or effect?
                };

                btnSell.innerText = "SELL";
                btnSell.style.display = 'inline-block';
                btnSell.onclick = () => {
                    this.selectedInvIndex = index;
                    this.sellSelected();
                    overlay.style.display = 'none';
                };
            }
        }

        overlay.style.display = 'flex';
    },

    updateDetailsPanel() {
        // Legacy support or no-op
    },

    selectEquippedItem(slot) {
        this.selectedEquippedSlot = slot;
        this.selectedInvIndex = -1; // Deselect inventory
        this.renderInventory();

        // Show details overlay for the equipped item if it exists
        const item = this.player.gear[slot];
        if (item) {
            this.showItemOverlay(item, -1, true); // -1 index, true = isEquipped
        }
    },

    unequipSelected() {
        if (!this.selectedEquippedSlot) return;
        this.unequip(this.selectedEquippedSlot);
        this.selectedEquippedSlot = null;
        this.renderInventory();
    },

    sellSelected(price) {
        if (this.selectedInvIndex === -1) return;

        // Define price if not passed
        if (!price) {
            const item = this.player.inventory[this.selectedInvIndex];
            if (!item) return;
            const sellPrices = { common: 250, rare: 1500, epic: 8000, legendary: 30000 };
            price = sellPrices[item.rarity] || 100;
        }

        this.gold += price;
        this.player.inventory.splice(this.selectedInvIndex, 1);
        this.showText(`+${price} CR`, this.player.mesh.position, '#ffe600');
        this.selectedInvIndex = -1;
        this.renderInventory();
        this.updateUI();
    },

    equipSelected(slot) {
        if (this.selectedInvIndex === -1) return;
        this.equipInventoryItem(this.selectedInvIndex);
        this.selectedInvIndex = -1;
        this.renderInventory();
    },

    getItemMainStat(item) {
        // Prioritize multipliers first
        if (item.atkMult) return { label: 'ATK', val: '+' + (item.atkMult * 100).toFixed(0) + '%' };
        if (item.hpMult && item.hpMult > 0) return { label: 'HP', val: '+' + (item.hpMult * 100).toFixed(0) + '%' };
        if (item.hpMult && item.hpMult < 0) return { label: 'HP', val: (item.hpMult * 100).toFixed(0) + '%' };
        if (item.manaMult) return { label: 'MANA', val: '+' + (item.manaMult * 100).toFixed(0) + '%' };
        if (item.critChance) return { label: 'CRIT', val: '+' + (item.critChance * 100).toFixed(0) + '%' };
        if (item.critDamage) return { label: 'C.DMG', val: '+' + (item.critDamage * 100).toFixed(0) + '%' };
        if (item.lifesteal) return { label: 'VAMP', val: '+' + (item.lifesteal * 100).toFixed(0) + '%' };
        if (item.dodge) return { label: 'DODGE', val: '+' + (item.dodge * 100).toFixed(0) + '%' };
        if (item.armor) return { label: 'ARM', val: '+' + item.armor };
        if (item.regen) return { label: 'REGEN', val: '+' + item.regen };
        if (item.thorns) return { label: 'THORNS', val: '+' + (item.thorns * 100).toFixed(0) + '%' };
        // Legacy flat stats
        if (item.atk) return { label: 'ATK', val: '+' + item.atk };
        if (item.hp > 0) return { label: 'HP', val: '+' + item.hp };
        if (item.mana > 0) return { label: 'MANA', val: '+' + item.mana };
        if (item.crit) return { label: 'CRIT', val: '+' + (item.crit * 100).toFixed(0) + '%' };
        return { label: 'PWR', val: '1' };
    },

    renderEquippedSlots() {
        // Helper if we want to update slots separately

        // Stats Update
        // Stats Update
        const statsDiv = document.getElementById('equip-stats');
        const p = this.player;
        const fmtPct = (val) => (val * 100).toFixed(0) + '%';
        const styleStat = (label, val, color = '#fff') => `
            <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
                <span style="color:#aaa">${label}:</span>
                <span style="color:${color}">${val}</span>
            </div>`;

        statsDiv.innerHTML = `
            <div style="display:grid; grid-template-columns: 1fr 1fr; gap: 10px; font-family:'Courier New', monospace; font-size:13px;">
                <div>
                    ${styleStat('ATK', Math.floor(p.atk), '#ff0055')}
                    ${styleStat('HP', `${Math.floor(p.hp)}/${Math.floor(p.maxHp)}`, '#00f2ff')}
                    ${styleStat('MANA', `${Math.floor(p.mana)}/${Math.floor(p.maxMana)}`, '#0088ff')}
                    ${styleStat('ARMOR', p.armor, '#888')}
                </div>
                <div>
                    ${styleStat('CRIT', fmtPct(p.critChance), '#ffff00')}
                    ${styleStat('CRIT DMG', fmtPct(p.critDamage), '#ffaa00')}
                    ${styleStat('DODGE', fmtPct(p.dodge), '#00ff00')}
                    ${styleStat('VAMP', fmtPct(p.lifesteal), '#ff0000')}
                </div>
                <div style="grid-column: span 2; border-top:1px solid #444; margin-top:5px; padding-top:5px;">
                    ${styleStat('REGEN', `${p.regen || 0}/t`, '#00ff88')}
                    ${styleStat('THORNS', fmtPct(p.thorns), '#bf00ff')}
                    ${p.battleCombo > 0 ? styleStat('COMBO', 'x' + p.battleCombo, '#ffe600') : ''}
                </div>
            </div>
        `;
    },

    equipInventoryItem(index) {
        const item = this.player.inventory[index];
        // Remove from inventory
        this.player.inventory.splice(index, 1);

        // If something equipped, unequip it (swap)
        if (item.type === 'weapon' && this.player.gear.weapon) {
            this.player.inventory.push(this.player.gear.weapon);
        }
        if (item.type === 'accessory' && this.player.gear.accessory) {
            this.player.inventory.push(this.player.gear.accessory);
        }

        this.player.equip(item); // Use existing equip logic which sets this.gear
        this.renderInventory();
        this.updateUI();
    },

    unequip(type) {
        const item = this.player.gear[type];
        if (!item) return;

        // Add back to inventory
        this.player.inventory.push(item);

        // Remove stats and unequip
        this.player.unequip(type);

        this.renderInventory();
        this.updateUI();
    },

});
