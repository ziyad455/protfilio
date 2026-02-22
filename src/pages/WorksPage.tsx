import { FeaturedWorkSection } from '../components/sections/work/FeaturedWorkSection';

export const WorksPage = () => {
    return (
        <div className="relative site-container z-20 w-full mx-auto px-4 xl:px-0">
            <FeaturedWorkSection
                title="All Works ↓"
                description="A complete collection of my projects — from concept to execution."
                showAll={true}
                showViewAllButton={false}
            />
        </div>
    );
};
