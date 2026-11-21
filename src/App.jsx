import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import './index.css';

import Header from './components/Header';
import Footer from './components/Footer';
import IntroCurtain from './components/IntroCurtain';

import HomePage from './pages/HomePage';
import PuppiesPage from './pages/PuppiesPage';
import HappyFamiliesPage from './pages/HappyFamiliesPage';
import HowItWorksPage from './pages/HowItWorksPage';
import FaqPage from './pages/FaqPage';
import ContactPage from './pages/ContactPage';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Page transition wrapper
function PageTransition({ children }) {
  const { pathname } = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

function AppContent() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <main
        id="main"
        tabIndex={-1}
        style={{ position: 'relative', paddingTop: 'var(--header-h)', outline: 'none' }}
      >
        <PageTransition>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/puppies" element={<PuppiesPage />} />
            <Route path="/happy-families" element={<HappyFamiliesPage />} />
            <Route path="/how-it-works" element={<HowItWorksPage />} />
            <Route path="/faq" element={<FaqPage />} />
            <Route path="/contact" element={<ContactPage />} />
            {/* Fallback */}
            <Route path="*" element={<HomePage />} />
          </Routes>
        </PageTransition>
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  const [showCurtain, setShowCurtain] = useState(true);
  const [curtainDone, setCurtainDone] = useState(false);

  // Auto-dismiss curtain after 2.2s
  useEffect(() => {
    const t = setTimeout(() => {
      setShowCurtain(false);
    }, 2200);
    return () => clearTimeout(t);
  }, []);

  return (
    <BrowserRouter>
      {/* Intro curtain — only on first load */}
      <AnimatePresence>
        {showCurtain && (
          <IntroCurtain onComplete={() => setCurtainDone(true)} />
        )}
      </AnimatePresence>

      {/* Main app — always rendered, curtain slides away */}
      <AppContent />
    </BrowserRouter>
  );
}
