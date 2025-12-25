// --- JOB TREES (UPDATED FOR SPECTACLE) ---

// --- 100 LEVEL JOB TREES ---
const CLASS_TREES = {
    "RONIN": [
        // 0-9: BASE
        { name: "CYBER-RONIN", desc: "Tier 1: Basics", skills: [
            { name: "SLASH", cost: 0, mult: 1.0, color: 0xaa00ff, vfx: 'slash' },
            { name: "EXECUTE", cost: 30, mult: 2.5, color: 0xff0055, vfx: 'heavy', hits: 1 }
        ]},
        // 10-19: ASSASSIN
        { name: "VOID-STALKER", desc: "Tier 2: Speed", skills: [
            { name: "PHANTOM CUT", cost: 0, mult: 1.2, color: 0x9900ff, vfx: 'multi', hits: 3 },
            { name: "ASSASSINATE", cost: 45, mult: 4.0, color: 0xff0000, vfx: 'crit', hits: 1 }
        ]},
        // 20-29: TIME
        { name: "TIME-SLAYER", desc: "Tier 3: Multi-Hit", skills: [
            { name: "DIMENSION REND", cost: 0, mult: 0.5, color: 0xffffff, vfx: 'slash', hits: 5 },
            { name: "OMNI-SLASH", cost: 60, mult: 6.0, color: 0xaa00ff, vfx: 'omni', hits: 10 }
        ]},
        // 30-39: SHADOW
        { name: "SHADOW-LORD", desc: "Tier 4: Dark Arts", skills: [
            { name: "NIGHTFALL", cost: 0, mult: 0.8, color: 0x330033, vfx: 'implode', hits: 4 },
            { name: "DEATH MARK", cost: 80, mult: 8.0, color: 0x550055, vfx: 'heavy', hits: 1 }
        ]},
        // 40-49: BLOOD
        { name: "BLOOD-LETTER", desc: "Tier 5: Lifesteal", skills: [
            { name: "HEMORRHAGE", cost: 0, mult: 1.0, color: 0xff0000, vfx: 'multi', hits: 6 },
            { name: "VAMPIRISM", cost: 100, mult: 5.0, color: 0xaa0000, vfx: 'implode', heal: 200 }
        ]},
        // 50-59: ETHER
        { name: "ETHER-BLADE", desc: "Tier 6: Magic Dmg", skills: [
            { name: "SPIRIT SLASH", cost: 0, mult: 1.5, color: 0x00ffff, vfx: 'beam', hits: 2 },
            { name: "SOUL REND", cost: 120, mult: 10.0, color: 0x00aaff, vfx: 'crit', hits: 1 }
        ]},
        // 60-69: VOID
        { name: "VOID-WALKER", desc: "Tier 7: Black Holes", skills: [
            { name: "GRAVITY WELL", cost: 0, mult: 0.5, color: 0x111111, vfx: 'implode', hits: 8 },
            { name: "EVENT HORIZON", cost: 150, mult: 12.0, color: 0x000000, vfx: 'blackhole', hits: 1 }
        ]},
        // 70-79: LIGHTSPEED
        { name: "FLASH-STEP", desc: "Tier 8: Velocity", skills: [
            { name: "MACH SLASH", cost: 0, mult: 0.2, color: 0xffff00, vfx: 'omni', hits: 20 },
            { name: "LIGHTSPEED", cost: 180, mult: 15.0, color: 0xffffff, vfx: 'beam', hits: 1 }
        ]},
        // 80-89: REALITY
        { name: "REALITY-BREAKER", desc: "Tier 9: Glitch", skills: [
            { name: "GLITCH CUT", cost: 0, mult: 1.0, color: 0x00ff00, vfx: 'matrix', hits: 10 },
            { name: "SYSTEM PURGE", cost: 220, mult: 20.0, color: 0x00ff00, vfx: 'matrix', hits: 1 }
        ]},
        // 90+: GOD
        { name: "SINGULARITY", desc: "Tier 10: Cosmic", skills: [
            { name: "BIG BANG", cost: 0, mult: 1.0, color: 0xffffff, vfx: 'blackhole', hits: 15 },
            { name: "END OF TIME", cost: 300, mult: 50.0, color: 0x000000, vfx: 'blackhole', hits: 1 }
        ]}
    ],

    "PRIEST": [
        // 0-9
        { name: "TECH-PRIEST", desc: "Tier 1: Basics", skills: [
            { name: "ZAP", cost: 0, mult: 0.8, color: 0xffff00, vfx: 'zap', manaGain: 8 },
            { name: "SMITE", cost: 30, mult: 2.0, color: 0x00f2ff, vfx: 'beam', heal: 30 }
        ]},
        // 10-19
        { name: "CYBER-BISHOP", desc: "Tier 2: Holy", skills: [
            { name: "SIPHON", cost: 0, mult: 1.0, color: 0xffffaa, vfx: 'drain', manaGain: 15 },
            { name: "HOLY NOVA", cost: 50, mult: 3.5, color: 0x00ffff, vfx: 'nova', heal: 50 }
        ]},
        // 20-29
        { name: "DEUS-EX", desc: "Tier 3: Machine", skills: [
            { name: "DATA DRAIN", cost: 0, mult: 1.2, color: 0x00ff00, vfx: 'matrix', manaGain: 25 },
            { name: "REBOOT", cost: 80, mult: 5.0, color: 0x00ffaa, vfx: 'nova', heal: 100 }
        ]},
        // 30-39
        { name: "ANGEL-MK1", desc: "Tier 4: Flight", skills: [
            { name: "LASER WING", cost: 0, mult: 0.5, color: 0xffffff, vfx: 'beam', hits: 4, manaGain: 30 },
            { name: "HEAVENLY RAY", cost: 100, mult: 8.0, color: 0xffffdd, vfx: 'god_beam', heal: 150 }
        ]},
        // 40-49
        { name: "ORACLE", desc: "Tier 5: Sight", skills: [
            { name: "PREDICTION", cost: 0, mult: 2.0, color: 0xaa00ff, vfx: 'zap', manaGain: 40 },
            { name: "FATE SEAL", cost: 120, mult: 10.0, color: 0xdd00ff, vfx: 'implode', heal: 200 }
        ]},
        // 50-59
        { name: "HIGH-TEMPLAR", desc: "Tier 6: Storm", skills: [
            { name: "PSIONIC STORM", cost: 0, mult: 0.5, color: 0x0000ff, vfx: 'rain', hits: 10, manaGain: 10 },
            { name: "FEEDBACK", cost: 150, mult: 12.0, color: 0x00aaff, vfx: 'nova', heal: 250 }
        ]},
        // 60-69
        { name: "SERAPHIM", desc: "Tier 7: Fire", skills: [
            { name: "HOLY FIRE", cost: 0, mult: 1.5, color: 0xffaa00, vfx: 'beam', hits: 3, manaGain: 50 },
            { name: "PURGATORY", cost: 180, mult: 15.0, color: 0xff5500, vfx: 'nuke', heal: 300 }
        ]},
        // 70-79
        { name: "ARCHON", desc: "Tier 8: Power", skills: [
            { name: "POWER OVERWHELM", cost: 0, mult: 1.0, color: 0x00f2ff, vfx: 'omni', hits: 5, manaGain: 60 },
            { name: "ARCHON BEAM", cost: 220, mult: 20.0, color: 0x00f2ff, vfx: 'god_beam', heal: 400 }
        ]},
        // 80-89
        { name: "SOURCE-CODE", desc: "Tier 9: Admin", skills: [
            { name: "REWRITE", cost: 0, mult: 2.0, color: 0x00ff00, vfx: 'matrix', manaGain: 100 },
            { name: "DELETE", cost: 250, mult: 30.0, color: 0xff0000, vfx: 'blackhole', heal: 500 }
        ]},
        // 90+
        { name: "DIGITAL-GOD", desc: "Tier 10: Omni", skills: [
            { name: "CREATION", cost: 0, mult: 5.0, color: 0xffffff, vfx: 'god_beam', manaGain: 999 },
            { name: "RAPTURE", cost: 400, mult: 60.0, color: 0xffd700, vfx: 'nova', heal: 9999 }
        ]}
    ],

    "MECH": [
        // 0-9
        { name: "HEAVY-MECH", desc: "Tier 1: Basics", skills: [
            { name: "GATLING", cost: 0, mult: 0.3, color: 0xffaa00, vfx: 'gatling', hits: 3 },
            { name: "MISSILE", cost: 30, mult: 3.0, color: 0xff5500, vfx: 'explode', hits: 1 }
        ]},
        // 10-19
        { name: "WAR-TITAN", desc: "Tier 2: Dakka", skills: [
            { name: "ROTARY", cost: 0, mult: 0.2, color: 0xff9900, vfx: 'gatling', hits: 6 },
            { name: "NUKE", cost: 50, mult: 5.0, color: 0xff2200, vfx: 'nuke', hits: 1 }
        ]},
        // 20-29
        { name: "APOCALYPSE", desc: "Tier 3: Barrage", skills: [
            { name: "BULLET HELL", cost: 0, mult: 0.1, color: 0xffaa00, vfx: 'gatling', hits: 15 },
            { name: "BUNKER BUSTER", cost: 80, mult: 7.0, color: 0xff0000, vfx: 'nuke', hits: 1 }
        ]},
        // 30-39
        { name: "ARTILLERY", desc: "Tier 4: Long Range", skills: [
            { name: "HOWITZER", cost: 0, mult: 2.0, color: 0xaa5500, vfx: 'heavy', hits: 1 },
            { name: "CARPET BOMB", cost: 100, mult: 1.0, color: 0xff5500, vfx: 'rain', hits: 10 }
        ]},
        // 40-49
        { name: "LASER-CORE", desc: "Tier 5: Energy", skills: [
            { name: "PULSE RIFLE", cost: 0, mult: 0.5, color: 0x00f2ff, vfx: 'beam', hits: 5 },
            { name: "ION CANNON", cost: 120, mult: 12.0, color: 0x00ffff, vfx: 'god_beam', hits: 1 }
        ]},
        // 50-59
        { name: "FORTRESS", desc: "Tier 6: Defense", skills: [
            { name: "FLAK", cost: 0, mult: 0.3, color: 0xffff00, vfx: 'explode', hits: 12 },
            { name: "DOOMSDAY", cost: 150, mult: 15.0, color: 0xff0000, vfx: 'nuke', hits: 1 }
        ]},
        // 60-69
        { name: "GUNDAM-X", desc: "Tier 7: Mobile", skills: [
            { name: "BEAM SABER", cost: 0, mult: 1.0, color: 0xff00ff, vfx: 'slash', hits: 3 },
            { name: "FULL BURST", cost: 180, mult: 0.8, color: 0x00ff00, vfx: 'omni', hits: 25 }
        ]},
        // 70-79
        { name: "DREADNOUGHT", desc: "Tier 8: Space", skills: [
            { name: "MACRO CANNON", cost: 0, mult: 3.0, color: 0xaaaaff, vfx: 'heavy', hits: 2 },
            { name: "EXTERMINATUS", cost: 220, mult: 25.0, color: 0xffaa00, vfx: 'rain', hits: 15 }
        ]},
        // 80-89
        { name: "WORLD-EATER", desc: "Tier 9: Planetary", skills: [
            { name: "CRUST CRACK", cost: 0, mult: 2.0, color: 0xff5500, vfx: 'implode', hits: 5 },
            { name: "CORE DETONATE", cost: 260, mult: 40.0, color: 0xff0000, vfx: 'nuke', hits: 1 }
        ]},
        // 90+
        { name: "ANNIHILATOR", desc: "Tier 10: Universal", skills: [
            { name: "ZERO POINT", cost: 0, mult: 1.0, color: 0xffffff, vfx: 'gatling', hits: 50 },
            { name: "SUPERNOVA", cost: 400, mult: 80.0, color: 0xffaa00, vfx: 'nuke', hits: 1 }
        ]}
    ]
};


