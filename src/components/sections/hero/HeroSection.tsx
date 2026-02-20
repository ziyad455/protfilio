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
    profileImage: { data: { attributes: { url: string } } | null };
}

export const HeroSection = () => {
    const [data, setData] = useState<HeroData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                // Populate roles and profileImage relations
                const response = await fetchAPI('/api/hero?populate=*');
                if (response.data && response.data.attributes) {
                    setData(response.data.attributes);
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

    const imageUrl = displayData.profileImage?.data?.attributes?.url
        ? `${import.meta.env.VITE_STRAPI_API_URL}${displayData.profileImage.data.attributes.url}`
        : '/assets/home/gradientshub.jpg'; // Fallback to public asset if none uploaded

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
