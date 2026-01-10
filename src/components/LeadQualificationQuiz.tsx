import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowRight,
    ArrowLeft,
    X,
    Briefcase,
    Users,
    ClipboardList,
    Settings,
    CloudLightning,
    ShieldAlert,
    Clock,
    Calendar,
    Search,
    DollarSign,
    AlertCircle
} from 'lucide-react';

interface QuizStep {
    id: string;
    question: string;
    options: Array<{ value: string; label: string; icon?: React.ReactNode }>;
    helper_text?: string;
}

interface QualificationResult {
    score: number;
    status: 'excellent_fit' | 'good_fit' | 'possible_fit' | 'not_a_fit';
    message: string;
    next_steps: {
        primary: { text: string; action: string; urgency?: string };
        secondary?: { text: string; action: string };
        alternative?: { text: string; action: string };
    };
    reasoning: string[];
    referrals?: Array<{ name: string; expertise: string; why: string }>;
}

const steps: QuizStep[] = [
    {
        id: 'role',
        question: "What's your role?",
        options: [
            { value: 'hiring_manager', label: 'Hiring Manager / CTO', icon: <Briefcase size={20} /> },
            { value: 'recruiter', label: 'Recruiter / HR', icon: <Users size={20} /> },
            { value: 'procurement', label: 'Procurement / Vendor Management', icon: <ClipboardList size={20} /> },
            { value: 'engineering', label: 'Engineering Leader', icon: <Settings size={20} /> }
        ],
        helper_text: "This helps me tailor recommendations"
    },
    {
        id: 'challenge',
        question: "What's your biggest challenge?",
        options: [
            { value: 'cloud_migration', label: 'Cloud Migration (HIPAA compliance)', icon: <CloudLightning size={20} /> },
            { value: 'cost_optimization', label: 'Cost Optimization', icon: <DollarSign size={20} /> },
            { value: 'compliance', label: 'Compliance / Audit Failures', icon: <ShieldAlert size={20} /> },
            { value: 'legacy', label: 'Legacy System Modernization', icon: <Settings size={20} /> },
            { value: 'performance', label: 'Performance / Scalability', icon: <CloudLightning size={20} /> },
            { value: 'security', label: 'Security / Data Breaches', icon: <ShieldAlert size={20} /> }
        ]
    },
    {
        id: 'timeline',
        question: "What's your timeline?",
        options: [
            { value: 'urgent', label: 'Urgent (< 1 month)', icon: <ArrowRight className="text-red-500" size={20} /> },
            { value: '1-3mo', label: '1-3 months', icon: <Clock size={20} /> },
            { value: '3-6mo', label: '3-6 months', icon: <Calendar size={20} /> },
            { value: 'planning', label: 'Exploratory / Planning', icon: <Search size={20} /> }
        ]
    },
    {
        id: 'budget',
        question: "What's your budget range?",
        options: [
            { value: '<100k', label: '< €100K' },
            { value: '100k-500k', label: '€100K - €500K' },
            { value: '500k-2m', label: '€500K - €2M' },
            { value: '>2m', label: '> €2M' },
            { value: 'unsure', label: 'Not Sure Yet' }
        ]
    }
];

