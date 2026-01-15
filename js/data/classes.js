// Auto-extracted constants from game.js
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
    "SQUIRE": [
        // 0-9: BASE - Tank
        {
            name: "SQUIRE", desc: "Tier 1: Heavy Defense", skills: [
                { name: "SLASH", cost: 0, mult: 1.0, color: 0xcccccc, vfx: 'slash', hits: 1, desc: "A disciplined vertical strike from a heavy combat blade." },
                { name: "SHIELD BASH", cost: 30, mult: 2.5, color: 0x00aaff, vfx: 'heavy', hits: 1, desc: "Use your defensive plate as a weapon of blunt impact." },
                { name: "IRON DEFENSE", cost: 20, isBuff: true, buffType: 'shield', buffVal: 0.40, duration: 8, color: 0x00aaff, desc: "Lock your armor plates to absorb 40% Max HP as damage." }
            ]
        },
        // 10-19
        {
            name: "VANGUARD", desc: "Tier 2: Frontline", skills: [
                { name: "WIDE SWEEP", cost: 0, mult: 1.2, color: 0xaaaaaa, vfx: 'slash', hits: 1, desc: "A wide horizontal sweep designed to control the battlefield." },
                { name: "CHARGE", cost: 45, mult: 3.5, color: 0x888888, vfx: 'heavy', hits: 1, desc: "Rush the enemy with the momentum of a freight train." },
                { name: "RALLY", cost: 25, isBuff: true, buffType: 'armor', buffVal: 0.25, duration: 8, color: 0xaaaaaa, desc: "Inspire yourself, fortifying your armor by 25%." }
            ]
        },
        // 20-29
        {
            name: "SENTINEL", desc: "Tier 3: Watcher", skills: [
                { name: "PIERCING THRUST", cost: 0, mult: 1.0, color: 0xffd700, vfx: 'beam', hits: 2, desc: "Two precise strikes that exploit gaps in enemy plating." },
                { name: "RETRIBUTION", cost: 60, mult: 5.0, color: 0xffaa00, vfx: 'heavy', hits: 1, desc: "A counter-strike delivered with punishing force." },
                { name: "OVERWATCH", cost: 35, isBuff: true, buffType: 'shield', buffVal: 0.60, duration: 8, color: 0xffd700, desc: "Enter a defensive stance, generating a shield for 60% Max HP." }
            ]
        },
        // 30-39
        {
            name: "JUSTICIAR", desc: "Tier 4: Law", skills: [
                { name: "VERDICT", cost: 0, mult: 0.8, color: 0xffffff, vfx: 'slash', hits: 3, desc: "Deliver three strikes of binding law." },
                { name: "EXECUTIONER", cost: 90, mult: 7.0, color: 0xff0000, vfx: 'crit', hits: 1, desc: "A heavy downward slash meant to end the conflict." },
                { name: "LAW OF STEEL", cost: 40, isBuff: true, buffType: 'all_defense', buffVal: 0.30, duration: 8, color: 0xffffff, desc: "Your armor becomes absolute law, boosting all defenses by 30%." }
            ]
        },
        // 40-49
        {
            name: "IMPERIAL-GUARD", desc: "Tier 5: Elite", skills: [
                { name: "IMPERIAL SLASH", cost: 0, mult: 0.6, color: 0xff0055, vfx: 'multi', hits: 5, desc: "An elite 5-hit sequence from the Emperor's training manual." },
                { name: "ROYAL DECREE", cost: 110, mult: 10.0, color: 0xff0055, vfx: 'god_beam', hits: 1, desc: "A strike so powerful it commands obedience from reality itself." },
                { name: "KINGS GUARD", cost: 45, isBuff: true, buffType: 'shield', buffVal: 1.0, duration: 8, color: 0xff0055, desc: "Summon the royal energy field to absorb 100% Max HP." }
            ]
        },
        // 50-59
        {
            name: "TECH-FORTRESS", desc: "Tier 6: Machine", skills: [
                { name: "AUTO-CANNON", cost: 0, mult: 0.4, color: 0x00f2ff, vfx: 'beam', hits: 8, desc: "Shoulder-mounted cannons fire a barrage of 8 energy rounds." },
                { name: "BUNKER BUSTER", cost: 140, mult: 12.0, color: 0xff6600, vfx: 'nuke', hits: 1, desc: "A high-explosive shell that cracks even the toughest defenses." },
                { name: "ENERGY WALL", cost: 50, isBuff: true, buffType: 'invincible', buffVal: 1, duration: 8, color: 0x00f2ff, desc: "Deploy a hard-light barrier granting invincibility for 2 turns." }
            ]
        },
        // 60-69
        {
            name: "DREADNOUGHT", desc: "Tier 7: War Machine", skills: [
                { name: "GATLING STRIKE", cost: 0, mult: 0.3, color: 0x552200, vfx: 'heavy', hits: 12, desc: "A continuous stream of heavy impacts that suppresses the enemy." },
                { name: "DOOMSDAY", cost: 160, mult: 15.0, color: 0xaa0000, vfx: 'nuke', hits: 1, desc: "Fire all weapon systems at once for catastrophic damage." },
                { name: "LIVING METAL", cost: 55, isBuff: true, buffType: 'regen', buffVal: 0.15, duration: 8, color: 0x888888, desc: "Nanites repair your hull, regenerating 15% HP per turn." }
            ]
        },
        // 70-79
        {
            name: "STAR-BASTION", desc: "Tier 8: Cosmic", skills: [
                { name: "COMET SHIELD", cost: 0, mult: 0.2, color: 0x0000ff, vfx: 'implode', hits: 20, desc: "Batter the enemy with a shield forged from a dying star." },
                { name: "SUPERNOVA", cost: 200, mult: 20.0, color: 0xffaa00, vfx: 'nova', hits: 1, desc: "Detonate your core energy in a controlled stellar explosion." },
                { name: "GRAVITY WELL", cost: 60, isBuff: true, buffType: 'all_defense', buffVal: 0.50, duration: 8, color: 0x220044, desc: "Bend gravity to deflect attacks, boosting defense by 50%." }
            ]
        },
        // 80-89
        {
            name: "GALACTIC-WALL", desc: "Tier 9: Unmovable", skills: [
                { name: "EVENT HORIZON", cost: 0, mult: 0.15, color: 0x220044, vfx: 'blackhole', hits: 30, desc: "Strikes that pull the enemy into a gravity trap." },
                { name: "BIG BANG", cost: 250, mult: 40.0, color: 0xffffff, vfx: 'god_beam', hits: 1, desc: "Recreate the birth of the universe in a single sword swing." },
                { name: "INFINITE MASS", cost: 70, isBuff: true, buffType: 'invincible', buffVal: 1, duration: 8, color: 0xffffff, desc: "Your density becomes infinite. 3 Turns of Invincibility." }
            ]
        },
        // 90+
        {
            name: "COSMIC-AEGIS", desc: "Tier 10: God", skills: [
                { name: "DIVINE JUDGEMENT", cost: 0, mult: 0.1, color: 0xffd700, vfx: 'omni', hits: 60, desc: "60 strikes from a higher dimension." },
                { name: "FINAL PROTECTOR", cost: 400, mult: 80.0, color: 0x00f2ff, vfx: 'god_beam', hits: 1, desc: "The ultimate blow. If it lands, you save the world." },
                { name: "ETERNAL GUARD", cost: 100, isBuff: true, buffType: 'shield', buffVal: 10.0, duration: 8, color: 0xffffff, desc: "A shield so strong it outlasts time. Absorb 1000% Max HP." }
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

const RARITY = {
    COMMON: { id: 'common', name: 'COMMON', mult: 1, prob: 1.00 },
    RARE: { id: 'rare', name: 'RARE', mult: 1.5, prob: 0.36 }, // 30% chance (0.06 + 0.30)
    EPIC: { id: 'epic', name: 'EPIC', mult: 2.5, prob: 0.06 }, // 5% chance (0.01 + 0.05)
    LEGENDARY: { id: 'legendary', name: 'LEGENDARY', mult: 5.0, prob: 0.01 }  // 1% chance
};
