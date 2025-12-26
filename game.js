// --- JOB TREES (UPDATED FOR SPECTACLE) ---

// --- 100 LEVEL JOB TREES ---
// const CLASS_TREES = {
//     "RONIN": [
//         // 0-9: BASE
//         { name: "CYBER-RONIN", desc: "Tier 1: Basics", skills: [
//             { name: "SLASH", cost: 0, mult: 1.0, color: 0xaa00ff, vfx: 'slash' },
//             { name: "EXECUTE", cost: 30, mult: 2.5, color: 0xff0055, vfx: 'heavy', hits: 1 },
//             { name: "BLADE FOCUS", cost: 20, isBuff: true, buffType: 'crit', buffVal: 0.15, duration: 3, color: 0xaa00ff, desc: "+15% Crit for 3 turns" }
//         ]},
//         // 10-19: ASSASSIN
//         { name: "VOID-STALKER", desc: "Tier 2: Speed", skills: [
//             { name: "PHANTOM CUT", cost: 0, mult: 1.2, color: 0x9900ff, vfx: 'multi', hits: 3 },
//             { name: "ASSASSINATE", cost: 45, mult: 4.0, color: 0xff0000, vfx: 'crit', hits: 1 },
//             { name: "SHADOW CLOAK", cost: 25, isBuff: true, buffType: 'dodge', buffVal: 0.25, duration: 3, color: 0x9900ff, desc: "+25% Dodge for 3 turns" }
//         ]},
//         // 20-29: TIME
//         { name: "TIME-SLAYER", desc: "Tier 3: Multi-Hit", skills: [
//             { name: "DIMENSION REND", cost: 0, mult: 0.5, color: 0xffffff, vfx: 'slash', hits: 5 },
//             { name: "OMNI-SLASH", cost: 60, mult: 6.0, color: 0xaa00ff, vfx: 'omni', hits: 10 },
//             { name: "TIME DILATION", cost: 30, isBuff: true, buffType: 'doubleStrike', buffVal: 0.30, duration: 3, color: 0xffffff, desc: "+30% Double Strike for 3 turns" }
//         ]},
//         // 30-39: SHADOW
//         { name: "SHADOW-LORD", desc: "Tier 4: Dark Arts", skills: [
//             { name: "NIGHTFALL", cost: 0, mult: 0.8, color: 0x330033, vfx: 'implode', hits: 4 },
//             { name: "DEATH MARK", cost: 80, mult: 8.0, color: 0x550055, vfx: 'heavy', hits: 1 },
//             { name: "DARK PACT", cost: 35, isBuff: true, buffType: 'lifesteal', buffVal: 0.20, duration: 3, color: 0x550055, desc: "+20% Lifesteal for 3 turns" }
//         ]},
//         // 40-49: BLOOD
//         { name: "BLOOD-LETTER", desc: "Tier 5: Lifesteal", skills: [
//             { name: "HEMORRHAGE", cost: 0, mult: 1.0, color: 0xff0000, vfx: 'multi', hits: 6 },
//             { name: "VAMPIRISM", cost: 100, mult: 5.0, color: 0xaa0000, vfx: 'implode', heal: 200 },
//             { name: "BLOOD RAGE", cost: 40, isBuff: true, buffType: 'atk', buffVal: 30, duration: 3, color: 0xff0000, desc: "+30 ATK for 3 turns" }
//         ]},
//         // 50-59: ETHER
//         { name: "ETHER-BLADE", desc: "Tier 6: Magic Dmg", skills: [
//             { name: "SPIRIT SLASH", cost: 0, mult: 1.5, color: 0x00ffff, vfx: 'beam', hits: 2 },
//             { name: "SOUL REND", cost: 120, mult: 10.0, color: 0x00aaff, vfx: 'crit', hits: 1 },
//             { name: "ETHER FORM", cost: 45, isBuff: true, buffType: 'dodge', buffVal: 0.40, duration: 2, color: 0x00ffff, desc: "+40% Dodge for 2 turns" }
//         ]},
//         // 60-69: VOID
//         { name: "VOID-WALKER", desc: "Tier 7: Black Holes", skills: [
//             { name: "GRAVITY WELL", cost: 0, mult: 0.5, color: 0x111111, vfx: 'implode', hits: 8 },
//             { name: "EVENT HORIZON", cost: 150, mult: 12.0, color: 0x000000, vfx: 'blackhole', hits: 1 },
//             { name: "VOID SHROUD", cost: 50, isBuff: true, buffType: 'critDamage', buffVal: 0.50, duration: 3, color: 0x111111, desc: "+50% Crit DMG for 3 turns" }
//         ]},
//         // 70-79: LIGHTSPEED
//         { name: "FLASH-STEP", desc: "Tier 8: Velocity", skills: [
//             { name: "MACH SLASH", cost: 0, mult: 0.2, color: 0xffff00, vfx: 'omni', hits: 20 },
//             { name: "LIGHTSPEED", cost: 180, mult: 15.0, color: 0xffffff, vfx: 'beam', hits: 1 },
//             { name: "HYPER SPEED", cost: 55, isBuff: true, buffType: 'doubleStrike', buffVal: 0.50, duration: 3, color: 0xffff00, desc: "+50% Double Strike for 3 turns" }
//         ]},
//         // 80-89: REALITY
//         { name: "REALITY-BREAKER", desc: "Tier 9: Glitch", skills: [
//             { name: "GLITCH CUT", cost: 0, mult: 1.0, color: 0x00ff00, vfx: 'matrix', hits: 10 },
//             { name: "SYSTEM PURGE", cost: 220, mult: 20.0, color: 0x00ff00, vfx: 'matrix', hits: 1 },
//             { name: "REALITY WARP", cost: 60, isBuff: true, buffType: 'crit', buffVal: 0.30, duration: 3, color: 0x00ff00, desc: "+30% Crit for 3 turns" }
//         ]},
//         // 90+: GOD
//         { name: "SINGULARITY", desc: "Tier 10: Cosmic", skills: [
//             { name: "BIG BANG", cost: 0, mult: 1.0, color: 0xffffff, vfx: 'blackhole', hits: 15 },
//             { name: "END OF TIME", cost: 300, mult: 50.0, color: 0x000000, vfx: 'blackhole', hits: 1 },
//             { name: "GODSPEED", cost: 80, isBuff: true, buffType: 'all_offense', buffVal: 0.25, duration: 3, color: 0xffd700, desc: "+25% All Offense for 3 turns" }
//         ]}
//     ],