// --- RARITY SYSTEM ---
const RARITY = {
    COMMON:    { id: 'common',    name: 'COMMON',    mult: 1,   prob: 1.00 },
    RARE:      { id: 'rare',      name: 'RARE',      mult: 1.5, prob: 0.36 }, // 30% chance (0.06 + 0.30)
    EPIC:      { id: 'epic',      name: 'EPIC',      mult: 2.5, prob: 0.06 }, // 5% chance (0.01 + 0.05)
    LEGENDARY: { id: 'legendary', name: 'LEGENDARY', mult: 5.0, prob: 0.01 }  // 1% chance
};

const PERK_POOL = [
    { name: "RECYCLER", baseVal: 5,  desc: "+{val} Mana Regen", func: (p, v) => p.manaRegen += v },
    { name: "CRITICAL OS", baseVal: 5, desc: "+{val}% Crit Chance", func: (p, v) => p.critChance += (v/100) },
    { name: "HYDRAULICS", baseVal: 5,  desc: "+{val} Base Damage", func: (p, v) => p.atk += v },
    { name: "TITANIUM",   baseVal: 30, desc: "+{val} Max HP", func: (p, v) => { p.maxHp += v; p.hp += v; } },
    { name: "BATTERY",    baseVal: 20, desc: "+{val} Max Mana", func: (p, v) => { p.maxMana += v; p.mana += v; } },
    { name: "VAMPIRE",    baseVal: 3,  desc: "+{val}% Lifesteal", func: (p, v) => p.lifesteal = (p.lifesteal||0) + (v/100) }
];

// --- UNIT LOGIC ---
// class Unit {
//     constructor(isPlayer, hp, maxHp, atk, color, type='walker') {
//         this.isPlayer = isPlayer;
//         this.hp = hp;
//         this.maxHp = maxHp;
//         this.atk = atk;
        
//         this.maxMana = isPlayer ? 50 : 100;
//         this.mana = this.maxMana;
//         this.manaRegen = 5; 
//         this.critChance = 0.05;
//         this.lifesteal = 0;
        
//         // Job Info
//         this.jobType = null; // 'RONIN', 'PRIEST', 'MECH'
//         this.jobTier = 0;    // 0, 1, 2

//         if(isPlayer) {
//             this.model = Models.createHumanoid(color, 1.5);
//         } else if (type === 'boss') {
//             this.model = Models.createBoss(color, 2.5);
//         } else if (type === 'drone') {
//             this.model = Models.createDrone(color, 1.3);
//         } else {
//             this.model = Models.createHumanoid(color, 1.5);
//         }

//         this.mesh = this.model.mesh;
//         this.mesh.position.set(isPlayer ? -2.5 : 2.5, 0, 0);
//         this.mesh.rotation.y = isPlayer ? Math.PI/2 : -Math.PI/2;
        
//         this.mesh.userData.idle = true;
//         this.mesh.userData.baseY = (type === 'drone' || type === 'boss') ? 1.5 : 0;
//         this.mesh.userData.idleSpeed = 0.002;
//         this.mesh.userData.idleAmp = 0.1;
//         this.mesh.position.y = this.mesh.userData.baseY;

//         engine.scene.add(this.mesh);
//     }
    
//     attackAnim(cb) {
//         const weapon = this.model.weapon;
//         const pivot = this.mesh;
//         const startX = pivot.position.x;
//         const targetX = this.isPlayer ? 0.5 : -0.5;
        
//         engine.tween(pivot.position, 'x', targetX, 100, () => {
//             if(weapon) weapon.rotation.x = -0.5;
//             setTimeout(() => {
//                 if(weapon) weapon.rotation.x = 0;
//                 engine.tween(pivot.position, 'x', startX, 150, cb);
//             }, 80);
//         });
//     }
    
//     takeDmg(amount) {
//         this.hp = Math.max(0, this.hp - amount);
//         const base = this.mesh.position.x;
//         this.mesh.position.x += (this.isPlayer ? -0.2 : 0.2);
//         setTimeout(()=> this.mesh.position.x = base, 50);
//         game.showText(amount, this.mesh.position, this.isPlayer ? '#ff0055' : '#fff');
//     }
// }
// --- UNIT CLASS (Required for Game) ---
// class Unit {
//     constructor(isPlayer, hp, maxHp, atk, color, type='walker') {
//         this.isPlayer = isPlayer; this.hp = hp; this.maxHp = maxHp; this.atk = atk;
//         this.maxMana = isPlayer ? 50 : 100; this.mana = this.maxMana; this.manaRegen = 5; 
//         this.critChance = 0.05; this.lifesteal = 0; this.jobType = null; this.jobTier = 0;
//         if(isPlayer) this.model = Models.createHumanoid(color, 1.5);
//         else if (type === 'boss') this.model = Models.createBoss(color, 2.5);
//         else if (type === 'drone') this.model = Models.createDrone(color, 1.3);
//         else this.model = Models.createHumanoid(color, 1.5);
//         this.mesh = this.model.mesh;
//         this.mesh.position.set(isPlayer ? -2.5 : 2.5, 0, 0);
//         this.mesh.rotation.y = isPlayer ? Math.PI/2 : -Math.PI/2;
//         this.mesh.userData.idle = true; this.mesh.userData.baseY = (type === 'drone'||type==='boss') ? 1.5 : 0;
//         this.mesh.userData.idleSpeed = 0.002; this.mesh.userData.idleAmp = 0.1;
//         this.mesh.position.y = this.mesh.userData.baseY;
//         engine.scene.add(this.mesh);
//     }
//     attackAnim(cb) {
//         const weapon = this.model.weapon; const pivot = this.mesh;
//         const startX = pivot.position.x; const targetX = this.isPlayer ? 0.5 : -0.5;
//         engine.tween(pivot.position, 'x', targetX, 100, () => {
//             if(weapon) weapon.rotation.x = -0.5;
//             setTimeout(() => {
//                 if(weapon) weapon.rotation.x = 0;
//                 engine.tween(pivot.position, 'x', startX, 150, cb);
//             }, 80);
//         });
//     }
//     takeDmg(amount) {
//         this.hp = Math.max(0, this.hp - amount);
//         const base = this.mesh.position.x;
//         this.mesh.position.x += (this.isPlayer ? -0.2 : 0.2);
//         setTimeout(()=> this.mesh.position.x = base, 50);
//         game.showText(amount, this.mesh.position, this.isPlayer ? '#ff0055' : '#fff');
//     }
// }

