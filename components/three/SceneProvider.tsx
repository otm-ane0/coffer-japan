'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { usePathname } from 'next/navigation';
import { createCoffeeCup } from './CoffeeCup';
import { createPetalSystem } from './PetalSystem';
import { createSakuraTree, createSkyDome } from './SakuraTree';
import { useScrollCamera } from '@/lib/useScrollCamera';
import { usePetalWind } from '@/lib/usePetalWind';
import { useMouseParallax } from '@/lib/useMouseParallax';

export function SceneProvider() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  
  const { updateCamera } = useScrollCamera(cameraRef);
  const { windForce, updateWind } = usePetalWind();
  const { update: updateMouse } = useMouseParallax();

  useEffect(() => {
    if (!containerRef.current) return;
    const isSakura = pathname === '/sakura';

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0D0D1A, 0.025);

    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 6;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    containerRef.current.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(isSakura ? 0xB8C8E8 : 0x404040, isSakura ? 0.5 : 1.5);
    scene.add(ambientLight);

    if (isSakura) {
      const dirLight = new THREE.DirectionalLight(0xFFD4A0, 1.2);
      dirLight.position.set(5, -2, 5);
      scene.add(dirLight);
      
      const rimLight = new THREE.DirectionalLight(0xC8D8FF, 0.4);
      rimLight.position.set(-5, 5, -5);
      scene.add(rimLight);
      
      const hemiLight = new THREE.HemisphereLight(0x1A0825, 0x2D1B0E, 0.3);
      scene.add(hemiLight);
    } else {
      const pLight = new THREE.PointLight(0xffffff, 1, 10);
      pLight.position.set(2, 2, 2);
      scene.add(pLight);
    }

    // Objects
    const { cupGroup } = createCoffeeCup();
    if (!isSakura) scene.add(cupGroup);
    
    if (pathname === '/menu') {
      cupGroup.position.y = 8;
    }

    const { treeGroup, clustersData } = createSakuraTree();
    const skyDome = createSkyDome();
    if (isSakura) {
      scene.add(treeGroup);
      scene.add(skyDome);
    }

    const petalCount = isSakura ? 400 : 200;
    const { petalMesh, petalData } = createPetalSystem(petalCount, isSakura);
    scene.add(petalMesh);

    const clock = new THREE.Clock();

    let reqId: number;
    const dummy = new THREE.Object3D();
    const mat4 = new THREE.Matrix4();

    const animate = () => {
      reqId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Ensure camera updates based on scroll
      updateCamera();
      
      const m = updateMouse();
      const wind = updateWind();

      // Camera parallax drift
      camera.position.x += (m.x * 0.8 - camera.position.x * 0.1) * 0.05;
      camera.position.y += (m.y * 0.8 - camera.position.y * 0.1) * 0.05;

      if (!isSakura) {
        cupGroup.rotation.y += 0.002;
        if (pathname === '/menu') {
          cupGroup.position.y += (0 - cupGroup.position.y) * 0.05; 
        } else {
          cupGroup.position.y = Math.sin(time * 0.8) * 0.12;
        }
      }

      for (let i = 0; i < petalCount; i++) {
        const pd = petalData[i];
        pd.y -= pd.fallSpeed;
        pd.x += Math.sin(time * pd.driftFreq + i) * pd.driftAmp * 0.01 + wind.x;
        pd.rotX += pd.rx;
        pd.rotY += pd.ry;
        pd.rotZ += pd.rz;

        if (pd.y < -5) {
          pd.y = 8;
          pd.x = pd.baseX;
        }

        dummy.position.set(pd.x, pd.y, pd.z);
        dummy.rotation.set(pd.rotX, pd.rotY, pd.rotZ);
        petalMesh.getMatrixAt(i, mat4);
        const scale = new THREE.Vector3().setFromMatrixScale(mat4);
        dummy.scale.copy(scale);
        dummy.updateMatrix();
        petalMesh.setMatrixAt(i, dummy.matrix);
      }
      petalMesh.instanceMatrix.needsUpdate = true;

      if (isSakura) {
        clustersData.forEach(c => {
          const s = c.baseScale * (1 + Math.sin(time * c.freq + c.offset) * 0.04);
          c.mesh.scale.setScalar(s);
        });
      }

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
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(reqId);
      renderer.dispose();
      scene.clear();
      if (containerRef.current?.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, [pathname]);

  return <div ref={containerRef} className="fixed inset-0 w-full h-full z-[-2] pointer-events-none" />;
}
