import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import Category from './components/Category'
import Header from './components/Header'
import OfferScreen from './components/OfferScreen'
import Footer from './components/Footer'
import LoadingScreen from './components/LoadingScreen'
import DetailPage from './components/DetailPage'
import { keyForSteamContent } from './data/pages/keyforsteam'

// Title management
const usePageTitle = (title: string) => {
  useEffect(() => {
    const baseTitle = 'Muhammed Kaan | Technick, Tipps und Tricks'
    document.title = title ? `${title} - ${baseTitle}` : baseTitle
  }, [title])
}

// Placeholder components for PC and Tips pages
const PCScreen = () => {
  usePageTitle('PC Beratung')
  return (
    <div className="min-h-screen bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">PC Beratung</h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Hier finden Sie bald unsere PC-Beratung und Dienstleistungen.
          </p>
        </div>
      </div>
    </div>
  )
}

const TipsScreen = () => {
  usePageTitle('Tipps')
  return (
    <div className="min-h-screen bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Tipps & Tricks</h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Hier finden Sie bald hilfreiche Tipps und Tricks rund um Computer und Technologie.
          </p>
        </div>
      </div>
    </div>
  )
}

// Wrap OfferScreen with title management
const OfferScreenWithTitle = () => {
  usePageTitle('Angebote')
  return <OfferScreen />
}

// Home component with title management
const Home = () => {
  usePageTitle('')  // Will just show "Mukaan"
  return <Category />
}

function App() {
  const [isLoading, setIsLoading] = useState(true)

  if (isLoading) {
    return <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />
  }

  return (
    <Router>
      <Routes>

        {/* Main App Routes - With Header/Footer */}
        <Route
          path="*"
          element={
            <div className="flex min-h-screen flex-col">
              <Header />
              <main className="flex-grow">
                <AnimatePresence mode="wait">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/pc" element={<PCScreen />} />
                    <Route path="/tipps" element={<TipsScreen />} />
                    <Route path="/angebote" element={<OfferScreenWithTitle />} />
                    <Route
                      path="/keyforsteam"
                      element={<DetailPage {...keyForSteamContent} />}
                    />
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </AnimatePresence>
              </main>
              <Footer />
            </div>
          }
        />
      </Routes>
    </Router>
  )
}

export default App
