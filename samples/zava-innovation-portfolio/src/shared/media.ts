import megan from './assets/faces/Megan-Bowen.jpg';
import johanna from './assets/faces/Johanna-Lorenz.jpg';
import diego from './assets/faces/Diego-Siciliani.jpg';
import miriam from './assets/faces/Miriam-Graham.jpg';
import joni from './assets/faces/Joni-Sherman.jpg';
import pradeep from './assets/faces/Pradeep-Gupta.jpg';
import nestor from './assets/faces/Nestor-Wilke.jpg';
import lee from './assets/faces/Lee-Gu.jpg';
import patti from './assets/faces/Patti-Fernandez.jpg';
import isaiah from './assets/faces/Isaiah-Langer.jpg';
import grady from './assets/faces/Grady-Archie.jpg';

export const PERSONA_MEDIA:Readonly<Record<string,{readonly src:string;readonly alt:string}>>={
  'Megan Bowen':{src:megan,alt:'Megan Bowen'},'Johanna Lorenz':{src:johanna,alt:'Johanna Lorenz'},
  'Diego Siciliani':{src:diego,alt:'Diego Siciliani'},'Miriam Graham':{src:miriam,alt:'Miriam Graham'},
  'Joni Sherman':{src:joni,alt:'Joni Sherman'},'Pradeep Gupta':{src:pradeep,alt:'Pradeep Gupta'},
  'Nestor Wilke':{src:nestor,alt:'Nestor Wilke'},'Lee Gu':{src:lee,alt:'Lee Gu'},
  'Patti Fernandez':{src:patti,alt:'Patti Fernandez'},'Isaiah Langer':{src:isaiah,alt:'Isaiah Langer'},
  'Grady Archie':{src:grady,alt:'Grady Archie'}
};