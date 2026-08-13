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

export interface SophiaFeaturedProject {
    title: string;
    tagline: string;
    status: string;
    summary: string;
    role: string;
    technologies: string;
    logo: string;
    architectureImages: Array<{
        src: string;
        alt: string;
        caption: string;
    }>;
}

export const featuredProjects: FeaturedProject[] = [
    {
        slug: 'nexus-inclusion',
        title: 'Nexus Inclusion',
        eyebrow: 'Professional production work',
        role: 'Software engineering across accessibility, technical SEO, frontend quality, and CMS-integrated delivery.',
        summary: 'During my time at Inveneo, I worked on Nexus Inclusion, an Irish company focused on digital accessibility. I contributed to their platform across accessibility engineering, frontend quality and performance, technical SEO, and CMS development.',
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

export const sophiaProject: SophiaFeaturedProject = {
    title: 'Sophia',
    tagline: 'A place beyond the noise.',
    status: 'Active MVP development',
    summary: 'A philosophy reading companion I’m building to bring reading, reflection, highlights, notes, and eventually contextual AI into one focused environment. Sophia keeps the book at the center while building private ownership, PDF processing, reading state, annotations, and model-independent AI architecture around it.',
    role: 'Personal project — product design & full-stack engineering',
    technologies: 'React · TypeScript · Express · PostgreSQL · Prisma',
    logo: '/assets/projects/SophiaLogo.png',
    architectureImages: [
        {
            src: '/assets/projects/SophiaArchitectureOverview.png',
            alt: 'Overview diagram of Sophia’s reading, PDF processing, system, and planned AI architecture',
            caption: 'An overview of Sophia’s architecture, connecting the protected reading experience, PDF processing pipeline, core application layers, and planned model-independent AI system.',
        },
        {
            src: '/assets/projects/SophiaSystemArchitecture.png',
            alt: 'Detailed full-stack Sophia architecture showing private services, PDF processing, domain data, and the planned AI layer',
            caption: 'A deeper look at Sophia’s full-stack architecture, showing user-owned data, private PDF processing, reading services, and the planned AI orchestration layer designed to keep models replaceable.',
        },
        {
            src: '/assets/projects/Sophiadb_digram.png',
            alt: 'Detailed entity relationship diagram for Sophia’s database and domain model',
            caption: 'Sophia’s domain and database model, connecting authentication, book ownership, processed reading structure, progress, highlights, notes, and the foundation for future AI features.',
        },
    ],
};
