import { useEffect, useState } from 'react';
import { SectionProvider } from '../../ui/SectionProvider';
import { Typography } from '../../ui/Typography';
import { fetchAPI } from '../../../services/api';

interface SkillData {
    id: number;
    attributes: {
        name: string;
    };
}

interface AboutData {
    title: string;
    content: string;
    skills: { data: SkillData[] };
    toolsImage: { data: { attributes: { url: string } } | null };
}

export const AboutSection = () => {
    const [data, setData] = useState<AboutData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const response = await fetchAPI('/api/about?populate=*');
                console.log('API About Raw Response:', response);
                if (response.data) {
                    const aboutData = response.data.attributes || response.data;
                    console.log('Setting About Data:', aboutData);
                    setData(aboutData);
                }
            } catch (err) {
                console.error('Failed to fetch About data:', err);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    const displayData = data || {
        title: "About Me",
        content: "Great design isn't just a pretty interface—it helps people reach their goals naturally, fuels sustainable growth, and keeps systems solid as you scale. I connect design and development, bringing strategy, usability, and execution together to turn visuals into real, measurable results.",
        skills: {
            data: [
                { id: 1, attributes: { name: 'Product Design' } },
                { id: 2, attributes: { name: 'Website Design' } },
                { id: 3, attributes: { name: 'React Development' } }
            ]
        },
        toolsImage: { data: null }
    };

    if (loading) {
        return (
            <SectionProvider className="h-[40vh] flex items-center justify-center" id="about">
                <div className="w-8 h-8 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
            </SectionProvider>
        );
    }

    return (
        <SectionProvider id="about" className="py-24 border-t border-dashed border-gray-200 dark:border-neutral-800">
            <div className="w-full flex justify-between items-start flex-col lg:flex-row gap-12">

                {/* Left Side: Title */}
                <div
                    className="w-full lg:w-1/3"
                    data-aos="fade-up-sm"
                    data-aos-duration="600"
                    data-aos-once="true"
                >
                    <Typography variant="h2" className="text-3xl lg:text-4xl sticky top-24">
                        {displayData.title}
                    </Typography>
                </div>

                {/* Right Side: Content & Skills */}
                <div className="w-full lg:w-2/3">
                    <Typography
                        variant="lead"
                        className="mb-12 whitespace-pre-line"
                        data-aos="fade-up-sm"
                        data-aos-delay="100"
                        data-aos-once="true"
                    >
                        {displayData.content}
                    </Typography>

                    <div
                        className="w-full border-t border-dashed border-gray-200 dark:border-neutral-800 pt-12"
                        data-aos="fade-up-sm"
                        data-aos-delay="200"
                        data-aos-once="true"
                    >
                        <Typography variant="h3" className="mb-6 text-xl">
                            Expertise & Skills
                        </Typography>

                        <div className="flex flex-wrap gap-3">
                            {displayData.skills?.data?.map((skill, index) => (
                                <div
                                    key={skill.id}
                                    className="px-4 py-2 rounded-xl bg-gradient-to-b from-[#f7f8f0] to-[#f1f2f9] dark:from-gray-900 dark:to-gray-800 border border-gray-200/50 dark:border-gray-700/50 text-neutral-700 dark:text-neutral-200 font-medium text-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                                    data-aos="zoom-in"
                                    data-aos-delay={200 + (index * 50)}
                                    data-aos-once="true"
                                >
                                    {skill.attributes.name}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </SectionProvider>
    );
};
