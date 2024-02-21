import { Inter } from 'next/font/google';

import './globals.css';
import { headers } from 'next/headers';
import { cookieToInitialState } from 'wagmi';

import { config } from './components/WalletConnectConfig';
import { WalletConnectProvider } from './components/WalletConnectProvider';
import StyledJsxRegistry from './registry';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const initialState = cookieToInitialState(config, headers().get('cookie'));
  return (
    <html lang="en">
      <body className={inter.className}>
        <WalletConnectProvider initialState={initialState}>
          <StyledJsxRegistry>{children}</StyledJsxRegistry>
        </WalletConnectProvider>
      </body>
    </html>
  );
}
