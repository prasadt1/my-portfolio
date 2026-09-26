import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { PageShell, PageHeader, Container } from '../components/layout';

export const CALENDLY_URL = 'https://calendly.com/prasad-sgsits/30min';

export interface OfferSection {
    title: string;
    intro?: string;
    items?: string[];
}

export interface OfferFaq {
    q: string;
    a: string;
}

export interface OfferPageProps {
    seoTitle: string;
    seoDescription: string;
    title: string;
    subtitle: string;
    sections: OfferSection[];
    format: string;
    faqs?: OfferFaq[];
    related: { to: string; label: string };
}

/** Shared layout for the fixed-scope assessment pages. */
const OfferPage: React.FC<OfferPageProps> = ({
    seoTitle,
    seoDescription,
    title,
    subtitle,
    sections,
    format,
    faqs,
    related,
}) => (
    <>
        <SEO title={seoTitle} description={seoDescription} />
        <PageShell background="muted" containerMaxWidth="4xl" className="pt-24">
            <PageHeader
                title={title}
                subtitle={subtitle}
                cta={{ text: 'Book a 30-minute scoping call', href: CALENDLY_URL, external: true }}
            />
            <Container maxWidth="4xl">
                <div className="max-w-3xl mx-auto grid gap-8">
                    {sections.map((section) => (
                        <section
                            key={section.title}
                            className="bg-white dark:bg-slate-800 rounded-2xl p-6 md:p-10 border border-slate-200 dark:border-slate-700"
                        >
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">{section.title}</h2>
                            {section.intro && (
                                <p className="text-slate-700 dark:text-slate-300 mb-4 leading-relaxed">{section.intro}</p>
                            )}
                            {section.items && (
                                <ul className="list-disc pl-5 space-y-2 text-slate-700 dark:text-slate-300">
                                    {section.items.map((item) => (
                                        <li key={item}>{item}</li>
                                    ))}
                                </ul>
                            )}
                        </section>
                    ))}

                    <section className="rounded-2xl p-6 md:p-10 bg-slate-900 text-white">
                        <h2 className="text-2xl font-bold mb-3">Format</h2>
                        <p className="text-slate-200 leading-relaxed mb-6">{format}</p>
                        <a
                            href={CALENDLY_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-bold"
                        >
                            Book a 30-minute scoping call
                        </a>
                    </section>

                    {faqs && faqs.length > 0 && (
                        <section className="bg-white dark:bg-slate-800 rounded-2xl p-6 md:p-10 border border-slate-200 dark:border-slate-700">
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Questions</h2>
                            <dl className="grid gap-6">
                                {faqs.map((f) => (
                                    <div key={f.q}>
                                        <dt className="font-semibold text-slate-900 dark:text-white mb-1">{f.q}</dt>
                                        <dd className="text-slate-700 dark:text-slate-300 leading-relaxed">{f.a}</dd>
                                    </div>
                                ))}
                            </dl>
                        </section>
                    )}

                    <p className="text-center text-slate-600 dark:text-slate-400">
                        Also available: <Link to={related.to} className="text-emerald-700 dark:text-emerald-400 underline">{related.label}</Link>
                    </p>
                </div>
            </Container>
        </PageShell>
    </>
);

export default OfferPage;
