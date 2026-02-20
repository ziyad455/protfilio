import { forwardRef } from 'react';
import type { HTMLAttributes } from 'react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
    hoverEffect?: boolean;
    animate?: boolean;
    delay?: number;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
    (
        {
            className,
            hoverEffect = true,
            animate = true,
            delay = 0,
            children,
            ...props
        },
        ref
    ) => {
        const baseStyles =
            'rounded-3xl bg-[var(--color-bg-secondary)] dark:bg-[var(--color-bg-secondary-dark)] border border-[var(--color-neutral-200)] dark:border-[var(--color-neutral-800)] overflow-hidden transition-all duration-300';

        const hoverStyles = hoverEffect
            ? 'hover:shadow-xl dark:hover:shadow-2xl dark:hover:shadow-black/50 hover:-translate-y-1'
            : '';

        const combinedClassName = cn(baseStyles, hoverStyles, className);

        const MotionComponent = animate ? motion.create('div') : 'div';
        const animationProps = animate
            ? {
                initial: { opacity: 0, scale: 0.95, y: 30 },
                whileInView: { opacity: 1, scale: 1, y: 0 },
                viewport: { once: true, margin: '-50px' },
                transition: { duration: 0.5, delay, ease: [0.25, 0.46, 0.45, 0.94] },
            }
            : {};

        return (
            <MotionComponent
                ref={ref as any}
                className={combinedClassName}
                {...animationProps}
                {...(props as any)}
            >
                {children}
            </MotionComponent>
        );
    }
);

Card.displayName = 'Card';

// Subcomponents for structured Card content
export const CardHeader = ({ className, children }: HTMLAttributes<HTMLDivElement>) => (
    <div className={cn('p-6 pb-0 flex flex-col space-y-1.5', className)}>
        {children}
    </div>
);

export const CardContent = ({ className, children }: HTMLAttributes<HTMLDivElement>) => (
    <div className={cn('p-6 pt-4', className)}>
        {children}
    </div>
);

export const CardFooter = ({ className, children }: HTMLAttributes<HTMLDivElement>) => (
    <div className={cn('p-6 pt-0 flex items-center', className)}>
        {children}
    </div>
);
