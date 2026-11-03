import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ListPage } from './pages/ListPage';
import { DetailPage } from './pages/DetailPage';

// Scroll restoration component on route change
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
};

// Layout with page transition container
const AppContent: React.FC = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-800">
      <ScrollToTop />
      <Header />

      {/* Main Content Container with Page Transition Animation (Feature F=3) */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div key={location.pathname} className="page-enter-active">
          <Routes location={location}>
            <Route path="/" element={<ListPage />} />
            <Route path="/item/:id" element={<DetailPage />} />
          </Routes>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;
