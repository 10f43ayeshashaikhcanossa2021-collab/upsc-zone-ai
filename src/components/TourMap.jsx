import { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { useT } from '../i18n/LangContext.jsx';
import { prefersReducedMotion } from '../hooks.js';
import { PINS, STORIES } from '../data/community.js';
import { STATES } from '../data/states.js';

const K = 0.56, CX = 82, CY = 22, D = 0.4;
const P = (lo, la) => [(lo - CX) * K, (la - CY) * K];
const lum = (h) => { const n = parseInt(h.slice(1), 16); return (0.299 * (n >> 16) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) / 255; };
const LABELS = STATES.filter((s) => s.l);

/** Interactive 3D map of India with story cards linked to city pins by "wires". */
export default function TourMap() {
  const t = useT();
  const [active, setActive] = useState(4);
  const [tourOn, setTourOn] = useState(() => !prefersReducedMotion());
  const [restartKey, setRestartKey] = useState(0);
  const [noGL, setNoGL] = useState(false);

  const tourRef = useRef(null);
  const boxRef = useRef(null);
  const cvRef = useRef(null);
  const wiresRef = useRef(null);
  const pinRefs = useRef({});
  const labelRefs = useRef([]);
  const cardRefs = useRef([]);
  const pathRefs = useRef([]);
  const actRef = useRef(null);
  const activeRef = useRef(active);
  activeRef.current = active;

  const select = useCallback((i, user) => {
    setActive(i);
    if (user) setRestartKey((k) => k + 1);
  }, []);

  // auto-advancing tour
  useEffect(() => {
    if (!tourOn) return;
    const id = setInterval(() => setActive((a) => (a + 1) % STORIES.length), 3800);
    return () => clearInterval(id);
  }, [tourOn, restartKey]);

  // 3D scene
  useEffect(() => {
    const box = boxRef.current, cv = cvRef.current, tour = tourRef.current, wires = wiresRef.current;
    let renderer;
    try { renderer = new THREE.WebGLRenderer({ canvas: cv, antialias: true, alpha: true }); } catch { setNoGL(true); return; }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    const scene = new THREE.Scene();
    const cam = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    scene.add(new THREE.AmbientLight(0xffffff, 0.8));
    const dl = new THREE.DirectionalLight(0xffffff, 0.7); dl.position.set(-6, 10, 16); scene.add(dl);
    const root = new THREE.Group(); scene.add(root);

    // one coloured, extruded tile per state + outline
    STATES.forEach((s) => {
      const top = new THREE.MeshBasicMaterial({ color: new THREE.Color(s.k) });
      const side = new THREE.MeshLambertMaterial({ color: new THREE.Color(s.k).multiplyScalar(0.62) });
      const line = new THREE.LineBasicMaterial({ color: 0x1b1410 });
      s.p.forEach((rings) => {
        const pts = (r) => r.map((c) => new THREE.Vector2(...P(c[0], c[1])));
        const sh = new THREE.Shape(pts(rings[0]));
        for (let i = 1; i < rings.length; i++) sh.holes.push(new THREE.Path(pts(rings[i])));
        root.add(new THREE.Mesh(new THREE.ExtrudeGeometry(sh, { depth: D, bevelEnabled: false }), [top, side]));
        const ln = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.ShapeGeometry(sh)), line);
        ln.position.z = D + 0.004; root.add(ln);
      });
    });
    // soft ground shadow
    const cn = document.createElement('canvas'); cn.width = cn.height = 128;
    const cx = cn.getContext('2d'), g = cx.createRadialGradient(64, 64, 6, 64, 64, 64);
    g.addColorStop(0, 'rgba(70,90,140,.38)'); g.addColorStop(1, 'rgba(70,90,140,0)');
    cx.fillStyle = g; cx.fillRect(0, 0, 128, 128);
    const sh = new THREE.Mesh(new THREE.PlaneGeometry(20, 22), new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(cn), transparent: true, depthWrite: false }));
    sh.position.set(0.6, -0.6, -1.1); root.add(sh);

    const BP = -0.5; root.rotation.x = BP;
    let yaw = 0, pitch = BP, drag = false, lx = 0, ly = 0, raf, vis = true;
    const down = (e) => { drag = true; lx = e.clientX; ly = e.clientY; cv.setPointerCapture(e.pointerId); };
    const up = () => { drag = false; };
    const move = (e) => {
      if (!drag) return;
      yaw = Math.max(-0.6, Math.min(0.6, yaw + (e.clientX - lx) * 0.006));
      pitch = Math.max(-0.95, Math.min(-0.15, pitch + (e.clientY - ly) * 0.005));
      lx = e.clientX; ly = e.clientY;
    };
    cv.addEventListener('pointerdown', down); cv.addEventListener('pointerup', up); cv.addEventListener('pointermove', move);

    const size = () => {
      const w = box.clientWidth, h = box.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false); cam.aspect = w / h; cam.position.z = w < 700 ? 27 : 28; cam.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(size); ro.observe(box); size();
    const io = new IntersectionObserver((e) => { vis = e[0].isIntersecting; }); io.observe(tour);

    const v = new THREE.Vector3();
    const loop = (now) => {
      raf = requestAnimationFrame(loop);
      if (!vis) return;
      const tt = now / 1000;
      root.rotation.z += ((drag ? yaw : Math.sin(tt * 0.4) * 0.1) - root.rotation.z) * 0.08;
      root.rotation.x += (pitch - root.rotation.x) * 0.08;
      root.updateMatrixWorld(true);
      const w = box.clientWidth, h = box.clientHeight;
      PINS.forEach((p) => {
        const [x, y] = P(p[2], p[3]); v.set(x, y, D + 0.06); root.localToWorld(v); v.project(cam);
        const e = pinRefs.current[p[0]];
        if (e) { e.style.left = (v.x * 0.5 + 0.5) * w + 'px'; e.style.top = (-v.y * 0.5 + 0.5) * h + 'px'; }
      });
      LABELS.forEach((s, i) => {
        const e = labelRefs.current[i]; if (!e) return;
        const [x, y] = P(s.l[1], s.l[2]); v.set(x, y, D + 0.02); root.localToWorld(v); v.project(cam);
        e.style.left = (v.x * 0.5 + 0.5) * w + 'px'; e.style.top = (-v.y * 0.5 + 0.5) * h + 'px';
      });
      if (getComputedStyle(wires).display !== 'none') {
        const T = tour.getBoundingClientRect();
        const c = (r) => [r.left + r.width / 2 - T.left, r.top + r.height / 2 - T.top];
        STORIES.forEach((s, i) => {
          const card = cardRefs.current[i], pin = pinRefs.current[s[0]];
          if (!card || !pin) return;
          const [x1, y1] = c(card.querySelector('.dot').getBoundingClientRect()), [x2, y2] = c(pin.getBoundingClientRect());
          const dx = x2 - x1, d = `M${x1},${y1} C${x1 + dx * 0.5},${y1 + 40} ${x2 - dx * 0.4},${y2 + 60} ${x2},${y2}`;
          pathRefs.current[i]?.setAttribute('d', d);
          if (i === activeRef.current) actRef.current?.setAttribute('d', d);
        });
      }
      renderer.render(scene, cam);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf); ro.disconnect(); io.disconnect();
      cv.removeEventListener('pointerdown', down); cv.removeEventListener('pointerup', up); cv.removeEventListener('pointermove', move);
      scene.traverse((o) => { o.geometry?.dispose?.(); if (o.material) [].concat(o.material).forEach((m) => { m.map?.dispose?.(); m.dispose(); }); });
      renderer.dispose();
    };
  }, []);

  const cardsFor = (col) => STORIES.map((s, i) => [s, i]).filter(([s]) => s[5] === col).map(([s, i]) => (
    <div key={i} className={'sc' + (i === active ? ' on' : '')} data-i={i} ref={(el) => { cardRefs.current[i] = el; }} onClick={() => select(i, true)}>
      <span className="tack" /><span className="dot" />
      <div className="hd">
        <div className="av2">{s[2]}</div>
        <div><b>{s[1]}</b><small>{t(PINS.find((p) => p[0] === s[0])[1])}</small></div>
        <span className="demo">{t('Demo')}</span>
      </div>
      <span className="tg">{t(s[3])}</span>
      <p>{t('“' + s[4] + '”')}</p>
      <div className="ft"><span>{t('Sample story')}</span><a href="#" onClick={(e) => e.preventDefault()}>{t('View Hub →')}</a></div>
    </div>
  ));

  return (
    <div className="tour" id="tour" ref={tourRef}>
      <div className="mapbox" id="mapbox" ref={boxRef}>
        <canvas id="cv" ref={cvRef} />
        <div className="nogl" id="nogl" style={noGL ? { display: 'grid' } : undefined}>{t('WebGL is unavailable, so the 3D map cannot load.')}</div>
        {LABELS.map((s, i) => (
          <span key={s.n} className={'sl' + (s.l[3] ? ' sm' : '')} ref={(el) => { labelRefs.current[i] = el; }}
            style={lum(s.k) < 0.5 ? { color: '#fff' } : undefined}>{s.l[0]}</span>
        ))}
        {PINS.map((p) => {
          const i = STORIES.findIndex((s) => s[0] === p[0]);
          return (
            <div key={p[0]} className={'pin' + (i === active ? ' on' : '')} ref={(el) => { pinRefs.current[p[0]] = el; }}
              style={{ background: p[4], color: p[5], '--bg': p[4] }}
              onClick={() => { if (i >= 0) select(i, true); }}>
              {p[0]}<span className="nm">{t(p[1])}</span>
            </div>
          );
        })}
      </div>
      <svg id="wires" ref={wiresRef}>
        {STORIES.map((_, i) => (
          <path key={i} ref={(el) => { pathRefs.current[i] = el; }} fill="none" stroke="#d8c49a" strokeWidth="1.3" strokeDasharray="4 5" />
        ))}
        <path ref={actRef} fill="none" stroke="#ff6a13" strokeWidth="2.2" />
      </svg>
      <div className="col l" id="colL">{cardsFor('l')}</div>
      <div className="col r" id="colR">{cardsFor('r')}</div>
      <div className="pill2">
        <button id="tbtn" aria-label="Pause or resume tour" onClick={() => { setTourOn((o) => !o); setRestartKey((k) => k + 1); }}>{tourOn ? '⏸' : '▶'}</button>
        <span id="tlbl">{t(tourOn ? 'Tour active' : 'Tour paused')}</span>
        <span>·</span>
        <span>{t('Click any pin or card for details')}</span>
      </div>
    </div>
  );
}
