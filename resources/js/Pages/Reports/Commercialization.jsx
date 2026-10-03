import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import Pagination from '../../Components/Pagination';
export default function Commercialization({ rows }) {
  return (
    <AuthenticatedLayout header="Commercialization Reports">
      <div className="bg-white border rounded p-3 mb-3 text-xs text-gray-500">Live MySQL query via ReportService.</div>
      <div className="bg-white border rounded overflow-x-auto">
        <table className="min-w-full text-sm"><thead className="bg-gray-50"><tr><th className="p-2 text-left">Technology</th><th className="p-2 text-left">Status</th><th className="p-2 text-left">Partner</th></tr></thead>
        <tbody>{rows.data.map((r,i)=><tr key={i} className="border-t"><td className="p-2 text-xs">{r.technology}</td><td className="p-2 text-xs">{r.status}</td><td className="p-2 text-xs">{r.potential_partner}</td></tr>)}</tbody></table>
      </div>
      <Pagination data={rows} />
    </AuthenticatedLayout>
  );
}
