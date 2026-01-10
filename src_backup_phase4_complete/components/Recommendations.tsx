import React, { useEffect, useRef, useState } from 'react';

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

type RecommendationsProps = {
  mode?: 'carousel' | 'scroll'
}

const Recommendations: React.FC<RecommendationsProps> = ({ mode = 'carousel' }) => {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [autoplay, setAutoplay] = useState(true);
  const [intervalSecs, setIntervalSecs] = useState(4);
  const [itemsPerView, setItemsPerView] = useState(1);
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});
  const intervalRef = useRef<number | null>(null);
  const touchStartX = useRef<number | null>(null);
  const length = RECOMMENDATIONS.length;

  // responsive items per view
  useEffect(() => {
    const calc = () => {
      const w = window.innerWidth;
      if (w >= 1200) setItemsPerView(3);
      else if (w >= 768) setItemsPerView(2);
      else setItemsPerView(1);
    };
    calc();
    window.addEventListener('resize', calc);
    return () => window.removeEventListener('resize', calc);
  }, []);

  // auto-advance
  useEffect(() => {
    if (!autoplay || isPaused) return;
    intervalRef.current = window.setInterval(() => {
      setIndex((i) => (i + 1) % Math.ceil(length));
    }, Math.max(500, intervalSecs * 1000));
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, [autoplay, isPaused, intervalSecs, length]);

  const goPrev = () => setIndex((i) => Math.max(0, i - 1));
  const goNext = () => setIndex((i) => Math.min(Math.ceil(length / itemsPerView) - 1, i + 1));

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current == null) return;
    const delta = (e.changedTouches[0].clientX - touchStartX.current);
    const SWIPE_THRESHOLD = 50;
    if (delta > SWIPE_THRESHOLD) goPrev();
    else if (delta < -SWIPE_THRESHOLD) goNext();
    touchStartX.current = null;
  };

  // number of pages
  const pages = Math.ceil(length / itemsPerView);

  

  // scroll mode: an alternative layout optimized for narrow sidebars
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [scrollIdx, setScrollIdx] = useState(0);

  useEffect(() => {
    if (mode !== 'scroll' || !autoplay || isPaused) return;
    const interval = window.setInterval(() => {
      setScrollIdx((i) => (i + 1) % Math.ceil(length));
    }, Math.max(500, intervalSecs * 1000));
    return () => window.clearInterval(interval);
  }, [mode, autoplay, isPaused, intervalSecs, length]);

  useEffect(() => {
    if (mode !== 'scroll' || !scrollRef.current) return;
    const container = scrollRef.current;
    const child = container.children[scrollIdx] as HTMLElement | undefined;
    if (child) {
      container.scrollTo({ left: child.offsetLeft - 8, behavior: 'smooth' });
    }
  }, [scrollIdx, mode]);

  return (
    <section style={{ marginBottom: '1.5rem', maxWidth: '100%', overflowX: 'hidden', boxSizing: 'border-box' }} aria-label="Recommendations" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.5rem' }}>
        <h2 style={{ fontSize: '1.75rem', fontFamily: 'Crimson Text, serif' }}>Recommendations</h2>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <label style={{ fontSize: '0.85rem', color: '#64748b' }}>
            <input type="checkbox" checked={autoplay} onChange={(e) => setAutoplay(e.target.checked)} style={{ marginRight: 6 }} /> Autoplay
          </label>
          <label style={{ fontSize: '0.85rem', color: '#64748b', display: 'flex', gap: '0.25rem', alignItems: 'center' }}>
            <span style={{ color: '#94a3b8' }}>Interval</span>
            <input type="number" value={intervalSecs} min={1} onChange={(e) => setIntervalSecs(Number(e.target.value) || 1)} style={{ width: 48, padding: '0.15rem', borderRadius: 4, border: '1px solid #e2e8f0' }} />s
          </label>
        </div>
      </div>

      {mode === 'carousel' ? (
        <div style={{ position: 'relative', overflow: 'hidden' }} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
          <div style={{ display: 'flex', transition: 'transform 500ms ease', transform: `translateX(-${index * (100)}%)` }}>
          {RECOMMENDATIONS.map((r, idx) => (
            <div key={idx} style={{ width: `${100 / itemsPerView}%`, boxSizing: 'border-box', padding: '0.5rem' }}>
              <div style={{ padding: '0.75rem', backgroundColor: 'white', borderRadius: '0.75rem', border: '1px solid #e2e8f0', minHeight: '150px', display: 'flex', gap: '0.75rem', alignItems: 'stretch', flexDirection: 'row' }}>
                <div style={{ width: 48, height: 48, borderRadius: '50%', backgroundColor: '#0f172a', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.95rem', flexShrink: 0, marginTop: 4 }}>
                  {r.avatarUrl ? <img src={r.avatarUrl} alt={`${r.name} avatar`} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} /> : r.name.split(' ').map(n => n[0]).slice(0,2).join('').toUpperCase()}
                </div>

                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '0.5rem' }}>
                      <div>
                        <div style={{ fontWeight: 700 }}>{r.name}</div>
                        <div style={{ fontSize: '0.875rem', color: '#64748b' }}>{r.title} · <span style={{ color: '#94a3b8' }}>{r.date}</span></div>
                      </div>
                      {r.relation && <div style={{ fontSize: '0.75rem', color: '#16a34a', fontWeight: 600 }}>{r.relation}</div>}
                    </div>

                    <p style={{ marginTop: '0.5rem', color: '#475569', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: expanded[idx] ? 'none' : 4, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {r.text}
                    </p>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
                    <div>
                      {r.text.length > 220 && (
                        <button onClick={() => setExpanded((s) => ({ ...s, [idx]: !s[idx] }))} style={{ background: 'none', border: 'none', color: '#16a34a', cursor: 'pointer', fontWeight: 600 }}>
                          {expanded[idx] ? 'Show less' : 'Read more'}
                        </button>
                      )}
                    </div>

                    <div>
                      {r.profileUrl ? (
                        <a href={r.profileUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', color: '#0f172a', fontWeight: 700, textDecoration: 'none', border: '1px solid #e2e8f0', padding: '0.35rem 0.6rem', borderRadius: 6 }}>
                          View on LinkedIn
                        </a>
                      ) : (
                        <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>No profile</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          </div>

          {/* Controls */}
          <button onClick={goPrev} aria-label="Previous" style={{ position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)', background: 'rgba(15,23,42,0.9)', color: 'white', border: 'none', padding: '0.4rem 0.5rem', borderRadius: '999px', cursor: 'pointer', boxShadow: '0 2px 6px rgba(2,6,23,0.12)', zIndex: 20 }}>◀</button>
          <button onClick={goNext} aria-label="Next" style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', background: 'rgba(15,23,42,0.9)', color: 'white', border: 'none', padding: '0.4rem 0.5rem', borderRadius: '999px', cursor: 'pointer', boxShadow: '0 2px 6px rgba(2,6,23,0.12)', zIndex: 20 }}>▶</button>

          {/* Indicators */}
          <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', bottom: 8, display: 'flex', gap: '0.5rem' }}>
            {Array.from({ length: pages }).map((_, i) => (
              <button key={i} onClick={() => setIndex(i)} aria-label={`Go to recommendation ${i+1}`} style={{ width: 8, height: 8, borderRadius: 4, border: 'none', background: i === index ? '#16a34a' : '#cbd5e1', padding: 0, cursor: 'pointer' }} />
            ))}
          </div>
        </div>
      ) : (
        /* scroll mode: horizontal scrollable list optimized for sidebar width */
        <>
        <div ref={scrollRef} onScroll={() => {
            if (!scrollRef.current) return;
            const container = scrollRef.current;
            const idx = Math.round(container.scrollLeft / container.clientWidth);
            setScrollIdx(idx);
          }} style={{ display: 'flex', gap: 12, overflowX: 'auto', scrollBehavior: 'smooth', padding: '0.5rem 0', maxWidth: '100%', scrollSnapType: 'x mandatory' }}>
          {RECOMMENDATIONS.map((r, idx) => (
            <div key={idx} style={{ minWidth: '100%', flex: '0 0 100%', boxSizing: 'border-box', scrollSnapAlign: 'start' }}>
              <div style={{ padding: '0.75rem', backgroundColor: 'white', borderRadius: '0.75rem', border: '1px solid #e2e8f0', minHeight: '120px', display: 'flex', gap: '0.75rem', alignItems: 'stretch', flexDirection: 'column', boxSizing: 'border-box' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <div style={{ width: 40, height: 40, borderRadius: '50%', backgroundColor: '#0f172a', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.9rem', flexShrink: 0 }}>
                      {r.avatarUrl ? <img loading="lazy" src={r.avatarUrl} alt={`${r.name} avatar`} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} /> : r.name.split(' ').map(n => n[0]).slice(0,2).join('').toUpperCase()}
                    </div>
                    <div>
                      <div style={{ fontWeight: 700 }}>{r.name}</div>
                      <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{r.title}</div>
                    </div>
                  </div>
                  {r.profileUrl && (
                    <a href={r.profileUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#0f172a', fontWeight: 700, textDecoration: 'none', fontSize: '0.85rem' }}>LinkedIn</a>
                  )}
                </div>
                <div style={{ marginTop: 8, color: '#475569', fontSize: '0.9rem', lineHeight: 1.4, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical' }}>
                  {r.text}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 8 }}>
          {RECOMMENDATIONS.map((_, i) => (
            <button key={i} onClick={() => {
              if (!scrollRef.current) return;
              const container = scrollRef.current;
              const child = container.children[i] as HTMLElement | undefined;
              if (child) container.scrollTo({ left: child.offsetLeft - 8, behavior: 'smooth' });
            }} aria-label={`Go to recommendation ${i+1}`} style={{ width: 8, height: 8, borderRadius: 4, border: 'none', background: i === scrollIdx ? '#16a34a' : '#cbd5e1', padding: 0, cursor: 'pointer' }} />
          ))}
        </div>
        </>
      )}
    </section>
  );
};

export default Recommendations;
