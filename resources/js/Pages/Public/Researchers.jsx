import PublicLayout from '../../Layouts/PublicLayout';
import Pagination from '../../Components/Pagination';
import { Link, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Researchers({ rows, filters, colleges }) {
  const [f, setF] = useState(filters || {});
  const submit = (e) => {
    e?.preventDefault();
    router.get('/researchers', f, { preserveState: true });
  };
  return (
    <PublicLayout>
      <h1 className="text-xl font-bold text-gray-800">Researchers</h1>
      <p className="text-sm text-gray-500 mt-1">NLUC researchers with archived studies in the repository.</p>
      <form onSubmit={submit} className="bg-white border rounded-xl p-3 grid md:grid-cols-3 gap-2 mt-4">
        <input placeholder="Search name…" value={f.search || ''} onChange={(e) => setF({ ...f, search: e.target.value })} className="border rounded-md px-2.5 py-2 text-sm" />
        <select value={f.college_id || ''} onChange={(e) => setF({ ...f, college_id: e.target.value })} className="border rounded-md px-2.5 py-2 text-sm">
          <option value="">All Colleges</option>
          {colleges.map((c) => <option key={c.id} value={c.id}>{c.code} — {c.name}</option>)}
        </select>
        <button className="bg-emerald-600 text-white rounded-md text-sm px-3 py-2">Search</button>
      </form>
      <div className="grid md:grid-cols-3 gap-3 mt-4">
        {rows.data.map((u) => (
          <Link key={u.id} href={`/researchers/${u.id}`} className="bg-white border rounded-xl p-4 flex items-center gap-3 hover:shadow">
            <div className="w-11 h-11 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              {(u.first_name?.[0] || '')}{(u.last_name?.[0] || '')}
            </div>
            <div>
              <div className="font-semibold text-sm">{u.first_name} {u.last_name}</div>
              <div className="text-xs text-gray-500">{u.college?.code || u.college?.name || '—'} • {u.researches_count} {u.researches_count === 1 ? 'study' : 'studies'}</div>
            </div>
          </Link>
        ))}
      </div>
      {rows.data.length === 0 && <div className="bg-white border rounded-xl p-8 text-center text-gray-500 text-sm mt-4">No researchers found.</div>}
      <Pagination data={rows} />
    </PublicLayout>
  );
}
