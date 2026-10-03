import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { useForm } from '@inertiajs/react';
export default function Create({ types, colleges, levels }) {
  const { data, setData, post, processing } = useForm({ title: '', description: '', resource_type_id: '', college_id: '', external_url: '', access_level_id: '', version: '1.0', remarks: '' });
  return (
    <AuthenticatedLayout header="New Knowledge Resource">
      <form onSubmit={(e) => { e.preventDefault(); post('/knowledge-resources'); }} className="bg-white border rounded p-4 grid md:grid-cols-2 gap-3 max-w-4xl">
        <div className="md:col-span-2"><label className="text-xs font-medium">Title*</label><input value={data.title} onChange={(e) => setData('title', e.target.value)} className="mt-1 w-full border rounded px-2 py-1.5 text-sm" /></div>
        <div><label className="text-xs font-medium">Type*</label><select value={data.resource_type_id} onChange={(e) => setData('resource_type_id', e.target.value)} className="mt-1 w-full border rounded px-2 py-1.5 text-sm"><option value="">—</option>{types.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}</select></div>
        <div><label className="text-xs font-medium">Access Level*</label><select value={data.access_level_id} onChange={(e) => setData('access_level_id', e.target.value)} className="mt-1 w-full border rounded px-2 py-1.5 text-sm"><option value="">—</option>{levels.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}</select></div>
        <div><label className="text-xs font-medium">College</label><select value={data.college_id} onChange={(e) => setData('college_id', e.target.value)} className="mt-1 w-full border rounded px-2 py-1.5 text-sm"><option value="">—</option>{colleges.map(t => <option key={t.id} value={t.id}>{t.code}</option>)}</select></div>
        <div><label className="text-xs font-medium">External URL</label><input value={data.external_url} onChange={(e) => setData('external_url', e.target.value)} className="mt-1 w-full border rounded px-2 py-1.5 text-sm" /></div>
        <div className="md:col-span-2"><label className="text-xs font-medium">Description</label><textarea value={data.description} onChange={(e) => setData('description', e.target.value)} rows={3} className="mt-1 w-full border rounded px-2 py-1.5 text-sm" /></div>
        <div className="md:col-span-2"><button disabled={processing} className="bg-emerald-600 text-white text-sm rounded px-4 py-2">Save</button></div>
      </form>
    </AuthenticatedLayout>
  );
}
