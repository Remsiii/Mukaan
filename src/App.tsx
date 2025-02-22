import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";
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
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';

// Wrap Category with title management
const Home = () => {
  usePageTitle(""); // Will just show "Mukaan"
  return <Category />;
};

// Add new wrapper components for different layouts
const DefaultLayout = () => (
  <>
    <Header />
    <FixedNavCard />
    <div className="h-20" />
    <Outlet />
    <Footer />
  </>
);

const AdminLayout = () => (
  <>
    <Outlet />
    <FixedNavCard />
  </>
);

function App() {
  const [isLoading, setIsLoading] = useState(true);

  if (isLoading) {
    return <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />;
  }

  return (
    <AuthProvider>
      <FilterProvider>
        <Router basename="/Mukaan">
          <div className="flex min-h-screen flex-col">
            <main className="flex-grow">
              <AnimatePresence mode="wait">
                <Routes>
                  {/* Admin routes with protection */}
                  <Route element={<AdminLayout />}>
                    <Route
                      path="/admin"
                      element={
                        <ProtectedRoute>
                          <AdminPage />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/admin/edit/:id"
                      element={
                        <ProtectedRoute>
                          <EditCalloutPage />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/:slug/edit"
                      element={
                        <ProtectedRoute>
                          <EditCalloutDetailPage />
                        </ProtectedRoute>
                      }
                    />
                  </Route>

                  {/* Public routes */}
                  <Route element={<DefaultLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/deals" element={<DealsPage />} />
                    <Route path="/pc" element={<PCScreen />} />
                    <Route path="/apps" element={<AppsScreen />} />
                    <Route path="/tipps" element={<TipsPage />} />
                    <Route path="/angebote" element={<AngebotePage />} />
                    <Route path="/:slug" element={<DetailPage />} />
                    <Route path="/impressum" element={<Impressum />} />
                    <Route path="/datenschutz" element={<Datenschutz />} />
                    <Route path="/login" element={<LoginPage />} />
                  </Route>

                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </AnimatePresence>
            </main>
          </div>
        </Router>
      </FilterProvider>
    </AuthProvider>
  );
}

export default App;
