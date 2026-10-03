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

export default function Landing({ stats, recent, pubs, topResearchers, ipHighlights, copyrights, colleges }) {
  const { auth } = usePage().props;
  return (
    <PublicLayout>
      {/* HERO */}
      <section className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-700 rounded-2xl text-white p-8 md:p-12 shadow-xl relative overflow-hidden">
        <div className="absolute -right-16 -top-16 w-64 h-64 bg-white/5 rounded-full" />
        <div className="absolute right-24 -bottom-20 w-48 h-48 bg-white/5 rounded-full" />
        <div className="relative">
        <div className="text-xs uppercase tracking-widest text-emerald-200">Don Mariano Marcos Memorial State University — North La Union Campus</div>
        <h1 className="text-2xl md:text-4xl font-bold mt-2">RPSU Knowledge Management<br />& Research Management System</h1>
        <p className="mt-3 text-emerald-100 text-sm md:text-base max-w-2xl">
          The official digital repository of the Research and Publication Services Unit — research, publications,
          IEC materials, innovations, and intellectual property. Abstracts are open to everyone;
          full records and downloads require login.
        </p>
        <form action="/catalog" method="get" className="mt-5 flex flex-col sm:flex-row gap-2 max-w-xl">
          <input name="search" placeholder="Search by title, keyword, researcher, SDG…" className="flex-1 rounded-md px-4 py-2.5 text-sm text-gray-800" />
          <button className="bg-white text-emerald-700 font-semibold text-sm rounded-md px-5 py-2.5">Search</button>
        </form>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-6">
          {[
            ['Research Records', stats.researches, '/catalog'],
            ['Publications', stats.publications, '/showcase/publications'],
            ['Innovations', stats.innovations, '/showcase/ip-rights'],
            ['Researchers', stats.researchers, '/researchers'],
            ['Colleges', stats.colleges, '/catalog'],
          ].map(([label, value, href]) => (
            <Link key={label} href={href} className="bg-white/10 rounded-lg p-3 hover:bg-white/20 backdrop-blur-sm border border-white/10">
              <div className="text-2xl font-bold">{value}</div>
              <div className="text-xs text-emerald-100">{label}</div>
            </Link>
          ))}
        </div>
        </div>
      </section>

      {/* COLLEGES */}
      <section className="mt-8">
        <h2 className="font-bold text-gray-800">Browse by College</h2>
        <div className="flex flex-wrap gap-2 mt-2">
          {colleges.map((c) => (
            <Link key={c.id} href={`/catalog?college_id=${c.id}`} className="text-sm bg-white border rounded-full px-4 py-1.5 hover:border-emerald-400">
              <span className="font-semibold">{c.code}</span> <span className="text-gray-500">({c.total})</span>
            </Link>
          ))}
        </div>
      </section>

      {/* RECENT RESEARCH */}
      <section className="mt-8">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-gray-800">Latest Research</h2>
          <Link href="/catalog" className="text-sm text-emerald-600 hover:underline">View full catalog →</Link>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 mt-3">
          {recent.map((r) => (
            <div key={r.id} className="bg-white border rounded-xl p-4 flex flex-col">
              <div className="text-[11px] text-gray-500">{r.research_code} • {r.college?.code} • {yearOf(r)}</div>
              <Link href={`/catalog/${r.id}`} className="font-semibold text-sm mt-1 hover:text-emerald-700">{r.title}</Link>
              <div className="text-xs text-gray-500 mt-1">{authorsOf(r)}</div>
              <p className="text-xs text-gray-600 mt-2 line-clamp-3">{r.abstract?.slice(0, 220)}{(r.abstract?.length || 0) > 220 ? '…' : ''}</p>
              <div className="mt-2 flex gap-1.5 flex-wrap"><StatusBadge value={r.status?.name} /><StatusBadge value={r.type?.name} /></div>
              <Link href={`/catalog/${r.id}`} className="mt-3 text-xs font-semibold text-emerald-600 hover:underline">View abstract →</Link>
            </div>
          ))}
        </div>
      </section>

      {/* PUBLICATIONS + RESEARCHERS */}
      <section className="grid md:grid-cols-2 gap-4 mt-8">
        <div className="bg-white border rounded-xl p-4">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-gray-800 text-sm">Recent Publications</h2>
            <Link href="/showcase/publications" className="text-xs text-emerald-600 hover:underline">View all →</Link>
          </div>
          <div className="mt-2 space-y-3">
            {pubs.map((p) => (
              <div key={p.id} className="text-sm">
                <div className="font-medium">{p.title}</div>
                <div className="text-xs text-gray-500">{p.journal || p.publisher || p.type?.name} • {p.publication_date?.slice(0, 4)} • <StatusBadge value={p.status?.name} /></div>
              </div>
            ))}
            {pubs.length === 0 && <div className="text-xs text-gray-400">No publications showcased yet.</div>}
          </div>
        </div>
        <div className="bg-white border rounded-xl p-4">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-gray-800 text-sm">Top Researchers</h2>
            <Link href="/researchers" className="text-xs text-emerald-600 hover:underline">View all →</Link>
          </div>
          <div className="mt-2 space-y-2">
            {topResearchers.map((u) => (
              <Link key={u.id} href={`/researchers/${u.id}`} className="flex items-center gap-3 hover:bg-gray-50 rounded p-1">
                <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
                  {(u.first_name?.[0] || '')}{(u.last_name?.[0] || '')}
                </div>
                <div className="text-sm">
                  <div className="font-medium">{u.first_name} {u.last_name}</div>
                  <div className="text-xs text-gray-500">{u.college?.code} • {u.researches_count} {u.researches_count === 1 ? 'study' : 'studies'}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* IP & COPYRIGHT */}
      <section className="mt-8 bg-white border rounded-xl p-4">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-gray-800 text-sm">Intellectual Property & Copyright</h2>
          <Link href="/showcase/ip-rights" className="text-xs text-emerald-600 hover:underline">View all →</Link>
        </div>
        <div className="grid md:grid-cols-2 gap-4 mt-2">
          <div className="space-y-2">
            {ipHighlights.map((i) => (
              <div key={i.id} className="text-sm border rounded-lg p-2.5">
                <div className="font-medium">{i.title}</div>
                <div className="text-xs text-gray-500 mt-0.5">{i.type?.name} • {i.college?.code} • <StatusBadge value={i.ip_status?.name} /></div>
              </div>
            ))}
            {ipHighlights.length === 0 && <div className="text-xs text-gray-400">No innovations showcased yet.</div>}
          </div>
          <div>
            <div className="text-xs font-semibold text-gray-500 uppercase">Repository files by copyright status</div>
            <div className="mt-2 space-y-1.5">
              {copyrights.map((c) => (
                <div key={c.name} className="flex items-center gap-2 text-sm">
                  <div className="w-40 text-xs">{c.name}</div>
                  <div className="flex-1 bg-gray-100 rounded h-2"><div className="bg-emerald-500 h-2 rounded" style={{ width: `${Math.min(100, c.total * 10)}%` }} /></div>
                  <div className="text-xs font-bold w-8 text-right">{c.total}</div>
                </div>
              ))}
              {copyrights.length === 0 && <div className="text-xs text-gray-400">No files archived yet.</div>}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      {!auth?.user && (
        <section className="mt-8 bg-gray-900 text-white rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="flex-1">
            <h2 className="font-bold">Need the full record or file download?</h2>
            <p className="text-sm text-gray-300 mt-1">Public visitors can view abstracts and basic metadata. Login with your authorized NLUC account to view complete details and download permitted files.</p>
          </div>
          <Link href="/login" className="text-sm px-5 py-2.5 bg-emerald-600 rounded-md font-semibold">Login now</Link>
        </section>
      )}
    </PublicLayout>
  );
}
