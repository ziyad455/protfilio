import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { SophiaFeaturedProject as SophiaProject } from '../../data/featuredWork';

export const SophiaFeaturedProject = ({ project }: { project: SophiaProject }) => (
    <article
        className="mx-auto max-w-6xl overflow-hidden rounded-3xl border border-primary/15 bg-white/85 p-5 backdrop-blur-sm dark:bg-bg-secondary-dark sm:p-7 lg:p-8"
        data-aos="fade-up"
        data-aos-delay="150"
        data-aos-duration="700"
        data-aos-once="true"
    >
        <div className="grid items-center gap-8 md:grid-cols-[0.36fr_0.64fr] lg:gap-12">
            <img
                src={project.logo}
                alt="Sophia project logo featuring a reader above an open book"
                className="mx-auto aspect-[3/4] w-full max-w-[260px] rounded-2xl object-cover shadow-xl shadow-neutral-950/10 md:max-w-none"
                loading="lazy"
            />

            <div>
                <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-2">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary dark:text-primary-light">Private personal project</p>
                    <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">{project.status}</span>
                </div>
                <h3 className="mb-2 font-brand text-4xl leading-tight text-neutral-900 dark:text-white sm:text-5xl">{project.title}</h3>
                <p className="mb-5 font-brand text-2xl italic text-primary dark:text-primary-light">{project.tagline}</p>
                <p className="mb-5 text-base leading-7 text-neutral-600 dark:text-neutral-300">{project.summary}</p>
                <p className="mb-2 text-sm font-semibold text-neutral-800 dark:text-neutral-100">{project.role}</p>
                <p className="mb-7 text-sm leading-6 text-neutral-500 dark:text-neutral-400">{project.technologies}</p>

                <Link
                    to="/works/sophia"
                    className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-primary-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 dark:bg-primary-dark dark:hover:bg-primary"
                >
                    View Details <ArrowRight size={17} aria-hidden="true" />
                </Link>
            </div>
        </div>
    </article>
);
