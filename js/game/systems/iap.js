Object.assign(game, {
    openIAPShop() {
        // Don't open during animations
        if (this.state === 'ANIMATING' || this.state === 'FRENZY_MASH') return;

        // Only save state if we're in a playable state
        if (this.state === 'IDLE' || this.state === 'REWARD' || this.state === 'SHOP') {
            this.previousState = this.state;
        } else {
            this.previousState = 'IDLE'; // Default to IDLE
        }
        this.state = 'IAP_SHOP';
        document.getElementById('iap-screen').classList.add('active');
        // Hide battle controls while in IAP shop
        document.getElementById('battle-controls').classList.remove('active');
        const iapBtn = document.getElementById('iap-btn');
        if (iapBtn) iapBtn.style.display = 'none';

        this.updateMutationUI();

        // Create preview container if missing
        if (!document.getElementById('iap-preview-container')) {
            const container = document.createElement('div');
            container.id = 'iap-preview-container';
            container.style.cssText = `
                position: absolute;
                bottom: 20px;
                right: 20px;
                width: 300px;
                background: rgba(0,0,0,0.8);
                border: 1px solid #bf00ff;
                border-radius: 8px;
                padding: 15px;
                color: #fff;
                display: none;
                z-index: 1000;
                pointer-events: none;
            `;
            document.body.appendChild(container);
        }
    },

    closeIAPShop() {

        document.getElementById('iap-screen').classList.remove('active');
        // Restore to previous state, ensuring it's a valid state
        this.state = this.previousState || 'IDLE';
        // If we were in battle (IDLE state with enemy alive), show controls again
        if (this.state === 'IDLE' && this.enemy && this.enemy.hp > 0) {
            document.getElementById('battle-controls').classList.add('active');
        }
        const iapBtn = document.getElementById('iap-btn');
        if (iapBtn) iapBtn.style.display = 'flex';

        this.updateMutationUI();
    },

    // --- NEW IAP LOGIC ---
    buyNeonPrime() {
        if (this.iapBoosts.neonPrime) { this.showModal("ERROR", "ALREADY OWNED!"); return; }
        this.showModal("NEON PRIME", "Purchase NEON PRIME for $19.99?<br><br>• +50% Gold Forever<br>• Gold Name<br>• Exclusive Aura", () => {
            this.iapBoosts.neonPrime = true;
            this.showText("NEON PRIME ACTIVATED", this.player.mesh.position, '#ffd700');
            engine.spawnShockwave(this.player.mesh.position, 0xffd700, 10);
            this.showModal("SUCCESS", "👑 NEON PRIME UNLOCKED! Thank you for your support!");
        });
    },

    buyRemoveAds() {
        if (this.iapBoosts.noAds) { this.showModal("ERROR", "ADS ALREADY REMOVED!"); return; }
        this.showModal("REMOVE ADS", "Remove Ads + Get Starter Kit for $4.99?", () => {
            this.iapBoosts.noAds = true;

            // Give Starter Kit (Full Set of Rare Gear)
            const kit = [
                { name: "PLASMA BLADE", type: "weapon", rarity: "rare", atk: 50, crit: 5, desc: "Starter Prime Blade" },
                { name: "NEO VISOR", type: "accessory", rarity: "rare", hp: 200, mana: 50, desc: "Tactical HUD" }
            ];

            kit.forEach(item => this.player.inventory.push(item));
            this.showText("STARTER KIT ADDED!", this.player.mesh.position, '#00f2ff');
            this.showModal("SUCCESS", "🚫 ADS REMOVED! Starter Kit added to Inventory.");
        });
    },

    buyLootCrate(dummyTier) {
        // Renamed 'Legendary Crate' to just 'Loot Crate' visually, but function remains for compatibility
        this.showModal("SUPPLY DROP", "Purchase LOOT CRATE for $4.99?<br>Contains 1 Item (Weighted Rarity).", () => {
            // WEIGHTED RNG
            const rand = Math.random();
            let tier = 'common';
            if (rand < 0.05) tier = 'legendary'; // 5%
            else if (rand < 0.20) tier = 'epic'; // 15%
            else if (rand < 0.50) tier = 'rare'; // 30%
            else tier = 'common'; // 50%

            const types = ['WEAPONS', 'ACCESSORIES'];
            const randType = types[Math.floor(Math.random() * 2)];
            const pool = ITEMS[randType].filter(i => i.rarity === tier);

            if (pool.length === 0) { this.showModal("ERROR", "Crate Empty (Bug)"); return; }

            const item = pool[Math.floor(Math.random() * pool.length)];

            // Add to Inventory instead of Equip
            this.player.inventory.push(item);
            this.showCrateAnimation(item);
        });
    },

    buyOverclock() {
        this.showModal("SYSTEM OVERCLOCK", "Purchase SYSTEM OVERCLOCK for $2.99?<br>(+100% DAMAGE & SPEED for 10 Floors)", () => {
            this.iapBoosts.overclockFloors = 10;
            if (this.player) {
                this.player.atkMult = (this.player.atkMult || 0) + 1.0;
                this.showText("SYSTEM OVERCLOCK!!", this.player.mesh.position, '#ff0055');
            }
            this.showModal("SUCCESS", "⚡ SYSTEM OVERCLOCK ACTIVE!");
        });
    },

    buyRevivePack() {
        this.showModal("REVIVE PACK", "Purchase 5x REVIVE PROTOCOLS for $1.99?", () => {
            this.iapBoosts.reviveTokens = (this.iapBoosts.reviveTokens || 0) + 5;
            this.showModal("SUCCESS", `✅ Purchased 5 Revive Tokens! Current: ${this.iapBoosts.reviveTokens}`);
        });
    },

    buyCredits(amount, price) {
        let actualAmount = amount;
        if (this.iapBoosts.neonPrime) {
            actualAmount = Math.floor(amount * 1.5);
        }
        const msg = `Purchase ${actualAmount.toLocaleString()} Credits for $${price}?` + (this.iapBoosts.neonPrime ? "<br><small>(Includes +50% Prime Bonus)</small>" : "");

        this.showModal("CREDITS", msg, () => {
            this.gold += actualAmount;
            this.showText(`+${actualAmount.toLocaleString()} 💰`, this.player?.mesh?.position || { x: 0, y: 1, z: 0 }, '#ffe600');
            this.updateUI();
        });
    },

    previewIAP(type, val) {
        const container = document.getElementById('iap-preview-container');
        if (!container) return;

        if (!type) {
            container.style.display = 'none';
            return;
        }

        container.style.display = 'block';
        let html = '';

        if (type === 'overclock') {
            html = `<h4 style="color:#ff0055;margin:0">SYSTEM OVERCLOCK</h4>
                    <p style="font-size:12px;color:#aaa">Directly injects performance boosters into the simulation.</p>
                    <div style="color:#00ff00;font-weight:bold">+100% PLAYER DAMAGE</div>
                    <div style="color:#00ff00;font-weight:bold">+100% ATTACK SPEED</div>
                    <p style="font-size:10px;margin-top:5px;opacity:0.6">DURATION: 10 FLOORS</p>`;
        } else if (type === 'revive') {
            html = `<h4 style="color:#00f2ff;margin:0">REVIVE PACK</h4>
                    <p style="font-size:12px;color:#aaa">Emergency data recovery protocols.</p>
                    <div style="color:#00ff00;font-weight:bold">+5 REVIVE TOKENS</div>
                    <p style="font-size:10px;margin-top:5px;opacity:0.6">Prevent progress loss on defeat.</p>`;
        } else if (type === 'credits') {
            html = `<h4 style="color:#ffe600;margin:0">CREDIT BUNDLE</h4>
                    <div style="font-size:24px;color:#ffe600;margin:10px 0">${val.toLocaleString()} 💰</div>
                    <p style="font-size:12px;color:#aaa">Standard currency for shop upgrades.</p>`;
        }

        container.innerHTML = html;
    },

});
