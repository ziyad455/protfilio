import { ArrowRight, ExternalLink, Github } from 'lucide-react';
import { Link } from 'react-router-dom';

interface DiffShowProject {
    title: string;
    slug: string;
    tagline: string;
    coverImage: string;
    techStack: string[];
    githubUrl: string | null;
    liveUrl: string | null;
    liveUrlLabel?: string;
}

export const DiffShowFeaturedCard = ({ project }: { project: DiffShowProject }) => (
    <article
        className="mx-auto max-w-5xl overflow-hidden rounded-2xl border border-primary/15 bg-white/85 p-4 backdrop-blur-sm dark:bg-bg-secondary-dark sm:p-5"
        data-aos="fade-up"
        data-aos-delay="100"
        data-aos-duration="700"
        data-aos-once="true"
    >
        <div className="grid items-center gap-6 md:grid-cols-[0.9fr_1.1fr] md:gap-8">
            <img
                src={project.coverImage}
                alt="DiffShow HTML code review report interface"
                className="aspect-[16/10] h-full w-full rounded-xl object-cover object-top"
                loading="lazy"
            />

            <div className="px-1 pb-2 md:py-3 md:pr-3">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary dark:text-primary-light">
                    Featured independent project
                </p>
                <h3 className="mb-3 font-brand text-3xl leading-tight text-neutral-900 dark:text-white sm:text-4xl">
                    {project.title}
                </h3>
                <p className="mb-5 text-sm leading-6 text-neutral-600 dark:text-neutral-300 sm:text-base sm:leading-7">
                    {project.tagline}
                </p>

                <ul className="mb-6 flex flex-wrap gap-1.5" aria-label="DiffShow technologies">
                    {project.techStack.map((technology) => (
                        <li key={technology} className="rounded-full border border-primary/10 bg-primary/8 px-2.5 py-1 text-[11px] font-medium text-primary-dark dark:bg-primary/15 dark:text-primary-light">
                            {technology}
                        </li>
                    ))}
                </ul>

                <div className="flex flex-wrap gap-3">
                    <Link
                        to={`/works/${project.slug}`}
                        className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-primary-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    >
                        View Project <ArrowRight size={16} aria-hidden="true" />
                    </Link>
                    {project.liveUrl && (
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-xl border border-primary/20 px-4 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary/5 dark:text-primary-light">
                            <ExternalLink size={15} aria-hidden="true" /> {project.liveUrlLabel ?? 'Live project'}
                        </a>
                    )}
                    {project.githubUrl && (
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-xl border border-neutral-200 px-4 py-2.5 text-sm font-semibold text-neutral-700 transition-colors hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-800">
                            <Github size={15} aria-hidden="true" /> GitHub
                        </a>
                    )}
                </div>
            </div>
        </div>
    </article>
);
