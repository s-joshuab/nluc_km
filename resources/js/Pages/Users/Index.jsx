import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import Pagination from '../../Components/Pagination';
import { Link } from '@inertiajs/react';
export default function Index({ rows }) {
  return (
    <AuthenticatedLayout header="Users">
      <Link href="/users/create" className="inline-block mb-3 bg-emerald-600 text-white text-sm rounded px-3 py-2">+ New User</Link>
      <div className="bg-white border rounded overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50"><tr><th className="p-2 text-left">Name</th><th className="p-2">Email</th><th className="p-2">Roles</th><th className="p-2">Offices</th><th className="p-2">Active</th><th className="p-2">Action</th></tr></thead>
          <tbody>{rows.data.map(u => <tr key={u.id} className="border-t"><td className="p-2">{u.first_name} {u.last_name}<div className="text-xs text-gray-500">{u.employee_number}</div></td><td className="p-2 text-xs">{u.email}</td><td className="p-2 text-xs">{u.roles?.map(r => r.name).join(', ')}</td><td className="p-2 text-xs">{u.offices?.map(o => o.code).join(', ')}</td><td className="p-2 text-center">{u.is_active ? 'Yes' : 'No'}</td><td className="p-2 text-center"><Link href={`/users/${u.id}/edit`} className="text-xs underline">Edit</Link></td></tr>)}</tbody>
        </table>
      </div>
      <Pagination data={rows} />
    </AuthenticatedLayout>
  );
}
