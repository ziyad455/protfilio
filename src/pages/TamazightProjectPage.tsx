import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ImageLightbox } from '../components/ui/ImageLightbox';
import { tamazightProject } from '../data/featuredWork';

export const TamazightProjectPage = () => {
    const [primaryImage, kaggleImage, technicalImage] = tamazightProject.images;

    return (
        <main className="relative z-20 mx-auto w-full px-4 xl:px-0">
            <article className="site-container">
                <header className="py-12 md:py-20">
                    <Link to="/works" className="mb-10 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary-strong dark:text-primary-light">
                        <ArrowLeft size={16} aria-hidden="true" /> Back to Main Projects
                    </Link>

                    <div className="grid items-center gap-10 lg:grid-cols-[0.44fr_0.56fr] lg:gap-16">
                        <ImageLightbox image={primaryImage} />

                        <div>
                            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-primary dark:text-primary-light">{tamazightProject.eyebrow}</p>
                            <h1 className="mb-6 font-brand text-5xl leading-[0.95] text-neutral-900 dark:text-white sm:text-6xl lg:text-7xl">{tamazightProject.title}</h1>
                            <p className="mb-6 text-lg leading-8 text-neutral-600 dark:text-neutral-300 sm:text-xl sm:leading-9">{tamazightProject.summary}</p>
                            <p className="text-sm font-semibold leading-7 text-neutral-800 dark:text-neutral-100">{tamazightProject.role}</p>
                        </div>
                    </div>

                    <dl className="mt-12 flex flex-col gap-5 border-y border-primary/15 py-6 sm:flex-row sm:flex-wrap sm:gap-x-12">
                        <div>
                            <dt className="mb-1 text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500 dark:text-neutral-400">Context</dt>
                            <dd className="text-sm font-medium text-neutral-800 dark:text-neutral-100">Team project for the Google DeepMind Gemma 3n Hackathon</dd>
                        </div>
                        <div>
                            <dt className="mb-1 text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500 dark:text-neutral-400">Core stack</dt>
                            <dd className="text-sm font-medium text-neutral-800 dark:text-neutral-100">Gemma 3n · React Native · TypeScript · SQLite · Convex</dd>
                        </div>
                    </dl>
                </header>

                <section className="border-t border-primary/15 py-20 md:py-28">
                    <div className="max-w-3xl">
                        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-primary dark:text-primary-light">Project context</p>
                        <h2 className="mb-5 font-brand text-4xl leading-tight text-neutral-900 dark:text-white sm:text-5xl">Multilingual AI for emergency communication</h2>
                        <p className="text-base leading-8 text-neutral-600 dark:text-neutral-300 sm:text-lg">
                            The wider project explored Gemma 3n fine-tuning, multilingual translation datasets, Tifinagh input, online and offline architecture, and the constraints of bringing language-model research into an actual mobile application.
                        </p>
                    </div>
                </section>

                <section className="border-t border-primary/15 py-20 md:py-28">
                    <div className="grid items-start gap-10 lg:grid-cols-[0.46fr_0.54fr] lg:gap-16">
                        <ImageLightbox image={kaggleImage} />

                        <div>
                            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-primary dark:text-primary-light">My contribution</p>
                            <h2 className="mb-5 font-brand text-4xl leading-tight text-neutral-900 dark:text-white sm:text-5xl">AI/ML development and research within a senior-led team</h2>
                            <p className="mb-7 text-base leading-8 text-neutral-600 dark:text-neutral-300 sm:text-lg">
                                I contributed under the guidance of a senior AI/ML engineer, working across experimentation, application integration, and technical research. The team-level achievements are presented separately from the areas I personally worked on.
                            </p>
                            <ul className="space-y-4" aria-label="Personal contribution areas">
                                {tamazightProject.contributionAreas.map((area) => (
                                    <li key={area} className="flex gap-4 text-sm leading-7 text-neutral-700 dark:text-neutral-300 sm:text-base">
                                        <span className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-primary dark:bg-primary-light" aria-hidden="true" />
                                        {area}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>

                <section className="border-t border-primary/15 py-20 md:py-28">
                    <div className="grid items-start gap-10 lg:grid-cols-[0.54fr_0.46fr] lg:gap-16">
                        <div>
                            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-primary dark:text-primary-light">Engineering depth</p>
                            <h2 className="mb-5 font-brand text-4xl leading-tight text-neutral-900 dark:text-white sm:text-5xl">From model experiments to a usable application</h2>
                            <p className="text-base leading-8 text-neutral-600 dark:text-neutral-300 sm:text-lg">
                                The technical work connected fine-tuning and dataset exploration with context-aware prompting, mobile integration, a custom Tifinagh experience, offline SQLite storage, an online Convex backend, and investigation into on-device deployment constraints.
                            </p>
                        </div>

                        <ImageLightbox image={technicalImage} />
                    </div>
                </section>

                <section className="border-t border-primary/15 py-20 md:py-28">
                    <div className="mb-10 max-w-3xl">
                        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-primary dark:text-primary-light">Technologies</p>
                        <h2 className="mb-5 font-brand text-4xl leading-tight text-neutral-900 dark:text-white sm:text-5xl">Research and application stack</h2>
                        <p className="text-base leading-8 text-neutral-600 dark:text-neutral-300 sm:text-lg">{tamazightProject.technologies.join(' · ')}</p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        <a href={tamazightProject.links.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-primary-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
                            <Github size={16} aria-hidden="true" /> GitHub
                        </a>
                        <a href={tamazightProject.links.kaggle} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-primary/25 px-5 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 dark:text-primary-light">
                            <ExternalLink size={16} aria-hidden="true" /> Kaggle Hackathon
                        </a>
                    </div>
                </section>

                <footer className="border-t border-primary/15 py-12">
                    <Link to="/works" className="inline-flex items-center gap-2 font-semibold text-primary hover:text-primary-strong dark:text-primary-light">
                        <ArrowLeft size={17} aria-hidden="true" /> Main Projects
                    </Link>
                </footer>
            </article>
        </main>
    );
};
