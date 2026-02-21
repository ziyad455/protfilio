import { HeroSection } from '../components/sections/hero/HeroSection';
import { AboutSection } from '../components/sections/about/AboutSection';
import { FeaturedWorkSection } from '../components/sections/work/FeaturedWorkSection';
import { BlogSection } from '../components/sections/blog/BlogSection';

export const HomePage = () => {
    return (
        <div className="relative site-container z-20 w-full mx-auto px-4 xl:px-0">
            <HeroSection />
            <AboutSection />
            <FeaturedWorkSection />
            <BlogSection />
        </div>
    );
};
