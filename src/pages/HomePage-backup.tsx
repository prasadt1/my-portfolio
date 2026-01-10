import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, Users, Award, TrendingUp, Activity, Terminal, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import SkillsMatcher from '../components/SkillsMatcher';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleIndustryClick = (title: string) => {
    // Map display titles to filter keys used in ProjectsPage
    const map: Record<string, string> = {
      'Healthcare & Pharma': 'Healthcare',
      'Financial Services': 'Financial',
      'eCommerce & Retail': 'E-commerce',
      'AI & Machine Learning': 'AI/ML',
      'Telecom': 'Telecom',
      'Manufacturing': 'Manufacturing',
      'AdTech': 'AdTech',
      'Climate Tech & ESG': 'Climate-Tech'
    };

    const filterKey = map[title] || 'All';
    navigate('/projects', { state: { filter: filterKey } });
    window.scrollTo(0, 0);
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const industries = [
    { emoji: '🏥', title: 'Healthcare & Pharma', count: '3 projects' },
    { emoji: '🏦', title: 'Financial Services', count: '5 projects' },
    { emoji: '🛒', title: 'eCommerce & Retail', count: '4 projects' },
    { emoji: '🤖', title: 'AI & Machine Learning', count: '2 projects' },
    { emoji: '📱', title: 'Telecom', count: '2 projects' },
    { emoji: '🏭', title: 'Manufacturing', count: '3 projects' },
    { emoji: '📺', title: 'AdTech', count: '2 projects' },
    { emoji: '🌱', title: 'Climate Tech & ESG', count: '2 projects' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-20 overflow-hidden">
      <SEO
        title="Home"
        description="Prasad Tilloo - Senior IT Leader with 15+ years in cloud architecture, AI/ML, healthcare IT, and enterprise modernization. $1M+ cost savings, 99.99% SLA."
        keywords="enterprise architect, cloud architect, AI engineer, HIPAA compliance, AWS, Azure, healthcare IT"
      />
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center mb-24 max-w-4xl mx-auto relative"
      >
        {/* Decorative background blur */}
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-400/10 dark:bg-emerald-500/10 rounded-full blur-3xl -z-10" />

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-50 dark:bg-slate-800 text-emerald-700 dark:text-emerald-400 text-sm font-medium mb-8 border border-slate-200 dark:border-slate-700 shadow-sm"
        >
          <Sparkles size={14} className="text-emerald-500" />
          <span>Available for Enterprise Consultation</span>
        </motion.div>

        <h1 className="text-5xl md:text-7xl font-serif font-semibold text-slate-900 dark:text-white mb-6 leading-[1.1] tracking-tight">
          Prasad Tilloo
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-2xl md:text-3xl text-slate-600 dark:text-slate-300 mb-8 font-medium"
        >
          Senior Engineering Leader & Enterprise Architect
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-lg md:text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Architecting robust, scalable solutions at the intersection of Cloud, Healthcare, AI & Sustainability.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            to="/architecture-engine"
            className="group flex items-center gap-2 px-8 py-4 bg-emerald-600 text-white rounded-xl font-semibold text-lg transition-all hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-900/20 hover:-translate-y-0.5 active:translate-y-0"
          >
            Try Architecture Engine
            <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
          </Link>

          <Link
            to="/projects"
            className="flex items-center gap-2 px-8 py-4 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-xl font-semibold text-lg transition-all hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-slate-300 hover:text-slate-900 dark:hover:text-white hover:shadow-sm"
          >
            View Projects
          </Link>
        </motion.div>
      </motion.div>

      {/* Metrics */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-32"
      >
        {[
          { icon: <TrendingUp className="w-6 h-6" />, value: '$1M+', label: 'Cost Savings' },
          { icon: <Award className="w-6 h-6" />, value: '15+', label: 'Years Experience' },
          { icon: <Users className="w-6 h-6" />, value: '8', label: 'Industries Served' },
          { icon: <Activity className="w-6 h-6" />, value: 'Fortune 100', label: 'Clients' }
        ].map((metric, idx) => (
          <motion.div
            key={idx}
            variants={item}
            className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-emerald-100 dark:hover:border-emerald-900 transition-all group"
          >
            <div className="text-emerald-600 dark:text-emerald-400 mb-3 bg-emerald-50 dark:bg-emerald-900/30 w-12 h-12 rounded-lg flex items-center justify-center group-hover:scale-110 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-900/50 transition-all duration-300">
              {metric.icon}
            </div>
            <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1 font-serif">{metric.value}</div>
            <div className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">{metric.label}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* Architecture Engine Teaser */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-32"
      >
        <div className="relative overflow-hidden rounded-3xl bg-slate-900 text-white shadow-2xl shadow-slate-900/10 dark:shadow-slate-900/50 border border-slate-800">
          {/* Abstract techno background */}
          <div className="absolute top-0 right-0 p-12 opacity-10 animate-pulse">
            <Terminal size={300} />
          </div>

          <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl"></div>

          <div className="relative z-10 p-8 md:p-16 flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 text-emerald-400 text-sm font-medium mb-6 border border-slate-700 shadow-sm">
                <Shield size={14} />
                <span>AI-Powered Analysis</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-white">
                Architecture Engine
              </h2>
              <p className="text-slate-400 text-lg mb-8 max-w-xl">
                Get expert architecture recommendations based on 15+ years of enterprise experience.
                Covers 4 industries, 20+ frameworks, and 100+ architecture patterns.
              </p>
              <Link
                to="/architecture-engine"
                className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-semibold transition-all hover:translate-x-1 shadow-lg shadow-emerald-900/20"
              >
                Try It Now
                <ArrowRight size={20} />
              </Link>
            </div>

            {/* Visual Representation */}
            <div className="flex-1 w-full max-w-md">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="grid grid-cols-2 gap-4 opacity-90"
              >
                <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700 backdrop-blur-sm hover:bg-slate-700/50 transition-colors">
                  <div className="h-2 w-16 bg-emerald-500/50 rounded mb-2"></div>
                  <div className="h-2 w-24 bg-slate-600 rounded"></div>
                </div>
                <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700 backdrop-blur-sm mt-8 hover:bg-slate-700/50 transition-colors">
                  <div className="h-2 w-12 bg-blue-500/50 rounded mb-2"></div>
                  <div className="h-2 w-20 bg-slate-600 rounded"></div>
                </div>
                <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700 backdrop-blur-sm -mt-4 hover:bg-slate-700/50 transition-colors">
                  <div className="h-2 w-20 bg-purple-500/50 rounded mb-2"></div>
                  <div className="h-2 w-16 bg-slate-600 rounded"></div>
                </div>
                <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700 backdrop-blur-sm mt-4 hover:bg-slate-700/50 transition-colors">
                  <div className="h-2 w-14 bg-amber-500/50 rounded mb-2"></div>
                  <div className="h-2 w-24 bg-slate-600 rounded"></div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Industries Section */}
      <div className="mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 dark:text-white mb-4">
            Industries I Serve
          </h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
            Deep domain expertise across varied sectors, delivering tailored technology solutions that drive business growth.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {industries.map((industry, idx) => (
            <motion.div
              key={idx}
              variants={item}
              onClick={() => handleIndustryClick(industry.title)}
              className="group p-6 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-emerald-500/50 dark:hover:border-emerald-500/50 hover:shadow-lg transition-all cursor-pointer relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-50 dark:bg-emerald-900/20 rounded-bl-full -mr-10 -mt-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300 transform origin-left relative z-10">
                {industry.emoji}
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors relative z-10">
                {industry.title}
              </h3>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900 inline-block px-2 py-1 rounded relative z-10 group-hover:bg-white dark:group-hover:bg-slate-800 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                {industry.count}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Recruiter Tools Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-20 max-w-3xl mx-auto"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-serif font-bold text-slate-900 dark:text-white mb-4">
            Hiring? Check My Fit
          </h2>
          <p className="text-slate-500 dark:text-slate-400">
            Paste your job description to see how well my skills align with your role.
          </p>
        </div>
        <SkillsMatcher />
      </motion.div>
    </div>
  );
};

export default HomePage;
