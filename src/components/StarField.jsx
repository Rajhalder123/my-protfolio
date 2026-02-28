import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const StarField = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x000000, 0);

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 500);
        camera.position.z = 50;

        // Stars
        const starCount = 2500;
        const starGeo = new THREE.BufferGeometry();
        const positions = new Float32Array(starCount * 3);
        const sizes = new Float32Array(starCount);
        for (let i = 0; i < starCount; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 300;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 300;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 300;
            sizes[i] = Math.random() * 1.5 + 0.5;
        }
        starGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        starGeo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

        const starMat = new THREE.PointsMaterial({
            color: 0x88ccff,
            size: 0.4,
            sizeAttenuation: true,
            transparent: true,
            opacity: 0.75,
        });
        const stars = new THREE.Points(starGeo, starMat);
        scene.add(stars);

        // Nebula spheres
        const nebulae = [
            { pos: [-30, 20, -80], color: 0x7c3aed, size: 18 },
            { pos: [40, -10, -60], color: 0x00d4ff, size: 12 },
            { pos: [0, 30, -100], color: 0x10ffa0, size: 22 },
        ];
        nebulae.forEach(({ pos, color, size }) => {
            const geo = new THREE.SphereGeometry(size, 8, 8);
            const mat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.04, wireframe: false });
            const mesh = new THREE.Mesh(geo, mat);
            mesh.position.set(...pos);
            scene.add(mesh);
        });

        let animId;
        const clock = new THREE.Clock();

        const animate = () => {
            animId = requestAnimationFrame(animate);
            const t = clock.getElapsedTime();
            stars.rotation.y = t * 0.02;
            stars.rotation.x = Math.sin(t * 0.01) * 0.05;
            renderer.render(scene, camera);
        };
        animate();

        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', handleResize);

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener('resize', handleResize);
            renderer.dispose();
            starGeo.dispose();
            starMat.dispose();
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0, left: 0,
                width: '100vw',
                height: '100vh',
                zIndex: 0,
                pointerEvents: 'none',
            }}
        />
    );
};

export default StarField;