//     "PRIEST": [
//         // 0-9
//         { name: "TECH-PRIEST", desc: "Tier 1: Basics", skills: [
//             { name: "ZAP", cost: 0, mult: 0.8, color: 0xffff00, vfx: 'zap', manaGain: 8 },
//             { name: "SMITE", cost: 30, mult: 2.0, color: 0x00f2ff, vfx: 'beam', heal: 30 },
//             { name: "BLESSING", cost: 15, isBuff: true, buffType: 'regen', buffVal: 20, duration: 3, color: 0x00ff00, desc: "Heal 20 HP for 3 turns" }
//         ]},
//         // 10-19
//         { name: "CYBER-BISHOP", desc: "Tier 2: Holy", skills: [
//             { name: "SIPHON", cost: 0, mult: 1.0, color: 0xffffaa, vfx: 'drain', manaGain: 15 },
//             { name: "HOLY NOVA", cost: 50, mult: 3.5, color: 0x00ffff, vfx: 'nova', heal: 50 },
//             { name: "SANCTUARY", cost: 25, isBuff: true, buffType: 'shield', buffVal: 50, duration: 1, color: 0x00ffff, desc: "+50 Shield" }
//         ]},
//         // 20-29
//         { name: "DEUS-EX", desc: "Tier 3: Machine", skills: [
//             { name: "DATA DRAIN", cost: 0, mult: 1.2, color: 0x00ff00, vfx: 'matrix', manaGain: 25 },
//             { name: "REBOOT", cost: 80, mult: 5.0, color: 0x00ffaa, vfx: 'nova', heal: 100 },
//             { name: "FIREWALL", cost: 30, isBuff: true, buffType: 'armor', buffVal: 15, duration: 3, color: 0x00ff00, desc: "+15 Armor for 3 turns" }
//         ]},
//         // 30-39
//         { name: "ANGEL-MK1", desc: "Tier 4: Flight", skills: [
//             { name: "LASER WING", cost: 0, mult: 0.5, color: 0xffffff, vfx: 'beam', hits: 4, manaGain: 30 },
//             { name: "HEAVENLY RAY", cost: 100, mult: 8.0, color: 0xffffdd, vfx: 'god_beam', heal: 150 },
//             { name: "DIVINE GRACE", cost: 35, isBuff: true, buffType: 'regen', buffVal: 50, duration: 3, color: 0xffffff, desc: "Heal 50 HP for 3 turns" }
//         ]},
//         // 40-49
//         { name: "ORACLE", desc: "Tier 5: Sight", skills: [
//             { name: "PREDICTION", cost: 0, mult: 2.0, color: 0xaa00ff, vfx: 'zap', manaGain: 40 },
//             { name: "FATE SEAL", cost: 120, mult: 10.0, color: 0xdd00ff, vfx: 'implode', heal: 200 },
//             { name: "FORESIGHT", cost: 40, isBuff: true, buffType: 'dodge', buffVal: 0.35, duration: 3, color: 0xaa00ff, desc: "+35% Dodge for 3 turns" }
//         ]},
//         // 50-59
//         { name: "HIGH-TEMPLAR", desc: "Tier 6: Storm", skills: [
//             { name: "PSIONIC STORM", cost: 0, mult: 0.5, color: 0x0000ff, vfx: 'rain', hits: 10, manaGain: 10 },
//             { name: "FEEDBACK", cost: 150, mult: 12.0, color: 0x00aaff, vfx: 'nova', heal: 250 },
//             { name: "PSI SHIELD", cost: 45, isBuff: true, buffType: 'shield', buffVal: 100, duration: 1, color: 0x0000ff, desc: "+100 Shield" }
//         ]},
//         // 60-69
//         { name: "SERAPHIM", desc: "Tier 7: Fire", skills: [
//             { name: "HOLY FIRE", cost: 0, mult: 1.5, color: 0xffaa00, vfx: 'beam', hits: 3, manaGain: 50 },
//             { name: "PURGATORY", cost: 180, mult: 15.0, color: 0xff5500, vfx: 'nuke', heal: 300 },
//             { name: "WINGS OF LIGHT", cost: 50, isBuff: true, buffType: 'thorns', buffVal: 0.30, duration: 3, color: 0xffaa00, desc: "+30% Thorns for 3 turns" }
//         ]},
//         // 70-79
//         { name: "ARCHON", desc: "Tier 8: Power", skills: [
//             { name: "POWER OVERWHELM", cost: 0, mult: 1.0, color: 0x00f2ff, vfx: 'omni', hits: 5, manaGain: 60 },
//             { name: "ARCHON BEAM", cost: 220, mult: 20.0, color: 0x00f2ff, vfx: 'god_beam', heal: 400 },
//             { name: "TRANSCENDENCE", cost: 55, isBuff: true, buffType: 'all_defense', buffVal: 0.25, duration: 3, color: 0x00f2ff, desc: "+25% All Defense for 3 turns" }
//         ]},
//         // 80-89
//         { name: "SOURCE-CODE", desc: "Tier 9: Admin", skills: [
//             { name: "REWRITE", cost: 0, mult: 2.0, color: 0x00ff00, vfx: 'matrix', manaGain: 100 },
//             { name: "DELETE", cost: 250, mult: 30.0, color: 0xff0000, vfx: 'blackhole', heal: 500 },
//             { name: "SUDO HEAL", cost: 60, isBuff: true, buffType: 'regen', buffVal: 150, duration: 3, color: 0x00ff00, desc: "Heal 150 HP for 3 turns" }
//         ]},
//         // 90+
//         { name: "DIGITAL-GOD", desc: "Tier 10: Omni", skills: [
//             { name: "CREATION", cost: 0, mult: 5.0, color: 0xffffff, vfx: 'god_beam', manaGain: 999 },
//             { name: "RAPTURE", cost: 400, mult: 60.0, color: 0xffd700, vfx: 'nova', heal: 9999 },
//             { name: "IMMORTALITY", cost: 100, isBuff: true, buffType: 'invincible', buffVal: 1, duration: 2, color: 0xffd700, desc: "Invincible for 2 turns" }
//         ]}
//     ],

