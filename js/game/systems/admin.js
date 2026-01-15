class AdminSystem {
    constructor(game) {
        this.game = game;
        this.isVisible = false;
        this.initUI();
    }

    initUI() {
        // Toggle Button (Hidden by default, can be enabled via console or specific gesture?)
        // For now, let's put a tiny visible button in top-left
        const toggleBtn = document.createElement('button');
        toggleBtn.innerText = "🐞";
        toggleBtn.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            font-size: 12px;
            background: none;
            border: none;
            cursor: pointer;
            z-index: 1000;
            opacity: 0.3;
        `;
        toggleBtn.onclick = () => this.togglePanel();
        document.body.appendChild(toggleBtn);

        // Panel
        this.panel = document.createElement('div');
        this.panel.id = 'admin-panel';
        this.panel.style.cssText = `
            position: absolute;
            top: 10px;
            left: 10px;
            width: 200px;
            background: rgba(0,0,0,0.9);
            border: 1px solid #ff0055;
            padding: 10px;
            z-index: 1001;
            display: none;
            font-family: monospace;
            color: #fff;
        `;

        const title = document.createElement('h3');
        title.innerText = "ADMIN CONSOLE";
        title.style.margin = "0 0 10px 0";
        title.style.color = "#ff0055";
        title.style.fontSize = "14px";
        this.panel.appendChild(title);

        this.addBtn("GOD MODE: OFF", (btn) => {
            this.game.player.invincible = !this.game.player.invincible;
            btn.innerText = `GOD MODE: ${this.game.player.invincible ? 'ON' : 'OFF'}`;
            btn.style.color = this.game.player.invincible ? '#00ff00' : '#fff';
            this.game.showText(this.game.player.invincible ? "GOD MODE ON" : "GOD MODE OFF", this.game.player.mesh.position, "#00ff00");
        });

        this.addBtn("💀 SUICIDE", () => {
            if (this.game.player) {
                this.game.player.hp = 0;
                this.game.updateUI(); // Reflect 0 HP
                // Trigger death logic if not auto-handled
                if (this.game.state === 'BATTLE' || this.game.state === 'IDLE') {
                    // Force a hit if needed or direct state change?
                    // Usually update() checks HP. Let's force check or simply wait.
                    // If Invincible, disable it first
                    this.game.player.invincible = false;
                    this.game.takeDamage(99999);
                }
            }
        });

        // Custom ATK Input
        const atkDiv = document.createElement('div');
        atkDiv.style.cssText = "display:flex; margin-bottom:5px; gap:5px;";

        const atkInput = document.createElement('input');
        atkInput.type = "number";
        atkInput.placeholder = "ATK Amount";
        atkInput.style.cssText = "width:60%; background:#222; color:#fff; border:1px solid #555; padding:4px; font-family:monospace;";

        const atkBtn = document.createElement('button');
        atkBtn.innerText = "+ATK";
        atkBtn.style.cssText = "flex:1; background:#444; border:1px solid #555; color:#fff; cursor:pointer; font-family:monospace;";
        atkBtn.onclick = () => {
            const val = parseInt(atkInput.value);
            if (!isNaN(val) && this.game.player) {
                this.game.player.atk += val;
                this.game.showText(`+${val} ATK`, this.game.player.mesh.position, "#ffaa00");
                this.game.updateUI();
            }
        };

        atkDiv.appendChild(atkInput);
        atkDiv.appendChild(atkBtn);
        this.panel.appendChild(atkDiv);

        this.addBtn("💰 +1000 CREDITS", () => {
            this.game.addGold(1000);
            this.game.showText("+1000 G", this.game.player.mesh.position, "#ffe600");
        });

        this.addBtn("⏩ SKIP FLOOR", () => {
            this.game.showText("WARPING...", this.game.player.mesh.position, "#00f2ff");
            setTimeout(() => this.game.nextFloor(), 500);
        });

        this.addBtn("🚀 SKIP 10 FLOORS", () => {
            this.game.showText("HYPER WARP...", this.game.player.mesh.position, "#00f2ff");
            this.game.floor += 9; // nextFloor adds 1, so +9
            setTimeout(() => this.game.nextFloor(), 500);
        });

        this.addBtn("🔄 RESTART", () => {
            location.reload();
        });

        this.addBtn("CLOSE", () => this.togglePanel());

        document.body.appendChild(this.panel);
    }

    addBtn(label, callback) {
        const btn = document.createElement('button');
        btn.innerText = label;
        btn.style.cssText = `
            display: block;
            width: 100%;
            background: #333;
            border: 1px solid #555;
            color: #fff;
            padding: 5px;
            margin-bottom: 5px;
            cursor: pointer;
            font-family: inherit;
            font-size: 11px;
        `;
        btn.onclick = () => callback(btn);
        this.panel.appendChild(btn);
    }

    togglePanel() {
        this.isVisible = !this.isVisible;
        this.panel.style.display = this.isVisible ? 'block' : 'none';

        // Update God Mode button state immediately if open
        if (this.isVisible && this.game.player) {
            // Re-render handled by individual interactions, 
            // but we could refresh states here.
        }
    }
}
