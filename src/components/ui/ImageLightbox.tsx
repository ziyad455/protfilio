import { useEffect, useRef, useState } from 'react';
import type {
    KeyboardEvent as ReactKeyboardEvent,
    MouseEvent as ReactMouseEvent,
    PointerEvent as ReactPointerEvent,
    WheelEvent as ReactWheelEvent,
} from 'react';
import { Maximize2, X } from 'lucide-react';

interface LightboxImage {
    src: string;
    alt: string;
    caption: string;
}

interface ImageLightboxProps {
    image: LightboxImage;
    className?: string;
}

interface ViewState {
    zoom: number;
    x: number;
    y: number;
}

interface Point {
    x: number;
    y: number;
}

interface PinchState {
    distance: number;
    center: Point;
    view: ViewState;
}

const FIT_VIEW: ViewState = { zoom: 1, x: 0, y: 0 };

const getDistance = (first: Point, second: Point) => Math.hypot(second.x - first.x, second.y - first.y);

const getCenter = (first: Point, second: Point): Point => ({
    x: (first.x + second.x) / 2,
    y: (first.y + second.y) / 2,
});

export const ImageLightbox = ({ image, className = '' }: ImageLightboxProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [view, setView] = useState<ViewState>(FIT_VIEW);
    const [viewerSize, setViewerSize] = useState({ width: 0, height: 0 });
    const [naturalSize, setNaturalSize] = useState({ width: 0, height: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const dialogRef = useRef<HTMLDialogElement>(null);
    const viewerRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);
    const pointersRef = useRef(new Map<number, Point>());
    const lastPointerRef = useRef<Point | null>(null);
    const pinchRef = useRef<PinchState | null>(null);

    const fitScale = naturalSize.width && viewerSize.width
        ? Math.min(
            Math.max(1, viewerSize.width - 32) / naturalSize.width,
            Math.max(1, viewerSize.height - 32) / naturalSize.height,
            1,
        )
        : 1;
    const fittedWidth = naturalSize.width * fitScale;
    const fittedHeight = naturalSize.height * fitScale;
    const actualSizeZoom = Math.max(1, 1 / fitScale);
    const maxZoom = Math.max(4, Math.min(12, actualSizeZoom * 2));

    const clampView = (candidate: ViewState): ViewState => {
        const zoom = Math.min(maxZoom, Math.max(1, candidate.zoom));
        const maxX = Math.max(0, (fittedWidth * zoom - viewerSize.width) / 2);
        const maxY = Math.max(0, (fittedHeight * zoom - viewerSize.height) / 2);

        return {
            zoom,
            x: Math.min(maxX, Math.max(-maxX, candidate.x)),
            y: Math.min(maxY, Math.max(-maxY, candidate.y)),
        };
    };

    const zoomAroundPoint = (current: ViewState, nextZoom: number, point: Point): ViewState => {
        const zoom = Math.min(maxZoom, Math.max(1, nextZoom));
        const imagePointX = (point.x - current.x) / current.zoom;
        const imagePointY = (point.y - current.y) / current.zoom;

        return clampView({
            zoom,
            x: point.x - imagePointX * zoom,
            y: point.y - imagePointY * zoom,
        });
    };

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!isOpen || !dialog) return;

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        dialog.showModal();

        const handleClose = () => setIsOpen(false);
        dialog.addEventListener('close', handleClose);

        return () => {
            dialog.removeEventListener('close', handleClose);
            document.body.style.overflow = previousOverflow;
            if (dialog.open) dialog.close();
            triggerRef.current?.focus();
        };
    }, [isOpen]);

    useEffect(() => {
        const viewer = viewerRef.current;
        if (!isOpen || !viewer) return;

        const updateSize = () => {
            const bounds = viewer.getBoundingClientRect();
            setViewerSize({ width: bounds.width, height: bounds.height });
        };

        updateSize();
        const observer = new ResizeObserver(updateSize);
        observer.observe(viewer);
        return () => observer.disconnect();
    }, [isOpen]);

    useEffect(() => {
        setView((current) => clampView(current));
    // Re-clamp the image whenever its fitted dimensions change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [viewerSize.width, viewerSize.height, naturalSize.width, naturalSize.height]);

    const openLightbox = () => {
        setView(FIT_VIEW);
        setIsOpen(true);
    };

    const closeLightbox = () => dialogRef.current?.close();

    const handleBackdropClick = (event: ReactMouseEvent<HTMLDialogElement>) => {
        if (event.target === event.currentTarget) closeLightbox();
    };

    const handleWheel = (event: ReactWheelEvent<HTMLDivElement>) => {
        event.preventDefault();
        const bounds = event.currentTarget.getBoundingClientRect();
        const point = {
            x: event.clientX - bounds.left - bounds.width / 2,
            y: event.clientY - bounds.top - bounds.height / 2,
        };
        const delta = event.deltaMode === 1 ? event.deltaY * 16 : event.deltaY;
        const factor = Math.exp(-delta * 0.0015);

        setView((current) => zoomAroundPoint(current, current.zoom * factor, point));
    };

    const startPinch = () => {
        const [first, second] = Array.from(pointersRef.current.values());
        if (!first || !second) return;

        pinchRef.current = {
            distance: Math.max(1, getDistance(first, second)),
            center: getCenter(first, second),
            view,
        };
        setIsDragging(true);
    };

    const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.currentTarget.setPointerCapture(event.pointerId);
        const point = { x: event.clientX, y: event.clientY };
        pointersRef.current.set(event.pointerId, point);
        lastPointerRef.current = point;

        if (pointersRef.current.size === 2) {
            startPinch();
        } else if (view.zoom > 1) {
            setIsDragging(true);
        }
    };

    const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
        if (!pointersRef.current.has(event.pointerId)) return;
        event.preventDefault();
        const point = { x: event.clientX, y: event.clientY };
        pointersRef.current.set(event.pointerId, point);

        if (pointersRef.current.size >= 2 && pinchRef.current) {
            const [first, second] = Array.from(pointersRef.current.values());
            const currentCenter = getCenter(first, second);
            const currentDistance = Math.max(1, getDistance(first, second));
            const bounds = event.currentTarget.getBoundingClientRect();
            const initialCenter = {
                x: pinchRef.current.center.x - bounds.left - bounds.width / 2,
                y: pinchRef.current.center.y - bounds.top - bounds.height / 2,
            };
            const nextCenter = {
                x: currentCenter.x - bounds.left - bounds.width / 2,
                y: currentCenter.y - bounds.top - bounds.height / 2,
            };
            const startView = pinchRef.current.view;
            const imagePoint = {
                x: (initialCenter.x - startView.x) / startView.zoom,
                y: (initialCenter.y - startView.y) / startView.zoom,
            };
            const nextZoom = Math.min(maxZoom, Math.max(1, startView.zoom * currentDistance / pinchRef.current.distance));

            setView(clampView({
                zoom: nextZoom,
                x: nextCenter.x - imagePoint.x * nextZoom,
                y: nextCenter.y - imagePoint.y * nextZoom,
            }));
            return;
        }

        const previous = lastPointerRef.current;
        lastPointerRef.current = point;
        if (!previous) return;

        setView((current) => current.zoom <= 1
            ? current
            : clampView({
                ...current,
                x: current.x + point.x - previous.x,
                y: current.y + point.y - previous.y,
            }));
    };

    const handlePointerEnd = (event: ReactPointerEvent<HTMLDivElement>) => {
        pointersRef.current.delete(event.pointerId);
        pinchRef.current = null;

        const remainingPointer = Array.from(pointersRef.current.values())[0] ?? null;
        lastPointerRef.current = remainingPointer;
        setIsDragging(Boolean(remainingPointer && view.zoom > 1));
    };

    const handleKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
        const center = { x: 0, y: 0 };

        if (event.key === '+' || event.key === '=') {
            event.preventDefault();
            setView((current) => zoomAroundPoint(current, current.zoom * 1.25, center));
        } else if (event.key === '-') {
            event.preventDefault();
            setView((current) => zoomAroundPoint(current, current.zoom / 1.25, center));
        } else if (event.key === '0') {
            event.preventDefault();
            setView(FIT_VIEW);
        } else if (event.key.startsWith('Arrow')) {
            event.preventDefault();
            const step = 48;
            setView((current) => clampView({
                ...current,
                x: current.x + (event.key === 'ArrowLeft' ? step : event.key === 'ArrowRight' ? -step : 0),
                y: current.y + (event.key === 'ArrowUp' ? step : event.key === 'ArrowDown' ? -step : 0),
            }));
        }
    };

    const zoomLabel = view.zoom === 1 ? 'Fit to screen' : `${Math.round(view.zoom * 100)}% of fitted size`;

    return (
        <>
            <figure className={className}>
                <button
                    ref={triggerRef}
                    type="button"
                    onClick={openLightbox}
                    className="group relative block w-full cursor-zoom-in rounded-xl text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 dark:focus-visible:ring-offset-neutral-950"
                    aria-label={`Enlarge image: ${image.alt}`}
                >
                    <img src={image.src} alt={image.alt} className="w-full rounded-xl object-cover" loading="lazy" />
                    <span className="absolute bottom-3 right-3 inline-flex items-center gap-2 rounded-full bg-neutral-950/80 px-3 py-2 text-xs font-semibold text-white opacity-90 backdrop-blur-sm transition-opacity group-hover:opacity-100" aria-hidden="true">
                        <Maximize2 size={14} /> Enlarge
                    </span>
                </button>
                <figcaption className="mt-3 text-sm leading-6 text-neutral-500 dark:text-neutral-400">{image.caption}</figcaption>
            </figure>

            {isOpen && (
                <dialog
                    ref={dialogRef}
                    onMouseDown={handleBackdropClick}
                    aria-modal="true"
                    aria-labelledby="project-lightbox-title"
                    aria-describedby="project-lightbox-instructions"
                    className="fixed inset-4 m-0 h-[calc(100dvh-2rem)] w-[calc(100vw-2rem)] max-w-none overflow-hidden rounded-2xl border border-white/15 bg-neutral-950 p-0 text-white shadow-2xl backdrop:bg-neutral-950/85"
                >
                    <div className="flex h-full flex-col">
                        <header className="relative z-10 flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-neutral-950/95 px-4 py-3 backdrop-blur-md sm:px-5">
                            <div>
                                <h2 id="project-lightbox-title" className="text-sm font-semibold text-white">Enlarged project image</h2>
                                <p id="project-lightbox-instructions" className="mt-0.5 text-xs text-neutral-400">
                                    Wheel to zoom · drag to pan · pinch on touch
                                </p>
                                <p className="sr-only" aria-live="polite">{zoomLabel}</p>
                            </div>

                            <div className="flex items-center gap-1.5">
                                <button type="button" onClick={() => setView(FIT_VIEW)} className="rounded-lg px-3 py-2 text-xs font-semibold text-neutral-200 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light">
                                    Fit
                                </button>
                                <button type="button" onClick={() => setView((current) => zoomAroundPoint(current, actualSizeZoom, { x: 0, y: 0 }))} className="rounded-lg px-3 py-2 text-xs font-semibold text-neutral-200 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light">
                                    100%
                                </button>
                                <button autoFocus type="button" onClick={closeLightbox} className="ml-1 rounded-lg border border-white/15 p-2 text-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light" aria-label="Close enlarged image">
                                    <X size={20} aria-hidden="true" />
                                </button>
                            </div>
                        </header>

                        <div
                            ref={viewerRef}
                            tabIndex={0}
                            role="group"
                            aria-label="Zoomable image. Use the mouse wheel or plus and minus keys to zoom, then drag or use arrow keys to pan. Press zero to fit the image."
                            onWheel={handleWheel}
                            onPointerDown={handlePointerDown}
                            onPointerMove={handlePointerMove}
                            onPointerUp={handlePointerEnd}
                            onPointerCancel={handlePointerEnd}
                            onKeyDown={handleKeyDown}
                            className={`relative flex-1 touch-none overflow-hidden bg-neutral-950 outline-none select-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-light ${view.zoom > 1 ? (isDragging ? 'cursor-grabbing' : 'cursor-grab') : 'cursor-zoom-in'}`}
                        >
                            <img
                                src={image.src}
                                alt={image.alt}
                                draggable={false}
                                onDragStart={(event) => event.preventDefault()}
                                onLoad={(event) => setNaturalSize({ width: event.currentTarget.naturalWidth, height: event.currentTarget.naturalHeight })}
                                className="pointer-events-none absolute left-1/2 top-1/2 max-w-none select-none object-contain will-change-transform"
                                style={{
                                    width: fittedWidth || undefined,
                                    height: fittedHeight || undefined,
                                    transform: `translate(-50%, -50%) translate3d(${view.x}px, ${view.y}px, 0) scale(${view.zoom})`,
                                    transformOrigin: 'center',
                                }}
                            />
                        </div>
                    </div>
                </dialog>
            )}
        </>
    );
};
