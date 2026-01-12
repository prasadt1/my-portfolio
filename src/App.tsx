import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Outlet, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Navigation from './components/Navigation';
import { AnalyticsProvider } from './components/AnalyticsProvider';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import { ThemeProvider } from './context/ThemeContext';
import { Loader2 } from 'lucide-react';
import './i18n';

// Lazy load optional components for performance
const ChatAssistant = lazy(() => import('./components/ChatAssistant'));
const CommandPalette = lazy(() => import('./components/CommandPalette'));
const ExitIntentPopup = lazy(() => import('./components/ExitIntentPopup'));
const HireMeBanner = lazy(() => import('./components/HireMeBanner'));

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

// Layout Component
const Layout: React.FC = () => {
  const location = useLocation();
  
  // Conditionally show ChatAssistant only on specific pages
  const showChatAssistant = ['/', '/services', '/contact'].includes(location.pathname);
  
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      <Suspense fallback={null}>
        <CommandPalette />
      </Suspense>
      <Navigation />
      <main className="pt-20">
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
    </div>
  );
};

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <BrowserRouter>
          <AnalyticsProvider>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path="services" element={<ServicesPage />} />
                <Route path="climate-tech" element={<ClimateTechPage />} />
                <Route path="about" element={<AboutPage />} />
                <Route path="projects" element={<ProjectsPage />} />
                <Route path="projects/:slug" element={<CaseStudyPage />} />
                <Route path="architecture-engine" element={<ArchitectureEngine />} />
                <Route path="contact" element={<ContactPage />} />
                <Route path="consultation" element={<ConsultationPage />} />
              </Route>
            </Routes>
            <Suspense fallback={null}>
              <ExitIntentPopup />
            </Suspense>
          </AnalyticsProvider>
        </BrowserRouter>
      </ThemeProvider>
    </HelmetProvider>
  );
};

export default App;

