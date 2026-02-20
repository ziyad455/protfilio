import { useEffect } from 'react';
import type { ReactNode } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { cn } from '../../lib/utils';

interface SectionProviderProps {
    children: ReactNode;
    className?: string;
    id?: string;
    containerType?: 'default' | 'site' | 'inner' | 'fluid';
    paddingY?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
}

/**
 * SectionProvider is the main layout wrapper for major sections of the portfolio.
 * It strictly enforces the Astro portfolio's container widths AND initializes the globally required AOS animation library safely within React's lifecycle.
 */
export const SectionProvider = ({
    children,
    className,
    id,
    containerType = 'default',
    paddingY = 'lg',
}: SectionProviderProps) => {

    // Initialize AOS smoothly on client-side
    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true,
            easing: 'ease-out-cubic',
            offset: 100,
        });

        // Refresh AOS on component update/DOM mutations to ensure heights are calculated correctly
        const handleResize = () => AOS.refresh();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const containerClasses = {
        default: 'container',
        site: 'site-container',
        inner: 'inner-container',
        fluid: 'w-full px-4 md:px-8',
    };

    const padYClasses = {
        none: 'py-0',
        sm: 'py-8 md:py-12',
        md: 'py-12 md:py-20',
        lg: 'py-20 md:py-32',
        xl: 'py-32 md:py-48',
    };

    return (
        <section id={id} className={cn('relative w-full', padYClasses[paddingY], className)}>
            <div className={cn('mx-auto w-full', containerClasses[containerType])}>
                {children}
            </div>
        </section>
    );
};
