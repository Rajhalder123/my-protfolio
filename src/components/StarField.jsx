import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * Cinematic StarField v3
 *
 * - Sparse, elegant star layer (not noisy)
 * - One large slow-rotating galaxy spiral ring
 * - Shooting meteor streaks that fire periodically
 * - Section "realm planets" positioned at different scroll depths —
 *   each section has its own unique planet that drifts past as you scroll
 * - Warp: on scroll the galaxy ring accelerates, stars drift faster (not chaotic)
 */

// Per-section realm planets
const PLANETS = [
    { z: -600, radius: 28, color: 0x7c3aed, emissive: 0x3d1a7c, label: 'projects' }, // purple
    { z: -1200, radius: 22, color: 0x10805a, emissive: 0x054030, label: 'skills' }, // emerald
    { z: -1900, radius: 34, color: 0x005080, emissive: 0x002840, label: 'experience' }, // deep blue
    { z: -2500, radius: 18, color: 0x806000, emissive: 0x403000, label: 'contact' }, // gold
];

const StarField = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // ── Renderer ──────────────────────────────────────────────────────────────
        const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x000000, 0);

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 3000);
        camera.position.z = 0;

        // ── Sparse background stars (only 700, slow) ───────────────────────────
        const STAR_COUNT = 700;
        const starGeo = new THREE.BufferGeometry();
        const sPos = new Float32Array(STAR_COUNT * 3);
        for (let i = 0; i < STAR_COUNT; i++) {
            const theta = Math.random() * Math.PI * 2;
            const r = 80 + Math.random() * 500;
            sPos[i * 3] = Math.cos(theta) * r;
            sPos[i * 3 + 1] = (Math.random() - 0.5) * 600;
            sPos[i * 3 + 2] = -(Math.random() * 2800);
        }
        starGeo.setAttribute('position', new THREE.BufferAttribute(sPos, 3));
        const starMat = new THREE.PointsMaterial({ color: 0xaaccee, size: 0.8, sizeAttenuation: true, transparent: true, opacity: 0.65 });
        const stars = new THREE.Points(starGeo, starMat);
        scene.add(stars);

        // ── Galaxy spiral ring ─────────────────────────────────────────────────
        const GALAXY_COUNT = 2000;
        const gGeo = new THREE.BufferGeometry();
        const gPos = new Float32Array(GALAXY_COUNT * 3);
        const gColors = new Float32Array(GALAXY_COUNT * 3);
        const arms = 3;
        const armSpin = 2.5;
        for (let i = 0; i < GALAXY_COUNT; i++) {
            const arm = (i % arms) * (Math.PI * 2 / arms);
            const t = (i / GALAXY_COUNT);
            const angle = arm + t * armSpin * Math.PI * 2;
            const radius = 60 + t * 260;
            const spread = (1 - t) * 20;
            gPos[i * 3] = Math.cos(angle) * radius + (Math.random() - 0.5) * spread;
            gPos[i * 3 + 1] = (Math.random() - 0.5) * 15 * (1 - t);
            gPos[i * 3 + 2] = Math.sin(angle) * radius + (Math.random() - 0.5) * spread - 400;
            // color gradient: core=cyan, outer=purple
            const mix = t;
            gColors[i * 3] = mix * 0.5 + 0.0;    // R
            gColors[i * 3 + 1] = (1 - mix) * 0.8;    // G
            gColors[i * 3 + 2] = 1.0;                  // B
        }
        gGeo.setAttribute('position', new THREE.BufferAttribute(gPos, 3));
        gGeo.setAttribute('color', new THREE.BufferAttribute(gColors, 3));
        const galaxyMat = new THREE.PointsMaterial({ size: 0.7, sizeAttenuation: true, transparent: true, opacity: 0.55, vertexColors: true });
        const galaxy = new THREE.Points(gGeo, galaxyMat);
        galaxy.position.set(60, -20, -400);
        scene.add(galaxy);

        // ── Realm planets ──────────────────────────────────────────────────────
        const planetMeshes = PLANETS.map(p => {
            const geo = new THREE.SphereGeometry(p.radius, 32, 32);
            const mat = new THREE.MeshPhongMaterial({
                color: p.color, emissive: p.emissive, emissiveIntensity: 0.5, shininess: 60,
            });
            const mesh = new THREE.Mesh(geo, mat);
            mesh.position.set(
                (Math.random() - 0.5) * 200,   // random X offset
                (Math.random() - 0.5) * 100,
                p.z
            );
            // Glow ring around planet
            const rGeo = new THREE.TorusGeometry(p.radius * 1.5, p.radius * 0.06, 8, 80);
            const rMat = new THREE.MeshBasicMaterial({ color: p.color, transparent: true, opacity: 0.35 });
            const ring = new THREE.Mesh(rGeo, rMat);
            ring.rotation.x = Math.PI / 3;
            mesh.add(ring);
            scene.add(mesh);
            return { mesh, mat, geo, rGeo, rMat };
        });

        // Planet lights
        const pLight1 = new THREE.PointLight(0x00d4ff, 2, 300); pLight1.position.set(100, 80, 0); scene.add(pLight1);
        const pLight2 = new THREE.PointLight(0x7c3aed, 1.5, 300); pLight2.position.set(-100, -50, -400); scene.add(pLight2);
        const ambLight = new THREE.AmbientLight(0x112233, 1); scene.add(ambLight);

        // ── Meteor pool ────────────────────────────────────────────────────────
        const METEOR_POOL = 12;
        const meteorLines = [];
        for (let i = 0; i < METEOR_POOL; i++) {
            const mGeo = new THREE.BufferGeometry();
            const pts = new Float32Array(6); // 2 points × 3
            mGeo.setAttribute('position', new THREE.BufferAttribute(pts, 3));
            const mMat = new THREE.LineBasicMaterial({ color: 0x88ddff, transparent: true, opacity: 0 });
            const line = new THREE.Line(mGeo, mMat);
            scene.add(line);
            meteorLines.push({
                line, mGeo, mMat,
                active: false, life: 0, maxLife: 0,
                vx: 0, vy: 0, vz: 0, x: 0, y: 0, z: 0, length: 0,
            });
        }

        const spawnMeteor = () => {
            const m = meteorLines.find(m => !m.active);
            if (!m) return;
            m.active = true;
            m.life = 0;
            m.maxLife = 0.6 + Math.random() * 0.8;
            m.x = (Math.random() - 0.5) * 400;
            m.y = 100 + Math.random() * 150;
            m.z = -200 - Math.random() * 400;
            const speed = 300 + Math.random() * 400;
            const angle = -Math.PI * 0.15 + (Math.random() - 0.5) * 0.2;
            m.vx = Math.cos(angle) * speed;
            m.vy = Math.sin(angle) * speed - speed * 0.6;
            m.vz = 0;
            m.length = 20 + Math.random() * 40;
            m.mMat.color.setHex(Math.random() > 0.5 ? 0x88ddff : 0xaa88ff);
        };

        let meteorTimer = 0;
        const METEOR_INTERVAL = 1.5; // seconds between meteors

        // ── Scroll / warp ─────────────────────────────────────────────────────
        let scrollY = 0;
        let warp = 0;
        let targetWarp = 0;
        let lastScrollY = 0;
        const onScroll = () => { scrollY = window.scrollY; };
        window.addEventListener('scroll', onScroll, { passive: true });

        // ── Mouse ─────────────────────────────────────────────────────────────
        let mx = 0, my = 0;
        const onMouse = (e) => {
            mx = (e.clientX / window.innerWidth - 0.5) * 2;
            my = (e.clientY / window.innerHeight - 0.5) * 2;
        };
        window.addEventListener('mousemove', onMouse, { passive: true });

        // ── Resize ─────────────────────────────────────────────────────────────
        const onResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', onResize);

        // ── Animation loop ─────────────────────────────────────────────────────
        let animId;
        const clock = new THREE.Clock();

        const animate = () => {
            animId = requestAnimationFrame(animate);
            const delta = clock.getDelta();
            const t = clock.getElapsedTime();

            // Scroll velocity → warp
            const sd = scrollY - lastScrollY;
            lastScrollY = scrollY;
            targetWarp = Math.abs(sd) * 0.06;
            warp += (targetWarp - warp) * 0.1;

            // Move background stars forward gently
            const sp = sPos;
            const baseSpeed = 0.015;
            const warpExtra = warp * 25;
            for (let i = 2; i < sp.length; i += 3) {
                sp[i] += (baseSpeed + warpExtra) * delta * 60;
                if (sp[i] > 50) {
                    const theta = Math.random() * Math.PI * 2;
                    const r = 80 + Math.random() * 500;
                    sp[i - 2] = Math.cos(theta) * r;
                    sp[i - 1] = (Math.random() - 0.5) * 600;
                    sp[i] = -2800;
                }
            }
            starGeo.attributes.position.needsUpdate = true;
            starMat.size = 0.8 + warp * 3;

            // Galaxy ring spins + warps toward camera
            galaxy.rotation.y = t * 0.04;
            galaxy.position.z = -400 + scrollY * 0.08;   // drifts toward camera as you scroll
            galaxy.rotation.z = t * 0.015;
            galaxyMat.opacity = 0.45 + warp * 0.3;

            // Planets: scroll parallax — move toward camera as you scroll
            const scrollProgress = scrollY / Math.max(1, document.body.scrollHeight - window.innerHeight);
            planetMeshes.forEach(({ mesh }, i) => {
                const p = PLANETS[i];
                mesh.rotation.y = t * 0.08;
                mesh.rotation.x = t * 0.03;
                // Drift planet closer as user scrolls past its section
                mesh.position.z = p.z + scrollY * (0.25 + i * 0.05);
                // Side drift
                mesh.position.x = Math.sin(t * 0.2 + i * 1.5) * 30 + Math.cos(t * 0.1 + i) * 15;
                mesh.position.y = Math.cos(t * 0.15 + i * 2) * 20;
            });

            // Camera follows mouse + tilts with scroll
            camera.position.x += (mx * 10 - camera.position.x) * 0.04;
            camera.position.y += (-my * 6 - camera.position.y) * 0.04;
            camera.rotation.z += (scrollProgress * 0.1 - camera.rotation.z) * 0.03;

            // Meteors
            meteorTimer += delta;
            if (meteorTimer > METEOR_INTERVAL) {
                spawnMeteor();
                meteorTimer = 0;
            }

            meteorLines.forEach(m => {
                if (!m.active) return;
                m.life += delta;
                const pct = m.life / m.maxLife;
                if (pct >= 1) { m.active = false; m.mMat.opacity = 0; return; }
                // Fade in → head → fade out
                m.mMat.opacity = pct < 0.15 ? pct / 0.15 : pct > 0.7 ? (1 - pct) / 0.3 : 1;
                m.x += m.vx * delta;
                m.y += m.vy * delta;
                const pts = m.mGeo.attributes.position.array;
                const tailLen = m.length * (1 - pct * 0.6);
                pts[0] = m.x; pts[1] = m.y; pts[2] = m.z;                               // head
                pts[3] = m.x - m.vx / Math.abs(m.vx || 1) * tailLen;                     // tail X
                pts[4] = m.y - m.vy / Math.abs(m.vy || 1) * tailLen;                     // tail Y
                pts[5] = m.z;
                m.mGeo.attributes.position.needsUpdate = true;
            });

            renderer.render(scene, camera);
        };
        animate();

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('mousemove', onMouse);
            window.removeEventListener('resize', onResize);
            renderer.dispose();
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0, left: 0,
                width: '100vw', height: '100vh',
                zIndex: 0,
                pointerEvents: 'none',
            }}
        />
    );
};

export default StarField;
