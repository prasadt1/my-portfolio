import { CaseStudy } from "../types/CaseStudy";

export const caseStudies: CaseStudy[] = [
    {
        id: 'photography-coach-ai',
        slug: 'photography-coach-ai',
        domains: ['AI & GenAI', 'Product Engineering', 'Cost Optimization'],
        projectType: 'product',
        seoTags: ['Gemini 3 Pro', 'React', 'Context Caching', 'AI Vision', 'Google DeepMind'],
        header: {
            eyebrow: 'GOOGLE DEEPMIND COMPETITION PROJECT',
            title: 'Photography Coach AI: Productionizing Gemini 3 Pro with Context Caching',
            client: {
                type: 'Competition Entry',
                size: 'Global',
                industry: 'Artificial Intelligence'
            }
        },
        challenge: {
            situation: 'Most AI tools are black boxes—giving scores without explaining "why." Photographers needed transparent, actionable coaching. The technical challenge was productionizing Gemini 3 Pro’s multimodal vision capabilities while keeping token costs viable for a consumer app.',
            pain_points: [
                {
                    icon: '💸',
                    title: 'High Inference Costs',
                    description: 'Vision API calls cost ~$2.00 per 1k images without optimization',
                    impact: 'Unviable unit economics'
                },
                {
                    icon: '📦',
                    title: 'Black Box Problem',
                    description: 'Users distrust AI scores that lack visible reasoning',
                    impact: 'Low engagement/trust'
                },
                {
                    icon: '🤖',
                    title: 'Generic Feedback',
                    description: 'Standard LLMs give vague advice like "improve lighting"',
                    impact: 'Low utility'
                }
            ],
            urgency: 'Built for the Google DeepMind "Vibe Code" Competition',
            why_prasad: 'Ability to combine advanced AI engineering (Caching, Structured Output) with polished UX'
        },
        approach: {
            methodology: 'Transparent AI Architecture',
            phases: [
                {
                    number: 1,
                    title: 'Extended Thinking Extraction',
                    duration: 'Sprint 1',
                    activities: ['Implemented stream parsing to capture "Thinking Process"', 'Visualized reasoning steps via JSON'],
                    deliverable: 'Glass-Box Reasoning UI',
                    outcome: 'Users see exactly HOW the AI judges photos'
                },
                {
                    number: 2,
                    title: 'Context Caching Strategy',
                    duration: 'Sprint 2',
                    activities: ['Cached 32KB of photography principles', 'Implemented token usage tracking'],
                    deliverable: 'Cost-Optimized Backend',
                    outcome: 'Simulated 75% cost reduction at scale'
                },
                {
                    number: 3,
                    title: 'Spatial Feedback Engine',
                    duration: 'Sprint 3',
                    activities: ['Built canvas overlay for bounding boxes', 'Multi-turn mentor chat state management'],
                    deliverable: 'Interactive Feedback Loop',
                    outcome: 'High-fidelity visual critique'
                }
            ],
            unique_differentiator: 'Implemented "Context Caching" to demonstrate widely overlooked production economics of Large Language Models.'
        },
        outcomes: {
            hero_metric: { value: '75%', label: 'Cost Reduction (Simulated)', icon: '💰' },
            secondary_metrics: [
                { value: '2.5s', label: 'Analysis Speed', icon: '⚡' },
                { value: '5', label: 'Dimensions Scored', icon: '📊' },
                { value: '100%', label: 'Transparent Logic', icon: '🧠' }
            ],
            compliance: [],
            timeline: { planned: '3 Weeks', actual: '2.5 Weeks', variance: 'Ahead of schedule' },
            business_impact: {
                efficiency: 'Context Caching strategy reduces input token costs by ~75% for high-volume usage',
                innovation: 'First-of-kind "Glass Box" interface builds user trust by exposing AI reasoning'
            }
        },
        testimonial: {
            quote: 'This project demonstrates not just technical skill, but a deep understanding of production constraints like cost and user trust.',
            author: { name: 'Competition Judge', role: 'Reviewer', company: 'Google DeepMind Hackathon' }
        },
        technical: {
            before: { stack: ['Standard LLM API'], infrastructure: 'Stateless Requests', issues: ['High Cost', 'No Memory'] },
            after: { stack: ['Gemini 3 Pro', 'React + Vite', 'Tailwind', 'Recharts'], infrastructure: 'Context-Aware Caching', improvements: ['Structured JSON', 'Spatial Overlays', 'Streaming Responses'] },
            migration_strategy: 'Greenfield development using Vibe Coding principals'
        },
        cta: {
            primary: { text: 'Try Live Demo', action: 'https://aistudio.google.com/app/apikey', context: 'See it in action.' },
            secondary: { text: 'View Code', action: 'https://github.com/prasadt1/photography-coach-ai' }
        }
    },
    {
        id: 'brita-ecommerce',
        slug: 'brita-ecommerce',
        domains: ['eCommerce', 'Architecture', 'Cloud'],
        projectType: 'migration',
        seoTags: ['Shopify Plus', 'Headless Commerce', 'Vue.js', 'Azure', 'Global Rollout'],
        header: {
            eyebrow: 'GLOBAL D2C TRANSFORMATION',
            title: 'Modernizing BRITA’s Global eCommerce Landscape with Headless Shopify Plus',
            client: {
                type: 'Global Consumer Goods',
                size: '€600M+ Revenue',
                industry: 'Consumer Goods (Water Filtration)'
            }
        },
        challenge: {
            situation: 'BRITA’s D2C business across 6 European markets was running on a legacy, on-premise Shopware instance. The system was fragile, hard to update, and struggling with peak traffic. A failed migration could cost millions in lost revenue.',
            pain_points: [
                {
                    icon: '🕸️',
                    title: 'Legacy Monolith',
                    description: 'Outdated Shopware version with accumulated technical debt',
                    impact: 'High maintenance costs'
                },
                {
                    icon: '😰',
                    title: 'Risk of Downtime',
                    description: 'Fragile infrastructure prone to crashes during campaigns',
                    impact: 'Revenue risk'
                },
                {
                    icon: '🌍',
                    title: 'Scalability Limits',
                    description: 'Difficult to roll out new markets or features quickly',
                    impact: 'Stalled growth'
                }
            ],
            urgency: 'Strategic mandate to double D2C revenue by moving to a scalable SaaS foundation',
            why_prasad: 'Expertise in complex, multi-market headless commerce architectures'
        },
        approach: {
            methodology: 'Headless / Composable Commerce',
            phases: [
                {
                    number: 1,
                    title: 'Discovery & POC',
                    duration: '2 months',
                    activities: ['Evaluated Shopify Plus vs. Adobe Commerce', 'Built POC with Vue/Nuxt frontend', 'Defined data migration strategy'],
                    deliverable: 'Architecture Decision Record',
                    outcome: 'Selected Shopify Plus & Headless Architecture'
                },
                {
                    number: 2,
                    title: 'Architecture Design',
                    duration: '6 weeks',
                    activities: ['Designed Azure middleware', 'Defined multi-tenant governance', 'Integration planning (SAP, CRM)'],
                    deliverable: 'Technical Blueprint',
                    outcome: 'Approved scalable architecture'
                },
                {
                    number: 3,
                    title: 'Implementation & Rollout',
                    duration: '6 months',
                    activities: ['Developed Nuxt.js storefront', 'Built Azure integration layer', 'Migrated 6 markets iteratively'],
                    deliverable: 'Launched Global Platform',
                    outcome: 'Successful go-live in 6 core markets'
                }
            ],
            unique_differentiator: 'Designed a "White Label" core architecture that allows deploying new market storefronts in weeks instead of months.'
        },
        outcomes: {
            hero_metric: { value: '6', label: 'Markets Migrated', icon: '🌍' },
            secondary_metrics: [
                { value: 'Zero', label: 'Downtime', icon: '✅' },
                { value: '100%', label: 'SaaS Native', icon: '☁️' },
                { value: '2x', label: 'Faster Deployments', icon: '🚀' }
            ],
            compliance: [
                {
                    standard: 'GDPR',
                    result: 'Compliant',
                    details: 'Implemented rigorous cookie consent and data retention policies'
                }
            ],
            timeline: { planned: '9 months', actual: '9 months', variance: 'On Time' },
            business_impact: {
                revenue: 'Enabled growth strategy for next 5 years',
                savings: 'Reduced operational overhead by moving to SaaS',
                efficiency: 'Unified 6 disparate markets onto one code base'
            }
        },
        testimonial: {
            quote: 'Prasad’s architectural leadership was crucial. He navigated the complexity of our legacy systems and guided us to a modern, future-proof headless solution.',
            author: { name: 'eCommerce Lead', role: 'Head of Digital', company: 'BRITA' }
        },
        technical: {
            before: { stack: ['Shopware (Monolith)', 'On-premise Hosting', 'PHP'], infrastructure: 'Legacy Datacenter', issues: ['Scaling limits', 'High maintenance'] },
            after: { stack: ['Shopify Plus', 'Vue.js / Nuxt', 'Azure Functions', 'Magnolia CMS'], infrastructure: 'SaaS / Cloud Native', improvements: ['Auto-scaling', 'Headless flexibility', 'Modern DX'] },
            migration_strategy: 'Phased rollout market-by-market'
        },
        cta: {
            primary: { text: 'Modernize Your eComm', action: 'https://calendly.com/prasad-sgsits/30min', context: 'Move to Headless.' },
            secondary: { text: 'View Case Study', action: '/projects/brita-ecommerce' }
        }
    },
    {
        id: 'pact-carbon-transparency',
        slug: 'pact-protocol',
        domains: ['Sustainability', 'Supply Chain', 'Standards'],
        projectType: 'standard',
        seoTags: ['Carbon Transparency', 'WBCSD', 'Scope 3', 'Sustainability', 'PACT'],
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
                    description: 'Suppliers refused to share detailed BOMs',
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
            timeline: { planned: '12 months', actual: '10 months', variance: 'Ahead of schedule' },
            business_impact: {
                efficiency: 'Eliminated manual data entry for carbon reporting',
                risk_reduction: 'Ensured compliance with CSRD regulations'
            }
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
            primary: { text: 'Adopt PACT', action: 'https://calendly.com/prasad-sgsits/30min', context: 'Implement the standard.' },
            secondary: { text: 'View on GitHub', action: 'https://github.com/wbcsd/pact-catalog' }
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
            pain_points: [
                { icon: '🐢', title: 'High Latency', description: '>200ms response time', impact: 'Lost ad impressions' },
                { icon: '💥', title: 'Instability', description: 'Crashes during peak loads', impact: 'Direct revenue loss' }
            ],
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
            secondary_metrics: [
                { value: '5M+', label: 'Daily Transactions', icon: '🔢' },
                { value: '<20ms', label: 'Latency', icon: '⚡' }
            ],
            compliance: [],
            timeline: { planned: '3 months', actual: '3 months', variance: 'On time' },
            business_impact: {
                revenue: '$20M projected annual uplift from increased impression yield',
                efficiency: 'Reduced server costs via Go optimization'
            }
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
            primary: { text: 'Scale Your System', action: 'https://calendly.com/prasad-sgsits/30min', context: 'Fix performance bottlenecks.' },
            secondary: { text: 'View Architecture', action: '/architecture-engine' }
        }
    },
    {
        id: 'boehringer-aiml',
        slug: 'bi-data-lake',
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
                { icon: '📉', title: 'Data Silos', description: '15+ disconnected data sources', impact: 'Slow R&D cycles' },
                { icon: '🔒', title: 'GDPR Paralysis', description: 'Fear of compliance breaches', impact: 'Blocked innovation' }
            ],
            urgency: 'Competitors bringing drugs to market 18 months faster using AI',
            why_prasad: 'Deep expertise in Regulatory Compliance and Data Architectures'
        },
        approach: {
            methodology: 'Data Mesh Implementation',
            phases: [
                { number: 1, title: 'Governance Framework', duration: '4 weeks', activities: ['Defined GDPR data controls'], deliverable: 'Governance Charter', outcome: 'Legal & Compliance sign-off' },
                { number: 2, title: 'Platform Build', duration: '10 weeks', activities: ['AWS Lake Formation setup'], deliverable: 'Production Data Platform', outcome: 'Centralized access' }
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
            timeline: { planned: '6 months', actual: '6 months', variance: 'On time' },
            business_impact: {
                savings: '€2M reduction in legacy infrastructure costs',
                risk_reduction: 'Zero compliance breaches via automated governance'
            }
        },
        testimonial: {
            quote: 'The automated governance Prasad built allowed us to unlock 10 years of R&D data safely. It’s a game changer.',
            author: { name: 'Head of Data Science', role: 'Director', company: 'Boehringer Ingelheim' }
        },
        technical: {
            before: { stack: [], infrastructure: '', issues: [] },
            after: { stack: ['AWS Lake Formation', 'Glue', 'Athena', 'Sagemaker'], infrastructure: 'Serverless Data Mesh', improvements: [] },
            migration_strategy: 'Domain-oriented decomposition'
        },
        cta: {
            primary: { text: 'Discuss Data Strategy', action: 'https://calendly.com/prasad-sgsits/30min', context: 'Build your data mesh.' },
            secondary: { text: 'More AI Projects', action: '/projects?tag=AI' }
        }
    },
    {
        id: 'pwc-healthcare',
        slug: 'pwc-hipaa-cloud',
        domains: ['Healthcare', 'Cloud Migration', 'Compliance'],
        projectType: 'migration',
        seoTags: ['HIPAA', 'AWS', 'Healthcare', 'Compliance'],
        header: {
            eyebrow: '$500K SAVED ANNUALLY',
            title: 'Modernizing Legacy Healthcare System to HIPAA-Compliant Cloud',
            client: {
                type: 'Fortune 500 Professional Services',
                size: '€50B+ revenue',
                industry: 'Healthcare IT'
            }
        },
        challenge: {
            situation: '15-year-old e-commerce and healthcare management platform facing compliance audit failures, performance issues, and escalating maintenance costs. Board deadline: 6 months to achieve compliance.',
            pain_points: [
                { icon: '💸', title: 'Audit Failures', description: 'Monthly audit findings costing €50K', impact: '€600K annual burden' },
                { icon: '🐌', title: 'Legacy EOL', description: 'Vendor end-of-support imminent', impact: 'Operational risk' }
            ],
            urgency: 'Board mandate: Achieve compliance within 6 months',
            why_prasad: 'Proven HIPAA expertise and zero-downtime migration experience'
        },
        approach: {
            methodology: 'Compliance-First Migration',
            phases: [
                { number: 1, title: 'Compliance Audit', duration: '3 weeks', activities: ['HIPAA gap analysis'], deliverable: 'Architecture Plan', outcome: 'Board approval' },
                { number: 2, title: 'Migration', duration: '8 weeks', activities: ['AWS setup', 'Data migration'], deliverable: 'Production Cloud', outcome: 'Zero downtime' }
            ],
            unique_differentiator: 'Proposed and built a pharmacy mobile app addition that became the top revenue driver.'
        },
        outcomes: {
            hero_metric: { value: '$500K', label: 'Annual Savings', icon: '💰' },
            secondary_metrics: [
                { value: 'Zero', label: 'Audit Findings', icon: '✅' },
                { value: '70%', label: 'Traffic Boost', icon: '📈' }
            ],
            compliance: [
                { standard: 'HIPAA', result: '100% Compliant', details: 'Zero findings in independent audit' }
            ],
            timeline: { planned: '6 months', actual: '5 months', variance: '4 weeks early' },
            business_impact: {
                savings: '$500K annual reduction in maintenance and audit costs',
                revenue: '70% increase in mobile engagement via new pharmacy app'
            }
        },
        testimonial: {
            quote: 'Prasad didn’t just migrate our system—he transformed it. The mobile app he suggested became our #1 revenue driver.',
            author: { name: 'Healthcare Practice Lead', role: 'VP of Technology', company: 'PwC' }
        },
        technical: {
            before: { stack: ['Java 8', 'Oracle', 'On-premise'], infrastructure: 'Legacy DC', issues: [] },
            after: { stack: ['Java SpringBoot', 'AWS RDS', 'ECS', 'React Native'], infrastructure: 'AWS Multi-Region', improvements: [] },
            migration_strategy: 'Blue-green deployment'
        },
        cta: {
            primary: { text: 'Ensure Compliance', action: 'https://calendly.com/prasad-sgsits/30min', context: 'Audit-proof your cloud.' },
            secondary: { text: 'See Healthcare Projects', action: '/projects?industry=healthcare' }
        }
    }
];
