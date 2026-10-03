import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import Pagination from '../../Components/Pagination';
import { useForm } from '@inertiajs/react';
export default function Index({ rows }) {
  const { data, setData, post, processing, reset } = useForm({ name: '', description: '' });
  return (
    <AuthenticatedLayout header="Roles">
      <form onSubmit={(e) => { e.preventDefault(); post('/roles', { onSuccess: () => reset() }); }} className="bg-white border rounded p-3 flex gap-2 mb-3">
        <input value={data.name} onChange={(e) => setData('name', e.target.value)} placeholder="Role name" className="border rounded px-2 py-1.5 text-sm flex-1" />
        <input value={data.description} onChange={(e) => setData('description', e.target.value)} placeholder="Description" className="border rounded px-2 py-1.5 text-sm flex-1" />
        <button disabled={processing} className="bg-emerald-600 text-white text-sm rounded px-3">Add</button>
      </form>
      <div className="bg-white border rounded"><table className="min-w-full text-sm"><thead className="bg-gray-50"><tr><th className="p-2 text-left">Name</th><th className="p-2 text-left">Description</th></tr></thead><tbody>{rows.data.map(r => <tr key={r.id} className="border-t"><td className="p-2">{r.name}</td><td className="p-2 text-xs">{r.description}</td></tr>)}</tbody></table></div>
      <Pagination data={rows} />
    </AuthenticatedLayout>
  );
}
