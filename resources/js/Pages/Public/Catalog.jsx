import PublicLayout from '../../Layouts/PublicLayout';
import StatusBadge from '../../Components/StatusBadge';
import Pagination from '../../Components/Pagination';
import EmptyState from '../../Components/EmptyState';
import { Link, router } from '@inertiajs/react';
import { useState } from 'react';

function authorsOf(r) {
  const names = [];
  if (r.lead_researcher) names.push(`${r.lead_researcher.first_name} ${r.lead_researcher.last_name}`);
  (r.team || []).forEach((t) => {
    const n = `${t.user?.first_name} ${t.user?.last_name}`;
    if (n.trim() && !names.includes(n)) names.push(n);
  });
  return names.join(', ') || '—';
}

export default function Catalog({ rows, filters, types, colleges, years }) {
  const [f, setF] = useState(filters || {});
  const submit = (e) => {
    e?.preventDefault();
    router.get('/catalog', f, { preserveState: true, preserveScroll: true, only: ['rows'] });
  };

  return (
    <>
      <div className="flex items-center justify-between mb-1">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Research Catalog</h1>
          <p className="text-sm text-slate-400 mt-0.5">
            Public view shows titles, authors, and abstracts.{' '}
            <Link href="/login" className="text-emerald-600 hover:underline font-medium">Login</Link>
            {' '}to view complete records and download files.
          </p>
        </div>
        <div className="text-sm text-slate-400 hidden sm:block">
          <strong className="text-slate-700">{rows.total ?? 0}</strong> records
        </div>
      </div>

      {/* ── FILTER BAR ───────────────────────────────────────────── */}
      <form onSubmit={submit} className="bg-white border border-slate-100 rounded-xl shadow-sm p-3 grid sm:grid-cols-2 md:grid-cols-5 gap-2 mt-4">
        <div className="relative sm:col-span-2 md:col-span-1">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            placeholder="Title / code / keyword"
            value={f.search || ''}
            onChange={(e) => setF({ ...f, search: e.target.value })}
            className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:bg-white focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 focus:outline-none transition-all"
          />
        </div>
        <select
          value={f.college_id || ''}
          onChange={(e) => setF({ ...f, college_id: e.target.value })}
          className="border border-slate-200 rounded-lg px-3 py-2 text-sm bg-slate-50 focus:bg-white focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 focus:outline-none transition-all"
        >
          <option value="">All Colleges</option>
          {colleges.map((c) => <option key={c.id} value={c.id}>{c.code} — {c.name}</option>)}
        </select>
        <select
          value={f.research_type_id || ''}
          onChange={(e) => setF({ ...f, research_type_id: e.target.value })}
          className="border border-slate-200 rounded-lg px-3 py-2 text-sm bg-slate-50 focus:bg-white focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 focus:outline-none transition-all"
        >
          <option value="">All Types</option>
          {types.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
        </select>
        <select
          value={f.year || ''}
          onChange={(e) => setF({ ...f, year: e.target.value })}
          className="border border-slate-200 rounded-lg px-3 py-2 text-sm bg-slate-50 focus:bg-white focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 focus:outline-none transition-all"
        >
          <option value="">All Years</option>
          {years.map((y) => <option key={y} value={y}>{y}</option>)}
        </select>
        <button className="bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-sm px-4 py-2 font-medium transition-colors shadow-sm flex items-center justify-center gap-1.5">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          Search
        </button>
      </form>

      {/* ── RESULTS ──────────────────────────────────────────────── */}
      <div className="grid md:grid-cols-2 gap-3 mt-4">
        {rows.data.map((r) => (
          <div key={r.id} className="bg-white border border-slate-100 rounded-xl p-4 flex flex-col shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
            <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-mono">
              <span className="bg-slate-100 px-1.5 py-0.5 rounded">{r.research_code}</span>
              {r.college?.code && <><span>•</span><span>{r.college.code}</span></>}
              {r.date_submitted?.slice(0, 4) && <><span>•</span><span>{r.date_submitted.slice(0, 4)}</span></>}
            </div>
            <Link href={`/catalog/${r.id}`} className="font-semibold text-sm mt-2 text-slate-800 hover:text-emerald-700 line-clamp-2 leading-snug transition-colors">
              {r.title}
            </Link>
            <div className="text-xs text-slate-400 mt-1.5 truncate">{authorsOf(r)}</div>
            {r.abstract && (
              <p className="text-xs text-slate-500 mt-2 line-clamp-3 leading-relaxed flex-1">
                {r.abstract.slice(0, 200)}{(r.abstract?.length || 0) > 200 ? '…' : ''}
              </p>
            )}
            <div className="mt-3 flex items-center justify-between">
              <div className="flex gap-1.5 flex-wrap">
                <StatusBadge value={r.status?.name} />
                <StatusBadge value={r.type?.name} />
              </div>
              <Link href={`/catalog/${r.id}`} className="text-xs font-semibold text-emerald-600 hover:text-emerald-800 whitespace-nowrap ml-2 transition-colors">
                View abstract →
              </Link>
            </div>
          </div>
        ))}
      </div>

      {rows.data.length === 0 && (
        <EmptyState
          title="No research found"
          hint="Try adjusting your search filters or browse all records."
        />
      )}

      <Pagination data={rows} />
    </>
  );
}


Catalog.layout = (page) => <PublicLayout>{page}</PublicLayout>;
