import { CaseStudy } from "../types/CaseStudy";

export const projects: CaseStudy[] = [
    {
        id: 'photography-coach-ai',
        slug: 'photography-coach-ai',
        theme: {
            color: 'purple',
            gradient: 'from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/10',
            iconBg: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400',
            backgroundImage: '/assets/bg/bg-ai.png'
        },
        domains: ['AI & GenAI', 'Product Engineering', 'Cost Optimization'],
        projectType: 'product',
        seoTags: ['Gemini 3 Pro', 'React', 'Context Caching', 'AI Vision', 'Google DeepMind'],
        header: {
            eyebrow: 'GOOGLE DEEPMIND COMPETITION PROJECT',
            title: 'Photography Coach AI: Productionizing Gemini 3 Pro',
            client: {
                type: 'Competition Entry',
                size: 'Global',
                industry: 'Artificial Intelligence'
            }
        },
        challenge: {
            situation: 'Most AI tools are black boxes. Photographers needed transparent, actionable coaching. The technical challenge was productionizing Gemini 3 Pro while keeping token costs viable.',
            pain_points: [
                { icon: '💸', title: 'High Inference Costs', description: 'Vision API calls cost ~$2.00 per 1k images', impact: 'Unviable unit economics' },
                { icon: '📦', title: 'Black Box Problem', description: 'Users distrust AI scores', impact: 'Low engagement' }
            ],
            urgency: 'Built for Google DeepMind Competition',
            why_prasad: 'AI Engineering + UX'
        },
        approach: {
            methodology: 'Transparent AI Architecture',
            phases: [
                { number: 1, title: 'Context Caching', duration: 'Sprint 2', activities: ['Cached 32KB system prompt'], deliverable: 'Cost-Optimized Backend', outcome: '75% Cost Reduction' }
            ],
            unique_differentiator: 'Glass-Box Reasoning UI'
        },
        outcomes: {
            hero_metric: { value: '75%', label: 'Cost Reduction', icon: '💰' },
            secondary_metrics: [
                { value: '2.5s', label: 'Analysis Speed', icon: '⚡' },
                { value: '100%', label: 'Observability', icon: '👁️' }
            ],
            compliance: [],
            timeline: { planned: '3 Weeks', actual: '2.5 Weeks', variance: 'Ahead' },
            business_impact: {
                efficiency: 'Context Caching strategy reduces input token costs by ~75%',
                innovation: 'First-of-kind "Glass Box" interface'
            }
        },
        technical: {
            before: { stack: ['Standard LLM'], infrastructure: 'Stateless', issues: [] },
            after: { stack: ['Gemini 3 Pro', 'React', 'Tailwind', 'Recharts'], infrastructure: 'Context-Aware', improvements: ['Structured JSON', 'Spatial Overlays'] },
            migration_strategy: 'Greenfield'
        },
        cta: {
            primary: { text: 'Try Live Demo', action: 'https://aistudio.google.com/app/apikey', context: 'See it in action.' },
            secondary: { text: 'View Code', action: 'https://github.com/prasadtilloo/photography-coach-ai' }
        }
    },
    // --- TIER 1: FLAGSHIP ---
    {
        id: 'pact-pcf-network',
        slug: 'pact-pcf-data-exchange-network',
        theme: {
            color: 'emerald',
            gradient: 'from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/10',
            iconBg: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400',
            backgroundImage: '/assets/bg/bg-eco.png'
        },
        domains: ['Climate Tech', 'Standards Development'],
        projectType: 'standard',
        seoTags: ['Carbon Accounting', 'Scope 3 Emissions', 'ESG Technology', 'Product Carbon Footprint', 'Climate Action', 'Sustainability Standards'],
        header: {
            eyebrow: 'GLOBAL STANDARD ADOPTION',
            title: 'Architecting the Global Product Carbon Footprint (PCF) Data Exchange Network',
            client: {
                type: 'Global Non-Profit / Standards Body',
                size: 'Fortune 100 Consortium',
                industry: 'Climate Tech / Sustainability'
            }
        },
        challenge: {
            situation: 'Global supply chains lacked a standardized way to exchange Product Carbon Footprint (PCF) data, making Scope 3 emissions tracking impossible. Major corporations (Microsoft, SAP, Siemens) needed a unified language and protocol.',
            pain_points: [
                {
                    icon: '🌍',
                    title: 'Data Silos',
                    description: 'No interoperability between carbon accounting platforms',
                    impact: 'Blocked Scope 3 transparency'
                },
                {
                    icon: '📉',
                    title: 'Integration Costs',
                    description: 'Custom integrations for every supplier',
                    impact: 'High cost of compliance'
                }
            ],
            urgency: 'Net-zero commitments requiring immediate supply chain transparency',
            why_prasad: 'Unique blend of Enterprise Architecture, Standards Development, and Climate Tech expertise'
        },
        approach: {
            methodology: 'Open Standards Development & Ecosystem Engineering',
            phases: [
                {
                    number: 1,
                    title: 'Technical Specification',
                    duration: '6 months',
                    activities: ['API Design (OpenAPI)', 'Data Model Definition', 'Security Protocol Design'],
                    deliverable: 'PACT Tech Spec v2.0',
                    outcome: 'Global consensus achieved'
                },
                {
                    number: 2,
                    title: 'Conformance Testing',
                    duration: '4 months',
                    activities: ['Testbed Development', 'Automated Testing Suite', 'Certification Process'],
                    deliverable: 'Open Source Testkit',
                    outcome: 'Streamlined vendor onboarding'
                }
            ],
            unique_differentiator: 'Created a decentralized, sovereignty-preserving network architecture rather than a central database'
        },
        outcomes: {
            hero_metric: { value: '60%', label: 'Integration Time Reduction', icon: '⚡' },
            secondary_metrics: [
                { value: '25%', label: 'Adoption Increase', icon: '📈' },
                { value: '90+', label: 'Fortune 100 Adopters', icon: '🏢' }
            ],
            compliance: [],
            timeline: { planned: '18 months', actual: '18 months', variance: 'On Track' }
        },
        technical: {
            before: { stack: [], infrastructure: 'Fragmented manual emails/spreadsheets', issues: ['No API standard', 'Inconsistent data'] },
            after: { stack: ['Next.js', 'React', 'Java Spring Boot', 'TypeScript', 'Docker', 'Kubernetes', 'Azure', 'Kafka'], infrastructure: 'Decentralized Data Space', improvements: ['Standardized API', 'Automated Verification'] },
            migration_strategy: 'Greenfield standards development'
        },
        cta: {
            primary: { text: 'View Ecosystem', action: 'https://carbon-transparency.org/network', context: 'See the live network.' },
            secondary: { text: 'GitHub Repo', action: 'https://github.com/wbcsd/pact-conformance-testing' }
        }
    },
    {
        id: 'brita-ecommerce',
        slug: 'brita-ecommerce-modernization',
        theme: {
            color: 'orange',
            gradient: 'from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/10',
            iconBg: 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400'
        },
        domains: ['eCommerce', 'Digital Transformation'],
        projectType: 'migration',
        seoTags: ['Headless Commerce', 'Sustainable Ecommerce', 'Cloud Optimization', 'Green IT'],
        header: {
            eyebrow: 'MULTI-MARKET ROLLOUT',
            title: 'Modernizing Global eCommerce: From Monolith to Headless Architecture',
            client: {
                type: 'Global Consumer Goods',
                size: '€600M+ Revenue',
                industry: 'Manufacturing / Retail'
            }
        },
        challenge: {
            situation: 'Legacy Shopware platform could not support rapid global expansion. Managing 15+ markets with monolithic architecture was slow and costly.',
            pain_points: [
                { icon: '🐌', title: 'Slow Time-to-Market', description: 'Months to launch new regions', impact: 'Lost revenue opportunities' },
                { icon: '🔗', title: 'Tightly Coupled', description: 'Frontend changes risked backend stability', impact: 'High regression risk' }
            ],
            urgency: 'Strategic goal to double D2C revenue',
            why_prasad: 'Proven track record in headless commerce and cloud migration'
        },
        approach: {
            methodology: 'Headless Transformation Strategy',
            phases: [
                { number: 1, title: 'Discovery & POC', duration: '2 months', activities: ['Platform Selection (Shopify Plus)', 'Headless Architecture Design'], deliverable: 'Proof of Concept', outcome: 'Validated architecture' },
                { number: 2, title: 'Migration & Rollout', duration: '8 months', activities: ['Data Migration', 'Frontend Build (Vue.js)', 'Multi-tenant Setup'], deliverable: 'Live in 6 Markets', outcome: 'Zero downtime launch' }
            ],
            unique_differentiator: 'Implemented a multi-tenant governance model allowing centralized core with local market flexibility'
        },
        outcomes: {
            hero_metric: { value: '15+', label: 'Markets Supported', icon: '🌍' },
            secondary_metrics: [
                { value: '30%', label: 'Faster Deployments', icon: '🚀' },
                { value: 'Zero', label: 'Downtime Migration', icon: '✅' }
            ],
            compliance: [{ standard: 'GDPR', result: 'Compliant', details: 'Full EU compliance' }],
            timeline: { planned: '12 months', actual: '10 months', variance: '2 months early' }
        },
        technical: {
            before: { stack: ['Shopware', 'Monolithic'], infrastructure: 'On-premise', issues: ['Scalability limits', 'High maintenance'] },
            after: { stack: ['Shopify Plus', 'Vue.js', 'Nuxt.js', 'Azure', 'Varnish', 'Redis'], infrastructure: 'Cloud-native Headless', improvements: ['Global scalability', 'Decoupled frontend'] },
            migration_strategy: 'Strangler Fig Pattern'
        },
        cta: {
            primary: { text: 'Book Consultation', action: 'https://calendly.com/prasadtilloo/30min', context: 'Discuss your migration.' },
            secondary: { text: 'View Architecture', action: '#' }
        }
    },
    {
        id: 'delivery-hero',
        slug: 'delivery-hero-adtech',
        theme: {
            color: 'rose',
            gradient: 'from-rose-50 to-red-50 dark:from-rose-900/20 dark:to-red-900/10',
            iconBg: 'bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400'
        },
        domains: ['AdTech', 'eCommerce', 'High-Scale'],
        projectType: 'product',
        seoTags: ['AdTech', 'High Scale', 'Go', 'Kubernetes', 'Revenue Growth'],
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
            secondary_metrics: [
                { value: '5M+', label: 'Daily Transactions', icon: '🔢' },
                { value: '99.99%', label: 'SLA Achieved', icon: '🛡️' }
            ],
            compliance: [{ standard: 'GDPR', result: 'Compliant', details: 'Privacy-first ad serving' }],
            timeline: { planned: '3 months', actual: '3 months', variance: 'On time' }
        },
        technical: {
            before: { stack: ['PHP', 'MySQL'], infrastructure: '', issues: [] },
            after: { stack: ['Go', 'Redis', 'Kafka', 'Kubernetes', 'Terraform'], infrastructure: 'Global K8s Cluster', improvements: ['<20ms latency', 'Auto-scaling'] },
            migration_strategy: 'Strangler Fig pattern'
        },
        cta: {
            primary: { text: 'Scale Your System', action: 'https://calendly.com/prasadtilloo/30min', context: 'Fix performance bottlenecks.' },
            secondary: { text: 'View Architecture', action: '#' }
        }
    },
    {
        id: 'ai-photography-coach',
        slug: 'ai-photography-coach',
        theme: {
            color: 'indigo',
            gradient: 'from-indigo-50 to-violet-50 dark:from-indigo-900/20 dark:to-violet-900/10',
            iconBg: 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400',
            backgroundImage: '/assets/bg/bg-ai.png'
        },
        domains: ['AI/ML', 'Innovation'],
        projectType: 'product',
        seoTags: ['Green AI', 'Responsible AI', 'AIOptimization', 'Sustainable AI', 'Agentic AI'],
        header: {
            eyebrow: 'PRODUCTION AI ENGINEERING',
            title: 'Building an Agentic AI Photography Coach with Full Observability',
            client: {
                type: 'Personal Project / Product',
                size: 'N/A',
                industry: 'Consumer Tech'
            }
        },
        challenge: {
            situation: 'Most AI demos lack production readiness (observability, cost control, evaluation). Wanted to prove end-to-end engineering excellence.',
            pain_points: [],
            urgency: 'Personal innovation goal',
            why_prasad: 'Passion for AI engineering rigor'
        },
        approach: {
            methodology: 'Agentic Workflow Design',
            phases: [
                { number: 1, title: 'MVP Build', duration: '4 weeks', activities: ['Vision API integration', 'Streamlit UI'], deliverable: 'Working Prototype', outcome: 'Proof of capability' },
                { number: 2, title: 'Production Engineering', duration: '4 weeks', activities: ['MCP Integration', 'LLM-as-Judge', 'Cost Tracking'], deliverable: 'Production-Ready App', outcome: 'Full observability' }
            ],
            unique_differentiator: 'Built-in "Green AI" metrics tracking carbon impact of inference'
        },
        outcomes: {
            hero_metric: { value: '100%', label: 'Observability', icon: '👁️' },
            secondary_metrics: [
                { value: '<$5', label: 'Monthly Cost', icon: '💰' },
                { value: 'P95', label: 'Latency Tracked', icon: '⏱️' }
            ],
            compliance: [],
            timeline: { planned: '2 months', actual: '2 months', variance: 'On time' }
        },
        technical: {
            before: { stack: [], infrastructure: '', issues: [] },
            after: { stack: ['Gemini Vision', 'Streamlit', 'MCP', 'LangChain'], infrastructure: 'Cloud Run', improvements: ['Agentic Workflows', 'Structured Outputs'] },
            migration_strategy: 'Iterative Product Development'
        },
        cta: {
            primary: { text: 'Try Demo', action: '#', context: 'See the AI in action.' },
            secondary: { text: 'GitHub Repo', action: '#' }
        }
    },

    // --- TIER 2: CONSULTING FRAMEWORKS ---
    {
        id: 'devops-maturity',
        slug: 'devops-maturity-framework',
        theme: {
            color: 'blue',
            gradient: 'from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/10',
            iconBg: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
            backgroundImage: '/assets/bg/bg-devops.png'
        },
        domains: ['DevOps', 'Consulting'],
        projectType: 'framework',
        seoTags: ['DevOps Maturity', 'CICD', 'Infrastructure as Code', 'SRE'],
        header: {
            eyebrow: 'REUSABLE FRAMEWORK',
            title: 'Enterprise DevOps Maturity Assessment & Transformation Model',
            client: {
                type: 'Multiple Fortune 500 Clients',
                size: 'Global Enterprises',
                industry: 'Cross-Industry'
            }
        },
        challenge: {
            situation: 'Many organizations claimed to do DevOps but lacked standardization, leading to "fragile agile" and unstable releases.',
            pain_points: [],
            urgency: 'Need for speed and stability',
            why_prasad: 'Deep background in both dev and ops'
        },
        approach: {
            methodology: '5-Level Maturity Model',
            phases: [],
            unique_differentiator: 'Assess culture, process, and technology holistically'
        },
        outcomes: {
            hero_metric: { value: '10+', label: 'Clients Assessed', icon: '📋' },
            secondary_metrics: [{ value: '30%', label: 'Release Velocity', icon: '🚀' }],
            compliance: [],
            timeline: { planned: 'ongoing', actual: 'ongoing', variance: 'N/A' }
        },
        technical: {
            before: { stack: [], infrastructure: '', issues: [] },
            after: { stack: ['Jenkins', 'GitLab', 'Terraform', 'Kubernetes'], infrastructure: 'Modern DevOps Toolchain', improvements: [] },
            migration_strategy: 'Assessment -> Roadmap -> Transformation'
        },
        cta: {
            primary: { text: 'Assess Your Org', action: 'https://calendly.com/prasadtilloo/30min', context: 'Get a maturity score.' },
            secondary: { text: 'View Framework', action: '#' }
        }
    },
    {
        id: 'app-rationalization',
        slug: 'app-rationalization-cloud-readiness',
        theme: {
            color: 'slate',
            gradient: 'from-slate-50 to-gray-50 dark:from-slate-800 dark:to-slate-900',
            iconBg: 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
        },
        domains: ['Cloud Modernization', 'Consulting'],
        projectType: 'framework',
        seoTags: ['Cloud Migration', '6R Strategy', 'App Portfolio Management'],
        header: {
            eyebrow: 'STRATEGIC DECISION MAKING',
            title: 'Application Rationalization & Cloud Readiness Framework',
            client: {
                type: 'Multiple Clients',
                size: 'Enterprise',
                industry: 'Cross-Industry'
            }
        },
        challenge: {
            situation: 'Enterprises with 1000+ apps struggled to decide what to move to cloud, leading to stalled migrations or "lift-and-shift" cost disasters.',
            pain_points: [],
            urgency: 'Data center exit mandates',
            why_prasad: 'Systematic approach to portfolio analysis'
        },
        approach: {
            methodology: '6R Analysis (Rehost, Replatform, etc.)',
            phases: [],
            unique_differentiator: 'Automated discovery combined with business value scoring'
        },
        outcomes: {
            hero_metric: { value: '40%', label: 'Accellerated Timeline', icon: '⏩' },
            secondary_metrics: [{ value: '60%', label: 'Retired/Replaced', icon: '🗑️' }],
            compliance: [],
            timeline: { planned: 'N/A', actual: 'N/A', variance: 'N/A' }
        },
        technical: {
            before: { stack: [], infrastructure: '', issues: [] },
            after: { stack: ['AWS', 'Azure', 'Migration Tools'], infrastructure: 'Hybrid Cloud', improvements: [] },
            migration_strategy: 'Discovery -> Rationalization -> Wave Planning'
        },
        cta: {
            primary: { text: 'Plan Migration', action: 'https://calendly.com/prasadtilloo/30min', context: 'Avoid cloud cost traps.' },
            secondary: { text: 'See Template', action: '#' }
        }
    },
    {
        id: 'mainframe-migration',
        slug: 'mainframe-to-java-migration',
        theme: {
            color: 'amber',
            gradient: 'from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/10',
            iconBg: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400'
        },
        domains: ['Legacy Modernization', 'Consulting', 'FinServ'],
        projectType: 'framework',
        seoTags: ['Mainframe', 'COBOL', 'Java', 'Modernization'],
        header: {
            eyebrow: 'LEGACY TRANSFORMATION',
            title: 'Mainframe-to-Java Migration Framework',
            client: {
                type: 'Insurance / Banking',
                size: 'Large Enterprise',
                industry: 'Financial Services'
            }
        },
        challenge: {
            situation: 'Critical core banking/insurance systems locked in COBOL/mainframes with retiring talent pool and exploding MIPS costs.',
            pain_points: [],
            urgency: 'Cost reduction and talent risk',
            why_prasad: 'Proven pattern for risk-managed migration'
        },
        approach: {
            methodology: 'Automated Refactoring & Replatforming',
            phases: [],
            unique_differentiator: 'Comprehensive testing strategy ensuring bit-level data parity'
        },
        outcomes: {
            hero_metric: { value: '55%', label: 'Cost Reduction', icon: '💰' },
            secondary_metrics: [{ value: 'Zero', label: 'Business Disruption', icon: '✅' }],
            compliance: [],
            timeline: { planned: 'N/A', actual: 'N/A', variance: 'N/A' }
        },
        technical: {
            before: { stack: ['COBOL', 'CICS', 'DB2'], infrastructure: 'Mainframe', issues: [] },
            after: { stack: ['Java', 'Spring Boot', 'PostgreSQL', 'Kafka'], infrastructure: 'Cloud Native', improvements: [] },
            migration_strategy: 'Automated Code Conversion + Manual Optimization'
        },
        cta: {
            primary: { text: 'Modernize Legacy', action: 'https://calendly.com/prasadtilloo/30min', context: 'Reduce MIPS costs.' },
            secondary: { text: 'View Approach', action: '#' }
        }
    },
    {
        id: 'healthcare-compliance',
        slug: 'hipaa-fhir-compliance',
        theme: {
            color: 'teal',
            gradient: 'from-teal-50 to-emerald-50 dark:from-teal-900/20 dark:to-emerald-900/10',
            iconBg: 'bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400'
        },
        domains: ['Healthcare', 'Compliance', 'Consulting'],
        projectType: 'framework',
        seoTags: ['HIPAA', 'FHIR', 'Compliance', 'HealthIT'],
        header: {
            eyebrow: 'REGULATORY GOVERNANCE',
            title: 'HIPAA/FHIR/HL7 Compliance Governance Framework',
            client: {
                type: 'Multiple Healthcare Clients',
                size: 'Enterprise',
                industry: 'Healthcare'
            }
        },
        challenge: {
            situation: 'Healthcare orgs struggling to meet new interoperability rules (Cures Act) and secure patient data in the cloud.',
            pain_points: [],
            urgency: 'Regulatory deadlines',
            why_prasad: 'Deep expertise in health data standards'
        },
        approach: {
            methodology: 'Compliance-by-Design',
            phases: [],
            unique_differentiator: 'Integrated security, privacy, and interoperability into one governance model'
        },
        outcomes: {
            hero_metric: { value: '15+', label: 'Engagements', icon: '🏥' },
            secondary_metrics: [{ value: '100%', label: 'Audit Systems', icon: '🛡️' }],
            compliance: [{ standard: 'HIPAA', result: 'Compliant', details: 'Full protection' }],
            timeline: { planned: 'N/A', actual: 'N/A', variance: 'N/A' }
        },
        technical: {
            before: { stack: [], infrastructure: '', issues: [] },
            after: { stack: ['FHIR', 'HL7', 'OAuth2', 'Encryption'], infrastructure: 'Compliant Cloud', improvements: [] },
            migration_strategy: 'Assessment -> Remediation -> Governance'
        },
        cta: {
            primary: { text: 'Secure Your Data', action: 'https://calendly.com/prasadtilloo/30min', context: 'Get HIPAA compliant.' },
            secondary: { text: 'View Framework', action: '#' }
        }
    },

    // --- TIER 3: OTHER NOTABLE PROJECTS ---
    {
        id: 'boehringer-aiml',
        slug: 'boehringer-aiml-platform',
        theme: {
            color: 'cyan',
            gradient: 'from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/10',
            iconBg: 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400'
        },
        domains: ['Pharma', 'AI/ML', 'Data Platforms'],
        projectType: 'data-platform',
        seoTags: ['Data Lake', 'BioBERT', 'Pharma R&D'],
        header: {
            eyebrow: '50% FASTER INSIGHTS',
            title: 'Medical Research AI/ML Platform & Data Lake',
            client: {
                type: 'Boehringer Ingelheim',
                size: '€20B+ Revenue',
                industry: 'Pharma'
            }
        },
        challenge: {
            situation: 'R&D data siloed in PDFs and disparate systems. Researchers spent too much time searching.',
            pain_points: [],
            urgency: 'Need to accelerate drug discovery',
            why_prasad: 'Data Architecture + Compliance'
        },
        approach: {
            methodology: 'Data Mesh',
            phases: [],
            unique_differentiator: 'Semantic search using BioBERT specific to medical queries'
        },
        outcomes: {
            hero_metric: { value: '50%', label: 'Faster Insights', icon: '⚡' },
            secondary_metrics: [{ value: '€500K', label: 'Savings', icon: '💰' }],
            compliance: [{ standard: 'GDPR', result: 'Compliant', details: 'PII Masking' }],
            timeline: { planned: '6 months', actual: '6 months', variance: 'On time' }
        },
        technical: {
            before: { stack: [], infrastructure: '', issues: [] },
            after: { stack: ['AWS', 'Databricks', 'BioBERT', 'React'], infrastructure: 'Data Mesh', improvements: [] },
            migration_strategy: 'Greenfield Build'
        },
        cta: {
            primary: { text: 'Build Data Platform', action: 'https://calendly.com/prasadtilloo/30min', context: 'Unlock R&D data.' },
            secondary: { text: 'View Details', action: '#' }
        }
    },
    {
        id: 'telecom-fpp',
        slug: 'telecom-future-pricing-platform',
        theme: {
            color: 'violet',
            gradient: 'from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/10',
            iconBg: 'bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400'
        },
        domains: ['Telecom', 'Consulting'],
        projectType: 'migration',
        seoTags: ['Microservices', 'Event Driven', 'Telecom'],
        header: {
            eyebrow: 'EVENT-DRIVEN ARCHITECTURE',
            title: 'Future Pricing Platform (FPP) Transformation',
            client: {
                type: 'Fortune 100 Telecom',
                size: 'Enterprise',
                industry: 'Telecom'
            }
        },
        challenge: {
            situation: 'Manual pricing updates took days/weeks. Needed real-time dynamic pricing.',
            pain_points: [],
            urgency: 'Competitive pressure',
            why_prasad: 'Event-driven architecture expertise'
        },
        approach: {
            methodology: 'Domain-Driven Design',
            phases: [],
            unique_differentiator: 'Seamless transition roadmap from manual to fully automated'
        },
        outcomes: {
            hero_metric: { value: 'Real-time', label: 'Pricing Updates', icon: '⏱️' },
            secondary_metrics: [],
            compliance: [],
            timeline: { planned: 'N/A', actual: 'N/A', variance: 'N/A' }
        },
        technical: {
            before: { stack: ['Manual', 'Legacy'], infrastructure: '', issues: [] },
            after: { stack: ['Microservices', 'Kafka', 'Java'], infrastructure: 'Cloud Native', improvements: [] },
            migration_strategy: 'Phased Migration'
        },
        cta: {
            primary: { text: 'Discuss Modernization', action: 'https://calendly.com/prasadtilloo/30min', context: 'Automate core processes.' },
            secondary: { text: 'View Solution', action: '#' }
        }
    },
    {
        id: 'innova-claims',
        slug: 'innova-claims-processing',
        theme: {
            color: 'sky',
            gradient: 'from-sky-50 to-blue-50 dark:from-sky-900/20 dark:to-blue-900/10',
            iconBg: 'bg-sky-100 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400'
        },
        domains: ['FinServ', 'Insurance'],
        projectType: 'data-platform',
        seoTags: ['Claims Automation', 'Data Efficiency'],
        header: {
            eyebrow: '80% EFFICIENCY GAIN',
            title: 'Claims Processing Data Platform',
            client: {
                type: 'Innova Solutions',
                size: 'Enterprise Services',
                industry: 'Insurance'
            }
        },
        challenge: {
            situation: 'Manual claims processing was slow and error-prone.',
            pain_points: [],
            urgency: 'Operational costs',
            why_prasad: 'Data Engineering leadership'
        },
        approach: {
            methodology: 'Automated Data Pipeline',
            phases: [],
            unique_differentiator: 'Integrated business rules engine'
        },
        outcomes: {
            hero_metric: { value: '80%', label: 'Efficiency Gain', icon: '📈' },
            secondary_metrics: [],
            compliance: [],
            timeline: { planned: 'N/A', actual: 'N/A', variance: 'N/A' }
        },
        technical: {
            before: { stack: ['Manual'], infrastructure: '', issues: [] },
            after: { stack: ['Data Pipelines', 'Reporting Tools'], infrastructure: '', improvements: [] },
            migration_strategy: 'Automation'
        },
        cta: {
            primary: { text: 'Automate Operations', action: 'https://calendly.com/prasadtilloo/30min', context: 'Reduce manual work.' },
            secondary: { text: 'View Details', action: '#' }
        }
    },
    {
        id: 'bofa-account-opening',
        slug: 'bofa-account-opening',
        theme: {
            color: 'red',
            gradient: 'from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/10',
            iconBg: 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
        },
        domains: ['FinServ'],
        projectType: 'product',
        seoTags: ['FinTech', 'User Experience'],
        header: {
            eyebrow: 'PROCESS OPTIMIZATION',
            title: 'Streamlined Account Opening for Financial Advisors',
            client: {
                type: 'Bank of America / Merrill Lynch',
                size: 'Global Bank',
                industry: 'Financial Services'
            }
        },
        challenge: {
            situation: 'Complex onboarding process frustrated advisors and clients.',
            pain_points: [],
            urgency: 'Client satisfaction',
            why_prasad: 'Process optimization + UX focus'
        },
        approach: {
            methodology: 'Workflow Automation',
            phases: [],
            unique_differentiator: 'Focus on advisor experience'
        },
        outcomes: {
            hero_metric: { value: 'High', label: 'Advisor Satisfaction', icon: '😊' },
            secondary_metrics: [],
            compliance: [{ standard: 'FINRA', result: 'Compliant', details: '' }],
            timeline: { planned: 'N/A', actual: 'N/A', variance: 'N/A' }
        },
        technical: {
            before: { stack: [], infrastructure: '', issues: [] },
            after: { stack: ['Workflow Engine'], infrastructure: '', improvements: [] },
            migration_strategy: 'Optimization'
        },
        cta: {
            primary: { text: 'Improve UX', action: 'https://calendly.com/prasadtilloo/30min', context: 'Better onboarding.' },
            secondary: { text: 'View Details', action: '#' }
        }
    },
    {
        id: 'ileap-logistics',
        slug: 'ileap-logistics-emissions',
        theme: {
            color: 'emerald',
            gradient: 'from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/10',
            iconBg: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400'
        },
        domains: ['Climate Tech', 'Standards Development'],
        projectType: 'standard',
        seoTags: ['Logistics Emissions', 'Scope 3', 'Supply Chain'],
        header: {
            eyebrow: 'SUPPLY CHAIN DECARBONIZATION',
            title: 'iLEAP: Logistics Emissions Integration Project',
            client: {
                type: 'SINE Foundation / SFC',
                size: 'Non-Profit',
                industry: 'Climate Tech'
            }
        },
        challenge: {
            situation: 'Up to 60% of product Scope 3 emissions come from logistics, but data was disconnected.',
            pain_points: [],
            urgency: 'Need for holistic view',
            why_prasad: 'Standards expertise'
        },
        approach: {
            methodology: 'Data Model Extension',
            phases: [],
            unique_differentiator: 'Integrating logistics data standard (GLEC) with product standard (PACT)'
        },
        outcomes: {
            hero_metric: { value: '60%', label: 'Scope 3 Coverage', icon: '🚛' },
            secondary_metrics: [],
            compliance: [],
            timeline: { planned: 'N/A', actual: 'N/A', variance: 'N/A' }
        },
        technical: {
            before: { stack: [], infrastructure: '', issues: [] },
            after: { stack: ['Data Modeling', 'API Design'], infrastructure: '', improvements: [] },
            migration_strategy: 'Standardization'
        },
        cta: {
            primary: { text: 'Learn More', action: 'https://smart-freight-centre-media.s3.amazonaws.com/documents/iLEAP_-_project_charter.pdf', context: 'View Project Charter' },
            secondary: { text: 'View Details', action: '#' }
        }
    },
    {
        id: 'pwc-healthcare-mod',
        slug: 'pwc-healthcare-modernization',
        theme: {
            color: 'teal',
            gradient: 'from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/10',
            iconBg: 'bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400'
        },
        domains: ['Healthcare', 'Consulting'],
        projectType: 'migration',
        seoTags: ['Healthcare Modernization', 'Mobile App'],
        header: {
            eyebrow: '$500K SAVED',
            title: 'Healthcare System Modernization & Mobile App',
            client: {
                type: 'PwC Client',
                size: 'Enterprise',
                industry: 'Healthcare'
            }
        },
        challenge: {
            situation: 'Legacy system needed modernization and mobile access.',
            pain_points: [],
            urgency: 'Cost and user demand',
            why_prasad: 'Full stack leadership'
        },
        approach: {
            methodology: 'Incremental Modernization',
            phases: [],
            unique_differentiator: 'Pharmacy module mobile app that drove 70% traffic increase'
        },
        outcomes: {
            hero_metric: { value: '70%', label: 'Traffic Boost', icon: '📈' },
            secondary_metrics: [{ value: '$500K', label: 'Annual Savings', icon: '💰' }],
            compliance: [{ standard: 'HIPAA', result: 'Compliant', details: '' }],
            timeline: { planned: 'N/A', actual: 'N/A', variance: 'N/A' }
        },
        technical: {
            before: { stack: ['Legacy'], infrastructure: '', issues: [] },
            after: { stack: ['Angular', 'Spring Boot', 'iOS', 'Android'], infrastructure: 'Cloud', improvements: [] },
            migration_strategy: 'Modernization'
        },
        cta: {
            primary: { text: 'Modernize Apps', action: 'https://calendly.com/prasadtilloo/30min', context: 'Go mobile.' },
            secondary: { text: 'View Details', action: '#' }
        }
    },
    {
        id: 'voc-360',
        slug: 'voice-of-customer-360',
        theme: {
            color: 'blue',
            gradient: 'from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/10',
            iconBg: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
        },
        domains: ['Consulting', 'FinServ'],
        projectType: 'data-platform',
        seoTags: ['Customer 360', 'Insurance', 'Analytics'],
        header: {
            eyebrow: 'CUSTOMER EXPERIENCE',
            title: 'Voice of Customer (VoC) 360 Model',
            client: {
                type: 'Insurance Client',
                size: 'Enterprise',
                industry: 'Insurance'
            }
        },
        challenge: {
            situation: 'Call center agents lacked unified view of customer, leading to long calls and frustration.',
            pain_points: [],
            urgency: 'CX Impact',
            why_prasad: 'Data integration expertise'
        },
        approach: {
            methodology: '360 View Architecture',
            phases: [],
            unique_differentiator: 'Real-time aggregation of policy, claims, and interaction data'
        },
        outcomes: {
            hero_metric: { value: 'Reduced', label: 'Call Handling Time', icon: '⏱️' },
            secondary_metrics: [],
            compliance: [],
            timeline: { planned: 'N/A', actual: 'N/A', variance: 'N/A' }
        },
        technical: {
            before: { stack: [], infrastructure: '', issues: [] },
            after: { stack: ['Integration Patterns'], infrastructure: '', improvements: [] },
            migration_strategy: 'Integration'
        },
        cta: {
            primary: { text: 'Improve CX', action: 'https://calendly.com/prasadtilloo/30min', context: 'Build 360 view.' },
            secondary: { text: 'View Model', action: '#' }
        }
    }
];
