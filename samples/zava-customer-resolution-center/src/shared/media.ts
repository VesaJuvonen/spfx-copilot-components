import joni from './assets/faces/Joni-Sherman.jpg';
import lee from './assets/faces/Lee-Gu.jpg';
import megan from './assets/faces/Megan-Bowen.jpg';
import nestor from './assets/faces/Nestor-Wilke.jpg';
import pradeep from './assets/faces/Pradeep-Gupta.jpg';

export interface IPersonaMedia { readonly src:string; readonly alt:string; readonly role:string; }
export const PERSONA_MEDIA:Readonly<Record<string,IPersonaMedia>>={
  'Joni Sherman':{src:joni,alt:'Joni Sherman',role:'VP Customer Operations'},
  'Lee Gu':{src:lee,alt:'Lee Gu',role:'Reliability engineer'},
  'Megan Bowen':{src:megan,alt:'Megan Bowen',role:'Customer success manager'},
  'Nestor Wilke':{src:nestor,alt:'Nestor Wilke',role:'Field coordinator'},
  'Pradeep Gupta':{src:pradeep,alt:'Pradeep Gupta',role:'Product specialist'}
};
