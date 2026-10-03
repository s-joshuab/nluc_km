import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { useForm } from '@inertiajs/react';
export default function Edit({ item, types, colleges, levels }) {
  const { data, setData, put, processing } = useForm({ title: item.title || '', description: item.description || '', resource_type_id: item.resource_type_id || '', college_id: item.college_id || '', external_url: item.external_url || '', access_level_id: item.access_level_id || '', version: item.version || '1.0', remarks: item.remarks || '' });
  return (
    <AuthenticatedLayout header="Edit Resource">
      <form onSubmit={(e) => { e.preventDefault(); put(`/knowledge-resources/${item.id}`); }} className="bg-white border rounded p-4 grid md:grid-cols-2 gap-3 max-w-4xl">
        <div className="md:col-span-2"><label className="text-xs font-medium">Title</label><input value={data.title} onChange={(e) => setData('title', e.target.value)} className="mt-1 w-full border rounded px-2 py-1.5 text-sm" /></div>
        <div><label className="text-xs font-medium">Type</label><select value={data.resource_type_id} onChange={(e) => setData('resource_type_id', e.target.value)} className="mt-1 w-full border rounded px-2 py-1.5 text-sm">{types.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}</select></div>
        <div><label className="text-xs font-medium">Access</label><select value={data.access_level_id} onChange={(e) => setData('access_level_id', e.target.value)} className="mt-1 w-full border rounded px-2 py-1.5 text-sm">{levels.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}</select></div>
        <div className="md:col-span-2"><button disabled={processing} className="bg-emerald-600 text-white text-sm rounded px-4 py-2">Update</button></div>
      </form>
    </AuthenticatedLayout>
  );
}
