// src/components/TestimonialsRotator.tsx
// Phase 3.3F: Testimonials carousel (like LogoCarousel)

import React, { useState } from 'react';
import { Quote, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { trackEvent } from '../services/analytics';

interface Testimonial {
    quote: string;
    gist: string; // Short summary for carousel view
    author: string;
    role: string;
    company: string;
}

// Sample testimonials with gists
const TESTIMONIALS: Testimonial[] = [
    {
        quote: "Prasad delivered exactly what we needed: a clear architecture decision package that our board could approve. No fluff, just actionable recommendations.",
        gist: "Clear architecture decision package for board approval",
        author: "CTO",
        role: "Fortune 100 Healthcare",
        company: "Anonymous"
    },
    {
        quote: "The migration strategy was flawless. Zero downtime, zero SEO loss. Exactly as promised.",
        gist: "Flawless migration with zero downtime and SEO loss",
        author: "VP Engineering",
        role: "Global eCommerce",
        company: "Anonymous"
    },
    {
        quote: "Best architecture review we've had. Saved us €400K+ by avoiding the wrong platform choice.",
        gist: "Saved €400K+ by avoiding wrong platform choice",
        author: "Head of Technology",
        role: "Pharma Company",
        company: "Anonymous"
    },
    {
        quote: "The performance optimization work exceeded expectations. We achieved 80% faster processing without any rewrites.",
        gist: "80% faster processing without rewrites",
        author: "Engineering Director",
        role: "Insurance Company",
        company: "Anonymous"
    },
    {
        quote: "Prasad's vendor-neutral approach helped us make the right cloud decision. No vendor lock-in, just honest technical guidance.",
        gist: "Vendor-neutral guidance prevented lock-in",
        author: "CTO",
        role: "Scale-up",
        company: "Anonymous"
    },
];

interface TestimonialsRotatorProps {
    className?: string;
}

const TestimonialsRotator: React.FC<TestimonialsRotatorProps> = ({ className = '' }) => {
    const { t } = useTranslation();
    const [hoveredId, setHoveredId] = useState<string | null>(null);

    // Track impression on mount
    React.useEffect(() => {
        trackEvent('testimonial_impression', {
            count: TESTIMONIALS.length,
        });
    }, []);

    return (
        <div className={`w-full overflow-hidden bg-slate-50 dark:bg-slate-800 py-8 border-y border-slate-200 dark:border-slate-700 ${className}`}>
            <div className="relative flex overflow-hidden group">
                {/* Single animating track containing duplicate sets */}
                <div className="flex animate-scroll">
                    {/* First Set */}
                    <div className="flex shrink-0 gap-6 px-8 items-center">
                        {TESTIMONIALS.map((testimonial, idx) => {
                            const cardId = `testimonial-1-${idx}`;
                            const isHovered = hoveredId === cardId;
                            return (
                                <motion.div
                                    key={cardId}
                                    onMouseEnter={() => setHoveredId(cardId)}
                                    onMouseLeave={() => setHoveredId(null)}
                                    className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300 w-[300px] flex-shrink-0 cursor-pointer"
                                >
                                    <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center flex-shrink-0">
                                            <Quote className="text-emerald-600 dark:text-emerald-400" size={16} />
                                        </div>
                                        <div className="flex-1">
                                            {/* Show gist by default, full quote on hover */}
                                            <div className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-3 min-h-[3rem]">
                                                {isHovered ? (
                                                    <span className="italic">"{testimonial.quote}"</span>
                                                ) : (
                                                    <span className="font-medium">{testimonial.gist}</span>
                                                )}
                                            </div>
                                            <div className="text-xs text-slate-600 dark:text-slate-400">
                                                <span className="font-semibold">{testimonial.author}</span>
                                                {testimonial.role && `, ${testimonial.role}`}
                                                {testimonial.company && ` · ${testimonial.company}`}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Second Set (Duplicate for seamless loop) */}
                    <div className="flex shrink-0 gap-6 px-8 items-center">
                        {TESTIMONIALS.map((testimonial, idx) => {
                            const cardId = `testimonial-2-${idx}`;
                            const isHovered = hoveredId === cardId;
                            return (
                                <motion.div
                                    key={cardId}
                                    onMouseEnter={() => setHoveredId(cardId)}
                                    onMouseLeave={() => setHoveredId(null)}
                                    className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300 w-[300px] flex-shrink-0 cursor-pointer"
                                >
                                    <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center flex-shrink-0">
                                            <Quote className="text-emerald-600 dark:text-emerald-400" size={16} />
                                        </div>
                                        <div className="flex-1">
                                            {/* Show gist by default, full quote on hover */}
                                            <div className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-3 min-h-[3rem]">
                                                {isHovered ? (
                                                    <span className="italic">"{testimonial.quote}"</span>
                                                ) : (
                                                    <span className="font-medium">{testimonial.gist}</span>
                                                )}
                                            </div>
                                            <div className="text-xs text-slate-600 dark:text-slate-400">
                                                <span className="font-semibold">{testimonial.author}</span>
                                                {testimonial.role && `, ${testimonial.role}`}
                                                {testimonial.company && ` · ${testimonial.company}`}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
            
            {/* "More testimonials" link below carousel */}
            <div className="text-center mt-6">
                <Link
                    to="/about"
                    onClick={() => trackEvent('testimonial_clicked', { source: 'carousel' })}
                    className="inline-flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-medium"
                >
                    {t('testimonials.viewMore', { defaultValue: 'More testimonials' })}
                    <ChevronRight size={16} />
                </Link>
            </div>
        </div>
    );
};

export default TestimonialsRotator;
