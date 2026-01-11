import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Linkedin } from 'lucide-react';

type Rec = {
  name: string;
  title: string;
  date: string;
  relation?: string;
  text: string;
  avatarUrl?: string;
  profileUrl?: string;
};

const RECOMMENDATIONS: Rec[] = [
  {
    name: 'Steven Li',
    title: 'Product @ KP',
    date: 'April 14, 2021',
    relation: 'Worked with Prasad (different teams)',
    text: `Prasad tackles the most difficult problems head-on. He was an awesome partner at KP, solution architecting our largest initiatives to transform the digital pharmacy experience on the mobile app. He left no loose ends with any initiative.`,
    profileUrl: 'https://www.linkedin.com/in/stevenli395/',
    avatarUrl: 'https://ui-avatars.com/api/?name=Steven+Li&background=0f172a&color=fff&size=128'
  },
  {
    name: 'Edward Elfreth',
    title: 'Principal Software Engineer',
    date: 'August 12, 2015',
    relation: 'Managed Prasad directly',
    text: `I am currently working with Prasad at a HealthCare client. Prasad is a very skilled developer that needs minimal supervision to get things done. He works very well in the team environment and has all the latest concepts/technologies in his toolbox. I enjoy working with Prasad because he delivers quality code in a timely manner.`,
    profileUrl: 'https://www.linkedin.com/in/edward-elfreth/',
    avatarUrl: 'https://ui-avatars.com/api/?name=Edward+Elfreth&background=0f172a&color=fff&size=128'
  },
  {
    name: 'April Elias',
    title: 'AI Transformation Partner',
    date: 'May 13, 2015',
    relation: 'Worked with Prasad (different companies)',
    text: `Prasad demonstrated immediately and consistently he is an exceptional Sr. Level Developer. He is organized and works well under pressure. Almost without exception, he put the customer first. I have no hesitation in recommending Prasad.`,
    profileUrl: 'https://www.linkedin.com/in/aprilelias/',
    avatarUrl: 'https://ui-avatars.com/api/?name=April+Elias&background=0f172a&color=fff&size=128'
  },
  {
    name: 'Sarang Nandedkar',
    title: 'Assistant Registrar, IIT Kanpur',
    date: 'March 2, 2015',
    relation: 'Studied together',
    text: `Prasad has been a dear friend whom I have known since year 2000. Honesty, openness, ethics and a sincere ongoing effort to keep oneself attuned with positivity and development is what I have always witnessed in him.`,
    profileUrl: 'https://www.linkedin.com/in/sarangnandedkar/',
    avatarUrl: 'https://ui-avatars.com/api/?name=Sarang+Nandedkar&background=0f172a&color=fff&size=128'
  },
  {
    name: 'Shazi Makhdoom',
    title: 'Senior Software Engineering Manager at Jack Henry',
    date: 'October 7, 2014',
    relation: 'Managed Prasad directly',
    text: `I worked with Prasad at HealthTronics and he was an integral part of our Scrum Team. He is team player, who is always very detailed oriented and accountable for his work.`,
    profileUrl: 'https://www.linkedin.com/in/shazi-makhdoom-b9319311/',
    avatarUrl: 'https://ui-avatars.com/api/?name=Shazi+Makhdoom&background=0f172a&color=fff&size=128'
  },
  {
    name: 'Laura Caruso',
    title: 'Lead Business Analyst at World Wide Technology',
    date: 'September 16, 2014',
    relation: 'Worked on same team',
    text: `Prasad and I have worked on the same project for about the past 18 months. I find Prasad's work to be of very high quality and very reliable. He asks the right questions, and he is quick to step in and help.`,
    profileUrl: 'https://www.linkedin.com/in/laura-caruso-4250117/',
    avatarUrl: 'https://ui-avatars.com/api/?name=Laura+Caruso&background=0f172a&color=fff&size=128'
  },
  {
    name: 'Vikas Sharma',
    title: 'Product @ Meta | Wearables',
    date: 'August 20, 2013',
    relation: 'Worked on same team',
    text: `I have worked in the same group as Prasad for two years. I found Prasad very insightful, hard-working and resourceful person. It was a joy working with him.`,
    profileUrl: 'https://www.linkedin.com/in/vikas-sharma-06849b12/',
    avatarUrl: 'https://ui-avatars.com/api/?name=Vikas+Sharma&background=0f172a&color=fff&size=128'
  },
  {
    name: 'Robert Carducci',
    title: 'Remote Technical Lead / Software Architect',
    date: 'August 27, 2012',
    relation: 'Worked on same team',
    text: `Prasad is technically savvy yet easy to work with. He has applied his coding experience to cutting-edge industry standards, creating detailed self-explanatory documents. I highly recommend Prasad.`,
    profileUrl: 'https://www.linkedin.com/in/robertacarducci/',
    avatarUrl: 'https://ui-avatars.com/api/?name=Robert+Carducci&background=0f172a&color=fff&size=128'
  },
  {
    name: 'Daniel Joy',
    title: 'Senior Application Developer',
    date: 'March 16, 2012',
    relation: 'Worked on same project',
    text: `I worked with Prasad directly for about 6-7 months on the same project. He is a good developer and dedicated to his job.`,
    profileUrl: 'https://www.linkedin.com/in/daniel-joy-265352/',
    avatarUrl: 'https://ui-avatars.com/api/?name=Daniel+Joy&background=0f172a&color=fff&size=128'
  },
  {
    name: 'Allwyn Costa',
    title: 'Entrepreneur | Advisor',
    date: 'March 14, 2011',
    relation: 'Senior to Prasad',
    text: `Prasad has an awesome personality coupled with a strong technical background. He is a top notch candidate and I would rate him in the top 10% of the IT industry.`,
    profileUrl: 'https://www.linkedin.com/in/allwyncosta',
    avatarUrl: 'https://ui-avatars.com/api/?name=Allwyn+Costa&background=0f172a&color=fff&size=128'
  },
  {
    name: 'Akshay Joshi',
    title: 'Verint - Customer Experience Automation',
    date: 'February 9, 2011',
    relation: 'Worked on same team',
    text: `In addition to hard work and a positive attitude, Prasad has a real talent for problem solving. You could always count on him if a problem arises.`,
    profileUrl: 'https://www.linkedin.com/in/akshayjo/',
    avatarUrl: 'https://ui-avatars.com/api/?name=Akshay+Joshi&background=0f172a&color=fff&size=128'
  },
  {
    name: 'Neeraj Salpekar',
    title: 'Engineering Squad Lead',
    date: 'February 7, 2011',
    relation: 'Worked on same team',
    text: `Prasad is one of most committed people I have worked with. He is technically very sound and has a great ability to motivate his team members.`,
    profileUrl: 'https://www.linkedin.com/in/neeraj-salpekar/',
    avatarUrl: 'https://ui-avatars.com/api/?name=Neeraj+Salpekar&background=0f172a&color=fff&size=128'
  },
  {
    name: 'Gaurav Vakharia',
    title: 'Director of Marketing | AI Enthusiast',
    date: 'February 7, 2011',
    relation: 'Studied together',
    text: `Prasad is a terrific guy, self motivated, problem solver and maintains his poise and resilience continuously.`,
    profileUrl: 'https://www.linkedin.com/in/gauravvakharia/',
    avatarUrl: 'https://ui-avatars.com/api/?name=Gaurav+Vakharia&background=0f172a&color=fff&size=128'
  },
  {
    name: 'Val Kleyer',
    title: 'Executive Director at NYC Department of Education',
    date: 'July 21, 2009',
    relation: 'Senior to Prasad',
    text: `Prasad was working on development of a new system for City of New York. He was able to complete all tasks assigned to him on time and with a very good quality of code. Prasad will be a very good asset to any development team.`,
    profileUrl: 'https://www.linkedin.com/in/val-kleyer-779759/',
    avatarUrl: 'https://ui-avatars.com/api/?name=Val+Kleyer&background=0f172a&color=fff&size=128'
  },
  {
    name: 'Alex Begun',
    title: 'Solutions Architect',
    date: 'June 14, 2009',
    relation: 'Senior to Prasad',
    text: `Prasad is a brilliant developer, possessing a unique ability to quickly identify and solve complex business problems.`,
    profileUrl: 'https://www.linkedin.com/in/alex-begun-69b86a9/',
    avatarUrl: 'https://ui-avatars.com/api/?name=Alex+Begun&background=0f172a&color=fff&size=128'
  }
];

const RecommendationsCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [itemsPerView, setItemsPerView] = useState(1);
  const intervalRef = useRef<number | null>(null);
  const touchStartX = useRef<number | null>(null);

  // Responsive items per view
  useEffect(() => {
    const calc = () => {
      const w = window.innerWidth;
      if (w >= 1280) setItemsPerView(3);
      else if (w >= 768) setItemsPerView(2);
      else setItemsPerView(1);
    };
    calc();
    window.addEventListener('resize', calc);
    return () => window.removeEventListener('resize', calc);
  }, []);

  // Auto-advance
  useEffect(() => {
    if (isPaused) return;
    const maxIndex = Math.ceil(RECOMMENDATIONS.length / itemsPerView) - 1;
    intervalRef.current = window.setInterval(() => {
      setCurrentIndex((i) => (i + 1) % (maxIndex + 1));
    }, 5000);
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, [isPaused, itemsPerView]);

  const maxIndex = Math.ceil(RECOMMENDATIONS.length / itemsPerView) - 1;

  const goPrev = () => setCurrentIndex((i) => Math.max(0, i - 1));
  const goNext = () => setCurrentIndex((i) => Math.min(maxIndex, i + 1));

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current == null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 50) {
      if (delta > 0) goPrev();
      else goNext();
    }
    touchStartX.current = null;
  };

  return (
    <div 
      className="relative overflow-hidden w-full"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div 
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {RECOMMENDATIONS.map((rec, idx) => (
          <div
            key={idx}
            className="flex-shrink-0"
            style={{ width: `calc(100% / ${itemsPerView})`, padding: '0 0.5rem', boxSizing: 'border-box' }}
          >
            <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-5 h-full flex flex-col">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-slate-900 dark:bg-slate-700 flex items-center justify-center flex-shrink-0 overflow-hidden">
                  {rec.avatarUrl ? (
                    <img 
                      src={rec.avatarUrl} 
                      alt={`${rec.name} avatar`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-white font-bold text-sm">
                      {rec.name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase()}
                    </span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-slate-900 dark:text-white text-sm">{rec.name}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">{rec.title}</div>
                    </div>
                    {rec.profileUrl && (
                      <a
                        href={rec.profileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex-shrink-0"
                        aria-label={`${rec.name} on LinkedIn`}
                      >
                        <Linkedin size={16} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
              <p 
                className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed flex-1"
                style={{
                  display: '-webkit-box',
                  WebkitLineClamp: 4,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}
              >
                {rec.text}
              </p>
              <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
                <span className="text-xs text-slate-400 dark:text-slate-500">{rec.date}</span>
                {rec.relation && (
                  <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                    {rec.relation}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      {maxIndex > 0 && (
        <>
          <button
            onClick={goPrev}
            disabled={currentIndex === 0}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 rounded-full p-2 shadow-lg hover:bg-white dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all z-10"
            aria-label="Previous recommendation"
          >
            <ChevronLeft size={20} className="text-slate-600 dark:text-slate-300" />
          </button>
          <button
            onClick={goNext}
            disabled={currentIndex >= maxIndex}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 rounded-full p-2 shadow-lg hover:bg-white dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all z-10"
            aria-label="Next recommendation"
          >
            <ChevronRight size={20} className="text-slate-600 dark:text-slate-300" />
          </button>
        </>
      )}

      {/* Indicators */}
      {maxIndex > 0 && (
        <div className="flex justify-center gap-2 mt-4">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`h-2 rounded-full transition-all ${
                i === currentIndex
                  ? 'bg-emerald-600 dark:bg-emerald-500 w-8'
                  : 'bg-slate-300 dark:bg-slate-600 w-2 hover:bg-slate-400 dark:hover:bg-slate-500'
              }`}
              aria-label={`Go to recommendation ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default RecommendationsCarousel;
