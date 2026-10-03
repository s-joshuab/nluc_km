import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import Pagination from '../../Components/Pagination';
import StatusBadge from '../../Components/StatusBadge';
import { Link } from '@inertiajs/react';
export default function Index({ rows }) {
  return (
    <AuthenticatedLayout header="Innovations">
      <Link href="/innovations-create" className="inline-block mb-3 bg-emerald-600 text-white text-sm rounded px-3 py-2">+ New Innovation</Link>
      <div className="bg-white border rounded overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50"><tr><th className="p-2 text-left">Title</th><th className="p-2">Type</th><th className="p-2">Status</th><th className="p-2">College</th><th className="p-2">Action</th></tr></thead>
          <tbody>{rows.data.map(r=><tr key={r.id} className="border-t"><td className="p-2"><Link href={`/innovations/${r.id}`} className="text-emerald-600 underline">{r.title}</Link></td><td className="p-2 text-center text-xs">{r.type?.name}</td><td className="p-2 text-center"><StatusBadge value={r.status?.name} /></td><td className="p-2 text-center text-xs">{r.college?.code}</td><td className="p-2 text-center"><Link href={`/innovations/${r.id}/edit`} className="text-xs underline">Edit</Link></td></tr>)}</tbody>
        </table>
      </div>
      <Pagination data={rows} />
    </AuthenticatedLayout>
  );
}
