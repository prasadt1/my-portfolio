import React, { useMemo, useState } from 'react';

type Props = {
  categories: Record<string, string[]>;
};

const TechChips: React.FC<Props> = ({ categories }) => {
  const [activeCategories, setActiveCategories] = useState<Record<string, boolean>>({});
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const [query, setQuery] = useState<string>('');

  // Initialize selected from localStorage
  React.useEffect(() => {
    try {
      const raw = localStorage.getItem('selectedTechs');
      if (raw) {
        const arr: string[] = JSON.parse(raw);
        const map: Record<string, boolean> = {};
        arr.forEach((t) => (map[t] = true));
        setSelected(map);
      }
    } catch (e) {
      // ignore
    }
  }, []);

  // Persist selected to localStorage and broadcast change
  React.useEffect(() => {
    const selectedArray = Object.keys(selected).filter((k) => selected[k]);
    try {
      localStorage.setItem('selectedTechs', JSON.stringify(selectedArray));
    } catch (e) {
      // ignore
    }
    // dispatch custom event for same-tab listeners
    window.dispatchEvent(new CustomEvent('techSelectionChanged', { detail: { selected: selectedArray } }));
  }, [selected]);

  const allTechs = useMemo(() => {
    const set = new Set<string>();
    Object.values(categories).forEach((arr) => arr.forEach((t) => set.add(t)));
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [categories]);

  const categoriesList = useMemo(() => ['All', ...Object.keys(categories)], [categories]);

  const toggleCategory = (cat: string) => {
    if (cat === 'All') {
      setActiveCategories({});
      return;
    }
    setActiveCategories((s) => ({ ...s, [cat]: !s[cat] }));
  };

  const techsForActive = useMemo(() => {
    const activeKeys = Object.keys(activeCategories).filter((k) => activeCategories[k]);
    if (activeKeys.length === 0) return allTechs;
    const set = new Set<string>();
    activeKeys.forEach((k) => {
      (categories[k] || []).forEach((t) => set.add(t));
    });
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [activeCategories, categories, allTechs]);

  const techsToShow = useMemo(() => {
    const list = techsForActive.filter((t) => t.toLowerCase().includes(query.toLowerCase()));
    return list;
  }, [techsForActive, query]);

  const toggleSelect = (tech: string) => {
    setSelected((s) => ({ ...s, [tech]: !s[tech] }));
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {categoriesList.map((cat) => {
          const active = cat !== 'All' && !!activeCategories[cat];
          return (
            <button
              key={cat}
              onClick={() => toggleCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors border ${cat === 'All'
                ? 'bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-600'
                : active
                  ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800'
                  : 'bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-600'
                }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      <div className="flex items-center gap-2">
        <input
          aria-label="Filter techs"
          placeholder="Search tech..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-shadow"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {techsToShow.map((tech) => {
          const cats = Object.keys(categories).filter((k) => categories[k].includes(tech));
          return (
            <button
              key={tech}
              onClick={() => toggleSelect(tech)}
              title={cats.length ? `Categories: ${cats.join(', ')}` : ''}
              aria-label={tech}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors border ${selected[tech]
                ? 'bg-emerald-600 border-emerald-600 text-white shadow-sm hover:bg-emerald-700'
                : 'bg-slate-50 dark:bg-slate-700 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-600 hover:border-slate-300 dark:hover:border-slate-500'
                }`}
            >
              {tech}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TechChips;
