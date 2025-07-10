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
    const particlesCnt = 5000;
    const posArray = new Float32Array(particlesCnt * 3);
    const colors = new Float32Array(particlesCnt * 3);
    
    const colorPrimary = new THREE.Color('hsl(var(--primary))');
    const colorAccent = new THREE.Color('hsl(var(--accent))');

    for (let i = 0; i < particlesCnt * 3; i++) {
        const i3 = i * 3;
        posArray[i3 + 0] = (Math.random() - 0.5) * 15;
        posArray[i3 + 1] = (Math.random() - 0.5) * 15;
        posArray[i3 + 2] = (Math.random() - 0.5) * 15;

        const randomColor = Math.random();
        let color = randomColor < 0.5 ? colorPrimary : colorAccent;

        colors[i3 + 0] = color.r;
        colors[i3 + 1] = color.g;
        colors[i3 + 2] = color.b;
    }
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particlesMaterial = new THREE.PointsMaterial({ 
        size: 0.025, 
        vertexColors: true,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
    });
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Lines
    const lineGeometry = new THREE.BufferGeometry();
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 'hsl(var(--border))',
      transparent: true,
      opacity: 0.1,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const lineMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lineMesh);

    // Animation loop
    let frameId: number;
    const clock = new THREE.Clock();
    const raycaster = new THREE.Raycaster();
    
    const animate = () => {
        const elapsedTime = clock.getElapsedTime();
        raycaster.setFromCamera(mouse.current, camera);
        const positions = particlesGeometry.attributes.position.array as Float32Array;

        let mouseRepelStrength = 0;
        if(mouse.current.x < 9999) {
          mouseRepelStrength = 1.5;
        }

        // Particle animation
        for (let i = 0; i < particlesCnt; i++) {
            const i3 = i * 3;
            let x = particlesGeometry.attributes.position.getX(i);
            let y = particlesGeometry.attributes.position.getY(i);
            let z = particlesGeometry.attributes.position.getZ(i);

            // Simple organic movement
            positions[i3] += Math.sin(elapsedTime * 0.1 + i) * 0.001;
            positions[i3+1] += Math.cos(elapsedTime * 0.1 + i) * 0.001;
            positions[i3+2] += Math.sin(elapsedTime * 0.1 + z) * 0.001;

            // Repel from mouse
            const particlePos = new THREE.Vector3(x, y, z);
            const distanceToMouse = particlePos.distanceTo(raycaster.ray.origin);
            if(distanceToMouse < mouseRepelStrength) {
                const repelVec = new THREE.Vector3().subVectors(particlePos, raycaster.ray.origin).normalize();
                positions[i3] += repelVec.x * (mouseRepelStrength - distanceToMouse) * 0.02;
                positions[i3+1] += repelVec.y * (mouseRepelStrength - distanceToMouse) * 0.02;
            }
        }
        particlesGeometry.attributes.position.needsUpdate = true;
        
        // Line connection animation
        const linePositions = [];
        const connectionDistance = 1;
        for (let i = 0; i < particlesCnt; i++) {
          for (let j = i + 1; j < particlesCnt; j++) {
            const p1 = new THREE.Vector3(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]);
            const p2 = new THREE.Vector3(positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]);
            const dist = p1.distanceTo(p2);

            if (dist < connectionDistance) {
              linePositions.push(p1.x, p1.y, p1.z);
              linePositions.push(p2.x, p2.y, p2.z);
            }
          }
        }
        lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
        lineGeometry.attributes.position.needsUpdate = true;


        particlesMesh.rotation.y = elapsedTime * 0.02;
        particlesMesh.rotation.x = elapsedTime * 0.01;

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
        particlesGeometry.dispose();
        particlesMaterial.dispose();
        lineGeometry.dispose();
        lineMaterial.dispose();
    };
  }, [onResize, onMouseMove]);

  return (
    <div ref={mountRef} className="fixed top-0 left-0 w-full h-full -z-10" />
  );
}
