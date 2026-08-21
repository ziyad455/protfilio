import { Link } from 'react-router-dom';
import { SectionProvider } from '../../ui/SectionProvider';
import { Typography } from '../../ui/Typography';
import { Button } from '../../ui/Button';
import { AnimatedText } from '../../ui/AnimatedText';
import { FeaturedProjectCard } from '../../cards/FeaturedProjectCard';
import { TamazightFeaturedCard } from '../../cards/TamazightFeaturedCard';
import { SophiaFeaturedProject } from '../../cards/SophiaFeaturedProject';
import { DiffShowFeaturedCard } from '../../cards/DiffShowFeaturedCard';
import { WorkCard } from '../../cards/WorkCard';
import { nexusProject, sophiaProject, tamazightProject } from '../../../data/featuredWork';
import projectsData from '../../../data/projects.json';

interface FeaturedWorkSectionProps {
    title?: string;
    description?: string;
    showViewAllButton?: boolean;
    headingLevel?: 'h1' | 'h2';
}

export const FeaturedWorkSection = ({
    title = 'Main Projects ↓',
    description = 'My strongest professional and independent engineering work, followed by a broader collection of projects.',
    showViewAllButton = true,
    headingLevel = 'h2',
}: FeaturedWorkSectionProps) => {
    const diffShowProject = projectsData.find((project) => project.slug === 'diffshow');
    const otherProjects = projectsData.filter((project) => project.slug !== 'diffshow' && project.slug !== 'project-3');

    return (
        <SectionProvider
            id="featured-work"
            className="border-t border-dashed border-gray-200 py-16 dark:border-neutral-800 md:pb-12 md:pt-16"
        >
            <div className="space-y-10">
                <header className="relative z-20 mx-auto mb-14 mt-12 w-full text-center">
                    <Typography as={headingLevel} variant="h2" className="mb-0 justify-center text-center text-4xl tracking-normal sm:text-5xl">
                        <AnimatedText delay={0.2} stagger={0.08} content={title} className="justify-center" />
                    </Typography>
                    <div className="mx-auto mt-4 max-w-3xl text-sm leading-6 text-neutral-700 dark:text-neutral-300 sm:text-base sm:leading-7 lg:mt-6 lg:text-lg lg:leading-8">
                        <AnimatedText delay={0.6} stagger={0.03} content={description} className="justify-center" />
                    </div>
                </header>

                <div className="space-y-8 md:space-y-10">
                    <FeaturedProjectCard project={nexusProject} index={0} />
                    <TamazightFeaturedCard project={tamazightProject} />
                    <SophiaFeaturedProject project={sophiaProject} />
                    {diffShowProject && <DiffShowFeaturedCard project={diffShowProject} />}
                </div>

                <section aria-labelledby="other-projects-title" className="mt-16 border-t border-dashed border-primary/15 pt-16 md:mt-24 md:pt-20">
                    <header className="mx-auto mb-10 max-w-3xl text-center md:mb-14">
                        <Typography id="other-projects-title" as="h2" variant="h2" className="mb-3 text-4xl sm:text-5xl">
                            Other Projects
                        </Typography>
                        <p className="text-sm leading-6 text-neutral-700 dark:text-neutral-300 sm:text-base sm:leading-7">
                            Additional product, platform, accessibility, and full-stack work.
                        </p>
                    </header>

                    <div className="grid gap-6 md:grid-cols-2 md:gap-8">
                        {otherProjects.map((project, index) => (
                            <WorkCard
                                key={project.slug}
                                name={project.title}
                                description={project.tagline}
                                image={project.coverImage}
                                url={`/works/${project.slug}`}
                                tags={project.techStack}
                                layout="grid"
                                index={index}
                                githubUrl={project.githubUrl}
                                liveUrl={project.liveUrl}
                                liveUrlLabel={'liveUrlLabel' in project ? project.liveUrlLabel : undefined}
                            />
                        ))}
                    </div>
                </section>

                {showViewAllButton && (
                    <div className="flex items-center justify-center pt-4">
                        <Button as={Link} to="/works" variant="outline" className="mt-8 w-[80%] font-semibold lg:w-[40%]">
                            Explore Featured Work
                        </Button>
                    </div>
                )}
            </div>
        </SectionProvider>
    );
};
