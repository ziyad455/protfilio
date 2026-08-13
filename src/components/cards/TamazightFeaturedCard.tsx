import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { TamazightFeaturedProject } from '../../data/featuredWork';

export const TamazightFeaturedCard = ({ project }: { project: TamazightFeaturedProject }) => {
    const [primaryImage] = project.images;

    return (
        <article
            className="mx-auto max-w-6xl overflow-hidden rounded-3xl border border-primary/15 bg-white/85 p-5 backdrop-blur-sm dark:bg-bg-secondary-dark sm:p-7 lg:p-8"
            data-aos="fade-up"
            data-aos-delay="100"
            data-aos-duration="700"
            data-aos-once="true"
        >
            <div className="grid items-center gap-8 lg:grid-cols-[0.48fr_0.52fr] lg:gap-12">
                <img
                    src={primaryImage.src}
                    alt={primaryImage.alt}
                    className="aspect-video w-full rounded-2xl object-cover"
                    loading="lazy"
                />

                <div>
                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-primary dark:text-primary-light">{project.eyebrow}</p>
                    <h3 className="mb-4 font-brand text-4xl leading-tight text-neutral-900 dark:text-white sm:text-5xl">{project.title}</h3>
                    <p className="mb-5 text-base leading-7 text-neutral-600 dark:text-neutral-300 sm:text-lg">{project.summary}</p>
                    <p className="mb-3 text-sm font-semibold leading-6 text-neutral-800 dark:text-neutral-100">{project.role}</p>
                    <p className="mb-7 text-sm leading-6 text-neutral-500 dark:text-neutral-400">
                        Gemma 3n · Hugging Face · React Native · TypeScript · SQLite · Convex
                    </p>

                    <Link
                        to={`/works/${project.slug}`}
                        className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-primary-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 dark:bg-primary-dark dark:hover:bg-primary"
                    >
                        View Details <ArrowRight size={17} aria-hidden="true" />
                    </Link>
                </div>
            </div>
        </article>
    );
};
