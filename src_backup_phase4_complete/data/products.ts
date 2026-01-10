export interface Product {
    id: string;
    slug: string;
    title: string;
    description: string;
    price: number;
    icon: string;
    features: string[];
    category: 'industry40' | 'compliance' | 'consulting' | 'carbon';
    ctaLink: string;
}

export const products: Product[] = [
    {
        id: 'industry-4-0-toolkit',
        slug: 'industry40-toolkit',
        title: 'Industry 4.0 Digital Transformation Toolkit',
        description: 'Based on Lonza & AstraZeneca RFPs. Accelerate manufacturing digitization.',
        price: 12000,
        icon: '🏭',
        features: [
            'Assessment Framework & Maturity Model',
            'Implementation Roadmap Template',
            'ROI Calculator (Manufacturing-Specific)',
            'Includes 2hr consultation + 30-day support'
        ],
        category: 'industry40',
        ctaLink: '#'
    },
    {
        id: 'hipaa-compliance-package',
        slug: 'hipaa-compliance-package',
        title: 'HIPAA Cloud Migration Compliance Package',
        description: 'Used in 12 successful migrations. Ensure zero-breach cloud architecture.',
        price: 8000,
        icon: '🏥',
        features: [
            'Gap Analysis Template',
            'AWS Architecture Blueprints (HIPAA-Ready)',
            'Security Controls Checklist',
            'Includes 2hr implementation consultation'
        ],
        category: 'compliance',
        ctaLink: '#'
    },
    {
        id: 'it-effectiveness-assessment',
        slug: 'it-effectiveness-assessment',
        title: 'IT Effectiveness Assessment Framework',
        description: 'Benchmark against 100+ companies. Quantify IT value and maturity.',
        price: 5000,
        icon: '📊',
        features: [
            '50-Point Assessment Questionnaire',
            'Automated Scoring & Benchmarking',
            'Executive Summary Template',
            'Includes 1hr consultation'
        ],
        category: 'consulting',
        ctaLink: '#'
    },
    {
        id: 'pact-starter-kit',
        slug: 'pact-carbon-transparency-starter-kit',
        title: 'PACT Carbon Transparency Starter Kit',
        description: 'Accelerate PCF data exchange implementation. Connect to the network.',
        price: 9500,
        icon: 'Leaf',
        features: [
            'API Implementation Guide',
            'Conformance Testing Scripts',
            'Data Model Mapping Template',
            'Includes 3hr workshop'
        ],
        category: 'carbon',
        ctaLink: '#'
    }
];
