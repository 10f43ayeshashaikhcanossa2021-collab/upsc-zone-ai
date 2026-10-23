import { useEffect, useState } from 'react';
import { useLang } from '../i18n/LangContext.jsx';
import { prefersReducedMotion } from '../hooks.js';

/* Rotating last word of the hero headline: "Ultimate AI  Partner → Mentor → Evaluator → Planner".
   Edit the words here; keep 3–5 short words so the line never wraps. */
const WORDS = {
  en: { pre: 'Ultimate AI', words: ['Partner', 'Mentor', 'Evaluator', 'Planner'], post: '' },
  hi: { pre: 'अल्टीमेट AI', words: ['पार्टनर', 'मेंटर', 'कोच', 'प्लानर'], post: 'के साथ' },
};
const INTERVAL = 2400; // ms each word stays

export default function HeroWords() {
  const { lang } = useLang();
  const { pre, words, post } = WORDS[lang] || WORDS.en;
  const [s, setS] = useState({ cur: 0, prev: -1, ticks: 0 });

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const id = setInterval(
      () => setS((x) => ({ cur: (x.cur + 1) % words.length, prev: x.cur, ticks: x.ticks + 1 })),
      INTERVAL
    );
    return () => clearInterval(id);
  }, [words.length]);

  return (
    <em>
      <span className="rw-pre g">{pre}</span>
      <span className="rw-line">
        <span className="rw" aria-live="off">
          {words.map((w, i) => (
            <span
              key={w}
              className={'rw-w g' + (i === s.cur ? ' on' + (s.ticks ? ' in' : '') : '') + (i === s.prev ? ' out' : '')}
              aria-hidden={i !== s.cur}
            >
              {w}
            </span>
          ))}
        </span>
        {post && <span className="rw-post g">{post}</span>}
      </span>
    </em>
  );
}
