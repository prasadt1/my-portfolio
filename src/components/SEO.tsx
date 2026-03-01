
import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title: string;
    description: string;
    keywords?: string;
    canonical?: string;
    ogImage?: string;
    type?: 'website' | 'profile' | 'article';
    structuredData?: Record<string, unknown> | Array<Record<string, unknown>>;
}

const SEO: React.FC<SEOProps> = ({
    title,
    description,
    keywords,
    canonical,
    ogImage = '/og/default.png',
    type = 'website',
    structuredData
}) => {
    const siteName = import.meta.env.VITE_SITE_NAME || 'Prasad Tilloo - Principal Architect';
    const siteUrl = import.meta.env.VITE_SITE_URL || 'https://prasadtilloo.com';
    const fullTitle = `${title} | ${siteName}`;
    
    // Build full OG image URL
    const fullOgImage = ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage}`;
    const fullCanonical = canonical || `${siteUrl}${typeof window !== 'undefined' ? window.location.pathname : ''}`;

    const baseStructuredData: Array<Record<string, unknown>> = [
        {
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Prasad Tilloo",
            "jobTitle": "Principal Architect | Digital Transformation | Acting Fractional CTO (Hands-on)",
            "description": description,
            "url": siteUrl,
            "sameAs": [
                "https://linkedin.com/in/prasadtilloo",
                "https://github.com/prasadt1"
            ],
            "knowsAbout": [
                "Principal Architecture",
                "Digital Transformation",
                "Acting Fractional CTO",
                "Enterprise Architecture",
                "Healthtech",
                "Telemedicine",
                "Cloud Modernization",
                "AI/ML Engineering",
                "HIPAA Compliance",
                "PCI-DSS",
                "AWS",
                "Azure",
                "GCP"
            ]
        },
        {
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            "name": "Prasad Tilloo Consulting",
            "description": "Principal architecture, digital transformation, and acting fractional CTO advisory.",
            "priceRange": "€300 - €15000",
            "url": siteUrl,
            "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Consulting Services",
                "itemListElement": [
                    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Acting Fractional CTO (Hands-on)" } },
                    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Architecture Review" } },
                    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Cloud Migration" } },
                    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Platform Modernization" } }
                ]
            }
        },
        {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": siteName,
            "url": siteUrl,
            "potentialAction": {
                "@type": "SearchAction",
                "target": `${siteUrl}/projects?query={search_term_string}`,
                "query-input": "required name=search_term_string"
            }
        }
    ];

    const additionalStructuredData = structuredData
        ? (Array.isArray(structuredData) ? structuredData : [structuredData])
        : [];

    const mergedStructuredData = [...baseStructuredData, ...additionalStructuredData];

    return (
        <Helmet>
            {/* Basic Meta */}
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            {keywords && <meta name="keywords" content={keywords} />}
            <link rel="canonical" href={fullCanonical} />

            {/* Open Graph */}
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:type" content={type} />
            <meta property="og:url" content={fullCanonical} />
            <meta property="og:image" content={fullOgImage} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:site_name" content={siteName} />
            
            {/* Language alternate links */}
            <link rel="alternate" hrefLang="en" href={fullCanonical} />
            <link rel="alternate" hrefLang="de" href={`${fullCanonical}?lang=de`} />
            <link rel="alternate" hrefLang="x-default" href={fullCanonical} />

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={fullOgImage} />

            {/* JSON-LD Structured Data */}
            <script type="application/ld+json">
                {JSON.stringify(mergedStructuredData)}
            </script>
        </Helmet>
    );
};

export default SEO;
