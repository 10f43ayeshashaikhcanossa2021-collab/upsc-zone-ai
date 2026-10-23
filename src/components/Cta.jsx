import { SIGNUP_URL, LOGIN_URL } from '../config.js';
import { useT } from '../i18n/LangContext.jsx';

export default function Cta() {
  const t = useT();

  return (
    <>
<section className="cta2"><div className="wrap"><div className="ctab"><div className="ctl"><span className="cpill">{t("✦ Free to start")}</span><h2>{t("Unlock Your AI Mentor Today!")}</h2><p>{t("Start your UPSC journey with India’s most advanced AI platform. No credit card required.")}</p><div className="ctas"><a className="cbig" href={SIGNUP_URL}>{t("🚀 Start Preparing Free Now")}</a><a className="cghost" href="#ai-tools">{t("Explore AI tools →")}</a></div><ul className="ctr"><li>{t("No credit card")}</li><li>{t("Hindi + English")}</li><li>{t("24×7 AI mentor")}</li></ul></div><div className="orb" aria-hidden="true"><div className="rg r1" /><div className="rg r2" /><div className="rg r3" /><div className="core" /><div className="orbit o1" style={{"--d":"0s"}}><span className="oc">{t("AI Evaluation")}</span></div><div className="orbit o1" style={{"--d":"-12s"}}><span className="oc">{t("Daily CA")}</span></div><div className="orbit o2" style={{"--d":"-8s"}}><span className="oc">{t("PYQs")}</span></div><div className="orbit o3" style={{"--d":"-20s"}}><span className="oc">{t("Mentors")}</span></div></div></div></div></section>
    </>
  );
}
