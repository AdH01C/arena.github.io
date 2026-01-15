Object.assign(game, {
    advanceDialogue() {
        if (this.isDialogueTyping) {
            // Instant finish typing if clicked while typing
            this.isDialogueTyping = false;
            return;
        }

        if (this.dialogueQueue.length === 0) {
            this.endCutscene();
            return;
        }

        const line = this.dialogueQueue.shift();
        this.renderDialogueLine(line);
    },

    renderDialogueLine(line) {
        const nameEl = document.getElementById('dialogue-name');
        const textEl = document.getElementById('dialogue-text');
        const box = document.getElementById('dialogue-box');

        // Reset classes
        box.className = '';
        nameEl.innerText = line.s === 'PLAYER' ? (this.player.jobType || 'UNKNOWN') : line.s;
        textEl.innerHTML = ''; // Clear text

        // --- CAMERA ADJUSTMENTS ---
        if (line.s === 'PLAYER') {
            box.classList.add('speaker-player');
            // FIX: Raised Y from 1.0 to 2.5 (Camera is higher now)
            // Increased Z/X slightly to keep player in frame at new height
            engine.focusCamera(this.player.mesh.position, { x: 2.5, y: 2.5, z: 6 });

        } else if (line.s === 'SYSTEM') {
            box.classList.add('speaker-system');
            // System view (high overhead shot)
            engine.focusCamera(null, { x: 0, y: 6, z: 12 });

        } else {
            // Enemy/Boss speaking
            box.classList.add('speaker-enemy');
            // FIX: Lowered Y from 2.0 to 0.8 (Camera is lower now)
            if (this.enemy) engine.focusCamera(this.enemy.mesh.position, { x: -2.5, y: 0.8, z: 6 });
        }

        // Typewriter Effect
        this.isDialogueTyping = true;
        let i = 0;
        const typeLoop = setInterval(() => {
            if (!this.isDialogueTyping) {
                clearInterval(typeLoop);
                textEl.innerText = line.t; // Fill rest instantly
                return;
            }
            textEl.innerText += line.t.charAt(i);
            i++;
            if (i >= line.t.length) {
                this.isDialogueTyping = false;
                clearInterval(typeLoop);
            }
        }, 30); // Speed of typing
    },

    endCutscene() {
        document.getElementById('dialogue-overlay').classList.remove('active');
        document.getElementById('hud').style.opacity = '1';
        document.getElementById('battle-controls').classList.add('active');
        this.updateMutationUI(); // Re-show mutation display

        const iapBtn = document.getElementById('iap-btn'); if (iapBtn) iapBtn.style.display = 'flex';

        engine.focusCamera(null);

        // --- NEW: BOSS PHASE TRANSITION ---
        if (this.pendingBossTransformation) {
            this.pendingBossTransformation = false;
            this.executePhase2Transform();
            return;
        }

        // --- NEW: BOSS DEFEAT ---
        if (this.pendingBossDefeat) {
            this.pendingBossDefeat = false;
            // Floor 100 is the final boss for rebirth, Floor 50 is awakening
            if (this.floor >= 100) {
                this.triggerRebirth();
            } else {
                this.triggerAwakening();
            }
            return;
        }

        this.state = 'IDLE';

        // Resume checking for potential events (like Job Selection) that were blocked by the story
        // ignoreStory=true (we just finished it), ignoreSpawn=true (already spawned before story)
        game.processFloorEvent(true, true);
    },
});
