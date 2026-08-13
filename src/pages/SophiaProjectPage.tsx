import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';
import { ImageLightbox } from '../components/ui/ImageLightbox';
import { sophiaProject } from '../data/featuredWork';

interface EditorialSectionProps {
    eyebrow: string;
    title: string;
    children: ReactNode;
}

const EditorialSection = ({ eyebrow, title, children }: EditorialSectionProps) => (
    <section className="border-t border-primary/15 py-20 md:py-28">
        <header className="mb-10 max-w-3xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-primary dark:text-primary-light">{eyebrow}</p>
            <h2 className="font-brand text-4xl leading-tight text-neutral-900 dark:text-white sm:text-5xl">{title}</h2>
        </header>
        {children}
    </section>
);

export const SophiaProjectPage = () => {
    const [overviewImage, systemImage, databaseImage] = sophiaProject.architectureImages;

    return (
        <main className="relative z-20 mx-auto w-full px-4 xl:px-0">
            <article className="site-container">
                <header className="py-12 md:py-20">
                    <Link to="/works" className="mb-10 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary-strong dark:text-primary-light">
                        <ArrowLeft size={16} aria-hidden="true" /> Back to Main Projects
                    </Link>

                    <div className="grid items-center gap-10 lg:grid-cols-[0.3fr_0.7fr] lg:gap-16">
                        <img
                            src={sophiaProject.logo}
                            alt="Sophia project logo featuring a reader above an open book"
                            className="mx-auto aspect-[3/4] w-full max-w-xs rounded-2xl object-cover shadow-2xl shadow-neutral-950/15"
                        />

                        <div>
                            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-primary dark:text-primary-light">Private personal project</p>
                            <h1 className="mb-2 font-brand text-6xl leading-[0.95] text-neutral-900 dark:text-white sm:text-7xl lg:text-8xl">{sophiaProject.title}</h1>
                            <p className="mb-7 font-brand text-3xl italic text-primary dark:text-primary-light">{sophiaProject.tagline}</p>
                            <div className="space-y-4 text-base leading-8 text-neutral-600 dark:text-neutral-300 sm:text-lg">
                                <p>Sophia is a private philosophy reading companion I&apos;m designing and building end-to-end.</p>
                                <p>The idea came from wanting a better environment for books that require attention and reflection—without constantly switching between a PDF reader, notes, highlights, and an AI assistant.</p>
                                <p className="font-medium text-neutral-800 dark:text-neutral-100">AI is intended to support reading, not replace it.</p>
                            </div>
                        </div>
                    </div>

                    <dl className="mt-12 flex flex-col gap-5 border-y border-primary/15 py-6 sm:flex-row sm:flex-wrap sm:gap-x-12">
                        {[
                            ['Status', sophiaProject.status],
                            ['Role', sophiaProject.role],
                            ['Core stack', sophiaProject.technologies],
                        ].map(([label, value]) => (
                            <div key={label}>
                                <dt className="mb-1 text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500 dark:text-neutral-400">{label}</dt>
                                <dd className="text-sm font-medium text-neutral-800 dark:text-neutral-100">{value}</dd>
                            </div>
                        ))}
                    </dl>
                </header>

                <EditorialSection eyebrow="Product philosophy" title="The model should not be the product">
                    <p className="max-w-3xl text-base leading-8 text-neutral-600 dark:text-neutral-300 sm:text-lg">
                        The book, reader state, annotations, context, ownership, and application logic belong to Sophia. An AI model should eventually be a replaceable part of that system rather than the foundation the entire product depends on.
                    </p>
                </EditorialSection>

                <EditorialSection eyebrow="Architecture overview" title="Reading first, intelligence around it">
                    <div className="grid items-start gap-10 lg:grid-cols-[0.42fr_0.58fr] lg:gap-16">
                        <p className="text-base leading-8 text-neutral-600 dark:text-neutral-300 sm:text-lg">
                            Sophia preserves the original reading experience while building processing, privacy, and future contextual assistance around it.
                        </p>
                        <ImageLightbox image={overviewImage} />
                    </div>
                </EditorialSection>

                <EditorialSection eyebrow="System architecture" title="A private full-stack application">
                    <div className="grid items-start gap-10 lg:grid-cols-[0.58fr_0.42fr] lg:gap-16">
                        <ImageLightbox image={systemImage} />
                        <p className="text-base leading-8 text-neutral-600 dark:text-neutral-300 sm:text-lg">
                            The system connects a React reader to an Express API, PostgreSQL and Prisma persistence, private file storage, authentication, ownership-aware services, book processing, reading state, highlights, notes, and planned AI orchestration.
                        </p>
                    </div>
                </EditorialSection>

                <EditorialSection eyebrow="PDF processing" title="What the reader sees and what the system understands">
                    <p className="mb-8 max-w-3xl text-base leading-8 text-neutral-600 dark:text-neutral-300">
                        The original PDF remains the authoritative visual source. Sophia streams it through a protected reader while the backend separately extracts a stable structure for navigation, citations, search, future AI context, and future semantic retrieval.
                    </p>
                    <div className="grid gap-8 border-y border-primary/15 py-8 md:grid-cols-2">
                        <div>
                            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary dark:text-primary-light">Reading path</p>
                            <p className="font-brand text-2xl text-neutral-900 dark:text-white">Original PDF → Protected Reader</p>
                        </div>
                        <div>
                            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary dark:text-primary-light">Processing path</p>
                            <p className="font-brand text-2xl text-neutral-900 dark:text-white">PDF → Pages → Chapters → Chunks</p>
                        </div>
                    </div>
                </EditorialSection>

                <EditorialSection eyebrow="Privacy & ownership" title="Every operation belongs to the authenticated reader">
                    <p className="max-w-3xl text-base leading-8 text-neutral-600 dark:text-neutral-300 sm:text-lg">
                        Authentication, HTTP-only sessions, private PDF storage, ownership-aware streaming, and user-scoped progress, highlights, and notes treat books and reading activity as private data. Raw storage paths are never exposed to the browser.
                    </p>
                </EditorialSection>

                <EditorialSection eyebrow="Data & domain architecture" title="A real domain behind the reading experience">
                    <div className="grid items-start gap-10 lg:grid-cols-[0.42fr_0.58fr] lg:gap-16">
                        <p className="text-base leading-8 text-neutral-600 dark:text-neutral-300 sm:text-lg">
                            Sophia&apos;s data model separates identity, book ownership, processed reading structure, reading activity, reflection, and the foundation for future AI features. Enlarge the diagram to inspect the relationships at full resolution.
                        </p>
                        <ImageLightbox image={databaseImage} />
                    </div>
                </EditorialSection>

                <EditorialSection eyebrow="Notes & highlights" title="Reflection is part of reading">
                    <p className="max-w-3xl text-base leading-8 text-neutral-600 dark:text-neutral-300 sm:text-lg">
                        Readers can select passages, preview and adjust highlights, then confirm them before persistence. Private notes and the broader reflection experience are currently being developed, so they are not presented here as complete.
                    </p>
                    <p className="mt-7 font-brand text-2xl text-primary dark:text-primary-light">Select → Preview → Adjust → Confirm → Persist</p>
                </EditorialSection>

                <EditorialSection eyebrow="Planned AI architecture" title="AI as a layer inside Sophia">
                    <p className="max-w-3xl text-base leading-8 text-neutral-600 dark:text-neutral-300 sm:text-lg">
                        The planned layer will let Sophia control passage and chapter context, output requirements, memory permissions, validation, and provider selection. Gemini is planned as the initial provider, but the provider should remain replaceable.
                    </p>
                </EditorialSection>

                <EditorialSection eyebrow="Development status" title="Active MVP development">
                    <dl className="grid gap-8 md:grid-cols-3">
                        {[
                            ['Built', 'Authentication, private library, PDF processing, protected reader, reading progress, text selection, and persistent highlights.'],
                            ['Building', 'Private notes and the reflection experience.'],
                            ['Next', 'Reading sessions, annotation management, then the AI runtime and contextual companion.'],
                        ].map(([label, description]) => (
                            <div key={label} className="border-l-2 border-primary/30 pl-5">
                                <dt className="mb-2 font-brand text-2xl text-neutral-900 dark:text-white">{label}</dt>
                                <dd className="text-sm leading-7 text-neutral-600 dark:text-neutral-300">{description}</dd>
                            </div>
                        ))}
                    </dl>
                </EditorialSection>

                <footer className="border-t border-primary/15 py-12">
                    <Link to="/works" className="inline-flex items-center gap-2 font-semibold text-primary hover:text-primary-strong dark:text-primary-light">
                        <ArrowLeft size={17} aria-hidden="true" /> Main Projects
                    </Link>
                </footer>
            </article>
        </main>
    );
};
