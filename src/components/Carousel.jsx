import { useCallback, useEffect, useRef, useState } from 'react';
import { useT } from '../i18n/LangContext.jsx';
import { prefersReducedMotion } from '../hooks.js';

const D = [
  ['Polity · GS-II', 'Basic Structure Doctrine: why it still shapes constitutional debates', 'GS-II'],
  ['Science & Tech · GS-III', 'India’s space programme: milestones every aspirant should track', 'GS-III'],
  ['International · GS-II', 'India–U.S. trade deal could put bilateral ties on a ‘better’ track: EAM Jaishankar', 'GS-II'],
  ['Environment · GS-III', 'Climate commitments and green finance: Prelims facts, Mains angles', 'GS-III'],
  ['Economy · GS-III', 'Inflation, repo rate and growth: the daily economy explainer', 'GS-III'],
];
const N = D.length, HALF = (N - 1) / 2;

/** 3D coverflow carousel of daily briefings. */
export default function Carousel() {
  const t = useT();
  const [a, setA] = useState(0);
  const [vw, setVw] = useState(() => window.innerWidth);
  const paused = useRef(false);
  const moved = useRef(false);
  const drag = useRef(false);
  const sx = useRef(0);
  const timer = useRef(null);
  const boxRef = useRef(null);
  const stageRef = useRef(null);

  const restart = useCallback(() => {
    clearInterval(timer.current);
    if (!prefersReducedMotion()) timer.current = setInterval(() => { if (!paused.current) setA((x) => (x + 1) % N); }, 4500);
  }, []);
  const go = useCallback((i, user) => { setA(((i % N) + N) % N); if (user) restart(); }, [restart]);

  useEffect(() => {
    restart();
    const onResize = () => setVw(window.innerWidth);
    const onUp = (e) => {
      if (!drag.current) return;
      drag.current = false;
      const dx = e.clientX - sx.current;
      if (Math.abs(dx) > 45) {
        moved.current = true;
        setA((x) => (((x + (dx < 0 ? 1 : -1)) % N) + N) % N);
        restart();
        setTimeout(() => { moved.current = false; }, 60);
      }
    };
    window.addEventListener('resize', onResize);
    window.addEventListener('pointerup', onUp);
    const io = new IntersectionObserver((e) => { paused.current = !e[0].isIntersecting; });
    io.observe(boxRef.current);
    return () => { clearInterval(timer.current); window.removeEventListener('resize', onResize); window.removeEventListener('pointerup', onUp); io.disconnect(); };
  }, [restart]);

  const onKey = (e) => {
    if (e.key === 'ArrowLeft') go(a - 1, true);
    if (e.key === 'ArrowRight') go(a + 1, true);
  };

  const onMove = (e) => {
    if (drag.current) return;
    const c = stageRef.current?.querySelector('.nc-card.on .nc-in');
    if (!c) return;
    const r = c.getBoundingClientRect();
    c.style.setProperty('--ry', ((e.clientX - r.left) / r.width - 0.5) * 10 + 'deg');
    c.style.setProperty('--rx', -((e.clientY - r.top) / r.height - 0.5) * 8 + 'deg');
  };
  const onLeave = () => {
    const c = stageRef.current?.querySelector('.nc-card.on .nc-in');
    if (c) { c.style.setProperty('--ry', '0deg'); c.style.setProperty('--rx', '0deg'); }
  };

  const w = Math.min(340, vw * 0.74);

  return (
    <div className="nc-stage" ref={boxRef} role="region" aria-roledescription="carousel" aria-label="Current affairs stories"
      onKeyDown={onKey} onPointerEnter={() => { paused.current = true; }} onPointerLeave={() => { paused.current = false; }}>
      <div className="nc-head">
        <div>
          <span className="chip">{t('Current Affairs')}</span>
          <h3>{t('Top Stories')}</h3>
          <p>{t('Swipe or use the arrows to explore the latest briefings.')}</p>
        </div>
        <div className="nc-nav">
          <button type="button" aria-label="Previous story" onClick={() => go(a - 1, true)}>←</button>
          <button type="button" aria-label="Next story" onClick={() => go(a + 1, true)}>→</button>
        </div>
      </div>
      <div className="nc-view" ref={stageRef}
        onPointerDown={(e) => { drag.current = true; moved.current = false; sx.current = e.clientX; }}
        onPointerMove={onMove} onPointerLeave={onLeave}>
        {D.map((d, i) => {
          const o = ((i - a + HALF + N) % N) - HALF;
          const ab = Math.abs(o);
          return (
            <article key={i} className={'nc-card' + (o === 0 ? ' on' : '')} aria-roledescription="slide" aria-label={`${i + 1} of ${N}`}
              aria-hidden={o !== 0}
              style={{
                transform: `translateX(${o * w * 0.7}px) translateZ(${-ab * 150}px) rotateY(${-o * 30}deg) scale(${1 - ab * 0.07})`,
                opacity: ab > 1.5 ? 0 : 1, pointerEvents: ab > 1.5 ? 'none' : 'auto', zIndex: 10 - ab,
              }}
              onClick={() => { if (i !== a && !moved.current) go(i, true); }}>
              <div className="nc-in">
                <div className="nc-body">
                  <span className="nc-cat">{t(d[0])}</span>
                  <h4>{t(d[1])}</h4>
                  <small><span>{t('Daily briefing')}</span><b>{t(d[2])} →</b></small>
                </div>
              </div>
            </article>
          );
        })}
      </div>
      <div className="nc-dots">
        {D.map((_, i) => (
          <button key={i} type="button" aria-label={'Go to story ' + (i + 1)} aria-current={i === a} onClick={() => go(i, true)} />
        ))}
      </div>
    </div>
  );
}
