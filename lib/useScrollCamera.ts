import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import * as THREE from "three";
import { usePathname } from "next/navigation";

export function useScrollCamera(cameraRef: React.MutableRefObject<THREE.PerspectiveCamera | null>) {
  const pathname = usePathname();
  const progressRef = useRef(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const matchMedia = gsap.matchMedia();

    matchMedia.add("(min-width: 320px)", () => {
      const st = ScrollTrigger.create({
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
        onUpdate: (self) => {
          progressRef.current = self.progress;
        },
      });

      return () => {
        st.kill();
      };
    });

    return () => matchMedia.revert();
  }, [pathname]);

  const updateCamera = () => {
    if (!cameraRef.current) return;
    const progress = progressRef.current;
    const cam = cameraRef.current;
    
    let targetPos = new THREE.Vector3(0, 0, 6);
    let targetLook = new THREE.Vector3(0, 0, 0);

    if (pathname === '/sakura') {
      if (progress < 0.4) {
        targetPos.set(
          THREE.MathUtils.lerp(0, 2, progress / 0.4),
          THREE.MathUtils.lerp(1, 0.5, progress / 0.4),
          THREE.MathUtils.lerp(8, 6, progress / 0.4)
        );
      } else if (progress < 0.7) {
        const p = (progress - 0.4) / 0.3;
        targetPos.set(
          THREE.MathUtils.lerp(2, -1, p),
          THREE.MathUtils.lerp(0.5, -0.5, p),
          THREE.MathUtils.lerp(6, 5, p)
        );
      } else {
        const p = (progress - 0.7) / 0.3;
        targetPos.set(
          THREE.MathUtils.lerp(-1, 0, p),
          THREE.MathUtils.lerp(-0.5, -1, p),
          THREE.MathUtils.lerp(5, 4, p)
        );
      }
      targetLook.set(0, 2, 0);
    } else {
      if (progress < 0.3) {
        targetPos.set(
          THREE.MathUtils.lerp(0, 0.5, progress / 0.3),
          THREE.MathUtils.lerp(0, -0.3, progress / 0.3),
          THREE.MathUtils.lerp(6, 5, progress / 0.3)
        );
      } else if (progress < 0.6) {
        const p = (progress - 0.3) / 0.3;
        targetPos.set(
          THREE.MathUtils.lerp(0.5, -0.3, p),
          THREE.MathUtils.lerp(-0.3, -0.8, p),
          THREE.MathUtils.lerp(5, 4.5, p)
        );
      } else {
        const p = (progress - 0.6) / 0.4;
        targetPos.set(
          THREE.MathUtils.lerp(-0.3, 0, p),
          THREE.MathUtils.lerp(-0.8, -1.2, p),
          THREE.MathUtils.lerp(4.5, 3.8, p)
        );
      }
    }

    cam.position.lerp(targetPos, 0.06);
    cam.lookAt(targetLook);
  };

  return { updateCamera };
}
