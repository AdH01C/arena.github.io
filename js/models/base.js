window.Models = {
    box(w, h, d, mat, x, y, z, p) {
        const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
        m.position.set(x, y, z); if (p) p.add(m); return m;
    },
    createHumanoid(c, s = 1) {
        const g = new THREE.Group();
        const mB = new THREE.MeshStandardMaterial({ color: 0x333, metalness: 0.8, roughness: 0.2 });
        const mG = new THREE.MeshBasicMaterial({ color: c });
        this.box(0.15, 0.6, 0.2, mB, -0.2, 0.3, 0, g); this.box(0.15, 0.6, 0.2, mB, 0.2, 0.3, 0, g);
        const t = this.box(0.5, 0.5, 0.4, mB, 0, 0.7, 0, g); this.box(0.2, 0.2, 0.1, mG, 0, 0.1, 0.21, t);
        const h = this.box(0.3, 0.3, 0.3, mB, 0, 0.5, 0, t); this.box(0.25, 0.05, 0.05, mG, 0, 0, 0.16, h);
        const ag = new THREE.Group(); ag.position.y = 0.3; t.add(ag);
        const mkArm = (x) => {
            const s = new THREE.Group(); s.position.set(x, 0, 0); ag.add(s);
            this.box(0.15, 0.5, 0.15, mB, 0, -0.3, 0, s); this.box(0.1, 0.6, 0.05, mG, 0, 0, 0.1, s); return s;
        }
        g.scale.set(s, s, s); return { mesh: g, weapon: mkArm(0.35) };
    }
};
