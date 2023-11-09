import { AppBreadcrumbs } from '@/app/client/breadcrumbs';

// import HomeView from '../../components/HomeView';
import ExplorerLayout from '../ExplorerLayout';

export default function HomePage() {
  return (
    <ExplorerLayout themeOptions={{}} nav={<AppBreadcrumbs />}>
      {/* <HomeView /> */}
    </ExplorerLayout>
  );
}
