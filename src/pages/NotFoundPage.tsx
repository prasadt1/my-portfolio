import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { PageShell, PageHeader } from '../components/layout';

const NotFoundPage: React.FC = () => (
    <>
        <SEO title="Page not found | Prasad Tilloo" description="This page does not exist." />
        <PageShell background="muted" containerMaxWidth="4xl" className="pt-24">
            <PageHeader title="Page not found" subtitle="This page does not exist or has moved." />
            <p className="text-center">
                <Link to="/" className="text-emerald-700 dark:text-emerald-400 underline font-semibold">
                    Go to the homepage
                </Link>
            </p>
        </PageShell>
    </>
);

export default NotFoundPage;
