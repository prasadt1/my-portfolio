import React from 'react';
import OfferPage from './OfferPage';

const EuAiActReadinessPage: React.FC = () => (
    <OfferPage
        seoTitle="EU AI Act Readiness Assessment | Prasad Tilloo"
        seoDescription="Two-week EU AI Act gap analysis for software companies selling AI into the EU: role, risk classification, obligations, gap register, and a 90-day plan. In English."
        title="EU AI Act Readiness Assessment"
        subtitle="Know your role, your risk tier, and your gaps under the EU AI Act, with a 90-day plan your engineers can execute."
        sections={[
            {
                title: 'Who it is for',
                items: [
                    'Software companies outside the EU with EU customers and AI features in their product',
                    'EU companies that deploy third-party AI in hiring, credit, education, or customer service',
                    'Teams whose customers have started sending AI Act questionnaires',
                ],
            },
            {
                title: 'What you get',
                items: [
                    'Role determination per AI system: provider, deployer, importer, distributor, or authorized representative',
                    'AI inventory: every AI feature and third-party model in use, with its purpose and data flows',
                    'Risk classification: prohibited (Art. 5), high-risk (Annex III or Annex I), transparency (Art. 50), general-purpose AI model duties, or minimal',
                    'Obligation map: what applies today, and what applies from December 2027 and August 2028',
                    'Gap register: each gap with an owner, an effort estimate, and a deadline',
                    'AI literacy check (Art. 4): what your staff training covers and what it misses',
                    '90-day plan and a 60-minute readout with your leadership',
                ],
            },
            {
                title: 'What it is not',
                items: [
                    'Not legal advice. I flag questions that need a lawyer and can work alongside yours.',
                    'Not a certification. ISO/IEC 42001 alignment is mapped where you ask for it.',
                ],
            },
            {
                title: 'Why an architect',
                intro:
                    'Law firms tell you what the Act requires. They rarely tell you which logging change, access control, or human-review step satisfies it in your stack. I read your architecture as well as your policies, and translate each obligation into an engineering task.',
            },
        ]}
        format="Two weeks, remote, in English. Up to five AI systems. Two working sessions with your team plus async document review. Fixed price, quoted after the scoping call."
        faqs={[
            {
                q: 'We are a US company. Does the Act apply to us?',
                a: 'It applies if you place an AI system on the EU market or its output is used in the EU. The scoping call answers this for your case.',
            },
            {
                q: "Didn't the high-risk deadline move?",
                a: 'Yes. The Digital Omnibus moved Annex III high-risk obligations to December 2, 2027 and Annex I to August 2, 2028. Article 50 transparency duties apply from August 2, 2026, and the prohibitions and AI literacy duty have applied since February 2, 2025.',
            },
            {
                q: "Do we need this if we only use a model provider's API?",
                a: "Usually yes. You can be a provider or deployer of the system you built on top of the model. The model provider's duties don't cover yours.",
            },
        ]}
        related={{ to: '/ai-integration-readiness', label: 'AI Integration Readiness Assessment for CRM and ERP' }}
    />
);

export default EuAiActReadinessPage;
