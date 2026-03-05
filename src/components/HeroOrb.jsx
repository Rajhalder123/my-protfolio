import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const HeroOrb = () => {
    const canvasRef = useRef(null);
    const [canvasHeight] = useState(() => window.innerWidth <= 768 ? 300 : 480);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const W = canvas.parentElement?.clientWidth || 500;
        const H = canvasHeight;
        canvas.width = W;
        canvas.height = H;

        const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(W, H);
        renderer.setClearColor(0x000000, 0);

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(50, W / H, 0.1, 100);
        camera.position.z = 7;

        // Core distorted orb — approxmiating MeshDistortMaterial with noise-based morph
        const orbGeo = new THREE.SphereGeometry(1.4, 64, 64);
        const orbMat = new THREE.MeshPhongMaterial({
            color: 0x00aacc,
            emissive: 0x001a33,
            emissiveIntensity: 0.6,
            shininess: 120,
            transparent: true,
            opacity: 0.92,
        });
        const orb = new THREE.Mesh(orbGeo, orbMat);
        scene.add(orb);

        // Inner glow core
        const innerGeo = new THREE.SphereGeometry(0.55, 32, 32);
        const innerMat = new THREE.MeshBasicMaterial({ color: 0x10ffa0, transparent: true, opacity: 0.85 });
        const innerCore = new THREE.Mesh(innerGeo, innerMat);
        scene.add(innerCore);

        // Orbital ring 1
        const ring1Geo = new THREE.TorusGeometry(2.2, 0.035, 16, 120);
        const ring1Mat = new THREE.MeshBasicMaterial({ color: 0x00d4ff, transparent: true, opacity: 0.65 });
        const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
        scene.add(ring1);

        // Orbital ring 2
        const ring2Geo = new THREE.TorusGeometry(3.0, 0.025, 16, 120);
        const ring2Mat = new THREE.MeshBasicMaterial({ color: 0x7c3aed, transparent: true, opacity: 0.45 });
        const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
        scene.add(ring2);

        // Lights
        const ambientLight = new THREE.AmbientLight(0x111122, 1.5);
        scene.add(ambientLight);

        const light1 = new THREE.PointLight(0x00d4ff, 4, 15);
        light1.position.set(3, 3, 5);
        scene.add(light1);

        const light2 = new THREE.PointLight(0x7c3aed, 3, 12);
        light2.position.set(-3, -2, 3);
        scene.add(light2);

        const light3 = new THREE.PointLight(0x10ffa0, 2, 10);
        light3.position.set(0, -3, -2);
        scene.add(light3);

        // Store vertex positions for distortion animation
        const basePositions = orbGeo.attributes.position.array.slice();

        // Mouse tracking
        let mouseX = 0, mouseY = 0;
        const handleMouseMove = (e) => {
            mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
            mouseY = -(e.clientY / window.innerHeight - 0.5) * 2;
        };
        window.addEventListener('mousemove', handleMouseMove);

        let animId;
        const clock = new THREE.Clock();

        const animate = () => {
            animId = requestAnimationFrame(animate);
            const t = clock.getElapsedTime();

            // Distort orb vertices for organic shape
            const pos = orbGeo.attributes.position.array;
            for (let i = 0; i < pos.length; i += 3) {
                const bx = basePositions[i];
                const by = basePositions[i + 1];
                const bz = basePositions[i + 2];
                const noise = Math.sin(bx * 2 + t * 1.5) * Math.cos(by * 2 + t) * Math.sin(bz * 2 + t * 0.7);
                const scale = 1 + noise * 0.18;
                pos[i] = bx * scale;
                pos[i + 1] = by * scale;
                pos[i + 2] = bz * scale;
            }
            orbGeo.attributes.position.needsUpdate = true;
            orbGeo.computeVertexNormals();

            // Float animation
            const floatY = Math.sin(t * 0.8) * 0.15;

            orb.position.y = floatY;
            orb.rotation.y = t * 0.4;
            orb.rotation.x = mouseY * 0.3 + Math.sin(t * 0.5) * 0.15;

            innerCore.position.y = floatY;
            innerCore.rotation.y = -t * 0.6;

            ring1.rotation.z = t * 0.7;
            ring1.rotation.x = t * 0.25 + mouseY * 0.5;
            ring1.position.y = floatY * 0.5;

            ring2.rotation.z = -t * 0.4;
            ring2.rotation.y = t * 0.5 + mouseX * 0.3;
            ring2.position.y = floatY * 0.3;

            // Move lights slightly for shimmer
            light1.position.x = Math.sin(t * 0.7) * 4;
            light1.position.y = Math.cos(t * 0.5) * 4;
            light2.position.x = Math.cos(t * 0.6) * 3;
            light2.position.z = Math.sin(t * 0.8) * 3 + 2;

            renderer.render(scene, camera);
        };
        animate();

        const handleResize = () => {
            const w = canvas.parentElement?.clientWidth || 500;
            camera.aspect = w / H;
            camera.updateProjectionMatrix();
            renderer.setSize(w, H);
        };
        window.addEventListener('resize', handleResize);

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
            renderer.dispose();
            [orbGeo, orbMat, innerGeo, innerMat, ring1Geo, ring1Mat, ring2Geo, ring2Mat].forEach(o => o.dispose());
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                width: '100%',
                height: `${canvasHeight}px`,
                display: 'block',
                borderRadius: '20px',
            }}
        />
    );
};

export default HeroOrb;
