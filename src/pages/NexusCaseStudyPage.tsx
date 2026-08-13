import { ArrowLeft, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CaseStudySection } from '../components/case-study/CaseStudyPrimitives';
import { nexusProject } from '../data/featuredWork';

const accessibilityHighlights = [
    'Semantic structure, headings, accessible names, and landmarks',
    'Keyboard navigation, focus management, and skip links',
    'Forms, validation, errors, ARIA, and live announcements',
    'Responsive screen-reader behavior tested with TalkBack and NVDA',
];

const performanceHighlights = [
    'Core Web Vitals, LCP, CLS, and loading priority',
    'Asset loading, image sizing, caching, and render-blocking resources',
    'DOM size, forced reflows, and layout stability',
    'Responsive QA and Figma-to-production accuracy across breakpoints',
];

export const NexusCaseStudyPage = () => {
    return (
        <main className="relative z-20 mx-auto w-full px-4 xl:px-0">
            <article className="site-container">
                <header className="py-12 md:py-20">
                    <Link to="/works" className="mb-10 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary-strong dark:text-primary-light">
                        <ArrowLeft size={16} aria-hidden="true" /> Back to Main Projects
                    </Link>

                    <div className="max-w-4xl">
                        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-primary dark:text-primary-light">Professional production work</p>
                        <h1 className="mb-7 font-brand text-6xl leading-[0.95] text-neutral-900 dark:text-white sm:text-7xl lg:text-8xl">
                            {nexusProject.title}
                        </h1>
                        <p className="max-w-3xl text-lg leading-8 text-neutral-600 dark:text-neutral-300 sm:text-xl sm:leading-9">
                            Engineering an accessibility company&apos;s own digital experience across accessibility, frontend quality, technical SEO, and CMS-driven delivery.
                        </p>
                    </div>

                    <dl className="mt-10 flex flex-col gap-5 border-y border-primary/15 py-6 sm:flex-row sm:flex-wrap sm:gap-x-12">
                        {[
                            ['Role', 'Software Engineer'],
                            ['Technologies', 'Astro, TypeScript, SCSS, Strapi'],
                            ['Focus', 'Accessibility, performance, SEO, and CMS'],
                        ].map(([label, value]) => (
                            <div key={label}>
                                <dt className="mb-1 text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500 dark:text-neutral-400">{label}</dt>
                                <dd className="text-sm font-medium text-neutral-800 dark:text-neutral-100">{value}</dd>
                            </div>
                        ))}
                    </dl>
                </header>

                <figure>
                    <img
                        src="/assets/projects/nexus.png"
                        alt="Nexus Inclusion brand illustration showing a team collaborating around a laptop"
                        className="aspect-[1200/630] w-full rounded-2xl object-cover"
                    />
                    <figcaption className="mt-3 text-sm leading-6 text-neutral-500 dark:text-neutral-400">
                        Nexus Inclusion builds digital accessibility solutions for organizations and their teams.
                    </figcaption>
                </figure>

                <CaseStudySection
                    id="accessibility"
                    number="01"
                    title="Accessibility Engineering"
                    introduction="Because accessibility is the product Nexus provides to others, we held our own platform to the same standard. I worked across semantics, keyboard interaction, focus, forms, dynamic announcements, screen-reader behavior, and responsive experiences to make accessibility part of the implementation itself."
                >
                    <div className="grid items-start gap-12 lg:grid-cols-[1fr_0.72fr] lg:gap-20">
                        <ul className="space-y-4" aria-label="Accessibility engineering highlights">
                            {accessibilityHighlights.map((highlight) => (
                                <li key={highlight} className="flex gap-4 text-sm leading-7 text-neutral-700 dark:text-neutral-300 sm:text-base">
                                    <span className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-primary dark:bg-primary-light" aria-hidden="true" />
                                    {highlight}
                                </li>
                            ))}
                        </ul>

                        <figure>
                            <img
                                src="/assets/projects/nexus_on_newspeapere.png"
                                alt="Newspaper article featuring Nexus Inclusion and its work in digital accessibility"
                                className="aspect-[4/5] w-full rounded-xl object-cover object-top"
                                loading="lazy"
                            />
                            <figcaption className="mt-3 text-sm leading-6 text-neutral-500 dark:text-neutral-400">
                                Nexus Inclusion featured in the news for its work helping organizations improve digital accessibility and inclusion.
                            </figcaption>
                        </figure>
                    </div>
                </CaseStudySection>

                <CaseStudySection
                    id="performance"
                    number="02"
                    title="Performance & Frontend Quality"
                    introduction="I used performance tools and production evidence to trace frontend problems back to their source, then improve loading behavior, layout stability, responsive implementation, and UI accuracy across breakpoints."
                >
                    <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
                        <div>
                            <p className="mb-7 text-base leading-8 text-neutral-600 dark:text-neutral-300">
                                The work moved from evidence to implementation: investigating issues such as an eagerly loaded 2.7 MB audio asset, render-blocking CSS, oversized DOMs, and unstable image or decorative layouts before making focused frontend improvements.
                            </p>
                            <ul className="space-y-3" aria-label="Performance and frontend quality highlights">
                                {performanceHighlights.map((highlight) => (
                                    <li key={highlight} className="flex gap-4 text-sm leading-7 text-neutral-700 dark:text-neutral-300">
                                        <span className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-primary dark:bg-primary-light" aria-hidden="true" />
                                        {highlight}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <figure className="self-start border-y border-dashed border-primary/25 py-12 text-center">
                            <p className="font-brand text-2xl text-primary dark:text-primary-light">Performance evidence coming next</p>
                            <figcaption className="mx-auto mt-3 max-w-md text-sm leading-6 text-neutral-500 dark:text-neutral-400">
                                A focused performance artifact or production UI comparison will be placed here once the final evidence is selected.
                            </figcaption>
                        </figure>
                    </div>
                </CaseStudySection>

                <CaseStudySection
                    id="technical-seo"
                    number="03"
                    title="Technical SEO"
                    introduction="I helped turn audit findings into reusable engineering fixes across canonicals, sitemaps, indexing rules, redirects, metadata, structured data, internal links, and template-level SEO behavior."
                >
                    <div className="grid gap-10 md:grid-cols-2" aria-label="Sitechecker audit before and after comparison">
                        <figure>
                            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-neutral-600 dark:text-neutral-300">Before</p>
                            <a href="/assets/projects/sitechecker-befor.png" target="_blank" rel="noopener noreferrer">
                                <img
                                    src="/assets/projects/sitechecker-befor.png"
                                    alt="Sitechecker audit before the technical SEO work, showing critical issues and a lower website score"
                                    className="w-full rounded-lg object-contain"
                                    loading="lazy"
                                />
                            </a>
                            <figcaption className="mt-3 text-sm leading-6 text-neutral-500 dark:text-neutral-400">Initial Sitechecker audit baseline.</figcaption>
                        </figure>

                        <figure>
                            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-primary dark:text-primary-light">After</p>
                            <a href="/assets/projects/sitechecker-after.png" target="_blank" rel="noopener noreferrer">
                                <img
                                    src="/assets/projects/sitechecker-after.png"
                                    alt="Sitechecker audit after the technical SEO work, showing zero critical issues and an improved website score"
                                    className="w-full rounded-lg object-contain"
                                    loading="lazy"
                                />
                            </a>
                            <figcaption className="mt-3 text-sm leading-6 text-neutral-500 dark:text-neutral-400">Follow-up audit after template and system-level improvements.</figcaption>
                        </figure>
                    </div>
                </CaseStudySection>

                <CaseStudySection
                    id="cms"
                    number="04"
                    title="CMS / Content Engineering"
                    introduction="I customized Strapi content structures, fields, validation, media, and SEO controls so editors could provide the structured information required by frontend components and production search behavior."
                >
                    <figure>
                        <img
                            src="/assets/projects/cms.png"
                            alt="Strapi administration dashboard showing recently edited and published Nexus content entries"
                            className="aspect-video w-full rounded-xl object-cover object-top"
                            loading="lazy"
                        />
                        <figcaption className="mt-3 text-sm leading-6 text-neutral-500 dark:text-neutral-400">
                            Strapi connected structured content to Astro components, SEO metadata, and the production website.
                        </figcaption>
                    </figure>
                </CaseStudySection>

                <footer className="flex flex-col gap-4 border-t border-primary/15 py-12 sm:flex-row sm:items-center sm:justify-between">
                    <Link to="/works" className="inline-flex items-center gap-2 font-semibold text-primary hover:text-primary-strong dark:text-primary-light">
                        <ArrowLeft size={17} aria-hidden="true" /> Main Projects
                    </Link>
                    <a href={nexusProject.externalUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-semibold text-primary hover:text-primary-strong dark:text-primary-light">
                        Visit Nexus Inclusion <ExternalLink size={17} aria-hidden="true" />
                    </a>
                </footer>
            </article>
        </main>
    );
};
