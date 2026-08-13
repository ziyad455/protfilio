import type { ReactNode } from 'react';

interface CaseStudySectionProps {
    id: string;
    number: string;
    title: string;
    introduction?: string;
    children: ReactNode;
}

export const CaseStudySection = ({ id, number, title, introduction, children }: CaseStudySectionProps) => (
    <section id={id} className="scroll-mt-28 border-t border-primary/15 py-20 md:py-32">
        <header className="mb-12 max-w-4xl md:mb-16">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-primary dark:text-primary-light">{number}</p>
            <h2 className="mb-5 font-brand text-4xl leading-tight text-neutral-900 dark:text-white sm:text-5xl">{title}</h2>
            {introduction && <p className="max-w-3xl text-base leading-8 text-neutral-600 dark:text-neutral-300 sm:text-lg sm:leading-9">{introduction}</p>}
        </header>
        {children}
    </section>
);
