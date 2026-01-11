import React, { useEffect } from 'react';
import SEO from '../components/SEO';
import { Loader2 } from 'lucide-react';

const ConsultationPage: React.FC = () => {
    useEffect(() => {
        // Redirect to Calendly after 2 seconds
        const timer = setTimeout(() => {
            window.location.href = 'https://calendly.com/prasad-sgsits/30min';
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <SEO
                title="Book Consultation | Pradad Tilloo"
                description="Schedule a strategy call to discuss your enterprise transformation needs."
            />

            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-600 to-blue-600">
                <div className="text-center text-white bg-white/10 backdrop-blur-md p-12 rounded-3xl border border-white/20 shadow-2xl">
                    <Loader2 className="animate-spin h-16 w-16 text-white mx-auto mb-8" />
                    <h1 className="text-4xl font-bold mb-4">
                        Redirecting to Scheduler...
                    </h1>
                    <p className="text-xl text-white/90">
                        Preparing your strategy slot.
                        <br />
                        If not redirected, <a href="https://calendly.com/prasad-sgsits/30min" className="underline font-bold hover:text-emerald-200">click here</a>.
                    </p>
                </div>
            </div>
        </>
    );
};

export default ConsultationPage;
