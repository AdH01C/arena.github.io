window.CLASS_DATA = {
    "RONIN": {
        name: "RONIN",
        desc: "High speed, high melee damage.",
        stats: { hp: 200, atk: 25, speed: 0.25, color: 0x00f2ff },
        skills: {
            z: { name: "Neon Slash", cd: 500, mpCost: 0, anim: "slash", type: "melee", data: { mult: 1.0, range: [4, 2], color: 0x00f2ff, vfx: "slash" }, desc: "Fast slash (0 MP)" },
            x: { name: "Cyclone", cd: 3000, mpCost: 20, anim: "spin", type: "aoe", data: { mult: 1.5, radius: 5, color: 0x00ffff, vfx: "spin" }, desc: "Spin attack (20 MP)" },
            c: { name: "Neon Ray", cd: 6000, mpCost: 40, anim: "cast", type: "charge_beam", data: { charge: 1000, mult: 5.0, range: [20, 2], color: 0x00ffff, width: 2 }, desc: "Charge 1s -> LASER" }
        }
    },
    "PRIEST": {
        name: "PRIEST",
        desc: "Healing and holy magic.",
        stats: { hp: 220, atk: 15, speed: 0.18, color: 0xffdd00 },
        skills: {
            z: { name: "Smite", cd: 600, mpCost: 5, anim: "cast", type: "shoot", data: { mult: 1.2, speed: 0.5, color: 0xffdd00, proj: "beam" }, desc: "Holy beam (5 MP)" },
            x: { name: "Holy Nova", cd: 12000, mpCost: 30, anim: "cast", type: "aoe", data: { mult: 11.0, radius: 8, color: 0xffff00, heal: 20 }, desc: "ULTRA BLAST (12s CD)" },
            c: { name: "Divine Heal", cd: 10000, mpCost: 60, anim: "cast", type: "buff", data: { type: "heal", val: 0.5 }, desc: "Heal 50% HP (60 MP)" }
        }
    },
    "MECH": {
        name: "MECH",
        desc: "Heavy ranged artillery.",
        stats: { hp: 300, atk: 20, speed: 0.15, color: 0xff4400 },
        skills: {
            z: { name: "Gatling", cd: 200, mpCost: 2, anim: "shoot", type: "shoot", data: { mult: 0.4, speed: 0.8, color: 0xffaa00, proj: "bullet", variance: 0.1 }, desc: "Rapid fire (2 MP)" },
            x: { name: "Missile", cd: 4000, mpCost: 25, anim: "shoot", type: "shoot", data: { mult: 3.0, speed: 0.3, color: 0xff0000, proj: "missile" }, desc: "Heavy Missile (25 MP)" },
            c: { name: "Shield Matrix", cd: 12000, mpCost: 50, anim: "cast", type: "buff", data: { type: "shield", val: 100 }, desc: "Gain Shield (50 MP)" }
        }
    },
    "HACKER": {
        name: "HACKER",
        desc: "Control and debuffs.",
        stats: { hp: 160, atk: 18, speed: 0.22, color: 0x00ff00 },
        skills: {
            z: { name: "Spike", cd: 250, mpCost: 0, anim: "punch", type: "melee", data: { mult: 0.8, range: [5, 2], color: 0x00ff00, vfx: "glitch" }, desc: "Data spike (0 MP)" },
            x: { name: "Virus", cd: 3000, mpCost: 20, anim: "cast", type: "aoe", data: { mult: 0.2, radius: 8, color: 0x00aa00, dot: 5 }, desc: "Infect area (20 MP)" },
            c: { name: "Overclock", cd: 12000, mpCost: 50, anim: "cast", type: "buff", data: { type: "rapidfire", dur: 3000 }, desc: "0 CD for 3s (50 MP)" }
        }
    },
    "SHADOW": {
        name: "SHADOW",
        desc: "Stealth and crits.",
        stats: { hp: 140, atk: 30, speed: 0.3, color: 0x8800ff },
        skills: {
            z: { name: "Backstab", cd: 400, mpCost: 0, anim: "slash", type: "melee", data: { mult: 1.5, range: [3, 2], color: 0x8800ff, vfx: "slash" }, desc: "Quick stab (0 MP)" },
            x: { name: "Shuriken", cd: 1500, mpCost: 10, anim: "shoot", type: "shoot", data: { mult: 0.8, speed: 0.9, color: 0xaa00ff, proj: "bullet" }, desc: "Throw (10 MP)" },
            c: { name: "Vanish", cd: 6000, mpCost: 40, anim: "cast", type: "buff", data: { type: "invuln", val: 1, dur: 2000 }, desc: "Invisible (40 MP)" }
        }
    },
    "BRAWLER": {
        name: "BRAWLER",
        desc: "Combo melee fighter.",
        stats: { hp: 250, atk: 22, speed: 0.2, color: 0xff5500 },
        skills: {
            z: { name: "Punch", cd: 300, mpCost: 0, anim: "punch", type: "melee", data: { mult: 0.6, range: [3, 2], color: 0xff5500, vfx: "punch", knockback: 0.8 }, desc: "Punch (Knockback)" },
            x: { name: "Slam", cd: 2500, mpCost: 20, anim: "slam", type: "aoe", data: { mult: 2.0, radius: 4, color: 0xff8800, vfx: "nuke" }, desc: "Slam (20 MP)" },
            c: { name: "Iron Will", cd: 10000, mpCost: 50, anim: "cast", type: "buff", data: { type: "iron_will", shieldVal: 100, atkVal: 1.3, dur: 5000 }, desc: "Shield + Dmg (50 MP)" }
        }
    },
    // ...
    // ...
    "CHAMPION": [
        {
            name: "CHAMPION",
            desc: "The undisputed heavyweight.",
            stats: { hp: 350, atk: 30, speed: 0.22, color: 0xff5500 },
            skills: [
                { name: "Iron Fist", cd: 200, mpCost: 0, anim: "punch", type: "melee", data: { mult: 0.8, range: [3, 2], color: 0xff5500, vfx: "punch", knockback: 1.2 }, desc: "Heavy Jab (0 MP)" },
                { name: "Earthquake", cd: 3000, mpCost: 30, anim: "slam", type: "aoe", data: { mult: 3.0, radius: 6, color: 0xff8800, vfx: "nuke" }, desc: "Shatter Earth (30 MP)" },
                { name: "Titan Mode", cd: 10000, mpCost: 60, anim: "cast", type: "buff", data: { type: "iron_will", shieldVal: 200, atkVal: 2.0, dur: 6000 }, desc: "Shield + Dmg (60 MP)" }
            ]
        }
    ],
    "GUNSLINGER": {
        name: "GUNSLINGER",
        desc: "Mid-range suppression.",
        stats: { hp: 180, atk: 24, speed: 0.22, color: 0xffaa00 },
        skills: {
            z: { name: "Revolver", cd: 800, mpCost: 5, anim: "shoot", type: "shoot", data: { mult: 1.5, speed: 1.0, color: 0xffdd00, proj: "bullet" }, desc: "Heavy shot (5 MP)" },
            x: { name: "Buckshot", cd: 3000, mpCost: 25, anim: "shoot", type: "shoot", data: { mult: 0.5, speed: 0.8, color: 0xffaa00, proj: "bullet", count: 3, spread: 0.3 }, desc: "Shotgun (25 MP)" },
            c: { name: "Deadeye", cd: 9000, mpCost: 40, anim: "cast", type: "buff", data: { type: "crit", val: 1.0, dur: 3000 }, desc: "Guaranteed Crits (40 MP)" }
        }
    },
    "SQUIRE": {
        name: "SQUIRE",
        desc: "Defensive tank.",
        stats: { hp: 400, atk: 22, speed: 0.18, color: 0xaaaaaa },
        skills: {
            z: { name: "Wide Slash", cd: 800, mpCost: 0, anim: "slash", type: "melee", data: { mult: 1.2, range: [5, 3], color: 0xffffff, vfx: "slash_h" }, desc: "Wide arc (0 MP)" },
            x: { name: "Shield Bash", cd: 3500, mpCost: 20, anim: "punch", type: "melee", data: { mult: 2.0, range: [3, 2], color: 0x00aaff, knockback: 1.5 }, desc: "Bash (20 MP)" },
            c: { name: "Guard", cd: 8000, mpCost: 40, anim: "cast", type: "buff", data: { type: "shield", val: 150, dur: 5000 }, desc: "Shield Up (40 MP)" }
        }
    },
    "REAPER": {
        name: "REAPER",
        desc: "Lifesteal and harvesting.",
        stats: { hp: 170, atk: 28, speed: 0.24, color: 0x111111 },
        skills: {
            z: { name: "Grim Scythe", cd: 700, mpCost: 5, anim: "slash", type: "melee", data: { mult: 1.2, range: [6, 4], color: 0x5500aa, vfx: "slash" }, desc: "Grim Slash (5 MP)" },
            x: { name: "Spirit Shot", cd: 3000, mpCost: 20, anim: "shoot", type: "shoot", data: { mult: 1.5, speed: 0.8, color: 0x8800ff, proj: "bullet" }, desc: "Soul Bolt (20 MP)" },
            c: { name: "Wraith Step", cd: 6000, mpCost: 40, anim: "dash", type: "dash", data: { speed: 3.0, invuln: 500, color: 0xaa00ff, mult: 2.0 }, desc: "Dash + Dmg (40 MP)" }
        }
    },
    "SUMMONER": {
        name: "SUMMONER",
        desc: "Minion commander.",
        stats: { hp: 150, atk: 18, speed: 0.22, color: 0x00aaff },
        skills: {
            z: { name: "Whip", cd: 500, mpCost: 0, anim: "slash", type: "melee", data: { mult: 0.8, range: [4, 1], color: 0x00ccff, vfx: "whip" }, desc: "Whip (0 MP)" },
            x: { name: "Call Wolf", cd: 6000, mpCost: 40, anim: "cast", type: "summon", data: { type: "WOLF", hp: 80, atk: 15, color: 0x00ffaa, duration: 60 }, desc: "Summon Wolf (40 MP)" },
            c: { name: "Call Golem", cd: 15000, mpCost: 80, anim: "cast", type: "summon", data: { type: "GOLEM", hp: 300, atk: 20, color: 0x885500, duration: 60 }, desc: "Summon Golem (80 MP)" }
        }
    }
};
window.CLASS_TREES = {
    "RONIN": [
        {
            name: "BLADE MASTER",
            desc: "Faster, deadlier, unstoppable.",
            stats: { hp: 250, atk: 30, speed: 0.27, color: 0x00f2ff },
            skills: [
                { name: "True Cut", cd: 400, mpCost: 0, anim: "slash", type: "melee", data: { mult: 1.5, range: [5, 2], color: 0x00ffff, vfx: "slash" }, desc: "Instant Cut (0 MP)" },
                { name: "Blade Storm", cd: 2500, mpCost: 25, anim: "spin", type: "aoe", data: { mult: 2.0, radius: 6, color: 0x00ffff, vfx: "spin" }, desc: "Massive AOE (25 MP)" },
                { name: "Flash Step", cd: 3000, mpCost: 30, anim: "dash", type: "dash", data: { speed: 3.0, dur: 200, invuln: 800 }, desc: "Teleport Slash (30 MP)" }
            ],
            ultimate: { name: "Dimension Cut", cd: 30000, mpCost: 100, anim: "slash", type: "aoe", data: { mult: 10.0, radius: 20, color: 0xffffff, vfx: "slash_h" }, desc: "Screen Slash (100 MP)" }
        }
    ],
    "PRIEST": [
        {
            name: "HIGH PRIEST",
            desc: "Holy vessel of divine power.",
            stats: { hp: 260, atk: 20, speed: 0.18, color: 0xffdd00 },
            skills: [
                { name: "Divine Ray", cd: 500, mpCost: 5, anim: "cast", type: "shoot", data: { mult: 1.5, speed: 0.6, color: 0xffdd00, proj: "beam" }, desc: "Holy Laser (5 MP)" },
                { name: "Sanctuary", cd: 10000, mpCost: 40, anim: "cast", type: "aoe", data: { mult: 12.0, radius: 10, color: 0xffff00, heal: 40 }, desc: "GOD BLAST (40 MP)" },
                { name: "Resurrection", cd: 15000, mpCost: 80, anim: "cast", type: "buff", data: { type: "heal", val: 1.0 }, desc: "Full Heal (80 MP)" } // Full HP
            ],
            ultimate: { name: "Divinity", cd: 45000, mpCost: 100, anim: "cast", type: "aoe", data: { mult: 5.0, radius: 15, color: 0xffff00, heal: 100 }, desc: "Smite All + Heal (100 MP)" }
        }
    ],
    "MECH": [
        {
            name: "WAR MACHINE",
            desc: "Heavily armored artillery.",
            stats: { hp: 400, atk: 25, speed: 0.14, color: 0xff4400 },
            skills: [
                { name: "Vulcan", cd: 100, mpCost: 2, anim: "shoot", type: "shoot", data: { mult: 0.5, speed: 0.9, color: 0xffaa00, proj: "bullet", variance: 0.05 }, desc: "Minigun (2 MP)" },
                { name: "Nuke", cd: 5000, mpCost: 50, anim: "shoot", type: "shoot", data: { mult: 5.0, speed: 0.2, color: 0xff0000, proj: "missile" }, desc: "Tactical Nuke (50 MP)" },
                { name: "Force Field", cd: 12000, mpCost: 50, anim: "cast", type: "buff", data: { type: "shield", val: 200 }, desc: "Heavy Shield (50 MP)" }
            ],
            ultimate: { name: "Orbital Strike", cd: 40000, mpCost: 100, anim: "shoot", type: "aoe", data: { mult: 8.0, radius: 12, color: 0xff4400, vfx: "nuke" }, desc: "Orbital Cannon (100 MP)" }
        }
    ],
    "HACKER": [
        {
            name: "CYBER LORD",
            desc: "Controls the digital fabric.",
            stats: { hp: 200, atk: 25, speed: 0.24, color: 0x00ff00 },
            skills: [
                { name: "Data Siphon", cd: 250, mpCost: 0, anim: "punch", type: "melee", data: { mult: 1.0, range: [5, 2], color: 0x00ff00, vfx: "glitch" }, desc: "Drain Data (0 MP)" },
                { name: "Logic Bomb", cd: 3000, mpCost: 30, anim: "cast", type: "aoe", data: { mult: 0.5, radius: 10, color: 0x00aa00, dot: 10 }, desc: "Mass Infect (30 MP)" },
                { name: "System Override", cd: 10000, mpCost: 60, anim: "cast", type: "buff", data: { type: "rapidfire", dur: 5000 }, desc: "Overclock++ (60 MP)" }
            ],
            ultimate: { name: "Red Screen", cd: 60000, mpCost: 100, anim: "cast", type: "aoe", data: { mult: 0.0, radius: 20, color: 0xff0000, slow: 0.9 }, desc: "Freeze World (100 MP)" }
        }
    ],
    "SHADOW": [
        {
            name: "ASSASSIN",
            desc: "One hit, one kill.",
            stats: { hp: 180, atk: 40, speed: 0.35, color: 0x440088 },
            skills: [
                { name: "Eviscerate", cd: 300, mpCost: 0, anim: "slash", type: "melee", data: { mult: 2.0, range: [3, 2], color: 0x8800ff, vfx: "slash" }, desc: "Fatal Strike (0 MP)" },
                { name: "Shadow Stars", cd: 1000, mpCost: 15, anim: "shoot", type: "shoot", data: { mult: 1.0, speed: 1.0, color: 0xaa00ff, proj: "bullet", count: 3, spread: 0.2 }, desc: "Triple Throw (15 MP)" },
                { name: "Ghost Form", cd: 5000, mpCost: 40, anim: "cast", type: "buff", data: { type: "invuln", val: 1, dur: 3000 }, desc: "Untouchable (40 MP)" }
            ],
            ultimate: { name: "Void Strike", cd: 50000, mpCost: 100, anim: "slash", type: "melee", data: { mult: 20.0, range: [10, 5], color: 0x000000, vfx: "slash_h" }, desc: "The End (100 MP)" }
        }
    ],
    "BRAWLER": [
        {
            name: "CHAMPION",
            desc: "The undisputed heavyweight.",
            stats: { hp: 350, atk: 30, speed: 0.22, color: 0xff5500 },
            skills: [
                { name: "Iron Fist", cd: 200, mpCost: 0, anim: "punch", type: "melee", data: { mult: 0.8, range: [3, 2], color: 0xff5500, vfx: "punch" }, desc: "Rapid Jab (0 MP)" },
                { name: "Earthquake", cd: 3000, mpCost: 30, anim: "slam", type: "aoe", data: { mult: 3.0, radius: 6, color: 0xff8800, vfx: "nuke" }, desc: "Shatter Earth (30 MP)" },
                { name: "Titan Mode", cd: 10000, mpCost: 60, anim: "cast", type: "buff", data: { type: "atk", val: 2.0, dur: 6000 }, desc: "Double Dmg (60 MP)" }
            ],
            ultimate: { name: "Meteor Strike", cd: 35000, mpCost: 100, anim: "slam", type: "aoe", data: { mult: 10.0, radius: 10, color: 0xff4400, vfx: "nuke" }, desc: "METEOR (100 MP)" }
        }
    ],
    "GUNSLINGER": [
        {
            name: "SHERIFF",
            desc: "The law of the land.",
            stats: { hp: 220, atk: 30, speed: 0.24, color: 0xffaa00 },
            skills: [
                { name: "Magnum", cd: 600, mpCost: 5, anim: "shoot", type: "shoot", data: { mult: 2.0, speed: 1.2, color: 0xffdd00, proj: "bullet" }, desc: "Hand Cannon (5 MP)" },
                { name: "Fan Fire", cd: 2000, mpCost: 30, anim: "shoot", type: "shoot", data: { mult: 0.6, speed: 0.9, color: 0xffaa00, proj: "bullet", count: 6, spread: 0.5 }, desc: "Unload Clip (30 MP)" },
                { name: "Deadeye", cd: 8000, mpCost: 40, anim: "cast", type: "buff", data: { type: "crit", val: 1.0, dur: 5000 }, desc: "Sure Shot (40 MP)" }
            ],
            ultimate: { name: "High Noon", cd: 45000, mpCost: 100, anim: "shoot", type: "aoe", data: { mult: 5.0, radius: 20, color: 0xffff00 }, desc: "Target All (100 MP)" }
        }
    ],
    "SQUIRE": [
        {
            name: "PALADIN",
            desc: "Bastion of light.",
            stats: { hp: 600, atk: 30, speed: 0.18, color: 0xeeeeee },
            skills: [
                { name: "Justice", cd: 600, mpCost: 0, anim: "slash", type: "melee", data: { mult: 1.5, range: [6, 3], color: 0xffffff, vfx: "slash_h" }, desc: "Holy Slash (0 MP)" },
                { name: "Shield Charge", cd: 2500, mpCost: 20, anim: "punch", type: "melee", data: { mult: 3.0, range: [4, 2], color: 0x00aaff, knockback: 3.0 }, desc: "Heavy Bash (20 MP)" },
                { name: "Fortress", cd: 12000, mpCost: 50, anim: "cast", type: "buff", data: { type: "invuln", val: 1, dur: 3000 }, desc: "Invincible (50 MP)" }
            ],
            ultimate: { name: "Holy Ground", cd: 60000, mpCost: 100, anim: "cast", type: "aoe", data: { mult: 5.0, radius: 10, color: 0xffffff, heal: 200 }, desc: "Sanctuary (100 MP)" }
        }
    ],
    "REAPER": [
        {
            name: "SOUL HARVESTER",
            desc: "Collector of souls.",
            stats: { hp: 250, atk: 35, speed: 0.26, color: 0x220022 },
            skills: [
                { name: "Harvester's Cleave", cd: 600, mpCost: 5, anim: "slash", type: "melee", data: { mult: 1.4, range: [7, 4], color: 0x550055, vfx: "slash" }, desc: "Wide Slash (5 MP)" },
                { name: "Death's Due", cd: 4000, mpCost: 35, anim: "cast", type: "aoe", data: { mult: 1.8, radius: 8, color: 0x220022, lifesteal: 0.8 }, desc: "Mass Drain (35 MP)" },
                { name: "Ghost Form", cd: 12000, mpCost: 60, anim: "cast", type: "buff", data: { type: "invuln", val: 1, dur: 3000 }, desc: "Invincible (60 MP)" }
            ],
            ultimate: { name: "Soul Storm", cd: 40000, mpCost: 100, anim: "spin", type: "aoe", data: { mult: 5.0, radius: 15, color: 0xaa00aa, lifesteal: 1.0 }, desc: "Soul Harvest (100 MP)" }
        }
    ],
    "SUMMONER": [
        {
            name: "BEASTMASTER",
            desc: "Lord of the wild.",
            stats: { hp: 250, atk: 25, speed: 0.24, color: 0x00aa88 },
            skills: [
                { name: "Tame", cd: 400, mpCost: 0, anim: "slash", type: "melee", data: { mult: 1.0, range: [5, 2], color: 0x00ffaa, vfx: "whip" }, desc: "Command (0 MP)" },
                { name: "Alpha Wolf", cd: 5000, mpCost: 40, anim: "cast", type: "summon", data: { type: "WOLF", hp: 150, atk: 30, color: 0x00ffaa, duration: 90 }, desc: "Alpha Wolf (40 MP)" },
                { name: "Iron Golem", cd: 12000, mpCost: 80, anim: "cast", type: "summon", data: { type: "GOLEM", hp: 600, atk: 40, color: 0x555555, duration: 90 }, desc: "Iron Golem (80 MP)" }
            ],
            ultimate: { name: "Stampede", cd: 45000, mpCost: 100, anim: "cast", type: "summon", data: { type: "WOLF", hp: 100, atk: 25, color: 0xff0000, duration: 30, count: 5 }, desc: "Summon 5/Pack (100 MP)" }
        }
    ]
};
