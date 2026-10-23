import { SIGNUP_URL, LOGIN_URL } from '../config.js';
import { useT } from '../i18n/LangContext.jsx';
import Globe from './Globe.jsx';
import HeroWords from './HeroWords.jsx';
export default function Hero() {
  const t = useT();

  return (
    <>
<header className="hero"><div className="wrap"><div><span className="pill">{t("✦ Your AI-powered UPSC companion")}</span><h1>{t("Crack UPSC with Your ")}<HeroWords /></h1><p className="lead">{t("Prepare with purpose. Practise with intelligence. Turn your UPSC ambitions into a structured, focused learning journey.")}</p><div className="feat">{t("AI Answer Evaluation · Smart PYQs · Daily Current Affairs · Study Planning")}</div><a className="btn" href={SIGNUP_URL}>{t("Start Preparing Free →")}</a><a className="btn o" href="#ai-tools">{t("Explore the AI Experience ◎")}</a><div className="tl">{t("Your preparation. Your strategy. Your AI.")}</div></div><div className="gwrap" id="gwrap"><Globe /><div className="fc a"><small className="k">{t("Study Overview")}</small><span className="bd">{t("DEMO DATA")}</span><div className="row1"><div className="ring">{t("68%")}</div><div><b>{t("Weekly Sprint")}</b><span>{t("5 of 7 modules covered")}</span></div></div><ul><li>{t("Fundamental Rights (Art 14–21)")}</li><li>{t("25 Sectional PYQs Completed")}</li></ul></div><div className="fc b"><small className="k" style={{color:"var(--or)"}}>{t("Daily Briefing")}</small><span className="bd">{t("DEMO")}</span><b>{t("Green Hydrogen Mission & SIGHT Scheme")}</b><i>{t("GS-III")}</i><span>{t("Economy & Climate")}</span></div><div className="fc c"><small className="k">{t("✦ Mains Evaluation")}</small><span className="bd">{t("104 / 120")}</span><b className="t">{t("GS-II: Basic Structure & Judicial Review")}</b><div className="mt"><span>{t("Structure & Flow")}</span><b>{t("92%")}</b></div><div className="tr"><i style={{width:"92%",background:"var(--or)"}} /></div><div className="mt"><span>{t("Syllabus Relevance")}</span><b>{t("88%")}</b></div><div className="tr"><i style={{width:"88%",background:"#b8893a"}} /></div><div className="mt"><span>{t("Clarity & Examples")}</span><b>{t("85%")}</b></div><div className="tr"><i style={{width:"85%",background:"#111"}} /></div></div></div></div></header>
    </>
  );
}
