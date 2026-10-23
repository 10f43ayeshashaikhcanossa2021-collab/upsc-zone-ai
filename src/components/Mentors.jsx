import { useT } from '../i18n/LangContext.jsx';
import MentorGrid from './MentorGrid.jsx';
export default function Mentors() {
  const t = useT();

  return (
    <>
<section id="mentors" className="mentor-sec"><div className="wrap"><span className="eb"><i />{t("Mentors")}<i /></span><h2>{t("Find a UPSC ")}<span>{t("mentor")}</span></h2><p className="sub">{t("Experienced mentors you can hire directly. Browse by subject and language, see what they charge, and get in touch.")}</p><ol className="mt-steps"><li><b>{t("1")}</b>{t("Browse by subject & language")}</li><li><b>{t("2")}</b>{t("See what they charge")}</li><li><b>{t("3")}</b>{t("Get in touch")}</li></ol><MentorGrid /><div className="mt-all"><a href="https://upsczone.in/mentors">{t("All mentors ")}<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg></a></div></div></section>
    </>
  );
}
