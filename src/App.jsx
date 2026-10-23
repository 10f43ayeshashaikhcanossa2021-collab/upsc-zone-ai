import Nav from './components/Nav.jsx';
import Ticker from './components/Ticker.jsx';
import Hero from './components/Hero.jsx';
import Backed from './components/Backed.jsx';
import Platform from './components/Platform.jsx';
import CurrentAffairs from './components/CurrentAffairs.jsx';
import Why from './components/Why.jsx';
import Community from './components/Community.jsx';
import Mentors from './components/Mentors.jsx';
import SuccessStories from './components/SuccessStories.jsx';
import Faq from './components/Faq.jsx';
import Cta from './components/Cta.jsx';
import Footer from './components/Footer.jsx';
import useOffscreenPause from './useOffscreenPause.js';
import ChatWidget from './components/ChatWidget.jsx';

export default function App() {
  useOffscreenPause();
  return (
    <>
      <Nav />
      <Ticker />
      <Hero />
      <Backed />
      <Platform />
      <CurrentAffairs />
      <Why />
      <Community />
      <Mentors />
      <SuccessStories />
      <Faq />
      <Cta />
      <Footer />
      <ChatWidget />
    </>
  );
}
