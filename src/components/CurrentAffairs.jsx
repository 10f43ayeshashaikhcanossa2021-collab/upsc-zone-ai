import { useT } from '../i18n/LangContext.jsx';
import Carousel from './Carousel.jsx';
export default function CurrentAffairs() {
  const t = useT();

  return (
    <>
<section id="current-affairs" className="nc-sec"><div className="wrap"><span className="tag">{t("Current Affairs")}</span><h2>{t("Today’s Top Stories, Mapped to the Syllabus")}</h2><p className="sub">{t("Swipe through daily briefings that connect the news to GS papers and Prelims–Mains angles.")}</p><Carousel /><p className="nc-note">{t("Sample briefings shown. ")}<a href="https://upsczone.in" target="_blank" rel="noopener">{t("Read the full daily current affairs →")}</a></p></div></section>
    </>
  );
}
