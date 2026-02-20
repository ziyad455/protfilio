import { TopBg } from './components/ui/TopBg';
import { HeroSection } from './components/sections/hero/HeroSection';
import { AboutSection } from './components/sections/about/AboutSection';

function App() {
  return (
    <div className="relative min-h-screen bg-[var(--color-bg-primary)] dark:bg-[var(--color-bg-primary-dark)] transition-colors duration-300 overflow-x-hidden">
      <TopBg />

      {/* Main Container mirroring the Astro layout */}
      <div className="relative site-container z-20 w-full mx-auto px-4 xl:px-0">
        <HeroSection />
        <AboutSection />
      </div>

    </div>
  );
}

export default App;
