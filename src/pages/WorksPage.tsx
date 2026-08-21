import { FeaturedWorkSection } from '../components/sections/work/FeaturedWorkSection';

export const WorksPage = () => {
    return (
        <main className="relative site-container z-20 w-full mx-auto px-4 xl:px-0">
            <FeaturedWorkSection
                title="Main Projects ↓"
                description="My strongest professional and independent engineering work, followed by a broader collection of projects."
                showViewAllButton={false}
                headingLevel="h1"
            />
        </main>
    );
};
