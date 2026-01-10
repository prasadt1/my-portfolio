import React from 'react';
import { Link } from 'react-router-dom';
import {
  Mail, MapPin, Linkedin, Github, Award, Briefcase,
  GraduationCap, Languages, Target, Heart, Zap, BookOpen,
  ChevronRight, Building2, Globe, CheckCircle2
} from 'lucide-react';
import { motion } from 'framer-motion';
import profilepic from '../assets/images/profilepic.png';
import TechChips from '../components/TechChips';
import Recommendations from '../components/Recommendations';
import SEO from '../components/SEO';
import QuickStats from '../components/QuickStats';

const AboutPage: React.FC = () => {
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
      role: 'Solution Architect (DTC e-Commerce)',
      period: 'May 2025 – Nov 2025',
      location: 'Frankfurt, Germany',
      achievements: [
        'Led Shopware-to-Shopify Plus discovery across 6 EMEA markets',
        'Designed headless reference architecture with Vue.js/Nuxt.js and Azure',
        'Prototyped AI-driven search optimization for Google AI results'
      ]
    },
    {
      company: 'SINE Foundation e.V.',
      role: 'Senior Technical Project Manager / Lead Architect',
      period: 'Oct 2022 – Jun 2024',
      location: 'Berlin, Germany',
      achievements: [
        'Boosted adoption by 25% with PACT Online Catalog cloud marketplace',
        'Defined global Tech Specification for Product Carbon Footprint with Microsoft, SAP, Siemens',
        'Led WBCSD PACT Standard with 20+ Fortune 100 firms'
      ]
    },
    {
      company: 'Delivery Hero SE',
      role: 'Senior Engineering Manager (Freelance)',
      period: 'Mar 2022 – Sept 2022',
      location: 'Berlin, Germany',
      achievements: [
        'Increased revenue by 20% across EMEA region with Display Ads product',
        'Scaled to 5M+ daily transactions with 99.99% SLA compliance',
        'Led 10-member cross-functional team (iOS, Android, Golang)'
      ]
    },
    {
      company: 'Boehringer Ingelheim',
      role: 'Lead Architect',
      period: 'Nov 2020 - Feb 2022',
      location: 'Ingelheim, Germany',
      achievements: [
        'Accelerated AI/ML insights by 50% with Enterprise Data Lake',
        'Improved efficiency by 30% through digital transformation roadmap',
        'Led €500K cloud migration with GDPR/PCI compliance'
      ]
    },
    {
      company: 'PricewaterhouseCoopers (PwC)',
      role: 'Senior Manager',
      period: 'Mar 2015 – Oct 2020',
      location: 'Chicago, USA',
      achievements: [
        'Led a $650K cloud modernization program for e-commerce and healthcare systems.',
        'Designed pharmacy module boosting mobile app traffic by 70%.',
        'Co-developed cloud-based Enterprise Data Lake and domain-driven microservices.'
      ]
    },
    {
      company: 'Innova Solutions',
      role: 'Tech Lead / Engineering Manager',
      period: 'Jun 2009 - Feb 2015',
      location: 'New York, USA',
      achievements: [
        'Improved insurance client website performance by 80% via scalable data pipeline.',
        'Pioneered asynchronous account data ingestion system using Docker and Jenkins.'
      ]
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
        title="About Prasad Tilloo"
        description="Senior Engineering Leader & Enterprise Architect with 15+ years delivering transformational outcomes for PwC, Boehringer Ingelheim, and Fortune 100 clients."
        keywords="enterprise architect, engineering leader, cloud modernization, AI/ML infrastructure, resume, CV"
        type="profile"
      />

      <div className="min-h-screen bg-slate-50 dark:bg-slate-900">

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
                  Prasad Tilloo
                </h1>
                <p className="text-xl md:text-2xl text-emerald-400 font-semibold mb-4">
                  Senior Engineering Leader & Enterprise Architect
                </p>
                <p className="text-lg text-slate-300 max-w-2xl leading-relaxed mb-8">
                  15+ years delivering transformational outcomes across Cloud Modernization,
                  Legacy System Migration, and AI/ML Infrastructure for Fortune 100 clients.
                </p>

                <div className="flex flex-wrap justify-center md:justify-start gap-4">
                  <a
                    href="mailto:prasad.sgsits@gmail.com"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold transition-all shadow-lg hover:shadow-emerald-900/20"
                  >
                    <Mail size={18} />
                    Contact Me
                  </a>
                  <a
                    href="https://linkedin.com/in/prasadtilloo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white rounded-lg font-semibold transition-all"
                  >
                    <Linkedin size={18} />
                    LinkedIn
                  </a>
                  <a
                    href="https://github.com/prasadtilloo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white rounded-lg font-semibold transition-all"
                  >
                    <Github size={18} />
                    GitHub
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
                { value: '15+', label: 'Years Experience' },
                { value: '€2M+', label: 'Project Value' },
                { value: '8', label: 'Industries' },
                { value: '100%', label: 'Delivery Rate' }
              ].map((stat, idx) => (
                <div key={idx} className="py-8 text-center">
                  <div className="text-3xl font-bold text-emerald-400 font-serif mb-1">{stat.value}</div>
                  <div className="text-xs uppercase tracking-wider text-slate-500 font-semibold">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12">

            {/* LEFT COLUMN: Main Content */}
            <div className="space-y-16">

              {/* Professional Summary */}
              <section>
                <h2 className="text-3xl font-serif font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3">
                  <span className="w-8 h-1 bg-emerald-500 rounded-full"></span>
                  The Architect's Proof
                </h2>
                <div className="prose prose-lg text-slate-600 dark:text-slate-300 max-w-none leading-relaxed">
                  <p className="mb-6">
                    I don't just design systems; I <strong>ensure their survival and scale</strong> in the real world. As a results-driven Senior Architect, I bridge the gap between high-level strategy and low-level code.
                  </p>
                  <p className="mb-6">
                    My career has been defined by complex transformations—from migrating 7.8M lines of legacy code to the cloud for <strong>PwC</strong> to architecting the global Product Carbon Footprint standard for <strong>WBCSD</strong>. I thrive in high-stakes environments where reliability, compliance (HIPAA, GDPR), and performance are non-negotiable.
                  </p>
                  <div className="bg-emerald-50 dark:bg-emerald-900/10 border-l-4 border-emerald-500 p-6 italic text-slate-700 dark:text-slate-300 rounded-r-lg">
                    "Prasad combines deep technical expertise with a rare ability to explain complex architectures to C-level stakeholders. He is a true enabler of digital transformation."
                  </div>
                </div>
              </section>

              {/* Consulting Highlights - PwC Focus */}
              <section className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-8 border border-slate-200 dark:border-slate-700">
                <h2 className="text-2xl font-serif font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                  <Building2 className="text-emerald-600 dark:text-emerald-500" size={24} />
                  Tier-1 Consulting Pedigree
                </h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2">PricewaterhouseCoopers (PwC) Management Consultant</h3>
                    <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                      Spent 5+ years leading high-stakes digital transformation initiatives. Specialized in bridging the gap between C-suite strategy and engineering execution.
                    </p>
                    <ul className="grid sm:grid-cols-2 gap-4 text-sm text-slate-700 dark:text-slate-300">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 size={16} className="text-emerald-500 mt-0.5 shrink-0" />
                        <span>Led <strong>$50M+</strong> Pharma RFPs (Lonza, Novartis)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 size={16} className="text-emerald-500 mt-0.5 shrink-0" />
                        <span>Industry 4.0 Strategy Implementation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 size={16} className="text-emerald-500 mt-0.5 shrink-0" />
                        <span>Cloud Center of Excellence (CCoE) Setup</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 size={16} className="text-emerald-500 mt-0.5 shrink-0" />
                        <span>Regulatory Compliance (GxP/HIPAA) Expert</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Experience Timeline */}
              <section>
                <h2 className="text-3xl font-serif font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3">
                  <Briefcase className="text-emerald-600 dark:text-emerald-500" size={28} />
                  Career Journey
                </h2>

                <div className="relative border-l-2 border-slate-200 dark:border-slate-800 ml-3 space-y-12 pb-4">
                  {experiences.map((exp, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      className="relative pl-8 md:pl-12"
                    >
                      <div className="absolute -left-[9px] top-6 w-4 h-4 rounded-full bg-slate-50 dark:bg-slate-900 border-4 border-emerald-500 shadow-sm" />

                      <div className="group bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-emerald-500 dark:hover:border-emerald-500 shadow-sm hover:shadow-xl transition-all duration-300">
                        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors">{exp.company}</h3>
                            <div className="text-lg text-emerald-700 dark:text-emerald-400 font-medium">{exp.role}</div>
                          </div>
                          <span className="text-sm font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-700 px-3 py-1 rounded-full mt-2 sm:mt-0 inline-block">{exp.period}</span>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-6">
                          <MapPin size={14} />
                          {exp.location}
                        </div>

                        <ul className="space-y-3">
                          {exp.achievements.map((item, i) => (
                            <li key={i} className="flex items-start gap-3 text-slate-600 dark:text-slate-300">
                              <ChevronRight size={18} className="text-emerald-500 mt-0.5 shrink-0" />
                              <span className="leading-relaxed">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>

              {/* Certifications Grid */}
              <section>
                <h2 className="text-3xl font-serif font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3">
                  <Award className="text-emerald-600 dark:text-emerald-500" size={28} />
                  Certifications
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                  {certifications.map((cert, idx) => (
                    <div key={idx} className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 flex items-start gap-4 hover:border-emerald-500 transition-colors shadow-sm">
                      <div className="bg-emerald-100 dark:bg-emerald-900/30 p-3 rounded-lg text-emerald-600 dark:text-emerald-400">
                        <Award size={24} />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 dark:text-white text-lg leading-tight mb-1">{cert.title}</h4>
                        <div className="text-slate-500 dark:text-slate-400 text-sm mb-2">{cert.issuer}</div>
                        <div className="text-xs font-mono text-slate-400 bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded inline-block">
                          {cert.date}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

            </div>

            {/* RIGHT COLUMN: Sidebar (Sticky) */}
            <aside className="lg:sticky lg:top-24 lg:h-fit space-y-8">

              {/* Quick Stats Widget */}
              <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
                <QuickStats />
              </div>

              {/* Tech Stack Widget */}
              <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
                <h3 className="font-serif font-bold text-xl text-slate-900 dark:text-white mb-6 pb-2 border-b border-slate-100 dark:border-slate-700 flex items-center gap-2">
                  <Zap className="text-emerald-500" size={20} />
                  Tech Stack
                </h3>
                <TechChips categories={techCategories} />
              </div>

              {/* Products CTA Widget */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-6 rounded-2xl shadow-xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Building2 size={120} />
                </div>
                <div className="relative z-10">
                  <h3 className="font-bold text-lg mb-3 text-emerald-400 uppercase tracking-wider text-xs">For Teams</h3>
                  <h4 className="font-bold text-xl mb-4">Need proven frameworks?</h4>
                  <p className="text-slate-300 text-sm mb-6 leading-relaxed">
                    Don't reinvent the wheel. Accelerate your roadmap with my battle-tested toolkits.
                  </p>
                  <Link
                    to="/products"
                    className="block w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-center rounded-lg font-bold transition-colors"
                  >
                    Browse Toolkits
                  </Link>
                </div>
              </div>

              {/* Education Widget */}
              <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
                <h3 className="font-serif font-bold text-xl text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                  <GraduationCap className="text-purple-500" size={20} />
                  Education
                </h3>
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">Bachelor of Engineering (B.E.)</div>
                  <div className="text-purple-600 dark:text-purple-400 font-medium text-sm">Computer Science</div>
                  <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">S.G.S.I.T.S, India</div>
                </div>
              </div>
            </aside>
          </div>
        </div>

        {/* Global CTA */}
        <div className="bg-slate-100 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-800 py-20">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6 text-slate-900 dark:text-white">
              Ready to modernize your enterprise?
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto">
              Whether you need a hands-on architect for a migration or a strategic leader for your engineering team, let's talk.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/contact"
                className="px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-emerald-900/20 hover:-translate-y-1"
              >
                Schedule Consultation
              </Link>
              <Link
                to="/projects"
                className="px-8 py-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-white rounded-xl font-bold transition-all hover:bg-slate-50 dark:hover:bg-slate-700"
              >
                View Architecture Work
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPage;