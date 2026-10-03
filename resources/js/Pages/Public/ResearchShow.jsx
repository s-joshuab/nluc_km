import PublicLayout from '../../Layouts/PublicLayout';
import StatusBadge from '../../Components/StatusBadge';
import { Link, usePage } from '@inertiajs/react';

function authorsOf(r) {
  const names = [];
  if (r.lead_researcher) names.push(`${r.lead_researcher.first_name} ${r.lead_researcher.last_name}`);
  (r.team || []).forEach((t) => {
    const n = `${t.user?.first_name} ${t.user?.last_name}${t.role ? ` (${t.role.name})` : ''}`;
    if (n.trim() && !names.includes(n)) names.push(n);
  });
  return names;
}

export default function ResearchShow({ item, pubs, iec, innovations }) {
  const { auth } = usePage().props;
  return (
    <PublicLayout>
      <div className="text-xs text-gray-500">
        <Link href="/" className="hover:underline">Home</Link> / <Link href="/catalog" className="hover:underline">Catalog</Link> / {item.research_code}
      </div>
      <div className="bg-white border rounded-xl p-5 md:p-6 mt-2">
        <div className="text-[11px] text-gray-500">{item.research_code} • {item.college?.name} • {item.type?.name}</div>
        <h1 className="text-lg md:text-xl font-bold text-gray-800 mt-1">{item.title}</h1>
        <div className="mt-2 flex gap-1.5 flex-wrap"><StatusBadge value={item.status?.name} />{item.sdg_alignment && <StatusBadge value={item.sdg_alignment} />}</div>

        <h2 className="text-sm font-semibold text-gray-700 mt-4">Researchers</h2>
        <div className="text-sm text-gray-600">{authorsOf(item).join('; ') || '—'}</div>

        <h2 className="text-sm font-semibold text-gray-700 mt-4">Abstract</h2>
        <p className="text-sm text-gray-700 whitespace-pre-wrap mt-1">{item.abstract || 'No abstract provided.'}</p>

        <div className="grid md:grid-cols-2 gap-3 mt-4 text-sm">
          <div><span className="text-xs text-gray-500">Keywords</span><div className="text-gray-700">{item.keywords || '—'}</div></div>
          <div><span className="text-xs text-gray-500">Research Area</span><div className="text-gray-700">{item.area?.name || '—'}</div></div>
          <div><span className="text-xs text-gray-500">Duration</span><div className="text-gray-700">{item.start_date || '?'} → {item.end_date || '?'}</div></div>
          <div><span className="text-xs text-gray-500">Year</span><div className="text-gray-700">{item.date_submitted?.slice(0, 4) || '—'}</div></div>
        </div>

        {(pubs.length > 0 || iec.length > 0 || innovations.length > 0) && (
          <div className="mt-5">
            <h2 className="text-sm font-semibold text-gray-700">Related Outputs</h2>
            <div className="mt-2 space-y-1.5 text-sm">
              {pubs.map((p) => <div key={`p${p.id}`} className="text-gray-700">📄 {p.title} <span className="text-xs text-gray-500">({p.journal || p.type?.name} • {p.publication_date?.slice(0, 4)})</span></div>)}
              {iec.map((m) => <div key={`i${m.id}`} className="text-gray-700">📘 {m.title} <span className="text-xs text-gray-500">({m.type?.name})</span></div>)}
              {innovations.map((n) => <div key={`n${n.id}`} className="text-gray-700">💡 {n.title} <span className="text-xs text-gray-500">({n.type?.name})</span></div>)}
            </div>
          </div>
        )}

        <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-4 flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="text-2xl">🔒</div>
          <div className="flex-1 text-sm">
            <div className="font-semibold text-gray-800">This is a public preview — abstract and basic metadata only.</div>
            <div className="text-gray-600 text-xs mt-0.5">Complete details, attached files, and downloads are available to authorized NLUC accounts after login.</div>
          </div>
          {auth?.user ? (
            <Link href={`/repository/${item.id}`} className="text-sm px-4 py-2 bg-gray-800 text-white rounded-md whitespace-nowrap">View full record</Link>
          ) : (
            <Link href="/login" className="text-sm px-4 py-2 bg-emerald-600 text-white rounded-md whitespace-nowrap">Login to view all</Link>
          )}
        </div>
      </div>
    </PublicLayout>
  );
}
