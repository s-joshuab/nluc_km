import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import Pagination from '../../Components/Pagination';
import { Link } from '@inertiajs/react';
export default function Index({ rows }) {
  return (
    <AuthenticatedLayout header="Knowledge Resources">
      <Link href="/knowledge-resources/create" className="inline-block mb-3 bg-emerald-600 text-white text-sm rounded px-3 py-2">+ New Resource</Link>
      <div className="grid md:grid-cols-2 gap-3">
        {rows.data.map(r => (
          <div key={r.id} className="bg-white border rounded p-4">
            <div className="text-xs text-gray-500">{r.type?.name} • {r.access_level?.name} • v{r.version}</div>
            <div className="font-semibold text-sm mt-1">{r.title}</div>
            <div className="text-xs text-gray-600 mt-1">{r.description}</div>
            <div className="mt-2">
              <Link href={`/knowledge-resources/${r.id}/edit`} className="text-xs text-emerald-600 underline">Edit</Link>
              {r.external_url && <a href={r.external_url} target="_blank" className="text-xs ml-2 underline">External link</a>}
            </div>
          </div>
        ))}
      </div>
      {rows.data.length === 0 && <div className="bg-white border rounded p-8 text-center text-gray-500 text-sm">No resources yet.</div>}
      <Pagination data={rows} />
    </AuthenticatedLayout>
  );
}
