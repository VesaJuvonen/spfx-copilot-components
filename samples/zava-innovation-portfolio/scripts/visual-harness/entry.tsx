import * as React from 'react';
import * as ReactDOM from 'react-dom';
import InnovationApp from '../../src/shared/PremiumInnovationApp';
import InnovationThemeProvider from '../../src/shared/InnovationThemeProvider';
import { getIntent, type InnovationIntentKey } from '../../src/shared/catalog';

const params=new URLSearchParams(window.location.search);
const intent=(params.get('intent')||'SubmitInnovationIdea') as InnovationIntentKey;
const mode=params.get('mode')==='fullscreen'?'fullscreen':'inline';
const theme=params.get('theme')==='dark'?'dark':'light';
const root=document.getElementById('root');
if(root){ReactDOM.render(<InnovationThemeProvider theme={theme} targetDocument={document}><InnovationApp definition={getIntent(intent)} properties={{}} currentUserName={getIntent(intent).role} displayMode={mode} onRequestFullscreen={()=>undefined}/></InnovationThemeProvider>,root);}
