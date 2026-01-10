import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  CheckCircle2,
  Shield,
  TrendingDown,
  Clock,
  ArrowRight,
  Award,
  DollarSign,
  AlertCircle
} from 'lucide-react';
import SEO from '../components/SEO';
import ROICalculator from '../components/ROICalculator';

const HomePage: React.FC = () => {
  const [showROICalculator, setShowROICalculator] = useState(false);

  return (
    <>
      <SEO
        title="HIPAA-Compliant Cloud Migration Specialist"
        description="I've successfully migrated 12 healthcare systems to AWS without a single HIPAA violation, data breach, or downtime incident. €2M+ in cost savings delivered."
        keywords="HIPAA cloud migration, healthcare AWS, FHIR compliance, patient data security, healthcare cloud architect, GDPR healthcare, medical records migration"
        type="website"
      />

      <div className="min-h-screen">
        {/* HERO SECTION */}
        <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 text-white py-20 md:py-32 overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '40px 40px'
            }} />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              {/* Main Headline */}
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                Stuck in <span className="text-red-400">HIPAA Compliance Hell</span>
                <br />
                During Cloud Migration?
              </h1>

              {/* Subheadline */}
              <p className="text-xl md:text-2xl text-slate-200 mb-8 max-w-4xl mx-auto leading-relaxed">
                I've successfully migrated <strong className="text-emerald-400">12 healthcare systems</strong> to AWS
                without a single <strong>HIPAA violation</strong>, <strong>data breach</strong>, or <strong>downtime incident</strong>.
              </p>

              {/* Social Proof - Client Logos */}
              <div className="mb-10">
                <p className="text-sm uppercase tracking-wider text-slate-400 mb-4">
                  Trusted by Fortune 500 Healthcare & Pharma
                </p>
                <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
                  {['PwC', 'Boehringer Ingelheim', 'Delivery Hero', 'BRITA'].map((client) => (
                    <div
                      key={client}
                      className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-lg border border-white/20"
                    >
                      <span className="text-lg font-semibold text-white">{client}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Primary CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                <Link
                  to="/projects#healthcare"
                  className="group bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center gap-3 shadow-xl hover:shadow-2xl hover:scale-105"
                >
                  See How I Did It
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                </Link>

                <button
                  onClick={() => setShowROICalculator(true)}
                  className="group bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border-2 border-white/30 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center gap-3"
                >
                  <DollarSign size={20} />
                  Calculate Your Savings
                </button>
              </div>

              {/* Trust Metrics Bar */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                {[
                  { value: '12', label: 'Healthcare Migrations', icon: Shield },
                  { value: '100%', label: 'HIPAA Compliant', icon: CheckCircle2 },
                  { value: '€2M+', label: 'Cost Savings', icon: TrendingDown },
                  { value: 'Zero', label: 'Breaches', icon: Award }
                ].map((stat, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + idx * 0.1 }}
                    className="text-center"
                  >
                    <stat.icon className="w-8 h-8 mx-auto mb-2 text-emerald-400" />
                    <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-sm text-slate-300">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* PROBLEM SECTION - The Pain */}
        <section className="py-20 bg-slate-50 dark:bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white">
                Sound Familiar?
              </h2>
              <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
                These are the top 3 challenges healthcare organizations face during cloud migration.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  emoji: '😰',
                  title: 'We Keep Failing HIPAA Audits',
                  problem: 'Your on-premise system can\'t meet modern compliance requirements.',
                  impact: 'Every audit is a gamble that could cost you €50K+ in findings.',
                  color: 'from-red-500 to-orange-500'
                },
                {
                  emoji: '💸',
                  title: 'Cloud Migration Seems Too Risky',
                  problem: 'You\'ve tried twice. Both times stopped due to data breach concerns.',
                  impact: 'Your board won\'t approve another failed attempt.',
                  color: 'from-orange-500 to-yellow-500'
                },
                {
                  emoji: '⏰',
                  title: 'We\'re Running Out of Time',
                  problem: 'New HIPAA requirements in 6 months. Legacy vendor EOL in 12 months.',
                  impact: 'If you don\'t migrate soon, you\'ll face penalties AND downtime.',
                  color: 'from-yellow-500 to-red-500'
                }
              ].map((pain, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-slate-200 dark:border-slate-700"
                >
                  <div className="text-6xl mb-4">{pain.emoji}</div>
                  <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">
                    {pain.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                    {pain.problem}
                  </p>
                  <div className={`bg-gradient-to-r ${pain.color} p-4 rounded-lg`}>
                    <p className="text-white font-semibold">
                      {pain.impact}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mt-12"
            >
              <p className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                I've heard this 100 times. Here's how we solve it.
              </p>
              <ArrowRight className="mx-auto animate-bounce text-emerald-600" size={48} />
            </motion.div>
          </div>
        </section>

        {/* SOLUTION SECTION - The Process */}
        <section className="py-20 bg-white dark:bg-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white">
                The Zero-Downtime, 100% Compliant Migration Process
              </h2>
              <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
                A proven 4-phase approach that's worked 12 times without a single incident
              </p>
            </motion.div>

            <div className="space-y-8">
              {[
                {
                  phase: 'PHASE 1',
                  title: 'Compliance Audit',
                  duration: '2 weeks',
                  activities: [
                    'Review all HIPAA/FHIR controls against current system',
                    'Identify gaps and migration blockers',
                    'Create compliant AWS architecture blueprint',
                    'Define security controls (IAM, encryption, logging)'
                  ],
                  deliverable: '20-page compliance report (Board-ready)',
                  outcome: 'Clear roadmap with zero compliance risk',
                  color: 'emerald'
                },
                {
                  phase: 'PHASE 2',
                  title: 'AWS Architecture Design',
                  duration: '2 weeks',
                  activities: [
                    'Design production infrastructure on AWS',
                    'Configure security controls and monitoring',
                    'Plan data migration strategy (minimize risk)',
                    'Create rollback procedures for every step'
                  ],
                  deliverable: 'Technical migration plan + disaster recovery',
                  outcome: 'Board approval secured, risks mitigated',
                  color: 'blue'
                },
                {
                  phase: 'PHASE 3',
                  title: 'Migration Execution',
                  duration: '8-12 weeks',
                  activities: [
                    'Week 1-4: Migrate non-critical systems (test process)',
                    'Week 5-8: Core systems (validated & monitored)',
                    'Week 9-12: Patient data (weekends only, 24/7 watch)',
                    'Continuous validation at every step'
                  ],
                  deliverable: 'Fully migrated, operational system',
                  outcome: 'Zero downtime, all systems running on AWS',
                  color: 'violet'
                },
                {
                  phase: 'PHASE 4',
                  title: 'Optimization & Validation',
                  duration: '4 weeks',
                  activities: [
                    'Cost optimization (target 30% savings)',
                    'Performance tuning (3x faster queries)',
                    'Complete compliance documentation',
                    'Train your team on AWS operations'
                  ],
                  deliverable: 'Optimized, documented, compliant system',
                  outcome: '30% cost reduction + audit-ready documentation',
                  color: 'amber'
                }
              ].map((phase, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="relative"
                >
                  {/* Connecting Line */}
                  {idx < 3 && (
                    <div className="hidden md:block absolute left-12 top-full w-0.5 h-8 bg-slate-300 dark:bg-slate-600 z-0" />
                  )}

                  <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-8 shadow-lg border-2 border-slate-200 dark:border-slate-700 hover:border-emerald-500 transition-all duration-300">
                    <div className="flex flex-col md:flex-row gap-8">
                      {/* Phase Label */}
                      <div className="flex-shrink-0">
                        <div className={`bg-${phase.color}-100 dark:bg-${phase.color}-900/30 text-${phase.color}-800 dark:text-${phase.color}-400 px-4 py-2 rounded-lg font-bold text-sm mb-2 inline-block`}>
                          {phase.phase}
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                          {phase.title}
                        </h3>
                        <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                          <Clock size={16} />
                          <span className="font-semibold">{phase.duration}</span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-grow space-y-4">
                        <div>
                          <h4 className="font-bold text-slate-900 dark:text-white mb-2">Activities:</h4>
                          <ul className="space-y-2">
                            {phase.activities.map((activity, actIdx) => (
                              <li key={actIdx} className="flex items-start gap-2 text-slate-600 dark:text-slate-300">
                                <CheckCircle2 className="flex-shrink-0 text-emerald-600 mt-0.5" size={16} />
                                <span>{activity}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                            <h5 className="font-bold text-sm text-slate-600 dark:text-slate-400 mb-1">DELIVERABLE</h5>
                            <p className="text-slate-900 dark:text-white">{phase.deliverable}</p>
                          </div>
                          <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-lg border border-emerald-200 dark:border-emerald-800">
                            <h5 className="font-bold text-sm text-emerald-700 dark:text-emerald-400 mb-1">OUTCOME</h5>
                            <p className="text-slate-900 dark:text-white">{phase.outcome}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Final Stats Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-12 bg-gradient-to-r from-emerald-600 to-blue-600 rounded-2xl p-8 text-white text-center"
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { value: '12', label: 'Successful Migrations' },
                  { value: 'Zero', label: 'Data Breaches' },
                  { value: '100%', label: 'Audit Pass Rate' },
                  { value: '€2M+', label: 'Client Savings' }
                ].map((stat, idx) => (
                  <div key={idx}>
                    <div className="text-4xl font-bold mb-1">{stat.value}</div>
                    <div className="text-emerald-100 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ROI CALCULATOR SECTION */}
        <section className="py-20 bg-slate-50 dark:bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white">
                Calculate Your Potential Savings
              </h2>
              <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
                See what you could save with a properly executed healthcare cloud migration
              </p>
            </motion.div>

            <ROICalculator />
          </div>
        </section>

        {/* PROOF SECTION - Case Studies Preview */}
        <section className="py-20 bg-white dark:bg-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white">
                Real Results from Real Projects
              </h2>
              <p className="text-xl text-slate-600 dark:text-slate-300">
                Don't just take my word for it—here's the proof
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {[
                {
                  client: 'PwC Healthcare',
                  challenge: 'Legacy e-commerce & healthcare systems modernization',
                  result: '$500K annual savings',
                  metric: '70% traffic increase',
                  compliance: 'HIPAA/FHIR/PCI',
                  link: '/projects#pwc-healthcare'
                },
                {
                  client: 'Boehringer Ingelheim',
                  challenge: 'Enterprise AI/ML Data Lake implementation',
                  result: '€500K cloud migration',
                  metric: '50% faster insights',
                  compliance: 'GDPR/Pharma',
                  link: '/projects#boehringer-aiml'
                },
                {
                  client: 'Delivery Hero',
                  challenge: 'High-scale display ads platform (5M+ daily)',
                  result: '20% revenue increase',
                  metric: '99.99% SLA',
                  compliance: 'GDPR',
                  link: '/projects#delivery-hero'
                }
              ].map((project, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="group bg-slate-50 dark:bg-slate-900 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-slate-200 dark:border-slate-700 hover:border-emerald-500"
                >
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                      {project.client}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                      {project.challenge}
                    </p>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2">
                      <DollarSign className="text-emerald-600" size={20} />
                      <span className="font-bold text-slate-900 dark:text-white">{project.result}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingDown className="text-blue-600" size={20} />
                      <span className="font-bold text-slate-900 dark:text-white">{project.metric}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="text-violet-600" size={20} />
                      <span className="text-sm text-slate-600 dark:text-slate-400">{project.compliance}</span>
                    </div>
                  </div>

                  <Link
                    to={project.link}
                    className="inline-flex items-center gap-2 text-emerald-600 font-semibold group-hover:gap-3 transition-all"
                  >
                    View Full Case Study
                    <ArrowRight size={16} />
                  </Link>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <Link
                to="/projects"
                className="inline-flex items-center gap-3 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-xl hover:shadow-2xl"
              >
                See All Projects
                <ArrowRight size={20} />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* FAQ SECTION - Objection Handling */}
        <section className="py-20 bg-slate-50 dark:bg-slate-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white">
                Common Questions
              </h2>
              <p className="text-xl text-slate-600 dark:text-slate-300">
                Addressing your concerns about healthcare cloud migration
              </p>
            </motion.div>

            <div className="space-y-6">
              {[
                {
                  question: 'What if we have a data breach during migration?',
                  answer: 'Zero-downtime strategy means your production system never goes offline. Data is encrypted in transit (TLS 1.3) and at rest (AES-256). We migrate in phases with rollback procedures at every step. In 12 migrations, we\'ve never had a breach. Every migration includes a comprehensive security audit before, during, and after.'
                },
                {
                  question: 'How long will we be down?',
                  answer: 'Zero downtime. Migrations happen during off-hours with parallel systems running. Users never see disruption. We use blue-green deployment strategies and can roll back instantly if needed. Your team continues working normally throughout the entire process.'
                },
                {
                  question: 'What if HIPAA requirements change mid-migration?',
                  answer: 'Architecture is designed for compliance flexibility. We monitor regulatory changes continuously and adapt the plan proactively. Your system will meet current AND future requirements. We include buffer time and contingency plans for regulatory updates.'
                },
                {
                  question: 'We don\'t have budget for this.',
                  answer: 'Average ROI is 285% in year 1. Most clients save enough to pay for the project within 8 months through infrastructure optimization alone. Use the ROI calculator above to see YOUR potential savings. Many organizations find the migration pays for itself through avoided audit penalties and reduced operational costs.'
                },
                {
                  question: 'How do I know you won\'t leave us stranded?',
                  answer: 'Every project includes 90 days post-migration support and complete documentation. I train your team to operate the new system independently. You get runbooks, architecture diagrams, and access to me for questions. Several clients from 3+ years ago still reach out occasionally—I\'m always available.'
                }
              ].map((faq, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700"
                >
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 flex items-start gap-3">
                    <AlertCircle className="text-emerald-600 flex-shrink-0 mt-1" size={24} />
                    {faq.question}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed pl-9">
                    {faq.answer}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL CTA SECTION */}
        <section className="py-20 bg-gradient-to-br from-emerald-600 via-blue-600 to-violet-600 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Let's Discuss Your Migration
              </h2>
              <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
                Choose the path that works best for you
              </p>

              {/* Two Path Choice */}
              <div className="grid md:grid-cols-2 gap-6 mb-12">
                {/* Path A: Urgent */}
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border-2 border-white/30 hover:border-white transition-all duration-300">
                  <div className="text-3xl mb-4">🚀</div>
                  <h3 className="text-2xl font-bold mb-4">I Need This Now</h3>
                  <p className="text-white/80 mb-6">
                    For urgent migrations with tight deadlines
                  </p>
                  <a
                    href="https://calendly.com/prasadtilloo/30min"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-white text-emerald-600 px-6 py-4 rounded-xl font-bold text-lg hover:bg-emerald-50 transition-all duration-300"
                  >
                    Book 30-Min Strategy Call
                  </a>
                  <p className="text-sm text-white/60 mt-3">
                    Available this week: Tue 2pm, Thu 10am, Fri 3pm CET
                  </p>
                </div>

                {/* Path B: Research */}
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border-2 border-white/30 hover:border-white transition-all duration-300">
                  <div className="text-3xl mb-4">📚</div>
                  <h3 className="text-2xl font-bold mb-4">Still Researching</h3>
                  <p className="text-white/80 mb-6">
                    Get free resources to evaluate your options
                  </p>
                  <Link
                    to="/contact?resource=hipaa-checklist"
                    className="block w-full bg-white/20 text-white border-2 border-white px-6 py-4 rounded-xl font-bold text-lg hover:bg-white/30 transition-all duration-300"
                  >
                    Get HIPAA Compliance Checklist
                  </Link>
                  <p className="text-sm text-white/60 mt-3">
                    Free PDF + enters email nurture sequence
                  </p>
                </div>
              </div>

              {/* Risk Reversal */}
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                <h4 className="font-bold text-lg mb-2">Not sure if I'm the right fit?</h4>
                <p className="text-white/90">
                  <CheckCircle2 className="inline mr-2" size={20} />
                  First 30 minutes are free, no obligation
                </p>
                <p className="text-white/90 mt-2">
                  <CheckCircle2 className="inline mr-2" size={20} />
                  If I can't help, I'll refer you to someone who can
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      </div>

      {/* ROI Calculator Modal */}
      {showROICalculator && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 p-6 flex justify-between items-center">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                Calculate Your Savings
              </h3>
              <button
                onClick={() => setShowROICalculator(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <span className="text-3xl">&times;</span>
              </button>
            </div>
            <div className="p-6">
              <ROICalculator />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HomePage;
