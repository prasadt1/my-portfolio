import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { COMPETITION_CONFIG } from '../config/competition';
import { usePersonaCTAs } from '../utils/personaCTAs';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();
    const { t } = useTranslation();
    const { primary: primaryCTA } = usePersonaCTAs();

    return (
        <>
            {/* Lead Magnet Banner */}
            <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white py-4 border-t border-emerald-500">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <p className="text-sm md:text-base font-medium text-center">
                            {t('guide.footerBanner.text')}
                        </p>
                        <Link
                            to="/checklist"
                            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 px-6 py-2 rounded-lg font-semibold text-sm transition-all whitespace-nowrap flex items-center gap-2"
                        >
                            Get Checklist
                            <ArrowRight size={16} />
                        </Link>
                    </div>
                </div>
            </div>

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
                                href="mailto:prasad.sgsits@gmail.com"
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
                            <li><Link to="/projects" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">{t('nav.projects')}</Link></li>
                            <li><Link to="/contact" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">{t('nav.contact')}</Link></li>
                            <li><Link to="/hiring" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">{t('footer.forRecruiters')}</Link></li>
                        </ul>
                    </div>

                    {/* Tools & Resources */}
                    <div>
                        <h3 className="font-bold text-slate-900 dark:text-white mb-4">Tools & Resources</h3>
                        <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
                            <li><Link to="/services" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">{t('nav.services')}</Link></li>
                            <li><Link to="/risk-radar" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Risk Radar</Link></li>
                            <li><Link to="/checklist" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Proposal Checklist</Link></li>
                            <li><Link to="/architecture-engine" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">{t('nav.labs')} (Architecture Assistant)</Link></li>
                            <li><Link to="/climate-tech" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Climate Tech</Link></li>
                            <li><Link to="/privacy" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">{t('footer.privacy', { defaultValue: 'Privacy Policy' })}</Link></li>
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

                    {/* Contact CTA - Phase 4.1: Persona-based */}
                    <div>
                        <h3 className="font-bold text-slate-900 dark:text-white mb-4">{t('footer.contact')}</h3>
                        <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
                            Ready to transform your business or solve a complex architectural challenge?
                        </p>
                        {primaryCTA.path.startsWith('http') ? (
                            <a
                                href={primaryCTA.path}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
                            >
                                {primaryCTA.label}
                            </a>
                        ) : (
                            <Link
                                to={primaryCTA.path}
                                className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
                            >
                                {primaryCTA.label}
                            </Link>
                        )}
                    </div>
                </div>

                <div className="border-t border-slate-200 dark:border-slate-800 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
                        <p className="text-slate-500 text-sm text-center md:text-left">
                            © {currentYear} Prasad Tilloo. {t('footer.rights')}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-slate-400">
                            <span>{t('footer.builtWith')}</span>
                            <span className="w-1 h-1 bg-slate-400 rounded-full" />
                            <span>React & Tailwind</span>
                        </div>
                    </div>
                    {/* Competition mode badge and deployment info */}
                    {COMPETITION_CONFIG.enabled && (
                        <div className="flex flex-col md:flex-row justify-center items-center gap-4 text-xs text-slate-400 pt-4 border-t border-slate-200 dark:border-slate-800">
                            <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded text-slate-600 dark:text-slate-400">
                                {COMPETITION_CONFIG.badgeText.en}
                            </span>
                            <span className="text-slate-500">
                                {COMPETITION_CONFIG.footerText.en}
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </footer>
        </>
    );
};

export default Footer;
