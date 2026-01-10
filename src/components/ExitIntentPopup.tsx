import React, { useState, useEffect } from 'react';
import { X, ArrowRight, Gift } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ExitIntentPopup: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [hasBeenShown, setHasBeenShown] = useState(false);

    useEffect(() => {
        const handleMouseLeave = (e: MouseEvent) => {
            // Check if mouse leaves top of viewport (classic exit intent)
            if (e.clientY <= 0 && !hasBeenShown) {
                // Check local storage so we don't annoy users
                const alreadyShown = sessionStorage.getItem('exit_popup_shown');
                if (!alreadyShown) {
                    setIsVisible(true);
                    setHasBeenShown(true);
                    sessionStorage.setItem('exit_popup_shown', 'true');
                }
            }
        };

        document.addEventListener('mouseleave', handleMouseLeave);
        return () => document.removeEventListener('mouseleave', handleMouseLeave);
    }, [hasBeenShown]);

    const closePopup = () => setIsVisible(false);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4"
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden relative border border-slate-200 dark:border-slate-700"
                    >
                        <button
                            onClick={closePopup}
                            className="absolute top-4 right-4 p-2 bg-slate-100 dark:bg-slate-700 rounded-full text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
                        >
                            <X size={20} />
                        </button>

                        <div className="p-8 text-center">
                            <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Gift size={32} />
                            </div>

                            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                                Before You Go...
                            </h2>

                            <p className="text-lg text-slate-600 dark:text-slate-300 mb-8">
                                Don't leave empty-handed. Get my free <strong>Enterprise Transformation Checklist</strong> used by Fortune 500 teams.
                            </p>

                            <div className="space-y-4">
                                <a
                                    href="/products/industry40-toolkit"
                                    className="block w-full bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-emerald-500/30 flex items-center justify-center gap-2"
                                    onClick={closePopup}
                                >
                                    Get Free Checklist <ArrowRight size={20} />
                                </a>

                                <button
                                    onClick={closePopup}
                                    className="text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 font-medium text-sm"
                                >
                                    No thanks, I'll figure it out myself
                                </button>
                            </div>
                        </div>

                        <div className="bg-slate-50 dark:bg-slate-900/50 p-4 text-center border-t border-slate-100 dark:border-slate-800">
                            <p className="text-xs text-slate-400">
                                Limited time offer. No spam, ever.
                            </p>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ExitIntentPopup;
