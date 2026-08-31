import * as React from 'react';
import { createRoot } from 'react-dom/client';
import RevenueApp from '../../src/shared/RevenueApp';
import RevenueThemeProvider from '../../src/shared/RevenueThemeProvider';
import { getIntent, type RevenueIntentKey } from '../../src/shared/catalog';

const params = new URLSearchParams(window.location.search);
const intentKey = (params.get('intent') || 'MapBuyingCommittee') as RevenueIntentKey;
const displayMode = params.get('mode') === 'fullscreen' ? 'fullscreen' : 'inline';
const theme = params.get('theme') === 'dark' ? 'dark' : 'light';
const element = document.getElementById('root');
if (element) {
  createRoot(element).render(
    <RevenueThemeProvider theme={theme} targetDocument={document}>
      <RevenueApp
        definition={getIntent(intentKey)}
        properties={{ opportunityId: 'ZDR-2042' }}
        currentUserName="Megan Bowen"
        displayMode={displayMode}
        onRequestFullscreen={displayMode === 'inline' ? async () => undefined : undefined}
        onUpdateModelContext={async () => undefined}
        onSendFollowUp={async () => true}
      />
    </RevenueThemeProvider>
  );
}