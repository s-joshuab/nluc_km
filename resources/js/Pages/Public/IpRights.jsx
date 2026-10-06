import PublicLayout from '../../Layouts/PublicLayout';
import StatusBadge from '../../Components/StatusBadge';
import Pagination from '../../Components/Pagination';
import EmptyState from '../../Components/EmptyState';
import { Link } from '@inertiajs/react';

export default function IpRights({ rows, summary, copyrights }) {
  const stats = [
    {
      label: 'Innovations',
      value: summary.total ?? 0,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4 text-emerald-600">
          <line x1="12" y1="2" x2="12" y2="6" /><line x1="12" y1="18" x2="12" y2="22" />
          <line x1="4.93" y1="4.93" x2="7.76" y2="7.76" /><line x1="16.24" y1="16.24" x2="19.07" y2="19.07" />
          <line x1="2" y1="12" x2="6" y2="12" /><line x1="18" y1="12" x2="22" y2="12" />
        </svg>
      ),
    },
    {
      label: 'IP Protected / Copyrighted',
      value: summary.protected ?? 0,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4 text-emerald-600">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      ),
    },
    {
      label: 'Technologies',
      value: summary.technologies ?? 0,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4 text-emerald-600">
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <rect x="9" y="9" width="6" height="6" />
          <line x1="9" y1="1" x2="9" y2="4" /><line x1="15" y1="1" x2="15" y2="4" />
          <line x1="9" y1="20" x2="9" y2="23" /><line x1="15" y1="20" x2="15" y2="23" />
          <line x1="20" y1="9" x2="23" y2="9" /><line x1="20" y1="14" x2="23" y2="14" />
          <line x1="1" y1="9" x2="4" y2="9" /><line x1="1" y1="14" x2="4" y2="14" />
        </svg>
      ),
    },
  ];

  const maxCopyright = Math.max(...(copyrights || []).map((x) => x.total), 1);

  return (
    <>
      <div className="mb-1">
        <h1 className="text-xl font-bold text-slate-800">Intellectual Property &amp; Copyright</h1>
        <p className="text-sm text-slate-400 mt-0.5">
          Innovations, technologies, and copyright status of repository holdings. Detailed documents require login.
        </p>
      </div>

      {/* ── STATS ────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wide font-semibold text-slate-400">
              {s.icon}
              {s.label}
            </div>
            <div className="text-xl font-bold text-slate-800 mt-1.5">{s.value}</div>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-4 mt-4">
        {/* ── INNOVATIONS ────────────────────────────────────────── */}
        <div className="bg-white border border-slate-100 rounded-xl shadow-sm overflow-hidden flex flex-col">
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-50">
            <h2 className="font-bold text-slate-800 text-sm flex items-center gap-2">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4 text-amber-600">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              Innovations
            </h2>
            <span className="inline-flex items-center bg-slate-100 text-slate-600 text-[11px] px-2 py-0.5 rounded-full font-semibold">
              {rows.total ?? rows.data.length}
            </span>
          </div>
          <div className="p-4 space-y-2 flex-1">
            {rows.data.map((i) => (
              <div key={i.id} className="border border-slate-100 rounded-xl p-3 hover:border-emerald-200 hover:bg-emerald-50/40 transition-all">
                <div className="font-medium text-sm text-slate-800 leading-snug">{i.title}</div>
                {i.description && (
                  <div className="text-xs text-slate-500 mt-1.5 line-clamp-2 leading-relaxed">
                    {i.description.slice(0, 200)}
                  </div>
                )}
                <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-1.5">
                  <span>{i.type?.name}</span>
                  {i.college?.code && <><span>•</span><span>{i.college.code}</span></>}
                  {i.development_date?.slice(0, 4) && <><span>•</span><span>{i.development_date.slice(0, 4)}</span></>}
                </div>
                <div className="mt-1.5">
                  <StatusBadge value={i.ip_status?.name} />
                </div>
              </div>
            ))}
            {rows.data.length === 0 && (
              <div className="text-xs text-slate-400 py-4 text-center">No innovations showcased yet.</div>
            )}
          </div>
          <div className="px-4 pb-3">
            <Pagination data={rows} />
          </div>
        </div>

        {/* ── COPYRIGHT ──────────────────────────────────────────── */}
        <div className="bg-white border border-slate-100 rounded-xl shadow-sm overflow-hidden h-fit">
          <div className="px-4 py-3 border-b border-slate-50">
            <h2 className="font-bold text-slate-800 text-sm flex items-center gap-2">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4 text-emerald-600">
                <rect x="3" y="11" width="18" height="11" rx="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              Repository Files by Copyright Status
            </h2>
          </div>
          <div className="p-4">
            <div className="space-y-2.5">
              {(copyrights || []).map((c) => {
                const pct = Math.round(((c.total || 0) / maxCopyright) * 100);
                return (
                  <div key={c.name}>
                    <div className="flex items-center gap-3">
                      <div className="w-36 text-xs text-slate-600 truncate" title={c.name}>{c.name}</div>
                      <div className="flex-1 bg-slate-100 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <div className="text-xs font-bold text-slate-700 w-6 text-right">{c.total}</div>
                    </div>
                    {c.description && <div className="text-[11px] text-slate-400 mt-1 ml-0">{c.description}</div>}
                  </div>
                );
              })}
              {(copyrights || []).length === 0 && (
                <div className="text-xs text-slate-400 py-4 text-center">No files archived yet.</div>
              )}
            </div>
            <div className="text-xs text-slate-500 border-t border-slate-50 pt-3 mt-4 leading-relaxed">
              Copyrighted and restricted materials are never publicly downloadable.{' '}
              <Link href="/login" className="text-emerald-600 hover:underline font-medium">Login</Link>
              {' '}with an authorized account to request access.
            </div>
          </div>
        </div>
      </div>

      {rows.data.length === 0 && (copyrights || []).length === 0 && (
        <div className="mt-4">
          <EmptyState
            title="No intellectual property showcased yet"
            hint="Check back later for innovations and copyrighted holdings."
          />
        </div>
      )}
    </>
  );
}


IpRights.layout = (page) => <PublicLayout>{page}</PublicLayout>;
