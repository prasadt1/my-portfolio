
import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title: string;
    description: string;
    keywords?: string;
    canonical?: string;
    ogImage?: string;
    type?: 'website' | 'profile' | 'article';
}

const SEO: React.FC<SEOProps> = ({
    title,
    description,
    keywords,
    canonical,
    ogImage = '/og/default.png',
    type = 'website'
}) => {
    const siteName = import.meta.env.VITE_SITE_NAME || 'Prasad Tilloo - Enterprise Architect';
    const siteUrl = import.meta.env.VITE_SITE_URL || 'https://prasadtilloo.com';
    const fullTitle = `${title} | ${siteName}`;
    
    // Build full OG image URL
    const fullOgImage = ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage}`;
    const fullCanonical = canonical || `${siteUrl}${typeof window !== 'undefined' ? window.location.pathname : ''}`;

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
                {JSON.stringify([
                    {
                        "@context": "https://schema.org",
                        "@type": "Person",
                        "name": "Prasad Tilloo",
                        "jobTitle": "Senior IT Leader & Enterprise Architect",
                        "description": description,
                        "url": siteUrl,
                        "sameAs": [
                            "https://linkedin.com/in/prasadtilloo",
                            "https://github.com/prasadt1"
                        ],
                        "knowsAbout": [
                            "Cloud Architecture",
                            "AI/ML Engineering",
                            "Enterprise Architecture",
                            "HIPAA Compliance",
                            "PCI-DSS",
                            "AWS",
                            "Azure"
                        ]
                    },
                    {
                        "@context": "https://schema.org",
                        "@type": "ProfessionalService",
                        "name": "Prasad Tilloo Consulting",
                        "description": "Enterprise Architecture & Digital Transformation Services",
                        "priceRange": "€300 - €15000",
                        "url": siteUrl,
                        "hasOfferCatalog": {
                            "@type": "OfferCatalog",
                            "name": "Consulting Services",
                            "itemListElement": [
                                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Cloud Migration" } },
                                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "PACT Sustainability Implementation" } },
                                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Industry 4.0 Digital Transformation" } },
                                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Fractional CTO/Architect" } }
                            ]
                        }
                    }
                ])}
            </script>
        </Helmet>
    );
};

export default SEO;
