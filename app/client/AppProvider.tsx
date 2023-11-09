'use client';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { mapValues } from 'lodash';
import { IntlProvider } from 'react-intl';
import { RecoilRoot } from 'recoil';

import { theme } from '../components/theme';
import en from '../lang/en.json';
import tr from '../lang/tr.json';
import { ViewerProvider, useViewer } from '../viewer';

function AppIntlProvider({ children }: { children: React.ReactNode }) {
  const viewer = useViewer();

  let messages;
  switch (viewer.locale) {
    case 'tr': {
      messages = mapValues(tr, (value) => value.defaultMessage);
      break;
    }
    case 'en': {
      messages = mapValues(en, (value) => value.defaultMessage);
      break;
    }
  }
  return (
    <IntlProvider locale={viewer.locale} messages={messages}>
      {children}
    </IntlProvider>
  );
}

export default function ClientProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <RecoilRoot>
        <ViewerProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline enableColorScheme />
            <AppIntlProvider>{children}</AppIntlProvider>
          </ThemeProvider>
        </ViewerProvider>
      </RecoilRoot>
    </>
  );
}
