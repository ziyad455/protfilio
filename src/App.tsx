import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TopBg } from './components/ui/TopBg';
import { HomePage } from './pages/HomePage';
import { WorksPage } from './pages/WorksPage';
import { WorkDetailPage } from './pages/WorkDetailPage';
import { BlogPage } from './pages/BlogPage';
import { BlogDetailPage } from './pages/BlogDetailPage';

function App() {
  return (
    <Router>
      <div className="relative min-h-screen bg-[var(--color-bg-primary)] dark:bg-[var(--color-bg-primary-dark)] transition-colors duration-300 overflow-x-hidden">
        <TopBg />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/works" element={<WorksPage />} />
          <Route path="/works/:slug" element={<WorkDetailPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogDetailPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