// --- GAME CONTROLLER ---
// const game = {
//     floor: 1, gold: 0, player: null, enemy: null, state: 'IDLE',
    
//     startRun() {
//         this.floor = 1; this.gold = 0;
//         if(this.player) engine.scene.remove(this.player.mesh);
//         if(this.enemy) engine.scene.remove(this.enemy.mesh);
//         this.player = new Unit(true, 150, 150, 20, 0x00f2ff);
//         this.offerJobSelection(0); 
//     },

//     // --- MAIN ATTACK LOGIC WITH VFX ---
//     useSkill(slot) {
//         if(this.state !== 'IDLE') return;
//         const skill = this.player.skills[slot];
//         if(this.player.mana < skill.cost) { this.showText("NO MANA", this.player.mesh.position, '#00f2ff'); return; }

//         this.state = 'ANIMATING';
//         this.player.mana -= skill.cost;
//         let hits = skill.hits || 1;
//         let delay = 150; // default hit delay

//         // Customize delays for rapid fire vs heavy hits
//         if(skill.vfx === 'gatling' || skill.vfx === 'omni') delay = 50; 
//         if(skill.vfx === 'nova') delay = 80;

//         this.player.attackAnim(() => {
//             // VFX LOOP
//             for(let i=0; i<hits; i++) {
//                 setTimeout(() => {
//                     this.triggerHit(skill, i, hits);
//                 }, i * delay);
//             }
            
//             // End Turn Delay
//             setTimeout(() => {
//                 if(this.enemy.hp <= 0) this.winBattle();
//                 else this.enemyTurn();
//             }, 300 + (hits * delay));
//         });
//         this.updateUI();
//     },

//     triggerHit(skill, index, totalHits) {
//         let isCrit = Math.random() < this.player.critChance;
//         let raw = Math.floor(this.player.atk * skill.mult * (isCrit ? 2 : 1));
        
//         // Mechanics
//         if(skill.heal) this.player.hp = Math.min(this.player.maxHp, this.player.hp + (skill.heal/totalHits)); // Distribute heal
//         if(skill.manaGain) this.player.mana = Math.min(this.player.maxMana, this.player.mana + (skill.manaGain/totalHits));
//         if(this.player.lifesteal > 0) {
//              const ls = Math.floor(raw * this.player.lifesteal);
//              if(ls > 0) this.player.hp = Math.min(this.player.maxHp, this.player.hp + ls);
//         }

//         this.enemy.takeDmg(raw);
//         if(isCrit) this.showText("CRIT!", this.enemy.mesh.position, '#ffaa00');
//         this.updateUI();

//         // --- SPECTACULAR VFX SWITCH ---
//         const pos = this.enemy.mesh.position.clone();
        
//         switch(skill.vfx) {
//             case 'slash':
//                 engine.spawnParticles(pos, skill.color, 15, 0.4);
//                 break;
//             case 'heavy_hit':
//                 engine.spawnParticles(pos, 0xff0000, 30, 0.6);
//                 engine.addShake(0.3);
//                 engine.spawnShockwave(pos, 0xff0000, 2);
//                 break;
//             case 'multi_slash':
//                 engine.spawnParticles(pos, 0x9900ff, 10, 0.4);
//                 pos.x += (Math.random()-0.5); pos.y += (Math.random()-0.5);
//                 break;
//             case 'omni': // 12 hits rapid
//                 engine.spawnParticles(pos, 0xffffff, 8, 0.5);
//                 engine.addShake(0.05);
//                 if(index === totalHits-1) engine.spawnShockwave(pos, 0xaa00ff, 3);
//                 break;
//             case 'zap':
//                 engine.spawnParticles(pos, 0xffff00, 5, 0.2);
//                 break;
//             case 'beam':
//                 engine.spawnBeam(pos, 0x00f2ff, 8);
//                 engine.spawnShockwave(pos, 0x00f2ff, 1);
//                 engine.addShake(0.1);
//                 break;
//             case 'nova': // HOLY NOVA (7 Hits)
//                 engine.spawnShockwave(pos, 0xffffff, 1 + (index*0.2)); // expanding rings
//                 engine.spawnParticles(pos, 0x00ffff, 10, 0.3);
//                 engine.addShake(0.05);
//                 if(index === totalHits-1) engine.spawnBeam(pos, 0xffffff, 10); // Final pillar
//                 break;
//             case 'god_beam':
//                 engine.spawnBeam(pos, 0xffd700, 15);
//                 engine.spawnShockwave(pos, 0xffd700, 3);
//                 engine.addShake(0.2);
//                 break;
//             case 'gatling':
//                 engine.spawnParticles(pos, 0xffaa00, 5, 0.2);
//                 engine.addShake(0.02);
//                 break;
//             case 'explosion':
//                 engine.spawnParticles(pos, 0xff5500, 25, 0.5);
//                 engine.spawnShockwave(pos, 0xff5500, 2);
//                 engine.addShake(0.2);
//                 break;
//             case 'nuke':
//                 engine.spawnParticles(pos, 0xff2200, 50, 0.8);
//                 engine.spawnShockwave(pos, 0xff2200, 5);
//                 engine.addShake(0.5);
//                 break;
//             case 'orbital':
//                 engine.spawnBeam(pos, 0xff0000, 20);
//                 engine.spawnShockwave(pos, 0xff0000, 6);
//                 engine.addShake(1.0); // Massive shake
//                 break;
//             default:
//                 engine.spawnParticles(pos, skill.color, 10);
//         }
//     },

//     // --- JOB SELECTION & REST OF GAME ---
//     offerJobSelection(tier) {
//         this.setScreen('class-screen');
//         const container = document.getElementById('class-container');
//         container.innerHTML = '';
//         if(tier === 0) {
//             document.querySelector('#class-screen h2').innerText = "SELECT BASE CLASS";
//             ['RONIN', 'PRIEST', 'MECH'].forEach(jobKey => {
//                 this.createJobCard(container, CLASS_TREES[jobKey][0], () => this.setJob(jobKey, 0));
//             });
//         } else {
//             document.querySelector('#class-screen h2').innerText = "JOB ADVANCEMENT";
//             const currentKey = this.player.jobType;
//             const nextTier = Math.min(tier, 2);
//             this.createJobCard(container, CLASS_TREES[currentKey][nextTier], () => this.setJob(currentKey, nextTier));
//         }
//     },

//     createJobCard(container, jobData, onClick) {
//         const card = document.createElement('div');
//         card.className = 'perk-card legendary';
//         card.style.height = 'auto';
//         card.innerHTML = `
//             <div class="perk-title">${jobData.name}</div>
//             <div class="perk-desc">${jobData.desc}</div>
//             <div style="font-size:14px; color:#fff; margin-top:10px">
//                 ${jobData.skills[0].name}<br>${jobData.skills[1].name}
//             </div>
//         `;
//         card.onclick = onClick;
//         container.appendChild(card);
//     },

//     setJob(type, tier) {
//         this.player.jobType = type;
//         this.player.jobTier = tier;
//         this.player.skills = CLASS_TREES[type][tier].skills;
//         if(tier > 0) {
//             this.player.atk += 10; this.player.maxHp += 50; this.player.hp = this.player.maxHp;
//             this.player.maxMana += 20; this.player.mana = this.player.maxMana;
//             this.showText("STATS UP!", this.player.mesh.position, "#ffe600");
//         }
//         this.updateButtons();
//         this.state = 'IDLE';
//         this.setScreen('hud');
//         document.getElementById('battle-controls').classList.add('active');
//         if(!this.enemy || this.enemy.hp <= 0) this.spawnEnemy();
//         this.updateUI();
//     },
    
