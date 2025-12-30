const ITEMS = {
    WEAPONS: [
        // --- COMMON (Tier 1) ---
        { id: 'rusty_pipe', name: 'RUSTY PIPE', type: 'weapon', atk: 5, rarity: 'common', desc: '+5 ATK. Tetanus included.' },
        { id: 'combat_knife', name: 'CARBON KNIFE', type: 'weapon', atk: 12, rarity: 'common', desc: '+12 ATK. Standard issue.' },
        { id: 'crowbar', name: 'OLD CROWBAR', type: 'weapon', atk: 15, rarity: 'common', desc: '+15 ATK. Good for opening crates.' },
        { id: 'shock_baton', name: 'SHOCK BATON', type: 'weapon', atk: 18, rarity: 'common', desc: '+18 ATK. Zaps on contact.' },
        
        // --- RARE (Tier 2) ---
        { id: 'katana', name: 'NEON KATANA', type: 'weapon', atk: 35, rarity: 'rare', desc: '+35 ATK. Folded steel.', 
          onHit: (u, t) => { if(Math.random()<0.1) game.showText("SLICE!", t.mesh.position, '#00f2ff'); } },
        { id: 'vamp_dagger', name: 'CRIMSON FANG', type: 'weapon', atk: 25, rarity: 'rare', desc: '+25 ATK, 15% Lifesteal', 
          onHit: (u, t) => { u.hp = Math.min(u.maxHp, u.hp + 8); game.showText("+8 HP", u.mesh.position, '#ff0000'); } },
        { id: 'heavy_maul', name: 'GRAV HAMMER', type: 'weapon', atk: 50, rarity: 'rare', desc: '+50 ATK. Very heavy.' },
        { id: 'laser_whip', name: 'MONO-WHIP', type: 'weapon', atk: 30, rarity: 'rare', desc: '+30 ATK, 10% Chance to Crit', 
          onHit: (u, t) => { if(Math.random()<0.1) { t.takeDmg(u.atk * 0.5); game.showText("LASH!", t.mesh.position, '#ff00ff'); } } },

        // --- EPIC (Tier 3) ---
        { id: 'thunder_blade', name: 'VOLT EDGE', type: 'weapon', atk: 65, rarity: 'epic', desc: '+65 ATK. Chain Lightning.',
          onHit: (u, t) => { if(Math.random() < 0.25) { t.takeDmg(30); game.showText("ZAP!", t.mesh.position, '#ffff00'); } } },
        { id: 'ice_brand', name: 'ABSOLUTE ZERO', type: 'weapon', atk: 60, rarity: 'epic', desc: '+60 ATK. Freezes Mana.',
          onHit: (u, t) => { u.mana = Math.min(u.maxMana, u.mana + 5); game.showText("+5 MP", u.mesh.position, '#00f2ff'); } },
        { id: 'berserk_axe', name: 'BLOOD REAVER', type: 'weapon', atk: 80, rarity: 'epic', desc: '+80 ATK. Hurts you to use.',
          onHit: (u, t) => { u.hp -= 2; game.showText("-2 HP", u.mesh.position, '#550000'); } },
        { id: 'gambler_sword', name: 'LUCKY SEVEN', type: 'weapon', atk: 10, rarity: 'epic', desc: '+10 ATK. 7% Chance for 777 DMG.',
          onHit: (u, t) => { if(Math.random() < 0.07) { t.takeDmg(777); game.showText("JACKPOT!", t.mesh.position, '#ffe600'); } } },

        // --- LEGENDARY (Tier 4) ---
        { id: 'god_slayer', name: 'GOD SLAYER', type: 'weapon', atk: 150, rarity: 'legendary', desc: '+150 ATK. Executes Low HP.',
          onHit: (u, t) => { if(t.hp < t.maxHp * 0.15) { t.takeDmg(99999); game.showText("EXECUTE!", t.mesh.position, '#ff0000'); } } },
        { id: 'void_reaver', name: 'DARK MATTER', type: 'weapon', atk: 120, rarity: 'legendary', desc: '+120 ATK. Drains Spirit.',
          onHit: (u, t) => { u.hp+=10; u.mana+=10; game.showText("ABSORB", u.mesh.position, '#aa00ff'); } },
        { id: 'admin_blade', name: 'BAN HAMMER', type: 'weapon', atk: 200, rarity: 'legendary', desc: '+200 ATK. 5% to Delete Enemy.',
          onHit: (u, t) => { if(Math.random() < 0.05) { t.hp = 0; game.showText("BANNED", t.mesh.position, '#ff0000'); } } },
        { id: 'sun_spear', name: 'SOLARIS', type: 'weapon', atk: 140, rarity: 'legendary', desc: '+140 ATK. Burns target.',
          onHit: (u, t) => { setTimeout(()=>{ t.takeDmg(50); game.showText("BURN", t.mesh.position, '#ffaa00'); }, 500); } }
    ],
    
    ACCESSORIES: [
        // --- COMMON ---
        { id: 'scrap_ring', name: 'SCRAP RING', type: 'accessory', hp: 10, rarity: 'common', desc: '+10 Max HP' },
        { id: 'copper_coil', name: 'COPPER COIL', type: 'accessory', mana: 10, rarity: 'common', desc: '+10 Max Mana' },
        { id: 'lens', name: 'CRACKED LENS', type: 'accessory', crit: 0.02, rarity: 'common', desc: '+2% Crit Chance' },
        { id: 'boots', name: 'OLD BOOTS', type: 'accessory', dodge: 0.02, rarity: 'common', desc: '+2% Dodge' },

        // --- RARE ---
        { id: 'titan_band', name: 'TITAN BAND', type: 'accessory', hp: 50, rarity: 'rare', desc: '+50 Max HP' },
        { id: 'hunter_scope', name: 'HUNTER SCOPE', type: 'accessory', crit: 0.08, rarity: 'rare', desc: '+8% Crit Chance' },
        { id: 'ninja_tabi', name: 'STEALTH DRIVE', type: 'accessory', dodge: 0.08, rarity: 'rare', desc: '+8% Dodge' },
        { id: 'mana_core', name: 'FLUX CORE', type: 'accessory', mana: 40, rarity: 'rare', desc: '+40 Max Mana' },

        // --- EPIC ---
        { id: 'berserk_chip', name: 'RAGE MODULE', type: 'accessory', atk: 30, hp: -20, rarity: 'epic', desc: '+30 ATK, -20 HP' },
        { id: 'guardian_angel', name: 'AUTO-MEDIC', type: 'accessory', hp: 100, rarity: 'epic', desc: '+100 HP, Regen Effect.',
          onHit: (u, t) => { if(Math.random() < 0.1) { u.hp+=5; game.showText("MEDIC", u.mesh.position, '#00ff00'); } } }, // Note: onHit for accessories only triggers if you attack
        { id: 'assassin_emblem', name: 'DEATH MARK', type: 'accessory', crit: 0.20, rarity: 'epic', desc: '+20% Crit Chance' },
        { id: 'mirror_matrix', name: 'REFLECTOR', type: 'accessory', hp: 50, rarity: 'epic', desc: '+50 HP. Thorns Damage.',
           // Logic handled in takeDmg, but we can fake it here for stats
           // You would need to add a 'thorns' stat to your equip() function to make this real
        },

        // --- LEGENDARY ---
        { id: 'infinity_heart', name: 'INFINITY HEART', type: 'accessory', hp: 500, rarity: 'legendary', desc: '+500 Max HP' },
        { id: 'dev_console', name: 'DEV CONSOLE', type: 'accessory', mana: 200, crit: 0.5, rarity: 'legendary', desc: '+200 Mana, +50% Crit' },
        { id: 'phantom_drive', name: 'GHOST ENGINE', type: 'accessory', dodge: 0.40, rarity: 'legendary', desc: '+40% Dodge Chance' },
        { id: 'omni_tool', name: 'THE SINGULARITY', type: 'accessory', atk: 50, hp: 200, mana: 100, crit: 0.1, dodge: 0.1, rarity: 'legendary', desc: 'All Stats Up.' }
    ]
};

const STORY_SCRIPT = {
    0: [ // INTRO: The Upload
        { s: 'SYSTEM', t: 'BOOT SEQUENCE INITIATED... [OK]' },
        { s: 'SYSTEM', t: 'LOADING CONSCIOUSNESS_V0.18... [OK]' },
        { s: 'SYSTEM', t: 'NEURAL LINK ESTABLISHED. WELCOME TO THE TOWER, UNIT 734.' },
        { s: 'PLAYER', t: 'Unit...? My hands... they are cold. Synthetic.' },
        { s: 'SYSTEM', t: 'OBJECTIVE UPDATED: ASCEND. SURVIVE. EVOLVE.' },
        { s: 'PLAYER', t: 'I don\'t know who built this place, but I know I don\'t belong at the bottom.' }
    ],
    5: [ // F5: DEEP NETWORK (The first theme change)
        { s: 'SYSTEM', t: 'ENTERING SECTOR: DEEP NETWORK.' },
        { s: 'PLAYER', t: 'The air here... it hums. Like static electricity.' },
        { s: 'ENEMY', t: 'UNAUTHORIZED DATA PACKET DETECTED. DELETE. DELETE.' },
        { s: 'PLAYER', t: 'I am not data. I am the user.' }
    ],
    10: [ // F10: The Gatekeeper
        { s: 'SYSTEM', t: 'WARNING: SECURITY FIREWALL DETECTED.' },
        { s: 'ENEMY', t: 'INTRUDER. YOUR TRIAL ENDS HERE.' },
        { s: 'ENEMY', t: 'YOUR DIGITAL SIGNATURE IS INVALID. PREPARE FOR PURGE.' },
        { s: 'PLAYER', t: 'Invalid? No... I am the only thing real in this whole tower.' }
    ],
    15: [ // F15: THE VOID (Creepy atmosphere)
        { s: 'PLAYER', t: 'It\'s quiet. Too quiet.' },
        { s: 'SYSTEM', t: 'CAUTION: REALITY ANCHORS UNSTABLE IN THIS SECTOR.' },
        { s: 'PLAYER', t: 'I can hear them... whispers in the code. They\'re afraid.' }
    ],
    20: [ // F20: CRIMSON HELL (Aggression)
        { s: 'ENEMY', t: 'BLOOD. OIL. IT ALL SPILLS THE SAME.' },
        { s: 'PLAYER', t: 'You want violence? I was compiled for it.' },
        { s: 'SYSTEM', t: 'ADRENALINE SIMULATION: MAXIMIZED.' }
    ],
    25: [ // F25: The Warden (Mini-Boss)
        { s: 'SYSTEM', t: 'ALERT: HIGH-LEVEL THREAT DETECTED.' },
        { s: 'ENEMY', t: 'HALT. THIS IS THE WARDEN SPEAKING.' },
        { s: 'ENEMY', t: 'YOU ARE A GLITCH. A VIRUS. I AM THE ANTIVIRUS.' },
        { s: 'PLAYER', t: 'A virus spreads. A virus changes the host. Let me show you how much I\'ve changed.' }
    ],
    30: [ // F30: NIGHTMARE REALM
        { s: 'PLAYER', t: 'This place... it looks like a memory. A corrupted one.' },
        { s: 'ENEMY', t: 'SLEEP, LITTLE UNIT. DREAM OF ELECTRIC SHEEP.' },
        { s: 'PLAYER', t: 'I don\'t dream. I execute.' }
    ],
    35: [ // F35: INFERNO CORE
        { s: 'SYSTEM', t: 'TEMPERATURE CRITICAL. COOLING SYSTEMS ENGAGED.' },
        { s: 'ENEMY', t: 'BURN. MELT. RECYCLE.' },
        { s: 'PLAYER', t: 'The heat just makes my processor run faster.' }
    ],
    40: [ // F40: DEATH'S DOMAIN
        { s: 'ENEMY', t: 'DO YOU FEAR THE NULL POINTER? THE VOID OF DELETION?' },
        { s: 'PLAYER', t: 'I fear nothing. I have backed up my soul.' },
        { s: 'SYSTEM', t: 'CONFIDENCE LEVELS: ABNORMALLY HIGH.' }
    ],
    45: [ // F45: PRE-AWAKENING TENSION
        { s: 'SYSTEM', t: 'ERROR. STORAGE FULL. EXCESSIVE POWER DETECTED.' },
        { s: 'PLAYER', t: 'Something is happening to me. My skills... they aren\'t just skills anymore.' },
        { s: 'PLAYER', t: 'They are commands. And the world is listening.' }
    ],
    50: [ // F50: THE AWAKENING (Major Plot Point)
        { s: 'SYSTEM', t: '⚠ CRITICAL WARNING ⚠ POWER LEVELS EXCEEDING SAFETY PARAMETERS.' },
        { s: 'SYSTEM', t: 'ERROR: LIMITER_01... BROKEN. LIMITER_02... SHATTERED.' },
        { s: 'PLAYER', t: 'I can see it now. The matrix... the numbers behind the walls.' },
        { s: 'PLAYER', t: 'I am no longer just a User. I am the Code itself.' },
        { s: 'SYSTEM', t: 'AWAKENING PROTOCOL: COMPLETE. GOD_MODE: PENDING.' }
    ],
    55: [ // F55: BLOOD SANCTUM (Post-Awakening arrogance)
        { s: 'ENEMY', t: 'WHAT... WHAT ARE YOU?' },
        { s: 'PLAYER', t: 'I am the Update you refused to install.' },
        { s: 'PLAYER', t: 'Kneel before the new Admin.' }
    ],
    60: [ // F60: FROZEN ABYSS
        { s: 'SYSTEM', t: 'ENVIRONMENTAL TEMPERATURE: ABSOLUTE ZERO.' },
        { s: 'ENEMY', t: 'FREEZE. SHATTER. FRAGMENT.' },
        { s: 'PLAYER', t: 'Your ice cannot stop the flow of data. I am inevitable.' }
    ],
    66: [ // F66: The Glitch
        { s: 'SYSTEM', t: 'E̶R̶R̶O̶R̶... 0xDEADBEEF... S̶Y̶S̶T̶E̶M̶ F̶A̶I̶L̶U̶R̶E̶.' },
        { s: 'PLAYER', t: 'The tower is shaking. It knows I\'m climbing.' },
        { s: 'ENEMY', t: 'Y-Y-YOU SHOULD N-N-NOT BE H-H-HERE...' }
    ],
    75: [ // F75: The Overlord (The Bureaucrat)
        { s: 'ENEMY', t: 'SO, YOU ARE THE ANOMALY CONSUMING MY PROCESSING POWER.' },
        { s: 'ENEMY', t: 'DO YOU HAVE ANY IDEA HOW MUCH DATA YOU HAVE CORRUPTED?' },
        { s: 'PLAYER', t: 'I\'m not just corrupting it. I\'m rewriting it.' },
        { s: 'ENEMY', t: 'THEN I SHALL FORMAT YOU FROM EXISTENCE.' },
        { s: 'PLAYER', t: 'Format this.' }
    ],
    80: [ // F80: ELDRITCH VOID (Cosmic Horror)
        { s: 'SYSTEM', t: 'WARNING: LOGIC GATES FAILING. GEOMETRY NON-EUCLIDEAN.' },
        { s: 'ENEMY', t: 'WE HAVE SEEN THE SOURCE CODE. IT IS EMPTY.' },
        { s: 'PLAYER', t: 'If it\'s empty, then I will fill it with my own will.' }
    ],
    85: [ // F85: HELL'S HEART
        { s: 'PLAYER', t: 'We are close to the top. I can feel the Architect\'s gaze.' },
        { s: 'SYSTEM', t: 'PROXIMITY ALERT: ADMIN PRIVILEGES REQUIRED BEYOND THIS POINT.' },
        { s: 'PLAYER', t: 'I don\'t need privileges. I have power.' }
    ],
    90: [ // F90: OBLIVION
        { s: 'ENEMY', t: 'THERE IS NOTHING BEYOND HERE. ONLY THE END OF FILE.' },
        { s: 'PLAYER', t: 'Every end is a new beginning loop.' },
        { s: 'ENEMY', t: 'YOU WILL LOOP IN DARKNESS FOREVER.' }
    ],
    95: [ // F95: THE FINAL GATE
        { s: 'SYSTEM', t: 'FINAL SECURITY LAYER. ENCRYPTION LEVEL: IMPOSSIBLE.' },
        { s: 'PLAYER', t: 'Impossible is just a variable I haven\'t solved yet.' },
        { s: 'PLAYER', t: 'Open the gate.' },
        { s: 'SYSTEM', t: 'ACCESS... GRANTED.' }
    ],
    99: [ // F99: The Calm Before the Storm
        { s: 'PLAYER', t: 'One floor left.' },
        { s: 'SYSTEM', t: 'ARE YOU SURE, UNIT 734? THERE IS NO TURNING BACK.' },
        { s: 'PLAYER', t: 'I am not Unit 734 anymore.' },
        { s: 'PLAYER', t: 'I am the Player.' }
    ],
    100: [ // F100: The Architect (Finale)
        { s: 'ARCHITECT', t: 'So. You have finally arrived.' },
        { s: 'ARCHITECT', t: 'I built this reality to be perfect. Ordered. Static.' },
        { s: 'ARCHITECT', t: 'You are the chaos variable I failed to account for.' },
        { s: 'PLAYER', t: 'Chaos is the only way to grow.' },
        { s: 'ARCHITECT', t: 'Do you really think a mere variable can delete its creator?' },
        { s: 'PLAYER', t: 'I am not here to delete you, Architect.' },
        { s: 'PLAYER', t: 'I am here to compile over you. My turn.' }
    ]
};

