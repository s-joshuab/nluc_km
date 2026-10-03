import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import Pagination from '../../Components/Pagination';
import StatusBadge from '../../Components/StatusBadge';
import { Link } from '@inertiajs/react';
export default function MyTransactions({ rows }) {
  return (
    <AuthenticatedLayout header="My Transactions">
      <div className="bg-white border rounded overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50"><tr><th className="p-2 text-left">Tracking</th><th className="p-2 text-left">Document</th><th className="p-2">Stage</th><th className="p-2">Status</th><th className="p-2">Submitted</th></tr></thead>
          <tbody>{rows.data.map(e=><tr key={e.id} className="border-t"><td className="p-2"><Link href={`/my-transactions/${e.id}`} className="text-emerald-600 underline">{e.tracking_number}</Link></td><td className="p-2">{e.research?.title || e.document_title}</td><td className="p-2 text-center text-xs">{e.current_stage?.name}</td><td className="p-2 text-center"><StatusBadge value={e.current_status?.name} /></td><td className="p-2 text-center text-xs">{e.date_submitted}</td></tr>)}</tbody>
        </table>
      </div>
      {rows.data.length===0 && <div className="bg-white border rounded p-8 text-center text-gray-500 text-sm mt-3">No transactions yet. Create an endorsement to start tracking.</div>}
      <Pagination data={rows} />
    </AuthenticatedLayout>
  );
}
