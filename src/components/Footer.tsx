import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();
    const { t } = useTranslation();

    return (
        <footer className="bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 pt-16 pb-24 md:pb-16 font-sans">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-12">
                    {/* Brand Column */}
                    <div className="col-span-1 md:col-span-1">
                        <Link to="/" className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 rounded-full bg-slate-900 dark:bg-emerald-500 flex items-center justify-center text-white font-serif font-bold text-sm shadow-md">
                                PT
                            </div>
                            <span className="text-xl font-serif font-bold text-slate-900 dark:text-white">
                                Prasad Tilloo
                            </span>
                        </Link>
                        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6">
                            {t('footer.tagline')}
                        </p>
                        <div className="flex gap-4">
                            <a
                                href="https://linkedin.com/in/prasadtilloo"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                                aria-label="LinkedIn"
                            >
                                <Linkedin size={20} />
                            </a>
                            <a
                                href="https://github.com/prasadt1"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                                aria-label="GitHub"
                            >
                                <Github size={20} />
                            </a>
                            <a
                                href="mailto:contact@prasadtilloo.com"
                                className="text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                                aria-label="Email"
                            >
                                <Mail size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-bold text-slate-900 dark:text-white mb-4">{t('footer.explore')}</h3>
                        <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
                            <li><Link to="/about" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">{t('nav.about')} me</Link></li>
                            <li><Link to="/projects" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">{t('nav.projects')}</Link></li>
                            <li><Link to="/contact" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">{t('nav.contact')}</Link></li>
                        </ul>
                    </div>

                    {/* Tools & Resources */}
                    <div>
                        <h3 className="font-bold text-slate-900 dark:text-white mb-4">Tools & Resources</h3>
                        <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
                            <li><Link to="/architecture-engine" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">{t('nav.architectureEngine')}</Link></li>
                            <li><Link to="/services" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">{t('nav.services')}</Link></li>
                            <li><Link to="/climate-tech" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Climate Tech</Link></li>
                        </ul>
                    </div>

                    {/* Expertise */}
                    <div>
                        <h3 className="font-bold text-slate-900 dark:text-white mb-4">{t('footer.expertise')}</h3>
                        <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
                            <li><Link to="/projects?tag=Cloud" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Cloud Migration</Link></li>
                            <li><Link to="/climate-tech" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Climate Tech</Link></li>
                            <li><Link to="/projects?tag=Compliance" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">HIPAA Compliance</Link></li>
                            <li><Link to="/projects?tag=AI" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">AI & Data Mesh</Link></li>
                        </ul>
                    </div>

                    {/* Contact CTA */}
                    <div>
                        <h3 className="font-bold text-slate-900 dark:text-white mb-4">{t('footer.contact')}</h3>
                        <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
                            Ready to transform your business or solve a complex architectural challenge?
                        </p>
                        <a
                            href="https://calendly.com/prasad-sgsits/30min"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
                        >
                            Schedule Consultation
                        </a>
                    </div>
                </div>

                <div className="border-t border-slate-200 dark:border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-slate-500 text-sm text-center md:text-left">
                        © {currentYear} Prasad Tilloo. {t('footer.rights')}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                        <span>{t('footer.builtWith')}</span>
                        <span className="w-1 h-1 bg-slate-400 rounded-full" />
                        <span>React & Tailwind</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
