"use client"
import React, { useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three';

export function GlobalParticleBackground() {
  const mountRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const mouse = useRef(new THREE.Vector2(10000, 10000)); // Start mouse off-screen

  const onResize = useCallback(() => {
    if (rendererRef.current?.userData?.camera) {
        const camera = rendererRef.current.userData.camera;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    }
  }, []);

  const onMouseMove = useCallback((event: MouseEvent) => {
    // Update mouse vector
    mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }, []);

  useEffect(() => {
    if (!mountRef.current) return;
    
    const mount = mountRef.current;
    
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mount.appendChild(renderer.domElement);
    rendererRef.current = renderer;
    renderer.userData = { camera };
    
    // Particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCnt = 7000;
    const posArray = new Float32Array(particlesCnt * 3);
    const colors = new Float32Array(particlesCnt * 3);
    const velocities = new Float32Array(particlesCnt * 3);
    const initialPositions = new Float32Array(particlesCnt * 3);
    
    const colorPrimary = new THREE.Color('hsl(var(--primary))');
    const colorAccent = new THREE.Color('hsl(var(--accent))');
    const colorSecondary = new THREE.Color('hsl(var(--secondary))');

    for (let i = 0; i < particlesCnt * 3; i++) {
        const i3 = i * 3;
        posArray[i3 + 0] = (Math.random() - 0.5) * 20;
        posArray[i3 + 1] = (Math.random() - 0.5) * 20;
        posArray[i3 + 2] = (Math.random() - 0.5) * 20;

        velocities[i3 + 0] = (Math.random() - 0.5) * 0.003;
        velocities[i3 + 1] = (Math.random() - 0.5) * 0.003;
        velocities[i3 + 2] = (Math.random() - 0.5) * 0.003;

        initialPositions[i3 + 0] = posArray[i3 + 0];
        initialPositions[i3 + 1] = posArray[i3 + 1];
        initialPositions[i3 + 2] = posArray[i3 + 2];

        const randomColor = Math.random();
        let color = new THREE.Color();
        if(randomColor < 0.33) {
            color = colorPrimary;
        } else if (randomColor < 0.66) {
            color = colorAccent;
        } else {
            color = colorSecondary;
        }

        colors[i3 + 0] = color.r;
        colors[i3 + 1] = color.g;
        colors[i3 + 2] = color.b;
    }
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particlesMaterial = new THREE.PointsMaterial({ 
        size: 0.02, 
        vertexColors: true,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
    });
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    const raycaster = new THREE.Raycaster();

    // Animation loop
    let frameId: number;
    const clock = new THREE.Clock();
    const animate = () => {
        const elapsedTime = clock.getElapsedTime();
        
        raycaster.setFromCamera(mouse.current, camera);
        
        const positions = particlesGeometry.attributes.position.array as Float32Array;

        for (let i = 0; i < particlesCnt; i++) {
            const i3 = i * 3;
            const particlePosition = new THREE.Vector3(positions[i3], positions[i3 + 1], positions[i3 + 2]);
            const initialPos = new THREE.Vector3(initialPositions[i3], initialPositions[i3 + 1], initialPositions[i3 + 2]);
            
            const worldParticlePosition = particlesMesh.localToWorld(particlePosition.clone());
            const distanceToMouse = worldParticlePosition.distanceTo(raycaster.ray.origin);
            
            let targetX = initialPos.x;
            let targetY = initialPos.y;

            if (distanceToMouse < 2) { 
                const repelStrength = Math.pow(2 - distanceToMouse, 2) * 0.05;
                const direction = new THREE.Vector3().subVectors(worldParticlePosition, raycaster.ray.origin).normalize();
                targetX += direction.x * repelStrength;
                targetY += direction.y * repelStrength;
            }

            positions[i3] += (targetX - positions[i3]) * 0.02 + velocities[i3];
            positions[i3 + 1] += (targetY - positions[i3+1]) * 0.02 + velocities[i3+1];
            
            positions[i3+2] += Math.sin(elapsedTime + i) * 0.0005;

            if (positions[i3+1] < -10) { 
                positions[i3+1] = 10;
                initialPositions[i3+1] = 10;
            }
            if (positions[i3] < -10) {
                positions[i3] = 10;
                initialPositions[i3] = 10;
            } else if (positions[i3] > 10) {
                positions[i3] = -10;
                initialPositions[i3] = -10;
            }
        }

        particlesGeometry.attributes.position.needsUpdate = true;
        
        particlesMesh.rotation.y = elapsedTime * 0.01;
        particlesMesh.rotation.x = elapsedTime * 0.005;

        renderer.render(scene, camera);
        frameId = requestAnimationFrame(animate);
    };
    animate();

    window.addEventListener('resize', onResize);
    window.addEventListener('mousemove', onMouseMove);

    // Cleanup
    return () => {
        window.removeEventListener('resize', onResize);
        window.removeEventListener('mousemove', onMouseMove);
        cancelAnimationFrame(frameId);
        if (mount && renderer.domElement) {
            mount.removeChild(renderer.domElement);
        }
        renderer.dispose();
    };
  }, [onResize, onMouseMove]);

  return (
    <div ref={mountRef} className="fixed top-0 left-0 w-full h-full -z-10" />
  );
}
