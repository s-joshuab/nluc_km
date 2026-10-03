import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import Pagination from '../../Components/Pagination';
import StatusBadge from '../../Components/StatusBadge';
import { usePage, router } from '@inertiajs/react';
export default function Index({ rows, statuses }) {
  const { auth } = usePage().props;
  const canReview = auth?.isAdmin || (auth?.roles||[]).includes('RPSU Staff') || (auth?.roles||[]).includes('Research & Publication Facilitator');
  const decide = (id, decision) => {
    const remarks = prompt(`Remarks for ${decision}?`) || '';
    router.post(`/access-requests/${id}/decide`, { decision, remarks });
  };
  return (
    <AuthenticatedLayout header="Access Requests">
      <div className="bg-white border rounded overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50"><tr><th className="p-2">ID</th><th className="p-2 text-left">File / Research</th><th className="p-2">Requester</th><th className="p-2">Reason</th><th className="p-2">Status</th>{canReview && <th className="p-2">Action</th>}</tr></thead>
          <tbody>{rows.data.map(r=><tr key={r.id} className="border-t"><td className="p-2 text-center">{r.id}</td><td className="p-2">{r.file?.original_name}<div className="text-xs text-gray-500">{r.file?.research?.research_code}</div></td><td className="p-2 text-center text-xs">{r.requester?.first_name} {r.requester?.last_name}</td><td className="p-2 text-xs max-w-xs">{r.reason}</td><td className="p-2 text-center"><StatusBadge value={r.status?.name} /></td>{canReview && <td className="p-2 text-center space-x-1">{r.status?.name==='Pending' && <><button onClick={()=>decide(r.id,'approve')} className="text-xs bg-green-600 text-white rounded px-2 py-1">Approve</button><button onClick={()=>decide(r.id,'reject')} className="text-xs bg-red-600 text-white rounded px-2 py-1">Reject</button></>}</td>}</tr>)}</tbody>
        </table>
      </div>
      <Pagination data={rows} />
    </AuthenticatedLayout>
  );
}
