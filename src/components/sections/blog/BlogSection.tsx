import { useEffect, useState } from 'react';
import { SectionProvider } from '../../ui/SectionProvider';
import { Typography } from '../../ui/Typography';
import { Button } from '../../ui/Button';
import { BlogCard } from '../../cards/BlogCard';
import { fetchAPI } from '../../../services/api';
import { AnimatedText } from '../../ui/AnimatedText';

interface ArticleAttributes {
    title: string;
    slug: string;
    excerpt?: string;
    coverImage: any;
    publishDate: string;
}

interface ArticleData {
    id: number;
    attributes: ArticleAttributes;
    // Strapi V4 flat structure support
    title?: string;
    slug?: string;
    excerpt?: string;
    coverImage?: any;
    publishDate?: string;
}

const defaultArticles = [
    {
        title: "The Future of Web Design in 2025",
        slug: "future-of-web-design",
        excerpt: "Exploring the upcoming trends that will shape the aesthetic and functional web experiences of the next decade.",
        publishDate: "2024-10-15T00:00:00.000Z",
        img: "/assets/blog/01.jpg"
    },
    {
        title: "Mastering Framer Motion for React Developers",
        slug: "mastering-framer-motion",
        excerpt: "A comprehensive guide to adding delightful micro-interactions and complex animations to your React stack.",
        publishDate: "2024-09-22T00:00:00.000Z",
        img: "/assets/blog/02.jpg"
    },
    {
        title: "Why Minimalist UI is Here to Stay",
        slug: "minimalist-ui",
        excerpt: "Analyzing the psychological impact of clean, uncluttered interfaces and how to achieve them effectively.",
        publishDate: "2024-08-05T00:00:00.000Z",
        img: "/assets/blog/03.jpg"
    }
];

interface BlogSectionProps {
    title?: string;
    description?: string;
    limit?: number;
    showViewAllButton?: boolean;
}

export const BlogSection = ({
    title = "Latest Articles ↓",
    description = "These are my notes and articles on design, development and life thinking.",
    limit = 3,
    showViewAllButton = true
}: BlogSectionProps) => {
    const [articles, setArticles] = useState<any[]>(defaultArticles);
    const [loading, setLoading] = useState(true);

    const getImageUrl = (url?: string, defaultUrl?: string) => {
        if (!url) return defaultUrl || '/assets/home/gradientshub.jpg';
        return url.startsWith('http') ? url : `${import.meta.env.VITE_STRAPI_API_URL}${url}`;
    };

    useEffect(() => {
        const loadArticles = async () => {
            try {
                const response = await fetchAPI('/api/articles?populate=*');
                console.log('API Articles Raw Response:', response);

                if (response.data && Array.isArray(response.data) && response.data.length > 0) {
                    const mappedArticles = response.data.map((item: ArticleData) => {
                        const attrs = item.attributes || item;
                        const rawImageUrl = attrs.coverImage?.url || attrs.coverImage?.data?.attributes?.url;

                        // Ensure we have a valid date string
                        const dateString = attrs.publishDate || new Date().toISOString();

                        return {
                            title: attrs.title || 'Untitled Article',
                            slug: attrs.slug || `article-${item.id}`,
                            excerpt: attrs.excerpt || '',
                            publishDate: dateString,
                            img: getImageUrl(rawImageUrl, '/assets/blog/default.jpg')
                        };
                    });

                    // Sort by publish date descending
                    const sortedArticles = mappedArticles.sort((a: any, b: any) => {
                        return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
                    });

                    setArticles(sortedArticles);
                }
            } catch (err) {
                console.error('Failed to fetch articles data:', err);
            } finally {
                setLoading(false);
            }
        };

        loadArticles();
    }, []);

    const displayArticles = articles.slice(0, limit);

    if (loading) {
        return (
            <SectionProvider className="py-16 md:py-16 md:pb-12 min-h-[40vh] flex items-center justify-center border-t border-dashed border-gray-200 dark:border-neutral-800">
                <div className="w-8 h-8 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
            </SectionProvider>
        );
    }

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
                    <Button as="a" href="/blog" variant="outline" className="w-[80%] lg:w-[40%] font-semibold">
                        View All Articles
                    </Button>
                </div>
            )}
        </SectionProvider>
    );
};
