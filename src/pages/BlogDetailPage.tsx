import { useParams } from 'react-router-dom';
import { SectionProvider } from '../components/ui/SectionProvider';
import { Typography } from '../components/ui/Typography';

export const BlogDetailPage = () => {
    const { slug } = useParams();

    return (
        <SectionProvider className="py-24 md:py-32 min-h-[70vh] flex items-center justify-center">
            <div className="text-center max-w-3xl mx-auto">
                <Typography as="h1" variant="h1" className="text-4xl md:text-6xl mb-6 leading-tight">
                    Article Details
                </Typography>
                <p className="text-neutral-500 text-lg mb-8 border-b dark:border-neutral-800 pb-8">
                    Fetching article contents for: <strong className="text-primary">{slug}</strong>
                </p>
                <div className="text-left text-neutral-400 space-y-4">
                    <p>This page will render the rich text content of the article from Strapi.</p>
                </div>
            </div>
        </SectionProvider>
    );
};
