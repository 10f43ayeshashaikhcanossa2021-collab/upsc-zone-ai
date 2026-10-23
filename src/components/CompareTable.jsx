import { useT } from '../i18n/LangContext.jsx';
import { ROWS } from '../data/compare.js';

const ICON = { yes: '✓', part: '◐', no: '✕' };
const SR = { yes: 'Yes: ', part: 'Partly: ', no: 'No: ' };

/** Comparison table. Icon-led on laptop; stacked cards on phones (handled in CSS). */
export default function CompareTable() {
  const t = useT();
  return (
    <div className="cmpw">
      <table className="cmp">
        <thead>
          <tr>
            <th scope="col">{t('What matters')}</th>
            <th scope="col">{t('ChatGPT / generic AI')}</th>
            <th scope="col">{t('Coaching centres')}</th>
            <th scope="col">{t('UPSC ZONE AI')}<span className="badge">{t('Best for UPSC')}</span></th>
          </tr>
        </thead>
        <tbody>
          {ROWS.map((r) => (
            <tr key={r.label}>
              <th scope="row">{t(r.label)}</th>
              {r.cells.map((c, i) => (
                <td key={i} data-s={c.s || undefined}>
                  {c.chip ? (
                    <span className={c.cls}>{t(c.chip)}</span>
                  ) : (
                    <div className={'cell s-' + c.s}>
                      <span className="si" aria-hidden="true">{ICON[c.s]}</span>
                      <span className="t"><span className="sr">{t(SR[c.s])}</span>{t(c.text)}</span>
                    </div>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
