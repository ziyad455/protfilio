import { useParams, Link } from 'react-router-dom';
import { SectionProvider } from '../components/ui/SectionProvider';
import { Typography } from '../components/ui/Typography';
import { Button } from '../components/ui/Button';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import projectsData from '../data/projects.json';

export const WorkDetailPage = () => {
    const { slug } = useParams();

    const project = projectsData.find((p) => p.slug === slug);

    if (!project) {
        return (
            <main>
                <SectionProvider className="py-24 md:py-32 min-h-[70vh] flex items-center justify-center">
                    <div className="text-center">
                        <Typography as="h1" variant="h1" className="text-4xl mb-4">
                            Project Not Found
                        </Typography>
                        <p className="text-neutral-500 mb-8">The project you're looking for doesn't exist or has been removed.</p>
                        <Button as={Link} to="/works" variant="outline">
                            <ArrowLeft aria-hidden="true" size={16} className="mr-2" /> Back to Works
                        </Button>
                    </div>
                </SectionProvider>
            </main>
        );
    }

    return (
        <main className="relative site-container z-20 w-full mx-auto px-4 xl:px-0">
            <SectionProvider className="py-16 md:py-24">
                {/* Back button */}
                <div className="mb-8" data-aos="fade-up-sm">
                    <Button as={Link} to="/works" variant="ghost" size="sm">
                        <ArrowLeft size={16} className="mr-2" /> Back to Works
                    </Button>
                </div>

                {/* Header */}
                <div className="max-w-4xl mb-12" data-aos="fade-up-sm" data-aos-delay="100">
                    <Typography as="h1" variant="h1" className="text-4xl md:text-5xl lg:text-6xl mb-4 leading-tight">
                        {project.title}
                    </Typography>
                    {project.tagline && (
                        <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed">
                            {project.tagline}
                        </p>
                    )}
                </div>

                {/* Action buttons */}
                <div className="flex flex-wrap gap-3 mb-12" data-aos="fade-up-sm" data-aos-delay="150">
                    {project.liveUrl ? (
                        <Button as="a" href={project.liveUrl} target="_blank" rel="noopener noreferrer" variant="primary">
                            {('liveUrlLabel' in project && project.liveUrlLabel) || 'Live Demo'} <ExternalLink size={16} className="ml-2" />
                        </Button>
                    ) : (
                        <Button variant="primary" disabled className="opacity-50 cursor-not-allowed pointer-events-none">
                            {('liveUrlLabel' in project && project.liveUrlLabel) || 'Live Demo'} <ExternalLink size={16} className="ml-2" />
                        </Button>
                    )}
                    {project.githubUrl ? (
                        <Button as="a" href={project.githubUrl} target="_blank" rel="noopener noreferrer" variant="outline">
                            <Github size={16} className="mr-2" /> Source Code
                        </Button>
                    ) : (
                        <Button variant="outline" disabled className="opacity-50 cursor-not-allowed pointer-events-none">
                            <Github size={16} className="mr-2" /> Source Code
                        </Button>
                    )}
                </div>

                {/* Cover image */}
                {project.coverImage && (
                    <div className="rounded-2xl overflow-hidden mb-12 border border-neutral-200/50 dark:border-neutral-700/50" data-aos="fade-up-sm" data-aos-delay="200">
                        <img
                            src={project.coverImage}
                            alt={project.title}
                            className="w-full h-auto object-cover"
                        />
                    </div>
                )}

                {/* Tech stack */}
                {project.techStack && project.techStack.length > 0 && (
                    <div className="mb-12" data-aos="fade-up-sm" data-aos-delay="250">
                        <Typography as="h2" variant="h3" className="text-xl mb-4">
                            Tech Stack
                        </Typography>
                        <div className="flex flex-wrap gap-2">
                            {project.techStack.map((tech) => (
                                <span
                                    key={tech}
                                    className="px-4 py-2 rounded-xl bg-gradient-to-b from-[#f7f8f0] to-[#f1f2f9] dark:from-gray-900 dark:to-gray-800 border border-gray-200/50 dark:border-gray-700/50 text-neutral-700 dark:text-neutral-200 font-medium text-sm"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Description */}
                {project.description && (
                    <div className="max-w-4xl" data-aos="fade-up-sm" data-aos-delay="300">
                        <Typography as="h2" variant="h3" className="text-xl mb-4">
                            About This Project
                        </Typography>
                        <div className="prose prose-lg dark:prose-invert max-w-none text-neutral-700 dark:text-neutral-300 leading-relaxed whitespace-pre-line">
                            {project.description}
                        </div>
                    </div>
                )}

                {/* Gallery */}
                {project.gallery && project.gallery.length > 0 && (
                    <div className="mt-16" data-aos="fade-up-sm" data-aos-delay="350">
                        <Typography as="h2" variant="h3" className="text-xl mb-6">
                            Gallery
                        </Typography>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {project.gallery.map((imgUrl, i) => (
                                <div key={i} className="rounded-2xl overflow-hidden border border-neutral-200/50 dark:border-neutral-700/50">
                                    <img src={imgUrl} alt={`${project.title} screenshot ${i + 1}`} className="w-full h-auto object-cover" loading="lazy" />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </SectionProvider>
        </main>
    );
};
