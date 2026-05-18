import * as THREE from 'three';

export function createPetalSystem(count = 200, isSakuraPage = false) {
  const geometry = new THREE.BufferGeometry();
  // Soft 4-point oval teardrop shape
  const vertices = new Float32Array([
    0, 0.05, 0,
    0.04, 0, 0,
    0, -0.08, 0,
    -0.04, 0, 0,
  ]);
  const indices = [
    0, 1, 2,
    0, 2, 3
  ];
  geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();

  const material = new THREE.MeshStandardMaterial({
    color: 0xffb7c5,
    side: THREE.DoubleSide,
    emissive: 0xffb7c5,
    emissiveIntensity: 0.05,
    transparent: true,
  });

  const mesh = new THREE.InstancedMesh(geometry, material, count);
  
  const dummy = new THREE.Object3D();
  const petalData: any[] = [];
  
  const pinks = [0xFFB7C5, 0xFDDDE6, 0xFFF0F5];
  const colorObj = new THREE.Color();

  for (let i = 0; i < count; i++) {
    const x = (Math.random() - 0.5) * 15;
    const y = -2 + Math.random() * 10;
    const z = (Math.random() - 0.5) * 15;
    
    dummy.position.set(x, y, z);
    dummy.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
    
    const scale = 0.5 + Math.random() * 0.8;
    dummy.scale.set(scale, scale, scale);
    dummy.updateMatrix();
    mesh.setMatrixAt(i, dummy.matrix);

    const colorHex = pinks[Math.floor(Math.random() * pinks.length)];
    colorObj.setHex(colorHex);
    // Shift paler on sakura page
    if (isSakuraPage) colorObj.lerp(new THREE.Color(0xffffff), 0.3);
    mesh.setColorAt(i, colorObj);

    petalData.push({
      x, y, z,
      baseX: x,
      fallSpeed: (0.003 + Math.random() * 0.006) * (isSakuraPage ? 0.5 : 1),
      driftFreq: 0.3 + Math.random() * 0.9,
      driftAmp: 0.08 + Math.random() * 0.17,
      rx: (Math.random() - 0.5) * 0.03,
      ry: (Math.random() - 0.5) * 0.03,
      rz: (Math.random() - 0.5) * 0.03,
      rotX: dummy.rotation.x,
      rotY: dummy.rotation.y,
      rotZ: dummy.rotation.z
    });
  }

  return { petalMesh: mesh, petalData };
}
