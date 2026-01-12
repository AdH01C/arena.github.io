const ITEMS = {
    WEAPONS: [
        // --- COMMON (Early Game Viability) ---
        { id: 'shard_blade', name: 'GLASS SHARD', type: 'weapon', atkMult: 0.15, rarity: 'common', desc: '+15% ATK. Fragile but sharp.' },
        { id: 'pipe_wrench', name: 'PIPE WRENCH', type: 'weapon', atkMult: 0.20, hpMult: 0.05, rarity: 'common', desc: '+20% ATK, +5% HP. Blunt and reliable.' },
        { id: 'stun_rod', name: 'STUN ROD', type: 'weapon', atkMult: 0.12, critChance: 0.03, rarity: 'common', desc: '+12% ATK, +3% Crit. Shocks on crit.' },
        { id: 'scrap_blade', name: 'SCRAP BLADE', type: 'weapon', atkMult: 0.18, critDamage: 0.10, rarity: 'common', desc: '+18% ATK, +10% Crit DMG. Salvaged tech.' },

        // --- RARE (Mid Game Power Spike) ---
        { id: 'plasma_edge', name: 'PLASMA EDGE', type: 'weapon', atkMult: 0.35, critChance: 0.05, rarity: 'rare', desc: '+35% ATK, +5% Crit. Superheated blade.' },
        { id: 'blood_drinker', name: 'CRIMSON REAPER', type: 'weapon', atkMult: 0.30, lifesteal: 0.12, rarity: 'rare', desc: '+30% ATK, +12% Lifesteal. Drains essence.' },
        { id: 'heavy_cannon', name: 'IMPACT DRIVER', type: 'weapon', atkMult: 0.50, critChance: -0.05, rarity: 'rare', desc: '+50% ATK, -5% Crit. Raw power.' },
        { id: 'storm_caller', name: 'ARC LANCE', type: 'weapon', atkMult: 0.25, manaMult: 0.15, rarity: 'rare', desc: '+25% ATK, +15% Mana. Lightning surges.' },
        { id: 'twin_daggers', name: 'DUAL EDGES', type: 'weapon', atkMult: 0.20, critChance: 0.12, critDamage: 0.15, rarity: 'rare', desc: '+20% ATK, +12% Crit, +15% Crit DMG. Swift strikes.' },

        // --- EPIC (Late Game Specialization) ---
        { id: 'void_ripper', name: 'VOID RIPPER', type: 'weapon', atkMult: 0.60, hpMult: -0.10, rarity: 'epic', desc: '+60% ATK, -10% HP. Cuts through reality.' },
        { id: 'executioner', name: 'THE EXECUTIONER', type: 'weapon', atkMult: 0.45, critDamage: 0.50, rarity: 'epic', desc: '+45% ATK, +50% Crit DMG. Mercy is weakness.' },
        { id: 'life_blade', name: 'SOUL RENDER', type: 'weapon', atkMult: 0.40, lifesteal: 0.25, hpMult: 0.10, rarity: 'epic', desc: '+40% ATK, +25% Lifesteal, +10% HP. Claims vitality.' },
        { id: 'frozen_end', name: 'ABSOLUTE ZERO', type: 'weapon', atkMult: 0.50, manaMult: 0.25, critChance: 0.08, rarity: 'epic', desc: '+50% ATK, +25% Mana, +8% Crit. Freezing power.' },
        { id: 'berserker', name: 'BLOOD FRENZY', type: 'weapon', atkMult: 0.80, hpMult: -0.15, lifesteal: 0.15, rarity: 'epic', desc: '+80% ATK, -15% HP, +15% Lifesteal. Rage incarnate.' },
        { id: 'perfect_strike', name: 'PRECISION BLADE', type: 'weapon', atkMult: 0.30, critChance: 0.25, critDamage: 0.30, rarity: 'epic', desc: '+30% ATK, +25% Crit, +30% Crit DMG. Surgical precision.' },

        // --- LEGENDARY (End Game Dominance) ---
        { id: 'god_killer', name: 'DEICIDE', type: 'weapon', atkMult: 1.00, critChance: 0.15, critDamage: 0.75, rarity: 'legendary', desc: '+100% ATK, +15% Crit, +75% Crit DMG. Slays immortals.' },
        { id: 'infinity_edge', name: 'INFINITY EDGE', type: 'weapon', atkMult: 0.75, critChance: 0.30, critDamage: 1.00, rarity: 'legendary', desc: '+75% ATK, +30% Crit, +100% Crit DMG. Endless sharpness.' },
        { id: 'dark_matter', name: 'DARK MATTER', type: 'weapon', atkMult: 0.90, lifesteal: 0.30, manaMult: 0.20, rarity: 'legendary', desc: '+90% ATK, +30% Lifesteal, +20% Mana. Consumes all.' },
        { id: 'titan_breaker', name: 'WORLDBREAKER', type: 'weapon', atkMult: 1.50, critChance: -0.10, hpMult: 0.25, rarity: 'legendary', desc: '+150% ATK, -10% Crit, +25% HP. Shatters mountains.' },
        { id: 'omni_blade', name: 'THE SINGULARITY', type: 'weapon', atkMult: 0.60, hpMult: 0.15, manaMult: 0.15, critChance: 0.10, critDamage: 0.30, lifesteal: 0.10, rarity: 'legendary', desc: 'Balanced perfection. All stats elevated' }
    ],

    ACCESSORIES: [
        // --- COMMON (Foundational Builds) ---
        { id: 'iron_ring', name: 'IRON BAND', type: 'accessory', hpMult: 0.10, armor: 2, rarity: 'common', desc: '+10% HP, +2 Armor. Basic protection.' },
        { id: 'flux_coil', name: 'FLUX COIL', type: 'accessory', manaMult: 0.15, rarity: 'common', desc: '+15% Mana. Energy overflow.' },
        { id: 'scope_chip', name: 'TARGETING CHIP', type: 'accessory', critChance: 0.05, rarity: 'common', desc: '+5% Crit. Better aim.' },
        { id: 'dodge_boots', name: 'DASH BOOTS', type: 'accessory', dodge: 0.05, rarity: 'common', desc: '+5% Dodge. Quick feet.' },

        // --- RARE (Build Defining) ---
        { id: 'titan_core', name: 'TITAN CORE', type: 'accessory', hpMult: 0.25, armor: 5, rarity: 'rare', desc: '+25% HP, +5 Armor. Unbreakable.' },
        { id: 'predator_lens', name: 'PREDATOR LENS', type: 'accessory', critChance: 0.15, critDamage: 0.20, rarity: 'rare', desc: '+15% Crit, +20% Crit DMG. Precision optics.' },
        { id: 'phantom_cloak', name: 'PHANTOM CLOAK', type: 'accessory', dodge: 0.15, atkMult: 0.10, rarity: 'rare', desc: '+15% Dodge, +10% ATK. Invisible death.' },
        { id: 'arcane_battery', name: 'ARCANE BATTERY', type: 'accessory', manaMult: 0.30, regen: 2, rarity: 'rare', desc: '+30% Mana, +2HP/Turn. Energy regeneration.' },
        { id: 'vampiric_ring', name: 'BLOOD SIGIL', type: 'accessory', lifesteal: 0.10, hpMult: 0.15, rarity: 'rare', desc: '+10% Lifesteal, +15% HP. Blood magic.' },

        // --- EPIC (Advanced Synergies) ---
        { id: 'fortress_plating', name: 'FORTRESS MODULE', type: 'accessory', hpMult: 0.40, armor: 10, dodge: -0.05, rarity: 'epic', desc: '+40% HP, +10 Armor, -5% Dodge. Immovable.' },
        { id: 'assassin_mark', name: 'DEATH MARK', type: 'accessory', critChance: 0.25, critDamage: 0.40, hpMult: -0.10, rarity: 'epic', desc: '+25% Crit, +40% Crit DMG, -10% HP. High risk, high reward.' },
        { id: 'ghost_matrix', name: 'GHOST MATRIX', type: 'accessory', dodge: 0.25, atkMult: 0.15, critChance: 0.10, rarity: 'epic', desc: '+25% Dodge, +15% ATK, +10% Crit. Untouchable.' },
        { id: 'eternal_font', name: 'ETERNAL FONT', type: 'accessory', manaMult: 0.50, regen: 5, lifesteal: 0.05, rarity: 'epic', desc: '+50% Mana, +5HP/Turn, +5% Lifesteal. Infinite sustain.' },
        { id: 'thorns_core', name: '反射 CORE', type: 'accessory', hpMult: 0.30, thorns: 0.25, armor: 8, rarity: 'epic', desc: '+30% HP, +25% Thorns, +8 Armor. Pain reflects.' },

        // --- LEGENDARY (Build Capstones) ---
        { id: 'infinity_heart', name: 'INFINITY HEART', type: 'accessory', hpMult: 0.80, regen: 10, armor: 15, rarity: 'legendary', desc: '+80% HP, +10HP/Turn, +15 Armor. Eternal life.' },
        { id: 'dev_console', name: 'ADMIN CONSOLE', type: 'accessory', critChance: 0.40, critDamage: 0.80, manaMult: 0.40, rarity: 'legendary', desc: '+40% Crit, +80% Crit DMG, +40% Mana. Developer mode.' },
        { id: 'phantom_engine', name: 'GHOST ENGINE', type: 'accessory', dodge: 0.45, atkMult: 0.25, critChance: 0.15, rarity: 'legendary', desc: '+45% Dodge, +25% ATK, +15% Crit. Never hit.' },
        { id: 'perfect_core', name: 'OMNIPOTENT ORB', type: 'accessory', atkMult: 0.30, hpMult: 0.30, manaMult: 0.30, critChance: 0.15, dodge: 0.15, lifesteal: 0.15, armor: 10, rarity: 'legendary', desc: 'Ascension complete. All stats massively increased.' },
        { id: 'chaos_relic', name: 'CHAOS ENGINE', type: 'accessory', atkMult: 1.00, hpMult: -0.30, critChance: 0.35, critDamage: 1.00, lifesteal: 0.20, rarity: 'legendary', desc: '+100% ATK, -30% HP, +35% Crit, +100% Crit DMG, +20% Lifesteal. Live fast, die never.' }
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
        // 0-9: NEON-RONIN
        {
            name: "NEON-RONIN", desc: "Tier 1: Core Systems", skills: [
                { name: "NEON SLASH", cost: 0, mult: 1.2, color: 0xaa00ff, vfx: 'slash', hits: 1, desc: "A precision strike with a neon-charged blade." },
                { name: "SYSTEM DIVIDE", cost: 25, mult: 3.0, color: 0xff0055, vfx: 'heavy', hits: 1, desc: "A high-output strike designed to bypass basic shields." },
                { name: "BLADE FOCUS", cost: 20, isBuff: true, buffType: 'crit', buffVal: 0.15, duration: 8, color: 0xaa00ff, desc: "Sharpen your intent, increasing critical strike chance by 15%." }
            ]
        },
        // 10-19: SHADOW-STRIKER
        {
            name: "SHADOW-STRIKER", desc: "Tier 2: Evasion Overclock", skills: [
                { name: "PHANTOM CUT", cost: 0, mult: 0.5, color: 0x9900ff, vfx: 'multi', hits: 3, desc: "Triple-strike from the shadows before the enemy can respond." },
                { name: "ASSASSINATE", cost: 40, mult: 4.5, color: 0xff0000, vfx: 'crit', hits: 1, desc: "A lethal thrust aimed at the target's weakest logic gate." },
                { name: "SHADOW CLOAK", cost: 25, isBuff: true, buffType: 'dodge', buffVal: 0.25, duration: 8, color: 0x9900ff, desc: "Bend light around your chassis to gain 25% dodge chance." }
            ]
        },
        // 20-29: VELOCITY-BLADE
        {
            name: "VELOCITY-BLADE", desc: "Tier 3: Rapid Acceleration", skills: [
                { name: "VELOCITY SLASH", cost: 0, mult: 0.4, color: 0xffffff, vfx: 'slash', hits: 5, desc: "A flurry of cuts delivered at hyperspeed." },
                { name: "OMNI-STRIKE", cost: 50, mult: 0.7, color: 0xaa00ff, vfx: 'omni', hits: 10, desc: "Unleash a whirlwind of steel, striking from every angle at once." },
                { name: "MOMENTUM", cost: 30, isBuff: true, buffType: 'doubleStrike', buffVal: 0.35, duration: 8, color: 0xffffff, desc: "Overclock your neural link for 35% double strike chance." }
            ]
        },
        // 30-39: DARK-RONIN
        {
            name: "DARK-RONIN", desc: "Tier 4: Void Corruption", skills: [
                { name: "VOID SLASH", cost: 0, mult: 0.35, color: 0x330033, vfx: 'implode', hits: 8, desc: "Cover the field in data-shrouding darkness, striking repeatedly." },
                { name: "DEATH MARK", cost: 70, mult: 9.0, color: 0x550055, vfx: 'heavy', hits: 1, desc: "Heavy-impact blow that designates the target for immediate deletion." },
                { name: "DARK PACT", cost: 35, isBuff: true, buffType: 'lifesteal', buffVal: 0.25, duration: 8, color: 0x550055, desc: "Engage a hunger protocol to gain 25% lifesteal." }
            ]
        },
        // 40-49: BLOOD-SAMURAI
        {
            name: "BLOOD-SAMURAI", desc: "Tier 5: Hunger Protocol", skills: [
                { name: "HEMORRHAGE", cost: 0, mult: 0.3, color: 0xff0000, vfx: 'multi', hits: 12, desc: "Jagged cuts that cause critical integrity leaks across 12 strikes." },
                { name: "VAMPIRISM", cost: 90, mult: 2.0, color: 0xaa0000, vfx: 'implode', hits: 6, healPercent: 0.25, desc: "Drain enemy essence to repair 25% HP while dealing damage." },
                { name: "BLOOD LUST", cost: 40, isBuff: true, buffType: 'atk', buffVal: 0.40, duration: 8, color: 0xff0000, desc: "Channel the heat of battle into 40% more pure ATK power." }
            ]
        },
        // 50-59: PHASE-STALKER
        {
            name: "PHASE-STALKER", desc: "Tier 6: Dimensional Shifting", skills: [
                { name: "PHASE CUT", cost: 0, mult: 0.25, color: 0x00ffff, vfx: 'beam', hits: 15, desc: "Phased blade strikes that ignore standard shielding protocols." },
                { name: "SPIRIT BANE", cost: 110, mult: 14.0, color: 0x00aaff, vfx: 'crit', hits: 1, desc: "A powerful strike that tears into the target's operating essence." },
                { name: "ETHER FORM", cost: 45, isBuff: true, buffType: 'dodge', buffVal: 0.45, duration: 8, color: 0x00ffff, desc: "Phase out of standard dimensions for a massive 45% dodge bonus." }
            ]
        },
        // 60-69: VOID-BLADE
        {
            name: "VOID-BLADE", desc: "Tier 7: Singularity Specialist", skills: [
                { name: "SINGULARITY SLASH", cost: 0, mult: 0.2, color: 0x111111, vfx: 'implode', hits: 20, desc: "Compress space-time into a vortex of 20 crushing slashes." },
                { name: "EVENT HORIZON", cost: 130, mult: 18.0, color: 0x000000, vfx: 'blackhole', hits: 1, desc: "A singular strike that swallows all light and hope." },
                { name: "VOID FOCUS", cost: 50, isBuff: true, buffType: 'critDamage', buffVal: 0.60, duration: 8, color: 0x111111, desc: "Empower your blade with the void, increasing Crit DMG by 60%." }
            ]
        },
        // 70-79: TIME-RONIN
        {
            name: "TIME-RONIN", desc: "Tier 8: Temporal Acceleration", skills: [
                { name: "CHRONO STRIKE", cost: 0, mult: 0.18, color: 0xffff00, vfx: 'omni', hits: 25, desc: "Strike at speeds that fracture the local time-stream." },
                { name: "PARADOX", cost: 160, mult: 1.0, color: 0xffffff, vfx: 'beam', hits: 25, desc: "A blinding flurry of 25 strikes delivered across multiple timelines." },
                { name: "TEMPORAL ACCEL", cost: 60, isBuff: true, buffType: 'doubleStrike', buffVal: 0.60, duration: 8, color: 0xffff00, desc: "Overclock your actuators for 60% double strike probability." }
            ]
        },
        // 80-89: DIMENSION-SLAYER
        {
            name: "DIMENSION-SLAYER", desc: "Tier 9: Reality Weaver", skills: [
                { name: "REALITY SHATTER", cost: 0, mult: 0.15, color: 0xff0055, vfx: 'implode', hits: 30, desc: "30 strikes that tear through the local fabric of reality." },
                { name: "WORLD ENDER", cost: 200, mult: 30.0, color: 0xff0055, vfx: 'nuke', hits: 1, desc: "A final, cataclysmic strike that forces a system-wide reboot." },
                { name: "UNSTABLE POWER", cost: 70, isBuff: true, buffType: 'all_offense', buffVal: 0.40, duration: 8, color: 0xff0055, desc: "Surge with unstable code, gaining 40% ATK, Crit, and Crit DMG." }
            ]
        },
        // 90+: CYBER-SHOGUN
        {
            name: "CYBER-SHOGUN", desc: "Tier 10: Ultimate Pinnacle", skills: [
                { name: "FINAL DELETION", cost: 0, mult: 0.12, color: 0xffffff, vfx: 'omni', hits: 50, desc: "A definitive 50-strike clearing operation." },
                { name: "ZERO DAY", cost: 250, mult: 50.0, color: 0x00f2ff, vfx: 'nuke', hits: 1, desc: "A flawless exploit that deletes the enemy's logic entirely." },
                { name: "SHOGUN'S RULE", cost: 100, isBuff: true, buffType: 'all_offense', buffVal: 1.0, duration: 10, color: 0x00f2ff, desc: "Absolute mastery: +100% to all offensive stats for 10 turns." }
            ]
        }
    ],

    "PRIEST": [
        // 0-9: Low Hit Count / High Utility
        {
            name: "TECH-PRIEST", desc: "Tier 1: Basics", skills: [
                { name: "ZAP", cost: 0, mult: 0.8, color: 0xffff00, vfx: 'zap', hits: 1, manaGain: 8, desc: "A quick discharge of static energy that jumpstarts your mana reserves." },
                { name: "SMITE", cost: 30, mult: 2.0, color: 0x00f2ff, vfx: 'beam', hits: 1, healPercent: 0.15, desc: "Call down a column of purifying light to punish systems and heal 15% HP." },
                { name: "BLESSING", cost: 15, isBuff: true, buffType: 'regen', buffVal: 0.05, duration: 8, color: 0x00ff00, desc: "Surround yourself with a field of restorative nano-drones (5% HP/Turn)." }
            ]
        },
        // 10-19
        {
            name: "CYBER-BISHOP", desc: "Tier 2: Holy", skills: [
                { name: "SIPHON", cost: 0, mult: 0.5, color: 0xffffaa, vfx: 'drain', hits: 2, manaGain: 15, desc: "Drain the target's data packets to quickly replenish your own energy." },
                { name: "HOLY NOVA", cost: 50, mult: 1.0, color: 0x00ffff, vfx: 'nova', hits: 3, healPercent: 0.25, desc: "A radiant burst that disrupts enemy systems while mending 25% HP." },
                { name: "SANCTUARY", cost: 25, isBuff: true, buffType: 'shield', buffVal: 0.25, duration: 8, color: 0x00ffff, desc: "Project a holy shield that absorbs 25% of Max HP as damage." }
            ]
        },
        // 20-29
        {
            name: "DEUS-EX", desc: "Tier 3: Machine", skills: [
                { name: "DATA DRAIN", cost: 0, mult: 0.4, color: 0x00ff00, vfx: 'matrix', hits: 3, manaGain: 25, desc: "Aggressively extract metadata from the enemy to fuel high-tier scripts." },
                { name: "REBOOT", cost: 80, mult: 5.0, color: 0x00ffaa, vfx: 'nova', hits: 1, healPercent: 0.50, desc: "Execute a full-system refresh, clearing errors and restoring 50% HP." },
                { name: "FIREWALL", cost: 30, isBuff: true, buffType: 'armor', buffVal: 0.15, duration: 8, color: 0x00ff00, desc: "Update your defensive protocols to grant +15% Armor." }
            ]
        },
        // 30-39
        {
            name: "ANGEL-MK1", desc: "Tier 4: Flight", skills: [
                { name: "LASER WING", cost: 0, mult: 0.35, color: 0xffffff, vfx: 'beam', hits: 4, manaGain: 30, desc: "Unfurl wings of coherent light that draw power from the enviroment." },
                { name: "HEAVENLY RAY", cost: 100, mult: 2.0, color: 0xffffdd, vfx: 'god_beam', hits: 4, healPercent: 0.40, desc: "A concentrated beam of divine power that burns the unholy and heals 40% HP." },
                { name: "DIVINE GRACE", cost: 35, isBuff: true, buffType: 'regen', buffVal: 0.10, duration: 8, color: 0xffffff, desc: "Invoke a higher-tier maintenance routine for 10% HP regen per turn." }
            ]
        },
        // 40-49
        {
            name: "ORACLE", desc: "Tier 5: Sight", skills: [
                { name: "PREDICTION", cost: 0, mult: 0.3, color: 0xaa00ff, vfx: 'zap', hits: 5, manaGain: 40, desc: "Process combat variables in advance, striking precisely to optimize mana gain." },
                { name: "FATE SEAL", cost: 120, mult: 10.0, color: 0xdd00ff, vfx: 'implode', hits: 1, healPercent: 0.60, desc: "Imprint a terminal command upon the target, using the feedback to repair 60% HP." },
                { name: "FORESIGHT", cost: 40, isBuff: true, buffType: 'dodge', buffVal: 0.35, duration: 8, color: 0xaa00ff, desc: "Predict enemy movements with 35% accuracy for effortless dodging." }
            ]
        },
        // 50-59
        {
            name: "HIGH-TEMPLAR", desc: "Tier 6: Storm", skills: [
                { name: "PSIONIC STORM", cost: 0, mult: 0.25, color: 0x0000ff, vfx: 'rain', hits: 6, manaGain: 10, desc: "Unleash a chaotic torrent of mental energy to harvest mana." },
                { name: "FEEDBACK", cost: 150, mult: 12.0, color: 0x00aaff, vfx: 'nova', hits: 1, healPercent: 0.80, desc: "Reverse the target's logic against them, using the heat to heal 80% HP." },
                { name: "PSI SHIELD", cost: 45, isBuff: true, buffType: 'shield', buffVal: 100, duration: 8, color: 0x0000ff, desc: "Shape raw psionic energy into a field that absorbs 100 damage." }
            ]
        },
        // 60-69
        {
            name: "SERAPHIM", desc: "Tier 7: Fire", skills: [
                { name: "HOLY FIRE", cost: 0, mult: 0.2, color: 0xffaa00, vfx: 'beam', hits: 8, manaGain: 50, desc: "Purge the digital realm with sacred flames that fuel your mana capacitor." },
                { name: "PURGATORY", cost: 180, mult: 3.0, color: 0xff5500, vfx: 'nuke', hits: 5, healPercent: 1.0, desc: "An area-of-effect blast that cleanses the field and repairs 100% HP." },
                { name: "WINGS OF LIGHT", cost: 50, isBuff: true, buffType: 'thorns', buffVal: 0.30, duration: 8, color: 0xffaa00, desc: "Harden your light-wings to reflect 30% of incoming damage." }
            ]
        },
        // 70-79
        {
            name: "ARCHON", desc: "Tier 8: Power", skills: [
                { name: "POWER OVERWHELM", cost: 0, mult: 0.18, color: 0x00f2ff, vfx: 'omni', hits: 10, manaGain: 60, desc: "Push your psionic output to the limit, striking 10 times in one blast." },
                { name: "ARCHON BEAM", cost: 220, mult: 2.0, color: 0x00f2ff, vfx: 'god_beam', hits: 10, healPercent: 1.5, desc: "Ascend to a state of pure energy, dealing massive damage and healing 150% HP." },
                { name: "TRANSCENDENCE", cost: 55, isBuff: true, buffType: 'all_defense', buffVal: 0.25, duration: 8, color: 0x00f2ff, desc: "Reach theoretical perfection, boosting all defensive stats by 25%." }
            ]
        },
        // 80-89
        {
            name: "SOURCE-CODE", desc: "Tier 9: Admin", skills: [
                { name: "REWRITE", cost: 0, mult: 0.15, color: 0x00ff00, vfx: 'matrix', hits: 12, manaGain: 100, desc: "Directly modify the target's code in real-time for massive mana gain." },
                { name: "DELETE", cost: 250, mult: 30.0, color: 0xff0000, vfx: 'blackhole', hits: 1, healPercent: 2.0, desc: "Issue a terminal DELETE command. Irreversible, devastating, and repairs 200% HP." },
                { name: "SUDO HEAL", cost: 60, isBuff: true, buffType: 'regen', buffVal: 0.20, duration: 8, color: 0x00ff00, desc: "Override all system safety limits for a permanent 20% HP/Turn regen." }
            ]
        },
        // 90+
        {
            name: "DIGITAL-GOD", desc: "Tier 10: Omni", skills: [
                { name: "CREATION", cost: 0, mult: 0.4, color: 0xffffff, vfx: 'god_beam', hits: 15, manaGain: 999, desc: "Manifest reality from the void, gaining infinite energy from the process." },
                { name: "RAPTURE", cost: 400, mult: 60.0, color: 0xffd700, vfx: 'nova', hits: 1, healPercent: 10.0, desc: "The ultimate transcendence. A total system purge and 1000% HP restoration." },
                { name: "IMPERISHABLE", cost: 100, isBuff: true, buffType: 'shield', buffVal: 5.0, duration: 8, color: 0xffffff, desc: "Transcend the concept of damage to absorb 500% Max HP worth of integrity." }
            ]
        }
    ],

    "MECH": [
        // 0-9: High Hit Count Specialist
        {
            name: "HEAVY-MECH", desc: "Tier 1: Basics", skills: [
                { name: "GATLING", cost: 0, mult: 0.3, color: 0xffaa00, vfx: 'gatling', hits: 3, desc: "A rapid-fire barrage from a tri-barrel heavy machine gun." },
                { name: "MISSILE", cost: 30, mult: 3.0, color: 0xff5500, vfx: 'explode', hits: 1, desc: "Launch a heat-seeking high-explosive warhead for massive singular impact." },
                { name: "IRON WALL", cost: 20, isBuff: true, buffType: 'armor', buffVal: 0.15, duration: 8, color: 0xaaaaaa, desc: "Reinforce your outer plating with +15% Armor." }
            ]
        },
        // 10-19
        {
            name: "WAR-TITAN", desc: "Tier 2: Dakka", skills: [
                { name: "ROTARY", cost: 0, mult: 0.2, color: 0xff9900, vfx: 'gatling', hits: 6, desc: "Spin up dual-rotary cannons for a relentless hail of lead." },
                { name: "NUKE", cost: 50, mult: 5.0, color: 0xff2200, vfx: 'nuke', hits: 1, desc: "Deploy a tactical nuclear device for localized catastrophic damage." },
                { name: "SIEGE MODE", cost: 25, isBuff: true, buffType: 'atk', buffVal: 0.25, duration: 8, color: 0xff9900, desc: "Sacrifice mobility to reroute all power to weapon systems (+25% ATK)." }
            ]
        },
        // 20-29
        {
            name: "APOCALYPSE", desc: "Tier 3: Barrage", skills: [
                { name: "BULLET HELL", cost: 0, mult: 0.15, color: 0xffaa00, vfx: 'gatling', hits: 12, desc: "An overwhelming curtain of fire that leaves no room for evasion." },
                { name: "BUNKER BUSTER", cost: 80, mult: 7.0, color: 0xff0000, vfx: 'nuke', hits: 1, desc: "A heavy, armor-piercing shell designed to penetrate the thickest hulls." },
                { name: "AMMO FEED", cost: 30, isBuff: true, buffType: 'manaRegen', buffVal: 0.30, duration: 8, color: 0xffaa00, desc: "Optimize ammunition supply lines to boost Mana Regen by 30%." }
            ]
        },
        // 30-39
        {
            name: "ARTILLERY", desc: "Tier 4: Long Range", skills: [
                { name: "HOWITZER", cost: 0, mult: 2.0, color: 0xaa5500, vfx: 'heavy', hits: 1, desc: "Fire a massive, long-range shell with enough force to shatter skyscrapers." },
                { name: "CARPET BOMB", cost: 100, mult: 0.5, color: 0xff5500, vfx: 'rain', hits: 20, desc: "Blanket the area in 20 high-explosive sub-munitions." },
                { name: "ENTRENCH", cost: 35, isBuff: true, buffType: 'armor', buffVal: 0.40, duration: 8, color: 0xaa5500, desc: "Deploy stabilizers to lock your chassis and gain +40% Armor." }
            ]
        },
        // 40-49
        {
            name: "LASER-CORE", desc: "Tier 5: Energy", skills: [
                { name: "PULSE RIFLE", cost: 0, mult: 0.12, color: 0x00f2ff, vfx: 'beam', hits: 25, desc: "A high-frequency energy weapon that fires 25 rapid-response pulses." },
                { name: "ION CANNON", cost: 120, mult: 12.0, color: 0x00ffff, vfx: 'god_beam', hits: 1, desc: "Charge a massive ion beam that disrupts molecular bonds on impact." },
                { name: "POWER CORE", cost: 40, isBuff: true, buffType: 'critDamage', buffVal: 0.40, duration: 8, color: 0x00f2ff, desc: "Overclock your internal reactor to supercharge Crit DMG by 40%." }
            ]
        },
        // 50-59
        {
            name: "FORTRESS", desc: "Tier 6: Defense", skills: [
                { name: "FLAK", cost: 0, mult: 0.1, color: 0xffff00, vfx: 'explode', hits: 35, desc: "Explosive anti-matter shells that fill the air with lethal shrapnel." },
                { name: "DOOMSDAY", cost: 150, mult: 15.0, color: 0xff0000, vfx: 'nuke', hits: 1, desc: "Initiate a terminal countdown for a truly apocalyptic explosion." },
                { name: "BUNKER", cost: 45, isBuff: true, buffType: 'shield', buffVal: 0.50, duration: 8, color: 0xffff00, desc: "Deploy a heavy-duty energy field capable of absorbing 50% Max HP as damage." }
            ]
        },
        // 60-69
        {
            name: "GUNDAM-X", desc: "Tier 7: Mobile", skills: [
                { name: "BEAM SABER", cost: 0, mult: 1.0, color: 0xff00ff, vfx: 'slash', hits: 4, desc: "Unsheathe a plasma-edged blade for close-quarters mobile combat." },
                { name: "FULL BURST", cost: 180, mult: 0.08, color: 0x00ff00, vfx: 'omni', hits: 50, desc: "Simultaneously fire all 50 weapon systems in a mobile barrage." },
                { name: "TRANS-AM", cost: 50, isBuff: true, buffType: 'all_offense', buffVal: 0.20, duration: 8, color: 0xff00ff, desc: "Push propulsion systems into a red-line state, +20% All Offense." }
            ]
        },
        // 70-79
        {
            name: "DREADNOUGHT", desc: "Tier 8: Space", skills: [
                { name: "MACRO CANNON", cost: 0, mult: 1.5, color: 0xaaaaff, vfx: 'heavy', hits: 3, desc: "Fire ship-grade magnetic slugs for heavy kinetic impacts." },
                { name: "EXTERMINATUS", cost: 220, mult: 0.4, color: 0xffaa00, vfx: 'rain', hits: 60, desc: "Call down a 60-strike saturation bombardment from orbital platforms." },
                { name: "VOID SHIELDS", cost: 55, isBuff: true, buffType: 'shield', buffVal: 1.0, duration: 8, color: 0xaaaaff, desc: "Layer your chassis in ripples of space-time to absorb 100% Max HP as damage." }
            ]
        },
        // 80-89
        {
            name: "WORLD-EATER", desc: "Tier 9: Planetary", skills: [
                { name: "CRUST CRACK", cost: 0, mult: 0.07, color: 0xff5500, vfx: 'implode', hits: 75, desc: "Use high-frequency sonic resonance to shatter the target's hull." },
                { name: "CORE DETONATE", cost: 260, mult: 40.0, color: 0xff0000, vfx: 'nuke', hits: 1, desc: "Infiltrate the target's drive core and force a catastrophic meltdown." },
                { name: "TITAN MIGHT", cost: 60, isBuff: true, buffType: 'atk', buffVal: 1.0, duration: 8, color: 0xff5500, desc: "Channel the reactor's full output into physical striking force (+100% ATK)." }
            ]
        },
        // 90+
        {
            name: "ANNIHILATOR", desc: "Tier 10: Universal", skills: [
                { name: "ZERO POINT", cost: 0, mult: 0.06, color: 0xffffff, vfx: 'gatling', hits: 100, desc: "Tap into vacuum energy for 100 hits of pure, infinite power." },
                { name: "SUPERNOVA", cost: 400, mult: 80.0, color: 0xffaa00, vfx: 'nuke', hits: 1, desc: "The absolute limit of energy output. A solar-level annihilation blast." },
                { name: "OMEGA PROTOCOL", cost: 80, isBuff: true, buffType: 'all_offense', buffVal: 0.50, duration: 8, color: 0xffd700, desc: "Disable all safety limiters to achieve 50% more offensive power." }
            ]
        }
    ],

    "SHADOW": [
        // 0-9: Quick Hits
        {
            name: "SHADE", desc: "Tier 1: Stealth", skills: [
                { name: "BACKSTAB", cost: 0, mult: 1.2, color: 0x220033, vfx: 'slash', hits: 1, desc: "Strike from the dark with a high-torque serrated combat knife." },
                { name: "POISON BLADE", cost: 25, mult: 0.5, color: 0x00ff00, vfx: 'multi', hits: 4, desc: "A series of quick nicks that deliver concentrated neurotoxin." },
                { name: "VANISH", cost: 20, isBuff: true, buffType: 'dodge', buffVal: 0.30, duration: 8, color: 0x220033, desc: "Hard-reset enemy sensors to gain a massive 30% dodge bonus." }
            ]
        },
        // 10-19
        {
            name: "VENOM-WEAVER", desc: "Tier 2: Toxins", skills: [
                { name: "TOXIC SLASH", cost: 0, mult: 0.3, color: 0x00aa00, vfx: 'multi', hits: 5, desc: "Five precise cuts that leave a lingering trail of caustic logic." },
                { name: "VENOM BURST", cost: 45, mult: 4.5, color: 0x00ff00, vfx: 'implode', hits: 1, desc: "Detonate the toxins in the target's system for total integrity failure." },
                { name: "NEUROTOXIN", cost: 25, isBuff: true, buffType: 'crit', buffVal: 0.20, duration: 8, color: 0x00ff00, desc: "Infect the target's neural link to increase Crit Chance by 20%." }
            ]
        },
        // 20-29
        {
            name: "PHANTOM", desc: "Tier 3: Intangible", skills: [
                { name: "PHASE STRIKE", cost: 0, mult: 0.25, color: 0x8800aa, vfx: 'slash', hits: 7, desc: "Rapidly shift in and out of phase, striking 7 times from ethereal angles." },
                { name: "SOUL DRAIN", cost: 55, mult: 2.5, color: 0xaa00ff, vfx: 'implode', hits: 2, healPercent: 0.15, desc: "Phased strikes that extract 15% Max HP worth of restorative data." },
                { name: "PHASE SHIFT", cost: 30, isBuff: true, buffType: 'invincible', buffVal: 1, duration: 8, color: 0x8800aa, desc: "Desynchronize from reality, becoming untouchable for 1 turn." }
            ]
        },
        // 30-39
        {
            name: "DEATH-DEALER", desc: "Tier 4: Execute", skills: [
                { name: "MARKED DEATH", cost: 0, mult: 0.22, color: 0x440044, vfx: 'crit', hits: 10, desc: "Execute a 10-hit sequence aimed at terminal vulnerabilities." },
                { name: "EXECUTE ORDER", cost: 75, mult: 8.0, color: 0xff0044, vfx: 'heavy', hits: 1, desc: "A heavy final strike that executes the target's deletion process." },
                { name: "DEATH MARK", cost: 35, isBuff: true, buffType: 'critDamage', buffVal: 0.50, duration: 8, color: 0xff0044, desc: "Mark the target for destruction, increasing Crit DMG by 50%." }
            ]
        },
        // 40-49
        {
            name: "NIGHTMARE", desc: "Tier 5: Fear", skills: [
                { name: "TERROR", cost: 0, mult: 0.2, color: 0x110011, vfx: 'implode', hits: 12, desc: "Induce system-wide failure through subsonic dread frequencies." },
                { name: "NIGHT TERROR", cost: 90, mult: 3.0, color: 0x330033, vfx: 'blackhole', hits: 3, desc: "Manifest the target's worst digital nightmares across 3 haunting hits." },
                { name: "FEAR AURA", cost: 40, isBuff: true, buffType: 'lifesteal', buffVal: 0.25, duration: 8, color: 0x330033, desc: "Feed on the target's frantic logic to gain 25% lifesteal." }
            ]
        },
        // 50-59
        {
            name: "GRIM-REAPER", desc: "Tier 6: Death", skills: [
                { name: "SCYTHE SWEEP", cost: 0, mult: 0.18, color: 0x000000, vfx: 'slash', hits: 15, desc: "A wide arc that reaps the integrity of anything in its path." },
                { name: "REAP SOULS", cost: 110, mult: 2.0, color: 0x440044, vfx: 'implode', hits: 5, healPercent: 0.25, desc: "A terminal sequence that harvests 25% Max HP worth of essence." },
                { name: "DEATH'S DOOR", cost: 45, isBuff: true, buffType: 'crit', buffVal: 0.35, duration: 8, color: 0x000000, desc: "Stare into the abyss to find 35% more critical opportunities." }
            ]
        },
        // 60-69
        {
            name: "WRAITH-LORD", desc: "Tier 7: Ethereal", skills: [
                { name: "SPECTRAL BLADES", cost: 0, mult: 0.16, color: 0x6600aa, vfx: 'omni', hits: 20, desc: "20 strikes from a plane that bypasses all physical armor." },
                { name: "SOUL SHATTER", cost: 140, mult: 12.0, color: 0xaa00ff, vfx: 'blackhole', hits: 1, desc: "A crushing blow that disintegrates the target's core system." },
                { name: "WRAITH FORM", cost: 50, isBuff: true, buffType: 'invincible', buffVal: 1, duration: 8, color: 0x6600aa, desc: "Ascend to a fully ethereal state, gaining invincibility for 2 turns." }
            ]
        },
        // 70-79
        {
            name: "VOID-FANG", desc: "Tier 8: Void", skills: [
                { name: "VOID FANGS", cost: 0, mult: 0.15, color: 0x220022, vfx: 'multi', hits: 25, desc: "25 rapid strikes from the mouth of the true void." },
                { name: "ANNIHILATE", cost: 170, mult: 18.0, color: 0x000000, vfx: 'blackhole', hits: 1, desc: "Delete the target from the current timeline using a white-hole." },
                { name: "VOID EMBRACE", cost: 55, isBuff: true, buffType: 'all_offense', buffVal: 0.25, duration: 8, color: 0x220022, desc: "Wrap yourself in the void to boost all offense by 25%." }
            ]
        },
        // 80-89
        {
            name: "ENTROPY", desc: "Tier 9: Decay", skills: [
                { name: "DECAY", cost: 0, mult: 0.14, color: 0x003300, vfx: 'implode', hits: 30, desc: "Observe the slow, inevitable collapse of structural integrity." },
                { name: "ENTROPY WAVE", cost: 200, mult: 30.0, color: 0x006600, vfx: 'nova', hits: 1, desc: "A ripple of pure chaos that resets the target to base components." },
                { name: "CHAOS FIELD", cost: 60, isBuff: true, buffType: 'critDamage', buffVal: 0.75, duration: 8, color: 0x003300, desc: "A state of total entropy where every hit is 75% more critical." }
            ]
        },
        // 90+
        {
            name: "OBLIVION", desc: "Tier 10: End", skills: [
                { name: "OBLIVION", cost: 0, mult: 0.12, color: 0x000000, vfx: 'blackhole', hits: 40, desc: "40 strikes that pull the target closer to the absolute end." },
                { name: "TRUE DEATH", cost: 350, mult: 100.0, color: 0x220022, vfx: 'blackhole', hits: 1, desc: "The final command. 100x multiplier. There is nothing after this." },
                { name: "DEATH AVATAR", cost: 80, isBuff: true, buffType: 'all_offense', buffVal: 0.60, duration: 8, color: 0x000000, desc: "Become the personification of the end, +60% to all offense." }
            ]
        }
    ],

    "BRAWLER": [
        // 0-9: BASE
        {
            name: "STREET-PUNK", desc: "Tier 1: Speed", skills: [
                { name: "JAB", cost: 0, mult: 0.1, color: 0xff4400, vfx: 'punch', hits: 5, desc: "Deliver 5 rapid punches that pummel the target's core." },
                { name: "HAYMAKER", cost: 25, mult: 0.25, color: 0xff6600, vfx: 'heavy', hits: 8, desc: "A sweeping barrage of 8 heavy-duty strikes." },
                { name: "ADRENALINE", cost: 15, isBuff: true, buffType: 'atk', buffVal: 0.20, duration: 8, color: 0xff4400, desc: "Flood your actuators with combat-stims for 20% more ATK Power." }
            ]
        },
        // 10-19
        {
            name: "CHROME-BOXER", desc: "Tier 2: Combos", skills: [
                { name: "ONE-TWO", cost: 0, mult: 0.08, color: 0xff5500, vfx: 'punch', hits: 10, desc: "A technical combo consisting of 10 lightning-fast strikes." },
                { name: "UPPERCUT", cost: 40, mult: 0.2, color: 0xff7700, vfx: 'heavy', hits: 12, desc: "Launch the enemy with a 12-hit vertical assault." },
                { name: "RAGE MODE", cost: 20, isBuff: true, buffType: 'atk', buffVal: 0.30, duration: 8, color: 0xff5500, desc: "Tap into your primal fury to boost ATK by 30%." }
            ]
        },
        // 20-29
        {
            name: "CYBER-KICK", desc: "Tier 3: Kicks", skills: [
                { name: "RAPID KICKS", cost: 0, mult: 0.06, color: 0xff6600, vfx: 'punch', hits: 15, desc: "A 15-kick hydraulic sequence that shatters steel." },
                { name: "ROUNDHOUSE", cost: 55, mult: 0.15, color: 0xff8800, vfx: 'slash', hits: 18, desc: "A spinning kick that delivers 18 continuous impacts." },
                { name: "FIGHTING SPIRIT", cost: 25, isBuff: true, buffType: 'atk', buffVal: 0.40, duration: 8, color: 0xff6600, desc: "Ignite your internal fire for a sustained 40% ATK boost." }
            ]
        },
        // 30-39
        {
            name: "GRAPPLER", desc: "Tier 4: Throws", skills: [
                { name: "COMBO STRIKE", cost: 0, mult: 0.05, color: 0xff7700, vfx: 'punch', hits: 20, desc: "A 20-hit technical sequence involving every limb." },
                { name: "PILEDRIVER", cost: 70, mult: 0.1, color: 0xff9900, vfx: 'heavy', hits: 25, desc: "A sustained 25-hit wrestling sequence into a seismic slam." },
                { name: "IRON BODY", cost: 30, isBuff: true, buffType: 'atk', buffVal: 0.50, duration: 8, color: 0xff7700, desc: "Harden your resolve and your metal for a permanent 50% ATK boost." }
            ]
        },
        // 40-49
        {
            name: "BERSERKER", desc: "Tier 5: Fury", skills: [
                { name: "BARRAGE", cost: 0, mult: 0.04, color: 0xff2200, vfx: 'punch', hits: 30, desc: "30 punches delivered in a wild, unhinged barrage." },
                { name: "RAMPAGE", cost: 85, mult: 0.08, color: 0xff0000, vfx: 'omni', hits: 35, desc: "Tear through the enemy with 35 omni-directional blows." },
                { name: "BLOOD FURY", cost: 35, isBuff: true, buffType: 'atk', buffVal: 0.60, duration: 8, color: 0xff2200, desc: "Enter a state of total combat madness, gaining 60% extra ATK Power." }
            ]
        },
        // 50-59
        {
            name: "PIT-CHAMPION", desc: "Tier 6: Glory", skills: [
                { name: "FLURRY", cost: 0, mult: 0.035, color: 0xffaa00, vfx: 'punch', hits: 40, desc: "A professional 40-hit flurry that leaves no openings." },
                { name: "FINISHER", cost: 100, mult: 0.07, color: 0xffcc00, vfx: 'crit', hits: 45, desc: "A final 45-hit sequence to end any simulation." },
                { name: "CHAMPION'S WILL", cost: 40, isBuff: true, buffType: 'atk', buffVal: 0.75, duration: 8, color: 0xffaa00, desc: "The determination to win, manifesting as a 75% ATK boost." }
            ]
        },
        // 60-69
        {
            name: "IRON-TITAN", desc: "Tier 7: Power", skills: [
                { name: "METEOR FISTS", cost: 0, mult: 0.03, color: 0xff5500, vfx: 'punch', hits: 50, desc: "50 punches as heavy as falling stars." },
                { name: "TITAN SMASH", cost: 130, mult: 0.06, color: 0xff8800, vfx: 'nuke', hits: 60, desc: "A double-impact sequence of 60 hits causing tectonic shifts." },
                { name: "UNSTOPPABLE", cost: 45, isBuff: true, buffType: 'atk', buffVal: 1.0, duration: 8, color: 0xff5500, desc: "Become a juggernaut of pure force, doubling your current ATK power." }
            ]
        },
        // 70-79
        {
            name: "GOD-FIST", desc: "Tier 8: Divine", skills: [
                { name: "OMNI-STRIKE", cost: 0, mult: 0.025, color: 0xffd700, vfx: 'omni', hits: 75, desc: "A 75-hit sequence that defies divine physics." },
                { name: "DIVINE STRIKE", cost: 160, mult: 0.05, color: 0xffffff, vfx: 'god_beam', hits: 90, desc: "90 holy punches delivered with the speed of light." },
                { name: "GODLIKE", cost: 50, isBuff: true, buffType: 'atk', buffVal: 1.25, duration: 8, color: 0xffd700, desc: "Ascend to the pinnacle of martial prowess, +125% to all ATK Power." }
            ]
        },
        // 80-89
        {
            name: "STAR-BREAKER", desc: "Tier 9: Cosmic", skills: [
                { name: "STAR RUSH", cost: 0, mult: 0.02, color: 0xffff00, vfx: 'omni', hits: 120, desc: "120 strikes inspired by the collision of galaxies." },
                { name: "GALAXY CRUSHER", cost: 200, mult: 0.04, color: 0xffffff, vfx: 'blackhole', hits: 150, desc: "A 150-hit collapse that crushes entire star systems." },
                { name: "LIMIT BREAK", cost: 55, isBuff: true, buffType: 'atk', buffVal: 1.50, duration: 8, color: 0xffff00, desc: "Remove your physical shackles for a massive 150% ATK boost." }
            ]
        },
        // 90+
        {
            name: "ONE-PUNCH", desc: "Tier 10: END", skills: [
                { name: "SERIOUS PUNCHES", cost: 0, mult: 0.015, color: 0xffffff, vfx: 'omni', hits: 250, desc: "250 absolute punches that guarantee total victory." },
                { name: "THOUSAND PUNCHES", cost: 500, mult: 0.01, color: 0xffd700, vfx: 'nuke', hits: 1000, desc: "The absolute end. 1000 punches in a single blink." },
                { name: "LIMITLESS", cost: 80, isBuff: true, buffType: 'atk', buffVal: 2.0, duration: 8, color: 0xffffff, desc: "Tap into an infinite well of power, tripling your base ATK Power." }
            ]
        }
    ],
    "GUNSLINGER": [
        // 0-9: BASE - High Noon Style
        {
            name: "DRIFTER", desc: "Tier 1: Revolver", skills: [
                { name: "QUICK DRAW", cost: 0, mult: 1.1, color: 0xffaa00, vfx: 'beam', hits: 1, desc: "Draw and fire in one fluid motion, striking with lethal precision." },
                { name: "MAGNUM OPUS", cost: 35, mult: 2.8, color: 0xff4400, vfx: 'heavy', hits: 1, desc: "A high-caliber round that delivers a devastating psychological impact." },
                { name: "DEADEYE", cost: 20, isBuff: true, buffType: 'crit', buffVal: 0.20, duration: 8, color: 0xffaa00, desc: "Focus your vision to increase your Critical Hit Chance by 20%." }
            ]
        },
        // 10-19
        {
            name: "OUTLAW", desc: "Tier 2: Dual Wield", skills: [
                { name: "FAN HAMMER", cost: 0, mult: 0.3, color: 0xffaa00, vfx: 'multi', hits: 6, desc: "Empty the cylinder in a rapid-fire burst of dual-revolver fury." },
                { name: "POINT BLANK", cost: 50, mult: 4.5, color: 0xff0000, vfx: 'explode', hits: 1, desc: "Deliver a high-velocity impact directly to the target's core." },
                { name: "LUCKY COIN", cost: 25, isBuff: true, buffType: 'critDamage', buffVal: 0.30, duration: 8, color: 0xffff00, desc: "Test your fortune to boost your Critical Damage by 30%." }
            ]
        },
        // 20-29
        {
            name: "DESPERADO", desc: "Tier 3: Ricochet", skills: [
                { name: "TRICK SHOT", cost: 0, mult: 0.4, color: 0x00ffff, vfx: 'beam', hits: 5, desc: "A series of shots that bounce off the architecture for 5 hits." },
                { name: "EXPLOSIVE ROUND", cost: 65, mult: 6.0, color: 0xff5500, vfx: 'nuke', hits: 1, desc: "Fire a specialized shell that detonates with catastrophic force." },
                { name: "ADRENALINE", cost: 30, isBuff: true, buffType: 'dodge', buffVal: 0.30, duration: 8, color: 0x00ffff, desc: "Flood your systems with combat-stimulants for 30% more dodge." }
            ]
        },
        // 30-39
        {
            name: "VIGILANTE", desc: "Tier 4: Sniper", skills: [
                { name: "HEADSHOT", cost: 0, mult: 2.5, color: 0xff0000, vfx: 'crit', hits: 1, desc: "A lethal strike to the target's most vulnerable processing unit." },
                { name: "PENETRATOR", cost: 90, mult: 8.5, color: 0xff0000, vfx: 'god_beam', hits: 1, desc: "A ship-grade kinetic slug designed to ignore all armor." },
                { name: "LASER SIGHT", cost: 35, isBuff: true, buffType: 'crit', buffVal: 0.40, duration: 8, color: 0xff0000, desc: "Calibrate your weapons to increase Critical Hit Chance by 40%." }
            ]
        },
        // 40-49
        {
            name: "COMMANDO", desc: "Tier 5: Heavy", skills: [
                { name: "SUPPRESSION", cost: 0, mult: 0.2, color: 0xffff00, vfx: 'gatling', hits: 15, desc: "15 rounds of high-volume fire to keep the enemy pinned down." },
                { name: "RPG", cost: 110, mult: 5.0, color: 0xffaa00, vfx: 'nuke', hits: 2, desc: "Launch a dual-warhead rocket for massive explosive coverage." },
                { name: "GUERRILLA", cost: 40, isBuff: true, buffType: 'armor', buffVal: 0.20, duration: 8, color: 0x55aa00, desc: "Utilize cover and tactical awareness to gain +20% Armor." }
            ]
        },
        // 50-59
        {
            name: "CYBER-COWBOY", desc: "Tier 6: Neon", skills: [
                { name: "PLASMA WHIP", cost: 0, mult: 0.4, color: 0xff00ff, vfx: 'slash', hits: 8, desc: "A high-energy lash that leaves 8 strikes of searing energy." },
                { name: "NEON NOON", cost: 140, mult: 13.0, color: 0xff00ff, vfx: 'god_beam', hits: 1, desc: "Channel the power of the grid into a single, blinding laser beam." },
                { name: "HIGH NOON", cost: 45, isBuff: true, buffType: 'atk', buffVal: 0.50, duration: 8, color: 0xff00ff, desc: "The ultimate showdown. Reroute all power to gain +50% ATK." }
            ]
        },
        // 60-69
        {
            name: "GUN-KATA", desc: "Tier 7: Martial", skills: [
                { name: "BULLET DANCE", cost: 0, mult: 0.15, color: 0xffffff, vfx: 'omni', hits: 25, desc: "A 25-hit whirlwind of lead where every movement is a shot." },
                { name: "EQUILIBRIUM", cost: 170, mult: 16.0, color: 0xffffff, vfx: 'implode', hits: 1, desc: "Achieve personal balance to deliver a perfectly centered killing blow." },
                { name: "FLOW STATE", cost: 50, isBuff: true, buffType: 'doubleStrike', buffVal: 0.40, duration: 8, color: 0xffffff, desc: "Enter a trance-like state to double-strike with 40% probability." }
            ]
        },
        // 70-79
        {
            name: "RAIL-GUNNER", desc: "Tier 8: Magnetic", skills: [
                { name: "GAUSS RIFLE", cost: 0, mult: 1.0, color: 0x00aaff, vfx: 'beam', hits: 4, desc: "Accelerate four magnetic slugs to hypersonic velocities." },
                { name: "HYPER VELOCITY", cost: 200, mult: 20.0, color: 0x00aaff, vfx: 'god_beam', hits: 1, desc: "Deliver a 20x multiplier impact that travels at light-speed." },
                { name: "MAGNETIC FIELD", cost: 55, isBuff: true, buffType: 'shield', buffVal: 1.0, duration: 8, color: 0x00aaff, desc: "Project a containment field that absorbs 100% Max HP as damage." }
            ]
        },
        // 80-89
        {
            name: "EXECUTIONER", desc: "Tier 9: Orbital", skills: [
                { name: "LOCK-ON", cost: 0, mult: 0.1, color: 0xff0000, vfx: 'matrix', hits: 50, desc: "Coordinate 50 micro-missiles to track the target's signature." },
                { name: "ORBITAL STRIKE", cost: 250, mult: 35.0, color: 0xff4400, vfx: 'nuke', hits: 1, desc: "Call down a 35x satellite bombardment from a geosynchronous platform." },
                { name: "KILL PROTOCOL", cost: 60, isBuff: true, buffType: 'critDamage', buffVal: 1.0, duration: 8, color: 0xff0000, desc: "Engage terminal combat logic to double your Critical Damage." }
            ]
        },
        // 90+
        {
            name: "BALLISTIC-GOD", desc: "Tier 10: Infinite", skills: [
                { name: "BULLET HELL", cost: 0, mult: 0.1, color: 0xffd700, vfx: 'gatling', hits: 80, desc: "An 80-hit curtain of fire that defies all possible evasion." },
                { name: "THE BIG IRON", cost: 400, mult: 100.0, color: 0xffd700, vfx: 'god_beam', hits: 1, desc: "The legendary 100x multiplier shot that ends all arguments." },
                { name: "TRIGGER HAPPY", cost: 80, isBuff: true, buffType: 'all_offense', buffVal: 0.75, duration: 8, color: 0xffd700, desc: "+75% to all offense." }
            ]
        }
    ],
    "KNIGHT": [
        // 0-9: BASE - Tank
        {
            name: "SQUIRE", desc: "Tier 1: Defense", skills: [
                { name: "SLASH", cost: 0, mult: 1.0, color: 0xcccccc, vfx: 'slash', hits: 1, desc: "A disciplined vertical strike from a heavy combat blade." },
                { name: "SHIELD BASH", cost: 30, mult: 2.0, color: 0x00aaff, vfx: 'heavy', hits: 1, desc: "Use your defensive plate as a weapon of blunt impact." },
                { name: "SHIELD UP", cost: 20, isBuff: true, buffType: 'shield', buffVal: 0.25, duration: 8, color: 0x00aaff, desc: "Lock your armor plates to absorb 25% Max HP as damage." }
            ]
        },
        // 10-19
        {
            name: "IRON-CLAD", desc: "Tier 2: Armor", skills: [
                { name: "HEAVY SWING", cost: 0, mult: 1.2, color: 0xaaaaaa, vfx: 'slash', hits: 1, desc: "A wide horizontal sweep designed to shatter enemy frames." },
                { name: "IRON STRIKE", cost: 45, mult: 3.5, color: 0x888888, vfx: 'heavy', hits: 1, desc: "A crushing overhead blow that leverages your full chassis weight." },
                { name: "FORTIFY", cost: 25, isBuff: true, buffType: 'armor', buffVal: 0.20, duration: 8, color: 0xaaaaaa, desc: "Reinforce your structural integrity to gain +20% Armor." }
            ]
        },
        // 20-29
        {
            name: "GUARDIAN", desc: "Tier 3: Protector", skills: [
                { name: "JUSTICE", cost: 0, mult: 0.5, color: 0xffd700, vfx: 'beam', hits: 4, desc: "Deliver four strikes fueled by unwavering resolve." },
                { name: "SMITE", cost: 60, mult: 5.0, color: 0xffd700, vfx: 'god_beam', hits: 1, desc: "Call down a beam of pure judgment from the heavens." },
                { name: "HOLY WALL", cost: 35, isBuff: true, buffType: 'shield', buffVal: 0.50, duration: 8, color: 0xffd700, desc: "Raise an energy-barrier capable of absorbing 50% Max HP as damage." }
            ]
        },
        // 30-39
        {
            name: "CRUSADER", desc: "Tier 4: Holy", skills: [
                { name: "DIVINE CUT", cost: 0, mult: 0.8, color: 0xffffff, vfx: 'slash', hits: 3, desc: "A triple-slash sequence performed with ethereal grace." },
                { name: "JUDGEMENT", cost: 90, mult: 7.0, color: 0xffffff, vfx: 'heavy', hits: 1, desc: "Deliver a terminal sentence that hits with 7x force." },
                { name: "DIVINE SHIELD", cost: 40, isBuff: true, buffType: 'shield', buffVal: 0.75, duration: 8, color: 0xffffff, desc: "A blinding aura of protection that absorbs 75% Max HP as damage." }
            ]
        },
        // 40-49
        {
            name: "ROYAL-GUARD", desc: "Tier 5: Elite", skills: [
                { name: "ROYAL SLASH", cost: 0, mult: 0.6, color: 0xff0055, vfx: 'multi', hits: 5, desc: "An elite 5-hit sequence used by the Emperor's Guard." },
                { name: "EXECUTION", cost: 110, mult: 10.0, color: 0xff0000, vfx: 'crit', hits: 1, desc: "A 10x multiplier blow meant for the most dangerous adversaries." },
                { name: "KINGS ARMOR", cost: 45, isBuff: true, buffType: 'all_defense', buffVal: 0.35, duration: 8, color: 0xff0055, desc: "Adorn yourself in the majesty of kings for 35% more total defense." }
            ]
        },
        // 50-59
        {
            name: "CYBER-PALADIN", desc: "Tier 6: Energy", skills: [
                { name: "LASER SWORD", cost: 0, mult: 0.4, color: 0x00f2ff, vfx: 'beam', hits: 8, desc: "8 rapid cuts from a blade made of high-frequency photons." },
                { name: "PLASMA BASH", cost: 140, mult: 12.0, color: 0x00f2ff, vfx: 'implode', hits: 1, desc: "A seismic shield impact infused with ionized plasma." },
                { name: "FORCE FIELD", cost: 50, isBuff: true, buffType: 'shield', buffVal: 1.0, duration: 8, color: 0x00f2ff, desc: "Project a high-density energy field that absorbs 100% Max HP as damage." }
            ]
        },
        // 60-69
        {
            name: "JUGGERNAUT", desc: "Tier 7: Unstoppable", skills: [
                { name: "EARTHQUAKE", cost: 0, mult: 0.3, color: 0x552200, vfx: 'heavy', hits: 12, desc: "A 12-hit seismic resonance that ripples through the ground." },
                { name: "AVALANCHE", cost: 160, mult: 15.0, color: 0x884400, vfx: 'nuke', hits: 1, desc: "Bury the target under a 15x landslide of kinetic energy." },
                { name: "IRON SKIN", cost: 55, isBuff: true, buffType: 'invincible', buffVal: 1, duration: 8, color: 0x888888, desc: "Become a living fortress of steel, gain invincibility for 2 turns." }
            ]
        },
        // 70-79
        {
            name: "VOID-KEEPER", desc: "Tier 8: Null", skills: [
                { name: "VOID SLASH", cost: 0, mult: 0.2, color: 0x220044, vfx: 'slash', hits: 20, desc: "20 strikes delivered from the heart of the absolute void." },
                { name: "BLACK HOLE", cost: 200, mult: 20.0, color: 0x000000, vfx: 'blackhole', hits: 1, desc: "Manifest a localized singularity to devour the enemy." },
                { name: "VOID BARRIER", cost: 60, isBuff: true, buffType: 'shield', buffVal: 1.5, duration: 8, color: 0x220044, desc: "Wrap your chassis in nothingness to absorb 150% Max HP as damage." }
            ]
        },
        // 80-89
        {
            name: "TITAN-SLAYER", desc: "Tier 9: Colossal", skills: [
                { name: "GOD KILLER", cost: 0, mult: 0.15, color: 0xffd700, vfx: 'god_beam', hits: 30, desc: "30 strikes aimed at the core of a divine entity." },
                { name: "HEAVENS FALL", cost: 250, mult: 40.0, color: 0xffffff, vfx: 'nuke', hits: 1, desc: "Bring down the full weight of the sky for 40x damage." },
                { name: "TITAN FORM", cost: 70, isBuff: true, buffType: 'all_defense', buffVal: 0.60, duration: 8, color: 0xffd700, desc: "Ascend to a colossal state, gaining 60% more total defense." }
            ]
        },
        // 90+
        {
            name: "OMNI-KNIGHT", desc: "Tier 10: Invincible", skills: [
                { name: "REALITY SLASH", cost: 0, mult: 0.1, color: 0xffffff, vfx: 'omni', hits: 60, desc: "60 slashes that occur across multiple parallel timelines." },
                { name: "AEGIS STRIKE", cost: 400, mult: 80.0, color: 0x00f2ff, vfx: 'god_beam', hits: 1, desc: "The ultimate 80x strike delivered behind an unbreakable shield." },
                { name: "IMPERISHABLE", cost: 100, isBuff: true, buffType: 'shield', buffVal: 5.0, duration: 8, color: 0xffffff, desc: "Transcend the concept of damage to absorb 500% Max HP worth of integrity." }
            ]
        }
    ],
    "HACKER": [
        // 0-9: BASE - Script Kiddie
        {
            name: "SCRIPT-KID", desc: "Tier 1: Exploit", skills: [
                { name: "PING", cost: 0, mult: 0.5, color: 0x00ff00, vfx: 'zap', hits: 3, manaGain: 10, desc: "Send a small probe to gain 10 Mana and probe for vulnerabilities." },
                { name: "DDOS ATTACK", cost: 40, mult: 3.0, color: 0x00ff00, vfx: 'matrix', hits: 1, desc: "Overwhelm the target's buffers with a 3x flood of packets." },
                { name: "VPN", cost: 20, isBuff: true, buffType: 'dodge', buffVal: 0.20, duration: 8, color: 0x00ff00, desc: "Route your location through multiple proxies for 20% more dodge." }
            ]
        },
        // 10-19
        {
            name: "WHITE-HAT", desc: "Tier 2: Debug", skills: [
                { name: "COMPILE", cost: 0, mult: 1.0, color: 0x00aa00, vfx: 'beam', hits: 1, manaGain: 20, desc: "Refactor your logic to gain 20 Mana and optimize strikes." },
                { name: "FORCE QUIT", cost: 50, mult: 4.5, color: 0xff0000, vfx: 'heavy', hits: 1, desc: "Issues a terminal KILL command to the target process." },
                { name: "FIREWALL", cost: 30, isBuff: true, buffType: 'shield', buffVal: 0.35, duration: 8, color: 0x00aaff, desc: "Deploy a security layer capable of blocking 35% Max HP as damage." }
            ]
        },
        // 20-29
        {
            name: "TROJAN", desc: "Tier 3: Virus", skills: [
                { name: "INJECT", cost: 0, mult: 0.4, color: 0xaa00ff, vfx: 'multi', hits: 6, desc: "Execute 6 malicious code blocks directly into the target's system." },
                { name: "MALWARE", cost: 65, mult: 5.5, color: 0x8800ff, vfx: 'implode', hits: 1, desc: "A slow, corrosive payload that hits with 5.5x force." },
                { name: "SIPHON DATA", cost: 35, isBuff: true, buffType: 'lifesteal', buffVal: 0.25, duration: 8, color: 0xaa00ff, desc: "Leech integrity from the target to gain 25% lifesteal." }
            ]
        },
        // 30-39
        {
            name: "GLITCH", desc: "Tier 4: Bug", skills: [
                { name: "PACKET LOSS", cost: 0, mult: 0.1, color: 0xff00ff, vfx: 'matrix', hits: 20, desc: "A 20-hit sequence that disrupts the target's data flow." },
                { name: "BSOD", cost: 90, mult: 8.0, color: 0x0000ff, vfx: 'blackhole', hits: 1, desc: "Trigger a catastrophic system failure and a Blue Screen of Death." },
                { name: "BUFFER OVRFLW", cost: 40, isBuff: true, buffType: 'doubleStrike', buffVal: 0.40, duration: 8, color: 0xff00ff, desc: "Push calculations past their limits for 40% double-strike." }
            ]
        },
        // 40-49
        {
            name: "BOTNET", desc: "Tier 5: Swarm", skills: [
                { name: "ZOMBIE PC", cost: 0, mult: 0.5, color: 0x555555, vfx: 'gatling', hits: 8, desc: "Command a small swarm of 8 infected bots to strike the target." },
                { name: "SERVER CRASH", cost: 120, mult: 11.0, color: 0xffaa00, vfx: 'nuke', hits: 1, desc: "Deliver an 11x blow that causes total runtime termination." },
                { name: "ROOT ACCESS", cost: 45, isBuff: true, buffType: 'atk', buffVal: 0.40, duration: 8, color: 0x00ff00, desc: "Gain administrative privileges over your own chassis (+40% ATK)." }
            ]
        },
        // 50-59
        {
            name: "CYBER-LICH", desc: "Tier 6: Undead", skills: [
                { name: "NECRO CODE", cost: 0, mult: 0.8, color: 0x00ffaa, vfx: 'omni', hits: 5, desc: "5 strikes from a script that was never meant to be run." },
                { name: "SOUL.EXE", cost: 150, mult: 13.0, color: 0x00ffaa, vfx: 'implode', hits: 1, heal: 200, desc: "A terminal 13x strike that heals 200 HP from harvested logic." },
                { name: "PHYLACTERY", cost: 50, isBuff: true, buffType: 'invincible', buffVal: 1, duration: 8, color: 0x00ffaa, desc: "Store your data in a secure, unreachable drive (Invincibility)." }
            ]
        },
        // 60-69
        {
            name: "CRYPT-KEEPER", desc: "Tier 7: Blockchain", skills: [
                { name: "MINING", cost: 0, mult: 1.0, color: 0xffd700, vfx: 'zap', hits: 5, manaGain: 50, desc: "Reroute power to solve 50 Mana worth of complex hash algorithms." },
                { name: "RUG PULL", cost: 180, mult: 18.0, color: 0xff0000, vfx: 'heavy', hits: 1, desc: "Disrupt the ground beneath the target for 18x damage." },
                { name: "HODL", cost: 55, isBuff: true, buffType: 'armor', buffVal: 0.50, duration: 8, color: 0xffd700, desc: "Hold your position and your data to gain +50% Armor." }
            ]
        },
        // 70-79
        {
            name: "AI-OVERLORD", desc: "Tier 8: Sentient", skills: [
                { name: "NEURAL NET", cost: 0, mult: 0.15, color: 0xff0055, vfx: 'matrix', hits: 30, desc: "A 30-hit distributed attack from a hive-mind intelligence." },
                { name: "SKYNET", cost: 220, mult: 22.0, color: 0xff0000, vfx: 'god_beam', hits: 1, desc: "The ultimate autonomous 22x strike from a satellite AI." },
                { name: "PREDICT", cost: 60, isBuff: true, buffType: 'crit', buffVal: 0.50, duration: 8, color: 0xff0055, desc: "Use machine learning to increase Critical Hit Chance by 50%." }
            ]
        },
        // 80-89
        {
            name: "THE-ARCHITECT", desc: "Tier 9: Matrix", skills: [
                { name: "DEJA VU", cost: 0, mult: 0.12, color: 0x00ff00, vfx: 'omni', hits: 50, desc: "A 50-hit sequence that makes the target wonder if they've met you." },
                { name: "REALITY EDIT", cost: 280, mult: 40.0, color: 0xffffff, vfx: 'blackhole', hits: 1, desc: "Modify the current simulation live for a massive 40x hit." },
                { name: "BULLET TIME", cost: 70, isBuff: true, buffType: 'dodge', buffVal: 0.60, duration: 8, color: 0x00ff00, desc: "Slow the simulation flow to gain 60% more dodge." }
            ]
        },
        // 90+
        {
            name: "SYS-ADMIN", desc: "Tier 10: God Mode", skills: [
                { name: "CONSOLE LOG", cost: 0, mult: 0.1, color: 0xffffff, vfx: 'matrix', hits: 100, desc: "Flood the target with 100 hits of debugging information." },
                { name: "SUDO KILL", cost: 500, mult: 200.0, color: 0xff0000, vfx: 'nuke', hits: 1, desc: "The ultimate administrative command. 200x damage." },
                { name: "DEV TOOLS", cost: 100, isBuff: true, buffType: 'all_offense', buffVal: 1.0, duration: 8, color: 0x00ff00, desc: "Equip the tools of the creators for 100% more offense." }
            ]
        }
    ],
    "REAPER": [
        // 0-9: BASE
        {
            name: "SOUL-COLLECTOR", desc: "Tier 1: Harvest", skills: [
                { name: "REAP", cost: 0, mult: 1.2, color: 0x440066, vfx: 'slash', hits: 1, desc: "A sweeping scythe strike that harvests the first layer of data." },
                { name: "SOUL REND", cost: 30, mult: 3.0, color: 0x8800ff, vfx: 'heavy', hits: 1, desc: "Tear through the enemy's logic for 3.0x damage." },
                { name: "SHADOW VEIL", cost: 20, isBuff: true, buffType: 'dodge', buffVal: 0.15, duration: 8, color: 0x440066, desc: "Step into the shadows to gain +15% Dodge." }
            ]
        },
        // 10-19
        {
            name: "CRYPT-WALKER", desc: "Tier 2: Shadows", skills: [
                { name: "PHASE CUT", cost: 0, mult: 0.8, color: 0x6600aa, vfx: 'multi', hits: 3, desc: "Rapidly phase through the target, striking 3 times with spectral steel." },
                { name: "SOUL SIPHON", cost: 45, mult: 2.0, color: 0x00ffcc, vfx: 'implode', hits: 1, healPercent: 0.15, desc: "Steal 15% Max HP from the enemy's core process." },
                { name: "VOID ARMOR", cost: 25, isBuff: true, buffType: 'armor', buffVal: 0.20, duration: 8, color: 0x6600aa, desc: "Envelop yourself in void energy for +20% Armor." }
            ]
        },
        // 20-29
        {
            name: "BONE-SHAPER", desc: "Tier 3: Remains", skills: [
                { name: "BONE SPIKE", cost: 0, mult: 0.5, color: 0xcccccc, vfx: 'zap', hits: 6, desc: "Launch 6 calcified code-spikes at the target." },
                { name: "OSSEOUS BLAST", cost: 60, mult: 6.0, color: 0xffffff, vfx: 'nova', hits: 1, desc: "Detonate the remains of deleted data for a massive 6x explosion." },
                { name: "CALCIUM CORE", cost: 30, isBuff: true, buffType: 'shield', buffVal: 0.30, duration: 8, color: 0xcccccc, desc: "Create a bone-wall shield worth 30% of your Max HP." }
            ]
        },
        // 30-39
        {
            name: "BLOOD-STALKER", desc: "Tier 4: Vitals", skills: [
                { name: "RED RUSH", cost: 0, mult: 0.3, color: 0xff0000, vfx: 'multi', hits: 10, desc: "A 10-hit frenzy that leaves the target bleeding data." },
                { name: "BLOOD COIL", cost: 80, mult: 8.0, color: 0xaa0000, vfx: 'implode', hits: 1, healPercent: 0.20, desc: "Coil the enemy's life-force around you for 8x damage and 20% heal." },
                { name: "HEMOPHILIA", cost: 35, isBuff: true, buffType: 'critDamage', buffVal: 0.40, duration: 8, color: 0xff0000, desc: "Target the weakest systems for +40% Crit DMG." }
            ]
        },
        // 40-49
        {
            name: "HADES-ENGINE", desc: "Tier 5: Underworld", skills: [
                { name: "GHOST FIRE", cost: 0, mult: 0.25, color: 0x00ffff, vfx: 'rain', hits: 12, desc: "Rain down spectral fire from the machine-hell." },
                { name: "STYX BEAM", cost: 100, mult: 12.0, color: 0x0088ff, vfx: 'beam', hits: 1, desc: "A concentrated beam of pure data-corruption dealing 12x damage." },
                { name: "CERBERUS OS", cost: 40, isBuff: true, buffType: 'atk', buffVal: 0.35, duration: 8, color: 0x00ffff, desc: "Three-headed processing for 35% more ATK." }
            ]
        },
        // 50-59
        {
            name: "SOUL-FORGER", desc: "Tier 6: Creation", skills: [
                { name: "FORGE CUT", cost: 0, mult: 1.0, color: 0xffaa00, vfx: 'omni', hits: 5, desc: "Shape reality into 5 heavy blows." },
                { name: "SOUL ANVIL", cost: 130, mult: 15.0, color: 0xff5500, vfx: 'heavy', hits: 1, desc: "Crush the enemy with the weight of every soul ever deleted." },
                { name: "ETERNAL CORE", cost: 45, isBuff: true, buffType: 'regen', buffVal: 0.10, duration: 8, color: 0xffaa00, desc: "Draw power from the forge for 10% HP regen per turn." }
            ]
        },
        // 60-69
        {
            name: "VOID-ARCHON", desc: "Tier 7: Mastery", skills: [
                { name: "EVENT HORIZON", cost: 0, mult: 0.2, color: 0x000000, vfx: 'nova', hits: 20, desc: "A 20-hit vortex that pulls the enemy toward deletion." },
                { name: "SINGULARITY", cost: 180, mult: 25.0, color: 0x4400cc, vfx: 'blackhole', hits: 1, desc: "Generate a point of infinite gravity for 25x damage." },
                { name: "NULL FIELD", cost: 55, isBuff: true, buffType: 'invincible', buffVal: 1, duration: 8, color: 0x000000, desc: "Desynchronize from the simulation to become invincible for 1 turn." }
            ]
        },
        // 70-79
        {
            name: "DEATH-DEALER", desc: "Tier 8: Finality", skills: [
                { name: "REAPING WIND", cost: 0, mult: 0.15, color: 0xaa00ff, vfx: 'multi', hits: 30, desc: "A 30-hit tempest of spectral scythes." },
                { name: "FINAL HARVEST", cost: 250, mult: 40.0, color: 0xff0000, vfx: 'nuke', hits: 1, desc: "The ultimate 40x reaping strike. None survive." },
                { name: "SADISM", cost: 65, isBuff: true, buffType: 'lifesteal', buffVal: 0.50, duration: 8, color: 0xaa00ff, desc: "Thrive on the enemy's deletion, gaining +50% Lifesteal." }
            ]
        },
        // 80-89
        {
            name: "THANATOS-UNIT", desc: "Tier 9: Myth", skills: [
                { name: "GOD-SLAYER", cost: 0, mult: 0.1, color: 0xffd700, vfx: 'omni', hits: 60, desc: "Strike 60 times at the enemy's divinity." },
                { name: "OBLIVION", cost: 350, mult: 80.0, color: 0x000000, vfx: 'blackhole', hits: 1, desc: "Erase the target from the Tower's memory for 80x damage." },
                { name: "MEMENTO MORI", cost: 80, isBuff: true, buffType: 'all_offense', buffVal: 0.80, duration: 8, color: 0xffd700, desc: "The ultimate reminder of death: +80% to all offensive stats." }
            ]
        },
        // 90+
        {
            name: "THE-REAPER", desc: "Tier 10: Transcendence", skills: [
                { name: "APOCALYPSE", cost: 0, mult: 0.05, color: 0xff0000, vfx: 'matrix', hits: 200, desc: "200 hits toward the end of all things." },
                { name: "OMEGA REAP", cost: 999, mult: 500.0, color: 0xffffff, vfx: 'nuke', hits: 1, desc: "The absolute end. 500x damage to everything that exists." },
                { name: "GOD OF DEATH", cost: 150, isBuff: true, buffType: 'all_offense', buffVal: 1.5, duration: 8, color: 0x000000, desc: "Ascend to godhood for 150% more offensive power." }
            ]
        }
    ]
};

