import PublicLayout from '../../Layouts/PublicLayout';
import StatusBadge from '../../Components/StatusBadge';
import Pagination from '../../Components/Pagination';
import EmptyState from '../../Components/EmptyState';
import { Link, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Publications({ rows, filters }) {
  const [f, setF] = useState(filters || {});
  const submit = (e) => {
    e?.preventDefault();
    router.get('/showcase/publications', f, { preserveState: true, preserveScroll: true, only: ['rows'] });
  };
  return (
    <>
      <div className="flex items-center justify-between mb-1">
        <div>
          <h1 className="text-xl font-bold text-slate-800">R&amp;E Publications Showcase</h1>
          <p className="text-sm text-slate-400 mt-0.5">
            Published outputs from NLUC research. Full texts require{' '}
            <Link href="/login" className="text-emerald-600 hover:underline font-medium">login</Link>.
          </p>
        </div>
        <div className="text-sm text-slate-400 hidden sm:block">
          <strong className="text-slate-700">{rows.total ?? 0}</strong> records
        </div>
      </div>

      {/* ── FILTER BAR ───────────────────────────────────────────── */}
      <form onSubmit={submit} className="bg-white border border-slate-100 rounded-xl shadow-sm p-3 flex gap-2 mt-4">
        <div className="relative flex-1">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            placeholder="Search title / journal…"
            value={f.search || ''}
            onChange={(e) => setF({ ...f, search: e.target.value })}
            className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:bg-white focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 focus:outline-none transition-all"
          />
        </div>
        <button className="bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-sm px-4 py-2 font-medium transition-colors shadow-sm flex items-center justify-center gap-1.5 whitespace-nowrap">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          Search
        </button>
      </form>

      {/* ── RESULTS ──────────────────────────────────────────────── */}
      <div className="space-y-3 mt-4">
        {rows.data.map((p) => (
          <div key={p.id} className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-200">
            <div className="font-semibold text-sm text-slate-800 leading-snug">{p.title}</div>
            <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-1.5 flex-wrap">
              {p.journal && <span>{p.journal}</span>}
              {p.publisher && <><span>•</span><span>{p.publisher}</span></>}
              {p.publication_date?.slice(0, 4) && <><span>•</span><span>{p.publication_date.slice(0, 4)}</span></>}
              {p.type?.name && <><span>•</span><span>{p.type.name}</span></>}
              {p.research && (
                <><span>•</span><span>from <span className="font-mono text-emerald-700">{p.research.research_code}</span></span></>
              )}
            </div>
            {p.abstract && (
              <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                {p.abstract.slice(0, 250)}{p.abstract.length > 250 ? '…' : ''}
              </p>
            )}
            <div className="mt-2.5 flex items-center gap-2 flex-wrap">
              <StatusBadge value={p.status?.name} />
              {p.doi && <span className="font-mono text-[11px] text-slate-400">DOI: {p.doi}</span>}
              {p.url && <a href={p.url} target="_blank" className="text-xs font-medium text-emerald-600 hover:text-emerald-800 transition-colors">External link →</a>}
            </div>
          </div>
        ))}
      </div>

      {rows.data.length === 0 && (
        <div className="mt-4">
          <EmptyState
            title="No publications found"
            hint="Try adjusting your search or browse all showcased outputs."
          />
        </div>
      )}
      <Pagination data={rows} />
    </>
  );
}


Publications.layout = (page) => <PublicLayout>{page}</PublicLayout>;
