export interface Project {
  id: string;
  slug: string;
  title: string;
  company: string;
  date: string;
  industries: Array<'healthcare' | 'financial' | 'ecommerce' | 'aiml' | 'adtech' | 'telecom' | 'manufacturing' | 'climate-tech'>;
  role: string;
  challenge: string;
  solution: string;
  metrics: string[];
  techStack: string[];
  compliance: string[];
  tags: string[];
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: '1',
    slug: 'brita-ecommerce-platform',
    title: 'BRITA eCommerce Platform Migration',
    company: 'BRITA',
    date: 'May 2025 - Nov 2025',
    industries: ['ecommerce'],
    role: 'Solution Architect',
    challenge: 'Multi-brand DTC platform migration from Shopware to Shopify Plus across 6 EMEA markets with zero downtime',
    solution: 'Designed headless reference architecture integrating Shopify Plus, Vue.js/Nuxt.js, Magnolia CMS, and Azure middleware with multi-tenant governance model',
    metrics: [
      '6 EMEA markets launched',
      'Zero-downtime migration achieved',
      'Multi-tenant governance model implemented',
      'GDPR compliance maintained'
    ],
    techStack: ['React', 'Nuxt.js', 'Vue.js', 'Magnolia', 'Shopify Plus', 'Azure', 'Kubernetes', 'PostgreSQL', 'Docker'],
    compliance: ['GDPR'],
    tags: ['E-commerce', 'Headless Commerce', 'Multi-tenant', 'Azure', 'Shopify', 'Vue.js'],
    featured: true
  },
  {
    id: '2',
    slug: 'pact-carbon-footprint-network',
    title: 'PACT Online Catalog & PCF Network',
    company: 'SINE Foundation',
    date: 'Oct 2022 - Jun 2024',
    industries: ['climate-tech'],
    role: 'Tech Project Manager & Lead',
    challenge: 'Establish a global standard for Product Carbon Footprint (PCF) data exchange and launch a conformant network.',
    solution: 'Led the entire lifecycle of the PACT Tech Spec (v2) and Online Catalog. Managed Hackathons, Webinars, and conformity testing processes.',
    metrics: [
      'Led Tech Spec & API Development',
      'Established Conformance Testing Process',
      'Launched Beta PACT Catalog',
      'Hosted 10+ Webinars & Hackathons'
    ],
    techStack: ['Next.js', 'React', 'Python', 'FastAPI', 'Azure', 'PostgreSQL', 'Docker', 'OpenAPI'],
    compliance: ['WBCSD PACT Standard'],
    tags: ['Climate Tech', 'Standardization', 'Tech Specs', 'Project Management', 'Open Source'],
    featured: true
  },
  {
    id: '2b',
    slug: 'pact-conformance-testing',
    title: 'PACT Conformance Testing Suite',
    company: 'SINE Foundation',
    date: 'Oct 2022 - Jun 2024',
    industries: ['climate-tech'],
    role: 'Lead Architect',
    challenge: 'Automate verification of PACT-conformant solutions to ensure interoperability across the ecosystem.',
    solution: 'Architected and delivered the PACT Conformance Testing Suite (Testbed) and defined the GitHub-based testing process.',
    metrics: [
      'Automated Test Suite Delivered',
      'GitHub-based Approval Workflow',
      'Adopted by major enterprises',
      'Ensured ecosystem interoperability'
    ],
    techStack: ['Python', 'PyTest', 'GitHub Actions', 'Docker', 'REST API'],
    compliance: ['WBCSD PACT Standard'],
    tags: ['Testing', 'Automation', 'QA', 'Interoperability', 'Open Source'],
    featured: true
  },
  {
    id: '3',
    slug: 'delivery-hero-display-ads',
    title: 'Delivery Hero Display Ads Platform',
    company: 'Delivery Hero SE',
    date: 'Mar 2022 - Sep 2022',
    industries: ['adtech', 'ecommerce'],
    role: 'Senior Engineering Manager',
    challenge: 'Build scalable display ads product for EMEA food delivery with 99.99% SLA and GDPR compliance',
    solution: 'Architected 6+ Tier 1 APIs with data analytics pipeline, led 10-member cross-functional team',
    metrics: [
      '20% revenue increase',
      '5M+ daily transactions',
      '99.99% SLA compliance',
      '40% improved ad delivery'
    ],
    techStack: ['Java', 'Spring Boot', 'Golang', 'React', 'AWS', 'Kubernetes', 'Terraform', 'Prometheus', 'Docker'],
    compliance: ['GDPR'],
    tags: ['AdTech', 'High-scale', 'Real-time', 'AWS', 'Golang', 'Microservices'],
    featured: true
  },
  {
    id: '4',
    slug: 'boehringer-aiml-platform',
    title: 'Boehringer Ingelheim AI/ML Platform',
    company: 'Boehringer Ingelheim',
    date: 'Nov 2020 - Feb 2022',
    industries: ['healthcare', 'aiml'],
    role: 'Lead Architect',
    challenge: 'Accelerate AI/ML insights for pharmaceutical research while maintaining compliance',
    solution: 'Built Enterprise Data Lake with domain-driven and event-driven microservices architecture',
    metrics: [
      '50% faster AI/ML insights',
      '30% efficiency improvement',
      '€500K cloud migration completed',
      'GDPR compliant'
    ],
    techStack: ['Java', 'Spring Boot', 'AWS', 'Spark', 'Python', 'Kubernetes', 'Terraform', 'Oracle', 'Docker'],
    compliance: ['GDPR', 'Pharma regulations'],
    tags: ['AI/ML', 'Healthcare', 'Data Lake', 'AWS', 'Microservices', 'BigData']
  },
  {
    id: '5',
    slug: 'boehringer-salesforce-crm',
    title: 'Boehringer Ingelheim Salesforce CRM',
    company: 'Boehringer Ingelheim',
    date: 'Nov 2020 - Feb 2022',
    industries: ['healthcare'],
    role: 'Lead Architect',
    challenge: 'Digital transformation of IT Marketing & Sales systems with full compliance',
    solution: 'Implemented Salesforce/Veeva CRM integration with comprehensive GDPR/PCI compliance framework',
    metrics: [
      '30% efficiency improvement',
      'Full GDPR/PCI compliance',
      '€500K cloud migration',
      'Mobile apps launched'
    ],
    techStack: ['Salesforce', 'Veeva CRM', '.NET', 'Java', 'Swift', 'Kotlin', 'AWS', 'Jenkins', 'Docker'],
    compliance: ['GDPR', 'PCI-DSS'],
    tags: ['CRM', 'Salesforce', 'Healthcare', 'Digital Transformation', 'Mobile']
  },
  {
    id: '6',
    slug: 'pwc-healthcare-modernization',
    title: 'PwC Healthcare Modernization',
    company: 'PwC',
    date: 'Mar 2015 - Oct 2020',
    industries: ['healthcare'],
    role: 'Senior Manager',
    challenge: 'Modernize legacy healthcare systems while ensuring HIPAA/FHIR compliance',
    solution: 'Led $650K cloud-first architecture with mobile pharmacy module for flagship app',
    metrics: [
      '$500K annual savings',
      '70% traffic increase',
      'HIPAA/FHIR/PCI compliant',
      '12-member team led'
    ],
    techStack: ['Angular', 'Java', 'SpringBoot', 'Swift', 'Kotlin', 'Azure', 'Kafka', 'DynamoDB', 'Kubernetes', 'Docker'],
    compliance: ['HIPAA', 'FHIR', 'PCI-DSS'],
    tags: ['Healthcare', 'HIPAA', 'Cloud Migration', 'Mobile Apps', 'Azure', 'Pharmacy']
  },
  {
    id: '7',
    slug: 'pwc-ecommerce-platform',
    title: 'PwC E-commerce Platform',
    company: 'PwC',
    date: 'Mar 2015 - Oct 2020',
    industries: ['ecommerce'],
    role: 'Senior Manager',
    challenge: 'Modernize e-commerce systems for retail client with PCI compliance',
    solution: 'Implemented microservices architecture with comprehensive cloud migration strategy',
    metrics: [
      '$500K annual savings',
      'PCI compliance achieved',
      '70% traffic increase',
      'Zero downtime migration'
    ],
    techStack: ['Angular', 'Java', 'Golang', 'Azure', 'Kubernetes', 'Terraform', 'ELK', 'Grafana', 'Docker'],
    compliance: ['PCI-DSS'],
    tags: ['E-commerce', 'Retail', 'Cloud Migration', 'Microservices', 'Azure']
  },
  {
    id: '8',
    slug: 'innova-insurance-platform',
    title: 'Innova Insurance Platform',
    company: 'Innova Solutions',
    date: 'Jun 2009 - Feb 2016',
    industries: ['financial'],
    role: 'Tech Lead / Engineering Manager',
    challenge: 'Improve insurance website performance and ensure multi-framework compliance',
    solution: 'Built scalable data pipeline with PCI/HIPAA compliance and ICD-10/FHIR integration',
    metrics: [
      '80% performance improvement',
      '20% operational efficiency gain',
      'ICD-10 compliance achieved',
      'FHIR standards implemented'
    ],
    techStack: ['AngularJS', 'C#', 'ASP.NET', 'Java', 'Spring Boot', 'Jenkins', 'Docker', 'GitHub'],
    compliance: ['PCI-DSS', 'HIPAA', 'FHIR', 'ICD-10'],
    tags: ['Insurance', 'Financial Services', 'Data Pipeline', '.NET', 'Compliance']
  },
  {
    id: '9',
    slug: 'innova-banking-account-system',
    title: 'Innova Banking Account System',
    company: 'Innova Solutions',
    date: 'Jun 2009 - Feb 2016',
    industries: ['financial'],
    role: 'Tech Lead',
    challenge: 'Streamline account data ingestion for banking client with compliance requirements',
    solution: 'Pioneered asynchronous data ingestion system using Docker/Jenkins CI/CD pipeline',
    metrics: [
      '20% efficiency improvement',
      'Compliance-driven workflows automated',
      'Real-time data processing',
      'Zero data loss'
    ],
    techStack: ['AngularJS', 'Java', 'C#', 'ASP.NET', 'Docker', 'Jenkins', 'GitHub', 'SonarQube'],
    compliance: ['PCI-DSS', 'Banking regulations'],
    tags: ['Banking', 'Financial Services', 'Data Ingestion', 'Docker', 'CI/CD']
  },
  {
    id: '10',
    slug: 'legacy-mainframe-migration',
    title: 'Legacy Mainframe Migration',
    company: 'PwC / Innova Solutions',
    date: '2015-2020',
    industries: ['financial'],
    role: 'Senior Manager / Tech Lead',
    challenge: 'Migrate 7.8M lines of COBOL mainframe to modern cloud with zero downtime',
    solution: 'Executed phased migration strategy with comprehensive testing and rollback procedures',
    metrics: [
      '7.8M LOC COBOL migrated',
      '$25M+ savings potential',
      'Zero production incidents',
      'Minimal business disruption'
    ],
    techStack: ['Java', 'Spring Boot', 'AWS', 'Jenkins', 'Docker', 'Kubernetes', 'PostgreSQL'],
    compliance: ['Banking regulations', 'PCI-DSS'],
    tags: ['Legacy Modernization', 'Mainframe', 'COBOL', 'Cloud Migration', 'AWS', 'Financial Services']
  }
  ,
  {
    id: '11',
    slug: 'ai-photography-coach-rag',
    title: 'AI Photography Coach (RAG)',
    company: 'Personal / ByteByteAI',
    date: '2025',
    industries: ['aiml'],
    role: 'Creator',
    challenge: 'Create an AI assistant to critique and coach photography using RAG and vision models',
    solution: 'Built a RAG-based assistant combining image embeddings, FAISS-style retrieval, and multimodal LLMs to provide actionable photo critique',
    metrics: [
      'Prototype completed',
      'Integrated multimodal retrieval',
      'Public repo with notebooks and examples'
    ],
    techStack: ['Python', 'LangChain', 'FAISS', 'Pillow', 'TensorFlow', 'PyTorch'],
    compliance: [],
    tags: ['AI', 'RAG', 'Computer Vision', 'Python']
  },
  {
    id: '12',
    slug: 'ai-eng-projects-bytebyteai-cohort',
    title: 'AI Engineering Projects (ByteByteAI cohort)',
    company: 'Personal / ByteByteAI',
    date: '2025',
    industries: ['aiml'],
    role: 'Contributor',
    challenge: 'Hands-on projects for learning end-to-end AI engineering practices',
    solution: 'Collection of notebooks and example projects demonstrating RAG, model fine-tuning, and deployment patterns',
    metrics: [
      'Cohort project submissions',
      'Example pipelines and notebooks'
    ],
    techStack: ['Python', 'Jupyter', 'Docker'],
    compliance: [],
    tags: ['AI', 'Education', 'Notebooks']
  }
];
