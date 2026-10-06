import PublicLayout from '../../Layouts/PublicLayout';
import Pagination from '../../Components/Pagination';
import EmptyState from '../../Components/EmptyState';
import { Link, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Researchers({ rows, filters, colleges }) {
  const [f, setF] = useState(filters || {});
  const submit = (e) => {
    e?.preventDefault();
    router.get('/researchers', f, { preserveState: true, preserveScroll: true, only: ['rows'] });
  };
  return (
    <>
      <div className="flex items-center justify-between mb-1">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Researchers</h1>
          <p className="text-sm text-slate-400 mt-0.5">
            NLUC researchers with archived studies in the repository.
          </p>
        </div>
        <div className="text-sm text-slate-400 hidden sm:block">
          <strong className="text-slate-700">{rows.total ?? 0}</strong> researchers
        </div>
      </div>

      {/* ── FILTER BAR ───────────────────────────────────────────── */}
      <form onSubmit={submit} className="bg-white border border-slate-100 rounded-xl shadow-sm p-3 grid md:grid-cols-3 gap-2 mt-4">
        <div className="relative">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            placeholder="Search name…"
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
        <button className="bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-sm px-3 py-2 font-medium transition-colors shadow-sm flex items-center justify-center gap-1.5">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          Search
        </button>
      </form>

      {/* ── RESULTS ──────────────────────────────────────────────── */}
      <div className="grid md:grid-cols-3 gap-3 mt-4">
        {rows.data.map((u) => (
          <Link
            key={u.id}
            href={`/researchers/${u.id}`}
            className="group bg-white border border-slate-100 rounded-xl p-4 flex items-center gap-3 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
          >
            <div className="w-11 h-11 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm shrink-0">
              {(u.first_name?.[0] || '')}{(u.last_name?.[0] || '')}
            </div>
            <div className="min-w-0 flex-1">
              <div className="font-semibold text-sm text-slate-800 group-hover:text-emerald-700 transition-colors truncate">
                {u.first_name} {u.last_name}
              </div>
              <div className="text-xs text-slate-400 mt-0.5">
                {u.college?.code || u.college?.name || '—'} • {u.researches_count} {u.researches_count === 1 ? 'study' : 'studies'}
              </div>
            </div>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4 text-slate-300 group-hover:text-emerald-500 shrink-0 transition-colors">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </Link>
        ))}
      </div>

      {rows.data.length === 0 && (
        <div className="mt-4">
          <EmptyState
            title="No researchers found"
            hint="Try adjusting your search filters."
          />
        </div>
      )}
      <Pagination data={rows} />
    </>
  );
}


Researchers.layout = (page) => <PublicLayout>{page}</PublicLayout>;
