import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Navigation from './components/Navigation';
import ChatAssistant from './components/ChatAssistant';
import { AnalyticsProvider } from './components/AnalyticsProvider';
import HireMeBanner from './components/HireMeBanner';
import ErrorBoundary from './components/ErrorBoundary';
import { ThemeProvider } from './context/ThemeContext';
import { Loader2 } from 'lucide-react';
import CommandPalette from './components/CommandPalette';

// Lazy load pages for performance
const HomePage = lazy(() => import('./pages/HomePageMultiDomain'));
const ProductsPage = lazy(() => import('./pages/ProductsPage'));
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage'));
const ClimateTechPage = lazy(() => import('./pages/ClimateTechPage'));
const FitCheckPage = lazy(() => import('./pages/FitCheckPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'));
const CaseStudyPage = lazy(() => import('./pages/CaseStudyPage'));
const ArchitectureEngine = lazy(() => import('./pages/ArchitectureEngine'));
const ContactPage = lazy(() => import('./pages/ContactPage'));

// Layout Component
const Layout: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      <CommandPalette />
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
      <ChatAssistant />
      <HireMeBanner />
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
                <Route path="about" element={<AboutPage />} />
                <Route path="products" element={<ProductsPage />} />
                <Route path="products/:slug" element={<ProductDetailPage />} />
                <Route path="climate-tech" element={<ClimateTechPage />} />
                <Route path="fit-check" element={<FitCheckPage />} />
                <Route path="projects" element={<ProjectsPage />} />
                <Route path="projects/:slug" element={<CaseStudyPage />} />
                <Route path="architecture-engine" element={<ArchitectureEngine />} />
                <Route path="contact" element={<ContactPage />} />
              </Route>
            </Routes>
          </AnalyticsProvider>
        </BrowserRouter>
      </ThemeProvider>
    </HelmetProvider>
  );
};

export default App;

