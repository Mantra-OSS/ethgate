import type { Metadata } from 'next';

import HomeView from '../../components/HomeView';
import ExplorerLayout from '../ExplorerLayout';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `punker.io | Ethereum Social Club`,
    description: `Punker is a social club for Ethereum users. Connect with friends, share updates, and explore the Ethereum blockchain.`,
    icons: '/icon',
    openGraph: {
      title: `punker.io | Ethereum Social Club`,
      description: `Punker is a social club for Ethereum users. Connect with friends, share updates, and explore the Ethereum blockchain.`,
    },
    twitter: {
      title: `punker.io | Ethereum Social Club`,
      description: `Punker is a social club for Ethereum users. Connect with friends, share updates, and explore the Ethereum blockchain.`,
    },
  };
}

export default function HomePage() {
  return (
    <ExplorerLayout>
      <HomeView />
    </ExplorerLayout>
  );
}
