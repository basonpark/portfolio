import { useEffect } from 'react';
import Lenis from 'lenis';

export function useSmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 2, // Adjust duration for scroll 'weight'
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Easing function
      smoothWheel: true,
      touchMultiplier: 2, 
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Cleanup function to destroy Lenis instance on unmount
    return () => {
      lenis.destroy();
    };
  }, []); // Empty dependency array ensures this runs only once
}
