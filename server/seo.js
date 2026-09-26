/**
 * Server-side SEO for the single-page app.
 *
 * The React app renders everything in the browser, so crawlers that don't run
 * JavaScript (Bing, LinkedIn previews, most AI search crawlers) used to see an
 * empty <div id="root"> and the same <title> on every URL. This module injects,
 * per route:
 *   - a unique <title>, meta description, canonical, Open Graph and Twitter tags
 *   - a plain-HTML summary of the page inside #root (React replaces it on mount)
 *   - robots "noindex" for utility/recruiter routes
 * and returns HTTP 404 for unknown paths instead of a 200 app shell.
 *
 * Injected head tags carry data-rh="true" so react-helmet-async replaces them
 * on the client instead of duplicating them.
 */
import fs from 'fs';

const SITE_URL = process.env.SITE_URL || 'https://prasadtilloo.com';
const SITE_NAME = 'Prasad Tilloo';
const DEFAULT_OG = `${SITE_URL}/og/default.png`;
const CALENDLY = 'https://calendly.com/prasad-sgsits/30min';

const esc = (s) =>
    String(s)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');

const p = (text) => `<p>${esc(text)}</p>`;
const ul = (items) => `<ul>${items.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>`;
const a = (href, text) => `<a href="${esc(href)}">${esc(text)}</a>`;
const h2 = (text) => `<h2>${esc(text)}</h2>`;

const NAV = `<nav>${[
    a('/', 'Home'),
    a('/eu-ai-act-readiness', 'EU AI Act Readiness'),
    a('/ai-integration-readiness', 'AI Integration Readiness'),
    a('/projects', 'Case studies'),
    a('/about', 'About'),
    a('/contact', 'Contact'),
].join(' · ')}</nav>`;

const FOOTER = `<footer><p>${a('/impressum', 'Impressum')} · ${a('/privacy', 'Privacy')}</p></footer>`;

