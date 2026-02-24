import { SectionProvider } from '../../ui/SectionProvider';
import { Typography } from '../../ui/Typography';
import { Button } from '../../ui/Button';
import { WorkCard } from '../../cards/WorkCard';
import { AnimatedText } from '../../ui/AnimatedText';
import { Link } from 'react-router-dom';
import projectsData from '../../../data/projects.json';

interface FeaturedWorkSectionProps {
    title?: string;
    description?: string;
    limit?: number;
    showAll?: boolean;
    showViewAllButton?: boolean;
}

export const FeaturedWorkSection = ({
    title = "Featured Work ↓",
    description = "I create innovative and purposeful designs that not only capture attention but also drive meaningful results.",
    limit,
    showAll = false,
    showViewAllButton = true
}: FeaturedWorkSectionProps) => {
    const projects = projectsData.map((p) => ({
        name: p.title,
        description: p.tagline,
        url: `/works/${p.slug}`,
        image: p.coverImage,
        tags: p.techStack,
        isShow: true,
        githubUrl: p.githubUrl,
        liveUrl: p.liveUrl,
    }));

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
                                    layout="featured"
                                    index={index}
                                    githubUrl={project.githubUrl}
                                    liveUrl={project.liveUrl}
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
                                    layout="grid"
                                    index={index + 3}
                                    githubUrl={project.githubUrl}
                                    liveUrl={project.liveUrl}
                                />
                            ))}
                    </div>
                )}

                {/* View All Button */}
                {showViewAllButton && (
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
