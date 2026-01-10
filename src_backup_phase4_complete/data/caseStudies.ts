import { CaseStudy } from "../types/CaseStudy";

export const caseStudies: CaseStudy[] = [
    {
        id: 'pwc-healthcare',
        slug: 'pwc-healthcare-modernization',
        domains: ['Healthcare', 'Cloud Migration', 'Compliance'],
        projectType: 'migration',
        seoTags: ['HIPAA', 'AWS', 'Healthcare', 'Compliance'],
        header: {
            eyebrow: '$500K SAVED ANNUALLY',
            title: 'How We Modernized a Legacy Healthcare System While Ensuring HIPAA/FHIR/PCI Compliance',
            client: {
                type: 'Fortune 500 Professional Services',
                size: '€50B+ revenue, Healthcare Practice',
                industry: 'Healthcare IT'
            }
        },
        challenge: {
            situation: '15-year-old e-commerce and healthcare management platform facing compliance audit failures, performance issues, and escalating maintenance costs. Board deadline: 6 months to achieve full HIPAA/FHIR compliance or face penalties and potential client losses.',
            pain_points: [
                {
                    icon: '💸',
                    title: 'Failing Compliance Audits',
                    description: 'Monthly audit findings averaging €50K in remediation costs',
                    impact: '€600K annual compliance burden'
                },
                {
                    icon: '🐌',
                    title: 'Performance Degradation',
                    description: 'Patient data queries taking 10+ seconds, affecting user experience',
                    impact: '30% user churn risk'
                },
                {
                    icon: '⏰',
                    title: 'Legacy System EOL',
                    description: 'Vendor announcing end-of-support in 9 months',
                    impact: 'Forced migration timeline'
                }
            ],
            urgency: 'Board mandate: Achieve compliance within 6 months or pause new client acquisitions',
            why_prasad: 'Selected for proven HIPAA expertise, zero-downtime migration experience, and pharmaceutical industry knowledge'
        },
        approach: {
            methodology: '4-Phase Compliance-First Migration',
            phases: [
                {
                    number: 1,
                    title: 'Compliance Audit & Architecture',
                    duration: '3 weeks',
                    activities: [
                        'Comprehensive HIPAA/FHIR gap analysis',
                        'AWS compliance-ready architecture design',
                        'Security controls specification (IAM, encryption, logging)',
                        'Board-level presentation and approval'
                    ],
                    deliverable: '25-page compliance architecture document',
                    outcome: 'Board approval secured, clear compliance roadmap'
                },
                {
                    number: 2,
                    title: 'Infrastructure Setup & Testing',
                    duration: '4 weeks',
                    activities: [
                        'AWS infrastructure provisioning (HIPAA-eligible services)',
                        'Security controls implementation',
                        'Disaster recovery setup',
                        'Compliance validation (internal audit)'
                    ],
                    deliverable: 'Production-ready, compliant AWS environment',
                    outcome: 'Zero audit findings in pre-migration validation'
                },
                {
                    number: 3,
                    title: 'Data Migration & Validation',
                    duration: '8 weeks',
                    activities: [
                        'Week 1-3: Non-PII data migration (test process)',
                        'Week 4-6: Patient records migration (encrypted, monitored)',
                        'Week 7-8: Validation and parallel run',
                        '24/7 monitoring throughout'
                    ],
                    deliverable: 'Fully migrated system on AWS',
                    outcome: 'Zero downtime, zero data loss, all systems operational'
                },
                {
                    number: 4,
                    title: 'Optimization & Mobile Launch',
                    duration: '5 weeks',
                    activities: [
                        'Performance tuning (query optimization)',
                        'Pharmacy module mobile app development',
                        'Cost optimization (right-sizing, reserved instances)',
                        'Team training and documentation'
                    ],
                    deliverable: 'Optimized system + new mobile app',
                    outcome: '70% traffic increase, 3x query performance'
                }
            ],
            unique_differentiator: 'Only consultant who proposed mobile app addition (pharmacy module) that became the project\'s biggest success driver'
        },
        outcomes: {
            hero_metric: {
                value: '$500K',
                label: 'Annual Savings',
                icon: '💰'
            },
            secondary_metrics: [
                { value: '70%', label: 'Traffic Increase', icon: '📈' },
                { value: 'Zero', label: 'Downtime', icon: '✅' },
                { value: '3x', label: 'Query Performance', icon: '⚡' },
                { value: '100%', label: 'Compliance Score', icon: '🛡️' }
            ],
            compliance: [
                {
                    standard: 'HIPAA',
                    result: '100% compliant (audited)',
                    details: 'Passed independent HIPAA audit with zero findings'
                },
                {
                    standard: 'FHIR',
                    result: 'Full interoperability',
                    details: 'FHIR R4 implementation, certified by HL7'
                },
                {
                    standard: 'PCI-DSS',
                    result: 'Level 1 certified',
                    details: 'Payment processing meets highest PCI standards'
                }
            ],
            timeline: {
                planned: '6 months',
                actual: '5 months',
                variance: '4 weeks early'
            }
        },
        testimonial: {
            quote: 'Prasad didn\'t just migrate our system—he transformed it. The pharmacy mobile app he suggested became our #1 revenue driver. His HIPAA expertise gave our board complete confidence throughout the project.',
            author: {
                name: 'Healthcare Practice Lead',
                role: 'VP of Technology',
                company: 'PwC',
                linkedin: '#'
            }
        },
        technical: {
            before: {
                stack: ['Java 8', 'Oracle DB 11g', 'Tomcat', 'On-premise'],
                infrastructure: 'Legacy data center, single region',
                issues: ['Slow queries', 'Compliance gaps', 'No disaster recovery', 'High maintenance cost']
            },
            after: {
                stack: ['Java SpringBoot', 'AWS RDS (PostgreSQL)', 'ECS/Fargate', 'CloudFront CDN', 'React Native (mobile)'],
                infrastructure: 'Multi-region AWS, auto-scaling, HIPAA-compliant',
                improvements: ['3x faster', 'Zero compliance gaps', 'Automated DR', '30% cost reduction', 'Mobile app launched']
            },
            migration_strategy: 'Blue-green deployment with parallel run for 2 weeks. Data migrated in encrypted batches during off-hours. Rollback procedures tested 3 times before go-live.'
        },
        cta: {
            primary: {
                text: 'I Need This',
                action: 'https://calendly.com/prasadtilloo/30min',
                context: 'Book a free 30-min call. I\'ll prepare a custom plan for YOUR situation.'
            },
            secondary: {
                text: 'See Similar Projects',
                action: '/projects?industry=healthcare&compliance=hipaa'
            }
        }
    },
    {
        id: 'boehringer-aiml',
        slug: 'boehringer-aiml-data-lake',
        domains: ['Pharma', 'Data & ML', 'Governance'],
        projectType: 'data-platform',
        seoTags: ['Data Mesh', 'GDPR', 'Pharma', 'AI'],
        header: {
            eyebrow: '50% FASTER INSIGHTS',
            title: 'Building a GDPR-Compliant Data Mesh for Pharmaceutical R&D',
            client: {
                type: 'Global Pharmaceutical',
                size: '€20B+ revenue',
                industry: 'Pharmaceutical'
            }
        },
        challenge: {
            situation: 'R&D data was siloed across 15+ systems, making cross-study analysis impossible. Researchers spent 80% of time gathering data and 20% analyzing it. Privacy (GDPR) concerns paralyzed previous cloud attempts.',
            pain_points: [
                {
                    icon: '📉',
                    title: 'Data Silos',
                    description: '15+ disconnected data sources',
                    impact: 'Slow R&D cycles'
                },
                {
                    icon: '🔒',
                    title: 'GDPR Paralysis',
                    description: 'Fear of compliance breaches stalled cloud adoption',
                    impact: 'Blocked innovation'
                }
            ],
            urgency: 'Competitors bringing drugs to market 18 months faster using AI',
            why_prasad: 'Deep expertise in both Regulatory Compliance and Modern Data Architectures (Data Mesh)'
        },
        approach: {
            methodology: 'Data Mesh Implementation',
            phases: [
                {
                    number: 1,
                    title: 'Governance Framework',
                    duration: '4 weeks',
                    activities: ['Defined GDPR data controls', 'Established data ownership model'],
                    deliverable: 'Governance Charter',
                    outcome: 'Legal & Compliance sign-off'
                },
                {
                    number: 2,
                    title: 'Platform Build',
                    duration: '10 weeks',
                    activities: ['AWS Lake Formation setup', 'Self-service data portal'],
                    deliverable: 'Production Data Platform',
                    outcome: 'Centralized, secured data access'
                }
            ],
            unique_differentiator: 'Automated PII detection and masking pipeline that satisfied strict German Works Council requirements'
        },
        outcomes: {
            hero_metric: { value: '50%', label: 'Faster Time-to-Insight', icon: '⚡' },
            secondary_metrics: [
                { value: '€2M', label: 'Infra Savings', icon: '💰' },
                { value: '100%', label: 'GDPR Compliant', icon: '🛡️' }
            ],
            compliance: [],
            timeline: { planned: '6 months', actual: '6 months', variance: 'On time' }
        },
        testimonial: {
            quote: 'The automated governance Prasa built allowed us to unlock 10 years of R&D data safely. It\'s a game changer for our drug discovery pipeline.',
            author: { name: 'Head of Data Science', role: 'Director', company: 'Boehringer Ingelheim' }
        },
        technical: {
            before: { stack: [], infrastructure: '', issues: [] },
            after: { stack: ['AWS Lake Formation', 'Glue', 'Athena', 'Sagemaker'], infrastructure: 'Serverless Data Mesh', improvements: [] },
            migration_strategy: 'Domain-oriented decomposition'
        },
        cta: {
            primary: { text: 'Discuss Data Strategy', action: 'https://calendly.com/prasadtilloo/30min', context: 'Build your data mesh.' },
            secondary: { text: 'More AI Projects', action: '/projects?tag=AI' }
        }
    },
    {
        id: 'delivery-hero',
        slug: 'delivery-hero-adtech',
        domains: ['eCommerce', 'High Scale', 'DevOps'],
        projectType: 'devops',
        seoTags: ['Golang', 'Kubernetes', 'High Scale', 'AdTech'],
        header: {
            eyebrow: '$20M REVENUE UPLIFT',
            title: 'Scaling Display Ads Platform to 5M+ Daily Transactions',
            client: {
                type: 'Global Food Delivery',
                size: 'DAX Listed',
                industry: 'E-commerce'
            }
        },
        challenge: {
            situation: 'Existing ad server crashed during peak lunch hours. Latency > 200ms caused lost impressions and revenue.',
            pain_points: [],
            urgency: 'Black Friday approaching',
            why_prasad: 'High-scale distributed systems expertise'
        },
        approach: {
            methodology: 'Event-Driven Architecture',
            phases: [
                { number: 1, title: 'Re-architecture', duration: '6 weeks', activities: ['Moved to Go + Redis', 'Implemented exact-once processing'], deliverable: 'New Ad Engine', outcome: '< 20ms latency' }
            ],
            unique_differentiator: 'Custom RTB (Real-Time Bidding) engine'
        },
        outcomes: {
            hero_metric: { value: '20%', label: 'Revenue Increase', icon: '📈' },
            secondary_metrics: [],
            compliance: [],
            timeline: { planned: '3 months', actual: '3 months', variance: 'On time' }
        },
        testimonial: {
            quote: 'Scaled seamlessly to 5M transactions. Rock solid stability.',
            author: { name: 'Engineering Lead', role: 'Staff Engineer', company: 'Delivery Hero' }
        },
        technical: {
            before: { stack: ['PHP', 'MySQL'], infrastructure: '', issues: [] },
            after: { stack: ['Go', 'Redis', 'Kafka', 'Kubernetes'], infrastructure: 'Global K8s Cluster', improvements: [] },
            migration_strategy: 'Strangler Fig pattern'
        },
        cta: {
            primary: { text: 'Scale Your System', action: 'https://calendly.com/prasadtilloo/30min', context: 'Fix performance bottlenecks.' },
            secondary: { text: 'View Architecture', action: '/architecture-engine' }
        }
    },
    {
        id: 'pact-carbon-transparency',
        slug: 'pact-carbon-transparency-protocol',
        domains: ['Sustainability', 'Supply Chain', 'Standards'],
        projectType: 'standard',
        seoTags: ['Carbon Transparency', 'WBCSD', 'Scope 3', 'Sustainability'],
        header: {
            eyebrow: 'GLOBAL STANDARD',
            title: 'Developing the PACT Protocol: The Global Standard for Carbon Data Exchange',
            client: {
                type: 'Non-Profit Consortium',
                size: 'WBCSD Member Companies',
                industry: 'Sustainability Tech'
            }
        },
        challenge: {
            situation: 'Scope 3 emissions tracking was failing because every supplier used different data formats. There was no standard way for a tire manufacturer to tell a car brand the exact carbon footprint of a specific batch of tires.',
            pain_points: [
                {
                    icon: '📉',
                    title: 'Data Incompatibility',
                    description: 'Thousands of proprietary formats preventing automation',
                    impact: 'Manual data entry for ESG reporting'
                },
                {
                    icon: '🔒',
                    title: 'Trust & Privacy',
                    description: 'Suppliers refused to share detailed BOMs (Bill of Materials)',
                    impact: 'Supply chain opacity'
                }
            ],
            urgency: 'EU Regulations (CSRD) requiring audit-grade Scope 3 data by 2025',
            why_prasad: 'Unique blend of API design expertise and sustainability domain knowledge'
        },
        approach: {
            methodology: 'Open Source Standard Development',
            phases: [
                {
                    number: 1,
                    title: 'Technical Specification',
                    duration: '3 months',
                    activities: ['Defined JSON-LD Schema', 'Created API Swagger/OpenAPI specs'],
                    deliverable: 'PACT Data Model v1.0',
                    outcome: 'Adopted by 50+ major pilots'
                },
                {
                    number: 2,
                    title: 'Reference Implementation',
                    duration: '4 months',
                    activities: ['Built Pathfinder Network', 'Open-source connector SDKs'],
                    deliverable: 'Working Prototype',
                    outcome: 'Successful data exchange between IBM, SAP, and Siemens'
                }
            ],
            unique_differentiator: 'Designed a "Peer-to-Peer" architecture that keeps data ownership with the supplier, solving the trust issue.'
        },
        outcomes: {
            hero_metric: { value: '2,500+', label: 'Organizations Adopting', icon: '🌍' },
            secondary_metrics: [
                { value: '1st', label: 'Global Standard', icon: '🏆' },
                { value: '100%', label: 'Open Source', icon: '🔓' }
            ],
            compliance: [
                {
                    standard: 'WBCSD',
                    result: 'Official Standard',
                    details: 'Endorsed by World Business Council for Sustainable Development'
                }
            ],
            timeline: { planned: '12 months', actual: '10 months', variance: 'Ahead of schedule' }
        },
        testimonial: {
            quote: 'The PACT standard is the HTTP of carbon data. It simply works.',
            author: { name: 'Executive Director', role: 'Innovation Lead', company: 'SINE Foundation' }
        },
        technical: {
            before: { stack: ['Excel', 'Email'], infrastructure: 'Manual', issues: [] },
            after: { stack: ['JSON-LD', 'OpenAPI', 'AsyncAPI', 'Verifiable Credentials'], infrastructure: 'Decentralized Network', improvements: [] },
            migration_strategy: 'Greenfield standard creation'
        },
        cta: {
            primary: { text: 'adopt PACT', action: 'https://calendly.com/prasadtilloo/30min', context: 'Implement the standard.' },
            secondary: { text: 'View on GitHub', action: 'https://github.com/wbcsd/pact-catalog' }
        }
    }
];
