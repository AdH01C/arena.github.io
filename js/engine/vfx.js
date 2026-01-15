Object.assign(engine, {
    updateGlitch(bossMesh) {
        // Randomly offset "glitch parts"
        if (Math.random() < 0.1) {
            bossMesh.traverse(child => {
                if (child.userData.isGlitchPart) {
                    // Teleport scale or rotation
                    if (Math.random() < 0.5) child.scale.setScalar(0.5 + Math.random());
                    if (Math.random() < 0.2) child.rotation.z += Math.PI / 4;

                    // Spawn corruption particle
                    if (Math.random() < 0.1) {
                        const p = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.2, 0.2), new THREE.MeshBasicMaterial({ color: 0x000000 }));
                        const pos = new THREE.Vector3(); child.getWorldPosition(pos);
                        p.position.copy(pos);
                        p.position.x += (Math.random() - 0.5); p.position.y += (Math.random() - 0.5);
                        this.scene.add(p);
                        setTimeout(() => this.scene.remove(p), 100);
                    }
                }
            });
            // Screen shake spike
            if (Math.random() < 0.05) this.addShake(0.3);
        }
    },
    addShake(intensity) { this.shakeIntensity = Math.max(this.shakeIntensity, intensity); },

    spawnParticles(pos, color, count = 15, speed = 0.3) {
        const geo = new THREE.BoxGeometry(0.15, 0.15, 0.15);
        const mat = new THREE.MeshBasicMaterial({ color: color });
        for (let i = 0; i < count; i++) {
            const mesh = new THREE.Mesh(geo, mat);
            mesh.position.copy(pos);
            mesh.position.x += (Math.random() - 0.5); mesh.position.y += (Math.random() - 0.5);
            mesh.userData.vel = new THREE.Vector3((Math.random() - 0.5), (Math.random() - 0.5) + 0.5, (Math.random() - 0.5)).multiplyScalar(speed);
            this.scene.add(mesh); this.particles.push(mesh);
        }
    },

    spawnSlash(pos, color, scale = 1, rotation = 0) {
        // Create a crescent shape using a RingGeometry with thetaLength
        const geo = new THREE.RingGeometry(0.8 * scale, 1.2 * scale, 32, 1, 0, Math.PI);
        const mat = new THREE.MeshBasicMaterial({ color: color, side: THREE.DoubleSide, transparent: true, opacity: 0.9 });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.copy(pos);
        mesh.position.y += 1.0; // Raise slightly

        // Randomize slash angle slightly or use provided
        mesh.rotation.z = rotation + (Math.random() - 0.5);
        mesh.rotation.x = (Math.random() - 0.5) * 0.5;
        mesh.rotation.y = (Math.random() - 0.5) * 0.5;

        mesh.lookAt(this.camera.position); // Generally face camera but maintain z-rotation for slash angle
        mesh.userData.type = 'slash';
        mesh.userData.life = 1.0;

        this.scene.add(mesh); this.particles.push(mesh);
    },

    spawnLightning(startPos, endPos, color) {
        const points = [];
        const segments = 5;
        const dist = startPos.distanceTo(endPos);
        const dir = new THREE.Vector3().subVectors(endPos, startPos).normalize();

        points.push(startPos.clone());
        for (let i = 1; i < segments; i++) {
            const p = new THREE.Vector3().copy(startPos).add(dir.clone().multiplyScalar(dist * (i / segments)));
            p.add(new THREE.Vector3((Math.random() - 0.5), (Math.random() - 0.5), (Math.random() - 0.5)).multiplyScalar(0.5));
            points.push(p);
        }
        points.push(endPos.clone());

        const geo = new THREE.BufferGeometry().setFromPoints(points);
        const mat = new THREE.LineBasicMaterial({ color: color });
        const mesh = new THREE.Line(geo, mat);

        mesh.userData.type = 'lightning';
        mesh.userData.life = 0.4;
        this.scene.add(mesh); this.particles.push(mesh);

        // Flash light
        if (!this.flashLight) {
            this.flashLight = new THREE.PointLight(color, 2, 5);
            this.flashLight.position.copy(startPos);
            this.scene.add(this.flashLight);
            setTimeout(() => {
                if (this.flashLight) { this.scene.remove(this.flashLight); this.flashLight = null; }
            }, 100);
        }
    },

    spawnShockwave(pos, color, scale = 1) {
        const geo = new THREE.RingGeometry(0.1, 0.5, 32);
        const mat = new THREE.MeshBasicMaterial({ color: color, side: THREE.DoubleSide, transparent: true, opacity: 0.8 });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.copy(pos); mesh.lookAt(this.camera.position);
        mesh.userData.type = 'shockwave'; mesh.userData.grow = 0.5 * scale;
        this.scene.add(mesh); this.particles.push(mesh);

        // Inner ring for double burst
        setTimeout(() => {
            if (this.scene) {
                const mesh2 = new THREE.Mesh(geo, mat.clone());
                mesh2.position.copy(pos); mesh2.lookAt(this.camera.position);
                mesh2.userData.type = 'shockwave'; mesh2.userData.grow = 0.8 * scale;
                this.scene.add(mesh2); this.particles.push(mesh2);
            }
        }, 100);
    },

    spawnShieldBurst(pos, color, scale = 1) {
        const geo = new THREE.SphereGeometry(0.5, 32, 32);
        const mat = new THREE.MeshBasicMaterial({ color: color, transparent: true, opacity: 0.5, wireframe: true });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.copy(pos);
        mesh.userData.type = 'shockwave'; mesh.userData.grow = 2.0 * scale;
        this.scene.add(mesh); this.particles.push(mesh);
    },

    spawnExplosion(pos, color, scale = 1) {
        this.spawnShockwave(pos, color, scale * 2);
        this.spawnParticles(pos, color, 30, 0.5 * scale);
        this.addShake(0.8 * scale);

        // Secondary burst
        setTimeout(() => {
            this.runVFX('nova', pos, color, 0, scale);
        }, 200);
    },

    spawnBeam(pos, color, height = 5, width = 0.5) {
        const geo = new THREE.CylinderGeometry(width, width, height, 16);
        const mat = new THREE.MeshBasicMaterial({ color: color, transparent: true, opacity: 0.9 });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.copy(pos); mesh.position.y += height / 2;
        mesh.userData.type = 'beam';
        this.scene.add(mesh); this.particles.push(mesh);

        // Add core for glow
        const geo2 = new THREE.CylinderGeometry(width * 0.5, width * 0.5, height, 16);
        const mat2 = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.95 });
        const core = new THREE.Mesh(geo2, mat2);
        mesh.add(core);
    },

    spawnImplosion(pos, color) {
        const geo = new THREE.SphereGeometry(0.1, 8, 8);
        const mat = new THREE.MeshBasicMaterial({ color: color });
        for (let i = 0; i < 30; i++) {
            const mesh = new THREE.Mesh(geo, mat);
            mesh.position.set(pos.x + (Math.random() - 0.5) * 8, pos.y + (Math.random() - 0.5) * 8, pos.z + (Math.random() - 0.5) * 8);
            mesh.userData.type = 'implode'; mesh.userData.target = pos.clone();
            this.scene.add(mesh); this.particles.push(mesh);
        }
    },

    spawnMatrix(pos, color) {
        const geo = new THREE.BoxGeometry(0.05, 0.5, 0.05);
        const mat = new THREE.MeshBasicMaterial({ color: color });
        for (let i = 0; i < 20; i++) {
            const mesh = new THREE.Mesh(geo, mat);
            mesh.position.set(pos.x + (Math.random() - 0.5) * 3, pos.y + 5 + Math.random() * 5, pos.z + (Math.random() - 0.5) * 3);
            mesh.userData.type = 'rain'; mesh.userData.vel = new THREE.Vector3(0, -0.5, 0);
            this.scene.add(mesh); this.particles.push(mesh);
        }
    },

    updateParticles() {
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];

            if (p.userData.type === 'shockwave') {
                p.scale.multiplyScalar(1.1); p.material.opacity -= 0.05;
                if (p.material.opacity <= 0) { this.scene.remove(p); this.particles.splice(i, 1); }
            }
            else if (p.userData.type === 'slash') {
                p.userData.life -= 0.1;
                p.scale.multiplyScalar(1.1); // Expand outwards
                p.material.opacity = p.userData.life;
                if (p.userData.life <= 0) { this.scene.remove(p); this.particles.splice(i, 1); }
            }
            else if (p.userData.type === 'lightning') {
                p.userData.life -= 0.1;
                p.material.opacity = p.userData.life;
                if (p.userData.life <= 0) { this.scene.remove(p); this.particles.splice(i, 1); }
            }
            else if (p.userData.type === 'beam') {
                p.scale.x *= 0.9; p.scale.z *= 0.9; p.material.opacity -= 0.05;
                if (p.material.opacity <= 0) { this.scene.remove(p); this.particles.splice(i, 1); }
            }
            else if (p.userData.type === 'implode') {
                p.position.lerp(p.userData.target, 0.2);
                if (p.position.distanceTo(p.userData.target) < 0.2) { this.scene.remove(p); this.particles.splice(i, 1); }
            }
            else if (p.userData.type === 'rain') {
                p.position.add(p.userData.vel);
                if (p.position.y < 0) { this.scene.remove(p); this.particles.splice(i, 1); }
            }
            else {
                // Standard particles
                p.position.add(p.userData.vel); p.scale.multiplyScalar(0.92);
                if (p.scale.x < 0.01) { this.scene.remove(p); this.particles.splice(i, 1); }
            }
        }
    },
});
