import PublicLayout from '../../Layouts/PublicLayout';
import StatusBadge from '../../Components/StatusBadge';
import Pagination from '../../Components/Pagination';
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
    router.get('/catalog', f, { preserveState: true });
  };
  return (
    <PublicLayout>
      <h1 className="text-xl font-bold text-gray-800">Research Catalog</h1>
      <p className="text-sm text-gray-500 mt-1">Public view shows titles, authors, and abstracts. <Link href="/login" className="text-emerald-600 hover:underline">Login</Link> to view complete records and download files.</p>

      <form onSubmit={submit} className="bg-white border rounded-xl p-3 grid md:grid-cols-5 gap-2 mt-4">
        <input placeholder="Title / code / keyword" value={f.search || ''} onChange={(e) => setF({ ...f, search: e.target.value })} className="border rounded-md px-2.5 py-2 text-sm" />
        <select value={f.college_id || ''} onChange={(e) => setF({ ...f, college_id: e.target.value })} className="border rounded-md px-2.5 py-2 text-sm">
          <option value="">All Colleges</option>
          {colleges.map((c) => <option key={c.id} value={c.id}>{c.code} — {c.name}</option>)}
        </select>
        <select value={f.research_type_id || ''} onChange={(e) => setF({ ...f, research_type_id: e.target.value })} className="border rounded-md px-2.5 py-2 text-sm">
          <option value="">All Types</option>
          {types.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
        </select>
        <select value={f.year || ''} onChange={(e) => setF({ ...f, year: e.target.value })} className="border rounded-md px-2.5 py-2 text-sm">
          <option value="">All Years</option>
          {years.map((y) => <option key={y} value={y}>{y}</option>)}
        </select>
        <button className="bg-emerald-600 text-white rounded-md text-sm px-3 py-2">Search</button>
      </form>

      <div className="grid md:grid-cols-2 gap-3 mt-4">
        {rows.data.map((r) => (
          <div key={r.id} className="bg-white border rounded-xl p-4 flex flex-col">
            <div className="text-[11px] text-gray-500">{r.research_code} • {r.college?.code} • {r.date_submitted?.slice(0, 4)}</div>
            <Link href={`/catalog/${r.id}`} className="font-semibold text-sm mt-1 hover:text-emerald-700">{r.title}</Link>
            <div className="text-xs text-gray-500 mt-1">{authorsOf(r)}</div>
            <p className="text-xs text-gray-600 mt-2 line-clamp-3">{r.abstract?.slice(0, 200)}{(r.abstract?.length || 0) > 200 ? '…' : ''}</p>
            <div className="mt-2 flex gap-1.5 flex-wrap"><StatusBadge value={r.status?.name} /><StatusBadge value={r.type?.name} /></div>
            <Link href={`/catalog/${r.id}`} className="mt-3 text-xs font-semibold text-emerald-600 hover:underline">View abstract →</Link>
          </div>
        ))}
      </div>
      {rows.data.length === 0 && <div className="bg-white border rounded-xl p-8 text-center text-gray-500 text-sm mt-4">No research found.</div>}
      <Pagination data={rows} />
    </PublicLayout>
  );
}
