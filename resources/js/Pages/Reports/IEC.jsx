import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import Pagination from '../../Components/Pagination';
export default function IEC({ rows }) {
  return (
    <AuthenticatedLayout header="IEC Reports">
      <div className="bg-white border rounded p-3 mb-3 text-xs text-gray-500">Live MySQL query via ReportService.</div>
      <div className="bg-white border rounded overflow-x-auto">
        <table className="min-w-full text-sm"><thead className="bg-gray-50"><tr><th className="p-2 text-left">Title</th><th className="p-2 text-left">Type</th><th className="p-2 text-left">Status</th><th className="p-2 text-left">College</th></tr></thead>
        <tbody>{rows.data.map((r,i)=><tr key={i} className="border-t"><td className="p-2 text-xs">{r.title}</td><td className="p-2 text-xs">{r.type}</td><td className="p-2 text-xs">{r.status}</td><td className="p-2 text-xs">{r.college}</td></tr>)}</tbody></table>
      </div>
      <Pagination data={rows} />
    </AuthenticatedLayout>
  );
}
