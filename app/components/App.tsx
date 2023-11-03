import { CssBaseline, ThemeProvider } from '@mui/material';
import { mapValues } from 'lodash';
import { IntlProvider } from 'react-intl';
import { RouterProvider, createBrowserRouter, createHashRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import tr from '../lang/tr.json';
import { ViewerProvider, useViewer } from '../viewer/index.js';

import routes from './routes.js';
import { theme } from './theme.js';

const HASH_ROUTER = false;

const router = HASH_ROUTER ? createHashRouter(routes) : createBrowserRouter(routes);

function AppIntlProvider({ children }: { children: React.ReactNode }) {
  const viewer = useViewer();

  const messages =
    viewer.locale === 'tr'
      ? // TODO: Load lazily
        mapValues(tr, (value) => value.defaultMessage)
      : {};

  return (
    <IntlProvider locale={viewer.locale} messages={messages}>
      {children}
    </IntlProvider>
  );
}

export default function App() {
  return (
    <>
      <RecoilRoot>
        <ViewerProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline enableColorScheme />
            <AppIntlProvider>
              <RouterProvider router={router} />
            </AppIntlProvider>
          </ThemeProvider>
        </ViewerProvider>
      </RecoilRoot>
    </>
  );
}
