import React from 'react';
import { Link, useParams } from 'react-router-dom';
import SEO from '../components/SEO';
import { PageShell, PageHeader, Container } from '../components/layout';
import UnavailablePage from './UnavailablePage';

type TopicContent = {
    title: string;
    description: string;
    intro: string;
    bullets: string[];
    signals: string[];
    recommended: Array<{ label: string; href: string }>;
    faqs: Array<{ question: string; answer: string }>;
    keywords: string;
};

const TOPICS: Record<string, TopicContent> = {
    'enterprise-architecture-healthcare-it': {
        title: 'Enterprise Architecture in Healthcare IT',
        description: 'How to modernize healthcare platforms without compromising compliance, security, or uptime.',
        intro: 'Healthcare architecture decisions have outsized risk. This guide highlights the patterns and tradeoffs executives expect to see when evaluating leadership for healthcare IT transformation.',
        bullets: [
            'Define non-functional requirements (PHI handling, auditability, uptime) before selecting platforms.',
            'Design for data lineage and access controls to satisfy HIPAA and regional privacy regulations.',
            'Plan migration waves around clinical and revenue cycles to minimize operational disruption.'
        ],
        signals: [
            'Proven HIPAA/GDPR delivery experience.',
            'Clear risk posture and incident response plan.',
            'Vendor-neutral architecture decisions tied to business outcomes.'
        ],
        recommended: [
            { label: 'View hiring snapshot', href: '/hire' },
            { label: 'Explore case studies', href: '/projects' }
        ],
        faqs: [
            { question: 'How do you balance compliance and delivery speed?', answer: 'By designing compliance controls into the architecture from day one, so delivery teams can move quickly without late-stage rework.' },
            { question: 'What matters most to boards in healthcare IT?', answer: 'Risk containment, uptime, auditability, and a clear roadmap tied to measurable outcomes.' }
        ],
        keywords: 'enterprise architecture healthcare IT, HIPAA compliance, healthcare modernization, regulated systems'
    },
    'fractional-cto-startup-scale': {
        title: 'Acting Fractional CTO for Scaling Startups',
        description: 'What an acting, hands-on fractional CTO delivers at seed to Series B when the architecture must scale fast.',
        intro: 'Startups often need senior technical leadership before they can justify a full-time CTO. This page outlines the executive deliverables and decision frameworks an acting fractional CTO should provide.',
        bullets: [
            'Align product roadmap with architecture and team capabilities.',
            'Define the 90-day delivery plan with hiring priorities and measurable KPIs.',
            'Create a build-buy-modernize decision memo for board and investor alignment.'
        ],
        signals: [
            'Ability to move between strategy and hands-on execution.',
            'Clear hiring plan and delivery system design.',
            'Evidence of scale, reliability, and cost control.'
        ],
        recommended: [
            { label: 'View hiring snapshot', href: '/hire' },
            { label: 'See executive case studies', href: '/projects' }
        ],
        faqs: [
            { question: 'When should a startup hire a fractional CTO?', answer: 'When technical decisions are strategic but full-time leadership is not yet justified or affordable.' },
            { question: 'What deliverables should I expect?', answer: 'A 90-day plan, architecture decisions, hiring priorities, and a clear risk/ROI narrative.' }
        ],
        keywords: 'acting fractional CTO, startup scale, interim CTO, engineering leadership'
    },
    'ai-modernization-compliance': {
        title: 'AI Modernization in Regulated Environments',
        description: 'How to introduce AI and automation without jeopardizing compliance or trust.',
        intro: 'AI initiatives in regulated industries require more than model selection. They demand governance, auditability, and reliability baked into the architecture.',
        bullets: [
            'Define data governance, audit trails, and model monitoring requirements upfront.',
            'Prefer explainable, bounded AI use cases before deploying high-risk automation.',
            'Adopt a phased rollout with measurable risk controls.'
        ],
        signals: [
            'Experience integrating AI with compliance frameworks.',
            'Clear escalation paths and human-in-the-loop design.',
            'Architecture that makes AI outcomes auditable.'
        ],
        recommended: [
            { label: 'View hiring snapshot', href: '/hire' },
            { label: 'Explore AI case studies', href: '/projects' }
        ],
        faqs: [
            { question: 'How do you de-risk AI in regulated systems?', answer: 'By combining governance, auditability, and phased deployment with explicit failure modes.' },
            { question: 'What is the first AI use case to prioritize?', answer: 'Start with bounded, high-impact workflows where human review is feasible and data lineage is clear.' }
        ],
        keywords: 'AI modernization, regulated AI, compliance architecture, AI governance'
    }
};

const TopicPage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const topic = slug ? TOPICS[slug] : undefined;

    if (!topic) {
        return <UnavailablePage />;
    }

    const siteUrl = import.meta.env.VITE_SITE_URL || 'https://prasadtilloo.com';
    const canonical = `${siteUrl}/topics/${slug}`;

    const structuredData = [
        {
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": topic.title,
            "description": topic.description,
            "author": {
                "@type": "Person",
                "name": "Prasad Tilloo"
            },
            "mainEntityOfPage": canonical
        },
        {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": topic.faqs.map((faq) => ({
                "@type": "Question",
                "name": faq.question,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": faq.answer
                }
            }))
        }
    ];

    return (
        <>
            <SEO
                title={topic.title}
                description={topic.description}
                keywords={topic.keywords}
                canonical={canonical}
                structuredData={structuredData}
            />
            <PageShell background="muted" containerMaxWidth="6xl" className="pt-24">
                <PageHeader title={topic.title} subtitle={topic.description} />
                <Container maxWidth="6xl">
                    <section className="mb-12">
                        <p className="text-lg text-slate-700 dark:text-slate-300">
                            {topic.intro}
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">What matters most</h2>
                        <ul className="space-y-3">
                            {topic.bullets.map((item, idx) => (
                                <li key={idx} className="text-slate-700 dark:text-slate-300">
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Signals hiring managers look for</h2>
                        <ul className="space-y-3">
                            {topic.signals.map((item, idx) => (
                                <li key={idx} className="text-slate-700 dark:text-slate-300">
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Recommended next steps</h2>
                        <div className="flex flex-col sm:flex-row gap-4">
                            {topic.recommended.map((item) => (
                                <Link
                                    key={item.href}
                                    to={item.href}
                                    className="inline-flex items-center justify-center bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-semibold transition-all"
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                    </section>
                </Container>
            </PageShell>
        </>
    );
};

export default TopicPage;
