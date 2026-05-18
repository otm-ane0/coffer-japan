import * as THREE from 'three';

export function createCoffeeCup() {
  const group = new THREE.Group();

  // Cup body
  const bodyGeometry = new THREE.CylinderGeometry(0.8, 0.5, 1.2, 32);
  const bodyMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    roughness: 0.25,
    metalness: 0,
    clearcoat: 0.8
  });
  const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
  group.add(body);

  // Cup base
  const baseGeo = new THREE.CylinderGeometry(0.55, 0.55, 0.1, 32);
  const baseMesh = new THREE.Mesh(baseGeo, bodyMaterial);
  baseMesh.position.y = -0.65;
  group.add(baseMesh);

  // Handle
  const handleGeo = new THREE.TorusGeometry(0.35, 0.12, 16, 32, Math.PI);
  const handleMesh = new THREE.Mesh(handleGeo, bodyMaterial);
  handleMesh.position.set(0.7, 0, 0);
  handleMesh.rotation.z = -Math.PI / 2;
  group.add(handleMesh);

  // Liquid
  const liquidGeo = new THREE.CircleGeometry(0.75, 32);
  const liquidMat = new THREE.MeshStandardMaterial({
    color: 0x2b1509,
    roughness: 0.1,
    metalness: 0.1
  });
  const liquid = new THREE.Mesh(liquidGeo, liquidMat);
  liquid.rotation.x = -Math.PI / 2;
  liquid.position.y = 0.5;
  group.add(liquid);

  // Saucer
  const saucerGeo = new THREE.CylinderGeometry(1.2, 0.8, 0.1, 32);
  const saucer = new THREE.Mesh(saucerGeo, bodyMaterial);
  saucer.position.y = -0.75;
  group.add(saucer);

  return { cupGroup: group };
}
