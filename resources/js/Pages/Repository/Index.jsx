import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import Pagination from '../../Components/Pagination';
import StatusBadge from '../../Components/StatusBadge';
import { router, Link } from '@inertiajs/react';
import { useState } from 'react';
export default function Index({ rows, filters, lookups }) {
  const [f, setF] = useState(filters || {});
  const submit = (e) => { e?.preventDefault(); router.get('/repository', f, { preserveState: true }); };
  return (
    <AuthenticatedLayout header="Research Repository">
      <form onSubmit={submit} className="bg-white border rounded p-3 grid md:grid-cols-4 gap-2 mb-3">
        <input placeholder="Title / code / keyword" value={f.search||''} onChange={(e)=>setF({...f, search:e.target.value})} className="border rounded px-2 py-1.5 text-sm" />
        <select value={f.college_id||''} onChange={(e)=>setF({...f, college_id:e.target.value})} className="border rounded px-2 py-1.5 text-sm"><option value="">All Colleges</option>{lookups.colleges.map(c=><option key={c.id} value={c.id}>{c.code} — {c.name}</option>)}</select>
        <select value={f.research_type_id||''} onChange={(e)=>setF({...f, research_type_id:e.target.value})} className="border rounded px-2 py-1.5 text-sm"><option value="">All Types</option>{lookups.types.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}</select>
        <select value={f.research_status_id||''} onChange={(e)=>setF({...f, research_status_id:e.target.value})} className="border rounded px-2 py-1.5 text-sm"><option value="">All Statuses</option>{lookups.statuses.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}</select>
        <input placeholder="Researcher" value={f.researcher||''} onChange={(e)=>setF({...f, researcher:e.target.value})} className="border rounded px-2 py-1.5 text-sm" />
        <input placeholder="SDG" value={f.sdg||''} onChange={(e)=>setF({...f, sdg:e.target.value})} className="border rounded px-2 py-1.5 text-sm" />
        <input placeholder="Year" value={f.year||''} onChange={(e)=>setF({...f, year:e.target.value})} className="border rounded px-2 py-1.5 text-sm" />
        <button className="bg-emerald-600 text-white rounded text-sm px-3 py-1.5">Filter</button>
      </form>
      <div className="grid md:grid-cols-2 gap-3">
        {rows.data.map(r => (
          <Link key={r.id} href={`/repository/${r.id}`} className="bg-white border rounded p-4 hover:shadow block">
            <div className="text-xs text-gray-500">{r.research_code} • {r.college?.code} • {r.type?.name}</div>
            <div className="font-semibold text-sm mt-1">{r.title}</div>
            <div className="text-xs text-gray-500 mt-1">Lead: {r.lead_researcher?.first_name} {r.lead_researcher?.last_name}</div>
            <div className="mt-2"><StatusBadge value={r.status?.name} /></div>
          </Link>
        ))}
      </div>
      {rows.data.length===0 && <div className="bg-white border rounded p-8 text-center text-gray-500 text-sm mt-3">No research found.</div>}
      <Pagination data={rows} />
    </AuthenticatedLayout>
  );
}
