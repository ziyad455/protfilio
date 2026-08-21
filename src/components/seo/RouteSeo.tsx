import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import projectsData from '../../data/projects.json';
import { nexusProject, sophiaProject, tamazightProject } from '../../data/featuredWork';

const SITE_URL = 'https://ziyadtber.netlify.app';
const DEFAULT_IMAGE = `${SITE_URL}/assets/hero/profile.jpg`;
const DEFAULT_DESCRIPTION = 'Ziyad Tber is a software engineer in Marrakech, Morocco, focused on frontend engineering, accessibility, performance, technical SEO, and CMS platforms.';

interface SeoData {
    title: string;
    description: string;
    image?: string;
    noIndex?: boolean;
    schemaType?: 'ProfilePage' | 'CollectionPage' | 'CreativeWork';
}

const staticRoutes: Record<string, SeoData> = {
    '/': {
        title: 'Ziyad Tber | Software Engineer',
        description: DEFAULT_DESCRIPTION,
        schemaType: 'ProfilePage',
    },
    '/works': {
        title: 'Software Engineering Projects | Ziyad Tber',
        description: 'Explore Ziyad Tber’s professional and independent work across accessibility, technical SEO, frontend engineering, AI, and full-stack development.',
        schemaType: 'CollectionPage',
    },
    '/works/nexus-inclusion': {
        title: 'Nexus Inclusion Case Study | Ziyad Tber',
        description: nexusProject.summary,
        image: `${SITE_URL}${nexusProject.coverImage}`,
        schemaType: 'CreativeWork',
    },
    '/works/tamazight-multilingo': {
        title: 'Tamazight MultiLingo | Ziyad Tber',
        description: tamazightProject.summary,
        image: `${SITE_URL}${tamazightProject.images[0].src}`,
        schemaType: 'CreativeWork',
    },
    '/works/sophia': {
        title: 'Sophia Reading Companion | Ziyad Tber',
        description: sophiaProject.summary,
        image: `${SITE_URL}${sophiaProject.logo}`,
        schemaType: 'CreativeWork',
    },
};

const truncate = (value: string, maxLength = 160) => {
    if (value.length <= maxLength) return value;
    return `${value.slice(0, maxLength - 1).trimEnd()}…`;
};

const getSeoData = (pathname: string): SeoData => {
    const staticData = staticRoutes[pathname];
    if (staticData) return staticData;

    const slug = pathname.startsWith('/works/') ? pathname.slice('/works/'.length) : '';
    const project = projectsData.find((item) => item.slug === slug && slug !== 'project-3');

    if (project) {
        return {
            title: `${project.title} | Ziyad Tber`,
            description: truncate(project.tagline || project.description),
            image: `${SITE_URL}${project.coverImage}`,
            schemaType: 'CreativeWork',
        };
    }

    return {
        title: 'Page Not Found | Ziyad Tber',
        description: 'The requested page could not be found.',
        noIndex: true,
    };
};

const setMeta = (attribute: 'name' | 'property', key: string, content: string) => {
    let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
    if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, key);
        document.head.appendChild(element);
    }
    element.content = content;
};

const createSchema = (data: SeoData, canonicalUrl: string, image: string) => {
    const person = {
        '@type': 'Person',
        name: 'Ziyad Tber',
        url: `${SITE_URL}/`,
        image: DEFAULT_IMAGE,
        jobTitle: 'Software Engineer',
        homeLocation: { '@type': 'Place', name: 'Marrakech, Morocco' },
        sameAs: ['https://github.com/ziyad455', 'https://www.linkedin.com/in/ziyad-tber/'],
    };

    if (data.schemaType === 'ProfilePage') {
        return {
            '@context': 'https://schema.org',
            '@graph': [
                { '@type': 'WebSite', '@id': `${SITE_URL}/#website`, url: canonicalUrl, name: 'Ziyad Tber Portfolio' },
                { '@type': 'ProfilePage', '@id': `${SITE_URL}/#profile`, url: canonicalUrl, name: data.title, isPartOf: { '@id': `${SITE_URL}/#website` }, mainEntity: person },
            ],
        };
    }

    if (data.schemaType === 'CollectionPage') {
        return { '@context': 'https://schema.org', '@type': 'CollectionPage', url: canonicalUrl, name: data.title, description: data.description, author: person };
    }

    if (data.schemaType === 'CreativeWork') {
        return { '@context': 'https://schema.org', '@type': 'CreativeWork', url: canonicalUrl, name: data.title.replace(' | Ziyad Tber', ''), description: data.description, image, author: person };
    }

    return null;
};

export const RouteSeo = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        const data = getSeoData(pathname);
        const canonicalUrl = `${SITE_URL}${pathname === '/' ? '/' : pathname}`;
        const image = data.image ?? DEFAULT_IMAGE;
        const robots = data.noIndex ? 'noindex, follow' : 'index, follow, max-image-preview:large';

        document.title = data.title;
        document.documentElement.lang = 'en';
        setMeta('name', 'description', data.description);
        setMeta('name', 'robots', robots);
        setMeta('property', 'og:type', data.schemaType === 'ProfilePage' ? 'profile' : 'website');
        setMeta('property', 'og:title', data.title);
        setMeta('property', 'og:description', data.description);
        setMeta('property', 'og:url', canonicalUrl);
        setMeta('property', 'og:image', image);
        setMeta('name', 'twitter:card', 'summary_large_image');
        setMeta('name', 'twitter:title', data.title);
        setMeta('name', 'twitter:description', data.description);
        setMeta('name', 'twitter:image', image);

        let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
        if (!canonical) {
            canonical = document.createElement('link');
            canonical.rel = 'canonical';
            document.head.appendChild(canonical);
        }
        canonical.href = canonicalUrl;

        const schema = createSchema(data, canonicalUrl, image);
        let script = document.head.querySelector<HTMLScriptElement>('#seo-structured-data');
        if (!schema) {
            script?.remove();
            return;
        }
        if (!script) {
            script = document.createElement('script');
            script.id = 'seo-structured-data';
            script.type = 'application/ld+json';
            document.head.appendChild(script);
        }
        script.textContent = JSON.stringify(schema);
    }, [pathname]);

    return null;
};
