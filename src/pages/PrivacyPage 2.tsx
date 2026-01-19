import React from 'react';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';
import { PageShell, PageHeader, Container } from '../components/layout';

const PrivacyPage: React.FC = () => {
    const { t } = useTranslation();

    return (
        <>
            <SEO
                title={t('privacy.seo.title')}
                description={t('privacy.seo.description')}
            />
            <PageShell background="muted" containerMaxWidth="4xl" className="pt-24">
                <PageHeader
                    title={t('privacy.title')}
                    subtitle={t('privacy.subtitle')}
                />

                <Container maxWidth="4xl">
                    <div className="max-w-3xl mx-auto bg-white dark:bg-slate-800 rounded-2xl p-8 md:p-12 shadow-xl border border-slate-200 dark:border-slate-700">
                        <div className="prose prose-slate dark:prose-invert max-w-none">
                            <section className="mb-8">
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                                    {t('privacy.dataCollection.title')}
                                </h2>
                                <p className="text-slate-600 dark:text-slate-400 mb-4">
                                    {t('privacy.dataCollection.description')}
                                </p>
                                <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 space-y-2 ml-4">
                                    {(t('privacy.dataCollection.items', { returnObjects: true }) as string[]).map((item, idx) => (
                                        <li key={idx}>{item}</li>
                                    ))}
                                </ul>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                                    {t('privacy.dataUse.title')}
                                </h2>
                                <p className="text-slate-600 dark:text-slate-400 mb-4">
                                    {t('privacy.dataUse.description')}
                                </p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                                    {t('privacy.dataStorage.title')}
                                </h2>
                                <p className="text-slate-600 dark:text-slate-400">
                                    {t('privacy.dataStorage.description')}
                                </p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                                    {t('privacy.yourRights.title')}
                                </h2>
                                <p className="text-slate-600 dark:text-slate-400 mb-4">
                                    {t('privacy.yourRights.description')}
                                </p>
                                <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 space-y-2 ml-4">
                                    {(t('privacy.yourRights.items', { returnObjects: true }) as string[]).map((item, idx) => (
                                        <li key={idx}>{item}</li>
                                    ))}
                                </ul>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                                    {t('privacy.contact.title')}
                                </h2>
                                <p className="text-slate-600 dark:text-slate-400">
                                    {t('privacy.contact.description')}
                                </p>
                                <p className="text-slate-600 dark:text-slate-400 mt-2">
                                    <strong>{t('privacy.contact.email')}:</strong>{' '}
                                    <a href="mailto:prasad.sgsits@gmail.com" className="text-emerald-600 dark:text-emerald-400 hover:underline">
                                        prasad.sgsits@gmail.com
                                    </a>
                                </p>
                            </section>

                            <section className="pt-8 border-t border-slate-200 dark:border-slate-700">
                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                    {t('privacy.lastUpdated')}
                                </p>
                            </section>
                        </div>
                    </div>
                </Container>
            </PageShell>
        </>
    );
};

export default PrivacyPage;
