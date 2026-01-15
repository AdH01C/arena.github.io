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
