import { forwardRef } from 'react';
import type { ButtonHTMLAttributes } from 'react';
import { motion } from 'motion/react';
import { Loader2 } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg' | 'icon';
    isLoading?: boolean;
    animate?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            className,
            variant = 'primary',
            size = 'md',
            isLoading = false,
            animate = true,
            children,
            disabled,
            ...props
        },
        ref
    ) => {
        const baseStyles =
            'inline-flex items-center justify-center rounded-xl font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 overflow-hidden relative cursor-pointer transition-all duration-300 ease-in-out hover:-translate-y-[2px] active:translate-y-[0px] active:scale-[0.98]';

        const variants = {
            primary:
                'bg-[var(--color-btn-primary)] text-white hover:bg-[var(--color-btn-primary-hover)] dark:bg-[var(--color-btn-primary-dark)] dark:hover:bg-[var(--color-btn-primary-dark-hover)] shadow-[0px_2px_3px_0_rgba(0,0,0,0.1)] hover:shadow-[0px_6px_9px_0_rgba(61,99,171,0.15)] dark:hover:shadow-[0px_6px_9px_0_rgba(0,0,0,0.2)]',
            secondary:
                'bg-[var(--color-primary-bg-light)] text-[var(--color-primary)] hover:bg-[var(--color-primary-bg)] dark:text-[var(--color-primary-lighter)] hover:shadow-md',
            outline:
                'border-2 border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white dark:border-[var(--color-primary-dark)] dark:text-[var(--color-primary-lighter)] dark:hover:bg-[var(--color-primary-dark)] dark:hover:text-white hover:shadow-md',
            ghost:
                'hover:bg-[var(--color-neutral-100)] dark:hover:bg-[var(--color-neutral-800)] text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)] hover:-translate-y-0', // Override translate for ghost button
        };

        const sizes = {
            sm: 'h-9 px-4 text-sm',
            md: 'h-11 px-6 text-base',
            lg: 'h-14 px-8 text-lg rounded-2xl',
            icon: 'h-11 w-11 p-2',
        };

        const combinedClassName = cn(
            baseStyles,
            variants[variant],
            sizes[size],
            className
        );

        const MotionComponent = animate ? motion.create('button') : 'button';
        const animationProps = {};

        return (
            <MotionComponent
                ref={ref as any}
                className={combinedClassName}
                disabled={disabled || isLoading}
                {...animationProps}
                {...(props as any)}
            >
                {isLoading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                <span className={cn('flex items-center', isLoading && 'opacity-0')}>
                    {children}
                </span>

                {/* Absolute loader overlay to prevent button resizing when swapping text for loader */}
                {isLoading && (
                    <span className="absolute inset-0 flex items-center justify-center">
                        <Loader2 className="h-5 w-5 animate-spin" />
                    </span>
                )}
            </MotionComponent>
        );
    }
);

Button.displayName = 'Button';
