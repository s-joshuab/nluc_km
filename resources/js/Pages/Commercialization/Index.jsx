import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import Pagination from '../../Components/Pagination';
import { Link } from '@inertiajs/react';
export default function Index({ rows }) {
  return (
    <AuthenticatedLayout header="Commercialization">
      <Link href="/commercialization/create" className="inline-block mb-3 bg-emerald-600 text-white text-sm rounded px-3 py-2">+ New Record</Link>
      <div className="bg-white border rounded overflow-x-auto">
        <table className="min-w-full text-sm"><thead className="bg-gray-50"><tr><th className="p-2 text-left">Technology</th><th className="p-2">Status</th><th className="p-2">Partner</th><th className="p-2">Agreement</th><th className="p-2">Action</th></tr></thead>
        <tbody>{rows.data.map(r=><tr key={r.id} className="border-t"><td className="p-2">{r.technology?.title}</td><td className="p-2 text-center text-xs">{r.status?.name}</td><td className="p-2 text-xs">{r.potential_partner}</td><td className="p-2 text-xs">{r.agreement_reference}</td><td className="p-2 text-center"><Link href={`/commercialization/${r.id}/edit`} className="text-xs underline">Edit</Link></td></tr>)}</tbody></table>
      </div>
      <Pagination data={rows} />
    </AuthenticatedLayout>
  );
}
