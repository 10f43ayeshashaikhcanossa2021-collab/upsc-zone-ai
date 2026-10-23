import { useEffect } from 'react';

/* Pauses CSS animations of any section that is not on screen (marquees, orbits, pulses...),
   so only what the visitor can see is animated. Keeps scrolling and the hero headline smooth. */
export default function useOffscreenPause() {
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.target.classList.toggle('anim-off', !e.isIntersecting)),
      { rootMargin: '120px 0px' }
    );
    const els = document.querySelectorAll('header.hero, section, .tk, .backed, footer');
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}
