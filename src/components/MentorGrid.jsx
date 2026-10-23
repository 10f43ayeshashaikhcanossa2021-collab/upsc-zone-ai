import { useEffect, useRef } from 'react';
import { useT } from '../i18n/LangContext.jsx';
import { MENTORS } from '../data/mentors.js';
import { prefersReducedMotion } from '../hooks.js';

function MentorCard({ m, index }) {
  const t = useT();
  const wrapRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    const w = wrapRef.current;
    if (prefersReducedMotion() || !('IntersectionObserver' in window)) { w.classList.add('in'); return; }
    w.style.transitionDelay = index * 110 + 'ms';
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.2 });
    io.observe(w);
    return () => io.disconnect();
  }, [index]);

  // subtle 3D tilt on devices that can hover
  const canTilt = () => !prefersReducedMotion() && matchMedia('(hover:hover)').matches;
  const onMove = (e) => {
    if (!canTilt()) return;
    const c = cardRef.current, r = c.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
    c.style.transform = `rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-6px)`;
  };
  const onLeave = () => { cardRef.current.style.transform = ''; };

  return (
    <div className="mcw" ref={wrapRef}>
      <a className="mc" ref={cardRef} href={m.href} style={{ '--b1': m.b1, '--b2': m.b2 }} onPointerMove={onMove} onPointerLeave={onLeave}>
        <div className="mc-top" data-n={m.n} />
        <div className="mc-rate"><b>{m.rate}</b><small>{t(m.per)}</small></div>
        <div className="mc-av"><img src={m.img} alt={m.alt} width="100" height="100" loading="lazy" /></div>
        <h3>{t(m.name)}</h3>
        <p className="mc-r">{t(m.role)}</p>
        <div className="mc-ch">{m.chips.map((c) => <span key={c}>{t(c)}</span>)}</div>
        <div className="mc-go">
          <span>{t('View profile')}</span>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
        </div>
      </a>
    </div>
  );
}

export default function MentorGrid() {
  return (
    <div className="mtg">
      {MENTORS.map((m, i) => <MentorCard key={m.href} m={m} index={i} />)}
    </div>
  );
}
