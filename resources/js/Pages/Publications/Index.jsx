import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import Pagination from '../../Components/Pagination';
import StatusBadge from '../../Components/StatusBadge';
import { Link } from '@inertiajs/react';
export default function Index({ rows }) {
  return (
    <AuthenticatedLayout header="R&E Publications">
      <Link href="/publications/create" className="inline-block mb-3 bg-emerald-600 text-white text-sm rounded px-3 py-2">+ New Publication</Link>
      <div className="bg-white border rounded overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50"><tr><th className="p-2 text-left">Title</th><th className="p-2">Type</th><th className="p-2">Status</th><th className="p-2">Journal</th><th className="p-2">Date</th><th className="p-2">Action</th></tr></thead>
          <tbody>{rows.data.map(r=><tr key={r.id} className="border-t"><td className="p-2">{r.title}<div className="text-xs text-gray-500">{r.research?.research_code}</div></td><td className="p-2 text-center text-xs">{r.type?.name}</td><td className="p-2 text-center"><StatusBadge value={r.status?.name} /></td><td className="p-2 text-xs">{r.journal}</td><td className="p-2 text-xs text-center">{r.publication_date}</td><td className="p-2 text-center"><Link href={`/publications/${r.id}/edit`} className="text-emerald-600 underline text-xs">Edit</Link></td></tr>)}</tbody>
        </table>
      </div>
      <Pagination data={rows} />
    </AuthenticatedLayout>
  );
}
