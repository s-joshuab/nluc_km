import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import Pagination from '../../Components/Pagination';
import StatusBadge from '../../Components/StatusBadge';
import { Link } from '@inertiajs/react';
export default function MyResearch({ rows }) {
  return (
    <AuthenticatedLayout header="My Research">
      <div className="bg-white border rounded overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50"><tr><th className="p-2 text-left">Code</th><th className="p-2 text-left">Title</th><th className="p-2">College</th><th className="p-2">Status</th></tr></thead>
          <tbody>{rows.data.map(r=><tr key={r.id} className="border-t"><td className="p-2"><Link href={`/repository/${r.id}`} className="text-emerald-600 underline">{r.research_code}</Link></td><td className="p-2">{r.title}</td><td className="p-2 text-center">{r.college?.code}</td><td className="p-2 text-center"><StatusBadge value={r.status?.name} /></td></tr>)}</tbody>
        </table>
      </div>
      <Pagination data={rows} />
    </AuthenticatedLayout>
  );
}
