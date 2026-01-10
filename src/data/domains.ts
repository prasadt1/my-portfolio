export const DOMAINS = [
    { id: 'ecommerce', label: 'eCommerce' },
    { id: 'healthcare', label: 'Healthcare' },
    { id: 'finserv', label: 'FinServ' },
    { id: 'telecom', label: 'Telecom' },
    { id: 'pharma', label: 'Pharma' },
    { id: 'climate-tech', label: 'Climate Tech' },
    { id: 'manufacturing', label: 'Manufacturing' },
    { id: 'adtech', label: 'AdTech' }
] as const;

export const PROJECT_TYPES = [
    { id: 'product', label: 'Products' },
    { id: 'framework', label: 'Frameworks' },
    { id: 'migration', label: 'Migrations' },
    { id: 'standard', label: 'Standards' },
    { id: 'data-platform', label: 'Data Platforms' },
    { id: 'devops', label: 'DevOps' },
    { id: 'compliance', label: 'Compliance' },
    { id: 'ai-ml', label: 'AI/ML' },
    { id: 'consulting', label: 'Consulting' }
] as const;

export type DomainId = typeof DOMAINS[number]['id'];
export type ProjectTypeId = typeof PROJECT_TYPES[number]['id'];
