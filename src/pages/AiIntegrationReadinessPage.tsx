import React from 'react';
import OfferPage from './OfferPage';

const AiIntegrationReadinessPage: React.FC = () => (
    <OfferPage
        seoTitle="AI Integration Readiness for CRM & ERP | Prasad Tilloo"
        seoDescription="Before you connect AI agents to Salesforce, SAP, or Dynamics: a two-week assessment of data, access, APIs, and compliance, with a prioritized pilot plan."
        title="AI Integration Readiness Assessment"
        subtitle="Before you connect AI agents to Salesforce, SAP, Dynamics, or a custom ERP, find out what breaks first."
        sections={[
            {
                title: 'Who it is for',
                intro:
                    'Companies that want copilots or AI agents working inside their CRM or ERP, and need a clear view of data, access, and compliance before they commit budget.',
            },
            {
                title: 'What you get',
                items: [
                    'Use-case shortlist: three to five AI use cases ranked by value and feasibility',
                    'Data readiness: quality, ownership, and access for the data each use case needs',
                    'Integration map: APIs, events, and where an agent or MCP server would connect',
                    'Identity and permissions: whether an agent can act with least privilege, and how you audit it',
                    'Compliance triggers: GDPR (DPIA needs, special-category data) and AI Act role and risk tier per use case',
                    'Build, buy, or configure recommendation per use case',
                    '90-day pilot plan with success metrics',
                ],
            },
        ]}
        format="Two weeks, remote, in English. Fixed price, quoted after the scoping call."
        related={{ to: '/eu-ai-act-readiness', label: 'EU AI Act Readiness Assessment' }}
    />
);

export default AiIntegrationReadinessPage;
