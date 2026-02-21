import { SectionProvider } from '../components/ui/SectionProvider';
import { Typography } from '../components/ui/Typography';

export const WorksPage = () => {
    return (
        <SectionProvider className="py-24 md:py-32 min-h-[70vh] flex items-center justify-center">
            <div className="text-center">
                <Typography as="h1" variant="h1" className="text-4xl md:text-6xl mb-6">
                    All Works
                </Typography>
                <p className="text-neutral-500 text-lg">
                    This page will display the full grid of projects fetched from Strapi.
                </p>
            </div>
        </SectionProvider>
    );
};
