Object.assign(game, {
    initTutorial() {
        this.tutorialState = 'ACTIVE';
        this.tutorialStep = 0;
        this.showTutorialStep(0);
    },

    tutorialSteps: [
        {
            title: 'WELCOME TO NEON TOWER',
            content: 'This is a rogue-lite battle arena. Your goal is to survive enemy encounters and climb to the top of the tower.',
            target: null,
            action: 'Pick your first class to begin.'
        },
        {
            title: 'SELECT YOUR CLASS',
            content: 'Choose a class that matches your playstyle. Each class has unique skills that grow stronger as you progress.',
            target: 'job-selection',
            action: 'Select a class to continue.'
        },
        {
            title: 'PREPARE FOR BATTLE',
            content: 'You now have 3 basic skills. The first is always free, others cost MANA. Build your strategy. Deal damage with STRIKE. (You can attack more than once with a striker class) Use HEAVY for stronger attacks. Use BUFF to enhance yourself. The enemy will counter-attack.',
            target: 'battle-controls',
            action: 'Click a skill to attack.'
        },
        {
            title: 'COMBAT MECHANICS',
            content: 'These are your health and mana bars. Your health regenerates over time. Mana is used for skills.',
            target: 'p-wrapper',
            action: 'Attack until the enemy is defeated.'
        },
        {
            title: 'PERK SYSTEM',
            content: 'After each battle, you\'ll choose a PERK to boost your stats. Combine perks wisely to create powerful builds.',
            target: null,
            action: 'Choose your first perk after this battle.'
        },
        {
            title: 'FLOOR PROGRESSION',
            content: 'Each floor increases enemy difficulty. Reach higher floors to unlock new classes and perks.',
            target: 'floor-display',
            action: 'Continue climbing.'
        },
        {
            title: 'REBIRTH MECHANIC',
            content: 'When you clear the top floor (100), you can REBIRTH and keep permanent bonuses. The next run will be exponentially harder.',
            target: null,
            action: 'Good luck, warrior!'
        }
    ],

    showTutorialStep(stepIndex) {
        const step = this.tutorialSteps[stepIndex];
        if (!step) { this.completeTutorial(); return; }

        const overlay = document.getElementById('tutorial-overlay');
        const spotlight = document.getElementById('tutorial-spotlight');
        const panel = document.getElementById('tutorial-panel');

        overlay.style.display = 'block';
        panel.style.display = 'block';

        // Spotlight on target element
        if (step.target) {
            const target = document.getElementById(step.target);
            if (target) {
                const rect = target.getBoundingClientRect();
                const padding = 12;
                spotlight.style.display = 'block';
                spotlight.style.top = (rect.top - padding) + 'px';
                spotlight.style.left = (rect.left - padding) + 'px';
                spotlight.style.width = (rect.width + padding * 2) + 'px';
                spotlight.style.height = (rect.height + padding * 2) + 'px';

                // Position panel near target, with smart positioning
                let panelTop = rect.bottom + 30;
                let panelLeft = Math.max(20, rect.left - 100);

                // Check if panel would go off-screen to the right
                const panelWidth = 420;
                if (panelLeft + panelWidth > window.innerWidth - 20) {
                    panelLeft = Math.max(20, window.innerWidth - panelWidth - 20);
                }

                // Check if panel would go off-screen at bottom, position above instead
                if (panelTop + 300 > window.innerHeight - 20) {
                    panelTop = Math.max(20, rect.top - 330);
                }

                panel.style.top = panelTop + 'px';
                panel.style.left = panelLeft + 'px';
                panel.style.transform = 'none';
            } else {
                spotlight.style.display = 'none';
                panel.style.top = '50%';
                panel.style.left = '50%';
                panel.style.transform = 'translate(-50%, -50%)';
            }
        } else {
            spotlight.style.display = 'none';
            panel.style.top = '50%';
            panel.style.left = '50%';
            panel.style.transform = 'translate(-50%, -50%)';
        }

        panel.innerHTML = `
            <div class="tutorial-title">${step.title}</div>
            <div class="tutorial-content">${step.content}</div>
            <div class="tutorial-highlight" style="background: rgba(0,242,255,0.15); border-left: 3px solid #00f2ff; padding: 10px 12px; margin-top: 12px; border-radius: 4px;">
                <strong style="color: #00f2ff;">➤ ${step.action}</strong>
            </div>
            <div class="tutorial-actions">
                <button class="tutorial-btn" onclick="game.nextTutorialStep()">NEXT</button>
                
            </div>
        `;
    },

    nextTutorialStep() {
        if (this.tutorialStep === 1) {
            this.hideTutorialOverlay();
            return;
        }

        this.tutorialStep++;
        if (this.tutorialStep >= this.tutorialSteps.length) {
            this.completeTutorial();
        } else {
            this.showTutorialStep(this.tutorialStep);
        }
    },


    completeTutorial() {
        localStorage.setItem('tutorialCompleted', 'true');
        this.tutorialState = 'INACTIVE';

        const overlay = document.getElementById('tutorial-overlay');
        const spotlight = document.getElementById('tutorial-spotlight');
        const panel = document.getElementById('tutorial-panel');

        overlay.style.display = 'none';
        spotlight.style.display = 'none';
        panel.style.display = 'none';

        // Check for Intro Story (Use key 0 for intro)
        if (this.checkStoryTrigger(0)) {
        }
    },

    hideTutorialOverlay() {
        const overlay = document.getElementById('tutorial-overlay');
        const spotlight = document.getElementById('tutorial-spotlight');
        const panel = document.getElementById('tutorial-panel');

        overlay.style.display = 'none';
        spotlight.style.display = 'none';
        panel.style.display = 'none';
    },
});
