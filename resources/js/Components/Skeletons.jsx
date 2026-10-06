// Skeleton shimmer shown over the content area while a visit is in flight.
// The sidebar/header stay mounted — only data reloads.
export function ContentSkeleton() {
  return (
    <div className="absolute inset-0 z-10 bg-white/75 backdrop-blur-[1px] rounded-xl">
      <div className="p-5 space-y-3 animate-pulse" aria-hidden="true">
        <div className="h-5 bg-slate-200 rounded-lg w-1/3" />
        <div className="h-3 bg-slate-100 rounded w-1/2" />
        <div className="grid grid-cols-3 gap-3 pt-2">
          <div className="h-16 bg-slate-100 rounded-xl" />
          <div className="h-16 bg-slate-100 rounded-xl" />
          <div className="h-16 bg-slate-100 rounded-xl" />
        </div>
        <div className="space-y-2 pt-2">
          <div className="h-10 bg-slate-100 rounded-lg" />
          <div className="h-10 bg-slate-100 rounded-lg" />
          <div className="h-10 bg-slate-100 rounded-lg" />
          <div className="h-10 bg-slate-100 rounded-lg" />
        </div>
      </div>
    </div>
  );
}

export function TableSkeleton({ rows = 6, cols = 5 }) {
  return (
    <div className="space-y-2 animate-pulse" aria-hidden="true">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex gap-2">
          {Array.from({ length: cols }).map((_, j) => (
            <div key={j} className="h-9 bg-slate-100 rounded-lg flex-1" />
          ))}
        </div>
      ))}
    </div>
  );
}
