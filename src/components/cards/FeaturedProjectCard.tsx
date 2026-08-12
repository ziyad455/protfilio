import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { FeaturedProject } from '../../data/featuredWork';

interface FeaturedProjectCardProps {
    project: FeaturedProject;
    index: number;
}

export const FeaturedProjectCard = ({ project, index }: FeaturedProjectCardProps) => {
    const imageFirst = index % 2 === 0;

    return (
        <article
            className="group overflow-hidden rounded-3xl border border-primary/15 bg-white/85 p-4 backdrop-blur-sm dark:bg-bg-secondary-dark sm:p-6 lg:p-8"
            data-aos="fade-up"
            data-aos-delay={index * 100}
            data-aos-duration="700"
            data-aos-once="true"
        >
            <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
                <figure className={`relative overflow-hidden rounded-2xl bg-neutral-100 dark:bg-neutral-900 ${imageFirst ? '' : 'lg:order-2'}`}>
                    <img
                        src={project.coverImage}
                        alt={project.coverAlt}
                        className="aspect-[16/10] h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
                        loading="lazy"
                    />
                    <figcaption className="absolute bottom-3 left-3 rounded-full bg-neutral-950/75 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md">
                        Existing project visual
                    </figcaption>
                </figure>

                <div className={imageFirst ? '' : 'lg:order-1'}>
                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-primary dark:text-primary-light">
                        {project.eyebrow}
                    </p>
                    <h3 className="mb-4 font-brand text-4xl leading-tight text-neutral-900 dark:text-white sm:text-5xl">
                        {project.title}
                    </h3>
                    <p className="mb-3 text-sm font-semibold leading-6 text-neutral-800 dark:text-neutral-200 sm:text-base">
                        {project.role}
                    </p>
                    <p className="mb-6 leading-7 text-neutral-600 dark:text-neutral-400">
                        {project.summary}
                    </p>

                    <ul className="mb-7 grid gap-2 sm:grid-cols-2" aria-label="Engineering areas">
                        {project.areas.map((area, areaIndex) => (
                            <li key={area} className="flex items-start gap-2 text-sm text-neutral-700 dark:text-neutral-300">
                                <span className="font-semibold text-primary dark:text-primary-light" aria-hidden="true">
                                    {String(areaIndex + 1).padStart(2, '0')}
                                </span>
                                {area}
                            </li>
                        ))}
                    </ul>

                    <p className="mb-7 border-l-2 border-primary/40 pl-4 text-sm leading-6 text-neutral-600 dark:text-neutral-400">
                        {project.outcomeSummary}
                    </p>

                    <Link
                        to={`/works/${project.slug}`}
                        className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 dark:bg-primary-dark dark:hover:bg-primary"
                    >
                        View Case Study <ArrowRight size={18} aria-hidden="true" />
                    </Link>
                </div>
            </div>
        </article>
    );
};
