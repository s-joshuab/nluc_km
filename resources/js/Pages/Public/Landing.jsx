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
    <div className="bg-white border border-slate-200 rounded-xl p-5 md:p-6 flex flex-col shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500">
        <span className="bg-slate-100 px-2 py-1 rounded font-mono text-slate-700">{r.research_code}</span>
        {r.college?.code && <span>• {r.college.code}</span>}
        {yearOf(r) && <span>• {yearOf(r)}</span>}
      </div>
      <Link href={`/catalog/${r.id}`} className="font-semibold text-base mt-4 text-slate-900 hover:text-emerald-700 line-clamp-2 leading-snug transition-colors">
        {r.title}
      </Link>
      <div className="text-sm text-slate-600 mt-2 line-clamp-2">{authorsOf(r)}</div>
      {r.abstract && (
        <p className="text-sm text-slate-600 mt-3 line-clamp-3 leading-relaxed flex-1">
          {r.abstract.slice(0, 220)}{(r.abstract?.length || 0) > 220 ? '…' : ''}
        </p>
      )}
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-1.5 flex-wrap">
          <StatusBadge value={r.status?.name} />
          <StatusBadge value={r.type?.name} />
        </div>
        <Link href={`/catalog/${r.id}`} className="text-sm font-semibold text-emerald-700 hover:text-emerald-900 whitespace-nowrap transition-colors">
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
      <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 md:p-12 shadow-sm">
        <div>
          <div className="mb-7 border-l-4 border-emerald-700 pl-4">
            <p className="text-sm font-semibold leading-snug text-slate-900">
              Don Mariano Marcos Memorial State University
            </p>
            <p className="mt-1 text-xs font-bold uppercase tracking-wider text-emerald-800">
              North La Union Campus
            </p>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold leading-tight tracking-tight text-slate-900">
            RPSU Knowledge Management<br />
            <span className="text-emerald-800">& Research System</span>
          </h1>
          <p className="mt-5 text-slate-600 text-base max-w-2xl leading-relaxed">
            The official digital repository of the Research and Publication Services Unit — research, publications,
            IEC materials, innovations, and intellectual property. Abstracts are open to everyone;
            full records and downloads require login.
          </p>

          {/* Search bar */}
          <form action="/catalog" method="get" role="search" className="mt-8 flex flex-col sm:flex-row gap-3 max-w-2xl">
            <div className="flex-1 flex items-center relative">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4 absolute left-3 text-slate-400 pointer-events-none">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input
                name="search"
                aria-label="Search research"
                placeholder="Search by title, keyword, researcher, SDG…"
                className="w-full pl-10 pr-4 py-3 text-base text-slate-900 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <button className="bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-base rounded-xl px-7 py-3 transition-colors whitespace-nowrap">
              Search
            </button>
          </form>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mt-10 pt-8 border-t border-slate-200">
            {statItems.map(({ label, value, href, icon }) => (
              <Link key={label} href={href}
                className="group bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-200 rounded-xl p-4 transition-colors duration-200"
              >
                <div className="flex items-center gap-2 text-slate-600 mb-3 text-xs font-medium">{icon} <span>{label}</span></div>
                <div className="text-2xl font-bold text-slate-900">{value ?? 0}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── BROWSE BY COLLEGE ─────────────────────────────────────────── */}
      <section className="mt-12 md:mt-16">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4 text-emerald-600">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
            </svg>
            Browse by College
          </h2>
        </div>
        <div className="flex flex-wrap gap-3">
          {colleges.map((c) => (
            <Link key={c.id} href={`/catalog?college_id=${c.id}`}
              className="text-sm bg-white border border-slate-200 hover:border-emerald-400 hover:bg-emerald-50 hover:text-emerald-800 rounded-full px-4 py-2 transition-colors duration-150"
            >
              <span className="font-semibold">{c.code}</span>
              <span className="text-slate-600 ml-1">({c.total})</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── LATEST RESEARCH ───────────────────────────────────────────── */}
      <section className="mt-12 md:mt-16">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4 text-emerald-600">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
            </svg>
            Latest Research
          </h2>
          <Link href="/catalog" className="text-sm text-emerald-700 hover:text-emerald-900 font-semibold transition-colors">View full catalog →</Link>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {recent.map((r) => <ResearchCard key={r.id} r={r} />)}
        </div>
      </section>

      {/* ── PUBLICATIONS + RESEARCHERS ────────────────────────────────── */}
      <section className="grid md:grid-cols-2 gap-6 mt-12 md:mt-16">
        {/* Publications */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 border-b border-slate-100">
            <h2 className="font-bold text-slate-900 text-lg flex items-center gap-2">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4 text-sky-600">
                <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/>
              </svg>
              Recent Publications
            </h2>
            <Link href="/showcase/publications" className="text-sm font-semibold text-emerald-700 hover:underline">View all →</Link>
          </div>
          <div className="p-5 space-y-4">
            {pubs.map((p) => (
              <div key={p.id} className="pb-4 border-b border-slate-100 last:border-0 last:pb-0">
                <div className="font-semibold text-base text-slate-900 leading-snug">{p.title}</div>
                <div className="flex flex-wrap items-center gap-2 text-sm text-slate-600 mt-2">
                  <span>{p.journal || p.publisher || p.type?.name}</span>
                  {p.publication_date && <><span>•</span><span>{p.publication_date.slice(0, 4)}</span></>}
                  <StatusBadge value={p.status?.name} />
                </div>
              </div>
            ))}
            {pubs.length === 0 && <div className="text-sm text-slate-600 py-4 text-center">No publications showcased yet.</div>}
          </div>
        </div>

        {/* Researchers */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 border-b border-slate-100">
            <h2 className="font-bold text-slate-900 text-lg flex items-center gap-2">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4 text-violet-600">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
              Top Researchers
            </h2>
            <Link href="/researchers" className="text-sm font-semibold text-emerald-700 hover:underline">View all →</Link>
          </div>
          <div className="p-5 space-y-2">
            {topResearchers.map((u, idx) => (
              <Link key={u.id} href={`/researchers/${u.id}`}
                className="flex items-center gap-4 p-3 hover:bg-slate-50 rounded-xl transition-colors group"
              >
                <div className="relative shrink-0">
                  <div className="w-11 h-11 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold text-sm">
                    {(u.first_name?.[0] || '')}{(u.last_name?.[0] || '')}
                  </div>
                  {idx < 3 && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-400 text-white text-[8px] font-bold flex items-center justify-center">
                      {idx + 1}
                    </div>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-semibold text-base text-slate-900 group-hover:text-emerald-700 transition-colors truncate">{u.first_name} {u.last_name}</div>
                  <div className="text-sm text-slate-600">{u.college?.code} • {u.researches_count} {u.researches_count === 1 ? 'study' : 'studies'}</div>
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
      <section className="mt-12 md:mt-16 bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 border-b border-slate-100">
          <h2 className="font-bold text-slate-900 text-lg flex items-center gap-2">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4 text-amber-600">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
            Intellectual Property & Copyright
          </h2>
          <Link href="/showcase/ip-rights" className="text-sm font-semibold text-emerald-700 hover:underline">View all →</Link>
        </div>
        <div className="p-5 md:p-6 grid md:grid-cols-2 gap-8">
          <div className="space-y-3">
            {ipHighlights.map((i) => (
              <div key={i.id} className="border border-slate-200 rounded-xl p-4 hover:border-emerald-200 hover:bg-emerald-50/40 transition-colors">
                <div className="font-semibold text-base text-slate-900">{i.title}</div>
                <div className="flex flex-wrap items-center gap-2 text-sm text-slate-600 mt-2">
                  <span>{i.type?.name}</span>
                  {i.college?.code && <><span>•</span><span>{i.college.code}</span></>}
                  <StatusBadge value={i.ip_status?.name} />
                </div>
              </div>
            ))}
            {ipHighlights.length === 0 && <div className="text-sm text-slate-600 py-4 text-center">No innovations showcased yet.</div>}
          </div>
          <div>
            <h3 className="text-base font-semibold text-slate-900 mb-5">Repository files by copyright status</h3>
            <div className="space-y-4">
              {copyrights.map((c) => {
                const max = Math.max(...copyrights.map(x => x.total), 1);
                const pct = Math.round((c.total / max) * 100);
                return (
                  <div key={c.name} className="flex items-center gap-3">
                    <div className="w-32 sm:w-40 text-sm text-slate-700 truncate" title={c.name}>{c.name}</div>
                    <div className="flex-1 bg-slate-100 rounded-full h-2.5">
                      <div className="bg-emerald-700 h-2.5 rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
                    </div>
                    <div className="text-sm font-bold text-slate-800 w-6 text-right">{c.total}</div>
                  </div>
                );
              })}
              {copyrights.length === 0 && <div className="text-sm text-slate-600 py-4 text-center">No files archived yet.</div>}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────── */}
      {!auth?.user && (
        <section className="mt-12 md:mt-16 bg-emerald-950 text-white rounded-2xl p-7 md:p-10">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10">
            <div className="flex-1">
              <h2 className="font-bold text-xl md:text-2xl">Need the full record or file download?</h2>
              <p className="text-base text-emerald-50 mt-3 leading-relaxed max-w-2xl">Public visitors can view abstracts and basic metadata. Login with your authorized NLUC account to view complete details and download permitted files.</p>
            </div>
            <Link href="/login"
              className="shrink-0 inline-flex items-center gap-2 text-base px-6 py-3 bg-white hover:bg-emerald-50 text-emerald-950 rounded-xl font-semibold transition-colors"
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
