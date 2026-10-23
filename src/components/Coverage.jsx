import { useT } from '../i18n/LangContext.jsx';
import { useInView } from '../hooks.js';
import { ROWS } from '../data/compare.js';

const VAL = { yes: 1, part: 0.5, no: 0 };
const NAMES = ['ChatGPT / generic AI', 'Coaching centres', 'UPSC ZONE AI'];

// Coverage % per column, from the rows that carry a yes/partly/no status.
function coverage() {
  const tot = [0, 0, 0];
  let n = 0;
  ROWS.forEach((r) => {
    if (r.cells.length === 3 && r.cells.every((c) => c.s in VAL)) {
      n++;
      r.cells.forEach((c, i) => { tot[i] += VAL[c.s]; });
    }
  });
  return tot.map((v) => Math.round((v / n) * 100));
}
const PC = coverage();

export default function Coverage() {
  const t = useT();
  const [ref, seen] = useInView(0.35);
  return (
    <div className="cov" id="cov" ref={ref}>
      <h3>{t('Feature coverage across the 7 areas above')}</h3>
      {NAMES.map((n, i) => (
        <div key={n} className={'cv' + (i === 2 ? ' us' : '')}>
          <span className="cl">{t(n)}</span>
          <div className="bar"><i style={{ width: seen ? PC[i] + '%' : 0 }} /></div>
          <b className="pc">{seen ? PC[i] : 0}%</b>
        </div>
      ))}
    </div>
  );
}
