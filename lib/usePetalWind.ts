import { useRef, useEffect } from "react";

export function usePetalWind() {
  const windForce = useRef({ x: 0, y: 0 });

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const gustLoop = () => {
      const interval = 8000 + Math.random() * 7000;
      timeout = setTimeout(() => {
        windForce.current.x += 0.8 + Math.random() * 0.4;
        gustLoop();
      }, interval);
    };

    gustLoop();
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const cb = (e: MouseEvent) => {
      const delta = e.movementX;
      windForce.current.x += delta * 0.003;
      windForce.current.x = Math.max(-0.4, Math.min(0.4, windForce.current.x));
    };
    window.addEventListener("mousemove", cb);
    return () => window.removeEventListener("mousemove", cb);
  }, []);

  const updateWind = () => {
    windForce.current.x *= 0.94;
    if (Math.abs(windForce.current.x) < 0.001) windForce.current.x = 0;
    return windForce.current;
  };

  return { windForce, updateWind };
}
