import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { logger } from './utils/logger';
import { useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import Onboarding from './pages/Onboarding';
import BarcodeScanner from './pages/BarcodeScanner';
import ProductDetail from './pages/ProductDetail';
import History from './pages/History';
import Progress from './pages/Progress';
import Profile from './pages/Profile';

function AppContent() {
  const location = useLocation();
  const hideNav = location.pathname === '/onboarding' || location.pathname === '/scan';

  useEffect(() => {
    logger.info(`Navigation: ${location.pathname}`);
  }, [location]);

  return (
    <div className={`min-h-screen bg-background dark:bg-gray-900 text-text dark:text-white transition-colors ${!hideNav ? 'pb-24' : ''}`}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/scan" element={<BarcodeScanner />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/history" element={<History />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      {!hideNav && <Navbar />}
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <Router>
        <AppContent />
      </Router>
    </AppProvider>
  );
}

export default App;