// --- RARITY SYSTEM ---
const RARITY = {
    COMMON: { id: 'common', name: 'COMMON', mult: 1, prob: 1.00 },
    RARE: { id: 'rare', name: 'RARE', mult: 1.5, prob: 0.36 }, // 30% chance (0.06 + 0.30)
    EPIC: { id: 'epic', name: 'EPIC', mult: 2.5, prob: 0.06 }, // 5% chance (0.01 + 0.05)
    LEGENDARY: { id: 'legendary', name: 'LEGENDARY', mult: 5.0, prob: 0.01 }  // 1% chance
};

const PERK_POOL = [
    // --- SCALING PERKS (Now Multiplicative with Base) ---
    {
        name: "HYDRAULICS", icon: "💪", baseVal: 15, desc: "+{val}% Damage", statDesc: "DMG", func: (p, v) => {
            p.baseAtk = Math.floor(p.baseAtk * (1 + v / 100));
            p.recalculateStats();
        }
    },
    {
        name: "TITANIUM", icon: "🛡️", baseVal: 20, desc: "+{val}% Max HP", statDesc: "Max HP", func: (p, v) => {
            p.baseMaxHp = Math.floor(p.baseMaxHp * (1 + v / 100));
            p.recalculateStats();
        }
    },
    {
        name: "BATTERY", icon: "🔋", baseVal: 20, desc: "+{val}% Max Mana", statDesc: "Max Mana", func: (p, v) => {
            p.baseMaxMana = Math.floor(p.baseMaxMana * (1 + v / 100));
            p.recalculateStats();
            p.mana = p.maxMana; // Full refill on upgrade
        }
    },

    // --- UTILITY PERKS ---
    {
        name: "RECYCLER", icon: "♻️", baseVal: 10, desc: "+{val}% Mana Regen", statDesc: "Regen", func: (p, v) => {
            p.baseManaRegen = Math.floor(p.baseManaRegen * (1 + v / 100));
            p.recalculateStats();
        }
    },
    { name: "CRITICAL OS", icon: "🎯", baseVal: 5, desc: "+{val}% Crit Chance", statDesc: "Crit", func: (p, v) => p.critChance += (v / 100) },
    { name: "VAMPIRE", icon: "🧛", baseVal: 2, desc: "+{val}% Lifesteal", statDesc: "Lifesteal", func: (p, v) => p.lifesteal = (p.lifesteal || 0) + (v / 100) },

    // --- DEFENSE PERKS ---
    {
        name: "CHROME PLATING", icon: "🔩", baseVal: 15, desc: "+{val}% Armor", statDesc: "Armor", func: (p, v) => {
            p.baseArmor = Math.max(5, Math.floor((p.baseArmor || 5) * (1 + v / 100)));
            p.recalculateStats();
        }
    },
    { name: "REFLEX BOOST", icon: "⚡", baseVal: 3, desc: "+{val}% Dodge", statDesc: "Dodge", func: (p, v) => p.dodge += (v / 100) },

    // --- NEW OFFENSIVE PERKS ---
    { name: "NEURAL SPIKE", icon: "🧠", baseVal: 15, desc: "+{val}% Crit Dmg", statDesc: "Crit Dmg", func: (p, v) => p.critDamage += (v / 100) },
    { name: "ECHO STRIKE", icon: "👊", baseVal: 5, desc: "+{val}% Double Strike", statDesc: "Double Strike", func: (p, v) => p.doubleStrike += (v / 100) },

    // --- HEALING (Flat values, but boosted) ---
    { name: "NANO REPAIR", icon: "💚", baseVal: 40, desc: "Heal {val}% HP", statDesc: "Healed", func: (p, v) => p.hp = Math.min(p.maxHp, p.hp + Math.floor(p.maxHp * (v / 100))), noStack: true },
    { name: "SURGE CAPACITOR", icon: "💙", baseVal: 50, desc: "Restore {val}% Mana", statDesc: "Mana", func: (p, v) => p.mana = Math.min(p.maxMana, p.mana + Math.floor(p.maxMana * (v / 100))), noStack: true }
];

