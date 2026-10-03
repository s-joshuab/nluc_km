import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import Pagination from '../../Components/Pagination';
import { useForm, router } from '@inertiajs/react';
export default function Index({ rows }) {
  const { data, setData, post, processing, reset } = useForm({ name: '', code: '', description: '' });
  return (
    <AuthenticatedLayout header="Colleges (NLUC — 9 colleges)">
      <form onSubmit={(e) => { e.preventDefault(); post('/colleges', { onSuccess: () => reset() }); }} className="bg-white border rounded p-3 grid md:grid-cols-4 gap-2 mb-3">
        <input value={data.name} onChange={(e) => setData('name', e.target.value)} placeholder="College name" className="border rounded px-2 py-1.5 text-sm" />
        <input value={data.code} onChange={(e) => setData('code', e.target.value)} placeholder="Code" className="border rounded px-2 py-1.5 text-sm" />
        <input value={data.description} onChange={(e) => setData('description', e.target.value)} placeholder="Description" className="border rounded px-2 py-1.5 text-sm" />
        <button disabled={processing} className="bg-emerald-600 text-white text-sm rounded px-3">Add</button>
      </form>
      <div className="bg-white border rounded"><table className="min-w-full text-sm"><thead className="bg-gray-50"><tr><th className="p-2 text-left">Code</th><th className="p-2 text-left">Name</th><th className="p-2">Active</th><th className="p-2">Action</th></tr></thead><tbody>{rows.data.map(r => <tr key={r.id} className="border-t"><td className="p-2">{r.code}</td><td className="p-2">{r.name}</td><td className="p-2 text-center">{r.is_active ? 'Yes' : 'No'}</td><td className="p-2 text-center"><button onClick={() => router.post(`/colleges/${r.id}/toggle`)} className="text-xs underline">Toggle</button></td></tr>)}</tbody></table></div>
      <Pagination data={rows} />
    </AuthenticatedLayout>
  );
}
