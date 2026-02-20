import { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'motion/react';
import { cn } from '../../lib/utils';

interface AnimatedTextProps {
    content: string;
    delay?: number;
    duration?: number;
    stagger?: number;
    className?: string;
    once?: boolean;
}

export const AnimatedText = ({
    content,
    delay = 0,
    duration = 0.5,
    stagger = 0.08,
    className,
    once = true,
}: AnimatedTextProps) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once });
    const controls = useAnimation();

    useEffect(() => {
        if (isInView) {
            controls.start('visible');
        }
    }, [isInView, controls]);

    // Split text into words
    const words = content.split(' ');

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: { staggerChildren: stagger, delayChildren: delay * i },
        }),
    };

    const wordVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration, ease: [0.2, 0.65, 0.3, 0.9] as const },
        },
    };

    return (
        <motion.span
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={controls}
            className={cn('inline-flex flex-wrap', className)}
        >
            {words.map((word, idx) => (
                <motion.span
                    key={idx}
                    variants={wordVariants}
                    className="mr-[0.25em] inline-block"
                >
                    {word}
                </motion.span>
            ))}
        </motion.span>
    );
};
