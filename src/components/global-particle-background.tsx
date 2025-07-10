"use client"
import React, { useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three';

export function GlobalParticleBackground() {
  const mountRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  const onResize = useCallback(() => {
    if (rendererRef.current?.userData?.camera) {
        const camera = rendererRef.current.userData.camera;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    }
  }, []);

  useEffect(() => {
    if (!mountRef.current) return;
    
    const mount = mountRef.current;
    
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 3;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mount.appendChild(renderer.domElement);
    rendererRef.current = renderer;
    renderer.userData = { camera };
    
    // Particle Parameters
    const parameters = {
        count: 10000,
        size: 0.02,
        radius: 5,
    };

    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(parameters.count * 3);
    const colors = new Float32Array(parameters.count * 3);

    const colorPrimary = new THREE.Color('hsl(var(--primary))');
    const colorAccent = new THREE.Color('hsl(var(--accent))');

    for (let i = 0; i < parameters.count; i++) {
        const i3 = i * 3;

        // Position
        positions[i3] = (Math.random() - 0.5) * parameters.radius * 2;
        positions[i3 + 1] = (Math.random() - 0.5) * parameters.radius * 2;
        positions[i3 + 2] = (Math.random() - 0.5) * parameters.radius * 2;

        // Color
        const randomColor = Math.random() > 0.5 ? colorPrimary : colorAccent;
        colors[i3] = randomColor.r;
        colors[i3 + 1] = randomColor.g;
        colors[i3 + 2] = randomColor.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Material
    const material = new THREE.PointsMaterial({
        size: parameters.size,
        sizeAttenuation: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexColors: true,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Animation loop
    let frameId: number;
    const clock = new THREE.Clock();
    
    const animate = () => {
        const elapsedTime = clock.getElapsedTime();

        particles.rotation.y = elapsedTime * 0.05;
        particles.rotation.x = elapsedTime * 0.02;
        
        renderer.render(scene, camera);
        frameId = requestAnimationFrame(animate);
    };
    animate();

    window.addEventListener('resize', onResize);

    // Cleanup
    return () => {
        window.removeEventListener('resize', onResize);
        cancelAnimationFrame(frameId);
        if (mount && renderer.domElement) {
            mount.removeChild(renderer.domElement);
        }
        renderer.dispose();
        geometry.dispose();
        material.dispose();
    };
  }, [onResize]);

  return (
    <div ref={mountRef} className="fixed top-0 left-0 w-full h-full -z-10" />
  );
}
