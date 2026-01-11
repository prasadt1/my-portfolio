import React, { useState } from 'react';
import { Calculator, TrendingDown, CheckCircle2, ExternalLink, Cloud, Database, Leaf, Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface ROIInputs {
    // Common
    company_size: string;

    // Cloud Migration
    cloud_monthly_spend?: string;
    patient_records?: string;
    compliance_status?: string;

    // Legacy Mod
    legacy_maintenance_cost?: string; // Annual
    downtime_hours_year?: string;
    dev_team_size?: string;

    // Carbon
    supplier_count?: string;
    manual_hours_per_supplier?: string; // Annual hours spent collecting data per supplier
    audit_costs?: string; // Annual ESG audit costs
}

type CalculatorMode = 'cloud' | 'legacy' | 'carbon';

interface ROIResult {
    total_annual_savings: number;
    confidence_score: number;
    breakdown: Record<string, { amount: number; description: string }>;
    timeline_phases: Record<string, { duration: string; focus: string; savings: string }>;
    relevant_case_studies: Array<{ client: string; outcome: string; link: string }>;
}

const ROICalculator: React.FC = () => {
    const { t } = useTranslation();
    const [mode, setMode] = useState<CalculatorMode>('cloud');
    const [inputs, setInputs] = useState<ROIInputs>({
        company_size: '',
        cloud_monthly_spend: '',
        patient_records: '',
        compliance_status: '',
        legacy_maintenance_cost: '',
        downtime_hours_year: '',
        dev_team_size: '',
        supplier_count: '',
        manual_hours_per_supplier: '',
        audit_costs: ''
    });

    const [result, setResult] = useState<ROIResult | null>(null);
    const [loading, setLoading] = useState(false);

    const formatCurrency = (amount: number) => '€' + amount.toLocaleString('de-DE', { maximumFractionDigits: 0 });

    const calculateROI = () => {
        setLoading(true);
        setTimeout(() => {
            let res: ROIResult | null = null;

            if (mode === 'cloud') {
                const spend = parseFloat(inputs.cloud_monthly_spend || '0');
                const riskSavings = spend * 12 * 0.4;
                const infraSavings = spend * 12 * 0.3;
                res = {
                    total_annual_savings: riskSavings + infraSavings + 50000,
                    confidence_score: 85,
                    breakdown: {
                        compliance_risk: { amount: riskSavings, description: 'Avoided audit penalties & remediation' },
                        infra_optimization: { amount: infraSavings, description: 'Right-sized resources & reserved instances' },
                        operational_efficiency: { amount: 50000, description: 'Reduced manual compliance checks' }
                    },
                    timeline_phases: {
                        phase1: { duration: '4 weeks', focus: 'Audit & Landing Zone', savings: '€10k' },
                        phase2: { duration: '12 weeks', focus: 'Migration', savings: '€150k/yr' }
                    },
                    relevant_case_studies: [{ client: 'PwC Healthcare', outcome: '$500k savings', link: '/projects/pwc-healthcare' }]
                };
            } else if (mode === 'legacy') {
                const maintenance = parseFloat(inputs.legacy_maintenance_cost || '0');
                const downtime = parseFloat(inputs.downtime_hours_year || '0');
                const downtimeCost = downtime * 5000; // Assume €5k/hr cost
                res = {
                    total_annual_savings: (maintenance * 0.6) + (downtimeCost * 0.9),
                    confidence_score: 80,
                    breakdown: {
                        maintenance_reduction: { amount: maintenance * 0.6, description: 'Eliminated legacy licensing & support' },
                        downtime_avoidance: { amount: downtimeCost * 0.9, description: '99.99% uptime with modern stack' },
                        productivity: { amount: 100000, description: 'Faster release cycles' }
                    },
                    timeline_phases: {
                        phase1: { duration: '6 weeks', focus: 'Strangler Fig Setup', savings: '€20k' },
                        phase2: { duration: '6 months', focus: 'Core Migration', savings: '€200k/yr' }
                    },
                    relevant_case_studies: [{ client: 'Delivery Hero', outcome: 'Scale to 5M transactions', link: '/projects/delivery-hero-adtech' }]
                };
            } else {
                // Carbon
                const suppliers = parseFloat(inputs.supplier_count || '0');
                const hours = parseFloat(inputs.manual_hours_per_supplier || '0');
                const audits = parseFloat(inputs.audit_costs || '0');
                const manualCost = suppliers * hours * 100; // €100/hr internal cost
                res = {
                    total_annual_savings: (manualCost * 0.9) + (audits * 0.5),
                    confidence_score: 90,
                    breakdown: {
                        automation: { amount: manualCost * 0.9, description: 'Automated PACT data exchange' },
                        audit_efficiency: { amount: audits * 0.5, description: 'Audit-ready data logs' }
                    },
                    timeline_phases: {
                        phase1: { duration: '4 weeks', focus: 'API Gateway', savings: '€5k' },
                        phase2: { duration: '8 weeks', focus: 'Supplier Onboarding', savings: '€50k/yr' }
                    },
                    relevant_case_studies: [{ client: 'WBCSD PACT', outcome: 'Global Standard', link: '/projects/pact-carbon-transparency' }]
                };
            }

            setResult(res);
            setLoading(false);
        }, 800);
    };

    return (
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
            {/* Tabs */}
            <div className="flex border-b border-slate-200 dark:border-slate-700">
                <button
                    onClick={() => { setMode('cloud'); setResult(null); }}
                    className={`flex-1 p-4 font-bold flex items-center justify-center gap-2 transition-colors ${mode === 'cloud' ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border-b-2 border-emerald-500' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                >
                    <Cloud size={20} /> {t('roiCalculator.tabs.cloud')}
                </button>
                <button
                    onClick={() => { setMode('legacy'); setResult(null); }}
                    className={`flex-1 p-4 font-bold flex items-center justify-center gap-2 transition-colors ${mode === 'legacy' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-b-2 border-blue-500' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                >
                    <Database size={20} /> {t('roiCalculator.tabs.legacy')}
                </button>
                <button
                    onClick={() => { setMode('carbon'); setResult(null); }}
                    className={`flex-1 p-4 font-bold flex items-center justify-center gap-2 transition-colors ${mode === 'carbon' ? 'bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400 border-b-2 border-teal-500' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                >
                    <Leaf size={20} /> {t('roiCalculator.tabs.carbon')}
                </button>
            </div>

            <div className="p-8">
                <div className="mb-8">
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                        {mode === 'cloud' && t('roiCalculator.title.cloud')}
                        {mode === 'legacy' && t('roiCalculator.title.legacy')}
                        {mode === 'carbon' && t('roiCalculator.title.carbon')}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400">
                        {mode === 'cloud' && t('roiCalculator.description.cloud')}
                        {mode === 'legacy' && t('roiCalculator.description.legacy')}
                        {mode === 'carbon' && t('roiCalculator.description.carbon')}
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                    {/* Common Input */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">{t('roiCalculator.inputs.companySize')}</label>
                        <select
                            value={inputs.company_size}
                            onChange={(e) => setInputs({ ...inputs, company_size: e.target.value })}
                            className="w-full px-4 py-3 border rounded-lg dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                        >
                            <option value="">{t('roiCalculator.inputs.select')}</option>
                            <option value="small">{t('roiCalculator.inputs.sizes.small')}</option>
                            <option value="medium">{t('roiCalculator.inputs.sizes.medium')}</option>
                            <option value="large">{t('roiCalculator.inputs.sizes.large')}</option>
                        </select>
                    </div>

                    {/* Mode Specific Inputs */}
                    {mode === 'cloud' && (
                        <>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">{t('roiCalculator.inputs.cloudMonthlySpend')}</label>
                                <input
                                    type="number"
                                    value={inputs.cloud_monthly_spend}
                                    onChange={(e) => setInputs({ ...inputs, cloud_monthly_spend: e.target.value })}
                                    className="w-full px-4 py-3 border rounded-lg dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                                    placeholder="50000"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">{t('roiCalculator.inputs.complianceStatus')}</label>
                                <select
                                    value={inputs.compliance_status}
                                    onChange={(e) => setInputs({ ...inputs, compliance_status: e.target.value })}
                                    className="w-full px-4 py-3 border rounded-lg dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                                >
                                    <option value="">{t('roiCalculator.inputs.select')}</option>
                                    <option value="non_compliant">{t('roiCalculator.inputs.complianceOptions.non_compliant')}</option>
                                    <option value="partially">{t('roiCalculator.inputs.complianceOptions.partially')}</option>
                                    <option value="compliant">{t('roiCalculator.inputs.complianceOptions.compliant')}</option>
                                </select>
                            </div>
                        </>
                    )}

                    {mode === 'legacy' && (
                        <>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">{t('roiCalculator.inputs.annualMaintenance')}</label>
                                <input
                                    type="number"
                                    value={inputs.legacy_maintenance_cost}
                                    onChange={(e) => setInputs({ ...inputs, legacy_maintenance_cost: e.target.value })}
                                    className="w-full px-4 py-3 border rounded-lg dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                                    placeholder="200000"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">{t('roiCalculator.inputs.downtimeHours')}</label>
                                <input
                                    type="number"
                                    value={inputs.downtime_hours_year}
                                    onChange={(e) => setInputs({ ...inputs, downtime_hours_year: e.target.value })}
                                    className="w-full px-4 py-3 border rounded-lg dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                                    placeholder="24"
                                />
                            </div>
                        </>
                    )}

                    {mode === 'carbon' && (
                        <>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">{t('roiCalculator.inputs.supplierCount')}</label>
                                <input
                                    type="number"
                                    value={inputs.supplier_count}
                                    onChange={(e) => setInputs({ ...inputs, supplier_count: e.target.value })}
                                    className="w-full px-4 py-3 border rounded-lg dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                                    placeholder="100"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">{t('roiCalculator.inputs.manualHours')}</label>
                                <input
                                    type="number"
                                    value={inputs.manual_hours_per_supplier}
                                    onChange={(e) => setInputs({ ...inputs, manual_hours_per_supplier: e.target.value })}
                                    className="w-full px-4 py-3 border rounded-lg dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                                    placeholder="10"
                                />
                            </div>
                        </>
                    )}
                </div>

                <button
                    onClick={calculateROI}
                    disabled={loading}
                    className="w-full bg-slate-900 dark:bg-emerald-600 text-white font-bold py-4 rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                >
                    {loading ? (
                        <span className="flex items-center gap-2">
                            <Loader2 size={20} className="animate-spin" />
                            {t('roiCalculator.cta.calculating')}
                        </span>
                    ) : (
                        <><Calculator size={20} /> {t('roiCalculator.cta.calculate')}</>
                    )}
                </button>

                {/* Results Section */}
                {result && (
                    <div className="mt-8 animate-fade-in">
                        <div className="bg-emerald-50 dark:bg-emerald-900/20 p-6 rounded-xl border border-emerald-200 dark:border-emerald-700 text-center mb-6">
                            <div className="text-sm font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-2">{t('roiCalculator.results.title')}</div>
                            <div className="text-5xl font-bold text-slate-900 dark:text-white mb-2">{formatCurrency(result.total_annual_savings)}</div>
                            <div className="text-slate-600 dark:text-slate-400 flex items-center justify-center gap-2">
                                <CheckCircle2 size={16} className="text-emerald-500" />
                                {result.confidence_score}% {t('roiCalculator.results.confidence')}
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                    <TrendingDown size={18} /> {t('roiCalculator.results.breakdown')}
                                </h4>
                                {Object.entries(result.breakdown).map(([key, val]) => (
                                    <div key={key} className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg flex justify-between items-center">
                                        <div>
                                            <div className="font-semibold text-slate-900 dark:text-white capitalize">{key.replace('_', ' ')}</div>
                                            <div className="text-xs text-slate-500 dark:text-slate-400">{val.description}</div>
                                        </div>
                                        <div className="font-bold text-emerald-600">{formatCurrency(val.amount)}</div>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-4">
                                <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                    <ExternalLink size={18} /> {t('roiCalculator.results.similarCaseStudy')}
                                </h4>
                                {result.relevant_case_studies.map((study, idx) => (
                                    <div key={idx} className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                                        <div className="font-bold text-slate-900 dark:text-white">{study.client}</div>
                                        <div className="text-sm text-slate-600 dark:text-slate-400 mb-2">{study.outcome}</div>
                                        <a href={study.link} className="text-emerald-600 text-sm font-bold hover:underline">{t('roiCalculator.results.readCaseStudy')} →</a>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ROICalculator;
