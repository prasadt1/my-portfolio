// import { LucideIcon } from 'lucide-react';

export interface Product {
    id: string;
    slug: string;
    // title & description will be pulled from i18n
    // price: number; // REMOVED - pricing uncertain
    icon: string; // Lucide icon name
    // features will be pulled from i18n
    category: 'industry40' | 'compliance' | 'consulting' | 'carbon' | 'ecommerce' | 'architecture' | 'data';
    ctaLink: string;
    theme: {
        color: string; // e.g. "blue", "emerald", "orange", "purple", "rose", "cyan"
        gradient: string; // Tailwinc classes
        iconBg: string;
        backgroundImage?: string; // path to image
    }
}

export const products: Product[] = [
    {
        id: 'ecommerce-blueprint',
        slug: 'ecommerce-blueprint',
        // price: 15000, // REMOVED - pricing uncertain
        icon: 'ShoppingBag',
        category: 'ecommerce',
        ctaLink: '#',
        theme: {
            color: 'orange',
            gradient: 'from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/10',
            iconBg: 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400'
        }
    },
    {
        id: 'pact-starter-kit',
        slug: 'pact-starter-kit',
        // price: 9500, // REMOVED - pricing uncertain
        icon: 'Leaf',
        category: 'carbon',
        ctaLink: '#',
        theme: {
            color: 'emerald',
            gradient: 'from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/10',
            iconBg: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400',
            backgroundImage: '/assets/bg/bg-eco.png'
        }
    },
    {
        id: 'data-lake-architecture',
        slug: 'data-lake-architecture',
        // price: 18000, // REMOVED - pricing uncertain
        icon: 'Database',
        category: 'data',
        ctaLink: '#',
        theme: {
            color: 'blue',
            gradient: 'from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/10',
            iconBg: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
        }
    },
    {
        id: 'display-ads-architecture',
        slug: 'display-ads-architecture',
        // price: 12000, // REMOVED - pricing uncertain
        icon: 'Zap',
        category: 'architecture',
        ctaLink: '#',
        theme: {
            color: 'purple',
            gradient: 'from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/10',
            iconBg: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'
        }
    },
    {
        id: 'hipaa-compliance-package',
        slug: 'hipaa-compliance-package',
        // price: 8000, // REMOVED - pricing uncertain
        icon: 'Shield',
        category: 'compliance',
        ctaLink: '#',
        theme: {
            color: 'red',
            gradient: 'from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/10',
            iconBg: 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
        }
    },
    {
        id: 'industry40-toolkit',
        slug: 'industry40-toolkit',
        // price: 12000, // REMOVED - pricing uncertain
        icon: 'Factory',
        category: 'industry40',
        ctaLink: '#',
        theme: {
            color: 'cyan',
            gradient: 'from-cyan-50 to-sky-50 dark:from-cyan-900/20 dark:to-sky-900/10',
            iconBg: 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400'
        }
    },
    {
        id: 'it-effectiveness-assessment',
        slug: 'it-effectiveness-assessment',
        // price: 5000, // REMOVED - pricing uncertain
        icon: 'BarChart',
        category: 'consulting',
        ctaLink: '#',
        theme: {
            color: 'slate',
            gradient: 'from-slate-50 to-gray-50 dark:from-slate-800 dark:to-slate-900',
            iconBg: 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
        }
    },
    {
        id: 'devops-maturity-assessment',
        slug: 'devops-maturity-assessment',
        // price: 8000, // REMOVED - pricing uncertain
        icon: 'Loop', // Will need to map to Infinity/Loop symbol
        category: 'consulting',
        ctaLink: '#',
        theme: {
            color: 'blue',
            gradient: 'from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/10',
            iconBg: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
            backgroundImage: '/assets/bg/bg-devops.png'
        }
    },
    {
        id: 'architecture-assessment',
        slug: 'architecture-assessment',
        // price: 15000, // REMOVED - pricing uncertain
        icon: 'Structure', // Will need to map to Layout/Building
        category: 'architecture',
        ctaLink: '#',
        theme: {
            color: 'indigo',
            gradient: 'from-indigo-50 to-violet-50 dark:from-indigo-900/20 dark:to-violet-900/10',
            iconBg: 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400',
            backgroundImage: '/assets/bg/bg-architecture.png'
        }
    },
    {
        id: 'agile-maturity-assessment',
        slug: 'agile-maturity-assessment',
        // price: 6000, // REMOVED - pricing uncertain
        icon: 'Users',
        category: 'consulting',
        ctaLink: '#',
        theme: {
            color: 'lime',
            gradient: 'from-lime-50 to-green-50 dark:from-lime-900/20 dark:to-green-900/10',
            iconBg: 'bg-lime-100 dark:bg-lime-900/30 text-lime-600 dark:text-lime-400'
        }
    }
];