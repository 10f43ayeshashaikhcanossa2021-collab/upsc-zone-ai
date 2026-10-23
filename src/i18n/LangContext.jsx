import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import HI from './hi.js';

const LangContext = createContext({ lang: 'en', setLang: () => {}, t: (s) => s });
const ORIG_TITLE = 'UPSC ZONE AI - Treat Education as a Hobby';

function translate(text) {
  const key = text.replace(/\s+/g, ' ').trim();
  if (!key) return text;
  let hi = HI[key];
  if (!hi) {
    const m = /^UPSC CSE (\d{4})$/.exec(key);
    if (m) hi = 'UPSC सीएसई ' + m[1];
  }
  if (!hi) return text;
  return text.match(/^\s*/)[0] + hi + text.match(/\s*$/)[0];
}

export function LangProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    try { return localStorage.getItem('uz_lang') === 'hi' ? 'hi' : 'en'; } catch { return 'en'; }
  });

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = lang === 'hi' ? HI[ORIG_TITLE] || ORIG_TITLE : ORIG_TITLE;
  }, [lang]);

  const setLang = useCallback((l) => {
    setLangState(l);
    try { localStorage.setItem('uz_lang', l); } catch { /* ignore */ }
  }, []);

  const t = useCallback((s) => (lang === 'hi' ? translate(s) : s), [lang]);
  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t]);
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext);
export const useT = () => useContext(LangContext).t;
