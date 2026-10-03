import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import Pagination from '../../Components/Pagination';
import StatusBadge from '../../Components/StatusBadge';
import { Link } from '@inertiajs/react';
export default function Index({ rows }) {
  return (
    <AuthenticatedLayout header="Endorsements">
      <Link href="/endorsements/create" className="inline-block mb-3 bg-emerald-600 text-white text-sm rounded px-3 py-2">+ New Endorsement</Link>
      <div className="bg-white border rounded overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50"><tr><th className="p-2 text-left">Tracking</th><th className="p-2 text-left">Document</th><th className="p-2">Stage</th><th className="p-2">Status</th><th className="p-2">Submitted</th></tr></thead>
          <tbody>{rows.data.map(e=><tr key={e.id} className="border-t"><td className="p-2"><Link href={`/endorsements/${e.id}`} className="text-emerald-600 underline">{e.tracking_number}</Link></td><td className="p-2">{e.document_title}</td><td className="p-2 text-center text-xs">{e.current_stage?.name}</td><td className="p-2 text-center"><StatusBadge value={e.current_status?.name} /></td><td className="p-2 text-center text-xs">{e.date_submitted}</td></tr>)}</tbody>
        </table>
      </div>
      <Pagination data={rows} />
    </AuthenticatedLayout>
  );
}
