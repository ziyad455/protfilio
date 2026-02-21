import { useEffect, useState } from 'react';
import { SectionProvider } from '../../ui/SectionProvider';
import { Typography } from '../../ui/Typography';
import { Button } from '../../ui/Button';
import { WorkCard } from '../../cards/WorkCard';
import { fetchAPI } from '../../../services/api';
import { AnimatedText } from '../../ui/AnimatedText';
import { Link } from 'react-router-dom';

interface ProjectAttributes {
    title: string;
    tagline: string;
    liveUrl?: string;
    githubUrl?: string;
    coverImage: any;
    techStack: { data: { id: number; attributes: { name: string } }[] } | any;
    isFeatured: boolean;
}

interface ProjectData {
    id: number;
    attributes: ProjectAttributes;
    // Strapi V4 flat structure support
    title?: string;
    tagline?: string;
    liveUrl?: string;
    githubUrl?: string;
    coverImage?: any;
    techStack?: any;
    isFeatured?: boolean;
}

// Fallback dummy data if Strapi is empty
const defaultProjects = [
    {
        name: "Design system & Application ui",
        description: "Building a comprehensive design system for a complex enterprise application to ensure consistency and speed up development.",
        image: "/assets/works/01.jpg",
        url: "#",
        tags: ["Design System", "UI/UX", "Figma"]
    },
    {
        name: "E-commerce Redesign",
        description: "Complete overhaul of an e-commerce platform focusing on conversion rate optimization and mobile-first experience.",
        image: "/assets/works/02.jpg",
        url: "#",
        tags: ["E-commerce", "Web Design"]
    },
    {
        name: "Fintech Dashboard",
        description: "A data-rich dashboard for a financial technology startup, organizing complex information into intuitive visualizations.",
        image: "/assets/works/03.jpg",
        url: "#",
        tags: ["Dashboard", "Fintech"]
    },
    {
        name: "Marketing Website",
        description: "High-converting marketing website for a SaaS startup with scroll animations and 3D elements.",
        image: "/assets/works/04.jpg",
        url: "#",
        tags: ["Web Design", "Framer Motion"]
    },
    {
        name: "Mobile App Design",
        description: "iOS and Android app design for a wellness startup, focusing on calm and accessible user interfaces.",
        image: "/assets/works/05.jpg",
        url: "#",
        tags: ["Mobile", "App Design"]
    }
];

interface FeaturedWorkSectionProps {
    title?: string;
    description?: string;
    limit?: number;
    showAll?: boolean;
}

