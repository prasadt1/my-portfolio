import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Clock,
  FileText,
  Loader2,
  AlertCircle,
  Calendar,
  TrendingUp
} from 'lucide-react';
import SEO from '../components/SEO';
import { PageShell, PageHeader, Container } from '../components/layout';

interface RiskRadarInputs {
  industry: string;
  companySize: string;
  platformState: string;
  initiative: string;
  urgency: string;
  compliance: string;
  integration: string;
  constraints: string;
}

interface RiskRadarResult {
  risks: Array<{
    title: string;
    severity: 'high' | 'medium' | 'low';
    area: string;
    mitigation: string;
  }>;
  tradeoffs: Array<{
    title: string;
    options: Array<{
      label: string;
      pros: string[];
      cons: string[];
    }>;
  }>;
  plan: {
    week1: string[];
    week2: string[];
    week3: string[];
  };
  deliverables: string[];
}

const RiskRadarPage: React.FC = () => {
  const { t } = useTranslation();
  const [inputs, setInputs] = useState<RiskRadarInputs>({
    industry: '',
    companySize: '',
    platformState: '',
    initiative: '',
    urgency: '',
    compliance: '',
    integration: '',
    constraints: ''
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<RiskRadarResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/risk-radar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(inputs)
      });

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error('QUOTA_EXCEEDED');
        }
        if (response.status >= 500) {
          throw new Error('SERVER_ERROR');
        }
        const data = await response.json();
        throw new Error(data.error || 'UNKNOWN_ERROR');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      if (err instanceof Error) {
        if (err.message === 'QUOTA_EXCEEDED' || err.message.includes('quota')) {
          setError('quota');
        } else if (err.message === 'SERVER_ERROR' || err.message.includes('server')) {
          setError('server');
        } else {
          setError('unknown');
        }
      } else {
        setError('unknown');
      }
    } finally {
      setLoading(false);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800';
      case 'medium':
        return 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800';
      default:
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800';
    }
  };

  return (
    <>
      <SEO
        title="Transformation Risk Radar | Prasad Tilloo"
        description="Get a structured risk snapshot and 3-week plan for your modernization initiative. Professional architecture assessment tool."
      />
      <PageShell background="default" containerMaxWidth="6xl" className="pt-24">
        <PageHeader
          title={t('riskRadar.title')}
          subtitle={t('riskRadar.subtitle')}
        />

        <Container maxWidth="6xl">
          {/* Disclaimer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4"
          >
            <div className="flex items-start gap-3">
              <AlertCircle className="text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" size={20} />
              <p className="text-sm text-amber-800 dark:text-amber-300">
                {t('riskRadar.disclaimer')}
              </p>
            </div>
          </motion.div>

          {!result && !error && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden"
            >
              <div className="p-8">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                  {t('riskRadar.form.title')}
                </h2>
                <p className="text-slate-600 dark:text-slate-300 mb-8">
                  {t('riskRadar.form.helper')}
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                        {t('riskRadar.form.industry')}
                      </label>
                      <select
                        value={inputs.industry}
                        onChange={(e) => setInputs({ ...inputs, industry: e.target.value })}
                        required
                        className="w-full px-4 py-3 border rounded-lg dark:bg-slate-700 dark:border-slate-600 dark:text-white focus:ring-2 focus:ring-emerald-500"
                      >
                        <option value="">{t('riskRadar.form.select')}</option>
                        <option value="healthcare">Healthcare & Pharma</option>
                        <option value="financial">Financial Services</option>
                        <option value="ecommerce">eCommerce & Retail</option>
                        <option value="manufacturing">Manufacturing</option>
                        <option value="technology">Technology</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                        {t('riskRadar.form.companySize')}
                      </label>
                      <select
                        value={inputs.companySize}
                        onChange={(e) => setInputs({ ...inputs, companySize: e.target.value })}
                        required
                        className="w-full px-4 py-3 border rounded-lg dark:bg-slate-700 dark:border-slate-600 dark:text-white focus:ring-2 focus:ring-emerald-500"
                      >
                        <option value="">{t('riskRadar.form.select')}</option>
                        <option value="small">Small (&lt; 50)</option>
                        <option value="medium">Medium (50-500)</option>
                        <option value="large">Large (&gt; 500)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                        {t('riskRadar.form.platformState')}
                      </label>
                      <select
                        value={inputs.platformState}
                        onChange={(e) => setInputs({ ...inputs, platformState: e.target.value })}
                        required
                        className="w-full px-4 py-3 border rounded-lg dark:bg-slate-700 dark:border-slate-600 dark:text-white focus:ring-2 focus:ring-emerald-500"
                      >
                        <option value="">{t('riskRadar.form.select')}</option>
                        <option value="on-prem">On-premises</option>
                        <option value="hybrid">Hybrid</option>
                        <option value="cloud-native">Cloud-native</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                        {t('riskRadar.form.initiative')}
                      </label>
                      <select
                        value={inputs.initiative}
                        onChange={(e) => setInputs({ ...inputs, initiative: e.target.value })}
                        required
                        className="w-full px-4 py-3 border rounded-lg dark:bg-slate-700 dark:border-slate-600 dark:text-white focus:ring-2 focus:ring-emerald-500"
                      >
                        <option value="">{t('riskRadar.form.select')}</option>
                        <option value="cloud-migration">Cloud migration</option>
                        <option value="modernization">Modernization</option>
                        <option value="integration">Integration</option>
                        <option value="data-platform">Data platform</option>
                        <option value="ai-enablement">AI enablement discovery</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                        {t('riskRadar.form.urgency')}
                      </label>
                      <select
                        value={inputs.urgency}
                        onChange={(e) => setInputs({ ...inputs, urgency: e.target.value })}
                        required
                        className="w-full px-4 py-3 border rounded-lg dark:bg-slate-700 dark:border-slate-600 dark:text-white focus:ring-2 focus:ring-emerald-500"
                      >
                        <option value="">{t('riskRadar.form.select')}</option>
                        <option value="low">Low (exploring options)</option>
                        <option value="medium">Medium (planning phase)</option>
                        <option value="high">High (decision needed soon)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                        {t('riskRadar.form.compliance')}
                      </label>
                      <select
                        value={inputs.compliance}
                        onChange={(e) => setInputs({ ...inputs, compliance: e.target.value })}
                        required
                        className="w-full px-4 py-3 border rounded-lg dark:bg-slate-700 dark:border-slate-600 dark:text-white focus:ring-2 focus:ring-emerald-500"
                      >
                        <option value="">{t('riskRadar.form.select')}</option>
                        <option value="gdpr">GDPR</option>
                        <option value="hipaa">HIPAA</option>
                        <option value="iso27001">ISO 27001</option>
                        <option value="soc2">SOC 2</option>
                        <option value="other">Other</option>
                        <option value="none">None</option>
                        <option value="not-sure">Not sure</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                        {t('riskRadar.form.integration')}
                      </label>
                      <select
                        value={inputs.integration}
                        onChange={(e) => setInputs({ ...inputs, integration: e.target.value })}
                        required
                        className="w-full px-4 py-3 border rounded-lg dark:bg-slate-700 dark:border-slate-600 dark:text-white focus:ring-2 focus:ring-emerald-500"
                      >
                        <option value="">{t('riskRadar.form.select')}</option>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                      {t('riskRadar.form.constraints')}
                    </label>
                    <textarea
                      value={inputs.constraints}
                      onChange={(e) => setInputs({ ...inputs, constraints: e.target.value })}
                      placeholder={t('riskRadar.form.constraintsPlaceholder')}
                      rows={3}
                      className="w-full px-4 py-3 border rounded-lg dark:bg-slate-700 dark:border-slate-600 dark:text-white focus:ring-2 focus:ring-emerald-500 resize-y"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl disabled:opacity-70 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="animate-spin" size={20} />
                        {t('riskRadar.form.loading')}
                      </>
                    ) : (
                      <>
                        <AlertTriangle size={20} />
                        {t('riskRadar.form.submit')}
                      </>
                    )}
                  </button>
                </form>
              </div>
            </motion.div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-8"
            >
              <div className="text-center mb-6">
                <AlertCircle className="mx-auto text-amber-600 dark:text-amber-400 mb-4" size={48} />
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                  {t('riskRadar.errors.title')}
                </h3>
                <p className="text-slate-600 dark:text-slate-300">
                  {t('riskRadar.errors.text')}
                </p>
              </div>
              <div className="text-center">
                <a
                  href="https://calendly.com/prasad-sgsits/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl"
                >
                  {t('riskRadar.cta.primary')}
                  <ArrowRight size={20} />
                </a>
              </div>
            </motion.div>
          )}

          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              {/* Results Header */}
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-8 text-center">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                  {t('riskRadar.results.title')}
                </h2>
                <p className="text-slate-600 dark:text-slate-300">
                  {t('riskRadar.results.subtitle')}
                </p>
              </div>

              {/* Risks */}
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-8">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                  <AlertTriangle className="text-red-600" size={24} />
                  {t('riskRadar.results.risks')}
                </h3>
                <div className="space-y-4">
                  {result.risks.map((risk, idx) => (
                    <div
                      key={idx}
                      className="border-l-4 border-slate-200 dark:border-slate-700 pl-4 py-2"
                    >
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <h4 className="font-bold text-slate-900 dark:text-white">{risk.title}</h4>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold border ${getSeverityColor(risk.severity)}`}
                        >
                          {risk.severity.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">{risk.area}</p>
                      <p className="text-slate-700 dark:text-slate-300">{risk.mitigation}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tradeoffs */}
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-8">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                  <TrendingUp className="text-blue-600" size={24} />
                  {t('riskRadar.results.tradeoffs')}
                </h3>
                <div className="space-y-6">
                  {result.tradeoffs.map((tradeoff, idx) => (
                    <div key={idx}>
                      <h4 className="font-bold text-slate-900 dark:text-white mb-4">{tradeoff.title}</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        {tradeoff.options.map((option, optIdx) => (
                          <div
                            key={optIdx}
                            className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4 border border-slate-200 dark:border-slate-700"
                          >
                            <div className="font-semibold text-slate-900 dark:text-white mb-3">
                              {option.label}
                            </div>
                            <div className="space-y-2">
                              <div>
                                <div className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase mb-1">
                                  Pros
                                </div>
                                <ul className="text-sm text-slate-600 dark:text-slate-300 space-y-1">
                                  {option.pros.map((pro, proIdx) => (
                                    <li key={proIdx} className="flex items-start gap-2">
                                      <CheckCircle2 className="text-emerald-500 mt-0.5 flex-shrink-0" size={14} />
                                      <span>{pro}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <div className="text-xs font-bold text-red-700 dark:text-red-400 uppercase mb-1">
                                  Cons
                                </div>
                                <ul className="text-sm text-slate-600 dark:text-slate-300 space-y-1">
                                  {option.cons.map((con, conIdx) => (
                                    <li key={conIdx} className="flex items-start gap-2">
                                      <AlertCircle className="text-red-500 mt-0.5 flex-shrink-0" size={14} />
                                      <span>{con}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 3-Week Plan */}
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-8">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                  <Calendar className="text-purple-600" size={24} />
                  {t('riskRadar.results.plan')}
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    { week: 'week1', label: 'Week 1' },
                    { week: 'week2', label: 'Week 2' },
                    { week: 'week3', label: 'Week 3' }
                  ].map(({ week, label }) => (
                    <div key={week} className="bg-slate-50 dark:bg-slate-900 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
                      <div className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                        <Clock size={16} />
                        {label}
                      </div>
                      <ul className="space-y-2">
                        {(result.plan[week as keyof typeof result.plan] as string[]).map((item, itemIdx) => (
                          <li key={itemIdx} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                            <CheckCircle2 className="text-emerald-500 mt-0.5 flex-shrink-0" size={14} />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Deliverables */}
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-8">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                  <FileText className="text-orange-600" size={24} />
                  {t('riskRadar.results.deliverables')}
                </h3>
                <ul className="space-y-3">
                  {result.deliverables.map((deliverable, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                      <CheckCircle2 className="text-emerald-500 mt-0.5 flex-shrink-0" size={20} />
                      <span>{deliverable}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Important Note */}
              <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-6">
                <h4 className="font-bold text-amber-900 dark:text-amber-300 mb-2">
                  {t('riskRadar.note.title')}
                </h4>
                <p className="text-sm text-amber-800 dark:text-amber-300">
                  {t('riskRadar.note.text')}
                </p>
              </div>

              {/* CTA */}
              <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 text-white rounded-2xl p-8 text-center">
                <h3 className="text-2xl font-bold mb-2">{t('riskRadar.cta.title')}</h3>
                <p className="text-emerald-100 mb-6 max-w-2xl mx-auto">
                  {t('riskRadar.cta.text')}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="https://calendly.com/prasad-sgsits/30min"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-white text-emerald-600 px-8 py-4 rounded-xl font-bold hover:bg-emerald-50 transition-all shadow-lg"
                  >
                    {t('riskRadar.cta.primary')}
                    <ArrowRight size={20} />
                  </a>
                  <Link
                    to="/projects"
                    className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white px-8 py-4 rounded-xl font-bold hover:bg-white/20 transition-all"
                  >
                    {t('riskRadar.cta.secondary')}
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </Container>
      </PageShell>
    </>
  );
};

export default RiskRadarPage;
