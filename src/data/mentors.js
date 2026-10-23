import m1 from '../assets/mentor-1.jpg';
import m2 from '../assets/mentor-2.jpg';
import m3 from '../assets/mentor-3.jpg';
const imgs=[m1,m2,m3];
export const MENTORS = [
 {
  "href": "https://upsczone.in/mentors/ashish-kumar-shrivastava",
  "b1": "#f26b1d",
  "b2": "#ffb347",
  "n": "01",
  "rate": "₹99",
  "per": "per hour",
  "name": "Ashish Kumar Shrivastava",
  "role": "25+ Years Mentoring Top Ranks | Polity & Philosophy Specialist",
  "chips": [
   "Polity",
   "Philosophy",
   "25+ yrs"
  ],
  "alt": "Ashish Kumar Shrivastava"
 },
 {
  "href": "https://upsczone.in/mentors/pradeep-chaudhary",
  "b1": "#4a1140",
  "b2": "#b02a77",
  "n": "02",
  "rate": "₹99",
  "per": "per hour",
  "name": "PRADEEP CHAUDHARY",
  "role": "International Relations, Sociology, Economics & Polity",
  "chips": [
   "Intl. Relations",
   "Sociology",
   "Economics",
   "Polity"
  ],
  "alt": "PRADEEP CHAUDHARY"
 },
 {
  "href": "https://upsczone.in/mentors/satendra-singh",
  "b1": "#17110d",
  "b2": "#7a4220",
  "n": "03",
  "rate": "₹99",
  "per": "per hour",
  "name": "Satendra Singh",
  "role": "5+ Yr Experience",
  "chips": [
   "5+ yrs"
  ],
  "alt": "Satendra Singh"
 }
].map((m,i)=>({...m,img:imgs[i]}));
