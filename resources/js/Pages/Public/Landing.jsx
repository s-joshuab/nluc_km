import PublicLayout from '../../Layouts/PublicLayout';
import StatusBadge from '../../Components/StatusBadge';
import { Link, usePage } from '@inertiajs/react';

function authorsOf(r) {
  const names = [];
  if (r.lead_researcher) names.push(`${r.lead_researcher.first_name} ${r.lead_researcher.last_name}`);
  (r.team || []).forEach((t) => {
    const n = `${t.user?.first_name} ${t.user?.last_name}`;
    if (n.trim() && !names.includes(n)) names.push(n);
  });
  return names.join(', ') || '—';
}

function yearOf(r) {
  return r.date_submitted?.slice(0, 4) || r.date_completed?.slice(0, 4) || '';
}

function ResearchCard({ r }) {
  return (
    <div className="bg-white border border-slate-100 rounded-xl p-4 flex flex-col shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
      <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-mono">
        <span className="bg-slate-100 px-1.5 py-0.5 rounded">{r.research_code}</span>
        {r.college?.code && <span>• {r.college.code}</span>}
        {yearOf(r) && <span>• {yearOf(r)}</span>}
      </div>
      <Link href={`/catalog/${r.id}`} className="font-semibold text-sm mt-2 text-slate-800 hover:text-emerald-700 line-clamp-2 leading-snug transition-colors">
        {r.title}
      </Link>
      <div className="text-xs text-slate-400 mt-1.5 truncate">{authorsOf(r)}</div>
      {r.abstract && (
        <p className="text-xs text-slate-500 mt-2 line-clamp-3 leading-relaxed flex-1">
          {r.abstract.slice(0, 220)}{(r.abstract?.length || 0) > 220 ? '…' : ''}
        </p>
      )}
      <div className="mt-3 flex items-center justify-between">
        <div className="flex gap-1.5 flex-wrap">
          <StatusBadge value={r.status?.name} />
          <StatusBadge value={r.type?.name} />
        </div>
        <Link href={`/catalog/${r.id}`} className="text-xs font-semibold text-emerald-600 hover:text-emerald-800 whitespace-nowrap ml-2 transition-colors">
          Read →
        </Link>
      </div>
    </div>
  );
}

