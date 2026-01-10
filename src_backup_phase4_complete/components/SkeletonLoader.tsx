
export const ProjectCardSkeleton = () => (
    <div className="bg-white rounded-xl p-6 border border-slate-200 animate-pulse">
        <div className="h-6 bg-slate-200 rounded w-3/4 mb-4" />
        <div className="h-4 bg-slate-200 rounded w-1/2 mb-4" />
        <div className="space-y-2 mb-4">
            <div className="h-3 bg-slate-200 rounded" />
            <div className="h-3 bg-slate-200 rounded w-5/6" />
        </div>
        <div className="flex gap-2">
            <div className="h-6 bg-slate-200 rounded w-16" />
            <div className="h-6 bg-slate-200 rounded w-16" />
            <div className="h-6 bg-slate-200 rounded w-16" />
        </div>
    </div>
);

export const TimelineSkeleton = () => (
    <div className="space-y-6 animate-pulse">
        {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-xl p-6 border border-slate-200">
                <div className="h-6 bg-slate-200 rounded w-1/2 mb-3" />
                <div className="h-4 bg-slate-200 rounded w-1/3 mb-4" />
                <div className="space-y-2">
                    <div className="h-3 bg-slate-200 rounded" />
                    <div className="h-3 bg-slate-200 rounded w-4/5" />
                </div>
            </div>
        ))}
    </div>
);
