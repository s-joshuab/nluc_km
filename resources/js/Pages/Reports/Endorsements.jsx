import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import Pagination from '../../Components/Pagination';
export default function Endorsements({ rows }) {
  return (
    <AuthenticatedLayout header="Endorsement Reports">
      <div className="bg-white border rounded p-3 mb-3 text-xs text-gray-500">Live MySQL query via ReportService.</div>
      <div className="bg-white border rounded overflow-x-auto">
        <table className="min-w-full text-sm"><thead className="bg-gray-50"><tr><th className="p-2 text-left">Tracking</th><th className="p-2 text-left">Document</th><th className="p-2 text-left">Stage</th><th className="p-2 text-left">Status</th></tr></thead>
        <tbody>{rows.data.map((r,i)=><tr key={i} className="border-t"><td className="p-2 text-xs">{r.tracking_number}</td><td className="p-2 text-xs">{r.document_title}</td><td className="p-2 text-xs">{r.stage}</td><td className="p-2 text-xs">{r.status}</td></tr>)}</tbody></table>
      </div>
      <Pagination data={rows} />
    </AuthenticatedLayout>
  );
}
