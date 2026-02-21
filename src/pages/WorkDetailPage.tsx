import { useParams } from 'react-router-dom';
import { SectionProvider } from '../components/ui/SectionProvider';
import { Typography } from '../components/ui/Typography';

export const WorkDetailPage = () => {
    const { slug } = useParams();

    return (
        <SectionProvider className="py-24 md:py-32 min-h-[70vh] flex items-center justify-center">
            <div className="text-center">
                <Typography as="h1" variant="h1" className="text-4xl md:text-6xl mb-6">
                    Work Details
                </Typography>
                <p className="text-neutral-500 text-lg mb-4">
                    Fetching data for project: <strong className="text-primary">{slug}</strong>
                </p>
                <p className="text-neutral-400">
                    This page will display detailed information about the selected project.
                </p>
            </div>
        </SectionProvider>
    );
};
