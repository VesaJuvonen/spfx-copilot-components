import megan from './assets/faces/Megan-Bowen.jpg';
import miriam from './assets/faces/Miriam-Graham.jpg';
import joni from './assets/faces/Joni-Sherman.jpg';
import nestor from './assets/faces/Nestor-Wilke.jpg';
import pradeep from './assets/faces/Pradeep-Gupta.jpg';
import lee from './assets/faces/Lee-Gu.jpg';
import patti from './assets/faces/Patti-Fernandez.jpg';

export interface IPersonaMedia {
  readonly src: string;
  readonly alt: string;
}

export const PERSONA_MEDIA: Readonly<Record<string, IPersonaMedia>> = {
  'Megan Bowen': { src: megan, alt: 'Megan Bowen' },
  'Miriam Graham': { src: miriam, alt: 'Miriam Graham' },
  'Joni Sherman': { src: joni, alt: 'Joni Sherman' },
  'Nestor Wilke': { src: nestor, alt: 'Nestor Wilke' },
  'Pradeep Gupta': { src: pradeep, alt: 'Pradeep Gupta' },
  'Lee Gu': { src: lee, alt: 'Lee Gu' },
  'Patti Fernandez': { src: patti, alt: 'Patti Fernandez' }
};