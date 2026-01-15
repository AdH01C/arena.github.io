Object.assign(game, {
    offerJobSelection(tier) {
        this.state = 'SHOP'; // Lock state during selection
        this.setScreen('class-screen');
        const container = document.getElementById('class-container');
        container.innerHTML = '';

        // Add Re-roll button if tier 0
        let rerollBtn = document.getElementById('job-reroll-btn');
        if (!rerollBtn) {
            rerollBtn = document.createElement('button');
            rerollBtn.id = 'job-reroll-btn';
            rerollBtn.className = 'btn';
            rerollBtn.style.marginTop = '20px';
            rerollBtn.style.background = 'linear-gradient(180deg, #555, #222)';
            rerollBtn.style.border = '1px solid #444';
            rerollBtn.innerText = '↺ RE-ROLL CLASSES';
            rerollBtn.onclick = () => this.offerJobSelection(0);
            document.getElementById('class-screen').appendChild(rerollBtn);
        }

        if (tier === 0) {
            rerollBtn.style.display = 'block';
            document.querySelector('#class-screen h2').innerText = "SELECT BASE CLASS";

            // 1. Define all available classes
            const allJobs = ['RONIN', 'PRIEST', 'MECH', 'GUNSLINGER', 'KNIGHT', 'SHADOW', 'BRAWLER', 'HACKER', 'REAPER'];

            // 2. Shuffle and pick 3 random classes
            const randomJobs = allJobs
                .sort(() => 0.5 - Math.random()) // Shuffle
                .slice(0, 3); // Take top 3

            // 3. Create cards for the lucky 3
            randomJobs.forEach(jobKey => {
                this.createJobCard(container, CLASS_TREES[jobKey][0], () => {
                    rerollBtn.style.display = 'none'; // Hide on selection
                    this.setJob(jobKey, 0);
                    if (this.tutorialState === 'ACTIVE') {
                        this.showTutorialStep(2);
                        this.tutorialStep = 2;
                    }
                }, jobKey);
            });

        } else {
            rerollBtn.style.display = 'none';
            // New Logic: Choose 1 Skill from the new Tier
            document.querySelector('#class-screen h2').innerText = `TIER ${tier + 1} ADVANCEMENT - CHOOSE S.K.I.L.L.`;
            const currentKey = this.player.jobType;
            const tierData = CLASS_TREES[currentKey][tier];

            if (tierData) {
                // Show cards for each skill in the tier
                tierData.skills.forEach((skill, index) => {
                    this.createSkillCard(container, skill, () => {
                        this.setJob(currentKey, tier, index);
                    }, currentKey);
                });
            } else {
                this.nextFloor();
            }
        }
    },

    createJobCard(container, jobData, onClick, jobKey = '') {
        // const card = document.createElement('div');
        // card.className = 'perk-card legendary'; card.style.height = 'auto';
        // const s3 = jobData.skills[2];
        // const buffInfo = s3 ? `<br><strong style="color:#ffe600">3:</strong> <span style="color:#ffe600">${s3.name}</span><br><span style="color:#aaa">${s3.desc}</span>` : '';

        // // Mark broken classes
        // const isBroken = jobKey === 'SHADOW' || jobKey === 'BRAWLER' || jobKey === 'HACKER';
        // const brokenTag = isBroken ? `<div style="background:linear-gradient(90deg,#ff0000,#ff6600);color:#fff;font-weight:bold;padding:4px 8px;border-radius:4px;font-size:12px;margin-bottom:8px;text-shadow:0 0 5px #000;">⚠️ BROKEN ⚠️</div>` : '';

        // card.innerHTML = `${brokenTag}<div class="perk-title">${jobData.name}</div><div class="perk-desc">${jobData.desc}</div>
        // <div style="font-size:14px;color:#fff;margin-top:10px;"><strong>1:</strong> ${jobData.skills[0].name}<br><span style="color:#aaa">${jobData.skills[0].mult}x / ${jobData.skills[0].hits||1} Hits</span><br><strong>2:</strong> ${jobData.skills[1].name}<br><span style="color:#aaa">${jobData.skills[1].mult}x / ${jobData.skills[1].hits||1} Hits</span>${buffInfo}</div>`;
        // card.onclick = onClick; container.appendChild(card);

        // --- 1. DEFINE UNIQUE THEMES PER CLASS ---
        const JOB_THEMES = {
            "RONIN": {
                border: "2px solid #aa00ff",
                shadow: "0 0 20px rgba(170, 0, 255, 0.6)",
                bg: "linear-gradient(135deg, rgba(30,0,50,0.9), rgba(60,0,100,0.9))",
                titleColor: "#dcb3ff"
            },
            "PRIEST": {
                border: "2px solid #00f2ff",
                shadow: "0 0 20px rgba(0, 242, 255, 0.5)",
                bg: "linear-gradient(135deg, rgba(0,20,30,0.9), rgba(0,50,60,0.9))",
                titleColor: "#ccffff"
            },
            "MECH": {
                border: "2px solid #ff6600",
                shadow: "0 0 20px rgba(255, 102, 0, 0.5)",
                bg: "linear-gradient(135deg, rgba(40,15,0,0.9), rgba(80,30,0,0.9))",
                titleColor: "#ffccaa"
            },
            "SHADOW": {
                border: "2px solid #00ff00",
                shadow: "0 0 20px rgba(0, 255, 0, 0.4)",
                bg: "linear-gradient(135deg, #050505, #112211)",
                titleColor: "#aaffaa"
            },
            "BRAWLER": {
                border: "2px solid #ff0000",
                shadow: "0 0 20px rgba(255, 0, 0, 0.5)",
                bg: "linear-gradient(135deg, #220000, #440000)",
                titleColor: "#ffaaaa"
            },
            "GUNSLINGER": {
                border: "2px solid #ffaa00",
                shadow: "0 0 20px rgba(255, 170, 0, 0.6)",
                bg: "linear-gradient(135deg, #221100, #442200)",
                titleColor: "#ffeeb0"
            },
            "KNIGHT": {
                border: "2px solid #ffffff",
                shadow: "0 0 20px rgba(255, 255, 255, 0.4)",
                bg: "linear-gradient(135deg, #111, #333)",
                titleColor: "#ffffff"
            },
            "HACKER": { border: "2px solid #00ff00", shadow: "0 0 25px rgba(0, 255, 0, 0.8), inset 0 0 10px rgba(0,255,0,0.2)", bg: "repeating-linear-gradient(45deg, #000 0px, #001100 10px, #000 20px)", titleColor: "#00ff00" },
            "REAPER": { border: "2px solid #5500aa", shadow: "0 0 20px rgba(85, 0, 170, 0.6)", bg: "linear-gradient(135deg, rgba(20,0,40,0.9), rgba(40,0,80,0.9))", titleColor: "#9933ff" }
        };

        // Fallback style if key is missing
        const theme = JOB_THEMES[jobKey] || { border: "2px solid #fff", shadow: "0 0 10px #fff", bg: "#222", titleColor: "#fff" };

        const card = document.createElement('div');
        // We remove 'legendary' class to override with custom styles, keep 'perk-card' for layout
        card.className = 'perk-card';

        // --- 2. APPLY THE CUSTOM STYLES ---
        Object.assign(card.style, {
            height: 'auto',
            border: theme.border,
            boxShadow: theme.shadow,
            background: theme.bg,
            transition: "transform 0.2s, box-shadow 0.2s"
        });

        // Add hover effect via JS since we are using inline styles
        card.onmouseover = () => { card.style.transform = "scale(1.05)"; card.style.boxShadow = `${theme.shadow}, 0 0 40px ${theme.border.split(' ')[2]}`; };
        card.onmouseout = () => { card.style.transform = "scale(1)"; card.style.boxShadow = theme.shadow; };

        // --- 3. BUILD CONTENT ---
        const s3 = jobData.skills[2];
        const buffInfo = s3 ? `<br><strong style="color:${theme.titleColor}">3:</strong> <span style="color:#fff">${s3.name}</span><br><span style="color:#aaa">${s3.desc}</span>` : '';

        // Mark broken classes
        const isBroken = false;
        const brokenTag = isBroken ? `<div style="background:linear-gradient(90deg,#ff0000,#ff6600);color:#fff;font-weight:bold;padding:4px 8px;border-radius:4px;font-size:12px;margin-bottom:8px;text-align:center;box-shadow:0 0 10px #ff0000;">⚠️ EXPERIMENTAL ⚠️</div>` : '';

        card.innerHTML = `
            ${brokenTag}
            <div class="perk-title" style="color:${theme.titleColor}; text-shadow:0 0 10px ${theme.titleColor}; margin-bottom:5px; font-size: 22px;">${jobData.name}</div>
            <div class="perk-desc" style="color:#ddd; font-style:italic; margin-bottom:10px;">${jobData.desc}</div>
            <div style="background:rgba(0,0,0,0.5); padding:10px; border-radius:5px; border:1px solid rgba(255,255,255,0.1);">
                <div style="font-size:14px;color:#fff;margin-top:5px;">
                    <strong style="color:${theme.titleColor}">1:</strong> ${jobData.skills[0].name}<br>
                    <span style="color:#aaa; font-size:12px">${jobData.skills[0].mult}x / ${jobData.skills[0].hits || 1} Hits</span>
                </div>
                <div style="font-size:14px;color:#fff;margin-top:8px;">
                    <strong style="color:${theme.titleColor}">2:</strong> ${jobData.skills[1].name}<br>
                    <span style="color:#aaa; font-size:12px">${jobData.skills[1].mult}x / ${jobData.skills[1].hits || 1} Hits</span>
                </div>
                ${buffInfo ? `<div style="font-size:14px;color:#fff;margin-top:8px;">${buffInfo}</div>` : ''}
            </div>
        `;

        card.onclick = onClick;
        container.appendChild(card);

    },

    createSkillCard(container, skill, onClick, jobKey) {
        // Reuse theme logic from createJobCard if possible, or default
        const JOB_THEMES = {
            "RONIN": { border: "2px solid #aa00ff", shadow: "0 0 20px rgba(170, 0, 255, 0.6)", bg: "linear-gradient(135deg, rgba(30,0,50,0.9), rgba(60,0,100,0.9))", titleColor: "#dcb3ff" },
            "PRIEST": { border: "2px solid #00f2ff", shadow: "0 0 20px rgba(0, 242, 255, 0.5)", bg: "linear-gradient(135deg, rgba(0,20,30,0.9), rgba(0,50,60,0.9))", titleColor: "#ccffff" },
            "MECH": { border: "2px solid #ff6600", shadow: "0 0 20px rgba(255, 102, 0, 0.5)", bg: "linear-gradient(135deg, rgba(40,15,0,0.9), rgba(80,30,0,0.9))", titleColor: "#ffccaa" },
            "SHADOW": { border: "2px solid #00ff00", shadow: "0 0 20px rgba(0, 255, 0, 0.4)", bg: "linear-gradient(135deg, #050505, #112211)", titleColor: "#aaffaa" },
            "BRAWLER": { border: "2px solid #ff0000", shadow: "0 0 20px rgba(255, 0, 0, 0.5)", bg: "linear-gradient(135deg, #220000, #440000)", titleColor: "#ffaaaa" },
            "GUNSLINGER": { border: "2px solid #ffaa00", shadow: "0 0 20px rgba(255, 170, 0, 0.6)", bg: "linear-gradient(135deg, #221100, #442200)", titleColor: "#ffeeb0" },
            "KNIGHT": { border: "2px solid #ffffff", shadow: "0 0 20px rgba(255, 255, 255, 0.4)", bg: "linear-gradient(135deg, #111, #333)", titleColor: "#ffffff" },
            "HACKER": { border: "2px solid #00ff00", shadow: "0 0 25px rgba(0, 255, 0, 0.8), inset 0 0 10px rgba(0,255,0,0.2)", bg: "repeating-linear-gradient(45deg, #000 0px, #001100 10px, #000 20px)", titleColor: "#00ff00" }
        };

        const theme = JOB_THEMES[jobKey] || { border: "2px solid #fff", shadow: "0 0 10px #fff", bg: "#222", titleColor: "#fff" };

        const card = document.createElement('div');
        card.className = 'perk-card';
        Object.assign(card.style, {
            height: 'auto', border: theme.border, boxShadow: theme.shadow, background: theme.bg, transition: "transform 0.2s, box-shadow 0.2s"
        });
        card.onmouseover = () => { card.style.transform = "scale(1.05)"; card.style.boxShadow = `${theme.shadow}, 0 0 40px ${theme.border.split(' ')[2]}`; };
        card.onmouseout = () => { card.style.transform = "scale(1)"; card.style.boxShadow = theme.shadow; };

        const costDisplay = skill.cost > 0 ? `${skill.cost} MP` : 'FREE';
        const typeDisplay = skill.isBuff ? 'BUFF' : 'ATTACK';
        const hitsDisplay = skill.isBuff ? '' : ` | ${skill.hits || 1} Hits`;

        card.innerHTML = `
            <div class="perk-title" style="color:${theme.titleColor}; text-shadow:0 0 10px ${theme.titleColor}; margin-bottom:5px; font-size: 22px;">${skill.name}</div>
            <div class="perk-desc" style="color:#ddd; font-style:italic; margin-bottom:10px;">${skill.desc || 'A powerful skill.'}</div>
            <div style="background:rgba(0,0,0,0.5); padding:10px; border-radius:5px; border:1px solid rgba(255,255,255,0.1);">
                <div style="font-size:14px;color:#fff;">
                    <strong style="color:${theme.titleColor}">TYPE:</strong> ${typeDisplay}<br>
                    <strong style="color:${theme.titleColor}">COST:</strong> ${costDisplay}<br>
                    <span style="color:#aaa; font-size:12px">${skill.isBuff ? `Duration: ${skill.duration} Turns` : `${skill.mult}x DMG${hitsDisplay}`}</span>
                </div>
            </div>
        `;

        card.onclick = onClick;
        container.appendChild(card);
    },

    setJob(type, tier, skillIndex = -1) {
        this.player.jobType = type;
        this.player.jobTier = tier;

        // New Logic for Skills
        if (tier === 0) {
            // Base Class: Unlock All 3
            this.player.unlockedSkills = [...CLASS_TREES[type][0].skills];
            // Pin first 2
            this.player.pinnedSkills = [this.player.unlockedSkills[0], this.player.unlockedSkills[1]];
        } else if (skillIndex >= 0) {
            // Advancement: Unlock Selected Skill
            const newSkill = CLASS_TREES[type][tier].skills[skillIndex];
            this.player.unlockedSkills.push(newSkill);
            this.showText("SKILL UNLOCKED!", this.player.mesh.position, "#ffe600");
        }

        // Update player model based on class
        this.updatePlayerModel(type, tier);

        if (tier > 0) {
            const scale = tier + 1;
            this.player.atk += 25 * scale;
            this.player.maxHp += 150 * scale;
            this.player.hp = this.player.maxHp;
            this.player.maxMana += 50 * scale;
            this.player.mana = this.player.maxMana;
            this.player.manaRegen += 2 * scale;
            this.showText("ASCENDED!", this.player.mesh.position, "#ffe600");
        }
        this.updateButtons(); this.state = 'IDLE'; this.setScreen('hud'); document.getElementById('battle-controls').classList.add('active');
        // Reveal class viewer button now that player has a class
        const cb = document.getElementById('classes-btn'); if (cb) cb.style.display = 'block';
        if (!this.enemy || this.enemy.hp <= 0) this.spawnEnemy();
        this.updateUI();

        // Show next tutorial step if active (step 2: combat)
        if (this.tutorialState === 'ACTIVE' && tier === 0) {
            setTimeout(() => { this.showTutorialStep(2); }, 500);
        }
    },

    updatePlayerModel(type, tier) {
        // Store old position
        const oldPos = this.player.mesh.position.clone();
        const oldRot = this.player.mesh.rotation.y;

        // Remove old mesh
        engine.scene.remove(this.player.mesh);

        // Create new model based on class
        const colors = { 'RONIN': 0xaa00ff, 'PRIEST': 0x00f2ff, 'MECH': 0xff6600, 'SHADOW': 0x220033, 'BRAWLER': 0xff4400, 'GUNSLINGER': 0xffaa00, 'KNIGHT': 0x00aaff, 'REAPER': 0x5500aa };
        const color = colors[type] || 0x00f2ff;

        if (type === 'RONIN') {
            this.player.model = Models.createRonin(color, 1.5, tier);
        } else if (type === 'PRIEST') {
            this.player.model = Models.createPriest(color, 1.5, tier);
        } else if (type === 'MECH') {
            this.player.model = Models.createMech(color, 1.5, tier);
        } else if (type === 'SHADOW') {
            this.player.model = Models.createShadow(color, 1.5, tier);
        } else if (type === 'BRAWLER') {
            this.player.model = Models.createBrawler(color, 1.5, tier);
        } else if (type === 'GUNSLINGER') {
            this.player.model = Models.createGunslinger(color, 1.5, tier);
        } else if (type === 'KNIGHT') {
            this.player.model = Models.createKnight(color, 1.5, tier);
        } else if (type === 'HACKER') {
            this.player.model = Models.createHacker(color, 1.5, tier);
        } else if (type === 'REAPER') {
            this.player.model = Models.createReaper(color, 1.5, tier);
        } else {
            this.player.model = Models.createHumanoid(color, 1.5);
        }

        // Restore position
        this.player.mesh = this.player.model.mesh;
        this.player.mesh.position.copy(oldPos);
        this.player.mesh.rotation.y = oldRot;
        this.player.mesh.userData.idle = true;
        this.player.mesh.userData.baseY = 0;
        this.player.mesh.userData.idleSpeed = 0.002;
        this.player.mesh.userData.idleAmp = 0.1;

        engine.scene.add(this.player.mesh);
    },

});