//     spawnEnemy() {
//         if(this.enemy) engine.scene.remove(this.enemy.mesh);
//         const isBoss = (this.floor % 5 === 0);
//         let hp = Math.floor(60 * Math.pow(1.15, this.floor)); 
//         let atk = Math.floor(8 * Math.pow(1.1, this.floor));
        
//         if(isBoss) {
//             hp *= 2.5; atk *= 1.5;
//             document.getElementById('enemy-name').innerText = `BOSS - FLOOR ${this.floor}`;
//             document.getElementById('enemy-name').style.color = '#ff0000';
//             this.enemy = new Unit(false, hp, hp, atk, 0xff0000, 'boss');
//         } else {
//             document.getElementById('enemy-name').innerText = `TARGET - FLOOR ${this.floor}`;
//             document.getElementById('enemy-name').style.color = '#aaa';
//             const type = Math.random() > 0.5 ? 'walker' : 'drone';
//             const color = new THREE.Color().setHSL(Math.random(), 1, 0.5);
//             this.enemy = new Unit(false, hp, hp, atk, color, type);
//         }
//         const targetY = this.enemy.mesh.userData.baseY;
//         this.enemy.mesh.position.y = 10;
//         engine.tween(this.enemy.mesh.position, 'y', targetY, 500);
//     },

//     enemyTurn() {
//         this.enemy.attackAnim(() => {
//             const dmg = Math.floor(this.enemy.atk * (0.9 + Math.random()*0.2));
//             this.player.takeDmg(dmg);
//             engine.spawnParticles(this.player.mesh.position, 0xffaa00, 5);
//             engine.addShake(0.1); // Shake when player hit
            
//             const regen = this.player.manaRegen;
//             this.player.mana = Math.min(this.player.maxMana, this.player.mana + regen);
//             this.showText(`+${regen} MP`, this.player.mesh.position, '#00f2ff');
//             this.updateUI();
            
//             if(this.player.hp <= 0) {
//                 this.state = 'GAMEOVER';
//                 document.getElementById('final-floor').innerText = this.floor;
//                 this.setScreen('gameover-screen');
//                 document.getElementById('battle-controls').classList.remove('active');
//             } else {
//                 this.state = 'IDLE';
//             }
//         });
//     },

//     winBattle() {
//         this.state = 'REWARD';
//         const loot = 20 + (this.floor * 10);
//         this.gold += loot;
//         engine.tween(this.enemy.mesh.scale, 'y', 0.1, 200);
//         this.updateUI();
//         this.generatePerks();
//         this.setScreen('reward-screen');
//         document.getElementById('battle-controls').classList.remove('active');
//     },

//     generatePerks() {
//         const container = document.getElementById('perk-container');
//         container.innerHTML = '';
//         for(let i=0; i<3; i++) {
//             const rand = Math.random();
//             let tier = RARITY.COMMON;
//             if (rand < RARITY.LEGENDARY.prob) tier = RARITY.LEGENDARY;
//             else if (rand < RARITY.EPIC.prob) tier = RARITY.EPIC;
//             else if (rand < RARITY.RARE.prob) tier = RARITY.RARE;
            
//             const template = PERK_POOL[Math.floor(Math.random() * PERK_POOL.length)];
//             const finalVal = Math.floor(template.baseVal * tier.mult);
//             const desc = template.desc.replace('{val}', finalVal);
            
//             const card = document.createElement('div');
//             card.className = `perk-card ${tier.id}`;
//             card.innerHTML = `<div class="perk-title">${template.name}</div><div class="perk-desc">${desc}</div><div class="rarity-tag">${tier.name}</div>`;
//             card.onclick = () => { template.func(this.player, finalVal); this.setScreen('shop-screen'); this.updateUI(); };
//             container.appendChild(card);
//         }
//     },

//     nextFloor() {
//         this.floor++;
//         if(this.floor === 10) { this.offerJobSelection(1); return; }
//         else if (this.floor === 20) { this.offerJobSelection(2); return; }

//         this.state = 'IDLE';
//         this.setScreen('hud');
//         document.getElementById('battle-controls').classList.add('active');
//         this.spawnEnemy();
//         this.updateUI();
//     },

//     showText(txt, pos, color) {
//         const div = document.createElement('div');
//         div.className = 'dmg-float'; div.innerText = txt; div.style.color = color;
//         const vec = pos.clone(); vec.y+=2.5; vec.project(engine.camera);
//         div.style.left = (vec.x * 0.5 + 0.5) * window.innerWidth + 'px';
//         div.style.top = (-(vec.y * 0.5) + 0.5) * window.innerHeight + 'px';
//         document.body.appendChild(div);
//         setTimeout(()=>div.remove(), 600);
//     },

//     setScreen(id) {
//         document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
//         if(id !== 'hud') document.getElementById(id).classList.add('active');
//     },
    
//     updateButtons() {
//         if(!this.player) return;
//         const s1 = this.player.skills[0];
//         const s2 = this.player.skills[1];
//         document.getElementById('btn-skill-1').innerHTML = `<span class="btn-name">${s1.name}</span><br><span class="btn-cost">${s1.cost} MP</span>`;
//         document.getElementById('btn-skill-2').innerHTML = `<span class="btn-name">${s2.name}</span><br><span class="btn-cost">${s2.cost} MP</span>`;
//     },

//     updateUI() {
//         document.getElementById('floor-num').innerText = this.floor;
//         document.getElementById('gold-num').innerText = this.gold;
//         document.getElementById('shop-gold').innerText = this.gold;
//         if(this.player) {
//             const php = (this.player.hp / this.player.maxHp) * 100;
//             const pmp = (this.player.mana / this.player.maxMana) * 100;
//             document.getElementById('p-hp-fill').style.width = php + '%';
//             document.getElementById('p-hp-text').innerText = `${Math.floor(this.player.hp)} / ${this.player.maxHp}`;
//             document.getElementById('p-mana-fill').style.width = pmp + '%';
//             document.getElementById('p-mana-text').innerText = `${Math.floor(this.player.mana)} / ${this.player.maxMana}`;
//         }
//         if(this.enemy) {
//             const ehp = (this.enemy.hp / this.enemy.maxHp) * 100;
//             document.getElementById('e-hp-fill').style.width = ehp + '%';
//             document.getElementById('e-hp-text').innerText = `${Math.floor(this.enemy.hp)} / ${this.enemy.maxHp}`;
//         }
//     },
    
//     buyItem(item) {
//         if(item === 'heal' && this.gold >= 50) { this.gold -= 50; this.player.hp = Math.min(this.player.maxHp, this.player.hp + 50); }
//         else if (item === 'atk' && this.gold >= 100) { this.gold -= 100; this.player.atk += 5; }
//         else if (item === 'hp' && this.gold >= 100) { this.gold -= 100; this.player.maxHp += 20; this.player.hp += 20; }
//         else if (item === 'mana' && this.gold >= 75) { this.gold -= 75; this.player.maxMana += 20; this.player.mana += 20; }
//         this.updateUI();
//     }
// };

// // --- GAME LOGIC ---
// const game = {
//     floor: 1, gold: 0, player: null, enemy: null, state: 'IDLE',
    
//     startRun() {
//         this.floor = 1; this.gold = 0;
//         if(this.player) engine.scene.remove(this.player.mesh);
//         if(this.enemy) engine.scene.remove(this.enemy.mesh);
//         this.player = new Unit(true, 150, 150, 20, 0x00f2ff);
//         this.offerJobSelection(0); 
//     },

//     useSkill(slot) {
//         if(this.state !== 'IDLE') return;
//         const skill = this.player.skills[slot];
//         if(this.player.mana < skill.cost) { this.showText("NO MANA", this.player.mesh.position, '#00f2ff'); return; }

//         this.state = 'ANIMATING';
//         this.player.mana -= skill.cost;
//         let hits = skill.hits || 1;
        
//         // DYNAMIC DELAY BASED ON HIT COUNT
//         let delay = 150; 
//         if(hits > 5) delay = 80;
//         if(hits > 15) delay = 30; // Machine gun speed
//         if(hits > 40) delay = 15; // Minigun speed

//         this.player.attackAnim(() => {
//             for(let i=0; i<hits; i++) {
//                 setTimeout(() => { this.triggerHit(skill, i, hits); }, i * delay);
//             }
//             setTimeout(() => {
//                 if(this.enemy.hp <= 0) this.winBattle();
//                 else this.enemyTurn();
//             }, 500 + (hits * delay));
//         });
//         this.updateUI();
//     },

