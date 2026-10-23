import { useT } from '../i18n/LangContext.jsx';
import { useInView } from '../hooks.js';

const ITEMS = [
  ['How does the AI Mentor help in UPSC preparation?', 'It explains concepts, clears doubts and builds study plans in UPSC-standard language, in Hindi and English.'],
  ['Is there a free trial available?', 'Yes. You can start preparing for free with no credit card required.'],
  ['Are the current affairs updated daily?', 'Yes, with daily briefings plus weekly and monthly compilations and AI summaries.'],
  ['Can I attempt tests in Hindi?', 'Yes, all tests and content support both Hindi and English.'],
  ['Can I access the platform on mobile?', 'Yes, the platform works on phones, tablets and desktops.'],
];

export default function Faq() {
  const t = useT();
  const [ref, seen] = useInView(0.25);
  return (
    <section id="faq" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <h2>{t('Frequently Asked Questions')}</h2>
        <p className="sub">{t('Everything you need to know about UPSC ZONE AI')}</p>
        <div className="faq" ref={ref}>
          {ITEMS.map(([q, a], i) => (
            <details key={q} className={seen ? 'in' : ''} style={{ '--i': i }}>
              <summary>{t(q)}</summary>
              <p>{t(a)}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