// --- GAME CONTROLLER ---
const game = {
    floor: 1, gold: 0, player: null, enemy: null, state: 'IDLE',
    lastBossAiTick: 0, bossStarted: false,

    // Mouse Input
    mouseX: 0, mouseY: 0,

    // --- REBIRTH SYSTEM ---
    rebirth: 0, // Rebirth level (0 = first playthrough)
    currentMutation: null,

    // --- BUFF TRACKING ---
    buffs: {}, // { perkName: { count: N, totalValue: V, icon: '🔧', desc: 'description' } }

    // --- MUTATION POOL ---
    mutations: {
        'overclocked': { name: 'OVERCLOCKED', desc: 'All units deal +50% DMG', icon: '⚡' },
        'data_leak': { name: 'DATA LEAK', desc: 'Skills cost -50% Mana, but skills deal 5% Max HP self-dmg', icon: '💧' },
        'encryption': { name: 'ENCRYPTION', desc: 'Enemies have +100 Armor but -40% Health', icon: '🔐' },
        'feedback': { name: 'FEEDBACK LOOP', desc: 'Taking damage restores 10% Mana', icon: '🔄' },
        'glitch': { name: 'GLITCHED REALITY', desc: 'Crit Chance +20%, but Dodge -10%', icon: '👾' }
    },

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
        reviveTokens: 0    // Number of revives available
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
        if (STORY_SCRIPT[key] && !this.iapBoosts.skipStory) {
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

        // Hide Global Buttons
        const iapBtn = document.getElementById('iap-btn'); if (iapBtn) iapBtn.style.display = 'none';

        // --- SHOW CUTSCENE UI ---
        const overlay = document.getElementById('dialogue-overlay');
        overlay.classList.add('active');

        // Hide Combat HUD
        document.getElementById('battle-controls').classList.remove('active');
        document.getElementById('hud').style.opacity = '0';

        this.updateMutationUI(); // Hide mutation display
        this.advanceDialogue();
    },

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
        if (!this.player.jobType) {
            this.offerJobSelection(0);
            return;
        }
        this.processFloorEvent(true, true);
    },

    _initMapDrag(wrapper, redraw) {
        let isDown = false, startX = 0, startY = 0, scrollLeft = 0, scrollTop = 0;
        wrapper.addEventListener('pointerdown', (e) => {
            isDown = true;
            wrapper.classList.add('dragging');
            startX = e.clientX; startY = e.clientY;
            scrollLeft = wrapper.scrollLeft; scrollTop = wrapper.scrollTop;
            try { wrapper.setPointerCapture(e.pointerId); } catch (err) { }
        });
        wrapper.addEventListener('pointermove', (e) => {
            if (!isDown) return;
            const dx = e.clientX - startX; const dy = e.clientY - startY;
            wrapper.scrollLeft = scrollLeft - dx; wrapper.scrollTop = scrollTop - dy;
            if (redraw) redraw();
            e.preventDefault();
        });
        const end = (e) => { isDown = false; wrapper.classList.remove('dragging'); try { wrapper.releasePointerCapture && wrapper.releasePointerCapture(e.pointerId); } catch (err) { } };
        wrapper.addEventListener('pointerup', end);
        wrapper.addEventListener('pointercancel', end);
    },

    _drawClassMapLinks(wrapper, svg) {
        // clear existing paths
        while (svg.firstChild) svg.removeChild(svg.firstChild);

        const content = wrapper.querySelector('.class-map');
        const isHorizontal = content && content.classList.contains('horizontal');
        const wrapperRect = wrapper.getBoundingClientRect();
        const cols = wrapper.querySelectorAll('.map-column');

        // vertical links inside a column (only when NOT horizontal)
        if (!isHorizontal) {
            cols.forEach((col) => {
                const nodes = Array.from(col.querySelectorAll('.map-node'));
                for (let i = 0; i < nodes.length - 1; i++) {
                    const a = nodes[i]; const b = nodes[i + 1];
                    const aRect = a.getBoundingClientRect(); const bRect = b.getBoundingClientRect();
                    const x1 = aRect.left - wrapperRect.left + aRect.width / 2 + wrapper.scrollLeft;
                    const y1 = aRect.top - wrapperRect.top + aRect.height / 2 + wrapper.scrollTop;
                    const x2 = bRect.left - wrapperRect.left + bRect.width / 2 + wrapper.scrollLeft;
                    const y2 = bRect.top - wrapperRect.top + bRect.height / 2 + wrapper.scrollTop;

                    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                    const midY = (y1 + y2) / 2;
                    const d = `M ${x1} ${y1} C ${x1} ${midY} ${x2} ${midY} ${x2} ${y2}`;
                    path.setAttribute('d', d);
                    if (a.classList.contains('unlocked') && b.classList.contains('unlocked')) {
                        path.classList.add('link-unlocked');
                    } else {
                        path.classList.add('link-locked');
                    }
                    path.setAttribute('fill', 'none'); path.setAttribute('stroke-linecap', 'round'); path.setAttribute('stroke-linejoin', 'round');
                    svg.appendChild(path);
                }
            });
        }

        // horizontal links between adjacent columns (left->right progression)
        for (let ci = 0; ci < cols.length - 1; ci++) {
            const aCol = cols[ci]; const bCol = cols[ci + 1];
            // pick representative node (middle) for each column
            const aNodes = Array.from(aCol.querySelectorAll('.map-node'));
            const bNodes = Array.from(bCol.querySelectorAll('.map-node'));
            const a = aNodes[Math.floor(aNodes.length / 2)]; const b = bNodes[Math.floor(bNodes.length / 2)];
            if (!a || !b) continue;
            const aRect = a.getBoundingClientRect(); const bRect = b.getBoundingClientRect();
            const x1 = aRect.left - wrapperRect.left + aRect.width / 2 + wrapper.scrollLeft;
            const y1 = aRect.top - wrapperRect.top + aRect.height / 2 + wrapper.scrollTop;
            const x2 = bRect.left - wrapperRect.left + bRect.width / 2 + wrapper.scrollLeft;
            const y2 = bRect.top - wrapperRect.top + bRect.height / 2 + wrapper.scrollTop;

            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            const midX = (x1 + x2) / 2;
            const d = `M ${x1} ${y1} C ${midX} ${y1} ${midX} ${y2} ${x2} ${y2}`;
            path.setAttribute('d', d);
            if (a.classList.contains('unlocked') && b.classList.contains('unlocked')) path.classList.add('link-unlocked'); else path.classList.add('link-locked');
            path.setAttribute('fill', 'none'); path.setAttribute('stroke-linecap', 'round'); path.setAttribute('stroke-linejoin', 'round');
            svg.appendChild(path);
        }

        // adjust svg canvas size to content size (content variable defined above)
        svg.setAttribute('width', Math.max(wrapper.clientWidth, content.scrollWidth));
        svg.setAttribute('height', Math.max(wrapper.clientHeight, content.scrollHeight));
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

            const onResize = () => { if (!canvas) return; renderer.setSize(canvas.clientWidth, canvas.clientHeight, false); camera.aspect = canvas.clientWidth / Math.max(canvas.clientHeight, 1); camera.updateProjectionMatrix(); };
            window.addEventListener('resize', onResize);

            const animate = () => {
                mesh.rotation.x += 0.01; mesh.rotation.y += 0.02;
                renderer.render(scene, camera);
                preview.raf = requestAnimationFrame(animate);
            };
            preview.dispose = () => { cancelAnimationFrame(preview.raf); window.removeEventListener('resize', onResize); try { renderer.dispose(); geo.dispose(); mat.dispose(); } catch (e) { } };
            preview.animate = animate;
            preview.renderer = renderer;
            this._classPreview = preview;
            // kick off
            setTimeout(() => { if (this._classPreview && this._classPreview.animate) this._classPreview.animate(); }, 50);
        }
    },
    previousState: 'IDLE', // Store state before opening IAP shop

    // --- PROGRESSIVE SHOP DATA (Persistent) ---
    shopData: {
        heal: { level: 1, baseCost: 50, costMult: 1.5, baseVal: 50, valInc: 25 },
        atk: { level: 1, baseCost: 100, costMult: 1.4, baseVal: 5, valInc: 5 },
        hp: { level: 1, baseCost: 100, costMult: 1.4, baseVal: 30, valInc: 20 },
        mana: { level: 1, baseCost: 75, costMult: 1.3, baseVal: 20, valInc: 10 },
        // Late-game items (unlock at floor 50)
        breach: { level: 1, baseCost: 2000, costMult: 2.0, baseVal: 0.002, valInc: 0.001 }, // % max HP damage
        combo: { level: 1, baseCost: 1500, costMult: 1.8, baseVal: 0.01, valInc: 0.005 }, // Combo damage multiplier
        crit: { level: 1, baseCost: 1000, costMult: 1.6, baseVal: 0.25, valInc: 0.15 } // Crit damage
    },
    shopItems: [],

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
        if (!item) return 0;
        return item.baseVal + (item.level - 1) * item.valInc;
    },



    startSeasonalBoss() {
        if (this.state === 'SEASONAL' || this.state === 'CUTSCENE') return;

        // Save State
        this.savedState = {
            floor: this.floor,
            rebirth: this.rebirth,
            gold: this.gold,
            bg: document.body.style.background,
            playerHp: this.player.hp,
            playerMana: this.player.mana
        };

        this.state = 'SEASONAL';
        this.floor = 666; // Visual only
        engine.setFloorTheme(666); // Glitch theme?

        // Ensure UI is clear
        document.getElementById('iap-screen').classList.remove('active');
        document.getElementById('battle-controls').classList.add('active');

        // Custom Boss Spawn
        // Remove current enemy
        if (this.enemy && this.enemy.mesh) engine.scene.remove(this.enemy.mesh);

        // Spawn THE ANOMALY
        // Spawn THE ANOMALY
        // Unit(isPlayer, hp, maxHp, atk, color, type/name)
        // Using 'boss' type for model, but specific stats
        this.enemy.isPlayer = false; // Just to be safe
        // pStats might not be fully available if we called this too early, but usually fine.
        const pStats = this.player;
        const eHp = pStats.atk * 100;
        const eAtk = pStats.maxHp * 0.4;

        this.enemy = new Unit(false, eHp, eHp, eAtk, 0xff0000, 'boss');
        this.enemy.name = "SYSTEM ANOMALY";
        this.enemy.isPlayer = false;

        this.enemy.model.mesh.scale.set(3, 3, 3); // Giant

        // Special Visuals
        game.showText("⚠ ANOMALY DETECTED ⚠", this.player.mesh.position, "#ff0000");
        engine.addShake(1.0);
        this.updateUI();
    },

    restoreGameState() {
        if (!this.savedState) return;

        this.floor = this.savedState.floor;
        this.rebirth = this.savedState.rebirth;
        // Keep gold earned? Yes.

        // Restore Player Health/Mana from before the fight
        if (this.savedState.playerHp !== undefined) {
            this.player.hp = Math.min(this.player.maxHp, this.savedState.playerHp);
            this.player.mana = Math.min(this.player.maxMana, this.savedState.playerMana);
        }

        this.state = 'IDLE';
        this.savedState = null;

        // Restore Theme and Enemy
        engine.setFloorTheme(this.floor);
        this.spawnEnemy(); // back to normal flow

        // Restore IAP Button
        const iapBtn = document.getElementById('iap-btn');
        if (iapBtn) iapBtn.style.display = 'flex';

        this.updateUI();
        this.spawnEnemy(); // back to normal flow
        this.updateUI();
    },

    startRun() {
        this.floor = 1; this.gold = 0;
        this.rebirth = 0; // Reset rebirth on new run
        this.buffs = {}; // Reset buffs
        this.battleCombo = 0;
        // Reset IAP boosts
        this.iapBoosts = { rareBonus: 0, epicBonus: 0, legendaryBonus: 0, guaranteedLegendary: false, boostFloors: 0, reviveTokens: 0 };
        this.resetShop();
        this.renderBuffs(); // Clear buff display
        // Reset to initial floor theme
        engine.setFloorTheme(1);
        if (this.player) engine.scene.remove(this.player.mesh);
        if (this.enemy) engine.scene.remove(this.enemy.mesh);
        this.player = new Unit(true, 200, 200, 100, 0x00f2ff);
        this.gameStarted = null;
        this.offerJobSelection(0);
        this.initTutorial();

    },

    handleDefeat() {
        // SEASONAL BOSS LOSS
        if (this.savedState) {
            this.showModal("ANOMALY PERSISTS", "The system instability remains unchecked...\n\nReturning to stable coordinates.", () => {
                this.restoreGameState();
            }, false);
            return;
        }

        this.state = 'GAMEOVER';
        const rollbackFloor = Math.max(1, this.floor - 5);

        const finalFloorEl = document.getElementById('final-floor');
        if (finalFloorEl) finalFloorEl.innerText = this.floor;

        const retryBtn = document.getElementById('retry-btn');
        if (retryBtn) {
            retryBtn.innerText = `RETRY FROM FLOOR ${rollbackFloor}`;
            retryBtn.onclick = () => this.retryFloor();
        }

        this.setScreen('gameover-screen');
        const battleControls = document.getElementById('battle-controls');
        if (battleControls) battleControls.classList.remove('active');
    },

    retryFloor() {
        // Clear GAMEOVER state immediately
        this.state = 'IDLE';

        // Rollback current floor
        this.floor = Math.max(1, this.floor - 5);

        // Fully restore player
        this.player.hp = this.player.maxHp;
        this.player.mana = this.player.maxMana;

        // Clear all active buffs (to prevent stacking exploits)
        this.player.activeBuffs = [];
        this.buffs = {};

        // Decelerate floor so nextFloor() lands precisely on the rollback target
        this.floor--;
        this.nextFloor();

        // NO LONGER setScreen('hud') here, let processFloorEvent handle it
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
        if (this.state === 'FRENZY_MASH' && this.frenzySkill) {
            this.frenzyMashHits++;
            this.triggerHit(this.frenzySkill, this.frenzyMashHits, 99, 0.5);
            this.showText(`+${this.frenzyMashHits}!`, this.player.mesh.position.clone().add(new THREE.Vector3(0, 1.2, 0)), '#ff4400');
            return;
        }

        if (this.state !== 'IDLE' && this.state !== 'SEASONAL') return;

        // Resolve skill: if slot is number, get from pinnedSkills. If object, use directly.
        let skill = null;
        if (typeof slot === 'number') {
            skill = this.player.pinnedSkills[slot];
        } else {
            skill = slot;
        }

        if (!skill) return;
        const actualCost = Math.max(0, Math.floor(skill.cost * this.player.manaCostMult * (1 - this.player.manaCostReduction)));
        if (this.player.mana < actualCost) { this.showText("NO MANA", this.player.mesh.position, '#00f2ff'); return; }

        this.state = 'ANIMATING';
        this.player.mana -= actualCost;

        // --- MUTATION: DATA LEAK ---
        if (this.currentMutation === 'data_leak') {
            const selfDmg = Math.floor(this.player.maxHp * 0.05);
            this.player.hp = Math.max(1, this.player.hp - selfDmg);
            this.showText(`-${selfDmg} DATA LEAK`, this.player.mesh.position, '#ff0000');
        }

        // Handle buff skills
        if (skill.isBuff) {
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
        if (skill.doubleAttack) {
            hits *= 2;
        }

        let delay = 150;
        if (skill.vfx === 'gatling' || skill.vfx === 'punch') delay = 50;
        else if (hits > 40) delay = 15;
        else if (hits > 15) delay = 30;
        else if (hits > 3) delay = 80;

        // BRAWLER FRENZY: Open mash window for frenzy skills
        if (skill.isFrenzy) {
            this.state = 'FRENZY_MASH';
            this.frenzySkill = skill;
            this.frenzyMashHits = 0;
            const mashDuration = 1500; // 1.5 seconds to mash

            this.showText("MASH NOW!", this.player.mesh.position.clone().add(new THREE.Vector3(0, 1.8, 0)), '#ff4400');

            this.player.attackAnim(() => {
                // Base hits happen automatically
                for (let i = 0; i < hits; i++) {
                    setTimeout(() => { this.triggerHit(skill, i, hits, 0); }, i * delay);
                }

                // End mash window after duration
                setTimeout(() => {
                    this.state = 'ANIMATING';
                    this.frenzySkill = null;
                    const bonusHits = this.frenzyMashHits;
                    if (bonusHits > 0) {
                        this.showText(`+${bonusHits} BONUS HITS!`, this.player.mesh.position, '#ffaa00');
                    }
                    setTimeout(() => {
                        if (this.enemy.hp <= 0) this.winBattle();
                        else this.enemyTurn();
                    }, 300);
                }, mashDuration);
            });
        } else {
            this.player.attackAnim(() => {
                for (let i = 0; i < hits; i++) {
                    setTimeout(() => { this.triggerHit(skill, i, hits, 0); }, i * delay);
                }
                setTimeout(() => {
                    if (this.enemy.hp <= 0) this.winBattle();
                    else this.enemyTurn();
                }, 500 + (hits * delay));
            });
        }
        this.updateUI();
    },

    applyBuff(skill) {
        const p = this.player;
        const type = skill.buffType;
        const val = skill.buffVal; // Now treats this as decimal (e.g. 0.20 for 20%)
        const dur = skill.duration;

        // Initialize active buffs array if needed
        if (!p.activeBuffs) p.activeBuffs = [];

        // Store original values for reverting
        const buff = { type, val, duration: dur, name: skill.name, color: skill.color };

        // Apply the buff based on type
        if (type === 'crit') { p.critChance += val; buff.revert = () => p.critChance -= val; }
        else if (type === 'dodge') { p.dodge += val; buff.revert = () => p.dodge -= val; }
        else if (type === 'doubleStrike') { p.doubleStrike += val; buff.revert = () => p.doubleStrike -= val; }
        else if (type === 'lifesteal') { p.lifesteal += val; buff.revert = () => p.lifesteal -= val; }
        else if (type === 'atk') {
            p.atkMult += val;
            p.recalculateStats();
            buff.revert = () => { p.atkMult -= val; p.recalculateStats(); };
        }
        else if (type === 'armor') {
            p.armorMult += val;
            p.recalculateStats();
            buff.revert = () => { p.armorMult -= val; p.recalculateStats(); };
        }
        else if (type === 'manaRegen') {
            p.manaRegenMult += val;
            p.recalculateStats();
            buff.revert = () => { p.manaRegenMult -= val; p.recalculateStats(); };
        }
        else if (type === 'critDamage') { p.critDamage += val; buff.revert = () => p.critDamage -= val; }
        else if (type === 'thorns') { p.thorns += val; buff.revert = () => p.thorns -= val; }
        else if (type === 'shield') {
            // Shield is % of Max HP
            const shieldVal = Math.floor(p.maxHp * val);
            p.shield += shieldVal;
            p.maxShield = Math.max(p.maxShield, p.shield);
            buff.revert = () => { };
        }
        else if (type === 'regen') {
            // Regen is % of Max HP per turn
            buff.healPerTurn = Math.floor(p.maxHp * val);
            buff.revert = () => { };
        }
        else if (type === 'invincible') { p.invincible = true; buff.revert = () => p.invincible = false; }
        else if (type === 'all_offense') {
            p.critChance += val; p.critDamage += val; p.atkMult += val;
            p.recalculateStats();
            buff.revert = () => { p.critChance -= val; p.critDamage -= val; p.atkMult -= val; p.recalculateStats(); };
        }
        else if (type === 'all_defense') {
            p.armorMult += val; p.dodge += val;
            p.recalculateStats();
            buff.revert = () => { p.armorMult -= val; p.dodge -= val; p.recalculateStats(); };
        }

        p.activeBuffs.push(buff);
    },

    tickBuffs() {
        if (!this.player.activeBuffs) return;

        // Process heal-over-time buffs
        this.player.activeBuffs.forEach(buff => {
            if (buff.healPerTurn) {
                this.player.hp = Math.min(this.player.maxHp, this.player.hp + buff.healPerTurn);
                this.showText(`+${buff.healPerTurn} HP`, this.player.mesh.position, '#00ff00');
            }
        });

        // Decrement durations and remove expired buffs
        this.player.activeBuffs = this.player.activeBuffs.filter(buff => {
            buff.duration--;
            if (buff.duration <= 0) {
                buff.revert();
                this.showText(`${buff.name} ENDED`, this.player.mesh.position, '#888');
                return false;
            }
            return true;
        });

        this.updateUI();
    },

    clearAllBuffs() {
        if (!this.player || !this.player.activeBuffs) return;
        this.player.activeBuffs.forEach(buff => {
            if (buff.revert) buff.revert();
        });
        this.player.activeBuffs = [];
        this.player.shield = 0;
        this.updateUI();
    },

    triggerHit(skill, index, totalHits, frenzyBonus = 0) {
        let isCrit = Math.random() < this.player.critChance;
        const critMult = this.player.critDamage + (this.floor * 0.05);
        let raw = Math.floor(this.player.atk * skill.mult * (isCrit ? critMult : 1));

        // BRAWLER: Apply frenzy bonus (click speed)
        raw = Math.floor(raw * (1 + frenzyBonus));

        // --- NEW: BOSS/PLAYER MECHANICS (Executioner charges) ---
        if (this.shadowCharges > 0) {
            const chargeBonus = this.shadowCharges * 0.5; // 50% per charge
            raw = Math.floor(raw * (1 + chargeBonus));
            game.showText(`SHADOW STRIKE!`, this.mesh.position, '#8800ff');
            this.shadowCharges = 0; // Consume all
        }

        // Show frenzy bonus text on first hit
        if (frenzyBonus > 0 && index === 0) {
            const frenzyPct = Math.floor(frenzyBonus * 100);
            this.showText(`FRENZY +${frenzyPct}%!`, this.player.mesh.position.clone().add(new THREE.Vector3(0, 1.5, 0)), '#ff4400');
        }

        // COMBO SYSTEM: Each hit in battle increases damage
        this.battleCombo = (this.battleCombo || 0) + 1;
        const comboBonus = 1 + (this.battleCombo * (this.player.comboMult || 0.01));
        raw = Math.floor(raw * comboBonus);

        // Show combo milestones
        if (this.battleCombo === 10) this.showText("10 COMBO!", this.player.mesh.position, '#ffaa00');
        else if (this.battleCombo === 25) this.showText("25 COMBO!", this.player.mesh.position, '#ff5500');
        else if (this.battleCombo === 50) this.showText("50 COMBO!", this.player.mesh.position, '#ff0000');
        else if (this.battleCombo === 100) this.showText("100 COMBO!!", this.player.mesh.position, '#ff00ff');

        // --- NEW: BOSS/COMBAT POLISH (Crits) ---
        if (isCrit) {
            engine.hitStop(50); // Small pause for impact
            engine.addShake(0.2);
        }

        // % MAX HP DAMAGE (Breach) - helps against tanky enemies
        if (this.player.breachDamage > 0) {
            const breachDmg = Math.floor(this.enemy.maxHp * this.player.breachDamage);
            raw += breachDmg;
        }

        // Execute bonus: deal extra damage to low HP enemies
        if (this.player.executeThreshold > 0 && (this.enemy.hp / this.enemy.maxHp) <= this.player.executeThreshold) {
            raw = Math.floor(raw * 1.5);
            this.showText("EXECUTE!", this.enemy.mesh.position.clone().add(new THREE.Vector3(0, 1.2, 0)), '#ff0000');
        }

        if (skill.heal) this.player.hp = Math.min(this.player.maxHp, this.player.hp + (skill.heal / totalHits));
        if (skill.healPercent) this.player.hp = Math.min(this.player.maxHp, this.player.hp + (this.player.maxHp * skill.healPercent / totalHits));
        if (skill.manaGain) this.player.mana = Math.min(this.player.maxMana, this.player.mana + (skill.manaGain / totalHits));
        if (skill.manaGainPercent) this.player.mana = Math.min(this.player.maxMana, this.player.mana + (this.player.maxMana * skill.manaGainPercent / totalHits));
        if (this.player.lifesteal > 0) {
            const ls = Math.floor(raw * this.player.lifesteal);
            if (ls > 0) this.player.hp = Math.min(this.player.maxHp, this.player.hp + ls);
        }

        this.enemy.takeDmg(raw);
        this.showText(raw, this.enemy.mesh.position, '#ffffff');

        // --- WEAPON EFFECTS ---
        if (this.player.gear.weapon && this.player.gear.weapon.onHit) {
            this.player.gear.weapon.onHit(this.player, this.enemy);
        }

        // Double Strike chance
        if (this.player.doubleStrike > 0 && Math.random() < this.player.doubleStrike) {
            const bonusDmg = Math.floor(raw * 0.5);
            setTimeout(() => {
                this.enemy.takeDmg(bonusDmg);
                this.showText(`${bonusDmg} x2`, this.enemy.mesh.position, '#00ffaa');
                engine.spawnParticles(this.enemy.mesh.position, 0x00ffaa, 3);
            }, 100);
        }

        if (isCrit) {
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
                el.innerHTML = `<div class="gear-icon">${type === 'weapon' ? '⚔️' : '💍'}</div><div class="gear-name">${item.name}</div>`;
            } else {
                el.className = 'gear-slot';
                el.innerHTML = `<div class="gear-icon">${type === 'weapon' ? '⚔️' : '💍'}</div><div class="gear-empty">EMPTY</div>`;
            }
        });
    },

    // Optional: Just a text popup for now
    showGearTooltip(type) {
        // Instead of a weak tooltip, let's open the full inventory!
        this.openInventory();
    },

    // Debug helper to give yourself items
    testEquip() {
        // Give a random weapon
        const w = ITEMS.WEAPONS[Math.floor(Math.random() * ITEMS.WEAPONS.length)];
        this.player.equip(w);

        // Give a random accessory
        const a = ITEMS.ACCESSORIES[Math.floor(Math.random() * ITEMS.ACCESSORIES.length)];
        this.player.equip(a);
    },

    runVFX(type, pos, color, index, totalHits) {
        if (type === 'slash') {
            engine.spawnSlash(pos, color, 1.5, Math.random() * 3); // Random rotation
            engine.spawnParticles(pos, color, 8, 0.4);
        }
        else if (type === 'heavy') {
            engine.spawnParticles(pos, color, 40, 0.8);
            engine.addShake(0.5);
            engine.spawnShockwave(pos, color, 2.5);
        }
        else if (type === 'multi') {
            // Multiple small cuts
            engine.spawnSlash(pos, color, 0.8, (index * 0.5));
            engine.spawnParticles(pos, color, 5, 0.3);
            const offset = new THREE.Vector3((Math.random() - 0.5), (Math.random() - 0.5), (Math.random() - 0.5));
            if (index % 2 === 0) engine.spawnShockwave(pos.clone().add(offset), color, 0.5);
        }
        else if (type === 'omni') {
            // Omni-slash chaos
            const offset = new THREE.Vector3((Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2);
            engine.spawnSlash(pos.clone().add(offset), color, 1.2, Math.random() * 3);
            engine.spawnParticles(pos, color, 10, 0.6);
            if (index === totalHits - 1) {
                engine.spawnShockwave(pos, color, 4);
                engine.addShake(0.4);
            }
        }
        else if (type === 'punch') {
            engine.spawnParticles(pos, color, 8, 0.3);
            engine.addShake(0.05);
            engine.spawnShockwave(pos, color, 0.8);
        }
        else if (type === 'zap') {
            // Lightning from top to target
            const start = pos.clone().add(new THREE.Vector3((Math.random() - 0.5) * 2, 4, (Math.random() - 0.5) * 2));
            engine.spawnLightning(start, pos, color);
            engine.spawnParticles(pos, color, 5, 0.2);
        }
        else if (type === 'beam') {
            engine.spawnBeam(pos, color, 8, 0.6);
            engine.addShake(0.1);
            engine.spawnParticles(pos, color, 10, 0.5);
        }
        else if (type === 'god_beam') {
            engine.spawnBeam(pos, color, 30, 2.5);
            engine.spawnShockwave(pos, color, 4);
            engine.addShake(0.4);
            engine.spawnLightning(pos.clone().add(new THREE.Vector3(-1, 5, 0)), pos, color);
            engine.spawnLightning(pos.clone().add(new THREE.Vector3(1, 5, 0)), pos, color);
        }
        else if (type === 'nova') {
            engine.spawnShockwave(pos, color, 2 + (index * 0.5));
            engine.addShake(0.15);
            engine.spawnParticles(pos, color, 20, 0.6);
        }
        else if (type === 'gatling') {
            engine.spawnParticles(pos, color, 6, 0.4);
            engine.addShake(0.03);
            // Muzzle flash feel
            const gunPos = game.player.mesh.position.clone().add(new THREE.Vector3(0.5, 0, 0));
            engine.spawnLightning(gunPos, pos, color);
        }
        else if (type === 'explode') {
            engine.spawnParticles(pos, 0xff5500, 30, 0.7);
            engine.spawnShockwave(pos, 0xff5500, 2.0);
            engine.addShake(0.3);
        }
        else if (type === 'nuke') {
            engine.spawnParticles(pos, 0xff0000, 80, 1.0);
            engine.spawnShockwave(pos, 0xff0000, 8);
            engine.spawnImplosion(pos, 0x000000); // Sucks in first
            engine.addShake(1.0);
        }
        else if (type === 'implode') {
            engine.spawnImplosion(pos, color);
            engine.addShake(0.15);
        }
        else if (type === 'blackhole') {
            engine.spawnImplosion(pos, 0x000000);
            engine.spawnShockwave(pos, 0xaa00aa, 6);
            engine.addShake(0.6);
            engine.spawnParticles(pos, 0x000000, 50, -0.5); // Reverse particles? (Hack: speed is usually calculated scalar)
        }
        else if (type === 'matrix') {
            engine.spawnMatrix(pos, 0x00ff00);
            engine.spawnLightning(pos.clone().add(new THREE.Vector3(0, 5, 0)), pos, 0x00ff00);
        }
        else if (type === 'rain') {
            engine.spawnMatrix(pos, color);
            engine.spawnParticles(pos, color, 15);
        }
        else if (type === 'crit') {
            engine.spawnSlash(pos, 0xffaa00, 2.0, Math.random() * 3);
            engine.spawnParticles(pos, 0xffcc00, 30, 0.6);
            engine.addShake(0.25);
            engine.spawnShockwave(pos, 0xffcc00, 2.0);
        }
        else if (type === 'shieldBurst') {
            engine.spawnShieldBurst(pos, color, scale);
        }
        else engine.spawnParticles(pos, color, 15);
    },

    nextFloor() {
        if (this.floor > 100) return;
        this.floor++;

        // Ensure IAP button is visible
        const iapBtn = document.getElementById('iap-btn');
        if (iapBtn) iapBtn.style.display = 'flex';

        // Update floor theme every 5 floors
        if (this.floor % 5 === 0 || this.floor === 1) {
            const themeName = engine.setFloorTheme(this.floor);
            this.showText(themeName, new THREE.Vector3(0, 3, 0), '#ff0055');

            // Rebirth: Roll Mutation every 5 floors
            if (this.rebirth > 0 && this.floor % 5 === 0) {
                this.rollMutation();
            }
        }

        // Decrement IAP luck boost floors
        if (this.iapBoosts && this.iapBoosts.boostFloors > 0) {
            this.iapBoosts.boostFloors--;
            if (this.iapBoosts.boostFloors === 0) {
                this.iapBoosts.rareBonus = 0;
                this.iapBoosts.epicBonus = 0;
                this.iapBoosts.legendaryBonus = 0;
            }
        }

        // Awakening Event (Floor 50)
        if (this.floor === 50 && !this.player.awakened) {
            this.triggerAwakening();
            return;
        }

        // DELEGATE TO MANAGER
        this.processFloorEvent(false);
    },
    // --- NEW EVENT MANAGER ---
    processFloorEvent(ignoreStory = false, ignoreSpawn = false) {
        // 1. SPAWN ENEMY FIRST (So they are visible during story/selection)
        if (!ignoreSpawn) {
            this.spawnEnemy();
        }

        // 2. CHECK STORY (High Priority)
        if (!ignoreStory && this.checkStoryTrigger(this.floor)) {
            return; // Stop here, let the cutscene play.
        }

        // 3. CHECK JOB SELECTION (Medium Priority)
        if (this.floor % 10 === 0 && this.floor <= 90) {
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
        engine.focusCamera(null);
        this.updateButtons();
        this.updateUI();

    },

    // --- AWAKENING SYSTEM (Floor 50) ---
    triggerAwakening() {
        this.player.awakened = true;

        // Resource refill
        this.player.hp = this.player.maxHp;
        this.player.mana = this.player.maxMana;

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
        if (this.tutorialState === 'ACTIVE' && this.tutorialStep === 4) {
            this.nextTutorialStep();
        }

        const iapBtn = document.getElementById('iap-btn');
        if (iapBtn) iapBtn.style.display = 'none';

        this.setScreen('shop-screen');
        this.prepShopItems();
        this.generateShop();
        this.updateUI();
    },

    prepShopItems() {
        this.shopItems = [];
        const pool = ['common', 'rare', 'epic', 'legendary'];
        // Rarity chances (Total = 1.0)
        let weights = [0.85, 0.15, 0, 0];
        if (this.floor > 15) weights = [0.4, 0.5, 0.1, 0];
        if (this.floor > 50) weights = [0, 0.4, 0.5, 0.1];
        if (this.floor > 100) weights = [0, 0, 0.6, 0.4];

        const getRandomRarity = () => {
            const r = Math.random();
            let acc = 0;
            for (let i = 0; i < pool.length; i++) {
                acc += weights[i];
                if (r < acc) return pool[i];
            }
            return 'common';
        };

        const getItemPrice = (rarity) => {
            const basePrices = { common: 800, rare: 3000, epic: 12000, legendary: 50000 };
            const scale = 1 + (this.floor * 0.05);
            return Math.floor((basePrices[rarity] || 1000) * scale);
        };

        // Pick 4 items for a full shelf
        for (let i = 0; i < 4; i++) {
            const rarity = getRandomRarity();
            const types = ['WEAPONS', 'ACCESSORIES'];
            const type = (i < 2) ? 'WEAPONS' : ((i === 2) ? 'ACCESSORIES' : types[Math.floor(Math.random() * 2)]);

            const itemPool = ITEMS[type].filter(it => it.rarity === rarity);
            if (itemPool.length > 0) {
                const template = itemPool[Math.floor(Math.random() * itemPool.length)];
                this.shopItems.push({
                    ...template,
                    price: getItemPrice(rarity),
                    source: type,
                    sold: false
                });
            }
        }
    },

    // --- IAP PREMIUM SHOP ---
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
            this.showModal("SUCCESS", `✅ Purchased ${actualAmount.toLocaleString()} Credits!`);
        });
    },

    // --- CUSTOM MODAL & INVENTORYHELPER ---
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

    // --- RENDER SHOP UI ---
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

    spawnEnemy() {
        if (this.enemy) engine.scene.remove(this.enemy.mesh);
        this.battleCombo = 0;
        this.clearAllBuffs(); // FRESH START
        this.bossStarted = false; // Reset boss AI gate

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

        if (this.floor <= 50) {
            hp = Math.floor(200 * Math.pow(1.13, difficultyScale));
            atk = Math.floor(10 * Math.pow(1.085, difficultyScale));
        } else {
            // STEAPER POST-50 SCALING
            // Calculate Floor 50 base for continuity
            const scaleAt50 = 50 + (this.rebirth * 50);
            const hpAt50 = 200 * Math.pow(1.13, scaleAt50);
            const atkAt50 = 10 * Math.pow(1.085, scaleAt50);

            const extraFloors = this.floor - 50;
            hp = Math.floor(hpAt50 * Math.pow(1.18, extraFloors));
            atk = Math.floor(atkAt50 * Math.pow(1.12, extraFloors));
        }

        // Rebirth Multiplier (Stacked on top of base scale)
        if (this.rebirth > 0) {
            hp = Math.floor(hp * Math.pow(2.8, this.rebirth));
            atk = Math.floor(atk * Math.pow(1.6, this.rebirth));
        }

        if (isFinalBoss) {
            this.bossPhase = 1; // <--- NEW TRACKER

            // Phase 1: The "Avatar" (Weaker version)
            // MASSIVE BUFF: 2.5B Base HP / 8x Multiplier per rebirth
            hp = 2500000000 * Math.pow(8, this.rebirth);
            atk = 450000 * Math.pow(2.5, this.rebirth);

            document.getElementById('enemy-name').innerText = `THE ARCHITECT (AVATAR)`;
            document.getElementById('enemy-name').style.color = '#ffd700';
            this.enemy = new Unit(false, hp, hp, atk, 0xffd700, 'architect');
            this.enemy.mitigation = 0.4;
        }
        else if (isMidBoss) {
            hp *= 18; // Tanky mid-bosses (was 10x)
            atk *= 3.5; // (was 2.5x)
            const names = { 25: "WARDEN", 50: "EXECUTIONER", 75: "OVERLORD" };
            const variants = { 25: 0, 50: 1, 75: 2 };
            document.getElementById('enemy-name').innerText = `${names[this.floor]}`;
            document.getElementById('enemy-name').style.color = '#ff5500';
            this.enemy = new Unit(false, hp, hp, atk, '#ff5500', 'midboss', variants[this.floor]);
        }
        else if (isFloorBoss) {
            hp *= 8.0; // (was 5.0x)
            atk *= 2.5; // (was 2.0x)
            document.getElementById('enemy-name').innerText = `SECTOR BOSS - ${this.floor}`;
            document.getElementById('enemy-name').style.color = '#ff0000';
            this.enemy = new Unit(false, hp, hp, atk, '#ff0000', 'boss');
        }
        else {
            // Apply Mutation Scaling
            if (this.currentMutation === 'encryption') {
                hp = Math.floor(hp * 0.6);
            }
            const enemyTypes = ['drone', 'sentinel', 'construct', 'tank', 'spider', 'wraith', 'floater'];
            const type = enemyTypes[this.floor % enemyTypes.length];
            document.getElementById('enemy-name').innerText = `${type.toUpperCase()} - F${this.floor}`;
            document.getElementById('enemy-name').style.color = '#aaa';
            const color = new THREE.Color().setHSL(Math.random(), 0.8, 0.5);
            this.enemy = new Unit(false, hp, hp, atk, color, type);
        }

        // Apply Mutation Instance Effects
        if (this.currentMutation === 'encryption' && this.enemy) {
            this.enemy.baseArmor += 100;
            this.enemy.recalculateStats();
        }

        // --- STATS ---
        this.enemy.baseArmor = this.floor * 5; // Armor helps trash mobs survive rapid weak hits
        this.enemy.armor = this.enemy.baseArmor;
        this.enemy.critChance = Math.min(0.20, this.floor * 0.002);
        if (this.floor > 10) this.enemy.dodge = Math.min(0.15, (this.floor - 10) * 0.002);

        const targetY = this.enemy.mesh.userData.baseY;
        this.enemy.mesh.position.y = 10;
        engine.tween(this.enemy.mesh.position, 'y', targetY, 800);
    },

    executePhase2Transform() {
        console.log("EXECUTING TRANSFORMATION");
        this.bossPhase = 2;

        // 1. Visual Effects
        engine.addShake(1.0);
        if (this.enemy && this.enemy.mesh) {
            engine.spawnParticles(this.enemy.mesh.position, 0xff0000, 50);

            // Color the model red safely
            this.enemy.mesh.traverse((child) => {
                if (child.isMesh) {
                    child.material = child.material.clone();
                    child.material.color.setHex(0xff0000);
                    if (child.material.emissive) child.material.emissive.setHex(0xaa0000);
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
        if (this.pendingBossTransformation) return; // Prevent double trigger
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
        if (this.pendingBossDefeat) return; // Prevent double trigger
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
        if (!this.enemy || this.floor < 100 || this.state === 'GAMEOVER' || this.state === 'CUTSCENE') return;
        if (!this.bossStarted) return; // Wait for first regular turn

        const now = performance.now();
        if (now - this.lastBossAiTick < 2000) return; // 2s Cooldown
        this.lastBossAiTick = now;

        // Boss spells are now guaranteed to check every 2s
        const spell = Math.random();

        if (spell < 0.4) {
            // SPELL: REALITY BREAK (Reduced from 2.5x to 1.5x damage)
            this.showText("<< REALITY BREAK >>", this.enemy.mesh.position, '#ff0000');
            engine.spawnParticles(this.player.mesh.position, 0xff0000, 20);
            this.player.takeDmg(this.enemy.atk * 1.5);
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
    },

    enemyTurn() {
        if (this.floor >= 100) this.bossStarted = true;

        this.enemy.attackAnim(() => {
            let dmg = Math.floor(this.enemy.atk * (0.8 + Math.random() * 0.4));
            let isSpecial = false;

            // --- BOSS SPECIAL ATTACK (Every 3 turns) ---
            if (['boss', 'midboss', 'architect'].includes(this.enemy.type)) {
                this.enemy.turnCount = (this.enemy.turnCount || 0) + 1;
                if (this.enemy.turnCount % 3 === 0) {
                    dmg *= 2;
                    isSpecial = true;
                    engine.addShake(0.6);
                    this.showText("CRITICAL ERROR!", this.player.mesh.position, "#ff0000");
                }
            }

            this.player.takeDmg(dmg);
            this.showText(dmg, this.player.mesh.position, isSpecial ? '#ff0000' : '#ff0055');
            engine.addShake(isSpecial ? 0.3 : 0.1);

            if (this.enemy.type === 'architect') {
                const attacks = ['god_beam', 'blackhole', 'matrix', 'nuke'];
                const vfx = attacks[Math.floor(Math.random() * attacks.length)];
                this.runVFX(vfx, this.player.mesh.position, 0xff0000, 0, isSpecial ? 1.5 : 1);
            } else if (this.enemy.type === 'boss' || this.enemy.type === 'midboss') {
                this.runVFX(isSpecial ? 'nuke' : 'heavy', this.player.mesh.position, 0xff5500, 0, isSpecial ? 1.2 : 1);
            } else {
                engine.spawnParticles(this.player.mesh.position, 0xffaa00, 5);
            }

            // --- NEW: BOSS MECHANICS ---
            if (this.enemy.isRaging || this.enemy.type === 'midboss') {
                this.enemy.turnCount = (this.enemy.turnCount || 0) + 1;

                // Warden (Floor 25): Reactive Shield every 3 turns
                if (this.floor >= 25 && this.floor < 40 && this.enemy.turnCount % 3 === 0) {
                    this.enemy.reflectShield = 0.5; // Reflect 50%
                    this.showText("REACTIVE SHIELD ACTIVE", this.enemy.mesh.position, '#00f2ff');
                    this.runVFX('shield', this.enemy.mesh.position, 0x00f2ff, 0, 1.5);
                } else {
                    this.enemy.reflectShield = 0;
                }

                // Overlord (Floor 75): Mana Drain
                if (this.floor >= 75 && this.floor < 90) {
                    const drain = 15;
                    this.player.mana = Math.max(0, this.player.mana - drain);
                    this.showText(`-${drain} MP (DRAIN)`, this.player.mesh.position, '#ff00ff');
                }
            }

            const regen = this.player.manaRegen;
            this.player.mana = Math.min(this.player.maxMana, this.player.mana + regen);
            this.showText(`+${regen} MP`, this.player.mesh.position, '#00f2ff');

            // Tick down buff durations at start of new player turn
            this.tickBuffs();

            this.updateUI();

            if (this.player.hp <= 0) {
                // Check for revive token
                if (this.iapBoosts.reviveTokens > 0) {
                    this.iapBoosts.reviveTokens--;
                    this.player.hp = Math.floor(this.player.maxHp * 0.5); // Revive at 50% HP
                    this.player.mana = this.player.maxMana;
                    this.showText('💀 REVIVED!', this.player.mesh.position, '#ff00ff');
                    this.updateUI();
                    this.state = 'IDLE';
                } else {
                    this.handleDefeat();
                }
            } else {
                this.state = 'IDLE';
            }
        });
    },

    winBattle() {
        this.state = 'REWARD';

        // SEASONAL BOSS VICTORY
        if (this.savedState) {
            this.showModal("ANOMALY NEUTRALIZED", "System stability restored. \n\nREWARD: LEGENDARY CACHE", () => {
                this.giveRandomItemFromPool('legendary');
                this.restoreGameState();
            }, false);
            return;
        }

        // Floor 100 victory - trigger REBIRTH instead of ending
        if (this.floor >= 100) {
            this.triggerRebirth();
            return;
        }

        let loot = 100 + (this.floor * 50);

        // REBIRTH BONUS: Massive gold multiplier
        if (this.rebirth > 0) {
            loot = Math.floor(loot * Math.pow(3, this.rebirth)); // 3x per rebirth level
        }

        // Bonus credits perk
        if (this.player.bonusCredits > 0) {
            loot = Math.floor(loot * (1 + this.player.bonusCredits));
        }
        this.gold += loot;

        // Overkill bonus: extra credits for overkilling enemies
        if (this.player.overkillBonus > 0 && this.enemy.hp < 0) {
            const overkillCredits = Math.floor(Math.abs(this.enemy.hp) * this.player.overkillBonus * 0.1);
            if (overkillCredits > 0) {
                this.gold += overkillCredits;
                this.showText(`+${overkillCredits} OVERKILL`, this.enemy.mesh.position, '#ffe600');
            }
        }
        const enemyMesh = this.enemy.mesh;
        engine.tween(enemyMesh.scale, 'y', 0, 300, () => {
            if (enemyMesh.parent) engine.scene.remove(enemyMesh);
        });

        // Reset player position after battle
        this.resetPlayerPosition();

        // --- RANDOM ITEM DROP ---
        let dropChance = 0.05; // 5% base chance (was 12%)
        const isBoss = ['boss', 'midboss', 'architect'].includes(this.enemy.type);
        if (isBoss) dropChance = 0.25; // 25% for bosses (was 50%)

        if (Math.random() < dropChance) {
            const rnd = Math.random();
            let rarity = 'common';

            if (isBoss) {
                // Bosses drop better loot: 60% Rare, 30% Epic, 10% Legendary (ONLY on Floor 25/50/75/100)
                if (rnd > 0.90 && (this.floor % 25 === 0)) rarity = 'legendary';
                else if (rnd > 0.60) rarity = 'epic';
                else rarity = 'rare';
            } else {
                // Regular mobs: 70% Common, 22% Rare, 8% Epic, 0% Legendary
                if (rnd > 0.92) rarity = 'epic';
                else if (rnd > 0.70) rarity = 'rare';
                else rarity = 'common';
            }

            // Slight delay so the crate animation feels like a reward after the screen transition
            setTimeout(() => {
                this.giveRandomItemFromPool(rarity);
            }, 800);
        }

        this.updateUI();
        this.generatePerks();
        this.setScreen('reward-screen');
        document.getElementById('battle-controls').classList.remove('active');

        // Tutorial: After first battle, show perk selection step
        if (this.tutorialState === 'ACTIVE' && this.tutorialStep === 2) {
            this.nextTutorialStep(); // Advance to step 3 (floor progression)
        }
    },

    // --- REBIRTH SYSTEM ---
    triggerRebirth() {
        this.rebirth++;
        this.floor = 1;

        // Reset all boss flags to prevent premature triggers on next run
        this.pendingBossDefeat = false;
        this.pendingBossTransformation = false;
        this.bossPhase = 0;
        this.bossStarted = false;

        // Reset floor theme
        if (engine.setFloorTheme) engine.setFloorTheme(1);

        // Boost Player Stats (REMOVED: Only full heal & flag)
        if (this.player) {
            this.player.hp = this.player.maxHp; // Full Heal
            this.player.mana = this.player.maxMana;
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
        if (levelEl) levelEl.innerText = this.rebirth;
        if (bonusEl) bonusEl.innerText = this.formatNum(rebirthBonus);
    },

    completeRebirth() {
        this.showText(`REBIRTH ${this.rebirth}!`, this.player.mesh.position, '#ff00ff');
        engine.spawnShockwave(this.player.mesh.position, 0xff00ff, 6);
        engine.addShake(0.6);

        this.state = 'IDLE';
        this.bossPhase = 0;
        this.pendingBossDefeat = false;
        this.pendingBossTransformation = false;
        this.bossStarted = false;

        const hud = document.getElementById('hud');
        hud.style.opacity = '1';
        hud.style.display = 'block';
        this.setScreen('hud');

        const controls = document.getElementById('battle-controls');
        controls.classList.add('active');

        // --- FIX: FORCE CENTER ALIGNMENT ---
        controls.style.display = 'flex';
        controls.style.justifyContent = 'center'; // <--- ADD THIS LINE

        if (this.enemy && this.enemy.mesh) {
            engine.scene.remove(this.enemy.mesh);
            this.enemy = null;
        }

        this.spawnEnemy();
        engine.focusCamera(null);
        this.updateButtons();
        this.updateUI();
    },

    resetPlayerPosition() {
        if (this.player && this.player.mesh) {
            this.player.mesh.position.set(-2.5, this.player.mesh.userData.baseY || 0, 0);
            this.player.mesh.rotation.y = Math.PI / 2;
        }
    },

    generatePerks() {
        const container = document.getElementById('perk-container');
        container.innerHTML = '';
        const RARITY = {
            COMMON: { id: 'common', name: 'COMMON', mult: 1, prob: 1.0 },
            RARE: { id: 'rare', name: 'RARE', mult: 1.5, prob: 0.36 },
            EPIC: { id: 'epic', name: 'EPIC', mult: 2.5, prob: 0.06 },
            LEGENDARY: { id: 'legendary', name: 'LEGENDARY', mult: 5.0, prob: 0.01 }
        };

        const scaling = 1 + (this.rebirth * 0.5);

        for (let i = 0; i < 3; i++) {
            let tier;
            const rand = Math.random();

            // Check for IAP guaranteed legendary
            if (this.iapBoosts.guaranteedLegendary) {
                tier = RARITY.LEGENDARY;
                this.iapBoosts.guaranteedLegendary = false;
            } else {
                const legendaryChance = RARITY.LEGENDARY.prob + this.iapBoosts.legendaryBonus;
                const epicChance = RARITY.EPIC.prob + this.iapBoosts.epicBonus;
                const rareChance = RARITY.RARE.prob + this.iapBoosts.rareBonus;

                tier = RARITY.COMMON;
                if (rand < legendaryChance) tier = RARITY.LEGENDARY;
                else if (rand < epicChance) tier = RARITY.EPIC;
                else if (rand < rareChance) tier = RARITY.RARE;
            }

            const template = PERK_POOL[Math.floor(Math.random() * PERK_POOL.length)];
            let finalVal = Math.floor(template.baseVal * tier.mult * scaling);

            // Corrupted Logic (25% chance in rebirth)
            let isCorrupted = (this.rebirth > 0 && Math.random() < 0.25);
            let penaltyDesc = "";
            let penaltyFunc = null;

            if (isCorrupted) {
                finalVal *= 3;
                const penalties = [
                    { name: "RECOIL", desc: "-20% Max HP", func: (p) => { p.baseMaxHp = Math.floor(p.baseMaxHp * 0.8); p.recalculateStats(); } },
                    { name: "BLOAT", desc: "+50% Mana Cost", func: (p) => { p.manaCostMult *= 1.5; } },
                    { name: "EXPOSED", desc: "-50% Armor", func: (p) => { p.baseArmor = Math.floor(p.baseArmor * 0.5); p.recalculateStats(); } },
                    { name: "STATIC", desc: "-10% Dodge", func: (p) => { p.dodge = Math.max(0, p.dodge - 0.1); } }
                ];
                const penalty = penalties[Math.floor(Math.random() * penalties.length)];
                penaltyDesc = `<div style="color:#ff0000; font-size:12px; margin-top:5px; font-weight:bold;">[CORRUPTED: ${penalty.desc}]</div>`;
                penaltyFunc = penalty.func;
            }

            const desc = template.desc.replace('{val}', finalVal);
            const card = document.createElement('div');
            card.className = `perk-card ${tier.id}`;

            if (isCorrupted) {
                card.style.background = 'linear-gradient(135deg, #200, #000)';
                card.style.border = '2px solid #f00';
                card.style.boxShadow = '0 0 15px #f00';
            }

            card.innerHTML = `
                <div class="perk-title" style="${isCorrupted ? 'color:#ff4444' : ''}">${isCorrupted ? '[CORRUPTED] ' : ''}${template.name}</div>
                <div class="perk-desc">${desc}${penaltyDesc}</div>
                <div class="rarity-tag">${tier.name}</div>
            `;

            card.onclick = () => {
                template.func(this.player, finalVal);
                if (penaltyFunc) penaltyFunc(this.player);
                this.trackBuff(template, finalVal);

                // Tutorial: After selecting first perk, advance to step 4 (floor progression)
                if (this.tutorialState === 'ACTIVE' && this.tutorialStep === 3) {
                    this.nextTutorialStep();
                }

                this.goToShop();
            };
            container.appendChild(card);
        }
    },

    trackBuff(template, value) {
        // Don't track one-time effects (heals, mana restore) unless they provide permanent bonuses
        if (template.noStack) return;

        const key = template.name;
        if (!this.buffs[key]) {
            this.buffs[key] = { count: 0, totalValue: 0, icon: template.icon, name: template.name, statDesc: template.statDesc };
        }
        this.buffs[key].count++;
        this.buffs[key].totalValue += value;
        this.renderBuffs();
    },

    renderBuffs() {
        const container = document.getElementById('buff-container');
        container.innerHTML = '';

        for (const key in this.buffs) {
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

    // --- MUTATION SYSTEM ---
    rollMutation() {
        if (this.rebirth === 0) {
            this.clearMutation();
            return;
        }

        const keys = Object.keys(this.mutations);
        const randomKey = keys[Math.floor(Math.random() * keys.length)];
        this.applyMutation(randomKey);
    },

    applyMutation(id) {
        this.clearMutation();
        this.currentMutation = id;
        const mut = this.mutations[id];
        if (!mut) return;

        // Visual notification
        this.showText(`MUTATION: ${mut.name}`, new THREE.Vector3(0, 4, 0), '#ff0000');

        // Instant stat modifications (recalculated stats handles others)
        if (id === 'glitch' && this.player) {
            this.player.critChance += 0.2;
            this.player.dodge -= 0.1;
        }

        this.updateMutationUI();
    },

    clearMutation() {
        if (!this.currentMutation) return;

        // Reverse instant effects
        if (this.currentMutation === 'glitch' && this.player) {
            this.player.critChance -= 0.2;
            this.player.dodge += 0.1;
        }

        this.currentMutation = null;
        this.updateMutationUI();
    },

    updateMutationUI() {
        const display = document.getElementById('mutation-display');
        const nameEl = document.getElementById('mutation-name');
        const descEl = document.getElementById('mutation-desc');

        if (!this.currentMutation) {
            if (display) display.style.display = 'none';
            return;
        }

        // Hide if any screen overlay (except HUD) is active or in dialogue
        const activeScreen = document.querySelector('.screen.active');
        const isDialogueActive = this.state === 'CUTSCENE';
        const isShopOrPerk = activeScreen && (activeScreen.id === 'shop-screen' || activeScreen.id === 'reward-screen' || activeScreen.id === 'class-screen' || activeScreen.id === 'iap-screen' || activeScreen.id === 'inventory-screen');

        if (activeScreen || isDialogueActive) {
            if (display) {
                display.style.display = 'none';
                display.classList.remove('mutation-active');
            }
            return;
        }

        const mut = this.mutations[this.currentMutation];
        if (display) {
            display.style.display = 'block';
            display.classList.add('mutation-active');
        }
        if (nameEl) nameEl.innerText = mut.name;
        if (descEl) descEl.innerText = mut.desc;
    },

    showText(txt, pos, color) {
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

    setScreen(id) {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        if (id !== 'hud') document.getElementById(id).classList.add('active');
        this.updateMutationUI(); // Re-check visibility
    },
    updateButtons() {
        if (!this.player) return;
        const s1 = this.player.pinnedSkills?.[0];
        const s2 = this.player.pinnedSkills?.[1];

        const btn1 = document.getElementById('btn-skill-1');
        const btn2 = document.getElementById('btn-skill-2');
        const btn3 = document.getElementById('btn-skill-3');

        // Button 1
        if (s1) {
            const cost1 = Math.max(0, Math.floor(s1.cost * (1 - this.player.manaCostReduction)));
            const discount1 = cost1 < s1.cost ? `<span style="text-decoration:line-through;color:#666">${s1.cost}</span> ` : '';
            btn1.innerHTML = `<span class="btn-name">${s1.name}</span><br><span class="btn-cost">${discount1}${cost1} MP</span>`;
            btn1.style.opacity = '1';
            // btn1.onclick is handled in HTML but relies on game.useSkill(0) which now uses pinnedSkills[0]
        } else {
            btn1.innerHTML = `<span class="btn-name">EMPTY</span><br><span class="btn-cost">--</span>`;
            btn1.style.opacity = '0.5';
        }

        // Button 2
        if (s2) {
            const cost2 = Math.max(0, Math.floor(s2.cost * (1 - this.player.manaCostReduction)));
            const discount2 = cost2 < s2.cost ? `<span style="text-decoration:line-through;color:#666">${s2.cost}</span> ` : '';
            btn2.innerHTML = `<span class="btn-name">${s2.name}</span><br><span class="btn-cost">${discount2}${cost2} MP</span>`;
            btn2.style.opacity = '1';
        } else {
            btn2.innerHTML = `<span class="btn-name">EMPTY</span><br><span class="btn-cost">--</span>`;
            btn2.style.opacity = '0.5';
        }

        // Button 3: SKILLS MANAGER
        btn3.innerHTML = `<span class="btn-name">SKILLS</span><br><span class="btn-cost">MENU</span>`;
        btn3.style.display = 'inline-block';
        btn3.onclick = () => this.openSkillsMenu(); // Override HTML onclick
    },

    // --- SKILLS MENU SYSTEM ---
    openSkillsMenu() {
        if (!this.player) return;

        this.previousState = this.state;
        this.state = 'SKILLS_MENU';
        this.skillTab = 'BASIC'; // Default tab

        const screen = document.getElementById('classes-screen');
        screen.classList.add('active');
        const title = screen.querySelector('h1');
        if (title) title.innerText = "SKILL MANAGEMENT";

        this.renderSkillsMenu();
    },

    closeSkillsMenu() {
        document.getElementById('classes-screen').classList.remove('active');
        this.state = this.previousState || 'IDLE';
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

            const isPinned1 = this.player.pinnedSkills?.[0] === skill;
            const isPinned2 = this.player.pinnedSkills?.[1] === skill;

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
            const costLabel = skill.cost > 0 ? `${skill.cost}MP` : "FREE";

            let pinnedBadge = "";
            if (isPinned1) pinnedBadge = `<div style="position:absolute; top:0; right:0; background:#00f2ff; color:#000; font-size:10px; font-weight:bold; padding:4px 8px; border-bottom-left-radius:8px; z-index:2;">SLOT 1</div>`;
            if (isPinned2) pinnedBadge = `<div style="position:absolute; top:0; right:0; background:#ff0055; color:#fff; font-size:10px; font-weight:bold; padding:4px 8px; border-bottom-left-radius:8px; z-index:2;">SLOT 2</div>`;

            const descDisplay = skill.desc || (skill.isBuff
                ? `+${((skill.buffVal || 0) * 100).toFixed(0)}% ${skill.buffType || 'BUFF'}`
                : `${skill.mult}x DMG`);

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
                    <div style="display: flex; justify-content: space-between; font-size: 11px; color: #ddd; margin-bottom: 10px; border-top: 1px solid #333; padding-top: 6px;">
                        <span>COST: <span style="color:#00f2ff">${costLabel}</span></span>
                        <span>${skill.isBuff ? (skill.duration + ' TURNS') : ((skill.hits || 1) + ' HITS')}</span>
                    </div>
                    <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 6px;">
                        <button class="skill-action-btn" data-action="pin1" data-index="${index}" style="font-size:11px; padding:6px 0; background: #00f2ff22; border: 1px solid #00f2ff; color: #00f2ff; ${isPinned1 ? 'background:#00f2ff; color:#000;' : ''}">
                            ${isPinned1 ? 'SLOT 1' : 'PIN 1'}
                        </button>
                        <button class="skill-action-btn" data-action="pin2" data-index="${index}" style="font-size:11px; padding:6px 0; background: #ff005522; border: 1px solid #ff0055; color: #ff0055; ${isPinned2 ? 'background:#ff0055; color:#fff;' : ''}">
                            ${isPinned2 ? 'SLOT 2' : 'PIN 2'}
                        </button>
                        <button class="skill-action-btn" data-action="use" data-index="${index}" style="font-size:11px; padding:6px 0; background: #00ff0022; border: 1px solid #00ff00; color: #00ff00;">
                            USE
                        </button>
                    </div>
                </div>
            `;

            card.onmouseenter = () => {
                card.style.transform = 'translateY(-3px)';
                card.style.boxShadow = `0 8px 30px ${glowColor}`;
            };
            card.onmouseleave = () => {
                card.style.transform = 'translateY(0)';
                card.style.boxShadow = `0 4px 15px ${glowColor}40`;
            };

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

                if (action === 'pin1') {
                    this.player.pinnedSkills[0] = skill;
                    this.updateButtons();
                    this.renderSkillsMenu();
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
};

class Unit {
    constructor(isPlayer, hp, maxHp, atk, color, type = 'walker', variant = 0) {
        this.isPlayer = isPlayer;
        this.type = type;

        // Base values (before multipliers)
        this.baseMaxHp = maxHp;
        this.baseAtk = atk;
        this.baseMaxMana = isPlayer ? 50 : 100;
        this.baseArmor = 0;
        this.baseManaRegen = 5;

        // Multipliers (0.2 = +20%)
        this.hpMult = 0;
        this.atkMult = 0;
        this.manaMult = 0;
        this.armorMult = 0;
        this.manaRegenMult = 0;

        // Final calculated values
        this.maxHp = maxHp;
        this.hp = hp;
        this.atk = atk;
        this.maxMana = this.baseMaxMana;
        this.mana = this.maxMana;
        this.manaRegen = this.baseManaRegen;
        this.armor = 0;

        this.critChance = 0.05; this.critDamage = 1.5; this.lifesteal = 0; this.jobType = null; this.jobTier = 0;
        this.dodge = 0; this.thorns = 0; this.doubleStrike = 0; this.manaCostReduction = 0;
        this.executeThreshold = 0; this.overkillBonus = 0; this.shield = 0; this.maxShield = 0; this.bonusCredits = 0;
        this.activeBuffs = []; this.invincible = false;
        this.manaCostMult = 1.0; // Added for corrupted penalties

        // Phase/Boss Mechanics
        this.phase = 1;
        this.maxPhase = 2;
        this.isRaging = false;
        this.reflectShield = 0; // % DMG reflected
        this.shadowCharges = 0; // Executioner charges
        this.turnCount = 0;

        // --- NEW: SKILL SYSTEM ---
        this.unlockedSkills = []; // Stores all known skills
        this.pinnedSkills = [null, null]; // Stores the 2 active skills in slots
        // -------------------------

        // --- NEW: GEAR SYSTEM ---
        // --- NEW: GEAR SYSTEM ---
        this.gear = { weapon: null, accessory: null };
        this.inventory = [];
        // ------------------------
        // ------------------------

        // Late-game scaling stats
        this.comboMult = 0.01; // Damage increase per combo hit (1% base)
        this.breachDamage = 0; // % of enemy max HP dealt as bonus damage
        this.awakened = false; // Unlocked at floor 50

        // Create model based on type
        if (isPlayer) this.model = Models.createHumanoid(color, 1.5);
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
        this.mesh.rotation.y = isPlayer ? Math.PI / 2 : -Math.PI / 2;

        // Set base Y (floating enemies)
        const floatingTypes = ['drone', 'boss', 'architect', 'floater', 'midboss'];
        this.mesh.userData.idle = true;
        this.mesh.userData.baseY = floatingTypes.includes(type) ? 1.5 : (type === 'spider' ? 0.3 : 0);
        this.mesh.userData.idleSpeed = 0.002;
        this.mesh.userData.idleAmp = floatingTypes.includes(type) ? 0.15 : 0.1;
        this.mesh.position.y = this.mesh.userData.baseY;
        engine.scene.add(this.mesh);

        // Persistent Shield Effect (Visual only)
        const sSize = (isPlayer ? 1.5 : (['architect', 'midboss', 'boss'].includes(type) ? 3.5 : 1.8));
        const sGeo = new THREE.SphereGeometry(sSize, 24, 24);
        const sMat = new THREE.MeshBasicMaterial({
            color: 0x00f2ff,
            transparent: true,
            opacity: 0,
            wireframe: true,
            side: THREE.DoubleSide
        });
        this.shieldOrb = new THREE.Mesh(sGeo, sMat);
        this.mesh.add(this.shieldOrb);
    }
    attackAnim(cb) {
        const weapon = this.model.weapon; const pivot = this.mesh;
        const startX = pivot.position.x; const targetX = this.isPlayer ? 0.5 : -0.5;
        engine.tween(pivot.position, 'x', targetX, 100, () => {
            if (weapon) weapon.rotation.x = -0.5;
            setTimeout(() => { if (weapon) weapon.rotation.x = 0; engine.tween(pivot.position, 'x', startX, 150, cb); }, 80);
        });
    }
    takeDmg(amount) {
        // Invincible check
        if (this.isPlayer && this.invincible) {
            game.showText("IMMUNE!", this.mesh.position, '#ffd700');
            return 0;
        }
        // Dodge check
        if (Math.random() < this.dodge) {
            game.showText("DODGE!", this.mesh.position, '#00ff00');

            // Executioner (Floor 50): Gain Shadow Charge on dodge
            if (this.type === 'midboss' && game.floor >= 50 && game.floor < 65) {
                this.shadowCharges = (this.shadowCharges || 0) + 1;
                game.showText(`SHADOW CHARGE (+${this.shadowCharges})`, this.mesh.position, '#8800ff');
                game.runVFX('puff', this.mesh.position, 0x8800ff, 0, 1.2);
            }
            return 0;
        }
        // Armor reduces damage
        let finalDmg = Math.max(1, amount - this.armor);

        // --- BOSS MECHANIC: REACTIVE ARMOR [DISABLED] ---
        // if (!this.isPlayer && ['boss', 'midboss', 'architect'].includes(this.type)) {
        //     const reactiveShield = Math.floor(this.maxHp * 0.0005);
        //     this.shield += reactiveShield;
        //     this.maxShield = Math.max(this.maxShield, this.shield);
        //     game.runVFX('shieldBurst', this.mesh.position, 0x00f2ff, 0, 0.5);
        // }

        // --- MUTATION: OVERCLOCKED ---
        if (game.currentMutation === 'overclocked') {
            finalDmg = Math.floor(finalDmg * 1.5);
        }

        if (this.isPlayer && game.enemy && game.enemy.reflectShield > 0) {
            const reflect = Math.floor(amount * game.enemy.reflectShield);
            game.enemy.hp = Math.max(0, game.enemy.hp - reflect);
            game.showText(`${reflect} REFLECT`, game.enemy.mesh.position, '#ff00ff');
        }

        // Shield absorbs damage first
        if (this.shield > 0) {
            const absorbed = Math.min(this.shield, finalDmg);
            this.shield -= absorbed;
            finalDmg -= absorbed;
            if (absorbed > 0) game.showText(`-${absorbed} SHIELD`, this.mesh.position, '#00f2ff');
        }
        this.hp = Math.max(0, this.hp - finalDmg);

        // --- MUTATION: FEEDBACK LOOP ---
        if (game.currentMutation === 'feedback' && this.isPlayer && finalDmg > 0) {
            this.mana = Math.min(this.maxMana, this.mana + Math.floor(this.maxMana * 0.1));
            game.showText("+10% MANA", this.mesh.position, '#00f2ff');
        }

        // --- BOSS PHASE INTERCEPTOR ---
        // If enemy hits 0 HP, is the Boss, and hasn't finished all phases:
        // GATED: Don't trigger if already in a cutscene or a phase is pending
        if (!this.isPlayer && this.hp <= 0 && game.floor === 100 &&
            game.state !== 'CUTSCENE' && !game.pendingBossTransformation && !game.pendingBossDefeat) {
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

        if (!this.isPlayer && this.hp < (this.maxHp * 0.2) && !this.isDesperate &&
            ['midboss', 'boss', 'architect'].includes(this.type)) {
            this.triggerDesperation();
        } else if (!this.isPlayer && !this.isRaging && this.hp < (this.maxHp * 0.5) &&
            ['midboss', 'boss', 'architect'].includes(this.type)) {
            this.triggerRage();
        }
        // -----------------------------
        // Thorns damage (reflect)
        if (this.isPlayer && this.thorns > 0 && game.enemy) {
            const thornsDmg = Math.floor(amount * this.thorns);
            if (thornsDmg > 0) {
                game.enemy.hp = Math.max(0, game.enemy.hp - thornsDmg);
                game.showText(`${thornsDmg} THORNS`, game.enemy.mesh.position, '#ff00ff');
            }
        }
        if (this.isPlayer) {
            const base = this.mesh.position.x;
            this.mesh.position.x -= 0.2;
            setTimeout(() => this.mesh.position.x = base, 50);
        }
        // Show Text handled in TriggerHit
    }
    unequip(slot) {
        const old = this.gear[slot];
        if (!old) return;

        // Remove flat bonuses (Update base stats)
        if (old.atk) this.baseAtk -= old.atk;
        if (old.hp) this.baseMaxHp -= old.hp;
        if (old.mana) this.baseMaxMana -= old.mana;
        if (old.crit) this.critChance -= old.crit;
        if (old.dodge) this.dodge -= old.dodge;

        // Remove multipliers
        if (old.atkMult) this.atkMult -= old.atkMult;
        if (old.hpMult) this.hpMult -= old.hpMult;
        if (old.manaMult) this.manaMult -= old.manaMult;
        if (old.critChance) this.critChance -= old.critChance;
        if (old.critDamage) this.critDamage -= old.critDamage;
        if (old.lifesteal) this.lifesteal -= old.lifesteal;
        if (old.armor) this.baseArmor = (this.baseArmor || 0) - old.armor;
        if (old.regen) this.baseManaRegen = (this.baseManaRegen || 5) - old.regen;
        if (old.thorns) this.thorns -= old.thorns;

        this.gear[slot] = null;
        this.recalculateStats();
        game.updateGearUI();
        game.showText(`UNEQUIPPED ${old.name}`, this.mesh.position, '#aaa');
    }

    equip(item) {
        const slot = item.type; // 'weapon' or 'accessory'

        // 1. Unequip existing if any
        if (this.gear[slot]) {
            // Stats are reversed inside unequip()
            this.unequip(slot);
        }

        // 2. Equip new (add stats)
        this.gear[slot] = item;

        // Add flat bonuses (Update base stats)
        if (item.atk) this.baseAtk += item.atk;
        if (item.hp) this.baseMaxHp += item.hp;
        if (item.mana) this.baseMaxMana += item.mana;
        if (item.crit) this.critChance += item.crit;
        if (item.dodge) this.dodge += item.dodge;

        // Add multipliers
        if (item.atkMult) this.atkMult = (this.atkMult || 0) + item.atkMult;
        if (item.hpMult) this.hpMult = (this.hpMult || 0) + item.hpMult;
        if (item.manaMult) this.manaMult = (this.manaMult || 0) + item.manaMult;
        if (item.critChance) this.critChance += item.critChance;
        if (item.critDamage) this.critDamage += item.critDamage;
        if (item.lifesteal) this.lifesteal += item.lifesteal;
        if (item.armor) this.baseArmor = (this.baseArmor || 0) + item.armor;
        if (item.regen) this.baseManaRegen = (this.baseManaRegen || 5) + item.regen;
        if (item.thorns) this.thorns = (this.thorns || 0) + item.thorns;

        // 3. Final Recalculation
        this.recalculateStats();

        // 4. UI Update
        game.updateGearUI();
        game.showText(`EQUIPPED ${item.name}`, this.mesh.position, '#00ff00');
    }

    recalculateStats() {
        const oldMaxHp = this.maxHp;
        const oldMaxMana = this.maxMana;

        // Apply multipliers: Final = Base * (1 + Mult)
        this.maxHp = Math.floor(this.baseMaxHp * (1 + (this.hpMult || 0)));
        this.atk = Math.floor(this.baseAtk * (1 + (this.atkMult || 0)));
        this.maxMana = Math.floor(this.baseMaxMana * (1 + (this.manaMult || 0)));
        this.armor = Math.floor(this.baseArmor + (this.baseAtk * 0.1 * (this.armorMult || 0))); // Armor scales with 10% of base ATK for meaningful padding
        this.manaRegen = Math.floor(this.baseManaRegen * (1 + (this.manaRegenMult || 0)));

        // Maintain HP/Mana ratio when max changes
        if (oldMaxHp > 0) {
            const hpRatio = this.hp / oldMaxHp;
            this.hp = Math.floor(this.maxHp * hpRatio);
        } else {
            this.hp = this.maxHp;
        }

        if (oldMaxMana > 0) {
            const manaRatio = this.mana / oldMaxMana;
            this.mana = Math.floor(this.maxMana * manaRatio);
        } else {
            this.mana = this.maxMana;
        }
    }

    triggerRage() {
        if (this.isRaging) return;
        this.isRaging = true;
        this.phase = 2;
        this.atk = Math.floor(this.atk * 1.5);
        if (this.mesh) this.mesh.scale.multiplyScalar(1.2);

        game.showText("URGE OVERDRIVE: ATK+50%", this.mesh.position, '#ff0000');

        // Visual Flare
        engine.addShake(0.8);
        engine.hitStop(50);
        game.runVFX('nuke', this.mesh.position, '#ff0000', 0, 1.5);

        // Zoom Camera briefly
        const oldPos = engine.camera.position.clone();
        const oldTarget = { ...engine.cameraTarget };
        engine.focusCamera(this.mesh.position, { x: 0, y: 1, z: 4 }, 300);
        setTimeout(() => {
            if (engine.camera && oldPos) {
                engine.camera.position.copy(oldPos);
                engine.cameraTarget = oldTarget;
            }
        }, 1000);
    }

    triggerDesperation() {
        if (this.isDesperate) return;
        this.isDesperate = true;

        // Desperation Effects
        this.atk = Math.floor(this.atk * 1.3); // Further Attack Boost
        this.reflectShield = 0.2; // 20% Reflection constant

        game.showText("⚠ CRITICAL ERROR: LIMIT REMOVED ⚠", this.mesh.position, '#ff0000');

        // VFX
        engine.addShake(1.0);
        engine.hitStop(50);
        game.runVFX('shockwave', this.mesh.position, '#ff0000', 0, 2.0);
    }
}
// --- GLOBAL INPUT TRACKING ---
document.addEventListener('mousemove', (e) => {
    if (typeof game !== 'undefined') {
        game.mouseX = (e.clientX / window.innerWidth) * 2 - 1;
        game.mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    }
});