export default function Landing({ stats, recent, pubs, topResearchers, ipHighlights, copyrights, colleges }) {
  const { auth } = usePage().props;
  const statItems = [
    { label: 'Research Records', value: stats.researches, href: '/catalog',
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg> },
    { label: 'Publications', value: stats.publications, href: '/showcase/publications',
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/></svg> },
    { label: 'Innovations', value: stats.innovations, href: '/showcase/ip-rights',
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5"><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/></svg> },
    { label: 'Researchers', value: stats.researchers, href: '/researchers',
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
    { label: 'Colleges', value: stats.colleges, href: '/catalog',
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg> },
  ];

  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-emerald-950 via-emerald-900 to-teal-900 rounded-2xl text-white p-8 md:p-12 shadow-xl overflow-hidden">
        {/* Decorative orbs */}
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute right-24 -bottom-24 w-64 h-64 bg-teal-300/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-3 py-1 text-[11px] text-emerald-200 font-medium tracking-wider uppercase mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Don Mariano Marcos Memorial State University — North La Union Campus
          </div>
          <h1 className="text-2xl md:text-4xl font-bold leading-tight">
            RPSU Knowledge Management<br />
            <span className="text-emerald-300">& Research System</span>
          </h1>
          <p className="mt-3 text-emerald-100/80 text-sm md:text-base max-w-2xl leading-relaxed">
            The official digital repository of the Research and Publication Services Unit — research, publications,
            IEC materials, innovations, and intellectual property. Abstracts are open to everyone;
            full records and downloads require login.
          </p>

          {/* Search bar */}
          <form action="/catalog" method="get" className="mt-6 flex flex-col sm:flex-row gap-2 max-w-xl">
            <div className="flex-1 flex items-center relative">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4 absolute left-3 text-slate-400 pointer-events-none">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input
                name="search"
                placeholder="Search by title, keyword, researcher, SDG…"
                className="w-full pl-9 pr-3 py-3 text-sm text-slate-800 bg-white rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 shadow-md"
              />
            </div>
            <button className="bg-emerald-500 hover:bg-emerald-400 text-white font-semibold text-sm rounded-xl px-6 py-3 shadow-md transition-colors whitespace-nowrap">
              Search
            </button>
          </form>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 mt-7">
            {statItems.map(({ label, value, href, icon }) => (
              <Link key={label} href={href}
                className="group bg-white/10 hover:bg-white/20 border border-white/10 hover:border-white/25 rounded-xl p-3.5 transition-all duration-200 backdrop-blur-sm"
              >
                <div className="flex items-center gap-2 text-emerald-200/70 mb-1.5 text-xs">{icon} <span className="text-[10px] uppercase tracking-wide">{label}</span></div>
                <div className="text-2xl font-bold text-white">{value ?? 0}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── BROWSE BY COLLEGE ─────────────────────────────────────────── */}
      <section className="mt-8">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-bold text-slate-800 flex items-center gap-2">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4 text-emerald-600">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
            </svg>
            Browse by College
          </h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {colleges.map((c) => (
            <Link key={c.id} href={`/catalog?college_id=${c.id}`}
              className="text-sm bg-white border border-slate-200 hover:border-emerald-400 hover:bg-emerald-50 hover:text-emerald-800 rounded-full px-4 py-1.5 transition-all duration-150 shadow-sm"
            >
              <span className="font-semibold">{c.code}</span>
              <span className="text-slate-400 ml-1">({c.total})</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── LATEST RESEARCH ───────────────────────────────────────────── */}
      <section className="mt-8">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-bold text-slate-800 flex items-center gap-2">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4 text-emerald-600">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
            </svg>
            Latest Research
          </h2>
          <Link href="/catalog" className="text-sm text-emerald-600 hover:text-emerald-800 font-medium transition-colors">View full catalog →</Link>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {recent.map((r) => <ResearchCard key={r.id} r={r} />)}
        </div>
      </section>

      {/* ── PUBLICATIONS + RESEARCHERS ────────────────────────────────── */}
      <section className="grid md:grid-cols-2 gap-4 mt-8">
        {/* Publications */}
        <div className="bg-white border border-slate-100 rounded-xl shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-50">
            <h2 className="font-bold text-slate-800 text-sm flex items-center gap-2">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4 text-sky-600">
                <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/>
              </svg>
              Recent Publications
            </h2>
            <Link href="/showcase/publications" className="text-xs text-emerald-600 hover:underline">View all →</Link>
          </div>
          <div className="p-4 space-y-3">
            {pubs.map((p) => (
              <div key={p.id} className="py-2 border-b border-slate-50 last:border-0">
                <div className="font-medium text-sm text-slate-800 leading-snug">{p.title}</div>
                <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-1">
                  <span>{p.journal || p.publisher || p.type?.name}</span>
                  {p.publication_date && <><span>•</span><span>{p.publication_date.slice(0, 4)}</span></>}
                  <StatusBadge value={p.status?.name} />
                </div>
              </div>
            ))}
            {pubs.length === 0 && <div className="text-xs text-slate-400 py-4 text-center">No publications showcased yet.</div>}
          </div>
        </div>

        {/* Researchers */}
        <div className="bg-white border border-slate-100 rounded-xl shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-50">
            <h2 className="font-bold text-slate-800 text-sm flex items-center gap-2">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4 text-violet-600">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
              Top Researchers
            </h2>
            <Link href="/researchers" className="text-xs text-emerald-600 hover:underline">View all →</Link>
          </div>
          <div className="p-4 space-y-2">
            {topResearchers.map((u, idx) => (
              <Link key={u.id} href={`/researchers/${u.id}`}
                className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-xl transition-colors group"
              >
                <div className="relative shrink-0">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 text-white flex items-center justify-center font-bold text-xs shadow-sm">
                    {(u.first_name?.[0] || '')}{(u.last_name?.[0] || '')}
                  </div>
                  {idx < 3 && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-400 text-white text-[8px] font-bold flex items-center justify-center">
                      {idx + 1}
                    </div>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-medium text-sm text-slate-800 group-hover:text-emerald-700 transition-colors truncate">{u.first_name} {u.last_name}</div>
                  <div className="text-xs text-slate-400">{u.college?.code} • {u.researches_count} {u.researches_count === 1 ? 'study' : 'studies'}</div>
                </div>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4 text-slate-300 group-hover:text-emerald-500 shrink-0 transition-colors">
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── IP & COPYRIGHT ────────────────────────────────────────────── */}
      <section className="mt-6 bg-white border border-slate-100 rounded-xl shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-50">
          <h2 className="font-bold text-slate-800 text-sm flex items-center gap-2">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4 text-amber-600">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
            Intellectual Property & Copyright
          </h2>
          <Link href="/showcase/ip-rights" className="text-xs text-emerald-600 hover:underline">View all →</Link>
        </div>
        <div className="p-4 grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            {ipHighlights.map((i) => (
              <div key={i.id} className="border border-slate-100 rounded-xl p-3 hover:border-emerald-200 hover:bg-emerald-50/40 transition-all">
                <div className="font-medium text-sm text-slate-800">{i.title}</div>
                <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-1">
                  <span>{i.type?.name}</span>
                  {i.college?.code && <><span>•</span><span>{i.college.code}</span></>}
                  <StatusBadge value={i.ip_status?.name} />
                </div>
              </div>
            ))}
            {ipHighlights.length === 0 && <div className="text-xs text-slate-400 py-4 text-center">No innovations showcased yet.</div>}
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Repository files by copyright status</div>
            <div className="space-y-2.5">
              {copyrights.map((c) => {
                const max = Math.max(...copyrights.map(x => x.total), 1);
                const pct = Math.round((c.total / max) * 100);
                return (
                  <div key={c.name} className="flex items-center gap-3">
                    <div className="w-36 text-xs text-slate-600 truncate" title={c.name}>{c.name}</div>
                    <div className="flex-1 bg-slate-100 rounded-full h-2">
                      <div className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
                    </div>
                    <div className="text-xs font-bold text-slate-700 w-6 text-right">{c.total}</div>
                  </div>
                );
              })}
              {copyrights.length === 0 && <div className="text-xs text-slate-400 py-4 text-center">No files archived yet.</div>}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────── */}
      {!auth?.user && (
        <section className="mt-8 relative bg-gradient-to-r from-slate-900 to-emerald-950 text-white rounded-2xl p-7 md:p-10 overflow-hidden shadow-xl">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-emerald-800/20 to-transparent pointer-events-none" />
          <div className="relative flex flex-col md:flex-row items-start md:items-center gap-5">
            <div className="flex-1">
              <h2 className="font-bold text-xl">Need the full record or file download?</h2>
              <p className="text-sm text-slate-300 mt-2 leading-relaxed max-w-lg">Public visitors can view abstracts and basic metadata. Login with your authorized NLUC account to view complete details and download permitted files.</p>
            </div>
            <Link href="/login"
              className="shrink-0 inline-flex items-center gap-2 text-sm px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-white rounded-xl font-semibold shadow-lg transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/>
              </svg>
              Login now
            </Link>
          </div>
        </section>
      )}
    </>
  );
}


Landing.layout = (page) => <PublicLayout>{page}</PublicLayout>;
