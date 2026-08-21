import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { SectionProvider } from '../components/ui/SectionProvider';
import { Typography } from '../components/ui/Typography';
import { Button } from '../components/ui/Button';

export const NotFoundPage = () => (
    <main>
        <SectionProvider className="flex min-h-[70vh] items-center justify-center py-24 md:py-32">
            <div className="text-center">
                <Typography as="h1" variant="h1" className="mb-4 text-4xl">
                    Page Not Found
                </Typography>
                <p className="mb-8 text-neutral-500">The page you're looking for doesn't exist or has been moved.</p>
                <Button as={Link} to="/" variant="outline">
                    <ArrowLeft aria-hidden="true" size={16} className="mr-2" /> Back to Home
                </Button>
            </div>
        </SectionProvider>
    </main>
);
