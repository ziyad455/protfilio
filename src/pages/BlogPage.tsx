import { SectionProvider } from '../components/ui/SectionProvider';
import { Typography } from '../components/ui/Typography';

export const BlogPage = () => {
    return (
        <SectionProvider className="py-24 md:py-32 min-h-[70vh] flex items-center justify-center">
            <div className="text-center">
                <Typography as="h1" variant="h1" className="text-4xl md:text-6xl mb-6">
                    Articles
                </Typography>
                <p className="text-neutral-500 text-lg">
                    This page will display all articles fetched from Strapi with pagination.
                </p>
            </div>
        </SectionProvider>
    );
};
