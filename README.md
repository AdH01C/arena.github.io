# Arena Game - Model & Enemy System Documentation

This guide documents how to add new enemies, create 3D models using the internal procedural generation system, and register them into the game loop.

## 📂 File Structure

*   **`js/models/base.js`**: Contains core helpers (`box`, `rand`) and base models (`createHumanoid`, `createMinion`). Start here to understand the geometry primitives.
*   **`js/models/enemies.js`**: Contains definitions for specific enemies and bosses (`createRat`, `createMech`, `createNeonHydra`). **Add new model functions here.**
*   **`js/game/unit.js`**: The `Unit` class. Responsible for linking a string `type` (e.g., "mutant") to a specific model function. **Register new types here.**
*   **`js/game/systems/combat.js`**: Handles logic for *when* and *what* to spawn. **Update spawn logic here.**

---

## 🛠 How to Add a New Enemy

### 1. Create the Model (`js/models/enemies.js`)
Add a new function to `window.Models` (or directly in `enemies.js`).
Use `this.box()` to create simple geometry. 

**Standard Signature:** `createMyEnemy(color, scale = 1) { ... return { mesh: g, weapon: w }; }`

```javascript
createMyEnemy(c, s = 1) {
    const g = new THREE.Group();
    const mat = new THREE.MeshStandardMaterial({ color: c });

    // 1. Create Body Parts
    // this.box(width, height, depth, material, x, y, z, parent);
    const body = this.box(0.5, 0.5, 0.5, mat, 0, 0.5, 0, g);
    
    // 2. Add Animations (See Animation Section)
    g.userData.idle = true; 
    g.userData.float = true; 

    // 3. Return Group
    g.scale.set(s, s, s);
    return { mesh: g, weapon: body }; // 'weapon' is where projectiles fire from
}
```

### 2. Register the Type (`js/game/unit.js`)
Find the `Unit` constructor. Add an `else if` block for your new type name.

```javascript
// Inside Unit constructor...
if (type === 'minion') ...
else if (type === 'myNewEnemy') this.model = Models.createMyEnemy(color, 1.5);
else ...
```

### 3. Spawn the Enemy (`js/game/systems/combat.js`)
Update `spawnEnemy()` to assume this type based on floor or condition.

```javascript
// Inside spawnEnemy()...
if (this.floor === 99) {
    type = 'myNewEnemy';
    // ...
    this.enemy = new Unit(false, hp, hp, atk, color, type);
}
```

---

## 🎨 Procedural Generation Tips
To make enemies varied (non-identical), use `Math.random()` inside the model function.

*   **Logic:** `if (Math.random() > 0.5) { // add horns }`
*   **Scale:** `const w = 0.5 + Math.random() * 0.2;`
*   **Materials:** Create array of colors `[0xff0000, 0x00ff00]` and pick random.

**Example (from `createMutant`):**
```javascript
const type = Math.random();
if (type < 0.33) {
   // Build a blob
} else {
   // Build a spider
}
```

---

## 🎭 Animation System (`userData`)
The game engine (`js/game/core.js` or `js/engine/core.js`) looks for specific `userData` properties on Meshes/Groups to animate them automatically every frame.

| Property | Description | Fields Required |
| :--- | :--- | :--- |
| `idle` | Boolean. Must be true to enable others. | `true` |
| `float` | bobs object up and down (Sine wave). | `baseY`, `idleSpeed`, `idleAmp` |
| `pulse` | Scales object size (Breathing). | `speed`, `amp`, `base` (usually 1) |
| `swing` | Rotates object back and forth. | `axis` ('x','y','z'), `speed`, `amp`, `base` (rads), `offset` |
| `rotatorY` | Constant rotation. | Value = speed (e.g. `0.1`) |
| `emitParticles` | Spawns particles (smoke/fire). | `color`, `size`, `speed`, `spread` |

**Example:**
```javascript
// Make an arm swing back and forth
arm.userData.idle = true; 
arm.userData.swing = { axis: 'x', speed: 2, amp: 0.5, base: 0 };
```

---

## 🗺 Sector Themes
*   **Sector 1 (F1-19)**: Organic / Mutant (Flesh, asymmetric)
*   **Sector 2 (F21-39)**: Industrial / Mech (Metal, modular)
*   **Sector 3 (F41-59)**: Void / Horror (Floating, abstract, dark)
*   **Sector 4 (F61-79)**: Glitch / Cyber (Wireframe, cubes)

Use these themes when adding new content to maintain consistency.

---

## 📜 Development Log

### [Current Session] Procedural Enemy Overhaul
*   **Goal**: Replace static humanoid enemies with sector-specific procedural models.
*   **Changes**:
    *   **`js/models/enemies.js`**: Added `createMutant`, `createMech`, `createVoidEntity`, `createGlitchEntity`. Removed generic `createSentinel` usage in spawn logic.
    *   **`js/game/unit.js`**: Registered new types (`mutant`, `mech`, `voidEntity`, `glitchEntity`) to link to their respective models.
    *   **`js/game/systems/combat.js`**: Updated `spawnEnemy` to randomly select the correct procedural type based on floor number (1-19: Mutant, 21-39: Mech, etc.).
    *   **Fixes**: Resolved issue where enemies defaulted to Humanoid due to missing registration. Resolved syntax error in `enemies.js`.

### [Previous] Mini-Boss Implementation
*   **Goal**: Add distinct mini-bosses every 5 floors.
*   **Changes**:
    *   Added 12 unique mini-boss models (Rat, Bio-Soldier, Gatling Bot, etc.).
    *   Updated spawn logic to trigger them on F5, F10, F15... excluding Sector Boss floors.

### [Previous] Sector Boss Implementation
*   **Goal**: Add major bosses at F20, F40, F60, F80.
*   **Changes**:
    *   Implemented Neon Hydra, Iron Colossus, Void Mother, Corrupted Core.
    *   Added simple mechanics (Armor, Regen) for testing.

### [Current Session] Architect Overhaul "Digital God"
*   **Goal**: Redesign Final Boss (F100) to be a high-fidelity "Digital God".
*   **Changes**:
    *   **`js/models/bosses.js`**: Replaced `createArchitect` with procedural implementation.
        *   **Core**: Pulsing Octahedron (White/Emissive).
        *   **Rings**: Nested rotating Torus rings (Gold/Wireframe).
        *   **Wings**: Procedural cloud of 20+ floating data shards with glitch animations.
        *   **VFX**: Added Cyan particle emitter (`userData.emitParticles`).

### [Current Session] Igris Overhaul "Void Commander"
*   **Goal**: Update Hidden Boss (Igris) to match new high-fidelity standard.
*   **Changes**:
    *   **`js/models/bosses.js`**: Replaced `createIgris` with "Void Commander" implementation.
        *   **Armor**: Spiked purple/black plates with floating gold pauldrons.
        *   **Weapon**: Massive Void Greatsword with glowing edge and particle effects.
        *   **Accessory**: 5-strip tattered void cape with independent physics.
        *   **VFX**: Heavy Purple/Black particle aura.
