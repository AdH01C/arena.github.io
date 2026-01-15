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
