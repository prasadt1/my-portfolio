
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
    ogImage = '/og-image.jpg',
    type = 'website'
}) => {
    const fullTitle = `${title} | Prasad Tilloo - Enterprise Architect`;
    const siteUrl = 'https://prasadtilloo.com'; // Update with your domain

    return (
        <Helmet>
            {/* Basic Meta */}
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            {keywords && <meta name="keywords" content={keywords} />}
            <link rel="canonical" href={canonical || siteUrl} />

            {/* Open Graph */}
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:type" content={type} />
            <meta property="og:url" content={canonical || siteUrl} />
            <meta property="og:image" content={ogImage} />

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={ogImage} />

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
                            "https://github.com/prasadtilloo"
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
