Object.assign(game, {
    async playIntroSequence() {
        const startScreen = document.getElementById('start-screen');
        const introOverlay = document.getElementById('intro-overlay');
        const container = document.getElementById('intro-text-container');

        startScreen.classList.remove('active');
        introOverlay.style.display = 'flex';
        container.innerHTML = '';

        this.introActive = true;
        this.introSkipSignal = false;

        // Async Sleep that can be interrupted by click
        const interruptibleWait = (ms) => new Promise(resolve => {
            let elapsed = 0;
            const checkRate = 10;
            const t = setInterval(() => {
                elapsed += checkRate;
                if (!this.introActive || elapsed >= ms || this.introSkipSignal) {
                    clearInterval(t);
                    resolve(this.introSkipSignal); // Return true if skipped
                }
            }, checkRate);
        });

        for (const line of INTRO_SCRIPT) {
            if (!this.introActive) break;

            // Reset skip signal for the new line phase
            this.introSkipSignal = false;

            const el = document.createElement('div');
            el.className = `terminal-line ${line.s.toLowerCase()}`;
            if (line.s === 'SYSTEM') el.style.color = '#00f2ff';
            if (line.s === 'PLAYER') el.style.color = '#ffffff';
            el.textContent = `> ${line.s}: `;

            const span = document.createElement('span');
            el.appendChild(span);
            container.appendChild(el);

            // Fade in
            requestAnimationFrame(() => el.style.opacity = '1');

            // --- TYPEWRITER PHASE ---
            let textFnished = false;
            for (let i = 0; i < line.t.length; i++) {
                if (!this.introActive) break;

                // If skip signaled during typing, print rest and exit loop
                if (this.introSkipSignal) {
                    span.textContent = line.t; // Fill all
                    this.introSkipSignal = false; // Consume signal
                    textFnished = true;
                    break;
                }

                span.textContent += line.t[i];
                window.scrollTo(0, document.body.scrollHeight);
                await interruptibleWait(30);
            }
            if (!this.introActive) break;

            // --- READING PHASE ---
            // If we just skipped typing, we might want to pause briefly unless clicked again?
            // User requested "Allow skipping of lines". 
            // Standard behavior: Click (Finish Type) -> Wait -> Click (Next).

            // Calculate delay based on text length
            const baseDelay = 1000 + (line.t.length * 20);

            // Wait for delay OR signal
            await interruptibleWait(baseDelay);
        }

        this.finishIntro();
    },

    handleIntroClick() {
        if (this.introActive) {
            this.introSkipSignal = true;
        }
    },

    finishIntro() {
        if (!this.introActive) return;
        this.introActive = false; // Stop the loop

        const introOverlay = document.getElementById('intro-overlay');
        introOverlay.style.opacity = '0';
        introOverlay.style.transition = 'opacity 1s';

        setTimeout(() => {
            introOverlay.style.display = 'none';
            introOverlay.style.opacity = '1';
            this.startRun();
        }, 1000);
    },

    showClassTierModal(classKey, tierIndex) {
        // Remove existing modal
        const existing = document.getElementById('class-tier-modal'); if (existing) existing.remove();
        const existingOverlay = document.getElementById('class-tier-overlay'); if (existingOverlay) existingOverlay.remove();
        const data = CLASS_TREES[classKey][tierIndex];

        // overlay
        const overlay = document.createElement('div'); overlay.id = 'class-tier-overlay'; overlay.className = 'class-tier-overlay';

        const modal = document.createElement('div'); modal.id = 'class-tier-modal'; modal.className = 'class-tier-modal';
        modal.innerHTML = `
            <div class="modal-header">
                <div class="modal-title">${classKey} — ${data.name}</div>
                <div class="modal-tier">Tier ${tierIndex + 1}</div>
            </div>
            <div class="modal-body">
                <div class="modal-info">
                    <div class="modal-desc">${data.desc}</div>
                    <div class="modal-skills">
                        ${data.skills.map((s, i) => {
            const skillName = s.name || 'BASIC ATTACK';
            const costDisplay = s.cost > 0 ? s.cost + " MP" : "FREE";
            let effectDisplay = '';
            if (s.isBuff) {
                effectDisplay = s.desc || `${s.buffType ? s.buffType.toUpperCase() : 'BUFF'} +${((s.buffVal || 0) * 100).toFixed(0)}% for ${s.duration || 1} turns`;
            } else {
                effectDisplay = `${s.mult}x DMG × ${s.hits || 1} hit${(s.hits || 1) > 1 ? 's' : ''}`;
            }
            return `<div class="skill-row"><div class="skill-name">${i + 1}. ${skillName}</div><div class="skill-meta">${effectDisplay} — ${costDisplay}</div></div>`;
        }).join('')}
                    </div>
                    <div style="text-align:right;margin-top:12px;"><button class="btn" id="close-modal-btn">CLOSE</button></div>
                </div>
                <div class="modal-preview">
                    <canvas id="class-preview-canvas" class="modal-3d"></canvas>
                </div>
            </div>
        `;

        overlay.appendChild(modal);
        document.body.appendChild(overlay);

        // Close logic & cleanup
        const closeModal = () => {
            // dispose 3D preview if active
            if (this._classPreview && this._classPreview.dispose) {
                try { this._classPreview.dispose(); } catch (err) { }
                this._classPreview = null;
            }
            overlay.remove(); document.removeEventListener('keydown', keyFn);
        };
        document.getElementById('close-modal-btn').onclick = closeModal;
        overlay.onclick = (e) => { if (e.target === overlay) closeModal(); };

        const keyFn = (e) => { if (e.key === 'Escape') closeModal(); };
        document.addEventListener('keydown', keyFn);

        // Initialize a simple Three.js preview inside the modal if available
        const canvas = document.getElementById('class-preview-canvas');
        if (window.THREE && canvas) {
            const THREE = window.THREE;
            const preview = { raf: null };
            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / Math.max(canvas.clientHeight, 1), 0.1, 100);
            camera.position.set(0, 0, 3);
            const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
            renderer.setPixelRatio(window.devicePixelRatio || 1);
            renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);

            const light = new THREE.DirectionalLight(0xffffff, 0.9); light.position.set(5, 5, 5);
            const amb = new THREE.AmbientLight(0xffffff, 0.4);
            scene.add(light, amb);

            // simple geometry to represent the class; color derived from first skill or default
            const colorHex = (data.skills && data.skills[0] && data.skills[0].color) ? data.skills[0].color : 0x888888;
            const mat = new THREE.MeshStandardMaterial({ color: colorHex, metalness: 0.3, roughness: 0.4 });
            const geo = new THREE.IcosahedronGeometry(0.7, 1);
            const mesh = new THREE.Mesh(geo, mat);
            scene.add(mesh);

            const animate = () => {
                mesh.rotation.x += 0.01; mesh.rotation.y += 0.02;
                renderer.render(scene, camera);
                preview.raf = requestAnimationFrame(animate);
            };
            preview.dispose = () => {
                cancelAnimationFrame(preview.raf);
                window.removeEventListener('resize', onResize);
                try { renderer.dispose(); geo.dispose(); mat.dispose(); } catch (e) { }
            };
            preview.animate = animate;
            preview.renderer = renderer;
            this._classPreview = preview;
            // kick off
            setTimeout(() => { if (this._classPreview && this._classPreview.animate) this._classPreview.animate(); }, 50);
        }
    },
    showModal(title, content, onConfirm, showCancel = true) {
        // Safety Override for Seasonal Boss to ensure no Cancel button
        if (title.includes("ANOMALY")) showCancel = false;

        const overlay = document.getElementById('modal-overlay');
        document.getElementById('modal-title').innerText = title;
        document.getElementById('modal-content').innerHTML = content;
        overlay.classList.add('active');

        const okBtn = document.getElementById('modal-ok');
        const cancelBtn = document.getElementById('modal-cancel');

        // Reset Logic
        const newOk = okBtn.cloneNode(true);
        okBtn.parentNode.replaceChild(newOk, okBtn);

        newOk.onclick = () => {
            overlay.classList.remove('active');
            if (onConfirm) onConfirm();
        };

        // If content implies a choice, show cancel
        if (onConfirm && showCancel) {
            cancelBtn.style.display = 'inline-block';
            cancelBtn.onclick = () => overlay.classList.remove('active');
        } else {
            cancelBtn.style.display = 'none';
        }
    },

    showCrateAnimation(item) {
        const overlay = document.getElementById('crate-overlay');
        const box = document.getElementById('crate-box');
        const title = document.getElementById('crate-title');
        const itemDiv = document.getElementById('crate-item');
        const btn = document.getElementById('crate-close-btn');
        const light = document.getElementById('crate-light');
        const visual = document.getElementById('crate-visual');

        // FORCE RESET STATE
        title.innerText = "";
        title.style.color = "#fff";
        title.style.textShadow = "none";
        itemDiv.innerHTML = "";

        overlay.classList.add('active');
        box.style.transform = 'scale(0)';
        title.style.opacity = '0';
        itemDiv.style.opacity = '0';
        btn.style.opacity = '0';
        light.style.opacity = '1';
        light.style.transform = 'scale(1)';
        visual.style.display = 'block';

        // 1. Zoom in box
        setTimeout(() => { box.style.transform = 'scale(1)'; }, 100);

        // 2. Flash of light & Reveal
        setTimeout(() => {
            light.style.transform = 'scale(50)';
            light.style.opacity = '0';
        }, 1500);

        setTimeout(() => {
            visual.style.display = 'none'; // Hide crate box
            title.style.opacity = '1';

            // Item Card Visual
            let color = '#fff';
            if (item.rarity === 'rare') color = '#00f2ff';
            if (item.rarity === 'epic') color = '#bf00ff';
            if (item.rarity === 'legendary') color = '#ffe600';

            title.innerText = item.rarity.toUpperCase() + " DROP";
            title.style.color = color;
            title.style.textShadow = `0 0 20px ${color}`;

            itemDiv.innerHTML = `
                <div style="font-size:24px; font-weight:bold; margin-top:20px; color:${color}">${item.name}</div>
                <div style="color:#aaa; font-style:italic;">${item.type.toUpperCase()}</div>
                <div style="background:rgba(255,255,255,0.1); padding:10px; margin-top:10px;">${item.desc}</div>
            `;
            itemDiv.style.opacity = '1';
        }, 1800);

        // 3. Show Collect Button
        setTimeout(() => { btn.style.opacity = '1'; }, 2500);
    },

    closeCrate() {
        document.getElementById('crate-overlay').classList.remove('active');
        // Do NOT reset display:block yet, let showCrateAnimation handle it.
        // This prevents the "flash" of the crate emoji during fade out.
    },

    // --- TEXT QUEUE SYSTEM ---
    textQueue: [],
    isProcessingText: false,

    processTextQueue() {
        if (this.textQueue.length === 0) {
            this.isProcessingText = false;
            return;
        }

        this.isProcessingText = true;
        const item = this.textQueue.shift();
        this.renderFloatingText(item.txt, item.pos, item.color);

        setTimeout(() => {
            this.processTextQueue();
        }, 200); // 0.2s delay between pops
    },

    renderFloatingText(txt, pos, color) {
        const div = document.createElement('div');
        div.className = 'dmg-float'; div.innerText = txt; div.style.color = color;
        const vec = pos.clone();
        vec.x += (Math.random() - 0.5) * 0.5;
        vec.y += 2.5 + (Math.random() - 0.5) * 0.5;
        vec.project(engine.camera);
        div.style.left = (vec.x * 0.5 + 0.5) * window.innerWidth + 'px';
        div.style.top = (-(vec.y * 0.5) + 0.5) * window.innerHeight + 'px';
        document.body.appendChild(div);
        setTimeout(() => div.remove(), 600);
    },

    showText(txt, pos, color) {
        // INSTANT TEXT (No Queue)
        const div = document.createElement('div');
        div.innerText = txt;
        div.style.cssText = `
            position: absolute; 
            color: ${color || '#fff'}; 
            font-weight: bold; 
            font-size: 24px; 
            pointer-events: none; 
            text-shadow: 0 0 5px #000;
            z-index: 1000;
            transition: all 1s;
        `;

        // Convert 3D position to 2D screen coordinates
        // Use window.engine if available, else fallback
        const engineRef = window.engine || engine;
        if (engineRef && engineRef.camera) {
            const vector = pos ? pos.clone() : new THREE.Vector3();
            vector.project(engineRef.camera);
            const x = (vector.x * 0.5 + 0.5) * window.innerWidth;
            const y = (-(vector.y * 0.5) + 0.5) * window.innerHeight;

            // Add random scatter
            const rX = (Math.random() - 0.5) * 40;
            const rY = (Math.random() - 0.5) * 40;

            div.style.left = (x + rX) + 'px';
            div.style.top = (y + rY) + 'px';
        } else {
            div.style.left = '50%';
            div.style.top = '50%';
        }

        document.body.appendChild(div);

        // Animate
        setTimeout(() => {
            div.style.transform = `translateY(-50px) scale(1.2)`;
            div.style.opacity = '0';
        }, 50);

        setTimeout(() => div.remove(), 1000);
    },

    setScreen(id) {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        if (id !== 'hud') document.getElementById(id).classList.add('active');
        this.updateMutationUI(); // Re-check visibility
    },
    updateButtons() {
        if (!this.player) return;
        const skills = this.player.pinnedSkills || [];

        // Helper to update a button
        const updateBtn = (id, skill, index) => {
            const btn = document.getElementById(id);
            if (!btn) return;

            if (index === 2) {
                // Skill 3 (Yellow) - ALWAYS SKILLS MENU
                btn.innerHTML = `<span class="btn-name" style="color:#ffe600">SKILLS</span><br><span class="btn-cost" style="font-size:10px">MANAGE</span>`;
                btn.style.opacity = '1';
                btn.className = 'btn btn-buff empty-skill'; // Reset classes, ensure consistent styling
                btn.onclick = () => {
                    if (game.state === 'IDLE') game.openSkillsMenu();
                };
                return; // SKIP standard skill rendering for this button
            }

            if (skill) {
                const cost = Math.max(0, Math.floor(skill.cost * (1 - this.player.manaCostReduction)));
                // Discount visual not strictly needed for small buttons but good for consistency
                // For small buttons, maybe just show COST if space allows, or just name
                if (index >= 3) {
                    // Small button
                    btn.innerHTML = `<span class="btn-name">${skill.name}</span>`;
                    // Maybe tooltip or cost in title?
                    btn.title = `${skill.name} - ${cost} MP\n${skill.desc}`;
                } else {
                    // Big button
                    const discount = cost < skill.cost ? `<span style="text-decoration:line-through;color:#666">${skill.cost}</span> ` : '';
                    btn.innerHTML = `<span class="btn-name">${skill.name}</span><br><span class="btn-cost">${discount}${cost} MP</span>`;
                }
                btn.style.opacity = '1';
                btn.classList.remove('empty-skill');
                // Restore onclick if it was overwritten
                btn.onclick = () => game.useSkill(index);
            } else {
                if (index >= 3) {
                    btn.innerHTML = `<span class="btn-name" style="color:#444">EMPTY</span>`;
                    btn.style.opacity = '0.5';
                    btn.classList.add('empty-skill');
                    btn.onclick = null;
                } else {
                    btn.innerHTML = `<span class="btn-name">EMPTY</span><br><span class="btn-cost">--</span>`;
                    btn.style.opacity = '0.5';
                    btn.classList.add('empty-skill');
                    btn.onclick = null;
                }
            }
        };

        // Update all 6 buttons
        // 0: Strike, 1: Heavy, 2: Buff/Ult, 3,4,5: Extras
        for (let i = 0; i < 6; i++) {
            updateBtn(`btn-skill-${i + 1}`, skills[i], i);
        }

        // Special handling for Skill 3 (Ult/Buff) expecting explicit click handler sometimes? 
        // No, HTML has onclick="game.useSkill(X)"
        // Just ensure opacity logic doesn't conflict.
    },

    // --- SKILLS MENU SYSTEM ---
    openSkillsMenu() {
        console.log("openSkillsMenu called");
        if (!this.player) {
            console.error("No player found in openSkillsMenu");
            return;
        }

        this.previousState = this.state;
        this.state = 'SKILLS_MENU';
        this.skillTab = 'BASIC'; // Default tab

        const screen = document.getElementById('classes-screen');
        if (!screen) {
            console.error("classes-screen element not found!");
            return;
        }
        screen.classList.add('active');

        const title = screen.querySelector('h1');
        if (title) title.innerText = "SKILL MANAGEMENT";

        this.renderSkillsMenu();
    },

    closeSkillsMenu() {
        document.getElementById('classes-screen').classList.remove('active');
        this.state = this.previousState || 'IDLE';
    },

    updateBuffs() {
        if (!this.player) return;
        const container = document.getElementById('p-buffs');
        if (!container) return;
        container.innerHTML = '';

        const buffs = this.player.activeBuffs || [];
        buffs.forEach(buff => {
            const div = document.createElement('div');
            // Simple visual representation
            div.style.cssText = `
                width: 24px; 
                height: 24px; 
                background: #222; 
                border: 1px solid #ffaa00; 
                color: #ffaa00; 
                font-size: 14px; 
                display: flex; 
                align-items: center; 
                justify-content: center; 
                border-radius: 4px;
                cursor: help;
                position: relative;
            `;
            div.innerText = buff.name ? buff.name[0] : 'B';
            div.title = `${buff.name} (${buff.duration} turns)`;

            // Duration Badge
            const dur = document.createElement('div');
            dur.style.cssText = `
                position: absolute; 
                bottom: -4px; 
                right: -4px; 
                background: #000; 
                color: #fff; 
                font-size: 9px; 
                padding: 1px 3px; 
                border-radius: 4px;
            `;
            dur.innerText = buff.duration;
            div.appendChild(dur);

            container.appendChild(div);
        });
    },

    renderSkillsMenu() {
        const container = document.getElementById('classes-viewer-container');
        container.innerHTML = '';
        // SIDEBAR LAYOUT CONTAINER
        container.style.cssText = `
            display: flex;
            flex-direction: row;
            gap: 0;
            padding: 0;
            max-width: 1400px;
            margin: 0 auto;
            width: 100%;
            height: 70vh; /* Fixed height for scrolling */
            background: rgba(0, 0, 0, 0.4); /* Slight backing */
            border-radius: 8px;
            border: 1px solid #333;
        `;

        // 1. LEFT SIDEBAR (TABS)
        const sidebar = document.createElement('div');
        sidebar.style.cssText = `
            width: 260px;
            display: flex;
            flex-direction: column;
            gap: 10px;
            padding: 20px;
            border-right: 1px solid rgba(0, 242, 255, 0.2);
            background: rgba(10, 10, 15, 0.6);
            flex-shrink: 0;
        `;

        // Sidebar Header
        sidebar.innerHTML = `
            <div style="font-size: 16px; color: #fff; margin-bottom: 15px; text-transform: uppercase; letter-spacing: 2px; font-weight: bold; border-bottom: 1px solid #555; padding-bottom: 10px;">
                CATEGORIES
            </div>
        `;

        const tabs = ['BASIC', 'HEAVY', 'BUFF'];
        tabs.forEach(tab => {
            const btn = document.createElement('button');
            const isActive = this.skillTab === tab;
            let color = '#fff';
            if (tab === 'BASIC') color = '#00f2ff';
            if (tab === 'HEAVY') color = '#ff0055';
            if (tab === 'BUFF') color = '#ffe600';

            btn.innerText = tab;
            btn.className = 'btn';
            btn.style.cssText = `
                width: 100%;
                text-align: left;
                padding: 15px 20px;
                font-size: 16px;
                letter-spacing: 2px;
                border: 2px solid ${isActive ? color : 'transparent'};
                border-left: 5px solid ${isActive ? color : '#333'};
                background: ${isActive ? 'rgba(0,0,0,0.5)' : 'transparent'};
                color: ${isActive ? '#fff' : '#888'};
                box-shadow: ${isActive ? `0 0 20px ${color}20` : 'none'};
                transition: all 0.2s;
                position: relative;
                overflow: hidden;
                margin-bottom: 5px;
            `;

            // Hover effect
            btn.onmouseenter = () => {
                if (!isActive) {
                    btn.style.background = 'rgba(255,255,255,0.05)';
                    btn.style.color = '#fff';
                    btn.style.borderLeftColor = color;
                }
            };
            btn.onmouseleave = () => {
                if (!isActive) {
                    btn.style.background = 'transparent';
                    btn.style.color = '#888';
                    btn.style.borderLeftColor = '#333';
                }
            };

            btn.onclick = () => {
                this.skillTab = tab;
                this.renderSkillsMenu();
            };
            sidebar.appendChild(btn);
        });

        // "CLOSE" button at the bottom of sidebar
        const closeBtn = document.createElement('button');
        closeBtn.innerText = "CLOSE MENU";
        closeBtn.className = 'btn';
        closeBtn.style.cssText = `
            margin-top: auto;
            width: 100%;
            border: 1px solid #555;
            color: #aaa;
            font-size: 14px;
            padding: 12px;
            letter-spacing: 1px;
            background: rgba(0,0,0,0.5);
        `;
        closeBtn.onclick = () => this.closeSkillsMenu();
        sidebar.appendChild(closeBtn);

        container.appendChild(sidebar);

        // 2. RIGHT CONTENT Area
        const contentArea = document.createElement('div');
        contentArea.style.cssText = `
            flex: 1;
            padding: 25px;
            overflow-y: auto;
            position: relative;
        `;

        // Custom Scrollbar
        const style = document.createElement('style');
        style.innerHTML = `
            #classes-viewer-container ::-webkit-scrollbar { width: 8px; }
            #classes-viewer-container ::-webkit-scrollbar-track { background: rgba(0,0,0,0.2); }
            #classes-viewer-container ::-webkit-scrollbar-thumb { background: #00f2ff; border-radius: 4px; }
        `;
        contentArea.appendChild(style);

        // SKILL GRID
        const grid = document.createElement('div');
        grid.style.cssText = `
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: 20px;
            width: 100%;
        `;

        // Filter and Sort Skills
        const allSkills = [...this.player.unlockedSkills];
        const filteredSkills = allSkills.filter(skill => {
            if (this.skillTab === 'BUFF') return skill.isBuff;
            if (this.skillTab === 'HEAVY') return !skill.isBuff && skill.cost > 0; // Any cost > 0 is HEAVY
            if (this.skillTab === 'BASIC') return !skill.isBuff && skill.cost === 0; // Strictly 0 cost is BASIC
            return true;
        });

        if (filteredSkills.length === 0) {
            grid.innerHTML = `<div style="grid-column:1/-1; text-align:center; color:#666; padding:50px; font-size:18px;">NO SKILLS IN THIS CATEGORY</div>`;
        }

        filteredSkills.forEach((skill) => {
            const index = this.player.unlockedSkills.indexOf(skill);
            const card = document.createElement('div');
            card.className = 'skill-management-card';

            // Slot Mapping: User sees 1-5, Internal is 0,1,3,4,5 (Skip 2)
            const slotMap = [0, 1, 3, 4, 5];

            const isPinnedInSlot = (internalIdx) => this.player.pinnedSkills?.[internalIdx] === skill;
            const pinnedInternalIndex = this.player.pinnedSkills?.indexOf(skill);

            let pinnedBadge = "";
            let userSlot = -1;

            if (pinnedInternalIndex > -1) {
                // Find which "User Slot" this corresponds to
                const mapIdx = slotMap.indexOf(pinnedInternalIndex);
                if (mapIdx > -1) {
                    userSlot = mapIdx + 1;
                    pinnedBadge = `<div style="position:absolute; top:0; right:0; background:#00f2ff; color:#000; font-size:10px; font-weight:bold; padding:4px 8px; border-bottom-left-radius:8px; z-index:2;">SLOT ${userSlot}</div>`;
                }
            }

            // Restore colors and labels
            let accentColor = '#888';
            let glowColor = 'rgba(136, 136, 136, 0.3)';

            if (skill.isBuff) {
                accentColor = '#ffe600';
                glowColor = 'rgba(255, 230, 0, 0.3)';
            } else {
                const colorHex = skill.color ? '#' + skill.color.toString(16).padStart(6, '0') : '#fff';
                accentColor = colorHex;
                glowColor = colorHex + '40';
            }

            const typeLabel = skill.isBuff ? "BUFF" : "ATTACK";
            const costLabel = skill.cost > 0 ? `${skill.cost}MP` : "FREE";
            const descDisplay = skill.desc || (skill.isBuff
                ? `+${((skill.buffVal || 0) * 100).toFixed(0)}% ${skill.buffType || 'BUFF'}`
                : `${skill.mult}x DMG`);

            // ... (styles same as before) ...
            card.style.cssText = `
                background: linear-gradient(135deg, rgba(20, 20, 30, 0.95), rgba(10, 10, 20, 0.95));
                border: 1px solid ${accentColor};
                border-radius: 8px;
                padding: 15px;
                position: relative;
                overflow: hidden;
                transition: all 0.2s ease;
                box-shadow: 0 4px 15px ${glowColor}40;
                cursor: pointer;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                min-height: 160px;
            `;

            // Slot Buttons Generation
            let slotButtonsHTML = '<div style="display:flex; gap:4px; justify-content:center; margin-bottom:8px;">';
            slotMap.forEach((internalIdx, i) => {
                const isThisSlot = isPinnedInSlot(internalIdx);
                const bg = isThisSlot ? '#00f2ff' : 'rgba(255,255,255,0.1)';
                const col = isThisSlot ? '#000' : '#888';
                slotButtonsHTML += `<button class="skill-action-btn" data-action="pin" data-slot="${internalIdx}" data-index="${index}" 
                    style="width:25px; height:25px; border:1px solid #444; background:${bg}; color:${col}; font-size:10px; cursor:pointer; padding:0; display:flex; align-items:center; justify-content:center;">
                    ${i + 1}
                </button>`;
            });
            slotButtonsHTML += '</div>';

            card.innerHTML = `
                ${pinnedBadge}
                <div style="margin-bottom: 8px;">
                    <span style="font-size: 10px; color: ${accentColor}; border: 1px solid ${accentColor}; padding: 2px 6px; border-radius: 4px; margin-right: 6px; letter-spacing:1px;">${typeLabel}</span>
                    <span style="font-size: 18px; font-weight: bold; color: ${accentColor}; text-shadow: 0 0 10px ${glowColor};">${skill.name || 'SKILL'}</span>
                </div>
                <div style="color: #bbb; font-size: 13px; margin-bottom: 12px; line-height: 1.4; flex-grow: 1;">
                    ${descDisplay}
                </div>
                <div>
                    <div style="display: flex; justify-content: space-between; font-size: 11px; color: #ddd; margin-bottom: 5px; border-top: 1px solid #333; padding-top: 6px;">
                        <span>COST: <span style="color:#00f2ff">${costLabel}</span></span>
                        <span>${skill.isBuff ? (skill.duration + ' TURNS') : ((skill.hits || 1) + ' HITS')}</span>
                    </div>
                    ${slotButtonsHTML}
                    <button class="skill-action-btn" data-action="use" data-index="${index}" style="width:100%; font-size:11px; padding:6px 0; background: #00ff0022; border: 1px solid #00ff00; color: #00ff00;">
                        QUICK CAST
                    </button>
                </div>
            `;

            card.onmouseenter = () => { card.style.transform = 'translateY(-3px)'; card.style.boxShadow = `0 8px 30px ${glowColor}`; };
            card.onmouseleave = () => { card.style.transform = 'translateY(0)'; card.style.boxShadow = `0 4px 15px ${glowColor}40`; };

            grid.appendChild(card);
        });

        contentArea.appendChild(grid);
        container.appendChild(contentArea);

        grid.querySelectorAll('.skill-action-btn').forEach(btn => {
            btn.onclick = (e) => {
                e.stopPropagation();
                const action = btn.dataset.action;
                const index = parseInt(btn.dataset.index);
                const skill = this.player.unlockedSkills[index];

                if (action === 'pin') {
                    const slot = parseInt(btn.dataset.slot);
                    // Remove from other slots if present
                    if (this.player.pinnedSkills.includes(skill)) {
                        const oldIdx = this.player.pinnedSkills.indexOf(skill);
                        if (oldIdx !== slot) this.player.pinnedSkills[oldIdx] = null;
                    }
                    this.player.pinnedSkills[slot] = skill;
                    this.updateButtons();
                    this.renderSkillsMenu();
                } else if (action === 'use') {
                    this.closeSkillsMenu();
                    this.useSkill(skill); // Assuming generic useSkill works for player skill object
                }
            };
        });
    },

    renderSkillsMenu_OLD() {
        const container = document.getElementById('classes-viewer-container');
        container.innerHTML = '';
        container.style.cssText = `
            display: flex;
            flex-direction: column;
            gap: 15px;
            padding: 15px;
            max-width: 1400px;
            margin: 0 auto;
            width: 100%;
        `;

        // 1. TABS CONTAINER
        const tabContainer = document.createElement('div');
        tabContainer.style.cssText = `
            display: flex;
            justify-content: center;
            gap: 20px;
            margin-bottom: 10px;
        `;

        const tabs = ['BASIC', 'HEAVY', 'BUFF'];
        tabs.forEach(tab => {
            const btn = document.createElement('button');
            const isActive = this.skillTab === tab;
            let color = '#fff';
            if (tab === 'BASIC') color = '#00f2ff';
            if (tab === 'HEAVY') color = '#ff0055';
            if (tab === 'BUFF') color = '#ffe600';

            btn.innerText = tab;
            btn.className = 'btn'; // Reuse base btn class
            btn.style.cssText = `
                min-width: 150px;
                font-size: 16px;
                letter-spacing: 2px;
                border: 2px solid ${color};
                color: ${isActive ? '#000' : color};
                background: ${isActive ? color : 'transparent'};
                box-shadow: ${isActive ? `0 0 15px ${color}` : 'none'};
                opacity: ${isActive ? 1 : 0.7};
            `;
            btn.onclick = () => {
                this.skillTab = tab;
                this.renderSkillsMenu();
            };
            tabContainer.appendChild(btn);
        });
        container.appendChild(tabContainer);

        // 2. SKILL GRID
        const grid = document.createElement('div');
        grid.style.cssText = `
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 12px;
            width: 100%;
        `;

        // Filter and Sort Skills
        const allSkills = [...this.player.unlockedSkills];
        const filteredSkills = allSkills.filter(skill => {
            if (this.skillTab === 'BUFF') return skill.isBuff;
            if (this.skillTab === 'HEAVY') return !skill.isBuff && skill.cost >= 40;
            if (this.skillTab === 'BASIC') return !skill.isBuff && skill.cost < 40;
            return true;
        });

        if (filteredSkills.length === 0) {
            grid.innerHTML = `<div style="grid-column:1/-1; text-align:center; color:#666; padding:50px;">NO SKILLS IN THIS CATEGORY</div>`;
        }

        filteredSkills.forEach((skill) => {
            // Find original index for binding actions
            const index = this.player.unlockedSkills.indexOf(skill);

            const card = document.createElement('div');
            card.className = 'skill-management-card';

            // Check if pinned
            const isPinned1 = this.player.pinnedSkills?.[0] === skill;
            const isPinned2 = this.player.pinnedSkills?.[1] === skill;

            // Determine skill type color scheme
            let accentColor = '#888';
            let glowColor = 'rgba(136, 136, 136, 0.3)';
            if (isPinned1) {
                accentColor = '#00f2ff';
                glowColor = 'rgba(0, 242, 255, 0.4)';
            } else if (isPinned2) {
                accentColor = '#ff0055';
                glowColor = 'rgba(255, 0, 85, 0.4)';
            } else if (skill.isBuff) {
                accentColor = '#ffe600';
                glowColor = 'rgba(255, 230, 0, 0.3)';
            } else {
                const colorHex = skill.color ? '#' + skill.color.toString(16).padStart(6, '0') : '#fff';
                accentColor = colorHex;
                glowColor = colorHex + '40';
            }

            const typeLabel = skill.isBuff ? "BUFF" : "ATTACK";
            // Compact Cost Label
            const costLabel = skill.cost > 0 ? `${skill.cost}MP` : "FREE";

            let pinnedBadge = "";
            if (isPinned1) pinnedBadge = `<div style="position:absolute; top:0; right:0; background:#00f2ff; color:#000; font-size:9px; font-weight:bold; padding:2px 6px; border-bottom-left-radius:6px;">SLOT 1</div>`;
            if (isPinned2) pinnedBadge = `<div style="position:absolute; top:0; right:0; background:#ff0055; color:#fff; font-size:9px; font-weight:bold; padding:2px 6px; border-bottom-left-radius:6px;">SLOT 2</div>`;

            // Ultra Compact Description
            const descDisplay = skill.desc || (skill.isBuff
                ? `+${((skill.buffVal || 0) * 100).toFixed(0)}% ${skill.buffType || 'BUFF'}`
                : `${skill.mult}x DMG`);

            // COMPACT CARD STYLE
            card.style.cssText = `
                background: linear-gradient(135deg, rgba(20, 20, 30, 0.95), rgba(10, 10, 20, 0.95));
                border: 1px solid ${accentColor};
                border-radius: 6px;
                padding: 10px;
                position: relative;
                overflow: hidden;
                transition: all 0.2s ease;
                box-shadow: 0 4px 15px ${glowColor}40;
                cursor: pointer;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                min-height: 120px;
            `;

            card.innerHTML = `
                ${pinnedBadge}
                
                <!-- Header: Type + Name -->
                <div style="margin-bottom: 5px;">
                    <span style="font-size: 9px; color: ${accentColor}; border: 1px solid ${accentColor}; padding: 1px 4px; border-radius: 3px; margin-right: 5px;">${typeLabel}</span>
                    <span style="font-size: 14px; font-weight: bold; color: ${accentColor}; text-shadow: 0 0 10px ${glowColor};">${skill.name || 'SKILL'}</span>
                </div>

                <!-- Description -->
                <div style="color: #aaa; font-size: 11px; margin-bottom: 8px; line-height: 1.2; flex-grow: 1;">
                    ${descDisplay}
                </div>

                <!-- Footer: Stats + Buttons -->
                <div>
                     <!-- Mini Stats Row -->
                    <div style="display: flex; justify-content: space-between; font-size: 10px; color: #ddd; margin-bottom: 8px; border-top: 1px solid #333; padding-top: 4px;">
                        <span>COST: <span style="color:#00f2ff">${costLabel}</span></span>
                        <span>${skill.isBuff ? (skill.duration + 'T') : ((skill.hits || 1) + ' HITS')}</span>
                    </div>

                    <!-- Action Buttons (Grid) -->
                    <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 4px;">
                        <button class="skill-action-btn" data-action="pin1" data-index="${index}" style="font-size:10px; padding:4px 0; background: #00f2ff22; border: 1px solid #00f2ff; color: #00f2ff; ${isPinned1 ? 'background:#00f2ff; color:#000;' : ''}">
                            ${isPinned1 ? '1' : 'P1'}
                        </button>
                        <button class="skill-action-btn" data-action="pin2" data-index="${index}" style="font-size:10px; padding:4px 0; background: #ff005522; border: 1px solid #ff0055; color: #ff0055; ${isPinned2 ? 'background:#ff0055; color:#fff;' : ''}">
                            ${isPinned2 ? '2' : 'P2'}
                        </button>
                        <button class="skill-action-btn" data-action="use" data-index="${index}" style="font-size:10px; padding:4px 0; background: #00ff0022; border: 1px solid #00ff00; color: #00ff00;">
                            USE
                        </button>
                    </div>
                </div>
            `;

            // Hover effect
            card.onmouseenter = () => {
                card.style.transform = 'translateY(-2px)';
                card.style.boxShadow = `0 5px 20px ${glowColor}`;
            };
            card.onmouseleave = () => {
                card.style.transform = 'translateY(0)';
                card.style.boxShadow = `0 4px 15px ${glowColor}40`;
            };

            grid.appendChild(card);
        });

        container.appendChild(grid);

        // Bind events to all buttons using event delegation
        grid.querySelectorAll('.skill-action-btn').forEach(btn => {
            btn.onclick = (e) => {
                e.stopPropagation();
                const action = btn.dataset.action;
                const index = parseInt(btn.dataset.index);
                const skill = this.player.unlockedSkills[index];

                if (action === 'pin1') {
                    this.player.pinnedSkills[0] = skill;
                    this.updateButtons();
                    this.renderSkillsMenu(); // Re-renders current tab
                } else if (action === 'pin2') {
                    this.player.pinnedSkills[1] = skill;
                    this.updateButtons();
                    this.renderSkillsMenu();
                } else if (action === 'use') {
                    this.closeSkillsMenu();
                    this.useSkill(skill);
                }
            };
        });
    },

    // --- CLASS VIEWER SYSTEM ---
    openClassesViewer() {
        // Prevent opening until player has chosen a class
        if (!this.player || !this.player.jobType) return;

        // Already open -> toggle close
        const screen = document.getElementById('classes-screen');
        if (screen.classList.contains('active')) { this.closeClassesViewer(); return; }

        // Set Title Correctly
        const title = screen.querySelector('h1');
        if (title) title.innerText = "JOB ADVANCEMENT";

        // Store current state
        this.previousState = this.state;
        this.state = 'CLASSES_VIEWER';
        document.getElementById('classes-screen').classList.add('active');
        this.renderClassMap();

        // Add Escape key to close
        this._classesKeyHandler = (e) => { if (e.key === 'Escape') { if (document.getElementById('class-tier-overlay')) return; this.closeClassesViewer(); } };
        document.addEventListener('keydown', this._classesKeyHandler);
    },

    closeClassesViewer() {
        if (this.state === 'SKILLS_MENU') {
            this.closeSkillsMenu();
            return;
        }

        document.getElementById('classes-screen').classList.remove('active');

        // FIX: Force state to IDLE if we are in a live battle. 
        // This prevents getting stuck if an animation finished while the menu was open.
        if (this.enemy && this.enemy.hp > 0 && this.state !== 'GAMEOVER') {
            this.state = 'IDLE';
            // Ensure buttons are visible/interactive
            document.getElementById('battle-controls').classList.add('active');
        } else {
            // Fallback for non-combat situations (e.g. sitting on reward screen)
            this.state = this.previousState || 'IDLE';
        }

        if (this._classesKeyHandler) {
            document.removeEventListener('keydown', this._classesKeyHandler);
            this._classesKeyHandler = null;
        }
    },

    // toggleClassesViewer removed - feature deprecated

    isClassUnlocked(classKey) {
        // A class is unlocked if player currently has it or has reached the tier it appears in
        if (!this.player) return false;

        // Player's current class is always unlocked
        if (this.player.jobType === classKey) return true;

        // Check if player has reached a tier where this class appears
        // Each tier is 10 floors, classes appear at their tier index
        const classTiers = Object.keys(CLASS_TREES);
        const classIndex = classTiers.indexOf(classKey);
        if (classIndex === -1) return false;

        // Base classes (tier 0) are available from floor 1
        // Tier 1 classes at floor 10, tier 2 at floor 20, etc.
        const unlockedFloor = (classIndex + 1) * 10;
        return this.floor >= unlockedFloor || this.rebirth > 0;
    },

    // Is a specific tier unlocked for a class? (tierIndex 0-based)
    isClassTierUnlocked(classKey, tierIndex) {
        // If player has rebirthed or progressed past the floor threshold it's unlocked
        const requiredFloor = tierIndex * 10; // tier 0 -> 0 (available from start), tier 1 -> 10, tier 2 -> 20
        return this.floor >= requiredFloor || this.rebirth > 0 || (this.player && this.player.jobType === classKey && this.player.jobTier >= tierIndex);
    },

    // Render as a tiered map: columns are classes, rows are tiers
    renderClassMap() {
        const container = document.getElementById('classes-viewer-container');
        container.innerHTML = '';

        // Only show the player's current class (do not show other classes)
        let classNames = Object.keys(CLASS_TREES);
        if (this.player && this.player.jobType) classNames = [this.player.jobType];
        const cols = classNames.length;
        const tiers = 10; // Show 10 tiers vertically

        const map = document.createElement('div');
        map.className = 'class-map';
        map.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;

        // If we are only showing a single class, render horizontally: columns == tiers
        const horizontal = (cols === 1);
        if (horizontal) {
            map.classList.add('horizontal');
            // create one column per tier (left -> right progression)
            for (let t = 0; t < tiers; t++) {
                const col = document.createElement('div');
                col.className = 'map-column';

                // single node for this tier
                const node = document.createElement('div'); node.className = 'map-node';
                const isUnlocked = this.isClassTierUnlocked(classNames[0], t);
                if (isUnlocked) node.classList.add('unlocked'); else node.classList.add('locked');

                // current node highlight if matches
                if (this.player && this.player.jobType === classNames[0] && this.player.jobTier === t) node.classList.add('current-node');

                // label
                const tierLabel = document.createElement('div'); tierLabel.className = 'node-title'; tierLabel.innerText = `T${t + 1}`;
                const tierDesc = document.createElement('div'); tierDesc.className = 'node-sub'; tierDesc.innerText = CLASS_TREES[classNames[0]][t] ? CLASS_TREES[classNames[0]][t].name : '—';
                node.appendChild(tierLabel); node.appendChild(tierDesc);

                node.onclick = () => { if (!isUnlocked) return; this.showClassTierModal(classNames[0], t); };
                node.tabIndex = 0;
                node.onkeydown = (e) => {
                    if (e.key === 'Enter' || e.key === ' ') { if (isUnlocked) this.showClassTierModal(classNames[0], t); e.preventDefault(); }
                    if (e.key === 'ArrowRight') { const nextCol = col.nextElementSibling; if (nextCol) { const next = nextCol.querySelector('.map-node'); if (next) next.focus(); } }
                    if (e.key === 'ArrowLeft') { const prevCol = col.previousElementSibling; if (prevCol) { const prev = prevCol.querySelector('.map-node'); if (prev) prev.focus(); } }
                };

                col.appendChild(node);
                map.appendChild(col);
            }
        } else {
            // For each class (column)
            classNames.forEach(classKey => {
                const col = document.createElement('div');
                col.className = 'map-column';
                if (this.player && this.player.jobType === classKey) col.classList.add('current');

                // optional column highlight
                if (this.player && this.player.jobType === classKey) {
                    const hl = document.createElement('div'); hl.className = 'class-column-highlight'; col.appendChild(hl);
                }

                // Create nodes per tier (top = tier 9 -> highest)
                for (let t = tiers - 1; t >= 0; t--) {
                    const node = document.createElement('div'); node.className = 'map-node';
                    const isUnlocked = this.isClassTierUnlocked(classKey, t);
                    if (isUnlocked) node.classList.add('unlocked'); else node.classList.add('locked');

                    // current node highlight if player's class and tier match
                    if (this.player && this.player.jobType === classKey && this.player.jobTier === t) node.classList.add('current-node');

                    // add text (tier label + maybe short skill name)
                    const tierLabel = document.createElement('div'); tierLabel.className = 'node-title'; tierLabel.innerText = `T${t + 1}`;
                    const tierDesc = document.createElement('div'); tierDesc.className = 'node-sub'; tierDesc.innerText = CLASS_TREES[classKey][t] ? CLASS_TREES[classKey][t].name : '—';
                    node.appendChild(tierLabel); node.appendChild(tierDesc);

                    // click behavior: if unlocked, show a small modal with tier details
                    node.onclick = () => { if (!isUnlocked) return; this.showClassTierModal(classKey, t); };
                    // accessibility: focusable and keyboard interaction
                    node.tabIndex = 0;
                    node.onkeydown = (e) => {
                        if (e.key === 'Enter' || e.key === ' ') { if (isUnlocked) this.showClassTierModal(classKey, t); e.preventDefault(); }
                        if (e.key === 'ArrowDown') { const next = node.nextElementSibling; if (next) next.focus(); }
                        if (e.key === 'ArrowUp') { const prev = node.previousElementSibling; if (prev) prev.focus(); }
                    };

                    col.appendChild(node);
                }

                map.appendChild(col);
            });
        }

        // Add small legend and instructions
        const legend = document.createElement('div');
        legend.style.width = '100%'; legend.style.margin = '18px 0 6px 0'; legend.style.color = '#ccc'; legend.style.fontSize = '13px';
        if (cols === 1 && this.player && this.player.jobType) {
            legend.innerHTML = `<strong>${this.player.jobType} — CLASS TREE</strong> — Horizontal progression (left → right).
                <span style="float:right;">Press <kbd>Esc</kbd> or CLOSE to exit</span>`;
        } else {
            legend.innerHTML = `<strong>CLASS MAP</strong> — Columns are classes (left→right). Nodes are tiers (top = Tier 10).
                <span style="float:right;">Press <kbd>Esc</kbd> or CLOSE to exit</span>`;
        }

        // wrap map into scrollable wrapper and add svg overlay for links
        const wrapper = document.createElement('div'); wrapper.id = 'classes-map-wrapper';
        const svgNS = 'http://www.w3.org/2000/svg';
        const svg = document.createElementNS(svgNS, 'svg'); svg.setAttribute('class', 'class-map-links');
        svg.style.width = '100%'; svg.style.height = '100%';

        if (cols === 1) map.classList.add('single-column');
        // adjust wrapper height for horizontal single-class layout
        if (map.classList.contains('horizontal')) {
            wrapper.style.height = '220px';
        } else {
            wrapper.style.height = '';
        }
        wrapper.appendChild(map);
        wrapper.appendChild(svg);

        container.appendChild(legend);
        container.appendChild(wrapper);

        // draw connections after layout
        const drawLinks = () => { this._drawClassMapLinks(wrapper, svg); };

        // initialize draggable pan once
        if (!this._mapDragInitialized) { this._initMapDrag(wrapper, drawLinks); this._mapDragInitialized = true; }

        // After layout/update, draw links
        setTimeout(drawLinks, 50);

        // Center on player's current node for better mobile UX
        setTimeout(() => {
            if (this.player) {
                const current = wrapper.querySelector('.current-node');
                const mapEl = wrapper.querySelector('.class-map');
                const isHorizontal = mapEl && mapEl.classList.contains('horizontal');
                if (current) {
                    if (isHorizontal) {
                        wrapper.scrollLeft = current.offsetLeft - (wrapper.clientWidth / 2) + (current.clientWidth / 2);
                        // vertically center the single-row content
                        wrapper.scrollTop = Math.max(0, (mapEl.clientHeight - wrapper.clientHeight) / 2);
                    } else {
                        wrapper.scrollTop = current.offsetTop - (wrapper.clientHeight / 2) + (current.clientHeight / 2);
                        wrapper.scrollLeft = current.offsetLeft - (wrapper.clientWidth / 2) + (current.clientWidth / 2);
                    }
                    setTimeout(drawLinks, 60);
                }
            }
        }, 90);

        // Also redraw on resize or scroll
        wrapper.addEventListener('scroll', drawLinks);
        window.addEventListener('resize', drawLinks);
    },

    createClassViewerCard(classKey, classData) {
        const card = document.createElement('div');
        const isUnlocked = this.isClassUnlocked(classKey);
        const isCurrent = this.player && this.player.jobType === classKey;

        card.className = 'class-card';
        if (isUnlocked) card.classList.add('unlocked');
        if (isCurrent) card.classList.add('current');
        if (!isUnlocked) card.classList.add('locked');

        const currentSkills = this.player ? this.player.skills : [];
        const highestTier = classData.length - 1;

        // Determine class tier level description
        const allTierDescriptions = [];
        classData.forEach((tier, idx) => {
            allTierDescriptions.push(tier.desc);
        });

        // Get header info
        let statusBadge = '';
        if (isCurrent) {
            statusBadge = '<div class="unlock-status current">CURRENT</div>';
        } else if (isUnlocked) {
            statusBadge = '<div class="unlock-status unlocked">UNLOCKED</div>';
        } else {
            const nextTierIndex = Math.min(this.player ? Math.floor((this.floor - 1) / 10) : 0, highestTier);
            statusBadge = `<div class="unlock-status locked">LOCKED</div>`;
        }

        // Build skill descriptions
        let skillsHTML = '<div class="skills-list">';
        classData.forEach((tierData, tierIndex) => {
            if (tierData.skills) {
                tierData.skills.forEach((skill, skillIdx) => {
                    const skillNum = skillIdx + 1;
                    const skillCost = skill.cost > 0 ? `${skill.cost} MP` : 'FREE';
                    const skillType = skill.isBuff ? 'BUFF' : 'DMG';

                    let statsInfo = '';
                    if (skill.isBuff) {
                        statsInfo = `<span class="skill-stats">${skillType}</span> | <span class="skill-cost">${skill.desc}</span>`;
                    } else {
                        const hitsInfo = skill.hits && skill.hits > 1 ? `x${skill.hits}HIT` : '1HIT';
                        statsInfo = `<span class="skill-stats">${skill.mult}x ${hitsInfo}</span> | <span class="skill-cost">${skillCost}</span>`;
                    }

                    skillsHTML += `
                        <div class="skill-item">
                            <div class="skill-name">SKILL ${skillNum}: ${skill.name || 'BASIC ATTACK'}</div>
                            <div class="skill-details">${statsInfo}</div>
                        </div>
                    `;
                });
            }
        });
        skillsHTML += '</div>';

        const tierRange = `Tiers 1-${classData.length}`;

        card.innerHTML = `
            <div class="class-header">
                <div class="class-name">${classKey}</div>
                ${statusBadge}
            </div>
            <div class="class-desc">AVAILABLE TIERS: ${tierRange} | Progression: ${allTierDescriptions.map(d => d.split(':')[0]).join(' • ')}</div>
            ${skillsHTML}
        `;

        return card;
    },

    formatNum(num) {
        if (num >= 1000000000) return (num / 1000000000).toFixed(2) + 'B'; // Billions
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';    // Millions
        if (num >= 1000) return (num / 1000).toFixed(1) + 'K';          // Thousands
        return Math.floor(num);
    },

    updateUI() {
        // Show rebirth level in floor display
        const floorDisplay = this.rebirth > 0 ? `${this.floor} ★${this.rebirth}` : this.floor;
        document.getElementById('floor-num').innerText = floorDisplay;

        // FIX: Use formatNum for cleaner gold display (e.g. "1.5M")
        document.getElementById('gold-num').innerText = this.formatNum(this.gold);
        document.getElementById('shop-gold').innerText = this.formatNum(this.gold);

        // Combo display (show after floor 50 or when combo > 0)
        const comboDisplay = document.getElementById('combo-display');
        const comboNum = document.getElementById('combo-num');
        if (this.battleCombo > 0 || this.floor >= 50) {
            comboDisplay.style.display = 'block';
            comboNum.innerText = this.battleCombo || 0;
            // Color based on combo
            if (this.battleCombo >= 100) comboDisplay.style.color = '#ff00ff';
            else if (this.battleCombo >= 50) comboDisplay.style.color = '#ff0000';
            else if (this.battleCombo >= 25) comboDisplay.style.color = '#ff5500';
            else if (this.battleCombo >= 10) comboDisplay.style.color = '#ffaa00';
            else comboDisplay.style.color = '#fff';
        } else {
            comboDisplay.style.display = 'none';
        }

        const classesBtn = document.getElementById('classes-btn');
        if (classesBtn) classesBtn.style.display = 'none'; // Removed feature

        // Seasonal Boss Button Removed from JS logic (Moved to IAP)

        const bossJumpBtn = document.getElementById('boss-jump-btn');
        if (bossJumpBtn) bossJumpBtn.style.display = (this.floor < 100 && this.state !== 'GAMEOVER') ? 'block' : 'none';

        if (this.player) {
            this.player.shieldOrb.material.opacity = this.player.shield > 0 ? (0.2 + Math.sin(Date.now() * 0.005) * 0.1) : 0;
            this.player.shieldOrb.rotation.y += 0.01;
            this.player.shieldOrb.rotation.x += 0.005;

            document.getElementById('p-hp-fill').style.width = Math.min(100, (this.player.hp / this.player.maxHp) * 100) + '%';
            document.getElementById('p-hp-text').innerText = `${this.formatNum(this.player.hp)} / ${this.formatNum(this.player.maxHp)}`;
            document.getElementById('p-mana-fill').style.width = Math.min(100, (this.player.mana / this.player.maxMana) * 100) + '%';
            document.getElementById('p-mana-text').innerText = `${this.formatNum(this.player.mana)} / ${this.formatNum(this.player.maxMana)}`;

            const shieldWrapper = document.getElementById('p-shield-wrapper');
            if (this.player.shield > 0) {
                shieldWrapper.style.display = 'block';
                document.getElementById('p-shield-text').innerText = this.formatNum(this.player.shield);
                this.player.maxShield = Math.max(this.player.maxShield || this.player.shield, this.player.shield);
                document.getElementById('p-shield-fill').style.width = Math.min(100, (this.player.shield / this.player.maxShield) * 100) + '%';
            } else {
                shieldWrapper.style.display = 'none';
            }
        }

        if (this.enemy) {
            this.enemy.shieldOrb.material.opacity = this.enemy.shield > 0 ? (0.3 + Math.sin(Date.now() * 0.008) * 0.15) : 0;
            this.enemy.shieldOrb.rotation.y -= 0.015;
            this.enemy.shieldOrb.rotation.x += 0.01;

            const eBar = document.getElementById('e-hp-fill');
            const ePct = (this.enemy.hp / this.enemy.maxHp) * 100;
            eBar.style.width = Math.min(100, ePct) + '%';
            document.getElementById('e-hp-text').innerText = `${this.formatNum(this.enemy.hp)} / ${this.formatNum(this.enemy.maxHp)}`;

            const eShieldWrapper = document.getElementById('e-shield-wrapper');
            if (this.enemy.shield > 0) {
                eShieldWrapper.style.display = 'block';
                document.getElementById('e-shield-text').innerText = this.formatNum(this.enemy.shield);
                this.enemy.maxShield = Math.max(this.enemy.maxShield || this.enemy.shield, this.enemy.shield);
                document.getElementById('e-shield-fill').style.width = Math.min(100, (this.enemy.shield / this.enemy.maxShield) * 100) + '%';
            } else {
                eShieldWrapper.style.display = 'none';
            }

            // --- NEW: BOSS BAR VISUALS ---
            if (this.floor >= 100) {
                // Legendary Gradient + Glow for Final Boss
                eBar.style.background = `linear-gradient(90deg, #ff0000, #ffaa00, #ffff00)`;
                eBar.style.boxShadow = `0 0 15px #ffaa00`;
            } else if (this.enemy.type === 'midboss' || this.enemy.type === 'boss') {
                // Darker Red for Mid Bosses
                eBar.style.background = '#ff0000';
                eBar.style.boxShadow = 'none';
            } else {
                // Standard Neon Pink for Trash Mobs
                eBar.style.background = '#ff0055';
                eBar.style.boxShadow = 'none';
            }
        }

        // Ensure equipment UI stays updated
        if (this.updateGearUI) this.updateGearUI();
    },
});