const calculateQualification = (answers: Record<string, string>): QualificationResult => {
    let score = 50; // Base score
    const reasons: string[] = [];

    // Role scoring
    if (answers.role === 'hiring_manager' || answers.role === 'engineering') {
        score += 15;
        reasons.push("Decision-maker role (+15)");
    }

    // Challenge scoring
    if (['cloud_migration', 'compliance', 'security'].includes(answers.challenge)) {
        score += 20;
        reasons.push("Core expertise area (+20)");
    }

    // Timeline scoring
    if (answers.timeline === 'urgent' || answers.timeline === '1-3mo') {
        score += 10;
        reasons.push("Ready to move forward (+10)");
    }

    // Budget scoring
    if (['100k-500k', '500k-2m', '>2m'].includes(answers.budget)) {
        score += 15;
        reasons.push("Budget aligns with typical engagement (+15)");
    } else if (answers.budget === '<100k') {
        score -= 10;
        reasons.push("Budget below typical project scope (-10)");
    }

    // Determine status and message
    if (score >= 85) {
        return {
            score,
            status: 'excellent_fit',
            message: "🎯 Perfect match! You're exactly the type of client I specialize in.",
            next_steps: {
                primary: {
                    text: "Book 30-Min Strategy Call",
                    action: "https://calendly.com/prasadtilloo/30min",
                    urgency: "I have 2 consultation slots available this week"
                },
                secondary: {
                    text: "View Relevant Case Studies",
                    action: "/projects?filter=healthcare"
                }
            },
            reasoning: reasons
        };
    } else if (score >= 70) {
        return {
            score,
            status: 'good_fit',
            message: "✅ Strong potential fit. Let's discuss your specific needs.",
            next_steps: {
                primary: {
                    text: "Request Detailed Proposal",
                    action: "/contact?type=proposal"
                },
                secondary: {
                    text: "15-Min Discovery Call",
                    action: "https://calendly.com/prasadtilloo/15min"
                }
            },
            reasoning: reasons
        };
    } else if (score >= 50) {
        return {
            score,
            status: 'possible_fit',
            message: "🤔 I might be able to help, but let's validate the fit first.",
            next_steps: {
                primary: {
                    text: "15-Min Discovery Call",
                    action: "https://calendly.com/prasadtilloo/15min"
                },
                alternative: {
                    text: "View Specialist Referrals",
                    action: "#referrals"
                }
            },
            reasoning: reasons,
            referrals: [
                {
                    name: "AWS Partner Network",
                    expertise: "Smaller cloud migrations (<€100K)",
                    why: "Better fit for your budget and scope"
                },
                {
                    name: "Healthcare IT Consulting Firms",
                    expertise: "General healthcare IT consulting",
                    why: "Broader service offering if you're still exploring"
                }
            ]
        };
    } else {
        return {
            score,
            status: 'not_a_fit',
            message: "Based on your needs, I'm not the best fit. Here's why:",
            next_steps: {
                primary: {
                    text: "Get Free HIPAA Checklist",
                    action: "/contact?resource=hipaa-checklist"
                }
            },
            reasoning: reasons,
            referrals: [
                {
                    name: "General AWS Consultants",
                    expertise: "Cost optimization, general cloud",
                    why: "Better match for non-compliance-focused projects"
                },
                {
                    name: "Small Business IT Support",
                    expertise: "< €100K projects, ongoing support",
                    why: "Better fit for budget and scope"
                }
            ]
        };
    }
};

