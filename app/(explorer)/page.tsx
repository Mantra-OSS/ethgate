import AppProvider from "../components/App";
import HomeView from "../components/HomeView";

export default function HomePage() {
  return (
    <AppProvider>
      <HomeView />
    </AppProvider>
  );
}
