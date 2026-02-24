import { useParams, Link } from 'react-router-dom';
import { SectionProvider } from '../components/ui/SectionProvider';
import { Typography } from '../components/ui/Typography';
import { Button } from '../components/ui/Button';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import articlesData from '../data/articles.json';

export const BlogDetailPage = () => {
    const { slug } = useParams();

    const article = articlesData.find((a) => a.slug === slug);

    if (!article) {
        return (
            <SectionProvider className="py-24 md:py-32 min-h-[70vh] flex items-center justify-center">
                <div className="text-center">
                    <Typography as="h1" variant="h1" className="text-4xl mb-4">
                        Article Not Found
                    </Typography>
                    <p className="text-neutral-500 mb-8">The article you're looking for doesn't exist or has been removed.</p>
                    <Button as={Link} to="/blog" variant="outline">
                        <ArrowLeft size={16} className="mr-2" /> Back to Blog
                    </Button>
                </div>
            </SectionProvider>
        );
    }

    const formattedDate = new Date(article.publishDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <div className="relative site-container z-20 w-full mx-auto px-4 xl:px-0">
            <SectionProvider className="py-16 md:py-24">
                {/* Back button */}
                <div className="mb-8" data-aos="fade-up-sm">
                    <Button as={Link} to="/blog" variant="ghost" size="sm">
                        <ArrowLeft size={16} className="mr-2" /> Back to Blog
                    </Button>
                </div>

                {/* Article header */}
                <article className="max-w-3xl mx-auto">
                    <header className="mb-12" data-aos="fade-up-sm" data-aos-delay="100">
                        <Typography as="h1" variant="h1" className="text-3xl md:text-4xl lg:text-5xl mb-6 leading-tight">
                            {article.title}
                        </Typography>

                        {/* Meta info */}
                        <div className="flex items-center gap-4 text-sm text-neutral-500 dark:text-neutral-400">
                            <span className="inline-flex items-center gap-1.5">
                                <Calendar size={14} className="opacity-60" />
                                {formattedDate}
                            </span>
                            {article.readingTime && (
                                <span className="inline-flex items-center gap-1.5">
                                    <Clock size={14} className="opacity-60" />
                                    {article.readingTime}
                                </span>
                            )}
                        </div>
                    </header>

                    {/* Cover image */}
                    {article.coverImage && (
                        <div className="rounded-2xl overflow-hidden mb-12 border border-neutral-200/50 dark:border-neutral-700/50" data-aos="fade-up-sm" data-aos-delay="150">
                            <img
                                src={article.coverImage}
                                alt={article.title}
                                className="w-full h-auto object-cover"
                            />
                        </div>
                    )}

                    {/* Article content */}
                    <div
                        className="article-content prose prose-lg dark:prose-invert max-w-none text-neutral-700 dark:text-neutral-300 leading-relaxed"
                        data-aos="fade-up-sm"
                        data-aos-delay="200"
                        dangerouslySetInnerHTML={{ __html: article.content }}
                    />
                </article>
            </SectionProvider>
        </div>
    );
};
