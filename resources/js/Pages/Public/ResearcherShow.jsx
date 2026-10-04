import PublicLayout from '../../Layouts/PublicLayout';
import StatusBadge from '../../Components/StatusBadge';
import EmptyState from '../../Components/EmptyState';
import { Link } from '@inertiajs/react';

export default function ResearcherShow({ profile, rows }) {
  return (
    <PublicLayout>
      <div className="text-xs text-slate-400">
        <Link href="/" className="hover:text-emerald-700 hover:underline transition-colors">Home</Link>
        {' / '}
        <Link href="/researchers" className="hover:text-emerald-700 hover:underline transition-colors">Researchers</Link>
        {' / '}
        <span className="text-slate-600">{profile.first_name} {profile.last_name}</span>
      </div>

      {/* ── PROFILE CARD ─────────────────────────────────────────── */}
      <div className="bg-white border border-slate-100 rounded-xl p-5 mt-2 flex items-center gap-4 shadow-sm">
        <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-lg shrink-0">
          {(profile.first_name?.[0] || '')}{(profile.last_name?.[0] || '')}
        </div>
        <div className="min-w-0">
          <h1 className="text-lg font-bold text-slate-800 truncate">
            {profile.first_name} {profile.last_name}
          </h1>
          <div className="text-sm text-slate-400 mt-0.5">
            {profile.college?.name || '—'} • {rows.length} {rows.length === 1 ? 'study' : 'studies'} in repository
          </div>
        </div>
      </div>

      {/* ── STUDIES ──────────────────────────────────────────────── */}
      <div className="flex items-center justify-between mt-6 mb-3">
        <h2 className="font-bold text-slate-800 flex items-center gap-2">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4 text-emerald-600">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
          </svg>
          Studies in Repository
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-3">
        {rows.map((r) => (
          <div key={r.id} className="bg-white border border-slate-100 rounded-xl p-4 flex flex-col shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
            <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-mono">
              <span className="bg-slate-100 px-1.5 py-0.5 rounded">{r.research_code}</span>
              {r.date_submitted?.slice(0, 4) && <><span>•</span><span>{r.date_submitted.slice(0, 4)}</span></>}
            </div>
            <Link href={`/catalog/${r.id}`} className="font-semibold text-sm mt-2 text-slate-800 hover:text-emerald-700 line-clamp-2 leading-snug transition-colors">
              {r.title}
            </Link>
            {r.abstract && (
              <p className="text-xs text-slate-500 mt-2 line-clamp-3 leading-relaxed flex-1">
                {r.abstract.slice(0, 200)}{(r.abstract?.length || 0) > 200 ? '…' : ''}
              </p>
            )}
            <div className="mt-3 flex items-center justify-between">
              <div className="flex gap-1.5 flex-wrap">
                <StatusBadge value={r.status?.name} />
              </div>
              <Link href={`/catalog/${r.id}`} className="text-xs font-semibold text-emerald-600 hover:text-emerald-800 whitespace-nowrap ml-2 transition-colors">
                View abstract →
              </Link>
            </div>
          </div>
        ))}
      </div>

      {rows.length === 0 && (
        <div className="mt-4">
          <EmptyState
            title="No studies found"
            hint="This researcher has no archived studies yet."
          />
        </div>
      )}
    </PublicLayout>
  );
}
