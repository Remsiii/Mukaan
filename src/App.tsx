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
import TikTokScreen from "./components/TikTokScreen";
import TipsPage from "./pages/TipsPage";
import AngebotePage from "./pages/AngebotePage";
import Impressum from './pages/Impressum';
import Datenschutz from './pages/Datenschutz';
import AdminPage from "./pages/AdminPage";
import LoginPage from "./pages/LoginPage";
import EditCalloutPage from "./pages/EditCalloutPage";
import EditableCategory from './components/EditableCategory';
import EditablePageContent from './components/EditablePageContent';

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
    <Router basename="/Mukaan">
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-grow">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/pc" element={<PCScreen />} />
              <Route path="/apps" element={<AppsScreen />} />
              <Route path="/tipps" element={<TipsPage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/admin/edit/:id" element={<EditCalloutPage />} />
              <Route path="/admin/edit-category" element={<EditableCategory />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/angebote" element={<AngebotePage />} />
              <Route path="/:slug" element={<DetailPage />} />
              <Route path="/:slug/edit" element={<EditablePageContent />} />
              <Route path="/tiktok" element={<TikTokScreen />} />
              <Route path="/impressum" element={<Impressum />} />
              <Route path="/datenschutz" element={<Datenschutz />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