//     "MECH": [
//         // 0-9
//         { name: "HEAVY-MECH", desc: "Tier 1: Basics", skills: [
//             { name: "GATLING", cost: 0, mult: 0.3, color: 0xffaa00, vfx: 'gatling', hits: 3 },
//             { name: "MISSILE", cost: 30, mult: 3.0, color: 0xff5500, vfx: 'explode', hits: 1 },
//             { name: "IRON WALL", cost: 20, isBuff: true, buffType: 'armor', buffVal: 10, duration: 3, color: 0xaaaaaa, desc: "+10 Armor for 3 turns" }
//         ]},
//         // 10-19
//         { name: "WAR-TITAN", desc: "Tier 2: Dakka", skills: [
//             { name: "ROTARY", cost: 0, mult: 0.2, color: 0xff9900, vfx: 'gatling', hits: 6 },
//             { name: "NUKE", cost: 50, mult: 5.0, color: 0xff2200, vfx: 'nuke', hits: 1 },
//             { name: "SIEGE MODE", cost: 25, isBuff: true, buffType: 'atk', buffVal: 20, duration: 3, color: 0xff9900, desc: "+20 ATK for 3 turns" }
//         ]},
//         // 20-29
//         { name: "APOCALYPSE", desc: "Tier 3: Barrage", skills: [
//             { name: "BULLET HELL", cost: 0, mult: 0.1, color: 0xffaa00, vfx: 'gatling', hits: 15 },
//             { name: "BUNKER BUSTER", cost: 80, mult: 7.0, color: 0xff0000, vfx: 'nuke', hits: 1 },
//             { name: "AMMO FEED", cost: 30, isBuff: true, buffType: 'manaRegen', buffVal: 15, duration: 3, color: 0xffaa00, desc: "+15 Mana Regen for 3 turns" }
//         ]},
//         // 30-39
//         { name: "ARTILLERY", desc: "Tier 4: Long Range", skills: [
//             { name: "HOWITZER", cost: 0, mult: 2.0, color: 0xaa5500, vfx: 'heavy', hits: 1 },
//             { name: "CARPET BOMB", cost: 100, mult: 1.0, color: 0xff5500, vfx: 'rain', hits: 10 },
//             { name: "ENTRENCH", cost: 35, isBuff: true, buffType: 'armor', buffVal: 25, duration: 3, color: 0xaa5500, desc: "+25 Armor for 3 turns" }
//         ]},
//         // 40-49
//         { name: "LASER-CORE", desc: "Tier 5: Energy", skills: [
//             { name: "PULSE RIFLE", cost: 0, mult: 0.5, color: 0x00f2ff, vfx: 'beam', hits: 5 },
//             { name: "ION CANNON", cost: 120, mult: 12.0, color: 0x00ffff, vfx: 'god_beam', hits: 1 },
//             { name: "POWER CORE", cost: 40, isBuff: true, buffType: 'critDamage', buffVal: 0.40, duration: 3, color: 0x00f2ff, desc: "+40% Crit DMG for 3 turns" }
//         ]},
//         // 50-59
//         { name: "FORTRESS", desc: "Tier 6: Defense", skills: [
//             { name: "FLAK", cost: 0, mult: 0.3, color: 0xffff00, vfx: 'explode', hits: 12 },
//             { name: "DOOMSDAY", cost: 150, mult: 15.0, color: 0xff0000, vfx: 'nuke', hits: 1 },
//             { name: "BUNKER", cost: 45, isBuff: true, buffType: 'shield', buffVal: 150, duration: 1, color: 0xffff00, desc: "+150 Shield" }
//         ]},
//         // 60-69
//         { name: "GUNDAM-X", desc: "Tier 7: Mobile", skills: [
//             { name: "BEAM SABER", cost: 0, mult: 1.0, color: 0xff00ff, vfx: 'slash', hits: 3 },
//             { name: "FULL BURST", cost: 180, mult: 0.8, color: 0x00ff00, vfx: 'omni', hits: 25 },
//             { name: "TRANS-AM", cost: 50, isBuff: true, buffType: 'all_offense', buffVal: 0.20, duration: 3, color: 0xff00ff, desc: "+20% All Offense for 3 turns" }
//         ]},
//         // 70-79
//         { name: "DREADNOUGHT", desc: "Tier 8: Space", skills: [
//             { name: "MACRO CANNON", cost: 0, mult: 3.0, color: 0xaaaaff, vfx: 'heavy', hits: 2 },
//             { name: "EXTERMINATUS", cost: 220, mult: 25.0, color: 0xffaa00, vfx: 'rain', hits: 15 },
//             { name: "VOID SHIELDS", cost: 55, isBuff: true, buffType: 'shield', buffVal: 250, duration: 1, color: 0xaaaaff, desc: "+250 Shield" }
//         ]},
//         // 80-89
//         { name: "WORLD-EATER", desc: "Tier 9: Planetary", skills: [
//             { name: "CRUST CRACK", cost: 0, mult: 2.0, color: 0xff5500, vfx: 'implode', hits: 5 },
//             { name: "CORE DETONATE", cost: 260, mult: 40.0, color: 0xff0000, vfx: 'nuke', hits: 1 },
//             { name: "TITAN MIGHT", cost: 60, isBuff: true, buffType: 'atk', buffVal: 100, duration: 3, color: 0xff5500, desc: "+100 ATK for 3 turns" }
//         ]},
//         // 90+
//         { name: "ANNIHILATOR", desc: "Tier 10: Universal", skills: [
//             { name: "ZERO POINT", cost: 0, mult: 1.0, color: 0xffffff, vfx: 'gatling', hits: 50 },
//             { name: "SUPERNOVA", cost: 400, mult: 80.0, color: 0xffaa00, vfx: 'nuke', hits: 1 },
//             { name: "OMEGA PROTOCOL", cost: 80, isBuff: true, buffType: 'all_offense', buffVal: 0.50, duration: 3, color: 0xffd700, desc: "+50% All Offense for 3 turns" }
//         ]}
//     ],