//     triggerHit(skill, index, totalHits) {
//         let isCrit = Math.random() < this.player.critChance;
//         // Crit multiplier scales with levels
//         const critMult = 1.5 + (this.floor * 0.05);
//         let raw = Math.floor(this.player.atk * skill.mult * (isCrit ? critMult : 1));
        
//         // Mechanics
//         if(skill.heal) this.player.hp = Math.min(this.player.maxHp, this.player.hp + (skill.heal/totalHits));
//         if(skill.manaGain) this.player.mana = Math.min(this.player.maxMana, this.player.mana + (skill.manaGain/totalHits));
//         if(this.player.lifesteal > 0) {
//             const ls = Math.floor(raw * this.player.lifesteal);
//             if(ls > 0) this.player.hp = Math.min(this.player.maxHp, this.player.hp + ls);
//         }

//         this.enemy.takeDmg(raw);
//         if(isCrit) this.showText("CRIT!", this.enemy.mesh.position, '#ffaa00');
//         this.updateUI();

//         // --- UNIQUE VFX SELECTOR ---
//         const pos = this.enemy.mesh.position.clone();
        
//         if(skill.vfx === 'slash') engine.spawnParticles(pos, skill.color, 15, 0.4);
//         else if(skill.vfx === 'heavy') { engine.spawnParticles(pos, skill.color, 30, 0.6); engine.addShake(0.3); engine.spawnShockwave(pos, skill.color, 2); }
//         else if(skill.vfx === 'multi') { engine.spawnParticles(pos, skill.color, 10, 0.4); pos.x+=(Math.random()-0.5); pos.y+=(Math.random()-0.5); }
//         else if(skill.vfx === 'omni') { engine.spawnParticles(pos, skill.color, 8, 0.5); if(index===totalHits-1) engine.spawnShockwave(pos, skill.color, 3); }
//         else if(skill.vfx === 'zap') engine.spawnParticles(pos, 0xffff00, 5, 0.2);
//         else if(skill.vfx === 'beam') { engine.spawnBeam(pos, skill.color, 8, 0.3); engine.addShake(0.05); }
//         else if(skill.vfx === 'god_beam') { engine.spawnBeam(pos, skill.color, 20, 1.0); engine.spawnShockwave(pos, skill.color, 3); engine.addShake(0.2); }
//         else if(skill.vfx === 'nova') { engine.spawnShockwave(pos, skill.color, 1+(index*0.3)); engine.addShake(0.05); }
//         else if(skill.vfx === 'gatling') { engine.spawnParticles(pos, skill.color, 4, 0.3); engine.addShake(0.02); }
//         else if(skill.vfx === 'explode') { engine.spawnParticles(pos, 0xff5500, 20, 0.5); engine.spawnShockwave(pos, 0xff5500, 1.5); engine.addShake(0.2); }
//         else if(skill.vfx === 'nuke') { engine.spawnParticles(pos, 0xff0000, 60, 0.8); engine.spawnShockwave(pos, 0xff0000, 6); engine.addShake(0.8); }
        
//         // TIER 7+ SPECIALS
//         else if(skill.vfx === 'implode') { engine.spawnImplosion(pos, skill.color); engine.addShake(0.1); }
//         else if(skill.vfx === 'blackhole') { engine.spawnImplosion(pos, 0x000000); engine.spawnShockwave(pos, 0xaa00aa, 5); engine.addShake(0.5); }
//         else if(skill.vfx === 'matrix') { engine.spawnMatrix(pos, 0x00ff00); }
//         else if(skill.vfx === 'rain') { engine.spawnMatrix(pos, skill.color); engine.spawnParticles(pos, skill.color, 10); }
        
//         else engine.spawnParticles(pos, skill.color, 10);
//     },

//     nextFloor() {
//         this.floor++;
//         // Check for Job Advancement (Every 10 floors, up to Tier 9 at Floor 90)
//         if(this.floor % 10 === 0 && this.floor <= 90) {
//             const tier = this.floor / 10;
//             this.offerJobSelection(tier);
//             return;
//         }

//         this.state = 'IDLE';
//         this.setScreen('hud');
//         document.getElementById('battle-controls').classList.add('active');
//         this.spawnEnemy();
//         this.updateUI();
//     },
    
//     // --- SETUP & UTILS ---
//     offerJobSelection(tier) {
//         this.setScreen('class-screen');
//         const container = document.getElementById('class-container');
//         container.innerHTML = '';
        
//         if(tier === 0) {
//             document.querySelector('#class-screen h2').innerText = "SELECT BASE CLASS";
//             ['RONIN', 'PRIEST', 'MECH'].forEach(jobKey => {
//                 this.createJobCard(container, CLASS_TREES[jobKey][0], () => this.setJob(jobKey, 0));
//             });
//         } else {
//             document.querySelector('#class-screen h2').innerText = `TIER ${tier+1} ADVANCEMENT`;
//             const currentKey = this.player.jobType;
//             // Safety check for array bounds
//             if(CLASS_TREES[currentKey][tier]) {
//                 this.createJobCard(container, CLASS_TREES[currentKey][tier], () => this.setJob(currentKey, tier));
//             } else {
//                 this.nextFloor(); // Skip if no job found
//             }
//         }
//     },
    
//     createJobCard(container, jobData, onClick) {
//         const card = document.createElement('div');
//         card.className = 'perk-card legendary';
//         card.style.height = 'auto';
//         card.innerHTML = `
//             <div class="perk-title">${jobData.name}</div>
//             <div class="perk-desc">${jobData.desc}</div>
//             <div style="font-size:14px; color:#fff; margin-top:10px; text-align:left; line-height:1.4em;">
//                 <strong>1:</strong> ${jobData.skills[0].name}<br>
//                 <span style="color:#aaa">${jobData.skills[0].mult}x Dmg / ${jobData.skills[0].hits||1} Hits</span><br>
//                 <strong>2:</strong> ${jobData.skills[1].name}<br>
//                 <span style="color:#aaa">${jobData.skills[1].mult}x Dmg / ${jobData.skills[1].hits||1} Hits</span>
//             </div>
//         `;
//         card.onclick = onClick;
//         container.appendChild(card);
//     },

//     setJob(type, tier) {
//         this.player.jobType = type;
//         this.player.jobTier = tier;
//         this.player.skills = CLASS_TREES[type][tier].skills;
        
//         // Massive Stat Scaling for Higher Tiers
//         if(tier > 0) {
//             this.player.atk += 20 * tier; 
//             this.player.maxHp += 100 * tier; 
//             this.player.hp = this.player.maxHp;
//             this.player.maxMana += 50 * tier; 
//             this.player.mana = this.player.maxMana;
//             this.player.manaRegen += 2 * tier;
//             this.showText("ASCENDED!", this.player.mesh.position, "#ffe600");
//         }
//         this.updateButtons();
//         this.state = 'IDLE';
//         this.setScreen('hud');
//         document.getElementById('battle-controls').classList.add('active');
//         if(!this.enemy || this.enemy.hp <= 0) this.spawnEnemy();
//         this.updateUI();
//     },

//     // Standard Game Logic (Spawn, Turns, Rewards) matches previous structure
//     spawnEnemy() {
//         if(this.enemy) engine.scene.remove(this.enemy.mesh);
//         const isBoss = (this.floor % 5 === 0);
        
//         // Curve: Early game flat, late game exponential
//         let hp = Math.floor(100 * Math.pow(1.12, this.floor)); 
//         let atk = Math.floor(10 * Math.pow(1.08, this.floor));
        
//         if(isBoss) {
//             hp *= 3; atk *= 1.5;
//             document.getElementById('enemy-name').innerText = `BOSS - FLOOR ${this.floor}`;
//             document.getElementById('enemy-name').style.color = '#ff0000';
//             this.enemy = new Unit(false, hp, hp, atk, 0xff0000, 'boss');
//         } else {
//             document.getElementById('enemy-name').innerText = `TARGET - FLOOR ${this.floor}`;
//             document.getElementById('enemy-name').style.color = '#aaa';
//             const type = Math.random() > 0.5 ? 'walker' : 'drone';
//             const color = new THREE.Color().setHSL(Math.random(), 1, 0.5);
//             this.enemy = new Unit(false, hp, hp, atk, color, type);
//         }
//         const targetY = this.enemy.mesh.userData.baseY;
//         this.enemy.mesh.position.y = 10;
//         engine.tween(this.enemy.mesh.position, 'y', targetY, 500);
//     },

