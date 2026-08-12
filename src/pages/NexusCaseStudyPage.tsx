import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
    BeforeAfterComparison,
    CaseStudySection,
    ChallengeBlock,
    EvidenceFigure,
    MetricCard,
    ProjectMetadata,
    TechnicalFlow,
} from '../components/case-study/CaseStudyPrimitives';
import { nexusProject } from '../data/featuredWork';

const pillarLinks = [
    ['01', 'Accessibility Engineering', 'accessibility'],
    ['02', 'Technical SEO', 'technical-seo'],
    ['03', 'Performance & Frontend Quality', 'performance'],
    ['04', 'CMS / Content Engineering', 'cms'],
];

const pendingStory = {
    problem: 'A verified production problem will be documented here with the relevant user or system context.',
    investigation: 'The investigation path, tools, constraints, and technical reasoning will be added from project evidence.',
    solution: 'The implemented change will be explained with focused technical detail and supporting visuals where useful.',
    result: 'Only verified outcomes, measurements, and QA evidence will be published in this slot.',
};

export const NexusCaseStudyPage = () => {
    return (
        <main className="relative z-20 mx-auto w-full px-4 xl:px-0">
            <div className="site-container">
                <header className="py-12 md:py-20">
                    <Link to="/works" className="mb-10 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary-strong dark:text-primary-light">
                        <ArrowLeft size={16} aria-hidden="true" /> Back to Featured Work
                    </Link>

                    <div className="grid items-end gap-10 lg:grid-cols-[1fr_0.8fr]">
                        <div>
                            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-primary dark:text-primary-light">Flagship case study</p>
                            <h1 className="mb-6 max-w-4xl font-brand text-6xl leading-[0.95] text-neutral-900 dark:text-white sm:text-7xl lg:text-8xl">
                                {nexusProject.title}
                            </h1>
                            <p className="mb-5 max-w-3xl text-xl font-medium leading-8 text-neutral-800 dark:text-neutral-100 sm:text-2xl sm:leading-9">
                                Professional production engineering across four connected systems.
                            </p>
                            <p className="max-w-3xl text-base leading-7 text-neutral-600 dark:text-neutral-300 sm:text-lg sm:leading-8">
                                This page establishes the visual and narrative framework for my Nexus Inclusion contribution. Verified screenshots, measurements, and engineering stories will be added in the next content phase.
                            </p>
                        </div>

                        <div className="rounded-2xl border border-dashed border-primary/30 bg-primary/5 p-5 dark:bg-primary/10">
                            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary dark:text-primary-light">Evidence status</p>
                            <p className="text-sm leading-6 text-neutral-700 dark:text-neutral-200">
                                Case-study framework complete. Quantitative results and final artifacts are intentionally marked as pending until verified.
                            </p>
                        </div>
                    </div>

                    <div className="mt-10">
                        <ProjectMetadata
                            items={[
                                { label: 'Role', value: 'Software Engineer' },
                                { label: 'Context', value: 'Professional production work' },
                                { label: 'Core scope', value: 'Accessibility, SEO, frontend quality, and CMS' },
                                { label: 'Evidence', value: 'Verified artifacts being prepared' },
                            ]}
                        />
                    </div>
                </header>

                <EvidenceFigure
                    src={nexusProject.coverImage}
                    alt={nexusProject.coverAlt}
                    label="Existing Nexus Inclusion project visual"
                    caption="Existing Nexus Inclusion project visual. Final case-study screenshots and evidence captions will be curated separately."
                />

                <CaseStudySection
                    id="contribution"
                    eyebrow="Contribution overview"
                    title="One production surface, four engineering lenses"
                    introduction="These cards reserve prominent space for a small set of verified metrics. No placeholder number is presented as a real outcome."
                >
                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        <MetricCard label="Accessibility" value="Evidence pending" description="Production behavior, assistive-technology checks, and issue-level outcomes." />
                        <MetricCard label="Technical SEO" value="Evidence pending" description="Sitechecker comparisons and system-level search improvements." />
                        <MetricCard label="Performance" value="Evidence pending" description="Core Web Vitals and frontend-quality measurements." />
                        <MetricCard label="CMS delivery" value="Evidence pending" description="Content-model, validation, API, and rendering evidence." />
                    </div>
                </CaseStudySection>

                <nav aria-labelledby="pillar-navigation-title" className="pb-16 md:pb-24">
                    <h2 id="pillar-navigation-title" className="mb-6 font-brand text-3xl text-neutral-900 dark:text-white">Explore the engineering pillars</h2>
                    <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {pillarLinks.map(([number, title, id]) => (
                            <li key={id}>
                                <a href={`#${id}`} className="group flex h-full min-h-36 flex-col justify-between rounded-2xl border border-primary/15 bg-white/80 p-5 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg dark:bg-bg-secondary-dark">
                                    <span className="text-sm font-semibold text-primary dark:text-primary-light">{number}</span>
                                    <span className="flex items-end justify-between gap-3 text-base font-semibold text-neutral-800 dark:text-neutral-100">
                                        {title} <ArrowRight size={17} className="shrink-0 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                                    </span>
                                </a>
                            </li>
                        ))}
                    </ol>
                </nav>

                <CaseStudySection
                    id="accessibility"
                    number="01"
                    eyebrow="Accessibility Engineering"
                    title="Production behavior, not checklist compliance"
                    introduction="This pillar is designed for issue-level stories that connect user impact to investigation, implementation, and assistive-technology or responsive QA."
                >
                    <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {[
                            'Screen readers, keyboard, and focus',
                            'Semantics, names, and landmarks',
                            'Forms, errors, and live regions',
                            'Tables, lists, and decorative content',
                            'TalkBack and NVDA testing',
                            'Responsive accessibility behavior',
                        ].map((item) => (
                            <div key={item} className="rounded-xl border border-primary/10 bg-primary/[0.04] p-4 text-sm font-medium text-neutral-700 dark:bg-primary/[0.08] dark:text-neutral-200">
                                {item}
                            </div>
                        ))}
                    </div>
                    <ChallengeBlock title="Accessibility engineering example" {...pendingStory} />
                </CaseStudySection>

                <CaseStudySection
                    id="technical-seo"
                    number="02"
                    eyebrow="Technical SEO"
                    title="Search behavior engineered at system level"
                    introduction="The evidence pattern keeps Sitechecker results easy to scan while leaving room to explain canonical, indexing, pagination, sitemap, redirect, metadata, structured-data, and CMS-driven decisions."
                >
                    <BeforeAfterComparison
                        items={[
                            { label: 'Before', description: 'A concise baseline and selected Sitechecker evidence will be added here.' },
                            { label: 'Engineering work', description: 'The system-level implementation and constraints will be summarized here.' },
                            { label: 'After', description: 'Verified comparative results will be shown here without overwhelming tool screenshots.' },
                        ]}
                    />
                </CaseStudySection>

                <CaseStudySection
                    id="performance"
                    number="03"
                    eyebrow="Performance & Frontend Quality"
                    title="Measured performance with production UI quality"
                    introduction="This pillar can pair prominent measurements with focused visual examples of responsive, asset-loading, rendering, and Figma-to-production improvements."
                >
                    <div className="mb-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        <MetricCard label="LCP" value="Pending" description="Verified before-and-after measurement slot." />
                        <MetricCard label="CLS" value="Pending" description="Verified before-and-after measurement slot." />
                        <MetricCard label="Asset loading" value="Pending" description="Image, CSS, and lazy-loading evidence slot." />
                        <MetricCard label="UI quality" value="Pending" description="Breakpoint and production comparison slot." />
                    </div>
                    <EvidenceFigure caption="A production screenshot, Figma comparison, or focused performance artifact will be added here with its verification context." />
                </CaseStudySection>

                <CaseStudySection
                    id="cms"
                    number="04"
                    eyebrow="CMS / Content Engineering"
                    title="Content modeled through to production rendering"
                    introduction="A deliberately simple flow communicates the CMS relationship without exposing confidential internal architecture."
                >
                    <TechnicalFlow steps={['Content', 'Strapi CMS', 'API', 'Astro', 'Production website']} />
                    <div className="mt-6">
                        <EvidenceFigure label="CMS dashboard screenshot slot" caption="A verified CMS dashboard view will be added here to support content-model, validation, metadata, and integration stories." />
                    </div>
                </CaseStudySection>

                <CaseStudySection
                    id="challenges"
                    eyebrow="Selected engineering challenges"
                    title="Deeper stories, kept focused"
                    introduction="Selected examples will use the same four-stage structure so visitors can understand both the technical decision and its result."
                >
                    <ChallengeBlock title="Selected production challenge" {...pendingStory} />
                </CaseStudySection>

                <CaseStudySection
                    id="impact"
                    eyebrow="Impact"
                    title="Outcomes will be evidence-led"
                    introduction="This area is reserved for a short set of verified improvements across users, search, frontend quality, and content operations."
                >
                    <EvidenceFigure label="Verified impact summary slot" caption="Final outcomes will be added only after screenshots, measurements, or other supporting artifacts have been selected and verified." />
                </CaseStudySection>

                <CaseStudySection
                    id="process"
                    eyebrow="Engineering process"
                    title="From investigation to production"
                    introduction="The final version will connect each case-study example to the practical engineering loop used to deliver it."
                >
                    <TechnicalFlow steps={['Investigate', 'Implement', 'Test', 'QA', 'Production follow-up']} />
                </CaseStudySection>

                <CaseStudySection
                    id="reflection"
                    eyebrow="Reflection"
                    title="What the work changed in my engineering practice"
                    introduction="A concise, engineering-focused reflection will be added once the final evidence and challenge selection establish the strongest through-line."
                >
                    <div className="rounded-2xl border border-dashed border-primary/30 bg-primary/5 p-6 dark:bg-primary/10 sm:p-8">
                        <p className="text-sm leading-7 text-neutral-600 dark:text-neutral-300">Reflection content placeholder — no project outcome or lesson is being inferred before the verified case-study content is supplied.</p>
                    </div>
                </CaseStudySection>

                <div className="flex flex-col gap-4 border-t border-dashed border-primary/15 py-12 sm:flex-row sm:items-center sm:justify-between">
                    <Link to="/works" className="inline-flex items-center gap-2 font-semibold text-primary hover:text-primary-strong dark:text-primary-light">
                        <ArrowLeft size={17} aria-hidden="true" /> Featured Work
                    </Link>
                    <a href={nexusProject.externalUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-semibold text-primary hover:text-primary-strong dark:text-primary-light">
                        Visit Nexus Inclusion <ExternalLink size={17} aria-hidden="true" />
                    </a>
                </div>
            </div>
        </main>
    );
};