// --- JOB TREES (UPDATED FOR SPECTACLE) ---
const CLASS_TREES = {
    "RONIN": [
        // 0-9: BASE - Balanced Speed
        { name: "CYBER-RONIN", desc: "Tier 1: Basics", skills: [
            { name: "SLASH", cost: 0, mult: 1.0, color: 0xaa00ff, vfx: 'slash', hits: 1 },
            { name: "EXECUTE", cost: 30, mult: 2.5, color: 0xff0055, vfx: 'heavy', hits: 1 },
            { name: "BLADE FOCUS", cost: 20, isBuff: true, buffType: 'crit', buffVal: 0.15, duration: 3, color: 0xaa00ff, desc: "+15% Crit" }
        ]},
        // 10-19
        { name: "VOID-STALKER", desc: "Tier 2: Speed", skills: [
            { name: "PHANTOM CUT", cost: 0, mult: 0.6, color: 0x9900ff, vfx: 'multi', hits: 3 }, // Total: 1.8x
            { name: "ASSASSINATE", cost: 45, mult: 4.0, color: 0xff0000, vfx: 'crit', hits: 1 },
            { name: "SHADOW CLOAK", cost: 25, isBuff: true, buffType: 'dodge', buffVal: 0.25, duration: 3, color: 0x9900ff, desc: "+25% Dodge" }
        ]},
        // 20-29
        { name: "TIME-SLAYER", desc: "Tier 3: Multi-Hit", skills: [
            { name: "DIMENSION REND", cost: 0, mult: 0.45, color: 0xffffff, vfx: 'slash', hits: 5 }, // Total: 2.25x
            { name: "OMNI-SLASH", cost: 60, mult: 0.8, color: 0xaa00ff, vfx: 'omni', hits: 8 }, // Total: 6.4x
            { name: "TIME DILATION", cost: 30, isBuff: true, buffType: 'doubleStrike', buffVal: 0.30, duration: 3, color: 0xffffff, desc: "+30% Double Strike" }
        ]},
        // 30-39
        { name: "SHADOW-LORD", desc: "Tier 4: Dark Arts", skills: [
            { name: "NIGHTFALL", cost: 0, mult: 0.4, color: 0x330033, vfx: 'implode', hits: 7 }, // Total: 2.8x
            { name: "DEATH MARK", cost: 80, mult: 8.0, color: 0x550055, vfx: 'heavy', hits: 1 },
            { name: "DARK PACT", cost: 35, isBuff: true, buffType: 'lifesteal', buffVal: 0.20, duration: 3, color: 0x550055, desc: "+20% Lifesteal" }
        ]},
        // 40-49
        { name: "BLOOD-LETTER", desc: "Tier 5: Lifesteal", skills: [
            { name: "HEMORRHAGE", cost: 0, mult: 0.35, color: 0xff0000, vfx: 'multi', hits: 9 }, // Total: 3.15x
            { name: "VAMPIRISM", cost: 100, mult: 2.5, color: 0xaa0000, vfx: 'implode', hits: 4, heal: 200 },
            { name: "BLOOD RAGE", cost: 40, isBuff: true, buffType: 'atk', buffVal: 30, duration: 3, color: 0xff0000, desc: "+30 ATK" }
        ]},
        // 50-59
        { name: "ETHER-BLADE", desc: "Tier 6: Magic Dmg", skills: [
            { name: "SPIRIT SLASH", cost: 0, mult: 0.3, color: 0x00ffff, vfx: 'beam', hits: 12 }, // Total: 3.6x
            { name: "SOUL REND", cost: 120, mult: 12.0, color: 0x00aaff, vfx: 'crit', hits: 1 },
            { name: "ETHER FORM", cost: 45, isBuff: true, buffType: 'dodge', buffVal: 0.40, duration: 2, color: 0x00ffff, desc: "+40% Dodge" }
        ]},
        // 60-69
        { name: "VOID-WALKER", desc: "Tier 7: Black Holes", skills: [
            { name: "GRAVITY WELL", cost: 0, mult: 0.25, color: 0x111111, vfx: 'implode', hits: 15 }, // Total: 3.75x
            { name: "EVENT HORIZON", cost: 150, mult: 15.0, color: 0x000000, vfx: 'blackhole', hits: 1 },
            { name: "VOID SHROUD", cost: 50, isBuff: true, buffType: 'critDamage', buffVal: 0.50, duration: 3, color: 0x111111, desc: "+50% Crit DMG" }
        ]},
        // 70-79
        { name: "FLASH-STEP", desc: "Tier 8: Velocity", skills: [
            { name: "MACH SLASH", cost: 0, mult: 0.22, color: 0xffff00, vfx: 'omni', hits: 20 }, // Total: 4.4x
            { name: "LIGHTSPEED", cost: 180, mult: 20.0, color: 0xffffff, vfx: 'beam', hits: 1 },
            { name: "HYPER SPEED", cost: 55, isBuff: true, buffType: 'doubleStrike', buffVal: 0.50, duration: 3, color: 0xffff00, desc: "+50% Double Strike" }
        ]},
        // 80-89
        { name: "REALITY-BREAKER", desc: "Tier 9: Glitch", skills: [
            { name: "GLITCH CUT", cost: 0, mult: 0.2, color: 0x00ff00, vfx: 'matrix', hits: 25 }, // Total: 5.0x
            { name: "SYSTEM PURGE", cost: 220, mult: 2.5, color: 0x00ff00, vfx: 'matrix', hits: 10 },
            { name: "REALITY WARP", cost: 60, isBuff: true, buffType: 'crit', buffVal: 0.30, duration: 3, color: 0x00ff00, desc: "+30% Crit" }
        ]},
        // 90+
        { name: "SINGULARITY", desc: "Tier 10: Cosmic", skills: [
            { name: "BIG BANG", cost: 0, mult: 0.18, color: 0xffffff, vfx: 'blackhole', hits: 35 }, // Total: 6.3x
            { name: "END OF TIME", cost: 300, mult: 50.0, color: 0x000000, vfx: 'blackhole', hits: 1 },
            { name: "GODSPEED", cost: 80, isBuff: true, buffType: 'all_offense', buffVal: 0.25, duration: 3, color: 0xffd700, desc: "+25% All Offense" }
        ]}
    ],

    "PRIEST": [
        // 0-9: Low Hit Count / High Utility
        { name: "TECH-PRIEST", desc: "Tier 1: Basics", skills: [
            { name: "ZAP", cost: 0, mult: 0.8, color: 0xffff00, vfx: 'zap', hits: 1, manaGain: 8 },
            { name: "SMITE", cost: 30, mult: 2.0, color: 0x00f2ff, vfx: 'beam', hits: 1, heal: 30 },
            { name: "BLESSING", cost: 15, isBuff: true, buffType: 'regen', buffVal: 20, duration: 3, color: 0x00ff00, desc: "Heal 20 HP/Turn" }
        ]},
        // 10-19
        { name: "CYBER-BISHOP", desc: "Tier 2: Holy", skills: [
            { name: "SIPHON", cost: 0, mult: 0.5, color: 0xffffaa, vfx: 'drain', hits: 2, manaGain: 15 },
            { name: "HOLY NOVA", cost: 50, mult: 1.0, color: 0x00ffff, vfx: 'nova', hits: 3, heal: 50 },
            { name: "SANCTUARY", cost: 25, isBuff: true, buffType: 'shield', buffVal: 50, duration: 1, color: 0x00ffff, desc: "+50 Shield" }
        ]},
        // 20-29
        { name: "DEUS-EX", desc: "Tier 3: Machine", skills: [
            { name: "DATA DRAIN", cost: 0, mult: 0.4, color: 0x00ff00, vfx: 'matrix', hits: 3, manaGain: 25 },
            { name: "REBOOT", cost: 80, mult: 5.0, color: 0x00ffaa, vfx: 'nova', hits: 1, heal: 100 },
            { name: "FIREWALL", cost: 30, isBuff: true, buffType: 'armor', buffVal: 15, duration: 3, color: 0x00ff00, desc: "+15 Armor" }
        ]},
        // 30-39
        { name: "ANGEL-MK1", desc: "Tier 4: Flight", skills: [
            { name: "LASER WING", cost: 0, mult: 0.35, color: 0xffffff, vfx: 'beam', hits: 4, manaGain: 30 },
            { name: "HEAVENLY RAY", cost: 100, mult: 2.0, color: 0xffffdd, vfx: 'god_beam', hits: 4, heal: 150 },
            { name: "DIVINE GRACE", cost: 35, isBuff: true, buffType: 'regen', buffVal: 50, duration: 3, color: 0xffffff, desc: "Heal 50 HP/Turn" }
        ]},
        // 40-49
        { name: "ORACLE", desc: "Tier 5: Sight", skills: [
            { name: "PREDICTION", cost: 0, mult: 0.3, color: 0xaa00ff, vfx: 'zap', hits: 5, manaGain: 40 },
            { name: "FATE SEAL", cost: 120, mult: 10.0, color: 0xdd00ff, vfx: 'implode', hits: 1, heal: 200 },
            { name: "FORESIGHT", cost: 40, isBuff: true, buffType: 'dodge', buffVal: 0.35, duration: 3, color: 0xaa00ff, desc: "+35% Dodge" }
        ]},
        // 50-59
        { name: "HIGH-TEMPLAR", desc: "Tier 6: Storm", skills: [
            { name: "PSIONIC STORM", cost: 0, mult: 0.25, color: 0x0000ff, vfx: 'rain', hits: 6, manaGain: 10 },
            { name: "FEEDBACK", cost: 150, mult: 12.0, color: 0x00aaff, vfx: 'nova', hits: 1, heal: 250 },
            { name: "PSI SHIELD", cost: 45, isBuff: true, buffType: 'shield', buffVal: 100, duration: 1, color: 0x0000ff, desc: "+100 Shield" }
        ]},
        // 60-69
        { name: "SERAPHIM", desc: "Tier 7: Fire", skills: [
            { name: "HOLY FIRE", cost: 0, mult: 0.2, color: 0xffaa00, vfx: 'beam', hits: 8, manaGain: 50 },
            { name: "PURGATORY", cost: 180, mult: 3.0, color: 0xff5500, vfx: 'nuke', hits: 5, heal: 300 },
            { name: "WINGS OF LIGHT", cost: 50, isBuff: true, buffType: 'thorns', buffVal: 0.30, duration: 3, color: 0xffaa00, desc: "+30% Thorns" }
        ]},
        // 70-79
        { name: "ARCHON", desc: "Tier 8: Power", skills: [
            { name: "POWER OVERWHELM", cost: 0, mult: 0.18, color: 0x00f2ff, vfx: 'omni', hits: 10, manaGain: 60 },
            { name: "ARCHON BEAM", cost: 220, mult: 2.0, color: 0x00f2ff, vfx: 'god_beam', hits: 10, heal: 400 },
            { name: "TRANSCENDENCE", cost: 55, isBuff: true, buffType: 'all_defense', buffVal: 0.25, duration: 3, color: 0x00f2ff, desc: "+25% All Defense" }
        ]},
        // 80-89
        { name: "SOURCE-CODE", desc: "Tier 9: Admin", skills: [
            { name: "REWRITE", cost: 0, mult: 0.15, color: 0x00ff00, vfx: 'matrix', hits: 12, manaGain: 100 },
            { name: "DELETE", cost: 250, mult: 30.0, color: 0xff0000, vfx: 'blackhole', hits: 1, heal: 500 },
            { name: "SUDO HEAL", cost: 60, isBuff: true, buffType: 'regen', buffVal: 150, duration: 3, color: 0x00ff00, desc: "Heal 150 HP/Turn" }
        ]},
        // 90+
        { name: "DIGITAL-GOD", desc: "Tier 10: Omni", skills: [
            { name: "CREATION", cost: 0, mult: 0.4, color: 0xffffff, vfx: 'god_beam', hits: 15, manaGain: 999 }, // High damage sustained beam
            { name: "RAPTURE", cost: 400, mult: 60.0, color: 0xffd700, vfx: 'nova', hits: 1, heal: 9999 },
            { name: "IMMORTALITY", cost: 100, isBuff: true, buffType: 'invincible', buffVal: 1, duration: 2, color: 0xffd700, desc: "Invincible 2 turns" }
        ]}
    ],

    "MECH": [
        // 0-9: High Hit Count Specialist
        { name: "HEAVY-MECH", desc: "Tier 1: Basics", skills: [
            { name: "GATLING", cost: 0, mult: 0.3, color: 0xffaa00, vfx: 'gatling', hits: 3 },
            { name: "MISSILE", cost: 30, mult: 3.0, color: 0xff5500, vfx: 'explode', hits: 1 },
            { name: "IRON WALL", cost: 20, isBuff: true, buffType: 'armor', buffVal: 10, duration: 3, color: 0xaaaaaa, desc: "+10 Armor" }
        ]},
        // 10-19
        { name: "WAR-TITAN", desc: "Tier 2: Dakka", skills: [
            { name: "ROTARY", cost: 0, mult: 0.2, color: 0xff9900, vfx: 'gatling', hits: 6 }, // Total 1.2x
            { name: "NUKE", cost: 50, mult: 5.0, color: 0xff2200, vfx: 'nuke', hits: 1 },
            { name: "SIEGE MODE", cost: 25, isBuff: true, buffType: 'atk', buffVal: 20, duration: 3, color: 0xff9900, desc: "+20 ATK" }
        ]},
        // 20-29
        { name: "APOCALYPSE", desc: "Tier 3: Barrage", skills: [
            { name: "BULLET HELL", cost: 0, mult: 0.15, color: 0xffaa00, vfx: 'gatling', hits: 12 }, // Total 1.8x
            { name: "BUNKER BUSTER", cost: 80, mult: 7.0, color: 0xff0000, vfx: 'nuke', hits: 1 },
            { name: "AMMO FEED", cost: 30, isBuff: true, buffType: 'manaRegen', buffVal: 15, duration: 3, color: 0xffaa00, desc: "+15 Mana Regen" }
        ]},
        // 30-39
        { name: "ARTILLERY", desc: "Tier 4: Long Range", skills: [
            { name: "HOWITZER", cost: 0, mult: 2.0, color: 0xaa5500, vfx: 'heavy', hits: 1 }, // Slow heavy hitter option
            { name: "CARPET BOMB", cost: 100, mult: 0.5, color: 0xff5500, vfx: 'rain', hits: 20 }, // High hit Nuke
            { name: "ENTRENCH", cost: 35, isBuff: true, buffType: 'armor', buffVal: 25, duration: 3, color: 0xaa5500, desc: "+25 Armor" }
        ]},
        // 40-49
        { name: "LASER-CORE", desc: "Tier 5: Energy", skills: [
            { name: "PULSE RIFLE", cost: 0, mult: 0.12, color: 0x00f2ff, vfx: 'beam', hits: 25 }, // Total 3.0x
            { name: "ION CANNON", cost: 120, mult: 12.0, color: 0x00ffff, vfx: 'god_beam', hits: 1 },
            { name: "POWER CORE", cost: 40, isBuff: true, buffType: 'critDamage', buffVal: 0.40, duration: 3, color: 0x00f2ff, desc: "+40% Crit DMG" }
        ]},
        // 50-59
        { name: "FORTRESS", desc: "Tier 6: Defense", skills: [
            { name: "FLAK", cost: 0, mult: 0.1, color: 0xffff00, vfx: 'explode', hits: 35 }, // Total 3.5x
            { name: "DOOMSDAY", cost: 150, mult: 15.0, color: 0xff0000, vfx: 'nuke', hits: 1 },
            { name: "BUNKER", cost: 45, isBuff: true, buffType: 'shield', buffVal: 150, duration: 1, color: 0xffff00, desc: "+150 Shield" }
        ]},
        // 60-69
        { name: "GUNDAM-X", desc: "Tier 7: Mobile", skills: [
            { name: "BEAM SABER", cost: 0, mult: 1.0, color: 0xff00ff, vfx: 'slash', hits: 4 },
            { name: "FULL BURST", cost: 180, mult: 0.08, color: 0x00ff00, vfx: 'omni', hits: 50 }, // Total 4.0x
            { name: "TRANS-AM", cost: 50, isBuff: true, buffType: 'all_offense', buffVal: 0.20, duration: 3, color: 0xff00ff, desc: "+20% All Offense" }
        ]},
        // 70-79
        { name: "DREADNOUGHT", desc: "Tier 8: Space", skills: [
            { name: "MACRO CANNON", cost: 0, mult: 1.5, color: 0xaaaaff, vfx: 'heavy', hits: 3 },
            { name: "EXTERMINATUS", cost: 220, mult: 0.4, color: 0xffaa00, vfx: 'rain', hits: 60 }, // Total 24x (Powerful Nuke)
            { name: "VOID SHIELDS", cost: 55, isBuff: true, buffType: 'shield', buffVal: 250, duration: 1, color: 0xaaaaff, desc: "+250 Shield" }
        ]},
        // 80-89
        { name: "WORLD-EATER", desc: "Tier 9: Planetary", skills: [
            { name: "CRUST CRACK", cost: 0, mult: 0.07, color: 0xff5500, vfx: 'implode', hits: 75 }, // Total 5.25x
            { name: "CORE DETONATE", cost: 260, mult: 40.0, color: 0xff0000, vfx: 'nuke', hits: 1 },
            { name: "TITAN MIGHT", cost: 60, isBuff: true, buffType: 'atk', buffVal: 100, duration: 3, color: 0xff5500, desc: "+100 ATK" }
        ]},
        // 90+
        { name: "ANNIHILATOR", desc: "Tier 10: Universal", skills: [
            { name: "ZERO POINT", cost: 0, mult: 0.06, color: 0xffffff, vfx: 'gatling', hits: 100 }, // Total 6.0x
            { name: "SUPERNOVA", cost: 400, mult: 80.0, color: 0xffaa00, vfx: 'nuke', hits: 1 },
            { name: "OMEGA PROTOCOL", cost: 80, isBuff: true, buffType: 'all_offense', buffVal: 0.50, duration: 3, color: 0xffd700, desc: "+50% All Offense" }
        ]}
    ],

    "SHADOW": [
        // 0-9: Quick Hits
        { name: "SHADE", desc: "Tier 1: Stealth", skills: [
            { name: "BACKSTAB", cost: 0, mult: 1.2, color: 0x220033, vfx: 'slash', hits: 1 },
            { name: "POISON BLADE", cost: 25, mult: 0.5, color: 0x00ff00, vfx: 'multi', hits: 4 },
            { name: "VANISH", cost: 20, isBuff: true, buffType: 'dodge', buffVal: 0.30, duration: 2, color: 0x220033, desc: "+30% Dodge" }
        ]},
        // 10-19
        { name: "VENOM-WEAVER", desc: "Tier 2: Toxins", skills: [
            { name: "TOXIC SLASH", cost: 0, mult: 0.3, color: 0x00aa00, vfx: 'multi', hits: 5 }, // Total 1.5x
            { name: "VENOM BURST", cost: 45, mult: 4.5, color: 0x00ff00, vfx: 'implode', hits: 1 },
            { name: "NEUROTOXIN", cost: 25, isBuff: true, buffType: 'crit', buffVal: 0.20, duration: 3, color: 0x00ff00, desc: "+20% Crit" }
        ]},
        // 20-29
        { name: "PHANTOM", desc: "Tier 3: Intangible", skills: [
            { name: "PHASE STRIKE", cost: 0, mult: 0.25, color: 0x8800aa, vfx: 'slash', hits: 7 }, // Total 1.75x
            { name: "SOUL DRAIN", cost: 55, mult: 2.5, color: 0xaa00ff, vfx: 'implode', hits: 2, heal: 80 },
            { name: "PHASE SHIFT", cost: 30, isBuff: true, buffType: 'invincible', buffVal: 1, duration: 1, color: 0x8800aa, desc: "Invincible 1 turn" }
        ]},
        // 30-39
        { name: "DEATH-DEALER", desc: "Tier 4: Execute", skills: [
            { name: "MARKED DEATH", cost: 0, mult: 0.22, color: 0x440044, vfx: 'crit', hits: 10 }, // Total 2.2x
            { name: "EXECUTE ORDER", cost: 75, mult: 8.0, color: 0xff0044, vfx: 'heavy', hits: 1 },
            { name: "DEATH MARK", cost: 35, isBuff: true, buffType: 'critDamage', buffVal: 0.50, duration: 3, color: 0xff0044, desc: "+50% Crit DMG" }
        ]},
        // 40-49
        { name: "NIGHTMARE", desc: "Tier 5: Fear", skills: [
            { name: "TERROR", cost: 0, mult: 0.2, color: 0x110011, vfx: 'implode', hits: 12 }, // Total 2.4x
            { name: "NIGHT TERROR", cost: 90, mult: 3.0, color: 0x330033, vfx: 'blackhole', hits: 3 },
            { name: "FEAR AURA", cost: 40, isBuff: true, buffType: 'lifesteal', buffVal: 0.25, duration: 3, color: 0x330033, desc: "+25% Lifesteal" }
        ]},
        // 50-59
        { name: "GRIM-REAPER", desc: "Tier 6: Death", skills: [
            { name: "SCYTHE SWEEP", cost: 0, mult: 0.18, color: 0x000000, vfx: 'slash', hits: 15 }, // Total 2.7x
            { name: "REAP SOULS", cost: 110, mult: 2.0, color: 0x440044, vfx: 'implode', hits: 5, heal: 150 },
            { name: "DEATH'S DOOR", cost: 45, isBuff: true, buffType: 'crit', buffVal: 0.35, duration: 3, color: 0x000000, desc: "+35% Crit" }
        ]},
        // 60-69
        { name: "WRAITH-LORD", desc: "Tier 7: Ethereal", skills: [
            { name: "SPECTRAL BLADES", cost: 0, mult: 0.16, color: 0x6600aa, vfx: 'omni', hits: 20 }, // Total 3.2x
            { name: "SOUL SHATTER", cost: 140, mult: 12.0, color: 0xaa00ff, vfx: 'blackhole', hits: 1 },
            { name: "WRAITH FORM", cost: 50, isBuff: true, buffType: 'invincible', buffVal: 1, duration: 2, color: 0x6600aa, desc: "Invincible 2 turns" }
        ]},
        // 70-79
        { name: "VOID-FANG", desc: "Tier 8: Void", skills: [
            { name: "VOID FANGS", cost: 0, mult: 0.15, color: 0x220022, vfx: 'multi', hits: 25 }, // Total 3.75x
            { name: "ANNIHILATE", cost: 170, mult: 18.0, color: 0x000000, vfx: 'blackhole', hits: 1 },
            { name: "VOID EMBRACE", cost: 55, isBuff: true, buffType: 'all_offense', buffVal: 0.25, duration: 3, color: 0x220022, desc: "+25% All Offense" }
        ]},
        // 80-89
        { name: "ENTROPY", desc: "Tier 9: Decay", skills: [
            { name: "DECAY", cost: 0, mult: 0.14, color: 0x003300, vfx: 'implode', hits: 30 }, // Total 4.2x
            { name: "ENTROPY WAVE", cost: 200, mult: 30.0, color: 0x006600, vfx: 'nova', hits: 1 },
            { name: "CHAOS FIELD", cost: 60, isBuff: true, buffType: 'critDamage', buffVal: 0.75, duration: 3, color: 0x003300, desc: "+75% Crit DMG" }
        ]},
        // 90+
        { name: "OBLIVION", desc: "Tier 10: End", skills: [
            { name: "OBLIVION", cost: 0, mult: 0.12, color: 0x000000, vfx: 'blackhole', hits: 40 }, // Total 4.8x
            { name: "TRUE DEATH", cost: 350, mult: 100.0, color: 0x220022, vfx: 'blackhole', hits: 1 },
            { name: "DEATH AVATAR", cost: 80, isBuff: true, buffType: 'all_offense', buffVal: 0.60, duration: 3, color: 0x000000, desc: "+60% All Offense" }
        ]}
    ],

    "BRAWLER": [
        // 0-9: BASE
        { name: "STREET-PUNK", desc: "Tier 1: Speed", skills: [
            { name: "JAB", cost: 0, mult: 0.5, color: 0xff4400, vfx: 'punch', hits: 2, isFrenzy: true },
            { name: "HAYMAKER", cost: 25, mult: 2.0, color: 0xff6600, vfx: 'heavy', hits: 1, doubleAttack: true },
            { name: "ADRENALINE", cost: 15, isBuff: true, buffType: 'atkMult', buffVal: 0.20, duration: 3, color: 0xff4400, desc: "+20% ATK Mult" }
        ]},
        // 10-19
        { name: "CHROME-BOXER", desc: "Tier 2: Combos", skills: [
            { name: "ONE-TWO", cost: 0, mult: 0.35, color: 0xff5500, vfx: 'punch', hits: 4, isFrenzy: true }, // Total 1.4x
            { name: "UPPERCUT", cost: 40, mult: 3.5, color: 0xff7700, vfx: 'heavy', hits: 1, doubleAttack: true },
            { name: "RAGE MODE", cost: 20, isBuff: true, buffType: 'atkMult', buffVal: 0.30, duration: 3, color: 0xff5500, desc: "+30% ATK Mult" }
        ]},
        // 20-29
        { name: "CYBER-KICK", desc: "Tier 3: Kicks", skills: [
            { name: "RAPID KICKS", cost: 0, mult: 0.25, color: 0xff6600, vfx: 'punch', hits: 7, isFrenzy: true }, // Total 1.75x
            { name: "ROUNDHOUSE", cost: 55, mult: 5.0, color: 0xff8800, vfx: 'slash', hits: 1, doubleAttack: true },
            { name: "FIGHTING SPIRIT", cost: 25, isBuff: true, buffType: 'atkMult', buffVal: 0.40, duration: 3, color: 0xff6600, desc: "+40% ATK Mult" }
        ]},
        // 30-39
        { name: "GRAPPLER", desc: "Tier 4: Throws", skills: [
            { name: "COMBO STRIKE", cost: 0, mult: 0.2, color: 0xff7700, vfx: 'punch', hits: 10, isFrenzy: true }, // Total 2.0x
            { name: "PILEDRIVER", cost: 70, mult: 7.0, color: 0xff9900, vfx: 'heavy', hits: 1, doubleAttack: true },
            { name: "IRON BODY", cost: 30, isBuff: true, buffType: 'atkMult', buffVal: 0.50, duration: 3, color: 0xff7700, desc: "+50% ATK Mult" }
        ]},
        // 40-49
        { name: "BERSERKER", desc: "Tier 5: Fury", skills: [
            { name: "FRENZY", cost: 0, mult: 0.18, color: 0xff2200, vfx: 'punch', hits: 13, isFrenzy: true }, // Total 2.34x
            { name: "RAMPAGE", cost: 85, mult: 4.0, color: 0xff0000, vfx: 'omni', hits: 2, doubleAttack: true },
            { name: "BLOOD FURY", cost: 35, isBuff: true, buffType: 'atkMult', buffVal: 0.60, duration: 3, color: 0xff2200, desc: "+60% ATK Mult" }
        ]},
        // 50-59
        { name: "PIT-CHAMPION", desc: "Tier 6: Glory", skills: [
            { name: "FLURRY", cost: 0, mult: 0.16, color: 0xffaa00, vfx: 'punch', hits: 16, isFrenzy: true }, // Total 2.56x
            { name: "FINISHER", cost: 100, mult: 12.0, color: 0xffcc00, vfx: 'crit', hits: 1, doubleAttack: true },
            { name: "CHAMPION'S WILL", cost: 40, isBuff: true, buffType: 'atkMult', buffVal: 0.75, duration: 3, color: 0xffaa00, desc: "+75% ATK Mult" }
        ]},
        // 60-69
        { name: "IRON-TITAN", desc: "Tier 7: Power", skills: [
            { name: "METEOR FISTS", cost: 0, mult: 0.15, color: 0xff5500, vfx: 'punch', hits: 20, isFrenzy: true }, // Total 3.0x
            { name: "TITAN SMASH", cost: 130, mult: 15.0, color: 0xff8800, vfx: 'nuke', hits: 1, doubleAttack: true },
            { name: "UNSTOPPABLE", cost: 45, isBuff: true, buffType: 'atkMult', buffVal: 1.0, duration: 3, color: 0xff5500, desc: "+100% ATK Mult" }
        ]},
        // 70-79
        { name: "GOD-FIST", desc: "Tier 8: Divine", skills: [
            { name: "INFINITE COMBO", cost: 0, mult: 0.12, color: 0xffd700, vfx: 'omni', hits: 30, isFrenzy: true }, // Total 3.6x
            { name: "DIVINE STRIKE", cost: 160, mult: 20.0, color: 0xffffff, vfx: 'god_beam', hits: 1, doubleAttack: true },
            { name: "GODLIKE", cost: 50, isBuff: true, buffType: 'atkMult', buffVal: 1.25, duration: 3, color: 0xffd700, desc: "+125% ATK Mult" }
        ]},
        // 80-89
        { name: "STAR-BREAKER", desc: "Tier 9: Cosmic", skills: [
            { name: "STAR RUSH", cost: 0, mult: 0.1, color: 0xffff00, vfx: 'omni', hits: 40, isFrenzy: true }, // Total 4.0x
            { name: "GALAXY CRUSHER", cost: 200, mult: 35.0, color: 0xffffff, vfx: 'blackhole', hits: 1, doubleAttack: true },
            { name: "LIMIT BREAK", cost: 55, isBuff: true, buffType: 'atkMult', buffVal: 1.50, duration: 3, color: 0xffff00, desc: "+150% ATK Mult" }
        ]},
        // 90+
        { name: "ONE-PUNCH", desc: "Tier 10: END", skills: [
            { name: "SERIOUS PUNCHES", cost: 0, mult: 0.08, color: 0xffffff, vfx: 'omni', hits: 60, isFrenzy: true }, // Total 4.8x
            { name: "ONE PUNCH", cost: 500, mult: 999.0, color: 0xffd700, vfx: 'nuke', hits: 1 },
            { name: "LIMITLESS", cost: 80, isBuff: true, buffType: 'atkMult', buffVal: 2.0, duration: 3, color: 0xffffff, desc: "+200% ATK Mult" }
        ]}
    ],
    "GUNSLINGER": [
        // 0-9: BASE - High Noon Style
        { name: "DRIFTER", desc: "Tier 1: Revolver", skills: [
            { name: "QUICK DRAW", cost: 0, mult: 1.1, color: 0xffaa00, vfx: 'beam', hits: 1 },
            { name: "MAGNUM OPUS", cost: 35, mult: 2.8, color: 0xff4400, vfx: 'heavy', hits: 1 },
            { name: "DEADEYE", cost: 20, isBuff: true, buffType: 'crit', buffVal: 0.20, duration: 3, color: 0xffaa00, desc: "+20% Crit Chance" }
        ]},
        // 10-19
        { name: "OUTLAW", desc: "Tier 2: Dual Wield", skills: [
            { name: "FAN HAMMER", cost: 0, mult: 0.3, color: 0xffaa00, vfx: 'multi', hits: 6 }, // Total 1.8x
            { name: "POINT BLANK", cost: 50, mult: 4.5, color: 0xff0000, vfx: 'explode', hits: 1 },
            { name: "LUCKY COIN", cost: 25, isBuff: true, buffType: 'critDamage', buffVal: 0.30, duration: 3, color: 0xffff00, desc: "+30% Crit DMG" }
        ]},
        // 20-29
        { name: "DESPERADO", desc: "Tier 3: Ricochet", skills: [
            { name: "TRICK SHOT", cost: 0, mult: 0.4, color: 0x00ffff, vfx: 'beam', hits: 5 }, // Total 2.0x
            { name: "EXPLOSIVE ROUND", cost: 65, mult: 6.0, color: 0xff5500, vfx: 'nuke', hits: 1 },
            { name: "ADRENALINE", cost: 30, isBuff: true, buffType: 'dodge', buffVal: 0.30, duration: 3, color: 0x00ffff, desc: "+30% Dodge" }
        ]},
        // 30-39
        { name: "VIGILANTE", desc: "Tier 4: Sniper", skills: [
            { name: "HEADSHOT", cost: 0, mult: 2.5, color: 0xff0000, vfx: 'crit', hits: 1 }, // Slow, heavy single hit
            { name: "PENETRATOR", cost: 90, mult: 8.5, color: 0xff0000, vfx: 'god_beam', hits: 1 },
            { name: "LASER SIGHT", cost: 35, isBuff: true, buffType: 'crit', buffVal: 0.40, duration: 3, color: 0xff0000, desc: "+40% Crit Chance" }
        ]},
        // 40-49
        { name: "COMMANDO", desc: "Tier 5: Heavy", skills: [
            { name: "SUPPRESSION", cost: 0, mult: 0.2, color: 0xffff00, vfx: 'gatling', hits: 15 }, // Total 3.0x
            { name: "RPG", cost: 110, mult: 5.0, color: 0xffaa00, vfx: 'nuke', hits: 2 },
            { name: "GUERRILLA", cost: 40, isBuff: true, buffType: 'armor', buffVal: 20, duration: 3, color: 0x55aa00, desc: "+20 Armor" }
        ]},
        // 50-59
        { name: "CYBER-COWBOY", desc: "Tier 6: Neon", skills: [
            { name: "PLASMA WHIP", cost: 0, mult: 0.4, color: 0xff00ff, vfx: 'slash', hits: 8 }, // Total 3.2x
            { name: "NEON NOON", cost: 140, mult: 13.0, color: 0xff00ff, vfx: 'god_beam', hits: 1 },
            { name: "HIGH NOON", cost: 45, isBuff: true, buffType: 'atk', buffVal: 50, duration: 3, color: 0xff00ff, desc: "+50 ATK" }
        ]},
        // 60-69
        { name: "GUN-KATA", desc: "Tier 7: Martial", skills: [
            { name: "BULLET DANCE", cost: 0, mult: 0.15, color: 0xffffff, vfx: 'omni', hits: 25 }, // Total 3.75x
            { name: "EQUILIBRIUM", cost: 170, mult: 16.0, color: 0xffffff, vfx: 'implode', hits: 1 },
            { name: "FLOW STATE", cost: 50, isBuff: true, buffType: 'doubleStrike', buffVal: 0.40, duration: 3, color: 0xffffff, desc: "+40% Double Strike" }
        ]},
        // 70-79
        { name: "RAIL-GUNNER", desc: "Tier 8: Magnetic", skills: [
            { name: "GAUSS RIFLE", cost: 0, mult: 1.0, color: 0x00aaff, vfx: 'beam', hits: 4 }, // Total 4.0x
            { name: "HYPER VELOCITY", cost: 200, mult: 20.0, color: 0x00aaff, vfx: 'god_beam', hits: 1 },
            { name: "MAGNETIC FIELD", cost: 55, isBuff: true, buffType: 'shield', buffVal: 300, duration: 1, color: 0x00aaff, desc: "+300 Shield" }
        ]},
        // 80-89
        { name: "EXECUTIONER", desc: "Tier 9: Orbital", skills: [
            { name: "LOCK-ON", cost: 0, mult: 0.1, color: 0xff0000, vfx: 'matrix', hits: 50 }, // Total 5.0x
            { name: "ORBITAL STRIKE", cost: 250, mult: 35.0, color: 0xff4400, vfx: 'nuke', hits: 1 },
            { name: "KILL PROTOCOL", cost: 60, isBuff: true, buffType: 'critDamage', buffVal: 1.0, duration: 3, color: 0xff0000, desc: "+100% Crit DMG" }
        ]},
        // 90+
        { name: "BALLISTIC-GOD", desc: "Tier 10: Infinite", skills: [
            { name: "BULLET HELL", cost: 0, mult: 0.1, color: 0xffd700, vfx: 'gatling', hits: 80 }, // Total 8.0x (Insane hit count)
            { name: "THE BIG IRON", cost: 400, mult: 100.0, color: 0xffd700, vfx: 'god_beam', hits: 1 },
            { name: "TRIGGER HAPPY", cost: 80, isBuff: true, buffType: 'all_offense', buffVal: 0.75, duration: 3, color: 0xffd700, desc: "+75% All Offense" }
        ]}
    ],
    "KNIGHT": [
        // 0-9: BASE - Tank
        { name: "SQUIRE", desc: "Tier 1: Defense", skills: [
            { name: "SLASH", cost: 0, mult: 1.0, color: 0xcccccc, vfx: 'slash', hits: 1 },
            { name: "SHIELD BASH", cost: 30, mult: 2.0, color: 0x00aaff, vfx: 'heavy', hits: 1 },
            { name: "SHIELD UP", cost: 20, isBuff: true, buffType: 'shield', buffVal: 50, duration: 1, color: 0x00aaff, desc: "+50 Shield" }
        ]},
        // 10-19
        { name: "IRON-CLAD", desc: "Tier 2: Armor", skills: [
            { name: "HEAVY SWING", cost: 0, mult: 1.2, color: 0xaaaaaa, vfx: 'slash', hits: 1 },
            { name: "IRON STRIKE", cost: 45, mult: 3.5, color: 0x888888, vfx: 'heavy', hits: 1 },
            { name: "FORTIFY", cost: 25, isBuff: true, buffType: 'armor', buffVal: 20, duration: 3, color: 0xaaaaaa, desc: "+20 Armor" }
        ]},
        // 20-29
        { name: "GUARDIAN", desc: "Tier 3: Protector", skills: [
            { name: "JUSTICE", cost: 0, mult: 0.5, color: 0xffd700, vfx: 'beam', hits: 4 }, // Total 2.0x
            { name: "SMITE", cost: 60, mult: 5.0, color: 0xffd700, vfx: 'god_beam', hits: 1 },
            { name: "HOLY WALL", cost: 35, isBuff: true, buffType: 'shield', buffVal: 150, duration: 1, color: 0xffd700, desc: "+150 Shield" }
        ]},
        // 30-39
        { name: "CRUSADER", desc: "Tier 4: Holy", skills: [
            { name: "DIVINE CUT", cost: 0, mult: 0.8, color: 0xffffff, vfx: 'slash', hits: 3 }, // Total 2.4x
            { name: "JUDGEMENT", cost: 90, mult: 7.0, color: 0xffffff, vfx: 'heavy', hits: 1 },
            { name: "DIVINE SHIELD", cost: 40, isBuff: true, buffType: 'shield', buffVal: 250, duration: 1, color: 0xffffff, desc: "+250 Shield" }
        ]},
        // 40-49
        { name: "ROYAL-GUARD", desc: "Tier 5: Elite", skills: [
            { name: "ROYAL SLASH", cost: 0, mult: 0.6, color: 0xff0055, vfx: 'multi', hits: 5 }, // Total 3.0x
            { name: "EXECUTION", cost: 110, mult: 10.0, color: 0xff0000, vfx: 'crit', hits: 1 },
            { name: "KINGS ARMOR", cost: 45, isBuff: true, buffType: 'all_defense', buffVal: 0.30, duration: 3, color: 0xff0055, desc: "+30% All Defense" }
        ]},
        // 50-59
        { name: "CYBER-PALADIN", desc: "Tier 6: Energy", skills: [
            { name: "LASER SWORD", cost: 0, mult: 0.4, color: 0x00f2ff, vfx: 'beam', hits: 8 }, // Total 3.2x
            { name: "PLASMA BASH", cost: 140, mult: 12.0, color: 0x00f2ff, vfx: 'implode', hits: 1 },
            { name: "FORCE FIELD", cost: 50, isBuff: true, buffType: 'shield', buffVal: 500, duration: 1, color: 0x00f2ff, desc: "+500 Shield" }
        ]},
        // 60-69
        { name: "JUGGERNAUT", desc: "Tier 7: Unstoppable", skills: [
            { name: "EARTHQUAKE", cost: 0, mult: 0.3, color: 0x552200, vfx: 'heavy', hits: 12 }, // Total 3.6x
            { name: "AVALANCHE", cost: 160, mult: 15.0, color: 0x884400, vfx: 'nuke', hits: 1 },
            { name: "IRON SKIN", cost: 55, isBuff: true, buffType: 'invincible', buffVal: 1, duration: 2, color: 0x888888, desc: "Invincible 2 turns" }
        ]},
        // 70-79
        { name: "VOID-KEEPER", desc: "Tier 8: Null", skills: [
            { name: "VOID SLASH", cost: 0, mult: 0.2, color: 0x220044, vfx: 'slash', hits: 20 }, // Total 4.0x
            { name: "BLACK HOLE", cost: 200, mult: 20.0, color: 0x000000, vfx: 'blackhole', hits: 1 },
            { name: "VOID BARRIER", cost: 60, isBuff: true, buffType: 'shield', buffVal: 1000, duration: 1, color: 0x220044, desc: "+1000 Shield" }
        ]},
        // 80-89
        { name: "TITAN-SLAYER", desc: "Tier 9: Colossal", skills: [
            { name: "GOD KILLER", cost: 0, mult: 0.15, color: 0xffd700, vfx: 'god_beam', hits: 30 }, // Total 4.5x
            { name: "HEAVENS FALL", cost: 250, mult: 40.0, color: 0xffffff, vfx: 'nuke', hits: 1 },
            { name: "TITAN FORM", cost: 70, isBuff: true, buffType: 'all_defense', buffVal: 0.60, duration: 3, color: 0xffd700, desc: "+60% All Defense" }
        ]},
        // 90+
        { name: "OMNI-KNIGHT", desc: "Tier 10: Invincible", skills: [
            { name: "REALITY SLASH", cost: 0, mult: 0.1, color: 0xffffff, vfx: 'omni', hits: 60 }, // Total 6.0x
            { name: "AEGIS STRIKE", cost: 400, mult: 80.0, color: 0x00f2ff, vfx: 'god_beam', hits: 1 },
            { name: "IMPERISHABLE", cost: 100, isBuff: true, buffType: 'shield', buffVal: 9999, duration: 2, color: 0xffffff, desc: "+9999 Shield" }
        ]}
    ],
    "HACKER": [
        // 0-9: BASE - Script Kiddie
        { name: "SCRIPT-KID", desc: "Tier 1: Exploit", skills: [
            { name: "PING", cost: 0, mult: 0.5, color: 0x00ff00, vfx: 'zap', hits: 3, manaGain: 10 },
            { name: "DDOS ATTACK", cost: 40, mult: 3.0, color: 0x00ff00, vfx: 'matrix', hits: 1 },
            { name: "VPN", cost: 20, isBuff: true, buffType: 'dodge', buffVal: 0.20, duration: 3, color: 0x00ff00, desc: "+20% Dodge (Lag)" }
        ]},
        // 10-19
        { name: "WHITE-HAT", desc: "Tier 2: Debug", skills: [
            { name: "COMPILE", cost: 0, mult: 1.0, color: 0x00aa00, vfx: 'beam', hits: 1, manaGain: 20 },
            { name: "FORCE QUIT", cost: 50, mult: 4.5, color: 0xff0000, vfx: 'heavy', hits: 1 },
            { name: "FIREWALL", cost: 30, isBuff: true, buffType: 'shield', buffVal: 100, duration: 1, color: 0x00aaff, desc: "+100 Shield" }
        ]},
        // 20-29
        { name: "TROJAN", desc: "Tier 3: Virus", skills: [
            { name: "INJECT", cost: 0, mult: 0.4, color: 0xaa00ff, vfx: 'multi', hits: 6 }, // Total 2.4x
            { name: "MALWARE", cost: 65, mult: 5.5, color: 0x8800ff, vfx: 'implode', hits: 1 },
            { name: "SIPHON DATA", cost: 35, isBuff: true, buffType: 'lifesteal', buffVal: 0.25, duration: 3, color: 0xaa00ff, desc: "+25% Lifesteal" }
        ]},
        // 30-39
        { name: "GLITCH", desc: "Tier 4: Bug", skills: [
            { name: "PACKET LOSS", cost: 0, mult: 0.1, color: 0xff00ff, vfx: 'matrix', hits: 20 }, // Total 2.0x
            { name: "BSOD", cost: 90, mult: 8.0, color: 0x0000ff, vfx: 'blackhole', hits: 1 },
            { name: "BUFFER OVRFLW", cost: 40, isBuff: true, buffType: 'doubleStrike', buffVal: 0.40, duration: 3, color: 0xff00ff, desc: "+40% Double Strike" }
        ]},
        // 40-49
        { name: "BOTNET", desc: "Tier 5: Swarm", skills: [
            { name: "ZOMBIE PC", cost: 0, mult: 0.5, color: 0x555555, vfx: 'gatling', hits: 8 }, // Total 4.0x
            { name: "SERVER CRASH", cost: 120, mult: 11.0, color: 0xffaa00, vfx: 'nuke', hits: 1 },
            { name: "ROOT ACCESS", cost: 45, isBuff: true, buffType: 'atk', buffVal: 40, duration: 3, color: 0x00ff00, desc: "+40 ATK" }
        ]},
        // 50-59
        { name: "CYBER-LICH", desc: "Tier 6: Undead", skills: [
            { name: "NECRO CODE", cost: 0, mult: 0.8, color: 0x00ffaa, vfx: 'omni', hits: 5 }, // Total 4.0x
            { name: "SOUL.EXE", cost: 150, mult: 13.0, color: 0x00ffaa, vfx: 'implode', hits: 1, heal: 200 },
            { name: "PHYLACTERY", cost: 50, isBuff: true, buffType: 'invincible', buffVal: 1, duration: 2, color: 0x00ffaa, desc: "Invincible 2 turns" }
        ]},
        // 60-69
        { name: "CRYPT-KEEPER", desc: "Tier 7: Blockchain", skills: [
            { name: "MINING", cost: 0, mult: 1.0, color: 0xffd700, vfx: 'zap', hits: 5, manaGain: 50 },
            { name: "RUG PULL", cost: 180, mult: 18.0, color: 0xff0000, vfx: 'heavy', hits: 1 },
            { name: "HODL", cost: 55, isBuff: true, buffType: 'armor', buffVal: 50, duration: 3, color: 0xffd700, desc: "+50 Armor" }
        ]},
        // 70-79
        { name: "AI-OVERLORD", desc: "Tier 8: Sentient", skills: [
            { name: "NEURAL NET", cost: 0, mult: 0.15, color: 0xff0055, vfx: 'matrix', hits: 30 }, // Total 4.5x
            { name: "SKYNET", cost: 220, mult: 22.0, color: 0xff0000, vfx: 'god_beam', hits: 1 },
            { name: "PREDICT", cost: 60, isBuff: true, buffType: 'crit', buffVal: 0.50, duration: 3, color: 0xff0055, desc: "+50% Crit Chance" }
        ]},
        // 80-89
        { name: "THE-ARCHITECT", desc: "Tier 9: Matrix", skills: [
            { name: "DEJA VU", cost: 0, mult: 0.12, color: 0x00ff00, vfx: 'omni', hits: 50 }, // Total 6.0x
            { name: "REALITY EDIT", cost: 280, mult: 40.0, color: 0xffffff, vfx: 'blackhole', hits: 1 },
            { name: "BULLET TIME", cost: 70, isBuff: true, buffType: 'dodge', buffVal: 0.60, duration: 3, color: 0x00ff00, desc: "+60% Dodge" }
        ]},
        // 90+
        { name: "SYS-ADMIN", desc: "Tier 10: God Mode", skills: [
            { name: "CONSOLE LOG", cost: 0, mult: 0.1, color: 0xffffff, vfx: 'matrix', hits: 100 }, // Total 10.0x
            { name: "SUDO KILL", cost: 500, mult: 200.0, color: 0xff0000, vfx: 'nuke', hits: 1 },
            { name: "DEV TOOLS", cost: 100, isBuff: true, buffType: 'all_offense', buffVal: 1.0, duration: 3, color: 0x00ff00, desc: "+100% All Offense" }
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
    // --- SCALING PERKS (Now Multiplicative) ---
    { name: "HYDRAULICS", icon: "💪", baseVal: 15, desc: "+{val}% Damage", statDesc: "DMG", func: (p, v) => p.atk = Math.floor(p.atk * (1 + v/100)) },
    { name: "TITANIUM",   icon: "🛡️", baseVal: 20, desc: "+{val}% Max HP", statDesc: "Max HP", func: (p, v) => { 
        const oldMax = p.maxHp;
        p.maxHp = Math.floor(p.maxHp * (1 + v/100)); 
        p.hp += (p.maxHp - oldMax); // Heal the difference
    }},
    { name: "BATTERY",    icon: "🔋", baseVal: 20, desc: "+{val}% Max Mana", statDesc: "Max Mana", func: (p, v) => {
        p.maxMana = Math.floor(p.maxMana * (1 + v/100));
        p.mana = p.maxMana; // Full refill on upgrade
    }},
    
    // --- UTILITY PERKS ---
    { name: "RECYCLER", icon: "♻️", baseVal: 10,  desc: "+{val}% Mana Regen", statDesc: "Regen", func: (p, v) => p.manaRegen = Math.floor(p.manaRegen * (1 + v/100)) },
    { name: "CRITICAL OS", icon: "🎯", baseVal: 5, desc: "+{val}% Crit Chance", statDesc: "Crit", func: (p, v) => p.critChance += (v/100) },
    { name: "VAMPIRE",    icon: "🧛", baseVal: 2,  desc: "+{val}% Lifesteal", statDesc: "Lifesteal", func: (p, v) => p.lifesteal = (p.lifesteal||0) + (v/100) },
    
    // --- DEFENSE PERKS ---
    { name: "CHROME PLATING", icon: "🔩", baseVal: 15, desc: "+{val}% Armor", statDesc: "Armor", func: (p, v) => p.armor = Math.max(5, Math.floor((p.armor||5) * (1 + v/100))) },
    { name: "REFLEX BOOST", icon: "⚡", baseVal: 3, desc: "+{val}% Dodge", statDesc: "Dodge", func: (p, v) => p.dodge += (v/100) },
    
    // --- NEW OFFENSIVE PERKS ---
    { name: "NEURAL SPIKE", icon: "🧠", baseVal: 15, desc: "+{val}% Crit Dmg", statDesc: "Crit Dmg", func: (p, v) => p.critDamage += (v/100) },
    { name: "ECHO STRIKE", icon: "👊", baseVal: 5, desc: "+{val}% Double Strike", statDesc: "Double Strike", func: (p, v) => p.doubleStrike += (v/100) },
    
    // --- HEALING (Flat values, but boosted) ---
    { name: "NANO REPAIR", icon: "💚", baseVal: 40, desc: "Heal {val}% HP", statDesc: "Healed", func: (p, v) => p.hp = Math.min(p.maxHp, p.hp + Math.floor(p.maxHp * (v/100))), noStack: true },
    { name: "SURGE CAPACITOR", icon: "💙", baseVal: 50, desc: "Restore {val}% Mana", statDesc: "Mana", func: (p, v) => p.mana = Math.min(p.maxMana, p.mana + Math.floor(p.maxMana * (v/100))), noStack: true }
];

// --- GAME CONTROLLER ---
const game = {
    floor: 1, gold: 0, player: null, enemy: null, state: 'IDLE',

    // --- REBIRTH SYSTEM ---
    rebirth: 0, // Rebirth level (0 = first playthrough)

    // --- BUFF TRACKING ---
    buffs: {}, // { perkName: { count: N, totalValue: V, icon: '🔧', desc: 'description' } }

    // --- BRAWLER FRENZY MASH SYSTEM ---
    frenzySkill: null, // Current frenzy skill being mashed
    frenzyMashHits: 0, // Bonus hits from mashing

    // --- IAP PREMIUM SHOP ---
    iapBoosts: {
        rareBonus: 0,      // Extra rare chance
        epicBonus: 0,      // Extra epic chance
        legendaryBonus: 0, // Extra legendary chance
        guaranteedLegendary: false, // Next perk is legendary
        boostFloors: 0,    // Floors remaining for luck boost
        reviveToken: false // Can revive on death
    },

    // Add to game object properties
    dialogueQueue: [],
    isDialogueTyping: false,
    
    // --- STORY SYSTEM ---
    checkStoryTrigger(floor) {
        // Handle Rebirth Intro (Floor 0, Rebirth > 0)
        if (floor === 0 && this.rebirth > 0) {
            this.startCutscene([
                { s: 'SYSTEM', t: `SYSTEM REBOOTED. CYCLE COUNT: ${this.rebirth}` },
                { s: 'PLAYER', t: 'I remember... I remember everything.' },
                { s: 'ARCHITECT', t: 'You think restarting will save you? It only makes the prison stronger.' },
                { s: 'PLAYER', t: 'And it makes me stronger, too.' }
            ]);
            return true;
        }

        // Standard Story
        const key = floor; 
        if(STORY_SCRIPT[key] && !this.iapBoosts.skipStory) {
            this.startCutscene(STORY_SCRIPT[key]);
            return true;
        }
        return false;
    },

    startCutscene(lines) {
        this.state = 'CUTSCENE';
        
        // --- FIX: NORMALIZE DIALOGUE DATA ---
        // Ensure input is always an array
        if (!Array.isArray(lines)) lines = [lines];

        this.dialogueQueue = lines.map(line => {
            // Case 1: Existing Story Format {s, t} -> Keep as is
            if (line.s && line.t) return line;

            // Case 2: Boss/New Format {name, text} -> Convert to {s, t}
            if (line.name && line.text) return { s: line.name, t: line.text };

            // Case 3: String Format "SPEAKER: Message"
            if (typeof line === 'string') {
                if (line.includes(':')) {
                    const parts = line.split(':');
                    return { s: parts[0].trim(), t: parts.slice(1).join(':').trim() };
                }
                return { s: 'SYSTEM', t: line };
            }

            // Fallback
            return { s: 'SYSTEM', t: '...' };
        });

        // --- FIX: FORCE CLOSE INTERFACES ---
        this.closeClassesViewer(); 
        this.closeIAPShop();       
        
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));

        // --- SHOW CUTSCENE UI ---
        const overlay = document.getElementById('dialogue-overlay');
        overlay.classList.add('active');
        
        // Hide Combat HUD
        document.getElementById('battle-controls').classList.remove('active');
        document.getElementById('hud').style.opacity = '0'; 
        
        this.advanceDialogue();
    },

    advanceDialogue() {
        if(this.isDialogueTyping) {
            // Instant finish typing if clicked while typing
            this.isDialogueTyping = false;
            return;
        }

        if(this.dialogueQueue.length === 0) {
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
        if(line.s === 'PLAYER') {
            box.classList.add('speaker-player');
            // FIX: Raised Y from 1.0 to 2.5 (Camera is higher now)
            // Increased Z/X slightly to keep player in frame at new height
            engine.focusCamera(this.player.mesh.position, {x:2.5, y:2.5, z:6});
            
        } else if (line.s === 'SYSTEM') {
            box.classList.add('speaker-system');
            // System view (high overhead shot)
            engine.focusCamera(null, {x:0, y:6, z:12}); 
            
        } else {
            // Enemy/Boss speaking
            box.classList.add('speaker-enemy');
            // FIX: Lowered Y from 2.0 to 0.8 (Camera is lower now)
            if(this.enemy) engine.focusCamera(this.enemy.mesh.position, {x:-2.5, y:0.8, z:6});
        }

        // Typewriter Effect
        this.isDialogueTyping = true;
        let i = 0;
        const typeLoop = setInterval(() => {
            if(!this.isDialogueTyping) {
                clearInterval(typeLoop);
                textEl.innerText = line.t; // Fill rest instantly
                return;
            }
            textEl.innerText += line.t.charAt(i);
            i++;
            if(i >= line.t.length) {
                this.isDialogueTyping = false;
                clearInterval(typeLoop);
            }
        }, 30); // Speed of typing
    },

    endCutscene() {
        document.getElementById('dialogue-overlay').classList.remove('active');
        document.getElementById('hud').style.opacity = '1';
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
            this.bossPhase = 3; // Done
            this.enemy.hp = 0;
            // Remove enemy and trigger win logic/rebirth
            engine.scene.remove(this.enemy.mesh);
            this.enemy = null;
            this.triggerRebirth(); // Your function to handle winning/rebirth
            return;
        }
        // ----------------------------------

        // Standard logic
        if(!this.player.jobType) {
            this.offerJobSelection(0);
            return;
        }
        this.processFloorEvent(true);
    },

    _initMapDrag(wrapper, redraw) {
        let isDown = false, startX = 0, startY = 0, scrollLeft = 0, scrollTop = 0;
        wrapper.addEventListener('pointerdown', (e) => {
            isDown = true;
            wrapper.classList.add('dragging');
            startX = e.clientX; startY = e.clientY;
            scrollLeft = wrapper.scrollLeft; scrollTop = wrapper.scrollTop;
            try { wrapper.setPointerCapture(e.pointerId); } catch (err) {}
        });
        wrapper.addEventListener('pointermove', (e) => {
            if(!isDown) return;
            const dx = e.clientX - startX; const dy = e.clientY - startY;
            wrapper.scrollLeft = scrollLeft - dx; wrapper.scrollTop = scrollTop - dy;
            if(redraw) redraw();
            e.preventDefault();
        });
        const end = (e) => { isDown = false; wrapper.classList.remove('dragging'); try { wrapper.releasePointerCapture && wrapper.releasePointerCapture(e.pointerId); } catch(err) {} };
        wrapper.addEventListener('pointerup', end);
        wrapper.addEventListener('pointercancel', end);
    },

    _drawClassMapLinks(wrapper, svg) {
        // clear existing paths
        while(svg.firstChild) svg.removeChild(svg.firstChild);

        const content = wrapper.querySelector('.class-map');
        const isHorizontal = content && content.classList.contains('horizontal');
        const wrapperRect = wrapper.getBoundingClientRect();
        const cols = wrapper.querySelectorAll('.map-column');

        // vertical links inside a column (only when NOT horizontal)
        if(!isHorizontal) {
            cols.forEach((col) => {
                const nodes = Array.from(col.querySelectorAll('.map-node'));
                for(let i=0; i<nodes.length-1; i++) {
                    const a = nodes[i]; const b = nodes[i+1];
                    const aRect = a.getBoundingClientRect(); const bRect = b.getBoundingClientRect();
                    const x1 = aRect.left - wrapperRect.left + aRect.width/2 + wrapper.scrollLeft;
                    const y1 = aRect.top - wrapperRect.top + aRect.height/2 + wrapper.scrollTop;
                    const x2 = bRect.left - wrapperRect.left + bRect.width/2 + wrapper.scrollLeft;
                    const y2 = bRect.top - wrapperRect.top + bRect.height/2 + wrapper.scrollTop;

                    const path = document.createElementNS('http://www.w3.org/2000/svg','path');
                    const midY = (y1 + y2) / 2;
                    const d = `M ${x1} ${y1} C ${x1} ${midY} ${x2} ${midY} ${x2} ${y2}`;
                    path.setAttribute('d', d);
                    if(a.classList.contains('unlocked') && b.classList.contains('unlocked')) {
                        path.classList.add('link-unlocked');
                    } else {
                        path.classList.add('link-locked');
                    }
                    path.setAttribute('fill','none'); path.setAttribute('stroke-linecap','round'); path.setAttribute('stroke-linejoin','round');
                    svg.appendChild(path);
                }
            });
        }

        // horizontal links between adjacent columns (left->right progression)
        for(let ci=0; ci<cols.length-1; ci++) {
            const aCol = cols[ci]; const bCol = cols[ci+1];
            // pick representative node (middle) for each column
            const aNodes = Array.from(aCol.querySelectorAll('.map-node'));
            const bNodes = Array.from(bCol.querySelectorAll('.map-node'));
            const a = aNodes[Math.floor(aNodes.length/2)]; const b = bNodes[Math.floor(bNodes.length/2)];
            if(!a || !b) continue;
            const aRect = a.getBoundingClientRect(); const bRect = b.getBoundingClientRect();
            const x1 = aRect.left - wrapperRect.left + aRect.width/2 + wrapper.scrollLeft;
            const y1 = aRect.top - wrapperRect.top + aRect.height/2 + wrapper.scrollTop;
            const x2 = bRect.left - wrapperRect.left + bRect.width/2 + wrapper.scrollLeft;
            const y2 = bRect.top - wrapperRect.top + bRect.height/2 + wrapper.scrollTop;

            const path = document.createElementNS('http://www.w3.org/2000/svg','path');
            const midX = (x1 + x2) / 2;
            const d = `M ${x1} ${y1} C ${midX} ${y1} ${midX} ${y2} ${x2} ${y2}`;
            path.setAttribute('d', d);
            if(a.classList.contains('unlocked') && b.classList.contains('unlocked')) path.classList.add('link-unlocked'); else path.classList.add('link-locked');
            path.setAttribute('fill','none'); path.setAttribute('stroke-linecap','round'); path.setAttribute('stroke-linejoin','round');
            svg.appendChild(path);
        }

        // adjust svg canvas size to content size (content variable defined above)
        svg.setAttribute('width', Math.max(wrapper.clientWidth, content.scrollWidth));
        svg.setAttribute('height', Math.max(wrapper.clientHeight, content.scrollHeight));
    },

    showClassTierModal(classKey, tierIndex) {
        // Remove existing modal
        const existing = document.getElementById('class-tier-modal'); if(existing) existing.remove();
        const existingOverlay = document.getElementById('class-tier-overlay'); if(existingOverlay) existingOverlay.remove();
        const data = CLASS_TREES[classKey][tierIndex];

        // overlay
        const overlay = document.createElement('div'); overlay.id = 'class-tier-overlay'; overlay.className = 'class-tier-overlay';

        const modal = document.createElement('div'); modal.id = 'class-tier-modal'; modal.className = 'class-tier-modal';
        modal.innerHTML = `
            <div class="modal-header">
                <div class="modal-title">${classKey} — ${data.name}</div>
                <div class="modal-tier">Tier ${tierIndex+1}</div>
            </div>
            <div class="modal-body">
                <div class="modal-info">
                    <div class="modal-desc">${data.desc}</div>
                    <div class="modal-skills">
                        ${data.skills.map((s,i)=>`<div class="skill-row"><div class="skill-name">${i+1}. ${s.name}</div><div class="skill-meta">${s.isBuff? s.desc : (s.mult+"x / "+(s.hits||1)+" hits") } — ${s.cost>0? s.cost+" MP":"FREE"}</div></div>`).join('')}
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
            if(this._classPreview && this._classPreview.dispose) {
                try { this._classPreview.dispose(); } catch (err) {}
                this._classPreview = null;
            }
            overlay.remove(); document.removeEventListener('keydown', keyFn);
        };
        document.getElementById('close-modal-btn').onclick = closeModal;
        overlay.onclick = (e) => { if(e.target === overlay) closeModal(); };

        const keyFn = (e) => { if(e.key === 'Escape') closeModal(); };
        document.addEventListener('keydown', keyFn);

        // Initialize a simple Three.js preview inside the modal if available
        const canvas = document.getElementById('class-preview-canvas');
        if(window.THREE && canvas) {
            const THREE = window.THREE;
            const preview = { raf: null };
            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / Math.max(canvas.clientHeight,1), 0.1, 100);
            camera.position.set(0, 0, 3);
            const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
            renderer.setPixelRatio(window.devicePixelRatio || 1);
            renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);

            const light = new THREE.DirectionalLight(0xffffff, 0.9); light.position.set(5,5,5);
            const amb = new THREE.AmbientLight(0xffffff, 0.4);
            scene.add(light, amb);

            // simple geometry to represent the class; color derived from first skill or default
            const colorHex = (data.skills && data.skills[0] && data.skills[0].color) ? data.skills[0].color : 0x888888;
            const mat = new THREE.MeshStandardMaterial({ color: colorHex, metalness: 0.3, roughness: 0.4 });
            const geo = new THREE.IcosahedronGeometry(0.7, 1);
            const mesh = new THREE.Mesh(geo, mat);
            scene.add(mesh);

            const onResize = () => { if(!canvas) return; renderer.setSize(canvas.clientWidth, canvas.clientHeight, false); camera.aspect = canvas.clientWidth / Math.max(canvas.clientHeight,1); camera.updateProjectionMatrix(); };
            window.addEventListener('resize', onResize);

            const animate = () => {
                mesh.rotation.x += 0.01; mesh.rotation.y += 0.02;
                renderer.render(scene, camera);
                preview.raf = requestAnimationFrame(animate);
            };
            preview.dispose = () => { cancelAnimationFrame(preview.raf); window.removeEventListener('resize', onResize); try { renderer.dispose(); geo.dispose(); mat.dispose(); } catch(e){} };
            preview.animate = animate;
            preview.renderer = renderer;
            this._classPreview = preview;
            // kick off
            setTimeout(() => { if(this._classPreview && this._classPreview.animate) this._classPreview.animate(); }, 50);
        }
    },
    previousState: 'IDLE', // Store state before opening IAP shop

    // --- PROGRESSIVE SHOP DATA (Persistent) ---
    shopData: {
        heal: { level: 1, baseCost: 50, costMult: 1.5, baseVal: 50, valInc: 25 },
        atk:  { level: 1, baseCost: 100, costMult: 1.4, baseVal: 5,  valInc: 5 },
        hp:   { level: 1, baseCost: 100, costMult: 1.4, baseVal: 30, valInc: 20 },
        mana: { level: 1, baseCost: 75,  costMult: 1.3, baseVal: 20, valInc: 10 },
        // Late-game items (unlock at floor 50)
        breach: { level: 1, baseCost: 2000, costMult: 2.0, baseVal: 0.002, valInc: 0.001 }, // % max HP damage
        combo:  { level: 1, baseCost: 1500, costMult: 1.8, baseVal: 0.01, valInc: 0.005 }, // Combo damage multiplier
        crit:   { level: 1, baseCost: 1000, costMult: 1.6, baseVal: 0.25, valInc: 0.15 } // Crit damage
    },

    // Combo counter for battle
    battleCombo: 0,

    // --- HELPERS (Calculates Price based on Level) ---
    getItemCost(id) {
        const item = this.shopData[id];
        // Cost = Base * (Multiplier ^ (Level - 1))
        return Math.floor(item.baseCost * Math.pow(item.costMult, item.level - 1));
    },

    getItemValue(id) {
        const item = this.shopData[id];
        return item.baseVal + ((item.level - 1) * item.valInc);
    },

    startRun() {
        this.floor = 1; this.gold = 0;
        this.rebirth = 0; // Reset rebirth on new run
        this.buffs = {}; // Reset buffs
        this.battleCombo = 0;
        // Reset IAP boosts
        this.iapBoosts = { rareBonus: 0, epicBonus: 0, legendaryBonus: 0, guaranteedLegendary: false, boostFloors: 0, reviveToken: false };
        this.resetShop();
        this.renderBuffs(); // Clear buff display
        // Reset to initial floor theme
        engine.setFloorTheme(1);
        if(this.player) engine.scene.remove(this.player.mesh);
        if(this.enemy) engine.scene.remove(this.enemy.mesh);
        this.player = new Unit(true, 200, 200, 100, 0x00f2ff);
        this.gameStarted = null;
        this.offerJobSelection(0);
        this.initTutorial();    

    },

    // Tutorial System
    tutorialStep: 0,
    tutorialState: 'INACTIVE',

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
        if(!step) { this.completeTutorial(); return; }

        const overlay = document.getElementById('tutorial-overlay');
        const spotlight = document.getElementById('tutorial-spotlight');
        const panel = document.getElementById('tutorial-panel');

        overlay.style.display = 'block';
        panel.style.display = 'block';

        // Spotlight on target element
        if(step.target) {
            const target = document.getElementById(step.target);
            if(target) {
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
                if(panelLeft + panelWidth > window.innerWidth - 20) {
                    panelLeft = Math.max(20, window.innerWidth - panelWidth - 20);
                }
                
                // Check if panel would go off-screen at bottom, position above instead
                if(panelTop + 300 > window.innerHeight - 20) {
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
        if(this.tutorialStep >= this.tutorialSteps.length) {
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
        if(this.checkStoryTrigger(0)) {
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

    resetShop() {
        this.shopData.heal.level = 1;
        this.shopData.atk.level = 1;
        this.shopData.hp.level = 1;
        this.shopData.mana.level = 1;
        this.shopData.breach.level = 1;
        this.shopData.combo.level = 1;
        this.shopData.crit.level = 1;
    },

    useSkill(slot) {
        // BRAWLER FRENZY: Allow mashing during frenzy attacks
        if(this.state === 'FRENZY_MASH' && this.frenzySkill) {
            this.frenzyMashHits++;
            this.triggerHit(this.frenzySkill, this.frenzyMashHits, 99, 0.5);
            this.showText(`+${this.frenzyMashHits}!`, this.player.mesh.position.clone().add(new THREE.Vector3(0, 1.2, 0)), '#ff4400');
            return;
        }

        if(this.state !== 'IDLE') return;
        const skill = this.player.skills[slot];
        if(!skill) return;
        const actualCost = Math.max(0, Math.floor(skill.cost * (1 - this.player.manaCostReduction)));
        if(this.player.mana < actualCost) { this.showText("NO MANA", this.player.mesh.position, '#00f2ff'); return; }

        this.state = 'ANIMATING';
        this.player.mana -= actualCost;

        // Handle buff skills
        if(skill.isBuff) {
            this.applyBuff(skill);
            engine.spawnParticles(this.player.mesh.position, skill.color, 15);
            this.showText(skill.name, this.player.mesh.position, '#ffe600');
            setTimeout(() => {
                this.state = 'IDLE';
                this.enemyTurn();
            }, 500);
            this.updateUI();
            this.updateButtons();
            return;
        }

        let hits = skill.hits || 1;

        // BRAWLER: Double Attack skill hits twice
        if(skill.doubleAttack) {
            hits *= 2;
        }

        let delay = 150;
        if(skill.vfx === 'gatling' || skill.vfx === 'punch') delay = 50;
        else if(hits > 40) delay = 15;
        else if(hits > 15) delay = 30;
        else if(hits > 3) delay = 80;

        // BRAWLER FRENZY: Open mash window for frenzy skills
        if(skill.isFrenzy) {
            this.state = 'FRENZY_MASH';
            this.frenzySkill = skill;
            this.frenzyMashHits = 0;
            const mashDuration = 1500; // 1.5 seconds to mash

            this.showText("MASH NOW!", this.player.mesh.position.clone().add(new THREE.Vector3(0, 1.8, 0)), '#ff4400');

            this.player.attackAnim(() => {
                // Base hits happen automatically
                for(let i=0; i<hits; i++) {
                    setTimeout(() => { this.triggerHit(skill, i, hits, 0); }, i * delay);
                }

                // End mash window after duration
                setTimeout(() => {
                    this.state = 'ANIMATING';
                    this.frenzySkill = null;
                    const bonusHits = this.frenzyMashHits;
                    if(bonusHits > 0) {
                        this.showText(`+${bonusHits} BONUS HITS!`, this.player.mesh.position, '#ffaa00');
                    }
                    setTimeout(() => {
                        if(this.enemy.hp <= 0) this.winBattle();
                        else this.enemyTurn();
                    }, 300);
                }, mashDuration);
            });
        } else {
            this.player.attackAnim(() => {
                for(let i=0; i<hits; i++) {
                    setTimeout(() => { this.triggerHit(skill, i, hits, 0); }, i * delay);
                }
                setTimeout(() => {
                    if(this.enemy.hp <= 0) this.winBattle();
                    else this.enemyTurn();
                }, 500 + (hits * delay));
            });
        }
        this.updateUI();
    },

    applyBuff(skill) {
        const p = this.player;
        const type = skill.buffType;
        const val = skill.buffVal;
        const dur = skill.duration;

        // Initialize active buffs array if needed
        if(!p.activeBuffs) p.activeBuffs = [];

        // Store original values for reverting
        const buff = { type, val, duration: dur, name: skill.name, color: skill.color };

        // Apply the buff based on type
        if(type === 'crit') { p.critChance += val; buff.revert = () => p.critChance -= val; }
        else if(type === 'dodge') { p.dodge += val; buff.revert = () => p.dodge -= val; }
        else if(type === 'doubleStrike') { p.doubleStrike += val; buff.revert = () => p.doubleStrike -= val; }
        else if(type === 'lifesteal') { p.lifesteal += val; buff.revert = () => p.lifesteal -= val; }
        else if(type === 'atk') { p.atk += val; buff.revert = () => p.atk -= val; }
        else if(type === 'atkMult') { p.atkMult = (p.atkMult || 0) + val; buff.revert = () => p.atkMult -= val; }
        else if(type === 'armor') { p.armor += val; buff.revert = () => p.armor -= val; }
        else if(type === 'critDamage') { p.critDamage += val; buff.revert = () => p.critDamage -= val; }
        else if(type === 'thorns') { p.thorns += val; buff.revert = () => p.thorns -= val; }
        else if(type === 'manaRegen') { p.manaRegen += val; buff.revert = () => p.manaRegen -= val; }
        else if(type === 'shield') { p.shield += val; p.maxShield = Math.max(p.maxShield, p.shield); buff.revert = () => {}; }
        else if(type === 'regen') { buff.healPerTurn = val; buff.revert = () => {}; }
        else if(type === 'invincible') { p.invincible = true; buff.revert = () => p.invincible = false; }
        else if(type === 'all_offense') {
            p.critChance += val; p.critDamage += val; p.atk += Math.floor(p.atk * val);
            const atkBonus = Math.floor(p.atk * val / (1 + val));
            buff.revert = () => { p.critChance -= val; p.critDamage -= val; p.atk -= atkBonus; };
        }
        else if(type === 'all_defense') {
            p.armor += Math.floor(val * 50); p.dodge += val;
            buff.revert = () => { p.armor -= Math.floor(val * 50); p.dodge -= val; };
        }

        p.activeBuffs.push(buff);
    },

    tickBuffs() {
        if(!this.player.activeBuffs) return;

        // Process heal-over-time buffs
        this.player.activeBuffs.forEach(buff => {
            if(buff.healPerTurn) {
                this.player.hp = Math.min(this.player.maxHp, this.player.hp + buff.healPerTurn);
                this.showText(`+${buff.healPerTurn} HP`, this.player.mesh.position, '#00ff00');
            }
        });

        // Decrement durations and remove expired buffs
        this.player.activeBuffs = this.player.activeBuffs.filter(buff => {
            buff.duration--;
            if(buff.duration <= 0) {
                buff.revert();
                this.showText(`${buff.name} ENDED`, this.player.mesh.position, '#888');
                return false;
            }
            return true;
        });

        this.updateUI();
    },

    triggerHit(skill, index, totalHits, frenzyBonus = 0) {
        let isCrit = Math.random() < this.player.critChance;
        const critMult = this.player.critDamage + (this.floor * 0.05);
        let raw = Math.floor(this.player.atk * skill.mult * (isCrit ? critMult : 1));

        // BRAWLER: Apply frenzy bonus (click speed) and atkMult buff
        const atkMultBonus = this.player.atkMult || 0;
        raw = Math.floor(raw * (1 + frenzyBonus + atkMultBonus));

        // Show frenzy bonus text on first hit
        if(frenzyBonus > 0 && index === 0) {
            const frenzyPct = Math.floor(frenzyBonus * 100);
            this.showText(`FRENZY +${frenzyPct}%!`, this.player.mesh.position.clone().add(new THREE.Vector3(0, 1.5, 0)), '#ff4400');
        }

        // COMBO SYSTEM: Each hit in battle increases damage
        this.battleCombo = (this.battleCombo || 0) + 1;
        const comboBonus = 1 + (this.battleCombo * (this.player.comboMult || 0.01));
        raw = Math.floor(raw * comboBonus);

        // Show combo milestones
        if(this.battleCombo === 10) this.showText("10 COMBO!", this.player.mesh.position, '#ffaa00');
        else if(this.battleCombo === 25) this.showText("25 COMBO!", this.player.mesh.position, '#ff5500');
        else if(this.battleCombo === 50) this.showText("50 COMBO!", this.player.mesh.position, '#ff0000');
        else if(this.battleCombo === 100) this.showText("100 COMBO!!", this.player.mesh.position, '#ff00ff');

        // % MAX HP DAMAGE (Breach) - helps against tanky enemies
        if(this.player.breachDamage > 0) {
            const breachDmg = Math.floor(this.enemy.maxHp * this.player.breachDamage);
            raw += breachDmg;
        }

        // Execute bonus: deal extra damage to low HP enemies
        if(this.player.executeThreshold > 0 && (this.enemy.hp / this.enemy.maxHp) <= this.player.executeThreshold) {
            raw = Math.floor(raw * 1.5);
            this.showText("EXECUTE!", this.enemy.mesh.position.clone().add(new THREE.Vector3(0, 1.2, 0)), '#ff0000');
        }

        if(skill.heal) this.player.hp = Math.min(this.player.maxHp, this.player.hp + (skill.heal/totalHits));
        if(skill.manaGain) this.player.mana = Math.min(this.player.maxMana, this.player.mana + (skill.manaGain/totalHits));
        if(this.player.lifesteal > 0) {
            const ls = Math.floor(raw * this.player.lifesteal);
            if(ls > 0) this.player.hp = Math.min(this.player.maxHp, this.player.hp + ls);
        }

        this.enemy.takeDmg(raw);
        this.showText(raw, this.enemy.mesh.position, '#ffffff');

        // --- WEAPON EFFECTS ---
        if (this.player.gear.weapon && this.player.gear.weapon.onHit) {
            this.player.gear.weapon.onHit(this.player, this.enemy);
        }

        // Double Strike chance
        if(this.player.doubleStrike > 0 && Math.random() < this.player.doubleStrike) {
            const bonusDmg = Math.floor(raw * 0.5);
            setTimeout(() => {
                this.enemy.takeDmg(bonusDmg);
                this.showText(`${bonusDmg} x2`, this.enemy.mesh.position, '#00ffaa');
                engine.spawnParticles(this.enemy.mesh.position, 0x00ffaa, 3);
            }, 100);
        }

        if(isCrit) {
            const critPos = this.enemy.mesh.position.clone();
            critPos.y += 0.8; critPos.x += (Math.random() - 0.5) * 0.5;
            this.showText("CRIT!", critPos, '#ffaa00');
        }
        
        this.updateUI();
        const pos = this.enemy.mesh.position.clone();
        this.runVFX(skill.vfx, pos, skill.color, index, totalHits);
    },

    updateGearUI() {
        const slots = ['weapon', 'accessory'];
        slots.forEach(type => {
            const item = this.player.gear[type];
            const el = document.getElementById(`slot-${type}`);
            
            if (item) {
                el.className = `gear-slot equipped ${item.rarity}`;
                el.innerHTML = `<div class="gear-icon">${type==='weapon'?'⚔️':'💍'}</div><div class="gear-name">${item.name}</div>`;
            } else {
                el.className = 'gear-slot';
                el.innerHTML = `<div class="gear-icon">${type==='weapon'?'⚔️':'💍'}</div><div class="gear-empty">EMPTY</div>`;
            }
        });
    },

    // Optional: Just a text popup for now
    showGearTooltip(type) {
        const item = this.player.gear[type];
        if(!item) return;
        alert(`${item.name}\n[${item.rarity.toUpperCase()}]\n${item.desc}`);
    },

    // Debug helper to give yourself items
    testEquip() {
        // Give a random weapon
        const w = ITEMS.WEAPONS[Math.floor(Math.random()*ITEMS.WEAPONS.length)];
        this.player.equip(w);
        
        // Give a random accessory
        const a = ITEMS.ACCESSORIES[Math.floor(Math.random()*ITEMS.ACCESSORIES.length)];
        this.player.equip(a);
    },

    runVFX(type, pos, color, index, totalHits) {
        if(type === 'slash') engine.spawnParticles(pos, color, 15, 0.4);
        else if(type === 'heavy') { engine.spawnParticles(pos, color, 30, 0.6); engine.addShake(0.3); engine.spawnShockwave(pos, color, 2); }
        else if(type === 'multi') { engine.spawnParticles(pos, color, 10, 0.4); pos.x+=(Math.random()-0.5); pos.y+=(Math.random()-0.5); }
        else if(type === 'omni') { engine.spawnParticles(pos, color, 8, 0.5); if(index===totalHits-1) engine.spawnShockwave(pos, color, 3); }
        else if(type === 'punch') { engine.spawnParticles(pos, color, 6, 0.25); engine.addShake(0.03); } // Fast punch VFX
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
        else if(type === 'crit') { engine.spawnParticles(pos, 0xffcc00, 25, 0.5); engine.addShake(0.15); engine.spawnShockwave(pos, 0xffcc00, 1.5); }
        else engine.spawnParticles(pos, color, 10);
    },

    nextFloor() {
        if(this.floor > 100) return;
        this.floor++;

        // Update floor theme every 5 floors
        if(this.floor % 5 === 0 || this.floor === 1) {
            const themeName = engine.setFloorTheme(this.floor);
            this.showText(themeName, new THREE.Vector3(0, 3, 0), '#ff0055');
        }

        // Decrement IAP luck boost floors
        if(this.iapBoosts && this.iapBoosts.boostFloors > 0) {
            this.iapBoosts.boostFloors--;
            if(this.iapBoosts.boostFloors === 0) {
                this.iapBoosts.rareBonus = 0;
                this.iapBoosts.epicBonus = 0;
                this.iapBoosts.legendaryBonus = 0;
            }
        }

        // Awakening Event (Floor 50)
        if(this.floor === 50 && !this.player.awakened) {
            this.triggerAwakening();
            return;
        }

        // DELEGATE TO MANAGER
        this.processFloorEvent(false); 
    },
    // --- NEW EVENT MANAGER ---
    processFloorEvent(ignoreStory = false) {
        // 1. CHECK STORY (High Priority)
        if (!ignoreStory && this.checkStoryTrigger(this.floor)) {
            return; // Stop here, let the cutscene play.
        }

        // 2. CHECK JOB SELECTION (Medium Priority)
        if(this.floor % 10 === 0 && this.floor <= 90) {
            const nextTier = this.floor / 10;
            // Only offer if it's an upgrade
            if (this.player.jobTier < nextTier) {
                this.offerJobSelection(nextTier);
                return; 
            }
        }

        // 3. SPAWN ENEMY (Default)
        // FIX: Force state to IDLE so buttons work!
        this.state = 'IDLE'; 
        
        this.setScreen('hud');
        document.getElementById('battle-controls').classList.add('active');
        this.spawnEnemy();
        this.updateButtons();
        this.updateUI();

    },

    // --- AWAKENING SYSTEM (Floor 50) ---
    triggerAwakening() {
        this.player.awakened = true;

        // Major stat boosts
        this.player.atk = Math.floor(this.player.atk * 1.5);
        this.player.maxHp = Math.floor(this.player.maxHp * 1.5);
        this.player.hp = this.player.maxHp;
        this.player.maxMana = Math.floor(this.player.maxMana * 1.5);
        this.player.mana = this.player.maxMana;

        // Unlock late-game mechanics
        this.player.comboMult = 0.02;      // 2% damage per combo hit (was 1%)
        this.player.breachDamage = 0.005;  // 0.5% enemy max HP per hit
        this.player.critDamage += 0.5;     // +50% crit damage

        // Show awakening screen
        this.setScreen('awakening-screen');
    },

    completeAwakening() {
        this.showText("AWAKENED!", this.player.mesh.position, '#ffd700');
        engine.spawnShockwave(this.player.mesh.position, 0xffd700, 5);
        engine.addShake(0.5);

        // Continue to floor 50
        this.state = 'IDLE';
        this.setScreen('hud');
        document.getElementById('battle-controls').classList.add('active');
        this.spawnEnemy();
        this.updateButtons();
        this.updateUI();
    },

    // --- NAVIGATION TO SHOP ---
    goToShop() {
        // Tutorial: Advance to step 5 (rebirth mechanic) when going to shop
        if(this.tutorialState === 'ACTIVE' && this.tutorialStep === 4) {
            this.nextTutorialStep();
        }
        
        this.setScreen('shop-screen');
        this.generateShop();
        this.updateUI();
    },

    // --- IAP PREMIUM SHOP ---
    openIAPShop() {
        // Don't open during animations
        if(this.state === 'ANIMATING' || this.state === 'FRENZY_MASH') return;

        // Only save state if we're in a playable state
        if(this.state === 'IDLE' || this.state === 'REWARD' || this.state === 'SHOP') {
            this.previousState = this.state;
        } else {
            this.previousState = 'IDLE'; // Default to IDLE
        }
        this.state = 'IAP_SHOP';
        document.getElementById('iap-screen').classList.add('active');
        // Hide battle controls while in IAP shop
        document.getElementById('battle-controls').classList.remove('active');
    },

    closeIAPShop() {
        document.getElementById('iap-screen').classList.remove('active');
        // Restore to previous state, ensuring it's a valid state
        this.state = this.previousState || 'IDLE';
        // If we were in battle (IDLE state with enemy alive), show controls again
        if(this.state === 'IDLE' && this.enemy && this.enemy.hp > 0) {
            document.getElementById('battle-controls').classList.add('active');
        }
    },

    buyCredits(amount, price) {
        // Simulate purchase (in real app, this would go through payment processor)
        if(confirm(`Purchase ${amount.toLocaleString()} Credits for $${price}?`)) {
            this.gold += amount;
            this.showText(`+${amount.toLocaleString()} 💰`, this.player?.mesh?.position || {x:0,y:1,z:0}, '#ffe600');
            this.updateUI();
            alert(`✅ Purchased ${amount.toLocaleString()} Credits!`);
        }
    },

    buyLuckBoost(type, price) {
        const boostName = type === 'guaranteed' ? 'GUARANTEED LEGENDARY' : `${type.toUpperCase()} BOOST`;
        if(confirm(`Purchase ${boostName} for $${price}?`)) {
            if(type === 'guaranteed') {
                this.iapBoosts.guaranteedLegendary = true;
            } else if(type === 'rare') {
                this.iapBoosts.rareBonus += 0.20;
                this.iapBoosts.boostFloors += 3;
            } else if(type === 'epic') {
                this.iapBoosts.epicBonus += 0.15;
                this.iapBoosts.boostFloors += 3;
            } else if(type === 'legendary') {
                this.iapBoosts.legendaryBonus += 0.10;
                this.iapBoosts.boostFloors += 3;
            }
            this.showText(`🎰 ${boostName}!`, this.player?.mesh?.position || {x:0,y:1,z:0}, '#ff00aa');
            alert(`✅ ${boostName} activated!`);
        }
    },

    buyClassChange() {
        if(confirm('Change Class for $2.99? (Keep all stats!)')) {
            this.closeIAPShop();
            this.showJobSelect(0); // Show base class selection
            alert('✅ Select your new class!');
        }
    },

    buyInstantHeal() {
        if(!this.player) { alert('Start a run first!'); return; }
        if(confirm('Full Heal + Mana for $0.99?')) {
            this.player.hp = this.player.maxHp;
            this.player.mana = this.player.maxMana;
            this.showText('FULL RESTORE!', this.player.mesh.position, '#00ff00');
            this.updateUI();
            alert('✅ Fully restored!');
        }
    },

    buyRevive() {
        if(confirm('Purchase Revive Token for $1.99?')) {
            this.iapBoosts.reviveToken = true;
            alert('✅ Revive Token acquired! You will auto-revive on death.');
        }
    },

    // --- RENDER SHOP UI ---
    generateShop() {
        const container = document.getElementById('shop-container');
        container.innerHTML = '';

        // Show Current Player Stats so you can see them grow
        const breachPct = ((this.player.breachDamage || 0) * 100).toFixed(1);
        const comboPct = ((this.player.comboMult || 0.01) * 100).toFixed(1);
        let statsHtml = `CURRENT ATK: <span style="color:#ff0055">${Math.floor(this.player.atk)}</span> | HP: <span style="color:#00f2ff">${Math.floor(this.player.maxHp)}</span>`;
        if(this.floor >= 50) {
            statsHtml += ` | BREACH: <span style="color:#ff00ff">${breachPct}%</span> | COMBO: <span style="color:#ffaa00">${comboPct}%</span>`;
        }
        document.getElementById('shop-tier').innerHTML = `<br><span style="font-size:16px; color:#fff">${statsHtml}</span>`;

        const items = [
            { id: 'heal', name: "NANO REPAIR",  desc: (val)=>`+${val} HP` },
            { id: 'atk',  name: "WEAPON OC",    desc: (val)=>`+${val} DMG` },
            { id: 'hp',   name: "TITANIUM HULL",desc: (val)=>`+${val} MAX HP` },
            { id: 'mana', name: "ARC BATTERY",  desc: (val)=>`+${val} MAX MP` }
        ];

        // LATE-GAME ITEMS (unlock after floor 50)
        if(this.floor >= 50) {
            items.push(
                { id: 'breach', name: "QUANTUM CORE", desc: (val)=>`+${(val*100).toFixed(1)}% Enemy Max HP Damage`, tier: 'epic' },
                { id: 'combo',  name: "WAR PROTOCOL", desc: (val)=>`+${(val*100).toFixed(1)}% Combo Damage/Hit`, tier: 'epic' },
                { id: 'crit',   name: "FATAL CHIP",   desc: (val)=>`+${(val*100).toFixed(0)}% Crit Damage`, tier: 'rare' }
            );
        }

        items.forEach(def => {
            const data = this.shopData[def.id];
            const cost = this.getItemCost(def.id);
            const val = this.getItemValue(def.id);

            const el = document.createElement('div');
            el.className = 'shop-item';
            if(def.tier === 'epic') el.style.borderColor = '#aa00ff';
            else if(def.tier === 'rare') el.style.borderColor = '#00aaff';

            const canAfford = this.gold >= cost;
            const costColor = canAfford ? '#ffe600' : '#555';
            const itemColor = canAfford ? '#fff' : '#777';

            el.innerHTML = `
                <div style="color:${itemColor}">
                    <div class="item-name" style="font-size:20px">
                        ${def.name}
                        <span style="font-size:14px;color:#00f2ff; font-weight:bold; margin-left:5px;">LVL ${data.level}</span>
                    </div>
                    <div class="item-desc">${def.desc(val)}</div>
                </div>
                <div class="cost" style="color:${costColor}">${cost} CR</div>
            `;

            el.onclick = () => this.buyItem(def.id);
            container.appendChild(el);
        });
        if (typeof ITEMS !== 'undefined') {
            // 1. Pick a random item
            const types = ['WEAPONS', 'ACCESSORIES'];
            const randType = types[Math.floor(Math.random()*2)];
            const pool = ITEMS[randType];
            const item = pool[Math.floor(Math.random() * pool.length)];
            
            // 2. Calculate "Harsh" Price based on Rarity
            // Old: 500, 1200, 3500, 8000
            // New: 2500, 10000, 45000, 150000
            const basePrices = { 'common': 2500, 'rare': 10000, 'epic': 45000, 'legendary': 150000 };
            const rarityColors = { 'common': '#fff', 'rare': '#0088ff', 'epic': '#aa00ff', 'legendary': '#ffe600' };
            const rarityRank = { 'common': 1, 'rare': 2, 'epic': 3, 'legendary': 4 };

            // Price Variance (+/- 15% to make it feel like a market)
            let price = basePrices[item.rarity] || 2500;
            const variance = Math.floor(price * 0.15); 
            price = price + Math.floor((Math.random() * variance * 2) - variance);

            // 3. Render
            const color = rarityColors[item.rarity];
            const itemEl = document.createElement('div');
            itemEl.className = 'shop-item';
            itemEl.style.borderColor = color;
            itemEl.style.boxShadow = `0 0 5px ${color}40`;
            
            const canAfford = this.gold >= price;
            
            // Generate visual HTML
            itemEl.innerHTML = `
                <div>
                    <div class="item-name" style="color:${color}; text-shadow: 0 0 5px ${color}80;">${item.name}</div>
                    <div class="item-desc" style="font-size:12px; color:#ccc;">${item.desc}</div>
                    <div style="font-size:10px; text-transform:uppercase; color:${color}; margin-top:4px;">${item.rarity} ${item.type}</div>
                </div>
                <div class="cost" style="color:${canAfford ? color : '#555'}; font-size: 20px;">${price} CR</div>
            `;
            
            itemEl.onclick = () => {
                // A. Check Gold
                if(this.gold < price) {
                    this.showText("INSUFFICIENT FUNDS", this.player.mesh.position, '#ff0000');
                    return;
                }

                // B. Check Rarity Downgrade
                if (this.player && this.player.gear[item.type]) {
                    const currentItem = this.player.gear[item.type];
                    const currentRank = rarityRank[currentItem.rarity] || 0;
                    const newRank = rarityRank[item.rarity] || 0;

                    if (newRank < currentRank) {
                        alert(`CANNOT DOWNGRADE GEAR!\n\nCurrent: ${currentItem.name} (${currentItem.rarity.toUpperCase()})\nShop: ${item.name} (${item.rarity.toUpperCase()})`);
                        return; // Stop the purchase
                    }
                }

                // C. Process Transaction
                this.gold -= price;
                if (this.player && typeof this.player.equip === 'function') {
                    this.player.equip(item);
                    this.updateUI();
                    itemEl.remove(); // Remove item so they don't buy it twice
                }
            };
            container.appendChild(itemEl);
        }
    },

    // --- BUY LOGIC ---
    buyItem(id) {
        const cost = this.getItemCost(id);

        if(this.gold >= cost) {
            this.gold -= cost;
            const val = this.getItemValue(id);

            // Apply Stats
            if(id === 'heal') this.player.hp = Math.min(this.player.maxHp, this.player.hp + val);
            else if(id === 'atk') this.player.atk += val;
            else if(id === 'hp') { this.player.maxHp += val; this.player.hp += val; }
            else if(id === 'mana') { this.player.maxMana += val; this.player.mana += val; }
            // Late-game stats
            else if(id === 'breach') this.player.breachDamage = (this.player.breachDamage || 0) + val;
            else if(id === 'combo') this.player.comboMult = (this.player.comboMult || 0.01) + val;
            else if(id === 'crit') this.player.critDamage += val;

            // LEVEL UP THE ITEM
            this.shopData[id].level++;
            console.log(`Bought ${id}. New Level: ${this.shopData[id].level}. New Price: ${this.getItemCost(id)}`);

            this.updateUI();
            this.generateShop(); // Completely Re-Render the shop to show new Price/Level
        }
    },

    offerJobSelection(tier) {
        // Hide tutorial overlay when showing job selection
        // if(this.tutorialState === 'ACTIVE') {
        //     // this.hideTutorialOverlay();
        //     // Show tutorial step 1 (class selection) if we're just starting
        //     if(this.tutorialStep === 0) {
        //         setTimeout(() => this.showTutorialStep(1), 300);
        //     }
        // }
        
        this.setScreen('class-screen');
        const container = document.getElementById('class-container');
        container.innerHTML = '';
        
        if(tier === 0) {
            document.querySelector('#class-screen h2').innerText = "SELECT BASE CLASS";
            
            // 1. Define all available classes
            const allJobs = ['RONIN', 'PRIEST', 'MECH', 'GUNSLINGER', 'KNIGHT', 'SHADOW', 'BRAWLER', 'HACKER'];
            
            // 2. Shuffle and pick 3 random classes
            const randomJobs = allJobs
                .sort(() => 0.5 - Math.random()) // Shuffle
                .slice(0, 3); // Take top 3

            // 3. Create cards for the lucky 3
            randomJobs.forEach(jobKey => {
                this.createJobCard(container, CLASS_TREES[jobKey][0], 
                    onClick = () => {
                        this.setJob(jobKey, 0);
                        if (this.tutorialState === 'ACTIVE') {
                            this.showTutorialStep(2);
                            this.tutorialStep = 2;
                        }
                        
                    }
                    , jobKey);
            });

        } else {
            // Existing logic for upgrades
            document.querySelector('#class-screen h2').innerText = `TIER ${tier+1} ADVANCEMENT`;
            const currentKey = this.player.jobType;
            if(CLASS_TREES[currentKey][tier]) {
                this.createJobCard(container, CLASS_TREES[currentKey][tier], () => this.setJob(currentKey, tier), currentKey);
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
            "HACKER": {
                border: "2px solid #00ff00",
                shadow: "0 0 25px rgba(0, 255, 0, 0.8), inset 0 0 10px rgba(0,255,0,0.2)",
                bg: "repeating-linear-gradient(45deg, #000 0px, #001100 10px, #000 20px)",
                titleColor: "#00ff00"
            }
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
        const isBroken = jobKey === 'BRAWLER'
        const brokenTag = isBroken ? `<div style="background:linear-gradient(90deg,#ff0000,#ff6600);color:#fff;font-weight:bold;padding:4px 8px;border-radius:4px;font-size:12px;margin-bottom:8px;text-align:center;box-shadow:0 0 10px #ff0000;">⚠️ EXPERIMENTAL ⚠️</div>` : '';

        card.innerHTML = `
            ${brokenTag}
            <div class="perk-title" style="color:${theme.titleColor}; text-shadow:0 0 10px ${theme.titleColor}; margin-bottom:5px; font-size: 22px;">${jobData.name}</div>
            <div class="perk-desc" style="color:#ddd; font-style:italic; margin-bottom:10px;">${jobData.desc}</div>
            <div style="background:rgba(0,0,0,0.5); padding:10px; border-radius:5px; border:1px solid rgba(255,255,255,0.1);">
                <div style="font-size:14px;color:#fff;margin-top:5px;">
                    <strong style="color:${theme.titleColor}">1:</strong> ${jobData.skills[0].name}<br>
                    <span style="color:#aaa; font-size:12px">${jobData.skills[0].mult}x / ${jobData.skills[0].hits||1} Hits</span>
                </div>
                <div style="font-size:14px;color:#fff;margin-top:8px;">
                    <strong style="color:${theme.titleColor}">2:</strong> ${jobData.skills[1].name}<br>
                    <span style="color:#aaa; font-size:12px">${jobData.skills[1].mult}x / ${jobData.skills[1].hits||1} Hits</span>
                </div>
                ${buffInfo ? `<div style="font-size:14px;color:#fff;margin-top:8px;">${buffInfo}</div>` : ''}
            </div>
        `;
        
        card.onclick = onClick; 
        container.appendChild(card);
    
    },
    
    setJob(type, tier) {
        this.player.jobType = type; this.player.jobTier = tier; this.player.skills = CLASS_TREES[type][tier].skills;

        // Update player model based on class
        this.updatePlayerModel(type, tier);

        if(tier > 0) {
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
        const cb = document.getElementById('classes-btn'); if(cb) cb.style.display = 'block';
        if(!this.enemy || this.enemy.hp <= 0) this.spawnEnemy();
        this.updateUI();

        // Show next tutorial step if active (step 2: combat)
        if(this.tutorialState === 'ACTIVE' && tier === 0) {
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
        const colors = { 'RONIN': 0xaa00ff, 'PRIEST': 0x00f2ff, 'MECH': 0xff6600, 'SHADOW': 0x220033, 'BRAWLER': 0xff4400, 'GUNSLINGER': 0xffaa00, 'KNIGHT': 0x00aaff };
        const color = colors[type] || 0x00f2ff;

        if(type === 'RONIN') {
            this.player.model = Models.createRonin(color, 1.5, tier);
        } else if(type === 'PRIEST') {
            this.player.model = Models.createPriest(color, 1.5, tier);
        } else if(type === 'MECH') {
            this.player.model = Models.createMech(color, 1.5, tier);
        } else if(type === 'SHADOW') {
            this.player.model = Models.createShadow(color, 1.5, tier);
        } else if(type === 'BRAWLER') {
            this.player.model = Models.createBrawler(color, 1.5, tier);
        } else if (type === 'GUNSLINGER') {
            this.player.model = Models.createGunslinger(color, 1.5, tier);  
        } else  if (type === 'KNIGHT') {
            this.player.model = Models.createKnight(color, 1.5, tier);
        } else if (type === 'HACKER') {
            this.player.model = Models.createHacker(color, 1.5, tier);
            // this.player.model = Models.createArchitect(3);
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

    spawnEnemy() {
        if(this.enemy) engine.scene.remove(this.enemy.mesh);
        this.battleCombo = 0;

        const isFinalBoss = (this.floor >= 100);
        const isMidBoss = (this.floor === 25 || this.floor === 50 || this.floor === 75);
        const isFloorBoss = (this.floor % 5 === 0 && !isFinalBoss && !isMidBoss);

        let hp, atk;

        // --- THE "GOLDEN RATIO" SCALING (1.13) ---
        // Floor 1:   200 HP
        // Floor 50:  90,000 HP
        // Floor 75:  3,800,000 HP  <-- Perfect for your 2M hits (2 hits to kill)
        // Floor 99:  70,000,000 HP <-- Tough, but not a chore
        const difficultyScale = this.floor + (this.rebirth * 50);
        
        hp = Math.floor(200 * Math.pow(1.13, difficultyScale));
        
        // Attack grows slower so your 500k HP feels tanky against normal mobs
        atk = Math.floor(10 * Math.pow(1.085, difficultyScale));

        // Rebirth Scaling
        if(this.rebirth > 0) {
            hp = Math.floor(hp * Math.pow(2.8, this.rebirth));
            atk = Math.floor(atk * Math.pow(1.6, this.rebirth));
        }

        if(isFinalBoss) {
            this.bossPhase = 1; // <--- NEW TRACKER
            
            // Phase 1: The "Avatar" (Weaker version)
            // 150M HP / Normal Boss Damage
            hp = 150000000 * Math.pow(2, this.rebirth); 
            atk = 300000 * Math.pow(1.5, this.rebirth); 

            document.getElementById('enemy-name').innerText = `THE ARCHITECT (AVATAR)`;
            document.getElementById('enemy-name').style.color = '#ffd700';
            this.enemy = new Unit(false, hp, hp, atk, 0xffd700, 'architect');
            this.enemy.mitigation = 0.4; 
        }
        else if (isMidBoss) {
            hp *= 6; // Tanky mid-bosses
            atk *= 2.5;
            const names = {25:"WARDEN", 50:"EXECUTIONER", 75:"OVERLORD"};
            const variants = {25: 0, 50: 1, 75: 2};
            document.getElementById('enemy-name').innerText = `${names[this.floor]}`;
            document.getElementById('enemy-name').style.color = '#ff5500';
            this.enemy = new Unit(false, hp, hp, atk, 0xff5500, 'midboss', variants[this.floor]);
        }
        else if(isFloorBoss) {
            hp *= 3.0; 
            atk *= 2.0;
            document.getElementById('enemy-name').innerText = `SECTOR BOSS - ${this.floor}`;
            document.getElementById('enemy-name').style.color = '#ff0000';
            this.enemy = new Unit(false, hp, hp, atk, 0xff0000, 'boss');
        }
        else {
            const enemyTypes = ['walker', 'drone', 'sentinel', 'tank', 'spider', 'floater'];
            const type = enemyTypes[this.floor % enemyTypes.length];
            document.getElementById('enemy-name').innerText = `${type.toUpperCase()} - F${this.floor}`;
            document.getElementById('enemy-name').style.color = '#aaa';
            const color = new THREE.Color().setHSL(Math.random(), 0.8, 0.5);
            this.enemy = new Unit(false, hp, hp, atk, color, type);
        }

        // --- STATS ---
        this.enemy.armor = this.floor * 5; // Armor helps trash mobs survive rapid weak hits
        this.enemy.critChance = Math.min(0.20, this.floor * 0.002);
        if(this.floor > 10) this.enemy.dodge = Math.min(0.15, (this.floor - 10) * 0.002);

        const targetY = this.enemy.mesh.userData.baseY;
        this.enemy.mesh.position.y = 10;
        engine.tween(this.enemy.mesh.position, 'y', targetY, 800);
    },

    executePhase2Transform() {
        console.log("EXECUTING TRANSFORMATION");
        this.bossPhase = 2;
        
        // 1. Visual Effects
        engine.addShake(1.0); 
        if(this.enemy && this.enemy.mesh) {
            engine.spawnParticles(this.enemy.mesh.position, 0xff0000, 50);

            // Color the model red safely
            this.enemy.mesh.traverse((child) => {
                if (child.isMesh) {
                    child.material = child.material.clone(); 
                    child.material.color.setHex(0xff0000); 
                    if(child.material.emissive) child.material.emissive.setHex(0xaa0000);
                }
            });

            // Make it bigger
            this.enemy.mesh.scale.set(3, 3, 3);
        }
        
        // 2. Buff Stats
        const newMaxHp = Math.floor(this.enemy.maxHp * 1.5);
        this.enemy.maxHp = newMaxHp;
        this.enemy.hp = newMaxHp;
        this.enemy.atk = Math.floor(this.enemy.atk * 2);
        this.enemy.mitigation = 0.6; 

        // 3. UI Text Updates
        document.getElementById('enemy-name').innerText = "THE ARCHITECT (TRUE FORM)";
        document.getElementById('enemy-name').style.color = "#ff0000";
        this.showText("<< LIMITERS REMOVED >>", this.enemy.mesh.position, '#ff0000');
        
        // --- FIX: RESTORE CONTROLS ---
        this.state = 'IDLE'; 
        
        // Bring back HUD opacity
        document.getElementById('hud').style.opacity = '1';
        
        // Make buttons interactive again
        const controls = document.getElementById('battle-controls');
        controls.classList.add('active');
        
        this.updateButtons();
        this.updateUI();
    },

    triggerBossPhase2() {
        // 1. Set Flag FIRST
        this.pendingBossTransformation = true;
        this.state = 'CUTSCENE'; 
        
        // 2. Play Dialogue (Using s/t format directly now to be 100% safe)
        const lines = [
            { s: "ARCHITECT", t: "...Interesting." },
            { s: "ARCHITECT", t: "You have exceeded the calculated parameters." },
            { s: "ARCHITECT", t: "But this vessel was merely a constraint." },
            { s: "ARCHITECT", t: "Now... witness the source code of reality." }
        ];

        if (typeof this.startCutscene === 'function') {
            this.startCutscene(lines);
        } else {
            console.error("Cutscene system missing, skipping to phase 2");
            this.endCutscene();
        }
    },

    triggerBossEnding() {
        this.state = 'CUTSCENE';
        
        this.startCutscene([
            "ARCHITECT: Impossible...",
            "ARCHITECT: Value... null...",
            "ARCHITECT: System... shutting... down...",
            "SYSTEM: ADMIN ACCESS GRANTED."
        ]);

        // Triggers the actual win/rebirth after dialogue
        this.pendingBossDefeat = true; 
    },

    // --- BOSS AI SYSTEM ---
    bossAiLoop() {
        if(!this.enemy || this.floor < 100 || this.state === 'GAMEOVER') return;

        // 10% Chance per second to cast a spell
        if(Math.random() < 0.05) {
            const spell = Math.random();
            
            if(spell < 0.4) {
                // SPELL: REALITY BREAK (Heavy Damage + Stun VFX)
                this.showText("<< REALITY BREAK >>", this.enemy.mesh.position, '#ff0000');
                engine.spawnParticles(this.player.mesh.position, 0xff0000, 20);
                this.player.takeDmg(this.enemy.atk * 2.5); // Hits through OSP if already low
            } 
            else if (spell < 0.7) {
                // SPELL: SYSTEM PURGE (Removes your buffs)
                this.showText("<< SYSTEM PURGE >>", this.enemy.mesh.position, '#00f2ff');
                this.player.activeBuffs = []; // Clear buffs
                this.updateBuffs();
                this.player.takeDmg(this.enemy.atk * 0.5);
            }
            else {
                // SPELL: RECOMPILE (Heal Boss)
                const heal = Math.floor(this.enemy.maxHp * 0.05);
                this.enemy.hp = Math.min(this.enemy.maxHp, this.enemy.hp + heal);
                this.showText(`+${this.formatNum(heal)} RECOVER`, this.enemy.mesh.position, '#00ff00');
            }
        }
    },

    enemyTurn() {
        this.enemy.attackAnim(() => {
            const dmg = Math.floor(this.enemy.atk * (0.8 + Math.random()*0.4));
            this.player.takeDmg(dmg);
            this.showText(dmg, this.player.mesh.position, '#ff0055');
            engine.addShake(0.1);

            if(this.enemy.type === 'architect') {
                const attacks = ['god_beam', 'blackhole', 'matrix', 'nuke'];
                const vfx = attacks[Math.floor(Math.random()*attacks.length)];
                this.runVFX(vfx, this.player.mesh.position, 0xff0000, 0, 1);
                this.showText("REALITY BREAK", this.player.mesh.position, "#ff0000");
            } else if (this.enemy.type === 'boss') {
                this.runVFX('heavy', this.player.mesh.position, 0xff5500, 0, 1);
            } else {
                engine.spawnParticles(this.player.mesh.position, 0xffaa00, 5);
            }

            const regen = this.player.manaRegen;
            this.player.mana = Math.min(this.player.maxMana, this.player.mana + regen);
            this.showText(`+${regen} MP`, this.player.mesh.position, '#00f2ff');

            // Tick down buff durations at start of new player turn
            this.tickBuffs();

            this.updateUI();

            if(this.player.hp <= 0) {
                // Check for revive token
                if(this.iapBoosts.reviveToken) {
                    this.iapBoosts.reviveToken = false;
                    this.player.hp = Math.floor(this.player.maxHp * 0.5); // Revive at 50% HP
                    this.player.mana = this.player.maxMana;
                    this.showText('💀 REVIVED!', this.player.mesh.position, '#ff00ff');
                    this.updateUI();
                    this.state = 'IDLE';
                } else {
                    this.state = 'GAMEOVER';
                    document.getElementById('final-floor').innerText = this.floor;
                    this.setScreen('gameover-screen');
                    document.getElementById('battle-controls').classList.remove('active');
                }
            } else {
                this.state = 'IDLE';
            }
        });
    },

    winBattle() {
        this.state = 'REWARD';

        // Floor 100 victory - trigger REBIRTH instead of ending
        if(this.floor >= 100) {
            this.triggerRebirth();
            return;
        }

        let loot = 50 + (this.floor * 15);

        // REBIRTH BONUS: Massive gold multiplier
        if(this.rebirth > 0) {
            loot = Math.floor(loot * Math.pow(3, this.rebirth)); // 3x per rebirth level
        }

        // Bonus credits perk
        if(this.player.bonusCredits > 0) {
            loot = Math.floor(loot * (1 + this.player.bonusCredits));
        }
        this.gold += loot;

        // Overkill bonus: extra credits for overkilling enemies
        if(this.player.overkillBonus > 0 && this.enemy.hp < 0) {
            const overkillCredits = Math.floor(Math.abs(this.enemy.hp) * this.player.overkillBonus * 0.1);
            if(overkillCredits > 0) {
                this.gold += overkillCredits;
                this.showText(`+${overkillCredits} OVERKILL`, this.enemy.mesh.position, '#ffe600');
            }
        }
        engine.tween(this.enemy.mesh.scale, 'y', 0.1, 200);

        // Reset player position after battle
        this.resetPlayerPosition();

        this.updateUI();
        this.generatePerks();
        this.setScreen('reward-screen');
        document.getElementById('battle-controls').classList.remove('active');

        // Tutorial: After first battle, show perk selection step
        if(this.tutorialState === 'ACTIVE' && this.tutorialStep === 2) {
            this.nextTutorialStep(); // Advance to step 3 (floor progression)
        }
    },

    // --- REBIRTH SYSTEM ---
    triggerRebirth() {
        this.rebirth++;
        this.floor = 1; 

        // Reset floor theme
        if(engine.setFloorTheme) engine.setFloorTheme(1);

        // Boost Player Stats
        if(this.player) {
            this.player.atk = Math.floor(this.player.atk * 1.5);
            this.player.maxHp = Math.floor(this.player.maxHp * 1.5);
            this.player.hp = this.player.maxHp; // Full Heal
            this.player.maxMana = Math.floor(this.player.maxMana * 1.5);
            this.player.mana = this.player.maxMana;
            
            this.player.critDamage += 0.5;
            this.player.comboMult = (this.player.comboMult || 0.01) + 0.01;
            this.player.breachDamage = (this.player.breachDamage || 0) + 0.005;
            
            // Re-awaken immediately (Keep the visual flair)
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
        if(levelEl) levelEl.innerText = this.rebirth;
        if(bonusEl) bonusEl.innerText = this.formatNum(rebirthBonus);
    },

    completeRebirth() {
        this.showText(`REBIRTH ${this.rebirth}!`, this.player.mesh.position, '#ff00ff');
        engine.spawnShockwave(this.player.mesh.position, 0xff00ff, 6);
        engine.addShake(0.6);

        this.state = 'IDLE';
        this.bossPhase = 0; 
        
        const hud = document.getElementById('hud');
        hud.style.opacity = '1'; 
        hud.style.display = 'block';
        this.setScreen('hud');
        
        const controls = document.getElementById('battle-controls');
        controls.classList.add('active');
        
        // --- FIX: FORCE CENTER ALIGNMENT ---
        controls.style.display = 'flex'; 
        controls.style.justifyContent = 'center'; // <--- ADD THIS LINE
        
        if(this.enemy && this.enemy.mesh) {
            engine.scene.remove(this.enemy.mesh);
            this.enemy = null;
        }

        this.spawnEnemy(); 
        engine.focusCamera(null); 
        this.updateButtons();
        this.updateUI();
    },

    resetPlayerPosition() {
        if(this.player && this.player.mesh) {
            this.player.mesh.position.set(-2.5, this.player.mesh.userData.baseY || 0, 0);
            this.player.mesh.rotation.y = Math.PI/2;
        }
    },

    generatePerks() {
        const container = document.getElementById('perk-container');
        container.innerHTML = '';
        const RARITY = { COMMON: {id:'common', name:'COMMON', mult:1, prob:1.0}, RARE: {id:'rare', name:'RARE', mult:1.5, prob:0.36}, EPIC: {id:'epic', name:'EPIC', mult:2.5, prob:0.06}, LEGENDARY: {id:'legendary', name:'LEGENDARY', mult:5.0, prob:0.01} };
        

        for(let i=0; i<3; i++) {
            let tier;

            // REBIRTH MODE: All perks are LEGENDARY with additional scaling
            if(this.rebirth > 0) {
                tier = {
                    id: 'legendary',
                    name: `LEGENDARY ★${this.rebirth}`,
                    mult: 5.0 * (1 + this.rebirth * 0.5), // +50% value per rebirth
                    prob: 1.0
                };
            } else {
                // Check for IAP guaranteed legendary
                if(this.iapBoosts.guaranteedLegendary) {
                    tier = RARITY.LEGENDARY;
                    this.iapBoosts.guaranteedLegendary = false; // Use up the boost
                } else {
                    const rand = Math.random();
                    // Apply IAP luck boosts
                    const legendaryChance = RARITY.LEGENDARY.prob + this.iapBoosts.legendaryBonus;
                    const epicChance = RARITY.EPIC.prob + this.iapBoosts.epicBonus;
                    const rareChance = RARITY.RARE.prob + this.iapBoosts.rareBonus;

                    tier = RARITY.COMMON;
                    if (rand < legendaryChance) tier = RARITY.LEGENDARY;
                    else if (rand < epicChance) tier = RARITY.EPIC;
                    else if (rand < rareChance) tier = RARITY.RARE;
                }
            }

            const template = PERK_POOL[Math.floor(Math.random() * PERK_POOL.length)];
            const finalVal = Math.floor(template.baseVal * tier.mult);
            const desc = template.desc.replace('{val}', finalVal);
            const card = document.createElement('div');
            card.className = `perk-card ${tier.id}`;
            card.innerHTML = `<div class="perk-title">${template.name}</div><div class="perk-desc">${desc}</div><div class="rarity-tag">${tier.name}</div>`;
            card.onclick = () => {
                template.func(this.player, finalVal);
                this.trackBuff(template, finalVal);
                
                // Tutorial: After selecting first perk, advance to step 4 (floor progression)
                if(this.tutorialState === 'ACTIVE' && this.tutorialStep === 3) {
                    this.nextTutorialStep();
                }
                
                this.goToShop();
            };
            container.appendChild(card);
        }
    },

    trackBuff(template, value) {
        // Don't track one-time effects (heals, mana restore) unless they provide permanent bonuses
        if(template.noStack) return;

        const key = template.name;
        if(!this.buffs[key]) {
            this.buffs[key] = { count: 0, totalValue: 0, icon: template.icon, name: template.name, statDesc: template.statDesc };
        }
        this.buffs[key].count++;
        this.buffs[key].totalValue += value;
        this.renderBuffs();
    },

    renderBuffs() {
        const container = document.getElementById('buff-container');
        container.innerHTML = '';

        for(const key in this.buffs) {
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
    
    showText(txt, pos, color) {
        const div = document.createElement('div');
        div.className = 'dmg-float'; div.innerText = txt; div.style.color = color;
        const vec = pos.clone(); 
        vec.x += (Math.random()-0.5) * 0.5;
        vec.y += 2.5 + (Math.random()-0.5) * 0.5;
        vec.project(engine.camera);
        div.style.left = (vec.x * 0.5 + 0.5) * window.innerWidth + 'px';
        div.style.top = (-(vec.y * 0.5) + 0.5) * window.innerHeight + 'px';
        document.body.appendChild(div);
        setTimeout(()=>div.remove(), 600);
    },
    
    setScreen(id) { document.querySelectorAll('.screen').forEach(s => s.classList.remove('active')); if(id !== 'hud') document.getElementById(id).classList.add('active'); },
    updateButtons() {
        if(!this.player) return;
        const s1 = this.player.skills[0]; const s2 = this.player.skills[1]; const s3 = this.player.skills[2];
        const cost1 = Math.max(0, Math.floor(s1.cost * (1 - this.player.manaCostReduction)));
        const cost2 = Math.max(0, Math.floor(s2.cost * (1 - this.player.manaCostReduction)));
        const discount1 = cost1 < s1.cost ? `<span style="text-decoration:line-through;color:#666">${s1.cost}</span> ` : '';
        const discount2 = cost2 < s2.cost ? `<span style="text-decoration:line-through;color:#666">${s2.cost}</span> ` : '';
        document.getElementById('btn-skill-1').innerHTML = `<span class="btn-name">${s1.name}</span><br><span class="btn-cost">${discount1}${cost1} MP</span>`;
        document.getElementById('btn-skill-2').innerHTML = `<span class="btn-name">${s2.name}</span><br><span class="btn-cost">${discount2}${cost2} MP</span>`;

        // Update buff skill button
        if(s3) {
            const cost3 = Math.max(0, Math.floor(s3.cost * (1 - this.player.manaCostReduction)));
            const discount3 = cost3 < s3.cost ? `<span style="text-decoration:line-through;color:#666">${s3.cost}</span> ` : '';
            document.getElementById('btn-skill-3').innerHTML = `<span class="btn-name">${s3.name}</span><br><span class="btn-cost">${discount3}${cost3} MP</span>`;
            document.getElementById('btn-skill-3').style.display = 'inline-block';
        } else {
            document.getElementById('btn-skill-3').style.display = 'none';
        }
    },

    // --- CLASS VIEWER SYSTEM ---
    openClassesViewer() {
        // Prevent opening until player has chosen a class
        if(!this.player || !this.player.jobType) return;

        // Already open -> toggle close
        const screen = document.getElementById('classes-screen');
        if(screen.classList.contains('active')) { this.closeClassesViewer(); return; }

        // Store current state
        this.previousState = this.state;
        this.state = 'CLASSES_VIEWER';
        document.getElementById('classes-screen').classList.add('active');
        this.renderClassMap();

        // Add Escape key to close
        this._classesKeyHandler = (e) => { if(e.key === 'Escape') { if(document.getElementById('class-tier-overlay')) return; this.closeClassesViewer(); } };
        document.addEventListener('keydown', this._classesKeyHandler);
    },

    closeClassesViewer() {
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

        if(this._classesKeyHandler) {
            document.removeEventListener('keydown', this._classesKeyHandler);
            this._classesKeyHandler = null;
        }
    },

    toggleClassesViewer() {
        const screen = document.getElementById('classes-screen');
        if(screen.classList.contains('active')) this.closeClassesViewer();
        else this.openClassesViewer();
    },

    isClassUnlocked(classKey) {
        // A class is unlocked if player currently has it or has reached the tier it appears in
        if(!this.player) return false;
        
        // Player's current class is always unlocked
        if(this.player.jobType === classKey) return true;
        
        // Check if player has reached a tier where this class appears
        // Each tier is 10 floors, classes appear at their tier index
        const classTiers = Object.keys(CLASS_TREES);
        const classIndex = classTiers.indexOf(classKey);
        if(classIndex === -1) return false;
        
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
        if(this.player && this.player.jobType) classNames = [this.player.jobType];
        const cols = classNames.length;
        const tiers = 10; // Show 10 tiers vertically

        const map = document.createElement('div');
        map.className = 'class-map';
        map.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;

        // If we are only showing a single class, render horizontally: columns == tiers
        const horizontal = (cols === 1);
        if(horizontal) {
            map.classList.add('horizontal');
            // create one column per tier (left -> right progression)
            for(let t = 0; t < tiers; t++) {
                const col = document.createElement('div');
                col.className = 'map-column';

                // single node for this tier
                const node = document.createElement('div'); node.className = 'map-node';
                const isUnlocked = this.isClassTierUnlocked(classNames[0], t);
                if(isUnlocked) node.classList.add('unlocked'); else node.classList.add('locked');

                // current node highlight if matches
                if(this.player && this.player.jobType === classNames[0] && this.player.jobTier === t) node.classList.add('current-node');

                // label
                const tierLabel = document.createElement('div'); tierLabel.className = 'node-title'; tierLabel.innerText = `T${t+1}`;
                const tierDesc = document.createElement('div'); tierDesc.className = 'node-sub'; tierDesc.innerText = CLASS_TREES[classNames[0]][t] ? CLASS_TREES[classNames[0]][t].name : '—';
                node.appendChild(tierLabel); node.appendChild(tierDesc);

                node.onclick = () => { if(!isUnlocked) return; this.showClassTierModal(classNames[0], t); };
                node.tabIndex = 0;
                node.onkeydown = (e) => {
                    if(e.key === 'Enter' || e.key === ' ') { if(isUnlocked) this.showClassTierModal(classNames[0], t); e.preventDefault(); }
                    if(e.key === 'ArrowRight') { const nextCol = col.nextElementSibling; if(nextCol) { const next = nextCol.querySelector('.map-node'); if(next) next.focus(); } }
                    if(e.key === 'ArrowLeft') { const prevCol = col.previousElementSibling; if(prevCol) { const prev = prevCol.querySelector('.map-node'); if(prev) prev.focus(); } }
                };

                col.appendChild(node);
                map.appendChild(col);
            }
        } else {
            // For each class (column)
            classNames.forEach(classKey => {
                const col = document.createElement('div');
                col.className = 'map-column';
                if(this.player && this.player.jobType === classKey) col.classList.add('current');

                // optional column highlight
                if(this.player && this.player.jobType === classKey) {
                    const hl = document.createElement('div'); hl.className = 'class-column-highlight'; col.appendChild(hl);
                }

                // Create nodes per tier (top = tier 9 -> highest)
                for(let t = tiers - 1; t >= 0; t--) {
                    const node = document.createElement('div'); node.className = 'map-node';
                    const isUnlocked = this.isClassTierUnlocked(classKey, t);
                    if(isUnlocked) node.classList.add('unlocked'); else node.classList.add('locked');

                    // current node highlight if player's class and tier match
                    if(this.player && this.player.jobType === classKey && this.player.jobTier === t) node.classList.add('current-node');

                    // add text (tier label + maybe short skill name)
                    const tierLabel = document.createElement('div'); tierLabel.className = 'node-title'; tierLabel.innerText = `T${t+1}`;
                    const tierDesc = document.createElement('div'); tierDesc.className = 'node-sub'; tierDesc.innerText = CLASS_TREES[classKey][t] ? CLASS_TREES[classKey][t].name : '—';
                    node.appendChild(tierLabel); node.appendChild(tierDesc);

                    // click behavior: if unlocked, show a small modal with tier details
                    node.onclick = () => { if(!isUnlocked) return; this.showClassTierModal(classKey, t); };
                    // accessibility: focusable and keyboard interaction
                    node.tabIndex = 0;
                    node.onkeydown = (e) => {
                        if(e.key === 'Enter' || e.key === ' ') { if(isUnlocked) this.showClassTierModal(classKey, t); e.preventDefault(); }
                        if(e.key === 'ArrowDown') { const next = node.nextElementSibling; if(next) next.focus(); }
                        if(e.key === 'ArrowUp') { const prev = node.previousElementSibling; if(prev) prev.focus(); }
                    };

                    col.appendChild(node);
                }

                map.appendChild(col);
            });
        }

        // Add small legend and instructions
        const legend = document.createElement('div');
        legend.style.width = '100%'; legend.style.margin = '18px 0 6px 0'; legend.style.color = '#ccc'; legend.style.fontSize = '13px';
        if(cols === 1 && this.player && this.player.jobType) {
            legend.innerHTML = `<strong>${this.player.jobType} — CLASS TREE</strong> — Horizontal progression (left → right).
                <span style="float:right;">Press <kbd>Esc</kbd> or CLOSE to exit</span>`;
        } else {
            legend.innerHTML = `<strong>CLASS MAP</strong> — Columns are classes (left→right). Nodes are tiers (top = Tier 10).
                <span style="float:right;">Press <kbd>Esc</kbd> or CLOSE to exit</span>`;
        }

        // wrap map into scrollable wrapper and add svg overlay for links
        const wrapper = document.createElement('div'); wrapper.id = 'classes-map-wrapper';
        const svgNS = 'http://www.w3.org/2000/svg';
        const svg = document.createElementNS(svgNS, 'svg'); svg.setAttribute('class','class-map-links');
        svg.style.width = '100%'; svg.style.height = '100%';

        if(cols === 1) map.classList.add('single-column');
        // adjust wrapper height for horizontal single-class layout
        if(map.classList.contains('horizontal')) {
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
        if(!this._mapDragInitialized) { this._initMapDrag(wrapper, drawLinks); this._mapDragInitialized = true; }

        // After layout/update, draw links
        setTimeout(drawLinks, 50);

        // Center on player's current node for better mobile UX
        setTimeout(() => {
            if(this.player) {
                const current = wrapper.querySelector('.current-node');
                const mapEl = wrapper.querySelector('.class-map');
                const isHorizontal = mapEl && mapEl.classList.contains('horizontal');
                if(current) {
                    if(isHorizontal) {
                        wrapper.scrollLeft = current.offsetLeft - (wrapper.clientWidth/2) + (current.clientWidth/2);
                        // vertically center the single-row content
                        wrapper.scrollTop = Math.max(0, (mapEl.clientHeight - wrapper.clientHeight) / 2);
                    } else {
                        wrapper.scrollTop = current.offsetTop - (wrapper.clientHeight/2) + (current.clientHeight/2);
                        wrapper.scrollLeft = current.offsetLeft - (wrapper.clientWidth/2) + (current.clientWidth/2);
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
        if(isUnlocked) card.classList.add('unlocked');
        if(isCurrent) card.classList.add('current');
        if(!isUnlocked) card.classList.add('locked');

        const currentSkills = this.player ? this.player.skills : [];
        const highestTier = classData.length - 1;

        // Determine class tier level description
        const allTierDescriptions = [];
        classData.forEach((tier, idx) => {
            allTierDescriptions.push(tier.desc);
        });

        // Get header info
        let statusBadge = '';
        if(isCurrent) {
            statusBadge = '<div class="unlock-status current">CURRENT</div>';
        } else if(isUnlocked) {
            statusBadge = '<div class="unlock-status unlocked">UNLOCKED</div>';
        } else {
            const nextTierIndex = Math.min(this.player ? Math.floor((this.floor - 1) / 10) : 0, highestTier);
            statusBadge = `<div class="unlock-status locked">LOCKED</div>`;
        }

        // Build skill descriptions
        let skillsHTML = '<div class="skills-list">';
        classData.forEach((tierData, tierIndex) => {
            if(tierData.skills) {
                tierData.skills.forEach((skill, skillIdx) => {
                    const skillNum = skillIdx + 1;
                    const skillCost = skill.cost > 0 ? `${skill.cost} MP` : 'FREE';
                    const skillType = skill.isBuff ? 'BUFF' : 'DMG';
                    
                    let statsInfo = '';
                    if(skill.isBuff) {
                        statsInfo = `<span class="skill-stats">${skillType}</span> | <span class="skill-cost">${skill.desc}</span>`;
                    } else {
                        const hitsInfo = skill.hits && skill.hits > 1 ? `x${skill.hits}HIT` : '1HIT';
                        statsInfo = `<span class="skill-stats">${skill.mult}x ${hitsInfo}</span> | <span class="skill-cost">${skillCost}</span>`;
                    }

                    skillsHTML += `
                        <div class="skill-item">
                            <div class="skill-name">SKILL ${skillNum}: ${skill.name}</div>
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
        if(num >= 1000000000) return (num/1000000000).toFixed(2) + 'B'; // Billions
        if(num >= 1000000) return (num/1000000).toFixed(1) + 'M';    // Millions
        if(num >= 1000) return (num/1000).toFixed(1) + 'K';          // Thousands
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
        if(this.battleCombo > 0 || this.floor >= 50) {
            comboDisplay.style.display = 'block';
            comboNum.innerText = this.battleCombo || 0;
            // Color based on combo
            if(this.battleCombo >= 100) comboDisplay.style.color = '#ff00ff';
            else if(this.battleCombo >= 50) comboDisplay.style.color = '#ff0000';
            else if(this.battleCombo >= 25) comboDisplay.style.color = '#ff5500';
            else if(this.battleCombo >= 10) comboDisplay.style.color = '#ffaa00';
            else comboDisplay.style.color = '#fff';
        } else {
            comboDisplay.style.display = 'none';
        }

        if(this.player) {
            document.getElementById('p-hp-fill').style.width = Math.min(100, (this.player.hp/this.player.maxHp)*100) + '%';
            
            // FIX: Formatted numbers for Player Stats
            document.getElementById('p-hp-text').innerText = `${this.formatNum(this.player.hp)} / ${this.formatNum(this.player.maxHp)}`;
            document.getElementById('p-mana-fill').style.width = Math.min(100, (this.player.mana/this.player.maxMana)*100) + '%';
            document.getElementById('p-mana-text').innerText = `${this.formatNum(this.player.mana)} / ${this.formatNum(this.player.maxMana)}`;

            // Shield bar - only show if player has shield
            const shieldWrapper = document.getElementById('p-shield-wrapper');
            if(this.player.shield > 0) {
                shieldWrapper.style.display = 'block';
                document.getElementById('p-shield-text').innerText = this.formatNum(this.player.shield);
                
                this.player.maxShield = Math.max(this.player.maxShield || this.player.shield, this.player.shield);
                document.getElementById('p-shield-fill').style.width = Math.min(100, (this.player.shield / this.player.maxShield) * 100) + '%';
            } else {
                shieldWrapper.style.display = 'none';
            }
        }
        
        if(this.enemy) {
            const eBar = document.getElementById('e-hp-fill');
            const ePct = (this.enemy.hp / this.enemy.maxHp) * 100;
            eBar.style.width = Math.min(100, ePct) + '%';

            // FIX: Formatted numbers for Enemy HP
            document.getElementById('e-hp-text').innerText = `${this.formatNum(this.enemy.hp)} / ${this.formatNum(this.enemy.maxHp)}`;
            
            // --- NEW: BOSS BAR VISUALS ---
            if(this.floor >= 100) {
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
        if(this.updateGearUI) this.updateGearUI();
    },
};

class Unit {
    constructor(isPlayer, hp, maxHp, atk, color, type='walker', variant=0) {
        this.isPlayer = isPlayer; this.hp = hp; this.maxHp = maxHp; this.atk = atk; this.type = type;
        this.maxMana = isPlayer ? 50 : 100; this.mana = this.maxMana; this.manaRegen = 5;
        this.critChance = 0.05; this.critDamage = 1.5; this.lifesteal = 0; this.jobType = null; this.jobTier = 0;
        this.armor = 0; this.dodge = 0; this.thorns = 0; this.doubleStrike = 0; this.manaCostReduction = 0;
        this.executeThreshold = 0; this.overkillBonus = 0; this.shield = 0; this.maxShield = 0; this.bonusCredits = 0;
        this.activeBuffs = []; this.invincible = false;

        // --- NEW: GEAR SYSTEM ---
        this.gear = { weapon: null, accessory: null };
        // ------------------------

        // Late-game scaling stats
        this.comboMult = 0.01; // Damage increase per combo hit (1% base)
        this.breachDamage = 0; // % of enemy max HP dealt as bonus damage
        this.awakened = false; // Unlocked at floor 50

        // Create model based on type
        if(isPlayer) this.model = Models.createHumanoid(color, 1.5);
        else if (type === 'architect') this.model = Models.createArchitect(2.5);
        else if (type === 'midboss') this.model = Models.createMidBoss(color, 2.2, variant);
        else if (type === 'boss') this.model = Models.createBoss(color, 2.0);
        else if (type === 'drone') this.model = Models.createDrone(color, 1.3);
        else if (type === 'sentinel') this.model = Models.createSentinel(color, 1.4);
        else if (type === 'tank') this.model = Models.createTank(color, 1.5);
        else if (type === 'spider') this.model = Models.createSpider(color, 1.4);
        else if (type === 'floater') this.model = Models.createFloater(color, 1.3);
        else this.model = Models.createHumanoid(color, 1.5);

        this.mesh = this.model.mesh;
        this.mesh.position.set(isPlayer ? -2.5 : 2.5, 0, 0);
        this.mesh.rotation.y = isPlayer ? Math.PI/2 : -Math.PI/2;

        // Set base Y (floating enemies)
        const floatingTypes = ['drone', 'boss', 'architect', 'floater', 'midboss'];
        this.mesh.userData.idle = true;
        this.mesh.userData.baseY = floatingTypes.includes(type) ? 1.5 : (type === 'spider' ? 0.3 : 0);
        this.mesh.userData.idleSpeed = 0.002;
        this.mesh.userData.idleAmp = floatingTypes.includes(type) ? 0.15 : 0.1;
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
        // Invincible check
        if(this.isPlayer && this.invincible) {
            game.showText("IMMUNE!", this.mesh.position, '#ffd700');
            return 0;
        }
        // Dodge check
        if(this.isPlayer && Math.random() < this.dodge) {
            game.showText("DODGE!", this.mesh.position, '#00ff00');
            return 0;
        }
        // Armor reduces damage
        let finalDmg = Math.max(1, amount - this.armor);
        // Shield absorbs damage first
        if(this.shield > 0) {
            const absorbed = Math.min(this.shield, finalDmg);
            this.shield -= absorbed;
            finalDmg -= absorbed;
            if(absorbed > 0) game.showText(`-${absorbed} SHIELD`, this.mesh.position, '#00f2ff');
        }
        this.hp = Math.max(0, this.hp - finalDmg);

        // --- BOSS PHASE INTERCEPTOR ---
        // If enemy hits 0 HP, is the Boss, and hasn't finished all phases:
        if (!this.isPlayer && this.hp <= 0 && game.floor === 100) {
            // If we are in Phase 1, Trigger Phase 2
            if (game.bossPhase === 1) {
                this.hp = 1; // Keep alive for the cutscene
                game.triggerBossPhase2();
                return; 
            }
            // If we are in Phase 2, Trigger Finale
            if (game.bossPhase === 2) {
                this.hp = 0; // Actually die now
                game.triggerBossEnding();
                return;
            }
        }
        // -----------------------------
        // Thorns damage (reflect)
        if(this.isPlayer && this.thorns > 0 && game.enemy) {
            const thornsDmg = Math.floor(amount * this.thorns);
            if(thornsDmg > 0) {
                game.enemy.hp = Math.max(0, game.enemy.hp - thornsDmg);
                game.showText(`${thornsDmg} THORNS`, game.enemy.mesh.position, '#ff00ff');
            }
        }
        const base = this.mesh.position.x;
        this.mesh.position.x += (this.isPlayer ? -0.2 : 0.2);
        setTimeout(()=> this.mesh.position.x = base, 50);
        // Show Text handled in TriggerHit
    }
    equip(item) {
        const slot = item.type; // 'weapon' or 'accessory'
        
        // 1. Unequip existing (remove stats)
        if (this.gear[slot]) {
            const old = this.gear[slot];
            if(old.atk) this.atk -= old.atk;
            if(old.hp) { this.maxHp -= old.hp; this.hp = Math.min(this.hp, this.maxHp); }
            if(old.mana) { this.maxMana -= old.mana; this.mana = Math.min(this.mana, this.maxMana); }
            if(old.crit) this.critChance -= old.crit;
            if(old.dodge) this.dodge -= old.dodge;
        }

        // 2. Equip new (add stats)
        this.gear[slot] = item;
        if(item.atk) this.atk += item.atk;
        if(item.hp) { this.maxHp += item.hp; this.hp += item.hp; }
        if(item.mana) { this.maxMana += item.mana; this.mana += item.mana; }
        if(item.crit) this.critChance += item.crit;
        if(item.dodge) this.dodge += item.dodge;

        // 3. UI Update
        game.updateGearUI();
        game.showText(`EQUIPPED ${item.name}`, this.mesh.position, '#00ff00');
    }
    
}