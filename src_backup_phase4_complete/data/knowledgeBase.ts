export type KBItem = { id: string; title: string; text: string };

export const KNOWLEDGE_BASE: KBItem[] = [
  {
    id: 'summary',
    title: 'Professional Summary',
    text: `Results-driven, hands-on Senior Architect & Engineering Leader with 15+ years of cross-industry expertise spanning banking, telecom, e-commerce, retail, healthcare, and AdTech. Specializes in cloud-first digital transformation, AI-driven automation, compliance (GDPR, HIPAA, PCI), and building enterprise-scale systems.`
  },
  {
    id: 'skills',
    title: 'Core Skills & Expertise',
    text: `Cloud: AWS, Azure, GCP; DevOps: Docker, Kubernetes, Terraform, Jenkins, GitHub Actions; Languages & Frameworks: Java, C#, JavaScript/TypeScript, React, Spring Boot, Node.js; Data: Spark, Kafka, Elasticsearch; Architecture: TOGAF, event-driven microservices, data pipelines, FHIR/HIPAA compliance, ML enablement.`
  },
  {
    id: 'pwc',
    title: 'PwC — Senior Manager (Mar 2015 – Oct 2020)',
    text: `Led a $650K cloud modernization program for e-commerce and healthcare systems, achieving $500K in annual savings and ensuring HIPAA/FHIR/PCI compliance. Designed and deployed a pharmacy mobile app module (70% traffic increase) and co-developed an Enterprise Data Lake accelerating AI/ML insights by 50%.`
  },
  {
    id: 'innova',
    title: 'Innova Solutions — Tech Lead / Engineering Manager (Jun 2009 - Feb 2015)',
    text: `Improved insurance client website performance by 80% via a scalable data pipeline and ensured PCI/HIPAA compliance. Built an asynchronous account data ingestion system using Docker and Jenkins, improving operational efficiency by 20%.`
  },
  {
    id: 'certifications',
    title: 'Certifications & Licenses',
    text: `AI Engineering - ByteByteAI; AWS Certified Developer; Certified SAFe 4 DevOps Practitioner; Multiple specialized AI and language certifications (ByteByteAI, Kaggle, Goethe-Institut).`
  },
  {
    id: 'projects',
    title: 'Projects & Achievements',
    text: `Worked on large-scale cloud migrations, enterprise digital transformations, and AI/ML enablement projects. Delivered measurable impacts such as cost savings, faster deployments, and improved operational efficiency.`
  }
];
