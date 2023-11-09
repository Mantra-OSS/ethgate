'use client';
import type { Theme, ThemeOptions } from '@mui/material';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { mapValues } from 'lodash';
import { useMemo } from 'react';
import { IntlProvider } from 'react-intl';
import { RecoilRoot } from 'recoil';

import { createExplorerTheme } from '../components/theme';
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

const theme = createExplorerTheme();

export default function ClientProvider({
  themeOptions,
  children,
}: {
  themeOptions?: ThemeOptions;
  children: React.ReactNode;
}) {
  const customTheme = useMemo(
    () => (themeOptions ? createTheme(theme, themeOptions) : theme),
    [themeOptions],
  );
  return (
    <>
      <RecoilRoot>
        <ViewerProvider>
          <ThemeProvider theme={customTheme}>
            <CssBaseline enableColorScheme />
            <AppIntlProvider>{children}</AppIntlProvider>
          </ThemeProvider>
        </ViewerProvider>
      </RecoilRoot>
    </>
  );
}
