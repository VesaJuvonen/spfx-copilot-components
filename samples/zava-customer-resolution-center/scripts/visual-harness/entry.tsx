import * as React from 'react';
import { createRoot } from 'react-dom/client';
import ServiceApp from '../../src/shared/ServiceApp';
import ServiceThemeProvider from '../../src/shared/ServiceThemeProvider';
import { getIntent, type ServiceIntentKey } from '../../src/shared/catalog';

const params=new URLSearchParams(location.search);
const intent=(params.get('intent')||'BuildResolutionPlan') as ServiceIntentKey;
const mode=params.get('mode')==='fullscreen'?'fullscreen':'inline';
const theme=params.get('theme')==='dark'?'dark':'light';
document.documentElement.style.background=theme==='dark'?'#10191b':'#f4f7f6';
createRoot(document.getElementById('root')!).render(<ServiceThemeProvider theme={theme} targetDocument={document}><ServiceApp definition={getIntent(intent)} properties={{caseId:'ZCR-1048',customerId:'alpine-house'}} currentUserName="Amina Yusuf" displayMode={mode} onRequestFullscreen={()=>undefined}/></ServiceThemeProvider>);
