import { SectionProvider } from '../../ui/SectionProvider';
import { Typography } from '../../ui/Typography';
import aboutData from '../../../data/about.json';

export const AboutSection = () => {
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
                        {aboutData.title}
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
                        {aboutData.content}
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
                            {aboutData.skills.map((skill, index) => (
                                <div
                                    key={skill}
                                    className="px-4 py-2 rounded-xl bg-gradient-to-b from-[#f7f8f0] to-[#f1f2f9] dark:from-gray-900 dark:to-gray-800 border border-gray-200/50 dark:border-gray-700/50 text-neutral-700 dark:text-neutral-200 font-medium text-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                                    data-aos="zoom-in"
                                    data-aos-delay={200 + (index * 50)}
                                    data-aos-once="true"
                                >
                                    {skill}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </SectionProvider>
    );
};
