import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';

export interface WorkCardProps {
    name: string;          // Required
    image: string;         // Required
    url: string;           // Required
    description?: string;  // Optional
    tags?: string[];       // Optional
    video?: string;        // Optional
    isShow?: boolean;      // Optional, default true
    layout?: 'featured' | 'grid'; // featured is full width, grid is two columns
    index?: number;
    target?: string;       // Optional, default "_blank"
}

export const WorkCard = ({
    name,
    description = '',
    url,
    image,
    tags = [],
    video,
    isShow = true,
    layout = 'grid',
    index = 0,
    target = "_blank"
}: WorkCardProps) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        const videoElement = videoRef.current;
        if (!videoElement || !video) return;

        let playAttempts = 0;
        const MAX_PLAY_ATTEMPTS = 3;

        const tryPlay = async () => {
            if (isPlaying || playAttempts >= MAX_PLAY_ATTEMPTS) return;
            playAttempts++;

            try {
                await videoElement.play();
                setIsPlaying(true);
                playAttempts = 0; // Reset on success
            } catch (error: any) {
                setIsPlaying(false);
                console.debug(`Video autoplay attempt ${playAttempts} failed:`, error.name);

                // If user interaction is required
                if (error.name === 'NotAllowedError') {
                    handleUserInteraction();
                }
            }
        };

        const handleUserInteraction = () => {
            const interactionEvents = ['touchstart', 'click', 'scroll'];
            const onInteraction = () => {
                tryPlay();
                interactionEvents.forEach(event => {
                    document.removeEventListener(event, onInteraction);
                });
            };
            interactionEvents.forEach(event => {
                document.addEventListener(event, onInteraction, { once: true, passive: true });
            });
        };

        const setupIntersectionObserver = () => {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            if (videoElement.paused) {
                                playAttempts = 0;
                                tryPlay();
                            }
                        } else {
                            if (!videoElement.paused) {
                                videoElement.pause();
                                setIsPlaying(false);
                            }
                        }
                    });
                },
                {
                    root: null,
                    rootMargin: '50px',
                    threshold: 0.1
                }
            );
            observer.observe(videoElement);
            return observer;
        };

        const handleVisibilityChange = () => {
            if (!document.hidden && videoElement.paused) {
                const rect = videoElement.getBoundingClientRect();
                const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
                if (isInViewport) {
                    playAttempts = 0;
                    tryPlay();
                }
            }
        };

        // Initialize
        if (videoElement.readyState >= 2) {
            tryPlay();
        } else {
            videoElement.addEventListener('loadeddata', tryPlay, { once: true });
        }

        const observer = setupIntersectionObserver();
        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            if (observer) {
                observer.disconnect();
            }
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            videoElement.removeEventListener('loadeddata', tryPlay);
        };
    }, [video, isPlaying]);

    if (!isShow) return null;

    return (
        <article
            className={cn(
                "group relative overflow-hidden transition-all duration-500 mb-8 bg-white/85 p-5 dark:bg-bg-secondary-dark border-[.75px] border-solid border-primary/15 rounded-2xl backdrop-blur-sm",
                layout === 'featured' ? "" : ""
            )}
            data-aos="fade-up"
            data-aos-duration="500"
            data-aos-delay={index * 100}
            data-aos-once="true"
        >
            {/* Image/video container */}
            <div className="relative overflow-hidden aspect-video rounded-xl">
                {video ? (
                    <video
                        ref={videoRef}
                        src={video}
                        poster={image}
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="auto"
                        controls={false}
                        disablePictureInPicture
                        controlsList="nodownload noplaybackrate nofullscreen noremoteplayback"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    >
                        <source src={video} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                ) : (
                    <img
                        src={image}
                        alt={name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 hover:shadow-xl hover:shadow-primary/5 dark:hover:shadow-primary/10"
                        loading="lazy"
                    />
                )}

                {/* Gradient overlay shown on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

                {/* Link button shown on hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="flex items-center justify-center w-14 h-14 rounded-full bg-white/95 backdrop-blur-sm shadow-lg transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 group-hover:scale-110">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-primary"
                        >
                            <path d="M7 7h10v10"></path>
                            <path d="M7 17 17 7"></path>
                        </svg>
                    </div>
                </div>
            </div>

            {/* Content area */}
            <div className={cn(
                "px-1 pt-6 pb-2",
                layout === 'featured' ? "md:px-1 md:pt-6 md:pb-2" : ""
            )}>
                {/* Title and link icon */}
                <div className="flex items-start justify-between gap-3 mb-3">
                    <h3 className={cn(
                        "text-neutral-900 dark:text-white leading-tight font-brand transition-colors duration-300 group-hover:text-primary dark:group-hover:text-primary-light",
                        layout === 'featured' ? "text-2xl md:text-3xl" : "text-2xl"
                    )}>
                        {name}
                    </h3>

                    <div className="flex-shrink-0 mt-1">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-light transition-all duration-300 group-hover:bg-primary dark:group-hover:bg-primary-light group-hover:text-white dark:group-hover:text-neutral-900 group-hover:rotate-45">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M7 7h10v10"></path>
                                <path d="M7 17 17 7"></path>
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Tags */}
                {tags && tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-3">
                        {tags.map((tag, i) => (
                            <span key={i} className="inline-flex items-center rounded-full bg-primary/8 dark:bg-primary/15 px-2.5 py-0.5 text-[10px] font-medium text-primary-dark dark:text-primary-light border border-primary/10 dark:border-primary/20">
                                {tag}
                            </span>
                        ))}
                    </div>
                )}

                {/* Description */}
                {description && (
                    <p className={cn(
                        "text-neutral-600 dark:text-neutral-400 leading-relaxed",
                        layout === 'featured' ? "text-base md:text-lg line-clamp-2" : "text-sm line-clamp-2"
                    )}>
                        {description}
                    </p>
                )}
            </div>

            {/* Link overlay for entire card */}
            {url.startsWith('http') ? (
                <a
                    href={url}
                    target={target}
                    rel={target === "_blank" ? "noopener noreferrer" : undefined}
                    className="absolute inset-0 z-10"
                >
                    <span className="sr-only">View {name}</span>
                </a>
            ) : (
                <Link
                    to={url}
                    className="absolute inset-0 z-10"
                >
                    <span className="sr-only">View {name}</span>
                </Link>
            )}
        </article>
    );
};
