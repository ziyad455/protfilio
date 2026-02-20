import { forwardRef } from 'react';
import type { ElementType, HTMLAttributes } from 'react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';

export interface TypographyProps extends HTMLAttributes<HTMLElement> {
    variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'lead' | 'caption';
    as?: ElementType;
    gradient?: boolean;
    animate?: boolean;
    delay?: number;
}

export const Typography = forwardRef<HTMLElement, TypographyProps>(
    (
        {
            className,
            variant = 'p',
            as,
            gradient = false,
            animate = false,
            delay = 0,
            children,
            ...props
        },
        ref
    ) => {
        // Determine the base HTML element to render if not strictly overridden
        const Component = as || variant.startsWith('h') ? variant : 'p';

        // Allow using framer-motion if animation is requested
        const MotionComponent = animate ? motion.create(Component as any) : Component;

        const baseStyles = 'transition-colors duration-300';

        const variants = {
            h1: 'text-5xl md:text-7xl font-brand mb-6',
            h2: 'text-4xl md:text-5xl font-brand mb-4 text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-dark)]',
            h3: 'text-2xl md:text-3xl font-brand mb-3 text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-dark)]',
            h4: 'text-xl md:text-2xl font-bold mb-2 text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-dark)]',
            p: 'text-base md:text-lg mb-4 text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)] leading-relaxed',
            lead: 'text-xl md:text-2xl mb-6 text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)] font-medium leading-relaxed',
            caption: 'text-sm text-[var(--color-text-tertiary)] dark:text-[var(--color-text-tertiary-dark)]',
        };

        const gradientClasses = gradient
            ? 'gradient-title dark:gradient-title-light w-fit'
            : '';

        const combinedClassName = cn(
            baseStyles,
            variants[variant as keyof typeof variants],
            gradientClasses,
            className
        );

        const animationProps = animate
            ? {
                initial: { opacity: 0, y: 20 },
                whileInView: { opacity: 1, y: 0 },
                viewport: { once: true, margin: '-50px' },
                transition: { duration: 0.6, delay, ease: 'easeOut' },
            }
            : {};

        return (
            <MotionComponent
                ref={ref}
                className={combinedClassName}
                {...animationProps}
                {...(props as any)}
            >
                {children}
            </MotionComponent>
        );
    }
);

Typography.displayName = 'Typography';
