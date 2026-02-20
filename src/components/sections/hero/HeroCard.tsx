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
    const colorPickerRef = useRef<SVGSVGElement>(null);
    const colorRef = useRef<SVGSVGElement>(null);
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
        const colorPickerStrength = 40;
        const colorStrength = 50;
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

            if (colorPickerRef.current) {
                const targetX = mouseX * colorPickerStrength;
                const targetY = mouseY * colorPickerStrength;
                const currentMatrix = new DOMMatrix(getComputedStyle(colorPickerRef.current).transform);
                colorPickerRef.current.style.transform = `translate3d(${currentMatrix.m41 + (targetX - currentMatrix.m41) * parallaxEasing}px, ${currentMatrix.m42 + (targetY - currentMatrix.m42) * parallaxEasing}px, 0)`;
            }

            if (colorRef.current) {
                const targetX = mouseX * colorStrength;
                const targetY = mouseY * colorStrength;
                const currentMatrix = new DOMMatrix(getComputedStyle(colorRef.current).transform);
                colorRef.current.style.transform = `translate3d(${currentMatrix.m41 + (targetX - currentMatrix.m41) * parallaxEasing}px, ${currentMatrix.m42 + (targetY - currentMatrix.m42) * parallaxEasing}px, 0)`;
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

            <div>
                <svg ref={colorPickerRef} width="200" height="43" viewBox="0 0 200 43" fill="none" xmlns="http://www.w3.org/2000/svg"
                    className="pointer-events-none absolute md:left-[-40px] left-[-20px] top-[45%] rounded-[10px] bg-white overflow-hidden z-30 md:max-w-[35%] max-w-[40%] transition-transform duration-300 ease-out will-change-transform shadow-[var(--shadow-lg)]">
                    <rect width="200" height="43" rx="10" fill="white" />
                    <mask id="mask0_458_539" maskUnits="userSpaceOnUse" x="42" y="15" width="112" height="16">
                        <path d="M44.6 27.1H42.3V16.3H50.1V18.2H44.6V20.6H49.6V22.6H44.6V27.1ZM54.5 27.2C53.4 27.2 52.5 26.9 51.9 26.3C51.4 25.8 51.1 25 51.1 23.9V19.1H53.3V23.5C53.3 24.7 53.9 25.2 55.1 25.2C55.7 25.2 56.1 25.1 56.5 24.8C56.8 24.5 57 24 57 23.4V19.1H59.2V24.9H60.3V27.1H58V25.8H57.5C57.2 26.2 56.8 26.6 56.3 26.8C55.8 27.1 55.2 27.2 54.5 27.2ZM61.7 27.1V21.3H60.6V19.1H62.9V20.4H63.4C63.8 19.9 64.1 19.6 64.6 19.3C65.1 19.1 65.7 18.9 66.4 18.9C67.5 18.9 68.3 19.2 69 19.8C69.6 20.5 69.9 21.3 69.9 22.3V27.1H67.7V22.7C67.7 21.5 67 20.9 65.8 20.9C64.6 20.9 64 21.5 64 22.7V27.1H61.7Z" fill="#161A1F" />
                    </mask>
                    <g mask="url(#mask0_458_539)">
                        <rect width="159" height="43" transform="translate(41)" fill="#514AA3" />
                    </g>
                    <g opacity="0.4">
                        <path d="M18.1 14H10.8C10.2 14 9.7 14.2 9.3 14.6C8.9 15 8.7 15.5 8.7 16V17.6C8.7 17.9 8.8 18.1 9 18.3C9.2 18.5 9.5 18.6 9.8 18.6C10 18.6 10.3 18.5 10.5 18.3C10.7 18.1 10.8 17.9 10.8 17.6V16.3H13.1V26.2H11.3V28.5H17.6V26.4H15.7V17.6H18.1V14Z" fill="#929DAB" />
                        <path d="M31.1 14H23.8C23.2 14 22.7 14.2 22.3 14.6C21.9 15 21.7 15.5 21.7 16V17.6H24V26.4H22.3V28.5H30.5V26.4H28.7V16.1H31.1V14Z" fill="#929DAB" />
                        <rect width="28" height="25" transform="translate(9 9)" fill="#001A56" />
                    </g>
                </svg>
            </div>

            <div>
                <svg ref={colorRef} width="275" height="66" viewBox="0 0 275 66" fill="none" xmlns="http://www.w3.org/2000/svg"
                    className="pointer-events-none absolute md:right-[-25px] right-[-16px] top-[65%] md:max-w-[45%] max-w-[50%] z-30 rounded-[10px] shadow-[var(--shadow-lg)] transition-transform duration-300 ease-out will-change-transform bg-white">
                    <rect x="0.5" y="0.5" width="274" height="65" rx="11.5" fill="white" />
                    <rect x="13.4" y="12.4" width="40.6" height="40.6" rx="12.9" fill="#5255FF" />
                    <path d="M41.7 25.2C42.5 26 42.5 27.2 41.7 28L38.9 30.8L36.1 28L38.9 25.2C39.7 24.4 40.9 24.4 41.7 25.2ZM43.1 23.8C41.6 22.2 39 22.2 37.5 23.8L34.7 26.6L34.3 26.2C33.9 25.8 33.3 25.8 32.9 26.2C32.5 26.6 32.5 27.3 32.9 27.6L33.2 28L27 34.2C26.5 34.8 26.1 35.5 25.9 36.3L25.6 38C25.5 38.4 25.3 38.8 25 39L24.1 40C23.7 40.4 23.7 41 24.1 41.4L25.5 42.8C25.9 43.2 26.5 43.2 26.9 42.8L27.9 41.9C28.1 41.6 28.5 41.4 28.9 41.3L30.6 41C31.4 40.8 32.1 40.4 32.7 39.9L38.9 33.7L39.3 34.1C39.7 34.4 40.3 34.4 40.7 34.1C41.1 33.7 41.1 33 40.7 32.6L40.3 32.2L43.1 29.4C44.7 27.9 44.7 25.3 43.1 23.8ZM34.7 29.4L37.5 32.2L31.3 38.5C31 38.7 30.6 38.9 30.2 39L28.5 39.4C27.7 39.5 27 39.9 26.5 40.4C27 39.9 27.4 39.2 27.5 38.4L27.9 36.7C28 36.3 28.2 35.9 28.4 35.6L34.7 29.4Z" fill="white" />
                    <rect x="62.8" y="12.4" width="200.5" height="14.5" rx="7.2" fill="url(#paint0_linear)" />
                    <circle cx="187.6" cy="19.4" r="8.4" fill="#3354FF" />
                    <circle cx="187.6" cy="19.4" r="9.7" stroke="white" strokeWidth="2.5" />
                    <rect x="62.8" y="38.5" width="200.5" height="14.5" rx="7.2" fill="url(#paint1_linear)" />
                    <circle cx="256.1" cy="45.8" r="7.2" fill="#3354FF" />
                    <circle cx="256.1" cy="45.8" r="8.5" stroke="white" strokeWidth="2.5" />
                    <defs>
                        <linearGradient id="paint0_linear" x1="62.8" y1="12.4" x2="263.4" y2="12.4" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#FF0000" />
                            <stop offset="0.14" stopColor="#FF6B00" />
                            <stop offset="0.25" stopColor="#FFE600" />
                            <stop offset="0.4" stopColor="#24FF00" />
                            <stop offset="0.51" stopColor="#00FFF0" />
                            <stop offset="0.66" stopColor="#0029FF" />
                            <stop offset="0.73" stopColor="#8F00FF" stopOpacity="0.78" />
                            <stop offset="0.86" stopColor="#FF00E5" />
                            <stop offset="1" stopColor="#FF0000" />
                        </linearGradient>
                        <linearGradient id="paint1_linear" x1="62.8" y1="45.8" x2="263.4" y2="45.8" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#C4C4C4" stopOpacity="0" />
                            <stop offset="1" stopColor="#5E5E5E" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>

            {title && (
                <div className="absolute left-[32px] text-center top-[-22px] h-[22px] leading-[22px] w-auto px-3 overflow-hidden rounded-tl-[6px] rounded-tr-[6px] bg-primary dark:bg-primary">
                    <p className="text-[11px] font-normal text-center text-white">{title}</p>
                </div>
            )}
        </div>
    );
};
