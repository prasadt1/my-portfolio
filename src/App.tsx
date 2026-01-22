import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Outlet, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Navigation from './components/Navigation';
import { AnalyticsProvider } from './components/AnalyticsProvider';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import { ThemeProvider } from './context/ThemeContext';
import { FeatureFlagsProvider } from './context/FeatureFlagsProvider';
import { Loader2 } from 'lucide-react';
import { FeatureRouteGuard } from './components/FeatureRouteGuard';
import { canAccessRoute } from './config/featureRouting';
import './i18n';

// Lazy load optional components for performance
const ChatAssistant = lazy(() => import('./components/ChatAssistant'));
const CommandPalette = lazy(() => import('./components/CommandPalette'));
const ExitIntentPopup = lazy(() => import('./components/ExitIntentPopup'));
const HireMeBanner = lazy(() => import('./components/HireMeBanner'));
const StartHereDrawer = lazy(() => import('./components/StartHereDrawer'));

// Lazy load pages for performance
const HomePage = lazy(() => import('./pages/HomePageMultiDomain'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const ClimateTechPage = lazy(() => import('./pages/ClimateTechPage'));
const AboutPage = lazy(() => import('./pages/AboutPage/index'));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'));
const CaseStudyPage = lazy(() => import('./pages/CaseStudyPage'));
const ArchitectureEngine = lazy(() => import('./pages/ArchitectureEngine'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const ConsultationPage = lazy(() => import('./pages/ConsultationPage'));
const RiskRadarPage = lazy(() => import('./pages/RiskRadarPage'));
const HiringPage = lazy(() => import('./pages/HiringPage'));
const GuidePage = lazy(() => import('./pages/GuidePage'));
const ChecklistPage = lazy(() => import('./pages/ChecklistPage'));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'));
const HireMePage = lazy(() => import('./pages/HireMePage'));
const ConsultingPage = lazy(() => import('./pages/ConsultingPage'));
const ResourcesPage = lazy(() => import('./pages/ResourcesPage'));
const UnavailablePage = lazy(() => import('./pages/UnavailablePage'));
const CompetitionPage = lazy(() => import('./pages/CompetitionPage'));
// Phase 5: Lazy load CaseStudyBriefPage for performance
const CaseStudyBriefPage = lazy(() => import('./pages/CaseStudyBriefPage'));
// Admin pages (dev-only, hidden in production)
const FeatureFlagsPage = lazy(() => import('./pages/admin/FeatureFlagsPage'));
const DiagnosticsPage = lazy(() => import('./pages/admin/DiagnosticsPage'));

// Layout Component
const Layout: React.FC = () => {
  const location = useLocation();
  const competitionMode = typeof import.meta !== 'undefined' && (import.meta.env?.VITE_COMPETITION_MODE === 'true' || import.meta.env?.VITE_COMPETITION_MODE === '1');
  
  // Conditionally show ChatAssistant only on specific pages
  const showChatAssistant = ['/', '/services', '/contact'].includes(location.pathname);
  
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      <Suspense fallback={null}>
        <CommandPalette />
      </Suspense>
      <Navigation />
      <main className={competitionMode ? 'pt-32' : 'pt-20'}>
        <ErrorBoundary>
          <Suspense
            fallback={
              <div className="flex items-center justify-center min-h-[50vh]">
                <Loader2 className="animate-spin text-emerald-600" size={32} />
              </div>
            }
          >
            <Outlet />
          </Suspense>
        </ErrorBoundary>
      </main>
      <Footer />
      {showChatAssistant && (
        <Suspense fallback={null}>
          <ChatAssistant />
        </Suspense>
      )}
      <Suspense fallback={null}>
        <HireMeBanner />
      </Suspense>
      <Suspense fallback={null}>
        <StartHereDrawer />
      </Suspense>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <BrowserRouter>
          <FeatureFlagsProvider>
            <AnalyticsProvider>
              <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path="services" element={<ServicesPage />} />
                <Route path="climate-tech" element={<ClimateTechPage />} />
                <Route path="about" element={<AboutPage />} />
                <Route path="projects" element={<ProjectsPage />} />
                <Route path="projects/:slug" element={<CaseStudyPage />} />
                <Route path="brief/:slug" element={<CaseStudyBriefPage />} />
                <Route path="contact" element={<ContactPage />} />
                <Route path="hiring" element={<HiringPage />} />
                <Route path="consultation" element={<ConsultationPage />} />
                <Route path="guide" element={<GuidePage />} />
                <Route path="checklist" element={
                  <FeatureRouteGuard path="/checklist" featureKey="AI_CHECKLIST">
                    <ChecklistPage />
                  </FeatureRouteGuard>
                } />
                <Route path="privacy" element={<PrivacyPage />} />
                {/* Phase 3.2: Competition landing routes */}
                <Route path="hire-me" element={<HireMePage />} />
                <Route path="consulting" element={<ConsultingPage />} />
                <Route path="resources" element={<ResourcesPage />} />
                {/* Phase 3.4A: Competition page */}
                <Route path="competition" element={<CompetitionPage />} />
                {/* Feature routes with guards */}
                <Route path="architecture-engine" element={
                  <FeatureRouteGuard path="/architecture-engine" featureKey="AI_ARCH_ENGINE">
                    <ArchitectureEngine />
                  </FeatureRouteGuard>
                } />
                <Route path="risk-radar" element={
                  <FeatureRouteGuard path="/risk-radar" featureKey="AI_RISK_RADAR">
                    <RiskRadarPage />
                  </FeatureRouteGuard>
                } />
                {/* Admin routes (dev-only) */}
                <Route path="admin/feature-flags" element={<FeatureFlagsPage />} />
                <Route path="admin/diagnostics" element={<DiagnosticsPage />} />
              </Route>
            </Routes>
            <Suspense fallback={null}>
              <ExitIntentPopup />
            </Suspense>
            </AnalyticsProvider>
          </FeatureFlagsProvider>
        </BrowserRouter>
      </ThemeProvider>
    </HelmetProvider>
  );
};

export default App;

