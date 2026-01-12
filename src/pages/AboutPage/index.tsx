import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SEO from '../../components/SEO';
import { Section } from '../../components/layout';
import { AboutHero } from './AboutHero';
import { LeadershipPhilosophy } from './LeadershipPhilosophy';
import { AboutContent } from './AboutContent';

const AboutPage: React.FC = () => {
  const { t } = useTranslation();

  const techCategories: Record<string, string[]> = {
    'Languages': ['C#', 'Java', 'JavaScript', 'HTML5', 'Python', 'TypeScript'],
    'Frontend': ['React', 'Redux', 'Vue.js', 'Next JS', 'Nuxt JS', 'Angular', 'Bootstrap', 'Vite'],
    'Backend': ['NodeJS', 'Express.js', 'Django', 'FastAPI', 'Spring', '.NET'],
    'Cloud': ['AWS', 'Azure', 'Google Cloud', 'Cloudflare', 'Heroku', 'Netlify', 'Vercel'],
    'Data & ML': ['PyTorch', 'NumPy', 'Matplotlib', 'Spark', 'Hadoop', 'Kafka', 'RAG', 'LangChain'],
    'Databases': ['MongoDB', 'MySQL', 'Neo4J', 'Redis', 'DynamoDB', 'Cassandra', 'SQLite'],
    'DevOps': ['Kubernetes', 'Docker', 'Jenkins', 'CircleCI', 'GitHub Actions', 'Terraform'],
    'Tools': ['Figma', 'Adobe Photoshop', 'Lightroom', 'Canva', 'Postman']
  };

  const experiences = [
    {
      company: 'BRITA',
      role: t('about.journey.items.brita.role'),
      period: 'May 2025 - Nov 2025',
      location: 'Frankfurt, Germany',
      businessChallenge: t('about.journey.items.brita.challenge'),
      deliverables: t('about.journey.items.brita.deliverables', { returnObjects: true }) as string[],
      outcomes: [
        { value: '6 Markets', label: t('about.journey.items.brita.outcomes.markets') },
        { value: 'Zero', label: t('about.journey.items.brita.outcomes.downtime') },
        { value: 'Global', label: t('about.journey.items.brita.outcomes.expansion') },
      ],
      links: {
        caseStudy: '/projects/brita-ecommerce',
      },
      logo: '/assets/logos/Brita_(Unternehmen)_logo.svg'
    },
    {
      company: 'SINE Foundation',
      role: t('about.journey.items.sine.role'),
      period: 'Jan 2024 - Apr 2024',
      location: 'Berlin, Germany',
      businessChallenge: t('about.journey.items.sine.challenge'),
      deliverables: t('about.journey.items.sine.deliverables', { returnObjects: true }) as string[],
      outcomes: [
        { value: '20+', label: t('about.journey.items.sine.outcomes.adopted') },
        { value: 'WBCSD', label: t('about.journey.items.sine.outcomes.standard') },
        { value: '10x', label: t('about.journey.items.sine.outcomes.boost') },
      ],
      links: {
        caseStudy: '/projects/pact-protocol',
      },
      logo: '/assets/logos/sine-foundation-logo.svg'
    },
    {
      company: 'Delivery Hero',
      role: t('about.journey.items.deliveryHero.role'),
      period: 'Jun 2022 - Dec 2023',
      location: 'Berlin, Germany',
      businessChallenge: t('about.journey.items.deliveryHero.challenge'),
      deliverables: t('about.journey.items.deliveryHero.deliverables', { returnObjects: true }) as string[],
      outcomes: [
        { value: '+20%', label: t('about.journey.items.deliveryHero.outcomes.revenue') },
        { value: '5M+', label: t('about.journey.items.deliveryHero.outcomes.transactions') },
        { value: '<20ms', label: t('about.journey.items.deliveryHero.outcomes.latency') },
      ],
      links: {},
      logo: '/assets/logos/Delivery_Hero_logo.svg'
    },
    {
      company: 'Boehringer Ingelheim',
      role: t('about.journey.items.boehringer.role'),
      period: 'Mar 2021 - May 2022',
      location: 'Ingelheim, Germany',
      businessChallenge: t('about.journey.items.boehringer.challenge'),
      deliverables: t('about.journey.items.boehringer.deliverables', { returnObjects: true }) as string[],
      outcomes: [
        { value: '50%', label: t('about.journey.items.boehringer.outcomes.insights') },
        { value: '100%', label: t('about.journey.items.boehringer.outcomes.migration') },
        { value: 'Zero', label: t('about.journey.items.boehringer.outcomes.gdpr') },
      ],
      links: {},
      logo: '/assets/logos/Boehringer_Ingelheim_Logo.svg'
    },
    {
      company: 'PwC',
      role: t('about.journey.items.pwc.role'),
      period: 'May 2016 - Feb 2021',
      location: 'Mumbai, India',
      businessChallenge: t('about.journey.items.pwc.challenge'),
      deliverables: t('about.journey.items.pwc.deliverables', { returnObjects: true }) as string[],
      outcomes: [
        { value: '$650K', label: t('about.journey.items.pwc.outcomes.savings') },
        { value: '+70%', label: t('about.journey.items.pwc.outcomes.traffic') },
        { value: 'Zero', label: t('about.journey.items.pwc.outcomes.audit') },
      ],
      links: {},
      logo: '/assets/logos/PricewaterhouseCoopers_Logo.svg'
    }
  ];

  const certifications = [
    { title: 'AI Agents Intensive', issuer: 'Google / Kaggle', date: 'Dec 2025' },
    { title: 'AI Engineering Cohort', issuer: 'ByteByteGo / ByteByteAI', date: 'Nov 2025', id: '14244ccc' },
    { title: 'Deutsch-Test für Zuwanderer (B1)', issuer: 'GAST e.V.', date: 'May 2025', id: 'G1098095' },
    { title: 'Artificial Intelligence Foundations', issuer: 'LinkedIn', date: 'Nov 2020' },
    { title: 'Certified SAFe® 4 DevOps Practitioner', issuer: 'Scaled Agile, Inc.', date: 'Aug 2019' },
    { title: 'Digital Accelerator', issuer: 'PwC', date: 'Aug 2019' },
    { title: 'Axelta Certified IoT Professional', issuer: 'Divigo.io', date: 'Mar 2016' },
  ];

  return (
    <>
      <SEO
        title={`${t('about.title')} | ${t('about.role')}`}
        description={t('about.description')}
        keywords="servant leadership, empathetic leader, innovation, creative problem solving, business outcomes, enterprise architect"
        type="profile"
      />

      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 overflow-x-hidden">
        <AboutHero />

        {/* METRICS STRIP */}
        <div className="bg-slate-900 border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-slate-800">
              {[
                { value: '15+', label: t('about.stats.exp') },
                { value: '€2M+', label: t('about.stats.value') },
                { value: '8', label: t('about.stats.industries') },
                { value: '100%', label: t('about.stats.delivery') }
              ].map((stat, idx) => (
                <div key={idx} className="py-8 text-center">
                  <div className="text-3xl font-bold text-emerald-400 font-serif mb-1">{stat.value}</div>
                  <div className="text-xs uppercase tracking-wider text-slate-500 font-semibold">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <LeadershipPhilosophy />

        <Section background="default">
          <AboutContent 
            experiences={experiences}
            certifications={certifications}
            techCategories={techCategories}
          />
        </Section>

        {/* Global CTA */}
        <div className="bg-slate-100 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-800 py-20">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6 text-slate-900 dark:text-white">
              {t('about.cta.title')}
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto">
              {t('about.cta.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/contact"
                className="px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-emerald-900/20 hover:-translate-y-1"
              >
                {t('about.cta.schedule')}
              </Link>
              <Link
                to="/projects"
                className="px-8 py-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-white rounded-xl font-bold transition-all hover:bg-slate-50 dark:hover:bg-slate-700"
              >
                {t('about.cta.viewWork')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
