import { LucideIcon } from 'lucide-react';

export interface Product {
    id: string;
    slug: string;
    title: string;
    description: string;
    price: number;
    icon: string; // Lucide icon name or emoji
    features: string[];
    category: 'industry40' | 'compliance' | 'consulting' | 'carbon' | 'ecommerce' | 'architecture' | 'data';
    ctaLink: string;
}

export const products: Product[] = [
    {
        id: 'ecommerce-blueprint',
        slug: 'ecommerce-blueprint',
        title: 'Global Headless eCommerce Blueprint',
        description: 'The exact architecture used to scale BRITA to 15+ markets. Includes Azure middleware patterns and Nuxt.js store templates.',
        price: 15000,
        icon: 'ShoppingBag',
        features: [
            'Headless Commerce Reference Architecture',
            'Multi-Tenant Governance Model',
            'Azure Integration Logic Apps',
            'Vue.js/Nuxt.js Storefront Boilerplate'
        ],
        category: 'ecommerce',
        ctaLink: '#'
    },
    {
        id: 'pact-starter-kit',
        slug: 'pact-starter-kit',
        title: 'PACT Carbon Transparency Starter Kit',
        description: 'Accelerate PCF data exchange implementation. Connect to the WBCSD network with pre-built adaptors.',
        price: 9500,
        icon: 'Leaf',
        features: [
            'API Implementation Guide (OpenAPI)',
            'Conformance Testing Scripts',
            'Data Model Mapping Template',
            'Includes 3hr integration workshop'
        ],
        category: 'carbon',
        ctaLink: '#'
    },
    {
        id: 'data-lake-architecture',
        slug: 'data-lake-architecture',
        title: 'GDPR-Compliant Data Mesh Framework',
        description: 'Enterprise Data Lake architecture with automated PII masking and governance. Validated in pharma.',
        price: 18000,
        icon: 'Database',
        features: [
            'AWS Lake Formation Terraform Modules',
            'Automated PII Masking Pipeline',
            'Data Governance Charter Template',
            'Self-Service Portal Wireframes'
        ],
        category: 'data',
        ctaLink: '#'
    },
    {
        id: 'display-ads-architecture',
        slug: 'display-ads-architecture',
        title: 'High-Scale AdTech Architecture',
        description: 'Event-driven architecture for <20ms latency bidding systems. Proven at Delivery Hero.',
        price: 12000,
        icon: 'Zap',
        features: [
            'Golang & Redis Architecture Diagrams',
            'Kubernetes Scaling Policies',
            'Exact-Once Processing Patterns',
            'Load Testing Framework (k6)'
        ],
        category: 'architecture',
        ctaLink: '#'
    },
    {
        id: 'hipaa-compliance-package',
        slug: 'hipaa-compliance-package',
        title: 'HIPAA Cloud Migration Compliance Package',
        description: 'Used in 12 successful migrations. Ensure zero-breach cloud architecture to audit standards.',
        price: 8000,
        icon: 'Shield',
        features: [
            'Gap Analysis Template (Excel)',
            'AWS Architecture Blueprints (HIPAA-Ready)',
            'Security Controls Checklist',
            'Includes 2hr implementation consultation'
        ],
        category: 'compliance',
        ctaLink: '#'
    },
    {
        id: 'industry-4-0-toolkit',
        slug: 'industry40-toolkit',
        title: 'Industry 4.0 Digital Transformation Toolkit',
        description: 'Based on Lonza & AstraZeneca RFPs. Accelerate manufacturing digitization and IoT adoption.',
        price: 12000,
        icon: 'Factory',
        features: [
            'IoT Assessment Framework',
            'Smart Factory Implementation Roadmap',
            'ROI Calculator (Manufacturing-Specific)',
            'Includes 2hr consultation'
        ],
        category: 'industry40',
        ctaLink: '#'
    },
    {
        id: 'it-effectiveness-assessment',
        slug: 'it-effectiveness-assessment',
        title: 'IT Effectiveness Assessment Framework',
        description: 'Benchmark against 100+ companies. Quantify IT value and maturity for investors or boards.',
        price: 5000,
        icon: 'BarChart',
        features: [
            '50-Point Assessment Questionnaire',
            'Automated Scoring & Benchmarking',
            'Executive Summary Template',
            'Includes 1hr consultation'
        ],
        category: 'consulting',
        ctaLink: '#'
    }
];
