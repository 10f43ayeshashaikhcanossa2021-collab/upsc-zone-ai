import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import earthUrl from '../assets/earth.jpg';
import { prefersReducedMotion } from '../hooks.js';

/** Rotating Earth with orbit rings and particles (Three.js). Sizes itself to its parent (.gwrap). */
export default function Globe() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const cv = canvasRef.current;
    const wrap = cv.parentElement;
    let r;
    try { r = new THREE.WebGLRenderer({ canvas: cv, antialias: true, alpha: true }); } catch { return; }
    r.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    const sc = new THREE.Scene();
    const cam = new THREE.PerspectiveCamera(36, 1, 0.1, 100);
    cam.position.z = 9;
    sc.add(new THREE.AmbientLight(0xffffff, 0.95));
    const d = new THREE.DirectionalLight(0xffffff, 1.05); d.position.set(-4, 5, 6); sc.add(d);
    const p1 = new THREE.PointLight(0xffb070, 1.2, 30); p1.position.set(4, -3, 5); sc.add(p1);
    const g = new THREE.Group(); sc.add(g);

    const eg = new THREE.Group(); eg.rotation.set(0.28, 0, 0.36); g.add(eg);
    const tex = new THREE.TextureLoader().load(earthUrl);
    if (tex.anisotropy !== undefined) tex.anisotropy = 8;
    const earth = new THREE.Mesh(
      new THREE.SphereGeometry(1.7, 64, 64),
      new THREE.MeshPhongMaterial({ map: tex, color: 0xffffff, specular: 0x223344, shininess: 14 })
    );
    eg.add(earth);
    const OFF = -5.18; // faces India (78°E) toward the viewer at start
    const T0 = performance.now();

    const ringO = new THREE.Mesh(new THREE.TorusGeometry(2.55, 0.035, 16, 160), new THREE.MeshBasicMaterial({ color: 0xff8a2b }));
    ringO.rotation.set(1.25, 0.25, 0.5); sc.add(ringO);
    const ringG = new THREE.Mesh(new THREE.TorusGeometry(2.4, 0.018, 12, 160), new THREE.MeshBasicMaterial({ color: 0xe3b45f }));
    ringG.rotation.set(0.1, 1.3, 0); sc.add(ringG);

    const n = 90, pos = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      const a = Math.random() * 6.283, b = Math.acos(2 * Math.random() - 1), R = 3 + Math.random() * 2.2;
      pos.set([R * Math.sin(b) * Math.cos(a), R * Math.cos(b), R * Math.sin(b) * Math.sin(a)], i * 3);
    }
    const pg = new THREE.BufferGeometry();
    pg.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const pts = new THREE.Points(pg, new THREE.PointsMaterial({ color: 0xcdbfa6, size: 0.06, transparent: true, opacity: 0.8 }));
    sc.add(pts);

    const size = () => {
      const w = wrap.clientWidth, h = wrap.clientHeight;
      if (!w || !h) return;
      r.setSize(w, h, false); cam.aspect = w / h; cam.position.z = w < 600 ? 11 : 9; cam.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(size); ro.observe(wrap); size();

    let mx = 0, my = 0, vis = true, raf;
    const onMove = (e) => { mx = e.clientX / window.innerWidth - 0.5; my = e.clientY / window.innerHeight - 0.5; };
    window.addEventListener('pointermove', onMove);
    const io = new IntersectionObserver((e) => { vis = e[0].isIntersecting; }); io.observe(wrap);
    const slow = prefersReducedMotion() ? 0.2 : 1;

    const loop = (now) => {
      raf = requestAnimationFrame(loop);
      if (!vis || document.hidden) return;
      const t = (now / 1000) * slow;
      earth.rotation.y = OFF + ((now - T0) / 1000) * 0.22 * slow;
      ringO.rotation.z = 0.5 + t * 0.12; ringG.rotation.x = 0.1 + t * 0.09; pts.rotation.y = -t * 0.03;
      g.rotation.y += (mx * 0.8 - g.rotation.y) * 0.05; g.rotation.x += (my * 0.5 - g.rotation.x) * 0.05;
      g.position.y = Math.sin(t * 0.8) * 0.08;
      r.render(sc, cam);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf); ro.disconnect(); io.disconnect();
      window.removeEventListener('pointermove', onMove);
      sc.traverse((o) => { o.geometry?.dispose?.(); o.material?.dispose?.(); });
      tex.dispose(); r.dispose();
    };
  }, []);

  return <canvas id="globe" ref={canvasRef} />;
}
