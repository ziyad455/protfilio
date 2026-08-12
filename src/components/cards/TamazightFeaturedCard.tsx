import { ExternalLink, Github } from 'lucide-react';
import type { TamazightFeaturedProject } from '../../data/featuredWork';

export const TamazightFeaturedCard = ({ project }: { project: TamazightFeaturedProject }) => {
    const [primaryImage, kaggleImage, technicalImage] = project.images;

    return (
        <article
            className="mx-auto max-w-6xl overflow-hidden rounded-3xl border border-primary/15 bg-white/85 p-4 backdrop-blur-sm dark:bg-bg-secondary-dark sm:p-6 lg:p-7"
            data-aos="fade-up"
            data-aos-delay="100"
            data-aos-duration="700"
            data-aos-once="true"
        >
            <div className="grid items-center gap-7 lg:grid-cols-[0.92fr_1.08fr] lg:gap-10">
                <div className="px-1 pt-2 sm:px-2 lg:py-3">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-primary dark:text-primary-light">
                        {project.eyebrow}
                    </p>
                    <h3 className="mb-4 font-brand text-4xl leading-tight text-neutral-900 dark:text-white sm:text-5xl">
                        {project.title}
                    </h3>
                    <p className="mb-5 text-base leading-7 text-neutral-600 dark:text-neutral-300 sm:text-lg sm:leading-8">
                        {project.summary}
                    </p>

                    <div className="mb-5 rounded-2xl border border-primary/15 bg-primary/[0.05] p-4 dark:bg-primary/10">
                        <p className="mb-1 text-xs font-semibold uppercase tracking-[0.15em] text-primary dark:text-primary-light">My role</p>
                        <p className="text-sm font-medium leading-6 text-neutral-800 dark:text-neutral-100">{project.role}</p>
                    </div>

                    <p className="mb-6 text-sm leading-6 text-neutral-600 dark:text-neutral-400">
                        <span className="font-semibold text-neutral-800 dark:text-neutral-200">Team project scope: </span>
                        {project.teamScope}
                    </p>

                    <ul className="mb-6 grid gap-2" aria-label="Personal contribution areas">
                        {project.contributionAreas.map((area, index) => (
                            <li key={area} className="flex items-start gap-3 text-sm leading-6 text-neutral-700 dark:text-neutral-300">
                                <span className="mt-0.5 font-semibold text-primary dark:text-primary-light" aria-hidden="true">
                                    {String(index + 1).padStart(2, '0')}
                                </span>
                                {area}
                            </li>
                        ))}
                    </ul>

                    <ul className="mb-7 flex flex-wrap gap-1.5" aria-label="Tamazight MultiLingo technologies">
                        {project.technologies.map((technology) => (
                            <li key={technology} className="rounded-full border border-primary/10 bg-primary/8 px-2.5 py-1 text-[11px] font-medium text-primary-dark dark:bg-primary/15 dark:text-primary-light">
                                {technology}
                            </li>
                        ))}
                    </ul>

                    <div className="flex flex-wrap gap-3">
                        <a
                            href={project.links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-primary-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                        >
                            <Github size={16} aria-hidden="true" /> GitHub
                        </a>
                        <a
                            href={project.links.kaggle}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-xl border border-primary/20 px-4 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary/5 dark:text-primary-light"
                        >
                            <ExternalLink size={15} aria-hidden="true" /> Kaggle Hackathon
                        </a>
                    </div>
                </div>

                {primaryImage && (
                    <figure className="overflow-hidden rounded-2xl border border-primary/10 bg-neutral-100 dark:bg-neutral-900">
                        <img
                            src={primaryImage.src}
                            alt={primaryImage.alt}
                            className="aspect-video w-full object-cover"
                            loading="lazy"
                        />
                        <figcaption className="border-t border-primary/10 px-4 py-3 text-xs leading-5 text-neutral-600 dark:text-neutral-300">
                            {primaryImage.caption}
                        </figcaption>
                    </figure>
                )}
            </div>

            <div className="mt-6 grid gap-5 md:grid-cols-[1.08fr_0.92fr]">
                {[kaggleImage, technicalImage].filter(Boolean).map((image) => (
                    <figure key={image.src} className="overflow-hidden rounded-2xl border border-primary/10 bg-neutral-100 dark:bg-neutral-900">
                        <img
                            src={image.src}
                            alt={image.alt}
                            className="aspect-[16/9] w-full object-cover object-top"
                            loading="lazy"
                        />
                        <figcaption className="border-t border-primary/10 px-4 py-3 text-xs leading-5 text-neutral-600 dark:text-neutral-300">
                            {image.caption}
                        </figcaption>
                    </figure>
                ))}
            </div>
        </article>
    );
};
