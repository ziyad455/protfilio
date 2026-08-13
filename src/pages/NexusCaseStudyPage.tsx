import { ArrowLeft, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CaseStudySection } from '../components/case-study/CaseStudyPrimitives';
import { ImageLightbox } from '../components/ui/ImageLightbox';
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

const nexusImages = {
    hero: {
        src: '/assets/projects/nexus.png',
        alt: 'Nexus Inclusion brand illustration showing a team collaborating around a laptop',
        caption: 'Nexus Inclusion builds digital accessibility solutions for organizations and their teams.',
    },
    newspaper: {
        src: '/assets/projects/nexus_on_newspeapere.png',
        alt: 'Newspaper article featuring Nexus Inclusion and its work in digital accessibility',
        caption: 'Nexus Inclusion featured in the news for its work helping organizations improve digital accessibility and inclusion.',
    },
    seoBefore: {
        src: '/assets/projects/sitechecker-befor.png',
        alt: 'Sitechecker audit before the technical SEO work, showing critical issues and a lower website score',
        caption: 'Initial Sitechecker audit baseline.',
    },
    seoAfter: {
        src: '/assets/projects/sitechecker-after.png',
        alt: 'Sitechecker audit after the technical SEO work, showing zero critical issues and an improved website score',
        caption: 'Follow-up audit after template and system-level improvements.',
    },
    cms: {
        src: '/assets/projects/cms.png',
        alt: 'Strapi administration dashboard showing recently edited and published Nexus content entries',
        caption: 'Strapi connected structured content to Astro components, SEO metadata, and the production website.',
    },
};

export const NexusCaseStudyPage = () => {
    return (
        <main className="relative z-20 mx-auto w-full px-4 xl:px-0">
            <article className="site-container">
                <header className="py-12 md:py-20">
                    <Link to="/works" className="mb-10 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary-strong dark:text-primary-light">
                        <ArrowLeft size={16} aria-hidden="true" /> Back to Main Projects
                    </Link>

                    <div className="grid items-center gap-10 lg:grid-cols-[0.58fr_0.42fr] lg:gap-16">
                        <div>
                            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-primary dark:text-primary-light">Professional production work</p>
                            <h1 className="mb-7 font-brand text-6xl leading-[0.95] text-neutral-900 dark:text-white sm:text-7xl lg:text-8xl">
                                {nexusProject.title}
                            </h1>
                            <p className="text-lg leading-8 text-neutral-600 dark:text-neutral-300 sm:text-xl sm:leading-9">
                                Engineering an accessibility company&apos;s own digital experience across accessibility, frontend quality, technical SEO, and CMS-driven delivery.
                            </p>
                            <a
                                href={nexusProject.externalUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-7 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-primary-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                            >
                                Visit Nexus Inclusion <ExternalLink size={16} aria-hidden="true" />
                            </a>
                        </div>

                        <ImageLightbox image={nexusImages.hero} />
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

                <CaseStudySection
                    id="accessibility"
                    number="01"
                    title="Accessibility Engineering"
                >
                    <div className="grid items-start gap-12 lg:grid-cols-[1fr_0.72fr] lg:gap-20">
                        <div>
                            <p className="mb-7 text-base leading-8 text-neutral-600 dark:text-neutral-300 sm:text-lg">
                                Because accessibility is the product Nexus provides to others, we held our own platform to the same standard. I worked across semantics, keyboard interaction, focus, forms, dynamic announcements, screen-reader behavior, and responsive experiences to make accessibility part of the implementation itself.
                            </p>
                            <ul className="space-y-4" aria-label="Accessibility engineering highlights">
                                {accessibilityHighlights.map((highlight) => (
                                    <li key={highlight} className="flex gap-4 text-sm leading-7 text-neutral-700 dark:text-neutral-300 sm:text-base">
                                        <span className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-primary dark:bg-primary-light" aria-hidden="true" />
                                        {highlight}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <ImageLightbox image={nexusImages.newspaper} />
                    </div>
                </CaseStudySection>

                <CaseStudySection
                    id="performance"
                    number="02"
                    title="Performance & Frontend Quality"
                >
                    <div className="max-w-4xl">
                        <p className="mb-7 text-base leading-8 text-neutral-600 dark:text-neutral-300 sm:text-lg">
                            I used performance tools and production evidence to trace frontend problems back to their source, then improve loading behavior, layout stability, responsive implementation, and UI accuracy across breakpoints.
                        </p>
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
                </CaseStudySection>

                <CaseStudySection
                    id="technical-seo"
                    number="03"
                    title="Technical SEO"
                >
                    <div className="grid items-start gap-12 lg:grid-cols-[0.34fr_0.66fr] lg:gap-16">
                        <p className="text-base leading-8 text-neutral-600 dark:text-neutral-300 sm:text-lg">
                            I helped turn audit findings into reusable engineering fixes across canonicals, sitemaps, indexing rules, redirects, metadata, structured data, internal links, and template-level SEO behavior.
                        </p>

                        <div className="grid gap-8 sm:grid-cols-2" aria-label="Sitechecker audit before and after comparison">
                            <div>
                                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-neutral-600 dark:text-neutral-300">Before</p>
                                <ImageLightbox image={nexusImages.seoBefore} />
                            </div>

                            <div>
                                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-primary dark:text-primary-light">After</p>
                                <ImageLightbox image={nexusImages.seoAfter} />
                            </div>
                        </div>
                    </div>
                </CaseStudySection>

                <CaseStudySection
                    id="cms"
                    number="04"
                    title="CMS / Content Engineering"
                >
                    <div className="grid items-start gap-12 lg:grid-cols-[0.42fr_0.58fr] lg:gap-16">
                        <p className="text-base leading-8 text-neutral-600 dark:text-neutral-300 sm:text-lg">
                            I customized Strapi content structures, fields, validation, media, and SEO controls so editors could provide the structured information required by frontend components and production search behavior.
                        </p>

                        <ImageLightbox image={nexusImages.cms} />
                    </div>
                </CaseStudySection>

                <footer className="border-t border-primary/15 py-12">
                    <Link to="/works" className="inline-flex items-center gap-2 font-semibold text-primary hover:text-primary-strong dark:text-primary-light">
                        <ArrowLeft size={17} aria-hidden="true" /> Main Projects
                    </Link>
                </footer>
            </article>
        </main>
    );
};
