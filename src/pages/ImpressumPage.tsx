import React from 'react';
import SEO from '../components/SEO';
import { PageShell, PageHeader, Container } from '../components/layout';

/**
 * Impressum (§ 5 DDG).
 *
 * TODO(Prasad): replace every bracketed placeholder before merging. Confirm the
 * required fields with your Steuerberater or a lawyer. Do not publish with
 * placeholders; an incomplete Impressum is as much of a risk as a missing one.
 */
const IMPRESSUM = {
    name: 'Prasad Tilloo',
    street: '[Street and house number]',
    city: '[Postal code] Taunusstein',
    country: 'Germany',
    email: 'prasad.sgsits@gmail.com',
    phone: '[Phone number]',
    vatId: '[USt-IdNr. per § 27a UStG, or delete this line if you have none]',
    profession: 'Freelance IT consultant (Freiberufler)',
};

const ImpressumPage: React.FC = () => (
    <>
        <SEO title="Impressum | Prasad Tilloo" description="Legal notice (Impressum) for prasadtilloo.com." />
        <PageShell background="muted" containerMaxWidth="4xl" className="pt-24">
            <PageHeader title="Impressum" />
            <Container maxWidth="4xl">
                <div className="max-w-3xl mx-auto bg-white dark:bg-slate-800 rounded-2xl p-8 md:p-12 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 grid gap-6">
                    <section>
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Angaben gemäß § 5 DDG</h2>
                        <p>
                            {IMPRESSUM.name}
                            <br />
                            {IMPRESSUM.profession}
                            <br />
                            {IMPRESSUM.street}
                            <br />
                            {IMPRESSUM.city}
                            <br />
                            {IMPRESSUM.country}
                        </p>
                    </section>
                    <section>
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Kontakt</h2>
                        <p>
                            E-Mail: {IMPRESSUM.email}
                            <br />
                            Telefon: {IMPRESSUM.phone}
                        </p>
                    </section>
                    <section>
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Umsatzsteuer-ID</h2>
                        <p>{IMPRESSUM.vatId}</p>
                    </section>
                    <section>
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
                        <p>
                            {IMPRESSUM.name}, {IMPRESSUM.street}, {IMPRESSUM.city}
                        </p>
                    </section>
                </div>
            </Container>
        </PageShell>
    </>
);

export default ImpressumPage;
