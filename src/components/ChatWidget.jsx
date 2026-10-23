import { useEffect, useRef, useState } from 'react';
import { useLang } from '../i18n/LangContext.jsx';
import { KB, FALL, CH, UI } from '../data/chat.js';

/** Floating help chat: keyword-matched answers, English + Hindi. */
export default function ChatWidget() {
  const { lang, t } = useLang();
  const L = lang === 'hi' ? 'hi' : 'en';
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState([]);
  const [typing, setTyping] = useState(false);
  const [text, setText] = useState('');
  const greeted = useRef(false);
  const listRef = useRef(null);
  const inputRef = useRef(null);
  const btnRef = useRef(null);
  const timers = useRef([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  useEffect(() => { if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight; }, [msgs, typing, open]);
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const add = (m) => setMsgs((x) => [...x, m]);

  const toggle = (o) => {
    setOpen(o);
    if (o) {
      if (!greeted.current) { greeted.current = true; add({ who: 'b', text: UI[L].hi0 }); }
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  };

  const reply = (entry) => {
    setTyping(true);
    const id = setTimeout(() => {
      setTyping(false);
      add(entry ? { who: 'b', text: entry[L], link: entry.link } : { who: 'b', text: FALL[L] });
    }, 650);
    timers.current.push(id);
  };

  const ask = (v) => { add({ who: 'u', text: v }); reply(KB.find((k) => k.r.test(v))); };

  const submit = (e) => {
    e.preventDefault();
    const v = text.trim();
    if (!v) return;
    setText(''); ask(v);
  };

  return (
    <>
      <button className="cb" aria-label={UI[L].open} aria-expanded={open} aria-controls="cp" ref={btnRef} onClick={() => toggle(!open)}>
        <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12Z" />
        </svg>
      </button>
      <section className="cp" id="cp" role="dialog" aria-label="Help & Support" hidden={!open}>
        <header>
          <div><b>{t('Help & Support')}</b><small>{t('AI assistant · replies instantly')}</small></div>
          <button aria-label="Close chat" onClick={() => { toggle(false); btnRef.current?.focus(); }}>✕</button>
        </header>
        <div className="cm" ref={listRef} aria-live="polite">
          {msgs.map((m, i) => (
            <div key={i} className={'mg ' + m.who}>
              {m.text}
              {m.link && (<><br /><a href={m.link[0]} target="_blank" rel="noopener noreferrer">{m.link[L === 'hi' ? 2 : 1]} →</a></>)}
            </div>
          ))}
          {typing && <div className="mg b t"><i /><i /><i /></div>}
        </div>
        <div className="cc">
          {CH.map((c) => (
            <button key={c[0]} type="button" onClick={() => { add({ who: 'u', text: c[L === 'hi' ? 2 : 1] }); reply(KB.find((k) => k.id === c[0])); }}>
              {c[L === 'hi' ? 2 : 1]}
            </button>
          ))}
        </div>
        <form className="cf" onSubmit={submit}>
          <input ref={inputRef} value={text} onChange={(e) => setText(e.target.value)} autoComplete="off" maxLength={200} placeholder={UI[L].ph} />
          <button aria-label="Send" type="submit">
            <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-11 11M22 2l-7 20-4-9-9-4 20-7Z" /></svg>
          </button>
        </form>
      </section>
    </>
  );
}