//     "SHADOW": [
//         // 0-9: BASE - Stealth Assassin
//         { name: "SHADE", desc: "Tier 1: Stealth", skills: [
//             { name: "BACKSTAB", cost: 0, mult: 1.2, color: 0x220033, vfx: 'slash' },
//             { name: "POISON BLADE", cost: 25, mult: 1.5, color: 0x00ff00, vfx: 'multi', hits: 3 },
//             { name: "VANISH", cost: 20, isBuff: true, buffType: 'dodge', buffVal: 0.30, duration: 2, color: 0x220033, desc: "+30% Dodge for 2 turns" }
//         ]},
//         // 10-19: Poison Master
//         { name: "VENOM-WEAVER", desc: "Tier 2: Toxins", skills: [
//             { name: "TOXIC SLASH", cost: 0, mult: 0.8, color: 0x00aa00, vfx: 'multi', hits: 4 },
//             { name: "VENOM BURST", cost: 45, mult: 4.5, color: 0x00ff00, vfx: 'implode', hits: 1 },
//             { name: "NEUROTOXIN", cost: 25, isBuff: true, buffType: 'crit', buffVal: 0.20, duration: 3, color: 0x00ff00, desc: "+20% Crit for 3 turns" }
//         ]},
//         // 20-29: Ghost
//         { name: "PHANTOM", desc: "Tier 3: Intangible", skills: [
//             { name: "PHASE STRIKE", cost: 0, mult: 0.6, color: 0x8800aa, vfx: 'slash', hits: 5 },
//             { name: "SOUL DRAIN", cost: 55, mult: 5.0, color: 0xaa00ff, vfx: 'implode', heal: 80 },
//             { name: "PHASE SHIFT", cost: 30, isBuff: true, buffType: 'invincible', buffVal: 1, duration: 1, color: 0x8800aa, desc: "Invincible for 1 turn" }
//         ]},
//         // 30-39: Assassin
//         { name: "DEATH-DEALER", desc: "Tier 4: Execute", skills: [
//             { name: "MARKED DEATH", cost: 0, mult: 1.5, color: 0x440044, vfx: 'crit', hits: 2 },
//             { name: "EXECUTE ORDER", cost: 75, mult: 8.0, color: 0xff0044, vfx: 'heavy', hits: 1 },
//             { name: "DEATH MARK", cost: 35, isBuff: true, buffType: 'critDamage', buffVal: 0.50, duration: 3, color: 0xff0044, desc: "+50% Crit DMG for 3 turns" }
//         ]},
//         // 40-49: Nightmare
//         { name: "NIGHTMARE", desc: "Tier 5: Fear", skills: [
//             { name: "TERROR", cost: 0, mult: 0.7, color: 0x110011, vfx: 'implode', hits: 6 },
//             { name: "NIGHT TERROR", cost: 90, mult: 6.0, color: 0x330033, vfx: 'blackhole', hits: 3 },
//             { name: "FEAR AURA", cost: 40, isBuff: true, buffType: 'lifesteal', buffVal: 0.25, duration: 3, color: 0x330033, desc: "+25% Lifesteal for 3 turns" }
//         ]},
//         // 50-59: Reaper
//         { name: "GRIM-REAPER", desc: "Tier 6: Death", skills: [
//             { name: "SCYTHE SWEEP", cost: 0, mult: 1.2, color: 0x000000, vfx: 'slash', hits: 4 },
//             { name: "REAP SOULS", cost: 110, mult: 10.0, color: 0x440044, vfx: 'implode', heal: 150 },
//             { name: "DEATH'S DOOR", cost: 45, isBuff: true, buffType: 'crit', buffVal: 0.35, duration: 3, color: 0x000000, desc: "+35% Crit for 3 turns" }
//         ]},
//         // 60-69: Wraith
//         { name: "WRAITH-LORD", desc: "Tier 7: Ethereal", skills: [
//             { name: "SPECTRAL BLADES", cost: 0, mult: 0.5, color: 0x6600aa, vfx: 'omni', hits: 10 },
//             { name: "SOUL SHATTER", cost: 140, mult: 12.0, color: 0xaa00ff, vfx: 'blackhole', hits: 1 },
//             { name: "WRAITH FORM", cost: 50, isBuff: true, buffType: 'invincible', buffVal: 1, duration: 2, color: 0x6600aa, desc: "Invincible for 2 turns" }
//         ]},
//         // 70-79: Void Assassin
//         { name: "VOID-FANG", desc: "Tier 8: Void", skills: [
//             { name: "VOID FANGS", cost: 0, mult: 0.8, color: 0x220022, vfx: 'multi', hits: 12 },
//             { name: "ANNIHILATE", cost: 170, mult: 18.0, color: 0x000000, vfx: 'blackhole', hits: 1 },
//             { name: "VOID EMBRACE", cost: 55, isBuff: true, buffType: 'all_offense', buffVal: 0.25, duration: 3, color: 0x220022, desc: "+25% All Offense for 3 turns" }
//         ]},
//         // 80-89: Entropy
//         { name: "ENTROPY", desc: "Tier 9: Decay", skills: [
//             { name: "DECAY", cost: 0, mult: 1.5, color: 0x003300, vfx: 'implode', hits: 8 },
//             { name: "ENTROPY WAVE", cost: 200, mult: 30.0, color: 0x006600, vfx: 'nova', hits: 1 },
//             { name: "CHAOS FIELD", cost: 60, isBuff: true, buffType: 'critDamage', buffVal: 0.75, duration: 3, color: 0x003300, desc: "+75% Crit DMG for 3 turns" }
//         ]},
//         // 90+: Death Incarnate
//         { name: "OBLIVION", desc: "Tier 10: End", skills: [
//             { name: "OBLIVION", cost: 0, mult: 0.8, color: 0x000000, vfx: 'blackhole', hits: 20 },
//             { name: "TRUE DEATH", cost: 350, mult: 100.0, color: 0x220022, vfx: 'blackhole', hits: 1 },
//             { name: "DEATH AVATAR", cost: 80, isBuff: true, buffType: 'all_offense', buffVal: 0.60, duration: 3, color: 0x000000, desc: "+60% All Offense for 3 turns" }
//         ]}
//     ],

