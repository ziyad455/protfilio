import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { cn } from '../../lib/utils';
import { Sun, Moon, Menu, X, Download } from 'lucide-react';
import { Button } from '../ui/Button';
import { cvUrl } from '../../lib/cv';

const navLinks = [
    { name: 'Home', url: '/' },
    { name: 'Featured Work', url: '/works' },
];

export const Navbar = () => {
    const { theme, toggleTheme } = useTheme();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Track scroll for backdrop blur effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [mobileMenuOpen]);

    const closeMobileMenu = () => setMobileMenuOpen(false);

    return (
        <>
            {/* Spacer div to push content below the fixed header */}
            <div className="relative w-full h-16 sm:h-20 opacity-0 pointer-events-none" />

            <header className="fixed top-2 sm:top-4 z-50 w-full px-3 sm:px-4 lg:px-6">
                <div
                    className={cn(
                        "flex items-center justify-between h-14 sm:h-15 site-container mx-auto px-4 sm:px-6 py-2.5 transition-all duration-300",
                        scrolled
                            ? "bg-white/80 dark:bg-neutral-950/80 backdrop-blur-xl border-[0.5px] border-neutral-200/50 dark:border-neutral-700/50 rounded-2xl shadow-sm"
                            : "border-transparent border-[0.5px]"
                    )}
                >
                    {/* Logo */}
                    <div className="flex-shrink-0 z-50">
                        <Link to="/" className="h-10 text-base group relative z-30 flex items-center">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-blue-600 dark:from-primary-light dark:to-blue-400 flex items-center justify-center text-white font-brand text-lg font-bold shadow-md">
                                Z
                            </div>
                        </Link>
                    </div>

                    {/* Mobile Menu Background Overlay */}
                    {mobileMenuOpen && (
                        <div
                            className="fixed inset-0 z-20 w-screen h-screen bg-white/90 backdrop-blur-sm dark:bg-neutral-950/90 sm:hidden animate-fade-in"
                            onClick={closeMobileMenu}
                        />
                    )}

                    {/* Navigation */}
                    <nav className="relative z-30 flex flex-row-reverse justify-start w-full text-sm sm:justify-end text-neutral-500 dark:text-neutral-400 sm:flex-row sm:items-center">
                        {/* Mobile Menu Toggle Buttons */}
                        <div className="flex items-center gap-2 sm:hidden">
                            {/* Dark Mode Toggle (Mobile) */}
                            <button
                                onClick={toggleTheme}
                                className="flex items-center justify-center w-10 h-10 cursor-pointer rounded-full bg-gradient-to-b from-white to-[#edeefa] border-[0.5px] border-[#f3f3ff] dark:from-neutral-800 dark:to-neutral-600 dark:border-neutral-600 transition-transform duration-200 active:scale-95"
                                aria-label="Toggle dark mode"
                            >
                                <div
                                    className="flex justify-center items-center w-6 h-6 relative overflow-hidden rounded-full bg-gradient-to-b from-[#85a6ff] to-[#2d6dc3] border-[0.5px] border-[#7fa1ff]"
                                    style={{ boxShadow: '0px 2px 3px 0 rgba(55,52,209,0.21)' }}
                                >
                                    {theme === 'dark' ? (
                                        <Moon className="text-white w-4 h-4" />
                                    ) : (
                                        <Sun className="text-white w-4 h-4" />
                                    )}
                                </div>
                            </button>

                            {/* Hamburger / Close Button */}
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="flex items-center justify-center w-10 h-10 cursor-pointer transition-transform duration-200 active:scale-90"
                                aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                            >
                                {mobileMenuOpen ? (
                                    <X className="w-6 h-6 text-neutral-600 dark:text-neutral-200" />
                                ) : (
                                    <Menu className="w-7 h-7 text-neutral-700 dark:text-neutral-200" />
                                )}
                            </button>
                        </div>

                        {/* Menu Items */}
                        <div
                            className={cn(
                                "fixed top-[68px] left-3 right-3 sm:top-0 sm:left-0 sm:right-0 z-40 flex-col items-center justify-start w-auto h-auto text-sm pt-6 pb-5 sm:py-0 sm:relative sm:flex-row sm:flex",
                                mobileMenuOpen ? "flex" : "hidden sm:flex"
                            )}
                        >
                            {/* Mobile Menu Background Card */}
                            <div className="absolute inset-0 top-0 right-0 block w-full h-full sm:hidden">
                                <div className="relative w-full h-full bg-white/95 border border-dashed border-neutral-300 dark:border-neutral-700 backdrop-blur-md rounded-2xl dark:bg-neutral-950/95 shadow-lg" />
                            </div>

                            {/* Menu Links */}
                            <div className="relative z-10 flex flex-col sm:flex-row items-center w-full sm:w-auto gap-1 sm:gap-0">
                                {navLinks.map((link) => (
                                    <NavLink
                                        key={link.url}
                                        to={link.url}
                                        end={link.url === '/'}
                                        onClick={closeMobileMenu}
                                        className={({ isActive }) =>
                                            cn(
                                                "relative flex items-center justify-center w-full sm:w-auto px-5 py-2.5 sm:py-2 sm:px-3 md:px-4 font-medium tracking-wide text-center duration-200 ease-out rounded-lg sm:rounded-none transition-all active:scale-[0.98] sm:active:scale-100",
                                                isActive
                                                    ? "text-primary dark:text-primary-light"
                                                    : "text-neutral-700 dark:text-neutral-200 hover:text-primary sm:hover:bg-transparent dark:hover:text-white dark:hover:bg-neutral-800/50 sm:dark:hover:bg-transparent"
                                            )
                                        }
                                    >
                                        {link.name}
                                    </NavLink>
                                ))}
                            </div>

                            {/* Resume Button (Mobile) */}
                            <div className="relative z-10 w-full px-5 mt-3 sm:hidden">
                                <Button
                                    as="a"
                                    href={cvUrl}
                                    target="_blank"
                                    variant="primary"
                                    className="w-full justify-center"
                                    onClick={closeMobileMenu}
                                >
                                    Resume <Download size={16} />
                                </Button>
                            </div>
                        </div>

                        {/* Desktop Actions */}
                        <div className="relative hidden sm:flex items-center gap-2 ml-4 lg:ml-6">
                            {/* Resume Button (Desktop) */}
                            <Button
                                as="a"
                                href={cvUrl}
                                target="_blank"
                                variant="primary"
                                size="sm"
                                className="mx-1"
                            >
                                Resume <Download size={16} />
                            </Button>

                            <span className="hidden sm:inline-block bg-[rgba(183,202,255,0.5)] mt-[20px] -translate-y-1/2 w-px h-[20px]" />

                            {/* Dark Mode Toggle (Desktop) */}
                            <button
                                onClick={toggleTheme}
                                className="relative flex items-center h-9 px-2 gap-1.5 font-medium cursor-pointer rounded-full bg-gradient-to-b from-white to-[#edf1fa] border-[0.5px] border-[#f3f5ff] dark:from-neutral-800 dark:to-neutral-600 dark:border-neutral-600 transition-all duration-200 hover:shadow-md hover:scale-105 active:scale-95 mx-1"
                                aria-label="Toggle dark mode"
                            >
                                <div
                                    className="flex justify-center items-center flex-shrink-0 w-6 h-6 relative overflow-hidden rounded-full bg-gradient-to-b from-[#85a6ff] to-[#2d6dc3] border-[0.5px] border-[#7fa1ff]"
                                    style={{ boxShadow: '0px 2px 3px 0 rgba(55,52,209,0.21)' }}
                                >
                                    {theme === 'dark' ? (
                                        <Moon className="text-white w-4 h-4 transition duration-200" />
                                    ) : (
                                        <Sun className="text-white w-4 h-4 transition duration-200" />
                                    )}
                                </div>
                                <span className="hidden sm:inline-block whitespace-nowrap text-sm text-[#6f6c8f] dark:text-neutral-400">
                                    {theme === 'dark' ? 'Dark' : 'Light'}
                                </span>
                            </button>
                        </div>
                    </nav>
                </div>
            </header>

            {/* Navbar CSS for underline animation */}
            <style>{`
                @media (min-width: 640px) {
                    nav a::after {
                        content: '';
                        position: absolute;
                        bottom: 0;
                        left: 50%;
                        transform: translateX(-50%) scaleX(0);
                        width: 70%;
                        height: 2px;
                        background: var(--color-primary);
                        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                        border-radius: 2px;
                    }
                    nav a:hover::after,
                    nav a.active::after {
                        transform: translateX(-50%) scaleX(1);
                    }
                }
                @keyframes fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                .animate-fade-in {
                    animation: fade-in 0.3s ease-out;
                }
            `}</style>
        </>
    );
};
