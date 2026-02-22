import { useEffect, useState } from 'react';
import { SectionProvider } from '../../ui/SectionProvider';
import { Typography } from '../../ui/Typography';
import { Button } from '../../ui/Button';
import { AnimatedText } from '../../ui/AnimatedText';
import { HeroCard } from './HeroCard';
import { fetchAPI } from '../../../services/api';
import { ArrowUpRight } from 'lucide-react';

interface HeroData {
    greeting: string;
    name: string;
    description: string;
    resumeLink: string;
    roles: { data: { id: number; attributes: { name: string } }[] };
    profileImage: any; // Using any temporarily to avoid strict type collisions with both nested and flat responses
}

export const HeroSection = () => {
    const [data, setData] = useState<HeroData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                // Populate roles and profileImage relations
                const response = await fetchAPI('/api/hero?populate=*');
                console.log('API Hero Raw Response:', response);
                if (response.data) {
                    // Strapi v4 sometimes returns data.attributes, sometimes just data directly depending on config
                    const heroData = response.data.attributes || response.data;
                    console.log('Setting Hero Data:', heroData);
                    setData(heroData);
                }
            } catch (err) {
                console.error('Failed to fetch Hero data:', err);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    // Provide some default fallback data if Strapi is empty or disconnected
    const displayData = data || {
        greeting: "Hi, I'm",
        name: "Ricoui",
        description: "I'm a web/UI designer with 8+ years of experience. I love blending design and code to create captivating visuals and interactive experiences.",
        resumeLink: "#",
        roles: { data: [] },
        profileImage: { data: null }
    };

    // Handle both local relative URLs and Strapi Cloud absolute URLs
    const getImageUrl = (url?: string) => {
        if (!url) return '/assets/home/gradientshub.jpg';
        return url.startsWith('http') ? url : `${import.meta.env.VITE_STRAPI_API_URL}${url}`;
    };

    console.log('Hero Profile Image Data:', displayData.profileImage);

    // Check for both the classic v4 nested structure and the flat structure we're seeing in the logs
    const rawImageUrl = displayData.profileImage?.url || displayData.profileImage?.data?.attributes?.url;
    const imageUrl = getImageUrl(rawImageUrl);

    if (loading) {
        return (
            <SectionProvider className="h-[70vh] flex items-center justify-center">
                <div className="w-8 h-8 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
            </SectionProvider>
        );
    }

    return (
        <SectionProvider className="mt-16 md:mt-20 lg:mt-24 mb-16 relative z-20">
            <div className="flex flex-col items-center justify-between md:flex-row gap-12 lg:gap-16">

                {/* Left Content Area */}
                <div className="w-full md:w-1/2 text-center md:text-left pt-8">
                    {/* Glowing availability badge */}
                    <div
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-sm font-medium mb-8"
                        data-aos="fade-up-sm"
                        data-aos-once="true"
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        Available for new projects
                    </div>

                    <Typography variant="h1" className="mb-6 h-[1.3em] overflow-visible">
                        <AnimatedText
                            content={`${displayData.greeting} ${displayData.name}`}
                            delay={0.1}
                            duration={0.5}
                            stagger={0.08}
                            className="text-primary"
                        />
                    </Typography>

                    <Typography variant="p" className="mb-8 max-w-[500px] mx-auto md:mx-0">
                        <AnimatedText
                            content={displayData.description}
                            delay={0.3}
                            duration={0.5}
                            stagger={0.015}
                        />
                    </Typography>

                    <div
                        data-aos="fade-up-sm"
                        data-aos-delay="600"
                        data-aos-duration="500"
                        data-aos-once="true"
                        className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
                    >
                        <Button
                            as="a"
                            href={displayData.resumeLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            variant="primary"
                            size="lg"
                            className="font-semibold"
                        >
                            View Resume <ArrowUpRight className="ml-2 w-4 h-4" />
                        </Button>
                        <Button
                            as="a"
                            href="#about"
                            variant="outline"
                            size="lg"
                            className="font-semibold"
                        >
                            About Me
                        </Button>
                    </div>

                    {/* Social Links */}
                    <div
                        data-aos="fade-up-sm"
                        data-aos-delay="800"
                        data-aos-duration="500"
                        data-aos-once="true"
                        className="flex items-center gap-4 mt-8 justify-center md:justify-start"
                    >
                        {/* GitHub */}
                        <a
                            href="https://github.com/ziyad455"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 rounded-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-200/50 dark:border-neutral-700/50 flex items-center justify-center text-neutral-600 dark:text-neutral-300 hover:bg-neutral-800 hover:text-white dark:hover:bg-white dark:hover:text-neutral-900 transition-all duration-200 hover:scale-110"
                            title="GitHub"
                        >
                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                        </a>
                        {/* LinkedIn */}
                        <a
                            href="https://www.linkedin.com/in/ziyad-tber/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 rounded-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-200/50 dark:border-neutral-700/50 flex items-center justify-center text-neutral-600 dark:text-neutral-300 hover:bg-[#0077B5] hover:text-white dark:hover:bg-[#0077B5] dark:hover:text-white transition-all duration-200 hover:scale-110"
                            title="LinkedIn"
                        >
                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                        </a>
                        {/* Gmail */}
                        <a
                            href="mailto:tberziad016@gmail.com"
                            className="w-10 h-10 rounded-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-200/50 dark:border-neutral-700/50 flex items-center justify-center text-neutral-600 dark:text-neutral-300 hover:bg-red-500 hover:text-white dark:hover:bg-red-500 dark:hover:text-white transition-all duration-200 hover:scale-110"
                            title="Email"
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                        </a>
                        {/* WhatsApp */}
                        <a
                            href="https://wa.me/21267439353"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 rounded-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-200/50 dark:border-neutral-700/50 flex items-center justify-center text-neutral-600 dark:text-neutral-300 hover:bg-[#25D366] hover:text-white dark:hover:bg-[#25D366] dark:hover:text-white transition-all duration-200 hover:scale-110"
                            title="WhatsApp"
                        >
                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                        </a>
                    </div>
                </div>

                {/* Right Image Area */}
                <div
                    className="w-full md:w-1/2 md:pl-10"
                    data-aos="fade-left-sm"
                    data-aos-delay="300"
                    data-aos-duration="800"
                    data-aos-once="true"
                >
                    <HeroCard
                        imageUrl={imageUrl}
                        title="Profile"
                        link="#"
                    />
                </div>
            </div>
        </SectionProvider>
    );
};
