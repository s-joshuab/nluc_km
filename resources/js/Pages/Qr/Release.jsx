import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import Pagination from '../../Components/Pagination';
import { Link } from '@inertiajs/react';
export default function Release({ rows }) {
  return (
    <AuthenticatedLayout header="QR Release Queue — RPSU Records Office">
      <p className="text-xs text-gray-500 mb-3">Papers are QR-released <b>manually</b> at the RPSU – Records Office (no system there). RPSU staff encode the QR reference here. Queue shows documents with status = For Release.</p>
      <div className="bg-white border rounded overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50"><tr><th className="p-2 text-left">Tracking</th><th className="p-2 text-left">Document</th><th className="p-2">Researcher</th><th className="p-2">Submitted</th></tr></thead>
          <tbody>{rows.data.map(e=><tr key={e.id} className="border-t"><td className="p-2"><Link href={`/endorsements/${e.id}`} className="text-emerald-600 underline">{e.tracking_number}</Link></td><td className="p-2">{e.document_title}</td><td className="p-2">{e.researcher?.first_name} {e.researcher?.last_name}</td><td className="p-2 text-center">{e.date_submitted}</td></tr>)}</tbody>
        </table>
      </div>
      <Pagination data={rows} />
    </AuthenticatedLayout>
  );
}
