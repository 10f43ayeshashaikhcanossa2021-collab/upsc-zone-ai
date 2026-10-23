import { useT } from '../i18n/LangContext.jsx';
import TourMap from './TourMap.jsx';
export default function Community() {
  const t = useT();

  return (
    <>
<section className="map2" id="map"><div className="wrap"><span className="tag">{t("Our Community")}</span><h2>{t("Students from Across the Country")}</h2><p className="sub">{t("Drag the map to rotate it. Click any pin or story card to explore.")}</p><div className="statbar"><div><b>{t("8")}<sup>{t("+")}</sup></b><span>{t("AI Practice Tools")}</span><small>{t("Curated for Civil Services prep")}</small></div><div><b>{t("2")}<sup>{t("+")}</sup></b><span>{t("Bilingual Mediums")}</span><small>{t("Seamless English + हिन्दी support")}</small></div><div><b>{t("Daily")}</b><span>{t("Syllabus Briefings")}</span><small>{t("Mapped to GS I–IV micro-topics")}</small></div><div><b>{t("3")}<sup>{t("+")}</sup></b><span>{t("Examination Stages")}</span><small>{t("Prelims, Mains & Personality Test")}</small></div></div><TourMap /></div></section>
    </>
  );
}