/** Static routes. `body` is plain HTML shown until React mounts. */
const ROUTES = {
    '/': {
        title: 'EU AI Act Readiness & AI Architecture | Prasad Tilloo',
        description:
            'Fixed-scope EU AI Act readiness and AI integration assessments for software companies selling into Europe. Delivered remotely, in English, in two weeks.',
        body:
            '<h1>Ship AI into the EU without guessing what the AI Act requires.</h1>' +
            p('I am an enterprise architect who assesses AI systems against the EU AI Act and your existing CRM and ERP landscape. You get a fixed-scope assessment, a classification of every AI feature, and a 90-day plan your engineers can execute.') +
            h2('Two assessments, fixed scope') +
            ul([
                'EU AI Act Readiness Assessment: your role under the Act, an inventory and risk classification of your AI features, the obligations that apply now and in 2027, and a gap register with owners and dates.',
                'AI Integration Readiness Assessment: data access, identity and permissions, API surface, and compliance triggers before you connect AI agents to Salesforce, SAP, Dynamics, or a custom ERP.',
            ]) +
            p('15+ years of enterprise architecture at PwC, Boehringer Ingelheim, Delivery Hero, BRITA, and the SINE Foundation (PACT). Currently fractional CTO for a regulated telemedicine platform handling GDPR Art. 9 health data.') +
            p(`${a('/eu-ai-act-readiness', 'See the EU AI Act assessment')} · ${a(CALENDLY, 'Book a 30-minute scoping call')}`),
    },
    '/eu-ai-act-readiness': {
        title: 'EU AI Act Readiness Assessment | Prasad Tilloo',
        description:
            'Two-week EU AI Act gap analysis for software companies selling AI into the EU: role, risk classification, obligations, gap register, and a 90-day plan. In English.',
        body:
            '<h1>EU AI Act Readiness Assessment</h1>' +
            p('For software companies outside the EU with EU customers and AI features in their product, EU companies deploying third-party AI in hiring, credit, education or customer service, and teams whose customers have started sending AI Act questionnaires.') +
            h2('What you get') +
            ul([
                'Role determination per AI system: provider, deployer, importer, distributor, or authorized representative',
                'AI inventory: every AI feature and third-party model in use, with purpose and data flows',
                'Risk classification: prohibited (Art. 5), high-risk (Annex III or Annex I), transparency (Art. 50), general-purpose AI model duties, or minimal',
                'Obligation map: what applies today and from December 2027 and August 2028',
                'Gap register with owners, effort estimates, and deadlines',
                'AI literacy check (Art. 4)',
                '90-day plan and a 60-minute leadership readout',
            ]) +
            p('Two weeks, remote, in English. Up to five AI systems. Not legal advice and not a certification.') +
            p(a(CALENDLY, 'Book a 30-minute scoping call')),
    },
    '/ai-integration-readiness': {
        title: 'AI Integration Readiness for CRM & ERP | Prasad Tilloo',
        description:
            'Before you connect AI agents to Salesforce, SAP, or Dynamics: a two-week assessment of data, access, APIs, and compliance, with a prioritized pilot plan.',
        body:
            '<h1>AI Integration Readiness Assessment for CRM and ERP</h1>' +
            p('For companies that want copilots or AI agents working inside Salesforce, SAP, Dynamics, or a custom ERP, and need to know what breaks first.') +
            h2('What you get') +
            ul([
                'Three to five AI use cases ranked by value and feasibility',
                'Data readiness: quality, ownership, and access for each use case',
                'Integration map: APIs, events, and where an agent or MCP server would connect',
                'Identity and permissions: least-privilege agent access and audit',
                'Compliance triggers: GDPR (DPIA, special-category data) and AI Act role and risk tier per use case',
                'Build, buy, or configure recommendation per use case',
                '90-day pilot plan with success metrics',
            ]) +
            p(a(CALENDLY, 'Book a 30-minute scoping call')),
    },
    '/services': {
        title: 'Services | Prasad Tilloo',
        description:
            'Architecture reviews, transformation blueprints, and ongoing architecture leadership, plus fixed-scope EU AI Act and AI integration readiness assessments.',
        body:
            '<h1>Architecture &amp; Transformation Services</h1>' +
            p('Independent validation of architecture, modernization, cloud migration, and AI decisions: architecture reviews, transformation blueprint sprints, and fractional architecture leadership.') +
            p(`${a('/eu-ai-act-readiness', 'EU AI Act Readiness Assessment')} · ${a('/ai-integration-readiness', 'AI Integration Readiness Assessment')}`),
    },
    '/consulting': {
        title: 'Consulting | Prasad Tilloo',
        description: 'Independent architecture, modernization, and AI consulting with case studies from pharma, e-commerce, and sustainability standards.',
        body: '<h1>Consulting Services</h1>' + p('Independent validation of architecture, modernization, cloud migration, and AI enablement decisions.'),
    },
    '/projects': {
        title: 'Case Studies | Prasad Tilloo',
        description:
            'Architecture case studies: e-commerce replatforming at BRITA, the PACT carbon-footprint data exchange standard, Delivery Hero ad serving, insurance performance, and AI products.',
        body:
            '<h1>Case studies</h1>' +
            ul([
                'Modernizing global eCommerce: monolith to headless (BRITA)',
                'Architecting the global Product Carbon Footprint data exchange network (PACT / WBCSD)',
                'Scaling a display ads platform to 5M+ daily transactions (Delivery Hero)',
                'Insurance performance improvement: claims and policy workflows',
                'Photography Coach AI: productionizing a multimodal model',
            ]),
    },
    '/about': {
        title: 'About | Prasad Tilloo',
        description:
            'Enterprise and solution architect with 15+ years across pharma, e-commerce, sustainability standards, and Big 4 consulting. Independent since 2025, near Frankfurt.',
        body:
            '<h1>Prasad Tilloo</h1>' +
            p('Enterprise and solution architect with 15+ years across pharma, e-commerce, sustainability standards, and Big 4 consulting: PwC in Chicago, Boehringer Ingelheim, Delivery Hero, BRITA, and the SINE Foundation. Independent since November 2025, based near Frankfurt.') +
            p('I assess AI systems against the EU AI Act, design how AI fits into existing enterprise landscapes, and build working prototypes by directing AI coding agents. I work in English.'),
    },
    '/contact': {
        title: 'Contact | Prasad Tilloo',
        description: 'Book a 30-minute scoping call about an EU AI Act readiness or AI integration assessment.',
        body: '<h1>Contact</h1>' + p(a(CALENDLY, 'Book a 30-minute scoping call')),
    },
    '/privacy': {
        title: 'Privacy Policy | Prasad Tilloo',
        description: 'How prasadtilloo.com collects, uses, and stores personal data.',
        body: '<h1>Privacy Policy</h1>',
    },
    '/impressum': {
        title: 'Impressum | Prasad Tilloo',
        description: 'Legal notice (Impressum) for prasadtilloo.com.',
        body: '<h1>Impressum</h1>',
    },
    '/resources': {
        title: 'Resources | Prasad Tilloo',
        description: 'Checklists and tools for architecture and vendor decisions.',
        body: '<h1>Resources</h1>',
    },
    '/checklist': {
        title: 'Vendor Proposal Review Checklist | Prasad Tilloo',
        description: 'A vendor-neutral checklist of red-flag patterns across seven assessment categories for reviewing technology vendor proposals.',
        body: '<h1>Vendor Proposal Review Checklist</h1>',
    },
    // Recruiter and utility pages stay reachable but out of search results.
    '/hire': { title: 'Hiring Snapshot | Prasad Tilloo', description: 'Profile summary for recruiters.', noindex: true },
    '/hire-me': { title: 'Hire | Prasad Tilloo', description: 'Profile summary for recruiters.', noindex: true },
    '/consultation': { title: 'Consultation | Prasad Tilloo', description: 'Book a consultation.', noindex: true },
    '/guide': { title: 'Guide | Prasad Tilloo', description: 'Guide.', noindex: true },
    '/competition': { title: 'Competition | Prasad Tilloo', description: 'Competition entry.', noindex: true },
    '/climate-tech': { title: 'Climate Tech | Prasad Tilloo', description: 'Climate tech work.', noindex: true },
    '/architecture-engine': { title: 'Architecture Engine | Prasad Tilloo', description: 'Tool.', noindex: true },
    '/risk-radar': { title: 'Risk Radar | Prasad Tilloo', description: 'Tool.', noindex: true },
    '/tools/project-similarity': { title: 'Project Similarity | Prasad Tilloo', description: 'Tool.', noindex: true },
};

