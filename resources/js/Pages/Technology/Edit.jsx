import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { useForm } from '@inertiajs/react';
export default function Edit({ item, statuses, innovations }) {
  const { data, setData, put, processing } = useForm({ innovation_id:item.innovation_id||'', title:item.title||'', description:item.description||'', technology_status_id:item.technology_status_id||'', technology_readiness_level:item.technology_readiness_level||'', ip_reference:item.ip_reference||'', development_date:item.development_date||'', remarks:item.remarks||'' });
  return (
    <AuthenticatedLayout header="Edit Technology">
      <form onSubmit={(e)=>{e.preventDefault(); put(`/technologies/${item.id}`);}} className="bg-white border rounded p-4 grid md:grid-cols-2 gap-3 max-w-4xl">
        <div><label className="text-xs font-medium">Title</label><input value={data.title} onChange={(e)=>setData('title',e.target.value)} className="mt-1 w-full border rounded px-2 py-1.5 text-sm" /></div>
        <div><label className="text-xs font-medium">Status</label><select value={data.technology_status_id} onChange={(e)=>setData('technology_status_id',e.target.value)} className="mt-1 w-full border rounded px-2 py-1.5 text-sm">{statuses.map(t=><option key={t.id} value={t.id}>{t.name}</option>)}</select></div>
        <div className="md:col-span-2"><button disabled={processing} className="bg-emerald-600 text-white text-sm rounded px-4 py-2">Update</button></div>
      </form>
    </AuthenticatedLayout>
  );
}
