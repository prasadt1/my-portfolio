import React from 'react';
import { Link } from 'react-router-dom';
import {
  Mail, Linkedin, Github, Award,
  GraduationCap, Target, Users, Lightbulb, Zap, Building2, CheckCircle2
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import profilepic from '../assets/images/profilepic.png';
import TechChips from '../components/TechChips';
import SEO from '../components/SEO';
import QuickStats from '../components/QuickStats';
import RecommendationsCarousel from '../components/RecommendationsCarousel';
import AboutSection from '../components/about/AboutSection';
import ExperienceTimeline from '../components/about/ExperienceTimeline';

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

  // Note: For a real app, these would also be in translation files or fetched from a CMS
  // For now, we'll extract the headers/labels to i18n
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
        product: '/products/ecommerce-blueprint'
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
        product: '/products/pact-starter-kit'
      },
      logo: '/assets/logos/sine-foundation-logo.svg' // Placeholder - replace with real logo if available
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
      links: {
        product: '/products/display-ads-architecture'
      },
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
      links: {
        product: '/products/data-lake-architecture'
      },
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
      links: {
        product: '/products/hipaa-compliance-package'
      },
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

        {/* HERO SECTION - Matching HomePage Aesthetic */}
        <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 text-white py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '40px 40px'
            }} />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative flex-shrink-0"
              >
                <div className="w-48 h-48 md:w-64 md:h-64 rounded-full p-2 bg-gradient-to-tr from-emerald-500 to-slate-800 shadow-2xl">
                  <div className="w-full h-full rounded-full overflow-hidden bg-slate-900 border-4 border-white dark:border-slate-800">
                    <img
                      src={profilepic}
                      alt="Prasad Tilloo"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                {/* Status Badge */}
                <div className="absolute bottom-4 right-4 bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg border border-white/20">
                  OPEN TO WORK
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-center md:text-left"
              >
                <h1 className="text-4xl md:text-6xl font-bold mb-4 font-serif">
                  {t('about.title')}
                </h1>
                <p className="text-xl md:text-2xl text-emerald-400 font-semibold mb-4">
                  {t('about.role')}
                </p>
                <p className="text-lg text-slate-300 max-w-2xl leading-relaxed mb-8">
                  {t('about.description')}
                </p>

                <div className="flex flex-wrap justify-center md:justify-start gap-4">
                  <a
                    href="mailto:prasad.sgsits@gmail.com"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold transition-all shadow-lg hover:shadow-emerald-900/20"
                  >
                    <Mail size={18} />
                    {t('about.buttons.contact')}
                  </a>
                  <a
                    href="https://linkedin.com/in/prasadtilloo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white rounded-lg font-semibold transition-all"
                  >
                    <Linkedin size={18} />
                    {t('about.buttons.linkedin')}
                  </a>
                  <a
                    href="https://github.com/prasadt1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white rounded-lg font-semibold transition-all"
                  >
                    <Github size={18} />
                    {t('about.buttons.github')}
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

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

        {/* Leadership Philosophy - Compact Grid */}
        <AboutSection background="muted">
            <h2 className="text-3xl font-serif font-bold text-center mb-8 md:mb-10 text-slate-900 dark:text-white">
              {t('about.philosophy.title')}
            </h2>

            <div className="grid md:grid-cols-2 gap-4 mb-8">
              <div className="bg-white dark:bg-slate-800 rounded-lg p-5 border border-slate-200 dark:border-slate-700">
                <div className="flex items-start gap-3">
                  <div className="bg-emerald-100 dark:bg-emerald-900/30 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Target className="text-emerald-600" size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                      {t('about.philosophy.outcomes.title')}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {t('about.philosophy.outcomes.desc')}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-lg p-5 border border-slate-200 dark:border-slate-700">
                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 dark:bg-blue-900/30 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Lightbulb className="text-blue-600" size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                      {t('about.philosophy.innovation.title')}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {t('about.philosophy.innovation.desc')}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-lg p-5 border border-slate-200 dark:border-slate-700">
                <div className="flex items-start gap-3">
                  <div className="bg-violet-100 dark:bg-violet-900/30 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Users className="text-violet-600" size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                      {t('about.philosophy.leadership.title')}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {t('about.philosophy.leadership.desc')}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-lg p-5 border border-slate-200 dark:border-slate-700">
                <div className="flex items-start gap-3">
                  <div className="bg-orange-100 dark:bg-orange-900/30 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Zap className="text-orange-600" size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                      {t('about.philosophy.execution.title')}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {t('about.philosophy.execution.desc')}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <blockquote className="text-lg font-serif italic text-slate-700 dark:text-slate-300 max-w-prose mx-auto">
                "{t('about.philosophy.quote')}"
              </blockquote>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                {t('about.philosophy.attribution')}
              </p>
            </div>
        </AboutSection>

        <AboutSection background="default">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 md:gap-10">

            {/* LEFT COLUMN: Main Content */}
            <div className="space-y-10 md:space-y-12 min-w-0">

              {/* Professional Summary */}
              <section>
                <h2 className="text-3xl font-serif font-bold text-slate-900 dark:text-white mb-6 md:mb-8 flex items-center gap-3">
                  <span className="w-8 h-1 bg-emerald-500 rounded-full"></span>
                  {t('about.proof.title')}
                </h2>
                <div className="prose prose-lg text-slate-600 dark:text-slate-300 max-w-prose leading-relaxed">
                  <p className="mb-6">
                    {t('about.proof.p1')}
                  </p>
                  <p className="mb-6">
                    {t('about.proof.p2')}
                  </p>
                  <div className="bg-emerald-50 dark:bg-emerald-900/10 border-l-4 border-emerald-500 p-6 italic text-slate-700 dark:text-slate-300 rounded-r-lg">
                    "{t('about.proof.quote')}"
                  </div>
                </div>
              </section>

              {/* Consulting Highlights - PwC Focus */}
              <section className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6 md:p-8 border border-slate-200 dark:border-slate-700">
                <h2 className="text-2xl font-serif font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                  <Building2 className="text-emerald-600 dark:text-emerald-500" size={24} />
                  {t('about.consulting.title')}
                </h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2">{t('about.consulting.role')}</h3>
                    <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed max-w-prose">
                      {t('about.consulting.desc')}
                    </p>
                    <ul className="grid sm:grid-cols-2 gap-4 text-sm text-slate-700 dark:text-slate-300">
                      {(t('about.consulting.highlights', { returnObjects: true }) as string[]).map((highlight, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle2 size={16} className="text-emerald-500 mt-0.5 shrink-0" />
                          <span className="leading-relaxed">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>

              {/* Experience Timeline */}
              <ExperienceTimeline
                experiences={experiences}
                title={t('about.journey.title')}
                challengeLabel={t('about.journey.challenge')}
                deliveredLabel={t('about.journey.delivered')}
                viewCaseStudyLabel={t('about.journey.viewCaseStudy')}
                buyBlueprintLabel={t('about.journey.buyBlueprint')}
              />

              {/* Recommendations Carousel */}
              <section>
                <h2 className="text-3xl font-serif font-bold text-slate-900 dark:text-white mb-6 md:mb-8 flex items-center gap-3">
                  <Users className="text-emerald-600 dark:text-emerald-500" size={28} />
                  Recommendations
                </h2>
                <RecommendationsCarousel />
              </section>

              {/* Certifications - Compact List */}
              <section>
                <h2 className="text-3xl font-serif font-bold text-slate-900 dark:text-white mb-6 md:mb-8 flex items-center gap-3">
                  <Award className="text-emerald-600 dark:text-emerald-500" size={28} />
                  {t('about.certifications.title')}
                </h2>

                <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 divide-y divide-slate-200 dark:divide-slate-700 overflow-hidden">
                  {certifications.map((cert, idx) => (
                    <div key={idx} className="p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3 flex-1">
                          <div className="bg-emerald-100 dark:bg-emerald-900/30 p-2 rounded-lg text-emerald-600 dark:text-emerald-400 flex-shrink-0">
                            <Award size={18} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-slate-900 dark:text-white mb-1">{cert.title}</h4>
                            <div className="text-sm text-slate-500 dark:text-slate-400">{cert.issuer}</div>
                          </div>
                        </div>
                        <div className="text-xs font-mono text-slate-400 dark:text-slate-500 flex-shrink-0">
                          {cert.date}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

            </div>

            {/* RIGHT COLUMN: Sidebar (Sticky) */}
            <aside className="lg:sticky lg:top-24 lg:h-fit space-y-8 min-w-0 w-full lg:w-auto">

              {/* Quick Stats Widget */}
              <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
                <QuickStats />
              </div>

              {/* Tech Stack Widget */}
              <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
                <h3 className="font-serif font-bold text-xl text-slate-900 dark:text-white mb-6 pb-2 border-b border-slate-100 dark:border-slate-700 flex items-center gap-2">
                  <Zap className="text-emerald-500" size={20} />
                  {t('about.techStack.title')}
                </h3>
                <TechChips categories={techCategories} />
              </div>

              {/* FOR TEAMS / RECRUITERS TEASER */}
              <section className="py-20 px-4 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
                <div className="w-full max-w-full">
                  <div className="bg-slate-900 dark:bg-slate-800 rounded-3xl p-12 relative overflow-hidden text-center">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>

                    <div className="relative z-10">
                      <div className="inline-block px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
                        {t('about.forTeams.badge')}
                      </div>
                      <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                        {t('about.forTeams.title')}
                      </h2>
                      <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
                        {t('about.forTeams.desc')}
                      </p>
                      <a
                        href="/products"
                        className="inline-flex bg-white text-slate-900 hover:bg-slate-100 px-8 py-4 rounded-full font-bold text-lg transition-transform hover:scale-105"
                      >
                        {t('about.forTeams.cta')}
                      </a>
                    </div>
                  </div>
                </div>
              </section>
              {/* Education Widget */}
              <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
                <h3 className="font-serif font-bold text-xl text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                  <GraduationCap className="text-purple-500" size={20} />
                  {t('about.education.title')}
                </h3>
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">{t('about.education.degree')}</div>
                  <div className="text-purple-600 dark:text-purple-400 font-medium text-sm">{t('about.education.major')}</div>
                  <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">{t('about.education.school')}</div>
                </div>
              </div>
            </aside>
          </div>
        </AboutSection>

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