const TOPICS = {
    'enterprise-architecture-healthcare-it': 'Enterprise Architecture in Healthcare IT',
    'fractional-cto-startup-scale': 'Fractional CTO for Startups at Scale',
    'ai-modernization-compliance': 'AI Modernization in Regulated Environments',
};

// Case study slugs from src/data/projects.ts and src/data/caseStudies.ts.
const PROJECT_SLUGS = new Set([
    'photography-coach-ai', 'pact-pcf-data-exchange-network', 'brita-ecommerce', 'delivery-hero-ads',
    'insurance-performance', 'ai-photography-coach', 'devops-maturity-framework',
    'app-rationalization-cloud-readiness', 'mainframe-to-java-migration', 'hipaa-fhir-compliance',
    'boehringer-aiml-platform', 'telecom-future-pricing-platform', 'innova-claims-processing',
    'bofa-account-opening', 'ileap-logistics-emissions', 'pwc-healthcare-modernization',
    'voice-of-customer-360', 'pact-protocol', 'delivery-hero-adtech', 'bi-data-lake', 'pwc-hipaa-cloud',
]);

const titleCase = (slug) => slug.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

/** Resolve a request path to page metadata, or null for an unknown path. */
export function resolveRoute(pathname) {
    const clean = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
    if (ROUTES[clean]) return { path: clean, ...ROUTES[clean] };

    let m = clean.match(/^\/topics\/([a-z0-9-]+)$/);
    if (m && TOPICS[m[1]]) {
        return { path: clean, title: `${TOPICS[m[1]]} | ${SITE_NAME}`, description: `${TOPICS[m[1]]}: what matters most and how to approach it.`, body: `<h1>${esc(TOPICS[m[1]])}</h1>` };
    }
    m = clean.match(/^\/(projects|brief)\/([a-z0-9-]+)$/);
    if (m && PROJECT_SLUGS.has(m[2])) {
        const name = titleCase(m[2]);
        return {
            path: clean,
            title: `${name} | Case Study | ${SITE_NAME}`,
            description: `Case study: ${name}. Context, decision, execution, outcome, and metrics.`,
            body: `<h1>${esc(name)}</h1>`,
            noindex: m[1] === 'brief',
        };
    }
    if (/^\/admin(\/|$)/.test(clean)) return { path: clean, title: SITE_NAME, description: '', noindex: true };
    return null;
}

function headTags(route, status) {
    const url = `${SITE_URL}${route.path === '/' ? '/' : route.path}`;
    const robots = route.noindex || status === 404 ? 'noindex, nofollow' : 'index, follow';
    return [
        `<title>${esc(route.title)}</title>`,
        `<meta data-rh="true" name="description" content="${esc(route.description)}" />`,
        `<meta data-rh="true" name="robots" content="${robots}" />`,
        status === 404 ? '' : `<link data-rh="true" rel="canonical" href="${esc(url)}" />`,
        `<meta data-rh="true" property="og:title" content="${esc(route.title)}" />`,
        `<meta data-rh="true" property="og:description" content="${esc(route.description)}" />`,
        `<meta data-rh="true" property="og:type" content="website" />`,
        `<meta data-rh="true" property="og:url" content="${esc(url)}" />`,
        `<meta data-rh="true" property="og:image" content="${DEFAULT_OG}" />`,
        `<meta data-rh="true" property="og:site_name" content="${SITE_NAME}" />`,
        `<meta data-rh="true" name="twitter:card" content="summary_large_image" />`,
        `<meta data-rh="true" name="twitter:title" content="${esc(route.title)}" />`,
        `<meta data-rh="true" name="twitter:description" content="${esc(route.description)}" />`,
    ].filter(Boolean).join('\n    ');
}

const NOT_FOUND = {
    path: '/404',
    title: `Page not found | ${SITE_NAME}`,
    description: 'This page does not exist.',
    body: '<h1>Page not found</h1>' + p('This page does not exist.') + p(a('/', 'Go to the homepage')),
};

/** Render index.html for a path. Returns { status, html }. */
export function renderPage(template, pathname) {
    const route = resolveRoute(pathname);
    const status = route ? 200 : 404;
    const page = route || NOT_FOUND;
    const body = `<div id="root"><div class="ssr-fallback" style="max-width:720px;margin:0 auto;padding:96px 20px;font-family:system-ui,sans-serif;line-height:1.6">${NAV}<main>${page.body || `<h1>${esc(page.title.split(' | ')[0])}</h1>`}</main>${FOOTER}</div></div>`;
    const html = template
        .replace(/<title>[\s\S]*?<\/title>/, headTags(page, status))
        .replace(/<meta name="description"[^>]*>/, '')
        .replace('<div id="root"></div>', body);
    return { status, html };
}

/** Load the built index.html once. */
export function loadTemplate(file) {
    return fs.readFileSync(file, 'utf8');
}
