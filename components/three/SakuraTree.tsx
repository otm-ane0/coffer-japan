import * as THREE from 'three';

export function createSakuraTree() {
  const group = new THREE.Group();

  // Trunk
  const trunkGeo = new THREE.CylinderGeometry(0.08, 0.22, 3.5, 8, 8);
  const posAttribute = trunkGeo.attributes.position;
  for (let i = 0; i < posAttribute.count; i++) {
    const y = posAttribute.getY(i);
    const twist = Math.sin(y * 2) * 0.05;
    posAttribute.setX(i, posAttribute.getX(i) + twist);
    posAttribute.setZ(i, posAttribute.getZ(i) + twist);
  }
  trunkGeo.computeVertexNormals();
  const barkMat = new THREE.MeshStandardMaterial({ color: 0x2D1A0A, roughness: 0.9 });
  const trunk = new THREE.Mesh(trunkGeo, barkMat);
  trunk.position.y = 1.75;
  group.add(trunk);

  const clusterMat = new THREE.MeshStandardMaterial({
    color: 0xFFB7C5,
    emissive: 0xFF8FAB,
    emissiveIntensity: 0.12,
  });

  const clustersData: any[] = [];
  
  const createBranch = (parent: THREE.Object3D, yPos: number, addClusters: boolean) => {
    const curve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(Math.random() - 0.5, 0.5 + Math.random(), Math.random() - 0.5),
      new THREE.Vector3((Math.random() - 0.5) * 2, 1 + Math.random() * 1.5, (Math.random() - 0.5) * 2)
    );
    const branchGeo = new THREE.TubeGeometry(curve, 10, 0.04, 6, false);
    const branchMesh = new THREE.Mesh(branchGeo, barkMat);
    branchMesh.position.y = yPos;
    parent.add(branchMesh);
    
    // Add clusters
    if (addClusters) {
      for (let j = 0; j < 5; j++) {
        const t = Math.random() * 0.5 + 0.5; // Upper half
        const point = curve.getPoint(t);
        const cluster = new THREE.Mesh(new THREE.SphereGeometry(0.08 + Math.random() * 0.1), clusterMat);
        cluster.position.copy(point);
        cluster.position.y += yPos;
        const scale = 0.7 + Math.random() * 0.7;
        cluster.scale.setScalar(scale);
        parent.add(cluster);
        clustersData.push({ mesh: cluster, baseScale: scale, freq: 0.5 + Math.random() * 2, offset: Math.random() * Math.PI * 2 });
      }
    }
  };

  for (let i = 0; i < 7; i++) createBranch(group, 1.5 + Math.random() * 1.5, true);

  // Ground petals
  const groundGeo = new THREE.BufferGeometry();
  const groundPts = new Float32Array(2000 * 3);
  for(let i=0; i<2000; i++) {
    const angle = Math.random() * Math.PI * 2;
    const r = Math.sqrt(Math.random()) * 6;
    groundPts[i*3] = Math.cos(angle) * r;
    groundPts[i*3+1] = -1.78 + Math.random() * 0.05;
    groundPts[i*3+2] = Math.sin(angle) * r;
  }
  groundGeo.setAttribute('position', new THREE.BufferAttribute(groundPts, 3));
  const groundMat = new THREE.PointsMaterial({ color: 0xFDDDE6, size: 0.04 });
  const ground = new THREE.Points(groundGeo, groundMat);
  group.add(ground);

  return { treeGroup: group, clustersData };
}

export function createSkyDome() {
  const geo = new THREE.SphereGeometry(50, 32, 32);
  // Basic shader for sky
  const mat = new THREE.ShaderMaterial({
    uniforms: {
      colorTop: { value: new THREE.Color(0x0A0814) },
      colorBottom: { value: new THREE.Color(0x1A0825) }
    },
    vertexShader: `
      varying vec3 vWorldPosition;
      void main() {
        vec4 worldPosition = modelMatrix * vec4(position, 1.0);
        vWorldPosition = worldPosition.xyz;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 colorTop;
      uniform vec3 colorBottom;
      varying vec3 vWorldPosition;
      void main() {
        float h = normalize(vWorldPosition).y;
        gl_FragColor = vec4(mix(colorBottom, colorTop, max(pow(max(h, 0.0), 0.6), 0.0)), 1.0);
      }
    `,
    side: THREE.BackSide
  });
  return new THREE.Mesh(geo, mat);
}
