import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import Category from "./components/Category";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LoadingScreen from "./components/LoadingScreen";
import DetailPage from "./pages/[slug]";
import { PCScreen, AppsScreen } from "./components/PlaceholderPages";
import { usePageTitle } from "./hooks/usePageTitle";
import TipsPage from "./pages/TipsPage";
import AngebotePage from "./pages/AngebotePage";
import Impressum from './pages/Impressum';
import Datenschutz from './pages/Datenschutz';
import FixedNavCard from "./components/Fixed-Nav-Card";
import DealsPage from "./app/deals/page";
import { FilterProvider } from './context/FilterContext';
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/Admin/AdminPage";
import EditCalloutPage from "./pages/Admin/EditCalloutPage";
import EditCalloutDetailPage from "./pages/Admin/EditCalloutDetailPage";

// Wrap Category with title management
const Home = () => {
  usePageTitle(""); // Will just show "Mukaan"
  return <Category />;
};

function App() {
  const [isLoading, setIsLoading] = useState(true);

  if (isLoading) {
    return <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />;
  }

  return (
    <FilterProvider>
      <Router basename="/Mukaan">
        <div className="flex min-h-screen flex-col">
          <Header />
          <FixedNavCard />
          {/* Spacer in Höhe des Headers; passe den Wert an die tatsächliche Höhe an */}
          <div className="h-20" />
          <main className="flex-grow">
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/deals" element={<DealsPage />} />
                <Route path="/pc" element={<PCScreen />} />
                <Route path="/apps" element={<AppsScreen />} />
                <Route path="/tipps" element={<TipsPage />} />

                <Route path="/angebote" element={<AngebotePage />} />
                <Route path="/:slug" element={<DetailPage />} />
                <Route path="/impressum" element={<Impressum />} />
                <Route path="/datenschutz" element={<Datenschutz />} />
                <Route path="*" element={<Navigate to="/" replace />} />

                <Route path="/login" element={<LoginPage />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/admin/edit/:id" element={<EditCalloutPage />} />
                <Route path="/:slug/edit" element={<EditCalloutDetailPage />} />


              </Routes>
            </AnimatePresence>
          </main>
          <Footer />
        </div>
      </Router>
    </FilterProvider>
  );
}

export default App;
