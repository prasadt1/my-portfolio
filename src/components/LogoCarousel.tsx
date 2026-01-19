import React from 'react';

const logos = [
    { src: "/assets/logos/PG.svg", alt: "P&G", className: "h-12 md:h-14" },
    { src: "/assets/logos/Unilever.svg", alt: "Unilever", className: "h-8 md:h-10" },
    { src: "/assets/logos/Siemens-logo.svg", alt: "Siemens", className: "h-5 md:h-6" },
    { src: "/assets/logos/Mercedes-Logo.svg", alt: "Mercedes", className: "h-12 md:h-14" },
    { src: "/assets/logos/Brita_(Unternehmen)_logo.svg", alt: "Brita", className: "h-6 md:h-8" },
    { src: "/assets/logos/Delivery-Hero-Logo-Red.png", alt: "Delivery Hero", className: "h-10 md:h-12" }, // Special handling for colored PNG
    { src: "/assets/logos/Comcast.svg", alt: "Comcast", className: "h-5 md:h-6" },
    { src: "/assets/logos/KP_logo.svg", alt: "Kaiser Permanente", className: "h-5 md:h-6" },
    { src: "/assets/logos/AmeriHealth.svg", alt: "AmeriHealth", className: "h-6 md:h-8" },
    { src: "/assets/logos/PMI.svg", alt: "PMI", className: "h-10 md:h-12" },
    { src: "/assets/logos/DaVita_logo.svg", alt: "DaVita", className: "h-6 md:h-8" },
    { src: "/assets/logos/Ameritas-01.svg", alt: "Ameritas", className: "h-12 md:h-14" },
    { src: "/assets/logos/Anthem.svg", alt: "Anthem", className: "h-6 md:h-8" },
    { src: "/assets/logos/blue-cross-blue-shield-1.svg", alt: "BCBS", className: "h-8 md:h-10" },
    { src: "/assets/logos/ecovadis-vector-logo.svg", alt: "EcoVadis", className: "h-5 md:h-6" }
];

const LogoCarousel: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
    return (
        <div className={`w-full overflow-hidden ${compact ? '' : 'bg-slate-50/50 dark:bg-slate-200 py-10 border-y border-slate-200 dark:border-slate-300'}`}>
            <div className="relative flex overflow-hidden group">
                {/* Single animating track containing duplicate sets */}
                <div className="flex animate-scroll hover:pause">
                    {/* First Set */}
                    <div className="flex shrink-0 gap-16 px-8 items-center min-w-full justify-around">
                        {logos.map((logo, idx) => (
                            <img
                                key={`logo-1-${idx}`}
                                src={logo.src}
                                alt={logo.alt}
                                className={`${logo.className} w-auto object-contain transition-all duration-300 hover:scale-110`}
                            />
                        ))}
                    </div>

                    {/* Second Set (Duplicate for seamless loop) */}
                    <div className="flex shrink-0 gap-16 px-8 items-center min-w-full justify-around">
                        {logos.map((logo, idx) => (
                            <img
                                key={`logo-2-${idx}`}
                                src={logo.src}
                                alt={logo.alt}
                                className={`${logo.className} w-auto object-contain transition-all duration-300 hover:scale-110`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LogoCarousel;
