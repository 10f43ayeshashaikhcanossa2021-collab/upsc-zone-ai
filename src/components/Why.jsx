import { SIGNUP_URL, LOGIN_URL } from '../config.js';
import { useT } from '../i18n/LangContext.jsx';
import CompareTable from './CompareTable.jsx';
import Coverage from './Coverage.jsx';
import Bento from './Bento.jsx';
export default function Why() {
  const t = useT();

  return (
    <>
<section id="features" className="why"><div className="wrap"><span className="tag">{t("Why Us")}</span><h2>{t("Why UPSC ZONE AI over ChatGPT & Coaching?")}</h2><p className="sub">{t("An honest side-by-side. Where generic AI and classroom coaching fall short, we’re built to fill the gap.")}</p><div className="cmp-key" aria-hidden="true"><span className="y"><i>{t("✓")}</i>{t("Yes")}</span><span className="p"><i>{t("◐")}</i>{t("Partly")}</span><span className="n"><i>{t("✕")}</i>{t("No")}</span></div><CompareTable /><Coverage /><p className="note2">{t("General overview for illustration. Features and fees vary by coaching centre and plan.")}</p><div className="bn-head"><h3>{t("Built to keep you on track")}</h3><p>{t("Four more tools that turn daily practice into steady progress.")}</p></div><Bento /><div className="bn-cta"><a className="btn" href={SIGNUP_URL}>{t("Start preparing free")}</a></div></div></section>
    </>
  );
}
