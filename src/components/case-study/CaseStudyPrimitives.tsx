import type { ReactNode } from 'react';
import { Image as ImageIcon } from 'lucide-react';

interface CaseStudySectionProps {
    id: string;
    number?: string;
    eyebrow?: string;
    title: string;
    introduction?: string;
    children: ReactNode;
}

export const CaseStudySection = ({ id, number, eyebrow, title, introduction, children }: CaseStudySectionProps) => (
    <section id={id} className="scroll-mt-28 border-t border-dashed border-primary/15 py-16 md:py-24">
        <header className="mb-10 max-w-3xl">
            {(number || eyebrow) && (
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary dark:text-primary-light">
                    {[number, eyebrow].filter(Boolean).join(' — ')}
                </p>
            )}
            <h2 className="mb-4 font-brand text-4xl leading-tight text-neutral-900 dark:text-white sm:text-5xl">{title}</h2>
            {introduction && <p className="text-base leading-7 text-neutral-600 dark:text-neutral-300 sm:text-lg sm:leading-8">{introduction}</p>}
        </header>
        {children}
    </section>
);

interface MetadataItem {
    label: string;
    value: string;
}

export const ProjectMetadata = ({ items }: { items: MetadataItem[] }) => (
    <dl className="grid gap-px overflow-hidden rounded-2xl border border-primary/15 bg-primary/10 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
            <div key={item.label} className="bg-white/90 p-5 dark:bg-bg-secondary-dark">
                <dt className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500 dark:text-neutral-400">{item.label}</dt>
                <dd className="text-sm font-medium leading-6 text-neutral-800 dark:text-neutral-100">{item.value}</dd>
            </div>
        ))}
    </dl>
);

interface MetricCardProps {
    label: string;
    value: string;
    description: string;
    status?: string;
}

export const MetricCard = ({ label, value, description, status = 'Pending verified evidence' }: MetricCardProps) => (
    <article className="rounded-2xl border border-primary/15 bg-white/80 p-5 dark:bg-bg-secondary-dark sm:p-6">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500 dark:text-neutral-400">{label}</p>
        <p className="mb-2 font-brand text-3xl text-primary dark:text-primary-light">{value}</p>
        <p className="mb-5 text-sm leading-6 text-neutral-600 dark:text-neutral-300">{description}</p>
        <span className="inline-flex rounded-full border border-dashed border-primary/30 bg-primary/5 px-3 py-1 text-xs font-medium text-primary dark:text-primary-light">
            {status}
        </span>
    </article>
);

interface EvidenceFigureProps {
    src?: string;
    alt?: string;
    caption: string;
    label?: string;
}

export const EvidenceFigure = ({ src, alt = '', caption, label = 'Evidence placeholder' }: EvidenceFigureProps) => (
    <figure className="overflow-hidden rounded-2xl border border-primary/15 bg-white/80 dark:bg-bg-secondary-dark">
        {src ? (
            <img src={src} alt={alt} className="aspect-[16/9] w-full object-cover object-top" />
        ) : (
            <div className="flex aspect-[16/9] flex-col items-center justify-center gap-3 bg-primary/[0.04] p-8 text-center dark:bg-primary/[0.08]">
                <ImageIcon className="text-primary/60 dark:text-primary-light/70" size={32} aria-hidden="true" />
                <span className="text-sm font-semibold text-primary dark:text-primary-light">{label}</span>
            </div>
        )}
        <figcaption className="border-t border-primary/10 px-5 py-4 text-sm leading-6 text-neutral-600 dark:text-neutral-300">{caption}</figcaption>
    </figure>
);

interface ComparisonItem {
    label: string;
    description: string;
}

export const BeforeAfterComparison = ({ items }: { items: ComparisonItem[] }) => (
    <div className="grid overflow-hidden rounded-2xl border border-primary/15 bg-primary/10 md:grid-cols-3">
        {items.map((item, index) => (
            <article key={item.label} className="relative bg-white/90 p-6 dark:bg-bg-secondary-dark md:p-8">
                <span className="mb-5 inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary dark:bg-primary/20 dark:text-primary-light">
                    {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="mb-2 text-lg font-semibold text-neutral-900 dark:text-white">{item.label}</h3>
                <p className="text-sm leading-6 text-neutral-600 dark:text-neutral-300">{item.description}</p>
            </article>
        ))}
    </div>
);

interface ChallengeBlockProps {
    title: string;
    problem: string;
    investigation: string;
    solution: string;
    result: string;
}

export const ChallengeBlock = ({ title, problem, investigation, solution, result }: ChallengeBlockProps) => {
    const stages = [
        ['Problem', problem],
        ['Investigation', investigation],
        ['Solution', solution],
        ['Result', result],
    ];

    return (
        <article className="rounded-2xl border border-primary/15 bg-white/80 p-5 dark:bg-bg-secondary-dark sm:p-8">
            <div className="mb-7 flex flex-wrap items-center justify-between gap-3">
                <h3 className="text-2xl font-brand text-neutral-900 dark:text-white">{title}</h3>
                <span className="rounded-full border border-dashed border-primary/30 bg-primary/5 px-3 py-1 text-xs font-medium text-primary dark:text-primary-light">
                    Content placeholder
                </span>
            </div>
            <ol className="grid gap-5 lg:grid-cols-4">
                {stages.map(([label, content], index) => (
                    <li key={label} className="border-l border-primary/20 pl-4">
                        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-primary dark:text-primary-light">
                            {String(index + 1).padStart(2, '0')} {label}
                        </p>
                        <p className="text-sm leading-6 text-neutral-600 dark:text-neutral-300">{content}</p>
                    </li>
                ))}
            </ol>
        </article>
    );
};

export const TechnicalFlow = ({ steps }: { steps: string[] }) => (
    <ol className="grid gap-3 sm:grid-cols-5" aria-label="Content delivery flow">
        {steps.map((step, index) => (
            <li key={step} className="relative flex min-h-28 items-center justify-center rounded-2xl border border-primary/15 bg-white/80 p-4 text-center text-sm font-semibold text-neutral-800 dark:bg-bg-secondary-dark dark:text-neutral-100">
                <span className="absolute left-3 top-3 text-[10px] font-semibold text-primary/70 dark:text-primary-light/70">{String(index + 1).padStart(2, '0')}</span>
                {step}
            </li>
        ))}
    </ol>
);
