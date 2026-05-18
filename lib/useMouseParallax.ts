import { useEffect, useRef } from "react";
import * as THREE from "three";

export function useMouseParallax(lerpFactor = 0.05) {
  const mouseTarget = useRef({ x: 0, y: 0 });
  const mouseCurrent = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseTarget.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseTarget.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const update = () => {
    mouseCurrent.current.x = THREE.MathUtils.lerp(mouseCurrent.current.x, mouseTarget.current.x, lerpFactor);
    mouseCurrent.current.y = THREE.MathUtils.lerp(mouseCurrent.current.y, mouseTarget.current.y, lerpFactor);
    return mouseCurrent.current;
  };

  return { mouseTarget, mouseCurrent, update };
}
