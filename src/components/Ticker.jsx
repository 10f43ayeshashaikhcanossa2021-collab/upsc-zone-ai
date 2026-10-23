import { useEffect, useState } from 'react';
import { useT } from '../i18n/LangContext.jsx';
import { ALERTS } from '../data/ticker.js';

/* Live alerts: edit src/data/ticker.js, or set a JSON feed URL below.
   Feed format: [{"tag":"NEW","text":"Headline — detail","url":"https://..."}] */
const FEED_URL = '';

export default function Ticker() {
  const t = useT();
  const [items, setItems] = useState(ALERTS);

  useEffect(() => {
    if (!FEED_URL) return;
    const load = () =>
      fetch(FEED_URL, { cache: 'no-store' }).then((r) => r.json()).then((list) => {
        if (Array.isArray(list) && list.length) setItems(list);
      }).catch(() => {});
    load();
    const id = setInterval(load, 300000);
    return () => clearInterval(id);
  }, []);

  const row = (k) => items.map((a, i) => (
    <span key={k + i} style={{ display: 'contents' }}>
      <a className="ti" href={a.url || '#'} target="_blank" rel="noopener noreferrer">
        <b>{a.tag || 'NEW'}</b><span>{t(a.text || '')}</span>
      </a>
      <i className="sp" aria-hidden="true" />
    </span>
  ));

  return (
    <div className="tk" role="region" aria-label="Live alerts">
      <div className="tl"><i /><span>{t('LIVE')}</span></div>
      <div className="tm"><div className="tt">{row('a')}{row('b')}</div></div>
    </div>
  );
}