//     enemyTurn() {
//         this.enemy.attackAnim(() => {
//             const dmg = Math.floor(this.enemy.atk * (0.8 + Math.random()*0.4));
//             this.player.takeDmg(dmg);
//             engine.spawnParticles(this.player.mesh.position, 0xffaa00, 5);
//             engine.addShake(0.1); 
            
//             const regen = this.player.manaRegen;
//             this.player.mana = Math.min(this.player.maxMana, this.player.mana + regen);
//             this.showText(`+${regen} MP`, this.player.mesh.position, '#00f2ff');
//             this.updateUI();
            
//             if(this.player.hp <= 0) {
//                 this.state = 'GAMEOVER';
//                 document.getElementById('final-floor').innerText = this.floor;
//                 this.setScreen('gameover-screen');
//                 document.getElementById('battle-controls').classList.remove('active');
//             } else {
//                 this.state = 'IDLE';
//             }
//         });
//     },

//     winBattle() {
//         this.state = 'REWARD';
//         const loot = 50 + (this.floor * 15);
//         this.gold += loot;
//         engine.tween(this.enemy.mesh.scale, 'y', 0.1, 200);
//         this.updateUI();
//         this.generatePerks();
//         this.setScreen('reward-screen');
//         document.getElementById('battle-controls').classList.remove('active');
//     },

//     generatePerks() {
//         // ... (Keep existing Perk Logic)
//         const container = document.getElementById('perk-container');
//         container.innerHTML = '';
//         const RARITY = { COMMON: {id:'common', name:'COMMON', mult:1, prob:1.0}, RARE: {id:'rare', name:'RARE', mult:1.5, prob:0.36}, EPIC: {id:'epic', name:'EPIC', mult:2.5, prob:0.06}, LEGENDARY: {id:'legendary', name:'LEGENDARY', mult:5.0, prob:0.01} };
//         const PERK_POOL = [ { name: "RECYCLER", baseVal: 5,  desc: "+{val} Mana Regen", func: (p, v) => p.manaRegen += v }, { name: "CRITICAL OS", baseVal: 5, desc: "+{val}% Crit Chance", func: (p, v) => p.critChance += (v/100) }, { name: "HYDRAULICS", baseVal: 10,  desc: "+{val} Base Damage", func: (p, v) => p.atk += v }, { name: "TITANIUM",   baseVal: 50, desc: "+{val} Max HP", func: (p, v) => { p.maxHp += v; p.hp += v; } }, { name: "BATTERY",    baseVal: 30, desc: "+{val} Max Mana", func: (p, v) => { p.maxMana += v; p.mana += v; } }, { name: "VAMPIRE",    baseVal: 3,  desc: "+{val}% Lifesteal", func: (p, v) => p.lifesteal = (p.lifesteal||0) + (v/100) } ];

//         for(let i=0; i<3; i++) {
//             const rand = Math.random();
//             let tier = RARITY.COMMON;
//             if (rand < RARITY.LEGENDARY.prob) tier = RARITY.LEGENDARY;
//             else if (rand < RARITY.EPIC.prob) tier = RARITY.EPIC;
//             else if (rand < RARITY.RARE.prob) tier = RARITY.RARE;
            
//             const template = PERK_POOL[Math.floor(Math.random() * PERK_POOL.length)];
//             const finalVal = Math.floor(template.baseVal * tier.mult);
//             const desc = template.desc.replace('{val}', finalVal);
            
//             const card = document.createElement('div');
//             card.className = `perk-card ${tier.id}`;
//             card.innerHTML = `<div class="perk-title">${template.name}</div><div class="perk-desc">${desc}</div><div class="rarity-tag">${tier.name}</div>`;
//             card.onclick = () => { template.func(this.player, finalVal); this.setScreen('shop-screen'); this.updateUI(); };
//             container.appendChild(card);
//         }
//     },
    
//     // UI Helpers
//     showText(txt, pos, color) {
//         const div = document.createElement('div');
//         div.className = 'dmg-float'; div.innerText = txt; div.style.color = color;
//         const vec = pos.clone(); vec.y+=2.5; vec.project(engine.camera);
//         div.style.left = (vec.x * 0.5 + 0.5) * window.innerWidth + 'px';
//         div.style.top = (-(vec.y * 0.5) + 0.5) * window.innerHeight + 'px';
//         document.body.appendChild(div);
//         setTimeout(()=>div.remove(), 600);
//     },
//     setScreen(id) { document.querySelectorAll('.screen').forEach(s => s.classList.remove('active')); if(id !== 'hud') document.getElementById(id).classList.add('active'); },
//     updateButtons() {
//         if(!this.player) return;
//         const s1 = this.player.skills[0]; const s2 = this.player.skills[1];
//         document.getElementById('btn-skill-1').innerHTML = `<span class="btn-name">${s1.name}</span><br><span class="btn-cost">${s1.cost} MP</span>`;
//         document.getElementById('btn-skill-2').innerHTML = `<span class="btn-name">${s2.name}</span><br><span class="btn-cost">${s2.cost} MP</span>`;
//     },
//     updateUI() {
//         document.getElementById('floor-num').innerText = this.floor;
//         document.getElementById('gold-num').innerText = this.gold;
//         document.getElementById('shop-gold').innerText = this.gold;
//         if(this.player) {
//             document.getElementById('p-hp-fill').style.width = (this.player.hp/this.player.maxHp)*100 + '%';
//             document.getElementById('p-hp-text').innerText = `${Math.floor(this.player.hp)} / ${this.player.maxHp}`;
//             document.getElementById('p-mana-fill').style.width = (this.player.mana/this.player.maxMana)*100 + '%';
//             document.getElementById('p-mana-text').innerText = `${Math.floor(this.player.mana)} / ${this.player.maxMana}`;
//         }
//         if(this.enemy) {
//             document.getElementById('e-hp-fill').style.width = (this.enemy.hp/this.enemy.maxHp)*100 + '%';
//             document.getElementById('e-hp-text').innerText = `${Math.floor(this.enemy.hp)} / ${this.enemy.maxHp}`;
//         }
//     },
//     buyItem(item) {
//         if(item === 'heal' && this.gold >= 50) { this.gold -= 50; this.player.hp = Math.min(this.player.maxHp, this.player.hp + 50); }
//         else if (item === 'atk' && this.gold >= 100) { this.gold -= 100; this.player.atk += 10; }
//         else if (item === 'hp' && this.gold >= 100) { this.gold -= 100; this.player.maxHp += 50; this.player.hp += 50; }
//         else if (item === 'mana' && this.gold >= 75) { this.gold -= 75; this.player.maxMana += 30; this.player.mana += 30; }
//         this.updateUI();
//     }
// };

