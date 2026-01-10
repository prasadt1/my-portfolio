import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Leaf, Wind, ArrowRight, Factory, Network } from 'lucide-react';
import SEO from '../components/SEO';
import { projects } from '../data/projects';

const ClimateTechPage: React.FC = () => {
    // Filter Climate Tech Projects (PACT, iLEAP, etc.)
    const climateProjects = projects.filter(p => p.domains.includes('Climate Tech'));

    return (
        <>
            <SEO
                title="Climate Tech & ESG Architecture | Prasad Tilloo"
                description="Architecting global sustainability standards. PACT Protocol, Scope 3 Emissions Data Exchange, and digital LCA solutions."
                keywords="Climate Tech, ESG, PACT Protocol, Scope 3, Carbon Footprint, Sustainability Technology, WBCSD"
                type="website"
            />

            <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
                {/* HERO SECTION */}
                <section className="relative bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-900 text-white py-24 md:py-32 overflow-hidden">
                    <div className="absolute inset-0 opacity-20">
                        <div className="absolute inset-0" style={{
                            backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(52, 211, 153, 0.5) 1px, transparent 0)',
                            backgroundSize: '32px 32px'
                        }} />
                    </div>

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="max-w-4xl"
                        >
                            <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-400/30 px-4 py-2 rounded-full text-emerald-300 font-bold text-sm mb-6 backdrop-blur-sm">
                                <Leaf size={16} />
                                SUSTAINABLE DIGITAL INFRASTRUCTURE
                            </div>
                            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 leading-tight">
                                Decarbonizing Supply Chains through <span className="text-emerald-400">Data Transparency</span>
                            </h1>
                            <p className="text-xl text-slate-200 mb-8 max-w-2xl leading-relaxed">
                                Architecting the global standards and digital platforms that enable Fortune 100 companies to exchange Scope 3 emissions data securely and at scale.
                            </p>

                            <div className="flex flex-wrap gap-4">
                                <a
                                    href="#pact-standard"
                                    className="bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg hover:shadow-emerald-900/20 flex items-center gap-2"
                                >
                                    Explore PACT Standard <ArrowRight size={18} />
                                </a>
                                <Link
                                    to="/contact?interest=Climate%20Tech"
                                    className="bg-white/10 backdrop-blur-sm border border-emerald-400/30 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-bold transition-all"
                                >
                                    Discuss Your Strategy
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* KEY STATS */}
                <div className="bg-emerald-950 border-b border-emerald-900/50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-emerald-900/50">
                            {[
                                { value: '2.5GT', label: 'CO2e Scope Covered' },
                                { value: '20+', label: 'Fortune 100 Partners' },
                                { value: 'WBCSD', label: 'Global Standard Body' },
                                { value: 'Open Source', label: 'Protocol Architecture' }
                            ].map((stat, idx) => (
                                <div key={idx} className="py-8 text-center px-4">
                                    <div className="text-3xl font-bold text-emerald-400 font-serif mb-1">{stat.value}</div>
                                    <div className="text-xs uppercase tracking-wider text-emerald-200/60 font-semibold">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* THE CHALLENGE SECTION */}
                <section className="py-20 bg-white dark:bg-slate-900">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid md:grid-cols-2 gap-16 items-center">
                            <div>
                                <h2 className="text-3xl font-serif font-bold text-slate-900 dark:text-white mb-6">
                                    The Scope 3 Data Problem
                                </h2>
                                <p className="text-lg text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                                    90% of a company's carbon footprint lies in its supply chain (Scope 3). Yet, most companies rely on vague industry averages because they cannot get <strong>primary data</strong> from their thousands of suppliers.
                                </p>
                                <ul className="space-y-4">
                                    {[
                                        "Data silos across incompatible ERP systems",
                                        "Lack of standardized calculation methodologies",
                                        "Privacy concerns sharing BOM (Bill of Materials)",
                                        "No interoperability between carbon accounting tools"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                                            <div className="bg-red-100 dark:bg-red-900/20 p-1 rounded text-red-600 dark:text-red-400 mt-1">
                                                <Wind size={14} />
                                            </div>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="bg-slate-100 dark:bg-slate-800 rounded-2xl p-8 border border-slate-200 dark:border-slate-700">
                                <h3 className="font-bold text-slate-900 dark:text-white mb-6">Traditional vs. PACT Approach</h3>
                                <div className="space-y-6">
                                    <div className="opacity-50 grayscale">
                                        <div className="text-sm font-semibold uppercase tracking-wider mb-2">Traditional (Broken)</div>
                                        <div className="flex items-center gap-4">
                                            <Factory size={32} />
                                            <div className="flex-1 h-1 bg-slate-300 dashed"></div>
                                            <div className="bg-slate-200 p-2 rounded text-xs text-center border">Excel / Email</div>
                                            <div className="flex-1 h-1 bg-slate-300 dashed"></div>
                                            <Factory size={32} />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-sm font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-2">The PACT Network</div>
                                        <div className="flex items-center gap-4 text-emerald-600 dark:text-emerald-400">
                                            <Factory size={32} />
                                            <div className="flex-1 h-1 bg-emerald-500 relative">
                                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-100 dark:bg-emerald-900 px-2 rounded text-[10px] font-bold">API</div>
                                            </div>
                                            <Network size={32} />
                                            <div className="flex-1 h-1 bg-emerald-500 relative">
                                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-100 dark:bg-emerald-900 px-2 rounded text-[10px] font-bold">API</div>
                                            </div>
                                            <Factory size={32} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FEATURED PROJECTS */}
                <section id="pact-standard" className="py-20 bg-slate-50 dark:bg-slate-800/50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-serif font-bold text-slate-900 dark:text-white mb-4">
                                Featured Initiatives
                            </h2>
                            <p className="text-slate-500 dark:text-slate-400">Driving impact through global standards and technology platforms</p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            {climateProjects.map(project => (
                                <Link to={`/projects/${project.slug}`} key={project.id} className="group relative bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 hover:shadow-2xl hover:border-emerald-500 dark:hover:border-emerald-500 transition-all duration-300">
                                    <div className="h-2 bg-gradient-to-r from-emerald-600 to-teal-400"></div>
                                    <div className="p-8">
                                        <div className="flex justify-between items-start mb-6">
                                            <div className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                                                {project.projectType}
                                            </div>
                                            <ArrowRight className="text-slate-300 group-hover:text-emerald-500 transition-colors" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                                            {project.header.title}
                                        </h3>
                                        <p className="text-slate-600 dark:text-slate-400 mb-6 line-clamp-3">
                                            {project.challenge.situation}
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {project.technical.after?.stack?.slice(0, 4).map(tech => (
                                                <span key={tech} className="bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-2 py-1 rounded text-xs border border-slate-100 dark:border-slate-700">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA - SERVICES */}
                <section className="py-24 bg-gradient-to-br from-emerald-900 to-slate-900 text-white text-center">
                    <div className="max-w-3xl mx-auto px-4">
                        <Leaf className="mx-auto mb-6 text-emerald-400" size={48} />
                        <h2 className="text-4xl font-serif font-bold mb-6">
                            Ready to build your sustainability infrastructure?
                        </h2>
                        <p className="text-xl text-emerald-100/80 mb-10">
                            Whether you need to verify your PACT implementation or architect a custom ESG data platform, I bring deep domain expertise.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <Link
                                to="/contact?interest=Climate%20Tech"
                                className="bg-emerald-500 hover:bg-emerald-400 text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-emerald-900/50 transition-all hover:-translate-y-1"
                            >
                                Book Strategy Workshop
                            </Link>
                            <Link
                                to="/products?category=carbon"
                                className="bg-white/10 backdrop-blur-sm border border-emerald-400/30 hover:bg-white/20 px-8 py-4 rounded-xl font-bold transition-all"
                            >
                                View PACT Starter Kit
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default ClimateTechPage;
