Object.assign(game, {
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
});
