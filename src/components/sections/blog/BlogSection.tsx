import { SectionProvider } from '../../ui/SectionProvider';
import { Typography } from '../../ui/Typography';
import { Button } from '../../ui/Button';
import { BlogCard } from '../../cards/BlogCard';
import { AnimatedText } from '../../ui/AnimatedText';
import { Link } from 'react-router-dom';
import articlesData from '../../../data/articles.json';

interface BlogSectionProps {
    title?: string;
    description?: string;
    limit?: number;
    showAll?: boolean;
    showViewAllButton?: boolean;
}

export const BlogSection = ({
    title = "Latest Articles ↓",
    description = "These are my notes and articles on design, development and life thinking.",
    limit = 3,
    showAll = false,
    showViewAllButton = true
}: BlogSectionProps) => {
    // Articles are already sorted by publishDate descending in the JSON
    const articles = articlesData.map((a) => ({
        title: a.title,
        slug: a.slug,
        excerpt: a.excerpt,
        publishDate: a.publishDate,
        img: a.coverImage,
    }));

    const displayArticles = showAll ? articles : articles.slice(0, limit);

    return (
        <SectionProvider className="py-16 md:py-16 md:pb-12 border-t border-dashed border-gray-200 dark:border-neutral-800">
            <div className="space-y-10 md:space-y-16">

                {/* Section Header */}
                <div className="relative z-20 w-full mx-auto mt-12 text-center">
                    <Typography as="h2" variant="h2" className="text-4xl text-center tracking-normal sm:text-5xl justify-center mb-0">
                        <AnimatedText delay={0.2} stagger={0.08} content={title} className="justify-center" />
                    </Typography>
                    {description && (
                        <div className="mt-3 text-sm leading-6 sm:mt-4 lg:mt-6 sm:leading-7 lg:leading-8 sm:text-base lg:text-lg text-neutral-700 dark:text-neutral-300 max-w-full lg:max-w-3xl m-auto inline-block">
                            <AnimatedText delay={0.6} stagger={0.03} content={description} className="justify-center" />
                        </div>
                    )}
                </div>

                {/* Article Grid */}
                <div className="grid gap-x-6 gap-y-10 md:grid-cols-2 xl:grid-cols-3 pb-8">
                    {displayArticles.map((article, index) => (
                        <BlogCard
                            key={index}
                            title={article.title}
                            description={article.excerpt}
                            slug={article.slug}
                            publishDate={article.publishDate}
                            img={article.img}
                            index={index}
                        />
                    ))}
                </div>
            </div>

            {/* View All Articles Button */}
            {showViewAllButton && (
                <div className="flex justify-center mt-4 mb-12">
                    <Button as={Link} to="/blog" variant="outline" className="w-[80%] lg:w-[40%] font-semibold">
                        View All Articles
                    </Button>
                </div>
            )}
        </SectionProvider>
    );
};
