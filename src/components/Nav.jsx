import { useEffect, useRef, useState } from 'react';
import { useLang } from '../i18n/LangContext.jsx';
import { SIGNUP_URL, LOGIN_URL } from '../config.js';
import { LogoMark } from './Logo.jsx';

const LINKS = [
  ['Features', '#features'],
  ['AI Tools', '#ai-tools'],
  ['Pricing', 'https://upsczone.in/pricing'],
  ['Team', 'https://upsczone.in/team'],
  ['Mentors', 'https://upsczone.in/mentors'],
  ['Success Stories', '#success-stories'],
];

export default function Nav() {
  const { lang, setLang, t } = useLang();
  const [menu, setMenu] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef(null);
  const btnRef = useRef(null);

  useEffect(() => {
    const onDoc = (e) => { if (langRef.current && !langRef.current.contains(e.target)) setLangOpen(false); };
    const onKey = (e) => { if (e.key === 'Escape') setLangOpen(false); };
    document.addEventListener('click', onDoc);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('click', onDoc); document.removeEventListener('keydown', onKey); };
  }, []);

  const pick = (l) => { setLang(l); setLangOpen(false); btnRef.current?.focus(); };

  return (
    <nav className="nav" id="top">
      <div className="wrap nv">
        <a className="logo" href="#top" aria-label="UPSC ZONE AI home">
          <LogoMark />
          <span className="lt">{t('UPSC ZONE ')}<b>AI</b></span>
        </a>
        <div className={'links' + (menu ? ' open' : '')} id="links">
          {LINKS.map(([label, href]) => (
            <a key={label} href={href} onClick={() => setMenu(false)}>{t(label)}</a>
          ))}
        </div>
        <div className="nr">
          <div className="lang" ref={langRef}>
            <button ref={btnRef} className="lb" aria-haspopup="listbox" aria-expanded={langOpen} aria-label="Language"
              onClick={(e) => { e.stopPropagation(); setLangOpen((o) => !o); }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3 3.2 3 14.8 0 18M12 3c-3 3.2-3 14.8 0 18" />
              </svg>
              <span>{lang === 'hi' ? 'हिन्दी' : 'English'}</span>
              <svg className="cv" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
            <ul className={'lm' + (langOpen ? ' open' : '')} role="listbox">
              <li role="option" aria-selected={lang === 'en'} onClick={() => pick('en')}>English</li>
              <li role="option" aria-selected={lang === 'hi'} onClick={() => pick('hi')}>हिन्दी</li>
            </ul>
          </div>
          <a className="lgin" href={LOGIN_URL}>{t('Login')}</a>
          <a className="gs" href={SIGNUP_URL}>{t('Get Started Free')}</a>
          <button className="hb" aria-label="Menu" aria-expanded={menu} onClick={() => setMenu((m) => !m)}>☰</button>
        </div>
      </div>
    </nav>
  );
}
