import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { TopBg } from './components/ui/TopBg';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { WorksPage } from './pages/WorksPage';
import { WorkDetailPage } from './pages/WorkDetailPage';
import { BlogPage } from './pages/BlogPage';
import { BlogDetailPage } from './pages/BlogDetailPage';

function App() {
  return (
    <ThemeProvider>
      <Router>
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
            <Route path="/works/:slug" element={<WorkDetailPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogDetailPage />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;

