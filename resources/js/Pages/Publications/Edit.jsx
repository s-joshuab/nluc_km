import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { useForm } from '@inertiajs/react';
export default function Edit({ item, types, statuses, researches }) {
  const { data, setData, put, processing } = useForm({ research_id:item.research_id||'', title:item.title||'', publication_type_id:item.publication_type_id||'', publication_status_id:item.publication_status_id||'', journal:item.journal||'', publisher:item.publisher||'', publication_date:item.publication_date||'', doi:item.doi||'', url:item.url||'', abstract:item.abstract||'', keywords:item.keywords||'', remarks:item.remarks||'' });
  return (
    <AuthenticatedLayout header="Edit Publication">
      <form onSubmit={(e)=>{e.preventDefault(); put(`/publications/${item.id}`);}} className="bg-white border rounded p-4 grid md:grid-cols-2 gap-3 max-w-4xl">
        <div className="md:col-span-2"><label className="text-xs font-medium">Title</label><input value={data.title} onChange={(e)=>setData('title',e.target.value)} className="mt-1 w-full border rounded px-2 py-1.5 text-sm" /></div>
        <div><label className="text-xs font-medium">Type</label><select value={data.publication_type_id} onChange={(e)=>setData('publication_type_id',e.target.value)} className="mt-1 w-full border rounded px-2 py-1.5 text-sm">{types.map(t=><option key={t.id} value={t.id}>{t.name}</option>)}</select></div>
        <div><label className="text-xs font-medium">Status</label><select value={data.publication_status_id} onChange={(e)=>setData('publication_status_id',e.target.value)} className="mt-1 w-full border rounded px-2 py-1.5 text-sm">{statuses.map(t=><option key={t.id} value={t.id}>{t.name}</option>)}</select></div>
        <div><label className="text-xs font-medium">Journal</label><input value={data.journal} onChange={(e)=>setData('journal',e.target.value)} className="mt-1 w-full border rounded px-2 py-1.5 text-sm" /></div>
        <div><label className="text-xs font-medium">Publisher</label><input value={data.publisher} onChange={(e)=>setData('publisher',e.target.value)} className="mt-1 w-full border rounded px-2 py-1.5 text-sm" /></div>
        <div className="md:col-span-2"><button disabled={processing} className="bg-emerald-600 text-white text-sm rounded px-4 py-2">Update</button></div>
      </form>
    </AuthenticatedLayout>
  );
}