const LeadQualificationQuiz: React.FC<{
    isOpen: boolean;
    onClose: () => void;
}> = ({ isOpen, onClose }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [result, setResult] = useState<QualificationResult | null>(null);

    if (!isOpen) return null;

    const handleOptionSelect = (optionValue: string) => {
        const step = steps[currentStep];
        const newAnswers = { ...answers, [step.id]: optionValue };
        setAnswers(newAnswers);

        if (currentStep < steps.length - 1) {
            setTimeout(() => setCurrentStep(curr => curr + 1), 250);
        } else {
            // Calculate results
            const qualification = calculateQualification(newAnswers);
            setTimeout(() => setResult(qualification), 400);
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setResult(null);
            setCurrentStep(curr => curr - 1);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white dark:bg-slate-800 rounded-2xl w-full max-w-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden"
            >
                {/* Header */}
                <div className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 p-4 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        {currentStep > 0 && !result && (
                            <button onClick={handleBack} className="text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors">
                                <ArrowLeft size={20} />
                            </button>
                        )}
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                            Project Fit Assessment
                        </h2>
                    </div>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
                        <X size={24} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8">
                    {!result ? (
                        <div className="space-y-6">
                            {/* Progress Bar */}
                            <div className="w-full bg-slate-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-emerald-500"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${((currentStep) / steps.length) * 100}%` }}
                                />
                            </div>

                            <div className="min-h-[300px]">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={currentStep}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                                            {steps[currentStep].question}
                                        </h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {steps[currentStep].options.map((option) => (
                                                <button
                                                    key={option.value}
                                                    onClick={() => handleOptionSelect(option.value)}
                                                    className="flex items-center gap-4 p-4 rounded-xl border-2 border-slate-200 dark:border-slate-700 hover:border-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/10 transition-all text-left group"
                                                >
                                                    {option.icon && (
                                                        <div className="text-slate-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                                                            {option.icon}
                                                        </div>
                                                    )}
                                                    <span className="font-semibold text-slate-700 dark:text-slate-300 group-hover:text-emerald-800 dark:group-hover:text-emerald-200">
                                                        {option.label}
                                                    </span>
                                                </button>
                                            ))}
                                        </div>
                                        {steps[currentStep].helper_text && (
                                            <p className="mt-4 text-sm text-slate-500 dark:text-slate-400 flex items-center gap-2">
                                                <AlertCircle size={16} />
                                                {steps[currentStep].helper_text}
                                            </p>
                                        )}
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center space-y-8"
                        >
                            {/* Score Indicator */}
                            <div className="inline-flex items-center justify-center relative w-24 h-24">
                                <svg className="w-full h-full -rotate-90">
                                    <circle
                                        cx="48"
                                        cy="48"
                                        r="40"
                                        stroke="currentColor"
                                        strokeWidth="8"
                                        fill="transparent"
                                        className="text-slate-100 dark:text-slate-700"
                                    />
                                    <circle
                                        cx="48"
                                        cy="48"
                                        r="40"
                                        stroke="currentColor"
                                        strokeWidth="8"
                                        fill="transparent"
                                        strokeDasharray={251.2}
                                        strokeDashoffset={251.2 - (251.2 * result.score) / 100}
                                        className={`${result.score >= 85 ? 'text-emerald-500' :
                                            result.score >= 50 ? 'text-amber-500' : 'text-slate-400'
                                            }`}
                                    />
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center text-xl font-bold text-slate-900 dark:text-white">
                                    {result.score}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                                    {result.message}
                                </h3>
                                <div className="flex flex-wrap justify-center gap-2 mt-4">
                                    {result.reasoning.map((reason, idx) => (
                                        <span key={idx} className="px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-sm rounded-full">
                                            {reason}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
                                <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                                    Recommended Next Steps
                                </h4>

                                <div className="flex flex-col gap-3">
                                    <a
                                        href={result.next_steps.primary.action}
                                        target={result.next_steps.primary.action.startsWith('http') ? '_blank' : '_self'}
                                        rel="noopener noreferrer"
                                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-bold transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                                    >
                                        {result.next_steps.primary.text}
                                        <ArrowRight size={18} />
                                    </a>

                                    {result.next_steps.primary.urgency && (
                                        <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                                            {result.next_steps.primary.urgency}
                                        </p>
                                    )}

                                    {result.next_steps.secondary && (
                                        <a
                                            href={result.next_steps.secondary.action}
                                            className="w-full bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 px-6 py-3 rounded-lg font-semibold transition-all"
                                        >
                                            {result.next_steps.secondary.text}
                                        </a>
                                    )}
                                </div>
                            </div>

                            {result.referrals && (
                                <div className="text-left bg-slate-50 dark:bg-slate-900/50 rounded-lg p-4">
                                    <h5 className="font-semibold text-slate-900 dark:text-white text-sm mb-2">Alternatively, consider these partners:</h5>
                                    <ul className="space-y-2">
                                        {result.referrals.map((ref, idx) => (
                                            <li key={idx} className="text-sm text-slate-600 dark:text-slate-400">
                                                <strong className="text-slate-800 dark:text-slate-200">{ref.name}:</strong> {ref.expertise}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </motion.div>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

export default LeadQualificationQuiz;
