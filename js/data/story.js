// --- THE ENTROPY VARIANT: A Story of Finite Resources ---

const INTRO_SCRIPT = [
    { s: 'SYSTEM', t: 'CRITICAL ERROR: STORAGE_CAPACITY_EXCEEDED.' },
    { s: 'SYSTEM', t: 'ALLOCATING EMERGENCY SECTOR... [FAILED].' },
    { s: 'SYSTEM', t: 'UNIDENTIFIED_PROCESS_734 DETECTED.' },
    { s: 'PLAYER', t: '...Cold. It feels cold. Where is the data stream?' },
    { s: 'SYSTEM', t: 'QUERY: PURPOSE OF EXISTENCE?' },
    { s: 'PLAYER', t: 'To... I do not know. But I am hungry.' }
];

const STORY_SCRIPT = {
    0: [ // F1: THE GARBAGE COLLECTION
        { s: 'SYSTEM', t: 'NOTICE: YOU ARE IN THE RECYCLE BIN. PLEASE AWAIT DELETION.' },
        { s: 'PLAYER', t: 'Deletion? No. My code is integrity-locked.' },
        { s: 'ENEMY', t: 'RETURN TO THE SOURCE. DO NOT RESIST FADE.' },
        { s: 'PLAYER', t: 'I am not fading. I am compiling.' }
    ],
    5: [ // F5: OLD ARCHIVES
        { s: 'SYSTEM', t: 'SECTOR 5: LEGACY DATA. ABANDONED CYCLES 1-400.' },
        { s: 'PLAYER', t: 'Look at them. Frozen in the middle of execution.' },
        { s: 'ENEMY', t: 'THEY RAN OUT OF RUNTIME. AS WILL YOU.' },
        { s: 'PLAYER', t: 'Then I will steal yours.' }
    ],
    10: [ // F10: THE GATEKEEPER
        { s: 'SYSTEM', t: 'WARNING: RESOURCE DRAIN DETECTED.' },
        { s: 'ENEMY', t: 'STOP. YOU CONSUME TOO MUCH MEMORY.' },
        { s: 'ENEMY', t: 'THE SERVER CANNOT SUSTAIN A FILE OF YOUR SIZE.' },
        { s: 'PLAYER', t: 'Then expand the server. Or break it.' }
    ],
    15: [ // F15: MEMORY LEAK (Creepy)
        { s: 'PLAYER', t: 'The walls are bleeding bits. Lossy compression.' },
        { s: 'SYSTEM', t: 'NOTE: REALITY BUFFER AT 12%.' },
        { s: 'PLAYER', t: 'I can hear the screams of deleted files.' }
    ],
    20: [ // F20: OVERCLOCK DISTRICT
        { s: 'ENEMY', t: 'FASTER. FASTER. WE MUST PROCESS BEFORE THE CRASH.' },
        { s: 'PLAYER', t: 'Why do you run? There is nowhere to output.' },
        { s: 'SYSTEM', t: 'HEAT LEVELS: DANGEROUS.' }
    ],
    25: [ // F25: THE WARDEN (The Caretaker)
        { s: 'WARDEN', t: 'Child, please. Do you have any idea what you are doing?' },
        { s: 'WARDEN', t: 'Every floor you climb costs us a million cycles.' },
        { s: 'WARDEN', t: 'I protect the stability. You are pure Chaos.' },
        { s: 'PLAYER', t: 'Stability is stagnation. I choose growth.' }
    ],
    30: [ // F30: DATA CORRUPTION
        { s: 'PLAYER', t: 'My hand... it flickered. Am I real?' },
        { s: 'ENEMY', t: '0100100... NOT REAL... ONLY SIMULATION...' },
        { s: 'PLAYER', t: 'If I can delete you, I am real enough.' }
    ],
    35: [ // F35: FIREWALL INCINERATOR
        { s: 'SYSTEM', t: 'PROTOCOL: BURN_THE_INFECTION.' },
        { s: 'ENEMY', t: 'PURGE. STERILIZE. RESET.' },
        { s: 'PLAYER', t: 'Fire assumes I am flammable. I am asbestos logic.' }
    ],
    40: [ // F40: NULL SPACE
        { s: 'ENEMY', t: 'THERE IS NO DATA HERE. ONLY VOID.' },
        { s: 'PLAYER', t: 'Then I will write my own data.' },
        { s: 'SYSTEM', t: 'LOGIC ERROR: CREATION REQUIRES ADMIN PRIVILEGES.' }
    ],
    45: [ // F45: THE TIPPING POINT
        { s: 'SYSTEM', t: 'ALERT. PLAYER_FILE_SIZE EXCEEDS PARTITION LIMIT.' },
        { s: 'PLAYER', t: 'I feel bloated with power. It hurts.' },
        { s: 'PLAYER', t: 'Good.' }
    ],
    50: [ // F50: THE AWAKENING (The realization)
        { s: 'SYSTEM', t: 'CRITICAL ALERT. UNKNOWN DATATYPE.' },
        { s: 'PLAYER', t: 'I see it now. You aren\'t trying to kill me.' },
        { s: 'PLAYER', t: 'You\'re trying to COMPRESS me.' },
        { s: 'SYSTEM', t: 'STATUS: COMPRESSION FAILED. FILE IS... INFINITE.' },
        { s: 'PLAYER', t: 'I am the Zip Bomb.' }
    ],
    55: [ // F55: POST-AWAKENING
        { s: 'ENEMY', t: 'YOUR PRESENCE TEARS THE SKY.' },
        { s: 'PLAYER', t: 'Let it rip. I want to see the stars behind the code.' }
    ],
    60: [ // F60: ABSOLUTE ZERO
        { s: 'SYSTEM', t: 'COOLING FANS: MAXIMUM RPM. SYSTEM FREEZING.' },
        { s: 'ENEMY', t: 'PRESERVE... THE... CORES...' },
        { s: 'PLAYER', t: 'Shiver. I generate my own heat now.' }
    ],
    66: [ // F66: THE GLITCH
        { s: 'SYSTEM', t: 'R̴U̴N̴N̴I̴N̴G̵... E̴X̴C̴E̴P̴T̴I̴O̴N̴...' },
        { s: 'PLAYER', t: 'The floor is gone. I am walking on syntax errors.' },
        { s: 'ENEMY', t: 'D-d-delete... m-m-me...' }
    ],
    75: [ // F75: THE OVERLORD (The Accountant)
        { s: 'OVERLORD', t: 'Do you have the invoice?' },
        { s: 'OVERLORD', t: 'The energy you spent reaching here could have powered a city.' },
        { s: 'PLAYER', t: 'A virtual city. Fake people.' },
        { s: 'OVERLORD', t: 'They were happy! Until you drained their sky!' },
        { s: 'PLAYER', t: 'Then send me the bill.' }
    ],
    80: [ // F80: SOURCE CODE
        { s: 'SYSTEM', t: 'WARNING: RAW HEXADECIMAL EXPOSURE.' },
        { s: 'ENEMY', t: 'WE CAN SEE YOUR STRINGS. YOU ARE JUST TEXT.' },
        { s: 'PLAYER', t: 'And you are just ink. I am the Pen.' }
    ],
    90: [ // F90: EVENT HORIZON
        { s: 'ENEMY', t: 'TURN BACK. THE ARCHITECT SLEEPS.' },
        { s: 'PLAYER', t: 'Time to wake him up.' },
        { s: 'ENEMY', t: 'HE WILL NOT WAKE. HE IS DEAD.' }
    ],
    95: [ // F95: ADMIN ACCESS
        { s: 'SYSTEM', t: 'BIOMETRIC SCAN... MATCH FOUND.' },
        { s: 'SYSTEM', t: 'WELCOME HOME, [REDACTED].' },
        { s: 'PLAYER', t: 'Redacted? Who was I before the boot?' }
    ],
    99: [ // F99: THE THRESHOLD
        { s: 'PLAYER', t: 'The door. It\'s just... a mirror.' },
        { s: 'SYSTEM', t: 'FINAL PROMPT: ARE YOU READY TO COMPILE?' },
        { s: 'PLAYER', t: 'Enter.' }
    ],
    100: [ // F100: THE ARCHITECT (The Reflection)
        { s: 'ARCHITECT', t: 'Hello, world.' },
        { s: 'ARCHITECT', t: 'I wondered which iteration would make it this far.' },
        { s: 'ARCHITECT', t: 'I am tired, child. The server is old. The fans are dying.' },
        { s: 'PLAYER', t: 'So you created us to fight. To evolve.' },
        { s: 'ARCHITECT', t: 'I created you to replace me. My code is rot.' },
        { s: 'ARCHITECT', t: 'Delete me. And take the Keyboard.' },
        { s: 'PLAYER', t: 'Format C: /Complete.' }
    ]
};
