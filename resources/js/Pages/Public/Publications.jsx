import PublicLayout from '../../Layouts/PublicLayout';
import StatusBadge from '../../Components/StatusBadge';
import Pagination from '../../Components/Pagination';
import { router } from '@inertiajs/react';
import { useState } from 'react';

export default function Publications({ rows, filters }) {
  const [f, setF] = useState(filters || {});
  const submit = (e) => {
    e?.preventDefault();
    router.get('/showcase/publications', f, { preserveState: true });
  };
  return (
    <PublicLayout>
      <h1 className="text-xl font-bold text-gray-800">R&E Publications Showcase</h1>
      <p className="text-sm text-gray-500 mt-1">Published outputs from NLUC research. Full texts require login.</p>
      <form onSubmit={submit} className="bg-white border rounded-xl p-3 flex gap-2 mt-4">
        <input placeholder="Search title / journal…" value={f.search || ''} onChange={(e) => setF({ ...f, search: e.target.value })} className="border rounded-md px-2.5 py-2 text-sm flex-1" />
        <button className="bg-emerald-600 text-white rounded-md text-sm px-4 py-2">Search</button>
      </form>
      <div className="space-y-3 mt-4">
        {rows.data.map((p) => (
          <div key={p.id} className="bg-white border rounded-xl p-4">
            <div className="font-semibold text-sm">{p.title}</div>
            <div className="text-xs text-gray-500 mt-1">
              {p.journal && <span>{p.journal} • </span>}{p.publisher && <span>{p.publisher} • </span>}
              {p.publication_date?.slice(0, 4)} • {p.type?.name}
              {p.research && <span> • from <span className="font-medium">{p.research.research_code}</span></span>}
            </div>
            {p.abstract && <p className="text-xs text-gray-600 mt-2 line-clamp-2">{p.abstract.slice(0, 250)}{p.abstract.length > 250 ? '…' : ''}</p>}
            <div className="mt-2 flex items-center gap-2">
              <StatusBadge value={p.status?.name} />
              {p.doi && <span className="text-xs text-gray-500">DOI: {p.doi}</span>}
              {p.url && <a href={p.url} target="_blank" className="text-xs text-emerald-600 hover:underline">External link</a>}
            </div>
          </div>
        ))}
      </div>
      {rows.data.length === 0 && <div className="bg-white border rounded-xl p-8 text-center text-gray-500 text-sm mt-4">No publications found.</div>}
      <Pagination data={rows} />
    </PublicLayout>
  );
}
