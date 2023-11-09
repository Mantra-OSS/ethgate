import { AppBreadcrumbs } from '@/app/client/breadcrumbs';

import HomeView from '../../components/HomeView';
import ExplorerLayout from '../ExplorerLayout';

export default function HomePage() {
  return (
    <ExplorerLayout nav={<AppBreadcrumbs />}>
      <HomeView />
    </ExplorerLayout>
  );
}
