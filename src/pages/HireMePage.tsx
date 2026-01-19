// src/pages/HireMePage.tsx
// Redirects to /hiring (the main "For Recruiters" page) to avoid redundancy

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { trackEvent } from '../services/analytics';

const HireMePage: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Track redirect for analytics
        trackEvent('page_view', {
            page: '/hire-me',
            redirectTo: '/hiring',
            persona: 'hire',
        });
        
        // Redirect to the main hiring page
        navigate('/hiring', { replace: true });
    }, [navigate]);

    return null; // Component doesn't render anything, just redirects
};

export default HireMePage;
