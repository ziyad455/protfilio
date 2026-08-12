export interface FeaturedProject {
    slug: string;
    title: string;
    eyebrow: string;
    role: string;
    summary: string;
    outcomeSummary: string;
    coverImage: string;
    coverAlt: string;
    areas: string[];
    technologies: string[];
    externalUrl?: string;
}

export interface TamazightFeaturedProject {
    slug: string;
    title: string;
    eyebrow: string;
    summary: string;
    role: string;
    teamScope: string;
    contributionAreas: string[];
    technologies: string[];
    images: Array<{
        src: string;
        alt: string;
        caption: string;
    }>;
    links: {
        github: string;
        kaggle: string;
    };
}

export const featuredProjects: FeaturedProject[] = [
    {
        slug: 'nexus-inclusion',
        title: 'Nexus Inclusion',
        eyebrow: 'Professional production work',
        role: 'Software engineering across accessibility, technical SEO, frontend quality, and CMS-integrated delivery.',
        summary: 'A flagship case study about treating accessibility, search, performance, and content systems as connected engineering concerns.',
        outcomeSummary: 'The case-study system is ready for verified production evidence, before-and-after comparisons, and measurable outcomes.',
        coverImage: '/assets/projects/project-3-cover.png',
        coverAlt: 'Nexus Inclusion website interface with accessibility and inclusion messaging',
        areas: [
            'Accessibility Engineering',
            'Technical SEO',
            'Performance & Frontend Quality',
            'CMS / Content Engineering',
        ],
        technologies: ['Astro', 'TypeScript', 'Strapi', 'SCSS'],
        externalUrl: 'https://www.nexusinclusion.com/',
    },
];

export const nexusProject = featuredProjects[0];

export const tamazightProject: TamazightFeaturedProject = {
    slug: 'tamazight-multilingo',
    title: 'Tamazight MultiLingo',
    eyebrow: 'Google DeepMind Gemma 3n Hackathon',
    summary: 'An AI-powered multilingual translation application focused on Tamazight, connecting model experimentation with a React Native product and offline/online data architecture.',
    role: 'AI/ML developer and researcher, contributing under the guidance of a senior AI/ML engineer.',
    teamScope: 'The wider team project explored Gemma 3n fine-tuning, multilingual datasets, model integration, Tifinagh input, and deployment constraints for emergency-response translation.',
    contributionAreas: [
        'Fine-tuning, dataset, and LoRA experimentation',
        'Prompt, context, and AI model integration work',
        'Mobile application development and technical research',
    ],
    technologies: ['Gemma 3n', 'Hugging Face', 'React Native', 'Expo', 'TypeScript', 'SQLite', 'Convex', 'LoRA'],
    images: [
        {
            src: '/assets/projects/Tamazight1.png',
            alt: 'Tifinagh-inspired artwork used for the Tamazight MultiLingo project',
            caption: 'Tamazight and Tifinagh visual identity used in the project presentation.',
        },
        {
            src: '/assets/projects/Tamazight2.png',
            alt: 'Kaggle write-up for the Tamazight MultiLingo emergency response application showing the project team',
            caption: 'The team submission in the Google DeepMind Gemma 3n Impact Challenge on Kaggle.',
        },
        {
            src: '/assets/projects/Tamazight3.png',
            alt: 'Kaggle project write-up showing the technical overview and project links for Tamazight MultiLingo',
            caption: 'Project-level technical scope, architecture notes, and supporting research links.',
        },
    ],
    links: {
        github: 'https://github.com/mindful-ai-dude/v3.6-Tamazight_MultiLingo_App',
        kaggle: 'https://www.kaggle.com/competitions/google-gemma-3n-hackathon',
    },
};