//     "BRAWLER": [
//         // 0-9: BASE - Street Fighter (isFrenzy = click speed bonus, doubleAttack = hits twice)
//         { name: "STREET-PUNK", desc: "Tier 1: Speed", skills: [
//             { name: "JAB", cost: 0, mult: 0.6, color: 0xff4400, vfx: 'punch', isFrenzy: true },
//             { name: "HAYMAKER", cost: 25, mult: 2.0, color: 0xff6600, vfx: 'heavy', doubleAttack: true },
//             { name: "ADRENALINE", cost: 15, isBuff: true, buffType: 'atkMult', buffVal: 0.20, duration: 3, color: 0xff4400, desc: "+20% ATK Mult for 3 turns" }
//         ]},
//         // 10-19: Boxer
//         { name: "CHROME-BOXER", desc: "Tier 2: Combos", skills: [
//             { name: "ONE-TWO", cost: 0, mult: 0.5, color: 0xff5500, vfx: 'punch', hits: 2, isFrenzy: true },
//             { name: "UPPERCUT", cost: 40, mult: 3.5, color: 0xff7700, vfx: 'heavy', doubleAttack: true },
//             { name: "RAGE MODE", cost: 20, isBuff: true, buffType: 'atkMult', buffVal: 0.30, duration: 3, color: 0xff5500, desc: "+30% ATK Mult for 3 turns" }
//         ]},
//         // 20-29: Kickboxer
//         { name: "CYBER-KICK", desc: "Tier 3: Kicks", skills: [
//             { name: "RAPID KICKS", cost: 0, mult: 0.4, color: 0xff6600, vfx: 'punch', hits: 4, isFrenzy: true },
//             { name: "ROUNDHOUSE", cost: 55, mult: 5.0, color: 0xff8800, vfx: 'slash', doubleAttack: true },
//             { name: "FIGHTING SPIRIT", cost: 25, isBuff: true, buffType: 'atkMult', buffVal: 0.40, duration: 3, color: 0xff6600, desc: "+40% ATK Mult for 3 turns" }
//         ]},
//         // 30-39: Wrestler
//         { name: "GRAPPLER", desc: "Tier 4: Throws", skills: [
//             { name: "COMBO STRIKE", cost: 0, mult: 0.5, color: 0xff7700, vfx: 'punch', hits: 5, isFrenzy: true },
//             { name: "PILEDRIVER", cost: 70, mult: 7.0, color: 0xff9900, vfx: 'heavy', doubleAttack: true },
//             { name: "IRON BODY", cost: 30, isBuff: true, buffType: 'atkMult', buffVal: 0.50, duration: 3, color: 0xff7700, desc: "+50% ATK Mult for 3 turns" }
//         ]},
//         // 40-49: Berserker
//         { name: "BERSERKER", desc: "Tier 5: Fury", skills: [
//             { name: "FRENZY", cost: 0, mult: 0.3, color: 0xff2200, vfx: 'punch', hits: 8, isFrenzy: true },
//             { name: "RAMPAGE", cost: 85, mult: 4.0, color: 0xff0000, vfx: 'omni', hits: 5, doubleAttack: true },
//             { name: "BLOOD FURY", cost: 35, isBuff: true, buffType: 'atkMult', buffVal: 0.60, duration: 3, color: 0xff2200, desc: "+60% ATK Mult for 3 turns" }
//         ]},
//         // 50-59: Champion
//         { name: "PIT-CHAMPION", desc: "Tier 6: Glory", skills: [
//             { name: "FLURRY", cost: 0, mult: 0.25, color: 0xffaa00, vfx: 'punch', hits: 12, isFrenzy: true },
//             { name: "FINISHER", cost: 100, mult: 12.0, color: 0xffcc00, vfx: 'crit', doubleAttack: true },
//             { name: "CHAMPION'S WILL", cost: 40, isBuff: true, buffType: 'atkMult', buffVal: 0.75, duration: 3, color: 0xffaa00, desc: "+75% ATK Mult for 3 turns" }
//         ]},
//         // 60-69: Titan
//         { name: "IRON-TITAN", desc: "Tier 7: Power", skills: [
//             { name: "METEOR FISTS", cost: 0, mult: 0.3, color: 0xff5500, vfx: 'punch', hits: 15, isFrenzy: true },
//             { name: "TITAN SMASH", cost: 130, mult: 15.0, color: 0xff8800, vfx: 'nuke', doubleAttack: true },
//             { name: "UNSTOPPABLE", cost: 45, isBuff: true, buffType: 'atkMult', buffVal: 1.0, duration: 3, color: 0xff5500, desc: "+100% ATK Mult for 3 turns" }
//         ]},
//         // 70-79: God Fist
//         { name: "GOD-FIST", desc: "Tier 8: Divine", skills: [
//             { name: "INFINITE COMBO", cost: 0, mult: 0.2, color: 0xffd700, vfx: 'omni', hits: 25, isFrenzy: true },
//             { name: "DIVINE STRIKE", cost: 160, mult: 20.0, color: 0xffffff, vfx: 'god_beam', doubleAttack: true },
//             { name: "GODLIKE", cost: 50, isBuff: true, buffType: 'atkMult', buffVal: 1.25, duration: 3, color: 0xffd700, desc: "+125% ATK Mult for 3 turns" }
//         ]},
//         // 80-89: Universe
//         { name: "STAR-BREAKER", desc: "Tier 9: Cosmic", skills: [
//             { name: "STAR RUSH", cost: 0, mult: 0.25, color: 0xffff00, vfx: 'omni', hits: 30, isFrenzy: true },
//             { name: "GALAXY CRUSHER", cost: 200, mult: 35.0, color: 0xffffff, vfx: 'blackhole', doubleAttack: true },
//             { name: "LIMIT BREAK", cost: 55, isBuff: true, buffType: 'atkMult', buffVal: 1.50, duration: 3, color: 0xffff00, desc: "+150% ATK Mult for 3 turns" }
//         ]},
//         // 90+: One Punch
//         { name: "ONE-PUNCH", desc: "Tier 10: END", skills: [
//             { name: "SERIOUS PUNCHES", cost: 0, mult: 0.15, color: 0xffffff, vfx: 'omni', hits: 50, isFrenzy: true },
//             { name: "ONE PUNCH", cost: 500, mult: 999.0, color: 0xffd700, vfx: 'nuke', hits: 1 },
//             { name: "LIMITLESS", cost: 80, isBuff: true, buffType: 'atkMult', buffVal: 2.0, duration: 3, color: 0xffffff, desc: "+200% ATK Mult for 3 turns" }
//         ]}
//     ]
// };
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
        { name: "SHADE", desc: "Tier 2: Stealth", skills: [
            { name: "BACKSTAB", cost: 0, mult: 1.2, color: 0x220033, vfx: 'slash', hits: 1 },
            { name: "POISON BLADE", cost: 25, mult: 0.5, color: 0x00ff00, vfx: 'multi', hits: 4 },
            { name: "VANISH", cost: 20, isBuff: true, buffType: 'dodge', buffVal: 0.30, duration: 2, color: 0x220033, desc: "+30% Dodge" }
        ]},
        // 10-19
        { name: "VENOM-WEAVER", desc: "Tier 3: Toxins", skills: [
            { name: "TOXIC SLASH", cost: 0, mult: 0.3, color: 0x00aa00, vfx: 'multi', hits: 5 }, // Total 1.5x
            { name: "VENOM BURST", cost: 45, mult: 4.5, color: 0x00ff00, vfx: 'implode', hits: 1 },
            { name: "NEUROTOXIN", cost: 25, isBuff: true, buffType: 'crit', buffVal: 0.20, duration: 3, color: 0x00ff00, desc: "+20% Crit" }
        ]},
        // 20-29
        { name: "PHANTOM", desc: "Tier 4: Intangible", skills: [
            { name: "PHASE STRIKE", cost: 0, mult: 0.25, color: 0x8800aa, vfx: 'slash', hits: 7 }, // Total 1.75x
            { name: "SOUL DRAIN", cost: 55, mult: 2.5, color: 0xaa00ff, vfx: 'implode', hits: 2, heal: 80 },
            { name: "PHASE SHIFT", cost: 30, isBuff: true, buffType: 'invincible', buffVal: 1, duration: 1, color: 0x8800aa, desc: "Invincible 1 turn" }
        ]},
        // 30-39
        { name: "DEATH-DEALER", desc: "Tier 5: Execute", skills: [
            { name: "MARKED DEATH", cost: 0, mult: 0.22, color: 0x440044, vfx: 'crit', hits: 10 }, // Total 2.2x
            { name: "EXECUTE ORDER", cost: 75, mult: 8.0, color: 0xff0044, vfx: 'heavy', hits: 1 },
            { name: "DEATH MARK", cost: 35, isBuff: true, buffType: 'critDamage', buffVal: 0.50, duration: 3, color: 0xff0044, desc: "+50% Crit DMG" }
        ]},
        // 40-49
        { name: "NIGHTMARE", desc: "Tier 6: Fear", skills: [
            { name: "TERROR", cost: 0, mult: 0.2, color: 0x110011, vfx: 'implode', hits: 12 }, // Total 2.4x
            { name: "NIGHT TERROR", cost: 90, mult: 3.0, color: 0x330033, vfx: 'blackhole', hits: 3 },
            { name: "FEAR AURA", cost: 40, isBuff: true, buffType: 'lifesteal', buffVal: 0.25, duration: 3, color: 0x330033, desc: "+25% Lifesteal" }
        ]},
        // 50-59
        { name: "GRIM-REAPER", desc: "Tier 7: Death", skills: [
            { name: "SCYTHE SWEEP", cost: 0, mult: 0.18, color: 0x000000, vfx: 'slash', hits: 15 }, // Total 2.7x
            { name: "REAP SOULS", cost: 110, mult: 2.0, color: 0x440044, vfx: 'implode', hits: 5, heal: 150 },
            { name: "DEATH'S DOOR", cost: 45, isBuff: true, buffType: 'crit', buffVal: 0.35, duration: 3, color: 0x000000, desc: "+35% Crit" }
        ]},
        // 60-69
        { name: "WRAITH-LORD", desc: "Tier 8: Ethereal", skills: [
            { name: "SPECTRAL BLADES", cost: 0, mult: 0.16, color: 0x6600aa, vfx: 'omni', hits: 20 }, // Total 3.2x
            { name: "SOUL SHATTER", cost: 140, mult: 12.0, color: 0xaa00ff, vfx: 'blackhole', hits: 1 },
            { name: "WRAITH FORM", cost: 50, isBuff: true, buffType: 'invincible', buffVal: 1, duration: 2, color: 0x6600aa, desc: "Invincible 2 turns" }
        ]},
        // 70-79
        { name: "VOID-FANG", desc: "Tier 9: Void", skills: [
            { name: "VOID FANGS", cost: 0, mult: 0.15, color: 0x220022, vfx: 'multi', hits: 25 }, // Total 3.75x
            { name: "ANNIHILATE", cost: 170, mult: 18.0, color: 0x000000, vfx: 'blackhole', hits: 1 },
            { name: "VOID EMBRACE", cost: 55, isBuff: true, buffType: 'all_offense', buffVal: 0.25, duration: 3, color: 0x220022, desc: "+25% All Offense" }
        ]},
        // 80-89
        { name: "ENTROPY", desc: "Tier 10: Decay", skills: [
            { name: "DECAY", cost: 0, mult: 0.14, color: 0x003300, vfx: 'implode', hits: 30 }, // Total 4.2x
            { name: "ENTROPY WAVE", cost: 200, mult: 30.0, color: 0x006600, vfx: 'nova', hits: 1 },
            { name: "CHAOS FIELD", cost: 60, isBuff: true, buffType: 'critDamage', buffVal: 0.75, duration: 3, color: 0x003300, desc: "+75% Crit DMG" }
        ]},
        // 90+
        { name: "OBLIVION", desc: "Tier 11: End", skills: [
            { name: "OBLIVION", cost: 0, mult: 0.12, color: 0x000000, vfx: 'blackhole', hits: 40 }, // Total 4.8x
            { name: "TRUE DEATH", cost: 350, mult: 100.0, color: 0x220022, vfx: 'blackhole', hits: 1 },
            { name: "DEATH AVATAR", cost: 80, isBuff: true, buffType: 'all_offense', buffVal: 0.60, duration: 3, color: 0x000000, desc: "+60% All Offense" }
        ]}
    ],

    "BRAWLER": [
        // 0-9: BASE
        { name: "STREET-PUNK", desc: "Tier 3: Speed", skills: [
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
        this.player = new Unit(true, 150, 150, 20, 0x00f2ff);
        this.offerJobSelection(0);
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
        if(this.floor >= 100) return;
        this.floor++;

        if(this.floor % 10 === 0 && this.floor <= 90) {
            const tier = this.floor / 10;
            this.offerJobSelection(tier);
            return;
        }

        // Update floor theme every 5 floors
        if(this.floor % 5 === 0 || this.floor === 1) {
            const themeName = engine.setFloorTheme(this.floor);
            this.showText(themeName, {x: 0, y: 3, z: 0}, '#ff0055');
        }

        // Decrement IAP luck boost floors
        if(this.iapBoosts.boostFloors > 0) {
            this.iapBoosts.boostFloors--;
            if(this.iapBoosts.boostFloors === 0) {
                // Reset luck bonuses when boost expires
                this.iapBoosts.rareBonus = 0;
                this.iapBoosts.epicBonus = 0;
                this.iapBoosts.legendaryBonus = 0;
            }
        }

        // AWAKENING at floor 50 - major power boost
        if(this.floor === 50 && !this.player.awakened) {
            this.triggerAwakening();
            return;
        }

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
        this.setScreen('class-screen');
        const container = document.getElementById('class-container');
        container.innerHTML = '';
        if(tier === 0) {
            document.querySelector('#class-screen h2').innerText = "SELECT BASE CLASS";
            ['RONIN', 'PRIEST', 'MECH', 'SHADOW', 'BRAWLER'].forEach(jobKey => this.createJobCard(container, CLASS_TREES[jobKey][0], () => this.setJob(jobKey, 0), jobKey));
        } else {
            document.querySelector('#class-screen h2').innerText = `TIER ${tier+1} ADVANCEMENT`;
            const currentKey = this.player.jobType;
            if(CLASS_TREES[currentKey][tier]) this.createJobCard(container, CLASS_TREES[currentKey][tier], () => this.setJob(currentKey, tier), currentKey);
            else this.nextFloor();
        }
    },

    createJobCard(container, jobData, onClick, jobKey = '') {
        const card = document.createElement('div');
        card.className = 'perk-card legendary'; card.style.height = 'auto';
        const s3 = jobData.skills[2];
        const buffInfo = s3 ? `<br><strong style="color:#ffe600">3:</strong> <span style="color:#ffe600">${s3.name}</span><br><span style="color:#aaa">${s3.desc}</span>` : '';

        // Mark broken classes
        const isBroken = jobKey === 'SHADOW' || jobKey === 'BRAWLER';
        const brokenTag = isBroken ? `<div style="background:linear-gradient(90deg,#ff0000,#ff6600);color:#fff;font-weight:bold;padding:4px 8px;border-radius:4px;font-size:12px;margin-bottom:8px;text-shadow:0 0 5px #000;">⚠️ BROKEN ⚠️</div>` : '';

        card.innerHTML = `${brokenTag}<div class="perk-title">${jobData.name}</div><div class="perk-desc">${jobData.desc}</div>
        <div style="font-size:14px;color:#fff;margin-top:10px;"><strong>1:</strong> ${jobData.skills[0].name}<br><span style="color:#aaa">${jobData.skills[0].mult}x / ${jobData.skills[0].hits||1} Hits</span><br><strong>2:</strong> ${jobData.skills[1].name}<br><span style="color:#aaa">${jobData.skills[1].mult}x / ${jobData.skills[1].hits||1} Hits</span>${buffInfo}</div>`;
        card.onclick = onClick; container.appendChild(card);
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
        if(!this.enemy || this.enemy.hp <= 0) this.spawnEnemy();
        this.updateUI();
    },

    updatePlayerModel(type, tier) {
        // Store old position
        const oldPos = this.player.mesh.position.clone();
        const oldRot = this.player.mesh.rotation.y;

        // Remove old mesh
        engine.scene.remove(this.player.mesh);

        // Create new model based on class
        const colors = { 'RONIN': 0xaa00ff, 'PRIEST': 0x00f2ff, 'MECH': 0xff6600, 'SHADOW': 0x220033, 'BRAWLER': 0xff4400 };
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

        // Reset combo for new battle
        this.battleCombo = 0;

        const isFinalBoss = (this.floor === 100);
        const isMidBoss = (this.floor === 25 || this.floor === 50 || this.floor === 75);
        const isFloorBoss = (this.floor % 5 === 0 && !isFinalBoss && !isMidBoss);

        // REBALANCED HP SCALING: exponential until 50, then linear growth
        let hp, atk;
        if(this.floor <= 50) {
            hp = Math.floor(100 * Math.pow(1.12, this.floor));
            atk = Math.floor(8 * Math.pow(1.08, this.floor));
        } else {
            // Floor 50 base values
            const hp50 = Math.floor(100 * Math.pow(1.12, 50)); // ~28,900
            const atk50 = Math.floor(8 * Math.pow(1.08, 50));  // ~375
            // Linear scaling after 50: +15% of base per floor
            hp = Math.floor(hp50 + (this.floor - 50) * (hp50 * 0.12));
            atk = Math.floor(atk50 + (this.floor - 50) * (atk50 * 0.08));
        }

        // REBIRTH SCALING: Exponential multiplier per rebirth
        if(this.rebirth > 0) {
            const rebirthMult = Math.pow(2.5, this.rebirth); // 2.5x HP per rebirth
            hp = Math.floor(hp * rebirthMult);
            atk = Math.floor(atk * Math.pow(1.5, this.rebirth)); // 1.5x ATK per rebirth
        }

        if(isFinalBoss) {
            hp = 50000000; atk *= 5;
            document.getElementById('enemy-name').innerText = `THE ARCHITECT (FINAL)`;
            document.getElementById('enemy-name').style.color = '#ffd700';
            this.enemy = new Unit(false, hp, hp, atk, 0xffd700, 'architect');
        }
        else if (isMidBoss) {
            hp *= 3; atk *= 1.5;
            const names = {25:"WARDEN", 50:"EXECUTIONER", 75:"OVERLORD"};
            const variants = {25: 0, 50: 1, 75: 2};
            document.getElementById('enemy-name').innerText = `${names[this.floor]} (MID BOSS)`;
            document.getElementById('enemy-name').style.color = '#ff5500';
            this.enemy = new Unit(false, hp, hp, atk, 0xff5500, 'midboss', variants[this.floor]);
        }
        else if(isFloorBoss) {
            hp *= 2.0; atk *= 1.2;
            document.getElementById('enemy-name').innerText = `SECTOR BOSS - ${this.floor}`;
            document.getElementById('enemy-name').style.color = '#ff0000';
            this.enemy = new Unit(false, hp, hp, atk, 0xff0000, 'boss');
        }
        else {
            // More enemy variety based on floor
            const enemyTypes = ['walker', 'drone', 'sentinel', 'tank', 'spider', 'floater'];
            const floorMod = this.floor % 60;
            let type;
            const names = {
                'walker': 'PATROL UNIT',
                'drone': 'RECON DRONE',
                'sentinel': 'SENTINEL',
                'tank': 'HEAVY TANK',
                'spider': 'SPIDER BOT',
                'floater': 'WATCHER'
            };

            if(floorMod < 10) type = Math.random() > 0.5 ? 'walker' : 'drone';
            else if(floorMod < 20) type = ['walker', 'drone', 'sentinel'][Math.floor(Math.random()*3)];
            else if(floorMod < 30) type = ['sentinel', 'tank', 'drone'][Math.floor(Math.random()*3)];
            else if(floorMod < 40) type = ['tank', 'spider', 'sentinel'][Math.floor(Math.random()*3)];
            else if(floorMod < 50) type = ['spider', 'floater', 'tank'][Math.floor(Math.random()*3)];
            else type = enemyTypes[Math.floor(Math.random()*enemyTypes.length)];

            document.getElementById('enemy-name').innerText = `${names[type]} - F${this.floor}`;
            document.getElementById('enemy-name').style.color = '#aaa';
            const color = new THREE.Color().setHSL(Math.random(), 0.8, 0.5);
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
    },

    // --- REBIRTH SYSTEM ---
    triggerRebirth() {
        this.rebirth++;
        this.floor = 1; // Reset to floor 1

        // Reset floor theme back to floor 1
        engine.setFloorTheme(1);

        // Keep player stats but boost them
        this.player.atk = Math.floor(this.player.atk * 1.5);
        this.player.maxHp = Math.floor(this.player.maxHp * 1.5);
        this.player.hp = this.player.maxHp;
        this.player.maxMana = Math.floor(this.player.maxMana * 1.5);
        this.player.mana = this.player.maxMana;
        this.player.critDamage += 0.5;
        this.player.comboMult += 0.01;
        this.player.breachDamage += 0.005;

        // Grant bonus gold
        const rebirthBonus = 10000 * this.rebirth;
        this.gold += rebirthBonus;

        // Show rebirth screen
        this.setScreen('rebirth-screen');
        document.getElementById('rebirth-level').innerText = this.rebirth;
        document.getElementById('rebirth-bonus').innerText = rebirthBonus.toLocaleString();
    },

    completeRebirth() {
        this.showText(`REBIRTH ${this.rebirth}!`, this.player.mesh.position, '#ff00ff');
        engine.spawnShockwave(this.player.mesh.position, 0xff00ff, 6);
        engine.addShake(0.6);

        // Continue to floor 1 with new rebirth level
        this.state = 'IDLE';
        this.setScreen('hud');
        document.getElementById('battle-controls').classList.add('active');
        this.spawnEnemy(); // This will now use floor=1 with rebirth multiplier
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
        const PERK_POOL = [
            // Original perks
            { name: "RECYCLER", icon: "♻️", baseVal: 5, desc: "+{val} Mana Regen", statDesc: "Mana Regen", func: (p, v) => p.manaRegen += v },
            { name: "CRITICAL OS", icon: "🎯", baseVal: 5, desc: "+{val}% Crit Chance", statDesc: "Crit Chance", func: (p, v) => p.critChance += (v/100) },
            { name: "HYDRAULICS", icon: "💪", baseVal: 10, desc: "+{val} Base Damage", statDesc: "Bonus DMG", func: (p, v) => p.atk += v },
            { name: "TITANIUM", icon: "🛡️", baseVal: 50, desc: "+{val} Max HP", statDesc: "Bonus HP", func: (p, v) => { p.maxHp += v; p.hp += v; } },
            { name: "BATTERY", icon: "🔋", baseVal: 30, desc: "+{val} Max Mana", statDesc: "Bonus Mana", func: (p, v) => { p.maxMana += v; p.mana += v; } },
            { name: "VAMPIRE", icon: "🧛", baseVal: 3, desc: "+{val}% Lifesteal", statDesc: "Lifesteal", func: (p, v) => p.lifesteal = (p.lifesteal||0) + (v/100) },
            // New perks
            { name: "CHROME PLATING", icon: "🔩", baseVal: 5, desc: "+{val} Armor", statDesc: "Armor", func: (p, v) => p.armor += v },
            { name: "REFLEX BOOST", icon: "⚡", baseVal: 3, desc: "+{val}% Dodge Chance", statDesc: "Dodge", func: (p, v) => p.dodge += (v/100) },
            { name: "NEURAL SPIKE", icon: "🧠", baseVal: 10, desc: "+{val}% Crit Damage", statDesc: "Crit DMG", func: (p, v) => p.critDamage += (v/100) },
            { name: "RAZOR SKIN", icon: "🔪", baseVal: 5, desc: "+{val}% Thorns Damage", statDesc: "Thorns", func: (p, v) => p.thorns += (v/100) },
            { name: "ECHO STRIKE", icon: "👊", baseVal: 5, desc: "+{val}% Double Strike", statDesc: "Double Strike", func: (p, v) => p.doubleStrike += (v/100) },
            { name: "OVERCLOCK", icon: "⏱️", baseVal: 5, desc: "-{val}% Mana Cost", statDesc: "Mana Reduction", func: (p, v) => p.manaCostReduction = Math.min(0.5, (p.manaCostReduction||0) + (v/100)) },
            { name: "TERMINATOR", icon: "💀", baseVal: 5, desc: "Execute below {val}% HP", statDesc: "Execute Threshold", func: (p, v) => p.executeThreshold = Math.max(p.executeThreshold, v/100) },
            { name: "SALVAGER", icon: "💰", baseVal: 10, desc: "+{val}% Bonus Credits", statDesc: "Bonus Credits", func: (p, v) => p.bonusCredits += (v/100) },
            { name: "OVERKILL CHIP", icon: "💥", baseVal: 10, desc: "+{val}% Overkill Bonus", statDesc: "Overkill", func: (p, v) => p.overkillBonus += (v/100) },
            { name: "ENERGY SHIELD", icon: "🔷", baseVal: 30, desc: "+{val} Shield", statDesc: "Shield", func: (p, v) => p.shield += v, noStack: true },
            { name: "NANO REPAIR", icon: "💚", baseVal: 20, desc: "Heal {val} HP", statDesc: "Healed", func: (p, v) => p.hp = Math.min(p.maxHp, p.hp + v), noStack: true },
            { name: "SURGE CAPACITOR", icon: "💙", baseVal: 15, desc: "+{val} Mana", statDesc: "Mana Restored", func: (p, v) => p.mana = Math.min(p.maxMana, p.mana + v), noStack: true }
        ];

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
    updateUI() {
        // Show rebirth level in floor display
        const floorDisplay = this.rebirth > 0 ? `${this.floor} ★${this.rebirth}` : this.floor;
        document.getElementById('floor-num').innerText = floorDisplay;
        document.getElementById('gold-num').innerText = this.gold.toLocaleString();
        document.getElementById('shop-gold').innerText = this.gold.toLocaleString();

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
            document.getElementById('p-hp-text').innerText = `${Math.floor(this.player.hp)} / ${this.player.maxHp}`;
            document.getElementById('p-mana-fill').style.width = Math.min(100, (this.player.mana/this.player.maxMana)*100) + '%';
            document.getElementById('p-mana-text').innerText = `${Math.floor(this.player.mana)} / ${this.player.maxMana}`;

            // Shield bar - only show if player has shield
            const shieldWrapper = document.getElementById('p-shield-wrapper');
            if(this.player.shield > 0) {
                shieldWrapper.style.display = 'block';
                document.getElementById('p-shield-text').innerText = Math.floor(this.player.shield);
                // Use a max shield reference (track max shield gained)
                this.player.maxShield = Math.max(this.player.maxShield || this.player.shield, this.player.shield);
                document.getElementById('p-shield-fill').style.width = Math.min(100, (this.player.shield / this.player.maxShield) * 100) + '%';
            } else {
                shieldWrapper.style.display = 'none';
            }
        }
        if(this.enemy) {
            document.getElementById('e-hp-fill').style.width = Math.min(100, (this.enemy.hp/this.enemy.maxHp)*100) + '%';
            document.getElementById('e-hp-text').innerText = `${Math.floor(this.enemy.hp)} / ${this.enemy.maxHp}`;
        }
    }
};

class Unit {
    constructor(isPlayer, hp, maxHp, atk, color, type='walker', variant=0) {
        this.isPlayer = isPlayer; this.hp = hp; this.maxHp = maxHp; this.atk = atk; this.type = type;
        this.maxMana = isPlayer ? 50 : 100; this.mana = this.maxMana; this.manaRegen = 5;
        this.critChance = 0.05; this.critDamage = 1.5; this.lifesteal = 0; this.jobType = null; this.jobTier = 0;
        this.armor = 0; this.dodge = 0; this.thorns = 0; this.doubleStrike = 0; this.manaCostReduction = 0;
        this.executeThreshold = 0; this.overkillBonus = 0; this.shield = 0; this.maxShield = 0; this.bonusCredits = 0;
        this.activeBuffs = []; this.invincible = false;
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
}