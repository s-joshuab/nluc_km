import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import Pagination from '../../Components/Pagination';
import { Link } from '@inertiajs/react';
export default function Index({ rows }) {
  return (
    <AuthenticatedLayout header="Technologies">
      <Link href="/technologies/create" className="inline-block mb-3 bg-emerald-600 text-white text-sm rounded px-3 py-2">+ New Technology</Link>
      <div className="bg-white border rounded overflow-x-auto">
        <table className="min-w-full text-sm"><thead className="bg-gray-50"><tr><th className="p-2 text-left">Title</th><th className="p-2">Innovation</th><th className="p-2">Status</th><th className="p-2">TRL</th><th className="p-2">Action</th></tr></thead>
        <tbody>{rows.data.map(r=><tr key={r.id} className="border-t"><td className="p-2">{r.title}</td><td className="p-2 text-xs">{r.innovation?.title}</td><td className="p-2 text-center text-xs">{r.status?.name}</td><td className="p-2 text-center text-xs">{r.technology_readiness_level}</td><td className="p-2 text-center"><Link href={`/technologies/${r.id}/edit`} className="text-xs underline">Edit</Link></td></tr>)}</tbody></table>
      </div>
      <Pagination data={rows} />
    </AuthenticatedLayout>
  );
}