export const FeaturedWorkSection = ({
    title = "Featured Work ↓",
    description = "I create innovative and purposeful designs that not only capture attention but also drive meaningful results.",
    limit,
    showAll = false
}: FeaturedWorkSectionProps) => {
    const [projects, setProjects] = useState<any[]>(defaultProjects);
    const [loading, setLoading] = useState(true);

    // Handle both local relative URLs and Strapi Cloud absolute URLs
    const getImageUrl = (url?: string, defaultUrl?: string) => {
        if (!url) return defaultUrl || '/assets/home/gradientshub.jpg';
        return url.startsWith('http') ? url : `${import.meta.env.VITE_STRAPI_API_URL}${url}`;
    };

    useEffect(() => {
        const loadProjects = async () => {
            try {
                // Populate coverImage and techStack relations
                const response = await fetchAPI('/api/projects?populate=*');
                console.log('API Projects Raw Response:', response);

                if (response.data && Array.isArray(response.data) && response.data.length > 0) {
                    const mappedProjects = response.data.map((item: ProjectData) => {
                        // Support both nested attributes and flat structures
                        const attrs = item.attributes || item;

                        // Extract image correctly
                        const rawImageUrl = attrs.coverImage?.url || attrs.coverImage?.data?.attributes?.url;

                        // Extract tags correctly
                        let tagsList: string[] = [];
                        if (attrs.techStack?.data && Array.isArray(attrs.techStack.data)) {
                            tagsList = attrs.techStack.data.map((tech: any) => tech.attributes?.name || tech.name);
                        } else if (Array.isArray(attrs.techStack)) {
                            tagsList = attrs.techStack.map((tech: any) => tech.name || tech);
                        }

                        return {
                            name: attrs.title || 'Untitled Project',
                            description: attrs.tagline || '',
                            url: attrs.liveUrl || attrs.githubUrl || '#',
                            image: getImageUrl(rawImageUrl, '/assets/works/01.jpg'),
                            tags: tagsList,
                            isShow: true
                        };
                    });

                    setProjects(mappedProjects);
                }
            } catch (err) {
                console.error('Failed to fetch projects data:', err);
                // Keep defaultProjects on error
            } finally {
                setLoading(false);
            }
        };

        loadProjects();
    }, []);

    let displayProjects = [...projects];

    if (limit !== undefined) {
        displayProjects = displayProjects.slice(0, limit);
    } else if (!showAll) {
        displayProjects = displayProjects.slice(0, 6);
    }

    // First 3 are featured (full width)
    const featuredProjects = displayProjects.slice(0, 3);
    // Rest are grid (2 col)
    const gridProjects = displayProjects.slice(3);

    const shouldShowViewAll = limit !== undefined
        ? limit < projects.length
        : !showAll && projects.length > 6;

    if (loading) {
        return (
            <SectionProvider className="py-16 md:py-16 md:pb-12 min-h-[50vh] flex items-center justify-center border-t border-dashed border-gray-200 dark:border-neutral-800">
                <div className="w-8 h-8 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
            </SectionProvider>
        );
    }

    return (
        <SectionProvider className="py-16 md:py-16 md:pb-12 border-t border-dashed border-gray-200 dark:border-neutral-800">
            <div className="space-y-8 md:space-y-8">
                {/* Section Header */}
                <div className="relative z-20 w-full mx-auto mt-12 mb-16 text-center">
                    <Typography as="h2" variant="h2" className="text-4xl text-center tracking-normal sm:text-5xl justify-center mb-0">
                        <AnimatedText delay={0.2} stagger={0.08} content={title} className="justify-center" />
                    </Typography>
                    {description && (
                        <div className="mt-3 text-sm leading-6 sm:mt-4 lg:mt-6 sm:leading-7 lg:leading-8 sm:text-base lg:text-lg text-neutral-700 dark:text-neutral-300 max-w-full lg:max-w-3xl m-auto inline-block">
                            <AnimatedText delay={0.6} stagger={0.03} content={description} className="justify-center" />
                        </div>
                    )}
                </div>

                {/* Featured Projects - Full Width */}
                {featuredProjects.length > 0 && (
                    <div className="space-y-8 md:space-y-10" data-aos-delay="200" data-aos="fade-up-sm" data-aos-duration="1000" data-aos-once="true">
                        {featuredProjects
                            .filter(p => p.isShow !== false)
                            .map((project, index) => (
                                <WorkCard
                                    key={`featured-${index}`}
                                    name={project.name}
                                    description={project.description}
                                    image={project.image}
                                    url={project.url}
                                    tags={project.tags}
                                    video={project.video}
                                    layout="featured"
                                    index={index}
                                />
                            ))}
                    </div>
                )}

                {/* Grid Projects - 2 Column */}
                {gridProjects.length > 0 && (
                    <div className="grid gap-6 md:gap-8 md:grid-cols-2" data-aos-delay="150" data-aos="fade-up-sm" data-aos-duration="1000" data-aos-once="true">
                        {gridProjects
                            .filter(p => p.isShow !== false)
                            .map((project, index) => (
                                <WorkCard
                                    key={`grid-${index}`}
                                    name={project.name}
                                    description={project.description}
                                    image={project.image}
                                    url={project.url}
                                    tags={project.tags}
                                    video={project.video}
                                    layout="grid"
                                    index={index + 3} // Offset index for delay calculations
                                />
                            ))}
                    </div>
                )}

                {/* View All Button */}
                {shouldShowViewAll && (
                    <div className="flex items-center justify-center pt-4">
                        <Button as={Link} to="/works" variant="outline" className="w-[80%] lg:w-[40%] mt-8 font-semibold">
                            See All Works
                        </Button>
                    </div>
                )}
            </div>
        </SectionProvider>
    );
};
