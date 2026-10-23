import { useT } from '../i18n/LangContext.jsx';

const NAMES = ['NVIDIA Inception', 'AWS Startups', 'Google for Startups', 'Sarvam AI', 'Carta'];
const REPEAT = 6;

export default function Backed() {
  const t = useT();
  const all = Array.from({ length: REPEAT }, () => NAMES).flat();
  return (
    <div className="backed">
      <div className="wrap">
        <div className="lbl">{t('Backed by')}</div>
        <div className="mq">
          <div className="mq-track">
            {all.map((n, i) => <span key={i}>{n}</span>)}
          </div>
        </div>
      </div>
    </div>
  );
}
