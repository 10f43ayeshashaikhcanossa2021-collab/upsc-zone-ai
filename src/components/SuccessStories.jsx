import { useState } from 'react';
import { useT } from '../i18n/LangContext.jsx';
import { STORY_CARDS } from '../data/storyCards.jsx';

export default function SuccessStories() {
  const t = useT();
  const [paused, setPaused] = useState(false);
  return (
    <section id="success-stories" className="ss">
      <div className="wrap">
        <div className="sshead">
          <div>
            <span className="eb"><i />{t('Success Stories')}</span>
            <h2>{t('Stories of steady, ')}<span>{t('rank-worthy prep.')}</span></h2>
          </div>
          <div className="ssr">
            <p>{t('See how consistent practice, honest feedback and a clear plan can add up to a final selection.')}</p>
            <button type="button" className="stp" aria-pressed={paused} aria-controls="rt" onClick={() => setPaused((p) => !p)}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path className="i-pa" d="M8 5v14M16 5v14" />
                <path className="i-pl" d="M7 4.5v15l12-7.5z" />
              </svg>
              <span className="pa">{t('Pause stories')}</span>
              <span className="pl2">{t('Play stories')}</span>
            </button>
          </div>
        </div>
      </div>
      <div className="rm" role="region" aria-label="Student success stories">
        <div className={'rt' + (paused ? ' paused' : '')} id="rt">
          {STORY_CARDS.map((c, i) => <span key={'a' + i} style={{ display: 'contents' }}>{c(t, '', false)}</span>)}
          {STORY_CARDS.map((c, i) => <span key={'b' + i} style={{ display: 'contents' }}>{c(t, 'd', true)}</span>)}
        </div>
      </div>
      <div className="wrap">
        <p className="smp">{t('Sample stories for demonstration. Replace the illustrated portraits and notes with real photos and feedback.')}</p>
      </div>
    </section>
  );
}
