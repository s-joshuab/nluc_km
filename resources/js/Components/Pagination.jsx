import { Link } from '@inertiajs/react';

export default function Pagination({ data }) {
  if (!data || !data.links) return null;
  return (
    <div className="flex flex-wrap items-center gap-1 mt-5">
      {data.links.map((l, i) => (
        <Link
          key={i}
          href={l.url || '#'}
          preserveScroll
          className={`inline-flex items-center justify-center min-w-[34px] h-8 px-2.5 text-sm rounded-lg border transition-all duration-150
            ${l.active
              ? 'bg-emerald-600 text-white border-emerald-600 font-semibold shadow-sm'
              : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:border-slate-300'
            }
            ${!l.url ? 'opacity-35 pointer-events-none' : ''}
          `}
          dangerouslySetInnerHTML={{ __html: l.label }}
        />
      ))}
      <span className="text-xs text-slate-400 ml-2">
        {data.from ?? 0}–{data.to ?? 0} of <strong className="text-slate-600">{data.total ?? 0}</strong>
      </span>
    </div>
  );
}