// --- GAME LOGIC ---
const game = {
    floor: 1, gold: 0, player: null, enemy: null, state: 'IDLE',
    
    startRun() {
        this.floor = 1; this.gold = 0;
        if(this.player) engine.scene.remove(this.player.mesh);
        if(this.enemy) engine.scene.remove(this.enemy.mesh);
        this.player = new Unit(true, 150, 150, 20, 0x00f2ff);
        this.offerJobSelection(0); 
    },

    useSkill(slot) {
        if(this.state !== 'IDLE') return;
        const skill = this.player.skills[slot];
        if(this.player.mana < skill.cost) { this.showText("NO MANA", this.player.mesh.position, '#00f2ff'); return; }

        this.state = 'ANIMATING';
        this.player.mana -= skill.cost;
        let hits = skill.hits || 1;
        let delay = hits > 40 ? 15 : hits > 15 ? 30 : hits > 5 ? 80 : 150; 

        this.player.attackAnim(() => {
            for(let i=0; i<hits; i++) {
                setTimeout(() => { this.triggerHit(skill, i, hits); }, i * delay);
            }
            setTimeout(() => {
                if(this.enemy.hp <= 0) this.winBattle();
                else this.enemyTurn();
            }, 500 + (hits * delay));
        });
        this.updateUI();
    },

    triggerHit(skill, index, totalHits) {
        let isCrit = Math.random() < this.player.critChance;
        const critMult = 1.5 + (this.floor * 0.05);
        let raw = Math.floor(this.player.atk * skill.mult * (isCrit ? critMult : 1));
        
        if(skill.heal) this.player.hp = Math.min(this.player.maxHp, this.player.hp + (skill.heal/totalHits));
        if(skill.manaGain) this.player.mana = Math.min(this.player.maxMana, this.player.mana + (skill.manaGain/totalHits));
        if(this.player.lifesteal > 0) {
            const ls = Math.floor(raw * this.player.lifesteal);
            if(ls > 0) this.player.hp = Math.min(this.player.maxHp, this.player.hp + ls);
        }

        this.enemy.takeDmg(raw);
        if(isCrit) this.showText("CRIT!", this.enemy.mesh.position, '#ffaa00');
        this.updateUI();

        const pos = this.enemy.mesh.position.clone();
        this.runVFX(skill.vfx, pos, skill.color, index, totalHits);
    },

    runVFX(type, pos, color, index, totalHits) {
        if(type === 'slash') engine.spawnParticles(pos, color, 15, 0.4);
        else if(type === 'heavy') { engine.spawnParticles(pos, color, 30, 0.6); engine.addShake(0.3); engine.spawnShockwave(pos, color, 2); }
        else if(type === 'multi') { engine.spawnParticles(pos, color, 10, 0.4); pos.x+=(Math.random()-0.5); pos.y+=(Math.random()-0.5); }
        else if(type === 'omni') { engine.spawnParticles(pos, color, 8, 0.5); if(index===totalHits-1) engine.spawnShockwave(pos, color, 3); }
        else if(type === 'zap') engine.spawnParticles(pos, 0xffff00, 5, 0.2);
        else if(type === 'beam') { engine.spawnBeam(pos, color, 8, 0.3); engine.addShake(0.05); }
        else if(type === 'god_beam') { engine.spawnBeam(pos, color, 20, 1.0); engine.spawnShockwave(pos, color, 3); engine.addShake(0.2); }
        else if(type === 'nova') { engine.spawnShockwave(pos, color, 1+(index*0.3)); engine.addShake(0.05); }
        else if(type === 'gatling') { engine.spawnParticles(pos, color, 4, 0.3); engine.addShake(0.02); }
        else if(type === 'explode') { engine.spawnParticles(pos, 0xff5500, 20, 0.5); engine.spawnShockwave(pos, 0xff5500, 1.5); engine.addShake(0.2); }
        else if(type === 'nuke') { engine.spawnParticles(pos, 0xff0000, 60, 0.8); engine.spawnShockwave(pos, 0xff0000, 6); engine.addShake(0.8); }
        else if(type === 'implode') { engine.spawnImplosion(pos, color); engine.addShake(0.1); }
        else if(type === 'blackhole') { engine.spawnImplosion(pos, 0x000000); engine.spawnShockwave(pos, 0xaa00aa, 5); engine.addShake(0.5); }
        else if(type === 'matrix') { engine.spawnMatrix(pos, 0x00ff00); }
        else if(type === 'rain') { engine.spawnMatrix(pos, color); engine.spawnParticles(pos, color, 10); }
        else engine.spawnParticles(pos, color, 10);
    },

    nextFloor() {
        this.floor++;
        if(this.floor % 10 === 0 && this.floor <= 90) {
            const tier = this.floor / 10;
            this.offerJobSelection(tier);
            return;
        }
        this.state = 'IDLE';
        this.setScreen('hud');
        document.getElementById('battle-controls').classList.add('active');
        this.spawnEnemy();
        this.updateUI();
    },
    
    offerJobSelection(tier) {
        this.setScreen('class-screen');
        const container = document.getElementById('class-container');
        container.innerHTML = '';
        if(tier === 0) {
            document.querySelector('#class-screen h2').innerText = "SELECT BASE CLASS";
            ['RONIN', 'PRIEST', 'MECH'].forEach(jobKey => this.createJobCard(container, CLASS_TREES[jobKey][0], () => this.setJob(jobKey, 0)));
        } else {
            document.querySelector('#class-screen h2').innerText = `TIER ${tier+1} ADVANCEMENT`;
            const currentKey = this.player.jobType;
            if(CLASS_TREES[currentKey][tier]) this.createJobCard(container, CLASS_TREES[currentKey][tier], () => this.setJob(currentKey, tier));
            else this.nextFloor();
        }
    },
    
    createJobCard(container, jobData, onClick) {
        const card = document.createElement('div');
        card.className = 'perk-card legendary'; card.style.height = 'auto';
        card.innerHTML = `<div class="perk-title">${jobData.name}</div><div class="perk-desc">${jobData.desc}</div>
        <div style="font-size:14px;color:#fff;margin-top:10px;"><strong>1:</strong> ${jobData.skills[0].name}<br><span style="color:#aaa">${jobData.skills[0].mult}x / ${jobData.skills[0].hits||1} Hits</span><br><strong>2:</strong> ${jobData.skills[1].name}<br><span style="color:#aaa">${jobData.skills[1].mult}x / ${jobData.skills[1].hits||1} Hits</span></div>`;
        card.onclick = onClick; container.appendChild(card);
    },

    setJob(type, tier) {
        this.player.jobType = type; this.player.jobTier = tier; this.player.skills = CLASS_TREES[type][tier].skills;
        if(tier > 0) {
            this.player.atk += 25 * tier; this.player.maxHp += 150 * tier; this.player.hp = this.player.maxHp;
            this.player.maxMana += 50 * tier; this.player.mana = this.player.maxMana; this.player.manaRegen += 2 * tier;
            this.showText("ASCENDED!", this.player.mesh.position, "#ffe600");
        }
        this.updateButtons(); this.state = 'IDLE'; this.setScreen('hud'); document.getElementById('battle-controls').classList.add('active');
        if(!this.enemy || this.enemy.hp <= 0) this.spawnEnemy();
        this.updateUI();
    },

    spawnEnemy() {
        if(this.enemy) engine.scene.remove(this.enemy.mesh);
        
        // --- BOSS LOGIC ---
        const isFinalBoss = (this.floor === 100);
        const isMidBoss = (this.floor === 25 || this.floor === 50 || this.floor === 75);
        const isFloorBoss = (this.floor % 5 === 0 && !isFinalBoss && !isMidBoss);

        let hp = Math.floor(100 * Math.pow(1.12, this.floor)); 
        let atk = Math.floor(10 * Math.pow(1.08, this.floor));

        if(isFinalBoss) {
            hp = 5000000; // 5 Million Fixed HP (Ridiculous but beatable with Tier 10)
            atk *= 5;
            document.getElementById('enemy-name').innerText = `THE ARCHITECT (FINAL)`;
            document.getElementById('enemy-name').style.color = '#ffd700';
            this.enemy = new Unit(false, hp, hp, atk, 0xffd700, 'architect');
        } 
        else if (isMidBoss) {
            hp *= 5; atk *= 2;
            const names = {25:"GATEKEEPER", 50:"WARLORD", 75:"CORRUPTOR"};
            document.getElementById('enemy-name').innerText = `${names[this.floor]} (MID BOSS)`;
            document.getElementById('enemy-name').style.color = '#ff5500';
            this.enemy = new Unit(false, hp, hp, atk, 0xff5500, 'boss');
        }
        else if(isFloorBoss) {
            hp *= 2.5; atk *= 1.3;
            document.getElementById('enemy-name').innerText = `SECTOR BOSS - ${this.floor}`;
            document.getElementById('enemy-name').style.color = '#ff0000';
            this.enemy = new Unit(false, hp, hp, atk, 0xff0000, 'boss');
        } 
        else {
            document.getElementById('enemy-name').innerText = `TARGET - FLOOR ${this.floor}`;
            document.getElementById('enemy-name').style.color = '#aaa';
            const type = Math.random() > 0.5 ? 'walker' : 'drone';
            const color = new THREE.Color().setHSL(Math.random(), 1, 0.5);
            this.enemy = new Unit(false, hp, hp, atk, color, type);
        }
        const targetY = this.enemy.mesh.userData.baseY;
        this.enemy.mesh.position.y = 10;
        engine.tween(this.enemy.mesh.position, 'y', targetY, 800);
    },

    enemyTurn() {
        this.enemy.attackAnim(() => {
            const dmg = Math.floor(this.enemy.atk * (0.8 + Math.random()*0.4));
            this.player.takeDmg(dmg);
            engine.addShake(0.1); 

            // --- BOSS VFX AGAINST PLAYER ---
            if(this.enemy.type === 'architect') {
                // Final Boss uses random God Skills on you
                const attacks = ['god_beam', 'blackhole', 'matrix', 'nuke'];
                const vfx = attacks[Math.floor(Math.random()*attacks.length)];
                this.runVFX(vfx, this.player.mesh.position, 0xff0000, 0, 1);
                this.showText("REALITY BREAK", this.player.mesh.position, "#ff0000");
            } else if (this.enemy.type === 'boss') {
                // Mid bosses use heavy hits
                this.runVFX('heavy', this.player.mesh.position, 0xff5500, 0, 1);
            } else {
                engine.spawnParticles(this.player.mesh.position, 0xffaa00, 5);
            }
            
            const regen = this.player.manaRegen;
            this.player.mana = Math.min(this.player.maxMana, this.player.mana + regen);
            this.showText(`+${regen} MP`, this.player.mesh.position, '#00f2ff');
            this.updateUI();
            
            if(this.player.hp <= 0) {
                this.state = 'GAMEOVER';
                document.getElementById('final-floor').innerText = this.floor;
                this.setScreen('gameover-screen');
                document.getElementById('battle-controls').classList.remove('active');
            } else {
                this.state = 'IDLE';
            }
        });
    },

    winBattle() {
        this.state = 'REWARD';
        if(this.floor === 100) {
            // Victory Screen logic could go here
            document.getElementById('final-floor').innerText = "100 (COMPLETE)";
            document.querySelector('#gameover-screen h1').innerText = "SYSTEM CONQUERED";
            document.querySelector('#gameover-screen h1').style.color = "#00ff00";
            this.setScreen('gameover-screen');
            return;
        }

        const loot = 50 + (this.floor * 15);
        this.gold += loot;
        engine.tween(this.enemy.mesh.scale, 'y', 0.1, 200);
        this.updateUI();
        this.generatePerks();
        this.setScreen('reward-screen');
        document.getElementById('battle-controls').classList.remove('active');
    },

    generatePerks() {
        const container = document.getElementById('perk-container');
        container.innerHTML = '';
        const RARITY = { COMMON: {id:'common', name:'COMMON', mult:1, prob:1.0}, RARE: {id:'rare', name:'RARE', mult:1.5, prob:0.36}, EPIC: {id:'epic', name:'EPIC', mult:2.5, prob:0.06}, LEGENDARY: {id:'legendary', name:'LEGENDARY', mult:5.0, prob:0.01} };
        const PERK_POOL = [ { name: "RECYCLER", baseVal: 5,  desc: "+{val} Mana Regen", func: (p, v) => p.manaRegen += v }, { name: "CRITICAL OS", baseVal: 5, desc: "+{val}% Crit Chance", func: (p, v) => p.critChance += (v/100) }, { name: "HYDRAULICS", baseVal: 10,  desc: "+{val} Base Damage", func: (p, v) => p.atk += v }, { name: "TITANIUM",   baseVal: 50, desc: "+{val} Max HP", func: (p, v) => { p.maxHp += v; p.hp += v; } }, { name: "BATTERY",    baseVal: 30, desc: "+{val} Max Mana", func: (p, v) => { p.maxMana += v; p.mana += v; } }, { name: "VAMPIRE",    baseVal: 3,  desc: "+{val}% Lifesteal", func: (p, v) => p.lifesteal = (p.lifesteal||0) + (v/100) } ];

        for(let i=0; i<3; i++) {
            const rand = Math.random();
            let tier = RARITY.COMMON;
            if (rand < RARITY.LEGENDARY.prob) tier = RARITY.LEGENDARY;
            else if (rand < RARITY.EPIC.prob) tier = RARITY.EPIC;
            else if (rand < RARITY.RARE.prob) tier = RARITY.RARE;
            const template = PERK_POOL[Math.floor(Math.random() * PERK_POOL.length)];
            const finalVal = Math.floor(template.baseVal * tier.mult);
            const desc = template.desc.replace('{val}', finalVal);
            const card = document.createElement('div');
            card.className = `perk-card ${tier.id}`;
            card.innerHTML = `<div class="perk-title">${template.name}</div><div class="perk-desc">${desc}</div><div class="rarity-tag">${tier.name}</div>`;
            card.onclick = () => { template.func(this.player, finalVal); this.setScreen('shop-screen'); this.updateUI(); };
            container.appendChild(card);
        }
    },
    
    showText(txt, pos, color) {
        const div = document.createElement('div');
        div.className = 'dmg-float'; div.innerText = txt; div.style.color = color;
        const vec = pos.clone(); vec.y+=2.5; vec.project(engine.camera);
        div.style.left = (vec.x * 0.5 + 0.5) * window.innerWidth + 'px';
        div.style.top = (-(vec.y * 0.5) + 0.5) * window.innerHeight + 'px';
        document.body.appendChild(div);
        setTimeout(()=>div.remove(), 600);
    },
    setScreen(id) { document.querySelectorAll('.screen').forEach(s => s.classList.remove('active')); if(id !== 'hud') document.getElementById(id).classList.add('active'); },
    updateButtons() {
        if(!this.player) return;
        const s1 = this.player.skills[0]; const s2 = this.player.skills[1];
        document.getElementById('btn-skill-1').innerHTML = `<span class="btn-name">${s1.name}</span><br><span class="btn-cost">${s1.cost} MP</span>`;
        document.getElementById('btn-skill-2').innerHTML = `<span class="btn-name">${s2.name}</span><br><span class="btn-cost">${s2.cost} MP</span>`;
    },
    updateUI() {
        document.getElementById('floor-num').innerText = this.floor;
        document.getElementById('gold-num').innerText = this.gold;
        document.getElementById('shop-gold').innerText = this.gold;
        if(this.player) {
            document.getElementById('p-hp-fill').style.width = Math.min(100, (this.player.hp/this.player.maxHp)*100) + '%';
            document.getElementById('p-hp-text').innerText = `${Math.floor(this.player.hp)} / ${this.player.maxHp}`;
            document.getElementById('p-mana-fill').style.width = Math.min(100, (this.player.mana/this.player.maxMana)*100) + '%';
            document.getElementById('p-mana-text').innerText = `${Math.floor(this.player.mana)} / ${this.player.maxMana}`;
        }
        if(this.enemy) {
            document.getElementById('e-hp-fill').style.width = Math.min(100, (this.enemy.hp/this.enemy.maxHp)*100) + '%';
            document.getElementById('e-hp-text').innerText = `${Math.floor(this.enemy.hp)} / ${this.enemy.maxHp}`;
        }
    },
    buyItem(item) {
        if(item === 'heal' && this.gold >= 50) { this.gold -= 50; this.player.hp = Math.min(this.player.maxHp, this.player.hp + 50); }
        else if (item === 'atk' && this.gold >= 100) { this.gold -= 100; this.player.atk += 10; }
        else if (item === 'hp' && this.gold >= 100) { this.gold -= 100; this.player.maxHp += 50; this.player.hp += 50; }
        else if (item === 'mana' && this.gold >= 75) { this.gold -= 75; this.player.maxMana += 30; this.player.mana += 30; }
        this.updateUI();
    }
};

