import { BlogSection } from '../components/sections/blog/BlogSection';

export const BlogPage = () => {
    return (
        <div className="relative site-container z-20 w-full mx-auto px-4 xl:px-0">
            <BlogSection
                title="All Articles ↓"
                description="Thoughts, guides, and lessons learned along the way."
                showAll={true}
                showViewAllButton={false}
            />
        </div>
    );
};
