import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { useForm } from '@inertiajs/react';
export default function Edit({ item, types, statuses, colleges, ip, researches, users }) {
  const { data, setData, put, processing } = useForm({ research_id:item.research_id||'', title:item.title||'', description:item.description||'', innovation_type_id:item.innovation_type_id||'', innovation_status_id:item.innovation_status_id||'', college_id:item.college_id||'', lead_innovator_id:item.lead_innovator_id||'', development_date:item.development_date||'', ip_status_id:item.ip_status_id||'', remarks:item.remarks||'' });
  return (
    <AuthenticatedLayout header="Edit Innovation">
      <form onSubmit={(e)=>{e.preventDefault(); put(`/innovations/${item.id}`);}} className="bg-white border rounded p-4 grid md:grid-cols-2 gap-3 max-w-4xl">
        <div className="md:col-span-2"><label className="text-xs font-medium">Title</label><input value={data.title} onChange={(e)=>setData('title',e.target.value)} className="mt-1 w-full border rounded px-2 py-1.5 text-sm" /></div>
        <div><label className="text-xs font-medium">Type</label><select value={data.innovation_type_id} onChange={(e)=>setData('innovation_type_id',e.target.value)} className="mt-1 w-full border rounded px-2 py-1.5 text-sm">{types.map(t=><option key={t.id} value={t.id}>{t.name}</option>)}</select></div>
        <div><label className="text-xs font-medium">Status</label><select value={data.innovation_status_id} onChange={(e)=>setData('innovation_status_id',e.target.value)} className="mt-1 w-full border rounded px-2 py-1.5 text-sm">{statuses.map(t=><option key={t.id} value={t.id}>{t.name}</option>)}</select></div>
        <div className="md:col-span-2"><button disabled={processing} className="bg-emerald-600 text-white text-sm rounded px-4 py-2">Update</button></div>
      </form>
    </AuthenticatedLayout>
  );
}
