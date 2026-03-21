import { useEffect, useRef } from 'react';
import { cn } from '../../../lib/utils';

interface HeroCardProps {
    imageUrl: string;
    title?: string;
    link?: string;
    className?: string;
}

export const HeroCard = ({
    imageUrl,
    title = 'Home',
    link = '',
    className,
}: HeroCardProps) => {
    const caseRef = useRef<HTMLDivElement>(null);
    const indicatorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const isMobile = window.innerWidth < 768;
        if (isMobile) return;

        let mouseX = 0;
        let mouseY = 0;
        let targetX = 0;
        let targetY = 0;
        let cursorX = 0;
        let cursorY = 0;
        let isHovering = false;
        let rafId = 0;

        const webCaseStrength = 25;
        const cursorEasing = 0.12;
        const parallaxEasing = 0.08;

        const handleMouseMoveGlobal = (e: MouseEvent) => {
            mouseX = e.clientX / window.innerWidth - 0.5;
            mouseY = e.clientY / window.innerHeight - 0.5;
        };

        const handleMouseEnter = () => {
            isHovering = true;
            document.documentElement.classList.add('cursor-hidden');
            if (indicatorRef.current) {
                indicatorRef.current.style.opacity = '1';
                indicatorRef.current.style.transform = 'translate(-50%, -50%) scale(1)';
            }
        };

        const handleMouseLeave = () => {
            isHovering = false;
            document.documentElement.classList.remove('cursor-hidden');
            if (indicatorRef.current) {
                indicatorRef.current.style.opacity = '0';
                indicatorRef.current.style.transform = 'translate(-50%, -50%) scale(0.5)';
            }
        };

        const handleMouseMoveLocal = (e: MouseEvent) => {
            if (!isHovering) return;
            const element = document.querySelector('.case-go');
            if (element) {
                const rect = element.getBoundingClientRect();
                targetX = e.clientX - rect.left;
                targetY = e.clientY - rect.top;
            }
        };

        document.addEventListener('mousemove', handleMouseMoveGlobal);
        const caseGo = document.querySelector('.case-go');
        if (caseGo) {
            caseGo.addEventListener('mouseenter', handleMouseEnter);
            caseGo.addEventListener('mouseleave', handleMouseLeave);
            caseGo.addEventListener('mousemove', handleMouseMoveLocal as EventListener);
        }

        const updateAnimation = () => {
            // Parallax
            if (caseRef.current) {
                const targetWebCaseX = mouseX * webCaseStrength;
                const targetWebCaseY = mouseY * webCaseStrength;
                const currentMatrix = new DOMMatrix(getComputedStyle(caseRef.current).transform);
                const currentX = currentMatrix.m41 || 0;
                const currentY = currentMatrix.m42 || 0;
                caseRef.current.style.transform = `translate3d(${currentX + (targetWebCaseX - currentX) * parallaxEasing}px, ${currentY + (targetWebCaseY - currentY) * parallaxEasing}px, 0)`;
            }

            // Custom cursor
            if (isHovering && indicatorRef.current) {
                cursorX += (targetX - cursorX) * cursorEasing;
                cursorY += (targetY - cursorY) * cursorEasing;
                indicatorRef.current.style.left = `${cursorX}px`;
                indicatorRef.current.style.top = `${cursorY}px`;
            }

            rafId = requestAnimationFrame(updateAnimation);
        };

        updateAnimation();

        return () => {
            cancelAnimationFrame(rafId);
            document.removeEventListener('mousemove', handleMouseMoveGlobal);
            if (caseGo) {
                caseGo.removeEventListener('mouseenter', handleMouseEnter);
                caseGo.removeEventListener('mouseleave', handleMouseLeave);
                caseGo.removeEventListener('mousemove', handleMouseMoveLocal as EventListener);
            }
            document.documentElement.classList.remove('cursor-hidden');
        };
    }, []);

    const handleCaseClick = () => {
        if (link) {
            window.open(link, '_blank');
        }
    };

    return (
        <div ref={caseRef} className={cn("relative z-20 w-full lg:max-w-full md:max-w-[90%] sm:max-w-full web-case transition-transform duration-300 ease-out will-change-transform", className)}>
            <div className="case-solid relative w-full h-full p-3 border-3 border-solid border-primary dark:border-primary">
                <div className="case-square absolute top-[-5px] left-[-5px] border-2 border-solid border-primary dark:border-primary w-3 h-3 bg-white" />
                <div className="case-square absolute top-[-5px] right-[-5px] border-2 border-solid border-primary dark:border-primary w-3 h-3 bg-white" />
                <div className="case-square absolute bottom-[-5px] left-[-5px] border-2 border-solid border-primary dark:border-primary w-3 h-3 bg-white" />
                <div className="case-square absolute bottom-[-5px] right-[-5px] border-2 border-solid border-primary dark:border-primary w-3 h-3 bg-white" />

                <div className="relative z-20 w-full">
                    <div
                        className="relative top-0 left-0 w-full aspect-[6/7] overflow-hidden rounded-xl case-go cursor-pointer"
                        onClick={handleCaseClick}
                    >
                        <img
                            src={imageUrl}
                            loading="eager"
                            decoding="async"
                            alt="Hero card visual"
                            className="absolute top-0 left-0 right-0 z-30 w-full h-full mx-auto object-cover"
                        />
                        <div ref={indicatorRef} className="cursor-indicator absolute top-0 left-0 w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg z-[1000] opacity-0 pointer-events-none transform -translate-x-1/2 -translate-y-1/2 scale-50 transition-all duration-400 ease-out">
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary w-6 h-6">
                                <line x1="7" y1="17" x2="17" y2="7"></line>
                                <polyline points="7 7 17 7 17 17"></polyline>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            {title && (
                <div className="absolute left-[32px] text-center top-[-22px] h-[22px] leading-[22px] w-auto px-3 overflow-hidden rounded-tl-[6px] rounded-tr-[6px] bg-primary dark:bg-primary">
                    <p className="text-[11px] font-normal text-center text-white">{title}</p>
                </div>
            )}
        </div>
    );
};
