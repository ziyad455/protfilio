import type { HTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

export function TopBg({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={cn("pointer-events-none absolute inset-0 z-[-1] h-[50%]", className)} {...props}>
            <svg
                aria-hidden="true"
                className="absolute top-[-20%] inset-0 size-full fill-blue-500/50 stroke-blue-500/50 [mask-image:linear-gradient(to_bottom,_#ffffffad,_transparent)] opacity-[.30]"
            >
                <defs>
                    <pattern
                        id="bg-grid-pattern"
                        width="12"
                        height="12"
                        patternUnits="userSpaceOnUse"
                        x="-1"
                        y="-1"
                    >
                        <path d="M.5 12V.5H12" fill="none" strokeDasharray="0"></path>
                    </pattern>
                </defs>
                <rect width="100%" height="100%" strokeWidth="0" fill="url(#bg-grid-pattern)"></rect>
            </svg>
        </div>
    );
}
