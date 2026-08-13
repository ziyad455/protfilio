import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { TopBg } from './components/ui/TopBg';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { WorksPage } from './pages/WorksPage';
import { NexusCaseStudyPage } from './pages/NexusCaseStudyPage';
import { SophiaProjectPage } from './pages/SophiaProjectPage';
import { TamazightProjectPage } from './pages/TamazightProjectPage';
import { WorkDetailPage } from './pages/WorkDetailPage';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  return (
    <ThemeProvider>
      <Router>
        <ScrollToTop />
        <div className="relative min-h-screen bg-[var(--color-bg-primary)] dark:bg-[var(--color-bg-primary-dark)] transition-colors duration-300 overflow-x-hidden">
          {/* Subtle grid background overlay */}
          <div
            className="fixed inset-0 z-0 pointer-events-none opacity-[0.07] dark:opacity-[0.04]"
            style={{
              backgroundImage: 'url(/grid-bg.jpg)',
              backgroundSize: '400px',
              backgroundRepeat: 'repeat',
            }}
          />
          <TopBg />
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/works" element={<WorksPage />} />
            <Route path="/works/nexus-inclusion" element={<NexusCaseStudyPage />} />
            <Route path="/works/tamazight-multilingo" element={<TamazightProjectPage />} />
            <Route path="/works/sophia" element={<SophiaProjectPage />} />
            <Route path="/works/:slug" element={<WorkDetailPage />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
