import type { Metadata } from 'next';

import HomeView from '../../components/HomeView';
import ExplorerLayout from '../ExplorerLayout';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `ethgate.io | Ethereum & L2 explorer`,
    description: `Discover the Ethereum and L2 blocks, transactions, logs, and more on ethgate.io`,
    icons: '/icon',
    openGraph: {
      title: `ethgate.io | Ethereum & L2 explorer`,
      description: `Discover the Ethereum and L2 blocks, transactions, logs, and more on ethgate.io`,
    },
    twitter: {
      title: `ethgate.io | Ethereum & L2 explorer`,
      description: `Discover the Ethereum and L2 blocks, transactions, logs, and more on ethgate.io`,
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