class Unit {
    constructor(isPlayer, hp, maxHp, atk, color, type='walker') {
        this.isPlayer = isPlayer; this.hp = hp; this.maxHp = maxHp; this.atk = atk; this.type = type;
        this.maxMana = isPlayer ? 50 : 100; this.mana = this.maxMana; this.manaRegen = 5; 
        this.critChance = 0.05; this.lifesteal = 0; this.jobType = null; this.jobTier = 0;
        if(isPlayer) this.model = Models.createHumanoid(color, 1.5);
        else if (type === 'architect') this.model = Models.createArchitect(2.5); // FINAL BOSS
        else if (type === 'boss') this.model = Models.createBoss(color, 2.5);
        else if (type === 'drone') this.model = Models.createDrone(color, 1.3);
        else this.model = Models.createHumanoid(color, 1.5);
        this.mesh = this.model.mesh;
        this.mesh.position.set(isPlayer ? -2.5 : 2.5, 0, 0);
        this.mesh.rotation.y = isPlayer ? Math.PI/2 : -Math.PI/2;
        this.mesh.userData.idle = true; this.mesh.userData.baseY = (type === 'drone'||type==='boss'||type==='architect') ? 1.5 : 0;
        this.mesh.userData.idleSpeed = 0.002; this.mesh.userData.idleAmp = 0.1;
        this.mesh.position.y = this.mesh.userData.baseY;
        engine.scene.add(this.mesh);
    }
    attackAnim(cb) {
        const weapon = this.model.weapon; const pivot = this.mesh;
        const startX = pivot.position.x; const targetX = this.isPlayer ? 0.5 : -0.5;
        engine.tween(pivot.position, 'x', targetX, 100, () => {
            if(weapon) weapon.rotation.x = -0.5;
            setTimeout(() => { if(weapon) weapon.rotation.x = 0; engine.tween(pivot.position, 'x', startX, 150, cb); }, 80);
        });
    }
    takeDmg(amount) {
        this.hp = Math.max(0, this.hp - amount);
        const base = this.mesh.position.x;
        this.mesh.position.x += (this.isPlayer ? -0.2 : 0.2);
        setTimeout(()=> this.mesh.position.x = base, 50);
        game.showText(amount, this.mesh.position, this.isPlayer ? '#ff0055' : '#fff');
    }
}