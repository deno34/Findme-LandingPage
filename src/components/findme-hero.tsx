"use client"
import React, { useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

export function FindmeHero() {
  const mountRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  const onResize = useCallback(() => {
    if (rendererRef.current) {
        const camera = rendererRef.current.userData.camera;
        camera.aspect = window.innerWidth / Math.max(window.innerHeight, 400); // Prevent aspect ratio from becoming too extreme
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
    camera.position.z = 7;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mount.appendChild(renderer.domElement);
    renderer.userData.camera = camera;
    rendererRef.current = renderer;

    // Main Display Object
    const geometry = new THREE.BoxGeometry(2, 4, 0.2);
    const edges = new THREE.EdgesGeometry(geometry);
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0x7DF9FF });
    const lineSegments = new THREE.LineSegments(edges, lineMaterial);
    
    const fillMaterial = new THREE.MeshBasicMaterial({ color: 0x1E90FF, transparent: true, opacity: 0.1 });
    const cube = new THREE.Mesh(geometry, fillMaterial);
    cube.add(lineSegments);
    scene.add(cube);
    
    // Grid
    const gridHelper = new THREE.GridHelper(50, 50, 0x1E90FF, 0x301934);
    gridHelper.position.y = -3;
    scene.add(gridHelper);

    // Particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCnt = 5000;
    const posArray = new Float32Array(particlesCnt * 3);
    for (let i = 0; i < particlesCnt * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 30;
    }
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMaterial = new THREE.PointsMaterial({ 
        size: 0.015, 
        color: 0x7DF9FF,
        transparent: true,
        blending: THREE.AdditiveBlending
    });
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Animation loop
    let frameId: number;
    const clock = new THREE.Clock();
    const animate = () => {
        const elapsedTime = clock.getElapsedTime();
        cube.rotation.y = elapsedTime * 0.2;
        cube.position.y = Math.sin(elapsedTime * 0.5) * 0.2;
        particlesMesh.rotation.y = elapsedTime * 0.05;

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
    };
  }, [onResize]);

  return (
    <div className="relative h-dvh w-full overflow-hidden flex items-center justify-center">
      <div ref={mountRef} className="absolute top-0 left-0 w-full h-full z-0" />
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
        <h1 className="text-5xl md:text-7xl font-bold font-headline" style={{ textShadow: '0 0 15px hsl(var(--primary)), 0 0 25px hsl(var(--accent))' }}>
          Findme Messenger
        </h1>
        <p className="mt-4 text-xl md:text-2xl text-primary-foreground/80 font-headline">
          Smarter Conversations. Live Connections.
        </p>
        <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
          The only AI-powered messenger with real-time location groups, voice translation, and absolute privacy.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
          <Button size="lg" className="glowing-button w-full sm:w-auto">
            <Download className="mr-2 h-5 w-5" /> Download for Android
          </Button>
          <Button size="lg" variant="outline" className="glowing-button-secondary w-full sm:w-auto">
            <Download className="mr-2 h-5 w-5" /> Download for iOS
          </Button>
        </div>
      </div>
    </div>
  );
}
