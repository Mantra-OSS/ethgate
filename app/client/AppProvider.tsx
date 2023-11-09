'use client';
import { mapValues } from 'lodash';
import { IntlProvider } from 'react-intl';
import { RecoilRoot } from 'recoil';

import en from '../lang/en.json';
import { ViewerProvider } from '../viewer';

const messages = mapValues(en, (value) => value.defaultMessage);

function AppIntlProvider({ children }: { children: React.ReactNode }) {
  // const viewer = useViewer();

  // let messages;
  // switch (viewer.locale) {
  //   case 'tr': {
  //     messages = mapValues(tr, (value) => value.defaultMessage);
  //     break;
  //   }
  //   case 'en': {
  //     messages = mapValues(en, (value) => value.defaultMessage);
  //     break;
  //   }
  // }

  return (
    <IntlProvider locale={'en'} messages={messages}>
      {children}
    </IntlProvider>
  );
}

export default function ClientProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <RecoilRoot>
        <ViewerProvider>
          <AppIntlProvider>{children}</AppIntlProvider>
        </ViewerProvider>
      </RecoilRoot>
    </>
  );
}
